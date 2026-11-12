import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/types/article";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex h-full flex-col border border-sand bg-white">
      <Link
        href={`/updates-news/${article.slug}`}
        className="relative aspect-[16/10] overflow-hidden bg-navy"
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
            {article.category} · {article.date}
          </p>
          <h2 className="mt-2 font-sans text-xl font-semibold leading-snug text-navy">
            <Link
              href={`/updates-news/${article.slug}`}
              className="hover:text-gold-dark"
            >
              {article.title}
            </Link>
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-charcoal/80">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-sand pt-4 text-xs">
          <span className="text-muted">
            {article.author} · {article.readTime}
          </span>
          <Link
            href={`/updates-news/${article.slug}`}
            className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold tracking-[0.03em] text-navy hover:text-gold-dark"
          >
            <span>Read</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

