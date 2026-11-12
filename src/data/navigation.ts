export interface NavItem {
  title: string;
  link: string;
  tint: string;
  newTab?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { title: "Properties", link: "/listings", tint: "#8B5CF6" },
  { title: "Buy", link: "/buy", tint: "#7C3AED" },
  { title: "Sell", link: "/sell", tint: "#A78BFA" },
  { title: "About", link: "/about-us", tint: "#6D28D9" },
  { title: "Our Team", link: "/agents", tint: "#9333EA" },
  { title: "Contact", link: "/contact", tint: "#6366F1" },
];

export const FOOTER_BROKERAGE_LINKS = [
  { label: "Properties", href: "/listings" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Team", href: "/agents" },
  { label: "Videos & Tours", href: "/videos" },
  { label: "Updates & Guides", href: "/updates-news" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_SERVICE_LINKS = [
  { label: "Buy a Home in Miami", href: "/buy" },
  { label: "Sell Your Property", href: "/sell" },
  { label: "Request a Cash Offer", href: "/cash-offer" },
  { label: "Free Home Valuation", href: "/home-valuation" },
  { label: "Real Estate Calculators", href: "/calculators" },
  { label: "Home Sale Net Calculator", href: "/calculators/home-sale-caculator" },
];

