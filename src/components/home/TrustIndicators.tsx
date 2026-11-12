import { Scale, Compass, Building2, MapPinned } from "lucide-react";
import { TRUST_DIFFERENTIATORS } from "@/lib/constants";

const TRUST_ICONS = [Compass, Scale, Building2, MapPinned];

export function TrustIndicators() {
  return (
    <section className="border-b border-sand bg-ivory py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 divide-y divide-sand md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {TRUST_DIFFERENTIATORS.map((item, idx) => {
            const Icon = TRUST_ICONS[idx % TRUST_ICONS.length];
            return (
              <div
                key={item.title}
                className="pt-6 first:pt-0 md:pt-0 lg:px-7 lg:first:pl-0 lg:last:pr-0"
              >
                <div className="flex items-center gap-2.5 text-gold-dark">
                  <Icon className="h-4 w-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                    0{idx + 1}
                  </span>
                </div>
                <h2 className="mt-2.5 font-sans text-xl font-semibold tracking-tight text-navy">
                  {item.title}
                </h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {item.subtitle}
                </p>
                <p className="mt-2.5 text-[15px] leading-relaxed text-charcoal/80">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

