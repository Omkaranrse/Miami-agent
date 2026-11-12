export interface Agent {
  slug: string;
  name: string;
  role: string;
  credentials?: string;
  bio: string[];
  phone: string;
  phoneHref: string;
  email: string;
  whatsappHref?: string;
  image: string;
  isPrincipal?: boolean;
  specialties?: string[];
}

export interface PastResult {
  badge: string;
  propertyType: string;
  askingPrice?: string;
  soldPrice: string;
  daysOnMarket?: string;
  specs: string;
}

