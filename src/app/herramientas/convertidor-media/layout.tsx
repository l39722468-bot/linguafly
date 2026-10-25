import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convertidor de imágenes y audio gratis | LinguaFly",
  description: "Convierte imágenes a PNG, JPG y WebP, redimensiona y comprime archivos, y exporta audio compatible a WAV. Herramientas gratuitas en tu navegador.",
  alternates: { canonical: "https://linguafly.app/herramientas/convertidor-media" },
  openGraph: {
    title: "Convertidor gratuito de imagen y audio | LinguaFly",
    description: "Prepara imágenes y audios para tus ejercicios de inglés con herramientas gratuitas y procesamiento local.",
    url: "https://linguafly.app/herramientas/convertidor-media",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
