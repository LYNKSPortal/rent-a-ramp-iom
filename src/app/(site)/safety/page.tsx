import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { SAFETY_NOTE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Safety Guidance",
  alternates: { canonical: "/safety" },
  robots: { index: false, follow: true },
  description: "Safety guidance for using Rent a Ramp's self-service workshop bays.",
};

export default function SafetyPage() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
          Safety Guidance
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold uppercase tracking-tight text-ink sm:text-5xl">
          Working safely at Rent a Ramp
        </h1>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-grey-600">
          <p>{SAFETY_NOTE}</p>
          <ul className="list-disc space-y-3 pl-5">
            <li>Always engage the lift&rsquo;s mechanical safety locks before working underneath a raised vehicle.</li>
            <li>Check that your vehicle is correctly and evenly positioned on the arms or platform before lifting.</li>
            <li>Wear appropriate footwear and eye protection when working under a vehicle.</li>
            <li>Keep the bay area clear of trip hazards, tools and spilled fluids.</li>
            <li>Do not exceed the maximum rated weight for the ramp you have booked.</li>
            <li>Ask a member of staff if you&rsquo;re ever unsure how to operate the lift controls.</li>
            <li>Dispose of waste oil, coolant and tyres only in the designated collection points.</li>
          </ul>
          <p>
            This page is a placeholder for your full safety policy. Replace this
            copy with your official health &amp; safety documentation before
            launch.
          </p>
        </div>
      </Container>
    </section>
  );
}
