import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import {
  ADD_ON_SERVICES,
  LONGER_BOOKING_NOTE,
  PRICES_INCLUDE_VAT_NOTE,
  PRICING_NOTE,
  RAMPS,
  RAMP_HIRE_PRICING,
} from "@/lib/site-config";
import { formatGBP } from "@/lib/utils";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-ink py-20 text-white lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent rates"
          description={`The same rates apply to all three ramps. Your booking total covers ramp hire; optional extras are listed separately. ${PRICES_INCLUDE_VAT_NOTE}`}
          light
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div data-reveal className="min-w-0">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
              Ramp Hire
            </p>
            <table className="w-full table-fixed border-collapse text-left">
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-4 text-sm text-white/80">Ramp hire — first hour</td>
                  <td className="w-24 whitespace-nowrap py-4 text-right font-display text-xl font-semibold text-orange-light">
                    {formatGBP(RAMP_HIRE_PRICING.firstHour)}
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-4 text-sm text-white/80">Ramp hire — each additional hour</td>
                  <td className="w-24 whitespace-nowrap py-4 text-right font-display text-xl font-semibold text-orange-light">
                    {formatGBP(RAMP_HIRE_PRICING.additionalHour)}/hr
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-4 text-sm text-white/80">Half day (4 hrs)</td>
                  <td className="w-24 whitespace-nowrap py-4 text-right font-display text-xl font-semibold text-orange-light">
                    {formatGBP(RAMP_HIRE_PRICING.halfDay)}
                  </td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 text-sm text-white/80">Full day (8 hrs)</td>
                  <td className="w-24 whitespace-nowrap py-4 text-right font-display text-xl font-semibold text-orange-light">
                    {formatGBP(RAMP_HIRE_PRICING.fullDay)}
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="mt-6 text-xs leading-relaxed text-white/50">{PRICING_NOTE}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {RAMPS.map((ramp) => (
                <Button key={ramp.id} href={`/booking?ramp=${ramp.id}`} size="md" variant="outline-light" className="w-full sm:w-auto">
                  Book {ramp.name}
                </Button>
              ))}
            </div>
          </div>

          <div data-reveal data-reveal-delay="120" className="min-w-0">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
              Add-On Services
            </p>
            <table className="w-full table-fixed border-collapse text-left">
              <tbody>
                {ADD_ON_SERVICES.map((addOn) => (
                  <tr key={addOn.name} className="border-b border-white/10 last:border-b-0">
                    <td className="py-4 pr-4 text-sm text-white/80">{addOn.name}</td>
                    <td className="w-24 whitespace-nowrap py-4 text-right font-display text-lg font-semibold text-orange-light">
                      {formatGBP(addOn.price)}
                      {addOn.unit ? ` ${addOn.unit}` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div data-reveal data-reveal-delay="160" className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-white/70">
            {LONGER_BOOKING_NOTE}
          </p>
          <Button href="/#contact" variant="secondary" size="lg" className="shrink-0">
            Ask About Longer Bookings
          </Button>
        </div>
      </Container>
    </section>
  );
}
