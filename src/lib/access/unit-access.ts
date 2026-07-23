/** Primera unidad de cada curso general: acceso gratuito. */
export const FREE_UNIT_SLUG = "unit-1";

const GENERAL_COURSE_RE = /^\/curso-(a1|a2|b1|b2|c1|c2)(?:\/|$)/i;

/** Rutas de curso general que siguen siendo públicas (landing, unit-1, outline, tipografía). */
const FREE_COURSE_CONTENT_RE =
  /^\/curso-(a1|a2|b1|b2|c1|c2)(?:\/(?:unit-?1|outline|tipografia)?)?\/?$/i;

export function isFreeUnitId(unitId: string | null | undefined): boolean {
  if (!unitId) return false;
  const normalized = String(unitId).trim().toLowerCase();
  return normalized === "unit-1" || normalized === "unit1" || normalized === "1";
}

export function isGeneralCoursePath(pathname: string): boolean {
  return GENERAL_COURSE_RE.test(pathname);
}

export function isGeneralCourseLanding(pathname: string): boolean {
  return /^\/curso-(a1|a2|b1|b2|c1|c2)\/?$/i.test(pathname);
}

/** Contenido de curso accesible sin suscripción. */
export function isFreeCourseContentPath(pathname: string): boolean {
  return FREE_COURSE_CONTENT_RE.test(pathname);
}

/** Unidades 2+, test final, práctica diaria, etc. requieren suscripción. */
export function requiresSubscriptionForCoursePath(pathname: string): boolean {
  if (!isGeneralCoursePath(pathname)) return false;
  return !isFreeCourseContentPath(pathname);
}

export function canAccessCourseUnit(params: {
  unitId: string;
  isPaid: boolean;
  isAdmin?: boolean;
}): boolean {
  if (params.isAdmin || params.isPaid) return true;
  return isFreeUnitId(params.unitId);
}
