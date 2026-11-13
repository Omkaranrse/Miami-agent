import { ArrowRight, MessageCircle, ShieldCheck, Compass, Sparkles } from "lucide-react";
import type { Agent } from "@/types/agent";
import { BROKERAGE_INFO } from "@/lib/constants";
import { IdentityKitBadge } from "@/components/about/IdentityKitBadge";
import { GlassTeamCard } from "@/components/agents/GlassTeamCard";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";
import { EyeGlowButton } from "@/components/ui/EyeGlowButton";
import { Reveal } from "@/components/ui/Reveal";

interface AboutTeamExperienceProps {
  principal: Agent;
  advisors: Agent[];
}

const BROKERAGE_PILLARS = [
  {
    number: "01",
    title: "Miami Is Home Turf",
    description:
      "Born and raised across Miami-Dade and Broward. We know the blocks, flood zones, HOA reserves, and pocket inventory firsthand.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Attorney-Led Precision",
    description:
      "Led by Victor A. Ruiz, Esq.—practicing trial attorney with an accounting background. Every contract is reviewed before signing.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Boutique Speed, Clear Math",
    description:
      "Zero middle-layer handoffs. Direct access to seasoned agents who price accurately, market sharply, and close cleanly.",
    icon: Sparkles,
  },
];

export function AboutTeamExperience({
  principal,
  advisors,
}: AboutTeamExperienceProps) {
  return (
    <>
      {/* 1. Futuristic Collaborative About + Interactive 3D Identity Kit Hero */}
      <section className="relative overflow-hidden border-b border-[#DDD0FA] bg-[linear-gradient(135deg,#F7F3FF_0%,#EDE3FF_50%,#DED0FF_100%)] pb-20 pt-32 md:pb-24 md:pt-36">
        {/* Ambient Futuristic Radial Halo & Hairline Skyline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-24 top-16 h-[420px] w-[420px] rounded-full bg-white/55 blur-3xl" />
          <div className="absolute right-[8%] top-20 h-[440px] w-[440px] rounded-full bg-[#B998FF]/25 blur-3xl" />
          <svg
            viewBox="0 0 1440 160"
            fill="none"
            preserveAspectRatio="none"
            className="absolute bottom-0 inset-x-0 h-24 w-full text-[#7C52EB]/[0.08]"
          >
            <path
              d="M0 160 V142 H110 V120 H148 V142 H210 V98 H246 V136 H320 V82 H356 V142 H430 V106 H468 V64 H504 V134 H590 V88 H624 V142 H730 V110 H788 V54 H828 V126 H920 V96 H962 V142 H1060 V76 H1106 V132 H1210 V104 H1266 V142 H1360 V90 H1410 V142 H1440 V160 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Editorial Narrative */}
            <Reveal variant="fade-up" className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#D4C5F9] bg-white/80 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#6136D6]" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#4C2B9A]">
                  About Move Miami · Our Team
                </span>
              </div>

              <h1 className="heading-hero mt-5 text-[#1F1246]">
                Miami Natives.
                <br />
                <span className="bg-gradient-to-r from-[#572EC8] via-[#7A4EEA] to-[#A47BFF] bg-clip-text italic text-transparent">
                  Attorney-Led
                </span>{" "}
                Rigor.
              </h1>

              <p className="body-editorial mt-5 max-w-xl text-[#433769]">
                Founded by practicing trial attorney and managing broker Victor A.
                Ruiz, Esq., Move Miami Realty unites veteran South Florida agents
                with sharper contract intelligence—delivering transparent advice
                without brokerage fluff.
              </p>

              {/* Minimal Futuristic Spec Chips */}
              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  "Miami-Dade & Broward",
                  "500+ Homes Closed",
                  "Zero Handoffs",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/90 bg-white/75 px-4 py-2 font-sans text-[12px] font-semibold text-[#2E1A69] shadow-xs backdrop-blur-sm transition-transform duration-200 hover:scale-105"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Clean Actions */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <FluidGlassButton href="#team" className="px-7 py-3.5 text-[14px]">
                  <span>Meet the Advisors</span>
                  <ArrowRight className="h-4 w-4" />
                </FluidGlassButton>

                <EyeGlowButton
                  href={`/agents/${principal.slug}`}
                  className="text-[14px]"
                >
                  <span>Broker Bio</span>
                </EyeGlowButton>

                <a
                  href={principal.whatsappHref ?? BROKERAGE_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-3 font-sans text-[14px] font-semibold text-[#4C2B9A] transition-colors hover:text-[#21124B]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            </Reveal>

            {/* Right Interactive 3D Identity Kit Credential */}
            <Reveal variant="fade-up" delay={0.15} className="flex justify-center lg:col-span-5 lg:justify-end">
              <IdentityKitBadge agent={principal} />
            </Reveal>
          </div>

          {/* 2. Simple 3-Pillar Brokerage DNA Row */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {BROKERAGE_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal
                  key={pillar.number}
                  delay={idx * 0.08}
                  variant="fade-up"
                  distance={16}
                >
                  <div className="h-full rounded-[22px] border border-white/90 bg-white/75 p-7 shadow-[0_18px_45px_-16px_rgba(61,27,142,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#EFE9FF] to-[#E0D2FF] text-[#5329B8]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-sans text-[11px] font-bold tracking-[0.18em] text-[#7D68B2]">
                        {pillar.number}
                      </span>
                    </div>

                    <h2 className="heading-editorial mt-5 text-[24px] font-medium text-[#21124B]">
                      {pillar.title}
                    </h2>
                    <p className="mt-2.5 font-sans text-[14px] leading-relaxed text-[#4C4072]">
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Futuristic GlassTeamCards Roster */}
      <section
        id="team"
        className="relative scroll-mt-24 overflow-hidden bg-[#F9F7FE] py-20 md:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[#DFD0FF]/35 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up" className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#532EC0]">
                  Our Advisory Team
                </span>
                <span
                  className="h-px w-20 bg-gradient-to-r from-[#5D36C6]/60 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <h2 className="heading-section mt-3 text-[#21124B]">
                Experienced{" "}
                <span className="bg-gradient-to-r from-[#5E35CE] via-[#7E52EB] to-[#A47BFF] bg-clip-text italic text-transparent">
                  Local Advisors.
                </span>
              </h2>
            </div>

            <p className="max-w-md font-sans text-[14.5px] leading-relaxed text-[#524678]">
              Select any advisor to connect directly or inspect their complete
              neighborhood focus and transaction profile.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advisors.map((advisor, idx) => (
              <Reveal key={advisor.slug} delay={idx * 0.08} variant="fade-up" distance={16}>
                <GlassTeamCard agent={advisor} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

