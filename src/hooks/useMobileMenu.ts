"use client";

import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

export function useMobileMenu() {
  const pathname = usePathname();
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const isOpen = openForPath === pathname;

  const toggle = useCallback(() => {
    setOpenForPath((prev) => (prev === pathname ? null : pathname));
  }, [pathname]);

  const close = useCallback(() => {
    setOpenForPath(null);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return { isOpen, toggle, close };
}

