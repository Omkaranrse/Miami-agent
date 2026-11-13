import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "outline" | "outline-light";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-[#321477] via-[#5B2EC6] to-[#7C52EB] text-white shadow-[0_10px_25px_-5px_rgba(91,46,198,0.35)] hover:shadow-[0_14px_30px_-5px_rgba(91,46,198,0.48)] hover:brightness-105 active:scale-[0.98]",
  secondary:
    "border border-[#E5DBFB] bg-white/90 text-[#1A0C38] shadow-[0_4px_14px_rgba(36,20,92,0.06)] hover:border-[#7C52EB] hover:bg-white hover:text-[#5B2EC6] active:scale-[0.98] backdrop-blur-md",
  ghost:
    "bg-transparent text-[#24145C] hover:bg-[#F4EEFD] hover:text-[#5B2EC6] active:scale-[0.98]",
  gold:
    "bg-gradient-to-r from-[#5B2EC6] via-[#7C52EB] to-[#9D76FA] text-white shadow-[0_8px_20px_-4px_rgba(91,46,198,0.3)] hover:brightness-105 active:scale-[0.98]",
  outline:
    "border border-[#DCD0FA] bg-white/80 text-[#1A0C38] hover:border-[#5B2EC6] hover:bg-white hover:text-[#5B2EC6] active:scale-[0.98] backdrop-blur-sm",
  "outline-light":
    "border border-white/40 bg-white/10 text-white hover:border-white hover:bg-white/20 active:scale-[0.98] backdrop-blur-md",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-3 text-[14px]",
  lg: "px-7 py-3.5 sm:py-4 text-[14px] sm:text-[15px]",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold tracking-[0.03em] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LinkButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

export function Button(props: ButtonProps | LinkButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...anchorRest } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = props;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}

