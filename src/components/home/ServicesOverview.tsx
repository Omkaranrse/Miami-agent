import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HOME_SERVICES } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesOverview() {
  return (
    <section className="border-b border-sand bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Three ways we represent South Florida clients."
          description="Whether buying your next residence, listing for peak open-market value, or unlocking a fast cash sale, every engagement pairs local brokerage depth with legal diligence."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {HOME_SERVICES.map((service, idx) => (
            <Reveal
              key={service.title}
              delay={idx * 0.06}
              className={`group flex flex-col justify-between border ${
                idx === 2
                  ? "border-navy bg-navy text-ivory"
                  : "border-sand bg-white text-charcoal"
              }`}
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                      idx === 2 ? "text-gold" : "text-gold-dark"
                    }`}
                  >
                    {service.number} · {service.eyebrow}
                  </p>
                  <h3
                    className={`heading-editorial mt-2 text-3xl ${
                      idx === 2 ? "text-white" : "text-navy"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`mt-3 text-[15px] leading-relaxed ${
                      idx === 2 ? "text-ivory/80" : "text-charcoal/80"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>
              </div>

              <div
                className={`border-t px-8 py-5 ${
                  idx === 2 ? "border-white/15" : "border-sand"
                }`}
              >
                <Link
                  href={service.ctaHref}
                  className={`inline-flex items-center gap-2 font-sans text-[14px] font-semibold tracking-[0.04em] ${
                    idx === 2
                      ? "text-gold hover:text-white"
                      : "text-navy hover:text-gold-dark"
                  }`}
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

