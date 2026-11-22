import { PRICES_INCLUDE_VAT_NOTE, Ramp } from "@/lib/site-config";
import { computePrice, DurationId } from "@/lib/booking";
import { formatHour } from "@/lib/availability";
import { formatGBP } from "@/lib/utils";

export default function PriceSummary({
  ramp,
  date,
  hour,
  durationLabel,
  durationId,
}: {
  ramp: Ramp | null;
  date: string;
  hour: number | null;
  durationLabel: string | null;
  durationId: DurationId | null;
}) {
  const price = ramp && durationId ? computePrice(ramp, durationId) : null;

  return (
    <div className="min-w-0 border-2 border-ink bg-white p-5 sm:p-6 lg:sticky lg:top-36">
      <h2 className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
        Your Booking
      </h2>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4 border-b border-grey-100 pb-3">
          <dt className="text-grey-600">Ramp</dt>
          <dd className="text-right font-medium text-ink">{ramp?.name ?? "—"}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-grey-100 pb-3">
          <dt className="text-grey-600">Date</dt>
          <dd className="text-right font-medium text-ink">
            {date
              ? new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })
              : "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-grey-100 pb-3">
          <dt className="text-grey-600">Time</dt>
          <dd className="text-right font-medium text-ink">
            {hour !== null ? formatHour(hour) : "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-grey-100 pb-3">
          <dt className="text-grey-600">Duration</dt>
          <dd className="text-right font-medium text-ink">{durationLabel ?? "—"}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-baseline justify-between border-t border-ink pt-4">
        <span className="text-sm font-semibold uppercase tracking-wide text-ink">Total</span>
        <span className="font-display text-3xl font-semibold text-orange">
          {price !== null ? formatGBP(price) : "—"}
        </span>
      </div>
      <p className="mt-2 text-xs text-grey-600">
        {PRICES_INCLUDE_VAT_NOTE} Ramp hire only; optional extras are charged separately. This is a request, not a confirmed booking. Our team will reply within 24 hours.
      </p>
    </div>
  );
}
