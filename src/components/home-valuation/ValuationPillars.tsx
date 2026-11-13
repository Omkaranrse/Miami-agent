"use client";

import { FileSpreadsheet, Hammer, TrendingUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";

const PILLARS = [
  {
    icon: FileSpreadsheet,
    title: "Comparable sales analysis.",
    description:
      "Recent closed sales of similar properties in your exact micro-market—what they listed for, what they closed at, days on market, and how they compare lot-by-lot to your home.",
  },
  {
    icon: TrendingUp,
    title: "Pricing strategy.",
    description:
      "Where we would position your asking price, what buyer pool it captures, and the negotiation range we plan around—delivered as a realistic spread rather than one arbitrary guess.",
  },
  {
    icon: Hammer,
    title: "Prep recommendations.",
    description:
      "Honest ROI guidance on what improvements, paint, or light staging actually increase net proceeds before listing—and which renovations are not worth spending money on.",
  },
];

export function ValuationPillars() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-b border-sand/60 bg-ivory py-24 sm:py-32">
      <PageContainer>
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">
            <span className="h-px w-8 bg-gold-dark/40" aria-hidden="true" />
            <span>What&apos;s Included</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[52px] lg:leading-[1.12]">
            What you get.
          </h2>

          <p className="mt-4 font-sans text-base font-light leading-relaxed text-muted sm:text-lg">
            Every home valuation pairs closed sales data with street-level Miami
            advisory.
          </p>
        </div>

        {/* Three Editorial Columns with Thin Vertical Separators (No Cards) */}
        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: shouldReduceMotion ? 0 : idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`flex flex-col justify-between py-2 ${
                  idx === 0
                    ? "lg:pr-10"
                    : "lg:border-l lg:border-sand/70 lg:pl-10 lg:pr-10"
                }`}
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xs bg-sand-light/60 text-navy">
                    <Icon className="h-5 w-5 text-gold-dark" />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-normal text-navy sm:text-[26px]">
                    {pillar.title}
                  </h3>

                  <p className="mt-4 font-sans text-sm font-light leading-relaxed text-charcoal/80 sm:text-[15px]">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
