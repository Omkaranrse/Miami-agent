import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { PropertyCategory, PropertyType } from "@/types/property";
import { getProperties } from "@/lib/properties";
import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = buildPageMetadata({
  title: "Miami Properties & MLS Listings | Move Miami Realtor",
  description:
    "Browse curated Move Miami exclusive properties for sale, for rent, and Florida Keys vacation rentals alongside live South Florida MLS inventory.",
  path: "/listings",
});

type SearchParamsInput = Promise<{
  location?: string;
  q?: string;
  category?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
}>;

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: SearchParamsInput;
}) {
  const resolved = await searchParams;

  const [portfolioProperties, mlsProperties] = await Promise.all([
    getProperties({ source: "portfolio" }),
    getProperties({ source: "mls" }),
  ]);

  const rawLocation = resolved.location ?? resolved.q ?? "";
  const rawCategory = (resolved.category ?? "all") as PropertyCategory | "all";
  const rawType = (resolved.type ?? "all") as PropertyType | "all";

  const totalCount = portfolioProperties.length;

  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. Luxury Twilight / Lavender Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F7F3FF_0%,#F1EBFF_52%,#EDE5FA_100%)] pb-12 pt-32 sm:pb-16 sm:pt-36 md:pt-40">
        {/* Ambient Subtle Lighting Halos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-32 top-8 h-[460px] w-[460px] rounded-full bg-white/70 blur-3xl" />
          <div className="absolute right-[-8%] top-16 h-[460px] w-[460px] rounded-full bg-[#C2A3FF]/25 blur-3xl" />
          <div className="absolute left-1/2 top-40 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#7C52EB]/10 blur-3xl" />
        </div>

        <PageContainer className="relative z-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <Reveal variant="fade-up" className="max-w-3xl">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E4D7FF] bg-white/80 px-4 py-1.5 shadow-xs backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#5B2EC6]" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#4C2B9A]">
                  Miami Real Estate Collection
                </span>
                <span className="ml-1 rounded-full bg-[#F0E8FF] px-2 py-0.5 text-[10.5px] font-bold text-[#5B2EC6]">
                  {totalCount} Curated
                </span>
              </div>

              {/* Main Heading with Editorial Accent */}
              <h1 className="mt-5 font-sans text-4xl font-extrabold tracking-tight text-[#160B30] sm:text-5xl lg:text-6xl">
                Find Your Place in{" "}
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#321477] via-[#5B2EC6] to-[#7C52EB]">
                  Miami.
                </span>
              </h1>

              {/* Supporting Editorial Paragraph */}
              <p className="mt-4 max-w-2xl font-sans text-[16px] leading-relaxed text-[#51476E] sm:text-[17px]">
                Explore thoughtfully selected properties across Miami-Dade and
                Broward—from waterfront estates and luxury condominiums to
                exclusive off-market opportunities.
              </p>
            </Reveal>

            {/* Request Off-Market Action */}
            <Reveal variant="fade-up" delay={0.15} className="flex shrink-0 items-center gap-3">
              <Link
                href="/buy"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#321477] via-[#5B2EC6] to-[#7C52EB] px-6 py-3.5 font-sans text-[14px] font-bold text-white shadow-[0_12px_28px_-6px_rgba(91,46,198,0.45)] transition-all hover:shadow-[0_16px_32px_-6px_rgba(91,46,198,0.6)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="h-4 w-4 text-[#E3D4FF] transition-transform group-hover:rotate-12" />
                <span>Request Off-Market Options</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </PageContainer>
      </section>

      {/* 2. Listings Filter Bar & Property Grid Canvas */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#EDE5FA_0%,#F4EEFD_12%,#FAF8FF_50%,#FFFFFF_100%)] py-10 md:py-16">
        <PageContainer>
          <PropertyGrid
            portfolioProperties={portfolioProperties}
            mlsProperties={mlsProperties}
            initialLocation={rawLocation}
            initialCategory={rawCategory}
            initialType={rawType}
            initialMinPrice={resolved.minPrice ?? ""}
            initialMaxPrice={resolved.maxPrice ?? ""}
          />
        </PageContainer>
      </section>

      {/* 3. Final Conversion CTA */}
      <FinalCTA />
    </div>
  );
}
