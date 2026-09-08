import { Metadata } from "next";
import dynamic from "next/dynamic";

const ContactPage = dynamic(() => import("./ContactoClient"));

export const metadata: Metadata = {
  title: "Contacto: consultas sobre los artículos",
  description: "¿Tienes dudas sobre un artículo de idiomas, alimentación o entrenamiento? Escribe al equipo editorial de Linguafly.",
};

export default function Page() {
  return <ContactPage />;
}
