import {
  BedDouble,
  Bath,
  Maximize2,
  Trees,
  Calendar,
  Car,
  Waves,
  Building,
} from "lucide-react";
import type { Property } from "@/types/property";

export function PropertyDetails({ property }: { property: Property }) {
  return (
    <div className="mt-8 rounded-[28px] border border-white/90 bg-white/90 p-7 shadow-[0_20px_50px_-16px_rgba(52,30,114,0.12)] backdrop-blur-md sm:p-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#E4D7FF] bg-[#F3ECFF] px-3.5 py-1.5">
        <Building className="h-3.5 w-3.5 text-[#5B2EC6]" />
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#4C2B9A]">
          Property Overview
        </span>
      </div>

      <h2 className="mt-4 font-sans text-2xl font-bold tracking-tight text-[#160B30] sm:text-[28px]">
        Residence &amp; Architectural Specifications
      </h2>

      <p className="mt-3 font-sans text-[15.5px] leading-relaxed text-[#51476E]">
        {property.summary}
      </p>

      {/* Specifications Grid */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {/* Property Type */}
        <div className="flex items-center gap-3.5 rounded-2xl border border-[#E5DBFB]/70 bg-white/70 p-3.5 shadow-2xs backdrop-blur-xs transition-colors hover:border-[#7C52EB]/40 hover:bg-white">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3ECFF] text-[#5B2EC6]">
            <Building className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8B7CA8]">
              Type
            </p>
            <p className="truncate font-sans text-[14px] font-bold text-[#160B30]">
              {property.propertyType}
            </p>
          </div>
        </div>

        {/* Bedrooms */}
        {property.bedrooms !== undefined && (
          <div className="flex items-center gap-3.5 rounded-2xl border border-[#E5DBFB]/70 bg-white/70 p-3.5 shadow-2xs backdrop-blur-xs transition-colors hover:border-[#7C52EB]/40 hover:bg-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3ECFF] text-[#5B2EC6]">
              <BedDouble className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8B7CA8]">
                Bedrooms
              </p>
              <p className="truncate font-sans text-[14px] font-bold text-[#160B30]">
                {property.bedrooms} Beds
              </p>
            </div>
          </div>
        )}

        {/* Bathrooms */}
        {property.bathrooms !== undefined && (
          <div className="flex items-center gap-3.5 rounded-2xl border border-[#E5DBFB]/70 bg-white/70 p-3.5 shadow-2xs backdrop-blur-xs transition-colors hover:border-[#7C52EB]/40 hover:bg-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3ECFF] text-[#5B2EC6]">
              <Bath className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8B7CA8]">
                Bathrooms
              </p>
              <p className="truncate font-sans text-[14px] font-bold text-[#160B30]">
                {property.bathrooms} Baths
              </p>
            </div>
          </div>
        )}

        {/* Living Area */}
        {property.sqft !== undefined && (
          <div className="flex items-center gap-3.5 rounded-2xl border border-[#E5DBFB]/70 bg-white/70 p-3.5 shadow-2xs backdrop-blur-xs transition-colors hover:border-[#7C52EB]/40 hover:bg-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3ECFF] text-[#5B2EC6]">
              <Maximize2 className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8B7CA8]">
                Living Area
              </p>
              <p className="truncate font-sans text-[14px] font-bold text-[#160B30]">
                {property.sqft.toLocaleString()} Sq Ft
              </p>
            </div>
          </div>
        )}

        {/* Lot Size */}
        {property.lotSqft !== undefined && (
          <div className="flex items-center gap-3.5 rounded-2xl border border-[#E5DBFB]/70 bg-white/70 p-3.5 shadow-2xs backdrop-blur-xs transition-colors hover:border-[#7C52EB]/40 hover:bg-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3ECFF] text-[#5B2EC6]">
              <Trees className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8B7CA8]">
                Lot Size
              </p>
              <p className="truncate font-sans text-[14px] font-bold text-[#160B30]">
                {property.lotSqft.toLocaleString()} Sq Ft
              </p>
            </div>
          </div>
        )}

        {/* Year Built */}
        {property.yearBuilt !== undefined && (
          <div className="flex items-center gap-3.5 rounded-2xl border border-[#E5DBFB]/70 bg-white/70 p-3.5 shadow-2xs backdrop-blur-xs transition-colors hover:border-[#7C52EB]/40 hover:bg-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3ECFF] text-[#5B2EC6]">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8B7CA8]">
                Year Built
              </p>
              <p className="truncate font-sans text-[14px] font-bold text-[#160B30]">
                {property.yearBuilt}
              </p>
            </div>
          </div>
        )}

        {/* HOA */}
        {property.hoa && (
          <div className="flex items-center gap-3.5 rounded-2xl border border-[#E5DBFB]/70 bg-white/70 p-3.5 shadow-2xs backdrop-blur-xs transition-colors hover:border-[#7C52EB]/40 hover:bg-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3ECFF] text-[#5B2EC6]">
              <Building className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8B7CA8]">
                HOA
              </p>
              <p className="truncate font-sans text-[14px] font-bold text-[#160B30]">
                {property.hoa}
              </p>
            </div>
          </div>
        )}

        {/* Pool */}
        {property.pool !== undefined && (
          <div className="flex items-center gap-3.5 rounded-2xl border border-[#E5DBFB]/70 bg-white/70 p-3.5 shadow-2xs backdrop-blur-xs transition-colors hover:border-[#7C52EB]/40 hover:bg-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3ECFF] text-[#5B2EC6]">
              <Waves className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8B7CA8]">
                Private Pool
              </p>
              <p className="truncate font-sans text-[14px] font-bold text-[#160B30]">
                {property.pool ? "Yes" : "None"}
              </p>
            </div>
          </div>
        )}

        {/* Parking */}
        {property.parking && (
          <div className="flex items-center gap-3.5 rounded-2xl border border-[#E5DBFB]/70 bg-white/70 p-3.5 shadow-2xs backdrop-blur-xs transition-colors hover:border-[#7C52EB]/40 hover:bg-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3ECFF] text-[#5B2EC6]">
              <Car className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8B7CA8]">
                Parking
              </p>
              <p className="truncate font-sans text-[14px] font-bold text-[#160B30]">
                {property.parking}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
