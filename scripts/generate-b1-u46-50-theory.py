#!/usr/bin/env python3
"""Generate B1 theory U46–50: diagrams, markdown, TTS audios."""
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
    img, d = canvas(); title(d, "Had better / It's time")
    card(d, (48, 110, 580, 600)); d.text((72, 140), "had better", fill=ACCENT, font=font(28, True))
    d.text((72, 200), "+ bare infinitive", fill=INK, font=font(22))
    d.text((72, 260), "You had better leave.", fill=INK, font=font(22))
    d.text((72, 320), "had better not + verb", fill=INK, font=font(22))
    card(d, (620, 110, 1150, 600)); d.text((644, 140), "it's time", fill=ACCENT, font=font(28, True))
    d.text((644, 200), "to + infinitive", fill=INK, font=font(22))
    d.text((644, 260), "It's time to go.", fill=INK, font=font(22))
    d.text((644, 320), "(that) + past", fill=INK, font=font(22))
    d.text((644, 360), "It's time you started.", fill=INK, font=font(22))
    save(img, 46, "had-better-its-time.png")

    img, d = canvas(); title(d, "Advice vocabulary")
    words = ["advice", "advise", "warn", "urge", "recommend", "suggest", "follow", "seek advice", "consultation", "disregard", "it's high time", "it's about time"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 16, y + 48), w, fill=INK, font=font(18, True))
    save(img, 46, "advice-vocab.png")

    img, d = canvas(); title(d, "Giving advice")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(["You had better see a doctor.", "It's time to go home.", "It's high time we made a decision.", "You had better not tell him yet."]):
        d.text((80, 180 + i * 80), f"• {t}", fill=INK, font=font(24))
    save(img, 46, "advice-scene.png")

    img, d = canvas(); title(d, "Would rather / Would sooner")
    card(d, (48, 110, 580, 600)); d.text((72, 140), "would rather", fill=ACCENT, font=font(28, True))
    d.text((72, 200), "+ bare infinitive", fill=INK, font=font(22))
    d.text((72, 260), "I'd rather stay.", fill=INK, font=font(22))
    d.text((72, 320), "A than B", fill=INK, font=font(22))
    card(d, (620, 110, 1150, 600)); d.text((644, 140), "would sooner", fill=ACCENT, font=font(28, True))
    d.text((644, 200), "stronger preference", fill=INK, font=font(22))
    d.text((644, 260), "(that) + past", fill=INK, font=font(22))
    d.text((644, 320), "I'd rather you didn't.", fill=INK, font=font(22))
    save(img, 47, "would-rather-sooner.png")

    img, d = canvas(); title(d, "Preferences vocabulary")
    words = ["preference", "prefer", "favourite", "first choice", "opt for", "rather than", "choose", "would prefer", "I'd rather", "I'd sooner", "instead of", "select"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 16, y + 48), w, fill=INK, font=font(18, True))
    save(img, 47, "preferences-vocab.png")

    img, d = canvas(); title(d, "Expressing preferences")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(["I'd rather stay at home tonight.", "I'd rather walk than take the bus.", "I'd sooner die than apologise.", "I'd rather you didn't tell him."]):
        d.text((80, 180 + i * 80), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 47, "preferences-scene.png")

    img, d = canvas(); title(d, "Phrasal verbs 3")
    items = [("work out", "exercise / solve"), ("look forward to", "anticipate"), ("run out of", "have no more"), ("take care of", "look after"), ("carry out", "perform"), ("deal with", "handle")]
    for i, (en, es) in enumerate(items):
        y = 120 + i * 85; card(d, (48, y, 1150, y + 70))
        d.text((72, y + 18), en, fill=ACCENT, font=font(24, True)); d.text((520, y + 18), es, fill=INK, font=font(22))
    save(img, 48, "phrasal-verbs-3.png")

    img, d = canvas(); title(d, "Work & study")
    words = ["work out", "look forward to", "run out of", "take care of", "carry out", "deal with", "project", "research", "schedule", "deadline", "colleague", "assignment"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 12, y + 48), w, fill=INK, font=font(18, True))
    save(img, 48, "work-study-vocab.png")

    img, d = canvas(); title(d, "At work & study")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(["I work out at the gym every morning.", "I'm looking forward to my holiday.", "We ran out of milk.", "She takes care of her children.", "They carried out the research.", "I don't know how to deal with this problem."]):
        d.text((80, 150 + i * 65), f"• {t}", fill=INK, font=font(22))
    save(img, 48, "work-study-scene.png")

    img, d = canvas(); title(d, "Need / Needn't")
    card(d, (48, 110, 380, 600)); d.text((72, 140), "need", fill=ACCENT, font=font(28, True))
    d.text((72, 200), "to + infinitive", fill=INK, font=font(22))
    d.text((72, 260), "I need to go.", fill=INK, font=font(22))
    d.text((72, 320), "need + -ing", fill=INK, font=font(22))
    card(d, (410, 110, 740, 600)); d.text((434, 140), "needn't", fill=ACCENT, font=font(28, True))
    d.text((434, 200), "+ bare infinitive", fill=INK, font=font(22))
    d.text((434, 260), "You needn't hurry.", fill=INK, font=font(22))
    card(d, (772, 110, 1150, 600)); d.text((796, 140), "needn't have", fill=ACCENT, font=font(24, True))
    d.text((796, 200), "+ past participle", fill=INK, font=font(22))
    d.text((796, 260), "unnecessary past", fill=INK, font=font(22))
    save(img, 49, "need-neednt.png")

    img, d = canvas(); title(d, "Necessity vocabulary")
    words = ["necessity", "necessary", "unnecessary", "essential", "optional", "need", "needn't", "must", "require", "needn't have", "don't need to", "in need of"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 16, y + 48), w, fill=INK, font=font(18, True))
    save(img, 49, "necessity-vocab.png")

    img, d = canvas(); title(d, "Necessity in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(["You needn't hurry — we have time.", "I need to buy a ticket.", "She needn't have bought a new one.", "This needs repairing urgently.", "We needn't have booked the table."]):
        d.text((80, 180 + i * 75), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 49, "necessity-scene.png")

    img, d = canvas(); title(d, "Review 46–49")
    items = [("U46", "Had better"), ("U47", "Would rather"), ("U48", "Phrasal verbs"), ("U49", "Need/needn't")]
    for i, (u, label) in enumerate(items):
        x = 48 + i * 280; card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), u, fill=ACCENT, font=font(34, True)); d.text((x + 24, 260), label, fill=INK, font=font(20))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "had better · would rather · work out · needn't", fill=INK, font=font(22))
    d.text((72, 520), "Vocab: advice · preferences · work & study · necessity", fill=INK, font=font(22))
    save(img, 50, "review-map.png")

    img, d = canvas(); title(d, "Mixed examples")
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate([
        "You had better see a doctor. (advice)",
        "I'd rather stay at home. (preference)",
        "We ran out of milk. (phrasal verb)",
        "You needn't hurry. (no necessity)",
        "It's time to go home. (it's time)",
    ]):
        d.text((80, 160 + i * 75), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 50, "review-examples.png")


AUDIOS = {
    46: {
        "had-better": "You had better see a doctor.",
        "its-time-to": "It's time to go home.",
        "its-time-that": "It's time you started studying.",
        "had-better-not": "You had better not tell him yet.",
        "its-high-time": "It's high time we made a decision.",
        "reading-advice": "You had better see a doctor. It's time to go home. It's time you started studying. You had better not tell him yet. It's high time we made a decision.",
        "dialogue-advice": "Should I see a doctor? You had better. Is it time to go? Yes, it's time to go home. Had better tell him? Better not yet.",
        "practice-four": "Had better. It's time to. It's time you. Had better not.",
    },
    47: {
        "rather-stay": "I'd rather stay at home tonight.",
        "rather-walk": "I'd rather walk than take the bus.",
        "sooner-die": "I'd sooner die than apologise.",
        "rather-you": "I'd rather you didn't tell him.",
        "rather-not": "I'd rather not mention it.",
        "reading-prefs": "I'd rather stay at home tonight. I'd rather walk than take the bus. I'd sooner die than apologise. I'd rather you didn't tell him. I'd rather not mention it.",
        "dialogue-prefs": "Stay or go out? I'd rather stay. Walk or bus? I'd rather walk. Tell him? I'd rather you didn't.",
        "practice-four": "Rather stay. Rather walk than bus. Rather you didn't. Rather not.",
    },
    48: {
        "work-out": "I work out at the gym every morning.",
        "look-forward": "I'm looking forward to my holiday.",
        "run-out": "We ran out of milk.",
        "take-care": "She takes care of her children.",
        "carry-out": "They carried out the research.",
        "deal-with": "I don't know how to deal with this problem.",
        "reading-phrasal": "I work out at the gym every morning. I'm looking forward to my holiday. We ran out of milk. She takes care of her children. They carried out the research. I don't know how to deal with this problem.",
        "dialogue-phrasal": "Do you work out? Every morning. Looking forward to the holiday? Very much. Did you run out of milk? Yes, we did.",
        "practice-four": "Work out. Look forward to. Run out of. Deal with.",
    },
    49: {
        "neednt-hurry": "You needn't hurry — we have time.",
        "need-to": "I need to buy a ticket.",
        "neednt-have": "She needn't have bought a new one.",
        "needs-repairing": "This needs repairing urgently.",
        "neednt-booked": "We needn't have booked the table.",
        "reading-need": "You needn't hurry — we have time. I need to buy a ticket. She needn't have bought a new one. This needs repairing urgently. We needn't have booked the table.",
        "dialogue-need": "Must I hurry? No, you needn't. Do you need a ticket? Yes, I need to buy one. Needn't have booked? No, the table was empty.",
        "practice-four": "Needn't hurry. Need to buy. Needn't have bought. Needs repairing.",
    },
    50: {
        "review-had-better": "You had better see a doctor.",
        "review-rather": "I'd rather stay at home.",
        "review-phrasal": "We ran out of milk.",
        "review-neednt": "You needn't hurry.",
        "review-its-time": "It's time to go home.",
        "reading-mix": "You had better see a doctor. I'd rather stay at home. We ran out of milk. You needn't hurry. It's time to go home.",
        "dialogue-mix": "See a doctor? You had better. Stay or go? I'd rather stay. Need to hurry? No, you needn't.",
        "practice-mix": "Had better. Would rather. Run out of. Needn't. It's time to.",
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

- CEFR B1 · Cambridge B1 Preliminary · British Council — {kw["sources"]}
"""


def make_articles():
    write_md("unidad-46-had-better-its-time-advice.md", article(
        slug="unidad-46-had-better-its-time-advice", unit=46,
        title="Had Better & It's Time B1 + Advice",
        description="Aprende had better e it's time en inglés B1 con vocabulario de advice. Guía Unidad 46 con audios.",
        image="/blog/curso-b1/unit-46/had-better-its-time.png", alt="Had better it's time B1",
        keywords=["had better B1", "it's time English", "advice vocabulary", "it's high time", "inglés B1 unidad 46"],
        related=["unidad-45-repaso-41-44", "unidad-47-would-rather-preferences", "cursos-online-ingles-b1"],
        faqs=[("¿had better lleva to?", "No: **had better + infinitivo sin to** (You had better leave)."), ("¿it's time + infinitivo o pasado?", "**to + infinitivo** o **(that) + pasado** (It's time you started)."), ("¿Dónde practico?", "En la [Unidad 46 del curso B1](/curso-b1/unit-46).")],
        excerpt="Guía de la Unidad 46 del curso B1: had better, it's time y advice.",
        intro="Tras el [Repaso 41–44](/blog/curso-b1/unidad-45-repaso-41-44), la **Unidad 46** trabaja **had better**, **it's time** y vocabulario de **advice**.",
        before="[U45 — Repaso 41–44](/blog/curso-b1/unidad-45-repaso-41-44)",
        learn=["**had better / had better not** + infinitivo", "**it's time to / for**", "**it's (high/about) time (that) + past**", "Vocabulario: advice"],
        sources="Advice & modals",
        sections=r"""## 1. Had better

| Estructura | Ejemplo |
| :--- | :--- |
| **had better** + verb | You **had better** see a doctor. |
| **had better not** + verb | You **had better not** tell him. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-46/had-better.mp3" title="🔊 had better"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-46/had-better-not.mp3" title="🔊 had better not"></audio>

> Consejo fuerte, a menudo con advertencia de consecuencias.

---

## 2. It's time

| Estructura | Ejemplo |
| :--- | :--- |
| **it's time to** + infinitive | It's **time to** go home. |
| **it's time for** + noun | It's **time for** lunch. |
| **it's time (that)** + past | It's **time you started** studying. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-46/its-time-to.mp3" title="🔊 it's time to"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-46/its-time-that.mp3" title="🔊 it's time that"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-46/its-high-time.mp3" title="🔊 it's high time"></audio>

---

## 3. Vocabulario: Advice

![Advice](/blog/curso-b1/unit-46/advice-vocab.png)

| Word | Idea |
| :--- | :--- |
| advice / advise | consejo / aconsejar |
| warn / urge | advertir / instar |
| seek advice | pedir consejo |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-46/advice-scene.png)

> You had better see a doctor. It's time to go home. It's time you started studying. You had better not tell him yet. It's high time we made a decision.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-46/reading-advice.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-46/dialogue-advice.mp3" title="🔊 Dialogue"></audio>

> Should I see a doctor? — You had better.  
> Is it time to go? — Yes, it's time to go home.  
> Had better tell him? — Better not yet.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-46/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. You ___ better see a doctor.  
2. It's time ___ go home.  
3. It's time you ___ (start) studying.  
4. You had better ___ tell him yet.  
5. Vocab: consejo (sustantivo) = ___

<details><summary>Ver solución</summary>

1. **had** · 2. **to** · 3. **started** · 4. **not** · 5. **advice**
</details>""",
        tip="*Had better* no es pasado: es consejo fuerte en presente. No añadas *to*.",
        next_course="[Unidad 47 — Would rather, would sooner](/curso-b1/unit-47)",
        next_blog="[U47 — Would rather + preferences](/blog/curso-b1/unidad-47-would-rather-preferences)",
        guides=["[U45](/blog/curso-b1/unidad-45-repaso-41-44)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-47-would-rather-preferences.md", article(
        slug="unidad-47-would-rather-preferences", unit=47,
        title="Would Rather & Would Sooner B1 + Preferences",
        description="Aprende would rather y would sooner en inglés B1 con vocabulario de preferences. Guía Unidad 47 con audios.",
        image="/blog/curso-b1/unit-47/would-rather-sooner.png", alt="Would rather B1",
        keywords=["would rather B1", "would sooner English", "preferences vocabulary", "I'd rather than", "inglés B1 unidad 47"],
        related=["unidad-46-had-better-its-time-advice", "unidad-48-phrasal-verbs-work-study", "cursos-online-ingles-b1"],
        faqs=[("¿would rather + to?", "No: **would rather + infinitivo sin to**."), ("¿would rather (that) + past?", "Sí, para preferencia sobre otra persona: I'd rather **you didn't** tell him."), ("¿Dónde practico?", "En la [Unidad 47 del curso B1](/curso-b1/unit-47).")],
        excerpt="Guía de la Unidad 47 del curso B1: would rather, would sooner y preferences.",
        intro="Tras la [Unidad 46](/blog/curso-b1/unidad-46-had-better-its-time-advice), la **Unidad 47** trabaja **would rather / would sooner** con vocabulario de **preferences**.",
        before="[U46 — Had better, it's time](/blog/curso-b1/unidad-46-had-better-its-time-advice)",
        learn=["**would rather** + infinitivo", "**would rather A than B**", "**would rather (that) + past**", "Vocabulario: preferences"],
        sources="Preferences & modals",
        sections=r"""## 1. Would rather / would sooner

| Estructura | Ejemplo |
| :--- | :--- |
| **would rather** + verb | I'd **rather stay** at home. |
| **would rather A than B** | I'd **rather walk than** take the bus. |
| **would rather (that) + past** | I'd **rather you didn't** tell him. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-47/rather-stay.mp3" title="🔊 rather stay"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-47/rather-walk.mp3" title="🔊 rather walk"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-47/rather-you.mp3" title="🔊 rather you"></audio>

---

## 2. Would sooner

> **would sooner** = preferencia más fuerte (I'd sooner die than apologise).

<audio controls preload="none" src="/audio/blog/curso-b1/unit-47/sooner-die.mp3" title="🔊 would sooner"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-47/rather-not.mp3" title="🔊 rather not"></audio>

---

## 3. Vocabulario: Preferences

![Preferences](/blog/curso-b1/unit-47/preferences-vocab.png)

| Word | Idea |
| :--- | :--- |
| preference / prefer | preferencia / preferir |
| favourite / opt for | favorito / optar por |
| rather than | en lugar de |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-47/preferences-scene.png)

> I'd rather stay at home tonight. I'd rather walk than take the bus. I'd sooner die than apologise. I'd rather you didn't tell him. I'd rather not mention it.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-47/reading-prefs.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-47/dialogue-prefs.mp3" title="🔊 Dialogue"></audio>

> Stay or go out? — I'd rather stay.  
> Walk or bus? — I'd rather walk.  
> Tell him? — I'd rather you didn't.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-47/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I'd rather ___ at home.  
2. I'd rather walk ___ take the bus.  
3. I'd rather you ___ (not tell) him.  
4. I'd ___ not mention it.  
5. Vocab: preferencia = ___

<details><summary>Ver solución</summary>

1. **stay** · 2. **than** · 3. **didn't tell** · 4. **rather** · 5. **preference**
</details>""",
        tip="No confundas *would rather* (sin to) con *would prefer to* (con to).",
        next_course="[Unidad 48 — Phrasal verbs 3](/curso-b1/unit-48)",
        next_blog="[U48 — Phrasal verbs + work & study](/blog/curso-b1/unidad-48-phrasal-verbs-work-study)",
        guides=["[U46](/blog/curso-b1/unidad-46-had-better-its-time-advice)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-48-phrasal-verbs-work-study.md", article(
        slug="unidad-48-phrasal-verbs-work-study", unit=48,
        title="Phrasal Verbs 3 B1 + Work & Study",
        description="Aprende phrasal verbs 3 (work out, look forward to, run out of…) en inglés B1 con work & study. Guía Unidad 48 con audios.",
        image="/blog/curso-b1/unit-48/phrasal-verbs-3.png", alt="Phrasal verbs 3 B1",
        keywords=["phrasal verbs B1", "work out look forward to", "run out of take care of", "work study English", "inglés B1 unidad 48"],
        related=["unidad-47-would-rather-preferences", "unidad-49-need-neednt-necessity", "cursos-online-ingles-b1"],
        faqs=[("¿look forward to + infinitivo?", "No: **look forward to + -ing** o sustantivo."), ("¿run out of vs run out?", "**run out of** + objeto (We ran out of milk)."), ("¿Dónde practico?", "En la [Unidad 48 del curso B1](/curso-b1/unit-48).")],
        excerpt="Guía de la Unidad 48 del curso B1: phrasal verbs 3 y work & study.",
        intro="Tras la [Unidad 47](/blog/curso-b1/unidad-47-would-rather-preferences), la **Unidad 48** presenta **phrasal verbs 3** con vocabulario de **work & study**.",
        before="[U47 — Would rather](/blog/curso-b1/unidad-47-would-rather-preferences)",
        learn=["**work out / look forward to**", "**run out of / take care of**", "**carry out / deal with**", "Vocabulario: work & study"],
        sources="Phrasal verbs",
        sections=r"""## 1. Seis phrasal verbs clave

| Phrasal verb | Significado | Ejemplo |
| :--- | :--- | :--- |
| **work out** | entrenar / resolver | I **work out** at the gym. |
| **look forward to** | esperar con ilusión | I'm **looking forward to** my holiday. |
| **run out of** | quedarse sin | We **ran out of** milk. |
| **take care of** | cuidar de | She **takes care of** her children. |
| **carry out** | llevar a cabo | They **carried out** the research. |
| **deal with** | lidiar con | **Deal with** this problem. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-48/work-out.mp3" title="🔊 work out"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-48/look-forward.mp3" title="🔊 look forward to"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-48/run-out.mp3" title="🔊 run out of"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b1/unit-48/take-care.mp3" title="🔊 take care of"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-48/carry-out.mp3" title="🔊 carry out"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-48/deal-with.mp3" title="🔊 deal with"></audio>

---

## 3. Vocabulario: Work & study

![Work study](/blog/curso-b1/unit-48/work-study-vocab.png)

| Word | Idea |
| :--- | :--- |
| project / research | proyecto / investigación |
| schedule / deadline | horario / fecha límite |
| colleague / assignment | compañero / tarea |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-48/work-study-scene.png)

> I work out at the gym every morning. I'm looking forward to my holiday. We ran out of milk. She takes care of her children. They carried out the research. I don't know how to deal with this problem.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-48/reading-phrasal.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-48/dialogue-phrasal.mp3" title="🔊 Dialogue"></audio>

> Do you work out? — Every morning.  
> Looking forward to the holiday? — Very much.  
> Did you run out of milk? — Yes, we did.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-48/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I ___ out at the gym.  
2. I'm looking forward ___ my holiday.  
3. We ran ___ of milk.  
4. She takes care ___ her children.  
5. Vocab: llevar a cabo = carry ___

<details><summary>Ver solución</summary>

1. **work** · 2. **to** · 3. **out** · 4. **of** · 5. **out**
</details>""",
        tip="Aprende el bloque completo: *look **forward to***, no solo *look forward*.",
        next_course="[Unidad 49 — Need, needn't](/curso-b1/unit-49)",
        next_blog="[U49 — Need, needn't + necessity](/blog/curso-b1/unidad-49-need-neednt-necessity)",
        guides=["[U47](/blog/curso-b1/unidad-47-would-rather-preferences)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-49-need-neednt-necessity.md", article(
        slug="unidad-49-need-neednt-necessity", unit=49,
        title="Need & Needn't B1 + Necessity",
        description="Aprende need, needn't y needn't have en inglés B1 con vocabulario de necessity. Guía Unidad 49 con audios.",
        image="/blog/curso-b1/unit-49/need-neednt.png", alt="Need needn't B1",
        keywords=["need needn't B1", "needn't have done", "need + ing English", "necessity vocabulary", "inglés B1 unidad 49"],
        related=["unidad-48-phrasal-verbs-work-study", "unidad-50-repaso-46-49", "cursos-online-ingles-b1"],
        faqs=[("¿needn't + to?", "No: **needn't + infinitivo sin to**."), ("¿needn't have + past?", "Acción pasada **innecesaria**: You needn't have booked."), ("¿Dónde practico?", "En la [Unidad 49 del curso B1](/curso-b1/unit-49).")],
        excerpt="Guía de la Unidad 49 del curso B1: need, needn't y necessity.",
        intro="Tras la [Unidad 48](/blog/curso-b1/unidad-48-phrasal-verbs-work-study), la **Unidad 49** trabaja **need / needn't** con vocabulario de **necessity**.",
        before="[U48 — Phrasal verbs 3](/blog/curso-b1/unidad-48-phrasal-verbs-work-study)",
        learn=["**need to** + infinitivo", "**needn't** + infinitivo", "**needn't have** + past participle", "**need + -ing**", "Vocabulario: necessity"],
        sources="Necessity & modals",
        sections=r"""## 1. Need / needn't

| Forma | Estructura | Ejemplo |
| :--- | :--- | :--- |
| **need** (main verb) | need **to** + infinitive | I **need to** buy a ticket. |
| **needn't** (modal) | needn't + verb | You **needn't** hurry. |
| **needn't have** | needn't have + past participle | We **needn't have** booked. |
| **need + -ing** | needs repairing | This **needs repairing**. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-49/neednt-hurry.mp3" title="🔊 needn't"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-49/need-to.mp3" title="🔊 need to"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-49/neednt-have.mp3" title="🔊 needn't have"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b1/unit-49/needs-repairing.mp3" title="🔊 needs repairing"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-49/neednt-booked.mp3" title="🔊 needn't have booked"></audio>

> *Need + -ing* = «necesita ser hecho» (pasiva implícita).

---

## 3. Vocabulario: Necessity

![Necessity](/blog/curso-b1/unit-49/necessity-vocab.png)

| Word | Idea |
| :--- | :--- |
| necessary / unnecessary | necesario / innecesario |
| essential / optional | esencial / opcional |
| requirement | requisito |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-49/necessity-scene.png)

> You needn't hurry — we have time. I need to buy a ticket. She needn't have bought a new one. This needs repairing urgently. We needn't have booked the table.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-49/reading-need.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-49/dialogue-need.mp3" title="🔊 Dialogue"></audio>

> Must I hurry? — No, you needn't.  
> Do you need a ticket? — Yes, I need to buy one.  
> Needn't have booked? — No, the table was empty.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-49/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. You ___ hurry — we have time.  
2. I need ___ buy a ticket.  
3. She needn't ___ bought a new one.  
4. This needs ___ urgently.  
5. Vocab: innecesario = ___

<details><summary>Ver solución</summary>

1. **needn't** · 2. **to** · 3. **have** · 4. **repairing** · 5. **unnecessary**
</details>""",
        tip="*Needn't have done* = hiciste algo que resultó innecesario (pasado).",
        next_course="[Unidad 50 — Repaso 46–49](/curso-b1/unit-50)",
        next_blog="[U50 — Repaso 46–49](/blog/curso-b1/unidad-50-repaso-46-49)",
        guides=["[U48](/blog/curso-b1/unidad-48-phrasal-verbs-work-study)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-50-repaso-46-49.md", article(
        slug="unidad-50-repaso-46-49", unit=50,
        title="Repaso B1 Unidades 46–49: Advice, Preferences & Necessity",
        description="Repaso integrado B1: had better, would rather, phrasal verbs 3 y need/needn't. Guía Unidad 50 con audios.",
        image="/blog/curso-b1/unit-50/review-map.png", alt="Repaso B1 unidades 46-49",
        keywords=["repaso B1 46-49", "had better review", "would rather review", "phrasal verbs review", "inglés B1 unidad 50"],
        related=["unidad-49-need-neednt-necessity", "unidad-45-repaso-41-44", "cursos-online-ingles-b1"],
        faqs=[("¿Qué repasa la U50?", "Had better, would rather, phrasal verbs 3 y need/needn't de U46–49."), ("¿Cómo estudiar?", "Mapa + audios mixtos + ejercicios del curso."), ("¿Dónde practico?", "En la [Unidad 50 del curso B1](/curso-b1/unit-50).")],
        excerpt="Guía de repaso de la Unidad 50 del curso B1 (contenidos 46–49).",
        intro="La **Unidad 50** integra [had better](/blog/curso-b1/unidad-46-had-better-its-time-advice), [would rather](/blog/curso-b1/unidad-47-would-rather-preferences), [phrasal verbs 3](/blog/curso-b1/unidad-48-phrasal-verbs-work-study) y [need/needn't](/blog/curso-b1/unidad-49-need-neednt-necessity).",
        before="[U49 — Need, needn't](/blog/curso-b1/unidad-49-need-neednt-necessity)",
        learn=["Repaso **had better / it's time**", "Repaso **would rather**", "Repaso **phrasal verbs 3**", "Repaso **need / needn't**"],
        sources="B1 review",
        sections=r"""## 1. Mapa del repaso

![Review map](/blog/curso-b1/unit-50/review-map.png)

| Unidad | Foco |
| :--- | :--- |
| 46 | Had better / it's time + advice |
| 47 | Would rather / would sooner + preferences |
| 48 | Phrasal verbs 3 + work & study |
| 49 | Need / needn't + necessity |

---

## 2. Ejemplos mixtos

![Mixed](/blog/curso-b1/unit-50/review-examples.png)

> You **had better** see a doctor.  
> I'd **rather** stay at home.  
> We **ran out of** milk.  
> You **needn't** hurry.  
> It's **time to** go home.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-50/review-had-better.mp3" title="🔊 had better"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-50/review-rather.mp3" title="🔊 would rather"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-50/review-phrasal.mp3" title="🔊 phrasal"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-50/review-neednt.mp3" title="🔊 needn't"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-50/review-its-time.mp3" title="🔊 it's time"></audio>

---

## 3. Reading mixto

> You had better see a doctor. I'd rather stay at home. We ran out of milk. You needn't hurry. It's time to go home.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-50/reading-mix.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-50/dialogue-mix.mp3" title="🔊 Dialogue"></audio>

> See a doctor? — You had better.  
> Stay or go? — I'd rather stay.  
> Need to hurry? — No, you needn't.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-50/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios exprés

1. You ___ better see a doctor.  
2. I'd ___ stay at home.  
3. We ran ___ of milk.  
4. You ___ hurry.  
5. It's time ___ go home.

<details><summary>Ver solución</summary>

1. **had** · 2. **rather** · 3. **out** · 4. **needn't** · 5. **to**
</details>""",
        tip="Clasifica primero: ¿consejo (had better), preferencia (would rather), phrasal verb o necesidad (need/needn't)?",
        next_course="[Unidad 51 — Próximo módulo](/curso-b1/unit-51)",
        next_blog="Módulo 6 (U51+) — próximamente",
        guides=["[U46](/blog/curso-b1/unidad-46-had-better-its-time-advice)", "[U47](/blog/curso-b1/unidad-47-would-rather-preferences)", "[U48](/blog/curso-b1/unidad-48-phrasal-verbs-work-study)", "[U49](/blog/curso-b1/unidad-49-need-neednt-necessity)"],
    ))


def main():
    diagrams(); make_audios(); make_articles(); print("done U46–50 theory")


if __name__ == "__main__":
    main()
