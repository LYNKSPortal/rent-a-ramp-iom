import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import { TOOLS_EQUIPMENT } from "@/lib/site-config";

export default function Tools() {
  return (
    <section id="tools" className="bg-white py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Tools & Equipment"
            title="We stock the workshop. You bring the vehicle."
            description={TOOLS_EQUIPMENT.intro}
          />

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TOOLS_EQUIPMENT.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border border-grey-200 px-4 py-3 text-sm font-medium text-ink-700"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-orange" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-square">
          <Image
            src="/images/hero-cover-img.fa5e884b9c.webp"
            alt="Vehicle lifts inside the Rent a Ramp self-service workshop in Douglas"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
