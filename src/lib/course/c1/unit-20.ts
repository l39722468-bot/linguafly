/**
 * C1 Unit 20 — Economics and Globalisation
 * Module 4: Society, Law and Governance
 * Grammar: Nominalisation — converting verbs and adjectives into noun phrases
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Economics and Globalisation';

export const UNIT_20_EXERCISES: Exercise[] = [
{
    id: 'c1-u20-g1', type: 'multiple-choice', level: 'C1', topic: 'nominalisation', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Nominalisation|Nominalización]]', instructions: 'Choose the sentence that best demonstrates formal nominalisation.',
      questions: [{ question: 'Which version uses nominalisation correctly in a formal economic context?', options: ['[[The implementation of trade agreements requires careful negotiation between sovereign states and a thorough assessment of long-term economic implications.|La implementación de acuerdos comerciales requiere una negociación cuidadosa entre estados soberanos y una evaluación exhaustiva de las implicaciones económicas a largo plazo.]]', '[[When we implement trade agreements, we need to negotiate carefully between countries and assess what the long-term economic implications might be.|Cuando implementamos acuerdos comerciales, necesitamos negociar cuidadosamente entre países y evaluar cuáles podrían ser las implicaciones económicas a largo plazo.]]', '[[Implementing trade agreements is something that requires countries to negotiate carefully and for them to assess the implications that exist over the long term economically.|Implementar acuerdos comerciales es algo que requiere que los países negocien cuidadosamente y que evalúen las implicaciones que existen a largo plazo económicamente.]]'], correctAnswer: 0, explanation: 'Nominalisation converts verbs to nouns: "implement" → "implementation", "negotiate" → "negotiation", "assess" → "assessment". This creates the formal, impersonal style of academic and economic writing.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u20-g2', type: 'fill-blank', level: 'C1', topic: 'nominalisation', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Nominalisation|Nominalización]]', instructions: 'Convert the verb in brackets to its noun form.',
      questions: [{ question: 'The _______ (to distribute) of wealth remains deeply unequal across globalised economies, with the wealthiest 1% holding a disproportionate share of global assets.', options: ['[[distribution|distribución]]', '[[distributing|distribuyendo]]', '[[distributed|distribuido]]'], correctAnswer: 'distribution', acceptableAnswers: ['distribution'], explanation: '"Distribution" (noun) from "to distribute" (verb) — nominalisation creates a more formal, abstract subject for the sentence.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u20-g3', type: 'multiple-choice', level: 'C1', topic: 'nominalisation', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Nominalisation Suffixes|Sufijos de nominalización]]', instructions: 'Choose the correct nominalised form.',
      questions: [{ question: 'The economist argued that the _______ of central bank interest rates at near-zero levels for over a decade had distorted asset prices and incentivised speculative investment over productive activity.', options: ['[[maintenance|mantenimiento]]', '[[maintaining|mantenimiento]]', '[[maintained|mantenido]]'], correctAnswer: 0, explanation: '"Maintenance" = noun from "maintain" using the -ance suffix. In formal economic writing, nominal constructions are preferred over verbal or participial forms.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u20-v1', type: 'multiple-choice', level: 'C1', topic: 'economics-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Economics and Trade|Economía y comercio]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'A country that consistently spends more on imports than it earns from exports is said to have a trade _______ — a situation that may eventually require borrowing from abroad to finance domestic consumption.', options: ['[[deficit|déficit]]', '[[surplus|superávit]]', '[[balance|equilibrio]]'], correctAnswer: 0, explanation: '"Trade deficit" = imports exceed exports. "Trade surplus" = exports exceed imports. "Trade balance" = the general measurement of the difference.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u20-v2', type: 'fill-blank', level: 'C1', topic: 'economics-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Globalisation|Globalización]]', instructions: 'Complete with the correct term.',
      questions: [{ question: 'The term _______ describes the process by which multinational corporations relocate manufacturing to countries with lower labour costs, environmental standards and regulatory oversight.', options: ['[[offshoring|deslocalización]]', '[[outsourcing|externalización]]', '[[reshoring|relocalización]]'], correctAnswer: 'offshoring', acceptableAnswers: ['offshoring'], explanation: '"Offshoring" = relocating business operations to another country, typically to reduce costs. "Outsourcing" = contracting work to a third party (can be domestic).' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u20-v3', type: 'multiple-choice', level: 'C1', topic: 'economics-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Financial Markets|Mercados financieros]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'When an economy experiences rapid economic growth accompanied by excessive speculation, followed by a sudden collapse in asset prices and economic output, economists describe this as a _______ cycle.', options: ['[[boom and bust|auge y caída]]', '[[bull and bear|mercado alcista y bajista]]', '[[inflation and deflation|inflación y deflación]]'], correctAnswer: 0, explanation: '"Boom and bust" = a cycle of rapid growth followed by sharp contraction. "Bull/bear" refers to market sentiment. "Inflation/deflation" refers to price levels.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u20-r1', type: 'reading-comprehension', level: 'C1', topic: 'economics-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Globalisation Debate|Debate sobre globalización]]', instructions: 'Read and answer.',
      questions: [{ question: 'Text: "Globalisation has simultaneously generated unprecedented wealth and exacerbated inequality — lifting hundreds of millions out of poverty in the Global South while hollowing out manufacturing communities in advanced economies. The winners and losers do not map neatly onto national boundaries; the wealthiest citizens of every country have benefited disproportionately, while working-class communities across the world have borne a disproportionate share of the adjustment costs."\n\nWhat is the central argument?', options: ['[[Globalisation has been largely beneficial overall, as the evidence from poverty reduction in the Global South demonstrates that its economic benefits outweigh the more localised losses in advanced economies.|La globalización ha sido en general bastante beneficiosa, ya que la evidencia de la reducción de la pobreza en el Sur Global demuestra que sus beneficios económicos superan las pérdidas más localizadas en las economías avanzadas.]]', '[[The benefits and costs of globalisation are distributed unequally, falling disproportionately along class rather than national lines, with the wealthy gaining more and working-class communities absorbing greater adjustment costs everywhere.|Los beneficios y costes de la globalización se distribuyen de forma desigual, cayendo desproporcionadamente según líneas de clase más que nacionales, con los ricos ganando más y las comunidades trabajadoras absorbiendo mayores costes de ajuste en todas partes.]]', '[[Globalisation has failed because although some countries have benefited through poverty reduction, it has destroyed working-class communities in wealthy nations and created a net negative economic outcome for the world as a whole.|La globalización ha fracasado porque aunque algunos países se han beneficiado mediante la reducción de la pobreza, ha destruido las comunidades de clase trabajadora en las naciones ricas y ha creado un resultado económico neto negativo para el mundo.]]'], correctAnswer: 1, explanation: 'The text explicitly states: "The winners and losers do not map neatly onto national boundaries" — the key point is that inequality is along class lines, not national lines.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u20-r2', type: 'multiple-choice', level: 'C1', topic: 'economics-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[International Trade|Comercio internacional]]', instructions: 'Choose the best answer.',
      questions: [{ question: 'Text: "Comparative advantage — the principle that countries should specialise in goods they produce relatively most efficiently and trade for the rest — remains the theoretical cornerstone of free trade. Critics, however, argue that the theory\'s static assumptions ignore dynamic realities: the industries a country abandons rarely recover, the communities built around them do not simply retrain and relocate, and the competitive pressures of open markets may prevent developing countries from building the industrial base needed for long-term growth."\n\nWhat limitation of comparative advantage theory does the text identify?', options: ['[[The theory incorrectly assumes that all countries have equal access to technology and capital, which means it only benefits wealthier nations that already possess the advanced infrastructure needed to specialise effectively.|La teoría asume incorrectamente que todos los países tienen igual acceso a tecnología y capital, lo que significa que solo beneficia a las naciones más ricas que ya poseen la infraestructura avanzada necesaria.]]', '[[The theory\'s static assumptions fail to account for the real-world costs of industrial decline, labour immobility and the difficulty of building new industrial capacity — particularly for developing economies seeking long-term growth.|Los supuestos estáticos de la teoría no tienen en cuenta los costes reales del declive industrial, la inmovilidad laboral y la dificultad de construir nueva capacidad industrial, especialmente para las economías en desarrollo.]]', '[[The theory of comparative advantage was developed in a pre-globalised era and has been rendered completely obsolete by the emergence of multinational corporations and global value chains in the modern economy.|La teoría de la ventaja comparativa fue desarrollada en una era pre-globalizada y ha quedado completamente obsoleta por la aparición de corporaciones multinacionales y cadenas de valor globales en la economía moderna.]]'], correctAnswer: 1, explanation: 'The text identifies "static assumptions" that ignore: industries not recovering, workers not retraining/relocating, and developing nations being unable to build industrial bases.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u20-r3',
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
            'Text: "Returning to the core theme of this unit (Economics and Globalisation), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u20-l1', type: 'listening-comprehension', level: 'C1', topic: 'economics-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Economic Panel Discussion|Debate económico]]', instructions: 'Listen and choose the correct answer.',
      questions: [{ question: 'An economist says: "The premise that markets self-correct — that if left alone they will reliably allocate resources efficiently and return to equilibrium after shocks — proved devastatingly wrong in 2008. What we witnessed was not a temporary aberration but a structural failure that required massive state intervention to prevent total collapse. The theoretical models simply did not account for the systemic risks embedded in the architecture of the financial system itself."\n\nWhat does the economist argue?', options: ['[[The 2008 financial crisis was an unusual, temporary event caused by specific regulatory failures, but the underlying principle that markets self-correct remains fundamentally valid under normal conditions and appropriate oversight.|La crisis financiera de 2008 fue un evento inusual y temporal causado por fallos regulatorios específicos, pero el principio subyacente de que los mercados se autocorrigen sigue siendo fundamentalmente válido bajo condiciones normales.]]', '[[The 2008 crisis exposed that the theory of self-correcting markets is flawed because it ignores systemic structural risks and required large-scale state intervention rather than self-correction to prevent collapse.|La crisis de 2008 expuso que la teoría de los mercados de autocorrección es defectuosa porque ignora los riesgos estructurales sistémicos y requirió una intervención estatal a gran escala en lugar de autocorrección para evitar el colapso.]]', '[[The main lesson of 2008 is that economic models need to be updated to include more sophisticated risk calculations, but this is primarily a technical modelling challenge rather than a fundamental challenge to market economics.|La principal lección de 2008 es que los modelos económicos necesitan actualizarse para incluir cálculos de riesgo más sofisticados, pero esto es principalmente un desafío técnico de modelado más que un desafío fundamental.]]'], correctAnswer: 1, explanation: 'The economist calls it "a structural failure" requiring "massive state intervention" and says it "proved devastatingly wrong" — a fundamental, not technical, critique of self-correcting market theory.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u20-l2',
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
    id: 'c1-u20-l3',
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
    id: 'c1-u20-w1', type: 'multiple-choice', level: 'C1', topic: 'academic-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Academic Essay|Ensayo académico]]', instructions: 'Choose the best introductory paragraph for an academic essay on globalisation and inequality.',
      questions: [{ question: 'Essay title: "Globalisation has created more problems than it has solved. To what extent do you agree?" Choose the best introduction:',
        options: [
          '[[Globalisation is a very controversial topic and many people have different opinions about it. Some people think it has been good for the world and others think it has caused many problems. This essay will look at both sides of the argument before reaching a conclusion.|La globalización es un tema muy controvertido y muchas personas tienen opiniones diferentes al respecto. Algunas personas piensan que ha sido buena para el mundo y otras piensan que ha causado muchos problemas. Este ensayo examinará ambos lados del argumento.]]',
          '[[The contention that globalisation has generated more problems than solutions demands careful interrogation. While the integration of global markets has demonstrably reduced absolute poverty in parts of the developing world, it has simultaneously exacerbated inequality within nations, destabilised communities and created systemic financial risks of unprecedented scale. A nuanced assessment therefore resists both wholesale endorsement and wholesale condemnation.|La afirmación de que la globalización ha generado más problemas que soluciones exige una investigación cuidadosa. Si bien la integración de los mercados globales ha reducido la pobreza absoluta en partes del mundo en desarrollo, simultáneamente ha exacerbado la desigualdad dentro de las naciones, desestabilizado comunidades y creado riesgos financieros sistémicos de escala sin precedentes.]]',
          '[[Globalisation started in the twentieth century and has grown a lot since then. It involves trade, communication and movement of people between countries. This essay will argue that globalisation has caused more problems than it has solved, including inequality, environmental damage and cultural homogenisation.|La globalización comenzó en el siglo XX y ha crecido mucho desde entonces. Implica el comercio, la comunicación y el movimiento de personas entre países. Este ensayo argumentará que la globalización ha causado más problemas de los que ha resuelto.]]',
        ],
        correctAnswer: 1,
        explanation: 'Option B uses sophisticated academic register, nominalisation ("integration", "assessment"), hedging ("demonstrably", "nuanced"), and introduces complexity immediately — all C1 writing features.',
      }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u20-w2',
    type: 'writing',
    level: 'C1',
    topic: 'academic-writing',
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
    id: 'c1-u20-w3',
    type: 'writing',
    level: 'C1',
    topic: 'academic-writing',
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
