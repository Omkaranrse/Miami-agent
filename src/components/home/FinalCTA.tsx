import Image from "next/image";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";
import { EyeGlowButton } from "@/components/ui/EyeGlowButton";
import { Reveal } from "@/components/ui/Reveal";

interface FinalCTAProps {
  headline?: string;
  subcopy?: string;
}

export function FinalCTA({
  headline,
  subcopy = "Buying, selling, or sitting on something you’re not sure what to do with — we’ll tell you straight. Most conversations start on WhatsApp.",
}: FinalCTAProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#FAF8FF_0%,#F1EBFF_52%,#DFD1FF_100%)] pb-24 pt-20 md:pb-28 md:pt-24">
      {/* Right Side Pastel Miami Skyline Photography with Curved Lavender Mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-full overflow-hidden md:w-[60%] lg:w-[54%]"
      >
        <Image
          src="/images/heroes/hero-skyline.jpg"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover object-right opacity-85 animate-cinematic-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4EFFF] via-[#F2ECFF]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#EDE5FF]/55 via-transparent to-[#F8F5FF]/70" />
      </div>

      {/* Organic Curved White-Lavender Overlay + Top-Left Dark Palm Fronds */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 520"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 0 H1140 C990 140 940 330 830 520 H0 Z"
            fill="url(#finalcta-left-wash)"
          />
          <defs>
            <linearGradient
              id="finalcta-left-wash"
              x1="0"
              y1="0"
              x2="980"
              y2="320"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#F9F7FF" stopOpacity="0.96" />
              <stop offset="72%" stopColor="#F4EEFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#EEE6FF" stopOpacity="0.35" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          viewBox="0 0 240 200"
          fill="none"
          className="absolute -left-6 -top-4 h-48 w-56 -scale-x-100 text-[#3B1E8A]/45"
        >
          <path
            d="M170 0 C150 42 128 82 95 122 M175 0 C168 50 154 96 132 142 M182 0 C186 52 182 104 170 152 M190 0 C205 46 212 96 208 148 M198 0 C222 36 238 78 244 126 M165 5 C132 32 96 52 54 68 M170 12 C136 52 102 82 64 106 M178 18 C154 66 130 108 100 148"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="fade-up" className="max-w-2xl">
          <div className="flex items-center gap-3.5">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#4C2B9A]">
              Let&apos;s Partner
            </span>
            <span
              className="h-px w-16 bg-gradient-to-r from-[#5D36C6]/65 to-transparent"
              aria-hidden="true"
            />
          </div>

          {headline ? (
            <h2 className="heading-section mt-3 text-[#1B0D3D]">{headline}</h2>
          ) : (
            <h2 className="heading-section mt-3 text-[#1B0D3D]">
              Bring us your next{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#5D33CE] via-[#7E52EB] to-[#A47BFF] bg-clip-text italic text-transparent">
                  move.
                </span>
                <svg
                  viewBox="0 0 180 14"
                  fill="none"
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 h-3 w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 10 C 52 3.5, 118 3, 177 8.5"
                    stroke="url(#bring-move-swoosh)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="bring-move-swoosh"
                      x1="3"
                      y1="8"
                      x2="177"
                      y2="8"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#5C31C7" />
                      <stop offset="0.7" stopColor="#8B5CF6" />
                      <stop offset="1" stopColor="#C4B0FF" stopOpacity="0.25" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
          )}

          <p className="body-editorial mt-4 max-w-lg text-[#45396B]">{subcopy}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <FluidGlassButton
              href={BROKERAGE_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 text-[14px]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Message on WhatsApp</span>
              <ArrowRight className="h-4 w-4" />
            </FluidGlassButton>

            <EyeGlowButton
              href={BROKERAGE_INFO.officePhoneHref}
              className="text-[14px]"
            >
              <Phone className="h-4 w-4 text-[#4C2B9A]" />
              <span>Call our team</span>
            </EyeGlowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
