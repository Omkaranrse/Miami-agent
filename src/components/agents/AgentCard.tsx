import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, ArrowRight } from "lucide-react";
import type { Agent } from "@/types/agent";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <article className="group flex flex-col border border-sand bg-ivory">
      <Link
        href={`/agents/${agent.slug}`}
        className="relative aspect-[4/5] overflow-hidden bg-navy"
      >
        <Image
          src={agent.image}
          alt={agent.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
            {agent.role}
          </p>
          <h3 className="mt-1 font-sans text-xl font-semibold text-navy">
            <Link href={`/agents/${agent.slug}`} className="hover:text-gold-dark">
              {agent.name}
            </Link>
          </h3>
          {agent.credentials && (
            <p className="mt-1 text-xs font-medium text-muted">
              {agent.credentials}
            </p>
          )}
          <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-charcoal/80">
            {agent.bio[0]}
          </p>
        </div>

        <div className="mt-6 space-y-2 border-t border-sand pt-4 text-xs">
          <a
            href={agent.phoneHref}
            className="flex items-center gap-2 font-medium text-navy hover:text-gold-dark"
          >
            <Phone className="h-3.5 w-3.5 text-gold-dark" />
            <span>{agent.phone}</span>
          </a>
          <a
            href={`mailto:${agent.email}`}
            className="flex items-center gap-2 text-charcoal/80 hover:text-navy"
          >
            <Mail className="h-3.5 w-3.5 text-gold-dark" />
            <span>{agent.email}</span>
          </a>
          <Link
            href={`/agents/${agent.slug}`}
            className="inline-flex items-center gap-1.5 pt-2 font-sans text-[14px] font-semibold tracking-[0.03em] text-navy hover:text-gold-dark"
          >
            <span>View Profile</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

