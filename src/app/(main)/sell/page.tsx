import Link from "next/link";
import { ArrowRight, MapPinned, MessageCircle, Scale, ShieldCheck } from "lucide-react";
import { VERIFIED_PAST_RESULTS } from "@/data/agents";
import { SELLER_PROCESS } from "@/data/services";
import { BROKERAGE_INFO } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceHero } from "@/components/services/ServiceHero";
import { SellerForm } from "@/components/services/SellerForm";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata = buildPageMetadata({
  title: "Sell Your Miami Home",
  description:
    "Sell with a Miami brokerage led by a managing broker who is also a practicing attorney. Choose a fast 72-hour cash offer path or a strategic full-market listing.",
  path: "/sell",
});

const DIFFERENTIATORS = [
  {
    icon: Scale,
    title: "A brokerage led by a lawyer.",
    description:
      "Victor A. Ruiz, Esq. is our managing broker and a practicing trial attorney. Contracts are drafted and negotiated with litigation-grade precision—you never get handed off between agent and counsel when terms get nuanced.",
  },
  {
    icon: MapPinned,
    title: "Local-only.",
    description:
      "We work Miami-Dade and Broward exclusively—no out-of-market referrals or generic call-center valuation bots pretending to know your block.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp-first responsiveness.",
    description:
      "Real responses from our licensed team directly on WhatsApp—never scripted auto-replies when an offer lands on Friday evening.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed Florida team.",
    description:
      "Every advisor on our roster is an active licensed Florida real estate professional backed by full brokerage compliance and accounting discipline.",
  },
];

export default function SellPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Seller Representation"
        title="Sell your Miami home, on your terms."
        description="Whether you want a fast cash offer or a strategic listing that maximizes market value, we’ll walk you through both paths with real numbers and let you pick what fits."
        image="/images/services/sell.jpg"
        imageAlt="Pinecrest Miami architectural estate sold and represented by Move Miami Realtor"
      >
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/cash-offer"
            className="inline-flex items-center gap-2.5 bg-gold px-7 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy transition-colors hover:bg-white"
          >
            <span>Get a Cash Offer</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/home-valuation"
            className="inline-flex items-center gap-2 border border-white/30 px-7 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-white transition-colors hover:border-gold hover:text-gold"
          >
            <span>Get a Free Valuation</span>
          </Link>
        </div>
      </ServiceHero>

      <section className="border-b border-sand bg-ivory py-20 md:py-28">
        <PageContainer>
          <SectionHeading
            eyebrow="Seller Strategy"
            title="Two paths. One team."
            description="Every seller situation is different. Pick the path that fits your timeline and property—or speak with Victor directly and compare both side by side."
          />

          <div className="mt-12">
            <SellerForm />
          </div>
        </PageContainer>
      </section>

      <section className="border-b border-sand bg-white py-20 md:py-28">
        <PageContainer>
          <SectionHeading
            eyebrow="Verified Brokerage Track Record"
            title="Past results grounded in sharp pricing and legal follow-through."
            description="Real closed transactions from Move Miami Realty’s comparative market analysis portfolio—from rapid single-family sales above asking to multi-million dollar waterfront estates."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {VERIFIED_PAST_RESULTS.map((result, idx) => (
              <Reveal
                key={`${result.propertyType}-${result.soldPrice}`}
                delay={idx * 0.05}
                className="flex flex-col justify-between border border-sand bg-ivory p-6"
              >
                <div>
                  <span className="inline-block bg-navy px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gold">
                    {result.badge}
                  </span>
                  <p className="mt-4 font-sans text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                    {result.soldPrice}
                  </p>
                  <p className="mt-1 text-sm font-medium text-charcoal">
                    {result.propertyType}
                  </p>
                </div>

                <div className="mt-6 space-y-1 border-t border-sand pt-4 text-xs text-muted">
                  {result.askingPrice && <p>Asked {result.askingPrice}</p>}
                  {result.daysOnMarket && <p>{result.daysOnMarket} on market</p>}
                  <p>{result.specs}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </section>

      <ProcessSteps
        title="How selling with Move Miami works."
        steps={SELLER_PROCESS}
        background="ivory"
      />

      <section className="bg-white py-20 md:py-28">
        <PageContainer>
          <SectionHeading
            eyebrow="Why Move Miami"
            title="Built for straight answers and clean closings."
            actionLabel="Meet Our Team"
            actionHref="/agents"
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {DIFFERENTIATORS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-5 border border-sand bg-ivory p-7"
                >
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-sand bg-white text-navy">
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
                Not sure whether to take a cash offer or list?
              </h3>
              <p className="mt-1 text-[15px] text-charcoal/75">
                Message Victor directly on WhatsApp or call{" "}
                {BROKERAGE_INFO.officePhoneDisplay}.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 sm:mt-0">
              <a
                href={BROKERAGE_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-navy px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-white hover:bg-navy-light"
              >
                <MessageCircle className="h-4 w-4 text-gold" />
                <span>WhatsApp Our Team</span>
              </a>
              <Link
                href="/calculators/home-sale-caculator"
                className="border border-sand bg-white px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy hover:border-navy"
              >
                Net Proceeds Calculator
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      <FinalCTA />
    </>
  );
}

