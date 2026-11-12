import Link from "next/link";
import { Clock, ExternalLink, Landmark, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
import { CASH_OFFER_BENEFITS, CASH_OFFER_STEPS } from "@/data/services";
import { BROKERAGE_INFO } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceBenefits } from "@/components/services/ServiceBenefits";
import { CashOfferForm } from "@/components/services/CashOfferForm";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata = buildPageMetadata({
  title: "Request a Cash Offer",
  description:
    "Receive a verified cash offer in 72 hours or shop your Miami property privately to Move Miami’s investor network—no repairs, no showings, no financing contingencies.",
  path: "/cash-offer",
});

const WHEN_IT_FITS = [
  {
    icon: Clock,
    title: "You need to move on a deadline.",
    description:
      "Job relocation, family transition, or another purchase closing already in motion with no room for months on market.",
  },
  {
    icon: Wrench,
    title: "The property needs work.",
    description:
      "Skip out-of-pocket repairs, contractor delays, permits, or pre-listing staging.",
  },
  {
    icon: ShieldCheck,
    title: "You want certainty.",
    description:
      "No lender underwriting delays, no inspection re-trades, and no buyer cold feet before closing.",
  },
  {
    icon: Landmark,
    title: "You inherited the property.",
    description:
      "Probate estates, multiple heirs, or out-of-state owners benefit from a clean, attorney-coordinated cash disposition.",
  },
];

export default function CashOfferPage() {
  return (
    <>
      <ServiceHero
        eyebrow="72-Hour Cash Offer Program"
        title="A cash offer on your terms."
        description="Tell us about your Miami-Dade or Broward property. We’ll bring a verified cash offer in 72 hours—or shop your home discreetly to our vetted investor network—without repairs, open houses, or financing contingencies."
        image="/images/services/cash-offer.jpg"
        imageAlt="Miami residential single-family property"
        aside={
          <div className="border border-sand bg-white p-6 text-charcoal sm:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Takes 1 Minute · Reply Within 1 Business Day
            </p>
            <h2 className="heading-editorial mt-2 text-3xl text-navy">
              Start your cash offer.
            </h2>
            <p className="mb-6 mt-2 text-[15px] text-charcoal/75">
              No obligation. Compare our cash figure against an open-market
              valuation before choosing your path.
            </p>
            <CashOfferForm />
          </div>
        }
      >
        <ServiceBenefits items={CASH_OFFER_BENEFITS} variant="dark" />
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={BROKERAGE_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-gold px-6 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy transition-colors hover:bg-white"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Fast-Track via WhatsApp</span>
          </a>

          <a
            href={BROKERAGE_INFO.hifello.cashOfferPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/30 px-6 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-white transition-colors hover:border-gold hover:text-gold"
          >
            <span>HiFello Cash Offer Portal</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </ServiceHero>

      <ProcessSteps
        title="What happens next."
        description="Transparent underwriting backed by our local investor network and managing broker Victor A. Ruiz, Esq."
        steps={CASH_OFFER_STEPS}
        background="ivory"
      />

      <section className="bg-white py-20 md:py-28">
        <PageContainer>
          <SectionHeading
            eyebrow="Honest Take"
            title="When the cash offer path makes sense."
            description="Cash offers trade some top-line retail value for speed and certainty. They are not the right move for every seller—here is when homeowners typically prefer them:"
            actionLabel="Compare With Free Valuation"
            actionHref="/home-valuation"
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {WHEN_IT_FITS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-5 border border-sand bg-ivory p-7"
                >
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-sand bg-white">
                    <Icon className="h-5 w-5 text-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xl font-semibold text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-charcoal/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 border border-sand bg-ivory p-7 sm:flex sm:items-center sm:justify-between">
            <div>
              <h3 className="heading-editorial text-2xl text-navy">
                Selling an inherited or probate home in Florida?
              </h3>
              <p className="mt-1 text-[15px] text-charcoal/75">
                Explore our estate planning guide led by practicing trial
                attorney Victor A. Ruiz, Esq.
              </p>
            </div>
            <Link
              href="/updates-news/free-estate-planning-webinar-how-to-sell-probate-property-in-florida"
              className="mt-4 inline-block border border-navy px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy transition-colors hover:bg-navy hover:text-white sm:mt-0"
            >
              Read Probate Guide
            </Link>
          </div>
        </PageContainer>
      </section>

      <FinalCTA />
    </>
  );
}

