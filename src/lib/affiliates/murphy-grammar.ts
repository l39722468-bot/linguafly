import type { AffiliateBook } from "@/lib/affiliates/book";

/** English Grammar in Use, 5.ª edición, con respuestas y ebook (B1–B2). */
export const MURPHY_GRAMMAR_AMAZON_URL = "https://link.amazon/B01Kk95OQ";

export const MURPHY_GRAMMAR_BOOK: AffiliateBook = {
  id: "murphy-grammar-in-use",
  url: MURPHY_GRAMMAR_AMAZON_URL,
  title: "English Grammar in Use. Fifth edition",
  eyebrow: "Gramática B1–B2",
  description:
    "El libro de Raymond Murphy para nivel intermedio: cada unidad trae la explicación y los ejercicios, con respuestas y ebook interactivo con audio.",
  highlights: [
    "Nivel B1–B2, el de Cambridge English Grammar in Use (no el rojo ni el verde)",
    "Soluciones incluidas, para estudiar por tu cuenta",
    "Ebook interactivo con audio",
  ],
  tone: "sky",
};

/**
 * Artículos donde el libro intermedio encaja: gramática B1–B2 y preparación
 * de ese nivel. No pronunciación, ni A1, ni C1–C2.
 */
const MURPHY_GRAMMAR_SLUGS = new Set([
  "mejores-libros-aprender-ingles",
  "ingles-b2",
  "cursos-online-ingles-b1",
  "cambridge-b2-first-estrategias-aprobar",
  "preparar-b1-cambridge-por-cuenta-propia",
  "preparacion-examen-b1-cambridge",
  "verbos-modales-ingles-guia",
  "verbos-modales-ingles-ejercicios",
  "present-perfect-vs-past-simple",
  "present-perfect-usos-principales",
  "present-perfect-continuous",
  "present-perfect-since-for",
  "present-perfect-just-already-yet",
  "present-perfect-ever-never",
  "voz-pasiva-ingles-guia",
  "first-conditional-ingles",
  "second-conditional-ingles",
  "third-conditional-ingles",
  "zero-conditional-ingles",
  "unless-ingles-condicionales",
  "relative-clauses-guia-definitiva",
  "reported-speech-questions-commands",
  "reported-speech-expresiones-tiempo",
  "will-going-to-diferencia",
  "will-futuro-ingles",
  "past-simple-vs-past-continuous",
  "past-simple-verbos-irregulares",
  "past-perfect-ingles",
  "must-have-to-diferencia",
  "may-might-ingles",
  "should-would-ingles",
  "say-vs-tell-ingles",
  "wish-if-only-ingles",
  "semi-modales-ingles",
]);

export function shouldOfferMurphyGrammar(slug?: string | null): boolean {
  return MURPHY_GRAMMAR_SLUGS.has((slug ?? "").trim().toLowerCase());
}
