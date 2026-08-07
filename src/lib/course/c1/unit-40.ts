/**
 * C1 Unit 40 — Ageing and Longevity
 * Module 7: Health and Mind
 * Grammar: Expressing concession (Although / Even though / Despite / In spite of / Nevertheless / Yet / Whilst / Notwithstanding)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Ageing and Longevity';

export const UNIT_40_EXERCISES: Exercise[] = [
{
    id: 'c1-u40-g1', type: 'multiple-choice', level: 'C1', topic: 'concession', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Concession: Despite vs Although|Concesión: A pesar de vs Aunque]]', instructions: 'Choose the sentence with the correct concession structure.',
      questions: [{ question: 'Which sentence uses a concession structure correctly?', options: ['[[Despite the significant advances in regenerative medicine over the past two decades, the biological mechanisms underlying cellular ageing remain incompletely understood, and no intervention has yet been shown to reliably reverse the process in humans.|A pesar de los avances significativos en medicina regenerativa en las últimas dos décadas, los mecanismos biológicos que subyacen al envejecimiento celular siguen sin comprenderse completamente, y ninguna intervención ha demostrado aún revertir el proceso de forma fiable en humanos.]]', '[[Despite the significant advances in regenerative medicine over the past two decades have been made, the biological mechanisms underlying cellular ageing remain incompletely understood.|A pesar de que se han realizado avances significativos en medicina regenerativa en las últimas dos décadas, los mecanismos biológicos del envejecimiento celular siguen sin comprenderse completamente.]]', '[[Although the significant advances in regenerative medicine over the past two decades, the biological mechanisms underlying cellular ageing remain incompletely understood.|Aunque los avances significativos en medicina regenerativa de las últimas dos décadas, los mecanismos biológicos del envejecimiento celular siguen sin comprenderse completamente.]]'], correctAnswer: 0, explanation: '"Despite + noun phrase" = correct. "Despite + clause" is wrong ("Despite the advances have been made"). "Although" must be followed by a full clause, not just a noun phrase.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u40-g2', type: 'fill-blank', level: 'C1', topic: 'concession', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Nevertheless / Nevertheless|Sin embargo / No obstante]]', instructions: 'Complete with the correct concession connector.',
      questions: [{ question: 'Telomere shortening has long been proposed as a primary biomarker of biological ageing. _______, recent research suggests that the relationship between telomere length and longevity is considerably more complex than the early literature indicated, with multiple confounding variables complicating causal interpretation.', options: ['[[Nevertheless|Sin embargo / No obstante]]', '[[Therefore|Por lo tanto]]', '[[Consequently|Consecuentemente]]'], correctAnswer: 'Nevertheless', acceptableAnswers: ['Nevertheless', 'However', 'Yet', 'Nonetheless'], explanation: '"Nevertheless" = formal concessive connector used to introduce a contrasting statement that qualifies or challenges the preceding claim. "Therefore" and "consequently" introduce results, not concessions.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u40-g3', type: 'multiple-choice', level: 'C1', topic: 'concession', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Even though vs Although vs Whilst|Aunque vs Mientras que]]', instructions: 'Choose the most appropriate concession connector.',
      questions: [{ question: 'Which sentence uses a concession connector with the most appropriate register and nuance?', options: ['[[Whilst the majority of centenarians in Blue Zone studies report high levels of subjective wellbeing, it would be premature to conclude that longevity and life satisfaction are causally linked rather than jointly associated with shared lifestyle and social factors.|Aunque la mayoría de los centenarios en los estudios de Zonas Azules reportan altos niveles de bienestar subjetivo, sería prematuro concluir que la longevidad y la satisfacción vital están causalmente vinculadas en lugar de estar asociadas conjuntamente con factores de estilo de vida y sociales compartidos.]]', '[[Even though the majority of centenarians in Blue Zone studies report high levels of subjective wellbeing, this is fine because longevity and life satisfaction could still be related to shared lifestyle factors.|Aunque la mayoría de los centenarios en los estudios de Zonas Azules reportan altos niveles de bienestar subjetivo, esto está bien porque la longevidad y la satisfacción vital podrían estar relacionadas con factores de estilo de vida compartidos.]]', '[[But the majority of centenarians in Blue Zone studies report high levels of subjective wellbeing, longevity and life satisfaction may not be causally linked but associated with shared lifestyle and social factors.|Pero la mayoría de los centenarios en los estudios de Zonas Azules reportan altos niveles de bienestar subjetivo, la longevidad y la satisfacción vital pueden no estar causalmente vinculadas.]]'], correctAnswer: 0, explanation: '"Whilst" = formal British English alternative to "although/even though", appropriate in academic writing. Option B is informal; Option C uses "but" incorrectly as a sentence connector.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u40-v1', type: 'multiple-choice', level: 'C1', topic: 'ageing-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Gerontology|Gerontología]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The scientific study of the biological, psychological and social aspects of ageing — as distinct from the medical treatment of age-related diseases — is known as _______.', options: ['[[gerontology|gerontología]]', '[[geriatrics|geriatría]]', '[[palliative care|cuidados paliativos]]'], correctAnswer: 0, explanation: '"Gerontology" = the scientific study of ageing as a process. "Geriatrics" = the medical specialty treating diseases in older adults. "Palliative care" = care focused on comfort and quality of life in serious illness.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u40-v2', type: 'fill-blank', level: 'C1', topic: 'ageing-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Longevity Research|Investigación sobre longevidad]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'Regions of the world where a disproportionately high number of individuals live beyond one hundred years of age — including Sardinia, Okinawa, Nicoya, Ikaria and Loma Linda — have been designated _______ by researchers studying the determinants of exceptional longevity.', options: ['[[Blue Zones|Zonas Azules]]', '[[Green Zones|Zonas Verdes]]', '[[Gold Zones|Zonas Doradas]]'], correctAnswer: 'Blue Zones', acceptableAnswers: ['Blue Zones'], explanation: '"Blue Zones" = the term coined by researcher Dan Buettner for the five regions with the highest concentrations of centenarians, characterised by shared lifestyle features including diet, social connection and purpose.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u40-v3', type: 'multiple-choice', level: 'C1', topic: 'ageing-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Healthcare Systems|Sistemas sanitarios]]', instructions: 'Choose the correct collocation.',
      questions: [{ question: 'The combination of physical frailty, cognitive decline, multiple chronic conditions and reduced social engagement that characterises deteriorating health in old age is collectively described as _______.', options: ['[[multimorbidity|multimorbilidad]]', '[[acute illness|enfermedad aguda]]', '[[communicable disease|enfermedad transmisible]]'], correctAnswer: 0, explanation: '"Multimorbidity" = the simultaneous presence of two or more chronic conditions. "Acute illness" = sudden, short-term illness. "Communicable disease" = infectious disease transmitted between individuals.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u40-r1', type: 'reading', level: 'C1', topic: 'ageing-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Compression of Morbidity|La compresión de la morbilidad]]', instructions: 'Read and answer.',
      passage: 'Despite the remarkable extension of average life expectancy over the twentieth century, questions about the quality of those additional years remain deeply contested. James Fries proposed the "compression of morbidity" hypothesis in 1980, arguing that although people would live longer, the period of significant illness and disability could be compressed into a shorter window immediately preceding death — allowing individuals to remain healthy and active for a greater proportion of their lifespan. Notwithstanding the intuitive appeal of this framework, the empirical evidence has proved mixed. Whilst some studies support the compression hypothesis in higher-educated populations with better access to preventive care, others suggest that increased longevity has, in many cases, expanded the period of chronic disease burden rather than compressing it. Nevertheless, the goal of extending healthspan — rather than merely lifespan — has become the organising principle of much contemporary gerontological research.',
      questions: [{ question: 'What does the text say about the evidence for the compression of morbidity hypothesis?', options: ['[[The evidence is mixed: some studies support compression in better-educated groups, while others suggest longevity has expanded the period of chronic disease, not compressed it.|La evidencia es mixta: algunos estudios apoyan la compresión en grupos con mayor educación, mientras que otros sugieren que la longevidad ha ampliado el período de enfermedad crónica, no lo ha comprimido.]]', '[[The compression of morbidity hypothesis has been definitively proven in all population groups, confirming that increased longevity consistently reduces the total period of significant illness.|La hipótesis de la compresión de la morbilidad ha sido definitivamente probada en todos los grupos de población, confirmando que el aumento de la longevidad reduce consistentemente el período total de enfermedad significativa.]]', '[[The text argues that the compression of morbidity hypothesis has been entirely discredited and that longer lives are invariably accompanied by a longer period of chronic disease and disability.|El texto argumenta que la hipótesis de la compresión de la morbilidad ha sido completamente desacreditada y que las vidas más largas van invariablemente acompañadas de un período más largo de enfermedad crónica.]]'], correctAnswer: 0, explanation: 'The text says evidence is "mixed" — some studies support compression "in higher-educated populations" while "others suggest" longevity has "expanded the period of chronic disease burden".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u40-r2', type: 'reading', level: 'C1', topic: 'ageing-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Social Determinants of Healthy Ageing|Determinantes sociales del envejecimiento saludable]]', instructions: 'Read and answer.',
      passage: 'Although genetic inheritance contributes meaningfully to individual variation in longevity, the social and behavioural determinants of healthy ageing are now understood to exert a considerably greater influence on population-level outcomes. Despite income being a well-established predictor of life expectancy, the relationship is not linear: improvements in health outcomes diminish at higher income levels, suggesting that relative deprivation rather than absolute poverty is the more significant driver. Even though access to healthcare is critical, studies consistently find that education, social cohesion, purposeful activity and the quality of social relationships are at least as predictive of wellbeing in older age. Nevertheless, these insights have proved difficult to translate into effective public policy, partly because the most potent determinants of healthy ageing operate across the full life course rather than being amenable to targeted intervention in old age alone.',
      questions: [{ question: 'What challenge does the text identify in using this research for public policy?', options: ['[[The most powerful determinants of healthy ageing operate across the full life course, making targeted old-age interventions insufficient on their own.|Los determinantes más poderosos del envejecimiento saludable operan a lo largo de todo el ciclo vital, lo que hace que las intervenciones específicas en la vejez sean insuficientes por sí solas.]]', '[[The text argues that because genetic factors are the primary determinant of longevity, lifestyle and social policy interventions have no meaningful impact on population-level ageing outcomes.|El texto argumenta que debido a que los factores genéticos son el determinante principal de la longevidad, las intervenciones de estilo de vida y política social no tienen ningún impacto significativo en los resultados del envejecimiento a nivel poblacional.]]', '[[Public policy is ineffective for healthy ageing because older adults are unwilling to change established behavioural patterns, regardless of the evidence presented to them.|La política pública es ineficaz para el envejecimiento saludable porque los adultos mayores no están dispuestos a cambiar los patrones de comportamiento establecidos.]]'], correctAnswer: 0, explanation: 'The text says interventions are difficult because "the most potent determinants operate across the full life course rather than being amenable to targeted intervention in old age alone".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u40-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'ageing-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Ageing and Longevity), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u40-l1', type: 'listening', level: 'C1', topic: 'ageing-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Gerontology Lecture|Una conferencia de gerontología]]', instructions: 'Read the transcript and answer.',
      passage: 'Lecturer: The question I want to address today is why some individuals remain cognitively sharp and physically active well into their nineties whilst others experience significant decline in their sixties and seventies. Despite extensive twin studies, genetic factors account for only around twenty-five percent of the variance in healthy lifespan. Even though socioeconomic status is a significant predictor, it is neither necessary nor sufficient — centenarians have been found across all income brackets. What the evidence converges on, notwithstanding significant methodological variation across studies, is a cluster of behaviours: regular moderate physical activity, a varied diet with minimal ultra-processed food, strong social ties, a sense of purpose, and — perhaps most surprisingly — relatively low levels of health anxiety. Nevertheless, translating this into prescriptive public health guidance is complicated by the fact that the relative importance of each factor appears to vary considerably across individuals.',
      questions: [{ question: 'What cluster of behaviours does the lecturer say the evidence converges on for healthy ageing?', options: ['[[Regular moderate exercise, a varied minimally processed diet, strong social ties, a sense of purpose and low health anxiety — though their relative importance varies by individual.|Ejercicio moderado regular, una dieta variada con alimentos mínimamente procesados, fuertes lazos sociales, un sentido de propósito y baja ansiedad por la salud, aunque su importancia relativa varía según el individuo.]]', '[[The lecturer argues that genetic factors are the single most important determinant of healthy ageing and that lifestyle interventions have a negligible effect on longevity outcomes.|El conferenciante argumenta que los factores genéticos son el determinante más importante del envejecimiento saludable y que las intervenciones de estilo de vida tienen un efecto insignificante.]]', '[[High socioeconomic status is identified as the primary predictor of healthy ageing because it provides access to superior healthcare, nutrition and residential environments.|El alto nivel socioeconómico se identifica como el principal predictor del envejecimiento saludable porque proporciona acceso a atención médica, nutrición y entornos residenciales superiores.]]'], correctAnswer: 0, explanation: 'The lecturer lists: regular moderate physical activity, varied diet, minimal ultra-processed food, strong social ties, sense of purpose, low health anxiety — noting individual variation.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u40-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'ageing-listening',
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
    id: 'c1-u40-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'ageing-listening',
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
    id: 'c1-u40-w1', type: 'writing', level: 'C1', topic: 'ageing-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Concession in Formal Essays|Concesión en ensayos formales]]', instructions: 'Which response uses concession structures most effectively in academic writing?',
      questions: [{ question: 'Task: Write two sentences on whether governments should prioritise extending lifespan or healthspan.', options: ['[[Although extending average lifespan has been a defining public health achievement of the twentieth century, there is a compelling argument that policymakers should now reorient their priorities towards healthspan — the years lived in good health — rather than total years lived. Despite the political appeal of announcing rising life expectancy figures, an extension of years characterised primarily by multimorbidity, dependence and diminished autonomy represents a questionable social investment; nevertheless, achieving this reorientation requires a fundamental restructuring of healthcare systems currently designed to manage disease rather than sustain health.|Aunque extender la esperanza de vida promedio ha sido un logro de salud pública definitorio del siglo XX, hay un argumento convincente de que los responsables políticos deberían reorientar sus prioridades hacia la esperanza de vida saludable en lugar de los años totales vividos. A pesar del atractivo político de anunciar cifras crecientes de esperanza de vida, una extensión de años caracterizada principalmente por multimorbilidad y dependencia representa una inversión social cuestionable.]]', '[[Governments should focus on healthspan not lifespan because it is better to be healthy than just to live a long time. Even though living longer is good, it is not good if you are sick. Nevertheless, this is hard to change because the health system is focused on treating diseases.|Los gobiernos deberían centrarse en la esperanza de vida saludable en lugar de la esperanza de vida porque es mejor estar sano que simplemente vivir mucho tiempo.]]', '[[Although healthspan is important, lifespan is also important. Despite this debate, governments should try to improve both at the same time. Nevertheless, more research is needed before we can make any firm conclusions about which is more important.|Aunque la esperanza de vida saludable es importante, la esperanza de vida también es importante. A pesar de este debate, los gobiernos deberían intentar mejorar ambos al mismo tiempo.]]'], correctAnswer: 0, explanation: 'Option A uses "Although", "Despite", "nevertheless" accurately in sequence, building a sophisticated concessive argument with substantive content and formal academic register throughout.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u40-w2',
    type: 'writing',
    level: 'C1',
    topic: 'ageing-writing',
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
    id: 'c1-u40-w3',
    type: 'writing',
    level: 'C1',
    topic: 'ageing-writing',
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
