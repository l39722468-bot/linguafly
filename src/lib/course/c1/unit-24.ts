/**
 * C1 Unit 24 — Oceans and Marine Life
 * Module 4: The Natural World — Consolidation
 * Grammar: Module 4 mixed review (relative clauses, absolute constructions, fronting, hedging, comment clauses)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Oceans and Marine Life';

export const UNIT_24_EXERCISES: Exercise[] = [
{
    id: 'c1-u24-g1', type: 'multiple-choice', level: 'C1', topic: 'mixed-module4', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Relative Clauses Review|Repaso de oraciones de relativo]]', instructions: 'Choose the sentence with the correct relative clause.',
      questions: [{ question: 'Which sentence correctly uses a non-defining relative clause with a preposition in formal English?', options: ['[[The deep ocean, about which scientists know less than about the surface of the moon, hosts ecosystems that have developed in complete isolation from sunlight for millions of years.|Del océano profundo, sobre el que los científicos saben menos que sobre la superficie de la luna, alberga ecosistemas que se han desarrollado en completo aislamiento de la luz solar.]]', '[[The deep ocean that scientists know less about than the surface of the moon hosts ecosystems developed in complete isolation from sunlight for millions of years.|El océano profundo del que los científicos saben menos que sobre la superficie de la luna alberga ecosistemas desarrollados en completo aislamiento de la luz solar.]]', '[[The deep ocean, which scientists know less about than the surface of the moon, hosts ecosystems that have developed in complete isolation from sunlight for millions of years.|El océano profundo, sobre el que los científicos saben menos que sobre la superficie de la luna, alberga ecosistemas que se han desarrollado en completo aislamiento de la luz solar.]]'], correctAnswer: 2, explanation: '"Which scientists know less about" (non-defining, informal) and "about which scientists know less" (non-defining, formal) are both correct. Option A misplaces the relative clause. Option C is grammatically correct.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u24-g2', type: 'fill-blank', level: 'C1', topic: 'mixed-module4', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Absolute Constructions|Construcciones absolutas]]', instructions: 'Complete with the correct absolute construction.',
      questions: [{ question: '_______ permitting, the deep-sea survey is scheduled to begin in April and should produce data that will significantly advance our understanding of hydrothermal vent ecosystems.', options: ['[[Weather|El tiempo]]', '[[Conditions|Las condiciones]]', '[[Circumstances|Las circunstancias]]'], correctAnswer: 'Weather', acceptableAnswers: ['Weather'], explanation: '"Weather permitting" = a fixed absolute construction meaning "if the weather allows it". It is a nominative absolute with an implied "being" or "is".' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u24-g3', type: 'multiple-choice', level: 'C1', topic: 'mixed-module4', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Hedging and Emphasis|Cobertura y énfasis]]', instructions: 'Choose the sentence that combines hedging with emphatic fronting correctly.',
      questions: [{ question: 'Which sentence correctly combines hedging with emphatic fronting?', options: ['[[Only rarely does the deep ocean appear to yield its secrets willingly — and even then, what emerges tends to challenge rather than confirm our existing theoretical models.|Solo raramente parece el océano profundo ceder sus secretos de buen grado — e incluso entonces, lo que emerge tiende a desafiar más que a confirmar nuestros modelos teóricos existentes.]]', '[[The deep ocean only rarely appears to be yielding its secrets willingly and when it does, what emerges is challenging our existing theoretical models significantly.|El océano profundo solo raramente parece ceder sus secretos de buen grado y cuando lo hace, lo que emerge está desafiando significativamente nuestros modelos teóricos existentes.]]', '[[Rarely, the deep ocean yields its secrets willingly, and what emerges tends to challenge rather than confirm existing theoretical models that scientists currently use.|Raramente, el océano profundo cede sus secretos de buen grado, y lo que emerge tiende a desafiar más que a confirmar los modelos teóricos existentes que usan los científicos.]]'], correctAnswer: 0, explanation: '"Only rarely + inverted auxiliary" = emphatic fronting. "Appears to yield" = hedging. "Tends to challenge" = hedging. All three structures are correctly combined in Option A.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u24-v1', type: 'multiple-choice', level: 'C1', topic: 'ocean-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Oceans and Marine Science|Océanos y ciencias marinas]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'The _______ zone — the layer of ocean from the surface to a depth of approximately 200 metres where sunlight penetrates sufficiently for photosynthesis to occur — supports the vast majority of known marine life.', options: ['[[photic|fótica]]', '[[abyssal|abisal]]', '[[benthic|bentónica]]'], correctAnswer: 0, explanation: '"Photic zone" = the sunlit layer where photosynthesis occurs (0-200m). "Abyssal" refers to the deep ocean (2000-6000m). "Benthic" refers to the sea floor environment.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u24-v2', type: 'fill-blank', level: 'C1', topic: 'ocean-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Marine Conservation|Conservación marina]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The Great Barrier Reef, the world\'s largest coral _______ system, has experienced multiple mass bleaching events since 2016, with scientists warning that its long-term survival depends on limiting global warming to 1.5°C.', options: ['[[reef|arrecife]]', '[[atoll|atolón]]', '[[biome|bioma]]'], correctAnswer: 'reef', acceptableAnswers: ['reef'], explanation: '"Coral reef" = the correct term for the limestone structure built by coral polyps. An "atoll" is a ring-shaped reef; "biome" is a broader ecological category.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u24-v3', type: 'multiple-choice', level: 'C1', topic: 'ocean-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Marine Pollution|Contaminación marina]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'Scientists have identified enormous accumulations of plastic waste in mid-ocean gyres — circulating current systems — creating what are known as ocean _______ patches, where plastic fragments outnumber marine organisms.', options: ['[[garbage|basura]]', '[[debris|escombros]]', '[[waste|residuos]]'], correctAnswer: 0, explanation: '"Ocean garbage patch" = the established term for ocean plastic accumulation zones. The "Great Pacific Garbage Patch" is the most well-known example.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u24-r1', type: 'reading-comprehension', level: 'C1', topic: 'ocean-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Marine Conservation|Conservación marina]]', instructions: 'Read and answer.',
      questions: [{ question: 'Text: "The high seas — ocean areas beyond national jurisdiction, covering some 60% of the world\'s ocean surface — were, until recently, effectively ungoverned. The 2023 High Seas Treaty represents the first binding international agreement to protect biodiversity in international waters, allowing for the creation of marine protected areas beyond national boundaries and establishing environmental impact assessment requirements for activities in the global commons."\n\nWhat does the text say about the High Seas Treaty?', options: ['[[The High Seas Treaty is a non-binding international agreement that encourages but does not require countries to protect biodiversity in international waters beyond their national boundaries.|El Tratado de Alta Mar es un acuerdo internacional no vinculante que anima pero no obliga a los países a proteger la biodiversidad en aguas internacionales.]]', '[[The 2023 High Seas Treaty is the first legally binding international agreement to protect biodiversity in international waters and enables the creation of marine protected areas beyond national jurisdiction.|El Tratado de Alta Mar de 2023 es el primer acuerdo internacional jurídicamente vinculante para proteger la biodiversidad en aguas internacionales y permite la creación de áreas marinas protegidas más allá de la jurisdicción nacional.]]', '[[The High Seas Treaty was established because existing national marine protected areas had proven completely ineffective at protecting biodiversity in international waters over the preceding decades.|El Tratado de Alta Mar se estableció porque las áreas marinas protegidas nacionales existentes habían demostrado ser completamente ineficaces para proteger la biodiversidad en aguas internacionales.]]'], correctAnswer: 1, explanation: 'The text explicitly calls it "the first binding international agreement" allowing marine protected areas beyond national boundaries — the key facts from the passage.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u24-r2', type: 'multiple-choice', level: 'C1', topic: 'ocean-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Ocean Acidification|Acidificación del océano]]', instructions: 'Choose the best answer.',
      questions: [{ question: 'Text: "Ocean acidification — caused by the absorption of atmospheric CO₂, which forms carbonic acid in seawater — is proceeding at a rate ten times faster than any acidification event in the past 300 million years. For organisms that build calcium carbonate shells and skeletons, including corals, molluscs and many species of plankton, this represents an existential threat: as acidity rises, the very building blocks of their structures begin to dissolve."\n\nWhat makes ocean acidification particularly alarming, according to the text?', options: ['[[Ocean acidification is alarming primarily because it is directly causing mass coral bleaching events that have killed a significant proportion of the Great Barrier Reef since 2016.|La acidificación del océano es alarmante principalmente porque está causando directamente eventos de blanqueamiento masivo de corales que han matado una proporción significativa de la Gran Barrera de Coral desde 2016.]]', '[[Both its unprecedented rate compared to geological history and its direct threat to calcium carbonate-dependent organisms make it especially alarming.|Tanto su tasa sin precedentes en comparación con la historia geológica como su amenaza directa a los organismos dependientes del carbonato cálcico la hacen especialmente alarmante.]]', '[[Ocean acidification is alarming because it is caused by CO₂ absorption, which means it cannot be addressed without solving climate change first, making any specific ocean policy measures futile.|La acidificación del océano es alarmante porque es causada por la absorción de CO₂, lo que significa que no puede abordarse sin resolver primero el cambio climático, haciendo inútiles las medidas de política oceánica específicas.]]'], correctAnswer: 1, explanation: 'The text gives two reasons: unprecedented speed ("10 times faster than any event in 300 million years") AND direct dissolution threat to calcium carbonate organisms.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u24-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'ocean-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Oceans and Marine Life), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u24-l1', type: 'listening-comprehension', level: 'C1', topic: 'ocean-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Marine Policy Debate|Debate sobre política marina]]', instructions: 'Listen and choose the correct answer.',
      questions: [{ question: 'A marine biologist says: "What we tend to underestimate is the degree to which the ocean regulates conditions on land. Absorbing roughly a quarter of anthropogenic CO₂ and producing over half of the world\'s oxygen, the ocean is not merely an aquatic environment — it is an active, dynamic partner in maintaining the atmospheric conditions that make terrestrial life possible. Protecting it is not a matter of environmental sentiment; it is a matter of self-preservation."\n\nWhat argument does the biologist make about the ocean?', options: ['[[The ocean is primarily important as a source of food and economic resources, which is why protecting it from pollution and overfishing should be the main priority for marine conservation policy.|El océano es principalmente importante como fuente de alimentos y recursos económicos, por lo que protegerlo de la contaminación y la sobrepesca debería ser la principal prioridad.]]', '[[Ocean protection is not merely about preserving aquatic life but is fundamentally about maintaining the atmospheric systems that support all life on Earth, making it a matter of human self-interest.|La protección del océano no es solo sobre preservar la vida acuática, sino que se trata fundamentalmente de mantener los sistemas atmosféricos que sustentan toda la vida en la Tierra.]]', '[[Because the ocean produces more than half the world\'s oxygen, the main concern should be preventing eutrophication and algal blooms that could disrupt oxygen production in coastal waters.|Dado que el océano produce más de la mitad del oxígeno del mundo, la principal preocupación debería ser prevenir la eutrofización y las proliferaciones de algas.]]'], correctAnswer: 1, explanation: 'The biologist frames ocean protection as "self-preservation" for humans — the ocean regulates CO₂ and oxygen, making it an active partner in supporting all terrestrial life.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u24-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'ocean-listening',
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
    id: 'c1-u24-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'ocean-listening',
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
    id: 'c1-u24-w1', type: 'multiple-choice', level: 'C1', topic: 'academic-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Mixed C1 Structures in Writing|Estructuras C1 mixtas en escritura]]', instructions: 'Choose the best paragraph demonstrating a range of C1 structures.',
      questions: [{ question: 'You are writing about threats to ocean health. Choose the paragraph that best demonstrates C1 writing quality:', options: ['[[What arguably threatens the long-term viability of marine ecosystems most profoundly is not any single stressor but the compounding interaction of multiple simultaneous pressures — warming, acidification, deoxygenation and overfishing — which, it must be said, no management framework currently in existence was designed to address in combination.|Lo que posiblemente amenaza más profundamente la viabilidad a largo plazo de los ecosistemas marinos no es ningún factor estresante individual, sino la interacción compuesta de múltiples presiones simultáneas — calentamiento, acidificación, desoxigenación y sobrepesca — que, hay que decirlo, ningún marco de gestión existente fue diseñado para abordar en combinación.]]', '[[There are many threats to the ocean. These include warming, acidification and overfishing. These problems are all happening at the same time and this makes them much worse. No management framework exists to deal with all of them together.|Hay muchas amenazas para el océano. Entre ellas se incluyen el calentamiento, la acidificación y la sobrepesca. Estos problemas ocurren al mismo tiempo y esto los hace mucho peores. No existe ningún marco de gestión para abordarlos todos juntos.]]', '[[The ocean faces serious threats from climate change, acidification and fishing. These threats are interacting with each other in complex ways that scientists are still trying to understand. Better policies are urgently needed to address all these threats together.|El océano enfrenta serias amenazas del cambio climático, la acidificación y la pesca. Estas amenazas interactúan entre sí de formas complejas que los científicos aún intentan comprender. Se necesitan urgentemente mejores políticas.]]'], correctAnswer: 0, explanation: 'Option A uses: pseudo-cleft fronting ("What threatens most"), "arguably" hedging, nominalisation ("compounding interaction"), listing, "which" non-defining relative, "it must be said" comment clause.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u24-w2',
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
    id: 'c1-u24-w3',
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
