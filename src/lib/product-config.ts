/**
 * Estrategia de producto: blog + cursos gratuitos públicos.
 *
 * Variables de entorno (legacy, ya no bloquean rutas de curso):
 * - NEXT_PUBLIC_BLOG_ONLY_MODE
 * - NEXT_PUBLIC_COURSE_PILOT_ENABLED
 */

import { isPublicCoursePath } from '@/lib/course-indexing';

export type ProductStrategy = 'blog-only' | 'blog-funnel-pilot';

export const PILOT_COURSE_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export type PilotCourseLevel = (typeof PILOT_COURSE_LEVELS)[number];

export function getProductStrategy(): ProductStrategy {
  if (process.env.NEXT_PUBLIC_BLOG_ONLY_MODE === 'true') return 'blog-only';
  if (process.env.NEXT_PUBLIC_COURSE_PILOT_ENABLED === 'false') return 'blog-only';
  return 'blog-funnel-pilot';
}

export function isBlogOnlyMode(): boolean {
  return getProductStrategy() === 'blog-only';
}

export function isCoursePilotEnabled(): boolean {
  return true;
}

const ACCOUNT_ROUTE_PREFIXES = [
  '/mi-panel',
  '/dashboard',
  '/profile',
  '/aula',
  '/onboarding',
] as const;

export function isProductRoute(pathname: string): boolean {
  if (isPublicCoursePath(pathname)) return false;
  return ACCOUNT_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function isPilotCourseRoute(pathname: string): boolean {
  return isPublicCoursePath(pathname);
}

export function isNonPilotCourseRoute(_pathname: string): boolean {
  return false;
}

/**
 * Rutas de cuenta/panel que redirigen al blog en modo editorial puro.
 * Los cursos son siempre públicos.
 */
export function getProductRouteRedirect(pathname: string): string | null {
  if (isPublicCoursePath(pathname)) return null;
  if (!isBlogOnlyMode()) return null;
  return isProductRoute(pathname) ? '/blog' : null;
}

export const COURSE_FUNNEL_CTA = {
  label: 'Cursos de inglés gratis',
  href: '/curso-a1',
  description: 'Ruta estructurada por niveles MCER, desde A1 hasta C2',
} as const;

export const TEST_FUNNEL_CTA = {
  label: 'Test de nivel gratis',
  href: '/test-nivel',
  description: 'Descubre tu nivel en 5 minutos y recibe una ruta personalizada',
} as const;
