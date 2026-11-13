"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";

const COMPARISON_ROWS = [
  {
    aspect: "Data Basis",
    online: "Generic public-record algorithm",
    moveMiami: "Local broker analysis + verified recent comps",
  },
  {
    aspect: "Property Context",
    online: "No interior review or condition nuance",
    moveMiami: "Reviewed personally by a licensed Miami agent",
  },
  {
    aspect: "Output",
    online: "Single automated estimate",
    moveMiami: "Realistic pricing spread + go-to-market strategy",
  },
  {
    aspect: "Follow-Through",
    online: "Zero human follow-up",
    moveMiami: "1-on-1 conversation via phone or WhatsApp",
  },
];

export function ValuationHighlightCompare() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-b border-sand/60 bg-white py-24 sm:py-32">
      <PageContainer>
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">
            <span className="h-px w-8 bg-gold-dark/40" aria-hidden="true" />
            <span>Why Not Just a Zestimate?</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[52px] lg:leading-[1.12]">
            Algorithms miss the things that matter.
          </h2>

          <p className="mt-4 font-sans text-base font-light leading-relaxed text-muted sm:text-lg">
            Online estimates pull public square footage, beds, baths, and last
            sale price. They miss your renovated kitchen, your exposure and view
            corridor, your lot shape, and whether the comp two blocks away was a
            tear-down.
          </p>
        </div>

        {/* Framer "Highlight Compare" Inspired Editorial Layout */}
        <div className="mt-16">
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-8 border-b border-sand/70 pb-5 text-xs font-semibold uppercase tracking-[0.2em]">
              <div className="col-span-4 text-muted">Comparison Dimension</div>
              <div className="col-span-4 pl-4 text-muted">Online Estimate (Zestimate)</div>
              <div className="col-span-4 -mt-2 rounded-t-xs bg-navy px-6 py-3 text-gold shadow-sm">
                Move Miami Valuation
              </div>
            </div>

            <div className="divide-y divide-sand/50">
              {COMPARISON_ROWS.map((row, idx) => (
                <motion.div
                  key={row.aspect}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="grid grid-cols-12 items-center gap-8 py-6"
                >
                  {/* Dimension Name */}
                  <div className="col-span-4">
                    <span className="font-serif text-xl text-navy sm:text-[22px]">
                      {row.aspect}
                    </span>
                  </div>

                  {/* Online Estimate Column */}
                  <div className="col-span-4 flex items-start gap-3 pl-4">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sand-light text-muted">
                      <X className="h-2.5 w-2.5" />
                    </div>
                    <span className="font-sans text-sm font-light text-charcoal/70">
                      {row.online}
                    </span>
                  </div>

                  {/* Highlighted Move Miami Column */}
                  <div className="col-span-4 flex items-start gap-3 bg-navy px-6 py-4 text-white shadow-xs">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold/25 text-gold">
                      <Check className="h-2.5 w-2.5" />
                    </div>
                    <span className="font-sans text-sm font-medium leading-relaxed text-ivory">
                      {row.moveMiami}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile & Tablet Stacked View */}
          <div className="space-y-8 lg:hidden">
            {COMPARISON_ROWS.map((row, idx) => (
              <motion.div
                key={row.aspect}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-b border-sand/70 pb-6"
              >
                <h3 className="font-serif text-xl font-normal text-navy">
                  {row.aspect}
                </h3>

                <div className="mt-3 space-y-3">
                  {/* Online Estimate */}
                  <div className="flex items-start gap-3 rounded-xs bg-sand-light/40 p-3.5">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sand text-muted">
                      <X className="h-2.5 w-2.5" />
                    </div>
                    <div>
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                        Online Algorithm
                      </p>
                      <p className="mt-0.5 font-sans text-sm font-light text-charcoal/75">
                        {row.online}
                      </p>
                    </div>
                  </div>

                  {/* Move Miami Highlighted */}
                  <div className="flex items-start gap-3 rounded-xs bg-navy p-4 text-white shadow-xs">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold/25 text-gold">
                      <Check className="h-2.5 w-2.5" />
                    </div>
                    <div>
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                        Move Miami Valuation
                      </p>
                      <p className="mt-0.5 font-sans text-sm font-medium leading-relaxed text-ivory">
                        {row.moveMiami}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

