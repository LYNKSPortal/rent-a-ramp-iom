import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RampCard from "@/components/sections/RampCard";
import { RAMPS } from "@/lib/site-config";

export default function Ramps() {
  return (
    <section id="ramps" className="bg-grey-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Ramps"
          title="Two 2-post lifts. One 4-post lift."
          description="Choose the bay that fits your vehicle and the job at hand — every bay is safety-checked and workshop-ready."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {RAMPS.map((ramp, i) => (
            <RampCard key={ramp.id} ramp={ramp} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
