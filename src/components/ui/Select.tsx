import { forwardRef, type SelectHTMLAttributes, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  darkSurface?: boolean;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, darkSurface = false, id, className = "", children, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`mb-1.5 block font-sans text-[11px] font-bold uppercase tracking-[0.16em] ${
            darkSurface ? "text-white/80" : "text-[#3D2577]"
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={id}
          className={`w-full appearance-none rounded-2xl border font-sans text-[14px] sm:text-[15px] px-4 py-3.5 pr-10 transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
            darkSurface
              ? "border-white/20 bg-[#1A0C38] text-white focus:border-[#A87FFB] focus:ring-4 focus:ring-[#7C52EB]/25"
              : "border-[#E5DBFB] bg-white/90 text-[#171536] shadow-[inset_0_2px_4px_rgba(40,15,90,0.02)] focus:border-[#7C52EB] focus:bg-white focus:ring-4 focus:ring-[#7C52EB]/15"
          } ${className}`}
          {...props}
        >
          {children}
        </select>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#7C52EB]"
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {error && (
        <p className="mt-1.5 font-sans text-[12px] font-medium text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
});

