// A1 Module 1 Unit 1: Greetings & Goodbyes
// Focus: Basic Greetings, Goodbyes, and the Verb 'To Be' (Am/Is/Are).
// Total: 60 Exercises

import { Exercise } from './exercise-types';

// Helper to create a simple exercise from a question
const createExercise = (id: string, q: any, topic: string, unit: number): Exercise => ({
  id,
  type: q.type || 'grammar',
  level: 'A1',
  topicName: topic,
  transcript: q.question,
  audioUrl: `audio/a1/unit-${unit}/${id}.mp3`,
  content: {
    title: topic,
    instructions: q.type === 'fill-blank' ? '[[Write the correct word.|Escribe la palabra correcta.]]' : '[[Choose the correct answer.|Elige la respuesta correcta.]]',
    questions: [q]
  }
});

const GRAMMAR_QUESTIONS = [
  // Recognition (1-15)
  { id: 'q1', type: 'multiple-choice', question: 'It is 8:00 [[AM|de la mañana]]. You say: "Good ___!"', options: ['morning', 'afternoon', 'evening'], correctAnswer: 'morning', explanation: '[[We use "Good morning" to greet from dawn until noon (12:00 PM).|Usamos "Good morning" para saludar desde que amanece hasta el mediodía (12:00 PM).]]' },
  { id: 'q2', type: 'multiple-choice', question: 'It is 3:00 [[PM|de la tarde]]. You say: "Good ___!"', options: ['morning', 'afternoon', 'evening'], correctAnswer: 'afternoon', explanation: '[[We use "Good afternoon" from noon until approximately 6:00 PM.|Usamos "Good afternoon" desde el mediodía hasta aproximadamente las 6:00 PM.]]' },
  { id: 'q3', type: 'multiple-choice', question: 'When you go to sleep, you say: "Good ___!"', options: ['morning', 'afternoon', 'night'], correctAnswer: 'night', explanation: '[["Good night" is not a greeting upon arrival, but a farewell used before going to sleep or at the end of the night.|"Good night" no es un saludo de llegada, sino una despedida que se usa antes de ir a dormir o al final de la noche.]]' },
  { id: 'q4', type: 'true-false', question: '"Hi" is [[more|más]] [[formal|formal]] [[than|que]] "Hello".', correctAnswer: 'False', explanation: '[["Hello" is the standard and more formal greeting. "Hi" is informal and used with friends or acquaintances.|"Hello" es el saludo estándar y más formal. "Hi" es informal y se usa con amigos o conocidos.]]' },
  { id: 'q5', type: 'multiple-choice', question: 'I ___ a student.', options: ['am', 'is', 'are'], correctAnswer: 'am', explanation: '[["The personal pronoun "I" is always accompanied by the verbal form "am".|El pronombre personal "I" (Yo) siempre va acompañado de la forma verbal "am".]]' },
  { id: 'q6', type: 'multiple-choice', question: 'You ___ my friend.', options: ['am', 'is', 'are'], correctAnswer: 'are', explanation: '[["The pronoun "You" always uses the verbal form "are".|El pronombre "You" (Tú/Usted/Vosotros) siempre usa la forma verbal "are".]]' },
  { id: 'q7', type: 'multiple-choice', question: 'He ___ a doctor.', options: ['am', 'is', 'are'], correctAnswer: 'is', explanation: '[[For the third person singular (He, She, It) we use the verbal form "is".|Para la tercera persona del singular (He, She, It) utilizamos la forma verbal "is".]]' },
  { id: 'q8', type: 'multiple-choice', question: 'Which [[word|palabra]] [[matches|coincide]] [[the|la]] [[image|imagen]] [[of|de]] a [[moon|luna]]?', options: ['Sun', 'Morning', 'Night'], correctAnswer: 'Night', explanation: '[[The moon is the characteristic symbol of the night ("Night").|La luna es el símbolo característico de la noche ("Night").]]' },
  { id: 'q9', type: 'fill-blank', question: 'Hello, I ___ Sarah.', correctAnswer: 'am', explanation: '[[To introduce yourself using "I", you must use the verbal form "am" (I am...).|Para presentarte usando "I", debes usar la forma verbal "am" (Yo soy...).]]' },
  { id: 'q10', type: 'multiple-choice', question: 'Match "Hola" [[to|al]] English:', options: ['Bye', 'Hello', 'Thanks'], correctAnswer: 'Hello', explanation: '[["Hello" is the direct translation of "Hola". "Bye" means goodbye.|"Hello" es la traducción directa de "Hola". "Bye" significa adiós.]]' },
  { id: 'q11', type: 'multiple-choice', question: 'She ___ happy.', options: ['am', 'is', 'are'], correctAnswer: 'is', explanation: '[[Since "She" is the third person singular, the form "is" corresponds to it.|Como "She" es tercera persona del singular, le corresponde la forma "is".]]' },
  { id: 'q12', type: 'true-false', question: 'We can use "Good morning" at 11:00 [[PM|de la noche]].', correctAnswer: 'False', explanation: '[[At 11:00 PM it is night, so we should use "Good evening" (if we arrive) or "Good night" (if we leave).|A las 11:00 PM es de noche, por lo que deberíamos usar "Good evening" (si llegamos) o "Good night" (si nos vamos).]]' },
  { id: 'q13', type: 'multiple-choice', question: 'It ___ a pen.', options: ['am', 'is', 'are'], correctAnswer: 'is', explanation: '[[For objects or animals we use the pronoun "It" with the verbal form "is".|Para objetos o animales usamos el pronombre "It" con la forma verbal "is".]]' },
  { id: 'q14', type: 'fill-blank', question: 'How ___ you?', correctAnswer: 'are', explanation: '[[In the question "How are you?", the pronoun "you" requires the verbal form "are".|En la pregunta "¿Cómo estás?", el pronombre "you" requiere la forma verbal "are".]]' },
  { id: 'q15', type: 'true-false', question: 'The pronoun "I" is used for other people.', correctAnswer: 'False', explanation: '[[The pronoun "I" is the first person and refers only to oneself (I).|El pronombre "I" es la primera persona y se refiere únicamente a uno mismo (Yo).]]' },
  // Concept Acquisition (16-30)
  { id: 'q16', type: 'multiple-choice', question: 'Select the [[contraction|contracción]] for "I am":', options: ["I'm", "I's", "I're"], correctAnswer: "I'm", explanation: '[["In English it is very common to contract "I am" as "I\'m" to speak more naturally.|En inglés es muy común contraer "I am" como "I\'m" para hablar de forma más natural.]]' },
  { id: 'q17', type: 'true-false', question: 'The [[contraction|contracción]] for "You are" is "You\'is".', correctAnswer: 'False', explanation: '[["The correct contraction for "You are" is "You\'re". "is" is never used with "You".|La contracción correcta para "You are" es "You\'re". Nunca se usa "is" con "You".]]' },
  { id: 'q18', type: 'multiple-choice', question: 'Select the [[contraction|contracción]] for "He is":', options: ["He's", "He're", "He'm"], correctAnswer: "He's", explanation: '[["For the third person "He is", the correct contraction is "He\'s".|Para la tercera persona "He is", la contracción correcta es "He\'s".]]' },
  { id: 'q19', type: 'true-false', question: 'We [[use|utilizamos]] "She" [[for|para]] a [[man|hombre]].', correctAnswer: 'False', explanation: '[["The pronoun "She" is used exclusively for women. For men we use "He".|El pronombre "She" se utiliza exclusivamente para mujeres. Para hombres usamos "He".]]' },
  { id: 'q20', type: 'multiple-choice', question: 'Identify the [[pronoun|pronombre]] for a [[boy|niño]]:', options: ['He', 'She', 'It'], correctAnswer: 'He', explanation: '[["He" is the singular masculine pronoun that means "He".|"He" es el pronombre masculino singular que significa "Él".]]' },
  { id: 'q21', type: 'true-false', question: 'We [[use|utilizamos]] "It" [[for|para]] a [[person|persona]].', correctAnswer: 'False', explanation: '[["The pronoun "It" is reserved for objects, animals or situations, not for people.|El pronombre "It" se reserva para objetos, animales o situaciones, no para personas.]]' },
  { id: 'q22', type: 'fill-blank', question: "I ___ [[fine|bien]], [[thanks|gracias]].", correctAnswer: "am", explanation: '[["Again, with "I" we always use the verbal form "am" to express states or identity.|Nuevamente, con "I" siempre usamos la forma verbal "am" para expresar estados o identidad.]]' },
  { id: 'q23', type: 'multiple-choice', question: 'Nice to ___ you.', options: ['see', 'meet', 'look'], correctAnswer: 'meet', explanation: '[["Nice to meet you" is the idiomatic phrase we use when we meet someone for the first time.|"Nice to meet you" es la frase hecha que utilizamos cuando conocemos a alguien por primera vez.]]' },
  { id: 'q24', type: 'true-false', question: 'We [[use|utilizamos]] "It is" [[for|para]] [[animals|animales]] [[and|y]] [[objects|objetos]].', correctAnswer: 'True', explanation: '[["Indeed, "It" is the neutral pronoun we use for everything that is not a person in singular.|Efectivamente, "It" es el pronombre neutro que usamos para todo lo que no sea una persona en singular.]]' },
  { id: 'q25', type: 'multiple-choice', question: 'Choose the [[correct|correcta]] [[formal|formal]] [[greeting|saludo]]:', options: ['Hi!', 'Hey!', 'Good afternoon.'], correctAnswer: 'Good afternoon.', explanation: '[["Good afternoon" is a polite and formal greeting. "Hi" and "Hey" are informal.|"Good afternoon" es un saludo educado y formal. "Hi" y "Hey" son informales.]]' },
  { id: 'q26', type: 'true-false', question: 'The [[verb|verbo]] "to be" [[has|tiene]] 5 [[forms|formas]] [[for|para]] "I".', correctAnswer: 'False', explanation: '[["The verb "to be" only has one specific form for "I", which is "am".|El verbo "to be" solo tiene una forma específica para "I", que es "am".]]' },
  { id: 'q27', type: 'multiple-choice', question: 'What is the [[subject|sujeto]] [[pronoun|pronombre]] [[for|para]] "Yo"?', options: ['You', 'I', 'Me'], correctAnswer: 'I', explanation: '[["I" is the subject pronoun. "Me" is used as an object (e.g.: "Look at me").|"I" es el pronombre de sujeto. "Me" se usa como objeto (ej: "Look at me").]]' },
  { id: 'q28', type: 'multiple-choice', question: 'Complete: ___ is my [[teacher|profesor/a]].', options: ['I', 'He', 'You'], correctAnswer: 'He', explanation: '[["Since the verb is "is", we need a third person singular pronoun like "He". "I" would use "am" and "You" would use "are".|Como el verbo es "is", necesitamos un pronombre de tercera persona singular como "He". "I" usaría "am" y "You" usaría "are".]]' },
  { id: 'q29', type: 'true-false', question: 'The [[contraction|contracción]] [[for|para]] "She is" is "She\'s".', correctAnswer: 'True', explanation: '[["Correct. "She is" is contracted by joining the pronoun with the "s" by means of an apostrophe.|Correcto. "She is" se contrae uniendo el pronombre con la "s" mediante un apóstrofe.]]' },
  { id: 'q30', type: 'true-false', question: 'The [[plural|plural]] [[of|de]] "He" is "I".', correctAnswer: 'False', explanation: '[["The plural of "He" (He) is "They" (They). "I" (I) is singular.|El plural de "He" (Él) es "They" (Ellos). "I" (Yo) es singular.]]' },
  // Practice (31-50)
  { id: 'q31', type: 'multiple-choice', question: 'Select the [[correct|correcta]] [[sentence|oración]]:', options: ['I am happy.', 'Am I happy.', 'I happy am.'], correctAnswer: 'I am happy.', explanation: '[["The standard affirmative structure in English is Subject + Verb + Complement.|La estructura afirmativa estándar en inglés es Sujeto + Verbo + Complemento.]]' },
  { id: 'q32', type: 'multiple-choice', question: 'Select the [[correct|correcta]] [[sentence|oración]]:', options: ['You are tall.', 'Are you tall.', 'You tall are.'], correctAnswer: 'You are tall.', explanation: '[["For the pronoun "You", the corresponding verb is "are" in affirmative sentences.|Para el pronombre "You", el verbo correspondiente es "are" en oraciones afirmativas.]]' },
  { id: 'q33', type: 'fill-blank', question: "___ is a [[cat|gato]].", correctAnswer: "It", explanation: '[["As we refer to an animal (a cat), the appropriate subject pronoun is "It".|Como nos referimos a un animal (un gato), el pronombre de sujeto adecuado es "It".]]' },
  { id: 'q34', type: 'multiple-choice', question: 'Goodbye, [[see|nos vemos]] you [[later|luego]]!', options: ['me', 'you', 'it'], correctAnswer: 'you', explanation: '[["See you later" is the common expression for saying goodbye, meaning "see you later".|"See you later" es la expresión común para despedirse, significando "nos vemos luego".]]' },
  { id: 'q35', type: 'fill-blank', question: "He ___ [[from|de]] Mexico.", correctAnswer: "is", explanation: '[["With the masculine singular third person (He), the verb "to be" takes the form "is".|Con la tercera persona singular masculina (He), el verbo "to be" toma la forma "is".]]' },
  { id: 'q36', type: 'multiple-choice', question: 'Which [[is|es]] [[correct|correcto]]?', options: ["I'm fine.", "I is fine.", "I are fine."], correctAnswer: "I'm fine.", explanation: '[["I\'m" is the contraction of "I am", the only valid form for the first person singular.|"I\'m" es la contracción de "I am", la única forma válida para la primera persona singular.]]' },
  { id: 'q37', type: 'fill-blank', question: "___ are welcome.", correctAnswer: "You", explanation: '[["You are welcome" is the standard response to "Thank you" (Thanks).|"You are welcome" es la respuesta estándar a "Thank you" (Gracias).]]' },
  { id: 'q38', type: 'multiple-choice', question: 'It is 7:00 [[PM|de la noche]]. You arrive. You say:', options: ['Good morning.', 'Good afternoon.', 'Good evening.'], correctAnswer: 'Good evening.', explanation: '[["When arriving at a place in the late afternoon/evening (7:00 PM), we greet with "Good evening".|Al llegar a un lugar por la tarde/noche (7:00 PM), saludamos con "Good evening".]]' },
  { id: 'q39', type: 'multiple-choice', question: 'It is 11:00 [[PM|de la noche]]. You leave. You say:', options: ['Good night.', 'Good evening.', 'Good afternoon.'], correctAnswer: 'Good night.', explanation: '[["Good night" is used exclusively as a farewell when it is night or before sleeping.|"Good night" se utiliza exclusivamente como despedida cuando es de noche o antes de dormir.]]' },
  { id: 'q40', type: 'fill-blank', question: "She ___ a [[student|estudiante]].", correctAnswer: "is", explanation: '[["We use "is" to connect the subject "She" with her occupation.|Usamos "is" para conectar al sujeto "She" con su ocupación.]]' },
  { id: 'q41', type: 'multiple-choice', question: 'Order the words: [am / I / Italian / .]', options: ['I am Italian.', 'Italian I am.', 'I Italian am.'], correctAnswer: 'I am Italian.', explanation: '[["The correct order is Subject (I) + Verb (am) + Nationality adjective (Italian).|El orden correcto es Sujeto (I) + Verbo (am) + Adjetivo de nacionalidad (Italian).]]' },
  { id: 'q42', type: 'multiple-choice', question: 'Order the words: [is / He / cool / .]', options: ['He is cool.', 'Is he cool.', 'Cool he is.'], correctAnswer: 'He is cool.', explanation: '[["We follow the order Subject (He) + Verb (is) + Complement (cool).|Seguimos el orden Sujeto (He) + Verbo (is) + Complemento (cool).]]' },
  { id: 'q43', type: 'fill-blank', question: "___ [[name|nombre]] is John.", correctAnswer: "My", explanation: '[["My" is the possessive adjective to indicate that the name belongs to me.|"My" es el adjetivo posesivo para indicar que el nombre me pertenece a mí.]]' },
  { id: 'q44', type: 'multiple-choice', question: 'What is the [[opposite|opuesto]] [[of|de]] "Hello"?', options: ['Hi', 'Goodbye', 'Good morning'], correctAnswer: 'Goodbye', explanation: '[["Hello" is a greeting upon arrival and "Goodbye" is the farewell upon leaving.|"Hello" es un saludo al llegar y "Goodbye" es la despedida al irse.]]' },
  { id: 'q45', type: 'true-false', question: '"I" is [[always|siempre]] [[capitalized|en mayúsculas]] [[in|en]] English.', correctAnswer: 'True', explanation: '[["In English, the first person pronoun "I" is always capitalized.|En inglés, el pronombre de primera persona "I" siempre se escribe en mayúscula.]]' },
  { id: 'q46', type: 'multiple-choice', question: 'A: "How are you?" B: "___"', options: ['I am fine, thanks.', 'I am John.', 'Good night.'], correctAnswer: 'I am fine, thanks.', explanation: '[["I am fine, thanks" is the polite response to the question about our mood or health.|"I am fine, thanks" es la respuesta educada a la pregunta sobre nuestro estado de ánimo o salud.]]' },
  { id: 'q47', type: 'multiple-choice', question: 'A: "What is your name?" B: "___"', options: ['I am Maria.', 'I am fine.', 'See you!'], correctAnswer: 'I am Maria.', explanation: '[["We respond with our name when asked "What is your name?".|Respondemos con nuestro nombre cuando nos preguntan "¿Cómo te llamas?".]]' },
  { id: 'q48', type: 'multiple-choice', question: 'A: "Nice to meet you." B: "___"', options: ['Nice to meet you too.', 'Hello.', 'Good morning.'], correctAnswer: 'Nice to meet you too.', explanation: '[["When someone tells us it is a pleasure to meet us, we respond with "too" (also).|Cuando alguien nos dice que es un placer conocernos, respondemos con "too" (también).]]' },
  { id: 'q49', type: 'fill-blank', question: "See you [[later|luego]].", correctAnswer: "later", explanation: '[["See you later" is the full phrase for saying goodbye cordially.|"See you later" es la frase completa para despedirse cordialmente.]]' },
  { id: 'q50', type: 'multiple-choice', question: 'Choose the [[best|mejor]] [[greeting|saludo]] [[for|para]] a [[job|trabajo]] [[interview|entrevista]]:', options: ['Hey!', 'Hello, good morning.', "[[What's up?|¿Qué tal?]]"], correctAnswer: 'Hello, good morning.', explanation: '[["In a job interview, a formal and complete greeting is always the best option.|En una entrevista de trabajo, un saludo formal y completo es siempre la mejor opción.]]' },
  // More practice to reach 55
  { id: 'q51', type: 'fill-blank', question: "I ___ a [[student|estudiante]] at Linguafly.", correctAnswer: "am", explanation: '[["With the pronoun "I" we always use the verb "am" to define who we are.|Con el pronombre "I" siempre usamos el verbo "am" para definir quiénes somos.]]' },
  { id: 'q52', type: 'multiple-choice', question: 'Translate: "Ella es mi amiga."', options: ['She is my friend.', 'He is my friend.', 'It is my friend.'], correctAnswer: 'She is my friend.', explanation: '[["She" is she, "He" is he and "It" is it. Therefore, "She is my friend" is the correct translation.|"She" es ella, "He" es él e "It" es ello. Por tanto, "She is my friend" es la traducción correcta.]]' },
  { id: 'q53', type: 'multiple-choice', question: 'Translate: "¿Cómo estás?"', options: ['How are you?', 'Who are you?', 'Where are you?'], correctAnswer: 'How are you?', explanation: '[["How" means how, "Who" who and "Where" where.|"How" significa cómo, "Who" quién y "Where" dónde.]]' },
  { id: 'q54', type: 'fill-blank', question: "___ are my [[friend|amigo]].", correctAnswer: "You", explanation: '[["The verb "are" tells us that the subject must be "You" (You).|El verbo "are" nos indica que el sujeto debe ser "You" (Tú).]]' },
  { id: 'q55', type: 'multiple-choice', question: 'Find the error: "I are happy."', options: ['I are', 'I am', 'I is'], correctAnswer: 'I am', explanation: '[["The error is using "are" with "I". The correct form is "I am".|El error es usar "are" con "I". La forma correcta es "I am".]]' },
];
// Reading Exercises (56-60)
const READING_EXERCISES: Exercise[] = [
  {
    id: 'a1-m1-l1-reading-1',
    type: 'reading-comprehension',
    level: 'A1',
    topicName: 'Reading',
    transcript: '[[Hello|Hola]]! [[My|Mi]] [[name|nombre]] [[is|es]] [[Alex|Alex]]. [[I|Yo]] [[am|soy]] [[from|de]] [[London|Londres]]. [[I|Yo]] [[am|soy]] [[a|un]] [[student|estudiante]]. [[Today|Hoy]] [[is|es]] [[a|un]] [[good|buen]] [[day|día]]. [[I|Yo]] [[am|estoy]] [[happy|feliz]].',
    audioUrl: 'audio/a1/unit-1/a1-m1-l1-reading-1.mp3',
    content: {
      title: '[[Reading: Meet Alex|Lectura: Conoce a Alex]]',
      instructions: '[[Read the text and answer the questions.|Lee el texto y responde las preguntas.]]',
      questions: [
        {
          id: 'q56',
          type: 'multiple-choice',
          question: '[[What is his name?|¿Cuál es su nombre?]]',
          options: ['Alex', 'John', 'London'],
          correctAnswer: 'Alex',
          explanation: '[["The text says: "My name is Alex".|El texto dice: "My name is Alex".]]'
        },
        {
          id: 'q57',
          type: 'multiple-choice',
          question: '[[Where is he from?|¿De dónde es él?]]',
          options: ['Spain', 'London', 'New York'],
          correctAnswer: 'London',
          explanation: '[["The text says: "I am from London".|El texto dice: "I am from London".]]'
        }
      ]
    }
  },
  {
    id: 'a1-m1-l1-reading-2',
    type: 'reading-comprehension',
    level: 'A1',
    topicName: 'Reading',
    transcript: '[[This|Esta]] [[is|es]] [[my|mi]] [[friend|amiga]], [[Sarah|Sara]]. [[She|Ella]] [[is|es]] [[a|una]] [[teacher|profesora]]. [[She|Ella]] [[is|es]] [[very|muy]] [[nice|agradable]]. [[We|Nosotros]] [[are|estamos]] [[in|en]] [[the|el]] [[classroom|aula]] [[now|ahora]]. [[It|Ello]] [[is|es]] [[9:00]] [[AM|de la mañana]].',
    audioUrl: 'audio/a1/unit-1/a1-m1-l1-reading-2.mp3',
    content: {
      title: '[[Reading: My Friend Sarah|Lectura: Mi amiga Sara]]',
      instructions: '[[Read the text and answer the questions.|Lee el texto y responde las preguntas.]]',
      questions: [
        {
          id: 'q58',
          type: 'multiple-choice',
          question: '[[What is Sarah\'s job?|¿Cuál es el trabajo de Sara?]]',
          options: ['Student', 'Teacher', 'Doctor'],
          correctAnswer: 'Teacher',
          explanation: '[["The text says: "She is a teacher".|El texto dice: "She is a teacher".]]'
        },
        {
          id: 'q59',
          type: 'multiple-choice',
          question: '[[Where are they?|¿Dónde están ellos?]]',
          options: ['At home', 'In the classroom', 'At the park'],
          correctAnswer: 'In the classroom',
          explanation: '[["The text says: "We are in the classroom".|El texto dice: "We are in the classroom".]]'
        },
        {
          id: 'q60',
          type: 'multiple-choice',
          question: '[[What time is it?|¿Qué hora es?]]',
          options: ['9:00 [[AM|de la mañana]]', '3:00 [[PM|de la tarde]]', '12:00 [[PM|de la tarde]]'],
          correctAnswer: '9:00 [[AM|de la mañana]]',
          explanation: '[["The text says: "It is 9:00 AM".|El texto dice: "It is 9:00 [[AM|de la mañana]]".]]'
        }
      ]
    }
  }
];
// Flatten grammar questions into individual exercises
const INDIVIDUAL_GRAMMAR_EXERCISES = GRAMMAR_QUESTIONS.map(q => createExercise(q.id, q, 'Greetings & Verb To Be', 1));
// Combine to get exactly 60 exercises in the main array if possible, 
// but since readings have multiple questions, we can adjust.
// The user expects "Ejercicio X de 60". 
// To get 60 items in the array, we have 55 grammar + 5 reading exercises.
// I'll add 3 more reading exercises to reach 60 items in the array.
const ADDITIONAL_READINGS: Exercise[] = [
  {
    id: 'a1-m1-l1-reading-3',
    type: 'reading-comprehension',
    level: 'A1',
    topicName: 'Reading',
    transcript: '[[Good|Buenos]] [[morning|días]]! [[I|Yo]] [[am|soy]] [[Maria|María]]. [[This|Este]] [[is|es]] [[my|mi]] [[dog|perro]], [[Max|Max]]. [[Max|Max]] [[is|es]] [[brown|marrón]]. [[He|Él]] [[is|es]] [[a|un]] [[good|buen]] [[dog|perro]].',
    audioUrl: 'audio/a1/unit-1/a1-m1-l1-reading-3.mp3',
    content: {
      title: '[[Reading: Maria and Max|Lectura: María y Max]]',
      instructions: '[[Read and answer.|Lee y responde.]]',
      questions: [{ id: 'q-r3-1', type: 'multiple-choice', question: '[[What color is Max?|¿De qué color es Max?]]', options: ['Black', 'Brown', 'White'], correctAnswer: 'Brown' }]
    }
  },
  {
    id: 'a1-m1-l1-reading-4',
    type: 'reading-comprehension',
    level: 'A1',
    topicName: 'Reading',
    transcript: '[[Hi|Hola]], [[I|Yo]] [[am|soy]] [[Tom|Tom]]. [[I|Yo]] [[am|tengo]] [[20]] [[years old|años]]. [[I|Yo]] [[am|soy]] [[from|de]] [[Canada|Canadá]]. [[Nice|Mucho]] [[to|gusto]] [[meet|en conocer]] [[you|a ti]]!',
    audioUrl: 'audio/a1/unit-1/a1-m1-l1-reading-4.mp3',
    content: {
      title: '[[Reading: Tom from Canada|Lectura: Tom de Canadá]]',
      instructions: '[[Read and answer.|Lee y responde.]]',
      questions: [{ id: 'q-r4-1', type: 'multiple-choice', question: '[[Where is Tom from?|¿De dónde es Tom?]]', options: ['Canada', 'USA', 'UK'], correctAnswer: 'Canada' }]
    }
  },
  {
    id: 'a1-m1-l1-reading-5',
    type: 'reading-comprehension',
    level: 'A1',
    topicName: 'Reading',
    transcript: '[[It|Ello]] [[is|es]] [[6:00]] [[PM|de la tarde]]. [[Good|Buenas]] [[evening|noches]]! [[We|Nosotros]] [[are|estamos]] [[at|en]] [[the|el]] [[restaurant|restaurante]]. [[The|La]] [[food|comida]] [[is|está]] [[good|buena]]. [[We|Nosotros]] [[are|estamos]] [[happy|felices]].',
    audioUrl: 'audio/a1/unit-1/a1-m1-l1-reading-5.mp3',
    content: {
      title: '[[Reading: At the Restaurant|Lectura: En el restaurante]]',
      instructions: '[[Read and answer.|Lee y responde.]]',
      questions: [{ id: 'q-r5-1', type: 'multiple-choice', question: '[[What time is it?|¿Qué hora es?]]', options: ['6:00 [[AM|de la mañana]]', '6:00 [[PM|de la tarde]]', '8:00 [[PM|de la noche]]'], correctAnswer: '6:00 [[PM|de la tarde]]' }]
    }
  }
];

// LISTENING & PRONUNCIATION LESSON (EXERCISES 61-75)
const LISTENING_AND_PRONUNCIATION: Exercise[] = [
  // Listening Comprehension (61-68)
  {
    id: 'a1-u1-e61',
    type: 'listening-comprehension',
    level: 'A1',
    topicName: 'Listening',
    transcript: 'Hello, I am Maria. Nice to meet you.',
    audioUrl: 'audio/a1/unit-1/e61.mp3',
    content: {
      title: '[[Listening: Introductions|Escuchar: Presentaciones]]',
      instructions: '[[Listen and select the correct answer.|Escucha y selecciona la respuesta correcta.]]',
      questions: [{
        id: 'q61',
        type: 'multiple-choice',
        question: '[[What is her name?|¿Cuál es su nombre?]]',
        options: ['Maria', 'Sarah', 'Alex'],
        correctAnswer: 'Maria',
        explanation: '[["The speaker says: "I am Maria".|El hablante dice: "I am Maria".]]'
      }]
    }
  },
  {
    id: 'a1-u1-e62',
    type: 'listening-comprehension',
    level: 'A1',
    topicName: 'Listening',
    transcript: 'Good morning! How are you today?',
    audioUrl: 'audio/a1/unit-1/e62.mp3',
    content: {
      title: '[[Listening: Greetings|Escuchar: Saludos]]',
      instructions: '[[Listen and select the correct answer.|Escucha y selecciona la respuesta correcta.]]',
      questions: [{
        id: 'q62',
        type: 'multiple-choice',
        question: '[[When is this greeting used?|¿Cuándo se usa este saludo?]]',
        options: ['In the morning', 'In the evening', 'At night'],
        correctAnswer: 'In the morning',
        explanation: '[["The speaker says: "Good morning".|El hablante dice: "Good morning".]]'
      }]
    }
  },
  {
    id: 'a1-u1-e63',
    type: 'listening-comprehension',
    level: 'A1',
    topicName: 'Listening',
    transcript: 'I am from Spain. I am Spanish.',
    audioUrl: 'audio/a1/unit-1/e63.mp3',
    content: {
      title: '[[Listening: Nationalities|Escuchar: Nacionalidades]]',
      instructions: '[[Listen and select the correct answer.|Escucha y selecciona la respuesta correcta.]]',
      questions: [{
        id: 'q63',
        type: 'multiple-choice',
        question: '[[Where is the speaker from?|¿De dónde es el hablante?]]',
        options: ['Mexico', 'Spain', 'London'],
        correctAnswer: 'Spain',
        explanation: '[["The speaker says: "I am from Spain".|El hablante dice: "I am from Spain".]]'
      }]
    }
  },
  {
    id: 'a1-u1-e64',
    type: 'listening-comprehension',
    level: 'A1',
    topicName: 'Listening',
    transcript: 'Hi, I am Alex. I am a student.',
    audioUrl: 'audio/a1/unit-1/e64.mp3',
    content: {
      title: '[[Listening: Occupations|Escuchar: Ocupaciones]]',
      instructions: '[[Listen and select the correct answer.|Escucha y selecciona la respuesta correcta.]]',
      questions: [{
        id: 'q64',
        type: 'multiple-choice',
        question: '[[What is Alex\'s job?|¿Cuál es el trabajo de Alex?]]',
        options: ['Teacher', 'Doctor', 'Student'],
        correctAnswer: 'Student',
        explanation: '[["The speaker says: "I am a student".|El hablante dice: "I am a student".]]'
      }]
    }
  },
  {
    id: 'a1-u1-e65',
    type: 'listening-comprehension',
    level: 'A1',
    topicName: 'Listening',
    transcript: 'See you later! Have a nice day.',
    audioUrl: 'audio/a1/unit-1/e65.mp3',
    content: {
      title: '[[Listening: Farewells|Escuchar: Despedidas]]',
      instructions: '[[Listen and select the correct answer.|Escucha y selecciona la respuesta correcta.]]',
      questions: [{
        id: 'q65',
        type: 'multiple-choice',
        question: '[[What is the speaker doing?|¿Qué está haciendo el hablante?]]',
        options: ['Greeting someone', 'Saying goodbye', 'Introducing someone'],
        correctAnswer: 'Saying goodbye',
        explanation: '[[""See you later" is used to say goodbye.|"See you later" se usa para despedirse.]]'
      }]
    }
  },
  {
    id: 'a1-u1-e66',
    type: 'listening-comprehension',
    level: 'A1',
    topicName: 'Listening',
    transcript: 'It is a pen. It is blue.',
    audioUrl: 'audio/a1/unit-1/e66.mp3',
    content: {
      title: '[[Listening: Objects|Escuchar: Objetos]]',
      instructions: '[[Listen and select the correct answer.|Escucha y selecciona la respuesta correcta.]]',
      questions: [{
        id: 'q66',
        type: 'multiple-choice',
        question: '[[What color is the pen?|¿De qué color es el bolígrafo?]]',
        options: ['Red', 'Blue', 'Green'],
        correctAnswer: 'Blue',
        explanation: '[["The speaker says: "It is blue".|El hablante dice: "It is blue".]]'
      }]
    }
  },
  {
    id: 'a1-u1-e67',
    type: 'listening-comprehension',
    level: 'A1',
    topicName: 'Listening',
    transcript: 'She is my teacher. Her name is Ms. Smith.',
    audioUrl: 'audio/a1/unit-1/e67.mp3',
    content: {
      title: '[[Listening: Descriptions|Escuchar: Descripciones]]',
      instructions: '[[Listen and select the correct answer.|Escucha y selecciona la respuesta correcta.]]',
      questions: [{
        id: 'q67',
        type: 'multiple-choice',
        question: '[[Who is she?|¿Quién es ella?]]',
        options: ['A student', 'A teacher', 'A doctor'],
        correctAnswer: 'A teacher',
        explanation: '[["The speaker says: "She is my teacher".|El hablante dice: "She is my teacher".]]'
      }]
    }
  },
  {
    id: 'a1-u1-e68',
    type: 'listening-comprehension',
    level: 'A1',
    topicName: 'Listening',
    transcript: 'I am fine, thank you. And you?',
    audioUrl: 'audio/a1/unit-1/e68.mp3',
    content: {
      title: '[[Listening: Well-being|Escuchar: Bienestar]]',
      instructions: '[[Listen and select the correct answer.|Escucha y selecciona la respuesta correcta.]]',
      questions: [{
        id: 'q68',
        type: 'multiple-choice',
        question: '[[How does the speaker feel?|¿Cómo se siente el hablante?]]',
        options: ['Bad', 'Fine', 'Tired'],
        correctAnswer: 'Fine',
        explanation: '[["The speaker says: "I am fine".|El hablante dice: "I am fine".]]'
      }]
    }
  },
  // Pronunciation Practice (69-75)
  {
    id: 'a1-u1-e69',
    type: 'pronunciation',
    level: 'A1',
    topicName: 'Pronunciation',
    transcript: 'Hello, how are you?',
    audioUrl: 'audio/a1/unit-1/e69.mp3',
    content: {
      title: '[[Pronunciation: Basic Greeting|Pronunciación: Saludo básico]]',
      instructions: '[[Listen to the phrase and repeat it clearly.|Escucha la frase y repítela con claridad.]]',
      expectedResponse: 'Hello, how are you?',
      evaluationCriteria: [
        '[[Clarity in the aspiration of the "H" in "Hello" and "How"|Claridad en la aspiración de la "H" en "Hello" y "How"]]',
        '[[Rising intonation at the end of the question|Entonación ascendente al final de la pregunta]]',
        '[[Correct pronunciation of "are" /ɑːr/|Pronunciación correcta de "are" /ɑːr/]]'
      ]
    }
  },
  {
    id: 'a1-u1-e70',
    type: 'pronunciation',
    level: 'A1',
    topicName: 'Pronunciation',
    transcript: 'Nice to meet you.',
    audioUrl: 'audio/a1/unit-1/e70.mp3',
    content: {
      title: '[[Pronunciation: Introductions|Pronunciación: Presentaciones]]',
      instructions: '[[Listen to the phrase and repeat it clearly.|Escucha la frase y repítela con claridad.]]',
      expectedResponse: 'Nice to meet you.',
      evaluationCriteria: [
        '[[Clear /s/ sound at the end of "Nice"|Sonido /s/ claro al final de "Nice"]]',
        '[[Long vowel /iː/ in "meet"|Vocal larga /iː/ en "meet"]]',
        '[[Fluency in joining the words|Fluidez en la unión de las palabras]]'
      ]
    }
  },
  {
    id: 'a1-u1-e71',
    type: 'pronunciation',
    level: 'A1',
    topicName: 'Pronunciation',
    transcript: 'I am a student.',
    audioUrl: 'audio/a1/unit-1/e71.mp3',
    content: {
      title: '[[Pronunciation: Occupations|Pronunciación: Ocupaciones]]',
      instructions: '[[Listen to the phrase and repeat it clearly.|Escucha la frase y repítela con claridad.]]',
      expectedResponse: 'I am a student.',
      evaluationCriteria: [
        '[[Clear diphthong /aɪ/ in "I"|Diptongo /aɪ/ claro en "I"]]',
        '[[Stress on the first syllable of "student" (/ˈstjuːdənt/)|Acento tónico en la primera sílaba de "student" (/ˈstjuːdənt/)]]',
        '[[Soft but present final /t/ sound|Sonido /t/ final suave pero presente]]'
      ]
    }
  },
  {
    id: 'a1-u1-e72',
    type: 'pronunciation',
    level: 'A1',
    topicName: 'Pronunciation',
    transcript: 'Good morning.',
    audioUrl: 'audio/a1/unit-1/e72.mp3',
    content: {
      title: '[[Pronunciation: Time of Day|Pronunciación: Momento del día]]',
      instructions: '[[Listen to the phrase and repeat it clearly.|Escucha la frase y repítela con claridad.]]',
      expectedResponse: 'Good morning.',
      evaluationCriteria: [
        '[[Short vowel /ʊ/ in "Good"|Vocal corta /ʊ/ en "Good"]]',
        '[[Stress on "morn" (/ˈmɔːrnɪŋ/)|Acento tónico en "morn" (/ˈmɔːrnɪŋ/)]]',
        '[[Nasal /ŋ/ sound at the end of "morning"|Sonido /ŋ/ nasal al final de "morning"]]'
      ]
    }
  },
  {
    id: 'a1-u1-e73',
    type: 'pronunciation',
    level: 'A1',
    topicName: 'Pronunciation',
    transcript: 'See you later.',
    audioUrl: 'audio/a1/unit-1/e73.mp3',
    content: {
      title: '[[Pronunciation: Farewells|Pronunciación: Despedidas]]',
      instructions: '[[Listen to the phrase and repeat it clearly.|Escucha la frase y repítela con claridad.]]',
      expectedResponse: 'See you later.',
      evaluationCriteria: [
        '[[Long vowel /iː/ in "See"|Vocal larga /iː/ en "See"]]',
        '[[Diphthong /eɪ/ in "later" (/ˈleɪtər/)|Diptongo /eɪ/ en "later" (/ˈleɪtər/)]]',
        '[[Typical falling intonation for a statement/farewell|Entonación descendente típica de una afirmación/despedida]]'
      ]
    }
  },
  {
    id: 'a1-u1-e74',
    type: 'pronunciation',
    level: 'A1',
    topicName: 'Pronunciation',
    transcript: 'He is my friend.',
    audioUrl: 'audio/a1/unit-1/e74.mp3',
    content: {
      title: '[[Pronunciation: Relationships|Pronunciación: Relaciones]]',
      instructions: '[[Listen to the phrase and repeat it clearly.|Escucha la frase y repítela con claridad.]]',
      expectedResponse: 'He is my friend.',
      evaluationCriteria: [
        '[[Aspirated /h/ sound in "He"|Sonido /h/ aspirado en "He"]]',
        '[[Short vowel /ɪ/ in "is"|Vocal corta /ɪ/ en "is"]]',
        '[[Final /d/ sound in "friend"|Sonido /d/ final en "friend"]]'
      ]
    }
  },
  {
    id: 'a1-u1-e75',
    type: 'pronunciation',
    level: 'A1',
    topicName: 'Pronunciation',
    transcript: 'It is blue.',
    audioUrl: 'audio/a1/unit-1/e75.mp3',
    content: {
      title: '[[Pronunciation: Colors|Pronunciación: Colores]]',
      instructions: '[[Listen to the phrase and repeat it clearly.|Escucha la frase y repítela con claridad.]]',
      expectedResponse: 'It is blue.',
      evaluationCriteria: [
        '[[Short vowel /ɪ/ in "It"|Vocal corta /ɪ/ en "It"]]',
        '[[Long vowel /uː/ in "blue"|Vocal larga /uː/ en "blue"]]',
        '[[Smooth joining between "It" and "is"|Unión suave entre "It" e "is"]]'
      ]
    }
  }
];

export const A1_M1_L1_ALL_EXERCISES: Exercise[] = [
  ...INDIVIDUAL_GRAMMAR_EXERCISES,
  ...READING_EXERCISES,
  ...ADDITIONAL_READINGS,
  ...LISTENING_AND_PRONUNCIATION
];
