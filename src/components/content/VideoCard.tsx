import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import type { VideoItem } from "@/types/video";

interface VideoCardProps {
  video: VideoItem;
  onSelect: (video: VideoItem) => void;
}

export function VideoCard({ video, onSelect }: VideoCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg">
      <button
        type="button"
        onClick={() => onSelect(video)}
        className="relative aspect-video w-full overflow-hidden bg-navy text-left"
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-navy/25 transition-colors duration-300 group-hover:bg-navy/10"
          aria-hidden="true"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-navy/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold shadow-sm backdrop-blur-sm">
          {video.category}
        </span>
      </button>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            {video.publishedAt} · {video.views}
          </p>
          <h3 className="mt-2 font-sans text-lg font-semibold leading-snug text-navy">
            {video.title}
          </h3>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-sand/60 pt-4 text-xs">
          <button
            type="button"
            onClick={() => onSelect(video)}
            className="font-sans text-[14px] font-semibold tracking-[0.03em] text-navy hover:text-gold-dark"
          >
            Play Inline
          </button>
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted hover:text-navy"
          >
            <span>YouTube</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

