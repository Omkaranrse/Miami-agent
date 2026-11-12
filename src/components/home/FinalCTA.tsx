import Link from "next/link";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";

interface FinalCTAProps {
  headline?: string;
  subcopy?: string;
}

export function FinalCTA({
  headline = "Let’s Make Your Next Move.",
  subcopy = "Whether you’re buying, selling, or exploring your options in Miami, our team is ready to help.",
}: FinalCTAProps) {
  return (
    <section className="border-t border-sand bg-navy py-20 text-ivory md:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
          <span>Direct Access</span>
          <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
        </div>

        <h2 className="heading-section mt-4 text-white">
          {headline}
        </h2>
        <p className="body-editorial mx-auto mt-5 max-w-2xl text-ivory/80">
          {subcopy}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={BROKERAGE_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 bg-gold px-7 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy transition-colors hover:bg-white sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Message on WhatsApp</span>
          </a>

          <a
            href={BROKERAGE_INFO.officePhoneHref}
            className="inline-flex w-full items-center justify-center gap-2.5 border border-white/25 px-7 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-white transition-colors hover:border-gold hover:text-gold sm:w-auto"
          >
            <Phone className="h-4 w-4" />
            <span>Call {BROKERAGE_INFO.officePhoneDisplay}</span>
          </a>

          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 border border-white/25 px-7 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-white transition-colors hover:border-gold hover:text-gold sm:w-auto"
          >
            <span>Send a Message</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
