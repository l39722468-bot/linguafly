#!/usr/bin/env python3
"""Generate B2 Unit 46–50 theory articles, diagrams and English audio.

The content follows the live lessons in ``src/lib/course/b2``: mixed
conditionals and psychology, cleft sentences and academic writing, reporting
verbs and teaching innovation, inversion and sociology, and the U41–49 review.
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
    46: {
        "map": (
            "mixed-conditionals-map.png",
            "Mixed conditionals · Psychology",
            [
                ("PAST → PRESENT", "If + had + V3, would + base/be doing", "If she had sought help, she would feel better now."),
                ("PRESENT → PAST", "If + past/were, would have + V3", "If he were more empathetic, he would have understood."),
                ("THIRD", "If + had + V3, would have + V3", "If I had known, I would have helped."),
                ("MODAL OPTIONS", "could/might replace would when meaning changes", "If we had invested, society could be healthier now."),
            ],
        ),
        "vocab": (
            "psychology-vocabulary.png",
            "Psychology & human behavior",
            [
                "psychology",
                "behavior",
                "cognition",
                "emotions",
                "mental health",
                "personality",
                "self-awareness",
                "anxiety",
                "empathy",
                "stress",
                "coping strategies",
                "self-esteem",
            ],
        ),
        "scene": (
            "psychology-context.png",
            "Past causes and present effects",
            [
                "If I had studied psychology, I would be a therapist now.",
                "If she were more confident, she would not have abandoned her research.",
                "If he had listened, he would know how to manage his anxiety now.",
                "If we had invested earlier, society could be healthier today.",
                "If he were more empathetic, he would have understood her feelings.",
            ],
        ),
    },
    47: {
        "map": (
            "cleft-sentences-map.png",
            "Cleft sentences · Academic writing",
            [
                ("IT + PERSON", "It was + person + who/that + clause", "It was the students who requested more examples."),
                ("IT + THING", "It was + focus + that + clause", "It was the introduction that needed revision."),
                ("WHAT-CLEFT", "What + clause + be + focus", "What the report shows is significant progress."),
                ("TIME / REASON", "It was + time/reason + that + clause", "It was because of the deadline that we rushed."),
            ],
        ),
        "vocab": (
            "academic-writing-vocabulary.png",
            "Academic writing & reports",
            [
                "essay",
                "report",
                "structure",
                "argumentation",
                "formal register",
                "evidence",
                "outline",
                "draft",
                "cite",
                "paraphrase",
                "thesis statement",
                "bibliography",
            ],
        ),
        "scene": (
            "academic-writing-context.png",
            "Focus in an academic report",
            [
                "What makes a good report is clear argumentation.",
                "It was the introduction that needed the most revision.",
                "What surprised the examiner was the quality of the evidence.",
                "It was last semester that the syllabus changed.",
                "What matters most is citing every source correctly.",
            ],
        ),
    },
    48: {
        "map": (
            "reporting-verbs-map.png",
            "Reporting verbs · Teaching innovation",
            [
                ("SUGGEST", "suggest + -ing / that + subject + base", "She suggested using gamification."),
                ("RECOMMEND", "recommend + -ing / that + subject + base", "The report recommended that teachers attend training."),
                ("INSIST", "insist on + -ing / that + subject + base", "She insisted that we implement the changes."),
                ("URGE", "urge + person + to + base", "The ministry urged schools to adopt EdTech."),
            ],
        ),
        "vocab": (
            "teaching-innovation-vocabulary.png",
            "Innovation in teaching",
            [
                "teaching methods",
                "innovation",
                "EdTech",
                "pedagogy",
                "student engagement",
                "assessment",
                "e-learning",
                "MOOC",
                "hands-on learning",
                "gamification",
                "flipped classroom",
                "formative feedback",
            ],
        ),
        "scene": (
            "teaching-innovation-context.png",
            "Recommendations for a modern classroom",
            [
                "Teachers suggest using EdTech in the classroom.",
                "The expert recommended trying different assessment methods.",
                "She insisted that we stay for the workshop.",
                "The advisor urged students to attend the webinar.",
                "The school introduced a flipped classroom to boost engagement.",
            ],
        ),
    },
    49: {
        "map": (
            "inversion-map.png",
            "Inversion for emphasis · Sociology",
            [
                ("NEGATIVE ADVERB", "Never/Seldom/Rarely + auxiliary + subject", "Never have I seen such rapid change."),
                ("ONLY", "Only then/when/by + auxiliary + subject", "Only then did we understand the impact."),
                ("PAIRED EVENTS", "Hardly ... when / No sooner ... than", "No sooner had one trend emerged than another began."),
                ("RESTRICTION", "Under no circumstances / At no time + inversion", "Under no circumstances should evidence be ignored."),
            ],
        ),
        "vocab": (
            "sociology-vocabulary.png",
            "Sociology & cultural shifts",
            [
                "sociology",
                "culture",
                "society",
                "trends",
                "demographics",
                "social change",
                "identity",
                "migration",
                "diversity",
                "modernisation",
                "urbanisation",
                "globalisation",
            ],
        ),
        "scene": (
            "sociology-context.png",
            "Emphasising cultural change",
            [
                "Never before had society faced such rapid cultural shifts.",
                "Only when the crisis hit did we understand its impact.",
                "Not only did demographics change, but identity did too.",
                "Seldom do we witness such rapid transformation.",
                "Only by comparing evidence can we explain social change.",
            ],
        ),
    },
    50: {
        "map": (
            "review-41-49-map.png",
            "Review U41–49 · Form and meaning",
            [
                ("TIME & EVIDENCE", "Future Perfect · modal deduction · conditionals", "By June, we will have finished; it must have worked."),
                ("FOCUS", "cleft sentences · inversion", "What matters is practice; never have I learned so much."),
                ("REPORTING", "passive reporting · reporting verbs", "It is believed that...; she suggested revising."),
                ("PATTERNS & MODALS", "gerund/infinitive · obligation/advice", "Avoid copying; you must cite every source."),
            ],
        ),
        "vocab": (
            "review-vocabulary.png",
            "Vocabulary review · U41–49",
            [
                "curriculum",
                "evidence",
                "clinical trial",
                "assignment",
                "astronomy",
                "cognition",
                "thesis statement",
                "EdTech",
                "student engagement",
                "sociology",
                "demographics",
                "diversity",
            ],
        ),
        "scene": (
            "review-context.png",
            "Integrated B2 review",
            [
                "By 2030, many learners will have completed online programmes.",
                "What makes education effective is student engagement.",
                "If we had invested in EdTech, results would be better now.",
                "The report recommended that teachers attend training.",
                "Never before had society faced such rapid cultural shifts.",
            ],
        ),
    },
}


AUDIOS = {
    46: {
        "past-present": "If I had studied psychology, I would be a therapist now. If he had listened to his therapist, he would know how to manage his anxiety.",
        "present-past": "If she were more confident, she would not have abandoned her research. If he were more empathetic, he would have understood her feelings.",
        "third-conditional": "If you had told me earlier, I could have helped. If I had known about the meeting, I would have attended.",
        "psychology-vocabulary": "Psychology. Behavior. Cognition. Emotions. Mental health. Personality. Emotional intelligence. Anxiety. Empathy. Stress. Coping strategies. Self-awareness. Self-esteem.",
        "reading-u46": "If I had studied psychology at university, I would be a therapist now. If she were more confident, she would not have given up her research. Behavior is influenced by cognition and emotions. If he had listened to his therapist, he would know how to manage his anxiety now.",
        "listening-u46": "I am Doctor Evans, a psychologist. If people had more self-awareness, they would make better decisions now. If he were more empathetic, he would have understood her feelings yesterday. Mental health requires good coping strategies.",
        "dialogue-u46": "Why is Maya still struggling with anxiety? If she had sought help earlier, she might feel better today. And if her manager were more empathetic, he would have understood her situation.",
        "practice-u46": "Choose two different time references. Use if plus had plus a past participle for a past cause and would plus a base verb for a present result. Reverse those times with if plus past and would have plus a past participle.",
    },
    47: {
        "it-clefts": "It was John who wrote the report. It was the introduction that needed the most revision. It was in twenty twenty that the project started.",
        "what-clefts": "What makes a good report is clear argumentation. What the data suggests is a clear trend. What surprised the examiner was the quality of the evidence.",
        "focus-time-reason": "It was because of the deadline that we rushed. It was not until Friday that they finished the draft. What matters most is citing sources correctly.",
        "academic-writing-vocabulary": "Essay. Report. Structure. Argumentation. Formal register. Introduction. Conclusion. Evidence. Outline. Draft. Cite. Bibliography. Topic sentence. Paraphrase. Thesis statement.",
        "reading-u47": "What makes a good academic report is clear structure and strong argumentation. It was the introduction that needed the most revision. What surprised the examiner was the quality of the evidence. Students must avoid plagiarism and cite sources correctly.",
        "listening-u47": "I am Doctor Martinez and I teach academic writing. What I want to emphasise is the importance of structure. It was the students who asked for more examples. What the data suggests is that formal register improves grades.",
        "dialogue-u47": "Which section needs revision? It is the introduction that needs more work. What should I improve first? What matters most is the thesis statement, followed by clear evidence.",
        "practice-u47": "Start from a neutral sentence and choose the element to focus. Use it was plus the focus plus who or that. Use a what clause plus be when the focus completes the message.",
    },
    48: {
        "gerund-patterns": "Teachers suggest using educational technology. The expert recommended trying different teaching methods. She insisted on staying for the workshop.",
        "that-patterns": "I suggest that we start early. The report recommended that teachers attend training. She insisted that we implement the changes immediately.",
        "urge-object": "The ministry urged schools to adopt educational technology. The advisor urged students to attend the webinar. She urged him to apply for the course.",
        "teaching-innovation-vocabulary": "Teaching methods. Innovation. Educational technology. Pedagogy. Student engagement. Assessment. E-learning. Massive open online course. Webinar. Hands-on learning. Gamification. Flipped classroom. Formative feedback.",
        "reading-u48": "Many teachers suggest using educational technology in the classroom. The expert recommended trying different teaching methods. The advisor urged students to attend the webinar. The school introduced a flipped classroom and gamification to boost motivation.",
        "listening-u48": "I am Professor Chen and I specialise in pedagogy. I suggest using blended learning in universities. The ministry urged schools to adopt educational technology. I recommend that teachers attend training workshops.",
        "dialogue-u48": "How can we improve engagement? I suggest introducing a real-world task. The evaluation report recommends using formative feedback. Then we should urge teachers to attend practical training.",
        "practice-u48": "Learn the complement with the reporting verb. Suggest and recommend can take a gerund or a that clause. Insist takes on plus a gerund or a that clause. Urge takes a person plus to and a base verb.",
    },
    49: {
        "negative-adverbs": "Never have I seen such interest in cultural shifts. Seldom do we witness such rapid transformation. Rarely does society change so quickly.",
        "only-phrases": "Only then did we realise the impact. Only when the crisis hit did we understand it. Only by working together can communities achieve change.",
        "paired-events": "Hardly had the pandemic ended when new trends emerged. No sooner had one trend appeared than another replaced it. Scarcely had I finished when the discussion began.",
        "sociology-vocabulary": "Sociology. Culture. Society. Trends. Demographics. Social change. Identity. Migration. Diversity. Tradition. Modernisation. Urbanisation. Globalisation. Generation gap.",
        "reading-u49": "Never before had society faced such rapid cultural shifts. Only then did we realise the impact of globalisation. Not only did demographics change, but identity did too. Migration and urbanisation shape modern society.",
        "listening-u49": "I am Doctor Williams and I teach sociology. Never have I seen such interest in cultural shifts. Only when the crisis hit did we understand its impact. Demographics and diversity are key to understanding modern society.",
        "dialogue-u49": "When did the trend become visible? Only after the census was published did researchers see it. Had migration changed too? Not only had migration increased, but urbanisation had accelerated as well.",
        "practice-u49": "When a restrictive or negative expression moves to the front, place the auxiliary before the subject. Add do, does or did when the neutral sentence has no auxiliary, and return the main verb to its base form.",
    },
    50: {
        "review-time": "By the end of the year, you will have completed the module. The signal must be genuine. If we had invested earlier, the results would be better now.",
        "review-focus": "What I want to emphasise is the importance of practice. It was the students who requested more examples. Never have I seen such dedication.",
        "review-reporting": "The experiment is believed to have succeeded. She suggested using blended learning. The advisor urged us to attend the webinar.",
        "review-vocabulary": "Curriculum. Evidence. Clinical trial. Assignment. Astronomy. Cognition. Thesis statement. Educational technology. Student engagement. Sociology. Demographics. Diversity.",
        "reading-u50": "By twenty thirty, many students will have graduated from online programmes. What makes education effective is student engagement. If we had invested more in educational technology, we would have better results now. Never before had society faced such rapid cultural shifts.",
        "listening-u50": "I am Doctor Lee and today we will review units forty one to forty nine. What I want to emphasise is the importance of practice. The advisor urged us to attend the webinar. Never have I seen such dedication among learners.",
        "dialogue-u50": "Which form should I review first? Start with the clue, not the form. By next week, you will have built a contrast table. What matters most is explaining why each answer fits.",
        "practice-u50": "Classify each prompt by meaning: verb pattern, reported information, rule, future deadline, deduction, conditional time link, focus, reported recommendation or emphatic inversion. Then produce the complete structure.",
    },
}


def diagrams() -> None:
    for unit, group in DIAGRAMS.items():
        grammar_map(unit, *group["map"])
        vocab_grid(unit, *group["vocab"])
        context_scene(unit, *group["scene"])


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


def study_lab(
    unit: int,
    theme: str,
    targets: str,
    contrasts: str,
    chunks: str,
    production: str,
):
    return f"""## 9. Del reconocimiento a la producción B2

Reconocer una opción correcta no garantiza que puedas producir **{targets}** sin apoyo. Trabaja cada ejemplo en tres vueltas. Primero localiza la pista de significado: qué tiempo se relaciona con cuál, qué elemento recibe foco, quién recomienda una acción o qué expresión exige inversión. Después tapa la solución y reconstruye la frase completa. Por último cambia sujeto, tiempo y un detalle de **{theme}**. La estructura solo está disponible para comunicar cuando sobrevive a esa transferencia.

Contrasta decisiones cercanas en vez de memorizar frases sueltas: **{contrasts}**. Para cada pareja, escribe una oración válida, una incorrecta y una explicación que nombre la pista. «Suena bien» no es una regla reutilizable. Una explicación útil dice, por ejemplo, que un resultado contiene *now*, que el foco es una persona, que *urge* necesita un objeto, o que una expresión negativa ha pasado al inicio.

Aprende bloques recuperables: **{chunks}**. Pronúncialos como unidades y añade después información nueva. Una tarjeta eficaz muestra una intención en español y exige la oración inglesa completa. Otra muestra dos formas posibles y pide justificar cómo cambia el significado. Si siempre empiezas desde el inglés visible, entrenas reconocimiento; si empiezas desde la intención, entrenas recuperación.

## 10. Reading, listening y pronunciación estratégica

Usa los ocho audios de la unidad como pruebas breves. En la primera escucha no leas: anota palabras de contenido y decide la situación. En la segunda sigue el texto y marca auxiliares, participios, infinitivos, palabras de foco y colocaciones. En la tercera haz *shadowing*: repite con una demora corta sin detener el audio. Mantener unidos los bloques reduce pausas que suelen provocar una pérdida de *have*, *to*, el auxiliar invertido o la terminación verbal.

No imites velocidad antes de conservar la forma. Pronuncia lentamente, acelera y reinserta el bloque en una frase. Observa las formas débiles de palabras gramaticales, pero da claridad a la sílaba tónica de los términos del tema. Aprende **colocación + contexto**, no solo traducción: una palabra conocida puede seguir resultando improductiva si no sabes qué verbo o preposición la acompaña.

Después del reading, resume cada idea sin copiar. Identifica la afirmación, su evidencia, la relación temporal y la postura del autor. Transforma dos frases a otra estructura compatible y explica qué se mantiene y qué cambia. La reconstrucción obliga a procesar el mensaje; releer de forma pasiva puede crear una falsa sensación de dominio.

## 11. Rutina guiada, corrección y repaso espaciado

Dedica cinco minutos a clasificar diez ejemplos sin completarlos. Anota únicamente **familia, intención y pista**. Usa otros cinco para producir la forma desde cero. Crea una tabla con esas tres columnas y un ejemplo de **{theme}**. Empezar por la intención impide depender del orden de una actividad de opción múltiple.

Durante cinco minutos transforma frases: afirmativa a negativa o pregunta, presente a pasado, foco neutro a enfático, sujeto singular a plural. Comprueba que cada cambio conserva auxiliares, infinitivos, participios, concordancia y puntuación. Combina después dos objetivos con *although, because, whereas, therefore* o *as a result*. Así practicas discurso B2 y no una colección de frases inconexas.

Reserva cinco minutos para corregir con diagnóstico. Clasifica cada error como **selección, forma, orden, tiempo, concordancia, complemento o vocabulario**. Escribe la corrección mínima, explica la pista y crea una oración nueva. Copiar la solución produce familiaridad visual; explicar y transferir construye control.

Termina con una producción cronometrada: **{production}**. Habla o escribe sin consultar tablas. Revisa cuatro criterios: estructura completa, elección justificable, vocabulario preciso y mensaje coherente. Repite la tarea al día siguiente, tres días después y una semana más tarde, reduciendo el apoyo en cada sesión.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-{unit}/practice-u{unit}.mp3" title="🔊 Práctica guiada Unidad {unit}"></audio>

Antes de avanzar, comprueba:

- [ ] Produzco las formas objetivo sin ver opciones.
- [ ] Justifico al menos cuatro contrastes con una pista concreta.
- [ ] Mantengo auxiliares, complementos e infinitivos al transformar.
- [ ] Comprendo reading y audios sin traducir palabra por palabra.
- [ ] Uso vocabulario de **{theme}** en ejemplos propios.
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


U46_SECTIONS = r"""## 1. Qué mezcla un mixed conditional

Un **mixed conditional** relaciona una condición irreal de un tiempo con un resultado irreal de otro. La mezcla no consiste en combinar formas al azar: primero construyes una relación causa–efecto y después sitúas cada parte en su momento. *If I had studied psychology, I would be a therapist now* parte de una decisión pasada no realizada y describe su consecuencia presente.

![Mapa de condicionales mixtos y psicología](/blog/curso-b2/unit-46/mixed-conditionals-map.png)

Las lecciones vivas de U46 trabajan dos direcciones principales. **Pasado → presente** explica cómo una elección anterior afecta la situación actual. **Presente → pasado** imagina que un rasgo o estado actual hubiera sido diferente y reconstruye una consecuencia anterior. La unidad también conserva el **third conditional**, pasado → pasado, para que la comparación temporal sea explícita.

## 2. Pasado irreal y resultado presente

<audio controls preload="none" src="/audio/blog/curso-b2/unit-46/past-present.mp3" title="🔊 Condición pasada y resultado presente"></audio>

La forma central es:

> **If + subject + had + past participle, subject + would/could/might + base**

- *If she **had sought** help earlier, she **would feel** better today.*
- *If he **had listened** to his therapist, he **would know** how to manage his anxiety now.*
- *If we **had invested** in mental health, society **could be** healthier today.*

Las pistas *now, today, at present, still* suelen aparecer en el resultado. La condición usa **past perfect** porque el hecho pertenece a un pasado cerrado: no buscó ayuda, no escuchó o no se hizo la inversión. El resultado usa **would + base** para estado actual, o **would be + -ing** para una actividad actual: *If I had accepted the post, I would be working as a psychologist now*.

No coloques *would* en la cláusula con *if* en estos ejemplos: no *if she would have sought*. **Could** añade capacidad o posibilidad; **might** reduce certeza. La elección modal cambia la postura, pero no la dirección temporal.

## 3. Estado presente y resultado pasado

<audio controls preload="none" src="/audio/blog/curso-b2/unit-46/present-past.mp3" title="🔊 Condición presente y resultado pasado"></audio>

Cuando un rasgo vigente explica un resultado anterior, usa:

> **If + subject + past simple/were, subject + would have + past participle**

*If she **were** more confident, she **wouldn't have given up** her research*. La idea es que su falta de confianza se considera una característica presente o general; imaginamos cómo habría cambiado una decisión pasada. *If he **were** more empathetic, he **would have understood** her feelings yesterday* sigue el mismo mapa.

En registro cuidado, **were** puede usarse con todas las personas para hipótesis: *if I were, if she were*. **Was** aparece en uso informal, pero las actividades de la unidad seleccionan **were**. El resultado necesita la cadena completa **would have + V3**; no *would had understood* ni *would have understand*.

Compara *If she had been more confident, she wouldn't have given up* —una condición situada en aquel momento, tercer condicional— con *If she were more confident...* —un rasgo que sigue caracterizándola—. Ambas pueden ser lógicas; el marco temporal expresa una interpretación distinta.

## 4. Third conditional como punto de contraste

<audio controls preload="none" src="/audio/blog/curso-b2/unit-46/third-conditional.mp3" title="🔊 Tercer condicional y contraste"></audio>

El **third conditional** mantiene condición y resultado en el pasado:

> **If + had + V3, would/could/might have + V3**

*If you had told me earlier, I could have helped; if I had known about the meeting, I would have attended*. No es un mixed conditional porque los dos eventos son anteriores. Incluirlo en U46 obliga a leer el resultado, no a responder automáticamente al ver *if + had*.

Usa una línea temporal. Marca C para condición y R para resultado. Si C está en pasado y R en presente, necesitas *had + V3 → would + base*. Si C es estado presente y R pasado, *past/were → would have + V3*. Si ambos están en pasado, aplica el tercero. Esta clasificación evita etiquetas imprecisas como «el condicional difícil».

## 5. Psicología y comportamiento humano

![Vocabulario de psicología y comportamiento humano](/blog/curso-b2/unit-46/psychology-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-46/psychology-vocabulary.mp3" title="🔊 Vocabulario de psicología"></audio>

**Psychology** estudia mente y comportamiento; **psychiatry** es una especialidad médica. **Behavior** es la manera observable de actuar, mientras **cognition** reúne procesos como pensar, recordar, atender y comprender. **Perception** es cómo interpretamos estímulos; una **belief** es una idea aceptada como verdadera y una **attitude** es una disposición hacia algo.

Las **emotions** son respuestas afectivas como alegría o miedo. **Emotional intelligence** combina reconocer, comprender y gestionar emociones; **empathy** es comprender la perspectiva o sentimientos de otra persona. **Self-awareness** es conocimiento de los propios estados y patrones. **Self-esteem** se refiere a la valoración personal y no equivale exactamente a seguridad en una tarea.

**Stress** describe presión y respuesta ante demandas; **anxiety** implica preocupación o nerviosismo y no debe usarse como diagnóstico improvisado. **Coping strategies** son formas de afrontar situaciones difíciles. En una guía lingüística conviene evitar promesas clínicas: practicamos cómo describir experiencias, no diagnosticamos ni sustituimos ayuda profesional.

Colocaciones productivas: **influence behavior, process a stimulus, manage emotions, experience anxiety, cope with stress, develop self-awareness, show empathy, seek professional help** y **build self-esteem**.

## 6. Reading y listening alineados con la unidad

![Condiciones pasadas y efectos presentes](/blog/curso-b2/unit-46/psychology-context.png)

> If I **had studied psychology** at university, I **would be a therapist now**. If she **were more confident**, she **wouldn't have given up** her research so easily. Behavior is influenced by cognition and emotions. If they **had understood** their emotions better, they **would have** better relationships now. If he **had listened** to his therapist, he **would know** how to manage his anxiety today.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-46/reading-u46.mp3" title="🔊 Reading Unidad 46"></audio>

El reading activo alterna pasado → presente y presente → pasado. *Had studied / would be* y *had listened / would know* conectan una causa anterior con una consecuencia actual. *Were more confident / wouldn't have given up* parte de un rasgo vigente para reconstruir una decisión pasada. Las frases sobre *cognition, emotions, mental health* aportan la red léxica.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-46/listening-u46.mp3" title="🔊 Listening Unidad 46"></audio>

En el listening, Dr. Evans usa *self-awareness, beliefs, attitudes, empathy* y *coping strategies*. Al escuchar, anota primero las referencias temporales; después reconstruye auxiliares. La secuencia /həd/ de *had sought* puede sonar débil, pero no desaparece de la estructura.

## 7. Diálogo y errores frecuentes

<audio controls preload="none" src="/audio/blog/curso-b2/unit-46/dialogue-u46.mp3" title="🔊 Diálogo Unidad 46"></audio>

> **Ana:** Why is Maya struggling with anxiety today?<br>
> **Leo:** If she **had sought** help earlier, she **might feel** better now.<br>
> **Ana:** Her manager dismissed her concerns yesterday.<br>
> **Leo:** If he **were** more empathetic, he **would have understood** her feelings.

| Error | Corrección razonada |
| :--- | :--- |
| *If I would have studied, I would be a therapist.* | **If I had studied**: sin *would* en la condición. |
| *If she had sought help, she would have felt better now.* | **would feel** si el resultado es presente. |
| *If he were empathetic, he would understood.* | **would have understood** para resultado pasado. |
| *If she was more confident* en la respuesta objetivo | **If she were** more confident. |
| *If I had knew* | **had known**: participio irregular. |
| *cope the stress* | **cope with stress**. |

## 8. Producción responsable y precisa

Los condicionales irreales son útiles para reflexionar, pero pueden sonar acusatorios: *If you were stronger, you wouldn't have failed* atribuye el resultado a un rasgo personal. En temas de salud mental, formula alternativas con cautela y reconoce información limitada: *With earlier support, she might feel less overwhelmed today*. La gramática permite graduar certeza con *would, could, might*.

Para la tarea escrita, describe una decisión pasada, su efecto actual y una característica que habría modificado un episodio anterior. Incluye vocabulario psicológico sin convertir una emoción cotidiana en diagnóstico. Termina con una estrategia constructiva. Esa organización demuestra control temporal, cohesión y sensibilidad de registro."""
U46_SECTIONS += study_lab(
    46,
    "Psychology & Human Behavior",
    "mixed conditionals de pasado a presente, presente a pasado y el tercer condicional",
    "had + V3 / past-were; would + base / would have + V3; would / could / might",
    "if I had studied, I would be; if she were, she would have understood; if I had known, I would have helped",
    "explica durante tres minutos cómo decisiones, rasgos y apoyo influyen en el presente; usa cuatro condicionales de cada dirección y diez términos psicológicos",
)
U46_SECTIONS += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
    [
        ("Completa: *If I ___ psychology, I would be a therapist now.*", "**Had studied**. La condición es pasada y el resultado con *now* es presente."),
        ("Corrige: *If she would have sought help, she might feel better today.*", "**If she had sought help, she might feel better today.**"),
        ("Completa: *If he ___ more empathetic, he would have understood yesterday.*", "**Were**. Un rasgo presente irreal explica un resultado pasado."),
        ("Distingue: *If she were more confident / If she had been more confident*.", "La primera presenta un rasgo vigente; la segunda sitúa la condición únicamente en el pasado."),
        ("Elige *would/could/might*: solo presentas una posibilidad débil actual.", "**Might**: *If they had received support, they might feel safer now*."),
        ("Convierte a pasado → presente: no escuchó al terapeuta; hoy no sabe afrontar el estrés.", "**If he had listened to his therapist, he would know how to cope with stress now.**"),
        ("Repara: *If I had knew, I would have helped.*", "**If I had known, I would have helped.**"),
        ("Distingue *empathy, self-awareness* y *self-esteem*.", "Comprender a otros; reconocer estados propios; valoración de uno mismo."),
        ("Completa colocaciones: *cope ___ stress; show ___; seek professional ___*.", "**Cope with stress; show empathy; seek professional help.**"),
        ("Producción: escribe 170–200 palabras sobre decisiones y bienestar.", "Incluye tres condicionales pasado → presente, tres presente → pasado, un tercero y doce términos de psicología."),
    ]
)


U47_SECTIONS = r"""## 1. Una cleft sentence redistribuye el foco

Una **cleft sentence** divide un mensaje neutro para destacar una parte. *John wrote the report* presenta información sin foco marcado; *It was John who wrote the report* corrige o resalta quién lo hizo. *The introduction needed revision* se convierte en *It was the introduction that needed revision*. El contenido básico permanece, pero cambia la organización informativa.

![Mapa de cleft sentences y escritura académica](/blog/curso-b2/unit-47/cleft-sentences-map.png)

En informes y presentaciones, el recurso guía al lector hacia el hallazgo central. No debe decorar cada frase: un texto lleno de hendidas resulta pesado. U47 trabaja dos familias productivas: **it-clefts** y **what-clefts**, además de focos de persona, cosa, tiempo, lugar y razón.

## 2. It was X who/that

<audio controls preload="none" src="/audio/blog/curso-b2/unit-47/it-clefts.mp3" title="🔊 It-clefts con who y that"></audio>

El patrón es:

> **It + be + elemento enfocado + who/that + resto de la cláusula**

Con personas, **who** es la elección pedagógica clara: *It was the students **who** asked for more examples*. **That** también puede aparecer con personas en muchos contextos, pero **which** no completa la it-cleft objetivo. Con cosas usa **that**: *It was the conclusion **that** was most controversial*.

El tiempo de **be** se ajusta al contexto: *It **is** the methodology that matters now; it **was** the introduction that needed revision*. El verbo de la cláusula concuerda con su sujeto semántico: *It was the students who **were** concerned*. El *it* inicial no representa una entidad; abre el marco de foco.

## 3. Tiempo, lugar, razón y not until

Una it-cleft también destaca una circunstancia:

- *It was **in the twentieth century** that academic writing became standardised.*
- *It was **in the library** that we found the source.*
- *It was **because of the deadline** that we rushed.*
- *It wasn't **until Friday** that they finished the draft.*

<audio controls preload="none" src="/audio/blog/curso-b2/unit-47/focus-time-reason.mp3" title="🔊 Foco de tiempo y razón"></audio>

La lección selecciona **that** después del foco: no *it was in 2020 when...* en la transformación objetivo. *It wasn't until... that...* destaca que el evento ocurrió más tarde de lo esperado. No lo confundas con la inversión de U49: *Not until Friday did they finish* comunica un foco parecido, pero cambia el orden auxiliar–sujeto.

Para comprobar la construcción, elimina el marco *it was... that* y recupera una oración neutra: *We rushed because of the deadline*. Si no puedes reconstruir un mensaje completo, probablemente falta una pieza.

## 4. What-clefts o pseudo-clefts

<audio controls preload="none" src="/audio/blog/curso-b2/unit-47/what-clefts.mp3" title="🔊 What-clefts en informes"></audio>

El segundo patrón comienza con una cláusula nominal:

> **What + subject + verb + be + elemento enfocado**

*What I need **is** a good night's sleep; what surprised me **was** his reaction; what the report shows **is** significant progress*. La cláusula con **what** significa aproximadamente «la cosa que...». Funciona como sujeto y en los ejemplos de la unidad toma **is/was** singular, aunque el complemento sea plural: *What matters most is the results* es el patrón que evalúa la lección.

El foco puede ser un sustantivo, infinitivo, gerundio o cláusula: *What we need to do is revise the structure; what the essay argues is that education needs reform; what matters most is citing sources correctly*. En estilo muy formal pueden aparecer variaciones de concordancia, pero para U47 conserva el modelo singular de las lecciones.

## 5. Academic Writing & Reports

![Vocabulario de escritura académica e informes](/blog/curso-b2/unit-47/academic-writing-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-47/academic-writing-vocabulary.mp3" title="🔊 Vocabulario de escritura académica"></audio>

Un **essay** desarrolla una postura o análisis; un **report** organiza información, método, findings o recomendaciones según un propósito. La **structure** es la organización global. Un **outline** es el plan previo y un **draft** una versión que se revisará. La **introduction** presenta propósito y contexto; la **conclusion** sintetiza sin introducir evidencia principal nueva.

Una **thesis statement** formula la idea central que defenderá el texto. Cada párrafo puede comenzar con una **topic sentence**. **Argumentation** conecta claims, razones y **evidence**. El **formal register** evita expresiones excesivamente coloquiales, pero no exige palabras innecesariamente largas.

**To cite** identifica una fuente; **to quote** reproduce palabras exactas; **to paraphrase** expresa la idea con formulación propia; **to summarise** reduce sus puntos principales. Todas requieren atribución cuando la idea procede de otra fuente. Una **bibliography** o lista de references registra las fuentes. Presentar trabajo ajeno como propio es **to plagiarise**.

Colocaciones: **write an essay, produce a report, develop an argument, support a claim with evidence, draft an outline, revise a draft, cite a source, include a bibliography, formulate a thesis statement**.

## 6. Reading y listening alineados

![Foco en un informe académico](/blog/curso-b2/unit-47/academic-writing-context.png)

> **What makes a good academic report is** clear structure and strong argumentation. **It was in the twentieth century that** academic writing became standardised. **What the essay argues is that** formal register is essential. **It was the introduction that** needed the most revision. **What surprised the examiner was** the quality of the evidence. Students must avoid plagiarism and cite sources correctly.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-47/reading-u47.mp3" title="🔊 Reading Unidad 47"></audio>

Cada hendida responde una pregunta implícita: ¿qué crea calidad?, ¿cuándo se estandarizó?, ¿qué sostiene el ensayo?, ¿qué parte necesitaba revisión? Esa pregunta ayuda a seleccionar el foco. El vocabulario no es decorativo: *structure, argumentation, register, evidence* forman criterios de calidad.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-47/listening-u47.mp3" title="🔊 Listening Unidad 47"></audio>

Dr. Martinez dice *What I want to emphasise is...* y *It was the students who...*. En la escucha, el foco suele recibir prominencia prosódica. Marca qué información contrasta con una alternativa posible; así conectas gramática y entonación.

## 7. Diálogo y revisión de errores

<audio controls preload="none" src="/audio/blog/curso-b2/unit-47/dialogue-u47.mp3" title="🔊 Diálogo Unidad 47"></audio>

> **Tutor:** Which section needs the most work?<br>
> **Student:** **It is the introduction that** needs revision.<br>
> **Tutor:** What should your main priority be?<br>
> **Student:** **What matters most is** a precise thesis statement and relevant evidence.

| Error | Corrección |
| :--- | :--- |
| *It was John which wrote the report.* | **who** para persona. |
| *It was the conclusion who was controversial.* | **that** para cosa. |
| *What I need are a clear outline.* | **What I need is** a clear outline. |
| *What surprised me it was the result.* | Elimina *it*: **What surprised me was...** |
| *It was in 2020 when the study began* en la forma objetivo | **It was in 2020 that...** |
| *make an essay* | **write an essay**. |
| *cite literally* | **quote** para reproducir palabras exactas. |

## 8. Uso estratégico en un informe

Una cleft debe responder a una necesidad de foco. En la introducción, *What this report examines is...* delimita el propósito. En resultados, *What the data reveals is...* destaca un patrón. En una corrección, *It is the methodology that requires clarification* identifica la sección, pero no sustituye evidencia ni razonamiento.

Redacta primero la versión neutra. Subraya la información nueva o contrastiva y elige **it-cleft** si quieres enfocar un constituyente concreto; usa **what-cleft** si quieres presentar una categoría abierta y completarla después de *be*. Comprueba concordancia y elimina redundancias. Alterna con oraciones neutras para conservar ritmo académico."""
U47_SECTIONS += study_lab(
    47,
    "Academic Writing & Reports",
    "it-clefts y what-clefts para personas, cosas, tiempo, razón y hallazgos",
    "who / that; it-cleft / what-cleft; oración neutra / foco marcado; is / was",
    "it was the students who, it was the introduction that, what the report shows is y what surprised me was",
    "presenta durante tres minutos las fortalezas y debilidades de un informe; usa cuatro it-clefts, cuatro what-clefts y doce términos académicos",
)
U47_SECTIONS += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
    [
        ("Enfatiza a la persona: *Dr. Khan wrote the report.*", "**It was Dr. Khan who wrote the report.**"),
        ("Enfatiza la sección: *The introduction needed revision.*", "**It was the introduction that needed revision.**"),
        ("Completa: *What the data suggests ___ a clear trend.*", "**Is**. La what-clause toma singular en el patrón de U47."),
        ("Transforma: *His reaction surprised me.*", "**What surprised me was his reaction.**"),
        ("Enfatiza la razón: *We rushed because of the deadline.*", "**It was because of the deadline that we rushed.**"),
        ("Corrige: *It was the researchers which requested more evidence.*", "**It was the researchers who requested more evidence.**"),
        ("Completa con una acción: *What we need to do is ___.*", "Ejemplo: **What we need to do is revise the structure.**"),
        ("Distingue *outline* y *draft*.", "El **outline** planifica la organización; el **draft** es una versión completa que se revisa."),
        ("Distingue *cite, quote* y *paraphrase*.", "Identificar la fuente; reproducir palabras exactas; reformular una idea con atribución."),
        ("Producción: escribe 170–200 palabras evaluando un informe.", "Usa tres it-clefts, tres what-clefts, foco de tiempo o razón y doce términos académicos."),
    ]
)


U48_SECTIONS = r"""## 1. El complemento pertenece al verbo de reporte

Los **reporting verbs** no aceptan todos la misma continuación. La Unidad 48 organiza **suggest, recommend, insist** y **urge** según el marco que abren. No basta traducirlos como «sugerir», «recomendar» o «insistir»: debes recuperar también gerundio, cláusula con *that*, preposición, objeto e infinitivo.

![Mapa de reporting verbs e innovación educativa](/blog/curso-b2/unit-48/reporting-verbs-map.png)

El tiempo del verbo de reporte depende de la situación: *teachers suggest* para una recomendación habitual; *the expert recommended* para una intervención anterior. La forma del complemento no cambia por estar el verbo principal en pasado. *Recommended trying* conserva *-ing*; *urged students to attend* conserva objeto + infinitivo.

## 2. Suggest y recommend + -ing

<audio controls preload="none" src="/audio/blog/curso-b2/unit-48/gerund-patterns.mp3" title="🔊 Reporting verbs seguidos de gerundio"></audio>

Cuando no nombras dentro del complemento quién debe actuar, usa:

> **suggest/recommend + verb-ing**

*Many teachers **suggest using** EdTech; the expert **recommended trying** different assessment methods*. El sujeto lógico de la acción se recupera del contexto. No uses *suggest to use* ni *recommend to try* en este marco.

**Insist** necesita **on** antes del gerundio: *She **insisted on staying** for the workshop*. El posesivo de *our staying* es posible en registro formal, pero la unidad se centra en **insist on + -ing**. El significado es más fuerte que una sugerencia: la persona no presenta simplemente una opción.

## 3. Suggest, recommend e insist + that-clause

<audio controls preload="none" src="/audio/blog/curso-b2/unit-48/that-patterns.mp3" title="🔊 Reporting verbs con that-clause"></audio>

Cuando quieres nombrar al sujeto de la acción, usa:

> **reporting verb + that + subject + base verb**

- *I suggested that we **start** early.*
- *The report recommended that teachers **attend** training.*
- *She insisted that we **implement** the changes immediately.*

La forma base después del sujeto se conoce como **mandative subjunctive**, especialmente productiva en inglés americano y formal. No lleva *-s*: *recommend that he **see***, no *sees*. La negativa coloca *not* antes del verbo: *insisted that we **not leave** yet*. En inglés británico también aparece *should + base* —*recommended that teachers should attend*—, pero las lecciones vivas seleccionan la base sin *should*.

No digas *suggest me that*. Puedes decir *suggest to me that...* cuando *to me* identifica al receptor, pero para proponer que yo actúe usa **suggest that I do**. Esta diferencia evita uno de los calcos más frecuentes.

## 4. Urge + person + to-infinitive

<audio controls preload="none" src="/audio/blog/curso-b2/unit-48/urge-object.mp3" title="🔊 Urge con objeto e infinitivo"></audio>

**Urge** identifica explícitamente a la persona o institución que recibe el llamamiento:

> **urge + object + to + base**

*The ministry urged **schools to adopt** EdTech; the advisor urged **students to attend** the webinar; she urged **him to apply***. Los pronombres toman forma de objeto: **me, him, her, us, them**. No *urged they to attend*.

*Urge* suele comunicar presión o importancia, más fuerte que una recomendación. No lo uses para una preferencia trivial si el tono no lo justifica. En una política educativa puede introducir una acción prioritaria; en consejo amistoso, *encourage someone to* puede ser menos intenso.

## 5. Innovation in Teaching

![Vocabulario de innovación en la enseñanza](/blog/curso-b2/unit-48/teaching-innovation-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-48/teaching-innovation-vocabulary.mp3" title="🔊 Vocabulario de innovación educativa"></audio>

**Pedagogy** estudia principios y práctica de enseñanza; **teaching methods** son enfoques concretos. **EdTech** aplica tecnología a la educación. **E-learning** ocurre en línea; **blended learning** combina componentes presenciales y digitales. Un **MOOC** es un curso online masivo y abierto; un **webinar** es una presentación o sesión en directo por internet.

En una **flipped classroom**, el alumnado accede al contenido introductorio antes de clase y usa el tiempo compartido para aplicación. **Hands-on learning** desarrolla comprensión mediante tareas prácticas; un **real-world task** simula o aborda una situación auténtica. **Gamification** incorpora elementos de juego, pero no convierte necesariamente todo el curso en un juego.

**Student engagement** incluye implicación cognitiva, emocional y conductual. **Assessment** evalúa aprendizaje; **formative feedback** ayuda a mejorar durante el proceso. **Personalised learning** adapta rutas o apoyo, mientras **self-paced learning** permite avanzar a ritmo propio. Innovación no es sinónimo de pantalla: debe responder a un objetivo y evaluarse con evidencia.

Colocaciones: **adopt EdTech, introduce a flipped classroom, boost student engagement, design a real-world task, provide formative feedback, assess learning outcomes, attend a webinar, complete a MOOC**.

## 6. Reading y listening alineados

![Recomendaciones para una clase moderna](/blog/curso-b2/unit-48/teaching-innovation-context.png)

> Many teachers **suggest using EdTech** in the classroom. The expert **recommended trying** different teaching methods. She **insisted that we stay** for the workshop. The advisor **urged students to attend** the webinar. The school introduced a flipped classroom, and the teacher **suggested that we use gamification** to boost motivation.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-48/reading-u48.mp3" title="🔊 Reading Unidad 48"></audio>

El reading distribuye los cuatro marcos. Rodea el verbo de reporte y subraya desde el inicio del complemento: *using; trying; that we stay; students to attend*. Esa segmentación hace visible por qué *urge* necesita objeto mientras *suggest + -ing* no lo contiene.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-48/listening-u48.mp3" title="🔊 Listening Unidad 48"></audio>

Professor Chen propone blended learning, comunica una recomendación del informe y reproduce una exigencia de implementación. Identifica quién origina cada propuesta y quién debe actuar. Reportar no significa respaldar automáticamente la idea; atribución y postura son dimensiones distintas.

## 7. Diálogo y errores frecuentes

<audio controls preload="none" src="/audio/blog/curso-b2/unit-48/dialogue-u48.mp3" title="🔊 Diálogo Unidad 48"></audio>

> **Teacher:** How can we improve engagement?<br>
> **Researcher:** I **suggest introducing** a real-world task.<br>
> **Teacher:** What does the evaluation report say?<br>
> **Researcher:** It **recommends using** formative feedback and **urges schools to provide** practical training.

| Error | Corrección |
| :--- | :--- |
| *She suggested to use EdTech.* | **suggested using** / **suggested that we use**. |
| *He recommended me to attend.* | **recommended that I attend**. |
| *She insisted to stay.* | **insisted on staying** / **insisted that we stay**. |
| *The advisor urged that students attend* como patrón objetivo | **urged students to attend**. |
| *recommended that he sees* | **that he see** en el modelo de la unidad. |
| *urge they to apply* | **urge them to apply**. |
| *make an assessment* en sentido de evaluar | **assess students / conduct an assessment**. |

## 8. De la moda a una recomendación argumentada

Un texto B2 no enumera herramientas como si la innovación fuera positiva por definición. Presenta el problema, atribuye propuestas y evalúa condiciones. *Teachers suggested using gamification, but the evaluation report recommended that the school first define measurable outcomes*. El reporting verb indica la fuerza de la propuesta; el resto del texto aporta evidencia.

En una tarea escrita, incluye al menos una recomendación sin agente explícito, una cláusula que nombre al responsable, una insistencia y un llamamiento con *urge*. Añade una limitación y un criterio de evaluación. Así conectas gramática, vocabulario y pensamiento crítico."""
U48_SECTIONS += study_lab(
    48,
    "Innovation in Teaching",
    "suggest, recommend, insist y urge con sus complementos",
    "gerundio / that-clause; insist on / insist that; verbo + persona + to; sugerencia / presión",
    "suggest using, recommend that teachers attend, insist on staying, insist that we implement y urge schools to adopt",
    "presenta durante tres minutos un plan de innovación; atribuye ocho propuestas con los cuatro verbos y usa doce términos de enseñanza",
)
U48_SECTIONS += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
    [
        ("Completa: *Teachers suggested ___ gamification.*", "**Using**. *Suggest + gerundio*."),
        ("Reescribe con sujeto explícito: *The report recommended more training.*", "**The report recommended that teachers attend more training.**"),
        ("Completa: *She insisted ___ staying for the workshop.*", "**On**: *insist on + -ing*."),
        ("Corrige: *The ministry urged schools adopting EdTech.*", "**The ministry urged schools to adopt EdTech.**"),
        ("Corrige la concordancia: *She recommended that he attends the webinar.*", "**She recommended that he attend the webinar.**"),
        ("Niega la cláusula: *They insisted that we leave.*", "**They insisted that we not leave.**"),
        ("Distingue tono de *suggest* y *urge*.", "*Suggest* presenta una propuesta; *urge* comunica un llamamiento más fuerte a una persona concreta."),
        ("Distingue *flipped classroom, blended learning* y *MOOC*.", "Contenido antes de clase y aplicación conjunta; combinación presencial-digital; curso online masivo y abierto."),
        ("Completa: *___ engagement; ___ feedback; ___ learning outcomes.*", "**Boost student engagement; provide formative feedback; assess learning outcomes.**"),
        ("Producción: escribe 170–200 palabras proponiendo una innovación.", "Usa dos gerundios, tres that-clauses, *insist on*, dos patrones con *urge* y doce términos EdTech."),
    ]
)


U49_SECTIONS = r"""## 1. Cuándo aparece la inversión enfática

En una oración declarativa neutra, el sujeto suele ir antes del auxiliar: *Society has never faced...*. Cuando una expresión negativa o restrictiva pasa al inicio para recibir énfasis, el inglés formal adopta orden de pregunta en la cláusula principal: *Never before **has society faced**...*. No es una pregunta; es **subject–auxiliary inversion**.

![Mapa de inversión enfática y sociología](/blog/curso-b2/unit-49/inversion-map.png)

La inversión se usa en escritura formal, discursos y narración enfática. No necesitas aplicarla a cada frase. El proceso fiable es: identifica la expresión inicial, localiza el auxiliar y colócalo antes del sujeto. Si la oración neutra no tiene auxiliar, añade **do/does/did** y devuelve el verbo principal a base.

## 2. Never, seldom, rarely, little y expresiones negativas

<audio controls preload="none" src="/audio/blog/curso-b2/unit-49/negative-adverbs.mp3" title="🔊 Inversión con adverbios negativos"></audio>

- *Never **have I seen** such interest in cultural shifts.*
- *Seldom **do we witness** such rapid transformation.*
- *Rarely **does society change** so quickly.*
- *Little **did we know** that identity would change.*
- *At no time **did they lose** hope.*
- *In no way **can this justify** discrimination.*

Con present perfect, mueve **have/has**; con modal, mueve el modal; con simple present/past, añade **do/does/did**. Después de *did*, usa base: *did we realise*, no *did we realised*. **Little** aquí significa «sin saberlo», no pequeña cantidad.

**Under no circumstances should you...** expresa prohibición o rechazo enfático. El auxiliar depende del mensaje: *should, can, must, will*. La expresión frontal ya aporta alcance negativo; evita una doble negación innecesaria.

## 3. Only then, only when y only by

<audio controls preload="none" src="/audio/blog/curso-b2/unit-49/only-phrases.mp3" title="🔊 Inversión con only"></audio>

Con **only + circunstancia** al inicio, la inversión ocurre en la cláusula principal:

- *Only then **did we realise** the impact.*
- *Only when the crisis hit **did we understand** its scale.*
- *Only after the census was published **did researchers identify** the trend.*
- *Only by comparing groups **can we explain** the change.*

La cláusula después de *only when* mantiene orden normal: *the crisis hit*, no *did the crisis hit*. La inversión aparece en *did we understand*. Con **only by**, el gerundio presenta el medio y la principal se invierte.

Si *only* modifica al sujeto, normalmente no hay inversión: *Only researchers understood the table*. Tampoco hay inversión cuando la expresión no está al inicio: *We realised the impact only then*. Posición y función son las dos condiciones.

## 4. Not only, not until y sucesión inmediata

**Not only** al inicio invierte su primera cláusula: *Not only **did demographics change**, but identity **did too***; *Not only **is she** talented, but she is also careful*. La segunda parte suele usar **but also** o una forma elíptica coherente.

**Not until + expresión** retrasa la realización: *Not until the twentieth century **did women gain** the vote*. Como con *only when*, la inversión está en la principal. Compara la it-cleft de U47: *It wasn't until the twentieth century that women gained the vote*.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-49/paired-events.mp3" title="🔊 Hardly, scarcely y no sooner"></audio>

Para dos hechos casi consecutivos:

> **Hardly/Scarcely had + subject + V3 + when + past simple**  
> **No sooner had + subject + V3 + than + past simple**

*Hardly had the pandemic ended **when** new trends emerged; no sooner had one fad appeared **than** another replaced it*. Conserva las parejas **hardly/scarcely ... when** y **no sooner ... than**.

## 5. Sociology & Cultural Shifts

![Vocabulario de sociología y cambios culturales](/blog/curso-b2/unit-49/sociology-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-49/sociology-vocabulary.mp3" title="🔊 Vocabulario de sociología"></audio>

**Sociology** estudia sociedades, relaciones e instituciones; **psychology** se centra en mente y comportamiento individual, aunque los campos se relacionan. **Culture** reúne creencias, costumbres, prácticas y artes compartidas. **Society** es una red o comunidad amplia de personas e instituciones. Una **community** comparte lugar, interés o identidad dentro de esa sociedad.

**Demographics** son características estadísticas de una población, como edad, ingresos o composición. Un **census** es una operación para contar y describir una población. **Social change** es transformación de estructuras o normas. Un **trend** mantiene una dirección observable; un **fad** es una moda breve.

**Migration** es desplazamiento para vivir en otro lugar. **Urbanisation** aumenta la proporción de población urbana; **modernisation** describe procesos de cambio hacia instituciones o tecnologías consideradas modernas; **globalisation** intensifica conexiones mundiales. Ninguno es automáticamente positivo o negativo: el análisis requiere contexto y evidencia.

**Identity** responde a cómo una persona o grupo se define; **diversity** describe variedad. **Traditions, values** y **norms** se transmiten o negocian. La **generation gap** señala diferencias entre generaciones. Colocaciones: **analyse demographic data, conduct a census, observe a trend, drive social change, shape identity, preserve a tradition, experience urbanisation**.

## 6. Reading y listening alineados

![Inversión para enfatizar cambios culturales](/blog/curso-b2/unit-49/sociology-context.png)

> **Never before had society faced** such rapid cultural shifts. **Only then did we realise** the impact of globalisation. **Not only did demographics change, but identity did too**. Sociology studies these transformations. **Seldom do we see** such diversity in one place. **Hardly had the pandemic ended when** new trends emerged. Migration and urbanisation shape modern society.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-49/reading-u49.mp3" title="🔊 Reading Unidad 49"></audio>

Clasifica cada ejemplo por auxiliar: *had* ya existe en past perfect; *did* se añade a past simple; *do* se añade a simple present. Después devuelve cada una a orden neutro. Esa transformación bilateral demuestra que entiendes el mecanismo.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-49/listening-u49.mp3" title="🔊 Listening Unidad 49"></audio>

Dr. Williams enfatiza interés, crisis, transformación y migración. La expresión inicial y el auxiliar suelen recibir prominencia. No confundas énfasis retórico con prueba: *Never before...* es una afirmación amplia y un informe académico debe respaldarla con datos.

## 7. Diálogo y errores frecuentes

<audio controls preload="none" src="/audio/blog/curso-b2/unit-49/dialogue-u49.mp3" title="🔊 Diálogo Unidad 49"></audio>

> **Researcher:** When did the pattern become visible?<br>
> **Analyst:** **Only after the census was published did we identify** it.<br>
> **Researcher:** Had migration changed as well?<br>
> **Analyst:** **Not only had migration increased, but urbanisation had accelerated too.**

| Error | Corrección |
| :--- | :--- |
| *Never I have seen...* | **Never have I seen...** |
| *Seldom we see...* | **Seldom do we see...** |
| *Only when the crisis did hit we understood...* | **Only when the crisis hit did we understand...** |
| *Only then did we realised...* | **did we realise**. |
| *No sooner... when* | **No sooner... than**. |
| *Hardly... than* | **Hardly... when**. |
| *Only researchers did understand* | Sin inversión: **Only researchers understood**. |

## 8. Énfasis con evidencia y tono

La inversión puede hacer que una afirmación parezca contundente. En sociología, no la uses para ocultar falta de evidencia. *Rarely do communities change without tension* necesita alcance, fuente o matiz. Combina forma enfática con atribución: *According to the survey, seldom had respondents reported such a rapid shift*.

En producción, alterna dos o tres inversiones con orden neutro. Presenta datos demográficos, interpreta un cambio y reconoce una limitación. Comprueba que *not only* conecta elementos paralelos y que los pares temporales describen una secuencia real. El objetivo es énfasis controlado, no dramatización constante."""
U49_SECTIONS += study_lab(
    49,
    "Sociology & Cultural Shifts",
    "inversión con expresiones negativas, only, not only, not until y pares temporales",
    "auxiliar existente / do-support; orden neutro / invertido; hardly-when / no sooner-than; only sujeto / only circunstancia",
    "never have I seen, seldom do we witness, only then did we realise, not only did society change y no sooner had it begun than",
    "presenta durante tres minutos un cambio cultural apoyado en datos; usa ocho tipos de inversión y doce términos sociológicos",
)
U49_SECTIONS += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
    [
        ("Invierte: *I have never seen such rapid change.*", "**Never have I seen such rapid change.**"),
        ("Invierte: *We seldom witness this level of diversity.*", "**Seldom do we witness this level of diversity.**"),
        ("Corrige: *Only then did we realised the impact.*", "**Only then did we realise the impact.**"),
        ("Completa: *Only when the census appeared ___ researchers identify the trend.*", "**Did** researchers identify."),
        ("Une: demographics changed; identity changed too.", "**Not only did demographics change, but identity did too.**"),
        ("Completa las parejas: *Hardly... ___; No sooner... ___*.", "**Hardly... when; no sooner... than.**"),
        ("Explica por qué no se invierte *Only researchers understood*.", "*Only* modifica al sujeto, no una circunstancia frontal."),
        ("Distingue *trend* y *fad*.", "Un **trend** mantiene una dirección observable; un **fad** es popular durante poco tiempo."),
        ("Distingue *urbanisation, modernisation* y *globalisation*.", "Crecimiento urbano; cambio hacia estructuras modernas; integración y conexión mundial."),
        ("Producción: escribe 170–200 palabras sobre un cambio cultural.", "Usa seis inversiones de cuatro familias, datos o cautelas y doce términos sociológicos."),
    ]
)


U50_SECTIONS = r"""## 1. Un repaso de decisiones, no de etiquetas

La Unidad 50 integra las unidades **41–49**. La lección viva de gramática comprueba especialmente **Future Perfect, modal deduction, mixed conditionals, cleft sentences, reporting verbs** e **inversion**; el bloque completo también exige recuperar **gerunds and infinitives, passive reporting** y **modals of obligation and advice**. El objetivo es elegir por significado, no reconocer una etiqueta aislada.

![Mapa de repaso de gramática U41–49](/blog/curso-b2/unit-50/review-41-49-map.png)

Antes de completar, pregunta: ¿un primer verbo controla el complemento?, ¿se atribuye información?, ¿se expresa una regla?, ¿hay un límite futuro?, ¿la evidencia permite deducir?, ¿condición y resultado pertenecen a tiempos distintos?, ¿se enfoca un elemento?, ¿se reporta una recomendación?, ¿una expresión inicial exige invertir? Esa pregunta clasifica la familia.

## 2. U41–U43: patrones, atribución y modalidad

**U41 Gerunds and Infinitives:** *enjoy/avoid/finish + -ing; decide/hope/refuse + to; ask/allow + person + to*. Los cambios de *remember, stop, try* dependen de secuencia y significado. *She suggested using* pertenece a U48, aunque también contiene gerundio; identifica el verbo que abre el marco.

**U42 Passive Reporting:** *It is believed that the method works; the method is believed to work; the researcher is reported to have discovered...*. El infinitivo simple comunica simultaneidad; *to be doing*, proceso; *to have done*, anterioridad. No mezcles *It is said that* con *subject is said to*.

**U43 Obligation and Advice:** *must/have to/need to* expresan obligación o necesidad; *should/ought to*, consejo; *don't have to*, ausencia de obligación; *mustn't*, prohibición. En el repaso, una palabra como *optional* vale más que la traducción «deber».

## 3. U44–U46: líneas temporales y evidencia

<audio controls preload="none" src="/audio/blog/curso-b2/unit-50/review-time.mp3" title="🔊 Repaso de tiempo, deducción y condición"></audio>

**U44 Future Perfect:** **will have + V3** presenta un resultado completo antes de un límite futuro: *By 2030, many students will have graduated*. Después de *by the time* usa presente en la cláusula temporal: *By the time the course ends, we will have completed...*.

**U45 Modal Deduction:** *must be/have done* expresa conclusión fuerte; *might/could*, posibilidad; *can't be/have done*, descarte. Localiza presente, acción en curso o pasado: *must be tired; must be working; must have worked*. No confundas *mustn't* prohibitivo con *can't* deductivo.

**U46 Mixed Conditionals:** *If + had + V3, would + base* conecta causa pasada y resultado presente. *If + past/were, would have + V3* conecta estado presente y resultado pasado. *If + had + V3, would have + V3* es third conditional. Rodea *now, today, yesterday, earlier*.

## 4. U47–U49: foco, reporte e inversión

<audio controls preload="none" src="/audio/blog/curso-b2/unit-50/review-focus.mp3" title="🔊 Repaso de foco e inversión"></audio>

**U47 Cleft Sentences:** *It was the students who requested examples; it was the introduction that needed revision; what matters is practice*. La construcción conserva el contenido y destaca un elemento. **Who** enfoca personas; **that**, cosas o circunstancias.

**U48 Reporting Verbs:** *suggest/recommend + -ing* o *that + subject + base*; *insist on + -ing* o *insist that...*; *urge + person + to*. Aprende verbo y complemento como bloque. *The advisor urged us to attend* es una frase central del listening de U50.

**U49 Inversion:** *Never have I seen; only then did we realise; not only did society change; hardly had it ended when...*. Mueve un auxiliar existente o añade *do/does/did*. La it-cleft *It wasn't until Friday that...* y la inversión *Not until Friday did...* son alternativas, no estructuras híbridas.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-50/review-reporting.mp3" title="🔊 Repaso de estructuras de reporte"></audio>

## 5. Vocabulario conectado de U41–49

![Vocabulario de repaso U41–49](/blog/curso-b2/unit-50/review-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-50/review-vocabulary.mp3" title="🔊 Vocabulario de repaso"></audio>

Organiza el léxico por redes. Educación: **curriculum, assignment, student engagement, assessment, pedagogy, EdTech**. Ciencia y salud: **hypothesis, evidence, findings, clinical trial, efficacy**. Universidad y escritura: **deadline, thesis statement, argumentation, cite, paraphrase**. Espacio: **mission, probe, orbit, astronomy**. Psicología: **cognition, empathy, anxiety, coping strategies**. Sociología: **demographics, identity, migration, diversity, globalisation**.

Después conecta redes: *A report cites evidence from a clinical trial; EdTech may influence student engagement; demographic change can shape identity*. Una palabra se aprende mejor cuando participa en una colocación y en una relación conceptual.

No confundas pares: **curriculum/syllabus**, programa amplio frente a una asignatura; **evidence/findings**, apoyo frente a resultados interpretados; **essay/report**, argumentación frente a formato informativo orientado a un propósito; **psychology/sociology**, individuo frente a sociedad; **trend/fad**, dirección sostenida frente a moda breve.

## 6. Reading integrado de la unidad viva

![Estructuras integradas en el repaso B2](/blog/curso-b2/unit-50/review-context.png)

> **By 2030, many students will have graduated** from online programmes. **What makes education effective is** student engagement. She **suggested using** blended learning. **Never before had society faced** such rapid cultural shifts. **If we had invested** more in EdTech, **we would have** better results now. **It was the introduction that** needed revision. The report **recommended that teachers attend** training. **Only then did we realise** the importance of diversity.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-50/reading-u50.mp3" title="🔊 Reading Unidad 50"></audio>

El texto no contiene una estructura de cada unidad, pero representa el núcleo activo del repaso. Etiqueta cada forma y justifica su pista: *by 2030*, foco con *what*, complemento de *suggest*, expresión negativa frontal, condición pasada con resultado actual, it-cleft, cláusula mandativa e inversión con *only*.

Después incorpora U41–45 con transformaciones: *Students enjoy studying online; the programme is believed to improve access; learners must cite sources; by June they will have completed the project; the figures might have changed*. La integración obliga a cambiar de sistema sin perder precisión.

## 7. Listening, diálogo y discriminación

<audio controls preload="none" src="/audio/blog/curso-b2/unit-50/listening-u50.mp3" title="🔊 Listening Unidad 50"></audio>

Dr. Lee combina *you will have completed, what I want to emphasise is, she must be exhausted, if I had known, it was the students who, urged us to attend* y *never have I seen*. En la primera escucha identifica la función; en la segunda reconstruye las cadenas. Los auxiliares débiles son pequeños, pero deciden la respuesta.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-50/dialogue-u50.mp3" title="🔊 Diálogo de repaso Unidad 50"></audio>

> **Student:** Which form should I review first?<br>
> **Tutor:** Start with the clue. **By next week, you will have built** a contrast table.<br>
> **Student:** Is memorising examples enough?<br>
> **Tutor:** No. **What matters most is explaining** why each answer fits.

## 8. Errores cruzados y estrategia de examen

| Error | Diagnóstico y corrección |
| :--- | :--- |
| *By Friday, I will finished.* | Futuro perfecto: **will have finished**. |
| *She must to be tired.* | Modal + base: **must be**. |
| *If I would have known...* | Condición pasada: **if I had known**. |
| *It was the students which...* | Persona en cleft: **who**. |
| *She suggested to use EdTech.* | **suggested using / suggested that we use**. |
| *Never I have seen...* | **Never have I seen...** |
| *The method is believed that it works.* | **is believed to work**. |
| *Optional: you mustn't attend.* | **don't have to attend**. |

En una prueba mixta, no respondas por la primera palabra. Lee la oración completa, subraya referencia temporal, fuente, grado de certeza, foco y complemento. Formula mentalmente la estructura y solo entonces mira las opciones. Si dos formas son gramaticales, decide cuál conserva el significado exacto.

Para producción, planifica tres funciones antes de escribir. Por ejemplo: una predicción completada, una recomendación atribuida y una consecuencia contrafactual. Añade foco o inversión solo donde mejore el discurso. La variedad cuenta cuando cada elección es correcta y funcional, no cuando acumulas estructuras sin conexión."""
U50_SECTIONS += study_lab(
    50,
    "Repaso 41–49",
    "las nueve familias gramaticales y el vocabulario de educación, ciencia, salud, espacio, psicología, escritura, innovación y sociedad",
    "forma parecida / función distinta; presente / pasado / futuro; atribución / certeza; orden neutro / foco / inversión",
    "enjoy studying, is believed to work, must cite, will have completed, might have changed, if we had invested, what matters is, suggest using y never have I seen",
    "resume durante cuatro minutos un proyecto educativo y su impacto social; usa al menos una estructura de cada unidad U41–49 y quince términos del bloque",
)
U50_SECTIONS += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
    [
        ("Completa: *By next year, I ___ from university.*", "**Will have graduated**: resultado completo antes del límite futuro."),
        ("Elige por evidencia fuerte: *She ___ exhausted; she has worked all day.*", "**Must be**."),
        ("Completa: *If we ___ earlier, results would be better now.*", "**Had invested**: pasado → presente."),
        ("Enfatiza: *The students asked for more examples.*", "**It was the students who asked for more examples.**"),
        ("Reporta la propuesta: *Let's use blended learning.*", "**She suggested using blended learning** o **suggested that we use it**."),
        ("Invierte: *I have never seen such dedication.*", "**Never have I seen such dedication.**"),
        ("Transforma: *People believe the method works.*", "**The method is believed to work** / **It is believed that the method works**."),
        ("Corrige la norma: *The seminar is optional, so you mustn't attend.*", "**You don't have to attend.**"),
        ("Clasifica *evidence, thesis statement, cognition, demographics*.", "Ciencia/argumentación; escritura académica; psicología; sociología y población."),
        ("Producción: escribe 190–220 palabras de repaso integrado.", "Usa una estructura de cada U41–49, quince términos, conectores y una explicación final de dos contrastes."),
    ]
)


COMMON_SOURCES = """- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — B1–B2 grammar: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar
- Cambridge Dictionary — Grammar and vocabulary reference: https://dictionary.cambridge.org/grammar/british-grammar/"""


ARTICLES = [
    {
        "unit": 46,
        "slug": "unidad-46-mixed-conditionals-psychology",
        "title": "Mixed Conditionals B2: Psicología y Comportamiento",
        "description": "Domina mixed conditionals de pasado a presente y de presente a pasado con psicología, audio, vocabulario y ejercicios resueltos.",
        "keywords": [
            "mixed conditionals B2 ejercicios",
            "condicionales mixtos pasado presente inglés",
            "if had would be would have B2",
            "third conditional vs mixed conditional",
            "vocabulario psicología comportamiento inglés",
            "inglés B2 unidad 46",
        ],
        "image": "/blog/curso-b2/unit-46/mixed-conditionals-map.png",
        "alt": "Mixed conditionals B2 con psicología y comportamiento humano",
        "related": [
            "unidad-46-mixed-conditionals-psychology-ejercicios-soluciones",
            "unidad-45-modal-deduction-space",
            "unidad-47-cleft-sentences-academic-writing",
            "ingles-b2",
        ],
        "faqs": [
            ("¿Cómo se forma el mixed conditional de pasado a presente?", "Con **if + had + participio** y **would + base**: *If I had studied psychology, I would be a therapist now*."),
            ("¿Cómo conecto un estado presente con un resultado pasado?", "Con **if + past/were** y **would have + participio**: *If she were more confident, she wouldn't have given up*."),
            ("¿En qué se diferencia del tercer condicional?", "El tercero sitúa condición y resultado en el pasado; el mixto conecta tiempos distintos."),
            ("¿Puedo usar could o might?", "Sí. *Could* añade capacidad o posibilidad y *might* expresa una consecuencia menos segura."),
            ("¿Dónde practico la Unidad 46?", "En la [Unidad 46 del curso B2](/curso-b2/unit-46) y el [cuaderno con soluciones](/blog/curso-b2/unidad-46-mixed-conditionals-psychology-ejercicios-soluciones)."),
        ],
        "excerpt": "Guía B2 de mixed conditionals, tercer condicional y vocabulario de psicología con reading, audios y práctica resuelta.",
        "intro": """La **Unidad 46** relaciona **Mixed Conditionals** con **Psychology & Human Behavior**. Aprenderás a conectar una decisión pasada con un resultado presente y un rasgo actual con una consecuencia pasada, sin mezclar tiempos al azar.

El vocabulario vivo incluye *psychology, behavior, cognition, emotions, mental health, personality, self-awareness, anxiety, empathy, stress* y *coping strategies*. La guía reproduce las decisiones de grammar, vocabulary, reading, listening y writing del curso.""",
        "before": "[U45 — Modal Deduction + Space](/blog/curso-b2/unidad-45-modal-deduction-space)",
        "learn": [
            "Construir condiciones pasadas con resultados presentes",
            "Construir estados presentes con resultados pasados",
            "Distinguir mixed y third conditional",
            "Graduar consecuencias con *would, could* y *might*",
            "Usar vocabulario psicológico con precisión y cautela",
        ],
        "sections": U46_SECTIONS,
        "tip": "Dibuja dos puntos temporales antes de conjugar. Decide dónde ocurre la condición y dónde el resultado; después asigna el bloque completo a cada lado.",
        "summary": """| Relación | Forma |
| :--- | :--- |
| pasado → presente | **if + had + V3, would + base** |
| pasado → presente en curso | **if + had + V3, would be + -ing** |
| presente → pasado | **if + past/were, would have + V3** |
| pasado → pasado | **if + had + V3, would have + V3** |
| posibilidad | **could/might** en el resultado |""",
        "next": """Continúa con la **Unidad 47**, donde las cleft sentences organizan el foco de ensayos e informes.

- [Ejercicios U46 con soluciones](/blog/curso-b2/unidad-46-mixed-conditionals-psychology-ejercicios-soluciones)
- [Unidad 46 del curso](/curso-b2/unit-46)
- [U47 teoría: Cleft Sentences + Academic Writing](/blog/curso-b2/unidad-47-cleft-sentences-academic-writing)""",
        "guides": [
            "[U45 Modal Deduction + Space](/blog/curso-b2/unidad-45-modal-deduction-space)",
            "[U47 Cleft Sentences + Academic Writing](/blog/curso-b2/unidad-47-cleft-sentences-academic-writing)",
            "[Inglés B2](/blog/metodos/ingles-b2)",
        ],
        "sources": COMMON_SOURCES,
    },
    {
        "unit": 47,
        "slug": "unidad-47-cleft-sentences-academic-writing",
        "title": "Cleft Sentences B2: Escritura Académica e Informes",
        "description": "Aprende It was... who/that y What... is/was para dar foco B2 con escritura académica, audio y ejercicios resueltos.",
        "keywords": [
            "cleft sentences B2 ejercicios",
            "it was who that inglés B2",
            "what cleft what I need is",
            "oraciones hendidas inglés",
            "vocabulario academic writing reports",
            "inglés B2 unidad 47",
        ],
        "image": "/blog/curso-b2/unit-47/cleft-sentences-map.png",
        "alt": "Cleft sentences B2 en escritura académica e informes",
        "related": [
            "unidad-47-cleft-sentences-academic-writing-ejercicios-soluciones",
            "unidad-46-mixed-conditionals-psychology",
            "unidad-48-reporting-verbs-teaching",
            "ingles-b2",
        ],
        "faqs": [
            ("¿Qué es una cleft sentence?", "Una estructura que divide el mensaje para destacar una persona, cosa, tiempo, razón o idea."),
            ("¿Cuándo uso who y that?", "En U47, **who** enfoca personas y **that** cosas o circunstancias: *It was Ana who...; it was the draft that...*."),
            ("¿Cómo se forma una what-cleft?", "Con **What + clause + be + focus**: *What the report shows is significant progress*."),
            ("¿Una cleft cambia el hecho comunicado?", "No necesariamente. Conserva el contenido básico, pero cambia el foco y el contraste informativo."),
            ("¿Dónde practico la Unidad 47?", "En la [Unidad 47 del curso B2](/curso-b2/unit-47) y el [cuaderno con soluciones](/blog/curso-b2/unidad-47-cleft-sentences-academic-writing-ejercicios-soluciones)."),
        ],
        "excerpt": "Guía B2 de it-clefts y what-clefts con estructura de informes, citas, reading, audios y práctica resuelta.",
        "intro": """La **Unidad 47** aplica **Cleft Sentences** a **Academic Writing & Reports**. *It was the students who asked; it was the introduction that needed revision; what matters most is evidence* permiten dirigir la atención sin cambiar el hecho central.

El léxico activo incluye *essay, report, structure, argumentation, formal register, evidence, outline, draft, cite, paraphrase, thesis statement* y *bibliography*. La explicación sigue las cinco lecciones vivas.""",
        "before": "[U46 — Mixed Conditionals + Psychology](/blog/curso-b2/unidad-46-mixed-conditionals-psychology)",
        "learn": [
            "Crear it-clefts para personas, cosas y circunstancias",
            "Crear what-clefts con sustantivos, acciones y cláusulas",
            "Mantener concordancia y tiempos",
            "Elegir foco según el contraste informativo",
            "Organizar y documentar escritura académica",
        ],
        "sections": U47_SECTIONS,
        "tip": "Escribe primero la oración neutra y formula la pregunta implícita. La respuesta que quieres contrastar es el foco de la cleft.",
        "summary": """| Foco | Forma |
| :--- | :--- |
| persona | **It is/was + person + who + clause** |
| cosa | **It is/was + thing + that + clause** |
| tiempo/razón | **It was + focus + that + clause** |
| idea o resultado | **What + clause + is/was + focus** |
| demora | **It wasn't until... that...** |""",
        "next": """Continúa con la **Unidad 48**, dedicada a reporting verbs e innovación educativa.

- [Ejercicios U47 con soluciones](/blog/curso-b2/unidad-47-cleft-sentences-academic-writing-ejercicios-soluciones)
- [Unidad 47 del curso](/curso-b2/unit-47)
- [U48 teoría: Reporting Verbs + Teaching](/blog/curso-b2/unidad-48-reporting-verbs-teaching)""",
        "guides": [
            "[U46 Mixed Conditionals + Psychology](/blog/curso-b2/unidad-46-mixed-conditionals-psychology)",
            "[U48 Reporting Verbs + Teaching](/blog/curso-b2/unidad-48-reporting-verbs-teaching)",
            "[Inglés B2](/blog/metodos/ingles-b2)",
        ],
        "sources": COMMON_SOURCES,
    },
    {
        "unit": 48,
        "slug": "unidad-48-reporting-verbs-teaching",
        "title": "Reporting Verbs B2: Innovación en la Enseñanza",
        "description": "Domina suggest, recommend, insist y urge con gerundio, that-clause y objeto + infinitivo, EdTech, audio y ejercicios.",
        "keywords": [
            "reporting verbs B2 ejercicios",
            "suggest recommend insist gerund that",
            "urge someone to do inglés",
            "verbos de reporte inglés B2",
            "vocabulario EdTech flipped classroom",
            "inglés B2 unidad 48",
        ],
        "image": "/blog/curso-b2/unit-48/reporting-verbs-map.png",
        "alt": "Reporting verbs B2 con innovación en la enseñanza",
        "related": [
            "unidad-48-reporting-verbs-teaching-ejercicios-soluciones",
            "unidad-47-cleft-sentences-academic-writing",
            "unidad-49-inversion-sociology",
            "ingles-b2",
        ],
        "faqs": [
            ("¿Qué forma sigue a suggest y recommend?", "Pueden llevar **-ing** o **that + subject + base**: *suggest using; recommend that teachers attend*."),
            ("¿Cómo se construye insist?", "Con **insist on + -ing** o **insist that + subject + base**."),
            ("¿Qué estructura usa urge?", "**Urge + person/object + to + base**: *The advisor urged students to attend*."),
            ("¿Por qué se dice recommend that he attend?", "La cláusula mandativa usa forma base sin *-s* en el modelo de la unidad."),
            ("¿Dónde practico la Unidad 48?", "En la [Unidad 48 del curso B2](/curso-b2/unit-48) y el [cuaderno con soluciones](/blog/curso-b2/unidad-48-reporting-verbs-teaching-ejercicios-soluciones)."),
        ],
        "excerpt": "Guía B2 de reporting verbs y sus complementos con EdTech, flipped classroom, reading, audio y práctica.",
        "intro": """La **Unidad 48** conecta **Reporting Verbs** con **Innovation in Teaching**. *Suggest/recommend + -ing*, *suggest/recommend/insist + that* y *urge + person + to* permiten atribuir propuestas con distinta fuerza.

El vocabulario incluye *EdTech, pedagogy, student engagement, assessment, e-learning, MOOC, hands-on learning, gamification, flipped classroom* y *formative feedback*. Todos los ejemplos se alinean con grammar, vocabulary, reading, listening y writing activos.""",
        "before": "[U47 — Cleft Sentences + Academic Writing](/blog/curso-b2/unidad-47-cleft-sentences-academic-writing)",
        "learn": [
            "Usar suggest y recommend con gerundio o that-clause",
            "Construir insist on e insist that",
            "Construir urge + objeto + infinitivo",
            "Distinguir propuesta, recomendación e insistencia",
            "Evaluar innovación educativa con léxico preciso",
        ],
        "sections": U48_SECTIONS,
        "tip": "Memoriza verbo y complemento juntos. Antes de conjugar, decide si nombras a quien actúa y qué fuerza tiene la propuesta.",
        "summary": """| Verbo | Complemento |
| :--- | :--- |
| suggest | **-ing / that + subject + base** |
| recommend | **-ing / that + subject + base** |
| insist | **on + -ing / that + subject + base** |
| urge | **person + to + base** |
| negativa mandativa | **that + subject + not + base** |""",
        "next": """Continúa con la **Unidad 49**, donde expresiones negativas y restrictivas provocan inversión enfática.

- [Ejercicios U48 con soluciones](/blog/curso-b2/unidad-48-reporting-verbs-teaching-ejercicios-soluciones)
- [Unidad 48 del curso](/curso-b2/unit-48)
- [U49 teoría: Inversion + Sociology](/blog/curso-b2/unidad-49-inversion-sociology)""",
        "guides": [
            "[U47 Cleft Sentences + Academic Writing](/blog/curso-b2/unidad-47-cleft-sentences-academic-writing)",
            "[U49 Inversion + Sociology](/blog/curso-b2/unidad-49-inversion-sociology)",
            "[Inglés B2](/blog/metodos/ingles-b2)",
        ],
        "sources": COMMON_SOURCES,
    },
    {
        "unit": 49,
        "slug": "unidad-49-inversion-sociology",
        "title": "Inversion for Emphasis B2: Sociología y Cultura",
        "description": "Aprende inversión con Never, Only, Not only, Hardly y No sooner B2 con sociología, audio, vocabulario y ejercicios.",
        "keywords": [
            "inversion for emphasis B2 ejercicios",
            "never have I only then did",
            "not only inversion inglés",
            "hardly when no sooner than",
            "vocabulario sociología globalisation",
            "inglés B2 unidad 49",
        ],
        "image": "/blog/curso-b2/unit-49/inversion-map.png",
        "alt": "Inversión enfática B2 con sociología y cambios culturales",
        "related": [
            "unidad-49-inversion-sociology-ejercicios-soluciones",
            "unidad-48-reporting-verbs-teaching",
            "unidad-50-repaso-41-49",
            "ingles-b2",
        ],
        "faqs": [
            ("¿Qué se invierte después de Never o Seldom?", "El auxiliar y el sujeto: *Never have I seen; seldom do we witness*."),
            ("¿Dónde ocurre la inversión con Only when?", "En la cláusula principal: *Only when the crisis hit did we understand*."),
            ("¿Qué parejas forman Hardly y No sooner?", "**Hardly/Scarcely... when** y **No sooner... than**."),
            ("¿Only siempre provoca inversión?", "No. No se invierte cuando modifica el sujeto: *Only researchers understood*."),
            ("¿Dónde practico la Unidad 49?", "En la [Unidad 49 del curso B2](/curso-b2/unit-49) y el [cuaderno con soluciones](/blog/curso-b2/unidad-49-inversion-sociology-ejercicios-soluciones)."),
        ],
        "excerpt": "Guía B2 de inversión enfática con auxiliares, only, pares temporales y vocabulario de sociología.",
        "intro": """La **Unidad 49** aplica **Inversion for Emphasis** a **Sociology & Cultural Shifts**. Expresiones como *never, seldom, only then, not only, under no circumstances, hardly* y *no sooner* adelantan el auxiliar para crear énfasis formal.

El vocabulario vivo incluye *sociology, culture, society, trends, demographics, social change, identity, migration, diversity, modernisation, urbanisation* y *globalisation*.""",
        "before": "[U48 — Reporting Verbs + Teaching](/blog/curso-b2/unidad-48-reporting-verbs-teaching)",
        "learn": [
            "Invertir auxiliar y sujeto tras expresiones negativas",
            "Añadir do, does o did cuando sea necesario",
            "Controlar only, not only y not until",
            "Construir hardly/scarcely...when y no sooner...than",
            "Analizar cambios sociales con vocabulario preciso",
        ],
        "sections": U49_SECTIONS,
        "tip": "Vuelve primero a la oración neutra. Localiza el auxiliar; si no existe, crea *do/does/did*. Después mueve solo el auxiliar delante del sujeto.",
        "summary": """| Inicio enfático | Orden |
| :--- | :--- |
| never / seldom / rarely | **auxiliary + subject + verb** |
| only then/when/by | **auxiliary + subject + verb** en principal |
| not only | inversión en primera cláusula |
| under no circumstances | **modal/auxiliary + subject** |
| hardly/scarcely | **had + subject + V3 + when** |
| no sooner | **had + subject + V3 + than** |""",
        "next": """Consolida todo el bloque en la **Unidad 50**, repaso de U41–49.

- [Ejercicios U49 con soluciones](/blog/curso-b2/unidad-49-inversion-sociology-ejercicios-soluciones)
- [Unidad 49 del curso](/curso-b2/unit-49)
- [U50 teoría: Repaso 41–49](/blog/curso-b2/unidad-50-repaso-41-49)""",
        "guides": [
            "[U48 Reporting Verbs + Teaching](/blog/curso-b2/unidad-48-reporting-verbs-teaching)",
            "[U50 Repaso 41–49](/blog/curso-b2/unidad-50-repaso-41-49)",
            "[Inglés B2](/blog/metodos/ingles-b2)",
        ],
        "sources": COMMON_SOURCES,
    },
    {
        "unit": 50,
        "slug": "unidad-50-repaso-41-49",
        "title": "Repaso B2 Unidades 41–49: Gramática y Vocabulario",
        "description": "Repasa U41–49 B2: verb patterns, passive reporting, modals, Future Perfect, deduction, conditionals, clefts, reporting verbs e inversión.",
        "keywords": [
            "repaso inglés B2 unidades 41 49",
            "gramática B2 ejercicios mixtos",
            "future perfect mixed conditionals cleft",
            "reporting verbs inversion repaso",
            "vocabulario educación psicología sociología B2",
            "inglés B2 unidad 50",
        ],
        "image": "/blog/curso-b2/unit-50/review-41-49-map.png",
        "alt": "Repaso B2 de gramática y vocabulario de las unidades 41 a 49",
        "related": [
            "unidad-50-repaso-41-49-ejercicios-soluciones",
            "unidad-49-inversion-sociology",
            "unidad-46-mixed-conditionals-psychology",
            "ingles-b2",
        ],
        "faqs": [
            ("¿Qué gramática repasa la Unidad 50?", "Integra U41–49; la lección viva enfatiza Future Perfect, deducción modal, mixed conditionals, clefts, reporting verbs e inversión."),
            ("¿Cómo identifico la estructura correcta?", "Busca primero la pista de función: verbo controlador, atribución, regla, límite, evidencia, relación temporal, foco o expresión negativa frontal."),
            ("¿También se repasa vocabulario?", "Sí. Reúne educación, ciencia, universidad, salud, espacio, psicología, escritura académica, EdTech y sociología."),
            ("¿Conviene memorizar las respuestas?", "No. Clasifica, recupera la forma, explica la pista y transfiérela a un ejemplo nuevo."),
            ("¿Dónde practico la Unidad 50?", "En la [Unidad 50 del curso B2](/curso-b2/unit-50) y el [cuaderno con soluciones](/blog/curso-b2/unidad-50-repaso-41-49-ejercicios-soluciones)."),
        ],
        "excerpt": "Repaso completo B2 de U41–49 con mapa de decisiones, vocabulario mixto, reading, ocho audios y ejercicios.",
        "intro": """La **Unidad 50** consolida la gramática y el vocabulario de **U41–49**. Su lección viva combina Future Perfect, modal deduction, mixed conditionals, cleft sentences, reporting verbs e inversion; esta guía también recupera los patrones, el passive reporting y los modales de U41–43.

El repaso conecta educación, investigación, universidad, salud, espacio, psicología, escritura académica, innovación docente y sociología. La meta es cambiar de estructura por significado sin perder forma ni precisión léxica.""",
        "before": "[U49 — Inversion + Sociology](/blog/curso-b2/unidad-49-inversion-sociology)",
        "learn": [
            "Clasificar nueve familias gramaticales por función",
            "Mantener auxiliares, participios y complementos",
            "Distinguir formas cercanas con significado diferente",
            "Conectar vocabulario de nueve áreas",
            "Producir un texto integrado y revisar con diagnóstico",
        ],
        "sections": U50_SECTIONS,
        "tip": "No empieces por el hueco. Lee la oración completa, nombra la función y la pista, recupera el patrón y solo entonces comprueba la forma.",
        "summary": """| U | Núcleo |
| :--- | :--- |
| 41–43 | **verb patterns · passive reporting · obligation/advice** |
| 44–46 | **Future Perfect · modal deduction · mixed conditionals** |
| 47–49 | **cleft sentences · reporting verbs · inversion** |
| estrategia | **función → pista → patrón → revisión** |""",
        "next": """Has completado el repaso U41–49. Continúa con la **Unidad 51 del curso B2** y conserva un repaso espaciado del bloque.

- [Ejercicios U50 con soluciones](/blog/curso-b2/unidad-50-repaso-41-49-ejercicios-soluciones)
- [Unidad 50 del curso](/curso-b2/unit-50)
- [Continuar con Unidad 51](/curso-b2/unit-51)""",
        "guides": [
            "[U49 Inversion + Sociology](/blog/curso-b2/unidad-49-inversion-sociology)",
            "[U46 Mixed Conditionals + Psychology](/blog/curso-b2/unidad-46-mixed-conditionals-psychology)",
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
