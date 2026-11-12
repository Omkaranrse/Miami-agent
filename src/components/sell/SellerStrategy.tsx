"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";

export function SellerStrategy() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-ivory py-24 sm:py-32">
      <PageContainer>
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">
            <span className="h-px w-8 bg-gold-dark/40" aria-hidden="true" />
            <span>Seller Strategy</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[56px] lg:leading-[1.1]">
            Two paths. One team.
          </h2>
          <p className="mt-5 font-sans text-base font-light leading-relaxed text-muted sm:text-lg">
            Every seller situation is different. Pick the path that fits your
            timeline and property—or speak with Victor directly and compare both
            side by side.
          </p>
        </div>

        {/* Asymmetrical Editorial Comparison Panels */}
        <div className="mt-14 grid grid-cols-1 overflow-hidden lg:grid-cols-12">
          {/* Path One: Cash Offer (Deep Purple Treatment) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col justify-between bg-navy p-8 text-ivory sm:p-12 lg:col-span-6 lg:p-16"
          >
            {/* Ambient Background Aura */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-gold-dark/20 blur-[90px]"
            />

            <div className="relative z-10">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-gold">
                Speed &amp; Certainty
              </span>

              <h3 className="mt-4 font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-[44px]">
                Get a cash offer.
              </h3>

              <p className="mt-5 font-sans text-sm font-light leading-relaxed text-ivory/80 sm:text-base">
                If speed and certainty matter more than squeezing out the last
                dollar, our cash offer path lets you close on your timeline—no
                showings, no repairs, no financing contingencies. Tell us about
                your property and we’ll bring a verified cash offer in 72 hours
                or shop your home to our vetted investor network.
              </p>
            </div>

            <div className="relative z-10 mt-10 pt-6">
              <Link
                href="/cash-offer"
                className="group inline-flex items-center gap-2.5 bg-gold px-7 py-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-all duration-300 hover:bg-white"
              >
                <span>Start a Cash Offer</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Path Two: Traditional Listing (Light Lavender Treatment) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col justify-between border-t border-sand/60 bg-[#F1ECFA]/45 p-8 text-charcoal sm:p-12 lg:col-span-6 lg:border-l lg:border-t-0 lg:p-16"
          >
            <div>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-gold-dark">
                Maximum Market Value
              </span>

              <h3 className="mt-4 font-serif text-3xl font-normal tracking-tight text-navy sm:text-4xl lg:text-[44px]">
                List with us.
              </h3>

              <p className="mt-5 font-sans text-sm font-light leading-relaxed text-charcoal/80 sm:text-base">
                If maximizing your net sale price is the priority, the
                traditional listing path—paired with comparative market analysis,
                targeted preparation ROI advice, and architectural media
                marketing—consistently outperforms. Start with a broker-prepared
                valuation grounded in real comps.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 pt-6">
              <Link
                href="/home-valuation"
                className="group inline-flex items-center gap-2.5 bg-navy px-7 py-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-navy-light"
              >
                <span>Get a Free Valuation</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/calculators/home-sale-caculator"
                className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:text-gold-dark"
              >
                <span>Estimate Net Proceeds</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-navy/70" />
              </Link>
            </div>
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}

