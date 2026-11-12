import { getAgents, getPrincipalBroker } from "@/lib/agents";
import { buildPageMetadata } from "@/lib/seo";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceHero } from "@/components/services/ServiceHero";
import { PrincipalProfile } from "@/components/about/PrincipalProfile";
import { AgentGrid } from "@/components/agents/AgentGrid";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata = buildPageMetadata({
  title: "Our Miami Real Estate Team",
  description:
    "Meet Managing Broker Victor A. Ruiz, Esq. and the licensed Miami-Dade & Broward real estate advisors at Move Miami Realty.",
  path: "/agents",
});

export default async function AgentsPage() {
  const [principal, agents] = await Promise.all([
    getPrincipalBroker(),
    getAgents(),
  ]);

  const advisors = agents.filter((agent) => agent.slug !== principal.slug);

  return (
    <>
      <ServiceHero
        eyebrow="Move Miami Advisors"
        title="Licensed Miami-Dade advisors."
        description="Every transaction benefits from a Miami-native team of brokers and sales associates backed directly by managing broker and practicing trial attorney Victor A. Ruiz, Esq."
        image="/images/heroes/team-group.jpg"
        imageAlt="Move Miami Realtor team on Biscayne Bay"
      />

      <PrincipalProfile principal={principal} showDirectoryLink={false} />

      <section className="bg-ivory py-20 md:py-28">
        <PageContainer>
          <SectionHeading
            eyebrow="Our Roster"
            title="Meet our local sales advisors."
            description="Select any advisor below to review their bio, neighborhood focus areas, and direct phone or email contact details."
          />

          <div className="mt-12">
            <AgentGrid agents={advisors} />
          </div>
        </PageContainer>
      </section>

      <FinalCTA />
    </>
  );
}

