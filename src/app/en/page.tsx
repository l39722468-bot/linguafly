import dynamic from "next/dynamic";
import { Navigation } from "@/components/sections/Navigation";
import Link from "next/link";
import { EnHomeBelowFold } from "./EnHomeBelowFold";
import { ENGLISH_HOME_A1_HUB, ENGLISH_HOME_UNIT1, getSpanishCourseHomeArticles } from "@/lib/english-home";
import { HOME_PATHS } from "@/lib/site-locales";

const Footer = dynamic(() => import("@/components/sections/Footer").then((m) => ({ default: m.Footer })), {
  ssr: true,
  loading: () => <footer className="h-64 bg-slate-900" aria-hidden="true" />,
});

export default function EnglishHomePage() {
  const latestArticles = getSpanishCourseHomeArticles(3);

  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        <section className="hero-gradient relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-100/30 via-transparent to-coral-100/20 pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-7xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-lg text-sm font-black">
                <span className="w-2 h-2 bg-teal-600 rounded-full animate-pulse"></span>
                <span className="bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
                  Spanish course for English speakers
                </span>
              </div>
            </div>
            <p className="text-center mb-8">
              <Link
                href={HOME_PATHS.es}
                hrefLang="es"
                className="inline-flex items-center gap-2 text-sm font-bold text-coral-800 bg-coral-50 hover:bg-coral-100 border border-coral-200 px-4 py-2 rounded-full transition-colors"
              >
                ¿Hablas español? Aprende inglés aquí →
              </Link>
            </p>

            <div className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
                Learn Spanish
                <br />
                <span className="bg-gradient-to-r from-teal-700 to-emerald-500 bg-clip-text text-transparent">
                  with clear A1–C2 guides
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto mb-4 leading-relaxed font-semibold">
                Instruction in <span className="font-black text-teal-700">English</span>. Examples in{" "}
                <span className="font-black text-teal-700">Spanish</span>. Built around the mistakes English speakers actually make.
              </p>

              <p className="text-lg text-gray-600 mb-10 font-semibold">
                Aligned with DELE / Instituto Cervantes PCIC. A1 Unit 1 is ready: greetings, names, and <em>soy / eres</em>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  href={ENGLISH_HOME_UNIT1}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-teal-700 text-white font-black text-lg hover:bg-teal-800 hover:shadow-lg hover:scale-105 transition-all"
                >
                  Start A1 Unit 1
                </Link>
                <Link
                  href={ENGLISH_HOME_A1_HUB}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-teal-800 font-black text-lg hover:shadow-lg hover:scale-105 transition-all border-2 border-teal-100"
                >
                  A1 Spanish course blog
                </Link>
                <Link
                  href="#levels"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-teal-200 bg-white text-teal-800 font-black text-lg hover:bg-teal-50 transition-all"
                >
                  See all levels →
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-lg">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="font-black text-gray-900">Theory + workbook</span>
                <span className="text-gray-600 font-semibold">per unit</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-lg">
                <span className="text-2xl">🇬🇧</span>
                <span className="font-black text-gray-900">Taught in English</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-lg">
                <span className="text-2xl">🇪🇸</span>
                <span className="font-black text-gray-900">Spanish as the target language</span>
              </div>
            </div>
          </div>
        </section>

        <EnHomeBelowFold latestArticles={latestArticles} />
      </main>

      <Footer locale="en" />
    </>
  );
}
