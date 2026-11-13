"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  Loader2,
  Phone,
  AlertCircle,
  MessageCircle,
  User,
  Mail,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";
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
    setValue("intent", next, { shouldValidate: true });
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
          json.error ?? "Unable to send your request. Please reach us directly on WhatsApp."
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

  return (
    <div className="rounded-[30px] border border-white/90 bg-white/95 p-6 shadow-[0_24px_60px_-18px_rgba(45,20,108,0.14)] backdrop-blur-xl sm:p-8">
      {/* Top Pill Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#E4D7FF] bg-[#F3ECFF] px-3.5 py-1.5">
        <Sparkles className="h-3.5 w-3.5 text-[#5B2EC6]" />
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#4C2B9A]">
          Direct Property Desk
        </span>
      </div>

      {/* Heading */}
      <h2 className="mt-4 font-sans text-2xl font-bold tracking-tight text-[#160B30] sm:text-[26px]">
        {isVacation ? "Check Dates & Terms" : "Inquire About This Property"}
      </h2>
      <p className="mt-2 font-sans text-[14px] leading-relaxed text-[#51476E]">
        Direct advisor communication with Move Miami Realty. No third-party call centers.
      </p>

      {/* Instant Direct Reach (WhatsApp & Call) */}
      <div className="mt-5 flex flex-col gap-2.5 border-b border-[#EDE5FA] pb-6">
        <a
          href={`${BROKERAGE_INFO.whatsappHref}?text=${encodeURIComponent(
            `Hi Move Miami, I'm interested in ${property.address} (${property.priceLabel}).`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 font-sans text-[14px] font-bold text-white shadow-md transition-all hover:bg-[#20BA5A] hover:shadow-lg active:scale-[0.99]"
        >
          <MessageCircle className="h-4 w-4 fill-white" />
          <span>WhatsApp About This Home</span>
        </a>

        <a
          href={BROKERAGE_INFO.officePhoneHref}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#E5DBFB] bg-white/90 px-5 py-3 font-sans text-[13.5px] font-semibold text-[#160B30] shadow-2xs transition-all hover:border-[#7C52EB] hover:bg-[#FAF8FF]"
        >
          <Phone className="h-4 w-4 text-[#5B2EC6]" />
          <span>Call {BROKERAGE_INFO.officePhoneDisplay}</span>
        </a>
      </div>

      {/* Submission State or Form */}
      <div className="mt-6">
        {submittedRef ? (
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-50/60 p-6 text-left">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
                  Request Received · Ref {submittedRef}
                </p>
                <p className="mt-1 font-sans text-lg font-bold text-[#160B30]">
                  We&apos;ll be in touch within 1 business day.
                </p>
                <p className="mt-1 text-xs text-[#51476E]">
                  A Move Miami advisor has received your request regarding{" "}
                  {property.address}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedRef(null);
                    setSelectedIntent(defaultIntent);
                    reset();
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#E5DBFB] bg-white px-4 py-2 font-sans text-[12.5px] font-semibold text-[#160B30] transition-all hover:border-[#7C52EB] hover:bg-[#FAF8FF]"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {/* Honeypot anti-spam field */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...register("company")}
            />

            {/* Intent Switcher Pills */}
            <div>
              <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#51476E]">
                I want to…
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleIntentChange(defaultIntent)}
                  className={`rounded-xl border px-3.5 py-2.5 font-sans text-[12.5px] font-semibold transition-all ${
                    selectedIntent === defaultIntent
                      ? "border-[#7C52EB] bg-[#F3ECFF] text-[#321477] shadow-[0_0_0_1px_rgba(124,82,235,0.4)]"
                      : "border-[#E5DBFB] bg-white text-[#51476E] hover:border-[#7C52EB]/50 hover:bg-[#FAF8FF]"
                  }`}
                >
                  {isVacation ? "Check Availability" : "Schedule Showing"}
                </button>
                <button
                  type="button"
                  onClick={() => handleIntentChange("request-info")}
                  className={`rounded-xl border px-3.5 py-2.5 font-sans text-[12.5px] font-semibold transition-all ${
                    selectedIntent === "request-info"
                      ? "border-[#7C52EB] bg-[#F3ECFF] text-[#321477] shadow-[0_0_0_1px_rgba(124,82,235,0.4)]"
                      : "border-[#E5DBFB] bg-white text-[#51476E] hover:border-[#7C52EB]/50 hover:bg-[#FAF8FF]"
                  }`}
                >
                  Request Info
                </button>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="prop-first"
                  className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#51476E]"
                >
                  First Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7CA8]" />
                  <input
                    id="prop-first"
                    type="text"
                    placeholder="First name"
                    className="w-full rounded-2xl border border-[#E5DBFB] bg-white py-3 pl-10 pr-3 font-sans text-[13.5px] text-[#160B30] placeholder:text-[#9A8FB3] transition-all focus:border-[#7C52EB] focus:outline-none focus:ring-4 focus:ring-[#7C52EB]/15"
                    {...register("firstName")}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-xs font-semibold text-rose-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="prop-last"
                  className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#51476E]"
                >
                  Last Name
                </label>
                <div className="relative mt-1.5">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7CA8]" />
                  <input
                    id="prop-last"
                    type="text"
                    placeholder="Last name"
                    className="w-full rounded-2xl border border-[#E5DBFB] bg-white py-3 pl-10 pr-3 font-sans text-[13.5px] text-[#160B30] placeholder:text-[#9A8FB3] transition-all focus:border-[#7C52EB] focus:outline-none focus:ring-4 focus:ring-[#7C52EB]/15"
                    {...register("lastName")}
                  />
                </div>
              </div>
            </div>

            {/* Email & Phone Fields */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="prop-email"
                  className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#51476E]"
                >
                  Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7CA8]" />
                  <input
                    id="prop-email"
                    type="email"
                    placeholder="you@email.com"
                    className="w-full rounded-2xl border border-[#E5DBFB] bg-white py-3 pl-10 pr-3 font-sans text-[13.5px] text-[#160B30] placeholder:text-[#9A8FB3] transition-all focus:border-[#7C52EB] focus:outline-none focus:ring-4 focus:ring-[#7C52EB]/15"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs font-semibold text-rose-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="prop-phone"
                  className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#51476E]"
                >
                  Phone (Optional)
                </label>
                <div className="relative mt-1.5">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7CA8]" />
                  <input
                    id="prop-phone"
                    type="tel"
                    placeholder="(305) 555-0199"
                    className="w-full rounded-2xl border border-[#E5DBFB] bg-white py-3 pl-10 pr-3 font-sans text-[13.5px] text-[#160B30] placeholder:text-[#9A8FB3] transition-all focus:border-[#7C52EB] focus:outline-none focus:ring-4 focus:ring-[#7C52EB]/15"
                    {...register("phone")}
                  />
                </div>
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="prop-msg"
                className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#51476E]"
              >
                Message
              </label>
              <div className="relative mt-1.5">
                <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#8B7CA8]" />
                <textarea
                  id="prop-msg"
                  rows={3}
                  placeholder="Preferred dates, questions about HOA, financing, or property tour times..."
                  className="w-full rounded-2xl border border-[#E5DBFB] bg-white py-3 pl-10 pr-3 font-sans text-[13.5px] text-[#160B30] placeholder:text-[#9A8FB3] transition-all focus:border-[#7C52EB] focus:outline-none focus:ring-4 focus:ring-[#7C52EB]/15"
                  {...register("message")}
                />
              </div>
            </div>

            {/* Server Error Alert */}
            {serverError && (
              <div className="flex items-start gap-2.5 rounded-2xl border border-rose-300 bg-rose-50 p-3.5 text-xs text-rose-800">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#321477] via-[#5B2EC6] to-[#7C52EB] px-6 py-4 font-sans text-[14px] font-bold text-white shadow-[0_12px_28px_-6px_rgba(91,46,198,0.45)] transition-all hover:shadow-[0_16px_32px_-6px_rgba(91,46,198,0.6)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending Your Inquiry...</span>
                </>
              ) : (
                <>
                  <span>
                    {isVacation ? "Check Availability" : "Request a Showing"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
