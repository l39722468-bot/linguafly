import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Navigation } from '@/components/sections/Navigation';
import ExerciseRunnerClient from './ExerciseRunnerClient';

export default async function WorldExercisePage({
  params,
}: {
  params: Promise<{ exerciseId: string }>;
}) {
  const { exerciseId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/cuenta/login?next=/mi-panel/mundo/${encodeURIComponent(exerciseId)}`);
  }

  const { data: row } = await supabase
    .from('world_exercises')
    .select(
      `
      id,
      title,
      description,
      user_exercise_progress!inner(status)
    `
    )
    .eq('id', exerciseId)
    .eq('user_exercise_progress.user_id', user.id)
    .maybeSingle();

  const progressRow = Array.isArray(row?.user_exercise_progress)
    ? row?.user_exercise_progress[0]
    : row?.user_exercise_progress;

  if (!row || progressRow?.status === 'locked') {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-slate-50 py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h1 className="text-xl font-black text-amber-900">Ejercicio bloqueado</h1>
              <p className="text-sm text-amber-800 mt-2">
                Debes completar los ejercicios anteriores con 100% para desbloquear este paso.
              </p>
              <Link
                href="/mi-panel"
                className="inline-flex mt-4 px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-bold hover:bg-amber-700 transition"
              >
                Volver al panel
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/mi-panel"
            className="inline-flex text-sm font-semibold text-coral-700 hover:text-coral-800"
          >
            ← Volver al mapa
          </Link>
          <ExerciseRunnerClient
            exerciseId={row.id}
            title={row.title}
            description={row.description || 'Completa el ejercicio con la puntuación objetivo.'}
          />
        </div>
      </main>
    </>
  );
}
