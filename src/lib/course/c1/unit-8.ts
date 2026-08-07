/**
 * C1 Unit 8 — Global Issues
 * Módulo 1 (bloque temático): Persona, sociedad y entorno
 * Grammar: Fronting, topicalisation, contrast, speculation
 *
 * Modelo ampliado: 18 ejercicios por lección × 5 lecciones = 90 ítems.
 * Patrón de IDs: c1-u8-g1..g18, v1..v18, r1..r18, l1..l18, w1..w18.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = '[[Global Issues|Problemas globales]]';

export const UNIT_8_EXERCISES: Exercise[] = [
{
    id: "c1-u8-g1",
    type: 'multiple-choice',
    level: 'C1',
    topic: "fronting",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Which sentence correctly uses inversion after a fronted negative adverbial?",
          options: ["[[Rarely has the Security Council been so divided on a humanitarian mandate.|Rarely + has + sujeto]]", "[[Rarely the Security Council has been so divided.|sin inversión]]", "[[Rarely has been the Security Council so divided.|orden incorrecto]]"],
          correctAnswer: 0,
          explanation: "Inversion after *Rarely*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g2",
    type: 'fill-blank',
    level: 'C1',
    topic: "fronting",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "Not until _______ _______ signed did the ceasefire hold along the corridor.",
          options: ["[[the treaty was|el tratado fue]]", "[[the treaty|sustantivo sin verbo]]", "[[was the treaty|inversión incorrecta aquí]]"],
          correctAnswer: "the treaty was",
          acceptableAnswers: ["the treaty was"],
          explanation: "*Not until + clause + inversion*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g3",
    type: 'multiple-choice',
    level: 'C1',
    topic: "fronting",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ climate finance, not technology alone, that dominated the closing sessions of the summit.",
          options: ["[[It was|Fue]]", "[[There was|había]]", "[[What was|What]]"],
          correctAnswer: 0,
          explanation: "*It was X that…* cleft.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g4",
    type: 'fill-blank',
    level: 'C1',
    topic: "fronting",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "_______ _______ the planet needs is not slogans but enforceable rules with independent monitoring.",
          options: ["[[What|What]]", "[[That|That]]", "[[Which|Which]]"],
          correctAnswer: "What",
          acceptableAnswers: ["What"],
          explanation: "*What + S + be* pseudo-cleft.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g5",
    type: 'multiple-choice',
    level: 'C1',
    topic: "fronting",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "The refugees, many of them unaccompanied minors, _______ the authorities were initially unable to process.",
          options: ["[[whom the authorities were initially unable to process|a quienes las autoridades no pudieron tramitar]]", "[[the authorities were initially unable to process|falta pronombre relativo]]", "[[which the authorities were initially unable to process|referente incorrecto para personas]]"],
          correctAnswer: 0,
          explanation: "Left dislocation + *whom* relative.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g6",
    type: 'fill-blank',
    level: 'C1',
    topic: "fronting",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "Under no circumstances _______ _______ the mandate be renewed without explicit host-state consent.",
          options: ["[[should the|debería el]]", "[[the should|incorrecto]]", "[[ought the|incorrecto]]"],
          correctAnswer: "should the",
          acceptableAnswers: ["should the"],
          explanation: "*Under no circumstances should + S + V*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g7",
    type: 'multiple-choice',
    level: 'C1',
    topic: "contrast-structures",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ developed nations have stabilised inflation, many emerging economies still face debt distress.",
          options: ["[[Whereas|Mientras que]]", "[[Despite|a pesar de + sintagma]]", "[[However|sin embargo + puntuación]]"],
          correctAnswer: 0,
          explanation: "*Whereas* for clausal contrast.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g8",
    type: 'multiple-choice',
    level: 'C1',
    topic: "contrast-structures",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______, manufacturing exports have rebounded sharply compared with the previous quarter.",
          options: ["[[By contrast,|En contraste,]]", "[[Despite,|Despite no lleva coma así]]", "[[Although,|Although va seguido de cláusula]]"],
          correctAnswer: 0,
          explanation: "*By contrast,* as sentence adverb.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g9",
    type: 'multiple-choice',
    level: 'C1',
    topic: "contrast-structures",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "The northern bloc favours fiscal expansion; _______, the southern bloc insists on consolidation.",
          options: ["[[conversely|inversamente]]", "[[however|posición distinta]]", "[[although|subordinante]]"],
          correctAnswer: 0,
          explanation: "*Conversely*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g10",
    type: 'fill-blank',
    level: 'C1',
    topic: "contrast-structures",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "_______ earlier agreements, the new pact includes binding verification chapters.",
          options: ["[[Unlike|A diferencia de]]", "[[Dislike|no es preposición aquí]]", "[[Unlike to|incorrecto]]"],
          correctAnswer: "Unlike",
          acceptableAnswers: ["Unlike"],
          explanation: "*Unlike* + noun phrase.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g11",
    type: 'multiple-choice',
    level: 'C1',
    topic: "contrast-structures",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ the headline figures look encouraging, household surveys reveal persistent precarity.",
          options: ["[[While|Mientras / aunque]]", "[[Despite|Despite + sintagma]]", "[[Whereas|whereas = contraste entre dos hechos]]"],
          correctAnswer: 0,
          explanation: "*While* + clause for contrast.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g12",
    type: 'fill-blank',
    level: 'C1',
    topic: "contrast-structures",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "The reform was presented as progressive; _______, it entrenched existing inequalities.",
          options: ["[[nevertheless|no obstante]]", "[[never the less|error]]", "[[nonethelessly|error]]"],
          correctAnswer: "nevertheless",
          acceptableAnswers: ["nevertheless", "nonetheless"],
          explanation: "*Nevertheless*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g13",
    type: 'multiple-choice',
    level: 'C1',
    topic: "speculation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ that unilateral measures will suffice is open to serious doubt.",
          options: ["[[It is widely assumed|Se da por sentado ampliamente que]]", "[[It is widely assuming|forma incorrecta]]", "[[There is widely assumed|incorrecto]]"],
          correctAnswer: 0,
          explanation: "*It is widely assumed that…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g14",
    type: 'fill-blank',
    level: 'C1',
    topic: "speculation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "There _______ _______ to believe that enforcement will remain patchy without a tribunal.",
          options: ["[[is reason|hay razones]]", "[[are reason|concordancia incorrecta]]", "[[is reasons|incorrecto]]"],
          correctAnswer: "is reason",
          acceptableAnswers: ["is reason"],
          explanation: "*There is reason to + infinitive*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g15",
    type: 'multiple-choice',
    level: 'C1',
    topic: "speculation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "One _______ speculate that small states will band together to block the proposed directive.",
          options: ["[[might|podría]]", "[[must|demasiado fuerte]]", "[[can|menos matizado]]"],
          correctAnswer: 0,
          explanation: "*One might speculate that…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g16",
    type: 'fill-blank',
    level: 'C1',
    topic: "speculation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "The evidence _______ _______ to suggest that displacement will accelerate if rainfall fails again.",
          options: ["[[would appear|parecería]]", "[[will appear|tiempo incorrecto]]", "[[would appears|concordancia incorrecta]]"],
          correctAnswer: "would appear",
          acceptableAnswers: ["would appear"],
          explanation: "*Would appear to*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g17",
    type: 'multiple-choice',
    level: 'C1',
    topic: "speculation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ the agreement looks comprehensive, hidden carve-outs may blunt its impact.",
          options: ["[[At first glance|a primera vista]]", "[[At first sighting|no idiomático]]", "[[In first glance|incorrecto]]"],
          correctAnswer: 0,
          explanation: "*At first glance*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-g18",
    type: 'fill-blank',
    level: 'C1',
    topic: "speculation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Fronting, Contrast & Speculation|Fronting, contraste y especulación]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "It _______ _______ reasonable to suppose that ratification will slip past the original deadline.",
          options: ["[[would seem|parecería]]", "[[will seem|demasiado categórico]]", "[[would seems|error]]"],
          correctAnswer: "would seem",
          acceptableAnswers: ["would seem"],
          explanation: "*It would seem reasonable to suppose that…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u8-v1",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The treaty was finally _______ by all member states, making it legally binding.",
          options: ["[[ratified|ratificado]]", "[[nullified|anulado]]", "[[notified|notificado]]"],
          correctAnswer: 0,
          explanation: "*Ratify*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v2",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Transparent _______ reduces opportunities for corruption in public procurement.",
          options: ["[[governance|gobernanza]]", "[[government|gobierno]]", "[[governor|gobernador]]"],
          correctAnswer: 0,
          explanation: "*Governance*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v3",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ law increasingly governs cross-border data flows and corporate liability.",
          options: ["[[Transnational|transnacional]]", "[[Transactional|transaccional]]", "[[Translational|traslacional]]"],
          correctAnswer: 0,
          explanation: "*Transnational*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v4",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ assembly debated reform of the security council's veto rules.",
          options: ["[[General|general / General]]", "[[Generous|generosa]]", "[[Generic|genérica]]"],
          correctAnswer: 0,
          explanation: "*General Assembly*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v5",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ aid programmes must align with local priorities to avoid dependency traps.",
          options: ["[[Development|desarrollo]]", "[[Developed|desarrollados]]", "[[Developing|en desarrollo]]"],
          correctAnswer: 0,
          explanation: "*Development aid*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v6",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ corridors for grain exports collapsed when insurance markets withdrew cover.",
          options: ["[[Humanitarian|humanitarios]]", "[[Humanism|humanismo]]", "[[Humane|humanos]]"],
          correctAnswer: 0,
          explanation: "*Humanitarian*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v7",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Economic _______ were tightened after the regime's cross-border cyberattacks.",
          options: ["[[sanctions|sanciones]]", "[[sections|secciones]]", "[[sanctums|santuarios]]"],
          correctAnswer: 0,
          explanation: "*Sanctions*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v8",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ law determines whether a case can be heard in domestic courts.",
          options: ["[[Jurisdiction|jurisdicción]]", "[[Justification|justificación]]", "[[Jurisprudence|jurisprudencia]]"],
          correctAnswer: 0,
          explanation: "*Jurisdiction*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v9",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ treaty framework aims to limit the spread of strategic weapons.",
          options: ["[[non-proliferation|no proliferación]]", "[[non-profit|sin ánimo de lucro]]", "[[non-person|impersonal]]"],
          correctAnswer: 0,
          explanation: "*Non-proliferation*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v10",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Climate _______ are used to allocate emission allowances across sectors.",
          options: ["[[ceilings|techos / límites]]", "[[floors|suelos / mínimos]]", "[[sealings|sellados]]"],
          correctAnswer: 0,
          explanation: "*Ceilings*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v11",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______-border carbon adjustments aim to prevent carbon leakage.",
          options: ["[[Cross|transfronterizos]]", "[[Criss|error]]", "[[Crisscross|entrecruzado]]"],
          correctAnswer: 0,
          explanation: "*Cross-border*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v12",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ displacement affects tens of millions due to conflict and disasters.",
          options: ["[[Internal|interno]]", "[[Infernal|infernal]]", "[[Interval|intervalo]]"],
          correctAnswer: 0,
          explanation: "*Internal* displacement.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v13",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The court rejected the _______ request on human rights grounds.",
          options: ["[[extradition|extradición]]", "[[extrapolation|extrapolación]]", "[[extraversion|extraversión]]"],
          correctAnswer: 0,
          explanation: "*Extradition*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v14",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ negotiations stalled over loss-and-damage financing for vulnerable states.",
          options: ["[[Climate|climáticas]]", "[[Climatic|climático]]", "[[Climber|escalador]]"],
          correctAnswer: 0,
          explanation: "*Climate* negotiations.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v15",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ peacekeeping mandates require renewal by the Security Council.",
          options: ["[[UN|ONU]]", "[[UK|Reino Unido]]", "[[EU|UE]]"],
          correctAnswer: 0,
          explanation: "*UN* peacekeeping.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v16",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ inequality between regions fuels migration pressures.",
          options: ["[[Spatial|espacial]]", "[[Special|especial]]", "[[Spacial|error ortográfico común]]"],
          correctAnswer: 0,
          explanation: "*Spatial* inequality.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v17",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ implications of semiconductor export controls extend beyond trade.",
          options: ["[[geopolitical|geopolíticas]]", "[[geometric|geométricas]]", "[[geothermal|geotérmicas]]"],
          correctAnswer: 0,
          explanation: "*Geopolitical*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-v18",
    type: 'multiple-choice',
    level: 'C1',
    topic: "global-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ recognition remains contested when secessionist regions hold referendums.",
          options: ["[[Diplomatic|diplomático]]", "[[Diplomatical|no existe]]", "[[Diplomat|diplomático (sust.)]]"],
          correctAnswer: 0,
          explanation: "*Diplomatic* recognition.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u8-r1",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Sovereignty is no longer a sealed box: transnational regulation and human-rights scrutiny routinely reach inside borders.|La soberanía ya no es una caja cerrada: la regulación transnacional y el escrutinio de los derechos humanos penetran con frecuencia las fronteras.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Global governance challenges the fiction of wholly self-contained states.|La gobernanza global cuestiona la ficción de estados totalmente autocontenidos.]]", "[[Borders have become irrelevant to law.|Las fronteras se han vuelto irrelevantes para el derecho.]]", "[[Human rights never apply across borders.|Los derechos humanos nunca aplican más allá de las fronteras.]]"],
          correctAnswer: 0,
          explanation: "Framing.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r2",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Climate finance pledges often lag behind the scale of loss and damage already documented in vulnerable regions.|Las promesas de financiación climática a menudo van a la zaga de la magnitud de pérdidas y daños ya documentados en regiones vulnerables.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[The text highlights a gap between commitments and documented harm.|El texto señala una brecha entre compromisos y daño documentado.]]", "[[Pledges always match observed damage.|Las promesas siempre coinciden con el daño observado.]]", "[[Loss and damage is a purely national accounting issue.|Pérdidas y daños es un tema puramente nacional de contabilidad.]]"],
          correctAnswer: 0,
          explanation: "Climate justice.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r3",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Irregular migration routes expose people to exploitation precisely where legal pathways are narrowest.|Las rutas migratorias irregulares exponen a las personas a la explotación precisamente donde las vías legales son más estrechas.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Policy design can unintentionally channel risk onto migrants.|El diseño de políticas puede canalizar el riesgo hacia las personas migrantes.]]", "[[Borders alone cause exploitation.|Solo las fronteras causan explotación.]]", "[[Legal routes eliminate all danger.|Las vías legales eliminan todo peligro.]]"],
          correctAnswer: 0,
          explanation: "Migration.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r4",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Sanctions are a blunt instrument: they can squeeze elites yet also deepen hardship for civilians.|Las sanciones son un instrumento tosco: pueden presionar a élites pero también profundizar las penurias de la población civil.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[The passage notes both strategic intent and civilian spillovers.|El pasaje señala intención estratégica y efectos sobre civiles.]]", "[[Sanctions never affect ordinary people.|Las sanciones nunca afectan a la gente corriente.]]", "[[Elites always bear the full cost.|Las élites siempre asumen todo el coste.]]"],
          correctAnswer: 0,
          explanation: "Sanctions.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r5",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Cyberattacks on critical infrastructure blur the line between crime, espionage and acts with strategic intent.|Los ciberataques a infraestructuras críticas difuminan la línea entre delito, espionaje y actos de intención estratégica.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Categories of harm overlap when systems are interdependent.|Las categorías de daño se solapan cuando los sistemas son interdependientes.]]", "[[Cyber risk is only a private-sector issue.|El riesgo cibernético es solo un asunto del sector privado.]]", "[[Espionage and crime are always easy to separate.|Espionaje y delito siempre son fáciles de separar.]]"],
          correctAnswer: 0,
          explanation: "Security.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r6",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Peacekeeping mandates work best when host-state consent, credible deterrence and a political process align.|Los mandatos de mantenimiento de la paz funcionan mejor cuando consentimiento del Estado anfitrión, disuasión creíble y proceso político se alinean.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Success depends on overlapping political and operational conditions.|El éxito depende de condiciones políticas y operativas superpuestas.]]", "[[Mandates succeed without local politics.|Los mandatos triunfan sin política local.]]", "[[Deterrence alone ends conflicts.|La disuasión sola acaba los conflictos.]]"],
          correctAnswer: 0,
          explanation: "Peacekeeping.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r7",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Development aid without domestic accountability can entrench dependency rather than build capacity.|La ayuda al desarrollo sin rendición de cuentas interna puede arraigar la dependencia en lugar de construir capacidad.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Institutional quality mediates whether aid empowers recipients.|La calidad institucional media si la ayuda empodera.]]", "[[Aid always builds capacity automatically.|La ayuda siempre construye capacidad automáticamente.]]", "[[Dependency is invented by donors alone.|La dependencia la inventan solo los donantes.]]"],
          correctAnswer: 0,
          explanation: "Aid.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r8",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Extradition disputes reveal tensions between sovereignty, fair-trial guarantees and diplomatic pressure.|Las disputas de extradición revelan tensiones entre soberanía, garantías de juicio justo y presión diplomática.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Legal and political considerations are intertwined in extradition.|Consideraciones legales y políticas se entrelazan en la extradición.]]", "[[Extradition is purely technical.|La extradición es puramente técnica.]]", "[[Fair trial is irrelevant once charges are filed.|El juicio justo es irrelevante una vez presentados cargos.]]"],
          correctAnswer: 0,
          explanation: "Law.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r9",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Geopolitical rivalry increasingly plays out in technology supply chains, not only on traditional battlefields.|La rivalidad geopolítica se libra cada vez más en cadenas de suministro tecnológico, no solo en campos de batalla tradicionales.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Strategic competition now targets semiconductors and standards.|La competencia estratégica apunta ahora a semiconductores y estándares.]]", "[[Technology supply chains are politically neutral.|Las cadenas tecnológicas son políticamente neutrales.]]", "[[Rivalry is limited to military bases.|La rivalidad se limita a bases militares.]]"],
          correctAnswer: 0,
          explanation: "Geopolitics.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r10",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Non-proliferation regimes depend on verification, but also on incentives for compliance when trust is low.|Los regímenes de no proliferación dependen de la verificación, pero también de incentivos al cumplimiento cuando la confianza es baja.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Verification must pair with diplomacy and incentives.|La verificación debe ir acompañada de diplomacia e incentivos.]]", "[[Inspection alone guarantees compliance.|La inspección sola garantiza el cumplimiento.]]", "[[Trust is unnecessary if treaties exist.|La confianza es innecesaria si existen tratados.]]"],
          correctAnswer: 0,
          explanation: "Arms control.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r11",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Internal displacement can last decades when return is unsafe and resettlement finance is inadequate.|El desplazamiento interno puede durar décadas cuando el retorno no es seguro y la financiación del reasentamiento es insuficiente.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Protracted displacement reflects security and resource failures.|El desplazamiento prolongado refleja fallos de seguridad y recursos.]]", "[[Internal displacement always ends within a year.|El desplazamiento interno siempre termina en un año.]]", "[[Resettlement never requires funding.|El reasentamiento nunca requiere financiación.]]"],
          correctAnswer: 0,
          explanation: "Displacement.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r12",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Carbon border adjustments aim to prevent leakage, yet they risk trade friction with developing exporters.|Los ajustes fronterizos al carbono pretenden evitar fugas, pero arriesgan fricciones comerciales con exportadores en desarrollo.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Climate tools can collide with trade politics.|Las herramientas climáticas pueden chocar con la política comercial.]]", "[[Border adjustments harmonise all interests automatically.|Los ajustes fronterizos armonizan todos los intereses automáticamente.]]", "[[Developing exporters are unaffected.|Los exportadores en desarrollo no se ven afectados.]]"],
          correctAnswer: 0,
          explanation: "Trade and climate.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r13",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Diplomatic recognition of breakaway regions remains contested because it implicates self-determination and territorial integrity.|El reconocimiento diplomático de regiones secesionistas sigue siendo controvertido porque implica autodeterminación e integridad territorial.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Recognition engages competing legal principles.|El reconocimiento implica principios jurídicos en competencia.]]", "[[International law gives a single clear answer always.|El derecho internacional da siempre una única respuesta clara.]]", "[[Territorial integrity is irrelevant to recognition.|La integridad territorial es irrelevante para el reconocimiento.]]"],
          correctAnswer: 0,
          explanation: "Recognition.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r14",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Spatial inequality within states can drive political instability as sharply as cross-border income gaps.|La desigualdad espacial dentro de los estados puede impulsar la inestabilidad política tan agudamente como las brechas de renta entre países.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Within-country disparities shape grievances and politics.|Las disparidades internas moldean agravios y política.]]", "[[Only international inequality matters for politics.|Solo la desigualdad internacional importa para la política.]]", "[[Regions always share the same growth path.|Las regiones siempre comparten la misma trayectoria de crecimiento.]]"],
          correctAnswer: 0,
          explanation: "Inequality.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r15",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Humanitarian corridors are fragile: they depend on ceasefires, insurance markets and cross-line logistics.|Los corredores humanitarios son frágiles: dependen de ceses al fuego, mercados aseguradores y logística entre líneas.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Delivery hinges on multiple simultaneous conditions.|La entrega depende de condiciones múltiples simultáneas.]]", "[[Corridors operate without security guarantees.|Los corredores operan sin garantías de seguridad.]]", "[[Insurance is irrelevant to grain shipments.|El seguro es irrelevante para envíos de grano.]]"],
          correctAnswer: 0,
          explanation: "Humanitarian access.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r16",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Transnational litigation against corporations tests whether domestic courts can grasp harms that unfold across jurisdictions.|La litigación transnacional contra corporaciones prueba si los tribunales nacionales pueden captar daños que transcurren entre jurisdicciones.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Jurisdiction and evidence rules strain when harm is dispersed.|Reglas de jurisdicción y prueba se tensan cuando el daño está disperso.]]", "[[Courts always refuse cross-border cases.|Los tribunales siempre rechazan casos transfronterizos.]]", "[[Corporate harm is always localised.|El daño corporativo siempre está localizado.]]"],
          correctAnswer: 0,
          explanation: "Accountability.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r17",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Climate ceilings on emissions allocate scarcity politically, not merely technically.|Los techos de emisiones asignan escasez políticamente, no solo técnicamente.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Allocation is inherently political even with scientific inputs.|La asignación es inherentemente política incluso con aportes científicos.]]", "[[Ceilings remove politics from climate policy.|Los techos eliminan la política de la política climática.]]", "[[Science alone decides national quotas.|La ciencia sola decide las cuotas nacionales.]]"],
          correctAnswer: 0,
          explanation: "Emissions.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-r18",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "global-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Global Issues|Problemas globales]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Global health security links pathogen surveillance to trade, travel and vaccine equity in the same policy frame.|La seguridad sanitaria global vincula la vigilancia de patógenos con comercio, viajes y equidad vacunal en el mismo marco político.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Health shocks propagate through interconnected systems.|Las crisis de salud se propagan por sistemas interconectados.]]", "[[Surveillance can ignore travel patterns.|La vigilancia puede ignorar patrones de viaje.]]", "[[Vaccine equity is unrelated to trade.|La equidad vacunal no tiene relación con el comercio.]]"],
          correctAnswer: 0,
          explanation: "Health security.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u8-l1",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Speaker:|Voz / Hablante:]] \"[[Multilateral forums are slow, yet they remain the default arena where small states can amplify their voice.|Los foros multilaterales son lentos, pero siguen siendo el espacio por defecto donde los estados pequeños amplifican su voz.]]\"\n\n[[The speaker stresses that:|La voz enfatiza que:]]",
          options: ["[[inclusivity trades off against speed in global negotiations|la inclusividad se compensa con velocidad en negociaciones globales]]", "[[small states have no role in UN bodies|los estados pequeños no tienen papel en la ONU]]", "[[multilateralism has ended|el multilateralismo ha terminado]]"],
          correctAnswer: 0,
          explanation: "Multilateralism.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l2",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Lecturer:|Profesor/a (clase magistral):]] \"[[Sanctions signal disapproval, but humanitarian carve-outs require banks to interpret risk in real time.|Las sanciones señalan desaprobación, pero los salvaguardas humanitarios exigen a los bancos interpretar el riesgo en tiempo real.]]\"\n\n[[Main claim:|Tesis principal:]]",
          options: ["[[compliance friction can unintentionally block legitimate aid|la fricción de cumplimiento puede bloquear ayuda legítima]]", "[[carve-outs remove all compliance burden|los salvaguardas eliminan toda carga de cumplimiento]]", "[[banks ignore sanctions risk|los bancos ignoran el riesgo de sanciones]]"],
          correctAnswer: 0,
          explanation: "Compliance.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l3",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Interviewer:|Entrevistador/a:]] \"[[Climate adaptation finance is politically contested because losses are already materialising in the poorest regions.|La financiación de adaptación climática es políticamente controvertida porque las pérdidas ya se materializan en las regiones más pobres.]]\"\n\n[[The interviewee implies:|El entrevistado insinúa que:]]",
          options: ["[[present harm strengthens claims for redistribution|el daño presente refuerza reclamos de redistribución]]", "[[adaptation is irrelevant until 2050|la adaptación es irrelevante hasta 2050]]", "[[losses are evenly distributed globally|las pérdidas se reparten por igual en el mundo]]"],
          correctAnswer: 0,
          explanation: "Loss and damage.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l4",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Coach:|Coach:]] \"[[Cross-border data rules pit privacy against security, with firms caught between jurisdictions.|Las normas transfronterizas de datos enfrentan privacidad y seguridad, con empresas atrapadas entre jurisdicciones.]]\"\n\n[[The advice focuses on:|El consejo se centra en:]]",
          options: ["[[fragmented regulation increases legal uncertainty for operators|la regulación fragmentada aumenta la incertidumbre jurídica]]", "[[privacy and security never conflict|privacidad y seguridad nunca chocan]]", "[[jurisdiction is always clear online|la jurisdicción siempre es clara en línea]]"],
          correctAnswer: 0,
          explanation: "Data governance.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l5",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Podcast host:|Presentador/a del podcast:]] \"[[Peacekeepers deter spoilers only when mandates, resources and political backing align.|Los cascos azules disuaden a actores disruptores solo cuando mandatos, recursos y respaldo político se alinean.]]\"\n\n[[The distinction drawn is:|La distinción trazada es:]]",
          options: ["[[deterrence fails if any pillar is missing|la disuasión falla si falta algún pilar]]", "[[uniforms alone stop civil wars|los uniformes solos detienen guerras civiles]]", "[[spoilers disappear without negotiations|los disruptores desaparecen sin negociación]]"],
          correctAnswer: 0,
          explanation: "Peace ops.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l6",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Therapist:|Terapeuta:]] \"[[Refugee resettlement numbers reflect political will more than technical capacity alone.|Las cifras de reasentamiento de refugiados reflejan más la voluntad política que la capacidad técnica aislada.]]\"\n\n[[Therapeutic aim:|Objetivo terapéutico:]]",
          options: ["[[quotas encode domestic politics as much as compassion|las cuotas codifican política interna tanto como compasión]]", "[[capacity is the only constraint|la capacidad es la única limitación]]", "[[technical systems decide quotas alone|los sistemas técnicos deciden las cuotas solos]]"],
          correctAnswer: 0,
          explanation: "Resettlement.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l7",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Debate:|Debate:]] \"[[Geopolitical competition in semiconductors is about chokepoints, not only fabs.|La competencia geopolítica en semiconductores va de cuellos de botella, no solo de fábricas.]]\"\n\n[[Speaker suggests:|El hablante sugiere que:]]",
          options: ["[[bottlenecks concentrate leverage across allied and rival blocs|los cuellos de botella concentran apalancamiento]]", "[[fabs are irrelevant to security|las fabs son irrelevantes para la seguridad]]", "[[supply chains are fully redundant|las cadenas son plenamente redundantes]]"],
          correctAnswer: 0,
          explanation: "Chips.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l8",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Seminar leader:|Moderador/a del seminario:]] \"[[International criminal jurisdiction remains selective; gravity and politics shape which cases reach trial.|La jurisdicción penal internacional sigue siendo selectiva; gravedad y política moldean qué casos llegan a juicio.]]\"\n\n[[Pedagogical point:|Punto pedagógico:]]",
          options: ["[[selection effects limit perceptions of impartiality|efectos de selección limitan la percepción de imparcialidad]]", "[[every crime is automatically prosecuted globally|cada crimen se persigue automáticamente en el mundo]]", "[[gravity is irrelevant to dockets|la gravedad es irrelevante para las causas]]"],
          correctAnswer: 0,
          explanation: "Justice.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l9",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Radio:|Radio:]] \"[[Carbon markets need integrity; double counting undermines trust in net-zero claims.|Los mercados de carbono necesitan integridad; la doble contabilidad socava la confianza en las promesas de cero neto.]]\"\n\n[[Explanation offered:|Explicación ofrecida:]]",
          options: ["[[accounting rules determine whether offsets are credible|las reglas contables determinan si los offsets son creíbles]]", "[[offsets are always fraudulent|los offsets siempre son fraudulentos]]", "[[double counting is impossible by design|la doble contabilidad es imposible por diseño]]"],
          correctAnswer: 0,
          explanation: "Markets.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l10",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Workshop:|Taller:]] \"[[Development without tax reform often builds roads for elites while schools remain underfunded.|El desarrollo sin reforma fiscal a menudo construye carreteras para élites mientras las escuelas siguen infrafinanciadas.]]\"\n\n[[Key takeaway:|Idea clave:]]",
          options: ["[[distribution determines who benefits from growth|la distribución determina quién se beneficia del crecimiento]]", "[[growth automatically lifts all incomes|el crecimiento alza todos los ingresos automáticamente]]", "[[tax policy is neutral everywhere|la fiscalidad es neutra en todas partes]]"],
          correctAnswer: 0,
          explanation: "Fiscal policy.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l11",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Lecture:|Conferencia:]] \"[[Human rights rhetoric rises in crises, but enforcement still depends on coalitions and courts.|La retórica de derechos humanos crece en crisis, pero la aplicación sigue dependiendo de coaliciones y tribunales.]]\"\n\n[[Implication:|Implicación:]]",
          options: ["[[norms require institutions to bite|las normas necesitan instituciones con capacidad de actuar]]", "[[rhetoric alone changes behaviour|la retórica sola cambia la conducta]]", "[[courts are irrelevant to rights|los tribunales son irrelevantes para los derechos]]"],
          correctAnswer: 0,
          explanation: "Rights.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l12",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Clip:|Extracto de audio:]] \"[[Migration partnerships can externalise border control while outsourcing protection obligations.|Las asociaciones migratorias pueden externalizar el control fronterizo mientras subcontratan obligaciones de protección.]]\"\n\n[[Mechanism described:|Mecanismo descrito:]]",
          options: ["[[externalisation shifts dilemmas rather than dissolving them|la externalización desplaza dilemas sin disolverlos]]", "[[partnerships erase legal duties|las asociaciones borran deberes legales]]", "[[protection improves automatically|la protección mejora automáticamente]]"],
          correctAnswer: 0,
          explanation: "Externalisation.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l13",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Interview:|Entrevista:]] \"[[Water treaties strain when rainfall becomes volatile and upstream use grows.|Los tratados del agua se tensan cuando la lluvia es volátil y el uso aguas arriba crece.]]\"\n\n[[Core idea:|Idea central:]]",
          options: ["[[hydrology and politics co-evolve under climate stress|hidrología y política coevolucionan bajo estrés climático]]", "[[treaties fix volumes forever|los tratados fijan volúmenes para siempre]]", "[[upstream use never affects downstream states|el uso aguas arriba nunca afecta aguas abajo]]"],
          correctAnswer: 0,
          explanation: "Water.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l14",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Panel:|Mesa redonda:]] \"[[UN agencies coordinate, but member-state politics still sets ceilings on mandates and budgets.|Las agencias de la ONU coordinan, pero la política de los estados miembros aún fija techos a mandatos y presupuestos.]]\"\n\n[[Effect highlighted:|Efecto destacado:]]",
          options: ["[[inter-agency work is constrained by capitals|el trabajo interagencias está limitado por las capitales]]", "[[agencies operate independently of states|las agencias operan independientes de los estados]]", "[[budgets are unlimited|los presupuestos son ilimitados]]"],
          correctAnswer: 0,
          explanation: "UN.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l15",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Talk:|Charla:]] \"[[Asymmetric conflicts blur combatant and civilian roles, complicating accountability.|Los conflictos asimétricos difuminan roles de combatientes y civiles, complicando la rendición de cuentas.]]\"\n\n[[Condition emphasised:|Condición enfatizada:]]",
          options: ["[[legal categories strain when networks replace uniforms|las categorías legales se tensan sin uniformes claros]]", "[[accountability is easy in civil wars|la rendición de cuentas es fácil en guerras civiles]]", "[[civilians are never targeted|civiles nunca son objetivo]]"],
          correctAnswer: 0,
          explanation: "Conflict.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l16",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Discussion:|Debate grupal:]] \"[[Trade sanctions on tech can accelerate indigenous innovation but also raise costs for consumers.|Las sanciones comerciales en tecnología pueden acelerar innovación autóctona pero también encarecer para consumidores.]]\"\n\n[[Nuanced position:|Postura matizada:]]",
          options: ["[[industrial policy interacts with geopolitical shocks|la política industrial interactúa con choques geopolíticos]]", "[[sanctions never alter supply chains|las sanciones nunca alteran cadenas]]", "[[consumers never notice price effects|los consumidores nunca notan precios]]"],
          correctAnswer: 0,
          explanation: "Tech trade.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l17",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Summary:|Resumen:]] \"[[Pandemic treaties debate equity versus sovereignty over pathogen data sharing.|Los tratados pandémicos debaten equidad frente a soberanía en el intercambio de datos sobre patógenos.]]\"\n\n[[Point summarised:|Idea resumida:]]",
          options: ["[[sharing rules balance public goods and national security|las reglas de intercambio equilibran bienes públicos y seguridad nacional]]", "[[data sharing is purely technical|el intercambio de datos es puramente técnico]]", "[[sovereignty is irrelevant to labs|la soberanía es irrelevante para laboratorios]]"],
          correctAnswer: 0,
          explanation: "Global health.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-l18",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "global-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Global Issues in discourse|Problemas globales en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Speaker:|Voz / Hablante:]] \"[[Democratic backsliding is framed as legal reform, which tests international monitors' vocabulary.|El retroceso democrático se presenta como reforma legal, lo que pone a prueba el vocabulario de los observadores internacionales.]]\"\n\n[[Listener should infer:|El oyente debe inferir:]]",
          options: ["[[formal legality can mask substantive erosion|la legalidad formal puede enmascarar erosión sustantiva]]", "[[monitors only care about elections|los observadores solo se fijan en elecciones]]", "[[reform always strengthens courts|la reforma siempre fortalece tribunales]]"],
          correctAnswer: 0,
          explanation: "Democracy.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u8-w1",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Opening for an essay on climate justice: choose the most appropriately hedged thesis.",
          options: ["[[While historical responsibility for emissions is unevenly distributed, the moral case for accelerated finance hinges on whether wealthy states accept binding mechanisms rather than voluntary pledges.|Matiz + mecanismo]]", "[[Climate is bad.|binario]]", "[[This essay talks about weather.|vago]]"],
          correctAnswer: 0,
          explanation: "Hedged thesis.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w2",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which sentence best links sanctions policy with humanitarian outcomes?",
          options: ["[[Broad financial restrictions can throttle imports of medicine unless carve-outs are operationalised through clear banking guidance and audited channels.|puente política–humanitario]]", "[[Sanctions help everyone instantly.|falso]]", "[[Banks ignore risk.|sin matices]]"],
          correctAnswer: 0,
          explanation: "Policy bridge.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w3",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Pick the most precise closing sentence on non-proliferation verification.",
          options: ["[[In sum, without intrusive inspection matched by diplomatic incentives, treaties risk becoming symbolic shells rather than constraints on arsenals.|cierre técnico-diplomático]]", "[[Nukes are scary.|informal]]", "[[Treaties always work.|absoluto]]"],
          correctAnswer: 0,
          explanation: "Verification close.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w4",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Best topic sentence for a paragraph on extradition and human rights?",
          options: ["[[Extradition requests force courts to weigh diplomatic assurances against the risk of torture in receiving states.|tema operativo]]", "[[Extradition exists.|trivial]]", "[[Law is law.|circular]]"],
          correctAnswer: 0,
          explanation: "Topic focus.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w5",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which option avoids overstated certainty about a single NGO report on displacement?",
          options: ["[[These figures are indicative rather than exhaustive; cross-checking with registration data is essential before inferring national trends.|hedging]]", "[[The NGO proves everything.|absoluto]]", "[[We have no displacement data.|falso]]"],
          correctAnswer: 0,
          explanation: "Report caution.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w6",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the cohesive paragraph contrasting multilateral rhetoric with on-the-ground delivery.",
          options: ["[[Commitments may proliferate in communiqués; nevertheless, disbursed finance and local absorption capacity determine whether ports actually receive grain.|Nevertheless / contraste]]", "[[Summits are fun.|vago]]", "[[Delivery is simple.|falso]]"],
          correctAnswer: 0,
          explanation: "Cohesion.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w7",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Appropriate register for a formal memo to a ministry on carbon border adjustments?",
          options: ["[[We respectfully recommend assessing trade retaliation risk and WTO compatibility before adopting the proposed measure.|formal]]", "[[Hey minister, cool tax.|informal]]", "[[Taxes are dumb.|agresivo]]"],
          correctAnswer: 0,
          explanation: "Formal memo.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w8",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which reformulation cites state responsibility for transboundary harm without plagiarism?",
          options: ["[[The ILC principles stress that states must not knowingly allow their territory to be used to cause significant harm to other states.|atribución / marco]]", "[[States should be nice.|vago]]", "[[Harm never crosses borders.|falso]]"],
          correctAnswer: 0,
          explanation: "Citation.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w9",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Best sentence to introduce limitations after describing a cross-national survey on trust in the UN?",
          options: ["[[Cross-national surveys capture attitudes at a point in time; they cannot demonstrate causal links between scandals and funding cuts.|límites]]", "[[Surveys prove causation.|falso]]", "[[Our sample is perfect.|sin límites]]"],
          correctAnswer: 0,
          explanation: "Design caveats.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w10",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the sentence with effective parallel structure in a briefing note on humanitarian access.",
          options: ["[[Clear routes, predictable pauses in fighting and independent monitoring — all three are prerequisites for safe convoys.|paralelismo]]", "[[Access needs stuff.|informal]]", "[[War is messy.|vago]]"],
          correctAnswer: 0,
          explanation: "Parallel briefing.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w11",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which transition moves from describing geopolitical rivalry to discussing institutional guardrails?",
          options: ["[[Notwithstanding intensified competition over technology, confidence-building measures can still reduce miscalculation in crises.|Notwithstanding]]", "[[Anyway.|informal]]", "[[Next.|mecánico]]"],
          correctAnswer: 0,
          explanation: "Transition.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w12",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the best definition-style sentence for *jurisdiction* in public international law.",
          options: ["[[Jurisdiction denotes the authority of a court or tribunal to hear a case according to applicable rules and consents.|definición]]", "[[Jurisdiction means power always.|estrecho]]", "[[Jurisdiction is random.|falso]]"],
          correctAnswer: 0,
          explanation: "Term definition.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w13",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Most natural academic collocation in an abstract for a climate finance study?",
          options: ["[[We estimate the elasticity of pledged adaptation finance with respect to electoral cycles and disaster exposure.|collocaciones]]", "[[We did a money study.|informal]]", "[[Finance helps.|vago]]"],
          correctAnswer: 0,
          explanation: "Abstract tone.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w14",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which closing sentence points to implementation implications after discussing cross-border carbon pricing?",
          options: ["[[These findings imply that border measures must be paired with transitional support for export-dependent industries in lower-income partners.|implicación]]", "[[Carbon is a gas.|trivial]]", "[[The end.|corto]]"],
          correctAnswer: 0,
          explanation: "Policy implication.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w15",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose a hedged critique of a state's claim that unilateral recognition \"settles\" a territorial dispute.",
          options: ["[[The announcement is politically consequential, yet recognition alone cannot extinguish competing legal titles without a negotiated settlement.|crítica matizada]]", "[[States lie.|grosero]]", "[[Recognition ends all conflict.|sin crítica]]"],
          correctAnswer: 0,
          explanation: "Diplomatic critique.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w16",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the sentence that operationalises *internal displacement* for a UN report.",
          options: ["[[We operationalise internal displacement using IDP registrations and shelter intake records within national boundaries.|operacionalización]]", "[[Displacement means moving.|vago]]", "[[IDPs are always counted perfectly.|falso]]"],
          correctAnswer: 0,
          explanation: "Concept work.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w17",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which option frames sources appropriately in a literature review on peacekeeping effectiveness?",
          options: ["[[As the 2015 HIPPO report synthesised, mandates must be aligned with realistic timelines and credible force generation.|marco de síntesis]]", "[[Peacekeeping is good.|vago]]", "[[According to me, troops help.|subjetivo]]"],
          correctAnswer: 0,
          explanation: "Literature frame.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u8-w18",
    type: 'writing',
    level: 'C1',
    topic: "global-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — global issues|Escritura académica — problemas globales]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose varied syntax for rhetorical effect in a discussion of sanctions and civilian harm.",
          options: ["[[Sanctions bite elites; they also squeeze importers: safeguards must therefore be explicit, funded and monitored.|puntuación retórica]]", "[[Sanctions are bad and people suffer.|planos]]", "[[Governments decide.|telegráfico]]"],
          correctAnswer: 0,
          explanation: "Syntactic variety.",
        },
      ],
    },
    topicName: "Writing",
  },
];
