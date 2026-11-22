import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-cover-img.fa5e884b9c.webp"
          alt="Rent a Ramp workshop bay in Douglas, Isle of Man, with 2-post and 4-post lifts"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" />

      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#ff5a5c]">
            Car ramp hire &amp; DIY garage · Isle of Man
          </p>
          <h1 className="font-display text-5xl font-semibold uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Need a ramp?
            <br />
            <span className="text-[#e10205]">Rent one.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80 sm:text-xl">
            You do the work. We provide the workshop. Book professional 2-post
            and 4-post lifts by the hour and work on your own vehicle with
            proper tools and equipment on hand.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/booking" size="lg">
              Book a Ramp
            </Button>
            <Button href="/#pricing" size="lg" variant="outline-light">
              View Prices
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
