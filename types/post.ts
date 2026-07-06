export type PostCategory = "Novidades" | "Dicas" | "Promoções" | "Atividades" | "Resultados";

export type Post = {
  id: string;
  name: string;
  category: PostCategory;
  image: string;
  description: string;
};
