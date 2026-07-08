"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, MapPin, MessageCircle, Clock, ArrowDown, Store, Sparkles } from "lucide-react";
import { Benefits } from "@/components/Benefits";
import { Highlights } from "@/components/Highlights";
import { FeedShowcase } from "@/components/FeedShowcase";
import { PostCard } from "@/components/PostCard";
import { PostModal } from "@/components/PostModal";
import { postCategories, fallbackPosts } from "@/data/posts";
import type { Post } from "@/types/post";

const whatsappHref = `https://wa.me/5511993286974?text=${encodeURIComponent(
  "Olá! Quero saber mais sobre a Arteiras."
)}`;

const heroImage =
  "https://i.postimg.cc/TwFNg4JH/arteiras-hero2-webp.webp";

type PublicPost = {
  id: string;
  title: string;
  caption: string;
  category: string;
  image_url: string;
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("Novidades");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postsState, setPostsState] = useState<Post[]>(fallbackPosts);

  useEffect(() => {
    let mounted = true;

    fetch("/api/public-posts", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { posts?: PublicPost[] } | null) => {
        if (!mounted || !payload?.posts?.length) {
          return;
        }

        const mapped: Post[] = payload.posts.map((row) => ({
          id: row.id,
          name: row.title,
          category: (row.category || "Novidades") as Post["category"],
          image: row.image_url,
          description: row.caption,
        }));

        setPostsState(mapped);
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    return postsState.filter((post) => post.category === activeCategory);
  }, [activeCategory, postsState]);

  return (
    <main className="relative">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center bg-ink/70 px-4 py-3 backdrop-blur-sm sm:px-6">
        <img
          src="/logo.png"
          alt="Arteiras"
          className="h-12 w-auto object-contain"
        />
      </header>
      <section
        className="relative z-0 min-h-[86svh] overflow-hidden rounded-b-[2.25rem] bg-ink text-white"
        aria-label="Hero da Arteiras"
      >
        <img
          src={heroImage}
          alt="Arteiras recorte a laser em MDF para artesanato, lembranças e decoração"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/40 to-ink/80" />
        <div className="relative mx-auto flex min-h-[72svh] max-w-6xl flex-col justify-center px-4 pb-24 pt-16 sm:px-6 md:min-h-[76svh]">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl"
          >
            Imagine.{" "}
            <span className="text-ember">Arteiras produz pra você.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-5 max-w-xl text-lg leading-8 text-white/80"
          >
            Da inspiração à peça pronta: criamos cortes a laser em MDF que dão vida aos seus projetos e momentos especiais.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#benefits"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-bold text-white shadow-lift transition hover:bg-white hover:text-ink"
            >
              Quero fazer arte
              <ArrowDown aria-hidden="true" size={18} />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/12 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/22"
            >
              <MessageCircle aria-hidden="true" size={18} />
              Falar no WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      <FeedShowcase posts={postsState} onSelect={setSelectedPost} />

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { value: "+24", label: "Anos de história" },
            { value: "+500", label: "Projetos realizados" },
            { value: "+200", label: "Clientes atendidos" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.5rem] bg-white p-8 text-center shadow-sm ring-1 ring-black/5"
            >
              <p className="text-4xl font-bold text-ember">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-ink/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Benefits />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-ember">
              Fique por dentro
            </p>
            <h2 className="mt-2 text-3xl font-bold text-ink md:text-4xl">
              {activeCategory}
            </h2>
          </div>
          <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink/60 shadow-sm ring-1 ring-black/5 sm:inline-flex">
            {filteredPosts.length} publicações
          </span>
        </div>

        <Highlights
          categories={postCategories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onSelect={setSelectedPost} />
          ))}
        </div>
      </section>

      <section className="mx-4 mb-16 overflow-hidden rounded-[2rem] bg-ink px-5 py-12 text-white sm:mx-6 md:mx-auto md:max-w-6xl md:px-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Sparkles aria-hidden="true" size={32} className="mx-auto text-ember" />
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Pronto para fazer arte?
          </h2>
          <p className="mt-4 text-base leading-7 text-white/74 md:text-lg">
            Envie seu projeto, damos vida às suas idéias!
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-ember px-8 py-4 text-base font-bold text-white shadow-lift transition hover:bg-white hover:text-ink"
          >
            <MessageCircle aria-hidden="true" size={20} />
            Envie suas idéias no WhatsApp
          </a>
        </div>
      </section>

      <footer className="border-t border-black/5 bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-7 text-sm text-ink/68 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <img src="/logo.png" alt="Arteiras" className="h-10 w-auto" />
            <p className="mt-3 max-w-md leading-6 text-ink/68">
              Da inspiração à peça pronta: criamos cortes a laser em MDF que dão vida aos seus projetos.
            </p>
          </div>
          <div className="space-y-3">
            <a
              href="https://www.instagram.com/arteiras_decor/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition hover:text-ember"
            >
              <Instagram aria-hidden="true" size={18} />
              @arteiras_decor
            </a>
            <a href="/admin" className="flex items-center gap-2 transition hover:text-ember">
              <Store aria-hidden="true" size={18} />
              Painel admin
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition hover:text-ember"
            >
              <MessageCircle aria-hidden="true" size={18} />
              (11) 99328-6974
            </a>
          </div>
          <div className="space-y-3">
            <p className="flex items-start gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
              Estr. dos Casa, 3612 - Jd. Ipê, São Bernardo do Campo - SP
            </p>
            <p className="flex items-start gap-2">
              <Clock aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
              Seg a sex, 9:00 às 18:00, sab 9:00 às 14:00
            </p>
          </div>
        </div>
      </footer>

      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </main>
  );
}
