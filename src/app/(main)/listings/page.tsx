import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PropertyCategory, PropertyType } from "@/types/property";
import { getProperties } from "@/lib/properties";
import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata = buildPageMetadata({
  title: "Miami Properties & MLS Listings",
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

  return (
    <>
      <section className="border-b border-sand bg-navy pb-14 pt-32 text-ivory md:pb-16 md:pt-40">
        <PageContainer>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-8 bg-gold" aria-hidden="true" />
                <span>Miami-Dade, Broward &amp; Florida Keys</span>
              </div>
              <h1 className="heading-hero mt-3 text-white">
                Properties &amp; Curated Inventory
              </h1>
              <p className="body-editorial mt-4 max-w-2xl text-ivory/80">
                Explore Move Miami Realty’s active residential, redevelopment,
                and vacation rental portfolio—or toggle over to our South Florida
                MLS IDX feed.
              </p>
            </div>

            <Link
              href="/buy"
              className="inline-flex shrink-0 items-center gap-2 border border-gold/60 bg-navy-light px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-gold transition-colors hover:bg-gold hover:text-navy"
            >
              <span>Request Off-Market Options</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </PageContainer>
      </section>

      <section className="bg-ivory py-12 md:py-16">
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

      <FinalCTA />
    </>
  );
}

