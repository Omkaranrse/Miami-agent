"use client";

import { Search, RotateCcw, SlidersHorizontal } from "lucide-react";
import type { PropertyCategory, PropertyType } from "@/types/property";

interface PropertyFiltersProps {
  source: "portfolio" | "mls";
  setSource: (source: "portfolio" | "mls") => void;
  category: PropertyCategory | "all";
  setCategory: (category: PropertyCategory | "all") => void;
  location: string;
  setLocation: (location: string) => void;
  propertyType: PropertyType | "all";
  setPropertyType: (propertyType: PropertyType | "all") => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
  beds: string;
  setBeds: (val: string) => void;
  sort: "featured" | "price-asc" | "price-desc";
  setSort: (val: "featured" | "price-asc" | "price-desc") => void;
  counts: { all: number; forSale: number; forRent: number; vacation: number };
  resultCount: number;
  onReset: () => void;
}

export function PropertyFilters({
  source,
  setSource,
  category,
  setCategory,
  location,
  setLocation,
  propertyType,
  setPropertyType,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  beds,
  setBeds,
  sort,
  setSort,
  counts,
  resultCount,
  onReset,
}: PropertyFiltersProps) {
  return (
    <div>
      {/* Source Switcher & Category Tabs */}
      <div className="flex flex-col justify-between gap-4 border-b border-sand pb-6 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSource("portfolio");
              setCategory("all");
            }}
            className={`px-4 py-2.5 font-sans text-[14px] font-semibold tracking-[0.02em] transition-colors ${
              source === "portfolio" && category === "all"
                ? "bg-navy text-white"
                : "border border-sand bg-white text-charcoal hover:border-navy"
            }`}
          >
            All Portfolio ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => {
              setSource("portfolio");
              setCategory("for-sale");
            }}
            className={`px-4 py-2.5 font-sans text-[14px] font-semibold tracking-[0.02em] transition-colors ${
              source === "portfolio" && category === "for-sale"
                ? "bg-navy text-white"
                : "border border-sand bg-white text-charcoal hover:border-navy"
            }`}
          >
            For Sale ({counts.forSale})
          </button>
          <button
            type="button"
            onClick={() => {
              setSource("portfolio");
              setCategory("for-rent");
            }}
            className={`px-4 py-2.5 font-sans text-[14px] font-semibold tracking-[0.02em] transition-colors ${
              source === "portfolio" && category === "for-rent"
                ? "bg-navy text-white"
                : "border border-sand bg-white text-charcoal hover:border-navy"
            }`}
          >
            For Rent ({counts.forRent})
          </button>
          <button
            type="button"
            onClick={() => {
              setSource("portfolio");
              setCategory("vacation-rental");
            }}
            className={`px-4 py-2.5 font-sans text-[14px] font-semibold tracking-[0.02em] transition-colors ${
              source === "portfolio" && category === "vacation-rental"
                ? "bg-navy text-white"
                : "border border-sand bg-white text-charcoal hover:border-navy"
            }`}
          >
            Vacation Rentals ({counts.vacation})
          </button>
        </div>

        <button
          type="button"
          onClick={() => setSource(source === "portfolio" ? "mls" : "portfolio")}
          className={`inline-flex items-center gap-2 border px-4 py-2.5 font-sans text-[14px] font-semibold tracking-[0.02em] transition-colors ${
            source === "mls"
              ? "border-gold bg-gold text-navy"
              : "border-navy/25 bg-ivory text-navy hover:border-navy"
          }`}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>
            {source === "mls"
              ? "Viewing South Florida MLS Feed"
              : "Browse MLS IDX Feed"}
          </span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="mt-6 border border-sand bg-white p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <label
              htmlFor="filter-location"
              className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted"
            >
              Location / Neighborhood / Address
            </label>
            <div className="relative mt-1.5">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="filter-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Pinecrest, Brickell, Islamorada..."
                className="w-full border border-sand bg-ivory/50 py-2.5 pl-9 pr-3 text-sm text-charcoal focus:border-navy focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="filter-type"
              className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted"
            >
              Property Type
            </label>
            <select
              id="filter-type"
              value={propertyType}
              onChange={(e) =>
                setPropertyType(e.target.value as PropertyType | "all")
              }
              className="mt-1.5 w-full border border-sand bg-ivory/50 px-3 py-2.5 text-sm text-charcoal focus:border-navy focus:bg-white focus:outline-none"
            >
              <option value="all">Any Type</option>
              <option value="Single Family">Single Family</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-min"
              className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted"
            >
              Min Price
            </label>
            <select
              id="filter-min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="mt-1.5 w-full border border-sand bg-ivory/50 px-3 py-2.5 text-sm text-charcoal focus:border-navy focus:bg-white focus:outline-none"
            >
              <option value="">No Min</option>
              <option value="3000">$3,000+</option>
              <option value="10000">$10,000+</option>
              <option value="400000">$400,000+</option>
              <option value="500000">$500,000+</option>
              <option value="750000">$750,000+</option>
              <option value="1000000">$1,000,000+</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-max"
              className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted"
            >
              Max Price
            </label>
            <select
              id="filter-max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="mt-1.5 w-full border border-sand bg-ivory/50 px-3 py-2.5 text-sm text-charcoal focus:border-navy focus:bg-white focus:outline-none"
            >
              <option value="">No Max</option>
              <option value="5000">$5,000/mo</option>
              <option value="15000">$15,000/mo</option>
              <option value="600000">$600,000</option>
              <option value="1000000">$1,000,000</option>
              <option value="1500000">$1,500,000</option>
              <option value="3000000">$3,000,000</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-beds"
              className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted"
            >
              Bedrooms
            </label>
            <select
              id="filter-beds"
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
              className="mt-1.5 w-full border border-sand bg-ivory/50 px-3 py-2.5 text-sm text-charcoal focus:border-navy focus:bg-white focus:outline-none"
            >
              <option value="">Any Beds</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-sand/60 pt-4">
          <p className="text-xs font-medium text-muted">
            Showing <strong className="text-navy">{resultCount}</strong>{" "}
            {source === "portfolio"
              ? "Move Miami portfolio listings"
              : "MLS IDX sample listings"}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="filter-sort"
                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
              >
                Sort
              </label>
              <select
                id="filter-sort"
                value={sort}
                onChange={(e) =>
                  setSort(
                    e.target.value as "featured" | "price-asc" | "price-desc"
                  )
                }
                className="border border-sand bg-ivory/50 px-3 py-1.5 text-xs font-medium text-navy focus:border-navy focus:outline-none"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold tracking-[0.03em] text-navy hover:text-gold-dark"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

