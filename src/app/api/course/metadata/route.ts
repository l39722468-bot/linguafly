import { NextRequest, NextResponse } from 'next/server';
import { premiumCourseServerService } from '@/lib/services/premium-course-service.server';

async function loadCourseMetadata(courseId: string) {
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

export async function GET(request: NextRequest) {
  const courseId = request.nextUrl.searchParams.get('courseId')?.trim();
  if (!courseId) {
    return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
  }

  const metadata = await loadCourseMetadata(courseId);
  if (!metadata) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  return NextResponse.json({
    courseId,
    totalUnits: metadata.totalUnits,
    units: metadata.units.map((unit) => ({
      unitId: unit.unitId,
      unitNumber: unit.unitNumber,
      title: unit.title,
    })),
  });
}
