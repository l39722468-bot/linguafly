"use client";

import { useActionState } from "react";
import { saveLearningProfile } from "@/lib/profile/actions";
import { SubmitButton } from "@/components/auth/submit-button";

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
  const [state, action] = useActionState(saveLearningProfile, null);

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

      <form action={action} className="mt-6 space-y-5">
        <label
          htmlFor="cefrLevel"
          className="block text-sm font-medium text-stone-700"
        >
          Tu nivel de inglés
          <select
            id="cefrLevel"
            name="cefrLevel"
            defaultValue={initialCefrLevel ?? ""}
            className={fieldClassName}
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
            defaultValue={initialExplanationLanguage}
            required
            className={fieldClassName}
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
            defaultValue={initialLearningGoal ?? ""}
            maxLength={200}
            rows={3}
            placeholder="Ej.: ganar confianza al hablar inglés en reuniones y viajes."
            className={fieldClassName}
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

        <SubmitButton label="Guardar preferencias" />
      </form>
    </section>
  );
}
