"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import {
  Camera,
  CheckCircle2,
  ImagePlus,
  LayoutGrid,
  LogIn,
  LogOut,
  MessageCircle,
  Send,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { postCategories } from "@/data/posts";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type DraftPost = {
  image: string;
  caption: string;
  category: string;
};

type SharedDraft = {
  imageDataUrl: string;
  fileName: string;
  fileType: string;
  caption: string;
};

const emptyDraft: DraftPost = {
  image: "",
  caption: "",
  category: "Novidades",
};

function dataUrlToFile(dataUrl: string, fileName: string, fileType: string) {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/data:(.*);base64/)?.[1] || fileType || "image/jpeg";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new File([bytes], fileName || "foto-compartilhada.jpg", { type: mime });
}

export function AdminPublisher() {
  const [draft, setDraft] = useState<DraftPost>(emptyDraft);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [publishedAt, setPublishedAt] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const supabaseAuth = supabase?.auth as unknown as { signInWithPassword: (params: { email: string; password: string }) => Promise<{ error: Error | null }>; signOut: () => Promise<void>; } | undefined;
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [posts, setPosts] = useState<Array<{ id: string; title: string; category: string; created_at: string }>>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canPublish = Boolean(session && selectedFile && draft.caption.trim() && !isSaving);

  const previewTitle = useMemo(() => {
    const [firstLine] = draft.caption.trim().split("\n");
    return firstLine || "Nova publicação";
  }, [draft.caption]);

  useEffect(() => {
    try {
      const client = createBrowserSupabaseClient();
      setSupabase(client);

      const auth = client.auth as unknown as {
        getSession: () => Promise<{ data: { session: Session | null } }>;
        onAuthStateChange: (callback: (event: string, session: Session | null) => void) => { data: { subscription: { unsubscribe: () => void } } };
        signInWithPassword: (params: { email: string; password: string }) => Promise<{ error: Error | null }>;
        signOut: () => Promise<void>;
      };

      auth.getSession().then(({ data }) => {
        setSession(data.session);
      });

      const {
        data: { subscription },
      } = auth.onAuthStateChange((_event, nextSession) => {
        setSession(nextSession);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Supabase nao configurado.");
      return undefined;
    }
  }, []);

  useEffect(() => {
    if (!session) {
      setPosts([]);
      return;
    }

    let mounted = true;
    setLoadingPosts(true);

    fetch("/api/public-posts", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { posts?: Array<{ id: string; title: string; category: string; created_at: string }> } | null) => {
        if (!mounted) return;
        setPosts(payload?.posts || []);
        setLoadingPosts(false);
      })
      .catch(() => {
        if (mounted) setLoadingPosts(false);
      });

    return () => { mounted = false; };
  }, [session]);

  useEffect(() => {
    const rawDraft = sessionStorage.getItem("arteiras-shared-draft");

    if (!rawDraft) {
      return;
    }

    try {
      const sharedDraft = JSON.parse(rawDraft) as SharedDraft;
      const file = dataUrlToFile(
        sharedDraft.imageDataUrl,
        sharedDraft.fileName,
        sharedDraft.fileType
      );

      setSelectedFile(file);
      setDraft((current) => ({
        ...current,
        image: sharedDraft.imageDataUrl,
        caption: sharedDraft.caption || current.caption,
      }));
      setStatusMessage("Foto recebida do compartilhamento. Revise e publique.");
      sessionStorage.removeItem("arteiras-shared-draft");
    } catch {
      setErrorMessage("Nao foi possivel abrir a foto compartilhada.");
    }
  }, []);

  function updateDraft(field: keyof DraftPost, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function handleFile(file?: File) {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    updateDraft("image", previewUrl);
    setPublishedAt("");
    setStatusMessage("");
    setErrorMessage("");
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFile(event.target.files?.[0]);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      return;
    }

    setErrorMessage("");
    setStatusMessage("");

    const { error } = await supabaseAuth!.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setStatusMessage("Login realizado. Agora voce pode publicar.");
  }

  async function handleLogout() {
    await supabaseAuth?.signOut();
    setStatusMessage("Voce saiu do painel.");
  }

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setStatusMessage("Criando conta...");

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setErrorMessage(payload.error || "Nao foi possivel criar conta.");
      return;
    }

    setStatusMessage("Conta criada! Faca login para continuar.");
    setIsSignupMode(false);
    setPassword("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canPublish || !selectedFile || !session) {
      return;
    }

    setIsSaving(true);
    setErrorMessage("");
    setStatusMessage("");

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("caption", draft.caption);
    formData.append("category", draft.category);

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      body: formData,
    });

    const payload = await response.json();

    if (!response.ok) {
      setErrorMessage(payload.error || "Nao foi possivel publicar.");
      setIsSaving(false);
      return;
    }

    setPublishedAt(
      new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date())
    );
    setStatusMessage("Publicado no feed com sucesso.");
    setIsSaving(false);
  }

  async function handleDelete(postId: string) {
    if (!session || deletingId) return;

    setDeletingId(postId);
    setErrorMessage("");
    setStatusMessage("");

    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      const payload = await response.json();
      setErrorMessage(payload.error || "Nao foi possivel deletar.");
      setDeletingId(null);
      return;
    }

    setPosts((current) => current.filter((post) => post.id !== postId));
    setStatusMessage("Post deletado com sucesso.");
    setDeletingId(null);
  }

  return (
    <div className="min-h-screen bg-[#10100f] px-4 py-5 text-ink sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-ember px-4 py-2 text-xs font-bold text-white shadow-lift">
            <Sparkles aria-hidden="true" size={15} />
            Publicar no feed da Arteiras
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[390px_1fr] lg:items-start">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto w-full max-w-[390px] rounded-[2.25rem] border border-white/10 bg-[#252421] p-3 shadow-soft"
            aria-label="Painel de publicacao"
          >
            <div className="rounded-[1.8rem] bg-white shadow-lift">
              <header className="flex items-center justify-between border-b border-black/10 px-5 py-4">
                <a
                  href="/"
                  className="text-xs font-bold text-ink/70 transition hover:text-ember"
                >
                  Feed
                </a>
                <span className="border-b-2 border-ember pb-1 text-xs font-bold text-ink">
                  Compartilhar foto
                </span>
                {session ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1 text-xs font-bold text-ember"
                  >
                    <LogOut aria-hidden="true" size={14} />
                    Sair
                  </button>
                ) : (
                  <span className="text-xs font-bold text-ember">Login</span>
                )}
              </header>

              {!session ? (
                <div className="px-5 py-5">
                  <div className="mb-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => { setIsSignupMode(false); setErrorMessage(""); setStatusMessage(""); }}
                      className={`flex-1 rounded-lg py-2 text-sm font-bold transition ${
                        !isSignupMode
                          ? "bg-ink text-white"
                          : "bg-snow text-ink/50 hover:text-ink"
                      }`}
                    >
                      Entrar
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsSignupMode(true); setErrorMessage(""); setStatusMessage(""); }}
                      className={`flex-1 rounded-lg py-2 text-sm font-bold transition ${
                        isSignupMode
                          ? "bg-ink text-white"
                          : "bg-snow text-ink/50 hover:text-ink"
                      }`}
                    >
                      Criar conta
                    </button>
                  </div>

                  {isSignupMode ? (
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div>
                        <h1 className="text-lg font-bold text-ink">Criar conta</h1>
                        <p className="mt-1 text-xs font-medium text-ink/50">
                          Crie sua conta para publicar no feed da Arteiras.
                        </p>
                      </div>
                      <label className="block">
                        <span className="text-xs font-bold text-ink/70">Email</span>
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          className="mt-1 min-h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm text-ink shadow-sm focus:border-ember focus:outline-none"
                          autoComplete="email"
                          required
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs font-bold text-ink/70">Senha (min. 6 caracteres)</span>
                        <input
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          className="mt-1 min-h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm text-ink shadow-sm focus:border-ember focus:outline-none"
                          autoComplete="new-password"
                          minLength={6}
                          required
                        />
                      </label>
                      <button
                        type="submit"
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-ember px-4 text-sm font-bold text-white shadow-lift transition hover:bg-ink"
                      >
                        Criar conta
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <h1 className="text-lg font-bold text-ink">Entrar no painel</h1>
                        <p className="mt-1 text-xs font-medium text-ink/50">
                          Use seu email e senha para publicar.
                        </p>
                      </div>
                      <label className="block">
                        <span className="text-xs font-bold text-ink/70">Email</span>
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          className="mt-1 min-h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm text-ink shadow-sm focus:border-ember focus:outline-none"
                          autoComplete="email"
                          required
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs font-bold text-ink/70">Senha</span>
                        <input
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          className="mt-1 min-h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm text-ink shadow-sm focus:border-ember focus:outline-none"
                          autoComplete="current-password"
                          required
                        />
                      </label>
                      <button
                        type="submit"
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-bold text-white shadow-lift transition hover:bg-ember"
                      >
                        <LogIn aria-hidden="true" size={17} />
                        Entrar
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
                  <div>
                    <h1 className="text-lg font-bold text-ink">Publicar no feed</h1>
                    <p className="mt-1 text-xs font-medium text-ink/50">Arteiras</p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="sr-only"
                    aria-label="Selecionar foto"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(event) => {
                      event.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(event) => {
                      event.preventDefault();
                      setIsDragging(false);
                      handleFile(event.dataTransfer.files[0]);
                    }}
                    className={`group relative grid min-h-[250px] w-full place-items-center overflow-hidden rounded-xl border transition ${
                      isDragging
                        ? "border-ember bg-ember/10"
                        : "border-transparent bg-[#f2a7c3]"
                    }`}
                    aria-label="Compartilhar foto da galeria"
                  >
                    {draft.image ? (
                      <>
                        <img
                          src={draft.image}
                          alt="Preview da foto selecionada"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                          <Camera aria-hidden="true" size={13} />
                          Trocar foto
                        </span>
                      </>
                    ) : (
                      <div className="text-center text-ember">
                        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-white/60 text-ember shadow-sm">
                          <ImagePlus aria-hidden="true" size={30} />
                        </span>
                        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-white">
                          <Upload aria-hidden="true" size={13} />
                          Compartilhar da galeria
                        </span>
                      </div>
                    )}
                  </button>

                  <label className="block">
                    <span className="text-xs font-bold text-ink/70">Legenda</span>
                    <textarea
                      value={draft.caption}
                      onChange={(event) => updateDraft("caption", event.target.value)}
                      placeholder="Ex: Treino de hoje foi pesado! Venha treinar conosco..."
                      rows={3}
                      className="mt-1 min-h-20 w-full resize-none rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-ink shadow-sm transition placeholder:text-ink/35 focus:border-ember focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-bold text-ink/70">Categoria</span>
                    <select
                      value={draft.category}
                      onChange={(event) => updateDraft("category", event.target.value)}
                      className="mt-1 min-h-11 w-full rounded-lg border border-black/10 bg-[#2d2d2b] px-3 text-sm font-bold text-white shadow-sm focus:border-ember focus:outline-none"
                      aria-label="Selecionar categoria"
                    >
                      {postCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    type="submit"
                    disabled={!canPublish}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-bold text-white shadow-lift transition hover:bg-ember disabled:cursor-not-allowed disabled:bg-ink/35"
                  >
                    <Send aria-hidden="true" size={17} />
                    {isSaving ? "Publicando..." : "Publicar"}
                  </button>

                  {publishedAt ? (
                    <div
                      role="status"
                      className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700"
                    >
                      <CheckCircle2 aria-hidden="true" size={17} />
                      Publicado as {publishedAt}
                    </div>
                  ) : null}
                </form>
              )}

              {statusMessage ? (
                <div className="mx-5 mb-5 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
                  {statusMessage}
                </div>
              ) : null}
              {errorMessage ? (
                <div className="mx-5 mb-5 rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
                  {errorMessage}
                </div>
              ) : null}
            </div>
          </motion.section>

          <section className="grid gap-5 lg:grid-cols-[1fr_260px]">
            <article className="rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-black/5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">
                    Preview
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-ink">Como aparece no feed</h2>
                </div>
                <span className="grid size-11 place-items-center rounded-full bg-snow text-ember">
                  <LayoutGrid aria-hidden="true" size={20} />
                </span>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-[280px_1fr]">
                <div className="overflow-hidden rounded-[1.5rem] bg-snow shadow-sm ring-1 ring-black/5">
                  {draft.image ? (
                    <img
                      src={draft.image}
                      alt="Preview da publicação no feed"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  ) : (
                    <div className="grid aspect-[4/5] place-items-center bg-[#f2a7c3] text-ember">
                      <ImagePlus aria-hidden="true" size={42} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-ember">
                    {draft.category}
                  </p>
                  <h3 className="mt-3 text-3xl font-bold text-ink">{previewTitle}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-ink/65">
                    {draft.caption ||
                      "A legenda vira a descricao da publicacao. Use uma frase curta e um convite para interagir."}
                  </p>
                  <button
                    type="button"
                    className="mt-7 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-ember px-6 text-sm font-bold text-white shadow-lift"
                  >
                    <MessageCircle aria-hidden="true" size={18} />
                    Saber mais no WhatsApp
                  </button>
                </div>
              </div>
            </article>

            <aside className="rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-black/5">
              <h2 className="text-sm font-bold text-ink">Gerenciar posts</h2>

              {loadingPosts ? (
                <p className="mt-4 text-sm text-ink/50">Carregando...</p>
              ) : posts.length === 0 ? (
                <p className="mt-4 text-sm text-ink/50">Nenhum post publicado ainda.</p>
              ) : (
                <ul className="mt-4 space-y-2">
                  {posts.map((post) => (
                    <li
                      key={post.id}
                      className="flex items-center justify-between gap-2 rounded-xl bg-snow p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-ink">
                          {post.title}
                        </p>
                        <p className="text-[11px] font-semibold text-ink/50">{post.category}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="grid size-9 shrink-0 place-items-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                        aria-label={`Deletar ${post.title}`}
                      >
                        <Trash2 aria-hidden="true" size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </aside>
          </section>
        </div>
      </div>
    </div>
  );
}

