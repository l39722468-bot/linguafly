/**
 * C1 Unit 67 — Language Lab: Inversion and emphatic fronting
 * Supplementary track: negative/limiting adverbials, never/so/such inversion, formal emphasis.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'C1 Language Lab — Inversion and Emphatic Fronting';

export const UNIT_67_EXERCISES: Exercise[] = [
{
    id: 'c1-u67-g1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'inversion-negative-adverbials',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Never / Seldom / Rarely|Inversión con adverbios negativos]]',
      instructions: 'Choose the grammatically correct sentence.',
      questions: [
        {
          question: 'Which sentence is correct in formal English?',
          options: [
            '[[Never had I seen such a rapid policy shift in the sector.|Nunca había visto… (inversión correcta)]]',
            '[[Never I had seen such a rapid policy shift in the sector.|orden sin inversión]]',
            '[[Never did I saw such a rapid policy shift in the sector.|*did* + *saw* incorrecto]]',
          ],
          correctAnswer: 0,
          explanation:
            'After *Never* at the start of the clause, use **auxiliary + subject + main verb**: *Never had I seen* (past perfect inversion).',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u67-g2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'inversion-negative-adverbials',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Little / Little did|Little + inversión]]',
      instructions: 'Complete with the correct auxiliary and verb form.',
      questions: [
        {
          question:
            '_______ _______ the researchers realise that the sample had been contaminated before the trial began.',
          options: [
            '[[Little did|Little did]]',
            '[[Little the|orden incorrecto]]',
            '[[Little had they did|no estándar]]',
          ],
          correctAnswer: 'Little did',
          acceptableAnswers: ['Little did'],
          explanation:
            '*Little* + inversion + *did* + subject + *realise* = *they hardly realised* (formal emphasis).',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u67-g3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'inversion-negative-adverbials',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Not only … but also|Not only + inversión]]',
      instructions: 'Choose the correct continuation.',
      questions: [
        {
          question: 'Not only _______ the report overstated the benefits, but it also failed to disclose risks.',
          options: [
            '[[did|did — inversión tras *Not only*]]',
            '[[the report|falta auxiliar]]',
            '[[has the report|tiempo verbal forzado]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Not only* + auxiliary + subject + verb: *Not only did the report overstate*.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u67-v1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'emphasis-lexis',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Understatement / overstatement|Atenuación y énfasis]]',
      instructions: 'Choose the best collocation for academic tone.',
      questions: [
        {
          question: 'The findings are _______ — they challenge the consensus view in three separate areas.',
          options: [
            '[[far-reaching|de gran alcance]]',
            '[[far-reachingly|adverbio no estándar aquí]]',
            '[[far-reach|sin -ing]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Far-reaching* (adjective) = having wide implications; often modifies *findings*, *consequences*.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u67-v2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'emphasis-lexis',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Paramount / pivotal|Crucial]]',
      instructions: 'Complete with the best noun.',
      questions: [
        {
          question: 'At no point was the _______ of independent oversight clearer than during the audit.',
          options: ['[[importance|importancia]]', '[[paramount|adjetivo; falta sustantivo]]', '[[importantly|adverbio]]'],
          correctAnswer: 'importance',
          acceptableAnswers: ['importance'],
          explanation:
            '*The importance of independent oversight*; *paramount* is an adjective (*of paramount importance*).',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u67-v3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'emphasis-lexis',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Unprecedented / unparalleled|Sin precedentes]]',
      instructions: 'Choose the word that fits the sentence.',
      questions: [
        {
          question: 'Seldom has there been _______ public scrutiny of executive pay in this sector.',
          options: [
            '[[such unprecedented|such unprecedented]]',
            '[[such unprecedentedness|sustantivo forzado]]',
            '[[so unprecedentedly|modifica verbo; aquí falta sustantivo]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Such unprecedented* + noun = *such unprecedented scrutiny*; *such* + adjective + noun.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u67-r1',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Formal editorial|Editorial formal]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Rarely can one encounter a single policy instrument that so comprehensively reshapes incentives. Nowhere is this truer than in carbon pricing." What does the author imply?',
          options: [
            '[[Carbon pricing is an unusually powerful instrument for changing incentives.|El precio del carbono es un instrumento poderoso.]]',
            '[[Carbon pricing is ineffective.|Ineficaz — contradice el texto.]]',
            '[[Policy instruments never work.|Nunca funcionan — demasiado fuerte.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Rarely can one encounter* + *Nowhere is this truer* = strong emphasis on rarity and strength of carbon pricing.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u67-r2',
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
            'Text: "Only after a decade of litigation did the parties settle — and even then, not without acrimony." What happened?',
          options: [
            '[[They settled after long litigation, but relations remained bitter.|Acuerdo tras litigio, con resentimiento.]]',
            '[[They settled immediately.|Inmediato — falso.]]',
            '[[They settled without any conflict.|Sin conflicto — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Only after … did* + *not without acrimony* = settlement was late and hostile.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u67-r3',
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
            'Text: "Returning to the core theme of this unit (C1 Language Lab — Inversion and Emphatic Fronting), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u67-l1',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Academic lecture|Conferencia académica]]',
      instructions: 'Listen and choose the correct answer.',
      questions: [
        {
          question:
            'A lecturer says: "At no stage in the experiment did we control for selection bias — a limitation we must acknowledge upfront." What does she admit?',
          options: [
            '[[Selection bias was not controlled for at any stage.|Sesgo de selección no controlado en ninguna fase.]]',
            '[[Selection bias was fully controlled.|Totalmente controlado — falso.]]',
            '[[The experiment had no limitations.|Sin limitaciones — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*At no stage … did we control* = inversion; never controlled for selection bias.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u67-l2',
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
    id: 'c1-u67-l3',
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
    id: 'c1-u67-w1',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-register',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Emphatic style|Estilo enfático]]',
      instructions: 'Choose the sentence that uses inversion appropriately in academic writing.',
      questions: [
        {
          question: 'Which opening is most appropriate for a formal essay?',
          options: [
            '[[Not only does this theory explain the anomaly, but it also predicts outcomes that simpler models miss.|No solo explica…]]',
            '[[Not only this theory explains the anomaly, but it also predicts…|falta inversión]]',
            '[[This theory explains not only the anomaly, but it also predicts…|*not only* mal colocado]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Not only* + auxiliary + subject + verb: *Not only does this theory explain*.',
        },
      ],
    },
    topicName: 'Writing',
  },
{
    id: 'c1-u67-w2',
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
    id: 'c1-u67-w3',
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
