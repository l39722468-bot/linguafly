/**
 * C1 Unit 68 — Language Lab: Cleft sentences and pseudo-clefts
 * Supplementary track: it-clefts, wh-clefts, emphasis and information structure.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'C1 Language Lab — Clefts and Pseudo-clefts';

export const UNIT_68_EXERCISES: Exercise[] = [
{
    id: 'c1-u68-g1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'it-cleft',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[It-clefts|Oraciones hendidas con *It*]]',
      instructions: 'Choose the correct sentence.',
      questions: [
        {
          question: 'Which sentence correctly emphasises *the methodology*?',
          options: [
            '[[It was the methodology that reviewers criticised, not the conclusions.|Era la metodología lo que…]]',
            '[[It was the methodology which reviewers criticised not the conclusions.|falta puntuación y *that* preferible]]',
            '[[It was criticised the methodology that reviewers.|orden incorrecto]]',
          ],
          correctAnswer: 0,
          explanation:
            '*It is/was + focused element + that/who + clause* — *that* is standard for things.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u68-g2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'it-cleft',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[It is … who/that|Énfasis en la persona]]',
      instructions: 'Complete with one word.',
      questions: [
        {
          question: '_______ was the lead author who later retracted the paper, not the co-authors.',
          options: ['[[It|It]]', '[[There|*There* no es hendida]]', '[[This|incorrecto]]'],
          correctAnswer: 'It',
          acceptableAnswers: ['It'],
          explanation: '*It was X who* focuses on the person responsible.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u68-g3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'wh-cleft',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Wh-clefts (pseudo-clefts)|What-clause + be]]',
      instructions: 'Choose the best sentence.',
      questions: [
        {
          question: 'Which reformulation is most natural?',
          options: [
            '[[What the study lacks is a clear control group.|Lo que falta es…]]',
            '[[What is the study lacks is a clear control group.|orden incorrecto]]',
            '[[What lacks the study is a clear control group.|orden no idiomático]]',
          ],
          correctAnswer: 0,
          explanation:
            '*What-clause + be + focus*: *What we need is transparency*.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u68-v1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'information-structure',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Given vs new information|Información dada / nueva]]',
      instructions: 'Choose the term used for “starting point” of the clause.',
      questions: [
        {
          question: 'In information structure, the _______ typically matches what the listener already shares.',
          options: [
            '[[given information|información dada]]',
            '[[new information|es el foco novedoso]]',
            '[[theme only|solo tema — incompleto]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Given* vs *new* (or *theme* vs *rheme*) organises emphasis; clefts manipulate this.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u68-v2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'information-structure',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Salience / foregrounding|Prominencia]]',
      instructions: 'Complete with the best noun.',
      questions: [
        {
          question: 'Clefting increases the _______ of the focal element in discourse.',
          options: ['[[salience|prominencia]]', '[[salient|adjetivo]]', '[[saliently|adverbio]]'],
          correctAnswer: 'salience',
          acceptableAnswers: ['salience'],
          explanation:
            '*Salience* = prominence; related to *foregrounding* in stylistics.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u68-v3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'information-structure',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[End-weight|Principio de peso final]]',
      instructions: 'Choose the best completion.',
      questions: [
        {
          question: 'Heavy clauses are often postponed to satisfy _______.',
          options: [
            '[[end-weight (or end-focus) principles|principio de peso final]]',
            '[[start-weight|no es el término estándar]]',
            '[[mid-weight|no existe]]',
          ],
          correctAnswer: 0,
          explanation:
            'English prefers longer, newer information at the end of the clause.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u68-r1',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Academic abstract|Resumen académico]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "What this paper challenges is not the existence of bias but the assumption that bias can be measured in a single metric." What is the focus?',
          options: [
            '[[The questionable assumption about measuring bias in one metric.|La suposición cuestionable.]]',
            '[[The non-existence of bias.|No existe sesgo — falso.]]',
            '[[That bias is easy to measure.|Fácil de medir — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*What-clause + be + not X but Y* contrasts two elements; emphasis on *assumption*.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u68-r2',
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
            'Text: "It was only after replication that the effect size shrank." What happened?',
          options: [
            '[[The reported effect became smaller once the study was replicated.|El efecto se redujo al replicar.]]',
            '[[Replication increased the effect size.|Aumentó — falso.]]',
            '[[No replication occurred.|No hubo replicación — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*It was only after X that Y* emphasises timing; *shrank* = got smaller.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u68-r3',
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
            'Text: "Returning to the core theme of this unit (C1 Language Lab — Clefts and Pseudo-clefts), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u68-l1',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Conference Q&A|Preguntas]]',
      instructions: 'Listen and choose.',
      questions: [
        {
          question:
            'Speaker: "What I\'m asking isn\'t for special treatment — it\'s for consistency across cases." What does the speaker want?',
          options: [
            '[[Consistent application of rules, not favouritism.|Consistencia, no favoritismo.]]',
            '[[Special treatment.|Trato especial — niega explícitamente.]]',
            '[[To avoid all rules.|Evitar reglas — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*What I\'m asking isn\'t X — it\'s Y* is a wh-cleft contrast.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u68-l2',
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
    id: 'c1-u68-l3',
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
    id: 'c1-u68-w1',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-register',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Emphasis in essays|Énfasis en redacción]]',
      instructions: 'Choose the sentence that uses a cleft appropriately.',
      questions: [
        {
          question: 'Which sentence best highlights the main problem in an academic review?',
          options: [
            '[[It is the lack of longitudinal data that undermines the study\'s claims.|Es la falta de datos longitudinales lo que…]]',
            '[[The lack of longitudinal data it is that undermines the study\'s claims.|orden no inglés]]',
            '[[Undermines the study\'s claims the lack of longitudinal data.|V2 orden]]',
          ],
          correctAnswer: 0,
          explanation:
            '*It is X that* + verb + object focuses on *X*.',
        },
      ],
    },
    topicName: 'Writing',
  },
{
    id: 'c1-u68-w2',
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
    id: 'c1-u68-w3',
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
