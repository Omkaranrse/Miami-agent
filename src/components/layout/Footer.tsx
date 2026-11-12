import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, MessageCircle, Instagram, Youtube } from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";
import { FOOTER_BROKERAGE_LINKS, FOOTER_SERVICE_LINKS } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-navy text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/brand/logo-white.png"
                alt="Move Miami Realtor"
                width={175}
                height={62}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/75">
              {BROKERAGE_INFO.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={BROKERAGE_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Move Miami on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={BROKERAGE_INFO.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Move Miami on YouTube"
                className="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={BROKERAGE_INFO.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Move Miami on TikTok"
                className="inline-flex h-10 items-center justify-center border border-white/20 px-3 text-xs font-medium tracking-wider text-ivory/80 transition-colors hover:border-gold hover:text-gold"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Brokerage
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ivory/80">
              {FOOTER_BROKERAGE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Services &amp; Tools
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ivory/80">
              {FOOTER_SERVICE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Miami Office
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ivory/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {BROKERAGE_INFO.officeAddress}
                  <br />
                  {BROKERAGE_INFO.officeCityStateZip}
                </span>
              </li>
              <li>
                <a
                  href={BROKERAGE_INFO.officePhoneHref}
                  className="inline-flex items-center gap-2.5 hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  <span>{BROKERAGE_INFO.officePhoneDisplay} (office)</span>
                </a>
              </li>
              <li>
                <a
                  href={BROKERAGE_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-gold" />
                  <span>WhatsApp {BROKERAGE_INFO.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={BROKERAGE_INFO.emailHref}
                  className="inline-flex items-center gap-2.5 hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold" />
                  <span>{BROKERAGE_INFO.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Licensing Bottom Bar */}
        <div className="mt-14 border-t border-white/15 pt-8">
          <div className="flex flex-col justify-between gap-4 text-xs text-ivory/65 md:flex-row md:items-center">
            <div className="space-y-1">
              <p>
                {BROKERAGE_INFO.copyright} {BROKERAGE_INFO.licensingNotice}
              </p>
              <p className="text-ivory/50">
                {BROKERAGE_INFO.legalName} ({BROKERAGE_INFO.entityName}) · Managed
                by Victor A. Ruiz, Esq. · Equal Housing Opportunity.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <Link href="/about-us" className="hover:text-ivory">
                Brokerage Standards
              </Link>
              <Link href="/contact" className="hover:text-ivory">
                Direct Inquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
