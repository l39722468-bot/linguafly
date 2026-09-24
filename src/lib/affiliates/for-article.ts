import { shouldOfferAptisBook } from "@/lib/affiliates/aptis-book";
import { APTIS_BOOK_AMAZON_URL } from "@/lib/affiliates/aptis-book";
import type { AffiliateBook } from "@/lib/affiliates/book";
import {
  MURPHY_GRAMMAR_BOOK,
  shouldOfferMurphyGrammar,
} from "@/lib/affiliates/murphy-grammar";
import {
  PHRASAL_VERBS_BOOK,
  shouldOfferPhrasalVerbsBook,
} from "@/lib/affiliates/phrasal-verbs";
import {
  PASO_A_PASO_BOOK,
  shouldOfferPasoAPaso,
} from "@/lib/affiliates/paso-a-paso";
import {
  C1_ADVANCED_BOOK,
  COLLOCATIONS_BOOK,
  ESSENTIAL_GRAMMAR_BOOK,
  IELTS_BOOK,
  shouldOfferC1AdvancedBook,
  shouldOfferCollocationsBook,
  shouldOfferEssentialGrammar,
  shouldOfferIeltsBook,
} from "@/lib/affiliates/more-books";

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
  if (shouldOfferPhrasalVerbsBook(slug)) return PHRASAL_VERBS_BOOK;
  if (shouldOfferPasoAPaso(slug)) return PASO_A_PASO_BOOK;
  if (shouldOfferMurphyGrammar(slug)) return MURPHY_GRAMMAR_BOOK;
  if (shouldOfferCollocationsBook(slug)) return COLLOCATIONS_BOOK;
  if (shouldOfferIeltsBook(slug)) return IELTS_BOOK;
  if (shouldOfferC1AdvancedBook(slug)) return C1_ADVANCED_BOOK;
  if (shouldOfferEssentialGrammar(slug)) return ESSENTIAL_GRAMMAR_BOOK;
  return null;
}
