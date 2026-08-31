#!/usr/bin/env python3
"""Generate B2 theory U31–35: diagrams, markdown and English TTS audio.

The content mirrors the live grammar and vocabulary lessons in
src/lib/course/b2/unit-{31..35}-lesson-{1,2}-*.ts.  It covers advanced
articles and education, quantifiers and the environment, verb patterns
with regret/remember/forget and feelings, state verbs and technology,
then an integrated review.
"""
from __future__ import annotations

import re
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT_MD = ROOT / "src/content/blog/curso-b2"
DATE = "2026-08-31"
BG = (245, 248, 252)
INK = (20, 35, 55)
ACCENT = (22, 111, 143)
ACCENT_2 = (108, 69, 161)
CARD = (255, 255, 255)
LINE = (199, 215, 229)
LEVEL_KW = ["curso inglés B2 gratis", "ejercicios inglés B2 gratis"]
HUB = "ingles-b2"


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


def title(draw, text: str, y: int = 36):
    draw.text((48, y), text, fill=INK, font=font(34, True))


def wrapped(
    draw,
    text: str,
    xy: tuple[int, int],
    width: int,
    size: int = 18,
    bold: bool = False,
    fill=INK,
):
    draw.multiline_text(
        xy,
        textwrap.fill(text, width=width),
        fill=fill,
        font=font(size, bold),
        spacing=8,
    )


def save(image, unit: int, name: str):
    path = ROOT / f"public/blog/curso-b2/unit-{unit}" / name
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "PNG", optimize=True)
    print("img", path.relative_to(ROOT))


def four_map(
    unit: int,
    name: str,
    heading: str,
    blocks: list[tuple[str, str, str]],
):
    image, draw = canvas()
    title(draw, heading)
    for index, (label, rule, example) in enumerate(blocks[:4]):
        column, row = index % 2, index // 2
        x, y = 48 + column * 570, 108 + row * 255
        card(draw, (x, y, x + 530, y + 225))
        draw.text((x + 22, y + 22), label, fill=ACCENT, font=font(24, True))
        wrapped(draw, rule, (x + 22, y + 72), 44, 18, True)
        wrapped(draw, example, (x + 22, y + 140), 48, 17)
    save(image, unit, name)


def vocab_grid(unit: int, name: str, heading: str, words: list[str]):
    image, draw = canvas()
    title(draw, heading)
    for index, word in enumerate(words[:12]):
        x = 48 + (index % 4) * 280
        y = 110 + (index // 4) * 170
        card(draw, (x, y, x + 250, y + 140))
        wrapped(draw, word, (x + 16, y + 43), 18, 18, True)
    save(image, unit, name)


def scene(unit: int, name: str, heading: str, examples: list[str]):
    image, draw = canvas()
    title(draw, heading)
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
    save(image, unit, name)


def diagrams() -> None:
    four_map(
        31,
        "articles-map.png",
        "Articles B2 · a/an · the · zero article",
        [
            ("A / AN", "one non-specific singular; professions", "She is an expert and has a degree."),
            ("THE", "specific, identified, unique or ordinal", "The exam is on the first Monday."),
            ("ZERO", "general plurals and abstract ideas", "Students need access to research."),
            ("INSTITUTIONS", "purpose contrasts with a specific building", "at university · visit the hospital"),
        ],
    )
    vocab_grid(
        31,
        "education-vocabulary.png",
        "Education extended · key chunks",
        [
            "degree · major",
            "semester · enrol",
            "dissertation",
            "tutorial",
            "obtain a degree",
            "meet a deadline",
            "distinction",
            "drop out",
            "supervisor",
            "conduct research",
            "gap year",
            "reading list",
        ],
    )
    scene(
        31,
        "campus-context.png",
        "Articles and education in context",
        [
            "Maya is a professor at the Faculty of Engineering.",
            "Students attend classes and conduct research.",
            "She went to the hospital to visit a student.",
            "The tutorial is in the library this afternoon.",
            "Every learner hopes to obtain a degree with distinction.",
        ],
    )

    four_map(
        32,
        "quantifiers-map.png",
        "Quantifiers B2 · total, majority and individuals",
        [
            ("ALL", "100% of a group; all (of) the + plural/uncountable", "All species are protected."),
            ("MOST", "a majority; most + noun / most of the + noun", "Most of the forests are at risk."),
            ("EACH / EVERY", "singular noun and verb; individual vs whole set", "Each panel works. Every year matters."),
            ("BOTH", "exactly two people or things", "Both wind and solar are renewable."),
        ],
    )
    vocab_grid(
        32,
        "environment-vocabulary.png",
        "Environment extended · key chunks",
        [
            "biodiversity",
            "greenhouse gases",
            "conserve resources",
            "global warming",
            "pose a threat",
            "raise awareness",
            "extinct species",
            "deforestation",
            "strike a balance",
            "potable water",
            "renewable energy",
            "nature reserve",
        ],
    )
    scene(
        32,
        "environment-context.png",
        "Quantifiers in an environmental report",
        [
            "All of the sensors record air quality.",
            "Most of the plastic comes from land sources.",
            "Each volunteer receives a reusable bottle.",
            "Every three hours, the team checks the river.",
            "Both organisations take responsibility for the reserve.",
        ],
    )

    four_map(
        33,
        "verb-patterns-map.png",
        "Regret · remember · forget + -ing / to-infinitive",
        [
            ("REGRET + -ING", "feel sorry about an earlier action", "She regrets hurting her friend."),
            ("REGRET + TO", "introduce bad news now, often formally", "We regret to inform you..."),
            ("REMEMBER", "-ing = memory; to-infinitive = required action", "I remember meeting her. Remember to call."),
            ("FORGET", "-ing = lost memory; to-infinitive = action not done", "I'll never forget visiting. I forgot to send it."),
        ],
    )
    vocab_grid(
        33,
        "feelings-vocabulary.png",
        "Feelings extended · key language",
        [
            "overjoyed",
            "grief",
            "bear a grudge",
            "anxious",
            "lose your temper",
            "relieved",
            "express feelings",
            "frustrated",
            "grateful",
            "resentful",
            "devastated",
            "bottle up feelings",
        ],
    )
    scene(
        33,
        "memory-context.png",
        "Memory, duties and feelings",
        [
            "I remember feeling anxious before the interview.",
            "I remembered to send a grateful reply afterwards.",
            "She regrets not apologising sooner.",
            "We regret to inform you that the event is cancelled.",
            "He will never forget feeling overjoyed at the result.",
        ],
    )

    four_map(
        34,
        "state-verbs-map.png",
        "State verbs B2 · use the simple form",
        [
            ("FEELING / PREFERENCE", "like · love · hate · prefer · want", "I prefer this app; I don't want an upgrade."),
            ("KNOWLEDGE", "know · understand · remember · recognise", "She knows how to code."),
            ("OPINION", "believe · hope · value", "We believe privacy is important."),
            ("NEED", "needs and states are not unfolding actions", "The software needs an update."),
        ],
    )
    vocab_grid(
        34,
        "technology-vocabulary.png",
        "Technology extended · key language",
        [
            "antivirus",
            "upload data",
            "software bug",
            "update software",
            "cloud storage",
            "set a password",
            "wireless",
            "save a file",
            "AI",
            "encrypt data",
            "launch an app",
            "backup",
        ],
    )
    scene(
        34,
        "technology-context.png",
        "State verbs in a technology project",
        [
            "We believe the app needs an update.",
            "Mina knows the password and understands the warning.",
            "I value data privacy and prefer encrypted backups.",
            "The developers want to fix the bug before launch.",
            "Users love the feature but hate the complicated interface.",
        ],
    )

    four_map(
        35,
        "review-map.png",
        "Repaso B2 · Unidades 31–34",
        [
            ("U31", "a/an · the · zero article", "Education"),
            ("U32", "all · most · each · every · both", "Environment"),
            ("U33", "regret · remember · forget + -ing / to", "Feelings"),
            ("U34", "state verbs in simple forms", "Technology"),
        ],
    )
    vocab_grid(
        35,
        "review-vocabulary.png",
        "Four fields · one B2 review",
        [
            "degree",
            "meet a deadline",
            "conduct research",
            "biodiversity",
            "renewable energy",
            "raise awareness",
            "anxious",
            "grateful",
            "bottle up feelings",
            "cloud storage",
            "encrypt",
            "debugging",
        ],
    )
    scene(
        35,
        "review-context.png",
        "A connected research project",
        [
            "All the students conduct research at university.",
            "Each team wants to raise awareness of biodiversity.",
            "Maya remembers uploading the data to cloud storage.",
            "Leo regrets not setting a stronger password.",
            "Both supervisors believe the project can have an impact.",
        ],
    )


AUDIOS = {
    31: {
        "a-an": "She is a professor. She is an expert. She has a degree in economics.",
        "the-specific": "The students are in the library. The exam is on the first Monday of the month.",
        "zero-institutions": "She is at university. The children go to school. He is in prison.",
        "zero-general": "Students attend classes. Education matters. Researchers need access to information.",
        "education-vocabulary": (
            "Degree. Major. Semester. Enrol. Dissertation. Tutorial. Obtain a degree. Meet a deadline. "
            "Distinction. Drop out. Supervisor. Conduct research. Gap year. Reading list. Graduation."
        ),
        "reading-u31": (
            "Nora took a gap year before going to university. She then enrolled in a degree in environmental "
            "engineering. During the first semester, a supervisor helped her choose a major and prepare a reading "
            "list. Nora attended lectures, conducted research, and always met her deadlines. In the final year, "
            "she wrote a dissertation and obtained the degree with distinction. The graduation ceremony was held "
            "at the university library."
        ),
        "dialogue-u31": (
            "Are you at university now? Yes, I am a first-year student. What is your major? Environmental science. "
            "Do you attend lectures every day? Most days, and I have a tutorial on Fridays. Who guides your research? "
            "A supervisor from the Faculty of Science. Do you have a deadline? Yes, the assignment is due on Monday."
        ),
        "practice-u31": (
            "A professor. An expert. The library. The first semester. At university. Attend classes. "
            "Obtain a degree. Meet a deadline. Conduct research."
        ),
    },
    32: {
        "all-most": "All species need a habitat. Most of the forests in this area are under threat.",
        "each-every": "Each solar panel produces energy. Every participant brings a bottle. We measure the air every three hours.",
        "both": "Both governments signed the agreement. Wind and solar are both renewable energy sources.",
        "of-patterns": "All the volunteers. All of the volunteers. Most people. Most of the people in this reserve.",
        "environment-vocabulary": (
            "Biodiversity. Greenhouse gases. Conserve resources. Global warming. Pose a threat. Raise awareness. "
            "Extinct. Deforestation. Strike a balance. Potable water. Habitat. Renewable energy. Pollutants."
        ),
        "reading-u32": (
            "Both local organisations work in the same nature reserve. All the volunteers raise awareness of "
            "biodiversity, and each volunteer monitors one habitat. Most of the water is potable, but pollutants "
            "still pose a threat to two rivers. Every three hours, sensors record water quality. Most residents "
            "support renewable energy, and both councils have agreed to take responsibility for conservation."
        ),
        "dialogue-u32": (
            "Are all the habitats protected? Most of them are. Does each volunteer inspect the whole reserve? "
            "No, each person monitors one area. How often do the sensors report? Every three hours. "
            "Did both councils sign the plan? Yes, and all of the organisations now work together."
        ),
        "practice-u32": (
            "All means one hundred percent. Most means a majority. Each focuses on individuals. "
            "Every views all members of a set. Both refers to exactly two."
        ),
    },
    33: {
        "regret": "I regret hurting my friend. We regret to inform you that the event is cancelled.",
        "remember": "I remember meeting her last year. Remember to lock the door when you leave.",
        "forget": "I forgot to send the attachment. I will never forget visiting Paris for the first time.",
        "negative-patterns": "He regrets not studying harder. I do not remember saying that. Do not forget to reply.",
        "feelings-vocabulary": (
            "Overjoyed. Grief. Bear a grudge. Anxious. Lose your temper. Relieved. Express your feelings. "
            "Frustrated. Grateful. Resentful. Devastated. Jealous. Ashamed. Bottle up your feelings."
        ),
        "reading-u33": (
            "I remember feeling anxious before a difficult interview. My sister reminded me not to bottle up my "
            "feelings, but I regret ignoring her advice. I forgot to attach one document, yet the interviewer let "
            "me send it later. I remembered to thank everyone and felt relieved when the result arrived. I will "
            "never forget reading the message: I was overjoyed. I only regret not trusting myself sooner."
        ),
        "dialogue-u33": (
            "Do you remember attending the interview? Very clearly. Did you remember to send the documents? "
            "I forgot to attach one, unfortunately. Do you regret making that mistake? Yes, but they accepted it later. "
            "How did you feel? Relieved, grateful, and finally overjoyed."
        ),
        "practice-u33": (
            "Regret doing: an earlier action. Regret to say: bad news now. Remember doing: a memory. "
            "Remember to do: do not forget the task. Forget doing: lose the memory. Forget to do: the action did not happen."
        ),
    },
    34: {
        "core-states": "I like this app. She knows Python. We believe the system will work. He wants a new laptop.",
        "knowledge-states": "I understand the warning. She remembers the password. They recognise the security risk.",
        "preference-states": "Users love the feature, hate the adverts, and prefer the simpler interface.",
        "need-value": "The software needs an update. We value your opinion and believe data privacy is important.",
        "technology-vocabulary": (
            "Antivirus. Upload. Bug. Update. Cloud storage. Set a password. Wireless. Save a file. "
            "Artificial intelligence. Encrypt. Programmer. Launch an app. Backup. Debugging. Data breach. Deploy."
        ),
        "reading-u34": (
            "Mina is a programmer who knows how to debug mobile apps. She believes a new security feature is "
            "necessary because users value data privacy. The software needs an update, and the team wants to deploy "
            "it before Friday. Mina understands the risk of a data breach and prefers encrypted cloud storage. "
            "She loves the clean interface but hates one recurring bug. Everyone hopes the launch will succeed."
        ),
        "dialogue-u34": (
            "Do you understand the error message? Yes, I believe the app needs an update. Do you know the password? "
            "I remember it, but I prefer to set a new one. Why? I value security, and I want to encrypt the backup. "
            "Do users like the app? They love the interface but hate the bug."
        ),
        "practice-u34": (
            "Like, know, believe, want, understand, prefer, remember, hate, hope, need, value, recognise, love. "
            "Use simple forms when these verbs describe a state."
        ),
    },
    35: {
        "review-u31": "A degree. The university library. At university. Students attend classes.",
        "review-u32": "All, most, each, every, both. Most of the water. Each participant. Both organisations.",
        "review-u33": "I regret saying it. I regret to inform you. I remember meeting her. Remember to reply.",
        "review-u34": "I know, understand, believe, want, need, prefer, value, remember, and recognise.",
        "mixed-review": (
            "All the students are at university. Each team wants to conduct research. "
            "Maya remembers uploading the data. Leo regrets not encrypting the backup."
        ),
        "reading-u35": (
            "At university, all the students joined an environmental technology project. Each group chose a habitat, "
            "and both supervisors helped them conduct research. Most of the teams used cloud storage, but one student "
            "forgot to encrypt a backup. He regrets making that mistake and remembers feeling anxious after the warning. "
            "The supervisors believe the project still has value, and every team wants to raise awareness of biodiversity."
        ),
        "dialogue-u35": (
            "Are all the students at university? Yes, and each team has a supervisor. What do they study? "
            "Most of the projects examine biodiversity. Do they remember to save their files? Usually, but one student "
            "forgot to encrypt a backup. Does he regret it? Yes, and now both supervisors believe security needs more attention."
        ),
        "practice-u35": (
            "Choose the article, identify the quantity, check whether the action is remembered or pending, "
            "and use a simple form for a state verb."
        ),
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


def write_md(name: str, body: str) -> None:
    path = OUT_MD / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(body if body.endswith("\n") else body + "\n", encoding="utf-8")
    print("md", path.relative_to(ROOT))


def article(**kw) -> str:
    keywords = "\n".join(f"  - {keyword}" for keyword in kw["keywords"] + LEVEL_KW)
    related = "\n".join(f"  - {route}" for route in kw["related"])
    faq_yaml = "\n".join(
        f"  - question: {question}\n    answer: >-\n      {answer}"
        for question, answer in kw["faqs"]
    )
    learn = "\n".join(f"- {item}" for item in kw["learn"])
    guides = "\n".join(f"- {guide}" for guide in kw["guides"])
    faq_body = "\n\n".join(
        f"### {question}\n\n{answer}" for question, answer in kw["faqs"]
    )
    return f"""---
category: curso-b2
date: '{DATE}'
updatedDate: '{DATE}'
author: linguafly-team
title: "{kw["title"]}"
description: >-
  {kw["description"]}
readTime: {kw.get("readTime", "28 min")}
keywords:
{keywords}
canonical: 'https://linguafly.app/blog/curso-b2/{kw["slug"]}'
image: {kw["image"]}
alt: "{kw["alt"]}"
related_routes:
{related}
faqs:
{faq_yaml}
excerpt: >-
  {kw["excerpt"]}
---
{kw["intro"]}

> **Practica en el curso:** [Unidad {kw["unit"]}](/curso-b2/unit-{kw["unit"]})<br>
> **Cuaderno de ejercicios:** [Unidad {kw["unit"]} con soluciones](/blog/curso-b2/{kw["slug"]}-ejercicios-soluciones)<br>
> **Antes:** {kw["before"]}

---

## Qué aprenderás

{learn}

![{kw["alt"]}]({kw["image"]})

---

{kw["sections"]}

---

## Tip del profesor

{kw["tip"]}

---

## Resumen rápido

{kw["summary"]}

---

## Siguiente paso en el curso B2

{kw["next_block"]}

### Guías relacionadas

{guides}

---

## Preguntas frecuentes

{faq_body}

---

## Fuentes

{kw["sources"]}
"""


def exercise_block(items: list[tuple[str, str]]) -> str:
    blocks = []
    for index, (question, answer) in enumerate(items, 1):
        blocks.append(
            f"""### Ejercicio {index}

{question}

<details><summary>Ver solución</summary>

{answer}
</details>"""
        )
    return "\n\n".join(blocks)


def learning_lab(
    unit: int,
    theme: str,
    targets: str,
    contrasts: str,
    production: str,
) -> str:
    """Long-form study guidance, personalised to each unit."""
    return f"""## 9. Del reconocimiento al uso activo

Reconocer una respuesta cuando ves tres opciones no significa que puedas producirla. El objetivo B2 es recuperar **{targets}** sin que una lista te dé la primera letra. Trabaja en tres vueltas. En la primera, lee cada ejemplo y explica qué pista obliga a elegir esa forma. En la segunda, tapa la respuesta y reconstruye la frase completa. En la tercera, cambia sujeto, tiempo, cantidad y un detalle del contexto de **{theme}**. Si la regla sigue funcionando después de transformar el ejemplo, has aprendido un patrón y no una oración congelada.

La comparación directa es esencial. Coloca juntas las decisiones que compiten: **{contrasts}**. Escribe un ejemplo correcto con cada alternativa y otro deliberadamente incorrecto. Luego corrige el error con una explicación breve: identifica significado, estructura y concordancia. Decir solo «suena mejor» no basta; una regla que puedes verbalizar se recupera con más facilidad cuando hablas o escribes bajo presión.

No estudies palabras aisladas si el uso natural exige un bloque. Guarda *at university*, *most of the water*, *regret doing*, *remember to do* o *believe that* con una escena concreta. En vocabulario, registra colocaciones completas como *meet a deadline, raise awareness, bear a grudge* o *set a password*. La traducción puede servir de apoyo inicial, pero la tarjeta útil pregunta por una intención comunicativa y responde con un ejemplo inglés completo.

El audio ofrece una comprobación adicional. Escucha primero sin leer y apunta solo los grupos que reconoces. En la segunda reproducción, sigue el texto y marca dónde se unen las palabras. Por último repite con una breve demora, sin detener el clip después de cada término. Esta práctica de *shadowing* ayuda a tratar la estructura como una unidad rítmica y evita pausas artificiales dentro del chunk.

Cuando aparezca un error, clasifícalo. Puede ser de **selección** —elegiste otra idea—, de **forma** —faltó artículo, preposición o terminación—, de **concordancia** —singular y plural no coinciden— o de **registro** —la opción existe, pero no corresponde a este uso. Escribe la corrección mínima y un ejemplo nuevo. Copiar diez veces la solución crea familiaridad visual; explicar y transferir el patrón crea control.

## 10. Rutina guiada de veinte minutos

Dedica cuatro minutos a escuchar los clips breves. Sin mirar, anota las formas que oyes; luego coteja ortografía y estructura. Usa seis minutos para recuperación escrita: dibuja tres columnas tituladas **intención**, **forma** y **ejemplo de {theme}**. Completa primero la intención y obliga a tu memoria a producir la forma. Marca con un asterisco lo que necesitó ayuda, porque ese material debe abrir la sesión siguiente.

Durante cinco minutos transforma frases. Pasa una afirmación a negativa, cambia presente por pasado cuando sea posible, sustituye un nombre específico por uno general y convierte una oración en pregunta. Comprueba que la transformación no rompe el patrón. Después combina dos objetivos con *although, because, whereas, so* o *as a result*. Integrar conectores conocidos evita que la gramática nueva quede aislada en ejemplos demasiado cortos.

Termina con cinco minutos de producción: **{production}**. Grábate o escribe sin consultar las tablas. Revisa con cuatro criterios: forma completa, elección justificable, vocabulario preciso y mensaje coherente. Si te corriges mientras hablas, utiliza *I mean...* y di la estructura completa; esa reparación también es competencia comunicativa. Es preferible una intervención breve y revisada que un discurso largo lleno de formas que no puedes explicar.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-{unit}/practice-u{unit}.mp3" title="🔊 Práctica guiada Unidad {unit}"></audio>

## 11. Autoevaluación y repaso espaciado

Haz tres pruebas sin mirar. Primera: define cada objetivo con palabras sencillas. Segunda: crea un ejemplo fuera del tema original para comprobar que el patrón es transferible. Tercera: vuelve al reading y explica por qué una alternativa cambiaría el significado o sería agramatical. Si fallas más de un tercio, no repitas todo: aísla la familia débil, estudia tres contrastes y vuelve a probarla al día siguiente.

Una respuesta sólida debe ser **completa, natural y razonada**. Completa significa que no falta artículo, preposición, terminación ni auxiliar. Natural significa que la combinación encaja en esa escena. Razonada significa que puedes señalar una pista: referencia específica, porcentaje, relación temporal, tipo de verbo o colocación. Estos criterios son más útiles que contar cuántas páginas has leído.

Usa esta lista antes de avanzar:

- [ ] Produzco las formas objetivo sin ver opciones.
- [ ] Explico al menos tres contrastes con una regla concreta.
- [ ] Mantengo artículos, complementos y concordancia al transformar frases.
- [ ] Entiendo el reading y el diálogo sin traducción palabra por palabra.
- [ ] Uso vocabulario real de **{theme}** en ejemplos propios.
- [ ] Corrijo mis errores creando una frase nueva.

Vuelve al material mañana, tres días después y una semana más tarde. Reduce el apoyo en cada sesión: primero tablas completas, luego palabras clave y finalmente solo una situación comunicativa. Esa distancia revela qué permanece disponible. Si una forma falla dos veces, colócala al principio del siguiente repaso y compárala con su rival más cercana."""


def body_word_count(markdown: str) -> int:
    body = markdown.split("---", 2)[2]
    return len(re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:['’][A-Za-z]+)?", body))


def write_checked(name: str, markdown: str) -> None:
    count = body_word_count(markdown)
    if count < 2000:
        raise ValueError(f"{name}: only {count} body words; minimum is 2000")
    write_md(name, markdown)
    print("words", name, count)


def build_u31() -> tuple[str, str]:
    slug = "unidad-31-articles-advanced-education"
    sections = r"""## 1. El artículo expresa cómo presentas el sustantivo

En B2, elegir entre **a/an, the y artículo cero (—)** no depende solo del nombre. Depende de cómo quieres que el oyente lo identifique. **A/an** presenta un miembro no identificado de una clase; **the** señala algo que ambos interlocutores pueden localizar; el artículo cero permite hablar de una idea general, una actividad institucional o un plural sin delimitar.

![Mapa de artículos avanzados B2](/blog/curso-b2/unit-31/articles-map.png)

Compara: *Lena is **a** professor* presenta profesión; *Lena is **the** professor who supervises my dissertation* identifica a una persona concreta; ***Professors** conduct research* habla de la categoría en general. El sustantivo *professor* no trae un artículo fijo: el mensaje decide.

Antes de completar un hueco, sigue tres preguntas. ¿El nombre singular es contable? Entonces necesita un determinante: quizá *a/an* o *the*. ¿La referencia ya está identificada por contexto, una frase posterior, un ordinal o conocimiento compartido? Elige *the*. ¿Hablas de plurales, ideas abstractas o una institución en su función habitual? Considera artículo cero.

---

## 2. A/an: un miembro, una profesión o una clasificación

| Uso | Ejemplo del campo educativo | Razón |
| :--- | :--- | :--- |
| profesión | She is **a professor**. | clasifica a una persona |
| sonido vocálico | She is **an expert** in linguistics. | *expert* comienza con sonido vocálico |
| singular contable | She has **a degree** in economics. | se presenta un título |
| clasificación | The university is **a centre of excellence**. | pertenece a esa categoría |
| expresión fija | She has **a good knowledge of** English. | *knowledge* se delimita con descripción |
| experiencia singular | She took **a gap year**. | un periodo no identificado antes |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-31/a-an.mp3" title="🔊 A/an en educación"></audio>

La elección entre **a** y **an** se basa en sonido, no en letra. *An expert* empieza con vocal audible; *a university* empieza con el sonido consonántico /j/, como «yu». Por eso decimos *a university, a European course* pero *an hour, an MBA student*. La regla ortográfica es una aproximación; pronuncia la palabra.

No omitas el artículo ante profesión singular: *She is professor* no es la forma estándar. Si el cargo es único y está identificado, puede aparecer *the*: *She is the professor responsible for admissions*. La frase posterior restringe la referencia. En cambio, *She is a professor at the Faculty of Engineering* solo nos dice a qué grupo profesional pertenece.

---

## 3. The: una referencia que puedes identificar

**The** no equivale automáticamente a «el/la». Su función es indicar que la referencia está delimitada. Puede haberse mencionado, ser evidente en la situación o quedar identificada por lo que sigue: *the exam we took yesterday, the library on campus, the future of education*. También aparece con ordinales: *the first Monday of the month*.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-31/the-specific.mp3" title="🔊 The con referencias específicas"></audio>

| Pista | Ejemplo | Qué identifica |
| :--- | :--- | :--- |
| contexto compartido | She passed **the exam**. | ambos saben qué examen |
| complemento | **the future of education** | *of education* delimita |
| lugar concreto | The students are in **the library**. | biblioteca local conocida |
| tiempo concreto | homework for **the weekend** | fin de semana relevante |
| ordinal | on **the first Monday** | posición única |
| nombre geográfico | **the UK** | nombre con *Kingdom* |

La geografía exige aprender patrones. Muchos países van sin artículo (*Spain, France, Oxford*), pero **the United Kingdom / the UK**, *the United States* y nombres plurales usan *the*. Esta unidad practica **the UK**. No generalices diciendo que todos los países llevan artículo porque en español aparezca.

---

## 4. Instituciones: actividad normal frente a edificio concreto

Con ciertas instituciones, el artículo cero presenta la función social habitual: *go to school* como estudiante, *be at university* para estudiar y *be in prison* como preso. **The** aparece cuando hablamos del edificio, de una visita o de una institución identificada. Esa diferencia de perspectiva es uno de los usos avanzados del bloque.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-31/zero-institutions.mp3" title="🔊 Artículo cero con instituciones"></audio>

| Función institucional | Lugar o referencia concreta |
| :--- | :--- |
| Students go to **school** by bus. | Parents waited outside **the school**. |
| Maya is at **university**. | The ceremony took place at **the university**. |
| He is in **prison**. | A researcher visited **the prison**. |
| a patient in **hospital** (BrE) | She went to **the hospital** to visit a student. |

La última pareja depende también de la variedad. En inglés británico, *in hospital* puede presentar la condición de paciente; *visit the hospital* señala el lugar. El ejercicio vivo de U31 utiliza precisamente *the hospital* cuando alguien va a visitar a un estudiante enfermo. No memorices «hospital siempre sin artículo» ni «siempre con *the*»: identifica rol y variedad.

---

## 5. Artículo cero: plurales generales e ideas no delimitadas

Usamos **—** con plurales contables para generalizar: *Most students attend **classes** regularly*. Si dices *the classes*, te refieres a unas clases identificadas. También aparece con sustantivos abstractos o incontables cuando la idea no se delimita: *conduct research, need access, study education*. El artículo puede cambiar si una frase posterior crea una referencia concreta: *the research published by our department*.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-31/zero-general.mp3" title="🔊 Artículo cero en generalizaciones"></audio>

Compara estos pares:

- ***Students** need feedback* = estudiantes en general; ***the students** need feedback* = un grupo conocido.
- *She conducts **research*** = actividad general; ***the research** focuses on bilingual education* = investigación identificada.
- *They attend **classes*** = actividad habitual; *they attend **the classes** offered on Friday* = conjunto delimitado.
- *He needs **access** to information* = concepto no contable; *the access provided by the library* = acceso concreto.

El curso también trabaja secuencias con varios ceros: *students need access to information for research*. No añadas artículos solo porque el español los use. Sin embargo, comprueba cada nombre por separado: un singular contable como *degree* no puede quedar desnudo.

---

## 6. Vocabulario de Education extended

![Vocabulario B2 de educación](/blog/curso-b2/unit-31/education-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-31/education-vocabulary.mp3" title="🔊 Vocabulario de Education extended"></audio>

| Área | Vocabulario real de la lección | Ejemplo |
| :--- | :--- | :--- |
| programa | **degree, major, semester, module** | Her **major** is linguistics. |
| acceso | **apply, enrol, attend** | You apply first and **enrol** after acceptance. |
| trabajos | **assignment, dissertation, thesis** | She submitted a **dissertation**. |
| enseñanza | **tutorial, lecture, seminar** | We have a weekly **tutorial**. |
| resultados | **distinction, pass, fail** | He graduated with **distinction**. |
| personas | **supervisor, tutor, lecturer** | A **supervisor** guides research. |
| trayecto | **drop out, gap year, graduation** | She took a **gap year** before university. |
| recursos | **reading list, syllabus, bibliography** | The **reading list** has twelve books. |

Las colocaciones evaluadas son **obtain a degree, pursue a degree, meet a deadline, conduct research, deliver a lecture** y **complete a course**. Aprende el bloque completo. *Make a research* no sustituye *conduct research*; *make a deadline* no sustituye *meet a deadline*. *Obtain* enfatiza conseguir el título, mientras *pursue a degree* describe cursarlo.

---

## 7. Reading: From gap year to graduation

![Artículos y educación en contexto](/blog/curso-b2/unit-31/campus-context.png)

> Nora took **a gap year** before going to **university**. She then enrolled in **a degree** in environmental engineering. During **the first semester**, **a supervisor** helped her choose **a major** and prepare **a reading list**. Nora attended **lectures**, conducted **research**, and always met her deadlines. In **the final year**, she wrote **a dissertation** and obtained **the degree** with distinction. **The graduation ceremony** was held at **the university library**.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-31/reading-u31.mp3" title="🔊 Reading Unidad 31"></audio>

La primera mención presenta *a degree* y *a supervisor*. Más tarde, *the degree* ya es identificable. *The first semester* y *the final year* están delimitados por orden y programa; *lectures* y *research* describen actividades generales. *University* aparece sin artículo en *go to university*, pero la biblioteca concreta exige *the university library*.

Haz una segunda lectura y etiqueta cada artículo con una razón, no con una traducción. Después cambia *Nora* por dos estudiantes: ajusta plurales y decide si *a supervisor* pasa a *a supervisor each* o *the same supervisor*. El nuevo significado debe gobernar la forma.

---

## 8. Diálogo, decisiones rápidas y errores típicos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-31/dialogue-u31.mp3" title="🔊 Diálogo Unidad 31"></audio>

> **A:** Are you at **university** now?<br>
> **B:** Yes, I'm **a first-year student**.<br>
> **A:** What's your major?<br>
> **B:** Environmental science.<br>
> **A:** Do you attend **lectures** every day?<br>
> **B:** Most days, and I have **a tutorial** on Fridays.<br>
> **A:** Who guides your research?<br>
> **B:** **A supervisor** from **the Faculty of Science**.<br>
> **A:** Do you have a deadline?<br>
> **B:** Yes, **the assignment** is due on Monday.

| Error | Corrección | Motivo |
| :--- | :--- | :--- |
| *She is expert* | She is **an expert**. | singular contable |
| *an university* | **a university** | sonido /j/ |
| *at the university* para actividad estudiantil genérica | at **university** | función institucional |
| *visit hospital* | visit **the hospital** | lugar concreto |
| *the students* para toda la categoría | **students** | plural general |
| *a research* | **research** / a research project | *research* es incontable |
| *first Monday* | **the first Monday** | ordinal |
| *in UK* | in **the UK** | nombre geográfico |

No hay un algoritmo que elimine todo contexto, pero sí una decisión rápida: singular contable nuevo → *a/an*; referencia identificada → *the*; plural o abstracto general → cero; institución → pregunta por la función.

""" + learning_lab(
        31,
        "Education extended",
        "a/an, the, el artículo cero y las colocaciones educativas",
        "a/an frente a the; plural general frente a grupo específico; institución frente a edificio",
        "presenta tu recorrido educativo durante dos minutos usando doce decisiones de artículo y ocho expresiones de Education extended",
    ) + r"""

---

## 12. Ejercicios con soluciones

""" + exercise_block(
        [
            ("Completa: *She is ___ expert and ___ professor at the Faculty of Engineering.*", "**an expert** y **a professor**: dos clasificaciones singulares; *expert* empieza con sonido vocálico."),
            ("Elige: *Maya is at (— / the) university studying engineering.*", "**— university**. Se presenta la actividad institucional de estudiar."),
            ("Completa: *Her parents visited ___ university to attend ___ graduation ceremony.*", "**the university** y **the graduation ceremony**: son lugares y eventos concretos del contexto."),
            ("Contrasta: *Students attend classes* / *The students attend the classes on Friday.*", "La primera generaliza. La segunda identifica tanto al grupo como a las clases de los viernes."),
            ("Corrige: *He is an university lecturer with a good knowledge of the English.*", "He is **a university lecturer with a good knowledge of English**. *University* empieza con /j/ y el idioma va sin artículo."),
            ("Completa: *The course examines ___ future of education in ___ UK.*", "**the future** y **the UK**."),
            ("Selecciona la colocación: *Students (make/conduct) research and (make/meet) deadlines.*", "**conduct research** y **meet deadlines**."),
            ("Explica la diferencia entre *in prison* y *at the prison*.", "**In prison** presenta la condición de preso; **at the prison** localiza a alguien en el edificio o institución concreta."),
            ("Completa: *During ___ first semester, she chose ___ major and prepared ___ reading list.*", "**the first semester, a major, a reading list**."),
            ("Producción: escribe 120–140 palabras sobre un recorrido universitario.", "Respuesta abierta. Incluye seis usos de artículo distintos, *enrol, supervisor, conduct research, meet a deadline, dissertation* y *graduation*. Justifica cuatro elecciones."),
        ]
    )
    return slug, sections


def build_u32() -> tuple[str, str]:
    slug = "unidad-32-quantifiers-environment"
    sections = r"""## 1. Un mapa de cantidad: conjunto, mayoría, individuo o pareja

Los cuantificadores de U32 no son traducciones intercambiables de «todo/cada». **All** cubre un conjunto completo, **most** una mayoría, **each** distribuye la atención entre individuos, **every** recorre todos los miembros como serie y **both** limita la referencia a exactamente dos.

![Mapa de cuantificadores B2](/blog/curso-b2/unit-32/quantifiers-map.png)

Primero identifica el tamaño lógico: 100 %, mayoría o dos. Después decide si miras el grupo como totalidad o miembro por miembro. Por último comprueba la estructura posterior: plural con *all/most/both*, singular con *each/every* y un grupo definido después de *of*.

La concordancia aporta una pista visible: *Each solar panel **produces*** y *Every participant **brings*** llevan verbo singular; *All species **are*** y *Both organisations **work*** llevan plural. No dejes que una traducción española oculte esa diferencia.

---

## 2. All y most: totalidad frente a mayoría

<audio controls preload="none" src="/audio/blog/curso-b2/unit-32/all-most.mp3" title="🔊 All y most"></audio>

| Patrón | Uso | Ejemplo |
| :--- | :--- | :--- |
| **all + plural** | totalidad general | **All species** need habitats. |
| **all the + plural** | totalidad definida | **All the bins** are full. |
| **all of the + plural** | variante enfática/estructural | **All of the volunteers** arrived. |
| **most + plural** | mayoría general | **Most residents** recycle. |
| **most of the + plural** | mayoría de grupo definido | **Most of the forests** are threatened. |
| **most of the + uncountable** | mayor parte de cantidad definida | **Most of the water** is polluted. |

**All** significa 100 %; **most** significa más de la mitad, normalmente una proporción grande, pero no todo. Si dos países de una lista no firman, no puedes afirmar *all countries signed*; quizá *most countries signed*. Una cifra exacta exige otro recurso, pero esta oposición basta para interpretar el informe.

Con grupos generales no añadas *of*: *most people, all species*. Con determinante o pronombre, *of* es normal: *most of the people, all of them*. También se acepta *all the people* sin *of*. La forma *most the people* es incorrecta.

---

## 3. Each y every: singular con perspectivas distintas

<audio controls preload="none" src="/audio/blog/curso-b2/unit-32/each-every.mp3" title="🔊 Each y every"></audio>

Tanto **each** como **every** preceden a singular contable y activan verbo singular: *Each side has an ecosystem; every participant brings a bottle*. La diferencia es de perspectiva. **Each** destaca los miembros uno por uno; **every** presenta todos los miembros o todas las ocasiones de una serie sin excepciones.

| Foco | Forma natural | Ejemplo |
| :--- | :--- | :--- |
| unidad individual | **each + singular** | **Each panel** produces energy. |
| miembro de grupo definido | **each of the + plural** | **Each of the volunteers** received a certificate. |
| regularidad | **every + singular period** | **Every year**, pollution increases. |
| intervalo | **every + number + plural** | **Every three hours**, sensors record data. |
| énfasis absoluto | **every single + singular** | **Every single day**, we recycle. |

No digas *each volunteers* ni *every participants*. Tras **each of**, el grupo es plural, pero el verbo suele concordar con *each*: *Each of the volunteers **received***. El pronombre posterior puede ser singular *their*, una solución natural e inclusiva en inglés actual.

**Every** no funciona normalmente con *of*: no *every of the students*. Usa *every student* o *every one of the students*. Para dos elementos, *both* suele ser más directo.

---

## 4. Both: dos y solo dos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-32/both.mp3" title="🔊 Both para exactamente dos"></audio>

**Both** incluye los dos miembros: *Both governments agreed; both wind and solar are renewable*. El verbo es plural. Puede aparecer como *both organisations, both the organisations* o *both of the organisations*. Ante pronombre usamos *both of them*.

Compara *all three councils* con *both councils*. **All** admite grupos de más de dos; **both** codifica la pareja. Si el lector no sabe que existen exactamente dos organizaciones, añade la información antes o utiliza otra forma. *Each side of the valley* también puede implicar dos, pero el foco es individual: un lado y el otro tienen su propio ecosistema.

Una posición frecuente es después del auxiliar o de *be*: *Wind and solar **are both** renewable; the councils **have both** signed*. Esta unidad trabaja sobre todo *both + noun* y *both A and B*, pero reconocer la posición media ayuda en reading.

---

## 5. El patrón con of y la concordancia

<audio controls preload="none" src="/audio/blog/curso-b2/unit-32/of-patterns.mp3" title="🔊 Patrones con of"></audio>

La estructura **quantifier + of + determiner/pronoun** señala un conjunto ya delimitado: *most of **the** water, all of **these** bins, both of **our** councils, each of **them***. No pongas un nombre desnudo tras *of*: evita *most of forests*; elige *most forests* o *most of the forests*.

| Sujeto | Verbo | Razón |
| :--- | :--- | :--- |
| All the water | **is** | *water* incontable |
| Most of the plastic | **comes** | cantidad incontable |
| All the organisations | **work** | plural |
| Both governments | **have** | plural |
| Each participant | **has** | singular |
| Every three hours | the sensor **records** | el sujeto real es *sensor* |

El archivo vivo incluye una línea redactada como *most river ... is*. El patrón correcto que debes producir es **most rivers are** si hablas de ríos en general o **most of the river is** si hablas de la mayor parte de un río concreto. Nunca uses *most + singular countable* sin otra estructura.

---

## 6. Vocabulario de Environment extended

![Vocabulario B2 de medio ambiente](/blog/curso-b2/unit-32/environment-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-32/environment-vocabulary.mp3" title="🔊 Environment extended"></audio>

| Concepto | Significado de uso | Chunk |
| :--- | :--- | :--- |
| **biodiversity** | variedad de vida | protect biodiversity |
| **greenhouse gases** | gases que retienen calor | reduce greenhouse gases |
| **global warming** | aumento gradual de temperatura | tackle global warming |
| **deforestation** | destrucción de bosques | prevent deforestation |
| **extinct / endangered** | desaparecida / amenazada | an extinct species |
| **potable water** | agua segura para beber | access to potable water |
| **habitat** | hogar natural | destroy a habitat |
| **renewable energy** | fuentes que se renuevan | invest in renewable energy |
| **nature reserve** | área protegida | manage a nature reserve |
| **pollutants** | sustancias dañinas | remove pollutants |

La lección exige además **conserve resources, pose a threat, raise awareness, strike a balance, have an impact, draw a conclusion** y **take responsibility**. Distingue *conserve* (usar de modo que el recurso permanezca) de *preserve* (mantener algo en su estado). En producción ambiental, las colocaciones aportan más precisión que verbos comodín como *do* o *make*.

---

## 7. Reading: Two organisations, one reserve

![Cuantificadores en un informe ambiental](/blog/curso-b2/unit-32/environment-context.png)

> **Both local organisations** work in the same nature reserve. **All the volunteers** raise awareness of biodiversity, and **each volunteer** monitors one habitat. **Most of the water** is potable, but pollutants still pose a threat to two rivers. **Every three hours**, sensors record water quality. **Most residents** support renewable energy, and **both councils** have agreed to take responsibility for conservation.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-32/reading-u32.mp3" title="🔊 Reading Unidad 32"></audio>

Clasifica las expresiones: pareja, totalidad definida, individuo, proporción de cantidad, intervalo y mayoría general. Observa la concordancia: *each volunteer monitors*, pero *both councils have*. Cambia el informe para que solo una minoría apoye la energía renovable; necesitarás reescribir el significado, no sustituir *most* por *all*.

Después formula cuatro preguntas: *Do both organisations...? Does each volunteer...? Is most of the water...? How often do the sensors...?* La transformación revela si controlas auxiliares y singular/plural.

---

## 8. Diálogo y errores de alta frecuencia

<audio controls preload="none" src="/audio/blog/curso-b2/unit-32/dialogue-u32.mp3" title="🔊 Diálogo Unidad 32"></audio>

> **A:** Are **all the habitats** protected?<br>
> **B:** **Most of them** are.<br>
> **A:** Does **each volunteer** inspect the whole reserve?<br>
> **B:** No, each person monitors one area.<br>
> **A:** How often do the sensors report?<br>
> **B:** **Every three hours**.<br>
> **A:** Did **both councils** sign the plan?<br>
> **B:** Yes, and **all of the organisations** now work together.

| Error | Corrección |
| :--- | :--- |
| *most river is polluted* | **most rivers are** / **most of the river is** |
| *most of forests* | **most forests** / **most of the forests** |
| *each volunteers receive* | **each volunteer receives** |
| *every of the bins* | **every bin** / **every one of the bins** |
| *both government agreed* | **both governments agreed** |
| *all water are* | **all the water is** si es cantidad definida |
| *each of them have* | **each of them has** |

""" + learning_lab(
        32,
        "Environment extended",
        "all, most, each, every, both y las colocaciones ambientales",
        "all frente a most; each frente a every; cuantificador + nombre frente a cuantificador + of + determinante",
        "presenta un informe ambiental de dos minutos usando los cinco cuantificadores y diez términos de Environment extended",
    ) + r"""

---

## 12. Ejercicios con soluciones

""" + exercise_block(
        [
            ("Completa: *___ species in the reserve are protected.* (100 %)", "**All species**. *Species* es plural aquí."),
            ("Corrige: *Most river in the region is polluted.*", "**Most rivers in the region are polluted** o **Most of the river is polluted**, según el significado."),
            ("Elige: *Each / Every of the volunteers received a certificate.*", "**Each of the volunteers**. *Every* no se usa directamente con *of*."),
            ("Completa: *___ three hours, each sensor ___ (record) air quality.*", "**Every three hours, each sensor records**."),
            ("Reescribe con *of*: *Most forests in this defined area are threatened.*", "**Most of the forests in this area are threatened.**"),
            ("Completa para dos: *___ wind ___ solar are renewable.*", "**Both wind and solar** are renewable."),
            ("Corrige concordancia: *All the water are contaminated, but each filters remove pollutants.*", "All the water **is** contaminated, but each **filter removes** pollutants."),
            ("Selecciona colocaciones: *(make/raise) awareness, (put/pose) a threat, (take/make) responsibility.*", "**raise awareness, pose a threat, take responsibility**."),
            ("Explica *each side* frente a *both sides*.", "**Each side** considera los lados individualmente y lleva singular; **both sides** los incluye como pareja y lleva plural."),
            ("Producción: redacta 130–150 palabras sobre una reserva.", "Respuesta abierta. Incluye *all, most, each, every, both*, cuatro patrones con *of* y ocho expresiones ambientales."),
        ]
    )
    return slug, sections


def build_u33() -> tuple[str, str]:
    slug = "unidad-33-regret-remember-forget-feelings"
    sections = r"""## 1. La forma posterior cambia la relación temporal

Con **regret, remember y forget**, el gerundio y el infinitivo no son variantes de estilo. La forma **-ing** suele mirar hacia una acción o experiencia que ya ocurrió; **to + infinitive** suele señalar una acción que debe realizarse o un mensaje que se comunica ahora.

![Mapa de regret remember forget B2](/blog/curso-b2/unit-33/verb-patterns-map.png)

La pregunta útil es temporal: ¿la persona recuerda o lamenta un hecho anterior, o tiene pendiente una acción? *I remember meeting her* recupera un recuerdo. *I remembered to call her* confirma que no olvidé la tarea. En español ambas pueden usar «recordar», por lo que debes guardar la escena completa.

---

## 2. Regret doing frente a regret to say/inform

<audio controls preload="none" src="/audio/blog/curso-b2/unit-33/regret.mp3" title="🔊 Regret + gerund o infinitivo"></audio>

| Patrón | Perspectiva | Ejemplo |
| :--- | :--- | :--- |
| **regret + -ing** | lamento una acción pasada | She regrets **hurting** her friend. |
| **regret not + -ing** | lamento no haber actuado | I regret **not apologising** sooner. |
| **regret + to-infinitive** | introduzco malas noticias ahora | We regret **to inform** you... |

**Regret doing** puede traducirse «arrepentirse de haber hecho». El sujeto evalúa una decisión anterior: *He regrets not studying harder*. La forma negativa coloca *not* antes del gerundio. No uses *regret not to study* para expresar ese arrepentimiento retrospectivo.

**Regret to inform/tell/say** pertenece a un registro formal o cortés. La noticia sigue inmediatamente: *We regret to inform you that the event is cancelled*. No significa que antes informaste y ahora te arrepientes; el acto de informar ocurre con la frase. El inventario vivo usa *tell, inform* y anuncios de cancelación o aplazamiento.

---

## 3. Remember doing: existe un recuerdo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-33/remember.mp3" title="🔊 Remember doing y remember to do"></audio>

**Remember + -ing** recupera una experiencia anterior: *I remember seeing her at the party; I remember feeling nervous*. La acción de ver o sentir ocurrió antes del recuerdo actual. La forma puede aparecer negativa: *I don't remember saying that*. Eso no afirma necesariamente que no lo dijiste; afirma que no tienes el recuerdo.

**Remember + to-infinitive** se refiere a una obligación, plan o hábito que no se olvida: *Remember to lock the door; she remembered to buy the tickets; she remembers to turn off the lights every night*. El recuerdo mental sucede antes de completar la acción requerida.

Una línea temporal ayuda:

1. *I remembered **to send** the email* → recordé la tarea y después la envié.
2. *I remember **sending** the email* → la envié y ahora conservo la memoria.

Ambas pueden describir el mismo envío desde puntos de vista diferentes. La primera confirma cumplimiento; la segunda confirma recuerdo.

---

## 4. Forget to do y forget doing

<audio controls preload="none" src="/audio/blog/curso-b2/unit-33/forget.mp3" title="🔊 Forget to do y forget doing"></audio>

| Patrón | Resultado | Ejemplo |
| :--- | :--- | :--- |
| **forget to do** | la tarea no se hizo | I forgot **to send** the attachment. |
| **don't forget to do** | recordatorio futuro | Don't forget **to reply**. |
| **forget doing** | ocurrió, pero se pierde el recuerdo | He forgot **locking** the door. |
| **never forget doing** | recuerdo duradero | I'll never forget **meeting** her. |

*He forgot locking the door* es menos frecuente que *he forgot to lock the door*, pero el contraste de la unidad lo hace explícito: en la primera lectura sí cerró y no lo recuerda; en la segunda no cumplió la acción. Añadir contexto evita ambigüedad: *He forgot locking it, although the camera showed that he had done it*.

Con **never forget + -ing**, la experiencia fue memorable: *He will never forget visiting Paris*. No cambies a *never forget to visit*; esa frase sería un recordatorio repetido de visitar, no una memoria emocional.

---

## 5. Negación, tiempo verbal y pistas de contexto

<audio controls preload="none" src="/audio/blog/curso-b2/unit-33/negative-patterns.mp3" title="🔊 Formas negativas"></audio>

La negación puede afectar al verbo principal o a la acción subordinada:

- *I **don't remember saying** that* = no tengo ese recuerdo.
- *I remember **not saying** anything* = recuerdo que guardé silencio.
- *He regrets **not studying** harder* = lamenta la omisión.
- *I **didn't forget to send** it* = sí lo envié.
- *I forgot **not to mention** it* es posible, pero cognitivamente complejo: olvidé la instrucción de no mencionarlo.

Busca expresiones temporales. *Last year, at the party, for the first time* favorecen una experiencia ya vivida y, con *remember/forget*, la forma -ing. *When you leave, before the concert, every night* presentan una tarea y favorecen *to + infinitive*. Con *regret to inform*, la fórmula formal es una señal aún más fuerte.

---

## 6. Vocabulario de Feelings extended

![Vocabulario B2 de sentimientos](/blog/curso-b2/unit-33/feelings-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-33/feelings-vocabulary.mp3" title="🔊 Feelings extended"></audio>

| Intensidad o relación | Lenguaje de la lección | Uso |
| :--- | :--- | :--- |
| alegría intensa | **overjoyed** | overjoyed at/by the news |
| tristeza profunda | **grief** | experience grief |
| preocupación | **anxious** | anxious about the result |
| alivio | **relieved** | relieved that it ended |
| bloqueo | **frustrated** | frustrated with/by a problem |
| gratitud | **grateful** | grateful to someone for something |
| amargura | **resentful** | resentful about past treatment |
| impacto | **devastated** | devastated by the news |
| comparación | **jealous** | jealous of someone |
| vergüenza moral | **ashamed** | ashamed of an action |

Las expresiones exactas incluyen **bear a grudge, lose your temper, express your feelings, have a sense of, control your emotions, have a breakdown** y **bottle up your feelings**. *Bear a grudge* es guardar rencor; *bottle up* es reprimir en vez de expresar. Úsalas para describir lenguaje y experiencias, no como diagnóstico clínico.

---

## 7. Reading: The interview attachment

![Recuerdos, tareas y sentimientos](/blog/curso-b2/unit-33/memory-context.png)

> I remember **feeling** anxious before a difficult interview. My sister reminded me not to bottle up my feelings, but I regret **ignoring** her advice. I forgot **to attach** one document, yet the interviewer let me send it later. I remembered **to thank** everyone and felt relieved when the result arrived. I will never forget **reading** the message: I was overjoyed. I only regret **not trusting** myself sooner.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-33/reading-u33.mp3" title="🔊 Reading Unidad 33"></audio>

Cada forma aporta una relación temporal. *Feeling, ignoring, reading* son experiencias previas; *to attach* era una tarea que no ocurrió; *to thank* era una tarea que sí ocurrió; *not trusting* es una omisión lamentada. Sustituir todas por infinitivos destruiría esas relaciones.

Resume el texto desde la perspectiva de la hermana. Tendrás que cambiar pronombres y seleccionar entre *She remembers telling me...* y *She remembered to tell me...*. Decide si describes memoria o cumplimiento antes de escribir.

---

## 8. Diálogo y errores típicos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-33/dialogue-u33.mp3" title="🔊 Diálogo Unidad 33"></audio>

> **A:** Do you remember **attending** the interview?<br>
> **B:** Very clearly.<br>
> **A:** Did you remember **to send** the documents?<br>
> **B:** I forgot **to attach** one, unfortunately.<br>
> **A:** Do you regret **making** that mistake?<br>
> **B:** Yes, but they accepted it later.<br>
> **A:** How did you feel?<br>
> **B:** Relieved, grateful and finally overjoyed.

| Forma problemática | Forma objetivo | Cambio de sentido |
| :--- | :--- | :--- |
| *I regret to hurt her yesterday* | I regret **hurting** her. | acción pasada |
| *Remember locking the door when you leave* | Remember **to lock** it. | tarea futura |
| *I remember to meet her last year* | I remember **meeting** her. | memoria |
| *I forgot sending the attachment* si no lo envié | I forgot **to send** it. | acción omitida |
| *I will never forget to visit Paris* como recuerdo | never forget **visiting** | experiencia memorable |
| *regret not to apologise* por arrepentimiento | regret **not apologising** | omisión pasada |

""" + learning_lab(
        33,
        "Feelings extended",
        "regret, remember y forget con gerundio o infinitivo, más vocabulario emocional",
        "regret doing frente a regret to inform; remember doing frente a remember to do; forget doing frente a forget to do",
        "cuenta una experiencia emocional de dos minutos con seis patrones verbales y diez expresiones de Feelings extended",
    ) + r"""

---

## 12. Ejercicios con soluciones

""" + exercise_block(
        [
            ("Completa: *We regret ___ (inform) you that the event is cancelled.*", "**to inform**: fórmula formal para comunicar malas noticias ahora."),
            ("Completa: *She regrets ___ (hurt) her friend when she was angry.*", "**hurting**: lamenta una acción pasada."),
            ("Contrasta: *I remembered to call* / *I remember calling*.", "La primera confirma que cumplí la tarea; la segunda afirma que conservo el recuerdo de la llamada."),
            ("Elige: *Don't forget (replying / to reply) to the email.*", "**to reply**: recordatorio de una acción pendiente."),
            ("Añade contexto a *He forgot locking the door*.", "Ejemplo: **He forgot locking the door, but the security video proved that he had locked it.** La acción ocurrió y se perdió el recuerdo."),
            ("Corrige: *I regret not to study harder for the exam.*", "I regret **not studying** harder for the exam."),
            ("Completa: *I'll never forget ___ (meet) her for the first time.*", "**meeting**: experiencia pasada memorable."),
            ("Selecciona chunks: *(bear/have) a grudge, (lose/miss) your temper, (bottle/close) up your feelings.*", "**bear a grudge, lose your temper, bottle up your feelings**."),
            ("Diferencia *ashamed* y *anxious* con un ejemplo.", "**Ashamed** describe vergüenza por una acción; **anxious** preocupación o incertidumbre: *I was ashamed of the comment and anxious about her response*."),
            ("Producción: escribe 130–150 palabras sobre una noticia y tu reacción.", "Respuesta abierta. Incluye dos patrones con cada verbo, una negación y ocho términos de sentimientos. Subraya qué acciones ocurrieron."),
        ]
    )
    return slug, sections


def build_u34() -> tuple[str, str]:
    slug = "unidad-34-state-verbs-technology"
    sections = r"""## 1. Estado frente a acción en desarrollo

Los **state verbs** describen conocimiento, opinión, preferencia, emoción, posesión mental o necesidad, no una actividad con fases visibles. En los significados objetivo de U34 usamos formas simples: *I like, she knows, we believe, he wants*. La forma continua típica de una acción en progreso no encaja: no *she is knowing Python*.

![Mapa de state verbs B2](/blog/curso-b2/unit-34/state-verbs-map.png)

La regla no es «estos verbos jamás aparecen con -ing en toda la lengua». Algunos pueden adquirir un sentido dinámico o informal en otros contextos. La meta concreta de esta unidad es reconocer sus **significados de estado** y evitar continuos calcados del español. Pregunta: ¿describo una situación mental estable o una acción que se desarrolla?

---

## 2. Inventario vivo: emoción, preferencia y deseo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-34/core-states.mp3" title="🔊 State verbs principales"></audio>

| Familia | Verbos de la lección | Ejemplo tecnológico |
| :--- | :--- | :--- |
| gusto | **like, love, hate** | Users **love** the interface. |
| preferencia | **prefer** | I **prefer** cloud storage. |
| deseo | **want** | She **wants** to learn programming. |
| necesidad | **need** | The software **needs** an update. |
| expectativa mental | **hope** | We **hope** the launch succeeds. |

En el objetivo del curso decimos *I like this app*, no *I am liking this app*; *they prefer the feature*, no *they are preferring it*; *he wants to upgrade*, no *he is wanting*. El presente simple no significa necesariamente hábito: también presenta un estado válido en el momento actual.

**Want/need + to-infinitive** aparece con personas: *The developers want to deploy; users need to update*. **Need + noun** es frecuente con cosas: *The software needs an update; the bug needs attention*. Mantén la tercera persona: *the app needs*, no *need*.

---

## 3. Conocimiento y procesamiento mental

<audio controls preload="none" src="/audio/blog/curso-b2/unit-34/knowledge-states.mp3" title="🔊 Know understand remember recognise"></audio>

**Know, understand, remember y recognise** expresan un resultado o estado mental:

- *She **knows** how to code in Python.*
- *I **understand** what the error means.*
- *She **remembers** the password by heart.*
- *We **recognise** that data privacy is important.*

Evita *is knowing, am understanding, is remembering, are recognising* en estas frases objetivo. Para representar el proceso de llegar a comprender, puedes elegir otro verbo dinámico: *I'm learning how the system works; I'm trying to remember the password; the team is beginning to recognise the risk*. Así mantienes la diferencia semántica.

La negación y pregunta usan *do*: *I don't understand; he doesn't remember; Do they know the answer?* No combines auxiliar con la terminación de tercera persona: no *does she knows?*

---

## 4. Opinión, creencia y valoración

<audio controls preload="none" src="/audio/blog/curso-b2/unit-34/preference-states.mp3" title="🔊 Preferencias y opiniones"></audio>

**Believe** presenta una opinión o convicción: *We believe AI will change the industry*. **Value** indica que consideras importante algo: *I value your opinion*. **Hope** expresa una expectativa deseada: *We hope the system will work*. En el inventario de la unidad, los tres se practican en simple.

| Incorrecto en el uso objetivo | Correcto |
| :--- | :--- |
| *We are believing the project will succeed.* | We **believe** the project will succeed. |
| *I am valuing your opinion.* | I **value** your opinion. |
| *They are hoping the system works.* | They **hope** the system works. |
| *We are recognising privacy is important.* | We **recognise** that privacy is important. |

En uso real, *hope* puede aparecer en continuo para enfatizar una expectativa temporal (*We're hoping to launch on Friday*). Sin embargo, la práctica viva de U34 lo clasifica con estados y contrasta **hope** con *are hoping*. Para superar esta unidad, produce el simple en sus marcos objetivo y reconoce que el contexto puede ampliar la gramática fuera del ejercicio.

---

## 5. Cómo no confundir tiempo actual con presente continuo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-34/need-value.mp3" title="🔊 Need value believe"></audio>

El español puede expresar «ahora» con una perífrasis, pero el inglés no exige continuo para toda situación actual. *I understand now* es presente simple aunque la comprensión sea actual. *She wants a new laptop this week* sigue siendo estado. Los marcadores *now, at the moment, currently* no anulan la naturaleza del verbo.

Compara una acción dinámica con el estado relacionado:

| Acción en desarrollo | Estado |
| :--- | :--- |
| Mina **is studying** Python. | She **knows** Python. |
| I **am reading** the warning. | I **understand** the warning. |
| We **are testing** the app. | We **believe** it is secure. |
| He **is searching for** the password. | He **remembers** the password. |
| They **are installing** an update. | The app **needs** an update. |

Esta comparación evita una regla puramente negativa. No basta con quitar *-ing*: selecciona un tiempo simple con concordancia correcta y construye la cláusula posterior.

---

## 6. Vocabulario de Technology extended

![Vocabulario B2 de tecnología](/blog/curso-b2/unit-34/technology-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-34/technology-vocabulary.mp3" title="🔊 Technology extended"></audio>

| Área | Elementos reales | Distinción |
| :--- | :--- | :--- |
| seguridad | **antivirus, encrypt, data breach** | antivirus protege; *encrypt* cifra |
| transferencia | **upload, download** | subir frente a descargar |
| fallos | **bug, glitch, crash** | error de código, fallo breve, caída |
| mantenimiento | **update, upgrade, install** | actualizar, mejorar, instalar |
| datos | **cloud storage, backup** | ubicación remota y copia de seguridad |
| conexión | **wireless, Bluetooth, Wi-Fi** | sin cable y tecnologías concretas |
| desarrollo | **programmer, debugging, deploy** | persona, proceso y puesta disponible |
| sistemas | **AI, IT, IoT** | inteligencia, tecnología, objetos conectados |

Las colocaciones objetivo son **set a password, save a file, launch an app, connect a device** y **go online**. También se trabaja *upload data, update software, encrypt data, make a backup* y *deploy software*. Aprende verbo y objeto, porque *put a password* o *open an app* pueden describir otras acciones, pero no sustituyen el chunk evaluado *set/launch*.

---

## 7. Reading: A secure app launch

![State verbs y tecnología en contexto](/blog/curso-b2/unit-34/technology-context.png)

> Mina is a programmer who **knows** how to debug mobile apps. She **believes** a new security feature is necessary because users **value** data privacy. The software **needs** an update, and the team **wants** to deploy it before Friday. Mina **understands** the risk of a data breach and **prefers** encrypted cloud storage. She **loves** the clean interface but **hates** one recurring bug. Everyone **hopes** the launch will succeed.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-34/reading-u34.mp3" title="🔊 Reading Unidad 34"></audio>

Subraya trece estados posibles del inventario, incluidos los que no aparecen. Después añade dos acciones dinámicas: *The team is testing the update and Mina is saving a backup*. El contraste demuestra que el texto no evita el continuo por fecha o tema, sino por significado verbal.

Pasa tres frases a negativa: *Mina doesn't know..., users don't value..., the software doesn't need...* Observa que el verbo principal vuelve a base después de *doesn't*.

---

## 8. Diálogo y corrección de interferencias

<audio controls preload="none" src="/audio/blog/curso-b2/unit-34/dialogue-u34.mp3" title="🔊 Diálogo Unidad 34"></audio>

> **A:** Do you **understand** the error message?<br>
> **B:** Yes, I **believe** the app **needs** an update.<br>
> **A:** Do you **know** the password?<br>
> **B:** I **remember** it, but I **prefer** to set a new one.<br>
> **A:** Why?<br>
> **B:** I **value** security, and I **want** to encrypt the backup.<br>
> **A:** Do users **like** the app?<br>
> **B:** They **love** the interface but **hate** the bug.

| Error | Corrección |
| :--- | :--- |
| *I am liking this app.* | I **like** this app. |
| *She is knowing Python.* | She **knows** Python. |
| *We are believing that...* | We **believe** that... |
| *He is wanting an upgrade.* | He **wants** an upgrade. |
| *I am not understanding.* | I **don't understand**. |
| *Does she remembers?* | Does she **remember**? |
| *The software need an update.* | The software **needs** an update. |
| *They are preferring cloud storage.* | They **prefer** cloud storage. |

""" + learning_lab(
        34,
        "Technology extended",
        "los state verbs del curso en formas simples y las colocaciones de tecnología",
        "estado frente a acción dinámica; presente simple actual frente a presente continuo; tercera persona frente a forma base tras does",
        "explica un proyecto tecnológico durante dos minutos usando doce state verbs, tres acciones dinámicas y diez expresiones de Technology extended",
    ) + r"""

---

## 12. Ejercicios con soluciones

""" + exercise_block(
        [
            ("Elige: *I (like / am liking) this app because it is useful.*", "**like**: describe una valoración."),
            ("Corrige: *She is knowing how to code in Python.*", "She **knows** how to code in Python."),
            ("Completa: *The software ___ (need) an update, and the developers ___ (want) to deploy it.*", "**needs** y **want**."),
            ("Pasa a pregunta: *She remembers the password.*", "**Does she remember the password?** El verbo vuelve a base."),
            ("Añade una acción dinámica: *I understand the warning, and...*", "Ejemplo: **I understand the warning, and I am changing the password now.**"),
            ("Corrige: *We are believing that AI is important, but I am preferring human review.*", "We **believe** that AI is important, but I **prefer** human review."),
            ("Selecciona chunks: *(set/put) a password, (save/keep) a file, (launch/start) an app.*", "**set a password, save a file, launch an app**."),
            ("Distingue *bug, glitch* y *crash*.", "Un **bug** es un defecto del software; un **glitch**, un fallo breve; un **crash**, una caída que detiene el programa."),
            ("Completa: *Mina ___ (value) privacy and ___ (recognise) the risk of a data breach.*", "**values** y **recognises**, tercera persona singular."),
            ("Producción: escribe 130–150 palabras sobre el lanzamiento de una app.", "Respuesta abierta. Usa diez state verbs en simple, tres acciones en continuo y ocho términos tecnológicos. Explica dos elecciones."),
        ]
    )
    return slug, sections


def build_u35() -> tuple[str, str]:
    slug = "unidad-35-repaso-31-34"
    sections = r"""## 1. Cuatro preguntas para clasificar cada hueco

La Unidad 35 integra cuatro decisiones diferentes. No intentes resolverlas con una única intuición. Primero etiqueta el hueco: **artículo, cantidad, patrón verbal o forma simple/continua**. Después aplica la pregunta de la unidad correspondiente.

![Mapa del repaso B2 U31–34](/blog/curso-b2/unit-35/review-map.png)

| Unidad | Pregunta de control | Ejemplo |
| :--- | :--- | :--- |
| **31** | ¿nuevo, identificado, general o institucional? | at **—** university / **the** library |
| **32** | ¿100 %, mayoría, individuo, serie o pareja? | **each** team / **both** teams |
| **33** | ¿experiencia anterior o tarea/mensaje? | remember **doing / to do** |
| **34** | ¿estado mental o acción en desarrollo? | I **believe** / I am testing |

La clasificación evita mezclas. En *Each student remembers to save a file*, **each** decide cantidad, **student** exige verbo singular y **remember to save** presenta una tarea. Una oración puede contener tres objetivos, pero cada uno conserva su propia lógica.

---

## 2. Diagnóstico U31: artículos y educación

<audio controls preload="none" src="/audio/blog/curso-b2/unit-35/review-u31.mp3" title="🔊 Repaso U31"></audio>

Recupera tres contrastes:

- **a/an**: singular no identificado o clasificación — *a degree, an expert*.
- **the**: referencia identificada — *the exam, the first semester, the UK*.
- **—**: plural/abstracto general o función institucional — *attend classes, conduct research, at university*.

En el vocabulario, produce **obtain/pursue a degree, enrol on a course, meet a deadline, conduct research, write a dissertation, consult a supervisor**. El artículo forma parte del chunk cuando corresponde: *a degree, a deadline, a dissertation*, pero *research* queda incontable.

Prueba diagnóstica: *She is ___ expert who supervises ___ research project at ___ university.* Una respuesta posible es **the expert, the research project, the university** si todo está identificado; otra escena puede presentar **an expert, a research project, a university**. El contexto manda, salvo expresiones institucionales como *study at university*.

---

## 3. Diagnóstico U32: cuantificadores y medio ambiente

<audio controls preload="none" src="/audio/blog/curso-b2/unit-35/review-u32.mp3" title="🔊 Repaso U32"></audio>

**All** incluye el grupo completo; **most**, una mayoría; **each/every** llevan singular; **both** se limita a dos. Con un grupo definido, comprueba *of*: *most residents* pero *most of the residents; all bins / all of the bins; each of the volunteers; both of them*.

Concordancia mínima:

| Sujeto | Verbo |
| :--- | :--- |
| all species | are |
| most of the water | is |
| each volunteer | receives |
| every organisation | takes |
| both councils | work |

Integra el vocabulario: *All species contribute to biodiversity; most greenhouse gases pose a threat; each reserve conserves habitats; every campaign raises awareness; both councils take responsibility*. No evalúes la veracidad de una afirmación solo por su gramática: un cuantificador correcto puede expresar un dato falso, así que en escritura académica cita evidencias.

---

## 4. Diagnóstico U33: memoria, deberes y sentimientos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-35/review-u33.mp3" title="🔊 Repaso U33"></audio>

La forma -ing mira normalmente atrás; el infinitivo señala una tarea o un mensaje actual:

- *regret **hurting*** / *regret **to inform***;
- *remember **meeting*** / *remember **to reply***;
- *forget **locking*** / *forget **to lock***.

No memorices «gerundio = pasado» como regla universal para todos los verbos ingleses. Es la relación semántica de estos tres verbos en esta unidad. Añade pistas contextuales y comprueba resultado: si *I forgot to encrypt the backup*, la acción no ocurrió; si *I forgot encrypting it*, ocurrió pero no conservo el recuerdo.

Vocabulario activo: *feel anxious, overjoyed, relieved, frustrated, grateful, resentful, devastated, jealous, ashamed; bear a grudge; lose your temper; express/control emotions; bottle up feelings*. Escoge intensidad y complemento con cuidado.

---

## 5. Diagnóstico U34: state verbs y tecnología

<audio controls preload="none" src="/audio/blog/curso-b2/unit-35/review-u34.mp3" title="🔊 Repaso U34"></audio>

En los significados objetivo, usa presente simple con **like, know, believe, want, understand, prefer, remember, hate, hope, need, value, recognise y love**. El momento actual no obliga a usar continuo: *I understand now; the software needs an update*.

Combina estado y acción:

> We **believe** the app **needs** an update, so the developers **are testing** it. Mina **knows** the system and **is debugging** a recurring bug. Users **value** privacy, so the team **is encrypting** every backup.

El vocabulario clave incluye *antivirus, upload, bug, update, cloud storage, wireless, AI, encrypt, programmer, backup, debugging, data breach, deploy, set a password, save a file, launch an app, connect a device, go online*. Usa verbos específicos y no una traducción genérica de «hacer».

---

## 6. Vocabulario mixto: crea conexiones razonables

![Vocabulario del repaso U31–34](/blog/curso-b2/unit-35/review-vocabulary.png)

Una lista mezclada solo ayuda si construyes relaciones. Imagina un proyecto universitario sobre biodiversidad que usa almacenamiento en la nube. Los estudiantes **conduct research**, **meet deadlines** y consultan a **a supervisor**. Cada grupo estudia **a habitat**, intenta **raise awareness** y guarda datos en **cloud storage**. Si alguien olvida **to encrypt a backup**, puede sentirse **anxious** y lamentar **making the mistake**.

Clasifica por campo y añade colocación:

| Education | Environment | Feelings | Technology |
| :--- | :--- | :--- | :--- |
| obtain a degree | protect biodiversity | feel relieved | upload data |
| meet a deadline | pose a threat | bear a grudge | set a password |
| conduct research | raise awareness | bottle up feelings | encrypt a backup |
| write a dissertation | conserve resources | lose your temper | debug/deploy software |

Evita introducir cada palabra sin función. Primero diseña una escena con participantes, objetivo, problema y resultado. Después selecciona el lenguaje que realmente la expresa.

---

## 7. Reading integrado: The biodiversity data project

![Contexto integrado de U31–34](/blog/curso-b2/unit-35/review-context.png)

> At **university**, **all the students** joined **an environmental technology project**. **Each group** chose **a habitat**, and **both supervisors** helped them conduct **research**. **Most of the teams** used cloud storage, but one student forgot **to encrypt** a backup. He regrets **making** that mistake and remembers **feeling** anxious after **the warning**. The supervisors **believe** the project still has value, and **every team wants** to raise awareness of biodiversity.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-35/reading-u35.mp3" title="🔊 Reading Unidad 35"></audio>

Etiqueta al menos quince decisiones. *At university* es institucional; *an project* sería incorrecto, por eso aparece *an environmental technology project* con sonido vocálico inicial; *each group chose* lleva singular; *both supervisors helped* lleva plural; *forgot to encrypt* indica omisión; *regrets making* mira al pasado; *believe/wants* son estados simples.

Reescribe para un solo supervisor y para una minoría de equipos. **Both supervisors** tendrá que cambiar; **most of the teams** ya no servirá. Conserva el resto y comprueba concordancia.

---

## 8. Diálogo y estrategia de examen

<audio controls preload="none" src="/audio/blog/curso-b2/unit-35/dialogue-u35.mp3" title="🔊 Diálogo Unidad 35"></audio>

> **A:** Are all the students at **university**?<br>
> **B:** Yes, and **each team has** a supervisor.<br>
> **A:** What do they study?<br>
> **B:** **Most of the projects** examine biodiversity.<br>
> **A:** Do they remember **to save** their files?<br>
> **B:** Usually, but one student forgot **to encrypt** a backup.<br>
> **A:** Does he regret it?<br>
> **B:** Yes, and now **both supervisors believe** security needs more attention.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-35/mixed-review.mp3" title="🔊 Repaso mixto U31–34"></audio>

En una actividad mixta, sigue este orden:

1. Identifica qué palabra gobierna el hueco.
2. Etiqueta unidad y regla.
3. Decide significado antes de mirar concordancia.
4. Comprueba singular/plural, auxiliar, artículo y complemento.
5. Lee toda la oración para verificar coherencia.

| Mezcla incorrecta | Corrección |
| :--- | :--- |
| *each students are* | **each student is** |
| *most of projects* | **most projects / most of the projects** |
| *at the university* para estudiar en general | **at university** |
| *regret to make that mistake yesterday* | regret **making** it |
| *remember uploading* si era una tarea pendiente | remember **to upload** |
| *is believing / is knowing* | **believes / knows** |
| *conduct a research* | conduct **research / a research project** |
| *put a password* | **set a password** |

""" + learning_lab(
        35,
        "Education, Environment, Feelings y Technology",
        "los cuatro sistemas de U31–34 y sus campos de vocabulario",
        "a/an/the/cero; all/most/each/every/both; -ing/to-infinitive; estado simple/acción continua",
        "presenta un proyecto universitario ambiental y tecnológico durante tres minutos con cinco objetivos correctos de cada unidad",
    ) + r"""

---

## 12. Ejercicios integrados con soluciones

""" + exercise_block(
        [
            ("Completa: *She studied at ___ university and later obtained ___ degree with distinction.*", "**— university** por función institucional; **a degree** por singular contable presentado."),
            ("Completa y concuerda: *___ of the water ___ (be) contaminated, but ___ two organisations are responding.*", "Una opción: **Most of the water is** contaminated, but **both** organisations are responding."),
            ("Elige: *I remember (to feel / feeling) anxious before the interview.*", "**feeling**: recuerdo de una experiencia pasada."),
            ("Corrige: *We are believing that the software is needing an update.*", "We **believe** that the software **needs** an update."),
            ("Integra U31 y U32: *Each / students / conduct / research / library.*", "**Each student conducts research in the library.** Singular con *each*, cero con *research* y *the* para biblioteca identificada."),
            ("Integra U33 y U34: *Mina / regret / not save / backup / but / understand / risk now.*", "**Mina regrets not saving a backup, but she understands the risk now.**"),
            ("Corrige: *Most of habitats pose threat and every volunteers raise awareness.*", "**Most habitats pose a threat, and every volunteer raises awareness.**"),
            ("Selecciona cuatro chunks: *meet/make a deadline; do/conduct research; bear/make a grudge; set/put a password.*", "**meet a deadline, conduct research, bear a grudge, set a password**."),
            ("Analiza *Both supervisors remember meeting the programmer.*", "**Both** incluye dos y lleva plural; **remember meeting** recupera una experiencia pasada; **the programmer** identifica a la persona."),
            ("Producción final: escribe 170–190 palabras sobre un proyecto de biodiversidad digital.", "Respuesta abierta. Incluye cuatro artículos contrastados, los cinco cuantificadores, seis patrones de U33, ocho state verbs y doce palabras repartidas entre los cuatro campos."),
        ]
    )
    return slug, sections


def article_specs():
    return [
        (
            build_u31,
            dict(
                unit=31,
                title="Articles Advanced B2: A/An, The, Zero Article + Education",
                description="Domina a/an, the y zero article en inglés B2 con instituciones, referencias específicas, Education extended, audio y ejercicios resueltos.",
                image="/blog/curso-b2/unit-31/articles-map.png",
                alt="Artículos avanzados a an the zero article B2 con educación",
                readTime="29 min",
                keywords=[
                    "artículos avanzados inglés B2",
                    "a an the zero article ejercicios B2",
                    "artículo cero instituciones inglés",
                    "at university vs at the university",
                    "education vocabulary B2",
                    "inglés B2 unidad 31",
                ],
                related=[
                    "unidad-31-articles-advanced-education-ejercicios-soluciones",
                    "unidad-30-repaso-26-29",
                    "unidad-32-quantifiers-environment",
                    HUB,
                ],
                faqs=[
                    ("¿Cuándo se usa artículo cero con university?", "Usa **at/go to university** cuando presentas la actividad de estudiar. Usa **the university** para un edificio o institución identificada."),
                    ("¿Por qué se dice a university y no an university?", "Porque *university* empieza con el sonido consonántico /j/. **A/an** depende del sonido, no de la letra."),
                    ("¿Research lleva a?", "**Research** es normalmente incontable: *conduct research*. Puedes decir **a research project/study** si añades un sustantivo contable."),
                    ("¿Cuándo uso the con estudiantes o clases?", "Cuando el grupo está identificado: *the students in my tutorial; the classes offered on Friday*. Para generalizar, usa artículo cero."),
                    ("¿Dónde practico la Unidad 31?", "En la [Unidad 31 del curso B2](/curso-b2/unit-31) y su [cuaderno con soluciones](/blog/curso-b2/unidad-31-articles-advanced-education-ejercicios-soluciones)."),
                ],
                excerpt="Guía B2 de a/an, the y artículo cero con instituciones y vocabulario universitario real de la Unidad 31.",
                intro="""La **Unidad 31** abre el Módulo 4 con los usos avanzados de **a/an, the y artículo cero (—)** dentro de **Education extended**. El inventario vivo incluye profesiones y títulos, referencias específicas, ordinales, países como *the UK*, plurales generales, sustantivos abstractos e instituciones como *school, university, hospital* y *prison*.

Para un hispanohablante, el reto no es recordar que *a* significa «un» y *the* puede significar «el». Hay que decidir cómo presentas la referencia. *At university* describe la actividad de estudiar; *at the university* localiza en una institución concreta. *Students attend classes* generaliza; *the students are in the library* identifica un grupo y un lugar.

La guía sigue exactamente las decisiones de la lección y las combina con **degree, major, semester, enrol, dissertation, tutorial, distinction, supervisor, conduct research, gap year, reading list** y sus colocaciones. Incluye diagramas, ocho audios, reading, diálogo y ejercicios con solución.""",
                before="[U30 — Repaso 26–29](/blog/curso-b2/unidad-30-repaso-26-29)",
                learn=[
                    "Elegir **a/an** con profesiones, clasificaciones y singulares contables",
                    "Usar **the** con referencias específicas, ordinales y **the UK**",
                    "Aplicar artículo cero a plurales generales, abstractos e instituciones",
                    "Contrastar función institucional y edificio concreto",
                    "Producir las colocaciones reales de **Education extended**",
                ],
                tip="No preguntes solo «¿qué artículo lleva *university*?». Pregunta qué significa en esta frase: actividad institucional, una universidad cualquiera o una institución identificada. El mismo nombre cambia con la perspectiva.",
                summary="""| Decisión | Forma |
| :--- | :--- |
| singular nuevo / profesión | **a/an** |
| referencia identificada / ordinal / UK | **the** |
| plural o abstracto general | **—** |
| actividad institucional | at **—** university / go to **—** school |
| Education chunks | obtain/pursue a degree · meet a deadline · conduct research |""",
                next_block="""Continúa con la **Unidad 32**, donde **all, most, each, every y both** organizan información sobre Environment extended.

- [Ejercicios U31 con soluciones](/blog/curso-b2/unidad-31-articles-advanced-education-ejercicios-soluciones)
- [Unidad 31 del curso](/curso-b2/unit-31)
- [U32 teoría: Quantifiers + Environment](/blog/curso-b2/unidad-32-quantifiers-environment)""",
                guides=[
                    "[U30 Repaso 26–29](/blog/curso-b2/unidad-30-repaso-26-29)",
                    "[U32 Quantifiers + Environment](/blog/curso-b2/unidad-32-quantifiers-environment)",
                    "[Inglés B2](/blog/metodos/ingles-b2)",
                ],
                sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Articles: https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/articles
- Cambridge Dictionary — Articles and determiners reference""",
            ),
        ),
        (
            build_u32,
            dict(
                unit=32,
                title="Quantifiers B2: All, Most, Each, Every, Both + Environment",
                description="Aprende all, most, each, every, both y patrones con of en inglés B2 con Environment extended, concordancia, audio y ejercicios.",
                image="/blog/curso-b2/unit-32/quantifiers-map.png",
                alt="Cuantificadores all most each every both B2 con medio ambiente",
                readTime="29 min",
                keywords=[
                    "quantifiers B2 all most each every both",
                    "each vs every ejercicios B2",
                    "all vs most of the inglés",
                    "both concordancia inglés B2",
                    "environment vocabulary B2",
                    "inglés B2 unidad 32",
                ],
                related=[
                    "unidad-32-quantifiers-environment-ejercicios-soluciones",
                    "unidad-31-articles-advanced-education",
                    "unidad-33-regret-remember-forget-feelings",
                    HUB,
                ],
                faqs=[
                    ("¿Cuál es la diferencia entre all y most?", "**All** incluye el 100 % del grupo; **most** incluye una mayoría, pero deja excepciones."),
                    ("¿Each y every llevan singular?", "Sí: **each participant has**, **every organisation works**. *Each of the participants* mantiene normalmente verbo singular."),
                    ("¿Cuándo necesito of?", "Con grupo definido o pronombre: *most of the water, each of them*. Sin determinante: *most people, all species*."),
                    ("¿Both puede referirse a tres cosas?", "No. **Both** incluye exactamente dos. Para tres o más usa **all** si incluyes el conjunto completo."),
                    ("¿Dónde practico la Unidad 32?", "En la [Unidad 32 del curso B2](/curso-b2/unit-32) y su [cuaderno con soluciones](/blog/curso-b2/unidad-32-quantifiers-environment-ejercicios-soluciones)."),
                ],
                excerpt="Guía B2 de all, most, each, every y both con patrones of, concordancia y vocabulario ambiental.",
                intro="""La **Unidad 32** amplía los cuantificadores **all, most, each, every y both** en informes sobre **Environment extended**. La lección combina porcentajes, individuos, intervalos y parejas con nombres contables e incontables: *all species, most of the water, each volunteer, every three hours, both governments*.

El reto principal es estructural. *Most forests* no lleva *of*, pero *most of the forests* sí porque el grupo está definido. *Each participant* lleva nombre y verbo singular; *both organisations* lleva plural. Una elección semántica correcta puede fallar si la concordancia o el determinante no encajan.

La guía incorpora el vocabulario real: **biodiversity, greenhouse gases, conserve, global warming, pose a threat, raise awareness, extinct, deforestation, strike a balance, potable water, habitat, renewable energy, nature reserve, pollutants** y **take responsibility**.""",
                before="[U31 — Articles Advanced + Education](/blog/curso-b2/unidad-31-articles-advanced-education)",
                learn=[
                    "Distinguir totalidad (**all**) y mayoría (**most**)",
                    "Separar foco individual (**each**) y serie completa (**every**)",
                    "Reservar **both** para exactamente dos",
                    "Construir patrones con **of** y concordancia correcta",
                    "Usar colocaciones de **Environment extended**",
                ],
                tip="Antes de elegir, dibuja mentalmente el grupo: completo, mayoría, miembros individuales, serie o pareja. Después mira la gramática posterior. Significado y estructura deben coincidir.",
                summary="""| Cuantificador | Control |
| :--- | :--- |
| **all** | 100 %; plural o incontable |
| **most** | mayoría; *most nouns / most of the nouns* |
| **each** | individuo; singular; *each of the + plural* |
| **every** | todos como serie; singular; intervalos |
| **both** | exactamente dos; plural |""",
                next_block="""En la **Unidad 33** cambia la decisión: **regret, remember y forget** seleccionan gerundio o infinitivo según memoria, tarea o arrepentimiento.

- [Ejercicios U32 con soluciones](/blog/curso-b2/unidad-32-quantifiers-environment-ejercicios-soluciones)
- [Unidad 32 del curso](/curso-b2/unit-32)
- [U33 teoría: Regret, Remember, Forget + Feelings](/blog/curso-b2/unidad-33-regret-remember-forget-feelings)""",
                guides=[
                    "[U31 Articles Advanced](/blog/curso-b2/unidad-31-articles-advanced-education)",
                    "[U33 Regret, Remember, Forget](/blog/curso-b2/unidad-33-regret-remember-forget-feelings)",
                    "[Inglés B2](/blog/metodos/ingles-b2)",
                ],
                sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Quantifiers: https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/quantifiers
- Cambridge Dictionary — Each, every, all, most and both""",
            ),
        ),
        (
            build_u33,
            dict(
                unit=33,
                title="Regret, Remember, Forget + Gerund or Infinitive B2",
                description="Distingue regret, remember y forget + gerundio o infinitivo en inglés B2 con Feelings extended, líneas temporales, audio y ejercicios.",
                image="/blog/curso-b2/unit-33/verb-patterns-map.png",
                alt="Regret remember forget gerundio infinitivo B2 con sentimientos",
                readTime="29 min",
                keywords=[
                    "regret remember forget gerund infinitive B2",
                    "remember doing vs remember to do",
                    "forget doing vs forget to do ejercicios",
                    "regret doing vs regret to inform",
                    "feelings vocabulary B2",
                    "inglés B2 unidad 33",
                ],
                related=[
                    "unidad-33-regret-remember-forget-feelings-ejercicios-soluciones",
                    "unidad-32-quantifiers-environment",
                    "unidad-34-state-verbs-technology",
                    HUB,
                ],
                faqs=[
                    ("¿Qué diferencia hay entre remember doing y remember to do?", "**Remember doing** conserva memoria de una experiencia; **remember to do** significa no olvidar una tarea."),
                    ("¿Regret to inform habla del pasado?", "No. Es una fórmula formal para comunicar malas noticias ahora. **Regret doing** sí evalúa una acción anterior."),
                    ("¿Forget doing significa que no hice la acción?", "No: la acción ocurrió, pero no conservas el recuerdo. **Forget to do** indica que la tarea no se realizó."),
                    ("¿Dónde va not?", "Para lamentar una omisión: **regret not doing**. Para negar el recuerdo: **don't remember doing**."),
                    ("¿Dónde practico la Unidad 33?", "En la [Unidad 33 del curso B2](/curso-b2/unit-33) y su [cuaderno con soluciones](/blog/curso-b2/unidad-33-regret-remember-forget-feelings-ejercicios-soluciones)."),
                ],
                excerpt="Guía B2 de regret, remember y forget con -ing/to-infinitive, emociones y práctica contextual.",
                intro="""La **Unidad 33** retoma gerundio e infinitivo con tres verbos cuyo significado cambia según el patrón: **regret, remember y forget**. *I regret saying it* mira a una acción pasada; *I regret to inform you* introduce malas noticias. *Remember doing* es memoria; *remember to do* es cumplimiento de una tarea. *Forget doing* pierde un recuerdo; *forget to do* deja la acción sin realizar.

El contexto de **Feelings extended** permite expresar consecuencias: sentirse *anxious, relieved, frustrated, grateful, resentful, devastated, jealous, ashamed* u *overjoyed*; *bear a grudge, lose your temper, express/control emotions* y *bottle up feelings*.

Esta guía usa líneas temporales, formas negativas, ocho audios, reading y diálogo para que la elección dependa del significado. No basta traducir «recordar» u «olvidar»: debes decidir qué ocurrió primero y si la acción llegó a completarse.""",
                before="[U32 — Quantifiers + Environment](/blog/curso-b2/unidad-32-quantifiers-environment)",
                learn=[
                    "Contrastar **regret doing** y **regret to inform/tell**",
                    "Separar memoria (**remember doing**) y tarea (**remember to do**)",
                    "Distinguir acción omitida y recuerdo perdido con **forget**",
                    "Colocar negación correctamente",
                    "Usar vocabulario real de **Feelings extended**",
                ],
                tip="Dibuja dos puntos: acción y recuerdo. Si la acción está antes y se recuerda, usa -ing; si el recuerdo debe activar la acción, usa infinitivo. Con *regret to inform*, imagina el mensaje ocurriendo ahora.",
                summary="""| Verbo | + -ing | + to-infinitive |
| :--- | :--- | :--- |
| **regret** | lamento pasado | anuncio formal ahora |
| **remember** | memoria de experiencia | no olvidar tarea |
| **forget** | acción hecha, recuerdo perdido | acción no realizada |
| **Feelings** | anxious · relieved · grateful · resentful · devastated · overjoyed |""",
                next_block="""Continúa con la **Unidad 34** para distinguir estados mentales y acciones en progreso dentro de Technology extended.

- [Ejercicios U33 con soluciones](/blog/curso-b2/unidad-33-regret-remember-forget-feelings-ejercicios-soluciones)
- [Unidad 33 del curso](/curso-b2/unit-33)
- [U34 teoría: State Verbs + Technology](/blog/curso-b2/unidad-34-state-verbs-technology)""",
                guides=[
                    "[U32 Quantifiers](/blog/curso-b2/unidad-32-quantifiers-environment)",
                    "[U34 State Verbs](/blog/curso-b2/unidad-34-state-verbs-technology)",
                    "[Inglés B2](/blog/metodos/ingles-b2)",
                ],
                sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Verbs followed by -ing or infinitive: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/verbs-followed-ing-or-infinitive
- Cambridge Dictionary — Regret, remember and forget verb patterns""",
            ),
        ),
        (
            build_u34,
            dict(
                unit=34,
                title="State Verbs B2: Like, Know, Believe, Want + Technology",
                description="Aprende state verbs en inglés B2: like, know, believe, want, understand, prefer, need y más con tecnología, audio y ejercicios.",
                image="/blog/curso-b2/unit-34/state-verbs-map.png",
                alt="State verbs like know believe want B2 con tecnología",
                readTime="29 min",
                keywords=[
                    "state verbs B2 ejercicios",
                    "stative verbs present simple continuous",
                    "like know believe want no continuous",
                    "understand prefer need state verbs",
                    "technology vocabulary B2",
                    "inglés B2 unidad 34",
                ],
                related=[
                    "unidad-34-state-verbs-technology-ejercicios-soluciones",
                    "unidad-33-regret-remember-forget-feelings",
                    "unidad-35-repaso-31-34",
                    HUB,
                ],
                faqs=[
                    ("¿Por qué no se dice I am knowing?", "Porque **know** describe un estado de conocimiento, no una acción en desarrollo. Usa **I know**."),
                    ("¿Now obliga a usar presente continuo?", "No. *I understand now* y *the app needs an update now* siguen en simple porque describen estados."),
                    ("¿Todos los state verbs están prohibidos en continuo?", "No como regla absoluta. Algunos cambian de sentido o aparecen en usos marcados. Esta unidad practica sus significados de estado en simple."),
                    ("¿Qué verbos incluye la lección?", "**Like, know, believe, want, understand, prefer, remember, hate, hope, need, value, recognise y love**."),
                    ("¿Dónde practico la Unidad 34?", "En la [Unidad 34 del curso B2](/curso-b2/unit-34) y su [cuaderno con soluciones](/blog/curso-b2/unidad-34-state-verbs-technology-ejercicios-soluciones)."),
                ],
                excerpt="Guía B2 de state verbs en formas simples con contrastes dinámicos y vocabulario tecnológico.",
                intro="""La **Unidad 34** trabaja **state verbs** con **Technology extended**. El inventario vivo es concreto: **like, know, believe, want, understand, prefer, remember, hate, hope, need, value, recognise y love**. En sus significados objetivo describen gusto, conocimiento, opinión, deseo, comprensión, memoria o necesidad y se usan en forma simple.

El error típico es elegir presente continuo solo porque la situación ocurre «ahora»: *I am understanding the warning; the software is needing an update*. En inglés estándar del patrón estudiado decimos *I understand the warning; the software needs an update*. El tiempo actual no convierte un estado en proceso.

El contexto incluye **antivirus, upload, bug, update, cloud storage, wireless, AI, encrypt, programmer, backup, debugging, data breach, deploy** y colocaciones como **set a password, save a file, launch an app** y **connect a device**.""",
                before="[U33 — Regret, Remember, Forget + Feelings](/blog/curso-b2/unidad-33-regret-remember-forget-feelings)",
                learn=[
                    "Reconocer estados de gusto, conocimiento, opinión y necesidad",
                    "Usar formas simples aunque la situación sea actual",
                    "Construir negaciones y preguntas con **do/does**",
                    "Contrastar estados con acciones tecnológicas dinámicas",
                    "Dominar el inventario real de **Technology extended**",
                ],
                tip="No te limites a tachar el continuo. Nombra el tipo de estado —conocimiento, preferencia, opinión, deseo o necesidad— y produce la forma simple completa con su complemento.",
                summary="""| Estado | Verbos |
| :--- | :--- |
| gusto/preferencia | like · love · hate · prefer |
| conocimiento | know · understand · remember · recognise |
| opinión/expectativa | believe · hope · value |
| deseo/necesidad | want · need |
| contraste | estado simple; acción dinámica sí puede ir en continuo |""",
                next_block="""La **Unidad 35** integra artículos, cuantificadores, patrones verbales y state verbs en un repaso de U31–34.

- [Ejercicios U34 con soluciones](/blog/curso-b2/unidad-34-state-verbs-technology-ejercicios-soluciones)
- [Unidad 34 del curso](/curso-b2/unit-34)
- [U35 teoría: Repaso 31–34](/blog/curso-b2/unidad-35-repaso-31-34)""",
                guides=[
                    "[U33 Regret, Remember, Forget](/blog/curso-b2/unidad-33-regret-remember-forget-feelings)",
                    "[U35 Repaso 31–34](/blog/curso-b2/unidad-35-repaso-31-34)",
                    "[Inglés B2](/blog/metodos/ingles-b2)",
                ],
                sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Stative verbs: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/stative-verbs
- Cambridge Dictionary — State and dynamic verb usage""",
            ),
        ),
        (
            build_u35,
            dict(
                unit=35,
                title="Repaso B2 Unidades 31–34: Articles, Quantifiers & Verb Patterns",
                description="Repasa artículos, all/most/each/every/both, regret/remember/forget y state verbs B2 con vocabulario, audio y ejercicios.",
                image="/blog/curso-b2/unit-35/review-map.png",
                alt="Repaso B2 unidades 31 a 34 artículos cuantificadores verb patterns state verbs",
                readTime="31 min",
                keywords=[
                    "repaso inglés B2 unidades 31 34",
                    "articles quantifiers verb patterns B2",
                    "regret remember forget state verbs review",
                    "all most each every both ejercicios B2",
                    "repaso módulo 4 B2",
                    "inglés B2 unidad 35",
                ],
                related=[
                    "unidad-35-repaso-31-34-ejercicios-soluciones",
                    "unidad-31-articles-advanced-education",
                    "unidad-32-quantifiers-environment",
                    "unidad-33-regret-remember-forget-feelings",
                    "unidad-34-state-verbs-technology",
                    HUB,
                ],
                faqs=[
                    ("¿Qué contenidos integra la Unidad 35?", "U31 artículos avanzados, U32 cuantificadores, U33 patrones de **regret/remember/forget** y U34 state verbs."),
                    ("¿Cómo empiezo una pregunta mixta?", "Etiqueta el hueco: artículo, cantidad, patrón verbal o forma simple/continua. Después aplica la regla específica."),
                    ("¿Cuál es el error de concordancia más frecuente?", "Usar plural tras **each/every** o singular tras **both/all + plural**: produce *each student has* y *both students have*."),
                    ("¿Debo memorizar cuatro listas completas?", "Recupera contrastes y chunks dentro de una escena integrada. Usa el diagnóstico para repetir solo la familia que falla."),
                    ("¿Dónde practico la Unidad 35?", "En la [Unidad 35 del curso B2](/curso-b2/unit-35) y su [cuaderno con soluciones](/blog/curso-b2/unidad-35-repaso-31-34-ejercicios-soluciones)."),
                ],
                excerpt="Repaso integrado B2 de U31–34 con educación, medio ambiente, sentimientos y tecnología.",
                intro="""La **Unidad 35** consolida cuatro sistemas de U31–34: **a/an, the y artículo cero**; **all, most, each, every y both**; **regret, remember y forget + gerundio/infinitivo**; y **state verbs** en formas simples. Los contextos mezclan Education, Environment, Feelings y Technology.

El reto no es añadir otra lista, sino identificar qué tipo de decisión exige cada hueco. *At university* necesita perspectiva institucional; *each team* exige singular; *remember uploading* mira a una memoria, mientras *remember to upload* señala una tarea; *believe* describe un estado aunque la opinión sea actual.

Esta guía sirve como diagnóstico y producción. Encontrarás un mapa de las cuatro preguntas, ocho audios, vocabulario conectado, reading, diálogo, errores cruzados y ejercicios con solución. El proyecto final reúne investigación universitaria, biodiversidad, reacción emocional y seguridad digital.""",
                before="[U34 — State Verbs + Technology](/blog/curso-b2/unidad-34-state-verbs-technology)",
                learn=[
                    "Clasificar cada hueco antes de responder",
                    "Recuperar artículos y cuantificadores con concordancia",
                    "Interpretar la línea temporal de **regret/remember/forget**",
                    "Separar state verbs y acciones dinámicas",
                    "Integrar cuatro campos de vocabulario en una producción coherente",
                ],
                tip="En un repaso mixto, gana precisión quien retrasa la respuesta un segundo. Etiqueta el sistema, formula la pregunta de control y solo entonces completa y revisa la concordancia.",
                summary="""| Unidad | Control mínimo |
| :--- | :--- |
| **U31** | nuevo / específico / general / institucional |
| **U32** | totalidad / mayoría / individuo / serie / pareja |
| **U33** | experiencia anterior / tarea o mensaje |
| **U34** | estado simple / acción dinámica |
| **Vocabulario** | education · environment · feelings · technology |""",
                next_block="""Has cerrado el primer bloque del Módulo 4. Continúa en la **Unidad 36 del curso B2** y conserva este diagnóstico para volver solo al sistema que necesite refuerzo.

- [Ejercicios U35 con soluciones](/blog/curso-b2/unidad-35-repaso-31-34-ejercicios-soluciones)
- [Unidad 35 del curso](/curso-b2/unit-35)
- [Continuar con Unidad 36](/curso-b2/unit-36)""",
                guides=[
                    "[U31 Articles Advanced](/blog/curso-b2/unidad-31-articles-advanced-education)",
                    "[U32 Quantifiers](/blog/curso-b2/unidad-32-quantifiers-environment)",
                    "[U33 Regret, Remember, Forget](/blog/curso-b2/unidad-33-regret-remember-forget-feelings)",
                    "[U34 State Verbs](/blog/curso-b2/unidad-34-state-verbs-technology)",
                    "[Inglés B2](/blog/metodos/ingles-b2)",
                ],
                sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — B1–B2 grammar: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar
- Cambridge Dictionary — Articles, quantifiers, verb patterns and state verbs""",
            ),
        ),
    ]


def write_articles() -> None:
    for builder, metadata in article_specs():
        slug, sections = builder()
        write_checked(
            f"{slug}.md",
            article(slug=slug, sections=sections, **metadata),
        )


def patch_existing_content() -> None:
    """Link U30 forward and refresh the B2 publication tracker."""
    u30_path = OUT_MD / "unidad-30-repaso-26-29.md"
    u30 = u30_path.read_text(encoding="utf-8")
    u30 = u30.replace(
        "unidad-31-articles-education-ejercicios-soluciones",
        "unidad-31-articles-advanced-education-ejercicios-soluciones",
    ).replace(
        "unidad-31-articles-education",
        "unidad-31-articles-advanced-education",
    )
    next_block = """## Siguiente paso en el curso B2

Continúa con la **Unidad 31 — Articles Advanced & Education**, que abre el Módulo 4 con **a/an, the y artículo cero** en contextos educativos.

- [Ejercicios U30 (repaso)](/blog/curso-b2/unidad-30-repaso-26-29-ejercicios-soluciones)
- [Unidad 30 del curso](/curso-b2/unit-30)
- [U31 teoría: Articles Advanced + Education](/blog/curso-b2/unidad-31-articles-advanced-education)
- [Ejercicios U31 con soluciones](/blog/curso-b2/unidad-31-articles-advanced-education-ejercicios-soluciones)

### Guías relacionadas"""
    u30, substitutions = re.subn(
        r"## Siguiente paso en el curso B2\n.*?\n### Guías relacionadas",
        next_block,
        u30,
        count=1,
        flags=re.DOTALL,
    )
    if substitutions != 1:
        raise ValueError("Could not locate U30 next-step block")
    u30 = u30.replace(
        "[U31 Articles & Education — pendiente]",
        "[U31 Articles Advanced + Education]",
    ).replace(
        "[Cuaderno U31 — pendiente]",
        "[Cuaderno U31 con soluciones]",
    )
    u30_path.write_text(u30, encoding="utf-8")
    print("patch", u30_path.relative_to(ROOT))

    docs_path = ROOT / "docs/curso-b2-articulos-explicativos.md"
    docs = docs_path.read_text(encoding="utf-8")
    docs = re.sub(
        r"\*\*Última actualización:\*\* .+",
        "**Última actualización:** 2026-08-31 (35 artículos de teoría publicados; Módulo 4 iniciado con U31–35)",
        docs,
        count=1,
    )
    docs = re.sub(
        r"\| Artículos dedicados publicados \| \d+ \|",
        "| Artículos dedicados publicados | 35 |",
        docs,
        count=1,
    )
    docs = re.sub(
        r"\| Artículos dedicados pendientes \| \d+ \|",
        "| Artículos dedicados pendientes | 25 |",
        docs,
        count=1,
    )
    marker = "## Módulos 4–6 (U31–60)"
    if marker not in docs:
        raise ValueError("Could not locate Modules 4–6 tracker section")
    module_four = """## Módulo 4: Determiners & Verb Patterns (U31–40)

### U31–35 — Articles, Quantifiers, Verb Patterns & State Verbs

| U | Título | Gramática / tema | Teoría | Cuaderno |
|---|---|---|---|---|
| 31 | Articles (advanced) & Education | a/an, the, zero article; education extended | ✅ | ❌ |
| 32 | Quantifiers & Environment | all, most, each, every, both; environment extended | ✅ | ❌ |
| 33 | Regret, Remember, Forget & Feelings | gerund vs infinitive; feelings extended | ✅ | ❌ |
| 34 | State Verbs & Technology | state verbs in simple forms; technology extended | ✅ | ❌ |
| 35 | Repaso 31–34 | integración | ✅ | ❌ |

Teoría M4 (U31–35):
- [U31](/blog/curso-b2/unidad-31-articles-advanced-education) · [U32](/blog/curso-b2/unidad-32-quantifiers-environment) · [U33](/blog/curso-b2/unidad-33-regret-remember-forget-feelings) · [U34](/blog/curso-b2/unidad-34-state-verbs-technology) · [U35](/blog/curso-b2/unidad-35-repaso-31-34)

Cuadernos previstos M4 (U31–35):
- [U31](/blog/curso-b2/unidad-31-articles-advanced-education-ejercicios-soluciones) · [U32](/blog/curso-b2/unidad-32-quantifiers-environment-ejercicios-soluciones) · [U33](/blog/curso-b2/unidad-33-regret-remember-forget-feelings-ejercicios-soluciones) · [U34](/blog/curso-b2/unidad-34-state-verbs-technology-ejercicios-soluciones) · [U35](/blog/curso-b2/unidad-35-repaso-31-34-ejercicios-soluciones)

**Estado del Módulo 4:** teoría publicada hasta U35; cuadernos U31–35 pendientes en esta rama.

### U36–40

Pendiente.

---

## Módulos 5–6 (U41–60)

Pendientes. Ver [planificación B2](./curso-b2-planificacion.md).
"""
    docs = docs.split(marker, 1)[0] + module_four
    docs_path.write_text(docs, encoding="utf-8")
    print("patch", docs_path.relative_to(ROOT))


def main() -> None:
    diagrams()
    tts()
    write_articles()
    patch_existing_content()
    print("done B2 theory U31–35")


if __name__ == "__main__":
    main()
