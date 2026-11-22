import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { BOOKING_POLICY_VERSION, SAFETY_NOTE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Self-Service Workshop Safety Guidance",
  alternates: { canonical: "/safety" },
  description: "Prepare for safe self-service vehicle lift hire at Rent a Ramp, Douglas: induction, vehicle suitability, protective equipment, tools and waste handling.",
};

const sections = [
  ["Before you arrive", "Only attend after your booking has been confirmed. Plan work you are competent to carry out and allow enough time to make the vehicle safe before the session ends. Tell staff what you intend to do and ask in advance about specialist equipment, unusual vehicles or higher-risk work. This guidance does not replace training, manufacturer instructions or the on-site induction."],
  ["Induction and protective equipment", "Report to staff before entering a bay or using any equipment. Follow the induction and staff instructions, and ask whenever you are unsure. Wear suitable protective footwear, close-fitting clothing and task-appropriate eye, hand and hearing protection. Tie back long hair and keep jewellery and loose items clear of moving equipment. Keep visitors out of the working area unless staff agree otherwise."],
  ["Vehicle positioning and lift use", "Have staff confirm that the selected lift is suitable for your vehicle and proposed task. Never exceed the posted equipment rating. Use only the vehicle and lift manufacturers' approved lifting points and procedures. Do not operate a lift unless you have been authorised and shown its controls and safety systems. Staff instructions and the specific lift manual take precedence; do not improvise lifting arrangements."],
  ["Working on a raised vehicle", "Keep people clear while a lift moves. Do not work beneath a vehicle unless the lift is safely supported using its specified locking or support system and staff are satisfied with the setup. Do not rely solely on a hydraulic jack. Removing engines, gearboxes, axles or other heavy components can change balance: stop and agree suitable support arrangements with staff before doing so. Never bypass safety devices."],
  ["Tools, electrical equipment and hazardous work", "Check tools before use, use the correct tool and report damage immediately. Do not use or repair defective workshop equipment. Keep leads and air lines clear of routes and moving parts. Welding, grinding, hot work, fuel-system work, high-voltage electric/hybrid vehicle work and work involving stored energy require prior staff agreement and appropriate competence. Do not smoke, use naked flames or run an engine indoors without staff-approved ventilation arrangements."],
  ["Housekeeping, fluids and waste", "Keep the bay and access routes clear, deal with spills promptly using staff-approved equipment, and keep emergency exits unobstructed. Ask staff where each waste type belongs and what it will cost before disposal. Do not mix fluids, pour waste into drains or leave waste outside designated containers. Return tools and leave the bay clean. Do not assume tyre, battery or hazardous-waste disposal is available; ask first."],
  ["If something goes wrong", "Stop work, keep people clear and alert a member of staff immediately if a vehicle moves unexpectedly, equipment behaves unusually or you discover damage, a spill, fire or injury. Use an emergency stop only as covered in your induction; do not attempt an unsafe recovery. Follow the on-site emergency procedure and staff directions. In an immediate emergency, call 999 or 112 and give the workshop address. Report near misses as well as accidents."],
  ["Before leaving", "Tell staff when you have finished. Remove tools and waste, and follow the correct lowering and departure procedure. You remain responsible for the work performed on your vehicle and for checking it is safe and legal to drive. If it cannot be made safe, do not drive it; agree a safe recovery or storage arrangement with staff. Extra time or overnight storage must be agreed, not assumed."],
];

export default function SafetyPage() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange">Safety Guidance</p>
        <h1 className="font-display mt-2 text-4xl font-semibold uppercase text-ink sm:text-5xl">Working safely at Rent a Ramp</h1>
        <p className="mt-4 text-sm text-grey-600">Policy version: {BOOKING_POLICY_VERSION}</p>
        <div className="mt-8 space-y-8 text-base leading-relaxed text-grey-600">
          <p>{SAFETY_NOTE}</p>
          {sections.map(([title, text]) => <section key={title}><h2 className="mb-3 font-display text-xl font-semibold uppercase text-ink">{title}</h2><p>{text}</p></section>)}
          <p>Please also read the <Link href="/terms" className="font-semibold text-orange underline">Terms &amp; Conditions</Link> before requesting your session.</p>
        </div>
      </Container>
    </section>
  );
}
