import type { Property } from "@/types/property";

function getStatusBadge(status: Property["status"]) {
  switch (status) {
    case "Active":
      return {
        label: "Active",
        dotColor: "bg-[#22C55E]",
        bg: "bg-emerald-500/10 text-emerald-800 border-emerald-500/25",
      };
    case "Under Contract":
      return {
        label: "Under Contract",
        dotColor: "bg-[#8B5CF6]",
        bg: "bg-[#8B5CF6]/10 text-[#5B2EC6] border-[#8B5CF6]/25",
      };
    case "Price Reduced":
      return {
        label: "Price Reduced",
        dotColor: "bg-amber-500",
        bg: "bg-amber-500/10 text-amber-800 border-amber-500/25",
      };
    case "Just Leased":
      return {
        label: "Just Leased",
        dotColor: "bg-[#321477]",
        bg: "bg-[#321477]/10 text-[#321477] border-[#321477]/25",
      };
    default:
      return {
        label: status,
        dotColor: "bg-[#5B2EC6]",
        bg: "bg-[#5B2EC6]/10 text-[#5B2EC6] border-[#5B2EC6]/25",
      };
  }
}

export function PropertyStatus({
  status,
  category,
}: {
  status: Property["status"];
  category?: Property["category"];
}) {
  const badge = getStatusBadge(status);
  const categoryLabel =
    category === "for-sale"
      ? "For Sale"
      : category === "for-rent"
      ? "For Rent"
      : category === "vacation-rental"
      ? "Vacation Rental"
      : null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur-sm ${badge.bg}`}
      >
        <span className={`h-2 w-2 rounded-full ${badge.dotColor}`} />
        <span>{badge.label}</span>
      </span>
      {categoryLabel && (
        <span className="inline-flex items-center rounded-full border border-[#E5DBFB] bg-white/90 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#321477] shadow-xs backdrop-blur-sm">
          {categoryLabel}
        </span>
      )}
    </div>
  );
}
