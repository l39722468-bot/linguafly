'use client';

import { useEffect, useState } from 'react';
import { courseIdToPath } from '@/lib/access/course-id-map';

export function useCourseMetadata(courseId: string) {
  const [totalUnits, setTotalUnits] = useState<number | null>(null);
  const coursePath = courseIdToPath(courseId);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/course/metadata?courseId=${encodeURIComponent(courseId)}`)
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setTotalUnits(data.totalUnits ?? null);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [courseId]);

  return { totalUnits, coursePath };
}
