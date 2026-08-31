#!/usr/bin/env python3
"""Generate B1 Units 7–10 exercise workbooks (ejercicios-soluciones)."""
from pathlib import Path

OUT = Path("src/content/blog/curso-b1")
DATE = "2026-08-31"

LISTEN = {
    7: "Hi, I am Tom and I want to tell you about my weekend plans. I was going to go to the cinema on Saturday with my sister, but she changed her mind and wanted to stay at home. We were going to watch a comedy but I ended up watching it alone. On Sunday I was going to study for my exam, but I postponed it because I felt tired. My parents were going to visit us but they cancelled due to bad weather.",
    8: "Hi, I am Lisa. I just saw my friend Sarah at the supermarket. She must be excited — she was holding a wedding magazine and smiling a lot. She might be getting married soon! Her boyfriend can't be far — I saw a ring on her finger. They must have got engaged recently. I feel so happy for her!",
    9: "Hi, I am Mark. I used to work in an office but now I work from home. At first it was difficult but I got used to it after a few weeks. I am used to waking up early now and I have a good routine. I used to spend hours commuting but now I save that time. My wife used to worry about me working alone but she is used to it now.",
    10: "Hi, I am Emma. I used to work in an office but now I work from home. I am going to travel to Italy next month. I was going to go last year but I had to cancel because of work. My friend must be happy — she just got engaged. I am used to early flights now because I travel a lot.",
}
READ = {
    7: "Last year I was going to travel to Japan for my birthday. I had already booked the flight and hotel, but then I changed my mind because I got a new job. My friend was going to come with me too, but she had to postpone her trip. We were going to visit Tokyo and Kyoto. I was going to learn some Japanese before the trip, but I never had time. Maybe next year we will go.",
    8: "I think my neighbour must be very happy these days — I saw him moving into a new house last week. He might have got a promotion at work because he looks more confident. His wife can't be angry with him — they always walk together in the park smiling. She must feel relieved about the move too. I might invite them for coffee sometime to congratulate them.",
    9: "I used to live in a small village when I was young. I used to walk to school every day and play in the fields after class. Now I live in a big city and I am used to the noise and the busy lifestyle. It took me a few months to get used to living here. I used to hate traffic but now I don't mind it. My parents used to visit me every weekend but they live far now.",
    10: "I used to live in a small town but now I live in London. I am meeting my sister at the airport next Saturday — she is flying from Spain. I have already booked my flight to Tokyo for next month. I was going to go last year but I cancelled because of work. My neighbour must be happy — he just moved into a new house. I am getting used to the busy city lifestyle.",
}

META = {
    7: dict(
        slug="unidad-7-was-were-going-to",
        title="Was/were going to",
        full="Was/Were Going To | Plans & Intentions",
        focus="was/were going to (planes no realizados)",
        vocab="plans & intentions",
        image="/blog/curso-b1/unit-7/was-were-going-to.png",
        prev="unidad-6-future-will-going-to-ejercicios-soluciones",
        next_t="unidad-8-modals-deduction",
        r_title="Cancelled Japan trip",
        l_title="Tom's weekend plans",
        kw=["was were going to ejercicios", "planes no realizados", "I was going to"],
    ),
    8: dict(
        slug="unidad-8-modals-deduction",
        title="Modals of deduction",
        full="Modal Verbs of Deduction (must, might, can't) | Personal Feelings",
        focus="must / might / can't (deducción)",
        vocab="personal feelings",
        image="/blog/curso-b1/unit-8/modals-deduction.png",
        prev="unidad-7-was-were-going-to-ejercicios-soluciones",
        next_t="unidad-9-used-to-be-get-used-to",
        r_title="Deductions about a neighbour",
        l_title="Lisa and Sarah",
        kw=["must might can't ejercicios", "modales de deducción", "must be happy"],
    ),
    9: dict(
        slug="unidad-9-used-to-be-get-used-to",
        title="Used to / be used to / get used to",
        full="Used to, Be Used to, Get Used to | Habits & Lifestyle",
        focus="used to / be used to / get used to",
        vocab="habits & lifestyle",
        image="/blog/curso-b1/unit-9/used-to-trio.png",
        prev="unidad-8-modals-deduction-ejercicios-soluciones",
        next_t="unidad-10-repaso-6-9",
        r_title="Village to city",
        l_title="Mark works from home",
        kw=["used to ejercicios B1", "be used to get used to", "habits lifestyle"],
    ),
    10: dict(
        slug="unidad-10-repaso-6-9",
        title="Repaso 6–9",
        full="Repaso 6–9",
        focus="futuros, was/were going to, modales, used to",
        vocab="travel, plans, feelings, habits (mix)",
        image="/blog/curso-b1/unit-10/review-map.png",
        prev="unidad-9-used-to-be-get-used-to-ejercicios-soluciones",
        next_t="unidad-6-future-will-going-to",
        r_title="Mixed review paragraph",
        l_title="Emma's mixed plans",
        kw=["repaso B1 unidades 6-9", "ejercicios integración B1", "must used to going to"],
    ),
}

GRAM = {
    7: {
        "a": [
            ("I ___ going to call you yesterday but I forgot.", "was / were / am", "was"),
            ("They ___ going to travel to Spain but cancelled.", "was / were / are", "were"),
            ("She ___ going to study medicine but changed her mind.", "was / were / is", "was"),
            ("We ___ going to watch a film but we were too tired.", "was / were / are", "were"),
            ("He ___ going to buy a new car but lost his job.", "was / were / is", "was"),
        ],
        "b": [
            ("She ___ going to attend, but she came. (neg.)", "wasn't / weren't / isn't", "wasn't"),
            ("They ___ going to tell him. (neg.)", "wasn't / weren't / aren't", "weren't"),
            ("What ___ you going to do before the rain started?", "was / were / are", "were"),
            ("You ___ going to come to the party, right?", "was / were / are", "were"),
            ("My parents ___ going to visit us but got sick.", "was / were / are", "were"),
        ],
        "c": [
            ("*I am going to call you yesterday.*", "I **was going to** call you yesterday."),
            ("*They was going to travel.*", "They **were going to** travel."),
            ("*She weren't going to attend.*", "She **wasn't going to** attend."),
            ("*What was you going to do?*", "What **were** you going to do?"),
            ("*We was going to have a party.*", "We **were going to** have a party."),
        ],
    },
    8: {
        "a": [
            ("She ___ be happy — she just got promoted.", "must / might / can't", "must"),
            ("That ___ be him — he is in Paris this week.", "must / might / can't", "can't"),
            ("I ___ have left my keys at the office.", "must / might / can't", "might"),
            ("They ___ be at home — the lights are on.", "must / might / can't", "must"),
            ("She ___ be angry — she never gets angry.", "must / might / can't", "can't"),
        ],
        "b": [
            ("He ___ be tired — he has been working all day.", "must / might / can't", "must"),
            ("This ___ be the right address — let me check.", "must / might / can't", "might"),
            ("That ___ be right — I checked twice.", "must / might / can't", "can't"),
            ("They ___ have arrived by now — the flight landed an hour ago.", "must / might / can't", "must"),
            ("It ___ rain tomorrow — the forecast says so.", "must / might / can't", "might"),
        ],
        "c": [
            ("*That mustn't be him.* (imposible)", "That **can't** be him."),
            ("*He must to be tired.*", "He **must be** tired."),
            ("*She can be happy* (evidencia fuerte)", "She **must** be happy."),
            ("*I must have left…* (solo posibilidad)", "I **might** have left…"),
            ("*They can't be at home* (luces encendidas)", "They **must** be at home."),
        ],
    },
    9: {
        "a": [
            ("I ___ play football when I was young.", "used to / am used to / get used to", "used to"),
            ("She ___ living in a big city.", "used to / is used to / gets used to", "is used to"),
            ("It took months to ___ living here.", "used to / be used to / get used to", "get used to"),
            ("We ___ getting up early every day.", "used to / are used to / get used to", "are used to"),
            ("They ___ the cold after a few months.", "used to / were used to / got used to", "got used to"),
        ],
        "b": [
            ("I didn't ___ to like coffee.", "use / used / be used", "use"),
            ("Did you ___ to live in London?", "use / used / get used", "use"),
            ("I am used to ___ (drive).", "driving / drive / drove", "driving"),
            ("I used to ___ football.", "play / playing / played", "play"),
            ("I am ___ used to working from home.", "getting / got / get", "getting"),
        ],
        "c": [
            ("*I am used to play tennis.*", "I am used to **playing** tennis. / I **used to play** tennis."),
            ("*I used to living in Paris.*", "I **used to live** in Paris."),
            ("*I didn't used to smoke.*", "I didn't **use** to smoke."),
            ("*She is used to live here.*", "She is used to **living** here."),
            ("*We got used to wake up early.*", "We got used to **waking** up early."),
        ],
    },
    10: {
        "a": [
            ("I ___ visit my parents next weekend. (plan)", "am going to / will / was going to", "am going to"),
            ("She ___ be happy — she got promoted.", "must / might / can't", "must"),
            ("I ___ play football when I was young.", "used to / am used to / get used to", "used to"),
            ("They ___ travel last summer but cancelled.", "were going to / are going to / will", "were going to"),
            ("That ___ be him — he's in Paris.", "can't / must / might", "can't"),
        ],
        "b": [
            ("Wait — I ___ help you.", "will / am going to / used to", "will"),
            ("She ___ living in a big city.", "is used to / used to / was going to", "is used to"),
            ("I ___ have left my keys at work.", "might / must / can't", "might"),
            ("She ___ meeting her boss at 3.", "is / will / used to", "is"),
            ("It took months to ___ living here.", "get used to / used to / must", "get used to"),
        ],
        "c": [
            ("*I am going to call you yesterday.*", "I **was going to** call you yesterday."),
            ("*That mustn't be him.* (imposible)", "That **can't** be him."),
            ("*I am used to play tennis.*", "I am used to **playing** / I **used to play**…"),
            ("*Look! It will rain.* (nubes negras)", "It **is going to** rain."),
            ("*They was going to come.*", "They **were going to** come."),
        ],
    },
}

VOCAB = {
    7: {
        "a": [
            ("change your mind", "cambiar de opinión · cancelar · posponer", "cambiar de opinión"),
            ("postpone", "posponer · decidirse · olvidar", "posponer"),
            ("cancel", "cancelar · retrasar · disfrutar", "cancelar"),
            ("intention", "intención · horario · evidencia", "intención"),
            ("reschedule", "reprogramar · cancelar · aterrizar", "reprogramar"),
        ],
        "b": [
            ("make up your ___", "mind / plan / trip", "mind"),
            ("have second ___", "thoughts / flights / hotels", "thoughts"),
            ("a cancelled ___", "plan / must / continuous", "plan"),
            ("an ___ (fecha y hora fijas)", "arrangement / intention / opinion", "arrangement"),
            ("___ = retrasar", "delay / enjoy / depart", "delay"),
        ],
    },
    8: {
        "a": [
            ("anxious", "ansioso · aliviado · orgulloso", "ansioso"),
            ("relieved", "aliviado · decepcionado · envidioso", "aliviado"),
            ("confident", "seguro de sí · confuso · nervioso", "seguro de sí"),
            ("disappointed", "decepcionado · emocionado · curioso", "decepcionado"),
            ("frustrated", "frustrado · agradecido · contento", "frustrado"),
        ],
        "b": [
            ("proud ≈ ___", "orgulloso / avergonzado / aburrido", "orgulloso"),
            ("grateful ≈ ___", "agradecido / resentido / celoso", "agradecido"),
            ("embarrassed ≈ ___", "avergonzado / complacido / calmado", "avergonzado"),
            ("excited ≈ ___", "emocionado / deprimido / miserable", "emocionado"),
            ("confused ≈ ___", "confundido / seguro / curioso", "confundido"),
        ],
    },
    9: {
        "a": [
            ("habit", "hábito · vuelo · ascenso", "hábito"),
            ("routine", "rutina · pasaporte · comedia", "rutina"),
            ("lifestyle", "estilo de vida · aeropuerto · anillo", "estilo de vida"),
            ("give up", "dejar (hábito) · empezar · posponer", "dejar (hábito)"),
            ("take up", "empezar (actividad) · cancelar · odiar", "empezar (actividad)"),
        ],
        "b": [
            ("keep up ≈ ___", "mantener / dejar / cancelar", "mantener"),
            ("adapt ≈ ___", "adaptarse / olvidar / reservar", "adaptarse"),
            ("tradition ≈ ___", "tradición / retraso / evidencia", "tradición"),
            ("no longer ≈ ___", "ya no / todavía / siempre", "ya no"),
            ("adjustment period ≈ ___", "periodo de ajuste / billete / comedia", "periodo de ajuste"),
        ],
    },
    10: {
        "a": [
            ("postpone", "posponer · must · continuous", "posponer"),
            ("relieved", "aliviado · despegar · pueblo", "aliviado"),
            ("commuting", "ir/venir al trabajo · cancelar · anillo", "ir/venir al trabajo"),
            ("engaged", "prometido/a · horario · campo", "prometido/a"),
            ("arrangement", "arreglo fijo · hábito pasado · imposibilidad", "arreglo fijo"),
        ],
        "b": [
            ("was going to = ___", "plan fallido / hábito pasado / casi seguro", "plan fallido"),
            ("used to = ___", "hábito pasado / arreglo fijo / evidencia", "hábito pasado"),
            ("must = ___", "casi seguro / posible / imposible", "casi seguro"),
            ("can't = ___", "imposible / plan / rutina", "imposible"),
            ("get used to = ___", "acostumbrarse / cancelar / despegar", "acostumbrarse"),
        ],
    },
}

READ_Q = {
    7: [
        ("Where was the person going to travel?", "Japan", "Japan / China / Korea"),
        ("Why change their mind?", "new job", "new job / weather / money"),
        ("Who was going to come?", "a friend", "a friend / a boss / nobody"),
        ("Cities?", "Tokyo and Kyoto", "Tokyo and Kyoto / Osaka / Seoul"),
        ("Learn Japanese?", "No", "No / Yes"),
        ("Booked flight?", "Yes", "Yes / No"),
        ("Maybe go ___ year", "next", "next / last / this"),
        ("Main structure?", "was/were going to", "was/were going to / will / used to"),
        ("Friend had to ___", "postpone", "postpone / enjoy / book"),
        ("Went to Japan last year?", "False", "False / True"),
        ("Underline 3× was/were going to.", "See text", "(open)"),
        ("Write one more I was going to… but…", "Model OK", "(open)"),
        ("Key vocab in text?", "booked, postpone, changed my mind", "booked… / only numbers"),
        ("Ending tone?", "hopeful", "hopeful / angry / empty"),
        ("Course link", "/curso-b1/unit-7", "/curso-b1/unit-7"),
    ],
    8: [
        ("Neighbour must be ___", "happy", "happy / angry / tired"),
        ("Why? He moved into a new ___", "house", "house / office / car"),
        ("He might have got a ___", "promotion", "promotion / ticket / dog"),
        ("He looks more ___", "confident", "confident / anxious / angry"),
        ("Wife can't be ___", "angry", "angry / relieved / excited"),
        ("They walk in the ___", "park", "park / office / airport"),
        ("She must feel ___", "relieved", "relieved / jealous / bored"),
        ("Writer might invite them for ___", "coffee", "coffee / dinner only / nothing"),
        ("Modal for strong deduction?", "must", "must / might / can't"),
        ("Modal for impossibility?", "can't", "can't / must / might"),
        ("Promotion is certain?", "False (might)", "False / True"),
        ("Underline must / might / can't.", "See text", "(open)"),
        ("Write one deduction about a friend.", "Model OK", "(open)"),
        ("Feelings vocab in text?", "happy, confident, relieved", "yes / none"),
        ("Course link", "/curso-b1/unit-8", "/curso-b1/unit-8"),
    ],
    9: [
        ("Used to live in a ___", "village", "village / city / hotel"),
        ("How go to school?", "walk", "walk / bus / car"),
        ("Lives now in a ___", "big city", "big city / village / farm"),
        ("Used to the ___", "noise", "noise / silence / ocean"),
        ("Took a few ___ to get used to", "months", "months / days / years"),
        ("Used to hate ___", "traffic", "traffic / school / food"),
        ("Minds traffic now?", "No", "No / Yes"),
        ("Parents used to visit every ___", "weekend", "weekend / year / hour"),
        ("Structure for past habits?", "used to", "used to / be used to / must"),
        ("Structure for accustomed now?", "be used to", "be used to / used to / will"),
        ("Got used to city quickly?", "False", "False / True"),
        ("Underline used to / be used to / get used to.", "See text", "(open)"),
        ("Write your village→city (or reverse) story.", "Model OK", "(open)"),
        ("Key lifestyle words?", "noise, traffic, lifestyle", "yes / none"),
        ("Course link", "/curso-b1/unit-9", "/curso-b1/unit-9"),
    ],
    10: [
        ("Used to live in a small ___", "town", "town / castle / plane"),
        ("Lives now in ___", "London", "London / Tokyo / village"),
        ("Meeting sister at the ___", "airport", "airport / park / office"),
        ("Sister is flying from ___", "Spain", "Spain / Japan / Italy"),
        ("Booked flight to ___", "Tokyo", "Tokyo / Paris / Rome"),
        ("Was going to go last year but ___", "cancelled / work", "cancelled because of work"),
        ("Neighbour must be ___", "happy", "happy / angry / late"),
        ("Getting used to ___ lifestyle", "busy city", "busy city / village / quiet"),
        ("Find a future form in the text", "am meeting / is flying / booked…", "(open)"),
        ("Find was going to", "I was going to go last year", "(open)"),
        ("Find must", "must be happy", "(open)"),
        ("Find used to / getting used to", "used to live / getting used to", "(open)"),
        ("Main idea?", "mixed B1 structures in one story", "mixed / only A1 / empty"),
        ("Write 4 sentences: going to, was going to, must, used to", "Model OK", "(open)"),
        ("Course link", "/curso-b1/unit-10", "/curso-b1/unit-10"),
    ],
}

LISTEN_Q = {
    7: [
        ("Topic?", "weekend plans", "weekend plans / work / food"),
        ("Saturday plan?", "cinema", "cinema / gym / office"),
        ("With whom?", "sister", "sister / boss / strangers"),
        ("Ended up?", "watching alone", "watching alone / flying / cooking"),
        ("Film type?", "comedy", "comedy / horror / news"),
        ("Sunday plan?", "study for exam", "study / travel / sleep only"),
        ("Why postpone?", "felt tired", "felt tired / rain / money"),
        ("Parents cancel reason?", "bad weather", "bad weather / traffic / joy"),
        ("Went with sister?", "False", "False / True"),
        ("Grammar focus?", "was/were going to", "was/were going to / will / used to"),
        ("First I was going to… line", "cinema…", "(open)"),
        ("Parents line", "were going to visit…", "(open)"),
        ("Make one negative", "wasn't going to…", "(open)"),
        ("Shadow full audio", "done", "(open)"),
        ("Open Ver solución after try", "yes", "yes"),
    ],
    8: [
        ("Who is speaking?", "Lisa", "Lisa / Tom / Mark"),
        ("Where did she see Sarah?", "supermarket", "supermarket / park / airport"),
        ("Sarah must be ___", "excited", "excited / angry / bored"),
        ("Evidence?", "wedding magazine + smiling", "magazine / nothing / rain"),
        ("She might be ___ soon", "getting married", "getting married / moving / retiring"),
        ("Boyfriend can't be ___", "far", "far / happy / late"),
        ("Evidence for ring?", "ring on her finger", "ring / ticket / keys"),
        ("They must have got ___", "engaged", "engaged / fired / lost"),
        ("Lisa feels ___", "happy for her", "happy / angry / jealous"),
        ("Strong deduction modal?", "must", "must / might / can't"),
        ("Possibility modal?", "might", "might / must / can't"),
        ("Write Lisa's first deduction", "She must be excited…", "(open)"),
        ("Write the can't line", "can't be far…", "(open)"),
        ("Shadow audio", "done", "(open)"),
        ("Open Ver solución", "yes", "yes"),
    ],
    9: [
        ("Who speaks?", "Mark", "Mark / Lisa / Emma"),
        ("Used to work in an ___", "office", "office / hospital / school"),
        ("Works now ___", "from home", "from home / abroad / nights"),
        ("Got used to it after a few ___", "weeks", "weeks / years / hours"),
        ("Is used to waking up ___", "early", "early / late / never"),
        ("Used to spend hours ___", "commuting", "commuting / sleeping / cooking"),
        ("Saves that ___ now", "time", "time / money only / nothing"),
        ("Wife used to ___", "worry", "worry / travel / shout"),
        ("Wife is used to it ___", "now", "now / never / yesterday"),
        ("Past habit structure?", "used to", "used to / must / will"),
        ("Process structure?", "got used to", "got used to / can't / will"),
        ("Write Mark's first used to…", "I used to work in an office…", "(open)"),
        ("Write be used to line", "I am used to waking up early…", "(open)"),
        ("Shadow audio", "done", "(open)"),
        ("Open Ver solución", "yes", "yes"),
    ],
    10: [
        ("Who speaks?", "Emma", "Emma / Tom / Lisa"),
        ("Used to work in an ___", "office", "office / shop / farm"),
        ("Works now ___", "from home", "from home / abroad"),
        ("Going to travel to ___", "Italy", "Italy / Japan / Spain"),
        ("Was going to go ___ year", "last", "last / next / this"),
        ("Cancelled because of ___", "work", "work / weather / money"),
        ("Friend must be ___", "happy", "happy / angry / late"),
        ("Friend just got ___", "engaged", "engaged / fired / lost"),
        ("Used to early ___", "flights", "flights / classes / meals"),
        ("Find going to", "am going to travel", "(open)"),
        ("Find was going to", "was going to go last year", "(open)"),
        ("Find must", "must be happy", "(open)"),
        ("Find used to / am used to", "used to work / am used to early flights", "(open)"),
        ("Shadow audio", "done", "(open)"),
        ("Open Ver solución", "yes", "yes"),
    ],
}

WRITE = {
    7: (
        [
            "Escribe 2–3 frases: un plan que no ocurrió (*I was going to… but…*).",
            "Completa: I ___ going to call you yesterday but I forgot.",
            "Completa: They ___ going to travel but cancelled.",
            "Completa (neg.): She ___ going to attend.",
            "Escribe 1 frase con *We were going to… but…*.",
            "Completa: What ___ you going to do?",
            "Escribe sobre algo que pospusiste.",
            "Usa *postpone* y *change your mind* en 2 frases.",
            "Escribe: *She was going to…* / *They were going to…*",
            "Párrafo (3–4 frases) sobre un viaje cancelado.",
            "Corrige: *I am going to call you yesterday.*",
            "Corrige: *They was going to come.*",
            "Traduce: Íbamos a ver una película pero estábamos cansados.",
            "Pregunta *Were you going to…?* + respuesta.",
            "Autochequeo: 5× was/were going to en tu texto.",
        ],
        [
            "Model: I was going to visit my aunt but I got sick.",
            "**was**",
            "**were**",
            "**wasn't**",
            "Model: We were going to eat out but it was closed.",
            "**were**",
            "Model: I was going to finish the report but I postponed it.",
            "I postponed the meeting. / I changed my mind about the trip.",
            "She was going to study law. They were going to move abroad.",
            "Open — include was/were going to + but + reason.",
            "I **was going to** call you yesterday.",
            "They **were going to** come.",
            "We **were going to** watch a film but we were too tired.",
            "Were you going to come? — Yes, but I changed my mind.",
            "Self-check vs theory.",
        ],
    ),
    8: (
        [
            "Escribe 3 deducciones sobre alguien (*must / might / can't*).",
            "Completa: She ___ be happy — she got promoted.",
            "Completa: That ___ be him — he's in Paris.",
            "Completa: I ___ have left my keys at work.",
            "Usa *relieved* y *anxious* en 2 frases con modales.",
            "Completa: They ___ be at home — the lights are on.",
            "Escribe por qué *mustn't* ≠ imposible.",
            "Corrige: *He must to be tired.*",
            "Corrige: *That mustn't be her.* (imposible)",
            "Mini-párrafo: deduce cómo se siente un amigo.",
            "Traduce: Debe de estar aliviada.",
            "Traduce: No puede ser él.",
            "Traduce: Podría haber dejado las llaves.",
            "Diálogo de 4 líneas con must/might/can't.",
            "Autochequeo: 1× cada modal.",
        ],
        [
            "Model: She must be tired. He might be late. That can't be true.",
            "**must**",
            "**can't**",
            "**might**",
            "She must feel relieved. He might be anxious.",
            "**must**",
            "For impossibility use **can't**, not mustn't.",
            "He **must be** tired.",
            "That **can't** be her.",
            "Open — evidence + modal + feeling.",
            "She **must** feel / be relieved.",
            "That **can't** be him.",
            "I **might** have left the keys.",
            "Open dialogue.",
            "Self-check.",
        ],
    ),
    9: (
        [
            "Escribe 2× *used to*, 1× *be used to*, 1× *get used to*.",
            "Completa: I ___ play football when I was young.",
            "Completa: She ___ living in a big city.",
            "Completa: It took months to ___ living here.",
            "Negativa: I didn't ___ to like coffee.",
            "Pregunta: Did you ___ to live in London?",
            "Corrige: *I am used to play tennis.*",
            "Corrige: *I didn't used to smoke.*",
            "Usa *give up* y *take up* en 2 frases.",
            "Párrafo: tu cambio de hábitos (pueblo/ciudad o trabajo).",
            "Traduce: Solía odiar el tráfico.",
            "Traduce: Estoy acostumbrado al ruido.",
            "Traduce: Me costó meses acostumbrarme.",
            "Escribe *I am getting used to…*",
            "Autochequeo: no mezclar used to / be used to.",
        ],
        [
            "Model answers using the three structures.",
            "**used to**",
            "**is used to**",
            "**get used to**",
            "**use**",
            "**use**",
            "I am used to **playing** / I **used to play**.",
            "I didn't **use** to smoke.",
            "I gave up sugar. I took up running.",
            "Open paragraph.",
            "I **used to** hate traffic.",
            "I **am used to** the noise.",
            "It took me months to **get used to** it.",
            "I am getting used to waking up early.",
            "Self-check.",
        ],
    ),
    10: (
        [
            "Una frase con cada: going to, was going to, must, can't, used to, get used to.",
            "Completa: I ___ visit my parents next weekend. (plan)",
            "Completa: I ___ call you yesterday but I forgot.",
            "Completa: She ___ be happy — she got promoted.",
            "Completa: That ___ be him — he's abroad.",
            "Completa: I ___ play tennis when I was young.",
            "Completa: She ___ living in London now.",
            "Corrige: *I am going to call you yesterday.*",
            "Corrige: *That mustn't be him.* (imposible)",
            "Corrige: *I am used to play…*",
            "Mini-historia (5 frases) mezclando U6–U9.",
            "Matching mental: plan fallido vs hábito pasado.",
            "Traduce: Iba a ir pero cancelé.",
            "Traduce: Debe de estar emocionada.",
            "Autochequeo con el mapa de la Unidad 10.",
        ],
        [
            "Open — one of each structure.",
            "**am going to**",
            "**was going to**",
            "**must**",
            "**can't**",
            "**used to**",
            "**is used to**",
            "I **was going to** call you yesterday.",
            "That **can't** be him.",
            "I am used to **playing** / I **used to play**.",
            "Open mixed paragraph.",
            "was going to = unfulfilled plan; used to = past habit.",
            "I **was going to** go but I cancelled.",
            "She **must** be excited.",
            "Self-check vs review map.",
        ],
    ),
}


def block_abc(items, kind="fill"):
    lines = []
    answers = []
    for i, row in enumerate(items, 1):
        if kind == "fix":
            q, sol = row
            lines.append(f"{i}. {q}")
            answers.append(f"{i}. {sol}")
        else:
            q, opts, sol = row
            lines.append(f"{i}. {q} → *{opts}*")
            answers.append(f"{i}. **{sol}**")
    return "\n".join(lines), " · ".join(answers) if kind != "fix" else "\n".join(answers)


def render_unit(u: int) -> str:
    m = META[u]
    g = GRAM[u]
    v = VOCAB[u]
    rq = READ_Q[u]
    lq = LISTEN_Q[u]
    wp, ws = WRITE[u]

    g1q, g1a = block_abc(g["a"])
    g2q, g2a = block_abc(g["b"])
    g3q, g3a = block_abc(g["c"], kind="fix")
    v1q, v1a = block_abc(v["a"])
    v2q, v2a = block_abc(v["b"])

    def qa_list(rows, start=1):
        q_lines, a_lines = [], []
        for i, (q, sol, opts) in enumerate(rows, start):
            if opts == "(open)":
                q_lines.append(f"{i}. {q}")
            else:
                q_lines.append(f"{i}. {q} → *{opts}*")
            a_lines.append(f"{i}. **{sol}**")
        return "\n".join(q_lines), " · ".join(a_lines)

    r1q, r1a = qa_list(rq[:5], 1)
    r2q, r2a = qa_list(rq[5:10], 6)
    r3q, r3a = qa_list(rq[10:], 11)
    l1q, l1a = qa_list(lq[:5], 1)
    l2q, l2a = qa_list(lq[5:10], 6)
    l3q, l3a = qa_list(lq[10:], 11)

    w_q = "\n".join(f"{i}. {t}" for i, t in enumerate(wp, 1))
    w_a = "\n".join(f"{i}. {t}" for i, t in enumerate(ws, 1))

    kws = "\n".join(f"  - {k}" for k in [
        f"ejercicios inglés B1 unidad {u}",
        *m["kw"],
        "curso B1 Linguafly",
    ])

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
3. Siguiente: [{META.get(u + 1, META[u])["title"] if u < 10 else "Módulo 2"}](/blog/curso-b1/{m["next_t"]}{"-ejercicios-soluciones" if u < 10 else ""}).

Guías relacionadas:

- [Teoría Unidad {u}](/blog/curso-b1/{m["slug"]})
- [Cuaderno anterior](/blog/curso-b1/{m["prev"]})
- [Inglés B1](/blog/metodos/cursos-online-ingles-b1)

---

*Cuaderno alineado con la Unidad {u} del [curso B1 de Linguafly](/curso-b1).*
"""


def main():
    for u in (7, 8, 9, 10):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path, "chars", path.stat().st_size)


if __name__ == "__main__":
    main()
