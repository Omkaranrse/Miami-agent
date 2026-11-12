import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AnnouncementBarProps {
  text?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function AnnouncementBar({
  text = "Attorney-led real estate representation across Miami-Dade & Broward.",
  actionLabel = "Request a 72-Hour Cash Offer",
  actionHref = "/cash-offer",
}: AnnouncementBarProps) {
  return (
    <div className="border-b border-sand bg-navy-light px-4 py-2.5 text-center text-xs text-ivory/90">
      <span>{text} </span>
      <Link
        href={actionHref}
        className="inline-flex items-center gap-1 font-semibold text-gold underline decoration-gold/50 underline-offset-4 hover:text-white"
      >
        <span>{actionLabel}</span>
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

