/**
 * C1 Unit 63 — Language Lab: Word formation and lexical precision
 * Supplementary track: affixes, word families, and nuance at C1 (CAE/CPE-style awareness).
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'C1 Language Lab — Word Formation and Precision';

export const UNIT_63_EXERCISES: Exercise[] = [
{
    id: 'c1-u63-g1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'word-formation-prefixes',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Prefixes — Meaning|Prefijos — significado]]',
      instructions: 'Choose the word that fits the context and is correctly formed.',
      questions: [
        {
          question:
            'The inquiry documented the _______ of public money earmarked for disaster relief — funds diverted through shell companies and opaque invoices.',
          options: [
            '[[misappropriation|apropiación indebida]]',
            '[[disappropriation|no es forma estándar en inglés]]',
            '[[unappropriation|no es forma estándar en inglés]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Misappropriation* = dishonest or illegal use of money one is responsible for. Prefix *mis-* + *appropriation*.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u63-g2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'word-formation-suffixes',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Noun Formation|Formación de sustantivos]]',
      instructions: 'Complete with the correct abstract noun form.',
      questions: [
        {
          question:
            'There is a striking lack of _______ between the minister\'s public statements and the leaked internal correspondence.',
          options: ['[[consistency|coherencia / constancia]]', '[[consistentness|forma incorrecta]]', '[[consistence|raro; no es el sustantivo estándar aquí]]'],
          correctAnswer: 'consistency',
          acceptableAnswers: ['consistency'],
          explanation:
            'Adjective *consistent* → noun *consistency*. *Consistence* exists but usually refers to physical texture; *consistentness* is non-standard.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u63-g3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'word-formation-negative',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Negative Affixes|Afijos negativos]]',
      instructions: 'Choose the option that completes the sentence naturally.',
      questions: [
        {
          question:
            'The tribunal concluded that witness testimony had been internally _______ and could not safely support a conviction.',
          options: [
            '[[contradictory|contradictorio]]',
            '[[uncontradictory|no existe como opuesto útil aquí]]',
            '[[contradictious|arcaico / poco usado]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Contradictory* = containing incompatible claims. The negative form needed is about internal conflict, not *un-* + *contradictory* in this sense.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u63-v1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'lexical-precision',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Near-synonyms|Casi sinónimos]]',
      instructions: 'Choose the word with the most precise meaning in context.',
      questions: [
        {
          question:
            'The report documents a systematic _______ of environmental regulations designed to favour extractive industries.',
          options: [
            '[[erosion|erosión gradual]]',
            '[[explosion|explosión]]',
            '[[celebration|celebración]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Erosion* (often figurative) = gradual weakening or undermining of standards. The other options contradict the critical tone.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u63-v2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'lexical-precision',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Formal Nouns|Sustantivos formales]]',
      instructions: 'Complete with the best noun.',
      questions: [
        {
          question:
            'Critics questioned the _______ of using a single metric to capture multidimensional inequality.',
          options: ['[[adequacy|idoneidad / suficiencia]]', '[[adequateness|menos idiomático que *adequacy*]]', '[[adequation|no es inglés estándar]]'],
          correctAnswer: 'adequacy',
          acceptableAnswers: ['adequacy'],
          explanation:
            '*Adequacy* = the state of being adequate or sufficient. Preferred over *adequateness* in formal prose.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u63-v3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'word-families',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Word Families|Familias léxicas]]',
      instructions: 'Choose the sentence that uses the word family correctly.',
      questions: [
        {
          question: 'Which sentence is fully accurate?',
          options: [
            '[[The pervasive assumption that growth is inherently desirable went largely unquestioned.|La suposición generalizada…]]',
            '[[The pervasiveness assumption that growth is inherently desirable went largely unquestioned.|… *pervasiveness assumption* (incorrecto).]]',
            '[[The pervade assumption that growth is inherently desirable went largely unquestioned.|… *pervade* es verbo, no adjetivo.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Pervasive* (adjective) modifies *assumption*. *Pervasiveness* is a noun; *pervade* is a verb.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u63-r1',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Academic Tone|Tono académico]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "The ostensible neutrality of the algorithm belies its embedded assumptions about what counts as relevant information — assumptions that, however unintentionally, reproduce existing hierarchies of visibility." What does *ostensible* suggest about the neutrality?',
          options: [
            '[[It appears to be neutral but may not genuinely be so.|Parece neutral pero quizá no lo sea de hecho.]]',
            '[[It is universally acknowledged as neutral.|Reconocido universalmente como neutral.]]',
            '[[It has been legally proven neutral.|Probado legalmente como neutral.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Ostensible* = stated or appearing to be true, possibly not actually so; *belies* = contradicts or misrepresents.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u63-r2',
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
            'Text: "Incremental change, though politically expedient, may prove illusory if structural incentives remain unchanged." What is the author\'s view of incremental change?',
          options: [
            '[[It may be superficially attractive but ineffective without deeper reform.|Atractivo en superficie pero ineficaz sin reforma profunda.]]',
            '[[It is always the best policy.|Siempre la mejor política.]]',
            '[[It guarantees long-term success.|Garantiza el éxito a largo plazo.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Politically expedient* = convenient in the short term; *illusory* = deceptive; *if structural incentives remain unchanged* implies deeper reform is needed.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u63-r3',
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
            'Text: "Returning to the core theme of this unit (C1 Language Lab — Word Formation and Precision), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u63-l1',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Lecture Extract|Fragmento de clase]]',
      instructions: 'Listen and choose the correct answer.',
      questions: [
        {
          question:
            'A lecturer says: "I want to draw a conceptual distinction here between correlation and causation — a distinction that is routinely elided in popular commentary but absolutely central to how we interpret empirical findings." What is the lecturer emphasising?',
          options: [
            '[[The importance of not confusing correlation with causation when interpreting data.|No confundir correlación y causalidad.]]',
            '[[That correlation and causation mean the same thing.|Que significan lo mismo.]]',
            '[[That popular commentary is always accurate.|Que la prensa popular siempre acierta.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Conceptual distinction* and *routinely elided* (merged or ignored) stress that commentators often conflate what analysts must separate.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u63-l2',
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
    id: 'c1-u63-l3',
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
    id: 'c1-u63-w1',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-register',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Lexical Density|Densidad léxica]]',
      instructions: 'Choose the sentence that best suits a formal problem-solution essay.',
      questions: [
        {
          question: 'Which opening demonstrates the strongest C1 lexical control?',
          options: [
            '[[The proliferation of short-term rental platforms has precipitated a multifaceted housing crisis in major urban centres, eroding affordability for long-term residents while yielding substantial windfall gains for investors.|La proliferación de plataformas… ha precipitado una crisis multifacética…]]',
            '[[Lots of Airbnb stuff has made cities really expensive for normal people while rich people get richer.|Registro informal.]]',
            '[[Housing is bad now because of apps and we should fix it soon.|Demasiado vago e informal.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Proliferation*, *precipitated*, *multifaceted*, *eroding affordability*, *windfall gains* = dense, precise formal register.',
        },
      ],
    },
    topicName: 'Writing',
  },
{
    id: 'c1-u63-w2',
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
    id: 'c1-u63-w3',
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
