import Link from "next/link";
import { Compass, Eye, MapPin, Scale } from "lucide-react";
import { BROKERAGE_INFO } from "@/lib/constants";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function MissionVision() {
  return (
    <section className="bg-ivory py-20 md:py-28">
      <PageContainer>
        <SectionHeading eyebrow="What We Stand For" title="Vision and mission." />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="border border-sand bg-white p-8 sm:p-10">
            <div className="flex items-center gap-3 text-gold-dark">
              <Eye className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Our Vision
              </span>
            </div>
            <h3 className="heading-editorial mt-4 text-3xl text-navy">
              Buyers deserve to be informed.
            </h3>
            <p className="body-editorial mt-3 text-charcoal/80">
              Making the right decision about your next real estate transaction
              starts with being informed. It’s our goal to make sure buyers and
              sellers in Miami understand real market conditions, shifting
              neighborhood dynamics, and the unique flavor of each corner of our
              city. To that end, we share Miami’s favorite locations and hidden
              nuances openly with clients and followers.
            </p>
          </div>

          <div className="border border-sand bg-white p-8 sm:p-10">
            <div className="flex items-center gap-3 text-gold-dark">
              <Compass className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Our Mission
              </span>
            </div>
            <h3 className="heading-editorial mt-4 text-3xl text-navy">
              Strip away the hassle.
            </h3>
            <p className="body-editorial mt-3 text-charcoal/80">
              Whether you’re relocating to Miami or already local and buying,
              selling, or leasing, real estate can feel opaque and slow. We exist
              to strip away the friction—delivering analytical precision,
              attorney-led contract review, and direct human communication so
              you optimize value with confidence.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border border-sand bg-white p-7 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-dark" />
            <div>
              <p className="font-sans text-lg font-semibold text-navy">
                Move Miami Realty Office
              </p>
              <p className="text-[15px] text-charcoal/80">
                {BROKERAGE_INFO.fullAddress} · {BROKERAGE_INFO.licensingNotice}
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 border border-navy px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy hover:bg-navy hover:text-white"
          >
            <Scale className="h-4 w-4" />
            <span>Contact Our Brokerage</span>
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}

