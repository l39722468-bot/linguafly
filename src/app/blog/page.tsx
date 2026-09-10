import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { MagazineArticleCard } from "@/components/magazine/MagazineArticleCard";
import { ArticlePagination } from "@/components/magazine/ArticlePagination";
import Link from "next/link";
import type { Metadata } from "next";
import { listPublishedArticles } from "@/lib/content/articles";
import { ARTICLES_PER_PAGE, parsePageParam } from "@/lib/content/pagination";
import { generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/schemas";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAbsoluteUrl, getSiteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";
import { llmMarkdownUrl } from "@/lib/seo/canonical";
import { DEFAULT_OG_IMAGE_PATH, ogImageMeta } from "@/lib/seo/og-images";
import { ENGLISH_LEARNING_SECTIONS, SITE_VERTICALS } from "@/lib/site-catalog";
import { getArticlePath } from "@/lib/blog-paths";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page: pageRaw } = await searchParams;
  const page = parsePageParam(pageRaw);
  const canonical =
    page > 1 ? getAbsoluteUrl(`/blog?page=${page}`) : getAbsoluteUrl("/blog");
  const title = `Artículos de idiomas, hábitos, IA e inglés | ${SITE_BRAND_NAME}`;
  const description =
    "Artículos de la revista (idiomas, alimentación, entrenamiento e inteligencia artificial) y el archivo de guías para aprender inglés: gramática, viajes, trabajo, exámenes y cursos por nivel.";
  const og = ogImageMeta(title, DEFAULT_OG_IMAGE_PATH);

  return {
    title,
    description,
    alternates: {
      canonical,
      types:
        page > 1
          ? undefined
          : { "text/markdown": llmMarkdownUrl("/blog") },
    },
    robots: page > 1 ? { index: false, follow: true } : undefined,
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
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: getSiteUrl() },
    { name: "Artículos", url: getAbsoluteUrl("/blog") },
  ]);
  const collectionSchema = generateCollectionPageSchema({
    name: "Artículos",
    description:
      "Revista de idiomas, alimentación, entrenamiento e inteligencia artificial, y el archivo de guías para aprender inglés.",
    url: page > 1 ? getAbsoluteUrl(`/blog?page=${page}`) : getAbsoluteUrl("/blog"),
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
              Revista nueva y archivo de inglés en las URLs originales. Gramática, viajes, trabajo, exámenes, métodos y cursos por nivel.
              {total > 0 ? ` ${total} artículos publicados.` : ""}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {SITE_VERTICALS.map((vertical) => (
                <Link
                  key={vertical.slug}
                  href={vertical.blogHref}
                  className={`rounded-full px-4 py-2 text-sm font-black ${vertical.tone.badge}`}
                >
                  {vertical.icon} {vertical.name}
                </Link>
              ))}
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
