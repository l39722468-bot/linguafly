import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { MagazineArticleCard } from "@/components/magazine/MagazineArticleCard";
import { ArticlePagination } from "@/components/magazine/ArticlePagination";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listPublishedArticles } from "@/lib/content/articles";
import { ARTICLES_PER_PAGE, parsePageParam, isOutOfRangePage } from "@/lib/content/pagination";
import { generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/schemas";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAbsoluteUrl, getSiteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";
import { llmMarkdownUrl, languageAlternates } from "@/lib/seo/canonical";
import { DEFAULT_OG_IMAGE_PATH, ogImageMeta } from "@/lib/seo/og-images";
import { ENGLISH_LEARNING_SECTIONS } from "@/lib/site-catalog";
import { getArticlePath } from "@/lib/blog-paths";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page: pageRaw } = await searchParams;
  const page = parsePageParam(pageRaw);
  // Pagination is Disallow in robots.txt (crawl budget). Canonical stays on page 1.
  const canonical = getAbsoluteUrl("/blog");
  const title = `Artículos para aprender inglés | ${SITE_BRAND_NAME}`;
  const description =
    "Guías para aprender inglés, noticias de actualidad sobre aprender inglés y cursos por nivel, de gramática y exámenes al juego con otros estudiantes.";
  const og = ogImageMeta(title, DEFAULT_OG_IMAGE_PATH);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(canonical),
      types:
        page > 1
          ? undefined
          : { "text/markdown": llmMarkdownUrl("/blog") },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "es_ES",
      url: canonical,
      siteName: SITE_BRAND_NAME,
      images: og.images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: og.twitterImages,
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageRaw } = await searchParams;
  const page = parsePageParam(pageRaw);
  const { articles, pages, total } = await listPublishedArticles({
    page,
    limit: ARTICLES_PER_PAGE,
  });
  if (isOutOfRangePage(page, pages)) {
    notFound();
  }
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: getSiteUrl() },
    { name: "Artículos", url: getAbsoluteUrl("/blog") },
  ]);
  const collectionSchema = generateCollectionPageSchema({
    name: "Artículos",
    description:
      "Guías para aprender inglés, noticias de actualidad sobre aprender inglés y cursos por nivel.",
    url: getAbsoluteUrl("/blog"),
    image: DEFAULT_OG_IMAGE_PATH,
    numberOfItems: total,
    articles: articles.map((article) => ({
      title: article.title,
      url: getAbsoluteUrl(getArticlePath(article)),
      datePublished: article.date,
    })),
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <Navigation />
      <main className="min-h-screen bg-cream-100">
        <section className="px-4 pb-10 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="font-display mb-4 text-4xl font-black text-slate-900 sm:text-5xl">Artículos</h1>
            <p className="max-w-2xl text-lg text-slate-600">
              Guías para aprender inglés, noticias de actualidad sobre aprender inglés y cursos por nivel.
              {total > 0 ? ` ${total} artículos publicados.` : ""}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/idiomas" className="rounded-full bg-coral-100 px-4 py-2 text-sm font-black text-coral-800">
                Aprender inglés
              </Link>
              <Link href="/blog/actualidad" className="rounded-full bg-teal-100 px-4 py-2 text-sm font-black text-teal-800">
                Actualidad
              </Link>
              <Link href="/mesas" className="rounded-full bg-slate-200 px-4 py-2 text-sm font-black text-slate-800">
                Juego
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {ENGLISH_LEARNING_SECTIONS.map((section) => (
                <Link
                  key={section.slug}
                  href={section.href}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${section.tone.badge}`}
                >
                  {section.icon} {section.shortName}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {articles.length === 0 ? (
              <p className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-slate-500">
                Aún no hay artículos publicados.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <MagazineArticleCard key={`${article.category}-${article.slug}`} article={article} />
                ))}
              </div>
            )}
            <ArticlePagination page={page} pages={pages} hrefBase="/blog" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
