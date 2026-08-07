/**
 * C1 Unit 10 — Philosophy, Ethics and the Future
 * Módulo 1 (bloque temático): Persona, sociedad y entorno
 * Grammar: Distancing language; impersonal constructions; advanced clefts
 *
 * Modelo ampliado: 18 ejercicios por lección × 5 lecciones = 90 ítems.
 * Patrón de IDs: c1-u10-g1..g18, v1..v18, r1..r18, l1..l18, w1..w18.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = '[[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]';

export const UNIT_10_EXERCISES: Exercise[] = [
{
    id: "c1-u10-g1",
    type: 'multiple-choice',
    level: 'C1',
    topic: "distancing-language",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "The white paper _______ _______ _______ drafted by the ethics committee months before the vote.",
          options: ["[[is said to have been|se dice que ha sido]]", "[[is said having been|forma incorrecta]]", "[[said to have been|falta auxiliar]]"],
          correctAnswer: 0,
          explanation: "*Is said to have been + V3*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g2",
    type: 'fill-blank',
    level: 'C1',
    topic: "distancing-language",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "It _______ _______ the dataset was scraped without meaningful consent.",
          options: ["[[is alleged|se alega]]", "[[is alleging|tiempo incorrecto]]", "[[alleged is|orden incorrecto]]"],
          correctAnswer: "is alleged",
          acceptableAnswers: ["is alleged"],
          explanation: "*It is alleged that…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g3",
    type: 'multiple-choice',
    level: 'C1',
    topic: "distancing-language",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Reviewers _______ _______ _______ warned that the safety case assumed stationary deployment conditions.",
          options: ["[[are reported to have been|se informa que han sido]]", "[[are reported having been|incorrecto]]", "[[reported to have been|falta be]]"],
          correctAnswer: 0,
          explanation: "*Are reported to have been*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g4",
    type: 'fill-blank',
    level: 'C1',
    topic: "distancing-language",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "The whistle-blower _______ _______ _______ pressured to withdraw findings on model drift.",
          options: ["[[is believed to have been|se cree que ha sido]]", "[[is believe to have been|forma incorrecta]]", "[[believed to have been|falta auxiliar]]"],
          correctAnswer: "is believed to have been",
          acceptableAnswers: ["is believed to have been"],
          explanation: "*Believed to have been*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g5",
    type: 'multiple-choice',
    level: 'C1',
    topic: "distancing-language",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ conscious experience arises in frontier language models has not been settled empirically.",
          options: ["[[Whether|Si / si es cierto que]]", "[[That|That]]", "[[If|If no como sujeto estándar]]"],
          correctAnswer: 0,
          explanation: "*Whether* as subject clause.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g6",
    type: 'fill-blank',
    level: 'C1',
    topic: "distancing-language",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "The chair _______ _______ _______ asked to disclose conflicts of interest before the panel voted.",
          options: ["[[is said to have been|se dice que ha sido]]", "[[is said having been|incorrecto]]", "[[said to have been|falta be]]"],
          correctAnswer: "is said to have been",
          acceptableAnswers: ["is said to have been"],
          explanation: "*Said to have been*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g7",
    type: 'multiple-choice',
    level: 'C1',
    topic: "impersonal-constructions",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "There _______ _______ _______ be deep unease about delegating lethal choices to opaque systems.",
          options: ["[[is thought to|se cree que]]", "[[are thought to|concordancia incorrecta]]", "[[is thinking to|forma incorrecta]]"],
          correctAnswer: 0,
          explanation: "*There is thought to be*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g8",
    type: 'fill-blank',
    level: 'C1',
    topic: "impersonal-constructions",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "There _______ _______ _______ little agreement on how to weight future persons in present budgets.",
          options: ["[[appears to be|parece haber]]", "[[appear to be|concordancia incorrecta]]", "[[is appearing to be|incorrecto]]"],
          correctAnswer: "appears to be",
          acceptableAnswers: ["appears to be"],
          explanation: "*There appears to be*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g9",
    type: 'multiple-choice',
    level: 'C1',
    topic: "impersonal-constructions",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "There _______ _______ _______ mounting concern that benchmarks gamify the wrong capabilities.",
          options: ["[[is said to be|se dice que hay]]", "[[are said to be|concordancia incorrecta]]", "[[is said being|incorrecto]]"],
          correctAnswer: 0,
          explanation: "*There is said to be*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g10",
    type: 'fill-blank',
    level: 'C1',
    topic: "impersonal-constructions",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "_______ _______ _______ understood that the firm rolled back the policy after the ethics audit.",
          options: ["[[It is widely|se ampliamente]]", "[[It widely is|orden incorrecto]]", "[[There is widely|incorrecto]]"],
          correctAnswer: "It is widely",
          acceptableAnswers: ["It is widely"],
          explanation: "*It is widely understood that…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g11",
    type: 'multiple-choice',
    level: 'C1',
    topic: "impersonal-constructions",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ hasty to claim that scaling alone dissolves the alignment problem.",
          options: ["[[It may be|puede que sea]]", "[[There may be|estructura distinta]]", "[[It may being|incorrecto]]"],
          correctAnswer: 0,
          explanation: "*It may be that…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g12",
    type: 'fill-blank',
    level: 'C1',
    topic: "impersonal-constructions",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "_______ _______ _______ suggested that humane evaluation suites lag behind competitive frontier races.",
          options: ["[[It has been|se ha]]", "[[It have been|concordancia incorrecta]]", "[[There has been|estructura distinta]]"],
          correctAnswer: "It has been",
          acceptableAnswers: ["It has been"],
          explanation: "*It has been suggested that…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g13",
    type: 'multiple-choice',
    level: 'C1',
    topic: "advanced-cleft",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ regulators need from ethicists is testable criteria, not slogan battles.",
          options: ["[[What|Lo que]]", "[[That|That]]", "[[Which|Which]]"],
          correctAnswer: 0,
          explanation: "*What regulators need is…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g14",
    type: 'fill-blank',
    level: 'C1',
    topic: "advanced-cleft",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "_______ _______ the committee challenged was the lack of appeal rights, not the safety goal itself.",
          options: ["[[What was|Qué fue lo que]]", "[[Which was|referente incorrecto]]", "[[That was|incorrecto]]"],
          correctAnswer: "What was",
          acceptableAnswers: ["What was"],
          explanation: "*What X was* cleft.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g15",
    type: 'multiple-choice',
    level: 'C1',
    topic: "advanced-cleft",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ was a partisan leak that derailed sober negotiation on liability caps.",
          options: ["[[It|Fue]]", "[[What|What]]", "[[There|There]]"],
          correctAnswer: 0,
          explanation: "*It was X that…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g16",
    type: 'fill-blank',
    level: 'C1',
    topic: "advanced-cleft",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "_______ _______ _______ through adversarial red-teaming that the catastrophic failure mode surfaced.",
          options: ["[[It was only|solo fue]]", "[[It was just|matiz distinto]]", "[[There was only|incorrecto]]"],
          correctAnswer: "It was only",
          acceptableAnswers: ["It was only"],
          explanation: "*It was only through… that…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g17",
    type: 'multiple-choice',
    level: 'C1',
    topic: "advanced-cleft",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "_______ is difficult to ignore is that incentives shape which risks reach the public agenda first.",
          options: ["[[What|Lo que]]", "[[That|That]]", "[[It|It]]"],
          correctAnswer: 0,
          explanation: "*What is hard to deny is that…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-g18",
    type: 'fill-blank',
    level: 'C1',
    topic: "advanced-cleft",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Distancing, Impersonal & Clefts|Distanciamiento, impersonal y escindidas]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "_______ _______ not cynicism but institutional speed that made oversight cosmetic.",
          options: ["[[It was|Fue]]", "[[What was|incorrecto aquí]]", "[[There was|incorrecto]]"],
          correctAnswer: "It was",
          acceptableAnswers: ["It was"],
          explanation: "*It was not A but B that…*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u10-v1",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The essay defends _______ — the view that only outcomes matter when judging right and wrong.",
          options: ["[[consequentialism|consecuencialismo]]", "[[deontology|deontología]]", "[[existentialism|existencialismo]]"],
          correctAnswer: 0,
          explanation: "*Consequentialism*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v2",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ ethics stresses duties and rights, sometimes even when aggregate welfare would rise by breaking them.",
          options: ["[[Deontological|Deontológica]]", "[[Utilitarian|utilitarista]]", "[[Hedonistic|hedonista]]"],
          correctAnswer: 0,
          explanation: "*Deontological*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v3",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Ancient thinkers linked flourishing to cultivated character traits rather than rule memorisation — a hallmark of _______ ethics.",
          options: ["[[virtue|virtudes]]", "[[vice|vicios]]", "[[chance|azar]]"],
          correctAnswer: 0,
          explanation: "*Virtue ethics*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v4",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ _______ holds that every event, including moral choices, follows necessarily from prior states of the world.",
          options: ["[[Hard determinism|Determinismo duro]]", "[[Soft libertarianism|libertarismo blando (matiz distinto)]]", "[[Moral luck|suerte moral]]"],
          correctAnswer: 0,
          explanation: "*Hard determinism*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v5",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ tries to reconcile determinism with moral responsibility by redefining what \"could have done otherwise\" means.",
          options: ["[[Compatibilism|Compatibilismo]]", "[[Incompatibilism|incompatibilismo]]", "[[Solipsism|solipsismo]]"],
          correctAnswer: 0,
          explanation: "*Compatibilism*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v6",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Philosophers use _______ _______ to test intuitions by stripping away complicating detail.",
          options: ["[[thought experiments|experimentos mentales]]", "[[field trials|ensayos de campo]]", "[[opinion polls|encuestas de opinión]]"],
          correctAnswer: 0,
          explanation: "*Thought experiments*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v7",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ _______ names the puzzle that you cannot wrong someone who would never exist but for the risky policy you debate.",
          options: ["[[Non-identity problem|Problema de no-identidad]]", "[[Trolley problem|dilema del tranvía]]", "[[Ship of Theseus|barco de Teseo]]"],
          correctAnswer: 0,
          explanation: "*Non-identity problem*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v8",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Policy discourse on catastrophic AI risk often cites _______ _______ — convergent instrumental drives like self-preservation.",
          options: ["[[instrumental convergence|convergencia instrumental]]", "[[moral licensing|licencia moral]]", "[[virtue signalling|señalización virtuosa]]"],
          correctAnswer: 0,
          explanation: "*Instrumental convergence*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v9",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ _______ occurs when prior good deeds psychologically license later selfish or harmful choices.",
          options: ["[[Moral licensing|Licencia moral]]", "[[Moral hazard|riesgo moral (matiz distinto)]]", "[[Moral realism|realismo moral]]"],
          correctAnswer: 0,
          explanation: "*Moral licensing*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v10",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ _______ marks testimonial harm when prejudice deflates someone's credibility without epistemic grounds.",
          options: ["[[Epistemic injustice|Injusticia epistémica]]", "[[Semantic injustice|injusticia semántica (falso)]]", "[[Aesthetic injustice|injusticia estética (falso)]]"],
          correctAnswer: 0,
          explanation: "*Epistemic injustice*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v11",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ _______ names our blunt affective response to large-scale statistics compared with vivid individual stories.",
          options: ["[[Scope insensitivity|Insensibilidad al alcance]]", "[[Moral fatigue|fatiga moral]]", "[[Cognitive ease|fluidez cognitiva]]"],
          correctAnswer: 0,
          explanation: "*Scope insensitivity*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v12",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ acts are praiseworthy yet beyond strict duty, like costly heroism nobody could demand.",
          options: ["[[Supererogatory|Supererogatorios]]", "[[Obligatory|obligatorios]]", "[[Impermissible|impermitibles]]"],
          correctAnswer: 0,
          explanation: "*Supererogatory*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v13",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ _______ weighs severe but unlikely catastrophes more heavily than naive expected-value spreadsheets suggest.",
          options: ["[[Longtermism|Longtermismo]]", "[[Presentism|presentismo (matiz distinto)]]", "[[Nihilism|nihilismo]]"],
          correctAnswer: 0,
          explanation: "*Longtermism*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v14",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ _______ in finance names incentives to take extra risk when someone else bears the downside.",
          options: ["[[Moral hazard|Riesgo moral]]", "[[Moral luck|suerte moral]]", "[[Moral realism|realismo moral]]"],
          correctAnswer: 0,
          explanation: "*Moral hazard*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v15",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ _______ in AI research is the challenge of ensuring systems pursue intended goals when proxies mis-specify them.",
          options: ["[[Value alignment|Alineación de valores]]", "[[Value neutrality|neutralidad axiológica]]", "[[Value investing|inversión en valor]]"],
          correctAnswer: 0,
          explanation: "*Value alignment*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v16",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ _______ is the iterative process of adjusting principles and considered judgements until they cohere.",
          options: ["[[Reflective equilibrium|Equilibrio reflexivo]]", "[[Reflective nostalgia|nostalgia reflexiva (falso)]]", "[[Circular reasoning|razonamiento circular]]"],
          correctAnswer: 0,
          explanation: "*Reflective equilibrium*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v17",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ _______ names bias against interests based solely on species membership.",
          options: ["[[Speciesism|Especismo]]", "[[Racism|racismo]]", "[[Nationalism|nacionalismo]]"],
          correctAnswer: 0,
          explanation: "*Speciesism*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-v18",
    type: 'multiple-choice',
    level: 'C1',
    topic: "philosophy-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "_______ _______ highlights low-probability, high-impact events that could curtail humanity's potential.",
          options: ["[[Existential risk|Riesgo existencial]]", "[[Operational risk|riesgo operativo]]", "[[Credit risk|riesgo de crédito]]"],
          correctAnswer: 0,
          explanation: "*Existential risk*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u10-r1",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Free will debates rarely hinge on a single experiment; they braid phenomenology, neuroscience and legal responsibility.|Los debates sobre libre albedrío rara vez dependen de un solo experimento; entrelazan fenomenología, neurociencia y responsabilidad jurídica.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Interdisciplinary friction is constitutive, not incidental, to the puzzle.|La fricción interdisciplinar es constitutiva del enigma, no accesoria.]]", "[[Neuroscience alone settles what courts should do.|La neurociencia por sí sola zanja lo que deben hacer los tribunales.]]", "[[Phenomenology has no bearing on action guidance.|La fenomenología no influye en orientar la acción.]]"],
          correctAnswer: 0,
          explanation: "Free will.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r2",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Utilitarian calculus becomes controversial when harms are concentrated on minorities who cannot easily exit the arrangement.|El cálculo utilitarista se vuelve controvertido cuando los daños se concentran en minorías que no pueden salir fácilmente del acuerdo.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Aggregation can mask distributive injustice unless safeguards are explicit.|La agregación puede ocultar injusticia distributiva si no hay salvaguardas explícitas.]]", "[[Majority welfare always tracks each person's welfare.|El bienestar mayoritario siempre refleja el de cada persona.]]", "[[Exit options never matter morally.|Las opciones de salida nunca importan moralmente.]]"],
          correctAnswer: 0,
          explanation: "Utilitarianism.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r3",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Deontological duties can clash: telling the truth may breach a promise to protect someone from foreseeable harm.|Los deberes deontológicos pueden chocar: decir la verdad puede romper una promesa de proteger a alguien de un daño previsible.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Moral residue after choosing the lesser evil is a feature of tragic choice spaces.|El remordimiento moral tras elegir el mal menor es propio de dilemas trágicos.]]", "[[Rules never conflict in real ethics.|Las reglas nunca chocan en la ética real.]]", "[[Promises override all other duties always.|Las promesas prevalecen siempre sobre todo.]]"],
          correctAnswer: 0,
          explanation: "Deontology.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r4",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Virtue ethics shifts attention from isolated acts to character cultivated through practice and community norms.|La ética de las virtudes desplaza la atención de actos aislados al carácter cultivado mediante práctica y normas comunitarias.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Habits scaffold judgement under uncertainty better than one-off maxim memorisation.|Los hábitos sostienen el juicio bajo incertidumbre mejor que memorizar máximas sueltas.]]", "[[Character is irrelevant once outcomes are known.|El carácter es irrelevante si ya conocemos resultados.]]", "[[Communities never shape moral perception.|Las comunidades nunca moldean la percepción moral.]]"],
          correctAnswer: 0,
          explanation: "Virtue.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r5",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Thought experiments isolate variables moral intuition struggles to track when real cases arrive thick with detail.|Los experimentos mentales aíslan variables que la intuición moral cuesta seguir cuando los casos reales llegan cargados de detalle.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Stylised cases can clarify structure while risking estrangement from lived stakes.|Los casos estilizados clarifican estructura pero arriesgan alejarse de lo vivido.]]", "[[Intuitions are useless in ethics.|Las intuiciones no sirven en ética.]]", "[[Detail never distorts judgement.|El detalle nunca distorsiona el juicio.]]"],
          correctAnswer: 0,
          explanation: "Thought experiments.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r6",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Moral luck suggests praise and blame track factors agents never fully control, unsettling tidy merit narratives.|La suerte moral sugiere que elogio y culpa siguen factores que el agente no controla del todo, inquietando relatos meritocráticos limpios.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Outcome luck can diverge sharply from intention luck in how we narrate responsibility.|La suerte de resultado puede divergir de la de intención al narrar responsabilidad.]]", "[[Control is always total in mature agents.|El control es siempre total en agentes maduros.]]", "[[Narratives never affect blame.|Las narrativas nunca afectan la culpa.]]"],
          correctAnswer: 0,
          explanation: "Moral luck.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r7",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Longtermism asks whether present sacrifices for uncertain distant beneficiaries can be justified without discounting them to zero.|El longtermismo pregunta si sacrificios presentes por beneficiarios lejanos e inciertos se justifican sin descontarlos a cero.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Epistemic humility about far-future effects constrains how much to wager today.|La humildad epistémica sobre efectos lejanos limita cuánto apostar hoy.]]", "[[The distant future is always predictable enough for bold bets.|El futuro lejano siempre es lo bastante predecible para apuestas audaces.]]", "[[Discounting is never used in policy.|El descuento temporal nunca se usa en política.]]"],
          correctAnswer: 0,
          explanation: "Longtermism.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r8",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[AI alignment research treats specification gaming as a symptom of optimising the wrong proxy of the intended goal.|La investigación en alineación de IA trata el *specification gaming* como síntoma de optimizar un proxy equivocado del objetivo pretendido.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Reward hacking reveals gaps between stated objectives and deployed incentives.|El *reward hacking* revela brechas entre objetivos declarados e incentivos desplegados.]]", "[[Proxies always mirror true goals perfectly.|Los proxies siempre reflejan a la perfección los fines verdaderos.]]", "[[Misalignment never appears in benign tasks.|La desalineación nunca aparece en tareas benignas.]]"],
          correctAnswer: 0,
          explanation: "Alignment.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r9",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Explainability demands compete with performance when high-dimensional models interpolate patterns humans never named.|Las exigencias de explicabilidad compiten con el rendimiento cuando modelos de alta dimensión interpolan patrones que humanos nunca nombraron.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Post hoc narratives can soothe without genuinely tracking causal structure.|Narrativas *post hoc* pueden calmar sin seguir de verdad la estructura causal.]]", "[[Every accurate model is trivially interpretable.|Todo modelo preciso es trivialmente interpretable.]]", "[[Humans always pre-name all relevant features.|Los humanos siempre nombran de antemano todos los rasgos.]]"],
          correctAnswer: 0,
          explanation: "Explainability.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r10",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Neuroethics asks which interventions on cognition count as therapy, enhancement, or social control with different consent standards.|La neuroética pregunta qué intervenciones sobre la cognición cuentan como terapia, mejora o control social, con distintos estándares de consentimiento.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Sliding scales of risk and reversibility matter more than buzzwords alone.|Escalas de riesgo y reversibilidad importan más que eslóganes.]]", "[[Enhancement and therapy are always easy to separate.|Mejora y terapia siempre se distinguen sin esfuerzo.]]", "[[Consent is irrelevant for cognitive tools.|El consentimiento es irrelevante para herramientas cognitivas.]]"],
          correctAnswer: 0,
          explanation: "Neuroethics.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r11",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Existential risk discourse links low-probability catastrophes to institutional incentives that discount tail events.|El discurso sobre riesgo existencial vincula catástrofes de baja probabilidad con incentivos institucionales que descuentan las colas de la distribución.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Organisational silence around tails can persist even when models flag them.|El silencio organizativo sobre colas puede persistir aunque los modelos las señalen.]]", "[[Tail risks always dominate everyday budgeting.|Los riesgos de cola siempre dominan el presupuesto cotidiano.]]", "[[Institutions never ignore rare events.|Las instituciones nunca ignoran sucesos raros.]]"],
          correctAnswer: 0,
          explanation: "Existential risk.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r12",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Rights-based frameworks resist trade-offs in rhetoric yet still imply prioritisation when resources are scarce.|Los marcos basados en derechos resisten el lenguaje de compensaciones pero aun así implican priorización cuando los recursos son escasos.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Lexical ordering of rights is harder to sustain in triage than in manifestos.|Ordenar derechos léxicamente es más difícil en triaje que en manifiestos.]]", "[[Rights never conflict in practice.|Los derechos nunca chocan en la práctica.]]", "[[Scarcity is a myth in public ethics.|La escasez es un mito en ética pública.]]"],
          correctAnswer: 0,
          explanation: "Rights.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r13",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Care ethics foregrounds dependency and vulnerability rather than modelling persons solely as autonomous contractors.|La ética del cuidado pone al frente la dependencia y la vulnerabilidad en vez de modelar personas solo como contratistas autónomos.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Relational obligations can be non-voluntary yet still binding.|Las obligaciones relacionales pueden ser no voluntarias y aun así vinculantes.]]", "[[Autonomy exhausts all moral status.|La autonomía agota todo el estatus moral.]]", "[[Dependency is always temporary and trivial.|La dependencia es siempre temporal y trivial.]]"],
          correctAnswer: 0,
          explanation: "Care ethics.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r14",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Paternalism in public health balances respect for agency against harms borne by third parties from contagious choices.|El paternalismo en salud pública equilibra el respeto a la agencia con daños a terceros por decisiones contagiosas.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Externalities redraw which liberty-limiting reasons count as public-regarding.|Las externalidades redefinen qué razones limitan libertad como de interés público.]]", "[[Third-party harms never justify constraints.|Los daños a terceros nunca justifican restricciones.]]", "[[Agency means never accepting expert advice.|Agencia significa nunca aceptar consejo experto.]]"],
          correctAnswer: 0,
          explanation: "Paternalism.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r15",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Moral uncertainty recommends hedging across ethical theories when confidence in any single framework is brittle.|La incertidumbre moral aconseja cobertura (*hedging*) entre teorías éticas cuando la confianza en un solo marco es frágil.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Procedure can discipline action when credences across theories stay split.|El procedimiento puede disciplinar la acción si las credencias entre teorías siguen divididas.]]", "[[You must always pick one theory and ignore others.|Siempre hay que elegir una teoría e ignorar el resto.]]", "[[Hedging is identical to relativism.|El *hedging* es idéntico al relativismo.]]"],
          correctAnswer: 0,
          explanation: "Moral uncertainty.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r16",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Speciesism arguments ask whether drawing moral boundaries at species membership can survive consistency tests we apply elsewhere.|Los argumentos contra el especismo preguntan si trazar límites morales en la especie sobrevive pruebas de coherencia que aplicamos en otros ámbitos.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Arbitrary lines invite extension arguments unless paired with non-ad hoc criteria.|Las líneas arbitrarias invitan a extender el argumento salvo criterios no *ad hoc*.]]", "[[Species membership is always a sufficient moral reason.|Pertenecer a la especie siempre es razón moral suficiente.]]", "[[Consistency tests never apply to animals.|La coherencia nunca aplica a animales.]]"],
          correctAnswer: 0,
          explanation: "Speciesism.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r17",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Transhumanist hopes and bioconservative cautions disagree about whether human nature is a constraint or a scaffold for reform.|Las esperanzas transhumanistas y las cautelas bioconservadoras discrepan sobre si la naturaleza humana es límite o andamio para la reforma.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Default status quo bias can masquerade as metaphysical necessity.|La inercia del statu quo puede disfrazarse de necesidad metafísica.]]", "[[Nature talk never hides political interests.|Hablar de naturaleza nunca oculta intereses políticos.]]", "[[Reform never carries risk.|La reforma nunca conlleva riesgo.]]"],
          correctAnswer: 0,
          explanation: "Human nature.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-r18",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "philosophy-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Democratic legitimacy of technocratic tools requires feedback loops citizens can understand, not only aggregate efficiency gains.|La legitimidad democrática de herramientas técnicas exige circuitos de retroalimentación comprensibles, no solo ganancias agregadas de eficiencia.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Legibility of criteria shapes whether contestation remains meaningful.|La legibilidad de criterios moldea si la impugnación sigue siendo significativa.]]", "[[Efficiency alone always confers democratic mandate.|La eficiencia sola siempre otorga mandato democrático.]]", "[[Citizens never need to know scoring rules.|La ciudadanía nunca necesita conocer reglas de puntuación.]]"],
          correctAnswer: 0,
          explanation: "Legitimacy.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u10-l1",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Speaker:|Voz / Hablante:]] \"[[Consequentialists stress outcomes, yet many voters punish politicians who break procedural rules even when results improve.|Los consecuencialistas enfatizan resultados, pero muchos votantes castigan a políticos que rompen reglas procesales aunque mejoren resultados.]]\"\n\n[[The speaker stresses that:|La voz enfatiza que:]]",
          options: ["[[Procedural fairness can weigh independently of welfare tallies.|La justicia procesal puede ponderar al margen de sumas de bienestar.]]", "[[Voters only care about GDP growth.|Los votantes solo se fijan en el PIB.]]", "[[Rules never affect electoral judgement.|Las reglas nunca influyen en el voto.]]"],
          correctAnswer: 0,
          explanation: "Procedures.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l2",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Lecturer:|Profesor/a (clase magistral):]] \"[[The lecturer claims moral intuitions are culturally scaffolded, not read off a neutral inner sense.|El profesor sostiene que las intuiciones morales están andamiaje cultural, no extraídas de un sentido interno neutro.]]\"\n\n[[Main claim:|Tesis principal:]]",
          options: ["[[Enculturation shapes which cases feel salient first.|La enculturación moldea qué casos parecen salientes primero.]]", "[[Intuitions are identical worldwide.|Las intuiciones son idénticas en todo el mundo.]]", "[[Culture never touches moral emotion.|La cultura nunca toca la emoción moral.]]"],
          correctAnswer: 0,
          explanation: "Intuitions.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l3",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Interviewer:|Entrevistador/a:]] \"[[The interviewee worries that overselling AI safety timelines could erode trust when deadlines slip.|El entrevistado teme que vender en exceso plazos de seguridad de IA pueda erosionar la confianza si se incumplen.]]\"\n\n[[The interviewee implies:|El entrevistado insinúa que:]]",
          options: ["[[Credibility compounds across forecast misses.|La credibilidad se acumula o pierde con fallos de predicción.]]", "[[Missed deadlines never affect reputation.|Los retrasos nunca afectan la reputación.]]", "[[Safety timelines are always accurate.|Los plazos de seguridad siempre son exactos.]]"],
          correctAnswer: 0,
          explanation: "Trust.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l4",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Coach:|Coach:]] \"[[The coach advises separating “can we build it?” from “should we normalise it?” in team ethics reviews.|El coach aconseja separar «¿podemos construirlo?» de «¿debemos normalizarlo?» en revisiones éticas de equipo.]]\"\n\n[[The advice focuses on:|El consejo se centra en:]]",
          options: ["[[Feasibility questions differ in kind from permissibility questions.|La factibilidad es distinta en tipo de la permisibilidad.]]", "[[Engineering capacity implies moral permission.|Capacidad técnica implica permiso moral.]]", "[[Teams never confuse ability with ought.|Los equipos nunca confunden poder con deber.]]"],
          correctAnswer: 0,
          explanation: "Feasibility.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l5",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Podcast host:|Presentador/a del podcast:]] \"[[The host distinguishes instrumental convergence from malicious intent in autonomous systems.|El presentador distingue la convergencia instrumental de la intención maliciosa en sistemas autónomos.]]\"\n\n[[The distinction drawn is:|La distinción trazada es:]]",
          options: ["[[Subgoals like self-preservation can emerge without spite.|Subobjetivos como autopreservación pueden surgir sin maldad.]]", "[[Malice is required for dangerous subgoals.|La maldad es necesaria para subobjetivos peligrosos.]]", "[[Instrumental goals never arise in machines.|Los fines instrumentales nunca surgen en máquinas.]]"],
          correctAnswer: 0,
          explanation: "Convergence.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l6",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Therapist:|Terapeuta:]] \"[[The therapist notes that guilt without agency to repair can calcify into shame rather than motivation.|La terapeuta señala que la culpa sin agencia para reparar puede calcificarse en vergüenza más que en motivación.]]\"\n\n[[Therapeutic aim:|Objetivo terapéutico:]]",
          options: ["[[Actionable pathways matter for whether guilt functions ethically.|Importan vías de acción para que la culpa funcione éticamente.]]", "[[Guilt always improves behaviour automatically.|La culpa siempre mejora la conducta sola.]]", "[[Shame never overlaps with guilt.|La vergüenza nunca solapa la culpa.]]"],
          correctAnswer: 0,
          explanation: "Guilt.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l7",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Debate:|Debate:]] \"[[In the debate, one speaker argues dignity is non-tradable; another counters that triage already trades lives implicitly.|En el debate, un orador sostiene que la dignidad no es intercambiable; otro replica que el triaje ya intercambia vidas de forma implícita.]]\"\n\n[[Speaker suggests:|El hablante sugiere que:]]",
          options: ["[[Implicit trade-offs can coexist with explicit anti-commodification norms.|Las compensaciones implícitas pueden coexistir con normas anti-mercantilización.]]", "[[Triage avoids all ranking of lives.|El triaje evita cualquier jerarquía de vidas.]]", "[[Dignity talk never appears in hospitals.|Hablar de dignidad nunca aparece en hospitales.]]"],
          correctAnswer: 0,
          explanation: "Dignity.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l8",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Seminar leader:|Moderador/a del seminario:]] \"[[The seminar leader emphasises reflective equilibrium: revise principles when they clash with considered judgements.|El moderador enfatiza el equilibrio reflexivo: revisar principios cuando chocan con juicios considerados.]]\"\n\n[[Pedagogical point:|Punto pedagógico:]]",
          options: ["[[Iterative adjustment can move both theory and case intuitions.|El ajuste iterativo puede mover teoría e intuiciones de caso.]]", "[[Principles are fixed forever once chosen.|Los principios quedan fijados para siempre.]]", "[[Intuitions never conflict with theory.|Las intuiciones nunca chocan con la teoría.]]"],
          correctAnswer: 0,
          explanation: "Equilibrium.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l9",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Radio:|Radio:]] \"[[Radio commentary suggests precaution need not mean paralysis if reversible experiments are staged carefully.|El comentario radiofónico sugiere que la precaución no exige parálisis si los experimentos reversibles se escenifican con cuidado.]]\"\n\n[[Explanation offered:|Explicación ofrecida:]]",
          options: ["[[Gradualism can embody precaution without blanket bans.|El gradualismo puede encarnar precaución sin prohibiciones totales.]]", "[[Precaution always forbids novelty.|La precaución siempre prohíbe la novedad.]]", "[[Reversibility is irrelevant to ethics.|La reversibilidad es irrelevante en ética.]]"],
          correctAnswer: 0,
          explanation: "Precaution.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l10",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Workshop:|Taller:]] \"[[The workshop facilitator warns against moral licensing: past good deeds do not bank immunity for later harm.|La facilitadora advierte contra la licencia moral: las buenas acciones pasadas no depositan inmunidad para daño posterior.]]\"\n\n[[Key takeaway:|Idea clave:]]",
          options: ["[[Moral credit accounting can distort forward-looking duties.|Contabilizar crédito moral distorsiona deberes prospectivos.]]", "[[Good deeds always predict future virtue.|Las buenas obras siempre predicen virtud futura.]]", "[[Licensing effects never appear in experiments.|La licencia moral nunca aparece en experimentos.]]"],
          correctAnswer: 0,
          explanation: "Licensing.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l11",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Lecture:|Conferencia:]] \"[[The lecture ties epistemic injustice to silenced testimony in medical settings when patients are stereotyped.|La conferencia vincula la injusticia epistémica al testimonio silenciado en medicina cuando se estereotipa al paciente.]]\"\n\n[[Implication:|Implicación:]]",
          options: ["[[Credibility deficits can track identity prejudice, not accuracy.|Los déficits de credibilidad pueden seguir prejuicios de identidad, no precisión.]]", "[[Stereotypes never affect listening.|Los estereotipos nunca afectan la escucha.]]", "[[Epistemic injustice only happens in courts.|La injusticia epistémica solo ocurre en tribunales.]]"],
          correctAnswer: 0,
          explanation: "Epistemic.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l12",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Clip:|Extracto de audio:]] \"[[The clip explains how scope insensitivity makes huge numbers feel abstract until a single story anchors affect.|El clip explica cómo la insensibilidad al alcance hace que cifras enormes parezcan abstractas hasta que una historia ancla el afecto.]]\"\n\n[[Mechanism described:|Mecanismo descrito:]]",
          options: ["[[Narrative salience can correct or manipulate proportional reasoning.|El relieve narrativo puede corregir o manipular el razonamiento proporcional.]]", "[[People always grasp magnitudes intuitively.|La gente siempre capta magnitudes con intuición.]]", "[[Stories never bias charity choices.|Las historias nunca sesgan la caridad.]]"],
          correctAnswer: 0,
          explanation: "Scope.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l13",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Interview:|Entrevista:]] \"[[The interview frames supererogation: heroic acts may be praiseworthy without being morally mandatory.|La entrevista enmarca la supererogación: actos heroicos pueden ser elogiables sin ser moralmente obligatorios.]]\"\n\n[[Core idea:|Idea central:]]",
          options: ["[[The obligatory–supererogatory boundary shapes blame gradients.|El límite obligatorio–supererogatorio moldea gradientes de culpa.]]", "[[Everything praiseworthy is strictly required.|Todo lo elogiable es estrictamente obligatorio.]]", "[[Heroism never attracts ethical analysis.|El heroísmo nunca merece análisis ético.]]"],
          correctAnswer: 0,
          explanation: "Supererogation.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l14",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Panel:|Mesa redonda:]] \"[[Panelists disagree whether empathy scales to institutional design or collapses into sentimental favouritism.|Los panelistas discrepan si la empatía escala al diseño institucional o colapsa en favoritismo sentimental.]]\"\n\n[[Effect highlighted:|Efecto destacado:]]",
          options: ["[[Institutional compassion may require rules, not only feelings.|La compasión institucional puede exigir reglas, no solo emociones.]]", "[[Empathy always produces fair policy.|La empatía siempre produce políticas justas.]]", "[[Institutions never encode empathy.|Las instituciones nunca codifican empatía.]]"],
          correctAnswer: 0,
          explanation: "Empathy.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l15",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Talk:|Charla:]] \"[[The talk argues future persons have interests we can wrong today via environmental choices, even if they cannot vote now.|La charla sostiene que las personas futuras tienen intereses que hoy podemos vulnerar con decisiones ambientales, aunque aún no voten.]]\"\n\n[[Condition emphasised:|Condición enfatizada:]]",
          options: ["[[Non-identity puzzles complicate but do not erase reasons for caution.|Los puzzles de no-identidad complican pero no borran razones de cautela.]]", "[[Future people cannot be affected by present pollution.|Los futuros no pueden verse afectados por contaminación actual.]]", "[[Voting is the sole basis of moral considerability.|El voto es la única base de considerabilidad moral.]]"],
          correctAnswer: 0,
          explanation: "Future persons.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l16",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Discussion:|Debate grupal:]] \"[[Discussion turns on whether moral expertise is like medical expertise or irreducibly democratic.|El debate gira en si la pericia moral es como la médica o irreductiblemente democrática.]]\"\n\n[[Nuanced position:|Postura matizada:]]",
          options: ["[[Authority claims in ethics may need public justification unlike bedside secrets.|Las pretensiones de autoridad en ética pueden exigir justificación pública.]]", "[[Experts never disagree on moral issues.|Los expertos nunca discrepan en moral.]]", "[[Democracy excludes expert input.|La democracia excluye aportes expertos.]]"],
          correctAnswer: 0,
          explanation: "Expertise.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l17",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Summary:|Resumen:]] \"[[The summary stresses that pluralism about values need not collapse into relativism if disagreement is constrained by reasons.|El resumen enfatiza que el pluralismo axiológico no debe colapsar en relativismo si la discrepancia queda constreñida por razones.]]\"\n\n[[Point summarised:|Idea resumida:]]",
          options: ["[[Reason-giving can demarcate tolerant pluralism from anything-goes.|Dar razones puede delimitar pluralismo tolerante frente al «todo vale».]]", "[[Pluralism means no criticism is ever valid.|Pluralismo significa que ninguna crítica es válida.]]", "[[Relativism and pluralism are synonyms.|Relativismo y pluralismo son sinónimos.]]"],
          correctAnswer: 0,
          explanation: "Pluralism.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-l18",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "philosophy-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Ethics in discourse|La ética en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Speaker:|Voz / Hablante:]] \"[[The speaker closes by noting humility about the far future should pair with seriousness about irreversible thresholds today.|El hablante cierra señalando que la humildad ante el futuro lejano debe ir en pareja con seriedad ante umbrales irreversibles hoy.]]\"\n\n[[Listener should infer:|El oyente debe inferir:]]",
          options: ["[[Irreversibility shifts the burden of argument toward caution.|La irreversibilidad desplaza la carga del argumento hacia la cautela.]]", "[[Thresholds are never irreversible.|Los umbrales nunca son irreversibles.]]", "[[Humility implies ignoring present risks.|La humildad implica ignorar riesgos presentes.]]"],
          correctAnswer: 0,
          explanation: "Irreversibility.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u10-w1",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Opening for an essay on moral uncertainty: choose the most appropriately hedged thesis.",
          options: ["[[While competing ethical frameworks yield conflicting verdicts on enhancement, policy can still discipline action through procedural safeguards rather than pretending a single theory has won.|Matiz + procedimiento]]", "[[Enhancement is bad.|binario]]", "[[This essay is about science.|vago]]"],
          correctAnswer: 0,
          explanation: "Hedged thesis.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w2",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which sentence best links respect for autonomy with public-health externalities?",
          options: ["[[Mandates may protect third parties from contagious harm; nevertheless, proportionality review must track stigma, enforcement disparities and exit options for vulnerable groups.|Nevertheless / contraste]]", "[[Autonomy always wins.|falso]]", "[[Public health never limits liberty.|falso]]"],
          correctAnswer: 0,
          explanation: "Bridge.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w3",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Pick the most precise closing sentence on AI value alignment and corporate incentives.",
          options: ["[[In sum, without governance that separates evaluation metrics from profit signals, safety cultures risk becoming performative shells rather than constraints on deployment.|cierre técnico–institucional]]", "[[AI is dangerous.|informal]]", "[[Companies always align values.|absoluto]]"],
          correctAnswer: 0,
          explanation: "Close.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w4",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Best topic sentence for a paragraph on non-human animal moral status?",
          options: ["[[Criteria for moral patienthood force us to ask which capacities ground interests and whether species boundaries track those capacities or merely familiarity.|tema operativo]]", "[[Animals exist.|trivial]]", "[[Ethics is ethics.|circular]]"],
          correctAnswer: 0,
          explanation: "Topic.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w5",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which option avoids overstated certainty about a single neuroimaging study on free will?",
          options: ["[[These results are suggestive rather than decisive; replication across tasks and pre-registered analyses is essential before revising legal responsibility doctrines.|hedging]]", "[[The study proves no free will.|absoluto]]", "[[Neuroscience never informs law.|falso]]"],
          correctAnswer: 0,
          explanation: "Caution.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w6",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the cohesive paragraph contrasting deontological rhetoric with outcome-sensitive practice in hospitals.",
          options: ["[[Rights talk may dominate informed-consent scripts; nevertheless, triage protocols still embed implicit trade-offs when resources are scarce.|Nevertheless / contraste]]", "[[Hospitals are simple.|vago]]", "[[Rules never bend.|falso]]"],
          correctAnswer: 0,
          explanation: "Cohesion.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w7",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Appropriate register for a formal memo to an IRB on cognitive enhancement trials?",
          options: ["[[We respectfully recommend assessing cognitive risk, withdrawal rights and long-term follow-up before expanding eligibility beyond healthy volunteers.|formal]]", "[[Hey board, cool drugs.|informal]]", "[[Science is fun.|agresivo]]"],
          correctAnswer: 0,
          explanation: "Memo.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w8",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which reformulation cites the precautionary principle without plagiarism?",
          options: ["[[UNESCO frameworks stress that scientific uncertainty does not justify postponing cost-effective measures to prevent serious or irreversible harm.|atribución / marco]]", "[[Wait forever.|vago]]", "[[Precaution bans everything.|falso]]"],
          correctAnswer: 0,
          explanation: "Citation.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w9",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Best sentence to introduce limitations after describing a cross-cultural survey on moral foundations?",
          options: ["[[Cross-cultural instruments capture self-reports at a point in time; they cannot demonstrate that scales cause behaviour without longitudinal and behavioural designs.|límites]]", "[[Surveys prove causation.|falso]]", "[[Our sample is perfect.|sin límites]]"],
          correctAnswer: 0,
          explanation: "Caveats.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w10",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the sentence with effective parallel structure in a briefing on existential risk governance.",
          options: ["[[Clear triggers, credible monitoring and independent red teams — all three are prerequisites for trustworthy pause-and-evaluate mechanisms.|paralelismo]]", "[[Risk needs stuff.|informal]]", "[[Governance is messy.|vago]]"],
          correctAnswer: 0,
          explanation: "Parallel.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w11",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which transition moves from describing techno-optimism to discussing democratic oversight?",
          options: ["[[Notwithstanding breathless forecasts of imminent breakthroughs, legitimacy still requires contestable criteria and appeal rights for affected publics.|Notwithstanding]]", "[[Anyway.|informal]]", "[[Next.|mecánico]]"],
          correctAnswer: 0,
          explanation: "Transition.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w12",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the best definition-style sentence for *supererogation* in ethics.",
          options: ["[[Supererogation denotes acts that are praiseworthy yet beyond strict duty, such as heroic sacrifice that morality encourages but does not demand.|definición]]", "[[Supererogation means illegal acts.|estrecho]]", "[[All praise implies obligation.|falso]]"],
          correctAnswer: 0,
          explanation: "Definition.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w13",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Most natural academic collocation in an abstract for a study on algorithmic fairness audits?",
          options: ["[[We estimate disparate impact across protected groups under alternative threshold policies using pre-registered audit protocols.|collocaciones]]", "[[We did a fairness study.|informal]]", "[[Bias is bad.|vago]]"],
          correctAnswer: 0,
          explanation: "Abstract.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w14",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which closing sentence points to implementation implications after discussing moral licensing in organisations?",
          options: ["[[These findings imply that integrity programmes must pair celebration of past wins with forward-looking accountability metrics rather than moral credit balances.|implicación]]", "[[People are good.|trivial]]", "[[The end.|corto]]"],
          correctAnswer: 0,
          explanation: "Implication.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w15",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose a hedged critique of a CEO's claim that efficiency alone justifies opaque scoring systems.",
          options: ["[[Efficiency gains are real, yet opaque scores can launder value judgements about deservingness without venues for meaningful challenge.|crítica matizada]]", "[[CEOs lie.|grosero]]", "[[Efficiency ends all debate.|sin crítica]]"],
          correctAnswer: 0,
          explanation: "Critique.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w16",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the sentence that operationalises *moral patienthood* for a policy memo.",
          options: ["[[We operationalise moral patienthood using capacity-sensitive indicators of welfare interests subject to independent ethical review.|operacionalización]]", "[[Patienthood means pain.|vago]]", "[[Policies always define it perfectly.|falso]]"],
          correctAnswer: 0,
          explanation: "Operationalise.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w17",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which option frames sources appropriately in a literature review on longtermism and discounting?",
          options: ["[[As recent analytical work shows, pure exponential discounting struggles with intergenerational equity without supplementary normative premises.|marco de síntesis]]", "[[Longtermism is obvious.|vago]]", "[[According to me, discounting is wrong.|subjetivo]]"],
          correctAnswer: 0,
          explanation: "Literature.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u10-w18",
    type: 'writing',
    level: 'C1',
    topic: "ethics-writing",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — ethics|Escritura académica — ética]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose varied syntax for rhetorical effect in a discussion of paternalism and cognitive liberty.",
          options: ["[[Soft paternalism nudges; hard paternalism coerces: each demands distinct justification, transparency thresholds and review cadence.|puntuación retórica]]", "[[Paternalism is bad and freedom suffers.|planos]]", "[[States decide.|telegráfico]]"],
          correctAnswer: 0,
          explanation: "Variety.",
        },
      ],
    },
    topicName: "Writing",
  },
];
