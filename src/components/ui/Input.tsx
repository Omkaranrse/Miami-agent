import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  darkSurface?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, darkSurface = false, id, className = "", ...props },
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
      <input
        ref={ref}
        id={id}
        className={`mt-1.5 w-full border px-3.5 py-3 text-sm transition-colors focus:outline-none ${
          darkSurface
            ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-gold"
            : "border-sand bg-ivory/60 text-charcoal placeholder:text-muted/70 focus:border-navy focus:bg-white"
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
});

