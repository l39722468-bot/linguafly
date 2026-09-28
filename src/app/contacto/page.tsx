import { Metadata } from "next";
import { canonicalAlternates } from "@/lib/seo/canonical";
import { CONTACT_EMAIL } from "@/lib/site-brand";
import ContactPage from "./ContactoClient";

export const metadata: Metadata = {
  title: "Contacto: escribe a Linguafly por correo",
  description: `Puedes ponerte en contacto con el equipo a través de ${CONTACT_EMAIL}.`,
  alternates: canonicalAlternates("/contacto"),
};

export default function Page() {
  return <ContactPage />;
}
