export const BLOG_ARTICLE_RETURN_PARAM = 'fromArticle';

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

export function appendArticleReturnParam(targetUrl: string, articleUrl: string): string {
  if (!isValidArticleReturnPath(articleUrl)) return targetUrl;

  const [pathname, existingQuery = ''] = targetUrl.split('?');
  const params = new URLSearchParams(existingQuery);
  params.set(BLOG_ARTICLE_RETURN_PARAM, articleUrl);
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
