import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'Focus English Mobile API',
    version: 'v1',
    docs: '/docs/mobile-app.md',
    endpoints: {
      me: 'GET /api/mobile/v1/me',
      courseCatalog: 'GET /api/mobile/v1/course/{courseId}',
      unit: 'GET /api/mobile/v1/course/{courseId}/units/{unitId}',
      progress: 'GET /api/mobile/v1/progress?courseId={courseId}',
      recordProgress: 'POST /api/mobile/v1/progress/record',
    },
    auth: {
      type: 'Bearer JWT (Supabase access_token)',
      header: 'Authorization: Bearer <token>',
    },
    supportedCourses: [
      'ingles-a1',
      'ingles-a2',
      'ingles-b1',
      'ingles-b2',
      'ingles-c1',
      'ingles-c2',
    ],
  });
}
