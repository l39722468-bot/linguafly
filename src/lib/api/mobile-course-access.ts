import { getUserProfileByAuthId } from '@/lib/access/user-profile';
import { resolveEntitlements } from '@/lib/access/entitlements';
import { isFreeUnitId } from '@/lib/access/unit-access';
import { getViewerCourseSequentialState } from '@/lib/access/get-viewer-course-sequential-state';
import {
  canAccessUnitInSequentialMode,
  parseUnitNumber,
} from '@/lib/access/sequential-unit-access';
import { syncPaidEntitlementFromStripe } from '@/lib/stripe/provision-subscriber';
import type { SupabaseClient, User } from '@supabase/supabase-js';

export type MobileUnitAccessResult =
  | { allowed: true; reason: 'free' | 'paid' | 'admin' }
  | {
      allowed: false;
      code: 'auth_required' | 'premium_required' | 'sequential_locked';
      currentUnitNumber?: number;
      message: string;
    };

export async function checkMobileUnitAccess(params: {
  supabase: SupabaseClient;
  user: User | null;
  courseId: string;
  unitId: string;
  totalUnits: number;
}): Promise<MobileUnitAccessResult> {
  const { supabase, user, courseId, unitId, totalUnits } = params;

  if (isFreeUnitId(unitId)) {
    return { allowed: true, reason: 'free' };
  }

  if (!user) {
    return {
      allowed: false,
      code: 'auth_required',
      message: 'Inicia sesión para acceder a esta unidad.',
    };
  }

  let profile = await getUserProfileByAuthId<{
    subscription_status?: string;
    subscription_plan?: string;
    role?: string;
  }>(supabase, user.id, 'subscription_status, subscription_plan, role');

  if (profile?.role === 'admin') {
    return { allowed: true, reason: 'admin' };
  }

  let entitlements = resolveEntitlements({
    subscriptionStatus: profile?.subscription_status,
    subscriptionPlan: profile?.subscription_plan,
  });

  if (!entitlements.officialCourses && user.email) {
    const sync = await syncPaidEntitlementFromStripe({
      email: user.email,
      userId: user.id,
    });
    if (sync.synced) {
      entitlements = { ...entitlements, officialCourses: true, isPaid: true };
    }
  }

  if (!entitlements.officialCourses) {
    return {
      allowed: false,
      code: 'premium_required',
      message: 'Suscripción requerida para acceder a esta unidad.',
    };
  }

  const state = await getViewerCourseSequentialState(courseId, totalUnits);
  if (!state.sequentialMode) {
    return { allowed: true, reason: 'paid' };
  }

  const unitNumber = parseUnitNumber(unitId);
  if (!unitNumber) {
    return { allowed: true, reason: 'paid' };
  }

  if (!canAccessUnitInSequentialMode(unitNumber, state.currentUnitNumber)) {
    return {
      allowed: false,
      code: 'sequential_locked',
      currentUnitNumber: state.currentUnitNumber,
      message: `Solo puedes acceder a la unidad ${state.currentUnitNumber} por ahora.`,
    };
  }

  return { allowed: true, reason: 'paid' };
}
