"use client";

import { getTimeSlotsForDate, isDateOpenable, todayISO } from "@/lib/availability";
import { cn } from "@/lib/utils";

export default function DateTimeSelector({
  rampId,
  durationHours,
  date,
  onDateChange,
  hour,
  onHourChange,
}: {
  rampId: string;
  durationHours: number;
  date: string;
  onDateChange: (date: string) => void;
  hour: number | null;
  onHourChange: (hour: number) => void;
}) {
  const openable = isDateOpenable(date);
  const slots = openable ? getTimeSlotsForDate(date, rampId, durationHours) : [];

  return (
    <div className="space-y-5">
      <div className="max-w-xs">
        <label htmlFor="booking-date" className="mb-2 block text-sm font-semibold text-ink">
          Date
        </label>
        <input
          id="booking-date"
          type="date"
          min={todayISO()}
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full border-2 border-grey-200 bg-white px-4 py-3 text-sm text-ink focus:border-orange focus:outline-none"
        />
      </div>

      {date && !openable && (
        <p className="text-sm font-medium text-orange-dark">
          We&rsquo;re closed on that day — please choose another date.
        </p>
      )}

      {date && openable && (
        <div>
          <p className="mb-2 text-sm font-semibold text-ink">Available times</p>
          {slots.length === 0 ? (
            <p className="text-sm text-grey-600">
              No slots long enough for this duration on that day — try a shorter duration or another date.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => onHourChange(slot.hour)}
                  aria-pressed={hour === slot.hour}
                  className={cn(
                    "border-2 px-4 py-2 text-sm font-semibold transition-colors",
                    !slot.available &&
                      "cursor-not-allowed border-grey-100 text-grey-400 line-through",
                    slot.available &&
                      hour === slot.hour &&
                      "border-orange bg-orange/5 text-ink",
                    slot.available &&
                      hour !== slot.hour &&
                      "border-grey-200 bg-white text-ink hover:border-ink/30"
                  )}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
