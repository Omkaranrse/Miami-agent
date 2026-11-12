import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Agent } from "@/types/agent";
import { BROKERAGE_INFO, TRUST_DIFFERENTIATORS } from "@/lib/constants";
import { PageContainer } from "@/components/layout/PageContainer";

interface PrincipalProfileProps {
  principal: Agent;
  showDirectoryLink?: boolean;
}

export function PrincipalProfile({
  principal,
  showDirectoryLink = true,
}: PrincipalProfileProps) {
  return (
    <section className="border-b border-sand bg-white py-20 md:py-28">
      <PageContainer>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-sand bg-ivory">
              <Image
                src={principal.image}
                alt={principal.name}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <span>Managing Broker &amp; Principal</span>
            </div>

            <h2 className="heading-section mt-3 text-navy">
              {principal.name}
            </h2>
            {principal.credentials && (
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {principal.credentials}
              </p>
            )}

            <div className="body-editorial mt-6 space-y-4 text-charcoal/85">
              {principal.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-sand pt-8 sm:grid-cols-2">
              {TRUST_DIFFERENTIATORS.map((diff) => (
                <div key={diff.title} className="border border-sand bg-ivory p-4">
                  <p className="font-sans text-base font-semibold text-navy">
                    {diff.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-charcoal/75">
                    {diff.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {showDirectoryLink && (
                <Link
                  href="/agents"
                  className="inline-flex items-center gap-2 bg-navy px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-white transition-colors hover:bg-navy-light"
                >
                  <span>Meet the Full Team</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <Link
                href={`/agents/${principal.slug}`}
                className="inline-flex items-center gap-2 border border-sand px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy transition-colors hover:border-navy"
              >
                <span>View Full Bio</span>
              </Link>
              <a
                href={principal.whatsappHref ?? BROKERAGE_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-sand px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy transition-colors hover:border-navy"
              >
                <span>Message Victor Directly</span>
              </a>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

