#!/usr/bin/env python3
"""Generate B2 Units 36–40 exercise workbooks and workbook TTS.

The workbooks follow the B2 U31–35 structure: Spanish instructions, closed
practice, complete answer keys, reading/listening comprehension, and explicit
models for writing and speaking.
"""
from __future__ import annotations

from pathlib import Path

from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/content/blog/curso-b2"
DATE = "2026-09-01"
HUB = "ingles-b2"

META = {
    36: {
        "slug": "unidad-36-used-to-would-culture",
        "title": "Used To, Would & Culture",
        "full": "Used To vs Would for Past Habits + Culture Extended",
        "focus": "used to y would para acciones habituales, estados y existencia en el pasado",
        "vocab": "Culture extended",
        "image": "/blog/curso-b2/unit-36/used-to-would-map.png",
        "prev": "unidad-35-repaso-31-34-ejercicios-soluciones",
        "next": "unidad-37-auxiliaries-business-ejercicios-soluciones",
        "next_title": "Unidad 37 — Auxiliaries & Business",
        "reading_title": "The village Elena remembers",
        "listening_title": "Maria describes harvest traditions",
        "related": [
            "unidad-36-used-to-would-culture",
            "unidad-35-repaso-31-34",
            "unidad-37-auxiliaries-business",
            HUB,
        ],
        "remember": [
            "**Used to + base** sirve con acciones y estados pasados: *used to visit; used to live*.",
            "**Would + base** recupera acciones repetidas cuando el marco pasado está claro; no los estados objetivo.",
            "Después de *did/didn't*, escribe **use to**, no *used to*: *Did she use to...?*",
            "La existencia pasada se expresa con **there used to be**.",
        ],
        "keywords": [
            "used to vs would ejercicios B2",
            "past habits states used to práctica",
            "did you use to ejercicios",
            "culture vocabulary B2 ejercicios",
        ],
    },
    37: {
        "slug": "unidad-37-auxiliaries-business",
        "title": "Auxiliaries & Business",
        "full": "Auxiliaries for Emphasis and Short Answers + Business Extended",
        "focus": "do, does, did y auxiliares existentes para énfasis y respuestas cortas",
        "vocab": "Business extended",
        "image": "/blog/curso-b2/unit-37/auxiliaries-map.png",
        "prev": "unidad-36-used-to-would-culture-ejercicios-soluciones",
        "next": "unidad-38-phrasal-verbs-5-run-set-take-leisure-ejercicios-soluciones",
        "next_title": "Unidad 38 — RUN, SET, TAKE & Leisure",
        "reading_title": "A quarter of confirmed progress",
        "listening_title": "The board meeting update",
        "related": [
            "unidad-37-auxiliaries-business",
            "unidad-36-used-to-would-culture",
            "unidad-38-phrasal-verbs-5-run-set-take-leisure",
            HUB,
        ],
        "remember": [
            "Con verbo léxico simple, enfatiza con **do/does/did + base**.",
            "Si ya hay auxiliar, ese auxiliar recibe el énfasis: *has finished, is coming, will proceed*.",
            "La short answer repite la familia de la pregunta: *Did...? did; Have...? have; Is...? is*.",
            "Distingue **revenue** (ingresos) de **profit** (ingresos menos costes).",
        ],
        "keywords": [
            "auxiliary verbs emphasis ejercicios B2",
            "do does did énfasis práctica",
            "short answers auxiliaries ejercicios",
            "business vocabulary B2 ejercicios",
        ],
    },
    38: {
        "slug": "unidad-38-phrasal-verbs-5-run-set-take-leisure",
        "title": "Phrasal Verbs RUN, SET, TAKE & Leisure",
        "full": "RUN, SET and TAKE Phrasal Verbs + Leisure Extended",
        "focus": "run into/out of/through/by, set up/off/out/aside y take to/up/off/on",
        "vocab": "Leisure extended",
        "image": "/blog/curso-b2/unit-38/run-set-take-map.png",
        "prev": "unidad-37-auxiliaries-business-ejercicios-soluciones",
        "next": "unidad-39-phrasal-verbs-6-turn-work-sport-ejercicios-soluciones",
        "next_title": "Unidad 39 — TURN, WORK & Sport",
        "reading_title": "A photography club's first trip",
        "listening_title": "Nina plans a hiking weekend",
        "related": [
            "unidad-38-phrasal-verbs-5-run-set-take-leisure",
            "unidad-37-auxiliaries-business",
            "unidad-39-phrasal-verbs-6-turn-work-sport",
            HUB,
        ],
        "remember": [
            "Aprende el complemento: **run out of battery; run the idea by Marta**.",
            "**Set off/set out** inician un viaje; **set up** crea o monta; **set aside** reserva.",
            "**Take up** inicia una actividad; **take to** expresa afición; **take on** acepta un reto.",
            "Con pronombre: *set it up, take it on*, pero *run into him, run out of it*.",
        ],
        "keywords": [
            "phrasal verbs run set take ejercicios B2",
            "run into out of through by práctica",
            "set up off out aside ejercicios",
            "take to up off on diferencias",
        ],
    },
    39: {
        "slug": "unidad-39-phrasal-verbs-6-turn-work-sport",
        "title": "Phrasal Verbs TURN, WORK & Sport",
        "full": "TURN and WORK Phrasal Verbs + Sport Extended",
        "focus": "turn up/down/out/into y work out/on/through según resultado, objeto y contexto",
        "vocab": "Sport extended",
        "image": "/blog/curso-b2/unit-39/turn-work-map.png",
        "prev": "unidad-38-phrasal-verbs-5-run-set-take-leisure-ejercicios-soluciones",
        "next": "unidad-40-repaso-36-39-ejercicios-soluciones",
        "next_title": "Unidad 40 — Repaso 36–39",
        "reading_title": "A difficult season ends well",
        "listening_title": "A coach reviews the tournament",
        "related": [
            "unidad-39-phrasal-verbs-6-turn-work-sport",
            "unidad-38-phrasal-verbs-5-run-set-take-leisure",
            "unidad-40-repaso-36-39",
            HUB,
        ],
        "remember": [
            "**Turn up** = llegar; **turn down** = rechazar; **turn out** = resultar; **turn into** = convertirse.",
            "**Work out** puede significar entrenar, resolver o elaborar; el complemento decide.",
            "**Work on** mejora algo; **work through** aborda una dificultad paso a paso.",
            "Escribe **a workout** como sustantivo y **work out** como verbo.",
        ],
        "keywords": [
            "phrasal verbs turn work ejercicios B2",
            "turn up down out into práctica",
            "work out on through diferencias",
            "sport vocabulary B2 ejercicios",
        ],
    },
    40: {
        "slug": "unidad-40-repaso-36-39",
        "title": "Repaso 36–39",
        "full": "Past Habits, Auxiliaries, RUN/SET/TAKE and TURN/WORK",
        "focus": "hábitos pasados, auxiliares y phrasal verbs de RUN, SET, TAKE, TURN y WORK",
        "vocab": "Culture, Business, Leisure y Sport",
        "image": "/blog/curso-b2/unit-40/review-map.png",
        "prev": "unidad-39-phrasal-verbs-6-turn-work-sport-ejercicios-soluciones",
        "next": "unidad-36-used-to-would-culture-ejercicios-soluciones",
        "next_title": "Repasar Unidad 36 — Used To, Would & Culture",
        "reading_title": "A community festival takes off",
        "listening_title": "Lisa reports on the charity event",
        "related": [
            "unidad-40-repaso-36-39",
            "unidad-36-used-to-would-culture",
            "unidad-37-auxiliaries-business",
            "unidad-38-phrasal-verbs-5-run-set-take-leisure",
            "unidad-39-phrasal-verbs-6-turn-work-sport",
            HUB,
        ],
        "remember": [
            "Etiqueta primero la familia: **hábito, auxiliar, RUN/SET/TAKE o TURN/WORK**.",
            "Comprueba forma base después de *used to, would, do, does* y *did*.",
            "Con phrasal verbs, decide significado antes de revisar partícula y posición del objeto.",
            "Mantén los chunks temáticos: *preserve heritage, close a deal, set aside time, stay fit*.",
        ],
        "keywords": [
            "repaso inglés B2 unidades 36 39",
            "used to auxiliaries phrasal verbs review",
            "run set take turn work ejercicios",
            "repaso módulo 4 B2 ejercicios",
        ],
    },
}

READING = {
    36: (
        "When Elena was young, she used to live in a mountain village. Every Sunday, she would "
        "visit her grandmother, and they would gather by the fire to hear local legends. There "
        "used to be a market in the square every Saturday. In autumn, the village used to hold a "
        "harvest ceremony, and children would wear folk costumes and sing. Elena used to believe "
        "one superstition about the first winter snow, but she no longer does. Today, she teaches "
        "folk music at a cultural centre. She also records the stories that older residents hand "
        "down, helping the community preserve its heritage while welcoming cultural diversity."
    ),
    37: (
        "Despite two unexpected delays, the sales team did complete the project on time. Sofia did "
        "submit the proposal before Friday, and the client has approved it. The finance director "
        "does agree with the revised terms, although she wants one more audit. The legal team has "
        "finished the contract, and both companies will proceed with the merger next month. The CEO "
        "is coming to tomorrow's presentation. Revenue did rise this quarter, but costs also "
        "increased, so profit remained stable. The team did exceed its sales target and closed an "
        "important deal. It now has to agree on final terms and sign the contract before the deadline."
    ),
    38: (
        "Last month, Tom took up photography and soon took to it. At a camera shop, he ran into an "
        "old friend called Mei. They set up a photography club and set aside two hours every Sunday "
        "for practice. Before their first camping trip, they ran through the itinerary and Tom ran "
        "the route by an experienced guide. They set out at dawn and set off for the hills. Halfway "
        "through the hike, they ran out of battery power, but a spare phone saved the day. Tom took "
        "on the challenge of photographing a waterfall. One picture became popular online, and the "
        "club quickly took off. The members now use their leisure time to explore new places and unwind."
    ),
    39: (
        "More than five hundred fans turned up for the final match. The tournament turned out to be "
        "a major success, although the team had faced a difficult season. Before the final, Ava had "
        "worked on her serve for months. She had turned down an offer from another club because she "
        "wanted to stay with her teammates. Together, they worked through several setbacks and one "
        "serious injury with professional support. Their coach worked out a safer training schedule, "
        "and Ava continued to work out at the gym three times a week. The players also worked out a "
        "problem with their defensive strategy. Their persistence turned a nervous group into a "
        "confident team, and they eventually won the cup."
    ),
    40: (
        "When Lisa was a child, her town used to celebrate a harvest festival, and her family would "
        "hold a small ceremony. Years later, Lisa did propose a new community event to preserve that "
        "heritage. Her company approved the budget and set up a charity sports day. Lisa ran the plan "
        "by a local coach, and volunteers set aside a weekend for it. Several residents took up yoga, "
        "while one athlete worked through an injury before the event. More than eight hundred people "
        "turned up, and the day turned out to be a success. The team did exceed its fundraising target. "
        "The organisers have now agreed to repeat the event, which has turned into a new local tradition."
    ),
}

LISTENING = {
    36: (
        "Hi, I'm Maria. I grew up in rural Spain, where we used to celebrate the harvest every autumn. "
        "There used to be a ceremony in the main square, and people would wear folk costumes. My "
        "grandfather would tell us legends while my grandmother prepared food. I used to love those "
        "stories, although I used to be afraid of one superstition about storms. On Saturdays, my "
        "mother and I would visit the market and listen to folk music. Now I work with local schools "
        "to preserve our cultural heritage. We record folklore, hold an annual ceremony and invite "
        "families from different backgrounds to share their customs."
    ),
    37: (
        "Good morning. I do want to begin with some positive news. We did close the Greenway deal "
        "yesterday, and both parties have signed the contract. The client has approved our proposal, "
        "but it does want a lower budget for the second stage. Have we completed the audit? Yes, we "
        "have. Is the CEO attending Friday's presentation? Yes, she is. Can the design team meet the "
        "new deadline? Yes, it can. Revenue has exceeded the target, although profit has not increased "
        "yet. We will proceed with the current strategy after we agree on the remaining terms."
    ),
    38: (
        "Hi, I'm Nina. I took up hiking last spring and took to it immediately. This Friday, our club "
        "will set out at six and set off for Pine Valley. I have set aside the whole weekend. Yesterday, "
        "we ran through the itinerary and ran it by our guide, Sam. He warned us not to run out of "
        "water. We may run into other hikers near the lake because a festival is taking place there. "
        "I have taken on the challenge of planning the picnic, while Leo will set up the tents. Our "
        "online club has really taken off, so twelve people are joining this trip to explore and unwind."
    ),
    39: (
        "I'm Coach Malik, and our regional tournament finished yesterday. Nearly a thousand fans turned "
        "up for the final, which turned out to be our best match this year. Our captain had turned down "
        "an offer from a rival club. She worked on her serve all season and worked through a shoulder "
        "injury with the medical team. We also worked out a new training schedule and solved a defensive "
        "problem. The players work out at the gym four mornings a week to stay fit. Their discipline "
        "turned them into a stronger team, and they won the cup. Tomorrow they can enjoy a light workout."
    ),
    40: (
        "Hello, this is Lisa with an update on Saturday's charity festival. Our town used to hold a "
        "similar event, and older residents would organise traditional games. This year, the business "
        "association did approve our proposal and has paid for the equipment. We set up six activity "
        "areas and ran the safety plan by the council. Volunteers took on different roles and worked "
        "through the heavy rain. More than eight hundred visitors turned up, and the event turned out "
        "very well. We did exceed our fundraising target. Have we decided to repeat it next year? Yes, "
        "we have. We will set aside the first weekend in September."
    ),
}


def item(prompt: str, options: str, answer: str, explanation: str) -> tuple[str, str, str, str]:
    return prompt, options, answer, explanation


GRAMMAR = {
    36: [
        (
            "Acción repetida o estado",
            "Elige según el tipo de verbo. *Would* solo es opción objetivo con acciones repetidas y un marco pasado claro.",
            [
                item("When I was a child, I ___ my grandmother every Sunday.", "used to visit · would visit · ambas", "ambas", "*Visit* es acción repetida y el marco pasado está claro."),
                item("They ___ in a small coastal town before 2010.", "used to live · would live", "used to live", "*Live* presenta un estado pasado."),
                item("Every autumn, the villagers ___ a harvest festival.", "used to hold · would hold · ambas", "ambas", "*Hold* es una acción repetida con marcador temporal."),
                item("Maya ___ in that superstition as a teenager.", "used to believe · would believe", "used to believe", "*Believe* es estado en este contraste."),
                item("There ___ a market beside the church.", "used to be · would be", "used to be", "La existencia pasada usa *there used to be*."),
            ],
        ),
        (
            "Afirmativa, negativa y pregunta",
            "Escribe la forma completa. Después de *did/didn't*, usa *use to + base*.",
            [
                item("She ___ folk costumes. (afirmativa pasada habitual: wear)", "—", "used to wear", "La afirmativa se forma con *used to + base*."),
                item("We ___ the theatre regularly. (negativa: attend)", "—", "didn't use to attend", "*Didn't* ya marca pasado."),
                item("___ your family ___ the festival? (pregunta: celebrate)", "—", "Did your family use to celebrate", "La pregunta usa *Did + subject + use to + base*."),
                item("My grandfather ___ us a legend on winter nights. (would + tell)", "—", "would tell", "Tras *would* va la base *tell*."),
                item("___ a ceremony in this square? (pregunta de existencia)", "—", "Did there use to be", "El patrón interrogativo es *Did there use to be...?*"),
            ],
        ),
        (
            "Corrige exactamente un error",
            "Reescribe cada frase completa. Conserva el significado indicado.",
            [
                item("Did Elena *used to teach* folk music?", "—", "Did Elena use to teach folk music?", "Después de *did*, se escribe *use to*."),
                item("She *would be* afraid of old legends as a child. (estado)", "—", "She used to be afraid of old legends as a child.", "*Be afraid* es un estado pasado."),
                item("They used to *held* a ceremony every year.", "—", "They used to hold a ceremony every year.", "Después de *used to* va la forma base."),
                item("There *use to be* a market here. (afirmativa)", "—", "There used to be a market here.", "La afirmativa pasada se escribe *used to*."),
                item("In those days, *would sing* around the fire. (añade el elemento que falta)", "—", "In those days, they would sing around the fire.", "*Would* necesita un sujeto explícito."),
            ],
        ),
    ],
    37: [
        (
            "Do, does y did enfáticos",
            "Completa para corregir o confirmar con fuerza. Mantén el verbo léxico en base.",
            [
                item("I ___ to attend the meeting, despite what Marta said.", "do want · am wanting · did wanted", "do want", "Presente con *I*: *do + base*."),
                item("The director ___ with the revised terms.", "does agree · does agrees · is agree", "does agree", "Tercera persona: *does + base*."),
                item("Sofia ___ the proposal before Friday.", "did submit · did submitted · has submit", "did submit", "Pasado enfático: *did + base*."),
                item("We ___ the target last quarter, although the forecast was poor.", "did exceed · did exceeded · do exceeded", "did exceed", "*Did* marca el pasado; *exceed* queda en base."),
                item("The team ___ enough revenue to fund the project.", "does have · does has · is have", "does have", "*Have* es aquí verbo léxico de posesión."),
            ],
        ),
        (
            "Auxiliar ya presente",
            "Elige la frase correcta. No añadas *do* a continuos, perfectos, pasivas o modales.",
            [
                item("Confirma que el audit está terminado.", "They have finished the audit. · They do have finished the audit.", "They have finished the audit.", "El present perfect ya contiene *have*."),
                item("Confirma la asistencia futura de la CEO.", "The CEO is coming. · The CEO does coming.", "The CEO is coming.", "El continuo ya contiene *is*."),
                item("Confirma la decisión futura.", "We will proceed. · We do will proceed.", "We will proceed.", "El modal *will* recibe el énfasis."),
                item("Confirma la pasiva perfecta.", "The deal has been closed. · The deal does have been closed.", "The deal has been closed.", "La cadena empieza con *has*."),
                item("Confirma capacidad para cumplir el plazo.", "I can meet the deadline. · I do can meet the deadline.", "I can meet the deadline.", "*Can* ya es auxiliar modal."),
            ],
        ),
        (
            "Short answers",
            "Responde exactamente con yes/no, pronombre y el auxiliar de la pregunta.",
            [
                item("Did they sign the contract? (sí)", "—", "Yes, they did.", "La pregunta lleva *did*."),
                item("Have you submitted the proposal? (no)", "—", "No, I haven't.", "La respuesta conserva *have*."),
                item("Is the CEO attending? (sí)", "—", "Yes, she is.", "Con el pronombre *she*, se conserva *is*."),
                item("Will the board approve the budget? (no)", "—", "No, it won't.", "La respuesta conserva el modal *will*."),
                item("Has the audit been completed? (sí)", "—", "Yes, it has.", "Se recupera el primer auxiliar *has*."),
            ],
        ),
    ],
    38: [
        (
            "Familia RUN",
            "Elige la escena exacta y conserva todos los complementos del phrasal verb.",
            [
                item("I ___ an old friend at the cinema by chance.", "ran into · ran through · ran out of", "ran into", "*Run into someone* es encontrarse por casualidad."),
                item("We ___ water halfway through the hike.", "ran out of · ran into · ran by", "ran out of", "*Run out of + recurso* significa quedarse sin."),
                item("Let's ___ the itinerary once before booking.", "run through · run into · run out of", "run through", "*Run through* es repasar rápidamente."),
                item("Let me ___ before we decide.", "run the route by you · run by the route you · run you by the route", "run the route by you", "La estructura es *run + idea + by + persona*."),
                item("Sustituye por pronombres: I ran into Marta and ran the plan by Marta.", "—", "I ran into her and ran it by her.", "*Run into* no se separa; la idea ocupa el centro de *run it by*."),
            ],
        ),
        (
            "Familia SET",
            "Completa con *set up, set off, set out* o *set aside* y conjuga si hace falta.",
            [
                item("They ___ a photography club last month. (crear)", "set up · set off · set aside", "set up", "*Set up* crea u organiza."),
                item("We ___ for the coast at six yesterday. (partir)", "set off · set up · set aside", "set off", "*Set off for + destino* inicia el viaje."),
                item("The explorers ___ at dawn to reach the lake. (iniciar ruta)", "set out · set up · set aside", "set out", "*Set out* marca el comienzo del recorrido."),
                item("Nina ___ two hours every Sunday for painting. (reservar)", "sets aside · sets off · sets out", "sets aside", "*Set aside* reserva tiempo."),
                item("Sustituye *the tent* por *it*: They set up the tent.", "—", "They set it up.", "*Set up* es separable; el pronombre va en medio."),
            ],
        ),
        (
            "Familia TAKE",
            "Decide si la escena expresa inicio, afición, despegue/éxito o aceptación de un reto.",
            [
                item("Leo ___ photography as a new hobby in May.", "took up · took to · took off", "took up", "*Take up* inicia una actividad."),
                item("Mina ___ hiking immediately and now loves it.", "took to · took up · took on", "took to", "*Take to* expresa que empezó a gustarle."),
                item("The plane ___ at 10:15.", "took off · took up · took on", "took off", "*Take off* significa despegar."),
                item("The small online club ___ after one photo became popular.", "took off · took to · took up", "took off", "Aquí *take off* significa ganar éxito rápidamente."),
                item("She ___ the challenge of organising the picnic.", "took on · took to · took off", "took on", "*Take on* acepta una responsabilidad o reto."),
            ],
        ),
    ],
    39: [
        (
            "Familia TURN",
            "Elige según llegada, rechazo, resultado o transformación.",
            [
                item("More than 500 fans ___ for the match.", "turned up · turned down · turned out", "turned up", "*Turn up* significa llegar o acudir."),
                item("Ava ___ the offer from another club.", "turned down · turned into · turned up", "turned down", "*Turn down* rechaza una oferta."),
                item("The final ___ to be a great success.", "turned out · turned up · turned into", "turned out", "*Turn out to be* presenta el resultado."),
                item("Years of training ___ Ava ___ a professional athlete.", "turned / into · turned / out · turned / up", "turned / into", "La estructura es *turn A into B*."),
                item("Sustituye *the offer* por *it*: She turned down the offer.", "—", "She turned it down.", "*Turn down* es separable."),
            ],
        ),
        (
            "Tres usos de WORK OUT",
            "Usa el complemento para decidir entre entrenar, resolver y elaborar.",
            [
                item("She ___ at the gym every morning.", "works out · works on · works through", "works out", "Sin objeto y con gimnasio significa entrenar."),
                item("The defenders ___ the tactical problem.", "worked out · worked on · worked through", "worked out", "Con *problem*, significa resolver."),
                item("The coach ___ a new training schedule.", "worked out · turned out · worked through", "worked out", "Con *schedule*, significa elaborar."),
                item("Sustituye *the problem* por *it*: They worked out the problem.", "—", "They worked it out.", "*Work out* con objeto es separable."),
                item("Corrige categorías: I had a good *work out* and now I *workout* daily.", "—", "I had a good workout and now I work out daily.", "Sustantivo junto; verbo separado."),
            ],
        ),
        (
            "WORK ON frente a WORK THROUGH",
            "Elige mejora continuada o proceso para afrontar una dificultad.",
            [
                item("Ava ___ her serve for three months. (mejorar)", "worked on · worked through · worked out at", "worked on", "*Work on* dedica esfuerzo a una destreza."),
                item("The team ___ a difficult period together. (afrontar paso a paso)", "worked through · worked on · worked out", "worked through", "*Work through* procesa una dificultad."),
                item("Completa con pronombre: She is working ___ her technique; she is working ___ it.", "on / on · on / it on", "on / on", "*Work on* permanece unido al objeto o pronombre."),
                item("With medical support, he ___ the recovery process.", "worked through · worked on at · worked out at", "worked through", "La escena es un proceso difícil abordado progresivamente."),
                item("Corrige: I *work my serve on* before every tournament.", "—", "I work on my serve before every tournament.", "*Work on* es inseparable en este uso."),
            ],
        ),
    ],
    40: [
        (
            "Diagnóstico U36–37",
            "Identifica primero si necesitas hábito/estado pasado o un auxiliar.",
            [
                item("She ___ in the village, and every Sunday she ___ her grandmother.", "used to live / would visit · would live / used visit", "used to live / would visit", "Estado con *used to*; acción repetida con *would*."),
                item("Corrige: Did there *used to be* a ceremony?", "—", "Did there use to be a ceremony?", "*Did* exige *use to*."),
                item("The team ___ the deal despite the delay. (énfasis pasado)", "did close · did closed · has close", "did close", "*Did + base* marca énfasis."),
                item("Have they approved the budget? (sí)", "—", "Yes, they have.", "La short answer conserva *have*."),
                item("The CEO ___ coming, and we ___ proceed. (auxiliares existentes)", "is / will · does / do will", "is / will", "Continuo y modal ya tienen auxiliar."),
            ],
        ),
        (
            "Diagnóstico U38",
            "Elige el phrasal verb completo por intención y revisa la posición del objeto.",
            [
                item("We ___ snacks, so I ___ the route ___ our guide.", "ran out of / ran / by · ran into / ran by / with", "ran out of / ran / by", "Recurso agotado y consulta de una idea."),
                item("They ___ the club, then ___ for the hills.", "set up / set off · set off / set up", "set up / set off", "Crear una organización y comenzar un viaje."),
                item("I ___ yoga in May and quickly ___ it.", "took up / took to · took on / took off", "took up / took to", "Inicio de actividad y afición posterior."),
                item("The plane ___, and later the travel blog also ___.", "took off / took off · took up / took on", "took off / took off", "Despegue literal y éxito rápido."),
                item("Sustituye objetos: set up the club; take on the challenge.", "—", "set it up; take it on", "Ambos pronombres ocupan posición intermedia."),
            ],
        ),
        (
            "Diagnóstico U39",
            "Decide la relación TURN/WORK y conserva el patrón completo.",
            [
                item("Fans ___, and the match ___ to be exciting.", "turned up / turned out · turned out / turned up", "turned up / turned out", "Llegada frente a resultado."),
                item("She ___ the offer, but training ___ her ___ a star.", "turned down / turned / into · turned out / turned / up", "turned down / turned / into", "Rechazo y transformación."),
                item("I ___ at the gym, while the coach ___ a schedule.", "work out / works out · work on / works through", "work out / works out", "Ejercicio y elaboración usan *work out*."),
                item("The player ___ her serve and ___ an injury.", "worked on / worked through · worked through / worked on", "worked on / worked through", "Mejora de destreza y proceso difícil."),
                item("Corrige: It was a hard *work out*, but everything *turned up* well.", "—", "It was a hard workout, but everything turned out well.", "Sustantivo junto y resultado con *turn out*."),
            ],
        ),
    ],
}

VOCAB = {
    36: [
        ("tradition", "práctica transmitida · ingreso empresarial · ruta", "práctica transmitida"),
        ("heritage", "legado histórico-cultural · pasatiempo · entrenamiento", "legado histórico-cultural"),
        ("custom", "forma tradicional de actuar · contrato · lesión", "forma tradicional de actuar"),
        ("ceremony", "acto formal significativo · superstición individual · afición", "acto formal significativo"),
        ("folklore", "relatos y saber popular · fusión empresarial · competición", "relatos y saber popular"),
        ("A traditional story about a hero is a ___.", "legend · ritual · target", "legend"),
        ("A belief without a rational basis is a ___.", "superstition · strategy · itinerary", "superstition"),
        ("Variety of cultures within one society is ___.", "cultural diversity · revenue · leisure time", "cultural diversity"),
        ("To adopt customs from another culture is to ___.", "assimilate · audit · unwind", "assimilate"),
        ("Traditional regional music is ___.", "folk music · workout · proposal", "folk music"),
        ("Communities work to ___ for future generations.", "preserve heritage"),
        ("The village will ___ in the square.", "hold a ceremony"),
        ("Families ___ stories to their children.", "hand down"),
        ("The whole town will ___ next weekend.", "celebrate a festival"),
        ("After moving permanently, they began to ___.", "put down roots"),
    ],
    37: [
        ("contract", "acuerdo formal vinculante · leyenda · caminata", "acuerdo formal vinculante"),
        ("deal", "trato negociado · ritual · torneo", "trato negociado"),
        ("budget", "plan de ingresos y gastos · ruta de viaje · horario deportivo", "plan de ingresos y gastos"),
        ("merger", "fusión de empresas · patrimonio · sesión de ejercicio", "fusión de empresas"),
        ("audit", "revisión formal de cuentas · ceremonia · club de ocio", "revisión formal de cuentas"),
        ("A formal plan sent for consideration is a ___.", "proposal · profit · serve", "proposal"),
        ("Money received before costs are deducted is ___.", "revenue · profit · budget", "revenue"),
        ("Money remaining after costs are deducted is ___.", "profit · revenue · target", "profit"),
        ("The person with the highest executive role is the ___.", "CEO · fan · guide", "CEO"),
        ("A measurable goal is a ___.", "target · deal · deadline", "target"),
        ("The sales team hopes to ___ before Friday.", "close a deal"),
        ("Sofia must ___ through the official portal.", "submit a proposal"),
        ("Both parties are ready to ___.", "sign the contract"),
        ("We need to ___ before negotiations end.", "agree on terms"),
        ("Sales were so strong that we managed to ___.", "exceed the target"),
    ],
    38: [
        ("hobby", "afición practicada con regularidad · lesión · contrato", "afición practicada con regularidad"),
        ("pastime", "actividad para pasar el tiempo · patrimonio · beneficio", "actividad para pasar el tiempo"),
        ("leisure time", "tiempo libre · plazo empresarial · tiempo de recuperación", "tiempo libre"),
        ("itinerary", "plan de ruta y lugares · superstición · saque", "plan de ruta y lugares"),
        ("picnic", "comida al aire libre · fusión empresarial · torneo", "comida al aire libre"),
        ("Staying outdoors in a tent is ___.", "camping · hiking · exploring", "camping"),
        ("Walking in nature as an activity is ___.", "hiking · a hike · a workout", "hiking"),
        ("One particular long walk is ___.", "a hike · hiking · leisure", "a hike"),
        ("To relax after effort is to ___.", "unwind · assimilate · exceed", "unwind"),
        ("A group formed around a shared interest is a ___.", "club · ceremony · merger", "club"),
        ("Maya decided to ___ and chose photography.", "take up a hobby"),
        ("We always ___ before making reservations.", "run through the itinerary"),
        ("Try to ___ for yourself every weekend.", "set aside time"),
        ("The group will ___ at dawn.", "set off on a trip"),
        ("Leo is ready to ___ of planning the route.", "take on the challenge"),
    ],
    39: [
        ("tournament", "competición organizada · costumbre · trato", "competición organizada"),
        ("injury", "daño físico · objetivo comercial · leyenda", "daño físico"),
        ("serve", "saque deportivo · beneficio · ruta", "saque deportivo"),
        ("stadium", "recinto deportivo grande · gimnasio privado · mercado", "recinto deportivo grande"),
        ("athlete", "persona que practica deporte competitivamente · aficionado · auditor", "persona que practica deporte competitivamente"),
        ("A 42.195-kilometre race is a ___.", "marathon · tournament · match", "marathon"),
        ("A person who supports a team is a ___.", "fan · spectator · CEO", "fan"),
        ("A plan of exercise sessions is a ___.", "training schedule · strategy audit · itinerary flight", "training schedule"),
        ("One session of physical exercise is a ___.", "workout · work out · pastime", "workout"),
        ("The trophy won in a competition can be called a ___.", "cup · deal · custom", "cup"),
        ("Ava goes to the gym to ___.", "stay fit"),
        ("The athlete will ___ her serve before the final.", "work on"),
        ("Nearly 900 supporters will ___ on Saturday.", "turn up for the match"),
        ("He decided to ___ from the rival club.", "turn down the offer"),
        ("The team hopes to ___ despite a difficult season.", "win the cup"),
    ],
    40: [
        ("preserve heritage", "Culture · Business · Leisure", "Culture"),
        ("submit a proposal", "Business · Sport · Culture", "Business"),
        ("set aside time", "Leisure · Business · Sport", "Leisure"),
        ("work on a serve", "Sport · Culture · Business", "Sport"),
        ("hand down a custom", "Culture · Leisure · Sport", "Culture"),
        ("A negotiated commercial agreement is a ___.", "deal · ritual · workout", "deal"),
        ("A route plan for a trip is an ___.", "itinerary · audit · injury", "itinerary"),
        ("A formal sports competition is a ___.", "tournament · merger · ceremony", "tournament"),
        ("A belief without reason is a ___.", "superstition · target · pastime", "superstition"),
        ("Money after costs is ___.", "profit · revenue · budget", "profit"),
        ("The company hopes to ___ before the deadline.", "close the deal"),
        ("The club should ___ before the hike.", "run through the itinerary"),
        ("Residents want to ___ in the town square.", "hold a ceremony"),
        ("The player must ___ with medical support.", "work through the injury"),
        ("The athlete trains regularly to ___.", "stay fit"),
    ],
}

READING_EX = {
    36: [
        ("Where did Elena use to live?", "In a mountain village."),
        ("Whom would she visit every Sunday?", "Her grandmother."),
        ("What used to be in the square?", "A market."),
        ("When did the village hold its harvest ceremony?", "In autumn."),
        ("What does Elena teach today?", "Folk music."),
        ("Complete the state: Elena ___ in a village.", "used to live"),
        ("Complete the action: They ___ by the fire.", "would gather"),
        ("Complete the existence pattern: There ___ a market.", "used to be"),
        ("What belief did Elena stop holding?", "A superstition about the first winter snow."),
        ("Which exact chunk means «transmiten»?", "hand down"),
        ("Choose: *would visit* is an action / state.", "an action"),
        ("Why does *used to believe* not use *would*?", "Because *believe* is a state in this contrast."),
        ("Put in order: Sunday visits — harvest ceremony — present teaching.", "Sunday visits → harvest ceremony → present teaching"),
        ("Name two things the children did at the ceremony.", "They wore folk costumes and sang."),
        ("What two aims does Elena's present work support?", "Preserving heritage and welcoming cultural diversity."),
    ],
    37: [
        ("What did the sales team complete?", "The project."),
        ("Who submitted the proposal?", "Sofia."),
        ("What does the finance director want?", "One more audit."),
        ("When will the companies proceed with the merger?", "Next month."),
        ("What happened to profit?", "It remained stable."),
        ("Complete the emphasis: The team ___ the project.", "did complete"),
        ("Complete: The director ___ with the terms.", "does agree"),
        ("Complete the existing auxiliary: The client ___ it.", "has approved"),
        ("What is the CEO attending tomorrow?", "A presentation."),
        ("Which exact chunk means «superó su objetivo»?", "exceeded its target"),
        ("Choose the short answer: Has the client approved it? Yes, it has / did.", "Yes, it has."),
        ("Why is *submit* in base form after *did*?", "Because *did* already marks the past."),
        ("Put in order: proposal — approval — merger.", "proposal → approval → merger"),
        ("Which rose: revenue or profit?", "Revenue."),
        ("What must happen before the deadline?", "The parties must agree on final terms and sign the contract."),
    ],
    38: [
        ("What hobby did Tom take up?", "Photography."),
        ("Where did he run into Mei?", "At a camera shop."),
        ("How often does the club practise?", "Every Sunday."),
        ("Why did they consult an experienced guide?", "To check the route."),
        ("What resource did they run out of?", "Battery power."),
        ("Complete: They ___ a photography club.", "set up"),
        ("Complete: They ___ the itinerary.", "ran through"),
        ("Complete the feedback pattern: Tom ran the route ___ a guide.", "by"),
        ("What challenge did Tom take on?", "Photographing a waterfall."),
        ("Which exact phrasal verb means «ganó popularidad»?", "took off"),
        ("Choose: *took up photography* means started / enjoyed immediately.", "started"),
        ("Choose: *took to it* describes beginning / positive reaction.", "positive reaction"),
        ("Put in order: meeting Mei — forming the club — first trip — online success.", "meeting Mei → forming the club → first trip → online success"),
        ("What saved the day?", "A spare phone."),
        ("Why do members explore new places?", "To use their leisure time and unwind."),
    ],
    39: [
        ("How many fans attended the final?", "More than five hundred."),
        ("What did the tournament turn out to be?", "A major success."),
        ("What skill had Ava worked on?", "Her serve."),
        ("Why had she turned down another club's offer?", "She wanted to stay with her teammates."),
        ("What did the team win?", "The cup."),
        ("Complete the arrival: Fans ___ for the match.", "turned up"),
        ("Complete the result: It ___ a success.", "turned out to be"),
        ("Complete the transformation: Persistence ___ a confident team.", "turned them into"),
        ("What did the coach work out?", "A safer training schedule."),
        ("Where did Ava work out?", "At the gym."),
        ("Choose: *worked out a problem* means exercised / solved.", "solved"),
        ("Choose: *worked on her serve* means improved a skill / overcame a period.", "improved a skill"),
        ("Put in order: offer — setbacks — new schedule — cup.", "offer → setbacks → new schedule → cup"),
        ("How often did Ava train at the gym?", "Three times a week."),
        ("What two difficulties did the team work through?", "Several setbacks and one serious injury."),
    ],
    40: [
        ("What did Lisa's town use to celebrate?", "A harvest festival."),
        ("What did Lisa propose years later?", "A new community event."),
        ("Who paid for the charity sports day?", "Her company."),
        ("How many people attended?", "More than eight hundred."),
        ("What will the organisers do next?", "Repeat the event."),
        ("Complete U36: Her family ___ a small ceremony.", "would hold"),
        ("Complete U37: Lisa ___ the event.", "did propose"),
        ("Complete U38: She ran the plan ___ a coach.", "by"),
        ("Complete U39: The day ___ a success.", "turned out to be"),
        ("What target did the team exceed?", "Its fundraising target."),
        ("Choose: *set up* means create / depart.", "create"),
        ("Choose: *worked through an injury* means addressed a difficulty / designed a schedule.", "addressed a difficulty"),
        ("Put in order: proposal — planning — attendance — decision to repeat.", "proposal → planning → attendance → decision to repeat"),
        ("Which new activity did residents begin?", "Yoga."),
        ("What has the event become?", "A new local tradition."),
    ],
}

LISTENING_EX = {
    36: [
        ("Who is speaking?", "Maria."),
        ("Where did she grow up?", "In rural Spain."),
        ("What did people wear at the ceremony?", "Folk costumes."),
        ("Who told Maria legends?", "Her grandfather."),
        ("What does Maria preserve now?", "Cultural heritage."),
        ("Complete: We ___ the harvest.", "used to celebrate"),
        ("Complete: People ___ folk costumes.", "would wear"),
        ("Complete the state: I ___ afraid.", "used to be"),
        ("What did Maria and her mother do on Saturdays?", "They visited the market and listened to folk music."),
        ("Which exact word names shared traditional stories and knowledge?", "folklore"),
        ("Choose: *used to love* is a state / repeated action.", "a state"),
        ("Why can *would tell* be used?", "It is a repeated action in a clear past context."),
        ("Put in order: harvest — stories — Saturday market — present school work.", "harvest → stories → Saturday market → present school work"),
        ("What annual event does Maria's project hold?", "A ceremony."),
        ("Who is invited to share customs?", "Families from different backgrounds."),
    ],
    37: [
        ("What deal did the company close?", "The Greenway deal."),
        ("When was it closed?", "Yesterday."),
        ("What change does the client want?", "A lower budget for the second stage."),
        ("Who will attend Friday's presentation?", "The CEO."),
        ("What has not increased?", "Profit."),
        ("Complete the opening emphasis: I ___ to begin.", "do want"),
        ("Complete past emphasis: We ___ the deal.", "did close"),
        ("Complete the client emphasis: It ___ a lower budget.", "does want"),
        ("Short answer: Have they completed the audit?", "Yes, they have."),
        ("Short answer: Can the design team meet the deadline?", "Yes, it can."),
        ("Choose: *have signed* uses do-support / an existing auxiliary.", "an existing auxiliary"),
        ("Which exact chunk describes continuing with a plan?", "proceed with the current strategy"),
        ("Put in order: deal — contract — audit — strategy.", "deal → contract → audit → strategy"),
        ("Which exceeded the target?", "Revenue."),
        ("What must they agree on?", "The remaining terms."),
    ],
    38: [
        ("Who is speaking?", "Nina."),
        ("When did she take up hiking?", "Last spring."),
        ("What time will the club leave?", "At six."),
        ("Who reviewed their itinerary?", "Their guide, Sam."),
        ("How many people are joining?", "Twelve."),
        ("Complete: Nina immediately ___ hiking.", "took to"),
        ("Complete: The club will ___ for Pine Valley.", "set off"),
        ("Complete: They ran the itinerary ___ Sam.", "by"),
        ("What must they avoid running out of?", "Water."),
        ("Who will set up the tents?", "Leo."),
        ("Choose: *set aside* means reserve / create.", "reserve"),
        ("Choose: *taken on* expresses a challenge / positive reaction.", "a challenge"),
        ("Put in order: route review — warning — picnic planning — tent setup.", "route review → warning → picnic planning → tent setup"),
        ("Where might they run into other hikers?", "Near the lake."),
        ("Why are they travelling?", "To explore and unwind."),
    ],
    39: [
        ("Who is speaking?", "Coach Malik."),
        ("When did the tournament finish?", "Yesterday."),
        ("How many fans attended the final?", "Nearly a thousand."),
        ("What body part had the captain injured?", "Her shoulder."),
        ("What did the team win?", "The cup."),
        ("Complete: Fans ___ for the final.", "turned up"),
        ("Complete: The final ___ their best match.", "turned out to be"),
        ("Complete: The captain ___ an offer.", "had turned down"),
        ("What two things did the team work out?", "A training schedule and a defensive problem."),
        ("How often do the players work out?", "Four mornings a week."),
        ("Choose: *worked on her serve* means developed / rejected.", "developed"),
        ("Choose: *turned them into* expresses result / transformation.", "transformation"),
        ("Put in order: offer — serve practice — injury process — cup.", "offer → serve practice → injury process → cup"),
        ("Why do the players go to the gym?", "To stay fit."),
        ("What kind of workout will they have tomorrow?", "A light workout."),
    ],
    40: [
        ("Who gives the update?", "Lisa."),
        ("When did the charity festival happen?", "Saturday."),
        ("Who paid for the equipment?", "The business association."),
        ("How many activity areas were created?", "Six."),
        ("What weather problem occurred?", "Heavy rain."),
        ("Complete U36: Residents ___ traditional games.", "would organise"),
        ("Complete U37: The association ___ the proposal.", "did approve"),
        ("Complete U38: They ran the safety plan ___ the council.", "by"),
        ("Complete U39: Visitors ___ and the event ___ well.", "turned up; turned out"),
        ("What did volunteers take on?", "Different roles."),
        ("Short answer: Have they decided to repeat the event?", "Yes, they have."),
        ("Choose: *worked through* means handled progressively / exercised.", "handled progressively"),
        ("Put in order: approval — setup — rain — target.", "approval → setup → rain → target"),
        ("What target did the organisers exceed?", "Their fundraising target."),
        ("Which weekend will they reserve?", "The first weekend in September."),
    ],
}

WRITING = {
    36: [
        ("Completa el estado: *Elena ___ (live) in a village.*", "Elena **used to live** in a village."),
        ("Completa la acción con dos opciones: *Every Sunday, she ___ (visit) her grandmother.*", "Every Sunday, she **used to visit / would visit** her grandmother."),
        ("Corrige: *Did you used to believe that legend?*", "**Did you use to believe** that legend?"),
        ("Pasa a negativa: *They used to hold a ceremony.*", "They **didn't use to hold** a ceremony."),
        ("Traduce: *Antes había un mercado en la plaza.*", "**There used to be a market in the square.**"),
        ("Contrasta *live* y *visit* en dos frases con marco pasado.", "Modelo: When Maya was young, she **used to live** by the coast. Every weekend, she **would visit** the local market."),
        ("Escribe 35–45 palabras con *used to believe, would tell, legend*.", "Modelo: As a child, I **used to believe** a local superstition. On winter evenings, my grandfather **would tell** the same **legend** by the fire, and everyone listened quietly."),
        ("Redacta 25–35 palabras con *there used to be, ceremony, preserve*.", "Modelo: **There used to be** a spring **ceremony** in our square. A local association has restored it to **preserve** the town's cultural heritage."),
        ("Escribe 45–55 palabras con *hand down, custom, cultural diversity* y dos acciones con *would*.", "Modelo: My grandparents would cook a special meal and **would invite** every neighbour. They wanted to **hand down** this **custom**. Today, new families add their own dishes, so the celebration reflects our **cultural diversity**."),
        ("Escribe 90–110 palabras sobre tradiciones pasadas. Incluye dos estados con *used to*, tres acciones con *would*, *there used to be* y seis términos U36.", "Modelo: My family **used to live** in a fishing village, and I **used to love** its autumn festival. **There used to be** a market beside the harbour. Every year, residents **would hold** a ceremony, children **would wear** folk costumes and musicians **would play** folk music. My grandmother handed down a legend about the sea, although I never believed the superstition in it. Today, the town works to preserve this heritage. New residents also share their customs, and that cultural diversity has turned the old tradition into a more inclusive celebration."),
    ],
    37: [
        ("Añade énfasis: *I want to attend the presentation.*", "I **do want** to attend the presentation."),
        ("Corrige: *She does agrees with the strategy.*", "She **does agree** with the strategy."),
        ("Añade énfasis pasado: *The team exceeded its target.*", "The team **did exceed** its target."),
        ("Responde: *Have they signed the contract?* (sí)", "**Yes, they have.**"),
        ("Responde: *Is the CEO coming?* (no)", "**No, she isn't.**"),
        ("Contrasta *revenue* y *profit* en dos frases.", "Modelo: Our **revenue** rose to €2 million. After salaries and other costs, our **profit** was €180,000."),
        ("Redacta 35–45 palabras con *did submit, proposal, deadline*.", "Modelo: Marta **did submit** the **proposal** before the **deadline**, despite a problem with the online form. The client has confirmed receipt and will review it tomorrow."),
        ("Escribe un diálogo de 30–40 palabras con preguntas *Did...? Have...? Will...?* y tres short answers.", "Modelo: A: **Did** they close the deal? B: Yes, they **did**. A: **Have** they signed? B: No, they **haven't**. A: **Will** they proceed? B: Yes, they **will**."),
        ("Escribe 45–55 palabras con *close a deal, agree on terms, sign a contract*.", "Modelo: The two companies **did close a deal** after a long negotiation. They have **agreed on terms**, and their legal teams will **sign the contract** on Friday before announcing the merger."),
        ("Escribe 90–110 palabras como actualización empresarial. Incluye *do/does/did* enfáticos, tres auxiliares existentes, tres short answers y seis términos U37.", "Modelo: We **did submit** our proposal on time, and the client **does agree** with our strategy. I **do believe** the deal is realistic. The finance team **has completed** the audit, the CEO **is attending** tomorrow, and both companies **will proceed** if the board approves the budget. Did we meet the deadline? Yes, we **did**. Has revenue exceeded the target? Yes, it **has**. Will profit rise immediately? No, it **won't**. We still need to agree on final terms, close the deal and sign the contract."),
    ],
    38: [
        ("Completa: *We ___ an old friend at the cinema.*", "We **ran into** an old friend at the cinema."),
        ("Corrige: *We ran out water.*", "We **ran out of water**."),
        ("Construye la consulta con *plan / Marta*.", "I **ran the plan by Marta**."),
        ("Sustituye por pronombre: *They set up the club.*", "They **set it up**."),
        ("Contrasta *take up / take to*.", "Modelo: I **took up** painting in May and **took to** it immediately."),
        ("Escribe dos frases que contrasten *set up / set off*.", "Modelo: We **set up** the tent before dark. The next morning, we **set off** for the lake."),
        ("Redacta 35–45 palabras con *run through, itinerary, set aside*.", "Modelo: Before booking the trip, we **ran through the itinerary** carefully. I **set aside** two hours to check each route, campsite and picnic area with our guide."),
        ("Escribe 35–45 palabras con *take on, challenge, take off*.", "Modelo: Nina **took on the challenge** of creating an online hiking club. It **took off** after she shared photographs from the group's first trip."),
        ("Escribe 45–55 palabras con seis phrasal verbs U38 y tres términos de ocio.", "Modelo: I **took up** hiking and **set up** a club. We **set aside** Sunday mornings, **run through** each **itinerary** and **set off** early. We once **ran out of** water during **a hike**, but we still managed to unwind."),
        ("Escribe 100–120 palabras sobre una excursión. Incluye los doce objetivos U38, tres pronombres bien colocados y seis términos Leisure.", "Modelo: I **took up** photography last year and quickly **took to** it. After I **ran into** Leo, we **set up** a club and **set it up** online too. We **set aside** one weekend for camping, **ran through** the itinerary and **ran it by** a guide. We **set out** at dawn and **set off** for the hills, but soon **ran out of** water. I **took on** the challenge of finding a safe spring. Later, a photograph of our picnic **took off** online. Our hobby now helps us explore new places, enjoy our leisure time and unwind."),
    ],
    39: [
        ("Completa: *Fans ___ for the match.*", "Fans **turned up** for the match."),
        ("Sustituye por pronombre: *She turned down the offer.*", "She **turned it down**."),
        ("Corrige: *The match turned up to be exciting.*", "The match **turned out to be** exciting."),
        ("Traduce: *El entrenamiento la convirtió en atleta profesional.*", "Training **turned her into a professional athlete**."),
        ("Corrige categorías: *It was a hard work out; I workout daily.*", "It was a hard **workout**; I **work out** daily."),
        ("Contrasta tres sentidos de *work out*.", "Modelo: I **work out** at the gym. We **worked out** the problem. The coach **worked out** a new schedule."),
        ("Redacta 35–45 palabras con *work on, serve, tournament*.", "Modelo: Ava **worked on her serve** for three months before the **tournament**. Her coach recorded every practice match and gave her one precise target each week."),
        ("Escribe 35–45 palabras con *work through, injury, medical support*.", "Modelo: The runner **worked through the recovery process** after an **injury**, always following professional **medical support**. She returned gradually instead of ignoring pain."),
        ("Escribe 45–55 palabras con los cuatro TURN y tres términos deportivos.", "Modelo: Hundreds of **fans turned up** at the **stadium**. One player had **turned down** another club's offer. The final **turned out** well, and years of practice had **turned her into** a confident athlete."),
        ("Escribe 100–120 palabras sobre una temporada. Incluye los siete phrasal verbs, dos sentidos de *work out* y ocho términos Sport.", "Modelo: Nearly a thousand **fans turned up** for the final at the **stadium**. Our captain had **turned down** an offer because she wanted to complete the **tournament** with us. She **worked on** her **serve** and **worked through** a shoulder **injury** with medical support. The coach **worked out** a safer **training schedule**, while the rest of us **worked out** at the **gym** to stay fit. We also **worked out** a defensive problem. The match **turned out to be** a success, and months of disciplined practice **turned us into** a confident team. We won the **cup** after a demanding season."),
    ],
    40: [
        ("Completa U36: *She ___ (live) there; every Sunday she ___ (visit) us.*", "She **used to live** there; every Sunday she **would visit** us."),
        ("Corrige U37: *They did signed the contract.*", "They **did sign** the contract."),
        ("Responde: *Have they approved it?* (sí)", "**Yes, they have.**"),
        ("Completa U38: *We ___ a club and ___ yoga.*", "We **set up** a club and **took up** yoga."),
        ("Completa U39: *Fans ___; the event ___ well.*", "Fans **turned up**; the event **turned out** well."),
        ("Integra U36–37 con *would hold, did approve, proposal*.", "Modelo: The town **would hold** a ceremony every spring. This year, the council **did approve** our new **proposal**."),
        ("Redacta 40–50 palabras con *run by, set aside, take on*.", "Modelo: We **ran the safety plan by** the council, **set aside** a full weekend and **took on** the challenge of organising six activities for local families."),
        ("Redacta 40–50 palabras con *turn down, work on, work through*.", "Modelo: Ava **turned down** another offer so she could **work on** her serve with the team. Together, they **worked through** a difficult season and reached the final."),
        ("Escribe 55–65 palabras conectando Culture, Business, Leisure y Sport con cuatro chunks.", "Modelo: A local company agreed to **preserve heritage** by sponsoring a festival. It **closed a deal** with the council, while volunteers **set aside time** to organise a charity match. Athletes helped visitors **stay fit** through free activities."),
        ("Escribe 120–140 palabras sobre un evento comunitario. Incluye tres objetivos correctos de cada U36–39 y ocho palabras temáticas.", "Modelo: Our town **used to hold** a harvest festival, and families **would share** traditional food. **There used to be** folk music in the square too. This year, a local company **did submit** a proposal to restore the event. The board **has approved** the budget. Has the team signed the contract? Yes, it **has**. Volunteers **set up** activity areas, **ran the plan by** the council and **set aside** a weekend. Several residents **took up** yoga. On Saturday, hundreds of fans **turned up** for a charity match, which **turned out to be** a success. One athlete had **worked through** an injury and **worked on** her serve before playing. The event preserved local heritage, exceeded its fundraising target and became a new tradition."),
    ],
}

SPEAKING = {
    36: [
        ("Pronuncia y contrasta *used to live / would visit*.", "Guion modelo: I **used to live** near my grandmother, and I **would visit** her every Sunday. Estado frente a acción repetida."),
        ("Explica la forma después de *did* en 30 segundos.", "Pistas: *Did/didn't* ya marca pasado; usa **use to + base**. Modelo: Did you use to attend? I didn't use to attend."),
        ("Role-play sobre un mercado desaparecido.", "A: **Did there use to be** a market here? B: Yes, there did. People **would gather** here on Saturdays."),
        ("Describe cómo se transmite una tradición.", "Guion modelo: Older residents **hand down** a local legend. Schools hold a ceremony to **preserve this heritage**."),
        ("Habla 45–60 segundos sobre tu infancia con dos estados, tres acciones y seis términos U36.", "Pistas: used to live/believe · would visit/celebrate/listen · tradition · heritage · custom · ceremony · folklore · folk music."),
    ],
    37: [
        ("Pronuncia el contraste enfático en *do want, does agree, did submit*.", "Guion modelo: I **do want** to attend. Marta **does agree**. She **did submit** the proposal."),
        ("Explica por qué no se dice *did submitted*.", "Pistas: *did* lleva pasado; verbo base. Modelo: She **did submit**, not *did submitted*."),
        ("Role-play con tres short answers.", "A: Did they close the deal? B: Yes, they **did**. A: Have they signed? B: No, they **haven't**. A: Will they proceed? B: Yes, they **will**."),
        ("Contrasta revenue y profit oralmente.", "Guion modelo: **Revenue** is all money received; **profit** remains after costs. Our revenue rose, but profit stayed stable."),
        ("Da una actualización de 45–60 segundos con tres énfasis, cuatro auxiliares y seis términos U37.", "Pistas: do want · does agree · did exceed · has finished · is coming · will proceed · deal · budget · audit · proposal · target · contract."),
    ],
    38: [
        ("Pronuncia y contrasta la familia RUN.", "Guion modelo: I **ran into** Leo, **ran out of** water, **ran through** the route and **ran it by** a guide."),
        ("Explica *set up / set off / set aside*.", "Pistas: create → set up a club; depart → set off for the hills; reserve → set aside time."),
        ("Role-play sobre empezar y disfrutar un hobby.", "A: What did you **take up**? B: Hiking. A: Did you **take to it**? B: Yes, immediately."),
        ("Practica pronombres en cuatro estructuras.", "Guion modelo: **Set it up; set it aside; take it on; run it by her.**"),
        ("Narra una excursión durante 60 segundos con los doce objetivos y seis términos Leisure.", "Pistas: run into/out of/through/by · set up/off/out/aside · take up/to/off/on · itinerary · camping · hike · picnic · explore · unwind."),
    ],
    39: [
        ("Pronuncia y contrasta los cuatro TURN.", "Guion modelo: Fans **turned up**; Ava **turned it down**; the match **turned out** well; training **turned her into** an athlete."),
        ("Explica tres sentidos de *work out*.", "Pistas: gym → exercise; problem → solve; schedule → devise. Da una frase completa para cada sentido."),
        ("Role-play entre atleta y entrenador.", "A: What are you **working on**? B: My serve. A: How are you handling the injury? B: I'm **working through** recovery with the medical team."),
        ("Contrasta *workout / work out*.", "Guion modelo: Yesterday's **workout** was demanding, but I still **work out** four times a week."),
        ("Resume una temporada en 60 segundos con los siete phrasal verbs y ocho términos Sport.", "Pistas: fans/stadium → turn up; offer → turn down; final → turn out; athlete → turn into; gym/problem → work out; serve → work on; injury → work through."),
    ],
    40: [
        ("Clasifica oralmente cuatro ejemplos.", "Guion modelo: **Used to live** is U36; **did close** is U37; **set aside** is U38; **turn out** is U39."),
        ("Corrige cuatro mezclas frecuentes.", "Guion modelo: **Did she use to...?; did submit; run the plan by me; the match turned out well.**"),
        ("Role-play de planificación y reporte.", "A: Have they approved the event? B: Yes, they **have**. A: Did people **turn up**? B: Yes, and it **turned out** well."),
        ("Conecta cuatro campos con un chunk cada uno.", "Guion modelo: We **preserved heritage**, **closed a deal**, **set aside leisure time** and helped athletes **stay fit**."),
        ("Presenta durante 75–90 segundos un evento integrado con tres objetivos de cada U36–39.", "Pistas: past tradition · emphatic business update + short answers · trip/club planning · attendance/result/training; revisa base, partícula y objeto."),
    ],
}


def details(content: str, summary: str = "Ver solución") -> str:
    return f"<details>\n<summary>{summary}</summary>\n\n{content.strip()}\n\n</details>"


def render_grammar(unit: int) -> str:
    sections = []
    start = 1
    for title, instruction, items in GRAMMAR[unit]:
        questions = []
        answers = []
        for number, (prompt, options, answer, explanation) in enumerate(items, start):
            option_line = "" if options == "—" else f"\n   Opciones: *{options}*"
            questions.append(f"{number}. {prompt}{option_line}")
            answers.append(f"{number}. **{answer}** — {explanation}")
        end = start + len(items) - 1
        sections.append(
            f"### Ejercicios {start}–{end} — {title}\n\n"
            f"{instruction}\n\n"
            f"{chr(10).join(questions)}\n\n"
            f"{details(chr(10).join(answers))}"
        )
        start = end + 1
    return f"""## Lección 1 — Gramática y chunks

**Objetivo:** seleccionar y construir correctamente {META[unit]["focus"]}.

No respondas por parecido visual. Identifica la intención, localiza la pista de significado y comprueba auxiliar, forma base, partícula, objeto y concordancia.

{(chr(10) * 2).join(sections)}
"""


def render_vocab(unit: int) -> str:
    entries = VOCAB[unit]
    blocks = [
        ("Traducción precisa", "Cada entrada tiene tres significados o campos. Elige solo uno.", entries[:5]),
        ("Elige por definición", "Completa la definición con una de las tres opciones.", entries[5:10]),
        ("Completa el chunk", "Escribe la expresión exacta que completa la situación.", entries[10:]),
    ]
    sections = []
    start = 1
    for title, instruction, entries_block in blocks:
        questions = []
        answers = []
        for number, entry in enumerate(entries_block, start):
            if len(entry) == 3:
                prompt, options, answer = entry
                option_line = f"\n   Opciones: *{options}*"
            else:
                prompt, answer = entry
                option_line = ""
            questions.append(f"{number}. {prompt}{option_line}")
            answers.append(f"{number}. **{answer}**")
        end = start + len(entries_block) - 1
        sections.append(
            f"### Ejercicios {start}–{end} — {title}\n\n"
            f"{instruction}\n\n"
            f"{chr(10).join(questions)}\n\n"
            f"{details(chr(10).join(answers))}"
        )
        start = end + 1
    return f"""## Lección 2 — Vocabulario

**Objetivo:** comprender y usar vocabulario de *{META[unit]["vocab"]}* en situaciones concretas.

Aprende cada palabra con su complemento. Las opciones cercanas obligan a decidir por significado y no por una traducción aislada.

{(chr(10) * 2).join(sections)}
"""


def render_comprehension(
    unit: int,
    exercises: dict[int, list[tuple[str, str]]],
    kind: str,
) -> str:
    items = exercises[unit]
    headings = (
        ("Comprensión global", "Responde con la información explícita del texto o audio."),
        ("Detalles y chunks exactos", "Completa con las palabras exactas del texto o audio."),
        ("Forma, significado y secuencia", "Elige, explica u ordena según la información presentada."),
    )
    sections = []
    for block_index, (heading, instruction) in enumerate(headings):
        start = block_index * 5 + 1
        block = items[block_index * 5 : block_index * 5 + 5]
        questions = [f"{n}. {q}" for n, (q, _) in enumerate(block, start)]
        answers = [f"{n}. **{a}**" for n, (_, a) in enumerate(block, start)]
        sections.append(
            f"### Ejercicios {start}–{start + 4} — {heading}\n\n"
            f"{instruction}\n\n"
            f"{chr(10).join(questions)}\n\n"
            f"{details(chr(10).join(answers))}"
        )
    meta = META[unit]
    if kind == "reading":
        source = f"""> {READING[unit]}

<audio controls preload="none" src="/audio/blog/curso-b2/unit-{unit}/reading-workbook.mp3" title="🔊 Reading: {meta['reading_title']}"></audio>

Lee una vez para captar la situación y otra para localizar detalles. También puedes escuchar el audio. Todas las respuestas se comprueban directamente en el texto."""
        title = f"Reading: {meta['reading_title']}"
        objective = "comprender la idea global, localizar datos y reconocer los objetivos en contexto"
        lesson = 3
    else:
        source = f"""<audio controls preload="none" src="/audio/blog/curso-b2/unit-{unit}/listening-workbook.mp3" title="🔊 Listening: {meta['listening_title']}"></audio>

Escucha dos veces antes de abrir el guion: la primera para entender la situación y la segunda para anotar detalles.

{details(f'> {LISTENING[unit]}', 'Leer guion después de escuchar')}"""
        title = f"Listening: {meta['listening_title']}"
        objective = "identificar información y expresiones completas a velocidad natural"
        lesson = 4
    return f"""## Lección {lesson} — {title}

**Objetivo:** {objective}.

{source}

{(chr(10) * 2).join(sections)}
"""


def render_production(unit: int) -> str:
    writing_questions = [f"{n}. {q}" for n, (q, _) in enumerate(WRITING[unit], 1)]
    writing_answers = [f"{n}. {a}" for n, (_, a) in enumerate(WRITING[unit], 1)]
    speaking_questions = [f"{n}. {q}" for n, (q, _) in enumerate(SPEAKING[unit], 11)]
    speaking_answers = [f"{n}. {a}" for n, (_, a) in enumerate(SPEAKING[unit], 11)]
    return f"""## Lección 5 — Writing y Speaking

**Objetivo:** producir mensajes breves y controlados con {META[unit]["focus"]}.

### Ejercicios 1–10 — Writing con modelo

Respeta la extensión y usa todas las expresiones indicadas. Cada tarea incluye un modelo completo: puedes cambiar los detalles, pero conserva las estructuras evaluadas.

{chr(10).join(writing_questions)}

{details(chr(10).join(writing_answers), "Ver modelos de writing")}

### Ejercicios 11–15 — Speaking con guion y pistas

Prepara durante 30 segundos y habla sin leer. Después compara tus estructuras con el guion o las pistas concretas.

{chr(10).join(speaking_questions)}

{details(chr(10).join(speaking_answers), "Ver guiones y pistas de speaking")}
"""


def render_unit(unit: int) -> str:
    meta = META[unit]
    keyword_lines = "\n".join(
        f"  - {keyword}"
        for keyword in [
            f"ejercicios inglés B2 unidad {unit}",
            "ejercicios inglés B2 gratis",
            "curso inglés B2 gratis",
            *meta["keywords"],
        ]
    )
    related_lines = "\n".join(f"  - {route}" for route in meta["related"])
    remember_lines = "\n".join(f"- {line}" for line in meta["remember"])
    if unit == 40:
        next_step = "3. Continúa en la [Unidad 41 del curso B2](/curso-b2/unit-41) cuando quieras avanzar."
        next_link = "- [Continuar con Unidad 41](/curso-b2/unit-41)"
    else:
        next_step = f"3. Continúa con [{meta['next_title']}](/blog/curso-b2/{meta['next']})."
        next_link = f"- [Cuaderno siguiente](/blog/curso-b2/{meta['next']})"
    return f"""---
category: curso-b2
date: '{DATE}'
updatedDate: '{DATE}'
author: linguafly-team
title: "Ejercicios Unidad {unit} B2: {meta['title']} (con soluciones)"
description: >-
  Cuaderno de la Unidad {unit} B2 sobre {meta["focus"]}, vocabulario de
  {meta["vocab"]}, reading, listening, writing y speaking. Incluye soluciones y modelos.
readTime: 30 min
keywords:
{keyword_lines}
canonical: 'https://linguafly.app/blog/curso-b2/{meta["slug"]}-ejercicios-soluciones'
image: {meta["image"]}
alt: "{meta['title']} — ejercicios de inglés B2 con soluciones"
related_routes:
{related_lines}
faqs:
  - question: ¿Qué practica el cuaderno de la Unidad {unit} B2?
    answer: >-
      Practica {meta["focus"]} junto con vocabulario de {meta["vocab"]}.
  - question: ¿Los ejercicios de la Unidad {unit} tienen soluciones?
    answer: >-
      Sí. Cada bloque incluye una clave completa en «Ver solución» y las tareas
      de producción incluyen modelos o guiones.
  - question: ¿Cómo debo trabajar el reading y el listening?
    answer: >-
      Haz una primera lectura o escucha global, repite para localizar detalles
      y abre las soluciones o el guion solo después de responder.
  - question: ¿Este cuaderno incluye writing y speaking?
    answer: >-
      Sí. La quinta lección incluye diez tareas de writing con modelo y cinco
      tareas de speaking con guiones o pistas concretas.
  - question: ¿Dónde encuentro la explicación de la Unidad {unit}?
    answer: >-
      En la guía teórica enlazada al inicio y en la Unidad {unit} del curso B2
      gratuito de Linguafly.
excerpt: >-
  Ejercicios de la Unidad {unit} B2 ({meta["title"]}) con reading, listening,
  writing, speaking y soluciones completas.
---

Este cuaderno reúne los **ejercicios de la Unidad {unit} del curso B2** (*{meta["full"]}*). Practicarás reconocimiento, transformación y producción sin consignas ambiguas. Cada actividad indica qué debes escribir, qué opciones puedes usar o qué información debes localizar.

> **Guía teórica:** [{meta["title"]} B2](/blog/curso-b2/{meta["slug"]})<br>
> **Practica en el curso:** [Unidad {unit} — {meta["title"]}](/curso-b2/unit-{unit})

Trabaja en este orden: responde sin mirar, abre la solución, identifica la causa de cada error y repite la frase correcta en voz alta. En writing y speaking, compara primero la estructura obligatoria y después el contenido.

**Recuerda antes de empezar:**
{remember_lines}

![{meta["title"]}]({meta["image"]})

**Contenido de la unidad:**
1. [Lección 1 — Gramática y chunks](#leccion-1--gramatica-y-chunks)
2. [Lección 2 — Vocabulario](#leccion-2--vocabulario)
3. [Lección 3 — Reading](#leccion-3--reading)
4. [Lección 4 — Listening](#leccion-4--listening)
5. [Lección 5 — Writing y Speaking](#leccion-5--writing-y-speaking)

---

{render_grammar(unit)}
---

{render_vocab(unit)}
---

{render_comprehension(unit, READING_EX, "reading")}
---

{render_comprehension(unit, LISTENING_EX, "listening")}
---

{render_production(unit)}
---

## Cómo revisar tus resultados

Clasifica cada fallo como **significado**, **forma**, **auxiliar**, **partícula**, **orden** o **vocabulario**. Copia la corrección mínima y crea una frase nueva con el mismo patrón. Después vuelve a intentarlo sin opciones.

Para consolidar, repite las expresiones mañana, dentro de tres días y una semana después. Reduce el apoyo en cada revisión: primero opciones, después una pista en español y finalmente una situación de 45 segundos.

## Cómo seguir

1. Repasa tus fallos en la [guía teórica](/blog/curso-b2/{meta["slug"]}).
2. Practica las destrezas interactivas en la [Unidad {unit} del curso B2](/curso-b2/unit-{unit}).
{next_step}

Guías relacionadas:

- [Teoría Unidad {unit}](/blog/curso-b2/{meta["slug"]})
- [Cuaderno anterior](/blog/curso-b2/{meta["prev"]})
{next_link}
- [Inglés B2](/blog/metodos/{HUB})

---

*Cuaderno alineado con la Unidad {unit} del [curso B2 de Linguafly](/curso-b2).*
"""


def validate_source_data() -> None:
    for unit in range(36, 41):
        assert sum(len(group[2]) for group in GRAMMAR[unit]) == 15
        assert len(VOCAB[unit]) == 15
        assert len(READING_EX[unit]) == 15
        assert len(LISTENING_EX[unit]) == 15
        assert len(WRITING[unit]) == 10
        assert len(SPEAKING[unit]) == 5


def make_audios() -> None:
    for unit in range(36, 41):
        directory = ROOT / f"public/audio/blog/curso-b2/unit-{unit}"
        directory.mkdir(parents=True, exist_ok=True)
        for name, text in (
            ("reading-workbook", READING[unit]),
            ("listening-workbook", LISTENING[unit]),
        ):
            path = directory / f"{name}.mp3"
            if path.exists():
                print("kept", path.relative_to(ROOT))
                continue
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def main() -> None:
    validate_source_data()
    OUT.mkdir(parents=True, exist_ok=True)
    for unit in range(36, 41):
        path = OUT / f"{META[unit]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(unit), encoding="utf-8")
        words = len(path.read_text(encoding="utf-8").split())
        print("wrote", path.relative_to(ROOT), "words", words)
    make_audios()
    print("done B2 U36–40 workbooks")


if __name__ == "__main__":
    main()
