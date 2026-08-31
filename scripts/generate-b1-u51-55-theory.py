#!/usr/bin/env python3
"""Generate B1 theory U51–55: diagrams, markdown, TTS audios."""
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
    save(d._image if hasattr(d, "_image") else None, unit, name)


def diagrams():
    img, d = canvas()
    title(d, "Review: All Conditionals")
    items = [("First", "if + present → will"), ("Second", "if + past → would"), ("Third", "if + past perf → would have"), ("Time", "when/until + present")]
    for i, (label, form) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 40, 190), label, fill=ACCENT, font=font(28, True))
        d.text((x + 20, 260), form, fill=INK, font=font(18))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "U11 first · U12 second · U13 contrast · U14 third · U15 repaso", fill=INK, font=font(22))
    save(img, 51, "conditionals-map.png")

    img, d = canvas()
    vocab_grid_words = ["travel", "health", "work", "study", "family", "money", "weather", "culture", "technology", "environment", "community", "future"]
    title(d, "Mixed topics vocabulary")
    for i, w in enumerate(vocab_grid_words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 16, y + 48), w, fill=INK, font=font(18, True))
    save(img, 51, "mixed-topics-vocab.png")

    img, d = canvas()
    title(d, "Conditionals in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "If it rains tomorrow, we'll stay at home. (first)",
        "If I had more time, I'd learn another language. (second)",
        "If we had left earlier, we would have caught the train. (third)",
        "When I finish work, I'll call you. (time clause)",
    ]):
        d.text((80, 160 + i * 90), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 51, "conditionals-scene.png")

    img, d = canvas()
    title(d, "Passive & Reported Speech")
    card(d, (48, 110, 580, 600))
    d.text((72, 140), "Passive", fill=ACCENT, font=font(28, True))
    d.text((72, 200), "be + V3", fill=INK, font=font(22))
    d.text((72, 260), "English is spoken here.", fill=INK, font=font(22))
    d.text((72, 320), "must/should be done", fill=INK, font=font(22))
    card(d, (620, 110, 1150, 600))
    d.text((644, 140), "Reported speech", fill=ACCENT, font=font(28, True))
    d.text((644, 200), "said/told + backshift", fill=INK, font=font(22))
    d.text((644, 260), "She said she was busy.", fill=INK, font=font(22))
    d.text((644, 320), "He asked if I was ready.", fill=INK, font=font(22))
    save(img, 52, "passive-reported-map.png")

    img, d = canvas()
    title(d, "Mixed topics vocabulary")
    words = ["news", "media", "report", "announce", "inform", "message", "policy", "research", "evidence", "statement", "question", "command"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 16, y + 48), w, fill=INK, font=font(18, True))
    save(img, 52, "mixed-topics-vocab.png")

    img, d = canvas()
    title(d, "Passive & reported in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "The report was published yesterday. (passive)",
        "Applications must be submitted online. (modal passive)",
        "She said she would send the email. (reported statement)",
        "He asked me if I had finished. (reported question)",
    ]):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(24))
    save(img, 52, "passive-reported-scene.png")

    img, d = canvas()
    title(d, "Review: Modals")
    items = [("Deduction", "must/might/can't"), ("Advice", "had better"), ("Preference", "would rather"), ("Necessity", "need/needn't")]
    for i, (label, form) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), label, fill=ACCENT, font=font(26, True))
        d.text((x + 30, 260), form, fill=INK, font=font(20))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "U8 deduction · U46 had better · U47 would rather · U49 need/needn't", fill=INK, font=font(22))
    save(img, 53, "modals-map.png")

    img, d = canvas()
    title(d, "Mixed topics vocabulary")
    words = ["advice", "preference", "necessity", "obligation", "permission", "possibility", "deduction", "certainty", "guess", "rule", "option", "requirement"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 12, y + 48), w, fill=INK, font=font(18, True))
    save(img, 53, "mixed-topics-vocab.png")

    img, d = canvas()
    title(d, "Modals in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "She must be at home — her car is there. (deduction)",
        "You had better see a doctor. (advice)",
        "I'd rather stay at home tonight. (preference)",
        "You needn't hurry — we have time. (no necessity)",
    ]):
        d.text((80, 160 + i * 90), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 53, "modals-scene.png")

    img, d = canvas()
    title(d, "Review: Tenses")
    items = [("U2", "PP continuous"), ("U3", "Past perfect"), ("U4", "Past vs PP"), ("U6", "Future forms")]
    for i, (u, label) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 50, 190), u, fill=ACCENT, font=font(34, True))
        d.text((x + 24, 260), label, fill=INK, font=font(20))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "have/has been + -ing · had + V3 · past vs present perfect · will/going to", fill=INK, font=font(22))
    save(img, 54, "tenses-map.png")

    img, d = canvas()
    title(d, "Mixed topics vocabulary")
    words = ["recently", "already", "yet", "since", "for", "ago", "just", "ever", "never", "lately", "duration", "sequence"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 16, y + 48), w, fill=INK, font=font(18, True))
    save(img, 54, "mixed-topics-vocab.png")

    img, d = canvas()
    title(d, "Tenses in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "I have lived here since 2015. (present perfect)",
        "She has been studying all morning. (PP continuous)",
        "When I arrived, they had already left. (past perfect)",
        "I'm going to visit my parents this weekend. (going to)",
    ]):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(24))
    save(img, 54, "tenses-scene.png")

    img, d = canvas()
    title(d, "Repaso 51–54")
    items = [("U51", "Conditionals"), ("U52", "Passive/Reported"), ("U53", "Modals"), ("U54", "Tenses")]
    for i, (u, label) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), u, fill=ACCENT, font=font(34, True))
        d.text((x + 16, 260), label, fill=INK, font=font(20))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "conditionals · passive/reported · modals · tenses", fill=INK, font=font(22))
    d.text((72, 520), "Consolidación Módulo 6 (primera mitad)", fill=INK, font=font(22))
    save(img, 55, "review-map.png")

    img, d = canvas()
    title(d, "Mixed examples")
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate([
        "If I had known, I would have told you. (third conditional)",
        "The email was sent yesterday. (passive)",
        "You needn't worry. (modal)",
        "I have been working here for five years. (PP continuous)",
    ]):
        d.text((80, 160 + i * 90), f"{i+1}. {t}", fill=INK, font=font(24))
    save(img, 55, "review-examples.png")


AUDIOS = {
    51: {
        "review-first": "If it rains tomorrow, we'll stay at home.",
        "review-second": "If I had more time, I'd learn another language.",
        "review-third": "If we had left earlier, we would have caught the train.",
        "review-time": "When I finish work, I'll call you.",
        "review-unless": "Unless you hurry, you'll miss the bus.",
        "reading-conditionals": "If it rains tomorrow, we'll stay at home. If I had more time, I'd learn another language. If we had left earlier, we would have caught the train. When I finish work, I'll call you. Unless you hurry, you'll miss the bus.",
        "dialogue-conditionals": "Will you go out? Only if the weather is good. What would you do with more time? I'd travel more. Any regrets? If I had studied harder, I would have passed.",
        "practice-mix": "First. Second. Third. Time clause. Unless.",
    },
    52: {
        "passive-present": "English is spoken all over the world.",
        "passive-past": "The report was published yesterday.",
        "modal-passive": "Applications must be submitted online.",
        "reported-statement": "She said she would send the email.",
        "reported-question": "He asked me if I had finished.",
        "reported-command": "The teacher told us to be quiet.",
        "reading-passive-reported": "English is spoken all over the world. The report was published yesterday. Applications must be submitted online. She said she would send the email. He asked me if I had finished. The teacher told us to be quiet.",
        "dialogue-passive-reported": "Was the report sent? Yes, it was published yesterday. What did she say? She said she would send the email. Did he ask anything? He asked if I had finished.",
        "practice-mix": "Passive. Modal passive. Reported statement. Reported question. Told to.",
    },
    53: {
        "must-deduction": "She must be at home — her car is there.",
        "might-possibility": "It might rain later.",
        "cant-deduction": "He can't be in the office — it's Sunday.",
        "had-better": "You had better see a doctor.",
        "would-rather": "I'd rather stay at home tonight.",
        "neednt": "You needn't hurry — we have time.",
        "reading-modals": "She must be at home — her car is there. It might rain later. He can't be in the office — it's Sunday. You had better see a doctor. I'd rather stay at home tonight. You needn't hurry — we have time.",
        "dialogue-modals": "Is she at home? She must be — her car is there. Should I go out? You had better not — it might rain. Need to hurry? No, you needn't.",
        "practice-mix": "Must. Might. Can't. Had better. Would rather. Needn't.",
    },
    54: {
        "present-perfect": "I have lived here since 2015.",
        "pp-continuous": "She has been studying all morning.",
        "past-perfect": "When I arrived, they had already left.",
        "past-simple": "I visited Paris last year.",
        "going-to": "I'm going to visit my parents this weekend.",
        "will-future": "I think it will rain tomorrow.",
        "reading-tenses": "I have lived here since 2015. She has been studying all morning. When I arrived, they had already left. I visited Paris last year. I'm going to visit my parents this weekend. I think it will rain tomorrow.",
        "dialogue-tenses": "How long have you lived here? Since 2015. What have you been doing? I've been studying all morning. Any plans? I'm going to visit my parents.",
        "practice-mix": "Present perfect. PP continuous. Past perfect. Past simple. Going to. Will.",
    },
    55: {
        "review-conditional": "If I had known, I would have told you.",
        "review-passive": "The email was sent yesterday.",
        "review-modal": "You needn't worry.",
        "review-tense": "I have been working here for five years.",
        "review-mixed": "If I had known, I would have told you. The email was sent yesterday. You needn't worry. I have been working here for five years.",
        "reading-mix": "If I had known, I would have told you. The email was sent yesterday. She said she would call back. You needn't worry. I have been working here for five years.",
        "dialogue-mix": "Any regrets? If I had known, I would have told you. Was the email sent? Yes, it was sent yesterday. Need to worry? No, you needn't.",
        "practice-mix": "Third conditional. Passive. Reported. Needn't. Present perfect continuous.",
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
    write_md("unidad-51-review-conditionals.md", article(
        slug="unidad-51-review-conditionals", unit=51,
        title="Review B1: All Conditionals + Mixed Topics",
        description="Repasa first, second y third conditional y time clauses en inglés B1. Guía Unidad 51 con audios y mixed topics.",
        image="/blog/curso-b1/unit-51/conditionals-map.png", alt="Review conditionals B1",
        keywords=["review conditionals B1", "first second third conditional", "time clauses English", "inglés B1 unidad 51"],
        related=["unidad-50-repaso-46-49", "unidad-52-review-passive-reported", "unidad-15-repaso-11-14", "cursos-online-ingles-b1"],
        faqs=[("¿Qué repasa la U51?", "First, second y third conditional + time clauses (when/until/unless) de U11–15."), ("¿Cómo elijo el condicional?", "Futuro real → first. Hipótesis presente → second. Pasado irreal → third."), ("¿Dónde practico?", "En la [Unidad 51 del curso B1](/curso-b1/unit-51).")],
        excerpt="Guía de la Unidad 51 del curso B1: repaso de todos los condicionales.",
        intro="Tras el [Repaso 46–49](/blog/curso-b1/unidad-50-repaso-46-49), la **Unidad 51** (*Review: all conditionals*) consolida los **tres condicionales** y las **time clauses** del curso con vocabulario de **mixed topics**.",
        before="[U50 — Repaso 46–49](/blog/curso-b1/unidad-50-repaso-46-49)",
        learn=["Repaso **first conditional** (if + present → will)", "Repaso **second conditional** (if + past → would)", "Repaso **third conditional** (if + past perfect → would have)", "**Time clauses**: when / until / unless + present", "Vocabulario: mixed topics"],
        sources="Conditionals review",
        sections=r"""## 1. Mapa de condicionales

| Tipo | If-clause | Result | Uso |
| :--- | :--- | :--- | :--- |
| **First** | Present simple | will / can / might | Futuro probable |
| **Second** | Past simple | would / could | Hipótesis presente |
| **Third** | Past perfect | would have + V3 | Pasado irreal |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-51/review-first.mp3" title="🔊 First"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-51/review-second.mp3" title="🔊 Second"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-51/review-third.mp3" title="🔊 Third"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-51/review-time.mp3" title="🔊 Time clause"></audio>

---

## 2. Time clauses

> **When / as soon as / until / unless** + present (no *will* en la cláusula de tiempo).

<audio controls preload="none" src="/audio/blog/curso-b1/unit-51/review-unless.mp3" title="🔊 Unless"></audio>

---

## 3. Vocabulario: Mixed topics

![Mixed topics](/blog/curso-b1/unit-51/mixed-topics-vocab.png)

| Word | Idea |
| :--- | :--- |
| travel / health / work | viajes / salud / trabajo |
| study / family / money | estudio / familia / dinero |
| weather / culture / technology | clima / cultura / tecnología |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-51/conditionals-scene.png)

> If it rains tomorrow, we'll stay at home. If I had more time, I'd learn another language. If we had left earlier, we would have caught the train. When I finish work, I'll call you. Unless you hurry, you'll miss the bus.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-51/reading-conditionals.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-51/dialogue-conditionals.mp3" title="🔊 Dialogue"></audio>

> Will you go out? — Only if the weather is good.  
> What would you do with more time? — I'd travel more.  
> Any regrets? — If I had studied harder, I would have passed.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-51/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. If it ___ tomorrow, we'll stay home. (*rains*)  
2. If I ___ more time, I'd travel. (*had*)  
3. If we ___ earlier, we would have caught the train. (*had left*)  
4. When I ___ work, I'll call you. (*finish*)  
5. ¿First, second o third? *If she had known, she would have called.*

<details><summary>Ver solución</summary>

1. **rains** · 2. **had** · 3. **had left** · 4. **finish** · 5. **third**
</details>""",
        tip="Pregúntate: ¿es real/probable (first), hipotético ahora (second) o pasado cerrado (third)?",
        next_course="[Unidad 52 — Passive & reported speech](/curso-b1/unit-52)",
        next_blog="[U52 — Review passive & reported](/blog/curso-b1/unidad-52-review-passive-reported)",
        guides=["[U15](/blog/curso-b1/unidad-15-repaso-11-14)", "[U11–14](/blog/curso-b1/unidad-11-first-conditional-weather)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-52-review-passive-reported.md", article(
        slug="unidad-52-review-passive-reported", unit=52,
        title="Review B1: Passive & Reported Speech + Mixed Topics",
        description="Repasa voz pasiva, modal passive y reported speech en inglés B1. Guía Unidad 52 con audios y mixed topics.",
        image="/blog/curso-b1/unit-52/passive-reported-map.png", alt="Review passive reported B1",
        keywords=["passive review B1", "reported speech review", "modal passive English", "inglés B1 unidad 52"],
        related=["unidad-51-review-conditionals", "unidad-53-review-modals", "unidad-20-repaso-16-19", "cursos-online-ingles-b1"],
        faqs=[("¿Qué repasa la U52?", "Passive (U16), modal passive (U17), reported statements/questions/commands (U18–19)."), ("¿Cómo formo la pasiva?", "**be + past participle** (is done, was sent, must be submitted)."), ("¿Dónde practico?", "En la [Unidad 52 del curso B1](/curso-b1/unit-52).")],
        excerpt="Guía de la Unidad 52 del curso B1: repaso de passive y reported speech.",
        intro="Tras la [Unidad 51](/blog/curso-b1/unidad-51-review-conditionals), la **Unidad 52** repasa **passive voice**, **modal passive** y **reported speech** de U16–19.",
        before="[U51 — Review conditionals](/blog/curso-b1/unidad-51-review-conditionals)",
        learn=["Repaso **passive**: be + V3", "Repaso **modal passive**: must/should/can be + V3", "Repaso **reported statements**: said/told + backshift", "Repaso **reported questions & commands**", "Vocabulario: mixed topics"],
        sources="Passive & reported review",
        sections=r"""## 1. Passive voice

| Tense | Forma | Ejemplo |
| :--- | :--- | :--- |
| Present | am/is/are + V3 | English **is spoken** here. |
| Past | was/were + V3 | The report **was published**. |
| Modal | modal + be + V3 | It **must be done**. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-52/passive-present.mp3" title="🔊 Passive present"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-52/passive-past.mp3" title="🔊 Passive past"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-52/modal-passive.mp3" title="🔊 Modal passive"></audio>

---

## 2. Reported speech

| Tipo | Estructura | Ejemplo |
| :--- | :--- | :--- |
| Statement | said/told (that) | She **said she would** send it. |
| Question | asked if/wh- | He **asked if I had** finished. |
| Command | told + to | She **told me to** wait. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-52/reported-statement.mp3" title="🔊 Reported statement"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-52/reported-question.mp3" title="🔊 Reported question"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-52/reported-command.mp3" title="🔊 Reported command"></audio>

---

## 3. Vocabulario: Mixed topics

![Mixed topics](/blog/curso-b1/unit-52/mixed-topics-vocab.png)

| Word | Idea |
| :--- | :--- |
| report / announce / inform | informar |
| message / statement / evidence | mensaje / declaración / prueba |
| policy / research / media | política / investigación / medios |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-52/passive-reported-scene.png)

> English is spoken all over the world. The report was published yesterday. Applications must be submitted online. She said she would send the email. He asked me if I had finished. The teacher told us to be quiet.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-52/reading-passive-reported.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-52/dialogue-passive-reported.mp3" title="🔊 Dialogue"></audio>

> Was the report sent? — Yes, it was published yesterday.  
> What did she say? — She said she would send the email.  
> Did he ask anything? — He asked if I had finished.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-52/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. The email ___ sent yesterday. (*was*)  
2. Applications ___ be submitted online. (*must*)  
3. She said she ___ send the email. (*would*)  
4. He asked me if I ___ finished. (*had*)  
5. The teacher told us ___ be quiet. (*to*)

<details><summary>Ver solución</summary>

1. **was** · 2. **must** · 3. **would** · 4. **had** · 5. **to**
</details>""",
        tip="En reported speech con verbo introductorio en pasado, aplica **backshift** (will→would, have→had).",
        next_course="[Unidad 53 — Review modals](/curso-b1/unit-53)",
        next_blog="[U53 — Review modals](/blog/curso-b1/unidad-53-review-modals)",
        guides=["[U20](/blog/curso-b1/unidad-20-repaso-16-19)", "[U16–19](/blog/curso-b1/unidad-16-passive-voice-technology)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-53-review-modals.md", article(
        slug="unidad-53-review-modals", unit=53,
        title="Review B1: Modals + Mixed Topics",
        description="Repasa modales de deducción, consejo, preferencia y necesidad en inglés B1. Guía Unidad 53 con audios.",
        image="/blog/curso-b1/unit-53/modals-map.png", alt="Review modals B1",
        keywords=["modals review B1", "must might can't deduction", "had better would rather needn't", "inglés B1 unidad 53"],
        related=["unidad-52-review-passive-reported", "unidad-54-review-tenses", "unidad-8-modals-deduction", "cursos-online-ingles-b1"],
        faqs=[("¿Qué modales repasa la U53?", "Deducción (must/might/can't), had better, would rather, need/needn't."), ("¿must = deducción u obligación?", "Aquí **deducción** (She must be at home). Obligación = must do."), ("¿Dónde practico?", "En la [Unidad 53 del curso B1](/curso-b1/unit-53).")],
        excerpt="Guía de la Unidad 53 del curso B1: repaso de modales.",
        intro="Tras la [Unidad 52](/blog/curso-b1/unidad-52-review-passive-reported), la **Unidad 53** repasa **modales** de deducción, consejo, preferencia y necesidad.",
        before="[U52 — Passive & reported](/blog/curso-b1/unidad-52-review-passive-reported)",
        learn=["**Deducción**: must / might / can't", "**Consejo**: had better", "**Preferencia**: would rather", "**Necesidad**: need / needn't", "Vocabulario: mixed topics"],
        sources="Modals review",
        sections=r"""## 1. Modals de deducción

| Modal | Significado | Ejemplo |
| :--- | :--- | :--- |
| **must** | casi seguro | She **must be** at home. |
| **might** | posible | It **might rain**. |
| **can't** | casi imposible | He **can't be** in the office. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-53/must-deduction.mp3" title="🔊 Must"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-53/might-possibility.mp3" title="🔊 Might"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-53/cant-deduction.mp3" title="🔊 Can't"></audio>

---

## 2. Consejo, preferencia y necesidad

| Modal | Uso | Ejemplo |
| :--- | :--- | :--- |
| **had better** | consejo fuerte | You **had better** see a doctor. |
| **would rather** | preferencia | I'd **rather stay** at home. |
| **needn't** | no necesario | You **needn't** hurry. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-53/had-better.mp3" title="🔊 Had better"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-53/would-rather.mp3" title="🔊 Would rather"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-53/neednt.mp3" title="🔊 Needn't"></audio>

---

## 3. Vocabulario: Mixed topics

![Mixed topics](/blog/curso-b1/unit-53/mixed-topics-vocab.png)

| Word | Idea |
| :--- | :--- |
| advice / preference / necessity | consejo / preferencia / necesidad |
| obligation / permission / possibility | obligación / permiso / posibilidad |
| deduction / certainty / guess | deducción / certeza / suposición |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-53/modals-scene.png)

> She must be at home — her car is there. It might rain later. He can't be in the office — it's Sunday. You had better see a doctor. I'd rather stay at home tonight. You needn't hurry — we have time.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-53/reading-modals.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-53/dialogue-modals.mp3" title="🔊 Dialogue"></audio>

> Is she at home? — She must be — her car is there.  
> Should I go out? — You had better not — it might rain.  
> Need to hurry? — No, you needn't.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-53/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. She ___ be at home — her car is there. (*must*)  
2. It ___ rain later. (*might*)  
3. You ___ better see a doctor. (*had*)  
4. I'd ___ stay at home. (*rather*)  
5. You ___ hurry. (*needn't*)

<details><summary>Ver solución</summary>

1. **must** · 2. **might** · 3. **had** · 4. **rather** · 5. **needn't**
</details>""",
        tip="Clasifica el modal: ¿deduces (must/might/can't), aconsejas (had better), prefieres (would rather) o niegas necesidad (needn't)?",
        next_course="[Unidad 54 — Review tenses](/curso-b1/unit-54)",
        next_blog="[U54 — Review tenses](/blog/curso-b1/unidad-54-review-tenses)",
        guides=["[U8](/blog/curso-b1/unidad-8-modals-deduction)", "[U46–49](/blog/curso-b1/unidad-46-had-better-its-time-advice)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-54-review-tenses.md", article(
        slug="unidad-54-review-tenses", unit=54,
        title="Review B1: Tenses + Mixed Topics",
        description="Repasa present perfect, past perfect, futuros y contraste de tiempos en inglés B1. Guía Unidad 54 con audios.",
        image="/blog/curso-b1/unit-54/tenses-map.png", alt="Review tenses B1",
        keywords=["tenses review B1", "present perfect past perfect", "will going to future", "inglés B1 unidad 54"],
        related=["unidad-53-review-modals", "unidad-55-repaso-51-54", "unidad-5-repaso-1-4", "cursos-online-ingles-b1"],
        faqs=[("¿Qué tiempos repasa la U54?", "PP, PP continuous, past perfect, past simple vs PP, will/going to."), ("¿since o for?", "**since** + punto de inicio · **for** + duración."), ("¿Dónde practico?", "En la [Unidad 54 del curso B1](/curso-b1/unit-54).")],
        excerpt="Guía de la Unidad 54 del curso B1: repaso de tiempos verbales.",
        intro="Tras la [Unidad 53](/blog/curso-b1/unidad-53-review-modals), la **Unidad 54** repasa los **tiempos verbales** clave del curso B1.",
        before="[U53 — Review modals](/blog/curso-b1/unidad-53-review-modals)",
        learn=["**Present perfect** + since/for", "**Present perfect continuous**", "**Past perfect** (secuencia)", "**Past simple vs present perfect**", "**Future**: will / going to", "Vocabulario: mixed topics"],
        sources="Tenses review",
        sections=r"""## 1. Mapa de tiempos

| Tiempo | Forma | Ejemplo |
| :--- | :--- | :--- |
| **Present perfect** | have/has + V3 | I **have lived** here since 2015. |
| **PP continuous** | have/has been + -ing | She **has been studying**. |
| **Past perfect** | had + V3 | They **had left** when I arrived. |
| **Going to** | am/is/are going to | I'm **going to visit** my parents. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-54/present-perfect.mp3" title="🔊 Present perfect"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-54/pp-continuous.mp3" title="🔊 PP continuous"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-54/past-perfect.mp3" title="🔊 Past perfect"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-54/going-to.mp3" title="🔊 Going to"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b1/unit-54/past-simple.mp3" title="🔊 Past simple"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-54/will-future.mp3" title="🔊 Will"></audio>

> Past simple = momento cerrado (*last year*). Present perfect = conexión con ahora (*since/for*).

---

## 3. Vocabulario: Mixed topics

![Mixed topics](/blog/curso-b1/unit-54/mixed-topics-vocab.png)

| Word | Idea |
| :--- | :--- |
| recently / already / yet | recientemente / ya / aún |
| since / for / ago | desde / durante / hace |
| just / ever / never | acaba de / alguna vez / nunca |

---

## 4. Reading

![Scene](/blog/curso-b1/unit-54/tenses-scene.png)

> I have lived here since 2015. She has been studying all morning. When I arrived, they had already left. I visited Paris last year. I'm going to visit my parents this weekend. I think it will rain tomorrow.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-54/reading-tenses.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-54/dialogue-tenses.mp3" title="🔊 Dialogue"></audio>

> How long have you lived here? — Since 2015.  
> What have you been doing? — I've been studying all morning.  
> Any plans? — I'm going to visit my parents.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-54/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I ___ lived here since 2015. (*have*)  
2. She ___ been studying all morning. (*has*)  
3. When I arrived, they ___ already left. (*had*)  
4. I ___ Paris last year. (*visited*)  
5. I'm ___ to visit my parents. (*going*)

<details><summary>Ver solución</summary>

1. **have** · 2. **has** · 3. **had** · 4. **visited** · 5. **going**
</details>""",
        tip="Busca marcadores temporales: *since/for* → present perfect; *last year/ago* → past simple; secuencia pasada → past perfect.",
        next_course="[Unidad 55 — Repaso 51–54](/curso-b1/unit-55)",
        next_blog="[U55 — Repaso 51–54](/blog/curso-b1/unidad-55-repaso-51-54)",
        guides=["[U2–7](/blog/curso-b1/unidad-2-present-perfect-continuous)", "[U5](/blog/curso-b1/unidad-5-repaso-1-4)", "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)"],
    ))

    write_md("unidad-55-repaso-51-54.md", article(
        slug="unidad-55-repaso-51-54", unit=55,
        title="Repaso B1 Unidades 51–54: Conditionals, Passive, Modals & Tenses",
        description="Repaso integrado B1: conditionals, passive/reported, modals y tenses. Guía Unidad 55 con audios.",
        image="/blog/curso-b1/unit-55/review-map.png", alt="Repaso B1 unidades 51-54",
        keywords=["repaso B1 51-54", "conditionals review", "passive modals tenses review", "inglés B1 unidad 55"],
        related=["unidad-54-review-tenses", "unidad-51-review-conditionals", "unidad-50-repaso-46-49", "cursos-online-ingles-b1"],
        faqs=[("¿Qué repasa la U55?", "Conditionals (U51), passive/reported (U52), modals (U53) y tenses (U54)."), ("¿Cómo estudiar?", "Mapa + audios mixtos + ejercicios del curso."), ("¿Dónde practico?", "En la [Unidad 55 del curso B1](/curso-b1/unit-55).")],
        excerpt="Guía de repaso de la Unidad 55 del curso B1 (contenidos 51–54).",
        intro="La **Unidad 55** integra [conditionals](/blog/curso-b1/unidad-51-review-conditionals), [passive & reported](/blog/curso-b1/unidad-52-review-passive-reported), [modals](/blog/curso-b1/unidad-53-review-modals) y [tenses](/blog/curso-b1/unidad-54-review-tenses).",
        before="[U54 — Review tenses](/blog/curso-b1/unidad-54-review-tenses)",
        learn=["Repaso **conditionals**", "Repaso **passive & reported speech**", "Repaso **modals**", "Repaso **tenses**"],
        sources="B1 review",
        sections=r"""## 1. Mapa del repaso

![Review map](/blog/curso-b1/unit-55/review-map.png)

| Unidad | Foco |
| :--- | :--- |
| 51 | All conditionals + time clauses |
| 52 | Passive & reported speech |
| 53 | Modals (deduction, advice, preference, necessity) |
| 54 | Tenses (PP, past perfect, futures) |

---

## 2. Ejemplos mixtos

![Mixed](/blog/curso-b1/unit-55/review-examples.png)

> If I **had known**, I **would have told** you.  
> The email **was sent** yesterday.  
> You **needn't** worry.  
> I **have been working** here for five years.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-55/review-conditional.mp3" title="🔊 Conditional"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-55/review-passive.mp3" title="🔊 Passive"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-55/review-modal.mp3" title="🔊 Modal"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-55/review-tense.mp3" title="🔊 Tense"></audio>

---

## 3. Reading mixto

> If I had known, I would have told you. The email was sent yesterday. She said she would call back. You needn't worry. I have been working here for five years.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-55/reading-mix.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-55/dialogue-mix.mp3" title="🔊 Dialogue"></audio>

> Any regrets? — If I had known, I would have told you.  
> Was the email sent? — Yes, it was sent yesterday.  
> Need to worry? — No, you needn't.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-55/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios exprés

1. If I ___ known, I would have told you. (*had*)  
2. The email ___ sent yesterday. (*was*)  
3. She said she ___ call back. (*would*)  
4. You ___ worry. (*needn't*)  
5. I ___ been working here for five years. (*have*)

<details><summary>Ver solución</summary>

1. **had** · 2. **was** · 3. **would** · 4. **needn't** · 5. **have**
</details>""",
        tip="Clasifica primero: ¿condicional, pasiva/reported, modal o tiempo verbal?",
        next_course="[Unidad 56 — Próximo bloque](/curso-b1/unit-56)",
        next_blog="Módulo 6 (U56+) — próximamente",
        guides=["[U51](/blog/curso-b1/unidad-51-review-conditionals)", "[U52](/blog/curso-b1/unidad-52-review-passive-reported)", "[U53](/blog/curso-b1/unidad-53-review-modals)", "[U54](/blog/curso-b1/unidad-54-review-tenses)"],
    ))


def main():
    diagrams()
    make_audios()
    make_articles()
    print("done U51–55 theory")


if __name__ == "__main__":
    main()
