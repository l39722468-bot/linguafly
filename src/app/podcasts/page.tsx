import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { A1_EPISODES } from "@/lib/podcasts/a1-episodes";

const baseUrl = "https://www.focus-on-english.com";

export const metadata: Metadata = {
  title: "Podcasts de inglés para practicar listening | Focus English",
  description:
    "Escucha podcasts de inglés para practicar comprensión auditiva con transcripción y vocabulario. Recurso complementario a nuestros cursos gratis de inglés.",
  alternates: {
    canonical: `${baseUrl}/podcasts`,
  },
  keywords: [
    "podcasts de inglés",
    "listening en inglés",
    "practicar inglés con podcasts",
    "podcasts para aprender inglés",
  ],
};

export default function PodcastsPage() {
  const featuredEpisodes = A1_EPISODES.slice(0, 8);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 lg:p-12 mb-10">
            <p className="inline-flex rounded-full bg-coral-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-coral-700 mb-5">
              Podcasts para aprender inglés
            </p>
            <h1 className="font-display text-4xl lg:text-5xl font-black text-slate-900 mb-5">
              Practica listening con podcasts en inglés
            </h1>
            <p className="text-lg text-slate-600 mb-6 max-w-3xl">
              Aquí encontrarás episodios para entrenar comprensión auditiva, ampliar vocabulario y mejorar fluidez.
              También puedes combinar este recurso con nuestros cursos gratis y cursos especializados por sector profesional.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/mi-panel/podcasts"
                className="inline-flex items-center justify-center rounded-xl bg-coral-600 px-6 py-3 font-bold text-white hover:bg-coral-700 transition-colors"
              >
                Ir a la biblioteca de podcasts
              </Link>
              <Link
                href="/curso-a1"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 hover:border-coral-200 hover:bg-coral-50/30 transition-colors"
              >
                Ver cursos gratis A1-C2
              </Link>
            </div>
          </header>

          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 lg:p-10">
            <h2 className="font-display text-2xl font-black text-slate-900 mb-2">Episodios destacados</h2>
            <p className="text-slate-600 mb-6">
              {A1_EPISODES.length} episodios disponibles para practicar inglés.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredEpisodes.map((episode) => (
                <li key={episode.id}>
                  <Link
                    href={`/mi-panel/podcasts/${episode.id}`}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-coral-200 hover:bg-coral-50/30 transition-colors"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-coral-700 mb-2">
                      Nivel {episode.level} · {episode.durationMinutes} min
                    </p>
                    <h3 className="font-bold text-slate-900 mb-2">{episode.title}</h3>
                    <p className="text-sm text-slate-600">{episode.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
