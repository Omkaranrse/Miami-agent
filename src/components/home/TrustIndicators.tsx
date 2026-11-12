import React from "react";
import { Building2, ShieldCheck, Users, MapPin } from "lucide-react";
import { ProfileGlassContainer } from "@/components/ui/ProfileGlassContainer";

const HERO_TRUST_ITEMS = [
  {
    icon: Building2,
    title: "Miami-Native Experts",
    subtitle: "Born here, brokering here",
  },
  {
    icon: ShieldCheck,
    title: "Attorney-Led",
    subtitle: "Counsel on every contract",
  },
  {
    icon: Users,
    title: "Family-Run Brokerage",
    subtitle: "Boutique care, investor reach",
  },
  {
    icon: MapPin,
    title: "Key Miami Enclaves",
    subtitle: "Brickell · Gables · Pinecrest · Grove",
  },
];

export function TrustIndicators() {
  return (
    <ProfileGlassContainer className="px-5 py-4 sm:px-7 sm:py-4.5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {HERO_TRUST_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`relative flex items-center gap-3 ${
                idx > 0 ? "lg:pl-5" : ""
              } ${idx < HERO_TRUST_ITEMS.length - 1 ? "lg:pr-5" : ""}`}
            >
              {/* Frosted glass vertical separator (Profile Container signature bar) */}
              {idx > 0 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 hidden h-10 w-[2px] -translate-y-1/2 rounded-full bg-gradient-to-b from-white/90 via-[#C7B5F8]/55 to-white/25 lg:block"
                />
              )}

              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white/75 text-[#341878] shadow-xs">
                <Icon className="h-[17px] w-[17px] stroke-[1.75]" />
              </span>

              <div className="min-w-0">
                <p className="font-sans text-[13.5px] font-bold leading-snug text-[#1C103D]">
                  {item.title}
                </p>
                <p className="mt-0.5 font-sans text-[11.5px] font-medium leading-snug tracking-[-0.01em] text-[#463673]">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </ProfileGlassContainer>
  );
}
