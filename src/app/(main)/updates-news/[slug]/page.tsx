import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getArticles,
} from "@/lib/articles";
import { BROKERAGE_INFO } from "@/lib/constants";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleContent } from "@/components/content/ArticleContent";
import { ArticleCard } from "@/components/content/ArticleCard";
import { FinalCTA } from "@/components/home/FinalCTA";

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | ${BROKERAGE_INFO.brandName}`,
      description: article.excerpt,
      images: [{ url: article.image }],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = await getArticles();
  const related = allArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="bg-ivory pt-28">
      <div className="border-b border-sand bg-white py-4">
        <PageContainer className="flex flex-wrap items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Updates & Guides", href: "/updates-news" },
              { label: article.category },
            ]}
          />
          <Link
            href="/updates-news"
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold tracking-[0.03em] text-navy hover:text-gold-dark"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Updates</span>
          </Link>
        </PageContainer>
      </div>

      <section className="bg-white py-12 md:py-16">
        <PageContainer>
          <ArticleContent article={article} />
        </PageContainer>
      </section>

      <section className="border-t border-sand bg-ivory py-16 md:py-20">
        <PageContainer>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Keep Reading
              </p>
              <h2 className="heading-section mt-2 text-navy">
                More from Move Miami.
              </h2>
            </div>
            <Link
              href="/updates-news"
              className="font-sans text-[14px] font-semibold tracking-[0.03em] text-navy underline underline-offset-4 hover:text-gold-dark"
            >
              All Updates
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </PageContainer>
      </section>

      <FinalCTA />
    </div>
  );
}

