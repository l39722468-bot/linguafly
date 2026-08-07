/**
 * C1 Unit 34 — Leadership and Management
 * Module 6: Work and Economy
 * Grammar: Gerund vs infinitive — advanced usage; verbs with meaning change (stop, try, remember, regret, forget, go on, mean)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Leadership and Management';

export const UNIT_34_EXERCISES: Exercise[] = [
{
    id: 'c1-u34-g1', type: 'multiple-choice', level: 'C1', topic: 'gerund-infinitive', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Gerund vs Infinitive — Meaning Change|Gerundio vs infinitivo — cambio de significado]]', instructions: 'Choose the sentence with the correct form.',
      questions: [{ question: 'Which pair of sentences correctly illustrates the meaning difference between gerund and infinitive after "stop"?', options: ['[[(A) "He stopped to consider the implications" = he paused in order to consider; (B) "He stopped considering the role" = he no longer considered it.|(A) "Paró para considerar las implicaciones" = hizo una pausa con el fin de considerar; (B) "Dejó de considerar el puesto" = ya no lo consideraba.]]', '[[(A) "He stopped to consider the implications" = he no longer considered; (B) "He stopped considering the role" = he paused to think about it.|(A) "Paró para considerar las implicaciones" = ya no consideró; (B) "Dejó de considerar el puesto" = hizo una pausa para pensarlo.]]', '[[(A) and (B) have identical meanings because "stop" always indicates the end of an action regardless of whether it is followed by a gerund or an infinitive form.|(A) y (B) tienen significados idénticos porque "stop" siempre indica el final de una acción independientemente de si va seguido de un gerundio o un infinitivo.]]'], correctAnswer: 0, explanation: '"Stop + infinitive" = stop in order to do something (purpose). "Stop + gerund" = cease doing something (end of action). This is the classic meaning-change pair.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u34-g2', type: 'fill-blank', level: 'C1', topic: 'gerund-infinitive', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Remember / Forget|Recordar / Olvidar]]', instructions: 'Complete with the correct form.',
      questions: [{ question: 'She regrets _______ the restructuring proposal without consulting the wider team first, as the lack of buy-in has made implementation far more difficult than anticipated.', options: ['[[having approved|haber aprobado]]', '[[to approve|aprobar]]', '[[approve|aprobar]]'], correctAnswer: 'having approved', acceptableAnswers: ['having approved', 'approving'], explanation: '"Regret + gerund/perfect gerund" = feel sorry about something already done. "Regret + infinitive" = be sorry to inform/tell (formal announcement use only). Here the action is past, so gerund is required.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u34-g3', type: 'multiple-choice', level: 'C1', topic: 'gerund-infinitive', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Try + gerund vs infinitive|Try + gerundio vs infinitivo]]', instructions: 'Choose the correct interpretation.',
      questions: [{ question: 'What is the difference between: (A) "Try delegating more responsibility." and (B) "Try to delegate more responsibility."', options: ['[[(A) suggests delegation as an experiment worth attempting to see if it works; (B) urges making an effort to achieve delegation, implying it may be difficult.|(A) sugiere la delegación como un experimento que vale la pena intentar para ver si funciona; (B) insta a hacer un esfuerzo para lograr la delegación, lo que implica que puede ser difícil.]]', '[[(A) and (B) are interchangeable; both simply encourage the act of delegating more responsibility with no difference in nuance or register.|(A) y (B) son intercambiables; ambos simplemente alientan el acto de delegar más responsabilidad sin diferencia en matiz o registro.]]', '[[(A) means the person has already tried delegation and it failed; (B) means delegation is being attempted for the first time with uncertain outcome.|(A) significa que la persona ya ha intentado la delegación y ha fracasado; (B) significa que la delegación se está intentando por primera vez.]]'], correctAnswer: 0, explanation: '"Try + gerund" = experiment with a method to see the result. "Try + infinitive" = make an effort to accomplish something difficult. The difference is between experimentation and attempted achievement.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u34-v1', type: 'multiple-choice', level: 'C1', topic: 'leadership-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Leadership Styles|Estilos de liderazgo]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'A leader who consults team members, values collaborative input and ensures decisions reflect collective knowledge, while retaining ultimate accountability, is described as practising _______ leadership.', options: ['[[participative / democratic|participativo / democrático]]', '[[autocratic|autocrático]]', '[[laissez-faire|laissez-faire]]'], correctAnswer: 0, explanation: '"Participative" or "democratic" leadership = involvement of team members in decisions. "Autocratic" = centralised, top-down authority. "Laissez-faire" = minimal leader intervention, high subordinate autonomy.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u34-v2', type: 'fill-blank', level: 'C1', topic: 'leadership-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Management Concepts|Conceptos de gestión]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'Effective managers understand the importance of _______ — distributing tasks and authority to appropriate team members — as a means of developing staff capabilities and preventing personal overload.', options: ['[[delegation|delegación]]', '[[supervision|supervisión]]', '[[collaboration|colaboración]]'], correctAnswer: 'delegation', acceptableAnswers: ['delegation'], explanation: '"Delegation" = the assignment of tasks and authority to subordinates. "Supervision" = oversight. "Collaboration" = working jointly. Delegation is the specific concept described.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u34-v3', type: 'multiple-choice', level: 'C1', topic: 'leadership-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Organisational Behaviour|Comportamiento organizacional]]', instructions: 'Choose the correct collocation.',
      questions: [{ question: 'The new director worked to rebuild staff confidence following the crisis by _______ a clear vision for the organisation\'s future and communicating transparently about the difficult decisions ahead.', options: ['[[articulating|articulando]]', '[[saying|diciendo]]', '[[telling|contando]]'], correctAnswer: 0, explanation: '"Articulate a vision" = formal collocation for clearly expressing and communicating a forward-looking organisational direction. "Say" and "tell" are too informal and lack the strategic register appropriate here.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u34-r1', type: 'reading', level: 'C1', topic: 'leadership-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Transformational Leadership|Liderazgo transformacional]]', instructions: 'Read and answer.',
      passage: 'Transformational leadership theory, developed most influentially by James MacGregor Burns and later extended by Bernard Bass, proposes that effective leaders inspire followers to transcend immediate self-interest in pursuit of a higher collective purpose. Rather than relying on transactional exchanges — offering rewards in exchange for compliance — transformational leaders focus on articulating a compelling vision, modelling values and developing the intrinsic motivation of those around them. Critics have noted, however, that transformational leadership risks fostering dependency if followers stop questioning the leader\'s vision and go on simply executing directives. The distinction between inspiring transformation and cultivating uncritical deference is, therefore, one that ethically aware organisations need to continue examining.',
      questions: [{ question: 'What risk does the text associate with transformational leadership?', options: ['[[Followers may stop questioning the leader\'s vision and become dependent on directives rather than developing independent judgement.|Los seguidores pueden dejar de cuestionar la visión del líder y volverse dependientes de las directrices en lugar de desarrollar un juicio independiente.]]', '[[Transformational leadership is inherently ineffective because it neglects financial incentives, which remain the primary driver of employee performance.|El liderazgo transformacional es inherentemente ineficaz porque descuida los incentivos financieros, que siguen siendo el principal motor del rendimiento de los empleados.]]', '[[Transformational leaders are more likely than transactional leaders to engage in unethical behaviour because they believe their vision justifies any means.|Los líderes transformacionales son más propensos que los líderes transaccionales a adoptar comportamientos poco éticos porque creen que su visión justifica los medios.]]'], correctAnswer: 0, explanation: 'The text says transformational leadership "risks fostering dependency if followers stop questioning the leader\'s vision and go on simply executing directives".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u34-r2', type: 'reading', level: 'C1', topic: 'leadership-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Decision-Making Under Uncertainty|Toma de decisiones bajo incertidumbre]]', instructions: 'Read and answer.',
      passage: 'Senior managers are frequently required to make consequential decisions with incomplete information and under significant time pressure. Research in decision science suggests that two broad cognitive approaches tend to be employed: analytical reasoning, which involves systematically gathering and weighing evidence before committing to a course of action; and intuitive reasoning, which draws on pattern recognition built from accumulated experience. Neither approach is categorically superior. Analytical reasoning risks missing opportunities through excessive deliberation; intuitive reasoning risks perpetuating cognitive biases. Effective leaders learn to recognise when each approach is appropriate — remembering to question their instincts when the situation is novel, and trusting experience when established patterns clearly apply.',
      questions: [{ question: 'What does the text recommend about analytical and intuitive decision-making?', options: ['[[Effective leaders learn to apply each approach contextually, questioning intuition in novel situations and trusting experience when established patterns apply.|Los líderes efectivos aprenden a aplicar cada enfoque contextualmente, cuestionando la intuición en situaciones novedosas y confiando en la experiencia cuando se aplican patrones establecidos.]]', '[[The text recommends that managers always rely on analytical reasoning because it eliminates cognitive bias and produces consistently superior decisions across all contexts.|El texto recomienda que los gerentes siempre confíen en el razonamiento analítico porque elimina el sesgo cognitivo y produce decisiones consistentemente superiores en todos los contextos.]]', '[[The text argues that intuitive decision-making should be phased out entirely in organisations because it is inherently less reliable than data-driven analytical processes.|El texto argumenta que la toma de decisiones intuitiva debería eliminarse por completo en las organizaciones porque es inherentemente menos fiable que los procesos analíticos basados en datos.]]'], correctAnswer: 0, explanation: 'The text advocates contextual application: "remembering to question their instincts when the situation is novel, and trusting experience when established patterns clearly apply".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u34-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'leadership-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Leadership and Management), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u34-l1', type: 'listening', level: 'C1', topic: 'leadership-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Leadership Masterclass|Una clase magistral de liderazgo]]', instructions: 'Read the transcript and answer.',
      passage: 'Speaker: One thing I always remind new managers is to stop trying to do everything themselves. I remember spending my first year as a department head refusing to delegate, convincing myself that I was the only person capable of delivering the quality the role demanded. What I eventually learned was that by attempting to retain control of every output, I had effectively stopped my team from developing. I went on to implement a structured delegation framework, and within six months the team had not only matched but exceeded the standards I had been straining to maintain alone. The lesson? Effective leadership means accepting that your role is to enable others, not to outperform them.',
      questions: [{ question: 'What change in approach did the speaker make, and what was the outcome?', options: ['[[The speaker introduced a delegation framework, which led to the team matching and then exceeding the standards the speaker had previously maintained alone.|El ponente introdujo un marco de delegación, lo que llevó al equipo a igualar y luego superar los estándares que el ponente había mantenido previamente solo.]]', '[[The speaker hired additional staff to compensate for the team\'s underperformance, which allowed overall quality standards to be maintained without requiring delegation.|El ponente contrató personal adicional para compensar el bajo rendimiento del equipo, lo que permitió mantener los estándares de calidad generales sin requerir delegación.]]', '[[The speaker concluded that delegation was counterproductive and reverted to managing all outputs personally, which restored performance standards within six months.|El ponente concluyó que la delegación era contraproducente y volvió a gestionar todos los resultados personalmente, lo que restableció los estándares de rendimiento en seis meses.]]'], correctAnswer: 0, explanation: 'The speaker implemented a "structured delegation framework" and the team "matched but exceeded the standards" the speaker had maintained alone.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u34-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'leadership-listening',
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
    id: 'c1-u34-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'leadership-listening',
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
    id: 'c1-u34-w1', type: 'writing', level: 'C1', topic: 'leadership-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Using Verb Patterns Accurately|Usar patrones verbales con precisión]]', instructions: 'Which response uses gerund and infinitive patterns most accurately?',
      questions: [{ question: 'Task: Write two sentences about challenges facing new managers, using verb patterns precisely.', options: ['[[New managers often struggle to avoid micromanaging their teams, having been promoted precisely because of their individual technical competence. Learning to stop intervening in every decision and go on to cultivate genuine team autonomy is one of the most significant professional transitions a manager can undertake.|Los nuevos gerentes a menudo luchan por evitar la microgestión de sus equipos, habiendo sido promovidos precisamente por su competencia técnica individual. Aprender a dejar de intervenir en cada decisión y pasar a cultivar la autonomía genuina del equipo es una de las transiciones profesionales más significativas que un gerente puede emprender.]]', '[[New managers often have difficulty because they try managing everything by themselves. They need to stop to do this and remember delegating more often to their team members who are capable of doing the work.|Los nuevos gerentes a menudo tienen dificultades porque intentan gestionar todo por sí mismos. Necesitan dejar de hacer esto y recordar delegar con más frecuencia a los miembros de su equipo.]]', '[[New managers find it hard because they are used to doing things themselves. They should try to doing less and let the team do more. It is important for them to remember that their job is now different.|Los nuevos gerentes lo encuentran difícil porque están acostumbrados a hacer las cosas ellos mismos. Deberían intentar hacer menos y dejar que el equipo haga más.]]'], correctAnswer: 0, explanation: 'Option A uses "stop intervening" (cease), "go on to cultivate" (move on to next action), "struggle to avoid" and "learning to" accurately. Options B and C contain errors ("stop to do", "try to doing").' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u34-w2',
    type: 'writing',
    level: 'C1',
    topic: 'leadership-writing',
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
    id: 'c1-u34-w3',
    type: 'writing',
    level: 'C1',
    topic: 'leadership-writing',
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
