export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  title: string;
  link: string;
  tint: string;
  newTab?: boolean;
  children?: NavDropdownItem[];
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { title: "Buy", link: "/buy", tint: "#7C3AED" },
  { title: "Search Homes", link: "/listings", tint: "#8B5CF6" },
  { title: "Listings", link: "/listings?category=for-sale", tint: "#6D28D9" },
  {
    title: "Sell",
    link: "/sell",
    tint: "#A78BFA",
    children: [
      { label: "Sell With Move Miami", href: "/sell" },
      { label: "Request a Cash Offer", href: "/cash-offer" },
      { label: "Free Home Valuation", href: "/home-valuation" },
      { label: "Net Proceeds Calculator", href: "/calculators/home-sale-caculator" },
    ],
  },
  { title: "About", link: "/about-us", tint: "#6D28D9" },
  {
    title: "Calculators",
    link: "/calculators",
    tint: "#6366F1",
    children: [
      { label: "Monthly Mortgage", href: "/calculators?tab=mortgage" },
      { label: "Home Affordability", href: "/calculators?tab=affordability" },
      { label: "Home Sale Net Proceeds", href: "/calculators/home-sale-caculator" },
    ],
  },
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

