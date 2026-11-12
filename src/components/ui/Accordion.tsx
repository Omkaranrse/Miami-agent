"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-sand border-y border-sand">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-5">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="font-sans text-lg font-semibold text-navy">
                {item.question}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-gold-dark transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="body-editorial mt-3 pr-8 text-charcoal/80">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

