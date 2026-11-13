"use client";

import { Search, RotateCcw, SlidersHorizontal, ChevronDown } from "lucide-react";
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
  const isCustomFilterActive =
    Boolean(location) ||
    propertyType !== "all" ||
    Boolean(minPrice) ||
    Boolean(maxPrice) ||
    Boolean(beds);

  return (
    <div>
      {/* 1. Category Switcher Pills & Source Toggle */}
      <div className="flex flex-col justify-between gap-4 pb-2 lg:flex-row lg:items-center">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => {
              setSource("portfolio");
              setCategory("all");
            }}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[13.5px] font-semibold transition-all ${
              source === "portfolio" && category === "all"
                ? "bg-gradient-to-r from-[#321477] to-[#5B2EC6] text-white shadow-[0_4px_14px_rgba(91,46,198,0.35)]"
                : "border border-[#E5DBFB] bg-white/90 text-[#321477] shadow-xs hover:border-[#7C52EB] hover:bg-white"
            }`}
          >
            <span>All Portfolio</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                source === "portfolio" && category === "all"
                  ? "bg-white/20 text-white"
                  : "bg-[#F3ECFF] text-[#5B2EC6]"
              }`}
            >
              {counts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSource("portfolio");
              setCategory("for-sale");
            }}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[13.5px] font-semibold transition-all ${
              source === "portfolio" && category === "for-sale"
                ? "bg-gradient-to-r from-[#321477] to-[#5B2EC6] text-white shadow-[0_4px_14px_rgba(91,46,198,0.35)]"
                : "border border-[#E5DBFB] bg-white/90 text-[#321477] shadow-xs hover:border-[#7C52EB] hover:bg-white"
            }`}
          >
            <span>For Sale</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                source === "portfolio" && category === "for-sale"
                  ? "bg-white/20 text-white"
                  : "bg-[#F3ECFF] text-[#5B2EC6]"
              }`}
            >
              {counts.forSale}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSource("portfolio");
              setCategory("for-rent");
            }}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[13.5px] font-semibold transition-all ${
              source === "portfolio" && category === "for-rent"
                ? "bg-gradient-to-r from-[#321477] to-[#5B2EC6] text-white shadow-[0_4px_14px_rgba(91,46,198,0.35)]"
                : "border border-[#E5DBFB] bg-white/90 text-[#321477] shadow-xs hover:border-[#7C52EB] hover:bg-white"
            }`}
          >
            <span>For Rent</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                source === "portfolio" && category === "for-rent"
                  ? "bg-white/20 text-white"
                  : "bg-[#F3ECFF] text-[#5B2EC6]"
              }`}
            >
              {counts.forRent}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSource("portfolio");
              setCategory("vacation-rental");
            }}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[13.5px] font-semibold transition-all ${
              source === "portfolio" && category === "vacation-rental"
                ? "bg-gradient-to-r from-[#321477] to-[#5B2EC6] text-white shadow-[0_4px_14px_rgba(91,46,198,0.35)]"
                : "border border-[#E5DBFB] bg-white/90 text-[#321477] shadow-xs hover:border-[#7C52EB] hover:bg-white"
            }`}
          >
            <span>Vacation Rentals</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                source === "portfolio" && category === "vacation-rental"
                  ? "bg-white/20 text-white"
                  : "bg-[#F3ECFF] text-[#5B2EC6]"
              }`}
            >
              {counts.vacation}
            </span>
          </button>
        </div>

        {/* MLS Source Switcher */}
        <button
          type="button"
          onClick={() => setSource(source === "portfolio" ? "mls" : "portfolio")}
          className={`inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 font-sans text-[13.5px] font-semibold transition-all ${
            source === "mls"
              ? "border-[#5B2EC6] bg-[#5B2EC6] text-white shadow-[0_4px_14px_rgba(91,46,198,0.35)]"
              : "border-[#E5DBFB] bg-white/90 text-[#321477] shadow-xs hover:border-[#7C52EB] hover:bg-white"
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

      {/* 2. Floating White Search & Filter Card */}
      <div className="mt-5 rounded-[28px] border border-white/90 bg-white/90 p-5 shadow-[0_20px_50px_-16px_rgba(52,30,114,0.12)] backdrop-blur-md sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {/* Location Search Input */}
          <div className="lg:col-span-2">
            <label
              htmlFor="filter-location"
              className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#51476E]"
            >
              Location / Neighborhood
            </label>
            <div className="relative mt-2">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7CA8]" />
              <input
                id="filter-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Pinecrest, Brickell, Coral Gables..."
                className="w-full rounded-2xl border border-[#E5DBFB] bg-white py-3 pl-10 pr-4 font-sans text-[14px] text-[#160B30] placeholder:text-[#9A8FB3] transition-all focus:border-[#7C52EB] focus:outline-none focus:ring-4 focus:ring-[#7C52EB]/15"
              />
            </div>
          </div>

          {/* Property Type Dropdown */}
          <div>
            <label
              htmlFor="filter-type"
              className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#51476E]"
            >
              Property Type
            </label>
            <div className="relative mt-2">
              <select
                id="filter-type"
                value={propertyType}
                onChange={(e) =>
                  setPropertyType(e.target.value as PropertyType | "all")
                }
                className="w-full appearance-none rounded-2xl border border-[#E5DBFB] bg-white py-3 pl-4 pr-10 font-sans text-[14px] text-[#160B30] transition-all focus:border-[#7C52EB] focus:outline-none focus:ring-4 focus:ring-[#7C52EB]/15"
              >
                <option value="all">Any Type</option>
                <option value="Single Family">Single Family</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7CA8]" />
            </div>
          </div>

          {/* Min Price Dropdown */}
          <div>
            <label
              htmlFor="filter-min"
              className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#51476E]"
            >
              Min Price
            </label>
            <div className="relative mt-2">
              <select
                id="filter-min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-[#E5DBFB] bg-white py-3 pl-4 pr-10 font-sans text-[14px] text-[#160B30] transition-all focus:border-[#7C52EB] focus:outline-none focus:ring-4 focus:ring-[#7C52EB]/15"
              >
                <option value="">No Min</option>
                <option value="3000">$3,000/mo</option>
                <option value="10000">$10,000/mo</option>
                <option value="400000">$400,000+</option>
                <option value="500000">$500,000+</option>
                <option value="750000">$750,000+</option>
                <option value="1000000">$1,000,000+</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7CA8]" />
            </div>
          </div>

          {/* Max Price Dropdown */}
          <div>
            <label
              htmlFor="filter-max"
              className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#51476E]"
            >
              Max Price
            </label>
            <div className="relative mt-2">
              <select
                id="filter-max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-[#E5DBFB] bg-white py-3 pl-4 pr-10 font-sans text-[14px] text-[#160B30] transition-all focus:border-[#7C52EB] focus:outline-none focus:ring-4 focus:ring-[#7C52EB]/15"
              >
                <option value="">No Max</option>
                <option value="5000">$5,000/mo</option>
                <option value="15000">$15,000/mo</option>
                <option value="600000">$600,000</option>
                <option value="1000000">$1,000,000</option>
                <option value="1500000">$1,500,000</option>
                <option value="3000000">$3,000,000</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7CA8]" />
            </div>
          </div>

          {/* Bedrooms Dropdown */}
          <div>
            <label
              htmlFor="filter-beds"
              className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#51476E]"
            >
              Bedrooms
            </label>
            <div className="relative mt-2">
              <select
                id="filter-beds"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-[#E5DBFB] bg-white py-3 pl-4 pr-10 font-sans text-[14px] text-[#160B30] transition-all focus:border-[#7C52EB] focus:outline-none focus:ring-4 focus:ring-[#7C52EB]/15"
              >
                <option value="">Any Beds</option>
                <option value="1">1+ Beds</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
                <option value="5">5+ Beds</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7CA8]" />
            </div>
          </div>
        </div>

        {/* 3. Bottom Status & Sort Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#EDE5FA] pt-4">
          <p className="font-sans text-[13.5px] font-medium text-[#51476E]">
            Showing <strong className="font-bold text-[#160B30]">{resultCount}</strong>{" "}
            {source === "portfolio"
              ? "Move Miami portfolio listings"
              : "MLS IDX sample listings"}
          </p>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label
                htmlFor="filter-sort"
                className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#8B7CA8]"
              >
                Sort
              </label>
              <div className="relative">
                <select
                  id="filter-sort"
                  value={sort}
                  onChange={(e) =>
                    setSort(
                      e.target.value as "featured" | "price-asc" | "price-desc"
                    )
                  }
                  className="appearance-none rounded-full border border-[#E5DBFB] bg-white py-1.5 pl-3.5 pr-8 font-sans text-[12.5px] font-semibold text-[#160B30] transition-all focus:border-[#7C52EB] focus:outline-none"
                >
                  <option value="featured">Featured Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8B7CA8]" />
              </div>
            </div>

            {isCustomFilterActive && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#E5DBFB] bg-[#FAF8FF] px-3.5 py-1.5 font-sans text-[12px] font-semibold text-[#321477] transition-all hover:border-[#7C52EB] hover:bg-white hover:text-[#5B2EC6]"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
