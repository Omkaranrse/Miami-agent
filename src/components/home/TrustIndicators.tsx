import { Building2, ShieldCheck, Users, MapPin } from "lucide-react";

const HERO_TRUST_ITEMS = [
  {
    icon: Building2,
    title: "Miami-Native Experts",
    subtitle: "Born here, brokering here",
  },
  {
    icon: ShieldCheck,
    title: "Attorney-Led",
    subtitle: "Victor A. Ruiz, Esq. signs every contract",
  },
  {
    icon: Users,
    title: "Family-Run & Investor-Backed",
    subtitle: "Boutique service, institutional reach",
  },
  {
    icon: MapPin,
    title: "Brickell · Gables · Pinecrest · Grove",
    subtitle: "Deep coverage in the corridors that matter",
  },
];

export function TrustIndicators() {
  return (
    <section className="border-b border-[#E2DCF0] bg-[#F9F8FC] py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {HERO_TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3.5">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center text-[#352366]">
                  <Icon className="h-5 w-5 stroke-[1.6]" />
                </span>
                <div>
                  <h2 className="font-sans text-[14px] font-bold leading-snug text-[#1F1B2E]">
                    {item.title}
                  </h2>
                  <p className="mt-0.5 font-sans text-[13px] leading-snug text-[#5C5570]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
