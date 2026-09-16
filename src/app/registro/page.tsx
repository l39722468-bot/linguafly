import { Metadata } from "next";
import Link from "next/link";
import { canonicalAlternates } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/site-brand";
import { Footer } from "@/components/sections/Footer";
import { Navigation } from "@/components/sections/Navigation";
import { getEnrollableCourse } from "@/lib/enrollment/catalog";
import RegistroClient from "./RegistroClient";

export const metadata: Metadata = {
  title: `Apúntate a un curso de inglés | ${SITE_BRAND_NAME}`,
  description:
    "Registra tu plaza en un curso de inglés A1–C2 o de sector profesional. Confirmación inmediata y recordatorio por email.",
  alternates: canonicalAlternates("/registro"),
};

type Search = Promise<{ estado?: string; curso?: string; error?: string }>;

export default async function RegistroPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const params = await searchParams;
  const course = getEnrollableCourse(params.curso || "ingles-a1");
  const confirmed =
    params.estado === "confirmed" || params.estado === "duplicate";

  return (
    <>
      {confirmed && course ? (
        <>
          <Navigation />
          <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <section className="pt-32 pb-20">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-slate-200">
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                    <div className="text-5xl mb-4">🎉</div>
                    <h1 className="text-2xl font-bold text-green-900 mb-2">
                      {params.estado === "duplicate"
                        ? "Ya estabas apuntado"
                        : "Registro confirmado"}
                    </h1>
                    <p className="text-green-800 text-lg mb-6">
                      {params.estado === "duplicate"
                        ? `Tu plaza en ${course.name} ya figuraba en el registro. Puedes continuar el curso cuando quieras.`
                        : `Plaza reservada en ${course.name}. Revisa tu correo si configuramos el envío de bienvenida.`}
                    </p>
                    <Link
                      href={course.blogHref}
                      className="inline-flex items-center justify-center rounded-xl bg-coral-600 px-6 py-3 font-bold text-white hover:bg-coral-700"
                    >
                      Ir al curso
                    </Link>
                    <Link
                      href="/registro"
                      className="block mx-auto mt-6 text-green-700 font-bold underline"
                    >
                      Apuntarme a otro curso
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      ) : (
        <RegistroClient
          initialCurso={params.curso}
          initialError={params.error}
        />
      )}
      <Footer />
    </>
  );
}
