"use client";

import type { Property, PropertyCategory, PropertyType } from "@/types/property";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { PropertyCard } from "./PropertyCard";
import { PropertyFilters } from "./PropertyFilters";

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

      {filters.filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filters.filtered.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-10 border border-sand bg-white p-12 text-center">
          <p className="font-sans text-xl font-semibold text-navy">
            No properties matched those exact filters.
          </p>
          <p className="body-editorial mx-auto mt-2 max-w-md text-charcoal/75">
            We also work off-market across Miami-Dade and Broward. Clear your
            filters or send us your criteria for curated matches.
          </p>
          <button
            type="button"
            onClick={filters.resetFilters}
            className="mt-6 bg-navy px-6 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-white hover:bg-navy-light"
          >
            Reset Filters
          </button>
        </div>
      )}

      {filters.source === "mls" && (
        <div className="mt-12 border border-sand bg-white p-6 text-xs leading-relaxed text-muted">
          <p className="font-semibold uppercase tracking-[0.14em] text-navy">
            Move Miami Realty — South Florida MLS IDX Feed
          </p>
          <p className="mt-2">
            The MLS Data is deemed reliable, but is not guaranteed accurate by
            MIAMI REALTORS®. Listing information is provided through an
            Internet Data Exchange feed for consumers’ personal, non-commercial
            use, and may not be used for any purpose other than to identify
            prospective properties consumers may be interested in purchasing. ©
            2026 MIAMI Association of REALTORS and the South East Florida MLS.
            Equal Housing Opportunity.
          </p>
        </div>
      )}
    </div>
  );
}

