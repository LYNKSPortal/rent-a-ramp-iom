"use client";

import { useMemo, useState } from "react";
import { BOOKING_DURATIONS, RAMPS } from "@/lib/site-config";
import { DurationId, durationHours } from "@/lib/booking";
import RampSelector from "@/components/booking/RampSelector";
import DurationSelector from "@/components/booking/DurationSelector";
import DateTimeSelector from "@/components/booking/DateTimeSelector";
import PriceSummary from "@/components/booking/PriceSummary";
import BookingContactForm from "@/components/booking/BookingContactForm";

function StepLabel({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center bg-ink text-sm font-semibold text-white">
        {number}
      </span>
      <h2 className="font-display text-lg font-semibold uppercase tracking-tight text-ink">
        {title}
      </h2>
    </div>
  );
}

export default function BookingFlow({ preselectedRamp }: { preselectedRamp?: string }) {

  const [rampId, setRampId] = useState<string | null>(() =>
    preselectedRamp && RAMPS.some((r) => r.id === preselectedRamp) ? preselectedRamp : null
  );
  const [date, setDate] = useState("");
  const [hour, setHour] = useState<number | null>(null);
  const [durationId, setDurationId] = useState<DurationId | null>(null);

  const ramp = useMemo(() => RAMPS.find((r) => r.id === rampId) ?? null, [rampId]);
  const duration = BOOKING_DURATIONS.find((d) => d.id === durationId) ?? null;

  // Reset downstream selections when an earlier choice changes.
  function handleRampSelect(id: string) {
    setRampId(id);
    setHour(null);
  }

  function handleDurationSelect(id: DurationId) {
    setDurationId(id);
    setHour(null);
  }

  function handleDateChange(newDate: string) {
    setDate(newDate);
    setHour(null);
  }

  return (
    <div className="mt-12 grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
      <div className="space-y-10">
        <section>
          <StepLabel number={1} title="Choose your ramp" />
          <div className="mt-4">
            <RampSelector selectedId={rampId} onSelect={handleRampSelect} />
          </div>
        </section>

        {ramp && (
          <section>
            <StepLabel number={2} title="Choose your duration" />
            <div className="mt-4">
              <DurationSelector ramp={ramp} selectedId={durationId} onSelect={handleDurationSelect} />
            </div>
          </section>
        )}

        {ramp && duration && (
          <section>
            <StepLabel number={3} title="Choose your date & time" />
            <div className="mt-4">
              <DateTimeSelector
                rampId={ramp.id}
                durationHours={durationHours(duration.id)}
                date={date}
                onDateChange={handleDateChange}
                hour={hour}
                onHourChange={setHour}
              />
            </div>
          </section>
        )}

        {ramp && duration && date && hour !== null && (
          <section>
            <StepLabel number={4} title="Confirm your details" />
            <div className="mt-4">
              <BookingContactForm
                ramp={ramp}
                date={date}
                hour={hour}
                durationId={duration.id}
                durationLabel={duration.label}
              />
            </div>
          </section>
        )}
      </div>

      <div className="lg:order-last">
        <PriceSummary
          ramp={ramp}
          date={date}
          hour={hour}
          durationLabel={duration?.label ?? null}
          durationId={duration?.id ?? null}
        />
      </div>
    </div>
  );
}
