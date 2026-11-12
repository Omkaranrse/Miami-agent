"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";

interface SellerHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

export function SellerHero({
  eyebrow = "Seller Representation",
  title = "Sell your Miami home, on your terms.",
  description = "Whether you're wanting a fast cash offer or a strategic listing that maximizes market value, we'll walk you through both paths with real numbers and let you pick what fits.",
  image = "/images/heroes/luxury-miami-hero.jpg",
  imageAlt = "Architectural Miami luxury estate represented by Move Miami Realtor",
}: SellerHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative min-h-[92vh] overflow-hidden border-b border-white/[0.08] bg-navy pb-24 pt-44 text-ivory sm:pb-32 sm:pt-48 md:pt-52 lg:pb-36 lg:pt-56">
      {/* Background Architectural Photography with Slow Scale */}
      <motion.div
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Cinematic Deep Purple Gradients for Contrast & Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
      </motion.div>

      {/* Atmospheric Ambient Lighting Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-36 h-[550px] w-[550px] rounded-full bg-navy-light/40 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-gold-dark/15 blur-[120px]"
      />

      <PageContainer className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow Label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold/90"
          >
            <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
            <span>{eyebrow}</span>
          </motion.div>

          {/* Large Serif Editorial Heading */}
          <motion.h1
            variants={itemVariants}
            className="mt-5 font-serif text-4xl font-normal tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-[76px] lg:leading-[1.05]"
          >
            {title}
          </motion.h1>

          {/* Editorial Supporting Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-ivory/85 sm:text-lg lg:text-[19px]"
          >
            {description}
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center gap-5 sm:gap-6"
          >
            {/* Primary CTA */}
            <Link
              href="/cash-offer"
              className="group inline-flex items-center gap-2.5 bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-all duration-300 hover:bg-white hover:shadow-lg"
            >
              <span>Get a Cash Offer</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/home-valuation"
              className="group inline-flex items-center gap-2 px-6 py-4 font-sans text-xs font-medium uppercase tracking-[0.12em] text-ivory/90 transition-colors hover:text-gold"
            >
              <span>Get a Free Valuation</span>
              <ArrowRight className="h-3.5 w-3.5 text-gold/70 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </PageContainer>
    </section>
  );
}

