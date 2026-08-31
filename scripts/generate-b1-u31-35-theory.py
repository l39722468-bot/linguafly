#!/usr/bin/env python3
"""Generate B1 theory U31–35: diagrams, markdown, TTS audios."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT_MD = ROOT / "src/content/blog/curso-b1"
DATE = "2026-08-31"
BG = (245, 248, 252)
INK = (20, 35, 55)
ACCENT = (15, 110, 140)
CARD = (255, 255, 255)
LINE = (200, 215, 230)
BING = [
    "curso de inglés gratis",
    "aprender inglés gratis",
    "curso de inglés online gratis",
    "curso inglés B1 gratis",
]


def font(size: int, bold: bool = False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for c in candidates:
        if Path(c).exists():
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def canvas():
    img = Image.new("RGB", (1200, 675), BG)
    return img, ImageDraw.Draw(img)


def card(d, xy):
    d.rounded_rectangle(xy, radius=18, fill=CARD, outline=LINE, width=2)


def title(d, text, y=36):
    d.text((48, y), text, fill=INK, font=font(34, True))


def save(img, unit, name):
    path = ROOT / f"public/blog/curso-b1/unit-{unit}" / name
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)
    print("img", path.relative_to(ROOT))


def diagrams():
    # U31 Defining relative
    img, d = canvas()
    title(d, "Defining relative clauses")
    card(d, (48, 110, 580, 600))
    d.text((72, 130), "who / that — people", fill=ACCENT, font=font(24, True))
    for i, t in enumerate(["the woman who lives…", "anyone who loves…", "the man that saw…"]):
        d.text((72, 210 + i * 80), f"• {t}", fill=INK, font=font(22))
    card(d, (640, 110, 1150, 600))
    d.text((664, 130), "which / that — things", fill=ACCENT, font=font(24, True))
    for i, t in enumerate(["the book which I bought", "animals that live…", "the river that flows…"]):
        d.text((664, 210 + i * 80), f"• {t}", fill=INK, font=font(22))
    save(img, 31, "defining-relative.png")

    img, d = canvas()
    title(d, "The natural world")
    words = ["bear", "eagle", "wildlife", "landscape", "river", "valley", "forest", "plants", "bird", "park", "wild", "nature"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 24, y + 48), w, fill=INK, font=font(24, True))
    save(img, 31, "nature-vocab.png")

    img, d = canvas()
    title(d, "In the wild")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "The woman who lives next door is a vet.",
        "Animals that live in the wild are free.",
        "The landscape that we visited was breathtaking.",
        "The bird which I saw was an eagle.",
    ]):
        d.text((80, 180 + i * 80), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 31, "nature-scene.png")

    # U32 Non-defining
    img, d = canvas()
    title(d, "Non-defining relative clauses")
    card(d, (48, 110, 1150, 280))
    d.text((72, 140), "Extra information + commas · NO that", fill=ACCENT, font=font(26, True))
    d.text((72, 210), "My sister, who lives in Madrid, is a teacher.", fill=INK, font=font(24))
    card(d, (48, 320, 1150, 600))
    d.text((72, 350), "Things → which", fill=ACCENT, font=font(26, True))
    d.text((72, 420), "The river, which flows through the city, is polluted.", fill=INK, font=font(22))
    d.text((72, 490), "Climate change, which affects us all, is a global problem.", fill=INK, font=font(22))
    save(img, 32, "nondefining-relative.png")

    img, d = canvas()
    title(d, "Environment")
    words = ["recycle", "pollution", "climate", "waste", "protect", "planet", "plastic", "energy", "reduce", "nature", "green", "global"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 24, y + 48), w, fill=INK, font=font(24, True))
    save(img, 32, "environment-vocab.png")

    img, d = canvas()
    title(d, "Our planet")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "My sister, who lives in Madrid, is a teacher.",
        "Recycling, which helps reduce pollution, is important.",
        "Climate change, which affects us all, is a global problem.",
        "The river, which flows through the city, is polluted.",
    ]):
        d.text((80, 180 + i * 80), f"• {t}", fill=INK, font=font(22))
    save(img, 32, "environment-scene.png")

    # U33 Question tags
    img, d = canvas()
    title(d, "Question tags")
    items = [
        ("It's nice, isn't it?", "+ → −"),
        ("You like it, don't you?", "do → don't"),
        ("She works here, doesn't she?", "does → doesn't"),
        ("They haven't finished, have they?", "− → +"),
        ("You're free, aren't you?", "are → aren't"),
    ]
    for i, (en, note) in enumerate(items):
        y = 120 + i * 100
        card(d, (48, y, 1150, y + 85))
        d.text((72, y + 22), en, fill=ACCENT, font=font(26, True))
        d.text((720, y + 22), note, fill=INK, font=font(24))
    save(img, 33, "question-tags.png")

    img, d = canvas()
    title(d, "Services")
    words = ["bank", "doctor", "restaurant", "pharmacy", "hotel", "post office", "hairdresser", "garage", "dentist", "cafe", "taxi", "appointment"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 16, y + 48), w, fill=INK, font=font(20, True))
    save(img, 33, "services-vocab.png")

    img, d = canvas()
    title(d, "At the service desk")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "It's a nice day, isn't it?",
        "You like this restaurant, don't you?",
        "She works at the bank, doesn't she?",
        "They haven't finished yet, have they?",
    ]):
        d.text((80, 180 + i * 80), f"{i+1}. {t}", fill=INK, font=font(26))
    save(img, 33, "services-scene.png")

    # U34 -ed/-ing
    img, d = canvas()
    title(d, "-ed / -ing adjectives")
    card(d, (48, 110, 580, 600))
    d.text((72, 130), "-ed = how you feel", fill=ACCENT, font=font(26, True))
    for i, t in enumerate(["bored", "excited", "worried", "interested", "tired"]):
        d.text((72, 210 + i * 60), f"• {t}", fill=INK, font=font(26))
    card(d, (640, 110, 1150, 600))
    d.text((664, 130), "-ing = what causes it", fill=ACCENT, font=font(26, True))
    for i, t in enumerate(["boring", "exciting", "worrying", "interesting", "tiring"]):
        d.text((664, 210 + i * 60), f"• {t}", fill=INK, font=font(26))
    save(img, 34, "ed-ing-adjectives.png")

    img, d = canvas()
    title(d, "Personal feelings")
    words = ["bored", "excited", "worried", "surprised", "relaxed", "confused", "annoyed", "amazed", "frightened", "disappointed", "pleased", "nervous"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 16, y + 48), w, fill=INK, font=font(20, True))
    save(img, 34, "feelings-vocab.png")

    img, d = canvas()
    title(d, "How do you feel?")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "I was bored because the film was boring.",
        "The news was exciting. I felt excited.",
        "She was worried about the exam.",
        "The match was exciting. We were excited.",
    ]):
        d.text((80, 180 + i * 80), f"• {t}", fill=INK, font=font(24))
    save(img, 34, "feelings-scene.png")

    # U35 Review
    img, d = canvas()
    title(d, "Review 31–34")
    items = [("U31", "Defining relative"), ("U32", "Non-defining"), ("U33", "Question tags"), ("U34", "-ed / -ing")]
    for i, (u, label) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), u, fill=ACCENT, font=font(34, True))
        d.text((x + 24, 260), label, fill=INK, font=font(20))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "who/which/that · commas (no that) · isn't it? · bored/boring", fill=INK, font=font(22))
    d.text((72, 520), "Vocab: nature · environment · services · feelings", fill=INK, font=font(22))
    save(img, 35, "review-map.png")

    img, d = canvas()
    title(d, "Mixed examples")
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate([
        "The park that we visited was beautiful. (defining)",
        "Madrid, which is busy, is my home city. (non-defining)",
        "You're free tomorrow, aren't you? (tag)",
        "I felt excited — the trip was exciting. (-ed/-ing)",
        "Anyone who loves wildlife should visit this park.",
    ]):
        d.text((80, 160 + i * 75), f"{i+1}. {t}", fill=INK, font=font(22))
    save(img, 35, "review-examples.png")


AUDIOS = {
    31: {
        "who-lives": "The woman who lives next door is a vet.",
        "which-bought": "The book which I bought yesterday is very interesting.",
        "that-wild": "Animals that live in the wild are free.",
        "landscape-that": "The landscape that we visited was breathtaking.",
        "bird-which": "The bird which I saw was an eagle.",
        "reading-nature": "The woman who lives next door is a vet. Animals that live in the wild are free. The landscape that we visited was breathtaking. The bird which I saw was an eagle. Anyone who loves wildlife should visit this park.",
        "dialogue-nature": "Who lives next door? A vet. Which bird did you see? An eagle. Do you love wildlife? Yes, anyone who loves wildlife should visit this park.",
        "practice-four": "The woman who lives next door. Animals that live in the wild. The landscape that we visited. The bird which I saw.",
    },
    32: {
        "sister-who": "My sister, who lives in Madrid, is a teacher.",
        "river-which": "The river, which flows through the city, is polluted.",
        "recycling-which": "Recycling, which helps reduce pollution, is important.",
        "climate-which": "Climate change, which affects us all, is a global problem.",
        "no-that": "Do not use that in non-defining clauses.",
        "reading-env": "My sister, who lives in Madrid, is a teacher. The river, which flows through the city, is polluted. Recycling, which helps reduce pollution, is important. Climate change, which affects us all, is a global problem.",
        "dialogue-env": "Where does your sister live? In Madrid. Is the river clean? No, it is polluted. Do you recycle? Yes, recycling is important.",
        "practice-four": "My sister, who lives in Madrid. The river, which is polluted. Recycling, which helps. Climate change, which affects us all.",
    },
    33: {
        "isnt-it": "It's a nice day, isn't it?",
        "dont-you": "You like this restaurant, don't you?",
        "doesnt-she": "She works at the bank, doesn't she?",
        "have-they": "They haven't finished yet, have they?",
        "arent-you": "You're free tomorrow, aren't you?",
        "reading-services": "It's a nice day, isn't it? You like this restaurant, don't you? She works at the bank, doesn't she? They haven't finished yet, have they? You're free tomorrow, aren't you?",
        "dialogue-services": "Nice day, isn't it? Yes. You like this cafe, don't you? I do. She works at the bank, doesn't she? Yes. Free tomorrow, aren't you? I am.",
        "practice-four": "Nice day, isn't it? You like it, don't you? She works here, doesn't she? They haven't finished, have they?",
    },
    34: {
        "bored-boring": "I was bored because the film was boring.",
        "exciting-excited": "The news was exciting. I felt excited.",
        "worried": "She was worried about the exam.",
        "match-exciting": "The match was exciting. We were excited.",
        "interesting": "The book is interesting. I am interested.",
        "reading-feelings": "I was bored because the film was boring. The news was exciting and I felt excited. She was worried about the exam. The match was exciting and we were excited.",
        "dialogue-feelings": "Was the film boring? Yes, I was bored. Was the news exciting? Yes, I felt excited. Are you worried? A little.",
        "practice-four": "I was bored. The film was boring. The news was exciting. I felt excited.",
    },
    35: {
        "review-defining": "The park that we visited was beautiful.",
        "review-nondef": "Madrid, which is busy, is my home city.",
        "review-tag": "You're free tomorrow, aren't you?",
        "review-eding": "I felt excited. The trip was exciting.",
        "review-who": "Anyone who loves wildlife should visit this park.",
        "reading-mix": "The park that we visited was beautiful. Madrid, which is busy, is my home city. You're free tomorrow, aren't you? I felt excited because the trip was exciting. Anyone who loves wildlife should visit this park.",
        "dialogue-mix": "Which park did you visit? The one that is near the river. Madrid is busy, isn't it? Yes. Are you excited? Yes, the trip is exciting.",
        "practice-mix": "The park that we visited. Madrid, which is busy. Free tomorrow, aren't you? Excited — exciting.",
    },
}


def make_audios():
    for unit, clips in AUDIOS.items():
        d = ROOT / f"public/audio/blog/curso-b1/unit-{unit}"
        d.mkdir(parents=True, exist_ok=True)
        for name, text in clips.items():
            path = d / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def write_md(name: str, body: str) -> None:
    path = OUT_MD / name
    if not body.endswith("\n"):
        body += "\n"
    path.write_text(body, encoding="utf-8")
    print("md", path.relative_to(ROOT))


def article(**kw) -> str:
    keywords = "\n".join(f"  - {k}" for k in kw["keywords"] + BING)
    related = "\n".join(f"  - {r}" for r in kw["related"])
    faqs = "\n".join(f"  - question: {q}\n    answer: >-\n      {a}" for q, a in kw["faqs"])
    learn = "\n".join(f"- {x}" for x in kw["learn"])
    guides = "\n".join(f"- {g}" for g in kw["guides"])
    return f"""---
category: curso-b1
date: '{DATE}'
updatedDate: '{DATE}'
author: linguafly-team
title: '{kw["title"]}'
description: >-
  {kw["description"]}
readTime: 15 min
keywords:
{keywords}
canonical: 'https://linguafly.app/blog/curso-b1/{kw["slug"]}'
image: {kw["image"]}
alt: '{kw["alt"]}'
related_routes:
{related}
faqs:
{faqs}
excerpt: >-
  {kw["excerpt"]}
---
{kw["intro"]}

> **Practica en el curso:** [Unidad {kw["unit"]}](/curso-b1/unit-{kw["unit"]})  
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

## Practica ahora

1. Repasa los ejemplos en voz alta.  
2. Practica en la [Unidad {kw["unit"]} del curso B1](/curso-b1/unit-{kw["unit"]}).

Curso:

- {kw["next_course"]}

Guía teórica siguiente:

- {kw["next_blog"]}

Guías relacionadas:

{guides}

---

## Fuentes

- CEFR B1 · Cambridge B1 Preliminary · British Council — Relative clauses, question tags & adjectives
"""


def make_articles():
    write_md(
        "unidad-31-defining-relative-nature.md",
        article(
            slug="unidad-31-defining-relative-nature",
            unit=31,
            title="Defining Relative Clauses B1 + The Natural World",
            description="Aprende oraciones de relativo especificativas (who/which/that) en inglés B1 con vocabulario de naturaleza. Guía Unidad 31 con audios.",
            image="/blog/curso-b1/unit-31/defining-relative.png",
            alt="Defining relative clauses B1",
            keywords=["defining relative clauses B1", "who which that", "natural world vocabulary", "relative clauses English", "inglés B1 unidad 31"],
            related=["unidad-30-repaso-26-29", "unidad-32-nondefining-relative-environment", "cursos-online-ingles-b1"],
            faqs=[
                ("¿who o which?", "who/that para personas; which/that para cosas y animales."),
                ("¿puedo omitir that?", "Sí, si es objeto: the book (that) I bought…"),
                ("¿Dónde practico?", "En la [Unidad 31 del curso B1](/curso-b1/unit-31)."),
            ],
            excerpt="Guía de la Unidad 31 del curso B1: defining relative clauses y natural world.",
            intro="Tras el [Repaso 26–29](/blog/curso-b1/unidad-30-repaso-26-29), la **Unidad 31** abre el Módulo 4 con **relative clauses especificativas** y vocabulario del **mundo natural**.",
            before="[U30 — Repaso 26–29](/blog/curso-b1/unidad-30-repaso-26-29)",
            learn=["**who / that** (personas)", "**which / that** (cosas/animales)", "Vocabulario: wildlife, landscape, forest, eagle…"],
            sections=r"""## 1. Mapa rápido

| Relativo | Uso | Ejemplo |
| :--- | :--- | :--- |
| **who / that** | personas | the woman **who** lives next door |
| **which / that** | cosas / animales | animals **that** live in the wild |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-31/who-lives.mp3" title="🔊 who"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-31/which-bought.mp3" title="🔊 which"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-31/that-wild.mp3" title="🔊 that"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-31/landscape-that.mp3" title="🔊 landscape"></audio>

---

## 2. Más ejemplos

> The bird **which** I saw was an eagle.  
> Anyone **who** loves wildlife should visit this park.  
> The river **that** flows through the valley is clean.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-31/bird-which.mp3" title="🔊 bird"></audio>

---

## 3. Vocabulario: The natural world

![Nature vocab](/blog/curso-b1/unit-31/nature-vocab.png)

| Word | Idea |
| :--- | :--- |
| bear / eagle / bird / wildlife | animales / fauna |
| landscape / river / valley / forest | paisaje |
| plants / park / wild / nature | plantas / naturaleza |

---

## 4. Reading

![Nature scene](/blog/curso-b1/unit-31/nature-scene.png)

> The woman who lives next door is a vet. Animals that live in the wild are free. The landscape that we visited was breathtaking. The bird which I saw was an eagle. Anyone who loves wildlife should visit this park.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-31/reading-nature.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-31/dialogue-nature.mp3" title="🔊 Dialogue"></audio>

> Who lives next door? — A vet.  
> Which bird did you see? — An eagle.  
> Do you love wildlife? — Yes.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-31/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. The woman ___ lives next door is a vet.  
2. The book ___ I bought is interesting.  
3. Animals ___ live in the wild are free.  
4. The bird ___ I saw was an eagle.  
5. Vocab: fauna = ___ · paisaje = ___

<details><summary>Ver solución</summary>

1. **who / that** · 2. **which / that** · 3. **that / which** · 4. **which / that** · 5. **wildlife** · **landscape**
</details>""",
            tip="Sin comas = información **necesaria** para saber de quién/qué hablamos. *that* es muy frecuente en defining clauses.",
            next_course="[Unidad 32 — Non-defining relative](/curso-b1/unit-32)",
            next_blog="[U32 — Non-defining + environment](/blog/curso-b1/unidad-32-nondefining-relative-environment)",
            guides=["[U30 — Repaso 26–29](/blog/curso-b1/unidad-30-repaso-26-29)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
        ),
    )

    write_md(
        "unidad-32-nondefining-relative-environment.md",
        article(
            slug="unidad-32-nondefining-relative-environment",
            unit=32,
            title="Non-defining Relative Clauses B1 + Environment",
            description="Aprende relative clauses explicativas (who/which + comas, sin that) en inglés B1 con vocabulario de medio ambiente. Guía Unidad 32 con audios.",
            image="/blog/curso-b1/unit-32/nondefining-relative.png",
            alt="Non-defining relative clauses B1",
            keywords=["non-defining relative clauses B1", "who which commas", "environment vocabulary", "no that relative", "inglés B1 unidad 32"],
            related=["unidad-31-defining-relative-nature", "unidad-33-question-tags-services", "cursos-online-ingles-b1"],
            faqs=[
                ("¿puedo usar that?", "No en non-defining: solo who/which + comas."),
                ("¿para qué sirven las comas?", "Marcan información extra; si quitas la cláusula, la frase sigue clara."),
                ("¿Dónde practico?", "En la [Unidad 32 del curso B1](/curso-b1/unit-32)."),
            ],
            excerpt="Guía de la Unidad 32 del curso B1: non-defining relative clauses y environment.",
            intro="Tras la [Unidad 31](/blog/curso-b1/unidad-31-defining-relative-nature), la **Unidad 32** introduce las **relative clauses explicativas** (con comas) y vocabulario de **medio ambiente**.",
            before="[U31 — Defining relative](/blog/curso-b1/unidad-31-defining-relative-nature)",
            learn=["**who / which + comas**", "**no uses that**", "Vocabulario: recycle, pollution, climate…"],
            sections=r"""## 1. Regla clave

| Tipo | Comas | that? | Ejemplo |
| :--- | :--- | :--- | :--- |
| Defining | no | sí | the river **that** is polluted |
| Non-defining | sí | **no** | The river, **which** is polluted, … |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-32/sister-who.mp3" title="🔊 who"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-32/river-which.mp3" title="🔊 which"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-32/recycling-which.mp3" title="🔊 recycling"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-32/climate-which.mp3" title="🔊 climate"></audio>

---

## 2. Más ejemplos

> Climate change, **which** affects us all, is a global problem.  
> Do **not** use *that* in non-defining clauses.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-32/no-that.mp3" title="🔊 no that"></audio>

---

## 3. Vocabulario: Environment

![Environment vocab](/blog/curso-b1/unit-32/environment-vocab.png)

| Word | Idea |
| :--- | :--- |
| recycle / reduce / waste / plastic | reciclaje / residuos |
| pollution / climate / planet / global | contaminación / clima |
| protect / energy / nature / green | proteger / energía |

---

## 4. Reading

![Environment scene](/blog/curso-b1/unit-32/environment-scene.png)

> My sister, who lives in Madrid, is a teacher. The river, which flows through the city, is polluted. Recycling, which helps reduce pollution, is important. Climate change, which affects us all, is a global problem.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-32/reading-env.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-32/dialogue-env.mp3" title="🔊 Dialogue"></audio>

> Where does your sister live? — In Madrid.  
> Is the river clean? — No, it is polluted.  
> Do you recycle? — Yes.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-32/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. My sister, ___ lives in Madrid, is a teacher.  
2. The river, ___ flows through the city, is polluted.  
3. Recycling, ___ helps reduce pollution, is important.  
4. ¿Puedo usar *that* aquí?  
5. Vocab: reciclar = ___ · contaminación = ___

<details><summary>Ver solución</summary>

1. **who** · 2. **which** · 3. **which** · 4. **No** · 5. **recycle** · **pollution**
</details>""",
            tip="Si conoces ya a la persona/cosa (*my sister*, *Madrid*, *climate change*), usa **comas** y **who/which** — nunca *that*.",
            next_course="[Unidad 33 — Question tags](/curso-b1/unit-33)",
            next_blog="[U33 — Question tags + services](/blog/curso-b1/unidad-33-question-tags-services)",
            guides=["[U31](/blog/curso-b1/unidad-31-defining-relative-nature)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
        ),
    )

    write_md(
        "unidad-33-question-tags-services.md",
        article(
            slug="unidad-33-question-tags-services",
            unit=33,
            title="Question Tags B1 + Services",
            description="Aprende question tags (isn't it?, don't you?) en inglés B1 con vocabulario de servicios. Guía Unidad 33 con audios.",
            image="/blog/curso-b1/unit-33/question-tags.png",
            alt="Question tags B1",
            keywords=["question tags B1", "isn't it don't you", "services vocabulary", "tag questions English", "inglés B1 unidad 33"],
            related=["unidad-32-nondefining-relative-environment", "unidad-34-ed-ing-adjectives-feelings", "cursos-online-ingles-b1"],
            faqs=[
                ("¿regla básica?", "Afirmación → tag negativa; negación → tag positiva."),
                ("¿con have/has?", "They haven't finished, **have they**?"),
                ("¿Dónde practico?", "En la [Unidad 33 del curso B1](/curso-b1/unit-33)."),
            ],
            excerpt="Guía de la Unidad 33 del curso B1: question tags y services.",
            intro="Tras la [Unidad 32](/blog/curso-b1/unidad-32-nondefining-relative-environment), la **Unidad 33** trabaja **question tags** con vocabulario de **servicios**.",
            before="[U32 — Non-defining](/blog/curso-b1/unidad-32-nondefining-relative-environment)",
            learn=["**+ → −** y **− → +**", "Tags con *be / do / have*", "Vocabulario: bank, doctor, restaurant, appointment…"],
            sections=r"""## 1. Mapa rápido

| Frase | Tag |
| :--- | :--- |
| It's nice, | **isn't it?** |
| You like it, | **don't you?** |
| She works here, | **doesn't she?** |
| They haven't finished, | **have they?** |
| You're free, | **aren't you?** |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-33/isnt-it.mp3" title="🔊 isn't it"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-33/dont-you.mp3" title="🔊 don't you"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-33/doesnt-she.mp3" title="🔊 doesn't she"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-33/have-they.mp3" title="🔊 have they"></audio>

---

## 2. Más ejemplos

> You're free tomorrow, **aren't you?**

<audio controls preload="none" src="/audio/blog/curso-b1/unit-33/arent-you.mp3" title="🔊 aren't you"></audio>

---

## 3. Vocabulario: Services

![Services vocab](/blog/curso-b1/unit-33/services-vocab.png)

| Word | Idea |
| :--- | :--- |
| bank / post office / pharmacy | servicios |
| doctor / dentist / appointment | salud |
| restaurant / cafe / hotel / taxi | ocio / viajes |

---

## 4. Reading

![Services scene](/blog/curso-b1/unit-33/services-scene.png)

> It's a nice day, isn't it? You like this restaurant, don't you? She works at the bank, doesn't she? They haven't finished yet, have they? You're free tomorrow, aren't you?

<audio controls preload="none" src="/audio/blog/curso-b1/unit-33/reading-services.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-33/dialogue-services.mp3" title="🔊 Dialogue"></audio>

> Nice day, isn't it? — Yes.  
> You like this cafe, don't you? — I do.  
> Free tomorrow, aren't you? — I am.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-33/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. It's a nice day, ___?  
2. You like this restaurant, ___?  
3. She works at the bank, ___?  
4. They haven't finished, ___?  
5. Vocab: banco = ___ · cita = ___

<details><summary>Ver solución</summary>

1. **isn't it** · 2. **don't you** · 3. **doesn't she** · 4. **have they** · 5. **bank** · **appointment**
</details>""",
            tip="Copia el auxiliar de la frase principal y cámbiale el signo (+/−). Si no hay auxiliar, usa *do/does/did*.",
            next_course="[Unidad 34 — -ed/-ing adjectives](/curso-b1/unit-34)",
            next_blog="[U34 — -ed/-ing + feelings](/blog/curso-b1/unidad-34-ed-ing-adjectives-feelings)",
            guides=["[U32](/blog/curso-b1/unidad-32-nondefining-relative-environment)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
        ),
    )

    write_md(
        "unidad-34-ed-ing-adjectives-feelings.md",
        article(
            slug="unidad-34-ed-ing-adjectives-feelings",
            unit=34,
            title="-Ed/-ing Adjectives B1 + Personal Feelings",
            description="Aprende adjetivos -ed/-ing (bored/boring, excited/exciting) en inglés B1 con sentimientos. Guía Unidad 34 con audios.",
            image="/blog/curso-b1/unit-34/ed-ing-adjectives.png",
            alt="-ed -ing adjectives B1",
            keywords=["ed ing adjectives B1", "bored boring", "excited exciting", "personal feelings vocabulary", "inglés B1 unidad 34"],
            related=["unidad-33-question-tags-services", "unidad-35-repaso-31-34", "cursos-online-ingles-b1"],
            faqs=[
                ("¿bored o boring?", "-ed = cómo te sientes; -ing = qué lo causa."),
                ("¿más pares?", "interested/interesting, worried/worrying, tired/tiring, surprised/surprising…"),
                ("¿Dónde practico?", "En la [Unidad 34 del curso B1](/curso-b1/unit-34)."),
            ],
            excerpt="Guía de la Unidad 34 del curso B1: -ed/-ing adjectives y feelings.",
            intro="Tras la [Unidad 33](/blog/curso-b1/unidad-33-question-tags-services), la **Unidad 34** contrasta adjetivos **-ed / -ing** con vocabulario de **sentimientos**.",
            before="[U33 — Question tags](/blog/curso-b1/unidad-33-question-tags-services)",
            learn=["**-ed** = sentimiento", "**-ing** = causa", "Vocabulario: bored, excited, worried, surprised…"],
            sections=r"""## 1. Contraste

| -ed (feeling) | -ing (cause) |
| :--- | :--- |
| I was **bored** | The film was **boring** |
| I felt **excited** | The news was **exciting** |
| She was **worried** | The exam was **worrying** |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-34/bored-boring.mp3" title="🔊 bored/boring"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-34/exciting-excited.mp3" title="🔊 exciting/excited"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-34/worried.mp3" title="🔊 worried"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-34/match-exciting.mp3" title="🔊 match"></audio>

---

## 2. Más ejemplos

> The book is **interesting**. I am **interested**.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-34/interesting.mp3" title="🔊 interesting"></audio>

---

## 3. Vocabulario: Personal feelings

![Feelings vocab](/blog/curso-b1/unit-34/feelings-vocab.png)

| Word | Idea |
| :--- | :--- |
| bored / excited / worried / nervous | estados |
| surprised / amazed / disappointed / pleased | reacciones |
| relaxed / confused / annoyed / frightened | más matices |

---

## 4. Reading

![Feelings scene](/blog/curso-b1/unit-34/feelings-scene.png)

> I was bored because the film was boring. The news was exciting and I felt excited. She was worried about the exam. The match was exciting and we were excited.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-34/reading-feelings.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-34/dialogue-feelings.mp3" title="🔊 Dialogue"></audio>

> Was the film boring? — Yes, I was bored.  
> Was the news exciting? — Yes, I felt excited.  
> Are you worried? — A little.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-34/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I was ___ / the film was ___. *(bored/boring)*  
2. The news was ___ / I felt ___.  
3. She was ___ about the exam.  
4. The match was ___ / we were ___.  
5. Vocab: emocionado = ___ · preocupada = ___

<details><summary>Ver solución</summary>

1. **bored / boring** · 2. **exciting / excited** · 3. **worried** · 4. **exciting / excited** · 5. **excited** · **worried**
</details>""",
            tip="Pregunta: ¿hablo de **cómo me siento** (-ed) o de **la cosa/persona que causa** el sentimiento (-ing)?",
            next_course="[Unidad 35 — Repaso 31–34](/curso-b1/unit-35)",
            next_blog="[U35 — Repaso 31–34](/blog/curso-b1/unidad-35-repaso-31-34)",
            guides=["[U33](/blog/curso-b1/unidad-33-question-tags-services)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
        ),
    )

    write_md(
        "unidad-35-repaso-31-34.md",
        article(
            slug="unidad-35-repaso-31-34",
            unit=35,
            title="Repaso B1 Unidades 31–34: Relatives, Tags & -ed/-ing",
            description="Repaso integrado B1: defining/non-defining relatives, question tags y -ed/-ing. Guía Unidad 35 con audios.",
            image="/blog/curso-b1/unit-35/review-map.png",
            alt="Repaso B1 unidades 31-34",
            keywords=["repaso B1 31-34", "relative clauses review", "question tags review", "ed ing adjectives review", "inglés B1 unidad 35"],
            related=["unidad-34-ed-ing-adjectives-feelings", "unidad-30-repaso-26-29", "cursos-online-ingles-b1"],
            faqs=[
                ("¿Qué repasa la U35?", "Defining/non-defining relatives, question tags y -ed/-ing de U31–34."),
                ("¿Cómo estudiar?", "Mapa + audios mixtos + ejercicios del curso."),
                ("¿Dónde practico?", "En la [Unidad 35 del curso B1](/curso-b1/unit-35)."),
            ],
            excerpt="Guía de repaso de la Unidad 35 del curso B1 (contenidos 31–34).",
            intro="La **Unidad 35** cierra la primera mitad del Módulo 4: integra [defining](/blog/curso-b1/unidad-31-defining-relative-nature), [non-defining](/blog/curso-b1/unidad-32-nondefining-relative-environment), [tags](/blog/curso-b1/unidad-33-question-tags-services) y [-ed/-ing](/blog/curso-b1/unidad-34-ed-ing-adjectives-feelings).",
            before="[U34 — -ed/-ing](/blog/curso-b1/unidad-34-ed-ing-adjectives-feelings)",
            learn=["Repaso **who/which/that**", "Repaso **comas / no that**", "Repaso **question tags**", "Repaso **-ed / -ing**"],
            sections=r"""## 1. Mapa del repaso

![Review map](/blog/curso-b1/unit-35/review-map.png)

| Unidad | Foco |
| :--- | :--- |
| 31 | Defining relative + nature |
| 32 | Non-defining + environment |
| 33 | Question tags + services |
| 34 | -ed/-ing + feelings |

---

## 2. Ejemplos mixtos

![Mixed examples](/blog/curso-b1/unit-35/review-examples.png)

> The park **that** we visited was beautiful.  
> Madrid, **which** is busy, is my home city.  
> You're free tomorrow, **aren't you?**  
> I felt **excited** — the trip was **exciting**.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-35/review-defining.mp3" title="🔊 defining"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-35/review-nondef.mp3" title="🔊 non-defining"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-35/review-tag.mp3" title="🔊 tag"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-35/review-eding.mp3" title="🔊 -ed/-ing"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-35/review-who.mp3" title="🔊 who"></audio>

---

## 3. Reading mixto

> The park that we visited was beautiful. Madrid, which is busy, is my home city. You're free tomorrow, aren't you? I felt excited because the trip was exciting. Anyone who loves wildlife should visit this park.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-35/reading-mix.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-35/dialogue-mix.mp3" title="🔊 Dialogue"></audio>

> Which park did you visit? — The one that is near the river.  
> Madrid is busy, isn't it? — Yes.  
> Are you excited? — Yes, the trip is exciting.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-35/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios exprés

1. The park ___ we visited was beautiful.  
2. Madrid, ___ is busy, is my home city.  
3. You're free tomorrow, ___?  
4. I felt ___ / the trip was ___.  
5. Anyone ___ loves wildlife should visit.

<details><summary>Ver solución</summary>

1. **that / which** · 2. **which** · 3. **aren't you** · 4. **excited / exciting** · 5. **who / that**
</details>""",
            tip="Antes de elegir: ¿info necesaria o extra? ¿+ o −? ¿sentimiento o causa?",
            next_course="[Unidad 36 — So/such](/curso-b1/unit-36)",
            next_blog="Módulo 4 (U36+) — próximamente",
            guides=["[U31](/blog/curso-b1/unidad-31-defining-relative-nature)", "[U32](/blog/curso-b1/unidad-32-nondefining-relative-environment)", "[U33](/blog/curso-b1/unidad-33-question-tags-services)", "[U34](/blog/curso-b1/unidad-34-ed-ing-adjectives-feelings)"],
        ),
    )


def main():
    diagrams()
    make_audios()
    make_articles()
    print("done U31–35 theory")


if __name__ == "__main__":
    main()
