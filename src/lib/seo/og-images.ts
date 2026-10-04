import { getAbsoluteUrl } from "@/lib/site-brand";
import { normalizeCategory } from "@/lib/blog-paths";
import { isEnglishLevelCategory } from "@/lib/site-catalog";
import { articleCoverPath, exclusiveArticleImage } from "@/lib/seo/article-cover";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const DEFAULT_OG_IMAGE_PATH = "/blog/og-image.jpg";

/** Distinctive 16:9 stills per public category. Articles with their own `image` keep it. */
export const CATEGORY_OG_IMAGE_PATHS: Record<string, string> = {
  idiomas: "/blog/og-idiomas.jpg",
  actualidad: "/blog/og-actualidad.jpg",
  gramatica: "/blog/og-gramatica.jpg",
  viajes: "/blog/og-viajes.jpg",
  trabajo: "/blog/og-trabajo.jpg",
  examenes: "/blog/og-examenes.jpg",
  metodos: "/blog/og-metodos.jpg",
  habilidades: "/blog/og-habilidades.jpg",
  "curso-a1": "/blog/og-curso-a1.jpg",
  "curso-a2": "/blog/og-curso-a2.jpg",
  "curso-b1": "/blog/og-curso-b1.jpg",
  "curso-b2": "/blog/og-curso-b2.jpg",
  "curso-c1": "/blog/og-curso-c1.jpg",
};

export function getCategoryOgImagePath(category?: string | null): string {
  if (!category) return DEFAULT_OG_IMAGE_PATH;
  return CATEGORY_OG_IMAGE_PATHS[normalizeCategory(category)] || DEFAULT_OG_IMAGE_PATH;
}

function isSharedCategoryStill(path: string): boolean {
  return (
    path === DEFAULT_OG_IMAGE_PATH ||
    Object.values(CATEGORY_OG_IMAGE_PATHS).includes(path)
  );
}

export function getArticleOgImagePath(article: {
  image?: string | null;
  category?: string | null;
  slug?: string | null;
}): string {
  const custom = article.image?.trim();
  // Course units keep the lesson diagram, including the workbook that shares it.
  if (
    custom &&
    !isSharedCategoryStill(custom) &&
    article.category &&
    isEnglishLevelCategory(article.category)
  ) {
    return custom;
  }
  const exclusive = exclusiveArticleImage(article.image, article.slug);
  if (exclusive && !isSharedCategoryStill(exclusive)) return exclusive;
  if (article.slug) return articleCoverPath(article.slug);
  return getCategoryOgImagePath(article.category);
}

export function toAbsoluteOgImageUrl(path: string): string {
  return /^https?:\/\//i.test(path) ? path : getAbsoluteUrl(path);
}

export function getArticleOgImageUrl(article: {
  image?: string | null;
  category?: string | null;
  slug?: string | null;
}): string {
  return toAbsoluteOgImageUrl(getArticleOgImagePath(article));
}

export function getCategoryOgImageUrl(category?: string | null): string {
  return toAbsoluteOgImageUrl(getCategoryOgImagePath(category));
}

export function ogImageMeta(alt: string, pathOrUrl: string = DEFAULT_OG_IMAGE_PATH) {
  const url = toAbsoluteOgImageUrl(pathOrUrl);
  return {
    url,
    images: [{ url, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt }],
    twitterImages: [url] as string[],
  };
}
