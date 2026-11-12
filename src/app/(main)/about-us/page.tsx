import { getAgents, getPrincipalBroker } from "@/lib/agents";
import { buildPageMetadata } from "@/lib/seo";
import { AboutTeamExperience } from "@/components/about/AboutTeamExperience";

export const metadata = buildPageMetadata({
  title: "About & Advisors | Move Miami Realty",
  description:
    "Meet Managing Broker Victor A. Ruiz, Esq. and the Miami-native licensed real estate advisors at Move Miami Realty—uniting local insight with attorney-led contract precision.",
  path: "/about-us",
});

export default async function AboutUsPage() {
  const [principal, agents] = await Promise.all([
    getPrincipalBroker(),
    getAgents(),
  ]);

  const advisors = agents.filter((agent) => agent.slug !== principal.slug);

  return <AboutTeamExperience principal={principal} advisors={advisors} />;
}
