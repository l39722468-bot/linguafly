/**
 * Estrategia de producto: blog + cursos (modo gratuito visible por defecto).
 *
 * Variables de entorno (legacy):
 * - NEXT_PUBLIC_BLOG_ONLY_MODE
 * - NEXT_PUBLIC_COURSE_PILOT_ENABLED
 * - NEXT_PUBLIC_FREE_ACCESS_MODE — si no es "false", la web se presenta 100% gratuita
 */

import { isPublicCoursePath } from '@/lib/course-indexing';

/** Oculta monetización y desbloquea el contenido (sin CTAs de pago ni candados). */
export function isFreeAccessMode(): boolean {
  return process.env.NEXT_PUBLIC_FREE_ACCESS_MODE !== 'false';
}

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
 * Las landings y la unidad 1 de cada curso siguen siendo públicas.
 */
export function getProductRouteRedirect(pathname: string): string | null {
  if (isPublicCoursePath(pathname)) return null;
  if (!isBlogOnlyMode()) return null;
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
  description: 'Descubre tu nivel en 5 minutos y recibe una ruta personalizada',
} as const;
