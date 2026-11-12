export interface ServicePillar {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const HOME_SERVICES: ServicePillar[] = [
  {
    number: "01",
    eyebrow: "Buyers",
    title: "Buy a Home",
    description:
      "Tell us what you’re looking for and receive curated listings that fit—including off-market access and candid takes on HOA reserves, flood zones, and resale upside.",
    ctaLabel: "Start Buying",
    ctaHref: "/buy",
    image: "/images/services/buy.jpg",
  },
  {
    number: "02",
    eyebrow: "Sellers",
    title: "Sell Your Property",
    description:
      "Strategic pricing, comparable market analysis, preparation ROI advice, and architectural photography—backed by attorney-led contract negotiation from listing to closing.",
    ctaLabel: "Explore Selling",
    ctaHref: "/sell",
    image: "/images/services/sell.jpg",
  },
  {
    number: "03",
    eyebrow: "Direct Liquidity",
    title: "Request a Cash Offer",
    description:
      "Need certainty or an as-is close without repairs or open houses? We bring a verified cash offer in 72 hours or shop your home quietly to our vetted investor network.",
    ctaLabel: "Get a Cash Offer",
    ctaHref: "/cash-offer",
    image: "/images/services/cash-offer.jpg",
  },
];

export const BUYER_BENEFITS = [
  "Curated by a real agent, not an algorithm",
  "Off-market opportunities included",
  "Honest take on every listing—including the downsides",
];

export const BUYER_PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Tell us what you want.",
    description:
      "Neighborhoods, budget, must-haves, and deal-breakers. The more specific your criteria, the sharper every property match becomes.",
  },
  {
    step: "02",
    title: "We send curated listings.",
    description:
      "Not every listing flooded out of an automated MLS drip—just properties that genuinely fit, plus off-market access when available.",
  },
  {
    step: "03",
    title: "We tour together.",
    description:
      "We do the legwork on what is actually worth seeing in person. Direct WhatsApp coordination with zero email tag.",
  },
  {
    step: "04",
    title: "We negotiate hard.",
    description:
      "Victor A. Ruiz, Esq. handles contracts as a licensed trial attorney. You get an experienced Miami broker and a lawyer at the negotiating table.",
  },
];

export const SELLER_PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Tell us your situation.",
    description:
      "A short conversation via WhatsApp, phone, or form. We clarify your timeline, your property condition, and which path fits your goals.",
  },
  {
    step: "02",
    title: "We evaluate your property.",
    description:
      "We pull recent neighborhood comps, weigh local buyer velocity, and inspect property-specific nuances before presenting real numbers.",
  },
  {
    step: "03",
    title: "You pick the path.",
    description:
      "Accept a verified cash offer for speed and certainty, or list strategically on the open market to maximize your sale price. Zero pressure.",
  },
  {
    step: "04",
    title: "We close it cleanly.",
    description:
      "Contracts, inspections, title coordination, and closing—Victor handles legal review as a licensed attorney so nothing gets lost between agent and counsel.",
  },
];

export const CASH_OFFER_BENEFITS = [
  "Verified cash offer in 72 hours (written offer typically in 3–5 business days)",
  "No repairs, painting, or staging required",
  "No financing contingencies—close on your timeline",
];

export const CASH_OFFER_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "We review your property.",
    description:
      "Within 1 business day, we evaluate what you submitted and pull recent neighborhood comparable sales.",
  },
  {
    step: "02",
    title: "We follow up with questions.",
    description:
      "If we need quick photos or condition context, we reach out via WhatsApp or phone—zero pressure, just clarity.",
  },
  {
    step: "03",
    title: "You get a cash offer.",
    description:
      "Initial cash read within 72 hours and formal written terms typically within 3–5 business days, transparent with no hidden junk fees.",
  },
  {
    step: "04",
    title: "You decide.",
    description:
      "Accept, counter, or walk away—or compare it against listing traditionally. If you accept, Victor handles legal closing.",
  },
];

export const VALUATION_BENEFITS = [
  "Based on recent closed comps, not generic algorithms",
  "Includes a real conversation—not an automated pop-up number",
  "Zero obligation: keep, list traditionally, or wait",
];

export const VALUATION_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "You submit the form.",
    description:
      "Takes one minute. Share your address and any upgrades, views, or HOA notes that public tax records miss.",
  },
  {
    step: "02",
    title: "We pull neighborhood comps.",
    description:
      "Our licensed team inspects active competition, pending contracts, and recent closings within your subdivision.",
  },
  {
    step: "03",
    title: "We deliver your CMA spread.",
    description:
      "Within 2–3 business days, you receive a tailored comparable sales breakdown and prep recommendations.",
  },
  {
    step: "04",
    title: "You decide the next move.",
    description:
      "List when ready, compare against our 72-hour cash offer path, or simply hold onto the benchmark for future planning.",
  },
];

