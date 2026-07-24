import type { UnitProgressRow } from "@/lib/progress/aggregate";

/** Extrae el número de unidad desde slugs como unit-3, unit3 o 3. */
export function parseUnitNumber(unitId: string | null | undefined): number | null {
  if (!unitId) return null;
  const normalized = String(unitId).trim().toLowerCase();
  if (normalized === "test-final") return null;

  const match = normalized.match(/^unit-?(\d+)$/);
  if (match) return Number(match[1]);

  const asNumber = Number(normalized);
  return Number.isFinite(asNumber) && asNumber > 0 ? asNumber : null;
}

export function formatUnitSlug(unitNumber: number): string {
  return `unit-${unitNumber}`;
}

export function isUnitCompleted(
  progress: Pick<UnitProgressRow, "unit_id" | "status" | "exercises_completed" | "exercises_total">[],
  unitNumber: number
): boolean {
  const row = progress.find((p) => p.unit_id === unitNumber);
  if (!row) return false;
  if (row.status === "completed") return true;
  return (
    (row.exercises_total ?? 0) > 0 &&
    (row.exercises_completed ?? 0) >= (row.exercises_total ?? 0)
  );
}

/**
 * Unidad activa para alumnos con suscripción: la primera no completada.
 * Si todas están completadas, devuelve la última unidad (repaso).
 */
export function getCurrentUnitNumber(
  progress: Pick<UnitProgressRow, "unit_id" | "status" | "exercises_completed" | "exercises_total">[],
  totalUnits: number
): number {
  const safeTotal = Math.max(1, totalUnits);
  for (let n = 1; n <= safeTotal; n++) {
    if (!isUnitCompleted(progress, n)) return n;
  }
  return safeTotal;
}

/** En modo secuencial solo la unidad activa es accesible. */
export function canAccessUnitInSequentialMode(
  unitNumber: number,
  currentUnitNumber: number
): boolean {
  return unitNumber === currentUnitNumber;
}

export function getNextUnitNumber(
  currentUnitNumber: number,
  totalUnits: number
): number | null {
  if (currentUnitNumber >= totalUnits) return null;
  return currentUnitNumber + 1;
}

export function getNextUnitSlug(
  currentUnitId: string,
  totalUnits: number
): string | null {
  const current = parseUnitNumber(currentUnitId);
  if (!current) return null;
  const next = getNextUnitNumber(current, totalUnits);
  return next ? formatUnitSlug(next) : null;
}
