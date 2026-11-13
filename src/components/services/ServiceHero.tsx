import Image from "next/image";
import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Reveal } from "@/components/ui/Reveal";

interface ServiceHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
  aside?: ReactNode;
}

export function ServiceHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
  aside,
}: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy pb-20 pt-36 text-ivory md:pb-24 md:pt-44">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 animate-cinematic-zoom"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-[#442C85]/70"
        aria-hidden="true"
      />

      <PageContainer className="relative z-10">
        {aside ? (
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <Reveal variant="fade-up" className="lg:col-span-6">
              <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                <span className="h-px w-8 bg-gold" aria-hidden="true" />
                <span>{eyebrow}</span>
              </div>
              <h1 className="heading-hero mt-4 text-white">
                {title}
              </h1>
              <p className="body-editorial mt-5 text-ivory/85">
                {description}
              </p>
              {children}
            </Reveal>
            <Reveal variant="fade-up" delay={0.12} className="lg:col-span-6">
              {aside}
            </Reveal>
          </div>
        ) : (
          <Reveal variant="fade-up" className="max-w-4xl">
            <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
            <h1 className="heading-hero mt-4 text-white">
              {title}
            </h1>
            <p className="body-editorial mt-5 max-w-2xl text-ivory/85">
              {description}
            </p>
            {children}
          </Reveal>
        )}
      </PageContainer>
    </section>
  );
}
