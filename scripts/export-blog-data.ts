/**
 * Exporta el blog a JSON embebible para Cloudflare Workers.
 * En Workers no hay fs sobre src/content; el Worker debe importar este JSON.
 *
 * Uso: npx tsx scripts/export-blog-data.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { getBlogArticles } from '../src/lib/blog';
import { buildBlogCourseRelations } from '../src/lib/blog-course-map';

const ROOT = path.join(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'src', 'generated');

type StoredArticle = {
  slug: string;
  title: string;
  date: string;
  updatedDate?: string;
  author: string;
  excerpt: string;
  description?: string;
  category: string;
  readTime: string;
  image?: string;
  alt?: string;
  keywords?: string[];
  faqs?: { question: string; answer: string }[];
  featured?: boolean;
  canonical?: string;
  downloadPdf?: boolean;
  pdfFileName?: string;
  pdfDownloadLabel?: string;
  content: string;
};

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const articles = getBlogArticles();
  if (articles.length === 0) {
    throw new Error(
      '[export-blog-data] 0 artículos leídos desde src/content/blog — abortando (no sobrescribir con vacío).'
    );
  }

  const stored: StoredArticle[] = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    date: a.date,
    updatedDate: a.updatedDate,
    author: a.author,
    excerpt: a.excerpt,
    description: a.description,
    category: a.category,
    readTime: a.readTime,
    image: a.image,
    alt: a.alt,
    keywords: a.keywords,
    faqs: a.faqs,
    featured: a.featured,
    canonical: a.canonical,
    downloadPdf: a.downloadPdf,
    pdfFileName: a.pdfFileName,
    pdfDownloadLabel: a.pdfDownloadLabel,
    content: a.content,
  }));

  const articlesPath = path.join(OUT_DIR, 'blog-articles.json');
  fs.writeFileSync(articlesPath, JSON.stringify(stored));
  console.log(
    `[export-blog-data] ${stored.length} artículos → ${path.relative(ROOT, articlesPath)} (${(Buffer.byteLength(JSON.stringify(stored)) / 1024 / 1024).toFixed(2)} MiB)`
  );

  const relations = buildBlogCourseRelations(articles);
  const relationsPath = path.join(OUT_DIR, 'blog-course-relations.json');
  fs.writeFileSync(relationsPath, JSON.stringify(relations));
  console.log(
    `[export-blog-data] ${relations.length} relaciones → ${path.relative(ROOT, relationsPath)} (${(Buffer.byteLength(JSON.stringify(relations)) / 1024).toFixed(0)} KiB)`
  );

  const topics = Array.from(new Set(relations.map((r) => r.topicName))).sort((a, b) =>
    a.localeCompare(b, 'es')
  );
  const courseLabels = Array.from(new Set(relations.map((r) => r.courseLabel))).sort((a, b) =>
    a.localeCompare(b, 'es')
  );
  const metaPath = path.join(OUT_DIR, 'blog-course-map-meta.json');
  fs.writeFileSync(metaPath, JSON.stringify({ topics, courseLabels }));
  console.log(`[export-blog-data] meta topics=${topics.length} courses=${courseLabels.length}`);
}

main();
