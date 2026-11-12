import { getArticles } from "@/lib/articles";
import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { ArticleGrid } from "@/components/content/ArticleGrid";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata = buildPageMetadata({
  title: "Miami Real Estate Updates & Guides",
  description:
    "Read Miami-Dade market snapshots, international buyer guides, Coral Gables and Pinecrest updates, and Florida probate real estate commentary from Move Miami.",
  path: "/updates-news",
});

export default async function UpdatesNewsPage() {
  const articles = await getArticles();

  return (
    <>
      <section className="border-b border-sand bg-ivory pb-14 pt-32 md:pb-16 md:pt-40">
        <PageContainer>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <span>Move Miami Editorial</span>
            </div>
            <h1 className="heading-hero mt-3 text-navy">
              Updates, Market Snapshots &amp; Guides
            </h1>
            <p className="body-editorial mt-4 max-w-2xl text-charcoal/80">
              Neighborhood inventory tracking across Coral Gables, Pinecrest,
              South Miami, and Miami Beach alongside cross-border and legal
              real estate guides.
            </p>
          </div>
        </PageContainer>
      </section>

      <section className="bg-white py-12 md:py-20">
        <PageContainer>
          <ArticleGrid articles={articles} />
        </PageContainer>
      </section>

      <FinalCTA />
    </>
  );
}

