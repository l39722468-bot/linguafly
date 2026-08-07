/**
 * C1 Unit 41 — Alternative Medicine and Treatment
 * Module 7: Health and Mind
 * Grammar: Passive with reporting verbs (It is claimed that… / He is believed to… / They are said to…)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Alternative Medicine and Treatment';

export const UNIT_41_EXERCISES: Exercise[] = [
{
    id: 'c1-u41-g1', type: 'multiple-choice', level: 'C1', topic: 'passive-reporting', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Passive with Reporting Verbs|Pasiva con verbos de reporte]]', instructions: 'Choose the sentence with the correct passive reporting structure.',
      questions: [{ question: 'Which sentence correctly uses a passive reporting verb structure?', options: ['[[Acupuncture is widely reported to alleviate chronic pain in a significant proportion of patients, though the neurobiological mechanisms underlying its efficacy remain a subject of ongoing scientific investigation.|Se informa ampliamente que la acupuntura alivia el dolor crónico en una proporción significativa de pacientes, aunque los mecanismos neurobiológicos subyacentes a su eficacia siguen siendo objeto de investigación científica en curso.]]', '[[Acupuncture is widely reported that it alleviates chronic pain in a significant proportion of patients, though the mechanisms underlying its efficacy remain scientifically contested.|Se informa ampliamente que la acupuntura alivia el dolor crónico en una proporción significativa de pacientes, aunque los mecanismos subyacentes a su eficacia siguen siendo científicamente controvertidos.]]', '[[Acupuncture widely reports to alleviate chronic pain in a significant proportion of patients, though the neurobiological mechanisms underlying its efficacy are subject to investigation.|La acupuntura informa ampliamente aliviar el dolor crónico en una proporción significativa de pacientes, aunque los mecanismos neurobiológicos subyacentes a su eficacia están sujetos a investigación.]]'], correctAnswer: 0, explanation: '"Subject + passive reporting verb + to infinitive" = correct structure (e.g., "is reported to alleviate"). "Is reported that it alleviates" incorrectly mixes the two patterns. "Widely reports to" is active — wrong.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u41-g2', type: 'fill-blank', level: 'C1', topic: 'passive-reporting', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[It is + Passive Reporting Verb + that|Se + verbo de reporte en pasiva + que]]', instructions: 'Complete with the correct passive reporting structure.',
      questions: [{ question: '_______ that the placebo effect accounts for a substantial portion of the therapeutic benefit attributed to many complementary medicine practices, making rigorous double-blind trial design essential for evaluating their true efficacy.', options: ['[[It is widely believed|Se cree ampliamente]]', '[[It widely believes|Se cree ampliamente activamente]]', '[[That it is widely believed|Que se cree ampliamente]]'], correctAnswer: 'It is widely believed', acceptableAnswers: ['It is widely believed', 'It is claimed', 'It has been suggested', 'It is argued'], explanation: '"It is + past participle (passive reporting verb) + that + clause" — the standard impersonal passive reporting construction used to attribute claims to unspecified sources. "It widely believes" is active and ungrammatical.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u41-g3', type: 'multiple-choice', level: 'C1', topic: 'passive-reporting', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Reporting Verbs: Present vs Past Reference|Verbos de reporte: referencia presente vs pasada]]', instructions: 'Choose the most accurate sentence.',
      questions: [{ question: 'Which option correctly transforms "Scientists claim that homeopathy has no effect beyond placebo" into a passive reporting structure?', options: ['[[Homeopathy is claimed to have no effect beyond placebo by mainstream medical scientists, a position reflected in systematic reviews conducted across several major health research institutions.|Se afirma que la homeopatía no tiene ningún efecto más allá del placebo según los científicos médicos convencionales, posición reflejada en revisiones sistemáticas realizadas en varias instituciones de investigación sanitaria.]]', '[[It is claimed that homeopathy has no effect beyond placebo, which scientists have been saying about this for many years, and most researchers agree that this is the correct conclusion.|Se afirma que la homeopatía no tiene ningún efecto más allá del placebo, algo que los científicos han estado diciendo durante muchos años, y la mayoría de los investigadores coinciden en que esta es la conclusión correcta.]]', '[[Homeopathy is claimed by scientists to not having any effect beyond placebo, a position which has been taken by major health research institutions in their systematic reviews over time.|Se afirma por los científicos que la homeopatía no tiene ningún efecto más allá del placebo, posición adoptada por las principales instituciones de investigación sanitaria en sus revisiones sistemáticas.]]'], correctAnswer: 0, explanation: 'Option A correctly uses "is claimed to have" (subject + passive reporting verb + to infinitive) in formal academic register. Option C uses "to not having" (wrong form — must be "to have").' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u41-v1', type: 'multiple-choice', level: 'C1', topic: 'medicine-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Complementary Medicine|Medicina complementaria]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'Medical practices that are used alongside — rather than instead of — conventional biomedical treatments, such as acupuncture alongside chemotherapy for pain management, are described as _______ medicine.', options: ['[[complementary|complementaria]]', '[[alternative|alternativa]]', '[[integrative|integrativa]]'], correctAnswer: 0, explanation: '"Complementary" = used alongside conventional medicine. "Alternative" = used instead of conventional medicine. "Integrative" = a broader term combining both, though it often implies a coordinated whole-person approach incorporating both systems.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u41-v2', type: 'fill-blank', level: 'C1', topic: 'medicine-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Clinical Trials|Ensayos clínicos]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'A study design in which neither participants nor researchers know who is receiving the active treatment versus the inactive control substance — considered the gold standard for evaluating therapeutic efficacy — is known as a _______ trial.', options: ['[[double-blind|doble ciego]]', '[[open-label|etiqueta abierta]]', '[[observational|observacional]]'], correctAnswer: 'double-blind', acceptableAnswers: ['double-blind', 'double blind', 'double-blind randomised controlled'], explanation: '"Double-blind (randomised controlled) trial" = the gold standard design where both participant and researcher are unaware of group allocation, minimising expectation bias and investigator influence on outcomes.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u41-v3', type: 'multiple-choice', level: 'C1', topic: 'medicine-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Pharmacology|Farmacología]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'An inactive substance administered to a control group in a clinical trial — designed to resemble the active treatment — that produces measurable therapeutic effects purely through the patient\'s expectation of benefit is known as a _______ effect.', options: ['[[placebo|efecto placebo]]', '[[nocebo|efecto nocebo]]', '[[synergistic|efecto sinérgico]]'], correctAnswer: 0, explanation: '"Placebo effect" = measurable therapeutic benefit from an inert substance due to patient expectation. "Nocebo effect" = the reverse — harm caused by negative expectations. "Synergistic" refers to combined drug interactions.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u41-r1', type: 'reading', level: 'C1', topic: 'medicine-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Limits of Evidence in Complementary Medicine|Los límites de la evidencia en medicina complementaria]]', instructions: 'Read and answer.',
      passage: 'The relationship between complementary medicine and evidence-based practice is frequently characterised by mutual suspicion. Proponents of practices such as acupuncture, osteopathy and certain herbal therapies argue that the double-blind randomised controlled trial — the gold standard of biomedical research — is poorly suited to evaluating holistic interventions in which the therapeutic relationship, individualised treatment and the patient\'s belief in the therapy are themselves integral to the outcome. Critics, however, contend that abandoning rigorous trial design creates conditions in which ineffective or harmful treatments may be falsely validated. It is claimed that some complementary practices exploit cognitive biases — including confirmation bias and the regression to the mean — to generate the impression of efficacy in the absence of genuine pharmacological or physiological mechanisms. The challenge, it has been argued, is not to dismiss patient-reported outcomes but to develop methodologies sufficiently robust to distinguish genuine therapeutic effects from artefacts of expectation.',
      questions: [{ question: 'What argument do proponents of complementary medicine make about the randomised controlled trial?', options: ['[[They argue that the RCT is poorly suited to evaluating holistic interventions where the therapeutic relationship and patient belief are integral parts of the outcome itself.|Argumentan que el ensayo controlado aleatorizado es poco adecuado para evaluar intervenciones holísticas en las que la relación terapéutica y la creencia del paciente son partes integrales del resultado.]]', '[[They argue that randomised controlled trials have consistently shown that complementary medicine is superior to conventional pharmacological treatments across a wide range of medical conditions.|Argumentan que los ensayos controlados aleatorizados han demostrado consistentemente que la medicina complementaria es superior a los tratamientos farmacológicos convencionales en una amplia gama de condiciones médicas.]]', '[[They argue that the double-blind trial is the ideal method for evaluating complementary medicine because it eliminates the placebo effect and proves genuine therapeutic efficacy beyond any reasonable doubt.|Argumentan que el ensayo doble ciego es el método ideal para evaluar la medicina complementaria porque elimina el efecto placebo y demuestra la eficacia terapéutica genuina más allá de cualquier duda razonable.]]'], correctAnswer: 0, explanation: 'The text says proponents argue the RCT "is poorly suited to evaluating holistic interventions in which the therapeutic relationship, individualised treatment and the patient\'s belief in the therapy are themselves integral to the outcome".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u41-r2', type: 'reading', level: 'C1', topic: 'medicine-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Mindfulness in Clinical Settings|Mindfulness en entornos clínicos]]', instructions: 'Read and answer.',
      passage: 'Mindfulness-based interventions have been among the most extensively researched of the practices that originated outside mainstream biomedicine. Mindfulness-Based Stress Reduction (MBSR), developed by Jon Kabat-Zinn in the 1970s, and Mindfulness-Based Cognitive Therapy (MBCT) are both reported to produce statistically significant reductions in symptoms of anxiety, depression and chronic pain. MBCT in particular is now recommended in clinical guidelines — including those of the UK\'s National Institute for Health and Care Excellence — as a first-line intervention for the prevention of depressive relapse in patients with a history of three or more depressive episodes. It is considered to be at least as effective as maintenance antidepressant medication for this population. What distinguishes these interventions from other complementary practices, critics note, is the volume and quality of the evidence base supporting them: multiple large-scale RCTs, systematic reviews and neuroimaging studies demonstrating associated changes in brain structure and function.',
      questions: [{ question: 'What distinguishes mindfulness-based interventions from other complementary practices, according to the text?', options: ['[[The volume and quality of supporting evidence: multiple large RCTs, systematic reviews and neuroimaging studies showing associated brain changes.|El volumen y la calidad de la evidencia de apoyo: múltiples grandes ensayos controlados aleatorizados, revisiones sistemáticas y estudios de neuroimagen que muestran cambios cerebrales asociados.]]', '[[They were developed by mainstream biomedical researchers who designed them specifically to meet the methodological requirements of double-blind randomised controlled trials from the outset.|Fueron desarrolladas por investigadores biomédicos convencionales que las diseñaron específicamente para cumplir los requisitos metodológicos de los ensayos doble ciego desde el principio.]]', '[[They are more affordable and widely accessible than antidepressant medication, which accounts for the growing interest in their integration into national clinical guidelines across most developed countries.|Son más asequibles y accesibles que la medicación antidepresiva, lo que explica el creciente interés en su integración en las guías clínicas nacionales en la mayoría de los países desarrollados.]]'], correctAnswer: 0, explanation: 'The text states critics note that what distinguishes these interventions is "the volume and quality of the evidence base supporting them: multiple large-scale RCTs, systematic reviews and neuroimaging studies".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u41-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'medicine-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Alternative Medicine and Treatment), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u41-l1', type: 'listening', level: 'C1', topic: 'medicine-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Medical Ethics Debate|Un debate de ética médica]]', instructions: 'Read the transcript and answer.',
      passage: 'Speaker A: The issue I want to raise is the ethics of prescribing therapies whose mechanisms are not scientifically understood. If a patient is found to benefit from acupuncture for chronic back pain, and we cannot replicate that benefit in controlled conditions, are we obliged to withhold it? Speaker B: That is the critical tension, isn\'t it. It is widely agreed that patient outcomes — including self-reported wellbeing — are the primary metric. If a treatment is reported to improve quality of life, is safe and does not preclude evidence-based care, withholding it on epistemological grounds seems unnecessarily paternalistic. Speaker A: But there is also a concern about informed consent. Patients are said to often overestimate the efficacy of complementary therapies because practitioners frame outcomes in highly positive terms, without adequately communicating the uncertainty of the evidence. Speaker B: That is a legitimate concern. It has been argued that informed consent in complementary medicine is systematically weaker than in biomedical practice. The solution, it seems to me, is not prohibition but more rigorous standards of communication.',
      questions: [{ question: 'What concern does Speaker A raise about complementary medicine and informed consent?', options: ['[[Patients are said to often overestimate efficacy because practitioners frame outcomes positively without adequately communicating the uncertainty of the evidence base.|Se dice que los pacientes frecuentemente sobreestiman la eficacia porque los practicantes enmarcan los resultados de forma positiva sin comunicar adecuadamente la incertidumbre de la base de evidencia.]]', '[[Speaker A argues that complementary medicine should be prohibited entirely because practitioners systematically misrepresent the scientific status of their therapies to vulnerable patients.|El orador A argumenta que la medicina complementaria debería prohibirse por completo porque los practicantes tergiversan sistemáticamente el estatus científico de sus terapias.]]', '[[The main concern raised is that complementary medicine is unaffordable for most patients and that practitioners exploit financial vulnerabilities to promote expensive treatments without evidence.|La preocupación principal planteada es que la medicina complementaria es inasequible para la mayoría de los pacientes y que los practicantes explotan las vulnerabilidades financieras.]]'], correctAnswer: 0, explanation: 'Speaker A says "Patients are said to often overestimate the efficacy of complementary therapies because practitioners frame outcomes in highly positive terms, without adequately communicating the uncertainty of the evidence".' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u41-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'medicine-listening',
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
    id: 'c1-u41-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'medicine-listening',
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
    id: 'c1-u41-w1', type: 'writing', level: 'C1', topic: 'medicine-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Passive Reporting in Academic Writing|Pasiva de reporte en escritura académica]]', instructions: 'Which response uses passive reporting structures most effectively?',
      questions: [{ question: 'Task: Write two sentences evaluating the evidence for herbal medicine using passive reporting verbs.', options: ['[[Several botanical preparations — including St John\'s Wort, valerian and echinacea — are reported to produce measurable therapeutic effects in randomised trials, though the quality of evidence varies considerably across compounds and conditions; it has been argued that the heterogeneity of herbal preparations and dosing protocols makes direct comparison across studies inherently problematic, a methodological challenge that is widely acknowledged to limit the generalisability of current findings.|Se informa que varias preparaciones botánicas producen efectos terapéuticos medibles en ensayos aleatorizados, aunque la calidad de la evidencia varía considerablemente; se ha argumentado que la heterogeneidad de las preparaciones herbales hace que la comparación directa entre estudios sea problemática, un desafío metodológico que se reconoce ampliamente que limita la generalizabilidad de los hallazgos.]]', '[[Herbal medicines are said to work for some conditions. It is believed that they can help with sleep and stress. However, scientists claim that more research is needed before we can say for certain that they are effective for most people in most situations.|Se dice que las medicinas herbales funcionan para algunas condiciones. Se cree que pueden ayudar con el sueño y el estrés.]]', '[[Some people report that herbal medicines have helped them. It is claimed that they are natural and therefore safer. But scientists say they are not proven and that patients should be careful because they can interact with other drugs.|Algunas personas informan que las medicinas herbales les han ayudado. Se afirma que son naturales y por lo tanto más seguras.]]'], correctAnswer: 0, explanation: 'Option A chains multiple passive reporting verbs ("are reported", "has been argued", "is widely acknowledged") within a complex, substantive academic sentence that maintains formal register throughout.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u41-w2',
    type: 'writing',
    level: 'C1',
    topic: 'medicine-writing',
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
    id: 'c1-u41-w3',
    type: 'writing',
    level: 'C1',
    topic: 'medicine-writing',
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
