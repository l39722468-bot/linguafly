/**
 * C1 Unit 19 — Crime, Justice and Society
 * Module 4: Society, Law and Governance
 * Grammar: Relative clauses — non-defining, reduced, and complex forms
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Crime, Justice and Society';

export const UNIT_19_EXERCISES: Exercise[] = [
{
    id: 'c1-u19-g1', type: 'multiple-choice', level: 'C1', topic: 'relative-clauses', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Relative Clauses|Oraciones de relativo]]', instructions: 'Choose the sentence with the correct relative clause.',
      questions: [{ question: 'The judge sentenced the defendant to ten years. He had shown no remorse. Add a non-defining relative clause:', options: ['[[The judge sentenced the defendant, who had shown no remorse, to ten years in prison.|El juez condenó al acusado, que no había mostrado ningún arrepentimiento, a diez años de prisión.]]', '[[The judge sentenced the defendant that had shown no remorse to ten years in prison.|El juez condenó al acusado que no había mostrado ningún arrepentimiento a diez años de prisión.]]', '[[The judge sentenced the defendant, which had shown no remorse, to ten years in prison.|El juez condenó al acusado, el cual no había mostrado ningún arrepentimiento, a diez años de prisión.]]'], correctAnswer: 0, explanation: 'Non-defining relative clauses use "who" for people, separated by commas. "That" and "which" cannot be used in non-defining clauses for people.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u19-g2', type: 'fill-blank', level: 'C1', topic: 'relative-clauses', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Reduced Relative Clauses|Oraciones de relativo reducidas]]', instructions: 'Complete with a reduced relative clause.',
      questions: [{ question: 'The evidence _______ at the crime scene proved crucial to the investigation.', options: ['[[found|encontrada]]', '[[which was found|que fue encontrada]]', '[[that it was found|que fue encontrada]]'], correctAnswer: 'found', acceptableAnswers: ['found', 'discovered', 'collected'], explanation: 'Reduced relative clause: "found at the crime scene" = a past participle phrase replacing "which was found at the crime scene".' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u19-g3', type: 'multiple-choice', level: 'C1', topic: 'relative-clauses', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Relative Clauses with Prepositions|Oraciones de relativo con preposiciones]]', instructions: 'Choose the most formal correct option.',
      questions: [{ question: 'The legal principle concerns the right to a fair trial. The defendant is entitled to this right. Which is the most formal relative clause?', options: ['[[The legal principle, to which the defendant is entitled, concerns the right to a fair trial.|El principio jurídico, al que tiene derecho el acusado, se refiere al derecho a un juicio justo.]]', '[[The legal principle which the defendant is entitled to concerns the right to a fair trial.|El principio jurídico al que tiene derecho el acusado se refiere al derecho a un juicio justo.]]', '[[The legal principle that the defendant is entitled to concerns the right to a fair trial.|El principio jurídico al que tiene derecho el acusado se refiere al derecho a un juicio justo.]]'], correctAnswer: 0, explanation: 'In formal English, prepositions are placed before the relative pronoun: "to which" not "which… to". "To which" is more formal than "which… to".' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u19-v1', type: 'multiple-choice', level: 'C1', topic: 'justice-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Crime and Justice|Crimen y justicia]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'The lawyer argued that her client\'s confession was inadmissible because it had been obtained under _______ — psychological pressure applied over many hours without access to legal representation.', options: ['[[duress|coacción]]', '[[coercion|coerción]]', '[[intimidation|intimidación]]'], correctAnswer: 0, explanation: '"Under duress" = a specific legal term meaning forced to act under unlawful pressure or threat; renders agreements or confessions legally void.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u19-v2', type: 'fill-blank', level: 'C1', topic: 'justice-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Legal Terms|Términos legales]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The prosecution must prove the defendant\'s guilt _______ any reasonable doubt — the highest standard of proof in the criminal justice system.', options: ['[[beyond|más allá de]]', '[[above|por encima de]]', '[[without|sin]]'], correctAnswer: 'beyond', acceptableAnswers: ['beyond'], explanation: '"Beyond reasonable doubt" = the standard of proof required in criminal trials; prosecutors must eliminate all reasonable doubt of guilt.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u19-v3', type: 'multiple-choice', level: 'C1', topic: 'justice-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Crime and Society|Crimen y sociedad]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'Recidivism — the tendency of convicted offenders to reoffend after release — is often cited as evidence that the criminal justice system prioritises _______ over rehabilitation.', options: ['[[punishment|castigo]]', '[[deterrence|disuasión]]', '[[retribution|retribución]]'], correctAnswer: 2, explanation: '"Retribution" = punishment as repayment or revenge for wrongdoing; contrasted with "rehabilitation" (reforming offenders).' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u19-r1', type: 'reading-comprehension', level: 'C1', topic: 'crime-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Criminal Justice Reform|Reforma de la justicia penal]]', instructions: 'Read the extract and answer the question.',
      questions: [{ question: 'Text: "Restorative justice — an approach that brings together offenders, victims and communities to address the harm caused by crime — offers a compelling alternative to purely punitive models. Evidence suggests that, where applied appropriately, it produces higher levels of victim satisfaction, lower reoffending rates and a more meaningful sense of accountability than traditional sentencing."\n\nWhat does the text argue about restorative justice?', options: ['[[Restorative justice is the most effective approach in all cases and should replace the traditional criminal justice system entirely.|La justicia restaurativa es el enfoque más eficaz en todos los casos y debería reemplazar por completo el sistema de justicia penal tradicional.]]', '[[When used appropriately, restorative justice can produce better outcomes for victims and lower reoffending than punitive approaches alone.|Cuando se usa adecuadamente, la justicia restaurativa puede producir mejores resultados para las víctimas y menor reincidencia que los enfoques puramente punitivos.]]', '[[Restorative justice prioritises offender rehabilitation over victim welfare, which explains why it produces lower reoffending rates than traditional sentencing models.|La justicia restaurativa prioriza la rehabilitación del infractor sobre el bienestar de la víctima, lo que explica por qué produce tasas de reincidencia más bajas que los modelos de sentencia tradicionales.]]'], correctAnswer: 1, explanation: 'The text says "where applied appropriately" it produces better victim satisfaction and lower reoffending — a conditional, not absolute claim.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u19-r2', type: 'multiple-choice', level: 'C1', topic: 'crime-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Crime and Society|Crimen y sociedad]]', instructions: 'Choose the best answer.',
      questions: [{ question: 'Text: "White-collar crime — fraud, embezzlement, insider trading — causes vastly greater financial harm to society than street crime, yet attracts disproportionately lenient sentences. This asymmetry reflects not a neutral application of law but a class bias embedded in the justice system, which prosecutes the crimes of the poor with far more vigour than those of the powerful."\n\nWhat argument does the author make?', options: ['[[White-collar criminals are too clever to be caught, which explains why so few are prosecuted despite the enormous financial damage they cause to society and the economy.|Los delincuentes de cuello blanco son demasiado inteligentes para ser atrapados, lo que explica por qué tan pocos son procesados a pesar del enorme daño financiero que causan.]]', '[[The lighter treatment of white-collar crime compared to street crime reflects a structural class bias in the justice system rather than an objective assessment of harm.|El tratamiento más leve de los delitos de cuello blanco en comparación con los delitos callejeros refleja un sesgo de clase estructural en el sistema de justicia más que una evaluación objetiva del daño.]]', '[[White-collar crime should be prosecuted more seriously because it causes greater harm, but the complexity of financial crime makes investigation and prosecution practically very difficult.|El crimen de cuello blanco debería perseguirse más seriamente porque causa mayor daño, pero la complejidad del crimen financiero hace que la investigación y el procesamiento sean prácticamente muy difíciles.]]'], correctAnswer: 1, explanation: 'The author explicitly calls the asymmetry "not a neutral application of law but a class bias" — structural inequality in the justice system.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u19-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'crime-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Crime, Justice and Society), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u19-l1', type: 'listening-comprehension', level: 'C1', topic: 'crime-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Justice Debate|Debate sobre justicia]]', instructions: 'Listen and choose the correct answer.',
      questions: [{ question: 'A criminologist says: "The persistence of high crime rates in certain postcodes is not primarily a story about individual moral failure — it is a story about concentrated disadvantage, about communities systematically denied the educational, economic and social resources that make law-abiding life a viable choice."\n\nWhat does the criminologist argue?', options: ['[[Crime rates vary between neighbourhoods primarily because of individual moral choices rather than any structural or social factors in those communities.|Las tasas de delincuencia varían entre vecindarios principalmente debido a las elecciones morales individuales más que a cualquier factor estructural o social en esas comunidades.]]', '[[High crime in certain areas reflects systemic deprivation of resources rather than simply individual moral failures by the people who live there.|La alta delincuencia en ciertas áreas refleja privación sistémica de recursos más que simplemente fracasos morales individuales de las personas que viven allí.]]', '[[Communities with high crime rates require more policing and stricter sentencing policies to address the individual choices that drive criminal behaviour.|Las comunidades con altas tasas de delincuencia requieren más vigilancia policial y políticas de sentencia más estrictas para abordar las elecciones individuales que impulsan el comportamiento criminal.]]'], correctAnswer: 1, explanation: 'The criminologist rejects "individual moral failure" in favour of "concentrated disadvantage" — structural, not individual, causes.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u19-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'crime-listening',
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
    id: 'c1-u19-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'crime-listening',
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
    id: 'c1-u19-w1', type: 'multiple-choice', level: 'C1', topic: 'persuasive-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Persuasive Letter|Carta persuasiva]]', instructions: 'Choose the best paragraph for a formal letter arguing for criminal justice reform.',
      questions: [{ question: 'You are writing to a parliamentary committee arguing that prison overcrowding must be addressed. Choose the most effective paragraph:', options: ['[[The current state of our prison estate represents not merely a logistical failure but a moral and constitutional one. Overcrowding that prevents the delivery of rehabilitation programmes directly undermines the stated purpose of incarceration and, in doing so, creates the very conditions most likely to increase reoffending on release.|El estado actual de nuestras prisiones representa no solo un fracaso logístico sino uno moral y constitucional. El hacinamiento que impide la implementación de programas de rehabilitación socava directamente el propósito declarado del encarcelamiento y, al hacerlo, crea las condiciones más propensas a aumentar la reincidencia tras la liberación.]]', '[[Prison overcrowding is a very serious problem that needs to be solved. Prisons are too full and this means that prisoners cannot receive proper rehabilitation. The government needs to do something about this problem as soon as possible.|El hacinamiento carcelario es un problema muy serio que necesita resolverse. Las prisiones están demasiado llenas y esto significa que los presos no pueden recibir una rehabilitación adecuada. El gobierno necesita hacer algo al respecto lo antes posible.]]', '[[There are too many people in prison and this is causing many problems. Some prisoners are not getting the help they need and this means they might reoffend when they get out. More investment in prisons is needed immediately.|Hay demasiadas personas en prisión y esto está causando muchos problemas. Algunos presos no reciben la ayuda que necesitan y esto significa que podrían reincidir cuando salgan. Se necesita más inversión en prisiones de inmediato.]]'], correctAnswer: 0, explanation: 'Option A frames the issue as moral and constitutional (not just logistical), uses cause-effect reasoning, and employs sophisticated vocabulary in a formal register.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u19-w2',
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
    id: 'c1-u19-w3',
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
