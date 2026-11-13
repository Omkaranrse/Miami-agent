import Image from "next/image";
import { Check, Sparkles, Compass } from "lucide-react";
import type { Property } from "@/types/property";

export function PropertyFeatures({ property }: { property: Property }) {
  return (
    <>
      {property.highlights && property.highlights.length > 0 && (
        <div className="mt-8 rounded-[28px] border border-white/90 bg-white/90 p-7 shadow-[0_20px_50px_-16px_rgba(52,30,114,0.12)] backdrop-blur-md sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E4D7FF] bg-[#F3ECFF] px-3.5 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#5B2EC6]" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#4C2B9A]">
              Key Highlights
            </span>
          </div>

          <h3 className="mt-4 font-sans text-2xl font-bold tracking-tight text-[#160B30]">
            Distinctive Features &amp; Finishes
          </h3>

          <ul className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {property.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-[#E5DBFB]/60 bg-white/60 p-3.5 shadow-2xs backdrop-blur-xs transition-colors hover:border-[#7C52EB]/30 hover:bg-white"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F3ECFF] text-[#5B2EC6]">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="font-sans text-[14px] font-semibold text-[#160B30]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {property.conceptRenderings && property.conceptRenderings.length > 0 && (
        <div className="mt-8 rounded-[28px] border border-white/90 bg-white/90 p-7 shadow-[0_20px_50px_-16px_rgba(52,30,114,0.12)] backdrop-blur-md sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E4D7FF] bg-[#F3ECFF] px-3.5 py-1.5">
            <Compass className="h-3.5 w-3.5 text-[#5B2EC6]" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#4C2B9A]">
              Architectural Concept Renderings
            </span>
          </div>

          <h3 className="mt-4 font-sans text-2xl font-bold tracking-tight text-[#160B30]">
            Redevelopment &amp; Future Vision
          </h3>

          <p className="mt-2.5 font-sans text-[15px] leading-relaxed text-[#51476E]">
            Architectural concept renderings demonstrating potential
            redevelopment scale, luxury finishes, and landscaping vision for
            this estate property.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {property.conceptRenderings.map((src, i) => (
              <div
                key={src}
                className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/80 bg-[#EDE5FA] shadow-md"
              >
                <Image
                  src={src}
                  alt={`${property.address} architectural concept ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
