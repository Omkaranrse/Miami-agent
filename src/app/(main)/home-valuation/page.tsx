import { buildPageMetadata } from "@/lib/seo";
import { ValuationHero } from "@/components/home-valuation/ValuationHero";
import { ValuationPillars } from "@/components/home-valuation/ValuationPillars";
import { ValuationHighlightCompare } from "@/components/home-valuation/ValuationHighlightCompare";
import { ValuationMilestonesTimeline } from "@/components/home-valuation/ValuationMilestonesTimeline";
import { ValuationCashOfferCrosslink } from "@/components/home-valuation/ValuationCashOfferCrosslink";
import { ValuationPhotographicCTA } from "@/components/home-valuation/ValuationPhotographicCTA";

export const metadata = buildPageMetadata({
  title: "Free Home Valuation",
  description:
    "Get a free, no-obligation valuation of your Miami home. Comparable sales analysis, pricing strategy, and preparation advice from a lawyer-led local brokerage.",
  path: "/home-valuation",
});

export default function HomeValuationPage() {
  return (
    <>
      {/* 1. Cinematic Hero + Offer Wizard Multi-Step Valuation Form */}
      <ValuationHero />

      {/* 2. What You Get: Three Editorial Pillars */}
      <ValuationPillars />

      {/* 3. Highlight Compare: Algorithms Miss the Things That Matter */}
      <ValuationHighlightCompare />

      {/* 4. Milestones Timeline: Four Steps to an Accurate Number */}
      <ValuationMilestonesTimeline />

      {/* 5. Cash Offer Cross-Link Editorial CTA */}
      <ValuationCashOfferCrosslink />

      {/* 6. Photographic Final CTA with Scroll Zoom Reveal */}
      <ValuationPhotographicCTA />
    </>
  );
}
