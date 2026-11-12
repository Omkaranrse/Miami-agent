"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import {
  contactFormSchema,
  type InquiryFormValues,
  type InquiryPayload,
} from "@/lib/validations";
import { BROKERAGE_INFO } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues, unknown, InquiryPayload>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      intent: "general",
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await response.json();
      if (!response.ok || !json.ok) {
        setServerError(
          json.error ?? "Unable to send your message. Please try WhatsApp."
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
      <div className="border border-sand bg-white p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-gold-dark" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              Inquiry Received · Reference {submittedRef}
            </p>
            <h3 className="mt-2 font-sans text-xl font-semibold text-navy">
              Thank you—our team will respond within 1 business day.
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-charcoal/80">
              Need an immediate answer? Message us on WhatsApp or call{" "}
              {BROKERAGE_INFO.officePhoneDisplay}.
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
                Send Another Inquiry
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

      <Select id="contact-intent" label="How can we help?" {...register("intent")}>
        <option value="buy">I want to buy</option>
        <option value="sell">I want to sell</option>
        <option value="cash-offer">Request a cash offer</option>
        <option value="home-valuation">Free home valuation</option>
        <option value="explore">I&apos;m just exploring</option>
        <option value="general">General inquiry</option>
      </Select>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="contact-first"
          label="First Name *"
          placeholder="Elena"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          id="contact-last"
          label="Last Name"
          placeholder="Martinez"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="contact-email"
          type="email"
          label="Email *"
          placeholder="you@domain.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          id="contact-phone"
          type="tel"
          label="Phone (Optional)"
          placeholder="(305) 555-0199"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <Textarea
        id="contact-message"
        label="Message"
        rows={4}
        placeholder="Tell us about your timeline, neighborhoods, or property..."
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
          <span>Send Message</span>
        </Button>
        <p className="text-xs text-muted">
          Direct brokerage desk · Move Miami Realty
        </p>
      </div>
    </form>
  );
}

