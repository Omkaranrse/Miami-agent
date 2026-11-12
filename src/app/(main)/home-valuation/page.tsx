import Link from "next/link";
import {
  ExternalLink,
  FileSpreadsheet,
  Hammer,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { VALUATION_BENEFITS, VALUATION_STEPS } from "@/data/services";
import { BROKERAGE_INFO } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceBenefits } from "@/components/services/ServiceBenefits";
import { ValuationForm } from "@/components/services/ValuationForm";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata = buildPageMetadata({
  title: "Free Home Valuation",
  description:
    "Get a free, no-obligation valuation of your Miami home. Comparable sales analysis, pricing strategy, and preparation advice from a lawyer-led local brokerage.",
  path: "/home-valuation",
});

const INCLUDED_PILLARS = [
  {
    icon: FileSpreadsheet,
    title: "Comparable sales analysis.",
    description:
      "Recent closed sales of similar properties in your exact micro-market—what they listed for, what they closed at, days on market, and how they compare lot-by-lot to your home.",
  },
  {
    icon: TrendingUp,
    title: "Pricing strategy.",
    description:
      "Where we would position your asking price, what buyer pool it captures, and the negotiation range we plan around—delivered as a realistic spread rather than one arbitrary guess.",
  },
  {
    icon: Hammer,
    title: "Prep recommendations.",
    description:
      "Honest ROI guidance on what improvements, paint, or light staging actually increase net proceeds before listing—and which renovations are not worth spending money on.",
  },
];

const COMPARISON_ROWS = [
  {
    aspect: "Data Basis",
    online: "Generic public-record algorithm",
    moveMiami: "Local broker analysis + verified recent comps",
  },
  {
    aspect: "Property Context",
    online: "No interior review or condition nuance",
    moveMiami: "Reviewed personally by a licensed Miami agent",
  },
  {
    aspect: "Output",
    online: "Single automated estimate",
    moveMiami: "Realistic pricing spread + go-to-market strategy",
  },
  {
    aspect: "Follow-Through",
    online: "Zero human follow-up",
    moveMiami: "1-on-1 conversation via phone or WhatsApp",
  },
];

export default function HomeValuationPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Free Comparative Market Analysis"
        title="What’s your home actually worth?"
        description="A real valuation from a real Miami broker—not an automated Zestimate. We pull recent comps, account for upgrades and street position, and walk you through what buyers are paying today."
        image="/images/services/valuation.jpg"
        imageAlt="Coconut Grove tropical luxury residence in Miami"
        aside={
          <div className="border border-sand bg-white p-6 text-charcoal sm:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Takes 1 Minute · Delivered in 2–3 Business Days
            </p>
            <h2 className="heading-editorial mt-2 text-3xl text-navy">
              Get your free valuation.
            </h2>
            <p className="mb-6 mt-2 text-[15px] text-charcoal/75">
              Prepared personally by Move Miami Realty—never resold to
              third-party lead aggregators.
            </p>
            <ValuationForm />
          </div>
        }
      >
        <ServiceBenefits items={VALUATION_BENEFITS} variant="dark" />
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={BROKERAGE_INFO.hifello.homeValuationPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold/60 bg-navy-light px-6 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-gold transition-colors hover:bg-gold hover:text-navy"
          >
            <span>Open Instant Home Equity Portal</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <a
            href={BROKERAGE_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/30 px-6 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-white transition-colors hover:border-gold hover:text-gold"
          >
            <MessageCircle className="h-4 w-4 text-gold" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </ServiceHero>

      <section className="border-b border-sand bg-ivory py-20 md:py-28">
        <PageContainer>
          <SectionHeading
            eyebrow="What’s Included"
            title="What you get."
            description="Every home valuation pairs closed sales data with street-level Miami advisory."
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {INCLUDED_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal
                  key={pillar.title}
                  delay={idx * 0.06}
                  className="border border-sand bg-white p-8"
                >
                  <Icon className="h-6 w-6 text-gold-dark" />
                  <h3 className="mt-5 font-sans text-xl font-semibold text-navy">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-charcoal/80">
                    {pillar.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </PageContainer>
      </section>

      <section className="border-b border-sand bg-white py-20 md:py-28">
        <PageContainer>
          <SectionHeading
            eyebrow="Why Not Just a Zestimate?"
            title="Algorithms miss the things that matter."
            description="Online estimates pull public square footage, beds, baths, and last sale price. They miss your renovated kitchen, your exposure and view corridor, your lot shape, and whether the comp two blocks away was a tear-down."
          />

          <div className="mt-12 overflow-x-auto border border-sand">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-sand bg-ivory">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    Dimension
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    Online Estimate
                  </th>
                  <th className="bg-navy px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                    Move Miami Valuation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand bg-white text-sm">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.aspect}>
                    <td className="px-6 py-4 font-semibold text-navy">
                      {row.aspect}
                    </td>
                    <td className="px-6 py-4 text-charcoal/70">{row.online}</td>
                    <td className="bg-ivory/50 px-6 py-4 font-medium text-navy">
                      {row.moveMiami}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageContainer>
      </section>

      <ProcessSteps
        eyebrow="How It Works"
        title="Four steps to an accurate number."
        steps={VALUATION_STEPS}
        actionLabel="Estimate Net Proceeds"
        actionHref="/calculators/home-sale-caculator"
        background="ivory"
      />

      <section className="border-b border-sand bg-ivory pb-16 text-center">
        <PageContainer>
          <Link
            href="/cash-offer"
            className="font-sans text-[14px] font-semibold tracking-[0.03em] text-navy underline decoration-gold underline-offset-4 hover:text-gold-dark"
          >
            Prefer speed over market testing? Explore our 72-Hour Cash Offer
            instead
          </Link>
        </PageContainer>
      </section>

      <FinalCTA />
    </>
  );
}

