import { getPrincipalBroker } from "@/lib/agents";
import { buildPageMetadata } from "@/lib/seo";
import { ServiceHero } from "@/components/services/ServiceHero";
import { CompanyStory } from "@/components/about/CompanyStory";
import { PrincipalProfile } from "@/components/about/PrincipalProfile";
import { MissionVision } from "@/components/about/MissionVision";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata = buildPageMetadata({
  title: "About Move Miami Realty",
  description:
    "Miami natives, seasoned real estate brokers, and attorney-led contract representation helping buyers, sellers, and investors close cleanly across Miami-Dade and Broward.",
  path: "/about-us",
});

export default async function AboutUsPage() {
  const principal = await getPrincipalBroker();

  return (
    <>
      <ServiceHero
        eyebrow="About Move Miami Realty"
        title="Miami natives. Practical advice."
        description="A tightly-knit team of lifestyle aficionados and licensed Florida brokers who close deals in the city we grew up in—pairing boutique attention with attorney-led analytical rigor."
        image="/images/heroes/team-group.jpg"
        imageAlt="Move Miami Realtor team aboard in Biscayne Bay"
      />

      <CompanyStory />
      <PrincipalProfile principal={principal} />
      <MissionVision />
      <FinalCTA />
    </>
  );
}

