import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserProfileByAuthId } from "@/lib/access/user-profile";
import { resolveEntitlements } from "@/lib/access/entitlements";
import { isFreeUnitId } from "@/lib/access/unit-access";
import { syncPaidEntitlementFromStripe } from "@/lib/stripe/provision-subscriber";
import { coursePathToId } from "@/lib/access/course-id-map";
import { assertSequentialUnitAccess } from "@/lib/access/get-viewer-course-sequential-state";
import { premiumCourseServerService } from "@/lib/services/premium-course-service.server";
import { isFreeAccessMode } from "@/lib/product-config";

async function getTotalUnitsForCoursePath(coursePath: string): Promise<number> {
  switch (coursePath) {
    case "/curso-a1":
      return (await premiumCourseServerService.getA1UnitsWithMetadata()).totalUnits;
    case "/curso-a2":
      return (await premiumCourseServerService.getA2UnitsWithMetadata()).totalUnits;
    case "/curso-b1":
      return (await premiumCourseServerService.getB1UnitsWithMetadata()).totalUnits;
    case "/curso-b2":
      return (await premiumCourseServerService.getB2UnitsWithMetadata()).totalUnits;
    case "/curso-c1":
      return (await premiumCourseServerService.getC1UnitsWithMetadata()).totalUnits;
    case "/curso-c2":
      return (await premiumCourseServerService.getC2UnitsWithMetadata()).totalUnits;
    default:
      return 60;
  }
}

/**
 * Bloquea unidades de pago en Server Components / layouts.
 * La unidad 1 permanece gratuita.
 * Suscriptores: solo la unidad activa (primera no completada).
 */
export async function assertCourseUnitAccess(unitId: string, coursePath: string) {
  if (isFreeAccessMode()) return;

  if (isFreeUnitId(unitId)) return;

  const nextPath = `${coursePath}/${unitId}`;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      let profile = await getUserProfileByAuthId<{
        subscription_status?: string;
        subscription_plan?: string;
        role?: string;
      }>(supabase, user.id, "subscription_status, subscription_plan, role");

      if (profile?.role === "admin") return;

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
          const courseId = coursePathToId(coursePath);
          if (courseId) {
            const totalUnits = await getTotalUnitsForCoursePath(coursePath);
            await assertSequentialUnitAccess({ unitId, courseId, coursePath, totalUnits });
          }
          return;
        }

        profile = await getUserProfileByAuthId<{
          subscription_status?: string;
          subscription_plan?: string;
          role?: string;
        }>(supabase, user.id, "subscription_status, subscription_plan, role");

        entitlements = resolveEntitlements({
          subscriptionStatus: profile?.subscription_status,
          subscriptionPlan: profile?.subscription_plan,
        });
      }

      if (entitlements.officialCourses) {
        const courseId = coursePathToId(coursePath);
        if (courseId) {
          const totalUnits = await getTotalUnitsForCoursePath(coursePath);
          await assertSequentialUnitAccess({ unitId, courseId, coursePath, totalUnits });
        }
        return;
      }
    }
  } catch (err) {
    console.error("[assertCourseUnitAccess]", err);
  }

  redirect(`/planes?reason=premium_required&next=${encodeURIComponent(nextPath)}`);
}
