import { createClient } from "@/lib/supabase/server";
import { getUserProfileByAuthId } from "@/lib/access/user-profile";
import { resolveEntitlements } from "@/lib/access/entitlements";
import { syncPaidEntitlementFromStripe } from "@/lib/stripe/provision-subscriber";
import { aggregateLessonProgressByUnit, mapA1ProgressRows, mergeUnitProgress } from "@/lib/progress/aggregate";
import { parseLastSeenPath } from "@/lib/access/parse-last-seen-path";
import {
  getCurrentUnitNumber,
  parseUnitNumber,
  canAccessUnitInSequentialMode,
} from "@/lib/access/sequential-unit-access";
import { isFreeAccessMode } from "@/lib/product-config";

export type ViewerCourseSequentialState = {
  isPaid: boolean;
  isAdmin: boolean;
  /** Suscripción activa: una unidad a la vez. */
  sequentialMode: boolean;
  currentUnitNumber: number;
  completedUnits: number;
  totalUnits: number;
};

export async function getViewerCourseSequentialState(
  courseId: string,
  totalUnits: number
): Promise<ViewerCourseSequentialState> {
  const fallback: ViewerCourseSequentialState = {
    isPaid: false,
    isAdmin: false,
    sequentialMode: false,
    currentUnitNumber: 1,
    completedUnits: 0,
    totalUnits,
  };

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return fallback;

    let profile = await getUserProfileByAuthId<{
      subscription_status?: string;
      subscription_plan?: string;
      role?: string;
    }>(supabase, user.id, "subscription_status, subscription_plan, role");

    const isAdmin = profile?.role === "admin";
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

    const isPaid = isAdmin || entitlements.officialCourses;
    const progressRows = await fetchUnifiedProgress(supabase, user.id, courseId);
    const currentUnitNumber = getCurrentUnitNumber(progressRows, totalUnits);
    const completedUnits = progressRows.filter((p) => p.status === "completed").length;

    return {
      isPaid,
      isAdmin,
      sequentialMode: isFreeAccessMode() ? false : isPaid && !isAdmin,
      currentUnitNumber,
      completedUnits,
      totalUnits,
    };
  } catch (err) {
    console.error("[getViewerCourseSequentialState]", err);
    return fallback;
  }
}

export async function assertSequentialUnitAccess(params: {
  unitId: string;
  courseId: string;
  coursePath: string;
  totalUnits: number;
}): Promise<void> {
  const { unitId, courseId, coursePath, totalUnits } = params;
  const unitNumber = parseUnitNumber(unitId);
  if (!unitNumber) return;

  const state = await getViewerCourseSequentialState(courseId, totalUnits);
  if (!state.sequentialMode) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const profile = await getUserProfileByAuthId<{ last_seen_path?: string }>(
      supabase,
      user.id,
      "last_seen_path"
    );
    const assigned = parseLastSeenPath(profile?.last_seen_path);
    if (
      assigned &&
      assigned.coursePath === coursePath &&
      assigned.unitNumber === unitNumber
    ) {
      return;
    }
  }

  if (!canAccessUnitInSequentialMode(unitNumber, state.currentUnitNumber)) {
    const { redirect } = await import("next/navigation");
    redirect(`${coursePath}/unit-${state.currentUnitNumber}`);
  }
}

async function fetchUnifiedProgress(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  courseId: string
) {
  const { data, error } = await supabase
    .from("user_lesson_progress")
    .select(
      "unit_id, status, exercises_completed, exercises_total, attempts, correct_count, last_activity_at"
    )
    .eq("user_id", userId)
    .eq("course_id", courseId);

  if (error) {
    console.error("[getViewerCourseSequentialState] progress error", error);
  }

  const unified = aggregateLessonProgressByUnit(data ?? []);

  if (courseId !== "ingles-a1") {
    return unified;
  }

  const { data: a1Rows, error: a1Error } = await supabase
    .from("a1_progress")
    .select(
      "unit_id, exercises_completed, exercises_total, accuracy_percentage, status, last_activity"
    )
    .eq("user_id", userId);

  if (a1Error) {
    console.error("[getViewerCourseSequentialState] a1 progress error", a1Error);
    return unified;
  }

  return mergeUnitProgress(unified, mapA1ProgressRows(a1Rows ?? []));
}
