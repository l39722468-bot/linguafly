import { getUserProfileByAuthId } from "@/lib/access/user-profile";

const VALID_LEVELS = new Set(["A1", "A2", "B1", "B2", "C1", "C2"]);

export function normalizePlacementLevel(level?: string | null): string | null {
  if (!level) return null;
  const upper = level.toUpperCase().trim();
  return VALID_LEVELS.has(upper) ? upper : null;
}

type SupabaseLike = {
  from: (table: string) => any;
};

export async function savePlacementResult(params: {
  supabase: SupabaseLike;
  userId: string;
  level: string;
}): Promise<{ ok: true; level: string } | { ok: false; error: string }> {
  const { supabase, userId, level } = params;
  const normalizedLevel = normalizePlacementLevel(level);
  if (!normalizedLevel) {
    return { ok: false, error: "Invalid level" };
  }

  const profile = await getUserProfileByAuthId<{
    id?: string;
    user_id?: string;
    learning_goals?: string[];
    language_level?: string;
    last_seen_path?: string;
  }>(supabase, userId, "id,user_id,learning_goals,language_level,last_seen_path");

  const existingGoals = Array.isArray(profile?.learning_goals)
    ? profile.learning_goals
    : [];
  const mergedGoals = Array.from(new Set([...existingGoals, "placement_completed"]));
  const hasAdminAssignment = Boolean(profile?.last_seen_path?.trim());
  const existingLevel = normalizePlacementLevel(profile?.language_level);
  const resolvedLevel =
    hasAdminAssignment && existingLevel ? existingLevel : normalizedLevel;

  const payload = {
    language_level: resolvedLevel,
    learning_goals: mergedGoals,
    updated_at: new Date().toISOString(),
  };

  let error: { message: string } | null = null;

  if (profile?.user_id) {
    const res = await supabase
      .from("user_profiles")
      .update(payload)
      .eq("user_id", userId);
    error = res.error;
  } else if (profile?.id) {
    const res = await supabase.from("user_profiles").update(payload).eq("id", userId);
    error = res.error;
  } else {
    const res = await supabase.from("user_profiles").upsert(
      {
        user_id: userId,
        ...payload,
      },
      { onConflict: "user_id" }
    );
    error = res.error;
  }

  if (error) {
    return { ok: false, error: error.message };
  }

  await supabase
    .from("users")
    .update({ language_level: resolvedLevel, updated_at: payload.updated_at })
    .eq("id", userId);

  return { ok: true, level: resolvedLevel };
}
