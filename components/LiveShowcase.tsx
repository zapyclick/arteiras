"use client";

import { motion } from "framer-motion";
import { Radio, Sparkles } from "lucide-react";
import type { Product } from "@/types/product";

type LiveShowcaseProps = {
  products: Product[];
  onSelect: (product: Product) => void;
};

export function LiveShowcase({ products, onSelect }: LiveShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative z-30 mx-auto -mt-16 w-[min(92vw,760px)] rounded-[1.75rem] bg-white p-4 shadow-soft ring-1 ring-black/5 md:-mt-20 md:p-6"
      aria-label="Loja Arteiras com miniaturas de produtos"
    >
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-ink md:text-2xl">
            <span className="grid size-9 place-items-center rounded-full bg-ember text-white shadow-sm">
              <Sparkles aria-hidden="true" size={18} />
            </span>
            Loja Arteiras
          </h2>
          <p className="mt-2 text-sm font-medium text-ink/70">Produtos em destaque</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ember/10 px-3 py-1 text-xs font-bold text-ember">
          <Radio aria-hidden="true" size={13} />
          Ao vivo na loja
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {products.slice(0, 8).map((product) => (
          <motion.button
            key={product.id}
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(product)}
            aria-label={`Ver ${product.name} na loja`}
            className="group overflow-hidden rounded-2xl bg-snow shadow-sm ring-1 ring-black/5"
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110"
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
