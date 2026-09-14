import { getAbsoluteUrl } from "@/lib/site-brand";
import {
  getArticleCanonicalPath,
  getTheoryPathForCourseUnit,
} from "@/lib/seo/article-paths";
import articleCanonicalPaths from "@/lib/seo/article-canonical-paths.json";

const ARTICLE_PATHS = articleCanonicalPaths as Record<string, string>;

const COURSE_LEVEL = /^(a1|a2|b1|b2|c1)$/;
const COURSE_CATEGORY = /^curso-(a1|a2|b1|b2|c1)$/;
const COURSE_ARTICLE_PATH =
  /^\/blog\/(curso-a1|curso-a2|curso-b1|curso-b2|curso-c1)\/([^/]+)$/;
const UNIT_SLUG = /^unidad-(\d+)-(.+)$/;
const WORKBOOK_SUFFIX = "-ejercicios-soluciones";

/** Guides that should win the SERP over course units. */
const TOPIC_CATEGORIES = [
  "gramatica",
  "examenes",
  "viajes",
  "trabajo",
  "metodos",
  "habilidades",
] as const;

const TOPIC_CATEGORY_RANK: Record<string, number> = Object.fromEntries(
  TOPIC_CATEGORIES.map((category, index) => [category, TOPIC_CATEGORIES.length - index]),
);

const TOPIC_CORE_SUFFIXES = [
  "-guia-completa",
  "-guia-definitiva",
  "-guia-practica",
  "-usos-principales",
  "-usos-reglas",
  "-errores-comunes",
  "-en-ingles",
  "-ingles",
  "-guia",
] as const;

/**
 * Stems of course units that do not match a guide slug by prefix, but share
 * the same search intent. Never point a unit at a loosely related article
 * (p. ej. preposiciones de lugar ≠ preposiciones de movimiento).
 */
const UNIT_STEM_ALIASES: Record<string, string> = {
  "present-perfect-already-yet": "present-perfect-just-already-yet",
  "present-perfect-just": "present-perfect-just-already-yet",
  "past-continuous": "past-simple-vs-past-continuous",
  "past-simple-past-continuous": "past-simple-vs-past-continuous",
  "for-since": "present-perfect-since-for",
  "for-since-from-time": "present-perfect-since-for",
  "past-vs-present-perfect": "present-perfect-vs-past-simple",
  "going-to-planes-intenciones": "will-going-to-diferencia",
  "going-to-predicciones": "will-going-to-diferencia",
  "futuro-going-to-will-present-continuous": "will-going-to-diferencia",
  "future-will-going-to": "will-going-to-diferencia",
  "will-wont-predicciones-promesas": "will-futuro-ingles",
  "have-to-dont-have-to": "must-have-to-diferencia",
  "could-habilidad-peticiones": "can-could-ingles",
  "can-habilidad": "can-could-ingles",
  "phrasal-verbs-introduccion": "phrasal-verbs-principiantes",
  "phrasal-verbs-daily": "phrasal-verbs-conversacion-cotidiana",
  "phrasal-verbs-work-study": "phrasal-verbs-trabajo",
  "reported-speech-statements": "guia-maestra-reported-speech",
  "reported-speech-questions": "reported-speech-questions-commands",
  "passive-voice-technology": "voz-pasiva-ingles-guia",
  "modal-passive-work": "pasiva-modales-ingles",
  "defining-relative-nature": "relative-clauses-guia-definitiva",
  "nondefining-relative-environment": "relative-clauses-guia-definitiva",
  "relative-clauses-culture": "relative-clauses-guia-definitiva",
  "relative-clauses-reduction": "relative-clauses-guia-definitiva",
  "wish-if-only-feelings": "wish-if-only-ingles",
  "mixed-conditionals-travel": "condicionales-ingles-mixtos-avanzados",
  "mixed-conditionals-psychology": "condicionales-ingles-mixtos-avanzados",
  "condicionales-mixtos-ciencia": "condicionales-ingles-mixtos-avanzados",
  "first-vs-second-conditional": "condicionales-ingles-guia-completa",
  "review-conditionals": "condicionales-ingles-guia-completa",
  "passive-reporting-science": "passive-reporting-verbs-guia-avanzada",
  "preposiciones-lugar-movimiento": "preposiciones-movimiento-ingles",
};

type TopicCandidate = {
  slug: string;
  path: string;
  category: string;
  core: string;
  coreTokens: number;
};

const TOPIC_CANDIDATES: TopicCandidate[] = Object.entries(ARTICLE_PATHS)
  .map(([slug, path]) => {
    const category = path.split("/")[2] || "";
    if (!isTopicCategory(category)) return null;
    const core = topicCore(slug);
    return {
      slug,
      path,
      category,
      core,
      coreTokens: tokenCount(core),
    };
  })
  .filter((row): row is TopicCandidate => row !== null);

export type CourseUnitRef = {
  level: string;
  unitNumber: number;
  stem: string;
  isWorkbook: boolean;
};

export type CourseTopicCanonical = {
  path: string;
  slug: string;
  category: string;
};

function isTopicCategory(category: string): boolean {
  return category in TOPIC_CATEGORY_RANK;
}

export function isCourseBlogCategory(category: string): boolean {
  return COURSE_CATEGORY.test(category.toLowerCase());
}

function tokenCount(value: string): number {
  return value.split("-").filter(Boolean).length;
}

function topicCore(slug: string): string {
  let current = slug;
  let changed = true;
  while (changed) {
    changed = false;
    for (const suffix of TOPIC_CORE_SUFFIXES) {
      if (!current.endsWith(suffix) || current.length <= suffix.length) continue;
      current = current.slice(0, -suffix.length);
      changed = true;
      break;
    }
  }
  return current;
}

function courseLevelFromCategory(category: string): string | null {
  const match = category.toLowerCase().match(/^curso-(a1|a2|b1|b2|c1)$/);
  return match ? match[1] : null;
}

export function parseCourseUnitSlug(
  category: string,
  slug: string,
): CourseUnitRef | null {
  const level = courseLevelFromCategory(category);
  if (!level || !COURSE_LEVEL.test(level)) return null;
  const match = slug.match(UNIT_SLUG);
  if (!match) return null;
  const rest = match[2];
  const isWorkbook = rest.endsWith(WORKBOOK_SUFFIX);
  const stem = isWorkbook ? rest.slice(0, -WORKBOOK_SUFFIX.length) : rest;
  return {
    level,
    unitNumber: Number(match[1]),
    stem,
    isWorkbook,
  };
}

export function getCourseUnitEyebrow(
  category: string,
  slug: string,
): string | null {
  const parsed = parseCourseUnitSlug(category, slug);
  if (!parsed) return null;
  const label = `Curso ${parsed.level.toUpperCase()} · Unidad ${parsed.unitNumber}`;
  return parsed.isWorkbook ? `Ejercicios · ${label}` : label;
}

function articlePathParts(
  path: string,
): { category: string; slug: string } | null {
  const match = path.match(/^\/blog\/([^/]+)\/([^/]+)$/);
  if (!match) return null;
  return { category: match[1], slug: match[2] };
}

function selfArticlePath(category: string, slug: string): string {
  return `/blog/${category.toLowerCase()}/${slug}`;
}

function matchGuideForStem(stem: string): CourseTopicCanonical | null {
  const aliasSlug = UNIT_STEM_ALIASES[stem];
  if (aliasSlug) {
    const path = getArticleCanonicalPath(aliasSlug);
    const parts = path ? articlePathParts(path) : null;
    if (path && parts && isTopicCategory(parts.category)) {
      return { path, slug: aliasSlug, category: parts.category };
    }
  }

  let best: { score: number; candidate: TopicCandidate } | null = null;
  for (const candidate of TOPIC_CANDIDATES) {
    let score = 0;
    if (stem === candidate.slug || stem === candidate.core) {
      score = 1000 + candidate.core.length;
    } else if (
      candidate.coreTokens >= 2 &&
      stem.startsWith(`${candidate.core}-`)
    ) {
      score = 800 + candidate.core.length;
    } else {
      continue;
    }
    score += (TOPIC_CATEGORY_RANK[candidate.category] || 0) / 10;
    if (!best || score > best.score) {
      best = { score, candidate };
    }
  }

  if (!best) return null;
  return {
    path: best.candidate.path,
    slug: best.candidate.slug,
    category: best.candidate.category,
  };
}

/**
 * Path of the indexable topic page a course unit should consolidate into.
 * Null = this URL stays canonical (no published guide for the same intent).
 */
export function resolveCourseTopicCanonicalPath(
  category: string,
  slug: string,
): string | null {
  const parsed = parseCourseUnitSlug(category, slug);
  if (!parsed) return null;

  const guide = matchGuideForStem(parsed.stem);
  if (guide) return guide.path;

  if (parsed.isWorkbook) {
    const theoryPath = getTheoryPathForCourseUnit(parsed.level, parsed.unitNumber);
    const selfPath = selfArticlePath(category, slug);
    if (theoryPath && theoryPath !== selfPath) return theoryPath;
  }

  return null;
}

export function resolveCourseTopicCanonical(
  category: string,
  slug: string,
): CourseTopicCanonical | null {
  const path = resolveCourseTopicCanonicalPath(category, slug);
  if (!path) return null;
  const parts = articlePathParts(path);
  if (!parts) return null;
  return { path, slug: parts.slug, category: parts.category };
}

export function resolveCourseTopicCanonicalPathFromPathname(
  pathname: string,
): string | null {
  const match = pathname.match(COURSE_ARTICLE_PATH);
  if (!match) return null;
  return resolveCourseTopicCanonicalPath(match[1], match[2]);
}

/** HTTP `Link: rel=canonical` for article URLs. Does not 301 the unit. */
export function linkHeaderCanonicalPath(pathname: string): string {
  return resolveCourseTopicCanonicalPathFromPathname(pathname) || pathname;
}

export function isSitemapSatelliteArticle(
  category: string,
  slug: string,
): boolean {
  const topic = resolveCourseTopicCanonicalPath(category, slug);
  if (!topic) return false;
  return topic !== selfArticlePath(category, slug);
}

export function resolveArticleCanonicalUrl(article: {
  category: string;
  slug: string;
  canonical?: string | null;
}): string {
  const category = article.category.toLowerCase();
  const selfPath = selfArticlePath(category, article.slug);
  if (isCourseBlogCategory(category)) {
    const topic = resolveCourseTopicCanonicalPath(category, article.slug);
    return getAbsoluteUrl(topic || selfPath);
  }
  if (article.canonical && /^https?:\/\//i.test(article.canonical)) {
    return article.canonical.replace(
      /^https:\/\/www\./i,
      "https://",
    );
  }
  return getAbsoluteUrl(selfPath);
}
