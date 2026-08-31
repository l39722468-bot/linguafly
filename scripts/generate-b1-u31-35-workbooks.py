#!/usr/bin/env python3
"""Generate B1 Units 31–35 exercise workbooks + TTS."""
from pathlib import Path
from gtts import gTTS

OUT = Path("src/content/blog/curso-b1")
ROOT = Path(__file__).resolve().parents[1]
DATE = "2026-08-31"

LISTEN = {
    31: "Hi, I am Sam. The woman who lives next door is a vet. Animals that live in the wild are free. The landscape that we visited was breathtaking. The bird which I saw was an eagle. Anyone who loves wildlife should visit this park.",
    32: "Hi, I am Tina. My sister, who lives in Madrid, is a teacher. The river, which flows through the city, is polluted. Recycling, which helps reduce pollution, is important. Climate change, which affects us all, is a global problem.",
    33: "Hi, I am Uma. It's a nice day, isn't it? You like this restaurant, don't you? She works at the bank, doesn't she? They haven't finished yet, have they? You're free tomorrow, aren't you?",
    34: "Hi, I am Victor. I was bored because the film was boring. The news was exciting and I felt excited. She was worried about the exam. The match was exciting and we were excited.",
    35: "Hi, I am Wendy. The park that we visited was beautiful. Madrid, which is busy, is my home city. You're free tomorrow, aren't you? I felt excited because the trip was exciting. Anyone who loves wildlife should visit this park.",
}

READ = {
    31: "The woman who lives next door is a vet. Animals that live in the wild are free. The landscape that we visited was breathtaking. The bird which I saw was an eagle. Anyone who loves wildlife should visit this park.",
    32: "My sister, who lives in Madrid, is a teacher. The river, which flows through the city, is polluted. Recycling, which helps reduce pollution, is important. Climate change, which affects us all, is a global problem. Do not use that in non-defining clauses.",
    33: "It's a nice day, isn't it? You like this restaurant, don't you? She works at the bank, doesn't she? They haven't finished yet, have they? You're free tomorrow, aren't you?",
    34: "I was bored because the film was boring. The news was exciting and I felt excited. She was worried about the exam. The match was exciting and we were excited. The book is interesting and I am interested.",
    35: "The park that we visited was beautiful. Madrid, which is busy, is my home city. You're free tomorrow, aren't you? I felt excited because the trip was exciting. Anyone who loves wildlife should visit this park.",
}

META = {
    31: dict(slug="unidad-31-defining-relative-nature", title="Defining Relative & Nature", full="Defining Relative Clauses & The Natural World", focus="defining relative clauses (who/which/that)", vocab="the natural world", image="/blog/curso-b1/unit-31/defining-relative.png", prev="unidad-30-repaso-26-29-ejercicios-soluciones", next_t="unidad-32-nondefining-relative-environment", r_title="In the wild", l_title="Sam in the park", kw=["defining relative ejercicios", "who which that", "natural world vocabulary"]),
    32: dict(slug="unidad-32-nondefining-relative-environment", title="Non-defining Relative & Environment", full="Non-defining Relative Clauses & Environment", focus="non-defining relative clauses (who/which + commas, no that)", vocab="environment", image="/blog/curso-b1/unit-32/nondefining-relative.png", prev="unidad-31-defining-relative-nature-ejercicios-soluciones", next_t="unidad-33-question-tags-services", r_title="Our planet", l_title="Tina on climate", kw=["non-defining relative ejercicios", "which commas", "environment vocabulary"]),
    33: dict(slug="unidad-33-question-tags-services", title="Question Tags & Services", full="Question Tags & Services", focus="question tags (isn't it?, don't you?…)", vocab="services", image="/blog/curso-b1/unit-33/question-tags.png", prev="unidad-32-nondefining-relative-environment-ejercicios-soluciones", next_t="unidad-34-ed-ing-adjectives-feelings", r_title="At the service desk", l_title="Uma chatting", kw=["question tags ejercicios", "isn't it don't you", "services vocabulary"]),
    34: dict(slug="unidad-34-ed-ing-adjectives-feelings", title="-Ed/-ing Adjectives & Feelings", full="-Ed/-ing Adjectives & Personal Feelings", focus="-ed/-ing adjectives (bored/boring, excited/exciting)", vocab="personal feelings", image="/blog/curso-b1/unit-34/ed-ing-adjectives.png", prev="unidad-33-question-tags-services-ejercicios-soluciones", next_t="unidad-35-repaso-31-34", r_title="How do you feel?", l_title="Victor's feelings", kw=["ed ing adjectives ejercicios", "bored boring", "personal feelings"]),
    35: dict(slug="unidad-35-repaso-31-34", title="Repaso 31–34", full="Repaso 31–34: Relatives, Tags & -ed/-ing", focus="relatives, question tags y -ed/-ing (mix U31–34)", vocab="nature, environment, services, feelings (mix)", image="/blog/curso-b1/unit-35/review-map.png", prev="unidad-34-ed-ing-adjectives-feelings-ejercicios-soluciones", next_t="unidad-31-defining-relative-nature", r_title="Mixed review", l_title="Wendy's mixed review", kw=["repaso B1 31-34", "relative clauses review", "question tags review"]),
}

GRAM = {
    31: {"a": [("The woman ___ lives next door is a vet.", "who / which / where", "who"), ("The book ___ I bought is interesting.", "which / who / whose", "which"), ("Animals ___ live in the wild are free.", "that / who / where", "that"), ("The landscape ___ we visited was breathtaking.", "that / who / whose", "that"), ("The bird ___ I saw was an eagle.", "which / who / where", "which")],
         "b": [("Anyone ___ loves wildlife should visit.", "who / which / where", "who"), ("The river ___ flows through the valley is clean.", "which / who / whose", "which"), ("The man ___ saw the bear reported it.", "who / which / where", "who"), ("The plants ___ grow here need water.", "that / who / where", "that"), ("Omit object: The book ___ I bought…", "that/which / who / where", "that/which")],
         "c": [("*The woman which lives next door…*", "The woman **who/that** lives…"), ("*Animals who live in the wild…*", "Animals **that/which** live…"), ("*The book who I bought…*", "The book **which/that** I bought…"), ("*Anyone which loves wildlife…*", "Anyone **who/that** loves…"), ("*The bird who I saw…*", "The bird **which/that** I saw…")]},
    32: {"a": [("My sister, ___ lives in Madrid, is a teacher.", "who / which / that", "who"), ("The river, ___ flows through the city, is polluted.", "which / who / that", "which"), ("Recycling, ___ helps reduce pollution, is important.", "which / who / that", "which"), ("Climate change, ___ affects us all, is global.", "which / who / that", "which"), ("Can I use that here?", "No / Yes / Sometimes", "No")],
         "b": [("Madrid, ___ is busy, is my home city.", "which / who / that", "which"), ("My brother, ___ works in a bank, recycles.", "who / which / that", "who"), ("Plastic, ___ is hard to recycle, pollutes.", "which / who / that", "which"), ("Non-defining needs ___", "commas / no commas / that", "commas"), ("Defining allows ___", "that / only who / only which", "that")],
         "c": [("*My sister that lives in Madrid, is…*", "My sister, **who** lives… (commas, no that)"), ("*The river that flows…, is polluted.* (extra info)", "The river, **which** flows…,"), ("*Recycling, that helps…*", "Recycling, **which** helps…"), ("*Climate change who affects…*", "Climate change, **which** affects…"), ("*No commas needed?*", "Non-defining **needs commas**.")]},
    33: {"a": [("It's a nice day, ___?", "isn't it / is it / doesn't it", "isn't it"), ("You like this restaurant, ___?", "don't you / do you / doesn't you", "don't you"), ("She works at the bank, ___?", "doesn't she / does she / isn't she", "doesn't she"), ("They haven't finished, ___?", "have they / haven't they / did they", "have they"), ("You're free tomorrow, ___?", "aren't you / are you / don't you", "aren't you")],
         "b": [("He is a doctor, ___?", "isn't he / is he / doesn't he", "isn't he"), ("We need an appointment, ___?", "don't we / do we / aren't we", "don't we"), ("The cafe isn't open, ___?", "is it / isn't it / does it", "is it"), ("You went to the pharmacy, ___?", "didn't you / did you / don't you", "didn't you"), ("Positive → tag is ___", "negative / positive / zero", "negative")],
         "c": [("*It's nice, is it?*", "It's nice, **isn't it?**"), ("*You like it, do you?* (confirm)", "You like it, **don't you?**"), ("*She works here, isn't she?*", "She works here, **doesn't she?**"), ("*They haven't finished, haven't they?*", "They haven't finished, **have they?**"), ("*You're free, don't you?*", "You're free, **aren't you?**")]},
    34: {"a": [("I was ___ / the film was ___.", "bored / boring · boring / bored", "bored / boring"), ("The news was ___ / I felt ___.", "exciting / excited · excited / exciting", "exciting / excited"), ("She was ___ about the exam.", "worried / worrying / worry", "worried"), ("The match was ___ / we were ___.", "exciting / excited · excited / exciting", "exciting / excited"), ("The book is ___ / I am ___.", "interesting / interested · interested / interesting", "interesting / interested")],
         "b": [("-ed describes ___", "how you feel / the cause / the place", "how you feel"), ("-ing describes ___", "the cause / how you feel / the tag", "the cause"), ("I felt ___", "excited / exciting / excite", "excited"), ("A ___ film", "boring / bored / bore", "boring"), ("I'm ___ in wildlife.", "interested / interesting / interest", "interested")],
         "c": [("*I was boring because the film was bored.*", "I was **bored** / the film was **boring**."), ("*The news was excited.*", "The news was **exciting**."), ("*She was worrying about the exam.* (feeling)", "She was **worried**…"), ("*We were exciting.*", "We were **excited**."), ("*I am interesting in the book.*", "I am **interested**…")]},
    35: {"a": [("The park ___ we visited was beautiful.", "that / who / where", "that"), ("Madrid, ___ is busy, is my home city.", "which / that / who", "which"), ("You're free tomorrow, ___?", "aren't you / are you / don't you", "aren't you"), ("I felt ___ / the trip was ___.", "excited / exciting · exciting / excited", "excited / exciting"), ("Anyone ___ loves wildlife should visit.", "who / which / where", "who")],
         "b": [("Animals ___ live in the wild…", "that / who / where", "that"), ("Recycling, ___ helps…", "which / that / who", "which"), ("It's nice, ___?", "isn't it / is it / don't it", "isn't it"), ("The film was ___", "boring / bored / bore", "boring"), ("Can non-defining use that?", "No / Yes / Always", "No")],
         "c": [("*The park who we visited…*", "The park **that/which** we visited…"), ("*Madrid that is busy, is…*", "Madrid, **which** is busy,…"), ("*You're free, don't you?*", "You're free, **aren't you?**"), ("*I felt exciting.*", "I felt **excited**."), ("*Anyone which loves…*", "Anyone **who/that** loves…")]},
}

VOCAB = {
    31: {"a": [("wildlife", "fauna · bank · bored", "fauna"), ("landscape", "paisaje · recycle · tag", "paisaje"), ("eagle", "águila · pollution · cafe", "águila"), ("forest", "bosque · appointment · worried", "bosque"), ("bear", "oso · plastic · exciting", "oso")],
         "b": [("who → ___", "people / things only / commas", "people"), ("which/that → ___", "things/animals / people only / tags", "things/animals"), ("wild ≈ ___", "salvaje / banco / aburrido", "salvaje"), ("vet ≈ ___", "veterinario / clima / tag", "veterinario"), ("park ≈ ___", "parque / bored / which", "parque")]},
    32: {"a": [("recycle", "reciclar · eagle · tag", "reciclar"), ("pollution", "contaminación · forest · bored", "contaminación"), ("climate", "clima · cafe · who", "clima"), ("waste", "residuos · bear · excited", "residuos"), ("protect", "proteger · landscape / isn't", "proteger")],
         "b": [("non-defining → ___", "commas / no commas / that OK", "commas"), ("no ___ in non-defining", "that / who / which", "that"), ("planet ≈ ___", "planeta / eagle / bored", "planeta"), ("reduce ≈ ___", "reducir / forest / tag", "reducir"), ("global ≈ ___", "global / cafe / who", "global")]},
    33: {"a": [("bank", "banco · eagle · bored", "banco"), ("appointment", "cita · pollution · forest", "cita"), ("pharmacy", "farmacia · climate · who", "farmacia"), ("restaurant", "restaurante · waste · which", "restaurante"), ("doctor", "médico · protect · that", "médico")],
         "b": [("+ statement → ___ tag", "negative / positive / zero", "negative"), ("− statement → ___ tag", "positive / negative / zero", "positive"), ("cafe ≈ ___", "cafetería / eagle / bored", "cafetería"), ("taxi ≈ ___", "taxi / forest / which", "taxi"), ("hotel ≈ ___", "hotel / recycle / who", "hotel")]},
    34: {"a": [("bored", "aburrido · bank · that", "aburrido"), ("excited", "emocionado · recycle · tag", "emocionado"), ("worried", "preocupado · eagle · which", "preocupado"), ("surprised", "sorprendido · climate · who", "sorprendido"), ("disappointed", "decepcionado · forest · isn't", "decepcionado")],
         "b": [("-ed = ___", "feeling / cause / place", "feeling"), ("-ing = ___", "cause / feeling / tag", "cause"), ("nervous ≈ ___", "nervioso / bank / that", "nervioso"), ("relaxed ≈ ___", "relajado / recycle / who", "relajado"), ("amazed ≈ ___", "asombrado / forest / which", "asombrado")]},
    35: {"a": [("who/which/that", "relatives · only tags", "relatives"), ("commas + who/which", "non-defining · -ed only", "non-defining"), ("isn't it?", "question tag · wildlife only", "question tag"), ("bored/boring", "-ed/-ing · bank only", "-ed/-ing"), ("wildlife / recycle / bank / excited", "vocab mix · wrong", "vocab mix")],
         "b": [("defining allows ___", "that / only commas / no who", "that"), ("non-defining forbids ___", "that / who / which", "that"), ("tag polarity", "+→− / always − / never", "+→−"), ("feeling adjective", "-ed / -ing / that", "-ed"), ("cause adjective", "-ing / -ed / who", "-ing")]},
}

def rq(u):
    bases = {
        31: [("Woman who lives next door?", "a vet", "vet / teacher"), ("Animals that live ___", "in the wild", "wild / bank"), ("Landscape was ___", "breathtaking", "breathtaking / boring"), ("Bird was an ___", "eagle", "eagle / cafe"), ("Anyone who loves ___", "wildlife", "wildlife / plastic"), ("Main grammar?", "defining relative", "defining / tags"), ("Find who", "woman who lives", "(open)"), ("Find that/which", "animals that / bird which", "(open)"), ("Find landscape that", "landscape that we visited", "(open)"), ("Write who…", "Model OK", "(open)"), ("Nature vocab?", "vet, wild, landscape, eagle, wildlife, park", "yes / none"), ("which for people?", "False", "False / True"), ("Course", "/curso-b1/unit-31", "/curso-b1/unit-31"), ("Omit object relative?", "Yes possible", "Yes / No"), ("Open Ver solución", "yes", "yes")],
        32: [("Sister lives in ___", "Madrid", "Madrid / forest"), ("River is ___", "polluted", "polluted / clean"), ("Recycling helps reduce ___", "pollution", "pollution / boredom"), ("Climate change affects ___", "us all", "us all / only birds"), ("Use that in non-defining?", "No", "No / Yes"), ("Main grammar?", "non-defining", "non-defining / defining only"), ("Find who + commas", "sister, who lives", "(open)"), ("Find which + commas", "river, which / Recycling, which", "(open)"), ("Find climate which", "Climate change, which affects", "(open)"), ("Write which…", "Model OK", "(open)"), ("Env vocab?", "Madrid, polluted, recycling, pollution, climate", "yes / none"), ("that OK with commas?", "False", "False / True"), ("Course", "/curso-b1/unit-32", "/curso-b1/unit-32"), ("Extra info?", "Yes", "Yes / No"), ("Open Ver solución", "yes", "yes")],
        33: [("Nice day tag?", "isn't it", "isn't it / is it"), ("Like restaurant tag?", "don't you", "don't you / do you"), ("Works at bank tag?", "doesn't she", "doesn't she / isn't she"), ("Haven't finished tag?", "have they", "have they / haven't they"), ("Free tomorrow tag?", "aren't you", "aren't you / don't you"), ("Main grammar?", "question tags", "tags / relatives"), ("Find isn't it", "nice day, isn't it", "(open)"), ("Find don't you", "like…, don't you", "(open)"), ("Find have they", "haven't finished, have they", "(open)"), ("Write aren't you…", "Model OK", "(open)"), ("Services vocab?", "restaurant, bank", "yes / none"), ("+ → −?", "Yes", "Yes / No"), ("Course", "/curso-b1/unit-33", "/curso-b1/unit-33"), ("Shadow", "done", "(open)"), ("Open Ver solución", "yes", "yes")],
        34: [("I was ___", "bored", "bored / boring"), ("Film was ___", "boring", "boring / bored"), ("News was ___", "exciting", "exciting / excited"), ("I felt ___", "excited", "excited / exciting"), ("She was ___ about exam", "worried", "worried / worrying"), ("Match was ___ / we were ___", "exciting / excited", "exciting-excited / bored"), ("Main grammar?", "-ed/-ing", "-ed/-ing / tags"), ("Find bored/boring", "bored… boring", "(open)"), ("Find exciting/excited", "exciting… excited", "(open)"), ("Find interesting/interested", "interesting… interested", "(open)"), ("Write pair", "Model OK", "(open)"), ("Feelings vocab?", "bored, excited, worried", "yes / none"), ("I was boring OK?", "False", "False / True"), ("Course", "/curso-b1/unit-34", "/curso-b1/unit-34"), ("Open Ver solución", "yes", "yes")],
        35: [("Park that we visited?", "beautiful", "beautiful / polluted"), ("Madrid, which is ___", "busy", "busy / bored"), ("Tag: free tomorrow?", "aren't you", "aren't you / don't you"), ("Felt ___ / trip ___", "excited / exciting", "excited-exciting / bored"), ("Anyone who loves ___", "wildlife", "wildlife / plastic"), ("Classify that park", "defining", "defining / non-def"), ("Classify Madrid which", "non-defining", "non-def / tag"), ("Classify aren't you", "question tag", "tag / -ed"), ("Classify excited/exciting", "-ed/-ing", "-ed/-ing / who"), ("Write 1× each", "Model OK", "(open)"), ("Shadow", "done", "(open)"), ("Mixed?", "Yes", "Yes / No"), ("Course", "/curso-b1/unit-35", "/curso-b1/unit-35"), ("No that in non-def?", "True", "True / False"), ("Open Ver solución", "yes", "yes")],
    }
    return bases[u]

LISTEN_Q = {
    31: [("Who speaks?", "Sam", "Sam / Tina / Wendy"), ("Woman is a ___", "vet", "vet / doctor"), ("Animals live ___", "in the wild", "wild / bank"), ("Landscape was ___", "breathtaking", "breathtaking / boring"), ("Bird was an ___", "eagle", "eagle / cafe"), ("Loves ___", "wildlife", "wildlife / plastic"), ("Grammar?", "defining relative", "defining / tags"), ("Find who", "woman who lives", "(open)"), ("Find that/which", "animals that / bird which", "(open)"), ("Write who…", "Model OK", "(open)"), ("Nature words?", "vet, wild, landscape, eagle, wildlife, park", "yes / none"), ("Shadow", "done", "(open)"), ("which for people?", "False", "False / True"), ("Course", "/curso-b1/unit-31", "/curso-b1/unit-31"), ("Open Ver solución", "yes", "yes")],
    32: [("Who speaks?", "Tina", "Tina / Sam / Uma"), ("Sister in ___", "Madrid", "Madrid / park"), ("River is ___", "polluted", "polluted / clean"), ("Recycling reduces ___", "pollution", "pollution / boredom"), ("Climate affects ___", "us all", "us all / birds"), ("Grammar?", "non-defining", "non-def / defining"), ("Find who commas", "sister, who", "(open)"), ("Find which commas", "river, which / Recycling, which", "(open)"), ("Write which…", "Model OK", "(open)"), ("Env words?", "Madrid, polluted, recycling, pollution, climate", "yes / none"), ("Shadow", "done", "(open)"), ("that OK?", "False", "False / True"), ("Course", "/curso-b1/unit-32", "/curso-b1/unit-32"), ("Open Ver solución", "yes", "yes"), ("Needs commas?", "Yes", "Yes / No")],
    33: [("Who speaks?", "Uma", "Uma / Tina / Victor"), ("Nice day ___?", "isn't it", "isn't it / is it"), ("Like restaurant ___?", "don't you", "don't you / do you"), ("Bank ___?", "doesn't she", "doesn't she / isn't she"), ("Haven't finished ___?", "have they", "have they / haven't"), ("Free ___?", "aren't you", "aren't you / don't you"), ("Grammar?", "question tags", "tags / relatives"), ("Find isn't it", "nice day, isn't it", "(open)"), ("Find don't you / doesn't she", "don't you / doesn't she", "(open)"), ("Write have they…", "Model OK", "(open)"), ("Services?", "restaurant, bank", "yes / none"), ("Shadow", "done", "(open)"), ("+→−?", "Yes", "Yes / No"), ("Course", "/curso-b1/unit-33", "/curso-b1/unit-33"), ("Open Ver solución", "yes", "yes")],
    34: [("Who speaks?", "Victor", "Victor / Uma / Wendy"), ("I was ___", "bored", "bored / boring"), ("Film was ___", "boring", "boring / bored"), ("News ___ / I felt ___", "exciting / excited", "exciting-excited"), ("Worried about ___", "the exam", "exam / park"), ("Match ___ / we ___", "exciting / excited", "exciting-excited"), ("Grammar?", "-ed/-ing", "-ed/-ing / tags"), ("Find bored/boring", "bored… boring", "(open)"), ("Find exciting/excited", "exciting… excited", "(open)"), ("Write pair", "Model OK", "(open)"), ("Feelings?", "bored, excited, worried", "yes / none"), ("Shadow", "done", "(open)"), ("I was boring?", "False", "False / True"), ("Course", "/curso-b1/unit-34", "/curso-b1/unit-34"), ("Open Ver solución", "yes", "yes")],
    35: [("Who speaks?", "Wendy", "Wendy / Victor / Sam"), ("Park was ___", "beautiful", "beautiful / polluted"), ("Madrid is ___", "busy", "busy / bored"), ("Tag?", "aren't you", "aren't you / don't you"), ("Excited / trip ___", "exciting", "exciting / bored"), ("Loves ___", "wildlife", "wildlife / plastic"), ("Classify that", "defining", "defining / tag"), ("Classify which commas", "non-defining", "non-def / -ed"), ("Classify aren't you", "tag", "tag / who"), ("Classify excited/exciting", "-ed/-ing", "-ed/-ing / that"), ("Write 1× each", "Model OK", "(open)"), ("Shadow", "done", "(open)"), ("Mixed?", "Yes", "Yes / No"), ("Course", "/curso-b1/unit-35", "/curso-b1/unit-35"), ("Open Ver solución", "yes", "yes")],
}

WRITE = {
    31: (["Escribe 2× who + 2× which/that.", "Completa: The woman ___ lives…", "Completa: The book ___ I bought…", "Completa: Animals ___ live…", "Completa: The bird ___ I saw…", "Corrige: *The woman which lives…*", "Corrige: *Animals who live…*", "Usa wildlife y landscape en 2 frases con relative.", "Escribe: Anyone who loves wildlife…", "Párrafo (3–4) sobre naturaleza con who/which/that.", "Traduce: La mujer que vive al lado…", "Traduce: El pájaro que vi…", "Pregunta Which…? + relative.", "Escribe 1× that omitible (objeto).", "Autochequeo: people→who; things→which/that."],
         ["Open 2+2.", "**who**", "**which/that**", "**that/which**", "**which/that**", "**who/that**", "**that/which**", "Open.", "OK.", "Open paragraph.", "The woman who lives next door…", "The bird which/that I saw…", "Open.", "The book (that) I bought…", "Self-check."]),
    32: (["Escribe 2× who + 2× which con comas (sin that).", "Completa: My sister, ___ lives…", "Completa: The river, ___ flows…", "Completa: Recycling, ___ helps…", "¿Puedo usar that? ___", "Corrige: *My sister that lives…,*", "Corrige: *Recycling, that helps…*", "Usa pollution y recycle en 2 frases non-defining.", "Escribe: Climate change, which affects us all,…", "Mini-texto (3 frases) con comas.", "Traduce: Mi hermana, que vive en Madrid,…", "Traduce: El río, que atraviesa la ciudad,…", "Explica defining vs non-defining en 1 frase.", "Escribe 1× which + commas.", "Autochequeo: extra info → commas; no that."],
         ["Open 2+2.", "**who**", "**which**", "**which**", "**No**", "**who** + commas", "**which**", "Open.", "OK.", "Open.", "My sister, who lives in Madrid,…", "The river, which flows through the city,…", "extra info + commas; no that.", "OK.", "Self-check."]),
    33: (["Escribe 5 tags: isn't it, don't you, doesn't she, have they, aren't you.", "Completa: It's nice, ___?", "Completa: You like it, ___?", "Completa: She works here, ___?", "Completa: They haven't finished, ___?", "Corrige: *It's nice, is it?*", "Corrige: *You're free, don't you?*", "Usa bank y restaurant en 2 frases con tags.", "Escribe: You're free tomorrow, aren't you?", "Mini-diálogo (3 tags).", "Traduce: Hace buen día, ¿verdad?", "Traduce: Te gusta este restaurante, ¿no?", "Explica +→− en 1 frase.", "Escribe 1× didn't you?", "Autochequeo: copia auxiliar y cambia polaridad."],
         ["Open five.", "**isn't it**", "**don't you**", "**doesn't she**", "**have they**", "**isn't it**", "**aren't you**", "Open.", "OK.", "Open.", "It's a nice day, isn't it?", "You like this restaurant, don't you?", "+ → − tag.", "You went…, didn't you?", "Self-check."]),
    34: (["Escribe 3 pares -ed/-ing.", "Completa: I was ___ / film was ___.", "Completa: news was ___ / I felt ___.", "Completa: She was ___ about the exam.", "Completa: book is ___ / I am ___.", "Corrige: *I was boring.*", "Corrige: *The news was excited.*", "Usa worried y surprising en 2 frases.", "Escribe: The match was exciting. We were excited.", "Mini-diario de sentimientos (4 frases).", "Traduce: Estaba aburrido porque la película era aburrida.", "Traduce: La noticia era emocionante.", "Explica -ed vs -ing en 1 frase.", "Escribe 1× interested/interesting.", "Autochequeo: feeling=-ed; cause=-ing."],
         ["Open three pairs.", "**bored / boring**", "**exciting / excited**", "**worried**", "**interesting / interested**", "**bored**", "**exciting**", "Open.", "OK.", "Open.", "I was bored because the film was boring.", "The news was exciting.", "feeling vs cause.", "OK.", "Self-check."]),
    35: (["Una frase: defining, non-defining, tag, -ed, -ing.", "Completa: The park ___ we visited…", "Completa: Madrid, ___ is busy,…", "Completa: You're free, ___?", "Completa: I felt ___ / trip was ___.", "Completa: Anyone ___ loves wildlife…", "Corrige: *Madrid that is busy, is…*", "Corrige: *I felt exciting.*", "Corrige: *You're free, don't you?*", "Mini-historia (5 frases) mix U31–34.", "Matching: defining / non-def / tag / -ed/-ing.", "Traduce: El parque que visitamos…", "Traduce: Estaba emocionado.", "Autochequeo con mapa U35.", "Open Ver solución checklist."],
         ["Open one of each.", "**that/which**", "**which**", "**aren't you**", "**excited / exciting**", "**who/that**", "**which** + commas", "**excited**", "**aren't you**", "Open mixed.", "OK.", "The park that we visited…", "I felt excited.", "Self-check.", "yes."]),
}

READ_Q = {u: rq(u) for u in (31, 32, 33, 34, 35)}


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
        if u < 35 else "3. Siguiente bloque del curso: [Unidad 36](/curso-b1/unit-36)."
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
    for u in (31, 32, 33, 34, 35):
        d = ROOT / f"public/audio/blog/curso-b1/unit-{u}"
        d.mkdir(parents=True, exist_ok=True)
        for name, text in (("reading-workbook", READ[u]), ("listening-workbook", LISTEN[u])):
            path = d / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def main():
    make_audios()
    for u in (31, 32, 33, 34, 35):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path)


if __name__ == "__main__":
    main()
