export const HOME_PATHS = {
  es: "/",
  en: "/en",
} as const;

export type SiteHomeLocale = keyof typeof HOME_PATHS;

export function isSpanishCourseCategory(category: string | null | undefined): boolean {
  if (!category) return false;
  return category.toLowerCase().startsWith("curso-espanol");
}

export function localeFromPathname(pathname: string | null | undefined): SiteHomeLocale {
  if (!pathname) return "es";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname.startsWith("/blog/curso-espanol")) return "en";
  return "es";
}

export const SPANISH_COURSE_A1_HREF = "/blog/curso-espanol-a1";
export const SPANISH_COURSE_A1_UNIT1_HREF =
  "/blog/curso-espanol-a1/unidad-1-greetings-names-ser";
