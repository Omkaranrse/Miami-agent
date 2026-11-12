"use client";

import { motion, useReducedMotion } from "framer-motion";
import { VERIFIED_PAST_RESULTS } from "@/data/agents";
import { PageContainer } from "@/components/layout/PageContainer";

export function SellerTrackRecord() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-y border-sand/60 bg-white py-24 sm:py-32">
      <PageContainer>
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">
            <span className="h-px w-8 bg-gold-dark/40" aria-hidden="true" />
            <span>Verified Brokerage Track Record</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[52px] lg:leading-[1.12]">
            Past results grounded in sharp pricing and legal follow-through.
          </h2>

          <p className="mt-4 font-sans text-base font-light leading-relaxed text-muted sm:text-lg">
            Real closed transactions from Move Miami Realty’s comparative market
            analysis portfolio—from rapid single-family sales above asking to
            multi-million dollar waterfront estates.
          </p>
        </div>

        {/* Editorial Horizontal Results Strip */}
        <div className="mt-16">
          <div className="-mx-4 flex overflow-x-auto pb-6 pl-4 pr-4 scrollbar-none sm:-mx-6 sm:pl-6 sm:pr-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:p-0">
            {VERIFIED_PAST_RESULTS.map((result, idx) => (
              <motion.div
                key={`${result.propertyType}-${result.soldPrice}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`flex min-w-[260px] flex-col justify-between py-2 sm:min-w-[280px] lg:min-w-0 ${
                  idx === 0
                    ? "pr-8 lg:pr-8"
                    : "border-l border-sand/70 pl-8 pr-8"
                }`}
              >
                <div>
                  {/* Subtle Badge */}
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                    {result.badge}
                  </span>

                  {/* Prominent Transaction Amount */}
                  <p className="mt-3 font-sans text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-[40px]">
                    {result.soldPrice}
                  </p>

                  {/* Property Type */}
                  <p className="mt-1 text-sm font-medium text-charcoal/90">
                    {result.propertyType}
                  </p>
                </div>

                {/* Refined Specs & Timeline */}
                <div className="mt-8 space-y-1 font-sans text-xs font-light text-muted">
                  {result.askingPrice && (
                    <p>Asked {result.askingPrice}</p>
                  )}
                  {result.daysOnMarket && (
                    <p>{result.daysOnMarket} on market</p>
                  )}
                  <p className="font-normal text-charcoal/70">{result.specs}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted/60 lg:hidden">
            <span>Scroll horizontally to view all results</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

