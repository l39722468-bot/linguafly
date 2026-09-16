/**
 * Catálogo de cursos en los que un alumno puede matricularse.
 * IDs estables: el workflow n8n y D1 los usan como clave de idempotencia.
 */

export type CourseLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type EnrollableCourse = {
  id: string;
  name: string;
  level: CourseLevel;
  href: string;
  blogHref: string;
  group: "cefr" | "sector";
};

export const ENROLLABLE_COURSES: readonly EnrollableCourse[] = [
  {
    id: "ingles-a1",
    name: "Inglés A1 (principiante)",
    level: "A1",
    href: "/curso-a1",
    blogHref: "/blog/curso-a1",
    group: "cefr",
  },
  {
    id: "ingles-a2",
    name: "Inglés A2 (básico)",
    level: "A2",
    href: "/curso-a2",
    blogHref: "/blog/curso-a2",
    group: "cefr",
  },
  {
    id: "ingles-b1",
    name: "Inglés B1 (intermedio)",
    level: "B1",
    href: "/curso-b1",
    blogHref: "/blog/curso-b1",
    group: "cefr",
  },
  {
    id: "ingles-b2",
    name: "Inglés B2 (intermedio alto)",
    level: "B2",
    href: "/curso-b2",
    blogHref: "/blog/curso-b2",
    group: "cefr",
  },
  {
    id: "ingles-c1",
    name: "Inglés C1 (avanzado)",
    level: "C1",
    href: "/curso-c1",
    blogHref: "/blog/curso-c1",
    group: "cefr",
  },
  {
    id: "ingles-c2",
    name: "Inglés C2 (maestría)",
    level: "C2",
    href: "/curso-c2",
    blogHref: "/blog/examenes",
    group: "cefr",
  },
  {
    id: "camarero-a1",
    name: "Inglés para camareros A1",
    level: "A1",
    href: "/curso-camarero-a1",
    blogHref: "/blog/trabajo",
    group: "sector",
  },
  {
    id: "camarero-a2",
    name: "Inglés para camareros A2",
    level: "A2",
    href: "/curso-camarero-a2",
    blogHref: "/blog/trabajo",
    group: "sector",
  },
  {
    id: "camarero-b1",
    name: "Inglés para camareros B1",
    level: "B1",
    href: "/curso-camarero-b1",
    blogHref: "/blog/trabajo",
    group: "sector",
  },
  {
    id: "camarero-b2",
    name: "Inglés para camareros B2",
    level: "B2",
    href: "/curso-camarero-b2",
    blogHref: "/blog/trabajo",
    group: "sector",
  },
  {
    id: "logistica-a1",
    name: "Inglés para logística A1",
    level: "A1",
    href: "/curso-logistica-a1",
    blogHref: "/blog/trabajo",
    group: "sector",
  },
  {
    id: "logistica-a2",
    name: "Inglés para logística A2",
    level: "A2",
    href: "/curso-logistica-a2",
    blogHref: "/blog/trabajo",
    group: "sector",
  },
  {
    id: "logistica-b1",
    name: "Inglés para logística B1",
    level: "B1",
    href: "/curso-logistica-b1",
    blogHref: "/blog/trabajo",
    group: "sector",
  },
  {
    id: "logistica-b2",
    name: "Inglés para logística B2",
    level: "B2",
    href: "/curso-logistica-b2",
    blogHref: "/blog/trabajo",
    group: "sector",
  },
  {
    id: "recepcionista-a1",
    name: "Inglés para recepcionistas A1",
    level: "A1",
    href: "/curso-recepcionista-a1",
    blogHref: "/blog/trabajo",
    group: "sector",
  },
  {
    id: "recepcionista-a2",
    name: "Inglés para recepcionistas A2",
    level: "A2",
    href: "/curso-recepcionista-a2",
    blogHref: "/blog/trabajo",
    group: "sector",
  },
  {
    id: "recepcionista-b1",
    name: "Inglés para recepcionistas B1",
    level: "B1",
    href: "/curso-recepcionista-b1",
    blogHref: "/blog/trabajo",
    group: "sector",
  },
  {
    id: "recepcionista-b2",
    name: "Inglés para recepcionistas B2",
    level: "B2",
    href: "/curso-recepcionista-b2",
    blogHref: "/blog/trabajo",
    group: "sector",
  },
] as const;

const COURSES_BY_ID = new Map(
  ENROLLABLE_COURSES.map((course) => [course.id, course]),
);

export const ENROLLABLE_COURSE_IDS = ENROLLABLE_COURSES.map(
  (course) => course.id,
) as [string, ...string[]];

export const DECLARED_LEVELS = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "unknown",
] as const;

export type DeclaredLevel = (typeof DECLARED_LEVELS)[number];

export function getEnrollableCourse(
  courseId: string,
): EnrollableCourse | undefined {
  return COURSES_BY_ID.get(courseId);
}

export function isEnrollableCourseId(courseId: string): boolean {
  return COURSES_BY_ID.has(courseId);
}

export function publicCourseStartPath(course: EnrollableCourse): string {
  return course.blogHref;
}
