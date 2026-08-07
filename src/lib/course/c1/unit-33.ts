/**
 * C1 Unit 33 — Entrepreneurship and Innovation
 * Module 6: Work and Economy
 * Grammar: Business conditionals (Provided that / On condition that / Unless / As long as / In the event that)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Entrepreneurship and Innovation';

export const UNIT_33_EXERCISES: Exercise[] = [
{
    id: 'c1-u33-g1', type: 'multiple-choice', level: 'C1', topic: 'business-conditionals', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Business Conditionals|Condicionales de negocios]]', instructions: 'Choose the most appropriate conditional for a formal contract clause.',
      questions: [{ question: 'Which sentence uses a formal conditional connector correctly in a business context?', options: ['[[The licensing agreement will be renewed automatically, provided that the licensee maintains full compliance with the agreed performance benchmarks and submits a verified annual report by the stipulated deadline.|El acuerdo de licencia se renovará automáticamente, siempre y cuando el licenciatario mantenga el pleno cumplimiento de los indicadores de rendimiento acordados y envíe un informe anual verificado antes del plazo estipulado.]]', '[[The licensing agreement will be renewed automatically, providing the licensee maintains full compliance with the agreed performance benchmarks and submits an annual report by the deadline.|El acuerdo de licencia se renovará automáticamente, siempre que el licenciatario mantenga el pleno cumplimiento de los indicadores de rendimiento acordados.]]', '[[The licensing agreement will be renewed automatically, if the licensee keeps full compliance with the agreed performance benchmarks and submits an annual report by the deadline.|El acuerdo de licencia se renovará automáticamente si el licenciatario mantiene el pleno cumplimiento de los indicadores de rendimiento acordados.]]'], correctAnswer: 0, explanation: '"Provided that + clause" = formal conditional requiring a specific condition. It is more restrictive and legalistic than "if". "Providing" is informal; "provided that" is the standard formal/contractual form.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u33-g2', type: 'fill-blank', level: 'C1', topic: 'business-conditionals', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Unless / As long as|A menos que / Siempre que]]', instructions: 'Complete the sentence with the correct conditional connector.',
      questions: [{ question: 'The board will approve the proposed acquisition _______ the due diligence process reveals no material undisclosed liabilities or regulatory violations in the target company.', options: ['[[as long as|siempre que]]', '[[unless|a menos que]]', '[[although|aunque]]'], correctAnswer: 'as long as', acceptableAnswers: ['as long as', 'provided that', 'on condition that', 'provided'], explanation: '"As long as" = positive conditional — expresses that approval will follow IF the condition is met. "Unless" = negative conditional — would mean approval unless liabilities ARE found, which changes the meaning.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u33-g3', type: 'multiple-choice', level: 'C1', topic: 'business-conditionals', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[In the event that|En caso de que]]', instructions: 'Choose the sentence using "in the event that" correctly.',
      questions: [{ question: 'Which sentence uses "in the event that" correctly in a business context?', options: ['[[In the event that the contractor fails to deliver the agreed milestones within the specified timeframe, the client reserves the right to terminate the agreement without further liability and seek alternative suppliers.|En caso de que el contratista no entregue los hitos acordados dentro del plazo especificado, el cliente se reserva el derecho de rescindir el acuerdo sin responsabilidad adicional y buscar proveedores alternativos.]]', '[[In the event that the contractor fails to deliver milestones, the client can terminate it, unless they do not want to seek other suppliers at that point in the process.|En caso de que el contratista no entregue los hitos, el cliente puede rescindirlo, a menos que no quiera buscar otros proveedores.]]', '[[The client will terminate the agreement, and in the event that happens, the contractor failed to deliver the agreed milestones within the timeframe.|El cliente rescindirá el acuerdo, y en el caso de que eso ocurra, el contratista no entregó los hitos acordados dentro del plazo.]]'], correctAnswer: 0, explanation: '"In the event that + clause" = formal conditional used in contracts to specify consequences for hypothetical scenarios. It is equivalent to "if" but more formal and legalistic.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u33-v1', type: 'multiple-choice', level: 'C1', topic: 'entrepreneurship-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Start-ups and Investment|Start-ups e inversión]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The initial investment round in which early-stage investors — typically friends, family or angel investors — provide capital to help a start-up move from concept to prototype is known as _______ funding.', options: ['[[seed|semilla / inicial]]', '[[series A|serie A]]', '[[venture|riesgo]]'], correctAnswer: 0, explanation: '"Seed funding" = the earliest investment stage, used to develop the initial concept. "Series A" = first major institutional funding after proof of concept. "Venture capital" is a broader category of risk investment.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u33-v2', type: 'fill-blank', level: 'C1', topic: 'entrepreneurship-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Business Models|Modelos de negocio]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The platform charges a small commission on each transaction between buyers and sellers, generating revenue through volume rather than fixed pricing — a business model known as the _______ model.', options: ['[[marketplace|mercado / plataforma]]', '[[franchise|franquicia]]', '[[subscription|suscripción]]'], correctAnswer: 'marketplace', acceptableAnswers: ['marketplace', 'platform'], explanation: '"Marketplace model" = a platform connecting buyers and sellers and taking a commission per transaction. "Subscription" = recurring fixed payment. "Franchise" = licensing of business model to third parties.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u33-v3', type: 'multiple-choice', level: 'C1', topic: 'entrepreneurship-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Innovation|Innovación]]', instructions: 'Choose the correct collocation.',
      questions: [{ question: 'The emergence of digital streaming platforms represented a _______ innovation — one that fundamentally altered market structures, displaced established incumbents and created entirely new consumer behaviours.', options: ['[[disruptive|disruptiva]]', '[[incremental|incremental]]', '[[sustainable|sostenible]]'], correctAnswer: 0, explanation: '"Disruptive innovation" (Christensen) = an innovation that displaces established products and reshapes markets. "Incremental innovation" = gradual improvement of existing products. "Sustainable innovation" is not a standard industry term here.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u33-r1', type: 'reading', level: 'C1', topic: 'entrepreneurship-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Start-up Failure Rates|Tasas de fracaso de start-ups]]', instructions: 'Read and answer.',
      passage: 'Research consistently demonstrates that the majority of start-up ventures fail within their first five years of operation. Provided that we define failure as the involuntary cessation of business activity — as opposed to strategic exits or acquisitions — the failure rate across most sectors hovers between sixty and ninety per cent. As long as founders understand this landscape, the data need not be read as discouragement; rather, it illuminates the conditions most strongly associated with success. Studies identify several recurring factors: market timing, team composition, product-market fit and access to sustained capital. On condition that these variables are managed effectively, the probability of survival increases substantially. In the event that any of these critical dimensions is neglected, even well-funded ventures with strong early traction can lose competitive momentum rapidly.',
      questions: [{ question: 'What does the text suggest about the factors behind start-up success?', options: ['[[Effectively managing market timing, team composition, product-market fit and sustained capital substantially increases a start-up\'s chances of survival.|Gestionar eficazmente el momento del mercado, la composición del equipo, el ajuste producto-mercado y el capital sostenido aumenta sustancialmente las posibilidades de supervivencia de una start-up.]]', '[[Access to large amounts of capital is the single most decisive factor in determining whether a start-up succeeds or fails in competitive markets.|El acceso a grandes cantidades de capital es el único factor más determinante para determinar si una start-up tiene éxito o fracasa en mercados competitivos.]]', '[[Start-up failure rates are so high that founding a new business is economically irrational and should be discouraged by governments and educators.|Las tasas de fracaso de las start-ups son tan altas que fundar un nuevo negocio es económicamente irracional y debería ser desaconsejado por los gobiernos y los educadores.]]'], correctAnswer: 0, explanation: 'The text identifies four factors (market timing, team, product-market fit, capital) and states that managing them effectively "increases survival substantially".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u33-r2', type: 'reading', level: 'C1', topic: 'entrepreneurship-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Innovation Ecosystems|Ecosistemas de innovación]]', instructions: 'Read and answer.',
      passage: 'The emergence of Silicon Valley as the world\'s pre-eminent innovation ecosystem was not accidental but the product of a specific convergence of conditions: proximity to Stanford and Berkeley, a permissive regulatory environment, deep pools of venture capital, and a cultural tolerance for failure that encouraged risk-taking. Unless similar structural conditions are replicated — or at least approximated — efforts to create comparable ecosystems elsewhere are likely to yield modest results. Governments seeking to foster innovation hubs must, as long as they remain committed to genuine economic transformation rather than cosmetic policy, invest over long time horizons and resist the temptation to prioritise short-term commercial returns over foundational research capacity.',
      questions: [{ question: 'What does the author argue is necessary for governments trying to build innovation ecosystems?', options: ['[[Governments must commit to long-term investment and foundational research, rather than prioritising short-term commercial returns, if they want genuine results.|Los gobiernos deben comprometerse con la inversión a largo plazo y la investigación fundamental, en lugar de priorizar los rendimientos comerciales a corto plazo, si quieren resultados genuinos.]]', '[[Governments should replicate every element of the Silicon Valley model identically, including its cultural norms and tax structures, to ensure comparable results.|Los gobiernos deben replicar todos los elementos del modelo Silicon Valley de forma idéntica, incluidas sus normas culturales y estructuras fiscales, para garantizar resultados comparables.]]', '[[Governments cannot create innovation ecosystems under any circumstances because the conditions that produced Silicon Valley were entirely accidental and cannot be reproduced.|Los gobiernos no pueden crear ecosistemas de innovación bajo ninguna circunstancia porque las condiciones que produjeron Silicon Valley fueron completamente accidentales.]]'], correctAnswer: 0, explanation: 'The text argues governments must invest long-term and resist short-term commercial pressure — conditional on genuine commitment to transformation.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u33-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'entrepreneurship-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Entrepreneurship and Innovation), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u33-l1', type: 'listening', level: 'C1', topic: 'entrepreneurship-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Negotiation Scenario|Un escenario de negociación]]', instructions: 'Read the transcript and answer.',
      passage: 'Supplier: We can offer the revised pricing structure, on condition that the order volume is guaranteed at a minimum of five thousand units per quarter for the duration of the contract. | Buyer: That is a significant commitment. We could consider it, provided that the quality assurance protocols are independently verified and the delivery lead times are reduced from sixty days to forty-five. | Supplier: Forty-five days is achievable as long as your purchase orders are submitted with a minimum of three weeks\' advance notice. In the event that orders arrive with shorter notice, we would need to revert to the standard sixty-day lead time. | Buyer: That seems workable. Unless our projections change significantly, we should be able to meet both conditions.',
      questions: [{ question: 'What is the buyer\'s key condition for accepting the supplier\'s volume commitment?', options: ['[[The buyer requires independent verification of quality assurance and a reduction in delivery lead times from sixty to forty-five days.|El comprador requiere una verificación independiente del control de calidad y una reducción en los plazos de entrega de sesenta a cuarenta y cinco días.]]', '[[The buyer requires that the minimum order volume be reduced from five thousand to two thousand units per quarter before agreeing.|El comprador requiere que el volumen mínimo de pedido se reduzca de cinco mil a dos mil unidades por trimestre antes de aceptar.]]', '[[The buyer has no specific conditions and is prepared to accept the supplier\'s original proposal without modification.|El comprador no tiene condiciones específicas y está dispuesto a aceptar la propuesta original del proveedor sin modificaciones.]]'], correctAnswer: 0, explanation: 'The buyer says "provided that the quality assurance protocols are independently verified and the delivery lead times are reduced from sixty days to forty-five".' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u33-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'entrepreneurship-listening',
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
    id: 'c1-u33-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'entrepreneurship-listening',
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
    id: 'c1-u33-w1', type: 'writing', level: 'C1', topic: 'entrepreneurship-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Formal Business Email|Correo electrónico de negocios formal]]', instructions: 'Which response uses business conditionals most appropriately in a formal email?',
      questions: [{ question: 'Task: Write two sentences from a formal email proposing a partnership agreement.', options: ['[[We would be pleased to proceed with the proposed joint venture, on condition that both parties agree to appoint an independent auditor to oversee the project finances and submit quarterly performance reports. In the event that either party wishes to withdraw from the agreement, a minimum of ninety days\' written notice shall be required.|Estaríamos encantados de proceder con la empresa conjunta propuesta, con la condición de que ambas partes acuerden nombrar un auditor independiente para supervisar las finanzas del proyecto. En caso de que alguna de las partes desee retirarse del acuerdo, se requerirá un preaviso mínimo de noventa días.]]', '[[We want to do the joint venture together if you agree to have an auditor and send reports every three months. If you want to leave, please tell us ninety days before you go so we have time to prepare.|Queremos hacer la empresa conjunta juntos si acuerdan tener un auditor y enviar informes cada tres meses.]]', '[[We think the joint venture is a good idea and we are excited about it. We just need to sort out the money details and decide how to handle things if one of us wants to stop. Can we meet to discuss?|Creemos que la empresa conjunta es una buena idea y estamos entusiasmados con ella. Solo necesitamos resolver los detalles económicos y decidir cómo manejar las cosas si uno de nosotros quiere parar.]]'], correctAnswer: 0, explanation: 'Option A uses "on condition that" and "in the event that" correctly in formal legal-business register. Options B and C are informal and lack appropriate conditional precision.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u33-w2',
    type: 'writing',
    level: 'C1',
    topic: 'entrepreneurship-writing',
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
    id: 'c1-u33-w3',
    type: 'writing',
    level: 'C1',
    topic: 'entrepreneurship-writing',
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
