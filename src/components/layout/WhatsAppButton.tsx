import { MessageCircle } from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";

interface WhatsAppButtonProps {
  label?: string;
  message?: string;
  variant?: "primary" | "gold" | "outline";
  className?: string;
}

export function WhatsAppButton({
  label = "Message on WhatsApp",
  message,
  variant = "primary",
  className = "",
}: WhatsAppButtonProps) {
  const href = message
    ? `${BROKERAGE_INFO.whatsappHref}?text=${encodeURIComponent(message)}`
    : BROKERAGE_INFO.whatsappHref;

  const tone =
    variant === "gold"
      ? "bg-gold text-navy hover:bg-white"
      : variant === "outline"
      ? "border border-sand bg-white text-navy hover:border-navy"
      : "bg-navy text-white hover:bg-navy-light";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] transition-colors ${tone} ${className}`}
    >
      <MessageCircle className="h-4 w-4 shrink-0 text-gold" />
      <span>{label}</span>
    </a>
  );
}

