/**
 * C1 Unit 2 — Language and Communication
 * Módulo 1 (bloque temático): Persona, sociedad y entorno
 * Grammar: Inversion for emphasis
 *
 * Modelo ampliado: 18 ejercicios por lección × 5 lecciones = 90 ítems.
 * Patrón de IDs: c1-u2-g1..g18, v1..v18, r1..r18, l1..l18, w1..w18.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = '[[Language and Communication|Lenguaje y comunicación]]';

export const UNIT_2_EXERCISES: Exercise[] = [
{
    id: "c1-u2-g1",
    type: 'multiple-choice',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ have I heard such a compelling argument in a debate.",
          options: ["[[Never|Jamás / Nunca]]", "[[Not|No (solo)]]", "[[Although|Aunque]]"],
          correctAnswer: 0,
          explanation: "*Never* + auxiliary + subject = standard negative adverb inversion.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g2",
    type: 'fill-blank',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "Not only ____ she master three languages, but she also codes in Python.",
          options: ["[[did|hizo / auxiliar pasado]]", "[[does|hace]]", "[[has|ha]]"],
          correctAnswer: "did",
          acceptableAnswers: ["did"],
          explanation: "*Not only + did + subject + bare infinitive* (past simple).",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g3",
    type: 'multiple-choice',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Which sentence uses inversion correctly?",
          options: ["[[Seldom I have seen such rigour.|Incorrecta: sin inversión.]]", "[[Seldom have I seen such rigour.|Raramente he visto tal rigor.]]", "[[I have seldom seen such rigour.|Oración corriente, no enfática al inicio.]]"],
          correctAnswer: 1,
          explanation: "*Seldom + have + subject + past participle*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g4",
    type: 'multiple-choice',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ had the speaker finished than questions flooded in.",
          options: ["[[No sooner|No sooner / Apenas]]", "[[Hardly|Hardly]]", "[[Scarcely|Scarcely]]"],
          correctAnswer: 0,
          explanation: "*No sooner + had + subject + past participle + than*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g5",
    type: 'fill-blank',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "Rarely ____ such a balanced policy brief cross my desk.",
          options: ["[[have I seen|have I seen]]", "[[I have seen|I have seen]]", "[[did I saw|did I saw]]"],
          correctAnswer: "have I seen",
          acceptableAnswers: ["have I seen"],
          explanation: "*Rarely + have + subject + past participle*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g6",
    type: 'multiple-choice',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Which fronting triggers inversion of the auxiliary?",
          options: ["[[In the report the findings appear.|Preposicional sin inversión.]]", "[[Under no circumstances should trainees ignore safety protocols.|En ningún caso los becarios deben ignorar los protocolos de seguridad.]]", "[[The trainees should never ignore safety protocols.|Orden canónica.]]"],
          correctAnswer: 1,
          explanation: "Negative *Under no circumstances* requires inversion (*should trainees*).",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g7",
    type: 'fill-blank',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "Little ____ they realise how their phrasing would be interpreted online.",
          options: ["[[did|did]]", "[[do|do]]", "[[had|had]]"],
          correctAnswer: "did",
          acceptableAnswers: ["did"],
          explanation: "*Little + did + subject + bare infinitive* (past).",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g8",
    type: 'multiple-choice',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Not until the Q&A ____ the chair acknowledge the funding conflict.",
          options: ["[[did|did]]", "[[that|that]]", "[[when|when]]"],
          correctAnswer: 0,
          explanation: "*Not until + time clause + inversion in main clause* → *did the chair acknowledge*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g9",
    type: 'multiple-choice',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Hardly ____ the meeting begun when the fire alarm sounded.",
          options: ["[[Hardly the meeting had begun|Orden incorrecto.]]", "[[Hardly had the meeting begun|Apenas había empezado la reunión.]]", "[[Hardly begun the meeting had|Roto.]]"],
          correctAnswer: 1,
          explanation: "*Hardly + had + subject + past participle + when*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g10",
    type: 'fill-blank',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "At no time ____ the team promise guaranteed outcomes.",
          options: ["[[did|did]]", "[[the team did|the team did]]", "[[was|was]]"],
          correctAnswer: "did",
          acceptableAnswers: ["did"],
          explanation: "*At no time + did + subject + bare infinitive*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g11",
    type: 'multiple-choice',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Nowhere else ____ one find such granular corpus tagging guidelines.",
          options: ["[[Nowhere else one can find|Sin inversión.]]", "[[Nowhere else can one find|Inversión correcta con modal.]]", "[[One can nowhere else find|Roto.]]"],
          correctAnswer: 1,
          explanation: "*Nowhere + auxiliary + subject*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g12",
    type: 'multiple-choice',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "So convincing ____ the evidence that the panel revised its stance.",
          options: ["[[was the evidence|was the evidence]]", "[[the evidence was|the evidence was]]", "[[did the evidence|did the evidence]]"],
          correctAnswer: 0,
          explanation: "*So + adjective + be + subject* inversion pattern.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g13",
    type: 'fill-blank',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "Such ____ the backlash that the post was retracted within hours.",
          options: ["[[was|was]]", "[[did|did]]", "[[had|had]]"],
          correctAnswer: "was",
          acceptableAnswers: ["was"],
          explanation: "*Such + be + noun phrase + that-clause* (inversion with *was*).",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g14",
    type: 'multiple-choice',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Only after reading the footnotes ____ the ambiguity become clear.",
          options: ["[[the ambiguity became|sin inversión]]", "[[did the ambiguity become|did the ambiguity become]]", "[[became the ambiguity|incorrecto]]"],
          correctAnswer: 1,
          explanation: "*Only + prepositional phrase + inversion in main clause*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g15",
    type: 'multiple-choice',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Which sentence keeps standard word order (no inversion needed)?",
          options: ["[[I have never trusted opaque metrics.|Orden estándar con never.]]", "[[Never have I trusted opaque metrics.|Con inversión enfática.]]", "[[Rarely do I trust opaque metrics.|Con inversión.]]"],
          correctAnswer: 0,
          explanation: "*Never* after auxiliary → no inversion; fronted *Never* → inversion.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g16",
    type: 'fill-blank',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "Scarcely ____ the words out of her mouth than colleagues objected.",
          options: ["[[had she got|had she got]]", "[[she had got|she had got]]", "[[did she got|did she got]]"],
          correctAnswer: "had she got",
          acceptableAnswers: ["had she got"],
          explanation: "*Scarcely + had + subject + past participle + than*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g17",
    type: 'multiple-choice',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Choose the best inversion for formal written English:",
          options: ["[[Little consideration was given to pragmatic failure.|Pasiva; no es inversión enfática del tipo *Little did*.]]", "[[Little did the authors consider pragmatic failure.|Los autores apenas consideraron el fracaso pragmático.]]", "[[The authors little considered pragmatic failure.|No idiomático.]]"],
          correctAnswer: 1,
          explanation: "*Little + auxiliary + subject + verb* for emphatic limitation.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-g18",
    type: 'fill-blank',
    level: 'C1',
    topic: "inversion-emphasis",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Inversion for Emphasis|Inversión para énfasis]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "Were the data sounder, we ____ draw firmer conclusions — choose the verb form (subjunctive-style conditional).",
          options: ["[[could|could]]", "[[can|can]]", "[[will|will]]"],
          correctAnswer: "could",
          acceptableAnswers: ["could"],
          explanation: "*Were + subject + adjective* opens inverted conditional; main clause often *could/would*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u2-v1",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The memo used _______ to downplay the layoffs as \"rightsizing\".",
          options: ["[[euphemism|eufemismo]]", "[[euphony|eufonía]]", "[[ellipsis|elipsis]]"],
          correctAnswer: 0,
          explanation: "*Euphemism* softens harsh realities.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v2",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "In Brussels meetings, English often serves as a _______ among diplomats.",
          options: ["[[lingua franca|lengua franca]]", "[[pidgin|pidgin]]", "[[creole|criollo]]"],
          correctAnswer: 0,
          explanation: "*Lingua franca* = bridge language.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v3",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Pragmatics studies how context shapes _______ — what we do with words.",
          options: ["[[illocutionary force|fuerza ilocucionaria]]", "[[syntax|sintaxis]]", "[[morphology|morfología]]"],
          correctAnswer: 0,
          explanation: "Speech-act angle: *illocutionary force*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v4",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The term \"enhanced interrogation\" carries heavy political _______.",
          options: ["[[connotation|connotación]]", "[[denotation|denotación]]", "[[etymology|etimología]]"],
          correctAnswer: 0,
          explanation: "Associative meaning → *connotation*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v5",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Academic writers _______ \"claim\" with \"argue\" or \"contend\" to sound cautious.",
          options: ["[[collocate|colocar / usar en colocación]]", "[[conjugate|conjugar]]", "[[inflect|flexionar]]"],
          correctAnswer: 0,
          explanation: "Lexical verb choice = *collocate* in a broad sense (teaching usage).",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v6",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______, the email sounded polite; the attachment told another story.",
          options: ["[[On the surface|En la superficie]]", "[[Below ground|Bajo tierra]]", "[[Once inside|Una vez dentro]]"],
          correctAnswer: 0,
          explanation: "Discourse marker for outward vs hidden meaning.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v7",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Code-_______ between Spanish and English is common in bilingual workplaces.",
          options: ["[[switching|cambio de código]]", "[[breaking|ruptura]]", "[[locking|bloqueo]]"],
          correctAnswer: 0,
          explanation: "*Code-switching*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v8",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The CEO's joke was a _______ act that unsettled junior staff.",
          options: ["[[face-threatening|amenazante para la imagen (face-threatening)]]", "[[face-saving|que salva la imagen]]", "[[face-blind|ceguera facial]]"],
          correctAnswer: 0,
          explanation: "Politeness theory: *face-threatening act*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v9",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Legal _______ makes statutes hard for lay readers without training.",
          options: ["[[jargon|jerga]]", "[[slang|argot]]", "[[jingle|eslógan]]"],
          correctAnswer: 0,
          explanation: "Specialised lexis → *jargon*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v10",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ ambiguity arises when a phrase has two plausible readings.",
          options: ["[[Structural|Estructural]]", "[[Phonetic|Fonética]]", "[[Olfactory|Olfativa]]"],
          correctAnswer: 0,
          explanation: "*Structural ambiguity*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v11",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The newspaper shifted to a more informal _______ to attract younger readers.",
          options: ["[[register|registro]]", "[[ledger|libro mayor]]", "[[cashier|cajero]]"],
          correctAnswer: 0,
          explanation: "Sociolinguistic *register*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v12",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ analysis examines how sentences relate beyond grammar.",
          options: ["[[Discourse|Del discurso / Discursivo]]", "[[Discrete|Discreto]]", "[[Discreet|Discreto (cualidad)]]"],
          correctAnswer: 0,
          explanation: "*Discourse analysis*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v13",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The literal _______ of \"inflammable\" confuses some L2 learners.",
          options: ["[[denotation|denotación]]", "[[connotation|connotación]]", "[[annotation|anotación]]"],
          correctAnswer: 0,
          explanation: "Dictionary sense → *denotation*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v14",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Her _______ was indirect: she requested \"flexibility\" rather than a raise.",
          options: ["[[speech act|acto de habla]]", "[[speech day|día del discurso]]", "[[speech bubble|bocadillo]]"],
          correctAnswer: 0,
          explanation: "*Speech act*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v15",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The slogan traded on _______ — positive words masking a harsh policy.",
          options: ["[[rhetoric|retórica]]", "[[arithmetic|aritmética]]", "[[rheumatism|reumatismo]]"],
          correctAnswer: 0,
          explanation: "Persuasive language → *rhetoric*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v16",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ verbs like \"suggest\" and \"imply\" weaken categorical claims.",
          options: ["[[Reporting|De reporte / reporting]]", "[[Roaring|Rugientes]]", "[[Soaring|Ascendentes]]"],
          correctAnswer: 0,
          explanation: "*Reporting verbs* in academic prose.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v17",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The interpreter preserved the speaker's _______ so the tone matched the original.",
          options: ["[[illocutionary force|fuerza ilocucionaria]]", "[[alliterative force|fuerza aliterativa]]", "[[magnetic force|fuerza magnética]]"],
          correctAnswer: 0,
          explanation: "Pragmatic fidelity.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-v18",
    type: 'multiple-choice',
    level: 'C1',
    topic: "communication-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Language, Discourse and Register|Lenguaje, discurso y registro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "______ competence includes knowing when silence is appropriate.",
          options: ["[[Communicative|Comunicativa]]", "[[Computational|Computacional]]", "[[Combative|Combativa]]"],
          correctAnswer: 0,
          explanation: "*Communicative competence* (Hymes).",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u2-r1",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Language is not merely a mirror of reality; it actively shapes what we notice and how we argue.|El lenguaje no es solo un espejo de la realidad; moldea activamente lo que notamos y cómo argumentamos.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[It partly constructs perception and reasoning.|En parte construye la percepción y el razonamiento.]]", "[[It only reflects a fixed world.|Solo refleja un mundo fijo.]]", "[[It prevents all disagreement.|Impide cualquier desacuerdo.]]"],
          correctAnswer: 0,
          explanation: "Active shaping vs passive mirroring.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r2",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Meaning is negotiated in interaction, not deposited intact from speaker to hearer.|El significado se negocia en la interacción; no se transfiere intacto del hablante al oyente.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Understanding is co-produced in dialogue.|La comprensión se coproduce en el diálogo.]]", "[[Listeners are passive vessels.|Los oyentes son recipientes pasivos.]]", "[[Speakers always control meaning fully.|El hablante controla siempre el significado al 100%.]]"],
          correctAnswer: 0,
          explanation: "Pragmatic negotiation.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r3",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Politeness strategies can mitigate face-threatening acts without erasing conflict.|Las estrategias de cortesía pueden mitigar actos amenazantes para la imagen sin borrar el conflicto.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Softeners can reduce social damage while disagreement remains.|Los atenuantes reducen el daño social manteniendo el desacuerdo.]]", "[[Politeness removes all conflict.|La cortesía elimina todo conflicto.]]", "[[Face is irrelevant online.|La imagen social es irrelevante en línea.]]"],
          correctAnswer: 0,
          explanation: "Mitigation ≠ elimination.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r4",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Register shifts signal stance as clearly as lexical choice.|Los cambios de registro señalan la postura del hablante tan claramente como la elección léxica.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Formality cues communicate attitude.|Las señales de formalidad comunican actitud.]]", "[[Register is random noise.|El registro es ruido aleatorio.]]", "[[Only vocabulary matters for stance.|Solo el vocabulario importa para la postura.]]"],
          correctAnswer: 0,
          explanation: "Register as stance marker.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r5",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Corpus evidence shows that prescriptive rules often lag behind actual usage.|La evidencia de corpus muestra que las reglas prescriptivas a menudo van a la zaga del uso real.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Living usage may diverge from textbook norms.|El uso vivo puede desviarse de las normas de manual.]]", "[[Corpora prove textbooks are always right.|Los corpus demuestran que los manuales siempre aciertan.]]", "[[Usage never changes.|El uso nunca cambia.]]"],
          correctAnswer: 0,
          explanation: "Descriptive vs prescriptive tension.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r6",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Metaphor is not decorative fluff; it structures reasoning in policy debates.|La metáfora no es adorno superficial; estructura el razonamiento en debates de políticas.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Figurative frames steer how problems are defined.|Los marcos figurativos orientan cómo se definen los problemas.]]", "[[Metaphors never influence logic.|Las metáforas nunca influyen en la lógica.]]", "[[Policy is purely literal.|La política es puramente literal.]]"],
          correctAnswer: 0,
          explanation: "Conceptual metaphor.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r7",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Bilingual speakers may calibrate identity through language choice in the same conversation.|Los hablantes bilingües pueden calibrar la identidad mediante la elección de lengua en la misma conversación.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Code-switching can index affiliation or distance.|El cambio de código puede indicar afiliación o distancia.]]", "[[Bilinguals use one language only.|Los bilingües usan solo una lengua.]]", "[[Switching is always accidental.|El cambio siempre es accidental.]]"],
          correctAnswer: 0,
          explanation: "Sociolinguistic indexing.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r8",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Hedging protects writers from overstated claims when evidence is partial.|El matiz epistémico (hedging) protege a los autores de afirmaciones exageradas cuando la evidencia es parcial.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Tentative wording matches limited certainty.|Un registro tentativo encaja con certeza limitada.]]", "[[Hedging removes all credibility.|El hedging elimina toda credibilidad.]]", "[[Writers should always sound certain.|Los autores deben sonar siempre seguros.]]"],
          correctAnswer: 0,
          explanation: "Epistemic stance.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r9",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Implicature lets speakers mean more than they literally say.|La implicatura permite que los hablantes quieran decir más de lo que dicen literalmente.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Gricean cooperation explains many indirect readings.|La cooperación griceana explica muchas lecturas indirectas.]]", "[[Literal meaning is always exhaustive.|El significado literal siempre lo dice todo.]]", "[[Implicature forbids inference.|La implicatura prohíbe inferir.]]"],
          correctAnswer: 0,
          explanation: "Pragmatic inference.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r10",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Taboo words carry social risk even when denotation is neutral in another context.|Las palabras tabú conllevan riesgo social aunque la denotación sea neutra en otro contexto.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Sociolinguistic norms govern appropriateness.|Las normas sociolingüísticas rigen la adecuación.]]", "[[Taboo is purely grammatical.|Lo tabú es puramente gramatical.]]", "[[All words are interchangeable.|Todas las palabras son intercambiables.]]"],
          correctAnswer: 0,
          explanation: "Appropriacy.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r11",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Discourse markers guide hearers through argument structure.|Los marcadores del discurso guían al oyente por la estructura argumentativa.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Signposting improves processing of long turns.|La señalización mejora el procesamiento de turnos largos.]]", "[[Markers add no information.|Los marcadores no añaden información.]]", "[[Arguments need no structure.|Los argumentos no necesitan estructura.]]"],
          correctAnswer: 0,
          explanation: "Metadiscourse.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r12",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Translation is rarely word-for-word because connotation diverges across languages.|La traducción rara vez es palabra por palabra porque la connotación diverge entre lenguas.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Equivalence is often pragmatic, not lexical.|La equivalencia suele ser pragmática, no léxica.]]", "[[Every word maps one-to-one.|Cada palabra tiene un equivalente único.]]", "[[Connotation is identical globally.|La connotación es idéntica en todo el mundo.]]"],
          correctAnswer: 0,
          explanation: "Translation pragmatics.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r13",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Silence can function as a strategic reply in institutional settings.|El silencio puede funcionar como respuesta estratégica en contextos institucionales.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Withholding a response can be meaningful.|Retener la respuesta puede ser significativo.]]", "[[Silence always means agreement.|El silencio siempre significa acuerdo.]]", "[[Institutions ignore non-verbal cues.|Las instituciones ignoran las pistas no verbales.]]"],
          correctAnswer: 0,
          explanation: "Non-verbal pragmatics.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r14",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Framing chooses which aspect of an issue becomes salient.|El encuadre (framing) elige qué aspecto de un asunto se vuelve prominente.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Salience is partly linguistic packaging.|La prominencia depende en parte del empaquetado lingüístico.]]", "[[Frames never affect opinions.|Los marcos nunca influyen en las opiniones.]]", "[[All issues are equally salient always.|Todos los asuntos son siempre igual de prominentes.]]"],
          correctAnswer: 0,
          explanation: "Media / cognitive framing.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r15",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Academic English favours nominalisation to pack information densely.|El inglés académico favorece la nominalización para condensar información.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Nouns can bundle processes into compact phrases.|Los sustantivos pueden empaquetar procesos en frases compactas.]]", "[[Verbs are banned in journals.|Los verbos están prohibidos en revistas.]]", "[[Nominalisation always clarifies.|La nominalización siempre aclara.]]"],
          correctAnswer: 0,
          explanation: "Information density.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r16",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Irony depends on shared background; otherwise it misfires.|La ironía depende del conocimiento compartido; si no, fracasa (misfire).]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Common ground enables layered interpretation.|El terreno común permite interpretación en capas.]]", "[[Irony works without context.|La ironía funciona sin contexto.]]", "[[Hearers always detect irony.|Los oyentes siempre detectan la ironía.]]"],
          correctAnswer: 0,
          explanation: "Pragmatic presupposition.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r17",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Standard language ideologies often mask class and regional bias.|Las ideologías de la lengua estándar a menudo enmascaran sesgos de clase y región.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Prestige norms can stigmatise legitimate varieties.|Las normas de prestigio pueden estigmatizar variedades legítimas.]]", "[[All dialects have equal prestige everywhere.|Todos los dialectos tienen igual prestigio en todas partes.]]", "[[Standard equals morally superior.|Lo estándar es moralmente superior.]]"],
          correctAnswer: 0,
          explanation: "Sociolinguistic critique.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-r18",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "language-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Language and Communication|Lenguaje y comunicación]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Digital genres remix spoken and written norms in hybrid registers.|Los géneros digitales mezclan normas orales y escritas en registros híbridos.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[New media blur traditional channel boundaries.|Los nuevos medios difuminan fronteras canónicas.]]", "[[Online text is identical to letters.|El texto en línea es idéntico a las cartas.]]", "[[Registers never change.|Los registros nunca cambian.]]"],
          correctAnswer: 0,
          explanation: "Mediated communication.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u2-l1",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Speaker:|Voz / Hablante:]] \"[[Clarity beats cleverness when stakes are high.|La claridad vence a la ingeniosidad cuando las apuestas son altas.]]\"\n\n[[The speaker stresses that:|La voz enfatiza que:]]",
          options: ["[[prioritising intelligibility under pressure|priorizar la inteligibilidad bajo presión]]", "[[using obscure jargon|usar jerga oscura]]", "[[avoiding all structure|evitar toda estructura]]"],
          correctAnswer: 0,
          explanation: "Pragmatic priority.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l2",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Lecturer:|Profesor/a (clase magistral):]] \"[[Inversion after negative adverbs flags emphasis, not random word order.|La inversión tras adverbios negativos marca énfasis, no un orden azaroso.]]\"\n\n[[Main claim:|Tesis principal:]]",
          options: ["[[stylistic highlighting of the adverb|resaltar el adverbio con fines estilísticos]]", "[[a grammar mistake always|siempre un error gramatical]]", "[[obsolete in modern English|obsoleto en inglés moderno]]"],
          correctAnswer: 0,
          explanation: "Rhetorical grammar.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l3",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Interviewer:|Entrevistador/a:]] \"[[We calibrate formality to audience without losing precision.|Calibramos la formalidad al público sin perder precisión.]]\"\n\n[[The interviewee implies:|El entrevistado insinúa que:]]",
          options: ["[[register sensitivity|sensibilidad al registro]]", "[[maximum slang always|máximo argot siempre]]", "[[ignoring the audience|ignorar al público]]"],
          correctAnswer: 0,
          explanation: "Audience design.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l4",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Coach:|Coach:]] \"[[Name the communicative goal before choosing the surface form.|Pon nombre al objetivo comunicativo antes de elegir la forma superficial.]]\"\n\n[[The advice focuses on:|El consejo se centra en:]]",
          options: ["[[goal-first planning|planificación primero el objetivo]]", "[[random word choice|elección aleatoria de palabras]]", "[[avoiding intent altogether|evitar la intención por completo]]"],
          correctAnswer: 0,
          explanation: "Strategic competence.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l5",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Podcast host:|Presentador/a del podcast:]] \"[[Politeness is not dishonesty; it is relational work.|La cortesía no es deshonestidad; es trabajo relacional.]]\"\n\n[[The distinction drawn is:|La distinción trazada es:]]",
          options: ["[[managing social rapport|gestionar la afinidad social]]", "[[always lying|mentir siempre]]", "[[irrelevant in workplaces|irrelevante en el trabajo]]"],
          correctAnswer: 0,
          explanation: "Relational pragmatics.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l6",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Therapist:|Terapeuta:]] \"[[Code-switching can signal solidarity or distance in the same meeting.|El cambio de código puede señalar solidaridad o distancia en la misma reunión.]]\"\n\n[[Therapeutic aim:|Objetivo terapéutico:]]",
          options: ["[[contextual indexing of relationships|indexación contextual de relaciones]]", "[[random bilingual noise|ruido bilingüe aleatorio]]", "[[proof of incompetence|prueba de incompetencia]]"],
          correctAnswer: 0,
          explanation: "Interactional meaning.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l7",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Debate:|Debate:]] \"[[If evidence is thin, hedge; if it is strong, still avoid absolutes in reviews.|Si la evidencia es escasa, matiza; si es sólida, evita aun así los absolutos en revisiones.]]\"\n\n[[Speaker suggests:|El hablante sugiere que:]]",
          options: ["[[calibrated epistemic stance|postura epistémica calibrada]]", "[[total certainty always|certeza total siempre]]", "[[never using verbs|nunca usar verbos]]"],
          correctAnswer: 0,
          explanation: "Academic stance.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l8",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Seminar leader:|Moderador/a del seminario:]] \"[[Corpus frequency should inform teaching examples, not replace judgement.|La frecuencia en corpus debe informar los ejemplos pedagógicos, no sustituir el juicio.]]\"\n\n[[Pedagogical point:|Punto pedagógico:]]",
          options: ["[[data-informed but teacher-mediated selection|selección basada en datos pero mediada por el docente]]", "[[ignore corpora entirely|ignorar los corpus por completo]]", "[[only rare words matter|solo importan palabras raras]]"],
          correctAnswer: 0,
          explanation: "Applied linguistics.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l9",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Radio:|Radio:]] \"[[Listeners repair misunderstanding faster when speakers flag topic shifts.|Los oyentes reparan malentendidos antes si los hablantes señalan cambios de tema.]]\"\n\n[[Explanation offered:|Explicación ofrecida:]]",
          options: ["[[explicit discourse signalling|señalización explícita del discurso]]", "[[never changing topics|nunca cambiar de tema]]", "[[avoiding all markers|evitar todo marcador]]"],
          correctAnswer: 0,
          explanation: "Conversation management.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l10",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Workshop:|Taller:]] \"[[Nominalisation is a tool, not a moral duty; clarity still matters.|La nominalización es una herramienta, no un deber moral; la claridad sigue importando.]]\"\n\n[[Key takeaway:|Idea clave:]]",
          options: ["[[balance density with reader processing|equilibrar densidad y procesamiento del lector]]", "[[nominalise every verb always|nominalizar siempre cada verbo]]", "[[ban all nouns|prohibir todos los sustantivos]]"],
          correctAnswer: 0,
          explanation: "Style as choice.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l11",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Lecture:|Conferencia:]] \"[[Translation loss is routine; compensate with pragmatic equivalence.|La pérdida en traducción es habitual; compénsala con equivalencia pragmática.]]\"\n\n[[Implication:|Implicación:]]",
          options: ["[[aim for functional fit, not literal match|buscar adecuación funcional, no literal]]", "[[copy word-for-word always|copiar palabra por palabra siempre]]", "[[ignore the target culture|ignorar la cultura meta]]"],
          correctAnswer: 0,
          explanation: "Translation strategy.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l12",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Clip:|Extracto de audio:]] \"[[Irony misfires when common ground is missing.|La ironía fracasa cuando falta terreno común.]]\"\n\n[[Mechanism described:|Mecanismo descrito:]]",
          options: ["[[shared knowledge is a prerequisite|el conocimiento compartido es un requisito]]", "[[irony needs no context|la ironía no necesita contexto]]", "[[everyone always gets jokes|todo el mundo siempre entiende los chistes]]"],
          correctAnswer: 0,
          explanation: "Pragmatic failure.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l13",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Interview:|Entrevista:]] \"[[Digital punctuation carries tone; omitting it can sound brusque.|La puntuación digital transmite tono; omitirla puede sonar brusco.]]\"\n\n[[Core idea:|Idea central:]]",
          options: ["[[graphical cues shape interpersonal reading|las pistas gráficas moldean la lectura interpersonal]]", "[[punctuation is meaningless online|la puntuación no significa nada en línea]]", "[[only elders use commas|solo los mayores usan comas]]"],
          correctAnswer: 0,
          explanation: "Computer-mediated communication.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l14",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Panel:|Mesa redonda:]] \"[[Standard language ideologies erase legitimate variation.|Las ideologías de la lengua estándar borran variación legítima.]]\"\n\n[[Effect highlighted:|Efecto destacado:]]",
          options: ["[[stigmatised varieties may be fully systematic|las variedades estigmatizadas pueden ser plenamente sistemáticas]]", "[[only one dialect is logical|solo un dialecto es lógico]]", "[[variation equals error|variación = error]]"],
          correctAnswer: 0,
          explanation: "Sociolinguistic equity.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l15",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Talk:|Charla:]] \"[[So striking was the shift that reviewers demanded a new framework.|Tan llamativo fue el cambio que los revisores exigieron un nuevo marco.]]\"\n\n[[Condition emphasised:|Condición enfatizada:]]",
          options: ["[[inversion emphasising magnitude of change|inversión que enfatiza la magnitud del cambio]]", "[[no change occurred|no hubo cambio]]", "[[frameworks are forbidden|los marcos están prohibidos]]"],
          correctAnswer: 0,
          explanation: "Tie-in to inversion + rhetoric.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l16",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Discussion:|Debate grupal:]] \"[[Framing \"costs\" versus \"investments\" steers budget debates.|Enmarcar «costes» frente a «inversiones» orienta los debates presupuestarios.]]\"\n\n[[Nuanced position:|Postura matizada:]]",
          options: ["[[lexical framing steers problem definition|el encuadre léxico orienta la definición del problema]]", "[[words never matter in policy|las palabras nunca importan en políticas]]", "[[budgets are purely numerical|los presupuestos son solo números]]"],
          correctAnswer: 0,
          explanation: "Critical discourse.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l17",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Summary:|Resumen:]] \"[[Bilingual children separate grammars early; mixing is often principled.|Los niños bilingües separan gramáticas pronto; la mezcla suele ser principiada.]]\"\n\n[[Point summarised:|Idea resumida:]]",
          options: ["[[systematic code-mixing rules|reglas sistemáticas de mezcla]]", "[[random confusion always|confusión aleatoria siempre]]", "[[one grammar always wins instantly|una gramática siempre gana al instante]]"],
          correctAnswer: 0,
          explanation: "Bilingual acquisition.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-l18",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "language-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Language in Use|Lenguaje en uso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Speaker:|Voz / Hablante:]] \"[[Not until we read the appendix did the ambiguity resolve.|No fue hasta leer el anexo cuando se resolvió la ambigüedad.]]\"\n\n[[Listener should infer:|El oyente debe inferir:]]",
          options: ["[[delayed clarification via later information|aclaración tardía mediante información posterior]]", "[[appendices are useless|los anexos no sirven]]", "[[ambiguity never resolves|la ambigüedad nunca se resuelve]]"],
          correctAnswer: 0,
          explanation: "Information structure + inversion echo.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u2-w1",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Title: \"Global English homogenises thought worldwide.\" Choose the strongest C1 opening that hedges and narrows the claim.",
          options: ["[[While the spread of English undoubtedly facilitates certain kinds of coordination, the claim that it flattens cognition globally oversimplifies multilingual practices and local reinterpretation.|Matiz + foco en prácticas multilingües]]", "[[English is bad.|demasiado simple]]", "[[This essay is about English.|demasiado vago]]"],
          correctAnswer: 0,
          explanation: "Hedged thesis aligned to prompt.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w2",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which sentence best links two contrasted views on prescriptivism?",
          options: ["[[Prescriptive traditions stabilise classroom norms; descriptive evidence, however, shows resilient innovation in everyday usage.|contraste con *however*]]", "[[Prescriptivism and descriptivism are things.|sin desarrollo]]", "[[Both are wrong.|sin argumentación]]"],
          correctAnswer: 0,
          explanation: "Contrast + connector.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w3",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Pick the most precise academic conclusion on register and power.",
          options: ["[[The analysis suggests that access to prestigious registers can gatekeep institutional participation even when intelligibility is high.|acceso a registros prestigiosos]]", "[[Power is bad.|vago]]", "[[Register does not exist.|falso]]"],
          correctAnswer: 0,
          explanation: "Dense neutral register.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w4",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the best thesis for a problem-solution text on misinformation.",
          options: ["[[Although platform design accelerates sharing, labelling alone is insufficient; complementary media literacy and transparent ranking criteria may reduce harm without stifling speech.|problema + mitigaciones]]", "[[Fake news is fake.|tautología]]", "[[Social media exists.|irrelevante]]"],
          correctAnswer: 0,
          explanation: "Problem-solution sophistication.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w5",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which sentence avoids overstated certainty about bilingual advantage?",
          options: ["[[The meta-analytic evidence tentatively supports selective cognitive benefits, though effect sizes vary by task and population.|tentatively supports]]", "[[Bilinguals are always smarter.|absoluto]]", "[[There is no research.|falso]]"],
          correctAnswer: 0,
          explanation: "Hedging meta-analysis.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w6",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the cohesive paragraph on pragmatic failure.",
          options: ["[[First, misfires arise when felicity conditions fail. Second, repair sequences redistribute blame subtly. Therefore, teaching should model both recognition and redress.|First / Second / Therefore]]", "[[Stuff fails. People talk. Done.|sin cohesión]]", "[[Pragmatics is fun.|vago]]"],
          correctAnswer: 0,
          explanation: "Signposted reasoning.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w7",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose appropriate register for a formal complaint about unclear policy language.",
          options: ["[[The undersigned respectfully request clarification of clause 4.2, whose scope appears underspecified for non-specialist staff.|formal]]", "[[Hey, fix your words lol.|informal]]", "[[Or else.|amenaza]]"],
          correctAnswer: 0,
          explanation: "Formal request.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w8",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which reformulation acknowledges Grice without plagiarism?",
          options: ["[[Grice (1975) argued that speakers conventionally cooperate; listeners therefore infer unstated meanings when quality and relation maxims are ostensibly flouted.|atribución + paráfrasis]]", "[[Grice said cooperate.|demasiado fino]]", "[[Copy-paste Grice.|plagio]]"],
          correctAnswer: 0,
          explanation: "Citation + paraphrase.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w9",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Best topic sentence for a paragraph on face-threatening acts?",
          options: ["[[Even ostensibly neutral requests can threaten negative face when they impinge on autonomy, which explains why mitigation strategies proliferate in institutional email.|tema claro]]", "[[Email exists.|irrelevante]]", "[[Face is a body part.|literal incorrecto]]"],
          correctAnswer: 0,
          explanation: "Focused analytical topic sentence.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w10",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the sentence with effective parallel structure.",
          options: ["[[The study coded directness, coded mitigation and coded relational work across 400 threads.|paralelismo *coded*]]", "[[The study coded directness, mitigating and relational.|roto]]", "[[Coding happened.|vago]]"],
          correctAnswer: 0,
          explanation: "Parallelism.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w11",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which transition links theory paragraph to critique?",
          options: ["[[Notwithstanding its elegance, the cooperation principle understates asymmetrical power in gatekept forums.|Notwithstanding + crítica]]", "[[Anyway.|informal]]", "[[Next.|sin conexión]]"],
          correctAnswer: 0,
          explanation: "Formal counterpoint.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w12",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the best definition-style sentence for *implicature*.",
          options: ["[[Implicature denotes inferred meaning beyond what is strictly said, licensed by contextual assumptions and cooperative expectations.|definición académica]]", "[[Implicature is a typo.|absurdo]]", "[[Implicature means shouting.|falso]]"],
          correctAnswer: 0,
          explanation: "Formal definition.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w13",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Pick the most natural academic collocation.",
          options: ["[[The findings partially corroborate earlier corpus-based accounts of spoken grammar.|*partially corroborate*]]", "[[The findings fully destroy all science.|incoherente]]", "[[Findings do things.|vago]]"],
          correctAnswer: 0,
          explanation: "Colligation.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w14",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which closing moves to implications for syllabus design?",
          options: ["[[These results imply that explicit register awareness tasks could complement traditional grammar drills in advanced EAP courses.|implicación pedagógica]]", "[[In conclusion, grammar exists.|vago]]", "[[The end.|corto]]"],
          correctAnswer: 0,
          explanation: "Implications.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w15",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the best hedged critique of a qualitative study.",
          options: ["[[The thick description is rich, yet the sampling frame limits generalisation beyond similar urban contexts.|crítica matizada]]", "[[Qualitative research is useless.|grosero]]", "[[The study is perfect.|sin crítica]]"],
          correctAnswer: 0,
          explanation: "Measured critique.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w16",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the sentence that operationalises *register* for readers.",
          options: ["[[For present purposes, we operationalise register as lexico-grammatical choices indexed to situational variables of field, tenor and mode.|operacionalización]]", "[[Register means whatever.|vago]]", "[[Register is slang.|incorrecto]]"],
          correctAnswer: 0,
          explanation: "Term work.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w17",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which option shows appropriate citation framing?",
          options: ["[[As Searle (1969) argued, speech acts bundle propositional content with illocutionary force.|marco de cita]]", "[[Searle said stuff.|vago]]", "[[According to me, Searle is wrong always.|sin evidencia]]"],
          correctAnswer: 0,
          explanation: "Attribution.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u2-w18",
    type: 'writing',
    level: 'C1',
    topic: "argumentative-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — language|Escritura académica — lenguaje]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose varied syntax for rhetorical effect.",
          options: ["[[The stakes are high; the evidence, nonetheless, remains partial: policy should therefore proceed cautiously.|punto y coma + dos puntos]]", "[[The stakes are high and evidence is partial and policy should proceed.|todo y… y…]]", "[[High partial proceed.|telegráfico]]"],
          correctAnswer: 0,
          explanation: "Syntactic variety.",
        },
      ],
    },
    topicName: "Writing",
  },
];
