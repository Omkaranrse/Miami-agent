"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, MessageCircle, Phone, AlertCircle } from "lucide-react";
import type { Property } from "@/types/property";
import {
  baseInquirySchema,
  type InquiryFormValues,
  type InquiryPayload,
} from "@/lib/validations";
import { BROKERAGE_INFO } from "@/lib/constants";

export function PropertyInquiry({ property }: { property: Property }) {
  const isVacation = property.category === "vacation-rental";
  const defaultIntent = isVacation ? "check-availability" : "schedule-showing";

  const [selectedIntent, setSelectedIntent] =
    useState<InquiryPayload["intent"]>(defaultIntent);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues, unknown, InquiryPayload>({
    resolver: zodResolver(baseInquirySchema),
    defaultValues: {
      intent: defaultIntent,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: property.address,
      budget: "",
      propertyType: property.propertyType,
      timeline: "",
      message: "",
      propertySlug: property.slug,
      company: "",
    },
  });

  const handleIntentChange = (next: InquiryPayload["intent"]) => {
    setSelectedIntent(next);
    setValue("intent", next);
  };

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
          json.error ?? "Unable to send your request. Please try WhatsApp."
        );
        return;
      }
      setSubmittedRef(json.referenceId ?? "RECEIVED");
    } catch {
      setServerError(
        "Connection error while submitting. Please reach us on WhatsApp."
      );
    }
  };

  const labelClass =
    "block text-xs font-semibold uppercase tracking-[0.14em] text-navy";
  const inputClass =
    "mt-1.5 w-full border border-sand bg-ivory/60 px-3.5 py-3 text-sm text-charcoal placeholder:text-muted/70 focus:border-navy focus:bg-white focus:outline-none";

  return (
    <div className="border border-sand bg-white p-7 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
        Direct Property Desk
      </p>
      <h2 className="mt-2 font-sans text-2xl font-semibold tracking-tight text-navy">
        {isVacation ? "Check Dates & Terms" : "Inquire About This Property"}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-charcoal/75">
        No middleman call centers—you reach Move Miami Realty directly.
      </p>

      <div className="mt-5 flex flex-col gap-2.5 border-b border-sand pb-6">
        <a
          href={`${BROKERAGE_INFO.whatsappHref}?text=${encodeURIComponent(
            `Hi Move Miami, I'm interested in ${property.address} (${property.priceLabel}).`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 bg-navy px-5 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-white hover:bg-navy-light"
        >
          <MessageCircle className="h-4 w-4 text-gold" />
          <span>WhatsApp About This Home</span>
        </a>
        <a
          href={BROKERAGE_INFO.officePhoneHref}
          className="inline-flex w-full items-center justify-center gap-2 border border-sand px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy hover:border-navy"
        >
          <Phone className="h-4 w-4 text-gold-dark" />
          <span>Call {BROKERAGE_INFO.officePhoneDisplay}</span>
        </a>
      </div>

      <div className="mt-6">
        {submittedRef ? (
          <div className="border border-sand bg-ivory p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
                  Request Received · {submittedRef}
                </p>
                <p className="mt-1 font-sans text-xl font-semibold text-navy">
                  We’ll reply within 1 business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedRef(null);
                    setSelectedIntent(defaultIntent);
                    reset();
                  }}
                  className="mt-4 border border-sand bg-white px-4 py-2 font-sans text-[14px] font-semibold tracking-[0.03em] text-navy hover:border-navy"
                >
                  Send Another Note
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...register("company")}
            />

            <div>
              <span className={labelClass}>I want to…</span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleIntentChange(defaultIntent)}
                  className={`border px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors ${
                    selectedIntent === defaultIntent
                      ? "border-navy bg-navy text-white"
                      : "border-sand bg-white text-charcoal hover:border-navy"
                  }`}
                >
                  {isVacation ? "Check availability" : "Schedule a showing"}
                </button>
                <button
                  type="button"
                  onClick={() => handleIntentChange("request-info")}
                  className={`border px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors ${
                    selectedIntent === "request-info"
                      ? "border-navy bg-navy text-white"
                      : "border-sand bg-white text-charcoal hover:border-navy"
                  }`}
                >
                  Request info
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="prop-first" className={labelClass}>
                  First Name *
                </label>
                <input
                  id="prop-first"
                  type="text"
                  className={inputClass}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="prop-last" className={labelClass}>
                  Last Name
                </label>
                <input
                  id="prop-last"
                  type="text"
                  className={inputClass}
                  {...register("lastName")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="prop-email" className={labelClass}>
                  Email *
                </label>
                <input
                  id="prop-email"
                  type="email"
                  className={inputClass}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="prop-phone" className={labelClass}>
                  Phone (optional)
                </label>
                <input
                  id="prop-phone"
                  type="tel"
                  placeholder="(305) 555-0199"
                  className={inputClass}
                  {...register("phone")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="prop-msg" className={labelClass}>
                Message
              </label>
              <textarea
                id="prop-msg"
                rows={3}
                placeholder="Preferred dates or times for a showing..."
                className={inputClass}
                {...register("message")}
              />
            </div>

            {serverError && (
              <div className="flex items-start gap-2 border border-red-300 bg-red-50 p-3 text-xs text-red-800">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 bg-navy px-6 py-4 font-sans text-[14px] font-semibold tracking-[0.04em] text-white transition-colors hover:bg-navy-light disabled:opacity-60"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>
                {isVacation ? "Check Availability" : "Request a Showing"}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

