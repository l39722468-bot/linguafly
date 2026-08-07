/**
 * C1 Unit 32 — Business and Economic Trends
 * Module 6: Work and Economy
 * Grammar: Cause and result linkers (owing to, as a consequence, thereby, hence, thus, consequently)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Business and Economic Trends';

export const UNIT_32_EXERCISES: Exercise[] = [
{
    id: 'c1-u32-g1', type: 'multiple-choice', level: 'C1', topic: 'cause-result-linkers', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Cause and Result Linkers|Conectores de causa y resultado]]', instructions: 'Choose the sentence with the correct linker.',
      questions: [{ question: 'Which sentence uses a cause-and-result linker correctly?', options: ['[[Owing to a significant contraction in consumer demand, several major retailers were forced to announce store closures and substantial reductions in their workforce.|Debido a una contracción significativa en la demanda de los consumidores, varios grandes minoristas se vieron obligados a anunciar el cierre de tiendas y reducciones sustanciales en su plantilla.]]', '[[Due the significant contraction in consumer demand, several major retailers were forced to announce store closures and substantial workforce reductions.|Debido a la contracción significativa de la demanda de los consumidores, varios grandes minoristas se vieron obligados a anunciar el cierre de tiendas y reducciones en la plantilla.]]', '[[Owing to a significant contraction in consumer demand, several major retailers had been forced to announce closures and reductions of workforce.|Debido a una contracción significativa en la demanda de los consumidores, varios grandes minoristas se habían visto obligados a anunciar cierres y reducciones de personal.]]'], correctAnswer: 0, explanation: '"Owing to + noun phrase" = formal prepositional cause connector. Compare: "due to" (correct with "be"), "owing to" (used more broadly as a sentence adverbial).' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u32-g2', type: 'fill-blank', level: 'C1', topic: 'cause-result-linkers', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Consequently / Therefore|Consecuentemente / Por tanto]]', instructions: 'Complete with the correct result linker.',
      questions: [{ question: 'The central bank raised interest rates by a further fifty basis points. _______, mortgage repayments increased sharply, placing considerable financial pressure on households already struggling with inflation.', options: ['[[Consequently|Consecuentemente]]', '[[Despite this|A pesar de esto]]', '[[However|Sin embargo]]'], correctAnswer: 'Consequently', acceptableAnswers: ['Consequently', 'As a consequence', 'As a result', 'Therefore', 'Hence', 'Thus'], explanation: '"Consequently" = result connector placed at the start of a new clause/sentence after a semicolon or full stop. It is formal and links cause (rate rise) to effect (mortgage pressure).' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u32-g3', type: 'multiple-choice', level: 'C1', topic: 'cause-result-linkers', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Thereby|Con ello / Lo que]]', instructions: 'Choose the sentence using "thereby" correctly.',
      questions: [{ question: 'Which sentence uses "thereby" correctly?', options: ['[[The merger consolidated two competing supply chains into a single integrated network, thereby reducing logistical redundancy and generating significant cost savings across the combined operation.|La fusión consolidó dos cadenas de suministro competidoras en una única red integrada, lo que redujo la redundancia logística y generó importantes ahorros de costes en toda la operación conjunta.]]', '[[The merger consolidated two competing supply chains into a single network. Thereby, it reduced logistical redundancy and generated cost savings across the combined operation.|La fusión consolidó dos cadenas de suministro competidoras en una única red. Por lo tanto, redujo la redundancia logística y generó ahorros de costes en toda la operación.]]', '[[Thereby, the merger of two competing supply chains consolidated into a single integrated network, reducing logistical redundancy and generating significant cost savings.|Por lo tanto, la fusión de dos cadenas de suministro competidoras se consolidó en una única red integrada, reduciendo la redundancia logística.]]'], correctAnswer: 0, explanation: '"Thereby + -ing" = participial result clause — shows the means or result of the preceding action. It is NOT used at the start of a sentence like "therefore".' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u32-v1', type: 'multiple-choice', level: 'C1', topic: 'economics-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Economic Cycles|Ciclos económicos]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'An economy characterised by rising inflation combined with stagnant economic growth and high unemployment is described as experiencing _______.', options: ['[[stagflation|estanflación]]', '[[deflation|deflación]]', '[[hyperinflation|hiperinflación]]'], correctAnswer: 0, explanation: '"Stagflation" = simultaneous stagnation and inflation. "Deflation" = falling prices. "Hyperinflation" = extremely rapid price increases. Each represents a distinct macroeconomic condition.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u32-v2', type: 'fill-blank', level: 'C1', topic: 'economics-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Business Strategy|Estrategia empresarial]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'Following years of aggressive horizontal expansion, the conglomerate decided to _______ its operations by divesting non-core assets and concentrating resources on its most profitable divisions.', options: ['[[streamline|optimizar / racionalizar]]', '[[diversify|diversificar]]', '[[outsource|externalizar]]'], correctAnswer: 'streamline', acceptableAnswers: ['streamline'], explanation: '"Streamline" = to make an organisation more efficient by simplifying processes and eliminating non-essential activities. "Diversify" = expand into new areas. "Outsource" = contract out to a third party.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u32-v3', type: 'multiple-choice', level: 'C1', topic: 'economics-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Financial Markets|Mercados financieros]]', instructions: 'Choose the correct collocation.',
      questions: [{ question: 'After unexpectedly strong quarterly earnings, the company\'s share price _______ significantly on the stock exchange, outperforming analyst forecasts by a considerable margin.', options: ['[[surged|se disparó]]', '[[grew|creció]]', '[[walked|avanzó]]'], correctAnswer: 0, explanation: '"Surged" = standard financial reporting verb for a sharp, sudden rise. "Grew" is too neutral and general. "Walked up" is not used in financial contexts.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u32-r1', type: 'reading', level: 'C1', topic: 'economics-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Supply Chain Disruption|Interrupción de la cadena de suministro]]', instructions: 'Read and answer.',
      passage: 'The pandemic exposed fundamental vulnerabilities in globally integrated supply chains. Owing to decades of cost-optimisation strategies that prioritised efficiency over resilience, many manufacturers had reduced their inventory buffers to near zero, adopting so-called "just-in-time" production models. As a consequence, when shipping routes were disrupted and factory output fell, the knock-on effects rippled rapidly through multiple industries. Semiconductor shortages, for instance, halted automobile production lines on three continents. Hence, the post-pandemic period has seen a significant reconsideration of supply chain strategy, with many corporations investing in nearshoring and buffer stock maintenance — thereby accepting higher short-term costs in exchange for greater long-term operational security.',
      questions: [{ question: 'What strategic response to supply chain disruption does the text describe?', options: ['[[Companies are accepting higher short-term costs through nearshoring and buffer stock to improve long-term operational security.|Las empresas están aceptando costes a corto plazo más altos mediante el acercamiento de la producción y el mantenimiento de existencias de reserva para mejorar la seguridad operativa a largo plazo.]]', '[[Companies responded by adopting just-in-time models more broadly across all sectors to compensate for previous inefficiencies.|Las empresas respondieron adoptando modelos justo a tiempo de forma más amplia en todos los sectores para compensar las ineficiencias anteriores.]]', '[[Companies have eliminated all global supply chain dependencies by manufacturing exclusively in domestic markets.|Las empresas han eliminado todas las dependencias de la cadena de suministro global fabricando exclusivamente en mercados domésticos.]]'], correctAnswer: 0, explanation: 'The text describes corporations "investing in nearshoring and buffer stock maintenance — thereby accepting higher short-term costs in exchange for greater long-term operational security".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u32-r2', type: 'reading', level: 'C1', topic: 'economics-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Automation and Employment|Automatización y empleo]]', instructions: 'Read and answer.',
      passage: 'The relationship between technological automation and employment is considerably more nuanced than popular narratives suggest. Throughout industrial history, labour-saving innovations have eliminated certain categories of work while simultaneously generating demand for new types of employment. Thus, the introduction of automated weaving looms did not abolish textile employment; rather, it transformed it. The net effect on total employment levels was, consequently, neutral or even positive in the long run. Nevertheless, economists caution that the pace and scale of contemporary automation — driven by artificial intelligence and robotics — may be unprecedented, thereby challenging the assumption that new job categories will emerge quickly enough to absorb displaced workers.',
      questions: [{ question: 'What does the author argue about historical automation and employment?', options: ['[[Historically, automation has transformed rather than eliminated work overall, though the current pace of AI-driven automation may challenge this pattern.|Históricamente, la automatización ha transformado el trabajo en su conjunto más que eliminarlo, aunque el ritmo actual de la automatización impulsada por la IA puede desafiar este patrón.]]', '[[Historical automation consistently eliminated more jobs than it created, and current AI automation will follow the same destructive pattern without exception.|La automatización histórica eliminó consistentemente más empleos de los que creó, y la automatización de IA actual seguirá el mismo patrón destructivo.]]', '[[The author argues that automation has always had a neutral effect and will continue to do so regardless of the pace or scale of technological change.|El autor argumenta que la automatización siempre ha tenido un efecto neutral y continuará haciéndolo independientemente del ritmo o escala del cambio tecnológico.]]'], correctAnswer: 0, explanation: 'The text argues automation historically transformed rather than destroyed employment, but hedges with "may be unprecedented" regarding AI/robotics-driven automation.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u32-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'economics-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Business and Economic Trends), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u32-l1', type: 'listening', level: 'C1', topic: 'economics-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Business Analysis Podcast|Podcast de análisis empresarial]]', instructions: 'Read the transcript and answer.',
      passage: 'Host: You have argued that the current wave of corporate mergers is causing long-term harm. Can you explain why? | Analyst: Certainly. Owing to the substantial capital reserves accumulated by major corporations over the past decade, we have seen an acceleration of merger and acquisition activity. As a consequence, market concentration has increased substantially in sectors from healthcare to digital infrastructure. The danger is that reduced competition leads — almost inevitably — to pricing power, thereby allowing dominant firms to extract higher margins from consumers and business customers alike. Hence, what may appear as a rational business strategy at the firm level produces outcomes that are economically harmful at the systemic level.',
      questions: [{ question: 'What is the analyst\'s core argument about corporate mergers?', options: ['[[Mergers are individually rational for firms but collectively harmful because they reduce competition and enable dominant companies to raise prices.|Las fusiones son individualmente racionales para las empresas pero colectivamente dañinas porque reducen la competencia y permiten a las empresas dominantes subir los precios.]]', '[[Mergers are always harmful at the firm level and governments should prohibit all merger and acquisition activity immediately.|Las fusiones siempre son perjudiciales a nivel empresarial y los gobiernos deberían prohibir inmediatamente toda la actividad de fusiones y adquisiciones.]]', '[[Mergers are beneficial because they allow corporations to invest their capital reserves in innovation, generating competitive advantages for all market participants.|Las fusiones son beneficiosas porque permiten a las corporaciones invertir sus reservas de capital en innovación, generando ventajas competitivas para todos los participantes del mercado.]]'], correctAnswer: 0, explanation: 'The analyst distinguishes between rational firm-level strategy and harmful systemic outcomes (reduced competition, pricing power).' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u32-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'economics-listening',
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
    id: 'c1-u32-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'economics-listening',
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
    id: 'c1-u32-w1', type: 'writing', level: 'C1', topic: 'economics-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Cause and Effect Essay|Ensayo de causa y efecto]]', instructions: 'Which response uses cause-and-result linkers most accurately in formal writing?',
      questions: [{ question: 'Task: Write two sentences analysing the economic effects of rising interest rates.', options: ['[[Rising interest rates increase the cost of borrowing for both households and businesses; consequently, consumer spending contracts and corporate investment slows, thereby exerting downward pressure on GDP growth. Furthermore, as mortgage repayments rise, discretionary income falls, hence reducing demand across retail, leisure and hospitality sectors.|Los tipos de interés más altos aumentan el coste del endeudamiento para hogares y empresas; consecuentemente, el gasto del consumidor se contrae y la inversión empresarial se ralentiza, ejerciendo así presión a la baja sobre el crecimiento del PIB. Además, a medida que los pagos hipotecarios aumentan, la renta disponible cae, reduciendo la demanda en los sectores minorista, de ocio y hostelería.]]', '[[Interest rates going up makes things more expensive to borrow, so people spend less. This is bad for the economy because companies also invest less and then GDP goes down. People with mortgages suffer the most because they pay more each month.|Los tipos de interés más altos encarecen el endeudamiento, por lo que la gente gasta menos. Esto es malo para la economía porque las empresas también invierten menos y el PIB baja.]]', '[[Due to rising interest rates, everything gets more expensive and consequently people and companies have less money and the economy shrinks because of this. Therefore, governments should lower interest rates to fix the problem.|Debido a los tipos de interés más altos, todo se encarece y consecuentemente las personas y las empresas tienen menos dinero y la economía se contrae. Por lo tanto, los gobiernos deberían bajar los tipos de interés.]]'], correctAnswer: 0, explanation: 'Option A uses "consequently", "thereby" and "hence" correctly in formal contexts with precise economic terminology. Options B and C are informal or oversimplified.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u32-w2',
    type: 'writing',
    level: 'C1',
    topic: 'economics-writing',
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
    id: 'c1-u32-w3',
    type: 'writing',
    level: 'C1',
    topic: 'economics-writing',
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
