"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect } from "react";
import type { Product } from "@/types/product";

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
};

const whatsappBase = "https://wa.me/5511993286974";

export function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    if (!product) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, product]);

  const whatsappHref = `${whatsappBase}?text=${encodeURIComponent(
    "Olá! Tenho interesse neste produto."
  )}`;

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/55 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[1.75rem] bg-white shadow-soft"
          >
            <div className="grid md:grid-cols-[1.05fr_0.95fr]">
              <div className="bg-snow">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full min-h-[320px] w-full object-cover"
                />
              </div>
              <div className="flex flex-col p-6 sm:p-8">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar modal"
                  className="ml-auto grid size-11 place-items-center rounded-full bg-snow text-ink transition hover:bg-ink hover:text-white"
                >
                  <X aria-hidden="true" size={20} />
                </button>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-ember">
                  {product.category}
                </p>
                <h3 id="product-modal-title" className="mt-3 text-3xl font-bold text-ink">
                  {product.name}
                </h3>
                <p className="mt-4 text-base leading-7 text-ink/70">{product.description}</p>
                {product.price ? (
                  <p className="mt-5 text-2xl font-bold text-ink">{product.price}</p>
                ) : null}
                <p className="mt-5 rounded-2xl bg-snow p-4 text-sm leading-6 text-ink/70">
                  Produto disponível na loja. Consulte detalhes pelo WhatsApp.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Consultar ${product.name} no WhatsApp`}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-bold text-white shadow-lift transition hover:bg-ink"
                  >
                    <MessageCircle aria-hidden="true" size={19} />
                    Consultar no WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-12 rounded-full border border-black/10 px-5 py-3 text-sm font-bold text-ink transition hover:bg-snow"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
