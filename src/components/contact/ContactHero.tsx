"use client";

import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";

export function ContactHero() {
  return (
    <div className="relative overflow-hidden bg-[#180936]">
      {/* Background Dusk Miami Skyline Photograph */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/contact/miami-dusk-skyline.jpg"
          alt="Panoramic dusk skyline of Miami across Biscayne Bay at twilight with palm trees"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_35%]"
        />
        {/* Deep Royal Purple & Indigo Gradient Overlays for readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#130628]/75 via-[#1D0C42]/50 to-[#220D4E]/92"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#110524]/85 via-[#1A0B3C]/55 to-transparent"
        />
      </div>

      {/* Hero Content Container */}
      <section className="relative z-10 pt-36 pb-20 sm:pt-40 sm:pb-24 md:pt-44 md:pb-28">
        <PageContainer>
          <div className="max-w-3xl">
            {/* Pill Eyebrow with horizontal line */}
            <div className="inline-flex items-center gap-3">
              <span className="font-sans text-[11.5px] font-bold uppercase tracking-[0.28em] text-[#D8C6FF]">
                Contact Us
              </span>
              <span
                className="h-px w-14 bg-gradient-to-r from-white/70 to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Large Bold Heading */}
            <h1 className="mt-4 font-sans text-[48px] font-extrabold leading-[1.04] tracking-tight text-white sm:text-[60px] md:text-[72px] lg:text-[78px]">
              Get in{" "}
              <span className="bg-gradient-to-r from-[#B992FF] via-[#D8BFFF] to-white bg-clip-text text-transparent">
                Touch.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3.5 max-w-2xl font-sans text-[16px] font-medium leading-relaxed text-white/85 sm:text-[18px]">
              Send a message or call us directly — we&apos;ll respond ASAP.
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Liquid Glass Wave Transition to Cards Section */}
      <div className="relative -mb-px w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="h-16 w-full sm:h-24 md:h-32 text-[#F4EEFD]"
        >
          {/* Wave Body filled with pastel lavender canvas color */}
          <path
            d="M0 65C220 22 510 115 820 85C1100 55 1290 90 1440 55V140H0V65Z"
            fill="currentColor"
          />

          {/* Liquid Glass Specular Edge Glow */}
          <path
            d="M0 65C220 22 510 115 820 85C1100 55 1290 90 1440 55"
            stroke="url(#contact-liquid-wave-glow)"
            strokeWidth="3.2"
          />

          <defs>
            <linearGradient
              id="contact-liquid-wave-glow"
              x1="0"
              y1="0"
              x2="1440"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="22%" stopColor="#E4D3FF" stopOpacity="0.8" />
              <stop offset="52%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="78%" stopColor="#C8A5FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

