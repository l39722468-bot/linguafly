/**
 * C1 Unit 45 — Development and Global Inequality
 * Module 8: Global Issues
 * Grammar: Expressing contrast (Whereas / While / On the other hand / Conversely / By contrast / Unlike)
 */

import { Exercise } from '@/lib/exercise-generator';

export const UNIT_TITLE = 'Development and Global Inequality';

export const UNIT_45_EXERCISES: Exercise[] = [
{
    id: 'c1-u45-g1', type: 'multiple-choice', level: 'C1', topic: 'contrast', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Whereas vs While|Mientras que / En cambio]]', instructions: 'Choose the sentence that uses contrast connectors most accurately.',
      questions: [{ question: 'Which sentence correctly uses "whereas" to express contrast?', options: ['[[Whereas the wealthiest quintile of the global population has seen its share of total income increase substantially over the past three decades, the poorest quintile has experienced only marginal gains in absolute terms — and in some regions, a deterioration in relative living standards.|Mientras que el quintil más rico de la población mundial ha visto aumentar sustancialmente su participación en el ingreso total durante las últimas tres décadas, el quintil más pobre ha experimentado solo ganancias marginales en términos absolutos.]]', '[[Whereas the wealthiest quintile of the global population has seen its share of total income increase substantially, whereas the poorest quintile has experienced only marginal gains and in some regions even a deterioration in living standards.|Mientras que el quintil más rico ha visto aumentar su participación en el ingreso total, mientras que el quintil más pobre ha experimentado solo ganancias marginales.]]', '[[The wealthiest quintile of the global population has seen its share of total income increase substantially, whereas conversely by contrast the poorest quintile has experienced only marginal gains in absolute terms.|El quintil más rico de la población mundial ha visto aumentar su participación en el ingreso total, mientras que por el contrario en comparación el quintil más pobre ha experimentado solo ganancias marginales.]]'], correctAnswer: 0, explanation: '"Whereas" introduces a contrasting clause — used once per sentence, not repeated. Option B duplicates "whereas". Option C combines multiple contrast markers redundantly.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u45-g2', type: 'fill-blank', level: 'C1', topic: 'contrast', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Conversely / By Contrast|Por el contrario / En contraste]]', instructions: 'Complete with the correct contrast connector.',
      questions: [{ question: 'Countries that invested heavily in primary education and preventive healthcare in the 1970s and 1980s — including South Korea, Taiwan and Costa Rica — achieved sustained economic growth and reduced inequality over the following decades. _______, countries that followed structural adjustment programmes mandating cuts to social expenditure during the same period generally experienced stagnating development indicators and rising inequality.', options: ['[[Conversely|Por el contrario]]', '[[Similarly|De manera similar]]', '[[Consequently|Consecuentemente]]'], correctAnswer: 'Conversely', acceptableAnswers: ['Conversely', 'By contrast', 'In contrast'], explanation: '"Conversely" introduces a contrasting statement that is the reverse or opposite of the preceding one. "Similarly" introduces parallel examples. "Consequently" introduces a result.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u45-g3', type: 'multiple-choice', level: 'C1', topic: 'contrast', difficulty: 'hard',
    content: { title: '[[Grammar|Gramática]]: [[Unlike / On the Other Hand|A diferencia de / Por otro lado]]', instructions: 'Choose the most accurate contrast structure.',
      questions: [{ question: 'Which sentence correctly uses "unlike" to establish a contrast in an academic context?', options: ['[[Unlike the dependency theory models that attributed underdevelopment primarily to external exploitation by wealthy nations, more recent institutional approaches place greater emphasis on domestic governance quality, property rights and the rule of law as determinants of long-run economic performance.|A diferencia de los modelos de teoría de la dependencia que atribuían el subdesarrollo principalmente a la explotación externa por parte de naciones ricas, los enfoques institucionales más recientes ponen mayor énfasis en la calidad de la gobernanza interna.]]', '[[Unlike dependency theory models attributed underdevelopment primarily to external exploitation, institutional approaches place greater emphasis on domestic governance quality and property rights.|A diferencia de los modelos de teoría de la dependencia atribuyeron el subdesarrollo principalmente a la explotación externa, los enfoques institucionales ponen mayor énfasis en la calidad de la gobernanza interna.]]', '[[Unlike dependency theory models, they attributed underdevelopment to external exploitation by wealthy nations. On the other hand institutional approaches emphasise domestic governance as the key determinant.|A diferencia de los modelos de teoría de la dependencia, atribuyeron el subdesarrollo a la explotación externa. Por otro lado los enfoques institucionales enfatizan la gobernanza interna.]]'], correctAnswer: 0, explanation: '"Unlike + noun phrase + comma + contrasting main clause" is correct. Option B drops the relative pronoun ("models that attributed"). Option C has a pronoun reference error and a punctuation fault.' }] },
    topicName: 'Grammar',
  },
{
    id: 'c1-u45-v1', type: 'multiple-choice', level: 'C1', topic: 'development-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Development Economics|Economía del desarrollo]]', instructions: 'Choose the correct term.',
      questions: [{ question: 'The composite index combining measures of life expectancy, education and per capita income — published annually by the United Nations to rank countries by overall levels of human wellbeing rather than by GDP alone — is the _______.', options: ['[[Human Development Index (HDI)|Índice de Desarrollo Humano (IDH)]]', '[[Gini coefficient|Coeficiente de Gini]]', '[[Gross National Income (GNI)|Ingreso Nacional Bruto (INB)]]'], correctAnswer: 0, explanation: '"HDI" = composite UNDP index combining life expectancy, education and income. "Gini coefficient" = a measure of income inequality distribution. "GNI" = total income earned by a country\'s residents, regardless of location.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u45-v2', type: 'fill-blank', level: 'C1', topic: 'development-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Inequality|Desigualdad]]', instructions: 'Complete the sentence.',
      questions: [{ question: 'The statistical measure used to quantify income or wealth distribution within a population — ranging from zero (perfect equality) to one (one person holds all income) — is known as the _______ coefficient, named after the Italian statistician who developed it in 1912.', options: ['[[Gini|Gini]]', '[[HDI|IDH]]', '[[DALY|AVAD]]'], correctAnswer: 'Gini', acceptableAnswers: ['Gini'], explanation: '"Gini coefficient" = the standard measure of inequality within a population. A coefficient of 0 = perfect equality; 1 = maximal inequality. Countries above 0.4 are generally considered highly unequal.' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u45-v3', type: 'multiple-choice', level: 'C1', topic: 'development-vocabulary', difficulty: 'hard',
    content: { title: '[[Vocabulary|Vocabulario]]: [[Aid and Trade|Ayuda y comercio]]', instructions: 'Choose the correct collocation.',
      questions: [{ question: 'The practice by which wealthy nations provide financial assistance to developing countries on the condition that the recipient country purchases goods and services from the donor country\'s own private sector — widely criticised for prioritising donor economic interests over recipient development needs — is known as _______ aid.', options: ['[[tied|ayuda condicionada / atada]]', '[[unconditional|incondicional]]', '[[bilateral|bilateral]]'], correctAnswer: 0, explanation: '"Tied aid" = development assistance conditional on procurement from donor country suppliers. Criticised as inefficient and donor-serving. "Unconditional aid" = no restrictions on use. "Bilateral aid" = government-to-government (does not specify conditionality).' }] },
    topicName: 'Vocabulary',
  },
{
    id: 'c1-u45-r1', type: 'reading', level: 'C1', topic: 'development-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[Aid Effectiveness|Eficacia de la ayuda]]', instructions: 'Read and answer.',
      passage: 'The debate over whether foreign aid promotes or retards economic development in recipient countries remains one of the most contested in development economics. Proponents argue that aid fills critical financing gaps for public investment in health, education and infrastructure that domestic revenues cannot cover, particularly in the least developed countries. Critics, by contrast, contend that aid creates a dependency relationship, distorts domestic political incentives, crowds out local private enterprise and undermines the accountability relationship between governments and their citizens. Unlike commercial flows, which generate demand signals aligned with market efficiency, aid allocation reflects donor strategic interests and domestic political pressures rather than the absorptive capacity or developmental priorities of recipients. On the other hand, to dismiss aid entirely ignores cases — such as global health initiatives targeting malaria, HIV/AIDS and tuberculosis — where targeted aid has demonstrably saved millions of lives at modest cost.',
      questions: [{ question: 'What argument do critics of foreign aid make about its political effects?', options: ['[[Aid creates a dependency relationship, distorts domestic political incentives, crowds out local enterprise and undermines the accountability relationship between governments and their citizens.|La ayuda crea una relación de dependencia, distorsiona los incentivos políticos internos, desplaza a la empresa local y socava la relación de rendición de cuentas entre los gobiernos y sus ciudadanos.]]', '[[Critics argue that foreign aid is allocated too selectively, focusing on strategic interests of donors rather than on the countries with the greatest humanitarian need and the lowest per capita income.|Los críticos argumentan que la ayuda exterior se asigna de manera demasiado selectiva, centrándose en los intereses estratégicos de los donantes en lugar de en los países con mayor necesidad humanitaria.]]', '[[The main criticism is that foreign aid is insufficient in volume, representing too small a proportion of donor country GDP to generate the transformative development impact that would justify its continuation.|La crítica principal es que la ayuda exterior es insuficiente en volumen, representando una proporción demasiado pequeña del PIB del país donante como para generar el impacto de desarrollo transformador que justificaría su continuación.]]'], correctAnswer: 0, explanation: 'The text says critics "contend that aid creates a dependency relationship, distorts domestic political incentives, crowds out local private enterprise and undermines the accountability relationship between governments and their citizens".' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u45-r2', type: 'reading', level: 'C1', topic: 'development-reading', difficulty: 'hard',
    content: { title: '[[Reading|Lectura]]: [[The Resource Curse|La maldición de los recursos]]', instructions: 'Read and answer.',
      passage: 'One of the most paradoxical findings in development economics is the so-called "resource curse": the observation that countries with abundant natural resource wealth — particularly oil and minerals — tend to perform worse on development indicators than comparably situated countries without such endowments. Whereas countries like Norway and Botswana have managed their resource revenues transparently and invested them in sovereign wealth funds and public services, by contrast many resource-rich developing countries have experienced authoritarian governance, institutional degradation, ethnic conflict and economic stagnation. The mechanisms proposed to explain this paradox include Dutch Disease — the appreciation of the exchange rate that damages non-resource export competitiveness — as well as the political economy of rentierism: the tendency of governments that derive revenue from natural resources rather than taxation to be less accountable to their citizens, investing less in institutions, education and diversification.',
      questions: [{ question: 'What is the "resource curse" and what mechanisms does the text propose to explain it?', options: ['[[The paradox that resource-rich countries often perform worse on development indicators; explained by Dutch Disease (exchange rate appreciation harming export competitiveness) and rentierism (resource revenues reducing government accountability to citizens).|La paradoja de que los países ricos en recursos a menudo tienen peores indicadores de desarrollo; explicada por la Enfermedad Holandesa (apreciación del tipo de cambio que perjudica la competitividad exportadora) y el rentismo (los ingresos por recursos reducen la rendición de cuentas del gobierno).]]', '[[The resource curse refers to the environmental damage caused by intensive natural resource extraction in developing countries, including deforestation, water pollution and soil degradation that undermine long-term agricultural productivity.|La maldición de los recursos se refiere al daño ambiental causado por la extracción intensiva de recursos naturales en países en desarrollo, incluyendo deforestación, contaminación del agua y degradación del suelo.]]', '[[The resource curse describes how foreign multinationals extract natural resource wealth from developing countries without reinvesting in local economies, creating structural dependence and preventing industrial diversification.|La maldición de los recursos describe cómo las multinacionales extranjeras extraen riqueza de recursos naturales de los países en desarrollo sin reinvertir en las economías locales.]]'], correctAnswer: 0, explanation: 'The text defines the resource curse as resource-rich countries performing worse on development, and explains it via Dutch Disease (exchange rate appreciation) and rentierism (reduced accountability).' }] },
    topicName: 'Reading',
  },
{
    id: 'c1-u45-r3',
    type: 'reading-comprehension',
    level: 'C1',
    topic: 'development-reading',
    difficulty: 'hard',
    content: {
      title: '[[Reading|Lectura]]: [[Follow-up|Seguimiento]]',
      instructions: 'Read and answer.',
      questions: [
        {
          question:
            'Text: "Returning to the core theme of this unit (Development and Global Inequality), learners benefit from comparing how different authors frame the same underlying issue."\n\nThe text recommends:',
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
    id: 'c1-u45-l1', type: 'listening', level: 'C1', topic: 'development-listening', difficulty: 'hard',
    content: { title: '[[Listening|Comprensión auditiva]]: [[A Debate on Global Trade|Un debate sobre el comercio mundial]]', instructions: 'Read the transcript and answer.',
      passage: 'Economist A: The evidence on trade and development is unambiguous: countries that opened their economies to trade grew faster than those that maintained protectionist policies. Whereas East Asian economies that embraced export-led growth achieved spectacular development outcomes, by contrast Latin American countries that pursued import substitution industrialisation for decades stagnated. Economist B: I would challenge that framing. While it is true that some export-oriented economies thrived, the conditions that made that possible — undervalued exchange rates, industrial policy, state investment in education — are precisely what the Washington Consensus then forbade other developing countries from replicating. Unlike the East Asian tigers, countries that followed IMF prescriptions in the 1980s and 1990s were denied the policy space to replicate that model. Economist A: A fair point. The mechanism matters as much as the outcome. On the other hand, I would argue that the correlation between openness and growth holds even when controlling for policy context.',
      questions: [{ question: 'What is Economist B\'s main challenge to Economist A\'s argument?', options: ['[[The conditions that made East Asian export-led growth successful — undervalued exchange rates, industrial policy, state investment in education — were precisely what the Washington Consensus forbade other developing countries from replicating.|Las condiciones que hicieron exitoso el crecimiento orientado a las exportaciones de Asia Oriental fueron precisamente lo que el Consenso de Washington impidió a otros países en desarrollo replicar.]]', '[[Economist B argues that the East Asian development model was unique to the cultural and institutional context of those societies and cannot be replicated in other developing regions regardless of policy choices.|El economista B argumenta que el modelo de desarrollo de Asia Oriental era único para el contexto cultural e institucional de esas sociedades y no puede replicarse en otras regiones en desarrollo.]]', '[[The main challenge is that free trade is fundamentally incompatible with human rights and labour standards, and that any development model based on export competitiveness necessarily relies on the exploitation of low-wage workers.|El desafío principal es que el libre comercio es fundamentalmente incompatible con los derechos humanos y las normas laborales.]]'], correctAnswer: 0, explanation: 'Economist B says the conditions enabling East Asian success — undervalued exchange rates, industrial policy, state education investment — "are precisely what the Washington Consensus then forbade other developing countries from replicating".' }] },
    topicName: 'Listening',
  },
{
    id: 'c1-u45-l2',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'development-listening',
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
    id: 'c1-u45-l3',
    type: 'listening-comprehension',
    level: 'C1',
    topic: 'development-listening',
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
    id: 'c1-u45-w1', type: 'writing', level: 'C1', topic: 'development-writing', difficulty: 'hard',
    content: { title: '[[Writing|Escritura]]: [[Contrast in Academic Arguments|Contraste en argumentos académicos]]', instructions: 'Which response uses contrast structures most effectively in academic writing?',
      questions: [{ question: 'Task: Write two sentences contrasting different approaches to reducing global inequality.', options: ['[[Whereas redistribution-focused approaches argue that inequality can only be addressed through progressive taxation, social transfers and investment in public services — policies that directly reduce the gap between the highest and lowest earners within and across countries — growth-oriented approaches contend that raising absolute living standards through economic expansion is more feasible and ultimately more beneficial than redistribution; by contrast, the empirical literature suggests that beyond a certain threshold, high inequality itself retards the very growth that market liberals claim will resolve it.|Mientras que los enfoques centrados en la redistribución argumentan que la desigualdad solo puede abordarse mediante impuestos progresivos, transferencias sociales e inversión en servicios públicos, los enfoques orientados al crecimiento sostienen que elevar los niveles de vida absolutos es más factible; por el contrario, la literatura empírica sugiere que la alta desigualdad en sí misma frena el crecimiento.]]', '[[Whereas redistribution is good, growth is also important. On the other hand, some countries have done both. By contrast, others have focused only on one approach. The evidence is mixed and there is no single answer to the question of inequality.|Mientras que la redistribución es buena, el crecimiento también es importante. Por otro lado, algunos países han hecho ambas cosas.]]', '[[While inequality is a big problem, it is hard to solve. Unlike rich countries, poor countries have fewer resources. Conversely, some developing countries have reduced inequality. On the other hand, others have not managed to do so despite trying for many years.|Aunque la desigualdad es un gran problema, es difícil de resolver. A diferencia de los países ricos, los países pobres tienen menos recursos.]]'], correctAnswer: 0, explanation: 'Option A uses "Whereas" (subordinate contrast), "by contrast" (sentence connector), and embeds a sophisticated argument about the relationship between equality and growth — formal register throughout.' }] },
    topicName: 'Writing',
  },
{
    id: 'c1-u45-w2',
    type: 'writing',
    level: 'C1',
    topic: 'development-writing',
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
    id: 'c1-u45-w3',
    type: 'writing',
    level: 'C1',
    topic: 'development-writing',
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
