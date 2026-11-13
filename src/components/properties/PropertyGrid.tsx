"use client";

import Link from "next/link";
import { Search, RotateCcw, Sparkles } from "lucide-react";
import type { Property, PropertyCategory, PropertyType } from "@/types/property";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { PropertyCard } from "./PropertyCard";
import { PropertyFilters } from "./PropertyFilters";
import { Reveal } from "@/components/ui/Reveal";

interface PropertyGridProps {
  portfolioProperties: Property[];
  mlsProperties: Property[];
  initialLocation?: string;
  initialCategory?: PropertyCategory | "all";
  initialType?: PropertyType | "all";
  initialMinPrice?: string;
  initialMaxPrice?: string;
}

export function PropertyGrid({
  portfolioProperties,
  mlsProperties,
  initialLocation = "",
  initialCategory = "all",
  initialType = "all",
  initialMinPrice = "",
  initialMaxPrice = "",
}: PropertyGridProps) {
  const filters = usePropertyFilters({
    portfolioProperties,
    mlsProperties,
    initialLocation,
    initialCategory,
    initialType,
    initialMinPrice,
    initialMaxPrice,
  });

  return (
    <div>
      {/* Interactive Filters Bar */}
      <PropertyFilters
        source={filters.source}
        setSource={filters.setSource}
        category={filters.category}
        setCategory={filters.setCategory}
        location={filters.location}
        setLocation={filters.setLocation}
        propertyType={filters.propertyType}
        setPropertyType={filters.setPropertyType}
        minPrice={filters.minPrice}
        setMinPrice={filters.setMinPrice}
        maxPrice={filters.maxPrice}
        setMaxPrice={filters.setMaxPrice}
        beds={filters.beds}
        setBeds={filters.setBeds}
        sort={filters.sort}
        setSort={filters.setSort}
        counts={filters.counts}
        resultCount={filters.filtered.length}
        onReset={filters.resetFilters}
      />

      {/* Property Cards Grid or Empty State */}
      {filters.filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filters.filtered.map((property, idx) => (
            <Reveal
              key={property.slug}
              delay={Math.min(idx * 0.05, 0.3)}
              variant="fade-up"
              distance={16}
            >
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[30px] border border-white/90 bg-white/95 p-12 text-center shadow-[0_20px_50px_-16px_rgba(52,30,114,0.12)] backdrop-blur-md sm:p-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F3ECFF] text-[#5B2EC6] shadow-xs">
            <Search className="h-7 w-7 text-[#5B2EC6]" />
          </div>

          <h3 className="mt-5 font-sans text-2xl font-bold tracking-tight text-[#160B30] sm:text-3xl">
            No properties matched those exact filters.
          </h3>

          <p className="mx-auto mt-3 max-w-lg font-sans text-[15px] leading-relaxed text-[#51476E]">
            We also manage curated, off-market opportunities across Miami-Dade
            and Broward. Clear your filters to see active inventory or reach out
            directly to our advisory desk.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={filters.resetFilters}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#321477] to-[#5B2EC6] px-6 py-3.5 font-sans text-[14px] font-bold text-white shadow-[0_10px_24px_-4px_rgba(91,46,198,0.4)] transition-all hover:shadow-[0_14px_28px_-4px_rgba(91,46,198,0.55)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Filters</span>
            </button>

            <Link
              href="/buy"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5DBFB] bg-white px-6 py-3.5 font-sans text-[14px] font-semibold text-[#321477] shadow-xs transition-all hover:border-[#7C52EB] hover:bg-[#FAF8FF]"
            >
              <Sparkles className="h-4 w-4 text-[#7C52EB]" />
              <span>Request Off-Market Options</span>
            </Link>
          </div>
        </div>
      )}

      {/* MLS IDX Legal Disclosure Footer Card */}
      {filters.source === "mls" && (
        <div className="mt-12 rounded-[24px] border border-[#E5DBFB] bg-white/80 p-6 text-xs leading-relaxed text-[#51476E] shadow-sm backdrop-blur-md">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#160B30]">
            Move Miami Realty — South Florida MLS IDX Feed
          </p>
          <p className="mt-2 font-sans text-[12px] leading-relaxed text-[#51476E]">
            The MLS Data is deemed reliable, but is not guaranteed accurate by
            MIAMI REALTORS®. Listing information is provided through an Internet
            Data Exchange feed for consumers’ personal, non-commercial use, and
            may not be used for any purpose other than to identify prospective
            properties consumers may be interested in purchasing. © 2026 MIAMI
            Association of REALTORS and the South East Florida MLS. Equal
            Housing Opportunity.
          </p>
        </div>
      )}
    </div>
  );
}
