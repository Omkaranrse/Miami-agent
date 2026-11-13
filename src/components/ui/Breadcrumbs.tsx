import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`inline-flex flex-wrap items-center gap-2 rounded-full border border-white/85 bg-white/80 px-4 py-2 text-xs shadow-xs backdrop-blur-md transition-all ${className}`}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={item.label} className="inline-flex items-center gap-2">
            {idx > 0 && (
              <ChevronRight className="h-3.5 w-3.5 text-[#9A8FB3]" aria-hidden="true" />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="font-sans text-[12px] font-semibold text-[#321477] transition-colors hover:text-[#7C52EB]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-sans text-[12px] font-medium text-[#655A85]">
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function BackPill({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border border-white/85 bg-white/80 px-4 py-2 font-sans text-[13px] font-semibold text-[#1A0C38] shadow-xs backdrop-blur-md transition-all hover:border-[#7C52EB] hover:bg-white hover:text-[#5B2EC6] active:scale-[0.98] ${className}`}
    >
      <ArrowLeft className="h-3.5 w-3.5 text-[#7C52EB]" />
      <span>{label}</span>
    </Link>
  );
}

