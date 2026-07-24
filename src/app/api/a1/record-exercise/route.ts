import { getMobileAuth } from '@/lib/api/mobile-auth';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { defaultLessonKey } from '@/lib/progress/aggregate';

/** unitId: 1-60 unidades, 0 = Test final A1 */
interface ExerciseResult {
  unitId: number | string;
  exerciseId: string;
  exerciseType: string;
  isCorrect: boolean;
  timeSpentSeconds?: number;
  lessonKey?: string;
  expectedExercisesTotal?: number;
}

function normalizeUnitId(unitId: number | string): number {
  if (typeof unitId === 'string') {
    if (unitId === 'test-final') return 0;
    const n = parseInt(unitId, 10);
    return Number.isNaN(n) ? -1 : n;
  }
  return unitId;
}

export async function POST(request: NextRequest) {
  try {
    const { supabase, user } = await getMobileAuth(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: ExerciseResult = await request.json();

    if (!body.exerciseId || body.isCorrect === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const unitId = normalizeUnitId(body.unitId ?? -1);
    if (unitId < 0 || unitId > 60) {
      return NextResponse.json({ error: 'Invalid unit ID (use 1-60 or test-final)' }, { status: 400 });
    }

    // Insert exercise result (unit_id 0 = Test final A1) — legacy A1 table + trigger
    const { data, error } = await supabase
      .from('a1_exercise_results')
      .insert({
        user_id: user.id,
        unit_id: unitId,
        exercise_id: body.exerciseId,
        exercise_type: body.exerciseType,
        is_correct: body.isCorrect,
        time_spent_seconds: body.timeSpentSeconds || null,
      })
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to record exercise' }, { status: 500 });
    }

    // Unified academic progress (same source of truth as admin panel)
    const courseId = 'ingles-a1';
    const lessonKey =
      (body.lessonKey ?? '').toString().trim() || defaultLessonKey(unitId, body.exerciseType);
    const expectedExercisesTotal =
      body.expectedExercisesTotal !== undefined ? Number(body.expectedExercisesTotal) : undefined;

    // Prefer service role so RLS/schema quirks no silencen el sync con admin
    const writer = supabaseAdmin ?? supabase;
    let unifiedOk = false;
    let unifiedError: string | null = null;

    try {
      const { error: evErr } = await writer.from('user_exercise_events').insert({
        user_id: user.id,
        course_id: courseId,
        unit_id: unitId,
        lesson_key: lessonKey,
        exercise_id: body.exerciseId,
        exercise_type: body.exerciseType,
        is_correct: body.isCorrect,
        time_spent_seconds: body.timeSpentSeconds || null,
      });
      if (evErr) {
        console.warn('[a1/record-exercise] event insert:', evErr.message);
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
        console.warn('[a1/record-exercise] select progress:', selErr.message);
      }

      const attempts = (existing?.attempts ?? 0) + 1;
      const correctCount = (existing?.correct_count ?? 0) + (body.isCorrect ? 1 : 0);
      const timeSpentSeconds = (existing?.time_spent_seconds ?? 0) + (body.timeSpentSeconds || 0);
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

      const accuracy =
        attempts > 0 ? Math.round((correctCount / attempts) * 10000) / 100 : 0;

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
          time_spent_seconds: timeSpentSeconds,
          last_activity_at: new Date().toISOString(),
          started_at: existing?.started_at ?? new Date().toISOString(),
          ...(status === 'completed' ? { completed_at: new Date().toISOString() } : {}),
        },
        { onConflict: 'user_id,course_id,unit_id,lesson_key' }
      );

      if (upErr) {
        unifiedError = upErr.message;
        console.error('[a1/record-exercise] unified upsert failed:', upErr.message);
      } else {
        unifiedOk = true;
      }

      await writer
        .from('user_profiles')
        .update({
          last_seen_path: `/curso-a1/unit-${unitId}`,
          last_seen_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
    } catch (e) {
      unifiedError = e instanceof Error ? e.message : 'unknown';
      console.error('[a1/record-exercise] unified progress error', e);
    }

    return NextResponse.json({
      success: true,
      result: data?.[0],
      unifiedOk,
      ...(unifiedError ? { unifiedError } : {}),
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
