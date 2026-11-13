"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Phone,
  Home,
  Tag,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import {
  contactFormSchema,
  type InquiryFormValues,
  type InquiryPayload,
} from "@/lib/validations";
import { BROKERAGE_INFO } from "@/lib/constants";

type InterestOption = "buy" | "sell" | "general";

const INTEREST_OPTIONS: Array<{
  id: InterestOption;
  label: string;
  icon: typeof Home;
}> = [
  { id: "buy", label: "Buying", icon: Home },
  { id: "sell", label: "Selling", icon: Tag },
  { id: "general", label: "Just have a question", icon: MessageSquare },
];

export function ContactForm() {
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<InterestOption>("general");

  const {
    register,
    handleSubmit,
    setValue,
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

  const handleInterestSelect = (id: InterestOption) => {
    setSelectedInterest(id);
    setValue("intent", id, { shouldValidate: true });
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
          json.error ?? "Unable to send your message. Please reach us via WhatsApp."
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
      <div className="rounded-[30px] border border-white/80 bg-white/95 p-8 shadow-[0_24px_60px_-18px_rgba(45,20,108,0.12)] backdrop-blur-xl sm:p-10">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F8EE] text-[#25D366]">
            <CheckCircle2 className="h-6 w-6 fill-[#25D366] text-white" />
          </div>
          <div>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B2EC6]">
              Message Sent · Reference {submittedRef}
            </p>
            <h3 className="mt-2 font-sans text-2xl font-bold tracking-tight text-[#160B30]">
              We&apos;ve received your message.
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#51476E]">
              Our team will review your inquiry and be in touch right away. For
              instant assistance, you can also reach us directly on WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={BROKERAGE_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-sans text-[13.5px] font-bold text-white shadow-md transition-all hover:bg-[#20BA5A]"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                <span>Message on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setSubmittedRef(null);
                  reset();
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#D8CEF2] bg-[#FAF8FF] px-6 py-3 font-sans text-[13.5px] font-semibold text-[#241748] transition-all hover:bg-white hover:border-[#5B2EC6]"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[30px] border border-white/80 bg-white/95 p-7 shadow-[0_24px_60px_-18px_rgba(45,20,108,0.12)] backdrop-blur-xl sm:p-10">
      {/* Top Pill Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#E4D7FF] bg-[#F3ECFF] px-3.5 py-1.5">
        <Mail className="h-3.5 w-3.5 text-[#5B2EC6]" />
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#4C2B9A]">
          Send a Message
        </span>
      </div>

      {/* Heading */}
      <h2 className="mt-4 font-sans text-[28px] font-bold tracking-tight text-[#160B30] sm:text-[34px]">
        We&apos;d Love to Hear From You.
      </h2>

      {/* Subtext */}
      <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-[#51476E]">
        Send us a message using the form below and our team will be in touch
        right away. We&apos;re here to answer your questions and help you with
        your real estate goals.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
        {/* Hidden Honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          {...register("company")}
        />

        {/* Row 1: First Name & Last Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-firstName"
              className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#433860]"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-2 flex items-center">
              <User className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#8C82A6]" />
              <input
                id="contact-firstName"
                type="text"
                placeholder="Enter your first name"
                className={`w-full rounded-xl border bg-[#FAF8FF] py-3 pl-10 pr-4 font-sans text-[14.5px] text-[#1E1145] placeholder-[#9E94B8] transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                    : "border-[#E3DCF5] focus:border-[#6136D6] focus:ring-[#6136D6]/15"
                }`}
                {...register("firstName")}
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 font-sans text-xs text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-lastName"
              className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#433860]"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-2 flex items-center">
              <User className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#8C82A6]" />
              <input
                id="contact-lastName"
                type="text"
                placeholder="Enter your last name"
                className={`w-full rounded-xl border bg-[#FAF8FF] py-3 pl-10 pr-4 font-sans text-[14.5px] text-[#1E1145] placeholder-[#9E94B8] transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                    : "border-[#E3DCF5] focus:border-[#6136D6] focus:ring-[#6136D6]/15"
                }`}
                {...register("lastName")}
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 font-sans text-xs text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#433860]"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-2 flex items-center">
            <Mail className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#8C82A6]" />
            <input
              id="contact-email"
              type="email"
              placeholder="Enter your email address"
              className={`w-full rounded-xl border bg-[#FAF8FF] py-3 pl-10 pr-4 font-sans text-[14.5px] text-[#1E1145] placeholder-[#9E94B8] transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                  : "border-[#E3DCF5] focus:border-[#6136D6] focus:ring-[#6136D6]/15"
              }`}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="mt-1 font-sans text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Row 3: Phone */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#433860]"
          >
            Phone
          </label>
          <div className="relative mt-2 flex items-center">
            <Phone className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#8C82A6]" />
            <input
              id="contact-phone"
              type="tel"
              placeholder="Enter your phone number"
              className="w-full rounded-xl border border-[#E3DCF5] bg-[#FAF8FF] py-3 pl-10 pr-4 font-sans text-[14.5px] text-[#1E1145] placeholder-[#9E94B8] transition-all focus:border-[#6136D6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6136D6]/15"
              {...register("phone")}
            />
          </div>
        </div>

        {/* Row 4: I'm Interested In */}
        <div>
          <label className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#433860]">
            I&apos;m Interested In
          </label>
          <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {INTEREST_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedInterest === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleInterestSelect(opt.id)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 font-sans text-[13.5px] transition-all ${
                    isSelected
                      ? "border-2 border-[#6E36D9] bg-[#F4ECFF] font-bold text-[#1A0B3B] shadow-2xs"
                      : "border border-[#E3DCF5] bg-[#FAF8FF] font-medium text-[#4A3F68] hover:border-[#6E36D9]/50 hover:bg-white"
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`h-4 w-4 shrink-0 ${
                        isSelected ? "text-[#6E36D9]" : "text-[#7B7197]"
                      }`}
                    />
                    <span className="truncate">{opt.label}</span>
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 fill-[#6E36D9] text-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 5: Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#433860]"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-2">
            <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#8C82A6]" />
            <textarea
              id="contact-message"
              rows={4}
              placeholder="Type your message here..."
              className={`w-full rounded-xl border bg-[#FAF8FF] py-3 pl-10 pr-4 font-sans text-[14.5px] text-[#1E1145] placeholder-[#9E94B8] transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                errors.message
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                  : "border-[#E3DCF5] focus:border-[#6136D6] focus:ring-[#6136D6]/15"
              }`}
              {...register("message")}
            />
          </div>
          {errors.message && (
            <p className="mt-1 font-sans text-xs text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        {serverError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#1C0A3E_0%,#2F1269_50%,#4A229E_100%)] px-8 py-4 font-sans text-[14.5px] font-bold text-white shadow-[0_12px_28px_-8px_rgba(38,15,92,0.45)] transition-all duration-200 hover:opacity-95 hover:shadow-[0_16px_36px_-8px_rgba(38,15,92,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send a Message</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
