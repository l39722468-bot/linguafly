"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  saveLearningProfile,
  type LearningProfileFormState,
} from "@/lib/profile/actions";

const levelOptions = [
  { value: "A1", label: "A1 · Principiante" },
  { value: "A2", label: "A2 · Básico" },
  { value: "B1", label: "B1 · Intermedio" },
  { value: "B2", label: "B2 · Intermedio avanzado" },
  { value: "C1", label: "C1 · Avanzado" },
  { value: "C2", label: "C2 · Dominio" },
];

const languageOptions = [
  { value: "es", label: "Español" },
  { value: "ca", label: "Català" },
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "pt", label: "Português" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
];

const fieldClassName =
  "mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-base text-stone-900 outline-none ring-stone-400 focus:ring-2";

type LearningProfileFormProps = {
  initialCefrLevel: string | null;
  initialExplanationLanguage: string;
  initialLearningGoal: string | null;
};

export function LearningProfileForm({
  initialCefrLevel,
  initialExplanationLanguage,
  initialLearningGoal,
}: LearningProfileFormProps) {
  const router = useRouter();
  const [state, setState] = useState<LearningProfileFormState>(null);
  const [isPending, setIsPending] = useState(false);
  const [cefrLevel, setCefrLevel] = useState(initialCefrLevel ?? "");
  const [explanationLanguage, setExplanationLanguage] = useState(
    initialExplanationLanguage,
  );
  const [learningGoal, setLearningGoal] = useState(initialLearningGoal ?? "");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Build FormData before awaiting the server action so it contains the
    // exact values currently selected by the user.
    const formData = new FormData(event.currentTarget);
    setIsPending(true);

    try {
      const result = await saveLearningProfile(state, formData);
      setState(result);

      if (result?.status === "success") {
        // Sync every field from the values D1 confirmed, without relying on
        // React's automatic form-action reset behavior.
        setCefrLevel(result.profile.cefrLevel ?? "");
        setExplanationLanguage(result.profile.explanationLanguage);
        setLearningGoal(result.profile.learningGoal ?? "");
        router.refresh();
      }
    } catch {
      setState({
        status: "error",
        message: "No se han podido guardar las preferencias. Inténtalo de nuevo.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Tu plan de aprendizaje
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Personaliza tus preferencias. Podrás cambiarlas cuando quieras.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <label
          htmlFor="cefrLevel"
          className="block text-sm font-medium text-stone-700"
        >
          Tu nivel de inglés
          <select
            id="cefrLevel"
            name="cefrLevel"
            value={cefrLevel}
            onChange={(event) => setCefrLevel(event.target.value)}
            className={fieldClassName}
            disabled={isPending}
          >
            <option value="">Todavía no lo sé</option>
            {levelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label
          htmlFor="explanationLanguage"
          className="block text-sm font-medium text-stone-700"
        >
          Idioma de las explicaciones
          <select
            id="explanationLanguage"
            name="explanationLanguage"
            value={explanationLanguage}
            onChange={(event) => setExplanationLanguage(event.target.value)}
            required
            className={fieldClassName}
            disabled={isPending}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label
          htmlFor="learningGoal"
          className="block text-sm font-medium text-stone-700"
        >
          ¿Qué te gustaría conseguir?
          <textarea
            id="learningGoal"
            name="learningGoal"
            value={learningGoal}
            onChange={(event) => setLearningGoal(event.target.value)}
            maxLength={200}
            rows={3}
            placeholder="Ej.: ganar confianza al hablar inglés en reuniones y viajes."
            className={fieldClassName}
            disabled={isPending}
          />
          <span className="mt-1 block text-xs font-normal text-stone-500">
            Hasta 200 caracteres. Puedes dejarlo en blanco.
          </span>
        </label>

        {state?.status === "error" ? (
          <p role="alert" className="text-sm text-red-700">
            {state.message}
          </p>
        ) : null}

        {state?.status === "success" ? (
          <p role="status" className="text-sm text-emerald-700">
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-stone-900 px-4 py-3 text-base font-medium text-white disabled:opacity-60"
        >
          {isPending ? "Guardando…" : "Guardar preferencias"}
        </button>
      </form>
    </section>
  );
}
