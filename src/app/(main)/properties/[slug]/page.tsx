import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import {
  getAllPropertySlugs,
  getProperties,
  getPropertyBySlug,
} from "@/lib/properties";
import { BROKERAGE_INFO } from "@/lib/constants";
import { PageContainer } from "@/components/layout/PageContainer";
import { BackPill, Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PropertyStatus } from "@/components/properties/PropertyStatus";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertyDetails } from "@/components/properties/PropertyDetails";
import { PropertyFeatures } from "@/components/properties/PropertyFeatures";
import { PropertyInquiry } from "@/components/properties/PropertyInquiry";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { Reveal } from "@/components/ui/Reveal";

export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.address} — ${property.priceLabel} | Move Miami Realtor`,
    description: `${property.address} in ${property.neighborhood}, ${property.city}. ${property.summary}`,
    openGraph: {
      title: `${property.address} — ${property.priceLabel} | ${BROKERAGE_INFO.brandName}`,
      description: property.summary,
      images: [{ url: property.coverImage }],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const allPortfolio = await getProperties({ source: "portfolio" });
  const related = allPortfolio
    .filter((p) => p.slug !== property.slug)
    .slice(0, 3);

  return (
    <div className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#F8F5FF_0%,#F3EDFC_45%,#EDE5FA_100%)]">
      {/* Ambient Lighting Halos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 top-20 h-[520px] w-[520px] rounded-full bg-white/70 blur-3xl" />
        <div className="absolute right-[-10%] top-40 h-[500px] w-[500px] rounded-full bg-[#C2A3FF]/20 blur-3xl" />
        <div className="absolute left-1/3 top-[800px] h-[400px] w-[400px] rounded-full bg-[#7C52EB]/10 blur-3xl" />
      </div>

      {/* Top Floating Navigation Bar */}
      <div className="relative z-10 pt-28 sm:pt-32 pb-4">
        <PageContainer className="flex flex-wrap items-center justify-between gap-4">
          <BackPill href="/listings" label="Back to All Listings" />
          <div className="hidden md:block">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Listings", href: "/listings" },
                { label: property.address },
              ]}
            />
          </div>
        </PageContainer>
      </div>

      {/* Header & Two-Column Detail View */}
      <section className="relative z-10 pb-16 pt-2 md:pb-24">
        <PageContainer>
          {/* Main Property Headline Banner */}
          <Reveal variant="fade-up" className="mb-8 flex flex-col justify-between gap-6 border-b border-[#E5DBFB]/80 pb-8 lg:flex-row lg:items-end">
            <div>
              <PropertyStatus
                status={property.status}
                category={property.category}
              />

              <h1 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-[#160B30] sm:text-4xl lg:text-[44px]">
                {property.title
                  ? `${property.title} · ${property.address}`
                  : property.address}
              </h1>

              <div className="mt-2.5 flex items-center gap-2 font-sans text-base text-[#51476E]">
                <MapPin className="h-4 w-4 shrink-0 text-[#7C52EB]" />
                <span>
                  {property.neighborhood}, {property.city}, {property.state}
                  {property.zip ? ` ${property.zip}` : ""}
                </span>
              </div>
            </div>

            <div className="lg:text-right">
              <p className="font-sans text-3xl font-extrabold tracking-tight text-[#160B30] sm:text-4xl lg:text-5xl">
                {property.priceLabel}
              </p>
              {property.pricePerSqft !== undefined && (
                <p className="mt-1.5 font-sans text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#5B2EC6]">
                  ${property.pricePerSqft.toLocaleString()} / SQ FT
                </p>
              )}
            </div>
          </Reveal>

          {/* Grid Layout: Left Content, Right Inquiry Desk */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Column: Gallery, Overview Details, Features, Renderings & MLS Disclosure */}
            <div className="lg:col-span-7">
              <Reveal variant="fade-up" delay={0.08}>
                <PropertyGallery
                  images={property.gallery}
                  address={property.address}
                />
              </Reveal>

              <Reveal variant="fade-up" delay={0.12}>
                <PropertyDetails property={property} />
              </Reveal>

              <Reveal variant="fade-up" delay={0.16}>
                <PropertyFeatures property={property} />
              </Reveal>

              {property.dataSource === "mls-idx-feed" && (
                <div className="mt-8 rounded-[24px] border border-[#E5DBFB] bg-white/80 p-6 text-xs leading-relaxed text-[#51476E] shadow-sm backdrop-blur-md">
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#160B30]">
                    South Florida MLS IDX Disclosure
                  </p>
                  <p className="mt-2 font-sans text-[12px] leading-relaxed text-[#51476E]">
                    Listing courtesy of participating MIAMI REALTORS® broker.
                    Information is deemed reliable but not guaranteed and
                    provided exclusively for prospective buyers’ personal,
                    non-commercial use.
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Direct Property Desk */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <Reveal variant="fade-up" delay={0.14}>
                  <PropertyInquiry property={property} />
                </Reveal>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Related Portfolio Listings */}
      <section className="relative z-10 border-t border-[#E5DBFB]/70 bg-white/90 py-16 backdrop-blur-md md:py-24">
        <PageContainer>
          <Reveal variant="fade-up" className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E4D7FF] bg-[#F3ECFF] px-3.5 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#5B2EC6]" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#4C2B9A]">
                  More Curated Residences
                </span>
              </div>
              <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-[#160B30] sm:text-4xl">
                Explore the Rest of Our Portfolio
              </h2>
            </div>

            <Link
              href="/listings"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E5DBFB] bg-white px-5 py-2.5 font-sans text-[13.5px] font-bold text-[#321477] shadow-xs transition-all hover:border-[#7C52EB] hover:bg-[#FAF8FF]"
            >
              <span>See All Listings</span>
              <ArrowRight className="h-4 w-4 text-[#7C52EB]" />
            </Link>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, idx) => (
              <Reveal key={item.slug} delay={idx * 0.08} variant="fade-up" distance={16}>
                <PropertyCard property={item} />
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
