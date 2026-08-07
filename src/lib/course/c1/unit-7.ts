/**
 * C1 Unit 7 — Health and Mind
 * Módulo 1 (bloque temático): Persona, sociedad y entorno
 * Grammar: Nominal clauses; reporting verbs; concession
 *
 * Modelo ampliado: 18 ejercicios por lección × 5 lecciones = 90 ítems.
 * Patrón de IDs: c1-u7-g1..g18, v1..v18, r1..r18, l1..l18, w1..w18.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = '[[Health and Mind|Salud y mente]]';

export const UNIT_7_EXERCISES: Exercise[] = [
{
    id: "c1-u7-g1",
    type: 'multiple-choice',
    level: 'C1',
    topic: "nominal-clauses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ chronic stress remodels neural circuits associated with threat detection is no longer controversial.",
          options: ["[[That|Que / that]]", "[[Which|no encaja como sujeto de oración sustantiva]]", "[[What|equivocado como sujeto aquí]]"],
          correctAnswer: 0,
          explanation: "*That-clause* as subject.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g2",
    type: 'fill-blank',
    level: 'C1',
    topic: "nominal-clauses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "_______ the digital therapy will prove cost-effective at scale is still an open empirical question.",
          options: ["[[Whether|si / si bien]]", "[[If|no como sujeto estándar]]", "[[That|no encaja con incertidumbre explícita]]"],
          correctAnswer: "Whether",
          acceptableAnswers: ["Whether"],
          explanation: "*Whether* introduces a nominal clause of uncertainty.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g3",
    type: 'multiple-choice',
    level: 'C1',
    topic: "nominal-clauses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ is most striking is the gap between symptom scores and functional recovery.",
          options: ["[[What|What]]", "[[That|That]]", "[[Which|Which]]"],
          correctAnswer: 0,
          explanation: "*What is most striking is…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g4",
    type: 'fill-blank',
    level: 'C1',
    topic: "nominal-clauses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "The fact that _______ _______ heterogeneous across sites complicates pooling estimates in meta-analyses.",
          options: ["[[effects were|los efectos eran]]", "[[effect was|el efecto era]]", "[[effects are|tiempo incorrecto]]"],
          correctAnswer: "effects were",
          acceptableAnswers: ["effects were"],
          explanation: "*The fact that + clause*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g5",
    type: 'multiple-choice',
    level: 'C1',
    topic: "nominal-clauses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ early psychological intervention can alter illness trajectories is supported by longitudinal cohorts.",
          options: ["[[That|That]]", "[[It|It]]", "[[This|This]]"],
          correctAnswer: 0,
          explanation: "*That… is supported*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g6",
    type: 'fill-blank',
    level: 'C1',
    topic: "nominal-clauses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "_______ _______ the trial was not preregistered should give readers pause when interpreting novelty claims.",
          options: ["[[The fact|The fact]]", "[[A fact|poco idiomático]]", "[[Fact that|falta artículo]]"],
          correctAnswer: "The fact",
          acceptableAnswers: ["The fact"],
          explanation: "*The fact that…* as subject.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g7",
    type: 'multiple-choice',
    level: 'C1',
    topic: "reporting-verbs",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "The authors _______ that residual confounding could not be fully excluded.",
          options: ["[[acknowledged|reconocieron]]", "[[told|patrón incorrecto sin objeto]]", "[[said to|incorrecto]]"],
          correctAnswer: 0,
          explanation: "*Acknowledge that…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g8",
    type: 'fill-blank',
    level: 'C1',
    topic: "reporting-verbs",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "The committee _______ _______ the intervention be offered as first-line treatment in mild cases.",
          options: ["[[recommended that|recomendaron que]]", "[[recommended to|incorrecto]]", "[[recommended for|incorrecto]]"],
          correctAnswer: "recommended that",
          acceptableAnswers: ["recommended that"],
          explanation: "*Recommend that* + base form.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g9",
    type: 'multiple-choice',
    level: 'C1',
    topic: "reporting-verbs",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Clinicians _______ patients against abrupt discontinuation of antidepressants.",
          options: ["[[warned|advirtieron]]", "[[said|incorrecto]]", "[[told|told against]]"],
          correctAnswer: 0,
          explanation: "*Warn someone against -ing*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g10",
    type: 'fill-blank',
    level: 'C1',
    topic: "reporting-verbs",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "The editorial _______ _______ overstating the clinical significance of a surrogate endpoint.",
          options: ["[[cautioned against|advirtió contra]]", "[[cautioned to|incorrecto]]", "[[cautioned for|incorrecto]]"],
          correctAnswer: "cautioned against",
          acceptableAnswers: ["cautioned against"],
          explanation: "*Caution against + -ing*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g11",
    type: 'multiple-choice',
    level: 'C1',
    topic: "reporting-verbs",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Independent labs failed to _______ the original biomarker findings.",
          options: ["[[replicate|replicar]]", "[[repeat|menos formal]]", "[[redo|informal]]"],
          correctAnswer: 0,
          explanation: "*Replicate* findings.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g12",
    type: 'multiple-choice',
    level: 'C1',
    topic: "reporting-verbs",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "The commentary _______ earlier claims about a unitary diagnostic entity.",
          options: ["[[called into question|cuestionó]]", "[[called to question|no idiomático]]", "[[called on question|incorrecto]]"],
          correctAnswer: 0,
          explanation: "*Call into question*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g13",
    type: 'multiple-choice',
    level: 'C1',
    topic: "concession",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ the modest effect size, the intervention was cost-effective at population scale.",
          options: ["[[Despite|a pesar de]]", "[[Although|aunque + cláusula]]", "[[However|sin embargo]]"],
          correctAnswer: 0,
          explanation: "*Despite* + noun phrase.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g14",
    type: 'fill-blank',
    level: 'C1',
    topic: "concession",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "The drug is promising, _______ expensive and access remains uneven.",
          options: ["[[albeit|aunque / si bien]]", "[[although|requiere cláusula]]", "[[though|pospuesto]]"],
          correctAnswer: "albeit",
          acceptableAnswers: ["albeit"],
          explanation: "*Albeit* + adjective phrase.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g15",
    type: 'multiple-choice',
    level: 'C1',
    topic: "concession",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ widespread scepticism, the guideline was adopted within a year.",
          options: ["[[Notwithstanding|no obstante]]", "[[Despite of|incorrecto]]", "[[Although|incorrecto antes de sustantivo]]"],
          correctAnswer: 0,
          explanation: "*Notwithstanding* + noun phrase.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g16",
    type: 'fill-blank',
    level: 'C1',
    topic: "concession",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "_______ _______ the anecdote may be, it cannot replace controlled trials.",
          options: ["[[However compelling|por muy convincente que]]", "[[Whatever compelling|incorrecto]]", "[[Although compelling|incorrecto]]"],
          correctAnswer: "However compelling",
          acceptableAnswers: ["However compelling"],
          explanation: "*However + adjective + S + may be*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g17",
    type: 'multiple-choice',
    level: 'C1',
    topic: "concession",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "While acknowledging limitations, the authors _______ for broader implementation.",
          options: ["[[argued|argumentaron]]", "[[arguing|forma incorrecta como principal]]", "[[argue|tiempo incorrecto]]"],
          correctAnswer: 0,
          explanation: "*While + -ing* clause.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-g18",
    type: 'fill-blank',
    level: 'C1',
    topic: "concession",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Nominal Clauses, Reporting Verbs & Concession|Oraciones nominales, verbos de reporte y concesión]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "_______ all its flaws, the study shifted clinical practice.",
          options: ["[[For all|A pesar de todo]]", "[[In all|incorrecto]]", "[[With all|parcialmente posible]]"],
          correctAnswer: "For all",
          acceptableAnswers: ["For all"],
          explanation: "*For all + noun phrase*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u7-v1",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The study distinguished between _______ pain and pain that tracks identifiable tissue damage.",
          options: ["[[chronic|crónico]]", "[[chronicity|cronificación]]", "[[chronicle|crónica]]"],
          correctAnswer: 0,
          explanation: "*Chronic* pain.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v2",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ — the coexistence of two or more conditions — complicates treatment planning.",
          options: ["[[Comorbidity|Comorbilidad]]", "[[Camaraderie|camaradería]]", "[[Commodity|mercancía]]"],
          correctAnswer: 0,
          explanation: "*Comorbidity*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v3",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The trial's primary endpoint was _______ — whether patients could return to work within eight weeks.",
          options: ["[[functional|funcional]]", "[[function|función]]", "[[functionary|funcionario]]"],
          correctAnswer: 0,
          explanation: "*Functional* endpoint.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v4",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Long-term _______ is often a more realistic goal than complete symptom elimination in anxiety disorders.",
          options: ["[[remission|remisión]]", "[[permission|permiso]]", "[[emission|emisión]]"],
          correctAnswer: 0,
          explanation: "*Remission*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v5",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ of depression involves multiple pathways — biological, psychological and social.",
          options: ["[[aetiology|etiología]]", "[[analogy|analogía]]", "[[anthology|antología]]"],
          correctAnswer: 0,
          explanation: "*Aetiology*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v6",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ harm refers to unintended damage caused by medical treatment itself.",
          options: ["[[Iatrogenic|iatrogénico]]", "[[Idiomatic|idiomático]]", "[[Ionic|iónico]]"],
          correctAnswer: 0,
          explanation: "*Iatrogenic*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v7",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ control trials remain the gold standard for causal inference about efficacy.",
          options: ["[[Randomised|aleatorizados]]", "[[Rationalised|racionalizados]]", "[[Random|aleatorio]]"],
          correctAnswer: 0,
          explanation: "*Randomised controlled trial*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v8",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ effect can still produce measurable symptom change even when the active ingredient is inert.",
          options: ["[[placebo|placebo]]", "[[placenta|placenta]]", "[[placement|colocación]]"],
          correctAnswer: 0,
          explanation: "*Placebo* effect.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v9",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ — the tendency to seek only confirming evidence — skews self-monitoring of mood apps.",
          options: ["[[Confirmation bias|sesgo de confirmación]]", "[[Confirmation buy|falso]]", "[[Conformation|conformación]]"],
          correctAnswer: 0,
          explanation: "*Confirmation bias*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v10",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Neuroplasticity refers to the brain's _______ capacity to reorganise synaptic connections.",
          options: ["[[adaptive|adaptativa]]", "[[adoptive|adoptiva]]", "[[adeptive|falso]]"],
          correctAnswer: 0,
          explanation: "*Adaptive* capacity.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v11",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______-based therapies focus on changing thought patterns linked to distress.",
          options: ["[[Cognitive|cognitivo]]", "[[Cognition|cognición (sust.)]]", "[[Cognate|cognado]]"],
          correctAnswer: 0,
          explanation: "*Cognitive* behavioural therapy frame.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v12",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The psychiatrist adjusted the _______ to minimise sedation while preserving efficacy.",
          options: ["[[dosage|dosis]]", "[[dosageable|no es adjetivo estándar]]", "[[doseful|falso]]"],
          correctAnswer: 0,
          explanation: "*Dosage*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v13",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ distress is a normal reaction to adversity; it is not necessarily a disorder.",
          options: ["[[Psychological|psicológica]]", "[[Physiological|fisiológica]]", "[[Psychiatric|psiquiátrica]]"],
          correctAnswer: 0,
          explanation: "*Psychological* distress.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v14",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ sampling in surveys can bias prevalence estimates if certain groups are harder to reach.",
          options: ["[[Convenience|por conveniencia]]", "[[Convenient|conveniente]]", "[[Convection|convección]]"],
          correctAnswer: 0,
          explanation: "*Convenience* sampling.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v15",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ followed patients for a decade to capture late-emerging side effects.",
          options: ["[[longitudinal|longitudinal]]", "[[latitudinal|latitudinal]]", "[[longitudinalism|falso]]"],
          correctAnswer: 0,
          explanation: "*Longitudinal* study.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v16",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ health integration aims to treat mental and physical conditions as interconnected.",
          options: ["[[Whole-person|de la persona completa]]", "[[Wholemeal|integral pan]]", "[[Wholesale|mayorista]]"],
          correctAnswer: 0,
          explanation: "*Whole-person* health.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v17",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Sleep _______ is linked to impaired glucose regulation and heightened inflammation.",
          options: ["[[deprivation|privación]]", "[[depravation|depravación]]", "[[derivation|derivación]]"],
          correctAnswer: 0,
          explanation: "*Sleep deprivation*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-v18",
    type: 'multiple-choice',
    level: 'C1',
    topic: "health-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ triage nurse screened patients for suicidal ideation.",
          options: ["[[emergency|urgencias]]", "[[emergence|emergencia]]", "[[emergencyless|falso]]"],
          correctAnswer: 0,
          explanation: "*Emergency* triage.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u7-r1",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Mental health is not merely the absence of disorder; it is the capacity to adapt under stress.|La salud mental no es solo la ausencia de trastorno; es la capacidad de adaptarse bajo estrés.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Positive definitions include functioning, not only symptoms.|Las definiciones positivas incluyen el funcionamiento, no solo síntomas.]]", "[[Health means never feeling sad.|La salud es nunca sentirse triste.]]", "[[Disorder lists exhaust wellbeing.|Las listas de trastornos agotan el bienestar.]]"],
          correctAnswer: 0,
          explanation: "Definitions.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r2",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Stigma does not only hurt feelings; it delays help-seeking and distorts epidemiological counts.|El estigma no solo hiere: retrasa la búsqueda de ayuda y distorsiona cifras epidemiológicas.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Social costs feed back into measurement bias.|Los costes sociales alimentan sesgos de medición.]]", "[[Stigma only affects celebrities.|El estigma solo afecta a famosos.]]", "[[Surveys capture everyone equally.|Las encuestas captan a todos por igual.]]"],
          correctAnswer: 0,
          explanation: "Stigma.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r3",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[The brain's plasticity offers hope, but rehabilitation timelines remain stubbornly individual.|La plasticidad cerebral ofrece esperanza, pero los plazos de rehabilitación siguen siendo obstinadamente individuales.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Hope must be paired with realistic expectations.|La esperanza debe ir acompañada de expectativas realistas.]]", "[[Plasticity guarantees instant recovery.|La plasticidad garantiza recuperación instantánea.]]", "[[All brains heal identically.|Todos los cerebros sanan igual.]]"],
          correctAnswer: 0,
          explanation: "Neuroplasticity.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r4",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Screen-time debates often confuse correlation with causation in adolescent wellbeing studies.|Los debates sobre tiempo de pantalla a menudo confunden correlación y causalidad en estudios sobre adolescentes.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Confounders like sleep displacement matter.|Variables confusoras como el desplazamiento del sueño importan.]]", "[[Screens always harm teens.|Las pantallas siempre dañan a adolescentes.]]", "[[Causation is easy to prove in surveys.|La causalidad es fácil de probar en encuestas.]]"],
          correctAnswer: 0,
          explanation: "Methods.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r5",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Placebo responses remind us that expectation is a biological variable, not a mere attitude.|Las respuestas al placebo nos recuerdan que la expectativa es una variable biológica, no solo una actitud.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Psychological and physiological pathways interact.|Las vías psicológicas y fisiológicas interactúan.]]", "[[Placebos are purely imaginary.|Los placebos son puramente imaginarios.]]", "[[Expectation never alters physiology.|La expectativa nunca altera la fisiología.]]"],
          correctAnswer: 0,
          explanation: "Placebo.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r6",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Access to therapy is as much about geography, cost and culture as about clinician supply.|El acceso a terapia tiene tanto que ver con geografía, coste y cultura como con oferta de clínicos.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Barriers stack multiplicatively.|Las barreras se acumulan de forma multiplicativa.]]", "[[Therapy is equally available everywhere.|La terapia está igual de disponible en todas partes.]]", "[[Culture is irrelevant to help-seeking.|La cultura es irrelevante para buscar ayuda.]]"],
          correctAnswer: 0,
          explanation: "Access.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r7",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Trauma-informed care shifts the question from \"what is wrong with you?\" to \"what happened to you?\".|La atención informada en trauma cambia la pregunta de «qué te pasa» a «qué te ocurrió».]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Framing affects blame and safety.|El encuadre afecta culpa y seguridad.]]", "[[Trauma labels excuse behaviour.|Las etiquetas de trauma excusan conducta.]]", "[[Questions are politically neutral.|Las preguntas son políticamente neutrales.]]"],
          correctAnswer: 0,
          explanation: "Trauma care.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r8",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Sleep restriction is not laziness; chronic deprivation alters mood regulation in measurable ways.|Restringir el sueño no es pereza; la privación crónica altera la regulación del ánimo de modo medible.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Physiology links sleep debt to irritability.|La fisiología une deuda de sueño e irritabilidad.]]", "[[Tired people simply choose negativity.|Los cansados eligen negatividad.]]", "[[Sleep never affects mood.|El sueño nunca afecta al ánimo.]]"],
          correctAnswer: 0,
          explanation: "Sleep.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r9",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Diagnostic categories are useful fictions that can ossify when insurance codes replace clinical judgement.|Las categorías diagnósticas son ficciones útiles que pueden petrificarse cuando los códigos aseguradores sustituyen el juicio clínico.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Classification interacts with payment systems.|La clasificación interactúa con sistemas de pago.]]", "[[DSM codes are natural kinds.|Los códigos DSM son tipos naturales.]]", "[[Clinicians never follow manuals.|Los clínicos nunca siguen manuales.]]"],
          correctAnswer: 0,
          explanation: "Diagnosis.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r10",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Mindfulness interventions show modest effect sizes; enthusiasm has sometimes outrun evidence.|Las intervenciones de mindfulness muestran tamaños de efecto modestos; el entusiasmo a veces ha superado a la evidencia.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Hype cycles precede consolidation trials.|Los ciclos de hype preceden a ensayos de consolidación.]]", "[[Mindfulness cures all anxiety.|El mindfulness cura toda ansiedad.]]", "[[Evidence always matches marketing.|La evidencia siempre coincide con el marketing.]]"],
          correctAnswer: 0,
          explanation: "MBSR.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r11",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Loneliness is linked to mortality risk in some longitudinal studies, independent of depression.|La soledad se vincula a riesgo de mortalidad en algunos estudios longitudinales, independientemente de la depresión.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Mechanisms may include stress and behaviour.|Los mecanismos pueden incluir estrés y conducta.]]", "[[Loneliness is always depression.|La soledad es siempre depresión.]]", "[[Mortality studies never adjust confounders.|Los estudios de mortalidad nunca ajustan variables.]]"],
          correctAnswer: 0,
          explanation: "Loneliness.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r12",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Addiction models moved from moral failure to chronic brain disease, yet neither frame fully captures lived experience.|Los modelos de adicción pasaron del fallo moral a enfermedad cerebral crónica, pero ningún marco captura del todo la experiencia vivida.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Narratives shape policy and stigma.|Las narrativas moldean política y estigma.]]", "[[Brain disease means no agency.|Enfermedad cerebral significa cero agencia.]]", "[[Moral models disappeared entirely.|Los modelos morales desaparecieron del todo.]]"],
          correctAnswer: 0,
          explanation: "Addiction.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r13",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Teletherapy expanded access but also surfaced digital privacy questions for vulnerable adolescents.|La teleterapia amplió el acceso pero también planteó dudas de privacidad digital para adolescentes vulnerables.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Platform design affects therapeutic safety.|El diseño de plataforma afecta la seguridad terapéutica.]]", "[[Online therapy is always anonymous.|La terapia en línea es siempre anónima.]]", "[[Privacy is irrelevant to minors.|La privacidad es irrelevante para menores.]]"],
          correctAnswer: 0,
          explanation: "Telehealth.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r14",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Burnout is increasingly framed as an occupational phenomenon, not a personal weakness.|El burnout se enmarca cada vez como fenómeno ocupacional, no como debilidad personal.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Institutional drivers matter alongside individual coping.|Los factores institucionales importan junto al afrontamiento individual.]]", "[[Burnout is always laziness.|El burnout es siempre pereza.]]", "[[Workplaces never cause stress.|El trabajo nunca causa estrés.]]"],
          correctAnswer: 0,
          explanation: "Burnout.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r15",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Psychedelic-assisted trials raise unique consent challenges when ego dissolution is a known effect.|Los ensayos con psicodélicos plantean retos de consentimiento únicos cuando la disolución del ego es un efecto conocido.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Capacity to consent may fluctuate across sessions.|La capacidad de consentir puede fluctuar entre sesiones.]]", "[[Consent is identical to drug trials.|El consentimiento es idéntico a cualquier fármaco.]]", "[[Ego effects are irrelevant to ethics.|Los efectos del ego son irrelevantes para la ética.]]"],
          correctAnswer: 0,
          explanation: "Research ethics.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r16",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Nutritional psychiatry explores gut–brain pathways, though hype around supplements often outpaces trials.|La psiquiatría nutricional explora vías intestino-cerebro, aunque el hype en torno a suplementos a menudo supera a los ensayos.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Mechanistic plausibility differs from clinical proof.|La plausibilidad mecánica difiere de la prueba clínica.]]", "[[Supplements replace therapy.|Los suplementos sustituyen la terapia.]]", "[[Gut biology is irrelevant to mood.|La biología intestinal es irrelevante para el ánimo.]]"],
          correctAnswer: 0,
          explanation: "Nutrition.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r17",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Forced treatment debates pit autonomy against perceived risk in acute psychiatric crises.|Los debates sobre tratamiento forzado enfrentan autonomía y riesgo percibido en crisis psiquiátricas agudas.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Legal thresholds encode societal values.|Los umbrales legales codifican valores sociales.]]", "[[Autonomy always wins.|La autonomía siempre gana.]]", "[[Risk is objectively measurable without judgement.|El riesgo es objetivo sin juicio.]]"],
          correctAnswer: 0,
          explanation: "Capacity.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-r18",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "health-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Health and Mind|Salud y mente]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Recovery narratives can empower yet also pressure survivors to perform resilience for audiences.|Las narrativas de recuperación pueden empoderar pero también presionar a supervivientes a mostrar resiliencia ante audiencias.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Public storytelling has social costs.|El relato público tiene costes sociales.]]", "[[Recovery is linear for everyone.|La recuperación es lineal para todos.]]", "[[Audiences never judge survivors.|Nunca se juzga a supervivientes.]]"],
          correctAnswer: 0,
          explanation: "Recovery.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u7-l1",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Speaker:|Voz / Hablante:]] \"[[CBT is structured, but rapport still predicts who stays in the programme.|La TCC es estructurada, pero la alianza terapéutica aún predice quién permanece en el programa.]]\"\n\n[[The speaker stresses that:|La voz enfatiza que:]]",
          options: ["[[therapeutic alliance is a non-specific common factor|la alianza terapéutica es un factor común inespecífico]]", "[[manuals alone guarantee retention|los manuales solos garantizan adherencia]]", "[[CBT ignores relationship|la TCC ignora la relación]]"],
          correctAnswer: 0,
          explanation: "Alliance.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l2",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Lecturer:|Profesor/a (clase magistral):]] \"[[SSRIs help many but sexual side effects can persist after discontinuation in some patients.|Los ISRS ayudan a muchos pero los efectos sexuales pueden persistir tras la suspensión en algunos pacientes.]]\"\n\n[[Main claim:|Tesis principal:]]",
          options: ["[[post-market surveillance captures rare but severe outcomes|la vigilancia poscomercial capta resultados raros pero graves]]", "[[side effects always end when pills stop|los efectos siempre terminan al parar]]", "[[SSRIs are identical|los ISRS son idénticos]]"],
          correctAnswer: 0,
          explanation: "SSRIs.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l3",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Interviewer:|Entrevistador/a:]] \"[[Inpatient units balance safety with restraint minimisation; both goals can conflict in practice.|Las unidades de hospitalización equilibran seguridad y minimización de contención; ambos objetivos pueden chocar.]]\"\n\n[[The interviewee implies:|El entrevistado insinúa que:]]",
          options: ["[[zero-tolerance rhetoric may obscure trade-offs|la retórica de tolerancia cero puede ocultar compensaciones]]", "[[restraints are never used|las contenciones nunca se usan]]", "[[safety always wins without cost|la seguridad siempre gana sin coste]]"],
          correctAnswer: 0,
          explanation: "Restraint.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l4",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Coach:|Coach:]] \"[[ADHD is heritable, yet classroom design and teacher workload shape diagnostic rates.|El TDAH es heredable, pero el diseño del aula y la carga docente moldean las tasas diagnósticas.]]\"\n\n[[The advice focuses on:|El consejo se centra en:]]",
          options: ["[[bio-genetic and social factors interact|factores biogenéticos y sociales interactúan]]", "[[genes alone determine diagnosis|los genes solos determinan el diagnóstico]]", "[[schools never affect labels|las escuelas nunca afectan etiquetas]]"],
          correctAnswer: 0,
          explanation: "ADHD.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l5",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Podcast host:|Presentador/a del podcast:]] \"[[Exposure therapy for PTSD requires pacing; flooding can retraumatise if misapplied.|La terapia de exposición para TEPT requiere ritmo; la inundación puede retraumatizar si se malaplica.]]\"\n\n[[The distinction drawn is:|La distinción trazada es:]]",
          options: ["[[gradual hierarchy respects window of tolerance|la jerarquía gradual respeta la ventana de tolerancia]]", "[[faster is always better|más rápido es siempre mejor]]", "[[trauma exposure is risk-free|la exposición al trauma es sin riesgo]]"],
          correctAnswer: 0,
          explanation: "PTSD.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l6",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Therapist:|Terapeuta:]] \"[[Public health messaging on suicide must balance awareness with imitation risk.|Los mensajes de salud pública sobre el suicidio deben equilibrar conciencia y riesgo de imitación.]]\"\n\n[[Therapeutic aim:|Objetivo terapéutico:]]",
          options: ["[[reporting guidelines aim to reduce contagion|las guías de cobertura buscan reducir contagio]]", "[[publicity never affects behaviour|la publicidad nunca afecta la conducta]]", "[[all campaigns help equally|todas las campañas ayudan igual]]"],
          correctAnswer: 0,
          explanation: "Media.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l7",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Debate:|Debate:]] \"[[Eating disorder programmes wrestle with weight stigma even when treating restrictive presentations.|Los programas para trastornos alimentarios lidian con el estigma de peso incluso en presentaciones restrictivas.]]\"\n\n[[Speaker suggests:|El hablante sugiere que:]]",
          options: ["[[weight is not the sole metric of severity|el peso no es la única métrica de gravedad]]", "[[thinness always means health|la delgadez siempre es salud]]", "[[stigma only affects obesity|el estigma solo afecta a la obesidad]]"],
          correctAnswer: 0,
          explanation: "Eating disorders.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l8",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Seminar leader:|Moderador/a del seminario:]] \"[[Neurodiversity advocates argue for accommodation rather than normalisation as the default goal.|Los defensores de la neurodiversidad abogan por acomodación más que normalización como meta por defecto.]]\"\n\n[[Pedagogical point:|Punto pedagógico:]]",
          options: ["[[design choices can disable or enable participation|las decisiones de diseño pueden inhabilitar o habilitar]]", "[[neurodiversity denies medical needs|la neurodiversidad niega necesidades médicas]]", "[[accommodation is always expensive|la acomodación es siempre cara]]"],
          correctAnswer: 0,
          explanation: "Neurodiversity.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l9",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Radio:|Radio:]] \"[[Chronic pain clinics combine analgesics with psychologically informed movement programmes.|Las clínicas de dolor crónico combinan analgésicos con programas de movimiento psicológicamente informados.]]\"\n\n[[Explanation offered:|Explicación ofrecida:]]",
          options: ["[[biopsychosocial models reject pure biomedical reduction|modelos biopsicosociales rechazan reduccionismo puro]]", "[[pain is only tissue damage|el dolor es solo daño tisular]]", "[[psychology never helps pain|la psicología nunca ayuda al dolor]]"],
          correctAnswer: 0,
          explanation: "Pain.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l10",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Workshop:|Taller:]] \"[[Alcohol brief interventions in primary care can shift drinking trajectories when delivered consistently.|Las intervenciones breves sobre alcohol en atención primaria pueden cambiar trayectorias cuando se aplican con constancia.]]\"\n\n[[Key takeaway:|Idea clave:]]",
          options: ["[[brief does not mean trivial|breve no significa trivial]]", "[[one conversation cures dependence|una conversación cura dependencia]]", "[[primary care never sees alcohol|atención primaria nunca ve alcohol]]"],
          correctAnswer: 0,
          explanation: "Alcohol.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l11",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Lecture:|Conferencia:]] \"[[Infant mental health services depend on caregiver coaching as much as child-directed work.|Los servicios de salud mental infantil dependen del coaching a cuidadores tanto como del trabajo con el niño.]]\"\n\n[[Implication:|Implicación:]]",
          options: ["[[dyadic framing recognises relational regulation|el encuadre diádico reconoce regulación relacional]]", "[[babies are treated in isolation|los bebés se tratan aislados]]", "[[parents are irrelevant to therapy|los padres son irrelevantes]]"],
          correctAnswer: 0,
          explanation: "Infant MH.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l12",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Clip:|Extracto de audio:]] \"[[Digital phenotyping from smartphone sensors raises consent granularity for psychiatric research.|El fenotipado digital a partir de sensores del smartphone exige granularidad de consentimiento en investigación psiquiátrica.]]\"\n\n[[Mechanism described:|Mecanismo descrito:]]",
          options: ["[[passive data collection is not obviously visible to users|la recogida pasiva no es obvia para usuarios]]", "[[sensors only count steps|los sensores solo cuentan pasos]]", "[[consent is a one-time checkbox|el consentimiento es una casilla única]]"],
          correctAnswer: 0,
          explanation: "Digital phenotyping.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l13",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Interview:|Entrevista:]] \"[[Harm reduction for substance use emphasises survival and trust-building over immediate abstinence.|La reducción de daños en uso de sustancias enfatiza supervivencia y confianza frente a abstinencia inmediata.]]\"\n\n[[Core idea:|Idea central:]]",
          options: ["[[entry points differ from abstinence-only pathways|los puntos de entrada difieren de vías solo abstinencia]]", "[[harm reduction encourages use|la reducción de daños fomenta el uso]]", "[[trust is irrelevant to care|la confianza es irrelevante]]"],
          correctAnswer: 0,
          explanation: "Harm reduction.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l14",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Panel:|Mesa redonda:]] \"[[Electroconvulsive therapy remains controversial despite evidence for severe treatment-resistant depression.|La terapia electroconvulsiva sigue siendo polémica pese a evidencia en depresión grave resistente.]]\"\n\n[[Effect highlighted:|Efecto destacado:]]",
          options: ["[[stigma and memory concerns shape public perception|la memoria y el estigma moldean la percepción]]", "[[ECT has no evidence base|la TEC no tiene base de evidencia]]", "[[controversy means inefficacy|la polémica implica ineficacia]]"],
          correctAnswer: 0,
          explanation: "ECT.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l15",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Talk:|Charla:]] \"[[School-based mental health screening must navigate parental consent and false-positive anxiety.|El cribado escolar debe navegar consentimiento parental y ansiedad por falsos positivos.]]\"\n\n[[Condition emphasised:|Condición enfatizada:]]",
          options: ["[[screening thresholds trade sensitivity for specificity|los umbrales compensan sensibilidad y especificidad]]", "[[screening never harms|el cribado nunca daña]]", "[[parents never disagree|los padres nunca discrepan]]"],
          correctAnswer: 0,
          explanation: "Screening.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l16",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Discussion:|Debate grupal:]] \"[[Cross-cultural psychiatry cautions against exporting DSM categories without local validation.|La psiquiatría transcultural advierte contra exportar categorías DSM sin validación local.]]\"\n\n[[Nuanced position:|Postura matizada:]]",
          options: ["[[symptom idioms vary across languages|los modos sintomáticos varían entre lenguas]]", "[[DSM categories are universal atoms|las categorías DSM son átomos universales]]", "[[translation solves all bias|la traducción soluciona todo sesgo]]"],
          correctAnswer: 0,
          explanation: "Culture.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l17",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Summary:|Resumen:]] \"[[Exercise prescriptions for depression show modest effect sizes but benefit cardiometabolic health.|El ejercicio prescrito para depresión muestra efectos modestos pero beneficia salud cardiometabólica.]]\"\n\n[[Point summarised:|Idea resumida:]]",
          options: ["[[multi-outcome benefits can justify integration even when mood gains are small|beneficios múltiples justifican integración]]", "[[exercise replaces antidepressants|el ejercicio sustituye antidepresivos]]", "[[mood never changes with movement|el ánimo nunca cambia con movimiento]]"],
          correctAnswer: 0,
          explanation: "Exercise.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-l18",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "health-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Health in discourse|La salud en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Speaker:|Voz / Hablante:]] \"[[Peer support workers bring lived experience into teams, but boundaries require clear supervision.|Los trabajadores de apoyo entre pares aportan experiencia vivida, pero los límites necesitan supervisión clara.]]\"\n\n[[Listener should infer:|El oyente debe inferir:]]",
          options: ["[[lived experience is expertise not authority over clinical decisions|lived experience es experta, no autoridad clínica]]", "[[peers replace clinicians|los pares sustituyen clínicos]]", "[[boundaries never blur|los límites nunca se difuminan]]"],
          correctAnswer: 0,
          explanation: "Peers.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u7-w1",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Opening for an essay on mental health stigma: choose the most appropriately hedged thesis.",
          options: ["[[While stigma reduction campaigns have shifted public discourse, structural barriers to care — including cost and geography — remain entrenched in ways headline awareness alone cannot address.|Matiz + estructura]]", "[[Stigma is bad.|binario]]", "[[This essay is about feelings.|vago]]"],
          correctAnswer: 0,
          explanation: "Hedged thesis.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w2",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which sentence best links neurobiological evidence with social policy?",
          options: ["[[Neuroimaging correlates of depression do not, by themselves, prescribe funding models; yet they can inform arguments for parity legislation when paired with epidemiological burden data.|puente biología–política]]", "[[Brains cause laws.|reductivo]]", "[[Policy ignores science.|sin matices]]"],
          correctAnswer: 0,
          explanation: "Evidence bridge.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w3",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Pick the most precise closing sentence on antidepressant discontinuation.",
          options: ["[[In sum, tapering protocols must be individualised because withdrawal symptoms and relapse risk profiles vary across agents and patients.|cierre clínico]]", "[[Stop pills suddenly.|peligroso]]", "[[Drugs are evil.|sin matices]]"],
          correctAnswer: 0,
          explanation: "Clinical close.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w4",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Best topic sentence for a paragraph on informed consent in psychedelic trials?",
          options: ["[[Altered states of consciousness complicate the traditional notion of stable, ongoing consent across multi-hour sessions.|tema operativo]]", "[[Trials exist.|trivial]]", "[[Psychedelics are illegal.|irrelevante]]"],
          correctAnswer: 0,
          explanation: "Topic focus.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w5",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which option avoids overstated certainty about a single open-label pilot?",
          options: ["[[These preliminary findings are promising but require blinded replication in larger samples before influencing clinical guidelines.|hedging]]", "[[Pilot proves cure.|absoluto]]", "[[We have no data.|falso]]"],
          correctAnswer: 0,
          explanation: "Pilot caution.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w6",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the cohesive paragraph contrasting symptom reduction with functional recovery.",
          options: ["[[Symptom scores may fall while occupational performance remains impaired; therefore, outcome measures should capture work and relationships, not only checklist severity.|Therefore / contraste]]", "[[Symptoms matter.|vago]]", "[[Recovery is simple.|falso]]"],
          correctAnswer: 0,
          explanation: "Recovery cohesion.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w7",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Appropriate register for a formal letter requesting a second medical opinion?",
          options: ["[[I am writing to respectfully request a specialist review of my diagnosis and treatment plan, as outlined in the enclosed discharge summary.|formal]]", "[[Hey doc, fix me.|informal]]", "[[You are wrong.|agresivo]]"],
          correctAnswer: 0,
          explanation: "Formal request.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w8",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which reformulation cites the WHO definition of health without plagiarism?",
          options: ["[[The WHO (1948) defines health as complete physical, mental and social wellbeing — not merely the absence of disease.|atribución]]", "[[WHO says be healthy.|vago]]", "[[Health means happiness.|incompleto]]"],
          correctAnswer: 0,
          explanation: "Citation.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w9",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Best sentence to introduce limitations after describing a cross-sectional survey on anxiety?",
          options: ["[[Cross-sectional designs cannot establish temporal precedence between screen time and anxiety; reverse causation and third variables remain plausible.|límites]]", "[[Surveys prove causation.|falso]]", "[[Our sample is perfect.|sin límites]]"],
          correctAnswer: 0,
          explanation: "Design caveats.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w10",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the sentence with effective parallel structure in a patient information leaflet.",
          options: ["[[Watch for worsening mood, rising agitation or new suicidal thoughts — and seek help immediately if these appear.|paralelismo]]", "[[Watch stuff and things.|informal]]", "[[Be careful.|vago]]"],
          correctAnswer: 0,
          explanation: "Parallel patient text.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w11",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which transition moves from describing CBT to discussing limitations?",
          options: ["[[Notwithstanding rigorous manuals, therapist drift and underfunded supervision can blunt real-world effectiveness.|Notwithstanding]]", "[[Anyway.|informal]]", "[[Next.|mecánico]]"],
          correctAnswer: 0,
          explanation: "Limitation transition.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w12",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the best definition-style sentence for *resilience* in psychology.",
          options: ["[[Resilience denotes dynamic processes of positive adaptation to adversity, not a fixed trait of invulnerability.|definición]]", "[[Resilience means never crying.|falso]]", "[[Resilience is genetic only.|estrecho]]"],
          correctAnswer: 0,
          explanation: "Term definition.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w13",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Most natural academic collocation in an abstract for a sleep intervention trial?",
          options: ["[[We randomised adults with insomnia to digital sleep restriction therapy versus sleep hygiene education alone.|collocaciones]]", "[[We did a sleep thing.|informal]]", "[[Sleep helps.|vago]]"],
          correctAnswer: 0,
          explanation: "Abstract tone.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w14",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which closing sentence points to implementation implications after discussing digital therapeutics?",
          options: ["[[These findings imply that reimbursement pathways must align with evidence updates as algorithms change faster than annual formulary reviews.|implicación]]", "[[Apps exist.|trivial]]", "[[The end.|corto]]"],
          correctAnswer: 0,
          explanation: "Policy implication.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w15",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose a hedged critique of a wellness influencer's claims about supplements.",
          options: ["[[The advice is engaging, yet mechanistic plausibility and anecdote do not substitute for independent trials reporting harms as well as benefits.|crítica matizada]]", "[[Influencers lie.|grosero]]", "[[Supplements work.|sin crítica]]"],
          correctAnswer: 0,
          explanation: "Influencer critique.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w16",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the sentence that operationalises *adherence* for medication studies.",
          options: ["[[We operationalise adherence as proportion of days covered by pharmacy refill records over a 12-month window.|operacionalización]]", "[[Adherence means wanting to take pills.|vago]]", "[[Adherence is always 100%.|falso]]"],
          correctAnswer: 0,
          explanation: "Concept work.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w17",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which option frames citations appropriately in a review of trauma therapies?",
          options: ["[[As the ISTSS guidelines (2019) synthesised, trauma-focused CBT and EMDR show strong evidence for PTSD in adults when competently delivered.|marco de síntesis]]", "[[Trauma is bad.|vago]]", "[[According to me, therapy helps.|subjetivo]]"],
          correctAnswer: 0,
          explanation: "Literature frame.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u7-w18",
    type: 'writing',
    level: 'C1',
    topic: "health-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — health|Escritura académica — salud]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose varied syntax for rhetorical effect in a discussion of involuntary treatment.",
          options: ["[[Coercion is sometimes life-saving; it is also always ethically weighty: safeguards must therefore be explicit, reviewable and least-restrictive.|puntuación retórica]]", "[[Coercion is bad and ethics is hard.|planos]]", "[[Hospitals decide.|telegráfico]]"],
          correctAnswer: 0,
          explanation: "Syntactic variety.",
        },
      ],
    },
    topicName: "Writing",
  },
];
