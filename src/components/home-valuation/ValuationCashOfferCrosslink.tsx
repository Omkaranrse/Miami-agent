import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";

export function ValuationCashOfferCrosslink() {
  return (
    <section className="border-t border-sand/70 bg-ivory py-14 sm:py-16">
      <PageContainer>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-dark">
              Alternative Liquidity Path
            </span>
            <h3 className="mt-1 font-serif text-2xl font-normal text-navy sm:text-3xl">
              Prefer speed over market testing?
            </h3>
            <p className="mt-1 font-sans text-sm font-light text-muted sm:text-base">
              Explore our 72-hour cash offer program and compare your options.
            </p>
          </div>

          <Link
            href="/cash-offer"
            className="group inline-flex shrink-0 items-center gap-2 border-b border-navy/40 pb-1 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:border-navy hover:text-gold-dark"
          >
            <span>Explore Cash Offer</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}

