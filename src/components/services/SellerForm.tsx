"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function SellerForm() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Reveal className="flex flex-col justify-between border border-navy bg-navy p-8 text-ivory sm:p-10">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            Path One · Speed &amp; Certainty
          </p>
          <h3 className="heading-editorial mt-3 text-3xl text-white sm:text-4xl">
            Get a cash offer.
          </h3>
          <p className="body-editorial mt-4 text-ivory/80">
            If speed and certainty matter more than squeezing out the last
            dollar, our cash offer path lets you close on your timeline—no
            showings, no repairs, no financing contingencies. Tell us about your
            property and we’ll bring a verified cash offer in 72 hours or shop
            your home to our vetted investor network.
          </p>
        </div>

        <div className="mt-8 border-t border-white/15 pt-6">
          <Link
            href="/cash-offer"
            className="inline-flex items-center gap-2.5 bg-gold px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy transition-colors hover:bg-white"
          >
            <span>Start a Cash Offer</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <Reveal
        delay={0.08}
        className="flex flex-col justify-between border border-sand bg-white p-8 text-charcoal sm:p-10"
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">
            Path Two · Maximum Market Value
          </p>
          <h3 className="heading-editorial mt-3 text-3xl text-navy sm:text-4xl">
            List with us.
          </h3>
          <p className="body-editorial mt-4 text-charcoal/80">
            If maximizing your net sale price is the priority, the traditional
            listing path—paired with comparative market analysis, targeted
            preparation ROI advice, and architectural media
            marketing—consistently outperforms. Start with a broker-prepared
            valuation grounded in real comps.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-sand pt-6">
          <Link
            href="/home-valuation"
            className="inline-flex items-center gap-2.5 bg-navy px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-white transition-colors hover:bg-navy-light"
          >
            <span>Get a Free Valuation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/calculators/home-sale-caculator"
            className="font-sans text-[14px] font-semibold tracking-[0.03em] text-navy underline decoration-gold underline-offset-4 hover:text-gold-dark"
          >
            Estimate Net Proceeds
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

