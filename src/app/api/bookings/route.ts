import { createHash } from "node:crypto";
import { BOOKING_DURATIONS, BOOKING_HOURS, CONTACT, RAMPS, SITE } from "@/lib/site-config";
import { computePrice } from "@/lib/booking";
import { formatHour } from "@/lib/availability";
import { formatGBP } from "@/lib/utils";
import { renderBookingEmail } from "@/lib/booking-email";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; expires: number }>();
const fail = (error: string, status = 400, code?: string) => Response.json({ error, ...(code && { code }) }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin && origin !== new URL(SITE.url).origin) {
    return fail("Please submit the form from our website.", 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail("Expected a JSON request.", 415);
  }
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const ip = createHash("sha256").update(request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown").digest("hex");
  const attempt = attempts.get(ip) ?? { count: 0, expires: now + 60_000 };
  if (attempt.count >= 5 || attempts.size >= 10_000) return fail("Too many requests. Please try again in a minute.", 429);
  attempt.count++;
  attempts.set(ip, attempt);

  let body;
  try {
    const raw = await request.text();
    if (raw.length > 12_000) return fail("Your request is too long.", 413);
    body = JSON.parse(raw);
  } catch {
    return fail("Invalid request.");
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return fail("Invalid request.");
  if (body.website) return fail("Unable to submit this request.");
  const { name, email, phone, notes = "", date, hour, rampId, durationId, requestId } = body;
  if (
    typeof name !== "string" || !name.trim() || name.length > 120 || /[\r\n]/.test(name) ||
    typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof phone !== "string" || !/^[+\d\s().-]{6,30}$/.test(phone) ||
    typeof notes !== "string" || notes.length > 2000 ||
    typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    typeof hour !== "number" || !Number.isFinite(hour) ||
    typeof requestId !== "string" || !/^[0-9a-f-]{36}$/i.test(requestId)
  ) return fail("Please check your contact details and booking selection.");
  const ramp = RAMPS.find((item) => item.id === rampId);
  const duration = BOOKING_DURATIONS.find((item) => item.id === durationId);
  const selectedDate = new Date(`${date}T12:00:00Z`);
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Isle_of_Man", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  if (!ramp || !duration || !Number.isFinite(selectedDate.getTime()) || selectedDate.toISOString().slice(0, 10) !== date || date < today) {
    return fail("Please choose a valid ramp, duration and future date.");
  }
  const hours = BOOKING_HOURS.dayHours[selectedDate.getUTCDay()];
  if (!hours || hour < hours.open || hour + duration.hours > hours.close || !Number.isInteger((hour - hours.open) / BOOKING_HOURS.slotLengthHours)) {
    return fail("Please choose a time within our opening hours.");
  }
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Booking email configuration missing", { apiKeyConfigured: Boolean(apiKey), senderConfigured: Boolean(from) });
    return fail("Email booking is temporarily unavailable. Please contact us by email or WhatsApp.", 503, "EMAIL_CONFIG");
  }
  const text = [
    "New booking request — confirmation required",
    `Ramp: ${ramp.name}`,
    `Date: ${date}`,
    `Time: ${formatHour(hour)} (Isle of Man local time)`,
    `Duration: ${duration.label}`,
    `Price: ${formatGBP(computePrice(ramp, duration.id))} including VAT`,
    "",
    `Name: ${name.trim()}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Notes: ${notes.trim() || "None"}`,
  ].join("\n");
  const emailDetails = {
    name: name.trim(), email, phone, notes: notes.trim(), ramp: ramp.name,
    date: selectedDate.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Isle_of_Man" }),
    time: formatHour(hour), duration: duration.label, price: formatGBP(computePrice(ramp, duration.id)),
  };
  try {
    const response = await fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `booking-${requestId}` },
      body: JSON.stringify([
        { from, to: [CONTACT.email], reply_to: email, subject: `Booking request: ${ramp.name} — ${date} at ${formatHour(hour)}`, text, html: renderBookingEmail(emailDetails, "owner") },
        {
          from,
          to: [email],
          reply_to: CONTACT.email,
          subject: "We received your Rent a Ramp booking request — awaiting confirmation",
          html: renderBookingEmail(emailDetails, "customer"),
          text: [
            `Hi ${name.trim()},`,
            "",
            "Thank you for your submission. A member of our team will check availability and be in touch within 24 hours.",
            "This email confirms that your request has gone through; it does not confirm your booking. Please wait for a member of our team to confirm availability before coming to the workshop.",
            "This is an acknowledgement only. Your ramp is NOT reserved until Tomasz confirms your booking. No payment has been taken.",
            "",
            text.replace("New booking request — confirmation required", "Your requested booking details"),
            "",
            `If you have any issues in the meantime, please get in touch with Tomasz by email at ${CONTACT.email} or on WhatsApp at ${CONTACT.whatsapp}: https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}.`,
            "Rent a Ramp",
          ].join("\n"),
        },
      ]),
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      const providerError = await response.json().catch(() => null);
      const providerCode = typeof providerError?.name === "string" && /^[a-z_]+$/.test(providerError.name) ? providerError.name : "unknown";
      console.error("Resend rejected booking emails", { status: response.status, code: providerCode, requestId });
      return fail("Your request could not be emailed. Please try again or contact us directly.", 502, `EMAIL_PROVIDER_${response.status}`);
    }
    const result = await response.json();
    if (!Array.isArray(result.data) || result.data.length !== 2 || result.data.some((item: { id?: string }) => !item.id)) {
      return fail("Email submission could not be confirmed. Please contact us directly.", 502);
    }
    return Response.json({ success: true });
  } catch {
    return fail("Email service unavailable. Please try again or contact us directly.", 502);
  }
}
