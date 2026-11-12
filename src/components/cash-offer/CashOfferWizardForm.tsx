"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageCircle,
  Building,
  User,
  Check,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  BROKERAGE_INFO,
  FORM_PROPERTY_TYPES,
  TIMELINES,
} from "@/lib/constants";
import type { InquiryPayload } from "@/lib/validations";

interface FormState {
  address: string;
  propertyType: string;
  message: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timeline: string;
  company: string;
}

const INITIAL_STATE: FormState = {
  address: "",
  propertyType: "",
  message: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  timeline: "",
  company: "",
};

export function CashOfferWizardForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [formValues, setFormValues] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const shouldReduceMotion = useReducedMotion();

  const updateField = (field: keyof FormState, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formValues.address.trim() || formValues.address.trim().length < 4) {
      newErrors.address = "Property address is required (minimum 4 characters).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formValues.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formValues.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email.trim() || !emailRegex.test(formValues.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formValues.phone.trim() || formValues.phone.trim().length < 7) {
      newErrors.phone = "Phone number is required (min 7 digits).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setDirection(1);
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setDirection(1);
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((prev) => (prev - 1) as 1 | 2);
    }
  };

  const handleSubmit = async () => {
    setServerError(null);
    setIsSubmitting(true);

    const payload: InquiryPayload = {
      intent: "cash-offer",
      address: formValues.address.trim(),
      propertyType: formValues.propertyType.trim(),
      message: formValues.message.trim(),
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
      timeline: formValues.timeline.trim(),
      budget: "",
      propertySlug: "",
      company: formValues.company.trim(),
    };

    try {
      const response = await fetch("/api/cash-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      if (!response.ok || !json.ok) {
        setServerError(
          json.error ?? "Unable to submit your property. Please message us on WhatsApp."
        );
        setIsSubmitting(false);
        return;
      }

      setSubmittedRef(json.referenceId ?? "RECEIVED");
    } catch {
      setServerError(
        "Connection error while submitting. Please reach out directly on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS COMPLETION STATE
  if (submittedRef) {
    return (
      <div className="relative overflow-hidden rounded-xs border border-white/15 bg-navy-light/95 p-8 text-ivory backdrop-blur-xl sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gold/20 blur-[80px]"
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/40">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <span className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Cash Offer Request Confirmed · {submittedRef}
          </span>

          <h3 className="mt-2 font-serif text-3xl font-normal text-white sm:text-4xl">
            Our underwriting team is pulling comps.
          </h3>

          <p className="mt-3 max-w-md font-sans text-sm font-light leading-relaxed text-ivory/80">
            Expect a direct response within 1 business day and a verified cash
            read in 72 hours. To submit property photos immediately, connect
            directly with Victor on WhatsApp.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={BROKERAGE_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gold px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-white"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Us Directly</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setSubmittedRef(null);
                setFormValues(INITIAL_STATE);
                setStep(1);
              }}
              className="inline-flex items-center justify-center gap-2 border border-white/20 px-6 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.12em] text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              <span>Submit Another Property</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xs border border-white/15 bg-navy-light/90 p-6 text-ivory backdrop-blur-xl sm:p-9">
      {/* Honeypot anti-spam */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={formValues.company}
        onChange={(e) => updateField("company", e.target.value)}
      />

      {/* Wizard Header & Progress Indicator (Framer Offer Wizard Style) */}
      <div className="border-b border-white/10 pb-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-sans font-semibold uppercase tracking-[0.2em] text-gold">
            Step {step} of 3
          </span>
          <span className="font-sans font-medium text-ivory/60">
            {step === 1 && "Property Details"}
            {step === 2 && "Seller Information"}
            {step === 3 && "Review & Submit"}
          </span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-3 h-[2px] w-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-gold"
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Multi-Step Body */}
      <div className="mt-6 min-h-[300px]">
        <AnimatePresence mode="wait" initial={false}>
          {/* STEP 1: PROPERTY INFORMATION */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, x: direction > 0 ? 24 : -24 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction > 0 ? -24 : 24 }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <div>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Tell us about your property.
                </h3>
                <p className="mt-1 font-sans text-xs font-light text-ivory/70">
                  Address is required so our analysts can inspect recent comps.
                </p>
              </div>

              {/* Property Address */}
              <div>
                <label
                  htmlFor="wizard-address"
                  className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/80"
                >
                  Property Address <span className="text-gold">*</span>
                </label>
                <input
                  id="wizard-address"
                  type="text"
                  value={formValues.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="Street address, unit #, city, ZIP"
                  className={`mt-1.5 w-full border-b bg-white/[0.04] px-3.5 py-3 font-sans text-sm text-white placeholder:text-ivory/35 focus:outline-none transition-colors ${
                    errors.address
                      ? "border-red-400 focus:border-red-400"
                      : "border-white/20 focus:border-gold"
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 font-sans text-xs text-red-300">
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Property Type Dropdown */}
              <div>
                <label
                  htmlFor="wizard-type"
                  className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/80"
                >
                  Property Type
                </label>
                <select
                  id="wizard-type"
                  value={formValues.propertyType}
                  onChange={(e) => updateField("propertyType", e.target.value)}
                  className="mt-1.5 w-full border-b border-white/20 bg-navy-light px-3 py-3 font-sans text-sm text-white focus:border-gold focus:outline-none"
                >
                  <option value="" className="text-navy bg-white">
                    Select property type (optional)...
                  </option>
                  {FORM_PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type} className="text-navy bg-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Condition / Notes */}
              <div>
                <label
                  htmlFor="wizard-message"
                  className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/80"
                >
                  Property Condition &amp; Notes
                </label>
                <textarea
                  id="wizard-message"
                  rows={3}
                  value={formValues.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Beds/baths, deferred repairs, tenant status, or desired timeline..."
                  className="mt-1.5 w-full resize-none border-b border-white/20 bg-white/[0.04] px-3.5 py-2.5 font-sans text-sm text-white placeholder:text-ivory/35 focus:border-gold focus:outline-none"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 2: SELLER INFORMATION */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, x: direction > 0 ? 24 : -24 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction > 0 ? -24 : 24 }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <div>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Where should we send your offer?
                </h3>
                <p className="mt-1 font-sans text-xs font-light text-ivory/70">
                  Direct contact details. No cold-calling or spamming.
                </p>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="wizard-first-name"
                    className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/80"
                  >
                    First Name <span className="text-gold">*</span>
                  </label>
                  <input
                    id="wizard-first-name"
                    type="text"
                    value={formValues.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="Elena"
                    className={`mt-1 w-full border-b bg-white/[0.04] px-3 py-2.5 font-sans text-sm text-white placeholder:text-ivory/35 focus:outline-none ${
                      errors.firstName
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/20 focus:border-gold"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 font-sans text-xs text-red-300">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="wizard-last-name"
                    className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/80"
                  >
                    Last Name <span className="text-gold">*</span>
                  </label>
                  <input
                    id="wizard-last-name"
                    type="text"
                    value={formValues.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Martinez"
                    className={`mt-1 w-full border-b bg-white/[0.04] px-3 py-2.5 font-sans text-sm text-white placeholder:text-ivory/35 focus:outline-none ${
                      errors.lastName
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/20 focus:border-gold"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 font-sans text-xs text-red-300">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="wizard-email"
                    className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/80"
                  >
                    Email Address <span className="text-gold">*</span>
                  </label>
                  <input
                    id="wizard-email"
                    type="email"
                    value={formValues.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="elena@domain.com"
                    className={`mt-1 w-full border-b bg-white/[0.04] px-3 py-2.5 font-sans text-sm text-white placeholder:text-ivory/35 focus:outline-none ${
                      errors.email
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/20 focus:border-gold"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 font-sans text-xs text-red-300">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="wizard-phone"
                    className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/80"
                  >
                    Phone Number <span className="text-gold">*</span>
                  </label>
                  <input
                    id="wizard-phone"
                    type="tel"
                    value={formValues.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="(305) 555-0199"
                    className={`mt-1 w-full border-b bg-white/[0.04] px-3 py-2.5 font-sans text-sm text-white placeholder:text-ivory/35 focus:outline-none ${
                      errors.phone
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/20 focus:border-gold"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 font-sans text-xs text-red-300">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Selling Timeline */}
              <div>
                <label
                  htmlFor="wizard-timeline"
                  className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/80"
                >
                  Selling Timeline
                </label>
                <select
                  id="wizard-timeline"
                  value={formValues.timeline}
                  onChange={(e) => updateField("timeline", e.target.value)}
                  className="mt-1 w-full border-b border-white/20 bg-navy-light px-3 py-2.5 font-sans text-sm text-white focus:border-gold focus:outline-none"
                >
                  <option value="" className="text-navy bg-white">
                    Select timeline (optional)...
                  </option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t} className="text-navy bg-white">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}

          {/* STEP 3: REVIEW & SUBMIT */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, x: direction > 0 ? 24 : -24 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction > 0 ? -24 : 24 }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <div>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Review &amp; Request Cash Offer
                </h3>
                <p className="mt-1 font-sans text-xs font-light text-ivory/70">
                  Verify your details before our underwriting team begins valuation.
                </p>
              </div>

              {/* Summary Card */}
              <div className="space-y-3 rounded-xs border border-white/10 bg-white/[0.03] p-4 text-xs font-light">
                <div className="flex items-start justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-gold">
                    <Building className="h-3.5 w-3.5" />
                    <span className="font-semibold uppercase tracking-wider">
                      Property
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDirection(-1);
                      setStep(1);
                    }}
                    className="text-[11px] font-medium text-gold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-0.5 text-ivory/80">
                  <p className="font-medium text-white">{formValues.address}</p>
                  {formValues.propertyType && <p>{formValues.propertyType}</p>}
                  {formValues.message && (
                    <p className="italic text-ivory/60 line-clamp-2">
                      &quot;{formValues.message}&quot;
                    </p>
                  )}
                </div>

                <div className="flex items-start justify-between border-b border-white/10 pb-2 pt-2">
                  <div className="flex items-center gap-2 text-gold">
                    <User className="h-3.5 w-3.5" />
                    <span className="font-semibold uppercase tracking-wider">
                      Seller
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDirection(-1);
                      setStep(2);
                    }}
                    className="text-[11px] font-medium text-gold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-0.5 text-ivory/80">
                  <p className="font-medium text-white">
                    {formValues.firstName} {formValues.lastName}
                  </p>
                  <p>{formValues.email} · {formValues.phone}</p>
                  {formValues.timeline && <p>Timeline: {formValues.timeline}</p>}
                </div>
              </div>

              {serverError && (
                <div className="flex items-start gap-2 border border-red-400/40 bg-red-950/40 p-3 text-xs text-red-200">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Controls (Framer Motion Submit Button inspired) */}
      <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ivory/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </button>
        ) : (
          <span className="text-[11px] text-ivory/45">
            Takes ~1 minute · No obligation
          </span>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="group inline-flex items-center gap-2 bg-gold px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-all duration-300 hover:bg-white"
          >
            <span>{step === 1 ? "Seller Details" : "Review Offer"}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="group inline-flex items-center gap-2 bg-gold px-7 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-all duration-300 hover:bg-white disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Underwriting...</span>
              </>
            ) : (
              <>
                <span>Request 72-Hour Cash Offer</span>
                <Check className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

