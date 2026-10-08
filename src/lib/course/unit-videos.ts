import { COURSE_UNIT_VIDEOS, type CourseUnitVideo } from "@/data/course-unit-videos";
import { parseCourseUnitSlug } from "@/lib/seo/unit-topic-canonical";
import { isValidYoutubeId } from "@/lib/video/youtube";

export type { CourseUnitVideo };

type VideoRegistry = Record<string, Record<number, CourseUnitVideo>>;

export function getCourseUnitVideo(
  courseSlug: string,
  unitNumber: number,
  registry: VideoRegistry = COURSE_UNIT_VIDEOS,
): CourseUnitVideo | null {
  const video = registry[courseSlug]?.[unitNumber];
  if (!video || !isValidYoutubeId(video.youtubeId)) return null;
  return video;
}

/** Acepta `unit-10` y `10`; `test-final` y similares devuelven null. */
export function unitNumberFromUnitId(unitId: string): number | null {
  const match = unitId.match(/^(?:unit-)?(\d+)$/);
  return match ? Number(match[1]) : null;
}

export function getInteractiveUnitVideo(
  courseSlug: string,
  unitId: string,
  registry?: VideoRegistry,
): CourseUnitVideo | null {
  const unitNumber = unitNumberFromUnitId(unitId);
  if (unitNumber === null) return null;
  return getCourseUnitVideo(courseSlug, unitNumber, registry);
}

/**
 * Solo el artículo de teoría lleva el vídeo: el cuaderno de ejercicios
 * (`-ejercicios-soluciones`) es una página satélite y duplicaría el VideoObject.
 */
export function getArticleUnitVideo(
  category: string,
  slug: string,
  registry?: VideoRegistry,
): CourseUnitVideo | null {
  const unit = parseCourseUnitSlug(category, slug);
  if (!unit || unit.isWorkbook) return null;
  return getCourseUnitVideo(`curso-${unit.level}`, unit.unitNumber, registry);
}
