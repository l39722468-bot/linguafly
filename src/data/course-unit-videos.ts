/**
 * Vídeo-clases de YouTube por unidad.
 *
 * Clave exterior: slug del curso (`curso-a1`, `curso-b2`, `curso-camarero-a1`...).
 * Clave interior: número de unidad.
 *
 * El vídeo se muestra en el artículo de teoría de la unidad
 * (`/blog/curso-a1/unidad-10-...`, con datos estructurados VideoObject) y en la
 * unidad interactiva (`/curso-a1/unit-10`). Los cursos sectoriales no tienen
 * artículo de teoría, así que allí solo aparece en la unidad interactiva.
 *
 * Ejemplo:
 *   "curso-a1": {
 *     10: {
 *       youtubeId: "dQw4w9WgXcQ",
 *       uploadDate: "2026-10-08",
 *       duration: "PT12M30S",
 *     },
 *   },
 */
export interface CourseUnitVideo {
  /** ID de 11 caracteres de la URL de YouTube (`watch?v=<id>` o `youtu.be/<id>`). */
  youtubeId: string;
  /** Fecha de publicación en YouTube, ISO 8601. Google la exige para VideoObject. */
  uploadDate: string;
  /** Duración ISO 8601, p. ej. `PT12M30S`. */
  duration?: string;
  /** Por defecto se usa el título del artículo de la unidad. */
  title?: string;
  /** Por defecto se usa la descripción del artículo de la unidad. */
  description?: string;
}

export const COURSE_UNIT_VIDEOS: Record<string, Record<number, CourseUnitVideo>> = {};
