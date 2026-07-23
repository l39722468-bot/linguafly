import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserProfileByAuthId } from "@/lib/access/user-profile";
import { resolveEntitlements } from "@/lib/access/entitlements";
import { isFreeUnitId } from "@/lib/access/unit-access";

/**
 * Bloquea unidades de pago en Server Components / layouts.
 * La unidad 1 permanece gratuita.
 */
export async function assertCourseUnitAccess(unitId: string, coursePath: string) {
  if (isFreeUnitId(unitId)) return;

  const nextPath = `${coursePath}/${unitId}`;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const profile = await getUserProfileByAuthId<{
        subscription_status?: string;
        subscription_plan?: string;
        role?: string;
      }>(supabase, user.id, "subscription_status, subscription_plan, role");

      if (profile?.role === "admin") return;

      const entitlements = resolveEntitlements({
        subscriptionStatus: profile?.subscription_status,
        subscriptionPlan: profile?.subscription_plan,
      });

      if (entitlements.officialCourses) return;
    }
  } catch (err) {
    console.error("[assertCourseUnitAccess]", err);
  }

  redirect(`/planes?reason=premium_required&next=${encodeURIComponent(nextPath)}`);
}
