import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Property } from "@/types/property";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface PropertySpotlightProps {
  properties: Property[];
}

export function PropertySpotlight({ properties }: PropertySpotlightProps) {
  const brickellSpotlight = properties.find(
    (p) => p.slug === "skyline-on-brickell-1907"
  );
  const sandlotSpotlight = properties.find(
    (p) => p.slug === "129-nautilus-dr-unit-0-327087"
  );

  return (
    <section className="border-t border-sand bg-navy py-20 text-ivory md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Property Spotlight"
          title="Recent moves, signature stays."
          description="A closer look at what our team is moving—from a Brickell lease that closed off-market in record time to our signature Florida Keys waterfront rental."
          light
        />

        <div className="mt-12 space-y-10">
          {brickellSpotlight && (
            <Reveal>
              <div className="grid grid-cols-1 overflow-hidden border border-white/15 bg-navy-light/50 lg:grid-cols-12">
                <div className="relative aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[380px]">
                  <Image
                    src={brickellSpotlight.coverImage}
                    alt={brickellSpotlight.title ?? brickellSpotlight.address}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between p-8 sm:p-10 lg:col-span-5">
                  <div>
                    <span className="inline-block bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy">
                      {brickellSpotlight.spotlightLabel ?? brickellSpotlight.status}
                    </span>
                    <h3 className="heading-editorial mt-4 text-3xl text-white">
                      {brickellSpotlight.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-[15px] font-medium text-gold">
                      {brickellSpotlight.address} · {brickellSpotlight.bedrooms}{" "}
                      Bedrooms · {brickellSpotlight.bathrooms} Bathrooms ·{" "}
                      {brickellSpotlight.sqft?.toLocaleString()} Sq Ft
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-ivory/80">
                      {brickellSpotlight.summary}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3 border-t border-white/15 pt-6">
                    <Link
                      href={`/properties/${brickellSpotlight.slug}`}
                      className="inline-flex items-center gap-2 bg-gold px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy hover:bg-white"
                    >
                      <span>View Residence Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/sell"
                      className="border border-white/25 px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-white hover:border-gold hover:text-gold"
                    >
                      List With Us
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {sandlotSpotlight && (
            <Reveal delay={0.08}>
              <div className="grid grid-cols-1 overflow-hidden border border-white/15 bg-navy-light/50 lg:grid-cols-12">
                <div className="flex flex-col justify-between p-8 sm:p-10 lg:col-span-5">
                  <div>
                    <span className="inline-block border border-gold/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                      {sandlotSpotlight.spotlightLabel ?? "Signature Rental"} ·{" "}
                      {sandlotSpotlight.priceLabel}
                    </span>
                    <h3 className="heading-editorial mt-4 text-3xl text-white">
                      {sandlotSpotlight.title ?? sandlotSpotlight.address}
                    </h3>
                    <p className="mt-1.5 font-sans text-[15px] font-medium text-ivory/80">
                      {sandlotSpotlight.address}, {sandlotSpotlight.neighborhood},{" "}
                      {sandlotSpotlight.city}
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-ivory/80">
                      {sandlotSpotlight.summary}
                    </p>
                    <ul className="mt-4 space-y-1.5 text-xs text-gold/90">
                      {sandlotSpotlight.highlights?.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3 border-t border-white/15 pt-6">
                    <Link
                      href={`/properties/${sandlotSpotlight.slug}`}
                      className="inline-flex items-center gap-2 bg-white px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy hover:bg-gold"
                    >
                      <span>Check Availability</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/listings?category=vacation-rental"
                      className="border border-white/25 px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-white hover:border-gold hover:text-gold"
                    >
                      All Vacation Rentals
                    </Link>
                  </div>
                </div>

                <div className="relative aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[380px]">
                  <Image
                    src={sandlotSpotlight.coverImage}
                    alt={sandlotSpotlight.title ?? sandlotSpotlight.address}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

