"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import {
  cashOfferFormSchema,
  type CashOfferFormValues,
  type InquiryPayload,
} from "@/lib/validations";
import {
  BROKERAGE_INFO,
  FORM_PROPERTY_TYPES,
  TIMELINES,
} from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export function CashOfferForm() {
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CashOfferFormValues, unknown, InquiryPayload>({
    resolver: zodResolver(cashOfferFormSchema),
    defaultValues: {
      intent: "cash-offer",
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
      const response = await fetch("/api/cash-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await response.json();
      if (!response.ok || !json.ok) {
        setServerError(
          json.error ?? "Unable to submit your property. Please try WhatsApp."
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
              Cash Offer Request Received · {submittedRef}
            </p>
            <h3 className="mt-2 font-sans text-xl font-semibold text-navy">
              Our underwriting team is pulling comps now.
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-charcoal/80">
              Expect a direct reply within 1 business day and a verified cash
              read within 72 hours. Want to share photos immediately? Message
              Victor directly on WhatsApp.
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
                Submit Another Property
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("company")}
      />

      <Input
        id="cash-address"
        label="Property Address *"
        placeholder="Street address, unit #, city, ZIP"
        error={errors.address?.message}
        {...register("address")}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="cash-first"
          label="First Name *"
          placeholder="Elena"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          id="cash-last"
          label="Last Name *"
          placeholder="Martinez"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="cash-email"
          type="email"
          label="Email *"
          placeholder="you@domain.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          id="cash-phone"
          type="tel"
          label="Phone *"
          placeholder="(305) 555-0199"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          id="cash-type"
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

        <Select id="cash-timeline" label="Timeline" {...register("timeline")}>
          <option value="">Select timeline...</option>
          {TIMELINES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>

      <Textarea
        id="cash-message"
        label="Property Condition & Notes"
        rows={3}
        placeholder="Approximate beds/baths, occupancy status, deferred maintenance, or desired closing window..."
        {...register("message")}
      />

      {serverError && (
        <div className="flex items-start gap-2 border border-red-300 bg-red-50 p-3 text-xs text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        <span>Request 72-Hour Cash Offer</span>
      </Button>
    </form>
  );
}
