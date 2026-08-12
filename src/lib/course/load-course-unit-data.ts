export type CourseUnitPayload = {
  id?: number;
  title: string;
  exercises: unknown[];
};

/**
 * Carga unidad desde asset estático (public/course-data).
 * Evita meter el contenido del curso en el bundle del Worker.
 */
export async function loadCourseUnitData(
  courseFolder: string,
  unitNumber: string | number
): Promise<CourseUnitPayload> {
  const n = String(unitNumber);
  const url = `/course-data/${courseFolder}/unit-${n}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`No se pudo cargar ${url} (${res.status})`);
  }
  const data = (await res.json()) as CourseUnitPayload;
  if (!Array.isArray(data.exercises)) {
    throw new Error(`JSON inválido en ${url}`);
  }
  return data;
}

export async function loadCourseFinalTest(
  courseFolder: string
): Promise<CourseUnitPayload> {
  const url = `/course-data/${courseFolder}/test-final.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`No se pudo cargar ${url} (${res.status})`);
  }
  const data = (await res.json()) as CourseUnitPayload;
  if (!Array.isArray(data.exercises)) {
    throw new Error(`JSON inválido en ${url}`);
  }
  return data;
}
