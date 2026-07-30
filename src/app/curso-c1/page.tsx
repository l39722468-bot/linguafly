import { Suspense } from 'react';
import { A1CourseSelector } from '@/components/course/preview/A1CourseSelector';
import { premiumCourseServerService } from '@/lib/services/premium-course-service.server';
import { getViewerHasFullCourseAccess } from '@/lib/access/viewer-course-access';
import { maybeRedirectSequentialSubscriber } from '@/lib/access/course-landing-redirect';
import { BookOpen, Clock, Award } from 'lucide-react';
import Link from 'next/link';
import { MiPanelLink } from '@/components/course/MiPanelLink';

export const dynamic = 'force-dynamic';

async function C1PreviewContent() {
  let courseMetadata;
  const hasFullAccess = await getViewerHasFullCourseAccess();
  try {
    courseMetadata = await premiumCourseServerService.getC1UnitsWithMetadata();
    await maybeRedirectSequentialSubscriber('/curso-c1', 'ingles-c1', courseMetadata.totalUnits);
  } catch (err) {
    console.error('[curso-c1] Error loading course metadata:', err);
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md text-center">
          <p className="text-lg font-semibold text-slate-800 mb-2">Error al cargar el curso</p>
          <p className="text-slate-600 mb-4">No se pudieron cargar los datos. Intenta recargar la página.</p>
          <a href="/curso-c1" className="text-indigo-600 font-bold hover:underline">Recargar</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full font-bold text-sm border border-indigo-100">
                <Award className="w-4 h-4" />
                <span>C1 Level · Advanced</span>
              </div>
              <MiPanelLink />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tight">
              Curso de Inglés C1
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              Curso completo de inglés C1 con {courseMetadata.totalUnits} unidades interactivas. Totalmente gratuito.
              Preparación para Cambridge C1 Advanced (CAE) y IELTS 7.0+.
            </p>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto mt-4 leading-relaxed">
              El curso está organizado en tres capas: bloques temáticos (unidades 1–58), cierre con
              consolidación gramatical y simulacro de examen (59–60), y el Language Lab (61–72) para
              sistemas lingüísticos avanzados. En la vista <span className="font-semibold text-slate-600">Por módulos</span>{' '}
              verás cada capítulo con su nombre real, no agrupaciones genéricas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-slate-900 mb-1">{courseMetadata.totalUnits}</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Unidades</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-slate-900 mb-1">
                {Math.round(courseMetadata.totalDuration / 60)}h
              </p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Duración</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-slate-900 mb-1">
                {courseMetadata.units.reduce((sum, unit) => sum + unit.exerciseCount, 0)}
              </p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Ejercicios</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link
          href="/curso-c1/test-final"
          className="mb-8 flex items-center gap-4 rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-4 transition-all hover:border-amber-300 hover:bg-amber-50"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-2xl">
            📋
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-slate-900">Test final C1</p>
            <p className="text-sm text-slate-600">30+ preguntas de gramática avanzada, vocabulario académico, lectura, escucha, expresión escrita y oral. Aprobado con ≥70%.</p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-amber-700">Hacer test →</span>
        </Link>

        <A1CourseSelector units={courseMetadata.units} courseId="ingles-c1" hasFullAccess={hasFullAccess} />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Cargando curso C1...</p>
      </div>
    </div>
  );
}

export default function C1PreviewPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <C1PreviewContent />
    </Suspense>
  );
}
