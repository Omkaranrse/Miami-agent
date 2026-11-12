import { Instagram, ArrowUpRight } from "lucide-react";
import { INSTAGRAM_REELS } from "@/data/videos";
import { BROKERAGE_INFO } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InstagramFeed() {
  return (
    <section className="border-t border-sand bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`Instagram · ${BROKERAGE_INFO.social.instagramHandle}`}
          title="On-site tours and realtor vs. attorney perspectives."
          actionLabel={`Follow ${BROKERAGE_INFO.social.instagramHandle}`}
          actionHref={BROKERAGE_INFO.social.instagram}
        />

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {INSTAGRAM_REELS.map((reel) => (
            <div
              key={reel.id}
              className="flex flex-col justify-between border border-sand bg-ivory"
            >
              <div className="aspect-[4/5] w-full overflow-hidden border-b border-sand bg-white">
                <iframe
                  src={reel.embedUrl}
                  title={reel.title}
                  loading="lazy"
                  className="h-full w-full border-0"
                />
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <p className="font-sans text-[15px] font-semibold text-navy">
                  {reel.title}
                </p>
                <a
                  href={reel.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${reel.title} on Instagram`}
                  className="inline-flex shrink-0 items-center gap-1 font-sans text-[14px] font-semibold tracking-[0.03em] text-gold-dark hover:text-navy"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

