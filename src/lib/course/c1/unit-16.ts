/**
 * C1 Unit 16 — Music and the Performing Arts
 * Module 3: Performance and Expression
 * Grammar: Advanced passive voice (impersonal passive, have/get sth done)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Music and the Performing Arts';

export const UNIT_16_EXERCISES: Exercise[] = [
{
    id: 'c1-u16-g1', type: 'multiple-choice', level: 'C1', topic: 'advanced-passive', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Advanced Passive Voice|Voz pasiva avanzada]]', instructions: 'Choose the correct impersonal passive form.',
      questions: [{ question: 'Everyone believes the premiere will be a watershed moment in contemporary opera. Rewrite using an impersonal passive:', options: ['[[It is believed that the premiere will be a watershed moment in contemporary opera.|Se cree que el estreno será un momento decisivo en la ópera contemporánea.]]', '[[The premiere is believed by everyone to be a watershed moment in contemporary opera.|Todos creen que el estreno será un momento decisivo en la ópera contemporánea.]]', '[[There is believed a watershed moment with the premiere in contemporary opera.|Se cree que habrá un momento decisivo con el estreno en la ópera contemporánea.]]'], correctAnswer: 0, explanation: '"It is believed/reported/said + that-clause" = impersonal passive for distancing or reporting views formally.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u16-g2', type: 'fill-blank', level: 'C1', topic: 'advanced-passive', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Have/Get Something Done|Hacer que se haga algo]]', instructions: 'Complete with the correct causative structure.',
      questions: [{ question: 'She _______ her violin _______ by the finest luthier in Vienna before the world tour began.', options: ['[[had / restored|mandó / restaurar]]', '[[got / to restore|consiguió / restaurar]]', '[[made / restored|hizo / restaurar]]'], correctAnswer: 'had / restored', acceptableAnswers: ['had / restored'], explanation: '"Have + object + past participle" = causative passive: she arranged for someone else to restore it.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u16-g3', type: 'multiple-choice', level: 'C1', topic: 'advanced-passive', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Passive with Reporting Verbs|Pasiva con verbos de reporte]]', instructions: 'Choose the correct form.',
      questions: [{ question: 'People say the young conductor shows extraordinary promise. Which passive form correctly uses a to-infinitive?', options: ['[[The young conductor is said to show extraordinary promise.|Se dice que el joven director muestra un talento extraordinario.]]', '[[It is said the young conductor shows extraordinary promise.|Se dice que el joven director muestra un talento extraordinario.]]', '[[The young conductor has been said showing extraordinary promise.|Se ha dicho que el joven director está mostrando un talento extraordinario.]]'], correctAnswer: 0, explanation: '"Subject + passive reporting verb + to-infinitive" = formal structure for distancing; "is said to show".' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u16-v1', type: 'multiple-choice', level: 'C1', topic: 'music-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Music and Performance|Música y actuación]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'The _______ of the performance — the tension, the release, the silences — was so precisely calibrated that it held the audience in complete stillness throughout.', options: ['[[pacing|ritmo/cadencia]]', '[[timing|sincronización]]', '[[tempo|tempo]]'], correctAnswer: 0, explanation: '"Pacing" = the control of speed, rhythm and progression in a performance to create emotional impact.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u16-v2', type: 'fill-blank', level: 'C1', topic: 'music-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Music Theory|Teoría musical]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The piece opens with a _______ theme — a brief, repeated motif that undergoes continuous variation and development throughout the four movements.', options: ['[[leitmotif|leitmotiv]]', '[[cadenza|cadencia]]', '[[overture|obertura]]'], correctAnswer: 'leitmotif', acceptableAnswers: ['leitmotif', 'leitmotiv'], explanation: '"Leitmotif" = a recurring musical theme associated with a particular character, idea or situation, especially in opera.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u16-v3', type: 'multiple-choice', level: 'C1', topic: 'music-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Performing Arts|Artes escénicas]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'The soprano\'s voice was remarkable for its extraordinary _______ — she could move seamlessly from hushed pianissimo to full dramatic fortissimo without any loss of tonal quality.', options: ['[[range|registro/extensión]]', '[[pitch|tono]]', '[[timbre|timbre]]'], correctAnswer: 0, explanation: '"Range" in music = the span of notes a voice or instrument can produce, from lowest to highest.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u16-r1', type: 'reading-comprehension', level: 'C1', topic: 'music-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Music and Emotion|Música y emoción]]', instructions: 'Read the extract and answer the question.',
      questions: [{ question: 'Text: "Music\'s capacity to evoke intense emotion remains scientifically puzzling precisely because its power appears to transcend cultural boundaries. While specific melodic and harmonic conventions vary between cultures, the basic emotional responses to tension, resolution and rhythmic drive appear to be near-universal, suggesting a biological rather than purely learned basis for musical experience."\n\nWhat puzzle does the text describe?', options: ['[[Why musical conventions such as melody, harmony and rhythm differ so significantly between cultures around the world.|Por qué las convenciones musicales como la melodía, la armonía y el ritmo difieren tan significativamente entre culturas de todo el mundo.]]', '[[Why music provokes powerful emotional responses across cultures despite the cultural variation in musical conventions themselves.|Por qué la música provoca respuestas emocionales poderosas en todas las culturas a pesar de la variación cultural en las propias convenciones musicales.]]', '[[Why tension and resolution are the most fundamental building blocks of musical experience regardless of cultural and historical context.|Por qué la tensión y la resolución son los bloques de construcción más fundamentales de la experiencia musical independientemente del contexto cultural e histórico.]]'], correctAnswer: 1, explanation: 'The puzzle is that emotional responses to music are near-universal despite musical conventions varying across cultures.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u16-r2', type: 'multiple-choice', level: 'C1', topic: 'music-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Music and Technology|Música y tecnología]]', instructions: 'Choose the best answer.',
      questions: [{ question: 'Text: "Streaming has transformed the economics of the music industry in ways that are simultaneously democratising and extractive. Artists can reach a global audience without the gatekeeping of major labels, yet the per-stream royalty rates are so low that only those at the very top of the algorithmic hierarchy can sustain a viable living from streaming income alone."\n\nWhat is the author\'s position on streaming?', options: ['[[Streaming is entirely positive because it has removed the power of major labels and given all artists equal access to global audiences.|La transmisión por internet es completamente positiva porque ha eliminado el poder de las grandes discográficas y ha dado a todos los artistas igual acceso al público mundial.]]', '[[Streaming presents a contradictory reality: it opens access for artists but its financial model disproportionately rewards only the most prominent, limiting income for most.|La transmisión presenta una realidad contradictoria: abre el acceso a los artistas pero su modelo financiero recompensa desproporcionadamente solo a los más prominentes, limitando los ingresos para la mayoría.]]', '[[Streaming has simply replaced the gatekeeping power of major labels with a different but equally rigid system controlled by algorithms and data analytics companies.|La transmisión simplemente ha reemplazado el poder de control de las grandes discográficas con un sistema diferente pero igualmente rígido controlado por algoritmos y empresas de análisis de datos.]]'], correctAnswer: 1, explanation: 'The author uses "simultaneously democratising and extractive" — both positive and negative, which maps to option B.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u16-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'music-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Music and the Performing Arts), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u16-l1', type: 'listening-comprehension', level: 'C1', topic: 'music-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Music Criticism|Crítica musical]]', instructions: 'Listen and choose the correct answer.',
      questions: [{ question: 'A music critic says: "What distinguishes a truly great performance is not technical perfection — machines can achieve that — but the quality of musical judgement: the thousands of micro-decisions about timing, weight and colour that collectively create meaning rather than merely reproducing notes."\n\nWhat does the critic value most in a performance?', options: ['[[Technical accuracy and the faithful reproduction of every note and dynamic marking exactly as the composer specified them.|La precisión técnica y la reproducción fiel de cada nota y marcación dinámica exactamente como las especificó el compositor.]]', '[[The interpretive and expressive choices a performer makes, which shape how music communicates meaning beyond mechanical accuracy.|Las elecciones interpretativas y expresivas que hace el intérprete, que determinan cómo la música comunica significado más allá de la precisión mecánica.]]', '[[The emotional authenticity of the performer, expressed through visible physical gestures and facial expressions during the live performance.|La autenticidad emocional del intérprete, expresada a través de gestos físicos visibles y expresiones faciales durante la actuación en vivo.]]'], correctAnswer: 1, explanation: 'The critic contrasts machines (technical) with judgement (interpretive choices about timing, weight, colour = meaning-making).' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u16-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'music-listening',
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
    id: 'c1-u16-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'music-listening',
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
    id: 'c1-u16-w1', type: 'multiple-choice', level: 'C1', topic: 'review-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Concert Review|Reseña de concierto]]', instructions: 'Choose the best sentence to develop a critical point in a concert review.',
      questions: [{ question: 'You want to express a nuanced criticism of a technically excellent but emotionally cold performance. Choose the best sentence:', options: ['[[The performance was technically impeccable, yet this very perfection ultimately worked against it: there was a glassiness to the playing — pristine, precise, but somehow sealed off from the messy emotional truth that Brahms\' late works demand.|La actuación fue técnicamente impecable, pero esta misma perfección finalmente trabajó en su contra: había una frialdad vidriosa en el toque — prístino, preciso, pero de alguna manera ajeno a la verdad emocional desordenada que exigen las últimas obras de Brahms.]]', '[[The performance was very good technically but it was a bit cold and emotionally it could have been better. The pianist played all the notes perfectly but there was not much feeling in the music.|La actuación fue muy buena técnicamente pero un poco fría y emocionalmente podría haber sido mejor. La pianista tocó todas las notas perfectamente pero no había mucho sentimiento en la música.]]', '[[The performance was excellent and technically brilliant. However, some audience members may have found it a little too perfect and perhaps lacking in personal expression and emotional depth throughout.|La actuación fue excelente y técnicamente brillante. Sin embargo, algunos miembros del público pueden haber encontrado que era demasiado perfecta y quizás algo carente de expresión personal y profundidad emocional.]]'], correctAnswer: 0, explanation: 'Option A uses a specific metaphor ("glassiness"), an em dash for elaboration, and sophisticated vocabulary — demonstrating C1 critical writing.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u16-w2',
    type: 'writing',
    level: 'C1',
    topic: 'review-writing',
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
    id: 'c1-u16-w3',
    type: 'writing',
    level: 'C1',
    topic: 'review-writing',
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
