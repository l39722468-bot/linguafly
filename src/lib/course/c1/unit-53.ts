/**
 * C1 Unit 53 — Journalism Ethics and Press Freedom
 * Module 9: Media and Information
 * Grammar: Mixed formal structures — integration of Module 9 grammar in academic/journalistic prose
 * (Comparison/contrast, distancing language, impersonal constructions, cleft sentences)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Journalism Ethics and Press Freedom';

export const UNIT_53_EXERCISES: Exercise[] = [
{
    id: 'c1-u53-g1', type: 'multiple-choice', level: 'C1', topic: 'mixed-formal-structures', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Distancing + Impersonal in Journalistic Prose|Lenguaje distanciador + impersonal en prosa periodística]]', instructions: 'Choose the sentence that best integrates distancing and impersonal language.',
      questions: [{ question: 'Which sentence most effectively integrates distancing language and impersonal constructions in a journalistic context?', options: ['[[It is widely acknowledged within the journalism profession that the practice of anonymous sourcing — whilst sometimes essential for protecting whistleblowers and enabling coverage of matters that would otherwise remain hidden — has been abused in ways that have allowed what are described as authoritative but unverifiable claims to circulate under the reputational protection of major outlets without being subjected to the scrutiny that named sources must face.|Se reconoce ampliamente dentro de la profesión periodística que la práctica de las fuentes anónimas, aunque a veces esencial para proteger a los denunciantes, ha sido abusada de maneras que han permitido que lo que se describe como afirmaciones autorizadas pero inverificables circulen bajo la protección reputacional de grandes medios.]]', '[[The journalism profession widely acknowledges that anonymous sourcing, which is described as a practice that has been abused, has allowed what they describe as unverifiable claims to circulate under the reputational protection of major outlets without scrutiny.|La profesión periodística reconoce ampliamente que las fuentes anónimas, que se describe como una práctica que ha sido abusada, han permitido que las afirmaciones inverificables circulen.]]', '[[It is acknowledged that anonymous sourcing is described as sometimes essential but has been allegedly abused, which is widely known, and what is called unverifiable claims have allegedly circulated in this supposedly important area of journalism.|Se reconoce que las fuentes anónimas se describen como a veces esenciales pero han sido presuntamente abusadas.]]'], correctAnswer: 0, explanation: 'Option A correctly uses "It is widely acknowledged" (impersonal) + "what are described as authoritative but unverifiable claims" (distancing) — both integrated into a coherent sentence without over-stacking. Option C over-accumulates distancing markers incoherently.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u53-g2', type: 'fill-blank', level: 'C1', topic: 'mixed-formal-structures', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Cleft + Contrast in Analytical Prose|Hendida + contraste en prosa analítica]]', instructions: 'Complete with the best formal structure.',
      questions: [{ question: '_______ the commercial pressures on news organisations that most fundamentally threaten editorial independence — not government censorship, which tends to generate visible resistance and international attention — but the subtler process by which revenue dependence on advertisers, platform intermediaries or wealthy proprietors shapes what stories are pursued, what sources are cultivated and what conclusions are drawn, often without any explicit instruction from above.', options: ['[[It is|Es]]', '[[What is|Lo que es]]', '[[There is|Hay]]'], correctAnswer: 'It is', acceptableAnswers: ['It is'], explanation: '"It is + focused element + that + rest of clause" = it-cleft focusing attention on "commercial pressures" as the key threat. The sentence then elaborates through contrast ("not government censorship…but the subtler process"). "What is" would require restructuring the entire sentence.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u53-g3', type: 'multiple-choice', level: 'C1', topic: 'mixed-formal-structures', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Contrast + Cleft + Speculation in One Sentence|Contraste + hendida + especulación en una sola oración]]', instructions: 'Choose the most sophisticated integration of formal structures.',
      questions: [{ question: 'Which sentence most effectively combines contrast, a cleft and a speculation structure?', options: ['[[Whereas press freedom indices consistently rank Scandinavian countries among the best environments for journalism — characterised by strong legal protections, public broadcasting traditions and relatively healthy commercial media ecosystems — what is most striking is that even within these favourable conditions, investigative journalists covering organised crime, corruption and extremist networks face threats that might well be comparable in intensity, if not in scale, to those confronting their counterparts in more formally repressive environments.|Mientras que los índices de libertad de prensa clasifican consistentemente a los países escandinavos entre los mejores entornos para el periodismo, lo que es más llamativo es que incluso dentro de estas condiciones favorables, los periodistas de investigación que cubren el crimen organizado enfrentan amenazas que bien podrían ser comparables en intensidad a las que enfrentan sus colegas en entornos más formalmente represivos.]]', '[[Whereas press freedom is better in Scandinavia, what is most striking might well be that journalists still face threats. Unlike other places, it is the organised crime coverage that is dangerous. There is every chance the situation might well worsen.|Mientras que la libertad de prensa es mejor en Escandinavia, lo que es más llamativo podría ser que los periodistas aún enfrentan amenazas.]]', '[[Press freedom is good in Scandinavia compared to other places. What concerns people is crime coverage. It might well be dangerous. Unlike repressive states, there is a tendency to think Scandinavia is safe.|La libertad de prensa es buena en Escandinavia en comparación con otros lugares.]]'], correctAnswer: 0, explanation: 'Option A uses "Whereas" (contrast), "what is most striking is that" (cleft), and "might well be comparable" (speculation) — three distinct Module 9 structures integrated into a single, analytically coherent sentence.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u53-v1', type: 'multiple-choice', level: 'C1', topic: 'journalism-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Journalism Ethics|Ética periodística]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The ethical principle that journalists should present multiple perspectives on contested issues, ensuring that readers have access to diverse viewpoints and are not led to a single predetermined conclusion — but which, when applied uncritically, can result in the false equivalence of unequal positions — is known as _______.', options: ['[[impartiality or balance|imparcialidad o equilibrio]]', '[[objectivity|objetividad]]', '[[transparency|transparencia]]'], correctAnswer: 0, explanation: '"Impartiality" or "balance" = giving fair representation to multiple perspectives. Distinct from "objectivity" (the idea of reporting free from personal bias) and "transparency" (being open about methods and sources). The tension between balance and false equivalence is a central contemporary debate in journalism ethics.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u53-v2', type: 'fill-blank', level: 'C1', topic: 'journalism-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Press Freedom|Libertad de prensa]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The legal protection that prevents government authorities from suppressing or requiring prior approval of material before it is published — established as a fundamental principle of free press systems — is known as protection from prior _______.', options: ['[[restraint|restricción previa]]', '[[censorship|censura]]', '[[interference|interferencia]]'], correctAnswer: 'restraint', acceptableAnswers: ['restraint'], explanation: '"Prior restraint" = the legal concept of government preventing publication before it occurs, as opposed to legal consequences after publication. Held unconstitutional in the United States (Near v. Minnesota, 1931) except in very narrow circumstances. A foundational press freedom concept.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u53-v3', type: 'multiple-choice', level: 'C1', topic: 'journalism-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Source Protection|Protección de fuentes]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'A person who discloses confidential information about wrongdoing, illegality or misconduct within an organisation — typically to journalists, regulators or law enforcement — often at significant personal and professional risk, and whose legal protection varies substantially across different national jurisdictions, is known as a _______.', options: ['[[whistleblower|denunciante]]', '[[lobbyist|cabildero/a]]', '[[spin doctor|asesor/a de imagen]]'], correctAnswer: 0, explanation: '"Whistleblower" = a person who exposes wrongdoing within an organisation, often at personal risk. Legal protection for whistleblowers varies widely; the EU Whistleblower Protection Directive (2019) provides a minimum standard. "Lobbyist" advocates for specific interests. "Spin doctor" manages public communications.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u53-r1', type: 'reading', level: 'C1', topic: 'journalism-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Fourth Estate under Pressure|El cuarto poder bajo presión]]', instructions: 'Read and answer.',
      passage: 'The concept of the press as the "fourth estate" — a quasi-constitutional power of democratic governance whose function is to scrutinise the other three — is widely cited but rarely examined with the rigour it invites. Far from being a natural or inevitable feature of modern societies, the institutional conditions that make independent, public-interest journalism possible are the product of specific historical, legal and economic arrangements that are currently under strain from multiple directions simultaneously. It is widely acknowledged that the collapse of the advertising-based revenue model has forced significant newsroom reductions and a retreat from the expensive, time-consuming investigative work that the fourth-estate metaphor most celebrates. What is less often noted, however, is that media concentration — driven by the same economic pressures — tends to place editorial decision-making in fewer and wealthier hands, with consequences for the range of perspectives that reach mass audiences. It is allegedly possible for a media system to be formally free from government interference whilst remaining subject to forms of structural constraint that are, for practical purposes, no less limiting.',
      questions: [{ question: 'What does the text say about the consequences of media concentration?', options: ['[[Media concentration, driven by economic pressures, tends to place editorial decision-making in fewer and wealthier hands, with consequences for the range of perspectives that reach mass audiences — a constraint the text notes is less often discussed than newsroom reductions.|La concentración de medios, impulsada por presiones económicas, tiende a poner la toma de decisiones editoriales en menos manos y más adineradas, con consecuencias para la gama de perspectivas que llegan a las audiencias masivas, una limitación que el texto señala que se discute menos que las reducciones de redacción.]]', '[[The text argues that media concentration is primarily beneficial because it allows larger organisations to fund investigative journalism that smaller fragmented outlets cannot afford, compensating for the loss of local and regional newsrooms.|El texto argumenta que la concentración de medios es principalmente beneficiosa porque permite a las organizaciones más grandes financiar el periodismo de investigación que los medios más pequeños no pueden permitirse.]]', '[[Media concentration is described as the most important threat to press freedom, more significant than revenue collapse, government interference or the rise of digital platforms, because it directly determines what stories are told and how.|La concentración de medios se describe como la amenaza más importante para la libertad de prensa, más significativa que el colapso de ingresos, la interferencia gubernamental o el auge de las plataformas digitales.]]'], correctAnswer: 0, explanation: 'The text states concentration "tends to place editorial decision-making in fewer and wealthier hands, with consequences for the range of perspectives that reach mass audiences" and notes this is "less often noted" than revenue collapse.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u53-r2', type: 'reading', level: 'C1', topic: 'journalism-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Journalism and Truth|El periodismo y la verdad]]', instructions: 'Read and answer.',
      passage: 'What makes truth-telling in journalism so much more complex than the simple injunction to "report the facts" suggests is that facts do not come pre-labelled with their significance. Every act of journalism involves selection: selection of which events to cover, which sources to consult, which context to provide and which narrative frame to apply. It is these editorial choices — rather than any individual statement of fact — that primarily determine whether a piece of journalism is fair, accurate and genuinely informative, or whether it is technically accurate but fundamentally misleading. One tends to focus, in discussions of journalistic ethics, on outright fabrication and plagiarism as the paradigmatic failures; but the more pervasive and perhaps more damaging distortions are those produced by selective framing, omission of relevant context and the systematic privileging of some sources and perspectives over others. It is not alleged that most journalists consciously deceive: the distortions in question are typically the product of unexamined assumptions, structural incentives and the subtle pressure of professional socialisation, rather than deliberate manipulation.',
      questions: [{ question: 'What does the text argue is the more pervasive form of journalistic distortion?', options: ['[[Selective framing, omission of relevant context and the systematic privileging of some sources — produced not by conscious deception but by unexamined assumptions, structural incentives and professional socialisation — rather than outright fabrication, which is the paradigmatic failure discussed in ethics but arguably less common.|La selección del marco, la omisión del contexto relevante y el privilegio sistemático de algunas fuentes, producidos no por decepción consciente sino por suposiciones no examinadas, incentivos estructurales y socialización profesional, en lugar de la fabricación directa.]]', '[[The text argues that plagiarism is the most pervasive form of distortion in contemporary journalism, facilitated by the speed of digital production and the pressure on understaffed newsrooms to produce content quickly without adequate verification.|El texto argumenta que el plagio es la forma más generalizada de distorsión en el periodismo contemporáneo, facilitada por la velocidad de la producción digital.]]', '[[Outright fabrication is identified as the most pervasive form of distortion because, unlike subtle framing, it directly contradicts facts and therefore constitutes a fundamental breach of the basic contract between journalists and their audiences.|La fabricación directa se identifica como la forma más generalizada de distorsión porque, a diferencia del encuadre sutil, contradice directamente los hechos.]]'], correctAnswer: 0, explanation: 'The text states: "the more pervasive and perhaps more damaging distortions are those produced by selective framing, omission of relevant context and the systematic privileging of some sources" — not outright fabrication.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u53-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'journalism-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Journalism Ethics and Press Freedom), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u53-l1', type: 'listening', level: 'C1', topic: 'journalism-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Discussion on Editorial Independence|Un debate sobre independencia editorial]]', instructions: 'Read the transcript and answer.',
      passage: 'Host: How do you maintain editorial independence under commercial pressure? Editor: It is widely assumed that editorial independence is primarily threatened by direct proprietorial interference — an owner telling an editor what to write. In my experience, that is relatively rare, and when it happens, it tends to be visible and therefore resistible. What is far more pervasive and harder to resist is what I would call the anticipatory compliance problem: editors and journalists unconsciously calibrate their decisions to what they believe owners, advertisers or platforms will find acceptable, without any explicit instruction. The self-censorship that results from this process is, it could be argued, more corrosive than overt interference, precisely because it is invisible — neither party has to acknowledge what is happening. Far from being a problem unique to commercial media, this dynamic is found across public service broadcasting too, where editorial decisions are shaped by what it is assumed government or the politically engaged public will tolerate. What distinguishes the most independent newsrooms is not an absence of pressure but a culture that makes those pressures explicit, discussed and therefore more resistible.',
      questions: [{ question: 'What does the editor describe as more pervasive and harder to resist than direct proprietorial interference?', options: ['[[Anticipatory compliance: editors and journalists unconsciously calibrating decisions to what owners, advertisers or platforms will find acceptable without explicit instruction — a form of invisible self-censorship the editor argues is more corrosive than overt interference because neither party has to acknowledge it.|Conformidad anticipatoria: editores y periodistas calibrando inconscientemente las decisiones a lo que los propietarios, anunciantes o plataformas encontrarán aceptable sin instrucción explícita, una forma de autocensura invisible que el editor argumenta es más corrosiva que la interferencia abierta porque ninguna de las partes tiene que reconocerlo.]]', '[[The editor describes advertiser pressure as more pervasive than proprietorial interference, because advertisers can threaten to withdraw revenue without needing to give any explicit instruction, making their influence harder to identify and challenge.|El editor describe la presión de los anunciantes como más generalizada que la interferencia del propietario.]]', '[[Platform power is described as the most pervasive threat to editorial independence, because social media algorithms determine what content reaches audiences and editors must calibrate their decisions to platform preferences to maintain distribution.|El poder de las plataformas se describe como la amenaza más generalizada para la independencia editorial.]]'], correctAnswer: 0, explanation: 'The editor explicitly names "anticipatory compliance" — "editors and journalists unconsciously calibrate their decisions" without explicit instruction — as "far more pervasive and harder to resist" than direct interference, because "neither party has to acknowledge what is happening".' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u53-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'journalism-listening',
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
    id: 'c1-u53-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'journalism-listening',
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
    id: 'c1-u53-w1', type: 'writing', level: 'C1', topic: 'journalism-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Integration of Formal Structures|Integración de estructuras formales]]', instructions: 'Which response integrates the widest range of formal structures most naturally?',
      questions: [{ question: 'Task: Write two sentences about press freedom and democracy using at least three different formal structures from Module 9.', options: ['[[Far from being a peripheral concern of media professionals, press freedom is it is widely recognised as a structural precondition for democratic accountability — the mechanism through which power is made visible and contestable; what makes its erosion so insidious, however, is that it is rarely accomplished through dramatic acts of censorship that would generate international attention, but rather through the gradual accumulation of what might be described as soft constraints — legal harassment, financial pressure, source intimidation and the slow professionalisation of public communication — that are individually deniable and collectively decisive.|Lejos de ser una preocupación periférica de los profesionales de los medios, la libertad de prensa se reconoce ampliamente como una condición previa estructural para la rendición de cuentas democrática; lo que hace tan insidiosa su erosión es que rara vez se logra a través de actos dramáticos de censura que generarían atención internacional, sino a través de la acumulación gradual de lo que podría describirse como restricciones suaves.]]', '[[Far from being unimportant, press freedom is widely recognised as essential to democracy. It is the erosion of freedom that is most concerning, and what is described as soft censorship might well be the biggest problem. There is every reason to believe that this is a serious issue.|Lejos de ser sin importancia, la libertad de prensa es ampliamente reconocida como esencial para la democracia.]]', '[[Press freedom is important for democracy. Unlike authoritarian systems, democracies need free media. It is widely believed this is true. What matters most is that journalists can work freely. One tends to agree this is essential.|La libertad de prensa es importante para la democracia. A diferencia de los sistemas autoritarios, las democracias necesitan medios libres.]]'], correctAnswer: 0, explanation: 'Option A uses "Far from being" (contrast), "it is widely recognised" (impersonal), "what makes…is" (cleft) and "what might be described as" (distancing) — four Module 9 structures integrated naturally into a sophisticated argument.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u53-w2',
    type: 'writing',
    level: 'C1',
    topic: 'journalism-writing',
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
    id: 'c1-u53-w3',
    type: 'writing',
    level: 'C1',
    topic: 'journalism-writing',
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
