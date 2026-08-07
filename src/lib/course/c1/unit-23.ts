/**
 * C1 Unit 23 — Natural Disasters and Risk
 * Module 4: The Natural World
 * Grammar: Comment clauses — which is, as I see it, it must be said, what's more, needless to say
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Natural Disasters and Risk';

export const UNIT_23_EXERCISES: Exercise[] = [
{
    id: 'c1-u23-g1', type: 'multiple-choice', level: 'C1', topic: 'comment-clauses', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Comment Clauses|Cláusulas de comentario]]', instructions: 'Choose the sentence with the correct comment clause.',
      questions: [{ question: 'Which sentence correctly uses a comment clause to add the speaker\'s attitude?', options: ['[[Early warning systems, it must be said, have saved considerably more lives in recent decades than any other single innovation in disaster risk reduction.|Los sistemas de alerta temprana, hay que decirlo, han salvado considerablemente más vidas en las últimas décadas que cualquier otra innovación en la reducción del riesgo de desastres.]]', '[[Early warning systems have saved lives, which it must be said, is a good thing in disaster risk reduction.|Los sistemas de alerta temprana han salvado vidas, lo cual hay que decirlo, es algo bueno en la reducción del riesgo de desastres.]]', '[[It must be said early warning systems and have saved considerably more lives than other innovations in disaster risk reduction in recent decades.|Hay que decirlo los sistemas de alerta temprana y han salvado considerablemente más vidas que otras innovaciones en la reducción del riesgo de desastres.]]'], correctAnswer: 0, explanation: '"It must be said" = a comment clause expressing the speaker\'s evaluation. It is typically set off by commas and can appear in mid-sentence.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u23-g2', type: 'fill-blank', level: 'C1', topic: 'comment-clauses', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Comment Clauses|Cláusulas de comentario]]', instructions: 'Complete with the correct comment clause.',
      questions: [{ question: 'The death toll from the earthquake was, _______, far lower than in the 2010 Haiti disaster due to the enforcement of strict building codes over the previous two decades.', options: ['[[needless to say|huelga decir]]', '[[what is more|además]]', '[[on the contrary|al contrario]]'], correctAnswer: 'needless to say', acceptableAnswers: ['needless to say', 'it must be said', 'as one might expect'], explanation: '"Needless to say" = a comment clause meaning "as everyone knows" or "obviously"; signals information the speaker expects the listener to accept as evident.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u23-g3', type: 'multiple-choice', level: 'C1', topic: 'comment-clauses', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Non-defining Relative Comment Clauses|Cláusulas de relativo como comentario]]', instructions: 'Choose the correct sentence.',
      questions: [{ question: 'Which sentence uses a non-defining relative as a comment clause correctly?', options: ['[[Climate change is intensifying the frequency of extreme weather events, which is placing unprecedented strain on emergency services in both developed and developing nations.|El cambio climático está intensificando la frecuencia de los fenómenos meteorológicos extremos, lo que está poniendo una tensión sin precedentes en los servicios de emergencia.]]', '[[Climate change is intensifying extreme weather which are placing unprecedented strain on emergency services in both developed and developing nations.|El cambio climático está intensificando los fenómenos meteorológicos extremos que están poniendo una tensión sin precedentes en los servicios de emergencia.]]', '[[Climate change is intensifying extreme weather events, that is placing unprecedented strain on emergency services in both developed and developing nations.|El cambio climático está intensificando los fenómenos meteorológicos extremos, lo que está poniendo una tensión sin precedentes en los servicios de emergencia.]]'], correctAnswer: 0, explanation: '"Which" (not "that") is used in non-defining relative clauses. When it refers to the whole clause rather than a noun, it acts as a comment clause commenting on the entire situation.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u23-v1', type: 'multiple-choice', level: 'C1', topic: 'disaster-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Natural Disasters|Desastres naturales]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'The concept of _______ refers to the capacity of communities to withstand, adapt to and recover from the impacts of natural disasters, drawing on both social capital and physical infrastructure.', options: ['[[resilience|resiliencia]]', '[[resistance|resistencia]]', '[[endurance|resistencia física]]'], correctAnswer: 0, explanation: '"Resilience" = the capacity to recover and adapt after a disaster. "Resistance" implies not being affected; "endurance" refers to physical stamina — neither captures the recovery/adaptation dimension.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u23-v2', type: 'fill-blank', level: 'C1', topic: 'disaster-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Risk Management|Gestión del riesgo]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'Risk _______ — the process of identifying, assessing and prioritising potential hazards and implementing measures to minimise their likelihood or impact — is central to modern emergency planning.', options: ['[[mitigation|mitigación]]', '[[management|gestión]]', '[[assessment|evaluación]]'], correctAnswer: 'mitigation', acceptableAnswers: ['mitigation', 'management', 'assessment'], explanation: '"Risk mitigation" = taking steps to reduce the probability or impact of risks. "Risk management" is broader; "risk assessment" is specifically the evaluation stage.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u23-v3', type: 'multiple-choice', level: 'C1', topic: 'disaster-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Natural Disasters|Desastres naturales]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'A _______ occurs when the ocean floor is displaced by seismic activity, generating a series of waves that can travel thousands of kilometres and reach coastal areas with devastating force.', options: ['[[tsunami|tsunami]]', '[[storm surge|marejada ciclónica]]', '[[tidal wave|ola de marea]]'], correctAnswer: 0, explanation: '"Tsunami" = the correct scientific term for seismically generated ocean waves. "Storm surge" is caused by low pressure/wind; "tidal wave" is a colloquial misnomer — tsunamis are unrelated to tides.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u23-r1', type: 'reading-comprehension', level: 'C1', topic: 'disaster-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Disasters and Inequality|Desastres y desigualdad]]', instructions: 'Read and answer.',
      questions: [{ question: 'Text: "Natural disasters are not naturally distributed — their impacts fall disproportionately on the poorest and most marginalised communities. The same earthquake that kills thousands in one country may cause minimal casualties in another, the difference lying not in geology but in building standards, governance quality, early warning systems and the capacity to recover. In this sense, disaster vulnerability is primarily a political and economic phenomenon."\n\nWhat is the central argument?', options: ['[[Earthquakes and other natural disasters should be redesignated as man-made disasters because human factors always determine their scale, regardless of their geological or meteorological origins.|Los terremotos y otros desastres naturales deberían reclasificarse como desastres provocados por el hombre porque los factores humanos siempre determinan su escala.]]', '[[The severity of disaster impacts is determined more by social, political and economic factors than by the natural hazard itself — making vulnerability primarily a human, not natural, problem.|La gravedad de los impactos de los desastres está determinada más por factores sociales, políticos y económicos que por el peligro natural en sí, lo que hace que la vulnerabilidad sea principalmente un problema humano.]]', '[[Wealthy countries suffer fewer casualties in natural disasters because they can better predict and model geological events using advanced early warning technologies not available to poorer nations.|Los países ricos sufren menos bajas en los desastres naturales porque pueden predecir y modelar mejor los eventos geológicos usando tecnologías avanzadas de alerta temprana no disponibles para las naciones más pobres.]]'], correctAnswer: 1, explanation: 'The text explicitly says disaster impacts fall on the poorest, the difference lies in "governance quality" and "capacity to recover", and concludes vulnerability is "a political and economic phenomenon".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u23-r2', type: 'multiple-choice', level: 'C1', topic: 'disaster-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Disaster Preparedness|Preparación ante desastres]]', instructions: 'Choose the best answer.',
      questions: [{ question: 'Text: "The paradox of disaster preparedness is that its success is invisible. When early warning systems work, when building codes hold, when evacuation plans are executed smoothly, there is no dramatic event to report — no story to be told. This creates a chronic underinvestment problem: governments are rewarded politically for visible reconstruction after disasters but rarely for the unsexy, costly work of prevention."\n\nWhat paradox does the text describe?', options: ['[[Governments spend too much money on disaster preparedness because it is politically popular, when that money would be better spent on reconstruction efforts following actual disasters.|Los gobiernos gastan demasiado dinero en preparación ante desastres porque es políticamente popular, cuando ese dinero se gastaría mejor en esfuerzos de reconstrucción.]]', '[[Effective disaster prevention is invisible when it succeeds, which makes it politically unrewarding and leads to systematic underfunding of preparedness relative to post-disaster reconstruction.|La prevención efectiva de desastres es invisible cuando tiene éxito, lo que la hace políticamente poco gratificante y lleva a una financiación sistemáticamente insuficiente de la preparación en relación con la reconstrucción.]]', '[[Disaster preparedness is paradoxically ineffective because over-reliance on technology such as early warning systems gives communities a false sense of security that increases casualty rates.|La preparación ante desastres es paradójicamente ineficaz porque la dependencia excesiva de la tecnología da a las comunidades una falsa sensación de seguridad que aumenta las tasas de víctimas.]]'], correctAnswer: 1, explanation: 'The text says preparedness success is "invisible" → "no story to tell" → political reward for reconstruction not prevention → "chronic underinvestment" in preparedness.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u23-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'disaster-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Natural Disasters and Risk), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u23-l1', type: 'listening-comprehension', level: 'C1', topic: 'disaster-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Risk Communication|Comunicación del riesgo]]', instructions: 'Listen and choose the correct answer.',
      questions: [{ question: 'An emergency planner says: "One of the most persistent challenges in disaster risk communication is what we call the normalcy bias — the tendency of people to underestimate the likelihood of a disaster occurring and to assume that things will continue as normal. This leads communities to discount warnings, delay evacuations and neglect preparedness measures that they perceive as unnecessarily alarmist."\n\nWhat is the "normalcy bias"?', options: ['[[The scientific tendency to normalise disaster data by adjusting for population size and development level, making it easier to compare disaster impacts across different countries and regions.|La tendencia científica a normalizar los datos de desastres ajustando por tamaño de población y nivel de desarrollo, facilitando la comparación de impactos entre diferentes países y regiones.]]', '[[The psychological tendency to assume things will continue as normal and to underestimate disaster risk, leading people to ignore warnings, delay evacuations and neglect preparation.|La tendencia psicológica a asumir que las cosas seguirán como de costumbre y a subestimar el riesgo de desastres, lo que lleva a la gente a ignorar advertencias, retrasar evacuaciones y descuidar la preparación.]]', '[[The normal distribution of disaster risk across populations, meaning that vulnerability is spread evenly across communities regardless of wealth, governance quality or physical location.|La distribución normal del riesgo de desastres entre las poblaciones, lo que significa que la vulnerabilidad se distribuye uniformemente entre las comunidades independientemente de la riqueza o la ubicación.]]'], correctAnswer: 1, explanation: 'The planner defines normalcy bias as the tendency to "underestimate the likelihood" and "assume things will continue as normal" → discounting warnings and delaying evacuations.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u23-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'disaster-listening',
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
    id: 'c1-u23-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'disaster-listening',
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
    id: 'c1-u23-w1', type: 'multiple-choice', level: 'C1', topic: 'report-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Report Writing|Redacción de informes]]', instructions: 'Choose the best paragraph for a report on improving disaster preparedness.',
      questions: [{ question: 'Choose the most effective recommendation paragraph for a formal report on disaster risk reduction:', options: ['[[It is recommended that local authorities invest substantially in community-based early warning systems, prioritising the most socially vulnerable populations who are statistically most exposed to disaster risk and least equipped to self-evacuate without structured support.|Se recomienda que las autoridades locales inviertan sustancialmente en sistemas de alerta temprana basados en la comunidad, priorizando las poblaciones socialmente más vulnerables que están estadísticamente más expuestas al riesgo de desastres.]]', '[[Local authorities should invest more in early warning systems because this would help communities be better prepared. Vulnerable communities especially need help because they cannot evacuate on their own very easily.|Las autoridades locales deberían invertir más en sistemas de alerta temprana porque esto ayudaría a las comunidades a estar mejor preparadas. Las comunidades vulnerables especialmente necesitan ayuda porque no pueden evacuar fácilmente por sí solas.]]', '[[We think that local authorities need to do more about early warning systems. The problem is very serious and something needs to be done. Vulnerable people are the most affected and they need help urgently.|Creemos que las autoridades locales necesitan hacer más sobre los sistemas de alerta temprana. El problema es muy serio y hay que hacer algo. Las personas vulnerables son las más afectadas y necesitan ayuda urgentemente.]]'], correctAnswer: 0, explanation: 'Option A uses the impersonal passive ("It is recommended"), nominalisation, precise qualification ("statistically most exposed") and formal register — all features of a formal report recommendation.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u23-w2',
    type: 'writing',
    level: 'C1',
    topic: 'report-writing',
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
    id: 'c1-u23-w3',
    type: 'writing',
    level: 'C1',
    topic: 'report-writing',
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
