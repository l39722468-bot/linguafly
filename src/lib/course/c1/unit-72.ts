/**
 * C1 Unit 72 — Language Lab: Nominalisation
 * Supplementary track: abstract nouns, dense information packaging, academic noun phrases.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'C1 Language Lab — Nominalisation';

export const UNIT_72_EXERCISES: Exercise[] = [
{
    id: 'c1-u72-g1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'nominalisation',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Verb → noun|Sustantivación de verbos]]',
      instructions: 'Choose the most academic noun phrase.',
      questions: [
        {
          question: 'Which phrase fits a formal abstract?',
          options: [
            '[[an investigation into the causes of the decline|investigación de causas]]',
            '[[investigating the causes and what made the decline|demasiado hablado]]',
            '[[they investigated the causes of the decline|oración finita]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Nominalisation* (*investigation*) packs the process into a noun phrase.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u72-g2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'nominalisation',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[-tion / -sion / -ment|Sufijos nominales]]',
      instructions: 'Complete with the nominal form.',
      questions: [
        {
          question: 'The study\'s main _______ is that incentives shape behaviour more than information does.',
          options: [
            '[[contention|afirmación / tesis]]',
            '[[content|contenido — falso amigo]]',
            '[[contend|verbo]]',
          ],
          correctAnswer: 'contention',
          acceptableAnswers: ['contention'],
          explanation:
            '*Contention* = claim (formal); *content* = substance inside.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u72-g3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'nominalisation',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Noun + preposition + noun|Cadenas nominales]]',
      instructions: 'Choose the correct phrase.',
      questions: [
        {
          question: 'Which collocation is standard in academic English?',
          options: [
            '[[a reduction in inequality|reducción de la desigualdad]]',
            '[[a reduction of inequality in|preposición poco idiomática]]',
            '[[a reduce in inequality|*reduce* verbo]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Reduction in* + noun is common; *decrease in* similar.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u72-v1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'nominal-lexis',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Likelihood / probability|Probabilidad nominal]]',
      instructions: 'Choose the best noun.',
      questions: [
        {
          question: 'There is a strong _______ that the effect is non-linear.',
          options: [
            '[[likelihood|probabilidad]]',
            '[[likely|adjetivo]]',
            '[[likeliness|menos frecuente que *likelihood*]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Likelihood* + *that-clause* is standard in statistics and reports.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u72-v2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'nominal-lexis',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Implementation / deployment|Implantación]]',
      instructions: 'Complete the collocation.',
      questions: [
        {
          question: 'Successful _______ of the protocol depends on local buy-in.',
          options: [
            '[[implementation|implementación]]',
            '[[implementing|gerundio — posible pero *implementation* más nominal]]',
            '[[implement|verbo]]',
          ],
          correctAnswer: 'implementation',
          acceptableAnswers: ['implementation'],
          explanation:
            '*Implementation of* + noun = putting into practice.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u72-v3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'nominal-lexis',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Trade-off / downside|Coste de oportunidad]]',
      instructions: 'Choose the word for a disadvantage paired with a benefit.',
      questions: [
        {
          question: 'Faster processing has a _______: higher energy consumption.',
          options: [
            '[[trade-off|compensación / contrapartida]]',
            '[[tradeoff|aceptable en algunos estilos; *trade-off* más común en académico]]',
            '[[trade|comercio — falso amigo]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Trade-off* = balanced disadvantage; *downside* also works.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u72-r1',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Methods section|Metodología]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "The measurement of unobserved heterogeneity presents well-known difficulties." What is nominalised?',
          options: [
            '[[The process of measuring (verb idea) becomes a noun phrase (*measurement*).|Proceso nominalizado.]]',
            '[[Only heterogeneity.|Solo heterogeneidad — incompleto.]]',
            '[[Nothing is nominalised.|Nada — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Measurement* nominalises *to measure*; dense academic packaging.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u72-r2',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Inference|Inferencia]]',
      instructions: 'Choose the best paraphrase.',
      questions: [
        {
          question:
            'Text: "A reassessment of the evidence is now unavoidable." What does the author imply?',
          options: [
            '[[The evidence must be looked at again.|Revisión inevitable.]]',
            '[[The evidence should be ignored.|Ignorar — falso.]]',
            '[[Reassessment is optional.|Opcional — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Reassessment* nominalises; *unavoidable* = no choice.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u72-r3',
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
            'Text: "Returning to the core theme of this unit (C1 Language Lab — Nominalisation), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u72-l1',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Policy briefing|Informe]]',
      instructions: 'Listen and choose.',
      questions: [
        {
          question:
            'Speaker: "Our central contention is simple: without enforcement, any declaration of rights remains purely symbolic." What is the speaker\'s main claim?',
          options: [
            '[[Rights need enforcement to be more than symbolic.|Derechos + cumplimiento.]]',
            '[[Declarations are always effective.|Siempre efectivas — falso.]]',
            '[[Symbolism is unnecessary.|Innecesario — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Central contention* = main claim; *without enforcement* = condition.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u72-l2',
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
    id: 'c1-u72-l3',
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
    id: 'c1-u72-w1',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-register',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Abstract style|Estilo de abstracto]]',
      instructions: 'Choose the sentence with appropriate nominal density.',
      questions: [
        {
          question: 'Which sentence fits an abstract in the social sciences?',
          options: [
            '[[This paper provides a systematic evaluation of policy effectiveness across three cohorts.|sustantivos abstractos]]',
            '[[This paper systematically evaluates how policies work across three cohorts.|menos nominal]]',
            '[[We go through policies in three cohorts and see how they work.|demasiado informal]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Evaluation*, *effectiveness*, *cohorts* pack information nominally.',
        },
      ],
    },
    topicName: 'Writing',
  },
{
    id: 'c1-u72-w2',
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
    id: 'c1-u72-w3',
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
