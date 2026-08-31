#!/usr/bin/env python3
"""Generate B1 Units 36–40 exercise workbooks + TTS."""
from pathlib import Path
from gtts import gTTS

OUT = Path("src/content/blog/curso-b1")
ROOT = Path(__file__).resolve().parents[1]
DATE = "2026-08-31"

LISTEN = {
    36: "Hi, I am Amy. I'm so tired today. It was such a nice day. There is so much work. There are so many people. This hotel is so expensive.",
    37: "Hi, I am Ben. We booked a two-day trip. She's a 20-year-old student. We stayed in a well-known hotel. It was a long-distance flight. He's an open-minded traveller.",
    38: "Hi, I am Carl. Although it was raining, we went out. I like the idea. However, it's expensive. Even though I disagree, I respect you. Despite the delay, we arrived on time.",
    39: "Hi, I am Dana. I study English to travel more. We left early in order to avoid traffic. I called so that you wouldn't worry. We stayed inside because of the storm. The delay was due to the weather.",
    40: "Hi, I am Eva. It was such a long journey. We took a two-day trip. Although I was tired, I went out. I left early to catch the train. We stayed in because of the rain.",
}

READ = {
    36: "I'm so tired today. It was such a nice day. There is so much work. There are so many people. This hotel is so expensive.",
    37: "We booked a two-day trip. She's a 20-year-old student. We stayed in a well-known hotel. It was a long-distance flight. He's an open-minded traveller.",
    38: "Although it was raining, we went out. I like the idea. However, it's expensive. Even though I disagree, I respect you. Despite the delay, we arrived on time.",
    39: "I study English to travel more. We left early in order to avoid traffic. I called so that you wouldn't worry. We stayed inside because of the storm. The delay was due to the weather.",
    40: "It was such a long journey. We took a two-day trip. Although I was tired, I went out. I left early to catch the train. We stayed in because of the rain.",
}

META = {
    36: dict(slug="unidad-36-so-such-intensifiers", title="So/Such & Intensifiers", full="So, Such, So Much, So Many & Intensifiers", focus="so/such/so much/so many + intensifiers", vocab="intensifiers", image="/blog/curso-b1/unit-36/so-such.png", prev="unidad-35-repaso-31-34-ejercicios-soluciones", next_t="unidad-37-compound-adjectives-travel", r_title="So tired", l_title="Amy on intensifiers", kw=["so such ejercicios", "so much so many", "intensifiers vocabulary"]),
    37: dict(slug="unidad-37-compound-adjectives-travel", title="Compound Adjectives & Travel", full="Compound Adjectives & Travel", focus="compound adjectives (two-day, 20-year-old…)", vocab="travel & descriptions", image="/blog/curso-b1/unit-37/compound-adjectives.png", prev="unidad-36-so-such-intensifiers-ejercicios-soluciones", next_t="unidad-38-contrast-opinions", r_title="Two-day trip", l_title="Ben on travel", kw=["compound adjectives ejercicios", "two-day trip", "travel vocabulary"]),
    38: dict(slug="unidad-38-contrast-opinions", title="Contrast & Opinions", full="Clauses of Contrast & Opinions", focus="although/however/despite + opinions", vocab="opinions", image="/blog/curso-b1/unit-38/contrast.png", prev="unidad-37-compound-adjectives-travel-ejercicios-soluciones", next_t="unidad-39-purpose-reason-explaining", r_title="Despite the delay", l_title="Carl on contrast", kw=["although however ejercicios", "despite in spite of", "opinions vocabulary"]),
    39: dict(slug="unidad-39-purpose-reason-explaining", title="Purpose & Reason", full="Purpose & Reason + Explaining", focus="to/so that/because of + explaining", vocab="explaining", image="/blog/curso-b1/unit-39/purpose-reason.png", prev="unidad-38-contrast-opinions-ejercicios-soluciones", next_t="unidad-40-repaso-36-39", r_title="Why we left early", l_title="Dana explaining", kw=["purpose reason ejercicios", "so that because of", "explaining vocabulary"]),
    40: dict(slug="unidad-40-repaso-36-39", title="Repaso 36–39", full="Repaso 36–39: So/Such, Compounds, Contrast, Purpose", focus="so/such, compounds, contrast y purpose/reason (mix U36–39)", vocab="intensifiers, travel, opinions, explaining (mix)", image="/blog/curso-b1/unit-40/review-map.png", prev="unidad-39-purpose-reason-explaining-ejercicios-soluciones", next_t="unidad-36-so-such-intensifiers", r_title="Mixed review", l_title="Eva's mixed review", kw=["repaso B1 36-39", "so such review", "contrast purpose review"]),
}

GRAM = {
    36: {"a": [("I'm ___ tired.", "so / such / such a", "so"), ("It was ___ nice day.", "such a / so / such", "such a"), ("There is ___ work.", "so much / so many / so", "so much"), ("There are ___ people.", "so many / so much / so", "so many"), ("This hotel is ___ expensive.", "so / such / such a", "so")],
         "b": [("so + ___", "adjective / noun / verb", "adjective"), ("such (+ a/an) + ___", "adj + noun / only adj / verb", "adj + noun"), ("so much + ___", "uncountable / countable / plural", "uncountable"), ("so many + ___", "countable plural / uncountable / adj", "countable plural"), ("extremely ≈ ___", "very strong / weak / noun", "very strong")],
         "c": [("*I'm such tired.*", "I'm **so** tired."), ("*It was so nice day.*", "It was **such a** nice day."), ("*There is so many work.*", "There is **so much** work."), ("*There are so much people.*", "There are **so many** people."), ("*such expensive hotel* (no noun)", "**such an** expensive hotel / **so** expensive")]},
    37: {"a": [("a ___ trip (2 days)", "two-day / two-days / two day", "two-day"), ("a ___ student (20 years)", "20-year-old / 20-years-old / 20 year old", "20-year-old"), ("a ___ hotel", "well-known / well known / well-knowns", "well-known"), ("a ___ flight", "long-distance / long distance / long-distances", "long-distance"), ("an ___ traveller", "open-minded / open minded / open-mind", "open-minded")],
         "b": [("Compound before noun needs ___", "hyphen / plural / comma", "hyphen"), ("a five-star hotel (not ___)", "five-stars / five-star / five star", "five-stars"), ("number + noun in compound → ___ form", "singular / plural / verb", "singular"), ("well-known describes ___", "fame / feeling / purpose", "fame"), ("two-day modifies ___", "trip / travels / travelling", "trip")],
         "c": [("*a two-days trip*", "a **two-day** trip"), ("*a 20-years-old student*", "a **20-year-old** student"), ("*a well known hotel* (adj before noun)", "a **well-known** hotel"), ("*a long distance flight* (compound adj)", "a **long-distance** flight"), ("*five-stars hotel*", "a **five-star** hotel")]},
    38: {"a": [("___ it was raining, we went out.", "Although / However / Despite", "Although"), ("I like it. ___, it's expensive.", "However / Although / Despite", "However"), ("___ I disagree, I respect you.", "Even though / However / Despite", "Even though"), ("___ the delay, we arrived.", "Despite / Although / However", "Despite"), ("Though ≈ ___", "Although / However / Because of", "Although")],
         "b": [("although + ___", "clause / noun only / comma phrase", "clause"), ("however position", "new sentence / mid-clause like although / before noun", "new sentence"), ("despite + ___", "noun/-ing / full clause / verb", "noun/-ing"), ("even though ≈ ___", "although (stronger) / however / so that", "although (stronger)"), ("In spite of ≈ ___", "despite / although / however", "despite")],
         "c": [("*However it was raining, we went.*", "**Although** it was raining… / However, **it was raining.** (new sentence)"), ("*Although, it's expensive.* (second clause)", "I like it. **However**, it's expensive."), ("*Despite it was raining* (clause)", "**Despite the rain** / **Despite it raining**"), ("*Even though I disagree, however I respect.*", "Even though… (no however in same link)"), ("*Although the delay, we arrived.*", "**Despite the delay** / **Although there was a delay**")]},
    39: {"a": [("I study English ___ travel more.", "to / so that / because of", "to"), ("We left early ___ avoid traffic.", "in order to / because of / so that", "in order to"), ("I called ___ you wouldn't worry.", "so that / to / because of", "so that"), ("We stayed inside ___ the storm.", "because of / because / to", "because of"), ("The delay was ___ the weather.", "due to / so that / although", "due to")],
         "b": [("to / in order to + ___", "infinitive / clause / noun", "infinitive"), ("so that + ___", "clause (subject+verb) / infinitive / noun", "clause (subject+verb)"), ("because + ___", "clause / noun / infinitive", "clause"), ("because of + ___", "noun / clause / verb", "noun"), ("due to ≈ ___", "because of / because / so that", "because of")],
         "c": [("*I study to that I travel.*", "I study **to** travel / **so that** I can travel."), ("*We left early to we avoid traffic.*", "We left early **in order to** avoid… / **so that** we could avoid…"), ("*I called to you wouldn't worry.*", "I called **so that** you wouldn't worry."), ("*We stayed because the storm.*", "We stayed **because of** the storm / **because** it was stormy."), ("*due to it was raining* (clause)", "**due to the rain** / **because** it was raining")]},
    40: {"a": [("It was ___ long journey.", "such a / so / such", "such a"), ("a ___ trip (2 days)", "two-day / two-days / two day", "two-day"), ("___ I was tired, I went out.", "Although / However / Despite", "Although"), ("I left early ___ catch the train.", "to / because of / although", "to"), ("We stayed in ___ the rain.", "because of / so that / however", "because of")],
         "b": [("so/such → ___", "intensifiers / contrast / purpose", "intensifiers"), ("two-day → ___", "compound adj / tag / because", "compound adj"), ("although → ___", "contrast / intensifier / purpose", "contrast"), ("to catch → ___", "purpose / contrast / compound", "purpose"), ("because of → ___", "reason / intensifier / compound", "reason")],
         "c": [("*so long journey*", "**such a** long journey"), ("*two-days trip*", "**two-day** trip"), ("*However I was tired, I went.*", "**Although** I was tired…"), ("*I left early because of catch the train.*", "I left early **to** catch…"), ("*We stayed in although the rain.*", "We stayed in **because of** the rain")]},
}

VOCAB = {
    36: {"a": [("extremely", "extremadamente · fairly · delay", "extremadamente"), ("incredibly", "increíblemente · passport · although", "increíblemente"), ("quite", "bastante · luggage · despite", "bastante"), ("absolutely", "totalmente · scenic · so that", "totalmente"), ("really", "realmente · booking · compound", "realmente")],
         "b": [("very ≈ ___", "muy / causa / guion", "muy"), ("intensifier → ___", "strength / noun / hyphen", "strength"), ("so + ___", "adj / noun / verb", "adj"), ("such + ___", "noun phrase / only adj / verb", "noun phrase"), ("fairly ≈ ___", "bastante / total / retraso", "bastante")]},
    37: {"a": [("luggage", "equipaje · extremely · although", "equipaje"), ("delay", "retraso · incredibly · however", "retraso"), ("destination", "destino · quite · purpose", "destino"), ("passport", "pasaporte · absolutely · so that", "pasaporte"), ("scenic", "panorámico · really · disagree", "panorámico")],
         "b": [("flight ≈ ___", "vuelo / opinión / intensidad", "vuelo"), ("journey ≈ ___", "viaje / causa / contraste", "viaje"), ("booking ≈ ___", "reserva / guion / although", "reserva"), ("crowded ≈ ___", "abarrotado / propósito / such", "abarrotado"), ("resort ≈ ___", "resort/complejo / retraso / so", "resort/complejo")]},
    38: {"a": [("agree", "estar de acuerdo · luggage · so", "estar de acuerdo"), ("disagree", "no estar de acuerdo · delay · such", "no estar de acuerdo"), ("opinion", "opinión · passport · two-day", "opinión"), ("convincing", "convincente · scenic · to", "convincente"), ("fair", "justo · booking · because of", "justo")],
         "b": [("point of view ≈ ___", "punto de vista / retraso / guion", "punto de vista"), ("support ≈ ___", "apoyar / equipaje / intensidad", "apoyar"), ("doubt ≈ ___", "duda / destino / compound", "duda"), ("unfair ≈ ___", "injusto / vuelo / purpose", "injusto"), ("in my view ≈ ___", "en mi opinión / crowded / so much", "en mi opinión")]},
    39: {"a": [("purpose", "propósito · agree · so", "propósito"), ("cause", "causa · disagree · such", "causa"), ("explain", "explicar · opinion · two-day", "explicar"), ("goal", "objetivo · convincing · although", "objetivo"), ("therefore", "por lo tanto · fair · however", "por lo tanto")],
         "b": [("reason ≈ ___", "razón / retraso / guion", "razón"), ("result ≈ ___", "resultado / equipaje / intensidad", "resultado"), ("so (result) ≈ ___", "así que / destino / compound", "así que"), ("in order to ≈ ___", "para / pasaporte / contraste", "para"), ("due to ≈ ___", "debido a / scenic / so many", "debido a")]},
    40: {"a": [("so/such/so much/many", "intensifiers · only contrast", "intensifiers"), ("two-day / well-known", "compounds · only tags", "compounds"), ("although/however/despite", "contrast · only purpose", "contrast"), ("to/so that/because of", "purpose/reason · only compounds", "purpose/reason"), ("extremely / luggage / agree / purpose", "vocab mix · wrong", "vocab mix")],
         "b": [("such a → ___", "intensifier / compound / contrast", "intensifier"), ("hyphen in compound?", "Yes / No / Only contrast", "Yes"), ("however links clauses?", "No (new sentence) / Yes like although / Always", "No (new sentence)"), ("so that + clause?", "Yes / No / Only noun", "Yes"), ("because of + noun?", "Yes / No / Only infinitive", "Yes")]},
}

def rq(u):
    bases = {
        36: [("I'm ___ tired", "so", "so / such"), ("___ nice day", "such a", "such a / so"), ("___ work (uncountable)", "so much", "so much / so many"), ("___ people (countable)", "so many", "so many / so much"), ("Hotel ___ expensive", "so", "so / such"), ("Main grammar?", "so/such", "so/such / although"), ("Find so + adj", "so tired / so expensive", "(open)"), ("Find such a", "such a nice day", "(open)"), ("Find so much/many", "so much work / so many people", "(open)"), ("Write so + adj…", "Model OK", "(open)"), ("Intensifier vocab?", "extremely, really, quite, absolutely", "yes / none"), ("so + noun OK?", "False", "False / True"), ("Course", "/curso-b1/unit-36", "/curso-b1/unit-36"), ("so much + countable?", "No", "No / Yes"), ("Open Ver solución", "yes", "yes")],
        37: [("Trip length?", "two days", "two days / two-day"), ("Student age?", "20-year-old", "20-year-old / 20-years"), ("Hotel type?", "well-known", "well-known / well known"), ("Flight type?", "long-distance", "long-distance / long distance"), ("Traveller type?", "open-minded", "open-minded / open minded"), ("Main grammar?", "compound adjectives", "compounds / contrast"), ("Find two-day", "two-day trip", "(open)"), ("Find 20-year-old", "20-year-old student", "(open)"), ("Find well-known", "well-known hotel", "(open)"), ("Write compound…", "Model OK", "(open)"), ("Travel vocab?", "luggage, delay, destination, passport", "yes / none"), ("five-stars OK?", "False", "False / True"), ("Course", "/curso-b1/unit-37", "/curso-b1/unit-37"), ("Hyphen needed?", "Yes before noun", "Yes / No"), ("Open Ver solución", "yes", "yes")],
        38: [("Raining but went out?", "Although", "Although / However"), ("Like it but expensive?", "However", "However / Although"), ("Disagree but respect?", "Even though", "Even though / Despite"), ("Despite ___", "the delay", "delay / although"), ("Arrived on time?", "Yes", "Yes / No"), ("Main grammar?", "contrast", "contrast / purpose"), ("Find although", "Although it was raining", "(open)"), ("Find however", "However, it's expensive", "(open)"), ("Find despite", "Despite the delay", "(open)"), ("Write although…", "Model OK", "(open)"), ("Opinions vocab?", "agree, disagree, opinion", "yes / none"), ("despite + clause OK?", "False", "False / True"), ("Course", "/curso-b1/unit-38", "/curso-b1/unit-38"), ("however = although?", "No", "No / Yes"), ("Open Ver solución", "yes", "yes")],
        39: [("Study English why?", "to travel", "to travel / because of"), ("Left early why?", "avoid traffic", "avoid traffic / the storm"), ("Called why?", "so that you wouldn't worry", "so that / because of"), ("Stayed inside why?", "because of the storm", "storm / although"), ("Delay due to?", "the weather", "weather / however"), ("Main grammar?", "purpose/reason", "purpose / contrast"), ("Find to + inf", "to travel more", "(open)"), ("Find in order to", "in order to avoid", "(open)"), ("Find so that", "so that you wouldn't", "(open)"), ("Write because of…", "Model OK", "(open)"), ("Explaining vocab?", "purpose, cause, explain", "yes / none"), ("because of + clause?", "False", "False / True"), ("Course", "/curso-b1/unit-39", "/curso-b1/unit-39"), ("so that + infinitive?", "No (clause)", "No / Yes"), ("Open Ver solución", "yes", "yes")],
        40: [("Journey type?", "such a long", "such a / so"), ("Trip length compound?", "two-day", "two-day / two-days"), ("Tired but went out?", "Although", "Although / However"), ("Left early to?", "catch the train", "catch / because of"), ("Stayed in because?", "rain", "rain / however"), ("Classify such a", "intensifier", "intensifier / compound"), ("Classify two-day", "compound", "compound / contrast"), ("Classify although", "contrast", "contrast / purpose"), ("Classify to catch", "purpose", "purpose / intensifier"), ("Classify because of", "reason", "reason / contrast"), ("Write 1× each", "Model OK", "(open)"), ("Mixed?", "Yes", "Yes / No"), ("Course", "/curso-b1/unit-40", "/curso-b1/unit-40"), ("Module 4 complete?", "Yes", "Yes / No"), ("Open Ver solución", "yes", "yes")],
    }
    return bases[u]

LISTEN_Q = {
    36: [("Who speaks?", "Amy", "Amy / Ben / Eva"), ("I'm ___ tired", "so", "so / such"), ("___ nice day", "such a", "such a / so"), ("___ work", "so much", "so much / so many"), ("___ people", "so many", "so many / so much"), ("Hotel ___ expensive", "so", "so / such"), ("Grammar?", "so/such", "so/such / although"), ("Find so + adj", "so tired / so expensive", "(open)"), ("Find such a", "such a nice day", "(open)"), ("Write so…", "Model OK", "(open)"), ("Intensifiers?", "extremely, really, quite", "yes / none"), ("Shadow", "done", "(open)"), ("so + noun?", "False", "False / True"), ("Course", "/curso-b1/unit-36", "/curso-b1/unit-36"), ("Open Ver solución", "yes", "yes")],
    37: [("Who speaks?", "Ben", "Ben / Amy / Carl"), ("Trip?", "two-day", "two-day / two-days"), ("Student?", "20-year-old", "20-year-old / 20-years"), ("Hotel?", "well-known", "well-known / well known"), ("Flight?", "long-distance", "long-distance / long distance"), ("Traveller?", "open-minded", "open-minded / open minded"), ("Grammar?", "compounds", "compounds / contrast"), ("Find two-day", "two-day trip", "(open)"), ("Find well-known", "well-known hotel", "(open)"), ("Write compound…", "Model OK", "(open)"), ("Travel words?", "luggage, delay, flight", "yes / none"), ("Shadow", "done", "(open)"), ("five-stars?", "False", "False / True"), ("Course", "/curso-b1/unit-37", "/curso-b1/unit-37"), ("Open Ver solución", "yes", "yes")],
    38: [("Who speaks?", "Carl", "Carl / Dana / Ben"), ("Raining but out?", "Although", "Although / However"), ("Like but expensive?", "However", "However / Although"), ("Disagree but respect?", "Even though", "Even though / Despite"), ("Despite ___", "the delay", "delay / although"), ("Arrived on time?", "Yes", "Yes / No"), ("Grammar?", "contrast", "contrast / purpose"), ("Find although", "Although it was raining", "(open)"), ("Find however", "However, it's expensive", "(open)"), ("Write despite…", "Model OK", "(open)"), ("Opinions?", "agree, disagree", "yes / none"), ("Shadow", "done", "(open)"), ("despite + clause?", "False", "False / True"), ("Course", "/curso-b1/unit-38", "/curso-b1/unit-38"), ("Open Ver solución", "yes", "yes")],
    39: [("Who speaks?", "Dana", "Dana / Eva / Amy"), ("Study to?", "travel more", "travel / delay"), ("Left early to?", "avoid traffic", "avoid traffic / rain"), ("Called so that?", "you wouldn't worry", "worry / disagree"), ("Stayed because of?", "the storm", "storm / compound"), ("Delay due to?", "the weather", "weather / opinion"), ("Grammar?", "purpose/reason", "purpose / contrast"), ("Find to travel", "to travel more", "(open)"), ("Find in order to", "in order to avoid", "(open)"), ("Write so that…", "Model OK", "(open)"), ("Explaining?", "purpose, cause", "yes / none"), ("Shadow", "done", "(open)"), ("because of + clause?", "False", "False / True"), ("Course", "/curso-b1/unit-39", "/curso-b1/unit-39"), ("Open Ver solución", "yes", "yes")],
    40: [("Who speaks?", "Eva", "Eva / Dana / Carl"), ("Journey?", "such a long", "such a / so"), ("Trip?", "two-day", "two-day / two-days"), ("Tired but out?", "Although", "Although / However"), ("Left early to?", "catch the train", "catch / despite"), ("Stayed because of?", "the rain", "rain / however"), ("Classify such a", "intensifier", "intensifier / compound"), ("Classify two-day", "compound", "compound / contrast"), ("Classify although", "contrast", "contrast / purpose"), ("Classify to catch", "purpose", "purpose / so"), ("Write 1× each", "Model OK", "(open)"), ("Shadow", "done", "(open)"), ("Mixed?", "Yes", "Yes / No"), ("Course", "/curso-b1/unit-40", "/curso-b1/unit-40"), ("Open Ver solución", "yes", "yes")],
}

WRITE = {
    36: (["Escribe 2× so + adj + 2× such a + noun.", "Completa: I'm ___ tired.", "Completa: It was ___ nice day.", "Completa: There is ___ work.", "Completa: There are ___ people.", "Corrige: *I'm such tired.*", "Corrige: *so many work.*", "Usa extremely y really en 2 frases con so/such.", "Escribe: This hotel is so expensive.", "Mini-diálogo (3 frases) con so/such.", "Traduce: Estoy tan cansado.", "Traduce: Fue un día tan bonito.", "Explica so vs such en 1 frase.", "Escribe 1× so many + countable.", "Autochequeo: adj→so; noun→such."],
         ["Open 2+2.", "**so**", "**such a**", "**so much**", "**so many**", "**so** tired", "**so much** work", "Open.", "OK.", "Open.", "I'm so tired.", "It was such a nice day.", "so+adj; such+noun.", "OK.", "Self-check."]),
    37: (["Escribe 3 compound adjectives con guion.", "Completa: a ___ trip (2 days).", "Completa: a ___ student (20 years).", "Completa: a ___ hotel.", "Completa: a ___ flight.", "Corrige: *two-days trip*", "Corrige: *well known hotel* (before noun)", "Usa luggage y delay en 2 frases con compounds.", "Escribe: He's an open-minded traveller.", "Mini-itinerario (4 frases) de viaje.", "Traduce: un viaje de dos días.", "Traduce: un hotel muy conocido.", "Explica guion + singular en 1 frase.", "Escribe 1× five-star hotel.", "Autochequeo: hyphen before noun; singular."],
         ["Open three.", "**two-day**", "**20-year-old**", "**well-known**", "**long-distance**", "**two-day**", "**well-known**", "Open.", "OK.", "Open.", "a two-day trip.", "a well-known hotel.", "hyphen + singular.", "OK.", "Self-check."]),
    38: (["Escribe 2× although + 1× however + 1× despite.", "Completa: ___ it was raining, we went out.", "Completa: I like it. ___, it's expensive.", "Completa: ___ I disagree, I respect you.", "Completa: ___ the delay, we arrived.", "Corrige: *However it was raining, we went.*", "Corrige: *Despite it was raining.*", "Usa agree y disagree en 2 frases con contrast.", "Escribe: Even though I disagree, I respect you.", "Mini-debate (4 frases) con contrast.", "Traduce: Aunque llovía, salimos.", "Traduce: Sin embargo, es caro.", "Explica although vs however en 1 frase.", "Escribe 1× in spite of.", "Autochequeo: although=clause; despite=noun/-ing."],
         ["Open four.", "**Although/Though**", "**However**", "**Even though**", "**Despite**", "**Although**… / **However**, it…", "**Despite the rain**", "Open.", "OK.", "Open.", "Although it was raining, we went out.", "However, it's expensive.", "although same clause; however new sentence.", "OK.", "Self-check."]),
    39: (["Escribe 2× to + 1× so that + 1× because of.", "Completa: I study English ___ travel.", "Completa: We left early ___ avoid traffic.", "Completa: I called ___ you wouldn't worry.", "Completa: We stayed inside ___ the storm.", "Corrige: *I called to you wouldn't worry.*", "Corrige: *because the storm* (noun only)", "Usa purpose y cause en 2 frases.", "Escribe: The delay was due to the weather.", "Mini-explicación (4 frases) why/how.", "Traduce: Estudio inglés para viajar.", "Traduce: Por la tormenta.", "Explica to vs so that en 1 frase.", "Escribe 1× in order to.", "Autochequeo: clause→because/so that; noun→because of."],
         ["Open four.", "**to**", "**in order to / to**", "**so that**", "**because of / due to**", "**so that**", "**because of** the storm", "Open.", "OK.", "Open.", "I study English to travel.", "because of the storm.", "to+inf; so that+clause.", "OK.", "Self-check."]),
    40: (["Una frase: so/such, compound, although, to, because of.", "Completa: It was ___ long journey.", "Completa: a ___ trip (2 days).", "Completa: ___ I was tired, I went out.", "Completa: I left early ___ catch the train.", "Completa: We stayed in ___ the rain.", "Corrige: *so long journey*", "Corrige: *However I was tired, I went.*", "Corrige: *because of catch the train*", "Mini-historia (5 frases) mix U36–39.", "Matching: intensifier / compound / contrast / purpose.", "Traduce: Fue un viaje tan largo.", "Traduce: Salí temprano para coger el tren.", "Autochequeo con mapa U40.", "Open Ver solución checklist."],
         ["Open one of each.", "**such a**", "**two-day**", "**Although/Though**", "**to / in order to**", "**because of / due to**", "**such a**", "**Although**", "**to** catch…", "Open mixed.", "OK.", "It was such a long journey.", "I left early to catch the train.", "Self-check.", "yes."]),
}

READ_Q = {u: rq(u) for u in (36, 37, 38, 39, 40)}


def block_abc(items, kind="fill"):
    lines, answers = [], []
    for i, row in enumerate(items, 1):
        if kind == "fix":
            q, sol = row
            lines.append(f"{i}. {q}"); answers.append(f"{i}. {sol}")
        else:
            q, opts, sol = row
            lines.append(f"{i}. {q} → *{opts}*"); answers.append(f"{i}. **{sol}**")
    return "\n".join(lines), (" · ".join(answers) if kind != "fix" else "\n".join(answers))


def render_unit(u: int) -> str:
    m, g, v = META[u], GRAM[u], VOCAB[u]
    rq_, lq = READ_Q[u], LISTEN_Q[u]
    wp, ws = WRITE[u]
    g1q, g1a = block_abc(g["a"]); g2q, g2a = block_abc(g["b"]); g3q, g3a = block_abc(g["c"], kind="fix")
    v1q, v1a = block_abc(v["a"]); v2q, v2a = block_abc(v["b"])

    def qa_list(rows, start=1):
        q_lines, a_lines = [], []
        for i, (q, sol, opts) in enumerate(rows, start):
            q_lines.append(f"{i}. {q}" if opts == "(open)" else f"{i}. {q} → *{opts}*")
            a_lines.append(f"{i}. **{sol}**")
        return "\n".join(q_lines), " · ".join(a_lines)

    r1q, r1a = qa_list(rq_[:5], 1); r2q, r2a = qa_list(rq_[5:10], 6); r3q, r3a = qa_list(rq_[10:], 11)
    l1q, l1a = qa_list(lq[:5], 1); l2q, l2a = qa_list(lq[5:10], 6); l3q, l3a = qa_list(lq[10:], 11)
    w_q = "\n".join(f"{i}. {t}" for i, t in enumerate(wp, 1))
    w_a = "\n".join(f"{i}. {t}" for i, t in enumerate(ws, 1))
    bing = ["curso de inglés gratis", "aprender inglés gratis", "curso de inglés online gratis", "curso inglés B1 gratis", "ejercicios inglés B1 gratis"]
    kws = "\n".join(f"  - {k}" for k in [f"ejercicios inglés B1 unidad {u}", *m["kw"], "curso B1 Linguafly", *bing])
    next_line = (
        f"3. Siguiente: [{META[u + 1]['title']}](/blog/curso-b1/{m['next_t']}-ejercicios-soluciones)."
        if u < 40 else "3. Siguiente bloque del curso: [Unidad 41](/curso-b1/unit-41)."
    )
    return f"""---
category: curso-b1
date: '{DATE}'
updatedDate: '{DATE}'
author: linguafly-team
title: 'Ejercicios Unidad {u} B1: {m["title"]} (con soluciones)'
description: >-
  Practica todos los ejercicios de la Unidad {u} del curso B1: {m["focus"]};
  {m["vocab"]}, reading, listening y writing. Con soluciones comentadas.
readTime: 25 min
keywords:
{kws}
canonical: 'https://linguafly.app/blog/curso-b1/{m["slug"]}-ejercicios-soluciones'
image: {m["image"]}
alt: {m["title"]} — ejercicios B1 Unidad {u}
related_routes:
  - {m["slug"]}
  - {m["prev"]}
  - cursos-online-ingles-b1
faqs:
  - question: ¿Qué ejercicios incluye la Unidad {u} del curso B1?
    answer: >-
      Cinco lecciones con 15 actividades cada una sobre {m["focus"]},
      más reading, listening y writing.
  - question: ¿Cómo uso este artículo?
    answer: >-
      Haz cada ejercicio sin mirar la solución. Después abre «Ver solución» y
      lee la explicación. Si fallas, repasa la guía teórica y el curso.
  - question: ¿Cuál es el foco gramatical?
    answer: >-
      {m["focus"]}.
  - question: ¿Dónde practico en el curso?
    answer: >-
      En la Unidad {u} del curso B1 de Linguafly: gramática, vocabulario,
      reading, listening, speaking y writing.
excerpt: >-
  Cuaderno de ejercicios de la Unidad {u} B1 ({m["title"]}) con soluciones.
---
Este artículo reúne **los ejercicios de la Unidad {u} del curso B1** (*{m["full"]}*) con **soluciones comentadas**.

> **Guía teórica:** [{m["title"]} B1](/blog/curso-b1/{m["slug"]})  
> **Practica en el curso:** [Unidad {u} — {m["title"]}](/curso-b1/unit-{u})

Haz cada bloque **sin mirar** la solución. Luego comprueba y lee la explicación.

![{m["title"]}]({m["image"]})

**Contenido de la unidad:**
1. [Lección 1 — Gramática](#leccion-1--gramatica)
2. [Lección 2 — Vocabulario](#leccion-2--vocabulario)
3. [Lección 3 — Reading: {m["r_title"]}](#leccion-3--reading)
4. [Lección 4 — Listening: {m["l_title"]}](#leccion-4--listening)
5. [Lección 5 — Writing](#leccion-5--writing)

---

## Lección 1 — Gramática

**Objetivo:** {m["focus"]}

### Ejercicios 1–5 — Completa

{g1q}

<details>
<summary>Ver solución</summary>

{g1a}

</details>

### Ejercicios 6–10 — Elige / completa

{g2q}

<details>
<summary>Ver solución</summary>

{g2a}

</details>

### Ejercicios 11–15 — Corrige

{g3q}

<details>
<summary>Ver solución</summary>

{g3a}

</details>

---

## Lección 2 — Vocabulario

**Objetivo:** {m["vocab"]}

### Ejercicios 1–5 — Empareja / elige

{v1q}

<details>
<summary>Ver solución</summary>

{v1a}

</details>

### Ejercicios 6–10 — Completa

{v2q}

<details>
<summary>Ver solución</summary>

{v2a}

</details>

### Ejercicios 11–15 — En contexto

11. Usa 3 palabras nuevas en frases con el foco gramatical.
12. Di en voz alta el vocabulario de la unidad.
13. Empareja cada palabra con un ejemplo personal.
14. Revisa la tabla de vocabulario de la [guía teórica](/blog/curso-b1/{m["slug"]}).
15. Continúa en la [Unidad {u} del curso](/curso-b1/unit-{u}).

<details>
<summary>Ver solución</summary>

11–13. Open answers — check meaning in theory. · 14. Theory vocab section. · 15. **/curso-b1/unit-{u}**

</details>

---

## Lección 3 — Reading: {m["r_title"]}

**Objetivo:** comprender un texto con el foco de la unidad.

### Texto y audio

<audio controls preload="none" src="/audio/blog/curso-b1/unit-{u}/reading-workbook.mp3" title="🔊 Reading: {m["r_title"]}"></audio>

> {READ[u]}

### Ejercicios 1–5 — Comprensión

{r1q}

<details>
<summary>Ver solución</summary>

{r1a}

</details>

### Ejercicios 6–10 — Detalles

{r2q}

<details>
<summary>Ver solución</summary>

{r2a}

</details>

### Ejercicios 11–15 — Forma

{r3q}

<details>
<summary>Ver solución</summary>

{r3a}

</details>

---

## Lección 4 — Listening: {m["l_title"]}

**Objetivo:** escuchar el foco gramatical en contexto.

### Audio y guion

<audio controls preload="none" src="/audio/blog/curso-b1/unit-{u}/listening-workbook.mp3" title="🔊 Listening: {m["l_title"]}"></audio>

> {LISTEN[u]}

### Ejercicios 1–5 — Comprensión

{l1q}

<details>
<summary>Ver solución</summary>

{l1a}

</details>

### Ejercicios 6–10 — Detalles

{l2q}

<details>
<summary>Ver solución</summary>

{l2a}

</details>

### Ejercicios 11–15 — Forma

{l3q}

<details>
<summary>Ver solución</summary>

{l3a}

</details>

---

## Lección 5 — Writing

**Objetivo:** producir frases con el foco de la unidad.

{w_q}

<details>
<summary>Ver solución</summary>

{w_a}

</details>

---

## Cómo seguir

1. Repasa fallos en la [guía teórica](/blog/curso-b1/{m["slug"]}).  
2. Practica en la [Unidad {u} del curso B1](/curso-b1/unit-{u}).  
{next_line}

Guías relacionadas:

- [Teoría Unidad {u}](/blog/curso-b1/{m["slug"]})
- [Cuaderno anterior](/blog/curso-b1/{m["prev"]})
- [Inglés B1](/blog/metodos/cursos-online-ingles-b1)

---

*Cuaderno alineado con la Unidad {u} del [curso B1 de Linguafly](/curso-b1).*
"""


def make_audios():
    for u in (36, 37, 38, 39, 40):
        d = ROOT / f"public/audio/blog/curso-b1/unit-{u}"
        d.mkdir(parents=True, exist_ok=True)
        for name, text in (("reading-workbook", READ[u]), ("listening-workbook", LISTEN[u])):
            path = d / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def main():
    make_audios()
    for u in (36, 37, 38, 39, 40):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path)


if __name__ == "__main__":
    main()
