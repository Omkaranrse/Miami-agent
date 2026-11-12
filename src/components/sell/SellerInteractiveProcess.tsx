"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SELLER_PROCESS } from "@/data/services";
import { PageContainer } from "@/components/layout/PageContainer";

const STEP_SUBTITLES = [
  "Direct Conversation & Goal Alignment",
  "Comparative Market Analysis & Inspection",
  "Cash Offer or Strategic MLS Listing",
  "Litigation-Grade Legal Contract Review",
];

export function SellerInteractiveProcess() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-ivory py-24 sm:py-32">
      <PageContainer>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading, Context & Architectural Image (Sticky on Desktop) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <div className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">
                <span className="h-px w-8 bg-gold-dark/40" aria-hidden="true" />
                <span>Selling Process</span>
              </div>

              <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-navy sm:text-4xl lg:text-[50px] lg:leading-[1.12]">
                How selling with Move Miami works.
              </h2>

              <p className="mt-4 font-sans text-base font-light leading-relaxed text-muted sm:text-lg">
                Four clear stages from first conversation to final closing. Every
                transaction is guided directly by our licensed Florida team with
                contract review led by Victor A. Ruiz, Esq.
              </p>

              {/* Supporting Architectural Photograph */}
              <div className="relative mt-8 hidden aspect-[16/10] w-full overflow-hidden sm:block">
                <Image
                  src="/images/services/sell.jpg"
                  alt="Pinecrest Miami architectural estate represented by Move Miami Realtor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                    Attorney-Led Representation
                  </p>
                  <p className="font-serif text-base text-white">
                    Litigation-grade contract drafting from day one.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Process Timeline / Processes Accordion */}
          <div className="lg:col-span-7">
            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="relative pl-10">
                {/* Vertical Progress Line Track */}
                <div
                  aria-hidden="true"
                  className="absolute left-[13px] top-6 bottom-6 w-[2px] bg-sand"
                />
                {/* Active Progress Fill */}
                <motion.div
                  aria-hidden="true"
                  className="absolute left-[13px] top-6 w-[2px] bg-navy origin-top"
                  animate={{
                    height: `${(activeStepIndex / (SELLER_PROCESS.length - 1)) * 82}%`,
                  }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                />

                <div className="space-y-6">
                  {SELLER_PROCESS.map((step, idx) => {
                    const isActive = idx === activeStepIndex;

                    return (
                      <div
                        key={step.step}
                        onClick={() => setActiveStepIndex(idx)}
                        className={`group relative cursor-pointer border-b border-sand/60 pb-8 transition-colors ${
                          isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        {/* Step Bullet on Timeline */}
                        <div
                          className={`absolute -left-10 top-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                            isActive
                              ? "bg-navy text-white ring-4 ring-gold/40 shadow-sm"
                              : "border border-sand bg-white text-muted group-hover:border-navy group-hover:text-navy"
                          }`}
                        >
                          {step.step}
                        </div>

                        {/* Step Content */}
                        <div>
                          <div className="flex items-baseline justify-between gap-4">
                            <h3
                              className={`font-serif text-2xl transition-colors sm:text-3xl ${
                                isActive ? "text-navy font-normal" : "text-charcoal/80 group-hover:text-navy"
                              }`}
                            >
                              {step.title}
                            </h3>
                            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-dark/80">
                              {STEP_SUBTITLES[idx]}
                            </span>
                          </div>

                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={
                                  shouldReduceMotion
                                    ? { opacity: 1 }
                                    : { opacity: 0, height: 0 }
                                }
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                  duration: 0.4,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <p className="mt-4 font-sans text-base font-light leading-relaxed text-charcoal/85">
                                  {step.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Accordion */}
            <div className="space-y-4 lg:hidden">
              {SELLER_PROCESS.map((step, idx) => {
                const isActive = idx === activeStepIndex;

                return (
                  <div
                    key={step.step}
                    className="border-b border-sand/70 pb-5"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStepIndex(isActive ? -1 : idx)
                      }
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-sans text-xs font-semibold text-gold-dark">
                          {step.step}
                        </span>
                        <h3 className="font-serif text-xl font-normal text-navy">
                          {step.title}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${
                          isActive ? "rotate-180 text-navy" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={
                            shouldReduceMotion
                              ? { opacity: 1 }
                              : { opacity: 0, height: 0 }
                          }
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 font-sans text-sm font-light leading-relaxed text-charcoal/80 pl-7">
                            {step.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

