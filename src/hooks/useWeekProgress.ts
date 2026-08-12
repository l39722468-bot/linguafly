'use client';

import { useState, useEffect } from 'react';

interface UseWeekProgressReturn {
  completedActivities: string[];
  markComplete: (activityId: string) => Promise<void>;
  isLoading: boolean;
}

function getLocalStorageKey(weekId: string): string {
  return `course_progress_${weekId}`;
}

export function useWeekProgress(weekId: string, _userId: string | null): UseWeekProgressReturn {
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localKey = getLocalStorageKey(weekId);
    const saved = localStorage.getItem(localKey);
    const localActivities: string[] = saved ? JSON.parse(saved) : [];
    setCompletedActivities(localActivities);
    setIsLoading(false);
  }, [weekId]);

  const markComplete = async (activityId: string) => {
    setCompletedActivities(prev => {
      if (prev.includes(activityId)) return prev;
      const updated = [...prev, activityId];
      localStorage.setItem(getLocalStorageKey(weekId), JSON.stringify(updated));
      return updated;
    });
  };

  return { completedActivities, markComplete, isLoading };
}
