import type { Post } from "@/types/post";

export const fallbackPosts: Post[] = [
  {
    id: "treino-cardio",
    name: "Treino de Cardio Matinal",
    category: "Dicas",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85",
    description:
      "Comece o dia com 20 minutos de cardio. Melhora a circulação, acelera o metabolismo e dá energia para o dia todo.",
  },
  {
    id: "promocao-matricula",
    name: "Promoção de Matrícula",
    category: "Promoções",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85",
    description:
      "Matrícula grátis nesta semana! Aproveite e comece a transformar seu corpo conosco.",
  },
  {
    id: "aula-coletiva",
    name: "Aula Coletiva de Spinning",
    category: "Atividades",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=900&q=85",
    description:
      "Turma de spinning todas as terças e quintas às 18h. Vagas limitadas!",
  },
  {
    id: "resultado-aluna",
    name: "Transformação em 3 Meses",
    category: "Resultados",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
    description:
      "A Maria conquistou seus objetivos com acompanhamento personalizado. Você também pode!",
  },
  {
    id: "dica-postura",
    name: "Dica: Postura no Agachamento",
    category: "Dicas",
    image:
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=85",
    description:
      "Mantenha a coluna neutra e o peito aberto. Nunca arredonde as costas no agachamento.",
  },
  {
    id: "novo-equipamento",
    name: "Novos Equipamentos Chegaram!",
    category: "Novidades",
    image:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=900&q=85",
    description:
      "Acabamos de receber novos aparelhos de musculação. Venha testar!",
  },
  {
    id: "dica-hidratacao",
    name: "A Importância da Hidratação",
    category: "Dicas",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=85",
    description:
      "Beba água antes, durante e depois do treino. A hidratação adequada melhora seu desempenho em até 30%.",
  },
  {
    id: "promocao-convite",
    name: "Traga um Amigo e Ganhe Desconto",
    category: "Promoções",
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=900&q=85",
    description:
      "Indique um amigo e ganhe 20% de desconto na sua mensalidade. Válido até o fim do mês!",
  },
  {
    id: "aula-yoga",
    name: "Yoga para Relaxamento",
    category: "Atividades",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=85",
    description:
      "Aulas de yoga aos sábados às 9h. Relaxe, alongue e equilibre corpo e mente.",
  },
  {
    id: "resultado-aluno",
    name: "José Perdeu 12kg em 4 Meses",
    category: "Resultados",
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=85",
    description:
      "Com dedicação e nosso acompanhamento, o José alcançou o shape dos sonhos.",
  },
  {
    id: "dica-aquecimento",
    name: "Nunca Pule o Aquecimento",
    category: "Dicas",
    image:
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=900&q=85",
    description:
      "5 minutos de aquecimento previnem lesões e preparam seus músculos para o treino.",
  },
  {
    id: "novidades-app",
    name: "App Exclusivo para Alunos",
    category: "Novidades",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=85",
    description:
      "Acompanhe seus treinos, evolução e agende aulas pelo nosso aplicativo.",
  },
];

export const postCategories = [
  "Novidades",
  "Projetos personalizados",
  "Caixas e Organizadores",
  "Decoração de Festa em MDF",
  "Recortes para Artesanato",
  "Promoções",
] as const;
