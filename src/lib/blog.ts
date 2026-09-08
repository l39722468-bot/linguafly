import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Author, getAuthor } from "./authors";
import { SITE_BRAND_NAME } from "./site-brand";
import {
  isEnglishLearningCategory,
  isMagazineArticleCategory,
  isPublicArticleCategory,
} from "./site-catalog";
import {
  getArticlePath,
  getCanonicalTopicPath,
  getTheoryWorkbookPeerSlug,
  normalizeCategory,
  resolveTopicHref,
  slugify,
} from "./blog-paths";

export {
  getArticlePath,
  getCanonicalTopicPath,
  getTheoryWorkbookPeerSlug,
  normalizeCategory,
  resolveTopicHref,
  slugify,
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

// Cache for blog articles to improve performance during build
let allArticlesCache: BlogPost[] | null = null;
let publicArticlesCache: BlogPost[] | null = null;

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  updatedDate?: string;
  author: string;
  authorData?: Author;
  excerpt: string;
  description?: string;
  category: string;
  readTime: string;
  image?: string;
  alt?: string;
  keywords?: string[];
  faqs?: { question: string, answer: string }[];
  /** Slugs de artículos a priorizar en «Artículos relacionados» (frontmatter `related_routes`). */
  relatedRoutes?: string[];
  featured?: boolean;
  /** En revista: solo `published: true`. En el archivo de inglés el flag suele faltar y se publica igual. */
  published?: boolean;
  canonical?: string;
  downloadPdf?: boolean;
  pdfFileName?: string;
  pdfDownloadLabel?: string;
  content: string;
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return [];
  
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      if (file.endsWith(".md") || file.endsWith(".mdx")) {
        arrayOfFiles.push(filePath);
      }
    }
  });

  return arrayOfFiles;
}

function normalizeKeywords(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((keyword): keyword is string => typeof keyword === "string")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function readArticlesFromMarkdown(): BlogPost[] {
  try {
    if (!fs.existsSync(BLOG_DIR)) return [];
  } catch {
    // Cloudflare Workers: fs no disponible / sin filesystem real
    return [];
  }

  let allFiles: string[] = [];
  try {
    allFiles = getAllFiles(BLOG_DIR);
  } catch {
    return [];
  }
  if (allFiles.length === 0) return [];

  try {
    const articles = allFiles
      .map((filePath) => {
        try {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const { data, content } = matter(fileContent);
          const slug = path.basename(filePath).replace(/\.mdx?$/, "");

          if (!data || typeof data !== "object") {
            console.error(`[BlogLib] FAILED to parse frontmatter for: ${filePath}`);
            return null;
          }

          return {
            slug,
            title: data.title || "Untitled",
            date: data.date || new Date().toISOString(),
            author: data.author || SITE_BRAND_NAME,
            authorData: getAuthor(data.author || "linguafly-team"),
            excerpt: data.excerpt || data.description || "",
            description: data.description || data.excerpt,
            category: normalizeCategory(data.category || "General"),
            readTime: data.readTime || "5 min",
            image: typeof data.image === "string" && data.image.trim() ? data.image.trim() : undefined,
            alt: data.alt,
            keywords: normalizeKeywords(data.keywords),
            faqs: data.faqs || [],
            relatedRoutes: Array.isArray(data.related_routes)
              ? data.related_routes.map((r: unknown) => String(r).trim()).filter(Boolean)
              : [],
            featured: data.featured || false,
            published: data.published === true,
            canonical: data.canonical,
            downloadPdf: data.downloadPdf === true,
            pdfFileName: data.pdfFileName,
            pdfDownloadLabel: data.pdfDownloadLabel,
            updatedDate: data.updatedDate || data.updated_date || undefined,
            content,
          } as BlogPost;
        } catch (fileErr) {
          // Un frontmatter YAML roto no debe tumbar TODO el blog (Workers export → 404 masivos).
          console.error(
            `[BlogLib] Skipping broken markdown ${filePath}:`,
            fileErr instanceof Error ? fileErr.message.split("\n")[0] : fileErr
          );
          return null;
        }
      })
      .filter((a): a is BlogPost => a !== null);

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (err) {
    console.error("[BlogLib] Error reading markdown blog files:", err);
    return [];
  }
}

function prioritizeRecentCourseArticles(articles: BlogPost[]): BlogPost[] {
  try {
    const RECENT_DAYS = 14;
    const priorityCats = new Set([
      "curso-a1",
      "curso-a2",
      "curso-b1",
      "curso-b2",
    ]);
    const now = Date.now();
    const recentThreshold = now - RECENT_DAYS * 24 * 60 * 60 * 1000;

    const recentPriority = articles.filter(
      (a) => priorityCats.has(a.category) && new Date(a.date).getTime() >= recentThreshold
    );
    if (recentPriority.length === 0) return articles;
    const rest = articles.filter(
      (a) => !(priorityCats.has(a.category) && new Date(a.date).getTime() >= recentThreshold)
    );
    return [...recentPriority, ...rest];
  } catch (err) {
    console.error("[BlogLib] failed to apply course prioritization:", err);
    return articles;
  }
}

/**
 * Qué markdown entra en D1 / listados públicos:
 * - revista (idiomas, alimentación, entrenamiento): solo `published: true`
 * - archivo de inglés: todo el markdown de esas categorías (el flag falta en lo antiguo)
 * - fitness y el resto: fuera
 */
export function isPublicPublishedArticle(article: BlogPost): boolean {
  const category = normalizeCategory(article.category);
  if (!isPublicArticleCategory(category)) return false;
  if (isMagazineArticleCategory(category)) {
    return article.published === true;
  }
  return isEnglishLearningCategory(category);
}

function loadAllArticles(): BlogPost[] {
  if (allArticlesCache !== null) {
    return allArticlesCache;
  }

  // Markdown en disco (autoría / tests / sync a D1). Las páginas públicas leen D1.
  const fromFs = readArticlesFromMarkdown();
  allArticlesCache = prioritizeRecentCourseArticles(fromFs);
  return allArticlesCache;
}

/** Todos los markdown del repo, incluido fitness y borradores. */
export function getAllBlogArticles(): BlogPost[] {
  return loadAllArticles();
}

/**
 * Artículos que se publican en la web nueva: revista + archivo de inglés.
 * Es el conjunto que se sincroniza a D1.
 */
export function getBlogArticles(): BlogPost[] {
  if (publicArticlesCache !== null) {
    return publicArticlesCache;
  }
  publicArticlesCache = loadAllArticles().filter(isPublicPublishedArticle);
  return publicArticlesCache;
}

export function getArticlesForD1Sync(): BlogPost[] {
  return getBlogArticles();
}

export function getArticleBySlug(slug: string, category?: string): BlogPost | null {
  const articles = getBlogArticles();
  if (category) {
    const normalizedCategory = normalizeCategory(category);
    return articles.find(a => a.slug === slug && normalizeCategory(a.category) === normalizedCategory) || null;
  }
  return articles.find(a => a.slug === slug) || null;
}

/**
 * Devuelve el artículo que canibaliza un hub cuando comparten slug.
 * Normaliza entrada para cubrir variaciones (espacios, mayúsculas, acentos).
 */
export function getDuplicateArticleForHub(keywordOrSlug: string): BlogPost | null {
  const hubSlug = slugify(keywordOrSlug);
  if (!hubSlug) return null;
  return getArticleBySlug(hubSlug);
}

export function getArticlesByCategory(category: string): BlogPost[] {
  const normalizedSearch = normalizeCategory(category);
  return getBlogArticles().filter(article => normalizeCategory(article.category) === normalizedSearch);
}

export function getRelatedArticles(currentSlug: string, category: string, limit: number = 3): BlogPost[] {
  const allArticles = getAllBlogArticles();
  const bySlug = new Map(allArticles.map((article) => [article.slug, article]));
  const current = bySlug.get(currentSlug);
  const picked: BlogPost[] = [];
  const seen = new Set<string>([currentSlug]);

  const push = (article: BlogPost | undefined) => {
    if (!article || seen.has(article.slug) || picked.length >= limit) return;
    seen.add(article.slug);
    picked.push(article);
  };

  // 1) Par automático teoría ↔ cuaderno de ejercicios (A1/A2/B1/B2)
  const peerSlug = getTheoryWorkbookPeerSlug(currentSlug);
  if (peerSlug) push(bySlug.get(peerSlug));

  // 2) Frontmatter related_routes (puede cruzar categorías)
  for (const route of current?.relatedRoutes || []) {
    push(bySlug.get(route));
  }

  // 3) Relleno: misma categoría por fecha (orden ya descendente en getBlogArticles)
  const normalizedCategory = normalizeCategory(category);
  for (const article of allArticles) {
    if (normalizeCategory(article.category) !== normalizedCategory) continue;
    push(article);
  }

  return picked;
}

export function getRelatedByKeywords(currentSlug: string, keywords: string[], limit: number = 3): BlogPost[] {
  if (!keywords || keywords.length === 0) return [];
  
  const allArticles = getBlogArticles();
  const normalizedKeywords = keywords.map(k => slugify(k));
  
  return allArticles
    .filter(article => {
      if (article.slug === currentSlug) return false;
      return article.keywords?.some(k => normalizedKeywords.includes(slugify(k)));
    })
    .slice(0, limit);
}

export function getArticlesByKeyword(keyword: string): BlogPost[] {
  const allArticles = getBlogArticles();
  return allArticles.filter(article => 
    article.keywords?.some(k => slugify(k) === slugify(keyword))
  );
}

export function getArticlesByAuthor(authorSlug: string): BlogPost[] {
  const allArticles = getBlogArticles();
  return allArticles.filter(article => {
    const slug = slugify(article.author || "");
    return slug === authorSlug || (article.authorData && article.authorData.slug === authorSlug);
  });
}

export interface HubContent {
  slug: string;
  title: string;
  description?: string;
  keywords?: string[];
  content: string;
}

const HUBS_DIR = path.join(process.cwd(), "src/content/hubs");

export function getHubContent(keyword: string): HubContent | null {
  // 1. Try direct match with the string provided (could be already a slug)
  let filePath = path.join(HUBS_DIR, `${keyword}.md`);
  if (fs.existsSync(filePath)) {
    return parseHubFile(filePath, keyword);
  }

  // 2. Try slugified version
  const slug = slugify(keyword);
  filePath = path.join(HUBS_DIR, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    return parseHubFile(filePath, slug);
  }

  return null;
}

function parseHubFile(filePath: string, slug: string): HubContent {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const keywords = Array.isArray(data.keywords)
    ? data.keywords.map((k: unknown) => String(k).trim()).filter(Boolean)
    : undefined;

  return {
    slug,
    title: data.title || slug.replace(/-/g, " "),
    description: data.description,
    keywords,
    content,
  };
}

/** Texto normalizado para búsquedas (minúsculas, sin acentos). */
export function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export interface BlogSearchHit {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  alt?: string;
}

function toSearchHit(article: BlogPost): BlogSearchHit {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    date: article.date,
    readTime: article.readTime,
    category: article.category,
    image: undefined,
    alt: article.alt,
  };
}

export type BlogSearchMatchMode = "any" | "all";

/**
 * Busca artículos por palabras clave en título, resumen, descripción, keywords y parte del contenido.
 * - `match: "any"` (por defecto): **OR** — basta con que coincida un término; más coincidencias suben en el ranking.
 * - `match: "all"`: **Y** — deben aparecer todos los términos.
 * Sin consulta (o solo espacios): lista por fecha dentro del filtro de categoría (si aplica).
 */
export function searchBlogPosts(
  query: string,
  options: {
    category?: string;
    limit?: number;
    offset?: number;
    match?: BlogSearchMatchMode;
  } = {}
): { hits: BlogSearchHit[]; total: number } {
  const limit = Math.min(Math.max(options.limit ?? 24, 1), 100);
  const offset = Math.max(options.offset ?? 0, 0);
  const matchMode: BlogSearchMatchMode = options.match === "all" ? "all" : "any";

  let pool = getBlogArticles();

  if (options.category && options.category !== "all") {
    const nc = normalizeCategory(options.category);
    pool = pool.filter((a) => normalizeCategory(a.category) === nc);
  }

  const raw = query.trim();
  const tokens = raw
    ? raw
        .split(/\s+/)
        .map((t) => normalizeForSearch(t))
        .filter((t) => t.length >= 2)
    : [];

  if (raw.length > 0 && tokens.length === 0) {
    return { hits: [], total: 0 };
  }

  if (tokens.length === 0) {
    const total = pool.length;
    const slice = pool.slice(offset, offset + limit);
    return { hits: slice.map(toSearchHit), total };
  }

  type Scored = { article: BlogPost; score: number; matchedTerms: number };

  const scored: Scored[] = [];

  for (const article of pool) {
    const titleN = normalizeForSearch(article.title);
    const excerptN = normalizeForSearch(article.excerpt);
    const descN = normalizeForSearch(article.description || "");
    const keywordsN = (article.keywords || []).map((k) => normalizeForSearch(k)).join(" ");
    const contentSample = normalizeForSearch(article.content.slice(0, 12000));

    const haystack = `${titleN} ${excerptN} ${descN} ${keywordsN} ${contentSample}`;

    if (matchMode === "all") {
      if (!tokens.every((t) => haystack.includes(t))) {
        continue;
      }
      let score = 0;
      for (const t of tokens) {
        if (titleN.includes(t)) score += 12;
        else if (keywordsN.includes(t)) score += 8;
        else if (excerptN.includes(t) || descN.includes(t)) score += 4;
        else score += 1;
      }
      scored.push({ article, score, matchedTerms: tokens.length });
      continue;
    }

    let score = 0;
    let matchedTerms = 0;
    for (const t of tokens) {
      if (!haystack.includes(t)) continue;
      matchedTerms += 1;
      if (titleN.includes(t)) score += 12;
      else if (keywordsN.includes(t)) score += 8;
      else if (excerptN.includes(t) || descN.includes(t)) score += 4;
      else score += 1;
    }

    if (matchedTerms === 0) continue;

    scored.push({ article, score, matchedTerms });
  }

  scored.sort((a, b) => {
    if (matchMode === "any" && b.matchedTerms !== a.matchedTerms) {
      return b.matchedTerms - a.matchedTerms;
    }
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.article.date).getTime() - new Date(a.article.date).getTime();
  });

  const total = scored.length;
  const slice = scored.slice(offset, offset + limit).map((s) => toSearchHit(s.article));

  return { hits: slice, total };
}

export function getAllKeywords(): string[] {
  const allArticles = getBlogArticles();
  const keywords = new Set<string>();
  
  // From articles
  allArticles.forEach(article => {
    article.keywords?.forEach(k => keywords.add(k.toLowerCase()));
  });

  // From hub files
  if (fs.existsSync(HUBS_DIR)) {
    const hubFiles = fs.readdirSync(HUBS_DIR);
    hubFiles.forEach(file => {
      if (file.endsWith(".md")) {
        // Use filename as keyword (replacing dashes with spaces for better readability in breadcrumbs if needed)
        const hubName = file.replace(".md", "").replace(/-/g, " ");
        keywords.add(hubName);
      }
    });
  }

  return Array.from(keywords);
}

/**
 * Keywords que merecen página `/blog/temas/[keyword]` prerenderizada.
 * Criterio alineado con sitemap: hub markdown o ≥3 artículos.
 * Evita ~2400 rutas thin que hinchan `.open-next` hasta ENOSPC en Workers Builds.
 */
export function getStaticTemaKeywords(): string[] {
  return getAllKeywords().filter((keyword) => {
    if (getDuplicateArticleForHub(keyword)) return false;
    if (getHubContent(keyword) || getHubContent(slugify(keyword))) return true;
    return getArticlesByKeyword(keyword).length >= 3;
  });
}
