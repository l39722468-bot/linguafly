#!/usr/bin/env python3
"""Generate B1 Units 46–50 exercise workbooks + TTS."""
from pathlib import Path
from gtts import gTTS

OUT = Path("src/content/blog/curso-b1")
ROOT = Path(__file__).resolve().parents[1]
DATE = "2026-08-31"

LISTEN = {
    46: "Hi, I am Frank. You had better see a doctor. It's time to go home. It's time you started studying. You had better not tell him yet. It's high time we made a decision.",
    47: "Hi, I am Gina. I'd rather stay at home tonight. I'd rather walk than take the bus. I'd sooner die than apologise. I'd rather you didn't tell him. I'd rather not mention it.",
    48: "Hi, I am Hugo. I work out at the gym every morning. I'm looking forward to my holiday. We ran out of milk. She takes care of her children. They carried out the research. I don't know how to deal with this problem.",
    49: "Hi, I am Iris. You needn't hurry — we have time. I need to buy a ticket. She needn't have bought a new one. This needs repairing urgently. We needn't have booked the table.",
    50: "Hi, I am Jack. You had better see a doctor. I'd rather stay at home. We ran out of milk. You needn't hurry. It's time to go home.",
}

READ = {
    46: "You had better see a doctor. It's time to go home. It's time you started studying. You had better not tell him yet. It's high time we made a decision.",
    47: "I'd rather stay at home tonight. I'd rather walk than take the bus. I'd sooner die than apologise. I'd rather you didn't tell him. I'd rather not mention it.",
    48: "I work out at the gym every morning. I'm looking forward to my holiday. We ran out of milk. She takes care of her children. They carried out the research. I don't know how to deal with this problem.",
    49: "You needn't hurry — we have time. I need to buy a ticket. She needn't have bought a new one. This needs repairing urgently. We needn't have booked the table.",
    50: "You had better see a doctor. I'd rather stay at home. We ran out of milk. You needn't hurry. It's time to go home.",
}

META = {
    46: dict(slug="unidad-46-had-better-its-time-advice", title="Had Better & It's Time", full="Had Better, It's Time & Advice", focus="had better / it's time + advice vocabulary", vocab="advice", image="/blog/curso-b1/unit-46/had-better-its-time.png", prev="unidad-45-repaso-41-44-ejercicios-soluciones", next_t="unidad-47-would-rather-preferences", r_title="Strong advice", l_title="Frank on advice", kw=["had better ejercicios", "it's time English", "advice vocabulary B1"]),
    47: dict(slug="unidad-47-would-rather-preferences", title="Would Rather & Preferences", full="Would Rather, Would Sooner & Preferences", focus="would rather / would sooner + preferences", vocab="preferences", image="/blog/curso-b1/unit-47/would-rather-sooner.png", prev="unidad-46-had-better-its-time-advice-ejercicios-soluciones", next_t="unidad-48-phrasal-verbs-work-study", r_title="Stay or go", l_title="Gina on preferences", kw=["would rather ejercicios", "would sooner English", "preferences vocabulary"]),
    48: dict(slug="unidad-48-phrasal-verbs-work-study", title="Phrasal Verbs 3 & Work", full="Phrasal Verbs 3 & Work & Study", focus="work out, look forward to, run out of, take care of, carry out, deal with", vocab="work & study", image="/blog/curso-b1/unit-48/phrasal-verbs-3.png", prev="unidad-47-would-rather-preferences-ejercicios-soluciones", next_t="unidad-49-need-neednt-necessity", r_title="At work", l_title="Hugo on phrasal verbs", kw=["phrasal verbs ejercicios B1", "work out look forward to", "run out of deal with"]),
    49: dict(slug="unidad-49-need-neednt-necessity", title="Need & Necessity", full="Need, Needn't & Necessity", focus="need / needn't / needn't have + necessity", vocab="necessity", image="/blog/curso-b1/unit-49/need-neednt.png", prev="unidad-48-phrasal-verbs-work-study-ejercicios-soluciones", next_t="unidad-50-repaso-46-49", r_title="No hurry", l_title="Iris on necessity", kw=["need needn't ejercicios", "needn't have done", "necessity vocabulary English"]),
    50: dict(slug="unidad-50-repaso-46-49", title="Repaso 46–49", full="Repaso 46–49: Advice, Preferences & Necessity", focus="had better, would rather, phrasal verbs, need/needn't (mix U46–49)", vocab="advice, preferences, work & study, necessity (mix)", image="/blog/curso-b1/unit-50/review-map.png", prev="unidad-49-need-neednt-necessity-ejercicios-soluciones", next_t="unidad-46-had-better-its-time-advice", r_title="Mixed review", l_title="Jack's mixed review", kw=["repaso B1 46-49", "had better review", "would rather phrasal need review"]),
}

GRAM = {
    46: {"a": [("You ___ better see a doctor.", "had / have / would", "had"), ("It's time ___ go home.", "to / for / that", "to"), ("It's time you ___ (start) studying.", "started / start / to start", "started"), ("You had better ___ tell him yet.", "not / no / don't", "not"), ("It's high time we ___ (make) a decision.", "made / make / to make", "made")],
         "b": [("had better + ___", "bare infinitive / to infinitive / -ing", "bare infinitive"), ("it's time to + ___", "infinitive / past / -ing", "infinitive"), ("it's time (that) + ___", "past / infinitive / to", "past"), ("it's time for + ___", "noun / clause / duration", "noun"), ("had better ≈ ___", "strong advice / preference / past habit", "strong advice")],
         "c": [("*You had better to leave.*", "You had better **leave**."), ("*It's time you start.* (that-clause)", "It's time you **started**."), ("*It's time for go.*", "It's time **to go** / **for going**."), ("*You better see a doctor.* (incomplete)", "You **had** better see a doctor."), ("*It's high time we make.*", "It's high time we **made** a decision.")]},
    47: {"a": [("I'd rather ___ at home tonight.", "stay / to stay / staying", "stay"), ("I'd rather walk ___ take the bus.", "than / then / that", "than"), ("I'd rather you ___ (not tell) him.", "didn't tell / don't tell / not tell", "didn't tell"), ("I'd ___ not mention it.", "rather / sooner / prefer", "rather"), ("He'd ___ die than apologise.", "sooner / rather / prefer", "sooner")],
         "b": [("would rather + ___", "bare infinitive / to infinitive / -ing", "bare infinitive"), ("would rather A ___ B", "than / then / that", "than"), ("would rather (that) + ___", "past / present / infinitive", "past"), ("would sooner = ___", "stronger preference / obligation / advice", "stronger preference"), ("I'd rather you came ≈ ___", "preference about another person / past fact / future plan", "preference about another person")],
         "c": [("*I would rather to stay.*", "I would rather **stay**."), ("*I'd rather walk then take the bus.*", "I'd rather walk **than** take the bus."), ("*I'd rather you don't tell him.*", "I'd rather you **didn't** tell him."), ("*I'd sooner to die.*", "I'd sooner **die** than apologise."), ("*I'd rather not to mention it.*", "I'd rather **not mention** it.")]},
    48: {"a": [("I ___ out at the gym every morning.", "work / works / working", "work"), ("I'm looking forward ___ my holiday.", "to / for / at", "to"), ("We ran ___ of milk.", "out / off / away", "out"), ("She takes care ___ her children.", "of / for / about", "of"), ("They carried ___ the research.", "out / on / off", "out")],
         "b": [("look forward to + ___", "-ing or noun / infinitive / past", "-ing or noun"), ("run out of + ___", "object / no object / clause", "object"), ("take care of ≈ ___", "look after / look for / look at", "look after"), ("carry out = ___", "perform / continue / stop", "perform"), ("deal with = ___", "handle / ignore / create", "handle")],
         "c": [("*I'm looking forward to go.*", "I'm looking forward to **going**."), ("*We ran out milk.*", "We ran **out of** milk."), ("*She takes care her children.*", "She takes care **of** her children."), ("*They carried on the research.* (perform)", "They **carried out** the research."), ("*I don't know how to deal this problem.*", "deal **with** this problem")]},
    49: {"a": [("You ___ hurry — we have time.", "needn't / need / mustn't", "needn't"), ("I need ___ buy a ticket.", "to / for / -", "to"), ("She needn't ___ bought a new one.", "have / to / -", "have"), ("This needs ___ urgently.", "repairing / to repair / repair", "repairing"), ("We needn't ___ booked the table.", "have / to / -", "have")],
         "b": [("needn't + ___", "bare infinitive / to infinitive / -ing", "bare infinitive"), ("need (main verb) + ___", "to infinitive / bare infinitive / -ing", "to infinitive"), ("needn't have + ___", "past participle / infinitive / -ing", "past participle"), ("need + -ing = ___", "passive meaning / active / future", "passive meaning"), ("don't need to ≈ ___", "needn't / mustn't / shouldn't", "needn't")],
         "c": [("*You needn't to hurry.*", "You needn't **hurry**."), ("*I need buy a ticket.*", "I need **to** buy a ticket."), ("*She needn't bought.* (missing have)", "She needn't **have** bought a new one."), ("*This needs to repairing.*", "This needs **repairing**."), ("*We needn't to have booked.*", "We needn't **have** booked the table.")]},
    50: {"a": [("You ___ better see a doctor.", "had / have / would", "had"), ("I'd ___ stay at home.", "rather / better / need", "rather"), ("We ran ___ of milk.", "out / off / away", "out"), ("You ___ hurry.", "needn't / need / must", "needn't"), ("It's time ___ go home.", "to / for / that", "to")],
         "b": [("had better → ___", "advice / preference / necessity", "advice"), ("would rather → ___", "preference / advice / phrasal verb", "preference"), ("ran out of → ___", "phrasal verb / modal / it's time", "phrasal verb"), ("needn't → ___", "no necessity / preference / advice", "no necessity"), ("it's time to → ___", "advice timing / preference / phrasal", "advice timing")],
         "c": [("*You had better to see a doctor.*", "You had better **see** a doctor."), ("*I'd rather to stay.*", "I'd rather **stay**."), ("*We ran out milk.*", "We ran **out of** milk."), ("*You needn't to hurry.*", "You needn't **hurry**."), ("*It's time you go home.* (that-clause)", "It's time you **went** home / It's time **to go** home.")]},
}

VOCAB = {
    46: {"a": [("advice", "consejo · preference · phrasal", "consejo"), ("advise", "aconsejar · prefer · deal", "aconsejar"), ("warn", "advertir · urge · follow", "advertir"), ("urge", "instar · suggest · disregard", "instar"), ("it's high time", "ya es hora (fuerte) · it's time · had better", "ya es hora (fuerte)")],
         "b": [("had better ≈ ___", "más te vale / preferiría / no necesitas", "más te vale"), ("it's time to ≈ ___", "ya es hora de / en lugar de / quedarse sin", "ya es hora de"), ("seek advice ≈ ___", "pedir consejo / dar consejo / ignorar", "pedir consejo"), ("a piece of advice ≈ ___", "un consejo / un advise / advices", "un consejo"), ("follow advice ≈ ___", "seguir consejo / desatender / optar", "seguir consejo")]},
    47: {"a": [("preference", "preferencia · necessity · advice", "preferencia"), ("prefer", "preferir · need · warn", "preferir"), ("favourite", "favorito · first choice · opt for", "favorito"), ("rather than", "en lugar de · than / then · instead of", "en lugar de"), ("opt for", "optar por · choose · select", "optar por")],
         "b": [("would rather ≈ ___", "preferiría / más te vale / necesitas", "preferiría"), ("would sooner ≈ ___", "preferiría (más fuerte) / obligación / consejo", "preferiría (más fuerte)"), ("I'd rather you didn't ≈ ___", "preferiría que no / ya es hora / no necesitas", "preferiría que no"), ("first choice ≈ ___", "primera opción / obligación / phrasal verb", "primera opción"), ("instead of ≈ ___", "en lugar de / que (than) / para (for)", "en lugar de")]},
    48: {"a": [("work out", "entrenar · look forward · run out", "entrenar"), ("look forward to", "esperar con ilusión · take care · carry out", "esperar con ilusión"), ("run out of", "quedarse sin · deal with · work out", "quedarse sin"), ("take care of", "cuidar de · carry out · deal with", "cuidar de"), ("carry out", "llevar a cabo · deal with · work out", "llevar a cabo")],
         "b": [("work out ≈ ___", "entrenar/resolver / esperar / quedarse sin", "entrenar/resolver"), ("look forward to + ___", "-ing o noun / infinitivo / pasado", "-ing o noun"), ("run out of ≈ ___", "quedarse sin / cuidar de / lidiar con", "quedarse sin"), ("take care of ≈ ___", "cuidar de / buscar / mirar", "cuidar de"), ("deal with ≈ ___", "lidiar con / llevar a cabo / entrenar", "lidiar con")]},
    49: {"a": [("necessity", "necesidad · preference · advice", "necesidad"), ("necessary", "necesario · unnecessary · optional", "necesario"), ("unnecessary", "innecesario · essential · need", "innecesario"), ("essential", "esencial · optional · needn't", "esencial"), ("optional", "opcional · necessary · must", "opcional")],
         "b": [("needn't ≈ ___", "no necesitas / debes / preferirías", "no necesitas"), ("needn't have ≈ ___", "no era necesario (pasado) / necesitas ahora / obligación", "no era necesario (pasado)"), ("need + -ing ≈ ___", "necesita ser hecho / quiere hacer / ha hecho", "necesita ser hecho"), ("don't need to ≈ ___", "needn't / mustn't / shouldn't", "needn't"), ("in need of ≈ ___", "necesitado de / preferencia por / consejo sobre", "necesitado de")]},
    50: {"a": [("had better / it's time", "advice · would rather · run out", "advice"), ("would rather / would sooner", "preferences · needn't · had better", "preferences"), ("work out / look forward to", "phrasal · advice · necessary", "phrasal"), ("need / needn't", "necessity · preference · carry out", "necessity"), ("advice / preference / deal with / essential", "vocab mix · wrong", "vocab mix")],
         "b": [("had better → ___", "advice / preference / phrasal", "advice"), ("would rather → ___", "preference / needn't / it's time", "preference"), ("ran out of → ___", "phrasal / advice / unnecessary", "phrasal"), ("needn't → ___", "no necessity / preference / advice", "no necessity"), ("it's time to → ___", "advice timing / would rather / deal with", "advice timing")]},
}

def rq(u):
    bases = {
        46: [("___ better see doctor?", "had", "had / have"), ("Time ___ go home?", "to", "to / for"), ("Time you ___ studying?", "started", "started / start"), ("Better ___ tell him?", "not", "not / no"), ("High time we ___ decision?", "made", "made / make"), ("Main grammar?", "had better/it's time", "advice / preference"), ("Find had better", "had better see a doctor", "(open)"), ("Find it's time to", "it's time to go", "(open)"), ("Find it's time you", "it's time you started", "(open)"), ("Write had better…", "Model OK", "(open)"), ("Advice vocab?", "advice, warn, urge, seek advice", "yes / none"), ("had better + to OK?", "False", "False / True"), ("Course", "/curso-b1/unit-46", "/curso-b1/unit-46"), ("it's time for + verb?", "False (noun)", "False / True"), ("Open Ver solución", "yes", "yes")],
        47: [("Rather ___ at home?", "stay", "stay / to stay"), ("Walk ___ bus?", "than", "than / then"), ("Rather you ___ tell?", "didn't", "didn't / don't"), ("___ not mention?", "rather", "rather / sooner"), ("Sooner die ___ apologise?", "than", "than / then"), ("Main grammar?", "would rather", "preference / advice"), ("Find would rather", "rather stay / walk than", "(open)"), ("Find would sooner", "sooner die than", "(open)"), ("Find rather you didn't", "rather you didn't tell", "(open)"), ("Write would rather…", "Model OK", "(open)"), ("Prefs vocab?", "preference, favourite, opt for", "yes / none"), ("rather + to OK?", "False", "False / True"), ("Course", "/curso-b1/unit-47", "/curso-b1/unit-47"), ("rather (that) + present?", "False (past)", "False / True"), ("Open Ver solución", "yes", "yes")],
        48: [("___ out at gym?", "work", "work / works"), ("Looking forward ___ holiday?", "to", "to / for"), ("Ran ___ of milk?", "out", "out / off"), ("Takes care ___ children?", "of", "of / for"), ("Carried ___ research?", "out", "out / on"), ("Main grammar?", "phrasal verbs 3", "phrasal / modal"), ("Find work out", "work out at the gym", "(open)"), ("Find look forward to", "looking forward to my holiday", "(open)"), ("Find run out of", "ran out of milk", "(open)"), ("Write deal with…", "Model OK", "(open)"), ("Work vocab?", "project, deadline, colleague", "yes / none"), ("look forward to + inf OK?", "False", "False / True"), ("Course", "/curso-b1/unit-48", "/curso-b1/unit-48"), ("run out of needs object?", "True", "True / False"), ("Open Ver solución", "yes", "yes")],
        49: [("___ hurry?", "needn't", "needn't / need"), ("Need ___ buy ticket?", "to", "to / -"), ("Needn't ___ bought?", "have", "have / to"), ("Needs ___ urgently?", "repairing", "repairing / repair"), ("Needn't ___ booked?", "have", "have / to"), ("Main grammar?", "need/needn't", "necessity / preference"), ("Find needn't", "needn't hurry", "(open)"), ("Find need to", "need to buy", "(open)"), ("Find needn't have", "needn't have booked", "(open)"), ("Write need + -ing…", "Model OK", "(open)"), ("Necessity vocab?", "necessary, unnecessary, essential", "yes / none"), ("needn't + to OK?", "False", "False / True"), ("Course", "/curso-b1/unit-49", "/curso-b1/unit-49"), ("needn't have = past unnecessary?", "True", "True / False"), ("Open Ver solución", "yes", "yes")],
        50: [("___ better see doctor?", "had", "had / would"), ("Rather ___ home?", "stay", "stay / to"), ("Ran ___ of milk?", "out", "out / off"), ("___ hurry?", "needn't", "needn't / must"), ("Time ___ go?", "to", "to / for"), ("Classify had better", "advice", "advice / preference"), ("Classify would rather", "preference", "preference / phrasal"), ("Classify ran out of", "phrasal", "phrasal / needn't"), ("Classify needn't", "no necessity", "no necessity / advice"), ("Classify it's time to", "advice timing", "advice / preference"), ("Write 1× each", "Model OK", "(open)"), ("Mixed U46-49?", "Yes", "Yes / No"), ("Course", "/curso-b1/unit-50", "/curso-b1/unit-50"), ("Module 5 U41-50?", "Yes", "Yes / No"), ("Open Ver solución", "yes", "yes")],
    }
    return bases[u]

LISTEN_Q = {
    46: [("Who speaks?", "Frank", "Frank / Gina / Jack"), ("___ better see doctor", "had", "had / have"), ("Time ___ go home", "to", "to / for"), ("Time you ___ studying", "started", "started / start"), ("Better ___ tell him", "not", "not / no"), ("Main grammar?", "had better/it's time", "advice / preference"), ("Find had better", "had better see a doctor", "(open)"), ("Find it's time to", "it's time to go home", "(open)"), ("Write had better…", "Model OK", "(open)"), ("Advice words?", "advice, warn, urge", "yes / none"), ("Shadow", "done", "(open)"), ("had better + to?", "False", "False / True"), ("Course", "/curso-b1/unit-46", "/curso-b1/unit-46"), ("it's high time", "yes", "yes / no"), ("Open Ver solución", "yes", "yes")],
    47: [("Who speaks?", "Gina", "Gina / Frank / Iris"), ("Rather ___ home", "stay", "stay / to stay"), ("Walk ___ bus", "than", "than / then"), ("Rather you ___ tell", "didn't", "didn't / don't"), ("Sooner die ___ apologise", "than", "than / then"), ("Main grammar?", "would rather", "preference / advice"), ("Find would rather", "rather stay / walk than", "(open)"), ("Find rather you didn't", "rather you didn't tell", "(open)"), ("Write would rather…", "Model OK", "(open)"), ("Prefs words?", "preference, favourite", "yes / none"), ("Shadow", "done", "(open)"), ("rather + to?", "False", "False / True"), ("Course", "/curso-b1/unit-47", "/curso-b1/unit-47"), ("would sooner", "yes", "yes / no"), ("Open Ver solución", "yes", "yes")],
    48: [("Who speaks?", "Hugo", "Hugo / Jack / Frank"), ("___ out at gym", "work", "work / works"), ("Looking forward ___ holiday", "to", "to / for"), ("Ran ___ of milk", "out", "out / off"), ("Takes care ___ children", "of", "of / for"), ("Main grammar?", "phrasal verbs", "phrasal / modal"), ("Find work out", "work out at the gym", "(open)"), ("Find look forward to", "looking forward to my holiday", "(open)"), ("Find run out of", "ran out of milk", "(open)"), ("Write carry out…", "Model OK", "(open)"), ("Work words?", "research, deal with", "yes / none"), ("Shadow", "done", "(open)"), ("forward to + inf?", "False", "False / True"), ("Course", "/curso-b1/unit-48", "/curso-b1/unit-48"), ("deal with", "yes", "yes / no"), ("Open Ver solución", "yes", "yes")],
    49: [("Who speaks?", "Iris", "Iris / Gina / Hugo"), ("___ hurry", "needn't", "needn't / need"), ("Need ___ buy", "to", "to / -"), ("Needn't ___ bought", "have", "have / to"), ("Needs ___ urgently", "repairing", "repairing / repair"), ("Main grammar?", "need/needn't", "necessity / preference"), ("Find needn't", "needn't hurry", "(open)"), ("Find need to", "need to buy a ticket", "(open)"), ("Find needn't have", "needn't have booked", "(open)"), ("Write needs repairing…", "Model OK", "(open)"), ("Necessity words?", "necessary, essential", "yes / none"), ("Shadow", "done", "(open)"), ("needn't + to?", "False", "False / True"), ("Course", "/curso-b1/unit-49", "/curso-b1/unit-49"), ("needn't have", "yes", "yes / no"), ("Open Ver solución", "yes", "yes")],
    50: [("Who speaks?", "Jack", "Jack / Frank / Iris"), ("___ better doctor", "had", "had / would"), ("Rather ___ home", "stay", "stay / to"), ("Ran ___ milk", "out", "out / off"), ("___ hurry", "needn't", "needn't / must"), ("Classify had better", "advice", "advice / preference"), ("Classify would rather", "preference", "preference / phrasal"), ("Classify ran out of", "phrasal", "phrasal / needn't"), ("Classify needn't", "no necessity", "no necessity / advice"), ("Write 1× each", "Model OK", "(open)"), ("Shadow", "done", "(open)"), ("Mixed?", "Yes", "Yes / No"), ("Course", "/curso-b1/unit-50", "/curso-b1/unit-50"), ("Module 5 complete?", "Yes", "Yes / No"), ("Open Ver solución", "yes", "yes")],
}

WRITE = {
    46: (["Escribe 3× had better / it's time.", "Completa: You ___ better see a doctor.", "Completa: It's time ___ go home.", "Completa: It's time you ___ (start).", "Completa: You had better ___ tell him.", "Corrige: *You had better to leave.*", "Corrige: *It's time you start.*", "Usa it's high time y it's about time en 2 frases.", "Escribe: You had better not tell him.", "Mini-diálogo (4 frases) con advice.", "Traduce: Más te vale ver a un médico.", "Traduce: Ya es hora de ir a casa.", "Explica had better vs it's time en 1 frase.", "Escribe 1× it's time for + noun.", "Autochequeo: had better sin to."],
         ["Open three.", "**had**", "**to**", "**started**", "**not**", "had better **leave**", "you **started**", "Open.", "OK.", "Open.", "You had better see a doctor.", "It's time to go home.", "had better=urgent advice; it's time=right moment.", "OK.", "Self-check."]),
    47: (["Escribe 3× would rather / would sooner.", "Completa: I'd rather ___ at home.", "Completa: walk ___ take the bus.", "Completa: I'd rather you ___ (not tell).", "Completa: I'd ___ not mention it.", "Corrige: *I would rather to stay.*", "Corrige: *I'd rather you don't tell him.*", "Usa would sooner y rather than en 2 frases.", "Escribe: I'd rather walk than take the bus.", "Mini-diario de preferencias (4 frases).", "Traduce: Preferiría quedarme en casa.", "Traduce: Preferiría que no se lo dijeras.", "Explica would rather vs would prefer en 1 frase.", "Escribe 1× would rather (that) + past.", "Autochequeo: would rather sin to."],
         ["Open three.", "**stay**", "**than**", "**didn't tell**", "**rather**", "would rather **stay**", "you **didn't** tell him", "Open.", "OK.", "Open.", "I'd rather stay at home.", "I'd rather you didn't tell him.", "rather + bare inf; prefer + to.", "OK.", "Self-check."]),
    48: (["Escribe 2× phrasal verbs de la unidad.", "Completa: I ___ out at the gym.", "Completa: looking forward ___ my holiday.", "Completa: ran ___ of milk.", "Completa: takes care ___ her children.", "Corrige: *looking forward to go*", "Corrige: *ran out milk*", "Usa carry out y deal with en 2 frases.", "Escribe: We ran out of milk.", "Mini-historia (4 frases) con phrasal verbs.", "Traduce: Entreno en el gimnasio cada mañana.", "Traduce: Estoy esperando con ilusión las vacaciones.", "Explica look forward to en 1 frase.", "Escribe 1× take care of.", "Autochequeo: bloques phrasal verb completos."],
         ["Open two.", "**work**", "**to**", "**out**", "**of**", "forward to **going**", "ran **out of** milk", "Open.", "OK.", "Open.", "I work out at the gym.", "I'm looking forward to my holiday.", "to + -ing or noun.", "OK.", "Self-check."]),
    49: (["Escribe 2× needn't + 2× need to + 1× need + -ing.", "Completa: You ___ hurry.", "Completa: I need ___ buy a ticket.", "Completa: She needn't ___ bought.", "Completa: This needs ___ urgently.", "Corrige: *You needn't to hurry.*", "Corrige: *I need buy a ticket.*", "Usa needn't have y unnecessary en 2 frases.", "Escribe: We needn't have booked the table.", "Mini-diálogo (4 frases) con need/needn't.", "Traduce: No necesitas darte prisa.", "Traduce: Necesito comprar un billete.", "Explica needn't vs don't need to en 1 frase.", "Escribe 1× essential.", "Autochequeo: needn't sin to; need to con to."],
         ["Open five.", "**needn't**", "**to**", "**have**", "**repairing**", "needn't **hurry**", "need **to** buy", "Open.", "OK.", "Open.", "You needn't hurry.", "I need to buy a ticket.", "Similar meaning; needn't more formal/modal.", "OK.", "Self-check."]),
    50: (["Una frase: had better, would rather, phrasal verb, needn't, it's time.", "Completa: You ___ better see a doctor.", "Completa: I'd ___ stay at home.", "Completa: ran ___ of milk.", "Completa: You ___ hurry.", "Completa: It's time ___ go home.", "Corrige: *had better to see*", "Corrige: *rather to stay*", "Corrige: *needn't to hurry*", "Mini-historia (5 frases) mix U46–49.", "Matching: advice / preference / phrasal / necessity.", "Traduce: Más te vale ver a un médico.", "Traduce: Preferiría quedarme en casa.", "Autochequeo con mapa U50.", "Open Ver solución checklist."],
         ["Open one of each.", "**had**", "**rather**", "**out**", "**needn't**", "**to**", "had better **see**", "rather **stay**", "needn't **hurry**", "Open mixed.", "OK.", "You had better see a doctor.", "I'd rather stay at home.", "Self-check.", "yes."]),
}

READ_Q = {u: rq(u) for u in (46, 47, 48, 49, 50)}


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
        if u < 50 else "3. Módulo 5 (U41–50) completo — siguiente bloque: [Unidad 51](/curso-b1/unit-51)."
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
    for u in (46, 47, 48, 49, 50):
        d = ROOT / f"public/audio/blog/curso-b1/unit-{u}"
        d.mkdir(parents=True, exist_ok=True)
        for name, text in (("reading-workbook", READ[u]), ("listening-workbook", LISTEN[u])):
            path = d / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def main():
    make_audios()
    for u in (46, 47, 48, 49, 50):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path)


if __name__ == "__main__":
    main()
