// =============================================================================
// CENTRAL SITE CONFIGURATION
// -----------------------------------------------------------------------------
// This file is the single source of truth for editable business data:
// pricing, opening hours, contact details, ramps, availability, FAQs, etc.
// Update values here to change what's shown across the site — no UI
// component edits required.
// =============================================================================

export type RampType = "2-post" | "4-post";

export interface RampPricing {
  firstHour: number;
  additionalHour: number;
  halfDay: number; // 4 hours — placeholder flat rate; real rate is "by prior agreement"
  fullDay: number; // 8 hours — placeholder flat rate; real rate is "by prior agreement"
}

/**
 * Standard ramp hire rate, matching the official price list — the same rate
 * applies to every ramp. halfDay/fullDay remain simple editable placeholders
 * since full-day/weekly hire is officially "available at a discounted rate
 * by prior agreement" rather than a fixed price.
 */
export const RAMP_HIRE_PRICING: RampPricing = {
  firstHour: 25,
  additionalHour: 20,
  halfDay: 80,
  fullDay: 120,
};

/** All prices shown on the site are inclusive of VAT. */
export const PRICES_INCLUDE_VAT_NOTE = "All prices include VAT.";

export interface AddOnService {
  name: string;
  price: number;
  unit?: string;
}

export const ADD_ON_SERVICES: AddOnService[] = [
  { name: "Cleaning (if you'd like us to clean the work area)", price: 10 },
  { name: "Oil disposal", price: 8.5 },
  { name: "Other liquids / fluids disposal", price: 5 },
  { name: "Parts disposal", price: 5 },
  { name: "Engine crane hire", price: 15 },
  { name: "Specialist kit / tools hire (e.g. timing kit, water pump kit, etc.)", price: 15 },
];

export const PRICING_NOTE =
  "Ramp hire includes your selected bay and access to shared general workshop tools. Cleaning, disposal, engine crane hire and specialist kit are charged separately as listed. Extras are agreed with you before use and are not included in the online total.";

export const BOOKING_POLICY_VERSION = "2026-11-22";

export interface Ramp {
  id: string;
  slug: string;
  name: string;
  type: RampType;
  tagline: string;
  description: string;
  maxWeightKg: number;
  height: string;
  features: string[];
  pricing: RampPricing;
  /** Simple availability placeholder copy shown on the ramp card. */
  availabilityNote: string;
  imageAlt: string;
  /** Optional path to a real product photo in /public. Falls back to the illustrated placeholder when unset. */
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface OpeningHoursRow {
  label: string;
  hours: string;
}

export const SITE = {
  name: "Rent a Ramp",
  shortName: "Rent a Ramp",
  url: "https://www.rentaramp.im",
  description:
    "Car ramp hire and vehicle lift hire in Douglas, Isle of Man. Use our DIY garage with 2-post and 4-post lifts, shared general tools and clear hourly prices. All bookings require confirmation.",
  tagline: "Need a ramp? Rent one.",
  subTagline: "You do the work. We provide the workshop.",
};

export const CONTACT = {
  whatsapp: "+44 76 2433 2271",
  email: "bookings@rentaramp.im",
  addressLines: ["Unit 2, Peel Road Industrial Estate", "Douglas", "Isle of Man", "IM1 5EP"],
  mapQuery: "Peel Road Industrial Estate, Douglas, Isle of Man",
  // Replace with a real embed URL / Google Maps place link when available.
  mapsUrl: "https://maps.google.com/?q=Peel+Road+Industrial+Estate+Douglas+Isle+of+Man",
  socials: {
    facebook: "https://facebook.com/rentaramp",
    instagram: "https://instagram.com/rentaramp",
  },
};

export const OPENING_HOURS: OpeningHoursRow[] = [
  { label: "Monday – Friday", hours: "9:00am – 5:00pm" },
  { label: "Saturday", hours: "10:00am – 4:00pm" },
  { label: "Sunday", hours: "Closed" },
];

/**
 * Used to generate bookable time slots in the booking flow.
 * dayHours maps JS Date#getDay() (0 = Sunday) to opening/closing hour in 24h
 * time (decimal, e.g. 9.25 = 9:15am), or `null` if closed that day.
 */
export const BOOKING_HOURS: {
  slotLengthHours: number;
  dayHours: Record<number, { open: number; close: number } | null>;
} = {
  slotLengthHours: 1,
  dayHours: {
    0: null, // Sunday — closed
    1: { open: 9, close: 17 }, // Monday, 9:00am – 5:00pm
    2: { open: 9, close: 17 },
    3: { open: 9, close: 17 },
    4: { open: 9, close: 17 },
    5: { open: 9, close: 17 }, // Friday
    6: { open: 10, close: 16 }, // Saturday, 10:00am – 4:00pm
  },
};

export const BOOKING_DURATIONS = [
  { id: "1h", label: "1 Hour", hours: 1 },
  { id: "2h", label: "2 Hours", hours: 2 },
  { id: "half", label: "Half Day (4 hrs)", hours: 4 },
  { id: "full", label: "Full Day (8 hrs)", hours: 8 },
] as const;

export const RAMPS: Ramp[] = [
  {
    id: "2post-a",
    slug: "2-post-lift-a",
    name: "2-Post Lift A",
    type: "2-post",
    tagline: "Fast access for routine jobs",
    description:
      "A symmetric 2-post lift ideal for brakes, exhausts, tyres and general maintenance. Quick to set up and easy to use if you're comfortable working under a raised vehicle.",
    maxWeightKg: 4000,
    height: "1.9m max lift height",
    features: [
      "Symmetric arms for wide door clearance",
      "Suits cars, 4x4s & light vans",
      "Adjustable rubber pad height",
      "Free-standing floor space around the vehicle",
    ],
    pricing: RAMP_HIRE_PRICING,
    availabilityNote: "Requests checked manually — confirmation required",
    imageAlt: "Two-post vehicle lift ramp in a workshop bay",
    image: "/images/2-post-ramp-a.8a4f39850b.webp",
  },
  {
    id: "2post-b",
    slug: "2-post-lift-b",
    name: "2-Post Lift B",
    type: "2-post",
    tagline: "Our second bay for everyday work",
    description:
      "Our second 2-post bay — identical spec to Lift A, giving you more availability across the week. Great for servicing, suspension and underbody work.",
    maxWeightKg: 4000,
    height: "1.9m max lift height",
    features: [
      "Symmetric arms for wide door clearance",
      "Suits cars, 4x4s & light vans",
      "Adjustable rubber pad height",
      "Positioned next to the tool wall",
    ],
    pricing: RAMP_HIRE_PRICING,
    availabilityNote: "Requests checked manually — confirmation required",
    imageAlt: "Second two-post vehicle lift ramp in the workshop",
    image: "/images/2-post-ramp-b.847efe46d8.webp",
  },
  {
    id: "4post-a",
    slug: "4-post-lift",
    name: "4-Post Lift",
    type: "4-post",
    tagline: "Full drive-on platform for bigger jobs",
    description:
      "A drive-on 4-post lift with a full-length platform — perfect for wheel alignment, larger vehicles, or jobs where you need a stable, wide working platform rather than clamped arms.",
    maxWeightKg: 5500,
    height: "1.8m max lift height",
    features: [
      "Drive-on platform, no clamping needed",
      "Suits larger vehicles, vans & motorhomes",
      "Sliding jacks for wheel-off work",
      "Extra floor space for tools & parts",
    ],
    pricing: RAMP_HIRE_PRICING,
    availabilityNote: "Requests checked manually — confirmation required",
    imageAlt: "Four-post drive-on vehicle lift ramp in the workshop",
    image: "/images/4-post-ramp-c.8de2ad3bd7.webp",
  },
];

export const LONGER_BOOKING_NOTE =
  "Need a ramp for more than a day — a full restoration project or multi-day job? Full-day and weekly ramp hire may be available at a discounted rate by prior agreement — get in touch to check availability.";

export const TOOLS_EQUIPMENT = {
  intro:
    "Ramp hire includes access to shared general tools, jacks, stands and air lines. Bring your parts and consumables. Engine crane hire, specialist kit, cleaning and waste disposal cost extra; see the pricing table and agree extras with Tomasz before use.",
  items: [
    "Trolley jacks & axle stands",
    "Impact wrenches & torque wrenches",
    "Sockets, spanners & general hand tools",
    "Oil drain trolleys (disposal charged separately)",
    "Brake & clutch bleeding kits",
    "Compressed air line at every bay",
    "Work lights & extension leads",
    "Oil, fluid & parts disposal available at extra cost",
  ],
};

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose Your Ramp",
    description:
      "Pick the 2-post or 4-post lift that suits your vehicle and the job you're doing.",
  },
  {
    step: "02",
    title: "Choose Your Time",
    description:
      "Select a date and time slot that works for you — book by the hour, half day or full day.",
  },
  {
    step: "03",
    title: "Get Confirmation & Arrive",
    description:
      "Send your request. Our team will reply within 24 hours to confirm availability. Only come to the workshop once your booking is confirmed.",
  },
];

export const WHY_RENT_A_RAMP = [
  {
    title: "No workshop overheads",
    description:
      "Get proper lift access without owning a garage, a ramp, or a full toolkit.",
  },
  {
    title: "Professional equipment",
    description:
      "Commercial-grade 2-post and 4-post lifts, serviced and safety-checked regularly.",
  },
  {
    title: "Pay for what you use",
    description:
      "A simple hourly rate with discounted extra hours — only pay for the time you need.",
  },
  {
    title: "Everything on hand",
    description:
      "Shared general tools, jacks and air lines are included. Waste disposal, cleaning, engine crane hire and specialist kit are priced separately.",
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "Where can I hire a vehicle ramp in Douglas?",
    answer: `Rent a Ramp is a self-service vehicle workshop at ${CONTACT.addressLines.join(", ")}. Choose from two 2-post lifts and one 4-post lift, with workshop tools available.`,
  },
  {
    question: "How much does ramp hire cost?",
    answer: `All ramps cost £${RAMP_HIRE_PRICING.firstHour} for the first hour and £${RAMP_HIRE_PRICING.additionalHour} for each additional hour. A half day (4 hours) is £${RAMP_HIRE_PRICING.halfDay} and a full day (8 hours) is £${RAMP_HIRE_PRICING.fullDay}. All prices include VAT. Add-on services are priced separately.`,
  },
  {
    question: "How do I request a ramp booking?",
    answer: "Choose a ramp, duration, date and time on our booking page, then enter your contact details and submit your request. Your request is emailed directly to our team. Your booking is only confirmed once we reply; the website does not show live availability or take payment.",
  },
  {
    question: "What are your opening hours?",
    answer: `${OPENING_HOURS.map(({ label, hours }) => `${label}: ${hours}`).join(". ")}. Full-day hire must fit the workshop opening hours.`,
  },
  {
    question: "Do I need my own tools?",
    answer:
      "Shared general tools, jacks, stands and air lines are included in ramp hire. You can bring your own tools, parts and consumables. Specialist kit and engine crane hire cost extra, as do cleaning and waste disposal; please agree these before use.",
  },
  {
    question: "Do I need experience to use the ramps?",
    answer:
      "Rent a Ramp is self-service, so you'll need to be confident working on vehicles and using a lift safely. Our team can show you the basics of the ramp controls, but we don't provide mechanical supervision.",
  },
  {
    question: "What vehicles can you lift?",
    answer:
      "Our 2-post lifts handle cars, 4x4s and light vans up to 4,000kg. The 4-post lift takes larger vehicles, vans and motorhomes up to 5,500kg. Check individual ramp details for exact specs.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "You can book same-week for most slots, but our 4-post lift is popular and gets booked up faster — we'd recommend booking a few days ahead where possible.",
  },
  {
    question: "Can I extend my session if I need more time?",
    answer:
      "If the bay isn't booked immediately after your slot, we're usually happy to extend on the day at the standard hourly rate. Just ask a member of the team.",
  },
  {
    question: "What happens if I need to cancel or reschedule?",
    answer:
      "Get in touch as early as you can by WhatsApp or email and we'll do our best to move your booking to another available slot.",
  },
];

export const SAFETY_NOTE =
  "Rent a Ramp is a self-service facility. Follow the on-site induction, lift manufacturer instructions and staff directions. Stop work and ask for help if you are unsure. Your booking must be confirmed before you attend.";
