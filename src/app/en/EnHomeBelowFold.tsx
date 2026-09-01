import Link from "next/link";
import Image from "next/image";
import { ENGLISH_HOME_A1_HUB, ENGLISH_HOME_LEVELS, ENGLISH_HOME_UNIT1 } from "@/lib/english-home";

interface EnHomeBelowFoldProps {
  latestArticles: Array<{
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    image?: string;
    readTime?: string;
  }>;
}

export function EnHomeBelowFold({ latestArticles }: EnHomeBelowFoldProps) {
  return (
    <>
      <section id="levels" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">A1–C2 Spanish course</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Sixty units per level. Each unit has a theory guide and an answered workbook, written in English for English speakers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGLISH_HOME_LEVELS.map((item) => (
              <Link
                key={item.level}
                href={item.href}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-teal-700">{item.level}</span>
                  <span
                    className={
                      item.status === "available"
                        ? "text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full bg-teal-100 text-teal-800"
                        : "text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full bg-slate-100 text-slate-600"
                    }
                  >
                    {item.status === "available" ? "Available" : "Coming soon"}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-2">Latest A1 lessons</h2>
              <p className="text-lg text-slate-600">Theory and answered exercises for English-speaking beginners</p>
            </div>
            <Link
              href={ENGLISH_HOME_A1_HUB}
              className="inline-flex items-center gap-2 text-teal-800 font-bold hover:text-teal-900 transition-colors"
            >
              <span>All A1 Spanish guides</span>
              <span>→</span>
            </Link>
          </div>
          {latestArticles.length === 0 ? (
            <p className="text-slate-600">The first A1 units are on the way.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.category}/${article.slug}`}
                  className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all group flex flex-col h-full"
                >
                  {article.image && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={70}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold uppercase tracking-wider">
                        {article.category.replace(/^curso-espanol-/, "Spanish ")}
                      </span>
                      <span className="text-xs text-slate-500">{article.readTime}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors tracking-tight leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-1">{article.excerpt}</p>
                    <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                      <span>Read more</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-700 via-emerald-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-black mb-6 tracking-tight">
            Start with Unit 1
          </h2>
          <p className="text-xl text-teal-50 mb-10 max-w-2xl mx-auto">
            Greetings, your name, and <em>soy / eres</em> — the first twenty seconds of Spanish, with an answered workbook.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ENGLISH_HOME_UNIT1}
              className="bg-white text-teal-800 px-10 py-5 rounded-xl font-black text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Open Unit 1 theory
            </Link>
            <Link
              href={ENGLISH_HOME_A1_HUB}
              className="bg-teal-900 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-teal-950 transition-all border-2 border-white/20"
            >
              A1 course index
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
