import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function CompanyStory() {
  return (
    <section className="border-b border-sand bg-ivory py-20 md:py-28">
      <PageContainer>
        <SectionHeading
          eyebrow="Who We Are"
          title="A team built on local knowledge and real experience."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal className="border border-sand bg-white p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Local Experts
            </p>
            <h3 className="heading-editorial mt-3 text-3xl text-navy">
              Miami is our home turf.
            </h3>
            <p className="body-editorial mt-4 text-charcoal/80">
              Our team of Miami natives and lifestyle experts is here to help you
              find the right neighborhood and home for you. With a tightly-knit
              team made up of Miami natives, lifestyle aficionados, and outdoor
              enthusiasts, Move Miami has the perspective and knowledge to help
              you close your next real estate deal.
            </p>
            <p className="body-editorial mt-4 text-charcoal/80">
              Whether you’re a first-time buyer, new to South Florida, or born
              and raised in Miami-Dade, we’re ready to go above and beyond your
              needs.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="border border-sand bg-white p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Seasoned Agents
            </p>
            <h3 className="heading-editorial mt-3 text-3xl text-navy">
              Veteran agents, fresh perspective.
            </h3>
            <p className="body-editorial mt-4 text-charcoal/80">
              Our team is comprised of licensed agents and brokers with a long
              history of working at some of Miami’s premier real estate
              agencies. In coming together at Move Miami, our goal is to bring a
              refreshing perspective to the local real estate scene.
            </p>
            <p className="body-editorial mt-4 text-charcoal/80">
              What does that mean for you? Advice that’s informed, practical, and
              genuine. We’ll work with you to build a complete view of your
              needs and timeline, then execute cleanly to make sure your goals
              are achieved.
            </p>
          </Reveal>
        </div>
      </PageContainer>
    </section>
  );
}

