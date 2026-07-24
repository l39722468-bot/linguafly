import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import {
  aggregateLessonProgressByUnit,
  mapA1ProgressRows,
  mergeUnitProgress,
  summarizeUnitProgress,
} from '@/lib/progress/aggregate';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const unitIdParam = request.nextUrl.searchParams.get('unitId');
    const reader = supabaseAdmin ?? supabase;

    const { data: lessonRows, error: lessonErr } = await reader
      .from('user_lesson_progress')
      .select(
        'unit_id, exercises_completed, exercises_total, attempts, correct_count, accuracy_percent, last_activity_at, status'
      )
      .eq('user_id', user.id)
      .eq('course_id', 'ingles-a1');

    if (lessonErr) {
      console.warn('[a1/progress] lesson progress:', lessonErr.message);
    }

    const { data: a1Rows, error: a1Err } = await reader
      .from('a1_progress')
      .select(
        'unit_id, exercises_completed, exercises_total, accuracy_percentage, status, last_activity'
      )
      .eq('user_id', user.id);

    if (a1Err) {
      console.warn('[a1/progress] a1_progress:', a1Err.message);
    }

    const unified = aggregateLessonProgressByUnit(lessonRows ?? []);
    const legacy = mapA1ProgressRows(a1Rows ?? []);
    const progress = mergeUnitProgress(unified, legacy);
    const summary = summarizeUnitProgress(progress);

    if (unitIdParam) {
      const unitId = parseInt(unitIdParam, 10);
      const row = progress.find((u) => u.unit_id === unitId);
      return NextResponse.json({
        progress: row || {
          unit_id: unitId,
          status: 'not_started',
          exercises_completed: 0,
          exercises_total: 0,
          accuracy_percentage: 0,
        },
      });
    }

    return NextResponse.json({
      progress,
      summary: {
        totalUnitsStarted: summary.totalUnitsStarted,
        totalUnitsCompleted: summary.totalUnitsCompleted,
        averageAccuracy: summary.averageAccuracy,
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
