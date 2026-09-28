import { Metadata } from "next";
import { canonicalAlternates } from "@/lib/seo/canonical";
import { CONTACT_EMAIL } from "@/lib/site-brand";
import ContactPage from "./ContactoClient";

export const metadata: Metadata = {
  title: "Contacto: escribe a Linguafly por correo",
  description: `La única forma de contacto es un correo a ${CONTACT_EMAIL}. De momento no hay redes sociales.`,
  alternates: canonicalAlternates("/contacto"),
};

export default function Page() {
  return <ContactPage />;
}
