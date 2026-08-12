'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, Suspense } from 'react';
import ExerciseRenderer from '@/components/ExerciseRenderer';
import { ArrowLeft, ArrowRight, Home, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { trackUnitTimeSpent, trackExerciseCompletion, trackUnitCompletion } from '@/lib/analytics';
import AIExercisePractice from '@/components/course/AIExercisePractice';
import { UnitJourneyContinue } from '@/components/course/UnitJourneyContinue';
import { useCourseMetadata } from '@/hooks/useCourseMetadata';
import { useSpacedRepetition } from '@/hooks/use-spaced-repetition';
import {
  buildSixLessonLayout,
  getSixLessonNavState,
  getSixLessonSlotAtGlobalIndex,
  shouldShowSixLessonCompleteInterstitial,
  SIX_LESSON_KEYS,
} from '@/lib/course/six-lesson-layout';

function B2UnitContentInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const unitId = params.unitId as string;
  const { totalUnits, coursePath } = useCourseMetadata('ingles-b2');
  const [exercises, setExercises] = useState<any[]>([]);
  const [lessonKeyCounts, setLessonKeyCounts] = useState<Record<string, number>>({});
  const [unitTitle, setUnitTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLessonComplete, setShowLessonComplete] = useState(false);
  const [showUnitSummary, setShowUnitSummary] = useState(false);
  const [startTime] = useState(Date.now());
  const [failedIndexes, setFailedIndexes] = useState<number[]>([]);

  const { recordResult } = useSpacedRepetition('B2');

  const handleAIPracticeReady = (aiExercises: any[]) => {
    setExercises(buildSixLessonLayout(aiExercises).orderedExercises);
    setCurrentIndex(0);
    setFailedIndexes([]);
    setShowUnitSummary(false);
    setShowLessonComplete(false);
  };

  useEffect(() => {
    return () => {
      const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);
      if (timeSpentSeconds > 5) trackUnitTimeSpent(unitId, timeSpentSeconds);
    };
  }, [unitId, startTime]);

  useEffect(() => {
    if (showUnitSummary && exercises.length > 0) {
      const durationMinutes = Math.round((Date.now() - startTime) / 60000);
      trackUnitCompletion(unitId, exercises.length, durationMinutes);
    }
  }, [showUnitSummary]);

  // Precompute exercises_total per lessonKey (for unified progress completion).
  useEffect(() => {
    if (!exercises?.length) {
      setLessonKeyCounts({});
      return;
    }
    const layout = buildSixLessonLayout(exercises);
    const counts: Record<string, number> = {};
    for (let i = 0; i < exercises.length; i++) {
      const slot = getSixLessonSlotAtGlobalIndex(layout, i);
      const skill = SIX_LESSON_KEYS[slot];
      const key = `lesson-${slot + 1}-${skill}`;
      counts[key] = (counts[key] ?? 0) + 1;
    }
    setLessonKeyCounts(counts);
  }, [exercises]);

  useEffect(() => {
    async function loadUnit() {
      try {
        const unitNumber = unitId.replace('unit-', '');
        let unitModule;
        try {
          unitModule = await import(`@/lib/course/b2/unit-${unitNumber}`);
        } catch (e) {
          unitModule = await import(`../../../lib/course/b2/unit-${unitNumber}`);
        }
        const exportName = `UNIT_${unitNumber.toUpperCase().replace('-', '_')}_EXERCISES`;
        const unitExercises = unitModule[exportName] || unitModule[`UNIT_${unitNumber}_EXERCISES`] || unitModule.default || unitModule.UNIT_1_EXERCISES;
        if (!unitExercises || !Array.isArray(unitExercises)) {
          setError(`No se encontraron ejercicios en unit-${unitNumber}`);
          setExercises([]);
        } else {
          setUnitTitle(unitModule.UNIT_TITLE || unitModule.title || `Unidad ${unitNumber}`);
          // Add inferred model audio for B2 pronunciation exercises.
          // The TTS generator writes MP3s to: public/audio/b2-speaking/<exercise.id>.mp3
          const normalizedExercises = unitExercises.map((ex: any) => {
            if (ex?.type === 'pronunciation' && !ex?.audioUrl && ex?.id) {
              return {
                ...ex,
                audioUrl: `/audio/b2-speaking/${ex.id}.mp3`,
              };
            }
            return ex;
          });
          setExercises(buildSixLessonLayout(normalizedExercises).orderedExercises);
          const indexParam = searchParams.get('index');
          if (indexParam) {
            const idx = parseInt(indexParam);
            if (!isNaN(idx) && idx >= 0 && idx < unitExercises.length) setCurrentIndex(idx);
          }
        }
      } catch (err: any) {
        setError(`Error al cargar la unidad: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    loadUnit();
  }, [unitId, searchParams]);

  const sixLayout = useMemo(() => buildSixLessonLayout(exercises), [exercises]);
  const lessonNav = useMemo(
    () => getSixLessonNavState(sixLayout, Math.min(currentIndex, Math.max(0, exercises.length - 1))),
    [sixLayout, currentIndex, exercises.length]
  );
  const { lessonNumber, totalPedagogicalLessons, exerciseInLesson, exercisesInThisLesson, lessonLabelEs } =
    lessonNav;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Cargando Unidad {unitId}...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Home className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Error de Carga</h2>
        <p className="text-slate-600 mb-6">{error}</p>
        <Link href="/curso-b2" className="inline-block bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 transition-all">
          Volver al Curso B2
        </Link>
      </div>
    </div>
  );

  if (exercises.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <p className="text-red-500 font-bold text-xl mb-4">No se encontraron ejercicios</p>
        <Link href="/curso-b2" className="text-violet-600 underline">Volver al curso B2</Link>
      </div>
    </div>
  );

  const currentExercise = exercises[currentIndex];

  if (showUnitSummary) {
    const durationMinutes = Math.round((Date.now() - startTime) / 60000);
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-xl w-full bg-white rounded-[2rem] shadow-2xl p-12 text-center animate-in zoom-in duration-700">
          <div className="w-32 h-32 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <Sparkles className="w-16 h-16" />
            <div className="absolute -top-2 -right-2 bg-violet-500 text-white p-3 rounded-full shadow-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 italic tracking-tight">¡UNIDAD COMPLETADA!</h2>
          <p className="text-slate-500 mb-10 text-xl font-medium">
            Has finalizado todos los ejercicios de la Unidad {unitId.replace('unit-', '')}.
          </p>
          <div className="grid grid-cols-2 gap-6 mb-10 text-left">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <p className="text-slate-400 text-sm font-bold uppercase mb-1">Total Ejercicios</p>
              <p className="text-3xl font-black text-slate-800">{exercises.length}</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <p className="text-slate-400 text-sm font-bold uppercase mb-1">Tiempo Total</p>
              <p className="text-3xl font-black text-slate-800">{durationMinutes} min</p>
            </div>
          </div>
          <AIExercisePractice
            courseLevel="B2"
            mainTopic={unitTitle || 'General English'}
            onExercisesReady={handleAIPracticeReady}
          />

          {totalUnits ? (
            <UnitJourneyContinue
              coursePath={coursePath ?? '/curso-b2'}
              currentUnitId={unitId}
              totalUnits={totalUnits}
            />
          ) : (
            <a href="/curso-b2" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-95">
              Volver al listado de unidades
            </a>
          )}
        </div>
      </div>
    );
  }

  if (showLessonComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2 italic flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            ¡Lección {lessonNumber} completada!
            <Sparkles className="w-6 h-6 text-amber-400" />
          </h2>
          <p className="text-violet-600 font-bold text-lg mb-2">{lessonLabelEs}</p>
          <p className="text-slate-600 mb-8 text-lg">
            Has completado {exercisesInThisLesson} ejercicios con éxito. ¡Sigue así!
          </p>
          <button
            onClick={() => { setCurrentIndex(prev => prev + 1); setShowLessonComplete(false); }}
            className="w-full bg-violet-500 text-white py-5 rounded-2xl font-black text-xl hover:bg-violet-600 transition-all shadow-xl flex items-center justify-center gap-3"
          >
            Continuar a la siguiente lección
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/curso-b2" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Home className="w-6 h-6 text-slate-600" />
          </Link>
          <h1 className="font-black text-xl text-slate-800 uppercase tracking-tight">
            B2: {unitTitle}
            <span className="ml-4 text-slate-400 font-medium text-sm">
              Lección {lessonNumber} de {totalPedagogicalLessons} · {lessonLabelEs} • Ejercicio {exerciseInLesson}{' '}
              de {exercisesInThisLesson}
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))} disabled={currentIndex === 0} className="p-2 bg-slate-100 rounded-xl disabled:opacity-30 hover:bg-slate-200 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setCurrentIndex(prev => Math.min(exercises.length - 1, prev + 1))} disabled={currentIndex === exercises.length - 1} className="p-2 bg-slate-100 rounded-xl disabled:opacity-30 hover:bg-slate-200 transition-all">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto p-4 py-8">
        <div className="mb-8 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-violet-500 transition-all duration-500 ease-out" style={{ width: `${((exerciseInLesson) / exercisesInThisLesson) * 100}%` }} />
        </div>
        <ExerciseRenderer
          key={currentExercise.id}
          exercise={currentExercise}
          onComplete={(result?: { success: boolean; score: number }) => {
            trackExerciseCompletion(unitId, currentIndex, exercises.length);
            const ex = exercises[currentIndex];
            if (ex) {
              const topic = ex.topicName || ex.topic || unitTitle || 'General';
              recordResult(ex.id ?? `b2-${unitId}-${currentIndex}`, topic, result?.success ?? true, result?.score ?? 100);

              // Unified academic progress (best-effort).
              try {
                const progressUnitId = parseInt(unitId.replace('unit-', ''), 10);
                const slot = getSixLessonSlotAtGlobalIndex(sixLayout, currentIndex);
                const lessonSkill = SIX_LESSON_KEYS[slot];
                const lessonKey = `lesson-${slot + 1}-${lessonSkill}`;
                const expectedExercisesTotal = lessonKeyCounts[lessonKey] ?? 0;

                fetch('/api/progress/record', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    courseId: 'ingles-b2',
                    unitId: progressUnitId,
                    lessonKey,
                    exerciseId: ex.id ?? `b2-${unitId}-${currentIndex}`,
                    exerciseType: (ex?.type as string) ?? 'unknown',
                    isCorrect: result?.success ?? true,
                    expectedExercisesTotal,
                  }),
                }).catch(() => {});
              } catch {}
            }
            if (currentIndex === exercises.length - 1) {
              setShowUnitSummary(true);
            } else if (shouldShowSixLessonCompleteInterstitial(sixLayout, currentIndex, exercises.length)) {
              setShowLessonComplete(true);
            } else {
              setCurrentIndex(prev => prev + 1);
            }
          }}
        />
      </main>
    </div>
  );
}

export default function B2UnitContent() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Cargando...</div>}>
      <B2UnitContentInner />
    </Suspense>
  );
}
