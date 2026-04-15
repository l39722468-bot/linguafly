type SupabaseLike = any;

export type WorldExerciseProgress = {
  id: string;
  title: string;
  description: string | null;
  exerciseOrder: number;
  status: 'locked' | 'unlocked' | 'completed';
  bestScore: number;
  attempts: number;
};

export type WorldProgress = {
  id: string;
  title: string;
  description: string | null;
  worldOrder: number;
  status: 'locked' | 'unlocked' | 'completed';
  progressPercent: number;
  completedExercises: number;
  totalExercises: number;
  exercises: WorldExerciseProgress[];
};

const VALID_LEVELS = new Set(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);

export function normalizeCefrLevel(level: string | null | undefined): string {
  const normalized = String(level || '').toUpperCase().trim();
  return VALID_LEVELS.has(normalized) ? normalized : 'A1';
}

async function ensureProgressInitialized(
  supabase: SupabaseLike,
  userId: string,
  level: string
): Promise<void> {
  const { data: worlds, error: worldsError } = await supabase
    .from('worlds')
    .select('id, world_order')
    .eq('level', level)
    .order('world_order', { ascending: true });

  if (worldsError) throw worldsError;
  if (!worlds || worlds.length === 0) return;

  for (const [index, world] of worlds.entries()) {
    const { data: countRows } = await supabase
      .from('world_exercises')
      .select('id', { count: 'exact', head: true })
      .eq('world_id', world.id);
    const totalExercises = countRows ?? 0;

    await supabase.from('user_world_progress').upsert(
      {
        user_id: userId,
        world_id: world.id,
        status: index === 0 ? 'unlocked' : 'locked',
        completed_exercises: 0,
        total_exercises: totalExercises,
        progress_percent: 0,
        unlocked_at: index === 0 ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,world_id' }
    );

    const { data: exercises, error: exercisesError } = await supabase
      .from('world_exercises')
      .select('id, exercise_order')
      .eq('world_id', world.id)
      .order('exercise_order', { ascending: true });

    if (exercisesError) throw exercisesError;

    for (const [exerciseIndex, ex] of (exercises ?? []).entries()) {
      await supabase.from('user_exercise_progress').upsert(
        {
          user_id: userId,
          exercise_id: ex.id,
          world_id: world.id,
          status: index === 0 && exerciseIndex === 0 ? 'unlocked' : 'locked',
          best_score: 0,
          attempts: 0,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,exercise_id' }
      );
    }
  }
}

export async function getWorldMapForUser(
  supabase: SupabaseLike,
  userId: string,
  level: string
): Promise<WorldProgress[]> {
  const normalizedLevel = normalizeCefrLevel(level);
  await ensureProgressInitialized(supabase, userId, normalizedLevel);

  const { data: worlds, error } = await supabase
    .from('worlds')
    .select(
      `
        id,
        title,
        description,
        world_order,
        user_world_progress!inner(status, progress_percent, completed_exercises, total_exercises),
        world_exercises(
          id,
          title,
          description,
          exercise_order,
          user_exercise_progress!inner(status, best_score, attempts)
        )
      `
    )
    .eq('level', normalizedLevel)
    .eq('user_world_progress.user_id', userId)
    .eq('world_exercises.user_exercise_progress.user_id', userId)
    .order('world_order', { ascending: true })
    .order('exercise_order', { ascending: true, referencedTable: 'world_exercises' });

  if (error) throw error;

  const mapped: WorldProgress[] = (worlds ?? []).map((world: any) => {
    const worldProgressRow = Array.isArray(world.user_world_progress)
      ? world.user_world_progress[0]
      : world.user_world_progress;
    const exercises = (world.world_exercises ?? []).map((ex: any) => {
      const exProgressRow = Array.isArray(ex.user_exercise_progress)
        ? ex.user_exercise_progress[0]
        : ex.user_exercise_progress;
      return {
        id: ex.id,
        title: ex.title,
        description: ex.description ?? null,
        exerciseOrder: ex.exercise_order,
        status: (exProgressRow?.status ?? 'locked') as 'locked' | 'unlocked' | 'completed',
        bestScore: Number(exProgressRow?.best_score ?? 0),
        attempts: Number(exProgressRow?.attempts ?? 0),
      };
    });

    return {
      id: world.id,
      title: world.title,
      description: world.description ?? null,
      worldOrder: world.world_order,
      status: (worldProgressRow?.status ?? 'locked') as 'locked' | 'unlocked' | 'completed',
      progressPercent: Number(worldProgressRow?.progress_percent ?? 0),
      completedExercises: Number(worldProgressRow?.completed_exercises ?? 0),
      totalExercises: Number(worldProgressRow?.total_exercises ?? exercises.length ?? 0),
      exercises,
    };
  });

  return mapped;
}

export async function completeWorldExercise(
  supabase: SupabaseLike,
  userId: string,
  exerciseId: string,
  score: number
): Promise<{ completed: boolean; unlockedNextExerciseId: string | null }> {
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));

  const { data: exerciseRow, error: exerciseError } = await supabase
    .from('world_exercises')
    .select('id, world_id, exercise_order')
    .eq('id', exerciseId)
    .single();
  if (exerciseError || !exerciseRow) {
    throw new Error('Ejercicio no encontrado');
  }

  const { data: progressRow, error: progressError } = await supabase
    .from('user_exercise_progress')
    .select('status, attempts, best_score')
    .eq('user_id', userId)
    .eq('exercise_id', exerciseId)
    .maybeSingle();

  if (progressError || !progressRow) {
    throw new Error('Progreso de ejercicio no inicializado');
  }

  if (progressRow.status === 'locked') {
    throw new Error('Este ejercicio esta bloqueado');
  }

  const alreadyCompleted = progressRow.status === 'completed';
  const completedNow = safeScore === 100;
  const nextStatus = alreadyCompleted || completedNow ? 'completed' : 'unlocked';
  const attempts = Number(progressRow.attempts ?? 0) + 1;
  const bestScore = Math.max(Number(progressRow.best_score ?? 0), safeScore);

  await supabase
    .from('user_exercise_progress')
    .update({
      status: nextStatus,
      attempts,
      best_score: bestScore,
      completed_at: nextStatus === 'completed' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .eq('exercise_id', exerciseId);

  let unlockedNextExerciseId: string | null = null;

  if (nextStatus === 'completed') {
    const { data: nextExercise } = await supabase
      .from('world_exercises')
      .select('id')
      .eq('world_id', exerciseRow.world_id)
      .eq('exercise_order', Number(exerciseRow.exercise_order) + 1)
      .maybeSingle();

    if (nextExercise?.id) {
      const { data: nextProgress } = await supabase
        .from('user_exercise_progress')
        .select('status')
        .eq('user_id', userId)
        .eq('exercise_id', nextExercise.id)
        .maybeSingle();

      if (nextProgress?.status === 'locked') {
        await supabase
          .from('user_exercise_progress')
          .update({
            status: 'unlocked',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId)
          .eq('exercise_id', nextExercise.id);
      }
      unlockedNextExerciseId = nextExercise.id;
    } else {
      await supabase
        .from('user_world_progress')
        .update({
          status: 'completed',
          progress_percent: 100,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .eq('world_id', exerciseRow.world_id);

      const { data: worldInfo } = await supabase
        .from('worlds')
        .select('level, world_order')
        .eq('id', exerciseRow.world_id)
        .single();
      if (worldInfo) {
        const { data: nextWorld } = await supabase
          .from('worlds')
          .select('id')
          .eq('level', worldInfo.level)
          .eq('world_order', Number(worldInfo.world_order) + 1)
          .maybeSingle();
        if (nextWorld?.id) {
          await supabase
            .from('user_world_progress')
            .update({
              status: 'unlocked',
              unlocked_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId)
            .eq('world_id', nextWorld.id)
            .eq('status', 'locked');

          const { data: nextWorldFirstEx } = await supabase
            .from('world_exercises')
            .select('id')
            .eq('world_id', nextWorld.id)
            .eq('exercise_order', 1)
            .maybeSingle();
          if (nextWorldFirstEx?.id) {
            await supabase
              .from('user_exercise_progress')
              .update({
                status: 'unlocked',
                updated_at: new Date().toISOString(),
              })
              .eq('user_id', userId)
              .eq('exercise_id', nextWorldFirstEx.id)
              .eq('status', 'locked');
            unlockedNextExerciseId = nextWorldFirstEx.id;
          }
        }
      }
    }
  }

  const { count: completedCount } = await supabase
    .from('user_exercise_progress')
    .select('exercise_id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('world_id', exerciseRow.world_id)
    .eq('status', 'completed');

  const { count: totalCount } = await supabase
    .from('user_exercise_progress')
    .select('exercise_id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('world_id', exerciseRow.world_id);

  const completed = completedCount ?? 0;
  const total = totalCount ?? 0;
  const percent = total > 0 ? (completed / total) * 100 : 0;

  await supabase
    .from('user_world_progress')
    .update({
      completed_exercises: completed,
      total_exercises: total,
      progress_percent: percent,
      status: completed >= total && total > 0 ? 'completed' : 'unlocked',
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .eq('world_id', exerciseRow.world_id);

  return {
    completed: nextStatus === 'completed',
    unlockedNextExerciseId,
  };
}
