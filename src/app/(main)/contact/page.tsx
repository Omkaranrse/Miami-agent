import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactWhatsAppBanner } from "@/components/contact/ContactWhatsAppBanner";

export const metadata = buildPageMetadata({
  title: "Contact Us | Get in Touch with Move Miami Realtor",
  description:
    "Get in touch with Move Miami Realtor. Send a message, message us on WhatsApp, or call (305) 301-0525 for immediate attorney-led advisory across Miami.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="relative w-full">
      {/* 1. Dusk Miami Skyline Hero with Liquid Glass Wave */}
      <ContactHero />

      {/* 2. Soft Pastel Lavender Main Canvas */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F4EEFD_0%,#EFE6FB_52%,#E8DCFA_100%)] pb-20 pt-4 sm:pb-24 sm:pt-6 md:pb-28">
        {/* Ambient Subtle Lighting Halos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-32 top-10 h-[500px] w-[500px] rounded-full bg-white/60 blur-3xl" />
          <div className="absolute right-[-10%] top-40 h-[480px] w-[480px] rounded-full bg-[#C2A3FF]/20 blur-3xl" />
        </div>

        <PageContainer className="relative z-10">
          {/* Two-Column Grid: Form on Left, Contact Details on Right */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-10">
            {/* Left Column: We'd Love to Hear From You (Send a Message) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right Column: Contact Information */}
            <div className="lg:col-span-5">
              <ContactDetails />
            </div>
          </div>

          {/* 3. Prefer to Talk? WhatsApp Banner */}
          <ContactWhatsAppBanner />
        </PageContainer>
      </section>
    </div>
  );
}
