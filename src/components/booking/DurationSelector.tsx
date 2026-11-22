import { BOOKING_DURATIONS, Ramp } from "@/lib/site-config";
import { computePrice, DurationId } from "@/lib/booking";
import { cn, formatGBP } from "@/lib/utils";

export default function DurationSelector({
  ramp,
  selectedId,
  onSelect,
}: {
  ramp: Ramp;
  selectedId: DurationId | null;
  onSelect: (id: DurationId) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {BOOKING_DURATIONS.map((duration) => {
        const selected = duration.id === selectedId;
        return (
          <button
            key={duration.id}
            type="button"
            onClick={() => onSelect(duration.id)}
            aria-pressed={selected}
            className={cn(
              "flex flex-col items-center gap-1 border-2 px-3 py-4 text-center transition-colors",
              selected
                ? "border-orange bg-orange/5"
                : "border-grey-200 bg-white hover:border-ink/30"
            )}
          >
            <span className="text-sm font-semibold uppercase tracking-wide text-ink">
              {duration.label}
            </span>
            <span className="font-display text-lg font-semibold text-orange">
              {formatGBP(computePrice(ramp, duration.id))}
            </span>
          </button>
        );
      })}
    </div>
  );
}
