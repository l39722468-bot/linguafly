import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SEO_DIR = path.join(process.cwd(), "src/content/seo-pages");

export interface SEOPage {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  faqs?: { question: string; answer: string }[];
  content: string;
  canonical?: string;
  related_routes?: string[];
}

export function getSEOPageBySlug(slug: string): SEOPage | null {
  const filePath = path.join(SEO_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || "Linguafly",
    description: data.description || "",
    keywords: data.keywords || [],
    faqs: data.faqs || [],
    canonical: data.canonical,
    related_routes: data.related_routes || [],
    content,
  } as SEOPage;
}
