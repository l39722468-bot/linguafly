/**
 * C1 Unit 5 — Arts and Culture
 * Módulo 1 (bloque temático): Persona, sociedad y entorno
 * Grammar: Narrative tenses; nominalisation
 *
 * Modelo ampliado: 18 ejercicios por lección × 5 lecciones = 90 ítems.
 * Patrón de IDs: c1-u5-g1..g18, v1..v18, r1..r18, l1..l18, w1..w18.
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = '[[Arts and Culture|Arte y cultura]]';

export const UNIT_5_EXERCISES: Exercise[] = [
{
    id: "c1-u5-g1",
    type: 'multiple-choice',
    level: 'C1',
    topic: "narrative-tenses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "By the time the exhibition opened to the public, the curators _______ on the final labels for weeks.",
          options: ["[[had been working|habían estado trabajando]]", "[[have been working|han estado trabajando]]", "[[worked|trabajaron]]"],
          correctAnswer: 0,
          explanation: "Past perfect continuous before a past time reference.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g2",
    type: 'fill-blank',
    level: 'C1',
    topic: "narrative-tenses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "When the director shouted 'Cut!', the extras _______ _______ in the rain for nearly an hour.",
          options: ["[[had been standing|habían estado de pie]]", "[[stood|estuvieron]]", "[[stand|están]]"],
          correctAnswer: "had been standing",
          acceptableAnswers: ["had been standing"],
          explanation: "Duration up to a past point: *had been + -ing*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g3",
    type: 'multiple-choice',
    level: 'C1',
    topic: "narrative-tenses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "She _______ the score only after the committee had approved the commission.",
          options: ["[[accepted|aceptó]]", "[[accepts|acepta]]", "[[will accept|aceptará]]"],
          correctAnswer: 0,
          explanation: "Past simple after past perfect in the subordinate clause.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g4",
    type: 'fill-blank',
    level: 'C1',
    topic: "narrative-tenses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "The concert hall _______ _______ renovated when the acoustic survey began.",
          options: ["[[was being|estaba siendo]]", "[[was been|incorrecto]]", "[[is being|tiempo incorrecto]]"],
          correctAnswer: "was being",
          acceptableAnswers: ["was being"],
          explanation: "Passive past continuous: *was being + past participle*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g5",
    type: 'multiple-choice',
    level: 'C1',
    topic: "narrative-tenses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "We _______ the overture when the conductor collapsed on the podium.",
          options: ["[[had just heard|acabábamos de oír / past perfect + just]]", "[[heard|oímos / sin matiz de inmediatez]]", "[[have just heard|presente perfecto — choque temporal con «collapsed»]]"],
          correctAnswer: 0,
          explanation: "*Had just + past participle* for a very recent past before another past event.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g6",
    type: 'fill-blank',
    level: 'C1',
    topic: "narrative-tenses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "The biennale _______ _______ record attendance figures until travel restrictions hit.",
          options: ["[[had been posting|había estado registrando]]", "[[posted|registró]]", "[[posts|registra]]"],
          correctAnswer: "had been posting",
          acceptableAnswers: ["had been posting"],
          explanation: "Past perfect continuous for a trend up to a later past disruption.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g7",
    type: 'multiple-choice',
    level: 'C1',
    topic: "narrative-tenses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Which sentence uses the historic present for critical immediacy?",
          options: ["[[In her review, the critic walks the reader through each room as if the show were still open.|presente histórico]]", "[[In her review, the critic walked the reader…|pasado simple plano]]", "[[In her review, the critic has walked…|presente perfecto]]"],
          correctAnswer: 0,
          explanation: "Historic present in arts reviewing.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g8",
    type: 'fill-blank',
    level: 'C1',
    topic: "narrative-tenses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "The trustees _______ _______ to announce the shortlist when the leak went viral.",
          options: ["[[were about|estaban a punto]]", "[[are about|están a punto]]", "[[had about|incorrecto]]"],
          correctAnswer: "were about",
          acceptableAnswers: ["were about"],
          explanation: "*Were about to* = imminent past intention.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g9",
    type: 'multiple-choice',
    level: 'C1',
    topic: "narrative-tenses",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "No sooner _______ the portrait been hung than the museum issued a statement.",
          options: ["[[had|had]]", "[[has|has]]", "[[was|was]]"],
          correctAnswer: 0,
          explanation: "*No sooner had + past participle … than*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g10",
    type: 'multiple-choice',
    level: 'C1',
    topic: "nominalisation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "They decided to relocate the collection. → The _______ of the collection proved deeply controversial.",
          options: ["[[relocation|reubicación]]", "[[relocating|forma -ing]]", "[[relocated|participio]]"],
          correctAnswer: 0,
          explanation: "Abstract noun: *relocation*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g11",
    type: 'fill-blank',
    level: 'C1',
    topic: "nominalisation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "The _______ _______ the loan should be extended split the board.",
          options: ["[[proposal|propuesta]]", "[[proposing|proponiendo]]", "[[proposed|propuesto]]"],
          correctAnswer: "proposal that",
          acceptableAnswers: ["proposal that"],
          explanation: "Nominalisation + that-clause.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g12",
    type: 'multiple-choice',
    level: 'C1',
    topic: "nominalisation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Which is the most formal rewrite?",
          options: ["[[The implementation of the policy attracted criticism.|sustantivos abstractos]]", "[[They implemented the policy and people criticised it.|cláusulas verbales]]", "[[Implementing happened.|vago]]"],
          correctAnswer: 0,
          explanation: "Nominalisation raises register in academic arts writing.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g13",
    type: 'fill-blank',
    level: 'C1',
    topic: "nominalisation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "The _______ _______ government grants forced the festival to programme fewer premieres.",
          options: ["[[withdrawal of|retirada de]]", "[[withdrawing of|forma incorrecta]]", "[[withdrawn from|participio incorrecto]]"],
          correctAnswer: "withdrawal of",
          acceptableAnswers: ["withdrawal of"],
          explanation: "*Withdrawal of* + noun phrase.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g14",
    type: 'multiple-choice',
    level: 'C1',
    topic: "nominalisation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "The artist's _______ to engage with the brief puzzled the selectors.",
          options: ["[[refusal|negativa / rechazo]]", "[[refusing|forma -ing]]", "[[refused|participio]]"],
          correctAnswer: 0,
          explanation: "*Refusal to + infinitive*.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g15",
    type: 'fill-blank',
    level: 'C1',
    topic: "nominalisation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "Their _______ of audience demographics informed the marketing campaign.",
          options: ["[[analysis|análisis]]", "[[analysing|analizando]]", "[[analysed|analizado]]"],
          correctAnswer: "analysis",
          acceptableAnswers: ["analysis"],
          explanation: "*Analysis of* + noun.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g16",
    type: 'multiple-choice',
    level: 'C1',
    topic: "nominalisation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "Public _______ of the casting choices dominated social media within hours.",
          options: ["[[criticism|crítica]]", "[[criticising|forma -ing]]", "[[criticised|participio]]"],
          correctAnswer: 0,
          explanation: "*Criticism of* + noun.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g17",
    type: 'fill-blank',
    level: 'C1',
    topic: "nominalisation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Complete with the correct structure.|Completa con la estructura correcta.]]",
      questions: [
        {
          question: "There was widespread _______ _______ the acquisition had been rushed through ethics review.",
          options: ["[[concern that|preocupación de que]]", "[[concerned that|preocupado de que]]", "[[concerning that|incorrecto]]"],
          correctAnswer: "concern that",
          acceptableAnswers: ["concern that"],
          explanation: "*Concern that* + clause.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-g18",
    type: 'multiple-choice',
    level: 'C1',
    topic: "nominalisation",
    difficulty: 'hard',
    content: {
      title: "[[Grammar|Gramática]]: [[Narrative Tenses & Nominalisation|Tiempos narrativos y nominalización]]",
      instructions: "[[Choose the best answer.|Elige la mejor respuesta.]]",
      questions: [
        {
          question: "The museum's _______ to digitise fragile negatives will take a decade.",
          options: ["[[commitment|compromiso]]", "[[committing|forma -ing]]", "[[committed|participio]]"],
          correctAnswer: 0,
          explanation: "*Commitment to* + noun/-ing.",
        },
      ],
    },
    topicName: "Grammar",
  },
{
    id: "c1-u5-v1",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The director's latest film is a _______ — a guaranteed box-office hit with franchise potential.",
          options: ["[[blockbuster|taquillazo]]", "[[bookbinder|encuadernador]]", "[[bottleneck|cuello de botella]]"],
          correctAnswer: 0,
          explanation: "*Blockbuster*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v2",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The choreographer's _______ blends street dance with classical technique.",
          options: ["[[choreography|coreografía]]", "[[choreograph|verbo]]", "[[choral|coral]]"],
          correctAnswer: 0,
          explanation: "*Choreography*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v3",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The novel's _______ — what is left unsaid between the lines — unsettles complacent readers.",
          options: ["[[subtext|subtexto]]", "[[subtitle|subtítulo]]", "[[subtotal|subtotal]]"],
          correctAnswer: 0,
          explanation: "*Subtext*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v4",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The museum's _______ choices — which works to acquire and how to display them — shape public debate.",
          options: ["[[curatorial|curatoriales]]", "[[curious|curiosas]]", "[[curatorially|adv.]]"],
          correctAnswer: 0,
          explanation: "*Curatorial*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v5",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The painter's entire _______ — spanning five decades — will tour three continents.",
          options: ["[[oeuvre|obra / corpus]]", "[[overture|obertura]]", "[[ovation|ovación]]"],
          correctAnswer: 0,
          explanation: "*Oeuvre*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v6",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ movement rejected bourgeois taste in favour of radical experiment.",
          options: ["[[avant-garde|vanguardia]]", "[[rear-guard|retaguardia]]", "[[average|promedio]]"],
          correctAnswer: 0,
          explanation: "*Avant-garde*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v7",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The gallery's summer show is a _______ of the sculptor's early work.",
          options: ["[[retrospective|retrospectiva]]", "[[prospective|prospectiva]]", "[[respective|respectiva]]"],
          correctAnswer: 0,
          explanation: "*Retrospective*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v8",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ of Renaissance princes made possible the careers of artists from Donatello to Titian.",
          options: ["[[patronage|mecenazgo]]", "[[parentage|ascendencia]]", "[[passage|pasaje]]"],
          correctAnswer: 0,
          explanation: "*Patronage*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v9",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ installation filled the turbine hall with suspended LED strips.",
          options: ["[[site-specific|in situ / específica del lugar]]", "[[site-sight|falso]]", "[[cite-specific|falso]]"],
          correctAnswer: 0,
          explanation: "*Site-specific*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v10",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "Film _______ — lighting, lens choice, palette — carries as much meaning as dialogue.",
          options: ["[[cinematography|cinematografía]]", "[[cinematograph|aparato antiguo]]", "[[cinema-only|no es término]]"],
          correctAnswer: 0,
          explanation: "*Cinematography*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v11",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The opera's _______ was adapted from a novella critics had dismissed as unfilmable.",
          options: ["[[libretto|libreto]]", "[[library|biblioteca]]", "[[liberal|liberal]]"],
          correctAnswer: 0,
          explanation: "*Libretto*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v12",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ of the painting — dark figures emerging from deep shadow — is unmistakably Caravaggesque.",
          options: ["[[chiaroscuro|claroscuro]]", "[[crescendo|crescendo]]", "[[chromosome|cromosoma]]"],
          correctAnswer: 0,
          explanation: "*Chiaroscuro*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v13",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The theatre's _______ arch frames the stage like a painting.",
          options: ["[[proscenium|proscenio]]", "[[protein|proteína]]", "[[prosperity|prosperidad]]"],
          correctAnswer: 0,
          explanation: "*Proscenium*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v14",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The orchestra's _______ this season leans heavily on late Romantic composers.",
          options: ["[[repertoire|repertorio]]", "[[repetition|repetición]]", "[[reportoire|error ortográfico]]"],
          correctAnswer: 0,
          explanation: "*Repertoire*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v15",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The Venice _______ attracts curators and collectors from every continent.",
          options: ["[[Biennale|Bienal]]", "[[Biannual|bianual]]", "[[Binocular|binocular]]"],
          correctAnswer: 0,
          explanation: "*Biennale*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v16",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The composer's _______ for percussion alone challenges conventional concert form.",
          options: ["[[composition|composición]]", "[[competition|competición]]", "[[compositioning|no existe]]"],
          correctAnswer: 0,
          explanation: "*Composition*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v17",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The _______ of colonial-era bronzes has become a diplomatic flashpoint.",
          options: ["[[restitution|restitución]]", "[[restoration|restauración]]", "[[retribution|retribución]]"],
          correctAnswer: 0,
          explanation: "*Restitution* (of artefacts).",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-v18",
    type: 'multiple-choice',
    level: 'C1',
    topic: "arts-vocabulary",
    difficulty: 'hard',
    content: {
      title: "[[Vocabulary|Vocabulario]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Choose the word or phrase that best completes the sentence.|Elige la palabra o frase que mejor completa la oración.]]",
      questions: [
        {
          question: "The play's _______ — how scenes are ordered and juxtaposed — delays the revelation until the final minute.",
          options: ["[[dramaturgy|dramaturgia]]", "[[dramatic|dramático]]", "[[drama-only|no]]"],
          correctAnswer: 0,
          explanation: "*Dramaturgy*.",
        },
      ],
    },
    topicName: "Vocabulary",
  },
{
    id: "c1-u5-r1",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[The museum is not a neutral container; display choices silently argue for certain histories.|El museo no es un contenedor neutral; las decisiones de montaje argumentan en silencio por ciertas historias.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Curation is an implicit narrative act.|La curación es un acto narrativo implícito.]]", "[[Objects speak entirely for themselves.|Los objetos hablan del todo solos.]]", "[[Wall colour is purely decorative.|El color de las paredes es puramente decorativo.]]"],
          correctAnswer: 0,
          explanation: "Curatorial narrative.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r2",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Restitution debates expose how acquisition and cataloguing once served empire more than communities of origin.|Los debates sobre restitución revelan cómo la adquisición y la catalogación sirvieron a menudo más al imperio que a las comunidades de origen.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Provenance research can unsettle institutional self-images.|La investigación de procedencias puede desestabilizar la autoimagen institucional.]]", "[[Catalogues are always neutral.|Los catálogos son siempre neutrales.]]", "[[Empire is irrelevant to museums today.|El imperio es irrelevante hoy en los museos.]]"],
          correctAnswer: 0,
          explanation: "Colonial collections.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r3",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Digital reproduction cannot capture surface texture, yet it democratises access on an unprecedented scale.|La reproducción digital no capta la textura superficial, pero democratiza el acceso a una escala sin precedentes.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Access and aura trade off in complex ways.|El acceso y el aura se compensan de formas complejas.]]", "[[JPEGs replace originals.|Los JPEG sustituyen los originales.]]", "[[Texture is irrelevant to meaning.|La textura es irrelevante para el significado.]]"],
          correctAnswer: 0,
          explanation: "Digital art.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r4",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Copyright law lags behind remix cultures that treat sampling as creative dialogue rather than theft.|La ley de propiedad intelectual va a la zaga de culturas del remix que tratan el sampleo como diálogo creativo más que como robo.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Legal categories strain against collaborative aesthetics.|Las categorías legales se tensan frente a estéticas colaborativas.]]", "[[Remix is always illegal.|El remix es siempre ilegal.]]", "[[Copyright never changes.|El copyright nunca cambia.]]"],
          correctAnswer: 0,
          explanation: "IP and creativity.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r5",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Public funding cuts push orchestras toward corporate sponsorship with strings attached.|Los recortes de financiación pública empujan a las orquestas hacia patrocinio corporativo con condiciones.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Sponsorship can quietly shape repertoire.|El patrocinio puede moldear en silencio el repertorio.]]", "[[Money never influences programming.|El dinero nunca influye en la programación.]]", "[[Orchestras need no subsidies.|Las orquestas no necesitan subvenciones.]]"],
          correctAnswer: 0,
          explanation: "Arts funding.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r6",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Censorship rarely announces itself; it often arrives as risk management or brand protection.|La censura raramente se anuncia; a menudo llega como gestión de riesgo o protección de marca.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Soft censorship can operate through insurance clauses.|La censura blanda puede operar vía cláusulas de seguro.]]", "[[Censorship is always state-run.|La censura es siempre estatal.]]", "[[Brands never affect art.|Las marcas nunca afectan al arte.]]"],
          correctAnswer: 0,
          explanation: "Self-censorship.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r7",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Biennials have been criticised as jet-set circuits that reproduce global hierarchies of visibility.|Las bienales se han criticado como circuitos jet-set que reproducen jerarquías globales de visibilidad.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Geopolitics of attention matter as much as aesthetics.|La geopolítica de la atención importa tanto como la estética.]]", "[[Biennials erase inequality.|Las bienales borran la desigualdad.]]", "[[Visibility is fairly distributed.|La visibilidad se reparte con equidad.]]"],
          correctAnswer: 0,
          explanation: "Art world geography.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r8",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Audience development is not marketing gloss; it can reshape who feels entitled to interpretive authority.|El desarrollo de audiencias no es maquillaje de marketing; puede replantear quién se siente legitimado para interpretar.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Participation policies alter power in the auditorium.|Las políticas de participación alteran el poder en la sala.]]", "[[Marketing only sells tickets.|El marketing solo vende entradas.]]", "[[Authority is fixed forever.|La autoridad está fijada para siempre.]]"],
          correctAnswer: 0,
          explanation: "Inclusive programming.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r9",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Adaptation across media is translation, not transcription; losses and gains are inevitable.|La adaptación entre medios es traducción, no transcripción; las pérdidas y ganancias son inevitables.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Medium-specific affordances reshape narrative pacing.|Las posibilidades propias de cada medio remodelan el ritmo narrativo.]]", "[[Films copy novels verbatim.|El cine copia las novelas al pie de la letra.]]", "[[Fidelity is a simple metric.|La fidelidad es una métrica simple.]]"],
          correctAnswer: 0,
          explanation: "Adaptation theory.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r10",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Heritage listing can freeze buildings in picturesque decay while residents need modern services.|La catalogación patrimonial puede congelar edificios en un deterioro pintoresco mientras los residentes necesitan servicios modernos.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Conservation ethics collide with housing justice.|La ética de conservación choca con la justicia habitacional.]]", "[[Listing always improves lives.|La catalogación siempre mejora vidas.]]", "[[Decay is always authentic.|El deterioro es siempre auténtico.]]"],
          correctAnswer: 0,
          explanation: "Built heritage.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r11",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Performance art blurs the line between artwork and labour contract when bodies are the medium.|El arte de performance difumina la frontera entre obra y contrato laboral cuando el cuerpo es el medio.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Duration and risk raise welfare questions.|La duración y el riesgo plantean cuestiones de bienestar.]]", "[[Performance is never exhausting.|La performance nunca es agotadora.]]", "[[Bodies are neutral tools.|Los cuerpos son herramientas neutrales.]]"],
          correctAnswer: 0,
          explanation: "Performance ethics.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r12",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Literary prizes amplify careers but also concentrate prestige in ways small presses cannot match.|Los premios literarios amplifican carreras pero también concentran prestigio de modos que las editoriales pequeñas no pueden igualar.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Gatekeeping effects extend beyond the shortlist.|Los efectos de control de acceso van más allá de la lista final.]]", "[[Prizes never distort sales.|Los premios nunca distorsionan ventas.]]", "[[Small presses outsell conglomerates.|Las pequeñas editoriales venden más que los conglomerados.]]"],
          correctAnswer: 0,
          explanation: "Prize culture.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r13",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Sound design in theatre can steer empathy before a single line is spoken.|El diseño sonoro en teatro puede dirigir la empatía antes de que se diga una sola línea.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Atmosphere pre-frames moral judgement.|La atmósfera preenmarca el juicio moral.]]", "[[Sound is decorative only.|El sonido es solo decorativo.]]", "[[Dialogue never matters.|El diálogo nunca importa.]]"],
          correctAnswer: 0,
          explanation: "Theatre sound.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r14",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Decolonising curricula is slower than swapping syllabi; it means reallocating interpretive labour.|Descolonizar los planes de estudio es más lento que cambiar el temario; implica redistribuir el trabajo interpretativo.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Institutional inertia outlasts manifesto moments.|La inercia institucional sobrevive a los manifiestos.]]", "[[Syllabus swaps suffice alone.|Bastaría cambiar el temario.]]", "[[Labour is irrelevant to reading lists.|El trabajo es irrelevante en las lecturas.]]"],
          correctAnswer: 0,
          explanation: "Curriculum politics.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r15",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Archival gaps silence marginalised voices as surely as overt bans.|Las lagunas de archivo silencian voces marginadas tan seguramente como las prohibiciones explícitas.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Absence of record is also a curatorial decision.|La ausencia de registro es también decisión curatorial.]]", "[[Archives are complete by default.|Los archivos están completos por defecto.]]", "[[Gaps are random only.|Las lagunas son solo aleatorias.]]"],
          correctAnswer: 0,
          explanation: "Archive theory.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r16",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Populist politicians often attack experimental art as elitist while subsidising stadium spectacles.|Los políticos populistas a menudo atacan el arte experimental como elitista mientras subvencionan espectáculos en estadios.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Definitions of \"the people\" are culturally selective.|Las definiciones de «el pueblo» son culturalmente selectivas.]]", "[[Experimental art has no public.|El arte experimental no tiene público.]]", "[[Stadiums are never subsidised.|Los estadios nunca se subvencionan.]]"],
          correctAnswer: 0,
          explanation: "Culture wars.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r17",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Craft revival movements risk aestheticising manual labour without improving wages.|Los movimientos de revival artesanal arriesgan estetizar el trabajo manual sin mejorar salarios.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Heritage branding can obscure supply chains.|El branding patrimonial puede ocultar cadenas de suministro.]]", "[[Craft always pays fairly.|La artesanía siempre paga bien.]]", "[[Wages follow aesthetics.|Los salarios siguen a la estética.]]"],
          correctAnswer: 0,
          explanation: "Craft economies.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-r18",
    type: 'reading-comprehension',
    level: 'C1',
    topic: "arts-reading",
    difficulty: 'hard',
    content: {
      title: "[[Reading|Lectura]]: [[Arts and Culture|Arte y cultura]]",
      instructions: "[[Read the extract and choose the best answer.|Lee el extracto y elige la mejor respuesta.]]",
      questions: [
        {
          question: "[[Text:|Texto:]] \"[[Translation is collaboration; the translator's voice is never fully effaced.|La traducción es colaboración; la voz del traductor nunca se borra del todo.]]\"\n\n[[According to the extract:|Según el extracto:]]",
          options: ["[[Footnotes can stage interpretive disagreement.|Las notas a pie pueden mostrar el desacuerdo interpretativo.]]", "[[Translators are invisible robots.|Los traductores son robots invisibles.]]", "[[Meaning transfers without loss.|El significado se transfiere sin pérdida.]]"],
          correctAnswer: 0,
          explanation: "Translation studies.",
        },
      ],
    },
    topicName: "Reading",
  },
{
    id: "c1-u5-l1",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Speaker:|Voz / Hablante:]] \"[[Blockbuster openings are choreographed events; marketing spend can exceed production budgets.|Los estrenos taquillazos son eventos coreografiados; el gasto de marketing puede superar los presupuestos de producción.]]\"\n\n[[The speaker stresses that:|La voz enfatiza que:]]",
          options: ["[[release strategy shapes reception before critics publish|la estrategia de estreno moldea la recepción antes de los críticos]]", "[[budgets are irrelevant to hits|los presupuestos no importan para el éxito]]", "[[critics control opening weekend|los críticos controlan el primer fin de semana]]"],
          correctAnswer: 0,
          explanation: "Film marketing.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l2",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Lecturer:|Profesor/a (clase magistral):]] \"[[The conductor's beat is a micro-grammar; orchestras read anticipation in a raised eyebrow.|El gesto del director es una microgramática; las orquestas leen la anticipación en una ceja levantada.]]\"\n\n[[Main claim:|Tesis principal:]]",
          options: ["[[non-verbal cues coordinate ensemble timing|señales no verbales coordinan el tiempo del conjunto]]", "[[scores leave no room for gesture|las partituras no dejan lugar al gesto]]", "[[tempo is purely mechanical|el tempo es puramente mecánico]]"],
          correctAnswer: 0,
          explanation: "Orchestral gesture.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l3",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Interviewer:|Entrevistador/a:]] \"[[Venue acoustics can flatter mediocre playing and punish precision in the same programme.|La acústica de la sala puede embellecer un mediocre y castigar la precisión en el mismo programa.]]\"\n\n[[The interviewee implies:|El entrevistado insinúa que:]]",
          options: ["[[room response interacts with repertoire choices|la respuesta de la sala interactúa con el repertorio]]", "[[acoustics are identical everywhere|la acústica es idéntica en todas partes]]", "[[precision always wins|la precisión siempre gana]]"],
          correctAnswer: 0,
          explanation: "Concert halls.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l4",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Coach:|Coach:]] \"[[Streaming royalties rarely sustain mid-list musicians without touring or sync licences.|Las regalías del streaming rara vez sostienen a músicos de media lista sin gira ni licencias de sincronización.]]\"\n\n[[The advice focuses on:|El consejo se centra en:]]",
          options: ["[[platform economics concentrate upside at the top|la economía de plataformas concentra las ganancias arriba]]", "[[streaming pays fairly by default|el streaming paga bien por defecto]]", "[[touring is obsolete|la gira está obsoleta]]"],
          correctAnswer: 0,
          explanation: "Music economics.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l5",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Podcast host:|Presentador/a del podcast:]] \"[[Curatorial wall texts can invite dialogue or shut it down with authoritative closure.|Los textos de sala pueden invitar al diálogo o cerrarlo con autoridad.]]\"\n\n[[The distinction drawn is:|La distinción trazada es:]]",
          options: ["[[tone of address shapes visitor agency|el tono moldea la agencia del visitante]]", "[[labels are neutral captions|las etiquetas son leyendas neutras]]", "[[visitors never read walls|los visitantes nunca leen muros]]"],
          correctAnswer: 0,
          explanation: "Interpretation.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l6",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Therapist:|Terapeuta:]] \"[[Festival programming balances risk-taking with sponsor expectations in uneasy equilibrium.|La programación de festivales equilibra el riesgo con las expectativas de patrocinadores en tensión.]]\"\n\n[[Therapeutic aim:|Objetivo terapéutico:]]",
          options: ["[[artistic risk meets brand safety concerns|el riesgo artístico choca con la «seguridad de marca»]]", "[[sponsors never influence art|los patrocinadores nunca influyen]]", "[[festivals avoid controversy|los festivales evitan la controversia]]"],
          correctAnswer: 0,
          explanation: "Festival politics.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l7",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Debate:|Debate:]] \"[[Restorers sometimes uncover pentimenti — earlier compositions ghosts beneath the visible paint.|Los restauradores a veces descubren pentimenti — composiciones previas fantasma bajo la pintura visible.]]\"\n\n[[Speaker suggests:|El hablante sugiere que:]]",
          options: ["[[technical imaging revises art-historical narratives|la imagen técnica revisa relatos historiográficos]]", "[[finished works never change|las obras acabadas nunca cambian]]", "[[pentimenti are always forgeries|los pentimenti son siempre falsificaciones]]"],
          correctAnswer: 0,
          explanation: "Conservation science.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l8",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Seminar leader:|Moderador/a del seminario:]] \"[[Dance notation systems capture sequence more easily than the quality of weight shift.|Los sistemas de notación de la danza captan la secuencia más fácilmente que la calidad del cambio de peso.]]\"\n\n[[Pedagogical point:|Punto pedagógico:]]",
          options: ["[[kinetic nuance resists full inscription|el matiz cinético resiste la inscripción total]]", "[[notation replaces rehearsal|la notación sustituye el ensayo]]", "[[weight is irrelevant to dance|el peso es irrelevante]]"],
          correctAnswer: 0,
          explanation: "Dance documentation.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l9",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Radio:|Radio:]] \"[[Public sculpture courts controversy when commemoration clashes with revised civic values.|La escultura pública genera controversia cuando la conmemoración choca con valores cívicos revisados.]]\"\n\n[[Explanation offered:|Explicación ofrecida:]]",
          options: ["[[monuments are ongoing negotiations|los monumentos son negociaciones en curso]]", "[[bronze is politically neutral|el bronce es políticamente neutro]]", "[[removal erases history|retirar borra la historia]]"],
          correctAnswer: 0,
          explanation: "Monuments.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l10",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Workshop:|Taller:]] \"[[Opera surtitles speed comprehension but can flatten poetic compression in the libretto.|Los sobretítulos aceleran la comprensión pero pueden aplanar la compresión poética del libreto.]]\"\n\n[[Key takeaway:|Idea clave:]]",
          options: ["[[translation pace trades off against poetic density|el ritmo de traducción compensa con la densidad poética]]", "[[surtitles never affect reception|los sobretítulos no afectan la recepción]]", "[[libretti are prose only|los libretos son solo prosa]]"],
          correctAnswer: 0,
          explanation: "Opera translation.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l11",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Lecture:|Conferencia:]] \"[[Photography's indexical tie to reality was philosophically contested long before digital manipulation.|El vínculo indexical de la fotografía con la realidad se disputó filosóficamente mucho antes del retoque digital.]]\"\n\n[[Implication:|Implicación:]]",
          options: ["[[truth claims in photography were never innocent|las pretensiones de verdad nunca fueron ingenuas]]", "[[photos simply mirror the world|las fotos reflejan el mundo sin más]]", "[[digital tools invented fakery|las herramientas digitales inventaron el engaño]]"],
          correctAnswer: 0,
          explanation: "Photo theory.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l12",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Clip:|Extracto de audio:]] \"[[Community theatre projects can empower participants yet risk extractive storytelling if exit strategies fail.|Los proyectos de teatro comunitario pueden empoderar pero arriesgan relatos extractivos si fallan las salidas.]]\"\n\n[[Mechanism described:|Mecanismo descrito:]]",
          options: ["[[ethical partnerships need shared editorial control|las alianzas éticas requieren control editorial compartido]]", "[[community art is automatically ethical|el arte comunitario es automáticamente ético]]", "[[participants never narrate|los participantes nunca narran]]"],
          correctAnswer: 0,
          explanation: "Participatory art.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l13",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Interview:|Entrevista:]] \"[[Art-school tuition debt shapes who can afford to work in precarious studio economies.|La deuda por matrícula de bellas artes moldea quién puede permitirse trabajar en economías de estudio precarias.]]\"\n\n[[Core idea:|Idea central:]]",
          options: ["[[financialisation of training filters aesthetic futures|la financiarización del training filtra futuros estéticos]]", "[[tuition never affects careers|la matrícula nunca afecta carreras]]", "[[studios are always profitable|los estudios siempre son rentables]]"],
          correctAnswer: 0,
          explanation: "Art education.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l14",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Panel:|Mesa redonda:]] \"[[NFT hype conflated certificate scarcity with aesthetic value in ways critics found analytically sloppy.|El furor NFT confundió la escasez del certificado con el valor estético de modos que los críticos vieron analíticamente flojos.]]\"\n\n[[Effect highlighted:|Efecto destacado:]]",
          options: ["[[token mechanics decouple from artistic merit|la mecánica de tokens se desacopla del mérito artístico]]", "[[NFTs proved intrinsic worth|los NFT demostraron valor intrínseco]]", "[[scarcity equals quality|la escasez equivale a calidad]]"],
          correctAnswer: 0,
          explanation: "Digital markets.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l15",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Talk:|Charla:]] \"[[Repertory theatres rotate casts across roles; institutional memory lives in stage management as much as stars.|Los teatros de repertorio rotan el reparto; la memoria institucional vive en dirección de escena tanto como en estrellas.]]\"\n\n[[Condition emphasised:|Condición enfatizada:]]",
          options: ["[[ensemble labour sustains continuity beyond celebrity|el trabajo de conjunto sostiene continuidad más allá del celebrity]]", "[[stars alone preserve theatre|solo las estrellas preservan el teatro]]", "[[repertory means random shows|repertorio significa obras aleatorias]]"],
          correctAnswer: 0,
          explanation: "Repertory theatre.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l16",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Discussion:|Debate grupal:]] \"[[Literary festivals platform authors but also amplify moderators who become tastemakers in their own right.|Los festivales literarios dan plataforma a autores pero también amplifican a moderadores que se convierten en prescriptores.]]\"\n\n[[Nuanced position:|Postura matizada:]]",
          options: ["[[secondary voices shape canonisation indirectly|voces secundarias moldean la canonización]]", "[[moderators are invisible|los moderadores son invisibles]]", "[[authors speak without mediation|los autores hablan sin mediación]]"],
          correctAnswer: 0,
          explanation: "Festival mediation.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l17",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Summary:|Resumen:]] \"[[Choreographers increasingly collaborate with scientists on biomechanics and injury prevention.|Los coreógrafos colaboran cada vez más con científicos en biomecánica y prevención de lesiones.]]\"\n\n[[Point summarised:|Idea resumida:]]",
          options: ["[[cross-disciplinary research reshapes training norms|la investigación interdisciplinar remodela la formación]]", "[[dance ignores physiology|la danza ignora la fisiología]]", "[[science replaces artistry|la ciencia sustituye el arte]]"],
          correctAnswer: 0,
          explanation: "Dance science.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-l18",
    type: 'listening-comprehension',
    level: 'C1',
    topic: "arts-listening",
    difficulty: 'hard',
    content: {
      title: "[[Listening|Comprensión auditiva]]: [[Arts in discourse|Las artes en el discurso]]",
      instructions: "[[Listen to the extract (read the script if no audio) and answer.|Escucha el extracto (lee el guión si no hay audio) y responde.]]",
      questions: [
        {
          question: "[[Speaker:|Voz / Hablante:]] \"[[Heritage lottery funds can democratise access yet also entrench competitive bidding between towns.|Los fondos de lotería patrimonial pueden democratizar el acceso pero también fijar licitaciones competitivas entre pueblos.]]\"\n\n[[Listener should infer:|El oyente debe inferir:]]",
          options: ["[[grant mechanisms redistribute visibility unevenly|los mecanismos de subvención redistribuyen la visibilidad]]", "[[lottery funds erase inequality|las loterías borran desigualdad]]", "[[towns never compete|los pueblos nunca compiten]]"],
          correctAnswer: 0,
          explanation: "Heritage funding.",
        },
      ],
    },
    topicName: "Listening",
  },
{
    id: "c1-u5-w1",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Opening for a review of a controversial biennial: choose the most appropriately hedged thesis.",
          options: ["[[While the biennial's global reach is impressive, its selection logic still concentrates visibility among a narrow circle of galleries already dominant in art-fair circuits.|Matiz + crítica]]", "[[Biennials are bad.|binario]]", "[[This review is about art.|vago]]"],
          correctAnswer: 0,
          explanation: "Hedged review opening.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w2",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which sentence best links formal analysis with institutional context?",
          options: ["[[The matte varnish catches gallery light in ways that amplify texture, yet the museum's sponsorship deal with a fossil-fuel major sits uneasily beside the work's ecological themes.|forma + contexto]]", "[[The painting is blue.|descriptivo plano]]", "[[Museums are buildings.|irrelevante]]"],
          correctAnswer: 0,
          explanation: "Formal–institutional bridge.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w3",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Pick the most precise closing sentence on restitution claims.",
          options: ["[[In sum, legal title and ethical legitimacy diverge here: restitution may be morally urgent even where acquisition was technically lawful at the time.|cierre jurídico–ético]]", "[[Give the bronzes back now.|imperativo]]", "[[Colonies were bad.|tautología]]"],
          correctAnswer: 0,
          explanation: "Measured close.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w4",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Best topic sentence for a paragraph on orchestral labour disputes?",
          options: ["[[Beyond pay, musicians are contesting scheduling practices that erode preparation time and accelerate injury risk.|tema claro]]", "[[Orchestras play music.|trivial]]", "[[Strikes happen.|vago]]"],
          correctAnswer: 0,
          explanation: "Labour focus.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w5",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which option avoids overstated certainty about a single audience survey?",
          options: ["[[These self-reported attendance figures are suggestive but should be triangulated with box-office data before inferring demographic shifts.|hedging metodológico]]", "[[The survey proves everything.|absoluto]]", "[[We have no data.|falso]]"],
          correctAnswer: 0,
          explanation: "Survey caution.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w6",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the cohesive paragraph contrasting authorial intent with reader response criticism.",
          options: ["[[If intentionalist readings anchor meaning in biography, reception-oriented approaches distribute interpretive authority across communities of readers; neither framework fully dissolves the other.|contraste matizado]]", "[[Critics disagree.|sin desarrollo]]", "[[Books exist.|irrelevante]]"],
          correctAnswer: 0,
          explanation: "Critical schools.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w7",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Appropriate register for a funding application to a national arts council?",
          options: ["[[The undersigned organisation respectfully requests bridge funding to tour the production described in Annex B, pending the outcome of matched municipal support.|formal]]", "[[Hey fund us please lol.|informal]]", "[[Money now.|orden]]"],
          correctAnswer: 0,
          explanation: "Grant register.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w8",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which reformulation acknowledges Barthes without plagiarism?",
          options: ["[[Barthes (1967) famously questioned whether the author should remain the central interpretive anchor in literary criticism.|atribución]]", "[[Barthes said death stuff.|vago]]", "[[According to Barthes, authors died literally.|falso]]"],
          correctAnswer: 0,
          explanation: "Theory citation.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w9",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Best sentence to introduce limitations after describing a digital humanities corpus?",
          options: ["[[OCR errors and uneven metadata quality across decades mean frequency counts should be read as indicative rather than exhaustive.|límites explícitos]]", "[[The corpus is perfect.|sin límites]]", "[[DH solves literature.|hype]]"],
          correctAnswer: 0,
          explanation: "DH caveats.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w10",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the sentence with effective parallel structure in a catalogue essay.",
          options: ["[[The series reframes exile as separation from language, from kin and from legal personhood — losses that compound rather than cancel one another.|paralelismo]]", "[[The series is about exile and things.|plano]]", "[[Exile is bad and sad.|vago]]"],
          correctAnswer: 0,
          explanation: "Parallel catalogue prose.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w11",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which transition links a plot-summary paragraph to a thematic paragraph on adaptation?",
          options: ["[[Beyond narrative fidelity, the film's most consequential shift lies in how point-of-view shots redistribute moral sympathy.|más allá de la trama]]", "[[Anyway.|informal]]", "[[Next paragraph.|mecánico]]"],
          correctAnswer: 0,
          explanation: "Thematic pivot.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w12",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose the best definition-style sentence for *dramaturgy* in theatre studies.",
          options: ["[[Dramaturgy denotes the compositional logic of a staged work — how scenes are ordered, paced and juxtaposed to produce meaning.|definición]]", "[[Dramaturgy means drama.|circular]]", "[[Dramaturgy is only acting.|estrecho]]"],
          correctAnswer: 0,
          explanation: "Term definition.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w13",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Most natural academic collocation in an abstract for a museum-studies paper?",
          options: ["[[We trace how decolonising initiatives reshaped acquisition policies and interpretive practice across three national collections.|collocaciones]]", "[[We talk about museums doing stuff.|informal]]", "[[Museums have things.|vago]]"],
          correctAnswer: 0,
          explanation: "Abstract tone.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w14",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which closing sentence points to policy implications after discussing streaming royalties?",
          options: ["[[These findings imply that collective bargaining frameworks for recording musicians may need updating before platform dominance further erodes baseline session fees.|implicación]]", "[[Streaming exists.|trivial]]", "[[The end.|corto]]"],
          correctAnswer: 0,
          explanation: "Policy implication.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w15",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose a hedged critique of a blockbuster exhibition that relies on spectacle.",
          options: ["[[The show is visually arresting, yet its reliance on immersive spectacle risks reducing complex histories to selfie backdrops.|crítica matizada]]", "[[Spectacle is always worthless.|binario]]", "[[The exhibition is perfect.|sin crítica]]"],
          correctAnswer: 0,
          explanation: "Exhibition critique.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w16",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Select the sentence that operationalises *cultural capital* for empirical readers.",
          options: ["[[For operational purposes, we proxy parental cultural capital with concert attendance and home library size in the longitudinal cohort.|operacionalización]]", "[[Cultural capital means money.|reductivo]]", "[[Bourdieu was French.|irrelevante]]"],
          correctAnswer: 0,
          explanation: "Concept work.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w17",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Which option frames citations appropriately in a literature review on censorship?",
          options: ["[[As Müller (2016) synthesised, Cold-War-era self-censorship often operated through anticipatory alignment with imagined censors rather than explicit bans.|marco de síntesis]]", "[[Censorship was bad.|vago]]", "[[According to me, books rule.|subjetivo]]"],
          correctAnswer: 0,
          explanation: "Literature synthesis.",
        },
      ],
    },
    topicName: "Writing",
  },
{
    id: "c1-u5-w18",
    type: 'writing',
    level: 'C1',
    topic: "arts-essay",
    difficulty: 'hard',
    content: {
      title: "[[Writing|Escritura]]: [[Academic writing — arts|Escritura académica — artes]]",
      instructions: "[[Choose the most effective option for C1-level writing.|Elige la opción más efectiva para un texto de nivel C1.]]",
      questions: [
        {
          question: "Choose varied syntax for rhetorical effect in a discussion of monument removal.",
          options: ["[[Bronze is not neutral; neither is placement: where a statue stands shapes whose sacrifice counts as grievable.|punto y coma + dos puntos]]", "[[Bronze is not neutral and placement matters and grief counts.|planos]]", "[[Statues stand.|telegráfico]]"],
          correctAnswer: 0,
          explanation: "Syntactic variety.",
        },
      ],
    },
    topicName: "Writing",
  },
];
