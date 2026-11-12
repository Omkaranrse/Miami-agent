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
    <div className="mt-10 border border-sand bg-white p-8">
      <h2 className="font-sans text-2xl font-semibold tracking-tight text-navy">
        Property Overview
      </h2>
      <p className="body-editorial mt-4 text-charcoal/85">
        {property.summary}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-sand pt-6 sm:grid-cols-3">
        <div className="flex items-start gap-3">
          <Building className="mt-0.5 h-4 w-4 text-gold-dark" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
              Type
            </p>
            <p className="text-sm font-medium text-navy">
              {property.propertyType}
            </p>
          </div>
        </div>

        {property.bedrooms !== undefined && (
          <div className="flex items-start gap-3">
            <BedDouble className="mt-0.5 h-4 w-4 text-gold-dark" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                Bedrooms
              </p>
              <p className="text-sm font-medium text-navy">
                {property.bedrooms}
              </p>
            </div>
          </div>
        )}

        {property.bathrooms !== undefined && (
          <div className="flex items-start gap-3">
            <Bath className="mt-0.5 h-4 w-4 text-gold-dark" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                Bathrooms
              </p>
              <p className="text-sm font-medium text-navy">
                {property.bathrooms}
              </p>
            </div>
          </div>
        )}

        {property.sqft !== undefined && (
          <div className="flex items-start gap-3">
            <Maximize2 className="mt-0.5 h-4 w-4 text-gold-dark" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                Living Area
              </p>
              <p className="text-sm font-medium text-navy">
                {property.sqft.toLocaleString()} Sq Ft
              </p>
            </div>
          </div>
        )}

        {property.lotSqft !== undefined && (
          <div className="flex items-start gap-3">
            <Trees className="mt-0.5 h-4 w-4 text-gold-dark" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                Lot Size
              </p>
              <p className="text-sm font-medium text-navy">
                {property.lotSqft.toLocaleString()} Sq Ft
              </p>
            </div>
          </div>
        )}

        {property.yearBuilt !== undefined && (
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-4 w-4 text-gold-dark" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                Year Built
              </p>
              <p className="text-sm font-medium text-navy">
                {property.yearBuilt}
              </p>
            </div>
          </div>
        )}

        {property.hoa && (
          <div className="flex items-start gap-3">
            <Building className="mt-0.5 h-4 w-4 text-gold-dark" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                HOA
              </p>
              <p className="text-sm font-medium text-navy">{property.hoa}</p>
            </div>
          </div>
        )}

        {property.pool !== undefined && (
          <div className="flex items-start gap-3">
            <Waves className="mt-0.5 h-4 w-4 text-gold-dark" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                Pool
              </p>
              <p className="text-sm font-medium text-navy">
                {property.pool ? "Yes" : "No"}
              </p>
            </div>
          </div>
        )}

        {property.parking && (
          <div className="flex items-start gap-3">
            <Car className="mt-0.5 h-4 w-4 text-gold-dark" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                Parking
              </p>
              <p className="text-sm font-medium text-navy">
                {property.parking}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

