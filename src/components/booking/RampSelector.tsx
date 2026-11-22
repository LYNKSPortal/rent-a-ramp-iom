import { RAMPS } from "@/lib/site-config";
import { cn, formatGBP } from "@/lib/utils";

export default function RampSelector({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {RAMPS.map((ramp) => {
        const selected = ramp.id === selectedId;
        return (
          <button
            key={ramp.id}
            type="button"
            onClick={() => onSelect(ramp.id)}
            aria-pressed={selected}
            className={cn(
              "flex flex-col items-start gap-1 border-2 p-4 text-left transition-colors",
              selected
                ? "border-orange bg-orange/5"
                : "border-grey-200 bg-white hover:border-ink/30"
            )}
          >
            <span className="text-[11px] font-semibold uppercase tracking-widest text-orange">
              {ramp.type}
            </span>
            <span className="font-display text-lg font-semibold uppercase tracking-tight text-ink">
              {ramp.name}
            </span>
            <span className="text-sm text-grey-600">
              {formatGBP(ramp.pricing.firstHour)} first hour
            </span>
          </button>
        );
      })}
    </div>
  );
}
