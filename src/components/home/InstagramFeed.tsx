"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Instagram,
  MoreHorizontal,
  Play,
  Send,
} from "lucide-react";
import { INSTAGRAM_REELS } from "@/data/videos";
import { BROKERAGE_INFO } from "@/lib/constants";
import { GravityInstagramCubes } from "@/components/ui/GravityInstagramCubes";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";
import { EyeGlowButton } from "@/components/ui/EyeGlowButton";

const REEL_POSTERS: Record<
  string,
  {
    poster: string;
    captionPill?: string;
  }
> = {
  DZK9BokujTM: {
    poster: "/images/properties/12940-sw-82-ct/cover.jpg",
  },
  DY7ewnzRVwN: {
    poster: "/images/agents/victor-ruiz.jpg",
    captionPill: "From a realtor’s perspective",
  },
  DYxAJROOIcF: {
    poster: "/images/heroes/hero-skyline.jpg",
  },
};

export function InstagramFeed() {
  const [shift, setShift] = useState(0);
  const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null);

  const orderedReels = INSTAGRAM_REELS.map(
    (_, idx) => INSTAGRAM_REELS[(idx + shift) % INSTAGRAM_REELS.length]
  );

  const handlePrev = () => {
    setShift(
      (prev) => (prev - 1 + INSTAGRAM_REELS.length) % INSTAGRAM_REELS.length
    );
  };

  const handleNext = () => {
    setShift((prev) => (prev + 1) % INSTAGRAM_REELS.length);
  };

  return (
    <section className="relative overflow-hidden border-t border-[#DCD0FA] bg-[linear-gradient(135deg,#F6F2FF_0%,#ECE3FF_50%,#DED0FF_100%)] pt-20 pb-0 md:pt-24">
      {/* Left & Right Translucent Palm Fronds & Subtle Skyline Reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <svg
          viewBox="0 0 260 220"
          fill="none"
          className="absolute -left-8 -top-4 h-56 w-64 -scale-x-100 text-[#7D52EA]/25"
        >
          <path
            d="M170 0 C150 42 128 82 95 122 M175 0 C168 50 154 96 132 142 M182 0 C186 52 182 104 170 152 M190 0 C205 46 212 96 208 148 M198 0 C222 36 238 78 244 126 M165 5 C132 32 96 52 54 68 M170 12 C136 52 102 82 64 106 M178 18 C154 66 130 108 100 148"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        <svg
          viewBox="0 0 260 220"
          fill="none"
          className="absolute -right-8 -top-4 h-56 w-64 text-[#7D52EA]/25"
        >
          <path
            d="M170 0 C150 42 128 82 95 122 M175 0 C168 50 154 96 132 142 M182 0 C186 52 182 104 170 152 M190 0 C205 46 212 96 208 148 M198 0 C222 36 238 78 244 126 M165 5 C132 32 96 52 54 68 M170 12 C136 52 102 82 64 106 M178 18 C154 66 130 108 100 148"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        <svg
          viewBox="0 0 640 120"
          fill="none"
          className="absolute bottom-0 left-0 h-24 w-[420px] -scale-x-100 text-[#8E6BE8]/[0.15] sm:w-[540px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120 V112 H72 V102 H88 V112 H112 V90 H130 V78 H144 V104 H168 V68 H186 V96 H212 V82 H228 V52 H244 V86 H266 V44 H284 V92 H308 V62 H324 V38 H344 V84 H368 V70 H386 V26 H408 V82 H432 V56 H452 V88 H478 V34 H502 V76 H528 V50 H548 V88 H572 V64 H594 V94 H620 V80 H640 V120 Z"
            fill="currentColor"
          />
        </svg>

        <svg
          viewBox="0 0 640 120"
          fill="none"
          className="absolute bottom-0 right-0 h-24 w-[420px] text-[#8E6BE8]/[0.15] sm:w-[540px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120 V112 H72 V102 H88 V112 H112 V90 H130 V78 H144 V104 H168 V68 H186 V96 H212 V82 H228 V52 H244 V86 H266 V44 H284 V92 H308 V62 H324 V38 H344 V84 H368 V70 H386 V26 H408 V82 H432 V56 H452 V88 H478 V34 H502 V76 H528 V50 H548 V88 H572 V64 H594 V94 H620 V80 H640 V120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4C5F9] bg-white/85 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5] text-white">
                <Instagram className="h-3 w-3" />
              </span>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#5330B5]">
                @movemiami on Instagram
              </span>
            </div>

            <h2 className="heading-section mt-4 text-[#21124B]">
              Follow the{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#5D33CE] via-[#7E52EB] to-[#A47BFF] bg-clip-text italic text-transparent">
                  Move.
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
                    stroke="url(#follow-move-swoosh)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="follow-move-swoosh"
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

            <p className="body-editorial mt-4 max-w-lg text-[#45396B]">
              Listing tours, neighborhood moments, and the people behind the
              deals. Here’s what we’ve been posting lately.
            </p>
          </div>

          <div className="shrink-0">
            <FluidGlassButton
              href={BROKERAGE_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 text-[14px]"
            >
              <Instagram className="h-4 w-4" />
              <span>Follow Us on Instagram</span>
              <ArrowRight className="h-4 w-4" />
            </FluidGlassButton>
          </div>
        </div>

        {/* 3 Vertical Reels Grid with Left/Right Carousel Buttons */}
        <div className="relative mt-12">
          <EyeGlowButton
            showEyes={false}
            onClick={handlePrev}
            ariaLabel="Previous Instagram reel"
            className="hidden xl:inline-flex absolute -left-14 top-1/2 z-20 h-11 w-11 -translate-y-1/2 p-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </EyeGlowButton>

          <EyeGlowButton
            showEyes={false}
            onClick={handleNext}
            ariaLabel="Next Instagram reel"
            className="hidden xl:inline-flex absolute -right-14 top-1/2 z-20 h-11 w-11 -translate-y-1/2 p-0"
          >
            <ChevronRight className="h-5 w-5" />
          </EyeGlowButton>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {orderedReels.map((reel) => {
              const meta = REEL_POSTERS[reel.id] ?? {
                poster: "/images/heroes/hero-skyline.jpg",
              };
              const isPlayingEmbed = activeEmbedId === reel.id;

              return (
                <div
                  key={reel.id}
                  className="group relative aspect-[9/14] overflow-hidden rounded-[24px] border-2 border-[#CBB6FF] bg-[#21124B] shadow-[0_24px_60px_-14px_rgba(92,43,212,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-white"
                >
                  {isPlayingEmbed ? (
                    <iframe
                      src={reel.embedUrl}
                      title={reel.title}
                      className="h-full w-full border-0 bg-white"
                    />
                  ) : (
                    <>
                      <Image
                        src={meta.poster}
                        alt={reel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Subtle top & bottom gradient overlays for legible Reel HUD */}
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60"
                        aria-hidden="true"
                      />

                      {/* Top Instagram Reel Header Bar */}
                      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
                        <a
                          href={BROKERAGE_INFO.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white font-sans text-[8px] font-extrabold leading-none text-[#21124B] shadow-sm">
                            MOVE
                          </span>
                          <div className="leading-tight">
                            <p className="flex items-center gap-1 font-sans text-[12px] font-bold text-white">
                              <span>movemiami</span>
                              <BadgeCheck className="h-3.5 w-3.5 fill-[#60A5FA] text-white" />
                            </p>
                            <p className="font-sans text-[10px] font-medium text-white/80">
                              Original audio
                            </p>
                          </div>
                        </a>

                        <div className="flex items-center gap-2 text-white">
                          <Clapperboard className="h-4 w-4" />
                          <MoreHorizontal className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Optional Realtor vs Attorney Overlay Pill */}
                      {meta.captionPill && (
                        <div className="pointer-events-none absolute inset-x-4 top-20 z-10 flex justify-center">
                          <span className="rounded-lg bg-[#47249C]/95 px-3.5 py-1.5 font-sans text-[13px] font-bold text-white shadow-lg backdrop-blur-sm">
                            {meta.captionPill}
                          </span>
                        </div>
                      )}

                      {/* Center Play Reel Button */}
                      <button
                        type="button"
                        onClick={() => setActiveEmbedId(reel.id)}
                        aria-label={`Play reel: ${reel.title}`}
                        className="absolute inset-0 z-10 flex items-center justify-center"
                      >
                        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#6136D6] shadow-[0_14px_30px_-6px_rgba(36,23,72,0.5)] transition-transform duration-300 group-hover:scale-110">
                          <Play className="ml-0.5 h-5 w-5 fill-current" />
                        </span>
                      </button>

                      {/* Bottom Reel Footer & External Instagram Link */}
                      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4">
                        <p className="line-clamp-2 font-sans text-[12px] font-semibold leading-snug text-white">
                          {reel.title}
                        </p>

                        <a
                          href={reel.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${reel.title} on Instagram`}
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30"
                        >
                          <Send className="h-4 w-4" />
                        </a>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3D Gravity Instagram Cubes (frameless, confined to the Instagram section) */}
        <div className="relative mt-6 h-[175px] w-full sm:h-[205px]">
          <GravityInstagramCubes
            href={BROKERAGE_INFO.social.instagram}
            cubeCount={4}
            cubeSize={2.15}
          />
        </div>
      </div>
    </section>
  );
}
