/**
 * C1 Unit 22 — Biodiversity and Conservation
 * Module 4: The Natural World
 * Grammar: Hedging language — tend to, appear to, seem to, it could be argued, arguably
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Biodiversity and Conservation';

export const UNIT_22_EXERCISES: Exercise[] = [
{
    id: 'c1-u22-g1', type: 'multiple-choice', level: 'C1', topic: 'hedging-language', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Hedging Language|Lenguaje de cobertura epistémica]]', instructions: 'Choose the sentence that uses hedging most appropriately for academic writing.',
      questions: [{ question: 'Which sentence uses hedging language correctly in an academic context?', options: ['[[The data would appear to suggest a correlation between habitat fragmentation and population decline in migratory bird species, though the causal mechanism remains a matter of ongoing investigation.|Los datos parecen sugerir una correlación entre la fragmentación del hábitat y el declive de la población en aves migratorias, aunque el mecanismo causal sigue siendo objeto de investigación.]]', '[[The data completely proves that habitat fragmentation is definitely causing population decline in all migratory bird species without any doubt whatsoever.|Los datos prueban completamente que la fragmentación del hábitat está definitivamente causando el declive de la población en todas las aves migratorias sin ninguna duda.]]', '[[The data is showing that habitat fragmentation is probably causing population decline in migratory bird species as scientists are currently saying.|Los datos muestran que la fragmentación del hábitat probablemente está causando el declive en las aves migratorias como los científicos están diciendo actualmente.]]'], correctAnswer: 0, explanation: '"Would appear to suggest" = double hedging (modal + lexical hedge). "Though... remains a matter of investigation" = epistemic caveat. This is appropriate academic hedging.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u22-g2', type: 'fill-blank', level: 'C1', topic: 'hedging-language', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Hedging Verbs|Verbos de cobertura]]', instructions: 'Complete with a hedging expression.',
      questions: [{ question: 'Rewilding projects _______ to produce measurable biodiversity gains within five to ten years, though long-term ecosystem stability is harder to predict.', options: ['[[tend|tienden]]', '[[must|deben]]', '[[will|van a]]'], correctAnswer: 'tend', acceptableAnswers: ['tend', 'appear', 'seem'], explanation: '"Tend to" = hedging verb expressing a general tendency without claiming universal truth. More cautious than "will" or "must".' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u22-g3', type: 'multiple-choice', level: 'C1', topic: 'hedging-language', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Impersonal Hedging|Cobertura impersonal]]', instructions: 'Choose the most appropriate hedging structure.',
      questions: [{ question: 'You want to cautiously suggest that protected area networks are insufficient. Which is the most appropriate academic hedging?', options: ['[[It could be argued that current protected area networks, while expanding in coverage, remain fundamentally inadequate to prevent the biodiversity losses projected under current deforestation trajectories.|Podría argumentarse que las redes de áreas protegidas actuales, aunque en expansión, siguen siendo fundamentalmente inadecuadas para prevenir las pérdidas de biodiversidad proyectadas.]]', '[[It is completely obvious and proven that protected areas are not working and are totally inadequate for stopping biodiversity loss.|Es completamente obvio y demostrado que las áreas protegidas no funcionan y son totalmente inadecuadas para detener la pérdida de biodiversidad.]]', '[[I personally believe and am certain that protected areas are not enough because they clearly cannot stop deforestation at all.|Personalmente creo y estoy seguro de que las áreas protegidas no son suficientes porque claramente no pueden detener la deforestación en absoluto.]]'], correctAnswer: 0, explanation: '"It could be argued" = impersonal hedging. "While expanding" = concessive clause acknowledging the counterpoint. "Remain fundamentally inadequate" = cautious negative claim.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u22-v1', type: 'multiple-choice', level: 'C1', topic: 'biodiversity-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Biodiversity and Ecology|Biodiversidad y ecología]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'The wolf is considered a _______ species in Yellowstone — its reintroduction triggered a cascade of ecological changes that transformed river courses, vegetation patterns and the populations of multiple species.', options: ['[[keystone|clave]]', '[[dominant|dominante]]', '[[apex|ápice]]'], correctAnswer: 0, explanation: '"Keystone species" = a species that has a disproportionately large effect on its ecosystem relative to its abundance. An "apex predator" refers specifically to position in the food chain.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u22-v2', type: 'fill-blank', level: 'C1', topic: 'biodiversity-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Conservation Biology|Biología de la conservación]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The IUCN Red List categorises species by extinction risk, with "critically _______" being the highest threat category before extinction in the wild.', options: ['[[endangered|en peligro crítico]]', '[[threatened|amenazado]]', '[[vulnerable|vulnerable]]'], correctAnswer: 'endangered', acceptableAnswers: ['endangered'], explanation: '"Critically endangered" = the IUCN category for species facing an extremely high risk of extinction. Above "endangered" and "vulnerable".' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u22-v3', type: 'multiple-choice', level: 'C1', topic: 'biodiversity-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Ecosystem Services|Servicios ecosistémicos]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'Clean water filtration by wetlands, carbon sequestration by forests, and crop pollination by insects are all examples of _______ — the benefits that natural ecosystems provide to human society, largely unpriced by conventional markets.', options: ['[[ecosystem services|servicios ecosistémicos]]', '[[natural resources|recursos naturales]]', '[[biodiversity functions|funciones de biodiversidad]]'], correctAnswer: 0, explanation: '"Ecosystem services" = the specific ecological economics term for benefits that ecosystems provide to humans: provisioning, regulating, cultural and supporting services.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u22-r1', type: 'reading-comprehension', level: 'C1', topic: 'biodiversity-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Conservation Strategies|Estrategias de conservación]]', instructions: 'Read and answer.',
      questions: [{ question: 'Text: "The 30x30 initiative — a global commitment to protect 30% of the planet\'s land and oceans by 2030 — has been welcomed by conservation biologists but criticised by indigenous rights advocates, who argue that historically, protected area designation has often meant displacing local and indigenous communities from their traditional lands in the name of conservation."\n\nWhat tension does the text identify?', options: ['[[Scientists disagree about whether protecting 30% of land and ocean is sufficient to halt biodiversity loss, with many arguing that 50% would be needed for meaningful impact on extinction rates.|Los científicos discrepan sobre si proteger el 30% de la tierra y el océano es suficiente para detener la pérdida de biodiversidad.]]', '[[The 30x30 conservation goal may conflict with the rights of indigenous and local communities who have historically been displaced when protected areas are established.|El objetivo de conservación 30x30 puede entrar en conflicto con los derechos de las comunidades indígenas y locales que históricamente han sido desplazadas cuando se establecen áreas protegidas.]]', '[[Protected areas are generally ineffective at conserving biodiversity because they cover too small an area and governments fail to enforce conservation rules within their boundaries.|Las áreas protegidas son generalmente ineficaces para conservar la biodiversidad porque cubren un área demasiado pequeña y los gobiernos no hacen cumplir las reglas.]]'], correctAnswer: 1, explanation: 'The text explicitly identifies the tension between conservation goals and indigenous rights — protected areas welcomed by scientists but criticised by rights advocates.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u22-r2', type: 'multiple-choice', level: 'C1', topic: 'biodiversity-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Extinction and Human Impact|Extinción e impacto humano]]', instructions: 'Choose the best answer.',
      questions: [{ question: 'Text: "Biodiversity loss is qualitatively different from other environmental problems: it is irreversible. A species once extinct cannot be recovered; a complex ecosystem once destroyed may take thousands of years to reconstitute. The precautionary principle demands that we treat this irreversibility as a reason for extreme caution, particularly given the depth of our uncertainty about how ecosystem loss cascades through planetary systems."\n\nWhat does "the precautionary principle" refer to in this context?', options: ['[[The scientific practice of only accepting claims that have been proven beyond any reasonable doubt through multiple independent replicated studies and peer review.|La práctica científica de solo aceptar afirmaciones que han sido probadas más allá de toda duda razonable a través de múltiples estudios replicados independientes.]]', '[[The argument that irreversibility and uncertainty about consequences should justify a cautious approach to actions that might cause biodiversity loss.|El argumento de que la irreversibilidad y la incertidumbre sobre las consecuencias deberían justificar un enfoque cauteloso ante acciones que podrían causar pérdida de biodiversidad.]]', '[[The legal principle that governments must take protective action to prevent biodiversity loss only after scientific evidence has conclusively demonstrated that a species faces extinction.|El principio legal de que los gobiernos deben tomar medidas protectoras solo después de que la evidencia científica haya demostrado de manera concluyente que una especie enfrenta la extinción.]]'], correctAnswer: 1, explanation: 'The text links the precautionary principle directly to irreversibility and uncertainty — justifying caution even when evidence is incomplete.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u22-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'biodiversity-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Biodiversity and Conservation), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u22-l1', type: 'listening-comprehension', level: 'C1', topic: 'biodiversity-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Conservation Debate|Debate sobre conservación]]', instructions: 'Listen and choose the correct answer.',
      questions: [{ question: 'A biologist says: "There is a tendency in conservation policy to focus on charismatic megafauna — pandas, tigers, elephants — at the expense of invertebrates, fungi and microorganisms, which arguably underpin the very ecosystem functions that make vertebrate life possible. A world with elephants but without earthworms would not be a world elephants could survive in for long."\n\nWhat point does the biologist make?', options: ['[[Charismatic animals like elephants and tigers should be the priority for conservation funding because they are the most endangered species and attract the most public support and media attention.|Los animales carismáticos como los elefantes y los tigres deben ser la prioridad para la financiación de la conservación porque son las especies más amenazadas.]]', '[[Conservation policy over-prioritises visible, appealing animals while neglecting less glamorous organisms like invertebrates and fungi that are fundamental to ecosystem functioning.|La política de conservación prioriza en exceso los animales visibles y atractivos mientras descuida organismos menos glamurosos como los invertebrados y los hongos que son fundamentales para el funcionamiento del ecosistema.]]', '[[Invertebrates and microorganisms are more important than mammals for ecosystem health, which is why conservation biologists should abandon all efforts to protect charismatic megafauna.|Los invertebrados y microorganismos son más importantes que los mamíferos para la salud del ecosistema, por lo que los biólogos de conservación deberían abandonar todos los esfuerzos para proteger la megafauna carismática.]]'], correctAnswer: 1, explanation: 'The biologist argues that policy over-focuses on charismatic megafauna "at the expense of" invertebrates/fungi that "underpin ecosystem functions" — a critique of priorities, not an absolute dismissal of megafauna.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u22-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'biodiversity-listening',
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
    id: 'c1-u22-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'biodiversity-listening',
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
    id: 'c1-u22-w1', type: 'multiple-choice', level: 'C1', topic: 'academic-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Hedging in Academic Writing|Cobertura epistémica en escritura académica]]', instructions: 'Choose the best sentence using appropriate hedging for an academic essay on biodiversity.',
      questions: [{ question: 'You are arguing that economic development is responsible for biodiversity loss. Choose the most academically appropriate sentence:', options: ['[[The available evidence strongly suggests that unsustainable patterns of economic development constitute the primary driver of biodiversity loss, though the precise weighting of causal factors varies significantly across regions and ecosystems.|La evidencia disponible sugiere firmemente que los patrones insostenibles de desarrollo económico constituyen el principal impulsor de la pérdida de biodiversidad, aunque la ponderación precisa de los factores causales varía significativamente.]]', '[[Economic development is completely destroying all biodiversity everywhere in the world and this is totally proven by all the available scientific evidence beyond any doubt.|El desarrollo económico está destruyendo completamente toda la biodiversidad en todo el mundo y esto está completamente probado por toda la evidencia científica disponible.]]', '[[It seems like economic development is probably one of the causes of biodiversity loss, though it is hard to say for sure because the evidence is not very clear on this issue.|Parece que el desarrollo económico es probablemente una de las causas de la pérdida de biodiversidad, aunque es difícil decirlo con certeza porque la evidencia no es muy clara.]]'], correctAnswer: 0, explanation: 'Option A combines strong hedging ("strongly suggests"), qualifying concession ("though... varies") and precise academic language — appropriate C1 academic register.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u22-w2',
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
    id: 'c1-u22-w3',
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
