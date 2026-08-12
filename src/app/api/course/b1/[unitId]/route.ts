import { NextRequest, NextResponse } from 'next/server';
import { validateExerciseListForApi } from '@/lib/validation/course-exercise-api';

async function readCourseJson(request: NextRequest, rel: string) {
  const res = await fetch(new URL(`/course-data/${rel}`, request.url));
  if (!res.ok) {
    throw new Error(`No se encontró course-data/${rel}`);
  }
  return res.json() as Promise<{ title?: string; exercises?: unknown[] }>;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  try {
    const { unitId } = await params;

    if (unitId === 'test-final') {
      const data = await readCourseJson(request, 'b1/test-final.json');
      const exercises = Array.isArray(data.exercises) ? data.exercises : [];
      const title = data.title ?? 'Test final B1';
      const { exercises: validated, validation } = validateExerciseListForApi(exercises);
      return NextResponse.json({ exercises: validated, title, validation });
    }

    const unitNumber = unitId.replace('unit-', '');
    const unitNum = parseInt(unitNumber, 10);
    if (isNaN(unitNum) || unitNum < 1 || unitNum > 60) {
      return NextResponse.json({ error: 'Unidad no encontrada' }, { status: 404 });
    }

    const data = await readCourseJson(request, `b1/unit-${unitNum}.json`);
    const exercises = Array.isArray(data.exercises) ? data.exercises : [];
    if (!exercises.length) {
      return NextResponse.json({ error: 'Unidad no encontrada' }, { status: 404 });
    }
    const title = data.title ?? `Unidad ${unitNum}`;
    const { exercises: validated, validation } = validateExerciseListForApi(exercises);
    return NextResponse.json({ exercises: validated, title, validation });
  } catch (err) {
    console.error('[API course/b1]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error al cargar la unidad' },
      { status: 500 }
    );
  }
}
