import { Navigation } from "@/components/sections/Navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBlogArticlesPtBr,
  getPtBrArticleBySlug,
  getRelatedPtBrArticles,
} from "@/lib/blog-pt-br";
import { normalizeCategory } from "@/lib/blog";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/schemas";
import { JsonLd } from "@/components/seo/JsonLd";
import { optimizeSEOTitle } from "@/utils/seo-utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Metadata } from "next";

/* ------------------------------------------------------------------ */
/*  Static params                                                     */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  const articles = getBlogArticlesPtBr();
  return articles.map((article) => ({ slug: article.slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getPtBrArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artigo não encontrado",
      robots: { index: false, follow: false },
    };
  }

  const seoTitle = optimizeSEOTitle(article.title);
  const esCategory = normalizeCategory(article.category);

  return {
    title: seoTitle,
    description: article.excerpt,
    keywords: article.keywords || [],
    authors: [{ name: article.author }],
    openGraph: {
      title: seoTitle,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      section: article.category,
      tags: article.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: article.excerpt,
    },
    alternates: {
      canonical: `https://www.focus-on-english.com/pt-br/blog/${slug}`,
      languages: {
        es: `https://www.focus-on-english.com/blog/${esCategory}/${slug}`,
        "pt-BR": `https://www.focus-on-english.com/pt-br/blog/${slug}`,
      },
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default async function BlogArticlePtBr({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getPtBrArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const wordCount = (article.content || "").split(/\s+/).length;
  const normalizedCategory = normalizeCategory(article.category);

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.excerpt,
    image: article.image || "/blog/og-image.jpg",
    datePublished: article.date,
    dateModified: article.updatedDate || article.date,
    slug,
    category: normalizedCategory,
    keywords: article.keywords,
    wordCount,
    author: article.authorData
      ? {
          name: article.authorData.name,
          slug: article.authorData.slug,
          role: article.authorData.role,
          image: article.authorData.image,
        }
      : undefined,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "https://www.focus-on-english.com" },
    { name: "Blog", url: "https://www.focus-on-english.com/pt-br/blog" },
    {
      name: article.title,
      url: `https://www.focus-on-english.com/pt-br/blog/${slug}`,
    },
  ]);

  const faqSchema =
    article.faqs && article.faqs.length > 0
      ? generateFAQSchema(article.faqs)
      : null;

  const related = getRelatedPtBrArticles(slug, article.category, 3);

  /* Markdown components */
  const MarkdownComponents = {
    h2: ({ ...props }: React.ComponentPropsWithoutRef<"h2">) => (
      <h2
        className="font-display text-2xl font-black text-slate-900 mt-10 mb-4 scroll-mt-24"
        {...props}
      />
    ),
    h3: ({ ...props }: React.ComponentPropsWithoutRef<"h3">) => (
      <h3
        className="font-display text-xl font-bold text-slate-800 mt-8 mb-3"
        {...props}
      />
    ),
    p: ({ ...props }: React.ComponentPropsWithoutRef<"p">) => (
      <p className="text-slate-700 leading-relaxed mb-4" {...props} />
    ),
    ul: ({ ...props }: React.ComponentPropsWithoutRef<"ul">) => (
      <ul className="list-disc pl-6 space-y-1 mb-4 text-slate-700" {...props} />
    ),
    ol: ({ ...props }: React.ComponentPropsWithoutRef<"ol">) => (
      <ol
        className="list-decimal pl-6 space-y-1 mb-4 text-slate-700"
        {...props}
      />
    ),
    blockquote: ({
      ...props
    }: React.ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote
        className="border-l-4 border-coral-400 pl-4 py-2 my-4 bg-coral-50 rounded-r-lg text-slate-700 italic"
        {...props}
      />
    ),
    a: ({ ...props }: React.ComponentPropsWithoutRef<"a">) => (
      <a
        className="text-coral-600 underline hover:text-coral-800 transition-colors"
        {...props}
      />
    ),
    table: ({ ...props }: React.ComponentPropsWithoutRef<"table">) => (
      <div className="overflow-x-auto mb-6">
        <table
          className="min-w-full border-collapse border border-slate-200 text-sm"
          {...props}
        />
      </div>
    ),
    th: ({ ...props }: React.ComponentPropsWithoutRef<"th">) => (
      <th
        className="border border-slate-200 bg-slate-100 px-3 py-2 text-left font-bold"
        {...props}
      />
    ),
    td: ({ ...props }: React.ComponentPropsWithoutRef<"td">) => (
      <td className="border border-slate-200 px-3 py-2" {...props} />
    ),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-20">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-coral-600">
              Início
            </Link>
            <span>/</span>
            <Link href="/pt-br/blog" className="hover:text-coral-600">
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium truncate">
              {article.title}
            </span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-coral-100 text-coral-800 text-xs font-bold uppercase tracking-wide">
                {article.category}
              </span>
              <span className="text-slate-500 text-sm">
                📅{" "}
                {new Date(article.date).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight tracking-tight">
              {article.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-slate-500">
              <span>✍️ {article.author}</span>
              <span>•</span>
              <span>⏱️ {article.readTime}</span>
              <span>•</span>
              <span>📝 {wordCount.toLocaleString("pt-BR")} palavras</span>
            </div>
          </header>

          {/* Body */}
          <div className="prose prose-slate prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* FAQs */}
          {article.faqs && article.faqs.length > 0 && (
            <section className="mt-16 pt-10 border-t border-slate-200">
              <h2 className="font-display text-2xl font-black text-slate-900 mb-6">
                Perguntas Frequentes
              </h2>
              <div className="space-y-6">
                {article.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-white rounded-xl border border-slate-200 p-5"
                  >
                    <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                      {faq.question}
                      <span className="ml-2 text-slate-400 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <p className="mt-3 text-slate-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related articles */}
          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-slate-200">
              <h2 className="font-display text-2xl font-black text-slate-900 mb-6">
                Artigos Relacionados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/pt-br/blog/${r.slug}`}
                    className="group block bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-coral-600 transition-colors mb-1 line-clamp-2">
                      {r.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {r.readTime} • {r.category}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Link back to Spanish version */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="text-sm text-slate-500 hover:text-coral-600 transition-colors"
            >
              🇪🇸 Ver este blog en español →
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
