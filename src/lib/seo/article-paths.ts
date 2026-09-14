import articleCanonicalPaths from "@/lib/seo/article-canonical-paths.json";

const ARTICLE_CANONICAL_PATHS = articleCanonicalPaths as Record<string, string>;

const WORKBOOK_SUFFIX = "-ejercicios-soluciones";
const WORKBOOK_SLUG = /^unidad-(\d+)-.+-ejercicios-soluciones$/;
const THEORY_SLUG = /^unidad-(\d+)-/;
const COURSE_WORKBOOK_PATH = /^\/blog\/curso-(a1|a2|b1|b2|c1)\//;

/** `a1:1` → `/blog/curso-a1/unidad-1-…-ejercicios-soluciones` */
const WORKBOOK_BY_COURSE_UNIT: Record<string, string> = {};
/** `a1:1` → `/blog/curso-a1/unidad-1-…` (teoría; el stem a veces no coincide con el cuaderno). */
const THEORY_BY_COURSE_UNIT: Record<string, string> = {};
for (const [slug, path] of Object.entries(ARTICLE_CANONICAL_PATHS)) {
  const course = path.match(COURSE_WORKBOOK_PATH);
  if (!course) continue;
  const keyBase = `${course[1]}:`;
  const workbook = slug.match(WORKBOOK_SLUG);
  if (workbook) {
    const key = `${keyBase}${Number(workbook[1])}`;
    if (!WORKBOOK_BY_COURSE_UNIT[key]) WORKBOOK_BY_COURSE_UNIT[key] = path;
    continue;
  }
  const theory = slug.match(THEORY_SLUG);
  if (theory) {
    const key = `${keyBase}${Number(theory[1])}`;
    if (!THEORY_BY_COURSE_UNIT[key]) THEORY_BY_COURSE_UNIT[key] = path;
  }
}

function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, "");
}

/** `/blog/{category}/{slug}` for a markdown article slug, if it exists. */
export function getArticleCanonicalPath(slug: string): string | null {
  const key = normalizeSlug(slug);
  return ARTICLE_CANONICAL_PATHS[key] || null;
}

/**
 * URL indexable para búsquedas de ejercicios: el cuaderno
 * `…-ejercicios-soluciones` si existe; si no, el artículo del slug.
 * El par teoría/cuaderno a veces no comparte el mismo stem (p. ej. A1 unidad 1).
 */
export function getExerciseArticlePath(slug: string): string | null {
  const key = normalizeSlug(slug);
  if (!key) return null;
  if (key.endsWith(WORKBOOK_SUFFIX)) {
    return ARTICLE_CANONICAL_PATHS[key] || null;
  }

  const sameStem = ARTICLE_CANONICAL_PATHS[`${key}${WORKBOOK_SUFFIX}`];
  if (sameStem) return sameStem;

  const theoryPath = ARTICLE_CANONICAL_PATHS[key];
  if (!theoryPath) return null;

  const course = theoryPath.match(COURSE_WORKBOOK_PATH);
  const unit = key.match(/^unidad-(\d+)-/);
  if (course && unit) {
    const workbook = getWorkbookPathForCourseUnit(course[1], Number(unit[1]));
    if (workbook) return workbook;
  }

  return theoryPath;
}

export function getWorkbookPathForCourseUnit(
  level: string,
  unitNumber: number,
): string | null {
  return WORKBOOK_BY_COURSE_UNIT[`${level}:${unitNumber}`] || null;
}

export function getTheoryPathForCourseUnit(
  level: string,
  unitNumber: number,
): string | null {
  return THEORY_BY_COURSE_UNIT[`${level}:${unitNumber}`] || null;
}
