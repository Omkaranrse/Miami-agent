import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PropertySearch } from "./PropertySearch";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-end bg-navy pb-14 pt-32 text-white md:pb-20">
      <Image
        src="/images/home/hero.webp"
        alt="Modern Miami waterfront luxury residence on Biscayne Bay at twilight"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-[#442C85]/60"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-gold">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span>Miami-Dade &amp; Broward · Attorney-Led Brokerage</span>
          </div>

          <h1 className="heading-hero mt-5 text-white">
            Your Move. Your Miami.
          </h1>

          <p className="body-editorial mt-5 max-w-2xl text-ivory/90 sm:text-lg">
            Local expertise. Straight answers. Real estate decisions made with
            confidence.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2.5 bg-gold px-7 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy transition-colors hover:bg-white"
            >
              <span>Explore Properties</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 border border-white/35 bg-navy/40 px-7 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-white backdrop-blur-xs transition-colors hover:border-gold hover:text-gold"
            >
              <span>Talk to Our Team</span>
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <PropertySearch />
        </div>
      </div>
    </section>
  );
}

