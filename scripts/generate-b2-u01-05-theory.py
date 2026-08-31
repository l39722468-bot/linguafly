#!/usr/bin/env python3
"""Generate B2 theory U01–05: diagrams, markdown, TTS audios."""
from __future__ import annotations
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT_MD = ROOT / "src/content/blog/curso-b2"
DATE = "2026-08-31"
BG, INK, ACCENT, CARD, LINE = (245, 248, 252), (20, 35, 55), (15, 110, 140), (255, 255, 255), (200, 215, 230)
BING = ["curso de inglés gratis", "aprender inglés gratis", "curso de inglés online gratis", "curso inglés B2 gratis"]
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


def diagrams():
    img, d = canvas(); title(d, "Wish / If only + regret")
    card(d, (48, 110, 580, 600)); d.text((72, 140), "wish / if only", fill=ACCENT, font=font(28, True))
    d.text((72, 200), "+ past perfect", fill=INK, font=font(22))
    d.text((72, 260), "I wish I had studied.", fill=INK, font=font(22))
    d.text((72, 320), "+ could (present)", fill=INK, font=font(22))
    d.text((72, 360), "I wish I could afford it.", fill=INK, font=font(22))
    card(d, (620, 110, 1150, 600)); d.text((644, 140), "regret", fill=ACCENT, font=font(28, True))
    d.text((644, 200), "regret + gerund", fill=INK, font=font(22))
    d.text((644, 260), "I regret eating so much.", fill=INK, font=font(22))
    d.text((644, 320), "regret + to inf", fill=INK, font=font(22))
    d.text((644, 360), "I regret to inform you.", fill=INK, font=font(22))
    save(img, 1, "wish-regret.png")

    img, d = canvas(); title(d, "Participle clauses")
    card(d, (48, 110, 580, 600)); d.text((72, 140), "-ing clause", fill=ACCENT, font=font(28, True))
    d.text((72, 200), "active meaning", fill=INK, font=font(22))
    d.text((72, 260), "Motivated by results, he trained.", fill=INK, font=font(20))
    card(d, (620, 110, 1150, 600)); d.text((644, 140), "-ed / Having + pp", fill=ACCENT, font=font(26, True))
    d.text((644, 200), "passive / completed action", fill=INK, font=font(22))
    d.text((644, 260), "Encouraged by the crowd...", fill=INK, font=font(20))
    d.text((644, 320), "Having finished, he rested.", fill=INK, font=font(20))
    save(img, 1, "participle-clauses.png")

    img, d = canvas(); title(d, "Mixed conditionals")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "If + past perfect → would + present",
        "If he had taken medicine, he would feel better now.",
        "If + past simple → would + perfect",
        "If I were taller, I would have joined the team.",
    ]):
        d.text((80, 150 + i * 95), t, fill=INK, font=font(24 if i % 2 else 22, i % 2 == 0))
    save(img, 1, "mixed-conditionals.png")

    img, d = canvas(); title(d, "Personal development")
    words = ["goal", "motivation", "self-discipline", "habit", "mindset", "growth", "resilience", "commitment", "progress", "challenge", "achievement", "wellbeing"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 16, y + 48), w, fill=INK, font=font(18, True))
    save(img, 1, "personal-dev-vocab.png")

    img, d = canvas(); title(d, "Future tenses B2")
    card(d, (48, 110, 380, 600)); d.text((72, 140), "will", fill=ACCENT, font=font(28, True))
    d.text((72, 200), "promises / predictions", fill=INK, font=font(20))
    d.text((72, 260), "I will let you know.", fill=INK, font=font(20))
    card(d, (410, 110, 740, 600)); d.text((434, 140), "going to", fill=ACCENT, font=font(28, True))
    d.text((434, 200), "plans / evidence", fill=INK, font=font(20))
    d.text((434, 260), "It is going to rain.", fill=INK, font=font(20))
    card(d, (772, 110, 1150, 600)); d.text((796, 140), "future perfect", fill=ACCENT, font=font(24, True))
    d.text((796, 200), "will have + pp", fill=INK, font=font(20))
    d.text((796, 260), "By June she will have finished.", fill=INK, font=font(18))
    save(img, 2, "future-tenses.png")

    img, d = canvas(); title(d, "Work vocabulary")
    words = ["colleague", "deadline", "promotion", "overtime", "meeting", "project", "salary", "shift", "resign", "recruit", "interview", "workload"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 12, y + 48), w, fill=INK, font=font(18, True))
    save(img, 2, "work-vocab.png")

    img, d = canvas(); title(d, "At work")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "By next month I will have completed the project.",
        "We are having a meeting tomorrow at nine.",
        "I will let you know as soon as I get the offer.",
        "She is going to apply for a promotion.",
    ]):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(22))
    save(img, 2, "work-scene.png")

    img, d = canvas(); title(d, "Gerund vs infinitive")
    card(d, (48, 110, 580, 600)); d.text((72, 140), "+ gerund (-ing)", fill=ACCENT, font=font(28, True))
    d.text((72, 200), "enjoy, mind, avoid", fill=INK, font=font(22))
    d.text((72, 260), "I enjoy painting.", fill=INK, font=font(22))
    d.text((72, 320), "stop + -ing = cease", fill=INK, font=font(22))
    card(d, (620, 110, 1150, 600)); d.text((644, 140), "+ infinitive (to)", fill=ACCENT, font=font(26, True))
    d.text((644, 200), "decide, agree, aim", fill=INK, font=font(22))
    d.text((644, 260), "She decided to study.", fill=INK, font=font(22))
    d.text((644, 320), "stop + to = purpose", fill=INK, font=font(22))
    save(img, 3, "gerund-infinitive.png")

    img, d = canvas(); title(d, "Education vocabulary")
    words = ["degree", "scholarship", "assignment", "deadline", "graduate", "lecture", "seminar", "enrol", "qualification", "revise", "campus", "tuition"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 12, y + 48), w, fill=INK, font=font(18, True))
    save(img, 3, "education-vocab.png")

    img, d = canvas(); title(d, "At university")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "I enjoy attending lectures.",
        "She decided to apply for a scholarship.",
        "They stopped procrastinating and finished the assignment.",
        "Would you mind opening the seminar room?",
    ]):
        d.text((80, 160 + i * 90), f"{i+1}. {t}", fill=INK, font=font(22))
    save(img, 3, "education-scene.png")

    img, d = canvas(); title(d, "Verb + object + infinitive")
    verbs = [("convince", "me to join"), ("tell", "us to wait"), ("ask", "her to help"), ("want", "them to leave"), ("advise", "him to rest"), ("allow", "us to enter")]
    for i, (v, ex) in enumerate(verbs):
        y = 120 + i * 85; card(d, (48, y, 1150, y + 70))
        d.text((72, y + 18), v, fill=ACCENT, font=font(24, True)); d.text((420, y + 18), ex, fill=INK, font=font(22))
    save(img, 4, "verb-object-inf.png")

    img, d = canvas(); title(d, "Leisure vocabulary")
    words = ["hobby", "pastime", "unwind", "take up", "give up", "hang out", "outing", "leisure", "craft", "club", "excursion", "recreation"]
    for i, w in enumerate(words):
        x, y = 48 + (i % 4) * 280, 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130)); d.text((x + 12, y + 48), w, fill=INK, font=font(18, True))
    save(img, 4, "leisure-vocab.png")

    img, d = canvas(); title(d, "Leisure in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate([
        "My friend convinced me to join the birdwatching trip.",
        "The ranger told us to stay on the trail.",
        "They invited us to come volunteering with them.",
        "Would you like me to help with the craft workshop?",
    ]):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(22))
    save(img, 4, "leisure-scene.png")

    img, d = canvas(); title(d, "Review U1–U4")
    items = [("U1", "Wish / participle"), ("U2", "Future tenses"), ("U3", "Gerund / inf"), ("U4", "Obj + inf")]
    for i, (u, label) in enumerate(items):
        x = 48 + i * 280; card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), u, fill=ACCENT, font=font(34, True)); d.text((x + 24, 260), label, fill=INK, font=font(20))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "wish · future perfect · enjoy + -ing · convince sb to", fill=INK, font=font(22))
    d.text((72, 520), "Vocab: personal dev · work · education · leisure", fill=INK, font=font(22))
    save(img, 5, "review-map.png")

    img, d = canvas(); title(d, "Mixed examples")
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate([
        "I wish I had joined the gym earlier. (wish)",
        "By June she will have finished the course. (future perfect)",
        "I enjoy attending seminars. (gerund)",
        "They asked us to keep quiet. (object + inf)",
        "If he had rested, he would feel better now. (mixed)",
    ]):
        d.text((80, 150 + i * 85), f"{i+1}. {t}", fill=INK, font=font(22))
    save(img, 5, "review-examples.png")


AUDIOS = {
    1: {
        "wish-had": "I wish I had joined the gym when I had the chance.",
        "wish-could": "I wish we could afford a gym membership.",
        "if-only": "If only she had followed the doctor's advice.",
        "regret-gerund": "They regret eating so much junk food.",
        "participle-ed": "Encouraged by the cheering crowd, the runner crossed the finish line.",
        "having-finished": "Having finished the workout, he felt exhausted.",
        "mixed-cond": "If he had taken the medicine, he would feel better now.",
        "reading-u1": "I wish I had joined the gym when I had the chance. If only she had followed the doctor's advice. Encouraged by the crowd, the runner crossed the line. Having finished the workout, he felt exhausted. If he had taken the medicine, he would feel better now.",
        "dialogue-u1": "Do you regret skipping breakfast? Yes, I regret eating so fast. Wish you had warned me? I wish I had told you about the allergy.",
        "practice-u1": "Wish had. If only had. Encouraged by. Having finished. Would feel better now.",
    },
    2: {
        "will-let": "I will let you know as soon as I get the offer.",
        "going-to-rain": "The clouds are gathering. It is going to rain soon.",
        "future-perfect": "By next month I will have completed the project.",
        "will-promise": "I swear I will never miss a deadline again.",
        "present-continuous": "We are having a meeting tomorrow at nine.",
        "by-2028": "By 2028 he will have spent twenty years in the company.",
        "reading-u2": "By next month I will have completed the project. I will let you know as soon as I get the offer. It is going to rain soon. We are having a meeting tomorrow at nine. I swear I will never miss a deadline again.",
        "dialogue-u2": "Finished the project by June? Yes, I will have completed it. Meeting tomorrow? Yes, we are having one at nine. Will you tell me? I will let you know.",
        "practice-u2": "Will have completed. Will let you know. Going to rain. Having a meeting. Will never miss.",
    },
    3: {
        "enjoy-gerund": "I enjoy attending lectures.",
        "decide-inf": "She decided to apply for a scholarship.",
        "stop-gerund": "They stopped procrastinating and finished the assignment.",
        "mind-gerund": "Would you mind opening the seminar room?",
        "avoid-gerund": "He avoided answering the question.",
        "agree-inf": "She agreed to take the course next semester.",
        "reading-u3": "I enjoy attending lectures. She decided to apply for a scholarship. They stopped procrastinating. Would you mind opening the seminar room? She agreed to take the course.",
        "dialogue-u3": "Do you enjoy studying? I enjoy attending lectures. Mind helping? Would you mind opening the door? Decided to enrol? Yes, she decided to apply.",
        "practice-u3": "Enjoy attending. Decided to apply. Stopped procrastinating. Mind opening. Agreed to take.",
    },
    4: {
        "convince-to": "My friend convinced me to join the birdwatching trip.",
        "tell-to": "The ranger told us to stay on the trail.",
        "ask-to": "I asked her to wait at the park entrance.",
        "want-to": "She wants me to take up birdwatching.",
        "advise-to": "My guide advised me to avoid feeding the animals.",
        "invite-to": "They invited us to come volunteering with them.",
        "reading-u4": "My friend convinced me to join the trip. The ranger told us to stay on the trail. I asked her to wait. She wants me to take up birdwatching. They invited us to come volunteering.",
        "dialogue-u4": "Join the trip? My friend convinced me to. Stay on the trail? The ranger told us to. Want me to try? She wants me to take up birdwatching.",
        "practice-u4": "Convinced me to. Told us to. Asked her to. Wants me to. Invited us to.",
    },
    5: {
        "review-wish": "I wish I had joined the gym earlier.",
        "review-future": "By June she will have finished the course.",
        "review-gerund": "I enjoy attending seminars.",
        "review-object": "They asked us to keep quiet.",
        "review-mixed": "If he had rested, he would feel better now.",
        "reading-mix": "I wish I had joined the gym earlier. By June she will have finished the course. I enjoy attending seminars. They asked us to keep quiet. If he had rested, he would feel better now.",
        "dialogue-mix": "Wish you had joined? I wish I had. Finished by June? She will have finished. Asked to be quiet? They asked us to keep quiet.",
        "practice-mix": "Wish had. Will have finished. Enjoy attending. Asked us to. Would feel better.",
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
    keywords = "\n".join(f"  - {k}" for k in kw["keywords"] + BING)
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

## Practica ahora

1. Repasa los ejemplos en voz alta.  
2. Practica en la [Unidad {kw["unit"]} del curso B2](/curso-b2/unit-{kw["unit"]}).

Curso:

- {kw["next_course"]}

Guía teórica siguiente:

- {kw["next_blog"]}

Guías relacionadas:

{guides}

---

## Fuentes

- CEFR B2 · Cambridge B2 First · British Council — {kw["sources"]}
"""


def make_articles():
    write_md("unidad-1-repaso-b1-b2.md", article(
        slug="unidad-1-repaso-b1-b2", unit=1,
        title="Repaso B1 → B2: Wish, Participle Clauses & Mixed Conditionals",
        description="Aprende wish/regret, participle clauses y mixed conditionals en inglés B2 con vocabulario de personal development. Guía Unidad 1 con audios.",
        image="/blog/curso-b2/unit-1/wish-regret.png", alt="Repaso B1 a B2 wish regret",
        keywords=["repaso B1 B2", "wish if only English", "participle clauses B2", "mixed conditionals", "inglés B2 unidad 1", "ejercicios inglés B2 gratis"],
        related=[HUB, "unidad-2-future-tenses-work", "gramatica-ingles-b1-guia"],
        faqs=[("¿Wish + pasado perfecto?", "**I wish / If only + past perfect** para arrepentimientos pasados: I wish I **had studied**."), ("¿Participle clause -ed o -ing?", "**-ed** = pasiva (Encouraged by…); **-ing** = activa (Motivating the team…). **Having + pp** = acción completada antes."), ("¿Mixed conditional?", "Pasado irreal → presente: If he **had taken** medicine, he **would feel** better **now**."), ("¿Dónde practico?", "En la [Unidad 1 del curso B2](/curso-b2/unit-1).")],
        excerpt="Guía de la Unidad 1 del curso B2: puente B1 → B2 con wish, participle clauses y mixed conditionals.",
        intro="Empiezas el [curso B2](/blog/metodos/ingles-b2) con la **Unidad 1** (*Repaso B1 → B2*): activas **wish/regret**, **participle clauses** y **mixed conditionals** con vocabulario de **personal development**.",
        before="[Inglés B2 — guía del nivel](/blog/metodos/ingles-b2)",
        learn=["**I wish / If only + past perfect / could**", "**Regret + gerund**", "**Participle clauses** (-ing / -ed / Having + pp)", "**Mixed conditionals**", "Vocabulario: personal development"],
        sources="Wish, clauses & conditionals",
        sections=r"""## 1. Wish / If only + regret

| Estructura | Ejemplo |
| :--- | :--- |
| **wish / if only + past perfect** | I **wish I had joined** the gym. |
| **wish + could** (presente) | I **wish we could afford** a membership. |
| **regret + gerund** | They **regret eating** so much junk food. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-1/wish-had.mp3" title="🔊 wish had"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-1/wish-could.mp3" title="🔊 wish could"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-1/if-only.mp3" title="🔊 if only"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-1/regret-gerund.mp3" title="🔊 regret gerund"></audio>

---

## 2. Participle clauses

![Participle clauses](/blog/curso-b2/unit-1/participle-clauses.png)

| Tipo | Ejemplo |
| :--- | :--- |
| **-ed** (pasiva) | **Encouraged by** the crowd, the runner crossed the line. |
| **Having + pp** | **Having finished** the workout, he felt exhausted. |
| **-ing** (activa) | **Motivated by** the results, he increased his training. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-1/participle-ed.mp3" title="🔊 participle -ed"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-1/having-finished.mp3" title="🔊 having finished"></audio>

---

## 3. Mixed conditionals

![Mixed conditionals](/blog/curso-b2/unit-1/mixed-conditionals.png)

> If he **had taken** the medicine, he **would feel** better **now**.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-1/mixed-cond.mp3" title="🔊 mixed conditional"></audio>

Pasado irreal → consecuencia **presente**: *had + pp* en la *if*-clause, *would + infinitive* en el resultado.

---

## 4. Vocabulario: Personal development

![Personal development](/blog/curso-b2/unit-1/personal-dev-vocab.png)

| Word | Idea |
| :--- | :--- |
| goal / motivation | objetivo / motivación |
| self-discipline / habit | autodisciplina / hábito |
| resilience / wellbeing | resiliencia / bienestar |

---

## 5. Reading

> I wish I had joined the gym when I had the chance. If only she had followed the doctor's advice. Encouraged by the crowd, the runner crossed the line. Having finished the workout, he felt exhausted. If he had taken the medicine, he would feel better now.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-1/reading-u1.mp3" title="🔊 Reading"></audio>

---

## 6. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-1/dialogue-u1.mp3" title="🔊 Dialogue"></audio>

> Do you regret skipping breakfast? — Yes, I regret eating so fast.  
> Wish you had warned me? — I wish I had told you about the allergy.

---

## 7. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-1/practice-u1.mp3" title="🔊 Practice"></audio>

---

## 8. Ejercicios

1. I wish I ___ (join) the gym earlier.  
2. If only she ___ (follow) the advice.  
3. ___ by the crowd, he crossed the line. (Encourage)  
4. ___ finished the workout, he rested. (Have)  
5. If he had rested, he ___ (feel) better now.

<details><summary>Ver solución</summary>

1. **had joined** · 2. **had followed** · 3. **Encouraged** · 4. **Having** · 5. **would feel**
</details>""",
        tip="*Wish + past perfect* no es pasado narrativo: expresa un deseo sobre algo que **ya no puedes cambiar**.",
        next_course="[Unidad 2 — Future tenses & Work](/curso-b2/unit-2)",
        next_blog="[U2 — Future tenses + work](/blog/curso-b2/unidad-2-future-tenses-work)",
        guides=["[Inglés B2](/blog/metodos/ingles-b2)", "[Gramática B1](/blog/gramatica/gramatica-ingles-b1-guia)"],
    ))

    write_md("unidad-2-future-tenses-work.md", article(
        slug="unidad-2-future-tenses-work", unit=2,
        title="Future Tenses B2: Will, Going to & Future Perfect + Work",
        description="Aprende will, going to y future perfect en inglés B2 con vocabulario de work. Guía Unidad 2 con audios y ejemplos.",
        image="/blog/curso-b2/unit-2/future-tenses.png", alt="Future tenses B2 work",
        keywords=["future perfect B2", "will going to English", "future tenses work", "inglés B2 unidad 2", "ejercicios inglés B2 gratis"],
        related=["unidad-1-repaso-b1-b2", "unidad-3-gerund-infinitive-education", HUB],
        faqs=[("¿Cuándo future perfect?", "Con **by / by the time + futuro**: By June I **will have finished**."), ("¿Will vs going to?", "**Will** = promesa/decisión espontánea. **Going to** = plan o predicción con evidencia."), ("¿Present continuous para futuro?", "Planes fijos: We **are having** a meeting tomorrow."), ("¿Dónde practico?", "En la [Unidad 2 del curso B2](/curso-b2/unit-2).")],
        excerpt="Guía de la Unidad 2 del curso B2: will, going to, future perfect y vocabulario de work.",
        intro="Tras el [Repaso B1 → B2](/blog/curso-b2/unidad-1-repaso-b1-b2), la **Unidad 2** contrasta **will**, **going to** y **future perfect** con vocabulario de **work**.",
        before="[U1 — Repaso B1 → B2](/blog/curso-b2/unidad-1-repaso-b1-b2)",
        learn=["**will** (promesas, predicciones)", "**going to** (planes, evidencia)", "**future perfect** (will have + pp)", "**present continuous** para planes fijos", "Vocabulario: work"],
        sources="Future tenses",
        sections=r"""## 1. Will / going to / future perfect

| Tiempo | Uso | Ejemplo |
| :--- | :--- | :--- |
| **will** | promesa / predicción | I **will let** you know. |
| **going to** | plan / evidencia | It **is going to** rain. |
| **future perfect** | completado antes de un momento futuro | By next month I **will have completed** the project. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-2/will-let.mp3" title="🔊 will"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-2/going-to-rain.mp3" title="🔊 going to"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-2/future-perfect.mp3" title="🔊 future perfect"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-2/will-promise.mp3" title="🔊 promise"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-2/present-continuous.mp3" title="🔊 present continuous future"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-2/by-2028.mp3" title="🔊 by 2028"></audio>

> **By 2028** he **will have spent** twenty years in the company.

---

## 3. Vocabulario: Work

![Work vocabulary](/blog/curso-b2/unit-2/work-vocab.png)

| Word | Idea |
| :--- | :--- |
| colleague / deadline | compañero / fecha límite |
| promotion / overtime | ascenso / horas extra |
| interview / workload | entrevista / carga de trabajo |

---

## 4. Reading

![At work](/blog/curso-b2/unit-2/work-scene.png)

> By next month I will have completed the project. I will let you know as soon as I get the offer. It is going to rain soon. We are having a meeting tomorrow at nine.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-2/reading-u2.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-2/dialogue-u2.mp3" title="🔊 Dialogue"></audio>

> Finished by June? — Yes, I will have completed it.  
> Meeting tomorrow? — Yes, we are having one at nine.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-2/practice-u2.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. By next month I ___ (complete) the project.  
2. I ___ let you know as soon as I hear.  
3. Look at the clouds — it ___ rain.  
4. We ___ a meeting tomorrow at nine.  
5. Vocab: compañero de trabajo = ___

<details><summary>Ver solución</summary>

1. **will have completed** · 2. **will** · 3. **is going to** · 4. **are having** · 5. **colleague**
</details>""",
        tip="Si ves **by / by the time**, piensa en **future perfect** (*will have + participio*).",
        next_course="[Unidad 3 — Gerund vs infinitive](/curso-b2/unit-3)",
        next_blog="[U3 — Gerund vs infinitive + education](/blog/curso-b2/unidad-3-gerund-infinitive-education)",
        guides=["[U1](/blog/curso-b2/unidad-1-repaso-b1-b2)", "[Inglés B2](/blog/metodos/ingles-b2)"],
    ))

    write_md("unidad-3-gerund-infinitive-education.md", article(
        slug="unidad-3-gerund-infinitive-education", unit=3,
        title="Gerund vs Infinitive B2 (1) + Education Vocabulary",
        description="Aprende gerundio vs infinitivo en inglés B2 con vocabulario de education. Guía Unidad 3 con audios y tablas.",
        image="/blog/curso-b2/unit-3/gerund-infinitive.png", alt="Gerund vs infinitive B2 education",
        keywords=["gerund infinitive B2", "enjoy mind avoid English", "education vocabulary B2", "inglés B2 unidad 3", "ejercicios inglés B2 gratis"],
        related=["unidad-2-future-tenses-work", "unidad-4-gerund-object-infinitive-leisure", HUB],
        faqs=[("¿Enjoy + gerund o infinitivo?", "**Enjoy + gerund**: I enjoy **attending** lectures."), ("¿Stop + -ing vs stop + to?", "**Stop + -ing** = dejar de hacer. **Stop + to** = parar con un propósito."), ("¿Mind + gerund?", "Sí: Would you **mind opening** the door?"), ("¿Dónde practico?", "En la [Unidad 3 del curso B2](/curso-b2/unit-3).")],
        excerpt="Guía de la Unidad 3 del curso B2: gerundio vs infinitivo (1) y vocabulario de education.",
        intro="Tras la [Unidad 2](/blog/curso-b2/unidad-2-future-tenses-work), la **Unidad 3** trabaja **gerund vs infinitive (1)** con vocabulario de **education**.",
        before="[U2 — Future tenses & work](/blog/curso-b2/unidad-2-future-tenses-work)",
        learn=["Verbos + **gerund** (enjoy, mind, avoid, stop)", "Verbos + **infinitive** (decide, agree, aim)", "Contraste **stop + -ing / stop + to**", "Vocabulario: education"],
        sources="Gerunds & infinitives",
        sections=r"""## 1. Gerund vs infinitive

| Patrón | Verbos | Ejemplo |
| :--- | :--- | :--- |
| **+ gerund** | enjoy, mind, avoid, stop (cease) | I **enjoy attending** lectures. |
| **+ infinitive** | decide, agree, aim, intend | She **decided to apply**. |
| **stop + -ing** | cesar | They **stopped procrastinating**. |
| **stop + to** | propósito | He stopped **to rest**. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-3/enjoy-gerund.mp3" title="🔊 enjoy gerund"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-3/decide-inf.mp3" title="🔊 decide infinitive"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-3/stop-gerund.mp3" title="🔊 stop gerund"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-3/mind-gerund.mp3" title="🔊 mind gerund"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-3/avoid-gerund.mp3" title="🔊 avoid gerund"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-3/agree-inf.mp3" title="🔊 agree infinitive"></audio>

---

## 3. Vocabulario: Education

![Education](/blog/curso-b2/unit-3/education-vocab.png)

| Word | Idea |
| :--- | :--- |
| degree / scholarship | título / beca |
| assignment / deadline | tarea / fecha límite |
| lecture / seminar | conferencia / seminario |

---

## 4. Reading

![At university](/blog/curso-b2/unit-3/education-scene.png)

> I enjoy attending lectures. She decided to apply for a scholarship. They stopped procrastinating. Would you mind opening the seminar room?

<audio controls preload="none" src="/audio/blog/curso-b2/unit-3/reading-u3.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-3/dialogue-u3.mp3" title="🔊 Dialogue"></audio>

> Do you enjoy studying? — I enjoy attending lectures.  
> Mind helping? — Would you mind opening the door?

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-3/practice-u3.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. I enjoy ___ (attend) lectures.  
2. She decided ___ (apply) for a scholarship.  
3. They stopped ___ (procrastinate).  
4. Would you mind ___ (open) the door?  
5. Vocab: beca = ___

<details><summary>Ver solución</summary>

1. **attending** · 2. **to apply** · 3. **procrastinating** · 4. **opening** · 5. **scholarship**
</details>""",
        tip="Aprende los verbos en bloques: *enjoy/mind/avoid + **-ing*** vs *decide/agree/aim + **to***.",
        next_course="[Unidad 4 — Gerund & object + infinitive](/curso-b2/unit-4)",
        next_blog="[U4 — Verb + object + infinitive + leisure](/blog/curso-b2/unidad-4-gerund-object-infinitive-leisure)",
        guides=["[U2](/blog/curso-b2/unidad-2-future-tenses-work)", "[Inglés B2](/blog/metodos/ingles-b2)"],
    ))

    write_md("unidad-4-gerund-object-infinitive-leisure.md", article(
        slug="unidad-4-gerund-object-infinitive-leisure", unit=4,
        title="Verb + Object + Infinitive B2 + Leisure Vocabulary",
        description="Aprende verb + object + infinitive (convince, tell, ask…) en inglés B2 con vocabulario de leisure. Guía Unidad 4 con audios.",
        image="/blog/curso-b2/unit-4/verb-object-inf.png", alt="Verb object infinitive B2 leisure",
        keywords=["verb object infinitive B2", "convince tell ask English", "leisure vocabulary B2", "inglés B2 unidad 4", "ejercicios inglés B2 gratis"],
        related=["unidad-3-gerund-infinitive-education", "unidad-5-repaso-1-4", HUB],
        faqs=[("¿Convince + to?", "**Convince + object + to + infinitive**: He **convinced me to join**."), ("¿Tell vs ask?", "**Tell** = orden/información. **Ask** = petición: She **asked me to wait**."), ("¿Want + object + to?", "Sí: She **wants me to take up** birdwatching."), ("¿Dónde practico?", "En la [Unidad 4 del curso B2](/curso-b2/unit-4).")],
        excerpt="Guía de la Unidad 4 del curso B2: verb + object + infinitive y vocabulario de leisure.",
        intro="Tras la [Unidad 3](/blog/curso-b2/unidad-3-gerund-infinitive-education), la **Unidad 4** presenta **verb + object + infinitive** con vocabulario de **leisure**.",
        before="[U3 — Gerund vs infinitive](/blog/curso-b2/unidad-3-gerund-infinitive-education)",
        learn=["**convince / persuade + obj + to**", "**tell / ask + obj + to**", "**want / would like + obj + to**", "**advise / allow + obj + to**", "Vocabulario: leisure"],
        sources="Verb patterns",
        sections=r"""## 1. Verb + object + infinitive

| Verbo | Ejemplo |
| :--- | :--- |
| **convince** | My friend **convinced me to join** the trip. |
| **tell** | The ranger **told us to stay** on the trail. |
| **ask** | I **asked her to wait** at the entrance. |
| **want** | She **wants me to take up** birdwatching. |
| **advise / allow** | He **advised me to avoid** feeding animals. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-4/convince-to.mp3" title="🔊 convince"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-4/tell-to.mp3" title="🔊 tell"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-4/ask-to.mp3" title="🔊 ask"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-4/want-to.mp3" title="🔊 want"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-4/advise-to.mp3" title="🔊 advise"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-4/invite-to.mp3" title="🔊 invite"></audio>

---

## 3. Vocabulario: Leisure

![Leisure](/blog/curso-b2/unit-4/leisure-vocab.png)

| Word | Idea |
| :--- | :--- |
| hobby / pastime | hobby / pasatiempo |
| take up / give up | empezar / dejar |
| unwind / hang out | relajarse / quedar |

---

## 4. Reading

![Leisure scene](/blog/curso-b2/unit-4/leisure-scene.png)

> My friend convinced me to join the birdwatching trip. The ranger told us to stay on the trail. They invited us to come volunteering with them.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-4/reading-u4.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-4/dialogue-u4.mp3" title="🔊 Dialogue"></audio>

> Join the trip? — My friend convinced me to.  
> Stay on the trail? — The ranger told us to.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-4/practice-u4.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. He convinced me ___ join the trip.  
2. The ranger told us ___ stay on the trail.  
3. I asked her ___ wait.  
4. She wants me ___ take up birdwatching.  
5. Vocab: pasatiempo = ___

<details><summary>Ver solución</summary>

1. **to** · 2. **to** · 3. **to** · 4. **to** · 5. **pastime** (o **hobby**)
</details>""",
        tip="Patrón fijo: **verbo + persona + to + infinitivo**. No omitas el *to* ni el objeto.",
        next_course="[Unidad 5 — Repaso 1–4](/curso-b2/unit-5)",
        next_blog="[U5 — Repaso 1–4](/blog/curso-b2/unidad-5-repaso-1-4)",
        guides=["[U3](/blog/curso-b2/unidad-3-gerund-infinitive-education)", "[Inglés B2](/blog/metodos/ingles-b2)"],
    ))

    write_md("unidad-5-repaso-1-4.md", article(
        slug="unidad-5-repaso-1-4", unit=5,
        title="Repaso B2 Unidades 1–4: Wish, Futures, Gerunds & Object + Inf",
        description="Repaso integrado B2: wish/regret, future perfect, gerund vs infinitive y verb + object + infinitive. Guía Unidad 5 con audios.",
        image="/blog/curso-b2/unit-5/review-map.png", alt="Repaso B2 unidades 1-4",
        keywords=["repaso B2 1-4", "wish review B2", "future perfect review", "gerund infinitive review", "inglés B2 unidad 5", "ejercicios inglés B2 gratis"],
        related=["unidad-4-gerund-object-infinitive-leisure", "unidad-1-repaso-b1-b2", HUB],
        faqs=[("¿Qué repasa la U5?", "Wish/regret, future tenses, gerund vs infinitive y verb + object + inf de U1–U4."), ("¿Cómo estudiar?", "Mapa + audios mixtos + ejercicios del curso."), ("¿Siguiente paso?", "Cuadernos de ejercicios U1–5 y teoría U6–10."), ("¿Dónde practico?", "En la [Unidad 5 del curso B2](/curso-b2/unit-5).")],
        excerpt="Guía de repaso de la Unidad 5 del curso B2 (contenidos 1–4).",
        intro="La **Unidad 5** integra [wish/participles](/blog/curso-b2/unidad-1-repaso-b1-b2), [future tenses](/blog/curso-b2/unidad-2-future-tenses-work), [gerund vs infinitive](/blog/curso-b2/unidad-3-gerund-infinitive-education) y [object + infinitive](/blog/curso-b2/unidad-4-gerund-object-infinitive-leisure).",
        before="[U4 — Verb + object + infinitive](/blog/curso-b2/unidad-4-gerund-object-infinitive-leisure)",
        learn=["Repaso **wish / if only / regret**", "Repaso **will / going to / future perfect**", "Repaso **gerund vs infinitive**", "Repaso **verb + object + to**"],
        sources="B2 review",
        sections=r"""## 1. Mapa del repaso

![Review map](/blog/curso-b2/unit-5/review-map.png)

| Unidad | Foco |
| :--- | :--- |
| 1 | Wish/regret, participle clauses, mixed conditionals |
| 2 | Will, going to, future perfect + work |
| 3 | Gerund vs infinitive + education |
| 4 | Verb + object + infinitive + leisure |

---

## 2. Ejemplos mixtos

![Mixed](/blog/curso-b2/unit-5/review-examples.png)

> I **wish I had joined** the gym earlier.  
> **By June** she **will have finished** the course.  
> I **enjoy attending** seminars.  
> They **asked us to keep** quiet.  
> If he **had rested**, he **would feel** better now.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-5/review-wish.mp3" title="🔊 wish"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-5/review-future.mp3" title="🔊 future perfect"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-5/review-gerund.mp3" title="🔊 gerund"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-5/review-object.mp3" title="🔊 object inf"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-5/review-mixed.mp3" title="🔊 mixed"></audio>

---

## 3. Reading mixto

> I wish I had joined the gym earlier. By June she will have finished the course. I enjoy attending seminars. They asked us to keep quiet. If he had rested, he would feel better now.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-5/reading-mix.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-5/dialogue-mix.mp3" title="🔊 Dialogue"></audio>

> Wish you had joined? — I wish I had.  
> Finished by June? — She will have finished.  
> Asked to be quiet? — They asked us to keep quiet.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-5/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios exprés

1. I wish I ___ (join) earlier.  
2. By June she ___ (finish) the course.  
3. I enjoy ___ (attend) seminars.  
4. They asked us ___ keep quiet.  
5. If he had rested, he ___ (feel) better.

<details><summary>Ver solución</summary>

1. **had joined** · 2. **will have finished** · 3. **attending** · 4. **to** · 5. **would feel**
</details>""",
        tip="Clasifica primero: ¿arrepentimiento (wish), futuro completado (will have), gerundio/infinitivo o patrón verbo+objeto+to?",
        next_course="[Unidad 6 — Wish / If only](/curso-b2/unit-6)",
        next_blog="Módulo 1 (U6–10) — próximamente",
        guides=["[U1](/blog/curso-b2/unidad-1-repaso-b1-b2)", "[U2](/blog/curso-b2/unidad-2-future-tenses-work)", "[U3](/blog/curso-b2/unidad-3-gerund-infinitive-education)", "[U4](/blog/curso-b2/unidad-4-gerund-object-infinitive-leisure)"],
    ))


def main():
    OUT_MD.mkdir(parents=True, exist_ok=True)
    diagrams(); make_audios(); make_articles(); print("done U01–05 theory")


if __name__ == "__main__":
    main()
