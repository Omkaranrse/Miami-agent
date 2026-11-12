import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { HomeSaleCalculator } from "@/components/calculators/HomeSaleCalculator";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata = buildPageMetadata({
  title: "Home Sale Net Proceeds Calculator",
  description:
    "Calculate estimated walk-away net proceeds from selling your Miami home after mortgage payoff, brokerage commission, title, and Florida documentary stamps.",
  path: "/calculators/home-sale-caculator",
});

export default function HomeSaleCaculatorPage() {
  return (
    <div className="bg-ivory pt-28">
      <div className="border-b border-sand bg-white py-4">
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
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold tracking-[0.03em] text-navy hover:text-gold-dark"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Calculators</span>
          </Link>
        </PageContainer>
      </div>

      <section className="border-b border-sand bg-ivory py-12 md:py-16">
        <PageContainer>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
                <span className="h-px w-8 bg-gold" aria-hidden="true" />
                <span>Seller Net Equity Estimator</span>
              </div>
              <h1 className="heading-section mt-3 text-navy">
                Home Sale Net Proceeds Calculator
              </h1>
              <p className="body-editorial mt-4 text-charcoal/80">
                Estimate what you walk away with at closing—accounting for your
                expected sale price, mortgage payoff, brokerage compensation,
                Miami-Dade doc stamps, and buyer credits.
              </p>
            </div>

            <Link
              href="/home-valuation"
              className="inline-flex shrink-0 items-center gap-2 bg-navy px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-white hover:bg-navy-light"
            >
              <span>Request Custom CMA</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10">
            <HomeSaleCalculator initialTab="net-proceeds" showTabs={false} />
          </div>
        </PageContainer>
      </section>

      <FinalCTA />
    </div>
  );
}

