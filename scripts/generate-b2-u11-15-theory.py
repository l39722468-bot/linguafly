#!/usr/bin/env python3
"""Generate B2 theory U11–15: diagrams, markdown, TTS audios.

Head commercial Bing keywords stay on hub /blog/temas/curso-ingles only.
Articles use level/topic long-tails.
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT_MD = ROOT / "src/content/blog/curso-b2"
DATE = "2026-08-31"
BG, INK, ACCENT, CARD, LINE = (245, 248, 252), (20, 35, 55), (15, 110, 140), (255, 255, 255), (200, 215, 230)
LEVEL_KW = ["curso inglés B2 gratis", "ejercicios inglés B2 gratis"]
HUB = "ingles-b2"


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
    path = ROOT / f"public/blog/curso-b2/unit-{unit}" / name
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)
    print("img", path.relative_to(ROOT))


def vocab_grid(unit: int, name: str, heading: str, words: list[str]):
    img, d = canvas()
    title(d, heading)
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 12, y + 48), w, fill=INK, font=font(18, True))
    save(img, unit, name)


def diagrams():
    # U11 relative clauses
    img, d = canvas()
    title(d, "Relative clauses (B2)")
    card(d, (48, 110, 580, 600))
    d.text((72, 140), "Defining", fill=ACCENT, font=font(26, True))
    d.text((72, 210), "essential info · no commas", fill=INK, font=font(20))
    d.text((72, 280), "The district that we visited", fill=INK, font=font(18))
    d.text((72, 320), "has a famous mural.", fill=INK, font=font(18))
    d.text((72, 390), "who / which / that / whose / where", fill=INK, font=font(18))
    card(d, (620, 110, 1150, 600))
    d.text((644, 140), "Non-defining", fill=ACCENT, font=font(26, True))
    d.text((644, 210), "extra info · commas", fill=INK, font=font(20))
    d.text((644, 280), "The festival, which is annual,", fill=INK, font=font(18))
    d.text((644, 320), "attracts thousands.", fill=INK, font=font(18))
    d.text((644, 390), "no that · use which / who", fill=INK, font=font(18))
    save(img, 11, "relative-clauses.png")

    vocab_grid(
        11,
        "culture-vocab.png",
        "Culture & urban life",
        [
            "district",
            "exhibition",
            "neighbour",
            "skyscraper",
            "heritage",
            "festival",
            "custom",
            "tradition",
            "landmark",
            "mural",
            "nightlife",
            "community",
        ],
    )

    img, d = canvas()
    title(d, "Culture in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "The district where I grew up has a new mural.",
            "The exhibition, which opened last week, is free.",
            "My neighbour, whose family runs the festival, is friendly.",
            "The skyscraper that you see is a city landmark.",
        ]
    ):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(22))
    save(img, 11, "culture-scene.png")

    # U12 reduced relatives
    img, d = canvas()
    title(d, "Reduced relative clauses")
    card(d, (48, 110, 580, 600))
    d.text((72, 140), "-ing (active)", fill=ACCENT, font=font(26, True))
    d.text((72, 210), "People attending the premiere", fill=INK, font=font(18))
    d.text((72, 250), "waited outside the stage door.", fill=INK, font=font(18))
    d.text((72, 320), "The seedlings growing in the", fill=INK, font=font(18))
    d.text((72, 360), "greenhouse need more light.", fill=INK, font=font(18))
    card(d, (620, 110, 1150, 600))
    d.text((644, 140), "-ed (passive)", fill=ACCENT, font=font(26, True))
    d.text((644, 210), "The soundtrack recorded last", fill=INK, font=font(18))
    d.text((644, 250), "month won an award.", fill=INK, font=font(18))
    d.text((644, 320), "The compost produced in the", fill=INK, font=font(18))
    d.text((644, 360), "garden is ready to use.", fill=INK, font=font(18))
    save(img, 12, "reduced-relatives.png")

    vocab_grid(
        12,
        "entertainment-garden-vocab.png",
        "Entertainment & gardening",
        [
            "seedling",
            "greenhouse",
            "compost",
            "germinate",
            "volunteer",
            "premiere",
            "audience",
            "stage",
            "rehearsal",
            "soundtrack",
            "comedy",
            "exhibition",
        ],
    )

    img, d = canvas()
    title(d, "Reduced relatives in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "Volunteers helping at the exhibition greeted the audience.",
            "The comedy filmed here became a hit last year.",
            "Seeds planted in the greenhouse began to germinate.",
            "The rehearsal scheduled for Friday was cancelled.",
        ]
    ):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(22))
    save(img, 12, "garden-scene.png")

    # U13 modals obligation
    img, d = canvas()
    title(d, "Modals: obligation & necessity")
    card(d, (48, 110, 400, 600))
    d.text((72, 140), "must / have to", fill=ACCENT, font=font(24, True))
    d.text((72, 210), "strong obligation", fill=INK, font=font(20))
    d.text((72, 270), "You must save receipts.", fill=INK, font=font(18))
    d.text((72, 330), "I have to submit the budget.", fill=INK, font=font(18))
    card(d, (430, 110, 780, 600))
    d.text((454, 140), "need to", fill=ACCENT, font=font(24, True))
    d.text((454, 210), "necessity (neutral)", fill=INK, font=font(20))
    d.text((454, 270), "We need to raise donations.", fill=INK, font=font(18))
    d.text((454, 330), "She needs to pay the loan.", fill=INK, font=font(18))
    card(d, (810, 110, 1150, 600))
    d.text((834, 140), "needn't / don't have to", fill=ACCENT, font=font(22, True))
    d.text((834, 210), "no obligation", fill=INK, font=font(20))
    d.text((834, 270), "You needn't pay today.", fill=INK, font=font(18))
    d.text((834, 330), "You don't have to volunteer.", fill=INK, font=font(18))
    save(img, 13, "modals-obligation.png")

    vocab_grid(
        13,
        "money-vocab.png",
        "Money & volunteering",
        [
            "donation",
            "budget",
            "charity",
            "shelter",
            "badge",
            "donor",
            "wage",
            "loan",
            "interest",
            "save",
            "afford",
            "volunteer",
        ],
    )

    img, d = canvas()
    title(d, "Money & volunteering in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "You must register as a donor before donating.",
            "Volunteers don't have to work every weekend.",
            "We need to save enough to afford the shelter rent.",
            "You needn't pay interest if you repay the loan early.",
        ]
    ):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(22))
    save(img, 13, "money-scene.png")

    # U14 modal deduction
    img, d = canvas()
    title(d, "Modals of deduction (past)")
    card(d, (48, 110, 400, 600))
    d.text((72, 140), "must have", fill=ACCENT, font=font(26, True))
    d.text((72, 210), "almost certain", fill=INK, font=font(20))
    d.text((72, 280), "She must have missed", fill=INK, font=font(18))
    d.text((72, 320), "the deadline.", fill=INK, font=font(18))
    card(d, (430, 110, 780, 600))
    d.text((454, 140), "might have", fill=ACCENT, font=font(26, True))
    d.text((454, 210), "possible", fill=INK, font=font(20))
    d.text((454, 280), "They might have changed", fill=INK, font=font(18))
    d.text((454, 320), "the launch date.", fill=INK, font=font(18))
    card(d, (810, 110, 1150, 600))
    d.text((834, 140), "can't have", fill=ACCENT, font=font(26, True))
    d.text((834, 210), "almost impossible", fill=INK, font=font(20))
    d.text((834, 280), "He can't have sent", fill=INK, font=font(18))
    d.text((834, 320), "the invoice yet.", fill=INK, font=font(18))
    save(img, 14, "modal-deduction.png")

    vocab_grid(
        14,
        "business-vocab.png",
        "Business & fashion",
        [
            "deadline",
            "launch",
            "brand",
            "trend",
            "cloakroom",
            "collection",
            "client",
            "invoice",
            "merger",
            "pitch",
            "runway",
            "designer",
        ],
    )

    img, d = canvas()
    title(d, "Business & fashion in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "The designer must have finished the collection early.",
            "The client might have left the pitch in the cloakroom.",
            "They can't have signed the merger before the deadline.",
            "That brand must have started a new trend on the runway.",
        ]
    ):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(22))
    save(img, 14, "business-scene.png")

    # U15 review
    img, d = canvas()
    title(d, "Review U11–U14")
    items = [
        ("U11", "Relative clauses"),
        ("U12", "Reduced relatives"),
        ("U13", "Modals obligation"),
        ("U14", "Modals deduction"),
    ]
    for i, (u, label) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), u, fill=ACCENT, font=font(34, True))
        d.text((x + 24, 260), label, fill=INK, font=font(20))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "who/which/that · -ing/-ed · must/have to · must have/might have", fill=INK, font=font(22))
    d.text((72, 520), "Vocab: culture · entertainment · money · business", fill=INK, font=font(22))
    save(img, 15, "review-map.png")

    img, d = canvas()
    title(d, "Mixed examples U11–14")
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate(
        [
            "The festival, which is annual, attracts thousands. (non-defining)",
            "Volunteers helping at the exhibition greeted the audience. (-ing)",
            "You must save receipts; you don't have to pay today. (obligation)",
            "She must have missed the deadline. (deduction past)",
            "The compost produced in the garden is ready. (-ed reduced)",
        ]
    ):
        d.text((80, 150 + i * 85), f"{i+1}. {t}", fill=INK, font=font(20))
    save(img, 15, "review-examples.png")


AUDIOS = {
    11: {
        "defining-district": "The district that we visited has a famous mural.",
        "non-defining-festival": "The festival, which is annual, attracts thousands of visitors.",
        "whose-neighbour": "My neighbour, whose family runs the festival, is very friendly.",
        "where-landmark": "The landmark where we met is near the skyscraper.",
        "who-volunteer": "The volunteer who organised the exhibition lives nearby.",
        "which-heritage": "The heritage site, which is protected, draws tourists every year.",
        "reading-u11": "The district that we visited has a famous mural. The festival, which is annual, attracts thousands. My neighbour, whose family runs the festival, is friendly. The landmark where we met is near the skyscraper.",
        "dialogue-u11": "Know this district? The district where I grew up has a new mural. Annual festival? The festival, which is annual, is next month. Your neighbour? My neighbour, whose family runs it, invited us.",
        "practice-u11": "District that visited. Festival which is annual. Neighbour whose family. Landmark where we met. Volunteer who organised.",
    },
    12: {
        "ing-premiere": "People attending the premiere waited outside the stage door.",
        "ed-soundtrack": "The soundtrack recorded last month won an award.",
        "ing-seedlings": "The seedlings growing in the greenhouse need more light.",
        "ed-compost": "The compost produced in the garden is ready to use.",
        "ing-volunteers": "Volunteers helping at the exhibition greeted the audience.",
        "ed-rehearsal": "The rehearsal scheduled for Friday was cancelled.",
        "reading-u12": "People attending the premiere waited outside. The soundtrack recorded last month won an award. Volunteers helping at the exhibition greeted the audience. The compost produced in the garden is ready.",
        "dialogue-u12": "Long queue? People attending the premiere waited outside. Good soundtrack? The soundtrack recorded last month won an award. Need help? Volunteers helping at the exhibition greeted everyone.",
        "practice-u12": "Attending the premiere. Recorded last month. Helping at the exhibition. Produced in the garden. Scheduled for Friday.",
    },
    13: {
        "must-save": "You must save all receipts for the charity budget.",
        "have-to-submit": "I have to submit the budget by Friday.",
        "need-to-raise": "We need to raise enough donations for the shelter.",
        "neednt-pay": "You needn't pay interest if you repay the loan early.",
        "dont-have-to": "Volunteers don't have to work every weekend.",
        "must-badge": "You must wear your badge at the shelter.",
        "reading-u13": "You must save all receipts. I have to submit the budget by Friday. We need to raise donations. You needn't pay interest early. Volunteers don't have to work every weekend.",
        "dialogue-u13": "Save receipts? You must save all receipts for the budget. Pay today? You needn't pay today. Volunteer every day? You don't have to work every weekend.",
        "practice-u13": "Must save. Have to submit. Need to raise. Needn't pay. Don't have to volunteer.",
    },
    14: {
        "must-have-deadline": "She must have missed the deadline for the launch.",
        "might-have-launch": "They might have changed the launch date again.",
        "cant-have-invoice": "He can't have sent the invoice before the merger.",
        "must-have-collection": "The designer must have finished the collection early.",
        "might-have-cloakroom": "The client might have left the pitch in the cloakroom.",
        "cant-have-runway": "They can't have walked the runway without rehearsal.",
        "reading-u14": "She must have missed the deadline. They might have changed the launch date. He can't have sent the invoice yet. The designer must have finished the collection early.",
        "dialogue-u14": "Missed the deadline? She must have missed it. Changed the date? They might have changed the launch date. Sent the invoice? He can't have sent it yet.",
        "practice-u14": "Must have missed. Might have changed. Can't have sent. Must have finished. Might have left.",
    },
    15: {
        "review-relative": "The festival, which is annual, attracts thousands of visitors.",
        "review-reduced": "Volunteers helping at the exhibition greeted the audience.",
        "review-obligation": "You must save receipts; you don't have to pay today.",
        "review-deduction": "She must have missed the deadline for the launch.",
        "review-reduced-ed": "The compost produced in the garden is ready to use.",
        "reading-mix": "The festival, which is annual, attracts thousands. Volunteers helping at the exhibition greeted the audience. You must save receipts. She must have missed the deadline. The compost produced in the garden is ready.",
        "dialogue-mix": "Annual festival? The festival, which is annual, is next month. Missed deadline? She must have missed it. Save receipts? You must save all receipts.",
        "practice-mix": "Festival which is annual. Volunteers helping. Must save. Must have missed. Compost produced.",
    },
}


def make_audios():
    for unit, clips in AUDIOS.items():
        d = ROOT / f"public/audio/blog/curso-b2/unit-{unit}"
        d.mkdir(parents=True, exist_ok=True)
        for name, text in clips.items():
            path = d / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def write_md(name: str, body: str) -> None:
    path = OUT_MD / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(body if body.endswith("\n") else body + "\n", encoding="utf-8")
    print("md", path.relative_to(ROOT))


def article(**kw) -> str:
    keywords = "\n".join(f"  - {k}" for k in kw["keywords"] + LEVEL_KW)
    related = "\n".join(f"  - {r}" for r in kw["related"])
    faqs = "\n".join(f"  - question: {q}\n    answer: >-\n      {a}" for q, a in kw["faqs"])
    learn = "\n".join(f"- {x}" for x in kw["learn"])
    guides = "\n".join(f"- {g}" for g in kw["guides"])
    return f"""---
category: curso-b2
date: '{DATE}'
updatedDate: '{DATE}'
author: linguafly-team
title: '{kw["title"]}'
description: >-
  {kw["description"]}
readTime: 15 min
keywords:
{keywords}
canonical: 'https://linguafly.app/blog/curso-b2/{kw["slug"]}'
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

> **Practica en el curso:** [Unidad {kw["unit"]}](/curso-b2/unit-{kw["unit"]})  
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

## Siguiente paso

- Curso: {kw["next_course"]}
- Blog: {kw["next_blog"]}

### Guías relacionadas

{guides}
"""


def write_articles():
    write_md(
        "unidad-11-relative-clauses-culture.md",
        article(
            slug="unidad-11-relative-clauses-culture",
            unit=11,
            title="Relative Clauses B2: Defining & Non-defining + Culture",
            description="Aprende defining y non-defining relative clauses (who/which/that/whose/where) en inglés B2 con vocabulario de culture & urban life. Guía Unidad 11 con audios.",
            image="/blog/curso-b2/unit-11/relative-clauses.png",
            alt="Relative clauses culture B2",
            keywords=[
                "relative clauses B2",
                "defining non-defining English",
                "who which that whose where",
                "culture vocabulary B2",
                "inglés B2 unidad 11",
            ],
            related=["unidad-10-repaso-6-9", "unidad-12-relative-clauses-reduction", HUB],
            faqs=[
                (
                    "¿Defining o non-defining?",
                    "**Defining** = información esencial, **sin comas**. **Non-defining** = extra, **con comas**; no uses *that*.",
                ),
                (
                    "¿Who, which o that?",
                    "En defining: **who** (personas), **which/that** (cosas), **whose** (posesión), **where** (lugar). En non-defining: **who/which**, no *that*.",
                ),
                (
                    "¿Cuándo uso where?",
                    "Con lugares cuando la cláusula funciona como complemento de lugar: the district **where** I grew up.",
                ),
                ("¿Dónde practico?", "En la [Unidad 11 del curso B2](/curso-b2/unit-11)."),
            ],
            excerpt="Guía de la Unidad 11 del curso B2: relative clauses y vocabulario de culture & urban life.",
            intro="Tras el [Repaso 6–9](/blog/curso-b2/unidad-10-repaso-6-9), la **Unidad 11** introduce **defining y non-defining relative clauses** con vocabulario de **culture & urban life**.",
            before="[U10 — Repaso 6–9](/blog/curso-b2/unidad-10-repaso-6-9)",
            learn=[
                "**Defining** relative clauses (sin comas)",
                "**Non-defining** relative clauses (con comas)",
                "**who / which / that / whose / where**",
                "Vocabulario: culture & urban life",
            ],
            sections=r"""## 1. Defining vs non-defining relative clauses

| Tipo | Comas | Pronombres | Ejemplo |
| :--- | :--- | :--- | :--- |
| **Defining** | no | who / which / that / whose / where | The district **that** we visited has a mural. |
| **Non-defining** | sí | who / which / whose (no *that*) | The festival, **which** is annual, attracts thousands. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-11/defining-district.mp3" title="🔊 defining"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-11/non-defining-festival.mp3" title="🔊 non-defining"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-11/whose-neighbour.mp3" title="🔊 whose"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-11/where-landmark.mp3" title="🔊 where"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-11/who-volunteer.mp3" title="🔊 who"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-11/which-heritage.mp3" title="🔊 which"></audio>

> The landmark **where** we met is near the skyscraper.  
> My neighbour, **whose** family runs the festival, is very friendly.

---

## 3. Vocabulario: Culture & urban life

![Culture vocabulary](/blog/curso-b2/unit-11/culture-vocab.png)

| Word | Idea |
| :--- | :--- |
| district / landmark | barrio / punto de referencia |
| heritage / tradition | patrimonio / tradición |
| festival / nightlife | festival / vida nocturna |
| mural / community | mural / comunidad |

---

## 4. Reading

![Culture in context](/blog/curso-b2/unit-11/culture-scene.png)

> The district that we visited has a famous mural. The festival, which is annual, attracts thousands. My neighbour, whose family runs the festival, is friendly. The landmark where we met is near the skyscraper.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-11/reading-u11.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-11/dialogue-u11.mp3" title="🔊 Dialogue"></audio>

> Know this district? — The district where I grew up has a new mural.  
> Annual festival? — The festival, which is annual, is next month.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-11/practice-u11.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. The district ___ we visited has a mural. (that / , which)  
2. The festival, ___ is annual, attracts thousands. (which / that)  
3. My neighbour, ___ family runs the festival, is friendly. (whose / who)  
4. The landmark ___ we met is near the skyscraper. (where / which)  
5. Vocab: punto de referencia urbano = ___

<details><summary>Ver solución</summary>

1. **that** · 2. **which** · 3. **whose** · 4. **where** · 5. **landmark**
</details>""",
            tip="Si quitas la cláusula y la frase **pierde sentido**, es **defining** (sin comas). Si solo añade detalle extra, es **non-defining** (con comas).",
            next_course="[Unidad 12 — Reduced relatives](/curso-b2/unit-12)",
            next_blog="[U12 — Reduced relatives + entertainment](/blog/curso-b2/unidad-12-relative-clauses-reduction)",
            guides=["[U10 Repaso](/blog/curso-b2/unidad-10-repaso-6-9)", "[Inglés B2](/blog/metodos/ingles-b2)"],
        ),
    )

    write_md(
        "unidad-12-relative-clauses-reduction.md",
        article(
            slug="unidad-12-relative-clauses-reduction",
            unit=12,
            title="Reduced Relative Clauses B2: -ing & -ed + Entertainment",
            description="Aprende reduced relative clauses (-ing / -ed) en inglés B2 con vocabulario de entertainment y gardening. Guía Unidad 12 con audios.",
            image="/blog/curso-b2/unit-12/reduced-relatives.png",
            alt="Reduced relative clauses B2",
            keywords=[
                "reduced relative clauses B2",
                "ing ed relative reduction",
                "entertainment vocabulary B2",
                "inglés B2 unidad 12",
            ],
            related=["unidad-11-relative-clauses-culture", "unidad-13-modals-money", HUB],
            faqs=[
                (
                    "¿Qué es una reduced relative clause?",
                    "Omite el pronombre relativo + verbo *be*: *People **who are** attending* → *People **attending***.",
                ),
                (
                    "¿-ing o -ed?",
                    "**-ing** = activa (*People attending…*). **-ed** = pasiva (*The soundtrack recorded…*).",
                ),
                (
                    "¿Cuándo no reducir?",
                    "Si el verbo no es *be* o la cláusula es non-defining con información extra compleja, mantén la forma completa.",
                ),
                ("¿Dónde practico?", "En la [Unidad 12 del curso B2](/curso-b2/unit-12)."),
            ],
            excerpt="Guía de la Unidad 12 del curso B2: reduced relative clauses y vocabulario de entertainment & gardening.",
            intro="Tras [Relative clauses & Culture](/blog/curso-b2/unidad-11-relative-clauses-culture), la **Unidad 12** trabaja **reduced relative clauses (-ing / -ed)** con vocabulario de **entertainment & gardening**.",
            before="[U11 — Relative clauses & Culture](/blog/curso-b2/unidad-11-relative-clauses-culture)",
            learn=[
                "Reducción con **-ing** (activa)",
                "Reducción con **-ed** (pasiva)",
                "Contraste con cláusulas completas",
                "Vocabulario: entertainment & gardening",
            ],
            sections=r"""## 1. Reduced relative clauses

| Forma | Tipo | Ejemplo completo → reducido |
| :--- | :--- | :--- |
| **-ing** | activa | People **who are attending** → People **attending** the premiere |
| **-ed** | pasiva | The soundtrack **that was recorded** → The soundtrack **recorded** last month |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-12/ing-premiere.mp3" title="🔊 -ing"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-12/ed-soundtrack.mp3" title="🔊 -ed"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-12/ing-seedlings.mp3" title="🔊 seedlings"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-12/ed-compost.mp3" title="🔊 compost"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-12/ing-volunteers.mp3" title="🔊 volunteers"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-12/ed-rehearsal.mp3" title="🔊 rehearsal"></audio>

> **Volunteers helping** at the exhibition greeted the audience.  
> The **rehearsal scheduled** for Friday was cancelled.

---

## 3. Vocabulario: Entertainment & gardening

![Entertainment & gardening vocabulary](/blog/curso-b2/unit-12/entertainment-garden-vocab.png)

| Word | Idea |
| :--- | :--- |
| premiere / audience | estreno / público |
| rehearsal / stage | ensayo / escenario |
| seedling / germinate | plántula / germinar |
| greenhouse / compost | invernadero / compost |

---

## 4. Reading

![Reduced relatives in context](/blog/curso-b2/unit-12/garden-scene.png)

> People attending the premiere waited outside. The soundtrack recorded last month won an award. Volunteers helping at the exhibition greeted the audience. The compost produced in the garden is ready.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-12/reading-u12.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-12/dialogue-u12.mp3" title="🔊 Dialogue"></audio>

> Long queue? — People attending the premiere waited outside.  
> Good soundtrack? — The soundtrack recorded last month won an award.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-12/practice-u12.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. People ___ (attend) the premiere waited outside.  
2. The soundtrack ___ (record) last month won an award.  
3. Volunteers ___ (help) at the exhibition greeted everyone.  
4. The compost ___ (produce) in the garden is ready.  
5. Vocab: ensayo antes de un estreno = ___

<details><summary>Ver solución</summary>

1. **attending** · 2. **recorded** · 3. **helping** · 4. **produced** · 5. **rehearsal**
</details>""",
            tip="Busca *who/which + be* o *who/which + past participle*: ahí puedes reducir a **-ing** (activa) o **-ed** (pasiva).",
            next_course="[Unidad 13 — Modals & money](/curso-b2/unit-13)",
            next_blog="[U13 — Modals obligation + money](/blog/curso-b2/unidad-13-modals-money)",
            guides=["[U11 Relative clauses](/blog/curso-b2/unidad-11-relative-clauses-culture)", "[Inglés B2](/blog/metodos/ingles-b2)"],
        ),
    )

    write_md(
        "unidad-13-modals-money.md",
        article(
            slug="unidad-13-modals-money",
            unit=13,
            title="Modals of Obligation B2: Must, Have to & Need + Money",
            description="Aprende must, have to, need to, needn't y don't have to en inglés B2 con vocabulario de money & volunteering. Guía Unidad 13 con audios.",
            image="/blog/curso-b2/unit-13/modals-obligation.png",
            alt="Modals obligation money B2",
            keywords=[
                "must have to need to B2",
                "needn't don't have to English",
                "money vocabulary B2",
                "inglés B2 unidad 13",
            ],
            related=["unidad-12-relative-clauses-reduction", "unidad-14-modal-deduction-business", HUB],
            faqs=[
                (
                    "¿Must o have to?",
                    "Ambos expresan obligación. **Must** = hablante / regla interna. **Have to** = obligación externa / reglas.",
                ),
                (
                    "¿Needn't o don't have to?",
                    "En afirmativo: **need to** = necesidad. En negativo: **needn't** y **don't have to** = no hay obligación (sinónimos en B2).",
                ),
                (
                    "¿Must en pasado?",
                    "Para pasado usa **had to** (obligación) o **didn't have to / needn't have** según el matiz.",
                ),
                ("¿Dónde practico?", "En la [Unidad 13 del curso B2](/curso-b2/unit-13)."),
            ],
            excerpt="Guía de la Unidad 13 del curso B2: modals of obligation y vocabulario de money & volunteering.",
            intro="Tras [Reduced relatives](/blog/curso-b2/unidad-12-relative-clauses-reduction), la **Unidad 13** consolida **must / have to / need to / needn't / don't have to** con vocabulario de **money & volunteering**.",
            before="[U12 — Reduced relatives](/blog/curso-b2/unidad-12-relative-clauses-reduction)",
            learn=[
                "**must / have to** (obligación)",
                "**need to** (necesidad)",
                "**needn't / don't have to** (sin obligación)",
                "Vocabulario: money & volunteering",
            ],
            sections=r"""## 1. Modals: obligation & necessity

| Modal | Significado | Ejemplo |
| :--- | :--- | :--- |
| **must** | obligación fuerte (hablante) | You **must save** all receipts. |
| **have to** | obligación (externa) | I **have to submit** the budget. |
| **need to** | necesidad | We **need to raise** donations. |
| **needn't / don't have to** | sin obligación | You **needn't pay** today. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-13/must-save.mp3" title="🔊 must"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-13/have-to-submit.mp3" title="🔊 have to"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-13/need-to-raise.mp3" title="🔊 need to"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-13/neednt-pay.mp3" title="🔊 needn't"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-13/dont-have-to.mp3" title="🔊 don't have to"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-13/must-badge.mp3" title="🔊 must badge"></audio>

> Volunteers **don't have to** work every weekend.  
> You **must wear** your badge at the shelter.

---

## 3. Vocabulario: Money & volunteering

![Money vocabulary](/blog/curso-b2/unit-13/money-vocab.png)

| Word | Idea |
| :--- | :--- |
| donation / donor | donación / donante |
| budget / loan / interest | presupuesto / préstamo / interés |
| charity / shelter | organización benéfica / refugio |
| save / afford / volunteer | ahorrar / permitirse / ser voluntario |

---

## 4. Reading

![Money & volunteering in context](/blog/curso-b2/unit-13/money-scene.png)

> You must save all receipts. I have to submit the budget by Friday. We need to raise donations. You needn't pay interest early. Volunteers don't have to work every weekend.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-13/reading-u13.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-13/dialogue-u13.mp3" title="🔊 Dialogue"></audio>

> Save receipts? — You must save all receipts for the budget.  
> Pay today? — You needn't pay today.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-13/practice-u13.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. You ___ save all receipts for the charity budget. (must)  
2. I ___ submit the budget by Friday. (have to)  
3. We ___ raise enough donations. (need to)  
4. You ___ pay interest if you repay early. (needn't)  
5. Vocab: persona que dona dinero = ___

<details><summary>Ver solución</summary>

1. **must** · 2. **have to** · 3. **need to** · 4. **needn't** · 5. **donor**
</details>""",
            tip="**Must** suena a regla o consejo del hablante; **have to** a norma externa. En negativo, **needn't** = *no es necesario* (libertad).",
            next_course="[Unidad 14 — Modal deduction](/curso-b2/unit-14)",
            next_blog="[U14 — Modals deduction + business](/blog/curso-b2/unidad-14-modal-deduction-business)",
            guides=["[U12 Reduced](/blog/curso-b2/unidad-12-relative-clauses-reduction)", "[Inglés B2](/blog/metodos/ingles-b2)"],
        ),
    )

    write_md(
        "unidad-14-modal-deduction-business.md",
        article(
            slug="unidad-14-modal-deduction-business",
            unit=14,
            title="Modals of Deduction B2: Must Have, Might Have & Business",
            description="Aprende must have, might have y can't have para deducciones pasadas en inglés B2 con vocabulario de business & fashion. Guía Unidad 14 con audios.",
            image="/blog/curso-b2/unit-14/modal-deduction.png",
            alt="Modal deduction business B2",
            keywords=[
                "must have might have can't have B2",
                "modals deduction past English",
                "business vocabulary B2",
                "inglés B2 unidad 14",
            ],
            related=["unidad-13-modals-money", "unidad-15-repaso-11-14", HUB],
            faqs=[
                (
                    "¿Qué estructura uso?",
                    "**must / might / can't + have + past participle** para deducir sobre el **pasado**.",
                ),
                (
                    "¿Must have vs can't have?",
                    "**Must have** = casi seguro que sí pasó. **Can't have** = casi imposible que pasara.",
                ),
                (
                    "¿Might have?",
                    "Posibilidad, no certeza: They **might have changed** the launch date.",
                ),
                ("¿Dónde practico?", "En la [Unidad 14 del curso B2](/curso-b2/unit-14)."),
            ],
            excerpt="Guía de la Unidad 14 del curso B2: modals of deduction (past) y vocabulario de business & fashion.",
            intro="Tras [Modals of obligation & Money](/blog/curso-b2/unidad-13-modals-money), la **Unidad 14** introduce **must have / might have / can't have** con vocabulario de **business & fashion**.",
            before="[U13 — Modals & money](/blog/curso-b2/unidad-13-modals-money)",
            learn=[
                "**must have + pp** (casi seguro)",
                "**might have + pp** (posible)",
                "**can't have + pp** (casi imposible)",
                "Vocabulario: business & fashion",
            ],
            sections=r"""## 1. Modals of deduction (past)

| Modal | Certeza | Ejemplo |
| :--- | :--- | :--- |
| **must have + pp** | ~95% seguro | She **must have missed** the deadline. |
| **might have + pp** | posible | They **might have changed** the launch date. |
| **can't have + pp** | casi imposible | He **can't have sent** the invoice yet. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-14/must-have-deadline.mp3" title="🔊 must have"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-14/might-have-launch.mp3" title="🔊 might have"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-14/cant-have-invoice.mp3" title="🔊 can't have"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-14/must-have-collection.mp3" title="🔊 collection"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-14/might-have-cloakroom.mp3" title="🔊 cloakroom"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-14/cant-have-runway.mp3" title="🔊 runway"></audio>

> The designer **must have finished** the collection early.  
> The client **might have left** the pitch in the cloakroom.

---

## 3. Vocabulario: Business & fashion

![Business vocabulary](/blog/curso-b2/unit-14/business-vocab.png)

| Word | Idea |
| :--- | :--- |
| deadline / launch | fecha límite / lanzamiento |
| brand / trend | marca / tendencia |
| client / invoice | cliente / factura |
| merger / pitch | fusión / presentación |
| runway / designer | pasarela / diseñador |

---

## 4. Reading

![Business & fashion in context](/blog/curso-b2/unit-14/business-scene.png)

> She must have missed the deadline. They might have changed the launch date. He can't have sent the invoice yet. The designer must have finished the collection early.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-14/reading-u14.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-14/dialogue-u14.mp3" title="🔊 Dialogue"></audio>

> Missed the deadline? — She must have missed it.  
> Sent the invoice? — He can't have sent it yet.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-14/practice-u14.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. She ___ (miss) the deadline. (must have)  
2. They ___ (change) the launch date. (might have)  
3. He ___ (send) the invoice yet. (can't have)  
4. The designer ___ (finish) the collection early. (must have)  
5. Vocab: pasarela de moda = ___

<details><summary>Ver solución</summary>

1. **must have missed** · 2. **might have changed** · 3. **can't have sent** · 4. **must have finished** · 5. **runway**
</details>""",
            tip="Piensa en **evidencia**: si la evidencia apunta fuerte → *must have*; si hay duda → *might have*; si contradice lo posible → *can't have*.",
            next_course="[Unidad 15 — Repaso 11–14](/curso-b2/unit-15)",
            next_blog="[U15 — Repaso 11–14](/blog/curso-b2/unidad-15-repaso-11-14)",
            guides=["[U13 Modals](/blog/curso-b2/unidad-13-modals-money)", "[Inglés B2](/blog/metodos/ingles-b2)"],
        ),
    )

    write_md(
        "unidad-15-repaso-11-14.md",
        article(
            slug="unidad-15-repaso-11-14",
            unit=15,
            title="Repaso B2 Unidades 11–14: Relatives, Modals & Deduction",
            description="Repasa relative clauses, reduced relatives, modals of obligation y modals of deduction del módulo 2 B2. Guía Unidad 15 con audios.",
            image="/blog/curso-b2/unit-15/review-map.png",
            alt="Repaso B2 unidades 11 a 14",
            keywords=[
                "repaso B2 módulo 2",
                "relative clauses modals deduction",
                "reduced relatives review",
                "inglés B2 unidad 15",
            ],
            related=[
                "unidad-11-relative-clauses-culture",
                "unidad-14-modal-deduction-business",
                HUB,
            ],
            faqs=[
                (
                    "¿Qué repasa la U15?",
                    "Relative clauses (U11), reduced relatives (U12), modals of obligation (U13) y modals of deduction (U14).",
                ),
                (
                    "¿Orden de estudio?",
                    "Repasa las tablas de cada unidad y luego los ejemplos mezclados de esta guía.",
                ),
                (
                    "¿Siguiente módulo?",
                    "Tras este repaso, el curso sigue con la Unidad 16.",
                ),
                ("¿Dónde practico?", "En la [Unidad 15 del curso B2](/curso-b2/unit-15)."),
            ],
            excerpt="Guía de la Unidad 15 del curso B2: repaso integrado de las unidades 11–14.",
            intro="La **Unidad 15** integra [Relative clauses](/blog/curso-b2/unidad-11-relative-clauses-culture), [Reduced relatives](/blog/curso-b2/unidad-12-relative-clauses-reduction), [Modals obligation](/blog/curso-b2/unidad-13-modals-money) y [Modals deduction](/blog/curso-b2/unidad-14-modal-deduction-business).",
            before="[U14 — Modal deduction & Business](/blog/curso-b2/unidad-14-modal-deduction-business)",
            learn=[
                "Repaso **defining / non-defining relatives**",
                "Repaso **reduced relatives (-ing / -ed)**",
                "Repaso **must / have to / needn't**",
                "Repaso **must have / might have / can't have**",
                "Vocabulario: culture · entertainment · money · business",
            ],
            sections=r"""## 1. Mapa del repaso

![Review map](/blog/curso-b2/unit-15/review-map.png)

| Unidad | Gramática | Vocab |
| :--- | :--- | :--- |
| **11** | relative clauses | culture & urban life |
| **12** | reduced relatives | entertainment & gardening |
| **13** | modals obligation | money & volunteering |
| **14** | modals deduction | business & fashion |

---

## 2. Ejemplos mezclados

![Review examples](/blog/curso-b2/unit-15/review-examples.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-15/review-relative.mp3" title="🔊 relative"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-15/review-reduced.mp3" title="🔊 reduced"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-15/review-obligation.mp3" title="🔊 obligation"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-15/review-deduction.mp3" title="🔊 deduction"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-15/review-reduced-ed.mp3" title="🔊 -ed"></audio>

---

## 3. Reading

> The festival, which is annual, attracts thousands. Volunteers helping at the exhibition greeted the audience. You must save receipts. She must have missed the deadline. The compost produced in the garden is ready.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-15/reading-mix.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-15/dialogue-mix.mp3" title="🔊 Dialogue"></audio>

> Annual festival? — The festival, which is annual, is next month.  
> Missed deadline? — She must have missed it.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-15/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios

1. The festival, ___ is annual, attracts thousands. (which)  
2. Volunteers ___ (help) at the exhibition greeted everyone.  
3. You ___ save all receipts for the budget. (must)  
4. She ___ (miss) the deadline. (must have)  
5. The compost ___ (produce) in the garden is ready.

<details><summary>Ver solución</summary>

1. **which** · 2. **helping** · 3. **must** · 4. **must have missed** · 5. **produced**
</details>""",
            tip="En el repaso, identifica primero el **tipo de estructura** (relative / reduced / obligation / deduction) y después elige la forma correcta.",
            next_course="[Unidad 16](/curso-b2/unit-16)",
            next_blog="[U11 Relative clauses](/blog/curso-b2/unidad-11-relative-clauses-culture) · [U14 Deduction](/blog/curso-b2/unidad-14-modal-deduction-business)",
            guides=[
                "[U11](/blog/curso-b2/unidad-11-relative-clauses-culture)",
                "[U12](/blog/curso-b2/unidad-12-relative-clauses-reduction)",
                "[U13](/blog/curso-b2/unidad-13-modals-money)",
                "[U14](/blog/curso-b2/unidad-14-modal-deduction-business)",
            ],
        ),
    )


def main():
    diagrams()
    make_audios()
    write_articles()
    print("done B2 theory U11–15")


if __name__ == "__main__":
    diagrams()
    make_audios()
    write_articles()
    print("done B2 theory U11–15")
