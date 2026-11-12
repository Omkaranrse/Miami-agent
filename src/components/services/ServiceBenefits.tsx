import { Check } from "lucide-react";

interface ServiceBenefitsProps {
  items: string[];
  variant?: "dark" | "light";
}

export function ServiceBenefits({
  items,
  variant = "dark",
}: ServiceBenefitsProps) {
  const isDark = variant === "dark";

  return (
    <ul className="mt-8 space-y-3">
      {items.map((benefit) => (
        <li
          key={benefit}
          className={`flex items-start gap-3 text-[15px] leading-relaxed ${
            isDark ? "text-ivory/90" : "text-charcoal/85"
          }`}
        >
          <span
            className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center border ${
              isDark
                ? "border-gold/50 text-gold"
                : "border-sand bg-ivory text-gold-dark"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
          </span>
          <span>{benefit}</span>
        </li>
      ))}
    </ul>
  );
}

