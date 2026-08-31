#!/usr/bin/env python3
"""Generate B2 theory U21–25: diagrams, markdown, TTS audios.

Module 3 start (Linkers + Phrasal verbs 1–2) after Module 2 repaso (U20).
Head commercial Bing keywords stay on hub /blog/temas/curso-ingles only.
Articles use level/topic long-tails.

Vocab themes follow live course lessons (src/lib/course/b2):
  U21 Personal Development · U22 Photography & Media · U23 Home & Living
  U24 Social Media & Networking · U25 Repaso 21–24
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
    # U21 contrast linkers
    img, d = canvas()
    title(d, "Linkers of contrast B2")
    boxes = [
        (48, "although", "+ subject + verb", "Although she was tired,"),
        (330, "despite", "+ noun / -ing", "Despite the setbacks,"),
        (612, "in spite of", "+ noun / -ing", "In spite of feeling low,"),
        (894, "whereas / however", "clause / new sentence", "… whereas he prefers…"),
    ]
    for x, h, a, b in boxes:
        card(d, (x, 120, x + 260, 560))
        d.text((x + 16, 150), h, fill=ACCENT, font=font(22, True))
        d.text((x + 16, 260), a, fill=INK, font=font(17))
        d.text((x + 16, 380), b, fill=INK, font=font(16))
    save(img, 21, "linkers-contrast.png")

    vocab_grid(
        21,
        "personal-development-vocab.png",
        "Personal development",
        [
            "workshop",
            "resilience",
            "milestone",
            "mentor",
            "growth mindset",
            "set a goal",
            "make progress",
            "step out of",
            "comfort zone",
            "keep learning",
            "warm-up",
            "get over",
        ],
    )

    img, d = canvas()
    title(d, "Contrast in personal development")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "Although she works on her goals every day, she still struggles.",
            "Despite the setbacks, the workshop went ahead.",
            "In spite of feeling discouraged, she attended the session.",
            "Meditation is calming, whereas goal-setting is more dynamic.",
            "He reads self-help books. However, he rarely applies the advice.",
        ]
    ):
        d.text((80, 150 + i * 80), f"• {t}", fill=INK, font=font(20))
    save(img, 21, "contrast-scene.png")

    # U22 reason / purpose / result
    img, d = canvas()
    title(d, "Reason · purpose · result")
    boxes = [
        (48, "because of / due to", "+ noun (reason)", "because of poor light"),
        (330, "in order to", "+ infinitive", "in order to avoid shake"),
        (612, "so that", "+ subject + verb", "so that she wouldn't miss"),
        (894, "as a result", "consequence", "As a result, we rescheduled."),
    ]
    for x, h, a, b in boxes:
        card(d, (x, 120, x + 260, 560))
        d.text((x + 14, 150), h, fill=ACCENT, font=font(18, True))
        d.text((x + 14, 280), a, fill=INK, font=font(17))
        d.text((x + 14, 400), b, fill=INK, font=font(16))
    save(img, 22, "linkers-reason-purpose.png")

    vocab_grid(
        22,
        "photography-vocab.png",
        "Photography & media",
        [
            "composition",
            "exposure",
            "crop",
            "lens",
            "blurry",
            "feed",
            "capture",
            "subject",
            "studio",
            "zoom",
            "background",
            "RAW",
        ],
    )

    img, d = canvas()
    title(d, "Photography in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "Many photos are blurry because of poor lighting.",
            "We use a tripod in order to avoid camera shake.",
            "She arrived early so that she wouldn't miss golden hour.",
            "The camera failed. As a result, we had to reschedule.",
            "Due to the new sensor, image quality has improved.",
        ]
    ):
        d.text((80, 150 + i * 80), f"• {t}", fill=INK, font=font(20))
    save(img, 22, "photography-scene.png")

    # U23 phrasal BE / BREAK / BRING
    img, d = canvas()
    title(d, "Phrasal verbs 1: BE · BREAK · BRING")
    rows = [
        ("BE", "be about to / be up to / be up for", "I was about to leave."),
        ("BREAK", "break down / break in / break out", "The boiler broke down."),
        ("BRING", "bring up / bring about / bring in", "She brought up the topic."),
    ]
    for i, (name, form, ex) in enumerate(rows):
        y = 110 + i * 170
        card(d, (48, y, 1150, y + 150))
        d.text((72, y + 28), name, fill=ACCENT, font=font(26, True))
        d.text((72, y + 70), form, fill=INK, font=font(20))
        d.text((72, y + 105), ex, fill=INK, font=font(18))
    save(img, 23, "phrasal-be-break-bring.png")

    vocab_grid(
        23,
        "home-living-vocab.png",
        "Home & living",
        [
            "redecorate",
            "renovate",
            "open-plan",
            "extension",
            "move in",
            "plumber",
            "tidy up",
            "settle in",
            "furnish",
            "leak",
            "designer",
            "pay off",
        ],
    )

    img, d = canvas()
    title(d, "Home & living in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "I was about to leave when the plumber arrived.",
            "The boiler broke down last winter.",
            "She brought up her children to value a tidy home.",
            "Thieves broke in during the night.",
            "The renovation brought about major changes.",
        ]
    ):
        d.text((80, 150 + i * 80), f"• {t}", fill=INK, font=font(20))
    save(img, 23, "home-scene.png")

    # U24 phrasal CALL / CARRY / COME
    img, d = canvas()
    title(d, "Phrasal verbs 2: CALL · CARRY · COME")
    rows = [
        ("CALL", "call off / call back / call for", "The livestream was called off."),
        ("CARRY", "carry on / carry out / carried away", "We carried on posting."),
        ("COME", "come across / come up with / come along", "I came across a profile."),
    ]
    for i, (name, form, ex) in enumerate(rows):
        y = 110 + i * 170
        card(d, (48, y, 1150, y + 150))
        d.text((72, y + 28), name, fill=ACCENT, font=font(26, True))
        d.text((72, y + 70), form, fill=INK, font=font(20))
        d.text((72, y + 105), ex, fill=INK, font=font(18))
    save(img, 24, "phrasal-call-carry-come.png")

    vocab_grid(
        24,
        "social-media-vocab.png",
        "Social media & networking",
        [
            "followers",
            "feed",
            "engagement",
            "story",
            "influencer",
            "livestream",
            "meetup",
            "hashtag",
            "viral",
            "trending",
            "troll",
            "network",
        ],
    )

    img, d = canvas()
    title(d, "Social media in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "The livestream was called off because of technical issues.",
            "Despite the trolls, we carried on posting.",
            "I came across an interesting photographer profile.",
            "She came up with a brilliant idea for the campaign.",
            "How is your campaign coming along?",
        ]
    ):
        d.text((80, 150 + i * 80), f"• {t}", fill=INK, font=font(20))
    save(img, 24, "social-scene.png")

    # U25 review map
    img, d = canvas()
    title(d, "Repaso U21–24")
    rows = [
        ("21", "Contrast linkers", "Personal development"),
        ("22", "Reason / purpose / result", "Photography & media"),
        ("23", "Phrasals BE / BREAK / BRING", "Home & living"),
        ("24", "Phrasals CALL / CARRY / COME", "Social media"),
    ]
    for i, (u, g, v) in enumerate(rows):
        col, row = i % 2, i // 2
        x, y = 48 + col * 570, 110 + row * 250
        card(d, (x, y, x + 530, y + 220))
        d.text((x + 24, y + 30), f"Unit {u}", fill=ACCENT, font=font(26, True))
        d.text((x + 24, y + 90), g, fill=INK, font=font(20))
        d.text((x + 24, y + 140), v, fill=INK, font=font(18))
    save(img, 25, "review-map.png")

    img, d = canvas()
    title(d, "Mixed examples U21–24")
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate(
        [
            "Although she was tired, she finished the workshop. (contrast)",
            "We used a tripod in order to capture a sharp image. (purpose)",
            "The boiler broke down; we brought in a plumber. (phrasals 1)",
            "The webinar was called off; she came up with a Plan B. (phrasals 2)",
            "Despite low engagement, they carried on posting stories.",
        ]
    ):
        d.text((80, 150 + i * 85), f"{i+1}. {t}", fill=INK, font=font(19))
    save(img, 25, "review-examples.png")


AUDIOS = {
    21: {
        "although-tired": "Although she works on her goals every day, she still struggles to achieve them.",
        "despite-setbacks": "Despite the setbacks, the workshop went ahead as planned.",
        "in-spite-of": "In spite of feeling discouraged, she attended the coaching session.",
        "whereas-contrast": "Meditation is calming, whereas goal-setting is more dynamic.",
        "however-advice": "He reads self-help books. However, he rarely applies the advice.",
        "reading-u21": (
            "Maya signed up for a personal development workshop last spring. Although she had little free time, "
            "she wanted to build resilience and set clearer goals. Despite early doubts, a mentor helped her "
            "step out of her comfort zone. She celebrated each milestone and kept a growth mindset. "
            "In spite of busy weeks, she made steady progress. Whereas some classmates quit, Maya stayed. "
            "However, she still reminds herself to practice what she learns every day."
        ),
        "dialogue-u21": (
            "Did you enjoy the workshop? Although it was intense, I loved it. "
            "Any setbacks? Despite a few, I made progress. "
            "Who helped you? My mentor. She pushed me out of my comfort zone. "
            "Still nervous? In spite of the nerves, I keep learning. "
            "Morning or evening goals? I prefer mornings, whereas my friend works at night. "
            "Good plan. However, remember to apply the advice."
        ),
        "practice-u21": "Although. Despite. In spite of. Whereas. However. Workshop. Resilience. Milestone. Mentor. Growth mindset.",
    },
    22: {
        "because-of-light": "Many photos are blurry because of poor lighting.",
        "due-to-storm": "The shoot was cancelled due to the storm.",
        "in-order-to": "We use a tripod in order to avoid camera shake.",
        "so-that": "She arrived early so that she wouldn't miss the golden hour.",
        "as-a-result": "The camera failed. As a result, we had to reschedule.",
        "reading-u22": (
            "Leo planned a city shoot at golden hour. Because of heavy traffic he almost arrived late, "
            "so he left earlier in order to reach the rooftop on time. He adjusted exposure carefully "
            "so that the skyline would not look overexposed. Due to a sudden cloud, a few frames were "
            "blurry. As a result, he cropped the best shot and posted it to his feed. The sharp composition "
            "with a clean background helped him capture more engagement than usual."
        ),
        "dialogue-u22": (
            "Why is this shot blurry? Because of the low light. "
            "Need a tripod? Yes, in order to avoid camera shake. "
            "Why so early? So that we don't miss golden hour. "
            "Card full? As a result, we deleted some files. "
            "New lens? Due to the new lens, sharpness improved. "
            "Ready to post? Crop first, then share to the feed."
        ),
        "practice-u22": "Because of. Due to. In order to. So that. As a result. Composition. Exposure. Crop. Lens. Blurry.",
    },
    23: {
        "about-to-leave": "I was about to leave the house when the plumber arrived.",
        "broke-down": "The boiler broke down last winter and we had no heating.",
        "brought-up": "She brought up her children to value a tidy home.",
        "broke-in": "Thieves broke in during the night and stole the television.",
        "brought-about": "The renovation brought about major changes in the house.",
        "reading-u23": (
            "When Sam was about to move in, the washing machine broke down. He brought in a plumber "
            "the same afternoon. Negotiations with the landlord almost broke down over the cost of an "
            "extension, but they finally agreed to renovate the kitchen into an open-plan space. "
            "Sam brought up the idea of redecorating the hallway too. A small fire scare broke out "
            "in the old fuse box, which brought about a full electrical check. After that, he could "
            "settle in, furnish the rooms and tidy up before guests arrived."
        ),
        "dialogue-u23": (
            "Ready to leave? I was about to when the plumber called. "
            "What happened? The boiler broke down again. "
            "Any news on the extension? Talks almost broke down, but we agreed. "
            "Who designed it? We brought in an interior designer. "
            "Kids help tidy? I brought them up to keep things organised. "
            "Feeling settled? Almost. Still furnishing the open-plan kitchen."
        ),
        "practice-u23": "Be about to. Be up to. Break down. Break in. Break out. Bring up. Bring about. Bring in. Redecorate. Renovate.",
    },
    24: {
        "called-off": "The livestream was called off because of technical issues.",
        "carried-on": "Despite the trolls, we carried on posting until we finished the campaign.",
        "came-across": "I came across an interesting profile of a photographer while scrolling the feed.",
        "came-up-with": "She came up with a brilliant idea for the campaign at the meeting.",
        "coming-along": "How is your campaign coming along? Are you getting engagement?",
        "reading-u24": (
            "Nora's team almost called off the product livestream after a server crash. Instead they "
            "carried out a quick backup plan and carried on with a shorter story sequence. While "
            "scrolling competitors' feeds, Nora came across a format that boosted engagement. She "
            "came up with a hashtag challenge for influencers and asked partners to call her back "
            "with availability. The situation called for calm messaging, not panic. By Friday the "
            "campaign was coming along well: followers shared the story and a few posts went viral."
        ),
        "dialogue-u24": (
            "Is the livestream still on? No, it was called off. "
            "What now? We carried on with stories instead. "
            "Any ideas? I came up with a hashtag challenge. "
            "Where did you see that format? I came across it on my feed. "
            "Need me? Please call me back after the meetup. "
            "How's engagement coming along? Better — fewer trolls today."
        ),
        "practice-u24": "Call off. Call back. Call for. Carry on. Carry out. Come across. Come up with. Come along. Followers. Engagement.",
    },
    25: {
        "review-although": "Although the workshop was full, she found a seat at the back.",
        "review-in-order": "They bought a new lens in order to improve sharpness.",
        "review-broke-down": "The removal van broke down on the way to the new house.",
        "review-called-off": "The webinar was called off due to low registration.",
        "review-came-up": "She came up with a plan despite low engagement on the feed.",
        "reading-mix": (
            "Although Maya felt nervous, she joined the workshop to build resilience. She used a "
            "tripod in order to capture sharp photos for her mentor's challenge. When the boiler "
            "broke down at home, she brought in a plumber and still carried on studying. Later her "
            "livestream was called off, but she came up with a story series that improved engagement. "
            "Despite the setbacks, she made progress and stepped further out of her comfort zone."
        ),
        "dialogue-mix": (
            "Tough week? Although it was hard, I made progress. "
            "Blurry shots? I used a tripod in order to fix exposure. "
            "Boiler again? It broke down; we brought in a plumber. "
            "Livestream? Called off — but I came up with a Plan B. "
            "Engagement? Coming along better on the feed. "
            "Next goal? Keep learning and celebrate the next milestone."
        ),
        "practice-mix": "Although. Despite. Because of. In order to. Break down. Bring in. Call off. Carry on. Come across. Come up with.",
    },
}


def tts():
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
    read_time = kw.get("readTime", "20 min")
    return f"""---
category: curso-b2
date: '{DATE}'
updatedDate: '{DATE}'
author: linguafly-team
title: "{kw["title"]}"
description: >-
  {kw["description"]}
readTime: {read_time}
keywords:
{keywords}
canonical: 'https://linguafly.app/blog/curso-b2/{kw["slug"]}'
image: {kw["image"]}
alt: "{kw["alt"]}"
related_routes:
{related}
faqs:
{faqs}
excerpt: >-
  {kw["excerpt"]}
---
{kw["intro"]}

> **Practica en el curso:** [Unidad {kw["unit"]}](/curso-b2/unit-{kw["unit"]})  
> **Cuaderno de ejercicios:** [Unidad {kw["unit"]} con soluciones](/blog/curso-b2/{kw["slug"]}-ejercicios-soluciones)  
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

## Resumen rápido

{kw["summary"]}

---

## Siguiente paso en el curso B2

{kw["next_block"]}

### Guías relacionadas

{guides}

---

## Fuentes

{kw["sources"]}
"""


def _ex_block(items: list[tuple[str, str]]) -> str:
    """Build numbered exercises with <details> solutions."""
    parts = []
    for i, (q, a) in enumerate(items, 1):
        parts.append(
            f"""### Ejercicio {i}

{q}

<details><summary>Ver solución</summary>

{a}
</details>"""
        )
    return "\n\n".join(parts)


def write_articles():
    write_md(
        "unidad-21-linkers-contrast-personal-development.md",
        article(
            slug="unidad-21-linkers-contrast-personal-development",
            unit=21,
            title="Linkers of Contrast B2: although, despite, whereas + Personal Development",
            description="Aprende linkers de contraste (although, despite, in spite of, whereas, however) en inglés B2 con vocabulario de personal development. Guía Unidad 21 con audios y ejercicios.",
            image="/blog/curso-b2/unit-21/linkers-contrast.png",
            alt="Linkers of contrast personal development B2",
            readTime="20 min",
            keywords=[
                "linkers of contrast B2",
                "although despite in spite of",
                "whereas however English",
                "personal development vocabulary B2",
                "inglés B2 unidad 21",
            ],
            related=[
                "unidad-21-linkers-contrast-personal-development-ejercicios-soluciones",
                "unidad-20-repaso-16-19",
                "unidad-22-linkers-reason-purpose-photography",
                HUB,
            ],
            faqs=[
                (
                    "¿Cuál es la diferencia entre although y despite?",
                    "**Although** va seguido de **sujeto + verbo** (*Although she was tired, she stayed*). **Despite** e **in spite of** van seguidos de **sustantivo, pronombre o -ing** (*Despite the setbacks*, *In spite of feeling nervous*). No digas *despite she was tired*: ahí necesitas *although* o *despite the fact that*.",
                ),
                (
                    "¿Despite e in spite of son intercambiables?",
                    "Sí, en la mayoría de contextos B2 significan lo mismo. *In spite of* es un poco más largo y formal en algunos textos, pero ambos aceptan **noun / pronoun / -ing**. Ejemplo: *Despite / In spite of her fear, she joined the workshop.*",
                ),
                (
                    "¿Dónde coloco however?",
                    "**However** suele ir al **inicio de una oración nueva** (o entre comas), contrastando con la frase anterior: *He reads self-help books. However, he rarely applies the advice.* No sustituye a *although* dentro de la misma cláusula (*Although he reads…*).",
                ),
                (
                    "¿Whereas o while?",
                    "**Whereas** (y a menudo *while*) contrasta dos hechos o preferencias en paralelo: *Meditation is calming, whereas goal-setting is more dynamic.* En B2 úsalo para comparar personas, hábitos o enfoques distintos sin implicar causa.",
                ),
                (
                    "¿Dónde practico la Unidad 21?",
                    "En la [Unidad 21 del curso B2](/curso-b2/unit-21) y en el [cuaderno de ejercicios con soluciones](/blog/curso-b2/unidad-21-linkers-contrast-personal-development-ejercicios-soluciones), aunque el cuaderno se publique más adelante.",
                ),
            ],
            excerpt="Guía de la Unidad 21 del curso B2: linkers de contraste y vocabulario de personal development.",
            intro="""Tras el [Repaso 16–19](/blog/curso-b2/unidad-20-repaso-16-19), el **Módulo 3 del curso B2** abre con la **Unidad 21**: aprenderás a unir ideas opuestas con naturalidad usando **although, despite, in spite of, whereas** y **however**, exactamente los *linkers of contrast* que aparecen en ensayos, emails formales y conversaciones de coaching.

Esta unidad no es solo una lista de conectores. Vas a ver **cuándo cada uno cambia la gramática que viene detrás** (cláusula completa frente a sustantivo o *-ing*), y lo practicarás con vocabulario real de **personal development**: *workshop, resilience, milestone, mentor, growth mindset, set a goal, make progress* y *step out of your comfort zone*. Si en B1 te bastaba con *but*, aquí das el salto a un contraste más preciso y más “escrito”, sin sonar forzado.

La clave de B2 es dejar de traducir palabra por palabra desde el español (*a pesar de que ella estaba cansada* → no *despite she was tired*). En las secciones siguientes desglosamos cada linker con tablas, ejemplos de desarrollo personal y audio para que el oído también registre el ritmo de estas frases.""",
            before="[U20 — Repaso 16–19](/blog/curso-b2/unidad-20-repaso-16-19)",
            learn=[
                "Usar **although + sujeto + verbo** para contrastar dentro de la misma frase",
                "Usar **despite / in spite of + noun / -ing** sin repetir el error *despite + clause*",
                "Contrastar dos ideas en paralelo con **whereas**",
                "Empezar una oración nueva de contraste con **however**",
                "Vocabulario B2 de **personal development** (12–16 ítems con ejemplos)",
                "Detectar errores típicos de hispanohablantes con estos conectores",
            ],
            sections=r"""## 1. Por qué importan los linkers de contraste en B2

En español resolvemos el contraste con *pero*, *aunque*, *sin embargo* o *a pesar de* casi de forma automática. En inglés B2 el problema no es “saber que existen” *although* y *despite*, sino **elegir la estructura correcta después del conector**. Un mismo significado (“a pesar de X”) se construye de forma distinta según uses *although* (cláusula) o *despite* (sintagma nominal / *-ing*).

Los examinadores y los lectores nativos notan al instante si mezclas las dos familias. Por eso esta unidad insiste en el mapa mental: **¿lo que viene después es una oración completa o un nombre/gerundio?** Si respondes bien a esa pregunta, el resto es vocabulario y práctica.

En contextos de *personal development* el contraste aparece todo el tiempo: quieres avanzar **aunque** estés cansado; celebras un *milestone* **a pesar de** los *setbacks*; prefieres un enfoque **mientras que** tu mentor recomienda otro. Dominar estos linkers te hace sonar más coherente en diarios de aprendizaje, essays y entrevistas.

![Linkers of contrast](/blog/curso-b2/unit-21/linkers-contrast.png)

---

## 2. Although: contraste con sujeto + verbo

**Although** (y su variante más formal *though* en muchos contextos) introduce una **cláusula concesiva**: *although + subject + verb*. Equivale a “aunque”. Puedes colocar la cláusula al inicio o al final.

| Posición | Ejemplo | Idea |
| :--- | :--- | :--- |
| Al inicio | **Although** she works on her goals every day, she still struggles. | Esfuerzo diario ≠ resultado fácil |
| Al final | She still struggles, **although** she works on her goals every day. | Mismo significado, otro ritmo |
| Con past | **Although** he had little experience, he felt surprisingly confident. | Poca experiencia ≠ seguridad |

Audio:

<audio controls preload="none" src="/audio/blog/curso-b2/unit-21/although-tired.mp3" title="🔊 although"></audio>

Observa que después de *although* **no** usamos *but* en la misma oración (*Although she was tired, but she stayed* es incorrecto). El contraste ya está en *although*; la segunda parte va directa: *Although she was tired, she stayed.*

También existe la forma más explícita *although / even though*, donde *even though* refuerza la sorpresa del contraste. En B2 ambas son útiles; *even though* suena un poco más enfático en habla.

### Mini-práctica mental

Piensa en tu última semana de estudio: *Although I was busy, I reviewed my notes.* Si puedes completar la segunda mitad sin repetir *but*, vas por buen camino.

---

## 3. Despite e in spite of: noun, pronoun o -ing

**Despite** e **in spite of** significan “a pesar de”, pero **no** van seguidos de sujeto + verbo (salvo en la fórmula larga *despite the fact that*). Lo habitual en B2 es:

| Estructura | Ejemplo |
| :--- | :--- |
| despite + noun | **Despite** the setbacks, the workshop went ahead. |
| despite + -ing | **Despite** feeling nervous, she spoke up. |
| in spite of + noun | **In spite of** her fear of failure, she kept learning. |
| in spite of + -ing | **In spite of** feeling discouraged, she attended the session. |
| despite the fact that + clause | **Despite the fact that** the room was full, she found a seat. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-21/despite-setbacks.mp3" title="🔊 despite"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-21/in-spite-of.mp3" title="🔊 in spite of"></audio>

El error clásico del hispanohablante es calcar *a pesar de que* → *despite that she…* o *despite she…*. Corrige siempre hacia *although she…* o *despite her tiredness / despite being tired / despite the fact that she was tired*.

¿Hay diferencia fuerte entre *despite* e *in spite of*? En la práctica B2 del curso, **trátalos como equivalentes**. *In spite of* ocupa más espacio en la frase; *despite* es más compacto en writing. Ambos aparecen en el temario oficial de la Unidad 21.

---

## 4. Whereas: contraste en paralelo

**Whereas** compara dos realidades o preferencias, a menudo “A hace X, **mientras que** B hace Y”. No expresa tanto “obstáculo vs resultado” como *although*, sino **dos perfiles distintos**.

| Uso | Ejemplo |
| :--- | :--- |
| Hábitos | Meditation is calming, **whereas** goal-setting is more dynamic. |
| Personas | She prefers morning routines, **whereas** her colleague works best at night. |
| Beneficios | Reading builds knowledge, **whereas** practising builds skills. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-21/whereas-contrast.mp3" title="🔊 whereas"></audio>

En muchos textos también verás *while* con el mismo valor contrastivo. En el curso B2 priorizamos *whereas* porque fuerza el matiz de contraste (frente a *while* temporal). Si dudas, pregunta: ¿estoy **comparando dos cosas** o **concediendo un obstáculo**? Comparación → *whereas*; obstáculo → *although / despite*.

---

## 5. However: contraste entre oraciones

**However** enlaza **dos oraciones** (o dos ideas separadas por punto / punto y coma). No “abre” una cláusula subordinada como *although*.

> He reads self-help books. **However**, he rarely applies the advice.  
> The plan was ambitious. **However**, she stuck to it for three months.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-21/however-advice.mp3" title="🔊 however"></audio>

Puedes colocar *however* también tras el sujeto (*She, however, refused to quit*), pero en B2 lo más seguro es **inicio de frase + coma**. Evita *However she was tired, she stayed* cuando en realidad quieres *Although she was tired…*.

### Mapa rápido de decisión

1. ¿Necesito sujeto + verbo justo después? → **although**  
2. ¿Tengo un noun / -ing? → **despite / in spite of**  
3. ¿Comparo dos lados en paralelo? → **whereas**  
4. ¿Empiezo frase nueva tras un punto? → **however**

---

## 6. Vocabulario: Personal development

![Personal development vocabulary](/blog/curso-b2/unit-21/personal-development-vocab.png)

| Word / phrase | Significado | Ejemplo |
| :--- | :--- | :--- |
| **workshop** | taller formativo | She joined a weekend **workshop** on goal-setting. |
| **resilience** | resiliencia | Building **resilience** helps you recover from setbacks. |
| **milestone** | hito / logro intermedio | Finishing module 2 was a real **milestone**. |
| **mentor** | mentor/a | Her **mentor** challenged her kindly but firmly. |
| **growth mindset** | mentalidad de crecimiento | A **growth mindset** treats mistakes as data. |
| **set a goal** | fijar una meta | First, **set a goal** you can measure. |
| **make progress** | avanzar / progresar | She didn't win yet, but she **made progress**. |
| **step out of (your) comfort zone** | salir de la zona de confort | Public speaking made her **step out of her comfort zone**. |
| **keep learning** | seguir aprendiendo | The best students **keep learning** after class. |
| **get over** | superar (emocional) | It took weeks to **get over** the fear of failure. |
| **warm-up** | actividad previa / calentamiento | The coach started with a short **warm-up** task. |
| **work on** | trabajar en / mejorar | He needs to **work on** his listening habits. |
| **build up** | acumular / fortalecer | She **built up** confidence session by session. |
| **personal development** | desarrollo personal | The course mixes grammar with **personal development**. |

Usa estas palabras *dentro* de frases con linkers: *Despite slow progress, she kept a growth mindset.* Así memorizas vocabulario y gramática a la vez.

---

## 7. Reading: Maya at the workshop

![Contrast in personal development](/blog/curso-b2/unit-21/contrast-scene.png)

> Maya signed up for a personal development workshop last spring. Although she had little free time, she wanted to build resilience and set clearer goals. Despite early doubts, a mentor helped her step out of her comfort zone. She celebrated each milestone and kept a growth mindset. In spite of busy weeks, she made steady progress. Whereas some classmates quit, Maya stayed. However, she still reminds herself to practice what she learns every day.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-21/reading-u21.mp3" title="🔊 Reading"></audio>

**Comprensión rápida:** ¿Qué contraste marca *whereas*? ¿Qué estructura sigue a *despite*? ¿Qué hace *however* al final del párrafo?

---

## 8. Diálogo: After the coaching session

<audio controls preload="none" src="/audio/blog/curso-b2/unit-21/dialogue-u21.mp3" title="🔊 Dialogue"></audio>

> **A:** Did you enjoy the workshop?  
> **B:** Although it was intense, I loved it.  
> **A:** Any setbacks?  
> **B:** Despite a few, I made progress.  
> **A:** Who helped you?  
> **B:** My mentor. She pushed me out of my comfort zone.  
> **A:** Still nervous?  
> **B:** In spite of the nerves, I keep learning.  
> **A:** Morning or evening goals?  
> **B:** I prefer mornings, whereas my friend works at night.  
> **A:** Good plan. However, remember to apply the advice.  
> **B:** True — that's my next milestone.

Lee el diálogo en voz alta dos veces: una mirando el texto y otra solo con el audio.

---

## 9. Errores típicos de hispanohablantes

| Incorrecto | Por qué falla | Correcto |
| :--- | :--- | :--- |
| *Despite she was tired, …* | *despite* no lleva cláusula directa | **Although** she was tired… / **Despite being** tired… |
| *Although the setbacks, …* | *although* necesita sujeto + verbo | **Despite** the setbacks… |
| *Although she was tired, but she stayed.* | doble contraste | **Although** she was tired, she stayed. |
| *However she was busy, she studied.* | *however* no sustituye a *although* | **Although** she was busy, she studied. |
| *In spite of she felt nervous…* | falta noun/-ing | **In spite of feeling** nervous… |
| *Whereas he was late, but…* | no combines *whereas* + *but* | **Whereas** he prefers nights, she prefers mornings. |

---

## 10. Plan de práctica (12–15 minutos)

1. **3 min — Mapa:** escribe en un papel las cuatro reglas (*although / despite / whereas / however*).  
2. **4 min — Transforma:** toma 4 frases con *but* y reescríbelas con un linker distinto cada vez.  
3. **3 min — Audio:** escucha el reading y marca cada conector.  
4. **3–5 min — Produce:** escribe 5 frases sobre tus metas usando el vocabulario de la unidad.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-21/practice-u21.mp3" title="🔊 Practice cues"></audio>

### Checklist

- [ ] Sé cuándo usar cláusula vs noun/-ing  
- [ ] Distingo *whereas* (paralelo) de *although* (concesión)  
- [ ] Coloco *however* en frase nueva  
- [ ] Puedo usar 8+ palabras de personal development en contexto  

---

## 11. Ejercicios prácticos (con soluciones)

""" + _ex_block([
                (
                    "Completa: ______ she works on her goals every day, she still struggles.\n\nOpciones: Although / Despite / Because of",
                    "**Although** (necesita sujeto + verbo: *she works*).",
                ),
                (
                    "Completa: ______ the setbacks, the workshop went ahead.\n\nOpciones: Although / Despite / Whereas",
                    "**Despite** (+ noun *the setbacks*). También valdría *In spite of*.",
                ),
                (
                    "Completa: Meditation is calming, ______ goal-setting is more dynamic.",
                    "**whereas** (contraste en paralelo).",
                ),
                (
                    "Corrige: *Despite she felt discouraged, she attended the session.*",
                    "**In spite of / Despite feeling discouraged…** o **Although she felt discouraged…**",
                ),
                (
                    "Une con *however*: *He reads self-help books. He rarely applies the advice.*",
                    "He reads self-help books. **However**, he rarely applies the advice.",
                ),
                (
                    "Vocabulario: persona que guía tu crecimiento = ______",
                    "**mentor**",
                ),
                (
                    "Traduce: *A pesar de su miedo al fracaso, continuó aprendiendo.*",
                    "**In spite of / Despite her fear of failure, she continued / kept learning.**",
                ),
                (
                    "Reading: ¿Qué ayudó a Maya a salir de su zona de confort?",
                    "Un **mentor** la ayudó a *step out of her comfort zone*.",
                ),
                (
                    "Elige la mejor opción: *She prefers mornings, ______ her colleague works at night.*\n\n(a) however (b) whereas (c) despite",
                    "**(b) whereas**",
                ),
                (
                    "Escribe 2 frases: una con *although* y otra con *despite* sobre un *milestone* tuyo.",
                    "Ejemplo: **Although** the exam was hard, I passed. / **Despite** the pressure, I celebrated the milestone.",
                ),
            ]) + """

---

## Pronunciación útil

- *although* → /ɔːlˈðəʊ/ (la *th* sonora)  
- *despite* → /dɪˈspaɪt/  
- *whereas* → /weərˈæz/  
- *resilience* → /rɪˈzɪliəns/  
- *milestone* → /ˈmaɪlstəʊn/""",
            tip="Antes de escribir el conector, mira **qué viene después**. Si es sujeto + verbo → *although*. Si es noun o -ing → *despite / in spite of*. Si empiezas frase nueva → *however*. Si comparas dos perfiles → *whereas*. Ese filtro de cuatro preguntas evita el 80 % de los errores de hispanohablantes en esta unidad.",
            summary="""| Linker | Va con… | Ejemplo corto |
| :--- | :--- | :--- |
| **although** | subject + verb | Although she was tired… |
| **despite / in spite of** | noun / -ing | Despite the setbacks… |
| **whereas** | contraste paralelo | … whereas he prefers nights |
| **however** | nueva oración | However, she stayed. |""",
            next_block="""En la **Unidad 22** pasarás de contraste a **razón, propósito y resultado** (*because of, due to, in order to, so that, as a result*) con vocabulario de **photography & media**.

Practica ahora:

- [Ejercicios Unidad 21 B2 (con soluciones)](/blog/curso-b2/unidad-21-linkers-contrast-personal-development-ejercicios-soluciones)
- [Unidad 21 del curso B2](/curso-b2/unit-21)

Guía siguiente: [U22 — Linkers reason/purpose + photography](/blog/curso-b2/unidad-22-linkers-reason-purpose-photography)""",
            guides=[
                "[U20 Repaso 16–19](/blog/curso-b2/unidad-20-repaso-16-19)",
                "[U22 Reason & purpose](/blog/curso-b2/unidad-22-linkers-reason-purpose-photography)",
                "[Inglés B2](/blog/metodos/ingles-b2)",
            ],
            sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Contrasting ideas (B1–B2): https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar
- Cambridge Dictionary — Although, though, even though / Despite, in spite of: https://dictionary.cambridge.org/grammar/british-grammar/""",
        ),
    )

    write_md(
        "unidad-22-linkers-reason-purpose-photography.md",
        article(
            slug="unidad-22-linkers-reason-purpose-photography",
            unit=22,
            title="Linkers of Reason & Purpose B2 + Photography & Media",
            description="Aprende because of, due to, in order to, so that y as a result en inglés B2 con vocabulario de photography & media. Guía Unidad 22 con audios y ejercicios.",
            image="/blog/curso-b2/unit-22/linkers-reason-purpose.png",
            alt="Linkers reason purpose photography B2",
            readTime="21 min",
            keywords=[
                "linkers reason purpose B2",
                "because of due to in order to",
                "so that as a result",
                "photography vocabulary B2",
                "inglés B2 unidad 22",
            ],
            related=[
                "unidad-22-linkers-reason-purpose-photography-ejercicios-soluciones",
                "unidad-21-linkers-contrast-personal-development",
                "unidad-23-phrasal-verbs-1-home-living",
                HUB,
            ],
            faqs=[
                (
                    "¿Because of o due to?",
                    "Ambos van con **sustantivo** para expresar causa: *because of poor lighting*, *due to the storm*. *Due to* es algo más formal y aparece mucho en avisos y reportes. Evita *because of she arrived late* → usa *because she arrived late* (con cláusula) o *because of her late arrival*.",
                ),
                (
                    "¿In order to o so that?",
                    "**In order to + infinitive** cuando el sujeto es el mismo (*We use a tripod **in order to** avoid shake*). **So that + subject + verb** cuando quieres dejar el sujeto explícito o usar un modal (*She arrived early **so that she wouldn't** miss golden hour*).",
                ),
                (
                    "¿As a result dónde se coloca?",
                    "Normalmente al **inicio de la oración de consecuencia**, tras explicar la causa: *The camera failed. **As a result**, we had to reschedule.* También: *… failed; as a result, …*.",
                ),
                (
                    "¿Because y because of son iguales?",
                    "No. **Because + clause** (*because the light was poor*). **Because of + noun** (*because of poor light*). Mezclarlos es uno de los errores más frecuentes en B1–B2.",
                ),
                (
                    "¿Dónde practico la Unidad 22?",
                    "En la [Unidad 22 del curso B2](/curso-b2/unit-22) y en el [cuaderno de ejercicios](/blog/curso-b2/unidad-22-linkers-reason-purpose-photography-ejercicios-soluciones).",
                ),
            ],
            excerpt="Guía de la Unidad 22 del curso B2: linkers de razón, propósito y resultado con photography & media.",
            intro="""Después de los [linkers de contraste](/blog/curso-b2/unidad-21-linkers-contrast-personal-development), la **Unidad 22** te enseña a explicar **por qué** ocurre algo, **para qué** lo haces y **qué consecuencia** tiene. Los conectores del temario oficial son **because of, due to, in order to, so that** y **as a result**, y los practicarás en un contexto muy visual: **photography & media**.

Hablar de fotos es perfecto para esta gramática: *blurry shots because of poor lighting*, *a tripod in order to avoid shake*, *arrive early so that you don't miss golden hour*, *the camera failed; as a result, we rescheduled*. Si dominas el mapa **razón → propósito → resultado**, tus descripciones, captions y emails técnicos ganan claridad inmediata.

Como en la unidad anterior, el peligro no es memorizar la lista, sino **acoplar bien la cola gramatical**: noun tras *because of/due to*, infinitivo tras *in order to*, cláusula tras *so that*. Las secciones siguientes lo desglosan con tablas, vocabulario de composición/exposición y audios.""",
            before="[U21 — Linkers contrast & personal development](/blog/curso-b2/unidad-21-linkers-contrast-personal-development)",
            learn=[
                "Expresar **causa** con **because of / due to + noun**",
                "Expresar **propósito** con **in order to + infinitive**",
                "Expresar **propósito con cláusula** con **so that + subject (+ modal)**",
                "Marcar **consecuencia** con **as a result**",
                "Vocabulario B2 de **photography & media**",
                "Evitar el cruce *because* vs *because of* y *to* vs *so that*",
            ],
            sections=r"""## 1. Tres trabajos distintos: razón, propósito, resultado

Antes de memorizar conectores, separa la **función**:

| Función | Pregunta | Linkers de esta unidad |
| :--- | :--- | :--- |
| **Razón / causa** | ¿Por qué pasó? | because of, due to |
| **Propósito** | ¿Para qué lo hago? | in order to, so that |
| **Resultado** | ¿Qué pasó después? | as a result |

En español a veces usamos *para* tanto para propósito como para consecuencia vaga; en inglés B2 conviene ser explícito. *In order to* mira **hacia delante** (intención). *As a result* mira **hacia atrás** (efecto ya ocurrido).

![Reason purpose result](/blog/curso-b2/unit-22/linkers-reason-purpose.png)

---

## 2. Because of y due to: causa + sustantivo

Ambos introducen la **causa** mediante un **sintagma nominal** (no una cláusula completa).

| Linker | Ejemplo fotografía |
| :--- | :--- |
| because of | Many photos are blurry **because of** poor lighting. |
| due to | The shoot was cancelled **due to** the storm. |
| due to | **Due to** the low light, the shots were underexposed. |
| because of | **Because of** heavy overexposure, the image was unusable. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-22/because-of-light.mp3" title="🔊 because of"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-22/due-to-storm.mp3" title="🔊 due to"></audio>

### Because vs because of

- **Because + subject + verb:** *The photo is blurry **because** the light was poor.*  
- **Because of + noun:** *The photo is blurry **because of** poor light.*

*Due to* se comporta como *because of* en el uso del curso (*due to + noun*). En writing formal de fotografía o producción, *due to* queda muy natural en avisos: *Due to technical issues, the livestream is delayed.*

---

## 3. In order to: propósito con el mismo sujeto

**In order to + infinitive** expresa intención. El sujeto de la oración principal es quien realiza el propósito.

> We use a tripod **in order to** avoid camera shake.  
> They bought a new lens **in order to** improve sharpness.  
> We use RAW format **in order to** preserve more detail.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-22/in-order-to.mp3" title="🔊 in order to"></audio>

En habla informal a menudo se reduce a **to** (*We use a tripod **to** avoid shake*). En B2, *in order to* es útil cuando quieres sonar claro y un poco más explícito, sobre todo en writing.

Negación: *in order **not** to* + infinitive → *He lowered the ISO in order not to add noise.*

---

## 4. So that: propósito con cláusula (y a menudo un modal)

Usa **so that** cuando quieres **sujeto (+ will/can/would/couldn't…)** en la cláusula de propósito.

| Ejemplo | Matiz |
| :--- | :--- |
| She arrived early **so that she wouldn't** miss the golden hour. | Evitar un problema futuro |
| He spoke slowly **so that everyone could** understand. | Facilitar comprensión |
| She took notes **so that she wouldn't** forget the settings. | Memoria / precisión |
| We need to act now **so that** future generations can enjoy archived footage. | Propósito a largo plazo |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-22/so-that.mp3" title="🔊 so that"></audio>

Truco: si tras el conector necesitas **otro sujeto** o un **modal de posibilidad/evitación**, *so that* suele ser mejor que *in order to*.

---

## 5. As a result: la consecuencia

**As a result** introduce el **efecto**. Suele ir después de una oración que explica la causa.

> The camera failed. **As a result**, we had to reschedule.  
> The memory card was full. **As a result**, we had to delete some files.  
> The project failed. **As a result**, the team was disbanded.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-22/as-a-result.mp3" title="🔊 as a result"></audio>

No confundas *as a result* (consecuencia) con *in order to* (intención). Si aún no ha pasado y es tu plan, no uses *as a result*.

---

## 6. Vocabulario: Photography & media

![Photography vocabulary](/blog/curso-b2/unit-22/photography-vocab.png)

| Word | Idea | Ejemplo |
| :--- | :--- | :--- |
| **composition** | composición | Strong **composition** guides the eye. |
| **exposure** | exposición | Check **exposure** before you shoot. |
| **crop** | recortar | **Crop** the edges to clean the frame. |
| **lens** | objetivo / lente | A new **lens** improved sharpness. |
| **blurry** | borroso/a | The shot looks **blurry** in low light. |
| **feed** | feed (red social) | She posted the photo to her **feed**. |
| **capture** | capturar | He wanted to **capture** the skyline. |
| **subject** | sujeto (de la foto) | Keep the **subject** in focus. |
| **studio** | estudio | They booked a small **studio**. |
| **zoom** | zoom | Don't **zoom** digitally if you can walk closer. |
| **background** | fondo | A clean **background** helps the subject. |
| **RAW** | formato RAW | Shoot in **RAW** to preserve detail. |
| **overexposed** | sobreexpuesto | The sky was **overexposed**. |
| **sharp** | nítido | The final image looks **sharp**. |

Combínalos con linkers: *Because of a busy background, the subject was hard to see. She cropped the frame in order to simplify the composition.*

---

## 7. Reading: Leo's golden-hour shoot

![Photography in context](/blog/curso-b2/unit-22/photography-scene.png)

> Leo planned a city shoot at golden hour. Because of heavy traffic he almost arrived late, so he left earlier in order to reach the rooftop on time. He adjusted exposure carefully so that the skyline would not look overexposed. Due to a sudden cloud, a few frames were blurry. As a result, he cropped the best shot and posted it to his feed. The sharp composition with a clean background helped him capture more engagement than usual.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-22/reading-u22.mp3" title="🔊 Reading"></audio>

Marca en el texto: 1 causa con *because of*, 1 con *due to*, 1 propósito con *in order to*, 1 con *so that*, 1 resultado con *as a result*.

---

## 8. Diálogo: On the rooftop

<audio controls preload="none" src="/audio/blog/curso-b2/unit-22/dialogue-u22.mp3" title="🔊 Dialogue"></audio>

> **A:** Why is this shot blurry?  
> **B:** Because of the low light.  
> **A:** Need a tripod?  
> **B:** Yes, in order to avoid camera shake.  
> **A:** Why so early?  
> **B:** So that we don't miss golden hour.  
> **A:** Card full?  
> **B:** As a result, we deleted some files.  
> **A:** New lens?  
> **B:** Due to the new lens, sharpness improved.  
> **A:** Ready to post?  
> **B:** Crop first, then share to the feed.

---

## 9. Errores típicos de hispanohablantes

| Incorrecto | Problema | Correcto |
| :--- | :--- | :--- |
| *Because of she was late…* | *because of* + clause | **Because** she was late… / **Because of** her delay… |
| *Due to he forgot the lens…* | igual | **Because** he forgot the lens… |
| *We arrived early in order to we catch the light.* | *in order to* + clause | … **in order to catch** the light / … **so that we could catch**… |
| *She adjusted settings as a result to save the shot.* | mezcla resultado/propósito | … **in order to** save the shot. |
| *So that avoid shake, we used a tripod.* | falta sujeto tras *so that* | We used a tripod **so that we could** avoid shake. / … **in order to** avoid shake. |

---

## 10. Plan de práctica (10–15 minutos)

1. **3 min:** clasifica 6 frases tuyas en razón / propósito / resultado.  
2. **4 min:** reescribe 3 causas con *because of* y 3 propósitos con *in order to* o *so that*.  
3. **3 min:** escucha el reading y anota los cinco linkers.  
4. **3–5 min:** describe una foto tuya en 80–100 palabras usando al menos cuatro conectores y seis palabras del vocabulario.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-22/practice-u22.mp3" title="🔊 Practice cues"></audio>

### Checklist

- [ ] Distingo *because* (cláusula) y *because of* (noun)  
- [ ] Sé cuándo preferir *so that* frente a *in order to*  
- [ ] Uso *as a result* solo para consecuencias  
- [ ] Puedo hablar de *exposure, crop, lens, composition* sin traducir palabra a palabra  

---

## 11. Ejercicios prácticos (con soluciones)

""" + _ex_block([
                (
                    "Completa: Many photos are blurry ______ poor lighting.",
                    "**because of** (o **due to**).",
                ),
                (
                    "Completa: We use a tripod ______ avoid camera shake.",
                    "**in order to**",
                ),
                (
                    "Completa: She arrived early ______ she wouldn't miss the golden hour.",
                    "**so that**",
                ),
                (
                    "Une con *as a result*: *The camera failed. We had to reschedule.*",
                    "The camera failed. **As a result**, we had to reschedule.",
                ),
                (
                    "Corrige: *Because of the light was low, the shots were dark.*",
                    "**Because the light was low…** o **Because of the low light…**",
                ),
                (
                    "Vocabulario: recortar los bordes de una imagen = to ______",
                    "**crop**",
                ),
                (
                    "Traduce: *Compraron un objetivo nuevo para mejorar la nitidez.*",
                    "They bought a new lens **in order to** improve sharpness.",
                ),
                (
                    "Elige: *______ the new camera sensor, image quality has improved.* (Due to / In order to / So that)",
                    "**Due to**",
                ),
                (
                    "Reading: ¿Qué hizo Leo *as a result* de los frames borrosos?",
                    "He **cropped** the best shot and posted it to his **feed**.",
                ),
                (
                    "Escribe 3 frases sobre una foto usando *because of*, *in order to* y *as a result*.",
                    "Ejemplo: Because of wind, some shots were blurry. I used a faster shutter in order to freeze motion. As a result, one frame was sharp enough to publish.",
                ),
            ]) + """

---

## Pronunciación útil

- *exposure* → /ɪkˈspəʊʒə/  
- *composition* → /ˌkɒmpəˈzɪʃn/  
- *blurry* → /ˈblʌri/  
- *result* → /rɪˈzʌlt/""",
            tip="Si la causa es un **nombre** (*poor lighting, the storm, low light*), usa *because of* o *due to*. Si es una **oración** (*the light was poor*), usa *because*. Para propósito: mismo sujeto e infinitivo → *in order to*; necesitas modal/otro sujeto → *so that*. El resultado ya ocurrido → *as a result*.",
            summary="""| Función | Linker | Cola gramatical |
| :--- | :--- | :--- |
| Causa | because of / due to | + noun |
| Propósito | in order to | + infinitive |
| Propósito | so that | + subject (+ modal) |
| Resultado | as a result | + oración de consecuencia |""",
            next_block="""En la **Unidad 23** entras en **phrasal verbs 1** (*be about to, break down, bring up…*) con vocabulario de **home & living**.

Practica ahora:

- [Ejercicios Unidad 22](/blog/curso-b2/unidad-22-linkers-reason-purpose-photography-ejercicios-soluciones)
- [Unidad 22 del curso](/curso-b2/unit-22)

Siguiente guía: [U23 — Phrasal verbs 1 + home & living](/blog/curso-b2/unidad-23-phrasal-verbs-1-home-living)""",
            guides=[
                "[U21 Contrast](/blog/curso-b2/unidad-21-linkers-contrast-personal-development)",
                "[U23 Phrasals 1](/blog/curso-b2/unidad-23-phrasal-verbs-1-home-living)",
                "[Inglés B2](/blog/metodos/ingles-b2)",
            ],
            sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Linking words: reasons and results: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar
- Cambridge Dictionary — Because, because of and due to / In order to: https://dictionary.cambridge.org/grammar/british-grammar/""",
        ),
    )

    # Continue U23–25 in part 2 via helper to keep this function readable
    write_articles_u23_25()


def write_articles_u23_25():
    write_md(
        "unidad-23-phrasal-verbs-1-home-living.md",
        article(
            slug="unidad-23-phrasal-verbs-1-home-living",
            unit=23,
            title="Phrasal Verbs 1 B2: BE, BREAK, BRING + Home & Living",
            description="Aprende phrasal verbs con BE, BREAK y BRING (be about to, break down, bring up…) en inglés B2 con vocabulario de home & living. Guía Unidad 23 con audios.",
            image="/blog/curso-b2/unit-23/phrasal-be-break-bring.png",
            alt="Phrasal verbs BE BREAK BRING home living B2",
            readTime="21 min",
            keywords=[
                "phrasal verbs BE BREAK BRING B2",
                "break down bring up be about to",
                "home and living vocabulary B2",
                "inglés B2 unidad 23",
                "phrasal verbs casa inglés",
            ],
            related=[
                "unidad-23-phrasal-verbs-1-home-living-ejercicios-soluciones",
                "unidad-22-linkers-reason-purpose-photography",
                "unidad-24-phrasal-verbs-2-social-media",
                HUB,
            ],
            faqs=[
                (
                    "¿Qué significa be about to?",
                    "**Be about to + infinitive** = estar a punto de hacer algo: *I **was about to** leave when the plumber arrived.* Habla de una acción **inminente**, no de planes lejanos (*going to* / *will*).",
                ),
                (
                    "¿Break down solo es “averiarse”?",
                    "No. Con máquinas/vehículos = dejar de funcionar (*The boiler **broke down***). Con negociaciones = fracasar (*Talks **broke down***). Con personas = derrumbarse emocionalmente (*He **broke down** when he saw the damage*). El contexto decide.",
                ),
                (
                    "¿Bring up es criar o mencionar?",
                    "Las dos. *She **brought up** her children…* (criar) y *He **brought up** the subject of redecorating…* (sacar un tema). En home & living verás ambos usos.",
                ),
                (
                    "¿Be up to y be up for son lo mismo?",
                    "No. **Be up to** ≈ qué estás haciendo / tramando (*What have you been **up to**?*). **Be up for** ≈ estar dispuesto a (*Are you **up for** trying a new layout?*).",
                ),
                (
                    "¿Dónde practico la Unidad 23?",
                    "En la [Unidad 23 del curso B2](/curso-b2/unit-23) y en el [cuaderno](/blog/curso-b2/unidad-23-phrasal-verbs-1-home-living-ejercicios-soluciones).",
                ),
            ],
            excerpt="Guía de la Unidad 23 del curso B2: phrasal verbs con BE, BREAK y BRING y vocabulario de home & living.",
            intro="""Tras los [linkers de razón y propósito](/blog/curso-b2/unidad-22-linkers-reason-purpose-photography), la **Unidad 23** abre el bloque de **phrasal verbs** del Módulo 3. El temario oficial se centra en tres verbos base: **BE** (*be about to, be up to*), **BREAK** (*break down, break in, break out*) y **BRING** (*bring up, bring about, bring in*), siempre en situaciones de **home & living**: reformas, mudanzas, averías y convivencia.

Los phrasal verbs no se traducen pieza a pieza. *Break* no es siempre “romper” y *bring* no es siempre “traer”. Por eso esta guía insiste en **significado + ejemplo doméstico + audio**. Cuando puedas narrar una mañana de averías (*about to leave → boiler broke down → brought in a plumber*) sin mirar el diccionario, habrás asimilado el núcleo de la unidad.""",
            before="[U22 — Linkers reason/purpose + photography](/blog/curso-b2/unidad-22-linkers-reason-purpose-photography)",
            learn=[
                "**be about to / be up to / be up for** en contexto doméstico",
                "**break down / break in / break out** y sus distintos sentidos",
                "**bring up / bring about / bring in** (mencionar, causar, traer a alguien)",
                "Vocabulario de **home & living**: redecorate, renovate, open-plan, extension…",
                "Contar una anécdota de casa usando al menos 6 phrasals",
            ],
            sections=r"""## 1. Cómo estudiar phrasal verbs en B2

No memorices listas aisladas. Agrupa por **verbo base** y por **escena**. En esta unidad la escena es el hogar: estás a punto de salir, la caldera se avería, alguien fuerza la puerta, sacas un tema en la reunión familiar, contratas a un diseñador. Cada phrasal encaja en esa película.

![Phrasal BE BREAK BRING](/blog/curso-b2/unit-23/phrasal-be-break-bring.png)

---

## 2. BE: about to, up to, up for

| Phrasal | Significado | Ejemplo |
| :--- | :--- | :--- |
| **be about to** | estar a punto de | I **was about to** leave the house when the plumber arrived. |
| **be up to** | estar haciendo / tramando | What have you been **up to** lately with the flat? |
| **be up for** | estar dispuesto a | Are you **up for** trying a new layout? |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-23/about-to-leave.mp3" title="🔊 about to"></audio>

*Be about to* + infinitivo marca inminencia. *Be up to* en preguntas informales es el clásico “¿qué has andado haciendo?”. *Be up for* expresa actitud positiva hacia un plan (*up for redecorating this weekend?*).

---

## 3. BREAK: down, in, out

| Phrasal | Significado principal | Ejemplo home |
| :--- | :--- | :--- |
| **break down** | averiarse / fracasar / derrumbarse | The boiler **broke down** last winter. |
| **break down** | negociaciones que fracasan | The talks **broke down** about the extension. |
| **break in** | entrar por la fuerza | Thieves **broke in** during the night. |
| **break out** | estallar de repente (fuego, etc.) | A fire **broke out** in the kitchen at midnight. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-23/broke-down.mp3" title="🔊 broke down"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-23/broke-in.mp3" title="🔊 broke in"></audio>

El mismo *break down* cambia con el sujeto: máquina, conversación o persona. Entrena el oído con ejemplos distintos en lugar de una sola traducción.

---

## 4. BRING: up, about, in

| Phrasal | Significado | Ejemplo |
| :--- | :--- | :--- |
| **bring up** | criar | She **brought up** her children to value a tidy home. |
| **bring up** | mencionar un tema | He **brought up** the subject of redecorating. |
| **bring about** | provocar / causar | The renovation **brought about** major changes. |
| **bring in** | traer a alguien (experto) | They **brought in** an interior designer. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-23/brought-up.mp3" title="🔊 brought up"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-23/brought-about.mp3" title="🔊 brought about"></audio>

*Bring about* es más abstracto (cambios, resultados). *Bring in* es concreto: incorporar a una persona o recurso externo.

---

## 5. Vocabulario: Home & living

![Home & living vocabulary](/blog/curso-b2/unit-23/home-living-vocab.png)

| Word / phrase | Idea | Ejemplo |
| :--- | :--- | :--- |
| **redecorate** | redecorar | We want to **redecorate** the hallway. |
| **renovate** | reformar | They will **renovate** the kitchen next month. |
| **open-plan** | de planta abierta | An **open-plan** kitchen feels bigger. |
| **extension** | ampliación | The **extension** added a dining area. |
| **move in** | mudarse (entrar a vivir) | We **move in** on Friday. |
| **plumber** | fontanero/a | Call a **plumber** for the leak. |
| **tidy up** | ordenar | Please **tidy up** before guests arrive. |
| **settle in** | adaptarse / acomodarse | It took weeks to **settle in**. |
| **furnish** | amueblar | They need to **furnish** the flat. |
| **leak** | fuga | There's a **leak** under the sink. |
| **interior designer** | diseñador/a de interiores | We brought in an **interior designer**. |
| **pay off** | amortizar / valer la pena | The renovation will **pay off** long-term. |

---

## 6. Reading: Sam moves in

![Home scene](/blog/curso-b2/unit-23/home-scene.png)

> When Sam was about to move in, the washing machine broke down. He brought in a plumber the same afternoon. Negotiations with the landlord almost broke down over the cost of an extension, but they finally agreed to renovate the kitchen into an open-plan space. Sam brought up the idea of redecorating the hallway too. A small fire scare broke out in the old fuse box, which brought about a full electrical check. After that, he could settle in, furnish the rooms and tidy up before guests arrived.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-23/reading-u23.mp3" title="🔊 Reading"></audio>

---

## 7. Diálogo: Waiting for the plumber

<audio controls preload="none" src="/audio/blog/curso-b2/unit-23/dialogue-u23.mp3" title="🔊 Dialogue"></audio>

> **A:** Ready to leave?  
> **B:** I was about to when the plumber called.  
> **A:** What happened?  
> **B:** The boiler broke down again.  
> **A:** Any news on the extension?  
> **B:** Talks almost broke down, but we agreed.  
> **A:** Who designed it?  
> **B:** We brought in an interior designer.  
> **A:** Kids help tidy?  
> **B:** I brought them up to keep things organised.  
> **A:** Feeling settled?  
> **B:** Almost. Still furnishing the open-plan kitchen.

---

## 8. Errores típicos de hispanohablantes

| Incorrecto | Mejor |
| :--- | :--- |
| *I was about leaving* | I was **about to leave** |
| *The boiler broke* (sin *down*, si quieres “se averió”) | The boiler **broke down** |
| *Thieves broke the house* | Thieves **broke in** |
| *They brought the topic* | They **brought up** the topic |
| *The changes were brought* (sin *about*) | The renovation **brought about** changes |
| *What are you up for lately?* | What are you **up to** lately? |

---

## 9. Plan de práctica (12 minutos)

1. **4 min:** crea flashcards por verbo (BE / BREAK / BRING) con un ejemplo de casa.  
2. **4 min:** cuenta en voz alta la historia de Sam mirando solo 5 palabras clave.  
3. **4 min:** escribe un WhatsApp ficticio a un compañero de piso usando 5 phrasals + 5 vocab items.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-23/practice-u23.mp3" title="🔊 Practice"></audio>

---

## 10. Ejercicios prácticos (con soluciones)

""" + _ex_block([
                (
                    "Completa: I was ______ leave when the plumber arrived.",
                    "**about to**",
                ),
                (
                    "Completa: The boiler ______ last winter.",
                    "**broke down**",
                ),
                (
                    "Completa: She ______ her children to value a tidy home.",
                    "**brought up**",
                ),
                (
                    "Elige: Thieves ______ during the night. (broke down / broke in / broke out)",
                    "**broke in**",
                ),
                (
                    "Elige: The renovation ______ major changes. (brought up / brought about / brought in)",
                    "**brought about**",
                ),
                (
                    "Vocabulario: planta abierta = ______ kitchen/living space",
                    "**open-plan**",
                ),
                (
                    "Corrige: *I was about leaving the house.*",
                    "I was **about to leave** the house.",
                ),
                (
                    "Traduce: *Contratamos a un diseñador de interiores.*",
                    "We **brought in** an interior designer.",
                ),
                (
                    "Reading: ¿Qué casi fracasó (*broke down*) además de la lavadora?",
                    "Las **negociaciones** con el casero sobre la *extension*.",
                ),
                (
                    "Escribe 4 frases: *about to*, *break down*, *bring up* (tema), *bring in*.",
                    "Ejemplo: I was about to tidy up. The dishwasher broke down. She brought up rent. We brought in a plumber.",
                ),
            ]),
            tip="Aprende cada phrasal con **una imagen mental de casa**. *Break down* = caldera humeante; *break in* = puerta forzada; *bring up* = sacar un tema en la mesa del comedor; *bring in* = llega el experto con herramientas. La imagen fija el significado mejor que la traducción literal.",
            summary="""| Base | Phrasals clave |
| :--- | :--- |
| **BE** | about to · up to · up for |
| **BREAK** | break down · break in · break out |
| **BRING** | bring up · bring about · bring in |""",
            next_block="""Siguiente: **Unidad 24** — phrasal verbs con **CALL, CARRY, COME** + **social media & networking**.

- [Ejercicios U23](/blog/curso-b2/unidad-23-phrasal-verbs-1-home-living-ejercicios-soluciones)
- [Curso U23](/curso-b2/unit-23)
- [U24 teoría](/blog/curso-b2/unidad-24-phrasal-verbs-2-social-media)""",
            guides=[
                "[U22 Linkers](/blog/curso-b2/unidad-22-linkers-reason-purpose-photography)",
                "[U24 Phrasals 2](/blog/curso-b2/unidad-24-phrasal-verbs-2-social-media)",
                "[Inglés B2](/blog/metodos/ingles-b2)",
            ],
            sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Phrasal verbs: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/phrasal-verbs
- Cambridge Dictionary — break down / bring up / be about to""",
        ),
    )

    write_md(
        "unidad-24-phrasal-verbs-2-social-media.md",
        article(
            slug="unidad-24-phrasal-verbs-2-social-media",
            unit=24,
            title="Phrasal Verbs 2 B2: CALL, CARRY, COME + Social Media",
            description="Aprende call off, carry on, come across, come up with y más phrasal verbs en inglés B2 con vocabulario de social media & networking. Guía Unidad 24.",
            image="/blog/curso-b2/unit-24/phrasal-call-carry-come.png",
            alt="Phrasal verbs CALL CARRY COME social media B2",
            readTime="20 min",
            keywords=[
                "phrasal verbs CALL CARRY COME B2",
                "call off carry on come across",
                "come up with social media",
                "social media vocabulary B2",
                "inglés B2 unidad 24",
            ],
            related=[
                "unidad-24-phrasal-verbs-2-social-media-ejercicios-soluciones",
                "unidad-23-phrasal-verbs-1-home-living",
                "unidad-25-repaso-21-24",
                HUB,
            ],
            faqs=[
                (
                    "¿Call off significa cancelar?",
                    "Sí: **call off** = cancelar un evento/plan (*The livestream was **called off***). No lo confundas con *call back* (devolver la llamada) ni *call for* (requerir).",
                ),
                (
                    "¿Carry on o carry out?",
                    "**Carry on** = continuar. **Carry out** = llevar a cabo / ejecutar (*carry out a survey*). **Get carried away** = dejarse llevar (emoción).",
                ),
                (
                    "¿Come across vs come up with?",
                    "**Come across** = encontrar por casualidad *o* dar una impresión (*come across as friendly*). **Come up with** = ocurrírsele una idea. **Come along** = avanzar (*How's it coming along?*).",
                ),
                (
                    "¿Call for qué significa?",
                    "**Call for** = requerir / exigir una acción: *The situation **calls for** immediate action.* No es “llamar para”.",
                ),
                (
                    "¿Dónde practico la Unidad 24?",
                    "En la [Unidad 24 del curso B2](/curso-b2/unit-24) y en el [cuaderno](/blog/curso-b2/unidad-24-phrasal-verbs-2-social-media-ejercicios-soluciones).",
                ),
            ],
            excerpt="Guía de la Unidad 24 del curso B2: phrasal verbs CALL/CARRY/COME y vocabulario de social media.",
            intro="""La **Unidad 24** continúa el bloque de phrasals con **CALL, CARRY y COME**, aplicados a **social media & networking**: lives que se cancelan, campañas que siguen adelante, ideas que surgen al hacer scroll, engagement que mejora poco a poco.

Si en la [Unidad 23](/blog/curso-b2/unidad-23-phrasal-verbs-1-home-living) el escenario era el hogar, aquí el escenario es el **feed**: *call off a livestream*, *carry on posting*, *come across a profile*, *come up with a hashtag*, *ask someone to call you back*, *see how a campaign is coming along*. Dominar estos nueve núcleos te permite narrar una crisis digital completa en inglés B2 sin traducir del español.""",
            before="[U23 — Phrasal verbs 1 + home & living](/blog/curso-b2/unidad-23-phrasal-verbs-1-home-living)",
            learn=[
                "**call off / call back / call for**",
                "**carry on / carry out / (get) carried away**",
                "**come across / come up with / come along** (+ usos extra del curso)",
                "Vocabulario de **followers, feed, engagement, story, influencer**…",
                "Relatar una campaña online con phrasals encadenados",
            ],
            sections=r"""## 1. Mapa CALL · CARRY · COME

![Phrasal CALL CARRY COME](/blog/curso-b2/unit-24/phrasal-call-carry-come.png)

Estudia por columnas: tres verbos base, tres partículas frecuentes cada uno. Luego mézclalos en una mini-historia de campaña.

---

## 2. CALL: off, back, for

| Phrasal | Significado | Ejemplo social |
| :--- | :--- | :--- |
| **call off** | cancelar | The livestream was **called off** because of technical issues. |
| **call back** | devolver la llamada | Please **call me back** when you have a moment. |
| **call for** | requerir | The situation **calls for** immediate action. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-24/called-off.mp3" title="🔊 called off"></audio>

---

## 3. CARRY: on, out, away

| Phrasal | Significado | Ejemplo |
| :--- | :--- | :--- |
| **carry on** | continuar | Despite the trolls, we **carried on** posting. |
| **carry out** | ejecutar / realizar | The team **carried out** a survey of user engagement. |
| **get carried away** | dejarse llevar | The audience **got carried away** when the influencer shared their story. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-24/carried-on.mp3" title="🔊 carried on"></audio>

---

## 4. COME: across, up with, along

| Phrasal | Significado | Ejemplo |
| :--- | :--- | :--- |
| **come across** | encontrar por casualidad | I **came across** an interesting photographer profile. |
| **come across (as)** | dar impresión de | He **came across as** friendly and approachable. |
| **come up with** | idear | She **came up with** a brilliant idea for the campaign. |
| **come along** | avanzar | How is your campaign **coming along**? |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-24/came-across.mp3" title="🔊 came across"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-24/came-up-with.mp3" title="🔊 came up with"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-24/coming-along.mp3" title="🔊 coming along"></audio>

Otros usos útiles del curso: *come round* (pasarte por casa/meetup), *come through* (salir adelante en una dificultad), *come back* (volver a la memoria: *His name came back to me*).

---

## 5. Vocabulario: Social media & networking

![Social media vocabulary](/blog/curso-b2/unit-24/social-media-vocab.png)

| Word | Idea | Ejemplo |
| :--- | :--- | :--- |
| **followers** | seguidores | She gained 200 new **followers**. |
| **feed** | feed / muro | Scroll the **feed** for inspiration. |
| **engagement** | interacción | The post boosted **engagement**. |
| **story** | historia (Stories) | Post a **story** before the livestream. |
| **influencer** | influencer | They invited a micro-**influencer**. |
| **livestream** | directo | The **livestream** starts at 8. |
| **meetup** | quedada / encuentro | Are you coming to the **meetup**? |
| **hashtag** | hashtag | Create a campaign **hashtag**. |
| **viral** | viral | One clip went **viral** overnight. |
| **trending** | tendencia | The topic is **trending** today. |
| **troll** | troll | Ignore the **trolls** and carry on. |
| **network** | red / networking | She joined a creators' **network**. |

---

## 6. Reading: Nora's campaign week

![Social media scene](/blog/curso-b2/unit-24/social-scene.png)

> Nora's team almost called off the product livestream after a server crash. Instead they carried out a quick backup plan and carried on with a shorter story sequence. While scrolling competitors' feeds, Nora came across a format that boosted engagement. She came up with a hashtag challenge for influencers and asked partners to call her back with availability. The situation called for calm messaging, not panic. By Friday the campaign was coming along well: followers shared the story and a few posts went viral.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-24/reading-u24.mp3" title="🔊 Reading"></audio>

---

## 7. Diálogo: After the crash

<audio controls preload="none" src="/audio/blog/curso-b2/unit-24/dialogue-u24.mp3" title="🔊 Dialogue"></audio>

> **A:** Is the livestream still on?  
> **B:** No, it was called off.  
> **A:** What now?  
> **B:** We carried on with stories instead.  
> **A:** Any ideas?  
> **B:** I came up with a hashtag challenge.  
> **A:** Where did you see that format?  
> **B:** I came across it on my feed.  
> **A:** Need me?  
> **B:** Please call me back after the meetup.  
> **A:** How's engagement coming along?  
> **B:** Better — fewer trolls today.

---

## 8. Errores típicos de hispanohablantes

| Incorrecto | Correcto |
| :--- | :--- |
| *They called the event* (por cancelar) | They **called off** the event |
| *We carried the survey* | We **carried out** the survey |
| *I came up a good idea* | I **came up with** a good idea |
| *How is it coming?* (progreso) | How is it **coming along**? |
| *Call me for later* (devolución) | **Call me back** later |
| *This calls immediate action* | This **calls for** immediate action |

---

## 9. Plan de práctica (10–15 minutos)

1. **5 min:** escribe la cronología de una crisis de contenido usando los 9 phrasals.  
2. **4 min:** escucha reading + diálogo y lista engagement vocabulary.  
3. **4–6 min:** grábate explicando tu “Plan B” si un live se cancela.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-24/practice-u24.mp3" title="🔊 Practice"></audio>

---

## 10. Ejercicios prácticos (con soluciones)

""" + _ex_block([
                (
                    "Completa: The livestream ______ because of technical issues.",
                    "**was called off**",
                ),
                (
                    "Completa: Despite the trolls, we ______ posting.",
                    "**carried on**",
                ),
                (
                    "Completa: I ______ an interesting profile while scrolling.",
                    "**came across**",
                ),
                (
                    "Completa: She ______ a brilliant idea for the campaign.",
                    "**came up with**",
                ),
                (
                    "Elige: The team ______ a survey last month. (carried on / carried out / called off)",
                    "**carried out**",
                ),
                (
                    "Vocabulario: interacción de usuarios con el contenido = ______",
                    "**engagement**",
                ),
                (
                    "Corrige: *I came up a hashtag yesterday.*",
                    "I **came up with** a hashtag yesterday.",
                ),
                (
                    "Traduce: *Por favor, devuélveme la llamada después del meetup.*",
                    "Please **call me back** after the meetup.",
                ),
                (
                    "Reading: ¿Qué *called for* la situación tras el crash?",
                    "**Calm messaging**, not panic.",
                ),
                (
                    "Escribe un mini-párrafo (5 frases) con *call off, carry on, come across, come up with, coming along*.",
                    "Ejemplo aceptable si usa los cinco phrasals en contexto de campaña/redes.",
                ),
            ]),
            tip="Cuando dudes entre *carry on* y *carry out*, pregunta: ¿**sigo** haciendo lo mismo o **ejecuto** una tarea concreta? Continuar → *carry on*. Realizar una encuesta/plan → *carry out*. Y recuerda la preposición de las ideas: siempre *come up **with***.",
            summary="""| Base | Phrasals |
| :--- | :--- |
| **CALL** | call off · call back · call for |
| **CARRY** | carry on · carry out · (get) carried away |
| **COME** | come across · come up with · come along |""",
            next_block="""Siguiente: **Unidad 25 — Repaso 21–24** (linkers + phrasals 1–2).

- [Ejercicios U24](/blog/curso-b2/unidad-24-phrasal-verbs-2-social-media-ejercicios-soluciones)
- [Curso U24](/curso-b2/unit-24)
- [U25 Repaso](/blog/curso-b2/unidad-25-repaso-21-24)""",
            guides=[
                "[U23 Phrasals 1](/blog/curso-b2/unidad-23-phrasal-verbs-1-home-living)",
                "[U25 Repaso](/blog/curso-b2/unidad-25-repaso-21-24)",
                "[Inglés B2](/blog/metodos/ingles-b2)",
            ],
            sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Phrasal verbs: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/phrasal-verbs
- Cambridge Dictionary — call off / carry out / come across / come up with""",
        ),
    )

    write_md(
        "unidad-25-repaso-21-24.md",
        article(
            slug="unidad-25-repaso-21-24",
            unit=25,
            title="Repaso B2 Unidades 21–24: Linkers & Phrasal Verbs",
            description="Repasa linkers de contraste/razón/propósito y phrasal verbs BE-BREAK-BRING / CALL-CARRY-COME del curso B2 (Unidades 21–24) con vocabulario mezclado. Guía Unidad 25.",
            image="/blog/curso-b2/unit-25/review-map.png",
            alt="Repaso B2 unidades 21 a 24 linkers phrasal verbs",
            readTime="22 min",
            keywords=[
                "repaso inglés B2 unidades 21-24",
                "linkers and phrasal verbs review B2",
                "although despite call off come up with",
                "inglés B2 unidad 25",
                "repaso módulo 3 B2",
            ],
            related=[
                "unidad-25-repaso-21-24-ejercicios-soluciones",
                "unidad-24-phrasal-verbs-2-social-media",
                "unidad-21-linkers-contrast-personal-development",
                HUB,
            ],
            faqs=[
                (
                    "¿Qué repasa exactamente la Unidad 25?",
                    "Integra **U21** (although, despite, in spite of, whereas, however), **U22** (because of, due to, in order to, so that, as a result), **U23** (BE/BREAK/BRING phrasals + home) y **U24** (CALL/CARRY/COME + social media).",
                ),
                (
                    "¿Cómo estudio un repaso B2 sin empacharme?",
                    "Haz **bloques de 12 minutos**: 1) mapa de linkers, 2) mapa de phrasals, 3) reading mixto, 4) producción oral. Mejor cuatro ciclos cortos que una tarde interminable.",
                ),
                (
                    "¿Qué error vuelve más en el repaso?",
                    "Mezclar colas gramaticales: *despite + clause*, *because of + clause*, *come up* sin *with*, *call off* vs *call back*. Usa el checklist de la sección 9.",
                ),
                (
                    "¿El vocabulario también se mezcla?",
                    "Sí: personal development, photography, home & living y social media aparecen juntos en reading, diálogo y ejercicios, como en el curso oficial.",
                ),
                (
                    "¿Dónde practico la Unidad 25?",
                    "En la [Unidad 25 del curso B2](/curso-b2/unit-25) y en el [cuaderno de repaso](/blog/curso-b2/unidad-25-repaso-21-24-ejercicios-soluciones).",
                ),
            ],
            excerpt="Repaso oficial B2 U21–24: linkers de contraste/razón/propósito y phrasal verbs 1–2 con vocabulario mixto.",
            intro="""La **Unidad 25** cierra el primer bloque del Módulo 3: no introduce gramática nueva, sino que **integra** lo visto en las Unidades 21–24. Si puedes explicar un fin de semana caótico —taller de desarrollo personal, sesión de fotos, avería en casa y crisis de livestream— usando linkers y phrasals con precisión, estás listo para el siguiente tramo del curso.

Este repaso está pensado para **diagnóstico**: localiza si fallas más en contraste (*despite* vs *although*), en propósito (*in order to* vs *so that*) o en phrasals (*break down* vs *call off*). Las secciones mezclan tablas, un reading integral, diálogo y más de ocho ejercicios con soluciones.""",
            before="[U24 — Phrasal verbs 2 + social media](/blog/curso-b2/unidad-24-phrasal-verbs-2-social-media)",
            learn=[
                "Reactivar **linkers de contraste** (U21) y **razón/propósito/resultado** (U22)",
                "Reactivar **phrasals BE/BREAK/BRING** (U23) y **CALL/CARRY/COME** (U24)",
                "Mezclar vocabulario de las cuatro unidades en un mismo texto",
                "Autocorregir los errores típicos del bloque con un checklist",
                "Producir un relato oral/escrito de 120–150 palabras integrando ambos sistemas",
            ],
            sections=r"""## 1. Mapa del bloque U21–24

![Review map](/blog/curso-b2/unit-25/review-map.png)

| U | Gramática | Vocabulario |
| :--- | :--- | :--- |
| **21** | although, despite, in spite of, whereas, however | personal development |
| **22** | because of, due to, in order to, so that, as a result | photography & media |
| **23** | be about to / up to; break down/in/out; bring up/about/in | home & living |
| **24** | call off/back/for; carry on/out; come across/up with/along | social media |

---

## 2. Linkers: contraste vs razón/propósito/resultado

### Contraste (U21)

| Linker | Recuerda | Ejemplo rápido |
| :--- | :--- | :--- |
| although | + subject + verb | **Although** the workshop was full, she found a seat. |
| despite / in spite of | + noun / -ing | **Despite** low energy, she made progress. |
| whereas | paralelo | She posts daily, **whereas** he posts weekly. |
| however | nueva oración | The plan failed. **However**, she came up with a Plan B. |

### Razón / propósito / resultado (U22)

| Linker | Recuerda | Ejemplo |
| :--- | :--- | :--- |
| because of / due to | + noun | **Because of** poor light, shots were blurry. |
| in order to | + infinitive | They bought a lens **in order to** improve sharpness. |
| so that | + clause | She left early **so that** she wouldn't miss golden hour. |
| as a result | consecuencia | The card was full. **As a result**, they deleted files. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-25/review-although.mp3" title="🔊 although"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-25/review-in-order.mp3" title="🔊 in order to"></audio>

---

## 3. Phrasals: dos familias en una historia

![Mixed examples](/blog/curso-b2/unit-25/review-examples.png)

| Familia | Mini-cadena |
| :--- | :--- |
| U23 | I was **about to** leave → the van **broke down** → we **brought in** a mechanic |
| U24 | The live was **called off** → we **carried on** with stories → she **came up with** a hashtag |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-25/review-broke-down.mp3" title="🔊 broke down"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-25/review-called-off.mp3" title="🔊 called off"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-25/review-came-up.mp3" title="🔊 came up with"></audio>

---

## 4. Vocabulario mixto (selección)

| De… | Palabras a reactivar |
| :--- | :--- |
| U21 | workshop, resilience, milestone, mentor, growth mindset, comfort zone |
| U22 | composition, exposure, crop, lens, blurry, feed, capture |
| U23 | redecorate, renovate, open-plan, extension, plumber, settle in |
| U24 | followers, engagement, story, influencer, livestream, hashtag |

Intenta una frase que cruce dos columnas: *Despite a blurry first take, she cropped the shot and made progress toward her milestone.*

---

## 5. Reading mixto

> Although Maya felt nervous, she joined the workshop to build resilience. She used a tripod in order to capture sharp photos for her mentor's challenge. When the boiler broke down at home, she brought in a plumber and still carried on studying. Later her livestream was called off, but she came up with a story series that improved engagement. Despite the setbacks, she made progress and stepped further out of her comfort zone.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-25/reading-mix.mp3" title="🔊 Reading"></audio>

**Tarea:** subraya 3 linkers y 4 phrasals. ¿Puedes decir qué unidad “aporta” cada uno?

---

## 6. Diálogo mixto

<audio controls preload="none" src="/audio/blog/curso-b2/unit-25/dialogue-mix.mp3" title="🔊 Dialogue"></audio>

> **A:** Tough week?  
> **B:** Although it was hard, I made progress.  
> **A:** Blurry shots?  
> **B:** I used a tripod in order to fix exposure.  
> **A:** Boiler again?  
> **B:** It broke down; we brought in a plumber.  
> **A:** Livestream?  
> **B:** Called off — but I came up with a Plan B.  
> **A:** Engagement?  
> **B:** Coming along better on the feed.  
> **A:** Next goal?  
> **B:** Keep learning and celebrate the next milestone.

---

## 7. Errores típicos del bloque (tabla exprés)

| Zona | Error típico | Forma B2 |
| :--- | :--- | :--- |
| Contraste | *Despite she was tired* | Although she was tired / Despite being tired |
| Causa | *Because of he arrived late* | Because he arrived late |
| Propósito | *in order to she can…* | in order to + infinitive / so that she can… |
| BREAK | *broke* por “se averió” | **broke down** |
| COME | *came up an idea* | **came up with** an idea |
| CALL | *called* por cancelar | **called off** |

---

## 8. Plan de práctica (15 minutos)

1. **3 min** — Dibuja el mapa U21–24 de memoria.  
2. **4 min** — Transforma 4 frases incorrectas de la tabla de errores.  
3. **4 min** — Escucha reading + diálogo; anota lo que no salió fluido.  
4. **4 min** — Graba un monólogo de 90 segundos mezclando linkers y phrasals.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-25/practice-mix.mp3" title="🔊 Practice"></audio>

### Checklist final del bloque

- [ ] although vs despite  
- [ ] because of / in order to / so that / as a result  
- [ ] break down / bring up / bring in  
- [ ] call off / carry on / come across / come up with  
- [ ] 10+ palabras de vocabulario mixto en contexto  

---

## 9. Ejercicios prácticos (con soluciones)

""" + _ex_block([
                (
                    "Completa: ______ the workshop was full, she found a seat at the back.",
                    "**Although**",
                ),
                (
                    "Completa: They bought a new lens ______ improve sharpness.",
                    "**in order to**",
                ),
                (
                    "Completa: The removal van ______ on the way to the new house.",
                    "**broke down**",
                ),
                (
                    "Completa: The webinar ______ due to low registration.",
                    "**was called off**",
                ),
                (
                    "Completa: She ______ a plan despite low engagement on the feed.",
                    "**came up with**",
                ),
                (
                    "Elige el linker de contraste: She prefers mornings, ______ he prefers nights. (however / whereas / due to)",
                    "**whereas**",
                ),
                (
                    "Corrige: *Despite she felt nervous, she joined the workshop.*",
                    "**Although she felt nervous…** / **Despite feeling nervous…**",
                ),
                (
                    "Vocabulario mixto: hito de progreso = ______ ; interacción en redes = ______",
                    "**milestone** · **engagement**",
                ),
                (
                    "Reading: nombra un linker de propósito y un phrasal de U23 en el texto.",
                    "Propósito: **in order to** (capture sharp photos). U23: **broke down** / **brought in**.",
                ),
                (
                    "Escribe 120–150 palabras narrando un día que combine taller, foto, casa y redes con al menos 4 linkers y 4 phrasals.",
                    "Autoevalúa con el checklist de la sección 8; ejemplo libre si cumple los mínimos.",
                ),
            ]) + """

---

## Cómo seguir después del repaso

Si un apartado te salió flojo, vuelve a la guía dedicada antes de avanzar al siguiente bloque de phrasals del curso (U26+):

- [U21 Contrast](/blog/curso-b2/unidad-21-linkers-contrast-personal-development)
- [U22 Reason & purpose](/blog/curso-b2/unidad-22-linkers-reason-purpose-photography)
- [U23 Phrasals 1](/blog/curso-b2/unidad-23-phrasal-verbs-1-home-living)
- [U24 Phrasals 2](/blog/curso-b2/unidad-24-phrasal-verbs-2-social-media)""",
            tip="En un repaso B2, no intentes “releer todo”. Diagnostica: ¿fallas la **cola gramatical** del linker o el **significado** del phrasal? Corrige primero el tipo de error más frecuente y vuelve a producir un párrafo mixto. La integración se demuestra escribiendo, no solo reconociendo opciones.",
            summary="""| Bloque | Piezas mínimas a dominar |
| :--- | :--- |
| U21 | although · despite/in spite of · whereas · however |
| U22 | because of/due to · in order to · so that · as a result |
| U23 | about to · break down/in/out · bring up/about/in |
| U24 | call off/back/for · carry on/out · come across/up with/along |""",
            next_block="""Con el bloque 21–24 consolidado, el curso B2 sigue con más **phrasal verbs** (U26+) y nuevos focos léxicos. Mientras tanto, cierra el círculo práctico:

- [Ejercicios U25 (repaso)](/blog/curso-b2/unidad-25-repaso-21-24-ejercicios-soluciones)
- [Unidad 25 del curso](/curso-b2/unit-25)
- Vuelve a [U21](/blog/curso-b2/unidad-21-linkers-contrast-personal-development) si el contraste aún tambalea""",
            guides=[
                "[U21](/blog/curso-b2/unidad-21-linkers-contrast-personal-development)",
                "[U22](/blog/curso-b2/unidad-22-linkers-reason-purpose-photography)",
                "[U23](/blog/curso-b2/unidad-23-phrasal-verbs-1-home-living)",
                "[U24](/blog/curso-b2/unidad-24-phrasal-verbs-2-social-media)",
                "[Inglés B2](/blog/metodos/ingles-b2)",
            ],
            sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — B1–B2 grammar (linkers & phrasal verbs): https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar
- Cambridge Dictionary — Linking words and phrasal verbs reference entries""",
        ),
    )


def main():
    diagrams()
    tts()
    write_articles()
    print("done B2 theory U21–25")


if __name__ == "__main__":
    main()
