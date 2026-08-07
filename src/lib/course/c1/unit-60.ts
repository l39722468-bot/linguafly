/**
 * C1 Unit 60 — Exam Preparation
 * Module 10: Philosophy, Ethics and the Future
 * Grammar: CAE / IELTS / TOEFL task types — Use of English, sentence transformation, exam strategy
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Exam Preparation: CAE, IELTS and TOEFL';

export const UNIT_60_EXERCISES: Exercise[] = [
{
    id: 'c1-u60-g1', type: 'multiple-choice', level: 'C1', topic: 'exam-use-of-english', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[CAE Use of English — Open Cloze|CAE Uso del inglés — Cloze abierto]]', instructions: 'Select the correct word to complete each gap in this exam-style open cloze task.',
      questions: [{ question: 'CAE Open Cloze: "Far _____ being a purely academic question, the governance of artificial intelligence has emerged _____ one of the most pressing political challenges of our time, _____ which existing regulatory frameworks are poorly equipped to deal." What are the three missing words in order?', options: ['[[from / as / with|de / como / con]]', '[[away / like / by|lejos / como / por]]', '[[from / like / for|de / como / para]]'], correctAnswer: 0, explanation: '"Far from" (fixed phrase — not "far away from" in this sense), "emerged as" (fixed collocation — not "emerged like"), "equipped to deal with" (fixed collocation — preposition "with" not "by" or "for"). CAE Open Cloze tests knowledge of fixed phrases, collocations and prepositions — vocabulary-grammar items that cannot be predicted from context alone.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u60-g2', type: 'fill-blank', level: 'C1', topic: 'exam-sentence-transformation', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[CAE Key Word Transformation|CAE Transformación con palabra clave]]', instructions: 'Complete the sentence using the key word so that it means the same as the first sentence. Use 3-6 words including the key word.',
      questions: [{ question: 'Original: "The researchers did not expect the results to be so significant." Key word: CAME. Complete: "The significance of the results _______ the researchers."', options: ["[[came as a surprise to|fue una sorpresa para]]", "[[came unexpectedly for|llegó inesperadamente para]]", "[[came to surprise at|llegó a sorprender en]]"], correctAnswer: "came as a surprise to", acceptableAnswers: ["came as a surprise to", "came as quite a surprise to"], explanation: '"Came as a surprise to" = the standard CAE-tested transformation of "did not expect" using the key word CAME. The full sentence: "The significance of the results came as a surprise to the researchers." CAE Key Word Transformation tests knowledge of fixed phrases, phrasal verbs, reported speech changes and other grammatical transformations.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u60-g3', type: 'multiple-choice', level: 'C1', topic: 'exam-sentence-transformation', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[IELTS Academic Writing — Hedging and Qualification|IELTS Redacción académica — Cobertura y matización]]', instructions: 'Choose the sentence that best demonstrates IELTS Academic Writing Task 2 style.',
      questions: [{ question: 'Which sentence best demonstrates the register and hedging appropriate for an IELTS Academic Writing Task 2 essay?', options: ['[[While it can be argued that technological unemployment — the displacement of workers by automation — poses a serious threat to social stability in the coming decades, it is also plausible that, as in previous periods of rapid technological change, new categories of employment will emerge that partially or fully offset the jobs displaced, though the distributional consequences of this transition are likely to be uneven and may require active policy intervention to manage.|Aunque se puede argumentar que el desempleo tecnológico plantea una amenaza seria para la estabilidad social en las próximas décadas, también es plausible que, como en períodos anteriores de cambio tecnológico rápido, surjan nuevas categorías de empleo que compensen parcial o totalmente los empleos desplazados.]]', '[[Automation will definitely destroy millions of jobs and cause terrible social problems. People who say new jobs will appear are completely wrong and cannot see how serious this crisis really is. Governments must act immediately or society will collapse.|La automatización definitivamente destruirá millones de empleos y causará terribles problemas sociales. Las personas que dicen que aparecerán nuevos empleos están completamente equivocadas.]]', '[[Automation might be a problem or might not be. It could destroy jobs but also create them. We do not really know what will happen. Both sides have good points. The government should maybe do something about this situation.|La automatización podría ser un problema o no. Podría destruir empleos pero también crearlos.]]'], correctAnswer: 0, explanation: 'Option A demonstrates IELTS Task 2 style: acknowledgement of both sides ("While it can be argued...it is also plausible"), appropriate hedging ("can be argued", "it is plausible", "partially or fully", "likely to be", "may require"), formal register, and substantive content. IELTS rewards balanced argument with appropriate hedging.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u60-v1', type: 'multiple-choice', level: 'C1', topic: 'exam-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[CAE Word Formation|CAE Formación de palabras]]', instructions: 'Choose the correct word form for each context.',
      questions: [{ question: 'CAE Word Formation: Which option correctly fills all three gaps? "The _____ (GOVERN) of digital platforms requires _____ (REGULATE) frameworks that are capable of keeping pace with technological _____ (INNOVATE)."', options: ['[[governance / regulatory / innovation|gobernanza / regulatorio / innovación]]', '[[governing / regulation / innovative|gobernanza / regulación / innovador]]', '[[governmental / regulatable / innovativeness|gubernamental / regulable / innovatividad]]'], correctAnswer: 0, explanation: '"Governance" (noun from GOVERN — not "governing" which is participial, or "governmental" which is adjective). "Regulatory" (adjective modifying "frameworks" — not "regulation" which is a noun). "Innovation" (noun as object of "pace with" — not "innovative" which is adjective). CAE Word Formation tests knowledge of suffixes, prefixes and word family patterns.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u60-v2', type: 'fill-blank', level: 'C1', topic: 'exam-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[CAE Multiple Choice Cloze|CAE Selección múltiple cloze]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'CAE Multiple Choice Cloze: "The committee\'s report drew _____ attention to the fact that funding for preventive healthcare had been systematically underestimated in successive government budgets." Which word correctly fills the gap?', options: ['[[particular|particular]]', '[[peculiar|peculiar]]', '[[individual|individual]]'], correctAnswer: 'particular', acceptableAnswers: ['particular'], explanation: '"Drew particular attention to" = a fixed collocation meaning "specifically highlighted" or "specifically emphasised". "Drew peculiar attention" = would imply the attention itself was strange. "Drew individual attention" = would mean personal/specific attention to each person, not the same meaning. CAE Multiple Choice Cloze tests collocation and fixed phrases.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u60-v3', type: 'multiple-choice', level: 'C1', topic: 'exam-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[IELTS Academic Vocabulary|Vocabulario académico de IELTS]]', instructions: 'Choose the correct academic word.',
      questions: [{ question: 'IELTS Academic Vocabulary: In an IELTS Academic essay about inequality, which sentence uses the most appropriate academic vocabulary?', options: ['[[The proliferation of precarious employment arrangements — characterised by irregular hours, limited job security and inadequate benefits — has been identified as a significant driver of economic insecurity among lower-income populations in developed economies, exacerbating existing disparities in wealth and wellbeing.|La proliferación de arreglos laborales precarios, caracterizados por horarios irregulares, seguridad laboral limitada y beneficios inadecuados, ha sido identificada como un impulsor significativo de la inseguridad económica entre las poblaciones de bajos ingresos en las economías desarrolladas.]]', '[[There are lots of bad jobs now that do not have enough security or good enough pay and this is making inequality worse in many rich countries where some people have very little money whilst others have a lot.|Ahora hay muchos empleos malos que no tienen suficiente seguridad o pago suficientemente bueno y esto está empeorando la desigualdad en muchos países ricos.]]', '[[Job insecurity is getting more common and this causes inequality to get bigger. People in bad jobs do not earn enough and have no security, which makes them poorer compared to people in good jobs who earn more money.|La inseguridad laboral se está volviendo más común y esto hace que la desigualdad aumente.]]'], correctAnswer: 0, explanation: 'Option A uses IELTS Band 8-9 vocabulary: "proliferation", "precarious employment arrangements", "characterised by", "identified as", "driver of economic insecurity", "exacerbating existing disparities". These are Academic Word List items used accurately in formal collocations.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u60-r1', type: 'reading', level: 'C1', topic: 'exam-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[CAE Reading and Use of English — Part 6 (Cross-text Multiple Matching)|CAE Lectura y uso del inglés — Parte 6 (Correspondencia múltiple entre textos)]]', instructions: 'Read both extracts and answer.',
      passage: 'Extract A (Reviewer 1): "The book\'s central argument — that philosophical ethics is best understood as an empirical rather than an a priori discipline, one that treats moral intuitions as data points to be explained and refined rather than as sources of infallible normative truth — is compellingly made and admirably clear. Where the argument risks overstating its case is in its treatment of moral intuitions that conflict with each other: the author\'s procedure for adjudicating between competing intuitions is, it must be said, less clearly articulated than the overall framework would seem to require." Extract B (Reviewer 2): "What is most impressive about this approach is its methodological rigour and the author\'s willingness to follow the argument wherever it leads, even when the conclusions are counterintuitive. The charge that the framework fails to provide a satisfying procedure for resolving conflicting intuitions is a familiar one in this area and is, in my view, somewhat overstated: the author provides more guidance than critics acknowledge, and the difficulty of adjudicating between intuitions is, in any case, not a problem unique to this approach."',
      questions: [{ question: 'On which point do Reviewer 1 and Reviewer 2 disagree?', options: ['[[Whether the book provides a satisfying procedure for resolving conflicting intuitions: Reviewer 1 finds this to be a genuine and clearly significant weakness, while Reviewer 2 argues that this criticism is overstated and that the author provides more guidance than critics acknowledge.|Si el libro proporciona un procedimiento satisfactorio para resolver intuiciones en conflicto: el Revisor 1 encuentra que esta es una debilidad genuina y claramente significativa, mientras que el Revisor 2 argumenta que esta crítica está exagerada y que el autor proporciona más orientación de lo que los críticos reconocen.]]', '[[Whether the book\'s central argument is clearly articulated: Reviewer 1 praises the clarity of the central argument, while Reviewer 2 argues that the book\'s argument is confusingly presented and lacks the methodological rigour necessary for a convincing philosophical case.|Si el argumento central del libro está claramente articulado: el Revisor 1 elogia la claridad del argumento central, mientras que el Revisor 2 argumenta que el argumento del libro está confusamente presentado.]]', '[[Whether treating moral intuitions as empirical data points is a valid methodological approach: Reviewer 1 accepts this approach enthusiastically, while Reviewer 2 argues that moral intuitions cannot be treated as empirical data because they are irreducibly subjective.|Si tratar las intuiciones morales como puntos de datos empíricos es un enfoque metodológico válido.]]'], correctAnswer: 0, explanation: 'Both reviewers raise the question of conflicting intuitions, but disagree on its significance: Reviewer 1 says the procedure is "less clearly articulated than the framework would seem to require" (a real weakness); Reviewer 2 says the charge "is somewhat overstated" and that "the author provides more guidance than critics acknowledge" (disagreeing with the criticism).' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u60-r2', type: 'reading', level: 'C1', topic: 'exam-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[IELTS Academic Reading — True/False/Not Given|IELTS Lectura académica — Verdadero/Falso/No se menciona]]', instructions: 'Identify whether each statement is True, False or Not Given according to the passage.',
      passage: 'The concept of "deep time" — geological and evolutionary time measured in hundreds of millions of years — was one of the most profound conceptual revolutions of the modern era, with consequences for human self-understanding that arguably rival those of the Copernican revolution or Darwinian evolution. The realisation, first systematically argued by James Hutton in the 1780s and later confirmed by radiometric dating, that the Earth was not thousands but billions of years old fundamentally altered the human relationship with the past: the timescales involved are so vast as to be genuinely incomprehensible to ordinary human cognition, and yet the patterns they reveal — the slow movements of continents, the gradual emergence and extinction of entire biological kingdoms — are the context within which human history is a brief, recent and contingent episode. Contemporary geologists have proposed that we have now entered a new geological epoch — the Anthropocene — defined by the scale of human modification of planetary systems; this proposal remains formally unratified by the International Union of Geological Sciences, though it has been widely adopted in scientific and public discourse.',
      questions: [{ question: 'Statement: "The Anthropocene has been formally accepted as an official geological epoch by the relevant scientific authority." Is this True, False or Not Given?', options: ['[[False — the text states the proposal "remains formally unratified by the International Union of Geological Sciences", indicating it has not been officially accepted.|Falso: el texto afirma que la propuesta "sigue sin ser ratificada formalmente por la Unión Internacional de Ciencias Geológicas", lo que indica que no ha sido aceptada oficialmente.]]', '[[True — the text says the Anthropocene "has been widely adopted in scientific and public discourse", which implies formal official acceptance by the scientific community.|Verdadero: el texto dice que el Antropoceno "ha sido ampliamente adoptado en el discurso científico y público", lo que implica aceptación oficial formal por parte de la comunidad científica.]]', '[[Not Given — the text does not mention the International Union of Geological Sciences or the formal status of the Anthropocene proposal.|No se menciona: el texto no menciona la Unión Internacional de Ciencias Geológicas ni el estado formal de la propuesta del Antropoceno.]]'], correctAnswer: 0, explanation: 'The text explicitly states: "this proposal remains formally unratified by the International Union of Geological Sciences" — the formal authority has NOT ratified it. Therefore the statement "formally accepted" is FALSE. IELTS T/F/NG requires distinguishing between: text explicitly contradicts (False), text explicitly confirms (True), text neither confirms nor contradicts (Not Given).' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u60-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'exam-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Exam Preparation: CAE, IELTS and TOEFL), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u60-l1', type: 'listening', level: 'C1', topic: 'exam-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[CAE Listening — Multiple Choice|CAE Comprensión auditiva — Selección múltiple]]', instructions: 'Read the transcript and answer as in a CAE multiple-choice listening task.',
      passage: 'Interviewer: Your new research challenges some long-held assumptions about bilingualism and cognitive advantage. Can you summarise your findings? Researcher: Yes — and I want to be careful about how I phrase this, because the field has been somewhat polarised. The strong version of the "bilingual advantage" hypothesis — the claim that speaking two languages regularly produces measurable cognitive benefits in areas like executive function and delayed dementia — has attracted enormous media attention. What our meta-analysis found, however, is that when you control for publication bias — the tendency for journals to publish positive results and file away negative ones — the effect sizes claimed in the original studies shrink considerably, and in some cases disappear entirely. This does not mean there is no bilingual advantage; it means we have much weaker evidence for a strong version of the claim than the popular literature suggests. Interviewer: So you are not saying bilingualism has no cognitive effects? Researcher: Absolutely not. What I am saying is that the evidence base currently available supports a much more modest claim: that the cognitive profile of bilinguals differs from that of monolinguals in ways that are real but smaller and more context-dependent than the popular narrative implies — and that we need more methodologically rigorous research before drawing firm conclusions.',
      questions: [{ question: 'What does the researcher say their meta-analysis found?', options: ['[[That when controlling for publication bias, the effect sizes claimed in original bilingual advantage studies shrink considerably and in some cases disappear — meaning the evidence supports only a more modest claim about cognitive differences, not the strong version of the hypothesis that attracted media attention.|Que al controlar el sesgo de publicación, los tamaños de efecto reclamados en los estudios originales de ventaja bilingüe se reducen considerablemente y en algunos casos desaparecen, lo que significa que la evidencia solo apoya una afirmación más modesta sobre las diferencias cognitivas.]]', '[[The meta-analysis confirmed the strong bilingual advantage hypothesis, showing that bilinguals have significantly better executive function and substantially delayed dementia onset compared to monolinguals across all demographic groups studied.|El metaanálisis confirmó la hipótesis de la fuerte ventaja bilingüe, mostrando que los bilingües tienen una función ejecutiva significativamente mejor y un inicio de demencia sustancialmente retrasado.]]', '[[The meta-analysis showed that the bilingual advantage is entirely non-existent — a statistical artefact produced by publication bias — and that there are no meaningful cognitive differences between bilinguals and monolinguals at any level of analysis.|El metaanálisis mostró que la ventaja bilingüe es completamente inexistente, un artefacto estadístico producido por el sesgo de publicación.]]'], correctAnswer: 0, explanation: 'The researcher says: "when you control for publication bias...the effect sizes claimed in the original studies shrink considerably, and in some cases disappear entirely" — but explicitly clarifies "this does not mean there is no bilingual advantage; it means we have much weaker evidence for a strong version of the claim." CAE listening tests precise understanding of hedged academic claims.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u60-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'exam-listening',
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
    id: 'c1-u60-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'exam-listening',
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
    id: 'c1-u60-w1', type: 'writing', level: 'C1', topic: 'exam-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[IELTS Task 2 — Essay Introduction and Conclusion|IELTS Tarea 2 — Introducción y conclusión del ensayo]]', instructions: 'Which response demonstrates the best IELTS Task 2 essay structure?',
      questions: [{ question: 'Task: Some people argue that governments should prioritise economic growth over environmental protection. Discuss both views and give your own opinion. Write an introduction and conclusion.', options: ['[[Introduction: The question of whether governments should subordinate environmental objectives to economic growth is one that has attracted increasing attention as the consequences of both unchecked development and environmental degradation have become more apparent. This essay will consider the arguments advanced in favour of prioritising economic growth, the counterarguments from an environmental perspective, and conclude that, whilst economic considerations are legitimate, the long-term sustainability of economic development itself depends on the preservation of the ecological conditions that make it possible. Conclusion: In conclusion, whilst the case for prioritising economic growth rests on genuine considerations of immediate welfare and development, the weight of evidence suggests that framing growth and environmental protection as competing priorities is itself misleading: the most durable economic development is that which operates within environmental limits, and governments that fail to recognise this are likely to undermine the very foundations of the prosperity they seek to generate.|Introducción: La cuestión de si los gobiernos deben subordinar los objetivos ambientales al crecimiento económico es una que ha atraído creciente atención. Este ensayo considerará los argumentos a favor de priorizar el crecimiento económico, los contraargumentos desde una perspectiva ambiental, y concluirá que el desarrollo económico sostenible depende de la preservación de las condiciones ecológicas. Conclusión: En conclusión, el desarrollo económico más duradero es el que opera dentro de los límites ambientales.]]', '[[Intro: This essay is about whether governments should prioritise economic growth or environmental protection. Both sides have good and bad points. I will discuss both and give my opinion. Conclusion: In conclusion, I think both are important and governments should try to do both things at the same time if possible.|Introducción: Este ensayo trata sobre si los gobiernos deben priorizar el crecimiento económico o la protección ambiental. Ambos lados tienen puntos buenos y malos. Conclusión: En conclusión, creo que ambos son importantes.]]', '[[Intro: Economic growth and environmental protection are very important topics. Many people disagree about which one is more important. This essay will look at both sides of the argument and reach a conclusion about which is more important for governments. Conclusion: To sum up, this is a very complex issue with no easy answer. Both economic growth and environmental protection are important and governments should think carefully about both.|Introducción: El crecimiento económico y la protección ambiental son temas muy importantes. Conclusión: Para resumir, este es un tema muy complejo sin respuesta fácil.]]'], correctAnswer: 0, explanation: 'Option A achieves IELTS Band 7-8 standards: the introduction paraphrases the task, previews the structure, and states a clear opinion; the conclusion synthesises the argument without simply repeating it, and introduces the key idea that the framing itself is misleading — an analytical move that demonstrates C1 critical thinking.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u60-w2',
    type: 'writing',
    level: 'C1',
    topic: 'exam-writing',
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
    id: 'c1-u60-w3',
    type: 'writing',
    level: 'C1',
    topic: 'exam-writing',
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
