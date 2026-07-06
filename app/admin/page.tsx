import type { Metadata } from "next";
import { AdminPublisher } from "@/components/AdminPublisher";

export const metadata: Metadata = {
  title: "Painel Admin | Arteiras",
  description:
    "Painel para publicar fotos, dicas e novidades no feed digital.",
};

export default function AdminPage() {
  return <AdminPublisher />;
}
