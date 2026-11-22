"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { BOOKING_POLICY_VERSION, CONTACT, Ramp } from "@/lib/site-config";
import { DurationId } from "@/lib/booking";

interface Props {
  ramp: Ramp;
  date: string;
  hour: number;
  durationId: DurationId;
  durationLabel: string;
}

export default function BookingContactForm({
  ramp,
  date,
  hour,
  durationId,
}: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [website, setWebsite] = useState("");
  const [acceptedPolicies, setAcceptedPolicies] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const requestId = useRef("");
  const submissionId = useRef("");
  const pending = useRef(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setSending(true);
    setError("");
    try {
      const details = { rampId: ramp.id, date, hour, durationId, name: name.trim(), email: email.trim(), phone: phone.trim(), notes: notes.trim(), website, acceptedPolicies, policyVersion: BOOKING_POLICY_VERSION };
      const fingerprint = JSON.stringify(details);
      if (requestId.current !== fingerprint) {
        requestId.current = fingerprint;
        submissionId.current = crypto.randomUUID();
      }
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, requestId: submissionId.current }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(result?.error
          ? `${result.error}${result.code ? ` (Reference: ${result.code})` : ""}`
          : "The booking service could not be reached. Please try again shortly.");
      }
      window.dispatchEvent(new Event("booking-request-submitted"));
      router.replace("/booking/thank-you");
    } catch (error) {
      setError(error instanceof Error && error.name === "TimeoutError"
        ? "The request timed out. Please retry with the same details, or contact us by email or WhatsApp."
        : error instanceof Error ? error.message : "Unable to send your request. Please try again.");
      pending.current = false;
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border-2 border-grey-200 bg-white p-6">
      <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
        Your details
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
            Full name
          </label>
          <input
            id="name"
            autoComplete="name"
            maxLength={120}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-grey-200 px-4 py-2.5 text-sm focus:border-orange focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-ink">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            minLength={6}
            maxLength={30}
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border-2 border-grey-200 px-4 py-2.5 text-sm focus:border-orange focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-2 border-grey-200 px-4 py-2.5 text-sm focus:border-orange focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold text-ink">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          maxLength={2000}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. the job you're doing, or your vehicle"
          className="w-full border-2 border-grey-200 px-4 py-2.5 text-sm focus:border-orange focus:outline-none"
        />
      </div>
      <div className="flex items-start gap-3">
        <input id="accepted-policies" type="checkbox" required checked={acceptedPolicies} onChange={(e) => setAcceptedPolicies(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#c90003]" />
        <label htmlFor="accepted-policies" className="text-sm leading-relaxed text-ink">
          I have read and accept the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-orange underline">Terms &amp; Conditions</a> and <a href="/safety" target="_blank" rel="noopener noreferrer" className="text-orange underline">Safety Guidance</a> (opens in new tabs). I understand this is a booking request, not a confirmed reservation.
        </label>
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {error && <p role="alert" className="text-sm text-orange-dark">{error} Email <a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> if the problem continues.</p>}
      <Button type="submit" size="lg" className="w-full" disabled={sending}>
        {sending ? "Sending request…" : "Request This Booking"}
      </Button>
      <p className="text-xs text-grey-600">
        Your details will be emailed to our team to handle your booking request.
        We&rsquo;ll confirm availability with you directly. No payment is taken. Read our <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Notice</a>.
      </p>
    </form>
  );
}
