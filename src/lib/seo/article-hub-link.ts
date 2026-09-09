import {
  getEnglishSection,
  getVertical,
  isPublicArticleCategory,
} from "@/lib/site-catalog";
import { getArticleCanonicalPath } from "@/lib/seo/article-paths";

/** Cornerstone articles that exist in the published corpus. */
const PILLAR_BY_CATEGORY: Record<string, { slug: string; label: string }> = {
  gramatica: {
    slug: "gramatica-inglesa-guia",
    label: "Guía de gramática inglesa",
  },
  viajes: {
    slug: "ingles-para-viajar",
    label: "Inglés para viajar",
  },
  trabajo: {
    slug: "ingles-para-trabajo",
    label: "Inglés para el trabajo",
  },
  examenes: {
    slug: "mejores-certificados-ingles-2026",
    label: "Guía de exámenes oficiales",
  },
};

export type ArticleHubLink = {
  href: string;
  label: string;
  indexHref: string;
  indexLabel: string;
  showIndex: boolean;
};

function categoryIndex(category: string): { href: string; name: string } {
  const vertical = getVertical(category);
  if (vertical) {
    return { href: vertical.blogHref, name: vertical.name };
  }
  const section = getEnglishSection(category);
  if (section) {
    return { href: section.href, name: section.name };
  }
  if (isPublicArticleCategory(category)) {
    return { href: `/blog/${category}`, name: category };
  }
  return { href: "/blog", name: "Blog" };
}

/**
 * Indexable hub for article footers. Never /aprender-ingles, /blog/temas or /curso-*.
 */
export function getArticleHubLink(category?: string | null): ArticleHubLink {
  const cat = (category || "").toLowerCase();
  const index = categoryIndex(cat);
  const indexLabel = `Más guías de ${index.name.toLowerCase()}`;
  const vertical = getVertical(cat);
  const pillar = PILLAR_BY_CATEGORY[cat];
  const pillarPath = pillar ? getArticleCanonicalPath(pillar.slug) : null;

  if (pillarPath && pillar) {
    return {
      href: pillarPath,
      label: pillar.label,
      indexHref: index.href,
      indexLabel,
      showIndex: pillarPath !== index.href,
    };
  }

  if (vertical) {
    return {
      href: vertical.href,
      label: vertical.name,
      indexHref: index.href,
      indexLabel,
      showIndex: vertical.href !== index.href,
    };
  }

  return {
    href: index.href,
    label: indexLabel,
    indexHref: index.href,
    indexLabel,
    showIndex: false,
  };
}
