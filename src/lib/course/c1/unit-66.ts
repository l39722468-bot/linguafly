/**
 * C1 Unit 66 — Language Lab: Mandative subjunctive and formal institutional English
 * Supplementary track: subjunctive after *that* with *essential*, *require*, *order*, *whether it be*, etc.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'C1 Language Lab — Mandative Subjunctive';

export const UNIT_66_EXERCISES: Exercise[] = [
{
    id: 'c1-u66-g1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'mandative-subjunctive',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[It is essential that … be|Es esencial que + subjuntivo mandativo]]',
      instructions: 'Choose the sentence that follows formal mandative subjunctive rules.',
      questions: [
        {
          question: 'Which sentence is correct in formal legal drafting?',
          options: [
            '[[It is essential that every party be notified before enforcement action is taken.|Es esencial que cada parte sea notificada…]]',
            '[[It is essential that every party is notified before enforcement action is taken.|indicativo — menos propio del registro mandativo formal]]',
            '[[It is essential that every party will be notified before enforcement action is taken.|*will* no encaja en el mandativo estándar]]',
          ],
          correctAnswer: 0,
          explanation:
            'After *It is essential that*, formal English uses the **base form** (*be*, *notify* → *be notified* passive subjunctive) for all persons.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u66-g2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'mandative-subjunctive',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Require that …|Require that]]',
      instructions: 'Complete with the correct verb form (one word).',
      questions: [
        {
          question:
            'The statute requires that a qualified supervisor _______ present whenever hazardous materials are handled.',
          options: ['[[be|sea / esté (subjuntivo mandativo)]]', '[[is|es]]', '[[will be|será]]'],
          correctAnswer: 'be',
          acceptableAnswers: ['be'],
          explanation:
            '*Require that* + subject + **base form** (*be*) in formal registers; American legal English and formal BrE academic prose often prefer this over *is*.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u66-g3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'mandative-subjunctive',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Recommend / suggest / insist|Recommend / suggest / insist]]',
      instructions: 'Choose the grammatically correct option in formal English.',
      questions: [
        {
          question: 'The panel strongly recommended that the chief executive _______ pending the outcome of the inquiry.',
          options: [
            '[[step aside|dimita temporalmente / se aparte]]',
            '[[steps aside|3ª persona -s en mandativo formal no estándar]]',
            '[[will step aside|*will* incorrecto en este mandativo]]',
          ],
          correctAnswer: 0,
          explanation:
            'After *recommended that*, the mandative subjunctive uses the **bare infinitive** without *-s*: *step*, *be*, *resign*.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u66-v1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'legal-register',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Legal and Institutional Lexis|Léxico legal e institucional]]',
      instructions: 'Choose the word that best fits the formal context.',
      questions: [
        {
          question:
            'The contract _______ that either party may terminate the agreement on ninety days\' written notice.',
          options: [
            '[[stipulates|estipula]]',
            '[[stipulations|sustantivo plural; no encaja como verbo]]',
            '[[stipulating|gerundio solo; falta auxiliar]]',
          ],
          correctAnswer: 0,
          explanation:
            'Verb *stipulate* = specify as a condition in a contract or rule.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u66-v2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'legal-register',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Binding / mandatory|Vinculante / obligatorio]]',
      instructions: 'Complete with the best noun.',
      questions: [
        {
          question:
            'Failure to comply with the disclosure rules may result in a legally enforceable _______.',
          options: ['[[sanction|sanción]]', '[[sanctioned|participio; no encaja]]', '[[sanctioning|gerundio]]'],
          correctAnswer: 'sanction',
          acceptableAnswers: ['sanction'],
          explanation:
            'Countable *sanction* = penalty; *sanctions* plural often = measures, but singular *a sanction* works for a specific penalty.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u66-v3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'legal-register',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Pursuant to / subject to|Conforme a / sujeto a]]',
      instructions: 'Choose the correct formal prepositional phrase.',
      questions: [
        {
          question:
            '_______ Article 14(2), personal data may be processed only where a lawful basis exists.',
          options: [
            '[[Pursuant to|De conformidad con / en virtud de]]',
            '[[According for|no es inglés estándar]]',
            '[[Following of|incorrecto]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Pursuant to* = in accordance with (formal legal).',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u66-r1',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Regulatory Text|Texto regulatorio]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Notwithstanding any other provision herein, either party may terminate this agreement forthwith should the counterparty commit a material breach that remains uncured after thirty days\' written notice." What does *should the counterparty commit* mean?',
          options: [
            '[[If the counterparty commits (formal conditional).|Si la contraparte comete…]]',
            '[[The counterparty must never commit a breach.|Nunca debe cometer incumplimiento.]]',
            '[[The breach has already been cured.|El incumplimiento ya ha sido subsanado.]]',
          ],
          correctAnswer: 0,
          explanation:
            'Formal *should* + subject + verb = *if* (similar to *should you need*). *Material breach* = serious violation of contract.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u66-r2',
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
            'Text: "The tribunal directed that the records be sealed and that no party publish extracts pending appeal." What is required?',
          options: [
            '[[Sealing of records and a ban on publication until the appeal is resolved.|Sellado de expedientes y prohibición de publicar hasta el recurso.]]',
            '[[Immediate publication of all records.|Publicación inmediata de todo.]]',
            '[[Automatic dismissal of the appeal.|Desestimación automática del recurso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Directed that* + mandative *be sealed*; *that no party publish* = subjunctive *publish* without *-s*.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u66-r3',
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
            'Text: "Returning to the core theme of this unit (C1 Language Lab — Mandative Subjunctive), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u66-l1',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Compliance Briefing|Sesión de cumplimiento normativo]]',
      instructions: 'Listen and choose the correct answer.',
      questions: [
        {
          question:
            'A compliance officer says: "It is imperative that all staff complete the training module by Friday — I cannot stress strongly enough that no extensions will be granted without written sign-off from the data protection officer." What must staff do?',
          options: [
            '[[Finish the training module by Friday unless the DPO gives written approval for an extension.|Completar el módulo antes del viernes salvo prórroga firmada por el DPO.]]',
            '[[Extensions are automatic for everyone.|Prórrogas automáticas para todos.]]',
            '[[Training is optional.|La formación es opcional.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*It is imperative that* expresses obligation; *no extensions without written sign-off from the DPO* limits exceptions.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u66-l2',
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
    id: 'c1-u66-l3',
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
    id: 'c1-u66-w1',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-register',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Formal Recommendation|Recomendación formal]]',
      instructions: 'Choose the sentence that models appropriate formal mandative style.',
      questions: [
        {
          question: 'Which sentence is most suitable in a formal report to a board?',
          options: [
            '[[We recommend that the board appoint an independent reviewer to assess conflicts of interest before any vote is taken.|Recomendamos que el consejo nombre…]]',
            '[[We recommend that the board appoints an independent reviewer to assess conflicts of interest before any vote is taken.|*appoints* menos idiomático en mandativo formal]]',
            '[[We recommend the board to appoint an independent reviewer…|estructura *recommend + object + to-infinitive* menos natural que *that* + subjuntivo aquí]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Recommend that* + subject + bare infinitive (*appoint*) is the classic mandative pattern in formal reports.',
        },
      ],
    },
    topicName: 'Writing',
  },
{
    id: 'c1-u66-w2',
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
    id: 'c1-u66-w3',
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
