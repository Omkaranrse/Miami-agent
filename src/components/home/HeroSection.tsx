"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";
import { EyeGlowButton } from "@/components/ui/EyeGlowButton";
import { TrustIndicators } from "@/components/home/TrustIndicators";

const HERO_AVATARS = [
  {
    src: "/images/agents/victor-ruiz.jpg",
    alt: "Victor A. Ruiz, Esq., Managing Broker",
  },
  {
    src: "/images/agents/priscilla-izquierdo.jpg",
    alt: "Priscilla Izquierdo, Real Estate Advisor",
  },
  {
    src: "/images/agents/brandon-box.jpg",
    alt: "Brandon Box, Real Estate Advisor",
  },
];

const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const getFadeUp = (delay: number) => {
    if (shouldReduceMotion) return {};
    return {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.65, delay, ease: LUXURY_EASE },
    };
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#F4F1FC] pb-7 pt-28 text-[#1F1B2E] md:pb-8 md:pt-32">
      {/* Background Architectural Miami Twilight Photo with Cinematic Slow Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/home/hero-pastel.jpg"
          alt="Modern waterfront luxury villa in Miami overlooking Biscayne Bay and skyline at twilight"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center animate-cinematic-zoom"
        />
      </div>

      {/* Main Left-Aligned Editorial Copy */}
      <div className="relative z-10 my-auto mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.p
            {...getFadeUp(0.1)}
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4A4260] [text-shadow:0_0_18px_rgba(255,255,255,0.98),0_0_8px_rgba(255,255,255,0.92)]"
          >
            Miami-Dade &amp; Broward <span className="mx-1.5">•</span> Attorney-Led Brokerage
          </motion.p>

          <motion.h1
            {...getFadeUp(0.22)}
            className="heading-hero mt-4 text-[#1B162B] [text-shadow:0_0_32px_rgba(255,255,255,0.96),0_0_14px_rgba(255,255,255,0.92),0_4px_20px_rgba(124,92,224,0.22)]"
          >
            Your Guide to
            <br />
            Buying, Selling &amp;
            <br />
            Exploring{" "}
            <span className="relative inline-block drop-shadow-[0_0_22px_rgba(255,255,255,0.95)]">
              <span className="bg-gradient-to-r from-[#240D5C] via-[#3A178C] to-[#5224B8] bg-clip-text italic text-transparent drop-shadow-[0_4px_18px_rgba(45,18,108,0.35)]">
                Miami
              </span>
              <svg
                viewBox="0 0 220 18"
                fill="none"
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 h-3.5 w-full drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 13C56 4.5 142 3 216 9.5"
                  stroke="url(#miami-hero-swoosh)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="miami-hero-swoosh"
                    x1="3"
                    y1="10"
                    x2="216"
                    y2="10"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#240D5C" />
                    <stop offset="0.65" stopColor="#3E1A94" />
                    <stop offset="1" stopColor="#5E34C8" stopOpacity="0.35" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>

          {/* CTA Pill Buttons */}
          <motion.div
            {...getFadeUp(0.35)}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <FluidGlassButton href="/listings" className="px-7 py-3.5 text-[14px]">
              <span>Explore Properties</span>
              <ArrowRight className="h-4 w-4" />
            </FluidGlassButton>

            <EyeGlowButton href="/about-us#team" className="text-[14px]">
              <span>Meet Our Team</span>
            </EyeGlowButton>
          </motion.div>

          {/* Agent Avatars Frosted Trust Capsule */}
          <motion.div {...getFadeUp(0.48)} className="mt-8">
            <Link
              href="/about-us#team"
              className="group inline-flex items-center gap-3.5 rounded-full border border-white/85 bg-white/75 py-2 pl-2.5 pr-4 shadow-[0_14px_34px_-10px_rgba(33,18,75,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4C4FA] hover:bg-white/90 hover:shadow-[0_18px_38px_-10px_rgba(74,34,168,0.28)]"
            >
              <div className="flex -space-x-2.5">
                {HERO_AVATARS.map((avatar, idx) => (
                  <div
                    key={avatar.src}
                    style={{ zIndex: HERO_AVATARS.length - idx }}
                    className="relative h-10 w-10 overflow-hidden rounded-full bg-[#EDE9F7] ring-2 ring-white"
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      sizes="40px"
                      className="scale-110 object-cover object-[50%_20%]"
                    />
                  </div>
                ))}
              </div>

              <div className="h-6 w-px bg-[#D9CEF5]" aria-hidden="true" />

              <div className="pr-1 leading-tight">
                <p className="font-sans text-[13px] font-bold tracking-tight text-[#1E1142]">
                  Miami-native agents
                </p>
                <p className="mt-0.5 font-sans text-[11.5px] font-medium text-[#5A4D7C]">
                  Direct local expertise · Zero handoffs
                </p>
              </div>

              <span
                aria-hidden="true"
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F1EBFF] text-[#4C2B9A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[#5B2EC6] group-hover:text-white"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Glassmorphic Trust Bar on Hero Image */}
      <motion.div
        {...getFadeUp(0.6)}
        className="relative z-10 mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <TrustIndicators />
      </motion.div>
    </section>
  );
}
