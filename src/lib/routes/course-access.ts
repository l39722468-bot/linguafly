import {
  isFreeCourseContentPath,
  isGeneralCoursePath,
  requiresSubscriptionForCoursePath,
} from "@/lib/access/unit-access";

/** Landing + unidad 1 (+ outline/tipografía): públicas sin suscripción. */
export function isFreeCourseRoute(pathname: string) {
  return isFreeCourseContentPath(pathname);
}

/** Cualquier ruta bajo /curso-a1 … /curso-c2. */
export function isCourseRoute(pathname: string) {
  return isGeneralCoursePath(pathname);
}

export function isPaidCourseRoute(pathname: string) {
  return requiresSubscriptionForCoursePath(pathname);
}

export function isLegacyCourseRedirectRoute(pathname: string) {
  return pathname.startsWith("/curso/") || pathname === "/cursos" || pathname.startsWith("/cursos/");
}
