#!/usr/bin/env python3
"""Generate the B2 Unit 41–45 theory articles, diagrams and English audio.

The source material mirrors the live lessons under ``src/lib/course/b2``:
gerunds and infinitives in education, passive reporting in science, modals of
obligation at university, the future perfect in medical research, and modal
deduction in space exploration. Unit 45 begins the next thematic block; it is
not treated as a review.
"""
from __future__ import annotations

import re
import textwrap
from pathlib import Path

from gtts import gTTS
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT_MD = ROOT / "src/content/blog/curso-b2"
DATE = "2026-09-01"
BG = (244, 248, 252)
INK = (20, 35, 55)
ACCENT = (11, 116, 145)
ACCENT_2 = (99, 66, 168)
CARD = (255, 255, 255)
LINE = (198, 214, 228)
LEVEL_KEYWORDS = ["curso inglés B2 gratis", "ejercicios inglés B2 gratis"]


def font(size: int, bold: bool = False):
    candidates = [
        (
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
            if bold
            else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
        ),
        (
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
            if bold
            else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
        ),
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def canvas():
    image = Image.new("RGB", (1200, 675), BG)
    return image, ImageDraw.Draw(image)


def card(draw, xy):
    draw.rounded_rectangle(xy, radius=18, fill=CARD, outline=LINE, width=2)


def wrapped(draw, text: str, xy, width: int, size=18, bold=False, fill=INK):
    draw.multiline_text(
        xy,
        textwrap.fill(text, width=width),
        fill=fill,
        font=font(size, bold),
        spacing=8,
    )


def save_image(image, unit: int, name: str):
    path = ROOT / f"public/blog/curso-b2/unit-{unit}" / name
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "PNG", optimize=True)
    print("img", path.relative_to(ROOT))


def grammar_map(unit: int, name: str, heading: str, blocks):
    image, draw = canvas()
    draw.text((48, 35), heading, fill=INK, font=font(34, True))
    for index, (label, rule, example) in enumerate(blocks):
        column, row = index % 2, index // 2
        x, y = 48 + column * 570, 108 + row * 255
        card(draw, (x, y, x + 530, y + 225))
        draw.text((x + 22, y + 20), label, fill=ACCENT, font=font(23, True))
        wrapped(draw, rule, (x + 22, y + 69), 44, 18, True)
        wrapped(draw, example, (x + 22, y + 139), 48, 17)
    save_image(image, unit, name)


def vocab_grid(unit: int, name: str, heading: str, words):
    image, draw = canvas()
    draw.text((48, 35), heading, fill=INK, font=font(34, True))
    for index, word in enumerate(words[:12]):
        x = 48 + (index % 4) * 280
        y = 110 + (index // 4) * 170
        card(draw, (x, y, x + 250, y + 140))
        wrapped(draw, word, (x + 16, y + 42), 18, 18, True)
    save_image(image, unit, name)


def context_scene(unit: int, name: str, heading: str, examples):
    image, draw = canvas()
    draw.text((48, 35), heading, fill=INK, font=font(34, True))
    card(draw, (48, 105, 1150, 620))
    for index, example in enumerate(examples[:5]):
        wrapped(
            draw,
            f"{index + 1}. {example}",
            (80, 140 + index * 92),
            86,
            18,
            index == 0,
            ACCENT_2 if index == 0 else INK,
        )
    save_image(image, unit, name)


DIAGRAMS = {
    41: {
        "map": (
            "gerunds-infinitives-map.png",
            "Gerunds & infinitives · Education",
            [
                ("VERB + -ING", "enjoy · avoid · consider · finish · mind", "Students enjoy studying online."),
                ("VERB + TO", "decide · hope · refuse · expect · seem", "She decided to take a blended course."),
                ("OBJECT + TO", "allow · ask · want · expect + person + to", "The tutor asked us to submit an essay."),
                ("MEANING CHANGE", "remember · forget · stop · try", "Stop talking / stop to talk."),
            ],
        ),
        "vocab": (
            "education-vocabulary.png",
            "Education systems & learning",
            [
                "curriculum",
                "lecture",
                "seminar",
                "assignment",
                "assessment",
                "blended learning",
                "online learning",
                "EdTech",
                "pedagogy",
                "student engagement",
                "academic achievement",
                "due date",
            ],
        ),
        "scene": (
            "education-context.png",
            "Verb patterns in a modern course",
            [
                "Many students enjoy studying in small seminars.",
                "The university expects them to submit work on time.",
                "A lecturer decided to introduce blended learning.",
                "Students tried using EdTech to improve engagement.",
                "They remembered to upload the final assignment.",
            ],
        ),
    },
    42: {
        "map": (
            "passive-reporting-map.png",
            "Passive reporting · Scientific discoveries",
            [
                ("IT + PASSIVE", "It is said / thought / believed that + clause", "It is thought that the trial succeeded."),
                ("SUBJECT + TO", "subject + is said / believed + to-infinitive", "The drug is believed to be effective."),
                ("ONGOING", "subject + is said + to be + -ing", "The lab is said to be developing a vaccine."),
                ("EARLIER EVENT", "subject + is reported + to have + V3", "The team is reported to have made a breakthrough."),
            ],
        ),
        "vocab": (
            "science-vocabulary.png",
            "Scientific method & discoveries",
            [
                "scientific method",
                "hypothesis",
                "experiment",
                "evidence",
                "findings",
                "discovery",
                "breakthrough",
                "innovation",
                "clinical trial",
                "medical research",
                "epidemiology",
                "publish",
            ],
        ),
        "scene": (
            "science-context.png",
            "Reporting a scientific breakthrough",
            [
                "It is said that the new treatment will help patients.",
                "The team is believed to have discovered a new approach.",
                "The lab is said to be developing a vaccine.",
                "The trial is expected to finish next year.",
                "The findings are reported to have cost millions.",
            ],
        ),
    },
    43: {
        "map": (
            "modals-obligation-map.png",
            "Obligation & advice · University",
            [
                ("OBLIGATION", "must / have to + base verb", "Students must submit assignments on time."),
                ("NECESSITY", "need to + base verb", "You need to revise before the exam."),
                ("NO OBLIGATION", "do not have to / do not need to", "You do not have to wear formal clothes."),
                ("ADVICE / BAN", "should · ought to / must not", "You should ask; you must not plagiarise."),
            ],
        ),
        "vocab": (
            "university-vocabulary.png",
            "University life & academics",
            [
                "lecture",
                "seminar",
                "tutorial",
                "assignment",
                "campus",
                "lecturer",
                "supervisor",
                "dissertation",
                "deadline",
                "attendance",
                "plagiarise",
                "academic misconduct",
            ],
        ),
        "scene": (
            "university-context.png",
            "Rules and advice on campus",
            [
                "Students must attend compulsory lectures.",
                "They have to submit each assignment by its deadline.",
                "You should speak to your supervisor if you need help.",
                "You do not have to come to campus on Fridays.",
                "You must not plagiarise academic work.",
            ],
        ),
    },
    44: {
        "map": (
            "future-perfect-map.png",
            "Future Perfect · Medical research",
            [
                ("FORM", "will have + past participle", "The team will have completed the trial."),
                ("BY", "deadline: no later than a future point", "They will have published it by December."),
                ("BY THE TIME", "present in time clause; future perfect in main", "By the time we retire, research will have advanced."),
                ("PASSIVE", "will have been + past participle", "The findings will have been published."),
            ],
        ),
        "vocab": (
            "medical-vocabulary.png",
            "Medical research & health",
            [
                "clinical trial",
                "vaccine",
                "diagnosis",
                "prognosis",
                "treatment",
                "findings",
                "efficacy",
                "side effect",
                "dosage",
                "control group",
                "placebo",
                "immunisation",
            ],
        ),
        "scene": (
            "medical-context.png",
            "Milestones in a clinical trial",
            [
                "By next year, the team will have completed the trial.",
                "Researchers will have measured the vaccine's efficacy.",
                "They will have recorded every serious side effect.",
                "The findings will have been published by December.",
                "By then, healthcare will have gained new evidence.",
            ],
        ),
    },
    45: {
        "map": (
            "modal-deduction-map.png",
            "Modal deduction · Space exploration",
            [
                ("STRONG YES", "must + be / must have + V3", "The signal must be from the rover."),
                ("POSSIBILITY", "might / could + be", "There might be ice on the Moon."),
                ("STRONG NO", "cannot + be / cannot have + V3", "That object cannot be a satellite."),
                ("PAST CLUE", "modal + have + past participle", "The astronauts might have found something."),
            ],
        ),
        "vocab": (
            "space-vocabulary.png",
            "Space exploration & astronomy",
            [
                "astronomy",
                "astronaut",
                "mission",
                "satellite",
                "rocket",
                "orbit",
                "probe",
                "space station",
                "launch",
                "rover",
                "gravity",
                "observatory",
            ],
        ),
        "scene": (
            "space-context.png",
            "Evidence from a distant mission",
            [
                "The signal must be from the Mars rover.",
                "That object cannot be a satellite.",
                "The astronauts might have discovered something new.",
                "There could be ice beneath the surface.",
                "The mission must have reached its destination by now.",
            ],
        ),
    },
}


def diagrams() -> None:
    for unit, group in DIAGRAMS.items():
        grammar_map(unit, *group["map"])
        vocab_grid(unit, *group["vocab"])
        context_scene(unit, *group["scene"])


AUDIOS = {
    41: {
        "verb-ing": "Enjoy studying. Avoid cheating. Consider taking the course. Finish writing the assignment. Would you mind helping me?",
        "verb-to": "Decide to study. Hope to graduate. Refuse to attend. Expect to finish. The lecturer seems to be helpful.",
        "object-to": "The teacher asked the students to submit their essays. The school allows them to use tablets. Parents want their children to succeed.",
        "meaning-contrast": "Remember to upload the essay. I remember uploading it. Stop talking. Stop to talk to the tutor. Try studying in shorter sessions.",
        "education-vocabulary": "Curriculum. Lecture. Seminar. Assignment. Assessment. Blended learning. Online learning. Educational technology. Pedagogy. Student engagement. Academic achievement.",
        "reading-u41": "Many students enjoy studying online because they can avoid commuting. A lecturer decided to introduce blended learning. The university expects students to submit essays by the due date. One student finished writing a dissertation before graduation.",
        "dialogue-u41": "Do you enjoy studying online? Yes, but I sometimes stop to ask my tutor a question. Did you remember to upload the assignment? Yes. I clearly remember uploading it last night.",
        "practice-u41": "Choose the pattern after the first verb. Use a gerund after enjoy, avoid and finish. Use an infinitive after decide, hope and refuse. Put the person before the infinitive after ask, allow, want and expect.",
    },
    42: {
        "it-reporting": "It is said that the discovery will change medicine. It is thought that the experiment was successful. It is expected that the findings will be published soon.",
        "subject-reporting": "The new drug is believed to be effective. The vaccine is said to work against the virus. The laboratory is considered to be one of the best.",
        "ongoing-reporting": "The company is said to be planning a clinical trial. The team is reported to be developing a treatment.",
        "perfect-reporting": "The scientist is reported to have made a breakthrough. The study is estimated to have cost millions. She is thought to have discovered a new species.",
        "science-vocabulary": "Scientific method. Hypothesis. Experiment. Evidence. Findings. Discovery. Breakthrough. Innovation. Clinical trial. Medical research. Epidemiology.",
        "reading-u42": "It is said that the new vaccine will change medicine. The researcher is believed to have made a major breakthrough. The company is said to be planning a new clinical trial. It is expected that the results will be published soon.",
        "dialogue-u42": "What is reported about the team? It is believed that the team discovered a new approach. So the team is believed to have discovered it. Is the trial still running? Yes. The laboratory is said to be analysing the data.",
        "practice-u42": "Use it is reported that before a full clause. Make the reported person or thing the subject before is reported to. Use to have plus a past participle when the reported event happened earlier.",
    },
    43: {
        "obligation": "Students must submit assignments on time. They have to wear identification cards on campus. She has to hand in her dissertation by December.",
        "necessity": "I need to study harder. We need to finish the assignment today. He needs to speak to his supervisor.",
        "no-obligation-ban": "You do not have to wear formal clothes. You must not cheat in exams. Optional does not mean forbidden.",
        "advice": "You should attend the seminar. You ought to ask the tutor for help. You should revise before the exam.",
        "university-vocabulary": "Lecture. Seminar. Tutorial. Assignment. Campus. Lecturer. Supervisor. Dissertation. Deadline. Attendance. Plagiarise. Academic misconduct.",
        "reading-u43": "Students must attend all lectures because attendance is compulsory. You should speak to your supervisor if you have problems. You do not have to come to campus on Fridays. You must not plagiarise.",
        "dialogue-u43": "Do I have to attend the tutorial? Yes, it is compulsory. Do I have to wear formal clothes? No, you do not. Should I speak to my supervisor? Yes, you ought to contact her today.",
        "practice-u43": "Separate obligation, necessity, advice, absence of obligation and prohibition. Must not means forbidden. Do not have to means optional. Follow every modal with the base form.",
    },
    44: {
        "future-perfect": "By next year, the team will have completed the clinical trial. Scientists will have developed new treatments by twenty thirty.",
        "by-deadlines": "By Friday, she will have finished the report. By the end of the year, the hospital will have opened a new wing.",
        "by-the-time": "By the time the treatment starts, the patient will have recovered. By the time we retire, we will have seen many medical breakthroughs.",
        "future-perfect-passive": "The findings will have been published by the end of the month. The vaccine will have been tested on thousands of volunteers.",
        "medical-vocabulary": "Clinical trial. Vaccine. Diagnosis. Prognosis. Findings. Efficacy. Side effect. Dosage. Recovery. Control group. Placebo. Immunisation.",
        "reading-u44": "By twenty thirty, scientists will have developed new treatments. The clinical trial will have completed its final phase by next year. The breakthrough will have saved millions of lives. Epidemiology will have advanced.",
        "dialogue-u44": "Will the trial finish next year? Yes. By December, the team will have completed its final phase. Will the findings be public? They will have been published by then.",
        "practice-u44": "Use will have plus a past participle for completion before a future reference point. By introduces the deadline. After by the time, use a present form for future meaning.",
    },
    45: {
        "present-deduction": "The signal must be from the rover. There might be water on Mars. That moving light cannot be a star. Ice could exist beneath the surface.",
        "past-deduction": "The astronauts must have seen something amazing. They might have discovered a new mineral. The probe could have reached Jupiter.",
        "certainty-scale": "Must expresses a strong positive conclusion. Might and could express possibility. Cannot expresses a strong negative conclusion.",
        "ongoing-deduction": "The crew must be analysing the data. The rover might be crossing a crater. The satellite cannot be moving that quickly.",
        "space-vocabulary": "Astronomy. Astronaut. Mission. Satellite. Rocket. Orbit. Probe. Space station. Launch. Rover. Gravity. Observatory.",
        "reading-u45": "The signal from the probe must be from Jupiter. Life might exist on other planets. That light cannot be a star. The astronauts must have seen something amazing. The mission could have succeeded.",
        "dialogue-u45": "Where is that signal from? It must be from the Mars rover because it matches our frequency. Could there be ice nearby? Yes, the probe might have detected it. That object cannot be a satellite.",
        "practice-u45": "Start with the evidence, then choose the certainty level and time. Use modal plus be for a present state. Use modal plus have plus a past participle for an earlier event.",
    },
}


def tts() -> None:
    for unit, clips in AUDIOS.items():
        directory = ROOT / f"public/audio/blog/curso-b2/unit-{unit}"
        directory.mkdir(parents=True, exist_ok=True)
        for name, text in clips.items():
            path = directory / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def exercise_block(items):
    chunks = []
    for index, (question, answer) in enumerate(items, 1):
        chunks.append(
            f"""### Ejercicio {index}

{question}

<details><summary>Ver solución</summary>

{answer}
</details>"""
        )
    return "\n\n".join(chunks)


def study_lab(unit: int, theme: str, targets: str, contrasts: str, chunks: str, production: str):
    return f"""## 9. Del reconocimiento al control B2

Elegir una respuesta entre tres opciones demuestra reconocimiento, pero no garantiza que puedas recuperar **{targets}** cuando escribes o hablas. Trabaja en tres vueltas. Primero identifica la pista que decide la forma: verbo anterior, relación temporal, fuente de la obligación, grado de certeza o momento de la acción. Después tapa el ejemplo y reconstruye la oración completa. Finalmente cambia el sujeto, el tiempo y un detalle de **{theme}**. Si el patrón sigue funcionando, has aprendido una herramienta productiva y no una frase aislada.

La comparación directa evita reglas demasiado generales. Coloca juntas las decisiones que compiten: **{contrasts}**. Escribe una frase correcta con cada alternativa y otra que debas reparar. La explicación tiene que señalar una evidencia concreta: «*finish* selecciona *-ing*», «el suceso informado es anterior, por eso aparece *to have + V3*», «opcional exige *don't have to*, no *mustn't*» o «la señal coincide con la frecuencia, por eso *must* expresa una conclusión fuerte». Decir únicamente «suena mejor» no crea una regla reutilizable.

Aprende bloques completos: **{chunks}**. Añade sujeto, complemento y una situación. Una tarjeta eficaz presenta la intención en español y exige una oración inglesa completa; otra muestra la oración y pide justificar la forma frente a su rival. La traducción inicial puede orientar, pero el control aparece cuando asocias estructura, significado y contexto.

## 10. Lectura, audio y pronunciación estratégica

Usa los ocho audios como pruebas de recuperación. En la primera escucha no leas: apunta solo los grupos de palabras que reconoces. En la segunda sigue el texto y marca auxiliares, infinitivos, participios y palabras que reciben énfasis. En la tercera haz *shadowing*: repite con una demora breve sin detener el clip. Mantener unido *is believed to have*, *will have completed* o *might have discovered* reduce pausas que suelen provocar errores.

No intentes imitar velocidad antes de mantener la forma. Pronuncia lentamente el bloque correcto, acelera de manera gradual y vuelve a insertarlo en una oración. En las contracciones, conserva la gramática: *mustn't* sigue significando prohibición y *can't have* todavía necesita participio. Para vocabulario, acentúa la sílaba principal y guarda la colocación: *clinical trial, academic achievement, submit an assignment, reach orbit*.

Después del reading, resume cada oración sin copiarla. Identifica quién sostiene la afirmación, qué evidencia existe y cuándo ocurre el hecho. Convierte dos frases a otra estructura válida y explica qué se conserva. Esta reconstrucción obliga a procesar el mensaje, mientras que releer de forma pasiva puede crear una sensación engañosa de dominio.

## 11. Rutina guiada y repaso espaciado

Dedica cinco minutos a clasificar diez ejemplos. No completes todavía: anota solo la familia y la pista. Usa otros cinco minutos para producir las formas desde cero. En una tabla, escribe **intención**, **estructura** y **ejemplo de {theme}**. Comienza por la intención para que la memoria tenga que recuperar el inglés.

Durante cinco minutos transforma frases: afirmativa a negativa o pregunta, presente a pasado, singular a plural, acción presente a anterior. Comprueba que cada cambio conserva auxiliares, partículas y participios. Combina después dos objetivos con *although, because, whereas, therefore* o *as a result*. Los conectores obligan a construir un argumento B2 y evitan secuencias de frases desconectadas.

Reserva cinco minutos para corrección razonada. Clasifica el error como **selección**, **forma**, **orden**, **tiempo**, **concordancia** o **vocabulario**. Escribe la corrección mínima y una oración nueva. Copiar una solución varias veces produce familiaridad visual; justificarla y transferirla a otro ejemplo produce control.

Termina con cinco minutos de producción: **{production}**. Grábate o escribe sin consultar las tablas. Revisa cuatro criterios: forma completa, elección justificable, vocabulario preciso y mensaje coherente. Si te corriges al hablar, usa *I mean...* y repite el bloque entero.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-{unit}/practice-u{unit}.mp3" title="🔊 Práctica guiada Unidad {unit}"></audio>

Haz una prueba al día siguiente, otra tres días después y otra una semana más tarde. Reduce el apoyo en cada sesión: primero tablas, luego palabras clave y finalmente solo una situación. Si una forma falla dos veces, colócala al principio del siguiente repaso y contrástala con la alternativa que elegiste por error.

Antes de avanzar, comprueba:

- [ ] Produzco las formas objetivo sin ver opciones.
- [ ] Justifico al menos tres contrastes con una pista concreta.
- [ ] Mantengo auxiliar, infinitivo o participio al transformar.
- [ ] Comprendo reading y audios sin traducir palabra por palabra.
- [ ] Uso vocabulario real de **{theme}** en ejemplos propios.
- [ ] Corrijo cada error y creo una frase de transferencia.
"""


def article(data):
    keywords = "\n".join(f"  - {item}" for item in data["keywords"] + LEVEL_KEYWORDS)
    related = "\n".join(f"  - {item}" for item in data["related"])
    faq_yaml = "\n".join(
        f"  - question: {question}\n    answer: >-\n      {answer}"
        for question, answer in data["faqs"]
    )
    faq_body = "\n\n".join(
        f"### {question}\n\n{answer}" for question, answer in data["faqs"]
    )
    learn = "\n".join(f"- {item}" for item in data["learn"])
    guides = "\n".join(f"- {item}" for item in data["guides"])
    return f"""---
category: curso-b2
date: '{DATE}'
updatedDate: '{DATE}'
author: linguafly-team
title: "{data['title']}"
description: >-
  {data['description']}
readTime: {data.get('readTime', '32 min')}
keywords:
{keywords}
canonical: 'https://linguafly.app/blog/curso-b2/{data['slug']}'
image: {data['image']}
alt: "{data['alt']}"
related_routes:
{related}
faqs:
{faq_yaml}
excerpt: >-
  {data['excerpt']}
---
{data['intro']}

> **Practica en el curso:** [Unidad {data['unit']}](/curso-b2/unit-{data['unit']})<br>
> **Cuaderno de ejercicios:** [Unidad {data['unit']} con soluciones](/blog/curso-b2/{data['slug']}-ejercicios-soluciones)<br>
> **Antes:** {data['before']}

---

## Qué aprenderás

{learn}

![{data['alt']}]({data['image']})

---

{data['sections']}

---

## Tip del profesor

{data['tip']}

---

## Resumen rápido

{data['summary']}

---

## Siguiente paso en el curso B2

{data['next']}

### Guías relacionadas

{guides}

---

## Preguntas frecuentes

{faq_body}

---

## Fuentes

{data['sources']}
"""


def body_word_count(markdown: str) -> int:
    body = markdown.split("---", 2)[2]
    return len(re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:['’][A-Za-z]+)?", body))


def write_checked(data):
    markdown = article(data)
    count = body_word_count(markdown)
    if count < 2000:
        raise ValueError(f"{data['slug']}: {count} body words; minimum is 2000")
    path = OUT_MD / f"{data['slug']}.md"
    path.write_text(markdown if markdown.endswith("\n") else markdown + "\n", encoding="utf-8")
    print("md", path.relative_to(ROOT))
    print("words", data["slug"], count)


# ARTICLE_SECTIONS

U41_SECTIONS = r"""## 1. El segundo verbo no se elige por traducción

En la **Unidad 41**, el primer verbo determina la forma del siguiente. En *students enjoy studying*, **enjoy** selecciona **-ing**; en *the lecturer decided to introduce blended learning*, **decide** selecciona **to + verbo base**. En español ambas continuaciones pueden traducirse con un infinitivo, pero esa coincidencia no permite predecir el patrón inglés.

![Mapa de gerundios e infinitivos en educación B2](/blog/curso-b2/unit-41/gerunds-infinitives-map.png)

Conviene aprender **verbo + patrón + ejemplo**, no una columna de verbos aislados. *Enjoy studying, avoid commuting, finish writing; decide to enrol, hope to graduate, refuse to cheat*. El gerundio funciona aquí como complemento verbal: no significa necesariamente que la acción esté ocurriendo ahora. El infinitivo con *to* tampoco expresa futuro por sí solo; la relación depende del verbo principal y del contexto.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-41/verb-ing.mp3" title="🔊 Verbos seguidos de gerundio"></audio>

## 2. Verbos seguidos de -ing

El inventario vivo de la lección incluye **enjoy, avoid, consider, finish** y **mind**:

| Verbo | Patrón | Ejemplo educativo |
| :--- | :--- | :--- |
| **enjoy** | enjoy + **-ing** | Many students enjoy **studying** online. |
| **avoid** | avoid + **-ing** | They avoid **commuting** to campus. |
| **consider** | consider + **-ing** | She considered **taking** the exam again. |
| **finish** | finish + **-ing** | He finished **writing** his dissertation. |
| **mind** | mind + **-ing** | Would you mind **helping** with this assignment? |

No insertes *to* después de estos verbos en el objetivo de U41: no *enjoy to study* ni *finish to write*. Con **mind**, la pregunta cortés *Would you mind helping me?* significa «¿te importaría ayudarme?». La respuesta *No, not at all* acepta la petición; un *yes* sin explicación puede sonar como si la ayuda molestara.

El sujeto de la acción en *-ing* suele recuperarse del contexto: *Sara finished writing* significa que Sara escribió. Cuando aparece un posesivo —*I appreciate your helping*— entramos en una construcción más formal que no constituye el núcleo de esta unidad. Prioriza los patrones exactos de las lecciones y produce complementos completos: **avoid cheating in exams**, **consider using a new teaching method**, **finish submitting the assessment**.

## 3. Verbos seguidos de to + infinitive

<audio controls preload="none" src="/audio/blog/curso-b2/unit-41/verb-to.mp3" title="🔊 Verbos seguidos de infinitivo"></audio>

**Decide, hope** y **refuse** se construyen directamente con infinitivo: *decide to take a course; hope to graduate; refuse to attend*. **Seem** también aparece con infinitivo: *The lecturer seems to be helpful*. La lección usa **expect to finish**, donde el sujeto de *expect* también realiza la acción esperada.

| Intención | Forma | Ejemplo |
| :--- | :--- | :--- |
| tomar una decisión | decide **to + base** | I decided **to study** abroad. |
| expresar esperanza | hope **to + base** | We hope **to pass** with flying colours. |
| negarse | refuse **to + base** | She refused **to attend** while ill. |
| mostrar expectativa propia | expect **to + base** | He expects **to finish** next year. |
| expresar apariencia | seem **to + base** | The method seems **to improve** engagement. |

Después de *to*, utiliza forma base: *to submit*, no *to submitted* ni *to submitting*. La negación suele colocarse antes del infinitivo —*decided not to leave; appears not to work*— o sobre el verbo principal si cambia el alcance —*didn't decide to leave*. La primera comunica una decisión de no marcharse; la segunda dice que no tomó esa decisión.

## 4. Verb + object + infinitive: quién hace la segunda acción

<audio controls preload="none" src="/audio/blog/curso-b2/unit-41/object-to.mp3" title="🔊 Verbo objeto e infinitivo"></audio>

Con **allow, ask, want** y **expect**, una persona puede aparecer entre los dos verbos:

> subject + verb + **person/object** + **to + base**

- *The teacher **asked the students to submit** their essays.*
- *The school **allows learners to use** tablets.*
- *Parents **want their children to achieve** academic success.*
- *The university **expects students to meet** the due date.*

El objeto es quien realiza la acción del infinitivo. *The lecturer asked us to consider different methods* no significa que el lecturer los considere, sino que **we** debemos hacerlo. Los pronombres toman forma de objeto: **me, you, him, her, it, us, them**. Di *asked **her** to revise*, no *asked she to revise*.

No todos los verbos de esta unidad admiten el objeto. *I hope you to pass* no funciona en inglés estándar; usa *I hope that you pass* o *I hope you pass*. *He suggested me to study* tampoco pertenece a estos patrones: *suggest studying* o *suggest that I study*. Aprender qué verbo abre cada marco evita trasladar mecánicamente la estructura española.

## 5. Remember, forget, stop y try: cambia el significado

<audio controls preload="none" src="/audio/blog/curso-b2/unit-41/meaning-contrast.mp3" title="🔊 Contrastes de significado"></audio>

Estos verbos aceptan dos continuaciones, pero no cuentan la misma relación:

| Contraste | Significado | Ejemplo |
| :--- | :--- | :--- |
| **remember to do** | recordar una tarea pendiente y realizarla | Remember **to upload** the essay. |
| **remember doing** | conservar el recuerdo de una acción pasada | I remember **uploading** it. |
| **forget to do** | no realizar una tarea por olvido | He forgot **to cite** the source. |
| **forget doing** | no conservar el recuerdo de haberla realizado | I'll never forget **receiving** my degree. |
| **stop doing** | dejar una actividad | The class stopped **talking**. |
| **stop to do** | interrumpir una actividad para realizar otra | We stopped **to ask** a question. |
| **try to do** | intentar algo difícil | She tried **to finish** before midnight. |
| **try doing** | probar un método como posible solución | Try **studying** in shorter sessions. |

La línea temporal aclara *remember/forget*. En **remember to submit**, el recuerdo aparece antes de la entrega y permite cumplirla. En **remember submitting**, la entrega ya ocurrió y ahora existe una memoria. En *She forgot submitting her essay*, el texto presupone que sí la entregó; olvidó el recuerdo. En *She forgot to submit it*, la entrega no ocurrió.

Con **stop**, identifica si cesa la misma acción o si aparece un propósito. *The lecturer stopped speaking* indica silencio; *the lecturer stopped to answer a question* significa que interrumpió lo que hacía para responder. Con **try**, no conviertas el contraste en éxito garantizado: ambos patrones pueden terminar bien o mal. La diferencia es intento dirigido frente a método experimental.

## 6. Education Systems & Learning: inventario preciso

![Vocabulario de sistemas educativos y aprendizaje](/blog/curso-b2/unit-41/education-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-41/education-vocabulary.mp3" title="🔊 Vocabulario de educación"></audio>

**Curriculum** es el conjunto de materias y experiencias planificadas por una institución; un **syllabus** suele detallar el contenido de una asignatura concreta. Una **lecture** es una exposición formal ante un grupo, mientras un **seminar** favorece discusión en un grupo menor y un **tutorial** ofrece apoyo más individual.

Una **assignment** es un trabajo encargado; un **essay** es un tipo de texto argumentativo; una **dissertation** es un proyecto largo de investigación para una titulación. **Assessment** nombra el proceso de evaluar y puede incluir exámenes, proyectos y participación. **Academic achievement** describe logros en los estudios, no solo una nota aislada.

**Online learning** ocurre mediante internet. **Distance learning** separa físicamente a estudiante e institución y puede usar diferentes medios. **Blended learning** combina trabajo online y presencial. **EdTech** —*educational technology*— reúne herramientas tecnológicas aplicadas a la educación; **pedagogy** estudia principios y métodos de enseñanza. **Student engagement** incluye atención, participación e implicación sostenida.

Colocaciones útiles del curso:

- **design a curriculum** y **introduce a teaching method**;
- **attend a lecture/seminar** y **take a blended learning course**;
- **submit an assignment by the due date**;
- **assess student progress** y **improve student engagement**;
- **achieve academic success** y **pass with flying colours**.

*Assist a lecture* es interferencia del español: usa **attend a lecture**. *Present an exam* tampoco es la opción general: **take/sit an exam**; quien evalúa puede **set** o **mark** it.

## 7. Reading alineado: choices in a blended programme

![Gerundios e infinitivos en un curso moderno](/blog/curso-b2/unit-41/education-context.png)

> Many students **enjoy studying online** because they can **avoid commuting** to campus. Last year, Maya **decided to take a blended learning course**. The university **expects students to submit their essays by the due date**, and tutors **ask them to consider different teaching methods**. Maya **finished writing her dissertation** before graduation. She clearly **remembers uploading** the final copy, but she also **remembered to check** every reference. When one study plan failed, her tutor said, “Try **studying** in shorter sessions.”

<audio controls preload="none" src="/audio/blog/curso-b2/unit-41/reading-u41.mp3" title="🔊 Reading Unidad 41"></audio>

El reading combina los marcos de las lecciones vivas. *Enjoy studying, avoid commuting* y *finish writing* llevan *-ing*. *Decided to take* presenta infinitivo. *Expects students to submit* y *ask them to consider* insertan a quien realiza la segunda acción. Las dos formas de *remember* diferencian recuerdo pasado y tarea cumplida; *try studying* recomienda experimentar con un método.

Para comprobar comprensión, reemplaza *Maya* por *Maya and Luis*: cambian *she remembers* por *they remember*, pero los complementos no cambian. Después transforma *the university expects students...* en pasiva manteniendo el significado: *Students are expected to submit...*.

## 8. Diálogo, escritura y errores frecuentes

<audio controls preload="none" src="/audio/blog/curso-b2/unit-41/dialogue-u41.mp3" title="🔊 Diálogo Unidad 41"></audio>

> **Tutor:** Do you **enjoy studying** online?<br>
> **Student:** Yes, but I sometimes **stop to ask** a question during a video.<br>
> **Tutor:** Have you **considered attending** the weekly seminar?<br>
> **Student:** Yes. I **decided to join** it yesterday.<br>
> **Tutor:** Did you **remember to upload** your assignment?<br>
> **Student:** I did, and I remember **checking** every reference.

| Error | Corrección razonada |
| :--- | :--- |
| *Students enjoy to study online.* | enjoy **studying**: *enjoy + -ing*. |
| *She decided studying abroad.* | decided **to study**. |
| *The tutor asked we to submit it.* | asked **us to submit** it. |
| *Parents want that children succeed.* | want **their children to succeed**. |
| *I remember to upload it yesterday.* | Si recuerdas el hecho pasado: **remember uploading**. |
| *We stopped studying to ask a question.* | Puede ser correcto, pero si interrumpimos para preguntar: **stopped to ask**. |
| *Try to study in shorter sessions* como consejo de método | **Try studying** destaca la prueba de una estrategia. |
| *assist a lecture* | **attend a lecture**. |

En la tarea escrita, no insertes todos los verbos objetivo en una lista. Presenta un problema educativo, compara dos métodos y cuenta una decisión. Así surgen funciones reales: *students avoid commuting; lecturers allow them to work online; one learner tried changing her routine; she hopes to graduate*. Revisa cada segundo verbo rodeando *-ing*, subrayando *to* y encuadrando los objetos.
"""
U41_SECTIONS += study_lab(
    41,
    "Education Systems & Learning",
    "gerundios, infinitivos, objetos e infinitivos y los cuatro contrastes de significado",
    "verb + -ing / verb + to; sujeto propio / object + to; remember to / remember -ing; stop to / stop -ing; try to / try -ing",
    "enjoy studying, decide to enrol, ask students to submit, remember uploading, remember to check y try studying",
    "explica durante tres minutos cómo mejorarías un programa de blended learning; usa cinco verbos con -ing, cinco con infinitivo, tres patrones con objeto y los cuatro contrastes",
)
U41_SECTIONS += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
    [
        ("Completa: *Many students enjoy ___ online.*", "**Studying**. *Enjoy* selecciona gerundio."),
        ("Corrige: *She decided taking a blended course.*", "**She decided to take a blended course.**"),
        ("Elige pronombre y forma: *The lecturer asked (we/us) (submit/to submit) the essay.*", "**Asked us to submit**: pronombre objeto antes del infinitivo."),
        ("Distingue: *I remembered to upload it / I remember uploading it.*", "La primera presenta una tarea recordada y cumplida; la segunda, el recuerdo posterior de la acción."),
        ("Completa dos significados: *The lecturer stopped ___; the lecturer stopped ___ a question.*", "**Stopped speaking; stopped to answer**. Cesó la actividad frente a interrumpir otra para responder."),
        ("Da un consejo experimental con *try*.", "Ejemplo: **Try studying in shorter sessions.** *-ing* propone probar un método."),
        ("Completa: *The school allows ___ tablets in class.*", "**The school allows students to use tablets in class.**"),
        ("Distingue *curriculum* y *syllabus*.", "El **curriculum** cubre el programa educativo amplio; el **syllabus**, el contenido de una asignatura."),
        ("Repara la colocación: *assist a lecture and present an exam*.", "**Attend a lecture and take/sit an exam.**"),
        ("Producción: escribe 160–190 palabras sobre blended learning.", "Incluye cinco patrones con *-ing*, cinco con *to*, dos objetos + infinitivo, dos contrastes de significado y ocho términos educativos."),
    ]
)


U42_SECTIONS = r"""## 1. Para qué sirve el passive reporting

La ciencia distingue entre el hecho observado y la persona o institución que lo comunica. Las **passive reporting structures** permiten presentar una afirmación sin repetir *people say, researchers believe* o sin colocar la fuente en primer plano: *It is thought that the experiment was successful; the experiment is thought to have been successful*.

![Mapa de estructuras de reporte en pasiva B2](/blog/curso-b2/unit-42/passive-reporting-map.png)

La estructura no convierte automáticamente una afirmación en verdad. **Is said, is believed, is thought** y **is reported** atribuyen contenido a una fuente o consenso; el grado de evidencia depende del contexto. En escritura académica real, una fuente concreta suele ser preferible. En U42, el objetivo gramatical es transformar reportes manteniendo sujeto, tiempo relativo y significado.

## 2. It is said/thought/believed that + clause

<audio controls preload="none" src="/audio/blog/curso-b2/unit-42/it-reporting.mp3" title="🔊 Reporte impersonal con it"></audio>

El primer marco conserva una oración completa después de **that**:

> **It + be + reporting participle + that + subject + verb**

| Verbo | Ejemplo |
| :--- | :--- |
| say | It **is said that** the discovery will change medicine. |
| think | It **is thought that** the experiment was successful. |
| believe | It **is believed that** the vaccine works. |
| expect | It **is expected that** the trial will finish next year. |
| know | It **is known that** climate change is accelerating. |
| report | It **is reported that** the team made a breakthrough. |

**It** es sujeto anticipatorio y no representa al descubrimiento. La cláusula después de *that* lleva su propio sujeto. Mantén el tiempo de la información: *People believe the drug is effective → It is believed that the drug is effective*. Si el reporte está en pasado, *It was believed that...* sitúa la creencia entonces.

Otros participios de la lección son **understood, hoped, estimated, claimed, alleged** y **considered**. No son intercambiables en registro: *alleged* comunica una acusación no demostrada; *estimated* una cifra calculada; *hoped* un resultado deseado; *known* conocimiento establecido.

## 3. Subject + is said/thought/believed + to-infinitive

<audio controls preload="none" src="/audio/blog/curso-b2/unit-42/subject-reporting.mp3" title="🔊 Sujeto personal en reporte pasivo"></audio>

El segundo marco convierte el sujeto de la información en sujeto principal:

> **reported subject + be + reporting participle + to-infinitive**

*People believe **the new drug** is effective* se transforma en **The new drug is believed to be effective**. *People say **the vaccine** works* pasa a **The vaccine is said to work**. El auxiliar **be** concuerda: *the treatment **is** believed; the findings **are** believed*.

Ambas versiones pueden comunicar el mismo contenido:

- *It is said that the company is planning a vaccine.*
- *The company is said to be planning a vaccine.*

La versión con **it** facilita conservar una cláusula larga. La versión personal destaca a la entidad investigada y comprime el mensaje. No mezcles los marcos: no *The company is said that it is planning* ni *It is said the company to be planning*.

## 4. Simultaneidad, acción en curso y anterioridad

<audio controls preload="none" src="/audio/blog/curso-b2/unit-42/ongoing-reporting.mp3" title="🔊 Reporte de acciones en curso"></audio>

La forma del infinitivo expresa la relación temporal con el reporte:

| Relación | Forma | Ejemplo |
| :--- | :--- | :--- |
| estado o acción simultánea | **to + base** | The vaccine is believed **to work**. |
| estado con *be* | **to be** | The drug is believed **to be** effective. |
| proceso en curso | **to be + -ing** | The lab is said **to be developing** a treatment. |
| hecho anterior | **to have + V3** | The scientist is reported **to have made** a breakthrough. |
| pasiva anterior | **to have been + V3** | The samples are thought **to have been contaminated**. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-42/perfect-reporting.mp3" title="🔊 Infinitivo perfecto en reporte pasivo"></audio>

El error más importante consiste en copiar el tiempo de la cláusula sin calcular anterioridad. *People think she discovered a species last year* necesita **She is thought to have discovered** porque el descubrimiento es anterior a la creencia actual. *People say the team is developing a treatment* usa **is said to be developing** porque el proceso coincide con el reporte.

Si el propio verbo de reporte está en pasado, la relación sigue siendo relativa: *The scientist was believed to have left before the trial began*. Primero fija el momento del reporte; después pregunta si el hecho era simultáneo, estaba en curso o ya había ocurrido.

## 5. Transformación paso a paso y concordancia

Para transformar *People report that the research cost millions*:

1. Localiza el sujeto de la información: **the research**.
2. Conviértelo en sujeto principal.
3. Conjuga la pasiva de *report* en concordancia: **is reported**.
4. Detecta que *cost* ocurrió antes del reporte actual.
5. Añade **to have + participio**: *The research is reported **to have cost** millions*.

Con plural: *People believe the findings are reliable → The findings **are believed to be** reliable*. Con una cifra, *The project is estimated to have cost ten million euros*. Con futuro, suele mantenerse el marco con *it*: *It is expected that results will be published soon*. También es posible *The results are expected to be published soon*, donde *to be published* es pasiva.

Las preguntas y negativas afectan al reporte: *Is the treatment believed to work? The study is not thought to be reliable*. No uses *does*: el auxiliar ya es **be**. En una respuesta breve: *Is it believed to work? — Yes, it is*.

## 6. Scientific Discoveries: método, resultados y comunicación

![Vocabulario de descubrimientos científicos](/blog/curso-b2/unit-42/science-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-42/science-vocabulary.mp3" title="🔊 Vocabulario científico"></audio>

El **scientific method** comienza con una pregunta y una **hypothesis**, una explicación comprobable. Un **experiment** controla condiciones para ponerla a prueba. Los datos pueden aportar **evidence**; su análisis produce **findings**. Una conclusión sólida debe ajustarse a la evidencia y reconocer limitaciones.

Una **discovery** es algo encontrado o identificado; un **invention** es algo creado. **Innovation** introduce una idea o método nuevo y útil. Un **breakthrough** es un avance decisivo que cambia las posibilidades de un campo. No todo resultado novedoso alcanza esa importancia.

**Medical research** investiga salud y enfermedad. Un **clinical trial** evalúa una intervención con participantes bajo un protocolo. **Epidemiology** estudia distribución, causas y patrones de enfermedad en poblaciones. **Healthcare** es el sistema o servicio de atención. La exploración espacial, los satélites y la astronomía también aparecen en el inventario amplio de U42, aunque el reading central emplea investigación médica.

Aprende colocaciones:

- **form/test a hypothesis**;
- **conduct/run an experiment**;
- **collect/analyse data** y **gather evidence**;
- **report/publish findings**;
- **make a discovery / make a breakthrough**;
- **conduct a clinical trial** y **develop a treatment**.

En inglés académico, *do an experiment* es posible en contextos generales, pero **conduct an experiment** ofrece registro preciso. *Realise a discovery* es interferencia: **make a discovery**.

## 7. Reading alineado: a reported breakthrough

![Reporte pasivo en una noticia científica](/blog/curso-b2/unit-42/science-context.png)

> **It is said that** a new vaccine will change medicine. The lead researcher **is believed to have made a major breakthrough** after testing a new hypothesis. **It is thought that** the first experiment was successful, and the company **is said to be planning a clinical trial**. The laboratory **is reported to be analysing** additional data. **It is expected that** the findings will be published soon. The full programme **is estimated to have cost** millions.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-42/reading-u42.mp3" title="🔊 Reading Unidad 42"></audio>

La primera, tercera y sexta afirmaciones conservan cláusulas completas después de *that*. Las demás colocan *researcher, company, laboratory* y *programme* como sujetos. *To have made / to have cost* sitúan hechos anteriores; *to be planning / to be analysing* presentan procesos actuales.

Transforma de vuelta para comprobar equivalencia: *People believe that the lead researcher made a breakthrough; people report that the laboratory is analysing data*. La fuente genérica forma parte del ejercicio gramatical; en un informe real, sustituirías *people* por el estudio, la institución o el medio que sostiene la afirmación.

## 8. Diálogo, prudencia científica y errores

<audio controls preload="none" src="/audio/blog/curso-b2/unit-42/dialogue-u42.mp3" title="🔊 Diálogo Unidad 42"></audio>

> **Journalist:** What **is reported** about the research team?<br>
> **Scientist:** The team **is believed to have discovered** a new approach.<br>
> **Journalist:** Is the trial running?<br>
> **Scientist:** The laboratory **is said to be analysing** the latest data.<br>
> **Journalist:** When will the findings appear?<br>
> **Scientist:** **It is expected that** they will be published soon.

| Error | Corrección |
| :--- | :--- |
| *It says that the trial succeeded* para pasiva impersonal | **It is said that** the trial succeeded. |
| *The drug is believed that it works.* | The drug **is believed to work**. |
| *The researchers is reported...* | The researchers **are reported**. |
| *She is thought to discovered it.* | **to have discovered** si ocurrió antes. |
| *The lab is said developing a vaccine.* | is said **to be developing**. |
| *The findings are expected to publish.* | are expected **to be published**. |
| *make an experiment* | **conduct an experiment**. |
| *realise a discovery* | **make a discovery**. |

El reporte pasivo puede ocultar una fuente débil. En producción B2, úsalo para practicar estructura, pero añade evidencia: *The treatment is believed to be effective according to the published trial*. Distingue observación, interpretación y expectativa. Esta precisión mejora a la vez gramática y alfabetización científica.
"""
U42_SECTIONS += study_lab(
    42,
    "Scientific Discoveries",
    "las dos estructuras de reporte pasivo y sus infinitivos simples, continuos, perfectos y pasivos",
    "it + passive + that / subject + passive + to; to be / to be doing / to have done / to have been done",
    "it is thought that, is believed to be, is said to be developing, is reported to have made y is expected to be published",
    "presenta durante tres minutos un descubrimiento: atribuye cinco afirmaciones, diferencia hechos actuales y anteriores, y usa diez términos del método científico",
)
U42_SECTIONS += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
    [
        ("Transforma: *People say that the vaccine works.*", "**It is said that the vaccine works** o **The vaccine is said to work**."),
        ("Completa: *The drug ___ highly effective.*", "**Is believed to be** highly effective."),
        ("Transforma: *People report that the scientist made a breakthrough.*", "**The scientist is reported to have made a breakthrough.**"),
        ("Elige: *The lab is said (to develop / to be developing) a vaccine now.*", "**To be developing**: proceso en curso simultáneo."),
        ("Pasa a plural: *The result is thought to be reliable.*", "**The results are thought to be reliable.**"),
        ("Corrige: *The findings are expected to publish soon.*", "**The findings are expected to be published soon.**"),
        ("Distingue *discovery, invention* y *breakthrough*.", "Una **discovery** encuentra; una **invention** crea; un **breakthrough** es un avance decisivo."),
        ("Completa colocaciones: *___ a hypothesis; ___ an experiment; ___ findings.*", "**Test a hypothesis; conduct an experiment; publish/report findings.**"),
        ("Explica qué comunica *alleged*.", "Presenta una afirmación o acusación que no se da por demostrada; no equivale a *known*."),
        ("Producción: escribe 170–200 palabras como noticia científica prudente.", "Usa cuatro marcos con *it*, cuatro con sujeto + infinitivo, dos infinitivos perfectos y diez términos científicos."),
    ]
)


U43_SECTIONS = r"""## 1. Obligación, necesidad, consejo y prohibición

En la **Unidad 43**, traducir todos los modales como «deber» borra distinciones esenciales. *Students **must** submit assignments* presenta obligación fuerte; *they **have to** wear ID cards* refleja una regla; *you **need to** revise* expresa necesidad; *you **should/ought to** ask the tutor* aconseja; *you **don't have to** attend* elimina la obligación; *you **mustn't** plagiarise* prohíbe.

![Mapa de modales de obligación y consejo universitario](/blog/curso-b2/unit-43/modals-obligation-map.png)

La estructura básica de los modales puros es **modal + verbo base**: *must attend, should revise, ought to ask*. **Have to** y **need to** se comportan como verbos y cambian con persona y tiempo: *she has to submit; they needed to leave; do we have to attend?*.

## 2. Must y have to: obligación fuerte y fuente de la regla

<audio controls preload="none" src="/audio/blog/curso-b2/unit-43/obligation.mp3" title="🔊 Must y have to"></audio>

**Must** presenta una obligación como fuerte, inmediata o asumida por quien habla: *We must finish this report by Friday*. También aparece en instrucciones formales: *Students must submit their essays on time*. **Have to** destaca con frecuencia una exigencia externa o circunstancial: *She has to attend the seminar because it is part of the course*.

La distinción de fuente ayuda, pero no es absoluta: en normas escritas se usa *must* aunque la autoridad sea externa. Lo que no cambia es la gramática:

| Tiempo/función | Must | Have to |
| :--- | :--- | :--- |
| presente | You **must attend**. | You **have to attend**. |
| tercera persona | She **must attend**. | She **has to attend**. |
| pasado | — | She **had to attend**. |
| futuro | — | She **will have to attend**. |
| pregunta | **Must** we attend? | **Do** we **have to** attend? |

Para pasado y futuro, **had to / will have to** son las opciones productivas normales. No uses *musted*. En preguntas cotidianas, *Do I have to...?* es mucho más frecuente que *Must I...?*, que puede sonar formal.

## 3. Need to: necesidad práctica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-43/necessity.mp3" title="🔊 Need to para necesidad"></audio>

**Need to + base** expresa que algo es necesario para lograr un resultado: *I need to study harder for the exam; we need to finish today because the deadline is tomorrow*. Como verbo léxico, utiliza **do/does/did**:

- *He **needs to speak** to his supervisor.*
- *They **don't need to revise** that chapter.*
- ***Does** she **need to submit** a draft?*
- *We **needed to cite** every source.*

La lección muestra huecos como *I ___ to study*, cuya respuesta es **need**, porque *to* ya aparece. Si el hueco incluye toda la expresión, escribe **need to**. No produzcas *must to* o *should to*: solo **ought** conserva *to* entre los modales objetivo.

**Don't need to** y **don't have to** suelen comunicar ausencia de necesidad/obligación: realizar la acción sigue siendo posible. *You don't need to come early* no ordena quedarse en casa.

## 4. Don't have to frente a mustn't

<audio controls preload="none" src="/audio/blog/curso-b2/unit-43/no-obligation-ban.mp3" title="🔊 Ausencia de obligación y prohibición"></audio>

Este es el contraste de seguridad más importante:

| Forma | Significado | Escena universitaria |
| :--- | :--- | :--- |
| **don't have to** | no es obligatorio; es opcional | You don't have to come to campus on Friday. |
| **don't need to** | no es necesario | You don't need to print the digital article. |
| **mustn't** | está prohibido | You mustn't plagiarise. |
| **shouldn't** | no es aconsejable | You shouldn't leave revision until the last night. |

Si una reunión es opcional, *you mustn't attend* cambia el mensaje a «tienes prohibido asistir». Si copiar una fuente sin citar está prohibido, *you don't have to plagiarise* solo dice que no existe obligación de hacerlo y resulta absurdo. Busca las pistas **optional, not necessary, forbidden, against the rules, a bad idea**.

En pasado, la ausencia de obligación puede ser *didn't have to*. Esta forma no confirma si la acción ocurrió: *I didn't have to attend* permite que asistiera voluntariamente. Para prohibición pasada, expresa la regla con *wasn't allowed to* o *couldn't* según el contexto.

## 5. Should y ought to: consejo y expectativa razonable

<audio controls preload="none" src="/audio/blog/curso-b2/unit-43/advice.mp3" title="🔊 Should y ought to para aconsejar"></audio>

**Should + base** y **ought to + base** ofrecen consejo: *You should ask the tutor; you ought to speak to your supervisor*. **Ought to** puede sonar algo más formal o menos frecuente, pero en estos ejemplos el grado de recomendación es parecido.

La negativa es **shouldn't + base** y **ought not to + base**: *You shouldn't skip tutorials; you ought not to ignore feedback*. La pregunta con *should* es común —*Should I cite this source?*—; *Ought I to...?* es correcta pero formal.

**Should** también puede expresar expectativa: *The library should be open by now*. Ese uso no es el foco principal de U43. En contexto académico, decide si la frase aconseja una conducta o predice lo que probablemente ocurre. No conviertas consejo en norma: *You should attend an optional workshop* recomienda; *you must attend a compulsory seminar* obliga.

## 6. University Life & Academics: espacios y participantes

![Vocabulario de vida universitaria y académica](/blog/curso-b2/unit-43/university-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-43/university-vocabulary.mp3" title="🔊 Vocabulario universitario"></audio>

Una **lecture** suele ser una exposición ante un grupo grande; un **seminar**, una sesión de discusión; un **tutorial**, una sesión individual o de grupo muy pequeño. Un **lecturer** enseña y da clases. Un **tutor** apoya el aprendizaje; un **supervisor** orienta un proyecto de investigación o dissertation.

**Campus** es el recinto universitario. **Attendance** significa presencia en clase y puede ser **compulsory** u **optional**. Una **assignment** es un trabajo asignado; una **dissertation**, un proyecto extenso de investigación. El **deadline** es el límite; una **extension** concede más tiempo.

En **academic writing**, debes **cite a source** y proporcionar referencias. **To quote** reproduce palabras exactas; **to paraphrase** reformula; ambas acciones requieren atribución. **To plagiarise** es presentar trabajo ajeno como propio. **Plagiarism** puede constituir **academic misconduct**, categoría más amplia que incluye fraude, datos inventados u otras infracciones.

Colocaciones de la unidad:

- **attend a lecture/seminar/tutorial**;
- **submit/hand in an assignment** y **meet a deadline**;
- **write/hand in a dissertation**;
- **revise for an exam** y **get a good grade**;
- **speak to a supervisor**;
- **cite/reference a source**;
- **wear an ID card on campus**.

En inglés británico, **revise for an exam** es la expresión central; *review material* también existe, especialmente en otros contextos. No traduzcas *career* como carrera universitaria: usa **degree/course** según el sentido.

## 7. Reading alineado: first-week rules

![Reglas y consejos en el campus](/blog/curso-b2/unit-43/university-context.png)

> Students **must attend** all compulsory lectures and **have to submit** assignments by the stated deadline. You **should speak** to your supervisor if a research problem appears, and you **ought to cite** every source carefully. Students **don't have to come** to campus on Fridays because they can work from home. However, they **mustn't plagiarise** or cheat: both are academic misconduct. Before an exam, each learner **needs to revise** the relevant material.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-43/reading-u43.mp3" title="🔊 Reading Unidad 43"></audio>

El texto replica las decisiones de reading y listening vivos. *Must attend* y *have to submit* codifican normas; *should speak / ought to cite* son recomendaciones; *don't have to come* hace opcional la presencia del viernes; *mustn't plagiarise* prohíbe; *needs to revise* presenta necesidad práctica.

Cambia las reglas al pasado: *students had to attend; they didn't have to come on Fridays; they weren't allowed to plagiarise*. Después convierte el consejo a pregunta: *Should I speak to my supervisor?* No intentes formar *did must* o *musted*.

## 8. Diálogo, tono y errores frecuentes

<audio controls preload="none" src="/audio/blog/curso-b2/unit-43/dialogue-u43.mp3" title="🔊 Diálogo Unidad 43"></audio>

> **Student:** **Do I have to attend** the tutorial?<br>
> **Tutor:** Yes. It is compulsory, and you **must arrive** on time.<br>
> **Student:** **Do I have to wear** formal clothes?<br>
> **Tutor:** No, you **don't have to**, but you **have to wear** your ID card.<br>
> **Student:** **Should I speak** to my supervisor about the dissertation?<br>
> **Tutor:** Yes, you **ought to contact** her today.

| Error | Corrección |
| :--- | :--- |
| *She must to submit it.* | She **must submit** it. |
| *He have to attend.* | He **has to attend**. |
| *Did you must go?* | **Did you have to go?** |
| *The seminar is optional; you mustn't attend.* | You **don't have to attend**. |
| *Plagiarism is forbidden; you don't have to do it.* | You **mustn't plagiarise**. |
| *You should to revise.* | You **should revise**. |
| *You ought revise.* | You **ought to revise**. |
| *assist the seminar* | **attend the seminar**. |

En una guía universitaria, adapta el tono. **Must/mustn't** sirven para normas inequívocas; **should/ought to** para estrategias; **need to** para requisitos prácticos. Una lista compuesta solo por *must* puede resultar autoritaria y no distingue reglas de recomendaciones.
"""
U43_SECTIONS += study_lab(
    43,
    "University Life & Academics",
    "must, have to, need to, don't have to, mustn't, should y ought to con su fuerza exacta",
    "must / have to; obligation / necessity / advice; don't have to / mustn't / shouldn't; modal + base / ought to + base",
    "must submit, have to attend, need to revise, don't have to come, mustn't plagiarise, should ask y ought to cite",
    "orienta durante tres minutos a un estudiante nuevo: presenta cuatro reglas, dos prohibiciones, tres opciones y cinco consejos con vocabulario del campus",
)
U43_SECTIONS += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
    [
        ("Elige: *Attendance is compulsory. Students (must/should) attend.*", "**Must attend**: obligación, no consejo."),
        ("Completa en tercera persona: *She ___ submit her dissertation by December.*", "**Has to submit** si la fecha responde a una exigencia institucional."),
        ("Elige: *The workshop is optional; you (mustn't/don't have to) attend.*", "**Don't have to attend**: ausencia de obligación."),
        ("Corrige: *You don't have to plagiarise; it is forbidden.*", "**You mustn't plagiarise.**"),
        ("Pasa a pasado: *We must attend every seminar.*", "**We had to attend every seminar.**"),
        ("Formula una pregunta: *It is necessary for me to wear an ID card?*", "**Do I have to wear an ID card?**"),
        ("Da dos consejos con formas distintas.", "**You should revise regularly. You ought to speak to your tutor.**"),
        ("Distingue *lecture, seminar* y *tutorial*.", "Exposición a grupo, discusión en grupo menor y apoyo individual o muy reducido."),
        ("Repara: *assist a lecture and make a dissertation*.", "**Attend a lecture and write a dissertation.**"),
        ("Producción: escribe 170–200 palabras para estudiantes nuevos.", "Distingue reglas, prohibiciones, necesidades, opciones y consejos; usa doce términos universitarios."),
    ]
)


U44_SECTIONS = r"""## 1. Mirar hacia atrás desde un punto futuro

El **Future Perfect** presenta una acción como completada antes de una referencia futura. En *By next year, the team **will have completed** the clinical trial*, imaginamos el próximo año y miramos hacia atrás: para entonces, la finalización ya formará parte del pasado de ese punto.

![Mapa del Future Perfect en investigación médica](/blog/curso-b2/unit-44/future-perfect-map.png)

No expresa simplemente «algo ocurrirá». *The team will complete the trial next year* localiza un evento futuro; *the team will have completed it **by** next year* destaca el resultado ya logrado no más tarde de ese límite. Esta perspectiva encaja con hitos, plazos y predicciones de investigación.

## 2. Forma afirmativa, negativa y pregunta

<audio controls preload="none" src="/audio/blog/curso-b2/unit-44/future-perfect.mp3" title="🔊 Forma del futuro perfecto"></audio>

La estructura no cambia con la persona:

| Función | Patrón | Ejemplo |
| :--- | :--- | :--- |
| afirmativa | subject + **will have + V3** | Scientists **will have developed** a treatment. |
| negativa | subject + **won't have + V3** | The trial **won't have finished** by May. |
| pregunta | **Will** + subject + **have + V3**? | **Will** they **have published** the findings? |
| respuesta | Yes, subject **will** / No, subject **won't** | Yes, they **will**. |

El participio puede ser regular —*completed, tested, published*— o irregular —*seen, become, taken, written*. No uses pasado simple tras *have*: no *will have saw* sino **will have seen**; no *will have became* sino **will have become**.

Las contracciones son *I'll have finished, they won't have completed*. En habla, *will have* puede reducirse, pero al escribir conserva las dos piezas. El participio es indispensable incluso si la forma coincide con pasado: *published* cumple ambas funciones, mientras el auxiliar identifica el perfecto.

## 3. By: el límite incluido

<audio controls preload="none" src="/audio/blog/curso-b2/unit-44/by-deadlines.mp3" title="🔊 By con fechas límite"></audio>

**By + punto temporal** significa «no más tarde de» ese punto:

- **by Friday / by December / by 2030**;
- **by next week/month/year**;
- **by the end of the trial/decade**;
- **by then / by the deadline**;
- **by the age of thirty**.

*The team will have published the findings **by December*** permite octubre, noviembre o diciembre. En cambio, **in December** localiza la publicación dentro de ese mes; **until December** describe continuidad hasta el límite y no sustituye a *by*. Compara *the trial will continue until December* con *the team will have completed the trial by December*.

El contexto debe situar el límite en el futuro relativo al momento del habla. Una actividad viva dice *By 2025, research will have advanced*, pero en una fecha posterior esa oración funciona como ejemplo gramatical histórico, no como predicción actual. Para producción auténtica desde 2026, selecciona 2030 u otra fecha futura.

## 4. By the time + presente

<audio controls preload="none" src="/audio/blog/curso-b2/unit-44/by-the-time.mp3" title="🔊 By the time y cláusulas temporales"></audio>

**By the time** introduce una cláusula que identifica el evento de referencia:

> **By the time + present simple**, subject + **will have + V3**

- *By the time you **arrive**, the doctor **will have left**.*
- *By the time the treatment **starts**, he **will have recovered**.*
- *By the time we **retire**, we **will have seen** many breakthroughs.*

Aunque el significado sea futuro, la cláusula temporal usa presente: no *by the time you will arrive*. La oración principal lleva el Future Perfect porque la acción queda completada antes del evento de la cláusula. El orden puede cambiar: *The doctor will have left by the time you arrive*.

No toda oración con *by the time* requiere futuro perfecto; depende de la relación y del marco temporal. En el objetivo de U44, practica un evento futuro que sirve de límite y un resultado anterior ya completado.

## 5. Future Perfect pasivo y duración

<audio controls preload="none" src="/audio/blog/curso-b2/unit-44/future-perfect-passive.mp3" title="🔊 Futuro perfecto pasivo"></audio>

Cuando el foco es el resultado y no el agente, combina perfecto y pasiva:

> subject + **will have been + past participle**

*The findings **will have been published** by the end of the month; the vaccine **will have been tested** on thousands of volunteers*. **Been** es el participio de *be* y el último verbo también aparece en participio. No omitas ninguna pieza.

Para duración hasta un punto futuro, el curso incluye *The patient will have been on the new drug for six months by next month* y *She will have taken the medication for a year*. El primero usa **will have been + complement**, no necesariamente Future Perfect Continuous. Si quieres destacar actividad continua, existe *will have been taking*, pero el foco de U44 es **will have + V3**.

Con verbos de estado o cantidades acumuladas, el Future Perfect puede describir lo alcanzado: *By 2030, the study will have included ten thousand participants*. Evita predicciones médicas absolutas sin evidencia: la gramática marca perspectiva temporal, no certeza científica.

## 6. Medical Research & Health: del ensayo al resultado

![Vocabulario de investigación médica y salud](/blog/curso-b2/unit-44/medical-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-44/medical-vocabulary.mp3" title="🔊 Vocabulario de investigación médica"></audio>

Un **clinical trial** evalúa una intervención en participantes. Puede comparar el tratamiento con un **placebo** o con la atención habitual; un **control group** permite valorar diferencias. La **efficacy** es la capacidad de producir el efecto deseado bajo condiciones del estudio. No equivale exactamente a efectividad en práctica real.

Un **side effect** es un efecto no deseado relacionado con una intervención; la **dosage** es la cantidad y pauta. Los **findings** son resultados interpretados del análisis. Un **breakthrough** es un avance decisivo, no cualquier resultado estadísticamente significativo.

**Diagnosis** identifica una enfermedad o condición; **prognosis** estima su evolución; un **symptom** es una manifestación percibida u observada; **treatment** intenta mejorar la condición. **Recovery** es retorno a la salud; **remission** indica reducción o desaparición de signos durante un período y no siempre significa cura.

**Epidemiology** estudia patrones de salud en poblaciones. **Healthcare** abarca servicios y sistemas de atención. **Immunisation** es el proceso de adquirir protección, normalmente mediante vacunación. Colocaciones:

- **conduct/complete a clinical trial**;
- **recruit participants** y **assign a control group**;
- **administer a vaccine/drug/placebo**;
- **measure efficacy** y **monitor side effects**;
- **establish a diagnosis** y **make a prognosis**;
- **analyse/publish findings**;
- **enter remission / make a full recovery**.

La terminología no sustituye consejo profesional. Los ejemplos practican inglés y no recomiendan tratamientos, dosificaciones ni decisiones clínicas.

## 7. Reading alineado: milestones by 2030

![Hitos futuros de un ensayo clínico](/blog/curso-b2/unit-44/medical-context.png)

> **By 2030**, scientists **will have developed** new treatments for several diseases. A major clinical trial **will have completed** its final phase **by next year**, and researchers **will have measured** the vaccine's efficacy and monitored each serious side effect. **By the time** regulators review the evidence, the findings **will have been published**. One epidemiology team **will have analysed** data from thousands of participants, and healthcare systems **will have gained** clearer evidence.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-44/reading-u44.mp3" title="🔊 Reading Unidad 44"></audio>

Cada perfecto tiene límite explícito o recuperable. *Will have developed* mira a 2030; *will have completed* a next year; *will have been published* ocurre antes de la revisión regulatoria. La pasiva destaca los findings. El presente *review* después de *by the time* conserva significado futuro.

Reescribe dos frases en futuro simple y observa el cambio: *scientists will develop treatments* predice eventos; la versión perfecta los contempla como logros completados para el límite. Después pasa una activa a pasiva: *Researchers will have published the findings → The findings will have been published*.

## 8. Diálogo, predicciones responsables y errores

<audio controls preload="none" src="/audio/blog/curso-b2/unit-44/dialogue-u44.mp3" title="🔊 Diálogo Unidad 44"></audio>

> **Journalist:** **Will** the team **have completed** the trial by next year?<br>
> **Researcher:** Yes. By December, we **will have finished** the final phase.<br>
> **Journalist:** Will the findings be public?<br>
> **Researcher:** They **will have been published** by then.<br>
> **Journalist:** What will happen before regulators meet?<br>
> **Researcher:** We **will have analysed** efficacy and side-effect data.

| Error | Corrección |
| :--- | :--- |
| *Scientists will have develop a cure.* | will have **developed**. |
| *She will has finished.* | She **will have finished**. |
| *By the time you will arrive...* | By the time you **arrive**... |
| *The findings will have published.* | will have **been published**. |
| *The doctor will have went.* | will have **gone**. |
| *The trial continues by December.* | continúa **until**; estará completo **by**. |
| *make a clinical trial* | **conduct a clinical trial**. |
| *a secondary effect* | normalmente **a side effect**. |

En una predicción científica, combina forma y cautela: *By 2030, researchers may have completed...* expresa menos certeza que *will have completed*. U44 practica *will*, pero una afirmación real necesita evidencia y modalización. No prometas que una vacuna «habrá curado» una enfermedad si el texto solo anuncia un ensayo.
"""
U44_SECTIONS += study_lab(
    44,
    "Medical Research & Health",
    "will have + participio, by, by the time y el Future Perfect pasivo",
    "future simple / future perfect; by / in / until; by the time + present / main clause + will have; active / will have been + V3",
    "will have completed, by the deadline, by the time regulators review, will have been published y measure efficacy",
    "presenta durante tres minutos un calendario responsable de investigación hasta 2030; usa ocho futuros perfectos, dos pasivas y doce términos médicos",
)
U44_SECTIONS += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
    [
        ("Completa: *By next year, the team ___ the trial.*", "**Will have completed**: resultado completo antes del límite."),
        ("Corrige: *Scientists will have develop new treatments.*", "**Scientists will have developed new treatments.**"),
        ("Elige: *The trial will continue (by/until) December.*", "**Until December** expresa continuidad; *by* marcaría un resultado completado."),
        ("Completa: *By the time regulators ___, researchers ___ the findings.*", "**By the time regulators meet, researchers will have published the findings.**"),
        ("Pasa a pasiva: *The team will have tested the vaccine.*", "**The vaccine will have been tested.**"),
        ("Escribe la pregunta para esta respuesta: *Yes, they will.*", "Ejemplo: **Will they have completed the final phase by June?**"),
        ("Distingue *diagnosis* y *prognosis*.", "El **diagnosis** identifica la condición; el **prognosis** estima su evolución."),
        ("Completa: *___ a clinical trial; ___ efficacy; ___ side effects.*", "**Conduct a clinical trial; measure efficacy; monitor side effects.**"),
        ("Repara el participio: *will have went / will have saw*.", "**Will have gone / will have seen.**"),
        ("Producción: escribe 170–200 palabras sobre hitos médicos hasta 2030.", "Usa ocho futuros perfectos, dos pasivas, cuatro límites distintos y doce términos médicos."),
    ]
)


U45_SECTIONS = r"""## 1. La Unidad 45 abre un bloque, no repasa el anterior

La **Unidad 45** inicia el bloque temático de **Space Exploration**. Su objetivo nuevo es usar **must, might, could** y **can't** para deducir a partir de señales, datos y conocimientos. No es una unidad de repaso: *The signal must be from the rover; there might be ice; that object can't be a satellite* introducen una escala de certeza que continúa con formas de presente y pasado.

![Mapa de modales de deducción y exploración espacial](/blog/curso-b2/unit-45/modal-deduction-map.png)

Una deducción no expresa obligación. En *The astronaut must be tired*, **must** significa «la evidencia me lleva a esta conclusión», no «tiene la obligación de estar cansado». El contexto suele aportar la pista: ha trabajado toda la noche, la frecuencia coincide o el objeto se mueve de una forma incompatible con un satélite.

## 2. Deducciones sobre presente: modal + be/base

<audio controls preload="none" src="/audio/blog/curso-b2/unit-45/present-deduction.mp3" title="🔊 Deducción modal sobre presente"></audio>

Para un estado presente, utiliza **modal + be + complemento**. Para otra acción o estado, **modal + verbo base**:

| Grado | Forma | Ejemplo |
| :--- | :--- | :--- |
| conclusión positiva fuerte | **must be/do** | The signal **must be** from the Mars rover. |
| posibilidad abierta | **might be/do** | Life **might exist** on other planets. |
| posibilidad abierta | **could be/do** | There **could be** ice on the Moon. |
| conclusión negativa fuerte | **can't be/do** | That light **can't be** a star. |

**Must** y **can't** representan extremos lógicos, no porcentajes exactos. **Might** y **could** suelen expresar posibilidades similares en afirmativas. La elección depende de evidencia y postura, no de si la oración es afirmativa o negativa.

No añadas *to*: *must be, might exist, could contain, can't move*. Tampoco flexiones el verbo: *the signal must comes* es incorrecto. Todos los modales mantienen la forma base para cualquier persona.

## 3. Deducciones sobre pasado: modal + have + V3

<audio controls preload="none" src="/audio/blog/curso-b2/unit-45/past-deduction.mp3" title="🔊 Deducción modal sobre pasado"></audio>

Si la evidencia es actual pero el posible evento ocurrió antes, usa:

> **must / might / could / can't + have + past participle**

- *The astronauts **must have seen** something amazing; they look excited.*
- *They **might have discovered** a new mineral; the data is incomplete.*
- *The probe **could have reached** Jupiter; enough time has passed.*
- *The mission **can't have failed**; we are receiving valid data.*

El participio es obligatorio: **seen, forgotten, landed, succeeded, found, reached**. No *must have saw* ni *could have reach*. La forma **must have** no es present perfect independiente; el modal gobierna toda la cadena.

**Could have + V3** también puede describir una posibilidad no realizada o una oportunidad perdida en otros contextos —*we could have launched yesterday, but we didn't*—. En U45, el contexto científico la usa principalmente como explicación posible del pasado. Comprueba si el texto confirma que no ocurrió o mantiene la incertidumbre.

## 4. Escala de certeza y calidad de la evidencia

<audio controls preload="none" src="/audio/blog/curso-b2/unit-45/certainty-scale.mp3" title="🔊 Escala de certeza para deducciones"></audio>

Parte de la evidencia, no del modal:

1. **La frecuencia coincide exactamente** con la del rover → *The signal **must be** from the rover.*
2. **Hay indicios, pero faltan análisis** → *The astronauts **might have found** something.*
3. **Una sonda detecta señales compatibles** → *There **could be** ice.*
4. **El movimiento contradice lo que sabemos** → *That object **can't be** a normal satellite.*

No uses **mustn't** como deducción negativa. *It mustn't be a star* suele interpretarse como prohibición o deseo extraño. La conclusión negativa es **can't be**; para pasado, **can't have been/done**.

En una comunicación rigurosa, una ausencia de pruebas no siempre permite *can't*. La lección incluye *That can't be a UFO — there's no proof of alien life*, pero científicamente «no hay prueba» puede justificar mejor *might not be* o *is unlikely to be* que imposibilidad absoluta. Para resolver la actividad, sigue su escala; para argumentar, calibra la conclusión según la fuerza real de la evidencia.

## 5. Deducciones sobre acciones en curso

<audio controls preload="none" src="/audio/blog/curso-b2/unit-45/ongoing-deduction.mp3" title="🔊 Deducciones sobre acciones en curso"></audio>

Para una acción que probablemente ocurre ahora:

> modal + **be + verb-ing**

*The crew **must be analysing** the data; the rover **might be crossing** a crater; the satellite **can't be moving** that fast*. La forma combina modalidad con aspecto continuo. Compara:

- *They **must explore** the Moon*: puede sonar a necesidad u obligación.
- *They **must be exploring** the Moon*: deducción sobre actividad en curso.
- *They **must have explored** the area*: conclusión sobre actividad anterior.

También existe **modal + have been + -ing** para una actividad anterior o extendida: *The rover must have been transmitting all night*. El reading vivo se concentra en *must have seen / could have succeeded*, pero reconocer la forma continua ayuda a mantener la línea temporal.

La negación de posibilidad débil puede ser *might not be transmitting*. No equivale a **can't be transmitting**, que rechaza la posibilidad con mucha más fuerza.

## 6. Space Exploration: vehículos, lugares y movimiento

![Vocabulario de exploración espacial y astronomía](/blog/curso-b2/unit-45/space-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-45/space-vocabulary.mp3" title="🔊 Vocabulario espacial"></audio>

**Astronomy** es el estudio científico de cuerpos y fenómenos del espacio; **astrology** no es ciencia astronómica. Un **astronaut** viaja y trabaja en el espacio. Una **mission** tiene un objetivo definido y puede ser tripulada o no.

Un **rocket** proporciona propulsión para el lanzamiento; **spacecraft** es el vehículo espacial amplio. Una **probe** es una nave no tripulada que recopila datos; un **rover** se desplaza sobre una superficie; un **lander** aterriza. Un **satellite** orbita un cuerpo y puede ser natural o artificial. Una **space station** permite vivir y trabajar en órbita.

**Orbit** es la trayectoria alrededor de un cuerpo; **gravity** mantiene esa relación. A **launch** envía el vehículo; a **landing** es el aterrizaje. Un **observatory** alberga instrumentos de observación. **Outer space** es la región más allá de la atmósfera terrestre.

Distingue objetos:

- un **meteor** es el fenómeno luminoso cuando material entra en la atmósfera;
- un **meteoroid** es el objeto pequeño antes de entrar;
- un **meteorite** es el fragmento que alcanza la superficie;
- un **asteroid** es un cuerpo rocoso que orbita el Sol;
- un **comet** contiene hielo y polvo y puede desarrollar cola.

Colocaciones:

- **launch a rocket/satellite/probe**;
- **enter/reach/remain in orbit**;
- **conduct a mission / collect and transmit data**;
- **detect a signal / analyse evidence**;
- **reach a destination / make a landing**;
- **explore the surface / search for signs of life**.

No digas *make a launch* para el verbo: **launch a rocket**. *Arrive to Mars* debe ser **arrive on/at Mars** o **reach Mars**, sin *to* tras *reach*.

## 7. Reading alineado: interpreting signals

![Deducciones basadas en datos de una misión](/blog/curso-b2/unit-45/space-context.png)

> The signal from the probe **must be** from Jupiter because the craft was launched years ago. Life **might exist** on other planets, although scientists are not certain. That moving light **can't be** a star because stars do not move across the sky in that way. The astronauts **must have seen** something unusual: they look excited. The mission **could have succeeded** because the control centre received positive data. There **might be** water on Mars, as recent findings suggest.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-45/reading-u45.mp3" title="🔊 Reading Unidad 45"></audio>

Los modales no describen el mismo tiempo. *Must be, might exist, can't be, might be* evalúan estados presentes. *Must have seen* y *could have succeeded* reconstruyen eventos anteriores desde evidencia actual. Los conectores *because, although, as* muestran qué dato sostiene o limita cada conclusión.

Para entrenar criterio, sustituye la evidencia. Si la frecuencia solo es parecida, cambia *must be* por *might/could be*. Si el centro de control confirma la llegada, deja de ser deducción y usa un hecho: *The mission has reached its destination*. La modalidad depende del estado del conocimiento.

## 8. Diálogo, argumentación y errores frecuentes

<audio controls preload="none" src="/audio/blog/curso-b2/unit-45/dialogue-u45.mp3" title="🔊 Diálogo Unidad 45"></audio>

> **Controller:** Where is that signal from?<br>
> **Scientist:** It **must be** from the Mars rover; it matches our frequency.<br>
> **Controller:** **Could there be** ice nearby?<br>
> **Scientist:** Yes. The probe **might have detected** it, but we are checking.<br>
> **Controller:** Is the fast object our satellite?<br>
> **Scientist:** It **can't be**; our satellite follows another orbit.

| Error | Corrección |
| :--- | :--- |
| *The signal must to be from Mars.* | must **be**. |
| *Life might exists elsewhere.* | might **exist**. |
| *They must have saw it.* | must have **seen** it. |
| *The object mustn't be a satellite* como imposibilidad | **can't be** a satellite. |
| *They could discovered ice.* | could **have discovered** si es pasado. |
| *The rover must be crossed the crater.* | **must be crossing** ahora / **must have crossed** antes. |
| *arrive to Mars* | **arrive on Mars / reach Mars**. |
| *astrology studies planets scientifically* | **astronomy**. |

Una respuesta B2 debe incluir conclusión y evidencia: *It might be a meteor because...; it can't be a satellite since...*. Evita afirmar vida alienígena como hecho si el texto solo presenta una posibilidad. Los modales permiten representar incertidumbre, una habilidad central en ciencia.
"""
U45_SECTIONS += study_lab(
    45,
    "Space Exploration",
    "must, might, could y can't con formas presentes, continuas y perfectas",
    "must / might-could / can't; be / be doing / have done / have been doing; deducción / obligación",
    "must be from the rover, might exist, could be ice, can't be a satellite, must have reached y might be analysing",
    "informa durante tres minutos sobre señales de una misión: formula cuatro conclusiones fuertes, seis posibilidades y tres descartes, siempre con evidencia y vocabulario espacial",
)
U45_SECTIONS += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
    [
        ("Completa: *The signal matches our frequency. It ___ from the rover.*", "**Must be**: la evidencia apoya una conclusión fuerte."),
        ("Elige: *Scientists are unsure; life (must/might) exist elsewhere.*", "**Might exist**: posibilidad abierta."),
        ("Corrige: *That light mustn't be a star; stars do not move like that.*", "**That light can't be a star.**"),
        ("Completa en pasado: *They look excited. They ___ something unusual.*", "**Must have seen** something unusual."),
        ("Da dos explicaciones posibles del mismo dato.", "Ejemplo: **The signal might be noise, or it could come from a probe.**"),
        ("Contrasta: *must be exploring / must have explored*.", "La primera deduce una acción en curso; la segunda, una acción anterior."),
        ("Corrige: *The rover might has reached Mars.*", "**The rover might have reached Mars.**"),
        ("Distingue *probe, rover* y *satellite*.", "La **probe** investiga sin tripulación; el **rover** se mueve en una superficie; el **satellite** orbita."),
        ("Repara: *arrive to Mars and make a rocket launch*.", "**Arrive on Mars / reach Mars and launch a rocket.**"),
        ("Producción: escribe 170–200 palabras sobre datos de una misión.", "Usa presente, pasado y acción en curso; incluye trece deducciones justificadas y doce términos espaciales."),
    ]
)


COMMON_SOURCES = """- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — B1–B2 grammar: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar
- Cambridge Dictionary — Grammar and vocabulary reference: https://dictionary.cambridge.org/grammar/british-grammar/"""

ARTICLES = [
    {
        "unit": 41,
        "slug": "unidad-41-gerunds-infinitives-education",
        "title": "Gerunds and Infinitives B2: Educación y Aprendizaje",
        "description": "Domina gerundios e infinitivos B2, cambios de significado y object + infinitive con educación, audio, ejemplos y ejercicios.",
        "keywords": [
            "gerunds and infinitives B2 ejercicios",
            "gerundio infinitivo inglés educación",
            "remember stop try gerund infinitive",
            "verb object infinitive B2",
            "vocabulario educación aprendizaje inglés B2",
            "inglés B2 unidad 41",
        ],
        "image": "/blog/curso-b2/unit-41/gerunds-infinitives-map.png",
        "alt": "Gerundios e infinitivos B2 en educación y aprendizaje",
        "related": [
            "unidad-41-gerunds-infinitives-education-ejercicios-soluciones",
            "unidad-40-repaso-36-39",
            "unidad-42-passive-reporting-science",
            "ingles-b2",
        ],
        "faqs": [
            ("¿Qué verbos de U41 llevan gerundio?", "**Enjoy, avoid, consider, finish** y **mind** se construyen con *-ing* en los objetivos de la unidad."),
            ("¿Qué verbos llevan to + infinitive?", "**Decide, hope, refuse, expect** y **seem** aparecen con *to + verbo base*."),
            ("¿Cómo cambia remember, stop o try?", "*Remember/forget to do* miran una tarea; *doing*, un recuerdo. *Stop doing* cesa; *stop to do* expresa propósito. *Try doing* prueba un método."),
            ("¿Qué estructura usan allow, ask, want y expect?", "Usan **verb + person/object + to + base**: *The tutor asked us to submit the assignment*."),
            ("¿Dónde practico la Unidad 41?", "En la [Unidad 41 del curso B2](/curso-b2/unit-41) y su [cuaderno con soluciones](/blog/curso-b2/unidad-41-gerunds-infinitives-education-ejercicios-soluciones)."),
        ],
        "excerpt": "Guía B2 de gerundios, infinitivos, cambios de significado y educación con reading, ocho audios y práctica resuelta.",
        "intro": """La **Unidad 41** conecta **gerunds and infinitives** con **Education Systems & Learning**. Practica los patrones reales de *enjoy/avoid/consider/finish/mind + -ing*, *decide/hope/refuse/expect/seem + to*, y *allow/ask/want/expect + person + to*.

También diferencia **remember, forget, stop** y **try** cuando el complemento cambia el significado. El vocabulario vivo incluye *curriculum, lecture, seminar, blended learning, EdTech, pedagogy, assessment, student engagement* y *academic achievement*. Esta guía incorpora los ejemplos de grammar, vocabulary, reading, listening y writing del curso.""",
        "before": "[U40 — Repaso 36–39](/blog/curso-b2/unidad-40-repaso-36-39)",
        "learn": [
            "Seleccionar *-ing* o *to + infinitive* después del primer verbo",
            "Construir *verb + object + to + infinitive*",
            "Explicar los cambios con *remember, forget, stop* y *try*",
            "Distinguir formatos, participantes y métodos educativos",
            "Usar los patrones en reading, diálogo y producción B2",
        ],
        "sections": U41_SECTIONS,
        "tip": "No traduzcas el segundo verbo. Recupera el bloque que exige el primero y comprueba quién realiza la segunda acción. Con *remember, stop* y *try*, dibuja primero la secuencia temporal.",
        "summary": """| Decisión | Forma |
| :--- | :--- |
| enjoy / avoid / consider / finish / mind | **verb + -ing** |
| decide / hope / refuse / expect / seem | **verb + to + base** |
| allow / ask / want / expect | **verb + object + to + base** |
| tarea frente a recuerdo | remember/forget **to do / doing** |
| cesar frente a propósito | stop **doing / to do** |
| intento frente a método | try **to do / doing** |""",
        "next": """Continúa con la **Unidad 42**, donde las noticias científicas usan estructuras de reporte en pasiva.

- [Ejercicios U41 con soluciones](/blog/curso-b2/unidad-41-gerunds-infinitives-education-ejercicios-soluciones)
- [Unidad 41 del curso](/curso-b2/unit-41)
- [U42 teoría: Passive Reporting + Science](/blog/curso-b2/unidad-42-passive-reporting-science)""",
        "guides": [
            "[U40 Repaso 36–39](/blog/curso-b2/unidad-40-repaso-36-39)",
            "[U42 Passive Reporting + Science](/blog/curso-b2/unidad-42-passive-reporting-science)",
            "[Inglés B2](/blog/metodos/ingles-b2)",
        ],
        "sources": COMMON_SOURCES,
    },
    {
        "unit": 42,
        "slug": "unidad-42-passive-reporting-science",
        "title": "Passive Reporting B2: Ciencia y Descubrimientos",
        "description": "Aprende It is said that y subject is believed to be/to have B2 con ciencia, vocabulario, ocho audios y ejercicios resueltos.",
        "keywords": [
            "passive reporting structures B2 ejercicios",
            "it is said thought believed that",
            "is believed to be to have B2",
            "pasiva impersonal inglés ciencia",
            "vocabulario descubrimientos científicos inglés",
            "inglés B2 unidad 42",
        ],
        "image": "/blog/curso-b2/unit-42/passive-reporting-map.png",
        "alt": "Passive reporting B2 con ciencia y descubrimientos",
        "related": [
            "unidad-42-passive-reporting-science-ejercicios-soluciones",
            "unidad-41-gerunds-infinitives-education",
            "unidad-43-modals-obligation-university",
            "ingles-b2",
        ],
        "faqs": [
            ("¿Cuáles son las dos estructuras de passive reporting?", "**It + passive + that-clause** y **reported subject + passive + to-infinitive**."),
            ("¿Cuándo se usa to have + participio?", "Cuando el hecho informado ocurrió antes del momento del reporte: *The scientist is believed to have left*."),
            ("¿Cómo se informa una acción en curso?", "Con **to be + -ing**: *The laboratory is said to be developing a vaccine*."),
            ("¿Qué diferencia hay entre discovery y breakthrough?", "Una *discovery* es un hallazgo; un *breakthrough* es un avance decisivo que cambia el campo."),
            ("¿Dónde practico la Unidad 42?", "En la [Unidad 42 del curso B2](/curso-b2/unit-42) y su [cuaderno con soluciones](/blog/curso-b2/unidad-42-passive-reporting-science-ejercicios-soluciones)."),
        ],
        "excerpt": "Guía B2 de reporte pasivo con infinitivos simples, continuos y perfectos en contextos de investigación científica.",
        "intro": """La **Unidad 42** presenta **passive reporting structures** para atribuir información científica: *It is said/thought/believed that...* y *the subject is said/thought/believed/reported to be/to have...*. La elección del infinitivo conserva la relación temporal.

El campo **Scientific Discoveries** aporta *scientific method, hypothesis, experiment, evidence, findings, breakthrough, innovation, clinical trial* y *epidemiology*. Esta guía sigue las cinco lecciones activas y practica cómo reportar sin convertir una atribución en un hecho demostrado.""",
        "before": "[U41 — Gerunds, Infinitives + Education](/blog/curso-b2/unidad-41-gerunds-infinitives-education)",
        "learn": [
            "Construir *It is said/thought/believed that + clause*",
            "Convertir el sujeto informado en *is reported to...*",
            "Elegir *to be, to be doing, to have done* y formas pasivas",
            "Distinguir método, evidencia, findings y breakthrough",
            "Redactar reportes científicos con atribución prudente",
        ],
        "sections": U42_SECTIONS,
        "tip": "En una transformación, identifica primero el sujeto de la información y después la relación temporal. Si el hecho ya ocurrió, el infinitivo perfecto conserva esa anterioridad.",
        "summary": """| Información | Forma |
| :--- | :--- |
| cláusula completa | **It is reported that + subject + verb** |
| sujeto destacado | **subject + is reported + to...** |
| simultáneo | **to be / to do** |
| en curso | **to be doing** |
| anterior | **to have done** |
| pasiva | **to be done / to have been done** |""",
        "next": """Continúa con la **Unidad 43**, donde distinguirás reglas, necesidad, consejo, opciones y prohibiciones universitarias.

- [Ejercicios U42 con soluciones](/blog/curso-b2/unidad-42-passive-reporting-science-ejercicios-soluciones)
- [Unidad 42 del curso](/curso-b2/unit-42)
- [U43 teoría: Modals of Obligation + University](/blog/curso-b2/unidad-43-modals-obligation-university)""",
        "guides": [
            "[U41 Gerunds, Infinitives + Education](/blog/curso-b2/unidad-41-gerunds-infinitives-education)",
            "[U43 Modals + University](/blog/curso-b2/unidad-43-modals-obligation-university)",
            "[Inglés B2](/blog/metodos/ingles-b2)",
        ],
        "sources": COMMON_SOURCES,
    },
    {
        "unit": 43,
        "slug": "unidad-43-modals-obligation-university",
        "title": "Modals of Obligation B2: Universidad y Consejos",
        "description": "Distingue must, have to, need to, don't have to, mustn't, should y ought to B2 con universidad, audio y ejercicios.",
        "keywords": [
            "modals obligation advice B2 ejercicios",
            "must have to need to diferencias",
            "don't have to vs mustn't B2",
            "should ought to universidad inglés",
            "vocabulario vida universitaria B2",
            "inglés B2 unidad 43",
        ],
        "image": "/blog/curso-b2/unit-43/modals-obligation-map.png",
        "alt": "Modales de obligación y consejo B2 en la universidad",
        "related": [
            "unidad-43-modals-obligation-university-ejercicios-soluciones",
            "unidad-42-passive-reporting-science",
            "unidad-44-future-perfect-medical",
            "ingles-b2",
        ],
        "faqs": [
            ("¿Qué diferencia hay entre must y have to?", "*Must* presenta obligación fuerte; *have to* suele destacar una exigencia externa y permite pasado/futuro con *had/will have to*."),
            ("¿Don't have to significa prohibición?", "No. Significa que algo no es obligatorio. **Mustn't** expresa prohibición."),
            ("¿Should y ought to son iguales?", "Ambos dan consejo en U43; *ought to* puede sonar más formal y siempre conserva *to*."),
            ("¿Qué forma sigue a un modal?", "Después de *must, mustn't, should, shouldn't* va verbo base sin *to*. *Ought to* es la excepción del inventario."),
            ("¿Dónde practico la Unidad 43?", "En la [Unidad 43 del curso B2](/curso-b2/unit-43) y su [cuaderno con soluciones](/blog/curso-b2/unidad-43-modals-obligation-university-ejercicios-soluciones)."),
        ],
        "excerpt": "Guía B2 de obligación, necesidad, consejo, ausencia de obligación y prohibición en la vida universitaria.",
        "intro": """La **Unidad 43** organiza **modals of obligation and advice** según su función real: **must, have to, need to, don't have to, mustn't, should** y **ought to**. La diferencia entre opción y prohibición es central.

El contexto **University Life & Academics** incluye *lecture, seminar, tutorial, campus, assignment, dissertation, supervisor, attendance, plagiarise* y *academic misconduct*. Los ejemplos proceden de las lecciones vivas de grammar, vocabulary, reading, listening y writing.""",
        "before": "[U42 — Passive Reporting + Science](/blog/curso-b2/unidad-42-passive-reporting-science)",
        "learn": [
            "Separar obligación, necesidad, consejo y prohibición",
            "Conjugar *have to* y *need to* en persona y tiempo",
            "No confundir *don't have to* con *mustn't*",
            "Usar lenguaje preciso de clases, trabajos y normas",
            "Adaptar el tono de una guía universitaria B2",
        ],
        "sections": U43_SECTIONS,
        "tip": "Antes de elegir, traduce la intención completa: obligatorio, necesario, recomendable, opcional o prohibido. Esa etiqueta decide mejor que la palabra española «deber».",
        "summary": """| Función | Forma |
| :--- | :--- |
| obligación fuerte | **must + base** |
| exigencia/regla | **have to + base** |
| necesidad | **need to + base** |
| ausencia de obligación | **don't have to / don't need to** |
| prohibición | **mustn't + base** |
| consejo | **should + base / ought to + base** |""",
        "next": """Continúa con la **Unidad 44**, que mira los hitos de investigación médica desde un límite futuro.

- [Ejercicios U43 con soluciones](/blog/curso-b2/unidad-43-modals-obligation-university-ejercicios-soluciones)
- [Unidad 43 del curso](/curso-b2/unit-43)
- [U44 teoría: Future Perfect + Medical Research](/blog/curso-b2/unidad-44-future-perfect-medical)""",
        "guides": [
            "[U42 Passive Reporting + Science](/blog/curso-b2/unidad-42-passive-reporting-science)",
            "[U44 Future Perfect + Medical Research](/blog/curso-b2/unidad-44-future-perfect-medical)",
            "[Inglés B2](/blog/metodos/ingles-b2)",
        ],
        "sources": COMMON_SOURCES,
    },
    {
        "unit": 44,
        "slug": "unidad-44-future-perfect-medical",
        "title": "Future Perfect B2: Investigación Médica y Salud",
        "description": "Aprende will have + participio, by y by the time B2 con investigación médica, ocho audios, vocabulario y ejercicios.",
        "keywords": [
            "future perfect B2 ejercicios",
            "will have past participle by",
            "by the time futuro perfecto inglés",
            "future perfect passive B2",
            "vocabulario investigación médica inglés",
            "inglés B2 unidad 44",
        ],
        "image": "/blog/curso-b2/unit-44/future-perfect-map.png",
        "alt": "Future Perfect B2 en investigación médica y salud",
        "related": [
            "unidad-44-future-perfect-medical-ejercicios-soluciones",
            "unidad-43-modals-obligation-university",
            "unidad-45-modal-deduction-space",
            "ingles-b2",
        ],
        "faqs": [
            ("¿Cómo se forma el Future Perfect?", "Con **will have + past participle** para todas las personas: *will have completed, will have seen*."),
            ("¿Qué significa by con este tiempo?", "Marca un límite incluido: la acción estará completa no más tarde de ese punto futuro."),
            ("¿Qué tiempo va después de by the time?", "En una cláusula temporal futura se usa presente: *By the time you arrive, we will have finished*."),
            ("¿Cómo se forma el Future Perfect pasivo?", "Con **will have been + past participle**: *The findings will have been published*."),
            ("¿Dónde practico la Unidad 44?", "En la [Unidad 44 del curso B2](/curso-b2/unit-44) y su [cuaderno con soluciones](/blog/curso-b2/unidad-44-future-perfect-medical-ejercicios-soluciones)."),
        ],
        "excerpt": "Guía B2 de Future Perfect activo y pasivo con plazos, ensayos clínicos y vocabulario médico preciso.",
        "intro": """La **Unidad 44** aplica **will have + past participle** a hitos de **Medical Research & Health**. Los límites con **by, by the end of** y **by the time** muestran qué habrá terminado antes de un punto futuro.

El vocabulario vivo incluye *clinical trial, vaccine, diagnosis, prognosis, findings, efficacy, side effect, dosage, control group, placebo* e *immunisation*. La guía mantiene la perspectiva lingüística y no convierte los ejemplos en consejo médico.""",
        "before": "[U43 — Modals + University](/blog/curso-b2/unidad-43-modals-obligation-university)",
        "learn": [
            "Formar afirmativas, negativas y preguntas en Future Perfect",
            "Diferenciar *by, in* y *until*",
            "Usar presente después de *by the time*",
            "Construir *will have been + participle*",
            "Describir hitos de investigación con cautela y precisión",
        ],
        "sections": U44_SECTIONS,
        "tip": "Dibuja dos puntos: el momento de completar la acción y el límite futuro. Si la acción queda a la izquierda del límite, *will have + participle* hace visible esa perspectiva.",
        "summary": """| Objetivo | Forma |
| :--- | :--- |
| resultado antes del futuro | **will have + V3** |
| negativa | **won't have + V3** |
| límite | **by + future point** |
| evento límite | **by the time + present** |
| resultado pasivo | **will have been + V3** |
| continuidad hasta un punto | **until**, no *by* |""",
        "next": """Continúa con la **Unidad 45**, inicio del bloque de exploración espacial y deducción modal.

- [Ejercicios U44 con soluciones](/blog/curso-b2/unidad-44-future-perfect-medical-ejercicios-soluciones)
- [Unidad 44 del curso](/curso-b2/unit-44)
- [U45 teoría: Modal Deduction + Space](/blog/curso-b2/unidad-45-modal-deduction-space)""",
        "guides": [
            "[U43 Modals + University](/blog/curso-b2/unidad-43-modals-obligation-university)",
            "[U45 Modal Deduction + Space](/blog/curso-b2/unidad-45-modal-deduction-space)",
            "[Inglés B2](/blog/metodos/ingles-b2)",
        ],
        "sources": COMMON_SOURCES,
    },
    {
        "unit": 45,
        "slug": "unidad-45-modal-deduction-space",
        "title": "Modal Deduction B2: Must, Might, Could, Can't + Space",
        "description": "Domina must, might, could y can't + be/have para deducción B2 con exploración espacial, audio y ejercicios resueltos.",
        "keywords": [
            "modal deduction B2 ejercicios",
            "must might could can't be have",
            "must have might have deducción",
            "modales de deducción inglés B2",
            "vocabulario exploración espacial inglés",
            "inglés B2 unidad 45",
        ],
        "image": "/blog/curso-b2/unit-45/modal-deduction-map.png",
        "alt": "Modal deduction B2 con exploración espacial",
        "related": [
            "unidad-45-modal-deduction-space-ejercicios-soluciones",
            "unidad-44-future-perfect-medical",
            "ingles-b2",
        ],
        "faqs": [
            ("¿Qué modal expresa una deducción fuerte positiva?", "**Must**: *The signal must be from the rover; they must have landed*."),
            ("¿Cómo expreso una posibilidad?", "Con **might** o **could** + verbo base; para pasado, *might/could have + participle*."),
            ("¿Cómo rechazo una posibilidad?", "Con **can't + be/base** en presente y **can't have + participle** para un evento anterior."),
            ("¿Must en U45 expresa obligación?", "No en estos ejemplos. Expresa una conclusión fuerte basada en evidencia; el contexto decide la función."),
            ("¿Dónde practico la Unidad 45?", "En la [Unidad 45 del curso B2](/curso-b2/unit-45) y su [cuaderno con soluciones](/blog/curso-b2/unidad-45-modal-deduction-space-ejercicios-soluciones)."),
        ],
        "excerpt": "Guía B2 de deducción modal presente, continua y pasada con evidencias y vocabulario de exploración espacial.",
        "intro": """La **Unidad 45** no es un repaso: abre el bloque temático de **Space Exploration** con **modal deduction**. **Must** presenta una conclusión fuerte, **might/could** una posibilidad y **can't** una conclusión negativa.

Las formas **modal + be/base**, **modal + be + -ing** y **modal + have + past participle** separan presente, acción en curso y evento anterior. El vocabulario vivo incluye *astronomy, mission, satellite, astronaut, rocket, orbit, probe, rover, launch, gravity* y *observatory*.""",
        "before": "[U44 — Future Perfect + Medical Research](/blog/curso-b2/unidad-44-future-perfect-medical)",
        "learn": [
            "Calibrar conclusiones fuertes, posibilidades y descartes",
            "Separar deducción presente, en curso y pasada",
            "Construir *modal + have + participio*",
            "No confundir *can't* deductivo con *mustn't* prohibitivo",
            "Justificar deducciones con evidencia espacial",
        ],
        "sections": U45_SECTIONS,
        "tip": "No empieces por el modal. Formula primero la evidencia, decide cuánto permite concluir y localiza el evento en presente o pasado. Después construye la cadena completa.",
        "summary": """| Evidencia y tiempo | Forma |
| :--- | :--- |
| conclusión fuerte presente | **must + be/base** |
| posibilidad presente | **might/could + be/base** |
| descarte presente | **can't + be/base** |
| acción en curso | **modal + be + -ing** |
| conclusión anterior | **modal + have + V3** |
| descarte anterior | **can't have + V3** |""",
        "next": """Has iniciado el bloque de Space Exploration. Continúa con la **Unidad 46 del curso B2**, dedicada a Psychology & Human Behavior y mixed conditionals.

- [Ejercicios U45 con soluciones](/blog/curso-b2/unidad-45-modal-deduction-space-ejercicios-soluciones)
- [Unidad 45 del curso](/curso-b2/unit-45)
- [Continuar con Unidad 46](/curso-b2/unit-46)""",
        "guides": [
            "[U44 Future Perfect + Medical Research](/blog/curso-b2/unidad-44-future-perfect-medical)",
            "[Inglés B2](/blog/metodos/ingles-b2)",
        ],
        "sources": COMMON_SOURCES,
    },
]


def main():
    diagrams()
    tts()
    OUT_MD.mkdir(parents=True, exist_ok=True)
    for data in ARTICLES:
        write_checked(data)


if __name__ == "__main__":
    main()
