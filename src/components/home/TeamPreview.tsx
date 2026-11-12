import { AGENTS } from "@/data/agents";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AgentCard } from "@/components/agents/AgentCard";

export function TeamPreview() {
  return (
    <section className="border-t border-sand bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Meet the Team"
          title="Experienced local advisors. Zero handoffs."
          description="Every agent on the Move Miami roster is a licensed Florida real estate professional who brings direct accountability from first showing to closing."
          actionLabel="Full Team Directory"
          actionHref="/agents"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.slice(0, 3).map((agent, idx) => (
            <Reveal key={agent.slug} delay={idx * 0.06}>
              <AgentCard agent={agent} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

