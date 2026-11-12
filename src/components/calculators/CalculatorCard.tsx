import Link from "next/link";
import { ArrowRight, Calculator, DollarSign, Home } from "lucide-react";

interface CalculatorCardProps {
  id: "mortgage" | "affordability" | "net-proceeds";
  subtitle: string;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  active?: boolean;
}

const ICONS = {
  mortgage: Home,
  affordability: Calculator,
  "net-proceeds": DollarSign,
};

export function CalculatorCard({
  id,
  subtitle,
  title,
  description,
  href,
  actionLabel,
  active = false,
}: CalculatorCardProps) {
  const Icon = ICONS[id];

  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between border p-7 transition-colors ${
        active
          ? "border-navy bg-navy text-ivory"
          : "border-sand bg-white text-charcoal hover:border-navy"
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <p
            className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
              active ? "text-gold" : "text-gold-dark"
            }`}
          >
            {subtitle}
          </p>
          <Icon className={`h-5 w-5 ${active ? "text-gold" : "text-navy"}`} />
        </div>
        <h3
          className={`mt-3 font-sans text-xl font-semibold ${
            active ? "text-white" : "text-navy"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-2.5 text-[15px] leading-relaxed ${
            active ? "text-ivory/80" : "text-charcoal/75"
          }`}
        >
          {description}
        </p>
      </div>

      <span
        className={`mt-6 inline-flex items-center gap-2 font-sans text-[14px] font-semibold tracking-[0.03em] ${
          active ? "text-gold" : "text-navy group-hover:text-gold-dark"
        }`}
      >
        <span>{actionLabel}</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

