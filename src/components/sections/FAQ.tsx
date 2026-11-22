"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="bg-white py-20 lg:py-28">
      <Container className="lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <SectionHeading
          eyebrow="FAQs"
          title="Good to know"
          description="Can't find your answer? Get in touch and we'll help directly."
        />

        <div className="mt-10 divide-y divide-grey-200 lg:mt-0">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold uppercase tracking-tight text-ink sm:text-lg">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "relative h-4 w-4 shrink-0 text-orange transition-transform duration-200",
                      isOpen && "rotate-45"
                    )}
                  >
                    <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-orange" />
                    <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-orange" />
                  </span>
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-40 pb-5" : "max-h-0"
                  )}
                >
                  <p className="text-sm leading-relaxed text-grey-600">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
