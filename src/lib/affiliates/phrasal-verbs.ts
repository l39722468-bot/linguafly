import type { AffiliateBook } from "@/lib/affiliates/book";

/** English Phrasal Verbs in Use Intermediate, 2.ª edición, con respuestas (B1–B2). */
export const PHRASAL_VERBS_AMAZON_URL = "https://link.amazon/B0fg732an";

export const PHRASAL_VERBS_BOOK: AffiliateBook = {
  id: "phrasal-verbs-in-use-intermediate",
  url: PHRASAL_VERBS_AMAZON_URL,
  title: "English Phrasal Verbs in Use Intermediate",
  eyebrow: "Phrasal verbs B1–B2",
  description:
    "Unas 1.000 phrasal verbs en contexto, con explicaciones, ejercicios y soluciones. La edición intermedia de McCarthy y O'Dell, para estudiar por tu cuenta.",
  highlights: [
    "Nivel B1–B2, no la edición Advanced",
    "Temas de conversación, trabajo y escritura",
    "Soluciones incluidas",
  ],
  tone: "emerald",
};

/** A1–A2 y C1 tienen otro nivel; este libro es el intermedio. */
const EXCLUDED_PHRASAL_SLUGS = new Set([
  "phrasal-verbs-principiantes",
  "phrasal-verbs-c1-avanzados",
  "unidad-31-phrasal-verbs-introduccion",
  "unidad-31-phrasal-verbs-introduccion-ejercicios-soluciones",
  "unidad-32-phrasal-verbs-separables",
  "unidad-32-phrasal-verbs-separables-ejercicios-soluciones",
  "unidad-61-language-lab-phrasal-verbs-argumento",
]);

export function shouldOfferPhrasalVerbsBook(slug?: string | null): boolean {
  const value = (slug ?? "").trim().toLowerCase();
  if (!value.includes("phrasal-verb")) return false;
  return !EXCLUDED_PHRASAL_SLUGS.has(value);
}
