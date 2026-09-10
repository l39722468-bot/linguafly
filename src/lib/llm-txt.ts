import { getArticlePath } from "@/lib/blog-paths";
import type { BlogPost } from "@/lib/blog";
import { listPublishedArticles, getPublishedArticle } from "@/lib/content/articles";
import {
  htmlPathFromMarkdownTwin,
  htmlToMarkdownPath,
  normalizeCanonicalPath,
} from "@/lib/seo/canonical";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";
import {
  ENGLISH_LEARNING_SECTIONS,
  SITE_DESCRIPTION,
  SITE_TAGLINE,
  SITE_VERTICALS,
  getParkedPageRedirect,
  getPublicCategoryLabel,
  isPublicArticleCategory,
  isPublicSitePath,
} from "@/lib/site-catalog";

const MARKDOWN_CACHE = "public, s-maxage=3600, stale-while-revalidate=86400";

export const LLMS_TXT_PATH = "/llms.txt";

export function markdownResponseHeaders(htmlPath?: string): HeadersInit {
  const links = [`<${getAbsoluteUrl(LLMS_TXT_PATH)}>; rel="describedby"`];
  if (htmlPath) {
    links.unshift(`<${getAbsoluteUrl(htmlPath)}>; rel="canonical"`);
  }
  return {
    "Content-Type": "text/markdown; charset=utf-8",
    "Cache-Control": MARKDOWN_CACHE,
    Link: links.join(", "),
  };
}

function mdLink(title: string, url: string, note?: string): string {
  const safeTitle = title.replace(/[[\]]/g, "").trim() || title;
  const noteText = note?.replace(/\s+/g, " ").trim();
  return noteText
    ? `- [${safeTitle}](${url}): ${noteText}`
    : `- [${safeTitle}](${url})`;
}

function articleMarkdownUrl(article: Pick<BlogPost, "category" | "slug">): string {
  return getAbsoluteUrl(htmlToMarkdownPath(getArticlePath(article)));
}

function clipNote(text: string, max = 140): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function buildLlmsTxt(recent: BlogPost[]): string {
  const base = getAbsoluteUrl("/");
  const lines = [
    `# ${SITE_BRAND_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `${SITE_TAGLINE} El contenido canónico está en español. Los rastreadores y agentes deben leer este índice y las copias Markdown (misma URL + \`.md\`) en lugar de ejecutar JavaScript.`,
    "",
    "No uses `/blog/temas/…` ni `www.linguafly.app`: redirigen. El mapa completo de URLs HTML está en el sitemap.",
    "",
    "## Temáticas",
    "",
    ...SITE_VERTICALS.map((vertical) =>
      mdLink(
        vertical.name,
        getAbsoluteUrl(htmlToMarkdownPath(vertical.href)),
        vertical.description,
      ),
    ),
    "",
    "## Archivo de inglés",
    "",
    ...ENGLISH_LEARNING_SECTIONS.map((section) =>
      mdLink(
        section.name,
        getAbsoluteUrl(htmlToMarkdownPath(section.href)),
        section.description,
      ),
    ),
    "",
    "## Artículos recientes",
    "",
  ];

  const seen = new Set<string>();
  for (const article of recent) {
    const key = `${article.category}/${article.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    lines.push(
      mdLink(
        article.title,
        articleMarkdownUrl(article),
        clipNote(article.description || article.excerpt || ""),
      ),
    );
  }

  if (seen.size === 0) {
    lines.push(
      `- [Blog](${getAbsoluteUrl(htmlToMarkdownPath("/blog"))}): Índice de artículos publicados.`,
    );
  }

  lines.push(
    "",
    "## Optional",
    "",
    mdLink("Inicio", getAbsoluteUrl("/index.md"), "Portada de la revista."),
    mdLink("Blog", getAbsoluteUrl(htmlToMarkdownPath("/blog")), "Listado de artículos."),
    mdLink("Sitemap", `${base}sitemap.xml`, "Todas las URLs HTML indexables."),
    mdLink(
      "Sobre nosotros",
      getAbsoluteUrl(htmlToMarkdownPath("/sobre-nosotros")),
      "Qué es Linguafly.",
    ),
    "",
  );

  return lines.join("\n");
}

export function buildPageMarkdown(options: {
  title: string;
  summary: string;
  htmlPath: string;
  extra?: string;
}): string {
  const canonical = getAbsoluteUrl(options.htmlPath);
  const parts = [
    `# ${options.title}`,
    "",
    `> ${options.summary}`,
    "",
    `- Canonical: ${canonical}`,
    "",
  ];
  if (options.extra) {
    parts.push(options.extra.trim(), "");
  }
  return parts.join("\n");
}

export function buildArticleMarkdown(article: BlogPost): string {
  const htmlPath = getArticlePath(article);
  const category = getPublicCategoryLabel(article.category).name;
  const header = [
    `# ${article.title}`,
    "",
    `> ${article.description || article.excerpt}`,
    "",
    `- Canonical: ${getAbsoluteUrl(htmlPath)}`,
    `- Categoría: ${category}`,
    `- Fecha: ${article.date}`,
    article.updatedDate ? `- Actualizado: ${article.updatedDate}` : "",
    "",
    article.content.trim(),
    "",
  ].filter((line, index, all) => !(line === "" && all[index - 1] === ""));

  return header.join("\n");
}

export function buildHubMarkdown(
  title: string,
  summary: string,
  htmlPath: string,
  articles: BlogPost[],
): string {
  const links =
    articles.length === 0
      ? "_Aún no hay artículos en esta sección._"
      : articles
          .map((article) =>
            mdLink(
              article.title,
              articleMarkdownUrl(article),
              clipNote(article.description || article.excerpt || ""),
            ),
          )
          .join("\n");

  return buildPageMarkdown({
    title,
    summary,
    htmlPath,
    extra: `## Artículos\n\n${links}`,
  });
}

export async function buildLlmsTxtBody(): Promise<string> {
  try {
    const { articles } = await listPublishedArticles({ page: 1, limit: 12 });
    return buildLlmsTxt(articles);
  } catch {
    return buildLlmsTxt([]);
  }
}

type MarkdownTarget =
  | { kind: "home" }
  | { kind: "hub"; htmlPath: string; title: string; summary: string; category?: string }
  | { kind: "article"; category: string; slug: string; htmlPath: string };

const STATIC_HUBS: Record<string, { title: string; summary: string }> = {
  "/sobre-nosotros": {
    title: `Sobre ${SITE_BRAND_NAME}`,
    summary:
      "Proyecto editorial independiente: artículos de idiomas, alimentación, entrenamiento e inteligencia artificial.",
  },
  "/contacto": {
    title: "Contacto",
    summary: `Cómo escribir a ${SITE_BRAND_NAME}.`,
  },
  "/blog": {
    title: "Blog",
    summary: SITE_DESCRIPTION,
  },
};

function hubFromVertical(htmlPath: string): MarkdownTarget | null {
  const vertical = SITE_VERTICALS.find(
    (item) => item.href === htmlPath || item.blogHref === htmlPath,
  );
  if (!vertical) return null;
  return {
    kind: "hub",
    htmlPath,
    title: vertical.name,
    summary: vertical.description,
    category: vertical.slug,
  };
}

function hubFromEnglishSection(htmlPath: string): MarkdownTarget | null {
  const section = ENGLISH_LEARNING_SECTIONS.find((item) => item.href === htmlPath);
  if (!section) return null;
  return {
    kind: "hub",
    htmlPath,
    title: section.name,
    summary: section.description,
    category: section.slug,
  };
}

export function resolveMarkdownTarget(markdownPath: string): MarkdownTarget | null {
  const requested = normalizeCanonicalPath(markdownPath);
  if (!requested.endsWith(".md")) return null;

  const parked = getParkedPageRedirect(requested);
  const effective = parked || requested;
  const htmlPath = htmlPathFromMarkdownTwin(effective);
  if (!htmlPath) return null;
  if (!isPublicSitePath(htmlPath) && htmlPath !== "/") return null;

  if (htmlPath === "/") return { kind: "home" };

  const verticalHub = hubFromVertical(htmlPath);
  if (verticalHub) return verticalHub;

  const englishHub = hubFromEnglishSection(htmlPath);
  if (englishHub) return englishHub;

  const staticHub = STATIC_HUBS[htmlPath];
  if (staticHub) {
    return {
      kind: "hub",
      htmlPath,
      title: staticHub.title,
      summary: staticHub.summary,
    };
  }

  const articleMatch = htmlPath.match(/^\/blog\/([^/]+)\/([^/]+)$/);
  if (articleMatch && isPublicArticleCategory(articleMatch[1])) {
    return {
      kind: "article",
      category: articleMatch[1],
      slug: articleMatch[2],
      htmlPath,
    };
  }

  return null;
}

export async function renderMarkdownTwin(markdownPath: string): Promise<{
  status: number;
  location?: string;
  body?: string;
  htmlPath?: string;
}> {
  const requested = normalizeCanonicalPath(markdownPath);
  const parked = getParkedPageRedirect(requested);
  if (parked && parked !== requested) {
    return { status: 301, location: getAbsoluteUrl(parked) };
  }

  const target = resolveMarkdownTarget(requested);
  if (!target) return { status: 404 };

  if (target.kind === "home") {
    const { articles } = await listPublishedArticles({ page: 1, limit: 12 }).catch(() => ({
      articles: [] as BlogPost[],
    }));
    return {
      status: 200,
      htmlPath: "/",
      body: buildHubMarkdown(
        SITE_BRAND_NAME,
        SITE_DESCRIPTION,
        "/",
        articles,
      ),
    };
  }

  if (target.kind === "hub") {
    const articles = target.category
      ? (
          await listPublishedArticles({
            category: target.category,
            page: 1,
            limit: 24,
          }).catch(() => ({ articles: [] as BlogPost[] }))
        ).articles
      : (
          await listPublishedArticles({ page: 1, limit: 24 }).catch(() => ({
            articles: [] as BlogPost[],
          }))
        ).articles;
    return {
      status: 200,
      htmlPath: target.htmlPath,
      body: buildHubMarkdown(target.title, target.summary, target.htmlPath, articles),
    };
  }

  const article = await getPublishedArticle(target.slug, target.category);
  if (!article) return { status: 404 };
  return {
    status: 200,
    htmlPath: target.htmlPath,
    body: buildArticleMarkdown(article),
  };
}
