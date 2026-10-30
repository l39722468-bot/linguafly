"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth/server";
import { getBand, questionSets } from "@/lib/practice/question-bank";

export type SubmittedPracticeAnswer = {
  questionId: string;
  selectedIndex: number;
};

export type SavePracticeAttemptResult =
  | { status: "success"; score: number }
  | { status: "error"; message: string };

type PracticeProfile = {
  cefr_level: string | null;
  explanation_language: string;
};

const EXPLANATION_LANGUAGES = ["es", "ca", "en", "fr", "pt", "de", "it"] as const;

export async function savePracticeAttempt(
  answers: SubmittedPracticeAnswer[],
): Promise<SavePracticeAttemptResult> {
  if (!Array.isArray(answers) || answers.length !== 5) {
    return { status: "error", message: "La práctica debe contener cinco respuestas." };
  }

  const auth = await getAuth().catch(() => null);
  if (!auth) redirect("/login?error=config");

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as unknown as CloudflareEnv;
    const db = env.AUTH_DB;

    // Profile and user ID come exclusively from the verified server-side session.
    await db.prepare(
      "INSERT OR IGNORE INTO profiles (user_id) VALUES (?)",
    )
      .bind(session.user.id)
      .run();

    const profile = await db.prepare(
      "SELECT cefr_level, explanation_language FROM profiles WHERE user_id = ?",
    )
      .bind(session.user.id)
      .first<PracticeProfile>();

    const expectedQuestions = questionSets[getBand(profile?.cefr_level ?? null)];
    const expectedById = new Map(expectedQuestions.map((question) => [question.id, question]));
    const seen = new Set<string>();

    for (const answer of answers) {
      if (
        !answer ||
        typeof answer.questionId !== "string" ||
        !Number.isInteger(answer.selectedIndex)
      ) {
        return { status: "error", message: "Una de las respuestas no es válida." };
      }

      const question = expectedById.get(answer.questionId);
      if (
        !question ||
        seen.has(answer.questionId) ||
        answer.selectedIndex < 0 ||
        answer.selectedIndex >= question.options.length
      ) {
        return { status: "error", message: "Las respuestas no corresponden a tu práctica." };
      }

      seen.add(answer.questionId);
    }

    if (seen.size !== expectedQuestions.length) {
      return { status: "error", message: "Faltan preguntas de la práctica." };
    }

    // Never trust a score or correctness value supplied by the browser.
    const validatedAnswers = answers.map((answer) => {
      const question = expectedById.get(answer.questionId)!;
      return {
        questionId: question.id,
        skill: question.skill,
        selectedIndex: answer.selectedIndex,
        correctIndex: question.correctIndex,
        isCorrect: answer.selectedIndex === question.correctIndex ? 1 : 0,
      };
    });
    const score = validatedAnswers.reduce((sum, answer) => sum + answer.isCorrect, 0);

    const explanationLanguage =
      profile &&
      EXPLANATION_LANGUAGES.includes(
        profile.explanation_language as (typeof EXPLANATION_LANGUAGES)[number],
      )
        ? profile.explanation_language
        : "es";

    const insertAttempt = await db.prepare(
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

    const attemptId = insertAttempt.meta.last_row_id;
    if (typeof attemptId !== "number" || !Number.isInteger(attemptId) || attemptId < 1) {
      throw new Error("No se pudo obtener el identificador de la práctica guardada.");
    }

    try {
      await db.batch(
        validatedAnswers.map((answer) =>
          db.prepare(
            `INSERT INTO practice_question_results
               (attempt_id, user_id, question_id, skill, selected_index, correct_index, is_correct)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
          ).bind(
            attemptId,
            session.user.id,
            answer.questionId,
            answer.skill,
            answer.selectedIndex,
            answer.correctIndex,
            answer.isCorrect,
          ),
        ),
      );
    } catch (error) {
      // Do not leave a completed practice without its per-question analysis.
      await db.prepare(
        "DELETE FROM practice_attempts WHERE id = ? AND user_id = ?",
      )
        .bind(attemptId, session.user.id)
        .run()
        .catch(() => undefined);
      throw error;
    }

    revalidatePath("/app");
    revalidatePath("/app/practica");
    return { status: "success", score };
  } catch {
    return {
      status: "error",
      message:
        "No se ha podido guardar el resultado. Comprueba que la migración 0003 de análisis por pregunta esté aplicada e inténtalo de nuevo.",
    };
  }
}
