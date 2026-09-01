#!/usr/bin/env python3
"""Generate B2 Units 46–50 exercise workbooks and workbook TTS.

This generator extends the B2 U41–45 workbook pattern: Spanish instructions,
closed practice, complete answer keys, reading/listening comprehension, and
explicit models for writing and speaking.
"""
from __future__ import annotations

import importlib.util
from pathlib import Path
import re
import sys

from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/content/blog/curso-b2"
DATE = "2026-09-01"
HUB = "ingles-b2"
sys.dont_write_bytecode = True


def load_pattern():
    """Load the previous five-unit generator so rendering stays consistent."""
    path = ROOT / "scripts/generate-b2-u41-45-workbooks.py"
    spec = importlib.util.spec_from_file_location("b2_u41_45_pattern", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"No se pudo cargar el patrón {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


PATTERN = load_pattern()


META = {
    46: {
        "slug": "unidad-46-mixed-conditionals-psychology",
        "title": "Mixed Conditionals & Psychology",
        "full": "Mixed Conditionals + Psychology & Human Behavior",
        "focus": "mixed conditionals de pasado a presente, de presente a pasado y su contraste con el tercer condicional",
        "vocab": "Psychology & Human Behavior",
        "image": "/blog/curso-b2/unit-46/mixed-conditionals-map.png",
        "prev": "unidad-45-modal-deduction-space-ejercicios-soluciones",
        "next": "unidad-47-cleft-sentences-academic-writing-ejercicios-soluciones",
        "next_title": "Unidad 47 — Cleft Sentences & Academic Writing",
        "reading_title": "Daniel changes his response to stress",
        "listening_title": "Dr Evans discusses resilience",
        "related": [
            "unidad-46-mixed-conditionals-psychology",
            "unidad-45-modal-deduction-space",
            "unidad-47-cleft-sentences-academic-writing",
            HUB,
        ],
        "remember": [
            "Pasado irreal → presente: **if + had + V3, would/could/might + base**.",
            "Estado presente → resultado pasado: **if + past/were, would have + V3**.",
            "Si condición y resultado son pasados, usa el tercer condicional: **had + V3 → would have + V3**.",
            "Describe emociones y salud mental con cautela: practica lenguaje, no diagnósticos.",
        ],
        "keywords": [
            "mixed conditionals ejercicios B2",
            "if had would be práctica inglés",
            "third conditional vs mixed conditional",
            "psychology vocabulary B2 ejercicios",
        ],
    },
    47: {
        "slug": "unidad-47-cleft-sentences-academic-writing",
        "title": "Cleft Sentences & Academic Writing",
        "full": "Cleft Sentences + Academic Writing & Reports",
        "focus": "it-clefts y what-clefts para enfocar personas, cosas, circunstancias y hallazgos",
        "vocab": "Academic Writing & Reports",
        "image": "/blog/curso-b2/unit-47/cleft-sentences-map.png",
        "prev": "unidad-46-mixed-conditionals-psychology-ejercicios-soluciones",
        "next": "unidad-48-reporting-verbs-teaching-ejercicios-soluciones",
        "next_title": "Unidad 48 — Reporting Verbs & Teaching",
        "reading_title": "A report that needed a clearer focus",
        "listening_title": "Professor Khan gives dissertation feedback",
        "related": [
            "unidad-47-cleft-sentences-academic-writing",
            "unidad-46-mixed-conditionals-psychology",
            "unidad-48-reporting-verbs-teaching",
            HUB,
        ],
        "remember": [
            "Enfoca una persona con **It was X who...** y una cosa o circunstancia con **It was X that...**.",
            "Una what-cleft sigue **What + clause + is/was + focus**.",
            "La cleft conserva el hecho básico; cambia qué información recibe contraste.",
            "En U47, la what-clause toma **is/was** singular en el patrón evaluado.",
        ],
        "keywords": [
            "cleft sentences ejercicios B2",
            "it was who that práctica inglés",
            "what cleft ejercicios con soluciones",
            "academic writing vocabulary B2",
        ],
    },
    48: {
        "slug": "unidad-48-reporting-verbs-teaching",
        "title": "Reporting Verbs & Teaching",
        "full": "Reporting Verbs + Innovation in Teaching",
        "focus": "suggest, recommend, insist y urge con gerundio, that-clause u objeto + infinitivo",
        "vocab": "Innovation in Teaching",
        "image": "/blog/curso-b2/unit-48/reporting-verbs-map.png",
        "prev": "unidad-47-cleft-sentences-academic-writing-ejercicios-soluciones",
        "next": "unidad-49-inversion-sociology-ejercicios-soluciones",
        "next_title": "Unidad 49 — Inversion & Sociology",
        "reading_title": "A school evaluates a flipped classroom",
        "listening_title": "Professor Chen reports teaching proposals",
        "related": [
            "unidad-48-reporting-verbs-teaching",
            "unidad-47-cleft-sentences-academic-writing",
            "unidad-49-inversion-sociology",
            HUB,
        ],
        "remember": [
            "**Suggest/recommend + -ing** presenta una propuesta sin sujeto interno explícito.",
            "**Suggest/recommend/insist + that + subject + base** nombra quién debe actuar.",
            "**Insist on + -ing** conserva *on*; **urge + object + to + base** necesita persona.",
            "La negativa mandativa coloca **not** antes de la base: *insisted that we not leave*.",
        ],
        "keywords": [
            "reporting verbs ejercicios B2",
            "suggest recommend insist patrones práctica",
            "urge someone to ejercicios inglés",
            "EdTech vocabulary B2 ejercicios",
        ],
    },
    49: {
        "slug": "unidad-49-inversion-sociology",
        "title": "Inversion & Sociology",
        "full": "Inversion for Emphasis + Sociology & Cultural Shifts",
        "focus": "inversión enfática con expresiones negativas, only, not only, not until y pares temporales",
        "vocab": "Sociology & Cultural Shifts",
        "image": "/blog/curso-b2/unit-49/inversion-map.png",
        "prev": "unidad-48-reporting-verbs-teaching-ejercicios-soluciones",
        "next": "unidad-50-repaso-41-49-ejercicios-soluciones",
        "next_title": "Unidad 50 — Repaso 41–49",
        "reading_title": "A town interprets rapid social change",
        "listening_title": "Dr Williams presents census trends",
        "related": [
            "unidad-49-inversion-sociology",
            "unidad-48-reporting-verbs-teaching",
            "unidad-50-repaso-41-49",
            HUB,
        ],
        "remember": [
            "Tras una expresión negativa frontal, invierte **auxiliar + sujeto**.",
            "Si no hay auxiliar, añade **do/does/did** y devuelve el verbo principal a base.",
            "Con **only when/after**, la inversión ocurre en la cláusula principal.",
            "Conserva las parejas **hardly/scarcely...when** y **no sooner...than**.",
        ],
        "keywords": [
            "inversion for emphasis ejercicios B2",
            "never have I only then did práctica",
            "hardly when no sooner than ejercicios",
            "sociology vocabulary B2",
        ],
    },
    50: {
        "slug": "unidad-50-repaso-41-49",
        "title": "Repaso Unidades 41–49",
        "full": "Module 5 Review: Units 41–49",
        "focus": "las nueve familias gramaticales de U41–49 mediante pistas de función, tiempo, foco y complemento",
        "vocab": "Education, Science, Psychology, Writing, Teaching & Society",
        "image": "/blog/curso-b2/unit-50/review-41-49-map.png",
        "prev": "unidad-49-inversion-sociology-ejercicios-soluciones",
        "next": "",
        "next_title": "",
        "reading_title": "An education project with social impact",
        "listening_title": "Dr Lee closes Module 5",
        "related": [
            "unidad-50-repaso-41-49",
            "unidad-49-inversion-sociology",
            "unidad-46-mixed-conditionals-psychology",
            HUB,
        ],
        "remember": [
            "Clasifica primero: patrón verbal, atribución, regla, límite, evidencia, condición, foco, reporte o inversión.",
            "Comprueba cada cadena completa: auxiliares, participios, complementos y concordancia.",
            "Distingue formas cercanas por la pista exacta, no por parecido visual.",
            "Conecta cada término con una colocación y una red temática de U41–49.",
        ],
        "keywords": [
            "repaso inglés B2 unidades 41 49",
            "gramática B2 ejercicios mixtos",
            "future perfect mixed conditionals cleft review",
            "vocabulario módulo 5 B2 ejercicios",
        ],
    },
}


READING = {
    46: (
        "Daniel manages a busy community centre. Two years ago, he ignored persistent stress and refused "
        "support because he believed that asking for help showed weakness. If he had recognised the signs "
        "earlier, he would feel more confident about managing pressure today. He would also be sleeping "
        "better now if he had changed his routine then. Daniel is naturally impatient; if he were more "
        "patient, he would have listened more carefully during an earlier wellbeing workshop. After a "
        "colleague showed empathy, he sought professional advice and learned practical coping strategies. "
        "If that colleague had dismissed his concerns, Daniel might still avoid discussing emotions. He "
        "now understands that anxiety is not a character flaw. If the centre had offered the workshop "
        "sooner, several employees could have received support before their stress increased."
    ),
    47: (
        "Professor Khan reviewed a student report on access to university education. It was the introduction "
        "that needed the most revision because it contained no precise thesis statement. What the evidence "
        "showed was a clear difference between rural and urban applicants, but the first draft hid that "
        "finding beneath several general claims. It was Maya, the student's supervisor, who suggested a new "
        "outline. What she recommended was moving the central finding to the opening paragraph. It was after "
        "the methodology section that the student added a short discussion of limitations. The student "
        "paraphrased two sources accurately, quoted one definition and included every citation in the "
        "bibliography. What finally impressed Professor Khan was the report's logical argumentation, not "
        "its length. It wasn't until Friday that the revised draft was submitted."
    ),
    48: (
        "A secondary school tested a flipped classroom for one term. Teachers suggested giving students "
        "short videos before class and recommended using lesson time for hands-on learning. The head teacher "
        "insisted that every family receive technical support and insisted on lending tablets to learners "
        "without suitable devices. An external advisor urged the school to measure learning outcomes rather "
        "than assume that new technology would work. She recommended that teachers provide formative "
        "feedback after each real-world task. Students reported higher engagement, although some admitted "
        "missing the immediate explanations of a traditional lesson. The evaluation team suggested combining "
        "online resources with face-to-face instruction. It urged staff to keep the successful practical "
        "tasks but warned them not to treat screen time as evidence of innovation."
    ),
    49: (
        "Never before had Bellford changed as rapidly as it did after the new rail line opened. Migration "
        "increased, neighbourhoods became more diverse and local businesses served a wider community. Only "
        "after the latest census was published did researchers identify the scale of the demographic shift. "
        "Not only had the population grown, but its age profile had changed too. Seldom do social trends "
        "have a single cause, so the report considered employment, housing and improved digital connectivity. "
        "Hardly had one online service become popular when another replaced it. No sooner had broadband "
        "reached the surrounding villages than remote work began to influence migration. Under no "
        "circumstances should these figures be used to stereotype residents. Only by interviewing different "
        "generations can sociologists explain how globalisation and urbanisation are shaping local identity."
    ),
    50: (
        "By next June, a university partnership will have completed a project on digital access and student "
        "wellbeing. The programme is believed to have improved engagement in three communities. Students "
        "must cite every source, although they do not have to print their reports. What the research team "
        "values most is reliable evidence. One lecturer suggested using a flipped classroom, while an advisor "
        "urged teachers to provide technical support. If the university had invested earlier, more rural "
        "learners would have broadband access now. It was the student interviews that revealed the strongest "
        "connection between anxiety and digital exclusion. Never had the researchers expected such varied "
        "findings. The final report might influence future policy, but the team will not call the project a "
        "breakthrough until an independent group has analysed the data."
    ),
}


LISTENING = {
    46: (
        "Hello, I'm Dr Evans. Resilience does not mean ignoring difficult emotions. If people had been taught "
        "more coping strategies at school, some would manage stress more confidently today. Maya is highly "
        "self-aware; if she were less aware of her reactions, she might have repeated the same mistake last "
        "month. Her manager showed empathy and encouraged her to seek help. If he had dismissed her concerns, "
        "she could still be experiencing severe pressure now. A strong social network can support wellbeing, "
        "but it does not replace professional care. If Maya had tried to cope alone, her anxiety might have "
        "increased. She now challenges unhelpful beliefs and pays attention to her emotional responses."
    ),
    47: (
        "Good afternoon, I'm Professor Khan. What your dissertation needs most is a clearer thesis statement. "
        "It was the methodology section that confused me, not the results. What the table shows is a gradual "
        "decline, but your commentary describes a sudden fall. It was Dr Lewis who collected the original "
        "data, so cite her study in the paragraph and bibliography. What I want you to do is revise the "
        "outline before rewriting the introduction. It wasn't until the final page that I found your main "
        "argument. What impressed me was your careful paraphrasing. Keep that formal register, support each "
        "claim with evidence and submit the new draft on Monday."
    ),
    48: (
        "Hello, I'm Professor Chen. Several teachers suggested introducing gamification, but I recommended "
        "testing one real-world task first. The evaluation report recommended that the school define measurable "
        "learning outcomes. Our principal insisted that every teacher attend training and insisted on providing "
        "time to practise. I urged the technology team to protect student data. Parents suggested offering a "
        "webinar, and the advisor recommended recording it for families who could not attend live. We warned "
        "staff not to confuse novelty with effective pedagogy. Finally, students recommended using formative "
        "feedback and asked teachers to preserve face-to-face discussion in the blended course."
    ),
    49: (
        "Good evening, I'm Dr Williams. Rarely do census figures tell the whole story, but they reveal useful "
        "trends. Only after we compared three age groups did we recognise a growing generation gap in media "
        "habits. Not only did younger residents use more online services, but older residents reported weaker "
        "connectivity too. Hardly had the council launched a digital inclusion programme when attendance filled "
        "every available place. No sooner had volunteers offered weekly support than confidence began to rise. "
        "Never should a single survey be used to define an entire community. Only by combining statistics with "
        "interviews can we understand how technology, migration and cultural identity interact."
    ),
    50: (
        "Welcome to the end of Module Five. By Friday, you will have reviewed nine grammar families and the "
        "vocabulary that connects them. What I want to emphasise is accurate choice, not decorative complexity. "
        "A result may be reported cautiously, and strong evidence must support a strong deduction. If I had "
        "known how useful contrast tables were, I would have introduced them earlier. It was the students who "
        "suggested using short retrieval tasks. Our advisor urged us to include speaking practice, and we "
        "insisted that every model show the target structure. Never have I seen confidence grow through passive "
        "rereading alone. Explain each clue, correct each chain and transfer it to a new context."
    ),
}


def item(
    prompt: str, options: str, answer: str, explanation: str
) -> tuple[str, str, str, str]:
    return prompt, options, answer, explanation


GRAMMAR = {
    46: [
        (
            "Pasado irreal, resultado presente",
            "Selecciona la cadena que conecta una causa pasada no realizada con una consecuencia actual.",
            [
                item("If Daniel ___ the signs earlier, he would feel better now.", "had recognised · recognised · would have recognised", "had recognised", "*Now* sitúa el resultado en presente; la condición va en Past Perfect."),
                item("If we had invested in support, staff ___ more confident today.", "would be · would have been · were", "would be", "La consecuencia con *today* usa *would + base*."),
                item("She would be sleeping better now if she ___ her routine.", "had changed · changed · would change", "had changed", "El cambio no ocurrió en un pasado cerrado."),
                item("If he had accepted the post, he ___ as a psychologist now.", "would be working · would have worked · had worked", "would be working", "La consecuencia actual en curso usa *would be + -ing*."),
                item("Corrige: *If Maya would have sought help, she might feel calmer now.*", "—", "If Maya had sought help, she might feel calmer now.", "La cláusula con *if* no lleva *would* en este patrón."),
            ],
        ),
        (
            "Estado presente, resultado pasado",
            "Interpreta la condición como rasgo o estado vigente y completa el resultado anterior.",
            [
                item("If he ___ more patient, he would have listened yesterday.", "were · had been · would be", "were", "La condición describe un rasgo vigente en la interpretación objetivo."),
                item("If I spoke French, I ___ the interview last week.", "would have understood · would understand · had understood", "would have understood", "El resultado pasado exige *would have + V3*."),
                item("If they weren't so anxious, they ___ the presentation.", "might have enjoyed · might enjoy yesterday · had enjoyed", "might have enjoyed", "*Might have* expresa una consecuencia pasada menos segura."),
                item("If she had greater self-awareness, she ___ the warning.", "could have noticed · could notice last month · would noticed", "could have noticed", "*Could have + V3* presenta posibilidad o capacidad pasada."),
                item("Corrige: *If he was more empathetic, he would have understand her.*", "—", "If he were more empathetic, he would have understood her.", "El modelo cuidado usa *were* y el resultado termina en participio."),
            ],
        ),
        (
            "Mixed o third conditional",
            "Clasifica los tiempos antes de elegir; la pista temporal decide si hay mezcla.",
            [
                item("If you had told me yesterday, I ___ you then.", "would have helped · would help now · helped", "would have helped", "Condición y resultado son pasados: tercer condicional."),
                item("If she had completed the course, she ___ a therapist now.", "would be · would have been then · is", "would be", "Causa pasada y estado presente: mixed conditional."),
                item("If he were more resilient, he ___ after last year's setback.", "might have recovered · might recover yesterday · had recovered", "might have recovered", "Rasgo presente y resultado pasado: mixed conditional."),
                item("Choose the third conditional.", "If I had known, I would have called. · If I had trained, I would be calmer now. · If I were calmer, I would have spoken.", "If I had known, I would have called.", "Ambas cláusulas se refieren al pasado."),
                item("Corrige el participio: *If they had knew, they could have chose differently.*", "—", "If they had known, they could have chosen differently.", "*Had* y *have* exigen los participios *known* y *chosen*."),
            ],
        ),
    ],
    47: [
        (
            "It-clefts: persona y cosa",
            "Transforma el mensaje neutro y enfoca exactamente el elemento indicado.",
            [
                item("Maya revised the report. (enfoca Maya)", "It was Maya who revised the report. · It was Maya which revised the report.", "It was Maya who revised the report.", "*Who* enfoca una persona."),
                item("The introduction needed revision. (enfoca introduction)", "It was the introduction that needed revision. · It was the introduction who needed revision.", "It was the introduction that needed revision.", "*That* introduce el resto tras una cosa."),
                item("The methodology matters now. (enfoca methodology)", "It is the methodology that matters now. · It was methodology who matters now.", "It is the methodology that matters now.", "*Now* favorece *is* y el foco es una cosa."),
                item("The students were concerned. (enfoca students)", "It was the students who were concerned. · It were the students who was concerned.", "It was the students who were concerned.", "El marco usa *it was* y la relativa concuerda con *students*."),
                item("Corrige: *It was Professor Khan which wrote the conclusion.*", "—", "It was Professor Khan who wrote the conclusion.", "La persona enfocada toma *who*."),
            ],
        ),
        (
            "Circunstancias y not until",
            "Coloca tiempo, lugar o razón dentro del marco *it was...that*.",
            [
                item("We found the source in the library. (enfoca lugar)", "It was in the library that we found the source. · It was the library who we found.", "It was in the library that we found the source.", "La preposición permanece con el foco de lugar."),
                item("We rushed because of the deadline. (enfoca razón)", "It was because of the deadline that we rushed. · What rushed was the deadline.", "It was because of the deadline that we rushed.", "La razón completa ocupa el foco."),
                item("Academic writing changed in the twentieth century. (enfoca tiempo)", "It was in the twentieth century that academic writing changed. · It was when the century which changed.", "It was in the twentieth century that academic writing changed.", "La transformación objetivo usa *that* después del foco temporal."),
                item("They finished the draft only on Friday.", "It wasn't until Friday that they finished the draft. · It wasn't Friday who they finished.", "It wasn't until Friday that they finished the draft.", "*It wasn't until...that* destaca el retraso."),
                item("Corrige: *It was in 2021 when the study began.*", "—", "It was in 2021 that the study began.", "U47 selecciona *that* tras la circunstancia enfocada."),
            ],
        ),
        (
            "What-clefts",
            "Completa la cláusula nominal, el verbo *be* y el foco sin añadir un *it* redundante.",
            [
                item("Clear evidence matters most.", "What matters most is clear evidence. · What it matters most is evidence.", "What matters most is clear evidence.", "La what-clause funciona como sujeto."),
                item("His reaction surprised me.", "What surprised me was his reaction. · What did surprise me it was his reaction.", "What surprised me was his reaction.", "El hecho es pasado y no aparece *it*."),
                item("The report shows significant progress.", "What the report shows is significant progress. · What shows the report are progress.", "What the report shows is significant progress.", "Orden normal dentro de la what-clause."),
                item("We need to revise the outline.", "What we need to do is revise the outline. · What we need do are revising.", "What we need to do is revise the outline.", "La acción enfocada sigue al marco completo."),
                item("Corrige: *What the essay argues it is that access must improve.*", "—", "What the essay argues is that access must improve.", "No se duplica el sujeto con *it*."),
            ],
        ),
    ],
    48: [
        (
            "Suggest y recommend",
            "Elige gerundio cuando no aparece sujeto interno o una that-clause con base cuando sí aparece.",
            [
                item("Teachers suggested ___ short videos.", "using · to use · use", "using", "*Suggest + -ing*."),
                item("The report recommended ___ the method first.", "testing · to test · test", "testing", "*Recommend + -ing* es el marco sin sujeto interno."),
                item("She suggested that we ___ earlier.", "start · started · to start", "start", "La cláusula mandativa usa forma base."),
                item("They recommended that he ___ the webinar.", "attend · attends · attending", "attend", "La base no recibe *-s*."),
                item("Corrige: *The teacher suggested us to use gamification.*", "—", "The teacher suggested that we use gamification.", "*Suggest* no toma objeto + infinitivo en este significado."),
            ],
        ),
        (
            "Insist con on o that",
            "Conserva la preposición antes del gerundio o una cláusula mandativa completa.",
            [
                item("The principal insisted ___ providing training.", "on · to · for", "on", "*Insist on + -ing*."),
                item("She insisted that every teacher ___ present.", "be · is · to be", "be", "La cláusula mandativa selecciona la base *be*."),
                item("They insisted that we ___ the workshop.", "not leave · didn't leave · not to leave", "not leave", "La negativa coloca *not* antes de la base."),
                item("Maya insisted ___ the tablet herself.", "on setting up · to set up · that setting up", "on setting up", "El marco con gerundio necesita *on*."),
                item("Corrige: *He insisted to stay until the end.*", "—", "He insisted on staying until the end.", "No se usa infinitivo después de *insist* en este patrón."),
            ],
        ),
        (
            "Urge + objeto + infinitivo",
            "Identifica a la persona que debe actuar y usa pronombre objeto cuando corresponda.",
            [
                item("The advisor urged schools ___ EdTech carefully.", "to adopt · adopting · that adopt", "to adopt", "*Urge + object + to + base*."),
                item("She urged (we/us) ___ the outcomes.", "us to measure · we to measure · us measuring", "us to measure", "Se necesita pronombre objeto."),
                item("The guide urged students ___ passwords.", "not to share · to not sharing · not share", "not to share", "La negativa normal es *object + not to + base*."),
                item("Choose the strongest call to action.", "The ministry urged schools to act. · The ministry suggested acting. · The ministry mentioned action.", "The ministry urged schools to act.", "*Urge* comunica presión o importancia."),
                item("Corrige: *The advisor urged they to attend the webinar.*", "—", "The advisor urged them to attend the webinar.", "*Them* es la forma de objeto."),
            ],
        ),
    ],
    49: [
        (
            "Expresiones negativas frontales",
            "Mueve el auxiliar existente o añade *do/does/did*; no construyas una pregunta.",
            [
                item("I have never seen such rapid change.", "Never have I seen such rapid change. · Never I have seen such rapid change.", "Never have I seen such rapid change.", "Se invierten *have* y el sujeto."),
                item("We seldom witness this diversity.", "Seldom do we witness this diversity. · Seldom witness we this diversity.", "Seldom do we witness this diversity.", "Simple Present necesita *do* y base."),
                item("Society rarely changes so quickly.", "Rarely does society change so quickly. · Rarely society changes so quickly.", "Rarely does society change so quickly.", "Tercera persona: *does + subject + base*."),
                item("We knew little about the trend.", "Little did we know about the trend. · Little did we knew about the trend.", "Little did we know about the trend.", "Simple Past necesita *did* y base."),
                item("Corrige: *Under no circumstances you should stereotype residents.*", "—", "Under no circumstances should you stereotype residents.", "El modal pasa delante del sujeto."),
            ],
        ),
        (
            "Only, not only y not until",
            "Decide en qué cláusula ocurre la inversión y comprueba si *only* modifica circunstancia o sujeto.",
            [
                item("We realised the impact only then.", "Only then did we realise the impact. · Only then we realised the impact.", "Only then did we realise the impact.", "La circunstancia frontal activa inversión."),
                item("We understood after the census appeared.", "Only after the census appeared did we understand. · Only after did the census appear we understood.", "Only after the census appeared did we understand.", "La subordinada mantiene orden normal; se invierte la principal."),
                item("Demographics changed, and identity changed too.", "Not only did demographics change, but identity did too. · Not only demographics changed, but identity too.", "Not only did demographics change, but identity did too.", "*Not only* frontal invierte la primera cláusula."),
                item("Women gained the vote only in that decade.", "Not until that decade did women gain the vote. · Not until did that decade women gained.", "Not until that decade did women gain the vote.", "La principal usa *did + subject + base*."),
                item("Choose the sentence with no inversion.", "Only researchers understood the table. · Only then researchers understood. · Never society had changed.", "Only researchers understood the table.", "*Only* modifica el sujeto *researchers*."),
            ],
        ),
        (
            "Sucesión inmediata",
            "Forma las parejas fijas y distribuye Past Perfect y Past Simple.",
            [
                item("The programme ended; new trends emerged immediately.", "Hardly had the programme ended when new trends emerged. · Hardly did the programme end than trends emerged.", "Hardly had the programme ended when new trends emerged.", "*Hardly + Past Perfect...when + Past Simple*."),
                item("Broadband arrived; remote work increased immediately.", "No sooner had broadband arrived than remote work increased. · No sooner broadband arrived when work increased.", "No sooner had broadband arrived than remote work increased.", "*No sooner...than*."),
                item("Complete: Scarcely ___ the census begun ___ the system failed.", "had / when · did / than · has / that", "had / when", "*Scarcely* comparte patrón con *hardly*."),
                item("Choose the correct pair.", "Hardly...when · Hardly...than · No sooner...when", "Hardly...when", "Las parejas no se intercambian."),
                item("Corrige: *No sooner had the survey ended when analysts published the data.*", "—", "No sooner had the survey ended than analysts published the data.", "*No sooner* exige *than*."),
            ],
        ),
    ],
    50: [
        (
            "U41–U43: patrón, atribución y modalidad",
            "Clasifica la función y recupera la estructura completa.",
            [
                item("Students enjoy ___ in seminars.", "participating · to participate · participate", "participating", "*Enjoy + -ing* (U41)."),
                item("People believe the method works.", "The method is believed to work. · The method is believed that it works.", "The method is believed to work.", "Reporting passive con sujeto + infinitivo (U42)."),
                item("The workshop is optional; you ___ attend.", "don't have to · mustn't · can't", "don't have to", "Ausencia de obligación (U43)."),
                item("Corrige: *The tutor asked we to cite the source.*", "—", "The tutor asked us to cite the source.", "Objeto + infinitivo y pronombre objeto (U41)."),
                item("Complete the anterior report: The scientist is reported ___.", "to have discovered the pattern · to discover yesterday · that discovered", "to have discovered the pattern", "Infinitivo perfecto para hecho anterior (U42)."),
            ],
        ),
        (
            "U44–U46: límite, evidencia y condición",
            "Localiza el tiempo y el grado de certeza antes de completar.",
            [
                item("By June, the team ___ the trial.", "will have completed · will complete yesterday · has complete", "will have completed", "Future Perfect antes de un límite (U44)."),
                item("Valid data arrived; the mission ___ completely.", "can't have failed · mustn't fail · can't failed", "can't have failed", "La evidencia descarta un hecho pasado (U45)."),
                item("If we had invested earlier, access ___ better now.", "would be · would have been then · is", "would be", "Pasado irreal → presente (U46)."),
                item("By the time regulators ___, the findings will have been published.", "meet · will meet · met tomorrow", "meet", "La cláusula temporal futura usa presente (U44)."),
                item("If she were more confident, she ___ last year's post.", "might have accepted · might accept yesterday · had accepted", "might have accepted", "Estado presente → resultado pasado (U46)."),
            ],
        ),
        (
            "U47–U49: foco, reporte e inversión",
            "Distingue qué recibe foco, qué complemento exige el verbo y qué expresión activa inversión.",
            [
                item("Maya wrote the report. (enfoca Maya)", "It was Maya who wrote the report. · What Maya wrote who the report.", "It was Maya who wrote the report.", "It-cleft de persona (U47)."),
                item("The teacher suggested ___ a flipped classroom.", "trying · to try · try", "trying", "*Suggest + -ing* (U48)."),
                item("I have never seen such engagement.", "Never have I seen such engagement. · Never I have seen such engagement.", "Never have I seen such engagement.", "Auxiliar antes del sujeto (U49)."),
                item("Corrige: *The advisor urged they attending training.*", "—", "The advisor urged them to attend training.", "*Urge + object + to + base* (U48)."),
                item("The evidence matters most.", "What matters most is the evidence. · What it matters most are evidence.", "What matters most is the evidence.", "What-cleft sin *it* redundante (U47)."),
            ],
        ),
    ],
}


VOCAB = {
    46: [
        ("cognition", "procesos de pensamiento y comprensión · conducta observable · tratamiento médico", "procesos de pensamiento y comprensión"),
        ("self-awareness", "conocimiento de los propios estados · aprobación social · memoria permanente", "conocimiento de los propios estados"),
        ("empathy", "comprensión de la perspectiva ajena · diagnóstico clínico · presión laboral", "comprensión de la perspectiva ajena"),
        ("anxiety", "preocupación o nerviosismo · confianza plena · recuerdo preciso", "preocupación o nerviosismo"),
        ("coping strategy", "forma de afrontar una dificultad · causa biológica única · rasgo inmutable", "forma de afrontar una dificultad"),
        ("The observable way a person acts is ___.", "behavior · cognition · perception", "behavior"),
        ("The way the mind interprets a stimulus is ___.", "perception · psychiatry · self-esteem", "perception"),
        ("An idea accepted as true is a ___.", "belief · stimulus · reaction time", "belief"),
        ("The ability to recover after difficulty is ___.", "resilience · anxiety · bias", "resilience"),
        ("A systematic preference that can distort judgement is a cognitive ___.", "bias · strategy · emotion", "bias"),
        ("Breathing slowly can help a person ___.", "cope with stress"),
        ("A supportive listener should ___.", "show empathy"),
        ("Recognising repeated reactions can ___.", "develop self-awareness"),
        ("Persistent distress may lead someone to ___.", "seek professional help"),
        ("A balanced routine can support ___.", "mental wellbeing"),
    ],
    47: [
        ("thesis statement", "idea central que defenderá el texto · lista completa de fuentes · versión preliminar", "idea central que defenderá el texto"),
        ("outline", "plan previo de la estructura · cita literal · conclusión definitiva", "plan previo de la estructura"),
        ("draft", "versión que todavía se revisará · fuente primaria · tabla final", "versión que todavía se revisará"),
        ("argumentation", "conexión de afirmaciones, razones y evidencia · formato de portada · resumen de una frase", "conexión de afirmaciones, razones y evidencia"),
        ("bibliography", "lista de fuentes · sección de resultados · nota informal", "lista de fuentes"),
        ("The opening section that states purpose and context is the ___.", "introduction · appendix · citation", "introduction"),
        ("The final section that synthesises the report is the ___.", "conclusion · methodology · abstract source", "conclusion"),
        ("Words copied exactly from a source form a ___.", "quotation · paraphrase · outline", "quotation"),
        ("A reference identifying a source in the text is a ___.", "citation · thesis · register", "citation"),
        ("Language suited to scholarly communication uses a ___.", "formal register · casual draft · personal bibliography", "formal register"),
        ("Use evidence to ___.", "support a claim"),
        ("Express the source's idea in new wording and attribution: ___.", "paraphrase the source"),
        ("Before drafting, students should ___.", "formulate a thesis statement"),
        ("After feedback, the writer must ___.", "revise the draft"),
        ("Every borrowed idea requires the writer to ___.", "cite the source"),
    ],
    48: [
        ("pedagogy", "principios y práctica de enseñanza · plataforma concreta · examen final", "principios y práctica de enseñanza"),
        ("EdTech", "tecnología aplicada a educación · título universitario · teoría psicológica", "tecnología aplicada a educación"),
        ("flipped classroom", "contenido inicial antes de clase y aplicación en clase · curso sin docente · examen mediante juego", "contenido inicial antes de clase y aplicación en clase"),
        ("formative feedback", "información para mejorar durante el proceso · nota final sin comentario · premio de asistencia", "información para mejorar durante el proceso"),
        ("student engagement", "implicación cognitiva, emocional y conductual · acceso a banda ancha · lista de matrícula", "implicación cognitiva, emocional y conductual"),
        ("A massive open online course is a ___.", "MOOC · VLE room · seminar paper", "MOOC"),
        ("A live presentation delivered online is a ___.", "webinar · curriculum · bibliography", "webinar"),
        ("Learning through practical activity is ___.", "hands-on learning · passive viewing · final assessment", "hands-on learning"),
        ("Adding game elements to learning is ___.", "gamification · digitisation · standardisation", "gamification"),
        ("A task reflecting an authentic situation is a ___.", "real-world task · abstract grade · virtual register", "real-world task"),
        ("The school plans to ___.", "adopt EdTech"),
        ("Practical projects can ___.", "boost student engagement"),
        ("Teachers should ___ after each draft.", "provide formative feedback"),
        ("An evaluation must ___.", "measure learning outcomes"),
        ("Families can ___ from home.", "attend a webinar"),
    ],
    49: [
        ("sociology", "estudio de sociedades e instituciones · estudio de la mente individual · recuento de votos", "estudio de sociedades e instituciones"),
        ("demographics", "características estadísticas de una población · opiniones personales · normas gramaticales", "características estadísticas de una población"),
        ("social change", "transformación de estructuras o normas · traslado individual diario · moda de una semana", "transformación de estructuras o normas"),
        ("identity", "cómo una persona o grupo se define · velocidad de internet · tamaño de una muestra", "cómo una persona o grupo se define"),
        ("diversity", "variedad dentro de un grupo · uniformidad obligatoria · dato aislado", "variedad dentro de un grupo"),
        ("An official operation that counts a population is a ___.", "census · trend · generation", "census"),
        ("A sustained direction of change is a ___.", "trend · fad · tradition", "trend"),
        ("A short-lived fashion is a ___.", "fad · value · census", "fad"),
        ("Movement to live in another place is ___.", "migration · modernisation · connectivity", "migration"),
        ("Growth in the proportion living in cities is ___.", "urbanisation · globalisation · digitisation", "urbanisation"),
        ("Researchers use statistics to ___.", "analyse demographic data"),
        ("A reliable national study may ___.", "observe a trend"),
        ("Shared practices can ___.", "shape cultural identity"),
        ("Local organisations try to ___.", "preserve a tradition"),
        ("Broadband programmes can improve ___.", "digital inclusion"),
    ],
    50: [
        ("curriculum", "plan educativo global · lista de participantes · resultado clínico", "plan educativo global"),
        ("findings", "resultados interpretados de un estudio · reglas del campus · hipótesis inicial", "resultados interpretados de un estudio"),
        ("efficacy", "capacidad de producir el efecto deseado · duración del curso · diversidad cultural", "capacidad de producir el efecto deseado"),
        ("cognition", "procesos mentales de pensamiento · objeto en órbita · fuente bibliográfica", "procesos mentales de pensamiento"),
        ("globalisation", "intensificación de conexiones mundiales · recuperación médica · evaluación continua", "intensificación de conexiones mundiales"),
        ("A substantial task assigned by a tutor is an ___.", "assignment · assessment method · orbit", "assignment"),
        ("Data supporting a conclusion is ___.", "evidence · empathy · dosage", "evidence"),
        ("A vehicle moving across another world's surface is a ___.", "rover · satellite · bibliography", "rover"),
        ("The central claim of an academic text is its ___.", "thesis statement · side effect · webinar", "thesis statement"),
        ("A population count is a ___.", "census · clinical trial · seminar", "census"),
        ("Scientists first ___.", "form a hypothesis"),
        ("Students must ___.", "submit an assignment"),
        ("A trial team will ___.", "measure efficacy"),
        ("Writers use sources to ___.", "support a claim"),
        ("A community project may ___.", "improve digital inclusion"),
    ],
}


READING_EX = {
    46: [
        ("Where does Daniel work?", "At a community centre."),
        ("What did he refuse two years ago?", "Support."),
        ("Who showed Daniel empathy?", "A colleague."),
        ("What did Daniel learn after seeking advice?", "Practical coping strategies."),
        ("What does he now understand about anxiety?", "That it is not a character flaw."),
        ("Complete: If he had recognised the signs, he ___ more confident today.", "would feel"),
        ("Complete: If he were more patient, he ___ more carefully.", "would have listened"),
        ("What might Daniel still avoid if his colleague had dismissed him?", "Discussing emotions."),
        ("What past action could have helped several employees?", "Offering the workshop sooner."),
        ("Which two present problems follow his earlier choices?", "Lower confidence managing pressure and poorer sleep."),
        ("Choose: *had recognised / would feel* is past→present / past→past.", "past→present"),
        ("Choose: *were more patient / would have listened* is present→past / past→present.", "present→past"),
        ("Put in order: ignored stress — colleague listened — professional advice — coping strategies.", "ignored stress → colleague listened → professional advice → coping strategies"),
        ("Does the text diagnose Daniel with a disorder?", "No; it describes stress and anxiety without giving a diagnosis."),
        ("Why is *could have received* not a present result?", "Because it refers to support before stress increased, both in the past."),
    ],
    47: [
        ("What topic did the report examine?", "Access to university education."),
        ("Which section needed the most revision?", "The introduction."),
        ("Who suggested a new outline?", "Maya."),
        ("What difference did the evidence show?", "A difference between rural and urban applicants."),
        ("What finally impressed Professor Khan?", "The report's logical argumentation."),
        ("Complete: It was the introduction ___ needed revision.", "that"),
        ("Complete: It was Maya ___ suggested an outline.", "who"),
        ("What did the student place after the methodology?", "A short discussion of limitations."),
        ("Which three source practices are mentioned?", "Paraphrasing, quoting and citing in the bibliography."),
        ("When was the revised draft submitted?", "On Friday."),
        ("Choose: the first cleft focuses a person / section.", "section"),
        ("Choose: *What the evidence showed was...* is an it-cleft / what-cleft.", "what-cleft"),
        ("Put in order: first draft — new outline — limitations — Friday submission.", "first draft → new outline → limitations → Friday submission"),
        ("Was length the feature that impressed the professor?", "No; logical argumentation impressed the professor."),
        ("Why did the introduction need revision?", "Because it lacked a precise thesis statement."),
    ],
    48: [
        ("What teaching model did the school test?", "A flipped classroom."),
        ("How long did the test last?", "One term."),
        ("What did the head teacher insist every family receive?", "Technical support."),
        ("What did the advisor urge the school to measure?", "Learning outcomes."),
        ("What did students report had increased?", "Engagement."),
        ("Complete: Teachers suggested ___ short videos.", "giving"),
        ("Complete: The head insisted ___ lending tablets.", "on"),
        ("Complete: The advisor urged the school ___ outcomes.", "to measure"),
        ("What kind of feedback should teachers provide?", "Formative feedback."),
        ("What should staff not treat as evidence of innovation?", "Screen time."),
        ("Choose: *recommended using* contains gerund / infinitive.", "gerund"),
        ("Choose: *recommended that teachers provide* names / omits the actor.", "names the actor"),
        ("Put in order: videos — family support — outcome measurement — evaluation.", "videos → family support → outcome measurement → evaluation"),
        ("Did every student prefer the new model without reservation?", "No; some missed immediate explanations."),
        ("What balanced model did the team suggest?", "Combining online resources with face-to-face instruction."),
    ],
    49: [
        ("What caused Bellford to change rapidly?", "The opening of a new rail line."),
        ("What source revealed the demographic shift?", "The latest census."),
        ("Which three areas did the report consider besides demographics?", "Employment, housing and digital connectivity."),
        ("What reached the villages before remote work increased?", "Broadband."),
        ("What must sociologists combine with figures?", "Interviews with different generations."),
        ("Complete: Never before ___ Bellford changed so rapidly.", "had"),
        ("Complete: Only after the census appeared ___ researchers identify the scale.", "did"),
        ("Complete the pair: Hardly... ___; No sooner... ___.", "when; than"),
        ("What two processes are shaping identity?", "Globalisation and urbanisation."),
        ("What must figures not be used to do?", "Stereotype residents."),
        ("Choose: *Only after...did researchers identify* inverts subordinate / main clause.", "main clause"),
        ("Choose: *Only by interviewing* expresses person / method.", "method"),
        ("Put in order: rail line — migration — census — interviews.", "rail line → migration → census → interviews"),
        ("Does the report attribute change to one cause?", "No; it explicitly says social trends seldom have a single cause."),
        ("Why is *Never before had Bellford changed* not a question?", "It is a declarative sentence with emphatic inversion."),
    ],
    50: [
        ("What will the partnership have completed by June?", "A project on digital access and student wellbeing."),
        ("How many communities took part?", "Three."),
        ("What do students not have to print?", "Their reports."),
        ("What did the student interviews reveal?", "A connection between anxiety and digital exclusion."),
        ("Who will analyse the data independently?", "An independent group."),
        ("Complete: The programme is believed ___ engagement.", "to have improved"),
        ("Complete: If the university had invested, more learners ___ broadband now.", "would have"),
        ("Complete: It was the interviews ___ revealed the connection.", "that"),
        ("What did the lecturer suggest?", "Using a flipped classroom."),
        ("What did the advisor urge teachers to provide?", "Technical support."),
        ("Choose: *will have completed* belongs to U44 / U45.", "U44"),
        ("Choose: *might influence* is certainty / possibility.", "possibility"),
        ("Put in order: investment gap — project — interviews — independent analysis.", "investment gap → project → interviews → independent analysis"),
        ("Why does the team avoid the word *breakthrough*?", "Because independent analysis has not yet been completed."),
        ("Name four unit families in the text.", "Any four of passive reporting, obligation, Future Perfect, deduction, mixed conditionals, clefts, reporting verbs and inversion."),
    ],
}


LISTENING_EX = {
    46: [
        ("Who is speaking?", "Dr Evans."),
        ("What does resilience not mean?", "Ignoring difficult emotions."),
        ("What did Maya's manager show?", "Empathy."),
        ("What can support wellbeing?", "A strong social network."),
        ("What does Maya now challenge?", "Unhelpful beliefs."),
        ("Complete: If people had learned strategies, they ___ stress better today.", "would manage"),
        ("Complete: If Maya were less aware, she ___ the mistake.", "might have repeated"),
        ("Complete: If the manager had dismissed her, she ___ pressure now.", "could still be experiencing"),
        ("What did the manager encourage Maya to do?", "Seek help."),
        ("What might have increased if Maya had coped alone?", "Her anxiety."),
        ("Choose: *were less aware / might have repeated* is present→past / past→present.", "present→past"),
        ("Choose: *had dismissed / could be experiencing* is mixed / third conditional.", "mixed conditional"),
        ("Put in order: manager's empathy — help — coping support — changed beliefs.", "manager's empathy → help → coping support → changed beliefs"),
        ("Does a social network replace professional care?", "No."),
        ("Which two psychological skills are explicit?", "Self-awareness and coping with stress."),
    ],
    47: [
        ("Who is speaking?", "Professor Khan."),
        ("What needs a clearer thesis statement?", "The dissertation."),
        ("Which section confused the professor?", "The methodology section."),
        ("Who collected the original data?", "Dr Lewis."),
        ("When is the new draft due?", "Monday."),
        ("Complete: What the table shows ___ a gradual decline.", "is"),
        ("Complete: It was Dr Lewis ___ collected the data.", "who"),
        ("Complete: What I want you to do ___ revise the outline.", "is"),
        ("Where should the student cite Dr Lewis?", "In the paragraph and bibliography."),
        ("What writing skill impressed the professor?", "Careful paraphrasing."),
        ("Choose: *not the results* contrasts person / section.", "section"),
        ("Choose: *It wasn't until the final page* signals early / late.", "late"),
        ("Put in order: outline — introduction — evidence check — Monday submission.", "outline → introduction → evidence check → Monday submission"),
        ("Did the commentary describe the table accurately?", "No; it called a gradual decline a sudden fall."),
        ("Which three criteria should the student preserve?", "Formal register, evidence for claims and correct source citation."),
    ],
    48: [
        ("Who is speaking?", "Professor Chen."),
        ("What did teachers want to introduce?", "Gamification."),
        ("What did Chen recommend testing first?", "One real-world task."),
        ("Who had to attend training?", "Every teacher."),
        ("What did Chen urge the technology team to protect?", "Student data."),
        ("Complete: Teachers suggested ___ gamification.", "introducing"),
        ("Complete: The report recommended that the school ___ outcomes.", "define"),
        ("Complete: The principal insisted ___ providing time.", "on"),
        ("What did parents suggest offering?", "A webinar."),
        ("What did students want to preserve?", "Face-to-face discussion."),
        ("Choose: *insisted that every teacher attend* uses base / third-person -s.", "base"),
        ("Choose: *urged the team to protect* includes / omits an object.", "includes an object"),
        ("Put in order: gamification proposal — outcomes — training — student feedback.", "gamification proposal → outcomes → training → student feedback"),
        ("Why should the webinar be recorded?", "For families unable to attend live."),
        ("What warning qualifies the proposals?", "Novelty should not be confused with effective pedagogy."),
    ],
    49: [
        ("Who is speaking?", "Dr Williams."),
        ("What do census figures reveal?", "Useful trends."),
        ("How many age groups were compared?", "Three."),
        ("Who reported weaker connectivity?", "Older residents."),
        ("What began to rise after volunteers offered support?", "Confidence."),
        ("Complete: Rarely ___ census figures tell the whole story.", "do"),
        ("Complete: Only after comparison ___ researchers recognise the gap.", "did"),
        ("Complete: Not only ___ younger residents use services...", "did"),
        ("What programme did the council launch?", "A digital inclusion programme."),
        ("What two evidence sources should researchers combine?", "Statistics and interviews."),
        ("Choose: *Hardly...when* describes immediate / distant events.", "immediate events"),
        ("Choose: *Never should a survey be used* expresses caution / permission.", "caution"),
        ("Put in order: comparison — generation gap — programme — volunteer support.", "comparison → generation gap → programme → volunteer support"),
        ("Can one survey define an entire community?", "No."),
        ("Which three themes interact?", "Technology, migration and cultural identity."),
    ],
    50: [
        ("Who is speaking?", "Dr Lee."),
        ("When will learners have reviewed the module?", "By Friday."),
        ("What matters more than decorative complexity?", "Accurate choice."),
        ("Who suggested retrieval tasks?", "The students."),
        ("What practice did the advisor request?", "Speaking practice."),
        ("Complete: By Friday, you ___ nine families.", "will have reviewed"),
        ("Complete: If I had known, I ___ them earlier.", "would have introduced"),
        ("Complete: It was the students ___ suggested the tasks.", "who"),
        ("What did the team insist every model show?", "The target structure."),
        ("What has not made confidence grow?", "Passive rereading alone."),
        ("Choose: *may be reported* expresses passive / obligation.", "passive"),
        ("Choose: *must support* expresses requirement / deduction.", "requirement"),
        ("Put in order: classify clue — complete chain — correct error — transfer.", "classify clue → complete chain → correct error → transfer"),
        ("Does Dr Lee recommend complexity for its own sake?", "No."),
        ("What three final actions does Dr Lee prescribe?", "Explain each clue, correct each chain and transfer it."),
    ],
}


WRITING = {
    46: [
        ("Completa: *If I ___ (study) psychology, I would understand this now.*", "If I **had studied** psychology, I would understand this now."),
        ("Corrige: *If she were calmer, she would handled the meeting yesterday.*", "If she were calmer, she **would have handled** the meeting yesterday."),
        ("Clasifica: *If they had called, I would have answered.*", "**Third conditional**: condición y resultado están en el pasado."),
        ("Contrasta pasado→presente y presente→pasado con *patient*.", "Modelo: If he **had practised patience**, he would communicate better now. If he **were more patient**, he would have listened yesterday."),
        ("Corrige: *If I had knew, I might be helping now.*", "If I **had known**, I might be helping now."),
        ("Escribe 35–45 palabras con *had recognised, would feel, coping strategy*.", "Modelo: If Daniel **had recognised** his stress earlier, he **would feel** more confident today. He now uses a breathing exercise as a **coping strategy** and seeks support when pressure begins to affect his sleep or concentration at work."),
        ("Redacta 35–45 palabras con *were, would have, empathy*.", "Modelo: If the manager **were** more empathetic, he **would have listened** carefully during yesterday's meeting. Greater **empathy** would not solve every problem, but it could have helped him understand why the team needed practical support and a safer discussion."),
        ("Escribe 45–55 palabras contrastando mixed y third conditional.", "Modelo: If Maya had attended the workshop, she **would manage** pressure better now; this mixed conditional connects past and present. If she had attended, she **would have learned** two strategies that day; this third conditional keeps both unreal events in the past and evaluates one missed opportunity."),
        ("Escribe 50–60 palabras con *cognition, belief, self-awareness, anxiety, seek help*.", "Modelo: **Cognition** influences how we interpret an event, while a fixed **belief** can distort that interpretation. Developing **self-awareness** helps a person notice repeated reactions. If persistent **anxiety** disrupts daily life and emotional balance, they may choose to **seek help** from a qualified professional instead of treating distress as a personal failure."),
        ("Escribe 100–120 palabras sobre una decisión y sus efectos. Incluye tres mixed de cada dirección, dos terceros condicionales y ocho términos U46.", "Modelo: Daniel once ignored severe **stress** because he believed that requesting support showed weakness. If he **had recognised** the pattern, he **would use** healthier **coping strategies** now. If his colleague **had dismissed** him, Daniel **might still avoid** discussing his **emotions**. If the centre **had offered** training, staff **could feel** safer today. Daniel is impatient; if he **were** more reflective, he **would have noticed** his **anxiety** sooner. If he had greater **self-awareness**, he **would have challenged** that harmful **belief**. If his manager showed more **empathy**, he **might have listened** better. If Daniel **had refused** all help, his stress **would have increased**. If the team **had trained** earlier, they **would have responded** more constructively."),
    ],
    47: [
        ("Enfatiza a Maya: *Maya revised the report.*", "**It was Maya who revised the report.**"),
        ("Enfatiza la sección: *The methodology caused confusion.*", "**It was the methodology that caused confusion.**"),
        ("Transforma: *Clear evidence matters most.*", "**What matters most is clear evidence.**"),
        ("Corrige: *What surprised me it was the conclusion.*", "**What surprised me was the conclusion.**"),
        ("Enfatiza el retraso: *They submitted only on Friday.*", "**It wasn't until Friday that they submitted.**"),
        ("Escribe 35–45 palabras con dos it-clefts y *thesis statement*.", "Modelo: **It was the introduction that** lacked focus, and **it was Maya who** proposed a solution. She placed a precise **thesis statement** in the opening paragraph so readers could identify the report's central claim before examining its evidence."),
        ("Redacta 35–45 palabras con dos what-clefts y *evidence*.", "Modelo: **What the table shows is** a gradual decline. **What the writer must explain is** why that pattern matters. Reliable **evidence** supports the interpretation, while careful wording prevents the report from claiming more than the available data can demonstrate."),
        ("Escribe 45–55 palabras enfocando persona, lugar, tiempo y razón.", "Modelo: **It was Dr Lewis who** collected the data. **It was in the library that** Maya found the missing source. **It was on Friday that** she revised the bibliography, and **it was because of an incorrect citation that** the supervisor requested one final change before accepting the report."),
        ("Escribe 50–60 palabras con *outline, draft, paraphrase, cite, bibliography*.", "Modelo: Begin with an **outline** that orders each claim and its evidence. In the first **draft**, mark every borrowed idea. **Paraphrase** accurately instead of replacing only a few words, and **cite** the original author. Before submission, compare all in-text references with the **bibliography** and correct any missing publication details before sending it."),
        ("Escribe 100–120 palabras como comentario de tutor. Incluye cuatro it-clefts, cuatro what-clefts y diez términos U47.", "Modelo: **What your report needs is** a clearer **thesis statement**. **It is the introduction that** should define the question, and **it was the second paragraph that** first presented useful **evidence**. **What the table shows is** a gradual trend, not a sudden change. **It was Dr Lewis who** collected those data, so **cite** her study and add it to the **bibliography**. **What strengthens your argumentation is** the careful way you **paraphrase** each source. **It is the conclusion that** currently introduces a new claim; move that point into the main discussion. **What I recommend is** revising the **outline** before editing the **draft**. Preserve the **formal register**, verify each **quotation** and submit the revised **report** on Monday."),
    ],
    48: [
        ("Completa: *The expert suggested ___ (use) shorter videos.*", "The expert suggested **using** shorter videos."),
        ("Reescribe con sujeto: *The report recommended more training.*", "The report **recommended that teachers attend more training**."),
        ("Corrige: *She insisted to provide tablets.*", "She **insisted on providing** tablets."),
        ("Completa la negativa: *They insisted that we ___ leave.*", "They insisted that we **not** leave."),
        ("Corrige: *The advisor urged they attending.*", "The advisor **urged them to attend**."),
        ("Escribe 35–45 palabras con *suggest using, recommend that, EdTech*.", "Modelo: Teachers **suggested using EdTech** for short retrieval tasks. The evaluation team **recommended that the school measure** learning outcomes before expanding the programme, because a new platform is useful only when it serves a clear pedagogical purpose."),
        ("Redacta 35–45 palabras con *insist on, insist that, training*.", "Modelo: The principal **insisted on providing training** before the launch. She also **insisted that every teacher attend** two practical sessions, test the platform with colleagues and report any accessibility problems before students began using it in class."),
        ("Escribe 45–55 palabras con *urge + objeto + to*, una negativa y *student data*.", "Modelo: The advisor **urged the technology team to encrypt student data** and **urged teachers not to share** personal records through ordinary email. She explained that digital tools can support learning only when schools protect privacy, restrict access and tell families exactly how information will be stored and used."),
        ("Escribe 50–60 palabras con *flipped classroom, hands-on, formative feedback, engagement, outcomes*.", "Modelo: A **flipped classroom** moves introductory content outside class and reserves shared time for **hands-on learning**. Teachers provide **formative feedback** while students complete practical tasks. This may improve **engagement**, but the school must measure learning **outcomes**, access and participation before concluding that the model is more effective for every learner in practice."),
        ("Escribe 100–120 palabras como informe de innovación. Incluye tres gerundios, tres that-clauses, dos *insist* y dos *urge*, más diez términos U48.", "Modelo: Teachers **suggested introducing** a **flipped classroom** and **recommended using EdTech** for short preparation videos. They also **suggested designing** a **real-world task** for each topic. The evaluation report **recommended that the school measure** learning outcomes and **insisted that teachers provide** **formative feedback**. The principal **insisted on offering** practical **training** before the launch. An accessibility advisor **urged staff to lend** devices to learners who needed them and **urged the technology team to protect** student data. Parents **recommended that the school record** each **webinar**. Students valued **hands-on learning** and face-to-face discussion. The project may boost **student engagement**, but effective **pedagogy** requires evidence, not novelty alone."),
    ],
    49: [
        ("Invierte: *I have never seen such rapid change.*", "**Never have I seen such rapid change.**"),
        ("Invierte: *We seldom observe this trend.*", "**Seldom do we observe this trend.**"),
        ("Corrige: *Only then did researchers understood.*", "**Only then did researchers understand.**"),
        ("Une con *not only*: population grew; identity changed.", "**Not only did the population grow, but identity changed too.**"),
        ("Completa: *No sooner had broadband arrived ___ remote work increased.*", "No sooner had broadband arrived **than** remote work increased."),
        ("Escribe 35–45 palabras con *never, seldom, demographics*.", "Modelo: **Never have local demographics changed** so quickly. **Seldom do researchers attribute** such a shift to one cause, so the report compares migration, employment and housing before explaining how the population's age profile has developed since the railway opened."),
        ("Redacta 35–45 palabras con *only after, only by, census*.", "Modelo: **Only after the census was published did analysts identify** the trend. **Only by interviewing residents can they explain** why it occurred, because population figures reveal scale but cannot show how different generations interpret the change."),
        ("Escribe 45–55 palabras con *not only, not until, diversity*.", "Modelo: **Not only did migration increase diversity, but it also changed** local services. **Not until researchers compared neighbourhoods did they recognise** how uneven the effects were. Some communities gained transport and employment, whereas others faced higher housing costs, weaker access to public facilities or fewer benefits."),
        ("Escribe 50–60 palabras con *hardly...when, no sooner...than, trend, fad*.", "Modelo: **Hardly had one online platform become a trend when** a competing service attracted younger users. **No sooner had researchers labelled the first change a lasting trend than** participation declined. The episode showed why a brief **fad** should not be treated as permanent social change without evidence collected over a longer period."),
        ("Escribe 100–120 palabras sobre un cambio social. Incluye ocho inversiones distintas y diez términos U49.", "Modelo: **Never before had the community experienced** such rapid **social change**. **Rarely do demographics reveal** one simple cause. **Only after the census appeared did researchers identify** increased **migration** and **urbanisation**. **Not only had the population grown, but diversity had increased too**. **Seldom did older residents describe** the shift in the same way as younger groups. **Hardly had broadband reached** the villages **when** remote work expanded. **No sooner had a digital inclusion programme begun than** every place was filled. **Only by combining interviews and statistics can sociologists explain** how **globalisation**, a changing **generation gap** and local **traditions** shape **identity**. Under no circumstances should one striking **trend** be used to stereotype an entire **society**."),
    ],
    50: [
        ("Completa U41: *Students enjoy ___ (study) together.*", "Students enjoy **studying** together."),
        ("Transforma U42: *People believe the method works.*", "**The method is believed to work.**"),
        ("Contrasta U43: opcional / prohibido.", "Modelo: You **don't have to attend** the optional webinar. You **mustn't plagiarise** its transcript."),
        ("Completa U44–46: *By June... / It must... / If we had...*", "Modelo: By June, we **will have finished**. It **must be** reliable. If we had invested, access **would be** better now."),
        ("Transforma U47–49: foco / propuesta / inversión.", "Modelo: **It was Maya who** proposed it. She **suggested testing** it. **Only then did we agree**."),
        ("Escribe 35–45 palabras con una estructura de U41, U42 y U43.", "Modelo: Students **enjoy working** in seminars, and the method **is believed to improve** engagement. They **must cite** every source, but they **don't have to print** the final report because the university accepts secure digital submissions on time."),
        ("Redacta 35–45 palabras con una estructura de U44, U45 y U46.", "Modelo: By June, researchers **will have analysed** the evidence. The result **might have been influenced** by access. If the university **had invested** earlier, rural learners **would have** more reliable broadband now and could participate more confidently."),
        ("Escribe 45–55 palabras con una estructura de U47, U48 y U49.", "Modelo: **What the interviews revealed was** a serious access gap. The advisor **recommended that the university provide** technical support. **Only after the team compared rural and urban responses did it understand** how infrastructure, cost, confidence and persistence combined to influence participation in the online learning programme."),
        ("Escribe 50–60 palabras conectando ocho términos de cuatro temas del módulo.", "Modelo: The **curriculum** requires each student to submit an **assignment** that cites scientific **evidence** and interprets the **findings**. One report measures treatment **efficacy**; another examines **cognition** and **empathy**. A third uses a **census** to explain how migration, digital access and globalisation may shape community identity and preserve a clear formal register."),
        ("Escribe 100–120 palabras como cierre del módulo. Incluye al menos una estructura de cada U41–49 y quince términos del bloque.", "Modelo: Students **enjoy analysing** how education affects society. The project **is believed to have improved** **student engagement**, and everyone **must cite** reliable **evidence**. By Friday, the team **will have published** its **findings**. The rural sample **might have faced** weaker **broadband** access. If the university **had invested** earlier, participation **would be** higher now. **What the interviews revealed was** a link between **anxiety** and digital exclusion. **It was Maya who** drafted the **thesis statement**. She **suggested using** shorter surveys, and the advisor **urged researchers to include** older residents. **Never had the team expected** such varied **demographics**. The final **report** connects **curriculum**, **efficacy**, **cognition**, **empathy**, **migration**, **identity** and **globalisation** without claiming that one factor explains every community."),
    ],
}


SPEAKING = {
    46: [
        ("Pronuncia las tres líneas temporales.", "Guion modelo: **If I had trained, I would be calmer now. If I were calmer, I would have answered better. If I had trained, I would have answered better.**"),
        ("Explica pasado→presente en 30 segundos.", "Guion modelo: The condition did not happen in the past, but its consequence belongs to now: **If she had sought help, she would feel better today**."),
        ("Role-play entre colega y trabajador.", "A: Why are you coping better? B: If you hadn't shown empathy, I **might still avoid** discussing stress. A: I'm glad you sought support."),
        ("Contrasta *would, could, might*.", "Guion modelo: **Would** presents the expected unreal result, **could** adds ability or possibility, and **might** makes the consequence less certain."),
        ("Habla 60 segundos sobre una decisión y bienestar con seis condicionales y ocho términos U46.", "Pistas: tres direcciones · now/yesterday · would/could/might · cognition · belief · empathy · anxiety · self-awareness · resilience · coping strategy · seek help."),
    ],
    47: [
        ("Pronuncia cuatro focos con it-clefts.", "Guion modelo: **It was Maya who wrote it. It was the introduction that changed. It was in May that we began. It was because of the deadline that we rushed.**"),
        ("Explica it-cleft / what-cleft en 30 segundos.", "Guion modelo: An **it-cleft** selects a specific element. A **what-cleft** opens a category and identifies it after *be*: **What matters is evidence**."),
        ("Role-play de feedback académico.", "A: Which section needs work? B: **It is the methodology that** needs revision. A: What is the priority? B: **What matters most is** clearer evidence."),
        ("Contrasta oración neutra y foco.", "Guion modelo: **Dr Lewis collected the data** is neutral. **It was Dr Lewis who collected the data** contrasts Dr Lewis with another possible researcher."),
        ("Presenta un informe durante 60 segundos con ocho clefts y ocho términos U47.", "Pistas: cuatro it-clefts · cuatro what-clefts · introduction · thesis statement · outline · draft · evidence · citation · bibliography · conclusion."),
    ],
    48: [
        ("Pronuncia los cuatro marcos centrales.", "Guion modelo: **suggest using; recommend that teachers attend; insist on staying; insist that we stay; urge schools to act**."),
        ("Explica gerundio / that-clause en 30 segundos.", "Guion modelo: Use a gerund without an internal subject: **recommend testing**. Name the actor with a clause: **recommend that the school test**."),
        ("Role-play de innovación docente.", "A: What do you suggest? B: I **suggest trying** one real-world task. A: What does the report say? B: It **urges us to measure** outcomes."),
        ("Distingue recomendación e insistencia.", "Guion modelo: **Recommend** presents advisable action. **Insist** communicates a stronger demand: The principal **insisted that everyone attend**."),
        ("Presenta un plan durante 60 segundos con diez reportes y ocho términos U48.", "Pistas: suggest/recommend + -ing · three that-clauses · insist on/that · two urge patterns · EdTech · flipped classroom · hands-on · webinar · gamification · feedback · engagement · outcomes."),
    ],
    49: [
        ("Pronuncia cuatro inversiones con auxiliares distintos.", "Guion modelo: **Never have I seen; seldom do we witness; rarely does society change; little did we know.**"),
        ("Explica *only when* en 30 segundos.", "Guion modelo: The clause after **only when** keeps normal order. The main clause inverts: **Only when the census appeared did we understand**."),
        ("Role-play entre analista y periodista.", "A: When did you identify the trend? B: **Only after the census appeared did we recognise it**. A: Was there one cause? B: **Rarely do trends have one cause**."),
        ("Contrasta los pares temporales.", "Guion modelo: **Hardly had the programme begun when** places filled. **No sooner had it begun than** volunteers requested more sessions."),
        ("Analiza 60 segundos un cambio social con ocho inversiones y ocho términos U49.", "Pistas: never/seldom/only/not only/not until/hardly/no sooner/under no circumstances · census · demographics · migration · diversity · urbanisation · globalisation · identity · trend."),
    ],
    50: [
        ("Clasifica oralmente las nueve familias.", "Guion modelo: **pattern, attribution, rule, deadline, evidence, unreal time link, focus, reported proposal, frontal trigger** correspond to U41–49."),
        ("Explica cómo eliges una respuesta en 30 segundos.", "Guion modelo: I identify the function and time, build the whole chain, then compare options and reject any form that changes the intended meaning."),
        ("Role-play de revisión entre estudiante y tutor.", "A: I wrote *Never I have seen*. B: The frontal negative triggers inversion: **Never have I seen**. Now create a new example."),
        ("Conecta cuatro redes léxicas.", "Guion modelo: A **curriculum** sets an **assignment**; a trial produces **findings**; **cognition** shapes beliefs; a **census** reveals demographic trends."),
        ("Resume el módulo durante 90 segundos con una estructura de cada U41–49 y quince términos.", "Pistas: usa el mismo inventario del writing 10; marca nueve estructuras en tus notas y comprueba cada una al terminar."),
    ],
}


def install_data() -> None:
    """Point the shared renderer at this generator's unit data."""
    PATTERN.DATE = DATE
    PATTERN.HUB = HUB
    PATTERN.META = META
    PATTERN.READING = READING
    PATTERN.LISTENING = LISTENING
    PATTERN.GRAMMAR = GRAMMAR
    PATTERN.VOCAB = VOCAB
    PATTERN.READING_EX = READING_EX
    PATTERN.LISTENING_EX = LISTENING_EX
    PATTERN.WRITING = WRITING
    PATTERN.SPEAKING = SPEAKING
    PATTERN.VAGUE_PATTERNS = PATTERN.VAGUE_PATTERNS + (
        "find the answer",
        "open answer",
        "respuesta personal sin modelo",
    )


def validate_source_data() -> None:
    model_length_errors = []
    for unit in range(46, 51):
        assert sum(len(group[2]) for group in GRAMMAR[unit]) == 15
        assert len(VOCAB[unit]) == 15
        assert len(READING_EX[unit]) == 15
        assert len(LISTENING_EX[unit]) == 15
        assert len(WRITING[unit]) == 10
        assert len(SPEAKING[unit]) == 5
        for exercise, (prompt, answer) in enumerate(WRITING[unit], 1):
            target = re.search(r"(\d+)[–-](\d+) palabras", prompt)
            if not target:
                continue
            minimum, maximum = map(int, target.groups())
            model = answer.removeprefix("Modelo:")
            word_count = len(
                re.findall(
                    r"[A-Za-zÀ-ÿ0-9€]+(?:['’-][A-Za-zÀ-ÿ0-9€]+)*",
                    model,
                )
            )
            if not minimum <= word_count <= maximum:
                model_length_errors.append(
                    f"U{unit} writing {exercise}: {word_count} not {minimum}–{maximum}"
                )
    assert not model_length_errors, "; ".join(model_length_errors)


def render_unit(unit: int) -> str:
    content = PATTERN.render_unit(unit)
    directive_replacements = {
        "Complete:": "Completa:",
        "Choose:": "Elige:",
        "Put in order:": "Ordena:",
        "Choose the third conditional.": "Elige el tercer condicional.",
        "Choose the strongest call to action.": "Elige el llamamiento más fuerte.",
        "Choose the sentence with no inversion.": "Elige la oración sin inversión.",
        "Choose the correct pair.": "Elige la pareja correcta.",
        "Complete the anterior report:": "Completa el reporte anterior:",
        "Complete the pair:": "Completa la pareja:",
        "Name four unit families in the text.": "Nombra cuatro familias de unidades presentes en el texto.",
    }
    for english, spanish in directive_replacements.items():
        content = content.replace(english, spanish)
    if unit == 50:
        content = content.replace(
            "3. Continúa con [](/blog/curso-b2/).",
            "3. Continúa en la [Unidad 51 del curso B2](/curso-b2/unit-51) cuando quieras avanzar.",
        ).replace(
            "- [Cuaderno siguiente](/blog/curso-b2/)\n",
            "- [Continuar con Unidad 51](/curso-b2/unit-51)\n",
        )
    return content


def make_audios() -> None:
    for unit in range(46, 51):
        directory = ROOT / f"public/audio/blog/curso-b2/unit-{unit}"
        directory.mkdir(parents=True, exist_ok=True)
        for name, text in (
            ("reading-workbook", READING[unit]),
            ("listening-workbook", LISTENING[unit]),
        ):
            path = directory / f"{name}.mp3"
            if path.exists():
                print("kept", path.relative_to(ROOT), "bytes", path.stat().st_size)
                continue
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))
            assert path.stat().st_size > 0


def main() -> None:
    install_data()
    validate_source_data()
    OUT.mkdir(parents=True, exist_ok=True)
    for unit in range(46, 51):
        path = OUT / f"{META[unit]['slug']}-ejercicios-soluciones.md"
        content = render_unit(unit)
        PATTERN.validate_rendered(unit, content)
        path.write_text(content, encoding="utf-8")
        words = len(content.split())
        print(
            "wrote",
            path.relative_to(ROOT),
            "words",
            words,
            "lessons=5",
            "details=15",
            "vague_flags=0",
        )
    make_audios()
    print("done B2 U46–50 workbooks")


if __name__ == "__main__":
    main()
