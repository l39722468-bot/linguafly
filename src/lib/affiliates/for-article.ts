import { shouldOfferAptisBook } from "@/lib/affiliates/aptis-book";
import { APTIS_BOOK_AMAZON_URL } from "@/lib/affiliates/aptis-book";
import type { AffiliateBook } from "@/lib/affiliates/book";
import {
  MURPHY_GRAMMAR_BOOK,
  shouldOfferMurphyGrammar,
} from "@/lib/affiliates/murphy-grammar";

const APTIS_BOOK: AffiliateBook = {
  id: "aptis-complete-trainer",
  url: APTIS_BOOK_AMAZON_URL,
  title: "Aptis ESOL General: Complete Trainer",
  eyebrow: "Libro para el examen",
  description:
    "Cuatro prácticas al estilo del Aptis General, con consejos para llegar a B1, B2 o C1. Tapa blanda, a la venta en Amazon.",
  highlights: [
    "4 tests completos: gramática, reading, writing, listening y speaking",
    "Respuestas, modelos, transcripciones y hojas fotocopiables",
    "Audio y fotos de speaking por QR, con notas para hispanohablantes",
  ],
  tone: "amber",
};

/** Un solo libro por artículo. Aptis General tiene prioridad sobre la gramática general. */
export function affiliateBookForSlug(slug?: string | null): AffiliateBook | null {
  if (shouldOfferAptisBook({ slug })) return APTIS_BOOK;
  if (shouldOfferMurphyGrammar(slug)) return MURPHY_GRAMMAR_BOOK;
  return null;
}
