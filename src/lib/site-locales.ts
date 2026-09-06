export const HOME_PATHS = {
  es: "/",
} as const;

export type SiteHomeLocale = keyof typeof HOME_PATHS;

export function localeFromPathname(pathname: string | null | undefined): SiteHomeLocale {
  return "es";
}
