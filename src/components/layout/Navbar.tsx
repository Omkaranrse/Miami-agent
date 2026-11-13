"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";
import { MAIN_NAV_ITEMS } from "@/data/navigation";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";
import { EyeGlowButton } from "@/components/ui/EyeGlowButton";

function MoveMiamiPillLogo() {
  return (
    <span className="inline-flex flex-col items-center leading-none text-[#241748]">
      <span className="relative flex items-end gap-1 whitespace-nowrap font-sans text-[15px] font-extrabold tracking-[0.06em]">
        <span>MOVE</span>
        <svg
          width="22"
          height="24"
          viewBox="0 0 24 26"
          fill="none"
          aria-hidden="true"
          className="-mx-0.5 mb-px shrink-0 text-[#241748]"
        >
          <path
            d="M12 24C12.1 18.4 12.6 13.8 13.4 9.5"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <path
            d="M13.3 9.4C10.5 6.8 6.4 6.5 3.6 8.3C6.8 7.8 9.9 8.7 12.6 10.6C9.2 10.6 5.9 12 4.1 14.3C7.1 12.7 10.2 12 12.8 11.7"
            fill="currentColor"
          />
          <path
            d="M13.4 9.4C13.6 5.8 11.7 3 8.9 1.9C11.3 3.7 12.6 6.2 13 9.2"
            fill="currentColor"
          />
          <path
            d="M13.4 9.3C15.9 6 19.7 5.2 22.4 6.8C19.5 6.6 16.6 7.8 14.1 10.2C17.2 10 20.1 11.1 21.8 13.2C19.1 11.8 16.3 11.4 13.8 11.4"
            fill="currentColor"
          />
          <path
            d="M13.3 9.1C14.7 5.7 17.5 3.3 20.3 2.9C17.7 4.3 15.6 6.6 14 9.5"
            fill="currentColor"
          />
        </svg>
        <span>MIAMI</span>
      </span>
      <span className="mt-0.5 font-sans text-[8.5px] font-bold uppercase tracking-[0.42em] text-[#352366]/85">
        REALTOR
      </span>
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuState, setMenuState] = useState<{
    path: string;
    mobileOpen: boolean;
    openDropdown: string | null;
  }>({
    path: pathname,
    mobileOpen: false,
    openDropdown: null,
  });

  const mobileOpen = menuState.path === pathname && menuState.mobileOpen;
  const openDropdown =
    menuState.path === pathname ? menuState.openDropdown : null;

  const setMobileOpen = (value: boolean | ((prev: boolean) => boolean)) => {
    setMenuState((prev) => {
      const currentMobile = prev.path === pathname ? prev.mobileOpen : false;
      const nextMobile =
        typeof value === "function" ? value(currentMobile) : value;
      return {
        path: pathname,
        mobileOpen: nextMobile,
        openDropdown: prev.path === pathname ? prev.openDropdown : null,
      };
    });
  };

  const setOpenDropdown = (dropdown: string | null) => {
    setMenuState((prev) => ({
      path: pathname,
      mobileOpen: prev.path === pathname ? prev.mobileOpen : false,
      openDropdown: dropdown,
    }));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pillBackground = scrolled
    ? "radial-gradient(ellipse 32% 150% at 8% 50%, rgba(223, 213, 255, 0.94) 0%, rgba(255, 255, 255, 0) 70%), radial-gradient(ellipse 32% 150% at 92% 50%, rgba(217, 206, 255, 0.96) 0%, rgba(255, 255, 255, 0) 70%), rgba(252, 251, 255, 0.96)"
    : "radial-gradient(ellipse 32% 150% at 8% 50%, rgba(226, 217, 255, 0.86) 0%, rgba(255, 255, 255, 0) 70%), radial-gradient(ellipse 32% 150% at 92% 50%, rgba(220, 210, 255, 0.90) 0%, rgba(255, 255, 255, 0) 70%), rgba(255, 255, 255, 0.84)";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-6 lg:px-8">
      <div className="pointer-events-auto mx-auto max-w-7xl">
        <nav
          aria-label="Primary navigation"
          style={{
            background: pillBackground,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255, 255, 255, 0.92)",
            boxShadow: scrolled
              ? "0 20px 44px -16px rgba(36, 23, 72, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.95)"
              : "0 16px 38px -16px rgba(36, 23, 72, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.92)",
          }}
          className="relative flex h-[68px] items-center justify-between rounded-full px-5 transition-all duration-300 sm:px-7"
        >
          {/* Left Logo */}
          <Link
            href="/"
            aria-label="Move Miami Realtor Home"
            className="shrink-0 py-1 transition-opacity hover:opacity-85"
          >
            <MoveMiamiPillLogo />
          </Link>

          {/* Center Nav Links (Desktop) */}
          <ul className="hidden items-center gap-6 xl:gap-7 lg:flex">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.link ||
                (item.children?.some((c) => c.href === pathname) ?? false);
              const isDropdownOpen = openDropdown === item.title;

              if (item.children) {
                return (
                  <li
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.title)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="inline-flex items-center gap-1">
                      <Link
                        href={item.link}
                        className={`whitespace-nowrap font-sans text-[14px] font-semibold tracking-[0.01em] transition-colors ${
                          isActive
                            ? "text-[#4D2DB5]"
                            : "text-[#1F1B2E] hover:text-[#4D2DB5]"
                        }`}
                      >
                        {item.title}
                      </Link>
                      <button
                        type="button"
                        aria-label={`Toggle ${item.title} menu`}
                        aria-expanded={isDropdownOpen}
                        onClick={() =>
                          setOpenDropdown(isDropdownOpen ? null : item.title)
                        }
                        className="inline-flex items-center p-0.5 text-[#1F1B2E]/70 hover:text-[#4D2DB5]"
                      >
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute left-0 top-full pt-3">
                        <div className="w-56 rounded-2xl border border-[#E2DCF0] bg-white/95 p-2 shadow-xl backdrop-blur-md">
                          {item.children.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block rounded-xl px-3.5 py-2.5 font-sans text-[14px] font-semibold text-[#1F1B2E] transition-colors hover:bg-[#F3EFFC] hover:text-[#4D2DB5]"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.title}>
                  <Link
                    href={item.link}
                    className={`whitespace-nowrap font-sans text-[14px] font-semibold tracking-[0.01em] transition-colors ${
                      isActive
                        ? "text-[#4D2DB5]"
                        : "text-[#1F1B2E] hover:text-[#4D2DB5]"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Phone & WhatsApp Pill CTA */}
          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={BROKERAGE_INFO.officePhoneHref}
              className="inline-flex items-center gap-2 whitespace-nowrap font-sans text-[14px] font-semibold text-[#1F1B2E] transition-colors hover:text-[#4D2DB5]"
            >
              <Phone className="h-4 w-4 text-[#4D2DB5]" />
              <span>{BROKERAGE_INFO.officePhoneDisplay}</span>
            </a>

            <FluidGlassButton
              href={BROKERAGE_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-5 py-2.5 text-[14px]"
            >
              <MessageCircle className="h-4 w-4 fill-white/15" />
              <span>WhatsApp</span>
            </FluidGlassButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E2DCF0] bg-white/80 text-[#241748] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="mt-2.5 rounded-3xl border border-white/90 bg-white/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden">
            <ul className="space-y-1">
              {MAIN_NAV_ITEMS.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.link}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-3 py-2.5 font-sans text-[14px] font-semibold text-[#1F1B2E] hover:bg-[#F3EFFC] hover:text-[#4D2DB5]"
                  >
                    {item.title}
                  </Link>
                  {item.children && (
                    <div className="ml-4 border-l border-[#E2DCF0] pl-3">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-lg px-2.5 py-2 font-sans text-[14px] font-medium text-[#5C5570] hover:text-[#4D2DB5]"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-2.5 border-t border-[#E2DCF0] pt-4">
              <FluidGlassButton
                href={BROKERAGE_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-5 py-3 text-[14px]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </FluidGlassButton>
              <EyeGlowButton
                href={BROKERAGE_INFO.officePhoneHref}
                className="w-full text-[14px]"
              >
                <Phone className="h-4 w-4 text-[#4D2DB5]" />
                <span>Call {BROKERAGE_INFO.officePhoneDisplay}</span>
              </EyeGlowButton>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
