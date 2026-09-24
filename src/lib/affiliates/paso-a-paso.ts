import type { AffiliateBook } from "@/lib/affiliates/book";

/** Gramática del inglés: Paso a paso 1. Gramática básica explicada en español. */
export const PASO_A_PASO_AMAZON_URL = "https://link.amazon/B07z0nAvN";

export const PASO_A_PASO_BOOK: AffiliateBook = {
  id: "gramatica-paso-a-paso-1",
  url: PASO_A_PASO_AMAZON_URL,
  title: "Gramática del inglés: Paso a paso 1",
  eyebrow: "Gramática desde cero",
  description:
    "La gramática básica explicada en español: to be, to have, contracciones, mayúsculas y puntuación, con más de mil ejercicios y soluciones.",
  highlights: [
    "Para quien empieza, sin dar por sabida la gramática",
    "Explicaciones en español y ejercicios con respuestas",
    "Volumen 1, el de las bases",
  ],
  tone: "amber",
};

/** Unidades A1 de las bases que cubre el volumen 1, más la guía de inglés desde cero. */
const PASO_A_PASO_SLUGS = new Set([
  "ingles-a1",
  "unidad-1-saludos-presentarse",
  "unidad-1-saludos-ejercicios-soluciones",
  "unidad-2-to-be-pronombres-nacionalidades",
  "unidad-2-to-be-ejercicios-soluciones",
  "unidad-3-to-be-negativa-preguntas",
  "unidad-3-to-be-ejercicios-soluciones",
  "unidad-4-articulos-plurales-demostrativos",
  "unidad-4-articulos-plurales-ejercicios-soluciones",
  "unidad-5-present-simple-rutinas",
  "unidad-5-present-simple-rutinas-ejercicios-soluciones",
  "unidad-6-familia-posesivos-genitivo",
  "unidad-6-familia-posesivos-ejercicios-soluciones",
  "unidad-14-present-simple-dont-do-you",
  "unidad-14-present-simple-dont-do-you-ejercicios-soluciones",
  "unidad-15-present-simple-doesnt-does",
  "unidad-15-present-simple-doesnt-does-ejercicios-soluciones",
  "unidad-22-muebles-posesivos-mine-yours",
  "unidad-22-muebles-posesivos-mine-yours-ejercicios-soluciones",
  "unidad-23-there-is-there-are",
  "unidad-23-there-is-there-are-ejercicios-soluciones",
  "unidad-28-partes-cuerpo-have-got",
  "unidad-28-partes-cuerpo-have-got-ejercicios-soluciones",
  "unidad-31-can-habilidad",
  "unidad-31-can-habilidad-ejercicios-soluciones",
]);

export function shouldOfferPasoAPaso(slug?: string | null): boolean {
  return PASO_A_PASO_SLUGS.has((slug ?? "").trim().toLowerCase());
}
