/**
 * C1 Unit 70 — Language Lab: Discourse cohesion
 * Supplementary track: connectors, substitution, ellipsis, reference chains.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'C1 Language Lab — Discourse Cohesion';

export const UNIT_70_EXERCISES: Exercise[] = [
{
    id: 'c1-u70-g1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'discourse-markers',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Contrast / concession|Contraste y concesión]]',
      instructions: 'Choose the best connector for formal register.',
      questions: [
        {
          question: 'The policy reduced emissions. _______, it increased inequality in rural areas.',
          options: [
            '[[Nevertheless|Sin embargo]]',
            '[[But|demasiado informal para el registro]]',
            '[[And|no marca contraste]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Nevertheless* (sentence-initial) signals concession; *however* also works.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u70-g2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'discourse-markers',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Notwithstanding / despite|No obstante]]',
      instructions: 'Complete with one word.',
      questions: [
        {
          question: '_______ the risks, the board approved the merger.',
          options: ['[[Notwithstanding|Notwithstanding]]', '[[Notwithstandingly|incorrecto]]', '[[Despite of|incorrecto — *despite* sin *of*]]'],
          correctAnswer: 'Notwithstanding',
          acceptableAnswers: ['Notwithstanding'],
          explanation:
            '*Notwithstanding* + noun = *despite*; formal legal/financial prose.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u70-g3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'discourse-markers',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[On the one hand / on the other|Balance]]',
      instructions: 'Choose the correct pairing.',
      questions: [
        {
          question: 'Which structure is correct?',
          options: [
            '[[On the one hand, costs fell; on the other, quality suffered.|Por un lado… por otro]]',
            '[[On the one hand costs fell on the other hand quality suffered.|falta puntuación]]',
            '[[The one hand costs fell.|incorrecto]]',
          ],
          correctAnswer: 0,
          explanation:
            '*On the one hand* … *on the other (hand)* structures balanced argument.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u70-v1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'cohesion-lexis',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Coherence / cohesion|Coherencia / cohesión]]',
      instructions: 'Choose the term for grammatical linking at sentence level.',
      questions: [
        {
          question: 'Connectors and pronouns contribute mainly to textual _______.',
          options: [
            '[[cohesion|cohesión]]',
            '[[coherence|coherencia global — más macro]]',
            '[[coherence only|solo coherencia — incompleto]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Cohesion* = surface links; *coherence* = logical sense of the whole.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u70-v2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'cohesion-lexis',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Whereby / wherein|Por medio del cual / en el que]]',
      instructions: 'Complete the formal relative.',
      questions: [
        {
          question: 'They agreed on a framework _______ disputes would be resolved by arbitration.',
          options: [
            '[[whereby|mediante el cual]]',
            '[[wherein|en el que — suele ser más local]]',
            '[[whereas|mientras que — contraste]]',
          ],
          correctAnswer: 'whereby',
          acceptableAnswers: ['whereby'],
          explanation:
            '*Framework whereby* = *by means of which*; formal legal style.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u70-v3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'cohesion-lexis',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Accordingly / consequently|Consecuencia]]',
      instructions: 'Choose the most formal result marker.',
      questions: [
        {
          question: 'Funding was withdrawn. _______, several projects were shelved.',
          options: [
            '[[Consequently|Por consiguiente]]',
            '[[So|demasiado informal]]',
            '[[Plus|coloquial]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Consequently* and *accordingly* signal logical consequence in reports.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u70-r1',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Argumentative text|Texto argumentativo]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Admittedly, the sample is small. Even so, the pattern replicates earlier work." What is the relationship between the sentences?',
          options: [
            '[[Concession + counter-argument: the weakness is acknowledged but the claim stands.|Concesión + refuerzo.]]',
            '[[The second sentence denies the first.|Niega — falso.]]',
            '[[There is no logical link.|Sin enlace — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Admittedly* concedes; *Even so* = *nevertheless*.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u70-r2',
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
            'Text: "If the first premise holds, then the rest follows more or less automatically." What does *the rest* refer to?',
          options: [
            '[[The subsequent conclusions or steps in the argument.|El resto del argumento.]]',
            '[[The first premise.|Primera premisa — falso.]]',
            '[[Nothing specific.|Nada — falso.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*The rest* anaphorically picks up *conclusions/steps* implied by *follows*.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u70-r3',
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
            'Text: "Returning to the core theme of this unit (C1 Language Lab — Discourse Cohesion), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u70-l1',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Podcast|Podcast]]',
      instructions: 'Listen and choose.',
      questions: [
        {
          question:
            'Host: "That said, we should not lose sight of the bigger picture — namely, that reform takes decades." What does *That said* do?',
          options: [
            '[[It signals a partial concession or change of angle before a new point.|Concesión / cambio de foco.]]',
            '[[It ends the discussion.|Cierra — no]]',
            '[[It repeats the previous sentence.|Repite — no]]',
          ],
          correctAnswer: 0,
          explanation:
            '*That said* = *having said that*; pivots discourse politely.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u70-l2',
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
    id: 'c1-u70-l3',
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
    id: 'c1-u70-w1',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-register',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Paragraphing|Párrafos]]',
      instructions: 'Choose the sentence that uses a discourse marker effectively.',
      questions: [
        {
          question: 'Which sentence improves flow between two paragraphs?',
          options: [
            '[[By contrast, the southern region showed the opposite pattern.|By contrast — contraste explícito]]',
            '[[The southern region showed the opposite pattern.|sin marcador]]',
            '[[Also the southern region was different.|*Also* poco preciso para contraste]]',
          ],
          correctAnswer: 0,
          explanation:
            '*By contrast / Conversely* mark opposition between paragraphs.',
        },
      ],
    },
    topicName: 'Writing',
  },
{
    id: 'c1-u70-w2',
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
    id: 'c1-u70-w3',
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
