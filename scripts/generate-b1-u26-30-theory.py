#!/usr/bin/env python3
"""Generate B1 theory U26–30: diagrams, markdown, TTS audios."""
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
    # U26 Quantifiers
    img, d = canvas()
    title(d, "Quantifiers: much / many / a lot / few / little")
    card(d, (48, 110, 580, 600))
    d.text((72, 130), "Countable", fill=ACCENT, font=font(28, True))
    for i, t in enumerate(["many apples", "a few eggs", "few people", "a lot of vegetables", "how many?"]):
        d.text((72, 200 + i * 60), f"• {t}", fill=INK, font=font(24))
    card(d, (640, 110, 1150, 600))
    d.text((664, 130), "Uncountable", fill=ACCENT, font=font(28, True))
    for i, t in enumerate(["much water", "a little salt", "little time", "a lot of coffee", "how much?"]):
        d.text((664, 200 + i * 60), f"• {t}", fill=INK, font=font(24))
    save(img, 26, "quantifiers.png")

    img, d = canvas()
    title(d, "Food & drink")
    words = ["coffee", "vegetables", "salt", "lunch", "juice", "meat", "salad", "sugar", "soup", "cheese", "bread", "menu"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 24, y + 48), w, fill=INK, font=font(24, True))
    save(img, 26, "food-vocab.png")

    img, d = canvas()
    title(d, "At the table")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "There isn't much water left.",
        "There are many apples in the fridge.",
        "Add a little salt to the soup.",
        "Very few people ordered meat.",
    ]):
        d.text((80, 180 + i * 80), f"{i+1}. {t}", fill=INK, font=font(26))
    save(img, 26, "food-scene.png")

    # U27 Both / either / neither
    img, d = canvas()
    title(d, "Both · Either · Neither")
    items = [
        ("both A and B", "las dos / ambos"),
        ("either A or B", "uno u otro"),
        ("neither A nor B", "ni A ni B"),
        ("I don't like either", "ninguno de los dos"),
        ("Neither option is good", "ninguna opción"),
    ]
    for i, (en, es) in enumerate(items):
        y = 120 + i * 100
        card(d, (48, y, 1150, y + 85))
        d.text((72, y + 22), en, fill=ACCENT, font=font(26, True))
        d.text((560, y + 22), es, fill=INK, font=font(24))
    save(img, 27, "both-either-neither.png")

    img, d = canvas()
    title(d, "Choices vocabulary")
    words = ["choice", "option", "prefer", "alternative", "decide", "indecisive", "dilemma", "choose", "menu", "preferable", "select", "refuse"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 16, y + 48), w, fill=INK, font=font(22, True))
    save(img, 27, "choices-vocab.png")

    img, d = canvas()
    title(d, "Making a choice")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "Both restaurants are expensive.",
        "You can have either tea or coffee.",
        "Neither Tom nor Maria wants to go.",
        "I don't want either of them.",
    ]):
        d.text((80, 180 + i * 80), f"• {t}", fill=INK, font=font(26))
    save(img, 27, "choices-scene.png")

    # U28 Articles
    img, d = canvas()
    title(d, "Articles: a / an / the / ø")
    card(d, (48, 110, 400, 600))
    d.text((72, 140), "a / an", fill=ACCENT, font=font(28, True))
    for i, t in enumerate(["a bank", "an old church", "a museum", "an hour"]):
        d.text((72, 220 + i * 70), f"• {t}", fill=INK, font=font(22))
    card(d, (430, 110, 780, 600))
    d.text((454, 140), "the", fill=ACCENT, font=font(28, True))
    for i, t in enumerate(["the hospital", "the cathedral", "the tallest", "the city"]):
        d.text((454, 220 + i * 70), f"• {t}", fill=INK, font=font(22))
    card(d, (810, 110, 1150, 600))
    d.text((834, 140), "no article", fill=ACCENT, font=font(26, True))
    for i, t in enumerate(["go to school", "go home", "Life is…", "by bus"]):
        d.text((834, 220 + i * 70), f"• {t}", fill=INK, font=font(22))
    save(img, 28, "articles.png")

    img, d = canvas()
    title(d, "Places: buildings")
    words = ["library", "hospital", "church", "bank", "stadium", "cathedral", "tower", "museum", "hotel", "office block", "apartment", "station"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 16, y + 48), w, fill=INK, font=font(20, True))
    save(img, 28, "buildings-vocab.png")

    img, d = canvas()
    title(d, "Around town")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "I went to an old church yesterday.",
        "She works in a bank in the centre.",
        "We visited the cathedral in Seville.",
        "I go to school by bus.",
    ]):
        d.text((80, 180 + i * 80), f"{i+1}. {t}", fill=INK, font=font(26))
    save(img, 28, "buildings-scene.png")

    # U29 Reflexives
    img, d = canvas()
    title(d, "Reflexive pronouns")
    rows = [
        ("I → myself", "you → yourself"),
        ("he → himself", "she → herself"),
        ("it → itself", "we → ourselves"),
        ("you (pl) → yourselves", "they → themselves"),
    ]
    for i, (a, b) in enumerate(rows):
        y = 130 + i * 120
        card(d, (48, y, 580, y + 100))
        d.text((72, y + 32), a, fill=INK, font=font(26, True))
        card(d, (620, y, 1150, y + 100))
        d.text((644, y + 32), b, fill=INK, font=font(26, True))
    save(img, 29, "reflexives.png")

    img, d = canvas()
    title(d, "Personal experiences")
    words = ["experience", "memory", "life-changing", "unforgettable", "challenge", "look back", "coincidence", "get over", "proud", "believe in"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 5) * 224, 140 + (i // 5) * 220
        card(d, (x, y, x + 200, y + 180))
        d.text((x + 16, y + 70), w, fill=INK, font=font(18, True))
    save(img, 29, "experiences-vocab.png")

    img, d = canvas()
    title(d, "By yourself")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "I hurt myself when I fell.",
        "She taught herself to play the guitar.",
        "They enjoyed themselves at the party.",
        "We organised the trip by ourselves.",
    ]):
        d.text((80, 180 + i * 80), f"• {t}", fill=INK, font=font(26))
    save(img, 29, "experiences-scene.png")

    # U30 Review
    img, d = canvas()
    title(d, "Review 26–29")
    items = [("U26", "Quantifiers"), ("U27", "Both/either/neither"), ("U28", "Articles"), ("U29", "Reflexives")]
    for i, (u, label) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), u, fill=ACCENT, font=font(34, True))
        d.text((x + 24, 260), label, fill=INK, font=font(20))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "much/many · both/either/neither · a/an/the · myself/yourself…", fill=INK, font=font(22))
    d.text((72, 520), "Vocab: food · choices · buildings · experiences", fill=INK, font=font(22))
    save(img, 30, "review-map.png")

    img, d = canvas()
    title(d, "Mixed examples")
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate([
        "There isn't much milk left. (quantifier)",
        "You can have either tea or coffee. (either…or)",
        "We visited the cathedral yesterday. (the)",
        "She taught herself Spanish. (reflexive)",
        "Both options look good to me.",
    ]):
        d.text((80, 160 + i * 75), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 30, "review-examples.png")


AUDIOS = {
    26: {
        "much-water": "There isn't much water left.",
        "many-apples": "There are many apples in the fridge.",
        "a-little-salt": "Add a little salt to the soup.",
        "few-people": "Very few people came to the party.",
        "a-lot-of-coffee": "She drinks a lot of coffee every day.",
        "reading-food": "There isn't much water left in the bottle. There are many apples in the fridge. Add a little salt to the soup. Very few people ordered meat. She drinks a lot of coffee every day.",
        "dialogue-food": "How much milk do you need? Not much. How many eggs are there? A few. Can I have a little sugar? Sure.",
        "practice-four": "There isn't much water. There are many apples. Add a little salt. Very few people came.",
    },
    27: {
        "both-restaurants": "Both restaurants are expensive.",
        "either-tea-coffee": "You can have either tea or coffee.",
        "neither-nor": "Neither Tom nor Maria wants to go.",
        "either-of-them": "I don't want either of them.",
        "both-choices": "Both choices are valid.",
        "reading-choices": "Both restaurants are expensive. You can have either tea or coffee. Neither Tom nor Maria wants to go. I don't want either of them. Both choices are valid.",
        "dialogue-choices": "Do you prefer tea or coffee? Either is fine. Can both of us come? Yes. Neither option works for me.",
        "practice-four": "Both restaurants are expensive. Either tea or coffee. Neither Tom nor Maria. I don't want either.",
    },
    28: {
        "an-old-church": "I went to an old church yesterday.",
        "a-bank": "She works in a bank in the centre.",
        "the-cathedral": "We visited the cathedral in Seville.",
        "go-to-school": "I go to school by bus.",
        "an-hour": "I need an hour to get to the airport.",
        "reading-buildings": "I went to an old church yesterday. She works in a bank in the centre. We visited the cathedral in Seville. There is a museum opposite the park. I go to school by bus.",
        "dialogue-buildings": "Is there a library near here? Yes, next to the hospital. Did you see the cathedral? Yes. Do you go to school by bus? Usually.",
        "practice-four": "An old church. A bank. The cathedral. Go to school by bus.",
    },
    29: {
        "hurt-myself": "I hurt myself when I fell.",
        "taught-herself": "She taught herself to play the guitar.",
        "enjoyed-themselves": "They enjoyed themselves at the party.",
        "by-ourselves": "We organised the trip by ourselves.",
        "believe-in-ourselves": "We need to believe in ourselves.",
        "reading-experiences": "I hurt myself when I fell. She taught herself to play the guitar. They enjoyed themselves at the party. We organised the trip by ourselves. It was an unforgettable experience.",
        "dialogue-experiences": "Did you hurt yourself? A little. Did she teach herself? Yes. Did they enjoy themselves? Absolutely.",
        "practice-four": "I hurt myself. She taught herself. They enjoyed themselves. We did it by ourselves.",
    },
    30: {
        "review-much": "There isn't much milk left.",
        "review-either": "You can have either tea or coffee.",
        "review-the": "We visited the cathedral yesterday.",
        "review-herself": "She taught herself Spanish.",
        "review-both": "Both options look good to me.",
        "reading-mix": "There isn't much milk left. You can have either tea or coffee. We visited the cathedral yesterday. She taught herself Spanish last year. Both options look good to me.",
        "dialogue-mix": "How much time do we have? Little. Tea or coffee? Either. Did you go to the museum? Yes. Did she teach herself? Yes.",
        "practice-mix": "Not much milk. Either tea or coffee. The cathedral. She taught herself. Both options look good.",
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
    faqs = "\n".join(
        f"  - question: {q}\n    answer: >-\n      {a}" for q, a in kw["faqs"]
    )
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

- CEFR B1 · Cambridge B1 Preliminary · British Council — Quantifiers, determiners, articles & reflexives
"""


def make_articles():
    write_md(
        "unidad-26-quantifiers-food.md",
        article(
            slug="unidad-26-quantifiers-food",
            unit=26,
            title="Quantifiers B1: much, many, a lot, few, little + Food & Drink",
            description="Aprende cuantificadores en inglés B1 (much/many/a lot/few/little) con vocabulario de comida y bebida. Guía Unidad 26 con audios.",
            image="/blog/curso-b1/unit-26/quantifiers.png",
            alt="Quantifiers B1 much many few little",
            keywords=["quantifiers B1", "much many a lot", "few little", "food drink vocabulary", "inglés B1 unidad 26"],
            related=["unidad-25-repaso-21-24", "unidad-27-both-either-neither", "cursos-online-ingles-b1"],
            faqs=[
                ("¿much o many?", "much + incontables (water, milk); many + contables (apples, eggs)."),
                ("¿few o a few?", "few = pocos (tono negativo); a few = algunos (positivo). Igual con little / a little."),
                ("¿Dónde practico?", "En la [Unidad 26 del curso B1](/curso-b1/unit-26)."),
            ],
            excerpt="Guía de la Unidad 26 del curso B1: cuantificadores y food & drink.",
            intro="Tras el [Repaso 21–24](/blog/curso-b1/unidad-25-repaso-21-24), la **Unidad 26** trabaja **cuantificadores** (*much, many, a lot, few, little*) con vocabulario de **comida y bebida**.",
            before="[U25 — Repaso 21–24](/blog/curso-b1/unidad-25-repaso-21-24)",
            learn=["**much / many / a lot of**", "**few / a few** y **little / a little**", "Vocabulario: coffee, vegetables, salt, salad, soup…"],
            sections=r"""## 1. Mapa rápido

| Cuantificador | Tipo | Ejemplo |
| :--- | :--- | :--- |
| **many / a few / few** | contables | There are **many** apples. |
| **much / a little / little** | incontables | There isn't **much** water. |
| **a lot (of)** | ambos | She drinks **a lot of** coffee. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-26/much-water.mp3" title="🔊 much water"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-26/many-apples.mp3" title="🔊 many apples"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-26/a-little-salt.mp3" title="🔊 a little salt"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-26/few-people.mp3" title="🔊 few people"></audio>

---

## 2. Más ejemplos

> She drinks **a lot of** coffee every day.  
> **How much** milk do you need?  
> **How many** eggs are there?  
> Add **a little** salt to the soup.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-26/a-lot-of-coffee.mp3" title="🔊 a lot of"></audio>

---

## 3. Vocabulario: Food & drink

![Food vocab](/blog/curso-b1/unit-26/food-vocab.png)

| Word | Idea |
| :--- | :--- |
| coffee / tea / juice / milk / water | bebidas |
| vegetables / fruit / meat / cheese / bread | comida |
| salad / soup / lunch / dinner / breakfast / menu | platos y comidas |

---

## 4. Reading

![Food scene](/blog/curso-b1/unit-26/food-scene.png)

> There isn't much water left in the bottle. There are many apples in the fridge. Add a little salt to the soup. Very few people ordered meat. She drinks a lot of coffee every day.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-26/reading-food.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-26/dialogue-food.mp3" title="🔊 Dialogue"></audio>

> How much milk do you need? — Not much.  
> How many eggs are there? — A few.  
> Can I have a little sugar? — Sure.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-26/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. There isn't ___ water left. *(much / many)*  
2. There are ___ apples. *(much / many)*  
3. Add ___ salt. *(a little / a few)*  
4. Very ___ people came. *(few / little)*  
5. Vocab: verduras = ___ · ensalada = ___

<details><summary>Ver solución</summary>

1. **much** · 2. **many** · 3. **a little** · 4. **few** · 5. **vegetables** · **salad**
</details>""",
            tip="Pregunta: ¿puedo contar el sustantivo? Si sí → *many/few*; si no → *much/little*. *A lot of* vale para ambos.",
            next_course="[Unidad 27 — Both, either, neither](/curso-b1/unit-27)",
            next_blog="[U27 — Both, either, neither](/blog/curso-b1/unidad-27-both-either-neither)",
            guides=["[U25 — Repaso 21–24](/blog/curso-b1/unidad-25-repaso-21-24)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
        ),
    )

    write_md(
        "unidad-27-both-either-neither.md",
        article(
            slug="unidad-27-both-either-neither",
            unit=27,
            title="Both, Either, Neither B1 + Choices",
            description="Aprende both…and, either…or y neither…nor en inglés B1 con vocabulario de elecciones. Guía Unidad 27 con audios.",
            image="/blog/curso-b1/unit-27/both-either-neither.png",
            alt="Both either neither B1",
            keywords=["both either neither B1", "either or neither nor", "choices vocabulary", "both and", "inglés B1 unidad 27"],
            related=["unidad-26-quantifiers-food", "unidad-28-articles-buildings", "cursos-online-ingles-b1"],
            faqs=[
                ("¿both o either?", "both = las dos; either = una u otra (o ninguna en negativa)."),
                ("¿neither…nor?", "Ni A ni B: Neither Tom nor Maria wants to go."),
                ("¿Dónde practico?", "En la [Unidad 27 del curso B1](/curso-b1/unit-27)."),
            ],
            excerpt="Guía de la Unidad 27 del curso B1: both, either, neither y choices.",
            intro="Tras la [Unidad 26](/blog/curso-b1/unidad-26-quantifiers-food), la **Unidad 27** enseña **both…and**, **either…or** y **neither…nor** con vocabulario de **elecciones**.",
            before="[U26 — Quantifiers](/blog/curso-b1/unidad-26-quantifiers-food)",
            learn=["**both A and B**", "**either A or B** / **neither A nor B**", "Vocabulario: choice, option, prefer, dilemma…"],
            sections=r"""## 1. Estructuras clave

| Estructura | Idea | Ejemplo |
| :--- | :--- | :--- |
| **both A and B** | las dos | **Both** restaurants **are** expensive. |
| **either A or B** | uno u otro | **Either** tea **or** coffee. |
| **neither A nor B** | ninguno | **Neither** Tom **nor** Maria wants to go. |
| **not… either** | ninguno (negativa) | I don't want **either** of them. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-27/both-restaurants.mp3" title="🔊 both"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-27/either-tea-coffee.mp3" title="🔊 either…or"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-27/neither-nor.mp3" title="🔊 neither…nor"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-27/either-of-them.mp3" title="🔊 either"></audio>

---

## 2. Más ejemplos

> **Both** choices are valid.  
> We can go **either** by train **or** by bus.  
> **Neither** option is good.  
> I like **both** films.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-27/both-choices.mp3" title="🔊 both choices"></audio>

---

## 3. Vocabulario: Choices

![Choices vocab](/blog/curso-b1/unit-27/choices-vocab.png)

| Word | Idea |
| :--- | :--- |
| choice / option / alternative / menu | opciones |
| prefer / choose / decide / select | decidir |
| dilemma / indecisive / refuse | dilema / indeciso / rechazar |

---

## 4. Reading

![Choices scene](/blog/curso-b1/unit-27/choices-scene.png)

> Both restaurants are expensive. You can have either tea or coffee. Neither Tom nor Maria wants to go. I don't want either of them. Both choices are valid.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-27/reading-choices.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-27/dialogue-choices.mp3" title="🔊 Dialogue"></audio>

> Do you prefer tea or coffee? — Either is fine.  
> Can both of us come? — Yes.  
> Neither option works for me.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-27/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. ___ restaurants are expensive. *(Both / Either)*  
2. You can have ___ tea ___ coffee. *(either…or / neither…nor)*  
3. ___ Tom ___ Maria wants to go. *(Neither…nor / Both…and)*  
4. I don't want ___ of them. *(either / both)*  
5. Vocab: opción = ___ · dilema = ___

<details><summary>Ver solución</summary>

1. **Both** · 2. **either…or** · 3. **Neither…nor** · 4. **either** · 5. **option** · **dilemma**
</details>""",
            tip="*Neither* va con verbo en singular: *Neither option **is** good*. En negativa, *I don't like either* = no me gusta ninguno de los dos.",
            next_course="[Unidad 28 — Articles](/curso-b1/unit-28)",
            next_blog="[U28 — Articles & buildings](/blog/curso-b1/unidad-28-articles-buildings)",
            guides=["[U26](/blog/curso-b1/unidad-26-quantifiers-food)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
        ),
    )

    write_md(
        "unidad-28-articles-buildings.md",
        article(
            slug="unidad-28-articles-buildings",
            unit=28,
            title="Articles B1: a/an, the, no article + Places: Buildings",
            description="Repasa a/an, the y el artículo cero en inglés B1 con edificios y lugares. Guía Unidad 28 con audios.",
            image="/blog/curso-b1/unit-28/articles.png",
            alt="Articles a an the B1",
            keywords=["articles a an the B1", "zero article", "buildings vocabulary", "places English", "inglés B1 unidad 28"],
            related=["unidad-27-both-either-neither", "unidad-29-reflexive-pronouns", "cursos-online-ingles-b1"],
            faqs=[
                ("¿a o an?", "an delante de sonido vocálico: an old church, an hour, an office."),
                ("¿cuándo the?", "Cuando el oyente sabe de qué hablamos: the cathedral, the hospital near here."),
                ("¿Dónde practico?", "En la [Unidad 28 del curso B1](/curso-b1/unit-28)."),
            ],
            excerpt="Guía de la Unidad 28 del curso B1: artículos y buildings.",
            intro="Tras la [Unidad 27](/blog/curso-b1/unidad-27-both-either-neither), la **Unidad 28** consolida **a/an, the** y el **artículo cero**, con vocabulario de **edificios y lugares**.",
            before="[U27 — Both, either, neither](/blog/curso-b1/unidad-27-both-either-neither)",
            learn=["**a / an** (primera mención)", "**the** (específico / único)", "**sin artículo** (*go to school*)", "Vocabulario: library, hospital, cathedral, stadium…"],
            sections=r"""## 1. Mapa rápido

| Artículo | Uso | Ejemplo |
| :--- | :--- | :--- |
| **a / an** | uno no específico / primera mención | She works in **a** bank. |
| **the** | específico / único / conocido | We visited **the** cathedral. |
| **ø** | instituciones / general | I go to **school** by bus. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-28/an-old-church.mp3" title="🔊 an old church"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-28/a-bank.mp3" title="🔊 a bank"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-28/the-cathedral.mp3" title="🔊 the cathedral"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-28/go-to-school.mp3" title="🔊 go to school"></audio>

---

## 2. Más ejemplos

> There is **a** museum opposite the park.  
> I need **an** hour to get to the airport.  
> Life in **the** city can be stressful.  
> They are building **a** new stadium.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-28/an-hour.mp3" title="🔊 an hour"></audio>

---

## 3. Vocabulario: Places — buildings

![Buildings vocab](/blog/curso-b1/unit-28/buildings-vocab.png)

| Word | Idea |
| :--- | :--- |
| library / museum / hotel / bank | servicios |
| hospital / church / cathedral / school | instituciones |
| stadium / tower / office block / apartment block | edificios |

---

## 4. Reading

![Buildings scene](/blog/curso-b1/unit-28/buildings-scene.png)

> I went to an old church yesterday. She works in a bank in the centre. We visited the cathedral in Seville. There is a museum opposite the park. I go to school by bus.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-28/reading-buildings.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-28/dialogue-buildings.mp3" title="🔊 Dialogue"></audio>

> Is there a library near here? — Yes, next to the hospital.  
> Did you see the cathedral? — Yes.  
> Do you go to school by bus? — Usually.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-28/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I went to ___ old church. *(a / an / the)*  
2. We visited ___ cathedral in Seville.  
3. She works in ___ bank.  
4. I go to ___ by bus. *(school / the school — institución)*  
5. Vocab: biblioteca = ___ · estadio = ___

<details><summary>Ver solución</summary>

1. **an** · 2. **the** · 3. **a** · 4. **school** · 5. **library** · **stadium**
</details>""",
            tip="*an* depende del **sonido**, no de la letra: *an hour*, *a university*. Con instituciones (*school, prison, hospital*) el artículo cambia el significado.",
            next_course="[Unidad 29 — Reflexive pronouns](/curso-b1/unit-29)",
            next_blog="[U29 — Reflexives](/blog/curso-b1/unidad-29-reflexive-pronouns)",
            guides=["[U27](/blog/curso-b1/unidad-27-both-either-neither)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
        ),
    )

    write_md(
        "unidad-29-reflexive-pronouns.md",
        article(
            slug="unidad-29-reflexive-pronouns",
            unit=29,
            title="Reflexive Pronouns B1 + Personal Experiences",
            description="Aprende myself, yourself, himself… en inglés B1 con experiencias personales. Guía Unidad 29 con audios.",
            image="/blog/curso-b1/unit-29/reflexives.png",
            alt="Reflexive pronouns B1",
            keywords=["reflexive pronouns B1", "myself yourself himself", "by myself", "personal experiences vocabulary", "inglés B1 unidad 29"],
            related=["unidad-28-articles-buildings", "unidad-30-repaso-26-29", "cursos-online-ingles-b1"],
            faqs=[
                ("¿cuándo uso myself?", "Cuando el sujeto y el objeto son la misma persona: I hurt myself."),
                ("¿by myself?", "Sin ayuda / solo: We organised the trip by ourselves."),
                ("¿Dónde practico?", "En la [Unidad 29 del curso B1](/curso-b1/unit-29)."),
            ],
            excerpt="Guía de la Unidad 29 del curso B1: pronombres reflexivos y experiencias personales.",
            intro="Tras la [Unidad 28](/blog/curso-b1/unidad-28-articles-buildings), la **Unidad 29** presenta los **pronombres reflexivos** (*myself, yourself…*) con vocabulario de **experiencias personales**.",
            before="[U28 — Articles](/blog/curso-b1/unidad-28-articles-buildings)",
            learn=["**myself / yourself / himself / herself / itself**", "**ourselves / yourselves / themselves**", "**by myself** = sin ayuda", "Vocabulario: experience, unforgettable, challenge…"],
            sections=r"""## 1. Tabla rápida

| Sujeto | Reflexivo | Ejemplo |
| :--- | :--- | :--- |
| I | **myself** | I hurt **myself**. |
| you | **yourself** | Help **yourself**. |
| he / she / it | **himself / herself / itself** | She taught **herself**. |
| we / you / they | **ourselves / yourselves / themselves** | They enjoyed **themselves**. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-29/hurt-myself.mp3" title="🔊 myself"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-29/taught-herself.mp3" title="🔊 herself"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-29/enjoyed-themselves.mp3" title="🔊 themselves"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-29/by-ourselves.mp3" title="🔊 by ourselves"></audio>

---

## 2. Más ejemplos

> We need to believe in **ourselves**.  
> Be proud of **yourself**.  
> The children dressed **themselves**.  
> I made **myself** a sandwich.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-29/believe-in-ourselves.mp3" title="🔊 ourselves"></audio>

---

## 3. Vocabulario: Personal experiences

![Experiences vocab](/blog/curso-b1/unit-29/experiences-vocab.png)

| Word / phrase | Idea |
| :--- | :--- |
| experience / memory / unforgettable | experiencia / recuerdo / inolvidable |
| life-changing / challenge / coincidence | que cambia la vida / desafío / coincidencia |
| look back / get over / learn from | mirar atrás / superar / aprender de |

---

## 4. Reading

![Experiences scene](/blog/curso-b1/unit-29/experiences-scene.png)

> I hurt myself when I fell. She taught herself to play the guitar. They enjoyed themselves at the party. We organised the trip by ourselves. It was an unforgettable experience.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-29/reading-experiences.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-29/dialogue-experiences.mp3" title="🔊 Dialogue"></audio>

> Did you hurt yourself? — A little.  
> Did she teach herself? — Yes.  
> Did they enjoy themselves? — Absolutely.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-29/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I hurt ___ when I fell.  
2. She taught ___ to play the guitar.  
3. They enjoyed ___ at the party.  
4. We organised the trip ___. *(by…)*  
5. Vocab: inolvidable = ___ · desafío = ___

<details><summary>Ver solución</summary>

1. **myself** · 2. **herself** · 3. **themselves** · 4. **by ourselves** · 5. **unforgettable** · **challenge**
</details>""",
            tip="No uses reflexivo si el objeto es otra persona: *I hurt **him*** (no *myself*). *By myself* = solo / sin ayuda.",
            next_course="[Unidad 30 — Repaso 26–29](/curso-b1/unit-30)",
            next_blog="[U30 — Repaso 26–29](/blog/curso-b1/unidad-30-repaso-26-29)",
            guides=["[U28](/blog/curso-b1/unidad-28-articles-buildings)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
        ),
    )

    write_md(
        "unidad-30-repaso-26-29.md",
        article(
            slug="unidad-30-repaso-26-29",
            unit=30,
            title="Repaso B1 Unidades 26–29: Quantifiers, Both/Either/Neither, Articles, Reflexives",
            description="Repaso integrado B1: cuantificadores, both/either/neither, artículos y reflexivos. Guía Unidad 30 con audios.",
            image="/blog/curso-b1/unit-30/review-map.png",
            alt="Repaso B1 unidades 26-29",
            keywords=["repaso B1 26-29", "quantifiers review", "articles reflexives review", "both either neither", "inglés B1 unidad 30"],
            related=["unidad-29-reflexive-pronouns", "unidad-25-repaso-21-24", "cursos-online-ingles-b1"],
            faqs=[
                ("¿Qué repasa la U30?", "Quantifiers, both/either/neither, articles y reflexive pronouns de las unidades 26–29."),
                ("¿Cómo estudiar el repaso?", "Lee el mapa, escucha los audios mixtos y haz los ejercicios del curso."),
                ("¿Dónde practico?", "En la [Unidad 30 del curso B1](/curso-b1/unit-30)."),
            ],
            excerpt="Guía de repaso de la Unidad 30 del curso B1 (contenidos 26–29).",
            intro="La **Unidad 30** cierra la segunda mitad del Módulo 3: integra [cuantificadores](/blog/curso-b1/unidad-26-quantifiers-food), [both/either/neither](/blog/curso-b1/unidad-27-both-either-neither), [artículos](/blog/curso-b1/unidad-28-articles-buildings) y [reflexivos](/blog/curso-b1/unidad-29-reflexive-pronouns).",
            before="[U29 — Reflexives](/blog/curso-b1/unidad-29-reflexive-pronouns)",
            learn=["Repaso de **much/many/few/little**", "Repaso de **both / either / neither**", "Repaso de **a/an/the/ø**", "Repaso de **myself…themselves**"],
            sections=r"""## 1. Mapa del repaso

![Review map](/blog/curso-b1/unit-30/review-map.png)

| Unidad | Foco |
| :--- | :--- |
| 26 | Quantifiers + food |
| 27 | Both / either / neither + choices |
| 28 | Articles + buildings |
| 29 | Reflexives + experiences |

---

## 2. Ejemplos mixtos

![Mixed examples](/blog/curso-b1/unit-30/review-examples.png)

> There isn't **much** milk left.  
> You can have **either** tea **or** coffee.  
> We visited **the** cathedral yesterday.  
> She taught **herself** Spanish.  
> **Both** options look good to me.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-30/review-much.mp3" title="🔊 much"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-30/review-either.mp3" title="🔊 either"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-30/review-the.mp3" title="🔊 the"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-30/review-herself.mp3" title="🔊 herself"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-30/review-both.mp3" title="🔊 both"></audio>

---

## 3. Reading mixto

> There isn't much milk left. You can have either tea or coffee. We visited the cathedral yesterday. She taught herself Spanish last year. Both options look good to me.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-30/reading-mix.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-30/dialogue-mix.mp3" title="🔊 Dialogue"></audio>

> How much time do we have? — Little.  
> Tea or coffee? — Either.  
> Did you go to the museum? — Yes.  
> Did she teach herself? — Yes.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-30/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios exprés

1. There isn't ___ milk left.  
2. ___ tea ___ coffee is fine. *(either…or)*  
3. We visited ___ cathedral.  
4. She taught ___ Spanish.  
5. ___ options look good.

<details><summary>Ver solución</summary>

1. **much** · 2. **Either…or** · 3. **the** · 4. **herself** · 5. **Both**
</details>""",
            tip="En el repaso, nombra primero la **regla** (*countable? specific? same subject?*) y luego elige la forma.",
            next_course="[Unidad 31 — Relative clauses](/curso-b1/unit-31)",
            next_blog="Módulo 4 (U31+) — próximamente",
            guides=["[U26](/blog/curso-b1/unidad-26-quantifiers-food)", "[U27](/blog/curso-b1/unidad-27-both-either-neither)", "[U28](/blog/curso-b1/unidad-28-articles-buildings)", "[U29](/blog/curso-b1/unidad-29-reflexive-pronouns)"],
        ),
    )


def main():
    diagrams()
    make_audios()
    make_articles()
    print("done U26–30 theory")


if __name__ == "__main__":
    main()
