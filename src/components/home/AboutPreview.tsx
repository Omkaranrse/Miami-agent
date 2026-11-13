import Image from "next/image";
import { ArrowRight, Award, Home, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";
import { EyeGlowButton } from "@/components/ui/EyeGlowButton";

const ABOUT_STATS = [
  {
    icon: Award,
    value: "10+",
    label: "Years in Miami",
  },
  {
    icon: Home,
    value: "500+",
    label: "Homes Closed",
  },
  {
    icon: Users,
    value: "Local",
    label: "Expert Team",
  },
];

export function AboutPreview() {
  return (
    <section className="relative overflow-hidden border-b border-[#DCD0FA] bg-[linear-gradient(135deg,#F3EEFF_0%,#FAF8FF_45%,#E5D8FF_100%)] py-20 md:py-28">
      {/* Diagonal Wave, Palm Fronds & Subtle Bottom-Right Skyline Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 760"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 0 H1160 C980 260 620 470 0 640 Z"
            fill="rgba(255, 255, 255, 0.34)"
          />
          <path
            d="M0 635 C470 500 910 280 1190 0"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="2"
          />
        </svg>

        {/* Top-Right Translucent Palm Fronds */}
        <svg
          viewBox="0 0 260 220"
          fill="none"
          className="absolute -right-6 -top-4 h-56 w-64 text-[#7D52EA]/25"
        >
          <path
            d="M170 0 C150 42 128 82 95 122 M175 0 C168 50 154 96 132 142 M182 0 C186 52 182 104 170 152 M190 0 C205 46 212 96 208 148 M198 0 C222 36 238 78 244 126 M165 5 C132 32 96 52 54 68 M170 12 C136 52 102 82 64 106 M178 18 C154 66 130 108 100 148"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Soft Bottom-Right Miami Skyline Silhouette */}
        <svg
          viewBox="0 0 640 120"
          fill="none"
          className="absolute bottom-0 right-0 h-24 w-[520px] text-[#8E6BE8]/[0.16] sm:h-28 sm:w-[640px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120 V112 H72 V102 H88 V112 H112 V90 H130 V78 H144 V104 H168 V68 H186 V96 H212 V82 H228 V52 H244 V86 H266 V44 H284 V92 H308 V62 H324 V38 H344 V84 H368 V70 H386 V26 H408 V82 H432 V56 H452 V88 H478 V34 H502 V76 H528 V50 H548 V88 H572 V64 H594 V94 H620 V80 H640 V120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Framed Team Yacht Photo with Ambient Ribbon & Original Logo Badge */}
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-[480px] p-2 sm:p-3">
              {/* Main Rounded Photo Frame */}
              <div className="relative aspect-[1244/1280] overflow-hidden rounded-[32px] border-[2.5px] border-white bg-[#EDE9F7] shadow-[0_24px_55px_-12px_rgba(45,18,105,0.22),0_8px_20px_-4px_rgba(45,18,105,0.12)] sm:rounded-[36px]">
                <Image
                  src="/images/heroes/team-group.jpg"
                  alt="Move Miami Realtor team together on a yacht in Miami"
                  fill
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Pastel Purple Curved Ribbon Accent sweeping across Bottom-Left */}
              <svg
                viewBox="0 0 460 160"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-5 -left-5 z-10 w-[90%]"
              >
                <defs>
                  <linearGradient
                    id="team-swoop-grad"
                    x1="0%"
                    y1="30%"
                    x2="100%"
                    y2="70%"
                  >
                    <stop offset="0%" stopColor="#DFD2FE" stopOpacity="0.95" />
                    <stop offset="30%" stopColor="#A87FFB" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#7E52EB" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.95" />
                  </linearGradient>
                  <filter
                    id="ribbon-glow"
                    x="-10%"
                    y="-10%"
                    width="120%"
                    height="120%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="4"
                      stdDeviation="5"
                      floodColor="rgba(110, 58, 222, 0.25)"
                    />
                  </filter>
                </defs>
                <path
                  d="M16 32 C 16 98, 72 142, 185 142 C 285 142, 370 122, 440 102"
                  stroke="url(#team-swoop-grad)"
                  strokeWidth="11"
                  strokeLinecap="round"
                  filter="url(#ribbon-glow)"
                />
              </svg>

              {/* Bottom-Right Floating Original Brand Logo Badge */}
              <div className="absolute -bottom-3 right-3 z-20 flex items-center justify-center rounded-[22px] border border-white/90 bg-white/95 px-5 py-3 shadow-[0_16px_36px_-8px_rgba(45,18,105,0.25)] backdrop-blur-md transition-transform duration-300 hover:scale-[1.03] sm:-bottom-4 sm:right-5">
                <Image
                  src="/images/brand/logo-transparent.png"
                  alt="Move Miami Realtor"
                  width={135}
                  height={48}
                  className="h-8 sm:h-9 w-auto object-contain"
                  priority
                />
              </div>
            </div>
          </Reveal>

          {/* Right Editorial Copy + Glass Stat Badges */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="flex items-center gap-3.5">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#4C2B9A]">
                Who We Are
              </span>
              <span
                className="h-px w-24 bg-gradient-to-r from-[#5D36C6]/65 to-transparent"
                aria-hidden="true"
              />
            </div>

            <h2 className="heading-section mt-3 text-[#21124B]">
              A Veteran Team with a
              <br />
              <span className="bg-gradient-to-r from-[#5E35CE] via-[#7E52EB] to-[#A47BFF] bg-clip-text italic text-transparent">
                Fresh Approach.
              </span>
            </h2>

            <p className="body-editorial mt-5 max-w-xl text-[#45396B]">
              Move Miami is led by Victor A. Ruiz, Esq. – a Miami-born broker
              and trial attorney with an accounting background. The team is
              built from licensed agents who have closed at the city’s top
              brokerages and know the corridors personally, not from a map.
            </p>
            <p className="body-editorial mt-4 max-w-xl text-[#45396B]">
              We’re here to strip the hassle out of moving in a market that
              doesn’t slow down. Honest numbers, sharp paperwork, clear next
              steps. That’s the whole pitch.
            </p>

            {/* 3 Frosted Glass Stat Pills */}
            <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {ABOUT_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3.5 rounded-[20px] border border-white/95 bg-white/75 px-4 py-3.5 shadow-[0_12px_30px_-10px_rgba(74,38,168,0.18)] backdrop-blur-md"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFEAFF] text-[#5B31C8]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-sans text-[17px] font-bold leading-tight text-[#21124B]">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 font-sans text-[12px] font-medium text-[#5C547A]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Pill CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <FluidGlassButton href="/about-us" className="px-7 py-3.5 text-[14px]">
                <span>Read our story</span>
                <ArrowRight className="h-4 w-4" />
              </FluidGlassButton>

              <EyeGlowButton href="/about-us#team" className="text-[14px]">
                <span>Meet the agents</span>
              </EyeGlowButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
