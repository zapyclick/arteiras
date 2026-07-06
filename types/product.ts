export type ProductCategory =
  | "Novidades"
  | "Projetos personalizados"
  | "Caixas e Organizadores"
  | "Decoração de Festa em MDF"
  | "Recortes para Artesanato"
  | "Promoções";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  image: string;
  description: string;
  price?: string;
};
