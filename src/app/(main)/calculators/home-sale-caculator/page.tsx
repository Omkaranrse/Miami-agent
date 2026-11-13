import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { NetProceedsCalculator } from "@/components/calculators/NetProceedsCalculator";
import { CashOfferPhotographicCTA } from "@/components/cash-offer/CashOfferPhotographicCTA";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = buildPageMetadata({
  title: "Home Sale Net Proceeds Calculator",
  description:
    "Calculate estimated walk-away net proceeds from selling your Miami home after mortgage payoff, brokerage commission, title, and Florida documentary stamps.",
  path: "/calculators/home-sale-caculator",
});

export default function HomeSaleCaculatorPage() {
  return (
    <div className="bg-ivory pt-28">
      {/* Breadcrumb Navigation Bar */}
      <div className="border-b border-sand/70 bg-white py-4">
        <PageContainer className="flex flex-wrap items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "Home Sale Net Proceeds" },
            ]}
          />
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:text-gold-dark"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Calculators</span>
          </Link>
        </PageContainer>
      </div>

      {/* Page Introduction & Main Workspace */}
      <section className="bg-ivory py-14 sm:py-20 lg:py-24">
        <PageContainer>
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">
                  <span className="h-px w-8 bg-gold-dark/40" aria-hidden="true" />
                  <span>Seller Net Equity Estimator</span>
                </div>
                <h1 className="mt-4 font-serif text-3xl font-normal tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[56px] lg:leading-[1.1]">
                  Home Sale Net Proceeds Calculator
                </h1>
                <p className="mt-4 max-w-2xl font-sans text-base font-light leading-relaxed text-muted sm:text-lg">
                  Estimate what you walk away with at closing—accounting for your
                  expected sale price, mortgage payoff, brokerage compensation,
                  Miami-Dade doc stamps, and buyer credits.
                </p>
              </div>

              <Link
                href="/home-valuation"
                className="group inline-flex shrink-0 items-center gap-2 bg-navy px-7 py-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-navy-light"
              >
                <span>Request Custom CMA</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          {/* Interactive Net Proceeds Calculator Workspace */}
          <div className="mt-14">
            <NetProceedsCalculator />
          </div>
        </PageContainer>
      </section>

      {/* Cinematic Photographic Final CTA */}
      <CashOfferPhotographicCTA />
    </div>
  );
}
