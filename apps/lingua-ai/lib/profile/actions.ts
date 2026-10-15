"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth/server";

export type LearningProfileFormState =
  | null
  | { status: "error"; message: string }
  | { status: "success"; message: string };

const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const EXPLANATION_LANGUAGES = ["es", "ca", "en", "fr", "pt", "de", "it"] as const;

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
      .bind(level || null, explanationLanguage, learningGoal || null, session.user.id)
      .run();
  } catch {
    return {
      status: "error",
      message: "No se han podido guardar las preferencias. Inténtalo de nuevo.",
    };
  }

  revalidatePath("/app");
  return { status: "success", message: "Preferencias guardadas correctamente." };
}
