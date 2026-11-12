import { AGENTS } from "@/data/agents";
import type { Agent } from "@/types/agent";

export async function getAgents(): Promise<Agent[]> {
  return AGENTS;
}

export async function getPrincipalBroker(): Promise<Agent> {
  return AGENTS.find((a) => a.isPrincipal) ?? AGENTS[0];
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  return AGENTS.find((a) => a.slug === slug) ?? null;
}

export async function getAllAgentSlugs(): Promise<string[]> {
  return AGENTS.map((a) => a.slug);
}

