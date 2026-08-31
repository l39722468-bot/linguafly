#!/usr/bin/env python3
"""Generate B1 theory U41–45: diagrams, markdown, TTS audios."""
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
    img, d = canvas(); title(d, "Verb + preposition")
    items = [("depend on", "depender de"), ("listen to", "escuchar a"), ("wait for", "esperar a/por"), ("look at", "mirar"), ("believe in", "creer en"), ("pay for", "pagar por")]
    for i, (en, es) in enumerate(items):
        y = 120 + i * 85; card(d, (48, y, 1150, y + 70))
        d.text((72, y + 18), en, fill=ACCENT, font=font(24, True)); d.text((520, y + 18), es, fill=INK, font=font(22))
    save(img, 41, "verb-preposition.png")

    img, d = canvas(); title(d, "Dependent prepositions")
    words = ["depend on", "listen to", "wait for", "look at", "agree with", "talk about", "apply for", "worry about", "succeed in", "complain about", "ask for", "believe in"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 12, y + 48), w, fill=INK, font=font(18, True))
    save(img, 41, "dependent-prep-vocab.png")

    img, d = canvas(); title(d, "Everyday verbs")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(["I depend on my parents.", "Please listen to me.", "We waited for the bus.", "Look at the board, please."]):
        d.text((80, 180 + i * 80), f"{i+1}. {t}", fill=INK, font=font(26))
    save(img, 41, "verb-prep-scene.png")

    img, d = canvas(); title(d, "Adjective + preposition")
    items = [("interested in", "interesado en"), ("afraid of", "miedo de"), ("good at", "bueno en"), ("proud of", "orgulloso de"), ("worried about", "preocupado por"), ("married to", "casado con")]
    for i, (en, es) in enumerate(items):
        y = 120 + i * 85; card(d, (48, y, 1150, y + 70))
        d.text((72, y + 18), en, fill=ACCENT, font=font(24, True)); d.text((520, y + 18), es, fill=INK, font=font(22))
    save(img, 42, "adj-preposition.png")

    img, d = canvas(); title(d, "Feelings & attitudes")
    words = ["interested", "afraid", "proud", "worried", "excited", "tired", "sorry", "keen", "fed up", "responsible", "famous", "different"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 24, y + 48), w, fill=INK, font=font(22, True))
    save(img, 42, "feelings-vocab.png")

    img, d = canvas(); title(d, "How do you feel?")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(["I'm interested in learning English.", "She's afraid of spiders.", "He's good at maths.", "We're excited about the trip."]):
        d.text((80, 180 + i * 80), f"• {t}", fill=INK, font=font(24))
    save(img, 42, "feelings-scene.png")

    img, d = canvas(); title(d, "During / for / while")
    card(d, (48, 110, 380, 600)); d.text((72, 140), "during", fill=ACCENT, font=font(28, True))
    d.text((72, 200), "+ noun", fill=INK, font=font(22))
    d.text((72, 260), "during the film", fill=INK, font=font(22))
    card(d, (410, 110, 740, 600)); d.text((434, 140), "for", fill=ACCENT, font=font(28, True))
    d.text((434, 200), "+ duration", fill=INK, font=font(22))
    d.text((434, 260), "for three years", fill=INK, font=font(22))
    card(d, (772, 110, 1150, 600)); d.text((796, 140), "while", fill=ACCENT, font=font(28, True))
    d.text((796, 200), "+ clause", fill=INK, font=font(22))
    d.text((796, 260), "while I was cooking", fill=INK, font=font(22))
    save(img, 43, "during-for-while.png")

    img, d = canvas(); title(d, "Time vocabulary")
    words = ["during", "for", "while", "moment", "period", "duration", "meanwhile", "throughout", "overnight", "all day", "at the same time", "length"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 16, y + 48), w, fill=INK, font=font(20, True))
    save(img, 43, "time-vocab.png")

    img, d = canvas(); title(d, "At the same time")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(["I fell asleep during the film.", "We lived there for three years.", "I met her while I was travelling.", "The phone rang while we were eating."]):
        d.text((80, 180 + i * 80), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 43, "time-scene.png")

    img, d = canvas(); title(d, "For / since / from")
    card(d, (48, 110, 380, 600)); d.text((72, 140), "for", fill=ACCENT, font=font(28, True))
    d.text((72, 200), "+ duration", fill=INK, font=font(22))
    d.text((72, 260), "for ten years", fill=INK, font=font(22))
    card(d, (410, 110, 740, 600)); d.text((434, 140), "since", fill=ACCENT, font=font(28, True))
    d.text((434, 200), "+ starting point", fill=INK, font=font(22))
    d.text((434, 260), "since 2015", fill=INK, font=font(22))
    card(d, (772, 110, 1150, 600)); d.text((796, 140), "from", fill=ACCENT, font=font(28, True))
    d.text((796, 200), "from…to / origin", fill=INK, font=font(22))
    d.text((796, 260), "from 9am to 5pm", fill=INK, font=font(22))
    save(img, 44, "for-since-from.png")

    img, d = canvas(); title(d, "Time expressions")
    words = ["since", "for ages", "from…to", "all day", "so far", "until", "by", "already", "yet", "recently", "lately", "ever"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 16, y + 48), w, fill=INK, font=font(20, True))
    save(img, 44, "time-expr-vocab.png")

    img, d = canvas(); title(d, "How long?")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(["I have lived here since 2015.", "We have known each other for ten years.", "The shop is open from 9am to 5pm.", "I haven't eaten since breakfast."]):
        d.text((80, 180 + i * 80), f"• {t}", fill=INK, font=font(24))
    save(img, 44, "time-expr-scene.png")

    img, d = canvas(); title(d, "Review 41–44")
    items = [("U41", "Verb + prep"), ("U42", "Adj + prep"), ("U43", "During/for/while"), ("U44", "For/since/from")]
    for i, (u, label) in enumerate(items):
        x = 48 + i * 280; card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), u, fill=ACCENT, font=font(34, True)); d.text((x + 24, 260), label, fill=INK, font=font(20))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "depend on · interested in · during/for/while · since/from", fill=INK, font=font(22))
    d.text((72, 520), "Vocab: dependent preps · feelings · time · time expressions", fill=INK, font=font(22))
    save(img, 45, "review-map.png")

    img, d = canvas(); title(d, "Mixed examples")
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate([
        "I depend on my parents. (verb + prep)",
        "She's interested in art. (adj + prep)",
        "I fell asleep during the film. (during)",
        "I have lived here since 2015. (since)",
        "We waited for two hours. (for duration)",
    ]):
        d.text((80, 160 + i * 75), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 45, "review-examples.png")


AUDIOS = {
    41: {
        "depend-on": "I depend on my parents.",
        "listen-to": "Please listen to me.",
        "wait-for": "We waited for the bus.",
        "look-at": "Look at the board, please.",
        "believe-in": "I believe in you.",
        "reading-verb-prep": "I depend on my parents. Please listen to me. We waited for the bus. Look at the board, please. I believe in you.",
        "dialogue-verb-prep": "Do you depend on your parents? Yes. Did you listen to me? Yes. Did you wait for the bus? For an hour.",
        "practice-four": "Depend on. Listen to. Wait for. Look at.",
    },
    42: {
        "interested-in": "I'm interested in learning English.",
        "afraid-of": "She's afraid of spiders.",
        "good-at": "He's good at maths.",
        "proud-of": "I'm proud of my son.",
        "worried-about": "I'm worried about the exam.",
        "reading-feelings": "I'm interested in learning English. She's afraid of spiders. He's good at maths. I'm proud of my son. I'm worried about the exam.",
        "dialogue-feelings": "Are you interested in English? Yes. Afraid of spiders? A little. Good at maths? He's very good.",
        "practice-four": "Interested in. Afraid of. Good at. Proud of.",
    },
    43: {
        "during-film": "I fell asleep during the film.",
        "for-years": "We lived there for three years.",
        "while-travelling": "I met her while I was travelling.",
        "during-meeting": "She phoned during the meeting.",
        "while-eating": "The phone rang while we were eating.",
        "reading-time": "I fell asleep during the film. We lived there for three years. I met her while I was travelling. She phoned during the meeting. The phone rang while we were eating.",
        "dialogue-time": "Did you sleep during the film? Yes. How long did you live there? For three years. When did you meet her? While I was travelling.",
        "practice-four": "During the film. For three years. While travelling. While we were eating.",
    },
    44: {
        "since-2015": "I have lived here since 2015.",
        "for-ten-years": "We have known each other for ten years.",
        "from-to": "The shop is open from 9am to 5pm.",
        "since-monday": "She has been ill since Monday.",
        "since-breakfast": "I haven't eaten since breakfast.",
        "reading-time-expr": "I have lived here since 2015. We have known each other for ten years. The shop is open from 9am to 5pm. She has been ill since Monday. I haven't eaten since breakfast.",
        "dialogue-time-expr": "How long have you lived here? Since 2015. How long have you known each other? For ten years. When is the shop open? From 9am to 5pm.",
        "practice-four": "Since 2015. For ten years. From 9am to 5pm. Since Monday.",
    },
    45: {
        "review-depend": "I depend on my parents.",
        "review-interested": "She's interested in art.",
        "review-during": "I fell asleep during the film.",
        "review-since": "I have lived here since 2015.",
        "review-for": "We waited for two hours.",
        "reading-mix": "I depend on my parents. She's interested in art. I fell asleep during the film. I have lived here since 2015. We waited for two hours.",
        "dialogue-mix": "Do you depend on your parents? Yes. Interested in art? Very much. Since when? Since 2015.",
        "practice-mix": "Depend on. Interested in. During the film. Since 2015. For two hours.",
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

- CEFR B1 · Cambridge B1 Preliminary · British Council — Prepositions & time expressions
"""


def make_articles():
    write_md("unidad-41-verb-preposition-dependent.md", article(
        slug="unidad-41-verb-preposition-dependent", unit=41,
        title="Verb + Preposition B1 & Dependent Prepositions",
        description="Aprende verb + preposition (depend on, listen to, wait for, look at) en inglés B1. Guía Unidad 41 con audios.",
        image="/blog/curso-b1/unit-41/verb-preposition.png", alt="Verb preposition B1",
        keywords=["verb preposition B1", "depend on listen to", "dependent prepositions", "wait for look at", "inglés B1 unidad 41"],
        related=["unidad-40-repaso-36-39", "unidad-42-adjective-preposition-feelings", "cursos-online-ingles-b1"],
        faqs=[("¿Cómo memorizo las preposiciones?", "Aprende verbos en bloques: depend **on**, listen **to**, wait **for**."), ("¿listen to o listen?", "Con persona/cosa: listen **to** me. Sin objeto: just listen."), ("¿Dónde practico?", "En la [Unidad 41 del curso B1](/curso-b1/unit-41).")],
        excerpt="Guía de la Unidad 41 del curso B1: verb + preposition y dependent prepositions.",
        intro="Tras el [Repaso 36–39](/blog/curso-b1/unidad-40-repaso-36-39), la **Unidad 41** abre el Módulo 5 con **verb + preposition** y **dependent prepositions**.",
        before="[U40 — Repaso 36–39](/blog/curso-b1/unidad-40-repaso-36-39)",
        learn=["**depend on / listen to / wait for / look at**", "**believe in / pay for / agree with**", "Vocabulario: dependent prepositions", "Errores típicos hispanohablantes"],
        sections=r"""## 1. Mapa rápido

| Verbo | Preposición | Ejemplo |
| :--- | :--- | :--- |
| **depend** | on | I depend **on** my parents. |
| **listen** | to | Listen **to** me. |
| **wait** | for | We waited **for** the bus. |
| **look** | at | Look **at** the board. |
| **believe** | in | I believe **in** you. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-41/depend-on.mp3" title="🔊 depend on"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-41/listen-to.mp3" title="🔊 listen to"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-41/wait-for.mp3" title="🔊 wait for"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-41/look-at.mp3" title="🔊 look at"></audio>

---

## 2. Más ejemplos

> I **believe in** you.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-41/believe-in.mp3" title="🔊 believe in"></audio>

| Verbo | Preposición | Ejemplo |
| :--- | :--- | :--- |
| pay | for | pay **for** the meal |
| agree | with | agree **with** you |
| talk | about | talk **about** the project |
| worry | about | worry **about** it |

---

## 3. Vocabulario: Dependent prepositions

![Dependent prepositions](/blog/curso-b1/unit-41/dependent-prep-vocab.png)

| Colocación | Idea |
| :--- | :--- |
| apply **for** | solicitar |
| ask **for** | pedir |
| succeed **in** | tener éxito en |
| complain **about** | quejarse de |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-41/verb-prep-scene.png)

> I depend on my parents. Please listen to me. We waited for the bus. Look at the board, please. I believe in you.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-41/reading-verb-prep.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-41/dialogue-verb-prep.mp3" title="🔊 Dialogue"></audio>

> Do you depend on your parents? — Yes.  
> Did you listen to me? — Yes.  
> Did you wait for the bus? — For an hour.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-41/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I depend ___ my parents.  
2. Please listen ___ me.  
3. We waited ___ the bus.  
4. Look ___ the board.  
5. Vocab: depender de = depend ___

<details><summary>Ver solución</summary>

1. **on** · 2. **to** · 3. **for** · 4. **at** · 5. **on**
</details>""",
        tip="No traduzcas la preposición del español: *depend of* ❌ → **depend on** ✅.",
        next_course="[Unidad 42 — Adjective + preposition](/curso-b1/unit-42)",
        next_blog="[U42 — Adjective + preposition + feelings](/blog/curso-b1/unidad-42-adjective-preposition-feelings)",
        guides=["[U40](/blog/curso-b1/unidad-40-repaso-36-39)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-42-adjective-preposition-feelings.md", article(
        slug="unidad-42-adjective-preposition-feelings", unit=42,
        title="Adjective + Preposition B1 & Feelings & Attitudes",
        description="Aprende adjective + preposition (interested in, afraid of, good at) en inglés B1 con feelings. Guía Unidad 42 con audios.",
        image="/blog/curso-b1/unit-42/adj-preposition.png", alt="Adjective preposition B1",
        keywords=["adjective preposition B1", "interested in afraid of", "good at feelings", "feelings attitudes English", "inglés B1 unidad 42"],
        related=["unidad-41-verb-preposition-dependent", "unidad-43-during-for-while-time", "cursos-online-ingles-b1"],
        faqs=[("¿interested in o interested on?", "Siempre **interested in**."), ("¿afraid of o afraid from?", "**afraid of** + sustantivo/-ing."), ("¿Dónde practico?", "En la [Unidad 42 del curso B1](/curso-b1/unit-42).")],
        excerpt="Guía de la Unidad 42 del curso B1: adjective + preposition y feelings & attitudes.",
        intro="Tras la [Unidad 41](/blog/curso-b1/unidad-41-verb-preposition-dependent), la **Unidad 42** trabaja **adjective + preposition** con vocabulario de **feelings & attitudes**.",
        before="[U41 — Verb + preposition](/blog/curso-b1/unidad-41-verb-preposition-dependent)",
        learn=["**interested in / afraid of / good at**", "**proud of / worried about / married to**", "Vocabulario: feelings & attitudes", "Colocaciones frecuentes B1"],
        sections=r"""## 1. Patrones

| Adjetivo | Preposición | Ejemplo |
| :--- | :--- | :--- |
| interested | in | interested **in** English |
| afraid | of | afraid **of** spiders |
| good / bad | at | good **at** maths |
| proud | of | proud **of** my son |
| worried | about | worried **about** the exam |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-42/interested-in.mp3" title="🔊 interested in"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-42/afraid-of.mp3" title="🔊 afraid of"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-42/good-at.mp3" title="🔊 good at"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-42/proud-of.mp3" title="🔊 proud of"></audio>

---

## 2. Más ejemplos

> I'm **worried about** the exam.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-42/worried-about.mp3" title="🔊 worried about"></audio>

| Adjetivo | Preposición | Ejemplo |
| :--- | :--- | :--- |
| tired | of | tired **of** waiting |
| responsible | for | responsible **for** the project |
| different | from | different **from** each other |
| fed up | with | fed up **with** the rain |

---

## 3. Vocabulario: Feelings & attitudes

![Feelings](/blog/curso-b1/unit-42/feelings-vocab.png)

| Word | Idea |
| :--- | :--- |
| interested / excited / keen | entusiasmo |
| afraid / worried / sorry | preocupación |
| proud / famous / responsible | actitud |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-42/feelings-scene.png)

> I'm interested in learning English. She's afraid of spiders. He's good at maths. I'm proud of my son. I'm worried about the exam.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-42/reading-feelings.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-42/dialogue-feelings.mp3" title="🔊 Dialogue"></audio>

> Are you interested in English? — Yes.  
> Afraid of spiders? — A little.  
> Good at maths? — He's very good.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-42/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I'm interested ___ learning English.  
2. She's afraid ___ spiders.  
3. He's good ___ maths.  
4. I'm proud ___ my son.  
5. Vocab: preocupado por = worried ___

<details><summary>Ver solución</summary>

1. **in** · 2. **of** · 3. **at** · 4. **of** · 5. **about**
</details>""",
        tip="Aprende el bloque completo: *interested **in***, no solo *interested*.",
        next_course="[Unidad 43 — During, for, while](/curso-b1/unit-43)",
        next_blog="[U43 — During, for, while + time](/blog/curso-b1/unidad-43-during-for-while-time)",
        guides=["[U41](/blog/curso-b1/unidad-41-verb-preposition-dependent)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-43-during-for-while-time.md", article(
        slug="unidad-43-during-for-while-time", unit=43,
        title="During, For, While B1 + Time",
        description="Aprende during, for y while en inglés B1 con vocabulario de time. Guía Unidad 43 con audios.",
        image="/blog/curso-b1/unit-43/during-for-while.png", alt="During for while B1",
        keywords=["during for while B1", "during vs for", "while clause English", "time vocabulary B1", "inglés B1 unidad 43"],
        related=["unidad-42-adjective-preposition-feelings", "unidad-44-for-since-from-time", "cursos-online-ingles-b1"],
        faqs=[("¿during o for?", "**during** + sustantivo; **for** + duración."), ("¿while o during?", "**while** + cláusula (sujeto + verbo); **during** + nombre."), ("¿Dónde practico?", "En la [Unidad 43 del curso B1](/curso-b1/unit-43).")],
        excerpt="Guía de la Unidad 43 del curso B1: during, for, while y time.",
        intro="Tras la [Unidad 42](/blog/curso-b1/unidad-42-adjective-preposition-feelings), la **Unidad 43** distingue **during / for / while** con vocabulario de **time**.",
        before="[U42 — Adjective + preposition](/blog/curso-b1/unidad-42-adjective-preposition-feelings)",
        learn=["**during** + noun", "**for** + duration", "**while** + clause", "Vocabulario: time"],
        sections=r"""## 1. Tres formas de «durante»

| Palabra | Estructura | Ejemplo |
| :--- | :--- | :--- |
| **during** | + noun | **during** the film |
| **for** | + duration | **for** three years |
| **while** | + clause | **while** I was cooking |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-43/during-film.mp3" title="🔊 during"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-43/for-years.mp3" title="🔊 for"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-43/while-travelling.mp3" title="🔊 while"></audio>

---

## 2. Más ejemplos

> She phoned **during** the meeting.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-43/during-meeting.mp3" title="🔊 during meeting"></audio>

> The phone rang **while** we were eating.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-43/while-eating.mp3" title="🔊 while eating"></audio>

---

## 3. Vocabulario: Time

![Time](/blog/curso-b1/unit-43/time-vocab.png)

| Word | Idea |
| :--- | :--- |
| during / for / while | duración |
| moment / period / duration | tiempo |
| meanwhile / throughout | simultaneidad |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-43/time-scene.png)

> I fell asleep during the film. We lived there for three years. I met her while I was travelling. She phoned during the meeting. The phone rang while we were eating.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-43/reading-time.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-43/dialogue-time.mp3" title="🔊 Dialogue"></audio>

> Did you sleep during the film? — Yes.  
> How long did you live there? — For three years.  
> When did you meet her? — While I was travelling.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-43/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I fell asleep ___ the film.  
2. We lived there ___ three years.  
3. I met her ___ I was travelling.  
4. She phoned ___ the meeting.  
5. Vocab: mientras (oración) = ___

<details><summary>Ver solución</summary>

1. **during** · 2. **for** · 3. **while** · 4. **during** · 5. **while**
</details>""",
        tip="Pregunta: ¿va un **sustantivo** (during), una **duración** (for) o una **oración** (while)?",
        next_course="[Unidad 44 — For, since, from](/curso-b1/unit-44)",
        next_blog="[U44 — For, since, from + time expressions](/blog/curso-b1/unidad-44-for-since-from-time)",
        guides=["[U42](/blog/curso-b1/unidad-42-adjective-preposition-feelings)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-44-for-since-from-time.md", article(
        slug="unidad-44-for-since-from-time", unit=44,
        title="For, Since, From B1 + Time Expressions",
        description="Aprende for, since y from en inglés B1 con time expressions. Guía Unidad 44 con audios.",
        image="/blog/curso-b1/unit-44/for-since-from.png", alt="For since from B1",
        keywords=["for since from B1", "since present perfect", "from to time", "time expressions English", "inglés B1 unidad 44"],
        related=["unidad-43-during-for-while-time", "unidad-45-repaso-41-44", "cursos-online-ingles-b1"],
        faqs=[("¿since o for?", "**since** + punto de inicio; **for** + duración."), ("¿from o since?", "**from…to** = rango; **since** = desde un momento hasta ahora (con perfect)."), ("¿Dónde practico?", "En la [Unidad 44 del curso B1](/curso-b1/unit-44).")],
        excerpt="Guía de la Unidad 44 del curso B1: for, since, from y time expressions.",
        intro="Tras la [Unidad 43](/blog/curso-b1/unidad-43-during-for-while-time), la **Unidad 44** profundiza en **for / since / from** con **time expressions**.",
        before="[U43 — During, for, while](/blog/curso-b1/unidad-43-during-for-while-time)",
        learn=["**for** + duration", "**since** + starting point", "**from…to** / origin", "Vocabulario: time expressions"],
        sections=r"""## 1. For / since / from

| Palabra | Uso | Ejemplo |
| :--- | :--- | :--- |
| **for** | duración | **for** ten years |
| **since** | punto de inicio | **since** 2015 |
| **from** | from…to / origen | **from** 9am **to** 5pm |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-44/since-2015.mp3" title="🔊 since"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-44/for-ten-years.mp3" title="🔊 for"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-44/from-to.mp3" title="🔊 from to"></audio>

---

## 2. Más ejemplos

> She has been ill **since** Monday.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-44/since-monday.mp3" title="🔊 since Monday"></audio>

> I haven't eaten **since** breakfast.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-44/since-breakfast.mp3" title="🔊 since breakfast"></audio>

---

## 3. Vocabulario: Time expressions

![Time expressions](/blog/curso-b1/unit-44/time-expr-vocab.png)

| Expression | Idea |
| :--- | :--- |
| for ages / all day | duración larga |
| so far / already / yet | present perfect |
| from…to / until / by | rangos |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-44/time-expr-scene.png)

> I have lived here since 2015. We have known each other for ten years. The shop is open from 9am to 5pm. She has been ill since Monday. I haven't eaten since breakfast.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-44/reading-time-expr.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-44/dialogue-time-expr.mp3" title="🔊 Dialogue"></audio>

> How long have you lived here? — Since 2015.  
> How long have you known each other? — For ten years.  
> When is the shop open? — From 9am to 5pm.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-44/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I have lived here ___ 2015.  
2. We have known each other ___ ten years.  
3. The shop is open ___ 9am ___ 5pm.  
4. She has been ill ___ Monday.  
5. Vocab: desde (punto) = ___

<details><summary>Ver solución</summary>

1. **since** · 2. **for** · 3. **from** … **to** · 4. **since** · 5. **since**
</details>""",
        tip="*For* cuenta **cuánto**; *since* marca **desde cuándo**; *from* suele ir con **to**.",
        next_course="[Unidad 45 — Repaso 41–44](/curso-b1/unit-45)",
        next_blog="[U45 — Repaso 41–44](/blog/curso-b1/unidad-45-repaso-41-44)",
        guides=["[U43](/blog/curso-b1/unidad-43-during-for-while-time)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-45-repaso-41-44.md", article(
        slug="unidad-45-repaso-41-44", unit=45,
        title="Repaso B1 Unidades 41–44: Prepositions & Time",
        description="Repaso integrado B1: verb/adj + preposition, during/for/while y for/since/from. Guía Unidad 45 con audios.",
        image="/blog/curso-b1/unit-45/review-map.png", alt="Repaso B1 unidades 41-44",
        keywords=["repaso B1 41-44", "prepositions review", "during for while review", "since from review", "inglés B1 unidad 45"],
        related=["unidad-44-for-since-from-time", "unidad-40-repaso-36-39", "cursos-online-ingles-b1"],
        faqs=[("¿Qué repasa la U45?", "Verb/adj + preposition, during/for/while y for/since/from de U41–44."), ("¿Cómo estudiar?", "Mapa + audios mixtos + ejercicios del curso."), ("¿Dónde practico?", "En la [Unidad 45 del curso B1](/curso-b1/unit-45).")],
        excerpt="Guía de repaso de la Unidad 45 del curso B1 (contenidos 41–44).",
        intro="La **Unidad 45** integra [verb + preposition](/blog/curso-b1/unidad-41-verb-preposition-dependent), [adj + preposition](/blog/curso-b1/unidad-42-adjective-preposition-feelings), [during/for/while](/blog/curso-b1/unidad-43-during-for-while-time) y [for/since/from](/blog/curso-b1/unidad-44-for-since-from-time).",
        before="[U44 — For, since, from](/blog/curso-b1/unidad-44-for-since-from-time)",
        learn=["Repaso **verb + preposition**", "Repaso **adj + preposition**", "Repaso **during/for/while**", "Repaso **for/since/from**"],
        sections=r"""## 1. Mapa del repaso

![Review map](/blog/curso-b1/unit-45/review-map.png)

| Unidad | Foco |
| :--- | :--- |
| 41 | Verb + preposition |
| 42 | Adjective + preposition + feelings |
| 43 | During / for / while |
| 44 | For / since / from |

---

## 2. Ejemplos mixtos

![Mixed](/blog/curso-b1/unit-45/review-examples.png)

> I **depend on** my parents.  
> She's **interested in** art.  
> I fell asleep **during** the film.  
> I have lived here **since** 2015.  
> We waited **for** two hours.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-45/review-depend.mp3" title="🔊 depend"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-45/review-interested.mp3" title="🔊 interested"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-45/review-during.mp3" title="🔊 during"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-45/review-since.mp3" title="🔊 since"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-45/review-for.mp3" title="🔊 for"></audio>

---

## 3. Reading mixto

> I depend on my parents. She's interested in art. I fell asleep during the film. I have lived here since 2015. We waited for two hours.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-45/reading-mix.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-45/dialogue-mix.mp3" title="🔊 Dialogue"></audio>

> Do you depend on your parents? — Yes.  
> Interested in art? — Very much.  
> Since when? — Since 2015.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-45/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios exprés

1. I depend ___ my parents.  
2. She's interested ___ art.  
3. I fell asleep ___ the film.  
4. I have lived here ___ 2015.  
5. We waited ___ two hours.

<details><summary>Ver solución</summary>

1. **on** · 2. **in** · 3. **during** · 4. **since** · 5. **for**
</details>""",
        tip="Clasifica primero: ¿colocación verbo/adj, duración (for), punto (since) o simultaneidad (while/during)?",
        next_course="[Unidad 46 — Had better, it's time](/curso-b1/unit-46)",
        next_blog="Módulo 5 (U46+) — próximamente",
        guides=["[U41](/blog/curso-b1/unidad-41-verb-preposition-dependent)", "[U42](/blog/curso-b1/unidad-42-adjective-preposition-feelings)", "[U43](/blog/curso-b1/unidad-43-during-for-while-time)", "[U44](/blog/curso-b1/unidad-44-for-since-from-time)"],
    ))


def main():
    diagrams(); make_audios(); make_articles(); print("done U41–45 theory")


if __name__ == "__main__":
    main()
