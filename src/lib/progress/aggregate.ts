export type UnitProgressRow = {
  unit_id: number;
  status: string;
  exercises_completed: number;
  exercises_total: number;
  accuracy_percentage: number;
  last_activity_at?: string | null;
};

type LessonProgressLike = {
  unit_id: number | string | null;
  exercises_completed?: number | null;
  exercises_total?: number | null;
  attempts?: number | null;
  correct_count?: number | null;
  accuracy_percent?: number | null;
  last_activity_at?: string | null;
  status?: string | null;
};

type A1ProgressLike = {
  unit_id: number | string | null;
  exercises_completed?: number | null;
  exercises_total?: number | null;
  accuracy_percentage?: number | null;
  status?: string | null;
  last_activity?: string | null;
};

export function aggregateLessonProgressByUnit(
  rows: LessonProgressLike[]
): UnitProgressRow[] {
  const byUnit = new Map<
    number,
    {
      unit_id: number;
      exercises_completed: number;
      exercises_total: number;
      attempts: number;
      correct_count: number;
      last_activity_at: string | null;
    }
  >();

  for (const r of rows) {
    const unitIdNum = Number(r.unit_id);
    if (!Number.isFinite(unitIdNum)) continue;

    if (!byUnit.has(unitIdNum)) {
      byUnit.set(unitIdNum, {
        unit_id: unitIdNum,
        exercises_completed: 0,
        exercises_total: 0,
        attempts: 0,
        correct_count: 0,
        last_activity_at: r.last_activity_at ?? null,
      });
    }

    const agg = byUnit.get(unitIdNum)!;
    agg.exercises_completed += r.exercises_completed ?? 0;
    agg.exercises_total += r.exercises_total ?? 0;
    agg.attempts += r.attempts ?? 0;
    agg.correct_count += r.correct_count ?? 0;

    if (r.last_activity_at) {
      const prev = agg.last_activity_at ? new Date(agg.last_activity_at).getTime() : 0;
      const next = new Date(r.last_activity_at).getTime();
      if (next > prev) agg.last_activity_at = r.last_activity_at;
    }
  }

  return Array.from(byUnit.values())
    .map((agg) => {
      const completed =
        (agg.exercises_total ?? 0) > 0 &&
        (agg.exercises_completed ?? 0) >= (agg.exercises_total ?? 0);
      const inProgress = (agg.exercises_completed ?? 0) > 0;
      const status = completed ? 'completed' : inProgress ? 'in_progress' : 'not_started';
      const accuracy_percentage =
        agg.attempts > 0
          ? Math.round((agg.correct_count / agg.attempts) * 10000) / 100
          : 0;

      return {
        unit_id: agg.unit_id,
        status,
        exercises_completed: agg.exercises_completed,
        exercises_total: agg.exercises_total,
        accuracy_percentage,
        last_activity_at: agg.last_activity_at,
      };
    })
    .sort((a, b) => a.unit_id - b.unit_id);
}

export function mapA1ProgressRows(rows: A1ProgressLike[]): UnitProgressRow[] {
  const mapped: UnitProgressRow[] = [];

  for (const p of rows ?? []) {
    const unitId = Number(p.unit_id);
    if (!Number.isFinite(unitId)) continue;

    const exercises_completed = p.exercises_completed ?? 0;
    const exercises_total = p.exercises_total ?? 0;
    const completed =
      p.status === 'completed' ||
      (exercises_total > 0 && exercises_completed >= exercises_total);
    const inProgress = exercises_completed > 0 || p.status === 'in_progress';

    mapped.push({
      unit_id: unitId,
      status: completed ? 'completed' : inProgress ? 'in_progress' : 'not_started',
      exercises_completed,
      exercises_total,
      accuracy_percentage: Number(p.accuracy_percentage ?? 0),
      last_activity_at: p.last_activity ?? null,
    });
  }

  return mapped.sort((a, b) => a.unit_id - b.unit_id);
}

/** Une progreso unificado + legado A1; gana la fila con más actividad. */
export function mergeUnitProgress(
  primary: UnitProgressRow[],
  fallback: UnitProgressRow[]
): UnitProgressRow[] {
  const map = new Map<number, UnitProgressRow>();
  for (const row of [...fallback, ...primary]) {
    const prev = map.get(row.unit_id);
    if (!prev) {
      map.set(row.unit_id, row);
      continue;
    }
    const prevScore = (prev.exercises_completed ?? 0) + (prev.exercises_total ?? 0);
    const nextScore = (row.exercises_completed ?? 0) + (row.exercises_total ?? 0);
    if (nextScore >= prevScore) map.set(row.unit_id, row);
  }
  return Array.from(map.values()).sort((a, b) => a.unit_id - b.unit_id);
}

export function summarizeUnitProgress(progress: UnitProgressRow[]) {
  const startedUnits = progress.filter(
    (u) => (u.exercises_completed ?? 0) > 0 || u.status === 'in_progress' || u.status === 'completed'
  );
  const totalUnitsStarted = startedUnits.length;
  const totalUnitsCompleted = progress.filter((u) => u.status === 'completed').length;
  const averageAccuracy =
    startedUnits.length > 0
      ? (
          startedUnits.reduce((sum, u) => sum + (u.accuracy_percentage ?? 0), 0) /
          startedUnits.length
        ).toFixed(2)
      : '0';

  return { totalUnitsStarted, totalUnitsCompleted, averageAccuracy };
}

export function defaultLessonKey(unitId: number, skillHint?: string): string {
  const skill = (skillHint || 'practice').toLowerCase().replace(/[^a-z0-9-]/g, '') || 'practice';
  return `lesson-${Math.max(unitId, 0)}-${skill}`;
}
