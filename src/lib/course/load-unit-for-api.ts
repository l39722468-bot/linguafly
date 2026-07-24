import { parseUnitNumber } from '@/lib/access/sequential-unit-access';

export type LoadedUnitPayload = {
  courseId: string;
  unitId: string;
  unitNumber: number | null;
  title: string;
  exercises: unknown[];
  isFinalTest: boolean;
};

type CourseIndex = {
  units: Array<{ id: number; title: string; exercises: unknown[] }>;
};

const COURSE_INDEX_LOADERS: Record<string, () => Promise<CourseIndex>> = {
  'ingles-a2': async () => {
    const mod = await import('@/lib/course/a2');
    return mod.A2_COURSE_CONTENT;
  },
  'ingles-b1': async () => {
    const mod = await import('@/lib/course/b1');
    return mod.B1_COURSE;
  },
  'ingles-b2': async () => {
    const mod = await import('@/lib/course/b2');
    return mod.B2_COURSE;
  },
  'ingles-c1': async () => {
    const mod = await import('@/lib/course/c1');
    return mod.C1_COURSE;
  },
  'ingles-c2': async () => {
    const mod = await import('@/lib/course/c2');
    return mod.C2_COURSE;
  },
};

const FINAL_TEST_LOADERS: Record<string, () => Promise<{ exercises: unknown[]; title: string }>> = {
  'ingles-a1': async () => {
    const mod = await import('@/lib/course/a1/final-test-a1');
    return {
      exercises: mod.FINAL_TEST_A1_EXERCISES ?? [],
      title: mod.FINAL_TEST_A1_TITLE ?? 'Test final A1',
    };
  },
  'ingles-a2': async () => {
    const mod = await import('@/lib/course/a2/final-test-a2');
    return {
      exercises: mod.FINAL_TEST_A2_EXERCISES ?? [],
      title: mod.FINAL_TEST_A2_TITLE ?? 'Test final A2',
    };
  },
  'ingles-b1': async () => {
    const mod = await import('@/lib/course/b1/final-test-b1');
    return {
      exercises: mod.FINAL_TEST_B1_EXERCISES ?? [],
      title: mod.FINAL_TEST_B1_TITLE ?? 'Test final B1',
    };
  },
  'ingles-b2': async () => {
    const mod = await import('@/lib/course/b2/final-test-b2');
    return {
      exercises: mod.FINAL_TEST_B2_EXERCISES ?? [],
      title: mod.FINAL_TEST_B2_TITLE ?? 'Test final B2',
    };
  },
};

const UNIT_FILE_LEVELS: Record<string, string> = {
  'ingles-a1': 'a1',
  'ingles-a2': 'a2',
  'ingles-b1': 'b1',
};

async function loadFromUnitFiles(courseId: string, unitNumber: number) {
  const level = UNIT_FILE_LEVELS[courseId];
  if (!level) return null;

  try {
    const unitModule = await import(`@/lib/course/${level}/unit-${unitNumber}`);
    const exportName = `UNIT_${unitNumber}_EXERCISES`;
    const exercises =
      unitModule[exportName] ||
      unitModule[`UNIT_${unitNumber}_EXERCISES`] ||
      unitModule.default ||
      [];
    const title = unitModule.UNIT_TITLE || unitModule.title || `Unidad ${unitNumber}`;
    return {
      title: String(title),
      exercises: Array.isArray(exercises) ? exercises : [],
    };
  } catch {
    return null;
  }
}

async function loadFromCourseIndex(courseId: string, unitNumber: number) {
  const loader = COURSE_INDEX_LOADERS[courseId];
  if (!loader) return null;
  const course = await loader();
  const unit = course.units.find((u) => u.id === unitNumber);
  if (!unit) return null;
  return {
    title: unit.title,
    exercises: Array.isArray(unit.exercises) ? unit.exercises : [],
  };
}

export async function loadUnitExercisesForApi(
  courseId: string,
  unitId: string
): Promise<LoadedUnitPayload | null> {
  const normalizedUnitId = unitId.trim().toLowerCase();

  if (normalizedUnitId === 'test-final') {
    const loader = FINAL_TEST_LOADERS[courseId];
    if (!loader) return null;
    const { exercises, title } = await loader();
    return {
      courseId,
      unitId: 'test-final',
      unitNumber: null,
      title,
      exercises,
      isFinalTest: true,
    };
  }

  const unitNumber = parseUnitNumber(normalizedUnitId);
  if (!unitNumber) return null;

  const fromFiles = await loadFromUnitFiles(courseId, unitNumber);
  const payload = fromFiles ?? (await loadFromCourseIndex(courseId, unitNumber));
  if (!payload) return null;

  return {
    courseId,
    unitId: `unit-${unitNumber}`,
    unitNumber,
    title: payload.title,
    exercises: payload.exercises,
    isFinalTest: false,
  };
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
