import { Metadata } from "next";
import { canonicalAlternates } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/site-brand";
import { Footer } from "@/components/sections/Footer";
import RegistroClient from "./RegistroClient";

export const metadata: Metadata = {
  title: `Apúntate a un curso de inglés | ${SITE_BRAND_NAME}`,
  description:
    "Registra tu plaza en un curso de inglés A1–C2 o de sector profesional. Confirmación inmediata y recordatorio por email.",
  alternates: canonicalAlternates("/registro"),
};

export default function RegistroPage() {
  return (
    <>
      <RegistroClient />
      <Footer />
    </>
  );
}
