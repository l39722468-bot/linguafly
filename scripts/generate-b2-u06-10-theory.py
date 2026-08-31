#!/usr/bin/env python3
"""Generate B2 theory U06–10: diagrams, markdown, TTS audios.

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
    # U6 wish
    img, d = canvas()
    title(d, "Wish / If only (B2)")
    card(d, (48, 110, 580, 600))
    d.text((72, 140), "Present regret", fill=ACCENT, font=font(26, True))
    d.text((72, 210), "wish + past simple", fill=INK, font=font(22))
    d.text((72, 270), "I wish I had a bigger studio.", fill=INK, font=font(20))
    d.text((72, 340), "wish + could", fill=INK, font=font(22))
    d.text((72, 400), "I wish I could play better.", fill=INK, font=font(20))
    card(d, (620, 110, 1150, 600))
    d.text((644, 140), "Past regret", fill=ACCENT, font=font(26, True))
    d.text((644, 210), "wish / if only + past perfect", fill=INK, font=font(20))
    d.text((644, 280), "I wish I hadn't missed that note.", fill=INK, font=font(20))
    d.text((644, 350), "If only you had told me sooner.", fill=INK, font=font(20))
    d.text((644, 430), "wish + would (change)", fill=INK, font=font(22))
    d.text((644, 490), "I wish they would stop playing loudly.", fill=INK, font=font(18))
    save(img, 6, "wish-if-only.png")

    vocab_grid(
        6,
        "feelings-vocab.png",
        "Feelings & emotions",
        [
            "anxious",
            "relieved",
            "frustrated",
            "proud",
            "embarrassed",
            "grateful",
            "overwhelmed",
            "disappointed",
            "confident",
            "lonely",
            "thrilled",
            "upset",
        ],
    )

    img, d = canvas()
    title(d, "Feelings in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "I wish I weren't so anxious before every audition.",
            "She was relieved when the rehearsal finished.",
            "If only he had felt more confident yesterday.",
            "They were thrilled after the festival.",
        ]
    ):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(22))
    save(img, 6, "feelings-scene.png")

    # U7 would rather
    img, d = canvas()
    title(d, "Would rather / prefer / It's time")
    card(d, (48, 110, 400, 600))
    d.text((72, 140), "would rather", fill=ACCENT, font=font(24, True))
    d.text((72, 210), "+ infinitive (no to)", fill=INK, font=font(20))
    d.text((72, 270), "I would rather stay in.", fill=INK, font=font(18))
    d.text((72, 340), "+ subject + past", fill=INK, font=font(20))
    d.text((72, 400), "I'd rather you came early.", fill=INK, font=font(18))
    card(d, (430, 110, 780, 600))
    d.text((454, 140), "would prefer", fill=ACCENT, font=font(24, True))
    d.text((454, 210), "+ to infinitive", fill=INK, font=font(20))
    d.text((454, 270), "I'd prefer to leave early.", fill=INK, font=font(18))
    d.text((454, 340), "+ noun + to + noun", fill=INK, font=font(20))
    d.text((454, 400), "I'd prefer tea to coffee.", fill=INK, font=font(18))
    card(d, (810, 110, 1150, 600))
    d.text((834, 140), "It's time", fill=ACCENT, font=font(24, True))
    d.text((834, 210), "+ subject + past", fill=INK, font=font(20))
    d.text((834, 270), "It's time we left.", fill=INK, font=font(18))
    d.text((834, 340), "It's high time they", fill=INK, font=font(18))
    d.text((834, 380), "apologised.", fill=INK, font=font(18))
    save(img, 7, "would-rather-prefer.png")

    vocab_grid(
        7,
        "family-vocab.png",
        "Family vocabulary",
        [
            "relative",
            "in-laws",
            "sibling",
            "nephew",
            "niece",
            "cousin",
            "stepmother",
            "household",
            "raise",
            "bring up",
            "get along",
            "reunion",
        ],
    )

    img, d = canvas()
    title(d, "Family preferences")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "I'd rather spend Sunday with my siblings.",
            "My parents would rather I lived closer.",
            "It's high time we organised a family reunion.",
            "She would prefer not to discuss money at dinner.",
        ]
    ):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(22))
    save(img, 7, "family-scene.png")

    # U8 mixed conditionals
    img, d = canvas()
    title(d, "Mixed conditionals")
    card(d, (48, 110, 1150, 560))
    lines = [
        "Past → present: If + past perfect → would + infinitive",
        "If he had caught the bus, he would be here now.",
        "Past → future: If + past perfect → would + infinitive (future)",
        "If she had passed the interview, she would start next week.",
        "Present → past: If + past simple → would have + pp",
        "If I were taller, I would have joined the team.",
    ]
    for i, t in enumerate(lines):
        d.text((80, 140 + i * 70), t, fill=INK, font=font(22, i % 2 == 0))
    save(img, 8, "mixed-conditionals.png")

    vocab_grid(
        8,
        "travel-vocab.png",
        "Travel vocabulary",
        [
            "itinerary",
            "layover",
            "boarding",
            "check-in",
            "check-out",
            "reservation",
            "sightseeing",
            "souvenir",
            "jet lag",
            "customs",
            "delay",
            "destination",
        ],
    )

    img, d = canvas()
    title(d, "Travel + mixed conditionals")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "If we had booked the hotel last week, we would have a room now.",
            "If they had bought the tickets earlier, they would be attending tonight.",
            "If I had known about the delay, I would not be at the gate now.",
            "If she had won the scholarship, she would be studying abroad now.",
        ]
    ):
        d.text((80, 160 + i * 90), f"{i+1}. {t}", fill=INK, font=font(20))
    save(img, 8, "travel-scene.png")

    # U9 participles
    img, d = canvas()
    title(d, "Participle clauses")
    card(d, (48, 110, 400, 600))
    d.text((72, 140), "-ing", fill=ACCENT, font=font(28, True))
    d.text((72, 210), "active / simultaneous", fill=INK, font=font(20))
    d.text((72, 280), "Walking along the beach,", fill=INK, font=font(18))
    d.text((72, 320), "he found a shell.", fill=INK, font=font(18))
    card(d, (430, 110, 780, 600))
    d.text((454, 140), "-ed", fill=ACCENT, font=font(28, True))
    d.text((454, 210), "passive meaning", fill=INK, font=font(20))
    d.text((454, 280), "Disturbed by the news,", fill=INK, font=font(18))
    d.text((454, 320), "she couldn't sleep.", fill=INK, font=font(18))
    card(d, (810, 110, 1150, 600))
    d.text((834, 140), "Having + pp", fill=ACCENT, font=font(24, True))
    d.text((834, 210), "completed before", fill=INK, font=font(20))
    d.text((834, 280), "Having finished the tasks,", fill=INK, font=font(18))
    d.text((834, 320), "we went home.", fill=INK, font=font(18))
    save(img, 9, "participle-clauses.png")

    vocab_grid(
        9,
        "environment-vocab.png",
        "Environment vocabulary",
        [
            "pollution",
            "recycle",
            "sustainable",
            "wildlife",
            "habitat",
            "emissions",
            "conservation",
            "renewable",
            "deforestation",
            "compost",
            "carbon footprint",
            "biodiversity",
        ],
    )

    img, d = canvas()
    title(d, "Environment in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "Walking through the park, I saw a deer.",
            "Disturbed by the pollution report, she joined a campaign.",
            "Having recycled the bottles, they felt proud.",
            "Built in 1950, the bridge is still in use.",
        ]
    ):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(22))
    save(img, 9, "environment-scene.png")

    # U10 review
    img, d = canvas()
    title(d, "Review U6–U9")
    items = [("U6", "Wish / If only"), ("U7", "Rather / It's time"), ("U8", "Mixed cond."), ("U9", "Participles")]
    for i, (u, label) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), u, fill=ACCENT, font=font(34, True))
        d.text((x + 24, 260), label, fill=INK, font=font(20))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "wish · would rather · mixed conditionals · having + pp", fill=INK, font=font(22))
    d.text((72, 520), "Vocab: feelings · family · travel · environment", fill=INK, font=font(22))
    save(img, 10, "review-map.png")

    img, d = canvas()
    title(d, "Mixed examples U6–9")
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate(
        [
            "I wish I could play the guitar well. (wish + could)",
            "I'd rather you came early tomorrow. (would rather + past)",
            "If we had booked earlier, we would have a room now. (mixed)",
            "Having finished the tasks, we went home. (Having + pp)",
            "It's high time they apologised. (It's high time + past)",
        ]
    ):
        d.text((80, 150 + i * 85), f"{i+1}. {t}", fill=INK, font=font(20))
    save(img, 10, "review-examples.png")


AUDIOS = {
    6: {
        "wish-had-studio": "I wish I had a bigger studio to practise dance.",
        "wish-had-checked": "I wish I had checked that chord before playing it.",
        "if-only-told": "If only you had told me about the rehearsal sooner.",
        "wish-were": "He wishes he were at the concert right now.",
        "wish-could": "I wish I could play the guitar well.",
        "wish-would": "I wish they would stop playing so loudly.",
        "reading-u6": "I wish I had a bigger studio. If only you had told me sooner. He wishes he were at the concert. I wish I could play well. I wish they would stop playing so loudly.",
        "dialogue-u6": "Nervous about the audition? I wish I weren't so anxious. Told you about the rehearsal? If only you had told me sooner. Can you play? I wish I could play better.",
        "practice-u6": "Wish I had. If only had told. Wishes he were. Wish I could. Wish they would.",
    },
    7: {
        "rather-shop": "I would rather shop online tonight.",
        "prefer-to-buy": "He would prefer to buy local than imported.",
        "its-time-got": "It's time he got his budget under control.",
        "rather-you-came": "I would rather you came early tomorrow.",
        "prefer-not": "She would prefer not to discuss prices now.",
        "high-time": "It's high time they started apologising.",
        "reading-u7": "I would rather shop online tonight. He would prefer to buy local. It's time he got his budget under control. I would rather you came early. It's high time they started apologising.",
        "dialogue-u7": "Stay in or go out? I'd rather stay with my siblings. Prefer tea? I'd prefer tea to coffee. Time to leave? It's time we left.",
        "practice-u7": "Would rather shop. Would prefer to buy. It's time he got. Would rather you came. It's high time they started.",
    },
    8: {
        "mixed-bus": "If he had caught the bus this morning, he would be here now.",
        "mixed-booked": "If we had booked the hotel last week, we would have a room for Saturday.",
        "mixed-interview": "If he had passed the interview last Monday, he would start next week.",
        "mixed-spanish": "If I had learned Spanish at school, I would speak fluently now.",
        "mixed-tickets": "If we had bought the tickets last month, we would be attending the concert tonight.",
        "mixed-warning": "If I had listened to your warning then, I would not be in this mess now.",
        "reading-u8": "If he had caught the bus, he would be here now. If we had booked the hotel, we would have a room. If he had passed the interview, he would start next week. If I had learned Spanish, I would speak fluently now.",
        "dialogue-u8": "Missed the bus? If he had caught it, he would be here. Booked yet? If we had booked last week, we would have a room. Studying abroad? If she had won the scholarship, she would be studying there now.",
        "practice-u8": "Had caught, would be. Had booked, would have. Had passed, would start. Had learned, would speak.",
    },
    9: {
        "having-completed": "Having completed the report, she sent it to the manager.",
        "walking-beach": "Walking along the beach, he found a shell.",
        "disturbed-news": "Disturbed by the news, she couldn't sleep.",
        "having-finished": "Having finished all the tasks, we went home.",
        "built-bridge": "The bridge built in nineteen fifty is still in use.",
        "waiting-train": "Waiting for the train, they chatted about work.",
        "reading-u9": "Having completed the report, she sent it. Walking along the beach, he found a shell. Disturbed by the news, she couldn't sleep. Having finished the tasks, we went home. The bridge built in nineteen fifty is still in use.",
        "dialogue-u9": "Finished already? Having finished the tasks, we went home. Find anything? Walking along the beach, he found a shell. Sleep well? Disturbed by the news, she couldn't sleep.",
        "practice-u9": "Having completed. Walking along. Disturbed by. Having finished. Built in.",
    },
    10: {
        "review-wish": "I wish I could play the guitar well.",
        "review-rather": "I would rather you came early tomorrow.",
        "review-mixed": "If we had booked earlier, we would have a room now.",
        "review-participle": "Having finished the tasks, we went home.",
        "review-time": "It's high time they apologised.",
        "reading-mix": "I wish I could play the guitar well. I would rather you came early. If we had booked earlier, we would have a room now. Having finished the tasks, we went home. It's high time they apologised.",
        "dialogue-mix": "Wish you could play? I wish I could. Prefer I come early? I'd rather you came early. Booked? If we had booked earlier, we would have a room.",
        "practice-mix": "Wish I could. Would rather you came. Had booked, would have. Having finished. It's high time.",
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
        "unidad-6-wish-if-only-feelings.md",
        article(
            slug="unidad-6-wish-if-only-feelings",
            unit=6,
            title="Wish & If Only B2: Deseos, Arrepentimientos y Feelings",
            description="Aprende wish/if only (presente y pasado) en inglés B2 con vocabulario de feelings. Guía Unidad 6 con audios.",
            image="/blog/curso-b2/unit-6/wish-if-only.png",
            alt="Wish if only feelings B2",
            keywords=[
                "wish if only B2",
                "wish past perfect English",
                "feelings vocabulary B2",
                "inglés B2 unidad 6",
            ],
            related=["unidad-5-repaso-1-4", "unidad-7-would-rather-family", HUB],
            faqs=[
                (
                    "¿Wish + past simple o past perfect?",
                    "**Past simple / were / could** = presente irreal. **Past perfect** = arrepentimiento pasado.",
                ),
                (
                    "¿If only es igual que wish?",
                    "Sí en significado; **If only** suele sonar más enfático.",
                ),
                (
                    "¿Wish + would?",
                    "Para queja o deseo de **cambio de comportamiento**: I wish they **would** stop…",
                ),
                ("¿Dónde practico?", "En la [Unidad 6 del curso B2](/curso-b2/unit-6)."),
            ],
            excerpt="Guía de la Unidad 6 del curso B2: wish/if only y vocabulario de feelings.",
            intro="Tras el [Repaso 1–4](/blog/curso-b2/unidad-5-repaso-1-4), la **Unidad 6** profundiza **wish / if only** (presente y pasado) con vocabulario de **feelings**.",
            before="[U5 — Repaso 1–4](/blog/curso-b2/unidad-5-repaso-1-4)",
            learn=[
                "**wish + past simple / were** (presente irreal)",
                "**wish / if only + past perfect** (pasado)",
                "**wish + could** (habilidad)",
                "**wish + would** (cambio/queja)",
                "Vocabulario: feelings & emotions",
            ],
            sources="Wish / If only",
            sections=r"""## 1. Wish / If only: presente vs pasado

| Estructura | Uso | Ejemplo |
| :--- | :--- | :--- |
| **wish + past simple / were** | presente irreal | I **wish I had** a bigger studio. |
| **wish + could** | habilidad presente | I **wish I could** play well. |
| **wish / if only + past perfect** | arrepentimiento pasado | If only you **had told** me sooner. |
| **wish + would** | cambio / queja | I **wish they would** stop playing loudly. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-6/wish-had-studio.mp3" title="🔊 wish present"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-6/wish-had-checked.mp3" title="🔊 wish past"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-6/if-only-told.mp3" title="🔊 if only"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-6/wish-were.mp3" title="🔊 wish were"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-6/wish-could.mp3" title="🔊 wish could"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-6/wish-would.mp3" title="🔊 wish would"></audio>

> He **wishes he were** at the concert right now.  
> I **wish I could** play the guitar well.

---

## 3. Vocabulario: Feelings

![Feelings vocabulary](/blog/curso-b2/unit-6/feelings-vocab.png)

| Word | Idea |
| :--- | :--- |
| anxious / relieved | ansioso / aliviado |
| frustrated / proud | frustrado / orgulloso |
| overwhelmed / thrilled | abrumado / emocionado |

---

## 4. Reading

![Feelings in context](/blog/curso-b2/unit-6/feelings-scene.png)

> I wish I had a bigger studio. If only you had told me sooner. He wishes he were at the concert. I wish I could play well. I wish they would stop playing so loudly.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-6/reading-u6.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-6/dialogue-u6.mp3" title="🔊 Dialogue"></audio>

> Nervous about the audition? — I wish I weren't so anxious.  
> Told you about the rehearsal? — If only you had told me sooner.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-6/practice-u6.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I wish I ___ (have) a bigger studio.  
2. If only you ___ (tell) me sooner.  
3. He wishes he ___ (be) at the concert now.  
4. I wish I ___ (can) play better.  
5. I wish they ___ (stop) playing so loudly.

<details><summary>Ver solución</summary>

1. **had** · 2. **had told** · 3. **were** · 4. **could** · 5. **would stop**
</details>""",
            tip="Si el deseo es sobre **ahora**, usa pasado simple / *were* / *could*. Si es sobre **antes**, usa **past perfect**.",
            next_course="[Unidad 7 — Would rather & Family](/curso-b2/unit-7)",
            next_blog="[U7 — Would rather + family](/blog/curso-b2/unidad-7-would-rather-family)",
            guides=["[U5 Repaso](/blog/curso-b2/unidad-5-repaso-1-4)", "[Inglés B2](/blog/metodos/ingles-b2)"],
        ),
    )

    write_md(
        "unidad-7-would-rather-family.md",
        article(
            slug="unidad-7-would-rather-family",
            unit=7,
            title="Would Rather & It's Time B2 + Family Vocabulary",
            description="Aprende would rather, would prefer e It's time en inglés B2 con vocabulario de family. Guía Unidad 7 con audios.",
            image="/blog/curso-b2/unit-7/would-rather-prefer.png",
            alt="Would rather family B2",
            keywords=[
                "would rather B2",
                "would prefer English",
                "it's time past simple",
                "family vocabulary B2",
                "inglés B2 unidad 7",
            ],
            related=["unidad-6-wish-if-only-feelings", "unidad-8-mixed-conditionals-travel", HUB],
            faqs=[
                (
                    "¿Rather o prefer?",
                    "**Would rather + infinitivo sin to**. **Would prefer + to + infinitivo** (o sustantivo + to + sustantivo).",
                ),
                (
                    "¿It's time + pasado?",
                    "Sí: It's time we **left** (= ya toca / debería haber pasado). También *It's high / about time*.",
                ),
                (
                    "¿Rather + sujeto?",
                    "I'd rather **you came** early = preferencia sobre la acción de otra persona (pasado en forma).",
                ),
                ("¿Dónde practico?", "En la [Unidad 7 del curso B2](/curso-b2/unit-7)."),
            ],
            excerpt="Guía de la Unidad 7 del curso B2: would rather / prefer, It's time y family.",
            intro="Tras [Wish & If only](/blog/curso-b2/unidad-6-wish-if-only-feelings), la **Unidad 7** trabaja **would rather / prefer** e **It's time** con vocabulario de **family**.",
            before="[U6 — Wish & If only](/blog/curso-b2/unidad-6-wish-if-only-feelings)",
            learn=[
                "**would rather + infinitive** (sin *to*)",
                "**would rather + subject + past**",
                "**would prefer + to infinitive**",
                "**It's (high) time + past**",
                "Vocabulario: family",
            ],
            sources="Would rather / It's time",
            sections=r"""## 1. Would rather / would prefer / It's time

| Estructura | Forma | Ejemplo |
| :--- | :--- | :--- |
| **would rather** | + infinitivo sin *to* | I **would rather shop** online. |
| **would rather** | + sujeto + pasado | I'd **rather you came** early. |
| **would prefer** | + *to* infinitivo | He **would prefer to buy** local. |
| **It's (high) time** | + sujeto + pasado | **It's time** he **got** control. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-7/rather-shop.mp3" title="🔊 rather"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-7/prefer-to-buy.mp3" title="🔊 prefer"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-7/its-time-got.mp3" title="🔊 it's time"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-7/rather-you-came.mp3" title="🔊 rather + subject"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-7/prefer-not.mp3" title="🔊 prefer not"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-7/high-time.mp3" title="🔊 high time"></audio>

> **It's high time** they **started** apologising.

---

## 3. Vocabulario: Family

![Family vocabulary](/blog/curso-b2/unit-7/family-vocab.png)

| Word | Idea |
| :--- | :--- |
| sibling / cousin | hermano(a) / primo(a) |
| in-laws / household | políticos / hogar |
| get along / reunion | llevarse bien / reunión |

---

## 4. Reading

![Family preferences](/blog/curso-b2/unit-7/family-scene.png)

> I would rather shop online tonight. He would prefer to buy local. It's time he got his budget under control. I would rather you came early. It's high time they started apologising.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-7/reading-u7.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-7/dialogue-u7.mp3" title="🔊 Dialogue"></audio>

> Stay in or go out? — I'd rather stay with my siblings.  
> Time to leave? — It's time we left.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-7/practice-u7.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I would rather ___ (shop) online tonight.  
2. He would prefer ___ (buy) local.  
3. It's time he ___ (get) his budget under control.  
4. I would rather you ___ (come) early.  
5. It's high time they ___ (start) apologising.

<details><summary>Ver solución</summary>

1. **shop** · 2. **to buy** · 3. **got** · 4. **came** · 5. **started**
</details>""",
            tip="*Would rather* **no** lleva *to*. *Would prefer* **sí** suele llevar *to* + infinitivo.",
            next_course="[Unidad 8 — Mixed conditionals](/curso-b2/unit-8)",
            next_blog="[U8 — Mixed conditionals + travel](/blog/curso-b2/unidad-8-mixed-conditionals-travel)",
            guides=["[U6 Wish](/blog/curso-b2/unidad-6-wish-if-only-feelings)", "[Inglés B2](/blog/metodos/ingles-b2)"],
        ),
    )

    write_md(
        "unidad-8-mixed-conditionals-travel.md",
        article(
            slug="unidad-8-mixed-conditionals-travel",
            unit=8,
            title="Mixed Conditionals B2: Pasado → Presente/Futuro + Travel",
            description="Aprende mixed conditionals en inglés B2 con vocabulario de travel. Guía Unidad 8 con audios y ejemplos.",
            image="/blog/curso-b2/unit-8/mixed-conditionals.png",
            alt="Mixed conditionals travel B2",
            keywords=[
                "mixed conditionals B2",
                "if past perfect would",
                "travel vocabulary B2",
                "inglés B2 unidad 8",
            ],
            related=["unidad-7-would-rather-family", "unidad-9-participle-clauses-environment", HUB],
            faqs=[
                (
                    "¿Qué es un mixed conditional?",
                    "Combina tiempos de distintos condicionales: p. ej. **pasado irreal** → **resultado presente**.",
                ),
                (
                    "¿Fórmula más frecuente?",
                    "**If + past perfect**, **would + infinitive** (ahora / futuro): If he **had caught** the bus, he **would be** here now.",
                ),
                (
                    "¿También presente → pasado?",
                    "Sí: If I **were** taller, I **would have joined** the team.",
                ),
                ("¿Dónde practico?", "En la [Unidad 8 del curso B2](/curso-b2/unit-8)."),
            ],
            excerpt="Guía de la Unidad 8 del curso B2: mixed conditionals y travel.",
            intro="Tras [Would rather & Family](/blog/curso-b2/unidad-7-would-rather-family), la **Unidad 8** consolida **mixed conditionals** con vocabulario de **travel**.",
            before="[U7 — Would rather & Family](/blog/curso-b2/unidad-7-would-rather-family)",
            learn=[
                "Mixed: **pasado → presente**",
                "Mixed: **pasado → futuro**",
                "Contraste con 2.º / 3.er condicional",
                "Vocabulario: travel",
            ],
            sources="Mixed conditionals",
            sections=r"""## 1. Mixed conditionals

| Tipo | If-clause | Resultado | Ejemplo |
| :--- | :--- | :--- | :--- |
| Pasado → presente | past perfect | would + inf | If he **had caught** the bus, he **would be** here now. |
| Pasado → futuro | past perfect | would + inf | If he **had passed**, he **would start** next week. |
| Presente → pasado | past simple | would have + pp | If I **were** taller, I **would have joined**… |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-8/mixed-bus.mp3" title="🔊 bus"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-8/mixed-booked.mp3" title="🔊 booked"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-8/mixed-interview.mp3" title="🔊 interview"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-8/mixed-spanish.mp3" title="🔊 Spanish"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-8/mixed-tickets.mp3" title="🔊 tickets"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-8/mixed-warning.mp3" title="🔊 warning"></audio>

> If we **had bought** the tickets last month, we **would be attending** tonight.

---

## 3. Vocabulario: Travel

![Travel vocabulary](/blog/curso-b2/unit-8/travel-vocab.png)

| Word | Idea |
| :--- | :--- |
| itinerary / layover | itinerario / escala |
| check-in / check-out | registro / salida |
| delay / destination | retraso / destino |

---

## 4. Reading

![Travel scene](/blog/curso-b2/unit-8/travel-scene.png)

> If he had caught the bus, he would be here now. If we had booked the hotel, we would have a room. If he had passed the interview, he would start next week. If I had learned Spanish, I would speak fluently now.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-8/reading-u8.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-8/dialogue-u8.mp3" title="🔊 Dialogue"></audio>

> Missed the bus? — If he had caught it, he would be here.  
> Booked yet? — If we had booked last week, we would have a room.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-8/practice-u8.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. If he ___ (catch) the bus, he would be here now.  
2. If we ___ (book) the hotel, we would have a room.  
3. If he had passed, he ___ (start) next week.  
4. If I had learned Spanish, I ___ (speak) fluently now.  
5. Vocab: escala en un vuelo = ___

<details><summary>Ver solución</summary>

1. **had caught** · 2. **had booked** · 3. **would start** · 4. **would speak** · 5. **layover**
</details>""",
            tip="Pregúntate: ¿la causa es **pasada** y el resultado es **ahora**? → mixed (*had + pp* / *would + inf*).",
            next_course="[Unidad 9 — Participle clauses](/curso-b2/unit-9)",
            next_blog="[U9 — Participles + environment](/blog/curso-b2/unidad-9-participle-clauses-environment)",
            guides=["[U7](/blog/curso-b2/unidad-7-would-rather-family)", "[Inglés B2](/blog/metodos/ingles-b2)"],
        ),
    )

    write_md(
        "unidad-9-participle-clauses-environment.md",
        article(
            slug="unidad-9-participle-clauses-environment",
            unit=9,
            title="Participle Clauses B2: -ing, -ed y Having + Environment",
            description="Aprende participle clauses (-ing, -ed, Having + pp) en inglés B2 con vocabulario de environment. Guía Unidad 9 con audios.",
            image="/blog/curso-b2/unit-9/participle-clauses.png",
            alt="Participle clauses environment B2",
            keywords=[
                "participle clauses B2",
                "having past participle",
                "environment vocabulary B2",
                "inglés B2 unidad 9",
            ],
            related=["unidad-8-mixed-conditionals-travel", "unidad-10-repaso-6-9", HUB],
            faqs=[
                (
                    "¿-ing o -ed?",
                    "**-ing** = activa / simultánea (*Walking…*). **-ed** = pasiva / estado (*Disturbed by…*).",
                ),
                (
                    "¿Having + pp?",
                    "Acción **completada antes** de la principal: **Having finished**, we left.",
                ),
                (
                    "¿Mismo sujeto?",
                    "Sí: la cláusula de participio y la principal comparten sujeto.",
                ),
                ("¿Dónde practico?", "En la [Unidad 9 del curso B2](/curso-b2/unit-9)."),
            ],
            excerpt="Guía de la Unidad 9 del curso B2: participle clauses y environment.",
            intro="Tras [Mixed conditionals & Travel](/blog/curso-b2/unidad-8-mixed-conditionals-travel), la **Unidad 9** trabaja **participle clauses** con vocabulario de **environment**.",
            before="[U8 — Mixed conditionals & Travel](/blog/curso-b2/unidad-8-mixed-conditionals-travel)",
            learn=[
                "Cláusulas **-ing** (activas)",
                "Cláusulas **-ed** (pasivas)",
                "**Having + past participle**",
                "Vocabulario: environment",
            ],
            sources="Participle clauses",
            sections=r"""## 1. Participle clauses

| Forma | Significado | Ejemplo |
| :--- | :--- | :--- |
| **-ing** | activa / simultánea | **Walking** along the beach, he found a shell. |
| **-ed** | pasiva / causa | **Disturbed** by the news, she couldn't sleep. |
| **Having + pp** | completada antes | **Having finished** the tasks, we went home. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-9/walking-beach.mp3" title="🔊 -ing"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-9/disturbed-news.mp3" title="🔊 -ed"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-9/having-finished.mp3" title="🔊 Having"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-9/having-completed.mp3" title="🔊 Having completed"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-9/built-bridge.mp3" title="🔊 built"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-9/waiting-train.mp3" title="🔊 Waiting"></audio>

> The bridge **built** in 1950 is still in use.

---

## 3. Vocabulario: Environment

![Environment vocabulary](/blog/curso-b2/unit-9/environment-vocab.png)

| Word | Idea |
| :--- | :--- |
| pollution / recycle | contaminación / reciclar |
| sustainable / renewable | sostenible / renovable |
| biodiversity / habitat | biodiversidad / hábitat |

---

## 4. Reading

![Environment scene](/blog/curso-b2/unit-9/environment-scene.png)

> Having completed the report, she sent it. Walking along the beach, he found a shell. Disturbed by the news, she couldn't sleep. Having finished the tasks, we went home.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-9/reading-u9.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-9/dialogue-u9.mp3" title="🔊 Dialogue"></audio>

> Finished already? — Having finished the tasks, we went home.  
> Sleep well? — Disturbed by the news, she couldn't sleep.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-9/practice-u9.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. ___ along the beach, he found a shell. (Walk)  
2. ___ by the news, she couldn't sleep. (Disturb)  
3. ___ finished the tasks, we went home. (Have)  
4. The bridge ___ in 1950 is still in use. (build)  
5. Vocab: reciclar = ___

<details><summary>Ver solución</summary>

1. **Walking** · 2. **Disturbed** · 3. **Having** · 4. **built** · 5. **recycle**
</details>""",
            tip="Si la acción ya terminó **antes** de la principal, usa **Having + participio** (*Having finished…*).",
            next_course="[Unidad 10 — Repaso 6–9](/curso-b2/unit-10)",
            next_blog="[U10 — Repaso 6–9](/blog/curso-b2/unidad-10-repaso-6-9)",
            guides=["[U8 Mixed](/blog/curso-b2/unidad-8-mixed-conditionals-travel)", "[Inglés B2](/blog/metodos/ingles-b2)"],
        ),
    )

    write_md(
        "unidad-10-repaso-6-9.md",
        article(
            slug="unidad-10-repaso-6-9",
            unit=10,
            title="Repaso B2 Unidades 6–9: Wish, Rather, Mixed & Participles",
            description="Repasa wish/if only, would rather, mixed conditionals y participle clauses del módulo 1 B2. Guía Unidad 10 con audios.",
            image="/blog/curso-b2/unit-10/review-map.png",
            alt="Repaso B2 unidades 6 a 9",
            keywords=[
                "repaso B2 módulo 1",
                "wish would rather mixed conditionals",
                "participle clauses review",
                "inglés B2 unidad 10",
            ],
            related=[
                "unidad-6-wish-if-only-feelings",
                "unidad-9-participle-clauses-environment",
                HUB,
            ],
            faqs=[
                (
                    "¿Qué repasa la U10?",
                    "Wish/if only, would rather / It's time, mixed conditionals y participle clauses (U6–9).",
                ),
                (
                    "¿Orden de estudio?",
                    "Repasa primero las tablas de cada unidad y luego los ejemplos mezclados de esta guía.",
                ),
                (
                    "¿Siguiente módulo?",
                    "Tras este repaso, el curso sigue con relative clauses (Unidad 11).",
                ),
                ("¿Dónde practico?", "En la [Unidad 10 del curso B2](/curso-b2/unit-10)."),
            ],
            excerpt="Guía de la Unidad 10 del curso B2: repaso integrado de las unidades 6–9.",
            intro="La **Unidad 10** integra [Wish](/blog/curso-b2/unidad-6-wish-if-only-feelings), [Would rather](/blog/curso-b2/unidad-7-would-rather-family), [Mixed conditionals](/blog/curso-b2/unidad-8-mixed-conditionals-travel) y [Participles](/blog/curso-b2/unidad-9-participle-clauses-environment).",
            before="[U9 — Participle clauses](/blog/curso-b2/unidad-9-participle-clauses-environment)",
            learn=[
                "Repaso **wish / if only**",
                "Repaso **would rather / It's time**",
                "Repaso **mixed conditionals**",
                "Repaso **participle clauses**",
                "Vocabulario: feelings · family · travel · environment",
            ],
            sources="Review 6–9",
            sections=r"""## 1. Mapa del repaso

![Review map](/blog/curso-b2/unit-10/review-map.png)

| Unidad | Gramática | Vocab |
| :--- | :--- | :--- |
| **6** | wish / if only | feelings |
| **7** | rather / prefer / It's time | family |
| **8** | mixed conditionals | travel |
| **9** | participle clauses | environment |

---

## 2. Ejemplos mezclados

![Review examples](/blog/curso-b2/unit-10/review-examples.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-10/review-wish.mp3" title="🔊 wish"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-10/review-rather.mp3" title="🔊 rather"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-10/review-mixed.mp3" title="🔊 mixed"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-10/review-participle.mp3" title="🔊 participle"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-10/review-time.mp3" title="🔊 it's time"></audio>

---

## 3. Reading

> I wish I could play the guitar well. I would rather you came early. If we had booked earlier, we would have a room now. Having finished the tasks, we went home. It's high time they apologised.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-10/reading-mix.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-10/dialogue-mix.mp3" title="🔊 Dialogue"></audio>

> Prefer I come early? — I'd rather you came early.  
> Booked? — If we had booked earlier, we would have a room.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-10/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios

1. I wish I ___ (can) play better.  
2. I would rather you ___ (come) early.  
3. If we ___ (book) earlier, we would have a room now.  
4. ___ finished the tasks, we went home. (Have)  
5. It's high time they ___ (apologise).

<details><summary>Ver solución</summary>

1. **could** · 2. **came** · 3. **had booked** · 4. **Having** · 5. **apologised**
</details>""",
            tip="En el repaso, nombra primero la **estructura** y después completa: así detectas si mezclas *wish* con *would rather* o *mixed* con 3.er condicional.",
            next_course="[Unidad 11 — Relative clauses](/curso-b2/unit-11)",
            next_blog="[U6 Wish](/blog/curso-b2/unidad-6-wish-if-only-feelings) · [U9 Participles](/blog/curso-b2/unidad-9-participle-clauses-environment)",
            guides=[
                "[U6](/blog/curso-b2/unidad-6-wish-if-only-feelings)",
                "[U7](/blog/curso-b2/unidad-7-would-rather-family)",
                "[U8](/blog/curso-b2/unidad-8-mixed-conditionals-travel)",
                "[U9](/blog/curso-b2/unidad-9-participle-clauses-environment)",
            ],
        ),
    )


def main():
    diagrams()
    make_audios()
    write_articles()
    print("done B2 theory U06–10")


if __name__ == "__main__":
    main()
