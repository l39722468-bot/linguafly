import { NextRequest } from 'next/server';
import { getMobileAuth, mobileError, mobileJson } from '@/lib/api/mobile-auth';
import {
  aggregateLessonProgressByUnit,
  mapA1ProgressRows,
  mergeUnitProgress,
} from '@/lib/progress/aggregate';
import type { MobileProgressResponse } from '@/lib/mobile/types';

export async function GET(request: NextRequest) {
  const { supabase, user } = await getMobileAuth(request);
  if (!user) {
    return mobileError('No autenticado', 401, 'auth_required');
  }

  const courseId = request.nextUrl.searchParams.get('courseId')?.trim();
  if (!courseId) {
    return mobileError('Falta courseId', 400, 'missing_course_id');
  }

  const { data, error } = await supabase
    .from('user_lesson_progress')
    .select(
      'unit_id, status, exercises_completed, exercises_total, attempts, correct_count, accuracy_percent, last_activity_at'
    )
    .eq('user_id', user.id)
    .eq('course_id', courseId);

  if (error) {
    console.error('[mobile/v1/progress] select error', error);
    return mobileError('No se pudo cargar el progreso', 500, 'progress_fetch_failed');
  }

  let progress = aggregateLessonProgressByUnit(data ?? []);

  if (courseId === 'ingles-a1') {
    const { data: a1Rows, error: a1Error } = await supabase
      .from('a1_progress')
      .select(
        'unit_id, exercises_completed, exercises_total, accuracy_percentage, status, last_activity'
      )
      .eq('user_id', user.id);

    if (!a1Error) {
      progress = mergeUnitProgress(progress, mapA1ProgressRows(a1Rows ?? []));
    }
  }

  const mapped = progress.map((row) => ({
    unit_id: row.unit_id,
    status: row.status as 'not_started' | 'in_progress' | 'completed',
    exercises_completed: row.exercises_completed,
    exercises_total: row.exercises_total,
    accuracy_percent: row.accuracy_percentage,
    last_activity_at: row.last_activity_at,
  }));

  const payload: MobileProgressResponse = {
    courseId,
    progress: mapped,
    summary: {
      totalUnitsStarted: mapped.filter(
        (p) => p.status === 'in_progress' || p.status === 'completed'
      ).length,
      totalUnitsCompleted: mapped.filter((p) => p.status === 'completed').length,
      overallAccuracy:
        mapped.length > 0
          ? mapped.reduce((sum, p) => sum + (p.accuracy_percent ?? 0), 0) / mapped.length
          : 0,
    },
  };

  return mobileJson(payload);
}
