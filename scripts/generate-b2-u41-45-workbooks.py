#!/usr/bin/env python3
"""Generate B2 Units 41–45 exercise workbooks and workbook TTS.

The workbooks follow the B2 U31–40 clarity model: Spanish instructions,
closed practice, complete answer keys, reading/listening comprehension, and
explicit models for writing and speaking.
"""
from __future__ import annotations

from pathlib import Path
import re

from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/content/blog/curso-b2"
DATE = "2026-09-01"
HUB = "ingles-b2"


META = {
    41: {
        "slug": "unidad-41-gerunds-infinitives-education",
        "title": "Gerunds, Infinitives & Education",
        "full": "Gerunds and Infinitives + Education Systems & Learning",
        "focus": "gerundios, infinitivos, cambios de significado y verb + object + infinitive",
        "vocab": "Education Systems & Learning",
        "image": "/blog/curso-b2/unit-41/gerunds-infinitives-map.png",
        "prev": "unidad-40-repaso-36-39-ejercicios-soluciones",
        "next": "unidad-42-passive-reporting-science-ejercicios-soluciones",
        "next_title": "Unidad 42 — Passive Reporting & Science",
        "reading_title": "Maya's blended learning choices",
        "listening_title": "Sarah changes her seminars",
        "related": [
            "unidad-41-gerunds-infinitives-education",
            "unidad-40-repaso-36-39",
            "unidad-42-passive-reporting-science",
            HUB,
        ],
        "remember": [
            "**Enjoy, avoid, consider, finish y mind + -ing**; **decide, hope, refuse, expect y seem + to + base**.",
            "Con **allow, ask, want y expect**, coloca la persona antes de *to*: *asked us to submit*.",
            "**Remember/forget, stop y try** cambian de significado según lleven *-ing* o *to + infinitive*.",
            "Aprende colocaciones completas: *attend a lecture, submit an assignment, improve student engagement*.",
        ],
        "keywords": [
            "gerunds and infinitives ejercicios B2",
            "gerundio infinitivo inglés educación práctica",
            "verb object infinitive ejercicios",
            "education vocabulary B2 ejercicios",
        ],
    },
    42: {
        "slug": "unidad-42-passive-reporting-science",
        "title": "Passive Reporting & Science",
        "full": "Passive Reporting Structures + Scientific Discoveries",
        "focus": "it + passive + that y subject + passive + infinitivo simple, continuo o perfecto",
        "vocab": "Scientific Discoveries",
        "image": "/blog/curso-b2/unit-42/passive-reporting-map.png",
        "prev": "unidad-41-gerunds-infinitives-education-ejercicios-soluciones",
        "next": "unidad-43-modals-obligation-university-ejercicios-soluciones",
        "next_title": "Unidad 43 — Modals of Obligation & University",
        "reading_title": "A cautiously reported breakthrough",
        "listening_title": "Dr Martinez reports trial news",
        "related": [
            "unidad-42-passive-reporting-science",
            "unidad-41-gerunds-infinitives-education",
            "unidad-43-modals-obligation-university",
            HUB,
        ],
        "remember": [
            "Conserva una cláusula completa en **It is said that + subject + verb**.",
            "Destaca la entidad con **subject + is/are said + to-infinitive**.",
            "Usa **to be doing** para un proceso simultáneo y **to have + V3** para un hecho anterior.",
            "La estructura atribuye una afirmación; no demuestra por sí sola que sea cierta.",
        ],
        "keywords": [
            "passive reporting structures ejercicios B2",
            "it is said that is believed to práctica",
            "to be doing to have done reporting",
            "science vocabulary B2 ejercicios",
        ],
    },
    43: {
        "slug": "unidad-43-modals-obligation-university",
        "title": "Modals of Obligation & University",
        "full": "Modals of Obligation and Advice + University Life & Academics",
        "focus": "must, have to, need to, should, ought to, ausencia de obligación y prohibición",
        "vocab": "University Life & Academics",
        "image": "/blog/curso-b2/unit-43/modals-obligation-map.png",
        "prev": "unidad-42-passive-reporting-science-ejercicios-soluciones",
        "next": "unidad-44-future-perfect-medical-ejercicios-soluciones",
        "next_title": "Unidad 44 — Future Perfect & Medical Research",
        "reading_title": "First-week campus rules",
        "listening_title": "Professor Lee explains the course",
        "related": [
            "unidad-43-modals-obligation-university",
            "unidad-42-passive-reporting-science",
            "unidad-44-future-perfect-medical",
            HUB,
        ],
        "remember": [
            "**Must/have to** obligan, **need to** expresa necesidad y **should/ought to** aconseja.",
            "**Don't have to/don't need to** significa que es opcional; **mustn't** lo prohíbe.",
            "Después de *must/should/mustn't* va base sin *to*; **ought to** conserva *to*.",
            "Para pasado y futuro de una obligación usa **had to / will have to**.",
        ],
        "keywords": [
            "modals obligation advice ejercicios B2",
            "must have to need to diferencias práctica",
            "don't have to vs mustn't ejercicios",
            "university vocabulary B2 ejercicios",
        ],
    },
    44: {
        "slug": "unidad-44-future-perfect-medical",
        "title": "Future Perfect & Medical Research",
        "full": "Future Perfect + Medical Research & Health",
        "focus": "will have + participio, límites con by/by the time y Future Perfect pasivo",
        "vocab": "Medical Research & Health",
        "image": "/blog/curso-b2/unit-44/future-perfect-map.png",
        "prev": "unidad-43-modals-obligation-university-ejercicios-soluciones",
        "next": "unidad-45-modal-deduction-space-ejercicios-soluciones",
        "next_title": "Unidad 45 — Modal Deduction & Space",
        "reading_title": "Research milestones before 2030",
        "listening_title": "Dr Martinez presents the timeline",
        "related": [
            "unidad-44-future-perfect-medical",
            "unidad-43-modals-obligation-university",
            "unidad-45-modal-deduction-space",
            HUB,
        ],
        "remember": [
            "La forma es **will have + past participle** para todas las personas.",
            "**By** marca un límite incluido; **until** expresa continuidad hasta ese punto.",
            "Después de **by the time** usa presente para el evento futuro: *by the time regulators meet*.",
            "La pasiva añade **been**: *will have been published*.",
        ],
        "keywords": [
            "future perfect ejercicios B2",
            "will have past participle by práctica",
            "by the time future perfect ejercicios",
            "medical research vocabulary B2",
        ],
    },
    45: {
        "slug": "unidad-45-modal-deduction-space",
        "title": "Modal Deduction & Space",
        "full": "Modal Verbs for Deduction + Space Exploration",
        "focus": "must, might, could y can't para deducciones presentes, continuas y pasadas",
        "vocab": "Space Exploration",
        "image": "/blog/curso-b2/unit-45/modal-deduction-map.png",
        "prev": "unidad-44-future-perfect-medical-ejercicios-soluciones",
        "next": "",
        "next_title": "",
        "reading_title": "Interpreting signals from a mission",
        "listening_title": "Dr Chen analyses space data",
        "related": [
            "unidad-45-modal-deduction-space",
            "unidad-44-future-perfect-medical",
            HUB,
        ],
        "remember": [
            "**Must** concluye con fuerza, **might/could** abre posibilidades y **can't** descarta.",
            "Para presente usa **modal + base/be**; para una acción en curso, **modal + be + -ing**.",
            "Para pasado construye **modal + have + V3**: *must have reached; can't have failed*.",
            "Una deducción debe apoyarse en evidencia y no convierte una posibilidad en un hecho.",
        ],
        "keywords": [
            "modal deduction ejercicios B2",
            "must might could can't deducción práctica",
            "must have might have ejercicios",
            "space vocabulary B2 ejercicios",
        ],
    },
}


READING = {
    41: (
        "Maya decided to take a blended learning course because she enjoys studying independently "
        "but also values discussion. The university expects students to submit every assignment by "
        "the due date and asks them to attend one seminar each week. Maya avoids commuting every day, "
        "yet she never misses the small-group sessions. Last month, she finished writing her first "
        "essay and remembered to check every reference before uploading it. She clearly remembers "
        "receiving useful feedback afterwards. When her original study plan stopped working, her "
        "tutor suggested trying shorter sessions. Maya tried to follow the new routine for a week and "
        "found that it improved her engagement. She now hopes to complete the course with flying colours."
    ),
    42: (
        "It is reported that a research team has tested a new treatment for a rare disease. The lead "
        "scientist is believed to have formed the original hypothesis after reviewing earlier findings. "
        "The laboratory is said to be analysing data from a controlled experiment, while an independent "
        "group checks the evidence. The treatment is thought to be safe at the tested dosage, but its "
        "long-term effects are not yet known. It is expected that a larger clinical trial will begin next "
        "year. The first study is estimated to have cost four million euros. Journalists have called the "
        "result a breakthrough, although the researchers say that more evidence is needed before that "
        "claim can be supported. Their findings are expected to be published after the review."
    ),
    43: (
        "New students must attend Monday's orientation because it explains the university's safety and "
        "academic rules. They have to wear an ID card on campus, but they don't have to wear formal "
        "clothes. Attendance at weekly lectures is compulsory. The Friday workshop is optional, so "
        "students don't need to register for it. They mustn't plagiarise an assignment or invent a "
        "reference because both actions are academic misconduct. Anyone writing a dissertation should "
        "meet their supervisor regularly and ought to discuss problems before the deadline. Students "
        "need to cite every source in academic writing. If they require more time, they should request "
        "an extension instead of submitting incomplete work. Last year, students had to attend all "
        "tutorials online; this year, they will have to attend them on campus."
    ),
    44: (
        "By 2030, a medical research programme will have completed three clinical trials involving more "
        "than eight thousand participants. By the end of the first trial, researchers will have measured "
        "the treatment's efficacy and monitored every serious side effect. They won't have established "
        "the final dosage until all the data has been analysed. By the time regulators review the "
        "evidence, the full findings will have been published and an independent team will have checked "
        "them. The control group will have received a placebo under the approved protocol. Epidemiologists "
        "will also have compared outcomes across several regions. The researchers avoid promising a "
        "breakthrough: they say that the evidence may improve diagnosis and prognosis, but further work "
        "will still be necessary before the treatment enters routine healthcare."
    ),
    45: (
        "A probe near Jupiter has transmitted an unusual signal. Its frequency matches the mission's "
        "equipment, so the signal must be from the probe rather than another spacecraft. One bright "
        "object can't be a normal satellite because it is moving against the expected orbit. It might be "
        "a small asteroid, or it could be an instrument reflection. The control team is still checking. "
        "The probe must be collecting new data because its scientific instruments remain active. It may "
        "also be passing through a region with strong gravity. Engineers received a complete image file "
        "this morning, so the communication system can't have failed during the night. The probe might "
        "have detected ice, but the image could have been distorted. Scientists will not announce a "
        "discovery until the evidence has been analysed."
    ),
}


LISTENING = {
    41: (
        "Hi, I'm Sarah, and I teach at a university. Many of my students enjoy studying in small seminars "
        "rather than listening to long lectures. Last semester, I decided to introduce blended learning. "
        "The university expects us to use different teaching methods and allows students to complete some "
        "assignments online. I ask everyone to submit their work by Friday. One student finished writing "
        "her essay early but forgot to attach the reference list. She remembered uploading the essay, yet "
        "she didn't remember to check the attachment. We stopped to discuss the problem during class. I "
        "suggested trying a checklist, and she hopes to avoid making the same mistake again."
    ),
    42: (
        "Hello, I'm Dr Martinez, and I work in medical research. It is said that our new treatment could "
        "help thousands of patients, but that claim still needs evidence. Our team is believed to have "
        "discovered a promising approach during an earlier experiment. The laboratory is reported to be "
        "analysing the latest data now, and an external group is thought to be checking our findings. It "
        "is expected that the clinical trial will finish next year. One researcher is reported to have "
        "left the project last month, but the study is continuing. The results are expected to be published "
        "after independent review. We describe the work as an innovation, not yet as a breakthrough."
    ),
    43: (
        "Good morning, I'm Professor Lee. Students must submit every assignment by the stated deadline. "
        "You should attend the seminars because they are useful, although the Friday study group is "
        "optional, so you don't have to join it. Everyone has to carry an ID card on campus, but you don't "
        "need to wear formal clothes to lectures. You mustn't cheat in exams or plagiarise another person's "
        "work. If you are writing a dissertation, you ought to speak to your supervisor once a month. You "
        "also need to cite each source accurately. Last term, students had to book tutorials online. From "
        "next month, they will have to reserve a room for group tutorials."
    ),
    44: (
        "Hello, I'm Dr Martinez. By next December, our team will have completed the first clinical trial "
        "for a new vaccine. We will have recruited two thousand participants and assigned half of them to "
        "a control group. By the time the monitoring committee meets, we will have measured efficacy and "
        "recorded every reported side effect. The final dosage won't have been selected by then because "
        "the follow-up period will continue until March. By the end of April, however, the findings will "
        "have been published. Epidemiologists will also have analysed the regional data. We hope the trial "
        "will improve future healthcare, but we won't call it a breakthrough before the evidence is clear."
    ),
    45: (
        "Hi, I'm Dr Chen. The signal we received must be from the Mars rover because it matches our "
        "frequency exactly. That fast object can't be our satellite; our satellite follows a different "
        "orbit. The rover must be analysing a rock sample now because its laboratory unit is using power. "
        "The sample might contain ice, or it could include another mineral. We received only part of the "
        "image, so the rover might have encountered a communication problem. The mission can't have failed, "
        "because valid data arrived this morning. By now, the probe must have reached its destination. We "
        "will compare all the evidence before claiming that the team has made a discovery."
    ),
}


def item(
    prompt: str, options: str, answer: str, explanation: str
) -> tuple[str, str, str, str]:
    return prompt, options, answer, explanation


GRAMMAR = {
    41: [
        (
            "Verbo + -ing o to + infinitive",
            "Elige el patrón exigido por el primer verbo y conserva la forma verbal completa.",
            [
                item("Many students enjoy ___ online.", "studying · to study · study", "studying", "*Enjoy* selecciona *-ing*."),
                item("Leo expects ___ his degree next year.", "to finish · finishing · finish", "to finish", "*Expect* selecciona *to + base* cuando el sujeto realiza ambas acciones."),
                item("The college hopes ___ engagement.", "to improve · improving · improve", "to improve", "*Hope* lleva infinitivo con *to*."),
                item("Maya considered ___ the exam.", "retaking · to retake · retake", "retaking", "*Consider* lleva *-ing*."),
                item("He refused ___ the lecture while ill.", "to attend · attending · attend", "to attend", "*Refuse* selecciona *to + base*."),
            ],
        ),
        (
            "Verbo + objeto + infinitive",
            "Completa con el pronombre objeto y el infinitivo. La persona intermedia realiza la segunda acción.",
            [
                item("The tutor asked (we/us) ___ the assignment.", "us to submit · we to submit · us submitting", "us to submit", "*Ask + object + to + base*."),
                item("The school allows learners ___ tablets.", "to use · using · use", "to use", "*Allow + object + to + base*."),
                item("Parents want their children ___ academic success.", "to achieve · achieving · achieve", "to achieve", "*Want + object + to + base*."),
                item("The university expects (they/them) ___ the due date.", "them to meet · they to meet · them meeting", "them to meet", "Se necesita pronombre objeto antes de *to meet*."),
                item("Corrige: *The lecturer asked she to revise the essay.*", "—", "The lecturer asked her to revise the essay.", "*Her* es el pronombre objeto."),
            ],
        ),
        (
            "Cambios de significado",
            "Usa la pista temporal o funcional para distinguir tarea, recuerdo, cese, propósito, intento y método.",
            [
                item("I remembered ___ the file, so the task was completed.", "to upload · uploading", "to upload", "El recuerdo activó una tarea pendiente."),
                item("I remember ___ the file; I can picture the screen.", "uploading · to upload", "uploading", "Es un recuerdo de una acción pasada."),
                item("The lecturer stopped ___ because the alarm rang. (cesó)", "speaking · to speak", "speaking", "*Stop + -ing* cesa la actividad."),
                item("We stopped ___ a question. (propósito de la pausa)", "to ask · asking", "to ask", "*Stop + to-infinitive* expresa propósito."),
                item("Corrige el consejo de método: *Try to study in shorter sessions and see if it helps.*", "—", "Try studying in shorter sessions and see if it helps.", "*Try + -ing* presenta un método experimental."),
            ],
        ),
    ],
    42: [
        (
            "It + passive + that-clause",
            "Conserva el sujeto y el tiempo dentro de la cláusula introducida por *that*.",
            [
                item("People say the vaccine works.", "It is said that the vaccine works. · It says the vaccine to work.", "It is said that the vaccine works.", "La pasiva impersonal es *It is said that + clause*."),
                item("Researchers think the experiment was successful.", "It is thought that the experiment was successful. · It thought that the experiment succeeds.", "It is thought that the experiment was successful.", "El pasado de la información permanece en la cláusula."),
                item("Experts know that the sample contains ice.", "It is known that the sample contains ice. · It knows the sample to contain ice.", "It is known that the sample contains ice.", "*Known* atribuye conocimiento establecido."),
                item("Analysts estimate that the project cost €4 million.", "It is estimated that the project cost €4 million. · It estimates to cost €4 million.", "It is estimated that the project cost €4 million.", "La cláusula completa conserva sujeto y verbo."),
                item("Corrige: *It is reported the findings to be reliable.*", "—", "It is reported that the findings are reliable.", "El marco con *it* necesita *that + clause*."),
            ],
        ),
        (
            "Sujeto + reporting passive + infinitive",
            "Elige el infinitivo según simultaneidad, proceso en curso o anterioridad.",
            [
                item("People believe the drug is effective.", "The drug is believed to be effective. · The drug is believed to have effective.", "The drug is believed to be effective.", "Estado simultáneo: *to be*."),
                item("People say the lab is analysing data now.", "The lab is said to be analysing data. · The lab is said to have analysed data now.", "The lab is said to be analysing data.", "Proceso actual: *to be + -ing*."),
                item("People report that the scientist made a discovery last year.", "The scientist is reported to have made a discovery. · The scientist is reported to make a discovery.", "The scientist is reported to have made a discovery.", "Hecho anterior: *to have + V3*."),
                item("People think the samples were contaminated earlier.", "The samples are thought to have been contaminated. · The samples are thought to be contaminating.", "The samples are thought to have been contaminated.", "Anterioridad pasiva: *to have been + V3*."),
                item("People expect the findings will be published soon.", "The findings are expected to be published soon. · The findings are expected to publish soon.", "The findings are expected to be published soon.", "Los findings reciben la acción: infinitivo pasivo."),
            ],
        ),
        (
            "Concordancia y reparación",
            "Cada frase contiene un único error objetivo. Reescríbela completa.",
            [
                item("The researchers *is believed* to be checking the evidence.", "—", "The researchers are believed to be checking the evidence.", "El sujeto plural exige *are*."),
                item("The treatment is said *that it works*.", "—", "The treatment is said to work.", "No se mezclan los dos marcos."),
                item("She is thought *to discovered* the species.", "—", "She is thought to have discovered the species.", "El hecho anterior exige *to have + V3*."),
                item("The laboratory is reported *developing* a vaccine.", "—", "The laboratory is reported to be developing a vaccine.", "El proceso simultáneo exige *to be + -ing*."),
                item("The results are expected *to publish* next month.", "—", "The results are expected to be published next month.", "Se necesita infinitivo pasivo."),
            ],
        ),
    ],
    43: [
        (
            "Obligación, necesidad o consejo",
            "Lee la fuente y la fuerza de la instrucción antes de elegir.",
            [
                item("Attendance is compulsory. Students ___ every lecture.", "must attend · should attend · don't have to attend", "must attend", "Una norma obligatoria requiere *must* en esta consigna."),
                item("The institution requires an ID card. Marta ___ one.", "has to wear · ought to wear · might wear", "has to wear", "La exigencia externa y tercera persona usan *has to*."),
                item("The deadline is tomorrow. We ___ today.", "need to finish · ought to finish · don't need to finish", "need to finish", "La fecha crea una necesidad práctica."),
                item("Your draft is unclear. You ___ your supervisor.", "should ask · mustn't ask · don't have to ask", "should ask", "Es una recomendación."),
                item("This source is relevant. You ___ it carefully. (consejo formal)", "ought to read · ought read · must to read", "ought to read", "*Ought* conserva *to*."),
            ],
        ),
        (
            "Opcional, prohibido o desaconsejado",
            "Selecciona por la pista exacta: *optional, forbidden* o *a bad idea*.",
            [
                item("The Friday workshop is optional; you ___ it.", "don't have to attend · mustn't attend · shouldn't attend", "don't have to attend", "Ausencia de obligación: asistir sigue siendo posible."),
                item("Plagiarism is forbidden; you ___ another person's work.", "mustn't copy · don't have to copy · ought not copy", "mustn't copy", "*Mustn't* expresa prohibición."),
                item("Printing is unnecessary; you ___ the article.", "don't need to print · mustn't print · shouldn't print", "don't need to print", "No es necesario, pero no está prohibido."),
                item("Leaving revision until the final night is a bad idea; you ___ it.", "shouldn't leave · mustn't leave · don't have to leave", "shouldn't leave", "Se desaconseja, no se formula una prohibición."),
                item("Corrige el cambio de sentido: *The seminar is optional, so you mustn't attend.*", "—", "The seminar is optional, so you don't have to attend.", "Opcional exige ausencia de obligación."),
            ],
        ),
        (
            "Forma, pregunta y tiempo",
            "Construye toda la expresión y comprueba base, auxiliar, persona y tiempo.",
            [
                item("Corrige: *She must to submit the assignment.*", "—", "She must submit the assignment.", "Tras *must* va base sin *to*."),
                item("___ I ___ this tutorial? (pregunta con have to)", "Do / have to attend · Must / to attend · Does / have attend", "Do / have to attend", "*Have to* usa *do* en preguntas."),
                item("Last year, every student ___ online tutorials. (obligación pasada)", "had to attend · musted attend · must attend", "had to attend", "El pasado productivo es *had to*."),
                item("Next term, we ___ an ID card. (obligación futura)", "will have to carry · will must carry · have to carried", "will have to carry", "El futuro es *will have to + base*."),
                item("Corrige: *He doesn't needs to revise that chapter.*", "—", "He doesn't need to revise that chapter.", "Después de *doesn't* va *need* en base."),
            ],
        ),
    ],
    44: [
        (
            "Afirmativa, negativa y pregunta",
            "Completa la cadena *will have + participle* sin cambiar el límite futuro.",
            [
                item("By next year, the team ___ the trial. (complete)", "will have completed · will completed · has completed", "will have completed", "Future Perfect: *will have + V3*."),
                item("By June, researchers ___ all the data. (analyse)", "will have analysed · will have analyse · will analysed", "will have analysed", "Se necesita el participio *analysed*."),
                item("The study ___ by May. (negative: finish)", "won't have finished · won't has finished · hasn't will finish", "won't have finished", "Negativa: *won't have + V3*."),
                item("___ they ___ the findings by Friday?", "Will / have published · Have / will publish · Will / published", "Will / have published", "Pregunta: *Will + subject + have + V3?*"),
                item("Will the team have recruited 500 people? (respuesta afirmativa)", "Yes, it will. · Yes, it will have. · Yes, it has.", "Yes, it will.", "La short answer recupera *will*."),
            ],
        ),
        (
            "By, until y by the time",
            "Decide si la frase marca finalización, continuidad o el evento que funciona como límite.",
            [
                item("The trial will continue ___ December.", "until · by · in the end of", "until", "*Until* expresa continuidad hasta diciembre."),
                item("The team will have completed the trial ___ December.", "by · until · during", "by", "*By* marca finalización no más tarde del límite."),
                item("The findings will be published ___ December. (dentro de ese mes)", "in · by · until", "in", "*In December* sitúa el evento dentro del mes."),
                item("By the time regulators ___, we will have checked the data.", "meet · will meet · will have met", "meet", "La cláusula temporal futura usa presente."),
                item("Corrige: *By the time the treatment will start, she will have recovered.*", "—", "By the time the treatment starts, she will have recovered.", "Después de *by the time* se usa presente."),
            ],
        ),
        (
            "Pasiva y participios",
            "Revisa *been* en la pasiva y la tercera forma de los verbos irregulares.",
            [
                item("By April, the findings ___. (publish, pasiva)", "will have been published · will have published · will be have published", "will have been published", "Pasiva: *will have been + V3*."),
                item("The vaccine ___ on 2,000 participants. (test, pasiva)", "will have been tested · will have tested · will been tested", "will have been tested", "El sujeto recibe la prueba."),
                item("By then, doctors will have ___ the results.", "seen · saw · see", "seen", "El participio de *see* es *seen*."),
                item("She will have ___ a specialist by Friday.", "seen · saw · seeing", "seen", "*Have* exige participio."),
                item("Corrige: *The treatment will have became available by 2030.*", "—", "The treatment will have become available by 2030.", "El participio de *become* es *become*."),
            ],
        ),
    ],
    45: [
        (
            "Escala de certeza presente",
            "La evidencia indica conclusión fuerte, posibilidad abierta o descarte lógico.",
            [
                item("The frequency matches exactly. The signal ___ from our rover.", "must be · might be · can't be", "must be", "La coincidencia exacta apoya una conclusión fuerte."),
                item("Scientists are unsure. The sample ___ ice.", "might contain · must contain · can't contain", "might contain", "La incertidumbre deja una posibilidad abierta."),
                item("That object follows the wrong orbit. It ___ our satellite.", "can't be · must be · might be", "can't be", "La evidencia contradice la identificación."),
                item("There are two plausible explanations. The light ___ a reflection.", "could be · must be · can't be", "could be", "Una explicación plausible es posibilidad."),
                item("Corrige la deducción negativa: *It mustn't be a star; it moves too quickly.*", "—", "It can't be a star; it moves too quickly.", "*Can't* descarta; *mustn't* suele prohibir."),
            ],
        ),
        (
            "Presente, acción en curso o pasado",
            "Sitúa primero el evento y después construye la cadena modal completa.",
            [
                item("The instruments are using power now. The probe ___ data.", "must be collecting · must collect · must have collected", "must be collecting", "Acción deducida en curso: *modal + be + -ing*."),
                item("The crew look excited. They ___ something unusual.", "must have seen · must see · must be seeing yesterday", "must have seen", "La visión ocurrió antes de la evidencia actual."),
                item("The image is incomplete. The camera ___ a problem.", "might have developed · might developed · might has developed", "might have developed", "Posibilidad pasada: *might have + V3*."),
                item("Valid data arrived today. The mission ___ completely.", "can't have failed · can't fail yesterday · mustn't have failed", "can't have failed", "La evidencia descarta un fracaso anterior."),
                item("Enough time has passed. The probe ___ Jupiter.", "could have reached · could reached · could be reach", "could have reached", "Posibilidad anterior: *could have + V3*."),
            ],
        ),
        (
            "Forma y evidencia",
            "Repara exactamente un error o selecciona la conclusión compatible con la evidencia.",
            [
                item("Corrige: *The signal must to be from Mars.*", "—", "The signal must be from Mars.", "Tras modal va base sin *to*."),
                item("Corrige: *Life might exists elsewhere.*", "—", "Life might exist elsewhere.", "El verbo no lleva *-s* tras modal."),
                item("Corrige: *They must have saw the landing.*", "—", "They must have seen the landing.", "La cadena pasada termina en participio."),
                item("The rover is transmitting normally. Choose the supported conclusion.", "It can't have lost all power. · It mustn't transmit. · It might lost power.", "It can't have lost all power.", "La transmisión descarta una pérdida total anterior."),
                item("Solo hay una señal débil y faltan análisis.", "There might be ice. · There must be ice. · There can't be ice.", "There might be ice.", "La evidencia limitada solo permite posibilidad."),
            ],
        ),
    ],
}


VOCAB = {
    41: [
        ("curriculum", "plan educativo global · programa de una asignatura · calificación final", "plan educativo global"),
        ("lecture", "clase magistral · discusión en grupo pequeño · tutoría individual", "clase magistral"),
        ("seminar", "discusión académica en grupo pequeño · examen formal · recinto universitario", "discusión académica en grupo pequeño"),
        ("assessment", "proceso de evaluación · fecha de entrega · participación voluntaria", "proceso de evaluación"),
        ("academic achievement", "logro académico · asistencia física · tecnología educativa", "logro académico"),
        ("A course combining online and face-to-face work uses ___.", "blended learning · distance only · a lecture hall", "blended learning"),
        ("A substantial piece of work assigned by a tutor is an ___.", "assignment · attendance · assessment method", "assignment"),
        ("The detailed content of one course or subject is its ___.", "syllabus · curriculum system · campus", "syllabus"),
        ("Technology designed for education is called ___.", "EdTech · pedagogy · engagement", "EdTech"),
        ("Sustained attention and participation by learners is ___.", "student engagement · graduation · due date", "student engagement"),
        ("Students must ___ by Friday.", "submit the assignment"),
        ("The lecturer wants to ___ through collaborative tasks.", "improve student engagement"),
        ("Maya hopes to ___ at the end of the degree.", "graduate"),
        ("Please ___ instead of saying *assist a lecture*.", "attend the lecture"),
        ("Leo studied consistently and managed to ___.", "pass with flying colours"),
    ],
    42: [
        ("hypothesis", "explicación comprobable · resultado interpretado · avance decisivo", "explicación comprobable"),
        ("evidence", "datos que apoyan una conclusión · tratamiento médico · objeto en órbita", "datos que apoyan una conclusión"),
        ("findings", "resultados interpretados de un estudio · instrucciones del método · participantes", "resultados interpretados de un estudio"),
        ("breakthrough", "avance decisivo · cualquier descubrimiento pequeño · teoría sin probar", "avance decisivo"),
        ("innovation", "idea o método nuevo y útil · hallazgo natural · repetición de un ensayo", "idea o método nuevo y útil"),
        ("A controlled procedure used to test a hypothesis is an ___.", "experiment · invention · finding", "experiment"),
        ("A systematic process of asking and testing questions is the ___.", "scientific method · clinical result · medical care", "scientific method"),
        ("Research into patterns and causes of disease in populations is ___.", "epidemiology · astronomy · pedagogy", "epidemiology"),
        ("A study evaluating an intervention with participants is a ___.", "clinical trial · laboratory claim · diagnosis", "clinical trial"),
        ("Something identified that was previously unknown is a ___.", "discovery · invention · expectation", "discovery"),
        ("Before drawing a conclusion, scientists must ___.", "gather evidence"),
        ("The team designed an experiment to ___.", "test the hypothesis"),
        ("Researchers will ___ after independent review.", "publish the findings"),
        ("The laboratory plans to ___ next year.", "conduct a clinical trial"),
        ("The result could ___ in disease detection.", "represent a breakthrough"),
    ],
    43: [
        ("campus", "recinto universitario · clase magistral · trabajo escrito", "recinto universitario"),
        ("assignment", "trabajo asignado · sala de conferencias · presencia en clase", "trabajo asignado"),
        ("supervisor", "persona que guía una investigación · estudiante que asiste · autor de una fuente", "persona que guía una investigación"),
        ("attendance", "presencia en clase · participación oral · calificación", "presencia en clase"),
        ("dissertation", "proyecto largo para una titulación · examen breve · referencia bibliográfica", "proyecto largo para una titulación"),
        ("A formal talk to a large group of students is a ___.", "lecture · seminar · tutorial", "lecture"),
        ("A one-to-one or very small teaching session is a ___.", "tutorial · lecture · campus", "tutorial"),
        ("A small discussion class is a ___.", "seminar · lecture hall · dissertation", "seminar"),
        ("Work that is required by the rules is ___.", "compulsory · optional · informal", "compulsory"),
        ("Presenting another person's work as your own is to ___.", "plagiarise · paraphrase · revise", "plagiarise"),
        ("Every quotation must ___.", "cite a source"),
        ("Marta needs to ___ before the exam.", "revise the material"),
        ("If the deadline is impossible, request ___.", "an extension"),
        ("Students must ___ by Monday.", "submit the assignment"),
        ("Plagiarism and invented data are forms of ___.", "academic misconduct"),
    ],
    44: [
        ("clinical trial", "estudio de una intervención con participantes · diagnóstico individual · sistema sanitario", "estudio de una intervención con participantes"),
        ("efficacy", "capacidad de producir el efecto deseado · cantidad administrada · efecto no deseado", "capacidad de producir el efecto deseado"),
        ("dosage", "cantidad y pauta de una medicina · evolución prevista · resultado de laboratorio", "cantidad y pauta de una medicina"),
        ("prognosis", "previsión de la evolución de una condición · identificación de una condición · recuperación completa", "previsión de la evolución de una condición"),
        ("remission", "reducción de signos de una enfermedad · identificación inicial · empeoramiento seguro", "reducción de signos de una enfermedad"),
        ("An unwanted result associated with a medicine is a ___.", "side effect · finding · placebo", "side effect"),
        ("A comparison group in a trial is the ___.", "control group · dosage group · diagnosis", "control group"),
        ("An inactive comparison substance can be a ___.", "placebo · vaccine · symptom", "placebo"),
        ("The identification of a disease or condition is a ___.", "diagnosis · prognosis · recovery", "diagnosis"),
        ("Protection commonly acquired through vaccination is ___.", "immunisation · epidemiology · remission", "immunisation"),
        ("The investigators will ___ before recruitment.", "design the clinical trial"),
        ("The monitoring team must ___ throughout the study.", "record side effects"),
        ("Researchers use the outcome data to ___.", "measure efficacy"),
        ("The journal will ___ in April.", "publish the findings"),
        ("After treatment, the patient hopes to ___.", "make a full recovery"),
    ],
    45: [
        ("astronomy", "estudio científico de cuerpos espaciales · creencia astrológica · viaje tripulado", "estudio científico de cuerpos espaciales"),
        ("satellite", "objeto que orbita un cuerpo · vehículo que recorre una superficie · nave que aterriza", "objeto que orbita un cuerpo"),
        ("probe", "nave no tripulada que recoge datos · base habitable · cohete propulsor", "nave no tripulada que recoge datos"),
        ("rover", "vehículo que se mueve sobre una superficie · objeto rocoso en órbita solar · observatorio", "vehículo que se mueve sobre una superficie"),
        ("orbit", "trayectoria alrededor de un cuerpo · plataforma de lanzamiento · aterrizaje", "trayectoria alrededor de un cuerpo"),
        ("A vehicle that provides propulsion for launch is a ___.", "rocket · rover · satellite", "rocket"),
        ("A base where astronauts live and work in orbit is a ___.", "space station · observatory · launch pad", "space station"),
        ("The force that keeps planets and satellites in orbit is ___.", "gravity · thrust · reflection", "gravity"),
        ("A building containing instruments for observing space is an ___.", "observatory · laboratory rover · space suit", "observatory"),
        ("A rocky body orbiting the Sun is an ___.", "asteroid · meteor light · satellite signal", "asteroid"),
        ("Engineers plan to ___ on Thursday.", "launch the rocket"),
        ("The satellite should ___ after the final engine burn.", "enter orbit"),
        ("The rover was designed to ___ and collect samples.", "explore the surface"),
        ("The control centre continues to ___.", "analyse the data"),
        ("The probe may ___ before transmitting the image.", "reach its destination"),
    ],
}


READING_EX = {
    41: [
        ("What type of course did Maya choose?", "A blended learning course."),
        ("How often must she attend a seminar?", "Once a week."),
        ("What did she finish writing?", "Her first essay."),
        ("What method did her tutor suggest?", "Trying shorter study sessions."),
        ("What does Maya hope to do?", "Complete the course with flying colours."),
        ("Complete: Maya enjoys ___ independently.", "studying"),
        ("Complete: The university expects students ___ assignments.", "to submit"),
        ("What did Maya remember to check?", "Every reference."),
        ("What does she remember receiving?", "Useful feedback."),
        ("What did the new routine improve?", "Her engagement."),
        ("Choose: *remembered to check* is a task / memory.", "a task"),
        ("Choose: *remembers receiving* is a task / memory.", "a memory"),
        ("Put in order: essay — feedback — failed plan — new routine.", "essay → feedback → failed plan → new routine"),
        ("Why can Maya avoid commuting every day?", "Because she is on a blended learning course."),
        ("Did she test the new routine briefly or permanently?", "She tried it for a week."),
    ],
    42: [
        ("What is the research team reported to have tested?", "A new treatment for a rare disease."),
        ("Who is believed to have formed the hypothesis?", "The lead scientist."),
        ("What is the laboratory analysing?", "Data from a controlled experiment."),
        ("When is a larger clinical trial expected to begin?", "Next year."),
        ("How much is the first study estimated to have cost?", "Four million euros."),
        ("Complete: The laboratory is said ___ data.", "to be analysing"),
        ("Complete: The first study is estimated ___ €4 million.", "to have cost"),
        ("What is not yet known?", "The treatment's long-term effects."),
        ("Which group checks the evidence?", "An independent group."),
        ("When are the findings expected to be published?", "After the review."),
        ("Choose: *to have formed* is simultaneous / anterior.", "anterior"),
        ("Choose: *to be analysing* is completed / in progress.", "in progress"),
        ("Put in order: hypothesis — experiment — larger trial — publication.", "hypothesis → experiment → larger trial → publication"),
        ("Why do the researchers avoid confirming a breakthrough?", "Because more evidence is needed."),
        ("Does passive reporting prove that the treatment is safe?", "No; it attributes the claim, and long-term effects are unknown."),
    ],
    43: [
        ("What must new students attend on Monday?", "Orientation."),
        ("What must students wear on campus?", "An ID card."),
        ("Which Friday activity is optional?", "The workshop."),
        ("Whom should dissertation students meet?", "Their supervisor."),
        ("What can students request if they need more time?", "An extension."),
        ("Complete the rule: Students ___ plagiarise.", "mustn't"),
        ("Complete the option: They ___ register for the workshop.", "don't need to"),
        ("What must students do with every source?", "Cite it."),
        ("What two actions count as academic misconduct?", "Plagiarising an assignment and inventing a reference."),
        ("Where will tutorials take place this year?", "On campus."),
        ("Choose: *don't have to wear formal clothes* means optional / forbidden.", "optional"),
        ("Choose: *mustn't plagiarise* means optional / forbidden.", "forbidden"),
        ("Put in order: orientation — regular supervision — extension — submission.", "orientation → regular supervision → extension → submission"),
        ("How did the tutorial obligation change?", "It changed from online attendance to attendance on campus."),
        ("Why should students discuss problems early?", "To address them before the deadline."),
    ],
    44: [
        ("How many clinical trials will the programme have completed?", "Three."),
        ("How many participants will have taken part?", "More than eight thousand."),
        ("What will researchers have measured?", "The treatment's efficacy."),
        ("Who will review the evidence?", "Regulators."),
        ("What will the control group have received?", "A placebo."),
        ("Complete: The programme ___ three trials by 2030.", "will have completed"),
        ("Complete the passive: The findings ___.", "will have been published"),
        ("What will epidemiologists have compared?", "Outcomes across several regions."),
        ("Which two concepts may the evidence improve?", "Diagnosis and prognosis."),
        ("What milestone do the researchers avoid promising?", "A breakthrough."),
        ("Choose: *by 2030* is a deadline / duration.", "a deadline"),
        ("Choose: *until all the data has been analysed* marks completion / continuity.", "continuity"),
        ("Put in order: efficacy measurement — publication — regulation — routine healthcare.", "efficacy measurement → publication → regulation → routine healthcare"),
        ("Why hasn't the final dosage been established earlier?", "Because all the data must be analysed first."),
        ("Does the text promise that the treatment will enter healthcare?", "No; it says further work will be necessary."),
    ],
    45: [
        ("Where is the probe located?", "Near Jupiter."),
        ("Why must the signal be from the probe?", "Its frequency matches the mission's equipment."),
        ("Why can't the object be a normal satellite?", "It is moving against the expected orbit."),
        ("What two possible explanations are given for the object?", "A small asteroid or an instrument reflection."),
        ("What might the probe have detected?", "Ice."),
        ("Complete: The probe must ___ new data.", "be collecting"),
        ("Complete the past exclusion: The system ___.", "can't have failed"),
        ("What arrived this morning?", "A complete image file."),
        ("What might have happened to the image?", "It might have been distorted."),
        ("What will scientists analyse before announcing a discovery?", "The evidence."),
        ("Choose: *must be collecting* is present state / ongoing action.", "ongoing action"),
        ("Choose: *can't have failed* refers to present / past.", "past"),
        ("Put in order: signal — object check — image receipt — evidence analysis.", "signal → object check → image receipt → evidence analysis"),
        ("Does *could be a reflection* express certainty?", "No; it expresses a possibility."),
        ("Why is no discovery announced yet?", "The evidence has not yet been fully analysed."),
    ],
}


LISTENING_EX = {
    41: [
        ("Who is speaking?", "Sarah, a university teacher."),
        ("What kind of classes do many students prefer?", "Small seminars."),
        ("What did Sarah introduce last semester?", "Blended learning."),
        ("When must students submit their work?", "By Friday."),
        ("What did one student forget to attach?", "The reference list."),
        ("Complete: Students enjoy ___ in seminars.", "studying"),
        ("Complete: Sarah decided ___ blended learning.", "to introduce"),
        ("Complete: The university expects teachers ___ different methods.", "to use"),
        ("What did the student remember doing?", "Uploading the essay."),
        ("What method did Sarah suggest?", "Trying a checklist."),
        ("Choose: *forgot to attach* means attached / did not attach.", "did not attach"),
        ("Choose: *stopped to discuss* means ceased discussion / paused for discussion.", "paused for discussion"),
        ("Put in order: blended learning — early essay — missing list — checklist.", "blended learning → early essay → missing list → checklist"),
        ("What does blended learning allow students to do?", "Complete some assignments online."),
        ("What mistake does the student hope to avoid?", "Forgetting or failing to attach the reference list."),
    ],
    42: [
        ("Who is speaking?", "Dr Martinez."),
        ("Who could the treatment help?", "Thousands of patients."),
        ("What is the team believed to have discovered?", "A promising approach."),
        ("When is the clinical trial expected to finish?", "Next year."),
        ("Who left the project?", "One researcher."),
        ("Complete: The laboratory is reported ___ the data.", "to be analysing"),
        ("Complete: An external group is thought ___ the findings.", "to be checking"),
        ("Complete the anterior event: A researcher is reported ___.", "to have left"),
        ("When will the results be published?", "After independent review."),
        ("Which label does Dr Martinez avoid using yet?", "Breakthrough."),
        ("Choose: *to have discovered* is earlier / ongoing.", "earlier"),
        ("Choose: *to be checking* is earlier / ongoing.", "ongoing"),
        ("Put in order: earlier experiment — current analysis — trial completion — publication.", "earlier experiment → current analysis → trial completion → publication"),
        ("Does Dr Martinez present the treatment's benefit as proven?", "No; he says the claim still needs evidence."),
        ("What does he call the work instead of a breakthrough?", "An innovation."),
    ],
    43: [
        ("Who is speaking?", "Professor Lee."),
        ("What must students submit?", "Every assignment."),
        ("Which study group is optional?", "The Friday study group."),
        ("What must everyone carry?", "An ID card."),
        ("How often should dissertation students see a supervisor?", "Once a month."),
        ("Complete the advice: You ___ attend seminars.", "should"),
        ("Complete the option: You ___ join the Friday group.", "don't have to"),
        ("Complete the prohibition: You ___ cheat.", "mustn't"),
        ("What did students have to book online last term?", "Tutorials."),
        ("What will they have to reserve next month?", "A room for group tutorials."),
        ("Choose: no formal clothes means absence of obligation / prohibition.", "absence of obligation"),
        ("Choose: citing sources is a necessity / optional preference.", "a necessity"),
        ("Put in order: assignment rule — optional group — dissertation advice — future room booking.", "assignment rule → optional group → dissertation advice → future room booking"),
        ("Name the two prohibited academic actions.", "Cheating and plagiarising."),
        ("Why should students attend seminars?", "Because they are useful."),
    ],
    44: [
        ("Who is speaking?", "Dr Martinez."),
        ("When will the first trial be complete?", "By next December."),
        ("How many participants will have been recruited?", "Two thousand."),
        ("What will the team have measured?", "Efficacy."),
        ("When will the findings have been published?", "By the end of April."),
        ("Complete: We ___ two thousand participants.", "will have recruited"),
        ("Complete the passive: The dosage ___ by then.", "won't have been selected"),
        ("What will continue until March?", "The follow-up period."),
        ("Who will have analysed the regional data?", "Epidemiologists."),
        ("What does the team hope to improve?", "Future healthcare."),
        ("Choose: December is earlier / later than the April publication.", "earlier"),
        ("Choose: *until March* expresses deadline completion / continuation.", "continuation"),
        ("Put in order: recruitment — monitoring review — follow-up end — publication.", "recruitment → monitoring review → follow-up end → publication"),
        ("Why won't the dosage have been selected at the committee meeting?", "Because the follow-up period will still be continuing."),
        ("When will the team call the result a breakthrough?", "Only after the evidence is clear."),
    ],
    45: [
        ("Who is speaking?", "Dr Chen."),
        ("Where must the signal be from?", "The Mars rover."),
        ("Why can't the object be their satellite?", "It follows a different orbit."),
        ("What might the sample contain?", "Ice."),
        ("What must the probe have reached by now?", "Its destination."),
        ("Complete: The rover must ___ a rock sample.", "be analysing"),
        ("Complete the possibility: The sample ___ another mineral.", "could include"),
        ("Complete the past possibility: The rover ___ a communication problem.", "might have encountered"),
        ("What proves the mission can't have failed?", "Valid data arrived that morning."),
        ("What will the team compare?", "All the evidence."),
        ("Choose: *must be analysing* refers to now / an earlier event.", "now"),
        ("Choose: *might have encountered* is certain / possible.", "possible"),
        ("Put in order: matching signal — sample analysis — partial image — valid data.", "matching signal → sample analysis → partial image → valid data"),
        ("Does Dr Chen claim that ice has definitely been found?", "No; ice is only one possibility."),
        ("What must happen before a discovery is claimed?", "All the evidence must be compared."),
    ],
}


WRITING = {
    41: [
        ("Completa: *Students enjoy ___ (study) online.*", "Students enjoy **studying** online."),
        ("Corrige: *Maya decided taking a blended course.*", "Maya **decided to take** a blended course."),
        ("Elige pronombre y forma: *The tutor asked (we/us) (revise/to revise).*", "The tutor asked **us to revise**."),
        ("Contrasta *remember to upload / remember uploading* en dos frases.", "Modelo: I **remembered to upload** the essay before Friday. I **remember uploading** it from the library."),
        ("Completa ambos sentidos: *The lecturer stopped ___; then she stopped ___ a question.*", "The lecturer stopped **speaking**; then she stopped **to answer** a question."),
        ("Escribe 35–45 palabras con *avoid, consider, blended learning*.", "Modelo: Students who use **blended learning** can **avoid commuting** every day. They should **consider attending** weekly seminars, however, because discussion and immediate feedback improve their understanding of difficult topics and help them apply ideas in practical projects."),
        ("Redacta 35–45 palabras con *ask us to, allow us to, expect us to*.", "Modelo: Our tutors **ask us to submit** assignments online. They **allow us to use** digital sources, but they **expect us to cite** every author accurately before the due date and include a complete reference list with each essay."),
        ("Escribe 45–55 palabras con *stop doing, stop to do, try doing*.", "Modelo: When my old routine stopped **working**, I stopped **to speak** to my tutor. She suggested that I try **studying** in shorter sessions. The method improved my concentration, so I stopped **leaving** every assignment until the final evening and started reviewing my notes after each seminar instead."),
        ("Escribe 50–60 palabras con *curriculum, assessment, student engagement, pass with flying colours*.", "Modelo: The new **curriculum** combines seminars with online projects. Continuous **assessment** gives learners frequent feedback, while group tasks improve **student engagement**. Students still take a final exam, but regular practice helps them understand the material and **pass with flying colours** without depending only on one result at the end of term."),
        ("Escribe 100–120 palabras sobre un curso híbrido. Incluye cuatro verbos + *-ing*, cuatro + infinitivo, tres patrones con objeto y dos contrastes de significado.", "Modelo: I **decided to take** a blended learning course because I **enjoy studying** independently and wanted to **avoid commuting** daily. The curriculum **allows students to watch** lectures online, but tutors **ask us to attend** a weekly seminar and **expect us to submit** each assignment by Friday. I **hope to improve** my academic writing and have **considered joining** an extra tutorial. Last week, I **remembered to upload** my essay, and I remember **receiving** detailed feedback. When my first plan stopped **working**, I stopped **to ask** for help. My tutor suggested trying **studying** before breakfast. I **expect to finish** the course confidently and pass the final assessment with flying colours."),
    ],
    42: [
        ("Transforma: *People say that the vaccine works.*", "**It is said that the vaccine works.** / **The vaccine is said to work.**"),
        ("Transforma: *People believe the lab is analysing data.*", "**The lab is believed to be analysing data.**"),
        ("Transforma el hecho anterior: *People report that Ana made a discovery.*", "**Ana is reported to have made a discovery.**"),
        ("Pasa a plural: *The finding is thought to be reliable.*", "**The findings are thought to be reliable.**"),
        ("Corrige: *The results are expected to publish soon.*", "The results **are expected to be published** soon."),
        ("Redacta 35–45 palabras con *It is said that, hypothesis, evidence*.", "Modelo: **It is said that** the new treatment targets a rare disease. Researchers formed a clear **hypothesis**, but they need stronger **evidence** before presenting the early result as reliable in an international peer-reviewed medical research journal."),
        ("Escribe 35–45 palabras con *is reported to have, breakthrough, findings*.", "Modelo: The lead scientist **is reported to have made** a major **breakthrough**. However, the full **findings** have not passed independent review, so the team describes the result cautiously while other laboratories repeat the experiment under controlled conditions."),
        ("Redacta 45–55 palabras contrastando *to be analysing / to have analysed*.", "Modelo: The laboratory **is said to be analysing** the latest samples now, so the process is still under way. A separate team **is believed to have analysed** the earlier data already, which places that action before the present report."),
        ("Escribe 50–60 palabras con *scientific method, conduct an experiment, clinical trial, publish findings*.", "Modelo: The **scientific method** requires researchers to form a hypothesis and **conduct an experiment** under controlled conditions. If the evidence is promising, they may organise a **clinical trial**. They should **publish the findings** only after careful analysis and review. They must also report limitations so other laboratories can reproduce the procedure."),
        ("Escribe 100–120 palabras como noticia científica prudente. Incluye tres marcos con *it*, cuatro con sujeto, dos infinitivos perfectos y ocho términos científicos.", "Modelo: **It is reported that** a university team has developed a possible treatment. The lead researcher **is believed to have formed** the **hypothesis** after examining earlier **findings**. The laboratory **is said to be conducting** a controlled **experiment**, and an independent group **is thought to be checking** the **evidence**. **It is expected that** a **clinical trial** will begin next year. The first study **is estimated to have cost** €3 million. The treatment **is believed to be** safe at the tested dosage, but long-term effects remain unknown. **It is claimed that** the result is a **breakthrough**; however, the researchers call it an **innovation** until they can publish the findings and repeat the experiment."),
    ],
    43: [
        ("Completa: *Attendance is compulsory; students ___ attend.*", "Attendance is compulsory; students **must attend**."),
        ("Corrige: *She must to submit the dissertation.*", "She **must submit** the dissertation."),
        ("Contrasta opción y prohibición con *don't have to / mustn't*.", "Modelo: You **don't have to attend** the optional workshop. You **mustn't plagiarise** an assignment."),
        ("Pasa a pasado: *We have to attend every tutorial.*", "We **had to attend** every tutorial."),
        ("Formula la pregunta: *It is necessary for me to carry an ID card?*", "**Do I have to carry an ID card?**"),
        ("Escribe 35–45 palabras con *must, have to, compulsory*.", "Modelo: Students **must submit** assignments on time and **have to carry** an ID card on campus. Attendance at the Monday lecture is **compulsory**, so everyone needs to arrive before nine and check the online timetable before entering the lecture hall."),
        ("Redacta 35–45 palabras con *should, ought to, supervisor*.", "Modelo: You **should contact** your **supervisor** when a research problem appears. You **ought to send** a clear question before the tutorial so that your supervisor can prepare useful feedback and the relevant sources."),
        ("Escribe 45–55 palabras con *don't need to, mustn't, academic misconduct*.", "Modelo: You **don't need to print** digital articles, because the lecturer accepts online notes. However, you **mustn't copy** sentences without a reference. Plagiarism is **academic misconduct**, even when only one paragraph has been taken from another writer."),
        ("Escribe 50–60 palabras con *lecture, seminar, tutorial, assignment, extension*.", "Modelo: The weekly **lecture** introduces the main topic, and the **seminar** gives students time to discuss it. During a **tutorial**, the tutor checks each **assignment**. If illness prevents a student from meeting the deadline, they should request an **extension** without lowering the academic standard required for the final submission."),
        ("Escribe 100–120 palabras para estudiantes nuevos. Incluye dos obligaciones, dos necesidades, dos consejos, dos opciones, dos prohibiciones y ocho términos U43.", "Modelo: New students **must attend** orientation and **have to wear** an ID card on **campus**. They **need to submit** each **assignment** before the **deadline** and **need to cite** every source in **academic writing**. You **should attend** the weekly **seminar** and **ought to speak** to your **supervisor** before starting a **dissertation**. You **don't have to wear** formal clothes, and you **don't need to join** the optional Friday **tutorial**. You **mustn't plagiarise** another person's work or invent references; both are **academic misconduct**. Last year, students **had to book** rooms online. Next term, they **will have to reserve** group spaces through the campus system."),
    ],
    44: [
        ("Completa: *By next year, the team ___ (complete) the trial.*", "By next year, the team **will have completed** the trial."),
        ("Corrige: *Scientists will have develop a treatment.*", "Scientists **will have developed** a treatment."),
        ("Construye la negativa: *The trial / not finish / by May.*", "The trial **won't have finished by May**."),
        ("Completa: *By the time regulators ___ (meet), we ___ (publish) the findings.*", "By the time regulators **meet**, we **will have published** the findings."),
        ("Pasa a pasiva: *The team will have tested the vaccine.*", "**The vaccine will have been tested**."),
        ("Escribe 35–45 palabras contrastando *by December / until December*.", "Modelo: The research team will have recruited every participant **by December**, so recruitment will be complete then. Follow-up visits will continue **until December**, which means the monitoring activity itself remains in progress up to that point."),
        ("Redacta 35–45 palabras con *will have measured, efficacy, side effects*.", "Modelo: By the end of the clinical trial, researchers **will have measured efficacy** in both groups and **will have recorded** all serious **side effects** reported by participants, then compared outcomes with those from the control group."),
        ("Escribe 45–55 palabras con una activa y una pasiva en Future Perfect.", "Modelo: By March, epidemiologists **will have analysed** the regional data. By the time the committee meets, the main **findings will have been published** in a medical journal and the results will have been checked independently by a second research team with no role in the original clinical trial or recruitment."),
        ("Escribe 50–60 palabras con *control group, placebo, dosage, diagnosis, prognosis*.", "Modelo: The **control group** received a **placebo** under the approved protocol. Researchers compared outcomes before selecting a final **dosage**. The findings may support an earlier **diagnosis** and a more accurate **prognosis**, but the study does not promise a cure or guarantee that every participant will make a full recovery immediately after treatment."),
        ("Escribe 100–120 palabras sobre hitos médicos hasta 2030. Incluye ocho futuros perfectos, dos pasivas, cuatro límites y ocho términos U44.", "Modelo: **By 2030**, our programme **will have completed** three **clinical trials** and **will have recruited** 8,000 participants. **By next December**, researchers **will have measured** the treatment's **efficacy** and **will have monitored** every serious **side effect**. The **control group will have received** a **placebo**. **By the time regulators meet**, the team **will have selected** a safe **dosage**, and the main **findings will have been published**. An independent laboratory **will have checked** the evidence. **By the end of the decade**, epidemiologists **will have compared** outcomes across several healthcare systems. The treatment **will have been tested** thoroughly, but researchers will still avoid promising a breakthrough, complete recovery or guaranteed remission."),
    ],
    45: [
        ("Completa: *The frequency matches; the signal ___ from the rover.*", "The frequency matches; the signal **must be** from the rover."),
        ("Corrige: *Life might exists elsewhere.*", "Life **might exist** elsewhere."),
        ("Construye el descarte pasado: *valid data arrived / mission / fail*.", "Valid data arrived, so the mission **can't have failed**."),
        ("Contrasta *must be analysing / must have analysed*.", "Modelo: The rover **must be analysing** the sample now. It **must have analysed** the earlier sample yesterday."),
        ("Corrige: *The astronauts must have saw the object.*", "The astronauts **must have seen** the object."),
        ("Escribe 35–45 palabras con *might, could, probe, ice*.", "Modelo: The **probe might have detected** frozen material below the surface. The bright area **could be ice**, but it might also be a reflection from one of the probe's instruments during its latest surface scan today."),
        ("Redacta 35–45 palabras con *must, can't* y una evidencia para cada deducción.", "Modelo: The signal **must be** from our satellite because its frequency matches exactly. The second object **can't be** that satellite because it is moving in the opposite direction, according to the latest tracking data from mission control."),
        ("Escribe 45–55 palabras con *must be + -ing, might have + V3, can't have + V3*.", "Modelo: The rover **must be collecting** data because its instruments are active. It **might have found** a new mineral during the night. Its power system **can't have failed**, since the control centre received a complete file this morning after the probe reached its planned orbit near Mars at the expected time."),
        ("Escribe 50–60 palabras con *orbit, gravity, observatory, asteroid, launch*.", "Modelo: After the **launch**, an **observatory** tracked the spacecraft as it entered **orbit**. Strong **gravity** changed its path near a planet. A second object might be an **asteroid**, although astronomers need more images before identifying it. Scientists checked the tracking data carefully before proposing either explanation to the mission team."),
        ("Escribe 100–120 palabras sobre datos de una misión. Incluye cuatro conclusiones fuertes, cuatro posibilidades, dos descartes, tres tiempos y ocho términos U45.", "Modelo: The signal **must be** from the Mars **rover** because it matches our frequency. The rover **must be crossing** a crater now, and its camera **must be recording** the surface. It **must have reached** the target area overnight. One bright object **might be** a small **asteroid**, or it **could be** an instrument reflection. The rover **might have detected** ice, and the **probe could have transmitted** a partial image. The fast object **can't be** our **satellite** because it follows the wrong **orbit**. The mission **can't have failed**, since valid data arrived today. Strong **gravity** might be affecting the signal. Astronomers at the **observatory** will analyse the evidence before announcing a discovery."),
    ],
}


SPEAKING = {
    41: [
        ("Pronuncia cinco bloques con *-ing* y cinco con infinitivo.", "Guion modelo: **enjoy studying, avoid commuting, consider attending, finish writing, mind helping; decide to enrol, hope to graduate, refuse to cheat, expect to finish, seem to work**."),
        ("Explica *remember to do / doing* en 30 segundos.", "Guion modelo: **Remember to upload** refers to a task. **Remember uploading** refers to a memory of an action that already happened."),
        ("Role-play entre tutor y estudiante con dos objetos + infinitivo.", "A: I **want you to revise** this paragraph. B: When? A: The course **expects students to submit** it by Friday."),
        ("Contrasta oralmente *stop doing / stop to do / try doing*.", "Guion modelo: I **stopped studying** at ten. Earlier, I **stopped to answer** a call. My tutor suggested **trying shorter sessions**."),
        ("Habla 60 segundos sobre blended learning con ocho patrones y seis términos U41.", "Pistas: enjoy/avoid/consider/finish + -ing · decide/hope + to · ask/allow + object + to · curriculum · seminar · assignment · assessment · engagement · due date."),
    ],
    42: [
        ("Pronuncia los dos marcos de reporte con la misma información.", "Guion modelo: **It is believed that the treatment works. The treatment is believed to work.**"),
        ("Explica *to be doing / to have done* en 30 segundos.", "Guion modelo: **The lab is said to be analysing** data now. **The lab is said to have analysed** earlier data already."),
        ("Role-play entre periodista y científica.", "A: What is reported? B: The team **is believed to have made** a discovery. A: Is it confirmed? B: No; more evidence is needed."),
        ("Presenta tres colocaciones del método científico.", "Guion modelo: Researchers **form a hypothesis**, **conduct an experiment**, **gather evidence** and then **publish findings**."),
        ("Informa durante 60 segundos sobre un estudio con seis reportes y ocho términos U42.", "Pistas: it is said/thought/expected · is believed to be · is reported to have · is said to be analysing · hypothesis · experiment · evidence · findings · trial · discovery · innovation · breakthrough."),
    ],
    43: [
        ("Clasifica cinco funciones con un ejemplo oral.", "Guion modelo: **Must** obliges; **need to** shows necessity; **should** advises; **don't have to** makes something optional; **mustn't** prohibits."),
        ("Explica *don't have to / mustn't* en 30 segundos.", "Guion modelo: You **don't have to attend** an optional workshop, but you **mustn't plagiarise** because plagiarism is forbidden."),
        ("Role-play sobre una dissertation.", "A: Do I **have to meet** my supervisor? B: Yes. You **should prepare** questions, and you **must cite** every source."),
        ("Contrasta obligación pasada y futura.", "Guion modelo: Last term, we **had to book** tutorials online. Next term, we **will have to reserve** a room."),
        ("Orienta durante 60 segundos a un estudiante con diez modales y ocho términos U43.", "Pistas: must/have to/need to · should/ought to · don't have to/don't need to · mustn't · campus · lecture · seminar · tutorial · assignment · supervisor · dissertation · misconduct."),
    ],
    44: [
        ("Pronuncia una afirmativa, negativa, pregunta y pasiva.", "Guion modelo: We **will have finished**. We **won't have finished**. **Will you have finished?** The work **will have been finished**."),
        ("Explica *by / until* en 30 segundos.", "Guion modelo: **By Friday** marks a completion deadline. **Until Friday** shows that an activity continues up to Friday."),
        ("Role-play sobre el calendario de un ensayo.", "A: Will you **have recruited** everyone by June? B: Yes. The data **will have been checked** by July."),
        ("Contrasta *in December / by December / by the time*.", "Guion modelo: We will publish **in December**. We will have finished **by December**. **By the time regulators meet**, we will have published the findings."),
        ("Presenta 60 segundos de hitos médicos con ocho futuros perfectos y ocho términos U44.", "Pistas: by next year/2030/the deadline · will have completed/measured/analysed · will have been published/tested · clinical trial · efficacy · dosage · side effect · control group · placebo · diagnosis · prognosis."),
    ],
    45: [
        ("Pronuncia la escala *must / might-could / can't*.", "Guion modelo: It **must be** our rover. It **might be / could be** a reflection. It **can't be** our satellite."),
        ("Explica presente, curso y pasado en 30 segundos.", "Guion modelo: The rover **must be** active, **must be collecting** data now and **must have crossed** the crater earlier."),
        ("Role-play entre control y astronomía.", "A: Could the object be an asteroid? B: It **might be**, but it **can't be** our satellite because the orbit is wrong."),
        ("Justifica tres deducciones con evidencia explícita.", "Guion modelo: The signal **must be** ours because it matches. The camera **might have failed** because the file is partial. The mission **can't have failed** because data arrived."),
        ("Informa durante 60 segundos sobre una misión con diez deducciones y ocho términos U45.", "Pistas: cuatro must · cuatro might/could · dos can't · be / be doing / have done · probe · rover · satellite · orbit · gravity · launch · observatory · asteroid."),
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

No respondas por parecido visual. Localiza la pista de significado o tiempo y comprueba la cadena completa: modal, auxiliar, infinitivo, participio, objeto y concordancia.

{(chr(10) * 2).join(sections)}
"""


def render_vocab(unit: int) -> str:
    entries = VOCAB[unit]
    blocks = [
        ("Traducción precisa", "Elige el único significado que corresponde a la palabra.", entries[:5]),
        ("Elige por definición", "Completa cada definición con una de las tres opciones.", entries[5:10]),
        (
            "Completa el chunk",
            "Escribe la expresión exacta que completa la situación; todas pertenecen al inventario de la unidad.",
            entries[10:],
        ),
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

Aprende cada palabra con su colocación. Las alternativas cercanas obligan a decidir por definición y contexto, no por parecido.

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
        ("Forma, significado y secuencia", "Elige, explica u ordena usando la evidencia presentada."),
    )
    sections = []
    for block_index, (heading, instruction) in enumerate(headings):
        start = block_index * 5 + 1
        block = items[block_index * 5 : block_index * 5 + 5]
        questions = [f"{number}. {question}" for number, (question, _) in enumerate(block, start)]
        answers = [f"{number}. **{answer}**" for number, (_, answer) in enumerate(block, start)]
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
    writing_questions = [f"{number}. {question}" for number, (question, _) in enumerate(WRITING[unit], 1)]
    writing_answers = [f"{number}. {answer}" for number, (_, answer) in enumerate(WRITING[unit], 1)]
    speaking_questions = [f"{number}. {question}" for number, (question, _) in enumerate(SPEAKING[unit], 11)]
    speaking_answers = [f"{number}. {answer}" for number, (_, answer) in enumerate(SPEAKING[unit], 11)]
    return f"""## Lección 5 — Writing y Speaking

**Objetivo:** producir mensajes controlados con {META[unit]["focus"]}.

### Ejercicios 1–10 — Writing con modelo

Respeta la extensión y usa todas las expresiones indicadas. Cada tarea incluye una respuesta o un modelo completo: puedes cambiar los detalles, pero conserva las estructuras evaluadas.

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
    if unit == 45:
        next_step = "3. Continúa en la [Unidad 46 del curso B2](/curso-b2/unit-46) cuando quieras avanzar."
        next_link = "- [Continuar con Unidad 46](/curso-b2/unit-46)"
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

Este cuaderno reúne los **ejercicios de la Unidad {unit} del curso B2** (*{meta["full"]}*). Practicarás reconocimiento, transformación y producción con tareas cerradas o criterios verificables. Cada actividad indica qué debes escribir, qué opciones puedes usar o qué información debes localizar.

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

Clasifica cada fallo como **significado**, **forma**, **tiempo**, **concordancia**, **orden** o **vocabulario**. Copia la corrección mínima y crea una frase nueva con el mismo patrón. Después vuelve a intentarlo sin opciones.

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


VAGUE_PATTERNS = (
    "respuesta abierta",
    "tema libre",
    "según tu criterio",
    "modelo ok",
    "forma correcta con",
    "answer may vary",
    "write anything",
    "responde libremente",
)


def validate_source_data() -> None:
    model_length_errors = []
    for unit in range(41, 46):
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


def validate_rendered(unit: int, content: str) -> None:
    lowered = content.lower()
    vague = [pattern for pattern in VAGUE_PATTERNS if pattern in lowered]
    assert content.count("## Lección ") == 5
    assert content.count("<details>") == 15
    assert not vague, f"U{unit} vague patterns: {vague}"
    assert "https://www." not in content
    assert f"unit-{unit}/reading-workbook.mp3" in content
    assert f"unit-{unit}/listening-workbook.mp3" in content


def make_audios() -> None:
    for unit in range(41, 46):
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
    validate_source_data()
    OUT.mkdir(parents=True, exist_ok=True)
    for unit in range(41, 46):
        path = OUT / f"{META[unit]['slug']}-ejercicios-soluciones.md"
        content = render_unit(unit)
        validate_rendered(unit, content)
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
    print("done B2 U41–45 workbooks")


if __name__ == "__main__":
    main()
