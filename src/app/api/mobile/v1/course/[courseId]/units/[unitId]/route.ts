import { NextRequest } from 'next/server';
import { getMobileAuth, mobileError, mobileJson } from '@/lib/api/mobile-auth';
import { checkMobileUnitAccess } from '@/lib/api/mobile-course-access';
import { loadUnitExercisesForApi } from '@/lib/course/load-unit-for-api';
import { getMobileCourseMetadata } from '@/lib/mobile/course-metadata';
import { buildSixLessonLayout } from '@/lib/course/six-lesson-layout';
import { validateExerciseListForApi } from '@/lib/validation/course-exercise-api';
import type { MobileUnitPayload } from '@/lib/mobile/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; unitId: string }> }
) {
  const { courseId, unitId } = await params;
  const metadata = await getMobileCourseMetadata(courseId);
  if (!metadata) {
    return mobileError('Curso no encontrado', 404, 'course_not_found');
  }

  const loaded = await loadUnitExercisesForApi(courseId, unitId);
  if (!loaded) {
    return mobileError('Unidad no encontrada', 404, 'unit_not_found');
  }

  const { user, supabase } = await getMobileAuth(request);
  const access = await checkMobileUnitAccess({
    supabase,
    user,
    courseId,
    unitId: loaded.unitId,
    totalUnits: metadata.totalUnits,
  });

  if (!access.allowed) {
    const status =
      access.code === 'auth_required' ? 401 : access.code === 'sequential_locked' ? 403 : 402;
    return mobileError(access.message, status, access.code, {
      currentUnitNumber: access.currentUnitNumber,
    });
  }

  const level = courseId.replace('ingles-', '').toUpperCase();
  const { exercises: validated, validation } = validateExerciseListForApi(loaded.exercises, {
    level,
  });
  const ordered = buildSixLessonLayout(validated as never[]).orderedExercises;

  const payload: MobileUnitPayload = {
    courseId,
    unitId: loaded.unitId,
    unitNumber: loaded.unitNumber,
    title: loaded.title,
    exerciseCount: ordered.length,
    exercises: ordered,
    layout: 'six-lesson',
    validation: {
      ok: validation.ok,
      errorCount: validation.errors.length,
    },
  };

  return mobileJson(payload);
}
