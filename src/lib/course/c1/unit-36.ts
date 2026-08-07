/**
 * C1 Unit 36 — The Economy and Society
 * Module 6: Work and Economy — Consolidation
 * Grammar: Module 6 mixed review (it-structures, cause/result, business conditionals, gerund/infinitive, advanced modals)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'The Economy and Society';

export const UNIT_36_EXERCISES: Exercise[] = [
{
    id: 'c1-u36-g1', type: 'multiple-choice', level: 'C1', topic: 'mixed-module6', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[It-structures in Economic Discourse|Estructuras con "It" en discurso económico]]', instructions: 'Choose the passage that most accurately uses Module 6 structures.',
      questions: [{ question: 'Which sentence uses an it-structure and a result linker correctly?', options: ['[[It is generally recognised that income inequality has widened considerably across most advanced economies over the past four decades; consequently, the social cohesion that underpins stable democratic governance has come under increasing strain in many societies.|Se reconoce generalmente que la desigualdad de ingresos se ha ampliado considerablemente en la mayoría de las economías avanzadas en los últimos cuarenta años; consecuentemente, la cohesión social que sustenta la gobernanza democrática estable ha estado bajo creciente tensión.]]', '[[It recognises generally that income inequality has widened considerably; as a result the social cohesion which underpins stable democratic governance has increasingly come under strain.|Se reconoce generalmente que la desigualdad de ingresos se ha ampliado considerablemente; como resultado, la cohesión social que sustenta la gobernanza democrática estable ha estado cada vez más bajo tensión.]]', '[[It is generally recognised income inequality has widened considerably; and because of this the social cohesion that underpins stable democratic governance is under strain increasingly in many societies.|Se reconoce generalmente que la desigualdad de ingresos se ha ampliado considerablemente; y debido a esto la cohesión social que sustenta la gobernanza democrática estable está bajo tensión.]]'], correctAnswer: 0, explanation: '"It is generally recognised that…" = correct passive it-structure. "Consequently" + new clause = correct result linker. All structures conform to Module 6 patterns.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u36-g2', type: 'fill-blank', level: 'C1', topic: 'mixed-module6', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Business Conditional + Modal|Condicional de negocios + modal]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The government will release the second tranche of economic recovery funds, _______ the independent fiscal watchdog certifies that the first tranche has been deployed in strict accordance with the agreed programme objectives.', options: ['[[provided that|siempre y cuando]]', '[[despite|a pesar de que]]', '[[because|porque]]'], correctAnswer: 'provided that', acceptableAnswers: ['provided that', 'on condition that', 'as long as'], explanation: '"Provided that" = formal conditional connector requiring a prerequisite. Typical in economic policy, contract and governance language. "Despite" and "because" serve different grammatical and logical functions.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u36-g3', type: 'multiple-choice', level: 'C1', topic: 'mixed-module6', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Gerund/Infinitive in Economic Contexts|Gerundio/infinitivo en contextos económicos]]', instructions: 'Choose the sentence with correct verb patterns.',
      questions: [{ question: 'Which sentence uses gerund and infinitive patterns correctly?', options: ['[[Policymakers risk exacerbating existing inequalities by failing to account for distributional effects when designing fiscal stimulus packages, and they would do well to remember that short-term demand management should never mean neglecting the structural reforms on which long-term prosperity depends.|Los responsables políticos corren el riesgo de exacerbar las desigualdades existentes al no tener en cuenta los efectos distributivos al diseñar paquetes de estímulo fiscal, y harían bien en recordar que la gestión de la demanda a corto plazo nunca debe significar descuidar las reformas estructurales.]]', '[[Policymakers risk to exacerbate existing inequalities by to fail to account for distributional effects in designing fiscal stimulus packages, and they should to remember that short-term demand management must not mean to neglect structural reforms.|Los responsables políticos corren el riesgo de exacerbar las desigualdades existentes al no tener en cuenta los efectos distributivos al diseñar paquetes de estímulo fiscal.]]', '[[Policymakers are risking to exacerbate existing inequalities by failing to account for distributional effects when they design fiscal stimulus packages, and they should not mean neglecting the structural reforms.|Los responsables políticos corren el riesgo de exacerbar las desigualdades existentes al no tener en cuenta los efectos distributivos al diseñar paquetes de estímulo fiscal.]]'], correctAnswer: 0, explanation: '"Risk + gerund", "by + gerund", "remember + infinitive", "mean + gerund" — all correct. Option A uses every pattern accurately. B and C contain "risk to", "mean to neglect" and other errors.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u36-v1', type: 'multiple-choice', level: 'C1', topic: 'economy-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Economic Policy|Política económica]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'Government spending on infrastructure, education and public services — used as a tool to stimulate aggregate demand during economic downturns — is an example of _______ policy.', options: ['[[fiscal|fiscal]]', '[[monetary|monetaria]]', '[[supply-side|de oferta]]'], correctAnswer: 0, explanation: '"Fiscal policy" = government decisions on taxation and spending. "Monetary policy" = central bank decisions on interest rates and money supply. "Supply-side policy" = measures to increase productive capacity.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u36-v2', type: 'fill-blank', level: 'C1', topic: 'economy-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Labour Economics|Economía laboral]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The simultaneous existence of unfilled vacancies and unemployed workers — suggesting a structural mismatch between the skills of available workers and the requirements of available positions — is referred to as _______ unemployment.', options: ['[[structural|estructural]]', '[[cyclical|cíclica]]', '[[frictional|friccional]]'], correctAnswer: 'structural', acceptableAnswers: ['structural'], explanation: '"Structural unemployment" = caused by skills mismatch between workers and available roles. "Cyclical" = caused by downturns in economic activity. "Frictional" = caused by workers transitioning between jobs.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u36-v3', type: 'multiple-choice', level: 'C1', topic: 'economy-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[International Trade|Comercio internacional]]', instructions: 'Choose the correct collocation.',
      questions: [{ question: 'The economic theory that countries should specialise in producing goods for which they have the lowest _______ cost — producing them more efficiently relative to their alternatives — and trade for goods where others hold this advantage is known as comparative advantage.', options: ['[[opportunity|de oportunidad]]', '[[transaction|de transacción]]', '[[sunk|hundido]]'], correctAnswer: 0, explanation: '"Opportunity cost" = the value of the best alternative foregone. Comparative advantage is built on the principle that countries should specialise where their opportunity cost is lowest.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u36-r1', type: 'reading', level: 'C1', topic: 'economy-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Universal Basic Income|Renta básica universal]]', instructions: 'Read and answer.',
      passage: 'It has been proposed by economists across the political spectrum that a universal basic income — a regular, unconditional cash payment to all citizens regardless of employment status — could address structural inequalities generated by automation and the erosion of traditional employment. Provided that such a scheme were funded through progressive taxation or a robot tax on automation-derived profits, proponents argue it would avoid exacerbating existing wealth disparities. Critics, however, contend that it risks undermining the incentive to work, thereby reducing labour market participation and hence aggregate economic output. It has been suggested, furthermore, that existing targeted welfare systems are better suited to meeting the needs of the most vulnerable, making UBI an inefficient use of public resources.',
      questions: [{ question: 'What are the two main criticisms of universal basic income raised in the text?', options: ['[[UBI may reduce work incentives and lower labour market participation, and targeted welfare systems may serve vulnerable populations more efficiently.|La RBU puede reducir los incentivos para trabajar y disminuir la participación en el mercado laboral, y los sistemas de bienestar dirigidos pueden servir a las poblaciones vulnerables de manera más eficiente.]]', '[[UBI would require dismantling all existing welfare programmes and would create excessive bureaucracy, making it administratively unworkable in practice.|La RBU requeriría desmantelar todos los programas de bienestar existentes y crearía una burocracia excesiva, lo que la haría administrativamente inviable en la práctica.]]', '[[UBI would only benefit low-income workers and would have no meaningful impact on middle-class households, limiting its effectiveness as a policy tool for reducing inequality.|La RBU solo beneficiaría a los trabajadores de bajos ingresos y no tendría ningún impacto significativo en los hogares de clase media.]]'], correctAnswer: 0, explanation: 'The text raises two criticisms: (1) reduced work incentives and lower labour participation; (2) targeted welfare systems are more efficient for the most vulnerable.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u36-r2', type: 'reading', level: 'C1', topic: 'economy-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Future of Work|El futuro del trabajo]]', instructions: 'Read and answer.',
      passage: 'The World Economic Forum\'s Future of Jobs Report projects that the occupational landscape will be significantly reshaped by 2030. It is estimated that roles in data analysis, artificial intelligence, cybersecurity and green energy transition will expand substantially, generating millions of new positions globally. Roles in administrative processing, routine manufacturing and basic financial services, by contrast, are bound to contract as automation renders them redundant. It seems, therefore, that the transition will not produce net unemployment — provided that workers are able to acquire the skills demanded by emerging sectors. Governments, employers and educational institutions will need to stop treating lifelong learning as an optional extra and go on to embed it as a core component of economic policy if they are to avoid significant structural dislocation.',
      questions: [{ question: 'What condition does the text identify as necessary for automation not to produce net unemployment?', options: ['[[Workers must be able to acquire the skills required by the emerging sectors that automation creates, requiring lifelong learning to become a core policy priority.|Los trabajadores deben ser capaces de adquirir las habilidades requeridas por los sectores emergentes que crea la automatización, lo que requiere que el aprendizaje permanente se convierta en una prioridad política central.]]', '[[Governments must ban automation in sectors where job losses are projected to exceed job creation, protecting employment in manufacturing and financial services.|Los gobiernos deben prohibir la automatización en los sectores donde se proyecta que las pérdidas de empleo superen la creación de empleo.]]', '[[Net unemployment will be avoided automatically because economic growth always generates sufficient new roles to replace any positions eliminated by technological change.|El desempleo neto se evitará automáticamente porque el crecimiento económico siempre genera suficientes nuevos puestos para reemplazar los eliminados por el cambio tecnológico.]]'], correctAnswer: 0, explanation: 'The text says "provided that workers are able to acquire the skills demanded by emerging sectors" and calls for lifelong learning to be "a core component of economic policy".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u36-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'economy-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (The Economy and Society), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u36-l1', type: 'listening', level: 'C1', topic: 'economy-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[An Economic Policy Debate|Un debate de política económica]]', instructions: 'Read the transcript and answer.',
      passage: 'Host: Is austerity or investment the right response to a post-recession deficit? | Economist A: It is now well-established that the austerity measures applied in many European economies after 2010 significantly worsened outcomes. Owing to the sharp reduction in public investment, growth stalled precisely when economies needed stimulus most. Consequently, the debt-to-GDP ratios that austerity was supposed to reduce actually increased in several cases. | Economist B: That analysis is too simplistic. As long as deficits are structural rather than cyclical, borrowing to invest simply means passing the problem to future generations. Provided that investment is genuinely productive, I am not opposed to it — but governments have a poor track record in identifying productive investments, and we had better not pretend otherwise.',
      questions: [{ question: 'What is Economist B\'s qualified position on investment spending?', options: ['[[Economist B accepts investment spending only when it is genuinely productive, while warning that governments have historically struggled to identify productive investments reliably.|El economista B acepta el gasto en inversión solo cuando es genuinamente productivo, al tiempo que advierte que los gobiernos históricamente han tenido dificultades para identificar inversiones productivas de manera fiable.]]', '[[Economist B fully endorses all forms of deficit-financed investment as the optimal response to post-recession economic conditions, regardless of the government\'s capacity to allocate capital productively.|El economista B respalda plenamente todas las formas de inversión financiada con déficit como la respuesta óptima a las condiciones económicas post-recesión.]]', '[[Economist B argues that structural deficits and cyclical deficits should be treated identically because the distinction has no practical relevance to fiscal policy.|El economista B argumenta que los déficits estructurales y los cíclicos deben tratarse de manera idéntica porque la distinción no tiene relevancia práctica para la política fiscal.]]'], correctAnswer: 0, explanation: 'Economist B says "provided that investment is genuinely productive, I am not opposed" but adds that "governments have a poor track record in identifying productive investments".' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u36-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'economy-listening',
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
    id: 'c1-u36-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'economy-listening',
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
    id: 'c1-u36-w1', type: 'writing', level: 'C1', topic: 'economy-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Module 6 Integrated Writing|Escritura integrada del módulo 6]]', instructions: 'Which response integrates Module 6 structures most effectively in formal economic writing?',
      questions: [{ question: 'Task: Write two sentences on income inequality and economic policy, using Module 6 structures.', options: ['[[It is widely accepted that sustained income inequality ultimately undermines productivity by suppressing human capital development among lower-income groups; consequently, governments that continue to prioritise flat-tax structures over progressive redistribution are bound to exacerbate the structural inequalities they are supposed to be addressing. Provided that fiscal reform is accompanied by meaningful investment in education, healthcare and social mobility infrastructure, the evidence suggests that reducing inequality and maintaining economic dynamism need not be treated as mutually exclusive goals.|Se acepta ampliamente que la desigualdad de ingresos sostenida socava en última instancia la productividad al suprimir el desarrollo del capital humano entre los grupos de ingresos más bajos; consecuentemente, los gobiernos que continúan priorizando estructuras fiscales planas sobre la redistribución progresiva están destinados a exacerbar las desigualdades estructurales. Siempre que la reforma fiscal vaya acompañada de una inversión significativa en educación, sanidad e infraestructura de movilidad social, la evidencia sugiere que reducir la desigualdad y mantener el dinamismo económico no tienen por qué tratarse como objetivos mutuamente excluyentes.]]', '[[Income inequality is a big problem because rich people have too much money and poor people do not have enough. The government should tax rich people more and give money to poor people. This would make society fairer and help the economy.|La desigualdad de ingresos es un gran problema porque los ricos tienen demasiado dinero y los pobres no tienen suficiente. El gobierno debería gravar más a los ricos.]]', '[[It is accepted that income inequality is a problem. Therefore, governments need to do more redistribution as long as this does not affect economic growth too much. They had better think carefully before they do this because it is complicated.|Se acepta que la desigualdad de ingresos es un problema. Por lo tanto, los gobiernos necesitan hacer más redistribución siempre que esto no afecte demasiado al crecimiento económico.]]'], correctAnswer: 0, explanation: 'Option A integrates "It is widely accepted that" (it-structure), "consequently" (result), "are bound to" and "are supposed to" (modals), "provided that" (conditional) — all Module 6 structures in precise formal register.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u36-w2',
    type: 'writing',
    level: 'C1',
    topic: 'economy-writing',
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
    id: 'c1-u36-w3',
    type: 'writing',
    level: 'C1',
    topic: 'economy-writing',
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
