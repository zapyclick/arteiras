export type PostCategory =
  | "Novidades"
  | "Projetos personalizados"
  | "Caixas e Organizadores"
  | "Decoração de Festa em MDF"
  | "Recortes para Artesanato"
  | "Promoções";

export type Post = {
  id: string;
  name: string;
  category: PostCategory;
  image: string;
  description: string;
};
