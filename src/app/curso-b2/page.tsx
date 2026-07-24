import { Suspense } from 'react';
import { A1CourseSelector } from '@/components/course/preview/A1CourseSelector';
import { UnifiedCourseProgressSidebar } from '@/components/course/UnifiedCourseProgressSidebar';
import { premiumCourseServerService } from '@/lib/services/premium-course-service.server';
import { getViewerHasFullCourseAccess } from '@/lib/access/viewer-course-access';
import { BookOpen, Clock, Award, FileText } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function B2PreviewContent() {
  let courseMetadata;
  const hasFullAccess = await getViewerHasFullCourseAccess();
  try {
    courseMetadata = await premiumCourseServerService.getB2UnitsWithMetadata();
  } catch (err) {
    console.error('[curso-b2] Error loading course metadata:', err);
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md text-center">
          <p className="text-lg font-semibold text-slate-800 mb-2">Error al cargar el curso</p>
          <p className="text-slate-600 mb-4">No se pudieron cargar los datos. Intenta recargar la página.</p>
          <Link href="/curso-b2" className="text-violet-600 font-bold hover:underline">Recargar</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-600 rounded-full font-bold text-sm border border-violet-100">
                <Award className="w-4 h-4" />
                <span>B2 Level • Upper-Intermediate</span>
              </div>
              <Link
                href="/curso-b2/outline"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full font-bold text-sm border border-slate-200 hover:bg-slate-200 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>View Course Outline</span>
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tight">
              English B2 Course
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              Start free with Unit 1. Unlock the remaining B2 units ({courseMetadata.totalUnits} total) with a subscription from €0.99/month.
            </p>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
              <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-slate-900 mb-1">
                {courseMetadata.totalUnits}
              </p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Total Units
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
              <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-slate-900 mb-1">
                {Math.round(courseMetadata.totalDuration / 60)}h
              </p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Total Duration
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
              <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-slate-900 mb-1">
                {courseMetadata.units.reduce((sum, unit) => sum + unit.exerciseCount, 0)}
              </p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Total Exercises
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Selector */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            {/* Test final B2 */}
            <Link
              href="/curso-b2/test-final"
              className="mb-8 flex items-center gap-4 rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-4 transition-all hover:border-amber-300 hover:bg-amber-50"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-2xl">
                📋
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-900">Test final B2</p>
                <p className="text-sm text-slate-600">30+ preguntas de gramática, vocabulario, phrasal verbs, lectura, escucha, expresión escrita y oral. Aprobado con ≥70%.</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-amber-700">Hacer test →</span>
            </Link>

            <A1CourseSelector units={courseMetadata.units} courseId="ingles-b2" hasFullAccess={hasFullAccess} />
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-6 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 pt-5 pb-4 border-b border-slate-100">
                <p className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-1">Tu avance</p>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Progreso del curso</h3>
              </div>
              <div className="p-5">
                <UnifiedCourseProgressSidebar units={courseMetadata.units} courseId="ingles-b2" coursePath="/curso-b2" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Loading free B2 course...</p>
      </div>
    </div>
  );
}

export default function B2PreviewPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <B2PreviewContent />
    </Suspense>
  );
}
