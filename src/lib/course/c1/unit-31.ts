/**
 * C1 Unit 31 — The World of Work: Careers and Ambition
 * Module 6: Work and Economy
 * Grammar: It-structures (It is generally accepted that… / It has been suggested… / It seems that…)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'The World of Work: Careers and Ambition';

export const UNIT_31_EXERCISES: Exercise[] = [
{
    id: 'c1-u31-g1', type: 'multiple-choice', level: 'C1', topic: 'it-structures', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[It-structures|Estructuras con "It"]]', instructions: 'Choose the sentence with the correct it-structure.',
      questions: [{ question: 'Which sentence correctly uses a formal it-structure?', options: ['[[It is widely acknowledged that remote working has fundamentally altered the relationship between employers and employees, raising profound questions about organisational culture and worker wellbeing.|Se reconoce ampliamente que el trabajo remoto ha alterado fundamentalmente la relación entre empleadores y empleados, planteando profundas preguntas sobre la cultura organizacional y el bienestar de los trabajadores.]]', '[[It is widely acknowledged remote working has fundamentally altered the relationship between employers and employees and raises profound questions about organisational culture and worker wellbeing.|Se reconoce ampliamente que el trabajo remoto ha alterado fundamentalmente la relación entre empleadores y empleados y plantea profundas preguntas sobre la cultura organizacional.]]', '[[It acknowledges widely that remote working fundamentally altered the relationship between employers and employees, and raised profound questions about organisational culture and worker wellbeing.|Se reconoce ampliamente que el trabajo remoto alteró fundamentalmente la relación entre empleadores y empleados, y planteó profundas preguntas sobre la cultura organizacional.]]'], correctAnswer: 0, explanation: '"It is + past participle + that + clause" = correct impersonal passive construction. "It is widely acknowledged that…" is the standard formal pattern.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u31-g2', type: 'fill-blank', level: 'C1', topic: 'it-structures', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[It-structures|Estructuras con "It"]]', instructions: 'Complete with the correct it-structure.',
      questions: [{ question: '_______ that increasing automation will displace a significant proportion of the current workforce within the next two decades, though the full extent of this disruption remains uncertain.', options: ['[[It has been predicted|Se ha predicho]]', '[[It is predicting|Se está prediciendo]]', '[[It was predicting|Se estaba prediciendo]]'], correctAnswer: 'It has been predicted', acceptableAnswers: ['It has been predicted', 'It is widely predicted', 'It has been suggested', 'It is estimated'], explanation: '"It has been predicted that…" = impersonal passive reporting structure. Present perfect passive reports current consensus or recent expert opinion.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u31-g3', type: 'multiple-choice', level: 'C1', topic: 'it-structures', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Extraposition with It|Extraposición con "It"]]', instructions: 'Choose the most natural it-structure.',
      questions: [{ question: 'Rewrite formally: "That employees feel valued is essential for productivity."', options: ['[[It is essential that employees feel valued for productivity to be sustained.|Es esencial que los empleados se sientan valorados para que la productividad se mantenga.]]', '[[It essentially is that employees feeling valued is for productivity.|Es esencialmente que los empleados se sientan valorados para la productividad.]]', '[[It is essential for employees to feel valued is for productivity.|Es esencial que los empleados se sientan valorados para la productividad.]]'], correctAnswer: 0, explanation: '"It is + adjective + that + clause" = extraposition — moves the subject clause to the end and uses "it" as a dummy subject. The result is more natural and formal than the fronted subject clause.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u31-v1', type: 'multiple-choice', level: 'C1', topic: 'work-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Careers and Employment|Carreras y empleo]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'A worker who moves between short-term contracts, freelance assignments and self-employment rather than holding a permanent position is said to be part of the _______ economy.', options: ['[[gig|economía gig]]', '[[black|economía negra]]', '[[grey|economía gris]]'], correctAnswer: 0, explanation: '"The gig economy" = the sector characterised by short-term, flexible work arrangements. "The black economy" = unregulated or illegal work. "The grey economy" = economic activity not fully regulated.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u31-v2', type: 'fill-blank', level: 'C1', topic: 'work-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Professional Development|Desarrollo profesional]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'Employers increasingly prioritise _______ — the acquisition of new competencies by existing workers — as an alternative to large-scale recruitment in a rapidly changing labour market.', options: ['[[upskilling|mejora de competencias]]', '[[deskilling|reducción de competencias]]', '[[reskilling|reconversión laboral]]'], correctAnswer: 'upskilling', acceptableAnswers: ['upskilling', 'reskilling'], explanation: '"Upskilling" = developing new or enhanced skills within the same field. "Reskilling" = acquiring competencies for a different role. Both are valid; "deskilling" = the opposite.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u31-v3', type: 'multiple-choice', level: 'C1', topic: 'work-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Workplace Relations|Relaciones laborales]]', instructions: 'Choose the correct collocation.',
      questions: [{ question: 'After years of _______ between the trade union and management, both parties finally reached a compromise agreement on pay and working conditions.', options: ['[[protracted negotiations|negociaciones prolongadas]]', '[[extended conversations|conversaciones extendidas]]', '[[long discussions|discusiones largas]]'], correctAnswer: 0, explanation: '"Protracted negotiations" = formal collocation for lengthy, difficult talks. "Extended conversations" and "long discussions" are less formal and not standard labour-relations register.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u31-r1', type: 'reading', level: 'C1', topic: 'work-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Future of Work|El futuro del trabajo]]', instructions: 'Read and answer.',
      passage: 'It is increasingly accepted that the traditional model of lifelong employment with a single organisation is no longer the dominant paradigm for professional life in advanced economies. It has been observed that workers entering the labour market today are likely to hold an average of ten to fifteen different positions across multiple sectors during their careers. It is perhaps unsurprising, therefore, that younger generations place greater emphasis on skill transferability, personal fulfilment and flexibility than on institutional loyalty. It should be noted, however, that this shift carries risks: without the stability of long-term employment, workers may lack access to pension provision, healthcare and the legal protections historically associated with permanent contracts.',
      questions: [{ question: 'What concern about portfolio careers does the text raise?', options: ['[[Workers may lose access to social protections historically linked to permanent employment contracts.|Los trabajadores pueden perder el acceso a las protecciones sociales históricamente vinculadas a los contratos de trabajo permanentes.]]', '[[Workers in portfolio careers are legally prohibited from accessing pension schemes under current employment law.|Los trabajadores con carreras de portafolio tienen prohibido legalmente acceder a planes de pensiones según la legislación laboral vigente.]]', '[[The shift away from permanent employment is welcomed by all generations of workers.|El alejamiento del empleo permanente es bienvenido por todas las generaciones de trabajadores.]]'], correctAnswer: 0, explanation: 'The text warns that without permanent contracts, workers may lack access to pensions, healthcare and legal protections.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u31-r2', type: 'reading', level: 'C1', topic: 'work-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Remote Work and Productivity|Teletrabajo y productividad]]', instructions: 'Read and answer.',
      passage: 'It is now widely documented that the rapid expansion of remote work during the 2020s produced contradictory outcomes. It is true that many knowledge workers reported increased productivity and improved wellbeing when freed from lengthy commutes and open-plan offices. Yet it has also been established that remote work can erode the informal social bonds that sustain organisational cohesion, mentoring relationships and the transmission of institutional knowledge from experienced to junior staff. It is therefore argued by many management scholars that a hybrid model — combining structured in-office time with remote flexibility — offers the most viable path forward for most organisations.',
      questions: [{ question: 'What does the text suggest about fully remote work arrangements?', options: ['[[Remote work improves productivity for many but can weaken the social bonds and mentoring relationships that organisations depend on.|El teletrabajo mejora la productividad para muchos, pero puede debilitar los vínculos sociales y las relaciones de mentoría de las que dependen las organizaciones.]]', '[[Remote work has been conclusively proven to reduce productivity across all sectors, which is why hybrid models are now mandated.|Se ha demostrado de manera concluyente que el teletrabajo reduce la productividad en todos los sectores, por lo que los modelos híbridos son ahora obligatorios.]]', '[[Remote work has no effect on organisational culture because informal bonds are maintained digitally through collaboration tools.|El teletrabajo no tiene ningún efecto en la cultura organizacional porque los vínculos informales se mantienen digitalmente.]]'], correctAnswer: 0, explanation: 'The text acknowledges both benefits (productivity, wellbeing) and drawbacks (weakened social bonds, mentoring loss) of remote work.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u31-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'work-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (The World of Work: Careers and Ambition), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u31-l1', type: 'listening', level: 'C1', topic: 'work-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Career Change Interview|Entrevista sobre cambio de carrera]]', instructions: 'Read the transcript and answer.',
      passage: 'Interviewer: You left a senior position in finance to retrain as a nurse. It must have seemed a radical decision to many people. | Guest: It did. It is fair to say that most of my colleagues thought I had lost my mind. But it had become clear to me that the work I was doing — however well-compensated — lacked the direct human impact I was looking for. It seemed to me that nursing offered exactly that. | Interviewer: Was it financially difficult? | Guest: It was. It is worth pointing out that training grants are available, but they do not fully offset the loss of income during a two-year programme. It was only possible because my partner was working full-time and we had made sacrifices in advance.',
      questions: [{ question: 'Why did the guest leave finance?', options: ['[[The guest felt the work lacked direct human impact, despite being well paid.|El invitado sintió que el trabajo carecía de impacto humano directo, a pesar de estar bien remunerado.]]', '[[The guest was dismissed from the finance role and had no option but to retrain as a nurse.|El invitado fue despedido del puesto de finanzas y no tuvo más opción que formarse como enfermero.]]', '[[The guest left because finance salaries had fallen significantly and nursing offered better pay.|El invitado se fue porque los salarios en finanzas habían caído significativamente y la enfermería ofrecía mejor remuneración.]]'], correctAnswer: 0, explanation: 'The guest says the finance work "lacked the direct human impact I was looking for", not that it was badly paid.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u31-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'work-listening',
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
    id: 'c1-u31-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'work-listening',
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
    id: 'c1-u31-w1', type: 'writing', level: 'C1', topic: 'work-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Formal Report Language|Lenguaje de informe formal]]', instructions: 'Which response uses it-structures and formal register most effectively?',
      questions: [{ question: 'Task: Write two sentences for a business report on the impact of a four-day working week.', options: ['[[It has been demonstrated by several pilot programmes that a four-day working week can maintain or even improve overall productivity, provided that workload management systems are appropriately adapted. It is notable that employee wellbeing indicators — including stress levels, absenteeism and reported job satisfaction — improved significantly in the majority of organisations that participated in these trials.|Varios programas piloto han demostrado que una semana laboral de cuatro días puede mantener o incluso mejorar la productividad general, siempre que los sistemas de gestión de la carga de trabajo se adapten adecuadamente. Es notable que los indicadores de bienestar de los empleados mejoraron significativamente en la mayoría de las organizaciones que participaron.]]', '[[Many companies have tried a four-day week and it seems to work well. Workers are happier and they do not miss the fifth day at all, which is good because happy workers work better and the companies save money on running costs.|Muchas empresas han probado la semana de cuatro días y parece funcionar bien. Los trabajadores están más contentos y no echan de menos el quinto día, lo que es bueno.]]', '[[The four-day week is a great idea and it should be adopted by all companies. It makes workers happy and it saves money. It is obvious that this is the future of work and governments should make it a legal requirement.|La semana de cuatro días es una gran idea y todas las empresas deberían adoptarla. Hace felices a los trabajadores y ahorra dinero. Es obvio que este es el futuro del trabajo.]]'], correctAnswer: 0, explanation: 'Option A uses passive it-structures ("It has been demonstrated", "It is notable"), maintains formal register and includes hedging ("provided that"). Options B and C are informal or unsubstantiated.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u31-w2',
    type: 'writing',
    level: 'C1',
    topic: 'work-writing',
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
    id: 'c1-u31-w3',
    type: 'writing',
    level: 'C1',
    topic: 'work-writing',
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
