"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect } from "react";
import type { Post } from "@/types/post";

type PostModalProps = {
  post: Post | null;
  onClose: () => void;
};

const whatsappBase = "https://wa.me/5511993286974";

export function PostModal({ post, onClose }: PostModalProps) {
  useEffect(() => {
    if (!post) {
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
  }, [onClose, post]);

  const whatsappHref = `${whatsappBase}?text=${encodeURIComponent(
    "Olá! Vi essa publicação no feed da Arteiras e tenho interesse."
  )}`;

  return (
    <AnimatePresence>
      {post ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/55 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="post-modal-title"
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
                  src={post.image}
                  alt={post.name}
                  loading="lazy"
                  className="h-full min-h-[320px] w-full object-cover"
                />
              </div>
              <div className="flex flex-col p-6 sm:p-8">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar"
                  className="ml-auto grid size-11 place-items-center rounded-full bg-snow text-ink transition hover:bg-ink hover:text-white"
                >
                  <X aria-hidden="true" size={20} />
                </button>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-ember">
                  {post.category}
                </p>
                <h3 id="post-modal-title" className="mt-3 text-3xl font-bold text-ink">
                  {post.name}
                </h3>
                <p className="mt-4 text-base leading-7 text-ink/70">{post.description}</p>
                <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Falar sobre esta publicação no WhatsApp"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-bold text-white shadow-lift transition hover:bg-ink"
                  >
                    <MessageCircle aria-hidden="true" size={19} />
                    Saber mais no WhatsApp
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
