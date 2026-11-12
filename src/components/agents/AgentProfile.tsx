import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";
import type { Agent } from "@/types/agent";

export function AgentProfile({ agent }: { agent: Agent }) {
  return (
    <div className="grid grid-cols-1 items-start gap-12 border border-sand bg-white p-6 sm:p-10 lg:grid-cols-12 lg:p-12">
      <div className="lg:col-span-5">
        <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="lg:col-span-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
          {agent.role}
        </p>
        <h1 className="heading-section mt-2 text-navy">
          {agent.name}
        </h1>
        {agent.credentials && (
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {agent.credentials}
          </p>
        )}

        <div className="body-editorial mt-6 space-y-4 text-charcoal/85">
          {agent.bio.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {agent.specialties && agent.specialties.length > 0 && (
          <div className="mt-8 border-t border-sand pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Focus Areas
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {agent.specialties.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[15px] text-charcoal/85"
                >
                  <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3 border-t border-sand pt-6">
          {agent.whatsappHref && (
            <a
              href={agent.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-white transition-colors hover:bg-navy-light"
            >
              <MessageCircle className="h-4 w-4 text-gold" />
              <span>WhatsApp {agent.phone}</span>
            </a>
          )}
          <a
            href={agent.phoneHref}
            className="inline-flex items-center gap-2 border border-sand px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy hover:border-navy"
          >
            <Phone className="h-4 w-4 text-gold-dark" />
            <span>{agent.phone}</span>
          </a>
          <a
            href={`mailto:${agent.email}`}
            className="inline-flex items-center gap-2 border border-sand px-5 py-3 font-sans text-[14px] font-semibold text-charcoal hover:border-navy hover:text-navy"
          >
            <Mail className="h-4 w-4 text-gold-dark" />
            <span>{agent.email}</span>
          </a>
          <Link
            href="/listings"
            className="inline-flex items-center gap-1.5 px-3 py-3 font-sans text-[14px] font-semibold tracking-[0.03em] text-navy hover:text-gold-dark"
          >
            <span>Browse Listings</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

