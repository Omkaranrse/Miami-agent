import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getAllPropertySlugs,
  getProperties,
  getPropertyBySlug,
} from "@/lib/properties";
import { BROKERAGE_INFO } from "@/lib/constants";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PropertyStatus } from "@/components/properties/PropertyStatus";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertyDetails } from "@/components/properties/PropertyDetails";
import { PropertyFeatures } from "@/components/properties/PropertyFeatures";
import { PropertyInquiry } from "@/components/properties/PropertyInquiry";
import { PropertyCard } from "@/components/properties/PropertyCard";

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
    title: `${property.address} — ${property.priceLabel}`,
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
    <div className="bg-ivory pt-28">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-sand bg-white py-4">
        <PageContainer className="flex flex-wrap items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Properties", href: "/listings" },
              { label: property.address },
            ]}
          />
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold tracking-[0.03em] text-navy hover:text-gold-dark"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Listings</span>
          </Link>
        </PageContainer>
      </div>

      {/* Header & Two-Column Detail View */}
      <section className="py-10 md:py-14">
        <PageContainer>
          <div className="mb-8 flex flex-col justify-between gap-6 border-b border-sand pb-8 lg:flex-row lg:items-end">
            <div>
              <div className="max-w-xs">
                <PropertyStatus
                  status={property.status}
                  category={property.category}
                />
              </div>

              <h1 className="mt-4 font-sans text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[42px]">
                {property.title
                  ? `${property.title} · ${property.address}`
                  : property.address}
              </h1>
              <p className="mt-2 font-sans text-base text-muted">
                {property.neighborhood}, {property.city}, {property.state}
                {property.zip ? ` ${property.zip}` : ""}
              </p>
            </div>

            <div className="lg:text-right">
              <p className="font-sans text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                {property.priceLabel}
              </p>
              {property.pricePerSqft !== undefined && (
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  ${property.pricePerSqft.toLocaleString()} / sq ft
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Column: Gallery, Details, Highlights & Concepts */}
            <div className="lg:col-span-7">
              <PropertyGallery
                images={property.gallery}
                address={property.address}
              />

              <PropertyDetails property={property} />
              <PropertyFeatures property={property} />

              {property.dataSource === "mls-idx-feed" && (
                <div className="mt-8 border border-sand bg-white p-6 text-xs leading-relaxed text-muted">
                  <p className="font-semibold uppercase tracking-[0.14em] text-navy">
                    South Florida MLS IDX Disclosure
                  </p>
                  <p className="mt-2">
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
                <PropertyInquiry property={property} />
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Related Listings */}
      <section className="border-t border-sand bg-white py-16 md:py-20">
        <PageContainer>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                More Listings
              </p>
              <h2 className="heading-section mt-2 text-navy">
                Explore the rest of our portfolio.
              </h2>
            </div>
            <Link
              href="/listings"
              className="font-sans text-[14px] font-semibold tracking-[0.03em] text-navy underline underline-offset-4 hover:text-gold-dark"
            >
              See All Listings
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {related.map((item) => (
              <PropertyCard key={item.slug} property={item} />
            ))}
          </div>
        </PageContainer>
      </section>
    </div>
  );
}

