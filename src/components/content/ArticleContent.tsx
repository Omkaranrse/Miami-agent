import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { Article } from "@/types/article";
import { BROKERAGE_INFO } from "@/lib/constants";

export function ArticleContent({ article }: { article: Article }) {
  return (
    <article>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          {article.category} · {article.date}
        </p>
        <h1 className="heading-section mt-3 text-navy">
          {article.title}
        </h1>
        <p className="mt-4 text-sm text-muted">
          By {article.author} · {article.readTime}
        </p>
      </header>

      <div className="relative mt-8 aspect-[16/9] max-w-4xl overflow-hidden border border-sand bg-navy">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      <div className="mt-10 max-w-3xl space-y-8">
        <p className="heading-editorial border-l-2 border-gold pl-5 text-2xl leading-relaxed text-navy">
          {article.excerpt}
        </p>

        {article.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="heading-editorial text-3xl text-navy">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="body-editorial text-charcoal/85"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="space-y-2.5 border border-sand bg-ivory p-6">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-[15px] leading-relaxed text-charcoal/85"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold-dark"
                      aria-hidden="true"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="border border-sand bg-ivory p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
            Ask Move Miami Directly
          </p>
          <p className="heading-editorial mt-2 text-2xl text-navy">
            Want tailored guidance on your Miami move?
          </p>
          <p className="mt-2 text-[15px] text-charcoal/80">
            Reach Managing Broker Victor A. Ruiz, Esq. and our local advisors via
            WhatsApp or send us your property goals.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={BROKERAGE_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-white hover:bg-navy-light"
            >
              <MessageCircle className="h-4 w-4 text-gold" />
              <span>WhatsApp {BROKERAGE_INFO.whatsappDisplay}</span>
            </a>
            <Link
              href="/contact"
              className="border border-sand bg-white px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy hover:border-navy"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

