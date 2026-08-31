#!/usr/bin/env python3
"""Generate B1 Units 51–55 exercise workbooks + TTS."""
from pathlib import Path
from gtts import gTTS

OUT = Path("src/content/blog/curso-b1")
ROOT = Path(__file__).resolve().parents[1]
DATE = "2026-08-31"

LISTEN = {
    51: "Hi, I am Kate. If it rains tomorrow, we'll stay at home. If I had more time, I'd learn another language. If we had left earlier, we would have caught the train. When I finish work, I'll call you. Unless you hurry, you'll miss the bus.",
    52: "Hi, I am Leo. English is spoken all over the world. The report was published yesterday. Applications must be submitted online. She said she would send the email. He asked me if I had finished. The teacher told us to be quiet.",
    53: "Hi, I am Mia. She must be at home — her car is there. It might rain later. He can't be in the office — it's Sunday. You had better see a doctor. I'd rather stay at home tonight. You needn't hurry — we have time.",
    54: "Hi, I am Noah. I have lived here since 2015. She has been studying all morning. When I arrived, they had already left. I visited Paris last year. I'm going to visit my parents this weekend. I think it will rain tomorrow.",
    55: "Hi, I am Olivia. If I had known, I would have told you. The email was sent yesterday. She said she would call back. You needn't worry. I have been working here for five years.",
}

READ = {
    51: "If it rains tomorrow, we'll stay at home. If I had more time, I'd learn another language. If we had left earlier, we would have caught the train. When I finish work, I'll call you. Unless you hurry, you'll miss the bus.",
    52: "English is spoken all over the world. The report was published yesterday. Applications must be submitted online. She said she would send the email. He asked me if I had finished. The teacher told us to be quiet.",
    53: "She must be at home — her car is there. It might rain later. He can't be in the office — it's Sunday. You had better see a doctor. I'd rather stay at home tonight. You needn't hurry — we have time.",
    54: "I have lived here since 2015. She has been studying all morning. When I arrived, they had already left. I visited Paris last year. I'm going to visit my parents this weekend. I think it will rain tomorrow.",
    55: "If I had known, I would have told you. The email was sent yesterday. She said she would call back. You needn't worry. I have been working here for five years.",
}

META = {
    51: dict(slug="unidad-51-review-conditionals", title="Review Conditionals", full="Review: All Conditionals & Mixed Topics", focus="first / second / third conditional + time clauses (U11–15 review)", vocab="mixed topics", image="/blog/curso-b1/unit-51/conditionals-map.png", prev="unidad-50-repaso-46-49-ejercicios-soluciones", next_t="unidad-52-review-passive-reported", r_title="Three conditionals", l_title="Kate on conditionals", kw=["conditionals review B1", "first second third ejercicios", "time clauses English"]),
    52: dict(slug="unidad-52-review-passive-reported", title="Passive & Reported", full="Review: Passive & Reported Speech", focus="passive, modal passive, reported statements/questions/commands (U16–19)", vocab="mixed topics", image="/blog/curso-b1/unit-52/passive-reported-map.png", prev="unidad-51-review-conditionals-ejercicios-soluciones", next_t="unidad-53-review-modals", r_title="News & reports", l_title="Leo on passive/reported", kw=["passive review ejercicios", "reported speech B1", "modal passive English"]),
    53: dict(slug="unidad-53-review-modals", title="Review Modals", full="Review: Modals & Mixed Topics", focus="deduction, had better, would rather, need/needn't (U8, U46–49)", vocab="mixed topics", image="/blog/curso-b1/unit-53/modals-map.png", prev="unidad-52-review-passive-reported-ejercicios-soluciones", next_t="unidad-54-review-tenses", r_title="Advice & deduction", l_title="Mia on modals", kw=["modals review B1", "must might can't ejercicios", "had better would rather"]),
    54: dict(slug="unidad-54-review-tenses", title="Review Tenses", full="Review: Tenses & Mixed Topics", focus="present perfect, PP continuous, past perfect, futures (U2–7 review)", vocab="mixed topics", image="/blog/curso-b1/unit-54/tenses-map.png", prev="unidad-53-review-modals-ejercicios-soluciones", next_t="unidad-55-repaso-51-54", r_title="Time markers", l_title="Noah on tenses", kw=["tenses review B1", "present perfect ejercicios", "past perfect going to"]),
    55: dict(slug="unidad-55-repaso-51-54", title="Repaso 51–54", full="Repaso 51–54: Conditionals, Passive, Modals & Tenses", focus="conditionals, passive/reported, modals, tenses (mix U51–54)", vocab="mixed topics (mix)", image="/blog/curso-b1/unit-55/review-map.png", prev="unidad-54-review-tenses-ejercicios-soluciones", next_t="unidad-51-review-conditionals", r_title="Mixed review", l_title="Olivia's mixed review", kw=["repaso B1 51-54", "conditionals passive modals review", "tenses mixed review"]),
}

GRAM = {
    51: {"a": [("If it ___ tomorrow, we'll stay home.", "rains / will rain / rained", "rains"), ("If I ___ more time, I'd travel.", "had / have / would have", "had"), ("If we ___ earlier, we would have caught the train.", "had left / left / would leave", "had left"), ("When I ___ work, I'll call you.", "finish / will finish / finished", "finish"), ("Unless you ___, you'll miss the bus.", "hurry / will hurry / hurried", "hurry")],
         "b": [("First conditional: if + ___", "present / past / will", "present"), ("Second: if + ___ → would", "past / present / past perfect", "past"), ("Third: if + past perfect → ___", "would have + V3 / would + V / will have", "would have + V3"), ("When/until + time clause: ___", "present / will / past", "present"), ("Unless ≈ ___", "if not / if / when not", "if not")],
         "c": [("*If it will rain, we stay home.*", "If it **rains**, we'll stay home."), ("*If I would have time…*", "If I **had** time…"), ("*If we left earlier, we would catch.* (third)", "If we **had left** earlier, we **would have caught** the train."), ("*When I will finish work…*", "When I **finish** work…"), ("*Unless you will hurry…*", "Unless you **hurry**…")]},
    52: {"a": [("English ___ all over the world.", "is spoken / speaks / is speaking", "is spoken"), ("The report ___ yesterday.", "was published / published / is published", "was published"), ("Applications ___ be submitted online.", "must / must to / must be", "must"), ("She said she ___ send the email.", "would / will / sends", "would"), ("He asked me if I ___ finished.", "had / have / did", "had")],
         "b": [("Passive = be + ___", "past participle / infinitive / -ing", "past participle"), ("Modal passive = modal + ___ + V3", "be / to be / being", "be"), ("Reported statement: said (that) + ___", "backshift / present / infinitive", "backshift"), ("Reported question: asked if + ___", "clause / to / infinitive", "clause"), ("Told + person + ___", "to infinitive / that / -ing", "to infinitive")],
         "c": [("*The report was publish yesterday.*", "The report **was published** yesterday."), ("*Applications must to be submitted.*", "Applications **must be submitted**."), ("*She said she will send.*", "She said she **would** send the email."), ("*He asked me did I finish.*", "He asked me **if I had** finished."), ("*The teacher told us be quiet.*", "The teacher told us **to be** quiet.")]},
    53: {"a": [("She ___ be at home — her car is there.", "must / can / should", "must"), ("It ___ rain later.", "might / must / can't", "might"), ("He ___ be in the office — it's Sunday.", "can't / must / might", "can't"), ("You ___ better see a doctor.", "had / have / would", "had"), ("You ___ hurry.", "needn't / need / must", "needn't")],
         "b": [("must (deduction) ≈ ___", "almost certain / impossible / preference", "almost certain"), ("might ≈ ___", "possible / certain / advice", "possible"), ("had better + ___", "bare infinitive / to inf / -ing", "bare infinitive"), ("would rather + ___", "bare infinitive / to inf / -ing", "bare infinitive"), ("needn't ≈ ___", "no necessity / obligation / deduction", "no necessity")],
         "c": [("*She must to be at home.*", "She **must be** at home."), ("*He can't to be in the office.*", "He **can't be** in the office."), ("*You had better to see a doctor.*", "You **had better see** a doctor."), ("*I'd rather to stay.*", "I'd **rather stay**."), ("*You needn't to hurry.*", "You **needn't hurry**.")]},
    54: {"a": [("I ___ lived here since 2015.", "have / has / am", "have"), ("She ___ been studying all morning.", "has / have / is", "has"), ("When I arrived, they ___ already left.", "had / have / were", "had"), ("I ___ Paris last year.", "visited / have visited / had visited", "visited"), ("I'm ___ to visit my parents.", "going / go / will", "going")],
         "b": [("Present perfect: have/has + ___", "V3 / -ing / infinitive", "V3"), ("PP continuous: have/has been + ___", "-ing / V3 / to", "-ing"), ("Past perfect: had + ___", "V3 / past / -ing", "V3"), ("since + ___ / for + duration", "point in time / duration / both", "point in time / duration"), ("Going to ≈ ___", "plan / regret / passive", "plan")],
         "c": [("*I have live here since 2015.*", "I **have lived** here since 2015."), ("*She has been study all morning.*", "She **has been studying** all morning."), ("*When I arrived, they have left.*", "When I arrived, they **had** already left."), ("*I have visited Paris last year.*", "I **visited** Paris last year."), ("*I'm going visit my parents.*", "I'm **going to visit** my parents.")]},
    55: {"a": [("If I ___ known, I would have told you.", "had / have / would", "had"), ("The email ___ sent yesterday.", "was / is / has been", "was"), ("She said she ___ call back.", "would / will / calls", "would"), ("You ___ worry.", "needn't / need / mustn't", "needn't"), ("I ___ been working here for five years.", "have / has / had", "have")],
         "b": [("If I had known → ___", "third conditional / first / passive", "third conditional"), ("was sent → ___", "passive / modal / conditional", "passive"), ("would call → ___", "reported / conditional / tense", "reported"), ("needn't → ___", "no necessity / deduction / tense", "no necessity"), ("have been working → ___", "PP continuous / past perfect / passive", "PP continuous")],
         "c": [("*If I would have known…*", "If I **had known**…"), ("*The email is sent yesterday.*", "The email **was sent** yesterday."), ("*She said she will call.*", "She said she **would** call back."), ("*You needn't to worry.*", "You **needn't worry**."), ("*I have working here for five years.*", "I **have been working** here for five years.")]},
}

VOCAB = {
    51: {"a": [("travel", "viajar · work · health", "viajar"), ("weather", "clima · culture · money", "clima"), ("unless", "a menos que · until · when", "a menos que"), ("regret", "arrepentimiento · plan · evidence", "arrepentimiento"), ("hypothesis", "hipótesis · report · duration", "hipótesis")],
         "b": [("first conditional ≈ ___", "futuro probable / pasado irreal / pasiva", "futuro probable"), ("second conditional ≈ ___", "hipótesis presente / hecho pasado / reported", "hipótesis presente"), ("third conditional ≈ ___", "pasado irreal / futuro / modal passive", "pasado irreal"), ("when + present ≈ ___", "time clause / passive / third", "time clause"), ("unless ≈ ___", "if not / if / when", "if not")]},
    52: {"a": [("report", "informe · message · policy", "informe"), ("publish", "publicar · announce · inform", "publicar"), ("submit", "presentar · attach / reply", "presentar"), ("statement", "declaración · question · command", "declaración"), ("backshift", "retroceso temporal · passive · modal", "retroceso temporal")],
         "b": [("passive ≈ ___", "be + V3 / have + V3 / modal + V", "be + V3"), ("modal passive ≈ ___", "must be done / must done / must to do", "must be done"), ("said (that) ≈ ___", "reported statement / question / command", "reported statement"), ("asked if ≈ ___", "reported yes/no question / statement / passive", "reported yes/no question"), ("told to ≈ ___", "reported command / question / passive", "reported command")]},
    53: {"a": [("deduction", "deducción · preference · necessity", "deducción"), ("advice", "consejo · guess · obligation", "consejo"), ("preference", "preferencia · certainty · permission", "preferencia"), ("necessity", "necesidad · possibility · report", "necesidad"), ("certainty", "certeza · guess · option", "certeza")],
         "b": [("must (deduction) ≈ ___", "casi seguro / imposible / preferencia", "casi seguro"), ("might ≈ ___", "posible / seguro / consejo", "posible"), ("had better ≈ ___", "consejo fuerte / deducción / pasiva", "consejo fuerte"), ("would rather ≈ ___", "preferencia / obligación / tiempo", "preferencia"), ("needn't ≈ ___", "no necesitas / debes / deduces", "no necesitas")]},
    54: {"a": [("since", "desde · for · ago", "desde"), ("for", "durante · since · yet", "durante"), ("already", "ya · yet · just", "ya"), ("recently", "recientemente · ever · never", "recientemente"), ("duration", "duración · sequence · report", "duración")],
         "b": [("present perfect ≈ ___", "conexión con ahora / momento cerrado / pasiva", "conexión con ahora"), ("past simple ≈ ___", "momento cerrado / since / have been", "momento cerrado"), ("past perfect ≈ ___", "acción anterior en pasado / futuro / modal", "acción anterior en pasado"), ("going to ≈ ___", "plan / regret / reported", "plan"), ("will ≈ ___", "predicción/decisión / pasado perfecto / passive only", "predicción/decisión")]},
    55: {"a": [("conditionals / passive / modals / tenses", "repaso mix · wrong · single", "repaso mix"), ("third conditional", "pasado irreal · passive · PP", "pasado irreal"), ("reported speech", "estilo indirecto · first cond · going to", "estilo indirecto"), ("needn't", "no necesidad · must deduction · was sent", "no necesidad"), ("have been working", "PP continuous · had left · would have", "PP continuous")],
         "b": [("If I had known → ___", "third / first / passive", "third"), ("was sent → ___", "passive / conditional / modal", "passive"), ("would call → ___", "reported / second / PP", "reported"), ("needn't → ___", "no necessity / advice / tense", "no necessity"), ("have been working → ___", "PP continuous / past perfect / passive", "PP continuous")]},
}

def rq(u):
    bases = {
        51: [("If it ___ tomorrow?", "rains", "rains / will rain"), ("If I ___ time?", "had", "had / have"), ("If we ___ earlier?", "had left", "had left / left"), ("When I ___ work?", "finish", "finish / will finish"), ("Unless you ___?", "hurry", "hurry / will hurry"), ("Main grammar?", "conditionals", "conditionals / passive"), ("Find first conditional", "If it rains we'll stay", "(open)"), ("Find third conditional", "If we had left we would have caught", "(open)"), ("Find time clause", "When I finish work", "(open)"), ("Write one of each type", "Model OK", "(open)"), ("Mixed topics vocab?", "travel, weather, health", "yes / none"), ("will in if-clause OK?", "False", "False / True"), ("Course", "/curso-b1/unit-51", "/curso-b1/unit-51"), ("unless = if not?", "True", "True / False"), ("Open Ver solución", "yes", "yes")],
        52: [("English ___ spoken?", "is", "is / was"), ("Report ___ yesterday?", "was published", "was published / published"), ("Must ___ submitted?", "be", "be / to be"), ("She said she ___ send?", "would", "would / will"), ("Asked if I ___ finished?", "had", "had / have"), ("Main grammar?", "passive/reported", "passive / conditional"), ("Find passive", "is spoken / was published", "(open)"), ("Find reported statement", "said she would send", "(open)"), ("Find reported question", "asked if I had finished", "(open)"), ("Write passive + reported", "Model OK", "(open)"), ("Mixed vocab?", "report, publish, submit", "yes / none"), ("must be + V3?", "True", "True / False"), ("Course", "/curso-b1/unit-52", "/curso-b1/unit-52"), ("told + to?", "True", "True / False"), ("Open Ver solución", "yes", "yes")],
        53: [("She ___ be home?", "must", "must / might"), ("It ___ rain?", "might", "might / must"), ("He ___ be in office?", "can't", "can't / must"), ("___ better see doctor?", "had", "had / have"), ("___ hurry?", "needn't", "needn't / need"), ("Main grammar?", "modals", "modals / tenses"), ("Find must deduction", "must be at home", "(open)"), ("Find had better", "had better see a doctor", "(open)"), ("Find would rather", "rather stay at home", "(open)"), ("Write 1× each modal type", "Model OK", "(open)"), ("Modal vocab?", "deduction, advice, preference", "yes / none"), ("needn't + to OK?", "False", "False / True"), ("Course", "/curso-b1/unit-53", "/curso-b1/unit-53"), ("had better + to?", "False", "False / True"), ("Open Ver solución", "yes", "yes")],
        54: [("___ lived since 2015?", "have", "have / has"), ("___ been studying?", "has", "has / have"), ("They ___ already left?", "had", "had / have"), ("___ Paris last year?", "visited", "visited / have visited"), ("___ going to visit?", "going", "going / go"), ("Main grammar?", "tenses", "tenses / modals"), ("Find present perfect", "have lived since 2015", "(open)"), ("Find PP continuous", "has been studying", "(open)"), ("Find past perfect", "had already left", "(open)"), ("Write PP + going to", "Model OK", "(open)"), ("Time vocab?", "since, for, already", "yes / none"), ("since + point in time?", "True", "True / False"), ("Course", "/curso-b1/unit-54", "/curso-b1/unit-54"), ("last year → past simple?", "True", "True / False"), ("Open Ver solución", "yes", "yes")],
        55: [("If I ___ known?", "had", "had / have"), ("Email ___ sent?", "was", "was / is"), ("She said she ___ call?", "would", "would / will"), ("___ worry?", "needn't", "needn't / must"), ("___ been working five years?", "have", "have / has"), ("Classify conditional", "third", "third / passive"), ("Classify passive", "passive", "passive / modal"), ("Classify reported", "reported", "reported / tense"), ("Classify needn't", "no necessity", "no necessity / deduction"), ("Classify PP continuous", "tense", "tense / conditional"), ("Write 1× each area", "Model OK", "(open)"), ("Mixed U51-54?", "Yes", "Yes / No"), ("Course", "/curso-b1/unit-55", "/curso-b1/unit-55"), ("Module 6 first half?", "Yes", "Yes / No"), ("Open Ver solución", "yes", "yes")],
    }
    return bases[u]

LISTEN_Q = {
    51: [("Who speaks?", "Kate", "Kate / Leo / Olivia"), ("If it ___ tomorrow", "rains", "rains / will rain"), ("If I ___ time", "had", "had / have"), ("If we ___ earlier", "had left", "had left / left"), ("When I ___ work", "finish", "finish / will finish"), ("Main grammar?", "conditionals", "conditionals / passive"), ("Find third conditional", "If we had left we would have caught", "(open)"), ("Find unless", "Unless you hurry", "(open)"), ("Write first conditional", "Model OK", "(open)"), ("Mixed topics?", "travel, weather", "yes / none"), ("Shadow", "done", "(open)"), ("will in if-clause?", "False", "False / True"), ("Course", "/curso-b1/unit-51", "/curso-b1/unit-51"), ("time clause + present?", "True", "True / False"), ("Open Ver solución", "yes", "yes")],
    52: [("Who speaks?", "Leo", "Leo / Kate / Noah"), ("English ___ spoken", "is", "is / was"), ("Report ___ yesterday", "was published", "was published / published"), ("Must ___ submitted", "be", "be / to be"), ("She said she ___ send", "would", "would / will"), ("Main grammar?", "passive/reported", "passive / modals"), ("Find passive", "is spoken / was published", "(open)"), ("Find reported statement", "said she would send", "(open)"), ("Find told to", "told us to be quiet", "(open)"), ("Write one passive", "Model OK", "(open)"), ("Mixed vocab?", "report, submit", "yes / none"), ("Shadow", "done", "(open)"), ("backshift?", "True", "True / False"), ("Course", "/curso-b1/unit-52", "/curso-b1/unit-52"), ("modal passive", "yes", "yes / no"), ("Open Ver solución", "yes", "yes")],
    53: [("Who speaks?", "Mia", "Mia / Iris / Gina"), ("She ___ be home", "must", "must / might"), ("It ___ rain", "might", "might / must"), ("He ___ be in office", "can't", "can't / must"), ("___ better doctor", "had", "had / have"), ("Main grammar?", "modals", "modals / tenses"), ("Find must", "must be at home", "(open)"), ("Find had better", "had better see a doctor", "(open)"), ("Find needn't", "needn't hurry", "(open)"), ("Write would rather", "Model OK", "(open)"), ("Modal vocab?", "deduction, advice", "yes / none"), ("Shadow", "done", "(open)"), ("needn't + to?", "False", "False / True"), ("Course", "/curso-b1/unit-53", "/curso-b1/unit-53"), ("would rather + to?", "False", "False / True"), ("Open Ver solución", "yes", "yes")],
    54: [("Who speaks?", "Noah", "Noah / Jack / Hugo"), ("___ lived since 2015", "have", "have / has"), ("___ been studying", "has", "has / have"), ("They ___ left", "had", "had / have"), ("___ Paris last year", "visited", "visited / have visited"), ("Main grammar?", "tenses", "tenses / modals"), ("Find present perfect", "have lived since 2015", "(open)"), ("Find PP continuous", "has been studying", "(open)"), ("Find going to", "going to visit my parents", "(open)"), ("Write past perfect", "Model OK", "(open)"), ("Time words?", "since, for, already", "yes / none"), ("Shadow", "done", "(open)"), ("since + duration?", "False (point)", "False / True"), ("Course", "/curso-b1/unit-54", "/curso-b1/unit-54"), ("will = prediction?", "yes", "yes / no"), ("Open Ver solución", "yes", "yes")],
    55: [("Who speaks?", "Olivia", "Olivia / Kate / Mia"), ("If I ___ known", "had", "had / have"), ("Email ___ sent", "was", "was / is"), ("She said she ___ call", "would", "would / will"), ("___ worry", "needn't", "needn't / must"), ("Classify conditional", "third", "third / passive"), ("Classify passive", "passive", "passive / modal"), ("Classify reported", "reported", "reported / tense"), ("Classify needn't", "no necessity", "no necessity / deduction"), ("Write 1× each", "Model OK", "(open)"), ("Shadow", "done", "(open)"), ("Mixed U51-54?", "Yes", "Yes / No"), ("Course", "/curso-b1/unit-55", "/curso-b1/unit-55"), ("Module 6 U51-55?", "Yes", "Yes / No"), ("Open Ver solución", "yes", "yes")],
}

WRITE = {
    51: (["Escribe 1× first, second, third y time clause.", "Completa: If it ___ tomorrow, we'll stay home.", "Completa: If I ___ more time, I'd travel.", "Completa: If we ___ earlier, we would have caught the train.", "Completa: When I ___ work, I'll call you.", "Corrige: *If it will rain, we stay home.*", "Corrige: *If I would have time…*", "Usa unless en 2 frases.", "Escribe: If we had left earlier, we would have caught the train.", "Mini-historia (4 frases) con 3 condicionales.", "Traduce: Si llueve mañana, nos quedaremos en casa.", "Traduce: Si hubiéramos salido antes, habríamos cogido el tren.", "Explica first vs third en 1 frase.", "Escribe 1× unless.", "Autochequeo: no will en if-clause."],
         ["Open four.", "**rains**", "**had**", "**had left**", "**finish**", "If it **rains**, we'll stay home.", "If I **had** time…", "Open.", "OK.", "Open.", "If it rains tomorrow, we'll stay at home.", "If we had left earlier, we would have caught the train.", "First=probable future; third=past regret.", "OK.", "Self-check."]),
    52: (["Escribe 2× passive + 2× reported.", "Completa: English ___ spoken here.", "Completa: The report ___ published yesterday.", "Completa: Applications ___ be submitted.", "Completa: She said she ___ send the email.", "Completa: He asked if I ___ finished.", "Corrige: *must to be submitted*", "Corrige: *She said she will send.*", "Usa told to en 2 frases.", "Escribe: The teacher told us to be quiet.", "Mini-diálogo (4 frases) passive/reported.", "Traduce: El informe se publicó ayer.", "Traduce: Me preguntó si había terminado.", "Explica backshift en 1 frase.", "Escribe 1× modal passive.", "Autochequeo: passive = be + V3."],
         ["Open four.", "**is**", "**was**", "**must**", "**would**", "**had**", "must **be submitted**", "she **would** send", "Open.", "OK.", "Open.", "The report was published yesterday.", "He asked me if I had finished.", "Past intro verb → backshift tenses.", "OK.", "Self-check."]),
    53: (["Escribe must/might/can't + had better + would rather + needn't.", "Completa: She ___ be at home.", "Completa: It ___ rain later.", "Completa: He ___ be in the office.", "Completa: You ___ better see a doctor.", "Completa: I'd ___ stay at home.", "Corrige: *You had better to see a doctor.*", "Corrige: *You needn't to hurry.*", "Usa might y can't en 2 frases.", "Escribe: You needn't hurry.", "Mini-diálogo (4 frases) con modales.", "Traduce: Debe estar en casa.", "Traduce: Preferiría quedarme en casa.", "Explica must (deduction) vs must (obligation).", "Escribe 1× would rather you didn't.", "Autochequeo: had better/rather sin to."],
         ["Open five.", "**must**", "**might**", "**can't**", "**had**", "**rather**", "had better **see**", "needn't **hurry**", "Open.", "OK.", "Open.", "She must be at home.", "I'd rather stay at home.", "Deduction=casi seguro; obligation=debes hacer.", "OK.", "Self-check."]),
    54: (["Escribe PP, PP continuous, past perfect, going to.", "Completa: I ___ lived here since 2015.", "Completa: She ___ been studying.", "Completa: When I arrived, they ___ left.", "Completa: I ___ Paris last year.", "Completa: I'm ___ to visit my parents.", "Corrige: *I have visited Paris last year.*", "Corrige: *She has been study all morning.*", "Usa since y for en 2 frases.", "Escribe: When I arrived, they had already left.", "Mini-historia (4 frases) con tiempos distintos.", "Traduce: Vivo aquí desde 2015.", "Traduce: Voy a visitar a mis padres.", "Explica since vs for.", "Escribe 1× will (prediction).", "Autochequeo: last year → past simple."],
         ["Open four.", "**have**", "**has**", "**had**", "**visited**", "**going**", "I **visited** Paris last year.", "has been **studying**", "Open.", "OK.", "Open.", "I have lived here since 2015.", "I'm going to visit my parents.", "since=point; for=duration.", "OK.", "Self-check."]),
    55: (["Una frase: conditional, passive, reported, modal, tense.", "Completa: If I ___ known, I would have told you.", "Completa: The email ___ sent yesterday.", "Completa: She said she ___ call back.", "Completa: You ___ worry.", "Completa: I ___ been working here for five years.", "Corrige: *If I would have known…*", "Corrige: *You needn't to worry.*", "Corrige: *I have working here for five years.*", "Mini-historia (5 frases) mix U51–54.", "Matching: conditional / passive / modal / tense.", "Traduce: Si lo hubiera sabido, te lo habría dicho.", "Traduce: No necesitas preocuparte.", "Autochequeo con mapa U55.", "Open Ver solución checklist."],
         ["Open one of each.", "**had**", "**was**", "**would**", "**needn't**", "**have**", "If I **had known**…", "You **needn't worry**.", "I **have been working** here for five years.", "Open mixed.", "OK.", "If I had known, I would have told you.", "You needn't worry.", "Self-check.", "yes."]),
}

READ_Q = {u: rq(u) for u in (51, 52, 53, 54, 55)}


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
        if u < 55 else "3. Módulo 6 primera mitad (U51–55) completa — siguiente bloque: [Unidad 56](/curso-b1/unit-56)."
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
    for u in (51, 52, 53, 54, 55):
        d = ROOT / f"public/audio/blog/curso-b1/unit-{u}"
        d.mkdir(parents=True, exist_ok=True)
        for name, text in (("reading-workbook", READ[u]), ("listening-workbook", LISTEN[u])):
            path = d / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def main():
    make_audios()
    for u in (51, 52, 53, 54, 55):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path)


if __name__ == "__main__":
    main()
