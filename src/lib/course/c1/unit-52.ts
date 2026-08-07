/**
 * C1 Unit 52 — Artificial Intelligence and Society
 * Module 9: Media and Information
 * Grammar: Advanced cleft sentences (What surprised… / The reason why… / It is X that… / What matters most is…)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Artificial Intelligence and Society';

export const UNIT_52_EXERCISES: Exercise[] = [
{
    id: 'c1-u52-g1', type: 'multiple-choice', level: 'C1', topic: 'cleft-sentences', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[What-Cleft Sentences|Oraciones hendidas con "what"]]', instructions: 'Choose the sentence that uses a what-cleft construction most accurately.',
      questions: [{ question: 'Which sentence uses a what-cleft to focus attention most effectively in a formal context?', options: ['[[What distinguishes the current generation of large language models from their predecessors is not merely their scale — measured in parameters and training data — but the emergent capabilities that appear to arise from that scale: the ability to perform tasks for which the systems were never explicitly trained, in ways that researchers have found genuinely difficult to anticipate or explain.|Lo que distingue a la generación actual de grandes modelos de lenguaje de sus predecesores no es meramente su escala sino las capacidades emergentes que parecen surgir de esa escala: la capacidad de realizar tareas para las que los sistemas nunca fueron entrenados explícitamente.]]', '[[The thing that distinguishes current large language models from their predecessors is their scale and emergent capabilities, which appear from that scale, being the ability to perform tasks for which the systems were never explicitly trained by their developers.|Lo que distingue a los modelos de lenguaje actuales de sus predecesores es su escala y capacidades emergentes, que aparecen de esa escala.]]', '[[Large language models are distinguished from predecessors by what is their scale and emergent capabilities arising from it, what makes them able to perform tasks for which they were never explicitly trained, which is what distinguishes them.|Los modelos de lenguaje actuales son distinguidos de los predecesores por lo que es su escala y capacidades emergentes que surgen de ella.]]'], correctAnswer: 0, explanation: '"What + verb + is/are + noun phrase/clause" = the nominal what-cleft. It focuses the complement as the key piece of new information. Option A correctly uses "What distinguishes…is not merely X but Y" — a sophisticated double-focus structure.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u52-g2', type: 'fill-blank', level: 'C1', topic: 'cleft-sentences', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[It-Cleft Sentences|Oraciones hendidas con "it"]]', instructions: 'Complete with the correct it-cleft structure.',
      questions: [{ question: '_______ the opacity of algorithmic decision-making systems — their resistance to human-interpretable explanation — that poses the most significant challenge to deploying artificial intelligence in high-stakes domains such as criminal justice, medical diagnosis and credit assessment, where the right to understand and contest automated decisions is both legally required and ethically fundamental.', options: ['[[It is|Es]]', '[[There is|Hay]]', '[[What is|Lo que es]]'], correctAnswer: 'It is', acceptableAnswers: ['It is'], explanation: '"It is + focused element + that + rest of clause" = the it-cleft structure, emphasising the focused element (here: "the opacity of algorithmic decision-making systems"). "There is" introduces existential statements. "What is" begins a what-cleft, which requires a different structure.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u52-g3', type: 'multiple-choice', level: 'C1', topic: 'cleft-sentences', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[The Reason Why… is That…|La razón por la que… es que…]]', instructions: 'Choose the sentence using "the reason why" most correctly.',
      questions: [{ question: 'Which sentence correctly uses "the reason why…is that" as a formal focusing device?', options: ['[[The reason why the deployment of generative AI in creative industries has provoked such intense debate is not that the technology itself is inherently threatening to human creativity, but that it compresses the time horizon within which the economic displacement of certain creative labour markets is likely to occur, leaving inadequate time for workers and institutions to adapt.|La razón por la que el despliegue de la IA generativa en las industrias creativas ha provocado un debate tan intenso no es que la tecnología en sí sea inherentemente una amenaza para la creatividad humana, sino que comprime el horizonte temporal en el que probablemente ocurra el desplazamiento económico de ciertos mercados laborales creativos.]]', '[[The reason why generative AI in creative industries has provoked debate is because the technology is threatening and it is not that it is inherently threatening but the reason is that it compresses time for workers, which is why the debate is so intense.|La razón por la que la IA generativa en las industrias creativas ha provocado debate es porque la tecnología es amenazante.]]', '[[The reason for why generative AI has provoked debate in creative industries is due to that the deployment compresses time horizons and this is the reason why it is so intensely debated by workers and institutions.|La razón de por qué la IA generativa ha provocado debate en las industrias creativas se debe a que el despliegue comprime los horizontes temporales.]]'], correctAnswer: 0, explanation: '"The reason why…is not that X but that Y" = a formal cleft structure that focuses on the causal explanation while introducing a nuanced distinction. "Due to that" and "because of" are not interchangeable with "that" in this structure.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u52-v1', type: 'multiple-choice', level: 'C1', topic: 'ai-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Artificial Intelligence Concepts|Conceptos de inteligencia artificial]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The phenomenon in which AI systems trained on historical data learn and reproduce the biases present in that data — including gender, racial and socioeconomic biases — thereby perpetuating and potentially amplifying existing patterns of discrimination when deployed in consequential decision-making contexts is known as _______.', options: ['[[algorithmic bias|sesgo algorítmico]]', '[[overfitting|sobreajuste]]', '[[hallucination|alucinación]]'], correctAnswer: 0, explanation: '"Algorithmic bias" = the systematic and repeatable errors in AI outputs that create unfair outcomes — typically arising from biased training data or biased model design. "Overfitting" = a model performing well on training data but poorly on new data. "Hallucination" = AI generating confident but factually incorrect outputs.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u52-v2', type: 'fill-blank', level: 'C1', topic: 'ai-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[AI Safety|Seguridad de la IA]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The research field concerned with ensuring that advanced artificial intelligence systems act in accordance with human values and intentions — including preventing misalignment between AI objectives and human welfare — is broadly known as AI _______ research.', options: ['[[safety|seguridad]]', '[[performance|rendimiento]]', '[[efficiency|eficiencia]]'], correctAnswer: 'safety', acceptableAnswers: ['safety', 'alignment'], explanation: '"AI safety" = the interdisciplinary field addressing risks from advanced AI systems, including alignment (ensuring AI pursues intended goals), interpretability and robustness. "AI performance" and "AI efficiency" refer to how well and how quickly systems complete tasks.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u52-v3', type: 'multiple-choice', level: 'C1', topic: 'ai-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[AI and Labour|IA y trabajo]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The economic theory predicting that technological unemployment caused by automation will be temporary — because new technologies also create new categories of employment that offset those displaced — and that human workers will always find productive roles that machines cannot perform is known as _______.', options: ['[[the lump of labour fallacy|la falacia de la cantidad fija de trabajo]]', '[[technological determinism|determinismo tecnológico]]', '[[creative destruction|destrucción creativa]]'], correctAnswer: 2, explanation: '"Creative destruction" (Schumpeter) = the process of continuous innovation that destroys old industries and creates new ones, including new forms of employment. The argument that automation creates as well as destroys jobs draws on this theory. "Lump of labour fallacy" = the mistaken belief that there is a fixed amount of work. "Technological determinism" = the view that technology drives social change.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u52-r1', type: 'reading', level: 'C1', topic: 'ai-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Alignment Problem|El problema de la alineación]]', instructions: 'Read and answer.',
      passage: 'What makes the alignment problem — the challenge of ensuring that advanced AI systems pursue goals that are actually beneficial to humanity rather than merely the proxies that humans have specified — so technically and philosophically difficult is not its novelty but its structure. It is a problem of specification under uncertainty: what we want AI systems to do is not fully articulable in advance, because it depends on values, contexts and trade-offs that we cannot exhaustively enumerate. The reason why this matters far more than it might seem is that even small misspecifications in an objective function can, in sufficiently capable systems, produce dramatically unaligned behaviour as the system optimises efficiently for the wrong thing. What has come to be known as Goodhart\'s Law — "when a measure becomes a target, it ceases to be a good measure" — captures part of this problem: systems optimised for measurable proxies of human welfare tend to find ways of satisfying the measure without satisfying the underlying value. It is this structural feature of the alignment problem, rather than any science-fiction scenario of malicious AI, that most concerns researchers working seriously in the field.',
      questions: [{ question: 'What does the text identify as the core structural challenge of the alignment problem?', options: ['[[It is a problem of specification under uncertainty: what we want AI to do cannot be fully articulated in advance because it depends on unenumerable values and trade-offs, and even small misspecifications can produce dramatically misaligned behaviour in highly capable systems optimising for the wrong proxy.|Es un problema de especificación bajo incertidumbre: lo que queremos que haga la IA no puede articularse completamente de antemano porque depende de valores y compromisos no enumerables, e incluso pequeñas especificaciones incorrectas pueden producir un comportamiento dramáticamente desalineado en sistemas altamente capaces.]]', '[[The core challenge identified is computational power: current AI systems are not yet capable enough to solve the alignment problem, and it is only when systems become significantly more powerful that the alignment problem becomes genuinely threatening.|El desafío central identificado es la potencia computacional: los sistemas de IA actuales no son todavía lo suficientemente capaces para resolver el problema de alineación.]]', '[[The text identifies public misunderstanding as the core challenge: because most people think of alignment as a science-fiction problem of malicious AI, they fail to take seriously the more mundane but more immediate risks of misspecified objective functions.|El texto identifica la incomprensión pública como el desafío central: porque la mayoría de las personas piensan en la alineación como un problema de ciencia ficción.]]'], correctAnswer: 0, explanation: 'The text states the problem is "specification under uncertainty" — values cannot be fully enumerated in advance, and small misspecifications produce misaligned behaviour. It ends by clarifying this "structural feature" is more concerning than "science-fiction scenarios".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u52-r2', type: 'reading', level: 'C1', topic: 'ai-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[AI and Democratic Discourse|IA y discurso democrático]]', instructions: 'Read and answer.',
      passage: 'It is the capacity of generative AI to produce synthetic media — text, images, audio, video — of near-indistinguishable quality from human-created content that has most immediately alarmed those concerned with the integrity of democratic discourse. What had previously required significant resources and expertise to fabricate can now be generated in seconds by anyone with a consumer-grade device and an internet connection. The reason why this matters particularly for democratic societies is that democratic deliberation depends on a minimum shared epistemic baseline: citizens need to be able to trust that the evidence they are evaluating — the speech attributed to a political candidate, the document leaked to a journalist, the video of an event — is genuine. What these technologies threaten, at their most disruptive, is not merely the credibility of individual pieces of content but the broader social convention that shared perception of events constitutes a legitimate basis for political judgment. It is important to note, however, that the threat is asymmetric: even a small number of high-profile deepfakes can generate disproportionate scepticism, eroding trust in genuine content that happens to be inconvenient — a phenomenon sometimes termed the "liar\'s dividend".',
      questions: [{ question: 'What does the text describe as the "liar\'s dividend"?', options: ['[[The asymmetric threat whereby even a small number of high-profile deepfakes can generate disproportionate scepticism, eroding trust in genuine content that happens to be inconvenient for those wishing to discredit it.|La amenaza asimétrica por la que incluso un pequeño número de deepfakes de alto perfil puede generar un escepticismo desproporcionado, erosionando la confianza en el contenido genuino que resulta inconveniente para quienes desean desacreditarlo.]]', '[[The commercial benefit that AI companies derive from the widespread use of deepfake technology, which generates advertising revenue and user engagement that offsets any reputational damage from the harmful uses of the technology.|El beneficio comercial que las empresas de IA obtienen del uso generalizado de la tecnología deepfake, que genera ingresos publicitarios y participación de los usuarios.]]', '[[The legal protection that creators of synthetic media enjoy in many jurisdictions, where demonstrating that content is AI-generated rather than deliberately fabricated human testimony provides a complete defence against defamation claims.|La protección legal que los creadores de medios sintéticos disfrutan en muchas jurisdicciones, donde demostrar que el contenido es generado por IA proporciona una defensa completa contra las demandas por difamación.]]'], correctAnswer: 0, explanation: 'The text explains: "even a small number of high-profile deepfakes can generate disproportionate scepticism, eroding trust in genuine content that happens to be inconvenient — a phenomenon sometimes termed the \'liar\'s dividend\'."' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u52-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'ai-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Artificial Intelligence and Society), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u52-l1', type: 'listening', level: 'C1', topic: 'ai-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Conference on AI Ethics|Una conferencia sobre ética de la IA]]', instructions: 'Read the transcript and answer.',
      passage: 'Speaker: What I want to challenge today is what I think of as the "governance gap" framing of the AI challenge — the idea that the problem is simply that regulation is lagging behind technology. This framing is correct as far as it goes, but what it misses is that closing the gap requires not merely writing more rules but developing the institutional capacity to understand, evaluate and monitor systems of enormous and rapidly increasing complexity. The reason why existing regulatory frameworks are inadequate is not primarily that they lack authority, but that they lack expertise. It is the combination of technical opacity, rapid capability change and commercial incentives to obscure how systems work that makes AI governance qualitatively different from regulating previous industries. What is needed, therefore, is not merely more regulation but a new kind of regulatory institution — one that embeds deep technical expertise, operates with genuine independence from both government and industry, and has both the mandate and the resources to conduct its own technical evaluations rather than relying on the self-reporting of the companies being regulated. What the history of financial regulation should have taught us is that regulatory capture is the default outcome when regulators lack the resources and expertise to be genuinely independent.',
      questions: [{ question: 'What does the speaker identify as the primary inadequacy of existing regulatory frameworks for AI?', options: ['[[Not primarily a lack of authority but a lack of expertise — the combination of technical opacity, rapid capability change and commercial incentives to obscure how systems work makes AI governance qualitatively different, requiring regulators with deep technical expertise and genuine independence rather than simply more rules.|No principalmente una falta de autoridad sino una falta de experiencia: la combinación de opacidad técnica, cambio rápido de capacidades e incentivos comerciales para oscurecer cómo funcionan los sistemas hace que la gobernanza de la IA sea cualitativamente diferente, requiriendo reguladores con profunda experiencia técnica e independencia genuina.]]', '[[The primary inadequacy is that existing frameworks were designed for physical products and services and cannot easily be adapted to govern software systems that operate invisibly, update continuously and have no physical presence in any single jurisdiction.|La principal inadecuación es que los marcos existentes fueron diseñados para productos y servicios físicos y no pueden adaptarse fácilmente para gobernar sistemas de software que operan de forma invisible.]]', '[[The speaker argues that existing frameworks are inadequate primarily because they are national in scope, while AI systems are global, and any effective regulation must therefore be international and coordinated across jurisdictions through binding treaty obligations.|El orador argumenta que los marcos existentes son inadecuados principalmente porque tienen alcance nacional, mientras que los sistemas de IA son globales.]]'], correctAnswer: 0, explanation: 'The speaker states: "The reason why existing regulatory frameworks are inadequate is not primarily that they lack authority, but that they lack expertise" — and identifies "technical opacity, rapid capability change and commercial incentives to obscure" as the key challenges.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u52-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'ai-listening',
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
    id: 'c1-u52-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'ai-listening',
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
    id: 'c1-u52-w1', type: 'writing', level: 'C1', topic: 'ai-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Using Cleft Sentences for Emphasis|Usar oraciones hendidas para dar énfasis]]', instructions: 'Which response uses cleft sentences most effectively?',
      questions: [{ question: 'Task: Write two sentences about the risks of AI in hiring decisions using at least two different cleft structures.', options: ['[[What makes the deployment of AI in hiring decisions particularly ethically fraught is not merely the risk of replicating historical biases encoded in training data, but the opacity of the process — the fact that neither the candidate nor, often, the employer can meaningfully interrogate why a system reached a particular assessment; it is this combination of consequentiality and inscrutability that makes the right to explanation not a bureaucratic nicety but a fundamental requirement of procedural fairness.|Lo que hace que el despliegue de la IA en las decisiones de contratación sea particularmente problemático desde el punto de vista ético no es meramente el riesgo de replicar sesgos históricos codificados en los datos de entrenamiento, sino la opacidad del proceso; es esta combinación de trascendencia e inscrutabilidad la que convierte el derecho a la explicación no en una formalidad burocrática sino en un requisito fundamental de equidad procesal.]]', '[[What is bad about AI in hiring is bias. It is the opacity that is also a problem. The reason why this matters is because it affects people. What we need is better regulation of hiring algorithms.|Lo que es malo sobre la IA en la contratación es el sesgo. Es la opacidad lo que también es un problema.]]', '[[AI in hiring has problems. What concerns experts is bias and opacity. It is the data that causes issues. The reason why this is important is because hiring affects people\'s lives and livelihoods significantly.|La IA en la contratación tiene problemas. Lo que preocupa a los expertos es el sesgo y la opacidad.]]'], correctAnswer: 0, explanation: 'Option A uses "What makes…is not merely X but Y" (what-cleft with contrast) and "It is this combination…that makes" (it-cleft) — both deployed within a substantive argument about procedural fairness and opacity.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u52-w2',
    type: 'writing',
    level: 'C1',
    topic: 'ai-writing',
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
    id: 'c1-u52-w3',
    type: 'writing',
    level: 'C1',
    topic: 'ai-writing',
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
