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
