import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import BookingFlow from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Request Ramp Hire in Douglas",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Request Ramp Hire in Douglas | Rent a Ramp",
    description: "Choose a vehicle lift, date and duration, then submit your booking request directly to our team. All bookings require confirmation.",
    url: "/booking",
    images: ["/images/hero-cover-img.fa5e884b9c.webp"],
  },
  description:
    "Choose your ramp, date and time slot, and book your self-service workshop bay in Douglas, Isle of Man.",
};

export default async function BookingPage({ searchParams }: PageProps<"/booking">) {
  const params = await searchParams;
  const preselectedRamp = typeof params.ramp === "string" ? params.ramp : undefined;
  return (
    <section className="bg-grey-50 py-14 lg:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Book a Ramp
          </p>
          <h1 className="font-display mt-2 text-4xl font-semibold uppercase tracking-tight text-ink sm:text-5xl">
            Choose your ramp &amp; time
          </h1>
          <p className="mt-4 text-base leading-relaxed text-grey-600">
            Pick a bay, pick a slot, and see your price before you go. We&rsquo;ll
            confirm availability by email. This is a booking request, not an instant reservation.
          </p>
        </div>

        <BookingFlow preselectedRamp={preselectedRamp} />
      </Container>
    </section>
  );
}
