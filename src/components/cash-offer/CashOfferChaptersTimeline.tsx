"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CASH_OFFER_STEPS } from "@/data/services";
import { PageContainer } from "@/components/layout/PageContainer";

const MILESTONE_IMAGES = [
  {
    image: "/images/services/cash-offer.jpg",
    caption: "Stage 01 · Neighborhood Comparable Sales Analysis",
  },
  {
    image: "/images/properties/6351-nw-38th-ter/cover.jpg",
    caption: "Stage 02 · WhatsApp Direct Photo & Condition Review",
  },
  {
    image: "/images/properties/12940-sw-82-ct/cover.jpg",
    caption: "Stage 03 · Verified 72-Hour Formal Written Cash Offer",
  },
  {
    image: "/images/heroes/hero-waterfront.jpg",
    caption: "Stage 04 · Zero-Pressure Decision & Closing",
  },
];

export function CashOfferChaptersTimeline() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-ivory py-24 sm:py-32">
      <PageContainer>
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">
            <span className="h-px w-8 bg-gold-dark/40" aria-hidden="true" />
            <span>Chapters Timeline</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-[1.1]">
            What happens next.
          </h2>

          <p className="mt-4 font-sans text-base font-light leading-relaxed text-muted sm:text-lg">
            Transparent underwriting backed by our local investor network and
            managing broker Victor A. Ruiz, Esq.
          </p>
        </div>

        {/* Chapters Split Layout (Desktop & Mobile) */}
        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Architectural Imagery (Sticky on Desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-36">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMilestone}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={MILESTONE_IMAGES[activeMilestone].image}
                      alt={MILESTONE_IMAGES[activeMilestone].caption}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                        Move Miami Underwriting
                      </p>
                      <p className="font-serif text-base text-white">
                        {MILESTONE_IMAGES[activeMilestone].caption}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Connected Chapters Timeline */}
          <div className="lg:col-span-7">
            <div className="relative pl-10 sm:pl-12">
              {/* Connected Vertical Timeline Bar */}
              <div
                aria-hidden="true"
                className="absolute bottom-8 left-[15px] top-6 w-[2px] bg-sand"
              />
              {/* Active Segment Fill */}
              <motion.div
                aria-hidden="true"
                className="absolute left-[15px] top-6 w-[2px] bg-navy origin-top"
                animate={{
                  height: `${(activeMilestone / (CASH_OFFER_STEPS.length - 1)) * 82}%`,
                }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              />

              <div className="space-y-10">
                {CASH_OFFER_STEPS.map((step, idx) => {
                  const isActive = idx === activeMilestone;

                  return (
                    <div
                      key={step.step}
                      onMouseEnter={() => setActiveMilestone(idx)}
                      onClick={() => setActiveMilestone(idx)}
                      className={`group relative cursor-pointer border-b border-sand/60 pb-8 transition-all duration-300 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-65 hover:opacity-100"
                      }`}
                    >
                      {/* Numbered Milestone Marker on Timeline */}
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
                        <div className="flex items-baseline justify-between gap-4">
                          <h3
                            className={`font-serif text-2xl transition-colors sm:text-3xl ${
                              isActive
                                ? "font-normal text-navy"
                                : "text-charcoal/80 group-hover:text-navy"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-dark/75">
                            Stage {step.step}
                          </span>
                        </div>

                        <p className="mt-3 font-sans text-sm font-light leading-relaxed text-charcoal/85 sm:text-base">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

