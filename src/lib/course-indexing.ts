/**
 * Rutas de curso públicas y gratuitas (landings, unidades, outlines, etc.).
 */
export function isPublicCoursePath(pathname: string): boolean {
  return pathname.startsWith('/curso-') || pathname.startsWith('/curso/');
}

/** @deprecated Usar isPublicCoursePath */
export function isCourseLandingPath(pathname: string): boolean {
  return /^\/curso-[a-z0-9-]+$/.test(pathname);
}

export const INDEXABLE_COURSE_LANDING_PATHS = [
  '/curso-a1',
  '/curso-a2',
  '/curso-b1',
  '/curso-b2',
  '/curso-c1',
  '/curso-c2',
  '/curso-camarero-a1',
  '/curso-camarero-a2',
  '/curso-camarero-b1',
  '/curso-camarero-b2',
  '/curso-recepcionista-a1',
  '/curso-recepcionista-a2',
  '/curso-recepcionista-b1',
  '/curso-recepcionista-b2',
  '/curso-logistica-a1',
  '/curso-logistica-a2',
  '/curso-logistica-b1',
  '/curso-logistica-b2',
] as const;
