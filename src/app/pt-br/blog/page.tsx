import { Navigation } from "@/components/sections/Navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getBlogArticlesPtBr } from "@/lib/blog-pt-br";
import { generateBreadcrumbSchema } from "@/lib/schemas";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:
    "Blog de Inglês 2026: Guias Trabalho, Viagens e Exames | Focus English",
  description:
    "Guias práticos de inglês para o trabalho, viagens e exames oficiais (Cambridge, IELTS, TOEFL). Métodos de estudo, gramática e vocabulário. Conteúdo atualizado por especialistas.",
  keywords: [
    "blog inglês",
    "aprender inglês",
    "inglês profissional",
    "inglês para viajar",
    "inglês para o trabalho",
    "preparação exames oficiais",
    "gramática inglês",
    "métodos aprender inglês",
  ],
  alternates: {
    canonical: "https://www.focus-on-english.com/pt-br/blog",
    languages: {
      "es": "https://www.focus-on-english.com/blog",
      "pt-BR": "https://www.focus-on-english.com/pt-br/blog",
    },
  },
};

export default function BlogPtBrPage() {
  const articles = getBlogArticlesPtBr();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "https://www.focus-on-english.com" },
    { name: "Blog", url: "https://www.focus-on-english.com/pt-br/blog" },
  ]);

  const categoryLabels: Record<string, string> = {
    // Portuguese-normalized categories (after LLM translation)
    trabalho: "Trabalho e negócios",
    viagens: "Viagens",
    exames: "Exames",
    metodos: "Métodos de aprendizagem",
    gramatica: "Gramática",
    habilidades: "Habilidades (speaking, listening…)",
    // Spanish-normalized fallbacks (if LLM keeps original category names)
    examenes: "Exames",
    trabajo: "Trabalho e negócios",
  };

  const categories = Array.from(
    new Set(articles.map((a) => a.category))
  ).map((catSlug) => ({
    slug: catSlug,
    label:
      categoryLabels[catSlug] ||
      catSlug.charAt(0).toUpperCase() + catSlug.slice(1).replace(/-/g, " "),
    articles: articles.filter((a) => a.category === catSlug).slice(0, 6),
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        {/* Hero */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Blog de Inglês
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Guias práticos para aprender inglês — gramática, vocabulário,
              exames oficiais e muito mais.
            </p>
            <p className="mt-4 text-sm text-slate-500">
              {articles.length} artigos disponíveis em português
            </p>
          </div>
        </section>

        {/* Articles by category */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {articles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-xl text-slate-500">
                  Em breve publicaremos artigos em português…
                </p>
                <Link
                  href="/blog"
                  className="mt-4 inline-block text-coral-600 font-bold hover:underline"
                >
                  Ver blog em espanhol →
                </Link>
              </div>
            ) : (
              <div className="space-y-16">
                {categories.map((cat) => (
                  <div key={cat.slug}>
                    <h2 className="font-display text-2xl font-black text-slate-900 mb-6">
                      {cat.label}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cat.articles.map((article) => (
                        <Link
                          key={article.slug}
                          href={`/pt-br/blog/${article.slug}`}
                          className="group block bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                            <span>
                              📅{" "}
                              {new Date(article.date).toLocaleDateString(
                                "pt-BR",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                            <span>•</span>
                            <span>⏱️ {article.readTime}</span>
                          </div>
                          <h3 className="font-bold text-slate-900 group-hover:text-coral-600 transition-colors leading-snug mb-2">
                            {article.title}
                          </h3>
                          <p className="text-sm text-slate-600 line-clamp-3">
                            {article.excerpt}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
