import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { CONTACT, OPENING_HOURS } from "@/lib/site-config";

export default function Contact() {
  return (
    <section id="contact" className="bg-grey-50 py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact & Location"
            title="Find us in Douglas"
            description="Based on the Peel Road Industrial Estate — easy to reach from anywhere on the island."
          />

          <dl className="mt-8 space-y-6">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-grey-600">
                Address
              </dt>
              <dd className="mt-1 text-base text-ink-700">
                {CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-grey-600">
                Email
              </dt>
              <dd className="mt-1 text-base text-ink-700">
                <a href={`mailto:${CONTACT.email}`} className="hover:text-orange">
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-grey-600">
                WhatsApp
              </dt>
              <dd className="mt-1 text-base text-ink-700">
                <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`} className="hover:text-orange">
                  {CONTACT.whatsapp}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-grey-600">
                Opening Hours
              </dt>
              <dd className="mt-2 space-y-1 text-base text-ink-700">
                {OPENING_HOURS.map((row) => (
                  <div key={row.label} className="flex justify-between gap-6 sm:max-w-xs">
                    <span className="text-grey-600">{row.label}</span>
                    <span className="font-medium">{row.hours}</span>
                  </div>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/booking" size="lg">
              Book a Ramp
            </Button>
            <Button
              href={CONTACT.mapsUrl}
              size="lg"
              variant="ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </Button>
          </div>
        </div>

        <iframe
          title="Rent a Ramp location — Unit 2, Peel Road Industrial Estate, Douglas"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.addressLines.join(", "))}&output=embed`}
          className="aspect-[4/5] w-full border-0 lg:aspect-square"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </Container>
    </section>
  );
}
