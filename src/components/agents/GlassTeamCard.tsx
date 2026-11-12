"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import type { Agent } from "@/types/agent";

interface GlassTeamCardProps {
  agent: Agent;
}

export function GlassTeamCard({ agent }: GlassTeamCardProps) {
  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative aspect-[292/368] w-full overflow-hidden rounded-[18px] border border-white/75 bg-[#21124B] shadow-[0_22px_50px_-14px_rgba(61,27,142,0.34)]"
    >
      {/* Full-Bleed Portrait with Framer GlassTeamCards Hover Transform */}
      <Link
        href={`/agents/${agent.slug}`}
        aria-label={`View profile for ${agent.name}`}
        className="absolute inset-0 z-0 block"
      >
        <motion.div
          variants={{
            rest: { scale: 1, rotate: 0, filter: "grayscale(0%)" },
            hover: { scale: 1.09, rotate: 2, filter: "grayscale(100%)" },
          }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
          className="relative h-full w-full"
        >
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top"
          />
        </motion.div>

        {/* Subtle Dark-Violet Ambient Vignette for Glass Legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#160A33]/75 via-transparent to-[#160A33]/15"
        />
      </Link>

      {/* Bottom Floating Frosted Glass Panel */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end p-4">
        <div className="pointer-events-auto rounded-[14px] border border-white/35 bg-[#1B0E40]/55 px-4 py-3.5 text-center backdrop-blur-md shadow-[0_12px_30px_rgba(14,7,38,0.45)] transition-colors duration-300 group-hover:border-white/55 group-hover:bg-[#1B0E40]/70">
          <Link href={`/agents/${agent.slug}`} className="block">
            <h3 className="font-serif text-[25px] font-medium leading-tight tracking-[-0.01em] text-white">
              {agent.name}
            </h3>
          </Link>

          <p className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#DDD0FF]">
            {agent.role}
          </p>

          {/* Circular Quick Contact Icons */}
          <div className="mt-3 flex items-center justify-center gap-2.5">
            {agent.phoneHref && (
              <a
                href={agent.phoneHref}
                aria-label={`Call ${agent.name}`}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1B0E40] shadow-xs transition-transform hover:scale-110"
              >
                <Phone className="h-3.5 w-3.5" />
              </a>
            )}

            <a
              href={`mailto:${agent.email}`}
              aria-label={`Email ${agent.name}`}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1B0E40] shadow-xs transition-transform hover:scale-110"
            >
              <Mail className="h-3.5 w-3.5" />
            </a>

            {agent.whatsappHref && (
              <a
                href={agent.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Message ${agent.name} on WhatsApp`}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1B0E40] shadow-xs transition-transform hover:scale-110"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
            )}

            <Link
              href={`/agents/${agent.slug}`}
              aria-label={`Open full profile for ${agent.name}`}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1B0E40] shadow-xs transition-transform hover:scale-110"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

