/**
 * Producto: blog gratuito (sin registro, sin pagos).
 */

import { isPublicCoursePath } from '@/lib/course-indexing';

/** Siempre true: sin candados ni CTAs de pago. */
export function isFreeAccessMode(): boolean {
  return true;
}

export type ProductStrategy = 'blog-only' | 'blog-funnel-pilot';

export const PILOT_COURSE_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export type PilotCourseLevel = (typeof PILOT_COURSE_LEVELS)[number];

export function getProductStrategy(): ProductStrategy {
  return 'blog-only';
}

export function isBlogOnlyMode(): boolean {
  return true;
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
  '/cuenta',
  '/planes',
  '/admin',
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

/** Rutas de cuenta/panel → blog. */
export function getProductRouteRedirect(pathname: string): string | null {
  if (isPublicCoursePath(pathname)) return null;
  return isProductRoute(pathname) ? '/blog' : null;
}

export const COURSE_FUNNEL_CTA = {
  label: 'Empezar curso A1',
  href: '/curso-a1/unit-1',
  description: 'Cursos interactivos de A1 a C2 · 100% gratuitos',
} as const;

export const TEST_FUNNEL_CTA = {
  label: 'Test de nivel gratis',
  href: '/test-nivel',
  description: 'Descubre tu nivel en 5 minutos',
} as const;
