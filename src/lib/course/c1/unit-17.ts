/**
 * C1 Unit 17 — Literature and Storytelling
 * Module 3: Performance and Expression
 * Grammar: Reported speech — complex structures and tense shifts
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Literature and Storytelling';

export const UNIT_17_EXERCISES: Exercise[] = [
{
    id: 'c1-u17-g1', type: 'multiple-choice', level: 'C1', topic: 'reported-speech', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Reported Speech|Estilo indirecto]]', instructions: 'Choose the correct reported speech form.',
      questions: [{ question: 'The author said: "I have always believed that fiction reveals truths that facts cannot." Report this correctly:', options: ["[[The author said that she had always believed that fiction revealed truths that facts couldn't.|La autora dijo que siempre había creído que la ficción revelaba verdades que los hechos no podían.]]", "[[The author said that she has always believed that fiction reveals truths that facts can't.|La autora dijo que siempre ha creído que la ficción revela verdades que los hechos no pueden.]]", "[[The author told that she had always believed that fiction was revealing truths that facts couldn't.|La autora dijo que siempre había creído que la ficción estaba revelando verdades que los hechos no podían.]]"], correctAnswer: 0, explanation: 'Backshift: present perfect → past perfect; present simple → past simple; can → could. "Tell" requires an object; "said (that)" does not.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u17-g2', type: 'fill-blank', level: 'C1', topic: 'reported-speech', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Reported Questions|Preguntas en estilo indirecto]]', instructions: 'Report the question using the correct word order.',
      questions: [{ question: 'The interviewer asked: "What does narrative structure mean to you as a writer?" Report this question correctly: The interviewer asked what narrative structure _______ to her as a writer.', options: ['[[meant|significaba]]', '[[means|significa]]', '[[did mean|significó]]'], correctAnswer: 'meant', acceptableAnswers: ['meant'], explanation: 'In reported questions, the verb backshifts (means → meant) and word order is statement order (not inversion).' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u17-g3', type: 'multiple-choice', level: 'C1', topic: 'reported-speech', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Reporting Verbs|Verbos de reporte]]', instructions: 'Choose the correct reporting structure.',
      questions: [{ question: 'The editor said to the author: "You must cut the final chapter completely." Which report is correct?', options: ['[[The editor insisted that the author cut the final chapter completely.|El editor insistió en que la autora eliminara el último capítulo por completo.]]', '[[The editor insisted the author to cut the final chapter completely.|El editor insistió en que la autora cortara el último capítulo por completo.]]', '[[The editor insisted the author must cut the final chapter completely.|El editor insistió en que la autora debía cortar el último capítulo por completo.]]'], correctAnswer: 0, explanation: '"Insist that + subject + bare infinitive" (subjunctive) = correct. "Insist + to-infinitive" is not standard.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u17-v1', type: 'multiple-choice', level: 'C1', topic: 'literature-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Literary Terms|Términos literarios]]', instructions: 'Choose the correct literary term.',
      questions: [{ question: 'The technique by which a narrative moves between different time periods, disrupting chronological order to create thematic connections, is called:', options: ['[[anachrony|anacronía]]', '[[foreshadowing|presagio]]', '[[stream of consciousness|flujo de conciencia]]'], correctAnswer: 0, explanation: '"Anachrony" = any disruption of chronological order in narrative, including flashbacks (analepsis) and flash-forwards (prolepsis).' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u17-v2', type: 'fill-blank', level: 'C1', topic: 'literature-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Literary Terms|Términos literarios]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The novel employs an _______ narrator — a voice that is biased, limited in knowledge, or emotionally compromised, requiring the reader to read between the lines to discover the fuller truth.', options: ['[[unreliable|no fiable]]', '[[omniscient|omnisciente]]', '[[intrusive|intrusivo]]'], correctAnswer: 'unreliable', acceptableAnswers: ['unreliable'], explanation: '"Unreliable narrator" = a narrator whose credibility is compromised; requires the reader to interpret beyond what is stated.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u17-v3', type: 'multiple-choice', level: 'C1', topic: 'literature-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Literary Analysis|Análisis literario]]', instructions: 'Choose the correct literary term.',
      questions: [{ question: 'When one element of a text — an object, a colour or a recurring motif — carries a meaning beyond its literal significance, it functions as a:', options: ['[[symbol|símbolo]]', '[[simile|símil]]', '[[motif|motivo]]'], correctAnswer: 0, explanation: '"Symbol" = an object or image that represents something beyond its literal meaning, typically an abstract idea or value.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u17-r1', type: 'reading-comprehension', level: 'C1', topic: 'literature-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Power of Fiction|El poder de la ficción]]', instructions: 'Read the extract and answer the question.',
      questions: [{ question: 'Text: "What literature does that no other art form can quite replicate is grant us unmediated access to another consciousness — not the filtered version of a person they choose to present to the world, but the raw, contradictory, morally ambiguous interior of a thinking, feeling mind. In this sense, a great novel is less a story than a consciousness simulator."\n\nWhat claim does the author make about literature?', options: ['[[That literature is superior to all other art forms because it is more morally complex and psychologically truthful in its exploration of human nature.|Que la literatura es superior a todas las demás formas de arte porque es más moralmente compleja y psicológicamente veraz en su exploración de la naturaleza humana.]]', '[[That literature uniquely allows readers direct access to an interior consciousness — the private, unfiltered experience of another mind — in a way other art forms cannot.|Que la literatura permite de forma única a los lectores acceso directo a una conciencia interior — la experiencia privada y sin filtros de otra mente — de una manera que otras formas de arte no pueden.]]', '[[That the primary value of literature is its ability to simulate consciousness and thus provide readers with a form of psychological therapy and emotional self-understanding.|Que el valor primario de la literatura es su capacidad de simular la conciencia y así proporcionar a los lectores una forma de terapia psicológica y autocomprensión emocional.]]'], correctAnswer: 1, explanation: 'The author claims literature grants "unmediated access to another consciousness" — the key phrase describing what no other art can replicate.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u17-r2', type: 'multiple-choice', level: 'C1', topic: 'literature-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Narrative and Truth|Narrativa y verdad]]', instructions: 'Choose the best answer.',
      questions: [{ question: 'Text: "The distinction between fiction and non-fiction is less stable than it appears. All narrative involves selection, omission and framing — choices that shape meaning as surely as any invented detail. The memoirist who reconstructs dialogue from memory and the novelist who draws on lived experience are both, in different proportions, making things up."\n\nWhat is the author arguing?', options: ['[[That memoir and biography are fundamentally unreliable because the authors inevitably invent details that they cannot accurately remember from the past.|Que las memorias y las biografías son fundamentalmente poco fiables porque los autores inevitablemente inventan detalles que no pueden recordar con precisión del pasado.]]', '[[That the boundary between fiction and non-fiction is blurred because all narrative involves constructive choices that shape reality, not merely record it.|Que la frontera entre ficción y no ficción es borrosa porque toda narrativa implica elecciones constructivas que dan forma a la realidad, no simplemente la registran.]]', '[[That novelists and memoirists use identical techniques because both draw from personal experience and must reconstruct events they cannot fully verify.|Que los novelistas y los memorialistas usan técnicas idénticas porque ambos se basan en la experiencia personal y deben reconstruir eventos que no pueden verificar completamente.]]'], correctAnswer: 1, explanation: 'The author argues the fiction/non-fiction distinction is unstable because both involve selection and shaping — not just recording.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u17-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'literature-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Literature and Storytelling), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u17-l1', type: 'listening-comprehension', level: 'C1', topic: 'literature-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Author Interview|Entrevista con autor]]', instructions: 'Listen and choose the correct answer.',
      questions: [{ question: 'An author says: "I am always suspicious of writers who claim their characters \'took over\' and \'wrote themselves\'. It is a charming mystification, but it obscures the real craft — the thousands of deliberate decisions that make a character feel inevitable."\n\nWhat is the author\'s view of character development?', options: ['[[Characters in fiction are genuinely autonomous and do sometimes take over from the writer, producing unexpected and surprising narrative developments.|Los personajes de ficción son genuinamente autónomos y a veces sí toman el control del escritor, produciendo desarrollos narrativos inesperados y sorprendentes.]]', '[[The idea that characters write themselves is a romantic myth that conceals the careful, conscious craft involved in making a character feel authentic and inevitable.|La idea de que los personajes se escriben solos es un mito romántico que oculta el cuidadoso y consciente arte que supone hacer que un personaje parezca auténtico e inevitable.]]', '[[Writers should resist making deliberate decisions about their characters and instead allow the unconscious to guide the narrative towards its natural destination.|Los escritores deberían resistirse a tomar decisiones deliberadas sobre sus personajes y en cambio dejar que el inconsciente guíe la narrativa hacia su destino natural.]]'], correctAnswer: 1, explanation: 'The author calls the "characters took over" claim a "charming mystification" and stresses deliberate decisions — so writing is conscious craft, not mystical inspiration.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u17-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'literature-listening',
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
    id: 'c1-u17-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'literature-listening',
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
    id: 'c1-u17-w1', type: 'multiple-choice', level: 'C1', topic: 'literary-analysis-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Literary Analysis|Análisis literario]]', instructions: 'Choose the best analytical sentence.',
      questions: [{ question: 'You are analysing the use of an unreliable narrator in a novel. Choose the sentence that best demonstrates C1 analytical writing:', options: ['[[Fitzgerald\'s deployment of Nick Carraway as narrator is a masterstroke of unreliability: his self-professed honesty is systematically undermined by his social sycophancy, rendering him simultaneously an intimate witness and a morally compromised one.|El despliegue de Fitzgerald de Nick Carraway como narrador es una brillante maniobra de no fiabilidad: su honestidad autoproclamada está sistemáticamente socavada por su servilismo social, convirtiéndole simultáneamente en testigo íntimo y moralmente comprometido.]]', '[[Nick Carraway is not a reliable narrator in the novel because he is too friendly with Gatsby and does not tell the reader everything that is happening. The reader has to read carefully to understand the full truth.|Nick Carraway no es un narrador fiable en la novela porque es demasiado amigo de Gatsby y no le cuenta al lector todo lo que está pasando. El lector tiene que leer con cuidado para entender la verdad completa.]]', '[[The author uses an unreliable narrator which is interesting because the reader cannot trust everything they are told. This makes the novel more complex and the reader has to think more carefully about what is true and what is not.|El autor usa un narrador no fiable lo cual es interesante porque el lector no puede confiar en todo lo que se le dice. Esto hace la novela más compleja y el lector tiene que pensar más cuidadosamente sobre qué es verdad y qué no.]]'], correctAnswer: 0, explanation: 'Option A uses precise literary vocabulary ("deployment", "self-professed", "sycophancy"), makes a specific textual point, and builds a complex argument concisely.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u17-w2',
    type: 'writing',
    level: 'C1',
    topic: 'literary-analysis-writing',
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
    id: 'c1-u17-w3',
    type: 'writing',
    level: 'C1',
    topic: 'literary-analysis-writing',
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
