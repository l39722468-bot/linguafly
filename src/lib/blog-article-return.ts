import {
  getTheoryPathForCourseUnit,
  getWorkbookPathForCourseUnit,
} from "@/lib/seo/article-paths";

export const BLOG_ARTICLE_RETURN_PARAM = 'fromArticle';

/**
 * Course-player URLs are parked. Internal links must point at the indexable
 * lesson (or its workbook) and never at `?fromArticle=`.
 */
export function toIndexableUnitUrl(unitUrl: string): string {
  const path = unitUrl.split("?")[0].split("#")[0];
  const normalized = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  const match = normalized.match(/^\/curso-(a1|a2|b1|b2|c1)\/unit-(\d+)$/);
  if (!match) return normalized;
  const level = match[1];
  const unitNumber = Number(match[2]);
  return (
    getTheoryPathForCourseUnit(level, unitNumber) ||
    getWorkbookPathForCourseUnit(level, unitNumber) ||
    `/blog/curso-${level}`
  );
}

/** Rutas internas de artículo del blog válidas para el botón «volver». */
export function isValidArticleReturnPath(path: string): boolean {
  if (!path.startsWith('/blog/')) return false;
  if (path.includes('://') || path.includes('//')) return false;
  return true;
}

export function getArticleReturnPath(
  searchParams: Pick<URLSearchParams, 'get'>,
): string | null {
  const raw = searchParams.get(BLOG_ARTICLE_RETURN_PARAM);
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    return isValidArticleReturnPath(decoded) ? decoded : null;
  } catch {
    return null;
  }
}

/** Historical helper. The article path is no longer copied into the query string. */
export function appendArticleReturnParam(targetUrl: string, articleUrl: string): string {
  if (!isValidArticleReturnPath(articleUrl)) return toIndexableUnitUrl(targetUrl.split("?")[0]);
  return toIndexableUnitUrl(targetUrl);
}
