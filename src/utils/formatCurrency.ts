export function formatCurrency(
  amount: number,
  options: { monthly?: boolean; compact?: boolean } = {}
): string {
  if (!Number.isFinite(amount)) return "$0";

  if (options.compact && amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const formatted = millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(2);
    return `$${formatted}M`;
  }

  const base = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

  return options.monthly ? `${base}/mo` : base;
}

