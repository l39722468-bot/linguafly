/**
 * C1 Unit 62 — Language Lab: Verb + preposition / adjective + preposition
 * Supplementary track: fixed prepositional patterns at C1 in formal argument and academic prose.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'C1 Language Lab — Prepositional Patterns';

export const UNIT_62_EXERCISES: Exercise[] = [
{
    id: 'c1-u62-g1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'verb-preposition',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Verb + Preposition|Verbo + preposición]]',
      instructions: 'Choose the sentence that uses the correct preposition after the verb.',
      questions: [
        {
          question: 'Which sentence is correct in formal English?',
          options: [
            '[[The complexity of the data does not lend itself to simplistic policy conclusions.|La complejidad de los datos no se presta a conclusiones políticas simplistas.]]',
            '[[The complexity of the data does not lend itself for simplistic policy conclusions.|… *lend itself for* (incorrecto).]]',
            '[[The complexity of the data does not lend itself at simplistic policy conclusions.|… *lend itself at* (incorrecto).]]',
          ],
          correctAnswer: 0,
          explanation:
            'Fixed pattern: *lend itself to something* = be suitable for or capable of (often with a negative).',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u62-g2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'verb-preposition',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Verb + Preposition|Verbo + preposición]]',
      instructions: 'Complete with the correct preposition (one word).',
      questions: [
        {
          question:
            'Despite repeated warnings, the board declined to comment ______ the allegations until its legal team had reviewed the evidence.',
          options: ['[[on|sobre]]', '[[for|para]]', '[[at|en]]'],
          correctAnswer: 'on',
          acceptableAnswers: ['on'],
          explanation:
            '*Comment on* = discuss or respond to (a topic). *Comment about* occurs but *on* is the dominant collocation in formal registers.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u62-g3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'verb-preposition',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Verb + Preposition|Verbo + preposición]]',
      instructions: 'Choose the option that completes the sentence correctly.',
      questions: [
        {
          question:
            'The inquiry found that senior officials had deliberately withheld key information ______ both Parliament and the public.',
          options: ['[[from|de / a]]', '[[to|a]]', '[[for|para]]'],
          correctAnswer: 0,
          explanation:
            '*Withhold something from someone* = refuse to give or share information. *To* and *for* do not fit this pattern.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u62-v1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'adjective-preposition',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Adjective + Preposition|Adjetivo + preposición]]',
      instructions: 'Choose the correct preposition.',
      questions: [
        {
          question: 'The committee expressed concern that the proposed reforms might be detrimental ______ public trust in institutions.',
          options: ['[[to|a]]', '[[for|para]]', '[[on|en]]'],
          correctAnswer: 0,
          explanation:
            '*Detrimental to* = harmful to. A fixed collocation in formal English.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u62-v2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'adjective-preposition',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Adjective + Preposition|Adjetivo + preposición]]',
      instructions: 'Complete with the correct preposition.',
      questions: [
        {
          question:
            'The lead author was openly dismissive ______ the suggestion that correlation in the dataset could be read as causation.',
          options: ['[[of|de]]', '[[to|a]]', '[[for|para]]'],
          correctAnswer: 'of',
          acceptableAnswers: ['of'],
          explanation:
            '*Dismissive of* something = treating it as unworthy of serious consideration. Not *dismissive to/for*.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u62-v3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'adjective-preposition',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Adjective + Preposition|Adjetivo + preposición]]',
      instructions: 'Choose the option that completes the sentence correctly.',
      questions: [
        {
          question:
            'The author argues that chronic underfunding is symptomatic ______ a deeper unwillingness to treat education as a public good.',
          options: ['[[of|de]]', '[[for|para]]', '[[to|a]]'],
          correctAnswer: 0,
          explanation:
            '*Symptomatic of* = serving as a sign of an underlying condition or attitude.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u62-r1',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Policy Text|Texto sobre políticas]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "The regulator is under no obligation to defer to industry self-assessments; its mandate is precisely to protect consumers from practices that are opaque to non-experts yet immensely profitable to incumbents." What is the regulator\'s role, according to the text?',
          options: [
            '[[To protect consumers rather than accept industry self-assessment uncritically.|Proteger al consumidor en lugar de aceptar sin crítica la autovaloración del sector.]]',
            '[[To defer automatically to industry assessments.|Diferir automáticamente a las evaluaciones del sector.]]',
            '[[To maximise profits for incumbent firms.|Maximizar beneficios para las empresas establecidas.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Under no obligation to defer to* = not required to follow; mandate *to protect consumers from practices*.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u62-r2',
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
            'Text: "She was candid about the limitations of the model but reluctant to speculate on outcomes beyond the five-year horizon." What can be inferred?',
          options: [
            '[[She acknowledged weaknesses but avoided long-range prediction.|Reconoció debilidades pero evitó predicción a largo plazo.]]',
            '[[She denied that the model had any limitations.|Negó limitaciones del modelo.]]',
            '[[She predicted outcomes beyond five years with confidence.|Predijo resultados más allá de cinco años con confianza.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Candid about limitations* = admitted them; *reluctant to speculate on outcomes beyond* = avoided long-range speculation.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u62-r3',
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
            'Text: "Returning to the core theme of this unit (C1 Language Lab — Prepositional Patterns), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u62-l1',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Briefing|Sesión informativa]]',
      instructions: 'Listen and choose the correct answer.',
      questions: [
        {
          question:
            'A policy adviser says: "We should be wary of reading too much into a single quarter\'s figures; what matters is whether the underlying trend is consistent with our projections, not whether headline numbers conform to media narratives." What is the adviser warning against?',
          options: [
            '[[Over-interpreting short-term figures while ignoring the broader trend.|Sobreinterpretar cifras a corto plazo e ignorar la tendencia subyacente.]]',
            '[[Ignoring quarterly data altogether.|Ignorar por completo los datos trimestrales.]]',
            '[[Trusting only media narratives.|Confiar solo en los relatos mediáticos.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Wary of reading too much into* = caution against over-interpretation; *what matters is whether the underlying trend…* emphasises the broader pattern.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u62-l2',
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
    id: 'c1-u62-l3',
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
    id: 'c1-u62-w1',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-register',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Formal Precision|Precisión formal]]',
      instructions: 'Choose the sentence with correct prepositional patterns for an academic essay.',
      questions: [
        {
          question: 'Which sentence is most accurate at C1 level?',
          options: [
            '[[The evidence is insufficient to justify reliance on self-reported data alone; it must be triangulated with independent sources.|La evidencia es insuficiente para justificar depender solo de datos autodeclarados…]]',
            '[[The evidence is insufficient for justify reliance in self-reported data alone.|… *for justify*, *reliance in* (incorrectos).]]',
            '[[The evidence is insufficient to relying on self-reported data alone.|… *to relying* (incorrecto).]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Insufficient to justify* + noun phrase; *reliance on* = dependence on. The other options break grammar or preposition choice.',
        },
      ],
    },
    topicName: 'Writing',
  },
{
    id: 'c1-u62-w2',
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
    id: 'c1-u62-w3',
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
