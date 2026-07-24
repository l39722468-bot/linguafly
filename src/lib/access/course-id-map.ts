const COURSE_PATH_TO_ID: Record<string, string> = {
  "/curso-a1": "ingles-a1",
  "/curso-a2": "ingles-a2",
  "/curso-b1": "ingles-b1",
  "/curso-b2": "ingles-b2",
  "/curso-c1": "ingles-c1",
  "/curso-c2": "ingles-c2",
};

const COURSE_ID_TO_PATH: Record<string, string> = Object.fromEntries(
  Object.entries(COURSE_PATH_TO_ID).map(([path, id]) => [id, path])
);

export function coursePathToId(coursePath: string): string | null {
  return COURSE_PATH_TO_ID[coursePath] ?? null;
}

export function courseIdToPath(courseId: string): string | null {
  return COURSE_ID_TO_PATH[courseId] ?? null;
}
