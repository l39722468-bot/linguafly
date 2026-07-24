import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { ensureAdmin } from '@/lib/admin/ensure-admin';
import {
  aggregateLessonProgressByUnit,
  mapA1ProgressRows,
  mergeUnitProgress,
  summarizeUnitProgress,
} from '@/lib/progress/aggregate';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const adminCheck = await ensureAdmin();
    if (!adminCheck.ok) {
      return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' }, { status: 500 });
    }

    let courseId = request.nextUrl.searchParams.get('courseId')?.toString() || 'ingles-a1';
    const requestedCourse = request.nextUrl.searchParams.get('courseId');

    const { data: rows, error } = await supabaseAdmin
      .from('user_lesson_progress')
      .select(
        'unit_id, exercises_completed, exercises_total, attempts, correct_count, accuracy_percent, last_activity_at, status'
      )
      .eq('user_id', userId)
      .eq('course_id', courseId);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }

    let finalRows = rows ?? [];
    let source: 'user_lesson_progress' | 'a1_progress' | 'merged' = 'user_lesson_progress';

    // Sin courseId explícito y sin filas: elegir el curso con más actividad
    if (!requestedCourse && finalRows.length === 0) {
      const { data: anyRows, error: anyErr } = await supabaseAdmin
        .from('user_lesson_progress')
        .select(
          'course_id, unit_id, exercises_completed, exercises_total, attempts, correct_count, accuracy_percent, last_activity_at, status'
        )
        .eq('user_id', userId);

      if (anyErr) {
        console.error('Database error (fallback):', anyErr);
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
      }

      const byCourseCount = new Map<string, number>();
      for (const r of anyRows ?? []) {
        const cid = String((r as { course_id?: string }).course_id ?? '');
        if (!cid) continue;
        byCourseCount.set(cid, (byCourseCount.get(cid) ?? 0) + 1);
      }

      const topCourse = Array.from(byCourseCount.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
      if (topCourse) {
        courseId = topCourse;
        finalRows = (anyRows ?? []).filter(
          (r: { course_id?: string }) => String(r.course_id) === courseId
        );
      }
    }

    let progress = aggregateLessonProgressByUnit(finalRows);

    // Fallback / merge con legado a1_progress (mismo alumno, curso A1)
    if (courseId === 'ingles-a1') {
      const { data: a1Rows, error: a1Err } = await supabaseAdmin
        .from('a1_progress')
        .select(
          'unit_id, exercises_completed, exercises_total, accuracy_percentage, status, last_activity'
        )
        .eq('user_id', userId);

      if (a1Err) {
        console.warn('[admin/progress] a1_progress fallback:', a1Err.message);
      } else if ((a1Rows ?? []).length > 0) {
        const legacy = mapA1ProgressRows(a1Rows ?? []);
        if (progress.length === 0) {
          progress = legacy;
          source = 'a1_progress';
        } else {
          progress = mergeUnitProgress(progress, legacy);
          source = 'merged';
        }
      }
    }

    const summary = summarizeUnitProgress(progress);

    // Cursos disponibles del alumno (para selector en UI)
    const { data: courseRows } = await supabaseAdmin
      .from('user_lesson_progress')
      .select('course_id')
      .eq('user_id', userId);

    const availableCourses = Array.from(
      new Set(
        (courseRows ?? [])
          .map((r: { course_id?: string }) => r.course_id)
          .filter((c): c is string => !!c)
      )
    ).sort();
    if (courseId === 'ingles-a1' && !availableCourses.includes('ingles-a1')) {
      availableCourses.unshift('ingles-a1');
    }

    return NextResponse.json({
      userId,
      courseId,
      source,
      availableCourses,
      progress,
      summary,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
