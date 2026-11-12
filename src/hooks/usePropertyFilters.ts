"use client";

import { useMemo, useState } from "react";
import type { Property, PropertyCategory, PropertyType } from "@/types/property";

interface UsePropertyFiltersInit {
  portfolioProperties: Property[];
  mlsProperties: Property[];
  initialLocation?: string;
  initialCategory?: PropertyCategory | "all";
  initialType?: PropertyType | "all";
  initialMinPrice?: string;
  initialMaxPrice?: string;
}

export function usePropertyFilters({
  portfolioProperties,
  mlsProperties,
  initialLocation = "",
  initialCategory = "all",
  initialType = "all",
  initialMinPrice = "",
  initialMaxPrice = "",
}: UsePropertyFiltersInit) {
  const [source, setSource] = useState<"portfolio" | "mls">("portfolio");
  const [category, setCategory] = useState<PropertyCategory | "all">(
    initialCategory
  );
  const [location, setLocation] = useState(initialLocation);
  const [propertyType, setPropertyType] = useState<PropertyType | "all">(
    initialType
  );
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [beds, setBeds] = useState("");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">(
    "featured"
  );

  const counts = useMemo(
    () => ({
      all: portfolioProperties.length,
      forSale: portfolioProperties.filter((p) => p.category === "for-sale")
        .length,
      forRent: portfolioProperties.filter((p) => p.category === "for-rent")
        .length,
      vacation: portfolioProperties.filter(
        (p) => p.category === "vacation-rental"
      ).length,
    }),
    [portfolioProperties]
  );

  const activeDataset = source === "portfolio" ? portfolioProperties : mlsProperties;

  const filtered = useMemo(() => {
    let list = activeDataset.filter((p) => {
      if (source === "portfolio" && category !== "all" && p.category !== category)
        return false;
      if (propertyType !== "all" && p.propertyType !== propertyType)
        return false;
      if (location.trim()) {
        const q = location.trim().toLowerCase();
        const hay =
          `${p.address} ${p.neighborhood} ${p.city} ${p.zip ?? ""} ${p.title ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : 0;
      const minBeds = beds ? Number(beds) : 0;
      if (min > 0 && p.price < min) return false;
      if (max > 0 && p.price > max) return false;
      if (minBeds > 0 && (p.bedrooms ?? 0) < minBeds) return false;
      return true;
    });

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [
    activeDataset,
    source,
    category,
    propertyType,
    location,
    minPrice,
    maxPrice,
    beds,
    sort,
  ]);

  const resetFilters = () => {
    setCategory("all");
    setLocation("");
    setPropertyType("all");
    setMinPrice("");
    setMaxPrice("");
    setBeds("");
    setSort("featured");
  };

  return {
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
    filtered,
    resetFilters,
  };
}

