export function isFreeCourseRoute(pathname: string) {
  return /^\/curso-[^/]+/.test(pathname);
}

export function isLegacyCourseRedirectRoute(pathname: string) {
  return pathname.startsWith('/curso/') || pathname === '/cursos' || pathname.startsWith('/cursos/');
}
