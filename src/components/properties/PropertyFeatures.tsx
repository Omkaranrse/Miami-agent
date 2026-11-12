import Image from "next/image";
import type { Property } from "@/types/property";

export function PropertyFeatures({ property }: { property: Property }) {
  return (
    <>
      {property.highlights && property.highlights.length > 0 && (
        <div className="mt-8 border border-sand bg-white p-8">
          <h3 className="font-sans text-xl font-semibold text-navy">
            Key Highlights
          </h3>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {property.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[15px] text-charcoal/85"
              >
                <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {property.conceptRenderings && property.conceptRenderings.length > 0 && (
        <div className="mt-8 border border-sand bg-white p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
            Architectural Concept Renderings
          </p>
          <h3 className="mt-1 font-sans text-xl font-semibold text-navy">
            Redevelopment &amp; Future Estate Vision
          </h3>
          <p className="mt-2 text-[15px] text-charcoal/75">
            Architectural concept renderings showing the redevelopment scale
            possible on this Pinecrest lot.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {property.conceptRenderings.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[16/10] overflow-hidden border border-sand"
              >
                <Image
                  src={src}
                  alt={`${property.address} architectural concept ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

