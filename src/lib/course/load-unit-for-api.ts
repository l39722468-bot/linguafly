import { parseUnitNumber } from '@/lib/access/sequential-unit-access';

export type LoadedUnitPayload = {
  courseId: string;
  unitId: string;
  unitNumber: number | null;
  title: string;
  exercises: unknown[];
  isFinalTest: boolean;
};

const COURSE_FOLDER: Record<string, string> = {
  'ingles-a1': 'a1',
  'ingles-a2': 'a2',
  'ingles-b1': 'b1',
  'ingles-b2': 'b2',
  'ingles-c1': 'c1',
  'ingles-c2': 'c2',
};

/**
 * Carga unidad desde assets estáticos. Pensado para callers con `fetch` al origen.
 */
export async function loadUnitExercisesForApi(
  courseId: string,
  unitId: string,
  origin = ''
): Promise<LoadedUnitPayload | null> {
  const folder = COURSE_FOLDER[courseId];
  if (!folder) return null;

  const normalizedUnitId = unitId.trim().toLowerCase();
  const rel =
    normalizedUnitId === 'test-final'
      ? `${folder}/test-final.json`
      : (() => {
          const unitNumber = parseUnitNumber(normalizedUnitId);
          if (!unitNumber) return null;
          return `${folder}/unit-${unitNumber}.json`;
        })();

  if (!rel) return null;

  const base = origin || (typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_SITE_URL || '');
  const url = `${base}/course-data/${rel}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as { title?: string; exercises?: unknown[] };
    const exercises = Array.isArray(data.exercises) ? data.exercises : [];
    const unitNumber =
      normalizedUnitId === 'test-final' ? null : parseUnitNumber(normalizedUnitId);
    return {
      courseId,
      unitId: normalizedUnitId === 'test-final' ? 'test-final' : `unit-${unitNumber}`,
      unitNumber,
      title: data.title || (unitNumber ? `Unidad ${unitNumber}` : 'Test final'),
      exercises,
      isFinalTest: normalizedUnitId === 'test-final',
    };
  } catch {
    return null;
  }
}

export const SUPPORTED_MOBILE_COURSE_IDS = [
  'ingles-a1',
  'ingles-a2',
  'ingles-b1',
  'ingles-b2',
  'ingles-c1',
  'ingles-c2',
] as const;

export type SupportedMobileCourseId = (typeof SUPPORTED_MOBILE_COURSE_IDS)[number];

export function isSupportedMobileCourseId(courseId: string): courseId is SupportedMobileCourseId {
  return (SUPPORTED_MOBILE_COURSE_IDS as readonly string[]).includes(courseId);
}
