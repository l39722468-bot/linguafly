import { NextRequest } from 'next/server';
import { getMobileAuth, mobileError, mobileJson } from '@/lib/api/mobile-auth';
import { getUserProfileByAuthId } from '@/lib/access/user-profile';
import { resolveEntitlements } from '@/lib/access/entitlements';
import { syncPaidEntitlementFromStripe } from '@/lib/stripe/provision-subscriber';
import type { MobileMeResponse } from '@/lib/mobile/types';

export async function GET(request: NextRequest) {
  const { supabase, user } = await getMobileAuth(request);
  if (!user) {
    return mobileError('No autenticado', 401, 'auth_required');
  }

  let profile = await getUserProfileByAuthId<{
    role?: string;
    subscription_status?: string | null;
    subscription_plan?: string | null;
    language_level?: string | null;
  }>(supabase, user.id, 'role, subscription_status, subscription_plan, language_level');

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

  const payload: MobileMeResponse = {
    user: {
      id: user.id,
      email: user.email,
    },
    profile: {
      role: profile?.role,
      subscriptionStatus: profile?.subscription_status ?? null,
      subscriptionPlan: profile?.subscription_plan ?? null,
      languageLevel: profile?.language_level ?? null,
    },
    entitlements: {
      isPaid: entitlements.isPaid,
      officialCourses: entitlements.officialCourses,
      tier: entitlements.tier,
    },
  };

  return mobileJson(payload);
}
