import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, normalizeCategory, slugify } from "./blog";
import { getAuthor } from "./authors";

const BLOG_PT_DIR = path.join(process.cwd(), "src/content/blog-pt-br");

let cacheArticlesPtBr: BlogPost[] | null = null;

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else if (file.endsWith(".md") || file.endsWith(".mdx")) {
      arrayOfFiles.push(filePath);
    }
  });
  return arrayOfFiles;
}

export function getBlogArticlesPtBr(): BlogPost[] {
  if (cacheArticlesPtBr) return cacheArticlesPtBr;

  const allFiles = getAllFiles(BLOG_PT_DIR);

  const articles = allFiles
    .map((filePath) => {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);
        const slug = path.basename(filePath).replace(/\.mdx?$/, "");

        if (!data || typeof data !== "object") {
          console.error(
            `[BlogPtBr] FAILED to parse frontmatter for: ${filePath}`
          );
          return null;
        }

        return {
          slug,
          title: data.title || "Sem título",
          date: data.date || new Date().toISOString(),
          author: data.author || "Linguafly",
          authorData: getAuthor(data.author || "focus-english-team"),
          excerpt: data.excerpt || data.description || "",
          description: data.description || data.excerpt,
          category: normalizeCategory(data.category || "geral"),
          readTime: data.readTime || "5 min",
          image: undefined,
          alt: data.alt,
          keywords: data.keywords || [],
          faqs: data.faqs || [],
          featured: data.featured || false,
          canonical: data.canonical,
          updatedDate: data.updatedDate || data.updated_date || undefined,
          content,
        } as BlogPost;
      } catch (err) {
        console.error(`[BlogPtBr] Error reading ${filePath}:`, err);
        return null;
      }
    })
    .filter((a): a is BlogPost => a !== null);

  cacheArticlesPtBr = articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return cacheArticlesPtBr;
}

export function getPtBrArticleBySlug(slug: string): BlogPost | null {
  return getBlogArticlesPtBr().find((a) => a.slug === slug) || null;
}

export function getPtBrArticlesByCategory(category: string): BlogPost[] {
  const normalizedSearch = normalizeCategory(category);
  return getBlogArticlesPtBr().filter(
    (article) => normalizeCategory(article.category) === normalizedSearch
  );
}

export function getRelatedPtBrArticles(
  currentSlug: string,
  category: string,
  limit = 3
): BlogPost[] {
  return getBlogArticlesPtBr()
    .filter(
      (article) =>
        article.slug !== currentSlug &&
        normalizeCategory(article.category) === normalizeCategory(category)
    )
    .slice(0, limit);
}

export function getRelatedPtBrByKeywords(
  currentSlug: string,
  keywords: string[],
  limit = 3
): BlogPost[] {
  if (!keywords || keywords.length === 0) return [];

  const normalizedKeywords = keywords.map((k) => slugify(k));

  return getBlogArticlesPtBr()
    .filter((article) => {
      if (article.slug === currentSlug) return false;
      return article.keywords?.some((k) =>
        normalizedKeywords.includes(slugify(k))
      );
    })
    .slice(0, limit);
}
