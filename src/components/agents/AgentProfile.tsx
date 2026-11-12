import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import type { Agent } from "@/types/agent";
import { BROKERAGE_INFO } from "@/lib/constants";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";
import { EyeGlowButton } from "@/components/ui/EyeGlowButton";
import { LiquidGlassFlipCard } from "@/components/ui/LiquidGlassFlipCard";

export function AgentProfile({ agent }: { agent: Agent }) {
  const primaryContactHref = agent.whatsappHref ?? agent.phoneHref;
  const primaryContactIsExternal = Boolean(agent.whatsappHref);

  const frontPhotoCard = (
    <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-[#E8DCFF] ring-1 ring-white/55">
      <Image
        src={agent.image}
        alt={agent.name}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover object-[50%_18%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#160A30]/75 via-[#160A30]/25 to-transparent"
      />
      <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/20 px-3.5 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-sans text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
            {agent.role}
          </span>
        </div>
        <span className="rounded-full border border-white/25 bg-[#1B0E3D]/45 px-3 py-1 font-sans text-[10.5px] font-medium text-white/90 backdrop-blur-md">
          Click or drag to flip
        </span>
      </div>
    </div>
  );

  const backCredentialCard = (
    <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-[22px] bg-[linear-gradient(155deg,#1A0C38_0%,#2E1569_52%,#4C23AC_100%)] p-6 text-white ring-1 ring-white/25 sm:p-8">
      <div>
        <div className="pr-12">
          <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#D7C6FF]">
            {BROKERAGE_INFO.brandName}
          </p>
          <p className="mt-1 font-sans text-[11px] font-medium text-white/65">
            {BROKERAGE_INFO.tagline}
          </p>
        </div>

        <h2 className="mt-6 font-serif text-[32px] leading-[1.08] font-semibold tracking-tight text-white">
          {agent.name}
        </h2>
        <p className="mt-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-[#D6C4FF]">
          {agent.credentials ?? agent.role}
        </p>

        <div className="mt-6 space-y-2.5 border-t border-white/15 pt-5">
          <a
            href={agent.phoneHref}
            data-lgf-interactive="true"
            className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 font-sans text-[13.5px] font-semibold text-white transition-colors hover:bg-white/20"
          >
            <Phone className="h-4 w-4 shrink-0 text-[#D6C4FF]" />
            <span>{agent.phone}</span>
          </a>

          <a
            href={`mailto:${agent.email}`}
            data-lgf-interactive="true"
            className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 font-sans text-[13.5px] font-semibold text-white transition-colors hover:bg-white/20"
          >
            <Mail className="h-4 w-4 shrink-0 text-[#D6C4FF]" />
            <span className="truncate">{agent.email}</span>
          </a>
        </div>
      </div>

      <div className="mt-6 border-t border-white/15 pt-4">
        <div className="flex items-start gap-2.5 text-white/75">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D6C4FF]" />
          <p className="font-sans text-[12px] leading-relaxed">
            {BROKERAGE_INFO.fullAddress}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Left Interactive Liquid Glass Flip Card Photo (Matches right column height) */}
      <div className="flex lg:col-span-5">
        <div className="min-h-[460px] w-full sm:min-h-[540px] lg:min-h-full">
          <LiquidGlassFlipCard
            frontTitle={agent.name}
            frontLayer={frontPhotoCard}
            backLayer={backCredentialCard}
            trigger="click"
            drag={true}
            axis="horizontal"
            flipButton={true}
            surface="light"
            material="clear"
            tint="#F1E9FF"
            radius="32px"
            padding="14px"
            liquidity={45}
            tilt={55}
            optics={{
              blur: 10,
              depth: 28,
              refraction: 85,
              dispersion: 58,
              light: 85,
            }}
            shadow="prism"
          />
        </div>
      </div>

      {/* Right Equal-Height Editorial Bio & Contact Glass Card */}
      <div className="flex lg:col-span-7">
        <div className="flex min-h-[460px] w-full flex-col justify-between rounded-[32px] border border-white/85 bg-white/75 p-7 shadow-[0_24px_60px_-18px_rgba(45,20,108,0.16)] backdrop-blur-xl sm:min-h-[540px] sm:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D8CAFA] bg-[#F6F1FF] px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#6136D6]" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#4C2B9A]">
                {agent.role}
              </span>
            </div>

            <h1 className="heading-hero mt-4 text-[42px] text-[#1F1246] sm:text-[52px]">
              {agent.name}
            </h1>

            {agent.credentials && (
              <p className="mt-2.5 font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-[#66588A]">
                {agent.credentials}
              </p>
            )}

            <div className="body-editorial mt-6 space-y-4 text-[#3F3462]">
              {agent.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {agent.specialties && agent.specialties.length > 0 && (
              <div className="mt-8 border-t border-[#E6DDF9] pt-6">
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B5D8F]">
                  Focus Areas
                </p>
                <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {agent.specialties.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl border border-white/90 bg-white/85 px-3.5 py-2.5 font-sans text-[13.5px] font-semibold text-[#23154B] shadow-2xs"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#5E35CE]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-[#E6DDF9] pt-6">
            <div className="flex flex-wrap items-center gap-4">
              <FluidGlassButton
                href={primaryContactHref}
                target={primaryContactIsExternal ? "_blank" : undefined}
                rel={primaryContactIsExternal ? "noopener noreferrer" : undefined}
                className="px-7 py-3.5 text-[14px]"
              >
                {primaryContactIsExternal ? (
                  <MessageCircle className="h-4 w-4" />
                ) : (
                  <Phone className="h-4 w-4" />
                )}
                <span>
                  {primaryContactIsExternal
                    ? `WhatsApp ${agent.phone}`
                    : `Call ${agent.phone}`}
                </span>
                <ArrowRight className="h-4 w-4" />
              </FluidGlassButton>

              <EyeGlowButton href="/listings" className="text-[14px]">
                <span>Browse Listings</span>
              </EyeGlowButton>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={agent.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-[#DFD5FA] bg-white/80 px-4 py-2 font-sans text-[13px] font-semibold text-[#241748] transition-colors hover:border-[#6136D6] hover:text-[#4C2B9A]"
              >
                <Phone className="h-3.5 w-3.5 text-[#5E35CE]" />
                <span>{agent.phone}</span>
              </a>

              <a
                href={`mailto:${agent.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#DFD5FA] bg-white/80 px-4 py-2 font-sans text-[13px] font-semibold text-[#241748] transition-colors hover:border-[#6136D6] hover:text-[#4C2B9A]"
              >
                <Mail className="h-3.5 w-3.5 text-[#5E35CE]" />
                <span>{agent.email}</span>
              </a>

              <Link
                href="/about-us#team"
                className="inline-flex items-center gap-1.5 px-2.5 py-2 font-sans text-[13px] font-semibold text-[#4C2B9A] transition-colors hover:text-[#21124B]"
              >
                <span>All Advisors</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
