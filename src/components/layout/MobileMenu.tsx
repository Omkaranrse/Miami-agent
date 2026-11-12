"use client";

import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";
import { MAIN_NAV_ITEMS } from "@/data/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="border-t border-sand bg-ivory px-4 pb-8 pt-4 text-navy lg:hidden">
      <nav aria-label="Mobile navigation" className="flex flex-col">
        {MAIN_NAV_ITEMS.map((item) => (
          <Link
            key={item.link}
            href={item.link}
            onClick={onClose}
            className="border-b border-sand/60 py-3 font-sans text-[14px] font-semibold tracking-[0.02em] text-navy"
          >
            {item.title}
          </Link>
        ))}
        <Link
          href="/videos"
          onClick={onClose}
          className="border-b border-sand/60 py-3 font-sans text-[14px] font-semibold tracking-[0.02em] text-navy"
        >
          Videos &amp; Tours
        </Link>
        <Link
          href="/updates-news"
          onClick={onClose}
          className="border-b border-sand/60 py-3 font-sans text-[14px] font-semibold tracking-[0.02em] text-navy"
        >
          Market Updates &amp; Guides
        </Link>
      </nav>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={BROKERAGE_INFO.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 bg-navy px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-white"
        >
          <MessageCircle className="h-4 w-4 text-gold" />
          <span>Message on WhatsApp</span>
        </a>
        <a
          href={BROKERAGE_INFO.officePhoneHref}
          className="inline-flex w-full items-center justify-center gap-2 border border-navy/30 px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy"
        >
          <Phone className="h-4 w-4" />
          <span>Call {BROKERAGE_INFO.officePhoneDisplay}</span>
        </a>
      </div>
    </div>
  );
}

