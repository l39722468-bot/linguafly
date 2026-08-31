#!/usr/bin/env python3
"""Generate B1 theory U21–25: diagrams, markdown, TTS audios."""
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


def new_img(w=1200, h=675):
    return Image.new("RGB", (w, h), BG), ImageDraw.Draw(Image.new("RGB", (w, h), BG))


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
    # U21
    img, d = canvas()
    title(d, "Gerund vs Infinitive (1)")
    card(d, (48, 110, 580, 600))
    d.text((72, 130), "Verb + -ing", fill=ACCENT, font=font(28, True))
    for i, t in enumerate(["enjoy swimming", "finish reading", "avoid eating", "suggest going", "keep practising"]):
        d.text((72, 200 + i * 60), f"• {t}", fill=INK, font=font(24))
    card(d, (640, 110, 1150, 600))
    d.text((664, 130), "Verb + to", fill=ACCENT, font=font(28, True))
    for i, t in enumerate(["want to travel", "need to study", "decide to leave", "hope to pass", "plan to visit"]):
        d.text((664, 200 + i * 60), f"• {t}", fill=INK, font=font(24))
    save(img, 21, "gerund-infinitive-1.png")

    img, d = canvas()
    title(d, "Hobbies & leisure")
    words = ["hobby", "hiking", "camping", "cycling", "painting", "photography", "jogging", "cinema", "picnic", "museum", "excursion", "relaxing"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 24, y + 48), w, fill=INK, font=font(24, True))
    save(img, 21, "hobbies-vocab.png")

    img, d = canvas()
    title(d, "Weekend hobbies")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "I enjoy hiking at the weekend.",
        "She wants to visit a museum.",
        "We finished painting the room.",
        "They decided to go camping.",
    ]):
        d.text((80, 180 + i * 80), f"{i+1}. {t}", fill=INK, font=font(26))
    save(img, 21, "hobbies-scene.png")

    # U22
    img, d = canvas()
    title(d, "Gerund vs Infinitive (2)")
    card(d, (48, 110, 1150, 300))
    d.text((72, 140), "like / love / prefer + -ing or to", fill=ACCENT, font=font(26, True))
    d.text((72, 210), "I like cooking.  ·  I like to cook early.", fill=INK, font=font(24))
    card(d, (48, 340, 1150, 600))
    d.text((72, 370), "remember / forget / try — meaning changes", fill=ACCENT, font=font(26, True))
    d.text((72, 450), "remember locking  ≠  remember to lock", fill=INK, font=font(24))
    d.text((72, 520), "try restarting  ≠  try to open", fill=INK, font=font(24))
    save(img, 22, "gerund-infinitive-2.png")

    img, d = canvas()
    title(d, "House & home")
    words = ["kitchen", "bedroom", "bathroom", "sofa", "fridge", "dishwasher", "garden", "garage", "hallway", "dining room", "washing machine", "vacuum cleaner"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 16, y + 48), w, fill=INK, font=font(20, True))
    save(img, 22, "house-vocab.png")

    img, d = canvas()
    title(d, "At home")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "I prefer living in a quiet flat.",
        "Remember to lock the door.",
        "She forgot turning off the dishwasher.",
        "Try cleaning the kitchen first.",
    ]):
        d.text((80, 180 + i * 80), f"• {t}", fill=INK, font=font(26))
    save(img, 22, "house-scene.png")

    # U23
    img, d = canvas()
    title(d, "Phrasal verbs 1 — daily life")
    items = [
        ("turn on/off", "encender / apagar"),
        ("put on / take off", "ponerse / quitarse"),
        ("hurry up", "darse prisa"),
        ("calm down", "calmarse"),
        ("look after", "cuidar"),
    ]
    for i, (en, es) in enumerate(items):
        y = 120 + i * 100
        card(d, (48, y, 1150, y + 85))
        d.text((72, y + 22), en, fill=ACCENT, font=font(26, True))
        d.text((520, y + 22), es, fill=INK, font=font(24))
    save(img, 23, "phrasals-1.png")

    img, d = canvas()
    title(d, "Daily activities")
    words = ["wake up", "get dressed", "have breakfast", "commute", "take a break", "do housework", "go shopping", "go to bed"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 140 + (i // 4) * 220
        card(d, (x, y, x + 250, y + 180))
        d.text((x + 24, y + 70), w, fill=INK, font=font(22, True))
    save(img, 23, "daily-vocab.png")

    img, d = canvas()
    title(d, "Morning routine")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "Please turn off the lights.",
        "Put on your coat — it's cold.",
        "Hurry up or we'll be late.",
        "Can you look after my bag?",
    ]):
        d.text((80, 180 + i * 80), f"{i+1}. {t}", fill=INK, font=font(26))
    save(img, 23, "daily-scene.png")

    # U24
    img, d = canvas()
    title(d, "Phrasal verbs 2 — shopping & info")
    items = [
        ("find out", "averiguar"),
        ("give up", "dejar / rendirse"),
        ("look into", "investigar"),
        ("fill in", "rellenar (formulario)"),
        ("hand in", "entregar"),
    ]
    for i, (en, es) in enumerate(items):
        y = 120 + i * 100
        card(d, (48, y, 1150, y + 85))
        d.text((72, y + 22), en, fill=ACCENT, font=font(26, True))
        d.text((520, y + 22), es, fill=INK, font=font(24))
    save(img, 24, "phrasals-2.png")

    img, d = canvas()
    title(d, "Shopping vocabulary")
    words = ["receipt", "discount", "refund", "fitting room", "checkout", "bargain", "size", "queue", "cashier", "price tag", "exchange", "sale"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 24, y + 48), w, fill=INK, font=font(22, True))
    save(img, 24, "shopping-vocab.png")

    img, d = canvas()
    title(d, "At the shop")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "I need to find out the opening times.",
        "Don't give up — try another size.",
        "Please fill in this form for the refund.",
        "Hand in your receipt at the checkout.",
    ]):
        d.text((80, 180 + i * 80), f"• {t}", fill=INK, font=font(26))
    save(img, 24, "shopping-scene.png")

    # U25
    img, d = canvas()
    title(d, "Review 21–24")
    items = [("U21", "Gerund/Inf (1)"), ("U22", "Gerund/Inf (2)"), ("U23", "Phrasals 1"), ("U24", "Phrasals 2")]
    for i, (u, label) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), u, fill=ACCENT, font=font(34, True))
        d.text((x + 30, 260), label, fill=INK, font=font(22))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "enjoy + -ing · want + to · remember to/ -ing · turn on · find out · give up", fill=INK, font=font(22))
    d.text((72, 520), "Vocab: hobbies · house · daily activities · shopping", fill=INK, font=font(22))
    save(img, 25, "review-map.png")

    img, d = canvas()
    title(d, "Mixed examples")
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate([
        "I enjoy cycling at the weekend. (gerund)",
        "She wants to buy a new sofa. (infinitive)",
        "Remember to turn off the lights. (remember to)",
        "Please fill in the form and hand it in. (phrasals)",
        "I found out the shop gives discounts on Monday.",
    ]):
        d.text((80, 160 + i * 75), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 25, "review-examples.png")


AUDIOS = {
    21: {
        "enjoy-hiking": "I enjoy hiking at the weekend.",
        "want-to-visit": "She wants to visit a museum.",
        "finish-painting": "We finished painting the room.",
        "decide-to-camp": "They decided to go camping.",
        "avoid-sitting": "I avoid sitting all day.",
        "reading-hobbies": "I enjoy hiking and cycling at the weekend. My sister wants to visit a new museum this month. We finished painting the living room yesterday. They decided to go camping next Friday. I need to practise photography more often.",
        "dialogue-hobbies": "Do you enjoy hiking? Yes, I love hiking. Do you want to go camping? Yes, I decided to go this weekend. Have you finished painting? Almost.",
        "practice-four": "I enjoy hiking. She wants to visit a museum. We finished painting. They decided to go camping.",
    },
    22: {
        "like-cooking": "I like cooking in the kitchen.",
        "prefer-living": "I prefer living in a quiet flat.",
        "remember-to-lock": "Remember to lock the door.",
        "forget-turning": "She forgot turning off the dishwasher.",
        "try-cleaning": "Try cleaning the kitchen first.",
        "reading-home": "I prefer living near a park. Remember to lock the door when you leave. She forgot turning off the washing machine. Try restarting the vacuum cleaner. We love spending evenings in the garden.",
        "dialogue-home": "Did you remember to lock the door? Yes. Did she forget turning off the dishwasher? Unfortunately yes. Do you prefer living in a flat? Yes, I prefer living in a quiet flat.",
        "practice-four": "I like cooking. Remember to lock the door. She forgot turning it off. Try cleaning first.",
    },
    23: {
        "turn-off": "Please turn off the lights.",
        "put-on": "Put on your coat. It's cold.",
        "take-off": "Take off your shoes at the door.",
        "hurry-up": "Hurry up or we'll be late.",
        "look-after": "Can you look after my bag?",
        "reading-daily": "Every morning I turn on the radio and put on my jacket. Hurry up, the bus is coming. Please take off your shoes and calm down. My neighbour looks after my plants when I travel.",
        "dialogue-daily": "Can you turn off the TV? Sure. Put on your coat. OK. Hurry up! I'm coming. Who looks after the dog? My sister.",
        "practice-four": "Turn off the lights. Put on your coat. Hurry up. Look after my bag.",
    },
    24: {
        "find-out": "I need to find out the opening times.",
        "give-up": "Don't give up. Try another size.",
        "look-into": "We will look into the refund.",
        "fill-in": "Please fill in this form.",
        "hand-in": "Hand in your receipt at the checkout.",
        "reading-shop": "I found out the shop opens at nine. Don't give up if your size is missing — ask the cashier. They looked into my refund request. Please fill in the form and hand in your receipt at the checkout.",
        "dialogue-shop": "Did you find out the price? Yes, there's a discount. Should I fill in the form? Yes, then hand it in. Don't give up on the refund.",
        "practice-four": "Find out the times. Don't give up. Fill in the form. Hand in the receipt.",
    },
    25: {
        "review-enjoy": "I enjoy cycling at the weekend.",
        "review-want": "She wants to buy a new sofa.",
        "review-remember": "Remember to turn off the lights.",
        "review-fill": "Please fill in the form and hand it in.",
        "review-find": "I found out the shop gives discounts on Monday.",
        "reading-mix": "I enjoy cycling and I want to buy a new bike. Remember to turn off the lights before you leave. Please fill in the form and hand it in at the desk. I found out the shop gives discounts on Monday so I won't give up looking for a bargain.",
        "dialogue-mix": "Do you enjoy cycling? Yes. Do you want to buy a new sofa? Maybe. Remember to turn off the lights. OK. Did you find out the opening times? Yes.",
        "practice-mix": "I enjoy cycling. She wants to buy a sofa. Remember to turn off the lights. Fill in the form. I found out the discount.",
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

- CEFR B1 · Cambridge B1 Preliminary · British Council — Gerunds, infinitives & phrasal verbs
"""


def make_articles():
    write_md(
        "unidad-21-gerund-infinitive-hobbies.md",
        article(
            slug="unidad-21-gerund-infinitive-hobbies",
            unit=21,
            title="Gerund vs Infinitive (1) B1 + Hobbies & Leisure",
            description="Aprende gerundio e infinitivo en inglés B1 (enjoy/finish + -ing; want/need/decide + to) con hobbies. Guía Unidad 21 con audios.",
            image="/blog/curso-b1/unit-21/gerund-infinitive-1.png",
            alt="Gerund vs infinitive 1 B1",
            keywords=["gerund vs infinitive B1", "enjoy + ing", "want to infinitive", "hobbies vocabulary", "inglés B1 unidad 21"],
            related=["unidad-20-repaso-16-19", "unidad-22-gerund-infinitive-house", "cursos-online-ingles-b1"],
            faqs=[
                ("¿Cuándo uso -ing?", "Tras verbos como enjoy, finish, avoid, suggest, keep: I enjoy hiking."),
                ("¿Cuándo uso to + infinitive?", "Tras want, need, decide, hope, plan, learn: She wants to travel."),
                ("¿Dónde practico?", "En la [Unidad 21 del curso B1](/curso-b1/unit-21)."),
            ],
            excerpt="Guía de la Unidad 21 del curso B1: gerund vs infinitive (1) y hobbies.",
            intro="Tras el [Repaso 16–19](/blog/curso-b1/unidad-20-repaso-16-19), la **Unidad 21** introduce el contraste **gerundio / infinitivo** con vocabulario de **hobbies & leisure**.",
            before="[U20 — Repaso 16–19](/blog/curso-b1/unidad-20-repaso-16-19)",
            learn=["**enjoy / finish / avoid + -ing**", "**want / need / decide + to**", "Vocabulario: hiking, camping, cycling, museum…"],
            sections=r"""## 1. Mapa rápido

| Patrón | Verbos típicos | Ejemplo |
| :--- | :--- | :--- |
| **verb + -ing** | enjoy, finish, avoid, suggest, keep | I **enjoy hiking**. |
| **verb + to** | want, need, decide, hope, plan | She **wants to visit** a museum. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-21/enjoy-hiking.mp3" title="🔊 enjoy hiking"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-21/want-to-visit.mp3" title="🔊 want to"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-21/finish-painting.mp3" title="🔊 finish painting"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-21/decide-to-camp.mp3" title="🔊 decide to"></audio>

---

## 2. Más ejemplos

> We **finished painting** the room.  
> I **avoid sitting** all day.  
> They **decided to go** camping.  
> I **need to practise** photography.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-21/avoid-sitting.mp3" title="🔊 avoid"></audio>

---

## 3. Vocabulario: Hobbies & leisure

![Hobbies vocab](/blog/curso-b1/unit-21/hobbies-vocab.png)

| Word | Idea |
| :--- | :--- |
| hiking / camping / cycling / jogging | senderismo / camping / ciclismo / footing |
| painting / photography / cinema / museum | pintura / foto / cine / museo |
| picnic / excursion / relaxing / hobby | picnic / excursión / relajarse / hobby |

---

## 4. Reading

![Hobbies scene](/blog/curso-b1/unit-21/hobbies-scene.png)

> I enjoy hiking and cycling at the weekend. My sister wants to visit a new museum this month. We finished painting the living room yesterday. They decided to go camping next Friday. I need to practise photography more often.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-21/reading-hobbies.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-21/dialogue-hobbies.mp3" title="🔊 Dialogue"></audio>

> Do you enjoy hiking? — Yes, I love hiking.  
> Do you want to go camping? — Yes, I decided to go this weekend.  
> Have you finished painting? — Almost.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-21/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I enjoy ___ (hike).  
2. She wants ___ (visit) a museum.  
3. We finished ___ (paint).  
4. They decided ___ (go) camping.  
5. Vocab: senderismo = ___ · museo = ___

<details><summary>Ver solución</summary>

1. **hiking** · 2. **to visit** · 3. **painting** · 4. **to go** · 5. **hiking** · **museum**
</details>""",
            tip="Memoriza listas cortas: *enjoy/finish/avoid* → **-ing**; *want/need/decide* → **to**.",
            next_course="[Unidad 22 — Gerund/Infinitive 2](/curso-b1/unit-22)",
            next_blog="[U22 — Gerund/Infinitive 2](/blog/curso-b1/unidad-22-gerund-infinitive-house)",
            guides=["[U20 — Repaso 16–19](/blog/curso-b1/unidad-20-repaso-16-19)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
        ),
    )

    write_md(
        "unidad-22-gerund-infinitive-house.md",
        article(
            slug="unidad-22-gerund-infinitive-house",
            unit=22,
            title="Gerund vs Infinitive (2) B1 + House & Home",
            description="like/love/prefer y remember/forget/try en inglés B1, con vocabulario de casa. Guía Unidad 22 con audios.",
            image="/blog/curso-b1/unit-22/gerund-infinitive-2.png",
            alt="Gerund vs infinitive 2 B1",
            keywords=["remember to vs ing", "like love prefer gerund", "house home vocabulary", "try to vs try -ing", "inglés B1 unidad 22"],
            related=["unidad-21-gerund-infinitive-hobbies", "unidad-23-phrasal-verbs-daily", "cursos-online-ingles-b1"],
            faqs=[
                ("¿like + -ing o to?", "Ambos son posibles en B1: I like cooking / I like to cook. El significado suele ser muy similar."),
                ("¿remember locking o remember to lock?", "remember + -ing = recuerdo haberlo hecho. remember + to = no olvides hacerlo."),
                ("¿Dónde practico?", "En la [Unidad 22 del curso B1](/curso-b1/unit-22)."),
            ],
            excerpt="Guía de la Unidad 22 del curso B1: gerund vs infinitive (2) y house & home.",
            intro="Tras la [Unidad 21](/blog/curso-b1/unidad-21-gerund-infinitive-hobbies), la **Unidad 22** profundiza en **like/love/prefer** y en verbos cuyo significado cambia (*remember, forget, try*), con vocabulario de **casa**.",
            before="[U21 — Gerund/Infinitive 1](/blog/curso-b1/unidad-21-gerund-infinitive-hobbies)",
            learn=["like / love / prefer + -ing o to", "remember / forget / try — contraste de significado", "Vocabulario: kitchen, fridge, dishwasher, garden…"],
            sections=r"""## 1. like / love / prefer

> I **like cooking** in the kitchen.  
> I **like to cook** early.  
> I **prefer living** in a quiet flat.  
> We **love spending** evenings in the garden.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-22/like-cooking.mp3" title="🔊 like cooking"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-22/prefer-living.mp3" title="🔊 prefer living"></audio>

---

## 2. remember / forget / try

| Forma | Significado | Ejemplo |
| :--- | :--- | :--- |
| remember **to** lock | no olvides hacerlo | Remember **to lock** the door. |
| remember **locking** | recuerdo haberlo hecho | I remember **locking** it. |
| forget **to** / **turning** | olvido de hacer / de haber hecho | She forgot **turning** it off. |
| try **to** open / try **cleaning** | esfuerzo / experimento | Try **cleaning** first. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-22/remember-to-lock.mp3" title="🔊 remember to"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-22/forget-turning.mp3" title="🔊 forget -ing"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-22/try-cleaning.mp3" title="🔊 try -ing"></audio>

---

## 3. Vocabulario: House & home

![House vocab](/blog/curso-b1/unit-22/house-vocab.png)

| Word | Idea |
| :--- | :--- |
| kitchen / bedroom / bathroom / hallway | cocina / dormitorio / baño / pasillo |
| fridge / dishwasher / washing machine / vacuum cleaner | nevera / lavavajillas / lavadora / aspiradora |
| sofa / garden / garage / dining room | sofá / jardín / garaje / comedor |

---

## 4. Reading

![House scene](/blog/curso-b1/unit-22/house-scene.png)

> I prefer living near a park. Remember to lock the door when you leave. She forgot turning off the washing machine. Try restarting the vacuum cleaner. We love spending evenings in the garden.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-22/reading-home.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-22/dialogue-home.mp3" title="🔊 Dialogue"></audio>

> Did you remember to lock the door? — Yes.  
> Did she forget turning off the dishwasher? — Unfortunately yes.  
> Do you prefer living in a flat? — Yes, a quiet flat.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-22/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. Remember ___ (lock) the door. *(obligación futura)*  
2. I remember ___ (lock) it. *(recuerdo)*  
3. I prefer ___ (live) near a park.  
4. Try ___ (clean) the kitchen first.  
5. Vocab: nevera = ___ · lavavajillas = ___

<details><summary>Ver solución</summary>

1. **to lock** · 2. **locking** · 3. **living / to live** · 4. **cleaning** · 5. **fridge** · **dishwasher**
</details>""",
            tip="Con *remember/forget/try*, pregunta: ¿es un **recordatorio** (*to*) o un **recuerdo/experimento** (*-ing*)?",
            next_course="[Unidad 23 — Phrasal verbs 1](/curso-b1/unit-23)",
            next_blog="[U23 — Phrasals 1](/blog/curso-b1/unidad-23-phrasal-verbs-daily)",
            guides=["[U21](/blog/curso-b1/unidad-21-gerund-infinitive-hobbies)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
        ),
    )

    write_md(
        "unidad-23-phrasal-verbs-daily.md",
        article(
            slug="unidad-23-phrasal-verbs-daily",
            unit=23,
            title="Phrasal Verbs 1 B1 + Daily Activities",
            description="Aprende phrasal verbs B1 (turn on/off, put on, take off, hurry up, calm down, look after) con rutinas diarias. Guía Unidad 23 con audios.",
            image="/blog/curso-b1/unit-23/phrasals-1.png",
            alt="Phrasal verbs 1 B1",
            keywords=["phrasal verbs B1", "turn on turn off", "put on take off", "look after", "inglés B1 unidad 23"],
            related=["unidad-22-gerund-infinitive-house", "unidad-24-phrasal-verbs-shopping", "cursos-online-ingles-b1"],
            faqs=[
                ("¿Qué es un phrasal verb?", "Verbo + partícula (on, off, up, after…) con significado propio: turn off = apagar."),
                ("¿put on separable?", "Sí en muchos casos: Put on your coat / Put it on. No separes el pronombre al final incorrecto (*Put on it* ✗)."),
                ("¿Dónde practico?", "En la [Unidad 23 del curso B1](/curso-b1/unit-23)."),
            ],
            excerpt="Guía de la Unidad 23 del curso B1: phrasal verbs 1 y daily activities.",
            intro="Tras gerundios/infinitivos, la **Unidad 23** trabaja **phrasal verbs** de la vida diaria.",
            before="[U22](/blog/curso-b1/unidad-22-gerund-infinitive-house)",
            learn=["turn on/off, put on, take off", "hurry up, calm down, look after", "Vocabulario de rutinas diarias"],
            sections=r"""## 1. Phrasals clave

| Phrasal | Significado | Ejemplo |
| :--- | :--- | :--- |
| turn on / off | encender / apagar | Turn **off** the lights. |
| put on / take off | ponerse / quitarse | **Put on** your coat. |
| hurry up | darse prisa | **Hurry up** or we'll be late. |
| calm down | calmarse | Please **calm down**. |
| look after | cuidar | **Look after** my bag. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-23/turn-off.mp3" title="🔊 turn off"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-23/put-on.mp3" title="🔊 put on"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-23/take-off.mp3" title="🔊 take off"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-23/hurry-up.mp3" title="🔊 hurry up"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-23/look-after.mp3" title="🔊 look after"></audio>

---

## 2. Vocabulario: Daily activities

![Daily vocab](/blog/curso-b1/unit-23/daily-vocab.png)

wake up · get dressed · have breakfast · commute · take a break · do housework · go shopping · go to bed

---

## 3. Reading

![Daily scene](/blog/curso-b1/unit-23/daily-scene.png)

> Every morning I turn on the radio and put on my jacket. Hurry up, the bus is coming. Please take off your shoes and calm down. My neighbour looks after my plants when I travel.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-23/reading-daily.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-23/dialogue-daily.mp3" title="🔊 Dialogue"></audio>

> Can you turn off the TV? — Sure.  
> Put on your coat. — OK.  
> Hurry up! — I'm coming.  
> Who looks after the dog? — My sister.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-23/practice-four.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios

1. Please turn ___ the lights. (*off*)  
2. ___ on your coat. (*Put*)  
3. ___ up or we'll be late. (*Hurry*)  
4. Can you look ___ my bag? (*after*)  
5. Traduce: Apaga la tele. / Ponte el abrigo.

<details><summary>Ver solución</summary>

1. **off** · 2. **Put** · 3. **Hurry** · 4. **after** · 5. Turn **off** the TV. / **Put on** your coat.
</details>""",
            tip="Aprende phrasals **en frases**, no aislados: *turn off the lights*, *look after the dog*.",
            next_course="[Unidad 24 — Phrasals 2](/curso-b1/unit-24)",
            next_blog="[U24 — Phrasals 2 & Shopping](/blog/curso-b1/unidad-24-phrasal-verbs-shopping)",
            guides=["[U22](/blog/curso-b1/unidad-22-gerund-infinitive-house)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
        ),
    )

    write_md(
        "unidad-24-phrasal-verbs-shopping.md",
        article(
            slug="unidad-24-phrasal-verbs-shopping",
            unit=24,
            title="Phrasal Verbs 2 B1 + Shopping",
            description="find out, give up, look into, fill in, hand in en inglés B1 con vocabulario de compras. Guía Unidad 24 con audios.",
            image="/blog/curso-b1/unit-24/phrasals-2.png",
            alt="Phrasal verbs 2 B1 shopping",
            keywords=["find out give up", "fill in hand in", "phrasal verbs shopping", "look into", "inglés B1 unidad 24"],
            related=["unidad-23-phrasal-verbs-daily", "unidad-25-repaso-21-24", "cursos-online-ingles-b1"],
            faqs=[
                ("¿find out = find?", "find out = averiguar información. find = encontrar un objeto."),
                ("¿fill in o fill out?", "Ambos se usan (fill in/out a form). En B1 priorizamos **fill in**."),
                ("¿Dónde practico?", "En la [Unidad 24 del curso B1](/curso-b1/unit-24)."),
            ],
            excerpt="Guía de la Unidad 24 del curso B1: phrasal verbs 2 y shopping.",
            intro="La **Unidad 24** amplía phrasals de **información y trámites** en contextos de **compras**.",
            before="[U23 — Phrasals 1](/blog/curso-b1/unidad-23-phrasal-verbs-daily)",
            learn=["find out, give up, look into", "fill in, hand in", "Vocabulario: receipt, discount, refund, checkout…"],
            sections=r"""## 1. Phrasals clave

| Phrasal | Significado | Ejemplo |
| :--- | :--- | :--- |
| find out | averiguar | Find **out** the opening times. |
| give up | rendirse / dejar | Don't **give up**. |
| look into | investigar | We'll **look into** the refund. |
| fill in | rellenar | **Fill in** this form. |
| hand in | entregar | **Hand in** your receipt. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-24/find-out.mp3" title="🔊 find out"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-24/give-up.mp3" title="🔊 give up"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-24/look-into.mp3" title="🔊 look into"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-24/fill-in.mp3" title="🔊 fill in"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-24/hand-in.mp3" title="🔊 hand in"></audio>

---

## 2. Vocabulario: Shopping

![Shopping vocab](/blog/curso-b1/unit-24/shopping-vocab.png)

receipt · discount · refund · fitting room · checkout · bargain · size · queue · cashier · price tag · exchange · sale

---

## 3. Reading

![Shopping scene](/blog/curso-b1/unit-24/shopping-scene.png)

> I found out the shop opens at nine. Don't give up if your size is missing — ask the cashier. They looked into my refund request. Please fill in the form and hand in your receipt at the checkout.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-24/reading-shop.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-24/dialogue-shop.mp3" title="🔊 Dialogue"></audio>

> Did you find out the price? — Yes, there's a discount.  
> Should I fill in the form? — Yes, then hand it in.  
> Don't give up on the refund.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-24/practice-four.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios

1. I need to find ___ the opening times. (*out*)  
2. Don't give ___. (*up*)  
3. Please fill ___ this form. (*in*)  
4. Hand ___ your receipt. (*in*)  
5. Vocab: recibo = ___ · descuento = ___ · devolución = ___

<details><summary>Ver solución</summary>

1. **out** · 2. **up** · 3. **in** · 4. **in** · 5. **receipt** · **discount** · **refund**
</details>""",
            tip="En tiendas: *find out* (horario/precio) → *fill in* (formulario) → *hand in* (recibo).",
            next_course="[Unidad 25 — Repaso 21–24](/curso-b1/unit-25)",
            next_blog="[U25 — Repaso 21–24](/blog/curso-b1/unidad-25-repaso-21-24)",
            guides=["[U23](/blog/curso-b1/unidad-23-phrasal-verbs-daily)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
        ),
    )

    write_md(
        "unidad-25-repaso-21-24.md",
        article(
            slug="unidad-25-repaso-21-24",
            unit=25,
            title="Repaso Unidades 21–24 B1: Gerunds, Infinitives & Phrasals",
            description="Repasa gerund vs infinitive y phrasal verbs del curso B1 (U21–24). Guía Unidad 25 con audios y ejercicios.",
            image="/blog/curso-b1/unit-25/review-map.png",
            alt="Repaso gerunds phrasals B1",
            keywords=["repaso gerund infinitive B1", "phrasal verbs review", "inglés B1 unidad 25", "enjoy want remember turn on find out"],
            related=[
                "unidad-21-gerund-infinitive-hobbies",
                "unidad-22-gerund-infinitive-house",
                "unidad-23-phrasal-verbs-daily",
                "unidad-24-phrasal-verbs-shopping",
                "cursos-online-ingles-b1",
            ],
            faqs=[
                ("¿Qué repasa esta unidad?", "Gerund/infinitive (U21–22) y phrasal verbs (U23–24) con hobbies, house, daily life y shopping."),
                ("¿Dónde practico?", "En la [Unidad 25 del curso B1](/curso-b1/unit-25)."),
            ],
            excerpt="Guía de la Unidad 25 del curso B1: repaso 21–24.",
            intro="La **Unidad 25** consolida **gerundios, infinitivos y phrasal verbs** antes de seguir el curso.",
            before="[U24 — Phrasals 2](/blog/curso-b1/unidad-24-phrasal-verbs-shopping)",
            learn=["Mezclar enjoy/-ing y want/to", "remember to vs -ing", "turn off / find out / fill in / hand in"],
            sections=r"""## 1. Mapa rápido

![Review map](/blog/curso-b1/unit-25/review-map.png)

| Bloque | Clave | Ejemplo |
| :--- | :--- | :--- |
| U21 | enjoy + -ing / want + to | I **enjoy cycling**. She **wants to buy**… |
| U22 | remember to / -ing | Remember **to turn** off… |
| U23 | turn on/off, put on, look after | **Turn off** the lights. |
| U24 | find out, fill in, hand in | **Find out** the times. |

![Review examples](/blog/curso-b1/unit-25/review-examples.png)

<audio controls preload="none" src="/audio/blog/curso-b1/unit-25/review-enjoy.mp3" title="🔊 enjoy"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-25/review-want.mp3" title="🔊 want"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-25/review-remember.mp3" title="🔊 remember"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-25/review-fill.mp3" title="🔊 fill in"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-25/review-find.mp3" title="🔊 find out"></audio>

---

## 2. Checklist

- [ ] enjoy/finish/avoid + -ing  
- [ ] want/need/decide + to  
- [ ] remember to ≠ remember -ing  
- [ ] turn on/off, put on, look after  
- [ ] find out, give up, fill in, hand in  

---

## 3. Reading mix

> I enjoy cycling and I want to buy a new bike. Remember to turn off the lights before you leave. Please fill in the form and hand it in at the desk. I found out the shop gives discounts on Monday so I won't give up looking for a bargain.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-25/reading-mix.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo mix

<audio controls preload="none" src="/audio/blog/curso-b1/unit-25/dialogue-mix.mp3" title="🔊 Dialogue"></audio>

> Do you enjoy cycling? — Yes.  
> Do you want to buy a new sofa? — Maybe.  
> Remember to turn off the lights. — OK.  
> Did you find out the opening times? — Yes.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-25/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios

1. I enjoy ___ (cycle).  
2. She wants ___ (buy) a sofa.  
3. Remember ___ (turn) off the lights.  
4. Please fill ___ the form.  
5. I found ___ the discount.  
6. Don't give ___.

<details><summary>Ver solución</summary>

1. **cycling** · 2. **to buy** · 3. **to turn** · 4. **in** · 5. **out** · 6. **up**
</details>""",
            tip="En el repaso, clasifica primero (*-ing / to / phrasal*) y luego completa.",
            next_course="[Unidad 26](/curso-b1/unit-26) *(siguiente bloque del curso)*",
            next_blog="Cuando publiquemos la Unidad 26, enlazaremos aquí.",
            guides=[
                "[U21](/blog/curso-b1/unidad-21-gerund-infinitive-hobbies)",
                "[U22](/blog/curso-b1/unidad-22-gerund-infinitive-house)",
                "[U23](/blog/curso-b1/unidad-23-phrasal-verbs-daily)",
                "[U24](/blog/curso-b1/unidad-24-phrasal-verbs-shopping)",
                "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)",
            ],
        ),
    )


def main():
    diagrams()
    make_articles()
    make_audios()
    print("DONE U21–25 theory")


if __name__ == "__main__":
    main()
