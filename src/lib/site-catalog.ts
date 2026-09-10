/**
 * Catálogo público de la revista.
 *
 * Temáticas propias (idiomas / alimentación / entrenamiento / inteligencia
 * artificial) más el archivo de artículos para aprender inglés, servido desde
 * D1 en las URLs originales `/blog/{categoria}/{slug}` para no romper SEO.
 */

import {
  getArticleCanonicalPath,
  getExerciseArticlePath,
  getWorkbookPathForCourseUnit,
} from "@/lib/seo/article-paths";

export { getArticleCanonicalPath };

export const MAGAZINE_ARTICLE_CATEGORIES = [
  "idiomas",
  "alimentacion",
  "entrenamiento",
  "inteligencia-artificial",
] as const;

export const ENGLISH_LEARNING_CATEGORIES = [
  "idiomas",
  "gramatica",
  "viajes",
  "trabajo",
  "examenes",
  "metodos",
  "habilidades",
  "curso-a1",
  "curso-a2",
  "curso-b1",
  "curso-b2",
  "curso-c1",
] as const;

export const PUBLIC_ARTICLE_CATEGORIES = [
  ...MAGAZINE_ARTICLE_CATEGORIES,
  "gramatica",
  "viajes",
  "trabajo",
  "examenes",
  "metodos",
  "habilidades",
  "curso-a1",
  "curso-a2",
  "curso-b1",
  "curso-b2",
  "curso-c1",
] as const;

export type PublicArticleCategory = (typeof PUBLIC_ARTICLE_CATEGORIES)[number];
export type MagazineArticleCategory = (typeof MAGAZINE_ARTICLE_CATEGORIES)[number];

export type VerticalTone = {
  badge: string;
  gradient: string;
  text: string;
  soft: string;
  border: string;
};

export type SiteVertical = {
  slug: MagazineArticleCategory;
  href: string;
  blogHref: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  tone: VerticalTone;
};

export type EnglishLearningSection = {
  slug: Exclude<PublicArticleCategory, "alimentacion" | "entrenamiento" | "inteligencia-artificial">;
  href: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  tone: VerticalTone;
};

export const SITE_TAGLINE =
  "Guías claras de idiomas, alimentación, entrenamiento e inteligencia artificial.";

export const SITE_DESCRIPTION =
  "Revista práctica: artículos de idiomas, alimentación, entrenamiento e inteligencia artificial, y el archivo de guías para aprender inglés.";

const CORAL: VerticalTone = {
  badge: "bg-coral-100 text-coral-800",
  gradient: "from-coral-500 to-peach-500",
  text: "text-coral-700",
  soft: "bg-coral-50",
  border: "border-coral-100",
};

export const SITE_VERTICALS: readonly SiteVertical[] = [
  {
    slug: "idiomas",
    href: "/idiomas",
    blogHref: "/blog/idiomas",
    name: "Idiomas",
    shortName: "Idiomas",
    tagline: "Aprender con método, no con mil listas sueltas",
    description:
      "Cómo estudiar un idioma de verdad: vocabulario que se queda, práctica realista y hábitos que se pueden mantener.",
    icon: "🗣️",
    tone: CORAL,
  },
  {
    slug: "alimentacion",
    href: "/alimentacion",
    blogHref: "/blog/alimentacion",
    name: "Alimentación",
    shortName: "Alimentación",
    tagline: "Comer mejor sin dietas extremas",
    description:
      "Comidas reales, planificación sencilla y criterios para elegir qué poner en el plato según tu día.",
    icon: "🥗",
    tone: {
      badge: "bg-emerald-100 text-emerald-800",
      gradient: "from-emerald-500 to-lime-500",
      text: "text-emerald-700",
      soft: "bg-emerald-50",
      border: "border-emerald-100",
    },
  },
  {
    slug: "entrenamiento",
    href: "/entrenamiento",
    blogHref: "/blog/entrenamiento",
    name: "Entrenamiento",
    shortName: "Entrenamiento",
    tagline: "Fuerza, constancia y progreso sin lesionarte",
    description:
      "Rutinas y principios para entrenar en casa o en el gimnasio, con una dosis que puedas repetir semana a semana.",
    icon: "💪",
    tone: {
      badge: "bg-sky-100 text-sky-800",
      gradient: "from-sky-500 to-indigo-500",
      text: "text-sky-700",
      soft: "bg-sky-50",
      border: "border-sky-100",
    },
  },
  {
    slug: "inteligencia-artificial",
    href: "/inteligencia-artificial",
    blogHref: "/blog/inteligencia-artificial",
    name: "Inteligencia artificial",
    shortName: "IA",
    tagline: "Usar un chatbot con criterio, no con humo",
    description:
      "Prompts, comprobación y privacidad para trabajo, estudio y casa. Una tarea por artículo, sin jerga de keynote.",
    icon: "✨",
    tone: {
      badge: "bg-violet-100 text-violet-800",
      gradient: "from-violet-500 to-indigo-500",
      text: "text-violet-700",
      soft: "bg-violet-50",
      border: "border-violet-100",
    },
  },
] as const;

export const ENGLISH_LEARNING_SECTIONS: readonly EnglishLearningSection[] = [
  {
    slug: "gramatica",
    href: "/blog/gramatica",
    name: "Gramática",
    shortName: "Gramática",
    description: "Tiempos, estructuras y reglas con ejemplos para hispanohablantes.",
    icon: "📚",
    tone: {
      badge: "bg-indigo-100 text-indigo-800",
      gradient: "from-indigo-600 to-blue-700",
      text: "text-indigo-700",
      soft: "bg-indigo-50",
      border: "border-indigo-100",
    },
  },
  {
    slug: "viajes",
    href: "/blog/viajes",
    name: "Inglés para viajar",
    shortName: "Viajes",
    description: "Frases y vocabulario para aeropuertos, hoteles y emergencias.",
    icon: "✈️",
    tone: CORAL,
  },
  {
    slug: "trabajo",
    href: "/blog/trabajo",
    name: "Inglés para trabajar",
    shortName: "Trabajo",
    description: "Emails, entrevistas y vocabulario profesional.",
    icon: "💼",
    tone: CORAL,
  },
  {
    slug: "examenes",
    href: "/blog/examenes",
    name: "Exámenes oficiales",
    shortName: "Exámenes",
    description: "Cambridge, IELTS, TOEFL y certificados: estrategias y guías.",
    icon: "📝",
    tone: {
      badge: "bg-amber-100 text-amber-800",
      gradient: "from-amber-500 to-orange-500",
      text: "text-amber-700",
      soft: "bg-amber-50",
      border: "border-amber-100",
    },
  },
  {
    slug: "metodos",
    href: "/blog/metodos",
    name: "Métodos",
    shortName: "Métodos",
    description: "Técnicas, hábitos y recursos para aprender más rápido.",
    icon: "🎯",
    tone: {
      badge: "bg-pink-100 text-pink-800",
      gradient: "from-pink-500 to-rose-500",
      text: "text-pink-700",
      soft: "bg-pink-50",
      border: "border-pink-100",
    },
  },
  {
    slug: "habilidades",
    href: "/blog/habilidades",
    name: "Speaking y skills",
    shortName: "Skills",
    description: "Speaking, listening, reading y writing con práctica concreta.",
    icon: "🗣️",
    tone: {
      badge: "bg-violet-100 text-violet-800",
      gradient: "from-violet-500 to-purple-600",
      text: "text-violet-700",
      soft: "bg-violet-50",
      border: "border-violet-100",
    },
  },
  {
    slug: "curso-a1",
    href: "/blog/curso-a1",
    name: "Curso A1",
    shortName: "A1",
    description: "Guías por unidad del nivel A1.",
    icon: "📗",
    tone: {
      badge: "bg-emerald-100 text-emerald-800",
      gradient: "from-emerald-600 to-teal-700",
      text: "text-emerald-700",
      soft: "bg-emerald-50",
      border: "border-emerald-100",
    },
  },
  {
    slug: "curso-a2",
    href: "/blog/curso-a2",
    name: "Curso A2",
    shortName: "A2",
    description: "Guías por unidad del nivel A2.",
    icon: "📘",
    tone: {
      badge: "bg-sky-100 text-sky-800",
      gradient: "from-sky-600 to-indigo-700",
      text: "text-sky-700",
      soft: "bg-sky-50",
      border: "border-sky-100",
    },
  },
  {
    slug: "curso-b1",
    href: "/blog/curso-b1",
    name: "Curso B1",
    shortName: "B1",
    description: "Guías por unidad del nivel B1.",
    icon: "📙",
    tone: {
      badge: "bg-amber-100 text-amber-800",
      gradient: "from-amber-600 to-orange-700",
      text: "text-amber-700",
      soft: "bg-amber-50",
      border: "border-amber-100",
    },
  },
  {
    slug: "curso-b2",
    href: "/blog/curso-b2",
    name: "Curso B2",
    shortName: "B2",
    description: "Guías por unidad del nivel B2.",
    icon: "📕",
    tone: {
      badge: "bg-rose-100 text-rose-800",
      gradient: "from-rose-600 to-red-700",
      text: "text-rose-700",
      soft: "bg-rose-50",
      border: "border-rose-100",
    },
  },
  {
    slug: "curso-c1",
    href: "/blog/curso-c1",
    name: "Curso C1",
    shortName: "C1",
    description: "Guías por unidad del nivel C1.",
    icon: "📓",
    tone: {
      badge: "bg-slate-200 text-slate-800",
      gradient: "from-slate-600 to-slate-800",
      text: "text-slate-700",
      soft: "bg-slate-50",
      border: "border-slate-200",
    },
  },
] as const;

const PUBLIC_CATEGORY_SET = new Set<string>(PUBLIC_ARTICLE_CATEGORIES);
const MAGAZINE_CATEGORY_SET = new Set<string>(MAGAZINE_ARTICLE_CATEGORIES);
const ENGLISH_CATEGORY_SET = new Set<string>(ENGLISH_LEARNING_CATEGORIES);

export function isPublicArticleCategory(category: string): boolean {
  return PUBLIC_CATEGORY_SET.has(category.toLowerCase());
}

export function isMagazineArticleCategory(category: string): boolean {
  return MAGAZINE_CATEGORY_SET.has(category.toLowerCase());
}

export function isEnglishLearningCategory(category: string): boolean {
  return ENGLISH_CATEGORY_SET.has(category.toLowerCase());
}

export function getVertical(slug: string): SiteVertical | undefined {
  return SITE_VERTICALS.find((vertical) => vertical.slug === slug);
}

export function getEnglishSection(slug: string): EnglishLearningSection | undefined {
  return ENGLISH_LEARNING_SECTIONS.find((section) => section.slug === slug);
}

export function getPublicCategoryLabel(category: string): {
  name: string;
  icon: string;
  tone: VerticalTone;
} {
  const vertical = getVertical(category);
  if (vertical) {
    return { name: vertical.name, icon: vertical.icon, tone: vertical.tone };
  }
  const section = getEnglishSection(category);
  if (section) {
    return { name: section.name, icon: section.icon, tone: section.tone };
  }
  return {
    name: category,
    icon: "📄",
    tone: {
      badge: "bg-slate-100 text-slate-700",
      gradient: "from-slate-500 to-slate-700",
      text: "text-slate-700",
      soft: "bg-slate-50",
      border: "border-slate-200",
    },
  };
}

const EXACT_PUBLIC_PATHS = new Set([
  "/",
  "/blog",
  "/idiomas",
  "/alimentacion",
  "/entrenamiento",
  "/inteligencia-artificial",
  "/privacidad",
  "/cookies",
  "/terminos",
  "/contacto",
  "/sobre-nosotros",
  "/robots.txt",
  "/sitemap.xml",
  "/ads.txt",
  "/icon.svg",
  "/favicon.ico",
  "/indexnow-key.txt",
]);

const PUBLIC_PREFIXES = [
  ...PUBLIC_ARTICLE_CATEGORIES.map((category) => `/blog/${category}`),
  "/blog/autor",
  "/sitemaps",
  "/api/articles",
  "/api/indexnow",
] as const;

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  const stripped = pathname.split("?")[0].split("#")[0];
  if (stripped.length > 1 && stripped.endsWith("/")) {
    return stripped.slice(0, -1);
  }
  return stripped || "/";
}

const COURSE_LEVEL_BLOG: Record<string, string> = {
  a1: "/blog/curso-a1",
  a2: "/blog/curso-a2",
  b1: "/blog/curso-b1",
  b2: "/blog/curso-b2",
  c1: "/blog/curso-c1",
  c2: "/blog/examenes",
};

export function isPublicSitePath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  if (EXACT_PUBLIC_PATHS.has(path)) return true;
  return PUBLIC_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

/**
 * El Worker de Cloudflare solo sirve artículos. Las unidades /curso-* y los
 * hubs /blog/temas no existen ahí. 301 a la URL canónica (artículo o sección).
 */
export function getParkedPageRedirect(
  pathname: string,
  searchParams?: URLSearchParams | null,
): string | null {
  const path = normalizePathname(pathname);
  if (isPublicSitePath(path)) return null;
  if (path.startsWith("/api/")) return null;
  if (path.startsWith("/_next")) return null;

  const temaMatch = path.match(/^\/blog\/temas\/([^/]+)$/);
  if (temaMatch) return getArticleCanonicalPath(temaMatch[1]) || "/blog";

  /**
   * Búsquedas de ejercicios: el 200 indexable es el cuaderno
   * /blog/curso-{nivel}/unidad-N-*-ejercicios-soluciones. Las URLs viejas
   * (?articulo= y /curso-.../unit-N/ejercicio/) redirigen ahí.
   */
  if (path === "/blog/ejercicios-relacionados") {
    const articulo = searchParams?.get("articulo");
    if (articulo) return getExerciseArticlePath(articulo) || "/blog";
    return "/blog";
  }

  if (path.startsWith("/blog")) return "/blog";
  if (path === "/fitness") return "/entrenamiento";
  if (path === "/aprender-ingles") return "/idiomas";
  if (path === "/podcasts") return "/blog";

  const exerciseUnit = path.match(
    /^\/curso-(a1|a2|b1|b2|c1)\/unit-(\d+)\/ejercicio(?:\/|$)/,
  );
  if (exerciseUnit) {
    return (
      getWorkbookPathForCourseUnit(exerciseUnit[1], Number(exerciseUnit[2])) ||
      COURSE_LEVEL_BLOG[exerciseUnit[1]] ||
      "/blog"
    );
  }

  const levelMatch = path.match(/^\/curso-(a1|a2|b1|b2|c1|c2)(?:\/|$)/);
  if (levelMatch) return COURSE_LEVEL_BLOG[levelMatch[1]] ?? "/blog";
  if (
    path.startsWith("/curso-camarero") ||
    path.startsWith("/curso-logistica") ||
    path.startsWith("/curso-recepcionista")
  ) {
    return "/blog/trabajo";
  }
  if (path.startsWith("/curso-")) return "/blog";
  return "/";
}
