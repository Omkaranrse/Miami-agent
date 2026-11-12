export type PropertyCategory = "for-sale" | "for-rent" | "vacation-rental";

export type PropertyStatus =
  | "Active"
  | "Under Contract"
  | "Price Reduced"
  | "Just Leased"
  | "Sold";

export type PropertyType =
  | "Single Family"
  | "Condo"
  | "Townhouse"
  | "Multi-Family"
  | "Land";

export type DataSource = "move-miami-portfolio" | "mls-idx-feed";

export interface Property {
  slug: string;
  address: string;
  unit?: string;
  title?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip?: string;
  category: PropertyCategory;
  status: PropertyStatus;
  propertyType: PropertyType;
  price: number;
  priceLabel: string;
  pricePerSqft?: number;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  lotSqft?: number;
  yearBuilt?: number;
  hoa?: string;
  parking?: string;
  pool?: boolean;
  photoCount: number;
  coverImage: string;
  gallery: string[];
  conceptRenderings?: string[];
  highlights?: string[];
  summary: string;
  featured?: boolean;
  spotlight?: boolean;
  spotlightLabel?: string;
  dataSource: DataSource;
  mlsAttribution?: string;
}

export interface Neighborhood {
  slug: string;
  name: string;
  areaLabel: string;
  summary: string;
  character: string;
  image: string;
  searchQuery: string;
}

export interface PropertyFilterState {
  source: "portfolio" | "mls";
  category: PropertyCategory | "all";
  location: string;
  propertyType: PropertyType | "all";
  minPrice: string;
  maxPrice: string;
  beds: string;
  sort: "featured" | "price-asc" | "price-desc";
}

