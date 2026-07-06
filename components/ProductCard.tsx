"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
};

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(product)}
      aria-label={`Abrir detalhes de ${product.name}`}
      className="group text-left"
    >
      <span className="block overflow-hidden rounded-[1.35rem] bg-white shadow-sm ring-1 ring-black/5">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </span>
      <span className="mt-3 block text-sm font-semibold text-ink sm:text-base">
        {product.name}
      </span>
      <span className="mt-1 block text-xs font-medium uppercase tracking-[0.18em] text-ember/70">
        {product.category}
      </span>
    </motion.button>
  );
}
