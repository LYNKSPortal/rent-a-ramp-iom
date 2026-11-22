import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { CONTACT, SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
  description: `Terms and conditions for booking a workshop bay with ${SITE.name}.`,
};

export default function TermsPage() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
          Terms &amp; Conditions
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold uppercase tracking-tight text-ink sm:text-5xl">
          Booking terms
        </h1>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-grey-600">
          <p>
            This page is a placeholder for your full terms and conditions.
            Replace this copy with your official terms before launch.
          </p>
          <h2 className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
            Bookings
          </h2>
          <p>
            Bookings are confirmed by phone or email once availability has
            been checked. Prices shown on the site are placeholders and may
            change — your final price will be confirmed at the time of
            booking.
          </p>
          <h2 className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
            Cancellations
          </h2>
          <p>
            Please contact us as early as possible if you need to cancel or
            reschedule a booking.
          </p>
          <h2 className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
            Liability
          </h2>
          <p>
            Rent a Ramp is a self-service facility. Vehicles are lifted and
            worked on at the customer&rsquo;s own risk, in line with our safety
            guidance.
          </p>
          <p>
            Questions about these terms? Contact us at{" "}
            <a href={`mailto:${CONTACT.email}`} className="font-medium text-orange">
              {CONTACT.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
