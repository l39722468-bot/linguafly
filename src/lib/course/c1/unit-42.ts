/**
 * C1 Unit 42 — Health and Mind: Consolidation
 * Module 7: Health and Mind — Consolidation
 * Grammar: Mixed review of all Module 7 structures (nominal clauses, reporting verbs, comparatives, concession, passive reporting)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Health and Mind: Consolidation';

export const UNIT_42_EXERCISES: Exercise[] = [
{
    id: 'c1-u42-g1', type: 'multiple-choice', level: 'C1', topic: 'module7-review', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Nominal Clauses Review|Repaso de cláusulas nominales]]', instructions: 'Choose the sentence with the correct nominal clause.',
      questions: [{ question: 'Which sentence uses a nominal clause correctly as the subject of the main verb?', options: ['[[What most concerns public health researchers is not the prevalence of any single condition but rather the rising co-occurrence of multiple chronic diseases within the same individual — a phenomenon that places enormous strain on healthcare systems designed to treat diseases in isolation.|Lo que más preocupa a los investigadores de salud pública no es la prevalencia de ninguna condición individual sino la creciente co-ocurrencia de múltiples enfermedades crónicas en el mismo individuo.]]', '[[What most public health researchers are concerning is not the prevalence of any single condition but the rising co-occurrence of multiple chronic diseases within the same individual.|Lo que más preocupa a los investigadores de salud pública no es la prevalencia de ninguna condición individual sino la creciente co-ocurrencia de múltiples enfermedades crónicas.]]', '[[That most concerns public health researchers is not the prevalence of any single condition but rather the rising co-occurrence of multiple chronic diseases within the same individual.|Eso que más preocupa a los investigadores de salud pública no es la prevalencia de ninguna condición individual.]]'], correctAnswer: 0, explanation: '"What + clause" = nominal clause functioning as subject. "What most concerns…" is correct. "That" cannot introduce a subject nominal clause without a finite verb following it in this pattern.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u42-g2', type: 'fill-blank', level: 'C1', topic: 'module7-review', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Advanced Reporting Verbs Review|Repaso de verbos de reporte avanzados]]', instructions: 'Complete with the most appropriate reporting verb.',
      questions: [{ question: 'Several prominent neurologists have _______ that the classification of many psychiatric conditions as purely "mental" disorders misrepresents the underlying biology, arguing that the brain-body distinction is an artefact of historical medical tradition rather than a biological reality.', options: ['[[contended|argumentado / sostenido]]', '[[admitted|admitido]]', '[[wondered|preguntado]]'], correctAnswer: 'contended', acceptableAnswers: ['contended', 'argued', 'maintained', 'asserted', 'claimed'], explanation: '"Contend" = to argue or maintain a position, especially one that challenges prevailing views. Appropriate for an intellectual claim made by experts. "Admitted" implies concession. "Wondered" implies uncertainty, not assertion.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u42-g3', type: 'multiple-choice', level: 'C1', topic: 'module7-review', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Concession + Passive Reporting Combined|Concesión + pasiva de reporte combinadas]]', instructions: 'Choose the sentence that best combines concession and passive reporting.',
      questions: [{ question: 'Which sentence most effectively combines a concession structure with a passive reporting verb?', options: ['[[Although mindfulness-based interventions are widely reported to produce clinically significant reductions in stress biomarkers, it has been argued that the mechanisms through which these effects are achieved remain insufficiently theorised within mainstream neuroscience.|Aunque se informa ampliamente que las intervenciones basadas en mindfulness producen reducciones clínicamente significativas en los biomarcadores del estrés, se ha argumentado que los mecanismos a través de los cuales se logran estos efectos siguen insuficientemente teorizados.]]', '[[Even though mindfulness is reported effective, it has been argued it is not understood. This is a problem for neuroscience because the brain is complex and scientists do not fully agree on how it works.|Aunque se informa que el mindfulness es eficaz, se ha argumentado que no se comprende. Esto es un problema para la neurociencia.]]', '[[Mindfulness is reported to work, but it is also argued that we do not know why. Although this is true, researchers still think it is useful for patients with stress and anxiety-related conditions.|Se informa que el mindfulness funciona, pero también se argumenta que no sabemos por qué.]]'], correctAnswer: 0, explanation: 'Option A correctly integrates "Although" (concession) with "are widely reported to" and "has been argued" (passive reporting) in a coherent, formally registered academic sentence.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u42-v1', type: 'multiple-choice', level: 'C1', topic: 'health-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Mental Health Terminology|Terminología de salud mental]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The therapeutic approach that focuses on identifying and restructuring unhelpful patterns of thought — operating on the principle that cognitions directly influence emotions and behaviour — and is currently the most widely recommended psychological treatment for anxiety and depression in clinical guidelines worldwide is _______.', options: ['[[cognitive behavioural therapy (CBT)|terapia cognitivo-conductual (TCC)]]', '[[psychoanalysis|psicoanálisis]]', '[[applied behaviour analysis|análisis de conducta aplicada]]'], correctAnswer: 0, explanation: '"Cognitive behavioural therapy" (CBT) = the most evidence-supported psychological therapy for anxiety/depression. "Psychoanalysis" = Freudian approach focusing on unconscious processes. "ABA" = primarily used in autism spectrum conditions.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u42-v2', type: 'fill-blank', level: 'C1', topic: 'health-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Neuroscience|Neurociencia]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The brain\'s ability to reorganise its structure and function in response to experience, learning and injury — particularly pronounced in childhood but maintained to some degree throughout the lifespan — is referred to as neural _______.', options: ['[[plasticity|plasticidad]]', '[[rigidity|rigidez]]', '[[atrophy|atrofia]]'], correctAnswer: 'plasticity', acceptableAnswers: ['plasticity', 'neuroplasticity'], explanation: '"Neural plasticity" / "neuroplasticity" = the capacity of neural circuits to undergo structural and functional modification in response to experience or damage. Fundamental to learning, recovery and rehabilitation.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u42-v3', type: 'multiple-choice', level: 'C1', topic: 'health-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Public Health|Salud pública]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The systematic collection, analysis and interpretation of health data for the purpose of identifying population-level patterns of disease, informing public health interventions and monitoring the effectiveness of preventive measures is the core function of _______.', options: ['[[epidemiology|epidemiología]]', '[[pharmacognosy|farmacognosia]]', '[[histopathology|histopatología]]'], correctAnswer: 0, explanation: '"Epidemiology" = the study of the distribution and determinants of health and disease in populations, forming the evidence base for public health policy. "Pharmacognosy" = study of medicinal plants. "Histopathology" = microscopic examination of diseased tissue.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u42-r1', type: 'reading', level: 'C1', topic: 'health-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Social Determinants of Health|Los determinantes sociales de la salud]]', instructions: 'Read and answer.',
      passage: 'It is now well established that the conditions in which people are born, grow, live and work — rather than individual behaviour or access to healthcare alone — are the primary determinants of population health outcomes. Income, education, housing quality, exposure to environmental pollutants, social cohesion and early childhood experiences are all reported to exert independent and cumulative effects on physical and mental health across the life course. What distinguishes this perspective from earlier biomedical models is its emphasis on the upstream causes of illness: the social, economic and political structures that generate health inequalities in the first place. It has been contended that addressing these structural determinants requires policy interventions at a scale and ambition that most health systems — designed primarily to treat illness rather than prevent it — are institutionally ill-equipped to provide.',
      questions: [{ question: 'What does the text identify as the primary determinants of population health outcomes?', options: ['[[The conditions in which people are born, grow, live and work — including income, education, housing, environment and early childhood — rather than individual behaviour or healthcare access alone.|Las condiciones en las que las personas nacen, crecen, viven y trabajan — incluyendo ingresos, educación, vivienda, entorno e infancia — más que el comportamiento individual o el acceso a la atención sanitaria solamente.]]', '[[Individual lifestyle choices — including diet, exercise, alcohol consumption and smoking — which the text identifies as the primary controllable factors in determining health outcomes at both individual and population level.|Las elecciones individuales de estilo de vida — incluyendo dieta, ejercicio, consumo de alcohol y tabaquismo — que el texto identifica como los principales factores controlables para determinar los resultados de salud.]]', '[[Access to high-quality healthcare services, which the text argues is the single most important factor in explaining health inequalities between different socioeconomic groups in high-income countries.|El acceso a servicios sanitarios de alta calidad, que el texto argumenta es el factor más importante para explicar las desigualdades de salud entre diferentes grupos socioeconómicos en países de renta alta.]]'], correctAnswer: 0, explanation: 'The text states that "the conditions in which people are born, grow, live and work…are the primary determinants" and lists income, education, housing, environment, social cohesion and early childhood.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u42-r2', type: 'reading', level: 'C1', topic: 'health-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Sleep and Cognitive Performance|Sueño y rendimiento cognitivo]]', instructions: 'Read and answer.',
      passage: 'The relationship between sleep and cognitive function is considerably more complex than the simple restorative model that dominated early sleep research. What is now understood is that sleep plays an active role in memory consolidation, emotional regulation and the clearance of metabolic waste products from the brain via the glymphatic system — a process that appears to be considerably more efficient during deep slow-wave sleep than in the waking state. It is reported that even a single night of inadequate sleep produces measurable impairments in executive function, working memory and emotional regulation that are comparable to those observed after moderate alcohol intoxication. Despite the growing body of evidence on the cognitive and physiological consequences of sleep deprivation, chronically inadequate sleep is still normalised — and in some professional cultures actively glorified — as a marker of productivity and ambition.',
      questions: [{ question: 'What does the text say about the effects of a single night of inadequate sleep?', options: ['[[Even one night of inadequate sleep produces measurable impairments in executive function, working memory and emotional regulation comparable to the effects of moderate alcohol intoxication.|Incluso una noche de sueño insuficiente produce deterioros medibles en la función ejecutiva, la memoria de trabajo y la regulación emocional comparables a los efectos de una intoxicación alcohólica moderada.]]', '[[The text argues that occasional sleep deprivation has no lasting cognitive consequences for most healthy adults, and that the brain compensates fully after one night of recovery sleep.|El texto argumenta que la privación ocasional del sueño no tiene consecuencias cognitivas duraderas para la mayoría de los adultos sanos, y que el cerebro se compensa completamente después de una noche de sueño de recuperación.]]', '[[A single night of poor sleep primarily affects physical performance rather than cognitive function, with the most pronounced effects seen in athletic performance, reaction time and fine motor coordination.|Una sola noche de mal sueño afecta principalmente al rendimiento físico más que a la función cognitiva, con los efectos más pronunciados en el rendimiento atlético y la coordinación motora.]]'], correctAnswer: 0, explanation: 'The text states "even a single night of inadequate sleep produces measurable impairments in executive function, working memory and emotional regulation that are comparable to those observed after moderate alcohol intoxication".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u42-r3',
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
            'Text: "Returning to the core theme of this unit (Health and Mind: Consolidation), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u42-l1', type: 'listening', level: 'C1', topic: 'health-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Public Health Policy Discussion|Un debate sobre política de salud pública]]', instructions: 'Read the transcript and answer.',
      passage: 'Host: Today we are discussing the relationship between mental health and the workplace. What does the research tell us? Guest: The evidence is quite compelling. It is now widely accepted that working conditions — including job insecurity, excessive demands, lack of autonomy and poor management — are among the strongest predictors of depression, anxiety and burnout. What concerns me most is that despite this knowledge being available for decades, workplace mental health is still largely treated as an individual problem rather than a structural one. Host: Can you give an example of what structural intervention would look like? Guest: Certainly. What has been shown to be most effective is not simply providing employees with access to counselling, though that has its place, but redesigning work itself — reducing demands, increasing autonomy and ensuring that workloads are manageable. It is contended by some researchers that presenteeism — being at work while unwell — costs economies considerably more than absenteeism, yet it receives far less policy attention.',
      questions: [{ question: 'What does the guest say is the most effective structural intervention for workplace mental health?', options: ['[[Redesigning work itself — reducing demands, increasing autonomy and ensuring manageable workloads — rather than simply providing individual counselling access.|Rediseñar el trabajo en sí — reduciendo las exigencias, aumentando la autonomía y garantizando cargas de trabajo manejables — en lugar de simplemente proporcionar acceso a asesoramiento individual.]]', '[[The guest recommends that all organisations implement mandatory mindfulness training programmes for employees, as these have been shown to be the most cost-effective intervention for reducing workplace stress.|El invitado recomienda que todas las organizaciones implementen programas obligatorios de mindfulness para empleados, ya que estos han demostrado ser la intervención más rentable.]]', '[[Providing comprehensive employee assistance programmes including counselling, gym membership and flexible working hours — which the guest identifies as the gold standard for workplace mental health.|Proporcionar programas de asistencia al empleado que incluyan asesoramiento, membresía de gimnasio y horarios de trabajo flexibles, que el invitado identifica como el estándar de oro para la salud mental en el trabajo.]]'], correctAnswer: 0, explanation: 'The guest says "What has been shown to be most effective is not simply providing…counselling…but redesigning work itself — reducing demands, increasing autonomy and ensuring that workloads are manageable".' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u42-l2',
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
    id: 'c1-u42-l3',
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
    id: 'c1-u42-w1', type: 'writing', level: 'C1', topic: 'health-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Module 7 Mixed Structures in Writing|Estructuras mixtas del Módulo 7 en escritura]]', instructions: 'Which response uses the widest range of Module 7 grammar structures most accurately?',
      questions: [{ question: 'Task: Write two sentences arguing that mental health should receive equal funding to physical health.', options: ['[[What is difficult to justify, on any principled grounds, is the persistent disparity in funding between mental and physical health services, given that mental disorders are now reported to account for a greater proportion of the total global burden of disease than any single category of physical illness; despite this, it is widely contended that the stigma surrounding mental health has historically made it far easier for policymakers to defer investment than would ever be tolerated in the case of a comparably prevalent physical condition.|Lo que es difícil de justificar, por cualquier razón de principio, es la persistente disparidad en la financiación entre los servicios de salud mental y física, dado que ahora se informa que los trastornos mentales representan una mayor proporción de la carga mundial de enfermedades.]]', '[[Mental health should get the same funding as physical health because it is just as important. It is reported that mental illness affects many people. Despite the stigma, we should invest more in mental health services.|La salud mental debería recibir la misma financiación que la salud física porque es igualmente importante. Se informa que la enfermedad mental afecta a muchas personas.]]', '[[I think mental and physical health are both important and should be funded equally. What concerns me is that governments do not do this. Despite knowing the problem, they still do not spend enough money on mental health services.|Creo que la salud mental y física son igualmente importantes y deberían financiarse por igual.]]'], correctAnswer: 0, explanation: 'Option A uses a "What" nominal clause as subject, "are reported to" (passive reporting), "despite" (concession), and "is contended" (reporting verb) — the full Module 7 toolkit in one sustained argument.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u42-w2',
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
    id: 'c1-u42-w3',
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
