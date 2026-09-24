/** Enlace de afiliado de Amazon del Aptis ESOL General: Complete Trainer. */
export const APTIS_BOOK_AMAZON_URL = "https://link.amazon/B0hv2bAg0";

export const APTIS_BOOK_TITLE =
  "Aptis ESOL General: Complete Trainer";

const APTIS_GENERAL_ARTICLE_SLUGS = new Set([
  "aptis-general-guia-completa",
  "aptis-general-speaking-writing-tips",
  "dele-vs-cambridge-vs-ielts-vs-aptis",
]);

/**
 * El libro cubre el Aptis ESOL General (B1, B2 y C1).
 * No se muestra en Aptis A2 ni en Aptis Advanced, que son otros exámenes.
 */
export function shouldOfferAptisBook(input: {
  slug?: string | null;
  hubKeyword?: string | null;
}): boolean {
  const slug = (input.slug ?? "").trim().toLowerCase();
  const hub = (input.hubKeyword ?? "").trim().toLowerCase();

  if (APTIS_GENERAL_ARTICLE_SLUGS.has(slug)) return true;
  if (slug.includes("aptis-general")) return true;
  if (hub === "aptis-general-b1" || hub.includes("aptis-general")) return true;
  if (hub.includes("aptis general")) return true;

  return false;
}
