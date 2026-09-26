/**
 * SERP copy for URLs that already rank on page 1 with weak CTR.
 * Applied when reading articles so Search Console titles update even if D1
 * still has the previous frontmatter.
 */
export type SerpCopy = {
  title: string;
  description: string;
  updatedDate: string;
};

export const SERP_OVERRIDES: Record<string, SerpCopy> = {
  "reported-speech-questions-commands": {
    title: "Reported speech: preguntas y órdenes en inglés",
    description:
      "Aprende a pasar preguntas y órdenes al reported speech con if, whether, ask y tell, ejemplos y los errores que más cometen los hispanohablantes.",
    updatedDate: "2026-09-26",
  },
  "unidad-12-dias-semana": {
    title: "Días de la semana en inglés: pronunciación y ejercicios",
    description:
      "Aprende los días de la semana en inglés con pronunciación, la preposición on, ejemplos de rutinas y ejercicios con soluciones para nivel A1.",
    updatedDate: "2026-09-26",
  },
  "unidad-12-dias-semana-ejercicios-soluciones": {
    title: "Ejercicios de días de la semana en inglés con soluciones",
    description:
      "Practica los días de la semana en inglés con ejercicios A1 autocorregibles, respuestas explicadas y un repaso de pronunciación y de la preposición on.",
    updatedDate: "2026-09-26",
  },
  "wont-ingles-usos": {
    title: "Won't en inglés: diferencia con will y ejercicios",
    description:
      "Qué significa won't, en qué se diferencia de will not y cómo usarlo para negativas, rechazos y objetos que no funcionan, con ejemplos claros.",
    updatedDate: "2026-09-26",
  },
  "precios-examenes-cambridge": {
    title: "Precios de los exámenes Cambridge: tasas por nivel",
    description:
      "Consulta las tasas aproximadas de los exámenes Cambridge en 2026, qué cambia según el centro y qué gastos extra conviene prever antes de matricularte.",
    updatedDate: "2026-09-26",
  },
  "present-perfect-vs-past-simple": {
    title: "Present perfect vs past simple: tabla y ejercicios",
    description:
      "Cuándo usar present perfect o past simple: tabla de marcadores, ejemplos comparados, errores de hispanohablantes y ejercicios para fijar la diferencia.",
    updatedDate: "2026-09-26",
  },
  "pasiva-pasado-ingles": {
    title: "Voz pasiva en pasado: was/were, ejemplos y ejercicios",
    description:
      "Forma la voz pasiva en pasado con was o were más participio, mira ejemplos reales y practica los errores habituales de was, were y el participio.",
    updatedDate: "2026-09-26",
  },
  "past-perfect-ingles": {
    title: "Past perfect en inglés: had + participio y ejercicios",
    description:
      "Aprende el past perfect para ordenar dos momentos del pasado, cuándo no hace falta y en qué se diferencia del past simple, con ejemplos y ejercicios.",
    updatedDate: "2026-09-26",
  },
};

type SerpArticle = {
  slug: string;
  title: string;
  description?: string;
  excerpt?: string;
  updatedDate?: string;
};

export function applySerpOverride<T extends SerpArticle>(article: T): T {
  const copy = SERP_OVERRIDES[article.slug];
  if (!copy) return article;
  return {
    ...article,
    title: copy.title,
    description: copy.description,
    excerpt: copy.description,
    updatedDate: copy.updatedDate,
  };
}
