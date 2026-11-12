"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, eyebrow, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Modal dialog"}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl border border-gold/30 bg-navy text-ivory shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
          <div>
            {eyebrow && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                {eyebrow}
              </p>
            )}
            {title && (
              <h3 className="mt-0.5 font-sans text-lg font-semibold text-white sm:text-xl">
                {title}
              </h3>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-white/20 text-white hover:border-gold hover:text-gold"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

