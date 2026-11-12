import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { YOUTUBE_VIDEOS } from "@/data/videos";
import { BROKERAGE_INFO } from "@/lib/constants";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";

export function VideoShowcase() {
  const featured = YOUTUBE_VIDEOS.slice(0, 6);

  return (
    <section className="relative overflow-hidden border-b border-[#DCD0FA] bg-[linear-gradient(135deg,#F8F5FF_0%,#ECE3FF_52%,#DECFFF_100%)] py-20 md:py-24">
      {/* Diagonal Soft Wave & Top-Right Palm Fronds Backdrop */}
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
            d="M0 0 H1160 C980 270 620 480 0 650 Z"
            fill="rgba(255, 255, 255, 0.36)"
          />
          <path
            d="M0 645 C480 510 920 290 1200 0"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="2"
          />
        </svg>

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
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4C5F9] bg-white/80 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#683CE0] text-white">
                <Play className="ml-0.5 h-2.5 w-2.5 fill-current" />
              </span>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#5330B5]">
                On The Channel
              </span>
            </div>

            <h2 className="heading-section mt-4 text-[#21124B]">
              Watch the Magic City{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#5D33CE] via-[#7E52EB] to-[#A47BFF] bg-clip-text italic text-transparent">
                  with Us.
                </span>
                <svg
                  viewBox="0 0 220 14"
                  fill="none"
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 h-3 w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 10 C 65 3.5, 148 3, 217 8.5"
                    stroke="url(#watch-magic-swoosh)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="watch-magic-swoosh"
                      x1="3"
                      y1="8"
                      x2="217"
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

            <p className="body-editorial mt-4 max-w-xl text-[#45396B]">
              Neighborhood walk-throughs, market breakdowns, and the honest
              answers buyers and sellers actually ask us.
            </p>
          </div>

          {/* Subscribe on YouTube Pill CTA */}
          <div className="shrink-0">
            <FluidGlassButton
              href={BROKERAGE_INFO.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 text-[14px]"
            >
              <span className="inline-flex h-5 w-6 items-center justify-center rounded-md bg-[#FF1A1A] text-white">
                <Play className="ml-0.5 h-2.5 w-2.5 fill-current" />
              </span>
              <span>Subscribe on YouTube</span>
              <ArrowRight className="h-4 w-4" />
            </FluidGlassButton>
          </div>
        </div>

        {/* 6-Video Grid (3x2) */}
        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((video) => (
            <a
              key={video.id}
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-[24px] border border-white/95 bg-white/85 shadow-[0_20px_50px_-16px_rgba(68,32,158,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_55px_-14px_rgba(88,45,198,0.28)]"
            >
              {/* Video Thumbnail + Wave Cut */}
              <div className="relative aspect-[16/9.5] overflow-hidden bg-[#241748]">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#1B1038]/12 transition-colors group-hover:bg-[#1B1038]/24" />

                {/* Top-Right Metadata Pill */}
                <span className="absolute right-3.5 top-3.5 z-10 rounded-full bg-[#1C1238]/75 px-3 py-1 font-sans text-[11px] font-semibold text-white backdrop-blur-sm">
                  {video.views}
                </span>

                {/* Center White Play Button */}
                <span className="absolute inset-0 z-10 flex items-center justify-center">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#6136D6] shadow-[0_12px_28px_-6px_rgba(36,23,72,0.45)] transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 h-5 w-5 fill-current" />
                  </span>
                </span>

                {/* Curved Bottom Wave Transition */}
                <svg
                  viewBox="0 0 400 32"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -bottom-px z-10 h-7 w-full"
                >
                  <path
                    d="M0 10 C 110 34, 280 28, 400 2 L 400 32 L 0 32 Z"
                    fill="#FFFFFF"
                    fillOpacity="0.96"
                  />
                </svg>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between bg-gradient-to-b from-white/95 to-[#F4EEFF]/95 px-6 pb-6 pt-3">
                <h3 className="line-clamp-2 font-sans text-[16px] font-bold leading-snug text-[#21124B] transition-colors group-hover:text-[#5B31C7]">
                  {video.title}
                </h3>

                <span className="mt-4 inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-[#3B2180] transition-colors group-hover:text-[#5E35CE]">
                  <span>Watch on YouTube</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
