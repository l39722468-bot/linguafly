/**
 * Catálogo público de la web nueva.
 *
 * La plataforma antigua (cursos, hubs de inglés, 800+ artículos legacy)
 * permanece en el repo pero no se publica: solo salen estas tres temáticas.
 */

export const PUBLIC_ARTICLE_CATEGORIES = [
  "idiomas",
  "alimentacion",
  "entrenamiento",
] as const;

export type PublicArticleCategory = (typeof PUBLIC_ARTICLE_CATEGORIES)[number];

export type VerticalTone = {
  badge: string;
  gradient: string;
  text: string;
  soft: string;
  border: string;
};

export type SiteVertical = {
  slug: PublicArticleCategory;
  href: string;
  blogHref: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  tone: VerticalTone;
};

export const SITE_TAGLINE =
  "Guías claras de idiomas, alimentación y entrenamiento.";

export const SITE_DESCRIPTION =
  "Revista práctica con artículos de idiomas, alimentación y entrenamiento. Contenido nuevo, sin la web anterior de cursos.";

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
    tone: {
      badge: "bg-coral-100 text-coral-800",
      gradient: "from-coral-500 to-peach-500",
      text: "text-coral-700",
      soft: "bg-coral-50",
      border: "border-coral-100",
    },
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
] as const;

const PUBLIC_CATEGORY_SET = new Set<string>(PUBLIC_ARTICLE_CATEGORIES);

export function isPublicArticleCategory(category: string): boolean {
  return PUBLIC_CATEGORY_SET.has(category.toLowerCase());
}

export function getVertical(slug: string): SiteVertical | undefined {
  return SITE_VERTICALS.find((vertical) => vertical.slug === slug);
}

const EXACT_PUBLIC_PATHS = new Set([
  "/",
  "/blog",
  "/idiomas",
  "/alimentacion",
  "/entrenamiento",
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
  "/blog/idiomas",
  "/blog/alimentacion",
  "/blog/entrenamiento",
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

export function isPublicSitePath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  if (EXACT_PUBLIC_PATHS.has(path)) return true;
  return PUBLIC_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

/**
 * Destino temporal para la web antigua. 302 a propósito: se podrá
 * republicar lo legacy más adelante sin haber quemado un 301.
 */
export function getParkedPageRedirect(pathname: string): string | null {
  const path = normalizePathname(pathname);
  if (isPublicSitePath(path)) return null;
  if (path.startsWith("/api/")) return null;
  if (path.startsWith("/_next")) return null;
  if (path.startsWith("/blog")) return "/blog";
  if (path === "/fitness") return "/entrenamiento";
  return "/";
}
