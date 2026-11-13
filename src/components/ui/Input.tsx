import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  darkSurface?: boolean;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, darkSurface = false, icon, id, className = "", ...props },
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
        {icon && (
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 ${
              darkSurface ? "text-white/40" : "text-[#7C52EB]"
            }`}
          >
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full rounded-2xl border font-sans text-[14px] sm:text-[15px] transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
            icon ? "pl-11 pr-4" : "px-4"
          } py-3.5 ${
            darkSurface
              ? "border-white/20 bg-white/10 text-white placeholder-white/45 focus:border-[#A87FFB] focus:bg-white/15 focus:ring-4 focus:ring-[#7C52EB]/25"
              : "border-[#E5DBFB] bg-white/90 text-[#171536] placeholder-[#8F84A8] shadow-[inset_0_2px_4px_rgba(40,15,90,0.02)] focus:border-[#7C52EB] focus:bg-white focus:ring-4 focus:ring-[#7C52EB]/15"
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 font-sans text-[12px] font-medium text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
});

