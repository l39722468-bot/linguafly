"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth/server";

export type SavedLearningProfile = {
  cefrLevel: string | null;
  explanationLanguage: string;
  learningGoal: string | null;
};

export type LearningProfileFormState =
  | null
  | { status: "error"; message: string }
  | { status: "success"; message: string; profile: SavedLearningProfile };

const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const EXPLANATION_LANGUAGES = ["es", "ca", "en", "fr", "pt", "de", "it"] as const;

type ProfileRow = {
  cefr_level: string | null;
  explanation_language: string;
  learning_goal: string | null;
};

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function saveLearningProfile(
  _previous: LearningProfileFormState,
  formData: FormData,
): Promise<LearningProfileFormState> {
  const level = readText(formData, "cefrLevel");
  const explanationLanguage = readText(formData, "explanationLanguage");
  const learningGoal = readText(formData, "learningGoal");
  const expectedLevel = level || null;
  const expectedGoal = learningGoal || null;

  if (level && !CEFR_LEVELS.includes(level as (typeof CEFR_LEVELS)[number])) {
    return { status: "error", message: "Selecciona un nivel de inglés válido." };
  }

  if (
    !EXPLANATION_LANGUAGES.includes(
      explanationLanguage as (typeof EXPLANATION_LANGUAGES)[number],
    )
  ) {
    return { status: "error", message: "Selecciona un idioma de explicación válido." };
  }

  if (learningGoal.length > 200) {
    return {
      status: "error",
      message: "El objetivo debe tener 200 caracteres o menos.",
    };
  }

  const auth = await getAuth().catch(() => null);
  if (!auth) redirect("/login?error=config");

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as unknown as CloudflareEnv;

    // Never accept a user ID from the form; use only the validated session.
    await env.AUTH_DB.prepare(
      "INSERT OR IGNORE INTO profiles (user_id) VALUES (?)",
    )
      .bind(session.user.id)
      .run();

    await env.AUTH_DB.prepare(
      `UPDATE profiles
       SET cefr_level = ?, explanation_language = ?, learning_goal = ?,
           updated_at = CAST(strftime('%s', 'now') AS INTEGER) * 1000
       WHERE user_id = ?`,
    )
      .bind(expectedLevel, explanationLanguage, expectedGoal, session.user.id)
      .run();

    // Do not report success unless D1 confirms the submitted values persisted.
    const saved = await env.AUTH_DB.prepare(
      "SELECT cefr_level, explanation_language, learning_goal FROM profiles WHERE user_id = ?",
    )
      .bind(session.user.id)
      .first<ProfileRow>();

    if (
      !saved ||
      saved.cefr_level !== expectedLevel ||
      saved.explanation_language !== explanationLanguage ||
      saved.learning_goal !== expectedGoal
    ) {
      return {
        status: "error",
        message:
          "La base de datos no ha confirmado los cambios. Recarga la página e inténtalo de nuevo.",
      };
    }

    revalidatePath("/app");
    return {
      status: "success",
      message: "Preferencias guardadas correctamente.",
      profile: {
        cefrLevel: saved.cefr_level,
        explanationLanguage: saved.explanation_language,
        learningGoal: saved.learning_goal,
      },
    };
  } catch {
    return {
      status: "error",
      message: "No se han podido guardar las preferencias. Inténtalo de nuevo.",
    };
  }
}
