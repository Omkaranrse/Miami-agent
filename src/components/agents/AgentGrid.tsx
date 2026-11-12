import type { Agent } from "@/types/agent";
import { Reveal } from "@/components/ui/Reveal";
import { AgentCard } from "./AgentCard";

export function AgentGrid({ agents }: { agents: Agent[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent, idx) => (
        <Reveal key={agent.slug} delay={idx * 0.05}>
          <AgentCard agent={agent} />
        </Reveal>
      ))}
    </div>
  );
}

