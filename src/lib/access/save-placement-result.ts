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

type SavePlacementResultParams = {
  supabase: SupabaseLike;
  adminSupabase?: SupabaseLike | null;
  userId: string;
  level: string;
};

async function readProfile(
  supabase: SupabaseLike,
  userId: string
): Promise<{
  id?: string;
  user_id?: string;
  learning_goals?: string[];
  language_level?: string;
  last_seen_path?: string;
} | null> {
  return getUserProfileByAuthId(supabase, userId, "id,user_id,learning_goals,language_level,last_seen_path");
}

export async function savePlacementResult(
  params: SavePlacementResultParams
): Promise<{ ok: true; level: string } | { ok: false; error: string }> {
  const { supabase, adminSupabase, userId, level } = params;
  const writeClient = adminSupabase ?? supabase;
  const normalizedLevel = normalizePlacementLevel(level);
  if (!normalizedLevel) {
    return { ok: false, error: "Invalid level" };
  }

  let profile = await readProfile(writeClient, userId);
  if (!profile) {
    profile = await readProfile(supabase, userId);
  }

  const existingGoals = Array.isArray(profile?.learning_goals)
    ? profile.learning_goals
    : [];
  const mergedGoals = Array.from(new Set([...existingGoals, "placement_completed"]));
  const hasAdminAssignment = Boolean(profile?.last_seen_path?.trim());
  const existingLevel = normalizePlacementLevel(profile?.language_level);
  const resolvedLevel =
    hasAdminAssignment && existingLevel ? existingLevel : normalizedLevel;
  const completedAt = new Date().toISOString();

  const payload = {
    language_level: resolvedLevel,
    learning_goals: mergedGoals,
    placement_completed_at: completedAt,
    updated_at: completedAt,
  };

  let error: { message: string } | null = null;

  if (profile?.user_id) {
    const res = await writeClient
      .from("user_profiles")
      .update(payload)
      .eq("user_id", userId);
    error = res.error;
  } else if (profile?.id) {
    const res = await writeClient.from("user_profiles").update(payload).eq("id", userId);
    error = res.error;
  } else {
    const { data: userRow } = await writeClient
      .from("users")
      .select("email,name")
      .eq("id", userId)
      .maybeSingle();

    const res = await writeClient.from("user_profiles").upsert(
      {
        user_id: userId,
        email: userRow?.email ?? `${userId}@focus-on-english.local`,
        name: userRow?.name ?? null,
        ...payload,
      },
      { onConflict: "user_id" }
    );
    error = res.error;
  }

  if (error) {
    return { ok: false, error: error.message };
  }

  await writeClient
    .from("users")
    .update({ language_level: resolvedLevel, updated_at: payload.updated_at })
    .eq("id", userId);

  return { ok: true, level: resolvedLevel };
}
