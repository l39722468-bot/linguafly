/**
 * Vídeo-clases de YouTube por unidad.
 *
 * Clave exterior: categoría del curso (`curso-a1` … `curso-c2`).
 * Clave interior: número de unidad.
 *
 * El vídeo se inserta en el artículo de teoría de la unidad
 * (`/blog/curso-a1/unidad-10-...`) con datos estructurados VideoObject y
 * etiqueta `<video:video>` en el sitemap. El cuaderno de ejercicios de la
 * misma unidad no lo repite.
 *
 * Ejemplo:
 *   "curso-a1": {
 *     10: {
 *       youtubeId: "M7lc1UVf-VE",
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
