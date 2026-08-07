/**
 * C1 Unit 71 — Language Lab: Participle and reduced clauses
 * Supplementary track: present/past participles, reduced relatives, dangling avoidance.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'C1 Language Lab — Participle and Reduced Clauses';

export const UNIT_71_EXERCISES: Exercise[] = [
{
    id: 'c1-u71-g1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'participle-clauses',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Present participle clauses|Oraciones participiales -ing]]',
      instructions: 'Choose the correct sentence.',
      questions: [
        {
          question: 'Which sentence avoids a dangling participle?',
          options: [
            '[[Having reviewed the data, we concluded that the effect was negligible.|sujeto explícito *we*]]',
            '[[Having reviewed the data, the effect was negligible.|efecto como suelo — dangling]]',
            '[[Reviewing the data, the effect was negligible.|dangling]]',
          ],
          correctAnswer: 0,
          explanation:
            'The subject of the participle clause must be the same as the main clause (*we* reviewed).',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u71-g2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'participle-clauses',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Past participle clauses|-ed participial]]',
      instructions: 'Complete with one word.',
      questions: [
        {
          question: '_______ in haste, the regulation was later challenged in court.',
          options: [
            '[[Drafted|Redactada — participio pasado]]',
            '[[Drafting|gerundio — sujeto distinto]]',
            '[[Having drafted|exige sujeto humano explícito]]',
          ],
          correctAnswer: 'Drafted',
          acceptableAnswers: ['Drafted'],
          explanation:
            '*Drafted in haste* = *When it was drafted*; passive sense with *regulation* as topic.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u71-g3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'reduced-relatives',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Reduced relative clauses|Relativas reducidas]]',
      instructions: 'Choose the correct reduction.',
      questions: [
        {
          question: 'The papers _______ last month have now been indexed.',
          options: [
            '[[published|publicados — reduce *that were published*]]',
            '[[publishing|activo — no encaja]]',
            '[[were published|falta reducir]]',
          ],
          correctAnswer: 0,
          explanation:
            '*The papers published last month* = *that were published*.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u71-v1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'compact-style',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Concise syntax|Sintaxis compacta]]',
      instructions: 'Choose the term for shortening clauses.',
      questions: [
        {
          question: 'Reducing *who was expected to resign* to *expected to resign* is an example of _______.',
          options: [
            '[[reduction / ellipsis|reducción / elipsis]]',
            '[[expansion|expansión — opuesto]]',
            '[[coordination only|solo coordinación — incompleto]]',
          ],
          correctAnswer: 0,
          explanation:
            'Relative clause reduction removes relative pronoun + auxiliary where possible.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u71-v2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'compact-style',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Dangling modifier|Modificador colgante]]',
      instructions: 'Complete the metalanguage label.',
      questions: [
        {
          question: 'When the implied subject of a participle does not match the main clause, editors call it a _______ _______.',
          options: [
            '[[dangling modifier|dangling modifier]]',
            '[[dangled modifier|forma no estándar]]',
            '[[dangle modifier|incorrecto]]',
          ],
          correctAnswer: 'dangling modifier',
          acceptableAnswers: ['dangling modifier', 'dangling participle'],
          explanation:
            'Classic editing term; fix by naming the subject or rewriting.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u71-v3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'compact-style',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Streamlined / pared down|Agilizado]]',
      instructions: 'Choose the best collocation.',
      questions: [
        {
          question: 'The editor asked for a more _______ version of the introduction.',
          options: [
            '[[streamlined|más ágil / depurada]]',
            '[[streamline|verbo]]',
            '[[streamliningly|no existe]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Streamlined* = made more efficient and compact.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u71-r1',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Edited prose|Prosa editada]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Published without peer review, the preprint attracted criticism." What was published without peer review?',
          options: [
            '[[The preprint.|El preprint.]]',
            '[[The criticism.|La crítica — falso.]]',
            '[[Peer review.|La revisión — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            'Subject of *published* is *preprint* (*the preprint was published*).',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u71-r2',
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
            'Text: "Walking through the archive, she noticed inconsistencies in the numbering." Who was walking?',
          options: [
            '[[She was.|Ella caminaba.]]',
            '[[The archive was walking.|Falso.]]',
            '[[The inconsistencies were walking.|Falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            'Participial subject must be *she*, not *archive* or *inconsistencies*.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u71-r3',
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
            'Text: "Returning to the core theme of this unit (C1 Language Lab — Participle and Reduced Clauses), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u71-l1',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Writing tutorial|Tutoría de estilo]]',
      instructions: 'Listen and choose.',
      questions: [
        {
          question:
            'Tutor: "Rather than stacking clause upon clause, try fronting a participle — it often tightens the rhythm." What is the tutor recommending?',
          options: [
            '[[Use participial fronting to make prose tighter.|Participio inicial para ritmo.]]',
            '[[Add more subordinate clauses.|Más subordinadas — opuesto.]]',
            '[[Avoid all punctuation.|Evitar puntuación — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Fronting a participle* = *Having done X, …* style.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u71-l2',
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
    id: 'c1-u71-l3',
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
    id: 'c1-u71-w1',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-register',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Sentence variety|Variedad sintáctica]]',
      instructions: 'Choose the best revision.',
      questions: [
        {
          question: 'Which sentence uses a participle clause effectively?',
          options: [
            '[[Recognising the limitations of self-report measures, we triangulated with administrative data.|Reconociendo…]]',
            '[[We triangulated with administrative data, recognising the limitations of self-report measures.|posible pero menos enfático al inicio]]',
            '[[The limitations of self-report measures recognising, we triangulated.|no gramatical]]',
          ],
          correctAnswer: 0,
          explanation:
            'Fronted participle clause gives reason before the main claim.',
        },
      ],
    },
    topicName: 'Writing',
  },
{
    id: 'c1-u71-w2',
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
    id: 'c1-u71-w3',
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
