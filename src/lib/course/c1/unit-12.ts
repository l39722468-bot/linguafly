/**
 * C1 Unit 12 — Urban Life and Architecture
 * Module 2: Society and Knowledge
 * Grammar: Mixed conditionals (type 2 + type 3 and variants)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Urban Life and Architecture';

export const UNIT_12_EXERCISES: Exercise[] = [
{
    id: 'c1-u12-g1', type: 'multiple-choice', level: 'C1', topic: 'mixed-conditionals', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]', instructions: 'Choose the correct mixed conditional.',
      questions: [{ question: 'He lost his job last year. Now he is broke. Which mixed conditional is correct?', options: ['[[If he hadn\'t lost his job last year, he wouldn\'t be broke now.|Si no hubiera perdido su trabajo el año pasado, no estaría sin dinero ahora.]]', '[[If he didn\'t lose his job last year, he wouldn\'t have been broke.|Si no hubiera perdido su trabajo el año pasado, no habría estado sin dinero.]]', '[[If he hadn\'t lost his job last year, he wouldn\'t have been broke then.|Si no hubiera perdido su trabajo el año pasado, no habría estado sin dinero entonces.]]'], correctAnswer: 0, explanation: 'Mixed conditional: type 3 condition (past hypothetical) + type 2 result (present consequence).' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u12-g2', type: 'fill-blank', level: 'C1', topic: 'mixed-conditionals', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]', instructions: 'Complete the mixed conditional.',
      questions: [{ question: 'If the city _______ invested in public transport decades ago, traffic congestion _______ be so severe today.', options: ["[[had / wouldn't|había / no sería]]", "[[has / doesn't|ha / no es]]", "[[would have / isn't|habría / no es]]"], correctAnswer: "had / wouldn't", acceptableAnswers: ["had / wouldn't"], explanation: '"If + past perfect, would + infinitive" = mixed conditional linking past cause to present result.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u12-g3', type: 'multiple-choice', level: 'C1', topic: 'mixed-conditionals', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Mixed Conditionals|Condicionales mixtos]]', instructions: 'Choose the correct form.',
      questions: [{ question: 'She is a city planner. Because of her training, she immediately noticed the design flaw. Which sentence is correct?', options: ['[[If she weren\'t a city planner, she might not have noticed the flaw so quickly.|Si no fuera planificadora urbana, quizá no habría notado el error tan rápido.]]', '[[If she hadn\'t been a city planner, she might not notice the flaw so quickly.|Si no hubiera sido planificadora urbana, quizá no notaría el error tan rápido.]]', '[[If she wasn\'t being a city planner, she might not have noticed the flaw.|Si no estuviera siendo planificadora urbana, quizá no habría notado el error.]]'], correctAnswer: 0, explanation: 'Present state (she is a planner) → type 2 condition; past result (noticed the flaw) → type 3 result. This is a reverse mixed conditional.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u12-v1', type: 'multiple-choice', level: 'C1', topic: 'urban-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Urban Life|Vida urbana]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'The neighbourhood has undergone significant _______, attracting wealthier residents and pushing out long-established lower-income communities.', options: ['[[gentrification|gentrificación]]', '[[urbanisation|urbanización]]', '[[suburbanisation|suburbanización]]'], correctAnswer: 0, explanation: '"Gentrification" = the process by which a poor urban area is transformed by wealthier people moving in, raising property values.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u12-v2', type: 'fill-blank', level: 'C1', topic: 'urban-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Urban Life|Vida urbana]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The concept of a _______ city refers to urban environments that use digital technology and data to improve quality of life, efficiency and sustainability for their residents.', options: ['[[smart|inteligente]]', '[[green|verde]]', '[[compact|compacta]]'], correctAnswer: 'smart', acceptableAnswers: ['smart'], explanation: '"Smart city" = a city that uses technology and data to manage resources and services more efficiently.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u12-v3', type: 'multiple-choice', level: 'C1', topic: 'urban-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Architecture|Arquitectura]]', instructions: 'Choose the correct architectural term.',
      questions: [{ question: 'The building is renowned for its _______ design — it serves simultaneously as a home, an office and a retail space on the ground floor.', options: ['[[mixed-use|uso mixto]]', '[[load-bearing|estructural]]', '[[vernacular|vernacular]]'], correctAnswer: 0, explanation: '"Mixed-use" = a building or development that combines residential, commercial and/or recreational functions.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u12-r1', type: 'reading-comprehension', level: 'C1', topic: 'urban-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Future City|La ciudad del futuro]]', instructions: 'Read the extract and answer the question.',
      questions: [{ question: 'Text: "The fifteen-minute city is a planning concept in which all essential services — shops, schools, workplaces, parks and healthcare — are reachable by foot or bicycle within a quarter of an hour from any home. Its proponents argue it would reduce car dependency, lower carbon emissions and rebuild the social fabric that has been eroded by sprawling suburban development."\n\nWhat problem is the fifteen-minute city designed to address?', options: ['[[The lack of cycle lanes and pedestrian infrastructure in modern urban centres and suburban areas.|La falta de carriles bici e infraestructura peatonal en los centros urbanos modernos y las áreas suburbanas.]]', '[[Car dependency and the social fragmentation caused by urban sprawl, alongside the environmental impact of commuting.|La dependencia del automóvil y la fragmentación social causada por la expansión urbana, junto con el impacto ambiental de los desplazamientos.]]', '[[The rising cost of housing in city centres, which forces lower-income residents to live far from essential services.|El aumento del coste de la vivienda en los centros urbanos, que obliga a los residentes de menores ingresos a vivir lejos de los servicios esenciales.]]'], correctAnswer: 1, explanation: 'The text mentions reducing car dependency, lowering emissions and rebuilding social fabric eroded by suburban sprawl.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u12-r2', type: 'multiple-choice', level: 'C1', topic: 'urban-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Urban Architecture|Arquitectura urbana]]', instructions: 'Read and choose the best answer.',
      questions: [{ question: 'Text: "Brutalism — the architectural movement characterised by raw concrete, bold geometric forms and an uncompromising rejection of decorative elements — remains among the most controversial styles in the built environment, simultaneously reviled as brutal and admired as honest."\n\nWhat does the author suggest about Brutalism?', options: ['[[It has been universally condemned by architects and the public for its use of concrete and lack of decoration.|Ha sido universalmente condenado por arquitectos y el público por su uso del hormigón y la falta de decoración.]]', '[[It provokes strong and conflicting reactions, being seen by some as harsh and by others as authentically direct.|Provoca reacciones fuertes y contradictorias, siendo visto por unos como severo y por otros como auténticamente directo.]]', '[[It was admired when first built but has since been rejected by modern architects in favour of more decorative styles.|Fue admirado cuando se construyó por primera vez, pero desde entonces ha sido rechazado por los arquitectos modernos.]]'], correctAnswer: 1, explanation: 'The text says it is "simultaneously reviled as brutal and admired as honest" — contradictory reactions.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u12-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'urban-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Urban Life and Architecture), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u12-l1', type: 'listening-comprehension', level: 'C1', topic: 'urban-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Urban Planning Debate|Debate sobre planificación urbana]]', instructions: 'Listen and choose the correct answer.',
      questions: [{ question: 'An urban planner says: "The tension between preserving architectural heritage and allowing cities to evolve and densify is one of the central challenges of contemporary urbanism — there are no simple answers, only trade-offs."\n\nWhat does "trade-offs" mean in this context?', options: ['[[financial negotiations between developers and heritage bodies over the cost of renovation|negociaciones financieras entre promotores y organismos patrimoniales sobre el coste de la renovación]]', '[[compromises where gaining one benefit requires accepting a corresponding loss or disadvantage|compromisos en los que obtener un beneficio requiere aceptar una pérdida o desventaja correspondiente]]', '[[exchanges of property between public and private owners to facilitate urban redevelopment|intercambios de propiedades entre propietarios públicos y privados para facilitar la reurbanización]]'], correctAnswer: 1, explanation: '"Trade-offs" = situations where achieving one thing requires giving up or sacrificing something else.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u12-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'urban-listening',
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
    id: 'c1-u12-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'urban-listening',
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
    id: 'c1-u12-w1', type: 'multiple-choice', level: 'C1', topic: 'proposal-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Proposal Writing|Redacción de propuestas]]', instructions: 'Choose the best opening paragraph for a formal proposal.',
      questions: [{ question: 'You are writing a proposal to the city council recommending pedestrianisation of the town centre. Choose the most effective opening paragraph:', options: ['[[This proposal sets out the case for the full pedestrianisation of the historic town centre, drawing on evidence from comparable European cities and recent local footfall data to demonstrate that such a measure would stimulate economic activity, improve air quality and significantly enhance residents\' quality of life.|Esta propuesta expone el argumento a favor de la peatonalización completa del centro histórico, basándose en evidencia de ciudades europeas comparables y datos recientes de afluencia local para demostrar que tal medida estimularía la actividad económica, mejoraría la calidad del aire y mejoraría significativamente la calidad de vida de los residentes.]]', '[[I would like to suggest that we consider making the town centre pedestrian-only. Many people think this would be a good idea and would help make it nicer for everyone who lives here and visits.|Me gustaría sugerir que consideremos hacer el centro peatonal. Mucha gente cree que sería una buena idea y ayudaría a hacerlo más agradable para todos los que viven aquí y lo visitan.]]', '[[The town centre has a lot of traffic problems. Cars make it dirty and noisy. The solution is to ban all cars from the town centre so that people can walk around freely and safely.|El centro urbano tiene muchos problemas de tráfico. Los coches lo hacen sucio y ruidoso. La solución es prohibir todos los coches del centro urbano para que la gente pueda caminar libremente y con seguridad.]]'], correctAnswer: 0, explanation: 'Option A establishes purpose, cites evidence types, and outlines benefits — the expected structure of a formal C1 proposal opening.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u12-w2',
    type: 'writing',
    level: 'C1',
    topic: 'proposal-writing',
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
    id: 'c1-u12-w3',
    type: 'writing',
    level: 'C1',
    topic: 'proposal-writing',
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
