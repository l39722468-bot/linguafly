"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth/server";

export type SavePracticeAttemptResult =
  | { status: "success" }
  | { status: "error"; message: string };

type PracticeProfile = {
  cefr_level: string | null;
  explanation_language: string;
};

const EXPLANATION_LANGUAGES = ["es", "ca", "en", "fr", "pt", "de", "it"] as const;

export async function savePracticeAttempt(
  score: number,
): Promise<SavePracticeAttemptResult> {
  if (!Number.isInteger(score) || score < 0 || score > 5) {
    return { status: "error", message: "La puntuación no es válida." };
  }

  const auth = await getAuth().catch(() => null);
  if (!auth) redirect("/login?error=config");

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as unknown as CloudflareEnv;

    // Create the profile if needed; the user identity always comes from session.
    await env.AUTH_DB.prepare(
      "INSERT OR IGNORE INTO profiles (user_id) VALUES (?)",
    )
      .bind(session.user.id)
      .run();

    const profile = await env.AUTH_DB.prepare(
      "SELECT cefr_level, explanation_language FROM profiles WHERE user_id = ?",
    )
      .bind(session.user.id)
      .first<PracticeProfile>();

    const explanationLanguage =
      profile &&
      EXPLANATION_LANGUAGES.includes(
        profile.explanation_language as (typeof EXPLANATION_LANGUAGES)[number],
      )
        ? profile.explanation_language
        : "es";

    await env.AUTH_DB.prepare(
      `INSERT INTO practice_attempts
         (user_id, score, total_questions, cefr_level, explanation_language)
       VALUES (?, ?, 5, ?, ?)`,
    )
      .bind(
        session.user.id,
        score,
        profile?.cefr_level ?? null,
        explanationLanguage,
      )
      .run();

    revalidatePath("/app");
    revalidatePath("/app/practica");
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message:
        "No se ha podido guardar el resultado. Comprueba que la migración de progreso esté aplicada e inténtalo de nuevo.",
    };
  }
}
