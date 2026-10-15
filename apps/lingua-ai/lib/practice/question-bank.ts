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

// Alternative questions let the app reinforce recurring mistakes without simply
// repeating the exact sentence the learner has just seen.
export const questionVariants: Record<PracticeBand, PracticeQuestion[]> = {
  basic: [
    { id: "present-simple-sister-drinks", skill: "present-simple", prompt: "My sister ___ coffee every morning.", options: ["drink", "drinks", "drinking"], correctIndex: 1, explanationKey: "presentSimple" },
    { id: "present-continuous-children", skill: "present-continuous", prompt: "Look! The children ___ in the garden.", options: ["play", "plays", "are playing"], correctIndex: 2, explanationKey: "presentContinuous" },
    { id: "past-simple-weekend", skill: "past-simple", prompt: "Last weekend, we ___ to the beach.", options: ["go", "went", "gone"], correctIndex: 1, explanationKey: "pastSimple" },
    { id: "quantifiers-water", skill: "quantifiers", prompt: "How ___ water do you drink each day?", options: ["many", "much", "few"], correctIndex: 1, explanationKey: "much" },
    { id: "polite-request-help", skill: "polite-requests", prompt: "Could you ___ me with this bag?", options: ["help", "helped", "helping"], correctIndex: 0, explanationKey: "politeRequest" },
  ],
  intermediate: [
    { id: "present-perfect-for", skill: "present-perfect", prompt: "She ___ here for three years.", options: ["works", "has worked", "is working"], correctIndex: 1, explanationKey: "presentPerfectSince" },
    { id: "second-conditional-study", skill: "second-conditional", prompt: "If he ___ harder, he would pass.", options: ["studies", "studied", "will study"], correctIndex: 1, explanationKey: "secondConditional" },
    { id: "used-to-work", skill: "be-used-to-gerund", prompt: "I'm not used to ___ so late.", options: ["work", "working", "worked"], correctIndex: 1, explanationKey: "usedTo" },
    { id: "causative-phone", skill: "causative-have", prompt: "I had my phone ___ yesterday.", options: ["repair", "repaired", "repairing"], correctIndex: 1, explanationKey: "causativeHave" },
    { id: "despite-raining", skill: "gerund-after-preposition", prompt: "Despite ___ heavily, they walked home.", options: ["rained", "raining", "rain"], correctIndex: 1, explanationKey: "despiteIng" },
  ],
  advanced: [
    { id: "inversion-hardly-sat", skill: "inversion-hardly", prompt: "Hardly ___ I sat down when the phone rang.", options: ["had", "did", "have"], correctIndex: 0, explanationKey: "hardly" },
    { id: "relative-which-delayed", skill: "relative-clauses", prompt: "She missed the train, ___ delayed her arrival.", options: ["that", "which", "what"], correctIndex: 1, explanationKey: "whichClause" },
    { id: "would-rather-keep", skill: "would-rather", prompt: "I'd rather you ___ the door locked.", options: ["keep", "kept", "will keep"], correctIndex: 1, explanationKey: "wouldRather" },
    { id: "compelling-evidence", skill: "vocabulary-precision", prompt: "The evidence was persuasive and highly ___.", options: ["compel", "compelled", "compelling"], correctIndex: 2, explanationKey: "compelling" },
    { id: "third-conditional-flight", skill: "third-conditional", prompt: "Had they left earlier, they ___ the flight.", options: ["would catch", "would have caught", "caught"], correctIndex: 1, explanationKey: "thirdConditional" },
  ],
};

export function getBand(level: string | null): PracticeBand {
  if (level === "C1" || level === "C2") return "advanced";
  if (level === "B1" || level === "B2") return "intermediate";
  return "basic";
}

export function getQuestionPool(level: string | null): PracticeQuestion[] {
  const band = getBand(level);
  return [...questionSets[band], ...questionVariants[band]];
}

/**
 * Repeats the two weakest skills with a different question when prior attempts
 * show errors. With no history, it returns the familiar five-question session.
 */
export function selectPracticeQuestions(
  level: string | null,
  weakSkills: string[],
): PracticeQuestion[] {
  const band = getBand(level);
  const base = questionSets[band];
  const variants = questionVariants[band];
  const variantBySkill = new Map(variants.map((question) => [question.skill, question]));
  const baseBySkill = new Map(base.map((question) => [question.skill, question]));
  const prioritized = [...new Set(weakSkills)].filter(
    (skill) => baseBySkill.has(skill) && variantBySkill.has(skill),
  ).slice(0, 2);

  if (prioritized.length === 0) return base;

  const focused: PracticeQuestion[] = [];
  for (const skill of prioritized) {
    focused.push(baseBySkill.get(skill)!, variantBySkill.get(skill)!);
  }

  const remaining = base.filter((question) => !prioritized.includes(question.skill));
  return [...focused, ...remaining.slice(0, 5 - focused.length)];
}
