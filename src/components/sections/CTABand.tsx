import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CTABand({
  title = "Ready to get to work?",
  description = "Pick your ramp and a time that suits you — most bookings confirm within the hour.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-orange py-14 lg:py-16">
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-md text-sm font-medium text-white/90 sm:text-base">
            {description}
          </p>
        </div>
        <Button href="/booking" size="lg" variant="secondary" className="shrink-0">
          Book a Ramp
        </Button>
      </Container>
    </section>
  );
}
