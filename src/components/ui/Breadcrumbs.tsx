import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={item.label} className="inline-flex items-center gap-2">
            {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted" />}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="font-semibold uppercase tracking-[0.14em] text-navy hover:text-gold-dark"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium uppercase tracking-[0.14em] text-muted">
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

