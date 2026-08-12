'use client';

import { loadCourseUnitData, loadCourseFinalTest } from '@/lib/course/load-course-unit-data';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, useRef, Suspense } from 'react';
import ExerciseRenderer from '@/components/ExerciseRenderer';
import StreakBurst from '@/components/gamification/StreakBurst';
import { useGamification } from '@/lib/hooks/use-gamification';
import { useA1ProgressTracking } from '@/hooks/useA1ProgressTracking';
import { X, Heart, Zap, Trophy, Flame, ArrowLeft, ArrowRight, Home, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

// Copy de alta calidad: tono profesional, claro y alentador
const FEEDBACK_CORRECT_HEADLINES = ['¡Correcto!', '¡Muy bien!', '¡Perfecto!', '¡Excelente!', '¡Lo tienes!'];
const FEEDBACK_INCORRECT_HEADLINES = ['Casi lo tienes', 'Otra oportunidad', 'Sigue intentando', 'Repasa y vuelve'];
const FEEDBACK_INCORRECT_SUBTEXTS = ['Cada intento te acerca más. Sigue practicando.', 'Repasa el contenido y vuelve a intentarlo.', 'La constancia es la clave del progreso.'];
import Link from 'next/link';
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
const STREAK_THRESHOLDS = [3, 5, 10];
const MAX_DOTS = 15;

type FeedbackState = 'idle' | 'correct' | 'incorrect';

// ── EXERCISE TYPE CONFIG ────────────────────────────────────────────────────
const EXERCISE_TYPES: Record<string, { label: string; emoji: string; gradient: string; text: string; light: string }> = {
  'multiple-choice':        { label: 'Opción múltiple',       emoji: '🔘', gradient: 'from-violet-500 to-purple-600',  text: 'text-violet-700',  light: 'bg-violet-50' },
  'fill-blank':             { label: 'Completa la frase',     emoji: '✏️', gradient: 'from-amber-400 to-orange-500',   text: 'text-amber-700',   light: 'bg-amber-50'  },
  'fill-in-the-blank':      { label: 'Completa la frase',     emoji: '✏️', gradient: 'from-amber-400 to-orange-500',   text: 'text-amber-700',   light: 'bg-amber-50'  },
  'sentence-building':      { label: 'Construye la frase',    emoji: '🔗', gradient: 'from-blue-500 to-indigo-600',    text: 'text-blue-700',    light: 'bg-blue-50'   },
  'reading':                { label: 'Comprensión lectora',   emoji: '📖', gradient: 'from-sky-400 to-cyan-500',       text: 'text-sky-700',     light: 'bg-sky-50'    },
  'reading-comprehension':  { label: 'Comprensión lectora',   emoji: '📖', gradient: 'from-sky-400 to-cyan-500',       text: 'text-sky-700',     light: 'bg-sky-50'    },
  'listening':              { label: 'Comprensión auditiva',  emoji: '🎧', gradient: 'from-teal-400 to-emerald-500',   text: 'text-teal-700',    light: 'bg-teal-50'   },
  'listening-comprehension':{ label: 'Comprensión auditiva',  emoji: '🎧', gradient: 'from-teal-400 to-emerald-500',   text: 'text-teal-700',    light: 'bg-teal-50'   },
  'pronunciation':          { label: 'Pronunciación',         emoji: '🗣️', gradient: 'from-rose-400 to-pink-500',      text: 'text-rose-700',    light: 'bg-rose-50'   },
  'true-false':             { label: 'Verdadero / Falso',     emoji: '⚖️', gradient: 'from-indigo-400 to-blue-500',    text: 'text-indigo-700',  light: 'bg-indigo-50' },
  'translation':            { label: 'Traducción',            emoji: '🌐', gradient: 'from-emerald-400 to-green-500',  text: 'text-emerald-700', light: 'bg-emerald-50'},
  'matching':               { label: 'Relaciona elementos',   emoji: '🔄', gradient: 'from-fuchsia-400 to-purple-500', text: 'text-fuchsia-700', light: 'bg-fuchsia-50'},
  'writing':                { label: 'Expresión escrita',     emoji: '✍️', gradient: 'from-emerald-400 to-teal-500',   text: 'text-emerald-700',  light: 'bg-emerald-50' },
  'default':                { label: 'Ejercicio',             emoji: '🎯', gradient: 'from-slate-400 to-slate-600',    text: 'text-slate-700',   light: 'bg-slate-50'  },
};

function getExerciseType(type: string) {
  return EXERCISE_TYPES[type] ?? EXERCISE_TYPES['default'];
}

// ── CONFETTI ───────────────────────────────────────────────────────────────
const CONFETTI_PIECES = Array.from({ length: 24 }, (_, i) => ({
  left: ((i * 37 + 11) % 100),
  top: ((i * 13 + 5) % 20 + 5),
  duration: 0.8 + (i * 17 % 12) / 10,
  delay: (i * 7 % 5) / 10,
  rotate: (i * 47) % 360,
}));

function Confetti() {
  const colors = ['bg-[#FF6B6B]', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400'];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {CONFETTI_PIECES.map((p, i) => (
        <div
          key={i}
          className={`absolute w-2 h-3 rounded-sm opacity-0 ${colors[i % colors.length]}`}
          style={{
            left: `${p.left}%`,
            top: `-${p.top}%`,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

// ── INCORRECT FLASH ────────────────────────────────────────────────────────
function IncorrectFlash({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 bg-red-500/10 animate-[heart-lost_0.4s_ease-out_forwards]"
      aria-hidden
    />
  );
}

// ── STREAK GLOW OVERLAY ────────────────────────────────────────────────────
function StreakGlow({ count }: { count: number }) {
  if (count < 3) return null;
  const intensity = count >= 10 ? 'from-yellow-500/10 via-orange-500/8' : count >= 5 ? 'from-orange-400/8 via-amber-500/6' : 'from-amber-400/6 via-orange-400/4';
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 bg-gradient-to-t ${intensity} to-transparent transition-opacity duration-700`}
      aria-hidden
    />
  );
}

function UnitPreviewContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const unitId = params.unitId as string;
  const { xp, completeExercise: saveXP, recordActivity } = useGamification();
  const { recordExercise } = useA1ProgressTracking();
  const { recordResult } = useSpacedRepetition('A1');

  const [exercises, setExercises] = useState<any[]>([]);
  const [lessonKeyCounts, setLessonKeyCounts] = useState<Record<string, number>>({});
  const [unitTitle, setUnitTitle] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startTime] = useState(Date.now());

  const [feedback, setFeedback] = useState<FeedbackState>('idle');
  const [slideDir, setSlideDir] = useState<'in' | 'out-left' | 'out-right'>('in');
  const [lives, setLives] = useState(3);
  const [sessionScore, setSessionScore] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [showXpPop, setShowXpPop] = useState(false);
  const [lostLifeAt, setLostLifeAt] = useState<number | null>(null);
  const [showIncorrectFlash, setShowIncorrectFlash] = useState(false);

  const [failCount, setFailCount] = useState(0);
  const [failedIndexes, setFailedIndexes] = useState<number[]>([]);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [streakBurstCount, setStreakBurstCount] = useState<number | null>(null);

  const [showUnitSummary, setShowUnitSummary] = useState(false);
  const [showLessonComplete, setShowLessonComplete] = useState(false);

  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number>(0);

  // Atajos de teclado: flecha izq/der para anterior/siguiente ejercicio
  useEffect(() => {
    if (exercises.length === 0 || showUnitSummary || showLessonComplete) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, [contenteditable="true"]')) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(exercises.length - 1, prev + 1));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [exercises.length, showUnitSummary, showLessonComplete]);

  const isFinalTest = unitId === 'test-final';
  const { totalUnits, coursePath } = useCourseMetadata('ingles-a1');

  useEffect(() => {
    if (!unitId) return;
    async function loadUnit() {
      try {
        if (isFinalTest) {
          const finalData = await loadCourseFinalTest('a1');
          const unitExercises = finalData.exercises ?? [];
          const title = finalData.title ?? 'Test final A1';
          setUnitTitle(title);
          if (!unitExercises.length) {
            setError('No se encontraron ejercicios');
          } else {
            const ordered = buildSixLessonLayout(unitExercises).orderedExercises;
            setExercises(ordered);
            const indexParam = searchParams.get('index');
            if (indexParam) {
              const idx = parseInt(indexParam);
              if (!isNaN(idx) && idx >= 0 && idx < ordered.length) setCurrentIndex(idx);
            }
          }
        } else {
          const unitNumber = unitId.replace('unit-', '');
          const unitData = await loadCourseUnitData('a1', unitNumber);
          const unitExercises = unitData.exercises;
          const title = unitData.title || '';
          setUnitTitle(title);
          if (!unitExercises || !Array.isArray(unitExercises)) {
            setError('No se encontraron ejercicios');
          } else {
            const ordered = buildSixLessonLayout(unitExercises).orderedExercises;
            setExercises(ordered);
            const indexParam = searchParams.get('index');
            if (indexParam) {
              const idx = parseInt(indexParam);
              if (!isNaN(idx) && idx >= 0 && idx < ordered.length) setCurrentIndex(idx);
            }
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadUnit();
    recordActivity();
    return () => { if (advanceTimer.current) clearTimeout(advanceTimer.current); };
  }, [unitId, searchParams, isFinalTest]);

  // Precompute how many exercises belong to each lessonKey inside this unit.
  // This allows the backend to know `exercises_total` and only mark `completed` when the block is finished.
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

  const sixLayout = useMemo(() => buildSixLessonLayout(exercises), [exercises]);
  const lessonNav = useMemo(() => {
    const idx = exercises.length ? Math.min(currentIndex, exercises.length - 1) : 0;
    return getSixLessonNavState(sixLayout, idx);
  }, [sixLayout, currentIndex, exercises.length]);

  const advanceExercise = (idx: number, total: number) => {
    setSlideDir('out-left');
    setTimeout(() => {
      const isLast = idx === total - 1;
      const isLessonEnd = !isFinalTest && shouldShowSixLessonCompleteInterstitial(sixLayout, idx, total);

      if (isLast) {
        setShowUnitSummary(true);
      } else if (isLessonEnd) {
        setShowLessonComplete(true);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
      setFeedback('idle');
      setSlideDir('in');
    }, 350);
  };

  const handleAIPracticeReady = (aiExercises: any[]) => {
    setExercises(buildSixLessonLayout(aiExercises).orderedExercises);
    setCurrentIndex(0);
    setFailedIndexes([]);
    setFailCount(0);
    setConsecutiveCorrect(0);
    setSessionScore(0);
    setLives(3);
    setFeedback('idle');
    setShowUnitSummary(false);
    setShowLessonComplete(false);
  };

  const handleExerciseComplete = (result?: { success: boolean; score: number }) => {
    const success = result?.success ?? true;
    const pts = result?.score ?? 100;

    const ex = exercises[currentIndex];
    if (ex) {
      const topic = ex.topicName || ex.topic || unitTitle || 'General';
      const exerciseId = ex.id ?? `a1-${unitId}-${currentIndex}`;
      recordResult(exerciseId, topic, success, pts);
    }

    // Registrar en BD para control de avances (unit_id 0 = Test final A1)
    const progressUnitId = isFinalTest ? 0 : parseInt(unitId.replace('unit-', ''), 10);
    if (!Number.isNaN(progressUnitId) && recordExercise && exercises[currentIndex]) {
      const ex = exercises[currentIndex];

      const slot = getSixLessonSlotAtGlobalIndex(sixLayout, currentIndex);
      const lessonSkill = SIX_LESSON_KEYS[slot];
      const lessonKey = `lesson-${slot + 1}-${lessonSkill}`;
      const expectedExercisesTotal = lessonKeyCounts[lessonKey] ?? 0;

      recordExercise({
        unitId: progressUnitId,
        lessonKey,
        expectedExercisesTotal,
        exerciseId: ex.id ?? `${unitId}-${currentIndex}`,
        exerciseType: (ex.type as string) ?? 'unknown',
        isCorrect: success,
      });
    }

    if (success) {
      const newConsecutive = consecutiveCorrect + 1;
      setConsecutiveCorrect(newConsecutive);
      setFailCount(0);
      setSessionScore(prev => prev + pts);

      const exerciseId = exercises[currentIndex]?.id ?? `${unitId}-${currentIndex}`;
      saveXP(exerciseId, 1, 1);
      setFeedback('correct');

      if (STREAK_THRESHOLDS.includes(newConsecutive)) {
        setStreakBurstCount(newConsecutive);
        return;
      }
      advanceTimer.current = setTimeout(() => advanceExercise(currentIndex, exercises.length), 1200);
    } else {
      setConsecutiveCorrect(0);
      setFailCount(prev => prev + 1);
      setFailedIndexes(prev => [...prev, currentIndex]);
      if (lives > 1) {
        const newLives = lives - 1;
        setLives(newLives);
        setLostLifeAt(newLives);
        setTimeout(() => setLostLifeAt(null), 600);
      }
      setFeedback('incorrect');
      setShowIncorrectFlash(true);
      setTimeout(() => setShowIncorrectFlash(false), 400);
      advanceTimer.current = setTimeout(() => advanceExercise(currentIndex, exercises.length), 1800);
    }
  };

  // ── LOADING ────────────────────────────────────────────────────────
  if (!unitId || loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-5">
        <div className="w-14 h-14 rounded-full border-4 border-[#FF6B6B] border-t-transparent animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-500">Preparando tu lección</p>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">Cargando actividades y contenido de la unidad…</p>
      </div>
    </div>
  );

  // ── ERROR ──────────────────────────────────────────────────────────
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">
        <p className="text-5xl mb-5" aria-hidden>😕</p>
        <p className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">No se pudo cargar</p>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">No hemos podido cargar esta lección</h2>
        <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed">Revisa tu conexión o inténtalo de nuevo en unos segundos.</p>
        <p className="text-xs text-slate-400 mb-8 font-mono truncate" title={error}>{error}</p>
        <Link href="/curso-a1" className="block w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm text-center shadow-lg hover:bg-slate-800 transition-colors">
          Volver al curso A1
        </Link>
      </div>
    </div>
  );

  if (exercises.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="text-center max-w-sm">
        <p className="text-sm font-semibold text-slate-600 mb-1">Esta unidad no tiene actividades todavía</p>
        <p className="text-xs text-slate-500 mb-6">Vuelve más tarde o elige otra unidad.</p>
        <Link href="/curso-a1" className="inline-block bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-colors">
          Ver todas las unidades
        </Link>
      </div>
    </div>
  );

  const unitNumber = unitId.replace('unit-', '');
  const lessonNumber = lessonNav.lessonNumber;
  const totalLessons = lessonNav.totalPedagogicalLessons;
  const exerciseInLesson = lessonNav.exerciseInLesson;
  const exercisesInThisLesson = lessonNav.exercisesInThisLesson;
  const progressPct = (exerciseInLesson - 1) / exercisesInThisLesson * 100;
  const displayXp = xp + sessionScore;
  const showDots = exercises.length <= MAX_DOTS;
  const isOnStreak = consecutiveCorrect >= 3;
  const currentExercise = exercises[currentIndex];
  const exerciseTypeCfg = currentExercise ? getExerciseType(currentExercise.type ?? 'default') : EXERCISE_TYPES['default'];

  // ── UNIT SUMMARY ───────────────────────────────────────────────────
  if (showUnitSummary) {
    const mins = Math.round((Date.now() - startTime) / 60000);
    const correctCount = exercises.length - failedIndexes.length;
    const accuracy = exercises.length > 0 ? Math.round((correctCount / exercises.length) * 100) : 0;
    const passed = isFinalTest ? accuracy >= 70 : true;

    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B] via-[#FF8E53] to-[#FFA06B]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_70%)]" />
        <Confetti />

        <div className="relative z-10 max-w-md w-full text-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className="relative inline-block">
            <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur border-4 border-white/40 flex items-center justify-center shadow-2xl mx-auto">
              <Trophy className="w-14 h-14 text-white drop-shadow-lg" />
            </div>
            {!isFinalTest && (
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full px-3 py-1 font-semibold text-sm shadow-lg">
                +{sessionScore} XP
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-bold tracking-wider text-white/70 uppercase mb-2">
              {unitTitle || `Unidad ${unitNumber}`}
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight drop-shadow mb-2">
              {isFinalTest ? 'Test final completado' : 'Unidad completada'}
            </h1>
            <p className="text-base font-medium text-white/85">
              {isFinalTest
                ? (passed ? 'Has superado el test A1. ¡Enhorabuena!' : 'No has alcanzado el 70%. Repasa y vuelve a intentarlo.')
                : 'Has terminado todas las actividades de esta unidad.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Actividades', value: exercises.length, emoji: '✅' },
              { label: 'Tiempo',      value: `${mins} min`,   emoji: '⏱️' },
              { label: 'Aciertos',    value: isFinalTest ? `${correctCount}/${exercises.length}` : `${accuracy}%`, emoji: '🎯' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/20 backdrop-blur rounded-2xl p-4 border border-white/20">
                <p className="font-display text-xl font-extrabold text-white leading-none mb-1">{stat.emoji} {stat.value}</p>
                <p className="text-xs font-bold text-white/60 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {isFinalTest && (
            <div className={`rounded-2xl p-4 border-2 ${passed ? 'bg-emerald-500/30 border-emerald-300' : 'bg-amber-500/30 border-amber-300'}`}>
              <p className="text-xs font-bold text-white/90 uppercase tracking-wider mb-1">Resultado</p>
              <p className="font-display text-2xl font-extrabold text-white">
                {accuracy}% — {passed ? 'Aprobado' : 'No aprobado'}
              </p>
              <p className="text-sm text-white/80 mt-1">Se requiere ≥70% para aprobar.</p>
            </div>
          )}

          {!isFinalTest && (
            <div className="bg-white/20 backdrop-blur rounded-2xl p-4 border border-white/20 flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" aria-hidden />
              <p className="text-xs font-bold text-white/80">Puntos de esta sesión</p>
              <span className="font-display text-xl font-extrabold text-white">{displayXp} XP</span>
            </div>
          )}

          <AIExercisePractice
            courseLevel="A1"
            mainTopic={unitTitle || 'General English'}
            onExercisesReady={handleAIPracticeReady}
          />

          {!isFinalTest && totalUnits ? (
            <UnitJourneyContinue
              coursePath={coursePath ?? '/curso-a1'}
              currentUnitId={unitId}
              totalUnits={totalUnits}
            />
          ) : (
            <a
              href="/curso-a1"
              className="block w-full bg-white/20 border border-white/30 text-white py-4 rounded-2xl font-bold text-base hover:-translate-y-0.5 transition-all text-center"
            >
              {isFinalTest ? 'Volver al curso' : 'Continuar al curso'}
            </a>
          )}
        </div>
      </div>
    );
  }

  // ── CHECKPOINT ─────────────────────────────────────────────────────
  if (showLessonComplete) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,107,0.2),transparent_70%)]" />

        <div className="relative z-10 max-w-sm w-full text-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/30">
            <Flame className="w-12 h-12 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">Bloque {lessonNumber} de {totalLessons}</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">Pausa de progreso</h2>
            <p className="text-sm font-medium text-slate-400 mt-2">Llevas un buen ritmo. Tómate un respiro y continúa cuando quieras.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-center gap-3">
            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" aria-hidden />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-500">Puntos de esta sesión</p>
              <p className="text-xl font-extrabold text-white">+{sessionScore} XP</p>
            </div>
          </div>
          <Link
            href="/curso-a1/practica-inteligente?mode=srs"
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-300/40 bg-blue-500/20 px-4 py-3 text-sm font-bold text-blue-100 hover:bg-blue-500/30 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Repaso personalizado (variantes)
          </Link>
          <button
            onClick={() => { setCurrentIndex(prev => prev + 1); setShowLessonComplete(false); setFeedback('idle'); }}
            className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white py-5 rounded-2xl font-bold text-base shadow-xl shadow-orange-500/30 hover:-translate-y-0.5 transition-all"
          >
            Continuar con las actividades
          </button>
        </div>
      </div>
    );
  }

  // ── EXERCISE PLAYER ────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50">
      {/* Streak glow behind everything */}
      <StreakGlow count={consecutiveCorrect} />

      {/* Incorrect screen flash */}
      <IncorrectFlash visible={showIncorrectFlash} />

      {/* ── HEADER ────────────────────────────────────────────────── */}
      <nav className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/curso-a1" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Home className="w-6 h-6 text-slate-600" />
          </Link>
          <h1 className="font-black text-xl text-slate-800 uppercase tracking-tight">
            A1: {isFinalTest ? unitTitle : `Unidad ${unitNumber}`}
            <span className="ml-4 text-slate-400 font-medium text-sm">
              {!isFinalTest && totalLessons > 1 ? `Lección ${lessonNumber} de ${totalLessons} • ` : ''}Ejercicio {exerciseInLesson} de {exercisesInThisLesson}
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="p-2 bg-slate-100 rounded-xl disabled:opacity-30 hover:bg-slate-200 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIndex(prev => Math.min(exercises.length - 1, prev + 1))}
            disabled={currentIndex === exercises.length - 1}
            className="p-2 bg-slate-100 rounded-xl disabled:opacity-30 hover:bg-slate-200 transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* ── MAIN EXERCISE (gestos: swipe izq/der en móvil) ─────────── */}
      <main
        className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 py-2 pb-52 touch-pan-y"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          const minSwipe = 60;
          if (dx > minSwipe && currentIndex > 0) setCurrentIndex((p) => p - 1);
          if (dx < -minSwipe && currentIndex < exercises.length - 1) setCurrentIndex((p) => p + 1);
        }}
      >
        <div className="mb-8 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${(exerciseInLesson / exercisesInThisLesson) * 100}%` }}
          />
        </div>
        <div
          key={currentIndex}
          className={`${
            slideDir === 'in'
              ? 'animate-in fade-in slide-in-from-right-8 duration-350'
              : 'animate-out fade-out slide-out-to-left-8 duration-350'
          }`}
        >
          <ExerciseRenderer
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={(result) => handleExerciseComplete(result)}
          />
        </div>
      </main>

      {/* ── FEEDBACK PANEL (mensajes variados, animación, cerrar) ───── */}
      {feedback !== 'idle' && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-250 ${
            feedback === 'correct'
              ? 'border-t-4 border-emerald-400 bg-gradient-to-t from-emerald-50 to-white'
              : 'border-t-4 border-red-400 bg-gradient-to-t from-red-50 to-white'
          } shadow-2xl`}
          role="status"
          aria-live="polite"
          aria-label={feedback === 'correct' ? 'Respuesta correcta' : 'Respuesta incorrecta'}
        >
          <div className="max-w-2xl mx-auto px-5 py-5 flex items-center gap-4">
            {/* Icon con animación sutil */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm animate-in zoom-in-95 duration-300 ${
                feedback === 'correct' ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            >
              {feedback === 'correct'
                ? <CheckCircle className="w-7 h-7 text-white" aria-hidden />
                : <XCircle className="w-7 h-7 text-white" aria-hidden />
              }
            </div>

            {/* Texto con mensajes variados */}
            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-base leading-tight mb-0.5 ${
                feedback === 'correct' ? 'text-emerald-700' : 'text-red-700'
              }`}>
                {feedback === 'correct'
                  ? consecutiveCorrect >= 10
                    ? '¡Racha imparable!'
                    : consecutiveCorrect >= 5
                    ? '¡Excelente racha!'
                    : consecutiveCorrect >= 3
                    ? '¡Vas muy bien!'
                    : FEEDBACK_CORRECT_HEADLINES[currentIndex % FEEDBACK_CORRECT_HEADLINES.length]
                  : FEEDBACK_INCORRECT_HEADLINES[currentIndex % FEEDBACK_INCORRECT_HEADLINES.length]}
              </p>
              <p className={`text-sm font-medium leading-snug ${
                feedback === 'correct' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {feedback === 'correct'
                  ? consecutiveCorrect >= 3
                    ? `${consecutiveCorrect} aciertos seguidos. Sigue así.`
                    : 'Buen trabajo. Continúa con la siguiente.'
                  : FEEDBACK_INCORRECT_SUBTEXTS[currentIndex % FEEDBACK_INCORRECT_SUBTEXTS.length]}
              </p>
            </div>

            {/* XP o vidas */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {feedback === 'correct' ? (
                <div className="bg-emerald-500 text-white rounded-2xl px-4 py-2 text-center shadow-md">
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-100">XP</p>
                  <p className="font-display text-xl font-extrabold leading-none">+{xpGained}</p>
                </div>
              ) : (
                <div className="flex gap-0.5" aria-label={`${lives} vidas restantes`}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Heart key={i} className={`w-5 h-5 ${i < lives ? 'fill-red-500 text-red-500' : 'fill-slate-200 text-slate-200'}`} />
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => setFeedback('idle')}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                aria-label="Cerrar mensaje"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── STREAK BURST ──────────────────────────────────────────── */}
      {streakBurstCount !== null && (
        <StreakBurst
          consecutiveCount={streakBurstCount}
          onComplete={() => {
            setStreakBurstCount(null);
            advanceTimer.current = setTimeout(() => advanceExercise(currentIndex, exercises.length), 200);
          }}
        />
      )}
    </div>
  );
}

export default function UnitPreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 rounded-full border-4 border-[#FF6B6B] border-t-transparent animate-spin" />
      </div>
    }>
      <UnitPreviewContent />
    </Suspense>
  );
}
