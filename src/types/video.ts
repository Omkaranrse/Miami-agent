export type VideoCategory =
  | "Estate Tours"
  | "Market Updates"
  | "Buyer & Seller Guides"
  | "Law & Real Estate";

export interface VideoItem {
  id: string;
  title: string;
  publishedAt: string;
  views: string;
  youtubeUrl: string;
  thumbnail: string;
  category: VideoCategory;
}

export interface InstagramReel {
  id: string;
  title: string;
  embedUrl: string;
  permalink: string;
}

