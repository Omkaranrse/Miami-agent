import { forwardRef, type SelectHTMLAttributes, type ReactNode } from "react";

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
    <div>
      {label && (
        <label
          htmlFor={id}
          className={`block text-xs font-semibold uppercase tracking-[0.14em] ${
            darkSurface ? "text-ivory/80" : "text-navy"
          }`}
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={`mt-1.5 w-full border px-3.5 py-3 text-sm transition-colors focus:outline-none ${
          darkSurface
            ? "border-white/20 bg-white/10 text-white focus:border-gold"
            : "border-sand bg-ivory/60 text-charcoal focus:border-navy focus:bg-white"
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
});

