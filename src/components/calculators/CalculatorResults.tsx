import type { ReactNode } from "react";

interface ResultRow {
  label: string;
  value: string;
}

interface CalculatorResultsProps {
  eyebrow: string;
  headline: string;
  headlineSuffix?: string;
  subline?: string;
  rows: ResultRow[];
  actions: ReactNode;
}

export function CalculatorResults({
  eyebrow,
  headline,
  headlineSuffix,
  subline,
  rows,
  actions,
}: CalculatorResultsProps) {
  return (
    <div className="flex flex-col justify-between border border-navy bg-navy p-7 text-ivory lg:col-span-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </p>
        <p className="mt-2 font-sans text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {headline}
          {headlineSuffix && (
            <span className="text-lg font-medium text-ivory/65">
              {headlineSuffix}
            </span>
          )}
        </p>
        {subline && <p className="mt-2 text-xs text-ivory/70">{subline}</p>}

        <dl className="mt-8 space-y-3 border-t border-white/15 pt-5 text-sm">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between">
              <dt className="text-ivory/75">{row.label}</dt>
              <dd className="font-medium text-white">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-8 border-t border-white/15 pt-5">{actions}</div>
    </div>
  );
}

