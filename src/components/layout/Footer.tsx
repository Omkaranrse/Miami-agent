import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";
import { SnapshotPile } from "./SnapshotPile";
import { Reveal } from "@/components/ui/Reveal";

const EXPLORE_LEFT = [
  { label: "Buy", href: "/buy" },
  { label: "Cash Offer", href: "/cash-offer" },
  { label: "Videos", href: "/videos" },
  { label: "Agents", href: "/agents" },
  { label: "Updates", href: "/updates-news" },
];

const EXPLORE_RIGHT = [
  { label: "Sell", href: "/sell" },
  { label: "Home Valuation", href: "/home-valuation" },
  { label: "About Us", href: "/about-us" },
  { label: "Calculators", href: "/calculators" },
  { label: "Contact", href: "/contact" },
];

function TikTokIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .595.042.88.124V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.43c.8-.84 1.24-1.95 1.24-3.11V9.77a8.16 8.16 0 0 0 4.49 1.35V7.69a4.85 4.85 0 0 1 0-1Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#EAE0FF]">
      {/* Framer Snapshot Footer Interactive Polaroid Photo Pile */}
      <SnapshotPile />

      {/* Rounded Royal-Purple Footer Container */}
      <div className="relative z-20 overflow-hidden rounded-t-[32px] border-t border-white/20 bg-[linear-gradient(135deg,#241056_0%,#3B1980_52%,#2A1263_100%)] text-white shadow-[0_-20px_60px_-16px_rgba(36,23,72,0.28)]">
        {/* Subtle Organic Wave Sheen inside Purple Footer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <svg
            viewBox="0 0 1440 420"
            fill="none"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="M0 320 C 380 200, 960 360, 1440 160 L 1440 420 L 0 420 Z"
              fill="rgba(255, 255, 255, 0.035)"
            />
            <path
              d="M0 140 C 320 40, 820 20, 1440 220"
              stroke="rgba(212, 198, 255, 0.08)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pt-16">
          <Reveal variant="fade-up" className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src="/images/brand/logo-white.png"
                  alt="Move Miami Realtor"
                  width={158}
                  height={56}
                  className="h-12 w-auto object-contain"
                />
              </Link>

              <p className="mt-4 max-w-xs font-sans text-[13.5px] leading-relaxed text-white/80">
                {BROKERAGE_INFO.description}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href={BROKERAGE_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message Move Miami on WhatsApp"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={BROKERAGE_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Move Miami on Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20 active:scale-95"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={BROKERAGE_INFO.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Move Miami on YouTube"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20 active:scale-95"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a
                  href={BROKERAGE_INFO.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Move Miami on TikTok"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20 active:scale-95"
                >
                  <TikTokIcon />
                </a>
              </div>
            </div>

            {/* Explore 2-Column Links */}
            <div className="lg:col-span-4 lg:border-l lg:border-white/15 lg:pl-10">
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-white/95">
                Explore
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 font-sans text-[13.5px] font-medium text-white/85">
                <ul className="space-y-3">
                  {EXPLORE_LEFT.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="transition-colors hover:text-[#D4C6FF]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {EXPLORE_RIGHT.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="transition-colors hover:text-[#D4C6FF]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Column */}
            <div className="lg:col-span-4 lg:border-l lg:border-white/15 lg:pl-10">
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-white/95">
                Contact
              </h3>

              <ul className="mt-5 space-y-3.5 font-sans text-[13.5px] text-white/85">
                <li>
                  <a
                    href={BROKERAGE_INFO.officePhoneHref}
                    className="inline-flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-[#C6B2FF]" />
                    <span>{BROKERAGE_INFO.officePhoneDisplay} (office)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={BROKERAGE_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-[#C6B2FF]" />
                    <span>WhatsApp {BROKERAGE_INFO.whatsappDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={BROKERAGE_INFO.emailHref}
                    className="inline-flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[#C6B2FF]" />
                    <span>{BROKERAGE_INFO.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C6B2FF]" />
                  <span>
                    {BROKERAGE_INFO.officeAddress}
                    <br />
                    {BROKERAGE_INFO.officeCityStateZip}
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Bottom Legal & Licensing Row */}
          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 font-sans text-[12px] text-white/70 sm:flex-row sm:items-center">
            <p>{BROKERAGE_INFO.copyright}</p>
            <p>{BROKERAGE_INFO.licensingNotice}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
