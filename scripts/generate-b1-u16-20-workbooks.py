#!/usr/bin/env python3
"""Generate B1 Units 16–20 exercise workbooks (ejercicios-soluciones)."""
from pathlib import Path

OUT = Path("src/content/blog/curso-b1")
DATE = "2026-08-31"

LISTEN = {
    16: "Hi, I am Nora. The app is installed on my phone. Emails are sent automatically every morning. The laptop was repaired last week. The files were deleted by mistake yesterday. The website was designed by a professional team. Passwords are changed regularly for security.",
    17: "Hi, I am Omar. The form must be completed before the interview. The report should be sent today. The meeting can be postponed until Monday. The interview might be cancelled. The contract must be signed by Friday. Applications must be submitted before the deadline.",
    18: "Hi, I am Pia. She said she was busy. They said they would call me later. He said she had left the office. Sara told me she could help with the email. Tom said he would send the file that night. My manager told me the meeting was cancelled.",
    19: "Hi, I am Quinn. He asked where I lived. She asked if I was ready for the test. The teacher told me to open the file. He told me not to be late. She asked how we pronounce that word. They told us to translate the paragraph.",
    20: "Hi, I am Rita. The app is updated every week. The form must be completed online. Maya said she was busy. The teacher asked if we had practised. They told us to practise more. Files were uploaded to the cloud yesterday.",
}

READ = {
    16: "Millions of photos are uploaded to the internet every day. New software was installed on my computer yesterday. Passwords are changed regularly for safety. The data were stored in the cloud last month. The device is manufactured in China and the Wi-Fi is connected to all devices in the office. The website was designed by a professional team.",
    17: "Applications must be submitted before the deadline. The contract should be signed by Friday. Meetings can be held online with colleagues. The salary might be increased next year. Work experience should be included in your resume. The client must be informed about the delay. The interview might be postponed until Monday.",
    18: "Tom said he would send the email that night. Sara said she had attached the file. My manager told me the meeting was cancelled. They said they could reply in the morning. He said the message had already been forwarded to the client. Pia said she was busy but she could help later.",
    19: "The teacher asked if we had practised at home. She told us to translate the paragraph. He asked how we pronounce that word. They told us not to worry about mistakes. The tutor asked whether we understood the grammar. She asked where we studied English.",
    20: "The app is updated every week and the password must be changed regularly. Maya said she was busy but she told me she could help later. The teacher asked if we had practised and told us not to worry about mistakes. Files were uploaded to the cloud yesterday. The report should be sent before the meeting.",
}

META = {
    16: dict(
        slug="unidad-16-passive-voice-technology",
        title="Passive Voice & Technology",
        full="Passive Voice & Technology",
        focus="passive voice present & past (is/are/was/were + past participle)",
        vocab="technology",
        image="/blog/curso-b1/unit-16/passive-voice.png",
        prev="unidad-15-repaso-11-14-ejercicios-soluciones",
        next_t="unidad-17-modal-passive-work",
        r_title="Tech in daily life",
        l_title="Nora's devices",
        kw=["passive voice ejercicios", "voz pasiva ejercicios B1", "technology vocabulary ejercicios"],
    ),
    17: dict(
        slug="unidad-17-modal-passive-work",
        title="Modal Passive & Work",
        full="Modal Passive & Work & Jobs",
        focus="modal passive (must/should/can/might be + past participle)",
        vocab="work & jobs",
        image="/blog/curso-b1/unit-17/modal-passive.png",
        prev="unidad-16-passive-voice-technology-ejercicios-soluciones",
        next_t="unidad-18-reported-speech-statements",
        r_title="Office deadlines",
        l_title="Omar at work",
        kw=["modal passive ejercicios", "must be done", "work jobs vocabulary ejercicios"],
    ),
    18: dict(
        slug="unidad-18-reported-speech-statements",
        title="Reported Speech Statements",
        full="Reported Speech (Statements) & Communication",
        focus="reported speech statements (said/told + backshift)",
        vocab="communication",
        image="/blog/curso-b1/unit-18/reported-statements.png",
        prev="unidad-17-modal-passive-work-ejercicios-soluciones",
        next_t="unidad-19-reported-speech-questions",
        r_title="Office messages",
        l_title="Pia's reports",
        kw=["reported speech ejercicios", "said told backshift", "communication vocabulary ejercicios"],
    ),
    19: dict(
        slug="unidad-19-reported-speech-questions",
        title="Reported Questions & Commands",
        full="Reported Speech (Questions & Commands) & Language",
        focus="reported questions (asked if/wh-) and commands (told to / not to)",
        vocab="language learning",
        image="/blog/curso-b1/unit-19/reported-questions.png",
        prev="unidad-18-reported-speech-statements-ejercicios-soluciones",
        next_t="unidad-20-repaso-16-19",
        r_title="In the language class",
        l_title="Quinn's class",
        kw=["reported questions ejercicios", "told to infinitive", "language vocabulary ejercicios"],
    ),
    20: dict(
        slug="unidad-20-repaso-16-19",
        title="Repaso 16–19",
        full="Repaso 16–19: Passive & Reported Speech",
        focus="passive, modal passive y reported speech (statements, questions, commands)",
        vocab="technology, work, communication, language (mix)",
        image="/blog/curso-b1/unit-20/review-map.png",
        prev="unidad-19-reported-speech-questions-ejercicios-soluciones",
        next_t="unidad-16-passive-voice-technology",
        r_title="Mixed review paragraph",
        l_title="Rita's mixed review",
        kw=["repaso passive reported B1", "passive reported speech ejercicios", "estilo indirecto repaso"],
    ),
}

GRAM = {
    16: {
        "a": [
            ("Emails ___ sent automatically.", "are / is / was", "are"),
            ("The laptop ___ repaired last week.", "was / were / is", "was"),
            ("The files ___ deleted yesterday.", "were / was / are", "were"),
            ("The device ___ manufactured in China.", "is / are / were", "is"),
            ("Passwords ___ changed regularly.", "are / is / was", "are"),
        ],
        "b": [
            ("The website ___ designed by a team.", "was / were / are", "was"),
            ("Wi-Fi ___ connected to all devices.", "is / are / were", "is"),
            ("The data ___ stored in the cloud last month.", "were / was / is", "were"),
            ("Updates ___ downloaded every week.", "are / is / was", "are"),
            ("The system ___ tested before the launch.", "was / were / are", "was"),
        ],
        "c": [
            ("*Someone installs the app.* → The app ___ ___.", "The app **is installed**."),
            ("*They deleted the files.* → The files ___ ___.", "The files **were deleted**."),
            ("*The emails is sent daily.*", "The emails **are** sent daily."),
            ("*The laptop were repaired.*", "The laptop **was** repaired."),
            ("*It designed by a team.*", "It **was designed** by a team."),
        ],
    },
    17: {
        "a": [
            ("The form ___ be completed.", "must / should / can", "must"),
            ("The report ___ be sent today.", "should / must / can", "should"),
            ("The meeting ___ be postponed.", "can / must / should", "can"),
            ("The interview ___ be cancelled.", "might / must / should", "might"),
            ("The contract ___ be signed by Friday.", "must / can / might", "must"),
        ],
        "b": [
            ("Applications must ___ submitted before the deadline.", "be / being / been", "be"),
            ("Meetings can ___ held online.", "be / being / been", "be"),
            ("The salary might ___ increased next year.", "be / being / been", "be"),
            ("Work experience should ___ included in your resume.", "be / being / been", "be"),
            ("The client must ___ informed about the delay.", "be / being / been", "be"),
        ],
        "c": [
            ("*Must to be finished.*", "It **must be** finished."),
            ("*The form must completed.*", "The form must **be** completed."),
            ("*Should be send today.*", "Should be **sent** today."),
            ("*Can be postpone.*", "Can be **postponed**."),
            ("*Might being cancelled.*", "Might **be** cancelled."),
        ],
    },
    18: {
        "a": [
            ('"I am busy." → She said she ___ busy.', "was / is / were", "was"),
            ('"We will call." → They said they ___ call.', "would / will / can", "would"),
            ('"She has left." → He said she ___ left.', "had / has / have", "had"),
            ('"I can help." → She told me she ___ help.', "could / can / would", "could"),
            ('"I will send it." → Tom said he ___ send it.', "would / will / can", "would"),
        ],
        "b": [
            ("She ___ me the meeting was cancelled.", "told / said / asked", "told"),
            ("They ___ they could reply in the morning.", "said / told / asked", "said"),
            ("Sara said she ___ attached the file.", "had / has / have", "had"),
            ("He said the message ___ already been forwarded.", "had / has / have", "had"),
            ("Pia said she ___ busy.", "was / is / were", "was"),
        ],
        "c": [
            ("*She said me she was tired.*", "She **told** me she was tired. / She **said** (that)…"),
            ("*They said they will call.*", "They said they **would** call."),
            ("*He said she has left.* (backshift)", "He said she **had** left."),
            ("*She told that she was busy.*", "She told **me** (that) she was busy. / She **said**…"),
            ("*Tom said he can help.* (backshift)", "Tom said he **could** help."),
        ],
    },
    19: {
        "a": [
            ('"Are you ready?" → She asked ___ I was ready.', "if / where / to", "if"),
            ('"Where do you live?" → He asked where I ___.', "lived / live / living", "lived"),
            ('"Open the file." → She told me ___ open the file.', "to / not to / if", "to"),
            ('"Don\'t be late." → He told me ___ ___ be late.', "not to / to not / if", "not to"),
            ('"How do you pronounce it?" → He asked how we ___ it.', "pronounce / pronounced / pronouncing", "pronounce"),
        ],
        "b": [
            ("They told us ___ translate the paragraph.", "to / if / not", "to"),
            ("She asked ___ we had practised.", "if / to / where", "if"),
            ("The tutor asked ___ we understood.", "whether / to / not to", "whether"),
            ("He asked ___ we studied English.", "where / to / if", "where"),
            ("They told us ___ worry about mistakes.", "not to / to / if", "not to"),
        ],
        "c": [
            ("*He asked where did I live.*", "He asked where I **lived**."),
            ("*She asked if was I ready.*", "She asked if I **was** ready."),
            ("*She told me open the file.*", "She told me **to** open the file."),
            ("*He told me to not be late.*", "He told me **not to** be late."),
            ("*They told us don't worry.*", "They told us **not to** worry."),
        ],
    },
    20: {
        "a": [
            ("The app ___ updated every week.", "is / was / must", "is"),
            ("The form ___ be completed.", "must / said / asked", "must"),
            ("She said she ___ busy.", "was / is / be", "was"),
            ("He asked ___ I was ready.", "if / to / was", "if"),
            ("They told us ___ practise.", "to / if / not", "to"),
        ],
        "b": [
            ("Files ___ uploaded yesterday.", "were / was / are", "were"),
            ("The report ___ be sent today.", "should / said / asked", "should"),
            ("Maya told me she ___ help.", "could / can / will", "could"),
            ("The teacher asked if we ___ practised.", "had / have / has", "had"),
            ("They told us ___ worry.", "not to / to / if", "not to"),
        ],
        "c": [
            ("*She said me she was tired.*", "She **told** me… / She **said**…"),
            ("*Must to be finished.*", "**Must be** finished."),
            ("*He asked where did I live.*", "He asked where I **lived**."),
            ("*The emails is sent.*", "The emails **are** sent."),
            ("*Told us don't worry.*", "Told us **not to** worry."),
        ],
    },
}

VOCAB = {
    16: {
        "a": [
            ("upload", "subir · descargar · borrar", "subir"),
            ("cloud", "nube · pantalla · salario", "nube"),
            ("password", "contraseña · contrato · acento", "contraseña"),
            ("device", "dispositivo · entrevista · mensaje", "dispositivo"),
            ("software", "software · compañero · gramática", "software"),
        ],
        "b": [
            ("app ≈ ___", "aplicación / reunión / traducción", "aplicación"),
            ("download ≈ ___", "descargar / firmar / preguntar", "descargar"),
            ("update ≈ ___", "actualizar / posponer / traducir", "actualizar"),
            ("Wi-Fi ≈ ___", "Wi-Fi / CV / spoilers", "Wi-Fi"),
            ("file ≈ ___", "archivo / deadline / accent", "archivo"),
        ],
    },
    17: {
        "a": [
            ("deadline", "fecha límite · nube · acento", "fecha límite"),
            ("colleague", "compañero · dispositivo · mensaje", "compañero"),
            ("interview", "entrevista · upload · grammar", "entrevista"),
            ("salary", "salario · password · translate", "salario"),
            ("resume", "CV · cloud · spoiler", "CV"),
        ],
        "b": [
            ("contract ≈ ___", "contrato / archivo / acento", "contrato"),
            ("promotion ≈ ___", "ascenso / download / phrase", "ascenso"),
            ("client ≈ ___", "cliente / Wi-Fi / binge", "cliente"),
            ("meeting ≈ ___", "reunión / storm / gig", "reunión"),
            ("application ≈ ___", "solicitud / thunder / forecast", "solicitud"),
        ],
    },
    18: {
        "a": [
            ("attach", "adjuntar · firmar · traducir", "adjuntar"),
            ("reply", "responder · instalar · posponer", "responder"),
            ("forward", "reenviar · reparar · pronunciar", "reenviar"),
            ("inbox", "bandeja de entrada · CV · storm", "bandeja de entrada"),
            ("subject", "asunto · salario · device", "asunto"),
        ],
        "b": [
            ("email ≈ ___", "correo / deadline / accent", "correo"),
            ("message ≈ ___", "mensaje / password / hail", "mensaje"),
            ("chat ≈ ___", "chat / contract / drizzle", "chat"),
            ("notify ≈ ___", "notificar / manufacture / binge", "notificar"),
            ("share ≈ ___", "compartir / postpone / regret", "compartir"),
        ],
    },
    19: {
        "a": [
            ("translate", "traducir · adjuntar · instalar", "traducir"),
            ("pronounce", "pronunciar · firmar · reenviar", "pronunciar"),
            ("grammar", "gramática · salario · cloud", "gramática"),
            ("fluent", "fluido · deadline · Wi-Fi", "fluido"),
            ("mistake", "error · contrato · upload", "error"),
        ],
        "b": [
            ("vocabulary ≈ ___", "vocabulario / password / client", "vocabulario"),
            ("accent ≈ ___", "acento / inbox / promotion", "acento"),
            ("phrase ≈ ___", "frase / device / meeting", "frase"),
            ("explain ≈ ___", "explicar / download / attach", "explicar"),
            ("repeat ≈ ___", "repetir / forward / submit", "repetir"),
        ],
    },
    20: {
        "a": [
            ("passive", "voz pasiva · first conditional · second", "voz pasiva"),
            ("backshift", "cambio de tiempo · upload · salary", "cambio de tiempo"),
            ("deadline", "fecha límite · accent · spoiler", "fecha límite"),
            ("attach", "adjuntar · translate · repair", "adjuntar"),
            ("pronounce", "pronunciar · install · forward", "pronunciar"),
        ],
        "b": [
            ("must be + V3 = ___", "modal passive / first conditional / wish", "modal passive"),
            ("said/told = ___", "reported statement / passive past / weather", "reported statement"),
            ("asked if = ___", "reported question / third conditional / upload", "reported question"),
            ("told to = ___", "command / forecast / salary", "command"),
            ("is/are + V3 = ___", "present passive / second / gig", "present passive"),
        ],
    },
}

READ_Q = {
    16: [
        ("Photos are ___ every day", "uploaded", "uploaded / deleted / ignored"),
        ("Software was ___ yesterday", "installed", "installed / cancelled / postponed"),
        ("Passwords are changed for ___", "safety", "safety / fun / style"),
        ("Data stored where?", "in the cloud", "cloud / desk / fridge"),
        ("Device manufactured in ___", "China", "China / Spain / Mars"),
        ("Wi-Fi connected to ___", "all devices", "all devices / one phone"),
        ("Website designed by ___", "a professional team", "team / nobody / robots only"),
        ("Main grammar?", "passive", "passive / second / third"),
        ("Find present passive", "are uploaded / are changed / is manufactured…", "(open)"),
        ("Find past passive", "was installed / were stored / was designed", "(open)"),
        ("Underline by + agent", "by a professional team", "(open)"),
        ("Write one is/are + V3", "Model OK", "(open)"),
        ("Tech vocab in text?", "software, cloud, passwords, Wi-Fi", "yes / none"),
        ("Active focus?", "False (passive)", "False / True"),
        ("Course link", "/curso-b1/unit-16", "/curso-b1/unit-16"),
    ],
    17: [
        ("Applications must be ___", "submitted", "submitted / deleted / ignored"),
        ("Before the ___", "deadline", "deadline / weekend / party"),
        ("Contract should be ___", "signed", "signed / cancelled / eaten"),
        ("Meetings can be ___ online", "held", "held / deleted / uploaded"),
        ("Salary might be ___", "increased", "increased / forgotten / translated"),
        ("Resume should include ___", "work experience", "work experience / passwords"),
        ("Client must be ___", "informed", "informed / ignored / deleted"),
        ("Interview might be ___", "postponed", "postponed / uploaded / translated"),
        ("Main grammar?", "modal passive", "modal passive / first / third"),
        ("Find must be", "must be submitted / informed", "(open)"),
        ("Find should be", "should be signed / included", "(open)"),
        ("Write one can be + V3", "Model OK", "(open)"),
        ("Work vocab?", "deadline, contract, resume, client", "yes / none"),
        ("Must to be?", "False", "False / True"),
        ("Course link", "/curso-b1/unit-17", "/curso-b1/unit-17"),
    ],
    18: [
        ("Tom said he would ___", "send the email", "send email / delete app"),
        ("Sara said she had ___", "attached the file", "attached / translated"),
        ("Manager told me ___", "meeting was cancelled", "cancelled / sunny"),
        ("They said they could ___", "reply in the morning", "reply / swim"),
        ("Message had been ___", "forwarded", "forwarded / manufactured"),
        ("Pia said she was ___", "busy", "busy / rainy / fluent"),
        ("said or told + person?", "told me", "told me / said me"),
        ("Main grammar?", "reported statements", "reported / third / weather"),
        ("Find would (backshift)", "would send", "(open)"),
        ("Find had (backshift)", "had attached / had been forwarded", "(open)"),
        ("Write one She said…", "Model OK", "(open)"),
        ("Comm vocab?", "email, attach, reply, forward", "yes / none"),
        ("will stays will?", "False (→ would)", "False / True"),
        ("Course link", "/curso-b1/unit-18", "/curso-b1/unit-18"),
        ("Ending?", "help later", "help later / empty"),
    ],
    19: [
        ("Teacher asked if we had ___", "practised", "practised / uploaded / signed"),
        ("Told us to ___", "translate the paragraph", "translate / delete"),
        ("Asked how we ___", "pronounce that word", "pronounce / manufacture"),
        ("Told us not to ___", "worry about mistakes", "worry / reply"),
        ("Asked whether we ___", "understood the grammar", "understood / uploaded"),
        ("Asked where we ___", "studied English", "studied / repaired"),
        ("Yes/no reported with ___", "if/whether", "if/whether / to / by"),
        ("Commands use ___", "to / not to", "to/not to / will / was"),
        ("Main grammar?", "questions & commands", "questions/commands / first"),
        ("Find asked if", "asked if we had practised", "(open)"),
        ("Find told to", "told us to translate", "(open)"),
        ("Write one told not to…", "Model OK", "(open)"),
        ("Lang vocab?", "translate, pronounce, grammar, mistakes", "yes / none"),
        ("Where did I live in reported?", "False (where I lived)", "False / True"),
        ("Course link", "/curso-b1/unit-19", "/curso-b1/unit-19"),
    ],
    20: [
        ("App is ___ every week", "updated", "updated / cancelled / translated"),
        ("Password must be ___", "changed", "changed / attached / sung"),
        ("Maya said she was ___", "busy", "busy / sunny / manufactured"),
        ("Told me she could ___", "help later", "help / swim / upload only"),
        ("Asked if we had ___", "practised", "practised / signed / fried"),
        ("Told us not to ___", "worry about mistakes", "worry / reply"),
        ("Files were ___ yesterday", "uploaded", "uploaded / postponed / pronounced"),
        ("Report should be ___", "sent", "sent / sung / regretted"),
        ("Find passive", "is updated / were uploaded", "(open)"),
        ("Find modal passive", "must be changed / should be sent", "(open)"),
        ("Find reported statement", "said she was busy", "(open)"),
        ("Find reported question", "asked if we had practised", "(open)"),
        ("Find command", "told us not to worry / told me she could… wait: told us not to", "(open)"),
        ("Write 1× each structure", "Model OK", "(open)"),
        ("Course link", "/curso-b1/unit-20", "/curso-b1/unit-20"),
    ],
}

LISTEN_Q = {
    16: [
        ("Who speaks?", "Nora", "Nora / Omar / Pia"),
        ("App is ___", "installed", "installed / cancelled"),
        ("Emails are ___", "sent automatically", "sent / deleted"),
        ("Laptop was ___", "repaired", "repaired / translated"),
        ("Files were ___", "deleted by mistake", "deleted / attached"),
        ("Website was designed by ___", "a professional team", "team / students"),
        ("Passwords are changed for ___", "security", "security / fun"),
        ("Grammar?", "passive", "passive / second"),
        ("Find present passive", "is installed / are sent…", "(open)"),
        ("Find past passive", "was repaired / were deleted", "(open)"),
        ("Write one was/were + V3", "Model OK", "(open)"),
        ("Tech words?", "app, emails, laptop, passwords", "yes / none"),
        ("Shadow audio", "done", "(open)"),
        ("Active focus?", "False", "False / True"),
        ("Open Ver solución", "yes", "yes"),
    ],
    17: [
        ("Who speaks?", "Omar", "Omar / Nora / Quinn"),
        ("Form must be ___", "completed", "completed / deleted"),
        ("Report should be ___", "sent today", "sent / ignored"),
        ("Meeting can be ___", "postponed", "postponed / uploaded"),
        ("Interview might be ___", "cancelled", "cancelled / translated"),
        ("Contract must be ___", "signed by Friday", "signed / sung"),
        ("Applications must be ___", "submitted before deadline", "submitted / deleted"),
        ("Grammar?", "modal passive", "modal passive / first"),
        ("Find must be", "must be completed / signed / submitted", "(open)"),
        ("Find should/can/might", "should be sent / can be postponed / might be cancelled", "(open)"),
        ("Write one should be + V3", "Model OK", "(open)"),
        ("Work words?", "form, report, interview, contract, deadline", "yes / none"),
        ("Shadow audio", "done", "(open)"),
        ("Must to be?", "False", "False / True"),
        ("Open Ver solución", "yes", "yes"),
    ],
    18: [
        ("Who speaks?", "Pia", "Pia / Omar / Rita"),
        ("She said she was ___", "busy", "busy / late / free"),
        ("They said they would ___", "call later", "call / swim"),
        ("He said she had ___", "left the office", "left / uploaded"),
        ("Sara told me she could ___", "help with the email", "help / cancel forever"),
        ("Tom said he would ___", "send the file", "send / delete"),
        ("Manager told me ___", "meeting was cancelled", "cancelled / sunny"),
        ("Grammar?", "reported statements", "reported / weather"),
        ("said vs told me", "told me needs person", "(open)"),
        ("Find would", "would call / would send", "(open)"),
        ("Find had/could", "had left / could help", "(open)"),
        ("Write one They said…", "Model OK", "(open)"),
        ("Shadow audio", "done", "(open)"),
        ("will → would?", "Yes", "Yes / No"),
        ("Open Ver solución", "yes", "yes"),
    ],
    19: [
        ("Who speaks?", "Quinn", "Quinn / Pia / Nora"),
        ("Asked where I ___", "lived", "lived / live"),
        ("Asked if I was ___", "ready for the test", "ready / angry"),
        ("Told me to ___", "open the file", "open / delete"),
        ("Told me not to ___", "be late", "be late / reply"),
        ("Asked how we ___", "pronounce that word", "pronounce / manufacture"),
        ("Told us to ___", "translate the paragraph", "translate / cancel"),
        ("Grammar?", "questions & commands", "questions/commands / first"),
        ("Find asked if", "asked if I was ready", "(open)"),
        ("Find told to / not to", "to open / not to be late / to translate", "(open)"),
        ("Write one asked where…", "Model OK", "(open)"),
        ("Lang words?", "pronounce, translate, test", "yes / none"),
        ("Shadow audio", "done", "(open)"),
        ("Where did I live OK?", "False", "False / True"),
        ("Open Ver solución", "yes", "yes"),
    ],
    20: [
        ("Who speaks?", "Rita", "Rita / Quinn / Omar"),
        ("App is ___", "updated every week", "updated / cancelled"),
        ("Form must be ___", "completed online", "completed / ignored"),
        ("Maya said she was ___", "busy", "busy / free"),
        ("Asked if we had ___", "practised", "practised / signed"),
        ("Told us to ___", "practise more", "practise / swim"),
        ("Files were ___", "uploaded yesterday", "uploaded / postponed"),
        ("Classify is updated", "passive", "passive / reported / modal"),
        ("Classify must be completed", "modal passive", "modal / first / third"),
        ("Classify said she was busy", "reported statement", "statement / question"),
        ("Classify asked if", "reported question", "question / command"),
        ("Classify told us to", "command", "command / passive"),
        ("Write 1× each", "Model OK", "(open)"),
        ("Shadow audio", "done", "(open)"),
        ("Open Ver solución", "yes", "yes"),
    ],
}

WRITE = {
    16: (
        [
            "Escribe 3 pasivas (present + past) sobre tecnología.",
            "Completa: Emails ___ sent automatically.",
            "Completa: The laptop ___ repaired last week.",
            "Completa: The files ___ deleted yesterday.",
            "Transforma: Someone installs the app. → ___",
            "Usa *upload* y *cloud* en 2 frases pasivas.",
            "Corrige: *The emails is sent daily.*",
            "Corrige: *The laptop were repaired.*",
            "Escribe 1 frase con *by + agent*.",
            "Párrafo (3–4 frases) sobre apps/dispositivos en pasiva.",
            "Traduce: La app está instalada en mi móvil.",
            "Traduce: Los archivos fueron borrados por error.",
            "Pregunta *Was the laptop repaired?* + respuesta.",
            "Escribe 1× *are changed* + 1× *was designed*.",
            "Autochequeo: is/are/was/were + V3.",
        ],
        [
            "Model: The app is installed. Updates are downloaded. The phone was repaired.",
            "**are**",
            "**was**",
            "**were**",
            "The app **is installed**.",
            "Photos are uploaded to the cloud. Data is stored in the cloud.",
            "The emails **are** sent daily.",
            "The laptop **was** repaired.",
            "The website was designed by a professional team.",
            "Open tech passive paragraph.",
            "The app is installed on my phone.",
            "The files were deleted by mistake.",
            "Was the laptop repaired? — Yes, it was repaired last week.",
            "Passwords are changed regularly. The site was designed by a team.",
            "Self-check.",
        ],
    ),
    17: (
        [
            "Escribe 4 modal passives (must/should/can/might).",
            "Completa: The form ___ be completed.",
            "Completa: The report ___ be sent today.",
            "Completa: Applications must ___ submitted.",
            "Corrige: *Must to be finished.*",
            "Corrige: *The form must completed.*",
            "Usa *deadline* y *colleague* en 2 frases con modal passive.",
            "Escribe: The contract must be signed by Friday.",
            "Escribe: The meeting can be postponed.",
            "Mini-párrafo sobre un proceso de selección (interview/resume).",
            "Traduce: El informe debería enviarse hoy.",
            "Traduce: La entrevista podría cancelarse.",
            "Pregunta *Should the report be finished today?* + respuesta.",
            "Escribe 1× might be + V3.",
            "Autochequeo: modal + be + V3.",
        ],
        [
            "Model: must/should/can/might be + V3.",
            "**must**",
            "**should**",
            "**be**",
            "It **must be** finished.",
            "The form must **be** completed.",
            "Applications must be submitted before the deadline. Meetings can be held with colleagues online.",
            "OK model.",
            "OK model.",
            "Open hiring paragraph.",
            "The report should be sent today.",
            "The interview might be cancelled.",
            "Should the report be finished today? — Yes, it should.",
            "The interview might be postponed.",
            "Self-check.",
        ],
    ),
    18: (
        [
            "Reporta 3 frases (am/will/can → backshift).",
            'Completa: "I am busy." → She said she ___ busy.',
            'Completa: "We will call." → They said they ___ call.',
            'Completa: "I can help." → She told me she ___ help.',
            "Corrige: *She said me she was tired.*",
            "Corrige: *They said they will call.*",
            "Usa *attach* y *reply* en 2 reported statements.",
            "Escribe: Tom said he would send the email.",
            "Escribe: Sara said she had attached the file.",
            "Mini-diálogo: What did he say? + respuesta reported.",
            "Traduce: Dijo que estaba ocupada.",
            "Traduce: Me dijo que la reunión estaba cancelada.",
            "Diferencia said vs told en 2 frases.",
            "Escribe 1× had (backshift de present perfect).",
            "Autochequeo: said/told + backshift.",
        ],
        [
            "Model with was/would/could.",
            "**was**",
            "**would**",
            "**could**",
            "She **told** me… / She **said**…",
            "They said they **would** call.",
            "She said she had attached the file. They said they could reply later.",
            "OK.",
            "OK.",
            "Open dialogue.",
            "She said she was busy.",
            "He told me the meeting was cancelled.",
            "She said… / She told me…",
            "He said she had left.",
            "Self-check.",
        ],
    ),
    19: (
        [
            "Reporta 2 preguntas + 2 órdenes.",
            'Completa: "Are you ready?" → She asked ___ I was ready.',
            'Completa: "Where do you live?" → He asked where I ___.',
            'Completa: "Open the file." → She told me ___ open the file.',
            'Completa: "Don\'t be late." → He told me ___ ___ be late.',
            "Corrige: *He asked where did I live.*",
            "Corrige: *She told me open the file.*",
            "Usa *translate* y *pronounce* en reported speech.",
            "Escribe: She asked if we had practised.",
            "Escribe: They told us not to worry about mistakes.",
            "Mini-diálogo en clase de idiomas (ask/tell).",
            "Traduce: Me preguntó si estaba listo.",
            "Traduce: Nos dijo que tradujéramos el párrafo.",
            "Escribe 1× asked whether…",
            "Autochequeo: if/wh- + to/not to.",
        ],
        [
            "Open 2+2.",
            "**if**",
            "**lived**",
            "**to**",
            "**not to**",
            "He asked where I **lived**.",
            "She told me **to** open the file.",
            "She told us to translate… He asked how we pronounce…",
            "OK.",
            "OK.",
            "Open class dialogue.",
            "She asked if I was ready.",
            "She told us to translate the paragraph.",
            "The tutor asked whether we understood.",
            "Self-check.",
        ],
    ),
    20: (
        [
            "Una frase de cada: passive, modal passive, said, asked if, told to.",
            "Completa: The app ___ updated every week.",
            "Completa: The form ___ be completed.",
            "Completa: She said she ___ busy.",
            "Completa: He asked ___ I was ready.",
            "Completa: They told us ___ practise.",
            "Corrige: *She said me she was tired.*",
            "Corrige: *Must to be finished.*",
            "Corrige: *He asked where did I live.*",
            "Mini-historia (5 frases) mezclando U16–U19.",
            "Matching mental: acción / modal+acción / lo dicho / pregunta / orden.",
            "Traduce: La app se actualiza cada semana.",
            "Traduce: Me dijo que no me preocupara.",
            "Escribe 1× were + V3 y 1× should be + V3.",
            "Autochequeo con el mapa de la Unidad 20.",
        ],
        [
            "Open — one of each.",
            "**is**",
            "**must**",
            "**was**",
            "**if**",
            "**to**",
            "She **told** me… / She **said**…",
            "**Must be** finished.",
            "He asked where I **lived**.",
            "Open mixed paragraph.",
            "passive / modal passive / statement / question / command.",
            "The app is updated every week.",
            "He/She told me not to worry.",
            "Files were uploaded. The report should be sent.",
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

    bing = [
        "curso de inglés gratis",
        "aprender inglés gratis",
        "curso de inglés online gratis",
        "curso inglés B1 gratis",
        "ejercicios inglés B1 gratis",
    ]
    kws = "\n".join(
        f"  - {k}"
        for k in [f"ejercicios inglés B1 unidad {u}", *m["kw"], "curso B1 Linguafly", *bing]
    )

    if u < 20:
        next_line = f"3. Siguiente: [{META[u + 1]['title']}](/blog/curso-b1/{m['next_t']}-ejercicios-soluciones)."
    else:
        next_line = "3. Siguiente bloque del curso: [Unidad 21 — Gerund vs infinitive](/curso-b1/unit-21)."

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


def main():
    for u in (16, 17, 18, 19, 20):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path, "chars", path.stat().st_size)


if __name__ == "__main__":
    main()
