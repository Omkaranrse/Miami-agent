"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { VALUATION_STEPS } from "@/data/services";
import { PageContainer } from "@/components/layout/PageContainer";

const MILESTONE_TIMEFRAMES = [
  "Instant Submission · 1 Minute",
  "Subdivision Analysis · Within 24 Hours",
  "Tailored CMA Delivery · 2–3 Business Days",
  "Zero Obligation · Hold or List",
];

export function ValuationMilestonesTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-ivory py-24 sm:py-32">
      <PageContainer>
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">
              <span className="h-px w-8 bg-gold-dark/40" aria-hidden="true" />
              <span>How It Works</span>
            </div>

            <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[52px] lg:leading-[1.12]">
              Four steps to an accurate number.
            </h2>
          </div>

          <Link
            href="/calculators/home-sale-caculator"
            className="group inline-flex shrink-0 items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:text-gold-dark"
          >
            <span>Estimate Net Proceeds</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Framer "Milestones Timeline" Pattern */}
        <div className="mt-16">
          <div className="relative pl-10 sm:pl-12">
            {/* Connected Vertical Timeline Line */}
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-[15px] top-6 w-[2px] bg-sand"
            />
            {/* Active Highlight Line */}
            <motion.div
              aria-hidden="true"
              className="absolute left-[15px] top-6 w-[2px] bg-navy origin-top"
              animate={{
                height: `${(activeStep / (VALUATION_STEPS.length - 1)) * 82}%`,
              }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />

            <div className="space-y-10">
              {VALUATION_STEPS.map((step, idx) => {
                const isActive = idx === activeStep;

                return (
                  <motion.div
                    key={step.step}
                    onMouseEnter={() => setActiveStep(idx)}
                    onClick={() => setActiveStep(idx)}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : idx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group relative cursor-pointer border-b border-sand/60 pb-8 transition-all duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-65 hover:opacity-100"
                    }`}
                  >
                    {/* Numbered Milestone Marker */}
                    <div
                      className={`absolute -left-10 sm:-left-12 top-0.5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-navy text-white ring-4 ring-gold/40 shadow-sm"
                          : "border border-sand bg-white text-muted group-hover:border-navy group-hover:text-navy"
                      }`}
                    >
                      {step.step}
                    </div>

                    {/* Milestone Content */}
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-2 sm:gap-4">
                        <h3
                          className={`font-serif text-2xl transition-colors sm:text-3xl ${
                            isActive
                              ? "font-normal text-navy"
                              : "text-charcoal/80 group-hover:text-navy"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-dark/80">
                          {MILESTONE_TIMEFRAMES[idx]}
                        </span>
                      </div>

                      <p className="mt-3 font-sans text-sm font-light leading-relaxed text-charcoal/85 sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

