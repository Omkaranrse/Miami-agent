import { z } from "zod";

export const inquiryIntentEnum = z.enum([
  "buy",
  "sell",
  "explore",
  "cash-offer",
  "home-valuation",
  "schedule-showing",
  "request-info",
  "check-availability",
  "general",
]);

export const baseInquirySchema = z.object({
  intent: inquiryIntentEnum,
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().max(80).optional().default(""),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().max(40).optional().default(""),
  address: z.string().trim().max(200).optional().default(""),
  budget: z.string().trim().max(60).optional().default(""),
  propertyType: z.string().trim().max(60).optional().default(""),
  timeline: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  propertySlug: z.string().trim().max(120).optional().default(""),
  company: z.string().max(100).optional().default(""), // honeypot field
});

export type InquiryPayload = z.infer<typeof baseInquirySchema>;
export type InquiryFormValues = z.input<typeof baseInquirySchema>;

export const contactFormSchema = baseInquirySchema.extend({
  message: z.string().trim().max(2000).optional().default(""),
});
export type ContactFormValues = z.input<typeof contactFormSchema>;

export const buyerInquirySchema = baseInquirySchema.extend({
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  address: z
    .string()
    .trim()
    .min(2, "Please tell us which Miami areas you are considering")
    .max(200),
});
export type BuyerFormValues = z.input<typeof buyerInquirySchema>;

export const cashOfferFormSchema = baseInquirySchema.extend({
  address: z.string().trim().min(4, "Property address is required").max(200),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  phone: z.string().trim().min(7, "Phone number is required").max(40),
});
export type CashOfferFormValues = z.input<typeof cashOfferFormSchema>;

export const valuationFormSchema = baseInquirySchema.extend({
  address: z.string().trim().min(4, "Property address is required").max(200),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
});
export type ValuationFormValues = z.input<typeof valuationFormSchema>;

export async function processInquiryPayload(
  body: unknown,
  schema: z.ZodTypeAny = baseInquirySchema
) {
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return {
      status: 400,
      payload: {
        ok: false,
        error: "Please check the required fields and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
    };
  }

  const data = parsed.data as InquiryPayload;
  if (data.company && data.company.trim().length > 0) {
    return { status: 200, payload: { ok: true, message: "Received." } };
  }

  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          submitted_at: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("[Move Miami Inquiry Webhook Error]:", err);
    }
  }

  return {
    status: 200,
    payload: {
      ok: true,
      referenceId: `MM-${Date.now().toString(36).toUpperCase()}`,
      intent: data.intent,
      receivedAt: new Date().toISOString(),
    },
  };
}

