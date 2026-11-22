import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/site-config";

export default function FAQ() {
  return (
    <section id="faqs" className="bg-white py-20 lg:py-28">
      <Container className="lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <SectionHeading eyebrow="FAQs" title="Good to know" description="Can't find your answer? Get in touch and we'll help directly." />
        <div className="mt-10 divide-y divide-grey-200 lg:mt-0">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-base font-semibold uppercase text-ink sm:text-lg [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span aria-hidden="true" className="shrink-0 text-2xl text-orange group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-grey-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
