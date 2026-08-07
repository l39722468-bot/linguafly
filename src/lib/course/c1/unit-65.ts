/**
 * C1 Unit 65 — Language Lab: Advanced conditionals and mixed forms
 * Supplementary track: third and mixed conditionals, inversion, formal if-substitutes.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'C1 Language Lab — Advanced Conditionals';

export const UNIT_65_EXERCISES: Exercise[] = [
{
    id: 'c1-u65-g1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'third-conditional',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Third Conditional|Tercer condicional]]',
      instructions: 'Choose the sentence that correctly uses the third conditional.',
      questions: [
        {
          question: 'Which sentence is fully accurate?',
          options: [
            '[[Had the warning systems been maintained, many lives might have been saved.|De haberse mantenido los sistemas de alerta…]]',
            '[[If the warning systems would have been maintained, many lives might have been saved.|… *would have been* en la oración *if* (incorrecto).]]',
            '[[If the warning systems had been maintained, many lives might be saved.|… *might be* no concuerda con el pasado hipotético.]]',
          ],
          correctAnswer: 0,
          explanation:
            'Third conditional: *If + past perfect*, *would/could/might + have + past participle*. Inversion: *Had + subject + past participle* without *if*.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u65-g2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'mixed-conditional',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]',
      instructions: 'Complete with the best verb form.',
      questions: [
        {
          question:
            'If we had invested in grid resilience a decade ago, we _______ far less vulnerable to outages today.',
          options: ['[[would be|seríamos]]', '[[would have been|habríamos sido]]', '[[will be|seremos]]'],
          correctAnswer: 'would be',
          acceptableAnswers: ['would be'],
          explanation:
            'Mixed conditional: past condition (*if + past perfect*) + present result (*would + base verb*) when the consequence applies to the present.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u65-g3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'were-it-not-for',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Were it not for / If it were not for|Were it not for]]',
      instructions: 'Choose the correct formal conditional structure.',
      questions: [
        {
          question:
            '_______ the whistle-blower\'s disclosures, the scheme might never have come to light.',
          options: [
            '[[Had it not been for|De no haber sido por]]',
            '[[If it was not for|registro menos formal; *were* preferible en C1]]',
            '[[Were it not been for|forma híbrida incorrecta]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Had it not been for* + noun = formal third-conditional equivalent of *If it had not been for*. It refers to a past counterfactual circumstance.',
        },
      ],
    },
    topicName: 'Grammar',
  },
{
    id: 'c1-u65-v1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'conditional-linkers',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Conditional Linkers|Conectores condicionales]]',
      instructions: 'Choose the word that completes the sentence correctly.',
      questions: [
        {
          question:
            'The ceasefire will hold _______ both sides withdraw heavy weapons from the designated corridor.',
          options: [
            '[[provided (that)|siempre que / a condición de que]]',
            '[[unless|a menos que — sentido contrario]]',
            '[[although|aunque — no condicional]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Provided (that)* introduces a condition for the main clause (*will hold*). *Unless* would reverse the logic.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u65-v2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'conditional-linkers',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Otherwise|Otherwise]]',
      instructions: 'Complete with one word.',
      questions: [
        {
          question:
            'Funding must be secured by March; _______, the pilot programme will be cancelled outright.',
          options: ['[[otherwise|de lo contrario]]', '[[therefore|por lo tanto — sentido distinto]]', '[[however|sin embargo]]'],
          correctAnswer: 'otherwise',
          acceptableAnswers: ['otherwise'],
          explanation:
            '*Otherwise* = if not; or else. It links a requirement to its negative consequence.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u65-v3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'conditional-linkers',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Even if / Even though|Even if / even though]]',
      instructions: 'Choose the correct conjunction.',
      questions: [
        {
          question:
            'The report recommends disclosure _______ doing so may temporarily unsettle markets.',
          options: [
            '[[even if|incluso si]]',
            '[[even though|aunque — concesivo, no condicional hipotético aquí]]',
            '[[as if|como si]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Even if* = whether or not that happens (open conditional). The unsettling is presented as a possible outcome, not a fact (*even though*).',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u65-r1',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'language-lab-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Conditional Argument|Argumento condicional]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Were sanctions to be lifted without verifiable disarmament, the precedent set would be catastrophic — not merely for this conflict, but for any future attempt to link relief to compliance." What is the author\'s view?',
          options: [
            '[[Lifting sanctions without verified disarmament would set a dangerous precedent.|Levantar sanciones sin desarme verificable sería un precedente peligroso.]]',
            '[[Sanctions should be lifted immediately regardless of disarmament.|Las sanciones deberían levantarse ya sin condiciones.]]',
            '[[Disarmament is impossible to verify.|El desarme es imposible de verificar.]]',
          ],
          correctAnswer: 0,
          explanation:
            'Formal inversion *Were sanctions to be lifted* = *If sanctions were to be lifted*; *would be catastrophic* states the hypothetical consequence.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u65-r2',
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
            'Text: "If nothing else, the crisis has laid bare how contingent prosperity had been on fragile supply chains." What does *if nothing else* contribute?',
          options: [
            '[[At minimum / at the very least, one clear lesson is highlighted.|Como mínimo, queda una lección clara.]]',
            '[[The crisis has had no effects.|La crisis no ha tenido efectos.]]',
            '[[Prosperity was never dependent on supply chains.|La prosperidad nunca dependió de las cadenas.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*If nothing else* = even if there are no other outcomes, this one is true; *laid bare* = exposed.',
        },
      ],
    },
    topicName: 'Reading',
  },
{
    id: 'c1-u65-r3',
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
            'Text: "Returning to the core theme of this unit (C1 Language Lab — Advanced Conditionals), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u65-l1',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'language-lab-listening',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Policy Discussion|Debate de políticas]]',
      instructions: 'Listen and choose the correct answer.',
      questions: [
        {
          question:
            'A diplomat says: "Unless we see concrete moves on verification within the next forty-eight hours, we will have little choice but to suspend the confidence-building measures we put in place last month." What is the condition for continuing confidence-building measures?',
          options: [
            '[[Concrete verification steps within forty-eight hours.|Pasos concretos de verificación en 48 horas.]]',
            '[[Automatic suspension regardless of verification.|Suspensión automática sin más.]]',
            '[[A permanent end to all sanctions.|Fin permanente de todas las sanciones.]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Unless we see* = if we do not see; so continuation requires *concrete moves on verification* within the deadline.',
        },
      ],
    },
    topicName: 'Listening',
  },
{
    id: 'c1-u65-l2',
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
    id: 'c1-u65-l3',
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
    id: 'c1-u65-w1',
    type: 'writing',
    level: 'C1',
    topic: 'argumentative-register',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Hypothetical Reasoning|Razonamiento hipotético]]',
      instructions: 'Choose the sentence that best models C1 hypothetical argument.',
      questions: [
        {
          question: 'Which sentence combines mixed conditional and formal tone most effectively?',
          options: [
            '[[Had policymakers acted decisively in 2019, we would not now be confronting the same entrenched inequalities that successive reports have documented.|Si los responsables hubieran actuado en 2019, ahora no enfrentaríamos…]]',
            '[[If policymakers acted in 2019, we will not now be confronting inequalities.|tiempos incoherentes]]',
            '[[Policymakers acted in 2019 so there are no inequalities.|ignora la hipótesis contrafactual]]',
          ],
          correctAnswer: 0,
          explanation:
            '*Had policymakers acted* (past perfect inversion) + *would not now be confronting* (present result) = mixed conditional in formal prose.',
        },
      ],
    },
    topicName: 'Writing',
  },
{
    id: 'c1-u65-w2',
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
    id: 'c1-u65-w3',
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
