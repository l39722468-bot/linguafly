import { createClient } from "@/lib/supabase/server";
import { getUserProfileByAuthId } from "@/lib/access/user-profile";
import { resolveEntitlements } from "@/lib/access/entitlements";
import { syncPaidEntitlementFromStripe } from "@/lib/stripe/provision-subscriber";

/** Indica si el visitante actual tiene acceso completo a los cursos A1–C2. */
export async function getViewerHasFullCourseAccess(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    let profile = await getUserProfileByAuthId<{
      subscription_status?: string;
      subscription_plan?: string;
      role?: string;
    }>(supabase, user.id, "subscription_status, subscription_plan, role");

    if (profile?.role === "admin") return true;

    let entitlements = resolveEntitlements({
      subscriptionStatus: profile?.subscription_status,
      subscriptionPlan: profile?.subscription_plan,
    });

    if (!entitlements.officialCourses && user.email) {
      const sync = await syncPaidEntitlementFromStripe({
        email: user.email,
        userId: user.id,
      });
      if (sync.synced) return true;
    }

    return entitlements.officialCourses;
  } catch {
    return false;
  }
}
