import { ARTICLES } from "@/data/articles";
import type { Article } from "@/types/article";

export async function getArticles(category = "All"): Promise<Article[]> {
  if (category === "All") return ARTICLES;
  return ARTICLES.filter((a) => a.category === category);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  return ARTICLES.map((a) => a.slug);
}

