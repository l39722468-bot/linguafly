#!/usr/bin/env python3
"""Generate B2 theory U36–40: diagrams, markdown and English TTS audio.

The material mirrors the live files in src/lib/course/b2 for Units 36–40:
used to/would and Culture, auxiliaries and Business, RUN/SET/TAKE phrasal
verbs and Leisure, TURN/WORK phrasal verbs and Sport, then a mixed review.
"""
from __future__ import annotations

import re
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT_MD = ROOT / "src/content/blog/curso-b2"
DATE = "2026-09-01"
BG = (245, 248, 252)
INK = (20, 35, 55)
ACCENT = (22, 111, 143)
ACCENT_2 = (108, 69, 161)
CARD = (255, 255, 255)
LINE = (199, 215, 229)
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
    image = Image.new("RGB", (1200, 675), BG)
    return image, ImageDraw.Draw(image)


def card(draw, xy):
    draw.rounded_rectangle(xy, radius=18, fill=CARD, outline=LINE, width=2)


def title(draw, text: str, y: int = 36):
    draw.text((48, y), text, fill=INK, font=font(34, True))


def wrapped(
    draw,
    text: str,
    xy: tuple[int, int],
    width: int,
    size: int = 18,
    bold: bool = False,
    fill=INK,
):
    draw.multiline_text(
        xy,
        textwrap.fill(text, width=width),
        fill=fill,
        font=font(size, bold),
        spacing=8,
    )


def save(image, unit: int, name: str):
    path = ROOT / f"public/blog/curso-b2/unit-{unit}" / name
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "PNG", optimize=True)
    print("img", path.relative_to(ROOT))


def four_map(
    unit: int,
    name: str,
    heading: str,
    blocks: list[tuple[str, str, str]],
):
    image, draw = canvas()
    title(draw, heading)
    for index, (label, rule, example) in enumerate(blocks[:4]):
        column, row = index % 2, index // 2
        x, y = 48 + column * 570, 108 + row * 255
        card(draw, (x, y, x + 530, y + 225))
        draw.text((x + 22, y + 22), label, fill=ACCENT, font=font(24, True))
        wrapped(draw, rule, (x + 22, y + 72), 44, 18, True)
        wrapped(draw, example, (x + 22, y + 140), 48, 17)
    save(image, unit, name)


def vocab_grid(unit: int, name: str, heading: str, words: list[str]):
    image, draw = canvas()
    title(draw, heading)
    for index, word in enumerate(words[:12]):
        x = 48 + (index % 4) * 280
        y = 110 + (index // 4) * 170
        card(draw, (x, y, x + 250, y + 140))
        wrapped(draw, word, (x + 16, y + 43), 18, 18, True)
    save(image, unit, name)


def scene(unit: int, name: str, heading: str, examples: list[str]):
    image, draw = canvas()
    title(draw, heading)
    card(draw, (48, 105, 1150, 620))
    for index, example in enumerate(examples[:5]):
        wrapped(
            draw,
            f"{index + 1}. {example}",
            (80, 140 + index * 92),
            86,
            18,
            index == 0,
            ACCENT_2 if index == 0 else INK,
        )
    save(image, unit, name)


def diagrams() -> None:
    four_map(
        36,
        "used-to-would-map.png",
        "Used to & would · past habits and states",
        [
            ("USED TO", "past repeated actions and past states", "We used to celebrate the harvest."),
            ("WOULD", "repeated past actions after a time frame", "Every autumn, we would dance."),
            ("STATES", "use used to, not habitual would", "There used to be a market."),
            ("NOW", "the pattern often signals a past/present contrast", "She used to live there; now she teaches."),
        ],
    )
    vocab_grid(
        36,
        "culture-vocabulary.png",
        "Culture extended · heritage and traditions",
        [
            "tradition",
            "heritage",
            "custom",
            "ceremony",
            "folklore",
            "legend",
            "cultural diversity",
            "assimilate",
            "ritual",
            "superstition",
            "folk music",
            "hand down",
        ],
    )
    scene(
        36,
        "culture-context.png",
        "Past habits in a cultural memory",
        [
            "She used to live in a mountain village.",
            "Every Sunday, she would visit her grandmother.",
            "There used to be a market in the square.",
            "The village would hold a harvest festival every autumn.",
            "Now she preserves heritage by teaching folk music.",
        ],
    )

    four_map(
        37,
        "auxiliaries-map.png",
        "Auxiliaries · emphasis and short answers",
        [
            ("DO / DOES", "emphasis with present simple lexical verbs", "I do want to attend. He does agree."),
            ("DID", "past emphasis + base form", "She did submit the proposal."),
            ("BE / HAVE", "stress the auxiliary already in the verb phrase", "She is coming. They have finished."),
            ("SHORT ANSWERS", "repeat the question's auxiliary", "Did they sign? Yes, they did."),
        ],
    )
    vocab_grid(
        37,
        "business-vocabulary.png",
        "Business extended · decisions and results",
        [
            "contract",
            "close a deal",
            "budget",
            "merger",
            "submit a proposal",
            "audit",
            "CEO",
            "meet a deadline",
            "target",
            "exceed",
            "strategy",
            "profit",
        ],
    )
    scene(
        37,
        "business-context.png",
        "A positive business update",
        [
            "The team did complete the project on time.",
            "They have finished the audit.",
            "She did submit the proposal before the deadline.",
            "The deal has been closed and the budget approved.",
            "Will they proceed with the merger? Yes, they will.",
        ],
    )

    four_map(
        38,
        "run-set-take-map.png",
        "Phrasal verbs 5 · RUN · SET · TAKE",
        [
            ("RUN", "into · out of · through · by", "We ran into a friend and ran through the plan."),
            ("SET", "up · off · out · aside", "They set up a club and set aside time."),
            ("TAKE", "to · up · off · on", "She took up yoga and took to it quickly."),
            ("CONTEXT", "meaning comes from verb + particle + complement", "The flight took off; the hobby took off."),
        ],
    )
    vocab_grid(
        38,
        "leisure-vocabulary.png",
        "Leisure extended · activities and planning",
        [
            "hobby",
            "take up a hobby",
            "picnic",
            "unwind",
            "set aside time",
            "itinerary",
            "camping",
            "set off on a trip",
            "hiking",
            "explore",
            "pastime",
            "hike",
        ],
    )
    scene(
        38,
        "leisure-context.png",
        "A weekend with RUN, SET and TAKE",
        [
            "Tom took up photography last month.",
            "He ran into an old friend at a camera shop.",
            "Together they set up a photography club.",
            "They set off early for a hike but ran out of battery.",
            "Later, they ran through a camping itinerary.",
        ],
    )

    four_map(
        39,
        "turn-work-map.png",
        "Phrasal verbs 6 · TURN · WORK",
        [
            ("TURN UP / DOWN", "arrive or reject", "Fans turned up; she turned down an offer."),
            ("TURN OUT / INTO", "result or become", "It turned out well; he turned into a star."),
            ("WORK OUT", "exercise, solve or develop", "We worked out a training schedule."),
            ("WORK ON / THROUGH", "improve or overcome progressively", "She worked on her serve."),
        ],
    )
    vocab_grid(
        39,
        "sport-vocabulary.png",
        "Sport extended · training and competition",
        [
            "work out",
            "tournament",
            "injury",
            "turn up",
            "marathon",
            "work on a skill",
            "serve",
            "turn down",
            "athlete",
            "stadium",
            "training schedule",
            "stay fit",
        ],
    )
    scene(
        39,
        "sport-context.png",
        "Training, setbacks and results",
        [
            "Over five hundred fans turned up for the match.",
            "The match turned out to be a great success.",
            "She worked on her serve before the tournament.",
            "The team worked through an injury and came back stronger.",
            "Years of training turned him into a professional athlete.",
        ],
    )

    four_map(
        40,
        "review-map.png",
        "Repaso B2 · Unidades 36–39",
        [
            ("U36", "used to · would · past habits and states", "Culture"),
            ("U37", "auxiliary emphasis · short answers", "Business"),
            ("U38", "RUN · SET · TAKE phrasal verbs", "Leisure"),
            ("U39", "TURN · WORK phrasal verbs", "Sport"),
        ],
    )
    vocab_grid(
        40,
        "review-vocabulary.png",
        "Four fields · one integrated review",
        [
            "preserve heritage",
            "hand down",
            "close a deal",
            "meet a deadline",
            "take up a hobby",
            "set aside time",
            "turn up",
            "work out",
            "tournament",
            "injury",
            "run into",
            "turn out",
        ],
    )
    scene(
        40,
        "review-context.png",
        "From childhood traditions to an active life",
        [
            "Lisa used to celebrate the harvest and would dance.",
            "Her team did close an important deal last week.",
            "She ran into a colleague and set up a meeting.",
            "Over two hundred people turned up for the event.",
            "A friend worked through an injury and took up yoga.",
        ],
    )


AUDIOS = {
    36: {
        "used-to": "She used to live in a small village. There used to be a market in the square. She used to believe in superstitions.",
        "would-habits": "Every Sunday, she would visit her grandmother. They would gather around the fire. Her grandfather would tell folk tales.",
        "past-states": "Use used to for past states. They used to have a large house. I used to love local customs. He used to speak three languages.",
        "culture-vocabulary": "Tradition. Heritage. Custom. Ceremony. Folklore. Legend. Cultural diversity. Assimilate. Ritual. Superstition. Folk music.",
        "culture-collocations": "Preserve a tradition. Preserve heritage. Hold a ceremony. Celebrate a festival. Hand down a custom. Put down roots.",
        "reading-u36": "When she was young, she used to live in a mountain village. Every Sunday, she would visit her grandmother, and they would listen to folk tales around the fire. The village used to hold a harvest festival every autumn. Now she preserves her cultural heritage by teaching folk music to young people.",
        "dialogue-u36": "Did there use to be a market in the square? Yes, there did. What would people do there? They would buy local produce and listen to folk music. Did your family use to believe in superstitions? Some relatives did, but I did not.",
        "practice-u36": "Used to can describe repeated actions and states. Would describes repeated actions when the past time frame is clear. There used to be is the correct pattern for past existence.",
    },
    37: {
        "emphatic-do": "I do want to attend the meeting. He does agree with the terms. The team did complete the project on time.",
        "short-answers": "Did they sign the contract? Yes, they did. Have you submitted the proposal? No, I have not. Will they approve the budget? Yes, they will.",
        "auxiliary-families": "Are you attending? Yes, I am. Has the deal been closed? Yes, it has. Can you meet the deadline? Yes, I can.",
        "business-vocabulary": "Contract. Deal. Budget. Merger. Proposal. Audit. Chief executive officer. Deadline. Target. Strategy. Profit. Revenue.",
        "business-collocations": "Close a deal. Submit a proposal. Meet a deadline. Sign a contract. Deliver a presentation. Agree on terms. Exceed a target.",
        "reading-u37": "The team did complete the project on time despite the delays. They have finished the audit, and she did submit the proposal before the deadline. The deal has been closed, the budget has been approved, and the company will proceed with the merger.",
        "dialogue-u37": "Did the team close the deal? Yes, they did. Have they completed the audit? Yes, they have. Is the chief executive coming? Yes, she is. I do think the strategy is effective.",
        "practice-u37": "Use do, does, or did to emphasise a simple affirmative. Keep the lexical verb in the base form. In short answers, repeat the auxiliary from the question.",
    },
    38: {
        "run-family": "Run into means meet by accident. Run out of means use all of something. Run through means review. Run an idea by someone means ask for feedback.",
        "set-family": "Set up means create, organise, or erect. Set off and set out mean start a journey. Set aside means reserve.",
        "take-family": "Take up means start a hobby. Take to means begin to like. Take off can describe a plane or sudden success. Take on means accept a challenge.",
        "leisure-vocabulary": "Hobby. Picnic. Unwind. Itinerary. Camping. Hiking. Explore. Club. Leisure time. Pastime. Hike.",
        "phrasal-collocations": "Take up a hobby. Set aside time. Set off on a trip. Take on a challenge. Run into an old friend. Set up a club.",
        "reading-u38": "Tom took up photography last month and ran into an old friend at a camera shop. They set up a photography club and set off early for a hike. They ran out of battery, but they had a great time. Later, Tom ran through a camping itinerary with his friend.",
        "dialogue-u38": "What hobby did you take up? Photography. Did you take to it quickly? Yes, and my club really took off. What happened on your hike? We ran out of battery after we set off.",
        "practice-u38": "Learn the whole unit, not only the main verb. Run into, run out of, run through, run by. Set up, set off, set out, set aside. Take to, take up, take off, take on.",
    },
    39: {
        "turn-family": "Turn up means arrive. Turn down means reject. Turn out means result. Turn into means become.",
        "work-family": "Work out can mean exercise, solve, or develop. Work on means improve something. Work through means deal with and overcome a difficulty.",
        "multiple-meanings": "She works out at the gym. The team worked out the problem. They worked out a new training schedule.",
        "sport-vocabulary": "Tournament. Injury. Marathon. Serve. Athlete. Stadium. Training schedule. Cup. Workout. Fan. Stay fit.",
        "sport-collocations": "Work out at the gym. Work on your serve. Work through an injury. Turn up for a match. Turn down an offer. Stay fit.",
        "reading-u39": "Over five hundred fans turned up for the match, and it turned out to be a great success. One player had worked on her serve for months. Another worked through an injury and came back stronger. Years of training turned a young player into a professional athlete.",
        "dialogue-u39": "Did many fans turn up? More than five hundred did. How did the match turn out? It was a great success. What are you working on now? My serve, while I work through a minor injury.",
        "practice-u39": "Turn up, turn down, turn out, turn into. Work out, work on, work through. Use the complement and the situation to choose the exact meaning.",
    },
    40: {
        "review-u36": "She used to live in a village and would visit her grandmother every Sunday. There used to be a harvest market.",
        "review-u37": "We did close the deal. Did they sign? Yes, they did. Have they approved the budget? Yes, they have.",
        "review-u38": "I ran into a friend. We set up a club, set aside time, and took up photography. Our new club took off.",
        "review-u39": "Fans turned up. The match turned out well. She worked on her serve and worked through an injury.",
        "mixed-vocabulary": "Heritage. Ceremony. Contract. Budget. Itinerary. Hobby. Tournament. Injury. Preserve heritage. Meet a deadline. Stay fit.",
        "reading-u40": "Lisa used to celebrate the harvest and would dance at festivals. Her company did close a deal last week. She ran into an old colleague and set up a meeting. Over two hundred people turned up, and the event turned out to be a success.",
        "dialogue-u40": "Did you use to attend the festival? Yes, I did. Do you still dance? I do. What hobby have you taken up? Yoga. How did the event turn out? It was a success.",
        "practice-u40": "First identify the family: past habit, auxiliary, or phrasal verb. Then check the time frame, auxiliary agreement, particle, complement, and topic vocabulary.",
    },
}


def tts() -> None:
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
    if len(kw["faqs"]) != 5:
        raise ValueError(f"{kw['slug']}: exactly five FAQs are required")
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
readTime: {kw.get("readTime", "30 min")}
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

> **Practica en el curso:** [Unidad {kw["unit"]}](/curso-b2/unit-{kw["unit"]})<br>
> **Cuaderno de ejercicios:** [Unidad {kw["unit"]} con soluciones](/blog/curso-b2/{kw["slug"]}-ejercicios-soluciones)<br>
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


def exercise_block(items: list[tuple[str, str]]) -> str:
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


def study_lab(
    unit: int,
    theme: str,
    targets: str,
    contrasts: str,
    chunks: str,
    production: str,
) -> str:
    """Long-form retrieval and production guidance tailored to each unit."""
    return f"""## 9. Del reconocimiento al uso activo

Reconocer la opción correcta entre tres respuestas no garantiza que puedas recuperarla al hablar. El objetivo B2 es producir **{targets}** sin depender de la primera letra ni de una traducción palabra por palabra. Trabaja en tres vueltas. Primero lee cada ejemplo y nombra la pista decisiva: marco temporal, tipo de verbo, auxiliar de la pregunta, partícula o complemento. Después tapa la respuesta y reconstruye la oración completa. Por último cambia sujeto, tiempo y un detalle del contexto de **{theme}**. Si el patrón sigue siendo correcto después de la transformación, has aprendido una herramienta y no una frase congelada.

La comparación directa es esencial. Coloca juntas las decisiones que compiten: **{contrasts}**. Escribe una frase correcta con cada alternativa y una incorrecta que después puedas reparar. La explicación debe indicar significado y estructura: «*would* no funciona porque *believe* es estado», «la pregunta lleva *has*, por eso la respuesta corta conserva *has*» o «*run out of* necesita aquello que se agota». Decir solo «suena mejor» no ofrece una regla recuperable.

Aprende bloques completos. En esta unidad conviene guardar **{chunks}** con una escena, un sujeto y un complemento. Una tarjeta útil presenta una intención en español —por ejemplo, «rechazar una oferta»— y exige una oración inglesa completa. Otra tarjeta puede mostrar el inglés y pedir que expliques la diferencia con su rival más cercano. La traducción inicial ayuda, pero la precisión llega cuando asocias forma, significado y contexto.

El audio añade una comprobación que la página escrita no ofrece. Escucha primero sin leer y apunta únicamente los grupos que reconoces. En la segunda reproducción sigue el texto, marca la sílaba o el auxiliar que recibe énfasis y observa qué palabras se unen. En la tercera repite con una breve demora, sin detener el clip después de cada término. Este *shadowing* convierte auxiliares y phrasal verbs en unidades rítmicas y evita pausas artificiales dentro del chunk.

Cuando aparezca un error, clasifícalo. Puede ser de **selección** —elegiste otro significado—, de **forma** —faltó auxiliar o partícula—, de **orden** —el pronombre quedó en una posición imposible—, de **concordancia** o de **registro**. Escribe la corrección mínima y una frase nueva. Copiar diez veces una solución crea familiaridad visual; justificarla y transferirla a otra situación crea control.

## 10. Rutina guiada de veinticinco minutos

Dedica cinco minutos a los clips breves. Sin mirar, anota las expresiones completas; después coteja ortografía, forma verbal y complemento. Usa otros cinco minutos para recuperación escrita: dibuja tres columnas tituladas **intención**, **forma** y **ejemplo de {theme}**. Completa primero la intención y obliga a la memoria a producir el inglés. Marca lo que necesitó ayuda, porque ese material debe abrir la sesión siguiente.

Durante cinco minutos transforma frases. Cambia presente por pasado, afirmativa por negativa o pregunta, un nombre por un pronombre y una actividad por otra. Comprueba que la transformación conserva el patrón. Después combina dos objetivos con *although, because, whereas, so* o *as a result*. Los conectores obligan a pensar en un mensaje coherente y evitan que la gramática nueva quede aislada en ejemplos de cuatro palabras.

Reserva cinco minutos para discriminación. Mezcla diez ejemplos correctos e incorrectos y decide no solo si funcionan, sino por qué. En los pares mínimos, cambia una sola pieza: *used to/would*, *did/has*, *set up/set off* o *work out/work on*. Si cambias cinco palabras a la vez, no sabrás qué produjo la diferencia. Lee en voz alta la versión correcta para fijar también su ritmo.

Termina con cinco minutos de producción: **{production}**. Grábate o escribe sin consultar las tablas. Revisa cuatro criterios: forma completa, elección justificable, vocabulario preciso y mensaje coherente. Si te corriges mientras hablas, usa *I mean...* y repite todo el bloque; esa reparación también es competencia comunicativa.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-{unit}/practice-u{unit}.mp3" title="🔊 Práctica guiada Unidad {unit}"></audio>

## 11. Autoevaluación y repaso espaciado

Haz tres pruebas sin mirar. Primera: define cada forma con palabras sencillas y aporta un ejemplo del curso. Segunda: crea un ejemplo fuera del tema original para demostrar transferencia. Tercera: vuelve al reading y explica por qué una alternativa cambia el significado o resulta agramatical. Si fallas más de un tercio, no repitas toda la guía: aísla la familia débil, practica tres contrastes y vuelve a probarla al día siguiente.

Una respuesta sólida debe ser **completa, natural y razonada**. Completa significa que conserva auxiliar, verbo, partícula y complemento. Natural significa que la combinación encaja en la escena. Razonada significa que puedes señalar una pista concreta. Estos criterios son más útiles que contar cuántas páginas has leído.

Usa esta lista antes de avanzar:

- [ ] Produzco las formas objetivo sin ver opciones.
- [ ] Explico al menos tres contrastes con una regla concreta.
- [ ] Mantengo auxiliar, partícula, complemento y concordancia al transformar.
- [ ] Entiendo el reading y el diálogo sin traducir palabra por palabra.
- [ ] Uso vocabulario real de **{theme}** en ejemplos propios.
- [ ] Corrijo cada error con una frase nueva.

Vuelve al material mañana, tres días después y una semana más tarde. Reduce el apoyo en cada sesión: primero tablas completas, luego palabras clave y finalmente solo una situación comunicativa. Si una forma falla dos veces, colócala al principio del siguiente repaso y contrástala con su rival más cercana."""


def body_word_count(markdown: str) -> int:
    body = markdown.split("---", 2)[2]
    return len(re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:['’][A-Za-z]+)?", body))


def write_checked(name: str, markdown: str) -> None:
    count = body_word_count(markdown)
    if count < 2000:
        raise ValueError(f"{name}: only {count} body words; minimum is 2000")
    write_md(name, markdown)
    print("words", name, count)


# BUILDERS


def build_u36() -> tuple[str, str]:
    slug = "unidad-36-used-to-would-culture"
    sections = r"""## 1. Dos formas para mirar hábitos pasados

**Used to + verbo base** presenta una situación habitual o un estado que pertenecía al pasado y ya no se considera vigente: *We used to celebrate the harvest every autumn; she used to live in a mountain village*. **Would + verbo base** también recupera acciones repetidas: *Every autumn, the villagers would hold a festival*. En las acciones dinámicas, las dos formas pueden coincidir.

![Mapa de used to y would para hábitos pasados](/blog/curso-b2/unit-36/used-to-would-map.png)

La diferencia no se decide traduciendo «solía». Primero pregunta si el verbo describe una acción repetida o un estado. Después comprueba si el contexto ya sitúa al oyente en el pasado. *When I was young, I used to visit my grandmother every Sunday* y *When I was young, I would visit my grandmother every Sunday* funcionan. En cambio, *They used to live in a small town* es correcto y *they would live in a small town* no expresa el estado habitual objetivo de esta unidad.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-36/used-to.mp3" title="🔊 Used to en acciones y estados"></audio>

## 2. Used to: forma, negación y pregunta

La afirmativa mantiene una forma única para todas las personas: **subject + used to + base verb**. No añadas *-s* en tercera persona: *she used to dance*, no *she used to dances*. El verbo posterior queda en base aunque sea irregular: *people used to go by horse and cart*.

En la norma escrita que conviene producir:

| Función | Patrón | Ejemplo |
| :--- | :--- | :--- |
| afirmativa | subject + **used to** + base | She **used to wear** folk costumes. |
| negativa | subject + **didn't use to** + base | She **didn't use to attend** the theatre. |
| pregunta | **Did** + subject + **use to** + base? | **Did** there **use to be** a market? |
| respuesta | Yes, subject **did** / No, subject **didn't** | Yes, there **did**. |

El auxiliar *did* ya marca pasado, por eso escribimos **use to** en negativas y preguntas. Al hablar, *used to* y *use to* pueden sonar muy parecidos; la estructura sintáctica ayuda a escribirlos. No confundas este patrón con **be used to + noun/-ing**, que significa «estar acostumbrado»: *I am used to folk music*. Tampoco es **get used to**, «acostumbrarse». U36 estudia el hábito pasado seguido de infinitivo sin *to* adicional: *used to celebrate*.

## 3. Would: una cámara narrativa para acciones repetidas

<audio controls preload="none" src="/audio/blog/curso-b2/unit-36/would-habits.mp3" title="🔊 Would para hábitos narrativos"></audio>

**Would** resulta especialmente natural cuando una frase anterior ya abre el marco temporal. Compara:

> When Maria was a child in rural Spain, autumn was her favourite season. The village **would hold** a ceremony in the square, people **would wear** folk costumes, and her grandfather **would tell** stories about the old days.

El primer enunciado coloca la escena en la infancia. Las frases con *would* hacen avanzar una secuencia de acciones repetidas. Sin marco, *Maria would dance at festivals* puede interpretarse como condicional o voluntad, no necesariamente como hábito. Por eso conviene añadir *when she was young, every autumn, on Sundays* o una introducción narrativa.

Para acciones como **visit, dance, play, celebrate, gather, sing, travel, hold, attend, wear** y **tell**, tanto *used to* como *would* son posibles si hay repetición. *Would* no comunica por sí solo un contraste explícito con el presente; el texto completo lo establece.

## 4. Estados y existencia: territorio de used to

<audio controls preload="none" src="/audio/blog/curso-b2/unit-36/past-states.mp3" title="🔊 Used to con estados pasados"></audio>

En el foco de la lección, usa **used to**, no *would*, con estados:

- **live**: *They used to live in a small town.*
- **be**: *I used to be afraid of folk tales.*
- **have** como posesión: *They used to have a house in the countryside.*
- **miss**: *I used to miss home cooking.*
- **believe**: *She used to believe in superstitions.*
- **love**: *I used to love the local customs.*
- **speak** como capacidad estable: *He used to speak three languages.*

El patrón de existencia es **there used to be**: *There used to be a market in the square every Saturday*. No produzcas *there would be* para completar este ejercicio de estado pasado. En otros géneros, *would* puede describir una situación recurrente más compleja, pero esa posibilidad no sustituye la distinción operativa de U36: **used to acepta estados y acciones; would habitual selecciona acciones repetidas**.

## 5. Culture extended: tradición, patrimonio y prácticas

![Vocabulario Culture extended de la Unidad 36](/blog/curso-b2/unit-36/culture-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-36/culture-vocabulary.mp3" title="🔊 Vocabulario de cultura"></audio>

El inventario vivo diferencia conceptos cercanos:

| Palabra | Uso preciso | Ejemplo |
| :--- | :--- | :--- |
| **tradition** | creencia o práctica transmitida | The festival is a local tradition. |
| **heritage** | legado histórico y cultural colectivo | We preserve our cultural heritage. |
| **custom** | forma tradicional de actuar | Greeting every guest is a custom. |
| **ceremony** | acto formal con significado | They held a ceremony in the square. |
| **folklore** | relatos y saber popular transmitidos | Local folklore includes mountain tales. |
| **legend** | relato tradicional sobre héroes o hechos | My grandfather would tell a legend. |
| **ritual** | acciones en un orden establecido | Lighting the fire was a yearly ritual. |
| **superstition** | creencia sin base racional | She used to believe in a superstition. |

**Cultural diversity** destaca la variedad de culturas en una sociedad. **Assimilate** significa adoptar rasgos o costumbres de otra cultura; no equivale automáticamente a *integrate*, que puede permitir mantener una identidad propia. **Folk music** nombra la música tradicional de una comunidad. El sustantivo *folk* también aparece en *folk tales* y *folk costumes* dentro de los textos de la unidad.

## 6. Colocaciones reales para hablar de continuidad cultural

<audio controls preload="none" src="/audio/blog/curso-b2/unit-36/culture-collocations.mp3" title="🔊 Colocaciones de Culture extended"></audio>

Aprende palabra y verbo juntos:

- **preserve a tradition / preserve heritage**: proteger para el futuro;
- **hold a ceremony**: celebrar u organizar un acto formal;
- **celebrate a festival**: participar en la festividad;
- **hand down** stories, beliefs or customs: transmitir a la siguiente generación;
- **put down roots**: establecer vínculos duraderos en un lugar.

*Keep a tradition* puede aparecer en inglés general, pero la opción evaluada en el curso es **preserve a tradition**. Del mismo modo, la lección selecciona **hold a ceremony** y **celebrate a festival**. Las colocaciones no son traducciones intercambiables. Construye una escena: *My grandparents handed down the custom; our community now holds a ceremony to preserve that heritage*.

**Hand down** es separable: *hand the story down / hand it down*. **Put down roots** es una expresión fija; no insertes el objeto entre *put* y *down*. Estas observaciones permiten usar el vocabulario en escritura, no solo reconocer una definición.

## 7. Reading alineado: From village memories to preservation

![Used to, would y cultura en contexto](/blog/curso-b2/unit-36/culture-context.png)

> When she was young, Elena **used to live** in a small mountain village. Every Sunday, she **would visit** her grandmother, and they **would gather** around the fire to listen to **folk tales**. The village **used to hold** a **harvest festival** every autumn, and Elena **would wear** a traditional costume. She **used to believe** in superstitions. **There used to be** a market in the square where people **would arrive** by horse and cart. Now Elena **preserves her cultural heritage** by teaching **folk music** to young people.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-36/reading-u36.mp3" title="🔊 Reading Unidad 36"></audio>

El texto combina los casos exactos del curso. *Used to live, used to believe* y *there used to be* son estados. *Would visit, gather, wear* y *arrive* son acciones repetidas dentro de un marco ya establecido. *Used to hold* también es posible porque una acción habitual acepta ambas formas. El presente *preserves* y *teaching* cierran el contraste entre memoria y actividad actual.

Haz una segunda lectura con dos colores: uno para estados y otro para acciones. Después sustituye Elena por *Elena and her brother* y comprueba que *used to* y *would* no cambian. Finalmente transforma dos afirmativas en preguntas: *Did she use to live...? Did there use to be...?*

## 8. Diálogo, pronunciación y errores frecuentes

<audio controls preload="none" src="/audio/blog/curso-b2/unit-36/dialogue-u36.mp3" title="🔊 Diálogo Unidad 36"></audio>

> **A:** Did there **use to be** a market in the square?<br>
> **B:** Yes, there did. People **would buy** local produce there.<br>
> **A:** Did your family **use to celebrate** the harvest?<br>
> **B:** Yes. Every autumn, we **would gather**, sing and dance.<br>
> **A:** Did you **use to believe** the old superstitions?<br>
> **B:** I did, but now I study the stories as folklore.

En pronunciación natural, *used to* suele reducirse y enlazarse con el verbo. No elimines mentalmente la estructura: aunque oigas una secuencia rápida, el verbo sigue en base. Practica *used to live, used to have, used to believe* como bloques.

| Error | Corrección razonada |
| :--- | :--- |
| *She would live in the village.* | She **used to live** there: estado objetivo. |
| *There would be a market.* | There **used to be** a market: existencia pasada. |
| *Did she used to dance?* | Did she **use to dance**? *Did* marca pasado. |
| *She didn't used to attend.* | She didn't **use to attend**. |
| *He used to told stories.* | He used to **tell** stories: verbo base. |
| *Every autumn would celebrate.* | **They** would celebrate: falta sujeto. |
| *I use to live there.* | I **used to live** there: afirmativa pasada. |
| *preserve a ceremony* | **hold a ceremony / preserve a tradition**. |

"""
    sections += study_lab(
        36,
        "Culture extended",
        "used to, would, there used to be y las colocaciones culturales reales",
        "acción repetida/estado; used to/would; afirmativa/pregunta; tradition/heritage/custom",
        "used to live, would visit, there used to be, preserve heritage, hold a ceremony y hand down a custom",
        "cuenta durante dos minutos cómo eran las tradiciones de una comunidad y cómo se preservan hoy; incluye cuatro estados con used to, cuatro acciones con would y ocho expresiones culturales",
    )
    sections += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
        [
            (
                "Elige: *They (used to / would) live in a small town before moving to the city.*",
                "**Used to live**. *Live* presenta un estado pasado en el contraste de la unidad.",
            ),
            (
                "Completa con las dos opciones posibles: *When I was young, I ___ visit my grandmother every Sunday.*",
                "**Used to** y **would** son posibles porque *visit* es una acción repetida y el marco pasado está claro.",
            ),
            (
                "Corrige: *Did there used to be a ceremony in the square?*",
                "**Did there use to be a ceremony in the square?** El auxiliar *did* ya lleva el pasado.",
            ),
            (
                "Elige y justifica: *She ___ believe in superstitions as a child.*",
                "**Used to believe**. *Believe* es estado; el *would* habitual de esta unidad no sirve.",
            ),
            (
                "Completa las colocaciones: *___ heritage; ___ a ceremony; ___ a festival; ___ stories to the next generation.*",
                "**Preserve heritage; hold a ceremony; celebrate a festival; hand down stories.**",
            ),
            (
                "Reescribe con *would*: *Every autumn, the villagers used to wear folk costumes and sing.*",
                "**Every autumn, the villagers would wear folk costumes and sing.** Son acciones repetidas con marco temporal.",
            ),
            (
                "Distingue *tradition, heritage* y *custom* en una frase para cada palabra.",
                "Ejemplo: **The dance is a tradition. The castle is part of our heritage. Removing shoes is a local custom.**",
            ),
            (
                "Pasa a negativa estándar: *I used to attend the theatre regularly.*",
                "**I didn't use to attend the theatre regularly.** Después de *didn't*, usa *use*.",
            ),
            (
                "Analiza: *There used to be a market, and people would travel there by horse and cart.*",
                "**There used to be** expresa existencia; **would travel** describe una acción repetida dentro de ese mundo pasado.",
            ),
            (
                "Producción: escribe 140–170 palabras sobre una tradición que ha cambiado.",
                "Respuesta abierta. Incluye dos estados con **used to**, tres acciones con **would**, **there used to be** y seis términos de Culture extended. Cierra con cómo se preserva hoy.",
            ),
        ]
    )
    return slug, sections


def build_u37() -> tuple[str, str]:
    slug = "unidad-37-auxiliaries-business"
    sections = r"""## 1. Qué hace un auxiliar en una conversación B2

Un **auxiliary verb** organiza tiempo, aspecto, voz, modalidad, negación y pregunta. En U37 también cumple dos funciones discursivas: **corregir o reforzar una afirmación** y **evitar repetir todo el predicado en una respuesta corta**. Compara *I want to attend* con *I **do** want to attend*: el segundo mensaje rebate una duda o confirma con fuerza.

![Mapa de auxiliares para énfasis y respuestas cortas](/blog/curso-b2/unit-37/auxiliaries-map.png)

La elección no es libre. Debes identificar qué auxiliar pertenece a la estructura: **do/does/did** con presente o pasado simple de verbos léxicos; **be** en tiempos continuos o cuando es verbo principal; **have** en perfectos; el modal correspondiente con *will, can, should*; y el primer auxiliar relevante en una pasiva. La misma identificación controla la respuesta corta.

## 2. Do, does y did para énfasis afirmativo

<audio controls preload="none" src="/audio/blog/curso-b2/unit-37/emphatic-do.mp3" title="🔊 Do does did para énfasis"></audio>

En una afirmativa simple normal no aparece auxiliar: *I want to attend; he agrees; the team completed the project*. Para enfatizar, inserta **do/does/did** y devuelve el verbo léxico a la base:

| Tiempo y sujeto | Forma neutra | Forma enfática |
| :--- | :--- | :--- |
| presente I/you/we/they | I want to attend. | I **do want** to attend. |
| presente he/she/it | He agrees with the terms. | He **does agree** with the terms. |
| pasado, cualquier sujeto | She submitted the proposal. | She **did submit** the proposal. |
| pasado, cualquier sujeto | The team exceeded the target. | The team **did exceed** the target. |

El énfasis suele responder a una objeción: *You don't understand our concerns. — I **do understand** them.* También puede confirmar un dato inesperado: *Despite the delays, we **did complete** the project on time.* En habla, el auxiliar recibe acento. En escritura, el contexto, la cursiva o la negrita pueden representar ese contraste; no conviertas todas las afirmativas en enfáticas.

La doble marca es un error: no *he does agrees* ni *she did submitted*. **Does/did + base form**. El presente enfático cambia según la persona, pero *did* no: *I did finish; she did finish; they did finish*.

## 3. Cuando el auxiliar ya existe: be, have y modales

<audio controls preload="none" src="/audio/blog/curso-b2/unit-37/auxiliary-families.mp3" title="🔊 Familias de auxiliares"></audio>

No insertes *do* si la estructura ya contiene un auxiliar que puede recibir énfasis:

- presente continuo: *The CEO **is** coming to the presentation.*
- present perfect: *They **have** finished the audit.*
- pasiva perfecta: *The deal **has** been closed.*
- futuro: *We **will** proceed with the merger.*
- capacidad: *I **can** meet the deadline.*
- recomendación: *We **should** proceed.*
- pasado de *be*: *They **were** at the presentation.*

En cada ejemplo, el auxiliar en negrita es la pieza que se acentúa. *They do have finished* mezcla *do* con present perfect y es incorrecto. Existe *do have* cuando **have** es un verbo léxico de posesión o experiencia —*we do have enough revenue*—, pero no cuando *have* construye *have finished*. Primero identifica la función.

La pasiva puede contener una cadena: *The audit **has been completed***. Para confirmar el perfecto, la respuesta corta recupera el primer auxiliar: *Has the audit been completed? — Yes, it **has***. No repite *been completed*.

## 4. Short answers: conserva el auxiliar de la pregunta

<audio controls preload="none" src="/audio/blog/curso-b2/unit-37/short-answers.mp3" title="🔊 Respuestas cortas con auxiliares"></audio>

Las respuestas cortas tienen **yes/no + sujeto pronombre + auxiliar**. No repitas el verbo léxico y no cambies de familia:

| Pregunta | Respuesta afirmativa | Respuesta negativa |
| :--- | :--- | :--- |
| Did they sign the contract? | Yes, they **did**. | No, they **didn't**. |
| Have you submitted the proposal? | Yes, I **have**. | No, I **haven't**. |
| Are you attending the conference? | Yes, I **am**. | No, I'm **not**. |
| Will they approve the budget? | Yes, they **will**. | No, they **won't**. |
| Can you meet the deadline? | Yes, I **can**. | No, I **can't**. |
| Should we proceed? | Yes, we **should**. | No, we **shouldn't**. |

*Yes, they signed* puede ser una oración completa, pero no es la respuesta corta que se evalúa. *Have you submitted...? — No, I didn't* cambia de present perfect a past simple sin motivo. La regla operativa es sencilla: localiza el primer auxiliar de la pregunta y haz que concuerde con el nuevo sujeto.

## 5. Business extended: documentos, dinero y organización

![Vocabulario Business extended de la Unidad 37](/blog/curso-b2/unit-37/business-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-37/business-vocabulary.mp3" title="🔊 Vocabulario de negocios"></audio>

El inventario real permite narrar un proceso empresarial completo:

| Término | Significado funcional | Ejemplo |
| :--- | :--- | :--- |
| **contract** | acuerdo formal vinculante | Both parties signed the contract. |
| **deal** | trato o acuerdo negociado | The sales team closed the deal. |
| **budget** | plan de ingresos y gastos | The board approved the budget. |
| **merger** | fusión de dos empresas | They will proceed with the merger. |
| **proposal** | oferta o plan formal | She submitted the proposal. |
| **audit** | revisión formal de cuentas | The audit has been completed. |
| **CEO** | persona que dirige la empresa | The CEO is coming to the meeting. |
| **target** | objetivo medible | The team exceeded its target. |
| **strategy** | plan para lograr objetivos | The new strategy is effective. |
| **profit** | dinero tras descontar costes | Profit rose despite higher costs. |
| **revenue** | ingresos antes de costes | Revenue and profit are not identical. |

**Merge** es el verbo «fusionarse/fusionar»; **merger** es el sustantivo. **Acquire** significa adquirir otra empresa y no es idéntico a una fusión. **Approve** acepta objeto directo: *approve the budget*. **Proceed** suele aparecer con **with**: *proceed with the plan/merger*.

## 6. Colocaciones que estructuran una actualización de negocio

<audio controls preload="none" src="/audio/blog/curso-b2/unit-37/business-collocations.mp3" title="🔊 Colocaciones de Business extended"></audio>

La lección selecciona estas combinaciones:

- **close a deal**;
- **submit a proposal**;
- **meet a deadline**;
- **sign a contract**;
- **deliver a presentation**;
- **agree on terms**;
- **exceed a target**.

*Reach a target* significa alcanzarlo; **exceed a target** significa superarlo. *Give a presentation* es común, pero la colocación evaluada es **deliver a presentation**. *Make a proposal* puede significar formularla; **submit a proposal** destaca su envío formal. Elige la acción exacta del proceso.

Combina colocación y énfasis con intención: *We **did close the deal** before Friday; she **did submit the proposal**; the team **has exceeded its target***. La última frase ya contiene *has*, así que no necesita *did*. El tiempo y el auxiliar cuentan parte de la historia empresarial.

## 7. Reading alineado: A quarter of confirmed progress

![Auxiliares y Business extended en contexto](/blog/curso-b2/unit-37/business-context.png)

> The team **did complete** the project on time despite the delays. I **do want** to attend the meeting, and they **have finished** the audit. Sofia **did submit** the proposal before the deadline, and the deal **has been closed**. The finance director **does agree** with the terms, so we **will proceed** with the merger. The budget **has been approved**, and the CEO **is coming** to the presentation. The sales team **did exceed** its target last quarter.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-37/reading-u37.mp3" title="🔊 Reading Unidad 37"></audio>

Los tres *do-support auxiliaries* refuerzan presente o pasado simple: **do want, did complete, does agree, did submit, did exceed**. *Have finished, has been closed, will proceed, has been approved* e *is coming* ya incluyen su propio auxiliar. Léelos en voz alta dando contraste al auxiliar, no al verbo principal.

Convierte cada dato en pregunta y respuesta breve: *Did the team complete the project? — Yes, it did. Have they finished the audit? — Yes, they have. Has the deal been closed? — Yes, it has. Is the CEO coming? — Yes, she is.* Observa que el pronombre puede cambiar, pero la familia auxiliar permanece.

## 8. Diálogo y corrección de interferencias

<audio controls preload="none" src="/audio/blog/curso-b2/unit-37/dialogue-u37.mp3" title="🔊 Diálogo Unidad 37"></audio>

> **A:** Did the team close the deal?<br>
> **B:** Yes, they **did**, and they **did sign** the contract.<br>
> **A:** Have they completed the audit?<br>
> **B:** Yes, they **have**.<br>
> **A:** Is the CEO coming to the presentation?<br>
> **B:** Yes, she **is**. I **do think** the new strategy is effective.<br>
> **A:** Will the board approve the budget?<br>
> **B:** Yes, it **will**.

| Error | Corrección |
| :--- | :--- |
| *I do want to attends.* | I do want to **attend**. |
| *He does agrees.* | He does **agree**. |
| *She did submitted the proposal.* | She did **submit** it. |
| *Have you submitted it? — No, I didn't.* | No, I **haven't**. |
| *Is she coming? — Yes, she does.* | Yes, she **is**. |
| *Has it been closed? — Yes, it is.* | Yes, it **has**. |
| *They do have finished the audit.* | They **have finished** the audit. |
| *make a deadline* | **meet a deadline**. |
| *do a presentation* | **deliver a presentation**. |

El error común consiste en responder por el significado general y no por la estructura. En español, «sí» parece suficiente; en inglés, la respuesta corta codifica tiempo y modalidad. Antes de responder, repite mentalmente el auxiliar: *Did...? did. Have...? have. Will...? will.*

"""
    sections += study_lab(
        37,
        "Business extended",
        "auxiliares enfáticos, respuestas cortas y colocaciones empresariales",
        "do/does/did; verbo base/verbo flexionado; auxiliar ya presente/do-support; did/have/is/will/can/should",
        "do want, did submit, has finished, close a deal, submit a proposal, meet a deadline y agree on terms",
        "presenta una actualización empresarial de dos minutos con cuatro afirmaciones enfáticas y responde seis preguntas breves usando al menos diez términos de Business extended",
    )
    sections += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
        [
            (
                "Completa para enfatizar: *I ___ want to attend the meeting.*",
                "**Do**: *I do want to attend the meeting.* Es presente simple con verbo léxico.",
            ),
            (
                "Corrige: *He does agrees with the terms.*",
                "**He does agree with the terms.** Después de *does*, el verbo vuelve a base.",
            ),
            (
                "Responde brevemente: *Did they sign the contract?*",
                "**Yes, they did. / No, they didn't.** Conserva *did*.",
            ),
            (
                "Responde en negativo: *Have you submitted the proposal?*",
                "**No, I haven't.** La pregunta está en present perfect.",
            ),
            (
                "Elige: *The CEO (does/is) coming to the presentation.*",
                "**Is coming**. El presente continuo ya contiene *be*; con énfasis oral, acentúa *is*.",
            ),
            (
                "Completa las colocaciones: *___ a deal; ___ a proposal; ___ a deadline; ___ a target.*",
                "**Close a deal; submit a proposal; meet a deadline; exceed a target.**",
            ),
            (
                "Convierte en enfática: *The team completed the audit despite the delay.*",
                "**The team did complete the audit despite the delay.** *Did* recibe el énfasis.",
            ),
            (
                "Corrige la respuesta: *Has the deal been closed? — Yes, it is.*",
                "**Yes, it has.** La pregunta empieza con el auxiliar perfecto *has*.",
            ),
            (
                "Distingue *profit* y *revenue*.",
                "**Revenue** son ingresos; **profit** es lo que queda después de restar costes.",
            ),
            (
                "Producción: escribe 150–180 palabras como actualización al consejo de administración.",
                "Respuesta abierta. Incluye **do/does/did** enfático, cuatro auxiliares distintos, cuatro pares de pregunta y respuesta corta y ocho colocaciones de Business extended.",
            ),
        ]
    )
    return slug, sections


def build_u38() -> tuple[str, str]:
    slug = "unidad-38-phrasal-verbs-5-run-set-take-leisure"
    sections = r"""## 1. Aprende la unidad completa: verbo, partícula y escena

La Unidad 38 contiene doce objetivos reales: **run into, run out of, run through, run by; set up, set off, set out, set aside; take to, take up, take off y take on**. No forman una lista de traducciones de *run, set* y *take*. La partícula y el complemento construyen un significado nuevo: *run into a friend* no implica correr y *take up photography* no significa levantar una cámara.

![Mapa de phrasal verbs RUN SET TAKE B2](/blog/curso-b2/unit-38/run-set-take-map.png)

Estudia cada forma dentro de una escena de **Leisure extended**. ¿Encuentras a alguien por casualidad, agotas un recurso, revisas un plan, organizas un club, inicias un viaje, reservas tiempo, empiezas una afición o aceptas un reto? Esa intención conduce al phrasal verb. Después comprueba tiempo, objeto y posición del pronombre.

## 2. RUN: encuentros, recursos, revisión y feedback

<audio controls preload="none" src="/audio/blog/curso-b2/unit-38/run-family.mp3" title="🔊 Familia RUN"></audio>

| Phrasal verb | Significado objetivo | Patrón y ejemplo |
| :--- | :--- | :--- |
| **run into** | encontrarse por casualidad | We **ran into an old friend** at the cinema. |
| **run out of** | quedarse sin, agotar existencias | We **ran out of battery** during the hike. |
| **run through** | repasar rápidamente | They **ran through the itinerary** before booking. |
| **run something by someone** | comentar para pedir opinión | Let me **run the plan by you** before we book. |

Los complementos no son opcionales en los usos centrales. **Run into** necesita la persona encontrada; **run out of** necesita el recurso agotado; **run through** necesita el material revisado. Con pronombre: *I ran into **him**; we ran out of **it**; they ran through **it***.

La construcción correcta del cuarto objetivo es **run + idea + by + person**: *run the plan by you / run it by her*. Aunque una actividad abreviada pueda etiquetarlo como *run by*, no produzcas *run by the plan with you*. El objeto representa la idea que se consulta y la persona aparece después de *by*.

No confundas **run out** sin objeto —*the battery ran out*— con **run out of + noun** —*we ran out of battery power*. La lección practica principalmente la segunda construcción.

## 3. SET: crear, partir y reservar

<audio controls preload="none" src="/audio/blog/curso-b2/unit-38/set-family.mp3" title="🔊 Familia SET"></audio>

**Set up** significa crear u organizar, y también montar físicamente: *set up a photography club; set up a picnic; set up the tent*. Es separable con pronombre: *set it up*, no *set up it*. Con un nombre, ambas posiciones pueden ser posibles en muchos contextos, pero *set up a club* es la opción más neutra.

**Set off** y **set out** se solapan cuando significan iniciar un viaje:

- *They **set off** early for the beach.*
- *We **set out** at dawn to explore the mountains.*
- *They **set off on** a camping trip.*

Ambos son intransitivos en estos ejemplos; el destino llega con *for* y el propósito con *to + verb*. **Set out** también puede significar proponerse hacer algo (*set out to explore*), mientras **set off** puede activar algo en otros contextos, pero U38 evalúa el inicio de un desplazamiento.

**Set aside** significa reservar tiempo o recursos: *She sets aside two hours every weekend; we set an hour aside for the picnic; set it aside*. No es *make time* en la opción objetivo, aunque esa expresión exista. Aprende el bloque **set aside time for yourself**.

## 4. TAKE: comenzar, aficionarse, despegar y asumir

<audio controls preload="none" src="/audio/blog/curso-b2/unit-38/take-family.mp3" title="🔊 Familia TAKE"></audio>

Las cuatro formas cuentan etapas diferentes:

| Forma | Pregunta de control | Ejemplo |
| :--- | :--- | :--- |
| **take up** | ¿empiezas una actividad o hobby? | He **took up photography** last month. |
| **take to** | ¿empiezas a disfrutar o aceptar algo? | She **took to hiking** immediately. |
| **take off** | ¿un avión despega o algo gana éxito rápido? | The flight **took off**; her hobby **took off**. |
| **take on** | ¿aceptas una tarea, responsabilidad o reto? | He **took on the challenge** of learning to surf. |

**Take up** describe el inicio; **take to** describe una reacción positiva. Es posible combinar: *I took up yoga in May and took to it immediately*. **Take off** es intransitivo en los dos significados de la unidad. **Take on** admite objeto y pronombre: *take on a challenge / take it on*.

No uses *take to* solo porque la frase termina en una actividad. La pista decisiva es *and now she loves it*, que muestra afición. En cambio, *last month* y *as a hobby* suelen presentar el inicio con **take up**.

## 5. Posición del objeto y formas verbales

Un phrasal verb debe conjugarse como cualquier verbo. El pasado de *run* es **ran** y el de *take* es **took**: *ran into, ran out of, ran through; took up, took to, took off, took on*. *Set* no cambia: *set up yesterday*. En presente con tercera persona: *she sets aside time; the flight takes off; he runs through the route*.

Clasifica la estructura antes de mover pronombres:

| Estructura | Nombre | Pronombre |
| :--- | :--- | :--- |
| separable | set up **the club** / set **the club** up | set **it** up |
| separable | take up **a hobby** / take **a hobby** up | take **it** up |
| inseparable | run into **my neighbour** | run into **her** |
| tres partes | run out of **snacks** | run out of **them** |
| verbo + objeto + by | run **the idea** by Marta | run **it** by her |
| intransitivo | set off / set out / take off | no lleva objeto directo |

No hace falta memorizar una etiqueta por gusto académico: la etiqueta evita *set up it* y *run her into* cuando quieres decir «encontrarse con ella».

## 6. Leisure extended: ocio, rutas y recuperación

![Vocabulario Leisure extended de la Unidad 38](/blog/curso-b2/unit-38/leisure-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-38/leisure-vocabulary.mp3" title="🔊 Vocabulario de ocio"></audio>

**Hobby** y **pastime** son actividades de tiempo libre, pero *hobby* suele implicar una práctica mantenida; *pastime* puede ser algo que simplemente ayuda a pasar el tiempo. **Leisure time** es el tiempo no dedicado al trabajo. **Unwind** expresa relajarse y recuperar energía.

La unidad también usa:

- **picnic**: comida al aire libre;
- **itinerary**: ruta o plan organizado de un viaje;
- **camping**: estancia al aire libre en tienda;
- **hiking**: caminar por la naturaleza como actividad;
- **a hike**: una caminata o excursión concreta;
- **explore**: descubrir o recorrer lugares;
- **club**: grupo que se reúne por un interés compartido.

No mezcles *hiking* y *a hike*: *I enjoy hiking; we went on a hike*. **Itinerary** no es solo un horario; organiza desplazamientos y lugares. Este vocabulario ofrece los complementos naturales de los phrasal verbs.

## 7. Colocaciones y reading alineado

<audio controls preload="none" src="/audio/blog/curso-b2/unit-38/phrasal-collocations.mp3" title="🔊 Colocaciones de ocio y phrasal verbs"></audio>

Recupera como unidades **take up a hobby, set aside time, set off on a trip, take on a challenge, run into an old friend** y **set up a club**. Añade *run through an itinerary, run out of battery* y *take to painting*. Una colocación completa limita interpretaciones equivocadas.

![RUN SET TAKE y ocio en contexto](/blog/curso-b2/unit-38/leisure-context.png)

> Last month, Tom **took up photography** and **ran into an old friend** at a camera shop. They **set up a photography club** together and **set off early** the following Saturday for **a hike**. Unfortunately, they **ran out of battery** on the camera, but they still had a great time. Tom's sister recently **took to painting** and **sets aside two hours** every weekend for it. Before a future **camping trip**, Tom **ran through the itinerary** with her.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-38/reading-u38.mp3" title="🔊 Reading Unidad 38"></audio>

Subraya el complemento de cada phrasal verb: *photography, an old friend, a club, battery, painting, two hours, the itinerary*. *Set off* no lleva objeto directo; *for a hike* expresa destino o propósito. Después cambia todos los eventos pasados al presente habitual y revisa tercera persona: *Tom takes up..., runs into..., sets up...*

## 8. Diálogo y errores frecuentes

<audio controls preload="none" src="/audio/blog/curso-b2/unit-38/dialogue-u38.mp3" title="🔊 Diálogo Unidad 38"></audio>

> **A:** What hobby did you **take up**?<br>
> **B:** Photography. I **took to it** immediately.<br>
> **A:** Did you join a club?<br>
> **B:** I **set one up** after I **ran into** an old friend.<br>
> **A:** Where did you go last weekend?<br>
> **B:** We **set off** for the hills, but we **ran out of** battery.<br>
> **A:** Can I **run an idea by you** for the next trip?<br>
> **B:** Sure. Let's **run through** the itinerary.

| Error | Corrección |
| :--- | :--- |
| *I runned into a friend.* | I **ran into** a friend. |
| *We ran out snacks.* | We **ran out of** snacks. |
| *She set up it.* | She **set it up**. |
| *I ran by the plan with her.* | I **ran the plan by her**. |
| *He took photography up it.* | He **took up photography / took it up**. |
| *They set off the beach.* | They **set off for** the beach. |
| *She took up hiking and now she loved it immediately.* | She **took to hiking** and now loves it. |
| *The flight took up.* | The flight **took off**. |

"""
    sections += study_lab(
        38,
        "Leisure extended",
        "los doce phrasal verbs RUN, SET y TAKE con sus complementos",
        "run into/run out of/run through/run by; set up/set off/set out/set aside; take up/take to/take off/take on",
        "run into a friend, run out of battery, run an idea by someone, set up a club, set aside time, take up a hobby y take on a challenge",
        "narra un fin de semana de ocio durante tres minutos usando los doce phrasal verbs, al menos diez términos de Leisure extended y pronombres en tres estructuras separables",
    )
    sections += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
        [
            (
                "Completa: *We ___ an old friend at the cinema last weekend.*",
                "**Ran into**: encuentro casual. El pasado irregular de *run* es *ran*.",
            ),
            (
                "Elige: *She (took up / took to) hiking last year, and now she loves it.*",
                "**Took to** destaca que empezó a aficionarse. **Took up** destacaría solo el inicio del hobby.",
            ),
            (
                "Corrige: *We ran out snacks halfway through the concert.*",
                "**We ran out of snacks halfway through the concert.** La forma objetivo tiene tres partes.",
            ),
            (
                "Sustituye el objeto por pronombre: *They set up the photography club.*",
                "**They set it up.** El pronombre ocupa la posición intermedia.",
            ),
            (
                "Completa: *Let me ___ the plan ___ you before we book.*",
                "**Let me run the plan by you.** La idea va tras *run* y la persona tras *by*.",
            ),
            (
                "Distingue *set off* y *set up* en dos ejemplos.",
                "**We set off for the beach at dawn. We set up the tent before dark.** Inicio de viaje frente a montar.",
            ),
            (
                "Elige: *He (took on / took off) the challenge of learning to surf.*",
                "**Took on**: aceptó el reto. *Take off* es despegar o ganar éxito.",
            ),
            (
                "Completa con un mismo phrasal verb: *The plane ___ at noon. Her online art club ___ quickly.*",
                "**Took off** en ambos casos: despegó y ganó popularidad.",
            ),
            (
                "Explica *hiking* frente a *a hike*.",
                "**Hiking** es la actividad: *I enjoy hiking*. **A hike** es una excursión concreta: *We went on a hike*.",
            ),
            (
                "Producción: escribe 160–190 palabras sobre un club de ocio y una excursión.",
                "Respuesta abierta. Usa los doce phrasal verbs, cinco objetos claros, dos pronombres bien colocados y diez palabras de Leisure extended.",
            ),
        ]
    )
    return slug, sections


def build_u39() -> tuple[str, str]:
    slug = "unidad-39-phrasal-verbs-6-turn-work-sport"
    sections = r"""## 1. Siete formas, varios significados y un contexto deportivo

La Unidad 39 practica **turn up, turn down, turn out, turn into, work out, work on** y **work through**. Son siete formas, pero **work out** tiene tres usos vivos: hacer ejercicio, resolver un problema y elaborar una solución o plan. El complemento y la estructura permiten elegir: *work out at the gym; work out the problem; work out a training schedule*.

![Mapa de phrasal verbs TURN WORK B2](/blog/curso-b2/unit-39/turn-work-map.png)

El tema **Sport extended** convierte las definiciones en una historia: aficionados que llegan, ofertas que se rechazan, partidos que resultan exitosos, jugadores que se convierten en profesionales, rutinas de ejercicio, técnicas que mejoran y lesiones o dificultades que se superan. Aprende qué participantes exige cada escena.

## 2. TURN UP y TURN DOWN: llegar frente a rechazar

<audio controls preload="none" src="/audio/blog/curso-b2/unit-39/turn-family.mp3" title="🔊 Familia TURN"></audio>

**Turn up** significa llegar o acudir, especialmente a un lugar o evento: *Over 500 fans turned up for the match; she turned up late for training; nobody turned up because of the rain*. Es intransitivo en estos ejemplos. El evento llega con **for** y el lugar o momento mediante otro complemento: *turn up at the stadium / on time*.

**Turn down** significa rechazar una oferta o invitación: *He turned down the offer to join the team; she turned down an invitation to a charity match*. Es separable: *turn the offer down / turn it down*. No digas *turn down it*. La partícula *down* también puede reducir volumen en otros contextos, pero la unidad trabaja el rechazo.

El contraste mínimo ayuda: *Five hundred fans **turned up**; one invited player **turned the offer down***. En el primero, personas llegan sin objeto directo. En el segundo, una persona actúa sobre una propuesta.

## 3. TURN OUT y TURN INTO: resultado frente a transformación

**Turn out** presenta el resultado que finalmente se descubre. Dos marcos son especialmente útiles:

- **turn out + adjective/noun-like complement**: *Everything turned out well.*
- **turn out to be + noun/adjective**: *The match turned out to be a great success.*
- **it turns/turned out that + clause**: *It turned out that the match had been postponed.*

No confundas *turn out* con *turn up*. *The team turned out stronger than expected* presenta un resultado; *the team turned up early* presenta llegada. En el texto vivo, *the match turned out to be a success* y *the team turned out to be much stronger than expected* son los patrones centrales.

**Turn into** significa convertirse en: *The young player turned into a star; years of training turned him into a professional athlete*. El primer marco es **A turns into B**; el segundo, transitivo, es **X turns A into B**. Mantén *into*: *became a star* equivale a *turned into a star*, no a *turned a star*.

## 4. WORK OUT: ejercicio, solución y elaboración

<audio controls preload="none" src="/audio/blog/curso-b2/unit-39/work-family.mp3" title="🔊 Familia WORK"></audio>

El significado más deportivo es **hacer ejercicio/entrenar**: *She works out at the gym every morning to stay fit; I work out three times a week before the marathon*. Aquí es intransitivo. El sustantivo se escribe junto: **a workout** —*It was a demanding workout*—, pero el verbo conserva dos palabras: *we work out*.

Con objeto, **work out** puede significar resolver: *The team worked out the problem and found a solution*. También puede significar elaborar o calcular un plan: *We worked out a training schedule that suits everyone*. Es separable con pronombre: *work the problem out / work it out*.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-39/multiple-meanings.mp3" title="🔊 Los significados de work out"></audio>

| Escena | Estructura | Interpretación |
| :--- | :--- | :--- |
| gym | work out + lugar/frecuencia | hacer ejercicio |
| difficulty | work out + problem | resolver |
| planning | work out + schedule | elaborar |
| pronoun | work it out | resolverlo / aclararlo |

La traducción «entrenar» falla si el objeto es *problem* o *schedule*. Mira primero qué aparece después.

## 5. WORK ON y WORK THROUGH: mejora y proceso difícil

**Work on + object** significa dedicar esfuerzo a mejorar o desarrollar algo: *She worked on her serve for months; he works on his technique every day*. La preposición y el objeto permanecen juntos: *work on it*, no *work it on*. Puede describir progreso todavía abierto: trabajar en una técnica no asegura que ya esté dominada.

**Work through + object** significa abordar algo paso a paso hasta manejarlo o superarlo: *They worked through their differences and won the cup; the team worked through a difficult period*. La lección también usa *work through an injury*. En comunicación deportiva responsable, esa frase no debe interpretarse como ignorar dolor ni consejo médico; describe afrontar el proceso o la recuperación. Para expresar rehabilitación con claridad, puedes decir *work through the recovery process with medical support*.

Compara tres intenciones:

- *I **work out** three times a week*: realizo ejercicio.
- *I **work on** my serve*: intento mejorar una destreza concreta.
- *I **work through** a setback*: afronto una dificultad progresivamente.

Una rutina completa puede contener las tres sin que sean intercambiables.

## 6. Sport extended: competición, lugares y personas

![Vocabulario Sport extended de la Unidad 39](/blog/curso-b2/unit-39/sport-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-39/sport-vocabulary.mp3" title="🔊 Vocabulario deportivo"></audio>

| Término | Distinción útil |
| :--- | :--- |
| **tournament** | competición organizada con varias fases o participantes |
| **match** | encuentro concreto entre oponentes |
| **injury** | daño físico, no solo sensación de dolor |
| **marathon** | carrera de larga distancia de 42,195 km en su sentido estricto |
| **serve** | saque que inicia un punto, por ejemplo en tenis |
| **athlete** | persona que practica deporte, especialmente de forma competitiva |
| **stadium** | recinto grande para eventos deportivos |
| **gym** | lugar de entrenamiento |
| **training schedule** | plan de sesiones de entrenamiento |
| **cup** | copa o trofeo de una competición |
| **workout** | sesión concreta de ejercicio |
| **fan** | aficionado que apoya a un equipo o deportista |

La expresión objetivo **stay fit** significa mantenerse en forma. *Keep fit* también existe en variedades del inglés, pero la actividad selecciona **stay fit**. Un **spectator** observa un evento; un **fan** además apoya o sigue a alguien. Un **court** es una pista delimitada para tenis, baloncesto u otros deportes; no equivale a un estadio completo.

## 7. Colocaciones y reading alineado

<audio controls preload="none" src="/audio/blog/curso-b2/unit-39/sport-collocations.mp3" title="🔊 Colocaciones de deporte"></audio>

Recupera **work out at the gym, stay fit, turn up for a match, turn down an offer, work on your serve/technique, work through a difficult period** y **win the cup**. Añade *prepare for a marathon, compete in a tournament* y *follow a training schedule* para construir textos naturales.

![TURN WORK y deporte en contexto](/blog/curso-b2/unit-39/sport-context.png)

> Over five hundred fans **turned up for the match** last Saturday. It **turned out to be** a great success, and the stadium was full. Before the tournament, Ava had **worked on her serve** for months. A teammate had **turned down an offer** from another club because she wanted to stay. Together, the players **worked through a difficult period** and won the cup. Years of disciplined training **turned Ava into a professional athlete**.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-39/reading-u39.mp3" title="🔊 Reading Unidad 39"></audio>

Etiqueta cada relación: *fans → turn up; match → turn out; player → work on → serve; player → turn down → offer; team → work through → period; training → turn player into → athlete*. Esta red es más estable que siete traducciones aisladas.

Después cambia la historia a presente y comprueba concordancia: *Ava works on; the match turns out; training turns her into*. Sustituye objetos por pronombres donde sea posible: *she turned it down*. No muevas el pronombre en *work on it*.

## 8. Diálogo y errores frecuentes

<audio controls preload="none" src="/audio/blog/curso-b2/unit-39/dialogue-u39.mp3" title="🔊 Diálogo Unidad 39"></audio>

> **A:** Did many fans **turn up**?<br>
> **B:** More than five hundred. The match **turned out to be** a success.<br>
> **A:** What are you **working on** now?<br>
> **B:** My serve. I also **work out** at the gym three times a week.<br>
> **A:** Did you accept the other club's offer?<br>
> **B:** No, I **turned it down**. I want to **work through** this season with my team.

| Error | Corrección |
| :--- | :--- |
| *Fans turned for the match.* | Fans **turned up for** the match. |
| *She turned down it.* | She **turned it down**. |
| *The match turned up successful.* | It **turned out to be** successful. |
| *He turned in a professional.* | He **turned into** a professional. |
| *She makes workout every day.* | She **works out** every day. |
| *I work my serve on.* | I **work on my serve / work on it**. |
| *We worked the injury through it.* | We **worked through the difficulty / worked through it**. |
| *a work out* | **a workout** (noun); **work out** (verb). |

"""
    sections += study_lab(
        39,
        "Sport extended",
        "los siete phrasal verbs TURN y WORK, incluidos los tres significados de work out",
        "turn up/turn down; turn out/turn into; work out/work on/work through; verbo work out/sustantivo workout",
        "turn up for a match, turn down an offer, turn out to be, turn into an athlete, work out at the gym, work on a serve y work through a setback",
        "comenta durante tres minutos una temporada deportiva: asistencia, entrenamiento, una decisión, una dificultad y el resultado; usa las siete formas y diez términos de Sport extended",
    )
    sections += "\n\n## 12. Ejercicios con soluciones\n\n" + exercise_block(
        [
            (
                "Completa: *Over 500 fans ___ for the match last Saturday.*",
                "**Turned up**: llegaron o acudieron al partido.",
            ),
            (
                "Sustituye el objeto por pronombre: *He turned down the offer.*",
                "**He turned it down.** *Turn down* es separable.",
            ),
            (
                "Corrige: *The match turned up to be a great success.*",
                "**The match turned out to be a great success.** *Turn out* presenta el resultado.",
            ),
            (
                "Completa: *Years of training ___ him ___ a professional athlete.*",
                "**Turned him into** a professional athlete. La estructura transitiva es *turn A into B*.",
            ),
            (
                "Distingue tres usos de *work out* con ejemplos.",
                "**I work out at the gym** (ejercicio). **We worked out the problem** (resolver). **They worked out a schedule** (elaborar).",
            ),
            (
                "Elige: *She (worked on / worked out) her serve for months.*",
                "**Worked on**: dedicó esfuerzo a mejorar una destreza concreta.",
            ),
            (
                "Completa: *The team ___ its differences and won the cup.*",
                "**Worked through**: afrontó y superó progresivamente las diferencias.",
            ),
            (
                "Corrige ortografía y categoría: *I had a good work out, and now I workout every morning.*",
                "**I had a good workout, and now I work out every morning.** Sustantivo junto; verbo separado.",
            ),
            (
                "Distingue *fan* y *spectator*.",
                "Un **spectator** observa un evento; un **fan** apoya o sigue a un equipo o deportista.",
            ),
            (
                "Producción: escribe 160–190 palabras sobre la temporada de un equipo.",
                "Respuesta abierta. Usa los siete phrasal verbs, dos significados de **work out**, ocho términos de Sport extended y al menos dos pronombres en posición correcta.",
            ),
        ]
    )
    return slug, sections


def build_u40() -> tuple[str, str]:
    slug = "unidad-40-repaso-36-39"
    sections = r"""## 1. Cuatro preguntas para clasificar una actividad mixta

La Unidad 40 no añade una quinta lista. Integra cuatro decisiones: **¿acción o estado pasado?**, **¿qué auxiliar gobierna la frase?**, **¿qué significado RUN/SET/TAKE expresa la escena?** y **¿qué relación TURN/WORK necesita el complemento?**. Etiquetar la familia antes de responder reduce la interferencia.

![Mapa del repaso B2 de las Unidades 36 a 39](/blog/curso-b2/unit-40/review-map.png)

| Unidad | Pregunta de control | Ejemplo |
| :--- | :--- | :--- |
| **U36** | ¿hábito dinámico o estado pasado? | would visit / used to live |
| **U37** | ¿verbo simple o auxiliar ya presente? | did finish / has finished |
| **U38** | ¿encuentro, recurso, plan, viaje, hobby o reto? | run into / set off / take on |
| **U39** | ¿llegada, rechazo, resultado, cambio, ejercicio, mejora o dificultad? | turn up / work on / work through |

Una oración puede reunir varias familias: *She **used to work out**, but she **did take up** yoga after an injury*. *Used to* sitúa un hábito pasado, *did* enfatiza un evento y *take up* nombra el inicio de la actividad. Resuelve cada capa por separado y después lee el mensaje completo.

## 2. Diagnóstico U36: used to, would y Culture

<audio controls preload="none" src="/audio/blog/curso-b2/unit-40/review-u36.mp3" title="🔊 Repaso de la Unidad 36"></audio>

Recupera la asimetría central:

- **used to + base**: acciones repetidas y estados pasados;
- **would + base**: acciones repetidas dentro de un marco pasado;
- **there used to be**: existencia pasada;
- **didn't use to / Did ... use to?**: negación y pregunta estándar.

*She used to live in a village* necesita *used to* porque *live* presenta un estado. *Every Sunday, she would visit her grandmother* admite *would* porque *visit* es una acción repetida y el marco está claro. *There used to be a market* recupera una existencia que ya no es vigente.

Conecta la gramática con **tradition, heritage, custom, ceremony, folklore, legend, cultural diversity, assimilate, ritual, superstition** y **folk music**. Las colocaciones mínimas son **preserve a tradition/heritage, hold a ceremony, celebrate a festival, hand down a custom** y **put down roots**.

## 3. Diagnóstico U37: auxiliares y Business

<audio controls preload="none" src="/audio/blog/curso-b2/unit-40/review-u37.mp3" title="🔊 Repaso de la Unidad 37"></audio>

Con un verbo léxico en presente o pasado simple, el énfasis utiliza **do/does/did + base**: *I do want; he does agree; she did finish*. No produzcas *does agrees* ni *did finished*. Cuando ya existe un auxiliar, acentúalo: *they **have** finished; she **is** coming; we **will** proceed; it **has** been closed*.

La respuesta corta conserva el auxiliar de la pregunta:

| Pregunta | Respuesta |
| :--- | :--- |
| Did they sign the contract? | Yes, they **did**. |
| Have they approved the budget? | Yes, they **have**. |
| Is the CEO coming? | Yes, she **is**. |
| Will they proceed? | Yes, they **will**. |

El campo Business aporta **contract, deal, budget, merger, proposal, audit, CEO, deadline, target, strategy, profit, revenue** y los verbos **merge, approve, exceed, proceed**. Recupera las colocaciones: **close a deal, submit a proposal, meet a deadline, sign a contract, deliver a presentation, agree on terms, exceed a target**.

## 4. Diagnóstico U38: RUN, SET, TAKE y Leisure

<audio controls preload="none" src="/audio/blog/curso-b2/unit-40/review-u38.mp3" title="🔊 Repaso de la Unidad 38"></audio>

Organiza los doce phrasal verbs por pregunta, no solo por verbo:

| Intención | Forma | Ejemplo |
| :--- | :--- | :--- |
| encuentro casual | **run into** | I ran into a colleague. |
| agotar un recurso | **run out of** | We ran out of battery. |
| repasar | **run through** | Run through the itinerary. |
| pedir feedback | **run something by someone** | Run the idea by me. |
| crear/montar | **set up** | Set up a club/tent. |
| partir | **set off / set out** | Set off for the beach. |
| reservar | **set aside** | Set aside two hours. |
| empezar hobby | **take up** | Take up photography. |
| aficionarse | **take to** | Take to painting. |
| despegar/triunfar | **take off** | The club took off. |
| aceptar reto | **take on** | Take on a challenge. |

Con pronombre: *set it up, set it aside, take it up, take it on*, pero *run into him, run out of it, run through it*. La consulta sigue **run it by her**. El contexto incluye **hobby, pastime, leisure time, unwind, picnic, itinerary, camping, hiking, a hike, explore** y **club**.

## 5. Diagnóstico U39: TURN, WORK y Sport

<audio controls preload="none" src="/audio/blog/curso-b2/unit-40/review-u39.mp3" title="🔊 Repaso de la Unidad 39"></audio>

**Turn up** es llegar; **turn down**, rechazar; **turn out**, resultar; **turn into**, convertirse. **Work out** puede ser hacer ejercicio, resolver o elaborar; **work on** es intentar mejorar algo; **work through** es abordar progresivamente una dificultad.

Prueba el complemento:

- *fans* + llegar a un partido → **turn up for the match**;
- una oferta + rechazo → **turn the offer down / turn it down**;
- resultado final → **turn out to be successful**;
- transformación → **turn into an athlete**;
- gimnasio → **work out at the gym**;
- técnica → **work on a serve**;
- contratiempo → **work through a difficult period**.

El vocabulario Sport incluye **tournament, match, injury, marathon, serve, athlete, stadium, gym, training schedule, cup, workout, fan** y **stay fit**. Recuerda la categoría: **a workout** es sustantivo; **work out** es verbo.

## 6. Vocabulario mixto: una red, no cuatro bolsas

![Vocabulario mixto de Culture Business Leisure y Sport](/blog/curso-b2/unit-40/review-vocabulary.png)

<audio controls preload="none" src="/audio/blog/curso-b2/unit-40/mixed-vocabulary.mp3" title="🔊 Vocabulario mixto U36 a U39"></audio>

Construye conexiones plausibles. Una empresa puede patrocinar un festival para **preserve cultural heritage**, **submit a proposal**, **set up a programme** de ocio y lograr que aficionados **turn up for a charity match**. Un participante puede **take on a challenge**, **work through an injury** con apoyo profesional y ayudar a **meet a fundraising target**.

| Culture | Business | Leisure | Sport |
| :--- | :--- | :--- | :--- |
| preserve heritage | close a deal | take up a hobby | work out |
| hold a ceremony | submit a proposal | set aside time | work on a serve |
| hand down customs | meet a deadline | run through an itinerary | turn up for a match |
| celebrate a festival | exceed a target | unwind | win the cup |

No fuerces una palabra solo para marcar una casilla. Diseña participantes, objetivo, problema y resultado. Después selecciona las expresiones que cuentan esa escena con precisión. Este orden también mejora la coherencia de la tarea escrita final de U40.

## 7. Reading alineado: Lisa's changing routines

![Contexto integrado del repaso B2 U36 a U39](/blog/curso-b2/unit-40/review-context.png)

> When Lisa was young, she **used to celebrate** the harvest every autumn and **would dance** at festivals. Now she works in business, and her team **did close a deal** last week. At a conference, Lisa **ran into an old colleague**, and they **set up a meeting**. More than two hundred people **turned up for the event**, which **turned out to be a success**. One speaker had **worked through an injury** and recently **took up yoga** to stay fit.

<audio controls preload="none" src="/audio/blog/curso-b2/unit-40/reading-u40.mp3" title="🔊 Reading Unidad 40"></audio>

Etiqueta cada objetivo antes de explicar el texto. *Used to celebrate* y *would dance* describen hábitos; *did close* enfatiza un logro; *ran into* es encuentro casual; *set up* organiza; *turned up* indica asistencia; *turned out* presenta resultado; *worked through* expresa un proceso difícil; *took up* inicia una actividad.

Ahora formula preguntas y respuestas: *Did Lisa use to celebrate the harvest? — Yes, she did. Did the team close a deal? — Yes, it did. Did many people turn up? — Yes, they did.* La primera pregunta usa *did ... use to*; las demás reutilizan *did* como auxiliar normal. No confundas ese *did* interrogativo con el énfasis de *did close*, aunque la forma coincida.

## 8. Diálogo, estrategia y errores cruzados

<audio controls preload="none" src="/audio/blog/curso-b2/unit-40/dialogue-u40.mp3" title="🔊 Diálogo Unidad 40"></audio>

> **A:** Did you **use to attend** the harvest festival?<br>
> **B:** Yes, I did. My family **would hold** a small ceremony.<br>
> **A:** Do you still dance?<br>
> **B:** I **do**, and I **do want** to preserve the tradition.<br>
> **A:** What hobby have you **taken up**?<br>
> **B:** Yoga. It helps me **work through** stress.<br>
> **A:** How did your community event **turn out**?<br>
> **B:** Very well. Hundreds of people **turned up**.

En un ejercicio mixto, sigue este orden:

1. Localiza el verbo o el hueco completo.
2. Etiqueta la unidad y la intención.
3. Decide significado antes de conjugar.
4. Comprueba auxiliar, forma base, partícula y objeto.
5. Relee el contexto y verifica la colocación temática.

| Mezcla incorrecta | Reparación |
| :--- | :--- |
| *She would believe in superstitions.* | She **used to believe**: estado. |
| *Did she used to dance?* | Did she **use to dance**? |
| *He did exceeded the target.* | He did **exceed** the target. |
| *Have they signed? — Yes, they did.* | Yes, they **have**. |
| *run by the idea with me* | **run the idea by me** |
| *set up it* | **set it up** |
| *The match turned up successful.* | **turned out to be** successful |
| *She works her serve on.* | She **works on her serve**. |
| *a work out / I workout* | **a workout / I work out** |

"""
    sections += study_lab(
        40,
        "Culture, Business, Leisure y Sport",
        "used to/would, auxiliares y los diecinueve phrasal verbs objetivo de U38–39",
        "estado/acción; do-support/auxiliar existente; RUN/SET/TAKE; TURN/WORK; separable/inseparable",
        "preserve heritage, close a deal, set aside time, take up a hobby, turn up for a match, work on a skill y work through a setback",
        "presenta un proyecto comunitario durante cuatro minutos que conecte cultura, empresa, ocio y deporte; usa cinco objetivos correctos de cada unidad",
    )
    sections += "\n\n## 12. Ejercicios integrados con soluciones\n\n" + exercise_block(
        [
            (
                "Elige: *They (used to / would) live in a small town, where they (used to / would) hold a ceremony every year.*",
                "**Used to live** por estado; **used to hold** o **would hold** por acción repetida con marco pasado.",
            ),
            (
                "Corrige: *She did submitted the proposal, and yes, they have approved it — Yes, they did.*",
                "**She did submit the proposal. Have they approved it? — Yes, they have.** Verbo base y auxiliar conservado.",
            ),
            (
                "Completa: *We ___ an old friend, ___ a club and ___ photography.*",
                "Una secuencia posible: **ran into** an old friend, **set up** a club and **took up** photography.",
            ),
            (
                "Completa: *Fans ___ for the match, which ___ to be a success.*",
                "**Turned up** for the match; **turned out** to be a success.",
            ),
            (
                "Sustituye por pronombres: *set up the club; turn down the offer; work on the serve.*",
                "**Set it up; turn it down; work on it.** Las dos primeras son separables; *work on* no.",
            ),
            (
                "Distingue: *take up, take to, take on*.",
                "**Take up** inicia una actividad; **take to** expresa afición; **take on** acepta un reto o responsabilidad.",
            ),
            (
                "Crea tres frases con los significados de *work out*.",
                "Ejemplo: **I work out at the gym. We worked out the problem. The coach worked out a new schedule.**",
            ),
            (
                "Completa cuatro colocaciones temáticas: *___ heritage; ___ a deal; ___ time; ___ fit.*",
                "**Preserve heritage; close a deal; set aside time; stay fit.**",
            ),
            (
                "Analiza: *There used to be a club, but nobody would turn up; it did eventually take off.*",
                "**There used to be** expresa existencia, **would turn up** hábito repetido negativo en su marco y **did take off** enfatiza que finalmente ganó éxito.",
            ),
            (
                "Producción final: escribe 190–220 palabras sobre un evento comunitario.",
                "Respuesta abierta. Incluye tres estructuras de U36, cuatro auxiliares de U37, seis phrasal verbs de U38, cinco de U39 y vocabulario de los cuatro campos. Explica después cuatro elecciones.",
            ),
        ]
    )
    return slug, sections


def article_specs():
    return [
        (
            build_u36,
            dict(
                unit=36,
                title="Used To vs Would B2: Hábitos Pasados + Culture",
                description="Aprende used to y would para hábitos y estados pasados en inglés B2 con Culture extended, audio, ejemplos y ejercicios resueltos.",
                image="/blog/curso-b2/unit-36/used-to-would-map.png",
                alt="Used to y would para hábitos pasados B2 con cultura",
                readTime="31 min",
                keywords=[
                    "used to vs would B2 ejercicios",
                    "hábitos pasados used to would inglés",
                    "there used to be preguntas negativas",
                    "used to estados would acciones",
                    "vocabulario cultura patrimonio inglés B2",
                    "inglés B2 unidad 36",
                ],
                related=[
                    "unidad-36-used-to-would-culture-ejercicios-soluciones",
                    "unidad-35-repaso-31-34",
                    "unidad-37-auxiliaries-business",
                    HUB,
                ],
                faqs=[
                    (
                        "¿Cuál es la diferencia entre used to y would?",
                        "**Used to** sirve para acciones repetidas y estados pasados; **would** habitual se usa con acciones repetidas dentro de un marco pasado claro.",
                    ),
                    (
                        "¿Se puede usar would con estados?",
                        "En el objetivo de esta unidad, no. Di *I used to live, believe, have, love* y *there used to be*, no *would*.",
                    ),
                    (
                        "¿Se escribe Did you used to?",
                        "La forma estándar es **Did you use to...?** porque *did* ya marca el pasado. También: **didn't use to**.",
                    ),
                    (
                        "¿Qué vocabulario cultural incluye U36?",
                        "**Tradition, heritage, custom, ceremony, folklore, legend, cultural diversity, assimilate, ritual, superstition, folk music**, además de colocaciones como *preserve heritage* y *hand down*.",
                    ),
                    (
                        "¿Dónde practico la Unidad 36?",
                        "En la [Unidad 36 del curso B2](/curso-b2/unit-36) y su [cuaderno con soluciones](/blog/curso-b2/unidad-36-used-to-would-culture-ejercicios-soluciones).",
                    ),
                ],
                excerpt="Guía B2 de used to, would y there used to be con hábitos, estados y vocabulario Culture extended.",
                intro="""La **Unidad 36** contrasta **used to** y **would** para hablar de hábitos pasados dentro de **Culture extended**. Ambas formas pueden describir acciones repetidas —*we used to celebrate / we would celebrate*—, pero solo **used to** cubre los estados objetivo: *they used to live there; she used to believe in superstitions; there used to be a market*.

El inventario cultural de la lección incluye **tradition, heritage, custom, ceremony, folklore, legend, cultural diversity, assimilate, ritual, superstition** y **folk music**. También exige colocaciones precisas: **preserve a tradition/heritage, hold a ceremony, celebrate a festival, hand down** y **put down roots**.

Esta guía sigue los ejemplos vivos de la Unidad 36, explica afirmativas, preguntas y negativas, muestra cuándo *would* necesita un marco narrativo y ofrece tres diagramas, ocho audios, reading, diálogo y ejercicios con soluciones.""",
                before="[U35 — Repaso 31–34](/blog/curso-b2/unidad-35-repaso-31-34)",
                learn=[
                    "Usar **used to + base** con acciones y estados pasados",
                    "Elegir **would + base** para acciones repetidas con marco claro",
                    "Construir **there used to be**, preguntas y negativas",
                    "Distinguir **tradition, heritage, custom, ceremony** y términos próximos",
                    "Producir las colocaciones reales de **Culture extended**",
                ],
                tip="Antes de traducir «solía», etiqueta el verbo. Si describe estado o existencia, elige **used to**. Si es una acción repetida y el pasado ya está situado, prueba **used to** y **would** y decide qué ritmo narrativo quieres.",
                summary="""| Decisión | Forma |
| :--- | :--- |
| acción repetida | **used to / would + base** |
| estado pasado | **used to + base** |
| existencia pasada | **there used to be** |
| pregunta / negativa | **Did ... use to? / didn't use to** |
| Culture chunks | preserve heritage · hold a ceremony · hand down customs |""",
                next_block="""Continúa con la **Unidad 37**, donde los auxiliares expresan énfasis y construyen respuestas cortas en Business extended.

- [Ejercicios U36 con soluciones](/blog/curso-b2/unidad-36-used-to-would-culture-ejercicios-soluciones)
- [Unidad 36 del curso](/curso-b2/unit-36)
- [U37 teoría: Auxiliaries + Business](/blog/curso-b2/unidad-37-auxiliaries-business)""",
                guides=[
                    "[U35 Repaso 31–34](/blog/curso-b2/unidad-35-repaso-31-34)",
                    "[U37 Auxiliaries + Business](/blog/curso-b2/unidad-37-auxiliaries-business)",
                    "[Inglés B2](/blog/metodos/ingles-b2)",
                ],
                sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Past habits: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/past-habits-used-to-would-and-the-past-simple
- Cambridge Dictionary — Used to and would reference""",
            ),
        ),
        (
            build_u37,
            dict(
                unit=37,
                title="Auxiliaries B2: Énfasis y Short Answers + Business",
                description="Domina do, does, did y otros auxiliares para énfasis y respuestas cortas B2 con Business extended, audio y ejercicios.",
                image="/blog/curso-b2/unit-37/auxiliaries-map.png",
                alt="Auxiliares B2 para énfasis y respuestas cortas con negocios",
                readTime="31 min",
                keywords=[
                    "auxiliary verbs emphasis B2 ejercicios",
                    "do does did para énfasis inglés",
                    "short answers auxiliares inglés B2",
                    "respuestas cortas did have is will",
                    "business vocabulary collocations B2",
                    "inglés B2 unidad 37",
                ],
                related=[
                    "unidad-37-auxiliaries-business-ejercicios-soluciones",
                    "unidad-36-used-to-would-culture",
                    "unidad-38-phrasal-verbs-5-run-set-take-leisure",
                    HUB,
                ],
                faqs=[
                    (
                        "¿Cuándo se usa do para enfatizar una afirmativa?",
                        "Con un verbo léxico en presente simple: **I do want**, **he does agree**. Para pasado usa **did + base**: *she did submit*.",
                    ),
                    (
                        "¿Por qué se dice did finish y no did finished?",
                        "Porque el auxiliar **did** ya marca pasado; el verbo léxico vuelve a la forma base.",
                    ),
                    (
                        "¿Cómo elijo el auxiliar de una short answer?",
                        "Repite el auxiliar de la pregunta y hazlo concordar con el sujeto: *Did...? did; Have...? have; Is...? is; Will...? will*.",
                    ),
                    (
                        "¿Qué ocurre si la frase ya tiene have, be o un modal?",
                        "Ese auxiliar recibe énfasis: *they **have** finished; she **is** coming; we **will** proceed*. No añadas *do*.",
                    ),
                    (
                        "¿Dónde practico la Unidad 37?",
                        "En la [Unidad 37 del curso B2](/curso-b2/unit-37) y su [cuaderno con soluciones](/blog/curso-b2/unidad-37-auxiliaries-business-ejercicios-soluciones).",
                    ),
                ],
                excerpt="Guía B2 de auxiliares enfáticos y short answers con do/does/did, perfectos, modales y Business extended.",
                intro="""La **Unidad 37** usa auxiliares para dos objetivos comunicativos: **reforzar una afirmación** y construir **short answers** sin repetir todo el predicado. *I do want to attend, he does agree, she did submit the proposal* corrigen o confirman información. *Did they sign? — Yes, they did* conserva el auxiliar de la pregunta.

La lección no se limita a *do*. Contrasta **be, have, will, can y should**: *Are you attending? — Yes, I am; Have they finished? — Yes, they have; Will they approve it? — Yes, they will*. Si el auxiliar ya existe, recibe el énfasis y no se añade *do*.

El contexto real de **Business extended** incluye **contract, deal, budget, merger, proposal, audit, CEO, deadline, target, strategy, profit, revenue** y colocaciones como **close a deal, submit a proposal, meet a deadline, sign a contract, deliver a presentation, agree on terms** y **exceed a target**.""",
                before="[U36 — Used to, Would + Culture](/blog/curso-b2/unidad-36-used-to-would-culture)",
                learn=[
                    "Insertar **do/does/did** para énfasis y mantener el verbo base",
                    "Acentuar **be, have** o un modal cuando ya están presentes",
                    "Responder brevemente con el auxiliar exacto de la pregunta",
                    "Distinguir perfectos, continuos, pasivas y modales",
                    "Usar el vocabulario y las colocaciones de **Business extended**",
                ],
                tip="No elijas el auxiliar por traducción. Mira la arquitectura de la pregunta o afirmación. El primer auxiliar transporta tiempo y modalidad; consérvalo en la respuesta y no flexiones de nuevo el verbo principal.",
                summary="""| Contexto | Auxiliar |
| :--- | :--- |
| presente simple enfático | **do/does + base** |
| pasado simple enfático | **did + base** |
| continuo / be | **am/is/are/was/were** |
| perfecto / pasiva perfecta | **have/has/had** |
| modalidad | **will/can/should**, etc. |
| short answer | repetir auxiliar de la pregunta |""",
                next_block="""La **Unidad 38** amplía los phrasal verbs con las familias **RUN, SET y TAKE** dentro de Leisure extended.

- [Ejercicios U37 con soluciones](/blog/curso-b2/unidad-37-auxiliaries-business-ejercicios-soluciones)
- [Unidad 37 del curso](/curso-b2/unit-37)
- [U38 teoría: RUN, SET, TAKE + Leisure](/blog/curso-b2/unidad-38-phrasal-verbs-5-run-set-take-leisure)""",
                guides=[
                    "[U36 Used to, Would + Culture](/blog/curso-b2/unidad-36-used-to-would-culture)",
                    "[U38 RUN, SET, TAKE + Leisure](/blog/curso-b2/unidad-38-phrasal-verbs-5-run-set-take-leisure)",
                    "[Inglés B2](/blog/metodos/ingles-b2)",
                ],
                sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Auxiliary verbs: https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/auxiliary-verbs
- Cambridge Dictionary — Emphatic do and short answers""",
            ),
        ),
        (
            build_u38,
            dict(
                unit=38,
                title="Phrasal Verbs RUN, SET, TAKE B2 + Leisure",
                description="Aprende run into/out of/through/by, set up/off/out/aside y take to/up/off/on en inglés B2 con ocio, audio y ejercicios.",
                image="/blog/curso-b2/unit-38/run-set-take-map.png",
                alt="Phrasal verbs RUN SET TAKE B2 con vocabulario de ocio",
                readTime="32 min",
                keywords=[
                    "phrasal verbs run set take B2 ejercicios",
                    "run into run out of run through diferencias",
                    "set up set off set out set aside inglés",
                    "take up take to take off take on",
                    "phrasal verbs ocio hobbies B2",
                    "inglés B2 unidad 38",
                ],
                related=[
                    "unidad-38-phrasal-verbs-5-run-set-take-leisure-ejercicios-soluciones",
                    "unidad-37-auxiliaries-business",
                    "unidad-39-phrasal-verbs-6-turn-work-sport",
                    HUB,
                ],
                faqs=[
                    (
                        "¿Qué diferencia hay entre take up y take to?",
                        "**Take up** significa empezar una actividad; **take to** significa empezar a disfrutarla o aceptarla: *I took up yoga and took to it quickly*.",
                    ),
                    (
                        "¿Set off y set out significan lo mismo?",
                        "Se solapan al iniciar un viaje: *set off for the beach; set out at dawn*. **Set out** también puede introducir un propósito: *set out to explore*.",
                    ),
                    (
                        "¿Cómo se usa run by para pedir opinión?",
                        "La estructura es **run something by someone**: *Let me run the plan by you; I ran it by her*.",
                    ),
                    (
                        "¿Dónde va el pronombre con set up?",
                        "En medio: **set it up**. En cambio, di *run into him, run out of it* porque esas formas no se separan.",
                    ),
                    (
                        "¿Dónde practico la Unidad 38?",
                        "En la [Unidad 38 del curso B2](/curso-b2/unit-38) y su [cuaderno con soluciones](/blog/curso-b2/unidad-38-phrasal-verbs-5-run-set-take-leisure-ejercicios-soluciones).",
                    ),
                ],
                excerpt="Guía B2 de doce phrasal verbs RUN, SET y TAKE con objetos, pronombres y vocabulario Leisure extended.",
                intro="""La **Unidad 38** presenta doce phrasal verbs de **RUN, SET y TAKE**: **run into, run out of, run through, run something by someone; set up, set off, set out, set aside; take to, take up, take off** y **take on**. Cada partícula cambia la escena, desde encontrarse con alguien hasta empezar un hobby o aceptar un reto.

El contexto de **Leisure extended** aporta complementos reales: **hobby, picnic, unwind, itinerary, camping, hiking, explore, club, leisure time, pastime** y **hike**. Sus colocaciones incluyen **take up a hobby, set aside time, set off on a trip, take on a challenge, run into an old friend** y **set up a club**.

La guía alinea significados y ejemplos con las lecciones vivas, corrige la estructura *run the plan by someone*, explica formas separables e inseparables y añade diagramas, ocho audios, reading, diálogo y práctica resuelta.""",
                before="[U37 — Auxiliaries + Business](/blog/curso-b2/unidad-37-auxiliaries-business)",
                learn=[
                    "Distinguir cuatro significados de **RUN**",
                    "Contrastar **set up, set off, set out** y **set aside**",
                    "Separar **take up, take to, take off** y **take on**",
                    "Colocar nombres y pronombres según la estructura",
                    "Producir vocabulario y colocaciones de **Leisure extended**",
                ],
                tip="No estudies *run = correr, take = tomar*. Guarda la unidad entera con su complemento: **run out of battery, set aside time, take on a challenge**. El objeto revela el significado y también ayuda a recordar la posición.",
                summary="""| Familia | Inventario |
| :--- | :--- |
| **RUN** | into · out of · through · something by someone |
| **SET** | up · off · out · aside |
| **TAKE** | to · up · off · on |
| separables clave | set it up · set it aside · take it up · take it on |
| Leisure | hobby · itinerary · camping · hiking · unwind · pastime |""",
                next_block="""Continúa con la **Unidad 39** para trabajar **TURN y WORK** en situaciones de entrenamiento y competición.

- [Ejercicios U38 con soluciones](/blog/curso-b2/unidad-38-phrasal-verbs-5-run-set-take-leisure-ejercicios-soluciones)
- [Unidad 38 del curso](/curso-b2/unit-38)
- [U39 teoría: TURN, WORK + Sport](/blog/curso-b2/unidad-39-phrasal-verbs-6-turn-work-sport)""",
                guides=[
                    "[U37 Auxiliaries + Business](/blog/curso-b2/unidad-37-auxiliaries-business)",
                    "[U39 TURN, WORK + Sport](/blog/curso-b2/unidad-39-phrasal-verbs-6-turn-work-sport)",
                    "[Inglés B2](/blog/metodos/ingles-b2)",
                ],
                sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Phrasal verbs: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/phrasal-verbs
- Cambridge Dictionary — RUN, SET and TAKE phrasal verbs""",
            ),
        ),
        (
            build_u39,
            dict(
                unit=39,
                title="Phrasal Verbs TURN y WORK B2 + Sport",
                description="Domina turn up/down/out/into y work out/on/through en inglés B2 con Sport extended, varios significados, audio y ejercicios.",
                image="/blog/curso-b2/unit-39/turn-work-map.png",
                alt="Phrasal verbs TURN WORK B2 con vocabulario deportivo",
                readTime="31 min",
                keywords=[
                    "phrasal verbs turn work B2 ejercicios",
                    "turn up turn down turn out turn into diferencias",
                    "work out work on work through inglés",
                    "workout vs work out B2",
                    "vocabulario deporte competición inglés B2",
                    "inglés B2 unidad 39",
                ],
                related=[
                    "unidad-39-phrasal-verbs-6-turn-work-sport-ejercicios-soluciones",
                    "unidad-38-phrasal-verbs-5-run-set-take-leisure",
                    "unidad-40-repaso-36-39",
                    HUB,
                ],
                faqs=[
                    (
                        "¿Qué diferencia hay entre turn up y turn out?",
                        "**Turn up** significa llegar; **turn out** presenta el resultado: *Fans turned up; the match turned out to be successful*.",
                    ),
                    (
                        "¿Work out siempre significa entrenar?",
                        "No. También significa resolver o elaborar: *work out a problem; work out a training schedule*.",
                    ),
                    (
                        "¿Cuál es la diferencia entre work on y work through?",
                        "**Work on** dedica esfuerzo a mejorar algo; **work through** aborda una dificultad o proceso paso a paso.",
                    ),
                    (
                        "¿Se escribe workout o work out?",
                        "**Workout** es sustantivo (*a workout*); **work out** es verbo (*I work out*).",
                    ),
                    (
                        "¿Dónde practico la Unidad 39?",
                        "En la [Unidad 39 del curso B2](/curso-b2/unit-39) y su [cuaderno con soluciones](/blog/curso-b2/unidad-39-phrasal-verbs-6-turn-work-sport-ejercicios-soluciones).",
                    ),
                ],
                excerpt="Guía B2 de turn up/down/out/into y work out/on/through con estructuras, polisemia y Sport extended.",
                intro="""La **Unidad 39** reúne siete phrasal verbs: **turn up, turn down, turn out, turn into, work out, work on** y **work through**. El reto está en distinguir relaciones: llegar o rechazar, resultar o convertirse, hacer ejercicio o resolver, mejorar una técnica o atravesar una dificultad.

**Work out** requiere atención especial porque las lecciones vivas usan tres sentidos: *work out at the gym* (entrenar), *work out a problem* (resolver) y *work out a training schedule* (elaborar). El complemento decide.

El campo **Sport extended** incluye **tournament, injury, marathon, serve, athlete, stadium, gym, training schedule, cup, workout, fan** y **stay fit**. La guía integra ese vocabulario con diagramas, ocho audios, reading, diálogo, posición de pronombres y ejercicios detallados.""",
                before="[U38 — RUN, SET, TAKE + Leisure](/blog/curso-b2/unidad-38-phrasal-verbs-5-run-set-take-leisure)",
                learn=[
                    "Contrastar **turn up/down/out/into** por intención",
                    "Reconocer tres significados vivos de **work out**",
                    "Separar **work on** y **work through**",
                    "Colocar objetos y pronombres correctamente",
                    "Usar vocabulario y colocaciones de **Sport extended**",
                ],
                tip="Mira el participante y el complemento: los aficionados **turn up**, una persona **turns down an offer**, un partido **turns out** bien y el entrenamiento **turns someone into** atleta. La red semántica evita traducciones al azar.",
                summary="""| Forma | Significado objetivo |
| :--- | :--- |
| **turn up / down** | llegar / rechazar |
| **turn out / into** | resultar / convertirse |
| **work out** | entrenar · resolver · elaborar |
| **work on** | mejorar o desarrollar |
| **work through** | abordar y superar progresivamente |
| categoría | a **workout** / to **work out** |""",
                next_block="""La **Unidad 40** integra hábitos pasados, auxiliares y las familias de phrasal verbs de U38–39.

- [Ejercicios U39 con soluciones](/blog/curso-b2/unidad-39-phrasal-verbs-6-turn-work-sport-ejercicios-soluciones)
- [Unidad 39 del curso](/curso-b2/unit-39)
- [U40 teoría: Repaso 36–39](/blog/curso-b2/unidad-40-repaso-36-39)""",
                guides=[
                    "[U38 RUN, SET, TAKE + Leisure](/blog/curso-b2/unidad-38-phrasal-verbs-5-run-set-take-leisure)",
                    "[U40 Repaso 36–39](/blog/curso-b2/unidad-40-repaso-36-39)",
                    "[Inglés B2](/blog/metodos/ingles-b2)",
                ],
                sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — Phrasal verbs: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/phrasal-verbs
- Cambridge Dictionary — TURN and WORK phrasal verbs""",
            ),
        ),
        (
            build_u40,
            dict(
                unit=40,
                title="Repaso B2 Unidades 36–39: Used To, Auxiliaries & Phrasal Verbs",
                description="Repasa used to/would, auxiliares y phrasal verbs RUN, SET, TAKE, TURN y WORK B2 con vocabulario, audio y ejercicios.",
                image="/blog/curso-b2/unit-40/review-map.png",
                alt="Repaso B2 unidades 36 a 39 used to auxiliares y phrasal verbs",
                readTime="33 min",
                keywords=[
                    "repaso inglés B2 unidades 36 39",
                    "used to would auxiliaries phrasal verbs review",
                    "run set take turn work B2 ejercicios",
                    "repaso módulo 4 inglés B2",
                    "culture business leisure sport vocabulary B2",
                    "inglés B2 unidad 40",
                ],
                related=[
                    "unidad-40-repaso-36-39-ejercicios-soluciones",
                    "unidad-36-used-to-would-culture",
                    "unidad-37-auxiliaries-business",
                    "unidad-38-phrasal-verbs-5-run-set-take-leisure",
                    "unidad-39-phrasal-verbs-6-turn-work-sport",
                    HUB,
                ],
                faqs=[
                    (
                        "¿Qué contenidos integra la Unidad 40?",
                        "U36 **used to/would**, U37 auxiliares para énfasis y respuestas cortas, U38 phrasal verbs **RUN/SET/TAKE** y U39 **TURN/WORK**.",
                    ),
                    (
                        "¿Cómo empiezo un ejercicio mixto?",
                        "Etiqueta primero la familia: hábito pasado, auxiliar o phrasal verb. Después decide significado y revisa forma base, partícula, objeto y concordancia.",
                    ),
                    (
                        "¿Cuántos phrasal verbs se repasan?",
                        "Diecinueve objetivos: doce de RUN/SET/TAKE y siete de TURN/WORK, contando cada combinación completa.",
                    ),
                    (
                        "¿Qué vocabulario se integra?",
                        "Los campos **Culture, Business, Leisure y Sport**, con colocaciones como *preserve heritage, close a deal, set aside time* y *stay fit*.",
                    ),
                    (
                        "¿Dónde practico la Unidad 40?",
                        "En la [Unidad 40 del curso B2](/curso-b2/unit-40) y su [cuaderno con soluciones](/blog/curso-b2/unidad-40-repaso-36-39-ejercicios-soluciones).",
                    ),
                ],
                excerpt="Repaso integrado B2 de used to/would, auxiliares y diecinueve phrasal verbs con cuatro campos de vocabulario.",
                intro="""La **Unidad 40** cierra el segundo bloque del Módulo 4 integrando **used to/would**, auxiliares para énfasis y respuestas cortas, los doce phrasal verbs **RUN/SET/TAKE** y los siete objetivos **TURN/WORK**. Los contextos conectan **Culture, Business, Leisure y Sport**.

El reto no es memorizar otra lista, sino clasificar la decisión. *Used to live* describe estado; *would visit* recupera una acción repetida; *did close* enfatiza con verbo base; *Have they approved it? — Yes, they have* conserva el auxiliar; *turn up* no equivale a *turn out*.

Esta guía funciona como diagnóstico y producción. Incluye los inventarios reales de U36–39, tres diagramas, ocho audios, vocabulario conectado, reading, diálogo, estrategia de examen y ejercicios integrados con soluciones.""",
                before="[U39 — TURN, WORK + Sport](/blog/curso-b2/unidad-39-phrasal-verbs-6-turn-work-sport)",
                learn=[
                    "Clasificar un hueco antes de responder",
                    "Recuperar hábitos pasados y auxiliares sin mezclar reglas",
                    "Distinguir los doce phrasal verbs de U38",
                    "Distinguir las siete formas y sentidos de U39",
                    "Integrar Culture, Business, Leisure y Sport en un texto coherente",
                ],
                tip="En un repaso mixto, retrasa la respuesta un segundo: nombra la familia, formula la pregunta de control y solo entonces completa. La revisión final debe comprobar forma base, auxiliar, partícula, posición del objeto y colocación.",
                summary="""| Unidad | Control mínimo |
| :--- | :--- |
| **U36** | acción/estado; used to/would |
| **U37** | do-support/auxiliar existente |
| **U38** | RUN · SET · TAKE + complemento |
| **U39** | TURN · WORK + resultado o proceso |
| vocabulario | Culture · Business · Leisure · Sport |""",
                next_block="""Has completado las Unidades 36–40 y la teoría del Módulo 4. Continúa en la **Unidad 41 del curso B2** y conserva este diagnóstico para repasar solo la familia que falle.

- [Ejercicios U40 con soluciones](/blog/curso-b2/unidad-40-repaso-36-39-ejercicios-soluciones)
- [Unidad 40 del curso](/curso-b2/unit-40)
- [Continuar con Unidad 41](/curso-b2/unit-41)""",
                guides=[
                    "[U36 Used to, Would + Culture](/blog/curso-b2/unidad-36-used-to-would-culture)",
                    "[U37 Auxiliaries + Business](/blog/curso-b2/unidad-37-auxiliaries-business)",
                    "[U38 RUN, SET, TAKE + Leisure](/blog/curso-b2/unidad-38-phrasal-verbs-5-run-set-take-leisure)",
                    "[U39 TURN, WORK + Sport](/blog/curso-b2/unidad-39-phrasal-verbs-6-turn-work-sport)",
                    "[Inglés B2](/blog/metodos/ingles-b2)",
                ],
                sources="""- CEFR/MCER — Nivel B2: https://www.coe.int/en/web/common-european-framework-reference-languages
- British Council — B1–B2 grammar: https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar
- Cambridge Dictionary — Used to, auxiliaries and phrasal verbs""",
            ),
        ),
    ]


def write_articles() -> None:
    for builder, metadata in article_specs():
        slug, sections = builder()
        write_checked(
            f"{slug}.md",
            article(slug=slug, sections=sections, **metadata),
        )


def patch_existing_content() -> None:
    """Link U35 to U36 theory and refresh the B2 publication tracker."""
    u35_path = OUT_MD / "unidad-35-repaso-31-34.md"
    u35 = u35_path.read_text(encoding="utf-8")
    next_block = """## Siguiente paso en el curso B2

Has cerrado el primer bloque del Módulo 4. Continúa con la **Unidad 36 — Used to, Would & Culture**, que contrasta acciones repetidas y estados pasados.

- [Ejercicios U35 con soluciones](/blog/curso-b2/unidad-35-repaso-31-34-ejercicios-soluciones)
- [Unidad 35 del curso](/curso-b2/unit-35)
- [U36 teoría: Used to, Would + Culture](/blog/curso-b2/unidad-36-used-to-would-culture)
- [Ejercicios U36 con soluciones](/blog/curso-b2/unidad-36-used-to-would-culture-ejercicios-soluciones)

### Guías relacionadas"""
    u35, substitutions = re.subn(
        r"## Siguiente paso en el curso B2\n.*?\n### Guías relacionadas",
        next_block,
        u35,
        count=1,
        flags=re.DOTALL,
    )
    if substitutions != 1:
        raise ValueError("Could not locate U35 next-step block")
    u35_path.write_text(u35, encoding="utf-8")
    print("patch", u35_path.relative_to(ROOT))

    docs_path = ROOT / "docs/curso-b2-articulos-explicativos.md"
    docs = docs_path.read_text(encoding="utf-8")
    docs = re.sub(
        r"\*\*Última actualización:\*\* .+",
        "**Última actualización:** 2026-09-01 (40 artículos de teoría y 35 cuadernos publicados; Módulo 4 completo en teoría)",
        docs,
        count=1,
    )
    docs = re.sub(
        r"\| Artículos dedicados publicados \| \d+ \|",
        "| Artículos dedicados publicados | 40 |",
        docs,
        count=1,
    )
    docs = re.sub(
        r"\| Artículos dedicados pendientes \| \d+ \|",
        "| Artículos dedicados pendientes | 20 |",
        docs,
        count=1,
    )
    old = """### U36–40

Pendiente."""
    new = """### U36–40 — Past Habits, Auxiliaries & Phrasal Verbs 5–6

| U | Título | Gramática / tema | Teoría | Cuaderno |
|---|---|---|---|---|
| 36 | Used to, Would & Culture | used to / would para hábitos y estados; culture extended | ✅ | ❌ |
| 37 | Auxiliaries & Business | énfasis y short answers; business extended | ✅ | ❌ |
| 38 | Phrasal Verbs 5 & Leisure | RUN / SET / TAKE; leisure extended | ✅ | ❌ |
| 39 | Phrasal Verbs 6 & Sport | TURN / WORK; sport extended | ✅ | ❌ |
| 40 | Repaso 36–39 | integración | ✅ | ❌ |

Teoría M4 (U36–40):
- [U36](/blog/curso-b2/unidad-36-used-to-would-culture) · [U37](/blog/curso-b2/unidad-37-auxiliaries-business) · [U38](/blog/curso-b2/unidad-38-phrasal-verbs-5-run-set-take-leisure) · [U39](/blog/curso-b2/unidad-39-phrasal-verbs-6-turn-work-sport) · [U40](/blog/curso-b2/unidad-40-repaso-36-39)

Cuadernos previstos M4 (U36–40):
- [U36](/blog/curso-b2/unidad-36-used-to-would-culture-ejercicios-soluciones) · [U37](/blog/curso-b2/unidad-37-auxiliaries-business-ejercicios-soluciones) · [U38](/blog/curso-b2/unidad-38-phrasal-verbs-5-run-set-take-leisure-ejercicios-soluciones) · [U39](/blog/curso-b2/unidad-39-phrasal-verbs-6-turn-work-sport-ejercicios-soluciones) · [U40](/blog/curso-b2/unidad-40-repaso-36-39-ejercicios-soluciones)

**Estado del Módulo 4:** teoría completa U31–40; cuadernos publicados hasta U35."""
    if old not in docs:
        raise ValueError("Could not locate U36–40 tracker section")
    docs = docs.replace(old, new, 1)
    docs_path.write_text(docs, encoding="utf-8")
    print("patch", docs_path.relative_to(ROOT))


def main() -> None:
    diagrams()
    tts()
    write_articles()
    patch_existing_content()
    print("done B2 theory U36–40")


if __name__ == "__main__":
    main()
