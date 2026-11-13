"use client";

import { useRef } from "react";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { BROKERAGE_INFO } from "@/lib/constants";
import { PageContainer } from "@/components/layout/PageContainer";

export function ValuationPhotographicCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1.1, 1]
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-t border-sand/60 py-28 text-charcoal sm:py-36 md:py-44"
    >
      {/* Background Architectural Photography with Scroll Zoom Reveal */}
      <motion.div
        style={{ scale }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src="/images/heroes/hero-waterfront.jpg"
          alt="South Florida luxury waterfront estate architecture"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Light Lavender Overlay with Subtle Purple Contrast Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9FC] via-[#F1ECFA]/90 to-[#F1ECFA]/82 backdrop-blur-[2px]" />
      </motion.div>

      {/* Atmospheric Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/30 blur-[140px]"
      />

      <PageContainer className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">
            <span className="h-px w-8 bg-gold-dark/40" aria-hidden="true" />
            <span>Direct Advisory</span>
            <span className="h-px w-8 bg-gold-dark/40" aria-hidden="true" />
          </div>

          {/* Large Editorial Serif Heading */}
          <h2 className="mx-auto mt-5 font-serif text-4xl font-normal leading-[1.08] tracking-tight text-navy sm:text-5xl md:text-6xl lg:text-[72px]">
            Bring us your next move.
          </h2>

          {/* Supporting Text */}
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-charcoal/80 sm:text-lg lg:text-[19px]">
            Buying, selling, or sitting on something you're not sure what to do
            with—we'll tell you straight. Most conversations start on WhatsApp.
          </p>

          {/* Actions */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            {/* Primary Action: Message on WhatsApp */}
            <a
              href={BROKERAGE_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2.5 bg-navy px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-navy-light hover:shadow-lg sm:w-auto"
            >
              <MessageCircle className="h-4 w-4 text-gold transition-transform duration-300 group-hover:scale-110" />
              <span>Message on WhatsApp</span>
            </a>

            {/* Secondary Action: Call Our Team */}
            <a
              href={BROKERAGE_INFO.officePhoneHref}
              className="group inline-flex w-full items-center justify-center gap-2 border-b border-navy/40 px-6 py-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:border-navy hover:text-gold-dark sm:w-auto"
            >
              <Phone className="h-4 w-4 text-navy transition-transform duration-300 group-hover:scale-105" />
              <span>Call Our Team</span>
            </a>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

