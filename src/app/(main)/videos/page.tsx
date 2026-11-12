import Link from "next/link";
import { ArrowRight, Youtube } from "lucide-react";
import { YOUTUBE_VIDEOS } from "@/data/videos";
import { ARTICLES } from "@/data/articles";
import { BROKERAGE_INFO } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceHero } from "@/components/services/ServiceHero";
import { VideoGrid } from "@/components/content/VideoGrid";
import { ArticleCard } from "@/components/content/ArticleCard";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata = buildPageMetadata({
  title: "Miami Estate Tours & Real Estate Videos",
  description:
    "Watch Miami architectural estate tours, pre-approval walkthroughs, and legal real estate commentary from Move Miami Realty on YouTube and Instagram.",
  path: "/videos",
});

export default function VideosPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Move Miami Media"
        title="Estate tours & straight market talk."
        description="Inside Galloway Glen new construction, Coral Gables and Hammocks walkthroughs, buyer pre-approval episodes, and legal real estate briefings with Victor A. Ruiz, Esq."
        image="/images/videos/video-poster.jpg"
        imageAlt="Move Miami Realtor video production and luxury architectural estate tour"
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={BROKERAGE_INFO.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy transition-colors hover:bg-white"
          >
            <Youtube className="h-4 w-4" />
            <span>Subscribe {BROKERAGE_INFO.social.youtubeHandle}</span>
          </a>
          <Link
            href="/updates-news"
            className="inline-flex items-center gap-2 border border-white/30 px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-white transition-colors hover:border-gold hover:text-gold"
          >
            <span>Read Market Guides</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </ServiceHero>

      <section className="border-b border-sand bg-ivory py-16 md:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="YouTube Library"
            title="Watch full tours & episodes inline."
            description="Filter by category below and click any thumbnail to play directly inside the theater modal."
          />

          <div className="mt-10">
            <VideoGrid videos={YOUTUBE_VIDEOS} />
          </div>
        </PageContainer>
      </section>

      <InstagramFeed />

      <section className="border-t border-sand bg-ivory py-16 md:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Written Briefings"
            title="Recent Miami guides & market updates."
            actionLabel="View All Updates"
            actionHref="/updates-news"
          />

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {ARTICLES.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </PageContainer>
      </section>

      <FinalCTA />
    </>
  );
}

