/**
 * C1 Unit 28 — Dance and Choreography
 * Module 5: Arts and Culture
 * Grammar: Advanced inversion — Not until / Only when / Hardly had...when / No sooner...than
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Dance and Choreography';

export const UNIT_28_EXERCISES: Exercise[] = [
{
    id: 'c1-u28-g1', type: 'multiple-choice', level: 'C1', topic: 'advanced-inversion', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Advanced Inversion|Inversión avanzada]]', instructions: 'Choose the sentence with correct inversion.',
      questions: [{ question: 'Which sentence correctly uses "Hardly...when" inversion?', options: ['[[Hardly had the curtain risen when the audience sensed they were witnessing something extraordinary — a performance of such controlled ferocity that it seemed to redefine what the human body could express.|Apenas había subido el telón cuando el público sintió que estaba presenciando algo extraordinario, una actuación de tal ferocidad controlada que parecía redefinir lo que el cuerpo humano podía expresar.]]', '[[Hardly the curtain had risen when the audience sensed they were witnessing something extraordinary, a performance of such controlled ferocity.|Apenas el telón había subido cuando el público sintió que estaba presenciando algo extraordinario, una actuación de tal ferocidad controlada.]]', '[[Hardly had the curtain risen than the audience sensed they were witnessing something extraordinary and a performance of such controlled ferocity.|Apenas había subido el telón que el público sintió que estaba presenciando algo extraordinario y una actuación de tal ferocidad controlada.]]'], correctAnswer: 0, explanation: '"Hardly + had + subject + past participle + when + past simple" = correct. "Hardly...when" (not "than"). Inversion: auxiliary (had) before subject.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u28-g2', type: 'fill-blank', level: 'C1', topic: 'advanced-inversion', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[No Sooner...Than|No bien... cuando]]', instructions: 'Complete the sentence correctly.',
      questions: [{ question: 'No sooner _______ the final note of the score than the entire company froze in a tableau that somehow encapsulated the emotional journey of the entire performance.', options: ['[[had faded|se había desvanecido]]', '[[faded|se desvaneció]]', '[[has faded|se ha desvanecido]]'], correctAnswer: 'had faded', acceptableAnswers: ['had faded'], explanation: '"No sooner + had + subject + past participle + than + past simple" = correct inversion structure. "No sooner...than" always uses past perfect in the first clause.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u28-g3', type: 'multiple-choice', level: 'C1', topic: 'advanced-inversion', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Not Until Inversion|Inversión con Not Until]]', instructions: 'Choose the correct inversion.',
      questions: [{ question: 'Which sentence uses "Not until" inversion correctly?', options: ['[[Not until Pina Bausch began her tenure at the Wuppertal Tanztheater did European dance theatre fully abandon the primacy of technique and begin to explore autobiography, trauma and raw emotion as choreographic material.|No fue hasta que Pina Bausch comenzó su mandato en el Tanztheater de Wuppertal cuando el teatro de danza europeo abandonó plenamente la primacía de la técnica y comenzó a explorar la autobiografía, el trauma y la emoción bruta.]]', '[[Not until Pina Bausch began her tenure at the Wuppertal Tanztheater European dance theatre did fully abandon the primacy of technique and begin to explore autobiography and trauma.|No fue hasta que Pina Bausch comenzó su mandato en el Tanztheater de Wuppertal cuando el teatro de danza europeo abandonó plenamente la primacía de la técnica y comenzó a explorar la autobiografía.]]', '[[Not until did Pina Bausch begin her tenure at the Wuppertal Tanztheater that European dance theatre fully abandoned the primacy of technique and began to explore autobiography and trauma.|No fue hasta que Pina Bausch comenzó su mandato en el Tanztheater de Wuppertal que el teatro de danza europeo abandonó plenamente la primacía de la técnica.]]'], correctAnswer: 0, explanation: '"Not until + time clause + inverted auxiliary + subject" = correct. The inversion (did... abandon) comes in the main clause. Options B and C both misplace the inversion.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u28-v1', type: 'multiple-choice', level: 'C1', topic: 'dance-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Dance and Choreography|Danza y coreografía]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'The _______ — the underlying pulse or beat that runs through a piece of music and to which a dancer\'s movement is timed — is one of the most fundamental elements in the relationship between dance and music.', options: ['[[metre|métrica]]', '[[tempo|tempo]]', '[[rhythm|ritmo]]'], correctAnswer: 1, explanation: '"Tempo" = the speed or pace of a piece of music. "Metre" = the pattern of beats/accents. "Rhythm" = the pattern of long and short sounds. Tempo is the "pulse" to which movement is timed.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u28-v2', type: 'fill-blank', level: 'C1', topic: 'dance-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Dance Styles|Estilos de danza]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'Contemporary dance, as distinct from both classical ballet and modern dance, tends to resist codified _______ — fixed technical systems of movement — in favour of a more pluralistic approach that draws on multiple traditions and everyday gesture.', options: ['[[technique|técnica]]', '[[vocabulary|vocabulario]]', '[[choreography|coreografía]]'], correctAnswer: 'technique', acceptableAnswers: ['technique', 'vocabulary', 'form'], explanation: '"Codified technique" = a fixed, systematic vocabulary of movement (as in classical ballet\'s five positions). Contemporary dance resists such codification.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u28-v3', type: 'multiple-choice', level: 'C1', topic: 'dance-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Dance Theory|Teoría de la danza]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The term _______ refers to the lived, subjective experience of one\'s own body in movement — the felt sense of physical existence that dance, more than most art forms, is uniquely positioned to explore.', options: ['[[kinesthesia|kinestesia]]', '[[proprioception|propiocepción]]', '[[embodiment|corporeización]]'], correctAnswer: 2, explanation: '"Embodiment" = the concept of lived bodily experience; widely used in dance theory and phenomenology. "Proprioception" = the biological sense of body position. "Kinesthesia" = sense of movement/effort.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u28-r1', type: 'reading-comprehension', level: 'C1', topic: 'dance-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Dance Criticism|Crítica de danza]]', instructions: 'Read and answer.',
      questions: [{ question: 'Text: "Dance occupies a peculiar position in the hierarchy of the arts: it is the most ephemeral of forms, existing only in the moment of its performance, leaving no lasting material trace. Recordings capture the external geometry of movement but cannot transmit its felt quality — the weight, resistance and spatial tension that constitute the work\'s actual substance. This ephemerality is both dance\'s vulnerability and its irreplaceable power."\n\nWhat paradox about dance does the text identify?', options: ['[[Dance\'s ephemerality — its inability to leave a lasting material record — is both a limitation that makes it vulnerable to being forgotten and a source of its unique power as a living art.|La efimeralidad de la danza, su incapacidad de dejar un registro material duradero, es tanto una limitación que la hace vulnerable al olvido como una fuente de su poder único como arte vivo.]]', '[[Dance is the most technically demanding of all art forms precisely because performers must recreate the same work from memory without any written score or visual reference to guide them.|La danza es la forma artística más técnicamente exigente de todas precisamente porque los intérpretes deben recrear la misma obra de memoria sin ninguna partitura escrita o referencia visual que los guíe.]]', '[[Recordings of dance performances are paradoxically more valuable than the live performance itself because they allow audiences who were not present to experience the work without the limitations of a single viewing.|Las grabaciones de actuaciones de danza son paradójicamente más valiosas que la actuación en vivo porque permiten a las audiencias que no estuvieron presentes experimentar la obra sin las limitaciones de una sola visualización.]]'], correctAnswer: 0, explanation: 'The text explicitly calls ephemerality "both dance\'s vulnerability and its irreplaceable power" — a direct statement of the paradox.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u28-r2', type: 'multiple-choice', level: 'C1', topic: 'dance-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Dance and Identity|Danza e identidad]]', instructions: 'Choose the best answer.',
      questions: [{ question: 'Text: "The history of ballet is, among other things, a history of the colonisation of non-Western movement vocabularies — the appropriation of South Asian, African and Indigenous forms, stripped of their cultural context and repackaged as exotic spectacle for Western audiences. The contemporary dance world is only beginning to reckon seriously with this inheritance and to ask what decolonising the dance canon might actually mean in practice."\n\nWhat does the text argue about ballet history?', options: ['[[Ballet has been enriched by its long history of incorporating movement styles from non-Western cultures, creating a rich synthesis that represents the best of global dance traditions as absorbed into European high art.|El ballet se ha enriquecido con su larga historia de incorporación de estilos de movimiento de culturas no occidentales, creando una rica síntesis que representa lo mejor de las tradiciones de danza global.]]', '[[Ballet\'s history includes the appropriation of non-Western movement forms, decontextualised and presented as exotic for Western audiences — a colonial legacy that the contemporary dance world is only now beginning to address.|La historia del ballet incluye la apropiación de formas de movimiento no occidentales, descontextualizadas y presentadas como exóticas para el público occidental, un legado colonial que el mundo de la danza contemporánea está empezando a abordar.]]', '[[The influence of non-Western dance forms on ballet is a purely artistic exchange that has nothing to do with colonial history, and critiques of cultural appropriation in dance are primarily politically motivated rather than artistically grounded.|La influencia de las formas de danza no occidentales en el ballet es un intercambio puramente artístico que no tiene nada que ver con la historia colonial.]]'], correctAnswer: 1, explanation: 'The text uses "colonisation", "appropriation", "exotic spectacle" and "colonial inheritance" — explicitly framing it as a colonial legacy requiring decolonisation.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u28-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'dance-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Dance and Choreography), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u28-l1', type: 'listening-comprehension', level: 'C1', topic: 'dance-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Choreography Talk|Charla sobre coreografía]]', instructions: 'Listen and choose the correct answer.',
      questions: [{ question: 'A choreographer says: "The question I always begin with is not \'what do I want to say?\' but \'what does the body know that language doesn\'t?\' Dance begins where language ends — in the territory of feeling and sensation that resists verbal articulation. If I can express it in words, I should write a play. The choreographic challenge is to find movement that is specific enough to communicate and open enough to resonate beyond what could ever be said."\n\nWhat does the choreographer mean by "what does the body know that language doesn\'t?"', options: ['[[The choreographer is saying that the body can learn and memorise choreographic sequences faster and more accurately than the brain can process verbal instructions during rehearsal.|El coreógrafo está diciendo que el cuerpo puede aprender y memorizar secuencias coreográficas más rápido y con más precisión que el cerebro puede procesar instrucciones verbales durante el ensayo.]]', '[[Dance should explore the dimension of felt experience and sensation that cannot be fully expressed in words — the body\'s knowledge of emotion, impulse and physical reality that exceeds verbal articulation.|La danza debe explorar la dimensión de la experiencia sentida y la sensación que no puede expresarse completamente en palabras, el conocimiento corporal de la emoción, el impulso y la realidad física que supera la articulación verbal.]]', '[[Choreographers should not use any verbal language during the creative process and should rely exclusively on physical demonstration and movement to communicate their artistic intentions to dancers.|Los coreógrafos no deben usar ningún lenguaje verbal durante el proceso creativo y deben depender exclusivamente de la demostración física y el movimiento para comunicar sus intenciones artísticas.]]'], correctAnswer: 1, explanation: 'The choreographer defines dance as the territory "where language ends" — expressing feeling/sensation that "resists verbal articulation". The body knows what words cannot say.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u28-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'dance-listening',
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
    id: 'c1-u28-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'dance-listening',
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
    id: 'c1-u28-w1', type: 'multiple-choice', level: 'C1', topic: 'dance-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Dance Review|Crítica de danza]]', instructions: 'Choose the best passage for a dance review.',
      questions: [{ question: 'Choose the passage that best demonstrates C1 writing in a dance review:', options: ['[[No sooner had the opening section dissolved into silence than the soloist reappeared centre-stage — barely moving, so still as to seem almost not to breathe — and it was only then that the true emotional register of the evening\'s work became fully apparent: not virtuosity for its own sake, but physical stillness deployed with such precision that it communicated more than motion had.|No bien se había disuelto la sección de apertura en silencio cuando la solista reapareció en el centro del escenario, apenas moviéndose, tan inmóvil que parecía casi no respirar, y solo entonces se hizo plenamente evidente el verdadero registro emocional del trabajo de la noche.]]', '[[The dancer came back on stage after the first section ended and she was very still. This was very effective and communicated a lot of emotion. It was better than the more movement-based parts because it was more meaningful.|La bailarina volvió al escenario después de que terminó la primera sección y estaba muy inmóvil. Esto fue muy efectivo y comunicó mucha emoción. Fue mejor que las partes más centradas en el movimiento porque era más significativa.]]', '[[After the first section the dancer returned and stood still in the centre of the stage. This stillness was impressive and showed how movement can be used in different ways to create different emotional effects in the audience.|Después de la primera sección, la bailarina regresó y se quedó inmóvil en el centro del escenario. Esta quietud fue impresionante y mostró cómo el movimiento puede usarse de diferentes maneras.]]'], correctAnswer: 0, explanation: 'Option A uses "No sooner...than" inversion, "so + adjective + as to", "Only then" inversion, and "such...that" — perfectly integrating the inversion structures of this unit.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u28-w2',
    type: 'writing',
    level: 'C1',
    topic: 'dance-writing',
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
    id: 'c1-u28-w3',
    type: 'writing',
    level: 'C1',
    topic: 'dance-writing',
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
