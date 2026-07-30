import Link from 'next/link';
import { BookOpen, ExternalLink } from 'lucide-react';
import {
  getRelationsForArticle,
  getExerciseMapUrlForArticle,
  BLOG_EXERCISE_MAP_PATH,
} from '@/lib/blog-course-map';

interface BlogExerciseMapBannerProps {
  articleSlug: string;
  articleTitle: string;
}

export function BlogExerciseMapBanner({ articleSlug, articleTitle }: BlogExerciseMapBannerProps) {
  const relations = getRelationsForArticle(articleSlug);
  const mapUrl = getExerciseMapUrlForArticle(articleSlug);
  const topRelations = relations.slice(0, 4);

  return (
    <section
      aria-label="Ejercicios interactivos del curso relacionados"
      className="mb-8 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <BookOpen className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl font-black text-slate-900 mb-2">
            Practica con ejercicios interactivos del curso
          </h2>
          <p className="text-slate-700 text-sm leading-relaxed mb-4">
            Además de los ejercicios de este artículo, puedes consultar el{' '}
            <strong>cuadro de ejercicios relacionados</strong>: una tabla con todas las unidades del curso
            enlazadas a cada artículo del blog, para que practiques de forma interactiva lo que acabas de leer.
          </p>

          {topRelations.length > 0 ? (
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wide text-indigo-700 mb-2">
                Unidades recomendadas para «{articleTitle}»
              </p>
              <ul className="space-y-2">
                {topRelations.map((rel) => (
                  <li key={`${rel.courseId}-${rel.unitNumber}`}>
                    <Link
                      href={rel.unitUrl}
                      className="group flex flex-wrap items-center gap-2 text-sm text-slate-800 hover:text-indigo-700"
                    >
                      <span className="rounded-md bg-white px-2 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-100">
                        {rel.courseLabel} · U{rel.unitNumber}
                      </span>
                      <span className="group-hover:underline">{rel.unitTitle}</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-50" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
              {relations.length > 4 && (
                <p className="text-xs text-slate-500 mt-2">
                  +{relations.length - 4} unidades más en el cuadro completo
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-600 mb-4">
              Consulta el cuadro completo para ver qué unidades del curso encajan mejor con los temas de este artículo.
            </p>
          )}

          <Link
            href={mapUrl}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 transition-colors"
          >
            Ver cuadro de ejercicios relacionados
          </Link>
          <p className="text-xs text-slate-500 mt-3">
            Ruta: <code className="rounded bg-white px-1.5 py-0.5 border border-slate-200">{BLOG_EXERCISE_MAP_PATH}</code>
          </p>
        </div>
      </div>
    </section>
  );
}
