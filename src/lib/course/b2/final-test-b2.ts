/**
 * Test final B2 — Evaluación de fin de nivel (Cambridge FCE)
 * 34 ítems ampliados: gramática (8), vocabulario (6), phrasal verbs (4),
 * lectura (6), escucha (6), escritura (4).
 * Criterio aprobado: ≥ 70% aciertos.
 * Evaluación ampliada en expresión escrita y comprensión auditiva y lectora.
 */

import { Exercise } from '@/lib/exercise-generator';

const TITLE = 'Test final B2';
const INSTRUCTIONS_GRAMMAR = 'Elige la opción correcta.';
const INSTRUCTIONS_VOCAB = 'Elige la palabra o frase correcta.';
const INSTRUCTIONS_READING = 'Lee el texto y responde.';
const INSTRUCTIONS_LISTENING = 'Escucha (o lee el texto) y responde.';
const INSTRUCTIONS_WRITING = 'Escribe tu respuesta (140-190 palabras recomendado para B2).';

const READING_TEXT = `[[I|Yo]] [[have|he]] [[been|estado]] [[working|trabajando]] [[as|como]] [[a|un]] [[senior|senior]] [[consultant|consultante]] [[for|desde hace]] [[over|más de]] [[fifteen|quince]] [[years|años]]. [[Last|El]] [[quarter|trimestre pasado]] [[I|yo]] [[was|fui]] [[sent|enviado]] [[to|a]] [[attend|asistir]] [[a|una]] [[conference|conferencia]] [[on|sobre]] [[sustainable development|desarrollo sostenible]] [[in|en]] [[Copenhagen|Copenhague]]. [[Having|Habiendo]] [[prepared|preparado]] [[my presentation|mi presentación]] [[thoroughly|a fondo]], [[I|yo]] [[was able to|pude]] [[deliver|pronunciar]] [[it|la]] [[confidently|con confianza]]. [[The|Los]] [[delegates|delegados]] [[who|que]] [[attended|asistieron]] [[were|eran]] [[from|de]] [[all over|de todo]] [[the world|el mundo]], [[and|y]] [[I|yo]] [[managed to|logré]] [[network|hacer contactos]] [[with|con]] [[several|varios]] [[potential|potenciales]] [[clients|clientes]]. [[If|Si]] [[I|yo]] [[had known|hubiera sabido]] [[how|cuán]] [[productive|productiva]] [[it would be|sería]], [[I|yo]] [[would have|habría]] [[applied for|solicitado]] [[funding|financiación]] [[earlier|antes]]. [[I|yo]] [[am looking forward to|espero con ganas]] [[presenting|presentar]] [[at|en]] [[the next|la próxima]] [[summit|cumbre]].`;

const LISTENING_TRANSCRIPT = `[[Hi|Hola]], [[I'm|soy]] [[David|David]] [[and|y]] [[I|yo]] [[have|he]] [[just|acabo de]] [[returned|regresado]] [[from|de]] [[a|un]] [[business trip|viaje de negocios]] [[to|a]] [[Singapore|Singapur]]. [[The|El]] [[conference|conferencia]] [[I|yo]] [[attended|asistí]] [[focused on|se centró en]] [[digital transformation|transformación digital]]. [[Having|Habiendo]] [[finished|terminado]] [[my keynote|mi ponencia principal]], [[I|yo]] [[was approached by|fui abordado por]] [[several|varios]] [[investors|inversores]] [[who|que]] [[were interested in|estaban interesados en]] [[our|nuestro]] [[startup|startup]]. [[If|Si]] [[I|yo]] [[had had|hubiera tenido]] [[more time|más tiempo]], [[I|yo]] [[would have|habría]] [[explored|explorado]] [[the city|la ciudad]] [[further|más]]. [[The|El]] [[report|informe]] [[I|yo]] [[submitted|presenté]] [[has been|ha sido]] [[approved|aprobado]] [[by|por]] [[the board|la junta directiva]]. [[I|yo]] [[am used to|estoy acostumbrado]] [[to|a]] [[travelling|viajar]] [[for work|por trabajo]] [[now|ahora]], [[but|pero]] [[I|yo]] [[still|todavía]] [[find it|lo encuentro]] [[exhausting|agotador]] [[at times|a veces]].`;

export const FINAL_TEST_B2_EXERCISES: Exercise[] = [
  // ─── Gramática (8) ───────────────────────────────────────────────────────
  {
    id: 'b2-final-g1',
    type: 'fill-blank',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_GRAMMAR,
      questions: [{
        question: '[[I wish|Ojalá]] [[I|yo]] ____[[more time|más tiempo]] [[when|cuando]] [[I|yo]] [[was|estaba]] [[at university|en la universidad]].',
        options: ['[[had had|hubiera tenido]]', '[[had|tenía]]', '[[have had|he tenido]]'],
        correctAnswer: 'had had',
        acceptableAnswers: ['had had'],
        explanation: '[[Wish + past perfect|Wish + pasado perfecto]] [[for past regrets|para arrepentimientos pasados]].',
      }],
    },
    topicName: 'Grammar',
  },
  {
    id: 'b2-final-g2',
    type: 'fill-blank',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_GRAMMAR,
      questions: [{
        question: '[[The project|El proyecto]] ____[[by|por]] [[the team|el equipo]] [[last month|el mes pasado]].',
        options: ['[[was completed|fue completado]]', '[[has completed|ha completado]]', '[[completed|completó]]'],
        correctAnswer: 'was completed',
        acceptableAnswers: ['was completed'],
        explanation: '[[Passive voice|Voz pasiva]]: [[past simple passive|pasado simple pasivo]].',
      }],
    },
    topicName: 'Grammar',
  },
  {
    id: 'b2-final-g3',
    type: 'multiple-choice',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_GRAMMAR,
      questions: [{
        question: '[[____|____]] [[by the scenery|por el paisaje]], [[the hikers|los excursionistas]] [[took|tomaron]] [[many photos|muchas fotos]].',
        options: ['[[Inspired|Inspirados]]', '[[Inspiring|Inspirador]]', '[[Inspire|Inspirar]]'],
        correctAnswer: 0,
        explanation: '[[Participle clause|Cláusula de participio]]: [[-ed for passive meaning|-ed para significado pasivo]].',
      }],
    },
    topicName: 'Grammar',
  },
  {
    id: 'b2-final-g4',
    type: 'fill-blank',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_GRAMMAR,
      questions: [{
        question: '[[If|Si]] [[she|ella]] ____[[harder|más duro]] [[last year|el año pasado]], [[she|ella]] ____[[the exam|el examen]] [[now|ahora]].',
        options: ['[[had studied|hubiera estudiado]]', '[[studied|estudió]]', '[[would study|estudiaría]]'],
        correctAnswer: 'had studied',
        acceptableAnswers: ['had studied'],
        explanation: '[[Mixed conditional|Condicional mixto]]: [[past condition, present result|condición pasada, resultado presente]].',
      }],
    },
    topicName: 'Grammar',
  },
  {
    id: 'b2-final-g5',
    type: 'fill-blank',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_GRAMMAR,
      questions: [{
        question: '[[It is said that|Se dice que]] [[he|él]] ____[[the best|el mejor]] [[candidate|candidato]] [[for the job|para el puesto]].',
        options: ['[[is|es]]', '[[was|era]]', '[[has been|ha sido]]'],
        correctAnswer: 'is',
        acceptableAnswers: ['is'],
        explanation: '[[Impersonal passive|Pasiva impersonal]]: [[It is said that + clause|Se dice que + cláusula]].',
      }],
    },
    topicName: 'Grammar',
  },
  {
    id: 'b2-final-g6',
    type: 'multiple-choice',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_GRAMMAR,
      questions: [{
        question: '[[I|Yo]] ____[[rather|más bien]] [[stay|quedarme]] [[at home|en casa]] [[tonight|esta noche]].',
        options: ['[[would|prefiero]]', '[[had better|más vale]]', '[[ought to|debería]]'],
        correctAnswer: 0,
        explanation: '[[Would rather|Preferiría]] [[for preferences|para preferencias]].',
      }],
    },
    topicName: 'Grammar',
  },
  {
    id: 'b2-final-g7',
    type: 'fill-blank',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_GRAMMAR,
      questions: [{
        question: '[[Despite|A pesar de]] ____[[the weather|el tiempo]], [[we|nosotros]] [[had|tuvimos]] [[a great time|un gran momento]].',
        options: ['[[the|el]]', '[[a|un]]', '[[an|un]]'],
        correctAnswer: 'the',
        acceptableAnswers: ['the'],
        explanation: '[[Despite + noun phrase|Despite + sintagma nominal]]: [[the weather|el tiempo]].',
      }],
    },
    topicName: 'Grammar',
  },
  {
    id: 'b2-final-g8',
    type: 'multiple-choice',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_GRAMMAR,
      questions: [{
        question: '[[She|Ella]] ____[[regret|arrepentirse]] [[not applying|no solicitar]] [[for the scholarship|la beca]].',
        options: ['[[regrets|se arrepiente de]]', '[[regret|arrepentirse]]', '[[regretted|se arrepintió de]]'],
        correctAnswer: 0,
        explanation: '[[Regret + gerund|Regret + gerundio]] [[for past actions|para acciones pasadas]].',
      }],
    },
    topicName: 'Grammar',
  },
  // ─── Vocabulario (6) ─────────────────────────────────────────────────────
  {
    id: 'b2-final-v1',
    type: 'multiple-choice',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_VOCAB,
      questions: [{
        question: '[[To make something happen|Hacer que algo ocurra]]:',
        options: ['[[bring about|causar]]', '[[bring up|criar]]', '[[bring back|traer de vuelta]]'],
        correctAnswer: 0,
      }],
    },
    topicName: 'Vocabulary',
  },
  {
    id: 'b2-final-v2',
    type: 'multiple-choice',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_VOCAB,
      questions: [{
        question: '[[A formal meeting of delegates|Una reunión formal de delegados]]:',
        options: ['[[summit|cumbre]]', '[[exhibition|exposición]]', '[[festival|festival]]'],
        correctAnswer: 0,
      }],
    },
    topicName: 'Vocabulary',
  },
  {
    id: 'b2-final-v3',
    type: 'multiple-choice',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_VOCAB,
      questions: [{
        question: '[[To continue despite difficulties|Continuar a pesar de las dificultades]]:',
        options: ['[[carry on|seguir adelante]]', '[[carry out|llevar a cabo]]', '[[carry through|completar]]'],
        correctAnswer: 0,
      }],
    },
    topicName: 'Vocabulary',
  },
  {
    id: 'b2-final-v4',
    type: 'multiple-choice',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_VOCAB,
      questions: [{
        question: '[[To discover by chance|Descubrir por casualidad]]:',
        options: ['[[come across|encontrarse con]]', '[[come up with|idear]]', '[[come back|volver]]'],
        correctAnswer: 0,
      }],
    },
    topicName: 'Vocabulary',
  },
  {
    id: 'b2-final-v5',
    type: 'multiple-choice',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_VOCAB,
      questions: [{
        question: '[[To postpone|Posponer]]:',
        options: ['[[put off|aplazar]]', '[[put up with|aguantar]]', '[[put forward|proponer]]'],
        correctAnswer: 0,
      }],
    },
    topicName: 'Vocabulary',
  },
  {
    id: 'b2-final-v6',
    type: 'multiple-choice',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_VOCAB,
      questions: [{
        question: '[[To use all of something|Usar todo de algo]]:',
        options: ['[[run out of|quedarse sin]]', '[[run into|encontrarse con]]', '[[run over|atropellar]]'],
        correctAnswer: 0,
      }],
    },
    topicName: 'Vocabulary',
  },
  // ─── Lectura (6) ────────────────────────────────────────────────────────
  {
    id: 'b2-final-r1',
    type: 'reading',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    transcript: READING_TEXT,
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_READING,
      questions: [{
        question: '[[How long|Cuánto tiempo]] [[has the person been working|ha estado trabajando la persona]] [[as a consultant|como consultor]]?',
        options: ['[[Over ten years|Más de diez años]]', '[[Over fifteen years|Más de quince años]]', '[[Over twenty years|Más de veinte años]]'],
        correctAnswer: 1,
        explanation: '[[I have been working for over fifteen years|He estado trabajando desde hace más de quince años]].',
      }],
    },
    topicName: 'Reading',
  },
  {
    id: 'b2-final-r2',
    type: 'reading',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    transcript: READING_TEXT,
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_READING,
      questions: [{
        question: '[[Where|Dónde]] [[was the conference|fue la conferencia]] [[held|celebrada]]?',
        options: ['[[In Geneva|En Ginebra]]', '[[In Copenhagen|En Copenhague]]', '[[In Amsterdam|En Ámsterdam]]'],
        correctAnswer: 1,
        explanation: '[[A conference in Copenhagen|Una conferencia en Copenhague]].',
      }],
    },
    topicName: 'Reading',
  },
  {
    id: 'b2-final-r3',
    type: 'reading',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    transcript: READING_TEXT,
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_READING,
      questions: [{
        question: '[[What|Qué]] [[topic|tema]] [[was the conference about|era la conferencia sobre]]?',
        options: ['[[Climate change|Cambio climático]]', '[[Sustainable development|Desarrollo sostenible]]', '[[Digital transformation|Transformación digital]]'],
        correctAnswer: 1,
        explanation: '[[A conference on sustainable development|Una conferencia sobre desarrollo sostenible]].',
      }],
    },
    topicName: 'Reading',
  },
  {
    id: 'b2-final-r4',
    type: 'reading',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    transcript: READING_TEXT,
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_READING,
      questions: [{
        question: '[[What|Qué]] [[did the person manage to do|logró hacer la persona]] [[at the conference|en la conferencia]]?',
        options: ['[[Give a keynote|Dar una ponencia principal]]', '[[Network with potential clients|Hacer contactos con clientes potenciales]]', '[[Organise the event|Organizar el evento]]'],
        correctAnswer: 1,
        explanation: '[[I managed to network with several potential clients|Logré hacer contactos con varios clientes potenciales]].',
      }],
    },
    topicName: 'Reading',
  },
  {
    id: 'b2-final-r5',
    type: 'reading',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    transcript: READING_TEXT,
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_READING,
      questions: [{
        question: '[[What|Qué]] [[does the person regret|de qué se arrepiente la persona]]?',
        options: ['[[Not attending|No asistir]]', '[[Not applying for funding earlier|No solicitar financiación antes]]', '[[Not preparing enough|No preparar lo suficiente]]'],
        correctAnswer: 1,
        explanation: '[[I would have applied for funding earlier|Habría solicitado financiación antes]].',
      }],
    },
    topicName: 'Reading',
  },
  {
    id: 'b2-final-r6',
    type: 'reading',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    transcript: READING_TEXT,
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_READING,
      questions: [{
        question: '[[What|Qué]] [[is the person looking forward to|espera con ganas la persona]]?',
        options: ['[[Writing a report|Escribir un informe]]', '[[Presenting at the next summit|Presentar en la próxima cumbre]]', '[[Travelling abroad|Viajar al extranjero]]'],
        correctAnswer: 1,
        explanation: '[[I am looking forward to presenting at the next summit|Espero con ganas presentar en la próxima cumbre]].',
      }],
    },
    topicName: 'Reading',
  },
  // ─── Escucha (6) ────────────────────────────────────────────────────────
  {
    id: 'b2-final-l1',
    type: 'listening',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    transcript: LISTENING_TRANSCRIPT,
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_LISTENING,
      questions: [{
        question: '[[Where|Dónde]] [[did David go|fue David]] [[on his business trip|en su viaje de negocios]]?',
        options: ['[[To Tokyo|A Tokio]]', '[[To Singapore|A Singapur]]', '[[To Hong Kong|A Hong Kong]]'],
        correctAnswer: 1,
        explanation: '[[I have just returned from a business trip to Singapore|Acabo de regresar de un viaje de negocios a Singapur]].',
      }],
    },
    topicName: 'Listening',
  },
  {
    id: 'b2-final-l2',
    type: 'listening',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    transcript: LISTENING_TRANSCRIPT,
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_LISTENING,
      questions: [{
        question: '[[What|Qué]] [[was the conference about|era la conferencia sobre]]?',
        options: ['[[Sustainable development|Desarrollo sostenible]]', '[[Digital transformation|Transformación digital]]', '[[Climate change|Cambio climático]]'],
        correctAnswer: 1,
        explanation: '[[The conference I attended focused on digital transformation|La conferencia a la que asistí se centró en transformación digital]].',
      }],
    },
    topicName: 'Listening',
  },
  {
    id: 'b2-final-l3',
    type: 'listening',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    transcript: LISTENING_TRANSCRIPT,
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_LISTENING,
      questions: [{
        question: '[[Who|Quiénes]] [[approached David|abordaron a David]] [[after his keynote|después de su ponencia]]?',
        options: ['[[Journalists|Periodistas]]', '[[Investors|Inversores]]', '[[Colleagues|Colegas]]'],
        correctAnswer: 1,
        explanation: '[[I was approached by several investors|Fui abordado por varios inversores]].',
      }],
    },
    topicName: 'Listening',
  },
  {
    id: 'b2-final-l4',
    type: 'listening',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    transcript: LISTENING_TRANSCRIPT,
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_LISTENING,
      questions: [{
        question: '[[What|Qué]] [[does David regret|de qué se arrepiente David]]?',
        options: ['[[Not attending the conference|No asistir a la conferencia]]', '[[Not exploring the city further|No explorar más la ciudad]]', '[[Not meeting more people|No conocer a más gente]]'],
        correctAnswer: 1,
        explanation: '[[I would have explored the city further|Habría explorado más la ciudad]].',
      }],
    },
    topicName: 'Listening',
  },
  {
    id: 'b2-final-l5',
    type: 'listening',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    transcript: LISTENING_TRANSCRIPT,
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_LISTENING,
      questions: [{
        question: '[[Who|Quién]] [[approved David\'s report|aprobó el informe de David]]?',
        options: ['[[His boss|Su jefe]]', '[[The board|La junta directiva]]', '[[The investors|Los inversores]]'],
        correctAnswer: 1,
        explanation: '[[The report has been approved by the board|El informe ha sido aprobado por la junta directiva]].',
      }],
    },
    topicName: 'Listening',
  },
  {
    id: 'b2-final-l6',
    type: 'listening',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    transcript: LISTENING_TRANSCRIPT,
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_LISTENING,
      questions: [{
        question: '[[How|Cómo]] [[does David find|encuentra David]] [[business travel|los viajes de negocios]]?',
        options: ['[[Exciting|Emocionante]]', '[[Exhausting at times|Agotador a veces]]', '[[Boring|Aburrido]]'],
        correctAnswer: 1,
        explanation: '[[I still find it exhausting at times|Todavía lo encuentro agotador a veces]].',
      }],
    },
    topicName: 'Listening',
  },
  // ─── Escritura (4) ──────────────────────────────────────────────────────
  {
    id: 'b2-final-w1',
    type: 'writing',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_WRITING,
      questions: [{
        question: '[[Write|Escribe]] [[a short essay|un breve ensayo]] [[(140-190 words)|(140-190 palabras)]] [[about|sobre]] [[the advantages and disadvantages|las ventajas y desventajas]] [[of|de]] [[working from home|trabajar desde casa]].',
        wordCountMin: 80,
        wordCountMax: 250,
      }],
    },
    topicName: 'Writing',
  },
  {
    id: 'b2-final-w2',
    type: 'writing',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_WRITING,
      questions: [{
        question: '[[Write|Escribe]] [[an email|un email]] [[to a colleague|a un colega]] [[explaining|explicando]] [[why you cannot attend|por qué no puedes asistir]] [[a meeting|a una reunión]] [[and|y]] [[suggesting|sugiriendo]] [[an alternative|una alternativa]].',
        wordCountMin: 80,
        wordCountMax: 250,
      }],
    },
    topicName: 'Writing',
  },
  {
    id: 'b2-final-w3',
    type: 'writing',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_WRITING,
      questions: [{
        question: '[[Write|Escribe]] [[a review|una reseña]] [[of a book or film|de un libro o película]] [[you have enjoyed|que hayas disfrutado]] [[recently|recientemente]]. [[Include|Incluye]] [[your opinion|tu opinión]] [[and|y]] [[recommendations|recomendaciones]].',
        wordCountMin: 80,
        wordCountMax: 250,
      }],
    },
    topicName: 'Writing',
  },
  {
    id: 'b2-final-w4',
    type: 'writing',
    level: 'B2',
    topic: 'Test final B2',
    difficulty: 'medium',
    content: {
      title: TITLE,
      instructions: INSTRUCTIONS_WRITING,
      questions: [{
        question: '[[Write|Escribe]] [[a short article|un breve artículo]] [[for a magazine|para una revista]] [[about|sobre]] [[the importance of learning a second language|la importancia de aprender un segundo idioma]].',
        wordCountMin: 80,
        wordCountMax: 250,
      }],
    },
    topicName: 'Writing',
  },
];

export const FINAL_TEST_B2_TITLE = 'Test final B2';
