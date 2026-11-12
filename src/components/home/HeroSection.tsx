import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";
import { EyeGlowButton } from "@/components/ui/EyeGlowButton";

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

export function HeroSection() {
  return (
    <section className="relative flex min-h-[700px] flex-col justify-center overflow-hidden bg-[#F4F1FC] pb-20 pt-36 text-[#1F1B2E] md:min-h-[82vh] md:pb-24 md:pt-40">
      {/* Background Architectural Miami Twilight Photo */}
      <Image
        src="/images/home/hero-pastel.jpg"
        alt="Modern waterfront luxury villa in Miami overlooking Biscayne Bay and skyline at twilight"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Main Left-Aligned Editorial Copy */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4A4260] [text-shadow:0_0_18px_rgba(255,255,255,0.98),0_0_8px_rgba(255,255,255,0.92)]">
            Miami-Dade &amp; Broward <span className="mx-1.5">•</span> Attorney-Led Brokerage
          </p>

          <h1 className="heading-hero mt-4 text-[#1B162B] [text-shadow:0_0_32px_rgba(255,255,255,0.96),0_0_14px_rgba(255,255,255,0.92),0_4px_20px_rgba(124,92,224,0.22)]">
            Your Guide to
            <br />
            Buying, Selling &amp;
            <br />
            Exploring{" "}
            <span className="relative inline-block drop-shadow-[0_0_22px_rgba(255,255,255,0.95)]">
              <span className="bg-gradient-to-r from-[#3D1D82] via-[#6238C7] to-[#9875F2] bg-clip-text italic text-transparent drop-shadow-[0_4px_18px_rgba(124,92,224,0.45)]">
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
                    <stop stopColor="#4F2BB2" />
                    <stop offset="0.65" stopColor="#8560E8" />
                    <stop offset="1" stopColor="#C4B0FF" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="body-editorial mt-6 max-w-lg text-[#2F2942] [text-shadow:0_0_24px_rgba(255,255,255,0.98),0_0_12px_rgba(255,255,255,0.95),0_2px_10px_rgba(255,255,255,0.88)]">
            Local expertise. Real data. Straight answers. Make confident real
            estate decisions in the Magic City.
          </p>

          {/* CTA Pill Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <FluidGlassButton href="/listings" className="px-7 py-3.5 text-[14px]">
              <span>Explore Properties</span>
              <ArrowRight className="h-4 w-4" />
            </FluidGlassButton>

            <EyeGlowButton href="/about-us#team" className="text-[14px]">
              <span>Meet Our Team</span>
            </EyeGlowButton>
          </div>

          {/* Agent Avatars Trust Cluster */}
          <div className="mt-8 flex items-center gap-5">
            <div className="flex -space-x-2.5">
              {HERO_AVATARS.map((avatar) => (
                <div
                  key={avatar.src}
                  className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white bg-[#EDE9F7] shadow-sm"
                >
                  <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    fill
                    sizes="44px"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>

            <div className="h-9 w-px bg-[#C7BFE0]" aria-hidden="true" />

            <p className="font-sans text-[13px] font-medium leading-snug text-[#2F2942] [text-shadow:0_0_20px_rgba(255,255,255,0.98),0_0_10px_rgba(255,255,255,0.94)]">
              Miami-native agents
              <br />
              with local expertise
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
