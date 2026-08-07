/**
 * C1 Unit 29 — Photography and Visual Storytelling
 * Module 5: Arts and Culture
 * Grammar: Nominalisation — academic register (building on unit 20, focusing on arts/media context)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Photography and Visual Storytelling';

export const UNIT_29_EXERCISES: Exercise[] = [
{
    id: 'c1-u29-g1', type: 'multiple-choice', level: 'C1', topic: 'nominalisation-arts', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Nominalisation in Arts Writing|Nominalización en escritura artística]]', instructions: 'Choose the sentence that best uses nominalisation.',
      questions: [{ question: 'Which sentence most effectively uses nominalisation for formal writing about photography?', options: ['[[The widespread dissemination of photographic images through digital networks has fundamentally altered our perception of events and undermined the photograph\'s traditional claim to evidentiary authority.|La amplia difusión de imágenes fotográficas a través de redes digitales ha alterado fundamentalmente nuestra percepción de los eventos y ha socavado la tradicional reclamación de la fotografía a la autoridad evidencial.]]', '[[Because photographs are disseminated widely through digital networks, we perceive events differently and the traditional idea that photographs provide reliable evidence has been undermined.|Porque las fotografías se difunden ampliamente a través de redes digitales, percibimos los eventos de manera diferente y la idea tradicional de que las fotografías proporcionan evidencia confiable ha sido socavada.]]', '[[Digital networks disseminate photographs widely, which means we perceive events differently now and photographs can no longer be trusted as evidence in the way they used to be.|Las redes digitales difunden fotografías ampliamente, lo que significa que percibimos los eventos de manera diferente ahora y las fotografías ya no pueden confiarse como evidencia de la manera en que solían.]]'], correctAnswer: 0, explanation: '"Dissemination" (from "disseminate"), "perception" (from "perceive"), "claim to authority" (from "claims to be authoritative") — nominalisation creates the dense, formal academic style of Option A.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u29-g2', type: 'fill-blank', level: 'C1', topic: 'nominalisation-arts', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Nominalisation Suffixes|Sufijos de nominalización]]', instructions: 'Convert the verb to its noun form.',
      questions: [{ question: 'The _______ (to manipulate) of photographic images has a history as long as photography itself, but digital technology has made it so seamless and accessible that the photograph\'s status as indexical evidence has been permanently compromised.', options: ['[[manipulation|manipulación]]', '[[manipulating|manipulación]]', '[[manipulated|manipulado]]'], correctAnswer: 'manipulation', acceptableAnswers: ['manipulation'], explanation: '"Manipulation" = noun from "manipulate" (suffix -ation). Nominalisation makes the process the grammatical subject, creating a formal impersonal tone.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u29-g3', type: 'multiple-choice', level: 'C1', topic: 'nominalisation-arts', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Nominalised Noun Phrases|Frases nominales nominalizadas]]', instructions: 'Choose the most formally appropriate sentence.',
      questions: [{ question: 'Which sentence uses nominalised noun phrases most effectively?', options: ['[[The democratisation of image production through smartphone technology has enabled the documentation of events previously inaccessible to professional photojournalists and transformed the relationship between witnessing and representation.|La democratización de la producción de imágenes a través de la tecnología smartphone ha permitido la documentación de eventos anteriormente inaccesibles a los fotorreporteros profesionales y ha transformado la relación entre presenciar y representar.]]', '[[Because smartphones have democratised the way people produce images, people can now document events that professional photojournalists could not previously access, and this has transformed how we represent things we witness.|Porque los smartphones han democratizado la manera en que las personas producen imágenes, las personas ahora pueden documentar eventos a los que los fotorreporteros profesionales no podían acceder anteriormente.]]', '[[Smartphones have made it democratic to produce images, so events can now be documented by people who are witnessing them even if they are professional photojournalists or not.|Los smartphones han hecho democrático producir imágenes, por lo que los eventos ahora pueden ser documentados por personas que los presencian incluso si son fotorreporteros profesionales o no.]]'], correctAnswer: 0, explanation: '"Democratisation of image production" (not "democratised the way people produce"), "documentation of events" (not "document events"), "the relationship between witnessing and representation" — three nominalisations in one sentence.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u29-v1', type: 'multiple-choice', level: 'C1', topic: 'photography-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Photography|Fotografía]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'A photograph\'s _______ quality — its capacity to show that something was actually present in front of the camera at the moment of exposure — is what traditionally distinguished it from painting and gave it its evidentiary authority.', options: ['[[indexical|indicial]]', '[[iconic|icónico]]', '[[symbolic|simbólico]]'], correctAnswer: 0, explanation: '"Indexical" = the semiotic term for a sign that is directly caused by or physically connected to its referent (light from a real object hitting a sensor). Distinguished from "iconic" (resembles) and "symbolic" (arbitrary connection).' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u29-v2', type: 'fill-blank', level: 'C1', topic: 'photography-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Photography Techniques|Técnicas fotográficas]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The technique of _______ — deliberately using a very shallow depth of field to blur the background while keeping the subject sharply in focus — is widely used in portraiture to isolate the subject and create an intimate, concentrated effect.', options: ['[[bokeh|bokeh]]', '[[bracketing|horquillado]]', '[[dodging|esquivar]]'], correctAnswer: 'bokeh', acceptableAnswers: ['bokeh'], explanation: '"Bokeh" = the aesthetic quality of the out-of-focus areas in a photograph, particularly the blurred background achieved with a wide aperture/shallow depth of field.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u29-v3', type: 'multiple-choice', level: 'C1', topic: 'photography-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Visual Storytelling|Narrativa visual]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'In photojournalism, the term _______ refers to the decisive fraction of a second — identified by Henri Cartier-Bresson — in which all the formal, emotional and narrative elements of an image align perfectly to produce a photograph of maximum communicative power.', options: ['[[the decisive moment|el momento decisivo]]', '[[the golden frame|el encuadre dorado]]', '[[the perfect shot|la toma perfecta]]'], correctAnswer: 0, explanation: '"The decisive moment" (L\'instant décisif) = Cartier-Bresson\'s concept of the ideal moment at which to capture an image. A foundational concept in street and documentary photography.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u29-r1', type: 'reading-comprehension', level: 'C1', topic: 'photography-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Photography and Truth|Fotografía y verdad]]', instructions: 'Read and answer.',
      questions: [{ question: 'Text: "Every photograph is a selection: the photographer chooses where to stand, what to include, what to exclude, when to press the shutter. This selection is never neutral — it is shaped by assumptions, intentions and the cultural context in which the image is made and read. To say that a photograph \'lies\' is, therefore, to misunderstand what photographs do: they do not lie; they frame. The question is always: whose framing, and in whose interest?"\n\nWhat does the author argue about photographs?', options: ['[[Photographs lie because digital manipulation allows photographers to alter images after they have been taken, removing any meaningful connection between the photograph and the reality it claims to represent.|Las fotografías mienten porque la manipulación digital permite a los fotógrafos alterar las imágenes después de tomarlas, eliminando cualquier conexión significativa entre la fotografía y la realidad que pretende representar.]]', '[[Photographs do not objectively record reality but are always framed by choices and cultural contexts — the important question being not whether a photograph tells the truth but whose perspective and interests it reflects.|Las fotografías no registran la realidad objetivamente sino que siempre están enmarcadas por elecciones y contextos culturales; la pregunta importante no es si una fotografía dice la verdad sino cuya perspectiva e intereses refleja.]]', '[[Photographs are essentially objective documents of reality — while individual photographs may be manipulated or misleadingly framed, the medium as a whole provides reliable evidence of events that would otherwise be unknown.|Las fotografías son esencialmente documentos objetivos de la realidad; aunque las fotografías individuales pueden ser manipuladas o enmarcadas de manera engañosa, el medio en su conjunto proporciona evidencia confiable de los eventos.]]'], correctAnswer: 1, explanation: 'The author argues photographs are not neutral — they "frame" rather than "lie" — and the critical question is "whose framing, and in whose interest?" — a power/perspective question.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u29-r2', type: 'multiple-choice', level: 'C1', topic: 'photography-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Photojournalism|Fotoperiodismo]]', instructions: 'Choose the best answer.',
      questions: [{ question: 'Text: "The ethics of photojournalism involve an irreducible tension between the imperative to bear witness and the obligation not to harm. To photograph human suffering is, in some sense, to exploit it — the photographer profits reputationally from pain they did not cause and may not be able to alleviate. Yet the alternative — not to document — may itself perpetuate harm, by rendering invisible the violence and injustice that the image might otherwise bring to public attention."\n\nWhat ethical tension does the text describe?', options: ['[[Photojournalists face a legal tension between their right to take photographs in public spaces and the privacy rights of the individuals who appear in their images without having given informed consent.|Los fotorreporteros enfrentan una tensión legal entre su derecho a tomar fotografías en espacios públicos y los derechos de privacidad de las personas que aparecen en sus imágenes sin haber dado consentimiento.]]', '[[Photographing human suffering involves a tension between the obligation to document and bear witness (making injustice visible) and the risk of exploiting the suffering of others for personal/professional gain.|Fotografiar el sufrimiento humano implica una tensión entre la obligación de documentar y atestiguar (hacer visible la injusticia) y el riesgo de explotar el sufrimiento de los demás para el beneficio personal/profesional.]]', '[[Photojournalists face a tension between representing events accurately and making photographs that are aesthetically compelling enough to attract the editorial attention needed to bring important stories to public awareness.|Los fotorreporteros enfrentan una tensión entre representar los eventos con precisión y hacer fotografías estéticamente convincentes suficientes para atraer la atención editorial necesaria.]]'], correctAnswer: 1, explanation: 'The text describes two poles: witnessing/documenting (making suffering visible) vs. exploiting (profiting from others\' pain). Not to document also harms by making violence invisible.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u29-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'photography-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Photography and Visual Storytelling), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u29-l1', type: 'listening-comprehension', level: 'C1', topic: 'photography-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Photography Seminar|Seminario de fotografía]]', instructions: 'Listen and choose the correct answer.',
      questions: [{ question: 'A photography theorist says: "We are producing more images in a single day now than were produced in the entire nineteenth century. Yet this explosion of image production has not led to an equivalent expansion of visual literacy — if anything, the reverse. We are surrounded by more images than at any point in human history, and yet our capacity to read them carefully, to ask where they come from and whose agenda they serve, has arguably diminished rather than grown."\n\nWhat is the theorist\'s main concern?', options: ['[[The massive increase in image production has saturated public attention and made it impossible for photojournalists and documentary photographers to have their most important images seen and understood.|El aumento masivo de la producción de imágenes ha saturado la atención pública y ha hecho imposible que los fotorreporteros y fotógrafos documentales tengan sus imágenes más importantes vistas y comprendidas.]]', '[[Despite unprecedented growth in the volume of images, visual literacy — the critical capacity to analyse images thoughtfully — has not grown proportionally and may actually have declined.|A pesar del crecimiento sin precedentes en el volumen de imágenes, la alfabetización visual, la capacidad crítica de analizar imágenes con reflexión, no ha crecido proporcionalmente y puede incluso haber disminuido.]]', '[[The quantity of images being produced is unsustainable and is creating a serious environmental problem because digital storage and transmission require enormous amounts of energy and physical resources.|La cantidad de imágenes que se producen es insostenible y está creando un grave problema ambiental porque el almacenamiento y la transmisión digital requieren enormes cantidades de energía y recursos físicos.]]'], correctAnswer: 1, explanation: 'The theorist contrasts the explosion in image quantity with the lack of growth (and possible decline) in visual literacy — the critical capacity to read images carefully and critically.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u29-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'photography-listening',
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
    id: 'c1-u29-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'photography-listening',
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
    id: 'c1-u29-w1', type: 'multiple-choice', level: 'C1', topic: 'critical-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Critical Analysis|Análisis crítico]]', instructions: 'Choose the best paragraph for a critical analysis of a photograph.',
      questions: [{ question: 'You are writing a critical analysis of Nick Ut\'s 1972 "Napalm Girl" photograph. Choose the most effective analytical paragraph:', options: ['[[The photograph\'s power derives from the intersection of several elements: the composition — the child central, arms outstretched, mouth open in a scream — functions as an almost classical pietà, investing the image with an iconographic weight that makes it immediately and universally legible as a representation of suffering. This legibility, however, is itself a construction: the photograph was selected, cropped and distributed precisely because it conformed to a visual vocabulary of civilian suffering already familiar to Western audiences.|El poder de la fotografía deriva de la intersección de varios elementos: la composición, con la niña en el centro, brazos extendidos, boca abierta en un grito, funciona como una pietà casi clásica, invistiendo la imagen con un peso iconográfico que la hace inmediata y universalmente legible como representación del sufrimiento.]]', '[[This photograph is very powerful and emotional. The child in the centre is screaming and this makes the viewer feel very sad. The composition is good and the photograph has become one of the most famous war photographs in history.|Esta fotografía es muy poderosa y emocional. La niña en el centro está gritando y esto hace que el espectador se sienta muy triste. La composición es buena y la fotografía se ha convertido en una de las fotografías de guerra más famosas de la historia.]]', '[[The photograph shows a Vietnamese girl running naked down a road after a napalm attack. It was taken by Nick Ut in 1972. It is considered one of the most important photographs of the Vietnam War and helped turn American public opinion against the war.|La fotografía muestra a una niña vietnamita corriendo desnuda por una carretera después de un ataque de napalm. Fue tomada por Nick Ut en 1972. Se considera una de las fotografías más importantes de la Guerra de Vietnam.]]'], correctAnswer: 0, explanation: 'Option A uses nominalisation ("the photograph\'s power"), specialist vocabulary ("pietà", "iconographic", "legible"), and a critical move that questions even the photograph\'s power as a construction.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u29-w2',
    type: 'writing',
    level: 'C1',
    topic: 'critical-writing',
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
    id: 'c1-u29-w3',
    type: 'writing',
    level: 'C1',
    topic: 'critical-writing',
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
