import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, MessageCircle, Scale } from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";
import { BUYER_BENEFITS, BUYER_PROCESS } from "@/data/services";
import { NEIGHBORHOODS } from "@/data/neighborhoods";
import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceBenefits } from "@/components/services/ServiceBenefits";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { BuyerForm } from "@/components/services/BuyerForm";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = buildPageMetadata({
  title: "Buy a Home in Miami",
  description:
    "Tell us what you’re after and we’ll send curated Miami-Dade and Broward listings—including off-market access and attorney-led contract negotiation.",
  path: "/buy",
});

export default function BuyPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Buyer Representation"
        title="Find your Miami."
        description="Tell us what you’re looking for—neighborhoods, budget, must-haves—and we’ll send curated listings that fit. No portal spam. Just properties worth your time."
        image="/images/services/buy.jpg"
        imageAlt="Mediterranean Revival architectural residence in Coral Gables, Miami"
        aside={
          <div className="border border-white/15 bg-navy-light/85 p-7 sm:p-8 lg:mt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Buyer Consultation · Quick Brief
            </p>
            <h2 className="mt-2 font-sans text-xl font-semibold text-white">
              Need numbers before touring?
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ivory/75">
              Run your estimated monthly payment or buying budget using our
              Miami mortgage and affordability calculators.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/calculators?tab=mortgage"
                className="border border-gold/50 px-4 py-2.5 font-sans text-[14px] font-semibold tracking-[0.03em] text-gold transition-colors hover:bg-gold hover:text-navy"
              >
                Mortgage Calculator
              </Link>
              <Link
                href="/calculators?tab=affordability"
                className="border border-white/25 px-4 py-2.5 font-sans text-[14px] font-semibold tracking-[0.03em] text-white transition-colors hover:border-gold hover:text-gold"
              >
                Affordability Tool
              </Link>
            </div>
          </div>
        }
      >
        <ServiceBenefits items={BUYER_BENEFITS} variant="dark" />
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/listings?category=for-sale"
            className="inline-flex items-center gap-2.5 bg-gold px-7 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy transition-colors hover:bg-white"
          >
            <span>Browse Current Listings</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={BROKERAGE_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/30 px-7 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-white transition-colors hover:border-gold hover:text-gold"
          >
            <MessageCircle className="h-4 w-4 text-gold" />
            <span>Message on WhatsApp</span>
          </a>
        </div>
      </ServiceHero>

      <section className="border-b border-sand bg-ivory py-20 md:py-28">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  eyebrow="Curated Search"
                  title="Tell us what you’re looking for."
                  description="Most buyer experiences are built on volume—automated portal alerts that ignore HOA health, flood zones, street noise, and resale value. We curate every match personally and review every contract through a legal lens."
                />

                <div className="mt-10 space-y-6 border-t border-sand pt-8">
                  <div className="flex items-start gap-4">
                    <Scale className="mt-1 h-5 w-5 shrink-0 text-gold-dark" />
                    <div>
                      <h3 className="font-sans text-lg font-semibold text-navy">
                        Curated. Honest. Lawyer-Led.
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-charcoal/80">
                        Managing Broker Victor A. Ruiz, Esq. brings trial-lawyer
                        rigor and accounting fluency directly to your offer terms,
                        inspection credits, condo reserve review, and title
                        contingencies.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Compass className="mt-1 h-5 w-5 shrink-0 text-gold-dark" />
                    <div>
                      <h3 className="font-sans text-lg font-semibold text-navy">
                        Local-First Guidance Across Borders
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-charcoal/80">
                        Relocating within Miami-Dade or buying from abroad? Read
                        our{" "}
                        <Link
                          href="/updates-news/buying-or-renting-in-miami-from-abroad"
                          className="font-medium text-navy underline decoration-gold underline-offset-4 hover:text-gold-dark"
                        >
                          2026 International Buyer Guide
                        </Link>{" "}
                        for foreign national financing, LLC structuring, and
                        remote closing rules.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-sand bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                    We’ll Reply Within 1 Business Day
                  </p>
                  <h3 className="heading-editorial mt-2 text-3xl text-navy">
                    Start Your Buyer Brief
                  </h3>
                  <p className="mb-6 mt-2 text-[15px] text-charcoal/75">
                    Share your target areas, budget, and timing below. Our team
                    responds personally via email or WhatsApp.
                  </p>
                  <BuyerForm />
                </div>
              </Reveal>
            </div>
          </div>
        </PageContainer>
      </section>

      <ProcessSteps
        title="How we work for buyers."
        description="Four straightforward steps from initial search criteria to closing table—without wasted tours or generic drip emails."
        steps={BUYER_PROCESS}
        background="white"
      />

      <section className="bg-ivory py-20 md:py-28">
        <PageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Where We Work"
              title="Miami-Dade and Broward—the corners worth knowing."
              description="These are the neighborhoods our clients ask about most—but if you are looking anywhere across South Florida, we know the streets."
              actionLabel="Explore All Listings"
              actionHref="/listings"
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {NEIGHBORHOODS.map((hood, idx) => (
              <Reveal key={hood.slug} delay={Math.min(idx * 0.05, 0.3)}>
                <Link
                  href={`/listings?location=${encodeURIComponent(hood.searchQuery)}`}
                  className="group block overflow-hidden rounded-2xl border border-sand bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                    <Image
                      src={hood.image}
                      alt={`${hood.name}, Miami`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
                      {hood.areaLabel}
                    </p>
                    <h3 className="mt-1 font-sans text-xl font-semibold text-navy">
                      {hood.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-charcoal/75">
                      {hood.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </section>

      <FinalCTA />
    </>
  );
}

