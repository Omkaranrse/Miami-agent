import type { ReactNode } from "react";

interface RangeInputProps {
  id: string;
  label: string;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export function CalculatorRangeInput({
  id,
  label,
  displayValue,
  min,
  max,
  step,
  value,
  onChange,
}: RangeInputProps) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <label htmlFor={id} className="font-semibold text-navy">
          {label}
        </label>
        <span className="font-sans text-xl font-bold tracking-tight text-navy">
          {displayValue}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-navy"
      />
    </div>
  );
}

interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

export function CalculatorNumberInput({
  id,
  label,
  value,
  min = 0,
  max,
  step = 1,
  onChange,
}: NumberInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const parsed = Number(e.target.value);
          onChange(Number.isFinite(parsed) ? Math.max(min, parsed) : min);
        }}
        className="mt-1.5 w-full border border-sand bg-ivory/60 px-3.5 py-2.5 text-sm text-charcoal focus:border-navy focus:outline-none"
      />
    </div>
  );
}

export function CalculatorInputs({ children }: { children: ReactNode }) {
  return <div className="space-y-6 lg:col-span-7">{children}</div>;
}

