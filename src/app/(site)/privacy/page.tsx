import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { CONTACT } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Rent a Ramp uses booking enquiry details, email delivery and website analytics for its self-service workshop in Douglas, Isle of Man.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold uppercase text-ink">Privacy notice</h1>
        <div className="mt-8 space-y-6 leading-relaxed text-grey-600">
          <h2 className="font-display text-xl uppercase text-ink">Booking enquiries</h2>
          <p>We use your name, email, phone number, requested booking details, policy acceptance and optional notes to respond to your enquiry and manage your booking. Please do not include payment card details, health information or other sensitive information in your notes. No payment is collected by this website.</p>
          <h2 className="font-display text-xl uppercase text-ink">Email and service providers</h2>
          <p>The website is hosted by Vercel and uses Resend to send the request to our workshop inbox and an acknowledgement to you. Booking details are handled in those email systems rather than an online booking database. Our hosting and email providers may process data outside the Isle of Man. We use the details to respond to your request, provide the service and meet applicable legal obligations, not to subscribe you to marketing.</p>
          <h2 className="font-display text-xl uppercase text-ink">Website analytics and external services</h2>
          <p>When enabled, Vercel Web Analytics provides aggregate page and conversion statistics without advertising cookies. Conversion events record booking submissions and booking, WhatsApp and email link clicks, not your form details. Query strings are removed from page analytics. Google Maps loads in the contact section and may receive your IP address and apply its own privacy settings. WhatsApp opens an external service when you choose its link.</p>
          <h2 className="font-display text-xl uppercase text-ink">Retention and your choices</h2>
          <p>Booking correspondence may remain in our business mailbox and our providers retain operational records under their own service policies. Contact us to ask about retention, request access to or correction of your details, or request deletion where applicable. We may need to keep information required for legal or accounting purposes. You can contact us directly instead of using the form.</p>
          <p>For privacy questions, contact <a className="text-orange underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> at {CONTACT.addressLines.join(", ")}. You may also raise a concern with the Isle of Man Information Commissioner.</p>
        </div>
      </Container>
    </section>
  );
}
