import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Author, getAuthor } from "./authors";
import { SITE_BRAND_NAME } from "./site-brand";
// Generado por scripts/export-blog-data.ts (cf:build). Fallback cuando no hay fs (Workers).
import generatedBlogArticles from "@/generated/blog-articles.json";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

// Cache for blog articles to improve performance during build
let articlesCache: BlogPost[] | null = null;

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
  featured?: boolean;
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

export function normalizeCategory(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

type StoredBlogArticle = Omit<BlogPost, "authorData">;

function hydrateStoredArticles(stored: StoredBlogArticle[]): BlogPost[] {
  return stored.map((a) => ({
    ...a,
    authorData: getAuthor(a.author || "linguafly-team"),
  }));
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
          keywords: data.keywords || [],
          faqs: data.faqs || [],
          featured: data.featured || false,
          canonical: data.canonical,
          downloadPdf: data.downloadPdf === true,
          pdfFileName: data.pdfFileName,
          pdfDownloadLabel: data.pdfDownloadLabel,
          updatedDate: data.updatedDate || data.updated_date || undefined,
          content,
        } as BlogPost;
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
    const priorityCats = new Set(["curso-a1", "curso-a2"]);
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

export function getBlogArticles(): BlogPost[] {
  if (articlesCache !== null) {
    return articlesCache;
  }

  // 1) Markdown en disco (dev / next build en Node)
  const fromFs = readArticlesFromMarkdown();
  if (fromFs.length > 0) {
    articlesCache = prioritizeRecentCourseArticles(fromFs);
    return articlesCache;
  }

  // 2) JSON generado en cf:build — único origen viable en Cloudflare Workers (sin fs)
  const generated = generatedBlogArticles as StoredBlogArticle[];
  if (Array.isArray(generated) && generated.length > 0) {
    articlesCache = prioritizeRecentCourseArticles(hydrateStoredArticles(generated));
    return articlesCache;
  }

  console.error(
    "[BlogLib] No hay artículos: src/content/blog vacío y src/generated/blog-articles.json vacío. Ejecuta: npx tsx scripts/export-blog-data.ts"
  );
  articlesCache = [];
  return articlesCache;
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

export function getArticlePath(article: Pick<BlogPost, "category" | "slug">): string {
  return `/blog/${normalizeCategory(article.category)}/${article.slug}`;
}

export function getCanonicalTopicPath(keywordOrSlug: string): string {
  const duplicateArticle = getDuplicateArticleForHub(keywordOrSlug);
  if (duplicateArticle) {
    return getArticlePath(duplicateArticle);
  }

  return `/blog/temas/${slugify(keywordOrSlug)}`;
}

export function resolveTopicHref(href: string): string {
  const match = href.match(/^\/blog\/temas\/([^?#]+)(\?[^#]*)?(#.*)?$/);
  if (!match) return href;

  const [, keywordOrSlug, search = "", hash = ""] = match;
  return `${getCanonicalTopicPath(keywordOrSlug)}${search}${hash}`;
}

export function getArticlesByCategory(category: string): BlogPost[] {
  const normalizedSearch = normalizeCategory(category);
  return getBlogArticles().filter(article => normalizeCategory(article.category) === normalizedSearch);
}

export function getRelatedArticles(currentSlug: string, category: string, limit: number = 3): BlogPost[] {
  const allArticles = getBlogArticles();
  return allArticles
    .filter(article => article.slug !== currentSlug && article.category === category)
    .slice(0, limit);
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

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // normalize accents
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w-]+/g, '') // remove all non-word chars
    .replace(/--+/g, '-') // replace multiple - with single -
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, ''); // trim - from end of text
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

  return {
    slug,
    title: data.title || slug.replace(/-/g, " "),
    description: data.description,
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
