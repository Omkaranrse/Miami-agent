import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  light?: boolean;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  light = false,
  align = "left",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`flex flex-col gap-6 ${
        isCentered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className="max-w-2xl">
        <div
          className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
            light ? "text-gold" : "text-gold-dark"
          }`}
        >
          <span
            className={`h-px w-8 ${light ? "bg-gold/70" : "bg-gold"}`}
            aria-hidden="true"
          />
          <span>{eyebrow}</span>
        </div>
        <h2
          className={`heading-section mt-3 ${
            light ? "text-white" : "text-navy"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`body-editorial mt-4 ${
              light ? "text-white/80" : "text-charcoal/80"
            }`}
          >
            {description}
          </p>
        )}
      </div>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className={`group inline-flex shrink-0 items-center gap-2 border-b pb-1 font-sans text-[14px] font-semibold tracking-[0.02em] transition-colors ${
            light
              ? "border-gold/60 text-white hover:border-white hover:text-gold"
              : "border-navy/30 text-navy hover:border-navy hover:text-gold-dark"
          }`}
        >
          <span>{actionLabel}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

