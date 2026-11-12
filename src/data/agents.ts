import type { Agent, PastResult } from "@/types/agent";

export const AGENTS: Agent[] = [
  {
    slug: "victor-a-ruiz",
    name: "Victor A. Ruiz, Esq.",
    role: "Managing Broker",
    credentials: "Managing Broker · Trial Attorney · Accounting Background",
    isPrincipal: true,
    specialties: [
      "Attorney-Led Contract Negotiation",
      "Luxury Estates & Waterfront",
      "Investment & Commercial Analysis",
      "Inherited & Probate Sales",
    ],
    bio: [
      "Victor is a Miami native with a true passion for his hometown and the Miami lifestyle. As a practicing trial lawyer with a background in accounting, Victor founded Move Miami to deliver exceptional client service while also providing the technical and analytical services of a national commercial real estate company.",
      "He has built his business by forming long-lasting relationships with his clients—diligent and analytical service, impeccable market knowledge, attention to detail, and uncompromising ethical standards. Every contract is reviewed and signed with an attorney's eye for detail.",
    ],
    phone: "(305) 632-1540",
    phoneHref: "tel:+13056321540",
    email: "victor@movemiamirealtor.com",
    whatsappHref: "https://wa.me/13056321540",
    image: "/images/agents/victor-ruiz.jpg",
  },
  {
    slug: "brandon-box",
    name: "Brandon Box",
    role: "Real Estate Agent",
    credentials: "Licensed Florida Real Estate Agent · U.S. Marine Veteran",
    specialties: [
      "Single-Family & Relocation",
      "Buyer Advisory & Property Tours",
      "Miami-Dade & Broward",
    ],
    bio: [
      "Brandon is a distinguished realtor and former Marine from Tennessee. With a deep-rooted passion for serving others, he transitioned from his military career to real estate, leveraging commitment, discipline, and an unwavering work ethic on behalf of his clients.",
      "His extensive knowledge of Miami's housing market—paired with a genuine dedication to understanding his clients' needs—lets him provide personalized solutions at every step of the property journey.",
    ],
    phone: "(251) 200-2537",
    phoneHref: "tel:+12512002537",
    email: "brandon@movemiamirealty.com",
    image: "/images/agents/brandon-box.jpg",
  },
  {
    slug: "jaime-blanco",
    name: "Jaime Blanco",
    role: "Real Estate Agent",
    credentials: "Licensed Florida Real Estate Agent · FIU Business Alumnus",
    specialties: [
      "Strategic Property Marketing",
      "Residential Transactions",
      "Coral Gables, Pinecrest & West Dade",
    ],
    bio: [
      "A lifelong Miami native and alumnus of FIU's business management program, Jaime brings comprehensive local knowledge to the strategic marketing and transaction management services he offers his clients.",
      "His business model is built on dedication, communication, determination, and trust. Contact Jaime for help with your next residential real estate transaction.",
    ],
    phone: "(305) 321-9585",
    phoneHref: "tel:+13053219585",
    email: "jaime@movemiamirealty.com",
    image: "/images/agents/jaime-blanco.jpg",
  },
  {
    slug: "priscilla-izquierdo",
    name: "Priscilla Izquierdo",
    role: "Real Estate Agent",
    credentials: "Licensed Florida Real Estate Agent",
    specialties: [
      "Miami-Dade Residential Representation",
      "Curated Buyer Tours",
      "Lease & Condo Transactions",
    ],
    bio: [
      "Connect with Priscilla for residential real estate across Miami-Dade County, from neighborhood discovery and curated showings to smooth closing coordination.",
    ],
    phone: "(786) 473-1455",
    phoneHref: "tel:+17864731455",
    email: "priscilla@movemiamirealty.com",
    image: "/images/agents/priscilla-izquierdo.jpg",
  },
  {
    slug: "olga-betty-delgado",
    name: 'Olga "Betty" Delgado',
    role: "Real Estate Agent",
    credentials: "Licensed Florida Real Estate Agent",
    specialties: [
      "Miami-Dade Residential Sales",
      "Family Home Advisory",
      "Bilingual Client Guidance",
    ],
    bio: [
      "Connect with Olga for personalized residential real estate representation throughout Miami-Dade County.",
    ],
    phone: "(786) 394-0114",
    phoneHref: "tel:+17863940114",
    email: "betty@movemiamirealty.com",
    image: "/images/agents/betty-delgado.jpg",
  },
];

export const VERIFIED_PAST_RESULTS: PastResult[] = [
  {
    badge: "SOLD · $51K Over Asking",
    propertyType: "Single-Family Home",
    askingPrice: "$575,000",
    soldPrice: "$626,000",
    daysOnMarket: "11 Days",
    specs: "2 bd / 2 ba · 1,287 Sq Ft",
  },
  {
    badge: "SOLD · $26K Over Asking",
    propertyType: "Single-Family Home",
    askingPrice: "$949,000",
    soldPrice: "$975,000",
    daysOnMarket: "13 Days",
    specs: "4 bd / 3.5 ba · 2,425 Sq Ft",
  },
  {
    badge: "SOLD · $41K Over Asking",
    propertyType: "Single-Family Home",
    askingPrice: "$399,000",
    soldPrice: "$440,000",
    daysOnMarket: "17 Days",
    specs: "4 bd / 2.5 ba · 1,256 Sq Ft",
  },
  {
    badge: "SOLD · Waterfront Estate",
    propertyType: "Residential Waterfront",
    soldPrice: "$12.8MM",
    specs: "1.01 Acre Lot",
  },
  {
    badge: "SOLD · Luxury Family Home",
    propertyType: "Residential Estate",
    soldPrice: "$3.75MM",
    specs: "7 bd / 8 ba · 7,012 Sq Ft",
  },
];

