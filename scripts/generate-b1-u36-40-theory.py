#!/usr/bin/env python3
"""Generate B1 theory U36–40: diagrams, markdown, TTS audios."""
from __future__ import annotations
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT_MD = ROOT / "src/content/blog/curso-b1"
DATE = "2026-08-31"
BG, INK, ACCENT, CARD, LINE = (245, 248, 252), (20, 35, 55), (15, 110, 140), (255, 255, 255), (200, 215, 230)
BING = ["curso de inglés gratis", "aprender inglés gratis", "curso de inglés online gratis", "curso inglés B1 gratis"]


def font(size: int, bold: bool = False):
    for c in [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]:
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
    img, d = canvas(); title(d, "So / such / so much / so many")
    card(d, (48, 110, 580, 600)); d.text((72, 140), "so + adjective", fill=ACCENT, font=font(26, True))
    for i, t in enumerate(["so tired", "so interesting", "so expensive", "so happy"]):
        d.text((72, 220 + i * 70), f"• {t}", fill=INK, font=font(24))
    card(d, (640, 110, 1150, 600)); d.text((664, 140), "such + (a/an) + noun", fill=ACCENT, font=font(24, True))
    for i, t in enumerate(["such a nice day", "such an interesting book", "so much work", "so many people"]):
        d.text((664, 220 + i * 70), f"• {t}", fill=INK, font=font(22))
    save(img, 36, "so-such.png")

    img, d = canvas(); title(d, "Intensifiers")
    words = ["very", "really", "extremely", "absolutely", "quite", "totally", "incredibly", "fairly", "pretty", "completely", "so", "such"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 24, y + 48), w, fill=INK, font=font(22, True))
    save(img, 36, "intensifiers-vocab.png")

    img, d = canvas(); title(d, "So strong!")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(["I'm so tired today.", "It was such a nice day.", "There is so much work.", "There are so many people."]):
        d.text((80, 180 + i * 80), f"{i+1}. {t}", fill=INK, font=font(26))
    save(img, 36, "intensifiers-scene.png")

    img, d = canvas(); title(d, "Compound adjectives")
    items = [("a two-day trip", "viaje de dos días"), ("a 20-year-old student", "estudiante de 20 años"), ("a well-known hotel", "hotel conocido"), ("a long-distance flight", "vuelo de larga distancia"), ("an open-minded traveller", "viajero de mente abierta")]
    for i, (en, es) in enumerate(items):
        y = 120 + i * 100; card(d, (48, y, 1150, y + 85))
        d.text((72, y + 22), en, fill=ACCENT, font=font(24, True)); d.text((620, y + 22), es, fill=INK, font=font(22))
    save(img, 37, "compound-adjectives.png")

    img, d = canvas(); title(d, "Travel & descriptions")
    words = ["flight", "journey", "luggage", "passport", "booking", "resort", "guidebook", "sightseeing", "delay", "destination", "scenic", "crowded"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 16, y + 48), w, fill=INK, font=font(20, True))
    save(img, 37, "travel-vocab.png")

    img, d = canvas(); title(d, "On the road")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(["We booked a two-day trip.", "She's a 20-year-old student.", "We stayed in a well-known hotel.", "It was a long-distance flight."]):
        d.text((80, 180 + i * 80), f"• {t}", fill=INK, font=font(26))
    save(img, 37, "travel-scene.png")

    img, d = canvas(); title(d, "Clauses of contrast")
    items = [("although / though", "aunque + cláusula"), ("however", "sin embargo (nueva frase)"), ("but", "pero (unión simple)"), ("despite / in spite of", "a pesar de + nombre/-ing"), ("even though", "aunque (énfasis)")]
    for i, (en, es) in enumerate(items):
        y = 120 + i * 100; card(d, (48, y, 1150, y + 85))
        d.text((72, y + 22), en, fill=ACCENT, font=font(24, True)); d.text((520, y + 22), es, fill=INK, font=font(22))
    save(img, 38, "contrast.png")

    img, d = canvas(); title(d, "Opinions")
    words = ["agree", "disagree", "opinion", "point of view", "in my view", "personally", "fair", "unfair", "convincing", "doubt", "prefer", "support"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 16, y + 48), w, fill=INK, font=font(20, True))
    save(img, 38, "opinions-vocab.png")

    img, d = canvas(); title(d, "I see it differently")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(["Although it was raining, we went out.", "I like the idea. However, it's expensive.", "Even though I disagree, I respect you.", "Despite the delay, we arrived on time."]):
        d.text((80, 180 + i * 80), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 38, "opinions-scene.png")

    img, d = canvas(); title(d, "Purpose & reason")
    card(d, (48, 110, 580, 600)); d.text((72, 140), "Purpose", fill=ACCENT, font=font(28, True))
    for i, t in enumerate(["to + infinitive", "in order to", "so that + clause"]):
        d.text((72, 230 + i * 90), f"• {t}", fill=INK, font=font(24))
    card(d, (640, 110, 1150, 600)); d.text((664, 140), "Reason", fill=ACCENT, font=font(28, True))
    for i, t in enumerate(["because + clause", "because of + noun", "due to + noun"]):
        d.text((664, 230 + i * 90), f"• {t}", fill=INK, font=font(24))
    save(img, 39, "purpose-reason.png")

    img, d = canvas(); title(d, "Explaining")
    words = ["explain", "reason", "purpose", "goal", "cause", "result", "therefore", "so", "in order to", "because of", "due to", "so that"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 16, y + 48), w, fill=INK, font=font(20, True))
    save(img, 39, "explaining-vocab.png")

    img, d = canvas(); title(d, "Why & what for")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(["I study English to travel more.", "We left early in order to avoid traffic.", "I called so that you wouldn't worry.", "We stayed inside because of the storm."]):
        d.text((80, 180 + i * 80), f"• {t}", fill=INK, font=font(24))
    save(img, 39, "explaining-scene.png")

    img, d = canvas(); title(d, "Review 36–39")
    items = [("U36", "So / such"), ("U37", "Compound adj."), ("U38", "Contrast"), ("U39", "Purpose/reason")]
    for i, (u, label) in enumerate(items):
        x = 48 + i * 280; card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), u, fill=ACCENT, font=font(34, True)); d.text((x + 24, 260), label, fill=INK, font=font(20))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "so/such · two-day · although/however · to / because of", fill=INK, font=font(22))
    d.text((72, 520), "Vocab: intensifiers · travel · opinions · explaining", fill=INK, font=font(22))
    save(img, 40, "review-map.png")

    img, d = canvas(); title(d, "Mixed examples")
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate([
        "It was such a long journey. (so/such)",
        "We took a two-day trip. (compound)",
        "Although I was tired, I went out. (contrast)",
        "I left early to catch the train. (purpose)",
        "We stayed in because of the rain. (reason)",
    ]):
        d.text((80, 160 + i * 75), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 40, "review-examples.png")


AUDIOS = {
    36: {
        "so-tired": "I'm so tired today.",
        "such-a-nice": "It was such a nice day.",
        "so-much": "There is so much work.",
        "so-many": "There are so many people.",
        "so-expensive": "This hotel is so expensive.",
        "reading-int": "I'm so tired today. It was such a nice day. There is so much work. There are so many people. This hotel is so expensive.",
        "dialogue-int": "Are you so tired? Yes. Was it such a nice day? Yes. Is there so much work? Unfortunately yes.",
        "practice-four": "So tired. Such a nice day. So much work. So many people.",
    },
    37: {
        "two-day": "We booked a two-day trip.",
        "twenty-year": "She's a 20-year-old student.",
        "well-known": "We stayed in a well-known hotel.",
        "long-distance": "It was a long-distance flight.",
        "open-minded": "He's an open-minded traveller.",
        "reading-travel": "We booked a two-day trip. She's a 20-year-old student. We stayed in a well-known hotel. It was a long-distance flight. He's an open-minded traveller.",
        "dialogue-travel": "How long is the trip? Two days. Is the hotel well-known? Yes. Was it a long-distance flight? Yes.",
        "practice-four": "A two-day trip. A 20-year-old student. A well-known hotel. A long-distance flight.",
    },
    38: {
        "although": "Although it was raining, we went out.",
        "however": "I like the idea. However, it's expensive.",
        "even-though": "Even though I disagree, I respect you.",
        "despite": "Despite the delay, we arrived on time.",
        "though": "Though I was tired, I finished the work.",
        "reading-opinions": "Although it was raining, we went out. I like the idea. However, it's expensive. Even though I disagree, I respect you. Despite the delay, we arrived on time.",
        "dialogue-opinions": "Shall we go out although it's raining? Yes. Is it expensive? However, I still like it. Do you disagree? Even though I disagree, I respect you.",
        "practice-four": "Although it was raining. However, it's expensive. Even though I disagree. Despite the delay.",
    },
    39: {
        "to-travel": "I study English to travel more.",
        "in-order-to": "We left early in order to avoid traffic.",
        "so-that": "I called so that you wouldn't worry.",
        "because-of": "We stayed inside because of the storm.",
        "due-to": "The delay was due to the weather.",
        "reading-explain": "I study English to travel more. We left early in order to avoid traffic. I called so that you wouldn't worry. We stayed inside because of the storm. The delay was due to the weather.",
        "dialogue-explain": "Why do you study English? To travel more. Why leave early? In order to avoid traffic. Why call? So that you wouldn't worry.",
        "practice-four": "To travel more. In order to avoid traffic. So that you wouldn't worry. Because of the storm.",
    },
    40: {
        "review-such": "It was such a long journey.",
        "review-compound": "We took a two-day trip.",
        "review-although": "Although I was tired, I went out.",
        "review-to": "I left early to catch the train.",
        "review-because-of": "We stayed in because of the rain.",
        "reading-mix": "It was such a long journey. We took a two-day trip. Although I was tired, I went out. I left early to catch the train. We stayed in because of the rain.",
        "dialogue-mix": "Was it such a long journey? Yes. A two-day trip? Yes. Although you were tired? I still went out. Why leave early? To catch the train.",
        "practice-mix": "Such a long journey. A two-day trip. Although I was tired. To catch the train. Because of the rain.",
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
    path.write_text(body if body.endswith("\n") else body + "\n", encoding="utf-8")
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

- CEFR B1 · Cambridge B1 Preliminary · British Council — Intensifiers, adjectives & clauses
"""


def make_articles():
    write_md("unidad-36-so-such-intensifiers.md", article(
        slug="unidad-36-so-such-intensifiers", unit=36,
        title="So, Such, So Much, So Many B1 + Intensifiers",
        description="Aprende so/such/so much/so many en inglés B1 con intensificadores. Guía Unidad 36 con audios.",
        image="/blog/curso-b1/unit-36/so-such.png", alt="So such intensifiers B1",
        keywords=["so such B1", "so much so many", "intensifiers English", "such a", "inglés B1 unidad 36"],
        related=["unidad-35-repaso-31-34", "unidad-37-compound-adjectives-travel", "cursos-online-ingles-b1"],
        faqs=[("¿so o such?", "so + adjetivo; such (+ a/an) + nombre."), ("¿so much o so many?", "so much + incontables; so many + contables."), ("¿Dónde practico?", "En la [Unidad 36 del curso B1](/curso-b1/unit-36).")],
        excerpt="Guía de la Unidad 36 del curso B1: so/such e intensifiers.",
        intro="Tras el [Repaso 31–34](/blog/curso-b1/unidad-35-repaso-31-34), la **Unidad 36** trabaja **so / such / so much / so many** y **intensificadores**.",
        before="[U35 — Repaso 31–34](/blog/curso-b1/unidad-35-repaso-31-34)",
        learn=["**so + adj**", "**such (a/an) + noun**", "**so much / so many**", "Vocabulario: very, really, extremely…"],
        sections=r"""## 1. Mapa rápido

| Forma | Ejemplo |
| :--- | :--- |
| **so** + adj | I'm **so** tired. |
| **such a/an** + adj + noun | **such a** nice day |
| **so much** + uncountable | **so much** work |
| **so many** + countable | **so many** people |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-36/so-tired.mp3" title="🔊 so"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-36/such-a-nice.mp3" title="🔊 such"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-36/so-much.mp3" title="🔊 so much"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-36/so-many.mp3" title="🔊 so many"></audio>

---

## 2. Más ejemplos

> This hotel is **so** expensive.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-36/so-expensive.mp3" title="🔊 expensive"></audio>

---

## 3. Vocabulario: Intensifiers

![Intensifiers](/blog/curso-b1/unit-36/intensifiers-vocab.png)

| Word | Idea |
| :--- | :--- |
| very / really / extremely / incredibly | intensidad |
| quite / fairly / pretty | bastante |
| absolutely / totally / completely | total |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-36/intensifiers-scene.png)

> I'm so tired today. It was such a nice day. There is so much work. There are so many people. This hotel is so expensive.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-36/reading-int.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-36/dialogue-int.mp3" title="🔊 Dialogue"></audio>

> Are you so tired? — Yes.  
> Was it such a nice day? — Yes.  
> Is there so much work? — Unfortunately yes.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-36/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I'm ___ tired.  
2. It was ___ nice day.  
3. There is ___ work.  
4. There are ___ people.  
5. Vocab: extremadamente = ___

<details><summary>Ver solución</summary>

1. **so** · 2. **such a** · 3. **so much** · 4. **so many** · 5. **extremely**
</details>""",
        tip="Tras *such* casi siempre hay **nombre** (*such a day*). Tras *so*, **adjetivo** (*so tired*).",
        next_course="[Unidad 37 — Compound adjectives](/curso-b1/unit-37)",
        next_blog="[U37 — Compound adjectives + travel](/blog/curso-b1/unidad-37-compound-adjectives-travel)",
        guides=["[U35](/blog/curso-b1/unidad-35-repaso-31-34)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-37-compound-adjectives-travel.md", article(
        slug="unidad-37-compound-adjectives-travel", unit=37,
        title="Compound Adjectives B1 + Travel & Descriptions",
        description="Aprende adjetivos compuestos (a two-day trip, a 20-year-old) en inglés B1 con viajes. Guía Unidad 37 con audios.",
        image="/blog/curso-b1/unit-37/compound-adjectives.png", alt="Compound adjectives B1",
        keywords=["compound adjectives B1", "two-day trip", "20-year-old", "travel vocabulary", "inglés B1 unidad 37"],
        related=["unidad-36-so-such-intensifiers", "unidad-38-contrast-opinions", "cursos-online-ingles-b1"],
        faqs=[("¿guion?", "Sí en adjetivo delante del nombre: a two-day trip."), ("¿plural en el compuesto?", "No: a **two-day** trip (no *two-days*)."), ("¿Dónde practico?", "En la [Unidad 37 del curso B1](/curso-b1/unit-37).")],
        excerpt="Guía de la Unidad 37 del curso B1: compound adjectives y travel.",
        intro="Tras la [Unidad 36](/blog/curso-b1/unidad-36-so-such-intensifiers), la **Unidad 37** presenta **adjetivos compuestos** con vocabulario de **viaje y descripciones**.",
        before="[U36 — So/such](/blog/curso-b1/unidad-36-so-such-intensifiers)",
        learn=["**número + nombre** (*two-day*)", "**edad** (*20-year-old*)", "**well-known / long-distance…**", "Vocabulario: flight, luggage, sightseeing…"],
        sections=r"""## 1. Patrones

| Tipo | Ejemplo |
| :--- | :--- |
| número + noun | a **two-day** trip |
| edad | a **20-year-old** student |
| adverbio + participle | a **well-known** hotel |
| adj + noun | a **long-distance** flight |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-37/two-day.mp3" title="🔊 two-day"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-37/twenty-year.mp3" title="🔊 20-year-old"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-37/well-known.mp3" title="🔊 well-known"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-37/long-distance.mp3" title="🔊 long-distance"></audio>

---

## 2. Más ejemplos

> He's an **open-minded** traveller.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-37/open-minded.mp3" title="🔊 open-minded"></audio>

---

## 3. Vocabulario: Travel & descriptions

![Travel](/blog/curso-b1/unit-37/travel-vocab.png)

| Word | Idea |
| :--- | :--- |
| flight / journey / luggage / passport | viaje |
| booking / resort / guidebook / sightseeing | turismo |
| delay / destination / scenic / crowded | descripción |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-37/travel-scene.png)

> We booked a two-day trip. She's a 20-year-old student. We stayed in a well-known hotel. It was a long-distance flight. He's an open-minded traveller.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-37/reading-travel.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-37/dialogue-travel.mp3" title="🔊 Dialogue"></audio>

> How long is the trip? — Two days.  
> Is the hotel well-known? — Yes.  
> Was it a long-distance flight? — Yes.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-37/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. a ___ trip (2 days)  
2. a ___ student (20 years)  
3. a ___ hotel  
4. a ___ flight  
5. Vocab: equipaje = ___ · retraso = ___

<details><summary>Ver solución</summary>

1. **two-day** · 2. **20-year-old** · 3. **well-known** · 4. **long-distance** · 5. **luggage** · **delay**
</details>""",
        tip="Delante del nombre: **guion** y **singular** (*a five-star hotel*, no *five-stars*).",
        next_course="[Unidad 38 — Contrast](/curso-b1/unit-38)",
        next_blog="[U38 — Contrast + opinions](/blog/curso-b1/unidad-38-contrast-opinions)",
        guides=["[U36](/blog/curso-b1/unidad-36-so-such-intensifiers)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-38-contrast-opinions.md", article(
        slug="unidad-38-contrast-opinions", unit=38,
        title="Clauses of Contrast B1 + Opinions",
        description="Aprende although, though, however y despite en inglés B1 con opiniones. Guía Unidad 38 con audios.",
        image="/blog/curso-b1/unit-38/contrast.png", alt="Clauses of contrast B1",
        keywords=["although however B1", "despite even though", "opinions vocabulary", "contrast clauses", "inglés B1 unidad 38"],
        related=["unidad-37-compound-adjectives-travel", "unidad-39-purpose-reason-explaining", "cursos-online-ingles-b1"],
        faqs=[("¿although o however?", "although une en la misma frase; however suele empezar frase nueva."), ("¿despite?", "despite / in spite of + nombre o -ing (no + cláusula completa sin *the fact that*)."), ("¿Dónde practico?", "En la [Unidad 38 del curso B1](/curso-b1/unit-38).")],
        excerpt="Guía de la Unidad 38 del curso B1: contraste y opinions.",
        intro="Tras la [Unidad 37](/blog/curso-b1/unidad-37-compound-adjectives-travel), la **Unidad 38** enseña **contraste** (*although, however, despite*) con vocabulario de **opiniones**.",
        before="[U37 — Compound adjectives](/blog/curso-b1/unidad-37-compound-adjectives-travel)",
        learn=["**although / though / even though**", "**however**", "**despite / in spite of**", "Vocabulario: agree, disagree, point of view…"],
        sections=r"""## 1. Contraste

| Conector | Uso | Ejemplo |
| :--- | :--- | :--- |
| although / though | + cláusula | **Although** it was raining, we went out. |
| however | frase nueva | I like it. **However**, it's expensive. |
| despite | + noun/-ing | **Despite** the delay, we arrived. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-38/although.mp3" title="🔊 although"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-38/however.mp3" title="🔊 however"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-38/even-though.mp3" title="🔊 even though"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-38/despite.mp3" title="🔊 despite"></audio>

---

## 2. Más ejemplos

> **Though** I was tired, I finished the work.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-38/though.mp3" title="🔊 though"></audio>

---

## 3. Vocabulario: Opinions

![Opinions](/blog/curso-b1/unit-38/opinions-vocab.png)

| Word / phrase | Idea |
| :--- | :--- |
| agree / disagree / support | postura |
| opinion / point of view / in my view | opinión |
| fair / unfair / convincing / doubt | valoración |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-38/opinions-scene.png)

> Although it was raining, we went out. I like the idea. However, it's expensive. Even though I disagree, I respect you. Despite the delay, we arrived on time.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-38/reading-opinions.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-38/dialogue-opinions.mp3" title="🔊 Dialogue"></audio>

> Shall we go out although it's raining? — Yes.  
> Is it expensive? — However, I still like it.  
> Do you disagree? — Even though I disagree, I respect you.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-38/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. ___ it was raining, we went out.  
2. I like it. ___, it's expensive.  
3. ___ I disagree, I respect you.  
4. ___ the delay, we arrived.  
5. Vocab: estar de acuerdo = ___

<details><summary>Ver solución</summary>

1. **Although / Though** · 2. **However** · 3. **Even though** · 4. **Despite / In spite of** · 5. **agree**
</details>""",
        tip="*However* no sustituye a *although* dentro de la misma cláusula: *Although it rained…* ≠ *However it rained…*.",
        next_course="[Unidad 39 — Purpose & reason](/curso-b1/unit-39)",
        next_blog="[U39 — Purpose & reason](/blog/curso-b1/unidad-39-purpose-reason-explaining)",
        guides=["[U37](/blog/curso-b1/unidad-37-compound-adjectives-travel)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-39-purpose-reason-explaining.md", article(
        slug="unidad-39-purpose-reason-explaining", unit=39,
        title="Purpose & Reason B1 + Explaining",
        description="Aprende to, in order to, so that, because y because of en inglés B1. Guía Unidad 39 con audios.",
        image="/blog/curso-b1/unit-39/purpose-reason.png", alt="Purpose and reason B1",
        keywords=["purpose reason B1", "in order to so that", "because of due to", "explaining vocabulary", "inglés B1 unidad 39"],
        related=["unidad-38-contrast-opinions", "unidad-40-repaso-36-39", "cursos-online-ingles-b1"],
        faqs=[("¿to o so that?", "to / in order to + infinitivo; so that + cláusula (sujeto + verbo)."), ("¿because o because of?", "because + cláusula; because of / due to + nombre."), ("¿Dónde practico?", "En la [Unidad 39 del curso B1](/curso-b1/unit-39).")],
        excerpt="Guía de la Unidad 39 del curso B1: purpose, reason y explaining.",
        intro="Tras la [Unidad 38](/blog/curso-b1/unidad-38-contrast-opinions), la **Unidad 39** distingue **propósito** y **causa** para **explicar**.",
        before="[U38 — Contrast](/blog/curso-b1/unidad-38-contrast-opinions)",
        learn=["**to / in order to / so that**", "**because / because of / due to**", "Vocabulario: reason, purpose, therefore…"],
        sections=r"""## 1. Purpose vs reason

| Idea | Forma | Ejemplo |
| :--- | :--- | :--- |
| Purpose | to / in order to | I study **to** travel. |
| Purpose | so that + clause | I called **so that** you wouldn't worry. |
| Reason | because + clause | I stayed **because** it was raining. |
| Reason | because of / due to + noun | **because of** the storm |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-39/to-travel.mp3" title="🔊 to"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-39/in-order-to.mp3" title="🔊 in order to"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-39/so-that.mp3" title="🔊 so that"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-39/because-of.mp3" title="🔊 because of"></audio>

---

## 2. Más ejemplos

> The delay was **due to** the weather.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-39/due-to.mp3" title="🔊 due to"></audio>

---

## 3. Vocabulario: Explaining

![Explaining](/blog/curso-b1/unit-39/explaining-vocab.png)

| Word | Idea |
| :--- | :--- |
| explain / reason / purpose / goal | explicar |
| cause / result / therefore / so | causa-efecto |
| in order to / because of / due to / so that | conectores |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-39/explaining-scene.png)

> I study English to travel more. We left early in order to avoid traffic. I called so that you wouldn't worry. We stayed inside because of the storm. The delay was due to the weather.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-39/reading-explain.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-39/dialogue-explain.mp3" title="🔊 Dialogue"></audio>

> Why do you study English? — To travel more.  
> Why leave early? — In order to avoid traffic.  
> Why call? — So that you wouldn't worry.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-39/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I study English ___ travel more.  
2. We left early ___ avoid traffic.  
3. I called ___ you wouldn't worry.  
4. We stayed inside ___ the storm.  
5. Vocab: propósito = ___ · causa = ___

<details><summary>Ver solución</summary>

1. **to** · 2. **in order to / to** · 3. **so that** · 4. **because of / due to** · 5. **purpose** · **cause / reason**
</details>""",
        tip="Si tras el conector hay **sujeto + verbo**, usa *because / so that*. Si hay **nombre**, usa *because of / due to*.",
        next_course="[Unidad 40 — Repaso 36–39](/curso-b1/unit-40)",
        next_blog="[U40 — Repaso 36–39](/blog/curso-b1/unidad-40-repaso-36-39)",
        guides=["[U38](/blog/curso-b1/unidad-38-contrast-opinions)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-40-repaso-36-39.md", article(
        slug="unidad-40-repaso-36-39", unit=40,
        title="Repaso B1 Unidades 36–39: So/Such, Compounds, Contrast, Purpose",
        description="Repaso integrado B1: so/such, compound adjectives, contraste y purpose/reason. Guía Unidad 40 con audios.",
        image="/blog/curso-b1/unit-40/review-map.png", alt="Repaso B1 unidades 36-39",
        keywords=["repaso B1 36-39", "so such review", "compound adjectives review", "although because review", "inglés B1 unidad 40"],
        related=["unidad-39-purpose-reason-explaining", "unidad-35-repaso-31-34", "cursos-online-ingles-b1"],
        faqs=[("¿Qué repasa la U40?", "So/such, compound adjectives, contrast y purpose/reason de U36–39."), ("¿Cómo estudiar?", "Mapa + audios mixtos + ejercicios del curso."), ("¿Dónde practico?", "En la [Unidad 40 del curso B1](/curso-b1/unit-40).")],
        excerpt="Guía de repaso de la Unidad 40 del curso B1 (contenidos 36–39).",
        intro="La **Unidad 40** cierra el Módulo 4: integra [so/such](/blog/curso-b1/unidad-36-so-such-intensifiers), [compounds](/blog/curso-b1/unidad-37-compound-adjectives-travel), [contraste](/blog/curso-b1/unidad-38-contrast-opinions) y [purpose/reason](/blog/curso-b1/unidad-39-purpose-reason-explaining).",
        before="[U39 — Purpose & reason](/blog/curso-b1/unidad-39-purpose-reason-explaining)",
        learn=["Repaso **so/such**", "Repaso **compound adjectives**", "Repaso **although/however**", "Repaso **to / because of**"],
        sections=r"""## 1. Mapa del repaso

![Review map](/blog/curso-b1/unit-40/review-map.png)

| Unidad | Foco |
| :--- | :--- |
| 36 | So / such + intensifiers |
| 37 | Compound adjectives + travel |
| 38 | Contrast + opinions |
| 39 | Purpose & reason + explaining |

---

## 2. Ejemplos mixtos

![Mixed](/blog/curso-b1/unit-40/review-examples.png)

> It was **such a** long journey.  
> We took a **two-day** trip.  
> **Although** I was tired, I went out.  
> I left early **to** catch the train.  
> We stayed in **because of** the rain.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-40/review-such.mp3" title="🔊 such"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-40/review-compound.mp3" title="🔊 compound"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-40/review-although.mp3" title="🔊 although"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-40/review-to.mp3" title="🔊 to"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-40/review-because-of.mp3" title="🔊 because of"></audio>

---

## 3. Reading mixto

> It was such a long journey. We took a two-day trip. Although I was tired, I went out. I left early to catch the train. We stayed in because of the rain.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-40/reading-mix.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-40/dialogue-mix.mp3" title="🔊 Dialogue"></audio>

> Was it such a long journey? — Yes.  
> A two-day trip? — Yes.  
> Why leave early? — To catch the train.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-40/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios exprés

1. It was ___ long journey.  
2. a ___ trip (2 days)  
3. ___ I was tired, I went out.  
4. I left early ___ catch the train.  
5. We stayed in ___ the rain.

<details><summary>Ver solución</summary>

1. **such a** · 2. **two-day** · 3. **Although / Though** · 4. **to / in order to** · 5. **because of / due to**
</details>""",
        tip="Clasifica primero: ¿intensidad, descripción, contraste o explicación?",
        next_course="[Unidad 41 — Verb + preposition](/curso-b1/unit-41)",
        next_blog="[U41 — Verb + preposition](/blog/curso-b1/unidad-41-verb-preposition-dependent)",
        guides=["[U36](/blog/curso-b1/unidad-36-so-such-intensifiers)", "[U37](/blog/curso-b1/unidad-37-compound-adjectives-travel)", "[U38](/blog/curso-b1/unidad-38-contrast-opinions)", "[U39](/blog/curso-b1/unidad-39-purpose-reason-explaining)"],
    ))


def main():
    diagrams(); make_audios(); make_articles(); print("done U36–40 theory")


if __name__ == "__main__":
    main()
