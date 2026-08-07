/**
 * C1 Unit 14 — Food, Gastronomy and Culture
 * Module 2: Society and Knowledge
 * Grammar: Subjunctive mood in formal English
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Food, Gastronomy and Culture';

export const UNIT_14_EXERCISES: Exercise[] = [
{
    id: 'c1-u14-g1', type: 'multiple-choice', level: 'C1', topic: 'subjunctive', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[The Subjunctive|El subjuntivo en inglés]]', instructions: 'Choose the correct subjunctive form.',
      questions: [{ question: 'The committee recommended that the food safety standards _______ revised immediately.', options: ['[[be|sean]]', '[[are|son]]', '[[were|fueran]]'], correctAnswer: 0, explanation: 'After verbs of recommendation/suggestion/demand + that-clause, use the bare infinitive (subjunctive): "that it be revised".' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u14-g2', type: 'fill-blank', level: 'C1', topic: 'subjunctive', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[The Subjunctive|El subjuntivo en inglés]]', instructions: 'Complete with the correct form.',
      questions: [{ question: 'It is essential that every chef _______ the provenance of the ingredients they use in their menu.', options: ['[[know|conozca]]', '[[knows|conoce]]', '[[is knowing|esté conociendo]]'], correctAnswer: 'know', acceptableAnswers: ['know'], explanation: '"It is essential that + subject + bare infinitive" = mandative subjunctive in formal English.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u14-g3', type: 'multiple-choice', level: 'C1', topic: 'subjunctive', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[The Subjunctive|El subjuntivo en inglés]]', instructions: 'Choose the correct option.',
      questions: [{ question: 'The regulation requires that all restaurant inspections _______ carried out quarterly without prior notice.', options: ['[[be|sean]]', '[[will be|serán]]', '[[are|son]]'], correctAnswer: 0, explanation: '"Require that + subject + be" = mandative subjunctive (passive form) after verbs of requirement/demand.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u14-v1', type: 'multiple-choice', level: 'C1', topic: 'gastronomy-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Food and Gastronomy|Gastronomía y alimentación]]', instructions: 'Choose the correct word.',
      questions: [{ question: 'The chef was praised for her remarkable ability to _______ traditional recipes with contemporary techniques, creating dishes that honoured the past while embracing innovation.', options: ['[[marry|casar/combinar]]', '[[merge|fusionar]]', '[[blend|mezclar]]'], correctAnswer: 0, explanation: '"Marry" (culinary use) = to combine two elements harmoniously so they complement each other perfectly.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u14-v2', type: 'fill-blank', level: 'C1', topic: 'gastronomy-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Food and Culture|Comida y cultura]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'Food is a powerful vehicle for cultural _______ — the transmission of identity, memory and shared values from one generation to the next through recipes, rituals and communal eating.', options: ['[[heritage|patrimonio]]', '[[tradition|tradición]]', '[[customs|costumbres]]'], correctAnswer: 'heritage', acceptableAnswers: ['heritage'], explanation: '"Cultural heritage" = traditions, practices and values passed down through generations, including food culture.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u14-v3', type: 'multiple-choice', level: 'C1', topic: 'gastronomy-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Food and Gastronomy|Gastronomía y alimentación]]', instructions: 'Choose the best word.',
      questions: [{ question: 'The term _______ refers to a chef\'s signature style — a distinctive philosophical and aesthetic approach to cooking that is recognisable across all their dishes.', options: ['[[culinary identity|identidad culinaria]]', '[[mise en place|mise en place]]', '[[cuisine|cocina]]'], correctAnswer: 0, explanation: '"Culinary identity" = a chef\'s or culture\'s distinctive approach to food, techniques and flavour combinations.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u14-r1', type: 'reading-comprehension', level: 'C1', topic: 'food-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Food and Identity|Comida e identidad]]', instructions: 'Read the extract and answer the question.',
      questions: [{ question: 'Text: "Culinary appropriation — the adoption of another culture\'s food practices without acknowledgement of their origins — sits in an uneasy position between cultural exchange and exploitation. The debate hinges on questions of power, context and acknowledgement: who is cooking whose food, under what conditions, and to whose benefit?"\n\nWhat is the central question in the debate about culinary appropriation?', options: ['[[Whether professional chefs should be permitted to cook dishes from cultures other than their own in their restaurants.|Si los chefs profesionales deberían tener permitido cocinar platos de culturas que no son las propias en sus restaurantes.]]', '[[Whether cooking food from another culture constitutes exchange or exploitation, depending on power dynamics and acknowledgement.|Si cocinar comida de otra cultura constituye intercambio o explotación, dependiendo de las dinámicas de poder y el reconocimiento.]]', '[[Whether traditional recipes should be legally protected from commercial use by people outside the originating culture.|Si las recetas tradicionales deben estar legalmente protegidas del uso comercial por personas ajenas a la cultura de origen.]]'], correctAnswer: 1, explanation: 'The text says the debate hinges on power, context and acknowledgement — i.e., whether adoption is exchange or exploitation.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u14-r2', type: 'multiple-choice', level: 'C1', topic: 'food-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Politics of Food|La política de los alimentos]]', instructions: 'Choose the best answer.',
      questions: [{ question: 'Text: "Food insecurity — the lack of reliable access to sufficient, affordable, nutritious food — affects hundreds of millions globally, yet it coexists with record levels of food waste in wealthy nations, highlighting a systemic failure in distribution rather than a fundamental shortage of supply."\n\nWhat does the text imply about food insecurity?', options: ['[[It is primarily caused by a global shortage of food production and insufficient agricultural output worldwide.|Se debe principalmente a una escasez global de producción alimentaria e insuficiente producción agrícola en todo el mundo.]]', '[[It results from unequal distribution systems rather than an absolute lack of food, as waste in rich countries demonstrates.|Se debe a sistemas de distribución desiguales más que a una falta absoluta de alimentos, como demuestra el desperdicio en los países ricos.]]', '[[It disproportionately affects developing countries due to inadequate technology and poor harvests caused by climate change.|Afecta desproporcionadamente a los países en desarrollo debido a tecnología inadecuada y malas cosechas causadas por el cambio climático.]]'], correctAnswer: 1, explanation: 'The text contrasts food insecurity with "record waste in wealthy nations", implying the problem is distribution, not supply.' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u14-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'food-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Food, Gastronomy and Culture), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u14-l1', type: 'listening-comprehension', level: 'C1', topic: 'food-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[Gastronomy and Identity|Gastronomía e identidad]]', instructions: 'Listen and choose the correct answer.',
      questions: [{ question: 'A food anthropologist says: "What we eat is never merely a matter of nutrition — it is a performance of identity, a declaration of belonging, and sometimes a quiet act of resistance against dominant cultural norms."\n\nWhat does the speaker suggest about the act of eating?', options: ['[[That people choose food primarily based on nutritional needs, cultural performances and social declarations of group identity.|Que la gente elige los alimentos principalmente en función de las necesidades nutricionales, las actuaciones culturales y las declaraciones sociales de identidad de grupo.]]', '[[That eating is a culturally loaded act that expresses who we are, where we belong and can even be a form of cultural defiance.|Que comer es un acto culturalmente cargado que expresa quiénes somos, dónde pertenecemos y puede incluso ser una forma de desafío cultural.]]', '[[That nutritional science and cultural performance are equally important in determining why individuals make the food choices they do.|Que la ciencia nutricional y la actuación cultural son igualmente importantes para determinar por qué los individuos hacen las elecciones alimentarias que hacen.]]'], correctAnswer: 1, explanation: 'The speaker identifies three roles of eating: identity, belonging, and resistance — all cultural, not primarily nutritional.' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u14-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'food-listening',
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
    id: 'c1-u14-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'food-listening',
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
    id: 'c1-u14-w1', type: 'multiple-choice', level: 'C1', topic: 'review-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Review Writing|Escritura de reseñas]]', instructions: 'Choose the most effective review paragraph at C1 level.',
      questions: [{ question: 'You are writing a restaurant review. Choose the paragraph that best demonstrates C1 writing skills:', options: ['[[The meal began promisingly with an amuse-bouche that showcased the kitchen\'s technical precision — a single oyster set in a vivid sea-green yuzu gel, its minerality playing beautifully against the sharp citrus. It set the tone for a tasting menu that was, throughout, more interested in conversation between ingredients than in culinary showmanship.|La comida comenzó prometedoramente con un amuse-bouche que mostró la precisión técnica de la cocina — una sola ostra colocada en un vívido gel de yuzu verde mar, cuya mineralidad jugaba maravillosamente con el cítrico agudo. Estableció el tono para un menú de degustación que estuvo, en todo momento, más interesado en la conversación entre ingredientes que en el virtuosismo culinario.]]', '[[The food was excellent and the service was very good. We started with an oyster dish which was very tasty and nicely presented. The main course was also very good. Overall it was a very enjoyable meal and I would recommend it to anyone who likes good food.|La comida era excelente y el servicio era muy bueno. Empezamos con un plato de ostras que estaba muy rico y bien presentado. El plato principal también era muy bueno. En general fue una comida muy agradable y lo recomendaría a cualquiera que le guste la buena comida.]]', '[[We went to the restaurant on Saturday. It was quite expensive but the food was okay. Some dishes were better than others. The oyster starter was interesting but strange. I think the chef is trying too hard to be creative and the result is not always successful.|Fuimos al restaurante el sábado. Era bastante caro pero la comida estaba bien. Algunos platos eran mejores que otros. El entrante de ostras era interesante pero extraño. Creo que el chef intenta demasiado ser creativo y el resultado no siempre tiene éxito.]]'], correctAnswer: 0, explanation: 'Option A uses specific sensory detail, sophisticated vocabulary and a critical metaphor ("conversation between ingredients") — characteristic of high-level review writing.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u14-w2',
    type: 'writing',
    level: 'C1',
    topic: 'review-writing',
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
    id: 'c1-u14-w3',
    type: 'writing',
    level: 'C1',
    topic: 'review-writing',
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
