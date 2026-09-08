import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { MagazineArticleCard } from "@/components/magazine/MagazineArticleCard";
import Link from "next/link";
import type { Metadata } from "next";
import { getBlogArticles } from "@/lib/blog";
import { generateBreadcrumbSchema } from "@/lib/schemas";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAbsoluteUrl, getSiteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";
import { SITE_VERTICALS } from "@/lib/site-catalog";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Artículos de idiomas, alimentación y entrenamiento | ${SITE_BRAND_NAME}`,
  description:
    "Todos los artículos publicados de la revista: idiomas, alimentación y entrenamiento. Contenido nuevo; la hemeroteca antigua no está publicada.",
  alternates: {
    canonical: getAbsoluteUrl("/blog"),
  },
};

export default function BlogPage() {
  const articles = getBlogArticles();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: getSiteUrl() },
    { name: "Artículos", url: getAbsoluteUrl("/blog") },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navigation />
      <main className="min-h-screen bg-cream-100">
        <section className="px-4 pb-10 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="font-display mb-4 text-4xl font-black text-slate-900 sm:text-5xl">Artículos</h1>
            <p className="max-w-2xl text-lg text-slate-600">
              Publicamos solo las tres temáticas de la web nueva. Lo antiguo sigue en el repositorio, sin salir a producción.
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
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <MagazineArticleCard key={`${article.category}-${article.slug}`} article={article} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
