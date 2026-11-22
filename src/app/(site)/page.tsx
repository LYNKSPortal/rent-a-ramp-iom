import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Ramps from "@/components/sections/Ramps";
import CTABand from "@/components/sections/CTABand";
import Tools from "@/components/sections/Tools";
import Pricing from "@/components/sections/Pricing";
import WhyRentARamp from "@/components/sections/WhyRentARamp";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

import type { Metadata } from "next";
import { BOOKING_HOURS, CONTACT, FAQS, RAMP_HIRE_PRICING, SITE } from "@/lib/site-config";
import { formatHour } from "@/lib/availability";

export const metadata: Metadata = {
  title: { absolute: "Ramp Hire Douglas, Isle of Man | Rent a Ramp" },
  description: "Hire a 2-post or 4-post vehicle lift in Douglas, Isle of Man. £25 first hour, £20 each additional hour, including VAT. Request a workshop bay by email.",
  alternates: { canonical: "/" },
};

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutomotiveBusiness",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      image: `${SITE.url}/hero-cover-img.jpg`,
      logo: `${SITE.url}/logo-dark.png`,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.addressLines[0],
        addressLocality: CONTACT.addressLines[1],
        addressCountry: "IM",
        postalCode: CONTACT.addressLines[3],
      },
      areaServed: { "@type": "Place", name: "Isle of Man" },
      hasMap: CONTACT.mapsUrl,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Booking enquiries via WhatsApp",
        url: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`,
      },
      openingHoursSpecification: Object.entries(BOOKING_HOURS.dayHours).flatMap(([day, hours]) =>
        hours ? [{
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${days[Number(day)]}`,
          opens: formatHour(hours.open),
          closes: formatHour(hours.close),
        }] : []
      ),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      inLanguage: "en-GB",
      publisher: { "@id": `${SITE.url}/#business` },
    },
    {
      "@type": "Service",
      name: "Self-service vehicle ramp hire",
      serviceType: "2-post and 4-post vehicle lift hire",
      provider: { "@id": `${SITE.url}/#business` },
      areaServed: { "@type": "Place", name: "Douglas, Isle of Man" },
      url: `${SITE.url}/booking`,
      offers: {
        "@type": "Offer",
        price: RAMP_HIRE_PRICING.firstHour,
        priceCurrency: "GBP",
        description: "First hour of ramp hire, including VAT. Additional hours £20. Bookings require confirmation.",
        url: `${SITE.url}/booking`,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/#faqs`,
      mainEntity: FAQS.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <HowItWorks />
      <Ramps />
      <CTABand />
      <Tools />
      <Pricing />
      <WhyRentARamp />
      <FAQ />
      <Contact />
    </>
  );
}
