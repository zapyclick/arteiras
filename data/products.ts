import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "camiseta-dry-fit",
    name: "Camiseta Dry-Fit Performance",
    category: "Novidades",
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=85",
    description: "Tecido respirável de secagem rápida com proteção UV. Ideal para treinos intensos.",
    price: "R$ 89,90",
  },
  {
    id: "legging-premium",
    name: "Legging Compressão Premium",
    category: "Leggings",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=900&q=85",
    description: "Compressão graduada que melhora a circulação e reduz a fadiga muscular.",
    price: "R$ 139,90",
  },
  {
    id: "top-esportivo",
    name: "Top Esportivo Ultralight",
    category: "Novidades",
    image:
      "https://images.unsplash.com/photo-1571942615806-1ef653207ea8?auto=format&fit=crop&w=900&q=85",
    description: "Suporte médio com alças ajustáveis e tecido anti-transpirante.",
    price: "R$ 79,90",
  },
  {
    id: "shorts-cargo",
    name: "Shorts Academia Cargo",
    category: "Promoções",
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=900&q=85",
    description: "Shorts com bolsos laterais e elástico na cintura para total liberdade de movimento.",
    price: "R$ 99,90",
  },
  {
    id: "garrafa-termica",
    name: "Garrafa Térmica 750ml",
    category: "Acessórios",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
    description: "Aço inoxidável com isolamento à vácuo. Mantém a temperatura por 12h.",
    price: "R$ 49,90",
  },
  {
    id: "whey-protein",
    name: "Whey Protein Isolado",
    category: "Suplementos",
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2c1cf?auto=format&fit=crop&w=900&q=85",
    description: "Proteína isolada do soro do leite com 90% de absorção. Sabor chocolate.",
    price: "R$ 149,90",
  },
  {
    id: "regata-muscle",
    name: "Camiseta Regata Muscle Fit",
    category: "Camisetas",
    image:
      "https://images.unsplash.com/photo-1582293049585-6b4bf5da735e?auto=format&fit=crop&w=900&q=85",
    description: "Modelagem muscle fit que valoriza a silhueta. Algodão premium com elastano.",
    price: "R$ 69,90",
  },
  {
    id: "luva-musculacao",
    name: "Luva de Musculação Premium",
    category: "Acessórios",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85",
    description: "Couro sintético com amortecimento em gel e proteção de punho.",
    price: "R$ 59,90",
  },
  {
    id: "bone-esportivo",
    name: "Boné Esportivo Dry-Fit",
    category: "Promoções",
    image:
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=900&q=85",
    description: "Tecido leve com faixa interna anti-suor e fecho ajustável.",
    price: "R$ 44,90",
  },
  {
    id: "cinturao-levantamento",
    name: "Cinturão de Levantamento",
    category: "Acessórios",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85",
    description: "Couro premium com dupla costura e fivela de aço. Suporte lombar completo.",
    price: "R$ 89,90",
  },
  {
    id: "creatina",
    name: "Creatina Monohidratada",
    category: "Suplementos",
    image:
      "https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=900&q=85",
    description: "Creatina pura micronizada 100%. Aumenta força e massa muscular.",
    price: "R$ 79,90",
  },
  {
    id: "legging-high-waist",
    name: "Legging Feminina High-Waist",
    category: "Leggings",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=900&q=85",
    description: "Cintura alta com compressão suave e tecido squat-proof (não transparente).",
    price: "R$ 129,90",
  },
];

export const categories = [
  "Novidades",
  "Camisetas",
  "Leggings",
  "Acessórios",
  "Suplementos",
  "Promoções",
] as const;
