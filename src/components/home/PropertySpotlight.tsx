"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Building2,
  MapPin,
  Maximize2,
  Tag,
  Waves,
} from "lucide-react";
import type { Property } from "@/types/property";
import { Reveal } from "@/components/ui/Reveal";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";
import { EyeGlowButton } from "@/components/ui/EyeGlowButton";

interface PropertySpotlightProps {
  properties: Property[];
}

export function PropertySpotlight({ properties }: PropertySpotlightProps) {
  const brickellSpotlight = properties.find(
    (p) => p.slug === "skyline-on-brickell-1907"
  );
  const sandlotSpotlight = properties.find(
    (p) => p.slug === "129-nautilus-dr-unit-0-327087"
  );

  const [focusedSide, setFocusedSide] = useState<0 | 1>(1);

  const spotlightCards = [
    brickellSpotlight && {
      property: brickellSpotlight,
      badge: brickellSpotlight.spotlightLabel ?? "Just Leased",
      locationLabel: `${brickellSpotlight.neighborhood}, ${brickellSpotlight.city}`.toUpperCase(),
      title: brickellSpotlight.title ?? brickellSpotlight.address,
      summary: brickellSpotlight.summary,
      ctaLabel: "Inquire About Leasing",
      ctaHref: `/contact?subject=leasing&property=${brickellSpotlight.slug}`,
      pills: [
        {
          icon: BedDouble,
          text: `${brickellSpotlight.bedrooms ?? 2} BD / ${brickellSpotlight.bathrooms ?? 2} BA`,
        },
        {
          icon: Maximize2,
          text: `${(brickellSpotlight.sqft ?? 1367).toLocaleString()} SQ FT`,
        },
        {
          icon: Building2,
          text: "19TH-FLOOR CORNER",
        },
      ],
    },
    sandlotSpotlight && {
      property: sandlotSpotlight,
      badge: sandlotSpotlight.spotlightLabel ?? "Signature Rental",
      locationLabel: `${sandlotSpotlight.neighborhood}, ${sandlotSpotlight.city}, FLORIDA KEYS`.toUpperCase(),
      title: sandlotSpotlight.title ?? sandlotSpotlight.address,
      summary: sandlotSpotlight.summary,
      ctaLabel: "Check Availability",
      ctaHref: `/properties/${sandlotSpotlight.slug}`,
      pills: [
        {
          icon: BedDouble,
          text: sandlotSpotlight.propertyType,
        },
        {
          icon: Tag,
          text: sandlotSpotlight.priceLabel.replace("/mo", " / MO"),
        },
        {
          icon: Waves,
          text: "Canal Access",
        },
      ],
    },
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section className="relative overflow-hidden border-b border-[#DCD0FA] bg-[linear-gradient(135deg,#F6F2FF_0%,#EAE1FF_52%,#D9C8FF_100%)] py-20 md:py-24">
      {/* Diagonal Soft Luminous Wave Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 820"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 0 H1160 C980 280 620 490 0 650 Z"
            fill="rgba(255, 255, 255, 0.36)"
          />
          <path
            d="M0 640 C480 510 920 290 1200 0"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3.5">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#4C2B9A]">
                Property Spotlight
              </span>
              <span
                className="h-px w-24 bg-gradient-to-r from-[#5D36C6]/65 to-transparent"
                aria-hidden="true"
              />
            </div>

            <h2 className="heading-section mt-3 text-[#21124B]">
              Recent Moves,{" "}
              <span className="bg-gradient-to-r from-[#5E35CE] via-[#7E52EB] to-[#A47BFF] bg-clip-text italic text-transparent">
                Signature Stays.
              </span>
            </h2>

            <p className="body-editorial mt-3.5 max-w-xl text-[#45396B]">
              A closer look at what our team is moving right now, from a
              Brickell lease that never hit the open market to our signature Keys
              rental.
            </p>
          </div>

          {/* Interactive Previous / Next Spotlight Controls */}
          <div className="flex shrink-0 items-center gap-3">
            {focusedSide === 0 ? (
              <FluidGlassButton
                onClick={() => setFocusedSide(0)}
                ariaLabel="Highlight Brickell spotlight"
                className="h-11 w-11 p-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </FluidGlassButton>
            ) : (
              <EyeGlowButton
                showEyes={false}
                onClick={() => setFocusedSide(0)}
                ariaLabel="Highlight Brickell spotlight"
                className="h-11 w-11 p-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </EyeGlowButton>
            )}
            {focusedSide === 1 ? (
              <FluidGlassButton
                onClick={() => setFocusedSide(1)}
                ariaLabel="Highlight Islamorada Keys spotlight"
                className="h-11 w-11 p-0"
              >
                <ArrowRight className="h-4 w-4" />
              </FluidGlassButton>
            ) : (
              <EyeGlowButton
                showEyes={false}
                onClick={() => setFocusedSide(1)}
                ariaLabel="Highlight Islamorada Keys spotlight"
                className="h-11 w-11 p-0"
              >
                <ArrowRight className="h-4 w-4" />
              </EyeGlowButton>
            )}
          </div>
        </div>

        {/* Side-by-Side Frosted Glass Spotlight Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {spotlightCards.map((card, idx) => {
            const isFocused = focusedSide === idx;
            return (
              <Reveal key={card.property.slug} delay={idx * 0.08}>
                <article
                  className={`flex h-full flex-col overflow-hidden rounded-[28px] border-2 bg-white/75 p-3 backdrop-blur-xl transition-all duration-300 ${
                    isFocused
                      ? "border-white shadow-[0_26px_65px_-16px_rgba(78,38,176,0.28)]"
                      : "border-white/85 shadow-[0_20px_50px_-16px_rgba(52,30,114,0.18)] hover:border-white"
                  }`}
                >
                  {/* Rounded Top Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] bg-[#EDE9F7]">
                    <Link
                      href={`/properties/${card.property.slug}`}
                      className="block h-full w-full"
                    >
                      <Image
                        src={card.property.coverImage}
                        alt={card.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                      />
                    </Link>

                    {/* Top-Left Pill Badge */}
                    <span className="pointer-events-none absolute left-3.5 top-3.5 inline-flex items-center gap-2 rounded-full bg-white/92 px-3.5 py-1.5 font-sans text-[12px] font-semibold text-[#22144A] shadow-sm backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-[#7342E2]" />
                      <span>{card.badge}</span>
                    </span>

                    {/* Top-Right Expand / View Button */}
                    <Link
                      href={`/properties/${card.property.slug}`}
                      aria-label={`Open ${card.title}`}
                      className="absolute right-3.5 top-3.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/45 bg-black/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Frosted Bottom Card Content */}
                  <div className="flex flex-1 flex-col justify-between px-4 pb-4 pt-5 sm:px-5 sm:pb-5">
                    <div>
                      <div className="flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#4C2B9A]">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#5E35CE]" />
                        <span className="truncate">{card.locationLabel}</span>
                      </div>

                      <h3 className="mt-2 font-sans text-[22px] font-bold leading-snug tracking-tight text-[#21124B] sm:text-[24px]">
                        <Link
                          href={`/properties/${card.property.slug}`}
                          className="transition-colors hover:text-[#5E35CE]"
                        >
                          {card.title}
                        </Link>
                      </h3>

                      <p className="mt-2 font-sans text-[14px] leading-relaxed text-[#4E456E]">
                        {card.summary}
                      </p>

                      {/* 3 Spec Pill Capsules */}
                      <div className="mt-5 flex flex-wrap gap-2.5">
                        {card.pills.map((pill) => {
                          const PillIcon = pill.icon;
                          return (
                            <span
                              key={pill.text}
                              className="inline-flex items-center gap-2 rounded-full border border-white bg-white/85 px-3.5 py-2 font-sans text-[12px] font-semibold text-[#22144A] shadow-[0_6px_16px_-6px_rgba(78,38,176,0.18)]"
                            >
                              <PillIcon className="h-3.5 w-3.5 shrink-0 text-[#5E35CE]" />
                              <span>{pill.text}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-6 flex flex-wrap items-center gap-5 pt-1">
                      <FluidGlassButton href={card.ctaHref} className="px-6 py-3 text-[14px]">
                        <span>{card.ctaLabel}</span>
                        <ArrowRight className="h-4 w-4" />
                      </FluidGlassButton>

                      <span
                        className="h-6 w-px bg-[#D6CBEF]"
                        aria-hidden="true"
                      />

                      <Link
                        href={`/contact?property=${card.property.slug}`}
                        className="font-sans text-[14px] font-semibold text-[#21124B] transition-colors hover:text-[#5E35CE]"
                      >
                        Send a Message
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
