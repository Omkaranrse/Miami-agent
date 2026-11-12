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
    <div className="space-y-3">
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-sand bg-navy/5">
        <Image
          src={images[activeIndex]}
          alt={`${address} — photo ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-navy/75 text-white transition-colors hover:bg-navy"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-navy/75 text-white transition-colors hover:bg-navy"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-4 right-4 bg-navy/85 px-3 py-1 text-xs font-medium tracking-wider text-white">
              {activeIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {images.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[4/3] overflow-hidden border transition-all ${
                idx === activeIndex
                  ? "border-navy ring-1 ring-navy"
                  : "border-sand opacity-75 hover:opacity-100"
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

