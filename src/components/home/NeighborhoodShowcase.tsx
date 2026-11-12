import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { NEIGHBORHOODS } from "@/data/neighborhoods";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function NeighborhoodShowcase() {
  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Neighborhood Discovery"
          title="Miami’s defining enclaves."
          description="Every street carries its own pricing rhythm, school path, and zoning rules. Explore the Miami corridors our clients ask about most."
          actionLabel="Search All Areas"
          actionHref="/listings"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {NEIGHBORHOODS.map((hood, i) => (
            <Reveal key={hood.slug} delay={Math.min(i * 0.04, 0.2)}>
              <Link
                href={`/listings?location=${encodeURIComponent(hood.searchQuery)}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden border border-sand bg-navy"
              >
                <Image
                  src={hood.image}
                  alt={`${hood.name}, Miami real estate`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative z-10 p-6 text-white">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    {hood.areaLabel}
                  </p>
                  <h3 className="mt-1 font-sans text-xl font-semibold tracking-tight">
                    {hood.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[14px] leading-relaxed text-ivory/85">
                    {hood.character}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold tracking-[0.03em] text-gold transition-transform duration-300 group-hover:translate-x-1">
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

