#!/usr/bin/env python3
"""Generate B2 Units 31–35 exercise workbooks and workbook TTS.

The workbooks follow the B2 U26–30 structure and the B1 U27 clarity model:
Spanish instructions, closed practice, complete answer keys, reading/listening
comprehension, and explicit models for writing and speaking.
"""
from __future__ import annotations

from pathlib import Path

from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/content/blog/curso-b2"
DATE = "2026-08-31"
HUB = "ingles-b2"

META = {
    31: {
        "slug": "unidad-31-articles-advanced-education",
        "title": "Articles Advanced & Education",
        "full": "A/An, The, Zero Article + Education Extended",
        "focus": "a/an, the y artículo cero con referencias, instituciones y nombres generales",
        "vocab": "Education extended",
        "image": "/blog/curso-b2/unit-31/articles-map.png",
        "prev": "unidad-30-repaso-26-29-ejercicios-soluciones",
        "next": "unidad-32-quantifiers-environment-ejercicios-soluciones",
        "next_title": "Unidad 32 — Quantifiers & Environment",
        "reading_title": "From enrolment to graduation",
        "listening_title": "A lecturer explains his programme",
        "related": [
            "unidad-31-articles-advanced-education",
            "unidad-32-quantifiers-environment",
            "unidad-35-repaso-31-34",
            HUB,
        ],
        "remember": [
            "**A/an** presenta un singular contable o una profesión: *a degree, an expert*.",
            "**The** identifica una referencia: *the exam, the first semester, the UK*.",
            "Usa artículo cero para plurales o abstractos generales: *attend classes, conduct research*.",
            "La función institucional contrasta con el edificio: *at university* / *at the university*.",
        ],
        "keywords": [
            "a an the zero article ejercicios B2",
            "at university vs at the university práctica",
            "artículos avanzados inglés B2",
            "education vocabulary B2 ejercicios",
        ],
    },
    32: {
        "slug": "unidad-32-quantifiers-environment",
        "title": "Quantifiers & Environment",
        "full": "All, Most, Each, Every, Both + Environment Extended",
        "focus": "all, most, each, every, both, patrones con of y concordancia",
        "vocab": "Environment extended",
        "image": "/blog/curso-b2/unit-32/quantifiers-map.png",
        "prev": "unidad-31-articles-advanced-education-ejercicios-soluciones",
        "next": "unidad-33-regret-remember-forget-feelings-ejercicios-soluciones",
        "next_title": "Unidad 33 — Regret, Remember, Forget",
        "reading_title": "Two organisations, one wetland",
        "listening_title": "Elena reports on a conservation project",
        "related": [
            "unidad-32-quantifiers-environment",
            "unidad-31-articles-advanced-education",
            "unidad-33-regret-remember-forget-feelings",
            "unidad-35-repaso-31-34",
            HUB,
        ],
        "remember": [
            "**All** incluye el 100 %; **most**, una mayoría con excepciones.",
            "**Each/every + singular**; **both + plural** para exactamente dos.",
            "Con grupo definido: *most of the water, each of the volunteers*.",
            "El patrón correcto es *most rivers are* o *most of the river is*, nunca *most river is*.",
        ],
        "keywords": [
            "all most each every both ejercicios B2",
            "each vs every práctica B2",
            "most of the quantifiers ejercicios",
            "environment vocabulary B2 ejercicios",
        ],
    },
    33: {
        "slug": "unidad-33-regret-remember-forget-feelings",
        "title": "Regret, Remember, Forget & Feelings",
        "full": "Regret, Remember, Forget + Gerund/Infinitive + Feelings Extended",
        "focus": "regret, remember y forget con -ing o to-infinitive según el significado",
        "vocab": "Feelings extended",
        "image": "/blog/curso-b2/unit-33/verb-patterns-map.png",
        "prev": "unidad-32-quantifiers-environment-ejercicios-soluciones",
        "next": "unidad-34-state-verbs-technology-ejercicios-soluciones",
        "next_title": "Unidad 34 — State Verbs & Technology",
        "reading_title": "The interview attachment",
        "listening_title": "Tom apologises to a colleague",
        "related": [
            "unidad-33-regret-remember-forget-feelings",
            "unidad-32-quantifiers-environment",
            "unidad-34-state-verbs-technology",
            "unidad-35-repaso-31-34",
            HUB,
        ],
        "remember": [
            "**Regret doing** lamenta el pasado; **regret to inform** comunica malas noticias ahora.",
            "**Remember doing** conserva un recuerdo; **remember to do** cumple una tarea.",
            "**Forget to do** = la acción no ocurrió; **forget doing** = ocurrió, pero no se recuerda.",
            "Para lamentar una omisión, coloca *not* antes de *-ing*: *regret not apologising*.",
        ],
        "keywords": [
            "regret remember forget ejercicios B2",
            "remember doing vs remember to do práctica",
            "forget doing vs forget to do ejercicios",
            "feelings vocabulary B2 ejercicios",
        ],
    },
    34: {
        "slug": "unidad-34-state-verbs-technology",
        "title": "State Verbs & Technology",
        "full": "State Verbs in Simple Forms + Technology Extended",
        "focus": "like, know, believe, want y otros state verbs en sus usos de estado",
        "vocab": "Technology extended",
        "image": "/blog/curso-b2/unit-34/state-verbs-map.png",
        "prev": "unidad-33-regret-remember-forget-feelings-ejercicios-soluciones",
        "next": "unidad-35-repaso-31-34-ejercicios-soluciones",
        "next_title": "Unidad 35 — Repaso 31–34",
        "reading_title": "A secure app launch",
        "listening_title": "Sarah describes her technology work",
        "related": [
            "unidad-34-state-verbs-technology",
            "unidad-33-regret-remember-forget-feelings",
            "unidad-35-repaso-31-34",
            HUB,
        ],
        "remember": [
            "En sus significados objetivo, **like, know, believe, want** y **understand** van en simple.",
            "*Now* no obliga al continuo: *I understand now; the app needs an update*.",
            "Preguntas y negaciones usan *do/does*: *Does she know? She doesn't remember*.",
            "Las acciones dinámicas sí admiten continuo: *The team is testing the app*.",
        ],
        "keywords": [
            "state verbs ejercicios B2",
            "like know believe want no continuous",
            "stative verbs simple continuous práctica",
            "technology vocabulary B2 ejercicios",
        ],
    },
    35: {
        "slug": "unidad-35-repaso-31-34",
        "title": "Repaso 31–34",
        "full": "Articles, Quantifiers, Verb Patterns & State Verbs",
        "focus": "artículos, cuantificadores, patrones de regret/remember/forget y state verbs",
        "vocab": "Education, Environment, Feelings y Technology",
        "image": "/blog/curso-b2/unit-35/review-map.png",
        "prev": "unidad-34-state-verbs-technology-ejercicios-soluciones",
        "next": "unidad-31-articles-advanced-education-ejercicios-soluciones",
        "next_title": "Repasar Unidad 31 — Articles & Education",
        "reading_title": "The biodiversity data project",
        "listening_title": "James presents a campus initiative",
        "related": [
            "unidad-35-repaso-31-34",
            "unidad-31-articles-advanced-education",
            "unidad-32-quantifiers-environment",
            "unidad-33-regret-remember-forget-feelings",
            "unidad-34-state-verbs-technology",
            HUB,
        ],
        "remember": [
            "Etiqueta primero el hueco: **artículo, cantidad, patrón verbal o estado/acción**.",
            "Revisa concordancia: *each team has* frente a *both teams have*.",
            "Decide si la acción ocurrió antes de elegir *-ing* o *to + infinitive*.",
            "Mantén los chunks léxicos completos: *conduct research, raise awareness, set a password*.",
        ],
        "keywords": [
            "repaso inglés B2 unidades 31 34",
            "articles quantifiers verb patterns B2",
            "regret remember forget state verbs review",
            "repaso módulo 4 B2 ejercicios",
        ],
    },
}

READING = {
    31: (
        "Nora took a gap year before going to university in Oxford. She then enrolled in a degree "
        "in environmental engineering. During the first semester, a supervisor helped her choose "
        "a major and prepare a reading list. Nora attended lectures, conducted research and always "
        "met her deadlines. In the final year, she wrote a dissertation about digital learning. "
        "The dissertation earned a distinction, so her supervisor encouraged her to pursue a "
        "postgraduate degree. Nora obtained the degree in June, and the graduation ceremony was "
        "held at the university library. Her parents visited the university for the event. Nora "
        "now works as an education researcher and delivers a lecture to new students every autumn."
    ),
    32: (
        "Both local organisations work in the same wetland reserve. All the volunteers receive "
        "training, and each volunteer monitors one habitat. Most of the water is potable, but "
        "pollutants still pose a threat to two rivers. Every three hours, sensors record water "
        "quality. Most residents support renewable energy, and both councils have agreed to take "
        "responsibility for conservation. Every project also includes a campaign to raise awareness "
        "of biodiversity. Last year, all the schools in the area joined one campaign, although most "
        "of the businesses only supported it online. The organisations believe that each small "
        "action has an impact. Together, they are trying to strike a balance between public access "
        "and the protection of endangered species."
    ),
    33: (
        "I remember feeling anxious before an important interview. My sister told me not to bottle "
        "up my feelings, but I regret ignoring her advice. On the morning of the interview, I forgot "
        "to attach one document to my email. I remembered to thank the interviewer for letting me "
        "send it later, yet I spent the afternoon feeling frustrated and ashamed. I will never "
        "forget reading the final message: I had obtained the job. I was overjoyed and grateful for "
        "the second chance. I only regret not trusting myself sooner. I also remember apologising "
        "to my sister for losing my temper the previous week. She felt relieved, and neither of us "
        "wanted to bear a grudge."
    ),
    34: (
        "Mina is a programmer who knows how to debug mobile apps. She believes a new security "
        "feature is necessary because users value data privacy. The software needs an update, and "
        "the team wants to deploy it before Friday. Mina understands the risk of a data breach and "
        "prefers encrypted cloud storage. She loves the clean interface but hates one recurring "
        "bug. Everyone hopes the launch will succeed. While Mina is testing the wireless connection, "
        "another developer is making a backup and updating the antivirus. Mina remembers the new "
        "password and recognises the warning on the screen. She does not want to launch the app "
        "until every file is secure, because she knows that one unencrypted upload could expose data."
    ),
    35: (
        "At university, all the students joined an environmental technology project. Each group "
        "chose a habitat, and both supervisors helped them conduct research. Most of the teams used "
        "cloud storage, but one student forgot to encrypt a backup. He regrets making that mistake "
        "and remembers feeling anxious after the warning. The supervisors believe the project still "
        "has value, and every team wants to raise awareness of biodiversity. A programmer is now "
        "debugging the app while the students check their data. The programmer knows the system and "
        "prefers a secure wireless connection. Most students remember to save their files, and all "
        "the project leaders meet their deadlines. At the end of the semester, the university will "
        "publish the research and launch the app."
    ),
}

LISTENING = {
    31: (
        "Hello, I'm James, a lecturer at the University of London. I teach economics, and most "
        "students attend the lectures regularly. The university is a centre of excellence for "
        "research, so we encourage students to conduct their own studies. I have a PhD in finance "
        "and supervise six dissertations each year. On the first Monday of every semester, I give "
        "students a reading list and explain the deadlines. Students who meet those deadlines and "
        "submit high-quality work often obtain a distinction. This weekend, I will deliver a lecture "
        "at the university library for people who are considering a postgraduate degree."
    ),
    32: (
        "Hi, I'm Elena, and I work for an environmental NGO. All our projects focus on conservation, "
        "and most of the work involves raising awareness of biodiversity. Each volunteer receives "
        "training, and every month we organise a clean-up in a nature reserve. Both the local council "
        "and nearby businesses support our current initiative. Most of the species we protect are "
        "endangered, and each habitat has its own challenges. We test the water every three hours "
        "because pollutants pose a threat after heavy rain. Both teams take responsibility for the "
        "tests, and all the results are published online."
    ),
    33: (
        "Hi, I'm Tom, and I want to share something personal. I regret to inform you that I made a "
        "serious mistake at work last month. I remember losing my temper with a colleague, and I "
        "forgot to apologise immediately. He was frustrated, and I felt ashamed. I will never forget "
        "seeing his expression when I finally said sorry. He was relieved, and we were both grateful "
        "for the reconciliation. I regret not controlling my emotions during the argument. Now I "
        "remember to take a deep breath before difficult conversations, and I try to express my "
        "feelings instead of bottling them up."
    ),
    34: (
        "Hi, I'm Sarah, and I work as a software developer. I know how to program in several languages, "
        "and I believe AI will transform our work. I like cloud storage because it is flexible, but "
        "I prefer encrypted backups for confidential files. I want to learn more about machine learning "
        "next year. I understand the importance of data privacy and always remember to set a strong "
        "password. My team is testing a wireless device today, and a programmer is debugging a small "
        "glitch. We hope to launch our new app soon, but the software needs one final update before "
        "we deploy it."
    ),
    35: (
        "Hello, I'm James, a lecturer at a university in London. All the students in my seminar are "
        "working on an environmental technology project. Each team has a supervisor, and most of the "
        "projects examine biodiversity. I regret to inform you that today's seminar is postponed "
        "because the campus network has crashed. One student forgot to save a file and regrets not "
        "making a backup. Both supervisors believe the data is safe in cloud storage, but they want "
        "everyone to set a new password. I know the programmer is debugging the system now. Remember "
        "to upload your research before the new deadline on Friday."
    ),
}


def item(
    prompt: str, options: str, answer: str, explanation: str
) -> tuple[str, str, str, str]:
    return prompt, options, answer, explanation


GRAMMAR = {
    31: [
        (
            "A/an o the",
            "Elige el artículo según la pista de primera mención, profesión o referencia identificada.",
            [
                item("Maya is ___ expert in linguistics. (profesión; sonido vocálico)", "a · an · the", "an", "*Expert* empieza con sonido vocálico."),
                item("She has ___ degree in economics. (primera mención)", "a · the · —", "a", "Un singular contable nuevo necesita *a*."),
                item("She passed ___ exam we took yesterday. (identificado por la frase posterior)", "a · the · —", "the", "*We took yesterday* delimita el examen."),
                item("The university is ___ centre of excellence. (clasificación)", "a · an · the", "a", "*Centre* empieza con sonido consonántico."),
                item("The conference is on ___ first Monday of May. (ordinal)", "a · the · —", "the", "Los ordinales delimitados llevan *the*."),
            ],
        ),
        (
            "Artículo cero o the",
            "Escribe *the* o el símbolo *—*. Decide si se presenta una función general o un lugar/grupo concreto.",
            [
                item("Nora is at ___ university studying engineering.", "the · —", "—", "La función institucional de estudiar va sin artículo."),
                item("Her parents waited outside ___ university after graduation.", "the · —", "the", "Aquí se identifica el edificio."),
                item("Students attend ___ classes regularly. (general)", "the · —", "—", "Plural general."),
                item("The students attend ___ classes offered on Friday. (grupo definido)", "the · —", "the", "La frase posterior identifica las clases."),
                item("Researchers need access to ___ information for research. (general)", "the · —", "—", "*Information* es incontable y general."),
            ],
        ),
        (
            "Corrige exactamente un artículo",
            "Cada frase contiene un error de artículo. Reescríbela completa y conserva el significado.",
            [
                item("She is *an university* lecturer.", "—", "She is a university lecturer.", "*University* empieza con /j/, un sonido consonántico."),
                item("He wants to conduct *a research* on bilingual education.", "—", "He wants to conduct research on bilingual education.", "*Research* es incontable en este uso."),
                item("They study the history of education in *UK*.", "—", "They study the history of education in the UK.", "El nombre *the United Kingdom / the UK* lleva *the*."),
                item("She has *good knowledge* of English.", "—", "She has a good knowledge of English.", "La expresión delimitada es *a good knowledge of*."),
                item("A researcher visited *prison* to interview the director.", "—", "A researcher visited the prison to interview the director.", "Es una visita al lugar, no la condición de preso."),
            ],
        ),
    ],
    32: [
        (
            "Totalidad, mayoría o pareja",
            "Elige según el porcentaje indicado o el número exacto de referentes.",
            [
                item("___ species in this reserve are protected. (100 %)", "All · Most · Both", "All", "*All* incluye el conjunto completo."),
                item("___ residents recycle, but some do not. (mayoría)", "All · Most · Each", "Most", "La excepción descarta *all*."),
                item("___ councils signed the plan. (exactamente dos)", "Both · All · Every", "Both", "*Both* se reserva para dos."),
                item("___ of the water is potable, but 20% is contaminated.", "Most · All · Each", "Most", "La mayor parte, no el total; *water* es incontable."),
                item("___ the bins are full; none is empty.", "All · Most · Each", "All", "*All the bins* es correcto con un grupo definido."),
            ],
        ),
        (
            "Each, every y concordancia",
            "Completa con *each* o *every* y escribe también la forma correcta del verbo entre paréntesis.",
            [
                item("___ volunteer ___ (monitor) one habitat. (foco individual)", "each · every", "Each volunteer monitors", "*Each + singular* y tercera persona singular."),
                item("___ month, the NGO ___ (organise) a clean-up. (regularidad)", "each · every", "Every month, the NGO organises", "*Every* recorre una serie temporal."),
                item("___ of the volunteers ___ (receive) a certificate.", "each · every", "Each of the volunteers receives", "*Each of the + plural* mantiene verbo singular."),
                item("___ three hours, the sensor ___ (record) a result.", "each · every", "Every three hours, the sensor records", "Los intervalos usan *every + número + plural*."),
                item("___ side of the valley ___ (have) its own ecosystem.", "each · both", "Each side of the valley has", "El foco está en cada lado individual."),
            ],
        ),
        (
            "Patrones con of: corrige",
            "Cada frase contiene exactamente un error de estructura o concordancia. Reescríbela.",
            [
                item("*Most of forests* are threatened.", "—", "Most forests are threatened. / Most of the forests are threatened.", "Después de *of* hace falta un determinante."),
                item("*Most river in the region is* polluted.", "—", "Most rivers in the region are polluted.", "*Most + plural* para una mayoría de ríos."),
                item("*Every of the organisations* raises awareness.", "—", "Every organisation raises awareness.", "*Every* no va directamente con *of*."),
                item("*Both government has* taken responsibility.", "—", "Both governments have taken responsibility.", "*Both + plural* exige verbo plural."),
                item("*All the water are* contaminated.", "—", "All the water is contaminated.", "*Water* es incontable y lleva verbo singular."),
            ],
        ),
    ],
    33: [
        (
            "Regret: pasado o anuncio actual",
            "Elige *-ing* para una acción anterior o *to + infinitive* para introducir malas noticias ahora.",
            [
                item("We regret ___ you that the event is cancelled.", "informing · to inform", "to inform", "Fórmula formal de anuncio actual."),
                item("She regrets ___ her friend during the argument.", "hurting · to hurt", "hurting", "La acción de herir ocurrió antes."),
                item("I regret ___ sooner. (no lo hice)", "not apologising · not to apologise", "not apologising", "Omisión pasada: *regret not + -ing*."),
                item("The airline regrets ___ that the flight is delayed.", "saying · to say", "to say", "Se comunica una noticia negativa ahora."),
                item("He regrets ___ his temper yesterday.", "losing · to lose", "losing", "*Yesterday* sitúa la acción en el pasado."),
            ],
        ),
        (
            "Remember: memoria o tarea",
            "Elige la forma según exista un recuerdo pasado o una tarea que debe cumplirse.",
            [
                item("I remember ___ anxious before the interview.", "feeling · to feel", "feeling", "Es memoria de una experiencia."),
                item("Remember ___ the door when you leave.", "locking · to lock", "to lock", "Es una instrucción futura."),
                item("She remembered ___ the interviewer, so she sent a message.", "thanking · to thank", "to thank", "Recordó la tarea y la cumplió."),
                item("I don't remember ___ that comment.", "making · to make", "making", "No conserva memoria de una acción posiblemente realizada."),
                item("Every night, he remembers ___ the lights.", "turning off · to turn off", "to turn off", "La memoria activa una tarea habitual."),
            ],
        ),
        (
            "Forget: acción omitida o recuerdo perdido",
            "Usa el resultado indicado entre paréntesis para seleccionar la forma.",
            [
                item("I forgot ___ the attachment. (no lo envié)", "sending · to send", "to send", "La tarea quedó sin realizar."),
                item("I'll never forget ___ her for the first time. (experiencia memorable)", "meeting · to meet", "meeting", "La experiencia ocurrió."),
                item("He forgot ___ the door, although the camera proves he did it.", "locking · to lock", "locking", "La acción ocurrió, pero no la recuerda."),
                item("Don't forget ___ to Marta tonight. (recordatorio)", "replying · to reply", "to reply", "Acción todavía pendiente."),
                item("Corrige: I regret *not to study* harder last term.", "—", "I regret not studying harder last term.", "Arrepentimiento por una omisión pasada."),
            ],
        ),
    ],
    34: [
        (
            "State verbs en simple",
            "Elige la forma simple que corresponde al significado de estado practicado en la unidad.",
            [
                item("I ___ this app; it is very useful.", "like · am liking", "like", "*Like* describe una valoración."),
                item("She ___ how to code in Python.", "knows · is knowing", "knows", "*Know* expresa conocimiento."),
                item("We ___ AI will transform the industry.", "believe · are believing", "believe", "*Believe* presenta una opinión."),
                item("He ___ to upgrade his laptop.", "wants · is wanting", "wants", "*Want* expresa deseo."),
                item("The software ___ an update now.", "needs · is needing", "needs", "*Now* no convierte la necesidad en acción."),
            ],
        ),
        (
            "Negativas, preguntas y tercera persona",
            "Completa la forma entera. Usa *do/does* cuando la frase sea negativa o interrogativa.",
            [
                item("I ___ what the warning means. (negativa de understand)", "—", "don't understand", "Presente simple negativo."),
                item("___ she ___ the password? (pregunta con remember)", "—", "Does she remember", "Después de *does*, verbo base."),
                item("Mina ___ data privacy. (value)", "—", "values", "Tercera persona singular."),
                item("The developers ___ cloud storage. (prefer)", "—", "prefer", "Sujeto plural y forma base."),
                item("He ___ the icon. (negativa de recognise)", "—", "doesn't recognise", "No se añade *-s* tras *doesn't*."),
            ],
        ),
        (
            "Estado frente a acción dinámica",
            "Elige simple para el estado y continuo para la acción que ocurre en este momento.",
            [
                item("Mina ___ the risk while she ___ the app.", "understands / is testing · is understanding / tests", "understands / is testing", "Comprensión = estado; prueba = proceso."),
                item("We ___ the backup is safe, and Leo ___ it now.", "believe / is encrypting · are believing / encrypts", "believe / is encrypting", "Opinión frente a acción actual."),
                item("Sara ___ the password while she ___ for the file.", "remembers / is searching · is remembering / searches", "remembers / is searching", "Memoria frente a búsqueda."),
                item("The team ___ to deploy, but it ___ a bug today.", "wants / is fixing · is wanting / fixes", "wants / is fixing", "Deseo frente a reparación en curso."),
                item("Corrige: Does the programmer *knows* the answer?", "—", "Does the programmer know the answer?", "Después de *does* se usa la forma base."),
            ],
        ),
    ],
    35: [
        (
            "Diagnóstico U31–32",
            "Identifica si el hueco exige un artículo o un cuantificador y elige la forma completa.",
            [
                item("She studied at ___ university and obtained ___ degree.", "— / a · the / a · a / the", "— / a", "Función institucional; singular nuevo."),
                item("___ students in the seminar meet ___ deadlines set by James.", "All the / the · All / —", "All the / the", "Grupo total definido y plazos identificados."),
                item("___ team has a supervisor; ___ supervisors work together.", "Each / both · Every / each · All / every", "Each / both", "Singular individual frente a pareja plural."),
                item("___ of the water ___ potable.", "Most / is · Most / are · Every / is", "Most / is", "Grupo definido incontable."),
                item("She is ___ expert from ___ UK.", "an / the · a / — · the / a", "an / the", "Sonido vocálico y nombre geográfico fijo."),
            ],
        ),
        (
            "Diagnóstico U33–34",
            "Decide la relación temporal y distingue estado simple de acción dinámica.",
            [
                item("I regret ___ you that the server has failed.", "telling · to tell", "to tell", "Anuncio negativo actual."),
                item("Leo regrets ___ a backup yesterday.", "not making · not to make", "not making", "Omisión pasada."),
                item("Remember ___ your file before Friday.", "saving · to save", "to save", "Tarea pendiente."),
                item("Mina ___ the risk while she ___ the bug.", "understands / is fixing · is understanding / fixes", "understands / is fixing", "Estado mental y acción en progreso."),
                item("Both programmers ___ the password.", "know · are knowing", "know", "*Know* en sentido de conocimiento va en simple."),
            ],
        ),
        (
            "Corrección mixta final",
            "Cada frase contiene exactamente un error objetivo. Reescribe la frase correcta.",
            [
                item("Each *students conduct* a research project.", "—", "Each student conducts a research project.", "*Each + singular* y verbo singular."),
                item("Most *of projects* examine biodiversity.", "—", "Most projects examine biodiversity. / Most of the projects examine biodiversity.", "Con *of* se necesita determinante."),
                item("She *is believing* that the app needs an update.", "—", "She believes that the app needs an update.", "*Believe* es estado en este uso."),
                item("He forgot *encrypting* the backup, so it was never encrypted.", "—", "He forgot to encrypt the backup, so it was never encrypted.", "La acción no ocurrió."),
                item("They conduct *a research* in the university library.", "—", "They conduct research in the university library.", "*Research* es incontable."),
            ],
        ),
    ],
}

VOCAB = {
    31: [
        ("degree", "título universitario · plazo · asignatura secundaria", "título universitario"),
        ("major", "especialidad principal · ceremonia · trimestre", "especialidad principal"),
        ("semester", "semestre · tesina · matrícula", "semestre"),
        ("dissertation", "tesina / trabajo extenso · clase magistral · certificado", "tesina / trabajo extenso"),
        ("supervisor", "persona que guía una investigación · estudiante nuevo · examinador automático", "persona que guía una investigación"),
        ("To register formally for a course is to ___.", "enrol · attend · graduate", "enrol"),
        ("To finish work by the required date is to ___.", "meet a deadline · pursue a degree · drop out", "meet a deadline"),
        ("To carry out an academic study is to ___.", "conduct research · make research · deliver research", "conduct research"),
        ("The highest result in this course is a ___.", "distinction · reading list · tutorial", "distinction"),
        ("A year of work or travel before university is a ___.", "gap year · semester · lecture", "gap year"),
        ("Nora decided to ___ a postgraduate degree.", "pursue"),
        ("The professor will ___ on digital education.", "deliver a lecture"),
        ("Please consult the course ___ before buying the books.", "reading list"),
        ("Maya left before finishing: she decided to ___.", "drop out"),
        ("Students must submit the final ___ in June.", "dissertation"),
    ],
    32: [
        ("biodiversity", "variedad de vida · agua potable · combustible fósil", "variedad de vida"),
        ("greenhouse gases", "gases que retienen calor · especies extintas · residuos domésticos", "gases que retienen calor"),
        ("habitat", "hogar natural de una especie · campaña pública · equilibrio económico", "hogar natural de una especie"),
        ("potable water", "agua apta para beber · agua residual · lluvia ácida", "agua apta para beber"),
        ("pollutants", "sustancias contaminantes · recursos renovables · voluntarios", "sustancias contaminantes"),
        ("A species that no longer exists is ___.", "extinct · endangered · renewable", "extinct"),
        ("Large-scale destruction of forests is ___.", "deforestation · conservation · biodiversity", "deforestation"),
        ("Energy from sources that naturally renew is ___.", "renewable energy · greenhouse gas · sewage", "renewable energy"),
        ("A protected area for wildlife is a ___.", "nature reserve · landfill · industrial zone", "nature reserve"),
        ("To make people understand an issue is to ___.", "raise awareness · draw a conclusion · strike a balance", "raise awareness"),
        ("Plastic waste can ___ to marine animals.", "pose a threat"),
        ("Communities must ___ for local conservation.", "take responsibility"),
        ("The plan tries to ___ between access and protection.", "strike a balance"),
        ("From these results, researchers can ___.", "draw a conclusion"),
        ("The new filters will help ___ limited water resources.", "conserve"),
    ],
    33: [
        ("overjoyed", "extremadamente feliz · avergonzado · resentido", "extremadamente feliz"),
        ("grief", "pena profunda / duelo · alivio · gratitud", "pena profunda / duelo"),
        ("anxious", "preocupado o inseguro · encantado · tranquilo", "preocupado o inseguro"),
        ("relieved", "aliviado tras una preocupación · celoso · devastado", "aliviado tras una preocupación"),
        ("resentful", "amargado por un daño pasado · agradecido · confiado", "amargado por un daño pasado"),
        ("To become unable to control your anger is to ___.", "lose your temper · bear a grudge · express relief", "lose your temper"),
        ("To keep anger about a past wrong is to ___.", "bear a grudge · have a sense of · control emotions", "bear a grudge"),
        ("To hide emotions instead of sharing them is to ___.", "bottle up your feelings · express your feelings · feel relieved", "bottle up your feelings"),
        ("Very upset and shocked means ___.", "devastated · content · overjoyed", "devastated"),
        ("Thankful for help means ___.", "grateful · jealous · frustrated", "grateful"),
        ("After the mistake, Tom felt ___ of his behaviour.", "ashamed"),
        ("A repeated technical problem made her feel ___.", "frustrated"),
        ("It is healthier to ___ clearly than to hide them.", "express your feelings"),
        ("Before replying, he tried to ___.", "control his emotions"),
        ("She felt ___ of her colleague's success.", "jealous"),
    ],
    34: [
        ("antivirus", "software contra virus · fallo del sistema · copia de datos", "software contra virus"),
        ("upload", "subir datos · descargar datos · cifrar datos", "subir datos"),
        ("bug", "defecto de software · dispositivo inalámbrico · servidor remoto", "defecto de software"),
        ("cloud storage", "almacenamiento en servidores remotos · disco local · aplicación móvil", "almacenamiento en servidores remotos"),
        ("backup", "copia de seguridad · filtración de datos · contraseña", "copia de seguridad"),
        ("To protect data by encoding it is to ___.", "encrypt · update · connect", "encrypt"),
        ("Finding and correcting software errors is ___.", "debugging · uploading · storage", "debugging"),
        ("Making software available for use is to ___.", "deploy · remember · download", "deploy"),
        ("A leak of private information is a ___.", "data breach · wireless network · bug fix", "data breach"),
        ("A person who writes code is a ___.", "programmer · supervisor · user interface", "programmer"),
        ("Use at least twelve characters when you ___.", "set a password"),
        ("Press Control-S to ___ before closing it.", "save a file"),
        ("The company plans to ___ next month.", "launch an app"),
        ("Use Bluetooth to ___ without a cable.", "connect a device"),
        ("You need a network connection to ___.", "go online"),
    ],
    35: [
        ("conduct research", "Education · Environment · Feelings", "Education"),
        ("biodiversity", "Environment · Technology · Education", "Environment"),
        ("grateful", "Feelings · Education · Technology", "Feelings"),
        ("encrypted backup", "Technology · Feelings · Environment", "Technology"),
        ("meet a deadline", "Education · Feelings · Environment", "Education"),
        ("A person who guides a dissertation is a ___.", "supervisor · programmer · volunteer", "supervisor"),
        ("A protected home for wildlife is a ___.", "nature reserve · cloud storage · seminar", "nature reserve"),
        ("To hide emotions is to ___.", "bottle up your feelings · raise awareness · save a file", "bottle up your feelings"),
        ("A defect in an app is a ___.", "bug · distinction · habitat", "bug"),
        ("To help the public understand an issue is to ___.", "raise awareness · launch an app · obtain a degree", "raise awareness"),
        ("Students ___ before writing a dissertation.", "conduct research"),
        ("Each team must ___ by Friday.", "meet the deadline"),
        ("Remember to ___ before uploading the data.", "encrypt the backup"),
        ("The campaign protects local ___.", "biodiversity"),
        ("After the files were recovered, everyone felt ___.", "relieved"),
    ],
}

READING_EX = {
    31: [
        ("What did Nora do before university?", "She took a gap year."),
        ("What degree did she enrol in?", "A degree in environmental engineering."),
        ("Who helped her choose a major?", "A supervisor."),
        ("What did she write in the final year?", "A dissertation about digital learning."),
        ("Where was the graduation ceremony?", "At the university library."),
        ("Complete: Nora went to ___ in Oxford.", "university"),
        ("Complete: During ___ first semester, she prepared ___ reading list.", "the; a"),
        ("Complete: She conducted ___ and met her deadlines.", "research"),
        ("Why does *the degree* use *the* near the end?", "It refers to the degree already introduced."),
        ("Which phrase means «obtuvo la nota más alta»?", "earned a distinction"),
        ("Choose: *the university* in the final sentences means activity / identified institution.", "identified institution"),
        ("Choose the correct chunk: make / conduct research.", "conduct research"),
        ("Put in order: gap year — dissertation — graduation.", "gap year → dissertation → graduation"),
        ("Which two job-related words appear in the final sentence?", "education researcher; lecture"),
        ("Summarise with two chunks: Nora ___ and later ___.", "enrolled in a degree; obtained the degree"),
    ],
    32: [
        ("How many local organisations work in the reserve?", "Two."),
        ("What does each volunteer monitor?", "One habitat."),
        ("How often do sensors record water quality?", "Every three hours."),
        ("Who agreed to take responsibility?", "Both councils."),
        ("What are the organisations balancing?", "Public access and protection of endangered species."),
        ("Complete: ___ the volunteers receive training.", "All"),
        ("Complete: ___ of the water is potable.", "Most"),
        ("Complete: ___ project includes a campaign.", "Every"),
        ("What do pollutants pose a threat to?", "Two rivers."),
        ("Which phrase means «concienciar»?", "raise awareness"),
        ("Choose: *most residents* allows / does not allow exceptions.", "allows exceptions"),
        ("Why is *has* singular in *each small action has*?", "Because *each + singular* takes a singular verb."),
        ("Put in order: training — monitoring — publication/campaign.", "training → monitoring → campaign"),
        ("Which group only mostly supported the campaign online?", "The businesses."),
        ("Complete the contrast: ___ councils = two; ___ schools = 100%.", "both; all the"),
    ],
    33: [
        ("How did the writer feel before the interview?", "Anxious."),
        ("What document problem occurred?", "The writer forgot to attach one document."),
        ("Who allowed the document to be sent later?", "The interviewer."),
        ("What good news arrived?", "The writer had obtained the job."),
        ("Who received an apology for the previous week?", "The writer's sister."),
        ("Complete: I regret ___ her advice.", "ignoring"),
        ("Complete: I forgot ___ one document.", "to attach"),
        ("Complete: I remembered ___ the interviewer.", "to thank"),
        ("Complete: I will never forget ___ the message.", "reading"),
        ("What omission does the writer regret?", "Not trusting themself sooner."),
        ("Choose: *remembered to thank* confirms memory / task completion.", "task completion"),
        ("Choose: *remember apologising* describes a past memory / future task.", "a past memory"),
        ("Put in order: missing attachment — final message — apology to sister.", "missing attachment → final message → apology to sister"),
        ("Name two feelings after the good news.", "Overjoyed and grateful."),
        ("Which expression means they did not keep lasting resentment?", "did not want to bear a grudge"),
    ],
    34: [
        ("What is Mina's job?", "She is a programmer."),
        ("Why is a new security feature necessary?", "Because users value data privacy."),
        ("When does the team want to deploy the update?", "Before Friday."),
        ("What kind of storage does Mina prefer?", "Encrypted cloud storage."),
        ("What recurring problem does she hate?", "One recurring bug."),
        ("Complete: Mina ___ how to debug apps.", "knows"),
        ("Complete: The software ___ an update.", "needs"),
        ("Complete the dynamic action: Mina ___ the wireless connection.", "is testing"),
        ("Who is making a backup?", "Another developer."),
        ("What does Mina recognise?", "The warning on the screen."),
        ("Choose: *knows* is a state / action in progress.", "a state"),
        ("Choose: *is updating* is a state / action in progress.", "an action in progress"),
        ("Put in order: update needed — tests — launch.", "update needed → tests → launch"),
        ("Why does Mina delay the launch?", "An unencrypted upload could expose data."),
        ("Write one state/action pair from the text.", "Example: knows / is testing."),
    ],
    35: [
        ("Where did the students join the project?", "At university."),
        ("What did each group choose?", "A habitat."),
        ("What mistake did one student make?", "He forgot to encrypt a backup."),
        ("Who is debugging the app?", "A programmer."),
        ("When will the research be published?", "At the end of the semester."),
        ("Complete U31: They conduct ___.", "research"),
        ("Complete U32: ___ group chose a habitat.", "Each"),
        ("Complete U33: He regrets ___ that mistake.", "making"),
        ("Complete U34: The supervisors ___ the project has value.", "believe"),
        ("Complete dynamic action: The programmer ___ the app.", "is debugging"),
        ("Why is there no article in *at university*?", "It presents the institutional activity."),
        ("Why does *each group* take *chose* as a singular subject?", "Each is followed by a singular noun."),
        ("Choose: *forgot to encrypt* means encrypted but forgot / did not encrypt.", "did not encrypt"),
        ("Put in order: group choice — warning — debugging — publication.", "group choice → warning → debugging → publication"),
        ("Name one item from each vocabulary field.", "Example: research; habitat; anxious; cloud storage."),
    ],
}

LISTENING_EX = {
    31: [
        ("Who is speaking?", "James, a lecturer."),
        ("What subject does he teach?", "Economics."),
        ("How many dissertations does he supervise each year?", "Six."),
        ("When does he give students a reading list?", "On the first Monday of every semester."),
        ("Where will he speak this weekend?", "At the university library."),
        ("Complete: I work as ___ lecturer.", "a"),
        ("Complete: ___ university is a centre of excellence.", "The"),
        ("Complete: Students conduct their own ___.", "research"),
        ("Complete: They meet ___ deadlines.", "the"),
        ("What result do strong students often obtain?", "A distinction."),
        ("Choose: *the lectures* are general / identified lectures.", "identified lectures"),
        ("Choose the correct chunk: deliver / make a lecture.", "deliver a lecture"),
        ("Why does *the first Monday* use *the*?", "It contains an ordinal identifying one date."),
        ("Put in order: reading list — deadlines — distinction.", "reading list → deadlines → distinction"),
        ("Complete the classification: The university is ___.", "a centre of excellence"),
    ],
    32: [
        ("Who is speaking?", "Elena."),
        ("What kind of organisation employs her?", "An environmental NGO."),
        ("How often are clean-ups organised?", "Every month."),
        ("Who supports the initiative?", "Both the local council and nearby businesses."),
        ("When can pollutants threaten the water?", "After heavy rain."),
        ("Complete: ___ our projects focus on conservation.", "All"),
        ("Complete: ___ volunteer receives training.", "Each"),
        ("Complete: ___ of the species are endangered.", "Most"),
        ("Complete: ___ teams take responsibility.", "Both"),
        ("Where are all the results published?", "Online."),
        ("Choose: *most of the work* takes a singular / plural verb.", "singular"),
        ("Choose: *both teams* means two / more than two.", "two"),
        ("Which chunk means accepting duty?", "take responsibility"),
        ("Put in order: training — clean-up — tests — publication.", "training → clean-up → tests → publication"),
        ("Complete: Each habitat ___ its own challenges.", "has"),
    ],
    33: [
        ("Who is speaking?", "Tom."),
        ("With whom did he lose his temper?", "A colleague."),
        ("What did he forget to do immediately?", "Apologise."),
        ("How did Tom feel after the argument?", "Ashamed."),
        ("How did both people feel after reconciling?", "Grateful."),
        ("Complete formal phrase: I regret ___ you.", "to inform"),
        ("Complete memory: I remember ___ my temper.", "losing"),
        ("Complete omission: I forgot ___ immediately.", "to apologise"),
        ("Complete regret: I regret not ___ my emotions.", "controlling"),
        ("What does Tom remember to do now?", "Take a deep breath."),
        ("Choose: *regret to inform* is a past regret / current announcement.", "current announcement"),
        ("Choose: *never forget seeing* means a lasting memory / missed task.", "a lasting memory"),
        ("Which expression contrasts with bottling feelings up?", "express my feelings"),
        ("Put in order: argument — delayed apology — reconciliation — new habit.", "argument → delayed apology → reconciliation → new habit"),
        ("Name the colleague's feelings before and after the apology.", "Frustrated; relieved."),
    ],
    34: [
        ("Who is speaking?", "Sarah, a software developer."),
        ("How many programming languages does she know?", "Several."),
        ("Why does she like cloud storage?", "It is flexible."),
        ("What does she want to learn next year?", "More about machine learning."),
        ("What is the team testing today?", "A wireless device."),
        ("Complete: I ___ AI will transform our work.", "believe"),
        ("Complete: I ___ encrypted backups.", "prefer"),
        ("Complete: I always ___ to set a password.", "remember"),
        ("Complete dynamic action: A programmer ___ a glitch.", "is debugging"),
        ("What final thing does the software need?", "One final update."),
        ("Choose: *understand* is simple because it is a state / habit only.", "a state"),
        ("Choose: *is testing* describes a current action / opinion.", "a current action"),
        ("Which two security expressions are mentioned?", "Encrypted backups; a strong password."),
        ("Put in order: testing — debugging — update — deployment.", "testing → debugging → update → deployment"),
        ("Complete: We ___ to launch, but the software ___ an update.", "hope; needs"),
    ],
    35: [
        ("Who is speaking?", "James, a lecturer."),
        ("What are all the students working on?", "An environmental technology project."),
        ("Why is the seminar postponed?", "The campus network has crashed."),
        ("What did one student forget?", "To save a file."),
        ("What is the new deadline?", "Friday."),
        ("Complete U31: James works as ___ lecturer at ___ university.", "a; a"),
        ("Complete U32: ___ team has a supervisor.", "Each"),
        ("Complete U33: The student regrets not ___ a backup.", "making"),
        ("Complete U34: Both supervisors ___ the data is safe.", "believe"),
        ("What action is the programmer doing now?", "Debugging the system."),
        ("Choose: *most of the projects* includes all / a majority.", "a majority"),
        ("Choose: *remember to upload* describes a task / past memory.", "a task"),
        ("Why is *believe* not continuous?", "It describes an opinion/state in the course target."),
        ("Put in order: crash — lost file — password change — upload.", "crash → lost file → password change → upload"),
        ("Write the exact final instruction.", "Remember to upload your research before the new deadline on Friday."),
    ],
}

WRITING = {
    31: [
        ("Completa: Maya is ___ expert and Leo is ___ university lecturer.", "Maya is **an expert** and Leo is **a university lecturer**."),
        ("Corrige: *She conducts a research at the university.*", "She **conducts research at the university**."),
        ("Contrasta institución y edificio con *university*.", "Modelo: Nora is **at university**. Her parents are waiting outside **the university**."),
        ("Traduce: *Obtuvo un título con distinción.*", "She **obtained a degree with distinction**."),
        ("Une: *The exam was difficult. We took it yesterday.*", "**The exam we took yesterday** was difficult."),
        ("Escribe dos frases: plural general *students* y grupo identificado *the students in my tutorial*.", "Modelo: **Students** need feedback. **The students in my tutorial** have a deadline on Friday."),
        ("Redacta 35–45 palabras sobre un semestre. Incluye *a supervisor, the first semester, conduct research*.", "Modelo: During **the first semester**, I met **a supervisor** who helped me choose a topic. I learned to **conduct research**, follow a reading list and meet every deadline before starting my dissertation."),
        ("Escribe un aviso de 25–35 palabras con *the library, the weekend, reading list*.", "Modelo: **The library** will close during **the weekend**. Please collect every book on your **reading list** by Friday and return borrowed materials on Monday."),
        ("Escribe 40–50 palabras sobre una persona que abandona un curso. Usa *enrol, drop out, a degree*.", "Modelo: Luis decided to **enrol** in **a degree** in economics. During the second semester, work became too demanding, so he chose to **drop out**. He plans to return to university next year."),
        ("Escribe 80–100 palabras sobre un recorrido universitario con seis decisiones de artículo y seis palabras U31.", "Modelo: I took **a gap year** before going to **university**. Then I enrolled in **a degree** in engineering. During **the first semester**, **a supervisor** helped me prepare **a reading list**. I attended **lectures**, learned to conduct **research** and met every deadline. In **the final year**, I wrote **a dissertation** and obtained **the degree** with distinction. **The graduation ceremony** took place at **the university**, where my supervisor delivered a short lecture."),
    ],
    32: [
        ("Completa y concuerda: ___ volunteer ___ (receive) training.", "**Each volunteer receives** training."),
        ("Corrige: *Most of forests is threatened.*", "**Most forests are threatened** / **Most of the forests are threatened**."),
        ("Contrasta 100 % y mayoría con *all/most residents*.", "Modelo: **All residents** received a leaflet, but **most residents** attended the meeting."),
        ("Traduce: *Ambos ayuntamientos asumieron la responsabilidad.*", "**Both councils took responsibility**."),
        ("Completa el intervalo: ___ three hours, each sensor ___ (record) data.", "**Every three hours**, each sensor **records** data."),
        ("Escribe dos frases que contrasten *each side* y *both sides*.", "Modelo: **Each side** has a different habitat. **Both sides** need protection."),
        ("Redacta 35–45 palabras sobre una reserva. Incluye *all, each, most of the water*.", "Modelo: **All volunteers** work in the reserve, and **each volunteer** monitors one habitat. **Most of the water** is potable, although pollutants still threaten a river after heavy rain."),
        ("Escribe un aviso de 25–35 palabras con *every month, raise awareness, biodiversity*.", "Modelo: **Every month**, our nature reserve holds a public event to **raise awareness** of **biodiversity**. Both local schools provide volunteers and reusable equipment."),
        ("Escribe 40–50 palabras con *pose a threat, strike a balance, take responsibility*.", "Modelo: Pollutants **pose a threat** to the wetland. The council must **take responsibility** for water tests and **strike a balance** between tourism and habitat protection."),
        ("Escribe 80–100 palabras sobre conservación usando los cinco cuantificadores y seis palabras U32.", "Modelo: **All the habitats** in our nature reserve need monitoring. **Most residents** support conservation, and **each volunteer** studies one endangered species. **Every month**, the NGO organises a clean-up. **Both councils** provide equipment and take responsibility for testing potable water. Pollutants still pose a threat to biodiversity, so every campaign tries to raise awareness. Most of the local businesses also invest in renewable energy, helping the community strike a balance between development and protection."),
    ],
    33: [
        ("Completa: We regret ___ (inform) you that the event is cancelled.", "We regret **to inform** you that the event is cancelled."),
        ("Corrige: *I regret not to apologise sooner.*", "I regret **not apologising** sooner."),
        ("Contrasta *remember sending / remember to send*.", "Modelo: I **remember sending** the file yesterday. Please **remember to send** today's report."),
        ("Traduce: *Olvidé adjuntar el documento.*", "I **forgot to attach** the document."),
        ("Añade contexto para demostrar que *He forgot locking the door* significa que sí la cerró.", "Modelo: He **forgot locking the door**, but the security video proved that he had locked it."),
        ("Escribe dos frases con *never forget + -ing* y dos sentimientos U33.", "Modelo: I'll **never forget receiving** the result. I was **overjoyed** and **grateful**."),
        ("Redacta 35–45 palabras sobre una disculpa. Incluye *regret, lose your temper, relieved*.", "Modelo: I **regret losing my temper** with a colleague. I remembered to apologise the next morning and explained my feelings calmly. We both felt **relieved** after the conversation."),
        ("Escribe un mensaje formal de 25–35 palabras con *regret to inform*.", "Modelo: We **regret to inform** you that Friday's interview has been postponed. Please remember to check your email tomorrow for a new time and video link."),
        ("Escribe 40–50 palabras con *bear a grudge, bottle up feelings, express emotions*.", "Modelo: Ana did not want to **bear a grudge**, but she had **bottled up her feelings** for weeks. She decided to **express her emotions** calmly and felt relieved afterward."),
        ("Escribe 80–100 palabras sobre un error y una reconciliación con seis patrones U33.", "Modelo: I **remember feeling** anxious before a meeting and **regret ignoring** my colleague's advice. I **forgot to attach** an important file and then lost my temper. I **remember apologising** later, and I **remembered to explain** the technical problem clearly. My colleague was frustrated but accepted the apology. I'll **never forget seeing** her relief. I regret not controlling my emotions sooner, but I am grateful that neither of us chose to bear a grudge."),
    ],
    34: [
        ("Corrige: *She is knowing how to code.*", "She **knows how to code**."),
        ("Completa: The app ___ (need) an update, and the team ___ (want) to deploy it.", "The app **needs** an update, and the team **wants** to deploy it."),
        ("Pasa a pregunta: *Mina remembers the password.*", "**Does Mina remember the password?**"),
        ("Traduce: *Valoramos la privacidad y preferimos copias cifradas.*", "We **value data privacy** and **prefer encrypted backups**."),
        ("Contrasta estado y acción: *understand / test*.", "Modelo: I **understand** the warning, and I **am testing** the app now."),
        ("Escribe dos frases negativas con *don't understand* y *doesn't recognise*.", "Modelo: I **don't understand** this error. The antivirus **doesn't recognise** the file."),
        ("Redacta 35–45 palabras sobre seguridad. Incluye *believe, need, set a password*.", "Modelo: We **believe** every account **needs** stronger protection. Users should **set a password** with at least twelve characters and save an encrypted backup before going online."),
        ("Escribe un aviso de 25–35 palabras con *data breach, encrypt, upload*.", "Modelo: A **data breach** may expose private files. **Encrypt** every backup before you **upload** it, and contact the security team if you recognise unusual activity."),
        ("Escribe 40–50 palabras con dos estados y dos acciones en continuo.", "Modelo: Mina **knows** the system and **believes** the update is safe. She **is debugging** one recurring bug while another programmer **is testing** the wireless connection."),
        ("Escribe 80–100 palabras sobre lanzar una app con ocho state verbs y seis palabras U34.", "Modelo: Our programmer **knows** the platform and **understands** the risk of a data breach. She **believes** the app **needs** an update and **wants** to deploy it on Friday. Users **value** privacy and **prefer** encrypted cloud storage. The team **hopes** the launch will succeed and **remembers** the new password. Today, two developers are debugging a bug, updating the antivirus and making a backup. Everyone likes the interface, but nobody wants to launch the app before the final security test."),
    ],
    35: [
        ("Completa U31: She is ___ expert who conducts ___ research.", "She is **an expert** who conducts **— research**."),
        ("Completa U32: ___ team ___ (have) a supervisor; ___ supervisors work together.", "**Each team has** a supervisor; **both supervisors** work together."),
        ("Corrige U33: *He regrets not to save a backup.*", "He regrets **not saving a backup**."),
        ("Corrige U34: *They are believing the data is safe.*", "They **believe** the data is safe."),
        ("Traduce: *Recuerda cifrar el archivo antes de subirlo.*", "**Remember to encrypt the file before uploading it.**"),
        ("Integra U31–32: *students / conduct research / each habitat*.", "Modelo: **The students conduct research**, and **each group studies a habitat**."),
        ("Redacta 40–50 palabras sobre un error digital. Incluye *forgot to, regret -ing, anxious, backup*.", "Modelo: One student **forgot to encrypt** a **backup** before uploading it. He felt **anxious** after the warning and **regretted making** the mistake, but the supervisor recovered the file."),
        ("Redacta 40–50 palabras sobre una campaña. Incluye *all, most, both, raise awareness*.", "Modelo: **All the teams** designed a campaign, and **most students** presented it online. **Both supervisors** helped them **raise awareness** of biodiversity and check every environmental claim."),
        ("Escribe 50–60 palabras con cuatro state verbs y dos acciones dinámicas.", "Modelo: Mina **knows** the platform, **believes** the app is useful, **values** privacy and **prefers** encrypted storage. Today she **is debugging** a bug while her colleague **is testing** a wireless device. They both want a secure launch."),
        ("Escribe 100–120 palabras sobre un proyecto universitario ambiental y digital. Incluye tres objetivos de cada U31–34.", "Modelo: At **university**, **all the students** joined **an environmental project**. **Each group** chose a habitat, and **both supervisors** helped them conduct **research**. Most of the teams used cloud storage, but Leo **forgot to encrypt** a backup. He **regrets making** that mistake and **remembers feeling** anxious after the warning. The supervisors **believe** the project has value and **want** every team to raise awareness. Mina **knows** the system and **prefers** encrypted files. She is debugging the app now, while the students are checking the data. At the end of **the semester**, the university will publish the results."),
    ],
}

SPEAKING = {
    31: [
        ("Pronuncia y contrasta *a university / an expert*.", "Guion modelo: She studies at **a university** and works with **an expert**. La elección depende del sonido /j/ frente a vocal."),
        ("Explica *at university / at the university* en 30 segundos.", "Pistas: activity → **at university**; identified building → **at the university**. Modelo: I study at university; my parents are waiting at the university."),
        ("Role-play entre estudiante y supervisor sobre un plazo.", "A: When is **the deadline**? B: Friday. A: Can you review my **dissertation**? B: Yes, bring it to **the tutorial**."),
        ("Describe un recorrido con gap year / degree / distinction.", "Guion modelo: I took **a gap year**, pursued **a degree** in economics and graduated with **distinction**."),
        ("Habla 45–60 segundos sobre estudios usando seis artículos y seis palabras U31.", "Pistas: at university · a degree · the first semester · a supervisor · conduct research · dissertation · the graduation ceremony."),
    ],
    32: [
        ("Pronuncia y contrasta *all / most*.", "Guion modelo: **All volunteers** received training, but **most volunteers** attended the clean-up."),
        ("Explica *each / every* en 30 segundos.", "Pistas: individual → **each volunteer**; series/regularity → **every month**; ambos llevan singular."),
        ("Role-play sobre dos ayuntamientos y una reserva.", "A: Did the councils sign? B: **Both councils** signed. A: Does **each council** provide equipment? B: Yes."),
        ("Corrige oralmente *most of forests; every volunteers; both council*.", "Guion modelo: **most forests / most of the forests; every volunteer; both councils**."),
        ("Habla 45–60 segundos sobre conservación usando cinco cuantificadores y seis palabras U32.", "Pistas: all habitats · most residents · each volunteer · every month · both councils · biodiversity · pollutants · renewable energy."),
    ],
    33: [
        ("Pronuncia y contrasta *regret doing / regret to inform*.", "Guion modelo: I **regret losing** my temper. We **regret to inform** you that the event is cancelled."),
        ("Explica *remember doing / remember to do* en 30 segundos.", "Pistas: past memory → **remember meeting**; completed task → **remember to call**."),
        ("Role-play de disculpa con tres sentimientos.", "A: I regret hurting you. B: I was **frustrated**. A: I'm **ashamed**. B: I'm **relieved** that we are talking."),
        ("Demuestra los dos significados de *forget* con contexto.", "Guion modelo: I **forgot to lock** the door, so it stayed open. He **forgot locking** it, but the camera proves he did."),
        ("Habla 45–60 segundos sobre reconciliación usando seis patrones y cinco palabras U33.", "Pistas: regret saying/not apologising · remember feeling/to explain · forget to call · never forget meeting · grateful · relieved."),
    ],
    34: [
        ("Pronuncia cinco state verbs en frases completas.", "Guion modelo: I **like** the app. She **knows** Python. We **believe** it is safe. He **wants** an update. Mina **understands** the warning."),
        ("Explica por qué *now* no exige continuo.", "Guion modelo: A present state can be true now without being an action. Say **I understand now**, not *I am understanding now*."),
        ("Role-play de soporte técnico con *know, remember, need*.", "A: Do you **know** the password? B: I don't **remember** it. A: The account **needs** a reset."),
        ("Contrasta dos estados con dos acciones dinámicas.", "Guion modelo: We **believe** the app is safe and **prefer** cloud storage. Mina **is testing** it while Leo **is making** a backup."),
        ("Habla 45–60 segundos sobre una app con ocho state verbs y seis términos U34.", "Pistas: know · believe · want · understand · prefer · need · value · hope; bug · backup · encrypt · data breach · deploy · launch."),
    ],
    35: [
        ("Clasifica oralmente cuatro ejemplos por unidad.", "Guion modelo: **At university** is U31; **each team** is U32; **remember to save** is U33; **believe** in simple is U34."),
        ("Corrige *each students are; most of projects; is knowing*.", "Guion modelo: **each student is; most projects / most of the projects; knows**."),
        ("Role-play entre estudiante y supervisor tras perder un archivo.", "A: I **forgot to save** the file. B: Do you have **a backup**? A: No, and I **regret not making** one. B: I **believe** we can recover it."),
        ("Resume el reading en cuatro pasos, uno por unidad.", "Pistas: U31 at university/research; U32 each group/both supervisors; U33 forgot to encrypt/regrets making; U34 believe/want/debugging."),
        ("Habla 60–75 segundos sobre un proyecto integrado con doce objetivos U31–34.", "Pistas: a/the/— · all/most/each/every/both · regret/remember/forget · know/believe/want/prefer · research/biodiversity/anxious/backup."),
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

No respondas por parecido visual. Lee la situación, identifica el significado y comprueba determinantes, concordancia, complementos y tiempo verbal.

{(chr(10) * 2).join(sections)}
"""


def render_vocab(unit: int) -> str:
    entries = VOCAB[unit]
    blocks = [
        ("Traducción precisa", "Cada entrada tiene tres significados o campos. Elige solo uno.", entries[:5]),
        ("Elige por definición", "Completa la definición o situación con una de las tres opciones.", entries[5:10]),
        (
            "Completa en contexto",
            "Escribe la palabra o expresión que completa naturalmente la frase. El contexto deja una única respuesta del vocabulario de la unidad.",
            entries[10:],
        ),
    ]
    sections = []
    start = 1
    for title, instruction, items in blocks:
        questions = []
        answers = []
        for number, entry in enumerate(items, start):
            if len(entry) == 3:
                prompt, options, answer = entry
                option_line = f"\n   Opciones: *{options}*"
            else:
                prompt, answer = entry
                option_line = ""
            questions.append(f"{number}. {prompt}{option_line}")
            answers.append(f"{number}. **{answer}**")
        end = start + len(items) - 1
        sections.append(
            f"### Ejercicios {start}–{end} — {title}\n\n"
            f"{instruction}\n\n"
            f"{chr(10).join(questions)}\n\n"
            f"{details(chr(10).join(answers))}"
        )
        start = end + 1
    return f"""## Lección 2 — Vocabulario

**Objetivo:** comprender y usar vocabulario de *{META[unit]["vocab"]}* en frases concretas.

Aprende cada palabra dentro de una situación. Las opciones incorrectas pertenecen a campos cercanos, así que decide por significado, no por forma.

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

Lee una vez para captar la situación y otra para localizar detalles. También puedes escuchar el audio. Todas las respuestas se pueden comprobar directamente en el texto."""
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

Sigue la extensión y las expresiones indicadas. En los ejercicios largos, subraya los objetivos antes de comparar. Cada tarea incluye un modelo completo; puedes cambiar detalles sin cambiar la estructura evaluada.

{chr(10).join(writing_questions)}

{details(chr(10).join(writing_answers), "Ver modelos de writing")}

### Ejercicios 11–15 — Speaking con guion y pistas

Lee la consigna, prepara durante 30 segundos y habla sin leer. Después compara tus estructuras con el guion o las pistas.

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
    if unit == 35:
        next_step = "3. Continúa en la [Unidad 36 del curso B2](/curso-b2/unit-36) cuando quieras avanzar."
        next_link = "- [Continuar con Unidad 36](/curso-b2/unit-36)"
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

Clasifica cada fallo como **significado**, **forma**, **concordancia** o **vocabulario**. Copia la corrección mínima y crea una frase nueva con el mismo patrón. Después vuelve a intentarlo sin opciones.

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
    for unit in range(31, 36):
        assert sum(len(group[2]) for group in GRAMMAR[unit]) == 15
        assert len(VOCAB[unit]) == 15
        assert len(READING_EX[unit]) == 15
        assert len(LISTENING_EX[unit]) == 15
        assert len(WRITING[unit]) == 10
        assert len(SPEAKING[unit]) == 5


def make_audios() -> None:
    for unit in range(31, 36):
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
    for unit in range(31, 36):
        path = OUT / f"{META[unit]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(unit), encoding="utf-8")
        words = len(path.read_text(encoding="utf-8").split())
        print("wrote", path.relative_to(ROOT), "words", words)
    make_audios()
    print("done B2 U31–35 workbooks")


if __name__ == "__main__":
    main()
