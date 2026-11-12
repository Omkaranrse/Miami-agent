import type { Property } from "@/types/property";

function getStatusStyles(status: Property["status"]) {
  switch (status) {
    case "Active":
      return "bg-navy text-white";
    case "Under Contract":
      return "bg-gold text-navy";
    case "Price Reduced":
      return "bg-ivory text-navy border border-navy/20";
    case "Just Leased":
      return "bg-charcoal text-white";
    default:
      return "bg-navy text-white";
  }
}

export function PropertyStatus({
  status,
  category,
}: {
  status: Property["status"];
  category?: Property["category"];
}) {
  const categoryLabel =
    category === "for-sale"
      ? "For Sale"
      : category === "for-rent"
      ? "For Rent"
      : category === "vacation-rental"
      ? "Vacation Rental"
      : null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span
        className={`px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${getStatusStyles(
          status
        )}`}
      >
        {status}
      </span>
      {categoryLabel && (
        <span className="bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy">
          {categoryLabel}
        </span>
      )}
    </div>
  );
}

