import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Property } from "@/types/property";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PropertyCard } from "@/components/properties/PropertyCard";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="border-b border-sand bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured Portfolio"
          title="Curated Miami & South Florida properties."
          description="Every property we represent is vetted in person by our team—from Pinecrest redevelopment parcels to turnkey Virginia Gardens and Broward residences."
          actionLabel="View All Properties"
          actionHref="/listings"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, idx) => (
            <Reveal key={property.slug} delay={idx * 0.06}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 border border-navy px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy"
          >
            <span>View All Properties</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

