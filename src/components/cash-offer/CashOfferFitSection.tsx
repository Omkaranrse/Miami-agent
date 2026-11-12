"use client";

import Link from "next/link";
import { ArrowRight, Clock, Landmark, ShieldCheck, Wrench, Scale } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";

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

export function CashOfferFitSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <PageContainer>
        {/* Header with Comparison Link */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">
              <span className="h-px w-8 bg-gold-dark/40" aria-hidden="true" />
              <span>Honest Take</span>
            </div>

            <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[52px] lg:leading-[1.12]">
              When the cash offer path makes sense.
            </h2>

            <p className="mt-4 font-sans text-base font-light leading-relaxed text-muted sm:text-lg">
              Cash offers trade some top-line retail value for speed and
              certainty. They are not the right move for every seller—here is
              when homeowners typically prefer them:
            </p>
          </div>

          <Link
            href="/home-valuation"
            className="group inline-flex shrink-0 items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:text-gold-dark"
          >
            <span>Compare With Free Valuation</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Open Two-Column Editorial Features (No Boxed Cards) */}
        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
          {WHEN_IT_FITS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-5 border-b border-sand/60 pb-8"
              >
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center text-navy">
                  <Icon className="h-5 w-5 text-gold-dark" />
                </div>
                <div>
                  <h3 className="font-sans text-lg font-semibold text-navy sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-sm font-light leading-relaxed text-charcoal/80 sm:text-[15px]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inline Editorial Probate Guidance Callout */}
        <div className="mt-20 border-t border-sand/70 pt-10 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div className="flex items-start gap-4">
            <div className="mt-1 hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand-light/60 text-navy">
              <Scale className="h-5 w-5 text-gold-dark" />
            </div>
            <div>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Legal &amp; Estate Guidance
              </span>
              <h3 className="mt-1 font-serif text-2xl font-normal text-navy sm:text-3xl">
                Selling an inherited or probate home in Florida?
              </h3>
              <p className="mt-2 max-w-2xl font-sans text-sm font-light text-muted sm:text-base">
                Explore our estate planning guidance led by practicing trial
                attorney Victor A. Ruiz, Esq.
              </p>
            </div>
          </div>

          <div className="mt-6 sm:mt-0 sm:shrink-0">
            <Link
              href="/updates-news/free-estate-planning-webinar-how-to-sell-probate-property-in-florida"
              className="group inline-flex items-center gap-2 border-b border-navy/40 px-1 py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:border-navy hover:text-gold-dark"
            >
              <span>Read Probate Guide</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

