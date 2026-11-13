"use client";

import { useState } from "react";
import type { Article } from "@/types/article";
import { ARTICLE_CATEGORIES } from "@/data/articles";
import { ArticleCard } from "./ArticleCard";
import { Reveal } from "@/components/ui/Reveal";

export function ArticleGrid({ articles }: { articles: Article[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filtered =
    selectedCategory === "All"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 border-b border-sand pb-6">
        {ARTICLE_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-5 py-2 font-sans text-[13.5px] font-semibold tracking-[0.02em] transition-all duration-200 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-[#321477] to-[#5B2EC6] text-white shadow-[0_4px_14px_rgba(91,46,198,0.3)]"
                : "border border-[#E5DBFB] bg-white text-[#321477] hover:border-[#7C52EB] hover:bg-[#FAF8FF]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article, idx) => (
          <Reveal
            key={article.slug}
            delay={Math.min(idx * 0.05, 0.3)}
            variant="fade-up"
            distance={16}
          >
            <ArticleCard article={article} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
