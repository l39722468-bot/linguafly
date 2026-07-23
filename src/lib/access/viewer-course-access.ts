import { createClient } from "@/lib/supabase/server";
import { getUserProfileByAuthId } from "@/lib/access/user-profile";
import { resolveEntitlements } from "@/lib/access/entitlements";

/** Indica si el visitante actual tiene acceso completo a los cursos A1–C2. */
export async function getViewerHasFullCourseAccess(): Promise<boolean> {
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
    }>(supabase, user.id, "subscription_status, subscription_plan, role");

    if (profile?.role === "admin") return true;

    return resolveEntitlements({
      subscriptionStatus: profile?.subscription_status,
      subscriptionPlan: profile?.subscription_plan,
    }).officialCourses;
  } catch {
    return false;
  }
}
