import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BedDouble, Bath, Maximize2 } from "lucide-react";
import type { Property } from "@/types/property";
import { PropertyStatus } from "./PropertyStatus";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="group flex flex-col border border-sand bg-white transition-all duration-300 hover:border-gold">
      <Link
        href={`/properties/${property.slug}`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-sand-light"
      >
        <Image
          src={property.coverImage}
          alt={`${property.address} in ${property.neighborhood}, ${property.city}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 top-0 p-4">
          <PropertyStatus status={property.status} category={property.category} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-sans text-2xl font-bold tracking-tight text-navy">
              {property.priceLabel}
            </p>
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              {property.propertyType}
            </span>
          </div>

          <h3 className="mt-2 font-sans text-lg font-semibold leading-snug text-charcoal transition-colors group-hover:text-navy">
            <Link href={`/properties/${property.slug}`}>
              {property.title
                ? `${property.title} — ${property.address}`
                : property.address}
            </Link>
          </h3>

          <p className="mt-1 text-sm text-muted">
            {property.neighborhood}, {property.city}
          </p>

          {(property.bedrooms || property.bathrooms || property.sqft) && (
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-sand/70 pt-4 text-xs font-medium text-charcoal/80">
              {property.bedrooms !== undefined && (
                <span className="inline-flex items-center gap-1.5">
                  <BedDouble className="h-3.5 w-3.5 text-gold-dark" />
                  <span>{property.bedrooms} Bd</span>
                </span>
              )}
              {property.bathrooms !== undefined && (
                <span className="inline-flex items-center gap-1.5">
                  <Bath className="h-3.5 w-3.5 text-gold-dark" />
                  <span>{property.bathrooms} Ba</span>
                </span>
              )}
              {property.sqft !== undefined && (
                <span className="inline-flex items-center gap-1.5">
                  <Maximize2 className="h-3.5 w-3.5 text-gold-dark" />
                  <span>{property.sqft.toLocaleString()} Sq Ft</span>
                </span>
              )}
            </div>
          )}

          {!property.bedrooms && !property.sqft && property.highlights?.[0] && (
            <div className="mt-4 border-t border-sand/70 pt-4 text-xs font-medium text-charcoal/80">
              {property.highlights.slice(0, 2).join(" · ")}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-sand/50 pt-4">
          <span className="text-[11px] uppercase tracking-[0.12em] text-muted">
            {property.mlsAttribution
              ? property.mlsAttribution
              : `${property.photoCount} Photos`}
          </span>
          <Link
            href={`/properties/${property.slug}`}
            className="inline-flex items-center gap-1 font-sans text-[14px] font-semibold tracking-[0.03em] text-navy transition-colors hover:text-gold-dark"
          >
            <span>View Property</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
