"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHY_RENT_A_RAMP } from "@/lib/site-config";

export default function WhyRentARamp() {
  return (
    <section className="bg-grey-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Rent a Ramp"
          title="Everything you need. Nothing you don't."
          description="A straightforward alternative to buying your own lift or paying garage labour rates."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_RENT_A_RAMP.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border-t-2 border-orange bg-white p-6"
            >
              <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-grey-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
