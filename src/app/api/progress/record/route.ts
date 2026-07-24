import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { completeWorldExercise } from '@/lib/world-progress';

type ProgressRecordBody = {
  courseId: string;
  unitId: number;
  lessonKey: string;
  exerciseId: string;
  exerciseType: string;
  isCorrect: boolean;
  expectedExercisesTotal?: number;
  timeSpentSeconds?: number;
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = (await request.json().catch(() => ({}))) as Partial<ProgressRecordBody>;
    const courseId = (body.courseId ?? '').toString();
    const unitId = Number(body.unitId);
    const lessonKey = (body.lessonKey ?? '').toString();
    const exerciseId = (body.exerciseId ?? '').toString();
    const exerciseType = (body.exerciseType ?? '').toString();
    const isCorrect = !!body.isCorrect;
    const expectedExercisesTotal =
      body.expectedExercisesTotal !== undefined ? Number(body.expectedExercisesTotal) : undefined;
    const timeSpentSeconds = body.timeSpentSeconds ? Number(body.timeSpentSeconds) : 0;

    if (!courseId || !Number.isFinite(unitId) || !lessonKey || !exerciseId || !exerciseType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const writer = supabaseAdmin ?? supabase;

    const { data: mappedWorldExercise } = await supabase
      .from('world_exercises')
      .select('id')
      .eq('id', exerciseId)
      .maybeSingle();

    if (mappedWorldExercise) {
      const { data: unlockState } = await supabase
        .from('user_exercise_progress')
        .select('status')
        .eq('user_id', user.id)
        .eq('exercise_id', exerciseId)
        .maybeSingle();
      if (unlockState?.status === 'locked') {
        return NextResponse.json({ error: 'Ejercicio bloqueado' }, { status: 403 });
      }
      await completeWorldExercise(supabase, user.id, exerciseId, isCorrect ? 100 : 0);
    }

    const { error: evErr } = await writer.from('user_exercise_events').insert({
      user_id: user.id,
      course_id: courseId,
      unit_id: unitId,
      lesson_key: lessonKey,
      exercise_id: exerciseId,
      exercise_type: exerciseType,
      is_correct: isCorrect,
      time_spent_seconds: timeSpentSeconds || null,
    });

    if (evErr) {
      console.error('[progress/record] event insert error', evErr);
      return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
    }

    const { data: existing, error: selErr } = await writer
      .from('user_lesson_progress')
      .select(
        'attempts, correct_count, time_spent_seconds, exercises_completed, exercises_total, status, started_at'
      )
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .eq('unit_id', unitId)
      .eq('lesson_key', lessonKey)
      .maybeSingle();

    if (selErr) {
      console.warn('[progress/record] aggregate select error', selErr);
    }

    const attempts = (existing?.attempts ?? 0) + 1;
    const correctCount = (existing?.correct_count ?? 0) + (isCorrect ? 1 : 0);
    const timeSpent = (existing?.time_spent_seconds ?? 0) + (timeSpentSeconds || 0);
    const accuracy = attempts > 0 ? Math.round((correctCount / attempts) * 10000) / 100 : 0;

    const exercisesCompleted = (existing?.exercises_completed ?? 0) + 1;
    const exercisesTotal =
      expectedExercisesTotal !== undefined &&
      Number.isFinite(expectedExercisesTotal) &&
      expectedExercisesTotal > 0
        ? Math.floor(expectedExercisesTotal)
        : (existing?.exercises_total ?? 0);

    const status =
      exercisesTotal > 0 && exercisesCompleted >= exercisesTotal
        ? 'completed'
        : (existing?.status ?? 'in_progress');

    const { error: upErr } = await writer.from('user_lesson_progress').upsert(
      {
        user_id: user.id,
        course_id: courseId,
        unit_id: unitId,
        lesson_key: lessonKey,
        status,
        exercises_completed: exercisesCompleted,
        exercises_total: exercisesTotal,
        attempts,
        correct_count: correctCount,
        accuracy_percent: accuracy,
        time_spent_seconds: timeSpent,
        last_activity_at: new Date().toISOString(),
        started_at: existing?.started_at ?? new Date().toISOString(),
        ...(status === 'completed' ? { completed_at: new Date().toISOString() } : {}),
      },
      { onConflict: 'user_id,course_id,unit_id,lesson_key' }
    );

    if (upErr) {
      console.error('[progress/record] aggregate upsert error', upErr);
      return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
    }

    try {
      await writer
        .from('user_profiles')
        .update({
          last_seen_path: `/curso/${courseId}/unit-${unitId}`,
          last_seen_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
    } catch {
      /* best-effort */
    }

    return NextResponse.json({ ok: true, attempts, correctCount, accuracy });
  } catch (e) {
    console.error('[progress/record] error', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
