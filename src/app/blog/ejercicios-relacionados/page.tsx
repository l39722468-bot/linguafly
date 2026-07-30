import { Navigation } from '@/components/sections/Navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { BlogCourseMapTable } from '@/components/blog/BlogCourseMapTable';
import {
  getAllBlogCourseRelations,
  getUniqueTopics,
  getUniqueCourseLabels,
  getArticleSummaries,
} from '@/lib/blog-course-map';
import { generateBreadcrumbSchema } from '@/lib/schemas';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Cuadro de ejercicios del curso relacionados con el blog | Focus English',
  description:
    'Consulta la tabla completa que relaciona cada artículo del blog con las unidades interactivas del curso (A1–C2 y cursos por sector). Accede directamente a la unidad para practicar.',
  alternates: {
    canonical: 'https://www.focus-on-english.com/blog/ejercicios-relacionados',
  },
};

interface PageProps {
  searchParams: Promise<{ articulo?: string }>;
}

export default async function BlogExerciseMapPage({ searchParams }: PageProps) {
  const { articulo } = await searchParams;
  const relations = getAllBlogCourseRelations();
  const topics = getUniqueTopics();
  const courseLabels = getUniqueCourseLabels();
  const articleSummaries = getArticleSummaries();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: 'https://www.focus-on-english.com' },
    { name: 'Blog', url: 'https://www.focus-on-english.com/blog' },
    { name: 'Ejercicios relacionados', url: 'https://www.focus-on-english.com/blog/ejercicios-relacionados' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navigation />

      <main className="min-h-screen bg-slate-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex mb-8 text-sm font-medium text-slate-500">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Inicio</Link>
            <span className="mx-2 text-slate-300">/</span>
            <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-slate-900">Ejercicios relacionados</span>
          </nav>

          <header className="mb-10">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">
              Blog ↔ Curso
            </p>
            <h1 className="font-display text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
              Cuadro de ejercicios relacionados
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Esta tabla conecta cada artículo del blog con las unidades interactivas del curso donde puedes
              practicar el mismo tema: gramática, vocabulario, exámenes, viajes, trabajo y cursos por sector.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
              <p className="text-3xl font-black text-indigo-600">{articleSummaries.length}</p>
              <p className="text-sm text-slate-600 mt-1">artículos con unidades vinculadas</p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
              <p className="text-3xl font-black text-indigo-600">{relations.length}</p>
              <p className="text-sm text-slate-600 mt-1">relaciones artículo → unidad</p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
              <p className="text-3xl font-black text-indigo-600">{courseLabels.length}</p>
              <p className="text-sm text-slate-600 mt-1">cursos disponibles (A1–C2 + sector)</p>
            </div>
          </div>

          <BlogCourseMapTable
            relations={relations}
            topics={topics}
            courseLabels={courseLabels}
            highlightSlug={articulo}
          />

          <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
            <h2 className="font-display text-2xl font-black text-slate-900 mb-3">¿Cómo usar este cuadro?</h2>
            <ol className="list-decimal ml-5 space-y-2 text-slate-700">
              <li>Lee un artículo del blog sobre el tema que te interese.</li>
              <li>Usa el recuadro del artículo o vuelve aquí con el enlace «Ver cuadro de ejercicios relacionados».</li>
              <li>Filtra por artículo, tema o curso y pulsa «Ir a la unidad» para practicar con ejercicios interactivos.</li>
            </ol>
          </section>
        </div>
      </main>
    </>
  );
}
