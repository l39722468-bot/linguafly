/**
 * C1 Unit 21 — The Environment and Climate Change
 * Module 4: The Natural World
 * Grammar: Emphatic fronting — topicalisation, fronted adverbials, inversion for focus
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'The Environment and Climate Change';

export const UNIT_21_EXERCISES: Exercise[] = [
{
    id: 'c1-u21-g1', type: 'multiple-choice', level: 'C1', topic: 'emphatic-fronting', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Emphatic Fronting|Topicalización enfática]]', instructions: 'Choose the sentence with correct emphatic fronting.',
      questions: [{ question: 'Which sentence correctly uses fronting to emphasise the underlined element: "The sheer scale of deforestation is what concerns scientists most."', options: ['[[What concerns scientists most is the sheer scale of deforestation.|Lo que más preocupa a los científicos es la escala del deforestation.]]', '[[Most is what scientists concern about the sheer scale of deforestation.|Lo más es de lo que se preocupan los científicos sobre la escala de la deforestación.]]', '[[Deforestation is what its sheer scale concerns scientists about most.|La deforestación es de lo que su enorme escala preocupa más a los científicos.]]'], correctAnswer: 0, explanation: '"What + clause + is/was" = pseudo-cleft fronting structure. It moves the focus element to the end after "be".' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u21-g2', type: 'fill-blank', level: 'C1', topic: 'emphatic-fronting', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Fronted Adverbials|Adverbiales en posición inicial]]', instructions: 'Complete the sentence with the correct fronted structure.',
      questions: [{ question: '_______ did the international community fully acknowledge the urgency of the climate crisis.', options: ['[[Only then|Solo entonces]]', '[[Then only|Solo entonces]]', '[[Only after|Solo después]]'], correctAnswer: 'Only then', acceptableAnswers: ['Only then'], explanation: '"Only then + inverted auxiliary + subject" = fronted adverbial triggering subject-auxiliary inversion for emphasis.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u21-g3', type: 'multiple-choice', level: 'C1', topic: 'emphatic-fronting', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Topicalisation|Topicalización]]', instructions: 'Choose the sentence with the most natural emphatic topicalisation.',
      questions: [{ question: 'You want to emphasise "carbon capture technology" as the topic. Which is correct?', options: ['[[Carbon capture technology, many scientists believe, holds the key to reversing the most damaging effects of industrialisation.|La tecnología de captura de carbono, creen muchos científicos, es la clave para revertir los efectos más dañinos de la industrialización.]]', '[[The technology of carbon capture, it is believed by many scientists to hold, is the key to reversing industrial damage.|La tecnología de captura de carbono, se cree por muchos científicos que tiene, es la clave para revertir el daño industrial.]]', '[[Many scientists are believing that carbon capture technology holds the key to reversing industrialisation effects.|Muchos científicos están creyendo que la tecnología de captura de carbono tiene la clave para revertir los efectos de la industrialización.]]'], correctAnswer: 0, explanation: 'Topicalisation moves the topic to sentence-initial position. The parenthetical "many scientists believe" inserts a reporting clause mid-sentence.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u21-v1', type: 'multiple-choice', level: 'C1', topic: 'environment-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Climate Change|Cambio climático]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'Scientists warn that we are approaching multiple climate _______ — thresholds beyond which changes become self-reinforcing and potentially irreversible, such as the collapse of ice sheets or Amazon dieback.', options: ['[[tipping points|puntos de inflexión]]', '[[breaking points|puntos de ruptura]]', '[[turning points|puntos de giro]]'], correctAnswer: 0, explanation: '"Tipping point" = the specific scientific/environmental term for a threshold at which a system shifts irreversibly. A "turning point" is a positive change; a "breaking point" is personal/mechanical.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u21-v2', type: 'fill-blank', level: 'C1', topic: 'environment-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Environmental Science|Ciencias medioambientales]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The _______ effect — in which greenhouse gases trap solar radiation within the atmosphere, raising global surface temperatures — is a natural phenomenon that human industrial activity has dramatically intensified.', options: ['[[greenhouse|invernadero]]', '[[hothouse|estufa]]', '[[warming|calentamiento]]'], correctAnswer: 'greenhouse', acceptableAnswers: ['greenhouse'], explanation: '"The greenhouse effect" = the standard scientific term for atmospheric heat retention by gases such as CO₂ and methane.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u21-v3', type: 'multiple-choice', level: 'C1', topic: 'environment-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Climate Policy|Política climática]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The commitment of many countries to achieving _______ emissions by 2050 — meaning that any remaining carbon output is balanced by carbon removal — has been criticised as insufficiently ambitious given the pace of warming.', options: ['[[net-zero|cero neto]]', '[[carbon-neutral|carbono neutro]]', '[[zero-emission|cero emisiones]]'], correctAnswer: 0, explanation: '"Net-zero" = the specific policy target meaning that greenhouse gas emissions are balanced by equivalent removals. "Carbon-neutral" specifically refers to CO₂ only.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u21-r1', type: 'reading-comprehension', level: 'C1', topic: 'environment-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Climate Change Debate|Debate sobre el cambio climático]]', instructions: 'Read and answer.',
      questions: [{ question: 'Text: "The framing of climate change as an issue of individual behaviour — encouraging consumers to reduce their carbon footprint, recycle more, drive less — has been criticised as a deliberate distraction from the structural changes needed: decarbonising industry, transforming energy systems, and holding corporations accountable for the overwhelming majority of global emissions."\n\nWhat argument does the text make about individual behaviour campaigns?', options: ['[[Individual behaviour changes are an important complement to structural reform and should be encouraged alongside regulation of corporate emissions and industrial decarbonisation.|Los cambios de comportamiento individual son un complemento importante de la reforma estructural y deben fomentarse junto con la regulación de las emisiones corporativas.]]', '[[Focusing on individual behaviour may serve to distract from the structural and corporate changes that are responsible for the vast majority of climate damage.|Centrarse en el comportamiento individual puede servir para distraer de los cambios estructurales y corporativos responsables de la gran mayoría del daño climático.]]', '[[Individual behaviour change is insufficient to address climate change because most people are unwilling to make the necessary sacrifices to reduce their personal carbon footprint.|El cambio de comportamiento individual es insuficiente para abordar el cambio climático porque la mayoría de las personas no están dispuestas a hacer los sacrificios necesarios.]]'], correctAnswer: 1, explanation: 'The text says individual behaviour framing has been "criticised as a deliberate distraction" from structural changes — a critique of the framing strategy, not just its effectiveness.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u21-r2', type: 'multiple-choice', level: 'C1', topic: 'environment-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Climate Solutions|Soluciones climáticas]]', instructions: 'Choose the best answer.',
      questions: [{ question: 'Text: "Geoengineering — the deliberate large-scale manipulation of the Earth\'s systems to counteract climate change — offers a technically feasible but morally and geopolitically fraught alternative to emissions reduction. Solar radiation management, for instance, could theoretically cool the planet within years, but the unilateral deployment of such technology by any single nation could trigger geopolitical conflict and produce unpredictable regional effects."\n\nWhat concern does the text raise about geoengineering?', options: ['[[Geoengineering is technically impossible because current scientific knowledge is insufficient to manipulate the Earth\'s climate systems safely and predictably at the required scale.|La geoingeniería es técnicamente imposible porque el conocimiento científico actual es insuficiente para manipular los sistemas climáticos de la Tierra de forma segura y predecible.]]', '[[Although technically possible, geoengineering raises serious concerns about unilateral use by individual nations and unpredictable consequences that could create international tensions.|Aunque técnicamente posible, la geoingeniería plantea serias preocupaciones sobre el uso unilateral por parte de naciones individuales y consecuencias impredecibles que podrían crear tensiones internacionales.]]', '[[Solar radiation management is the most promising geoengineering solution and should be deployed immediately because it can cool the planet within years without significant risks or side effects.|La gestión de la radiación solar es la solución de geoingeniería más prometedora y debe desplegarse inmediatamente porque puede enfriar el planeta en años sin riesgos significativos.]]'], correctAnswer: 1, explanation: 'The text calls it "technically feasible but morally and geopolitically fraught" and highlights the risk of unilateral deployment and unpredictable regional effects.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u21-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'environment-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (The Environment and Climate Change), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u21-l1', type: 'listening-comprehension', level: 'C1', topic: 'environment-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Climate Policy Lecture|Conferencia sobre política climática]]', instructions: 'Listen and choose the correct answer.',
      questions: [{ question: 'A climate scientist says: "The most dangerous narrative in climate discourse is the one that presents adaptation and mitigation as either/or choices. We cannot simply adapt our way out of 4 degrees of warming, nor can we mitigate fast enough to avoid significant adaptation demands. What\'s needed is a coherent strategy that pursues both with equal urgency — and is honest about the limits of each."\n\nWhat is the scientist\'s main argument?', options: ['[[Mitigation — reducing emissions — should be the absolute priority in climate policy because adaptation alone cannot protect human societies from the most severe consequences of unchecked warming.|La mitigación — reducción de emisiones — debe ser la prioridad absoluta en la política climática porque la adaptación sola no puede proteger a las sociedades humanas.]]', '[[Adaptation and mitigation are both necessary and should be pursued simultaneously, as neither alone can adequately address the full scale and urgency of the climate challenge.|La adaptación y la mitigación son ambas necesarias y deben perseguirse simultáneamente, ya que ninguna por sí sola puede abordar adecuadamente la escala y urgencia del desafío climático.]]', '[[The distinction between adaptation and mitigation is a false one created by policymakers to justify inaction, since all effective climate responses combine elements of both approaches.|La distinción entre adaptación y mitigación es falsa, creada por los responsables políticos para justificar la inacción, ya que todas las respuestas climáticas efectivas combinan elementos de ambos enfoques.]]'], correctAnswer: 1, explanation: 'The scientist explicitly argues against the "either/or" framing and calls for "both with equal urgency" — simultaneous pursuit of adaptation and mitigation.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u21-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'environment-listening',
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
    id: 'c1-u21-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'environment-listening',
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
    id: 'c1-u21-w1', type: 'multiple-choice', level: 'C1', topic: 'persuasive-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Formal Report|Informe formal]]', instructions: 'Choose the best conclusion paragraph for a formal report on climate policy.',
      questions: [{ question: 'You are concluding a formal report on the effectiveness of international climate agreements. Choose the most appropriate conclusion:', options: ['[[In conclusion, international climate agreements have achieved some progress but remain inadequate. Without binding enforcement mechanisms, transparent reporting requirements and a genuine commitment to climate justice, the gap between stated ambitions and measurable outcomes will continue to widen.|En conclusión, los acuerdos climáticos internacionales han logrado algún progreso pero siguen siendo inadecuados. Sin mecanismos de aplicación vinculantes, requisitos de informes transparentes y un compromiso genuino con la justicia climática, la brecha seguirá ampliándose.]]', '[[In conclusion, climate agreements are not working very well. Countries are not doing what they promised and the planet is still getting warmer. More needs to be done urgently.|En conclusión, los acuerdos climáticos no están funcionando muy bien. Los países no están cumpliendo sus promesas y el planeta sigue calentándose. Se necesita hacer más urgentemente.]]', '[[In conclusion, I think that climate agreements are quite good but could be better. There are many problems with them but also some good things. Overall they are probably better than having nothing at all.|En conclusión, creo que los acuerdos climáticos son bastante buenos pero podrían ser mejores. Hay muchos problemas con ellos pero también cosas buenas. En general probablemente sean mejor que no tener nada.]]'], correctAnswer: 0, explanation: 'Option A uses formal register, nominalisation, specific policy criteria and a conditional structure to present a nuanced, evidence-based conclusion.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u21-w2',
    type: 'writing',
    level: 'C1',
    topic: 'persuasive-writing',
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
    id: 'c1-u21-w3',
    type: 'writing',
    level: 'C1',
    topic: 'persuasive-writing',
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
