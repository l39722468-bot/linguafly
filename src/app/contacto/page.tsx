import { Metadata } from "next";
import dynamic from "next/dynamic";

const ContactPage = dynamic(() => import("./ContactoClient"));

export const metadata: Metadata = {
  title: "Contacto: Consultas sobre Contenido de Inglés",
  description: "¿Tienes dudas sobre una guía o artículo? Contacta con el equipo de Focus English para consultas editoriales sobre aprendizaje del inglés.",
};

export default function Page() {
  return <ContactPage />;
}
