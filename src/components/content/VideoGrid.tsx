"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { VideoItem } from "@/types/video";
import { Modal } from "@/components/ui/Modal";
import { VideoCard } from "./VideoCard";

const VIDEO_CATEGORIES = [
  "All",
  "Estate Tours",
  "Market Updates",
  "Buyer & Seller Guides",
  "Law & Real Estate",
] as const;

export function VideoGrid({ videos }: { videos: VideoItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const visible =
    selectedCategory === "All"
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-sand pb-6">
        {VIDEO_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 font-sans text-[14px] font-semibold tracking-[0.02em] transition-colors ${
              selectedCategory === category
                ? "bg-navy text-white"
                : "border border-sand bg-white text-charcoal hover:border-navy"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((video) => (
          <VideoCard key={video.id} video={video} onSelect={setActiveVideo} />
        ))}
      </div>

      <Modal
        open={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        eyebrow={
          activeVideo ? `${activeVideo.category} · ${activeVideo.publishedAt}` : undefined
        }
        title={activeVideo?.title}
      >
        {activeVideo && (
          <>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
            <div className="flex items-center justify-between px-5 py-3 text-xs text-ivory/75">
              <span>{activeVideo.views}</span>
              <a
                href={activeVideo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.14em] text-gold hover:text-white"
              >
                <span>Open on YouTube</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

