import type { ReactNode } from "react";

type BadgeTone = "navy" | "gold" | "ivory" | "sand" | "charcoal";

const TONE_MAP: Record<BadgeTone, string> = {
  navy: "bg-navy text-white",
  gold: "bg-gold text-navy",
  ivory: "bg-white/95 text-navy border border-sand",
  sand: "bg-sand-light text-navy border border-sand",
  charcoal: "bg-charcoal text-white",
};

interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}

export function Badge({ tone = "navy", className = "", children }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${TONE_MAP[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

