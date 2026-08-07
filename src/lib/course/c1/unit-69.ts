/**
 * C1 Unit 69 — Language Lab: Hedging and stance
 * Supplementary track: epistemic stance, vague language, academic caution.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'C1 Language Lab — Hedging and Stance';

export const UNIT_69_EXERCISES: Exercise[] = [
{
    id: 'c1-u69-g1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'hedging-modals',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Modal hedges|Modales atenuantes]]',
      instructions: 'Choose the most cautiously worded claim.',
      questions: [
        {
          question: 'Which formulation is suitable for an abstract?',
          options: [
            '[[The results may partly reflect sampling bias.|puede que reflejen parcialmente]]',
            '[[The results prove sampling bias is universal.|demasiado absoluto]]',
            '[[Sampling bias is impossible to avoid.|imposible — demasiado fuerte]]',
          ],
          correctAnswer: 0,
          explanation:
            '*May* + *partly* hedges epistemic commitment; strong claims need evidence.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u69-g2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'hedging-modals',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[It is likely / probable that|Probabilidad]]',
      instructions: 'Complete with the best opening.',
      questions: [
        {
          question: '_______ _______ the effect will disappear once confounders are controlled for.',
          options: [
            '[[It is likely that|It is likely that]]',
            '[[The effect is likely that|incorrecto]]',
            '[[Likely is that|orden incorrecto]]',
          ],
          correctAnswer: 'It is likely that',
          acceptableAnswers: ['It is likely that'],
          explanation:
            '*It is likely/probable that* + clause is standard academic hedging.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u69-g3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'hedging-verbs',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Seem / appear / tend to|Parecer / tender a]]',
      instructions: 'Choose the correct sentence.',
      questions: [
        {
          question: 'Which sentence hedges appropriately?',
          options: [
            '[[The data appear to support a modest effect, though replication is needed.|parecen apoyar]]',
            '[[The data is appearing to support a modest effect.|estructura poco natural]]',
            '[[The data definitively proves a modest effect.|sin atenuación]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Data* plural + *appear* + *to* + verb; *though* adds further hedge.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u69-v1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'hedging-lexis',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Plausible / tentative|Plausible / tentativo]]',
      instructions: 'Choose the best adjective.',
      questions: [
        {
          question: 'At this stage, any conclusion remains _______.',
          options: [
            '[[tentative|provisional]]',
            '[[tentatively|adverbio]]',
            '[[tentation|no existe]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Tentative* = not final; collocates with *conclusion, hypothesis*.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u69-v2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'hedging-lexis',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[By and large / broadly speaking|Generalización prudente]]',
      instructions: 'Complete the fixed phrase.',
      questions: [
        {
          question: '_______ _______, the trend holds across regions, but exceptions exist.',
          options: [
            '[[By and large|En términos generales]]',
            '[[By and largely|incorrecto]]',
            '[[Large and by|orden incorrecto]]',
          ],
          correctAnswer: 'By and large',
          acceptableAnswers: ['By and large'],
          explanation:
            '*By and large* = on the whole; still hedged with *exceptions exist*.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u69-v3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'hedging-lexis',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Nuance / caveat|Matiz / salvedad]]',
      instructions: 'Choose the word for a warning or limitation.',
      questions: [
        {
          question: 'One important _______ is that the sample is not nationally representative.',
          options: [
            '[[caveat|Salvedad]]',
            '[[caveated|no es sustantivo]]',
            '[[caveating|no existe]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Caveat* = warning; *an important caveat is that*.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u69-r1',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Abstract|Resumen]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "We cannot rule out the possibility that unobserved heterogeneity drives part of the association." What is the authors\' stance?',
          options: [
            '[[They acknowledge uncertainty about causality.|Admiten incertidumbre.]]',
            '[[They rule out heterogeneity.|Descartan — falso.]]',
            '[[They claim causality is proven.|Causalidad probada — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Cannot rule out* + *possibility* = double hedge; careful academic tone.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u69-r2',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Inference|Inferencia]]',
      instructions: 'Choose the best inference.',
      questions: [
        {
          question:
            'Text: "On balance, the evidence is suggestive rather than conclusive." How strong is the evidence?',
          options: [
            '[[It hints at something but does not prove it.|Sugiere pero no prueba.]]',
            '[[It is conclusive.|Concluyente — contradice *rather than conclusive*.]]',
            '[[There is no evidence.|No hay evidencia — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Suggestive rather than conclusive* = weak epistemic strength.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u69-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (C1 Language Lab — Hedging and Stance), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
          options: [
            '[[comparing how different authors frame the issue|comparar cómo distintos autores enmarcan el tema]]',
            '[[reading only one author|leer solo un autor]]',
            '[[ignoring framing|ignorar el encuadre]]',
          ],
          correctAnswer: 0,
          explanation: 'The passage explicitly recommends comparing authors\' framing.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u69-l1',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Interview|Prensa]]',
      instructions: 'Listen and choose.',
      questions: [
        {
          question:
            'Analyst: "I wouldn\'t go so far as to call it a crisis — I\'d say it\'s a serious headwind." What does the analyst believe?',
          options: [
            '[[The situation is serious but not necessarily a crisis.|Serio pero no crisis.]]',
            '[[It is definitely a crisis.|Crisis segura — niega.]]',
            '[[There is no problem.|Sin problema — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Wouldn\'t go so far as to* hedges; *serious headwind* = difficulty.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u69-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Follow-up 2|Complemento]]',
      instructions: 'Listen and choose.',
      questions: [
        {
          question:
            'Speaker: "What matters in this unit is not memorising lists but noticing how language patterns recur in authentic use."\n\nThe speaker emphasises:',
          options: [
            '[[noticing patterns in real use|fijarse en patrones en uso real]]',
            '[[memorising long lists|memorizar listas]]',
            '[[avoiding authentic input|evitar input auténtico]]',
          ],
          correctAnswer: 0,
          explanation: 'The speaker contrasts lists with noticing patterns in authentic language.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u69-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Follow-up 3|Complemento]]',
      instructions: 'Listen and choose.',
      questions: [
        {
          question:
            'Speaker: "What matters in this unit is not memorising lists but noticing how language patterns recur in authentic use."\n\nThe speaker emphasises:',
          options: [
            '[[noticing patterns in real use|fijarse en patrones en uso real]]',
            '[[memorising long lists|memorizar listas]]',
            '[[avoiding authentic input|evitar input auténtico]]',
          ],
          correctAnswer: 0,
          explanation: 'The speaker contrasts lists with noticing patterns in authentic language.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u69-w1',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-register',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Discussion section|Discusión]]',
      instructions: 'Choose the best hedged sentence for a Discussion.',
      questions: [
        {
          question: 'Which sentence fits a Discussion section?',
          options: [
            '[[One interpretation is that the effect is mediated by unmeasured variables.|Una interpretación es que…]]',
            '[[The effect is definitely mediated by unmeasured variables.|demasiado categórico]]',
            '[[Unmeasured variables prove mediation.|*prove* sin evidencia]]',
          ],
          correctAnswer: 0,
          explanation:
            '*One interpretation is that* frames the claim as provisional.',
        },
      ],
    },
    topicName: 'Writing',
  },
{
    id: 'c1-u69-w2',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-register',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Cohesion and register|Cohesión y registro]]',
      instructions: 'Choose the sentence that best models C1 academic register.',
      questions: [
        {
          question: 'Which sentence is most appropriate in a formal paragraph on this unit\'s theme?',
          options: [
            '[[It is worth noting that the evidence does not permit a single simplistic conclusion; rather, it points to an interplay of factors that merit separate discussion.|matiz y formalidad]]',
            '[[The theme is interesting and has many sides.|demasiado simple]]',
            '[[I think this unit is about stuff.|informal]]',
          ],
          correctAnswer: 0,
          explanation: 'Hedging and formal vocabulary suit C1 writing.',
        },
      ],
    },
    topicName: 'Writing',
  },
{
    id: 'c1-u69-w3',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-register',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Cohesion and register|Cohesión y registro]]',
      instructions: 'Choose the sentence that best models C1 academic register.',
      questions: [
        {
          question: 'Which sentence is most appropriate in a formal paragraph on this unit\'s theme?',
          options: [
            '[[It is worth noting that the evidence does not permit a single simplistic conclusion; rather, it points to an interplay of factors that merit separate discussion.|matiz y formalidad]]',
            '[[The theme is interesting and has many sides.|demasiado simple]]',
            '[[I think this unit is about stuff.|informal]]',
          ],
          correctAnswer: 0,
          explanation: 'Hedging and formal vocabulary suit C1 writing.',
        },
      ],
    },
    topicName: 'Writing',
  },
];
