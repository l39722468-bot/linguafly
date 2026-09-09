const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

function parseDate(value: string): Date | null {
  const iso = value.trim();
  const dayOnly = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (dayOnly) {
    return new Date(Number(dayOnly[1]), Number(dayOnly[2]) - 1, Number(dayOnly[3]));
  }
  const parsed = new Date(iso);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function calendarDay(value: string): string {
  const parsed = parseDate(value);
  if (!parsed) return value.slice(0, 10);
  const y = parsed.getFullYear();
  const m = String(parsed.getMonth() + 1).padStart(2, "0");
  const d = String(parsed.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function articleDatesDiffer(
  published?: string | null,
  updated?: string | null,
): boolean {
  if (!published || !updated) return false;
  return calendarDay(published) !== calendarDay(updated);
}

export function formatArticleDate(value: string): string {
  const parsed = parseDate(value);
  if (!parsed) return value;
  return parsed.toLocaleDateString("es-ES", DATE_OPTIONS);
}
