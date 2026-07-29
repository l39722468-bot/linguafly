import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type PlacementPayload = {
  level?: string;
};

const VALID_LEVELS = new Set(["A1", "A2", "B1", "B2", "C1", "C2"]);

function normalizeLevel(level?: string): string | null {
  if (!level) return null;
  const upper = level.toUpperCase().trim();
  return VALID_LEVELS.has(upper) ? upper : null;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as PlacementPayload;
    const level = normalizeLevel(body.level);
    if (!level) {
      return NextResponse.json({ success: false, error: "Invalid level" }, { status: 400 });
    }

    const { data: byIdProfile } = await supabase
      .from("user_profiles")
      .select("learning_goals, language_level, last_seen_path")
      .eq("id", user.id)
      .maybeSingle();
    const { data: byUserIdProfile } = await supabase
      .from("user_profiles")
      .select("learning_goals, language_level, last_seen_path")
      .eq("user_id", user.id)
      .maybeSingle();
    const profile = byIdProfile ?? byUserIdProfile;

    const existingGoals = Array.isArray(profile?.learning_goals)
      ? (profile?.learning_goals as string[])
      : [];

    const mergedGoals = Array.from(new Set([...existingGoals, "placement_completed"]));
    const hasAdminAssignment = Boolean(profile?.last_seen_path?.trim());
    const existingLevel = normalizeLevel(
      typeof profile?.language_level === "string" ? profile.language_level : undefined
    );

    const payload = {
      language_level: hasAdminAssignment && existingLevel ? existingLevel : level,
      placement_completed: true,
      learning_goals: mergedGoals,
      updated_at: new Date().toISOString(),
    };
    let profileError: { message: string } | null = null;

    const { error: upsertByIdError } = await supabase
      .from("user_profiles")
      .upsert(
        {
          id: user.id,
          user_id: user.id,
          ...payload,
        },
        { onConflict: "id" }
      );

    if (upsertByIdError) {
      const { error: upsertByUserIdError } = await supabase
        .from("user_profiles")
        .upsert(
          {
            user_id: user.id,
            ...payload,
          },
          { onConflict: "user_id" }
        );
      profileError = upsertByUserIdError;
    }

    if (profileError) {
      return NextResponse.json(
        { success: false, error: profileError.message },
        { status: 500 }
      );
    }

    const { error: userError } = await supabase
      .from("users")
      .update({
        language_level: hasAdminAssignment && existingLevel ? existingLevel : level,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (userError) {
      // No bloqueamos el flujo si falla esta tabla secundaria.
      console.warn("Placement saved in user_profiles but users update failed:", userError.message);
    }

    return NextResponse.json({ success: true, level });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal error" },
      { status: 500 }
    );
  }
}

