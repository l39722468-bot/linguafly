import { useCallback, useRef } from 'react';
import { useAuth } from '@/components/AuthProvider';

interface RecordExerciseParams {
  unitId: number;
  exerciseId: string;
  exerciseType: string;
  isCorrect: boolean;
  timeSpentSeconds?: number;
  lessonKey?: string;
  expectedExercisesTotal?: number;
}

export function useA1ProgressTracking() {
  const { user } = useAuth();
  // Evitar perder registros concurrentes: bloquear por exerciseId, no globalmente
  const inFlightRef = useRef<Set<string>>(new Set());

  const recordExercise = useCallback(
    async (params: RecordExerciseParams) => {
      if (!user) return;

      const key = `${params.unitId}:${params.exerciseId}:${Date.now()}`;
      // Dedup solo si el mismo exerciseId ya está en vuelo (mismo instante)
      const dedupeKey = `${params.unitId}:${params.exerciseId}`;
      if (inFlightRef.current.has(dedupeKey)) {
        return;
      }

      inFlightRef.current.add(dedupeKey);

      try {
        const response = await fetch('/api/a1/record-exercise', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });

        if (!response.ok) {
          console.error('Failed to record exercise:', response.statusText);
          return;
        }

        const data = await response.json();
        if (data?.unifiedError) {
          console.warn('Exercise recorded in A1 but unified sync failed:', data.unifiedError);
        }
        return data;
      } catch (error) {
        console.error('Error recording exercise:', error);
      } finally {
        inFlightRef.current.delete(dedupeKey);
        void key;
      }
    },
    [user]
  );

  const getProgress = useCallback(async (unitId?: number) => {
    if (!user) {
      return null;
    }

    try {
      const url = unitId
        ? `/api/a1/progress?unitId=${unitId}`
        : '/api/a1/progress';

      const response = await fetch(url);

      if (!response.ok) {
        console.error('Failed to fetch progress:', response.statusText);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching progress:', error);
      return null;
    }
  }, [user]);

  return { recordExercise, getProgress, isAuthenticated: !!user };
}
