"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { CONTACT, Ramp } from "@/lib/site-config";
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
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const requestId = useRef("");
  const pending = useRef(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-2 border-orange bg-orange/5 p-6"
      >
        <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
          Booking request sent
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-grey-600">
          Your request has been emailed to our team at{" "}
          <a href={`mailto:${CONTACT.email}`} className="font-medium text-orange">
            {CONTACT.email}
          </a>. An acknowledgement has also been sent to your email address.
          Your slot is not reserved until Tomasz confirms availability by email.
        </p>
      </motion.div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setSending(true);
    setError("");
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rampId: ramp.id, date, hour, durationId, name, email, phone, notes, website, requestId: requestId.current }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Unable to send your request.");
      setSubmitted(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to send your request. Please try again.");
    } finally {
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
        We&rsquo;ll confirm availability with you directly. No payment is taken.
      </p>
    </form>
  );
}
