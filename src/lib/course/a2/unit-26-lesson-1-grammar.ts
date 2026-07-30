/**
 * Unidad 26 — Lección 1: Gramática (First Conditional)
 * 15 ejercicios: If + Present Simple, will + infinitive
 */

import { Exercise } from '@/lib/exercise-generator';

const LESSON_TITLE = '[[First Conditional|Primer Condicional]]: [[If|Si]] + [[Present Simple|Presente Simple]], [[will|will]] + [[infinitive|infinitivo]]';
const INSTRUCTIONS_FILL = 'Elige la forma correcta del First Conditional.';
const INSTRUCTIONS_MULTIPLE = 'Elige la frase o la forma correcta.';
const INSTRUCTIONS_ORDER = 'Ordena las palabras para formar una oración correcta.';
const INSTRUCTIONS_TF = 'Indica si la afirmación es verdadera o falsa.';

export const UNIT_26_LESSON_1_GRAMMAR: Exercise[] = [
  {
    id: 'a2-u26-l1-g1',
    type: 'fill-blank',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_FILL,
      questions: [
        {
          question: '[[If|Si]] [[it|ello]] ____, [[I|yo]] [[will|will]] [[stay|quedarme]] [[at|en]] [[home|casa]].',
          options: ['[[rains|llueve]]', '[[rain|llover]]', '[[will rain|lloverá]]'],
          correctAnswer: 'rains',
          explanation: '[[First Conditional|Primer Condicional]]: [[If|Si]] + [[Present Simple|Presente Simple]], [[will|will]] + [[infinitive|infinitivo]].',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g2',
    type: 'fill-blank',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_FILL,
      questions: [
        {
          question: '[[If|Si]] [[you|tú]] ____ [[hard|duro]], [[you|tú]] [[will|will]] [[pass|aprobar]] [[the|el]] [[exam|examen]].',
          options: ['[[study|estudias]]', '[[studies|estudia]]', '[[will study|estudiarás]]'],
          correctAnswer: 'study',
          explanation: '[[If|Si]] + [[Present Simple|Presente Simple]]: [[you study|tú estudias]].',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g3',
    type: 'fill-blank',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_FILL,
      questions: [
        {
          question: '[[If|Si]] [[she|ella]] ____ [[to|a]] [[the|la]] [[party|fiesta]], [[I|yo]] [[will|will]] [[be|estar]] [[very|muy]] [[happy|feliz]].',
          options: ['[[come|viene]]', '[[comes|viene]]', '[[will come|vendrá]]'],
          correctAnswer: 'comes',
          explanation: '[[She|Ella]] + [[comes|viene]] [[(Present Simple|(Presente Simple)]].',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g4',
    type: 'fill-blank',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_FILL,
      questions: [
        {
          question: '[[If|Si]] [[we|nosotros]] ____ [[the|el]] [[bus|autobús]], [[we|nosotros]] [[will|will]] ____ [[late|tarde]].',
          options: ['[[miss|perdemos]] / [[be|estar]]', '[[misses|pierde]] / [[be|estar]]', '[[will miss|perderemos]] / [[be|estar]]'],
          correctAnswer: 'miss',
          explanation: '[[If|Si]] + [[Present Simple|Presente Simple]]; [[will|will]] + [[infinitive|infinitivo]] [[without|sin]] [[to|to]].',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g5',
    type: 'fill-blank',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_FILL,
      questions: [
        {
          question: '[[If|Si]] [[it|ello]] ____ [[sunny|soleado]] [[tomorrow|mañana]], [[they|ellos]] [[will|will]] ____ [[to|a]] [[the|la]] [[beach|playa]].',
          options: ['[[is|es]] / [[go|ir]]', '[[will be|será]] / [[go|ir]]', '[[is|es]] / [[goes|va]]'],
          correctAnswer: 'is',
          explanation: '[[Condition|Condición]]: [[Present Simple|Presente Simple]], [[result|resultado]]: [[will|will]] + [[infinitive|infinitivo]].',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g6',
    type: 'multiple-choice',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_MULTIPLE,
      questions: [
        {
          question: '[[What|Qué]] [[is|es]] [[the|la]] [[structure|estructura]] [[of|del]] [[First Conditional|Primer Condicional]]?',
          options: [
            '[[If|Si]] + [[Present Simple|Presente Simple]], [[will|will]] + [[infinitive|infinitivo]]',
            '[[If|Si]] + [[Past Simple|Pasado Simple]], [[would|would]] + [[infinitive|infinitivo]]',
            '[[If|Si]] + [[will|will]], [[Present Simple|Presente Simple]]',
          ],
          correctAnswer: 0,
          explanation: '[[First Conditional|Primer Condicional]]: [[If|Si]] + [[Present Simple|Presente Simple]], [[will|will]] + [[infinitive|infinitivo]].',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g7',
    type: 'multiple-choice',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_MULTIPLE,
      questions: [
        {
          question: '[[When|Cuándo]] [[do|usamos]] [[we|nosotros]] [[use|usamos]] [[First Conditional|Primer Condicional]]?',
          options: [
            '[[For|Para]] [[real|reales]] [[or|o]] [[possible|posibles]] [[situations|situaciones]] [[in|en]] [[the|el]] [[future|futuro]]',
            '[[For|Para]] [[imaginary|imaginarias]] [[situations|situaciones]] [[in|en]] [[the|el]] [[past|pasado]]',
            '[[For|Para]] [[general|generales]] [[truths|verdades]]',
          ],
          correctAnswer: 0,
          explanation: '[[First Conditional|Primer Condicional]] = [[real|reales]] [[or|o]] [[possible|posibles]] [[future|futuras]] [[conditions|condiciones]].',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g8',
    type: 'multiple-choice',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_MULTIPLE,
      questions: [
        {
          question: '[[Which|Cuál]] [[sentence|frase]] [[is|es]] [[correct|correcta]]?',
          options: [
            '[[If it rains|Si llueve]], [[I will stay|me quedaré]] [[at home|en casa]].',
            '[[If it will rain|Si lloverá]], [[I stay|me quedo]] [[at home|en casa]].',
            '[[If it rains|Si llueve]], [[I stay|me quedo]] [[at home|en casa]].',
          ],
          correctAnswer: 0,
          explanation: '[[Correct|Correcto]]: [[If|Si]] + [[Present Simple|Presente Simple]], [[will|will]] + [[infinitive|infinitivo]].',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g9',
    type: 'multiple-choice',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_MULTIPLE,
      questions: [
        {
          question: '[[What|Qué]] [[is|es]] [[wrong|incorrecto]] [[in|en]] "[[If you will come|Si vendrás]], [[I will be happy|estaré feliz]]"?',
          options: [
            '[[We|Nosotros]] [[cannot|no podemos]] [[use|usar]] [[will|will]] [[after|después de]] [[if|si]] [[in|en]] [[First Conditional|Primer Condicional]]',
            '[[We|Nosotros]] [[cannot|no podemos]] [[use|usar]] [[will|will]] [[in|en]] [[the|el]] [[result|resultado]]',
            '[[Nothing|Nada]] [[is|es]] [[wrong|incorrecto]]',
          ],
          correctAnswer: 0,
          explanation: '[[After|Después de]] [[if|si]] [[we|nosotros]] [[use|usamos]] [[Present Simple|Presente Simple]], [[not|no]] [[will|will]].',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g10',
    type: 'multiple-choice',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_MULTIPLE,
      questions: [
        {
          question: '[[Complete|Completa]]: "[[If|Si]] [[he|él]] ____, [[he|él]] ____ ____ [[the|el]] [[train|tren]]."',
          options: ['[[doesn\'t hurry|no se da prisa]] / [[will|will]] [[miss|perder]]', '[[won\'t hurry|no se dará prisa]] / [[will|will]] [[miss|perder]]', '[[doesn\'t hurry|no se da prisa]] / [[misses|pierde]]'],
          correctAnswer: 0,
          explanation: '[[If|Si]] + [[Present Simple|Presente Simple]]; [[will|will]] + [[infinitive|infinitivo]].',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g11',
    type: 'sentence-building',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_ORDER,
      correctSentence: '[[If|Si]] [[it|ello]] [[rains|llueve]], [[I|yo]] [[will|will]] [[stay|quedarme]] [[at|en]] [[home|casa]].',
      words: ['[[If|Si]]', '[[it|ello]]', '[[rains|llueve]]', '[[I|yo]]', '[[will|will]]', '[[stay|quedarme]]', '[[at|en]]', '[[home|casa]].'],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g12',
    type: 'sentence-building',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_ORDER,
      correctSentence: '[[If|Si]] [[you|tú]] [[study|estudias]] [[hard|duro]], [[you|tú]] [[will|will]] [[pass|aprobar]] [[the|el]] [[exam|examen]].',
      words: ['[[If|Si]]', '[[you|tú]]', '[[study|estudias]]', '[[hard|duro]]', '[[you|tú]]', '[[will|will]]', '[[pass|aprobar]]', '[[the|el]]', '[[exam|examen]].'],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g13',
    type: 'sentence-building',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_ORDER,
      correctSentence: '[[If|Si]] [[it|ello]] [[is|es]] [[sunny|soleado]], [[we|nosotros]] [[will|will]] [[go|ir]] [[to|a]] [[the|la]] [[beach|playa]].',
      words: ['[[If|Si]]', '[[it|ello]]', '[[is|es]]', '[[sunny|soleado]]', '[[we|nosotros]]', '[[will|will]]', '[[go|ir]]', '[[to|a]]', '[[the|la]]', '[[beach|playa]].'],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g14',
    type: 'true-false',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_TF,
      questions: [
        {
          question: '[[In|En]] [[First Conditional|Primer Condicional]], [[we|nosotros]] [[use|usamos]] [[Present Simple|Presente Simple]] [[after|después de]] [[if|si]] [[and|y]] [[will|will]] + [[infinitive|infinitivo]] [[for|para]] [[the|el]] [[result|resultado]].',
          options: ['[[True|Verdadero]]', '[[False|Falso]]'],
          correctAnswer: 'True',
          explanation: '[[True|Verdadero]]. [[If it rains|Si llueve]], [[I will stay|me quedaré]] [[at home|en casa]].',
        },
      ],
    },
    topicName: 'Grammar',
  },
  {
    id: 'a2-u26-l1-g15',
    type: 'true-false',
    level: 'A2',
    topic: 'First Conditional',
    difficulty: 'easy',
    content: {
      title: LESSON_TITLE,
      instructions: INSTRUCTIONS_TF,
      questions: [
        {
          question: '"[[If it will rain|Si lloverá]], [[I stay at home|me quedo en casa]]" [[is|es]] [[correct|correcto]] [[in|en]] [[English|inglés]].',
          options: ['[[True|Verdadero]]', '[[False|Falso]]'],
          correctAnswer: 'False',
          explanation: '[[False|Falso]]. [[Correct|Correcto]]: "[[If it rains|Si llueve]], [[I will stay at home|me quedaré en casa]]". [[No|No]] [[will|will]] [[after|después de]] [[if|si]].',
        },
      ],
    },
    topicName: 'Grammar',
  },
];
