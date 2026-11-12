"use client";

import { useState } from "react";
import type { Article } from "@/types/article";
import { ARTICLE_CATEGORIES } from "@/data/articles";
import { ArticleCard } from "./ArticleCard";

export function ArticleGrid({ articles }: { articles: Article[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filtered =
    selectedCategory === "All"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-sand pb-6">
        {ARTICLE_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 font-sans text-[14px] font-semibold tracking-[0.02em] transition-colors ${
              selectedCategory === category
                ? "bg-navy text-white"
                : "border border-sand bg-white text-charcoal hover:border-navy"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

