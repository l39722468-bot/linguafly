'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Exercise = {
  id: string;
  title: string;
  description: string | null;
  exerciseOrder: number;
  status: 'locked' | 'unlocked' | 'completed';
  bestScore: number;
  attempts: number;
};

type World = {
  id: string;
  title: string;
  description: string | null;
  worldOrder: number;
  status: 'locked' | 'unlocked' | 'completed';
  progressPercent: number;
  completedExercises: number;
  totalExercises: number;
  exercises: Exercise[];
};

type ApiResponse = {
  level: string;
  worlds: World[];
  nextExerciseId: string | null;
};

function statusBadge(status: 'locked' | 'unlocked' | 'completed') {
  if (status === 'completed') return 'bg-emerald-100 text-emerald-700';
  if (status === 'unlocked') return 'bg-amber-100 text-amber-700';
  return 'bg-slate-100 text-slate-600';
}

export default function WorldMapPanel() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadMap() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/worlds/my', { cache: 'no-store' });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || 'No se pudo cargar el mapa');
        if (mounted) setData(payload);
      } catch (err: any) {
        if (mounted) setError(err.message || 'No se pudo cargar el mapa');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadMap();
    return () => {
      mounted = false;
    };
  }, []);

  const nextExerciseLink = useMemo(() => {
    if (!data?.nextExerciseId) return null;
    return `/mi-panel/mundo/${encodeURIComponent(data.nextExerciseId)}`;
  }, [data?.nextExerciseId]);

  if (loading) {
    return (
      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <p className="text-sm text-slate-600">Cargando mapa de progreso...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <p className="text-sm text-red-700">{error}</p>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Mapa de mundos</p>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Ruta de nivel {data.level}</h2>
          <p className="text-sm text-slate-600 mt-1">
            Se desbloquea un ejercicio cada vez. Necesitas 100% para abrir el siguiente.
          </p>
        </div>
        {nextExerciseLink && (
          <Link
            href={nextExerciseLink}
            className="inline-flex px-4 py-2 rounded-lg bg-coral-600 text-white text-sm font-bold hover:bg-coral-700 transition"
          >
            Continuar ejercicio
          </Link>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {data.worlds.map((world) => (
          <article key={world.id} className="border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h3 className="font-black text-slate-900">
                  Mundo {world.worldOrder}: {world.title}
                </h3>
                <p className="text-sm text-slate-600">{world.description}</p>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${statusBadge(world.status)}`}>
                {world.status === 'completed'
                  ? 'Completado'
                  : world.status === 'unlocked'
                    ? 'Desbloqueado'
                    : 'Bloqueado'}
              </span>
            </div>

            <div className="mt-3 text-xs text-slate-600">
              Progreso: {world.completedExercises}/{world.totalExercises} ({Math.round(world.progressPercent)}%)
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {world.exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className={`rounded-lg border p-3 ${
                    exercise.status === 'completed'
                      ? 'border-emerald-200 bg-emerald-50'
                      : exercise.status === 'unlocked'
                        ? 'border-amber-200 bg-amber-50'
                        : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-slate-900">
                      {exercise.exerciseOrder}. {exercise.title}
                    </p>
                    <span className={`text-[11px] font-bold px-2 py-1 rounded ${statusBadge(exercise.status)}`}>
                      {exercise.status === 'completed'
                        ? 'OK'
                        : exercise.status === 'unlocked'
                          ? 'Activo'
                          : 'Lock'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{exercise.description}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Mejor puntuación: {exercise.bestScore}% · Intentos: {exercise.attempts}
                  </p>
                  {exercise.status !== 'locked' && (
                    <Link
                      href={`/mi-panel/mundo/${encodeURIComponent(exercise.id)}`}
                      className="inline-flex mt-2 text-xs font-bold text-coral-700 hover:text-coral-800"
                    >
                      Abrir ejercicio
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
