import { NextRequest } from 'next/server';
import { getMobileAuth, mobileError, mobileJson } from '@/lib/api/mobile-auth';
import { getViewerCourseSequentialState } from '@/lib/access/get-viewer-course-sequential-state';
import { getMobileCourseMetadata } from '@/lib/mobile/course-metadata';
import type { MobileCourseCatalog } from '@/lib/mobile/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const metadata = await getMobileCourseMetadata(courseId);
  if (!metadata) {
    return mobileError('Curso no encontrado', 404, 'course_not_found');
  }

  await getMobileAuth(request);
  const sequential = await getViewerCourseSequentialState(courseId, metadata.totalUnits);

  const payload: MobileCourseCatalog = {
    courseId,
    totalUnits: metadata.totalUnits,
    units: metadata.units.map((unit) => ({
      unitId: unit.unitId,
      unitNumber: unit.unitNumber,
      title: unit.title,
      exerciseCount: unit.exerciseCount,
      estimatedDuration: unit.estimatedDuration,
    })),
    sequential: {
      enabled: sequential.sequentialMode,
      currentUnitNumber: sequential.currentUnitNumber,
      completedUnits: sequential.completedUnits,
    },
  };

  return mobileJson(payload);
}
