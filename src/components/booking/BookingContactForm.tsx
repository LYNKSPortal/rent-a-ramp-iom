"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { CONTACT, Ramp } from "@/lib/site-config";
import { computePrice, DurationId } from "@/lib/booking";
import { formatHour } from "@/lib/availability";
import { formatGBP } from "@/lib/utils";

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
  durationLabel,
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const price = computePrice(ramp, durationId);
  const dateLabel = new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeLabel = formatHour(hour);

  const mailtoHref = (() => {
    const subject = `Booking request: ${ramp.name} on ${date} at ${timeLabel}`;
    const body = [
      `Ramp: ${ramp.name}`,
      `Date: ${dateLabel}`,
      `Time: ${timeLabel}`,
      `Duration: ${durationLabel}`,
      `Estimated price: ${formatGBP(price)}`,
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      notes ? `Notes: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  })();

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-2 border-orange bg-orange/5 p-6"
      >
        <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
          Request ready to send
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-grey-600">
          Your email app should have opened with your booking request pre-filled.
          If it didn&rsquo;t, email us directly at{" "}
          <a href={`mailto:${CONTACT.email}`} className="font-medium text-orange">
            {CONTACT.email}
          </a>. We&rsquo;ll confirm your slot as soon as
          possible.
        </p>
      </motion.div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = mailtoHref;
    setSubmitted(true);
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
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. the job you're doing, or your vehicle"
          className="w-full border-2 border-grey-200 px-4 py-2.5 text-sm focus:border-orange focus:outline-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full">
        Request This Booking
      </Button>
      <p className="text-xs text-grey-600">
        This opens your email app with the booking details filled in — we&rsquo;ll
        confirm availability with you directly.
      </p>
    </form>
  );
}
