import { Dumbbell, Users, Clock, ShieldCheck } from "lucide-react";

const benefits = [
  {
    title: "Equipamentos Modernos",
    description: "Máquinas de recorte e gravação a laser de última geração à disposição de suas idéias.",
    icon: Dumbbell,
  },
  {
    title: "Há mais de 24 anos no mercado",
    description: "Equipe formada por profissionais experientes e qualificados.",
    icon: Users,
  },
  {
    title: "Atendimento comercial",
    description: "Funcionamento de segunda a sexta, das 9:00 às 18:00 e sábadoos das 9:00 as 14:00h.",
    icon: Clock,
  },
  {
    title: "Projetos personalizados",
    description: "Soluções sob medida para atender suas necessidades específicas em cortes de MDF e gravação a laser.",
    icon: ShieldCheck,
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-ember">
          Por que a Arteiras?
        </p>
        <h2 className="mt-2 text-3xl font-bold text-ink md:text-4xl">
          Tudo que você precisa para colocar suas idéias em prática.
        </h2>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ title, description, icon: Icon }) => (
          <article
            key={title}
            className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-black/5"
          >
            <span className="grid size-12 place-items-center rounded-full bg-ember/12 text-ember">
              <Icon aria-hidden="true" size={23} />
            </span>
            <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/60">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
