import { buildPageMetadata } from "@/lib/seo";
import { SellerHero } from "@/components/sell/SellerHero";
import { SellerStrategy } from "@/components/sell/SellerStrategy";
import { SellerTrackRecord } from "@/components/sell/SellerTrackRecord";
import { SellerInteractiveProcess } from "@/components/sell/SellerInteractiveProcess";
import { SellerDifferentiators } from "@/components/sell/SellerDifferentiators";
import { SellerPhotographicCTA } from "@/components/sell/SellerPhotographicCTA";

export const metadata = buildPageMetadata({
  title: "Sell Your Miami Home",
  description:
    "Sell with a Miami brokerage led by a managing broker who is also a practicing attorney. Choose a fast 72-hour cash offer path or a strategic full-market listing.",
  path: "/sell",
});

export default function SellPage() {
  return (
    <>
      {/* 1. Cinematic Luxury Hero */}
      <SellerHero
        eyebrow="Seller Representation"
        title="Sell your Miami home, on your terms."
        description="Whether you're wanting a fast cash offer or a strategic listing that maximizes market value, we'll walk you through both paths with real numbers and let you pick what fits."
        image="/images/heroes/luxury-miami-hero.jpg"
        imageAlt="Architectural Miami luxury estate represented by Move Miami Realtor"
      />

      {/* 2. Asymmetrical Selling Strategy: Cash Offer vs Traditional Listing */}
      <SellerStrategy />

      {/* 3. Verified Brokerage Track Record Strip */}
      <SellerTrackRecord />

      {/* 4. Interactive Selling Process Timeline */}
      <SellerInteractiveProcess />

      {/* 5. Why Move Miami Differentiators */}
      <SellerDifferentiators />

      {/* 6. Cinematic Photographic Final CTA */}
      <SellerPhotographicCTA />
    </>
  );
}
