import {
  MLS_IDX_SAMPLE_LISTINGS,
  PORTFOLIO_PROPERTIES,
} from "@/data/properties";
import type { Property, PropertyCategory, PropertyType } from "@/types/property";

export interface PropertyFilterParams {
  source?: "portfolio" | "mls" | "all";
  category?: PropertyCategory | "all";
  location?: string;
  propertyType?: PropertyType | "all";
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  sort?: "featured" | "price-asc" | "price-desc" | "newest";
}

/**
 * Extensible async property repository.
 * Designed so an external RESO/MLS IDX feed or CMS backend can plug directly
 * behind these async functions without modifying UI components.
 */
export async function getProperties(
  filters: PropertyFilterParams = {}
): Promise<Property[]> {
  const {
    source = "portfolio",
    category = "all",
    location,
    propertyType = "all",
    minPrice,
    maxPrice,
    beds,
    baths,
    sort = "featured",
  } = filters;

  let dataset: Property[] = [];
  if (source === "portfolio") {
    dataset = PORTFOLIO_PROPERTIES.filter((p) => p.status !== "Just Leased");
  } else if (source === "mls") {
    dataset = [...MLS_IDX_SAMPLE_LISTINGS];
  } else {
    dataset = [
      ...PORTFOLIO_PROPERTIES.filter((p) => p.status !== "Just Leased"),
      ...MLS_IDX_SAMPLE_LISTINGS,
    ];
  }

  let filtered = dataset.filter((property) => {
    if (category !== "all" && property.category !== category) return false;
    if (propertyType !== "all" && property.propertyType !== propertyType)
      return false;
    if (location && location.trim().length > 0) {
      const q = location.trim().toLowerCase();
      const hay =
        `${property.address} ${property.neighborhood} ${property.city} ${property.zip ?? ""} ${property.title ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (typeof minPrice === "number" && minPrice > 0 && property.price < minPrice)
      return false;
    if (typeof maxPrice === "number" && maxPrice > 0 && property.price > maxPrice)
      return false;
    if (typeof beds === "number" && beds > 0 && (property.bedrooms ?? 0) < beds)
      return false;
    if (
      typeof baths === "number" &&
      baths > 0 &&
      (property.bathrooms ?? 0) < baths
    )
      return false;
    return true;
  });

  if (sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sort === "newest") {
    filtered = [...filtered].sort(
      (a, b) => (b.yearBuilt ?? 0) - (a.yearBuilt ?? 0)
    );
  }

  return filtered;
}

export async function getFeaturedProperties(): Promise<Property[]> {
  return PORTFOLIO_PROPERTIES.filter((p) => p.featured);
}

export async function getSpotlightProperties(): Promise<Property[]> {
  return PORTFOLIO_PROPERTIES.filter((p) => p.spotlight);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const all = [...PORTFOLIO_PROPERTIES, ...MLS_IDX_SAMPLE_LISTINGS];
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getAllPropertySlugs(): Promise<string[]> {
  return [...PORTFOLIO_PROPERTIES, ...MLS_IDX_SAMPLE_LISTINGS].map(
    (p) => p.slug
  );
}

