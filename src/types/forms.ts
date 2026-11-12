export type InquiryIntent =
  | "buy"
  | "sell"
  | "explore"
  | "cash-offer"
  | "home-valuation"
  | "schedule-showing"
  | "request-info"
  | "check-availability"
  | "general";

export interface InquiryFormData {
  intent: InquiryIntent;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  address?: string;
  budget?: string;
  propertyType?: string;
  timeline?: string;
  message?: string;
  propertySlug?: string;
  company?: string;
}

export interface InquiryApiResponse {
  ok: boolean;
  referenceId?: string;
  intent?: InquiryIntent;
  receivedAt?: string;
  message?: string;
  error?: string;
  issues?: Record<string, string[] | undefined>;
}

