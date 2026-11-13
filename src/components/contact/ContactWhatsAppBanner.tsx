"use client";

import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";

export function ContactWhatsAppBanner() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#1B0A3A_0%,#311475_52%,#4E21A8_100%)] p-8 text-white shadow-[0_24px_50px_-14px_rgba(28,11,68,0.4)] sm:p-10 lg:p-12">
      {/* Background Palm Frond Ambient Silhouette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-12 h-80 w-80 opacity-15"
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full text-white"
        >
          <path
            d="M30 180C40 130 80 80 170 30"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M170 30C140 20 110 30 90 45M170 30C155 45 130 65 110 85M170 30C170 55 155 85 135 110M170 30C180 55 175 90 160 125M170 30C190 45 200 70 195 105"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Ambient Purple Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#8E5BF5]/25 blur-3xl"
      />

      <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        {/* Left Copy */}
        <div className="max-w-xl">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-[#D4C3FF]">
            Prefer to Talk?
          </p>
          <h2 className="mt-2 font-sans text-[30px] font-bold leading-[1.08] tracking-tight text-white sm:text-[38px] md:text-[42px]">
            WhatsApp Gets the <br className="hidden sm:inline" />
            Fastest Response.
          </h2>
        </div>

        {/* Right Action Buttons */}
        <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center">
          {/* Primary WhatsApp Action */}
          <a
            href={BROKERAGE_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 font-sans text-[14px] font-bold text-[#1A0A3A] shadow-lg transition-all duration-200 hover:bg-[#F5EFFF] hover:shadow-xl sm:w-auto"
          >
            <MessageCircle className="h-4 w-4 fill-[#25D366] text-[#25D366] transition-transform duration-200 group-hover:scale-110" />
            <span>Message on WhatsApp</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>

          {/* Secondary Phone Call Action */}
          <a
            href={BROKERAGE_INFO.officePhoneHref}
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/35 bg-white/10 px-7 py-4 font-sans text-[14px] font-semibold text-white backdrop-blur-md transition-all duration-200 hover:border-white/55 hover:bg-white/20 sm:w-auto"
          >
            <Phone className="h-4 w-4 text-[#D8C6FF]" />
            <span>Call {BROKERAGE_INFO.officePhoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

