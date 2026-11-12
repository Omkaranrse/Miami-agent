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
          {/* Left Framed Team Yacht Photo with Tilted Lavender Card & App Badge */}
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-[460px] py-4">
              {/* Tilted Frosted Lavender Backing Card */}
              <div
                aria-hidden="true"
                className="absolute inset-4 -rotate-6 rounded-[34px] border border-white/80 bg-gradient-to-br from-[#DFD1FF]/85 via-[#F2EDFF]/80 to-[#CDBAFF]/85 shadow-[0_24px_60px_-16px_rgba(92,43,212,0.28)]"
              />

              {/* Main Rounded Photo Frame */}
              <div className="relative aspect-[4/4.2] overflow-hidden rounded-[28px] border-2 border-white bg-[#EDE9F7] shadow-[0_26px_65px_-16px_rgba(68,32,158,0.3)]">
                <Image
                  src="/images/heroes/team-group.jpg"
                  alt="Move Miami Realtor team together on a yacht in Miami"
                  fill
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Pastel Purple Curved Ribbon Accent across Bottom-Left */}
              <svg
                viewBox="0 0 360 110"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2 -left-4 z-10 w-[85%]"
              >
                <defs>
                  <linearGradient
                    id="about-ribbon-grad"
                    x1="0"
                    y1="20"
                    x2="340"
                    y2="95"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#E4D7FF" stopOpacity="0.95" />
                    <stop offset="48%" stopColor="#9A68F7" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#EFEAFF" stopOpacity="0.95" />
                  </linearGradient>
                </defs>
                <path
                  d="M8 18 C 36 82, 168 106, 336 82"
                  stroke="url(#about-ribbon-grad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>

              {/* Bottom-Right Floating Move Miami Tile */}
              <div className="absolute -bottom-2 right-4 z-20 rounded-[22px] border border-white bg-gradient-to-br from-white via-[#F6F1FF] to-[#DFD0FF] px-4 py-3.5 shadow-[0_18px_40px_-10px_rgba(74,38,168,0.32)]">
                <div className="flex flex-col items-center leading-none text-[#2B1761]">
                  <span className="flex items-end gap-0.5 font-sans text-[14px] font-extrabold tracking-[0.04em]">
                    <span>MOVE</span>
                    <svg
                      width="16"
                      height="18"
                      viewBox="0 0 24 26"
                      fill="none"
                      aria-hidden="true"
                      className="mb-px shrink-0 text-[#5C31C7]"
                    >
                      <path
                        d="M12 24C12.1 18.4 12.6 13.8 13.4 9.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M13.3 9.4C10.5 6.8 6.4 6.5 3.6 8.3C6.8 7.8 9.9 8.7 12.6 10.6C9.2 10.6 5.9 12 4.1 14.3C7.1 12.7 10.2 12 12.8 11.7"
                        fill="currentColor"
                      />
                      <path
                        d="M13.4 9.4C13.6 5.8 11.7 3 8.9 1.9C11.3 3.7 12.6 6.2 13 9.2"
                        fill="currentColor"
                      />
                      <path
                        d="M13.4 9.3C15.9 6 19.7 5.2 22.4 6.8C19.5 6.6 16.6 7.8 14.1 10.2C17.2 10 20.1 11.1 21.8 13.2C19.1 11.8 16.3 11.4 13.8 11.4"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span className="mt-0.5 font-sans text-[14px] font-extrabold tracking-[0.06em]">
                    MIAMI
                  </span>
                </div>
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
