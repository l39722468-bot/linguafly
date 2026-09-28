const UNIT_SLUG = /^unidad-(\d+)(?:-|$)/;
const WORKBOOK_SUFFIX = "-ejercicios-soluciones";

/** Unit number, then theory (0) before exercise articles (1), then slug. */
export function courseUnitSortKey(slug: string): [number, number, string] {
  const match = slug.match(UNIT_SLUG);
  const unit = match ? Number(match[1]) : Number.POSITIVE_INFINITY;
  const exercise = slug.endsWith(WORKBOOK_SUFFIX) ? 1 : 0;
  return [unit, exercise, slug];
}

export function compareCourseUnitArticles(
  a: { slug: string },
  b: { slug: string },
): number {
  const [unitA, exerciseA, slugA] = courseUnitSortKey(a.slug);
  const [unitB, exerciseB, slugB] = courseUnitSortKey(b.slug);
  if (unitA !== unitB) return unitA - unitB;
  if (exerciseA !== exerciseB) return exerciseA - exerciseB;
  return slugA.localeCompare(slugB);
}
