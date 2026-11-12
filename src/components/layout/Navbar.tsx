"use client";

import { BROKERAGE_INFO } from "@/lib/constants";
import { MAIN_NAV_ITEMS } from "@/data/navigation";
import { GradientNavbar } from "./GradientNavbar";

export function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="pointer-events-auto mx-auto max-w-7xl">
        <GradientNavbar
          logo={{
            type: "image",
            react: true,
            height: 36,
            link: "/",
            image: {
              src: "/images/brand/logo-white.png",
              alt: "Move Miami Realtor",
              width: 150,
              height: 52,
            },
          }}
          items={MAIN_NAV_ITEMS}
          cta={{
            show: true,
            label: "WhatsApp",
            link: BROKERAGE_INFO.whatsappHref,
            newTab: true,
            tint: "#7C5CFF",
            fill: "#FFFFFF",
            hoverFill: "#D4C6FF",
            text: "#241748",
            radius: "999px",
            padding: "11px 22px 11px 22px",
          }}
          links={{
            text: "rgba(249, 248, 252, 0.85)",
            hoverText: "#FFFFFF",
            align: "center",
            gap: 4,
          }}
          font={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.02em",
            lineHeight: "1.2",
            textTransform: "none",
          }}
          gradient={{
            base: "#241748",
            color1: "#2F1D61",
            color2: "#482D8F",
            color3: "#6640BE",
            color4: "#A78BFA",
            shift: 78,
            glow: true,
            ease: 1.2,
            drift: 32,
            scale: 100,
            mouse: 35,
          }}
          bar={{
            padding: "10px 12px 10px 24px",
            radius: "999px",
            border: {
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "rgba(212, 198, 255, 0.25)",
            },
            shadow: "0px 16px 36px -16px rgba(20, 10, 48, 0.68)",
          }}
          mobile={{
            collapse: 880,
            icon: "#F9F8FC",
            radius: 28,
          }}
        />
      </div>
    </header>
  );
}
