"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bath,
  BedDouble,
  CheckCircle2,
  Heart,
  Home,
  MapPin,
  Maximize2,
  Waves,
} from "lucide-react";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  highlighted?: boolean;
}

function getStatusPill(property: Property) {
  if (property.category === "for-rent") {
    return { label: "FOR RENT", dotColor: "bg-[#9353FF]" };
  }
  if (property.category === "vacation-rental") {
    return { label: "VACATION RENTAL", dotColor: "bg-[#9353FF]" };
  }
  if (property.status === "Active") {
    return { label: "ACTIVE", dotColor: "bg-[#22C55E]" };
  }
  if (property.status === "Under Contract") {
    return { label: "UNDER CONTRACT", dotColor: "bg-[#8B5CF6]" };
  }
  return {
    label: property.status.toUpperCase(),
    dotColor: "bg-[#6D47D9]",
  };
}

export function PropertyCard({
  property,
  highlighted = false,
}: PropertyCardProps) {
  const [saved, setSaved] = useState(false);
  const pill = getStatusPill(property);
  const hasSpecs =
    property.bedrooms !== undefined ||
    property.bathrooms !== undefined ||
    property.sqft !== undefined;

  const formattedPrice =
    property.category === "for-rent"
      ? property.priceLabel.replace("/mo", "/MO")
      : property.priceLabel;

  const fallbackMeta = [
    {
      icon: "home" as const,
      label: property.propertyType,
    },
    ...(property.pool
      ? [{ icon: "waves" as const, label: "Private Pool" }]
      : property.lotSqft
        ? [{ icon: "maximize" as const, label: `${property.lotSqft.toLocaleString()} lot` }]
        : []),
    ...(property.hoa
      ? [
          {
            icon: "check" as const,
            label: property.hoa === "None" ? "No HOA" : `HOA ${property.hoa}`,
          },
        ]
      : []),
  ].slice(0, 3);

  const handleToggleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved((prev) => !prev);
  };

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] border transition-all duration-300 hover:-translate-y-1 ${
        highlighted
          ? "border-white/85 bg-[#2A1263] shadow-[0_26px_65px_-12px_rgba(93,43,214,0.58)]"
          : "border-white/90 bg-white/80 shadow-[0_20px_50px_-16px_rgba(52,30,114,0.22)] backdrop-blur-md hover:shadow-[0_26px_55px_-14px_rgba(76,38,168,0.3)]"
      }`}
    >
      {/* Property Cover Image */}
      <Link
        href={`/properties/${property.slug}`}
        className="relative block h-[245px] w-full shrink-0 overflow-hidden bg-[#EDE9F7]"
      >
        <Image
          src={property.coverImage}
          alt={`${property.address} in ${property.neighborhood}, ${property.city}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />

        {/* Top Badge & Favorite Heart */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[#22144A] shadow-sm backdrop-blur-sm">
            <span className={`h-2 w-2 rounded-full ${pill.dotColor}`} />
            <span>{pill.label}</span>
          </span>

          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={saved ? "Remove from saved homes" : "Save home"}
            aria-pressed={saved}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
              saved
                ? "border-white bg-[#5E3FD6] text-white"
                : "border-white/55 bg-black/15 text-white hover:bg-white/25"
            }`}
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>
      </Link>

      {/* Curved Wave Content Panel */}
      <div
        className={`relative z-10 -mt-9 flex flex-1 flex-col justify-between px-6 pb-6 pt-5 ${
          highlighted
            ? "bg-gradient-to-b from-[#4F25BA] via-[#3A198A] to-[#230E54] text-white"
            : "bg-gradient-to-b from-white/95 via-[#F8F5FF]/95 to-[#EDE6FF]/95 text-[#22144A]"
        }`}
      >
        {/* Top Organic SVG Wave Overlap */}
        <svg
          viewBox="0 0 400 44"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-10 h-11 w-full"
        >
          <defs>
            <linearGradient
              id={`wave-fill-${property.slug}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              {highlighted ? (
                <>
                  <stop offset="0%" stopColor="#5D31CE" stopOpacity="0.96" />
                  <stop offset="100%" stopColor="#4F25BA" stopOpacity="1" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.94" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.96" />
                </>
              )}
            </linearGradient>
          </defs>
          <path
            d="M0 18 C 95 -4, 210 38, 400 8 L 400 44 L 0 44 Z"
            fill={`url(#wave-fill-${property.slug})`}
          />
          <path
            d="M0 18 C 95 -4, 210 38, 400 8"
            stroke={
              highlighted
                ? "rgba(255, 255, 255, 0.52)"
                : "rgba(255, 255, 255, 0.9)"
            }
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        {/* Subtle Palm Silhouette Watermark on Light Cards */}
        {!highlighted && (
          <svg
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1 right-2 h-24 w-24 text-[#734CE0]/[0.09]"
          >
            <path
              d="M62 118 C64 88 68 65 74 44"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M74 44 C52 28 24 28 8 42 C30 38 52 44 70 54 C46 56 26 66 16 82 C36 69 56 64 72 62"
              fill="currentColor"
            />
            <path
              d="M75 43 C77 22 64 6 48 2 C64 13 72 28 73 43"
              fill="currentColor"
            />
            <path
              d="M75 43 C94 25 112 22 120 34 C104 32 88 39 77 51 C96 50 112 58 119 72 C104 62 88 58 75 56"
              fill="currentColor"
            />
          </svg>
        )}

        {/* Main Price & Location Row */}
        <div className="relative z-10 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/properties/${property.slug}`} className="block">
              <p
                className={`font-sans text-[28px] font-bold leading-none tracking-tight sm:text-[30px] ${
                  highlighted ? "text-white" : "text-[#22144A]"
                }`}
              >
                {formattedPrice}
              </p>
            </Link>

            <div className="mt-3 flex items-start gap-2">
              <MapPin
                className={`mt-0.5 h-4 w-4 shrink-0 ${
                  highlighted ? "text-[#C6B2FF]" : "text-[#4D29A6]"
                }`}
              />
              <div className="min-w-0">
                <h3
                  className={`truncate font-sans text-[14px] font-bold leading-snug ${
                    highlighted ? "text-white" : "text-[#22144A]"
                  }`}
                >
                  <Link href={`/properties/${property.slug}`}>
                    {property.address}
                  </Link>
                </h3>
                <p
                  className={`truncate font-sans text-[13px] leading-snug ${
                    highlighted ? "text-white/75" : "text-[#5C547A]"
                  }`}
                >
                  {property.neighborhood}, {property.city}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={`/properties/${property.slug}`}
            aria-label={`View ${property.address}`}
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all ${
              highlighted
                ? "border border-white/25 bg-white/15 text-white hover:bg-white/25"
                : "bg-[#EFEAFF] text-[#4C26AA] hover:bg-[#5E3FD6] hover:text-white"
            }`}
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bottom Divider & Specs Row */}
        <div
          className={`relative z-10 mt-5 flex items-center justify-between gap-2 border-t pt-4 font-sans text-[13px] font-semibold ${
            highlighted
              ? "border-white/15 text-white/95"
              : "border-[#E3DAF5] text-[#22144A]"
          }`}
        >
          {hasSpecs ? (
            <>
              {property.bedrooms !== undefined && (
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <BedDouble
                    className={`h-4 w-4 shrink-0 ${
                      highlighted ? "text-[#C6B2FF]" : "text-[#4D29A6]"
                    }`}
                  />
                  <span>{property.bedrooms} bd</span>
                </span>
              )}

              {property.bedrooms !== undefined &&
                property.bathrooms !== undefined && (
                  <span
                    className={`h-3.5 w-px shrink-0 ${
                      highlighted ? "bg-white/20" : "bg-[#DDD2F2]"
                    }`}
                    aria-hidden="true"
                  />
                )}

              {property.bathrooms !== undefined && (
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <Bath
                    className={`h-4 w-4 shrink-0 ${
                      highlighted ? "text-[#C6B2FF]" : "text-[#4D29A6]"
                    }`}
                  />
                  <span>{property.bathrooms} ba</span>
                </span>
              )}

              {property.bathrooms !== undefined && property.sqft !== undefined && (
                <span
                  className={`h-3.5 w-px shrink-0 ${
                    highlighted ? "bg-white/20" : "bg-[#DDD2F2]"
                  }`}
                  aria-hidden="true"
                />
              )}

              {property.sqft !== undefined && (
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <Maximize2
                    className={`h-4 w-4 shrink-0 ${
                      highlighted ? "text-[#C6B2FF]" : "text-[#4D29A6]"
                    }`}
                  />
                  <span>{property.sqft.toLocaleString()} sqft</span>
                </span>
              )}
            </>
          ) : (
            fallbackMeta.map((item, index) => (
              <div key={item.label} className="contents">
                {index > 0 && (
                  <span
                    className={`h-3.5 w-px shrink-0 ${
                      highlighted ? "bg-white/20" : "bg-[#DDD2F2]"
                    }`}
                    aria-hidden="true"
                  />
                )}
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  {item.icon === "home" && (
                    <Home
                      className={`h-4 w-4 shrink-0 ${
                        highlighted ? "text-[#C6B2FF]" : "text-[#4D29A6]"
                      }`}
                    />
                  )}
                  {item.icon === "waves" && (
                    <Waves
                      className={`h-4 w-4 shrink-0 ${
                        highlighted ? "text-[#C6B2FF]" : "text-[#4D29A6]"
                      }`}
                    />
                  )}
                  {item.icon === "maximize" && (
                    <Maximize2
                      className={`h-4 w-4 shrink-0 ${
                        highlighted ? "text-[#C6B2FF]" : "text-[#4D29A6]"
                      }`}
                    />
                  )}
                  {item.icon === "check" && (
                    <CheckCircle2
                      className={`h-4 w-4 shrink-0 ${
                        highlighted ? "text-[#C6B2FF]" : "text-[#4D29A6]"
                      }`}
                    />
                  )}
                  <span>{item.label}</span>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </article>
  );
}
