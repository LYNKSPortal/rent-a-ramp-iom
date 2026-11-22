import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { HOW_IT_WORKS } from "@/lib/site-config";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="Three steps. That's it."
          description="No membership, no ownership costs — just book the bay you need."
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {HOW_IT_WORKS.map((item, i) => (
            <div
              key={item.step}
              data-reveal
              data-reveal-delay={i * 90}
              className="relative"
            >
              <span className="font-display text-6xl font-semibold text-grey-600">
                {item.step}
              </span>
              <h3 className="font-display mt-3 text-xl font-semibold uppercase tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-grey-600">
                {item.description}
              </p>
              {i < HOW_IT_WORKS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-[-1.5rem] top-6 hidden h-px w-8 bg-grey-200 sm:block"
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
