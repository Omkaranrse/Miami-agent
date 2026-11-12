import Link from "next/link";
import {
  ArrowUpRight,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";

export function ContactDetails() {
  return (
    <div className="space-y-8">
      <div className="border border-sand bg-ivory p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Contact Info
        </p>
        <h2 className="heading-editorial mt-2 text-3xl text-navy">
          Reach us directly.
        </h2>

        <dl className="mt-6 space-y-6 border-t border-sand pt-6 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              WhatsApp (Fastest Response)
            </dt>
            <dd className="mt-1.5">
              <a
                href={BROKERAGE_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-navy hover:text-gold-dark"
              >
                <MessageCircle className="h-4 w-4 text-gold-dark" />
                <span>Message us at {BROKERAGE_INFO.whatsappDisplay}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Office Line
            </dt>
            <dd className="mt-1.5">
              <a
                href={BROKERAGE_INFO.officePhoneHref}
                className="inline-flex items-center gap-2 font-medium text-navy hover:text-gold-dark"
              >
                <Phone className="h-4 w-4 text-gold-dark" />
                <span>{BROKERAGE_INFO.officePhoneDisplay}</span>
              </a>
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Email
            </dt>
            <dd className="mt-1.5">
              <a
                href={BROKERAGE_INFO.emailHref}
                className="inline-flex items-center gap-2 font-medium text-navy hover:text-gold-dark"
              >
                <Mail className="h-4 w-4 text-gold-dark" />
                <span>{BROKERAGE_INFO.email}</span>
              </a>
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Visit Us
            </dt>
            <dd className="mt-1.5 flex items-start gap-2 text-charcoal/85">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
              <span>
                {BROKERAGE_INFO.officeAddress}
                <br />
                {BROKERAGE_INFO.officeCityStateZip}
              </span>
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Follow Us
            </dt>
            <dd className="mt-2.5 flex flex-wrap gap-3">
              <a
                href={BROKERAGE_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-sand bg-white px-3.5 py-2 text-xs font-medium text-navy hover:border-navy"
              >
                <Instagram className="h-3.5 w-3.5 text-gold-dark" />
                <span>{BROKERAGE_INFO.social.instagramHandle}</span>
              </a>
              <a
                href={BROKERAGE_INFO.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-sand bg-white px-3.5 py-2 text-xs font-medium text-navy hover:border-navy"
              >
                <Youtube className="h-3.5 w-3.5 text-gold-dark" />
                <span>{BROKERAGE_INFO.social.youtubeHandle}</span>
              </a>
              <a
                href={BROKERAGE_INFO.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-sand bg-white px-3.5 py-2 text-xs font-medium text-navy hover:border-navy"
              >
                <span>TikTok {BROKERAGE_INFO.social.tiktokHandle}</span>
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 border-t border-sand pt-6 sm:flex-row">
          <a
            href={BROKERAGE_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 bg-navy px-5 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-white hover:bg-navy-light"
          >
            <MessageCircle className="h-4 w-4 text-gold" />
            <span>Open WhatsApp</span>
          </a>
          <a
            href={BROKERAGE_INFO.officePhoneHref}
            className="inline-flex flex-1 items-center justify-center gap-2 border border-navy px-5 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy hover:bg-navy hover:text-white"
          >
            <Phone className="h-4 w-4" />
            <span>Call Now</span>
          </a>
        </div>
      </div>

      <div className="border border-sand bg-navy p-7 text-ivory">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          Need Agent-Specific Help?
        </p>
        <p className="heading-editorial mt-2 text-2xl text-white">
          Connect directly with one of our five Miami advisors.
        </p>
        <Link
          href="/agents"
          className="mt-4 inline-block font-sans text-[14px] font-semibold tracking-[0.03em] text-gold underline underline-offset-4 hover:text-white"
        >
          View Team Directory &amp; Bios
        </Link>
      </div>
    </div>
  );
}

