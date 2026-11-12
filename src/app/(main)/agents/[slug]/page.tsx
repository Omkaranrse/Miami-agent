import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAgentBySlug, getAllAgentSlugs } from "@/lib/agents";
import { BROKERAGE_INFO } from "@/lib/constants";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AgentProfile } from "@/components/agents/AgentProfile";
import { FinalCTA } from "@/components/home/FinalCTA";

export async function generateStaticParams() {
  const slugs = await getAllAgentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) return { title: "Agent Not Found" };

  return {
    title: `${agent.name} — ${agent.role}`,
    description: agent.bio[0],
    openGraph: {
      title: `${agent.name} | ${BROKERAGE_INFO.brandName}`,
      description: agent.bio[0],
      images: [{ url: agent.image }],
    },
  };
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) notFound();

  return (
    <div className="bg-ivory pt-28">
      <div className="border-b border-sand bg-white py-4">
        <PageContainer className="flex flex-wrap items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Our Team", href: "/agents" },
              { label: agent.name },
            ]}
          />
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold tracking-[0.03em] text-navy hover:text-gold-dark"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Advisors</span>
          </Link>
        </PageContainer>
      </div>

      <section className="py-12 md:py-20">
        <PageContainer>
          <AgentProfile agent={agent} />
        </PageContainer>
      </section>

      <FinalCTA />
    </div>
  );
}

