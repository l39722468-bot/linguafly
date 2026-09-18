import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { CompactHeadline } from "@/components/magazine/CompactHeadline";
import { FeaturedStory } from "@/components/magazine/FeaturedStory";
import { MagazineArticleCard } from "@/components/magazine/MagazineArticleCard";
import { buildPublisherHome } from "@/lib/content/publisher-home";
import { ENGLISH_LEARNING_SECTIONS, NAV_VERTICALS } from "@/lib/site-catalog";
import type { BlogPost } from "@/lib/blog";

export function PublisherHome({
  articles,
  total,
}: {
  articles: BlogPost[];
  total: number;
}) {
  const model = buildPublisherHome(articles);
  const inventoryLabel =
    total > 0
      ? `${new Intl.NumberFormat("es-ES").format(total)} artículos`
      : "Guías prácticas";

  return (
    <main className="min-h-screen bg-cream-100">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">
            Revista · idiomas, hábitos e IA · {inventoryLabel}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
            {NAV_VERTICALS.map((vertical) => (
              <Link
                key={vertical.slug}
                href={vertical.href}
                className="text-slate-600 hover:text-coral-700"
              >
                {vertical.name}
              </Link>
            ))}
            <Link href="/blog/actualidad" className="text-slate-600 hover:text-coral-700">
              Actualidad
            </Link>
            <Link href="/feed.xml" className="text-coral-700 hover:text-coral-800">
              RSS
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <AdSlot placement="leaderboard" />
      </div>

      {model.featured ? (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <FeaturedStory article={model.featured} />
            </div>
            <div className="flex flex-col divide-y divide-slate-100 overflow-hidden rounded-3xl border border-slate-200 bg-white px-5 lg:col-span-4">
              <p className="py-4 text-xs font-black uppercase tracking-[0.2em] text-coral-600">
                Destacados
              </p>
              {model.secondary.map((article) => (
                <CompactHeadline
                  key={`${article.category}-${article.slug}`}
                  article={article}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {model.news.length > 0 ? (
        <section className="px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">
                  🗞️ Actualidad
                </p>
                <h2 className="font-display text-2xl font-black text-slate-900">
                  Novedades del inglés y las academias
                </h2>
              </div>
              <Link
                href="/blog/actualidad"
                className="text-sm font-black text-teal-700 hover:text-teal-800"
              >
                Ver actualidad →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {model.news.map((article) => (
                <MagazineArticleCard
                  key={`${article.category}-${article.slug}`}
                  article={article}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {model.latest.length > 0 ? (
        <section className="px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-12">
            <div className="rounded-3xl border border-slate-200 bg-white px-5 py-2 lg:col-span-8">
              <div className="flex items-end justify-between gap-4 py-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-coral-600">
                    Lo último
                  </p>
                  <h2 className="font-display text-2xl font-black text-slate-900">
                    Para leer ahora
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-sm font-black text-coral-700 hover:text-coral-800"
                >
                  Ver todos →
                </Link>
              </div>
              {model.latest.map((article) => (
                <CompactHeadline
                  key={`${article.category}-${article.slug}`}
                  article={article}
                />
              ))}
            </div>
            <div className="space-y-6 lg:col-span-4">
              <AdSlot placement="sidebar" />
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Aprender inglés
                </p>
                <div className="flex flex-wrap gap-2">
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
            </div>
          </div>
        </section>
      ) : null}

      <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <AdSlot placement="feed" />
      </div>

      {model.rails.map((rail) =>
        rail.articles.length > 0 ? (
          <section
            key={rail.vertical.slug}
            className="px-4 pb-12 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-6xl">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className={`text-xs font-black uppercase tracking-[0.2em] ${rail.vertical.tone.text}`}>
                    {rail.vertical.icon} {rail.vertical.name}
                  </p>
                  <h2 className="font-display text-2xl font-black text-slate-900">
                    {rail.vertical.tagline}
                  </h2>
                </div>
                <Link
                  href={rail.vertical.href}
                  className={`text-sm font-black ${rail.vertical.tone.text}`}
                >
                  Ver {rail.vertical.shortName} →
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {rail.articles.map((article) => (
                  <MagazineArticleCard
                    key={`${article.category}-${article.slug}`}
                    article={article}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null,
      )}

      {model.more.length > 0 ? (
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display mb-6 text-2xl font-black text-slate-900">
              Más para aprender
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {model.more.map((article) => (
                <MagazineArticleCard
                  key={`${article.category}-${article.slug}`}
                  article={article}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {articles.length === 0 ? (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-slate-500">
            Aún no hay artículos publicados.
          </div>
        </section>
      ) : null}
    </main>
  );
}
