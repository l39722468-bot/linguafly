export type PracticeBand = "basic" | "intermediate" | "advanced";

export type PracticeQuestion = {
  id: string;
  skill: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanationKey: string;
};

export const questionSets: Record<PracticeBand, PracticeQuestion[]> = {
  basic: [
    { id: "present-simple-third-person", skill: "present-simple", prompt: "He ___ to work by bus every day.", options: ["go", "goes", "going"], correctIndex: 1, explanationKey: "presentSimple" },
    { id: "present-continuous", skill: "present-continuous", prompt: "They ___ dinner at the moment.", options: ["have", "has", "are having"], correctIndex: 2, explanationKey: "presentContinuous" },
    { id: "past-simple", skill: "past-simple", prompt: "Yesterday, I ___ my friend in town.", options: ["see", "saw", "seen"], correctIndex: 1, explanationKey: "pastSimple" },
    { id: "quantifiers-much", skill: "quantifiers", prompt: "There isn't ___ milk left.", options: ["many", "much", "a few"], correctIndex: 1, explanationKey: "much" },
    { id: "modal-could-base", skill: "polite-requests", prompt: "Could you ___ the window, please?", options: ["opened", "opening", "open"], correctIndex: 2, explanationKey: "politeRequest" },
  ],
  intermediate: [
    { id: "present-perfect-since", skill: "present-perfect", prompt: "I ___ in London since 2021.", options: ["live", "have lived", "am living"], correctIndex: 1, explanationKey: "presentPerfectSince" },
    { id: "second-conditional", skill: "second-conditional", prompt: "If I ___ more time, I'd learn Italian.", options: ["have", "will have", "had"], correctIndex: 2, explanationKey: "secondConditional" },
    { id: "be-used-to-gerund", skill: "be-used-to-gerund", prompt: "She's used to ___ early.", options: ["get up", "getting up", "gets up"], correctIndex: 1, explanationKey: "usedTo" },
    { id: "causative-have", skill: "causative-have", prompt: "We had the report ___ before Friday.", options: ["finished", "finish", "finishing"], correctIndex: 0, explanationKey: "causativeHave" },
    { id: "despite-gerund", skill: "gerund-after-preposition", prompt: "Despite ___ tired, he continued working.", options: ["be", "was", "being"], correctIndex: 2, explanationKey: "despiteIng" },
  ],
  advanced: [
    { id: "inversion-hardly", skill: "inversion-hardly", prompt: "Hardly ___ the meeting started when the alarm went off.", options: ["had", "did", "has"], correctIndex: 0, explanationKey: "hardly" },
    { id: "relative-which-clause", skill: "relative-clauses", prompt: "The proposal was rejected, ___ surprised no one.", options: ["that", "which", "what"], correctIndex: 1, explanationKey: "whichClause" },
    { id: "would-rather-past-simple", skill: "would-rather", prompt: "I would rather you ___ this confidential.", options: ["keep", "kept", "will keep"], correctIndex: 1, explanationKey: "wouldRather" },
    { id: "compelling-vocabulary", skill: "vocabulary-precision", prompt: "Her argument is cogent, but not entirely ___.", options: ["compelling", "compelled", "compel"], correctIndex: 0, explanationKey: "compelling" },
    { id: "third-conditional", skill: "third-conditional", prompt: "Were it not for her advice, we ___ the contract.", options: ["will lose", "had lost", "would have lost"], correctIndex: 2, explanationKey: "thirdConditional" },
  ],
};

export function getBand(level: string | null): PracticeBand {
  if (level === "C1" || level === "C2") return "advanced";
  if (level === "B1" || level === "B2") return "intermediate";
  return "basic";
}
