"use client";

import Image from "next/image";
import { MessageCircle, ExternalLink, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BROKERAGE_INFO } from "@/lib/constants";
import { PageContainer } from "@/components/layout/PageContainer";
import { CashOfferWizardForm } from "./CashOfferWizardForm";

const HERO_BENEFITS = [
  "Verified cash offer in 72 hours (written offer typically in 3–5 business days)",
  "No repairs, painting, or staging required",
  "No financing contingencies—close on your timeline",
];

export function CashOfferHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden border-b border-white/[0.08] bg-navy pb-20 pt-40 text-ivory sm:pb-28 sm:pt-48 lg:pb-32 lg:pt-52">
      {/* Background Architectural Photography */}
      <motion.div
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src="/images/heroes/hero-cash-offer.jpg"
          alt="Modern Miami luxury residential architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Deep Purple Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-navy/78" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50" />
      </motion.div>

      {/* Atmospheric Ambient Lighting Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-36 h-[550px] w-[550px] rounded-full bg-navy-light/50 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-gold-dark/15 blur-[120px]"
      />

      <PageContainer className="relative z-10">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Editorial Offer Presentation */}
          <div className="lg:col-span-6 lg:pt-4">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold/90">
              <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
              <span>72-Hour Cash Offer Program</span>
            </div>

            {/* Heading */}
            <h1 className="mt-5 font-serif text-4xl font-normal tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-[70px] lg:leading-[1.06]">
              A cash offer on your terms.
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 font-sans text-base font-light leading-relaxed text-ivory/85 sm:text-lg">
              Tell us about your Miami-Dade or Broward property. We&apos;ll bring
              a verified cash offer in 72 hours—or shop your home directly to our
              vetted investor network—without repairs, open houses, or financing
              contingencies.
            </p>

            {/* Core Benefits */}
            <div className="mt-8 space-y-3.5 border-t border-white/10 pt-6">
              {HERO_BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <Check className="h-2.5 w-2.5" />
                  </div>
                  <span className="font-sans text-xs font-light text-ivory/80 sm:text-sm">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Secondary Direct Actions */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={BROKERAGE_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-gold px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-all duration-300 hover:bg-white"
              >
                <MessageCircle className="h-4 w-4 text-navy transition-transform duration-300 group-hover:scale-110" />
                <span>Fast-Track via WhatsApp</span>
              </a>

              <a
                href={BROKERAGE_INFO.hifello.cashOfferPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-white/30 px-3 py-3 font-sans text-xs font-medium uppercase tracking-[0.12em] text-ivory/80 transition-colors hover:border-gold hover:text-gold"
              >
                <span>HiFello Cash Offer Portal</span>
                <ExternalLink className="h-3 w-3 text-gold/80" />
              </a>
            </div>
          </div>

          {/* Right Column: Multi-Step Offer Wizard Form */}
          <div className="lg:col-span-6">
            <CashOfferWizardForm />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

