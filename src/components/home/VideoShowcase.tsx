import Link from "next/link";
import Image from "next/image";
import { Play, Youtube, ArrowUpRight, ArrowRight } from "lucide-react";
import { YOUTUBE_VIDEOS } from "@/data/videos";
import { BROKERAGE_INFO } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function VideoShowcase() {
  const featured = YOUTUBE_VIDEOS.slice(0, 3);

  return (
    <section className="border-t border-sand bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Media & Tours"
          title="Inside Miami estates and market reality."
          description="Property walkthroughs, legal insights, and on-the-ground corridor briefings from Move Miami on YouTube."
          actionLabel="Watch All Videos"
          actionHref="/videos"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {featured.map((video) => (
            <a
              key={video.id}
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col border border-sand bg-white"
            >
              <div className="relative aspect-video overflow-hidden bg-navy">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/25 transition-colors group-hover:bg-navy/40" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center bg-gold text-navy transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 h-5 w-5 fill-current" />
                  </span>
                </span>
                <span className="absolute left-3 top-3 bg-navy/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                  {video.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {video.publishedAt} · {video.views}
                  </p>
                  <h3 className="mt-2 font-sans text-lg font-semibold leading-snug text-navy">
                    {video.title}
                  </h3>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold tracking-[0.03em] text-navy">
                  <Youtube className="h-3.5 w-3.5 text-gold-dark" />
                  <span>Watch on YouTube</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-sand pt-6 text-[14px]">
          <a
            href={BROKERAGE_INFO.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans font-semibold tracking-[0.03em] text-navy hover:text-gold-dark"
          >
            <Youtube className="h-4 w-4 text-gold-dark" />
            <span>Subscribe {BROKERAGE_INFO.social.youtubeHandle}</span>
          </a>
          <Link
            href="/updates-news"
            className="inline-flex items-center gap-1.5 font-sans font-semibold tracking-[0.03em] text-navy hover:text-gold-dark"
          >
            <span>Read Market Updates &amp; Guides</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

