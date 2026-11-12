"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";

export function PropertySearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (propertyType !== "all") params.set("type", propertyType);

    if (priceRange === "under-750k") {
      params.set("maxPrice", "750000");
    } else if (priceRange === "750k-1500k") {
      params.set("minPrice", "750000");
      params.set("maxPrice", "1500000");
    } else if (priceRange === "1500k-plus") {
      params.set("minPrice", "1500000");
    } else if (priceRange === "rentals") {
      params.set("category", "for-rent");
    } else if (priceRange === "vacation") {
      params.set("category", "vacation-rental");
    }

    const qs = params.toString();
    router.push(qs ? `/listings?${qs}` : "/listings");
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Property search"
      className="mx-auto w-full max-w-5xl rounded-3xl border border-white/95 bg-white/95 p-3 shadow-[0_24px_55px_-14px_rgba(36,23,72,0.24)] backdrop-blur-md md:rounded-full md:py-2.5 md:pl-7 md:pr-2.5"
    >
      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1.4fr_1.05fr_0.95fr_auto] md:gap-0">
        {/* Location */}
        <div className="flex items-center gap-3 px-2 py-1.5 md:px-0 md:pr-5">
          <MapPin className="h-[18px] w-[18px] shrink-0 text-[#5E3FD6]" />
          <div className="min-w-0 flex-1">
            <label
              htmlFor="hero-location"
              className="block font-sans text-[11px] font-medium text-[#6B647F]"
            >
              Location
            </label>
            <input
              id="hero-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Brickell, Pinecrest, Coral Gables..."
              className="w-full truncate bg-transparent font-sans text-[14px] font-medium text-[#1F1B2E] placeholder:text-[#5C5570]/80 focus:outline-none"
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="flex items-center gap-3 border-t border-[#E6E1F2] px-2 pt-3 pb-1.5 md:border-l md:border-t-0 md:px-5 md:py-1">
          <Home className="h-[18px] w-[18px] shrink-0 text-[#5E3FD6]" />
          <div className="min-w-0 flex-1">
            <label
              htmlFor="hero-type"
              className="block font-sans text-[11px] font-medium text-[#6B647F]"
            >
              Property Type
            </label>
            <select
              id="hero-type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full cursor-pointer bg-transparent font-sans text-[14px] font-semibold text-[#1F1B2E] focus:outline-none"
            >
              <option value="all">All Property Types</option>
              <option value="Single Family">Single Family</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="flex items-center gap-3 border-t border-[#E6E1F2] px-2 pt-3 pb-1.5 md:border-l md:border-t-0 md:px-5 md:py-1">
          <DollarSign className="h-[18px] w-[18px] shrink-0 text-[#5E3FD6]" />
          <div className="min-w-0 flex-1">
            <label
              htmlFor="hero-price"
              className="block font-sans text-[11px] font-medium text-[#6B647F]"
            >
              Price Range
            </label>
            <select
              id="hero-price"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full cursor-pointer bg-transparent font-sans text-[14px] font-semibold text-[#1F1B2E] focus:outline-none"
            >
              <option value="all">Any Price</option>
              <option value="under-750k">Under $750K</option>
              <option value="750k-1500k">$750K – $1.5M</option>
              <option value="1500k-plus">$1.5M+</option>
              <option value="rentals">Long-Term Rentals</option>
              <option value="vacation">Vacation Rentals</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="pt-1 md:pl-3 md:pt-0">
          <FluidGlassButton
            type="submit"
            className="w-full whitespace-nowrap px-6 py-3.5 text-[14px] md:w-auto"
          >
            <Search className="h-4 w-4 text-white/95" />
            <span>Search Properties</span>
          </FluidGlassButton>
        </div>
      </div>
    </form>
  );
}
