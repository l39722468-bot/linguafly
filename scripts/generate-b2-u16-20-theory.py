#!/usr/bin/env python3
"""Generate B2 theory U16–20: diagrams, markdown, TTS audios.

Completes official Module 2 (U11–20) after relatives/modals (U11–15).
Head commercial Bing keywords stay on hub /blog/temas/curso-ingles only.
Articles use level/topic long-tails.

Vocab themes follow live course lessons (src/lib/course/b2):
  U16 History & Heritage · U17 Adventure · U18 Cooking · U19 Literature
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
    # U16 passive all tenses
    img, d = canvas()
    title(d, "Passive voice (all tenses) B2")
    rows = [
        ("Present", "is/are + V3", "are visited"),
        ("Pres. cont.", "is being + V3", "is being restored"),
        ("Past", "was/were + V3", "was built"),
        ("Past cont.", "was being + V3", "was being digitised"),
        ("Pres. perfect", "has been + V3", "has been unveiled"),
        ("Past perfect", "had been + V3", "had been moved"),
        ("Future", "will be + V3", "will be excavated"),
        ("Fut. perfect", "will have been + V3", "will have been opened"),
    ]
    for i, (name, form, ex) in enumerate(rows):
        col, row = i % 2, i // 2
        x, y = 48 + col * 570, 110 + row * 130
        card(d, (x, y, x + 530, y + 110))
        d.text((x + 20, y + 18), name, fill=ACCENT, font=font(22, True))
        d.text((x + 20, y + 52), form, fill=INK, font=font(18))
        d.text((x + 20, y + 78), ex, fill=INK, font=font(17))
    save(img, 16, "passive-all-tenses.png")

    vocab_grid(
        16,
        "heritage-vocab.png",
        "History & heritage",
        [
            "heritage",
            "ruins",
            "landmark",
            "restore",
            "manuscript",
            "archive",
            "artefact",
            "excavate",
            "fresco",
            "historian",
            "century",
            "tradition",
        ],
    )

    img, d = canvas()
    title(d, "Heritage in the passive")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "Ancient monuments are visited by thousands every year.",
            "The castle was built in the twelfth century.",
            "The historic site is being restored right now.",
            "The artefacts had already been moved when we arrived.",
        ]
    ):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(22))
    save(img, 16, "heritage-scene.png")

    # U17 modal passive + have something done
    img, d = canvas()
    title(d, "Modal passive & have something done")
    card(d, (48, 110, 580, 600))
    d.text((72, 140), "Modal + be + V3", fill=ACCENT, font=font(24, True))
    d.text((72, 210), "must / should / ought to", fill=INK, font=font(18))
    d.text((72, 270), "be + past participle", fill=INK, font=font(18))
    d.text((72, 350), "Gear must be tested.", fill=INK, font=font(20))
    d.text((72, 410), "Routes should be verified.", fill=INK, font=font(20))
    d.text((72, 470), "should have been + V3", fill=INK, font=font(18))
    d.text((72, 520), "(criticism about the past)", fill=INK, font=font(18))
    card(d, (620, 110, 1150, 600))
    d.text((644, 140), "have something done", fill=ACCENT, font=font(24, True))
    d.text((644, 210), "have / get + object + V3", fill=INK, font=font(18))
    d.text((644, 280), "I had my parachute serviced.", fill=INK, font=font(18))
    d.text((644, 340), "She is having her kayak repaired.", fill=INK, font=font(18))
    d.text((644, 400), "He has his ropes checked.", fill=INK, font=font(18))
    d.text((644, 480), "Someone else does the action", fill=INK, font=font(18))
    d.text((644, 520), "for you.", fill=INK, font=font(18))
    save(img, 17, "modal-passive-have-done.png")

    vocab_grid(
        17,
        "adventure-vocab.png",
        "Adventure & extreme sports",
        [
            "harness",
            "parachute",
            "expedition",
            "climb",
            "wetsuit",
            "kayak",
            "route",
            "base camp",
            "rope",
            "gear",
            "inspector",
            "jump",
        ],
    )

    img, d = canvas()
    title(d, "Adventure in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "All climbing gear must be tested before the expedition.",
            "The safety report should have been published earlier.",
            "I am having my parachute serviced next week.",
            "She had her wetsuit repaired yesterday.",
        ]
    ):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(22))
    save(img, 17, "adventure-scene.png")

    # U18 so / such / too / enough
    img, d = canvas()
    title(d, "So · such · too · enough")
    boxes = [
        (48, "so + adj/adv", "so delicious that…", "so many / so much"),
        (330, "such (+ a) + N", "such a great class", "such beautiful weather"),
        (612, "too + adj", "too hot to eat", "too small to fit"),
        (894, "enough", "enough time", "skilled enough"),
    ]
    for x, h, a, b in boxes:
        card(d, (x, 120, x + 260, 560))
        d.text((x + 16, 150), h, fill=ACCENT, font=font(20, True))
        d.text((x + 16, 260), a, fill=INK, font=font(17))
        d.text((x + 16, 360), b, fill=INK, font=font(17))
    save(img, 18, "so-such-too-enough.png")

    vocab_grid(
        18,
        "cooking-vocab.png",
        "Cooking & recipes",
        [
            "recipe",
            "ingredient",
            "dough",
            "simmer",
            "chop",
            "bake",
            "season",
            "whisk",
            "soufflé",
            "batter",
            "garnish",
            "portion",
        ],
    )

    img, d = canvas()
    title(d, "Cooking in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "The cake was so delicious that we couldn't stop eating.",
            "It was such a great cooking class that we signed up again.",
            "The soup was too hot to eat immediately.",
            "We don't have enough time to finish the recipe.",
        ]
    ):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(22))
    save(img, 18, "cooking-scene.png")

    # U19 advanced comparatives
    img, d = canvas()
    title(d, "Advanced comparatives & superlatives")
    card(d, (48, 110, 580, 600))
    d.text((72, 140), "Modifiers", fill=ACCENT, font=font(26, True))
    d.text((72, 220), "much / far / a lot + comp.", fill=INK, font=font(18))
    d.text((72, 280), "slightly / a bit + comp.", fill=INK, font=font(18))
    d.text((72, 360), "by far + superlative", fill=INK, font=font(18))
    d.text((72, 440), "far more expensive", fill=INK, font=font(18))
    d.text((72, 500), "by far the best novel", fill=INK, font=font(18))
    card(d, (620, 110, 1150, 600))
    d.text((644, 140), "The… the…", fill=ACCENT, font=font(26, True))
    d.text((644, 220), "The more you read,", fill=INK, font=font(20))
    d.text((644, 280), "the better you write.", fill=INK, font=font(20))
    d.text((644, 360), "The harder you work,", fill=INK, font=font(20))
    d.text((644, 420), "the better your draft.", fill=INK, font=font(20))
    d.text((644, 500), "parallel comparative", fill=INK, font=font(18))
    save(img, 19, "advanced-comparatives.png")

    vocab_grid(
        19,
        "literature-vocab.png",
        "Literature & books",
        [
            "novel",
            "paperback",
            "draft",
            "sequel",
            "review",
            "shortlist",
            "author",
            "chapter",
            "plot",
            "translation",
            "edition",
            "critique",
        ],
    )

    img, d = canvas()
    title(d, "Literature in context")
    card(d, (48, 110, 1150, 560))
    for i, t in enumerate(
        [
            "The more you read, the better you write.",
            "This is by far the best novel we've ever read.",
            "This edition is much more expensive than the paperback.",
            "The longer we waited for the sequel, the more excited we became.",
        ]
    ):
        d.text((80, 160 + i * 90), f"• {t}", fill=INK, font=font(22))
    save(img, 19, "literature-scene.png")

    # U20 review
    img, d = canvas()
    title(d, "Review U16–U19")
    items = [
        ("U16", "Passive all tenses"),
        ("U17", "Modal passive"),
        ("U18", "So / such / too"),
        ("U19", "Comparatives"),
    ]
    for i, (u, label) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 190), u, fill=ACCENT, font=font(34, True))
        d.text((x + 20, 260), label, fill=INK, font=font(18))
    card(d, (48, 400, 1150, 600))
    d.text((72, 450), "be + V3 · must be + V3 · have sth done · so/such/too/enough · the…the…", fill=INK, font=font(20))
    d.text((72, 520), "Vocab: heritage · adventure · cooking · literature", fill=INK, font=font(20))
    save(img, 20, "review-map.png")

    img, d = canvas()
    title(d, "Mixed examples U16–19")
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate(
        [
            "The site is being restored. (present continuous passive)",
            "Gear must be tested; I had my ropes checked. (modal / have done)",
            "It was such a great class that we signed up again. (such a)",
            "The more you read, the better you write. (the… the…)",
            "This is by far the best novel. (by far + superlative)",
        ]
    ):
        d.text((80, 150 + i * 85), f"{i+1}. {t}", fill=INK, font=font(20))
    save(img, 20, "review-examples.png")


AUDIOS = {
    16: {
        "present-visited": "Ancient monuments are visited by thousands of tourists every year.",
        "past-built": "The castle was built in the twelfth century.",
        "cont-restored": "The historic site is being restored right now.",
        "pp-unveiled": "The fresco has been unveiled before the ceremony.",
        "past-perf-moved": "The artefacts had already been moved when we arrived.",
        "future-excavated": "The ruins will be excavated by the end of the decade.",
        "reading-u16": "Ancient monuments are visited every year. The castle was built in the twelfth century. The historic site is being restored. The artefacts had already been moved. The fresco has been unveiled.",
        "dialogue-u16": "Old castle? The castle was built in the twelfth century. Still closed? The historic site is being restored right now. Seen the fresco? It has been unveiled already.",
        "practice-u16": "Are visited. Was built. Is being restored. Has been unveiled. Had been moved. Will be excavated.",
    },
    17: {
        "must-be-tested": "All climbing gear must be tested before the expedition.",
        "should-have-been": "The safety report should have been published earlier.",
        "having-serviced": "I am having my parachute serviced next week.",
        "had-repaired": "She had her wetsuit repaired yesterday.",
        "must-be-inspected": "Harnesses must be inspected before each climb.",
        "has-ropes-checked": "He has his climbing ropes checked every six months.",
        "reading-u17": "All climbing gear must be tested. The safety report should have been published earlier. I am having my parachute serviced. She had her wetsuit repaired yesterday.",
        "dialogue-u17": "Safe to climb? Gear must be tested first. Late report? It should have been published earlier. Parachute ready? I am having it serviced next week.",
        "practice-u17": "Must be tested. Should have been published. Having serviced. Had repaired. Must be inspected.",
    },
    18: {
        "so-delicious": "The cake was so delicious that we could not stop eating.",
        "such-a-class": "It was such a great cooking class that we signed up for more.",
        "too-hot": "The soup was too hot to eat immediately.",
        "enough-time": "We do not have enough time to finish the recipe before dinner.",
        "so-many": "There were so many ingredients that we could not find them all.",
        "skilled-enough": "He is experienced enough to run a professional kitchen.",
        "reading-u18": "The cake was so delicious that we could not stop. It was such a great class that we signed up again. The soup was too hot to eat. We do not have enough time to finish.",
        "dialogue-u18": "Good cake? It was so delicious that we could not stop. Hard class? It was such a great class that we signed up again. Ready to eat? The soup is too hot right now.",
        "practice-u18": "So delicious that. Such a great class. Too hot to eat. Enough time. So many ingredients. Skilled enough.",
    },
    19: {
        "the-more-the-better": "The more you read, the better you write.",
        "by-far-best": "This is by far the best novel we have ever read.",
        "much-more-expensive": "This edition is much more expensive than the paperback.",
        "the-longer-the-more": "The longer we waited for the sequel, the more excited we became.",
        "far-faster": "She reads far faster than she did last year.",
        "slightly-better": "The new version is slightly better than the old translation.",
        "reading-u19": "The more you read, the better you write. This is by far the best novel. This edition is much more expensive than the paperback. The longer we waited, the more excited we became.",
        "dialogue-u19": "Best book? This is by far the best novel. Expensive? Much more expensive than the paperback. Reading tip? The more you read, the better you write.",
        "practice-u19": "The more the better. By far the best. Much more expensive. The longer the more. Far faster. Slightly better.",
    },
    20: {
        "review-passive": "The historic site is being restored right now.",
        "review-modal": "All climbing gear must be tested before the expedition.",
        "review-have-done": "I am having my parachute serviced next week.",
        "review-so-such": "It was such a great cooking class that we signed up again.",
        "review-comparative": "The more you read, the better you write.",
        "reading-mix": "The site is being restored. Gear must be tested. I am having my parachute serviced. It was such a great class. The more you read, the better you write.",
        "dialogue-mix": "Still closed? The site is being restored. Safe gear? It must be tested first. Best tip? The more you read, the better you write.",
        "practice-mix": "Is being restored. Must be tested. Having serviced. Such a great class. The more the better. By far the best.",
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
title: "{kw["title"]}"
description: >-
  {kw["description"]}
readTime: 15 min
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
        "unidad-16-passive-all-tenses-heritage.md",
        article(
            slug="unidad-16-passive-all-tenses-heritage",
            unit=16,
            title="Passive Voice B2: All Tenses + History & Heritage",
            description="Aprende la voz pasiva en todos los tiempos (present, past, perfect, future, continuous) en inglés B2 con vocabulario de history & heritage. Guía Unidad 16 con audios.",
            image="/blog/curso-b2/unit-16/passive-all-tenses.png",
            alt="Passive all tenses heritage B2",
            keywords=[
                "passive voice all tenses B2",
                "voz pasiva todos los tiempos",
                "present continuous passive",
                "heritage vocabulary B2",
                "inglés B2 unidad 16",
            ],
            related=["unidad-15-repaso-11-14", "unidad-17-modal-passive-adventure", HUB],
            faqs=[
                (
                    "¿Qué cambia entre tiempos en la pasiva?",
                    "Solo cambia **be**: *is / was / is being / has been / had been / will be / will have been* + **past participle**.",
                ),
                (
                    "¿Present continuous passive?",
                    "**is/are being + V3**: *The site **is being restored** right now.*",
                ),
                (
                    "¿Cuándo uso by?",
                    "Cuando el agente importa: *visited **by** thousands*. Si no importa, omítelo.",
                ),
                ("¿Dónde practico?", "En la [Unidad 16 del curso B2](/curso-b2/unit-16)."),
            ],
            excerpt="Guía de la Unidad 16 del curso B2: passive en todos los tiempos y vocabulario de history & heritage.",
            intro="Tras el [Repaso 11–14](/blog/curso-b2/unidad-15-repaso-11-14), la **Unidad 16** amplía la **voz pasiva a todos los tiempos** con vocabulario de **history & heritage**.",
            before="[U15 — Repaso 11–14](/blog/curso-b2/unidad-15-repaso-11-14)",
            learn=[
                "Pasiva en **presente, pasado, continuous, perfect y future**",
                "Elegir la forma de **be** correcta según el tiempo",
                "Usar **by** solo cuando el agente importa",
                "Vocabulario: history & heritage",
            ],
            sections=r"""## 1. Passive: mapa de tiempos

| Tiempo | Forma | Ejemplo |
| :--- | :--- | :--- |
| **Present** | is / are + V3 | Monuments **are visited** every year. |
| **Present cont.** | is / are being + V3 | The site **is being restored**. |
| **Past** | was / were + V3 | The castle **was built** in 1200. |
| **Past cont.** | was / were being + V3 | It **was being digitised**. |
| **Present perfect** | has / have been + V3 | The fresco **has been unveiled**. |
| **Past perfect** | had been + V3 | The artefacts **had been moved**. |
| **Future** | will be + V3 | The ruins **will be excavated**. |
| **Future perfect** | will have been + V3 | It **will have been opened**. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-16/present-visited.mp3" title="🔊 present"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-16/past-built.mp3" title="🔊 past"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-16/cont-restored.mp3" title="🔊 continuous"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-16/pp-unveiled.mp3" title="🔊 present perfect"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-16/past-perf-moved.mp3" title="🔊 past perfect"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-16/future-excavated.mp3" title="🔊 future"></audio>

> The fresco **has been unveiled** before the ceremony.  
> The artefacts **had already been moved** when we arrived.

---

## 3. Vocabulario: History & heritage

![Heritage vocabulary](/blog/curso-b2/unit-16/heritage-vocab.png)

| Word | Idea |
| :--- | :--- |
| heritage / tradition | patrimonio / tradición |
| ruins / landmark | ruinas / monumento |
| restore / excavate | restaurar / excavar |
| manuscript / archive | manuscrito / archivo |
| artefact / fresco | artefacto / fresco |

---

## 4. Reading

![Heritage in context](/blog/curso-b2/unit-16/heritage-scene.png)

> Ancient monuments are visited by thousands every year. The castle was built in the twelfth century. The historic site is being restored right now. The artefacts had already been moved when we arrived.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-16/reading-u16.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-16/dialogue-u16.mp3" title="🔊 Dialogue"></audio>

> Old castle? — The castle was built in the twelfth century.  
> Still closed? — The historic site is being restored right now.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-16/practice-u16.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. Ancient monuments ___ (visit) every year. (present)  
2. The castle ___ (build) in the twelfth century. (past)  
3. The site ___ (restore) right now. (present continuous)  
4. The fresco ___ (unveil) already. (present perfect)  
5. Vocab: restos de edificios antiguos = ___

<details><summary>Ver solución</summary>

1. **are visited** · 2. **was built** · 3. **is being restored** · 4. **has been unveiled** · 5. **ruins**
</details>""",
            tip="En la pasiva, fija primero el **tiempo** y luego conjuga solo **be**; el past participle no cambia (*built / restored / unveiled*).",
            next_course="[Unidad 17 — Modal passive](/curso-b2/unit-17)",
            next_blog="[U17 — Modal passive + adventure](/blog/curso-b2/unidad-17-modal-passive-adventure)",
            guides=["[U15 Repaso](/blog/curso-b2/unidad-15-repaso-11-14)", "[Inglés B2](/blog/metodos/ingles-b2)"],
        ),
    )

    write_md(
        "unidad-17-modal-passive-adventure.md",
        article(
            slug="unidad-17-modal-passive-adventure",
            unit=17,
            title="Modal Passive B2: have something done + Adventure",
            description="Aprende modal passive (must/should be + V3) y have something done en inglés B2 con vocabulario de adventure & extreme sports. Guía Unidad 17 con audios.",
            image="/blog/curso-b2/unit-17/modal-passive-have-done.png",
            alt="Modal passive adventure B2",
            keywords=[
                "modal passive B2",
                "have something done",
                "must be done should have been",
                "adventure vocabulary B2",
                "inglés B2 unidad 17",
            ],
            related=["unidad-16-passive-all-tenses-heritage", "unidad-18-so-such-too-enough-food", HUB],
            faqs=[
                (
                    "¿Qué es modal passive?",
                    "**modal + be + past participle**: *Gear **must be tested**.* Para crítica del pasado: *should **have been** published*.",
                ),
                (
                    "¿Have something done?",
                    "Alguien hace la acción **por ti**: *I **had** my parachute **serviced**.* = *have / get + objeto + V3*.",
                ),
                (
                    "¿Must be vs should have been?",
                    "**must be** = obligación ahora. **should have been** = crítica sobre algo que no se hizo en el pasado.",
                ),
                ("¿Dónde practico?", "En la [Unidad 17 del curso B2](/curso-b2/unit-17)."),
            ],
            excerpt="Guía de la Unidad 17 del curso B2: modal passive, have something done y vocabulario de adventure.",
            intro="Tras la [pasiva en todos los tiempos](/blog/curso-b2/unidad-16-passive-all-tenses-heritage), la **Unidad 17** añade **modal passive** y **have something done** con vocabulario de **adventure & extreme sports**.",
            before="[U16 — Passive all tenses](/blog/curso-b2/unidad-16-passive-all-tenses-heritage)",
            learn=[
                "**must / should / ought to + be + V3**",
                "**should have been + V3** (crítica del pasado)",
                "**have / get + object + V3**",
                "Vocabulario: adventure & extreme sports",
            ],
            sections=r"""## 1. Modal passive vs have something done

| Estructura | Forma | Ejemplo |
| :--- | :--- | :--- |
| **Modal passive** | modal + be + V3 | Gear **must be tested**. |
| **Past criticism** | should have been + V3 | The report **should have been published**. |
| **Have sth done** | have + object + V3 | I **had** my parachute **serviced**. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-17/must-be-tested.mp3" title="🔊 must be"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-17/should-have-been.mp3" title="🔊 should have been"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-17/having-serviced.mp3" title="🔊 having done"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-17/had-repaired.mp3" title="🔊 had repaired"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-17/must-be-inspected.mp3" title="🔊 inspected"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-17/has-ropes-checked.mp3" title="🔊 ropes"></audio>

> She **had** her wetsuit **repaired** yesterday.  
> He **has** his climbing ropes **checked** every six months.

---

## 3. Vocabulario: Adventure & extreme sports

![Adventure vocabulary](/blog/curso-b2/unit-17/adventure-vocab.png)

| Word | Idea |
| :--- | :--- |
| harness / rope | arnés / cuerda |
| parachute / wetsuit | paracaídas / traje de neopreno |
| expedition / base camp | expedición / campamento base |
| gear / inspector | equipo / inspector |
| climb / jump / kayak | escalar / salto / kayak |

---

## 4. Reading

![Adventure in context](/blog/curso-b2/unit-17/adventure-scene.png)

> All climbing gear must be tested before the expedition. The safety report should have been published earlier. I am having my parachute serviced next week. She had her wetsuit repaired yesterday.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-17/reading-u17.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-17/dialogue-u17.mp3" title="🔊 Dialogue"></audio>

> Safe to climb? — Gear must be tested first.  
> Parachute ready? — I am having it serviced next week.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-17/practice-u17.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. Gear ___ (must / test) before the climb.  
2. The report ___ (should / publish) earlier. (past criticism)  
3. I ___ my parachute ___ next week. (have / service)  
4. She ___ her wetsuit ___ yesterday. (have / repair)  
5. Vocab: arnés = ___

<details><summary>Ver solución</summary>

1. **must be tested** · 2. **should have been published** · 3. **am having / serviced** · 4. **had / repaired** · 5. **harness**
</details>""",
            tip="Si **tú** no haces la acción y pagas/encargas a otro → *have something done*. Si hay obligación impersonal → *must/should **be** + V3*.",
            next_course="[Unidad 18 — So/such/too/enough](/curso-b2/unit-18)",
            next_blog="[U18 — So such too enough + cooking](/blog/curso-b2/unidad-18-so-such-too-enough-food)",
            guides=["[U16 Passive](/blog/curso-b2/unidad-16-passive-all-tenses-heritage)", "[Inglés B2](/blog/metodos/ingles-b2)"],
        ),
    )

    write_md(
        "unidad-18-so-such-too-enough-food.md",
        article(
            slug="unidad-18-so-such-too-enough-food",
            unit=18,
            title="So, Such, Too, Enough B2 + Cooking & Recipes",
            description="Aprende so/such/too/enough en inglés B2 con vocabulario de cooking & recipes. Guía Unidad 18 con audios y contrastes claros.",
            image="/blog/curso-b2/unit-18/so-such-too-enough.png",
            alt="So such too enough cooking B2",
            keywords=[
                "so such too enough B2",
                "so vs such English",
                "too vs enough",
                "cooking vocabulary B2",
                "inglés B2 unidad 18",
            ],
            related=["unidad-17-modal-passive-adventure", "unidad-19-advanced-comparatives-literature", HUB],
            faqs=[
                (
                    "¿So o such?",
                    "**so + adj/adv** (*so delicious*). **such (+ a) + noun** (*such a great class*, *such beautiful weather*).",
                ),
                (
                    "¿Too o enough?",
                    "**too** = exceso (*too hot **to** eat*). **enough** = cantidad/suficiencia (*enough time*, *skilled **enough***).",
                ),
                (
                    "¿Dónde va enough?",
                    "Antes del **sustantivo** (*enough flour*) y **después** del adjetivo (*experienced enough*).",
                ),
                ("¿Dónde practico?", "En la [Unidad 18 del curso B2](/curso-b2/unit-18)."),
            ],
            excerpt="Guía de la Unidad 18 del curso B2: so, such, too, enough y vocabulario de cooking.",
            intro="Tras [modal passive](/blog/curso-b2/unidad-17-modal-passive-adventure), la **Unidad 18** practica **so / such / too / enough** con vocabulario de **cooking & recipes**.",
            before="[U17 — Modal passive & adventure](/blog/curso-b2/unidad-17-modal-passive-adventure)",
            learn=[
                "**so + adjective/adverb (+ that)**",
                "**such (a) + noun (+ that)**",
                "**too + adjective + to**",
                "**enough** con sustantivos y adjetivos",
                "Vocabulario: cooking & recipes",
            ],
            sections=r"""## 1. So · such · too · enough

| Forma | Patrón | Ejemplo |
| :--- | :--- | :--- |
| **so** | so + adj/adv (+ that) | so delicious that… |
| **such** | such (a) + noun | such a great class |
| **too** | too + adj + to | too hot to eat |
| **enough** | enough + N · adj + enough | enough time · skilled enough |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-18/so-delicious.mp3" title="🔊 so"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-18/such-a-class.mp3" title="🔊 such"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-18/too-hot.mp3" title="🔊 too"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-18/enough-time.mp3" title="🔊 enough"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-18/so-many.mp3" title="🔊 so many"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-18/skilled-enough.mp3" title="🔊 enough adj"></audio>

> There were **so many** ingredients that we couldn't find them all.  
> He is experienced **enough** to run a professional kitchen.

---

## 3. Vocabulario: Cooking & recipes

![Cooking vocabulary](/blog/curso-b2/unit-18/cooking-vocab.png)

| Word | Idea |
| :--- | :--- |
| recipe / ingredient | receta / ingrediente |
| chop / whisk / bake | picar / batir / hornear |
| simmer / season / garnish | hervir a fuego lento / sazonar / decorar |
| dough / batter / soufflé | masa / rebozado / soufflé |

---

## 4. Reading

![Cooking in context](/blog/curso-b2/unit-18/cooking-scene.png)

> The cake was so delicious that we couldn't stop eating. It was such a great cooking class that we signed up again. The soup was too hot to eat immediately. We don't have enough time to finish the recipe.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-18/reading-u18.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-18/dialogue-u18.mp3" title="🔊 Dialogue"></audio>

> Good cake? — It was so delicious that we couldn't stop.  
> Ready to eat? — The soup is too hot right now.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-18/practice-u18.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. The cake was ___ delicious that we couldn't stop. (so / such)  
2. It was ___ a great class that we signed up again.  
3. The soup was ___ hot to eat.  
4. We don't have ___ time to finish.  
5. Vocab: receta = ___

<details><summary>Ver solución</summary>

1. **so** · 2. **such** · 3. **too** · 4. **enough** · 5. **recipe**
</details>""",
            tip="Pregunta: ¿modifico un **adjetivo** (*so hot*) o un **sustantivo** (*such a class*)? Eso decide *so* vs *such*.",
            next_course="[Unidad 19 — Advanced comparatives](/curso-b2/unit-19)",
            next_blog="[U19 — Advanced comparatives + literature](/blog/curso-b2/unidad-19-advanced-comparatives-literature)",
            guides=["[U17 Modal passive](/blog/curso-b2/unidad-17-modal-passive-adventure)", "[Inglés B2](/blog/metodos/ingles-b2)"],
        ),
    )

    write_md(
        "unidad-19-advanced-comparatives-literature.md",
        article(
            slug="unidad-19-advanced-comparatives-literature",
            unit=19,
            title="Advanced Comparatives B2: the…the… & Literature",
            description="Aprende comparativos y superlativos avanzados (much/far, by far, the more… the more) en inglés B2 con vocabulario de literature & books. Guía Unidad 19 con audios.",
            image="/blog/curso-b2/unit-19/advanced-comparatives.png",
            alt="Advanced comparatives literature B2",
            keywords=[
                "advanced comparatives B2",
                "the more the more",
                "by far superlative",
                "literature vocabulary B2",
                "inglés B2 unidad 19",
            ],
            related=["unidad-18-so-such-too-enough-food", "unidad-20-repaso-16-19", HUB],
            faqs=[
                (
                    "¿The more… the more…?",
                    "Dos comparativos en paralelo: ***The more** you read, **the better** you write.*",
                ),
                (
                    "¿Cómo intensifico un comparativo?",
                    "**much / far / a lot** (fuerte) · **slightly / a bit** (leve): *much more expensive*.",
                ),
                (
                    "¿By far?",
                    "Con **superlativos**: *This is **by far** the best novel.* = con diferencia.",
                ),
                ("¿Dónde practico?", "En la [Unidad 19 del curso B2](/curso-b2/unit-19)."),
            ],
            excerpt="Guía de la Unidad 19 del curso B2: comparativos avanzados y vocabulario de literature.",
            intro="Tras [so/such/too/enough](/blog/curso-b2/unidad-18-so-such-too-enough-food), la **Unidad 19** trabaja **comparativos y superlativos avanzados** con vocabulario de **literature & books**.",
            before="[U18 — So such too enough](/blog/curso-b2/unidad-18-so-such-too-enough-food)",
            learn=[
                "**the + comparative… the + comparative**",
                "Modificadores: **much / far / a lot / slightly / a bit**",
                "**by far** + superlative",
                "Vocabulario: literature & books",
            ],
            sections=r"""## 1. Comparativos avanzados

| Estructura | Uso | Ejemplo |
| :--- | :--- | :--- |
| **the… the…** | paralelo | The more you read, the better you write. |
| **much / far + comp.** | intensificar | much more expensive |
| **slightly / a bit + comp.** | matizar | slightly better |
| **by far + superl.** | el máximo | by far the best novel |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-19/the-more-the-better.mp3" title="🔊 the more"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-19/by-far-best.mp3" title="🔊 by far"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-19/much-more-expensive.mp3" title="🔊 much more"></audio>

---

## 2. Más ejemplos

<audio controls preload="none" src="/audio/blog/curso-b2/unit-19/the-longer-the-more.mp3" title="🔊 the longer"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-19/far-faster.mp3" title="🔊 far faster"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-19/slightly-better.mp3" title="🔊 slightly"></audio>

> The longer we waited for the sequel, the more excited we became.  
> She reads **far faster** than she did last year.

---

## 3. Vocabulario: Literature & books

![Literature vocabulary](/blog/curso-b2/unit-19/literature-vocab.png)

| Word | Idea |
| :--- | :--- |
| novel / paperback / edition | novela / bolsillo / edición |
| draft / sequel / chapter | borrador / secuela / capítulo |
| review / critique / shortlist | reseña / crítica / lista final |
| author / plot / translation | autor / trama / traducción |

---

## 4. Reading

![Literature in context](/blog/curso-b2/unit-19/literature-scene.png)

> The more you read, the better you write. This is by far the best novel we've ever read. This edition is much more expensive than the paperback. The longer we waited for the sequel, the more excited we became.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-19/reading-u19.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-19/dialogue-u19.mp3" title="🔊 Dialogue"></audio>

> Best book? — This is by far the best novel.  
> Reading tip? — The more you read, the better you write.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-19/practice-u19.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. ___ more you read, ___ better you write.  
2. This is ___ the best novel. (by far)  
3. This edition is ___ more expensive than the paperback. (much)  
4. The new version is ___ better. (slightly)  
5. Vocab: novela de bolsillo = ___

<details><summary>Ver solución</summary>

1. **The / the** · 2. **by far** · 3. **much** · 4. **slightly** · 5. **paperback**
</details>""",
            tip="En *the… the…*, ambos lados llevan **comparativo** (no superlativo): *the **more**… the **better**…*.",
            next_course="[Unidad 20 — Repaso 16–19](/curso-b2/unit-20)",
            next_blog="[U20 — Repaso 16–19](/blog/curso-b2/unidad-20-repaso-16-19)",
            guides=["[U18 So/such](/blog/curso-b2/unidad-18-so-such-too-enough-food)", "[Inglés B2](/blog/metodos/ingles-b2)"],
        ),
    )

    write_md(
        "unidad-20-repaso-16-19.md",
        article(
            slug="unidad-20-repaso-16-19",
            unit=20,
            title="Repaso B2 Unidades 16–19: Passive, Modals, So/Such & Comparatives",
            description="Repasa passive all tenses, modal passive, have something done, so/such/too/enough y comparativos avanzados del módulo 2 B2. Guía Unidad 20 con audios.",
            image="/blog/curso-b2/unit-20/review-map.png",
            alt="Repaso B2 unidades 16 a 19",
            keywords=[
                "repaso B2 unidades 16-19",
                "passive modal so such comparatives",
                "have something done review",
                "inglés B2 unidad 20",
            ],
            related=[
                "unidad-16-passive-all-tenses-heritage",
                "unidad-19-advanced-comparatives-literature",
                HUB,
            ],
            faqs=[
                (
                    "¿Qué repasa la U20?",
                    "Passive all tenses (U16), modal passive & have something done (U17), so/such/too/enough (U18) y comparativos avanzados (U19).",
                ),
                (
                    "¿Orden de estudio?",
                    "Repasa las tablas de cada unidad y luego los ejemplos mezclados de esta guía.",
                ),
                (
                    "¿Siguiente módulo?",
                    "Tras este repaso, el curso sigue con linkers y phrasal verbs (Unidad 21).",
                ),
                ("¿Dónde practico?", "En la [Unidad 20 del curso B2](/curso-b2/unit-20)."),
            ],
            excerpt="Guía de la Unidad 20 del curso B2: repaso integrado de las unidades 16–19.",
            intro="La **Unidad 20** integra [Passive all tenses](/blog/curso-b2/unidad-16-passive-all-tenses-heritage), [Modal passive](/blog/curso-b2/unidad-17-modal-passive-adventure), [So/such/too/enough](/blog/curso-b2/unidad-18-so-such-too-enough-food) y [Comparativos avanzados](/blog/curso-b2/unidad-19-advanced-comparatives-literature).",
            before="[U19 — Advanced comparatives](/blog/curso-b2/unidad-19-advanced-comparatives-literature)",
            learn=[
                "Repaso **passive (all tenses)**",
                "Repaso **modal passive + have something done**",
                "Repaso **so / such / too / enough**",
                "Repaso **the… the… / by far / much-far**",
                "Vocabulario: heritage · adventure · cooking · literature",
            ],
            sections=r"""## 1. Mapa del repaso

![Review map](/blog/curso-b2/unit-20/review-map.png)

| Unidad | Gramática | Vocab |
| :--- | :--- | :--- |
| **16** | passive all tenses | history & heritage |
| **17** | modal passive / have sth done | adventure |
| **18** | so / such / too / enough | cooking |
| **19** | advanced comparatives | literature |

---

## 2. Ejemplos mezclados

![Review examples](/blog/curso-b2/unit-20/review-examples.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-20/review-passive.mp3" title="🔊 passive"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-20/review-modal.mp3" title="🔊 modal"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-20/review-have-done.mp3" title="🔊 have done"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-20/review-so-such.mp3" title="🔊 so/such"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-20/review-comparative.mp3" title="🔊 comparative"></audio>

---

## 3. Reading

> The historic site is being restored. All climbing gear must be tested. I am having my parachute serviced. It was such a great cooking class that we signed up again. The more you read, the better you write.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-20/reading-mix.mp3" title="🔊 Reading"></audio>

---

## 4. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-20/dialogue-mix.mp3" title="🔊 Dialogue"></audio>

> Still closed? — The site is being restored.  
> Best tip? — The more you read, the better you write.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b2/unit-20/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios

1. The site ___ (restore) right now. (present continuous passive)  
2. Gear ___ (must / test) before the climb.  
3. I ___ my parachute ___ next week. (have / service)  
4. It was ___ a great class that we signed up again.  
5. ___ more you read, ___ better you write.

<details><summary>Ver solución</summary>

1. **is being restored** · 2. **must be tested** · 3. **am having / serviced** · 4. **such** · 5. **The / the**
</details>""",
            tip="En el repaso, identifica primero el **bloque** (pasiva / modal / so-such / comparativo) y después elige la forma.",
            next_course="[Unidad 21 — Linkers](/curso-b2/unit-21)",
            next_blog="[U16 Passive](/blog/curso-b2/unidad-16-passive-all-tenses-heritage) · [U19 Comparatives](/blog/curso-b2/unidad-19-advanced-comparatives-literature)",
            guides=[
                "[U16](/blog/curso-b2/unidad-16-passive-all-tenses-heritage)",
                "[U17](/blog/curso-b2/unidad-17-modal-passive-adventure)",
                "[U18](/blog/curso-b2/unidad-18-so-such-too-enough-food)",
                "[U19](/blog/curso-b2/unidad-19-advanced-comparatives-literature)",
            ],
        ),
    )


def main():
    diagrams()
    make_audios()
    write_articles()
    print("done B2 theory U16–20")


if __name__ == "__main__":
    main()
