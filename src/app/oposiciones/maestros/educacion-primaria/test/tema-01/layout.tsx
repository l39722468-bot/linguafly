import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test del tema 1 de Primaria: 20 preguntas gratis",
  description:
    "Practica con 20 preguntas sobre el desarrollo psicoevolutivo de seis a doce años para las oposiciones de Primaria. Corrige tus respuestas y consulta explicaciones gratuitas.",
  alternates: {
    canonical: "/oposiciones/maestros/educacion-primaria/test/tema-01/",
  },
  robots: { index: true, follow: true },
};

export default function TemaUnoTestLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
