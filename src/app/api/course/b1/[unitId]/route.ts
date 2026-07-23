import { NextRequest, NextResponse } from 'next/server';
import { B1_COURSE } from '@/lib/course/b1';
import { FINAL_TEST_B1_EXERCISES, FINAL_TEST_B1_TITLE } from '@/lib/course/b1/final-test-b1';
import { validateExerciseListForApi } from '@/lib/validation/course-exercise-api';
import { createClient } from '@/lib/supabase/server';
import { getUserProfileByAuthId } from '@/lib/access/user-profile';
import { resolveEntitlements } from '@/lib/access/entitlements';
import { isFreeUnitId } from '@/lib/access/unit-access';

async function viewerCanAccessUnit(unitId: string): Promise<boolean> {
  if (isFreeUnitId(unitId)) return true;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;
    const profile = await getUserProfileByAuthId<{
      subscription_status?: string;
      subscription_plan?: string;
      role?: string;
    }>(supabase, user.id, 'subscription_status, subscription_plan, role');
    if (profile?.role === 'admin') return true;
    return resolveEntitlements({
      subscriptionStatus: profile?.subscription_status,
      subscriptionPlan: profile?.subscription_plan,
    }).officialCourses;
  } catch {
    return false;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  try {
    const { unitId } = await params;

    if (!(await viewerCanAccessUnit(unitId))) {
      return NextResponse.json(
        { error: 'Suscripción requerida', code: 'premium_required' },
        { status: 402 }
      );
    }

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
