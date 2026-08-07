/**
 * C1 Unit 61 — Language Lab: Phrasal verbs in argument and discourse
 * Supplementary track: phrasal verbs, register (formal vs informal), and Latinate alternatives.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'C1 Language Lab — Phrasal Verbs in Argument';

export const UNIT_61_EXERCISES: Exercise[] = [
{
    id: 'c1-u61-g1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'phrasal-verbs-formal-register',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Phrasal Verbs — Formal Register|Phrasal verbs — registro formal]]',
      instructions: 'Choose the sentence that uses a phrasal verb appropriately in formal academic or essay-style prose.',
      questions: [
        {
          question: 'Which option is most appropriate in a formal research paper?',
          options: [
            '[[The paper sets out to test whether remote work affects productivity.|El artículo se propone comprobar si el teletrabajo afecta a la productividad.]]',
            '[[The paper finds out to test whether remote work affects productivity.|El artículo "finds out" para comprobar…]]',
            '[[The paper goes out to test whether remote work affects productivity.|El artículo "goes out" para comprobar…]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Set out to* + infinitive = formal way to state aims or intentions. *Find out* does not collocate with *to test* in this structure; *go out to* is not used for purpose here.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u61-g2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'phrasal-verbs-particles',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Separable Phrasal Verbs|Phrasal verbs separables]]',
      instructions: 'Complete with the correct two-word verb. The object is a long noun phrase at the end.',
      questions: [
        {
          question:
            'The regulator chose not to _______ _______ the generous interpretation of the rules proposed by industry lobbyists.',
          options: ['[[buy into|buy into]]', '[[buy in into|buy in into]]', '[[buy onto|buy onto]]'],
          correctAnswer: 'buy into',
          acceptableAnswers: ['buy into'],
          explanation:
            '*Buy into* an idea = accept or believe it (often critically). Word order with a long object: *not buy into the … interpretation*.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u61-g3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'phrasal-verbs-polysemy',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Meaning in Context|Significado en contexto]]',
      instructions: 'Choose the paraphrase that best matches the phrasal verb in context.',
      questions: [
        {
          question:
            'In the sentence "After months of tension, the peace talks broke down," what does *broke down* mean?',
          options: [
            '[[The talks failed and stopped progressing.|Las conversaciones fracasaron y dejaron de avanzar.]]',
            '[[The negotiators physically destroyed the meeting room.|Los negociadores destruyeron la sala.]]',
            '[[The talks were analysed in detail.|Las conversaciones se analizaron en detalle.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Break down* (intransitive, of negotiations) = cease to function successfully; collapse. It is metaphorical, not literal destruction.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u61-v1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'discourse-phrasal-nouns',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Nouns from Phrasal Patterns|Sustantivos derivados de phrasals]]',
      instructions: 'Choose the word that best completes the collocation.',
      questions: [
        {
          question: 'There was a complete _______ in communication between headquarters and field teams during the crisis.',
          options: ['[[breakdown|ruptura / colapso]]', '[[breakup|ruptura sentimental]]', '[[breakout|fuga / brote]]'],
          correctAnswer: 0,
          explanation:
            '*Breakdown* (noun) + *in communication* = failure of a system or process. *Breakup* usually refers to relationships; *breakout* suggests escape or sudden increase.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u61-v2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'phrasal-collocations',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Collocations with Phrasal Verbs|Colocaciones con phrasal verbs]]',
      instructions: 'Complete with the correct verb (one word) to form a common phrasal verb in context.',
      questions: [
        {
          question:
            'For readers unfamiliar with the jargon, the introduction patiently _______ out what each technical term denotes.',
          options: ['[[spells|explica letra por letra / de forma explícita]]', '[[writes|escribe]]', '[[takes|toma]]'],
          correctAnswer: 'spells',
          acceptableAnswers: ['spells'],
          explanation:
            '*Spell out* = explain something clearly and in detail. *Write out* could exist but is less idiomatic here; *take out* does not fit.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u61-v3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'phrasal-verbs-vocabulary',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Three-word Phrasals|Phrasal verbs de tres palabras]]',
      instructions: 'Choose the option that completes the sentence naturally at C1 level.',
      questions: [
        {
          question:
            'Many voters felt the committee had failed to _______ _______ _______ the true environmental costs of the project.',
          options: [
            '[[take into account|tener en cuenta]]',
            '[[take in account|forma incorrecta; falta *into*]]',
            '[[take on account|forma incorrecta]]',
          ],
          correctAnswer: 0,
          explanation:
            'Fixed three-part verb: *take something into account* (= consider it). *Take in account* and *take on account* are not standard.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u61-r1',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Opinion and Discourse|Opinión y discurso]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Critics were quick to shoot down the proposal before its details had been spelled out, yet once independent experts weighed in, several assumptions behind the initial backlash began to fall apart." What does the author suggest about the criticism?',
          options: [
            '[[It was premature and partly based on incomplete information.|Fue prematura y en parte basada en información incompleta.]]',
            '[[It was entirely justified from the outset.|Estaba enteramente justificada desde el principio.]]',
            '[[Independent experts rejected the proposal unanimously.|Los expertos independientes rechazaron la propuesta por unanimidad.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Before its details had been spelled out* implies critics reacted early; *once experts weighed in*, the backlash\'s assumptions *began to fall apart* — i.e. criticism was partly unfounded until clarified.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u61-r2',
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
            'Text: "The committee did not rule out further sanctions, but signalled it would hold off announcing them until diplomatic channels had been exhausted." What is implied?',
          options: [
            '[[Further sanctions remain possible but are not immediate.|Más sanciones siguen siendo posibles pero no son inmediatas.]]',
            '[[Sanctions have been permanently ruled out.|Las sanciones han quedado descartadas para siempre.]]',
            '[[Sanctions will definitely be announced next week.|Las sanciones se anunciarán sin falta la semana que viene.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Did not rule out* = still on the table; *hold off announcing* = delay. Together: possible but not immediate.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u61-r3',
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
            'Text: "Returning to the core theme of this unit (C1 Language Lab — Phrasal Verbs in Argument), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u61-l1',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Media Commentary|Comentario mediático]]',
      instructions: 'Listen and choose the correct answer.',
      questions: [
        {
          question:
            'A political analyst says: "The opposition has tried to play down the significance of the leaked emails, but I don\'t think the story will die down before the vote — if anything, it could boil over." What does the analyst predict?',
          options: [
            '[[The controversy may intensify rather than fade before the vote.|La controversia puede intensificarse antes de la votación.]]',
            '[[The opposition has successfully minimised the scandal.|La oposición ha minimizado con éxito el escándalo.]]',
            '[[The leaked emails will soon be forgotten.|Los correos filtrados pronto se olvidarán.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Die down* = fade; *I don\'t think … before the vote* denies fading; *boil over* suggests escalation. Hence intensification.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u61-l2',
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
    id: 'c1-u61-l3',
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
    id: 'c1-u61-w1',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-op-ed',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Op-ed Opening|Apertura de artículo de opinión]]',
      instructions: 'Choose the strongest opening for an op-ed on institutional trust.',
      questions: [
        {
          question: 'Which opening best combines formal register with natural use of phrasal verbs?',
          options: [
            '[[It is tempting to write off public scepticism toward institutions as mere cynicism; yet a closer look at recent polling suggests that distrust has less to do with ignorance than with repeated failures to follow through on commitments made in plain sight.|Es tentador descartar el escepticismo público…]]',
            '[[So basically people don\'t trust institutions anymore because institutions keep messing up, which is like really bad for democracy.|Coloquial: "basically", "messing up".]]',
            '[[Institutions are bad and everyone knows it and we should get rid of them all right now without thinking.|Tono demasiado absoluto e informal.]]',
          ],
          correctAnswer: 0,
          explanation:
            'Option A uses *write off*, *follow through on* and *in plain sight* in controlled, formal argument. B and C break register.',
        },
      ],
    },
    topicName: 'Writing',
  },
{
    id: 'c1-u61-w2',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-op-ed',
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
    id: 'c1-u61-w3',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-op-ed',
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
