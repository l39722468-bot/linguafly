import type { CEFRLevel } from "@/lib/exercise-types";
import { runWorkersAIJson } from "@/lib/ai/workers-ai";

export interface EvaluationResponse {
  score: number;
  feedback: string;
  corrections: string[];
  suggestions: string[];
  metrics?: {
    grammar: number;
    vocabulary: number;
    fluency?: number;
    pronunciation?: number;
    coherence?: number;
  };
}

function score(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? Math.max(0, Math.min(100, Math.round(parsed))) : 0;
}

function textArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, 400))
    .filter(Boolean)
    .slice(0, 10);
}

export async function evaluateWithAI(
  prompt: string,
  userResponse: string,
  level: CEFRLevel,
  type: "writing" | "speaking",
): Promise<EvaluationResponse> {
  const safePrompt = typeof prompt === "string" ? prompt.slice(0, 4000) : "";
  const safeResponse = typeof userResponse === "string" ? userResponse.slice(0, 5000) : "";
  if (!safePrompt.trim() || !safeResponse.trim()) {
    throw new Error("Both the exercise prompt and student response are required.");
  }

  const metricsExample = type === "speaking"
    ? '{"grammar":80,"vocabulary":75,"fluency":80,"pronunciation":75}'
    : '{"grammar":80,"vocabulary":75,"coherence":80}';
  const systemPrompt = [
    "Eres un profesor experto de inglés especializado en el Marco Común Europeo de Referencia (MCER).",
    "Evalúa la respuesta de un estudiante de nivel " + level + " en un ejercicio de " + (type === "writing" ? "escritura" : "expresión oral") + ".",
    "Sé constructivo, justo y detallado en español. Para niveles A1/A2, tolera errores menores; para niveles superiores, sé más exigente.",
    "Basa la evaluación solo en el ejercicio y respuesta suministrados; no inventes errores ni hagas afirmaciones sobre pronunciación que no puedas deducir de una transcripción.",
    "Devuelve únicamente un JSON con esta estructura:",
    '{"score":80,"feedback":"feedback en español, máximo 200 caracteres","corrections":["errores específicos y sus correcciones"],"suggestions":["sugerencias de mejora"],"metrics":' + metricsExample + '}',
  ].join("\n");

  try {
    const evaluation = await runWorkersAIJson([
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: "NIVEL MCER: " + level + "\nTIPO: " + type +
          "\nINSTRUCCIÓN DEL EJERCICIO:\n" + safePrompt +
          "\n\nRESPUESTA DEL ESTUDIANTE:\n" + safeResponse,
      },
    ], { temperature: 0.2, maxTokens: 650 });

    const rawMetrics = evaluation.metrics && typeof evaluation.metrics === "object" && !Array.isArray(evaluation.metrics)
      ? evaluation.metrics as Record<string, unknown>
      : {};
    const metrics: NonNullable<EvaluationResponse["metrics"]> = {
      grammar: score(rawMetrics.grammar),
      vocabulary: score(rawMetrics.vocabulary),
      ...(type === "speaking"
        ? { fluency: score(rawMetrics.fluency), pronunciation: score(rawMetrics.pronunciation) }
        : { coherence: score(rawMetrics.coherence) }),
    };

    return {
      score: score(evaluation.score),
      feedback: typeof evaluation.feedback === "string"
        ? evaluation.feedback.slice(0, 500)
        : "No se pudo generar feedback.",
      corrections: textArray(evaluation.corrections),
      suggestions: textArray(evaluation.suggestions),
      metrics,
    };
  } catch (error: unknown) {
    console.error("Workers AI evaluation failed:", error instanceof Error ? error.name : "UnknownError");
    throw new Error("No se ha podido evaluar la respuesta con IA.");
  }
}
