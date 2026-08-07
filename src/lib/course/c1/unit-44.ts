/**
 * C1 Unit 44 — Migration and Displacement
 * Module 8: Global Issues
 * Grammar: Fronting and topicalisation (As for… / What we need is… / The issue of X is one that… / It is X that…)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Migration and Displacement';

export const UNIT_44_EXERCISES: Exercise[] = [
{
    id: 'c1-u44-g1', type: 'multiple-choice', level: 'C1', topic: 'fronting', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Fronting for Emphasis|Frontposición para énfasis]]', instructions: 'Choose the sentence that uses fronting most accurately.',
      questions: [{ question: 'Which sentence correctly uses fronting to emphasise a key element?', options: ['[[Increasingly complex are the political and humanitarian trade-offs that governments must navigate when designing migration policy — balancing border security, humanitarian obligations, labour market needs and public sentiment in ways that satisfy none of these interests fully.|Cada vez más complejos son los intercambios políticos y humanitarios que los gobiernos deben negociar al diseñar la política migratoria, equilibrando la seguridad fronteriza, las obligaciones humanitarias, las necesidades del mercado laboral y el sentimiento público.]]', '[[Increasingly complex are the political and humanitarian trade-offs when they must navigate governments designing migration policy, balancing all these interests that satisfy none of them fully.|Cada vez más complejos son los intercambios políticos y humanitarios cuando los gobiernos deben navegar al diseñar la política migratoria.]]', '[[The political and humanitarian trade-offs are increasingly complex for governments navigating migration policy increasingly, which must balance security, humanitarian obligations and public sentiment which satisfy none fully.|Los intercambios políticos y humanitarios son cada vez más complejos para los gobiernos que navegan la política migratoria.]]'], correctAnswer: 0, explanation: 'Fronting: "Increasingly complex + inverted verb + subject" — the adjective phrase is moved to the front, followed by subject-verb inversion. Option B has a word-order error; Option C does not front.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u44-g2', type: 'fill-blank', level: 'C1', topic: 'fronting', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[As for… / As regards…|En cuanto a… / En lo que respecta a…]]', instructions: 'Complete with the correct topicaliser.',
      questions: [{ question: '_______ the distinction between economic migrants and refugees, the legal boundary is clear in principle but frequently difficult to apply in practice, given that poverty, violence and persecution often co-occur within the same displaced population.', options: ['[[As for|En cuanto a]]', '[[As to being|En cuanto a ser]]', '[[Regarding to|En cuanto a (incorrecto)]]'], correctAnswer: 'As for', acceptableAnswers: ['As for', 'As regards', 'With regard to', 'Regarding'], explanation: '"As for + noun phrase" = topicaliser that introduces the subject of what follows. "As to being" is ungrammatical in this context. "Regarding to" is wrong — it should be "regarding" (no preposition needed after).' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u44-g3', type: 'multiple-choice', level: 'C1', topic: 'fronting', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[What-Clauses as Topicalisers|Cláusulas "What" como topicalizadores]]', instructions: 'Choose the most effective topicalised sentence.',
      questions: [{ question: 'Which sentence most effectively uses a "What…" structure to topicalise the key argument?', options: ['[[What the data on migration consistently reveal is not a wave of uncontrolled movement threatening social cohesion, but rather a set of orderly, economically-driven flows responding to labour market signals in host countries — a picture that bears little resemblance to the narratives dominant in much populist political discourse.|Lo que los datos sobre migración revelan consistentemente no es una oleada de movimiento incontrolado que amenaza la cohesión social, sino un conjunto de flujos ordenados y económicamente motivados que responden a las señales del mercado laboral en los países de acogida.]]', '[[What the data on migration consistently reveals is that it is not a wave as people say, but more like orderly movement. This is different from what populist politicians say about it in their political speeches.|Lo que los datos sobre migración revelan consistentemente es que no es una oleada como dice la gente, sino más bien un movimiento ordenado.]]', '[[What is the data on migration revealing consistently is not a wave of uncontrolled movement but rather a set of economically-driven flows that respond to labour markets in host countries.|Lo que revelan consistentemente los datos sobre migración no es una oleada de movimiento incontrolado sino un conjunto de flujos económicamente motivados.]]'], correctAnswer: 0, explanation: '"What + subject + verb + is + noun clause" = effective topicalisation that foregrounds the main claim. "What is the data revealing" inverts incorrectly. Option B is grammatically acceptable but too informal for C1 academic writing.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u44-v1', type: 'multiple-choice', level: 'C1', topic: 'migration-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Migration Categories|Categorías de migración]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'A person who flees their country of origin due to armed conflict, generalised violence or a well-founded fear of persecution on the grounds of race, religion, nationality, political opinion or membership of a particular social group — as defined by the 1951 Refugee Convention — is classified as a _______.', options: ['[[refugee|refugiado]]', '[[economic migrant|migrante económico]]', '[[internally displaced person|persona desplazada internamente]]'], correctAnswer: 0, explanation: '"Refugee" = legal status under the 1951 Convention. "Economic migrant" = someone who moves primarily for employment or better living conditions — different legal category with fewer international protections. "IDP" = displaced within their own country, not covered by the Refugee Convention.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u44-v2', type: 'fill-blank', level: 'C1', topic: 'migration-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Displacement|Desplazamiento]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'Individuals who have been forced to leave their homes due to armed conflict, violence or disaster but who have not crossed an international border — and therefore fall outside the legal protection framework of the Refugee Convention — are referred to as internally _______ persons (IDPs).', options: ['[[displaced|desplazadas]]', '[[migrated|migradas]]', '[[exiled|exiliadas]]'], correctAnswer: 'displaced', acceptableAnswers: ['displaced'], explanation: '"Internally displaced persons" (IDPs) = people forced to move within their own country. As they have not crossed an international border, they do not qualify for refugee status, leaving them in a legal protection gap under international law.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u44-v3', type: 'multiple-choice', level: 'C1', topic: 'migration-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Integration Policy|Política de integración]]', instructions: 'Choose the correct collocation.',
      questions: [{ question: 'The process by which migrants gradually adopt the language, cultural norms and social practices of the host society whilst simultaneously being permitted to retain aspects of their own cultural identity — as distinct from full assimilation or segregation — is commonly described as _______.', options: ['[[integration|integración]]', '[[assimilation|asimilación]]', '[[acculturation|aculturación]]'], correctAnswer: 0, explanation: '"Integration" = maintaining cultural identity whilst participating fully in the host society. "Assimilation" = complete adoption of host culture with loss of original identity. "Acculturation" = broader anthropological term for cultural change through contact — includes both integration and assimilation.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u44-r1', type: 'reading', level: 'C1', topic: 'migration-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Economics of Migration|La economía de la migración]]', instructions: 'Read and answer.',
      passage: 'What the economic evidence on migration consistently demonstrates is that the relationship between immigration and host-country labour markets is considerably more nuanced than is suggested by either enthusiastic pro-immigration arguments or by nativist claims about wage depression and job displacement. As for the effect on wages, the research indicates that the impact is largely concentrated at the lower end of the skill distribution and primarily affects earlier cohorts of migrants rather than native workers. The fiscal contribution of migrants, by contrast, is widely reported to be positive across most receiving countries, particularly when migrants are of working age and when their skills complement rather than directly substitute for those of the existing workforce. It is the failure to communicate this complexity, rather than the phenomenon of migration itself, that has arguably allowed populist narratives to fill the information vacuum with simplifications that bear limited relationship to the empirical record.',
      questions: [{ question: 'According to the text, what does research show about the wage impact of immigration?', options: ['[[The impact is largely concentrated at the lower end of the skill distribution and primarily affects earlier cohorts of migrants rather than native workers, making the overall effect on wages more limited than populist narratives suggest.|El impacto se concentra en gran medida en el extremo inferior de la distribución de habilidades y afecta principalmente a cohortes anteriores de migrantes más que a trabajadores nativos, lo que hace que el efecto general sobre los salarios sea más limitado de lo que sugieren las narrativas populistas.]]', '[[Research shows that immigration has a strongly positive effect on wages across all skill levels in host countries, as increased labour supply stimulates economic growth and generates new employment opportunities for everyone.|La investigación muestra que la inmigración tiene un efecto fuertemente positivo sobre los salarios en todos los niveles de habilidad en los países de acogida, ya que el aumento de la oferta laboral estimula el crecimiento económico.]]', '[[The wage impact of immigration is uniformly negative for all native workers regardless of their skill level, which explains why immigration generates widespread political opposition in most democratic countries.|El impacto salarial de la inmigración es uniformemente negativo para todos los trabajadores nativos independientemente de su nivel de habilidad, lo que explica por qué la inmigración genera una amplia oposición política.]]'], correctAnswer: 0, explanation: 'The text says the wage impact "is largely concentrated at the lower end of the skill distribution and primarily affects earlier cohorts of migrants rather than native workers".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u44-r2', type: 'reading', level: 'C1', topic: 'migration-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Climate Migration|Migración climática]]', instructions: 'Read and answer.',
      passage: 'As for the future of human mobility, the issue of climate-induced displacement is one that policymakers are only beginning to take seriously. Current projections suggest that by 2050, between 200 million and one billion people could be forced to leave their homes due to rising sea levels, extreme heat, water scarcity and the collapse of agricultural systems — a scale of movement that would dwarf anything witnessed in modern history. What is particularly alarming is that existing international legal frameworks were designed without this scenario in mind: the Refugee Convention makes no provision for those displaced by environmental factors, leaving climate migrants in a legal grey zone. It is the absence of a binding international instrument — rather than a shortage of scientific evidence or policy proposals — that represents the most significant obstacle to protecting the rights of those who will be displaced by climate change.',
      questions: [{ question: 'What does the text identify as the most significant obstacle to protecting climate migrants?', options: ['[[The absence of a binding international legal instrument specifically addressing climate displacement — rather than a shortage of evidence or policy proposals — since existing frameworks were designed without this scenario in mind.|La ausencia de un instrumento jurídico internacional vinculante que aborde específicamente el desplazamiento climático, ya que los marcos existentes fueron diseñados sin tener en cuenta este escenario.]]', '[[The most significant obstacle is the scale of the projected displacement — between 200 million and one billion people — which is simply too large for any international legal framework to adequately address.|El obstáculo más significativo es la escala del desplazamiento proyectado, que es simplemente demasiado grande para que cualquier marco jurídico internacional lo aborde adecuadamente.]]', '[[The refusal of major emitting nations to accept any legal responsibility for displacement caused by climate change they have disproportionately contributed to through their historical greenhouse gas emissions.|La negativa de las principales naciones emisoras a aceptar responsabilidad legal por el desplazamiento causado por el cambio climático al que han contribuido de manera desproporcionada.]]'], correctAnswer: 0, explanation: 'The text uses an it-cleft: "It is the absence of a binding international instrument — rather than a shortage of scientific evidence or policy proposals — that represents the most significant obstacle".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u44-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'migration-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Migration and Displacement), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u44-l1', type: 'listening', level: 'C1', topic: 'migration-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Seminar on Migration Policy|Un seminario sobre política migratoria]]', instructions: 'Read the transcript and answer.',
      passage: 'Professor: What I want to highlight today is the gap between the political and the empirical debate about migration. As for public perception, surveys consistently show that people overestimate both the number of migrants in their country and the proportion receiving welfare benefits. The issue of integration is one that tends to be discussed as though it were solely a question of immigrant behaviour — what migrants do or fail to do — when in fact what the research shows is that host society reception, institutional support and labour market access are at least as determinative of integration outcomes as any characteristic of migrants themselves. It is the framing of integration as a one-way street — assimilation demanded of the newcomer, adaptation expected of no one else — that has, in my view, produced many of the policy failures we observe. Student: Does that mean host society attitudes cannot be changed by policy? Professor: Not at all. What effective integration policy requires is investment on both sides: language and civic education for newcomers, and active anti-discrimination measures and cross-cultural contact programmes for receiving communities.',
      questions: [{ question: 'What does the professor argue about the determinants of integration outcomes?', options: ['[[Host society reception, institutional support and labour market access are at least as determinative of integration outcomes as migrant characteristics — making integration a two-way process rather than a demand placed solely on migrants.|La recepción de la sociedad de acogida, el apoyo institucional y el acceso al mercado laboral son al menos tan determinantes de los resultados de integración como las características de los migrantes, lo que hace que la integración sea un proceso bidireccional.]]', '[[The professor argues that individual migrant characteristics — including language skills, educational background and cultural flexibility — are the primary determinants of integration success, with host society attitudes playing a secondary role.|El profesor argumenta que las características individuales del migrante son los principales determinantes del éxito de la integración, con las actitudes de la sociedad de acogida desempeñando un papel secundario.]]', '[[Integration outcomes are determined almost entirely by economic factors: migrants who find stable employment integrate successfully regardless of host society attitudes or institutional support structures.|Los resultados de integración están determinados casi en su totalidad por factores económicos: los migrantes que encuentran empleo estable se integran con éxito independientemente de las actitudes de la sociedad de acogida.]]'], correctAnswer: 0, explanation: 'The professor says "host society reception, institutional support and labour market access are at least as determinative of integration outcomes as any characteristic of migrants themselves".' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u44-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'migration-listening',
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
    id: 'c1-u44-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'migration-listening',
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
    id: 'c1-u44-w1', type: 'writing', level: 'C1', topic: 'migration-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Fronting and Topicalisation in Academic Writing|Frontposición y topicalización en escritura académica]]', instructions: 'Which response uses fronting and topicalisation most effectively?',
      questions: [{ question: 'Task: Write two sentences arguing that migration debate needs to be reframed around evidence.', options: ['[[What is urgently required is a fundamental reframing of the public debate on migration — one grounded in demographic and economic evidence rather than in the anxieties that political entrepreneurs have found it profitable to amplify; as for the claim that migration threatens cultural cohesion, it is the evidence of successful multicultural societies, not theoretical argument alone, that provides the most compelling response to this assertion.|Lo que se necesita urgentemente es una reformulación fundamental del debate público sobre la migración, basada en evidencia demográfica y económica en lugar de en las ansiedades que los empresarios políticos han encontrado rentable amplificar.]]', '[[The migration debate needs to change. What we need is more evidence-based discussion. As for the cultural threat argument, this is not supported by the evidence. Fronting the facts rather than the fears would improve public debate.|El debate sobre migración necesita cambiar. Lo que necesitamos es una discusión más basada en evidencia.]]', '[[Migration is a topic that is important for society. The issue of migration is one that needs better discussion. What the debate needs is more evidence. Topicalising the right questions would help improve the quality of public discourse on this matter.|La migración es un tema importante para la sociedad. El debate necesita más evidencia.]]'], correctAnswer: 0, explanation: 'Option A uses "What is urgently required" (what-fronting), "as for the claim" (topicaliser), and "it is the evidence…that" (cleft) — three distinct fronting and topicalisation structures in formal register.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u44-w2',
    type: 'writing',
    level: 'C1',
    topic: 'migration-writing',
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
    id: 'c1-u44-w3',
    type: 'writing',
    level: 'C1',
    topic: 'migration-writing',
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
