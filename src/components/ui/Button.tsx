import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "gold" | "outline" | "outline-light";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy-light",
  gold: "bg-gold text-navy hover:bg-white",
  outline: "border border-sand bg-white text-navy hover:border-navy",
  "outline-light":
    "border border-white/30 bg-transparent text-white hover:border-gold hover:text-gold",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[14px]",
  md: "px-6 py-3.5 text-[14px]",
  lg: "px-7 py-4 text-[14px]",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 font-sans text-[14px] font-semibold tracking-[0.04em] transition-colors disabled:opacity-60";

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

