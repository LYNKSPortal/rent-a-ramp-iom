import RampImage from "@/components/sections/RampImage";
import Button from "@/components/ui/Button";
import { Ramp } from "@/lib/site-config";
import { formatGBP } from "@/lib/utils";

export default function RampCard({ ramp, index }: { ramp: Ramp; index: number }) {
  return (
    <article
      data-reveal
      data-reveal-delay={index * 100}
      className="flex flex-col border border-grey-200 bg-white"
    >
      <RampImage ramp={ramp} className="aspect-square w-full border-b border-grey-200" />

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-orange">
              {ramp.type} lift
            </span>
            <h3 className="font-display mt-1 text-2xl font-semibold uppercase tracking-tight text-ink">
              {ramp.name}
            </h3>
          </div>
        </div>
        <p className="mt-2 text-sm font-medium text-grey-600">{ramp.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-grey-600">
          {ramp.description}
        </p>

        <ul className="mt-5 space-y-2">
          {ramp.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-ink-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-orange" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-2 border-t border-grey-100 pt-5 text-center">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-grey-600">First Hour</p>
            <p className="font-display text-lg font-semibold text-ink">
              {formatGBP(ramp.pricing.firstHour)}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-grey-600">Each Extra Hour</p>
            <p className="font-display text-lg font-semibold text-ink">
              {formatGBP(ramp.pricing.additionalHour)}
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-grey-600">
          Max {ramp.maxWeightKg.toLocaleString()}kg &middot; {ramp.height}
        </p>
        <p className="mt-1 text-xs font-medium text-orange">{ramp.availabilityNote}</p>

        <Button href={`/booking?ramp=${ramp.id}`} className="mt-6 w-full">
          Book {ramp.name}
        </Button>
      </div>
    </article>
  );
}
