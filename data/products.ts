import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "caixa-mdf-coracao",
    name: "Caixa MDF Coração",
    category: "Caixas e Organizadores",
    image:
      "https://images.unsplash.com/photo-1605714362597-1f9f7c2e7b2d?auto=format&fit=crop&w=900&q=85",
    description: "Caixa em MDF no formato coração com tampa. Ideal para presentear ou organizar pequenos objetos.",
    price: "R$ 34,90",
  },
  {
    id: "kit-recorte-ewok",
    name: "Kit Recorte EVA Animais",
    category: "Recortes para Artesanato",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85",
    description: "Conjunto de recortes em EVA com temas de animais para artesanato e decoração.",
    price: "R$ 19,90",
  },
  {
    id: "placa-bem-vindo-mdf",
    name: "Placa Bem-Vindo em MDF",
    category: "Decoração de Festa em MDF",
    image:
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=900&q=85",
    description: "Placa decorativa em MDF com frase Bem-Vindo. Perfeita para recepção de festas e eventos.",
    price: "R$ 45,90",
  },
  {
    id: "projeto-personalizado-aniversario",
    name: "Projeto Personalizado Aniversário",
    category: "Projetos personalizados",
    image:
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=900&q=85",
    description: "Projeto completo de decoração personalizada para festa de aniversário infantil ou adulto.",
    price: "Sob consulta",
  },
  {
    id: "caixa-organizadora-mdf",
    name: "Caixa Organizadora MDF com Divisórias",
    category: "Caixas e Organizadores",
    image:
      "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=900&q=85",
    description: "Caixa organizadora em MDF com divisórias removíveis. Perfeita para linhas, agulhas e materiais de costura.",
    price: "R$ 59,90",
  },
  {
    id: "enfeite-mesa-festa-mdf",
    name: "Enfeite de Mesa Festa MDF",
    category: "Decoração de Festa em MDF",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=85",
    description: "Conjunto de enfeites de mesa em MDF personalizados para festa temática.",
    price: "R$ 29,90",
  },
  {
    id: "recorte-eva-flores",
    name: "Recortes EVA Flores",
    category: "Recortes para Artesanato",
    image:
      "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?raw&fit=crop&w=900&q=85",
    description: "Conjunto com 20 recortes de flores em EVA colorido para artesanato e scrapbooking.",
    price: "R$ 14,90",
  },
  {
    id: "porta-retoque-mdf",
    name: "Porta Retrato MDF Personalizado",
    category: "Projetos personalizados",
    image:
      "https://images.unsplash.com/photo-1599571234909-29ed5d1325c7?auto=format&fit=crop&w=900&q=85",
    description: "Porta retrato em MDF personalizado com nome e data. Excelente opção de lembrança de festa.",
    price: "R$ 24,90",
  },
  {
    id: "kit-festa-mdf-completo",
    name: "Kit Festa MDF Completo",
    category: "Decoração de Festa em MDF",
    image:
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=900&q=85",
    description: "Kit completo com 10 peças em MDF para decoração de festa. Inclui topo de bolo, enfeites e plaquinhas.",
    price: "R$ 79,90",
  },
  {
    id: "caixa-presente-mdf",
    name: "Caixa Presente MDF Personalizada",
    category: "Caixas e Organizadores",
    image:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=900&q=85",
    description: "Caixa presente em MDF com tampa e laço. Personalize com nome e data especial.",
    price: "R$ 39,90",
  },
  {
    id: "recorte-eva-letras",
    name: "Recortes EVA Letras e Números",
    category: "Recortes para Artesanato",
    image:
      "https://images.unsplash.com/photo-1560421683-6856ea585c78?auto=format&fit=crop&w=900&q=85",
    description: "Kit com letras e números recortados em EVA para painéis e murais.",
    price: "R$ 16,90",
  },
  {
    id: "lembranca-festa-mdf",
    name: "Lembrança Festa MDF Personalizada",
    category: "Promoções",
    image:
      "https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?auto=format&fit=crop&w=900&q=85",
    description: "Lembrança de festa em MDF personalizada com nome do aniversariante e data. Em promoção por tempo limitado.",
    price: "R$ 12,90",
  },
];

export const categories = [
  "Novidades",
  "Projetos personalizados",
  "Caixas e Organizadores",
  "Decoração de Festa em MDF",
  "Recortes para Artesanato",
  "Promoções",
] as const;
