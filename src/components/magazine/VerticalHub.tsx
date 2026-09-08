import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { MagazineArticleCard } from "@/components/magazine/MagazineArticleCard";
import { ArticlePagination } from "@/components/magazine/ArticlePagination";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/schemas";
import { listPublishedArticles } from "@/lib/content/articles";
import { ARTICLES_PER_PAGE, parsePageParam } from "@/lib/content/pagination";
import { getAbsoluteUrl, getSiteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";
import type { SiteVertical } from "@/lib/site-catalog";

export async function VerticalHub({
  vertical,
  page = 1,
}: {
  vertical: SiteVertical;
  page?: number;
}) {
  const { articles, pages, total } = await listPublishedArticles({
    category: vertical.slug,
    page,
    limit: ARTICLES_PER_PAGE,
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: getSiteUrl() },
    { name: vertical.name, url: getAbsoluteUrl(vertical.href) },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navigation />
      <main className="min-h-screen bg-cream-100">
        <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className={`absolute inset-0 bg-gradient-to-br ${vertical.tone.gradient} opacity-90`} />
          <div className="relative mx-auto max-w-5xl text-white">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-white/80">
              {SITE_BRAND_NAME} · {vertical.name}
            </p>
            <h1 className="font-display mb-6 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
              {vertical.tagline}
            </h1>
            <p className="max-w-2xl text-lg font-medium text-white/90 sm:text-xl">{vertical.description}</p>
            <Link
              href={vertical.blogHref}
              className="mt-8 inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-900 hover:bg-cream-100"
            >
              Ver todos los artículos{total > 0 ? ` (${total})` : ""}
            </Link>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display mb-8 text-3xl font-black text-slate-900">Artículos publicados</h2>
            {articles.length === 0 ? (
              <p className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-slate-500">
                Aún no hay artículos en esta sección.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {articles.map((article) => (
                  <MagazineArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
            <ArticlePagination page={page} pages={pages} hrefBase={vertical.href} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
