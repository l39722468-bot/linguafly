/**
 * C1 Unit 64 — Language Lab: Fixed expressions, binomials and academic stems
 * Supplementary track: chunks and sentence frames for formal argument at C1.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'C1 Language Lab — Fixed Expressions and Academic Stems';

export const UNIT_64_EXERCISES: Exercise[] = [
{
    id: 'c1-u64-g1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'academic-stems',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Academic Sentence Stems|Fórmulas de inicio académico]]',
      instructions: 'Choose the sentence that uses a natural C1 academic stem.',
      questions: [
        {
          question: 'Which opening is most appropriate in a formal essay?',
          options: [
            '[[It is worth noting that the available evidence is largely correlational.|Cabe señalar que la evidencia disponible es en gran medida correlacional.]]',
            '[[It is worth to note that the available evidence is largely correlational.|… *worth to note* (incorrecto).]]',
            '[[It is worthy noting that the available evidence is largely correlational.|… *worthy noting* (incorrecto).]]',
          ],
          correctAnswer: 0,
          explanation:
            'Fixed frame: *It is worth noting that* + clause. Not *worth to note* or *worthy noting*.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u64-g2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'academic-stems',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Formal Frames|Marcos formales]]',
      instructions: 'Complete with the correct word to form a fixed phrase.',
      questions: [
        {
          question:
            '_______ the extent to which social media shapes political behaviour, the literature remains deeply divided.',
          options: ['[[Given|Dada]]', '[[Giving|Gerundio incorrecto aquí]]', '[[Gave|Pasado; no encaja]]'],
          correctAnswer: 'Given',
          acceptableAnswers: ['Given'],
          explanation:
            '*Given the extent to which…* = taking into account how much… *Given* introduces a premise; not *giving/gave*.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u64-g3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'fixed-expressions',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Fixed Expressions|Expresiones fijas]]',
      instructions: 'Choose the correct completion.',
      questions: [
        {
          question: 'The reforms were adopted _______ considerable opposition from trade unions.',
          options: [
            '[[in the face of|a pesar de / frente a]]',
            '[[in the face to|incorrecto]]',
            '[[on the face of|confunde con *on the face of it*]]',
          ],
          correctAnswer: 0,
          explanation:
            '*In the face of* + noun = despite or in spite of (difficult circumstances).',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u64-v1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'binomials',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Binomial Phrases|Frases binomiales]]',
      instructions: 'Choose the conventional binomial (fixed word order).',
      questions: [
        {
          question: 'After years of _______, the team finally arrived at a robust methodology.',
          options: [
            '[[trial and error|prueba y error]]',
            '[[error and trial|orden no convencional]]',
            '[[trials and errors|plural; no es la frase fija]]',
          ],
          correctAnswer: 0,
          explanation:
            'Fixed phrase *trial and error* — singular nouns in that order.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u64-v2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'binomials',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Binomial Phrases|Frases binomiales]]',
      instructions: 'Complete the fixed pair.',
      questions: [
        {
          question:
            'The essay should weigh the _______ and _______ of mandatory digital identity systems before recommending legislation.',
          options: [
            '[[pros / cons|ventajas y inconvenientes]]',
            '[[cons / pros|orden no idiomático]]',
            '[[proses / con|incorrecto]]',
          ],
          correctAnswer: 'pros / cons',
          acceptableAnswers: ['pros / cons', 'pros and cons'],
          explanation:
            '*Pros and cons* = standard collocation; order is normally *pros* first.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u64-v3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'fixed-expressions',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Formal Idioms|Modismos formales]]',
      instructions: 'Choose the option that completes the sentence correctly.',
      questions: [
        {
          question:
            'The scandal has _______ the government on the defensive for the remainder of the parliamentary session.',
          options: [
            '[[put|puesto]]',
            '[[placed|*place* no forma esta frase fija]]',
            '[[set|*set* no forma esta frase fija]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Put someone on the defensive* = cause them to justify themselves. Fixed verb *put* in this chunk.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u64-r1',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Editorial Register|Registro editorial]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "By the same token, if we accept that markets discipline inefficiency, we must also accept that they discipline — often brutally — those least equipped to absorb shocks." What does *by the same token* signal?',
          options: [
            '[[A parallel logical consequence from what was just argued.|Una consecuencia lógica paralela.]]',
            '[[A complete change of subject.|Un cambio total de tema.]]',
            '[[An apology for the previous claim.|Una disculpa por lo anterior.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*By the same token* = for the same reason; similarly; applying the same logic.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u64-r2',
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
            'Text: "In light of subsequent disclosures, the initial narrative — plausible though it seemed — no longer holds water." What does *holds water* mean here?',
          options: [
            '[[remains credible or defensible|sigue siendo creíble o defendible]]',
            '[[contains liquid|contiene líquido (literal)]]',
            '[[attracts media attention|atrae atención mediática]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Hold water* (idiomatic) = stand up to scrutiny; be convincing. *In light of* = given, considering.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u64-r3',
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
            'Text: "Returning to the core theme of this unit (C1 Language Lab — Fixed Expressions and Academic Stems), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u64-l1',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Interview|Entrevista]]',
      instructions: 'Listen and choose the correct answer.',
      questions: [
        {
          question:
            'An economist says: "Let me be clear: I am not for a moment suggesting that regulation is unnecessary — far from it. What I am saying is that poorly designed rules can perversely undermine the very goals they were meant to serve." What is the economist\'s position?',
          options: [
            '[[Regulation is needed, but bad regulation can backfire.|Hace falta regulación, pero una mala regulación puede ser contraproducente.]]',
            '[[All regulation should be abolished.|Toda regulación debería suprimirse.]]',
            '[[Regulation always achieves its goals.|La regulación siempre cumple sus objetivos.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Far from it* reinforces disagreement with the idea that regulation is unnecessary; *perversely undermine* = have the opposite effect.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u64-l2',
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
    id: 'c1-u64-l3',
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
    id: 'c1-u64-w1',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-register',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Essay Stems|Fórmulas de ensayo]]',
      instructions: 'Choose the strongest sentence to introduce a counter-argument section.',
      questions: [
        {
          question: 'Which sentence best introduces objections before your rebuttal?',
          options: [
            '[[It might be objected at this juncture that the evidence I have cited is vulnerable to selection bias; I shall address that concern directly in what follows.|Podría objetarse en este punto que la evidencia…]]',
            '[[Some people will hate this paragraph but whatever.|Registro inadecuado.]]',
            '[[Now I will talk about the opposite.|Demasiado vago.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*It might be objected that…* + preview of rebuttal = classic C1 argumentative stem.',
        },
      ],
    },
    topicName: 'Writing',
  },
{
    id: 'c1-u64-w2',
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
    id: 'c1-u64-w3',
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
