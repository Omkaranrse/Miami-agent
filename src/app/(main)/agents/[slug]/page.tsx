import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAgentBySlug, getAllAgentSlugs } from "@/lib/agents";
import { BROKERAGE_INFO } from "@/lib/constants";
import { PageContainer } from "@/components/layout/PageContainer";
import { AgentProfile } from "@/components/agents/AgentProfile";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";

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
    <div className="relative overflow-hidden bg-[linear-gradient(135deg,#F8F5FF_0%,#EDE3FF_52%,#DFD1FF_100%)] pt-28 md:pt-32">
      {/* Ambient Lavender Halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-20 h-[420px] w-[420px] rounded-full bg-white/55 blur-3xl" />
        <div className="absolute right-[6%] top-12 h-[440px] w-[440px] rounded-full bg-[#B998FF]/25 blur-3xl" />
      </div>

      <section className="relative z-10 pb-20 pt-4 md:pb-24">
        <PageContainer>
          {/* Minimal Back Pill (Breadcrumbs removed for clean aesthetic) */}
          <div className="mb-8">
            <Link
              href="/about-us#team"
              className="inline-flex items-center gap-2 rounded-full border border-white/85 bg-white/75 px-4 py-2 font-sans text-[13px] font-semibold text-[#21124B] shadow-xs backdrop-blur-md transition-all hover:border-[#6136D6] hover:bg-white hover:text-[#4C2B9A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>All Advisors</span>
            </Link>
          </div>

          <Reveal variant="fade-up">
            <AgentProfile agent={agent} />
          </Reveal>
        </PageContainer>
      </section>

      <FinalCTA />
    </div>
  );
}
