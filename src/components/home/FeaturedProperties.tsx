import { ArrowRight } from "lucide-react";
import type { Property } from "@/types/property";
import { Reveal } from "@/components/ui/Reveal";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#DCD0FA] bg-[linear-gradient(135deg,#F3EFFF_0%,#E1D4FF_48%,#CEBCFF_100%)] py-20 md:py-24">
      {/* Diagonal Soft Luminous Wave Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 0 H1180 C1020 260 660 470 0 650 Z"
            fill="rgba(255, 255, 255, 0.34)"
          />
          <path
            d="M0 640 C480 510 920 300 1210 0"
            stroke="rgba(255, 255, 255, 0.55)"
            strokeWidth="2"
          />
        </svg>

        {/* Top-Right Translucent Palm Fronds */}
        <svg
          viewBox="0 0 260 220"
          fill="none"
          className="absolute -right-6 -top-4 h-56 w-64 text-[#7E52EB]/25"
        >
          <path
            d="M170 0 C150 42 128 82 95 122 M175 0 C168 50 154 96 132 142 M182 0 C186 52 182 104 170 152 M190 0 C205 46 212 96 208 148 M198 0 C222 36 238 78 244 126 M165 5 C132 32 96 52 54 68 M170 12 C136 52 102 82 64 106 M178 18 C154 66 130 108 100 148"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3.5">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#4C2B9A]">
                Featured Properties
              </span>
              <span
                className="h-px w-24 bg-gradient-to-r from-[#5D36C6] to-transparent"
                aria-hidden="true"
              />
            </div>

            <h2 className="heading-section mt-3 text-[#21124B]">
              The Latest From Our
              <br />
              <span className="bg-gradient-to-r from-[#5D34CB] via-[#7E52EB] to-[#A47BFF] bg-clip-text italic text-transparent">
                Portfolio.
              </span>
            </h2>

            <p className="body-editorial mt-3.5 max-w-lg text-[#45396B]">
              A look at the standout homes on the market with our team right now.
              <br className="hidden sm:inline" /> The full set lives on our
              listings page.
            </p>
          </div>

          <div className="shrink-0">
            <FluidGlassButton href="/listings" className="px-7 py-3.5 text-[14px]">
              <span>View All Listings</span>
              <ArrowRight className="h-4 w-4" />
            </FluidGlassButton>
          </div>
        </div>

        {/* 3-Card Portfolio Grid */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, idx) => (
            <Reveal key={property.slug} delay={idx * 0.06} className="h-full">
              <PropertyCard property={property} highlighted={idx === 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
