"use client";

import { motion } from "framer-motion";
import type { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
  onSelect: (post: Post) => void;
};

export function PostCard({ post, onSelect }: PostCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(post)}
      aria-label={`Ver detalhes de ${post.name}`}
      className="group text-left"
    >
      <span className="block overflow-hidden rounded-[1.35rem] bg-white shadow-sm ring-1 ring-black/5">
        <img
          src={post.image}
          alt={post.name}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </span>
      <span className="mt-3 block text-sm font-semibold text-ink sm:text-base">
        {post.name}
      </span>
      <span className="mt-1 block text-xs font-medium uppercase tracking-[0.18em] text-ember/70">
        {post.category}
      </span>
    </motion.button>
  );
}
