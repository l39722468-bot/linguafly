import type { AffiliateBook } from "@/lib/affiliates/book";

export const B1_PRELIMINARY_AMAZON_URL = "https://link.amazon/B0d3jAJID";
export const B2_FIRST_TRAINER_AMAZON_URL = "https://link.amazon/B0eoM0d3t";
export const PRONUNCIATION_AMAZON_URL = "https://link.amazon/B0a0PcZh0";

export const B1_PRELIMINARY_BOOK: AffiliateBook = {
  id: "b1-preliminary-trainer",
  url: B1_PRELIMINARY_AMAZON_URL,
  title: "B1 Preliminary Trainer",
  eyebrow: "Cambridge B1",
  description:
    "Material de práctica para preparar el examen Cambridge B1 Preliminary de forma autónoma.",
  highlights: [
    "Práctica orientada al formato del examen",
    "Preparación de nivel B1",
    "Apoyo para organizar el estudio por tu cuenta",
  ],
  tone: "amber",
};

export const B2_FIRST_TRAINER_BOOK: AffiliateBook = {
  id: "b2-first-trainer",
  url: B2_FIRST_TRAINER_AMAZON_URL,
  title: "B2 First Trainer",
  eyebrow: "Cambridge B2",
  description:
    "Material de práctica para preparar el examen Cambridge B2 First y familiarizarse con sus tareas.",
  highlights: [
    "Práctica orientada al formato del examen",
    "Preparación de nivel B2",
    "Apoyo para organizar el estudio por tu cuenta",
  ],
  tone: "sky",
};

export const PRONUNCIATION_BOOK: AffiliateBook = {
  id: "english-pronunciation-in-use-intermediate",
  url: PRONUNCIATION_AMAZON_URL,
  title: "English Pronunciation in Use Intermediate",
  eyebrow: "Pronunciación B1–B2",
  description:
    "Material de autoestudio para trabajar la pronunciación inglesa a nivel intermedio.",
  highlights: [
    "Práctica de sonidos y pronunciación",
    "Nivel intermedio",
    "Complemento de estudio autónomo",
  ],
  tone: "emerald",
};

export function shouldOfferB1PreliminaryBook(slug?: string | null): boolean {
  return (slug ?? "").trim().toLowerCase() === "preparar-b1-cambridge-por-cuenta-propia";
}

export function shouldOfferB2FirstTrainerBook(slug?: string | null): boolean {
  return (slug ?? "").trim().toLowerCase() === "cambridge-b2-first-estrategias-aprobar";
}

export function shouldOfferPronunciationBook(slug?: string | null): boolean {
  return (slug ?? "").trim().toLowerCase() === "herramientas-online-pronunciacion-ingles";
}
