import { premiumCourseServerService } from '@/lib/services/premium-course-service.server';
import type { A1CourseMetadata } from '@/types/premium-course';
import { isSupportedMobileCourseId } from '@/lib/course/load-unit-for-api';

export async function getMobileCourseMetadata(courseId: string): Promise<A1CourseMetadata | null> {
  if (!isSupportedMobileCourseId(courseId)) return null;

  switch (courseId) {
    case 'ingles-a1':
      return premiumCourseServerService.getA1UnitsWithMetadata();
    case 'ingles-a2':
      return premiumCourseServerService.getA2UnitsWithMetadata();
    case 'ingles-b1':
      return premiumCourseServerService.getB1UnitsWithMetadata();
    case 'ingles-b2':
      return premiumCourseServerService.getB2UnitsWithMetadata();
    case 'ingles-c1':
      return premiumCourseServerService.getC1UnitsWithMetadata();
    case 'ingles-c2':
      return premiumCourseServerService.getC2UnitsWithMetadata();
    default:
      return null;
  }
}
