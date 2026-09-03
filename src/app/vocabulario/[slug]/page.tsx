import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import type { Metadata } from "next";
import { VOCAB_SECTORS, getSectorMeta } from "@/lib/vocabulario/sectors";
import { loadSectorWords } from "@/lib/vocabulario/load-words";
import { VocabAudioButton } from "@/components/vocabulario/VocabAudioButton";
import { SITE_BRAND_NAME } from "@/lib/site-brand";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return VOCAB_SECTORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = getSectorMeta(slug);
  if (!meta) return {};
  const title = `${meta.title}: 200 palabras en inglés | ${SITE_BRAND_NAME}`;
  return {
    title,
    description: `${meta.description} Lista con traducción al español, IPA y audio.`,
    alternates: {
      canonical: `https://linguafly.app/vocabulario/${slug}`,
    },
  };
}

export default async function VocabularioSectorPage({ params }: Props) {
  const { slug } = await params;
  const meta = getSectorMeta(slug);
  if (!meta) notFound();

  const data = await loadSectorWords(slug);
  if (!data) notFound();

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 pt-28 pb-20 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="flex items-center gap-1 hover:text-coral-600 transition-colors">
              <Home className="w-4 h-4" />
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            <Link href="/vocabulario" className="hover:text-coral-600 transition-colors">
              Vocabulario
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            <span className="text-slate-900 font-bold dark:text-slate-100">{meta.title}</span>
          </nav>

          <header className="mb-10">
            <div className="text-3xl mb-3" aria-hidden>
              {meta.icon}
            </div>
            <h1 className="font-display text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
              {data.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">{meta.description}</p>
            <p className="text-sm text-slate-500 mt-3">
              {data.words.length} entradas · IPA (CMUdict) · Audio: Cloudflare Workers AI (Deepgram Aura 2
              EN) vía <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">/api/vocabulario/tts</code>
              ; si falla o no hay credenciales, el botón usa la voz del navegador.
            </p>
          </header>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left dark:bg-slate-800/80 dark:border-slate-700">
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">Inglés</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">Español</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200 hidden sm:table-cell">
                    Fonética (IPA)
                  </th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200 w-24">Audio</th>
                </tr>
              </thead>
              <tbody>
                {data.words.map((w) => (
                  <tr
                    key={w.en}
                    className="border-b border-slate-100 last:border-0 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-4 py-2.5 font-semibold text-slate-900 dark:text-white">
                      {w.en}
                    </td>
                    <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{w.es}</td>
                    <td className="px-4 py-2.5 text-slate-600 font-mono text-xs hidden sm:table-cell dark:text-slate-400">
                      {w.phonetic}
                    </td>
                    <td className="px-4 py-2">
                      <VocabAudioButton text={w.en} audioUrl={w.audioUrl} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/vocabulario"
              className="inline-flex items-center font-bold text-coral-600 hover:text-coral-700"
            >
              ← Volver al índice de sectores
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
