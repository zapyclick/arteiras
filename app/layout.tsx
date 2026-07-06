import type { Metadata, Viewport } from "next";
import { PwaRegistration } from "@/components/PwaRegistration";
import "./globals.css";

export const metadata: Metadata = {
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  title: "Arteiras | Recortes a laser em MDF para artesanato, lembranças e decoração",
  description:
    "Atendemos São Bernardo e região com cortes a laser em MDF de alta precisão para artesanato, decoração e projetos sob medida. Venha transformar sua idéia em arte conosco!",
  openGraph: {
    title: "Arteiras recorte a laser em MDF | Artesanato, lembranças e decoração",
    description:
      "Arteiras, São Bernardo do Campo - SP transforme suas ideias em peças exclusivas de MDF cortadas a laser para decoração, lembranças, presentes e artesanato personalizado.",
    type: "website",
    images: [
      {
        url: "https://i.postimg.cc/TwFNg4JH/arteiras-hero2-webp.webp",
        width: 1200,
        height: 630,
        alt: "Arteiras",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Arteiras",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#DC2626",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <PwaRegistration />
        {children}
      </body>
    </html>
  );
}
