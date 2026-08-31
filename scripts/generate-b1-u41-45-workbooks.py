#!/usr/bin/env python3
"""Generate B1 Units 41–45 exercise workbooks + TTS."""
from pathlib import Path
from gtts import gTTS

OUT = Path("src/content/blog/curso-b1")
ROOT = Path(__file__).resolve().parents[1]
DATE = "2026-08-31"

LISTEN = {
    41: "Hi, I am Alex. I depend on my parents. Please listen to me. We waited for the bus. Look at the board, please. I believe in you.",
    42: "Hi, I am Beth. I'm interested in learning English. She's afraid of spiders. He's good at maths. I'm proud of my son. I'm worried about the exam.",
    43: "Hi, I am Chris. I fell asleep during the film. We lived there for three years. I met her while I was travelling. She phoned during the meeting. The phone rang while we were eating.",
    44: "Hi, I am Dana. I have lived here since 2015. We have known each other for ten years. The shop is open from 9am to 5pm. She has been ill since Monday. I haven't eaten since breakfast.",
    45: "Hi, I am Eva. I depend on my parents. She's interested in art. I fell asleep during the film. I have lived here since 2015. We waited for two hours.",
}

READ = {
    41: "I depend on my parents. Please listen to me. We waited for the bus. Look at the board, please. I believe in you.",
    42: "I'm interested in learning English. She's afraid of spiders. He's good at maths. I'm proud of my son. I'm worried about the exam.",
    43: "I fell asleep during the film. We lived there for three years. I met her while I was travelling. She phoned during the meeting. The phone rang while we were eating.",
    44: "I have lived here since 2015. We have known each other for ten years. The shop is open from 9am to 5pm. She has been ill since Monday. I haven't eaten since breakfast.",
    45: "I depend on my parents. She's interested in art. I fell asleep during the film. I have lived here since 2015. We waited for two hours.",
}

META = {
    41: dict(slug="unidad-41-verb-preposition-dependent", title="Verb + Preposition & Dependent", full="Verb + Preposition & Dependent Prepositions", focus="verb + preposition (depend on, listen to, wait for, look at…)", vocab="dependent prepositions", image="/blog/curso-b1/unit-41/verb-preposition.png", prev="unidad-40-repaso-36-39-ejercicios-soluciones", next_t="unidad-42-adjective-preposition-feelings", r_title="Depend on me", l_title="Alex on verb prep", kw=["verb preposition ejercicios", "depend on listen to", "dependent prepositions"]),
    42: dict(slug="unidad-42-adjective-preposition-feelings", title="Adj + Preposition & Feelings", full="Adjective + Preposition & Feelings & Attitudes", focus="adjective + preposition (interested in, afraid of, good at…)", vocab="feelings & attitudes", image="/blog/curso-b1/unit-42/adj-preposition.png", prev="unidad-41-verb-preposition-dependent-ejercicios-soluciones", next_t="unidad-43-during-for-while-time", r_title="Feelings in context", l_title="Beth on feelings", kw=["adjective preposition ejercicios", "interested in afraid of", "feelings attitudes vocabulary"]),
    43: dict(slug="unidad-43-during-for-while-time", title="During, For, While & Time", full="During, For, While & Time", focus="during/for/while + time vocabulary", vocab="time", image="/blog/curso-b1/unit-43/during-for-while.png", prev="unidad-42-adjective-preposition-feelings-ejercicios-soluciones", next_t="unidad-44-for-since-from-time", r_title="During the film", l_title="Chris on time", kw=["during for while ejercicios", "during vs for", "while clause English"]),
    44: dict(slug="unidad-44-for-since-from-time", title="For, Since, From & Time", full="For, Since, From & Time Expressions", focus="for/since/from + time expressions", vocab="time expressions", image="/blog/curso-b1/unit-44/for-since-from.png", prev="unidad-43-during-for-while-time-ejercicios-soluciones", next_t="unidad-45-repaso-41-44", r_title="Since 2015", l_title="Dana on time expressions", kw=["for since from ejercicios", "since present perfect", "time expressions English"]),
    45: dict(slug="unidad-45-repaso-41-44", title="Repaso 41–44", full="Repaso 41–44: Prepositions & Time", focus="verb/adj + preposition, during/for/while, for/since/from (mix U41–44)", vocab="dependent prepositions, feelings, time (mix)", image="/blog/curso-b1/unit-45/review-map.png", prev="unidad-44-for-since-from-time-ejercicios-soluciones", next_t="unidad-41-verb-preposition-dependent", r_title="Mixed review", l_title="Eva's mixed review", kw=["repaso B1 41-44", "prepositions review", "during for while review"]),
}

GRAM = {
    41: {"a": [("I depend ___ my parents.", "on / of / for", "on"), ("Please listen ___ me.", "to / at / for", "to"), ("We waited ___ the bus.", "for / to / at", "for"), ("Look ___ the board.", "at / on / to", "at"), ("I believe ___ you.", "in / on / at", "in")],
         "b": [("pay ___ (the meal)", "for / to / at", "for"), ("agree ___ you", "with / to / on", "with"), ("talk ___ the project", "about / of / on", "about"), ("worry ___ it", "about / for / of", "about"), ("depend on ≈ ___", "rely on / listen to / look at", "rely on")],
         "c": [("*I depend of my parents.*", "I depend **on** my parents."), ("*Listen me.*", "Listen **to** me."), ("*We waited the bus.*", "We waited **for** the bus."), ("*Look the board.*", "Look **at** the board."), ("*I believe on you.*", "I believe **in** you.")]},
    42: {"a": [("I'm interested ___ learning English.", "in / on / at", "in"), ("She's afraid ___ spiders.", "of / from / about", "of"), ("He's good ___ maths.", "at / in / on", "at"), ("I'm proud ___ my son.", "of / for / about", "of"), ("I'm worried ___ the exam.", "about / of / for", "about")],
         "b": [("tired ___ waiting", "of / from / about", "of"), ("responsible ___ the project", "for / of / to", "for"), ("different ___ each other", "from / than / of", "from"), ("fed up ___ the rain", "with / of / about", "with"), ("married ___ someone", "to / with / of", "to")],
         "c": [("*interested on English*", "interested **in** English"), ("*afraid from spiders*", "afraid **of** spiders"), ("*good in maths*", "good **at** maths"), ("*proud for my son*", "proud **of** my son"), ("*worried of the exam*", "worried **about** the exam")]},
    43: {"a": [("I fell asleep ___ the film.", "during / while / for", "during"), ("We lived there ___ three years.", "for / during / while", "for"), ("I met her ___ I was travelling.", "while / during / for", "while"), ("She phoned ___ the meeting.", "during / while / for", "during"), ("The phone rang ___ we were eating.", "while / during / for", "while")],
         "b": [("during + ___", "noun / clause / duration", "noun"), ("for + ___", "duration / noun event / clause", "duration"), ("while + ___", "clause / noun only / duration", "clause"), ("during the film ≈ ___", "in the film (time) / for the film / since the film", "in the film (time)"), ("for three years = ___", "duration / starting point / range", "duration")],
         "c": [("*during I was travelling*", "**while** I was travelling / **during** the trip"), ("*for the film* (during screening)", "**during** the film"), ("*while the meeting* (noun only)", "**during** the meeting / **while** we were in the meeting"), ("*I met her during I travelled*", "I met her **while** I was travelling"), ("*we lived there during three years*", "We lived there **for** three years")]},
    44: {"a": [("I have lived here ___ 2015.", "since / for / from", "since"), ("We have known each other ___ ten years.", "for / since / from", "for"), ("The shop is open ___ 9am ___ 5pm.", "from … to / since … for / during … while", "from … to"), ("She has been ill ___ Monday.", "since / for / from", "since"), ("I haven't eaten ___ breakfast.", "since / for / from", "since")],
         "b": [("for + ___", "duration / starting point / range end", "duration"), ("since + ___", "starting point / duration / to", "starting point"), ("from…to = ___", "range / duration only / clause", "range"), ("since 2015 → tense often ___", "present perfect / past simple only / future", "present perfect"), ("for ten years counts ___", "how long / when started / until when", "how long")],
         "c": [("*I have lived here for 2015.*", "I have lived here **since** 2015."), ("*We have known since ten years.*", "We have known each other **for** ten years."), ("*open since 9am to 5pm*", "open **from** 9am **to** 5pm"), ("*ill for Monday* (starting point)", "ill **since** Monday"), ("*from 2015* (duration until now, no to)", "lived here **since** 2015 / **from** 2015 **to** now")]},
    45: {"a": [("I depend ___ my parents.", "on / in / for", "on"), ("She's interested ___ art.", "in / on / at", "in"), ("I fell asleep ___ the film.", "during / while / for", "during"), ("I have lived here ___ 2015.", "since / for / from", "since"), ("We waited ___ two hours.", "for / during / while", "for")],
         "b": [("depend on → ___", "verb prep / adj prep / time", "verb prep"), ("interested in → ___", "adj prep / during / since", "adj prep"), ("during the film → ___", "time noun / duration / starting point", "time noun"), ("since 2015 → ___", "starting point / duration / range", "starting point"), ("for two hours → ___", "duration / point / noun event", "duration")],
         "c": [("*depend of my parents*", "depend **on** my parents"), ("*interested on art*", "interested **in** art"), ("*asleep while the film*", "asleep **during** the film"), ("*lived here for 2015*", "lived here **since** 2015"), ("*waited during two hours*", "waited **for** two hours")]},
}

VOCAB = {
    41: {"a": [("apply", "solicitar · afraid · during", "solicitar"), ("ask for", "pedir · interested · since", "pedir"), ("succeed", "tener éxito · worried · while", "tener éxito"), ("complain", "quejarse · proud · for ages", "quejarse"), ("colocation", "bloque verbo+prep · adjective · duration", "bloque verbo+prep")],
         "b": [("depend on ≈ ___", "depender de / interesado en / durante", "depender de"), ("listen to ≈ ___", "escuchar a / bueno en / desde", "escuchar a"), ("wait for ≈ ___", "esperar a / orgulloso de / por", "esperar a"), ("pay for ≈ ___", "pagar por / miedo a / mientras", "pagar por"), ("agree with ≈ ___", "estar de acuerdo / preocupado / desde 2015", "estar de acuerdo")]},
    42: {"a": [("excited", "emocionado · depend · during", "emocionado"), ("keen", "entusiasta · listen · for", "entusiasta"), ("sorry", "sentir · wait · since", "sentir"), ("famous", "famoso · look · while", "famoso"), ("attitude", "actitud · believe · from", "actitud")],
         "b": [("interested in → ___", "feeling + topic / verb prep / duration", "feeling + topic"), ("afraid of → ___", "fear + cause / good at / for years", "fear + cause"), ("good at → ___", "skill / worry about / during", "skill"), ("proud of → ___", "positive feeling / depend on / since", "positive feeling"), ("fed up with ≈ ___", "harto de / miedo a / durante", "harto de")]},
    43: {"a": [("moment", "momento · depend · interested", "momento"), ("period", "período · afraid · proud", "período"), ("duration", "duración · good · worried", "duración"), ("meanwhile", "mientras tanto · pay · married", "mientras tanto"), ("throughout", "a lo largo de · agree · apply", "a lo largo de")],
         "b": [("during → ___", "noun event / clause / duration number", "noun event"), ("for → ___", "how long / when started / from…to", "how long"), ("while → ___", "subject+verb / noun only / duration", "subject+verb"), ("meanwhile ≈ ___", "at the same time / for three years / since", "at the same time"), ("throughout the day ≈ ___", "all day long / for Monday / since morning", "all day long")]},
    44: {"a": [("for ages", "mucho tiempo · depend · during", "mucho tiempo"), ("all day", "todo el día · interested · while", "todo el día"), ("so far", "hasta ahora · afraid · look", "hasta ahora"), ("already", "ya · good · wait", "ya"), ("until", "hasta · proud · believe", "hasta")],
         "b": [("for ages = ___", "long duration / starting point / noun event", "long duration"), ("so far → tense ___", "present perfect / only past / future", "present perfect"), ("from…to ≈ ___", "range / duration / since", "range"), ("by 5pm = ___", "deadline / duration / since", "deadline"), ("yet (neg/question) ≈ ___", "todavía / durante / desde", "todavía")]},
    45: {"a": [("depend on / listen to", "verb prep · only adj prep", "verb prep"), ("interested in / afraid of", "adj prep · only during", "adj prep"), ("during / for / while", "time trio · only since", "time trio"), ("for / since / from", "time expressions · only verb prep", "time expressions"), ("apply / excited / moment / for ages", "vocab mix · wrong", "vocab mix")],
         "b": [("depend on → ___", "verb prep / adj prep / duration", "verb prep"), ("during + ___", "noun / clause / duration", "noun"), ("since + ___", "point / duration / to", "point"), ("for + hours → ___", "duration / point / noun event", "duration"), ("interested in → ___", "adj prep / verb prep / while", "adj prep")]},
}

def rq(u):
    bases = {
        41: [("Depend ___ parents?", "on", "on / of"), ("Listen ___ me?", "to", "to / at"), ("Waited ___ bus?", "for", "for / to"), ("Look ___ board?", "at", "at / on"), ("Believe ___ you?", "in", "in / on"), ("Main grammar?", "verb + preposition", "verb prep / adj prep"), ("Find depend on", "depend on my parents", "(open)"), ("Find listen to", "listen to me", "(open)"), ("Find wait for", "waited for the bus", "(open)"), ("Write depend on…", "Model OK", "(open)"), ("Dependent prep vocab?", "apply, ask for, succeed, complain", "yes / none"), ("depend of OK?", "False", "False / True"), ("Course", "/curso-b1/unit-41", "/curso-b1/unit-41"), ("listen without to?", "Only without object", "Only / Always"), ("Open Ver solución", "yes", "yes")],
        42: [("Interested ___ English?", "in", "in / on"), ("Afraid ___ spiders?", "of", "of / from"), ("Good ___ maths?", "at", "at / in"), ("Proud ___ son?", "of", "of / for"), ("Worried ___ exam?", "about", "about / of"), ("Main grammar?", "adj + preposition", "adj prep / verb prep"), ("Find interested in", "interested in learning", "(open)"), ("Find afraid of", "afraid of spiders", "(open)"), ("Find good at", "good at maths", "(open)"), ("Write interested in…", "Model OK", "(open)"), ("Feelings vocab?", "excited, keen, sorry, famous", "yes / none"), ("interested on OK?", "False", "False / True"), ("Course", "/curso-b1/unit-42", "/curso-b1/unit-42"), ("good in maths?", "False", "False / True"), ("Open Ver solución", "yes", "yes")],
        43: [("Asleep ___ film?", "during", "during / while"), ("Lived there ___ years?", "for three", "for / during"), ("Met her ___ travelling?", "while", "while / during"), ("Phoned ___ meeting?", "during", "during / for"), ("Rang ___ eating?", "while", "while / during"), ("Main grammar?", "during/for/while", "time trio / since"), ("Find during + noun", "during the film / meeting", "(open)"), ("Find for + duration", "for three years", "(open)"), ("Find while + clause", "while I was travelling / eating", "(open)"), ("Write while…", "Model OK", "(open)"), ("Time vocab?", "moment, period, duration, meanwhile", "yes / none"), ("during + clause OK?", "False", "False / True"), ("Course", "/curso-b1/unit-43", "/curso-b1/unit-43"), ("for + noun event?", "during", "during / for"), ("Open Ver solución", "yes", "yes")],
        44: [("Lived here ___ 2015?", "since", "since / for"), ("Known ___ ten years?", "for", "for / since"), ("Open ___ 9am ___ 5pm?", "from … to", "from-to / since"), ("Ill ___ Monday?", "since", "since / for"), ("Not eaten ___ breakfast?", "since", "since / for"), ("Main grammar?", "for/since/from", "for-since-from / while"), ("Find since + point", "since 2015 / Monday", "(open)"), ("Find for + duration", "for ten years", "(open)"), ("Find from…to", "from 9am to 5pm", "(open)"), ("Write since…", "Model OK", "(open)"), ("Time expr vocab?", "for ages, all day, so far, until", "yes / none"), ("for + 2015 OK?", "False", "False / True"), ("Course", "/curso-b1/unit-44", "/curso-b1/unit-44"), ("since = duration?", "No (point)", "No / Yes"), ("Open Ver solución", "yes", "yes")],
        45: [("Depend ___ parents?", "on", "on / in"), ("Interested ___ art?", "in", "in / on"), ("Asleep ___ film?", "during", "during / while"), ("Lived ___ 2015?", "since", "since / for"), ("Waited ___ hours?", "for two", "for / during"), ("Classify depend on", "verb prep", "verb prep / adj prep"), ("Classify interested in", "adj prep", "adj prep / during"), ("Classify during film", "during + noun", "during / since"), ("Classify since 2015", "since + point", "since / for"), ("Classify for two hours", "for + duration", "for / while"), ("Write 1× each", "Model OK", "(open)"), ("Mixed?", "Yes", "Yes / No"), ("Course", "/curso-b1/unit-45", "/curso-b1/unit-45"), ("Module 5 U41-45?", "Yes", "Yes / No"), ("Open Ver solución", "yes", "yes")],
    }
    return bases[u]

LISTEN_Q = {
    41: [("Who speaks?", "Alex", "Alex / Beth / Eva"), ("Depend ___ parents", "on", "on / of"), ("Listen ___ me", "to", "to / at"), ("Waited ___ bus", "for", "for / to"), ("Look ___ board", "at", "at / on"), ("Believe ___ you", "in", "in / on"), ("Grammar?", "verb prep", "verb prep / adj prep"), ("Find depend on", "depend on my parents", "(open)"), ("Find listen to", "listen to me", "(open)"), ("Write depend on…", "Model OK", "(open)"), ("Dependent words?", "apply, ask for, succeed", "yes / none"), ("Shadow", "done", "(open)"), ("depend of OK?", "False", "False / True"), ("Course", "/curso-b1/unit-41", "/curso-b1/unit-41"), ("Open Ver solución", "yes", "yes")],
    42: [("Who speaks?", "Beth", "Beth / Alex / Chris"), ("Interested ___ English", "in", "in / on"), ("Afraid ___ spiders", "of", "of / from"), ("Good ___ maths", "at", "at / in"), ("Proud ___ son", "of", "of / for"), ("Worried ___ exam", "about", "about / of"), ("Grammar?", "adj prep", "adj prep / verb prep"), ("Find interested in", "interested in learning", "(open)"), ("Find afraid of", "afraid of spiders", "(open)"), ("Write good at…", "Model OK", "(open)"), ("Feelings words?", "excited, keen, sorry", "yes / none"), ("Shadow", "done", "(open)"), ("interested on?", "False", "False / True"), ("Course", "/curso-b1/unit-42", "/curso-b1/unit-42"), ("Open Ver solución", "yes", "yes")],
    43: [("Who speaks?", "Chris", "Chris / Dana / Eva"), ("Asleep ___ film", "during", "during / while"), ("Lived ___ years", "for three", "for / during"), ("Met ___ travelling", "while", "while / during"), ("Phoned ___ meeting", "during", "during / for"), ("Rang ___ eating", "while", "while / during"), ("Grammar?", "during/for/while", "time trio / since"), ("Find during", "during the film / meeting", "(open)"), ("Find for duration", "for three years", "(open)"), ("Write while…", "Model OK", "(open)"), ("Time words?", "moment, period, meanwhile", "yes / none"), ("Shadow", "done", "(open)"), ("during + clause?", "False", "False / True"), ("Course", "/curso-b1/unit-43", "/curso-b1/unit-43"), ("Open Ver solución", "yes", "yes")],
    44: [("Who speaks?", "Dana", "Dana / Chris / Beth"), ("Lived ___ 2015", "since", "since / for"), ("Known ___ ten years", "for", "for / since"), ("Open ___ 9–5", "from … to", "from-to / since"), ("Ill ___ Monday", "since", "since / for"), ("Not eaten ___ breakfast", "since", "since / for"), ("Grammar?", "for/since/from", "for-since-from / while"), ("Find since", "since 2015 / Monday", "(open)"), ("Find for duration", "for ten years", "(open)"), ("Write from…to…", "Model OK", "(open)"), ("Time expr?", "for ages, so far, until", "yes / none"), ("Shadow", "done", "(open)"), ("for + 2015?", "False", "False / True"), ("Course", "/curso-b1/unit-44", "/curso-b1/unit-44"), ("Open Ver solución", "yes", "yes")],
    45: [("Who speaks?", "Eva", "Eva / Dana / Alex"), ("Depend ___ parents", "on", "on / in"), ("Interested ___ art", "in", "in / on"), ("Asleep ___ film", "during", "during / while"), ("Lived ___ 2015", "since", "since / for"), ("Waited ___ hours", "for two", "for / during"), ("Classify depend on", "verb prep", "verb prep / adj prep"), ("Classify interested in", "adj prep", "adj prep / during"), ("Classify during", "during + noun", "during / since"), ("Classify since", "since + point", "since / for"), ("Write 1× each", "Model OK", "(open)"), ("Shadow", "done", "(open)"), ("Mixed?", "Yes", "Yes / No"), ("Course", "/curso-b1/unit-45", "/curso-b1/unit-45"), ("Open Ver solución", "yes", "yes")],
}

WRITE = {
    41: (["Escribe 3× verb + preposition (depend on, listen to, wait for).", "Completa: I depend ___ my parents.", "Completa: Please listen ___ me.", "Completa: We waited ___ the bus.", "Completa: Look ___ the board.", "Corrige: *I depend of my parents.*", "Corrige: *Listen me.*", "Usa pay for y agree with en 2 frases.", "Escribe: I believe in you.", "Mini-diálogo (4 frases) con verb prep.", "Traduce: Dependo de mis padres.", "Traduce: Mira el tablero.", "Explica depend on vs listen to en 1 frase.", "Escribe 1× talk about.", "Autochequeo: aprende bloques verbo+prep."],
         ["Open three.", "**on**", "**to**", "**for**", "**at**", "depend **on**", "Listen **to** me", "Open.", "OK.", "Open.", "I depend on my parents.", "Look at the board.", "depend on=rely; listen to=hear someone.", "OK.", "Self-check."]),
    42: (["Escribe 3× adj + preposition (interested in, afraid of, good at).", "Completa: interested ___ English.", "Completa: afraid ___ spiders.", "Completa: good ___ maths.", "Completa: proud ___ my son.", "Corrige: *interested on English*", "Corrige: *good in maths*", "Usa worried about y fed up with en 2 frases.", "Escribe: She's afraid of spiders.", "Mini-diario de sentimientos (4 frases).", "Traduce: Estoy interesado en aprender inglés.", "Traduce: Estoy orgulloso de mi hijo.", "Explica interested in vs good at en 1 frase.", "Escribe 1× responsible for.", "Autochequeo: bloque adj+prep completo."],
         ["Open three.", "**in**", "**of**", "**at**", "**of**", "interested **in**", "good **at**", "Open.", "OK.", "Open.", "I'm interested in learning English.", "I'm proud of my son.", "in=topic; at=skill.", "OK.", "Self-check."]),
    43: (["Escribe 2× during + 1× for + 1× while.", "Completa: asleep ___ the film.", "Completa: lived there ___ three years.", "Completa: met her ___ I was travelling.", "Completa: phoned ___ the meeting.", "Corrige: *during I was travelling*", "Corrige: *lived there during three years*", "Usa meanwhile y throughout en 2 frases.", "Escribe: The phone rang while we were eating.", "Mini-historia (4 frases) con during/for/while.", "Traduce: Me quedé dormido durante la película.", "Traduce: Vivimos allí tres años.", "Explica during vs while en 1 frase.", "Escribe 1× for + duration.", "Autochequeo: noun→during; duration→for; clause→while."],
         ["Open four.", "**during**", "**for**", "**while**", "**during**", "**while** I was… / **during** the trip", "**for** three years", "Open.", "OK.", "Open.", "I fell asleep during the film.", "We lived there for three years.", "during+noun; while+clause.", "OK.", "Self-check."]),
    44: (["Escribe 2× since + 2× for + 1× from…to.", "Completa: lived here ___ 2015.", "Completa: known each other ___ ten years.", "Completa: open ___ 9am ___ 5pm.", "Completa: ill ___ Monday.", "Corrige: *lived here for 2015*", "Corrige: *known since ten years*", "Usa for ages y so far en 2 frases.", "Escribe: I haven't eaten since breakfast.", "Mini-diálogo (4 frases) con for/since/from.", "Traduce: Vivo aquí desde 2015.", "Traduce: La tienda abre de 9 a 5.", "Explica for vs since en 1 frase.", "Escribe 1× until.", "Autochequeo: for=duration; since=point; from…to=range."],
         ["Open five.", "**since**", "**for**", "**from** … **to**", "**since**", "**since** 2015", "**for** ten years", "Open.", "OK.", "Open.", "I have lived here since 2015.", "The shop is open from 9am to 5pm.", "for=how long; since=when.", "OK.", "Self-check."]),
    45: (["Una frase: verb prep, adj prep, during, since, for.", "Completa: depend ___ parents.", "Completa: interested ___ art.", "Completa: asleep ___ film.", "Completa: lived ___ 2015.", "Completa: waited ___ two hours.", "Corrige: *depend of*", "Corrige: *interested on art*", "Corrige: *waited during two hours*", "Mini-historia (5 frases) mix U41–44.", "Matching: verb prep / adj prep / during / since / for.", "Traduce: Dependo de mis padres.", "Traduce: Me quedé dormido durante la película.", "Autochequeo con mapa U45.", "Open Ver solución checklist."],
         ["Open one of each.", "**on**", "**in**", "**during**", "**since**", "**for**", "depend **on**", "interested **in**", "waited **for** two hours", "Open mixed.", "OK.", "I depend on my parents.", "I fell asleep during the film.", "Self-check.", "yes."]),
}

READ_Q = {u: rq(u) for u in (41, 42, 43, 44, 45)}


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
        if u < 45 else "3. Siguiente bloque del curso: [Unidad 46](/curso-b1/unit-46)."
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
    for u in (41, 42, 43, 44, 45):
        d = ROOT / f"public/audio/blog/curso-b1/unit-{u}"
        d.mkdir(parents=True, exist_ok=True)
        for name, text in (("reading-workbook", READ[u]), ("listening-workbook", LISTEN[u])):
            path = d / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def main():
    make_audios()
    for u in (41, 42, 43, 44, 45):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path)


if __name__ == "__main__":
    main()
