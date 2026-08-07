/**
 * C1 Unit 38 — The Science of the Brain
 * Module 7: Health and Mind
 * Grammar: Advanced reporting verbs (allege, contend, dispute, concede, acknowledge, maintain, assert, insist, claim)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'The Science of the Brain';

export const UNIT_38_EXERCISES: Exercise[] = [
{
    id: 'c1-u38-g1', type: 'multiple-choice', level: 'C1', topic: 'reporting-verbs', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Advanced Reporting Verbs|Verbos de reporte avanzados]]', instructions: 'Choose the sentence with the most appropriate reporting verb.',
      questions: [{ question: 'Which sentence uses a reporting verb that conveys the speaker\'s disagreement with the reported position?', options: ['[[The pharmaceutical company disputed the regulator\'s conclusion that its new drug carried an elevated risk of cardiovascular side effects, citing what it described as methodological flaws in the post-market surveillance study.|La empresa farmacéutica disputó la conclusión del regulador de que su nuevo medicamento conllevaba un riesgo elevado de efectos secundarios cardiovasculares, citando lo que describió como fallos metodológicos en el estudio.]]', '[[The pharmaceutical company acknowledged the regulator\'s conclusion that its new drug carried an elevated risk of cardiovascular side effects, citing what it described as compelling evidence from multiple studies.|La empresa farmacéutica reconoció la conclusión del regulador de que su nuevo medicamento conllevaba un riesgo elevado de efectos secundarios cardiovasculares.]]', '[[The pharmaceutical company conceded the regulator\'s conclusion that its new drug carried an elevated risk of cardiovascular side effects, pledging to reformulate the drug within twelve months.|La empresa farmacéutica concedió la conclusión del regulador de que su nuevo medicamento conllevaba un riesgo elevado de efectos secundarios cardiovasculares.]]'], correctAnswer: 0, explanation: '"Dispute" = challenge the truth or validity of something — implies the reporting party rejects the claim. "Acknowledge" and "concede" imply acceptance.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u38-g2', type: 'fill-blank', level: 'C1', topic: 'reporting-verbs', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Contend / Maintain|Sostener / Mantener]]', instructions: 'Complete with the most precise reporting verb.',
      questions: [{ question: 'Leading neuroscientists _______ that consciousness is an emergent property of complex neural activity rather than a phenomenon requiring explanation beyond the physical substrate of the brain — a position that remains deeply contested in philosophy of mind.', options: ['[[contend|sostienen]]', '[[admit|admiten]]', '[[confess|confiesan]]'], correctAnswer: 'contend', acceptableAnswers: ['contend', 'maintain', 'argue', 'assert', 'claim'], explanation: '"Contend" = formally argue or maintain a position, especially in a contested debate. "Admit" and "confess" imply acknowledging something reluctantly or wrongdoing — inappropriate here.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u38-g3', type: 'multiple-choice', level: 'C1', topic: 'reporting-verbs', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Concede vs Acknowledge|Conceder vs Reconocer]]', instructions: 'Choose the sentence that correctly distinguishes the two verbs.',
      questions: [{ question: 'Which pair of sentences best illustrates the difference between "concede" and "acknowledge"?', options: ['[[(A) "The researcher acknowledged that sample sizes were small, limiting generalisability." = neutral recognition of a limitation; (B) "The researcher conceded that the rival methodology had produced more robust results." = reluctant admission that contradicts the researcher\'s preferred position.|(A) "El investigador reconoció que los tamaños de muestra eran pequeños, lo que limitaba la generalización" = reconocimiento neutral de una limitación; (B) "El investigador concedió que la metodología rival había producido resultados más robustos" = admisión reluctante que contradice la posición preferida del investigador.]]', '[[(A) "The researcher acknowledged the rival methodology was superior" = reluctant admission; (B) "The researcher conceded that sample sizes were small" = neutral recognition of a limitation in the study design.|(A) "El investigador reconoció que la metodología rival era superior" = admisión reluctante; (B) "El investigador concedió que los tamaños de muestra eran pequeños" = reconocimiento neutral.]]', '[[(A) and (B) are interchangeable because "acknowledge" and "concede" are synonyms with no meaningful distinction in academic or scientific discourse contexts.|(A) y (B) son intercambiables porque "acknowledge" y "concede" son sinónimos sin distinción significativa en contextos de discurso académico o científico.]]'], correctAnswer: 0, explanation: '"Acknowledge" = recognise/admit something, neutral. "Concede" = admit reluctantly, especially under pressure or when it contradicts your own position. The distinction is one of degree and rhetorical context.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u38-v1', type: 'multiple-choice', level: 'C1', topic: 'neuroscience-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Neuroscience Terms|Términos de neurociencia]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The brain\'s ability to reorganise its structure, form new neural connections and adapt its functional organisation in response to learning, experience or injury is known as _______.', options: ['[[neuroplasticity|neuroplasticidad]]', '[[neurogenesis|neurogénesis]]', '[[neurotransmission|neurotransmisión]]'], correctAnswer: 0, explanation: '"Neuroplasticity" = the brain\'s capacity to reorganise and adapt throughout life. "Neurogenesis" = the formation of new neurons. "Neurotransmission" = the process of chemical signal transmission between neurons.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u38-v2', type: 'fill-blank', level: 'C1', topic: 'neuroscience-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Brain and Behaviour|Cerebro y conducta]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The prefrontal _______ — the region of the brain most closely associated with executive functions including planning, decision-making, impulse control and the modulation of social behaviour — continues developing well into early adulthood, which partially explains risk-taking behaviour in adolescence.', options: ['[[cortex|córtex]]', '[[cortisol|cortisol]]', '[[corpus|cuerpo]]'], correctAnswer: 'cortex', acceptableAnswers: ['cortex'], explanation: '"Prefrontal cortex" = the frontal lobe region governing executive functions. "Cortisol" = a stress hormone. "Corpus callosum" connects the brain hemispheres but is a different structure.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u38-v3', type: 'multiple-choice', level: 'C1', topic: 'neuroscience-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Medical Research|Investigación médica]]', instructions: 'Choose the correct collocation.',
      questions: [{ question: 'A study that follows the same group of participants over an extended period of time — measuring changes in health outcomes, behaviours or biological markers — is described as a _______ study.', options: ['[[longitudinal|longitudinal]]', '[[cross-sectional|transversal]]', '[[double-blind|doble ciego]]'], correctAnswer: 0, explanation: '"Longitudinal study" = tracks the same participants over time. "Cross-sectional" = examines a population at a single point in time. "Double-blind" = neither participants nor researchers know treatment allocation.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u38-r1', type: 'reading', level: 'C1', topic: 'neuroscience-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Placebo Effect|El efecto placebo]]', instructions: 'Read and answer.',
      passage: 'The placebo effect — in which patients experience genuine physiological or psychological improvement after receiving an inert treatment — has long been dismissed as a mere artefact of measurement error or subjective bias. Neuroscientists now contend, however, that this view fundamentally misrepresents the phenomenon. Researchers have demonstrated that placebos trigger measurable neurobiological changes, including the release of endogenous opioids, dopamine and serotonin — the same neurotransmitters targeted by many active medications. Sceptics maintain that these findings, while intriguing, do not establish that placebos produce durable clinical benefit comparable to pharmacological intervention. Proponents acknowledge this limitation but assert that understanding placebo mechanisms could dramatically enhance the therapeutic potential of all treatments, including active drugs, through optimised patient-clinician communication.',
      questions: [{ question: 'What does the text say proponents of placebo research argue?', options: ['[[Proponents assert that understanding placebo mechanisms could enhance the effectiveness of all treatments through improved patient-clinician communication, even while acknowledging limitations.|Los defensores afirman que comprender los mecanismos del placebo podría mejorar la eficacia de todos los tratamientos a través de una mejor comunicación entre paciente y médico, aunque reconociendo las limitaciones.]]', '[[Proponents contend that placebos are clinically superior to pharmacological treatments and should replace active medications for the majority of chronic conditions.|Los defensores sostienen que los placebos son clínicamente superiores a los tratamientos farmacológicos y deberían reemplazar los medicamentos activos.]]', '[[Proponents dispute that placebos trigger any real neurobiological change, arguing that all placebo effects are entirely explained by subjective reporting bias in clinical trials.|Los defensores disputan que los placebos desencadenen algún cambio neurobiológico real, argumentando que todos los efectos placebo se explican completamente por el sesgo de informe subjetivo.]]'], correctAnswer: 0, explanation: 'The text says proponents "acknowledge this limitation but assert that understanding placebo mechanisms could dramatically enhance the therapeutic potential of all treatments".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u38-r2', type: 'reading', level: 'C1', topic: 'neuroscience-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Free Will and Neuroscience|Libre albedrío y neurociencia]]', instructions: 'Read and answer.',
      passage: 'The neuroscientific debate over free will has intensified since the landmark experiments of Benjamin Libet in the 1980s, which appeared to demonstrate that neural activity preparatory to voluntary movement begins several hundred milliseconds before participants report any conscious intention to act. Determinists have argued that these findings conclusively demonstrate that conscious volition is an epiphenomenon — a post-hoc rationalisation of decisions already made at a subconscious level. Critics of this interpretation contend that the experimental paradigm is too narrow to support such sweeping philosophical conclusions. Some researchers allege, furthermore, that replication studies have produced inconsistent results, raising serious questions about the robustness of the original findings. What most philosophers maintain is that the neuroscientific evidence, however intriguing, does not yet resolve the metaphysical question of whether moral responsibility requires libertarian free will.' ,
      questions: [{ question: 'What position do critics of the Libet experiments take?', options: ['[[Critics contend the experimental paradigm is too narrow for sweeping philosophical conclusions, and some allege replication studies have been inconsistent.|Los críticos sostienen que el paradigma experimental es demasiado estrecho para conclusiones filosóficas de gran alcance, y algunos alegan que los estudios de replicación han sido inconsistentes.]]', '[[Critics acknowledge that the Libet experiments conclusively prove that conscious free will does not exist and that all human decisions are made at an unconscious level.|Los críticos reconocen que los experimentos de Libet prueban de manera concluyente que el libre albedrío consciente no existe y que todas las decisiones humanas se toman a nivel inconsciente.]]', '[[Critics concede that the Libet experiments are methodologically sound and argue only that their philosophical implications have been insufficiently explored by determinists.|Los críticos conceden que los experimentos de Libet son metodológicamente sólidos y argumentan solo que sus implicaciones filosóficas no han sido suficientemente exploradas por los deterministas.]]'], correctAnswer: 0, explanation: 'The text says critics "contend that the experimental paradigm is too narrow" and "allege that replication studies have produced inconsistent results".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u38-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'neuroscience-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (The Science of the Brain), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u38-l1', type: 'listening', level: 'C1', topic: 'neuroscience-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Neuroscience Panel|Un panel de neurociencia]]', instructions: 'Read the transcript and answer.',
      passage: 'Moderator: There is an ongoing debate about whether memory is reconstructive or reproductive. Could you summarise the key positions? | Panellist A: Those who contend that memory is reproductive maintain that recall is essentially a playback of stored information — like accessing a file. But I would argue this view fundamentally misrepresents what we know neurologically. | Panellist B: I agree. The evidence I find most compelling is that memory is reconstructive — that every act of recall involves active neural rebuilding, which is why memories are susceptible to distortion, suggestion and interference. Those who dispute this are, I would allege, largely working from pre-neuroscientific assumptions that have long been superseded by experimental evidence.',
      questions: [{ question: 'What does Panellist B argue about memory, and how does she characterise those who disagree?', options: ['[[Panellist B argues memory is reconstructive and alleges that those who dispute this are working from outdated pre-neuroscientific assumptions.|La panelista B argumenta que la memoria es reconstructiva y alega que quienes disputan esto trabajan con suposiciones pre-neurocientíficas anticuadas.]]', '[[Panellist B acknowledges that memory is reproductive and concedes that the reconstructive model has been definitively disproved by recent experimental evidence.|La panelista B reconoce que la memoria es reproductiva y concede que el modelo reconstructivo ha sido definitivamente refutado por evidencia experimental reciente.]]', '[[Panellist B maintains that both the reproductive and reconstructive models of memory are equally valid and should be integrated into a unified theoretical framework.|La panelista B mantiene que tanto el modelo reproductivo como el reconstructivo de la memoria son igualmente válidos y deberían integrarse en un marco teórico unificado.]]'], correctAnswer: 0, explanation: 'Panellist B argues memory is reconstructive and uses "allege" to characterise opponents as working from "pre-neuroscientific assumptions that have long been superseded".' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u38-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'neuroscience-listening',
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
    id: 'c1-u38-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'neuroscience-listening',
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
    id: 'c1-u38-w1', type: 'writing', level: 'C1', topic: 'neuroscience-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Academic Reporting in Science Writing|Reporte académico en escritura científica]]', instructions: 'Which response uses advanced reporting verbs most accurately in academic writing?',
      questions: [{ question: 'Task: Write two sentences reporting a scientific debate on sleep and memory consolidation.', options: ['[[Sleep researchers contend that the consolidation of episodic memories occurs predominantly during slow-wave sleep, when the hippocampus replays recently encoded information and transfers it to long-term cortical storage. However, some researchers dispute whether this transfer process is as selective or sequential as the dominant model maintains, alleging that the experimental paradigms used to support it lack ecological validity.|Los investigadores del sueño sostienen que la consolidación de memorias episódicas ocurre predominantemente durante el sueño de ondas lentas, cuando el hipocampo reproduce información recientemente codificada y la transfiere al almacenamiento cortical a largo plazo. Sin embargo, algunos investigadores disputan si este proceso de transferencia es tan selectivo o secuencial como mantiene el modelo dominante, alegando que los paradigmas experimentales carecen de validez ecológica.]]', '[[Scientists say that sleep helps memory. Some researchers think this happens during deep sleep. Other scientists are not sure about this and think the experiments are not very good. More research is needed to find out who is right.|Los científicos dicen que el sueño ayuda a la memoria. Algunos investigadores piensan que esto ocurre durante el sueño profundo. Otros científicos no están seguros de esto.]]', '[[Research shows that sleep is important for memory. Scientists maintain this is true and they have done many experiments. Some people dispute this but most researchers agree that sleep helps consolidate memories.|La investigación muestra que el sueño es importante para la memoria. Los científicos mantienen que esto es cierto y han realizado muchos experimentos.]]'], correctAnswer: 0, explanation: 'Option A uses "contend", "dispute whether", "maintains" and "alleging" precisely in appropriate contexts with substantive scientific content and formal register.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u38-w2',
    type: 'writing',
    level: 'C1',
    topic: 'neuroscience-writing',
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
    id: 'c1-u38-w3',
    type: 'writing',
    level: 'C1',
    topic: 'neuroscience-writing',
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
