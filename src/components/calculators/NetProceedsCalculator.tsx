"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BROKERAGE_INFO } from "@/lib/constants";
import { formatCurrency } from "@/utils/formatCurrency";

interface SliderInputProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
  isPercent?: boolean;
}

function CurrencyOrPercentInput({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  isPercent = false,
}: SliderInputProps) {
  const [localInput, setLocalInput] = useState(
    isPercent ? `${value}%` : formatCurrency(value)
  );
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setLocalInput(isPercent ? `${value.toFixed(1)}%` : formatCurrency(value));
    }
  }, [value, isPercent, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setLocalInput(e.target.value);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      const clamped = Math.max(0, parsed);
      onChange(clamped);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    const raw = localInput.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(raw);
    const valid = isNaN(parsed) ? min : Math.min(Math.max(parsed, min), max);
    onChange(valid);
    setLocalInput(isPercent ? `${valid.toFixed(1)}%` : formatCurrency(valid));
  };

  const progressPercent = Math.min(
    100,
    Math.max(0, ((value - min) / (max - min)) * 100)
  );

  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-navy"
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={`${id}-input`}
            type="text"
            value={localInput}
            onFocus={() => {
              setIsFocused(true);
              setLocalInput(value.toString());
            }}
            onChange={handleInputChange}
            onBlur={handleBlur}
            aria-label={`${label} numeric field`}
            className="w-32 border-b border-sand bg-transparent pb-0.5 text-right font-sans text-lg font-bold tracking-tight text-navy transition-colors focus:border-navy focus:outline-none sm:w-40 sm:text-xl"
          />
        </div>
      </div>

      {/* Sleek Custom Range Track */}
      <div className="relative pt-1">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #8055E8 0%, #8055E8 ${progressPercent}%, #E2DCF0 ${progressPercent}%, #E2DCF0 100%)`,
          }}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full accent-[#8055E8] focus:outline-none"
        />
        <div className="mt-1 flex justify-between text-[11px] font-medium text-muted/70">
          <span>{isPercent ? `${min}%` : formatCurrency(min)}</span>
          <span>{isPercent ? `${max}%` : formatCurrency(max)}</span>
        </div>
      </div>
    </div>
  );
}

function AnimatedAmount({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    let startTimestamp: number | null = null;
    const startValue = displayValue;
    const duration = 350;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (value - startValue) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [value, shouldReduceMotion, displayValue]);

  return (
    <span>
      {displayValue >= 0
        ? formatCurrency(displayValue)
        : `-${formatCurrency(Math.abs(displayValue))}`}
    </span>
  );
}

export function NetProceedsCalculator() {
  // Default values matching prompt and existing configuration:
  // Sale Price: $950,000
  // Mortgage Payoff: $410,000
  // Brokerage Fee: 5.5%
  // Title & Doc Stamps: 1.5%
  // Prep / Credits: $5,000
  const [salePrice, setSalePrice] = useState(950000);
  const [mortgagePayoff, setMortgagePayoff] = useState(410000);
  const [commissionRate, setCommissionRate] = useState(5.5);
  const [closingCostsPercent, setClosingCostsPercent] = useState(1.5);
  const [repairsCredits, setRepairsCredits] = useState(5000);

  // Exact calculations
  const commissionCost = salePrice * (commissionRate / 100);
  const sellerClosingCosts = salePrice * (closingCostsPercent / 100);
  const estimatedNetProceeds =
    salePrice -
    mortgagePayoff -
    commissionCost -
    sellerClosingCosts -
    repairsCredits;

  // Proportions for segmented distribution bar
  const totalBase = Math.max(salePrice, 1);
  const mortgagePct = Math.max(0, (mortgagePayoff / totalBase) * 100);
  const commissionPct = Math.max(0, (commissionCost / totalBase) * 100);
  const closingPct = Math.max(0, (sellerClosingCosts / totalBase) * 100);
  const repairsPct = Math.max(0, (repairsCredits / totalBase) * 100);
  const proceedsPct = Math.max(
    0,
    (Math.max(0, estimatedNetProceeds) / totalBase) * 100
  );

  return (
    <div className="space-y-12">
      {/* Two-Column Integrated Calculator Workspace */}
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left Column — Your Property Numbers */}
        <div className="space-y-8 lg:col-span-7">
          <div className="border-b border-sand/70 pb-4">
            <h2 className="font-serif text-2xl font-normal text-navy sm:text-3xl">
              Your property numbers.
            </h2>
            <p className="mt-1 font-sans text-xs font-light text-muted sm:text-sm">
              Adjust sliders or type directly to model your walk-away net equity.
            </p>
          </div>

          <div className="space-y-7">
            {/* 1. Estimated Sale Price */}
            <CurrencyOrPercentInput
              id="net-sale-price"
              label="Estimated Sale Price"
              value={salePrice}
              min={250000}
              max={6000000}
              step={25000}
              onChange={setSalePrice}
            />

            {/* 2. Remaining Mortgage Payoff */}
            <CurrencyOrPercentInput
              id="net-mortgage-payoff"
              label="Remaining Mortgage Payoff"
              value={mortgagePayoff}
              min={0}
              max={4000000}
              step={10000}
              onChange={setMortgagePayoff}
            />

            {/* 3. Total Brokerage Fee (%) */}
            <CurrencyOrPercentInput
              id="net-commission-rate"
              label="Total Brokerage Fee"
              value={commissionRate}
              min={0}
              max={7}
              step={0.5}
              onChange={setCommissionRate}
              isPercent
            />

            {/* 4. Title & Doc Stamps (%) */}
            <CurrencyOrPercentInput
              id="net-closing-percent"
              label="Title & Doc Stamps (Miami-Dade / FL)"
              value={closingCostsPercent}
              min={0.5}
              max={4}
              step={0.25}
              onChange={setClosingCostsPercent}
              isPercent
            />

            {/* 5. Prep / Buyer Credits ($) */}
            <div className="space-y-2 border-t border-sand/50 pt-5">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <label
                    htmlFor="net-prep-credits"
                    className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-navy"
                  >
                    Prep / Buyer Credits ($)
                  </label>
                  <p className="font-sans text-[11px] font-light text-muted">
                    Pre-listing paint, staging, repairs, or buyer concessions
                  </p>
                </div>
                <input
                  id="net-prep-credits"
                  type="text"
                  value={formatCurrency(repairsCredits)}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    const parsed = parseFloat(raw);
                    setRepairsCredits(isNaN(parsed) ? 0 : parsed);
                  }}
                  className="w-32 border-b border-sand bg-transparent pb-0.5 text-right font-sans text-lg font-bold tracking-tight text-navy transition-colors focus:border-navy focus:outline-none sm:w-40 sm:text-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Estimated Walk-Away Proceeds */}
        <div className="relative overflow-hidden rounded-xs bg-navy p-8 text-ivory shadow-xl sm:p-10 lg:col-span-5 lg:sticky lg:top-36">
          {/* Subtle Ambient Lighting Aura */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/15 blur-[90px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#8055E8]/20 blur-[90px]"
          />

          <div className="relative z-10">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              Estimated Walk-Away Proceeds
            </span>

            {/* Primary Calculated Metric with Count-Up */}
            <p className="mt-3 font-sans text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[54px]">
              <AnimatedAmount value={estimatedNetProceeds} />
            </p>

            <p className="mt-2 font-sans text-xs font-light text-ivory/70">
              Estimated net cash returned at closing based on your inputs.
            </p>

            {/* Dynamic Deduction Breakdown List */}
            <dl className="mt-8 space-y-3.5 border-t border-white/15 pt-6 font-sans text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ivory/80">Gross Sale Price</dt>
                <dd className="font-semibold text-white">
                  {formatCurrency(salePrice)}
                </dd>
              </div>

              <div className="flex items-center justify-between text-ivory/70">
                <dt>Mortgage Payoff</dt>
                <dd className="font-medium text-white">
                  -{formatCurrency(mortgagePayoff)}
                </dd>
              </div>

              <div className="flex items-center justify-between text-ivory/70">
                <dt>Brokerage Fee ({commissionRate.toFixed(1)}%)</dt>
                <dd className="font-medium text-white">
                  -{formatCurrency(commissionCost)}
                </dd>
              </div>

              <div className="flex items-center justify-between text-ivory/70">
                <dt>Est. Closing &amp; Doc Stamps ({closingCostsPercent.toFixed(1)}%)</dt>
                <dd className="font-medium text-white">
                  -{formatCurrency(sellerClosingCosts)}
                </dd>
              </div>

              <div className="flex items-center justify-between text-ivory/70">
                <dt>Repairs / Buyer Credits</dt>
                <dd className="font-medium text-white">
                  -{formatCurrency(repairsCredits)}
                </dd>
              </div>
            </dl>

            {/* Contextual Actions */}
            <div className="mt-9 grid grid-cols-1 gap-3 border-t border-white/15 pt-6 sm:grid-cols-2">
              <Link
                href="/home-valuation"
                className="group inline-flex items-center justify-center gap-2 bg-gold px-4 py-3.5 text-center font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-all duration-300 hover:bg-white"
              >
                <span>Free Valuation</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/cash-offer"
                className="inline-flex items-center justify-center border border-white/30 px-4 py-3.5 text-center font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-gold hover:text-gold"
              >
                <span>Cash Offer</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Visualization — Proportional Horizontal Distribution Bar */}
      <div className="border-t border-sand/70 pt-10">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-normal text-navy sm:text-2xl">
              Sale Price Distribution
            </h3>
            <p className="font-sans text-xs font-light text-muted">
              Proportional breakdown of gross equity allocation at closing.
            </p>
          </div>
          <span className="font-sans text-xs font-semibold text-navy">
            Total: {formatCurrency(salePrice)}
          </span>
        </div>

        {/* Proportional Segmented Bar */}
        <div className="mt-4 flex h-4 w-full overflow-hidden rounded-full bg-sand-light/70 shadow-inner">
          {/* 1. Walk-Away Proceeds (Emphasized Signature Purple) */}
          <motion.div
            style={{ width: `${proceedsPct}%` }}
            className="h-full bg-gradient-to-r from-[#8055E8] to-[#5E3FD6] transition-all duration-300"
            title={`Walk-Away Proceeds: ${formatCurrency(Math.max(0, estimatedNetProceeds))}`}
          />
          {/* 2. Mortgage Payoff (Muted Navy) */}
          <motion.div
            style={{ width: `${mortgagePct}%` }}
            className="h-full bg-navy/80 transition-all duration-300"
            title={`Mortgage Payoff: ${formatCurrency(mortgagePayoff)}`}
          />
          {/* 3. Brokerage Fee (Secondary Purple) */}
          <motion.div
            style={{ width: `${commissionPct}%` }}
            className="h-full bg-[#7355A7] transition-all duration-300"
            title={`Brokerage Fee: ${formatCurrency(commissionCost)}`}
          />
          {/* 4. Closing & Doc Stamps (Light Lilac) */}
          <motion.div
            style={{ width: `${closingPct}%` }}
            className="h-full bg-[#B8A4D9] transition-all duration-300"
            title={`Closing & Doc Stamps: ${formatCurrency(sellerClosingCosts)}`}
          />
          {/* 5. Repairs & Credits (Neutral Slate) */}
          <motion.div
            style={{ width: `${repairsPct}%` }}
            className="h-full bg-[#D1C7E2] transition-all duration-300"
            title={`Repairs & Credits: ${formatCurrency(repairsCredits)}`}
          />
        </div>

        {/* Compact Legend */}
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
          {/* Proceeds */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#8055E8]" />
            <span className="font-semibold text-navy">
              Walk-Away Proceeds: {formatCurrency(Math.max(0, estimatedNetProceeds))} ({proceedsPct.toFixed(1)}%)
            </span>
          </div>

          {/* Mortgage */}
          <div className="flex items-center gap-2 text-charcoal/80">
            <span className="h-3 w-3 rounded-full bg-navy/80" />
            <span>Mortgage Payoff: {formatCurrency(mortgagePayoff)} ({mortgagePct.toFixed(1)}%)</span>
          </div>

          {/* Brokerage */}
          <div className="flex items-center gap-2 text-charcoal/80">
            <span className="h-3 w-3 rounded-full bg-[#7355A7]" />
            <span>Brokerage Fee: {formatCurrency(commissionCost)} ({commissionPct.toFixed(1)}%)</span>
          </div>

          {/* Closing */}
          <div className="flex items-center gap-2 text-charcoal/80">
            <span className="h-3 w-3 rounded-full bg-[#B8A4D9]" />
            <span>Closing &amp; Stamps: {formatCurrency(sellerClosingCosts)} ({closingPct.toFixed(1)}%)</span>
          </div>

          {/* Repairs */}
          {repairsCredits > 0 && (
            <div className="flex items-center gap-2 text-charcoal/80">
              <span className="h-3 w-3 rounded-full bg-[#D1C7E2]" />
              <span>Prep / Credits: {formatCurrency(repairsCredits)} ({repairsPct.toFixed(1)}%)</span>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer & WhatsApp Action */}
      <div className="flex flex-col justify-between gap-4 border-t border-sand/70 pt-6 text-xs text-muted sm:flex-row sm:items-center">
        <p className="max-w-xl font-light">
          These figures are planning estimates only and do not constitute
          lending approval or legal/tax advice.
        </p>

        <a
          href={BROKERAGE_INFO.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 font-sans font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:text-gold-dark"
        >
          <MessageCircle className="h-4 w-4 text-gold-dark" />
          <span>Talk Through Your Numbers</span>
        </a>
      </div>
    </div>
  );
}

