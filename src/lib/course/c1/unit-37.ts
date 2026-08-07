/**
 * C1 Unit 37 — Mental Health and Wellbeing
 * Module 7: Health and Mind
 * Grammar: Nominal clauses (that-clauses as subject/object; what-clauses; whether-clauses)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Mental Health and Wellbeing';

export const UNIT_37_EXERCISES: Exercise[] = [
{
    id: 'c1-u37-g1', type: 'multiple-choice', level: 'C1', topic: 'nominal-clauses', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Nominal Clauses as Subject|Cláusulas nominales como sujeto]]', instructions: 'Choose the sentence with the correct nominal clause.',
      questions: [{ question: 'Which sentence correctly uses a nominal clause as the grammatical subject?', options: ['[[That rates of anxiety and depression among adolescents have risen sharply over the past decade is now supported by a substantial body of epidemiological evidence from multiple high-income countries.|Que las tasas de ansiedad y depresión entre los adolescentes han aumentado considerablemente en la última década está ahora respaldado por un considerable cuerpo de evidencia epidemiológica de múltiples países de altos ingresos.]]', '[[That rates of anxiety and depression among adolescents have risen sharply over the past decade, it is now supported by a substantial body of epidemiological evidence from multiple high-income countries.|Que las tasas de ansiedad y depresión entre los adolescentes han aumentado considerablemente en la última década, está ahora respaldado por evidencia epidemiológica.]]', '[[What rates of anxiety and depression among adolescents have risen sharply over the past decade is now supported by a substantial body of epidemiological evidence from multiple countries.|Lo que las tasas de ansiedad y depresión entre los adolescentes han aumentado considerablemente en la última década está respaldado por evidencia epidemiológica.]]'], correctAnswer: 0, explanation: '"That + clause" = nominal clause used as grammatical subject. The "that"-clause must be a complete declarative clause. "What"-clauses work as subjects when describing something unknown or indefinite, not a full factual statement.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u37-g2', type: 'fill-blank', level: 'C1', topic: 'nominal-clauses', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[What-clauses|Cláusulas con "What"]]', instructions: 'Complete the sentence.',
      questions: [{ question: '_______ most concerns public health professionals is not the absolute number of diagnosed cases, but rather the growing proportion of individuals who experience significant mental distress without ever accessing professional support.', options: ['[[What|Lo que]]', '[[That|Que]]', '[[Which|Lo cual]]'], correctAnswer: 'What', acceptableAnswers: ['What'], explanation: '"What + clause" = nominal clause referring to the thing(s) that… Used as subject when the specific content is being defined or characterised. "What concerns professionals most" = the thing that concerns them most.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u37-g3', type: 'multiple-choice', level: 'C1', topic: 'nominal-clauses', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Whether-clauses|Cláusulas con "Whether"]]', instructions: 'Choose the correct sentence.',
      questions: [{ question: 'Which sentence uses a whether-clause correctly as a nominal clause?', options: ['[[Whether prolonged exposure to social media platforms causes clinical depression or merely correlates with pre-existing vulnerability remains a genuinely contested empirical question among researchers.|Si la exposición prolongada a las plataformas de redes sociales causa depresión clínica o simplemente se correlaciona con una vulnerabilidad preexistente sigue siendo una cuestión empírica genuinamente debatida entre los investigadores.]]', '[[Whether or not the social media platforms cause clinical depression or just correlates with pre-existing vulnerability it remains a genuinely contested empirical question in the research community.|Si las plataformas de redes sociales causan depresión clínica o simplemente se correlacionan con una vulnerabilidad preexistente, sigue siendo una cuestión empírica genuinamente debatida.]]', '[[If prolonged exposure to social media platforms causes clinical depression or merely correlates with pre-existing vulnerability remains a genuinely contested empirical question among researchers.|Si la exposición prolongada a las plataformas de redes sociales causa depresión clínica o simplemente se correlaciona con una vulnerabilidad preexistente sigue siendo una cuestión empírica debatida.]]'], correctAnswer: 0, explanation: '"Whether + clause" = nominal clause expressing an open question or alternative. As a subject clause, "whether" (not "if") is required. "If" cannot begin a subject nominal clause.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u37-v1', type: 'multiple-choice', level: 'C1', topic: 'health-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Mental Health Terminology|Terminología de salud mental]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The evidence-based therapeutic approach that helps patients identify and modify unhelpful thought patterns and behaviours — widely used for depression, anxiety disorders and phobias — is known as _______.', options: ['[[cognitive behavioural therapy (CBT)|terapia cognitivo-conductual (TCC)]]', '[[psychoanalysis|psicoanálisis]]', '[[pharmacotherapy|farmacoterapia]]'], correctAnswer: 0, explanation: '"Cognitive behavioural therapy" (CBT) = structured, evidence-based therapy focused on thought-behaviour connections. "Psychoanalysis" = Freudian exploration of the unconscious. "Pharmacotherapy" = treatment using medication.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u37-v2', type: 'fill-blank', level: 'C1', topic: 'health-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Psychological Concepts|Conceptos psicológicos]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The concept of _______ — an individual\'s capacity to adapt, recover and grow following adversity, trauma or chronic stress — has become central to both clinical psychology and public health policy frameworks for mental wellbeing.', options: ['[[resilience|resiliencia]]', '[[compliance|cumplimiento]]', '[[tolerance|tolerancia]]'], correctAnswer: 'resilience', acceptableAnswers: ['resilience'], explanation: '"Resilience" = the psychological capacity to adapt and recover from adversity. "Compliance" = adherence to rules or treatment. "Tolerance" = capacity to accept difference or discomfort.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u37-v3', type: 'multiple-choice', level: 'C1', topic: 'health-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Health Policy|Política sanitaria]]', instructions: 'Choose the correct collocation.',
      questions: [{ question: 'The long-standing tendency to allocate significantly less funding to mental health services relative to physical health services — despite mental illness accounting for a substantial proportion of the global disease burden — is referred to as _______ in mental health.', options: ['[[the treatment gap|la brecha de tratamiento]]', '[[the health divide|la brecha sanitaria]]', '[[the care deficit|el déficit de atención]]'], correctAnswer: 0, explanation: '"The treatment gap" = the difference between the number of people with a condition and those receiving appropriate treatment. Widely used in global mental health policy discourse.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u37-r1', type: 'reading', level: 'C1', topic: 'health-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Loneliness Epidemic|La epidemia de soledad]]', instructions: 'Read and answer.',
      passage: 'That loneliness has reached epidemic proportions in many high-income societies is a conclusion supported by an expanding body of research. What makes this finding particularly alarming is that the health consequences of chronic loneliness are not merely psychological: longitudinal studies have found that it is associated with a fifteen per cent increase in the risk of premature mortality — an effect comparable in magnitude to smoking fifteen cigarettes per day. Whether this risk is mediated through chronic inflammation, disrupted sleep architecture, reduced immune function or heightened stress reactivity remains the subject of active investigation. What is clear, however, is that social connection should be treated as a public health priority rather than a personal lifestyle matter.' ,
      questions: [{ question: 'What does the text argue about the health risks of loneliness?', options: ['[[Chronic loneliness carries serious physical health consequences comparable to smoking, and social connection should therefore be treated as a public health priority.|La soledad crónica conlleva graves consecuencias para la salud física comparables al tabaquismo, y por lo tanto la conexión social debería tratarse como una prioridad de salud pública.]]', '[[The research on loneliness is preliminary and no reliable conclusions can yet be drawn about its effects on physical health outcomes such as mortality risk.|La investigación sobre la soledad es preliminar y todavía no se pueden extraer conclusiones fiables sobre sus efectos en los resultados de salud física.]]', '[[Loneliness increases mortality risk only in elderly populations, making it a concern specifically for geriatric care rather than broader public health policy.|La soledad aumenta el riesgo de mortalidad solo en las poblaciones de edad avanzada, lo que la convierte en una preocupación específicamente para la atención geriátrica.]]'], correctAnswer: 0, explanation: 'The text states loneliness increases premature mortality risk by 15% (comparable to 15 cigarettes/day) and argues social connection should be "treated as a public health priority".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u37-r2', type: 'reading', level: 'C1', topic: 'health-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Digital Therapy and Mental Health|Terapia digital y salud mental]]', instructions: 'Read and answer.',
      passage: 'The proliferation of mental health apps and online therapeutic platforms has prompted vigorous debate about whether digital tools can meaningfully complement or partially substitute for face-to-face clinical intervention. What proponents emphasise is that digital tools dramatically reduce barriers to access — eliminating waiting times, geographic constraints and the social anxiety that prevents many people from attending in-person appointments. Critics counter that what the research actually demonstrates is modest and short-term symptom reduction, with limited evidence for sustained clinical benefit in moderate or severe presentations. That digital platforms have generated significant commercial revenue without proportional investment in robust clinical evaluation is a concern shared by many in the mental health research community.' ,
      questions: [{ question: 'What criticism of mental health apps does the text present?', options: ['[[Research shows only modest short-term benefits, clinical evaluation has been insufficient, and commercial interests may have outpaced evidence.|La investigación muestra solo beneficios modestos a corto plazo, la evaluación clínica ha sido insuficiente y los intereses comerciales pueden haber superado a la evidencia.]]', '[[Mental health apps are universally ineffective and should be removed from the market to prevent harm to vulnerable users seeking clinical support.|Las aplicaciones de salud mental son universalmente ineficaces y deben retirarse del mercado para evitar daños a los usuarios vulnerables que buscan apoyo clínico.]]', '[[The text argues that digital platforms are superior to face-to-face therapy for all presentations of mental illness because they eliminate access barriers entirely.|El texto argumenta que las plataformas digitales son superiores a la terapia presencial para todas las presentaciones de enfermedad mental porque eliminan por completo las barreras de acceso.]]'], correctAnswer: 0, explanation: 'The text identifies: limited evidence for sustained benefit; platforms generating revenue without "proportional investment in robust clinical evaluation".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u37-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'health-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Mental Health and Wellbeing), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u37-l1', type: 'listening', level: 'C1', topic: 'health-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Mental Health Policy Discussion|Un debate sobre política de salud mental]]', instructions: 'Read the transcript and answer.',
      passage: 'Host: What do you see as the central obstacle to improving mental health services? | Expert: What I consistently find in my work with health systems is that the obstacle is rarely financial in isolation. That mental health receives a fraction of the health budget relative to its disease burden is undeniable. But what perpetuates this underfunding is something more deeply structural: the persistent stigma that leads decision-makers — consciously or not — to treat mental illness as less legitimate than physical illness. Whether investing more would automatically produce better outcomes is also worth examining. You can increase funding, but if the workforce is undertrained and the service models are outdated, what you get is simply more of the same inadequate provision.',
      questions: [{ question: 'What does the expert identify as the root cause of mental health underfunding?', options: ['[[The expert identifies structural stigma among decision-makers as the deeper cause, which leads to mental illness being treated as less legitimate than physical illness.|El experto identifica el estigma estructural entre los responsables de la toma de decisiones como la causa más profunda, que lleva a que la enfermedad mental sea tratada como menos legítima que la enfermedad física.]]', '[[The expert argues that mental health services are underfunded solely because governments lack the tax revenues necessary to increase health spending in any area.|El experto argumenta que los servicios de salud mental están subfinanciados únicamente porque los gobiernos no tienen los ingresos fiscales necesarios para aumentar el gasto sanitario.]]', '[[The expert concludes that more funding would immediately resolve all problems in mental health services, provided it is distributed equitably across all regions.|El experto concluye que más financiación resolvería inmediatamente todos los problemas en los servicios de salud mental, siempre que se distribuya equitativamente en todas las regiones.]]'], correctAnswer: 0, explanation: 'The expert says the "more deeply structural" cause is "persistent stigma that leads decision-makers to treat mental illness as less legitimate than physical illness".' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u37-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'health-listening',
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
    id: 'c1-u37-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'health-listening',
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
    id: 'c1-u37-w1', type: 'writing', level: 'C1', topic: 'health-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Using Nominal Clauses in Academic Writing|Usar cláusulas nominales en escritura académica]]', instructions: 'Which response uses nominal clauses most effectively in formal writing?',
      questions: [{ question: 'Task: Write two sentences on the relationship between poverty and mental health, using nominal clause structures.', options: ['[[What the evidence consistently demonstrates is that the relationship between poverty and mental ill-health is bidirectional: that poverty increases vulnerability to mental illness is well-established, but it is equally clear that untreated mental illness frequently precipitates financial crisis, job loss and social isolation — creating a self-reinforcing cycle that is difficult to interrupt without simultaneous intervention on both dimensions.|Lo que la evidencia demuestra consistentemente es que la relación entre la pobreza y la mala salud mental es bidireccional: que la pobreza aumenta la vulnerabilidad a la enfermedad mental está bien establecido, pero también está claro que la enfermedad mental no tratada frecuentemente precipita crisis financieras, pérdida de empleo y aislamiento social, creando un ciclo que es difícil de interrumpir.]]', '[[Poverty is bad for mental health and mental health problems can make poverty worse. This is a cycle that is hard to break. We need to address both poverty and mental health at the same time if we want to help people who are stuck in this situation.|La pobreza es mala para la salud mental y los problemas de salud mental pueden empeorar la pobreza. Este es un ciclo que es difícil de romper.]]', '[[Mental health and poverty are connected in many ways. Poor people are more likely to have mental health problems. Also people with mental health problems often become poor. The government should do something about both of these things.|La salud mental y la pobreza están conectadas de muchas formas. Las personas pobres tienen más probabilidades de tener problemas de salud mental.]]'], correctAnswer: 0, explanation: 'Option A uses "What the evidence demonstrates is that…" (what-clause as subject), "that poverty increases…is well-established" (that-clause as subject), and "that untreated illness precipitates…" (that-clause as object) — three nominal clause types accurately deployed.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u37-w2',
    type: 'writing',
    level: 'C1',
    topic: 'health-writing',
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
    id: 'c1-u37-w3',
    type: 'writing',
    level: 'C1',
    topic: 'health-writing',
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
