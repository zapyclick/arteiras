"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";

const plans = [
  {
    name: "Plano Mensal",
    price: "R$ 89,90",
    period: "/mês",
    highlights: ["Acesso ilimitado", "Horário livre", "Avaliação física"],
    featured: false,
  },
  {
    name: "Plano Trimestral",
    price: "R$ 79,90",
    period: "/mês",
    highlights: [
      "Acesso ilimitado",
      "Aulas coletivas inclusas",
      "Avaliação física",
      "Consultoria mensal",
    ],
    featured: true,
  },
  {
    name: "Plano Anual",
    price: "R$ 69,90",
    period: "/mês",
    highlights: [
      "Acesso ilimitado",
      "Aulas coletivas inclusas",
      "Avaliação física",
      "Consultoria mensal",
      "Aplicativo exclusivo",
      "2 meses grátis",
    ],
    featured: false,
  },
];

const whatsappHref = `https://wa.me/5512996864810?text=${encodeURIComponent(
  "Olá! Quero saber mais sobre os planos da Academia Atlética."
)}`;

export function Plans() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-ember">
          Invista em você
        </p>
        <h2 className="mt-2 text-3xl font-bold text-ink md:text-4xl">
          Planos que cabem no seu bolso
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ink/65">
          Escolha o plano ideal para seus objetivos. Sem multas, sem taxas escondidas.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.article
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative rounded-[1.75rem] p-7 shadow-sm ring-1 ${
              plan.featured
                ? "bg-ink text-white ring-ember/30 shadow-lift"
                : "bg-white text-ink ring-black/5"
            }`}
          >
            {plan.featured ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ember px-4 py-1 text-xs font-bold text-white shadow-lift">
                Mais popular
              </span>
            ) : null}
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-ember/80">
              {plan.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className={`text-sm font-medium ${plan.featured ? "text-white/60" : "text-ink/50"}`}>
                {plan.period}
              </span>
            </p>
            <ul className="mt-6 space-y-3">
              {plan.highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2
                    aria-hidden="true"
                    size={18}
                    className={plan.featured ? "text-ember" : "text-emerald-500"}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className={`mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lift transition ${
                plan.featured
                  ? "bg-white text-ink hover:bg-snow"
                  : "bg-ember text-white hover:bg-ink"
              }`}
            >
              <MessageCircle aria-hidden="true" size={18} />
              Quero este plano
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
