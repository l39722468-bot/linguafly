import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import dynamic from "next/dynamic";
import Image from "next/image";

const Footer = dynamic(() => import("@/components/sections/Footer").then((m) => ({ default: m.Footer })), {
  ssr: true,
  loading: () => <footer className="h-64 bg-slate-900" aria-hidden="true" />,
});

export const metadata: Metadata = {
  title: "Blog para Aprender Inglês: Guias e Dúvidas Práticas",
  description:
    "Landing em português do Focus English com acesso ao blog, artigos traduzidos e conteúdos para aprender inglês com foco prático.",
  keywords: [
    "aprender inglês",
    "blog em português",
    "inglês prático",
    "artigos de inglês",
    "focus english",
  ],
  alternates: {
    canonical: "https://www.focus-on-english.com/pt-br",
    languages: {
      es: "https://www.focus-on-english.com/",
      "pt-BR": "https://www.focus-on-english.com/pt-br",
    },
  },
};

export default function HomePtBrPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <section className="pt-28 pb-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">
              Aprenda inglês com conteúdo prático em português
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
              Acesse o blog de membros e os primeiros artigos traduzidos para
              estudar inglês de forma clara, rápida e aplicada ao dia a dia.
            </p>
            <Image
              src="/blog/og-image.jpg"
              alt="Banner do blog com círculo em tom coral e texto Focus English Blog"
              className="w-full max-w-3xl mx-auto rounded-2xl shadow-lg border border-slate-200"
              width={1200}
              height={630}
              priority
            />
          </div>
        </section>

        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 mb-6">
              Comece pelos conteúdos em português
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/pt-br/blog/aptis-advanced-c1-guia"
                className="rounded-2xl border border-slate-200 p-5 bg-white hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-slate-500 mb-2">Artigo traduzido</p>
                <p className="font-bold text-slate-900">
                  Aptis Advanced C1: guia completo
                </p>
              </Link>
              <Link
                href="/pt-br/blog/aptis-a2-guia-completa"
                className="rounded-2xl border border-slate-200 p-5 bg-white hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-slate-500 mb-2">Artigo traduzido</p>
                <p className="font-bold text-slate-900">
                  Aptis A2: guia completo
                </p>
              </Link>
              <Link
                href="/mi-panel/lecturas"
                className="rounded-2xl border border-coral-200 p-5 bg-coral-50 hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-coral-700 mb-2">Blog de membros</p>
                <p className="font-bold text-slate-900">
                  Ver todas as leituras do painel
                </p>
              </Link>
            </div>
            <div className="mt-8">
              <Link
                href="/pt-br/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-coral-600 text-white font-bold hover:bg-coral-700 transition-colors"
              >
                Explorar blog em português →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
