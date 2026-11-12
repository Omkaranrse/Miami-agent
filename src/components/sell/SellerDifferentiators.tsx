"use client";

import Link from "next/link";
import { ArrowRight, MapPinned, MessageCircle, Scale, ShieldCheck } from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";
import { PageContainer } from "@/components/layout/PageContainer";

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

export function SellerDifferentiators() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <PageContainer>
        {/* Section Header with "Meet Our Team" Link */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">
              <span className="h-px w-8 bg-gold-dark/40" aria-hidden="true" />
              <span>Why Move Miami</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[52px] lg:leading-[1.12]">
              Built for straight answers and clean closings.
            </h2>
          </div>

          <Link
            href="/agents"
            className="group inline-flex shrink-0 items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:text-gold-dark"
          >
            <span>Meet Our Team</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Open Two-Column Editorial Layout (No Rectangular Cards) */}
        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
          {DIFFERENTIATORS.map((item) => {
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

        {/* Seamless Editorial Advisory Callout */}
        <div className="mt-16 border-t border-sand/70 pt-10 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h3 className="font-serif text-2xl font-normal text-navy sm:text-3xl">
              Not sure whether to take a cash offer or list?
            </h3>
            <p className="mt-2 font-sans text-sm font-light text-muted sm:text-base">
              Message Victor directly on WhatsApp or call{" "}
              <a
                href={BROKERAGE_INFO.officePhoneHref}
                className="font-medium text-navy hover:text-gold-dark"
              >
                {BROKERAGE_INFO.officePhoneDisplay}
              </a>
              .
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-0 sm:shrink-0">
            <a
              href={BROKERAGE_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-navy-light"
            >
              <MessageCircle className="h-4 w-4 text-gold" />
              <span>WhatsApp Our Team</span>
            </a>

            <Link
              href="/calculators/home-sale-caculator"
              className="border-b border-navy/40 px-1 py-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:border-navy hover:text-gold-dark"
            >
              Net Proceeds Calculator
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

