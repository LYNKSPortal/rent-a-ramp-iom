import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Thank You for Your Booking Request",
  robots: { index: false, follow: true },
};

export default function BookingThankYouPage() {
  return (
    <section className="bg-grey-50 py-20 lg:py-28">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange">Booking request received</p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase text-ink sm:text-5xl">
          Thank you for your submission
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink">
          A member of our team will be in touch within 24 hours.
        </p>
        <p className="mt-4 leading-relaxed text-grey-600">
          Please check your email for an acknowledgement that your request has gone through.
          If you cannot find it, please check your spam or junk folder.
        </p>
        <div className="mt-8 border-l-4 border-orange bg-white p-6">
          <h2 className="font-display text-xl font-semibold uppercase text-ink">Your booking is not yet confirmed</h2>
          <p className="mt-2 leading-relaxed text-grey-600">
            The acknowledgement email confirms receipt of your request only. Please wait for
            a member of our team to contact you and confirm availability before coming to the workshop.
            No payment has been taken.
          </p>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-grey-600">
          Need to change your request? Email{" "}
          <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4">{CONTACT.email}</a>{" "}
          or contact us on{" "}
          <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`} className="underline underline-offset-4">WhatsApp</a>.
        </p>
        <div className="mt-8"><Button href="/">Back to Home</Button></div>
      </Container>
    </section>
  );
}
