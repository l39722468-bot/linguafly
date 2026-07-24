/**
 * GET /api/admin/export-progress
 * Exporta progreso de alumnos (fuente: user_lesson_progress + fallback a1_progress).
 */

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { ensureAdmin } from '@/lib/admin/ensure-admin';
import {
  aggregateLessonProgressByUnit,
  mapA1ProgressRows,
  mergeUnitProgress,
  type UnitProgressRow,
} from '@/lib/progress/aggregate';

const UNIT_LABELS: Record<number, string> = {
  0: 'Test final A1',
};
for (let i = 1; i <= 60; i++) UNIT_LABELS[i] = `Unidad ${i}`;

function unitLabel(unitId: number, courseId: string): string {
  if (courseId === 'ingles-a1') return UNIT_LABELS[unitId] ?? `Unidad ${unitId}`;
  return unitId === 0 ? `Test final (${courseId})` : `Unidad ${unitId}`;
}

export async function GET() {
  try {
    const adminCheck = await ensureAdmin();
    if (!adminCheck.ok) {
      return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Service role not configured; cannot export all progress' },
        { status: 503 }
      );
    }

    const { data: lessonRows, error: lessonError } = await supabaseAdmin
      .from('user_lesson_progress')
      .select(
        'user_id, course_id, unit_id, exercises_completed, exercises_total, attempts, correct_count, accuracy_percent, last_activity_at, status'
      )
      .order('user_id');

    if (lessonError) {
      console.error('Export progress error (lesson):', lessonError);
      return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }

    const { data: a1Rows, error: a1Error } = await supabaseAdmin
      .from('a1_progress')
      .select(
        'user_id, unit_id, exercises_completed, exercises_total, accuracy_percentage, status, last_activity'
      );

    if (a1Error) {
      console.warn('Export progress warning (a1):', a1Error.message);
    }

    const {
      data: { users },
    } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    const userMap = new Map(
      (users ?? []).map((u) => [
        u.id,
        {
          email: u.email ?? '',
          name: (
            u.user_metadata?.full_name ??
            u.user_metadata?.name ??
            u.email ??
            'Sin nombre'
          ).toString(),
        },
      ])
    );

    // También enriquecer con emails de user_profiles
    const { data: profiles } = await supabaseAdmin
      .from('user_profiles')
      .select('user_id, email, name')
      .or('role.is.null,role.neq.admin');

    for (const p of profiles ?? []) {
      if (!p.user_id) continue;
      if (!userMap.has(p.user_id)) {
        userMap.set(p.user_id, {
          email: p.email ?? '',
          name: p.name ?? p.email ?? 'Sin nombre',
        });
      }
    }

    type UserBucket = {
      email: string;
      name: string;
      byCourse: Map<string, UnitProgressRow[]>;
    };

    const byUser = new Map<string, UserBucket>();

    const ensureUser = (uid: string) => {
      if (!byUser.has(uid)) {
        const info = userMap.get(uid) ?? { email: uid.slice(0, 8), name: 'Unknown' };
        byUser.set(uid, { ...info, byCourse: new Map() });
      }
      return byUser.get(uid)!;
    };

    // Agrupar filas unificadas por user+course
    const lessonByUserCourse = new Map<string, typeof lessonRows>();
    for (const row of lessonRows ?? []) {
      const uid = row.user_id as string;
      const courseId = (row.course_id as string) || 'ingles-a1';
      const key = `${uid}::${courseId}`;
      if (!lessonByUserCourse.has(key)) lessonByUserCourse.set(key, []);
      lessonByUserCourse.get(key)!.push(row);
    }

    for (const [key, rows] of lessonByUserCourse.entries()) {
      const [uid, courseId] = key.split('::');
      const bucket = ensureUser(uid);
      bucket.byCourse.set(courseId, aggregateLessonProgressByUnit(rows ?? []));
    }

    // Merge legado A1
    const a1ByUser = new Map<string, typeof a1Rows>();
    for (const row of a1Rows ?? []) {
      const uid = row.user_id as string;
      if (!a1ByUser.has(uid)) a1ByUser.set(uid, []);
      a1ByUser.get(uid)!.push(row);
    }

    for (const [uid, rows] of a1ByUser.entries()) {
      const legacy = mapA1ProgressRows(rows ?? []);
      const bucket = ensureUser(uid);
      const existing = bucket.byCourse.get('ingles-a1') ?? [];
      bucket.byCourse.set('ingles-a1', mergeUnitProgress(existing, legacy));
    }

    const exportData = Array.from(byUser.entries()).map(([userId, { email, name, byCourse }]) => {
      // Preferir A1 para CSV legacy; si no hay, primer curso con datos
      const preferredCourse =
        byCourse.get('ingles-a1')?.length
          ? 'ingles-a1'
          : Array.from(byCourse.entries()).sort((a, b) => b[1].length - a[1].length)[0]?.[0] ||
            'ingles-a1';

      const progress = byCourse.get(preferredCourse) ?? [];

      return {
        userId,
        email,
        name,
        courseId: preferredCourse,
        progress: progress.map((p) => ({
          unit_id: p.unit_id,
          unit_label: unitLabel(p.unit_id, preferredCourse),
          exercises_completed: p.exercises_completed,
          exercises_total: p.exercises_total,
          accuracy_percentage: p.accuracy_percentage,
          status: p.status,
          last_activity: p.last_activity_at ?? null,
        })),
        summary: {
          unitsStarted: progress.filter(
            (p) =>
              (p.exercises_completed ?? 0) > 0 ||
              p.status === 'in_progress' ||
              p.status === 'completed'
          ).length,
          unitsCompleted: progress.filter((p) => p.status === 'completed').length,
          totalExercises: progress.reduce((s, p) => s + (p.exercises_completed ?? 0), 0),
          avgAccuracy:
            progress.length > 0
              ? (
                  progress.reduce((s, p) => s + (p.accuracy_percentage ?? 0), 0) / progress.length
                ).toFixed(1)
              : '0',
        },
      };
    });

    // Incluir alumnos sin progreso para el CSV completo
    for (const [uid, info] of userMap.entries()) {
      if (byUser.has(uid)) continue;
      if ((info.email || '').toLowerCase().includes('admin')) continue;
      exportData.push({
        userId: uid,
        email: info.email,
        name: info.name,
        courseId: 'ingles-a1',
        progress: [],
        summary: {
          unitsStarted: 0,
          unitsCompleted: 0,
          totalExercises: 0,
          avgAccuracy: '0',
        },
      });
    }

    exportData.sort((a, b) => (a.email || '').localeCompare(b.email || ''));

    return NextResponse.json({ export: exportData });
  } catch (error) {
    console.error('Export progress error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
