"use client";

import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  Instagram,
  Facebook,
} from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";

function XTwitterIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.887 2.887 2.896 2.896 0 0 1-2.887-2.887 2.896 2.896 0 0 1 2.887-2.887c.29 0 .567.042.828.118V9.418a6.34 6.34 0 0 0-.828-.054A6.333 6.333 0 0 0 3.053 15.7a6.333 6.333 0 0 0 6.334 6.333 6.333 6.333 0 0 0 6.334-6.333V9.014a8.193 8.193 0 0 0 4.968 1.672V7.24a4.83 4.83 0 0 1-1.1-.554z" />
    </svg>
  );
}

export function ContactDetails() {
  return (
    <div className="rounded-[30px] border border-white/80 bg-white/95 p-7 shadow-[0_24px_60px_-18px_rgba(45,20,108,0.12)] backdrop-blur-xl sm:p-9">
      {/* Top Pill Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#E4D7FF] bg-[#F3ECFF] px-3.5 py-1.5">
        <Phone className="h-3.5 w-3.5 text-[#5B2EC6]" />
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#4C2B9A]">
          Reach Us Directly
        </span>
      </div>

      {/* Heading */}
      <h2 className="mt-4 font-sans text-[28px] font-bold tracking-tight text-[#160B30] sm:text-[32px]">
        Contact Information.
      </h2>

      {/* Contact Rows List */}
      <div className="mt-7 space-y-6">
        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3ECFF] text-[#5B2EC6]">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#71668E]">
              Phone
            </p>
            <a
              href={BROKERAGE_INFO.officePhoneHref}
              className="mt-0.5 block font-sans text-[16px] font-bold text-[#1A0C38] transition-colors hover:text-[#5B2EC6]"
            >
              {BROKERAGE_INFO.officePhoneDisplay}
            </a>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F8EE] text-[#25D366]">
            <MessageCircle className="h-5 w-5 fill-[#25D366]" />
          </div>
          <div className="flex-1">
            <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#71668E]">
              WhatsApp
            </p>
            <a
              href={BROKERAGE_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex items-center gap-2 rounded-full border border-[#BDE8CD] bg-[#F4FBF6] px-4 py-2 font-sans text-[12.5px] font-bold text-[#12773F] shadow-2xs transition-all hover:border-[#25D366] hover:bg-[#EAF8EF]"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-[#25D366] text-[#25D366]" />
              <span>Message us on WhatsApp</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3ECFF] text-[#5B2EC6]">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#71668E]">
              Email
            </p>
            <a
              href={BROKERAGE_INFO.emailHref}
              className="mt-0.5 block font-sans text-[15px] font-bold text-[#1A0C38] transition-colors hover:text-[#5B2EC6]"
            >
              {BROKERAGE_INFO.email}
            </a>
          </div>
        </div>

        {/* Office */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3ECFF] text-[#5B2EC6]">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#71668E]">
              Office
            </p>
            <p className="mt-0.5 font-sans text-[14.5px] font-semibold leading-relaxed text-[#1A0C38]">
              8660 W Flagler St, Suite 302
              <br />
              Miami, FL 33144
            </p>
          </div>
        </div>
      </div>

      {/* Follow Us Social Icons */}
      <div className="mt-8 border-t border-[#EDE7F9] pt-6">
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#71668E]">
          Follow Us
        </p>
        <div className="mt-3.5 flex items-center gap-3">
          {/* X Twitter */}
          <a
            href="https://x.com/movemiami"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Move Miami on X"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2DCF3] bg-[#F8F5FF] text-[#241748] shadow-2xs transition-all hover:border-[#5B2EC6] hover:bg-[#5B2EC6] hover:text-white"
          >
            <XTwitterIcon className="h-4 w-4" />
          </a>

          {/* Instagram */}
          <a
            href={BROKERAGE_INFO.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Move Miami on Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2DCF3] bg-[#F8F5FF] text-[#241748] shadow-2xs transition-all hover:border-[#5B2EC6] hover:bg-[#5B2EC6] hover:text-white"
          >
            <Instagram className="h-4 w-4" />
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/movemiamirealtor"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Move Miami on Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2DCF3] bg-[#F8F5FF] text-[#241748] shadow-2xs transition-all hover:border-[#5B2EC6] hover:bg-[#5B2EC6] hover:text-white"
          >
            <Facebook className="h-4 w-4" />
          </a>

          {/* TikTok */}
          <a
            href={BROKERAGE_INFO.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Move Miami on TikTok"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2DCF3] bg-[#F8F5FF] text-[#241748] shadow-2xs transition-all hover:border-[#5B2EC6] hover:bg-[#5B2EC6] hover:text-white"
          >
            <TikTokIcon className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Architectural Villa Photo */}
      <div className="relative mt-7 h-[180px] w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
        <Image
          src="/images/contact/miami-villa-contact.jpg"
          alt="Modern architectural Miami luxury villa under palm trees"
          fill
          sizes="(max-width: 1024px) 100vw, 38vw"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
