/**
 * C1 Unit 46 — War, Conflict and Peacekeeping
 * Module 8: Global Issues
 * Grammar: Advanced adverbial clauses (time, purpose, result, concessive: so that / such…that / lest / in order that)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'War, Conflict and Peacekeeping';

export const UNIT_46_EXERCISES: Exercise[] = [
{
    id: 'c1-u46-g1', type: 'multiple-choice', level: 'C1', topic: 'adverbial-clauses', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Purpose Clauses: So that / In order that|Cláusulas de propósito: para que / a fin de que]]', instructions: 'Choose the sentence with the correct purpose clause.',
      questions: [{ question: 'Which sentence uses a purpose adverbial clause correctly in a formal register?', options: ['[[Peacekeeping forces were deployed to the region in order that hostilities between the two factions might be contained before the fragile ceasefire agreement collapsed entirely, giving diplomats sufficient time to broker a more durable political settlement.|Se desplegaron fuerzas de mantenimiento de la paz en la región a fin de que las hostilidades entre las dos facciones pudieran contenerse antes de que el frágil acuerdo de alto el fuego colapsara por completo, dando a los diplomáticos suficiente tiempo para mediar en un acuerdo político más duradero.]]', '[[Peacekeeping forces were deployed to the region so that hostilities might contain between the two factions before the ceasefire collapsed, in order diplomats given sufficient time.|Se desplegaron fuerzas de mantenimiento de la paz en la región para que las hostilidades puedan contenerse entre las dos facciones antes de que el alto el fuego colapse.]]', '[[Peacekeeping forces were deployed to the region so hostilities to be contained between the two factions before the fragile ceasefire collapsed, so that giving diplomats time for a settlement.|Se desplegaron fuerzas de mantenimiento de la paz en la región para que las hostilidades sean contenidas entre las dos facciones antes de que el frágil alto el fuego colapse.]]'], correctAnswer: 0, explanation: '"In order that + subject + modal (might/could/should) + infinitive" = formal purpose clause. "So that" also correct with same structure. Option B has wrong word order. Option C uses "so hostilities to be" — ungrammatical.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u46-g2', type: 'fill-blank', level: 'C1', topic: 'adverbial-clauses', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Such…That / So…That (Result)|Tan…que / De tal manera que (resultado)]]', instructions: 'Complete with the correct result structure.',
      questions: [{ question: 'The destruction of civilian infrastructure in the besieged city was _______ that international aid organisations were unable to operate effectively within the conflict zone, forcing the evacuation of medical and humanitarian personnel.', options: ['[[such|tal]]', '[[very|muy]]', '[[so much|tanto]]'], correctAnswer: 'such', acceptableAnswers: ['such'], explanation: '"Such + noun phrase + that + result clause" = formal result structure. "Such was the destruction that…" or "The destruction was such that…" are both correct. "Very" does not introduce a result clause. "So much" requires a different sentence structure.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u46-g3', type: 'multiple-choice', level: 'C1', topic: 'adverbial-clauses', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Lest / For Fear That|Por temor a que]]', instructions: 'Choose the correct use of "lest" in a formal context.',
      questions: [{ question: 'Which sentence correctly uses "lest" as a formal negative purpose connector?', options: ['[[States party to international arms control agreements are required to submit regular compliance reports lest their failure to do so be interpreted as evidence of non-compliance and trigger an investigation by the treaty monitoring body.|Los estados partes en los acuerdos internacionales de control de armamentos deben presentar informes periódicos de cumplimiento no sea que su omisión sea interpretada como evidencia de incumplimiento y desencadene una investigación.]]', '[[States party to international arms control agreements are required to submit regular compliance reports lest they fail so this is not interpreted as non-compliance, triggering an investigation.|Los estados partes deben presentar informes periódicos de cumplimiento no sea que fallen para que esto no sea interpretado como incumplimiento, desencadenando una investigación.]]', '[[States party to international arms control agreements are required to submit regular compliance reports unless lest their failure triggers an investigation by the treaty monitoring body.|Los estados partes deben presentar informes periódicos de cumplimiento a menos que no sea que su omisión desencadene una investigación del órgano de seguimiento del tratado.]]'], correctAnswer: 0, explanation: '"Lest + subject + bare infinitive/should + infinitive" = formal negative purpose clause meaning "for fear that". Option A correctly uses "lest…be" (subjunctive). "Unless lest" is redundant and ungrammatical.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u46-v1', type: 'multiple-choice', level: 'C1', topic: 'conflict-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Conflict and Peacebuilding|Conflicto y construcción de paz]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The process of rebuilding political institutions, the rule of law and social cohesion in a society that has emerged from prolonged armed conflict — designed to address the root causes of the violence and prevent recurrence — is known as _______.', options: ['[[post-conflict reconstruction|reconstrucción post-conflicto]]', '[[deterrence|disuasión]]', '[[containment|contención]]'], correctAnswer: 0, explanation: '"Post-conflict reconstruction" = the comprehensive process of rebuilding political, economic and social systems. "Deterrence" = preventing conflict through threat of retaliation. "Containment" = limiting the spread of a conflict or ideology.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u46-v2', type: 'fill-blank', level: 'C1', topic: 'conflict-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[International Humanitarian Law|Derecho internacional humanitario]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The body of law that governs the conduct of armed conflict and seeks to limit its humanitarian impact — including the Geneva Conventions and their Additional Protocols — is collectively known as International _______ Law (IHL).', options: ['[[Humanitarian|Humanitario]]', '[[Criminal|Penal]]', '[[Trade|Comercial]]'], correctAnswer: 'Humanitarian', acceptableAnswers: ['Humanitarian'], explanation: '"International Humanitarian Law" (IHL) = also called the law of armed conflict or the law of war. Governs how wars may be fought (jus in bello), as distinct from jus ad bellum (the right to go to war).' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u46-v3', type: 'multiple-choice', level: 'C1', topic: 'conflict-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Peace Processes|Procesos de paz]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The process by which former combatants lay down their weapons, leave armed groups and return to civilian life — typically accompanied by psychological support, skills training and economic reintegration assistance — is known as _______.', options: ['[[disarmament, demobilisation and reintegration (DDR)|desarme, desmovilización y reintegración (DDR)]]', '[[transitional justice|justicia transicional]]', '[[peacekeeping|mantenimiento de la paz]]'], correctAnswer: 0, explanation: '"DDR" = Disarmament, Demobilisation and Reintegration — a core component of post-conflict peacebuilding. "Transitional justice" = mechanisms addressing past atrocities (truth commissions, trials). "Peacekeeping" = deployment of forces to monitor ceasefire agreements.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u46-r1', type: 'reading', level: 'C1', topic: 'conflict-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Limits of Humanitarian Intervention|Los límites de la intervención humanitaria]]', instructions: 'Read and answer.',
      passage: 'The concept of humanitarian intervention — the use of military force by external actors so that civilian populations can be protected from mass atrocities — occupies deeply contested terrain in international law and political theory. Proponents argue that the principle of sovereignty cannot function as an absolute shield behind which governments may commit atrocities against their own citizens, and that the international community has both the right and the responsibility to intervene in such circumstances. Critics, by contrast, contend that the doctrine has been applied selectively — determined more by the strategic interests of powerful intervening states than by the severity of the humanitarian emergency — and that military intervention, even when well-intentioned, frequently destabilises states further, such that the harm caused by intervention may exceed the harm it sought to prevent. The experience of Libya following the 2011 NATO intervention is frequently cited lest advocates of humanitarian intervention overlook the unintended consequences of removing authoritarian regimes without credible post-conflict governance plans.',
      questions: [{ question: 'What is the critics\' argument against humanitarian intervention?', options: ['[[It has been applied selectively based on the strategic interests of powerful states rather than humanitarian need, and military intervention frequently destabilises states such that the harm caused may exceed the harm it sought to prevent.|Se ha aplicado de manera selectiva basándose en los intereses estratégicos de los estados poderosos más que en la necesidad humanitaria, y la intervención militar frecuentemente desestabiliza los estados de tal manera que el daño causado puede superar el daño que buscaba prevenir.]]', '[[Critics argue that humanitarian intervention is always wrong because it violates state sovereignty — an absolute principle of international law — regardless of the severity of human rights violations occurring within a state\'s borders.|Los críticos argumentan que la intervención humanitaria siempre está mal porque viola la soberanía estatal, un principio absoluto del derecho internacional.]]', '[[The main criticism is that powerful states are insufficiently willing to intervene militarily in cases of mass atrocity, and that international organisations should remove legal barriers that currently prevent timely humanitarian intervention.|La crítica principal es que los estados poderosos no están suficientemente dispuestos a intervenir militarmente en casos de atrocidades masivas.]]'], correctAnswer: 0, explanation: 'The text says critics contend it "has been applied selectively…determined more by strategic interests…than by the severity of the humanitarian emergency" and that intervention "frequently destabilises states further, such that the harm caused may exceed the harm it sought to prevent".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u46-r2', type: 'reading', level: 'C1', topic: 'conflict-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Asymmetric Warfare|Guerra asimétrica]]', instructions: 'Read and answer.',
      passage: 'Contemporary armed conflict increasingly takes forms that challenge the legal frameworks designed to regulate it. Whereas traditional interstate warfare was conducted between uniformed armies with identifiable command structures, the majority of today\'s conflicts are asymmetric: they involve state militaries confronting non-state armed groups — insurgencies, terrorist organisations and militias — that operate within civilian populations, often in order that the laws of war protecting those civilians become a strategic liability for the more powerful party. Such was the legal and ethical complexity generated by the "war on terror" that traditional categories of combatant and civilian became, in practice, deeply ambiguous, raising fundamental questions about the application of international humanitarian law to drone strikes, targeted killings and indefinite detention without trial. International legal scholars have argued that existing frameworks need urgent revision so that they can address the realities of twenty-first century conflict without either abandoning core humanitarian protections or rendering military operations legally impossible.',
      questions: [{ question: 'Why does the text say non-state armed groups operate within civilian populations?', options: ['[[In order that the laws of war protecting civilians become a strategic liability for the more powerful (state) party — making it harder for state forces to operate without risking violations of international humanitarian law.|A fin de que las leyes de la guerra que protegen a los civiles se conviertan en una responsabilidad estratégica para el partido más poderoso (estatal), dificultando que las fuerzas estatales operen sin arriesgarse a violar el derecho internacional humanitario.]]', '[[Because civilian areas provide better defensive cover and logistical support, allowing non-state groups to resupply and recruit more efficiently than would be possible in purely military contexts.|Porque las zonas civiles proporcionan mejor cobertura defensiva y apoyo logístico, permitiendo a los grupos no estatales reabastecerse y reclutar de manera más eficiente.]]', '[[Non-state groups operate within civilian populations primarily to generate international media attention and political sympathy for their cause by exposing the civilian harm caused by state military operations.|Los grupos no estatales operan dentro de las poblaciones civiles principalmente para generar atención mediática internacional y simpatía política por su causa.]]'], correctAnswer: 0, explanation: 'The text says they operate within civilian populations "in order that the laws of war protecting those civilians become a strategic liability for the more powerful party".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u46-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'conflict-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (War, Conflict and Peacekeeping), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u46-l1', type: 'listening', level: 'C1', topic: 'conflict-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Security Studies Lecture|Una conferencia de estudios de seguridad]]', instructions: 'Read the transcript and answer.',
      passage: 'Lecturer: Today I want to discuss why peace agreements fail. Historically, peace deals have been concluded so that fighting stops in the short term, but such has been the inadequacy of implementation mechanisms that a significant proportion collapse within five years. The root causes of this failure are structural. By the time external mediators exit the scene, the deep grievances — over land, power and resources — that fuelled the conflict remain unaddressed. Parties sign agreements lest they lose international support, but without genuine commitment to the political compromises required. In order that a peace agreement endures, it must resolve the underlying political economy of the conflict: who controls resources, who has access to state institutions and how security forces are reformed and made accountable. Student: What is the single most important factor? Lecturer: Such is the complexity of post-conflict environments that no single factor determines success. But if I were to identify one, it would be the quality of local ownership — the degree to which the agreement is seen as legitimate by the populations affected, rather than as something imposed from outside in order that external actors can declare the mission accomplished.',
      questions: [{ question: 'What does the lecturer identify as a key reason many peace agreements fail?', options: ['[[Parties sign lest they lose international support but without genuine commitment, and implementation mechanisms are inadequate; deep underlying grievances over land, power and resources remain unaddressed by the time mediators leave.|Los partidos firman por temor a perder el apoyo internacional pero sin compromiso genuino, y los mecanismos de implementación son inadecuados; las profundas quejas subyacentes sobre tierra, poder y recursos siguen sin abordarse.]]', '[[The lecturer argues that peace agreements fail primarily because international mediators lack the military capacity to enforce implementation once they have withdrawn from the region.|El conferenciante argumenta que los acuerdos de paz fracasan principalmente porque los mediadores internacionales carecen de la capacidad militar para hacer cumplir la implementación.]]', '[[Peace agreements fail because they are typically negotiated too quickly, before the warring parties have exhausted their military options and concluded that continued fighting is no longer in their interest.|Los acuerdos de paz fracasan porque generalmente se negocian demasiado rápido, antes de que las partes beligerantes hayan agotado sus opciones militares.]]'], correctAnswer: 0, explanation: 'The lecturer says parties "sign agreements lest they lose international support, but without genuine commitment" and that "implementation mechanisms" are inadequate, leaving deep grievances over land, power and resources unresolved.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u46-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'conflict-listening',
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
    id: 'c1-u46-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'conflict-listening',
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
    id: 'c1-u46-w1', type: 'writing', level: 'C1', topic: 'conflict-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Advanced Adverbial Clauses in Academic Writing|Cláusulas adverbiales avanzadas en escritura académica]]', instructions: 'Which response uses advanced adverbial clauses most effectively?',
      questions: [{ question: 'Task: Write two sentences arguing that conflict prevention is more effective than military intervention.', options: ['[[Preventive diplomacy and early warning systems were developed so that conflicts could be contained before they escalated to the point of requiring military force; such has been the failure to invest adequately in these mechanisms that the international community has repeatedly found itself responding to humanitarian emergencies that a fraction of the cost, deployed earlier, might have prevented entirely.|La diplomacia preventiva y los sistemas de alerta temprana se desarrollaron para que los conflictos pudieran contenerse antes de escalar al punto de requerir fuerza militar; tan grande ha sido el fracaso en invertir adecuadamente en estos mecanismos que la comunidad internacional se ha encontrado repetidamente respondiendo a emergencias humanitarias que una fracción del coste, desplegado antes, podría haber prevenido por completo.]]', '[[Conflict prevention is better than military intervention. So that we can avoid wars, we need to invest in diplomacy. Such is the problem that it is very difficult to solve without spending a lot of money on prevention efforts.|La prevención de conflictos es mejor que la intervención militar. Para que podamos evitar guerras, necesitamos invertir en diplomacia.]]', '[[Military intervention is expensive and dangerous. In order to prevent conflicts, we should use diplomacy. Such a waste of resources occurs when wars could have been prevented by investing in early warning systems and dialogue.|La intervención militar es costosa y peligrosa. Para prevenir conflictos, deberíamos usar la diplomacia.]]'], correctAnswer: 0, explanation: 'Option A uses "so that…could" (purpose clause) and "Such has been the failure…that" (result clause with inversion) — two distinct advanced adverbial structures in formal academic prose.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u46-w2',
    type: 'writing',
    level: 'C1',
    topic: 'conflict-writing',
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
    id: 'c1-u46-w3',
    type: 'writing',
    level: 'C1',
    topic: 'conflict-writing',
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
