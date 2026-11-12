"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import {
  buyerInquirySchema,
  type BuyerFormValues,
  type InquiryPayload,
} from "@/lib/validations";
import {
  BROKERAGE_INFO,
  BUYER_BUDGETS,
  FORM_PROPERTY_TYPES,
  TIMELINES,
} from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export function BuyerForm() {
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BuyerFormValues, unknown, InquiryPayload>({
    resolver: zodResolver(buyerInquirySchema),
    defaultValues: {
      intent: "buy",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      budget: "",
      propertyType: "",
      timeline: "",
      message: "",
      propertySlug: "",
      company: "",
    },
  });

  const onSubmit = async (values: InquiryPayload) => {
    setServerError(null);
    try {
      const response = await fetch("/api/buyer-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await response.json();
      if (!response.ok || !json.ok) {
        setServerError(
          json.error ?? "Unable to send your buyer brief. Please try WhatsApp."
        );
        return;
      }
      setSubmittedRef(json.referenceId ?? "RECEIVED");
    } catch {
      setServerError(
        "Connection error while submitting. Please reach us directly on WhatsApp."
      );
    }
  };

  if (submittedRef) {
    return (
      <div className="border border-sand bg-ivory p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-gold-dark" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              Buyer Brief Received · {submittedRef}
            </p>
            <h4 className="mt-2 font-sans text-xl font-semibold text-navy">
              We’ll send curated Miami matches within 1 business day.
            </h4>
            <p className="mt-2 text-[15px] leading-relaxed text-charcoal/80">
              Want to start touring sooner? Message our advisors directly on
              WhatsApp for immediate access.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={BROKERAGE_INFO.whatsappHref} external>
                <MessageCircle className="h-4 w-4 text-gold" />
                <span>WhatsApp {BROKERAGE_INFO.whatsappDisplay}</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmittedRef(null);
                  reset();
                }}
              >
                Send Another Search Brief
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("company")}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="buyer-first"
          label="First Name *"
          placeholder="Elena"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          id="buyer-last"
          label="Last Name *"
          placeholder="Martinez"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="buyer-email"
          type="email"
          label="Email *"
          placeholder="you@domain.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          id="buyer-phone"
          type="tel"
          label="Phone / WhatsApp (Optional)"
          placeholder="(305) 555-0199"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <Input
        id="buyer-areas"
        label="What areas of Miami are you considering? *"
        placeholder="Coral Gables, Pinecrest, Brickell, Coconut Grove..."
        error={errors.address?.message}
        {...register("address")}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Select id="buyer-budget" label="Budget" {...register("budget")}>
          <option value="">Select budget...</option>
          {BUYER_BUDGETS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>

        <Select
          id="buyer-type"
          label="Property Type"
          {...register("propertyType")}
        >
          <option value="">Select type...</option>
          {FORM_PROPERTY_TYPES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>

        <Select id="buyer-timeline" label="Timeline" {...register("timeline")}>
          <option value="">Select timeline...</option>
          {TIMELINES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>

      <Textarea
        id="buyer-message"
        label="What are you looking for?"
        rows={4}
        placeholder="Bedrooms, lot size, dockage, school district, HOA preferences, or deal-breakers..."
        {...register("message")}
      />

      {serverError && (
        <div className="flex items-start gap-2 border border-red-300 bg-red-50 p-3 text-xs text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>Get Curated Listings</span>
        </Button>
        <p className="text-xs text-muted">
          No portal spam. Personally reviewed by Move Miami Realty.
        </p>
      </div>
    </form>
  );
}
