import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { CalculatorCard } from "@/components/calculators/CalculatorCard";
import { Reveal } from "@/components/ui/Reveal";
import {
  HomeSaleCalculator,
  type CalculatorTab,
} from "@/components/calculators/HomeSaleCalculator";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata = buildPageMetadata({
  title: "Miami Real Estate Calculators",
  description:
    "Interactive Miami mortgage payment, buying affordability, and seller net proceeds calculators built by Move Miami Realty.",
  path: "/calculators",
});

export default async function CalculatorsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const initialTab: CalculatorTab =
    tab === "affordability" || tab === "net-proceeds" ? tab : "mortgage";

  return (
    <>
      <section className="border-b border-sand bg-ivory pb-14 pt-32 md:pb-16 md:pt-40">
        <PageContainer>
          <Reveal variant="fade-up" className="max-w-4xl">
            <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <span>Financial Planning Tools</span>
            </div>
            <h1 className="heading-hero mt-3 text-navy">
              Real Estate Calculators
            </h1>
            <p className="body-editorial mt-4 max-w-2xl text-charcoal/80">
              Model monthly ownership costs with Florida property taxes and
              insurance, estimate buying power, or calculate walk-away seller
              net proceeds before listing.
            </p>
          </Reveal>
        </PageContainer>
      </section>

      <section className="border-b border-sand bg-white py-12 md:py-16">
        <PageContainer>
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Reveal variant="fade-up" delay={0.06}>
              <CalculatorCard
                id="mortgage"
                subtitle="For Buyers"
                title="Monthly Mortgage Payment"
                description="Factor Florida taxes, windstorm insurance, and condo HOA dues alongside principal and interest."
                href="/calculators?tab=mortgage"
                actionLabel="Run Mortgage Tool"
                active={initialTab === "mortgage"}
              />
            </Reveal>
            <Reveal variant="fade-up" delay={0.12}>
              <CalculatorCard
                id="affordability"
                subtitle="For Buyers"
                title="Home Affordability"
                description="Translate household income, recurring obligations, and down payment cash into a realistic Miami budget."
                href="/calculators?tab=affordability"
                actionLabel="Check Buying Power"
                active={initialTab === "affordability"}
              />
            </Reveal>
            <Reveal variant="fade-up" delay={0.18}>
              <CalculatorCard
                id="net-proceeds"
                subtitle="For Sellers"
                title="Home Sale Net Proceeds"
                description="Estimate walk-away equity after mortgage payoff, brokerage fee, Florida doc stamps, and closing costs."
                href="/calculators/home-sale-caculator"
                actionLabel="Open Full Seller Calculator"
                active={initialTab === "net-proceeds"}
              />
            </Reveal>
          </div>

          <Reveal variant="fade-up" delay={0.2}>
            <HomeSaleCalculator initialTab={initialTab} />
          </Reveal>
        </PageContainer>
      </section>

      <FinalCTA />
    </>
  );
}

