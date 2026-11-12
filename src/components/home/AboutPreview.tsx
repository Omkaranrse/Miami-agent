import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { AGENTS } from "@/data/agents";
import { BROKERAGE_INFO } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function AboutPreview() {
  const victor = AGENTS.find((a) => a.isPrincipal) ?? AGENTS[0];

  return (
    <section className="border-b border-sand bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden border border-sand bg-ivory">
              <Image
                src="/images/home/about.webp"
                alt={victor.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6">
            <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <span>About Move Miami</span>
            </div>

            <h2 className="heading-section mt-3 text-navy">
              A Miami brokerage led by a practicing trial attorney.
            </h2>

            <p className="body-editorial mt-5 text-charcoal/85">
              {victor.bio[0]}
            </p>
            <p className="body-editorial mt-4 text-charcoal/80">
              {victor.bio[1]}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-sand pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Managing Broker
                </p>
                <p className="mt-1 font-sans text-lg font-semibold text-navy">
                  {victor.name}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Credentials
                </p>
                <p className="mt-1 font-sans text-sm font-medium text-charcoal">
                  Miami Native · Trial Lawyer · Accounting
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 bg-navy px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-white transition-colors hover:bg-navy-light"
              >
                <span>Our Brokerage Story</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={BROKERAGE_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-sand px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy transition-colors hover:border-navy"
              >
                <MessageCircle className="h-4 w-4 text-gold-dark" />
                <span>WhatsApp Victor</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

