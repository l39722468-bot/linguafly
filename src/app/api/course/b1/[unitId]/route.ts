import { NextRequest, NextResponse } from 'next/server';
import { B1_COURSE } from '@/lib/course/b1';
import { FINAL_TEST_B1_EXERCISES, FINAL_TEST_B1_TITLE } from '@/lib/course/b1/final-test-b1';
import { validateExerciseListForApi } from '@/lib/validation/course-exercise-api';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  try {
    const { unitId } = await params;

    if (unitId === 'test-final') {
      const exercises = Array.isArray(FINAL_TEST_B1_EXERCISES) ? FINAL_TEST_B1_EXERCISES : [];
      const title = FINAL_TEST_B1_TITLE ?? 'Test final B1';
      const { exercises: validated, validation } = validateExerciseListForApi(exercises);
      return NextResponse.json({ exercises: validated, title, validation });
    }

    const unitNumber = unitId.replace('unit-', '');
    const unitNum = parseInt(unitNumber, 10);
    if (isNaN(unitNum) || unitNum < 1 || unitNum > 60) {
      return NextResponse.json({ error: 'Unidad no encontrada' }, { status: 404 });
    }

    const unit = B1_COURSE.units.find((u) => u.id === unitNum);
    if (!unit) {
      return NextResponse.json({ error: 'Unidad no encontrada' }, { status: 404 });
    }

    const exercises = Array.isArray(unit.exercises) ? unit.exercises : [];
    const title = unit.title ?? `Unidad ${unitNum}`;
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
