import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CTABand({
  title = "Ready to get to work?",
  description = "Request a ramp and time that suit you. Our team will reply within 24 hours to confirm availability.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-orange py-14 lg:py-16">
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div data-reveal>
          <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-md text-sm font-medium text-white sm:text-base">
            {description}
          </p>
        </div>
        <div data-reveal data-reveal-delay="120" className="shrink-0">
          <Button href="/booking" size="lg" variant="secondary">
            Book a Ramp
          </Button>
        </div>
      </Container>
    </section>
  );
}
