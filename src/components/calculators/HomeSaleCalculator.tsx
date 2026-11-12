"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, DollarSign, Home, MessageCircle } from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  CalculatorInputs,
  CalculatorNumberInput,
  CalculatorRangeInput,
} from "./CalculatorInputs";
import { CalculatorResults } from "./CalculatorResults";

export type CalculatorTab = "mortgage" | "affordability" | "net-proceeds";

interface HomeSaleCalculatorProps {
  initialTab?: CalculatorTab;
  showTabs?: boolean;
}

export function HomeSaleCalculator({
  initialTab = "mortgage",
  showTabs = true,
}: HomeSaleCalculatorProps) {
  const [activeTab, setActiveTab] = useState<CalculatorTab>(initialTab);

  // 1. Mortgage Payment State
  const [homePrice, setHomePrice] = useState(850000);
  const [downPercent, setDownPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [annualTaxes, setAnnualTaxes] = useState(11500);
  const [annualInsurance, setAnnualInsurance] = useState(6000);
  const [monthlyHoa, setMonthlyHoa] = useState(0);

  const downAmount = homePrice * (downPercent / 100);
  const loanAmount = Math.max(0, homePrice - downAmount);
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  const monthlyPI =
    monthlyRate === 0
      ? loanAmount / totalPayments
      : (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);

  const monthlyTaxes = annualTaxes / 12;
  const monthlyInsurance = annualInsurance / 12;
  const totalMonthlyPayment =
    monthlyPI + monthlyTaxes + monthlyInsurance + monthlyHoa;

  // 2. Affordability State
  const [annualIncome, setAnnualIncome] = useState(220000);
  const [monthlyDebts, setMonthlyDebts] = useState(900);
  const [availDownPayment, setAvailDownPayment] = useState(180000);
  const [affordRate, setAffordRate] = useState(6.5);
  const [maxDtiPercent, setMaxDtiPercent] = useState(36);

  const grossMonthlyIncome = annualIncome / 12;
  const maxTotalDebtPayment = grossMonthlyIncome * (maxDtiPercent / 100);
  const maxHousingBudget = Math.max(
    0,
    Math.min(grossMonthlyIncome * 0.31, maxTotalDebtPayment - monthlyDebts)
  );
  const estTaxesAndInsMonthly = maxHousingBudget * 0.24;
  const maxPIBudget = Math.max(0, maxHousingBudget - estTaxesAndInsMonthly);
  const affordMonthlyRate = affordRate / 100 / 12;
  const maxLoanFromPI =
    affordMonthlyRate === 0
      ? maxPIBudget * 360
      : (maxPIBudget * (Math.pow(1 + affordMonthlyRate, 360) - 1)) /
        (affordMonthlyRate * Math.pow(1 + affordMonthlyRate, 360));
  const estimatedMaxPrice = maxLoanFromPI + availDownPayment;

  // 3. Seller Net Proceeds State
  const [salePrice, setSalePrice] = useState(950000);
  const [mortgagePayoff, setMortgagePayoff] = useState(410000);
  const [commissionRate, setCommissionRate] = useState(5.5);
  const [closingCostsPercent, setClosingCostsPercent] = useState(1.5);
  const [repairsCredits, setRepairsCredits] = useState(5000);

  const commissionCost = salePrice * (commissionRate / 100);
  const sellerClosingCosts = salePrice * (closingCostsPercent / 100);
  const estimatedNetProceeds =
    salePrice -
    mortgagePayoff -
    commissionCost -
    sellerClosingCosts -
    repairsCredits;

  const tabs: Array<{
    id: CalculatorTab;
    label: string;
    subtitle: string;
    icon: typeof Calculator;
  }> = [
    {
      id: "mortgage",
      label: "Mortgage Payment",
      subtitle: "For Buyers",
      icon: Home,
    },
    {
      id: "affordability",
      label: "Affordability",
      subtitle: "For Buyers",
      icon: Calculator,
    },
    {
      id: "net-proceeds",
      label: "Home Sale Net Proceeds",
      subtitle: "For Sellers",
      icon: DollarSign,
    },
  ];

  return (
    <div>
      {showTabs && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-between border p-5 text-left transition-colors ${
                  isActive
                    ? "border-navy bg-navy text-white"
                    : "border-sand bg-white text-charcoal hover:border-navy"
                }`}
              >
                <div>
                  <p
                    className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                      isActive ? "text-gold" : "text-gold-dark"
                    }`}
                  >
                    {tab.subtitle}
                  </p>
                  <p
                    className={`mt-1 font-sans text-xl font-semibold ${
                      isActive ? "text-white" : "text-navy"
                    }`}
                  >
                    {tab.label}
                  </p>
                </div>
                <Icon
                  className={`h-5 w-5 ${isActive ? "text-gold" : "text-navy"}`}
                />
              </button>
            );
          })}
        </div>
      )}

      <div
        className={`${showTabs ? "mt-8" : ""} border border-sand bg-white p-6 sm:p-10`}
      >
        {activeTab === "mortgage" && (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <CalculatorInputs>
              <CalculatorRangeInput
                id="calc-home-price"
                label="Purchase Price"
                displayValue={formatCurrency(homePrice)}
                min={250000}
                max={6000000}
                step={25000}
                value={homePrice}
                onChange={setHomePrice}
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <CalculatorRangeInput
                  id="calc-down"
                  label={`Down Payment (${downPercent}%)`}
                  displayValue={formatCurrency(downAmount)}
                  min={3}
                  max={50}
                  step={1}
                  value={downPercent}
                  onChange={setDownPercent}
                />

                <CalculatorRangeInput
                  id="calc-rate"
                  label="Interest Rate"
                  displayValue={`${interestRate.toFixed(2)}%`}
                  min={3.5}
                  max={9.5}
                  step={0.125}
                  value={interestRate}
                  onChange={setInterestRate}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="calc-term"
                    className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy"
                  >
                    Loan Term
                  </label>
                  <select
                    id="calc-term"
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    className="mt-1.5 w-full border border-sand bg-ivory/60 px-3.5 py-2.5 text-sm text-charcoal focus:border-navy focus:outline-none"
                  >
                    <option value={30}>30-Year Fixed</option>
                    <option value={20}>20-Year Fixed</option>
                    <option value={15}>15-Year Fixed</option>
                  </select>
                </div>

                <CalculatorNumberInput
                  id="calc-hoa"
                  label="Monthly HOA / Condo Fee ($)"
                  value={monthlyHoa}
                  onChange={setMonthlyHoa}
                />

                <CalculatorNumberInput
                  id="calc-tax"
                  label="Est. Annual Property Taxes ($)"
                  value={annualTaxes}
                  onChange={setAnnualTaxes}
                />

                <CalculatorNumberInput
                  id="calc-ins"
                  label="Est. Annual Insurance ($)"
                  value={annualInsurance}
                  onChange={setAnnualInsurance}
                />
              </div>
            </CalculatorInputs>

            <CalculatorResults
              eyebrow="Estimated Monthly Cost"
              headline={formatCurrency(totalMonthlyPayment)}
              headlineSuffix="/mo"
              subline={`Loan amount: ${formatCurrency(loanAmount)}`}
              rows={[
                { label: "Principal & Interest", value: formatCurrency(monthlyPI) },
                { label: "Property Taxes", value: formatCurrency(monthlyTaxes) },
                {
                  label: "Homeowners Insurance",
                  value: formatCurrency(monthlyInsurance),
                },
                { label: "HOA / Condo Dues", value: formatCurrency(monthlyHoa) },
              ]}
              actions={
                <Link
                  href="/buy"
                  className="inline-flex w-full items-center justify-center bg-gold px-5 py-3.5 text-center font-sans text-[14px] font-semibold tracking-[0.04em] text-navy hover:bg-white"
                >
                  Request Curated Miami Homes in This Range
                </Link>
              }
            />
          </div>
        )}

        {activeTab === "affordability" && (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <CalculatorInputs>
              <CalculatorRangeInput
                id="afford-income"
                label="Gross Annual Household Income"
                displayValue={formatCurrency(annualIncome)}
                min={60000}
                max={1000000}
                step={5000}
                value={annualIncome}
                onChange={setAnnualIncome}
              />

              <CalculatorRangeInput
                id="afford-down"
                label="Available Down Payment"
                displayValue={formatCurrency(availDownPayment)}
                min={15000}
                max={1500000}
                step={5000}
                value={availDownPayment}
                onChange={setAvailDownPayment}
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <CalculatorNumberInput
                  id="afford-debts"
                  label="Monthly Debts ($)"
                  value={monthlyDebts}
                  onChange={setMonthlyDebts}
                />

                <CalculatorNumberInput
                  id="afford-rate"
                  label="Est. Rate (%)"
                  min={2}
                  max={12}
                  step={0.125}
                  value={affordRate}
                  onChange={setAffordRate}
                />

                <CalculatorRangeInput
                  id="afford-dti"
                  label="Target Max DTI"
                  displayValue={`${maxDtiPercent}%`}
                  min={28}
                  max={45}
                  step={1}
                  value={maxDtiPercent}
                  onChange={setMaxDtiPercent}
                />
              </div>
            </CalculatorInputs>

            <CalculatorResults
              eyebrow="Estimated Target Home Price"
              headline={formatCurrency(estimatedMaxPrice)}
              rows={[
                {
                  label: "Est. Max Monthly Housing",
                  value: formatCurrency(maxHousingBudget),
                },
                {
                  label: "Estimated Max Mortgage",
                  value: formatCurrency(maxLoanFromPI),
                },
                {
                  label: "Down Payment Cash",
                  value: formatCurrency(availDownPayment),
                },
              ]}
              actions={
                <Link
                  href="/listings"
                  className="inline-flex w-full items-center justify-center bg-gold px-5 py-3.5 text-center font-sans text-[14px] font-semibold tracking-[0.04em] text-navy hover:bg-white"
                >
                  Browse Properties Around This Range
                </Link>
              }
            />
          </div>
        )}

        {activeTab === "net-proceeds" && (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <CalculatorInputs>
              <CalculatorRangeInput
                id="net-sale"
                label="Estimated Sale Price"
                displayValue={formatCurrency(salePrice)}
                min={250000}
                max={6000000}
                step={25000}
                value={salePrice}
                onChange={setSalePrice}
              />

              <CalculatorRangeInput
                id="net-payoff"
                label="Remaining Mortgage Payoff"
                displayValue={formatCurrency(mortgagePayoff)}
                min={0}
                max={4000000}
                step={10000}
                value={mortgagePayoff}
                onChange={setMortgagePayoff}
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <CalculatorRangeInput
                  id="net-comm"
                  label="Total Brokerage Fee"
                  displayValue={`${commissionRate.toFixed(1)}%`}
                  min={0}
                  max={7}
                  step={0.5}
                  value={commissionRate}
                  onChange={setCommissionRate}
                />

                <CalculatorRangeInput
                  id="net-closing"
                  label="Title & Doc Stamps"
                  displayValue={`${closingCostsPercent.toFixed(1)}%`}
                  min={0.5}
                  max={4}
                  step={0.25}
                  value={closingCostsPercent}
                  onChange={setClosingCostsPercent}
                />

                <CalculatorNumberInput
                  id="net-repairs"
                  label="Prep / Credits ($)"
                  value={repairsCredits}
                  onChange={setRepairsCredits}
                />
              </div>
            </CalculatorInputs>

            <CalculatorResults
              eyebrow="Estimated Walk-Away Proceeds"
              headline={
                estimatedNetProceeds >= 0
                  ? formatCurrency(estimatedNetProceeds)
                  : `-${formatCurrency(Math.abs(estimatedNetProceeds))}`
              }
              rows={[
                { label: "Gross Sale Price", value: formatCurrency(salePrice) },
                {
                  label: "Mortgage Payoff",
                  value: `-${formatCurrency(mortgagePayoff)}`,
                },
                {
                  label: "Brokerage Fee",
                  value: `-${formatCurrency(commissionCost)}`,
                },
                {
                  label: "Est. Closing & Doc Stamps",
                  value: `-${formatCurrency(sellerClosingCosts)}`,
                },
                {
                  label: "Repairs / Buyer Credits",
                  value: `-${formatCurrency(repairsCredits)}`,
                },
              ]}
              actions={
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Link
                    href="/home-valuation"
                    className="inline-flex items-center justify-center bg-gold px-4 py-3 text-center font-sans text-[14px] font-semibold tracking-[0.04em] text-navy hover:bg-white"
                  >
                    Free Valuation
                  </Link>
                  <Link
                    href="/cash-offer"
                    className="inline-flex items-center justify-center border border-white/30 px-4 py-3 text-center font-sans text-[14px] font-semibold tracking-[0.04em] text-white hover:border-gold hover:text-gold"
                  >
                    Cash Offer
                  </Link>
                </div>
              }
            />
          </div>
        )}

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-sand pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            These figures are planning estimates only and do not constitute
            lending approval or legal/tax advice.
          </p>
          <a
            href={BROKERAGE_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 font-semibold uppercase tracking-[0.14em] text-navy hover:text-gold-dark"
          >
            <MessageCircle className="h-3.5 w-3.5 text-gold-dark" />
            <span>Talk Through Your Numbers</span>
          </a>
        </div>
      </div>
    </div>
  );
}

