import { buildPageMetadata } from "@/lib/seo";
import { CashOfferHero } from "@/components/cash-offer/CashOfferHero";
import { CashOfferChaptersTimeline } from "@/components/cash-offer/CashOfferChaptersTimeline";
import { CashOfferFitSection } from "@/components/cash-offer/CashOfferFitSection";
import { CashOfferPhotographicCTA } from "@/components/cash-offer/CashOfferPhotographicCTA";

export const metadata = buildPageMetadata({
  title: "Request a Cash Offer",
  description:
    "Receive a verified cash offer in 72 hours or shop your Miami property privately to Move Miami’s investor network—no repairs, no showings, no financing contingencies.",
  path: "/cash-offer",
});

export default function CashOfferPage() {
  return (
    <>
      {/* 1. Full-Width Cinematic Hero + Offer Wizard Multi-Step Form */}
      <CashOfferHero />

      {/* 2. Chapters Timeline: What Happens Next */}
      <CashOfferChaptersTimeline />

      {/* 3. When the Cash Offer Path Makes Sense + Inline Probate Guidance */}
      <CashOfferFitSection />

      {/* 4. Photographic Final CTA with Scroll Zoom Reveal */}
      <CashOfferPhotographicCTA />
    </>
  );
}
