import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { OfficeLocation } from "@/components/contact/OfficeLocation";

export const metadata = buildPageMetadata({
  title: "Contact Move Miami Realtor",
  description:
    "Get in touch with Move Miami Realtor. Call (305) 301-0525, message us on WhatsApp at (305) 632-1540, or visit our Miami office at 8660 W Flagler St, Suite 100.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-sand bg-ivory pb-14 pt-32 md:pb-16 md:pt-40">
        <PageContainer>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <span>Direct Contact</span>
            </div>
            <h1 className="heading-hero mt-3 text-navy">
              Get in touch.
            </h1>
            <p className="body-editorial mt-4 max-w-2xl text-charcoal/80">
              Send a message, call our office line, or start a WhatsApp thread
              directly—our team responds personally ASAP.
            </p>
          </div>
        </PageContainer>
      </section>

      <section className="border-b border-sand bg-white py-16 md:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="border border-sand bg-ivory p-6 sm:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                  Send a Message
                </p>
                <h2 className="heading-editorial mt-2 text-3xl text-navy">
                  We’d love to hear from you.
                </h2>
                <p className="mb-6 mt-2 text-[15px] leading-relaxed text-charcoal/75">
                  Send us a note below and our team will be in touch within one
                  business day—or reach out directly on the right for immediate
                  WhatsApp or phone support.
                </p>
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-5">
              <ContactDetails />
            </div>
          </div>

          <OfficeLocation />
        </PageContainer>
      </section>
    </>
  );
}

