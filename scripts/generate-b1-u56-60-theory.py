#!/usr/bin/env python3
"""Generate B1 theory U56–60: diagrams, markdown, TTS audios."""
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


def vocab_grid(d, words, unit, name, title_text):
    title(d, title_text)
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 16, y + 48), w, fill=INK, font=font(18, True))
    save(img, unit, name)


def diagrams():
    img, d = canvas()
    title(d, "Mixed Grammar + Sport")
    items = [("Passive", "was cancelled"), ("2nd cond.", "if + past → would"), ("PP cont.", "have been playing"), ("3rd cond.", "had trained → would have")]
    for i, (label, form) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), label, fill=ACCENT, font=font(26, True))
        d.text((x + 20, 260), form, fill=INK, font=font(18))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "conditionals · passive · modals · tenses · reported speech", fill=INK, font=font(22))
    save(img, 56, "mixed-grammar-map.png")

    img, d = canvas()
    title(d, "Sport vocabulary")
    words = ["athlete", "stadium", "match", "trophy", "medal", "coach", "team", "train", "win", "referee", "marathon", "warm up"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 16, y + 48), w, fill=INK, font=font(18, True))
    save(img, 56, "sport-vocab.png")

    img, d = canvas()
    title(d, "Sport in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "The match was cancelled due to rain. (passive)",
        "If you practised more, you would improve faster. (second)",
        "I have been playing football since I was ten. (PP continuous)",
        "If they had trained harder, they would have won. (third)",
    ]):
        d.text((80, 160 + i * 90), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 56, "sport-scene.png")

    img, d = canvas()
    title(d, "Mixed Grammar + Clothes")
    items = [("Passive", "is made of cotton"), ("Would rather", "wear blue"), ("Relative", "which I bought"), ("Comparative", "more expensive")]
    for i, (label, form) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), label, fill=ACCENT, font=font(26, True))
        d.text((x + 20, 260), form, fill=INK, font=font(18))
    save(img, 57, "mixed-grammar-map.png")

    img, d = canvas()
    title(d, "Clothes & colours vocabulary")
    words = ["jacket", "dress", "cotton", "leather", "dark blue", "pale", "bright", "try on", "fashion", "match", "designer", "accessories"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 12, y + 48), w, fill=INK, font=font(18, True))
    save(img, 57, "clothes-vocab.png")

    img, d = canvas()
    title(d, "Clothes in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "This dress is made of cotton. (passive)",
        "I'd rather wear blue than red. (preference)",
        "The shirt which I bought last week is too small. (relative)",
        "Although it was expensive, I bought it. (contrast)",
    ]):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(24))
    save(img, 57, "clothes-scene.png")

    img, d = canvas()
    title(d, "Mixed Grammar + Places")
    items = [("Passive", "was built"), ("Would rather", "live in countryside"), ("Where", "village where I grew up"), ("There are", "many shops")]
    for i, (label, form) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), label, fill=ACCENT, font=font(26, True))
        d.text((x + 20, 260), form, fill=INK, font=font(18))
    save(img, 58, "mixed-grammar-map.png")

    img, d = canvas()
    title(d, "Town & countryside vocabulary")
    words = ["city", "village", "countryside", "town centre", "street", "square", "valley", "forest", "river", "bridge", "suburb", "museum"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 12, y + 48), w, fill=INK, font=font(18, True))
    save(img, 58, "places-vocab.png")

    img, d = canvas()
    title(d, "Places in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "The new bridge was built last year. (passive)",
        "I'd rather live in the countryside than in the city. (preference)",
        "There are many shops in the town centre. (there are)",
        "I have been living here since 2015. (PP continuous)",
    ]):
        d.text((80, 160 + i * 90), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 58, "places-scene.png")

    img, d = canvas()
    title(d, "PET/B1 Exam Strategies")
    items = [("Reading", "skim → scan → check"), ("Listening", "read Qs first"), ("Writing", "plan + paragraphs"), ("Grammar", "time markers")]
    for i, (label, form) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), label, fill=ACCENT, font=font(26, True))
        d.text((x + 20, 260), form, fill=INK, font=font(18))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "manage time · read instructions · stay calm · check answers", fill=INK, font=font(22))
    save(img, 59, "exam-strategies-map.png")

    img, d = canvas()
    title(d, "Exam vocabulary & tips")
    words = ["instructions", "time limit", "multiple choice", "gap-fill", "essay", "paragraph", "check", "review", "calm", "strategy", "practice", "pass"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 12, y + 48), w, fill=INK, font=font(18, True))
    save(img, 59, "exam-vocab.png")

    img, d = canvas()
    title(d, "Exam grammar in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "If you study hard, you will pass the exam. (first conditional)",
        "You should read the instructions carefully. (advice)",
        "I have been practising for three months. (PP continuous)",
        "If I had had more time, I would have checked my answers. (third)",
    ]):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(24))
    save(img, 59, "exam-scene.png")

    img, d = canvas()
    title(d, "Final B1 Review")
    items = [("U1–10", "PP & conditionals"), ("U11–20", "Passive & reported"), ("U21–30", "Phrasal & relatives"), ("U31–40", "Opinions & time"), ("U41–50", "Modals & advice"), ("U51–60", "Consolidation")]
    for i, (u, label) in enumerate(items):
        x = 48 + (i % 3) * 370
        y = 120 + (i // 3) * 200
        card(d, (x, y, x + 340, y + 160))
        d.text((x + 30, y + 40), u, fill=ACCENT, font=font(28, True))
        d.text((x + 30, y + 90), label, fill=INK, font=font(20))
    save(img, 60, "final-review-map.png")

    img, d = canvas()
    title(d, "B1 grammar checklist")
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate([
        "Conditionals (0, 1st, 2nd, 3rd) · Passive · Reported speech",
        "Modals (deduction, advice, preference, necessity)",
        "Tenses (PP, PP continuous, past perfect, futures)",
        "Relatives · Question tags · Phrasal verbs · Prepositions",
    ]):
        d.text((80, 160 + i * 90), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 60, "final-checklist.png")


AUDIOS = {
    56: {
        "passive-sport": "The match was cancelled due to rain.",
        "second-conditional": "If you practised more, you would improve faster.",
        "pp-continuous": "I have been playing football since I was ten.",
        "third-conditional": "If they had trained harder, they would have won.",
        "reported-sport": "She told me that she had won the race.",
        "modal-sport": "Athletes must train every day to stay fit.",
        "reading-sport": "The match was cancelled due to rain. If you practised more, you would improve faster. I have been playing football since I was ten. If they had trained harder, they would have won. She told me that she had won the race.",
        "dialogue-sport": "Was the match cancelled? Yes, it was cancelled due to rain. How long have you been playing? I've been playing since I was ten. Any regrets? If we had trained harder, we would have won.",
        "practice-mix": "Passive. Second conditional. Present perfect continuous. Third conditional. Reported speech.",
    },
    57: {
        "passive-clothes": "This dress is made of cotton.",
        "would-rather": "I'd rather wear blue than red.",
        "relative-clothes": "The shirt which I bought last week is too small.",
        "comparative": "This jacket is more expensive than that one.",
        "although": "Although it was expensive, I bought it.",
        "pp-continuous-clothes": "I have been shopping all morning.",
        "reading-clothes": "This dress is made of cotton. I'd rather wear blue than red. The shirt which I bought last week is too small. This jacket is more expensive than that one. Although it was expensive, I bought it.",
        "dialogue-clothes": "What would you rather wear? I'd rather wear blue. Is the dress cotton? Yes, it's made of cotton. Did you try it on? Yes, but the shirt I bought is too small.",
        "practice-mix": "Passive. Would rather. Relative clause. Comparative. Although.",
    },
    58: {
        "passive-places": "The new bridge was built last year.",
        "would-rather-places": "I'd rather live in the countryside than in the city.",
        "there-are": "There are many shops in the town centre.",
        "relative-places": "The village where I grew up is very small.",
        "pp-continuous-places": "I have been living here since 2015.",
        "second-places": "If I lived in the countryside, I would have a garden.",
        "reading-places": "The new bridge was built last year. I'd rather live in the countryside than in the city. There are many shops in the town centre. The village where I grew up is very small. I have been living here since 2015.",
        "dialogue-places": "Where would you rather live? I'd rather live in the countryside. How long have you been here? I've been living here since 2015. Is there much to do? There are many shops in the town centre.",
        "practice-mix": "Passive. Would rather. There are. Relative where. Present perfect continuous.",
    },
    59: {
        "exam-first": "If you study hard, you will pass the exam.",
        "exam-should": "You should read the instructions carefully.",
        "exam-pp": "I have been practising for three months.",
        "exam-third": "If I had had more time, I would have checked my answers.",
        "exam-passive": "The exam is taken by hundreds of students every year.",
        "exam-must": "You must manage your time well during the exam.",
        "reading-exam": "If you study hard, you will pass the exam. You should read the instructions carefully. I have been practising for three months. If I had had more time, I would have checked my answers. The exam is taken by hundreds of students every year.",
        "dialogue-exam": "Any tips for the exam? Read the instructions carefully and manage your time. How long have you been practising? I've been practising for three months. Feeling nervous? You should stay calm.",
        "practice-mix": "First conditional. Should. Present perfect continuous. Third conditional. Passive.",
    },
    60: {
        "review-zero": "If water reaches 100 degrees, it boils.",
        "review-passive": "The letter was sent yesterday.",
        "review-reported": "She told me that she would come the next day.",
        "review-second": "If I were rich, I would travel the world.",
        "review-third": "If I had known earlier, I would have come.",
        "review-pp": "I have been living here since 2015.",
        "reading-final": "If water reaches 100 degrees, it boils. The letter was sent yesterday. She told me that she would come the next day. If I were rich, I would travel the world. If I had known earlier, I would have come. I have been living here since 2015.",
        "dialogue-final": "Ready for the final review? Let's check conditionals, passive and reported speech. Any regrets? If I had known earlier, I would have come. How long have you lived here? I've been living here since 2015.",
        "practice-mix": "Zero conditional. Passive. Reported. Second. Third. Present perfect continuous.",
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
    wb = kw["slug"] + "-ejercicios-soluciones"
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
3. Haz el [cuaderno de ejercicios U{kw["unit"]} (con soluciones)](/blog/curso-b1/{wb}).

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
    write_md("unidad-56-mixed-grammar-sport.md", article(
        slug="unidad-56-mixed-grammar-sport", unit=56,
        title="Mixed Grammar Practice B1: Sport",
        description="Práctica gramatical mixta B1 con vocabulario de deporte. Guía Unidad 56 con audios: conditionals, passive, modals y tiempos.",
        image="/blog/curso-b1/unit-56/mixed-grammar-map.png", alt="Mixed grammar sport B1",
        keywords=["mixed grammar B1 sport", "inglés deporte B1", "práctica gramatical mixta", "inglés B1 unidad 56"],
        related=["unidad-55-repaso-51-54", "unidad-57-mixed-grammar-clothes-colours", "unidad-51-review-conditionals", "cursos-online-ingles-b1"],
        faqs=[("¿Qué practica la U56?", "Gramática mixta B1 (conditionals, passive, modals, tenses, reported) con vocabulario de **sport**."), ("¿Es solo vocabulario de deporte?", "No: el foco es **gramática mixta**; el deporte es el contexto temático."), ("¿Dónde practico?", "En la [Unidad 56 del curso B1](/curso-b1/unit-56).")],
        excerpt="Guía de la Unidad 56 del curso B1: práctica gramatical mixta con vocabulario de deporte.",
        intro="Tras el [Repaso 51–54](/blog/curso-b1/unidad-55-repaso-51-54), la **Unidad 56** (*Mixed grammar practice & Sport*) aplica toda la gramática B1 en contexto deportivo.",
        before="[U55 — Repaso 51–54](/blog/curso-b1/unidad-55-repaso-51-54)",
        learn=["**Gramática mixta**: conditionals, passive, modals, tenses, reported", "Vocabulario: **sport** (athlete, match, trophy, train…)", "Reading y listening en contexto deportivo", "Clasificar la estructura antes de elegir la forma"],
        sources="Mixed grammar & sport",
        sections=r"""## 1. Mapa de gramática mixta

| Área | Ejemplo deportivo |
| :--- | :--- |
| **Passive** | The match **was cancelled**. |
| **Second conditional** | If you **practised** more, you'd improve. |
| **PP continuous** | I **have been playing** since I was ten. |
| **Third conditional** | If they **had trained** harder, they **would have won**. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-56/passive-sport.mp3" title="🔊 Passive"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-56/second-conditional.mp3" title="🔊 Second"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-56/pp-continuous.mp3" title="🔊 PP continuous"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-56/third-conditional.mp3" title="🔊 Third"></audio>

---

## 2. Más estructuras

<audio controls preload="none" src="/audio/blog/curso-b1/unit-56/reported-sport.mp3" title="🔊 Reported"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-56/modal-sport.mp3" title="🔊 Modal"></audio>

> **Reported:** She **told me (that) she had won** the race.  
> **Modal:** Athletes **must train** every day.

---

## 3. Vocabulario: Sport

![Sport vocab](/blog/curso-b1/unit-56/sport-vocab.png)

| Word | Idea |
| :--- | :--- |
| athlete / team / coach | atleta / equipo / entrenador |
| match / trophy / medal | partido / trofeo / medalla |
| train / warm up / win | entrenar / calentar / ganar |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-56/sport-scene.png)

> The match was cancelled due to rain. If you practised more, you would improve faster. I have been playing football since I was ten. If they had trained harder, they would have won. She told me that she had won the race.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-56/reading-sport.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-56/dialogue-sport.mp3" title="🔊 Dialogue"></audio>

> Was the match cancelled? — Yes, it was cancelled due to rain.  
> How long have you been playing? — I've been playing since I was ten.  
> Any regrets? — If we had trained harder, we would have won.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-56/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. The match ___ cancelled due to rain. (*was*)  
2. If you ___ more, you'd improve. (*practised*)  
3. I ___ been playing since I was ten. (*have*)  
4. If they ___ harder, they would have won. (*had trained*)  
5. She ___ me she had won. (*told*)

<details><summary>Ver solución</summary>

1. **was** · 2. **practised** · 3. **have** · 4. **had trained** · 5. **told**
</details>""",
        tip="Lee la frase completa: ¿pasiva, condicional, modal o tiempo? Luego elige la forma.",
        next_course="[Unidad 57 — Clothes & colours](/curso-b1/unit-57)",
        next_blog="[U57 — Mixed grammar: clothes](/blog/curso-b1/unidad-57-mixed-grammar-clothes-colours)",
        guides=["[U55](/blog/curso-b1/unidad-55-repaso-51-54)", "[U51–54](/blog/curso-b1/unidad-51-review-conditionals)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-57-mixed-grammar-clothes-colours.md", article(
        slug="unidad-57-mixed-grammar-clothes-colours", unit=57,
        title="Mixed Grammar Practice B1: Clothes & Colours",
        description="Práctica gramatical mixta B1 con vocabulario de ropa y colores. Guía Unidad 57 con audios y ejemplos.",
        image="/blog/curso-b1/unit-57/mixed-grammar-map.png", alt="Mixed grammar clothes B1",
        keywords=["mixed grammar B1 clothes", "ropa colores inglés B1", "práctica gramatical mixta", "inglés B1 unidad 57"],
        related=["unidad-56-mixed-grammar-sport", "unidad-58-mixed-grammar-places", "unidad-47-would-rather-preferences", "cursos-online-ingles-b1"],
        faqs=[("¿Qué practica la U57?", "Gramática mixta con vocabulario de **clothes & colours**."), ("¿Incluye comparativos y relativas?", "Sí: *more expensive*, *which I bought*, *would rather*, *although*…"), ("¿Dónde practico?", "En la [Unidad 57 del curso B1](/curso-b1/unit-57).")],
        excerpt="Guía de la Unidad 57 del curso B1: práctica gramatical mixta con ropa y colores.",
        intro="Tras la [Unidad 56](/blog/curso-b1/unidad-56-mixed-grammar-sport), la **Unidad 57** aplica gramática B1 al contexto de **ropa y colores**.",
        before="[U56 — Mixed grammar: sport](/blog/curso-b1/unidad-56-mixed-grammar-sport)",
        learn=["**Passive**, **would rather**, **relative clauses**, **comparatives**", "Vocabulario: **clothes & colours**", "**Although** (contraste)", "Reading y listening en contexto de moda"],
        sources="Mixed grammar & clothes",
        sections=r"""## 1. Gramática en contexto de ropa

| Estructura | Ejemplo |
| :--- | :--- |
| **Passive present** | This dress **is made of** cotton. |
| **Would rather** | I'd **rather wear** blue than red. |
| **Defining relative** | The shirt **which I bought** is too small. |
| **Comparative** | This jacket **is more expensive** than that one. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-57/passive-clothes.mp3" title="🔊 Passive"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-57/would-rather.mp3" title="🔊 Would rather"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-57/relative-clothes.mp3" title="🔊 Relative"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-57/comparative.mp3" title="🔊 Comparative"></audio>

---

## 2. Contraste y duración

<audio controls preload="none" src="/audio/blog/curso-b1/unit-57/although.mp3" title="🔊 Although"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-57/pp-continuous-clothes.mp3" title="🔊 PP continuous"></audio>

> **Although** it was expensive, I bought it.  
> I **have been shopping** all morning.

---

## 3. Vocabulario: Clothes & colours

![Clothes vocab](/blog/curso-b1/unit-57/clothes-vocab.png)

| Word | Idea |
| :--- | :--- |
| jacket / dress / coat | chaqueta / vestido / abrigo |
| cotton / leather | algodón / cuero |
| dark blue / pale / bright | azul oscuro / pálido / brillante |
| try on / fashion / match | probarse / moda / combinar |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-57/clothes-scene.png)

> This dress is made of cotton. I'd rather wear blue than red. The shirt which I bought last week is too small. This jacket is more expensive than that one. Although it was expensive, I bought it.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-57/reading-clothes.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-57/dialogue-clothes.mp3" title="🔊 Dialogue"></audio>

> What would you rather wear? — I'd rather wear blue.  
> Is the dress cotton? — Yes, it's made of cotton.  
> Did you try it on? — Yes, but the shirt I bought is too small.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-57/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. This dress ___ made of cotton. (*is*)  
2. I'd ___ wear blue. (*rather*)  
3. The shirt ___ I bought is too small. (*which*)  
4. This jacket is ___ expensive than that one. (*more*)  
5. ___ it was expensive, I bought it. (*Although*)

<details><summary>Ver solución</summary>

1. **is** · 2. **rather** · 3. **which** · 4. **more** · 5. **Although**
</details>""",
        tip="En tienda: identifica pasiva (*is made of*), preferencia (*would rather*) y relativa (*which/that*).",
        next_course="[Unidad 58 — Places](/curso-b1/unit-58)",
        next_blog="[U58 — Mixed grammar: places](/blog/curso-b1/unidad-58-mixed-grammar-places)",
        guides=["[U47](/blog/curso-b1/unidad-47-would-rather-preferences)", "[U31](/blog/curso-b1/unidad-31-defining-relative-nature)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-58-mixed-grammar-places.md", article(
        slug="unidad-58-mixed-grammar-places", unit=58,
        title="Mixed Grammar Practice B1: Places (Town & Countryside)",
        description="Práctica gramatical mixta B1 con vocabulario de ciudad y campo. Guía Unidad 58 con audios.",
        image="/blog/curso-b1/unit-58/mixed-grammar-map.png", alt="Mixed grammar places B1",
        keywords=["mixed grammar B1 places", "ciudad campo inglés B1", "town countryside vocabulary", "inglés B1 unidad 58"],
        related=["unidad-57-mixed-grammar-clothes-colours", "unidad-59-exam-preparation-strategies", "unidad-28-articles-buildings", "cursos-online-ingles-b1"],
        faqs=[("¿Qué practica la U58?", "Gramática mixta con vocabulario de **town & countryside**."), ("¿Incluye there is/are y relativas de lugar?", "Sí: *There are many shops*, *the village where I grew up*…"), ("¿Dónde practico?", "En la [Unidad 58 del curso B1](/curso-b1/unit-58).")],
        excerpt="Guía de la Unidad 58 del curso B1: práctica gramatical mixta con lugares.",
        intro="Tras la [Unidad 57](/blog/curso-b1/unidad-57-mixed-grammar-clothes-colours), la **Unidad 58** practica gramática B1 describiendo **ciudad y campo**.",
        before="[U57 — Clothes & colours](/blog/curso-b1/unidad-57-mixed-grammar-clothes-colours)",
        learn=["**Passive**, **would rather**, **there is/are**, **relative where**", "Vocabulario: **city, village, countryside, bridge…**", "**PP continuous** con *since*", "**Second conditional** con lugares"],
        sources="Mixed grammar & places",
        sections=r"""## 1. Gramática: town & countryside

| Estructura | Ejemplo |
| :--- | :--- |
| **Passive past** | The bridge **was built** last year. |
| **Would rather** | I'd **rather live** in the countryside. |
| **There are** | **There are** many shops in the town centre. |
| **Relative where** | The village **where I grew up** is small. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-58/passive-places.mp3" title="🔊 Passive"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-58/would-rather-places.mp3" title="🔊 Would rather"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-58/there-are.mp3" title="🔊 There are"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-58/relative-places.mp3" title="🔊 Relative where"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b1/unit-58/pp-continuous-places.mp3" title="🔊 PP continuous"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-58/second-places.mp3" title="🔊 Second conditional"></audio>

> I **have been living** here since 2015.  
> If I **lived** in the countryside, I **would have** a garden.

---

## 3. Vocabulario: Places

![Places vocab](/blog/curso-b1/unit-58/places-vocab.png)

| Word | Idea |
| :--- | :--- |
| city / village / countryside | ciudad / pueblo / campo |
| town centre / street / square | centro / calle / plaza |
| valley / forest / river / bridge | valle / bosque / río / puente |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-58/places-scene.png)

> The new bridge was built last year. I'd rather live in the countryside than in the city. There are many shops in the town centre. The village where I grew up is very small. I have been living here since 2015.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-58/reading-places.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-58/dialogue-places.mp3" title="🔊 Dialogue"></audio>

> Where would you rather live? — I'd rather live in the countryside.  
> How long have you been here? — I've been living here since 2015.  
> Is there much to do? — There are many shops in the town centre.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-58/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. The bridge ___ built last year. (*was*)  
2. I'd ___ live in the countryside. (*rather*)  
3. ___ are many shops in the centre. (*There*)  
4. The village ___ I grew up is small. (*where*)  
5. I ___ been living here since 2015. (*have*)

<details><summary>Ver solución</summary>

1. **was** · 2. **rather** · 3. **There** · 4. **where** · 5. **have**
</details>""",
        tip="Para lugares: *where* (lugar), *which/that* (cosa), *there is/are* (existencia).",
        next_course="[Unidad 59 — Exam preparation](/curso-b1/unit-59)",
        next_blog="[U59 — Exam strategies](/blog/curso-b1/unidad-59-exam-preparation-strategies)",
        guides=["[U28](/blog/curso-b1/unidad-28-articles-buildings)", "[U38](/blog/curso-b1/unidad-38-contrast-opinions)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-59-exam-preparation-strategies.md", article(
        slug="unidad-59-exam-preparation-strategies", unit=59,
        title="Exam Preparation B1: PET/B1 Strategies",
        description="Preparación para examen B1 Preliminary (PET): estrategias de reading, listening, writing y gramática. Guía Unidad 59.",
        image="/blog/curso-b1/unit-59/exam-strategies-map.png", alt="Exam preparation B1 PET",
        keywords=["exam preparation B1", "PET strategies", "B1 Preliminary tips", "inglés B1 unidad 59"],
        related=["unidad-58-mixed-grammar-places", "unidad-60-final-b1-review", "unidad-55-repaso-51-54", "cursos-online-ingles-b1"],
        faqs=[("¿Para qué examen es la U59?", "Cambridge **B1 Preliminary (PET)** y exámenes equivalentes B1."), ("¿Qué estrategias incluye?", "Gestión del tiempo, lectura de instrucciones, skim/scan, planificación de writing…"), ("¿Dónde practico?", "En la [Unidad 59 del curso B1](/curso-b1/unit-59).")],
        excerpt="Guía de la Unidad 59 del curso B1: estrategias para el examen PET/B1.",
        intro="Tras la [Unidad 58](/blog/curso-b1/unidad-58-mixed-grammar-places), la **Unidad 59** (*Exam preparation & strategies*) te prepara para el **B1 Preliminary (PET)**.",
        before="[U58 — Places](/blog/curso-b1/unidad-58-mixed-grammar-places)",
        learn=["**Estrategias PET/B1**: reading, listening, writing", "Gestión del **tiempo** y lectura de **instrucciones**", "Gramática frecuente en examen", "Vocabulario: exam tips & strategies"],
        sources="PET/B1 exam preparation",
        sections=r"""## 1. Mapa de estrategias PET/B1

| Parte | Estrategia clave |
| :--- | :--- |
| **Reading** | Skim → scan → check options |
| **Listening** | Read questions **before** audio |
| **Writing** | Plan + paragraphs + check |
| **Grammar** | Busca **time markers** (since, ago, yesterday…) |

![Exam strategies](/blog/curso-b1/unit-59/exam-strategies-map.png)

---

## 2. Consejos generales

| Tip | Acción |
| :--- | :--- |
| **Time** | Divide el tiempo por sección |
| **Instructions** | Léelas **antes** de responder |
| **Calm** | Respira; no te quedes atascado |
| **Check** | Revisa respuestas si queda tiempo |

---

## 3. Gramática en contexto de examen

<audio controls preload="none" src="/audio/blog/curso-b1/unit-59/exam-first.mp3" title="🔊 First conditional"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-59/exam-should.mp3" title="🔊 Should"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-59/exam-pp.mp3" title="🔊 PP continuous"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-59/exam-third.mp3" title="🔊 Third"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-59/exam-passive.mp3" title="🔊 Passive"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-59/exam-must.mp3" title="🔊 Must"></audio>

---

## 4. Vocabulario: Exam strategies

![Exam vocab](/blog/curso-b1/unit-59/exam-vocab.png)

| Word | Idea |
| :--- | :--- |
| instructions / time limit | instrucciones / límite de tiempo |
| multiple choice / gap-fill | opción múltiple / huecos |
| check / review / calm | revisar / repasar / tranquilo |

---

## 5. Reading

![Scene](/blog/curso-b1/unit-59/exam-scene.png)

> If you study hard, you will pass the exam. You should read the instructions carefully. I have been practising for three months. If I had had more time, I would have checked my answers. The exam is taken by hundreds of students every year.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-59/reading-exam.mp3" title="🔊 Reading"></audio>

---

## 6. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-59/dialogue-exam.mp3" title="🔊 Dialogue"></audio>

> Any tips for the exam? — Read the instructions carefully and manage your time.  
> How long have you been practising? — I've been practising for three months.  
> Feeling nervous? — You should stay calm.

---

## 7. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-59/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 8. Ejercicios

1. If you ___ hard, you will pass. (*study*)  
2. You ___ read the instructions carefully. (*should*)  
3. I ___ been practising for three months. (*have*)  
4. If I ___ had more time, I would have checked. (*had*)  
5. The exam ___ taken every year. (*is*)

<details><summary>Ver solución</summary>

1. **study** · 2. **should** · 3. **have** · 4. **had** · 5. **is**
</details>""",
        tip="En el examen: primero **instrucciones**, luego **time markers** en cada pregunta de gramática.",
        next_course="[Unidad 60 — Final B1 review](/curso-b1/unit-60)",
        next_blog="[U60 — Final B1 review](/blog/curso-b1/unidad-60-final-b1-review)",
        guides=["[U55](/blog/curso-b1/unidad-55-repaso-51-54)", "[PET B1](/blog/metodos/cursos-online-ingles-b1)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-60-final-b1-review.md", article(
        slug="unidad-60-final-b1-review", unit=60,
        title="Final B1 Review: Full Revision (60/60)",
        description="Repaso final B1 completo: conditionals, passive, reported, modals, tenses, relatives y más. Guía Unidad 60 — cierre del curso.",
        image="/blog/curso-b1/unit-60/final-review-map.png", alt="Final B1 review complete",
        keywords=["final B1 review", "repaso completo B1", "curso inglés B1 completo", "inglés B1 unidad 60"],
        related=["unidad-59-exam-preparation-strategies", "unidad-55-repaso-51-54", "unidad-1-repaso-a2-b1", "cursos-online-ingles-b1"],
        faqs=[("¿Qué repasa la U60?", "Todo el curso B1: **60 unidades** de gramática, vocabulario y habilidades."), ("¿Es el final del curso B1?", "Sí: la **Unidad 60** cierra el curso B1 (60/60)."), ("¿Dónde practico?", "En la [Unidad 60 del curso B1](/curso-b1/unit-60).")],
        excerpt="Guía de la Unidad 60 del curso B1: repaso final completo — ¡B1 terminado!",
        intro="La **Unidad 60** (*Final B1 review*) integra todo el [curso B1](/curso-b1): desde [U1](/blog/curso-b1/unidad-1-repaso-a2-b1) hasta [U59](/blog/curso-b1/unidad-59-exam-preparation-strategies). **¡Enhorabuena — B1 completo!**",
        before="[U59 — Exam strategies](/blog/curso-b1/unidad-59-exam-preparation-strategies)",
        learn=["Repaso **completo B1** (6 módulos, 60 unidades)", "Checklist de gramática clave", "Reading y listening mixtos finales", "Preparación para seguir a B2 o examen"],
        sources="Full B1 revision",
        sections=r"""## 1. Mapa del curso B1 (60 unidades)

![Final review map](/blog/curso-b1/unit-60/final-review-map.png)

| Módulo | Unidades | Foco |
| :--- | :--- | :--- |
| 1 | U1–10 | PP, past perfect, futures, modals |
| 2 | U11–20 | Conditionals, passive, reported |
| 3 | U21–30 | Gerunds, phrasal verbs, relatives |
| 4 | U31–40 | Question tags, opinions, time |
| 5 | U41–50 | Prepositions, advice, necessity |
| 6 | U51–60 | Consolidación y exam prep |

---

## 2. Checklist de gramática

![Checklist](/blog/curso-b1/unit-60/final-checklist.png)

<audio controls preload="none" src="/audio/blog/curso-b1/unit-60/review-zero.mp3" title="🔊 Zero conditional"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-60/review-passive.mp3" title="🔊 Passive"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-60/review-reported.mp3" title="🔊 Reported"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-60/review-second.mp3" title="🔊 Second"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-60/review-third.mp3" title="🔊 Third"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-60/review-pp.mp3" title="🔊 PP continuous"></audio>

---

## 3. Reading final

> If water reaches 100 degrees, it boils. The letter was sent yesterday. She told me that she would come the next day. If I were rich, I would travel the world. If I had known earlier, I would have come. I have been living here since 2015.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-60/reading-final.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-60/dialogue-final.mp3" title="🔊 Dialogue"></audio>

> Ready for the final review? — Let's check conditionals, passive and reported speech.  
> Any regrets? — If I had known earlier, I would have come.  
> How long have you lived here? — I've been living here since 2015.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-60/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios exprés

1. If water ___ 100°C, it boils. (*reaches*)  
2. The letter ___ sent yesterday. (*was*)  
3. She ___ me she would come. (*told*)  
4. If I ___ rich, I would travel. (*were*)  
5. I ___ been living here since 2015. (*have*)

<details><summary>Ver solución</summary>

1. **reaches** · 2. **was** · 3. **told** · 4. **were** · 5. **have**
</details>""",
        tip="Repasa por módulos: identifica la estructura antes de elegir — igual que en el examen PET.",
        next_course="[Curso B1 completo](/curso-b1) — ¡enhorabuena!",
        next_blog="**B1 completo (60/60)** — repasa cualquier unidad del índice del curso.",
        guides=["[U1](/blog/curso-b1/unidad-1-repaso-a2-b1)", "[U55](/blog/curso-b1/unidad-55-repaso-51-54)", "[U59](/blog/curso-b1/unidad-59-exam-preparation-strategies)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))


def patch_u55():
    path = OUT_MD / "unidad-55-repaso-51-54.md"
    text = path.read_text(encoding="utf-8")
    text = text.replace(
        "- [Unidad 56 — Próximo bloque](/curso-b1/unit-56)",
        "- [Unidad 56 — Mixed grammar: sport](/curso-b1/unit-56)",
    )
    text = text.replace(
        "- Módulo 6 (U56+) — próximamente",
        "- [U56 — Mixed grammar: sport](/blog/curso-b1/unidad-56-mixed-grammar-sport)",
    )
    path.write_text(text, encoding="utf-8")
    print("patched", path.relative_to(ROOT))


def main():
    diagrams()
    make_audios()
    make_articles()
    patch_u55()
    print("done U56–60 theory")


if __name__ == "__main__":
    main()
