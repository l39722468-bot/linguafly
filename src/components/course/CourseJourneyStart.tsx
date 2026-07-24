import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Play, Trophy, Zap } from 'lucide-react';
import type { ViewerCourseSequentialState } from '@/lib/access/get-viewer-course-sequential-state';

type CourseJourneyStartProps = {
  coursePath: string;
  courseLevel: string;
  state: ViewerCourseSequentialState;
  currentUnitTitle?: string;
};

/**
 * Pantalla de inicio para suscriptores: sin listado de unidades,
 * solo la unidad activa y progreso global.
 */
export function CourseJourneyStart({
  coursePath,
  courseLevel,
  state,
  currentUnitTitle,
}: CourseJourneyStartProps) {
  const unitHref = `${coursePath}/unit-${state.currentUnitNumber}`;
  const progressPct =
    state.totalUnits > 0
      ? Math.round((state.completedUnits / state.totalUnits) * 100)
      : 0;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl">
        <div className="bg-gradient-to-br from-[#FF6B6B] via-[#FF8E53] to-[#FFA06B] px-8 py-10 text-white">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/80">
            Tu recorrido · {courseLevel}
          </p>
          <h2 className="mb-3 text-3xl font-black tracking-tight">
            {state.completedUnits === 0
              ? 'Empieza tu camino'
              : 'Continúa donde lo dejaste'}
          </h2>
          <p className="text-base font-medium text-white/90">
            {currentUnitTitle
              ? `Unidad ${state.currentUnitNumber}: ${currentUnitTitle}`
              : `Unidad ${state.currentUnitNumber}`}
          </p>
        </div>

        <div className="space-y-6 p-8">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Trophy className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">
                {state.completedUnits} de {state.totalUnits} unidades completadas
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#ff9a3c] transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
            <Zap className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
            <p>
              Avanzas unidad a unidad. Al completar cada bloque de ejercicios se desbloquea la
              siguiente lección automáticamente.
            </p>
          </div>

          <Link
            href={unitHref}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 py-5 text-lg font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800"
          >
            <Play className="h-5 w-5" fill="currentColor" />
            {state.completedUnits === 0 ? 'Empezar ahora' : 'Continuar aprendiendo'}
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Redirige suscriptores directamente a su unidad activa (experiencia continua). */
export function redirectPaidSubscriberToCurrentUnit(
  coursePath: string,
  state: ViewerCourseSequentialState
) {
  if (!state.sequentialMode) return;
  redirect(`${coursePath}/unit-${state.currentUnitNumber}`);
}
