'use client';

import { useCallback, useRef } from 'react';

interface RecordExerciseParams {
  unitId: number;
  exerciseId: string;
  exerciseType: string;
  isCorrect: boolean;
  timeSpentSeconds?: number;
  lessonKey?: string;
  expectedExercisesTotal?: number;
}

const STORAGE_KEY = 'a1_local_progress';

function readProgress(): Record<string, unknown>[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeProgress(rows: Record<string, unknown>[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

export function useA1ProgressTracking() {
  const inFlightRef = useRef<Set<string>>(new Set());

  const recordExercise = useCallback(async (params: RecordExerciseParams) => {
    const dedupeKey = `${params.unitId}:${params.exerciseId}`;
    if (inFlightRef.current.has(dedupeKey)) return;
    inFlightRef.current.add(dedupeKey);
    try {
      const rows = readProgress();
      rows.push({ ...params, recordedAt: new Date().toISOString() });
      writeProgress(rows);
      return { success: true };
    } finally {
      inFlightRef.current.delete(dedupeKey);
    }
  }, []);

  const getProgress = useCallback(async (unitId?: number) => {
    const rows = readProgress();
    if (unitId == null) return rows;
    return rows.filter((r) => r.unitId === unitId);
  }, []);

  return { recordExercise, getProgress, isAuthenticated: false };
}
