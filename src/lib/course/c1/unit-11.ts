/**
 * C1 Unit 11 — Education and Learning
 * Module 2: Society and Knowledge
 * Grammar: Cleft sentences (It is/was … that/who)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Education and Learning';

export const UNIT_11_EXERCISES: Exercise[] = [
{
    id: 'c1-u11-g1', type: 'multiple-choice', level: 'C1', topic: 'cleft-sentences', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Cleft Sentences|Oraciones escindidas]]', instructions: 'Choose the correct cleft sentence.',
      questions: [{ question: 'We want to emphasise that the TEACHER, not the students, made the mistake. Which cleft sentence is correct?', options: ['[[It was the teacher who made the mistake, not the students.|Fue el profesor quien cometió el error, no los alumnos.]]', '[[It is the teacher that is making the mistake, not the students.|Es el profesor quien está cometiendo el error, no los alumnos.]]', '[[It was the mistake that the teacher made, not the students.|Fue el error el que cometió el profesor, no los alumnos.]]'], correctAnswer: 0, explanation: '"It was + focus + who/that" emphasises the subject. Past tense because the action is past.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u11-g2', type: 'fill-blank', level: 'C1', topic: 'cleft-sentences', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Cleft Sentences|Oraciones escindidas]]', instructions: 'Complete the cleft sentence.',
      questions: [{ question: '_______ _______ she said that surprised everyone — it was the way she said it.', options: ["[[It wasn't|No fue]]", "[[It wasn't what|No fue lo que]]", '[[What was not|Lo que no fue]]'], correctAnswer: "It wasn't what", acceptableAnswers: ["It wasn't what", "It was not what"], explanation: '"It wasn\'t what she said" = cleft with embedded wh-clause focusing on the object.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u11-g3', type: 'multiple-choice', level: 'C1', topic: 'cleft-sentences', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Cleft Sentences|Oraciones escindidas]]', instructions: 'Choose the most natural cleft sentence.',
      questions: [{ question: 'Emphasise that she enrolled at Oxford — not Cambridge — in 1998:', options: ['[[It was Oxford where she enrolled, not Cambridge, in 1998.|Fue en Oxford donde se matriculó, no en Cambridge, en 1998.]]', '[[It was Oxford that she enrolled at in 1998, not Cambridge.|Fue en Oxford donde se matriculó en 1998, no en Cambridge.]]', '[[It was 1998 when she enrolled at Oxford, not Cambridge.|Fue en 1998 cuando se matriculó en Oxford, no en Cambridge.]]'], correctAnswer: 1, explanation: '"It was Oxford that she enrolled at" = cleft sentence emphasising place (Oxford) as the focus.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u11-v1', type: 'multiple-choice', level: 'C1', topic: 'education-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Education and Learning|Educación y aprendizaje]]', instructions: 'Choose the word that best completes the sentence.',
      questions: [{ question: 'The university operates on a _______ approach, combining traditional lectures with problem-based learning and self-directed study.', options: ['[[pedagogical|pedagógico]]', '[[blended|mixto]]', '[[rigorous|riguroso]]'], correctAnswer: 1, explanation: '"Blended approach/learning" = a teaching method that combines face-to-face and independent/online learning.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u11-v2', type: 'fill-blank', level: 'C1', topic: 'education-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Education and Learning|Educación y aprendizaje]]', instructions: 'Complete the sentence with the correct academic word.',
      questions: [{ question: 'Good critical thinking requires the ability to _______ evidence and evaluate arguments rather than simply accepting information at face value.', options: ['[[scrutinise|examinar críticamente]]', '[[memorise|memorizar]]', '[[transcribe|transcribir]]'], correctAnswer: 'scrutinise', acceptableAnswers: ['scrutinise', 'scrutinize'], explanation: '"Scrutinise" = to examine something very carefully and critically.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u11-v3', type: 'multiple-choice', level: 'C1', topic: 'education-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Education and Learning|Educación y aprendizaje]]', instructions: 'Choose the correct collocation.',
      questions: [{ question: 'The professor _______ new light on the topic by presenting research that challenged long-held assumptions.', options: ['[[shed|arrojó]]', '[[cast|proyectó]]', '[[threw|lanzó]]'], correctAnswer: 0, explanation: '"Shed new light on something" = to provide a new and clearer understanding. Fixed collocation.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u11-r1', type: 'reading-comprehension', level: 'C1', topic: 'education-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Education Systems|Sistemas educativos]]', instructions: 'Read the extract and choose the best answer.',
      questions: [{ question: 'Text: "The Finnish model of education, widely admired for its consistently high outcomes, rests not on standardised testing or competitive ranking, but on deep trust in teachers as autonomous professionals and a firm belief that equity and excellence are not mutually exclusive."\n\nWhat is the key principle of Finnish education according to the text?', options: ['[[Regular standardised testing ensures consistently high outcomes across all schools.|Las evaluaciones estandarizadas regulares garantizan resultados consistentemente altos en todas las escuelas.]]', '[[Teacher autonomy and a commitment to equity underpin its success rather than competition or ranking.|La autonomía docente y el compromiso con la equidad sustentan su éxito más que la competencia o la clasificación.]]', '[[It has succeeded by combining competitive ranking systems with a strong focus on academic excellence.|Ha tenido éxito combinando sistemas de clasificación competitivos con un fuerte enfoque en la excelencia académica.]]'], correctAnswer: 1, explanation: 'The text explicitly says the model rests on trust in teachers and belief that equity and excellence can coexist.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u11-r2', type: 'multiple-choice', level: 'C1', topic: 'education-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Education Systems|Sistemas educativos]]', instructions: 'Read and answer the question.',
      questions: [{ question: 'Text: "Critics of progressive education argue that it prioritises creativity and personal development at the expense of academic rigour, leaving students ill-equipped for the demands of higher education and professional life."\n\nWhat does "at the expense of" mean in this context?', options: ['[[while financing academic rigour through creative programmes|mientras financia el rigor académico a través de programas creativos]]', '[[by sacrificing or undermining academic rigour in order to achieve something else|sacrificando o menoscabando el rigor académico para lograr otra cosa]]', '[[in addition to and in support of academic rigour and discipline|además de y en apoyo del rigor académico y la disciplina]]'], correctAnswer: 1, explanation: '"At the expense of" = causing harm to something else in order to achieve a goal; here, sacrificing rigour.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u11-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'education-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Education and Learning), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u11-l1', type: 'listening-comprehension', level: 'C1', topic: 'education-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Rethinking Assessment|Repensar la evaluación]]', instructions: 'Listen to the professor and choose the correct answer.',
      questions: [{ question: 'A professor says: "What concerns me about purely summative assessment is that it captures a snapshot of performance under pressure rather than the depth of understanding a student has developed over time."\n\nWhat is the professor\'s main concern?', options: ['[[Students perform worse when under pressure during exams, so summative tests are an unfair measure.|Los alumnos rinden peor bajo presión durante los exámenes, por lo que los exámenes sumativos son una medida injusta.]]', '[[End-of-course tests may not accurately reflect the genuine learning a student has achieved throughout the course.|Los exámenes finales pueden no reflejar con precisión el aprendizaje genuino que un estudiante ha logrado a lo largo del curso.]]', '[[Continuous assessment is always superior to summative tests because it reduces student anxiety effectively.|La evaluación continua es siempre superior a los exámenes sumativos porque reduce eficazmente la ansiedad del alumnado.]]'], correctAnswer: 1, explanation: 'The professor says summative assessment captures a "snapshot under pressure", not the depth of understanding developed over time.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u11-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'education-listening',
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
    id: 'c1-u11-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'education-listening',
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
    id: 'c1-u11-w1', type: 'multiple-choice', level: 'C1', topic: 'academic-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Academic Essay Structure|Estructura del ensayo académico]]', instructions: 'Choose the sentence that best develops an academic argument at C1 level.',
      questions: [{ question: 'You are writing about whether exams should be replaced by continuous assessment. Choose the best sentence to introduce a counterargument:', options: ['[[While there is considerable merit in the argument for continuous assessment, it would be an oversimplification to dismiss examinations entirely, given that they cultivate skills of synthesis, time management and performance under constraint.|Si bien hay considerable mérito en el argumento a favor de la evaluación continua, sería una simplificación excesiva descartar los exámenes por completo, dado que cultivan habilidades de síntesis, gestión del tiempo y rendimiento bajo presión.]]', '[[Some people think exams are good and should be kept, but others strongly disagree and prefer continuous assessment instead.|Algunas personas creen que los exámenes son buenos y deben mantenerse, pero otras están en desacuerdo y prefieren la evaluación continua.]]', '[[Exams are very important in education and have always been used, so they should definitely continue to be used in schools and universities everywhere.|Los exámenes son muy importantes en la educación y siempre se han utilizado, por lo que definitivamente deben seguir usándose en escuelas y universidades.]]'], correctAnswer: 0, explanation: 'Option A introduces the counterargument with hedging ("while there is merit"), uses nominalisation and a complex conjunction ("given that").' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u11-w2',
    type: 'writing',
    level: 'C1',
    topic: 'academic-writing',
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
    id: 'c1-u11-w3',
    type: 'writing',
    level: 'C1',
    topic: 'academic-writing',
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
