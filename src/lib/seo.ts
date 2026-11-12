import type { Metadata } from "next";
import { BROKERAGE_INFO } from "@/lib/constants";

interface SeoInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image = "/images/home/hero.webp",
}: SeoInput): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://movemiamirealtor.com";
  const canonical = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${BROKERAGE_INFO.brandName}`,
      description,
      url: canonical,
      siteName: BROKERAGE_INFO.brandName,
      locale: "en_US",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${BROKERAGE_INFO.brandName}`,
      description,
      images: [image],
    },
  };
}

