/**
 * C1 Unit 3 — Science and Technology
 * Módulo 1 (bloque temático): Persona, sociedad y entorno
 * Grammar: Mixed conditionals
 *
 * Modelo ampliado: 18 ejercicios por lección × 5 lecciones = 90 ítems.
 * Patrón de IDs: c1-u3-g1..g18, v1..v18, r1..r18, l1..l18, w1..w18.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = '[[Science and Technology|Ciencia y tecnología]]';

export const UNIT_3_EXERCISES: Exercise[] = [
{
    id: "c1-u3-g1",
    type: 'multiple-choice',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "If she _______ the research grant, she would be a professor now.",
          options: ["[[had received|hubiera recibido / past perfect]]", "[[received|recibió / pasado simple]]", "[[has received|ha recibido / presente perfecto]]"],
          correctAnswer: 0,
          explanation: "Mixed: *If + past perfect*, *would + base* (present result).",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g2",
    type: 'fill-blank',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "If I had studied biomedical engineering, I ____ ____ a clinical trial coordinator today.",
          options: ["[[would be|sería]]", "[[would have been|habría sido]]", "[[will be|será]]"],
          correctAnswer: "would be",
          acceptableAnswers: ["would be"],
          explanation: "Past unreal condition → present hypothetical result.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g3",
    type: 'multiple-choice',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "If we _______ the sensors earlier, the model would not be drifting now.",
          options: ["[[had calibrated|hubiéramos calibrado]]", "[[calibrate|calibramos / presente]]", "[[have calibrated|hemos calibrado]]"],
          correctAnswer: 0,
          explanation: "Past perfect condition + present continuous result.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g4",
    type: 'multiple-choice',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Which sentence is a correct mixed conditional (past condition → past result of present state)?",
          options: ["[[If you had warned me, I would have backed up the dataset.|Tercer condicional puro (pasado → pasado).]]", "[[If you had warned me, I would not be panicking about the lost files now.|Si me hubieras avisado, no estaría ahora en pánico por los archivos perdidos.]]", "[[If you warn me, I will back up the dataset.|Primer condicional.]]"],
          correctAnswer: 1,
          explanation: "Past condition + *would + not + be + -ing* (present result).",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g5",
    type: 'fill-blank',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "Were the ethics review stricter, fewer questionable papers ____ ____ published last year.",
          options: ["[[would have been|habrían sido]]", "[[would be|serían]]", "[[had been|habían sido]]"],
          correctAnswer: "would have been",
          acceptableAnswers: ["would have been"],
          explanation: "*Were + subject + comparative* (present unreal) + past result.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g6",
    type: 'multiple-choice',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Had the protocol been preregistered, we _______ this replication crisis now.",
          options: ["[[would not be facing|no estaríamos enfrentando]]", "[[will not face|no enfrentaremos]]", "[[would not have faced|no habríamos enfrentado]]"],
          correctAnswer: 0,
          explanation: "*Had + past participle* inversion + present result.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g7",
    type: 'fill-blank',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "If it weren't for this confound, the effect sizes ____ ____ more convincing.",
          options: ["[[would be|serían]]", "[[would have been|habrían sido]]", "[[are|son]]"],
          correctAnswer: "would be",
          acceptableAnswers: ["would be"],
          explanation: "*If it weren't for* + present counterfactual consequence.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g8",
    type: 'multiple-choice',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "I _______ more confident in the algorithm now if you had shared the training logs.",
          options: ["[[would be|estaría / would be]]", "[[would have been|habría estado]]", "[[am|estoy]]"],
          correctAnswer: 0,
          explanation: "Present state result (*would be*) of past failure to share.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g9",
    type: 'multiple-choice',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "If the telescope _______ funded on time, we would have spectroscopic data by now.",
          options: ["[[had been|hubiera sido / been funded]]", "[[was|fue]]", "[[has been|ha sido]]"],
          correctAnswer: 0,
          explanation: "Past perfect passive in the condition.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g10",
    type: 'fill-blank',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "If he ____ ____ statistics seriously, his preprint would not be attracting these critiques today.",
          options: ["[[had taken|had taken]]", "[[took|took]]", "[[takes|takes]]"],
          correctAnswer: "had taken",
          acceptableAnswers: ["had taken"],
          explanation: "Past perfect + present progressive result.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g11",
    type: 'multiple-choice',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Which mixed conditional best expresses a present regret about a past decision?",
          options: ["[[If I accepted the postdoc, I will be happy.|incorrecto]]", "[[If I had accepted the postdoc, I would be working in a better-equipped lab now.|Si hubiera aceptado el postdoc, ahora trabajaría en un laboratorio mejor equipado.]]", "[[If I accept the postdoc, I would work there.|mezcla incorrecta]]"],
          correctAnswer: 1,
          explanation: "Classic mix: past perfect + *would + be + -ing*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g12",
    type: 'fill-blank',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "Unless the firmware ____ ____ patched last month, the rover would still be offline now.",
          options: ["[[had been|had been]]", "[[was|was]]", "[[is|is]]"],
          correctAnswer: "had been",
          acceptableAnswers: ["had been"],
          explanation: "*Unless + past perfect passive* + present result.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g13",
    type: 'multiple-choice',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "If the vaccine trial _______ larger, public trust would be higher today.",
          options: ["[[had been|hubiera sido]]", "[[was|fue]]", "[[has been|ha sido]]"],
          correctAnswer: 0,
          explanation: "Past perfect *had been* + comparative adjective.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g14",
    type: 'multiple-choice',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Choose the sentence that correctly mixes a present unreal condition with a past result:",
          options: ["[[If I were less busy, I would have finished the literature review yesterday.|Si estuviera menos ocupado, habría terminado ayer la revisión bibliográfica.]]", "[[If I am less busy, I finish the review.|incorrecto]]", "[[If I had been less busy, I would finish yesterday.|tiempos incoherentes]]"],
          correctAnswer: 0,
          explanation: "*If + past simple (unreal present)* + *would have + past participle*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g15",
    type: 'fill-blank',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "If climate models ____ ____ more accurate a decade ago, policymakers would be acting faster now.",
          options: ["[[had been|had been]]", "[[were|were]]", "[[are|are]]"],
          correctAnswer: "had been",
          acceptableAnswers: ["had been"],
          explanation: "Past perfect + present progressive/infinitive result.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g16",
    type: 'multiple-choice',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "If you _______ the IRB paperwork, you wouldn't be blocked from recruiting participants now.",
          options: ["[[had submitted|hubieras enviado]]", "[[submitted|enviaste]]", "[[have submitted|has enviado]]"],
          correctAnswer: 0,
          explanation: "Past perfect for completed non-action → present block.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g17",
    type: 'multiple-choice',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Which option avoids the mixed-conditional error?",
          options: ["[[If I knew Python, I would have automated this pipeline.|mezcla incoherente de knew + would have]]", "[[If I had known Python, I would have automated this pipeline last year.|tercer condicional coherente]]", "[[If I had known Python, I would know how to automate this pipeline now.|Si hubiera sabido Python, sabría ahora cómo automatizar este pipeline.]]"],
          correctAnswer: 2,
          explanation: "Mix: past unreal knowledge → present ability (*would know*).",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-g18",
    type: 'fill-blank',
    level: 'C1',
    topic: "mixed-conditionals",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "If I ____ ____ your lab director, I would not be approving this rushed protocol.",
          options: ["[[were|were]]", "[[had been|had been]]", "[[am|am]]"],
          correctAnswer: "were",
          acceptableAnswers: ["were"],
          explanation: "*If I were* (present unreal role) + *would not be + -ing*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u3-v1",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The team formulated a testable _______ before running the experiment.",
          options: ["[[hypothesis|hipótesis]]", "[[hypnosis|hipnosis]]", "[[hyperbole|hipérbole]]"],
          correctAnswer: 0,
          explanation: "Scientific method: *hypothesis*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v2",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ evidence from controlled trials carries more weight than anecdote.",
          options: ["[[Empirical|Empírica]]", "[[Imperial|Imperial]]", "[[Impetuous|Impetuosa]]"],
          correctAnswer: 0,
          explanation: "*Empirical* = observation-based.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v3",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The study failed to _______ when another lab repeated the protocol.",
          options: ["[[replicate|replicar]]", "[[duplicate|duplicar (tono informal)]]", "[[photocopy|fotocopiar]]"],
          correctAnswer: 0,
          explanation: "Replication crisis keyword.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v4",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ review filters manuscripts before publication in many journals.",
          options: ["[[Peer|Por pares / Peer]]", "[[Pier|Muelle]]", "[[Pear|Pera]]"],
          correctAnswer: 0,
          explanation: "*Peer review*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v5",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ section describes materials, software versions and statistical tests.",
          options: ["[[methodology|metodología]]", "[[mythology|mitología]]", "[[pathology|patología]]"],
          correctAnswer: 0,
          explanation: "Methods reporting.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v6",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ learning algorithms adjust weights from labelled training data.",
          options: ["[[Supervised|Supervisado]]", "[[Superstitious|Supersticioso]]", "[[Superfluous|Superfluo]]"],
          correctAnswer: 0,
          explanation: "ML term: *supervised learning*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v7",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ describes how well the model generalises to unseen cases.",
          options: ["[[validation|validación]]", "[[vacation|vacaciones]]", "[[violation|violación]]"],
          correctAnswer: 0,
          explanation: "Train/validation split.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v8",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ engineering aims to modify genomes with targeted nucleases.",
          options: ["[[Genetic|Genética]]", "[[Generic|Genérica]]", "[[Generous|Generosa]]"],
          correctAnswer: 0,
          explanation: "*Genetic engineering*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v9",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ principle urges caution when harm is plausible but uncertain.",
          options: ["[[precautionary|de precaución]]", "[[precarious|precario]]", "[[preliminary|preliminar]]"],
          correctAnswer: 0,
          explanation: "Policy/science: *precautionary principle*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v10",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ warming refers to long-term rise in global mean surface temperature.",
          options: ["[[Global|Global]]", "[[Globular|Globular]]", "[[Glorious|Glorioso]]"],
          correctAnswer: 0,
          explanation: "*Global warming*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v11",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ technology could factor large integers faster than classical hardware for some tasks.",
          options: ["[[Quantum|Cuántica]]", "[[Quarter|Cuarto]]", "[[Quarrelsome|Reidor]]"],
          correctAnswer: 0,
          explanation: "*Quantum computing*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v12",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The payload was placed in low Earth _______ to reduce launch energy.",
          options: ["[[orbit|órbita]]", "[[orbituary|obituario (distractor)]]", "[[orchid|orquídea]]"],
          correctAnswer: 0,
          explanation: "Space vocabulary.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v13",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ medicine tailors treatment using genomic and biomarker data.",
          options: ["[[Precision|De precisión]]", "[[Precious|Preciosa]]", "[[Prehistoric|Prehistórica]]"],
          correctAnswer: 0,
          explanation: "*Precision medicine*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v14",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ leakage from thawing permafrost could amplify climate feedbacks.",
          options: ["[[Methane|Metano]]", "[[Methadone|Metadona]]", "[[Metal|Metal]]"],
          correctAnswer: 0,
          explanation: "Greenhouse gas.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v15",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ learning finds structure in data without explicit labels.",
          options: ["[[Unsupervised|No supervisado]]", "[[Unsubstantiated|Infundado]]", "[[Unsolicited|No solicitado]]"],
          correctAnswer: 0,
          explanation: "*Unsupervised learning*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v16",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ interval quantifies uncertainty around the estimated effect.",
          options: ["[[confidence|confianza]]", "[[conference|conferencia]]", "[[confidential|confidencial]]"],
          correctAnswer: 0,
          explanation: "Statistics: *confidence interval*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v17",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ biology designs novel genetic circuits in living cells.",
          options: ["[[Synthetic|Sintética]]", "[[Sympathetic|Compasiva]]", "[[Syndetic|Conjuntiva (raro)]]"],
          correctAnswer: 0,
          explanation: "*Synthetic biology*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-v18",
    type: 'multiple-choice',
    level: 'C1',
    topic: "science-technology-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ security aims to protect systems from unauthorised access and tampering.",
          options: ["[[Cyber|ciber-]]", "[[Cider|sidra]]", "[[Cipher|cifra (sust.)]]"],
          correctAnswer: 0,
          explanation: "*Cybersecurity*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u3-r1",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Scientific theories are provisional maps, not mirror images of reality.|Las teorías científicas son mapas provisionales, no copias fieles de la realidad.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[They are revisable in light of new evidence.|Son revisables a la luz de nueva evidencia.]]", "[[They are final truths once published.|Son verdades definitivas al publicarse.]]", "[[They ignore empirical testing.|Ignoran el contraste empírico.]]"],
          correctAnswer: 0,
          explanation: "Provisional knowledge.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r2",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Replication separates reliable findings from statistical flukes.|La replicación separa hallazgos fiables de fluctuaciones estadísticas.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Independent repetition tests robustness.|La repetición independiente prueba la robustez.]]", "[[One study is always enough.|Un solo estudio siempre basta.]]", "[[Replication removes all uncertainty.|La replicación elimina toda incertidumbre.]]"],
          correctAnswer: 0,
          explanation: "Replication crisis context.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r3",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Technology amplifies human intent — good and bad — rather than replacing ethics.|La tecnología amplifica la intención humana, buena y mala, más que sustituir la ética.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Tools need governance, not just optimisation.|Las herramientas necesitan gobernanza, no solo optimización.]]", "[[Algorithms are morally neutral by definition.|Los algoritmos son neutrales por definición.]]", "[[Ethics becomes irrelevant as tech advances.|La ética deja de importar con el avance tecnológico.]]"],
          correctAnswer: 0,
          explanation: "Tech ethics.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r4",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Machine learning models reflect the biases of their training corpora.|Los modelos de aprendizaje automático reflejan los sesgos de sus corpus de entrenamiento.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Garbage in, garbage out applies to data too.|«Basura entra, basura sale» también vale para los datos.]]", "[[Models are bias-free if coded carefully.|Los modelos están libres de sesgo si el código es cuidadoso.]]", "[[Training data never matters.|Los datos de entrenamiento nunca importan.]]"],
          correctAnswer: 0,
          explanation: "Data bias.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r5",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Peer review filters quality but cannot certify truth.|La revisión por pares filtra la calidad pero no puede certificar la verdad.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[It is a social process with known limitations.|Es un proceso social con limitaciones conocidas.]]", "[[Published papers are always true.|Los artículos publicados son siempre ciertos.]]", "[[Reviewers never disagree.|Los revisores nunca discrepan.]]"],
          correctAnswer: 0,
          explanation: "Philosophy of science.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r6",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Interdisciplinary collaboration often accelerates translation from lab to clinic.|La colaboración interdisciplinar a menudo acelera la transferencia del laboratorio a la clínica.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Boundary-crossing teams can bridge vocabularies and methods.|Los equipos transfronterizos pueden tender puentes entre léxicos y métodos.]]", "[[Disciplines should never interact.|Las disciplinas nunca deberían interactuar.]]", "[[Translation is automatic without communication.|La transferencia es automática sin comunicación.]]"],
          correctAnswer: 0,
          explanation: "Research translation.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r7",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Open data accelerates verification while raising privacy concerns.|Los datos abiertos aceleran la verificación pero plantean problemas de privacidad.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Transparency trades off against confidentiality.|La transparencia choca con la confidencialidad.]]", "[[Open data eliminates all risk.|Los datos abiertos eliminan todo riesgo.]]", "[[Privacy is irrelevant in science.|La privacidad es irrelevante en ciencia.]]"],
          correctAnswer: 0,
          explanation: "Open science tension.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r8",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[The precautionary principle urges caution when harm is plausible but uncertain.|El principio de precaución aconseja cautela cuando el daño es plausible pero incierto.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[It licenses action despite incomplete knowledge.|Autoriza actuar a pesar del conocimiento incompleto.]]", "[[It forbids any innovation.|Prohíbe cualquier innovación.]]", "[[It requires absolute proof of harm.|Exige prueba absoluta de daño.]]"],
          correctAnswer: 0,
          explanation: "Risk regulation.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r9",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Climate models are simplified but empirically constrained representations of the Earth system.|Los modelos climáticos son representaciones simplificadas pero empíricamente acotadas del sistema terrestre.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[They integrate physics with observational constraints.|Integran la física con restricciones observacionales.]]", "[[They ignore all measurements.|Ignoran todas las mediciones.]]", "[[They predict weather for next Tuesday only.|Solo predicen el tiempo del martes.]]"],
          correctAnswer: 0,
          explanation: "Climate science.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r10",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Gene-editing technologies raise questions about consent, equity and unintended edits.|Las tecnologías de edición génica plantean dudas sobre consentimiento, equidad y ediciones no deseadas.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Germline changes may affect future generations.|Los cambios en línea germinal pueden afectar generaciones futuras.]]", "[[Editing has no ethical dimension.|La edición no tiene dimensión ética.]]", "[[All edits are reversible instantly.|Todas las ediciones son reversibles al instante.]]"],
          correctAnswer: 0,
          explanation: "Bioethics.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r11",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Quantum algorithms may threaten classical cryptography when scaled and stabilised.|Los algoritmos cuánticos pueden amenazar la criptografía clásica cuando escalen y se estabilicen.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Security models must anticipate new computational classes.|Los modelos de seguridad deben anticipar nuevas clases computacionales.]]", "[[Quantum computers are pure science fiction.|Los ordenadores cuánticos son pura ficción.]]", "[[Cryptography never changes.|La criptografía nunca cambia.]]"],
          correctAnswer: 0,
          explanation: "Quantum information.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r12",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Efficiency gains alone cannot decarbonise economies without structural policy.|Las ganancias de eficiencia por sí solas no pueden descarbonizar economías sin políticas estructurales.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Rebound effects can offset savings.|Los efectos rebote pueden anular ahorros.]]", "[[Efficiency always reduces emissions.|La eficiencia siempre reduce emisiones.]]", "[[Policy is irrelevant to energy use.|La política es irrelevante para el uso energético.]]"],
          correctAnswer: 0,
          explanation: "Climate policy.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r13",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Surveillance infrastructures normalise new forms of behavioural monitoring.|Las infraestructuras de vigilancia normalizan nuevas formas de monitorización conductual.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Defaults shape what societies treat as acceptable.|Los valores por defecto moldean lo que las sociedades aceptan.]]", "[[Surveillance never affects behaviour.|La vigilancia nunca afecta la conducta.]]", "[[All monitoring is visible to users.|Toda monitorización es visible para el usuario.]]"],
          correctAnswer: 0,
          explanation: "Digital sociology.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r14",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Vaccine uptake depends on trust and communication as much as on efficacy data.|La adopción de vacunas depende de la confianza y la comunicación tanto como de los datos de eficacia.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Social networks mediate how evidence is received.|Las redes sociales median cómo se recibe la evidencia.]]", "[[Efficacy alone guarantees uptake.|La eficacia sola garantiza la adopción.]]", "[[Trust is irrelevant to public health.|La confianza es irrelevante para la salud pública.]]"],
          correctAnswer: 0,
          explanation: "Health communication.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r15",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Nanomaterials can cross biological barriers that bulk materials cannot.|Los nanomateriales pueden atravesar barreras biológicas que los materiales macróscopicos no pueden.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Scale changes toxicity profiles.|La escala cambia los perfiles de toxicidad.]]", "[[Nano equals always safe.|«Nano» equivale a siempre seguro.]]", "[[Barriers are identical for all sizes.|Las barreras son idénticas para todos los tamaños.]]"],
          correctAnswer: 0,
          explanation: "Nanotoxicology.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r16",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Orbital debris endangers the sustainability of satellite infrastructure.|Los desechos orbitales ponen en peligro la sostenibilidad de la infraestructura por satélite.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Collisions can cascade into further fragments.|Las colisiones pueden cascada en más fragmentos.]]", "[[Space is too empty for collisions.|El espacio está demasiado vacío para colisiones.]]", "[[Debris removes itself naturally.|Los desechos se eliminan solos de forma natural.]]"],
          correctAnswer: 0,
          explanation: "Space sustainability.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r17",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Synthetic biology blurs boundaries between living and engineered systems.|La biología sintética difumina fronteras entre sistemas vivos e ingeniería.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Design choices reframe what counts as natural.|Las decisiones de diseño replantean qué cuenta como natural.]]", "[[Living and engineered are always disjoint.|Lo vivo y lo ingenieril nunca se solapan.]]", "[[Synthetic cells cannot self-replicate.|Las células sintéticas no pueden autorreplicarse.]]"],
          correctAnswer: 0,
          explanation: "Synbio ethics.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-r18",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "science-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Science and Technology|Ciencia y tecnología]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Digital twins allow engineers to simulate failures before physical assets break.|Los gemelos digitales permiten simular fallos antes de que los activos físicos se rompan.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Simulation reduces costly downtime.|La simulación reduce tiempos de inactividad costosos.]]", "[[Twins replace physical maintenance entirely.|Los gemelos sustituyen por completo el mantenimiento físico.]]", "[[Models never diverge from reality.|Los modelos nunca se desvían de la realidad.]]"],
          correctAnswer: 0,
          explanation: "Industry 4.0.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u3-l1",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Speaker:|Voz / Hablante:]] \"[[Replication is not bureaucracy; it is how science self-corrects.|La replicación no es burocracia; es cómo la ciencia se autocorrige.]]\"\n\n[[The speaker stresses that:|La voz enfatiza que:]]",
          options: ["[[self-correction through repetition|autocorrección mediante repetición]]", "[[bureaucracy is useless|la burocracia no sirve]]", "[[one study is final|un estudio es definitivo]]"],
          correctAnswer: 0,
          explanation: "Scientific method.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l2",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Lecturer:|Profesor/a (clase magistral):]] \"[[If we had preregistered the analysis plan, we would not be arguing about p-hacking now.|Si hubiéramos preregistrado el plan de análisis, no estaríamos ahora discutiendo p-hacking.]]\"\n\n[[Main claim:|Tesis principal:]]",
          options: ["[[preregistration reduces analytic flexibility ex post|el preregistro reduce la flexibilidad analítica a posteriori]]", "[[p-hacking is impossible|el p-hacking es imposible]]", "[[plans never help|los planes nunca ayudan]]"],
          correctAnswer: 0,
          explanation: "Open science practice.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l3",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Interviewer:|Entrevistador/a:]] \"[[The model generalises well on the validation set but collapses on out-of-domain inputs.|El modelo generaliza bien en el conjunto de validación pero falla en entradas fuera del dominio.]]\"\n\n[[The interviewee implies:|El entrevistado insinúa que:]]",
          options: ["[[domain shift undermines naive deployment|el cambio de dominio socava el despliegue ingenuo]]", "[[validation guarantees real-world success|la validación garantiza el éxito en el mundo real]]", "[[all inputs are identical|todas las entradas son idénticas]]"],
          correctAnswer: 0,
          explanation: "ML robustness.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l4",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Coach:|Coach:]] \"[[Under the precautionary principle, absence of evidence is not evidence of absence.|Bajo el principio de precaución, la ausencia de evidencia no es evidencia de ausencia.]]\"\n\n[[The advice focuses on:|El consejo se centra en:]]",
          options: ["[[uncertainty does not licence complacency|la incertidumbre no autoriza la complacencia]]", "[[no data means no risk|sin datos no hay riesgo]]", "[[precaution forbids all action|la precaución prohíbe toda acción]]"],
          correctAnswer: 0,
          explanation: "Risk communication.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l5",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Podcast host:|Presentador/a del podcast:]] \"[[CRISPR is a powerful tool; governance must catch up with capability.|CRISPR es una herramienta poderosa; la gobernanza debe alcanzar la capacidad técnica.]]\"\n\n[[The distinction drawn is:|La distinción trazada es:]]",
          options: ["[[capability-governance gap|brecha entre capacidad y gobernanza]]", "[[tools need no rules|las herramientas no necesitan normas]]", "[[CRISPR only edits text|CRISPR solo edita texto]]"],
          correctAnswer: 0,
          explanation: "Bioethics.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l6",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Therapist:|Terapeuta:]] \"[[Quantum supremacy demonstrations do not yet break practical cryptography.|Las demostraciones de supremacía cuántica aún no rompen la criptografía práctica.]]\"\n\n[[Therapeutic aim:|Objetivo terapéutico:]]",
          options: ["[[milestones differ from deployed threats|los hitos difieren de amenazas desplegadas]]", "[[all encryption is already broken|todo el cifrado ya está roto]]", "[[quantum computers are toys|los ordenadores cuánticos son juguetes]]"],
          correctAnswer: 0,
          explanation: "Hype vs reality.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l7",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Debate:|Debate:]] \"[[Energy rebound can eat efficiency gains if consumption patterns adapt.|El efecto rebote energético puede absorber las ganancias de eficiencia si se adaptan los patrones de consumo.]]\"\n\n[[Speaker suggests:|El hablante sugiere que:]]",
          options: ["[[rebound complicates naive savings narratives|el rebote complica las narrativas ingenuas de ahorro]]", "[[efficiency always cuts emissions|la eficiencia siempre reduce emisiones]]", "[[behaviour never changes|la conducta nunca cambia]]"],
          correctAnswer: 0,
          explanation: "Environmental economics.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l8",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Seminar leader:|Moderador/a del seminario:]] \"[[Vaccine hesitancy spreads through social ties faster than fact-checks in some networks.|La vacilación vacunal se propaga por lazos sociales más rápido que las verificaciones de hechos en algunas redes.]]\"\n\n[[Pedagogical point:|Punto pedagógico:]]",
          options: ["[[network topology shapes diffusion|la topología de la red moldea la difusión]]", "[[facts always win online|los hechos siempre ganan en línea]]", "[[hesitancy is purely irrational|la vacilación es puramente irracional]]"],
          correctAnswer: 0,
          explanation: "Infodemiology.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l9",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Radio:|Radio:]] \"[[Long-term storage of high-level waste remains an unsolved sociotechnical problem.|El almacenamiento a largo plazo de residuos de alta actividad sigue siendo un problema sociotécnico sin resolver.]]\"\n\n[[Explanation offered:|Explicación ofrecida:]]",
          options: ["[[technical and social legitimacy both matter|tanto la legitimidad técnica como la social importan]]", "[[waste disappears safely alone|los residuos desaparecen solos con seguridad]]", "[[only engineers should decide|solo los ingenieros deben decidir]]"],
          correctAnswer: 0,
          explanation: "Nuclear policy.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l10",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Workshop:|Taller:]] \"[[AI safety research asks how to align optimisation with human values.|La investigación en seguridad de la IA pregunta cómo alinear la optimización con valores humanos.]]\"\n\n[[Key takeaway:|Idea clave:]]",
          options: ["[[misaligned objectives can scale harm|objetivos desalineados pueden amplificar el daño]]", "[[optimisation is always benign|la optimización siempre es benigna]]", "[[values are technically irrelevant|los valores son técnicamente irrelevantes]]"],
          correctAnswer: 0,
          explanation: "AI alignment.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l11",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Lecture:|Conferencia:]] \"[[The placebo effect shows that expectation physically shapes outcomes.|El efecto placebo muestra que la expectativa moldea físicamente los resultados.]]\"\n\n[[Implication:|Implicación:]]",
          options: ["[[mind-body interaction in trials|interacción mente-cuerpo en ensayos]]", "[[placebos cure everything|los placebos curan todo]]", "[[expectation is purely imaginary|la expectativa es puramente imaginaria]]"],
          correctAnswer: 0,
          explanation: "Clinical trials.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l12",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Clip:|Extracto de audio:]] \"[[Fusion timelines have repeatedly overshot optimistic forecasts.|Los plazos de la fusión han superado repetidamente previsiones optimistas.]]\"\n\n[[Mechanism described:|Mecanismo descrito:]]",
          options: ["[[engineering surprises teach humility|las sorpresas de ingeniería enseñan humildad]]", "[[fusion is always five years away is a joke without lesson|el «siempre a cinco años» es solo chiste]]", "[[physics is fully solved|la física está totalmente resuelta]]"],
          correctAnswer: 0,
          explanation: "Energy expectations.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l13",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Interview:|Entrevista:]] \"[[Metadata from wearables can reveal more than users consciously share.|Los metadatos de los wearables pueden revelar más de lo que los usuarios comparten conscientemente.]]\"\n\n[[Core idea:|Idea central:]]",
          options: ["[[inferred behaviour from passive sensors|conducta inferida de sensores pasivos]]", "[[wearables only count steps|los wearables solo cuentan pasos]]", "[[privacy is guaranteed by default|la privacidad está garantizada por defecto]]"],
          correctAnswer: 0,
          explanation: "Privacy.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l14",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Panel:|Mesa redonda:]] \"[[Antibiotic overuse selects for resistance faster than new drugs arrive.|El uso excesivo de antibióticos selecciona resistencia más rápido de lo que llegan fármacos nuevos.]]\"\n\n[[Effect highlighted:|Efecto destacado:]]",
          options: ["[[evolutionary arms race in clinics|carrera armamentística evolutiva en clínicas]]", "[[resistance is impossible|la resistencia es imposible]]", "[[new drugs always outpace bacteria|los fármacos nuevos siempre superan a las bacterias]]"],
          correctAnswer: 0,
          explanation: "AMR.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l15",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Talk:|Charla:]] \"[[Sea-level rise is not uniform; regional dynamics matter.|La subida del nivel del mar no es uniforme; importan la dinámicas regionales.]]\"\n\n[[Condition emphasised:|Condición enfatizada:]]",
          options: ["[[local geodesy and currents reshape exposure|la geodesia local y las corrientes remodelan la exposición]]", "[[every coast rises equally|toda costa sube igual]]", "[[oceans are flat bathtubs|los océanos son bañeras planas]]"],
          correctAnswer: 0,
          explanation: "Oceanography.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l16",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Discussion:|Debate grupal:]] \"[[Carbon capture is necessary but not sufficient without demand-side change.|La captura de carbono es necesaria pero no suficiente sin cambios en la demanda.]]\"\n\n[[Nuanced position:|Postura matizada:]]",
          options: ["[[technofix limits without behaviour and policy|límites del «technofix» sin conducta y política]]", "[[capture solves climate alone|la captura soluciona el clima sola]]", "[[demand never matters|la demanda nunca importa]]"],
          correctAnswer: 0,
          explanation: "Climate mitigation.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l17",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Summary:|Resumen:]] \"[[Peer review did not catch the error; post-publication critique did.|La revisión por pares no detectó el error; la crítica pospublicación sí.]]\"\n\n[[Point summarised:|Idea resumida:]]",
          options: ["[[science advances through distributed criticism|la ciencia avanza mediante crítica distribuida]]", "[[peer review is infallible|la revisión por pares es infalible]]", "[[errors never appear in journals|los errores nunca aparecen en revistas]]"],
          correctAnswer: 0,
          explanation: "Scientific correction.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-l18",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "science-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Science in discourse|Ciencia en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Speaker:|Voz / Hablante:]] \"[[If we had invested earlier in grid storage, renewables would be less intermittent now.|Si hubiéramos invertido antes en almacenamiento de red, las renovables serían ahora menos intermitentes.]]\"\n\n[[Listener should infer:|El oyente debe inferir:]]",
          options: ["[[mixed conditional linking past policy to present grid behaviour|condicional mixto que enlaza política pasada con el comportamiento actual de la red]]", "[[storage removes all variability|el almacenamiento elimina toda variabilidad]]", "[[renewables need no backup|las renovables no necesitan respaldo]]"],
          correctAnswer: 0,
          explanation: "Energy systems.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u3-w1",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Title: \"Artificial general intelligence will solve humanity's problems within a decade.\" Choose the strongest C1 opening that hedges and scopes the claim.",
          options: ["[[While advances in machine learning are undeniable, the leap from narrow systems to general intelligence capable of reliably addressing complex social problems remains deeply uncertain and ethically contested.|Matiz + incertidumbre epistémica]]", "[[AI will fix everything soon.|demasiado absoluto]]", "[[This essay is about AI.|demasiado vago]]"],
          correctAnswer: 0,
          explanation: "Hedged STEM thesis.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w2",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which sentence best links evidence from trials with policy recommendations?",
          options: ["[[Efficacy in controlled settings does not automatically translate into effectiveness at population scale; implementation science must therefore accompany regulatory approval.|puente evidencia–política]]", "[[Trials and policy are the same.|sin distinción]]", "[[Policy ignores science.|sin matices]]"],
          correctAnswer: 0,
          explanation: "Evidence-based policy.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w3",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Pick the most precise academic conclusion on climate attribution.",
          options: ["[[The attribution literature indicates that recent warming trends are extremely unlikely without anthropogenic forcing, though regional impacts remain heterogeneous.|atribución antropogénica matizada]]", "[[Weather proves everything.|vago]]", "[[Science is sure about every local detail.|falso]]"],
          correctAnswer: 0,
          explanation: "Attribution language.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w4",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the best thesis for a problem-solution text on antimicrobial resistance.",
          options: ["[[Although novel antibiotics are necessary, stewardship programmes that reduce unnecessary prescribing and agricultural misuse may buy time while discovery pipelines recover.|problema + mitigaciones]]", "[[Bacteria are bad.|tautología]]", "[[Medicine exists.|irrelevante]]"],
          correctAnswer: 0,
          explanation: "AMR essay.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w5",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which sentence avoids overstated certainty about a single preclinical study?",
          options: ["[[These murine findings are suggestive but require independent replication before clinical translation can be responsibly discussed.|replicación antes de traslación]]", "[[Mice prove human cures.|absoluto]]", "[[There is no evidence.|falso]]"],
          correctAnswer: 0,
          explanation: "Translational hedging.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w6",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the cohesive paragraph on double-blind peer review.",
          options: ["[[First, anonymity can reduce prestige bias. Second, it cannot eliminate ideological blind spots. Therefore, complementary open commentary may strengthen self-correction.|First / Second / Therefore]]", "[[Review happens.|sin cohesión]]", "[[Peers are peers.|vago]]"],
          correctAnswer: 0,
          explanation: "Signposted critique.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w7",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose appropriate register for a formal data-access request to a biobank.",
          options: ["[[The undersigned respectfully request de-identified cohort extracts under protocol v3.2 for the purpose outlined in the attached ethics approval.|formal]]", "[[Hey, send me your DNA lol.|informal]]", "[[Give data now.|amenaza]]"],
          correctAnswer: 0,
          explanation: "Formal request.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w8",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which reformulation acknowledges Popper without plagiarism?",
          options: ["[[Popper (1959) famously argued that scientific theories gain credibility through risky predictions that could, in principle, falsify them.|atribución + paráfrasis]]", "[[Popper said science stuff.|vago]]", "[[Copy Popper.|plagio]]"],
          correctAnswer: 0,
          explanation: "Philosophy citation.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w9",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Best topic sentence for a paragraph on reproducibility?",
          options: ["[[Reproducibility crises in several disciplines suggest that incentive structures reward novelty over robustness, which invites reforms to preregistration and reporting standards.|tema claro]]", "[[Science exists.|irrelevante]]", "[[Results are results.|vago]]"],
          correctAnswer: 0,
          explanation: "Focused topic sentence.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w10",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the sentence with effective parallel structure in methods reporting.",
          options: ["[[We preprocessed the signals, aligned the sensors and logged the software versions for each run.|paralelismo *We …*]]", "[[We preprocessed, aligning and logged wrong.|roto]]", "[[We did methods.|vago]]"],
          correctAnswer: 0,
          explanation: "Parallelism.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w11",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which transition links a methods paragraph to a limitations paragraph?",
          options: ["[[Notwithstanding careful controls, observational designs cannot fully exclude unmeasured confounding.|Notwithstanding + límite]]", "[[Anyway.|informal]]", "[[Next.|sin conexión]]"],
          correctAnswer: 0,
          explanation: "Formal limitation.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w12",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the best definition-style sentence for *effect size*.",
          options: ["[[Effect size quantifies the magnitude of a phenomenon or association, complementing inferential statistics that address sampling variability alone.|definición académica]]", "[[Effect size means p-value.|incorrecto]]", "[[Effect size is always large.|falso]]"],
          correctAnswer: 0,
          explanation: "Formal definition.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w13",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Pick the most natural academic collocation in a genomics abstract.",
          options: ["[[We identified differentially expressed pathways associated with treatment response.|collocaciones naturales]]", "[[We found big gene stuff.|no académico]]", "[[Genes did things.|vago]]"],
          correctAnswer: 0,
          explanation: "STEM colligation.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w14",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which closing moves to implications for open science policy?",
          options: ["[[These findings imply that funders could prioritise replication grants and registered reports without stifling exploratory science.|implicación de política]]", "[[In conclusion, science is hard.|vago]]", "[[The end.|corto]]"],
          correctAnswer: 0,
          explanation: "Implications.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w15",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the best hedged critique of a simulation study.",
          options: ["[[The model is instructive, yet its parameterisation relies on outdated emission inventories that may understate certain sectors.|crítica matizada]]", "[[Simulations are useless.|grosero]]", "[[The model is perfect.|sin crítica]]"],
          correctAnswer: 0,
          explanation: "Measured critique.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w16",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the sentence that operationalises *generalisation* for ML readers.",
          options: ["[[For present purposes, we operationalise out-of-domain generalisation as held-out performance on geographically disjoint test sites.|operacionalización]]", "[[Generalisation means magic.|vago]]", "[[Generalisation is accuracy.|demasiado estrecho]]"],
          correctAnswer: 0,
          explanation: "Term work.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w17",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which option shows appropriate citation framing for a meta-analysis?",
          options: ["[[As the Cochrane review (2021) synthesised, pooled estimates should be interpreted alongside heterogeneity metrics and risk-of-bias assessments.|marco de cita]]", "[[Cochrane said yes.|vago]]", "[[According to me, meta-analysis is fake.|sin evidencia]]"],
          correctAnswer: 0,
          explanation: "Attribution.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u3-w18",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — STEM|Escritura académica — STEM]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose varied syntax for rhetorical effect in a discussion section.",
          options: ["[[The mechanism is plausible; the evidence, nonetheless, remains indirect: causal claims should therefore be circumspect.|punto y coma + dos puntos]]", "[[The mechanism is plausible and evidence is indirect and claims should be careful.|todo y… y…]]", "[[Plausible indirect careful.|telegráfico]]"],
          correctAnswer: 0,
          explanation: "Syntactic variety.",
        },
      ],
    },
    topicName: "Writing",
  },
];
