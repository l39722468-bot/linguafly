/**
 * C1 Unit 73 — Language Lab: Mixed Conditionals & Inversion (blog practice)
 * Inversión (Had/Were/Should), mixed conditionals, but for / otherwise.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'C1 Language Lab — Mixed Conditionals & Inversion';

export const UNIT_73_EXERCISES: Exercise[] = [
  {
    id: 'c1-u73-g1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'conditional-inversion',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Conditional inversion|Inversión condicional]]',
      instructions: 'Choose the grammatically correct formal inversion.',
      questions: [
        {
          question: 'Which rewrite of *If I had known, I would have acted differently* is correct?',
          options: [
            '[[Had I known, I would have acted differently.|Had + sujeto + participio]]',
            '[[Had I knew, I would have acted differently.|*knew* no es participio]]',
            '[[If I had knew, I would have acted differently.|doble error]]',
          ],
          correctAnswer: 0,
          explanation: 'Third conditional inversion: *Had + subject + past participle*, without *if*.',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'c1-u73-g2',
    type: 'fill-blank',
    level: 'C1',
    topic: 'conditional-inversion',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Had / Were / Should|Had / Were / Should]]',
      instructions: 'Complete with Had, Were or Should.',
      questions: [
        {
          question: '_______ I known about the delay, I would have changed plans.',
          options: ['[[Had|Had]]', '[[Were|Were]]', '[[Should|Should]]'],
          correctAnswer: 'Had',
          acceptableAnswers: ['Had'],
          explanation: 'Past counterfactual → *Had I known* (= *If I had known*).',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'c1-u73-g3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'mixed-conditional',
    difficulty: 'hard',
    content: {
      title: '[[Grammar|Gramática]]: [[Mixed conditionals|Condicionales mixtos]]',
      instructions: 'Identify the mixed conditional type.',
      questions: [
        {
          question: '*If I had studied medicine, I would be a doctor now.* This is:',
          options: [
            '[[Third + Second: past condition → present result.|Tercero + segundo]]',
            '[[Second + Third: present condition → past result.|Segundo + tercero]]',
            '[[First conditional only.|Solo primer condicional]]',
          ],
          correctAnswer: 0,
          explanation: '*Had studied* (past) + *would be* (present) = classic third-to-second mixed conditional.',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'c1-u73-v1',
    type: 'fill-blank',
    level: 'C1',
    topic: 'but-for',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[But for|But for]]',
      instructions: 'Rewrite mentally: choose the word that replaces *If it had not been for*.',
      questions: [
        {
          question: 'If it had not been for your help, we would have failed. → _______ your help, we would have failed.',
          options: ['[[But for|But for]]', '[[Because of|Because of]]', '[[Despite|Despite]]'],
          correctAnswer: 'But for',
          acceptableAnswers: ['But for'],
          explanation: '*But for* + noun = formal equivalent of *If it had not been for*.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
  {
    id: 'c1-u73-v2',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'otherwise',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Otherwise|Otherwise]]',
      instructions: 'Choose the best formal rewrite.',
      questions: [
        {
          question: 'If you do not submit today, your place will be lost. →',
          options: [
            '[[Submit today; otherwise, your place will be lost.|otherwise = si no]]',
            '[[Submit today; therefore, your place will be lost.|*therefore* = consecuencia, no condición]]',
            '[[Submit today; however, your place will be lost.|*however* = contraste]]',
          ],
          correctAnswer: 0,
          explanation: '*Otherwise* links a requirement to its negative consequence: *if not; or else*.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
  {
    id: 'c1-u73-v3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'were-it-not-for',
    difficulty: 'hard',
    content: {
      title: '[[Vocabulary|Vocabulario]]: [[Were it not for|Were it not for]]',
      instructions: 'Choose the correct formal structure.',
      questions: [
        {
          question: 'If it were not for your support, we would fail. →',
          options: [
            '[[Were it not for your support, we would fail.|Were it not for]]',
            '[[Was it not for your support, we would fail.|*was* menos formal en hipótesis]]',
            '[[Were it not been for your support, we would fail.|forma híbrida incorrecta]]',
          ],
          correctAnswer: 0,
          explanation: '*Were it not for* = formal second conditional without *if*.',
        },
      ],
    },
    topicName: 'Vocabulary',
  },
  {
    id: 'c1-u73-r1',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'conditional-inversion',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Formal inversion|Inversión formal]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Should you require further clarification, our legal team remains at your disposal throughout the review period." What does *Should you require* mean?',
          options: [
            '[[If you require / If you should require|Si necesitara / Si necesita]]',
            '[[You must require|Debe exigir]]',
            '[[You required in the past|Exigió en el pasado]]',
          ],
          correctAnswer: 0,
          explanation: '*Should + subject + base verb* = formal open conditional (*If you should need*).',
        },
      ],
    },
    topicName: 'Reading',
  },
  {
    id: 'c1-u73-r2',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'mixed-conditional',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Mixed types|Tipos mixtos]]',
      instructions: 'Choose the best analysis.',
      questions: [
        {
          question:
            '*If she were more organized, she would have finished yesterday.* This mixed conditional combines:',
          options: [
            '[[present/state condition → past result|condición presente → resultado pasado]]',
            '[[past condition → present result|pasado → presente]]',
            '[[future condition → future result|futuro → futuro]]',
          ],
          correctAnswer: 0,
          explanation: '*Were* (present/state) + *would have finished* (past) = second-to-third mixed.',
        },
      ],
    },
    topicName: 'Reading',
  },
  {
    id: 'c1-u73-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'mixed-conditional',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Counterfactual reasoning|Razonamiento contrafactual]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Had the board acted on the audit findings in 2022, the firm would not now be facing regulatory scrutiny." The present consequence is:',
          options: [
            '[[facing regulatory scrutiny|enfrentar escrutinio regulatorio]]',
            '[[acting on audit findings|actuar sobre hallazgos]]',
            '[[the audit in 2022|la auditoría en 2022]]',
          ],
          correctAnswer: 0,
          explanation: '*Would not now be facing* = present result of an unfulfilled past condition.',
        },
      ],
    },
    topicName: 'Reading',
  },
  {
    id: 'c1-u73-l1',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'conditional-inversion',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Should you need|Should you need]]',
      instructions: 'Listen and choose the correct paraphrase.',
      questions: [
        {
          question:
            'Speaker: "Should you need any assistance during the transition, please do not hesitate to contact the compliance desk." This means:',
          options: [
            '[[If you need help during the transition, contact compliance.|Si necesita ayuda, contacte]]',
            '[[You needed help yesterday.|Necesitó ayuda ayer]]',
            '[[You must not contact compliance.|No debe contactar]]',
          ],
          correctAnswer: 0,
          explanation: '*Should you need* = polite formal conditional for a possible future need.',
        },
      ],
    },
    topicName: 'Listening',
  },
  {
    id: 'c1-u73-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'mixed-conditional',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Mixed conditional|Condicional mixto]]',
      instructions: 'Listen and choose.',
      questions: [
        {
          question:
            'Speaker: "If they had invested in renewable infrastructure a decade ago, they would be market leaders today." The time mismatch is:',
          options: [
            '[[past investment → present leadership|inversión pasada → liderazgo presente]]',
            '[[present investment → future leadership|presente → futuro]]',
            '[[past investment → past leadership|pasado → pasado]]',
          ],
          correctAnswer: 0,
          explanation: 'Classic third-to-second mixed: *had invested* + *would be*.',
        },
      ],
    },
    topicName: 'Listening',
  },
  {
    id: 'c1-u73-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'otherwise',
    difficulty: 'hard',
    content: {
      title: '[[Listening|Comprensión auditiva]]: [[Otherwise|Otherwise]]',
      instructions: 'Listen and choose.',
      questions: [
        {
          question:
            'Speaker: "Funding must be secured by March; otherwise, the pilot programme will be cancelled outright." *Otherwise* signals:',
          options: [
            '[[what happens if funding is not secured|qué pasa si no se consigue financiación]]',
            '[[why funding was secured|por qué se consiguió]]',
            '[[funding has already been secured|ya se consiguió]]',
          ],
          correctAnswer: 0,
          explanation: '*Otherwise* = if that condition is not met → cancellation.',
        },
      ],
    },
    topicName: 'Listening',
  },
  {
    id: 'c1-u73-w1',
    type: 'writing',
    level: 'C1',
    topic: 'conditional-inversion',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Inversion rewrite|Reescritura con inversión]]',
      instructions: 'Choose the best formal rewrite.',
      questions: [
        {
          question: 'Correct the error: *Had I knew this, I would not accept.*',
          options: [
            '[[Had I known this, I would not have accepted.|Had I known + would have accepted]]',
            '[[Had I knew this, I would not have accepted.|*knew* sigue incorrecto]]',
            '[[If I knew this, I would not accepted.|múltiples errores]]',
          ],
          correctAnswer: 0,
          explanation: 'Inversion needs past participle (*known*) and past result (*would not have accepted*).',
        },
      ],
    },
    topicName: 'Writing',
  },
  {
    id: 'c1-u73-w2',
    type: 'writing',
    level: 'C1',
    topic: 'mixed-conditional',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Mixed rewrite|Reescritura mixta]]',
      instructions: 'Choose the best C1 sentence.',
      questions: [
        {
          question: 'I am not patient, so I argued last night. → (mixed conditional)',
          options: [
            '[[If I were more patient, I would not have argued last night.|segundo + tercero]]',
            '[[If I was patient, I will not argue.|tiempos incoherentes]]',
            '[[If I am patient, I did not argue.|mezcla incorrecta]]',
          ],
          correctAnswer: 0,
          explanation: 'Present/state (*were more patient*) + past result (*would not have argued*).',
        },
      ],
    },
    topicName: 'Writing',
  },
  {
    id: 'c1-u73-w3',
    type: 'writing',
    level: 'C1',
    topic: 'were-i-to',
    difficulty: 'hard',
    content: {
      title: '[[Writing|Escritura]]: [[Were I to…|Were I to…]]',
      instructions: 'Choose the most appropriate formal sentence.',
      questions: [
        {
          question: 'Which sentence correctly uses *Were I to…*?',
          options: [
            '[[Were I to accept the offer, I would relocate immediately.|Were I to + would]]',
            '[[Were I accept the offer, I relocate immediately.|sin *to* ni modal]]',
            '[[Was I to accepted the offer, I would relocated.|errores múltiples]]',
          ],
          correctAnswer: 0,
          explanation: '*Were I to + base verb* = formal hypothetical about a future action.',
        },
      ],
    },
    topicName: 'Writing',
  },
  {
    id: 'c1-u73-s1',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'conditional-inversion',
    difficulty: 'hard',
    content: {
      title: '[[Speaking|Expresión oral]]: [[Formal register|Registro formal]]',
      instructions: 'Choose the most appropriate spoken response at C1.',
      questions: [
        {
          question: 'In a formal meeting, how do you politely offer help?',
          options: [
            '[[Should you require any further details, please let us know.|Should you require]]',
            '[[If you gonna need details, tell me.|informal]]',
            '[[You need details, call me.|demasiado directo]]',
          ],
          correctAnswer: 0,
          explanation: '*Should you require* is diplomatic and formal in spoken professional contexts.',
        },
      ],
    },
    topicName: 'Speaking',
  },
  {
    id: 'c1-u73-s2',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'but-for',
    difficulty: 'hard',
    content: {
      title: '[[Speaking|Expresión oral]]: [[But for|But for]]',
      instructions: 'Choose the most natural C1 spoken sentence.',
      questions: [
        {
          question: 'You want to credit someone for preventing failure. Which is best?',
          options: [
            '[[But for your intervention, we would have missed the deadline.|But for + would have]]',
            '[[Because for your intervention, we missed.|incorrecto]]',
            '[[If not your intervention, we miss deadline.|demasiado informal]]',
          ],
          correctAnswer: 0,
          explanation: '*But for* sounds natural and formal in spoken argument at C1.',
        },
      ],
    },
    topicName: 'Speaking',
  },
  {
    id: 'c1-u73-s3',
    type: 'multiple-choice',
    level: 'C1',
    topic: 'mixed-conditional',
    difficulty: 'hard',
    content: {
      title: '[[Speaking|Expresión oral]]: [[Hypothetical discussion|Debate hipotético]]',
      instructions: 'Choose the best response in a discussion.',
      questions: [
        {
          question: 'A colleague says policy was too slow. You agree using a mixed conditional:',
          options: [
            '[[Had they acted sooner, we would not be dealing with these shortages now.|Had + would not be … now]]',
            '[[If they act sooner, we are not dealing with shortages.|tiempos incorrectos]]',
            '[[They acted sooner, so no shortages.|no es hipotético]]',
          ],
          correctAnswer: 0,
          explanation: 'Mixed conditional with inversion is persuasive and natural at C1 in debate.',
        },
      ],
    },
    topicName: 'Speaking',
  },
];
