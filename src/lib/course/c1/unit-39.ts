/**
 * C1 Unit 39 — Nutrition and Lifestyle Medicine
 * Module 7: Health and Mind
 * Grammar: Advanced comparatives (the more…the more…; far/much/considerably + comparative; as…as with degree modifiers)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Nutrition and Lifestyle Medicine';

export const UNIT_39_EXERCISES: Exercise[] = [
{
    id: 'c1-u39-g1', type: 'multiple-choice', level: 'C1', topic: 'advanced-comparatives', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[The more…the more|Cuanto más…más]]', instructions: 'Choose the sentence with the correct correlative comparative.',
      questions: [{ question: 'Which sentence correctly uses the "the more…the more" structure?', options: ['[[The more closely researchers examine the relationship between the gut microbiome and mental health, the clearer it becomes that the two systems are far more deeply interconnected than classical medicine had assumed.|Cuanto más de cerca examinan los investigadores la relación entre el microbioma intestinal y la salud mental, más claro se vuelve que los dos sistemas están mucho más profundamente interconectados de lo que la medicina clásica había asumido.]]', '[[More closely the researchers examine the relationship between the gut microbiome and mental health, the more clear it becomes that the two systems are far more deeply interconnected than classical medicine assumed.|Más de cerca los investigadores examinan la relación entre el microbioma intestinal y la salud mental, más claro se vuelve que los dos sistemas están mucho más profundamente interconectados.]]', '[[The more closer researchers examine the gut-mental health relationship, the more clearly it becomes that the two systems were much more deeply interconnected than classical medicine had assumed.|Cuanto más de cerca los investigadores examinan la relación intestino-salud mental, más claramente se vuelve que los dos sistemas estaban mucho más profundamente interconectados.]]'], correctAnswer: 0, explanation: '"The + comparative + clause, the + comparative + clause" = correlative structure. Both comparatives must be in the correct form. "The more closely…the clearer" is correct. "More closer" is double comparative (error).' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u39-g2', type: 'fill-blank', level: 'C1', topic: 'advanced-comparatives', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Far / Much / Considerably + comparative|Mucho + comparativo]]', instructions: 'Complete with the correct degree modifier.',
      questions: [{ question: 'Ultra-processed foods are _______ more strongly associated with obesity, type 2 diabetes and cardiovascular disease than previously recognised, according to a growing body of prospective cohort research published over the past decade.', options: ['[[considerably|considerablemente]]', '[[fairly|bastante]]', '[[slightly|ligeramente]]'], correctAnswer: 'considerably', acceptableAnswers: ['considerably', 'far', 'much', 'significantly', 'substantially'], explanation: '"Considerably/far/much + comparative" = degree intensifiers for comparatives. "Fairly" and "slightly" would understate the strength of the association described in the rest of the sentence.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u39-g3', type: 'multiple-choice', level: 'C1', topic: 'advanced-comparatives', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[As…as with Degree Modifiers|Tan…como con modificadores de grado]]', instructions: 'Choose the most accurate sentence.',
      questions: [{ question: 'Which sentence uses an "as…as" comparative with a degree modifier correctly?', options: ['[[Regular physical activity is at least as effective as antidepressant medication in reducing symptoms of mild-to-moderate depression in adults, according to several meta-analyses published in major psychiatric journals.|La actividad física regular es al menos tan eficaz como la medicación antidepresiva para reducir los síntomas de depresión leve a moderada en adultos, según varios metaanálisis publicados en importantes revistas psiquiátricas.]]', '[[Regular physical activity is at least so effective as antidepressant medication in reducing symptoms of mild-to-moderate depression in adults, according to several major meta-analyses.|La actividad física regular es al menos tan eficaz como la medicación antidepresiva para reducir los síntomas de depresión leve a moderada en adultos.]]', '[[Regular physical activity is at least as effective than antidepressant medication in reducing symptoms of mild-to-moderate depression, according to several published meta-analyses.|La actividad física regular es al menos tan eficaz que la medicación antidepresiva para reducir los síntomas de depresión leve a moderada.]]'], correctAnswer: 0, explanation: '"As + adjective + as" = equality comparative. Degree modifiers like "at least", "almost", "not quite", "just" can precede "as". "So…as" is only used in negative constructions. "Than" replaces the second "as" (error).' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u39-v1', type: 'multiple-choice', level: 'C1', topic: 'nutrition-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Nutrition Science|Ciencias de la nutrición]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'Foods that have been minimally altered from their natural state — retaining most of their original nutritional properties without significant addition of salt, sugar, fat or additives — are classified as _______ foods in the NOVA food classification system.', options: ['[[unprocessed or minimally processed|no procesados o mínimamente procesados]]', '[[ultra-processed|ultraprocesados]]', '[[processed culinary ingredients|ingredientes culinarios procesados]]'], correctAnswer: 0, explanation: '"Unprocessed/minimally processed" = NOVA Group 1 (e.g., fruits, vegetables, meat, milk). "Ultra-processed" = NOVA Group 4 (industrial formulations). "Processed culinary ingredients" = NOVA Group 2 (oils, flour, sugar).' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u39-v2', type: 'fill-blank', level: 'C1', topic: 'nutrition-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Metabolic Health|Salud metabólica]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'A condition characterised by chronically elevated blood glucose levels resulting from the body\'s impaired ability to produce or respond effectively to insulin — affecting over 400 million people globally — is known as type 2 _______.', options: ['[[diabetes|diabetes]]', '[[hypertension|hipertensión]]', '[[dyslipidaemia|dislipidemia]]'], correctAnswer: 'diabetes', acceptableAnswers: ['diabetes'], explanation: '"Type 2 diabetes" = metabolic condition of insulin resistance/deficiency with elevated blood glucose. "Hypertension" = high blood pressure. "Dyslipidaemia" = abnormal blood lipid levels.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u39-v3', type: 'multiple-choice', level: 'C1', topic: 'nutrition-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Research Methodology|Metodología de investigación]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'A systematic statistical analysis that pools and synthesises data from multiple independent studies on the same research question — producing a quantitative summary of the overall evidence — is known as a _______.', options: ['[[meta-analysis|metaanálisis]]', '[[case study|estudio de caso]]', '[[cohort study|estudio de cohorte]]'], correctAnswer: 0, explanation: '"Meta-analysis" = statistical synthesis of multiple studies. "Case study" = in-depth analysis of a single case. "Cohort study" = longitudinal observational study following a defined group over time.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u39-r1', type: 'reading', level: 'C1', topic: 'nutrition-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Gut-Brain Axis|El eje intestino-cerebro]]', instructions: 'Read and answer.',
      passage: 'The gut-brain axis — the bidirectional communication network linking the enteric nervous system of the gastrointestinal tract with the central nervous system — has emerged as one of the most rapidly developing areas of biomedical research. The more scientists investigate this interface, the more complex the relationship appears. It is now understood that the gut microbiome — the trillion-strong community of microorganisms inhabiting the intestinal tract — exerts a far more significant influence on mood, cognition and stress reactivity than was appreciated even a decade ago. Studies in both animal models and human participants have demonstrated that individuals with a greater diversity of gut bacteria tend to exhibit considerably lower rates of anxiety and depression than those with less diverse microbiomes. The implications for nutritional psychiatry — the emerging field that investigates the bidirectional relationship between diet and mental health — are potentially transformative.',
      questions: [{ question: 'What relationship does the text describe between gut bacterial diversity and mental health?', options: ['[[Greater gut bacterial diversity is associated with considerably lower rates of anxiety and depression, suggesting diet-mental health links that nutritional psychiatry is beginning to explore.|Una mayor diversidad bacteriana intestinal se asocia con tasas considerablemente más bajas de ansiedad y depresión, lo que sugiere vínculos dieta-salud mental que la psiquiatría nutricional está comenzando a explorar.]]', '[[The text argues that mental health directly determines the composition of the gut microbiome, not the other way around, making psychological treatment the primary intervention target.|El texto argumenta que la salud mental determina directamente la composición del microbioma intestinal, no al revés, lo que convierte el tratamiento psicológico en el objetivo de intervención principal.]]', '[[Gut bacterial diversity is relevant only to gastrointestinal conditions such as irritable bowel syndrome, and has no established relationship with psychiatric conditions such as anxiety or depression.|La diversidad bacteriana intestinal solo es relevante para las afecciones gastrointestinales, y no tiene ninguna relación establecida con afecciones psiquiátricas.]]'], correctAnswer: 0, explanation: 'The text states "individuals with greater diversity of gut bacteria tend to exhibit considerably lower rates of anxiety and depression" and mentions nutritional psychiatry\'s exploration of this.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u39-r2', type: 'reading', level: 'C1', topic: 'nutrition-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Intermittent Fasting|Ayuno intermitente]]', instructions: 'Read and answer.',
      passage: 'Intermittent fasting — dietary protocols that alternate between periods of eating and extended periods of caloric restriction — has generated considerable scientific and popular interest. Proponents cite evidence suggesting that the longer the fasting window, the more pronounced the metabolic benefits: reduced insulin resistance, enhanced cellular repair through autophagy and improved markers of cardiovascular health. However, critics argue that the evidence base is far less robust than advocates maintain, noting that many studies rely on small samples, short intervention periods and self-reported dietary adherence. The question of whether intermittent fasting is meaningfully superior to simple caloric restriction — rather than being merely a different delivery mechanism for the same energy deficit — remains considerably more contested than media coverage typically suggests.',
      questions: [{ question: 'What key scientific question about intermittent fasting does the text raise?', options: ['[[Whether intermittent fasting offers meaningful advantages over simple caloric restriction, or simply delivers the same energy deficit differently, remains considerably more contested than popular coverage suggests.|Si el ayuno intermitente ofrece ventajas significativas sobre la simple restricción calórica, o simplemente ofrece el mismo déficit energético de manera diferente, sigue siendo considerablemente más debatido de lo que sugiere la cobertura popular.]]', '[[The text concludes that intermittent fasting has been definitively proven superior to all other dietary interventions for weight loss and metabolic health improvement.|El texto concluye que el ayuno intermitente ha sido definitivamente probado como superior a todas las demás intervenciones dietéticas para la pérdida de peso y la mejora de la salud metabólica.]]', '[[The text argues that intermittent fasting is dangerous for most adults and should not be recommended until significantly larger and longer clinical trials have been completed.|El texto argumenta que el ayuno intermitente es peligroso para la mayoría de los adultos y no debería recomendarse.]]'], correctAnswer: 0, explanation: 'The text asks whether intermittent fasting is "meaningfully superior to simple caloric restriction…or merely a different delivery mechanism" and calls this "considerably more contested" than media suggests.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u39-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'nutrition-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Nutrition and Lifestyle Medicine), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u39-l1', type: 'listening', level: 'C1', topic: 'nutrition-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Nutrition Science Podcast|Un podcast de ciencias de la nutrición]]', instructions: 'Read the transcript and answer.',
      passage: 'Host: Is there a single dietary pattern that the evidence most strongly supports? | Dietitian: The more I examine the literature, the more convinced I become that no single nutrient or food is as important as the overall dietary pattern. The Mediterranean diet has far more robust evidence behind it than almost any other pattern studied — and the longer the follow-up periods in the research, the more pronounced the benefits appear, particularly for cardiovascular and cognitive outcomes. That said, what the evidence also shows is that adherence is considerably more predictive of outcomes than the precise diet chosen. A slightly less optimal diet followed consistently will produce much better results than a theoretically perfect diet followed intermittently.',
      questions: [{ question: 'What does the dietitian say is the most important predictor of dietary outcomes?', options: ['[[Adherence to a dietary pattern is considerably more predictive of outcomes than the precise diet chosen, even if the pattern is slightly less optimal.|La adherencia a un patrón dietético es considerablemente más predictiva de los resultados que la dieta precisa elegida, incluso si el patrón es ligeramente menos óptimo.]]', '[[The Mediterranean diet is the only dietary pattern with sufficient evidence to be recommended, and all other patterns produce significantly inferior health outcomes.|La dieta mediterránea es el único patrón dietético con evidencia suficiente para ser recomendado, y todos los demás patrones producen resultados de salud significativamente inferiores.]]', '[[Individual nutrients are far more important than overall dietary patterns, and people should focus on optimising their intake of specific vitamins and minerals.|Los nutrientes individuales son mucho más importantes que los patrones dietéticos generales, y las personas deberían centrarse en optimizar su ingesta de vitaminas y minerales específicos.]]'], correctAnswer: 0, explanation: 'The dietitian says "adherence is considerably more predictive of outcomes than the precise diet chosen" and that consistent moderate adherence beats intermittent perfect adherence.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u39-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'nutrition-listening',
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
    id: 'c1-u39-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'nutrition-listening',
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
    id: 'c1-u39-w1', type: 'writing', level: 'C1', topic: 'nutrition-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Advanced Comparatives in Health Writing|Comparativos avanzados en escritura de salud]]', instructions: 'Which response uses advanced comparative structures most effectively?',
      questions: [{ question: 'Task: Write two sentences comparing sedentary lifestyles and regular exercise for long-term health.', options: ['[[A sedentary lifestyle carries a considerably higher risk of premature mortality than was recognised in earlier research; in fact, prolonged sitting has been described as independently harmful — distinct from and in addition to low overall physical activity levels. The more consistently individuals incorporate moderate aerobic exercise into their daily routine, the more pronounced the reduction in all-cause mortality risk, with even modest increases in activity producing far greater benefits than might intuitively be expected.|Un estilo de vida sedentario conlleva un riesgo considerablemente mayor de mortalidad prematura de lo que se reconocía en investigaciones anteriores; de hecho, estar sentado durante períodos prolongados ha sido descrito como independientemente perjudicial. Cuanto más consistentemente los individuos incorporan el ejercicio aeróbico moderado en su rutina diaria, más pronunciada es la reducción en el riesgo de mortalidad.]]', '[[Sitting down all day is bad for you and exercise is good for you. People who exercise live longer than people who do not. Even a little bit of exercise is much better than nothing at all.|Estar sentado todo el día es malo para ti y el ejercicio es bueno para ti. Las personas que hacen ejercicio viven más que las que no lo hacen.]]', '[[Exercise is more good than not exercising. The more exercise you do the more healthy you are. Sedentary people are considerably less healthy than active people and this is a fact proven by many studies.|El ejercicio es más bueno que no hacer ejercicio. Cuanto más ejercicio haces, más sano estás.]]'], correctAnswer: 0, explanation: 'Option A uses "considerably higher than", "the more consistently…the more pronounced" and "far greater than" in formal health-science language. Options B and C are informal or contain grammatical errors.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u39-w2',
    type: 'writing',
    level: 'C1',
    topic: 'nutrition-writing',
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
    id: 'c1-u39-w3',
    type: 'writing',
    level: 'C1',
    topic: 'nutrition-writing',
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
