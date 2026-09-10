/**
 * SEO Utilities for internal linking and keyword management.
 */

export interface KeywordLink {
  keyword: string;
  url: string;
}

export const SEO_KEYWORD_LINKS: KeywordLink[] = [
  { keyword: "present perfect or past simple", url: "/blog/gramatica/present-perfect-vs-past-simple" },
  { keyword: "present perfect vs past simple", url: "/blog/gramatica/present-perfect-vs-past-simple" },
  { keyword: "condicionales en inglés", url: "/blog/gramatica/condicionales-ingles-guia-completa" },
  { keyword: "for and since", url: "/blog/gramatica/present-perfect-since-for" },
  { keyword: "formal email structure", url: "/blog/trabajo/email-formal-ingles-estructura" },
  { keyword: "aprender ingles gratis", url: "/blog/metodos/apps-ingles-gratuitas-vs-pago" },
  { keyword: "ingles para el trabajo", url: "/blog/trabajo" },
  { keyword: "ingles para viajar", url: "/blog/viajes" },
  { keyword: "ingles desde cero", url: "/blog/metodos/ingles-a1" },
  { keyword: "ejercicios de ingles", url: "/blog/gramatica/gramatica-ingles-b1-guia" },
  { keyword: "gramatica inglesa", url: "/blog/gramatica/gramatica-ingles-b1-guia" },
  { keyword: "vocabulario ingles", url: "/blog/trabajo/vocabulario-b1-ingles-trabajo" },
  { keyword: "entrevista de trabajo", url: "/blog/trabajo/entrevista-trabajo-exito" },
];

/**
 * Suggests internal links based on keywords present in the content.
 */
export function suggestInternalLinks(content: string): KeywordLink[] {
  const suggested: KeywordLink[] = [];
  const lowerContent = content.toLowerCase();

  SEO_KEYWORD_LINKS.forEach((item) => {
    if (lowerContent.includes(item.keyword.toLowerCase())) {
      suggested.push(item);
    }
  });

  return suggested;
}

/**
 * Devuelve el título tal cual lo escribe el editor en el frontmatter.
 *
 * Histórico: antes añadía `(YEAR)` automáticamente a cualquier título sin año,
 * pero eso ensuciaba artículos evergreen (gramática, vocabulario) y consumía
 * caracteres del presupuesto visual de Google (~60 ch). Ahora el año se
 * incluye explícitamente en el frontmatter cuando tiene sentido (rankings,
 * comparativas, cursos online, tendencias).
 */
export function optimizeSEOTitle(title: string): string {
  if (!title || typeof title !== "string") return title || "Linguafly";
  return title;
}
