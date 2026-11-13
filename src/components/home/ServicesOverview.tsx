import { ArrowRight } from "lucide-react";
import { HOME_SERVICES } from "@/data/services";
import { Pinfold, type PinfoldNote } from "@/components/ui/Pinfold";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";
import { Reveal } from "@/components/ui/Reveal";

const CARD_ROLES = [
  "Curated Buyer Advisory",
  "Strategic Listing & Law",
  "72-Hour Liquidity",
];

export function ServicesOverview() {
  const serviceNotes: PinfoldNote[] = HOME_SERVICES.map((service, idx) => ({
    id: service.number,
    eyebrow: `${service.number} · ${service.eyebrow}`,
    title: service.title,
    quote: service.description,
    name: service.eyebrow,
    role: CARD_ROLES[idx] ?? service.title,
    imageURL: service.image,
    imageAlt: service.title,
    link: service.ctaHref,
    ctaLabel: service.ctaLabel,
    color: "#FFFFFF",
    shape: "square",
  }));

  return (
    <section className="relative overflow-hidden border-b border-[#DCD0FA] bg-[linear-gradient(135deg,#F8F5FF_0%,#EDE4FF_52%,#DECFFF_100%)] py-20 md:py-28">
      {/* Subtle Diagonal Wave Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 0 H1180 C1000 260 640 470 0 650 Z"
            fill="rgba(255, 255, 255, 0.36)"
          />
          <path
            d="M0 640 C480 510 920 290 1200 0"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal variant="fade-up" className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3.5">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#4C2B9A]">
                What We Do
              </span>
              <span
                className="h-px w-24 bg-gradient-to-r from-[#5D36C6]/65 to-transparent"
                aria-hidden="true"
              />
            </div>

            <h2 className="heading-section mt-3 text-[#21124B]">
              Three ways we represent{" "}
              <span className="bg-gradient-to-r from-[#5E35CE] via-[#7E52EB] to-[#A47BFF] bg-clip-text italic text-transparent">
                South Florida clients.
              </span>
            </h2>

            <p className="body-editorial mt-3.5 max-w-2xl text-[#45396B]">
              Whether buying your next residence, listing for peak open-market
              value, or unlocking a fast cash sale, every engagement pairs local
              brokerage depth with legal diligence. Drag any pinned card to move
              it around.
            </p>
          </div>

          <div className="shrink-0">
            <FluidGlassButton href="/contact" className="px-7 py-3.5 text-[14px]">
              <span>Talk to Our Team</span>
              <ArrowRight className="h-4 w-4" />
            </FluidGlassButton>
          </div>
        </Reveal>

        {/* Interactive Frameless Pinfold Cards */}
        <div className="mt-12">
          <Pinfold
            notes={serviceNotes}
            board={{
              frameless: true,
              fill: "transparent",
              texture: false,
              radius: 0,
              inset: 0,
              frameWidth: 0,
            }}
            spread={{
              columns: 3,
              noteSize: 390,
              scatter: 0,
              lean: 0,
              headroom: 0,
              seed: 7,
            }}
            fasteners={{
              kind: "pin",
              size: 26,
              first: "#5C31C7",
              second: "#5C31C7",
              third: "#5C31C7",
            }}
            play={{
              draggable: true,
              swing: true,
              lift: true,
              entrance: true,
              stagger: 0.08,
              breeze: false,
              tools: false,
            }}
          />
        </div>
      </div>
    </section>
  );
}
