import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { BOOKING_POLICY_VERSION, CONTACT, SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Ramp Hire Terms & Conditions",
  alternates: { canonical: "/terms" },
  description: "Read Rent a Ramp's booking, pricing, cancellation and workshop-use terms for self-service vehicle lift hire in Douglas, Isle of Man.",
};

const sections = [
  ["Who we are", `Rent a Ramp provides self-service vehicle ramp hire at ${CONTACT.addressLines.join(", ")}. Contact ${CONTACT.email} or WhatsApp ${CONTACT.whatsapp} with booking or workshop questions.`],
  ["Booking requests and confirmation", "Submitting the website form sends a request, not a reservation. An automatic acknowledgement confirms receipt only. Our team aims to respond within 24 hours and will confirm the ramp, date, start time, duration and price directly with you. Do not attend until you receive that confirmation. All times are Isle of Man local time. No payment is taken through this website."],
  ["Prices and optional extras", "All published prices include VAT. The same ramp hire rates apply to each bay: the first hour and additional-hour rate, or the selected half-day or full-day package, as displayed on the pricing page. The online total is for ramp hire only. Shared general tools, jacks, stands and air lines are included. Cleaning, oil/fluid/parts disposal, engine crane hire and specialist kit are extra, at the published rates or a price agreed with you before use. Bring your own parts and consumables. Longer hires and any work extending beyond your agreed session must be arranged with staff first."],
  ["Changes, cancellations and delays", "Contact us as soon as possible to change or cancel your request or confirmed booking. If you will arrive late, let us know; do not assume the finishing time can be extended. Any deposit, payment deadline or cancellation charge must be expressly explained and agreed when your booking is confirmed. We do not take deposits or cancellation payments through the website. If we cannot provide your confirmed bay, we will contact you to discuss an alternative or any refund due for a service we cannot provide."],
  ["Self-service use and vehicle suitability", "You are responsible for choosing work within your competence and for the parts and repairs you carry out. Ramp hire is not a mechanical repair, inspection, MOT or supervision service. Tell staff about your vehicle and proposed work, including modifications, unusual weight distribution or damage affecting lifting points. Staff must be satisfied that the vehicle and work are suitable for the available equipment. Posted equipment ratings, manufacturer instructions and on-site staff directions take priority over general website information."],
  ["Safety and conduct", "Read the Safety Guidance before requesting a booking. Attend the on-site induction and do not operate equipment until staff have explained its permitted use. Wear suitable protective equipment, keep others clear and stop immediately if anything appears unsafe. Do not work under the influence of alcohol, drugs or anything that impairs safe work. Unsafe use may be stopped. Do not leave a vehicle overnight or carry out hot work, welding, fuel-system work or other higher-risk activities without prior staff agreement."],
  ["Tools, cleaning and waste", "Use equipment only for its intended purpose and report faults or damage immediately. Do not use defective tools or attempt repairs to workshop equipment. Return tools and leave the bay clean and clear. Ask staff before disposing of any fluids, parts or other waste. Never pour waste into drains or mix unknown substances. Disposal and optional cleaning are charged separately; ask staff about any waste not covered by the published list."],
  ["Responsibility and statutory rights", "Take reasonable care of your vehicle, belongings, other people and workshop equipment. Report incidents promptly so they can be dealt with safely. Any responsibility for loss or damage depends on the circumstances and applicable law; these terms do not impose a blanket waiver of liability. Nothing in these terms excludes liability that cannot lawfully be excluded or limits your applicable consumer rights."],
  ["Personal information and complaints", `We use the details you submit to handle your request and contact you about the booking. Requests and acknowledgements are sent by email, not stored in an online booking database. See our Privacy Notice for more information. For a complaint or a question about these terms, email ${CONTACT.email} with the relevant booking details so we can investigate and respond.`],
];

export default function TermsPage() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange">Terms &amp; Conditions</p>
        <h1 className="font-display mt-2 text-4xl font-semibold uppercase text-ink sm:text-5xl">Ramp hire booking terms</h1>
        <p className="mt-4 text-sm text-grey-600">Policy version: {BOOKING_POLICY_VERSION}</p>
        <div className="mt-8 space-y-8 text-base leading-relaxed text-grey-600">
          {sections.map(([title, text]) => <section key={title}><h2 className="mb-3 font-display text-xl font-semibold uppercase text-ink">{title}</h2><p>{text}</p></section>)}
          <p>Read our <Link href="/safety" className="font-semibold text-orange underline">Safety Guidance</Link>, <Link href="/privacy" className="font-semibold text-orange underline">Privacy Notice</Link> and <Link href="/#pricing" className="font-semibold text-orange underline">current prices</Link> before requesting a booking with {SITE.name}.</p>
        </div>
      </Container>
    </section>
  );
}
