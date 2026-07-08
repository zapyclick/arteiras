"use client";

import { Sparkles, Puzzle, Box, PartyPopper, Scissors, BadgePercent } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, typeof Sparkles> = {
  Novidades: Sparkles,
  "Projetos personalizados": Puzzle,
  "Caixas e Organizadores": Box,
  "Decoração de Festa em MDF": PartyPopper,
  "Recortes para Artesanato": Scissors,
  Promoções: BadgePercent,
};

type HighlightsProps = {
  categories: readonly string[];
  activeCategory: string;
  onChange: (category: string) => void;
};

export function Highlights({ categories, activeCategory, onChange }: HighlightsProps) {
  return (
    <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6" aria-label="Filtrar publicações">
      <div className="flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const Icon = iconMap[category] ?? Sparkles;
          const isActive = activeCategory === category;

          return (
            <motion.button
              key={category}
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => onChange(category)}
              aria-pressed={isActive}
              className="flex min-w-[82px] flex-col items-center gap-2 text-center"
            >
              <span
                className={`grid size-16 place-items-center rounded-full border transition ${
                  isActive
                    ? "border-ember bg-ember text-white shadow-lift"
                    : "border-black/5 bg-white text-ink shadow-sm"
                }`}
              >
                <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
              </span>
              <span className="text-xs font-semibold text-ink/75">{category}</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
