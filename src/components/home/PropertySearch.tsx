"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, DollarSign } from "lucide-react";

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
      className="w-full border border-white/20 bg-ivory/95 p-2 shadow-2xl backdrop-blur-md"
    >
      <div className="grid grid-cols-1 divide-y divide-sand md:grid-cols-12 md:divide-x md:divide-y-0">
        {/* Location */}
        <div className="flex items-center gap-3 px-4 py-3 md:col-span-5">
          <MapPin className="h-4 w-4 shrink-0 text-gold-dark" />
          <div className="w-full">
            <label
              htmlFor="hero-location"
              className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted"
            >
              Location
            </label>
            <input
              id="hero-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Brickell, Pinecrest, Coral Gables, Islamorada..."
              className="w-full bg-transparent text-sm font-medium text-navy placeholder:text-charcoal/45 focus:outline-none"
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="flex items-center gap-3 px-4 py-3 md:col-span-3">
          <Home className="h-4 w-4 shrink-0 text-gold-dark" />
          <div className="w-full">
            <label
              htmlFor="hero-type"
              className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted"
            >
              Property Type
            </label>
            <select
              id="hero-type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-navy focus:outline-none"
            >
              <option value="all">All Property Types</option>
              <option value="Single Family">Single Family</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="flex items-center gap-3 px-4 py-3 md:col-span-2">
          <DollarSign className="h-4 w-4 shrink-0 text-gold-dark" />
          <div className="w-full">
            <label
              htmlFor="hero-price"
              className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted"
            >
              Price Range
            </label>
            <select
              id="hero-price"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-navy focus:outline-none"
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

        {/* Submit */}
        <div className="p-1 md:col-span-2">
          <button
            type="submit"
            className="flex h-full w-full items-center justify-center gap-2 bg-navy px-5 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-white transition-colors hover:bg-navy-light"
          >
            <Search className="h-4 w-4 text-gold" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}

