import {
  getTheoryPathForCourseUnit,
  getWorkbookPathForCourseUnit,
} from "@/lib/seo/article-paths";
import { parseCourseUnitSlug } from "@/lib/seo/unit-topic-canonical";

export type CourseLessonLinkKind = "hub" | "previous" | "next" | "theory" | "practice";

export type CourseLessonLink = {
  href: string;
  label: string;
  kind: CourseLessonLinkKind;
};

function stemLabel(path: string): string {
  const slug = path.split("/").pop() || "";
  const match = slug.match(/^unidad-\d+-(.+)$/);
  if (!match) return slug.replace(/-/g, " ");
  return match[1].replace(/-ejercicios-soluciones$/, "").replace(/-/g, " ");
}

function neighborPath(level: string, unitNumber: number): string | null {
  if (unitNumber < 1) return null;
  return (
    getTheoryPathForCourseUnit(level, unitNumber) ||
    getWorkbookPathForCourseUnit(level, unitNumber)
  );
}

/** HTML links between a course lesson, its exercises and the adjacent units. */
export function getCourseLessonLinks(category: string, slug: string): CourseLessonLink[] {
  const parsed = parseCourseUnitSlug(category, slug);
  if (!parsed) return [];

  const self = `/blog/${category.toLowerCase()}/${slug}`;
  const links: CourseLessonLink[] = [
    {
      href: `/blog/curso-${parsed.level}`,
      label: `Curso de inglés ${parsed.level.toUpperCase()}`,
      kind: "hub",
    },
  ];

  const previous = neighborPath(parsed.level, parsed.unitNumber - 1);
  if (previous && previous !== self) {
    links.push({
      href: previous,
      label: `Unidad anterior: ${stemLabel(previous)}`,
      kind: "previous",
    });
  }

  const theory = getTheoryPathForCourseUnit(parsed.level, parsed.unitNumber);
  const practice = getWorkbookPathForCourseUnit(parsed.level, parsed.unitNumber);

  if (parsed.isWorkbook && theory && theory !== self) {
    links.push({
      href: theory,
      label: `Ver la explicación: ${stemLabel(theory)}`,
      kind: "theory",
    });
  }

  if (!parsed.isWorkbook && practice && practice !== self) {
    links.push({
      href: practice,
      label: `Practica los ejercicios: ${stemLabel(practice)}`,
      kind: "practice",
    });
  }

  const next = neighborPath(parsed.level, parsed.unitNumber + 1);
  if (next && next !== self) {
    links.push({
      href: next,
      label: `Siguiente unidad: ${stemLabel(next)}`,
      kind: "next",
    });
  }

  return links;
}
