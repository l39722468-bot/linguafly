#!/usr/bin/env python3
"""Generate B2 theory U26–30: diagrams, markdown and English TTS audio.

Module 3 rest: GET/GIVE/GO and LOOK/MAKE/PUT phrasal verbs, verb+noun
and adjective+noun collocations, followed by the U26–29 review.

The grammar and vocabulary in this generator mirror src/lib/course/b2.
Head commercial keywords remain on the course hub; these articles use
level- and topic-specific long-tail keywords.
"""
from __future__ import annotations

import re
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT_MD = ROOT / "src/content/blog/curso-b2"
DATE = "2026-08-31"
BG = (245, 248, 252)
INK = (20, 35, 55)
ACCENT = (15, 110, 140)
CARD = (255, 255, 255)
LINE = (200, 215, 230)
LEVEL_KW = ["curso inglés B2 gratis", "ejercicios inglés B2 gratis"]
HUB = "ingles-b2"


def font(size: int, bold: bool = False):
    candidates = [
        (
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
            if bold
            else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
        ),
        (
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
            if bold
            else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
        ),
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def canvas():
    img = Image.new("RGB", (1200, 675), BG)
    return img, ImageDraw.Draw(img)


def card(draw, xy):
    draw.rounded_rectangle(xy, radius=18, fill=CARD, outline=LINE, width=2)


def title(draw, text: str, y: int = 36):
    draw.text((48, y), text, fill=INK, font=font(34, True))


def wrapped(draw, text: str, xy: tuple[int, int], width: int, size: int = 18, bold: bool = False, fill=INK):
    """Draw predictable wrapped text; width is measured in approximate characters."""
    draw.multiline_text(xy, textwrap.fill(text, width=width), fill=fill, font=font(size, bold), spacing=8)


def save(img, unit: int, name: str):
    path = ROOT / f"public/blog/curso-b2/unit-{unit}" / name
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)
    print("img", path.relative_to(ROOT))


def vocab_grid(unit: int, name: str, heading: str, words: list[str]):
    img, draw = canvas()
    title(draw, heading)
    for index, word in enumerate(words[:12]):
        x = 48 + (index % 4) * 280
        y = 110 + (index // 4) * 170
        card(draw, (x, y, x + 250, y + 140))
        wrapped(draw, word, (x + 16, y + 48), 18, 18, True)
    save(img, unit, name)


def three_row_map(unit: int, name: str, heading: str, rows: list[tuple[str, str, str]]):
    img, draw = canvas()
    title(draw, heading)
    for index, (label, forms, example) in enumerate(rows):
        y = 110 + index * 170
        card(draw, (48, y, 1150, y + 150))
        draw.text((72, y + 24), label, fill=ACCENT, font=font(25, True))
        wrapped(draw, forms, (260, y + 22), 55, 19, True)
        wrapped(draw, example, (260, y + 80), 72, 17)
    save(img, unit, name)


def scene(unit: int, name: str, heading: str, examples: list[str]):
    img, draw = canvas()
    title(draw, heading)
    card(draw, (48, 105, 1150, 615))
    for index, example in enumerate(examples[:5]):
        wrapped(draw, f"{index + 1}. {example}", (80, 140 + index * 90), 86, 18)
    save(img, unit, name)


def diagrams():
    three_row_map(
        26,
        "phrasal-get-give-go.png",
        "Phrasal verbs 3: GET · GIVE · GO",
        [
            ("GET", "get over · get along · get through", "We got through a difficult transition."),
            ("GIVE", "give up · give in · give away", "Do not give up; change one habit at a time."),
            ("GO", "go through · go on · go off", "The alarm went off; the workshop went on."),
        ],
    )
    vocab_grid(
        26,
        "sustainability-vocab.png",
        "Sustainability & eco-living",
        [
            "zero waste",
            "recycle",
            "renewable energy",
            "carbon footprint",
            "compost",
            "eco-friendly",
            "sustainable",
            "reduce",
            "landfill",
            "reuse",
            "single-use plastic",
            "sustainable living",
        ],
    )
    scene(
        26,
        "eco-scene.png",
        "Eco-living in context",
        [
            "We get along with neighbours who share the compost bin.",
            "She got through a hard month without giving up.",
            "The council gave in and supported renewable energy.",
            "We went through every item before recycling it.",
            "The zero-waste workshop went off very well.",
        ],
    )

    three_row_map(
        27,
        "phrasal-look-make-put.png",
        "Phrasal verbs 4: LOOK · MAKE · PUT",
        [
            ("LOOK", "look into · forward to · after · for", "I am looking forward to the sold-out gig."),
            ("MAKE", "make up · up for · out · for · up one's mind", "We made for the venue after making up our minds."),
            ("PUT", "put off · put up at · put up with", "We put up at a hotel and put up with the noise."),
        ],
    )
    vocab_grid(
        27,
        "music-vocab.png",
        "Music & entertainment",
        [
            "venue",
            "gig",
            "band",
            "box office",
            "album",
            "festival",
            "rehearsal",
            "sold out",
            "tour",
            "backstage",
            "promoter",
            "audience",
        ],
    )
    scene(
        27,
        "music-scene.png",
        "A concert night in context",
        [
            "The promoter looked into a complaint before the gig.",
            "The band made up for the delay with an extra song.",
            "We could barely make out the lyrics from the back.",
            "Fans made for the box office when tickets went on sale.",
            "Nobody wanted to put off the sold-out festival.",
        ],
    )

    img, draw = canvas()
    title(draw, "Verb + noun collocations")
    groups = [
        ("MAKE", "a decision · a mistake · progress · an effort · a suggestion · a call"),
        ("TAKE", "a break · a photo · responsibility · a chance · a note"),
        ("HAVE", "a meeting · a look · a deadline · a shower"),
        ("MORE MAKE", "noise · a promise · a good impression"),
    ]
    for index, (label, items) in enumerate(groups):
        col, row = index % 2, index // 2
        x, y = 48 + col * 570, 115 + row * 245
        card(draw, (x, y, x + 530, y + 215))
        draw.text((x + 22, y + 26), label, fill=ACCENT, font=font(23, True))
        wrapped(draw, items, (x + 22, y + 82), 43, 18)
    save(img, 28, "collocations-verb-noun.png")
    vocab_grid(
        28,
        "food-vocab.png",
        "Food & gastronomy",
        [
            "recipe",
            "chef",
            "ingredients",
            "cuisine",
            "meal",
            "menu",
            "dish",
            "seasonal",
            "local produce",
            "kitchen",
            "flavour",
            "course",
        ],
    )
    scene(
        28,
        "food-scene.png",
        "Collocations in the kitchen",
        [
            "The chef made a decision after having a look at the menu.",
            "Take a note of the ingredients and make an effort to check them.",
            "We had a meeting because the blender was making noise.",
            "She took responsibility for the mistake and made progress.",
            "The local cuisine made a good impression on every guest.",
        ],
    )

    img, draw = canvas()
    title(draw, "Adjective + noun collocations")
    groups = [
        ("STRONG", "anxiety · belief · influence"),
        ("HEAVY", "burden · pressure"),
        ("GREAT", "progress · relief · success · interest"),
        ("PRECISE", "lively discussion · stunning results · high demand · full support"),
        ("DEPTH", "deep impact · remarkable memory · remarkable resilience"),
        ("FORMAL", "considerable controversy"),
    ]
    for index, (label, items) in enumerate(groups):
        col, row = index % 3, index // 3
        x, y = 48 + col * 375, 115 + row * 250
        card(draw, (x, y, x + 345, y + 220))
        draw.text((x + 20, y + 24), label, fill=ACCENT, font=font(21, True))
        wrapped(draw, items, (x + 20, y + 78), 27, 17)
    save(img, 29, "collocations-adj-noun.png")
    vocab_grid(
        29,
        "psychology-vocab.png",
        "Psychology & mind",
        [
            "anxiety",
            "burden",
            "belief",
            "pressure",
            "therapy",
            "mindset",
            "mental health",
            "resilience",
            "recovery",
            "support",
            "impact",
            "relief",
        ],
    )
    scene(
        29,
        "psychology-scene.png",
        "Psychology collocations in context",
        [
            "Heavy pressure can have a deep impact on mental health.",
            "Therapy brought great relief and stunning results.",
            "Her strong belief supported remarkable resilience.",
            "A lively discussion reflected great interest in recovery.",
            "High demand for care caused considerable controversy.",
        ],
    )

    img, draw = canvas()
    title(draw, "Repaso B2 · Unidades 26–29")
    blocks = [
        ("U26", "GET · GIVE · GO", "Sustainability"),
        ("U27", "LOOK · MAKE · PUT", "Music"),
        ("U28", "Verb + noun", "Food"),
        ("U29", "Adjective + noun", "Psychology"),
    ]
    for index, (unit, grammar, vocabulary) in enumerate(blocks):
        col, row = index % 2, index // 2
        x, y = 48 + col * 570, 110 + row * 250
        card(draw, (x, y, x + 530, y + 220))
        draw.text((x + 24, y + 26), unit, fill=ACCENT, font=font(26, True))
        wrapped(draw, grammar, (x + 24, y + 90), 38, 21, True)
        wrapped(draw, vocabulary, (x + 24, y + 145), 40, 18)
    save(img, 30, "review-map.png")
    scene(
        30,
        "review-examples.png",
        "Four systems, one connected story",
        [
            "We got through the eco transition without giving up.",
            "The promoter looked into the delay and made up for it.",
            "The chef took responsibility and made a good impression.",
            "Full support produced great progress and remarkable resilience.",
            "Now make a decision: phrasal verb or collocation?",
        ],
    )


AUDIOS = {
    26: {
        "get-over": "She got over her fear of changing her daily habits.",
        "get-along": "We get along well with our eco-friendly neighbours.",
        "get-through": "I could not get through on the phone, but we got through the difficult week.",
        "give-contrast": "Do not give up. Do not give in to pressure. Give away the jars you do not reuse.",
        "go-contrast": "The alarm went off, the meeting went on, and the workshop went off very well.",
        "reading-u26": (
            "Lena wanted a zero-waste home, but the first month was difficult. She got along with neighbours "
            "who shared a compost bin, and their advice helped her get through the transition. She gave away "
            "unused containers instead of sending them to landfill. When relatives asked her to give up, she "
            "did not give in. She went through every purchase carefully, reduced single-use plastic, and chose "
            "renewable energy. Her first community workshop went off well, even though an alarm went off halfway through."
        ),
        "dialogue-u26": (
            "How is sustainable living going? I am getting through the difficult stage. "
            "Do you get along with the neighbours? Yes, we share compost. "
            "Did you give up plastic? I reduced it, but I did not give in to perfectionism. "
            "What did you give away? Reusable jars I did not need. "
            "How did the workshop go off? Very well, although the fire alarm went off."
        ),
        "practice-u26": (
            "Get over. Get along. Get through. Give up. Give in. Give away. "
            "Go through. Go on. Go off. Carbon footprint. Compost. Renewable energy."
        ),
    },
    27: {
        "look-group": "Look into the complaint. Look after the instruments. Look for the tickets. Look forward to the festival.",
        "make-up": "The singer made up an excuse, but an extra song made up for the delay.",
        "make-out-for": "I could not make out the lyrics, so I made for the front of the venue.",
        "make-up-mind": "We made up our minds and booked the last two tickets.",
        "put-group": "Do not put off the gig. We put up at a hotel and put up with the street noise.",
        "reading-u27": (
            "Mara was looking forward to a festival, but she could not find her ticket. The promoter looked into "
            "the booking while Mara looked after the band's instruments. A singer made up a story about the delay, "
            "then made up for it with an acoustic song. From backstage, Mara could hardly make out the announcement. "
            "She made up her mind and made for the box office. The gig was not put off, so the audience put up with "
            "a short wait before a brilliant sold-out show."
        ),
        "dialogue-u27": (
            "Are you looking forward to the gig? Absolutely. Have you found the tickets? "
            "No, the box office is looking into it. Who is looking after the instruments? The band manager. "
            "Can you make out the announcement? Barely. Shall we make for the entrance? Yes. "
            "Where are we staying? We are putting up at the hotel opposite the venue."
        ),
        "practice-u27": (
            "Look into. Look forward to. Look after. Look for. Make up. Make up for. "
            "Make out. Make for. Make up your mind. Put off. Put up at. Put up with."
        ),
    },
    28: {
        "make-group": "Make a decision. Make a mistake. Make progress. Make an effort. Make a suggestion.",
        "take-group": "Take a break. Take a photo. Take responsibility. Take a chance. Take a note.",
        "have-group": "Have a meeting. Have a look. Have a deadline. Have a shower.",
        "more-make": "Make a call. Make noise. Make a promise. Make a good impression.",
        "food-vocabulary": "Recipe. Chef. Ingredients. Cuisine. Meal. Menu.",
        "reading-u28": (
            "Chef Amira had a meeting about a new seasonal menu. She made a suggestion, took responsibility for "
            "testing the recipe, and made an effort to source local ingredients. After having a look at the first "
            "dish, she made a decision to take a chance on a regional cuisine. One assistant made a mistake, but "
            "the team took a note, made progress, and kept its promise. At the evening meal, the menu made a good "
            "impression, so Amira took a photo before taking a well-earned break."
        ),
        "dialogue-u28": (
            "Can we have a meeting about the menu? Yes, but I have a deadline. "
            "Have a look at this recipe first. Did I make a mistake? Only a small one. "
            "Shall we take a chance on local ingredients? Good suggestion. "
            "Who will take responsibility? I will, and I will make a call to the supplier. "
            "Then take a break. You have made great progress."
        ),
        "practice-u28": (
            "Make a decision. Take a break. Have a look. Make a mistake. Take responsibility. "
            "Have a meeting. Make progress. Take a chance. Make a promise. Make a good impression."
        ),
    },
    29: {
        "strong-heavy": "Strong anxiety. Strong belief. Strong influence. Heavy burden. Heavy pressure.",
        "great-group": "Great progress. Great relief. Great success. Great interest.",
        "precision-group": "A lively discussion. Stunning results. High demand. Full support. A deep impact.",
        "remarkable-group": "A remarkable memory. Remarkable resilience. Considerable controversy.",
        "psychology-vocabulary": "Anxiety. Burden. Belief. Pressure. Therapy. Mindset. Mental health. Resilience. Recovery.",
        "reading-u29": (
            "Noah faced heavy pressure at work, and strong anxiety became a heavy burden. Therapy had a deep impact "
            "on his mindset. With full support from his family, he made great progress and felt great relief. A lively "
            "discussion about mental health gave him a strong belief in recovery. The programme showed stunning results "
            "and remarkable success. Although high demand caused considerable controversy, Noah's remarkable resilience "
            "became a strong influence on his colleagues."
        ),
        "dialogue-u29": (
            "Was there heavy pressure at work? Yes, and I felt strong anxiety. "
            "Did therapy help? It had a deep impact. What changed? My mindset and my recovery. "
            "Did your family help? Their full support brought great relief. "
            "Any results? Great progress and remarkable resilience. "
            "Why the debate? High demand caused considerable controversy."
        ),
        "practice-u29": (
            "Strong anxiety. Heavy burden. Strong belief. Heavy pressure. Great progress. "
            "Lively discussion. Stunning results. Great relief. High demand. Full support. Remarkable resilience."
        ),
    },
    30: {
        "review-u26": "Get through the transition. Do not give up. Go through the options. The event went off well.",
        "review-u27": "Look into the booking. Make up for the delay. Make for the venue. Do not put off the gig.",
        "review-u28": "Make a decision. Take responsibility. Have a look. Make a good impression.",
        "review-u29": "Heavy pressure. Great progress. Full support. Remarkable resilience.",
        "mixed-review": "We got through the week, looked into the problem, made a decision, and achieved great success.",
        "reading-u30": (
            "A community planned a sustainable food and music festival. The team went through every supplier and "
            "looked into renewable energy. They did not give up when the original venue put off the booking. The chef "
            "took responsibility for a local menu and made an effort to reuse ingredients. A promoter made up for the "
            "delay with an extra band. Heavy pressure caused strong anxiety, but full support produced great progress. "
            "In the end, the event went off well and made a deep impact on the audience."
        ),
        "dialogue-u30": (
            "Did you get through the planning stage? Yes, although we nearly gave up. "
            "Who looked into the venue? The promoter, who made up for the delay. "
            "Did the chef take responsibility? Yes, after having a look at the menu. "
            "Was there heavy pressure? Yes, but full support brought great relief. "
            "How did the festival go off? It was a great success."
        ),
        "practice-u30": (
            "Get, give, go. Look, make, put. Make, take, have. Strong, heavy, great, remarkable. "
            "Choose the complete chunk before you complete the sentence."
        ),
    },
}


def tts():
    for unit, clips in AUDIOS.items():
        directory = ROOT / f"public/audio/blog/curso-b2/unit-{unit}"
        directory.mkdir(parents=True, exist_ok=True)
        for name, text in clips.items():
            path = directory / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def write_md(name: str, body: str) -> None:
    path = OUT_MD / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(body if body.endswith("\n") else body + "\n", encoding="utf-8")
    print("md", path.relative_to(ROOT))


def article(**kw) -> str:
    keywords = "\n".join(f"  - {keyword}" for keyword in kw["keywords"] + LEVEL_KW)
    related = "\n".join(f"  - {route}" for route in kw["related"])
    faq_yaml = "\n".join(
        f"  - question: {question}\n    answer: >-\n      {answer}"
        for question, answer in kw["faqs"]
    )
    learn = "\n".join(f"- {item}" for item in kw["learn"])
    guides = "\n".join(f"- {guide}" for guide in kw["guides"])
    faq_body = "\n\n".join(
        f"### {question}\n\n{answer}" for question, answer in kw["faqs"]
    )
    return f"""---
category: curso-b2
date: '{DATE}'
updatedDate: '{DATE}'
author: linguafly-team
title: "{kw["title"]}"
description: >-
  {kw["description"]}
readTime: {kw.get("readTime", "24 min")}
keywords:
{keywords}
canonical: 'https://linguafly.app/blog/curso-b2/{kw["slug"]}'
image: {kw["image"]}
alt: "{kw["alt"]}"
related_routes:
{related}
faqs:
{faq_yaml}
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

## Preguntas frecuentes

{faq_body}

---

## Fuentes

{kw["sources"]}
"""


def _ex_block(items: list[tuple[str, str]]) -> str:
    """Build numbered, concrete exercises with collapsible solutions."""
    blocks = []
    for index, (question, answer) in enumerate(items, 1):
        blocks.append(
            f"""### Ejercicio {index}

{question}

<details><summary>Ver solución</summary>

{answer}
</details>"""
        )
    return "\n\n".join(blocks)


def learning_lab(unit: int, theme: str, targets: str, contrast: str, production: str) -> str:
    """Shared long-form practice guidance, personalised for each unit."""
    return f"""## 9. Del reconocimiento al uso activo

Reconocer una respuesta en una lista no demuestra todavía dominio B2. En una actividad de opción múltiple, las alternativas te recuerdan qué palabras existen; en una conversación real no aparece ese apoyo. Para convertir **{targets}** en lenguaje disponible, trabaja en tres vueltas. Primero lee los ejemplos completos y explica en español por qué esa combinación encaja. Después tapa la expresión y reconstruye la frase. Por último cambia el sujeto, el tiempo verbal y un detalle del contexto de **{theme}**. Si la estructura sobrevive a esos cambios, ya no estás repitiendo una línea de memoria.

La segunda vuelta debe incluir contraste. Pon juntas dos opciones que suelen competir: **{contrast}**. Escribe una frase correcta con cada una y añade una tercera frase deliberadamente incorrecta. Al corregir tu propio error tienes que formular la regla, no limitarte a decir “suena mejor”. Esa explicación breve —qué significa, qué complemento admite y qué escena sugiere— fortalece la recuperación. También ayuda a detectar interferencias del español, porque obliga a observar la combinación inglesa completa.

Trabaja siempre con **chunks**, no con palabras sueltas. Un chunk puede incluir verbo y partícula, verbo y sustantivo, o adjetivo y sustantivo. Añade además una pista de contexto: persona, lugar, resultado o emoción. Por ejemplo, una tarjeta eficaz no muestra solo el término inglés; muestra una pregunta delante y una frase natural detrás. Lee la frase en voz alta dos veces: una despacio para articular y otra a velocidad conversacional. El audio de práctica sirve para comparar ritmo, no para imitar un acento perfecto.

Cuando te equivoques, clasifica el fallo. Puede ser de **significado** (elegiste una idea distinta), de **forma** (faltó una partícula o cambiaste el verbo), de **gramática** (tiempo, pronombre u orden) o de **registro** (la opción existe pero no suena natural aquí). Anota solo la corrección mínima y un ejemplo nuevo. Copiar diez veces la misma frase produce familiaridad visual; crear un ejemplo diferente produce control. En B2 interesa poder adaptar la expresión a una situación nueva.

## 10. Rutina guiada de veinte minutos

Empieza con cuatro minutos de escucha. Reproduce los clips breves de la unidad sin leer, escribe las combinaciones que reconozcas y luego comprueba la ortografía en las tablas. No pauses después de cada palabra: intenta captar el grupo completo. En la segunda escucha, repite con una pequeña demora. Esa técnica de *shadowing* te muestra dónde rompes una expresión que debería pronunciarse como una unidad.

Dedica seis minutos a recuperación escrita. Dibuja tres columnas: **forma**, **idea** y **ejemplo de {theme}**. Completa la primera columna de memoria; después añade una traducción funcional, no necesariamente literal, y una frase concreta. Marca con un asterisco las expresiones que no pudiste producir sin ayuda. En la sesión siguiente empieza por ellas. Así el repaso responde a tus errores reales en vez de repartir el tiempo por igual.

Usa otros cinco minutos para transformación. Cambia una afirmación a negativa, una frase presente a pasado y un ejemplo personal a una pregunta. Si el objetivo lleva partícula o una pareja fija, comprueba que no se pierde durante la transformación. Luego combina dos objetivos en una sola frase con *although, because, so* o *as a result*. Integrar gramática conocida evita que el vocabulario nuevo viva aislado en una lista artificial.

Termina con cinco minutos de producción: **{production}**. Grábate sin leer y escucha una vez con una rúbrica sencilla: precisión del chunk, claridad del mensaje, variedad y autocorrección. No reinicies la grabación por un error; corrígelo dentro del discurso con *I mean…* o repitiendo la frase bien. Esa reparación es una destreza comunicativa real. Una producción de sesenta segundos clara y revisada vale más que cinco minutos improvisados sin objetivo.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-{unit}/practice-u{unit}.mp3" title="🔊 Práctica guiada Unidad {unit}"></audio>

## 11. Autoevaluación antes de avanzar

Haz tres pruebas sin mirar las tablas. Primera: define cada expresión principal con palabras sencillas en inglés o español. Segunda: completa un ejemplo donde no aparezca el vocabulario temático original; eso confirma que entiendes la estructura y no una frase congelada. Tercera: vuelve al reading, localiza los objetivos y explica qué alternativa cambiaría el sentido. Si fallas más de una tercera parte, repite solo el grupo débil y vuelve a probar al día siguiente.

Una respuesta se considera sólida cuando es **completa, natural y justificable**. Completa significa que no falta ninguna partícula o palabra de la colocación. Natural significa que la combinación es la preferida en ese contexto, aunque otra traducción literal parezca posible. Justificable significa que puedes explicar la elección con una diferencia concreta. No persigas una perfección imposible: busca consistencia en las formas nucleares del curso.

Usa este checklist al revisar:

- [ ] Produzco las expresiones completas, sin partículas perdidas.
- [ ] Distingo las parejas que comparten una traducción española.
- [ ] Puedo cambiar tiempo, persona y contexto sin romper el chunk.
- [ ] Entiendo el reading y el diálogo sin depender de la traducción.
- [ ] Creo un ejemplo propio relacionado con **{theme}**.
- [ ] Corrijo un error explicando por qué, no solo copiando la solución.

El último paso es el repaso espaciado: vuelve a estas expresiones mañana, dentro de tres días y una semana después. En cada sesión reduce el apoyo. Hoy puedes usar tablas; mañana, solo palabras clave; la semana siguiente, únicamente una situación comunicativa. La dificultad creciente hace visible el progreso y evita confundir “lo acabo de leer” con “puedo usarlo”."""


def body_word_count(markdown: str) -> int:
    body = markdown.split("---", 2)[2]
    return len(re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:['’][A-Za-z]+)?", body))


def write_checked(name: str, markdown: str) -> None:
    count = body_word_count(markdown)
    if count < 2000:
        raise ValueError(f"{name}: only {count} body words; minimum is 2000")
    write_md(name, markdown)
    print("words", name, count)


def build_u26() -> tuple[str, str]:
    slug = "unidad-26-phrasal-verbs-3-sustainability"
    sections = r"""## 1. Un mapa con tres verbos base

La Unidad 26 continúa el trabajo de phrasal verbs, pero cambia el escenario: ahora hablamos de **sustainability & eco-living**. El mapa se organiza alrededor de **GET, GIVE y GO**. Estudiarlos por familias te permite comparar partículas y evita una lista de nueve traducciones desconectadas. Aun así, compartir verbo base no significa compartir significado: la combinación completa es la unidad real.

![Mapa de phrasal verbs GET GIVE GO](/blog/curso-b2/unit-26/phrasal-get-give-go.png)

Construye una historia lógica: una familia intenta reducir su *carbon footprint*, **gets through** una transición difícil, no **gives up**, **goes through** sus compras y organiza un taller que **goes off** well. Esa secuencia conecta forma y significado. Después sustituye familia por escuela, empresa o barrio. Así compruebas que sabes trasladar los phrasals a otro contexto.

No intentes traducir siempre *get* como «obtener», *give* como «dar» o *go* como «ir». En *get over a fear*, *give in to pressure* y *go through a list*, la partícula cambia la idea. Aprende también la preposición posterior cuando forma parte del patrón: **get along with** somebody y **give in to** pressure.

---

## 2. GET: over, along y through

| Phrasal | Uso principal | Ejemplo |
| :--- | :--- | :--- |
| **get over** | recuperarse de / superar algo que afectaba | She **got over** her fear of composting. |
| **get along with** | llevarse bien con alguien | We **get along with** our eco-friendly neighbours. |
| **get through** | lograr contactar | I couldn't **get through** to the recycling centre. |
| **get through** | superar o terminar un periodo/tarea difícil | We **got through** the zero-waste transition. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-26/get-over.mp3" title="🔊 get over"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-26/get-along.mp3" title="🔊 get along"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-26/get-through.mp3" title="🔊 get through: contacto y periodo difícil"></audio>

**Get over** mira hacia la recuperación: había un miedo, una enfermedad, una decepción o un obstáculo emocional y deja de dominarte. **Get through** mira hacia el recorrido completo: un periodo duro, una tarea larga o una situación exigente llega a su fin. En español ambos pueden convertirse en «superar», pero la imagen inglesa no es idéntica. *She got over her fear* señala que el miedo perdió fuerza; *she got through a difficult month* señala que consiguió llegar al otro lado del mes.

El otro sentido imprescindible de **get through** es «lograr contactar», sobre todo por teléfono: *I tried three times, but I couldn't get through to the council*. El complemento suele aparecer con **to**. No hay un periodo que terminar; hay una línea ocupada o una persona que no responde. Mira el contexto antes de elegir una traducción.

**Get along** necesita normalmente **with** para presentar a la persona o grupo: *Our neighbours get along with the volunteers*. También existe *How are you getting along?* con la idea de «¿cómo vas?», pero el curso se centra en la relación positiva. Crea dos ejemplos sostenibles: convivencia al compartir un *compost bin* y colaboración en una campaña para reducir plástico.

---

## 3. GIVE: up, in y away

| Phrasal | Núcleo de significado | Ejemplo eco |
| :--- | :--- | :--- |
| **give up** | abandonar una actividad o dejar de intentarlo | Don't **give up** on sustainable living. |
| **give in** | ceder ante presión o resistencia | The council finally **gave in** to public pressure. |
| **give away** | regalar / revelar sin querer | We **gave away** reusable jars. / His smile **gave away** the surprise. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-26/give-contrast.mp3" title="🔊 give up, give in, give away"></audio>

La diferencia entre **give up** y **give in** merece atención. Si abandonas el reto de cero residuos porque ya no quieres continuar, you **give up the challenge** o **give up trying**. Si continúas teniendo una postura, pero la presión de otras personas te hace ceder, you **give in to pressure**. En el primer caso cesa el esfuerzo; en el segundo una resistencia pierde frente a otra fuerza. Una persona puede *give in* en una discusión sin *giving up* todo su proyecto.

**Give up** admite nombre o forma *-ing*: *give up single-use plastic* y *give up buying bottled water*. Con personas o causas aparece **give up on**: *Don't give up on the community project*. **Give in** suele combinarse con **to**: *give in to pressure / demands / temptation*. Aprender estas colas evita frases incompletas.

**Give away** tiene un sentido concreto y uno informativo. Puedes regalar objetos que ya no utilizas en vez de enviarlos al *landfill*: *give away clothes or glass jars*. También puedes revelar un secreto por accidente: *The poster gave away the surprise before the launch*. El objeto puede colocarse en medio si es pronombre: *give them away*, no *give away them*.

---

## 4. GO: through, on y off

| Phrasal | Significado | Ejemplo |
| :--- | :--- | :--- |
| **go through** | experimentar un proceso difícil | The community **went through** major changes. |
| **go through** | revisar uno por uno | We **went through** the recycling rules. |
| **go on** | continuar / durar | The workshop **went on** until eight. |
| **go off** | sonar una alarma | The fire alarm **went off** at six. |
| **go off** | desarrollarse un evento, especialmente *go off well* | The eco fair **went off** well. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-26/go-contrast.mp3" title="🔊 go through, go on, go off"></audio>

**Go through** comparte con *get through* la imagen de atravesar algo, pero no son intercambiables en todos los marcos. *We went through a difficult transition* describe la experiencia; *we got through the transition* subraya que logramos completarla. Además, *go through a list, document or options* significa revisarlos con atención. Para decidir, pregunta: ¿cuento lo vivido, reviso elementos o celebro que conseguí terminar?

**Go on** conserva la idea de continuidad: una reunión, debate o proyecto sigue. Puede aparecer sin complemento (*Please go on*) o con *with*: *go on with the presentation*. En cambio, **go off** exige leer la escena. Una alarma que *goes off* empieza a sonar. Un evento que *goes off well* sale bien. Son sentidos casi opuestos desde la perspectiva española, pero el sustantivo y el adverbio eliminan la ambigüedad.

No reduzcas *go off* a «explotar». Ese sentido existe para bombas, y también puede significar que comida se estropea en inglés británico, pero los dos usos que evalúa esta unidad son **alarma que suena** y **evento que sale de cierta manera**. Practica la pareja completa: *The alarm went off, but the workshop went off without a problem.*

---

## 5. Vocabulario: Sustainability & eco-living

![Vocabulario de sostenibilidad y vida ecológica](/blog/curso-b2/unit-26/sustainability-vocab.png)

| Expresión | Significado funcional | Ejemplo natural |
| :--- | :--- | :--- |
| **zero waste** | objetivo de no generar residuos | A **zero-waste** shop avoids unnecessary packaging. |
| **recycle** | transformar materiales usados | We **recycle** paper, glass and metal. |
| **renewable energy** | energía de fuentes que se renuevan | The building uses **renewable energy**. |
| **carbon footprint** | emisiones asociadas a actividades | Cycling can reduce your **carbon footprint**. |
| **compost** | materia orgánica convertida en abono | Food scraps become **compost**. |
| **eco-friendly** | que causa menos daño ambiental | Choose an **eco-friendly** cleaning product. |
| **sustainable** | viable sin agotar recursos | Public transport is a more **sustainable** option. |
| **reduce** | usar o producir menos | We need to **reduce** household waste. |
| **landfill** | vertedero donde se deposita basura | Too much reusable material reaches **landfill**. |
| **reuse** | volver a usar sin transformar | Wash and **reuse** the container. |
| **single-use plastic** | plástico diseñado para un solo uso | The café stopped using **single-use plastic**. |
| **sustainable living** | estilo de vida de menor impacto | **Sustainable living** begins with realistic habits. |

Hay tres verbos que suelen mezclarse: **reduce** significa consumir menos desde el principio; **reuse**, volver a usar el mismo objeto; **recycle**, procesar el material para fabricar algo nuevo. El orden ambiental habitual también tiene sentido lingüístico: primero *reduce*, luego *reuse* y por último *recycle*. No uses *recycle* como etiqueta universal para cualquier acción ecológica.

*Sustainable* describe algo que puede mantenerse con menor impacto; *eco-friendly* destaca que un producto, decisión o práctica respeta más el medioambiente. Son cercanos, pero no idénticos. Una campaña puede promover *sustainable living* y recomendar *eco-friendly products*. Usa **carbon footprint** para hablar del efecto total de transporte, energía y consumo, no solo de basura visible.

---

## 6. Reading: A realistic zero-waste transition

![Escena de vida sostenible con phrasal verbs](/blog/curso-b2/unit-26/eco-scene.png)

> Lena wanted a zero-waste home, but the first month was difficult. She **got along with** neighbours who shared a compost bin, and their advice helped her **get through** the transition. She **gave away** unused containers instead of sending them to landfill. When relatives asked her to **give up**, she did not **give in**. She **went through** every purchase carefully, reduced single-use plastic, and chose renewable energy. Her first community workshop **went off** well, even though an alarm **went off** halfway through.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-26/reading-u26.mp3" title="🔊 Reading Unidad 26"></audio>

Lee una vez para entender la historia y otra para clasificar. Hay una relación personal, un periodo difícil, un regalo, resistencia ante presión, una revisión y dos sentidos de *go off*. Explica por qué *got over the transition* cambiaría el enfoque y por qué *gave up to relatives* no expresa correctamente «ceder ante familiares». Después sustituye *Lena* por *a local school* y adapta pronombres y vocabulario.

El texto evita presentar la sostenibilidad como perfección inmediata. Esa idea también ayuda a memorizar: Lena no abandona, atraviesa la etapa difícil y revisa decisiones concretas. Resume el reading en cuatro frases sin copiarlo, incluyendo al menos un GET, un GIVE y un GO.

---

## 7. Diálogo: The neighbourhood project

<audio controls preload="none" src="/audio/blog/curso-b2/unit-26/dialogue-u26.mp3" title="🔊 Diálogo Unidad 26"></audio>

> **A:** How is sustainable living going?  
> **B:** I'm **getting through** the difficult stage.  
> **A:** Do you **get along with** the neighbours?  
> **B:** Yes, we share compost.  
> **A:** Did you **give up** plastic?  
> **B:** I reduced it, but I didn't **give in** to perfectionism.  
> **A:** What did you **give away**?  
> **B:** Reusable jars I didn't need.  
> **A:** How did the workshop **go off**?  
> **B:** Very well, although the fire alarm **went off**.

Representa el diálogo con dos voces y cambia tres datos: el proyecto, el objeto regalado y el problema del taller. Mantén intactos los phrasals. Luego invierte la tarea: conserva la historia y sustituye un phrasal por una explicación sencilla, para que tu compañero adivine la combinación exacta.

---

## 8. Errores típicos y decisiones rápidas

| Error o confusión | Corrección razonada |
| :--- | :--- |
| *I got over a difficult week* cuando importa terminarla | I **got through** a difficult week. |
| *I couldn't get through the problem by phone* | I couldn't **get through to** the council by phone. |
| *They gave up to pressure* | They **gave in to** pressure. |
| *Don't give in your project* | Don't **give up on** your project. |
| *Give away them* | **Give them away**. |
| *We went through with our neighbours* por «nos llevamos bien» | We **got along with** our neighbours. |
| *The alarm went on* por «sonó» | The alarm **went off**. |
| *The event went off* sin decir cómo | The event **went off well / smoothly**. |

El procedimiento rápido es localizar primero el tipo de sujeto y objeto. ¿Hay persona y relación? *get along with*. ¿Hay teléfono? *get through to*. ¿Hay presión? *give in to*. ¿Hay abandono de esfuerzo? *give up*. ¿Hay lista u opciones? *go through*. ¿Hay alarma o evaluación de un evento? *go off*. Las pistas semánticas son más fiables que una traducción aislada.

""" + learning_lab(
        26,
        "sustainability & eco-living",
        "GET/GIVE/GO y el vocabulario de sostenibilidad",
        "get over frente a get through; give up frente a give in; los dos sentidos de go off",
        "explica un cambio sostenible realista durante noventa segundos usando seis phrasals y ocho palabras del tema",
    ) + r"""

---

## 12. Ejercicios prácticos con soluciones

""" + _ex_block(
        [
            (
                "Completa con el phrasal correcto: *After two difficult months, the family finally ______ the zero-waste transition.*",
                "**got through**. La frase destaca que consiguió completar un periodo difícil.",
            ),
            (
                "Elige y justifica: *I called the recycling centre three times, but I couldn't (get over / get through / get along).*",
                "**get through**. En una llamada significa «lograr contactar»; también puede añadirse *to the recycling centre*.",
            ),
            (
                "Completa las dos frases con opciones distintas: *Don't ______ the project. Don't ______ to pressure from impatient neighbours.*",
                "Don't **give up** the project. Don't **give in** to pressure. Abandonar no es lo mismo que ceder.",
            ),
            (
                "Reescribe con pronombre: *We gave away the reusable bottles we did not need.*",
                "We **gave them away**. El pronombre objeto se coloca entre verbo y partícula.",
            ),
            (
                "Completa: *Before installing solar panels, we ______ every available option carefully.*",
                "**went through**. Aquí significa revisar elemento por elemento.",
            ),
            (
                "Escribe las dos formas de *go off*: *The alarm ______ at seven, but the eco fair ______ very well.*",
                "The alarm **went off** at seven, but the eco fair **went off** very well.",
            ),
            (
                "Corrige: *Our building gets along the volunteers from the compost project.*",
                "Our building residents **get along with** the volunteers from the compost project. Falta **with** y conviene un sujeto humano.",
            ),
            (
                "Clasifica *reduce, reuse, recycle*: comprar menos envases; rellenar un tarro; transformar papel usado.",
                "**reduce** = comprar menos envases; **reuse** = rellenar el tarro; **recycle** = transformar el papel.",
            ),
            (
                "En el reading, ¿qué dos acontecimientos se describen con *went off* y qué significa cada uso?",
                "El **workshop went off well** (salió bien) y una **alarm went off** (sonó). El contexto desambigua.",
            ),
            (
                "Producción controlada: escribe 100–120 palabras sobre un reto sostenible con *get through, give up, give in, go through* y *go off* en uno de sus sentidos.",
                "Respuesta abierta. Comprueba cinco formas completas, una diferencia clara entre **give up/give in**, al menos seis palabras de sostenibilidad y tiempos verbales coherentes.",
            ),
        ]
    )
    return slug, sections


def build_u27() -> tuple[str, str]:
    slug = "unidad-27-phrasal-verbs-4-music"
    sections = r"""## 1. LOOK, MAKE y PUT dentro de una noche de concierto

Esta familia parece extensa porque **MAKE** reúne varios significados, pero una escena de concierto los ordena. Antes del evento, alguien **looks into** una incidencia, tú **look for** las entradas y **look forward to** ver a la banda. Durante la espera, otra persona **looks after** los instrumentos. Cuando abren puertas, los fans **make for** la entrada; si no oyen bien, intentan **make out** el anuncio. Quizá el promotor **makes up for** un retraso. Si cambia el horario, el concierto se **puts off**; si viajáis, podéis **put up at** un hotel y **put up with** el ruido.

![Mapa de phrasal verbs LOOK MAKE PUT](/blog/curso-b2/unit-27/phrasal-look-make-put.png)

Cuenta esa secuencia con tus propias palabras antes de estudiar las tablas. No importa que falten formas; la actividad revela qué asociaciones ya tienes. Después vuelve al mapa y añade los huecos. Al final de la unidad deberías poder reconstruir la misma noche desde la perspectiva del público, de la banda o del promotor.

La partícula no es opcional. *Look the complaint* no equivale a investigar, *make for the venue* no significa fabricar nada y *put with the noise* está incompleto. Aprende forma, complemento y escena juntos. Presta especial atención a **to** en *look forward to*: aquí es preposición y puede ir seguida de nombre o verbo en *-ing*.

---

## 2. LOOK: into, forward to, after y for

| Phrasal | Significado | Ejemplo musical |
| :--- | :--- | :--- |
| **look into** | investigar un asunto | The manager **looked into** the noise complaint. |
| **look forward to** | esperar algo con ilusión | We're **looking forward to** the festival. |
| **look after** | cuidar de algo o alguien | Can you **look after** my instruments? |
| **look for** | buscar para encontrar | I'm **looking for** my ticket. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-27/look-group.mp3" title="🔊 look into, forward to, after, for"></audio>

**Look into** implica investigación, no solo observación: se comprueban datos para entender un problema. Un promotor puede *look into a complaint* o *look into cheaper ticket options*. **Look for** es la búsqueda directa de una persona u objeto. Si has perdido la entrada, *you look for it*; si analizas por qué se duplicó un cobro, *you look into the issue*.

**Look after** expresa responsabilidad temporal o continuada: cuidar instrumentos, atender a un artista nuevo o vigilar el equipo *backstage*. No significa buscar. Compara *I'm looking for the guitarist* (quiero localizarlo) con *I'm looking after the guitarist* (soy responsable de atenderlo). Una partícula cambia por completo la relación.

En **look forward to**, *to* no introduce infinitivo. Es una preposición: *I look forward to the gig* o *I look forward to seeing the band*. El error *look forward to see* es muy frecuente porque el estudiante identifica visualmente *to* y aplica la regla del infinitivo. Memoriza una frase personal completa con *-ing* y úsala como modelo.

---

## 3. MAKE UP y MAKE UP FOR

| Forma | Idea | Ejemplo |
| :--- | :--- | :--- |
| **make up** | inventar una historia o explicación | She **made up** an excuse for missing rehearsal. |
| **make up** | formar / constituir | Local bands **make up** half the festival line-up. |
| **make up** | reconciliarse, normalmente *make up with* | He **made up with** the drummer after the argument. |
| **make up for** | compensar una pérdida o fallo | An extra song **made up for** the delay. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-27/make-up.mp3" title="🔊 make up y make up for"></audio>

El curso practica sobre todo «inventar» y «compensar», pero conocer el sujeto y el objeto evita confusiones. Una persona **makes up a story**; varios elementos **make up a whole**; dos personas **make up after an argument**. En cambio, una acción positiva **makes up for a problem**. La preposición **for** presenta aquello que se compensa.

Observa la lógica en una sola situación: *The singer made up an excuse for arriving late. Later, she played an extra song to make up for the delay.* En la primera frase crea una explicación que quizá no es cierta; en la segunda compensa una experiencia negativa. No elimines *for* en el segundo uso ni lo añadas automáticamente al primero.

Si el objeto es pronombre y *make up* significa inventar, puede separarse: *She made it up*. Con *make up for*, el bloque no se separa: *The extra song made up for it*. Practica esas dos respuestas breves porque aparecen con frecuencia en conversación.

---

## 4. MAKE OUT, MAKE FOR y MAKE UP ONE'S MIND

| Forma | Significado | Ejemplo |
| :--- | :--- | :--- |
| **make out** | distinguir con dificultad al ver u oír | I couldn't **make out** the lyrics. |
| **make for** | dirigirse hacia | The audience **made for** the exits. |
| **make up one's mind** | decidirse | We **made up our minds** and bought tickets. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-27/make-out-for.mp3" title="🔊 make out y make for"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-27/make-up-mind.mp3" title="🔊 make up one's mind"></audio>

**Make out** suele aparecer con *can/could* y una idea de dificultad: sonido bajo, letras borrosas, figura lejana. *I could just make out the band's name* significa que logré distinguirlo, no que lo inventé. **Make for** expresa movimiento dirigido: al abrir la taquilla, los fans *made for the box office*. Es más narrativo que el neutro *went to* y sugiere una reacción clara.

En **make up one's mind**, el posesivo concuerda con la persona: *I made up my mind; she made up her mind; we made up our minds*. No digas *make up the mind* cuando hablas de tu decisión. Puede ir seguido de *about + noun* o de *to + infinitive*: *We made up our minds to attend the gig*. La expresión describe el final de una deliberación, no simplemente cualquier preferencia.

Combina las tres formas: *We couldn't make out the announcement, so we made for the information desk and finally made up our minds to stay.* La conexión causal hace que cada uso resulte recuperable como parte de una historia, no como entrada aislada de diccionario.

---

## 5. PUT: off, up at y up with

| Phrasal | Significado | Patrón |
| :--- | :--- | :--- |
| **put off** | posponer | They **put off** the album release until May. |
| **put up at** | alojarse en un lugar temporal | We **put up at** a hotel near the venue. |
| **put up with** | tolerar algo molesto | The audience **put up with** a long delay. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-27/put-group.mp3" title="🔊 put off, put up at, put up with"></audio>

**Put off** responde a «¿qué se aplaza?» y puede incluir *until*: *put the rehearsal off until Friday*. Es separable; con pronombre dirás *put it off*. No confundas esta forma con *call off*, que cancela. Si se fija otra fecha, se ha pospuesto; si deja de celebrarse, se ha cancelado.

**Put up at** aparece en relatos de viaje y gira para indicar alojamiento temporal: hotel, hostal o casa concreta. En inglés cotidiano también oirás *stay at*, pero esta unidad practica el phrasal. **Put up with** no habla de alojamiento: significa tolerar ruido, retrasos, mala organización o una conducta molesta. El complemento va después de **with** y la expresión completa es inseparable.

Una mini-historia fija el contraste: *The band put off Friday's gig, so we put up at a cheap hotel and put up with traffic noise all night.* Tres partículas, tres relaciones: tiempo, alojamiento y tolerancia. Si intentas aprenderlas como traducciones sueltas, la repetición de *put up* puede confundirte; si ves las funciones, se separan.

---

## 6. Vocabulario: Music & entertainment

![Vocabulario de música y entretenimiento](/blog/curso-b2/unit-27/music-vocab.png)

| Término | Uso | Ejemplo |
| :--- | :--- | :--- |
| **venue** | lugar donde ocurre un evento | The **venue** holds two thousand people. |
| **gig** | actuación de música en directo, a menudo pequeña | The band has a **gig** on Friday. |
| **band** | grupo de músicos | The **band** is recording an album. |
| **box office** | taquilla | Collect your ticket at the **box office**. |
| **album** | colección publicada de canciones | Their new **album** comes out in June. |
| **festival** | evento grande con varios artistas | Three stages form the **festival**. |
| **rehearsal** | ensayo antes de actuar | The final **rehearsal** starts at four. |
| **sold out** | con todas las entradas vendidas | The Saturday show is **sold out**. |
| **tour** | serie de conciertos en distintos lugares | The European **tour** has twelve dates. |
| **backstage** | zona detrás del escenario | Only staff can go **backstage**. |
| **promoter** | persona o empresa organizadora | The **promoter** booked the venue. |
| **ticket** | entrada que permite acceder | Keep your digital **ticket** ready. |
| **audience** | conjunto de espectadores | The **audience** sang every chorus. |

En inglés, **audience** suele tratarse como colectivo singular en inglés americano (*the audience was excited*), aunque el británico admite plural al pensar en sus miembros. **Venue** no es sinónimo exacto de escenario: incluye el recinto. **Gig** es menos formal que *concert* y encaja especialmente con actuaciones de bandas.

*Sold out* describe el estado: *The gig is sold out*. *Sell out* es el verbo: *The gig sold out in minutes*. No digas *the tickets are finished*. Para comprar, recoger o comprobar entradas, usa *buy tickets, collect a ticket at the box office* y *check a booking*.

---

## 7. Reading: One ticket, several problems

![Escena de concierto con LOOK MAKE PUT](/blog/curso-b2/unit-27/music-scene.png)

> Mara was **looking forward to** a festival, but she could not find her ticket. The promoter **looked into** the booking while Mara **looked after** the band's instruments. A singer **made up** a story about the delay, then **made up for** it with an acoustic song. From backstage, Mara could hardly **make out** the announcement. She **made up her mind** and **made for** the box office. The gig was not **put off**, so the audience **put up with** a short wait before a brilliant sold-out show.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-27/reading-u27.mp3" title="🔊 Reading Unidad 27"></audio>

Localiza cuatro tipos de acción: anticipación, investigación/cuidado, percepción/decisión y tolerancia. Después cuenta la historia en pasado desde el punto de vista del promotor. Tendrás que cambiar pronombres, pero no las partículas. Explica también por qué *made up the delay* estaría incompleto y por qué *looked for the booking problem* no comunica una investigación tan claramente como *looked into*.

El reading incluye diez objetivos sin sonar como una lista porque cada uno responde a una necesidad narrativa. Copia esa técnica: inventa un problema de concierto, decide quién lo resuelve y selecciona los phrasals después. Elegir primero el mensaje y luego la forma produce inglés más natural que insertar expresiones al azar.

---

## 8. Diálogo y errores frecuentes

<audio controls preload="none" src="/audio/blog/curso-b2/unit-27/dialogue-u27.mp3" title="🔊 Diálogo Unidad 27"></audio>

> **A:** Are you **looking forward to** the gig?  
> **B:** Absolutely. Have you found the tickets?  
> **A:** No, the box office is **looking into** it.  
> **B:** Who's **looking after** the instruments?  
> **A:** The band manager. Can you **make out** the announcement?  
> **B:** Barely. Shall we **make for** the entrance?  
> **A:** Yes. Where are we staying?  
> **B:** We're **putting up at** the hotel opposite the venue.

| Error | Forma natural |
| :--- | :--- |
| *I look forward to see the band* | I look forward to **seeing** the band. |
| *They looked the complaint* | They **looked into** the complaint. |
| *I am looking after my ticket* cuando está perdido | I am **looking for** my ticket. |
| *The song made up the delay* | The song **made up for** the delay. |
| *We made the venue* por «nos dirigimos» | We **made for** the venue. |
| *We made up the mind* | We **made up our minds**. |
| *Put off it* | **Put it off**. |
| *We put with the noise* | We **put up with** the noise. |

Practica el diálogo primero tal como está y después añade un retraso. La nueva versión debe incluir *make up for* y *put up with*. Por último cambia la reserva de hotel para producir *put up at*. Tres modificaciones bastan para activar formas que no aparecen en el diálogo original.

""" + learning_lab(
        27,
        "music & entertainment",
        "LOOK/MAKE/PUT y el vocabulario de conciertos",
        "look into frente a look for; make up frente a make up for; put off frente a put up with",
        "narra desde la compra de entradas hasta el final de un concierto usando ocho phrasals y seis términos musicales",
    ) + r"""

---

## 12. Ejercicios prácticos con soluciones

""" + _ex_block(
        [
            (
                "Completa con la forma correcta del verbo entre paréntesis: *I'm looking forward to ______ (hear) the band's new album live.*",
                "**hearing**. En *look forward to*, **to** es preposición y va seguido de nombre o forma *-ing*.",
            ),
            (
                "Elige: *The promoter will (look into / look after / look for) the duplicate charge on my ticket.*",
                "**look into**, porque investigará el problema para descubrir qué ocurrió.",
            ),
            (
                "Completa dos partículas: *Can you look ______ the instruments while I look ______ my ticket?*",
                "**after** the instruments; **for** my ticket. Una acción cuida y la otra busca.",
            ),
            (
                "Explica la diferencia: *She made up an excuse* / *She made up for the delay.*",
                "En la primera **inventó** una excusa; en la segunda **compensó** el retraso. *Make up for* conserva **for**.",
            ),
            (
                "Reescribe con pronombre: *The singer invented the story.* Usa *make up*.",
                "The singer **made it up**.",
            ),
            (
                "Completa: *We could barely ______ the venue's name in the dark, so we ______ the information desk.*",
                "We could barely **make out** the name, so we **made for** the information desk.",
            ),
            (
                "Corrige el posesivo: *Maria made up their mind to attend the festival.*",
                "Maria **made up her mind** to attend the festival.",
            ),
            (
                "Elige posponer o cancelar y escribe una frase con cada uno: *put off / call off*.",
                "Ejemplo: They **put off** the gig until June (nueva fecha). They **called off** the gig (cancelación).",
            ),
            (
                "Completa: *During the tour, we put up ______ a small hotel and put up ______ noisy guests.*",
                "**at** a small hotel; **with** noisy guests.",
            ),
            (
                "Producción: escribe 120 palabras sobre un festival con *look forward to + -ing, look into, make up, make up for, make out, make up one's mind, put off* y *put up with*.",
                "Respuesta abierta. Revisa ocho formas completas, el posesivo de **one's mind**, el gerundio tras **look forward to** y al menos seis palabras de música.",
            ),
        ]
    )
    return slug, sections


def build_u28() -> tuple[str, str]:
    slug = "unidad-28-collocations-verb-noun-food"
    sections = r"""## 1. Qué es una colocación y por qué no basta traducir

Una **collocation** es una combinación que los hablantes eligen de forma habitual. Su significado puede ser transparente, pero la selección del verbo no siempre coincide con el español. «Tomar una decisión» se expresa **make a decision**, «hacer una foto» es **take a photo** y «echar un vistazo» es **have a look**. Traducir el verbo aislado conduce justo a las opciones que un hablante entiende pero no elegiría espontáneamente.

![Mapa de collocations verbo más sustantivo](/blog/curso-b2/unit-28/collocations-verb-noun.png)

El temario reúne dieciocho combinaciones con **MAKE, TAKE y HAVE**. No aparecen para que deduzcas una regla universal, porque no existe una que prediga todos los casos. Se pueden observar tendencias: *make* suele asociarse a producir un resultado, *take* a asumir o realizar una acción y *have* a experiencias, rutinas o disponibilidad. Sin embargo, esas tendencias son ayudas de memoria, no permisos para inventar combinaciones.

Para un hispanohablante, **do** parece una salida cómoda porque también se traduce como «hacer». En este inventario, ninguna de las dieciocho colocaciones nucleares usa *do*. Eso no vuelve incorrecto a *do* en general: decimos *do the washing-up, do some work, do research*. La decisión depende del sustantivo. Aprende **make a mistake**, no una regla incompleta como “make = crear”.

---

## 2. Las nueve combinaciones con MAKE

| Collocation | Significado natural | Ejemplo gastronómico |
| :--- | :--- | :--- |
| **make a decision** | tomar una decisión | We **made a decision** about the menu. |
| **make a mistake** | cometer un error | The chef **made a mistake** with the salt. |
| **make progress** | progresar | The team is **making progress** on the recipe. |
| **make an effort** | esforzarse | We **made an effort** to buy local ingredients. |
| **make a suggestion** | hacer una sugerencia | Lina **made a suggestion** at the meeting. |
| **make a call** | hacer una llamada | I need to **make a call** to the supplier. |
| **make noise** | hacer ruido | The old blender **makes a lot of noise**. |
| **make a promise** | hacer una promesa | The restaurant **made a promise** to reduce waste. |
| **make a good impression** | causar buena impresión | The seasonal menu **made a good impression**. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-28/make-group.mp3" title="🔊 make collocations principales"></audio>
<audio controls preload="none" src="/audio/blog/curso-b2/unit-28/more-make.mp3" title="🔊 make a call, noise, a promise, an impression"></audio>

Observa tres detalles. Primero, **progress** y **noise** son incontables en estos usos: *make progress*, no *make a progress*; *make noise*, aunque puedes decir *make a noise* para un sonido concreto. Segundo, el verbo cambia con tiempo y persona, pero el sustantivo se conserva: *she makes a suggestion; they made a suggestion*. Tercero, los adjetivos se insertan dentro del bloque: *make an important decision, make steady progress, make a useful suggestion*.

**Make a call** puede referirse a realizar una llamada y, en otros contextos, a tomar una decisión difícil (*It's your call*), pero aquí se practica el contacto telefónico. **Make a good impression on someone** admite **on** para la persona impresionada: *The chef made a good impression on the guests*. No traduzcas «dar una buena impresión» con *give*.

Construye una cadena de cocina: en una reunión haces una sugerencia, el chef toma —en inglés *makes*— una decisión, alguien comete un error, el equipo se esfuerza y progresa, y el plato causa buena impresión. Esta pequeña narración recupera seis combinaciones en un orden lógico.

---

## 3. Las cinco combinaciones con TAKE

| Collocation | Idea | Ejemplo |
| :--- | :--- | :--- |
| **take a break** | hacer una pausa | Let's **take a break** after service. |
| **take a photo** | hacer una foto | Can I **take a photo** of the dish? |
| **take responsibility** | asumir responsabilidad | The head chef **took responsibility** for the menu. |
| **take a chance** | arriesgarse / aprovechar una oportunidad | We **took a chance** on a new cuisine. |
| **take a note** | tomar nota | **Take a note** of every ingredient. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-28/take-group.mp3" title="🔊 take a break, photo, responsibility, chance, note"></audio>

Aquí la interferencia española es especialmente fuerte: «hacer una pausa» y «hacer una foto» llevan **take**, mientras «asumir responsabilidad» también se construye con **take**. En inglés británico informal puedes oír *have a break* o *have a shower*, pero sigue las combinaciones objetivo del curso cuando la actividad pide una respuesta concreta.

**Responsibility** es incontable en la expresión general: *take responsibility for the mistake*. Si hablas de funciones individuales, puede aparecer en plural (*take on new responsibilities*), pero esa es otra estructura. **Take a chance on** presenta la opción arriesgada: *take a chance on an unfamiliar dish*. **Take a note of** pide registrar algo por escrito; en plural, *take notes* es muy frecuente durante una clase o reunión.

No confundas **take a photo** con *make a photo*. En ciertas lenguas europeas la construcción equivalente usa “hacer”, pero la colocación estándar inglesa usa *take*. Añade un objeto con **of**: *take a photo of the meal*. Esa preposición también debe formar parte de tu ejemplo de memoria.

---

## 4. Las cuatro combinaciones con HAVE

| Collocation | Uso | Ejemplo |
| :--- | :--- | :--- |
| **have a meeting** | celebrar/tener una reunión | We **have a meeting** every Monday. |
| **have a look** | echar un vistazo | **Have a look at** the dessert menu. |
| **have a deadline** | tener una fecha límite | We **have a deadline** for the spring menu. |
| **have a shower** | ducharse | The chef **has a shower** before the early shift. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-28/have-group.mp3" title="🔊 have a meeting, look, deadline, shower"></audio>

**Have a look at** incluye **at** para introducir lo observado. En imperativo suena como una invitación natural: *Have a look at this recipe*. **Have a meeting with** presenta a las personas y **about** el tema: *We had a meeting with the supplier about seasonal ingredients*. Aprender estas extensiones hace que la colocación sea utilizable, no solo reconocible.

**Have a deadline** describe que existe una fecha límite. Para cumplirla usamos otra colocación: *meet a deadline*. No digas *make a deadline* con la intención de «tenerla»; *make the deadline* puede significar lograr llegar a tiempo en ciertos contextos, una idea distinta. Mantén el objetivo sencillo: *We have a deadline on Friday*.

Con rutinas personales, el inglés británico usa mucho **have a shower**, mientras en inglés americano es común *take a shower*. El curso fija *have a shower*, así que esa es la respuesta esperada en la Unidad 28. Reconocer una variante no significa mezclarla dentro de un ejercicio que evalúa un inventario concreto.

---

## 5. MAKE, TAKE, HAVE o DO: un sistema de decisión

<audio controls preload="none" src="/audio/blog/curso-b2/unit-28/food-vocabulary.mp3" title="🔊 Vocabulario Food & Gastronomy"></audio>

Cuando dudes, no traduzcas primero el verbo español. Mira el **sustantivo** y recupera su compañero. *Decision* llama a **make**; *break* llama a **take**; *meeting* llama a **have**. Esta dirección sustantivo → verbo es más útil que intentar decidir qué matiz abstracto expresa *make* o *take*. En tus tarjetas, coloca el sustantivo como pregunta y escribe el chunk completo como respuesta.

| Traducción tentadora | Error típico | Chunk correcto |
| :--- | :--- | :--- |
| hacer una decisión | *do/take a decision* | **make a decision** |
| hacer un error | *do a mistake* | **make a mistake** |
| hacer progreso | *do progress* | **make progress** |
| hacer una foto | *make a photo* | **take a photo** |
| tomar responsabilidad | *make responsibility* | **take responsibility** |
| hacer una reunión | *make/do a meeting* | **have a meeting** |
| echar una mirada | *take a look* (posible, pero no objetivo aquí) | **have a look** |
| hacer ruido | *do noise* | **make noise** |

**Do** sí tiene colocaciones propias, pero introducirlo como comodín empeora la precisión. Compara *do the cooking* (realizar la actividad general de cocinar) con *make a meal* (producir una comida; no es objetivo central aquí). En un examen, la naturalidad depende de la pareja exacta. Si no estás seguro, consulta corpus o diccionario de colocaciones y guarda un ejemplo.

Un ejercicio potente es la clasificación inversa. Escribe los dieciocho sustantivos sin verbo, mézclalos y colócalos bajo MAKE, TAKE o HAVE. Después forma una frase gastronómica con cada error. La frase correctiva importa: evita que la opción equivocada permanezca como la última forma que viste.

---

## 6. Vocabulario: Food & Gastronomy

![Vocabulario Food and Gastronomy](/blog/curso-b2/unit-28/food-vocab.png)

| Palabra | Distinción | Ejemplo |
| :--- | :--- | :--- |
| **recipe** | instrucciones para preparar un plato | Follow the **recipe** carefully. |
| **chef** | profesional que cocina, a menudo dirige cocina | The **chef** designed the menu. |
| **ingredients** | componentes usados en una receta | Check all the **ingredients** first. |
| **cuisine** | estilo culinario de una región o cultura | Peruvian **cuisine** is extremely diverse. |
| **meal** | ocasión/comida completa | We shared a three-course **meal**. |
| **menu** | lista de platos disponibles | The seasonal **menu** changes monthly. |

No uses **chef** para cualquier persona que cocina en casa; *cook* es la palabra general y también el nombre de un profesional que no necesariamente dirige. **Cuisine** no es la habitación «cocina», sino una tradición o estilo culinario. **Recipe** contiene instrucciones, mientras **menu** presenta opciones y **meal** es lo que se come en una ocasión.

Estas palabras aceptan colocaciones adicionales útiles: *follow a recipe, source ingredients, design a menu, prepare a meal, regional cuisine*. Úsalas alrededor de los chunks gramaticales: *The chef made a decision to change the menu after having a look at the available ingredients.*

---

## 7. Reading: Designing a seasonal menu

![Escena gastronómica con collocations](/blog/curso-b2/unit-28/food-scene.png)

> Chef Amira **had a meeting** about a new seasonal menu. She **made a suggestion**, **took responsibility** for testing the recipe, and **made an effort** to source local ingredients. After **having a look at** the first dish, she **made a decision** to **take a chance on** a regional cuisine. One assistant **made a mistake**, but the team **took a note**, **made progress**, and kept its promise. At the evening meal, the menu **made a good impression**, so Amira **took a photo** before **taking a well-earned break**.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-28/reading-u28.mp3" title="🔊 Reading Unidad 28"></audio>

Subraya nueve MAKE, cinco TAKE y cuatro HAVE en las tablas; luego localiza cuáles aparecen en el reading. No todas tienen que estar presentes para que el texto sea natural. Escribe una continuación con *make a call, make noise, have a deadline* y *have a shower*. Mantén el contexto de restaurante para que cada incorporación tenga una razón narrativa.

Observa los tiempos: *had, made, took* son pasados irregulares o regulares del verbo soporte, mientras el sustantivo conserva la forma. Practica el reading en presente cambiando *Amira had* por *Amira has* y revisa cada verbo. Esta transformación sencilla entrena la colocación y la gramática simultáneamente.

---

## 8. Diálogo, pronunciación y errores

<audio controls preload="none" src="/audio/blog/curso-b2/unit-28/dialogue-u28.mp3" title="🔊 Diálogo Unidad 28"></audio>

> **A:** Can we **have a meeting** about the menu?  
> **B:** Yes, but I **have a deadline**.  
> **A:** **Have a look at** this recipe first. Did I **make a mistake**?  
> **B:** Only a small one. Shall we **take a chance on** local ingredients?  
> **A:** Good suggestion. Who'll **take responsibility**?  
> **B:** I will, and I'll **make a call** to the supplier.  
> **A:** Then **take a break**. You've **made great progress**.

En habla fluida, los artículos átonos se unen al verbo: *make-a-decision, take-a-break, have-a-look*. No tienes que exagerar esa unión, pero sí evitar una pausa que separe artificialmente la combinación. Repite el audio por grupos y añade un adjetivo: *make a difficult decision, take a short break, have a quick look*.

Corrige sistemáticamente estos cuatro fallos: *do a mistake* → **make a mistake**; *make a photo* → **take a photo**; *make responsibility* → **take responsibility**; *do a meeting* → **have a meeting**. Después crea un ejemplo nuevo. La corrección aislada comprueba memoria; el ejemplo nuevo comprueba transferencia.

""" + learning_lab(
        28,
        "food & gastronomy",
        "las dieciocho collocations con MAKE, TAKE y HAVE",
        "make a decision frente a take a break; take responsibility frente a have a meeting; cualquiera de ellas frente al comodín do",
        "describe la preparación de un menú durante noventa segundos e incluye al menos diez colocaciones distintas",
    ) + r"""

---

## 12. Ejercicios prácticos con soluciones

""" + _ex_block(
        [
            (
                "Elige el verbo: *After having a look at the ingredients, the chef (made / took / did) a decision.*",
                "**made a decision**. Aunque el español dice «tomó», la colocación inglesa usa **make**.",
            ),
            (
                "Corrige dos errores: *I did a mistake, so I made responsibility for the dish.*",
                "I **made a mistake**, so I **took responsibility** for the dish.",
            ),
            (
                "Completa: *Let's ______ a short break and then ______ progress on the dessert menu.*",
                "**take** a break; **make** progress.",
            ),
            (
                "Añade la preposición: *Have a look ___ the recipe and take a photo ___ the finished meal.*",
                "Have a look **at** the recipe; take a photo **of** the meal.",
            ),
            (
                "Elige entre *make a suggestion* y *take a chance*: *Why don't we add a vegan dish?* / *We tried an unfamiliar cuisine despite the risk.*",
                "La propuesta **makes a suggestion**; la decisión arriesgada **takes a chance**.",
            ),
            (
                "Completa con HAVE: *We ______ a meeting at ten, we ______ a deadline on Friday, and first I need to ______ a shower.*",
                "**have** a meeting, **have** a deadline, **have** a shower.",
            ),
            (
                "Corrige artículos: *She made progress and took responsibility for a mistake, then made good impression.*",
                "She **made progress** and **took responsibility** for a mistake, then **made a good impression**. *Progress/responsibility* no llevan artículo aquí; *impression* sí.",
            ),
            (
                "Relaciona: supplier por teléfono; batidora ruidosa; compromiso con ingredientes locales; lista escrita.",
                "**make a call** to the supplier; **make noise**; **make a promise**; **take a note**.",
            ),
            (
                "Distingue *recipe, menu, meal, cuisine* con una definición breve para cada palabra.",
                "**Recipe** = instrucciones; **menu** = lista de platos; **meal** = comida/ocasión completa; **cuisine** = estilo culinario.",
            ),
            (
                "Producción: escribe 130 palabras sobre un servicio de restaurante e incluye tres MAKE, tres TAKE, tres HAVE y las seis palabras clave de Food & Gastronomy.",
                "Respuesta abierta. Subraya nueve collocations completas; comprueba que **do** no sustituye a los verbos objetivo y que *recipe/meal/menu/cuisine* mantienen significados distintos.",
            ),
        ]
    )
    return slug, sections


def build_u29() -> tuple[str, str]:
    slug = "unidad-29-collocations-adj-noun-psychology"
    sections = r"""## 1. Por qué el adjetivo correcto importa

En una colocación **adjetivo + sustantivo**, varias opciones pueden ser comprensibles, pero una es la pareja convencional. *Big pressure* transmite una idea general, aunque **heavy pressure** es la combinación objetivo y natural en este contexto. *Strong burden* parece lógica si traduces «carga fuerte», pero el inglés prefiere **heavy burden**. Aprender estas preferencias mejora precisión, comprensión y estilo escrito.

![Mapa de collocations adjetivo más sustantivo](/blog/curso-b2/unit-29/collocations-adj-noun.png)

No se trata de declarar que cualquier alternativa sea imposible en cualquier oración. El significado, registro y variedad pueden permitir otras combinaciones. La meta de B2 es dominar chunks frecuentes y apropiados: **strong belief, high demand, full support, deep impact**. En una actividad cerrada del curso, elige la colocación enseñada; en producción libre, usa estos chunks como base fiable.

El tema **Psychology & Mind** requiere además precisión conceptual. Estas expresiones sirven para describir experiencias y debates, no para diagnosticar. *Strong anxiety* señala intensidad lingüística; no sustituye una evaluación profesional. En textos sobre salud mental, elige un tono respetuoso, evita generalizaciones y separa una experiencia personal de una afirmación clínica.

---

## 2. STRONG y HEAVY: intensidad con imágenes distintas

| Collocation | Sentido | Ejemplo |
| :--- | :--- | :--- |
| **strong anxiety** | ansiedad intensa | She felt **strong anxiety** before the presentation. |
| **strong belief** | convicción firme | He has a **strong belief** in the value of therapy. |
| **strong influence** | influencia poderosa | Family habits have a **strong influence** on mindset. |
| **heavy burden** | carga importante, difícil de llevar | Guilt became a **heavy burden**. |
| **heavy pressure** | presión intensa y difícil de soportar | The team worked under **heavy pressure**. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-29/strong-heavy.mp3" title="🔊 strong y heavy collocations"></audio>

**Strong** se asocia aquí con una fuerza interna o efecto potente: emoción, convicción e influencia. **Heavy** conserva una metáfora de peso: una carga o presión que cae sobre alguien. Esa imagen no es una regla universal, pero ayuda a separar las cinco parejas. Pregunta si el sustantivo se presenta como fuerza o como peso soportado.

Añade complementos para crear frases precisas: *strong anxiety **about** an interview; a strong belief **in** recovery; a strong influence **on** children; a heavy burden **for** one person; heavy pressure **at** work*. Las preposiciones extienden el chunk y permiten explicar quién experimenta, causa o recibe el efecto.

Evita sobrecargar un texto repitiendo *strong* ante cualquier sustantivo. El repertorio de la unidad demuestra que el inglés distribuye la intensidad entre adjetivos distintos. Un buen párrafo puede hablar de **heavy pressure**, **strong anxiety** y **great relief**; esa variedad no es decoración, sino selección colocacional.

---

## 3. La familia GREAT

| Collocation | Uso | Ejemplo |
| :--- | :--- | :--- |
| **great progress** | avance importante | She made **great progress** in therapy. |
| **great relief** | gran alivio | The supportive message brought **great relief**. |
| **great success** | gran éxito | The wellbeing programme had **great success**. |
| **great interest** | mucho interés | Students showed **great interest** in psychology. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-29/great-group.mp3" title="🔊 great progress, relief, success, interest"></audio>

En estas expresiones, **great** comunica grado o magnitud, no necesariamente «fantástico». *Great relief* no evalúa moralmente el alivio; indica que fue considerable. *Great interest* señala intensidad del interés. *Great progress* y *great success* permiten valorar resultados, pero conviene añadir evidencia en escritura académica: qué mejoró, respecto a cuándo y según qué medida.

**Progress** es incontable: *great progress*, no *a great progress*. **Relief** también suele ser incontable en esta expresión: *I felt great relief*. **Success** puede funcionar de forma incontable al hablar del éxito general o contable para un resultado: *The programme was a great success*. El curso practica *great success*, pero reconocer el artículo depende de la estructura completa.

Combina esta familia con verbos naturales: *make great progress, feel great relief, achieve great success, show great interest*. La unidad anterior ya enseñó **make progress**; ahora el adjetivo se inserta dentro del chunk: **make great progress**. Conectar contenidos reduce la carga de memoria.

---

## 4. Selecciones precisas: LIVELY, STUNNING, HIGH, FULL y DEEP

| Collocation | Matiz | Ejemplo |
| :--- | :--- | :--- |
| **lively discussion** | debate activo y animado | We had a **lively discussion** about mental health. |
| **stunning results** | resultados sorprendentemente impresionantes | The pilot study reported **stunning results**. |
| **high demand** | gran nivel de demanda | There is **high demand** for counselling services. |
| **full support** | apoyo completo | Her family gave her their **full support**. |
| **deep impact** | efecto profundo | The experience had a **deep impact** on his mindset. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-29/precision-group.mp3" title="🔊 lively, stunning, high, full, deep"></audio>

Una **lively discussion** no tiene por qué ser una pelea; participan ideas y energía. **Stunning results** expresa sorpresa positiva o gran impacto visual, por lo que puede sonar promocional. En escritura cauta, comprueba si la evidencia justifica un adjetivo tan intenso. Aprender una colocación incluye saber cuándo no exagerar.

**High demand** sigue una metáfora de nivel, no de fuerza ni peso. **Full support** presenta el apoyo como completo. **Deep impact** imagina un efecto que alcanza capas internas y duraderas. Estas imágenes —altura, totalidad y profundidad— ayudan a recordar, pero lo decisivo sigue siendo la pareja convencional.

Amplía con preposiciones: *high demand **for** services; full support **from** friends; a deep impact **on** wellbeing*. En producción B2, una colocación sin el complemento necesario puede dejar la idea vaga. Responde siempre: demanda de qué, apoyo de quién, impacto sobre qué.

---

## 5. REMARKABLE y CONSIDERABLE

| Collocation | Función | Ejemplo |
| :--- | :--- | :--- |
| **remarkable memory** | memoria extraordinaria, digna de atención | She has a **remarkable memory** for faces. |
| **remarkable resilience** | capacidad de recuperación destacable | He showed **remarkable resilience** during recovery. |
| **considerable controversy** | controversia importante | The proposal caused **considerable controversy**. |
| **good relationship** | relación positiva (extensión del curso vivo) | She has a **good relationship** with her therapist. |

<audio controls preload="none" src="/audio/blog/curso-b2/unit-29/remarkable-group.mp3" title="🔊 remarkable y considerable collocations"></audio>

**Remarkable** significa que algo merece ser señalado por ser poco común o impresionante. No equivale solo a «bueno»: una memoria puede ser notable por precisión, y la resiliencia por mantenerse durante una situación difícil. En textos personales, úsalo con respeto y evidencia concreta; evita convertir el sufrimiento ajeno en una historia inspiradora simplificada.

**Considerable** es frecuente en registro formal para indicar cantidad o grado importantes: *considerable controversy, considerable pressure, considerable interest*. La colocación objetivo es **considerable controversy**. Frente al emocional *stunning*, suena más analítico. Puedes usarla en un ensayo: *The new approach generated considerable controversy among researchers.*

El curso vivo incluye además **good relationship**, una combinación transparente que conviene conservar como chunk, especialmente con **with**. No sustituye las diecisiete parejas centrales indicadas para esta guía; completa la práctica del archivo de la unidad y conecta con el vocabulario de apoyo y terapia.

---

## 6. Vocabulario: Psychology & Mind

![Vocabulario Psychology and Mind](/blog/curso-b2/unit-29/psychology-vocab.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-29/psychology-vocabulary.mp3" title="🔊 Vocabulario de psicología"></audio>

| Palabra | Idea | Ejemplo respetuoso |
| :--- | :--- | :--- |
| **anxiety** | preocupación o ansiedad intensa/persistente según contexto | He spoke openly about **anxiety**. |
| **burden** | carga o responsabilidad difícil | She did not want to carry the **burden** alone. |
| **belief** | convicción de que algo es cierto | A **belief** can influence behaviour. |
| **pressure** | demandas que generan tensión | Workplace **pressure** affected the team. |
| **therapy** | tratamiento o apoyo profesional | **Therapy** helped her understand patterns. |
| **mindset** | forma habitual de pensar y abordar algo | His **mindset** changed gradually. |
| **mental health** | bienestar psicológico y emocional | Rest can support **mental health**. |
| **resilience** | capacidad de adaptarse y recuperarse | Community support can strengthen **resilience**. |
| **recovery** | proceso de mejora o recuperación | **Recovery** is not always linear. |

No confundas **mind** con **mindset**. *Mind* es la mente en sentido amplio; *mindset* es un patrón o actitud mental. **Mental health** no es sinónimo de enfermedad: todas las personas tienen salud mental. **Therapy** es un término general cuyo tipo y finalidad dependen del contexto; en una tarea lingüística no necesitas realizar afirmaciones médicas.

Usa verbos prudentes: *experience anxiety, face pressure, seek support, attend therapy, change a mindset, support mental health, show resilience, continue recovery*. Evita expresiones estigmatizantes y no presentes una única estrategia como solución universal. La precisión léxica incluye responsabilidad comunicativa.

---

## 7. Reading: Support, pressure and recovery

![Escena de psicología y colocaciones](/blog/curso-b2/unit-29/psychology-scene.png)

> Noah faced **heavy pressure** at work, and **strong anxiety** became a **heavy burden**. Therapy had a **deep impact** on his mindset. With **full support** from his family, he made **great progress** and felt **great relief**. A **lively discussion** about mental health gave him a **strong belief** in recovery. The programme showed **stunning results** and **remarkable success**. Although **high demand** caused **considerable controversy**, Noah's **remarkable resilience** became a **strong influence** on his colleagues.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-29/reading-u29.mp3" title="🔊 Reading Unidad 29"></audio>

El texto reúne muchas colocaciones para practicar, así que su densidad es mayor que la de una conversación normal. Clasifícalas por adjetivo y sustituye tres por explicaciones sencillas. Después evalúa el registro: *stunning results* es una afirmación fuerte. Reescribe esa parte con *encouraging results* si quieres un tono más prudente, y comenta qué cambia.

Observa dos capas: los sustantivos cuentan una historia de presión, apoyo y recuperación; los adjetivos calibran intensidad y valoración. Resume sin usar más de cinco colocaciones. Elegir las más relevantes es una destreza distinta de insertar todas.

---

## 8. Diálogo y tabla de errores

<audio controls preload="none" src="/audio/blog/curso-b2/unit-29/dialogue-u29.mp3" title="🔊 Diálogo Unidad 29"></audio>

> **A:** Was there **heavy pressure** at work?  
> **B:** Yes, and I felt **strong anxiety**.  
> **A:** Did therapy help?  
> **B:** It had a **deep impact**.  
> **A:** What changed?  
> **B:** My mindset and my recovery.  
> **A:** Did your family help?  
> **B:** Their **full support** brought **great relief**.  
> **A:** Any results?  
> **B:** **Great progress** and **remarkable resilience**.  
> **A:** Why the debate?  
> **B:** **High demand** caused **considerable controversy**.

| Menos natural / no objetivo | Colocación del curso |
| :--- | :--- |
| *big anxiety* | **strong anxiety** |
| *strong burden* | **heavy burden** |
| *strong pressure* en esta actividad | **heavy pressure** |
| *strong progress* | **great progress** |
| *active discussion* cuando quieres «animada» | **lively discussion** |
| *strong demand* en esta actividad | **high demand** |
| *complete support* | **full support** |
| *profound impact* puede existir, pero no es el chunk objetivo | **deep impact** |
| *strong resilience* | **remarkable resilience** |
| *big controversy* | **considerable controversy** |

La columna izquierda no significa que cada combinación sea gramaticalmente imposible en todos los corpus. Indica que no es la pareja enseñada o que cambia el matiz. En ejercicios cerrados, usa el inventario de la unidad; en escritura libre, consulta contexto y registro antes de tratar las colocaciones como sinónimos perfectos.

""" + learning_lab(
        29,
        "psychology & mind",
        "las colocaciones adjetivo+sustantivo y el vocabulario de salud mental",
        "strong anxiety frente a heavy pressure; high demand frente a full support; remarkable resilience frente a great progress",
        "presenta un caso ficticio de presión, apoyo y recuperación durante noventa segundos con ocho colocaciones, sin hacer afirmaciones clínicas",
    ) + r"""

---

## 12. Ejercicios prácticos con soluciones

""" + _ex_block(
        [
            (
                "Elige los dos adjetivos: *She felt (strong/heavy) anxiety while working under (strong/heavy) pressure.*",
                "**strong anxiety** y **heavy pressure**.",
            ),
            (
                "Completa la metáfora de peso: *Caring alone became a ______ burden.*",
                "**heavy burden**.",
            ),
            (
                "Corrige el artículo: *The client made a great progress and felt a great relief.*",
                "The client **made great progress** and **felt great relief**. Ambos sustantivos son incontables aquí.",
            ),
            (
                "Relaciona intención y chunk: debate animado; resultados impresionantes; demanda alta.",
                "**lively discussion**; **stunning results**; **high demand**.",
            ),
            (
                "Añade las preposiciones: *full support ___ her family; deep impact ___ her mindset; strong belief ___ recovery*.",
                "full support **from** her family; deep impact **on** her mindset; strong belief **in** recovery.",
            ),
            (
                "Completa con *remarkable*: *She has a ______ memory and showed ______ resilience.*",
                "**remarkable memory** y **remarkable resilience**.",
            ),
            (
                "Elige la opción formal: *The proposal generated (big / considerable / heavy) controversy.*",
                "**considerable controversy**.",
            ),
            (
                "Reescribe sin cambiar el sentido principal: *The workshop was highly successful and attracted a lot of interest.* Usa dos GREAT.",
                "The workshop achieved **great success** and attracted **great interest**.",
            ),
            (
                "En el reading, localiza una colocación de apoyo, una de impacto, una de demanda y una de influencia.",
                "**full support**, **deep impact**, **high demand** y **strong influence**.",
            ),
            (
                "Producción: escribe 120–140 palabras sobre una iniciativa ficticia de bienestar. Usa diez colocaciones y distingue hechos, opiniones y resultados.",
                "Respuesta abierta. Revisa las parejas exactas, los artículos de sustantivos incontables, las preposiciones y un tono no estigmatizante.",
            ),
        ]
    )
    return slug, sections


def build_u30() -> tuple[str, str]:
    slug = "unidad-30-repaso-26-29"
    sections = r"""## 1. El mapa del bloque U26–29

La Unidad 30 no añade una lista nueva: te pide elegir entre cuatro sistemas ya estudiados. U26 y U27 usan **verbo + partícula(s)**; U28 usa **verbo soporte + sustantivo**; U29 usa **adjetivo + sustantivo**. Antes de completar una frase, identifica qué tipo de hueco existe. Si aparece un verbo base como *get* o *look*, piensa en phrasal; si aparece *decision* o *pressure*, recupera su colocación.

![Mapa del repaso B2 Unidades 26 a 29](/blog/curso-b2/unit-30/review-map.png)

| Unidad | Sistema | Pregunta de control | Tema |
| :--- | :--- | :--- | :--- |
| **26** | GET / GIVE / GO | ¿relación, abandono, revisión, alarma o resultado? | Sustainability |
| **27** | LOOK / MAKE / PUT | ¿investigación, anticipación, compensación, dirección o tolerancia? | Music |
| **28** | Verb + Noun | ¿el sustantivo selecciona make, take o have? | Food |
| **29** | Adjective + Noun | ¿qué adjetivo forma el chunk natural? | Psychology |

El error más común del repaso es decidir demasiado pronto. Al ver *make*, alguien recuerda U27 y busca una partícula, aunque la frase tenga *a decision* y pertenezca a U28. Al ver «fuerte», otro elige *strong* sin comprobar que el sustantivo es *pressure*. Retrasa la respuesta un segundo: localiza núcleo, complemento y contexto; después recupera el bloque entero.

---

## 2. Repaso U26: GET, GIVE y GO

<audio controls preload="none" src="/audio/blog/curso-b2/unit-30/review-u26.mp3" title="🔊 Repaso Unidad 26"></audio>

| Necesidad | Respuesta | Ejemplo |
| :--- | :--- | :--- |
| recuperarse de un miedo | **get over** | She **got over** her fear. |
| llevarse bien | **get along with** | We **get along with** our neighbours. |
| contactar / completar algo difícil | **get through (to)** | I couldn't **get through to** them. / We **got through** the week. |
| abandonar | **give up** | Don't **give up** the challenge. |
| ceder | **give in to** | They **gave in to** pressure. |
| regalar / revelar | **give away** | We **gave the jars away**. |
| experimentar / revisar | **go through** | We **went through** every option. |
| continuar | **go on** | The meeting **went on**. |
| sonar / salir un evento | **go off** | The alarm **went off**; the fair **went off well**. |

Tres contrastes diagnostican esta unidad. Primero, **get over** enfoca recuperación y **get through** finalización o contacto. Segundo, **give up** abandona el esfuerzo y **give in** cede ante una presión. Tercero, **go off** cambia con el sujeto: una alarma suena; un evento se desarrolla de cierta manera. Si no puedes explicar esos pares, vuelve a la [guía U26](/blog/curso-b2/unidad-26-phrasal-verbs-3-sustainability) antes de mezclar todo.

Cuenta una transición ecológica en cinco frases: relación con vecinos, semana difícil, presión para abandonar, revisión de opciones y taller final. Debes usar al menos un GET, un GIVE y un GO. No fuerces todos; selecciona los que expresen una acción concreta.

---

## 3. Repaso U27: LOOK, MAKE y PUT

<audio controls preload="none" src="/audio/blog/curso-b2/unit-30/review-u27.mp3" title="🔊 Repaso Unidad 27"></audio>

| Familia | Formas | Contraste esencial |
| :--- | :--- | :--- |
| LOOK | **look into / forward to / after / for** | investigar ≠ esperar con ilusión ≠ cuidar ≠ buscar |
| MAKE | **make up / up for / out / for / up one's mind** | inventar ≠ compensar ≠ distinguir ≠ dirigirse ≠ decidir |
| PUT | **put off / up at / up with** | posponer ≠ alojarse ≠ tolerar |

Recuerda la gramática de **look forward to**: *to* es preposición y exige nombre o *-ing*: *We look forward to attending the festival*. Recuerda el **for** de *make up for a delay*, el posesivo de *make up our minds* y las dos partículas de *put up with*. Una respuesta semánticamente correcta sigue siendo incompleta si pierde esas piezas.

Imagina un concierto con reserva duplicada. El promotor **looks into** el problema; tú **look for** el ticket; un amigo **looks after** el equipo; todos **look forward to hearing** la banda. Un tema extra **makes up for** el retraso. El concierto no se **puts off** y el público **puts up with** la espera. Esta cadena revisa decisiones, no traducciones.

No confundas **make up** de U27 con todas las combinaciones de **make** de U28. Si tras *make* aparece *a story*, puede significar inventar; si aparece *a decision*, es una colocación verbo+sustantivo sin partícula. La estructura del complemento te dice a qué unidad pertenece.

---

## 4. Repaso U28: MAKE, TAKE y HAVE

<audio controls preload="none" src="/audio/blog/curso-b2/unit-30/review-u28.mp3" title="🔊 Repaso Unidad 28"></audio>

| MAKE | TAKE | HAVE |
| :--- | :--- | :--- |
| a decision | a break | a meeting |
| a mistake | a photo | a look |
| progress | responsibility | a deadline |
| an effort | a chance | a shower |
| a suggestion | a note | — |
| a call | — | — |
| noise | — | — |
| a promise | — | — |
| a good impression | — | — |

Lee la tabla en dirección inversa. Tapa los encabezados, señala un sustantivo y di el verbo. En español, *hacer/tomar/tener* no predice de forma fiable la respuesta: «tomar una decisión» es **make**, «hacer una foto» es **take**, «hacer una reunión» se expresa **have a meeting**. **Do** no sustituye estos verbos, aunque tenga sus propias colocaciones fuera del inventario.

Presta atención a artículos y nombres incontables: **make progress**, **take responsibility** y **make noise** suelen aparecer sin *a*; **make a decision, take a break, have a look** necesitan artículo. Los adjetivos se insertan entre artículo y sustantivo: *make an important decision, take a short break, have a quick look*.

La prueba productiva es describir una cocina bajo presión. Antes de abrir, el equipo **has a meeting**, **makes a decision**, **takes responsibility**, **makes an effort** y **takes notes**. Durante el servicio alguien **makes a mistake**, pero todos **make progress** y finalmente **make a good impression**. Si aparece *do*, detente y comprueba el sustantivo.

---

## 5. Repaso U29: adjective + noun

<audio controls preload="none" src="/audio/blog/curso-b2/unit-30/review-u29.mp3" title="🔊 Repaso Unidad 29"></audio>

| Imagen de memoria | Collocations |
| :--- | :--- |
| fuerza | **strong anxiety / belief / influence** |
| peso | **heavy burden / pressure** |
| gran grado | **great progress / relief / success / interest** |
| nivel | **high demand** |
| totalidad | **full support** |
| profundidad | **deep impact** |
| cualidad destacable | **remarkable memory / resilience** |
| registro preciso | **lively discussion / stunning results / considerable controversy** |

Las imágenes ayudan, pero el sustantivo manda. No extiendas *strong* a *strong pressure* dentro de esta actividad ni *great* a *great demand*. Recupera cada pareja. Luego añade el verbo correcto: **feel strong anxiety, carry a heavy burden, make great progress, show great interest, give full support, have a deep impact**.

La conexión con U28 aparece en **make great progress**. El verbo y sustantivo forman una colocación; el adjetivo crea otra capa. Analiza de dentro hacia fuera: *progress* selecciona *make* y también combina con *great*. La frase completa no se aprende como tres decisiones independientes, sino como un chunk ampliado.

Al hablar de Psychology & Mind, diferencia precisión lingüística de consejo clínico. Puedes resumir un texto sobre *heavy pressure* y *full support* sin diagnosticar ni prometer resultados. En escritura B2, atribuye afirmaciones, evita exageraciones y usa *stunning results* solo cuando el contexto justifique una valoración tan fuerte.

---

## 6. Estrategia mixta: identifica antes de completar

![Ejemplos mezclados de las Unidades 26 a 29](/blog/curso-b2/unit-30/review-examples.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-30/mixed-review.mp3" title="🔊 Repaso mixto"></audio>

Sigue este procedimiento en cada hueco:

1. **Encuentra el núcleo.** ¿Ya aparece un verbo base o un sustantivo?
2. **Define la idea.** ¿La frase habla de contacto, abandono, investigación, decisión, intensidad?
3. **Recupera el chunk.** Di la forma completa antes de escribir.
4. **Comprueba la cola.** Revisa *with, to, for, at*, artículos y posesivos.
5. **Verifica el tiempo.** *get → got; give → gave; go → went; make → made; take → took; have → had*.
6. **Lee la frase entera.** La respuesta debe funcionar semántica y gramaticalmente.

Ejemplo: *The organiser ___ responsibility for the delay.* El núcleo es *responsibility*, así que no buscas un phrasal de PUT aunque «asumir» sugiera una acción. Recuperas **take responsibility**, cambias a pasado **took** y lees: *The organiser took responsibility for the delay*. Otro: *The organiser ___ the complaint*. Sin más contexto hay varias acciones posibles, pero «investigó» activa **looked into**.

Una misma palabra puede participar en sistemas distintos. *Make up for* lleva partícula y significa compensar; *make a decision* lleva sustantivo y expresa decidir; *great success* no necesita un verbo fijo hasta que construyes la oración. Etiquetar el patrón impide mezclar piezas: *make for a decision* o *take up with pressure*.

---

## 7. Reading: A sustainable food and music festival

> A community planned a sustainable food and music festival. The team **went through** every supplier and **looked into** renewable energy. They did not **give up** when the original venue **put off** the booking. The chef **took responsibility** for a local menu and **made an effort** to reuse ingredients. A promoter **made up for** the delay with an extra band. **Heavy pressure** caused **strong anxiety**, but **full support** produced **great progress**. In the end, the event **went off well** and **made a deep impact** on the audience.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-30/reading-u30.mp3" title="🔊 Reading Unidad 30"></audio>

Clasifica cada expresión por unidad. Después busca una conexión causal: la reserva se pospone, el promotor compensa, la presión provoca ansiedad y el apoyo permite progreso. Reescribe el párrafo cambiando el festival por una jornada escolar. Conserva al menos ocho chunks y adapta *venue, promoter, chef* a la nueva situación.

El reading muestra que los temas pueden mezclarse sin perder coherencia: sostenibilidad define proveedores, música aporta banda y recinto, gastronomía aporta menú, psicología describe presión y apoyo. Tu producción final debe lograr esa integración. No insertes una palabra de cada lista solo para cumplir; crea primero una situación donde las cuatro áreas se encuentren.

---

## 8. Diálogo diagnóstico y errores del bloque

<audio controls preload="none" src="/audio/blog/curso-b2/unit-30/dialogue-u30.mp3" title="🔊 Diálogo Unidad 30"></audio>

> **A:** Did you **get through** the planning stage?  
> **B:** Yes, although we nearly **gave up**.  
> **A:** Who **looked into** the venue?  
> **B:** The promoter, who **made up for** the delay.  
> **A:** Did the chef **take responsibility**?  
> **B:** Yes, after **having a look at** the menu.  
> **A:** Was there **heavy pressure**?  
> **B:** Yes, but **full support** brought **great relief**.  
> **A:** How did the festival **go off**?  
> **B:** It was a **great success**.

| Mezcla incorrecta | Corrección |
| :--- | :--- |
| *get over to someone by phone* | **get through to** someone |
| *give up to pressure* | **give in to** pressure |
| *look forward to attend* | look forward to **attending** |
| *make up the delay* | **make up for** the delay |
| *put up the noise* | **put up with** the noise |
| *take a decision* | **make a decision** |
| *do responsibility* | **take responsibility** |
| *make a look* | **have a look** |
| *strong pressure* en el inventario | **heavy pressure** |
| *a great progress* | **great progress** |

Usa la tabla como diagnóstico. Marca cada error que habrías cometido y vuelve únicamente a esa unidad. Un repaso eficiente no repite cuatro artículos completos si solo falla un contraste. Al día siguiente, reconstruye la corrección sin mirar y añade un ejemplo nuevo.

""" + learning_lab(
        30,
        "el repaso integrado de sostenibilidad, música, gastronomía y psicología",
        "los phrasal verbs de U26–27 y las collocations de U28–29",
        "get over/get through, give up/give in, make up/make up for, make/take/have y strong/heavy/great",
        "presenta un evento comunitario durante dos minutos e integra tres phrasals de cada familia y seis colocaciones",
    ) + r"""

---

## 12. Ejercicios integrados con soluciones

""" + _ex_block(
        [
            (
                "Identifica unidad y completa: *It took the team weeks to ______ a difficult planning period.*",
                "**get through**; corresponde a U26 y destaca completar un periodo difícil.",
            ),
            (
                "Completa dos contrastes U26: *Don't ______ the project and don't ______ to pressure.*",
                "Don't **give up** the project; don't **give in** to pressure.",
            ),
            (
                "Corrige U27: *We look forward to attend the gig, and the promoter is looking the ticket problem.*",
                "We look forward to **attending** the gig, and the promoter is **looking into** the ticket problem.",
            ),
            (
                "Elige: *An extra song (made up / made up for / made out) the delay.* Explica por qué.",
                "**made up for**, porque compensa el retraso. *Made up* inventaría algo y *made out* distinguiría.",
            ),
            (
                "Completa U27: *We put up ___ a hotel and put up ___ the traffic noise.*",
                "**at** a hotel; **with** the traffic noise.",
            ),
            (
                "Corrige tres verbos U28: *We took a decision, did a mistake and made responsibility.*",
                "We **made a decision**, **made a mistake** and **took responsibility**.",
            ),
            (
                "Completa artículos: *After ___ quick look, we made ___ progress and took ___ short break.*",
                "After **a** quick look, we made **—** progress and took **a** short break.",
            ),
            (
                "Selecciona U29: *(strong/heavy) anxiety, (strong/heavy) burden, (high/full) demand, (high/full) support.*",
                "**strong anxiety, heavy burden, high demand, full support**.",
            ),
            (
                "Transforma en pasado sin romper los chunks: *We make great progress, take responsibility and go through every option.*",
                "We **made great progress, took responsibility and went through** every option.",
            ),
            (
                "Producción final: escribe 160–180 palabras sobre un festival sostenible con 4 phrasals U26, 4 U27, 4 verb+noun y 4 adjective+noun collocations.",
                "Respuesta abierta. Etiqueta los 16 chunks por unidad, comprueba partículas/artículos y asegúrate de que cada expresión contribuye a una historia coherente.",
            ),
        ]
    )
    return slug, sections


def patch_existing_content() -> None:
    """Link U25 forward and refresh the B2 publication tracker."""
    u25_path = OUT_MD / "unidad-25-repaso-21-24.md"
    u25 = u25_path.read_text(encoding="utf-8")
    u26_link = "- [U26 teoría — GET, GIVE, GO + sustainability](/blog/curso-b2/unidad-26-phrasal-verbs-3-sustainability)"
    if u26_link not in u25:
        anchor = (
            "- [Unidad 25 del curso](/curso-b2/unit-25)\n"
            "- Vuelve a [U21](/blog/curso-b2/unidad-21-linkers-contrast-personal-development) si el contraste aún tambalea"
        )
        replacement = (
            "- [Unidad 25 del curso](/curso-b2/unit-25)\n"
            f"{u26_link}\n"
            "- Vuelve a [U21](/blog/curso-b2/unidad-21-linkers-contrast-personal-development) si el contraste aún tambalea"
        )
        if anchor not in u25:
            raise ValueError("Could not locate U25 next-step anchor")
        u25_path.write_text(u25.replace(anchor, replacement, 1), encoding="utf-8")
        print("patch", u25_path.relative_to(ROOT))

    docs_path = ROOT / "docs/curso-b2-articulos-explicativos.md"
    docs = docs_path.read_text(encoding="utf-8")
    docs = re.sub(
        r"\*\*Última actualización:\*\* .+",
        "**Última actualización:** 2026-08-31 (Teoría Módulo 3 U26–30; cuadernos publicados hasta U25; teoría publicada hasta U30)",
        docs,
        count=1,
    )
    docs = re.sub(
        r"\| Artículos dedicados publicados \| \d+ \|",
        "| Artículos dedicados publicados | 30 |",
        docs,
        count=1,
    )
    docs = re.sub(
        r"\| Artículos dedicados pendientes \| \d+ \|",
        "| Artículos dedicados pendientes | 30 |",
        docs,
        count=1,
    )
    old_marker = "## Módulo 3: Linkers & Phrasal verbs (U21–30)"
    new_marker = "## Módulo 3: Linkers, Phrasal verbs & Collocations (U21–30)"
    marker = old_marker if old_marker in docs else new_marker
    if marker not in docs:
        raise ValueError("Could not locate Module 3 tracker section")
    module_three = """## Módulo 3: Linkers, Phrasal verbs & Collocations (U21–30)

### U21–25 — Linkers + Phrasal verbs 1–2

| U | Título | Gramática / tema | Teoría | Cuaderno |
|---|---|---|---|---|
| 21 | Linkers Contrast & Personal Development | although, despite, in spite of, whereas, however; personal development | ✅ | ✅ |
| 22 | Linkers Reason Purpose & Photography | because of, due to, in order to, so that, as a result; photography & media | ✅ | ✅ |
| 23 | Phrasal Verbs 1 & Home & Living | BE / BREAK / BRING; home & living | ✅ | ✅ |
| 24 | Phrasal Verbs 2 & Social Media | CALL / CARRY / COME; social media & networking | ✅ | ✅ |
| 25 | Repaso 21–24 | integración | ✅ | ✅ |

Teoría M3 (U21–25):
- [U21](/blog/curso-b2/unidad-21-linkers-contrast-personal-development) · [U22](/blog/curso-b2/unidad-22-linkers-reason-purpose-photography) · [U23](/blog/curso-b2/unidad-23-phrasal-verbs-1-home-living) · [U24](/blog/curso-b2/unidad-24-phrasal-verbs-2-social-media) · [U25](/blog/curso-b2/unidad-25-repaso-21-24)

Cuadernos M3 (U21–25):
- [U21](/blog/curso-b2/unidad-21-linkers-contrast-personal-development-ejercicios-soluciones) · [U22](/blog/curso-b2/unidad-22-linkers-reason-purpose-photography-ejercicios-soluciones) · [U23](/blog/curso-b2/unidad-23-phrasal-verbs-1-home-living-ejercicios-soluciones) · [U24](/blog/curso-b2/unidad-24-phrasal-verbs-2-social-media-ejercicios-soluciones) · [U25](/blog/curso-b2/unidad-25-repaso-21-24-ejercicios-soluciones)

### U26–30 — Phrasal verbs 3–4 + Collocations

| U | Título | Gramática / tema | Teoría | Cuaderno |
|---|---|---|---|---|
| 26 | Phrasal Verbs 3 & Sustainability | GET / GIVE / GO; sustainability & eco-living | ✅ | ❌ |
| 27 | Phrasal Verbs 4 & Music | LOOK / MAKE / PUT; music & entertainment | ✅ | ❌ |
| 28 | Verb + Noun Collocations & Food | make / take / have + noun; food & gastronomy | ✅ | ❌ |
| 29 | Adjective + Noun Collocations & Psychology | strong / heavy / great + precision adjectives; psychology & mind | ✅ | ❌ |
| 30 | Repaso 26–29 | integración | ✅ | ❌ |

Teoría M3 (U26–30):
- [U26](/blog/curso-b2/unidad-26-phrasal-verbs-3-sustainability) · [U27](/blog/curso-b2/unidad-27-phrasal-verbs-4-music) · [U28](/blog/curso-b2/unidad-28-collocations-verb-noun-food) · [U29](/blog/curso-b2/unidad-29-collocations-adj-noun-psychology) · [U30](/blog/curso-b2/unidad-30-repaso-26-29)

**Estado del Módulo 3:** teoría completa U21–30; cuadernos completos U21–25 y pendientes U26–30.

---

## Módulos 4–6 (U31–60)

Pendiente. La siguiente unidad prevista es U31 **Articles & Education**. Ver [planificación B2](./curso-b2-planificacion.md).
"""
    docs = docs.split(marker, 1)[0] + module_three
    docs_path.write_text(docs, encoding="utf-8")
    print("patch", docs_path.relative_to(ROOT))


def write_articles() -> None:
    slug, sections = build_u30()
    write_checked(
        f"{slug}.md",
        article(
            slug=slug,
            unit=30,
            title="Repaso B2 Unidades 26–29: Phrasal Verbs & Collocations",
            description="Repasa GET/GIVE/GO, LOOK/MAKE/PUT y collocations verbo+sustantivo y adjetivo+sustantivo de B2 con ejercicios, reading y audio.",
            image="/blog/curso-b2/unit-30/review-map.png",
            alt="Repaso B2 Unidades 26 a 29 phrasal verbs y collocations",
            readTime="30 min",
            keywords=[
                "repaso inglés B2 unidades 26 29",
                "phrasal verbs collocations B2 ejercicios",
                "GET GIVE GO LOOK MAKE PUT review",
                "make take have strong heavy great",
                "repaso módulo 3 B2",
                "inglés B2 unidad 30",
            ],
            related=[
                f"{slug}-ejercicios-soluciones",
                "unidad-29-collocations-adj-noun-psychology",
                "unidad-31-articles-education",
                "unidad-31-articles-education-ejercicios-soluciones",
                HUB,
            ],
            faqs=[
                (
                    "¿Qué contenidos integra la Unidad 30?",
                    "U26 **GET/GIVE/GO**, U27 **LOOK/MAKE/PUT**, U28 collocations **verbo+sustantivo** y U29 collocations **adjetivo+sustantivo**.",
                ),
                (
                    "¿Cómo sé si necesito un phrasal verb o una collocation?",
                    "Mira el núcleo: un verbo base con significado incompleto suele pedir partícula; un sustantivo como *decision* o *pressure* activa su compañero habitual.",
                ),
                (
                    "¿Cuál es el error más frecuente del repaso?",
                    "Mezclar familias: *give up to pressure, make up a delay, take a decision* o *strong pressure*. Recupera el chunk entero antes de escribir.",
                ),
                (
                    "¿Debo volver a estudiar las cuatro unidades completas?",
                    "Solo si el diagnóstico muestra fallos generales. Si falla un contraste concreto, repasa su tabla, crea tres ejemplos y vuelve a probarlo al día siguiente.",
                ),
                (
                    "¿Dónde practico la Unidad 30?",
                    "En la [Unidad 30 del curso B2](/curso-b2/unit-30) y en el [cuaderno de repaso](/blog/curso-b2/unidad-30-repaso-26-29-ejercicios-soluciones).",
                ),
            ],
            excerpt="Repaso integrado B2 de las Unidades 26–29: phrasal verbs, collocations y cuatro temas de vocabulario.",
            intro="""La **Unidad 30** cierra el segundo bloque del Módulo 3 y reúne cuatro sistemas: phrasal verbs **GET/GIVE/GO** de U26; **LOOK/MAKE/PUT** de U27; colocaciones **verbo + sustantivo** con *make, take, have* de U28; y colocaciones **adjetivo + sustantivo** de U29. El vocabulario mezcla sostenibilidad, música, gastronomía y psicología.

Un repaso B2 no consiste en releer cuatro listas. Debes identificar qué decisión exige cada frase. *Get through* y *go off* dependen del contexto; *make up for* conserva su partícula; *decision* selecciona *make* aunque el español diga «tomar»; *pressure* selecciona *heavy* aunque «fuerte» sugiera *strong*. La precisión aparece cuando eliges el chunk completo bajo presión moderada.

Esta guía funciona como diagnóstico y consolidación. Encontrarás un mapa visual, cuatro repasos concentrados, una estrategia para clasificar huecos, reading y diálogo integrados, audio y diez ejercicios con soluciones. Al final producirás una historia que conecta un festival sostenible, una actuación musical, un menú local y el efecto de la presión y el apoyo.""",
            before="[U29 — Adjective + Noun Collocations + Psychology](/blog/curso-b2/unidad-29-collocations-adj-noun-psychology)",
            learn=[
                "Recuperar los sentidos múltiples de **GET/GIVE/GO**",
                "Elegir con precisión entre **LOOK/MAKE/PUT**",
                "Evitar trampas hispanohablantes en **MAKE/TAKE/HAVE/DO**",
                "Producir las parejas **STRONG/HEAVY/GREAT** y los adjetivos precisos",
                "Integrar cuatro campos léxicos en reading, diálogo y producción",
            ],
            sections=sections,
            tip="Antes de rellenar, etiqueta el hueco: **phrasal**, **verb+noun** o **adjective+noun**. Esa pausa de un segundo evita combinar piezas de unidades distintas y te obliga a recuperar una expresión completa.",
            summary="""| Unidad | Control mínimo |
| :--- | :--- |
| **U26** | get through (contacto/periodo) · give up/in · go through/on/off |
| **U27** | look into/for/after/forward to · make up/for/out/for/mind · put off/up at/up with |
| **U28** | 9 MAKE · 5 TAKE · 4 HAVE; evitar *do* como comodín |
| **U29** | strong/heavy/great + lively, stunning, high, full, deep, remarkable, considerable |""",
            next_block="""Después del cierre de U26–30, la secuencia continuará con **U31 — Articles & Education**. Su artículo teórico y sus cuadernos están **pendientes de publicación**; mientras tanto, consolida este bloque con los cuadernos disponibles:

- [Ejercicios U26](/blog/curso-b2/unidad-26-phrasal-verbs-3-sustainability-ejercicios-soluciones)
- [Ejercicios U27](/blog/curso-b2/unidad-27-phrasal-verbs-4-music-ejercicios-soluciones)
- [Ejercicios U28](/blog/curso-b2/unidad-28-collocations-verb-noun-food-ejercicios-soluciones)
- [Ejercicios U29](/blog/curso-b2/unidad-29-collocations-adj-noun-psychology-ejercicios-soluciones)
- [Ejercicios U30 (repaso)](/blog/curso-b2/unidad-30-repaso-26-29-ejercicios-soluciones)
- Próximamente: U31 **Articles & Education** (teoría y cuaderno)""",
            guides=[
                "[U29 Adjective + Noun](/blog/curso-b2/unidad-29-collocations-adj-noun-psychology)",
                "[U31 Articles & Education — pendiente](/blog/curso-b2/unidad-31-articles-education)",
                "[Cuaderno U31 — pendiente](/blog/curso-b2/unidad-31-articles-education-ejercicios-soluciones)",
                "[Inglés B2](/blog/metodos/ingles-b2)",
            ],
            sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — B1–B2 grammar and vocabulary: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar
- Cambridge Dictionary — Phrasal verbs and collocations reference entries""",
        ),
    )
    slug, sections = build_u29()
    write_checked(
        f"{slug}.md",
        article(
            slug=slug,
            unit=29,
            title="Adjective + Noun Collocations B2: Psychology & Mind",
            description="Aprende strong anxiety, heavy pressure, great progress, full support, remarkable resilience y más collocations B2 con psicología y ejercicios.",
            image="/blog/curso-b2/unit-29/collocations-adj-noun.png",
            alt="Collocations adjetivo sustantivo B2 con vocabulario de psicología",
            readTime="29 min",
            keywords=[
                "adjective noun collocations B2",
                "strong anxiety heavy pressure",
                "great progress remarkable resilience",
                "collocations psychology English",
                "mental health vocabulary B2",
                "inglés B2 unidad 29",
            ],
            related=[
                f"{slug}-ejercicios-soluciones",
                "unidad-28-collocations-verb-noun-food",
                "unidad-30-repaso-26-29",
                HUB,
            ],
            faqs=[
                (
                    "¿Se dice strong anxiety o heavy anxiety?",
                    "La colocación objetivo de la Unidad 29 es **strong anxiety**. Para presión y carga usamos **heavy pressure** y **heavy burden**.",
                ),
                (
                    "¿Progress lleva artículo?",
                    "En **make great progress**, *progress* es incontable y no lleva *a*. Decir *a great progress* es un error típico.",
                ),
                (
                    "¿High demand y strong demand son siempre intercambiables?",
                    "No necesariamente. La unidad fija **high demand**, que presenta la demanda como un nivel elevado y combina naturalmente con *for*.",
                ),
                (
                    "¿Cómo uso estas palabras sin hacer afirmaciones médicas?",
                    "Describe experiencias o lenguaje del texto, atribuye datos a sus fuentes y evita presentar ejercicios lingüísticos como diagnóstico o tratamiento.",
                ),
                (
                    "¿Dónde practico la Unidad 29?",
                    "En la [Unidad 29 del curso B2](/curso-b2/unit-29) y en el [cuaderno con soluciones](/blog/curso-b2/unidad-29-collocations-adj-noun-psychology-ejercicios-soluciones).",
                ),
            ],
            excerpt="Guía B2 de collocations adjetivo+sustantivo para hablar de Psychology & Mind con precisión.",
            intro="""La **Unidad 29** amplía el trabajo de colocaciones con parejas **adjetivo + sustantivo**: **strong anxiety, heavy burden, strong belief, heavy pressure, great progress, lively discussion, stunning results, great relief, high demand, strong influence, full support, deep impact, remarkable memory, remarkable resilience, great success, great interest** y **considerable controversy**.

El español permite construir muchas de estas ideas con «fuerte», «grande» o «importante». El inglés distribuye esos significados entre adjetivos diferentes. Una presión es *heavy*, una demanda es *high*, un impacto es *deep* y un apoyo completo es *full*. Las alternativas pueden entenderse, pero no siempre forman el chunk convencional que espera un texto natural o un ejercicio de nivel B2.

El contexto de **Psychology & Mind** da coherencia al inventario: ansiedad, presión, terapia, mentalidad, salud mental, resiliencia y recuperación. La guía utiliza ejemplos respetuosos y no clínicos, audio, reading, diálogo y ejercicios para que aprendas la pareja completa. El objetivo no es memorizar adjetivos “intensos”, sino elegir el que acompaña naturalmente a cada sustantivo y ajustar el registro.""",
            before="[U28 — Verb + Noun Collocations + Food](/blog/curso-b2/unidad-28-collocations-verb-noun-food)",
            learn=[
                "Separar las familias **STRONG, HEAVY y GREAT**",
                "Usar **lively, stunning, high, full y deep** con su sustantivo natural",
                "Dominar **remarkable memory/resilience** y **considerable controversy**",
                "Controlar artículos y preposiciones en chunks como **make great progress**",
                "Hablar de **mental health, mindset, therapy y recovery** con precisión respetuosa",
            ],
            sections=sections,
            tip="Memoriza una imagen distinta: **strong** como fuerza, **heavy** como peso, **high** como nivel, **full** como totalidad y **deep** como profundidad. Después confirma siempre el chunk real; la imagen ayuda a recuperar, pero no reemplaza la colocación.",
            summary="""| Adjetivo | Sustantivos objetivo |
| :--- | :--- |
| **strong** | anxiety · belief · influence |
| **heavy** | burden · pressure |
| **great** | progress · relief · success · interest |
| **otros precisos** | lively discussion · stunning results · high demand · full support · deep impact |
| **registro destacado/formal** | remarkable memory/resilience · considerable controversy |""",
            next_block="""La **Unidad 30** integra U26–29: dos familias de phrasal verbs y dos sistemas de colocaciones en un repaso completo.

- [Ejercicios U29 con soluciones](/blog/curso-b2/unidad-29-collocations-adj-noun-psychology-ejercicios-soluciones)
- [Unidad 29 del curso](/curso-b2/unit-29)
- [U30 teoría: Repaso 26–29](/blog/curso-b2/unidad-30-repaso-26-29)""",
            guides=[
                "[U28 Verb + Noun Collocations](/blog/curso-b2/unidad-28-collocations-verb-noun-food)",
                "[U30 Repaso 26–29](/blog/curso-b2/unidad-30-repaso-26-29)",
                "[Inglés B2](/blog/metodos/ingles-b2)",
            ],
            sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Mental health vocabulary: https://learnenglish.britishcouncil.org/vocabulary/b1-b2-vocabulary
- Cambridge Dictionary — Collocation examples for pressure, progress, support and resilience""",
        ),
    )
    slug, sections = build_u28()
    write_checked(
        f"{slug}.md",
        article(
            slug=slug,
            unit=28,
            title="Verb + Noun Collocations B2: Make, Take, Have + Food",
            description="Aprende 18 collocations con make, take y have en inglés B2: make a decision, take a break, have a look y más, con gastronomía y ejercicios.",
            image="/blog/curso-b2/unit-28/collocations-verb-noun.png",
            alt="Collocations verbo sustantivo MAKE TAKE HAVE B2 con gastronomía",
            readTime="29 min",
            keywords=[
                "verb noun collocations B2",
                "make take have collocations ejercicios",
                "make a decision take a break",
                "make vs do para hispanohablantes",
                "food gastronomy vocabulary B2",
                "inglés B2 unidad 28",
            ],
            related=[
                f"{slug}-ejercicios-soluciones",
                "unidad-27-phrasal-verbs-4-music",
                "unidad-29-collocations-adj-noun-psychology",
                HUB,
            ],
            faqs=[
                (
                    "¿Por qué se dice make a decision si en español decimos tomar una decisión?",
                    "Porque las colocaciones no se traducen verbo por verbo. El sustantivo **decision** selecciona normalmente **make** en inglés.",
                ),
                (
                    "¿Cuándo uso make y cuándo do?",
                    "Aprende la pareja completa. En esta unidad usamos **make a mistake/progress/noise**; *do* aparece en otros chunks como *do work* o *do research*.",
                ),
                (
                    "¿Take a photo o make a photo?",
                    "La colocación estándar es **take a photo of** algo. *Make a photo* no es la opción natural para fotografiar.",
                ),
                (
                    "¿Have a shower y take a shower son correctos?",
                    "Sí, según variedad y contexto. La Unidad 28 fija **have a shower**, habitual en inglés británico, como objetivo del curso.",
                ),
                (
                    "¿Dónde practico la Unidad 28?",
                    "En la [Unidad 28 del curso B2](/curso-b2/unit-28) y en el [cuaderno con soluciones](/blog/curso-b2/unidad-28-collocations-verb-noun-food-ejercicios-soluciones).",
                ),
            ],
            excerpt="Las 18 collocations verbo+sustantivo de B2 con MAKE, TAKE y HAVE explicadas para hispanohablantes.",
            intro="""La **Unidad 28** cambia de phrasal verbs a **collocations verbo + sustantivo**. Aprenderás dieciocho combinaciones como **take a break, make a decision, make a mistake, take a photo, take responsibility, make progress, make an effort, have a meeting, have a look** y **make a good impression**. El vocabulario de **Food & Gastronomy** permite usarlas dentro de reuniones de cocina, diseño de menús y preparación de recetas.

Para un hispanohablante, este tema presenta una trampa constante: el verbo español «hacer» puede convertirse en **make, take, have o do**. No puedes fabricar la combinación traduciendo cada palabra. Decimos *make a mistake* pero *take a photo*; *make a suggestion* pero *have a look*. La elección natural pertenece al sustantivo y debe memorizarse como una sola pieza.

La guía organiza las dieciocho formas por verbo, pero también las mezcla en historias realistas. Encontrarás audio para cada grupo, un reading sobre un menú estacional, un diálogo de cocina, ejercicios con soluciones y un método para corregir interferencias. El objetivo final es que el sustantivo active automáticamente su verbo antes de que aparezca el comodín *do*.""",
            before="[U27 — LOOK, MAKE, PUT + music](/blog/curso-b2/unidad-27-phrasal-verbs-4-music)",
            learn=[
                "Dominar las nueve colocaciones de **MAKE** del temario",
                "Usar las cinco combinaciones de **TAKE** sin traducir literalmente",
                "Producir las cuatro expresiones con **HAVE**",
                "Evitar las trampas **make/take/have/do** típicas de hispanohablantes",
                "Distinguir **recipe, chef, ingredients, cuisine, meal y menu**",
            ],
            sections=sections,
            tip="Haz tarjetas en dirección **sustantivo → verbo**. Ver *decision* y recuperar *make a decision* se parece a la tarea real. Si siempre ves *make* delante, solo entrenas reconocimiento y no la elección que más cuesta.",
            summary="""| Verbo | Collocations del curso |
| :--- | :--- |
| **MAKE** | a decision · a mistake · progress · an effort · a suggestion · a call · noise · a promise · a good impression |
| **TAKE** | a break · a photo · responsibility · a chance · a note |
| **HAVE** | a meeting · a look · a deadline · a shower |
| **No comodín** | *do* tiene otros chunks; no sustituye estas dieciocho combinaciones |""",
            next_block="""La **Unidad 29** mantiene el trabajo de collocations, pero combina **adjetivo + sustantivo** dentro de Psychology & Mind.

- [Ejercicios U28 con soluciones](/blog/curso-b2/unidad-28-collocations-verb-noun-food-ejercicios-soluciones)
- [Unidad 28 del curso](/curso-b2/unit-28)
- [U29 teoría: Adjective + Noun Collocations](/blog/curso-b2/unidad-29-collocations-adj-noun-psychology)""",
            guides=[
                "[U27 Phrasal verbs 4](/blog/curso-b2/unidad-27-phrasal-verbs-4-music)",
                "[U29 Adjective + Noun Collocations](/blog/curso-b2/unidad-29-collocations-adj-noun-psychology)",
                "[Inglés B2](/blog/metodos/ingles-b2)",
            ],
            sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Collocations: https://learnenglish.britishcouncil.org/vocabulary/b1-b2-vocabulary
- Cambridge Dictionary — English collocations with make, take and have""",
        ),
    )
    slug, sections = build_u27()
    write_checked(
        f"{slug}.md",
        article(
            slug=slug,
            unit=27,
            title="LOOK, MAKE, PUT Phrasal Verbs B2: Make Up One's Mind + Music",
            description="Domina look into, look forward to, make up for, make out, put off y put up with en inglés B2 con música, audios y ejercicios resueltos.",
            image="/blog/curso-b2/unit-27/phrasal-look-make-put.png",
            alt="Phrasal verbs LOOK MAKE PUT B2 con vocabulario de música",
            readTime="28 min",
            keywords=[
                "phrasal verbs LOOK MAKE PUT B2",
                "look forward to gerundio",
                "make up vs make up for",
                "make up one's mind ejercicios",
                "put up with significado",
                "music entertainment vocabulary B2",
                "inglés B2 unidad 27",
            ],
            related=[
                f"{slug}-ejercicios-soluciones",
                "unidad-26-phrasal-verbs-3-sustainability",
                "unidad-28-collocations-verb-noun-food",
                HUB,
            ],
            faqs=[
                (
                    "¿Por qué se dice look forward to seeing y no to see?",
                    "Porque **to** forma parte de la expresión como preposición. Después va un nombre o una forma **-ing**: *look forward to the gig / to seeing the band*.",
                ),
                (
                    "¿Qué diferencia hay entre look into y look for?",
                    "**Look into** es investigar un asunto; **look for** es buscar una persona u objeto que quieres localizar.",
                ),
                (
                    "¿Make up y make up for son iguales?",
                    "No. **Make up** puede ser inventar; **make up for** significa compensar algo negativo y necesita **for**.",
                ),
                (
                    "¿Put off y put up with se pueden separar?",
                    "**Put off** es separable (*put it off*). **Put up with** funciona como bloque inseparable antes de aquello que toleras.",
                ),
                (
                    "¿Dónde practico la Unidad 27?",
                    "En la [Unidad 27 del curso B2](/curso-b2/unit-27) y en el [cuaderno con soluciones](/blog/curso-b2/unidad-27-phrasal-verbs-4-music-ejercicios-soluciones).",
                ),
            ],
            excerpt="Guía B2 de LOOK/MAKE/PUT y vocabulario de Music & Entertainment, con contrastes, audio y práctica.",
            intro="""La **Unidad 27** completa el gran bloque de phrasal verbs del Módulo 3 con **LOOK, MAKE y PUT**. El contexto es **Music & Entertainment**: investigar una reserva, esperar un festival con ilusión, cuidar instrumentos, buscar entradas, compensar un retraso, distinguir un anuncio, dirigirse a la taquilla, decidirse, posponer un concierto, alojarse y tolerar ruido.

El reto central no es la cantidad, sino distinguir formas visualmente parecidas. **Look into** investiga, mientras **look for** busca; **make up** inventa, mientras **make up for** compensa; **put off** pospone, mientras **put up with** tolera. También aparece una trampa gramatical clásica: en *look forward to*, **to** es preposición, por eso decimos *I look forward to **seeing** the band*.

Esta guía convierte las doce expresiones en una noche completa de música. Seguirás a público, banda y promotor desde la compra de *tickets* hasta el *backstage*. Las tablas aclaran significado y patrón; los audios entrenan el chunk completo; el reading y el diálogo muestran cómo conviven; y los ejercicios te obligan a elegir con pistas concretas, no por intuición vaga.""",
            before="[U26 — GET, GIVE, GO + sustainability](/blog/curso-b2/unidad-26-phrasal-verbs-3-sustainability)",
            learn=[
                "Usar **look into, look forward to, look after y look for** sin confundir función",
                "Separar **make up** de **make up for** y dominar **make out / make for**",
                "Construir correctamente **make up one's mind** con el posesivo adecuado",
                "Distinguir **put off, put up at y put up with**",
                "Manejar vocabulario de **venue, gig, box office, rehearsal, tour y audience**",
            ],
            sections=sections,
            tip="Asocia cada partícula con una pregunta funcional: ¿investigo o busco? ¿invento o compenso? ¿pospongo, me alojo o tolero? Si respondes primero a la pregunta, reduces la tentación de elegir por parecido visual.",
            summary="""| Base | Formas clave |
| :--- | :--- |
| **LOOK** | into (investigar) · forward to + noun/-ing · after (cuidar) · for (buscar) |
| **MAKE** | up · up for · out · for · up one's mind |
| **PUT** | off (posponer) · up at (alojarse) · up with (tolerar) |
| **Music** | venue · gig · box office · album · rehearsal · sold out · tour · backstage |""",
            next_block="""En la **Unidad 28** dejas las partículas y pasas a **collocations verbo + sustantivo** con *make, take* y *have*, dentro de Food & Gastronomy.

- [Ejercicios U27 con soluciones](/blog/curso-b2/unidad-27-phrasal-verbs-4-music-ejercicios-soluciones)
- [Unidad 27 del curso](/curso-b2/unit-27)
- [U28 teoría: Verb + Noun Collocations](/blog/curso-b2/unidad-28-collocations-verb-noun-food)""",
            guides=[
                "[U26 Phrasal verbs 3](/blog/curso-b2/unidad-26-phrasal-verbs-3-sustainability)",
                "[U28 Verb + Noun Collocations](/blog/curso-b2/unidad-28-collocations-verb-noun-food)",
                "[Inglés B2](/blog/metodos/ingles-b2)",
            ],
            sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Phrasal verbs: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/phrasal-verbs
- Cambridge Dictionary — look forward to, make up for, make out and put up with""",
        ),
    )
    slug, sections = build_u26()
    write_checked(
        f"{slug}.md",
        article(
            slug=slug,
            unit=26,
            title="Phrasal Verbs GET, GIVE, GO B2 + Sustainability & Eco-living",
            description="Aprende get over, get through, give up, give in, go through y go off en inglés B2 con sostenibilidad, audios, reading y ejercicios resueltos.",
            image="/blog/curso-b2/unit-26/phrasal-get-give-go.png",
            alt="Phrasal verbs GET GIVE GO B2 con vocabulario de sostenibilidad",
            readTime="27 min",
            keywords=[
                "phrasal verbs GET GIVE GO B2",
                "get through vs get over",
                "give up vs give in ejercicios",
                "go off significados inglés",
                "sustainability vocabulary B2",
                "inglés B2 unidad 26",
            ],
            related=[
                f"{slug}-ejercicios-soluciones",
                "unidad-25-repaso-21-24",
                "unidad-27-phrasal-verbs-4-music",
                HUB,
            ],
            faqs=[
                (
                    "¿Cuál es la diferencia entre get over y get through?",
                    "**Get over** enfoca la recuperación de un miedo, enfermedad o decepción; **get through** enfoca completar un periodo difícil o lograr contactar por teléfono.",
                ),
                (
                    "¿Give up y give in significan rendirse?",
                    "Se parecen, pero **give up** es abandonar una actividad o esfuerzo; **give in to** es ceder ante presión, una demanda o una tentación.",
                ),
                (
                    "¿Qué dos sentidos de go off aparecen en la Unidad 26?",
                    "Una alarma **goes off** cuando suena; un evento **goes off well/smoothly** cuando sale bien o sin problemas.",
                ),
                (
                    "¿Reduce, reuse y recycle son intercambiables?",
                    "No. **Reduce** es consumir menos, **reuse** es volver a usar el objeto y **recycle** es transformar su material.",
                ),
                (
                    "¿Dónde practico la Unidad 26?",
                    "En la [Unidad 26 del curso B2](/curso-b2/unit-26) y en su [cuaderno con soluciones](/blog/curso-b2/unidad-26-phrasal-verbs-3-sustainability-ejercicios-soluciones).",
                ),
            ],
            excerpt="Guía B2 de GET/GIVE/GO con sus significados múltiples y vocabulario de sustainability & eco-living.",
            intro="""La **Unidad 26** abre la segunda mitad del Módulo 3 con nueve combinaciones de alta frecuencia: **get over, get along, get through; give up, give in, give away; go through, go on y go off**. El contexto oficial es **Sustainability & Eco-living**, así que las practicarás al hablar de hábitos de cero residuos, energía renovable, compost, plástico de un solo uso y huella de carbono.

Este bloque exige algo más que asociar una traducción a cada forma. *Get through* puede significar **lograr contactar** o **superar un periodo difícil**; *go off* describe tanto una alarma que suena como un evento que sale bien. Además, el español puede traducir *give up* y *give in* como «rendirse», aunque el primero abandona un esfuerzo y el segundo cede ante una presión. Esas diferencias aparecen explícitamente en tablas, reading, diálogo y ejercicios.

La sostenibilidad ofrece un marco útil porque cualquier cambio de hábitos incluye relaciones, resistencia, revisión y continuidad. Puedes llevarte bien con quienes comparten compost, atravesar una transición exigente, no abandonar el objetivo y revisar cada compra. La meta de esta guía no es juzgar tus decisiones ecológicas, sino darte lenguaje B2 preciso para describir procesos reales, con sus dificultades y resultados.""",
            before="[U25 — Repaso de las Unidades 21–24](/blog/curso-b2/unidad-25-repaso-21-24)",
            learn=[
                "Distinguir **get over, get along (with) y get through** en sus contextos reales",
                "Separar **give up** (abandonar) de **give in** (ceder) y usar **give away**",
                "Entender **go through, go on y go off**, incluidos los dos sentidos clave de *go off*",
                "Usar vocabulario de **zero waste, carbon footprint, compost y renewable energy**",
                "Producir un relato sostenible con al menos seis phrasal verbs completos",
            ],
            sections=sections,
            tip="No guardes *get through* ni *go off* en una sola casilla española. Guarda dos escenas por forma: **teléfono + periodo difícil** para *get through*; **alarma + evento** para *go off*. Si puedes describir ambas sin traducir palabra por palabra, el significado ya depende del contexto.",
            summary="""| Familia | Formas y decisión clave |
| :--- | :--- |
| **GET** | get over (recuperación) · get along with (relación) · get through (contacto o periodo) |
| **GIVE** | give up (abandonar) · give in to (ceder) · give away (regalar/revelar) |
| **GO** | go through (experimentar/revisar) · go on (continuar) · go off (alarma/evento) |
| **Eco** | reduce · reuse · recycle · compost · carbon footprint · sustainable living |""",
            next_block="""Continúa con la **Unidad 27**, donde los phrasal verbs **LOOK, MAKE y PUT** se aplican a música y entretenimiento.

- [Ejercicios U26 con soluciones](/blog/curso-b2/unidad-26-phrasal-verbs-3-sustainability-ejercicios-soluciones)
- [Unidad 26 del curso](/curso-b2/unit-26)
- [U27 teoría: LOOK, MAKE, PUT + Music](/blog/curso-b2/unidad-27-phrasal-verbs-4-music)""",
            guides=[
                "[U25 Repaso 21–24](/blog/curso-b2/unidad-25-repaso-21-24)",
                "[U27 Phrasal verbs 4](/blog/curso-b2/unidad-27-phrasal-verbs-4-music)",
                "[Inglés B2](/blog/metodos/ingles-b2)",
            ],
            sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Phrasal verbs: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/phrasal-verbs
- Cambridge Dictionary — get through, give in, go off and sustainability entries""",
        ),
    )


def main() -> None:
    diagrams()
    tts()
    write_articles()
    patch_existing_content()
    print("done B2 theory U26–30")


if __name__ == "__main__":
    main()
