"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  address: string;
}

export function PropertyGallery({ images, address }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-4">
      {/* Main Large Display Frame */}
      <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-[28px] border border-white/90 bg-[#EDE5FA] shadow-[0_20px_50px_-16px_rgba(52,30,114,0.14)]">
        <Image
          src={images[activeIndex]}
          alt={`${address} — photo ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {images.length > 1 && (
          <>
            {/* Prev Photo Floating Pill */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/85 text-[#160B30] shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-white hover:text-[#5B2EC6] active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next Photo Floating Pill */}
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/85 text-[#160B30] shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-white hover:text-[#5B2EC6] active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Counter Badge */}
            <span className="absolute bottom-4 right-4 rounded-full border border-white/30 bg-[#160B30]/75 px-3.5 py-1 font-sans text-xs font-semibold tracking-wider text-white shadow-sm backdrop-blur-md">
              {activeIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnail Carousel / Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-6">
          {images.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all ${
                idx === activeIndex
                  ? "border-[#5B2EC6] shadow-md ring-2 ring-[#7C52EB]/30 scale-[0.98]"
                  : "border-white/80 opacity-70 hover:opacity-100 hover:scale-[1.02]"
              }`}
            >
              <Image
                src={src}
                alt={`${address} thumbnail ${idx + 1}`}
                fill
                sizes="150px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
