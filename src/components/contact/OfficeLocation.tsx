import { ArrowUpRight } from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";

export function OfficeLocation() {
  return (
    <div className="mt-16 border border-sand bg-ivory">
      <div className="flex flex-col justify-between gap-2 border-b border-sand px-6 py-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
            Office Location
          </p>
          <p className="font-sans text-lg font-semibold text-navy">
            {BROKERAGE_INFO.fullAddress}
          </p>
        </div>
        <a
          href="https://maps.google.com/?q=8660+W+Flagler+St+Suite+100+Miami+FL+33144"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold tracking-[0.03em] text-navy hover:text-gold-dark"
        >
          <span>Open in Google Maps</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
      <div className="h-[360px] w-full bg-sand-light">
        <iframe
          title="Move Miami Realtor Office Map — 8660 W Flagler St, Suite 100, Miami, FL 33144"
          src="https://maps.google.com/maps?q=8660%20W%20Flagler%20St%20Suite%20100,%20Miami,%20FL%2033144&t=&z=14&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}

