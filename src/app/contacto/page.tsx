import { Metadata } from "next";
import dynamic from "next/dynamic";
import { canonicalAlternates } from "@/lib/seo/canonical";

const ContactPage = dynamic(() => import("./ContactoClient"));

export const metadata: Metadata = {
  title: "Contacto: consultas sobre los artículos",
  description: "¿Tienes dudas sobre un artículo de idiomas, alimentación, entrenamiento o inteligencia artificial? Escribe al equipo editorial de Linguafly.",
  alternates: canonicalAlternates("/contacto"),
};

export default function Page() {
  return <ContactPage />;
}
