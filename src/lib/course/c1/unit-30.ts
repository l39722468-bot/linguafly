/**
 * C1 Unit 30 — Cultural Heritage and Preservation
 * Module 5: Arts and Culture — Consolidation
 * Grammar: Module 5 mixed review (narrative tenses, adjectival phrases, so/such, inversion, nominalisation)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Cultural Heritage and Preservation';

export const UNIT_30_EXERCISES: Exercise[] = [
{
    id: 'c1-u30-g1', type: 'multiple-choice', level: 'C1', topic: 'mixed-module5', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Narrative Tenses in Heritage Writing|Tiempos narrativos en escritura patrimonial]]', instructions: 'Choose the correct tense sequence.',
      questions: [{ question: 'Which passage uses narrative tenses most accurately in describing the history of a cultural site?', options: ['[[Archaeologists working at the site in 2019 discovered that earlier excavations had overlooked a series of sealed chambers that had been concealing remarkable artefacts for nearly two millennia — objects that had been awaiting discovery since the city\'s sudden abandonment in the third century AD.|Los arqueólogos que trabajaban en el sitio en 2019 descubrieron que excavaciones anteriores habían pasado por alto una serie de cámaras selladas que habían estado ocultando artefactos notables durante casi dos milenios, objetos que habían estado esperando el descubrimiento desde el repentino abandono de la ciudad en el siglo III.]]', '[[Archaeologists working at the site in 2019 have discovered that earlier excavations overlooked chambers that have been concealing remarkable artefacts for nearly two millennia since the city abandoned in the third century AD.|Los arqueólogos que trabajaban en el sitio en 2019 han descubierto que excavaciones anteriores pasaron por alto cámaras que han estado ocultando artefactos notables durante casi dos milenios desde que la ciudad fue abandonada en el siglo III.]]', '[[Archaeologists worked at the site in 2019 and they discovered earlier excavations had overlooked chambers that concealed remarkable artefacts that have been waiting for discovery since the third century AD.|Los arqueólogos trabajaron en el sitio en 2019 y descubrieron que excavaciones anteriores habían pasado por alto cámaras que contenían artefactos notables que han estado esperando el descubrimiento desde el siglo III.]]'], correctAnswer: 0, explanation: 'Past simple ("discovered") for main event; past perfect simple ("had overlooked") for prior completed action; past perfect continuous ("had been concealing", "had been awaiting") for prior ongoing processes.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u30-g2', type: 'fill-blank', level: 'C1', topic: 'mixed-module5', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Nominalisation in Heritage Discourse|Nominalización en discurso patrimonial]]', instructions: 'Complete using nominalisation.',
      questions: [{ question: 'The ongoing _______ (to deteriorate) of UNESCO-listed sites due to mass tourism, climate change and inadequate funding poses one of the most urgent challenges in contemporary heritage management.', options: ['[[deterioration|deterioro]]', '[[deteriorating|deterioro]]', '[[deteriorated|deteriorado]]'], correctAnswer: 'deterioration', acceptableAnswers: ['deterioration'], explanation: '"Deterioration" = noun from "deteriorate" (-ation suffix). The nominalised form makes the process the grammatical subject of the formal sentence.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u30-g3', type: 'multiple-choice', level: 'C1', topic: 'mixed-module5', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Advanced Inversion|Inversión avanzada]]', instructions: 'Choose the sentence with correct inversion.',
      questions: [{ question: 'Which sentence correctly uses advanced inversion in writing about cultural heritage?', options: ['[[Not only does the destruction of cultural heritage erase irreplaceable historical memory, but it also eliminates the economic foundation on which many communities\' livelihoods depend through cultural tourism.|No solo la destrucción del patrimonio cultural borra la memoria histórica irremplazable, sino que también elimina la base económica de la que dependen los medios de vida de muchas comunidades a través del turismo cultural.]]', '[[Not only the destruction of cultural heritage erases irreplaceable historical memory but also it eliminates the economic foundation on which many communities depend through cultural tourism.|No solo la destrucción del patrimonio cultural borra la memoria histórica irremplazable sino que también elimina la base económica de la que dependen muchas comunidades a través del turismo cultural.]]', '[[Not only is the destruction of cultural heritage erasing irreplaceable historical memory, but it also eliminates the economic foundation that many communities depend on through cultural tourism.|No solo la destrucción del patrimonio cultural está borrando la memoria histórica irremplazable, sino que también elimina la base económica de la que dependen muchas comunidades a través del turismo cultural.]]'], correctAnswer: 0, explanation: '"Not only + does/do + subject + infinitive, but also + normal word order" = correct. "Not only does + inversion in first clause; but also + no inversion in second clause.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u30-v1', type: 'multiple-choice', level: 'C1', topic: 'heritage-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Cultural Heritage|Patrimonio cultural]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'UNESCO distinguishes between _______ heritage — tangible cultural properties such as monuments, buildings and archaeological sites — and _______ heritage, which encompasses living practices, traditions, oral history and performing arts.', options: ['[[tangible / intangible|tangible / intangible]]', '[[material / immaterial|material / inmaterial]]', '[[physical / non-physical|físico / no físico]]'], correctAnswer: 0, explanation: '"Tangible heritage" = physical cultural property (monuments, artefacts). "Intangible heritage" = living practices, rituals, knowledge, performing arts. These are the official UNESCO terms.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u30-v2', type: 'fill-blank', level: 'C1', topic: 'heritage-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Heritage Policy|Política patrimonial]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The debate over the Elgin _______ — Greek sculptures removed from the Parthenon by Lord Elgin in the early nineteenth century and now held in the British Museum — has become the defining case in international discussions about the repatriation of cultural artefacts.', options: ['[[Marbles|Mármoles]]', '['+'[Sculptures|Esculturas]]', '[[Fragments|Fragmentos]]'], correctAnswer: 'Marbles', acceptableAnswers: ['Marbles', 'Sculptures', 'Parthenon Sculptures'], explanation: '"The Elgin Marbles" = the conventional English term, though Greece and many scholars prefer "the Parthenon Sculptures". Both are acceptable; "Elgin Marbles" is the recognised proper noun.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u30-v3', type: 'multiple-choice', level: 'C1', topic: 'heritage-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Heritage Conservation|Conservación del patrimonio]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The principle that conservation interventions should be _______ — clearly distinguishable from original material and removable without causing damage — is a fundamental tenet of modern heritage restoration ethics.', options: ['[[reversible|reversible]]', '[[minimal|mínimo]]', '[[authentic|auténtico]]'], correctAnswer: 0, explanation: '"Reversible" = the conservation principle that interventions should be removable without harming the original. Alongside "authenticity" and "integrity", reversibility is a core concept in the Venice Charter (1964).' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u30-r1', type: 'reading-comprehension', level: 'C1', topic: 'heritage-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Repatriation Debate|Debate sobre repatriación]]', instructions: 'Read and answer.',
      questions: [{ question: 'Text: "The argument that major Western museums serve as \'universal museums\', providing global access to artefacts from all cultures, has a surface plausibility that conceals a fundamental asymmetry: those with the resources to travel to London, Paris or New York gain access, while communities in the countries of origin — typically in the Global South — do not. The universalist claim is, in practice, a cosmopolitan luxury available primarily to wealthy travellers."\n\nWhat does the author argue about the "universal museum" concept?', options: ['[[The universal museum concept is valid because museums genuinely do make artefacts from many cultures available to international visitors, creating an educational and cultural resource of global significance.|El concepto de museo universal es válido porque los museos genuinamente hacen que los artefactos de muchas culturas estén disponibles para los visitantes internacionales, creando un recurso educativo y cultural de importancia global.]]', '[[The "universal museum" justification is undermined by the fact that physical access requires travel to wealthy Western cities, making it effectively a privilege for affluent visitors rather than genuinely universal access.|La justificación del "museo universal" está socavada por el hecho de que el acceso físico requiere viajar a ciudades occidentales ricas, lo que lo convierte efectivamente en un privilegio para los visitantes adinerados en lugar de un acceso genuinamente universal.]]', '[[Universal museums should be replaced by local museums in the countries of origin so that communities can have direct access to their own cultural heritage without needing to travel abroad to see it.|Los museos universales deberían ser reemplazados por museos locales en los países de origen para que las comunidades puedan tener acceso directo a su patrimonio cultural sin necesidad de viajar al extranjero para verlo.]]'], correctAnswer: 1, explanation: 'The text argues the universalist claim is "a cosmopolitan luxury available primarily to wealthy travellers" — exposing the asymmetry between the claim of universality and the reality of who can access it.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u30-r2', type: 'multiple-choice', level: 'C1', topic: 'heritage-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Heritage and Tourism|Patrimonio y turismo]]', instructions: 'Choose the best answer.',
      questions: [{ question: 'Text: "Venice is perhaps the most extreme case of a city slowly being destroyed by its own success as a heritage destination. The mass tourism that its beauty attracts has driven out most of its permanent residents, hollowed out the local economy in favour of souvenir shops and hotels, and subjected its fragile physical fabric to a level of foot traffic it was never designed to absorb. The paradox is stark: in trying to preserve Venice for the world, we may be destroying Venice as a living city."\n\nWhat paradox does the text describe?', options: ['[[Tourism has made Venice so expensive to visit that ordinary tourists can no longer afford to experience it, and it has become accessible only to the very wealthy international visitors that the heritage industry depends upon for its revenue.|El turismo ha hecho que Venecia sea tan cara de visitar que los turistas ordinarios ya no pueden permitírselo, y se ha vuelto accesible solo para los visitantes internacionales muy ricos de los que depende la industria patrimonial.]]', '[[The very popularity of Venice as a heritage destination may be destroying it as a living, inhabited city — mass tourism preservation of the physical fabric undermines the social and cultural fabric that makes the place genuinely significant.|La propia popularidad de Venecia como destino patrimonial puede estar destruyéndola como ciudad viva y habitada: el turismo masivo que busca preservar el tejido físico socava el tejido social y cultural que hace que el lugar sea genuinamente significativo.]]', '[[Venice has become so dependent on tourism revenue that it cannot afford to implement the conservation measures required to protect its historic buildings from the environmental damage caused by the very tourists who sustain its economy.|Venecia se ha vuelto tan dependiente de los ingresos del turismo que no puede permitirse implementar las medidas de conservación necesarias para proteger sus edificios históricos del daño ambiental.]]'], correctAnswer: 1, explanation: 'The text explicitly states "in trying to preserve Venice for the world, we may be destroying Venice as a living city" — the contradiction between physical preservation and living cultural continuity.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u30-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'heritage-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Cultural Heritage and Preservation), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u30-l1', type: 'listening-comprehension', level: 'C1', topic: 'heritage-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Heritage Policy Lecture|Conferencia sobre política patrimonial]]', instructions: 'Listen and choose the correct answer.',
      questions: [{ question: 'A heritage policy expert says: "There is a tendency to frame heritage as something that needs to be frozen — preserved in amber, unchanging, authentic. But this is a fundamentally static conception of culture. Living cultures are not static; they evolve, adapt and incorporate new influences. The question is not how to freeze heritage but how to support the conditions under which communities can remain the authors of their own cultural lives — which sometimes means changing what they have inherited."\n\nWhat does the expert argue about heritage preservation?', options: ['[[Heritage should be preserved exactly as it was found, without any changes or adaptations, because any modification undermines the authenticity that gives heritage its significance and value for future generations.|El patrimonio debe preservarse exactamente como se encontró, sin ningún cambio o adaptación, porque cualquier modificación socava la autenticidad que le da al patrimonio su significado y valor para las generaciones futuras.]]', '[[Heritage preservation should focus not on freezing culture in a static state but on empowering communities to be the active agents of their own evolving cultural lives, which may include changing what they have inherited.|La preservación del patrimonio debe centrarse no en congelar la cultura en un estado estático sino en empoderar a las comunidades para que sean los agentes activos de sus propias vidas culturales en evolución, lo que puede incluir cambiar lo que han heredado.]]', '[[The concept of heritage as something worth preserving is inherently conservative and politically problematic, and communities would be better served by focusing on creating new culture rather than preserving old forms.|El concepto de patrimonio como algo que vale la pena preservar es inherentemente conservador y políticamente problemático, y las comunidades estarían mejor servidas enfocándose en crear nueva cultura en lugar de preservar formas antiguas.]]'], correctAnswer: 1, explanation: 'The expert argues against "freezing" heritage and for "supporting conditions under which communities can remain the authors of their own cultural lives" — an active, community-centred model.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u30-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'heritage-listening',
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
    id: 'c1-u30-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'heritage-listening',
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
    id: 'c1-u30-w1', type: 'multiple-choice', level: 'C1', topic: 'heritage-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Module 5 Consolidation Writing|Escritura de consolidación del módulo 5]]', instructions: 'Choose the best paragraph integrating Module 5 C1 writing skills.',
      questions: [{ question: 'You are arguing that the Elgin Marbles should be returned to Greece. Choose the most effective paragraph:', options: ['[[The case for repatriation is, it must be said, compelling: not only does the continued retention of the sculptures by the British Museum perpetuate an act of colonial-era removal whose legality was questionable at the time, but such is the cultural and symbolic significance of these particular works to the Greek national narrative that no abstract principle of universal access can adequately compensate for their physical absence from the site for which they were created.|El caso de la repatriación es, hay que decirlo, convincente: no solo la retención continuada de las esculturas por parte del Museo Británico perpetúa un acto de remoción de la era colonial cuya legalidad era cuestionable en el momento, sino que tal es la significación cultural y simbólica de estas obras particulares para la narrativa nacional griega.]]', '[[The Elgin Marbles should definitely be returned to Greece because they were taken by Lord Elgin and he had no right to remove them. They belong to Greece and the Greek people and the British Museum should give them back.|Los Mármoles del Elgin definitivamente deben ser devueltos a Grecia porque fueron tomados por Lord Elgin y él no tenía derecho a retirarlos. Pertenecen a Grecia y al pueblo griego y el Museo Británico debería devolverlos.]]', '[[I think it is right to return the Elgin Marbles to Greece because they are an important part of Greek history and culture. The British Museum has many other things to display so they do not really need them.|Creo que es correcto devolver los Mármoles del Elgin a Grecia porque son una parte importante de la historia y la cultura griegas. El Museo Británico tiene muchas otras cosas para exhibir así que realmente no los necesita.]]'], correctAnswer: 0, explanation: 'Option A uses: "it must be said" comment clause, "Not only does... but" inversion, "such is... that" inverted degree structure, nominalisation ("retention", "removal") — perfect Module 5 consolidation.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u30-w2',
    type: 'writing',
    level: 'C1',
    topic: 'heritage-writing',
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
    id: 'c1-u30-w3',
    type: 'writing',
    level: 'C1',
    topic: 'heritage-writing',
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
