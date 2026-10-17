import type { AffiliateBook } from "@/lib/affiliates/book";
import { ESSENTIAL_GRAMMAR_BOOK } from "@/lib/affiliates/more-books";
import { MURPHY_GRAMMAR_BOOK } from "@/lib/affiliates/murphy-grammar";

/**
 * Lecturas graduadas para artículos cuya intención es aprender inglés leyendo.
 * Se mantiene una lista curada: no se ofrece esta selección fuera de sus artículos objetivo.
 */
export const SHORT_STORIES_BEGINNERS_BOOK: AffiliateBook = {
  id: "short-stories-in-english-for-beginners-olly-richards",
  url: "https://link.amazon/B043oS3jw",
  title: "Short Stories in English for Beginners — Olly Richards",
  eyebrow: "Relatos graduados · A2–B1",
  description:
    "Colección de relatos en inglés con lenguaje controlado para practicar lectura, reconocer vocabulario frecuente y seguir diálogos en contexto.",
  highlights: [
    "Historias para estudiantes de inglés",
    "Vocabulario y frases dentro de contexto",
    "Para crear el hábito de lectura en inglés",
  ],
  tone: "sky",
};

export const SHORT_STORIES_INTERMEDIATE_BOOK: AffiliateBook = {
  id: "short-stories-in-english-for-intermediate-learners-olly-richards",
  url: "https://link.amazon/B0bq0Rp4b",
  title: "Short Stories in English for Intermediate Learners — Olly Richards",
  eyebrow: "Relatos graduados · B1–B2",
  description:
    "Relatos para estudiantes intermedios que quieren ampliar vocabulario y consolidar la comprensión lectora mediante historias completas.",
  highlights: [
    "Lecturas orientadas a nivel intermedio",
    "Vocabulario en contexto",
    "Complemento para el autoestudio",
  ],
  tone: "emerald",
};

export const OXFORD_BOOKWORMS_STAGE_1_BOOK: AffiliateBook = {
  id: "oxford-bookworms-stage-1-the-elephant-man",
  url: "https://link.amazon/B08EL7KIW",
  title: "Oxford Bookworms Stage 1: The Elephant Man",
  eyebrow: "Lectura graduada · A1–A2",
  description:
    "Adaptación de una historia real para estudiantes principiantes. Una opción accesible para empezar a leer en inglés con dificultad graduada.",
  highlights: [
    "Serie Oxford Bookworms, Stage 1",
    "Lenguaje adaptado al nivel inicial",
    "La ficha editorial contempla audio",
  ],
  tone: "sky",
};

export const OXFORD_BOOKWORMS_STAGE_2_BOOK: AffiliateBook = {
  id: "oxford-bookworms-stage-2-the-canterville-ghost",
  url: "https://link.amazon/B0bBR8nI2",
  title: "Oxford Bookworms Stage 2: The Canterville Ghost",
  eyebrow: "Lectura graduada · A2–B1",
  description:
    "Una adaptación graduada del clásico de Oscar Wilde para seguir practicando lectura y ampliar vocabulario después del nivel inicial.",
  highlights: [
    "Serie Oxford Bookworms, Stage 2",
    "Historia clásica en versión adaptada",
    "La ficha editorial contempla audio",
  ],
  tone: "amber",
};

export const OXFORD_BOOKWORMS_STAGE_3_BOOK: AffiliateBook = {
  id: "oxford-bookworms-stage-3-animal-farm",
  url: "https://link.amazon/B0c7kh8dn",
  title: "Oxford Bookworms Stage 3: Animal Farm",
  eyebrow: "Lectura graduada · B1",
  description:
    "Adaptación de Animal Farm para lectores de inglés intermedio que buscan practicar con una historia más extensa y vocabulario graduado.",
  highlights: [
    "Serie Oxford Bookworms, Stage 3",
    "Lectura adaptada para nivel intermedio",
    "La ficha editorial contempla audio",
  ],
  tone: "emerald",
};

const BEST_BOOKS_SLUG = "mejores-libros-aprender-ingles";
const A1_A2_LEVELS_SLUG = "ingles-a1-vs-a2";

/**
 * Returns a curated set of related books for pages where readers are looking for
 * books by learning goal or level. For other articles, preserve the existing single-book logic.
 */
export function curatedAffiliateBooksForSlug(slug?: string | null): AffiliateBook[] {
  const normalized = (slug ?? "").trim().toLowerCase();

  if (normalized === BEST_BOOKS_SLUG) {
    return [
      MURPHY_GRAMMAR_BOOK,
      OXFORD_BOOKWORMS_STAGE_1_BOOK,
      SHORT_STORIES_BEGINNERS_BOOK,
      OXFORD_BOOKWORMS_STAGE_2_BOOK,
      SHORT_STORIES_INTERMEDIATE_BOOK,
      OXFORD_BOOKWORMS_STAGE_3_BOOK,
    ];
  }

  if (normalized === A1_A2_LEVELS_SLUG) {
    return [ESSENTIAL_GRAMMAR_BOOK, OXFORD_BOOKWORMS_STAGE_1_BOOK];
  }

  return [];
}
