#!/usr/bin/env python3
"""Generate B1 theory U16–20: diagrams (PIL), markdown articles, and TTS audios."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT_MD = ROOT / "src/content/blog/curso-b1"
DATE = "2026-08-31"
BG = (245, 248, 252)
INK = (20, 35, 55)
ACCENT = (15, 110, 140)
CARD = (255, 255, 255)
LINE = (200, 215, 230)


def font(size: int, bold: bool = False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for c in candidates:
        if Path(c).exists():
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def new_img(w=1200, h=675):
    img = Image.new("RGB", (w, h), BG)
    draw = ImageDraw.Draw(img)
    return img, draw


def card(draw, xy, fill=CARD):
    x1, y1, x2, y2 = xy
    draw.rounded_rectangle(xy, radius=18, fill=fill, outline=LINE, width=2)


def title(draw, text, y=36):
    draw.text((48, y), text, fill=INK, font=font(36, True))


def save(img: Image.Image, unit: int, name: str) -> Path:
    d = ROOT / f"public/blog/curso-b1/unit-{unit}"
    d.mkdir(parents=True, exist_ok=True)
    path = d / name
    img.save(path, "PNG", optimize=True)
    print("img", path.relative_to(ROOT))
    return path


def diagram_passive():
    img, d = new_img()
    title(d, "Passive Voice B1 — be + past participle")
    card(d, (48, 100, 1150, 300))
    d.text((72, 120), "Active:  Someone installs the app.", fill=INK, font=font(26))
    d.text((72, 170), "Passive: The app is installed (by someone).", fill=ACCENT, font=font(26, True))
    d.text((72, 230), "Present: is / are + V3     Past: was / were + V3", fill=INK, font=font(24))
    card(d, (48, 330, 560, 620))
    d.text((72, 350), "Present", fill=ACCENT, font=font(28, True))
    for i, t in enumerate(["Emails are sent daily.", "The device is manufactured in China.", "Passwords are changed regularly."]):
        d.text((72, 410 + i * 50), f"• {t}", fill=INK, font=font(22))
    card(d, (600, 330, 1150, 620))
    d.text((624, 350), "Past", fill=ACCENT, font=font(28, True))
    for i, t in enumerate(["The laptop was repaired.", "Files were deleted yesterday.", "The system was tested."]):
        d.text((624, 410 + i * 50), f"• {t}", fill=INK, font=font(22))
    save(img, 16, "passive-voice.png")


def diagram_tech_vocab():
    img, d = new_img()
    title(d, "Technology vocabulary")
    words = [
        ("smartphone", "app"), ("software", "device"), ("download", "upload"),
        ("update", "password"), ("screen", "connection"), ("network", "cloud"),
        ("data", "file"), ("link", "Wi-Fi"),
    ]
    for i, (a, b) in enumerate(words):
        x = 48 + (i % 4) * 280
        y = 120 + (i // 4) * 240
        card(d, (x, y, x + 250, y + 200))
        d.text((x + 24, y + 50), a, fill=ACCENT, font=font(26, True))
        d.text((x + 24, y + 110), b, fill=INK, font=font(26, True))
    save(img, 16, "tech-vocab.png")


def diagram_tech_scene():
    img, d = new_img()
    title(d, "Technology in daily life")
    card(d, (48, 110, 1150, 580))
    lines = [
        "Photos are uploaded to the cloud every day.",
        "The software was installed yesterday.",
        "Messages are encrypted for security.",
        "The website was designed by a professional team.",
    ]
    for i, t in enumerate(lines):
        d.text((80, 180 + i * 80), f"{i+1}. {t}", fill=INK, font=font(28))
    save(img, 16, "tech-scene.png")


def diagram_modal_passive():
    img, d = new_img()
    title(d, "Modal Passive — modal + be + V3")
    card(d, (48, 110, 1150, 280))
    d.text((72, 140), "must be done  ·  should be finished  ·  can be changed", fill=ACCENT, font=font(28, True))
    d.text((72, 210), "Focus on the action, not who does it.", fill=INK, font=font(24))
    examples = [
        ("must be", "The form must be completed."),
        ("should be", "The report should be sent today."),
        ("can be", "The meeting can be postponed."),
        ("might be", "The interview might be cancelled."),
    ]
    for i, (label, ex) in enumerate(examples):
        x = 48 + (i % 2) * 560
        y = 320 + (i // 2) * 150
        card(d, (x, y, x + 520, y + 130))
        d.text((x + 24, y + 24), label, fill=ACCENT, font=font(24, True))
        d.text((x + 24, y + 70), ex, fill=INK, font=font(22))
    save(img, 17, "modal-passive.png")


def diagram_work_vocab():
    img, d = new_img()
    title(d, "Work & jobs vocabulary")
    words = [
        "salary", "interview", "colleague", "contract", "boss", "employee",
        "application", "resume", "promotion", "meeting", "deadline", "client",
    ]
    for i, w in enumerate(words):
        x = 48 + (i % 4) * 280
        y = 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 28, y + 48), w, fill=INK, font=font(26, True))
    save(img, 17, "work-vocab.png")


def diagram_work_scene():
    img, d = new_img()
    title(d, "At work — modal passive")
    card(d, (48, 110, 1150, 560))
    lines = [
        "Applications must be submitted before the deadline.",
        "The contract should be signed by Friday.",
        "Meetings can be held online.",
        "The salary might be increased next year.",
    ]
    for i, t in enumerate(lines):
        d.text((80, 180 + i * 80), f"• {t}", fill=INK, font=font(28))
    save(img, 17, "work-scene.png")


def diagram_reported_statements():
    img, d = new_img()
    title(d, "Reported Speech — statements")
    card(d, (48, 110, 580, 560))
    d.text((72, 130), "Direct", fill=ACCENT, font=font(28, True))
    for i, t in enumerate(['"I am busy."', '"We will call you."', '"She has left."', '"I can help."']):
        d.text((72, 200 + i * 70), t, fill=INK, font=font(24))
    card(d, (650, 110, 1150, 560))
    d.text((674, 130), "Reported", fill=ACCENT, font=font(28, True))
    for i, t in enumerate(["She said (that) she was busy.", "They said they would call me.", "He said she had left.", "She said she could help."]):
        d.text((674, 200 + i * 70), t, fill=INK, font=font(22))
    save(img, 18, "reported-statements.png")


def diagram_comm_vocab():
    img, d = new_img()
    title(d, "Communication vocabulary")
    words = ["message", "email", "text", "call", "reply", "forward", "attach", "inbox", "subject", "chat", "notify", "share"]
    for i, w in enumerate(words):
        x = 48 + (i % 4) * 280
        y = 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 28, y + 48), w, fill=INK, font=font(26, True))
    save(img, 18, "comm-vocab.png")


def diagram_comm_scene():
    img, d = new_img()
    title(d, "Messages & reported speech")
    card(d, (48, 110, 1150, 560))
    lines = [
        'Tom: "I will send the email tonight."',
        "→ Tom said he would send the email that night.",
        'Sara: "I have attached the file."',
        "→ Sara said she had attached the file.",
    ]
    for i, t in enumerate(lines):
        d.text((80, 180 + i * 80), t, fill=INK if not t.startswith("→") else ACCENT, font=font(26, True if t.startswith("→") else False))
    save(img, 18, "comm-scene.png")


def diagram_reported_questions():
    img, d = new_img()
    title(d, "Reported questions & commands")
    card(d, (48, 110, 1150, 320))
    d.text((72, 130), "Questions", fill=ACCENT, font=font(28, True))
    d.text((72, 190), 'He asked, "Where do you live?" → He asked where I lived.', fill=INK, font=font(24))
    d.text((72, 250), 'She asked, "Are you ready?" → She asked if/whether I was ready.', fill=INK, font=font(24))
    card(d, (48, 360, 1150, 600))
    d.text((72, 380), "Commands / requests", fill=ACCENT, font=font(28, True))
    d.text((72, 450), '“Open the file.” → She told me to open the file.', fill=INK, font=font(24))
    d.text((72, 520), '“Don’t be late.” → He told me not to be late.', fill=INK, font=font(24))
    save(img, 19, "reported-questions.png")


def diagram_lang_vocab():
    img, d = new_img()
    title(d, "Language learning vocabulary")
    words = ["translate", "pronounce", "grammar", "vocabulary", "fluent", "accent", "meaning", "phrase", "practice", "mistake", "explain", "repeat"]
    for i, w in enumerate(words):
        x = 48 + (i % 4) * 280
        y = 120 + (i // 4) * 160
        card(d, (x, y, x + 250, y + 130))
        d.text((x + 24, y + 48), w, fill=INK, font=font(24, True))
    save(img, 19, "lang-vocab.png")


def diagram_lang_scene():
    img, d = new_img()
    title(d, "In the language class")
    card(d, (48, 110, 1150, 560))
    lines = [
        'The teacher asked if we had practised at home.',
        'She told us to translate the paragraph.',
        'He asked how we pronounce that word.',
        'They told us not to worry about mistakes.',
    ]
    for i, t in enumerate(lines):
        d.text((80, 180 + i * 80), f"• {t}", fill=INK, font=font(26))
    save(img, 19, "lang-scene.png")


def diagram_review_map():
    img, d = new_img()
    title(d, "Review 16–19 — Passive & Reported Speech")
    items = [
        ("U16", "Passive present/past"),
        ("U17", "Modal passive"),
        ("U18", "Reported statements"),
        ("U19", "Questions & commands"),
    ]
    for i, (u, label) in enumerate(items):
        x = 48 + i * 280
        card(d, (x, 140, x + 250, 360))
        d.text((x + 30, 180), u, fill=ACCENT, font=font(34, True))
        d.text((x + 30, 250), label, fill=INK, font=font(22))
    card(d, (48, 400, 1150, 600))
    d.text((72, 440), "Checklist: be + V3 · modal + be + V3 · said/told + backshift · asked if/wh- · told to / not to", fill=INK, font=font(22))
    d.text((72, 510), "Vocab mix: technology · work · communication · language", fill=INK, font=font(22))
    save(img, 20, "review-map.png")


def diagram_review_examples():
    img, d = new_img()
    title(d, "Mixed examples")
    lines = [
        "The app is updated every week. (passive)",
        "The form must be completed. (modal passive)",
        "She said she was busy. (reported statement)",
        "He asked if I was ready. (reported question)",
        "They told us to practise more. (command)",
    ]
    card(d, (48, 110, 1150, 600))
    for i, t in enumerate(lines):
        d.text((80, 160 + i * 75), f"{i+1}. {t}", fill=INK, font=font(26))
    save(img, 20, "review-examples.png")


BING = [
    "curso de inglés gratis",
    "aprender inglés gratis",
    "curso de inglés online gratis",
    "curso inglés B1 gratis",
]


def write_md(name: str, body: str) -> None:
    path = OUT_MD / name
    if not body.endswith("\n"):
        body += "\n"
    path.write_text(body, encoding="utf-8")
    print("md", path.relative_to(ROOT))


def article(
    *,
    slug: str,
    unit: int,
    title: str,
    description: str,
    image: str,
    alt: str,
    keywords: list[str],
    related: list[str],
    faqs: list[tuple[str, str]],
    excerpt: str,
    intro: str,
    before: str,
    learn: list[str],
    sections: str,
    tip: str,
    next_course: str,
    next_blog: str,
    related_guides: list[str],
) -> str:
    kw = "\n".join(f"  - {k}" for k in keywords + BING)
    rel = "\n".join(f"  - {r}" for r in related)
    faq_yaml = []
    for q, a in faqs:
        faq_yaml.append(f"  - question: {q}\n    answer: >-\n      {a}")
    faqs_block = "\n".join(faq_yaml)
    learn_block = "\n".join(f"- {x}" for x in learn)
    guides = "\n".join(f"- {g}" for g in related_guides)
    return f"""---
category: curso-b1
date: '{DATE}'
updatedDate: '{DATE}'
author: linguafly-team
title: '{title}'
description: >-
  {description}
readTime: 15 min
keywords:
{kw}
canonical: 'https://www.linguafly.app/blog/curso-b1/{slug}'
image: {image}
alt: '{alt}'
related_routes:
{rel}
faqs:
{faqs_block}
excerpt: >-
  {excerpt}
---
{intro}

> **Practica en el curso:** [Unidad {unit}](/curso-b1/unit-{unit})  
> **Antes:** {before}

---

## Qué aprenderás

{learn_block}

![{alt}]({image})

---

{sections}

---

## Tip del profesor

{tip}

---

## Practica ahora

1. Repasa los ejemplos en voz alta.  
2. Practica en la [Unidad {unit} del curso B1](/curso-b1/unit-{unit}).

Curso:

- {next_course}

Guía teórica siguiente:

- {next_blog}

Guías relacionadas:

{guides}

---

## Fuentes

- CEFR B1 · Cambridge B1 Preliminary · British Council — Passive & Reported speech
"""


AUDIOS = {
    16: {
        "is-installed": "The app is installed on my phone.",
        "are-sent": "Emails are sent automatically.",
        "was-repaired": "The laptop was repaired last week.",
        "were-deleted": "The files were deleted by mistake.",
        "was-designed": "The website was designed by a professional team.",
        "reading-tech": "Millions of photos are uploaded to the internet every day. New software was installed on my computer yesterday. Passwords are changed regularly for safety. The data were stored in the cloud last month. The device is manufactured in China and the Wi-Fi is connected to all devices in the office.",
        "dialogue-tech": "Is the update installed? Yes, it was installed this morning. Are the messages encrypted? Yes, they are encrypted for security. Was the laptop repaired? Yes, it was repaired last week.",
        "practice-four": "The app is installed. Emails are sent daily. The laptop was repaired. The files were deleted.",
    },
    17: {
        "must-be-completed": "The form must be completed before the interview.",
        "should-be-sent": "The report should be sent today.",
        "can-be-postponed": "The meeting can be postponed.",
        "might-be-cancelled": "The interview might be cancelled.",
        "must-be-signed": "The contract must be signed by Friday.",
        "reading-work": "Applications must be submitted before the deadline. The contract should be signed by Friday. Meetings can be held online with colleagues. The salary might be increased next year. Work experience should be included in your resume. The client must be informed about the delay.",
        "dialogue-work": "Should the report be finished today? Yes, it should be finished before the meeting. Can the interview be moved? It might be postponed until Monday. Must the form be completed online? Yes, it must be completed online.",
        "practice-four": "The form must be completed. The report should be sent. The meeting can be postponed. The interview might be cancelled.",
    },
    18: {
        "said-was-busy": "She said she was busy.",
        "said-would-call": "They said they would call me.",
        "said-had-left": "He said she had left.",
        "told-me-could": "She told me she could help.",
        "said-had-attached": "Sara said she had attached the file.",
        "reading-comm": "Tom said he would send the email that night. Sara said she had attached the file. My manager told me the meeting was cancelled. They said they could reply in the morning. He said the message had already been forwarded to the client.",
        "dialogue-comm": "What did Tom say? He said he would send the email tonight. And Sara? She said she had attached the file. Did the manager tell you anything? Yes, he told me the meeting was cancelled.",
        "practice-four": "She said she was busy. They said they would call. He said she had left. She told me she could help.",
    },
    19: {
        "asked-where": "He asked where I lived.",
        "asked-if": "She asked if I was ready.",
        "told-to-open": "She told me to open the file.",
        "told-not-to": "He told me not to be late.",
        "asked-how": "He asked how we pronounce that word.",
        "reading-lang": "The teacher asked if we had practised at home. She told us to translate the paragraph. He asked how we pronounce that word. They told us not to worry about mistakes. The tutor asked whether we understood the grammar.",
        "dialogue-lang": "What did the teacher ask? She asked if we had practised. What did she tell you to do? She told us to translate the paragraph. And the pronunciation? He asked how we pronounce that word.",
        "practice-four": "He asked where I lived. She asked if I was ready. She told me to open the file. He told me not to be late.",
    },
    20: {
        "review-passive": "The app is updated every week.",
        "review-modal": "The form must be completed.",
        "review-said": "She said she was busy.",
        "review-asked": "He asked if I was ready.",
        "review-told": "They told us to practise more.",
        "reading-mix": "The app is updated every week and the password must be changed regularly. Maya said she was busy but she told me she could help later. The teacher asked if we had practised and told us not to worry about mistakes. Files were uploaded to the cloud yesterday.",
        "dialogue-mix": "Is the software installed? Yes, it was installed yesterday. What did she say? She said she was busy. What did he ask? He asked if I was ready. What did they tell you? They told us to practise more.",
        "practice-mix": "The app is updated. The form must be completed. She said she was busy. He asked if I was ready. They told us to practise.",
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


def make_articles():
    write_md(
        "unidad-16-passive-voice-technology.md",
        article(
            slug="unidad-16-passive-voice-technology",
            unit=16,
            title="Passive Voice B1: present & past + Technology",
            description="Aprende la voz pasiva en inglés B1 (is/are/was/were + past participle) con vocabulario de tecnología. Guía Unidad 16 con audios.",
            image="/blog/curso-b1/unit-16/passive-voice.png",
            alt="Passive voice y technology B1",
            keywords=[
                "passive voice B1",
                "voz pasiva inglés",
                "is are was were past participle",
                "technology vocabulary English",
                "inglés B1 unidad 16",
            ],
            related=[
                "unidad-15-repaso-11-14",
                "unidad-17-modal-passive-work",
                "cursos-online-ingles-b1",
            ],
            faqs=[
                ("¿Qué es la voz pasiva?", "be + past participle. Presente: is/are + V3. Pasado: was/were + V3. El foco está en la acción o el objeto: The app is installed."),
                ("¿Cuándo uso by?", "Cuando quieres decir quién hace la acción: The website was designed by a professional team. Si no importa, omite by."),
                ("¿Active o passive?", "Active si el sujeto hace la acción. Passive si el sujeto recibe la acción o no sabes/no importa el agente."),
                ("¿Dónde practico?", "En la [Unidad 16 del curso B1](/curso-b1/unit-16)."),
            ],
            excerpt="Guía de la Unidad 16 del curso B1: passive voice y technology.",
            intro="Tras el [Repaso 11–14](/blog/curso-b1/unidad-15-repaso-11-14), la **Unidad 16** (*Passive Voice & Technology*) enseña a formar la **voz pasiva** en presente y pasado con vocabulario de **tecnología**.",
            before="[U15 — Repaso 11–14](/blog/curso-b1/unidad-15-repaso-11-14)",
            learn=[
                "Formar **is/are + past participle** y **was/were + past participle**",
                "Decidir cuándo usar pasiva (foco en la acción)",
                "Vocabulario: *app, device, upload, cloud, password…*",
            ],
            sections=r"""## 1. Mapa rápido

| Tiempo | Forma | Ejemplo |
| :--- | :--- | :--- |
| Present | **is / are + V3** | The app **is installed**. Emails **are sent**. |
| Past | **was / were + V3** | The laptop **was repaired**. Files **were deleted**. |
| Agente | **by + noun** | Designed **by** a team. |

---

## 2. Present passive

> The device **is manufactured** in China.  
> Emails **are sent** automatically.  
> Passwords **are changed** regularly.  
> Wi-Fi **is connected** to all devices.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-16/is-installed.mp3" title="🔊 is installed"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-16/are-sent.mp3" title="🔊 are sent"></audio>

---

## 3. Past passive

> New software **was installed** yesterday.  
> The laptop **was repaired** last week.  
> The files **were deleted** by mistake.  
> The website **was designed** by a professional team.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-16/was-repaired.mp3" title="🔊 was repaired"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-16/were-deleted.mp3" title="🔊 were deleted"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-16/was-designed.mp3" title="🔊 was designed"></audio>

---

## 4. Vocabulario: Technology

![Technology vocab](/blog/curso-b1/unit-16/tech-vocab.png)

| Word | Idea |
| :--- | :--- |
| smartphone / app / device | móvil / app / dispositivo |
| software / update / download / upload | software / actualización / descargar / subir |
| password / screen / connection / network | contraseña / pantalla / conexión / red |
| cloud / data / file / link | nube / datos / archivo / enlace |

---

## 5. Reading

![Tech scene](/blog/curso-b1/unit-16/tech-scene.png)

> Millions of photos are uploaded to the internet every day. New software was installed on my computer yesterday. Passwords are changed regularly for safety. The data were stored in the cloud last month. The device is manufactured in China and the Wi-Fi is connected to all devices in the office.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-16/reading-tech.mp3" title="🔊 Reading"></audio>

---

## 6. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-16/dialogue-tech.mp3" title="🔊 Dialogue"></audio>

> Is the update installed? — Yes, it was installed this morning.  
> Are the messages encrypted? — Yes, they are encrypted for security.  
> Was the laptop repaired? — Yes, it was repaired last week.

---

## 7. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-16/practice-four.mp3" title="🔊 Practice"></audio>

---

## 8. Ejercicios

1. Emails ___ sent automatically. (*are*)  
2. The laptop ___ repaired last week. (*was*)  
3. The files ___ deleted yesterday. (*were*)  
4. *Someone installs the app.* → The app ___ ___.  
5. Vocab: subir = ___ · nube = ___ · contraseña = ___

<details><summary>Ver solución</summary>

1. **are** · 2. **was** · 3. **were** · 4. **is installed** · 5. **upload** · **cloud** · **password**
</details>""",
            tip="Si no importa *quién* lo hace (o no lo sabes), usa **pasiva**. Si el agente es importante, añade *by…*.",
            next_course="[Unidad 17 — Modal passive](/curso-b1/unit-17)",
            next_blog="[U17 — Modal passive & Work](/blog/curso-b1/unidad-17-modal-passive-work)",
            related_guides=[
                "[U15 — Repaso 11–14](/blog/curso-b1/unidad-15-repaso-11-14)",
                "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)",
            ],
        ),
    )

    write_md(
        "unidad-17-modal-passive-work.md",
        article(
            slug="unidad-17-modal-passive-work",
            unit=17,
            title="Modal Passive B1: must/should/can be + Work & Jobs",
            description="Aprende la pasiva con modales en inglés B1 (must/should/can be + past participle) con vocabulario de trabajo. Guía Unidad 17 con audios.",
            image="/blog/curso-b1/unit-17/modal-passive.png",
            alt="Modal passive y work B1",
            keywords=[
                "modal passive B1",
                "must be done",
                "should be finished",
                "work jobs vocabulary",
                "inglés B1 unidad 17",
            ],
            related=[
                "unidad-16-passive-voice-technology",
                "unidad-18-reported-speech-statements",
                "cursos-online-ingles-b1",
            ],
            faqs=[
                ("¿Qué es el modal passive?", "modal + be + past participle: must be completed, should be sent, can be postponed."),
                ("¿must be o must to be?", "must **be** + V3. Nunca *must to be*."),
                ("¿Dónde practico?", "En la [Unidad 17 del curso B1](/curso-b1/unit-17)."),
                ("¿Qué vocabulario de trabajo?", "salary, interview, colleague, contract, deadline, promotion, resume…"),
            ],
            excerpt="Guía de la Unidad 17 del curso B1: modal passive y work & jobs.",
            intro="Tras la [pasiva present/past (U16)](/blog/curso-b1/unidad-16-passive-voice-technology), la **Unidad 17** añade **modales** a la pasiva en contextos de **trabajo**.",
            before="[U16 — Passive & Technology](/blog/curso-b1/unidad-16-passive-voice-technology)",
            learn=[
                "**must / should / can / might + be + V3**",
                "Hablar de obligaciones y posibilidades en pasiva",
                "Vocabulario: *salary, interview, colleague, deadline…*",
            ],
            sections=r"""## 1. Forma

| Modal | Passive | Ejemplo |
| :--- | :--- | :--- |
| must | **must be + V3** | The form **must be completed**. |
| should | **should be + V3** | The report **should be sent**. |
| can | **can be + V3** | The meeting **can be postponed**. |
| might | **might be + V3** | The interview **might be cancelled**. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-17/must-be-completed.mp3" title="🔊 must be"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-17/should-be-sent.mp3" title="🔊 should be"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-17/can-be-postponed.mp3" title="🔊 can be"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-17/might-be-cancelled.mp3" title="🔊 might be"></audio>

---

## 2. En el trabajo

> Applications **must be submitted** before the deadline.  
> The contract **should be signed** by Friday.  
> Meetings **can be held** online.  
> The salary **might be increased** next year.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-17/must-be-signed.mp3" title="🔊 must be signed"></audio>

---

## 3. Vocabulario: Work & jobs

![Work vocab](/blog/curso-b1/unit-17/work-vocab.png)

| Word | Idea |
| :--- | :--- |
| salary / contract / promotion | salario / contrato / ascenso |
| interview / application / resume | entrevista / solicitud / CV |
| colleague / boss / employee / client | compañero / jefe / empleado / cliente |
| meeting / deadline | reunión / fecha límite |

---

## 4. Reading

![Work scene](/blog/curso-b1/unit-17/work-scene.png)

> Applications must be submitted before the deadline. The contract should be signed by Friday. Meetings can be held online with colleagues. The salary might be increased next year. Work experience should be included in your resume. The client must be informed about the delay.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-17/reading-work.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-17/dialogue-work.mp3" title="🔊 Dialogue"></audio>

> Should the report be finished today? — Yes, before the meeting.  
> Can the interview be moved? — It might be postponed until Monday.  
> Must the form be completed online? — Yes, it must.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-17/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. The form ___ be completed. (*must*)  
2. The report ___ be sent today. (*should*)  
3. The meeting ___ be postponed. (*can*)  
4. *Must to be finished* → ___  
5. Vocab: fecha límite = ___ · compañero = ___ · CV = ___

<details><summary>Ver solución</summary>

1. **must** · 2. **should** · 3. **can** · 4. **must be finished** · 5. **deadline** · **colleague** · **resume**
</details>""",
            tip="Piensa primero el modal (obligación / consejo / posibilidad) y luego añade **be + V3**.",
            next_course="[Unidad 18 — Reported speech](/curso-b1/unit-18)",
            next_blog="[U18 — Reported statements](/blog/curso-b1/unidad-18-reported-speech-statements)",
            related_guides=[
                "[U16 — Passive](/blog/curso-b1/unidad-16-passive-voice-technology)",
                "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)",
            ],
        ),
    )

    write_md(
        "unidad-18-reported-speech-statements.md",
        article(
            slug="unidad-18-reported-speech-statements",
            unit=18,
            title="Reported Speech B1: statements (said/told) + Communication",
            description="Aprende reported speech de afirmaciones en inglés B1 (said/told + backshift) con vocabulario de comunicación. Guía Unidad 18 con audios.",
            image="/blog/curso-b1/unit-18/reported-statements.png",
            alt="Reported speech statements B1",
            keywords=[
                "reported speech B1",
                "said that told that",
                "backshift English",
                "communication vocabulary",
                "inglés B1 unidad 18",
            ],
            related=[
                "unidad-17-modal-passive-work",
                "unidad-19-reported-speech-questions",
                "cursos-online-ingles-b1",
            ],
            faqs=[
                ("¿Qué es reported speech?", "Contar lo que alguien dijo: She said (that) she was busy. Suele haber backshift de tiempos."),
                ("¿said o told?", "say (+ that). tell + persona: She told me (that)…"),
                ("¿Qué es backshift?", "Present→past, will→would, have→had, can→could, etc., cuando el verbo introductorio va en pasado."),
                ("¿Dónde practico?", "En la [Unidad 18 del curso B1](/curso-b1/unit-18)."),
            ],
            excerpt="Guía de la Unidad 18 del curso B1: reported speech (statements) y communication.",
            intro="Tras el [modal passive (U17)](/blog/curso-b1/unidad-17-modal-passive-work), la **Unidad 18** introduce el **estilo indirecto** de afirmaciones con vocabulario de **comunicación**.",
            before="[U17 — Modal passive](/blog/curso-b1/unidad-17-modal-passive-work)",
            learn=[
                "Usar **said (that)** y **told + object (that)**",
                "Aplicar **backshift** de tiempos",
                "Vocabulario: *email, message, attach, reply…*",
            ],
            sections=r"""## 1. Direct → Reported

| Direct | Reported |
| :--- | :--- |
| "I **am** busy." | She said she **was** busy. |
| "We **will** call you." | They said they **would** call me. |
| "She **has** left." | He said she **had** left. |
| "I **can** help." | She told me she **could** help. |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-18/said-was-busy.mp3" title="🔊 said was busy"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-18/said-would-call.mp3" title="🔊 would call"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-18/said-had-left.mp3" title="🔊 had left"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-18/told-me-could.mp3" title="🔊 told me"></audio>

---

## 2. Backshift rápido

| Direct | Reported |
| :--- | :--- |
| present simple | past simple |
| present continuous | past continuous |
| present perfect / past simple | past perfect |
| will | would |
| can | could |
| may | might |

---

## 3. Vocabulario: Communication

![Comm vocab](/blog/curso-b1/unit-18/comm-vocab.png)

| Word | Idea |
| :--- | :--- |
| message / email / text / chat | mensaje / email / texto / chat |
| reply / forward / attach / share | responder / reenviar / adjuntar / compartir |
| inbox / subject / notify / call | bandeja / asunto / notificar / llamar |

---

## 4. Reading

![Comm scene](/blog/curso-b1/unit-18/comm-scene.png)

> Tom said he would send the email that night. Sara said she had attached the file. My manager told me the meeting was cancelled. They said they could reply in the morning. He said the message had already been forwarded to the client.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-18/reading-comm.mp3" title="🔊 Reading"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-18/said-had-attached.mp3" title="🔊 attached"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-18/dialogue-comm.mp3" title="🔊 Dialogue"></audio>

> What did Tom say? — He said he would send the email tonight.  
> And Sara? — She said she had attached the file.  
> Did the manager tell you anything? — Yes, he told me the meeting was cancelled.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-18/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. "I am busy." → She said she ___ busy.  
2. "We will call." → They said they ___ call.  
3. "I can help." → She told me she ___ help.  
4. *She said me she was tired.* → ___  
5. Vocab: adjuntar = ___ · responder = ___ · asunto = ___

<details><summary>Ver solución</summary>

1. **was** · 2. **would** · 3. **could** · 4. She **told** me / She **said** (that)… · 5. **attach** · **reply** · **subject**
</details>""",
            tip="*tell* necesita persona (*told me*). *say* no: *said (that)*…",
            next_course="[Unidad 19 — Reported questions](/curso-b1/unit-19)",
            next_blog="[U19 — Questions & commands](/blog/curso-b1/unidad-19-reported-speech-questions)",
            related_guides=[
                "[U17 — Modal passive](/blog/curso-b1/unidad-17-modal-passive-work)",
                "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)",
            ],
        ),
    )

    write_md(
        "unidad-19-reported-speech-questions.md",
        article(
            slug="unidad-19-reported-speech-questions",
            unit=19,
            title="Reported Speech B1: questions & commands + Language",
            description="Aprende reported questions y commands en inglés B1 (asked if/wh-, told to) con vocabulario de idiomas. Guía Unidad 19 con audios.",
            image="/blog/curso-b1/unit-19/reported-questions.png",
            alt="Reported questions and commands B1",
            keywords=[
                "reported questions B1",
                "asked if whether",
                "told to infinitive",
                "language vocabulary English",
                "inglés B1 unidad 19",
            ],
            related=[
                "unidad-18-reported-speech-statements",
                "unidad-20-repaso-16-19",
                "cursos-online-ingles-b1",
            ],
            faqs=[
                ("¿Cómo reporto preguntas yes/no?", "ask + if/whether + clause: She asked if I was ready."),
                ("¿Y las wh- questions?", "ask + wh-word + clause (orden afirmativo): He asked where I lived. (no *where did I live*)"),
                ("¿Cómo reporto órdenes?", "tell/ask + object + to infinitive: She told me to open the file. Negativa: told me not to…"),
                ("¿Dónde practico?", "En la [Unidad 19 del curso B1](/curso-b1/unit-19)."),
            ],
            excerpt="Guía de la Unidad 19 del curso B1: reported questions/commands y language.",
            intro="Tras las [afirmaciones (U18)](/blog/curso-b1/unidad-18-reported-speech-statements), la **Unidad 19** cubre **preguntas y órdenes** en estilo indirecto, con vocabulario de **aprendizaje de idiomas**.",
            before="[U18 — Reported statements](/blog/curso-b1/unidad-18-reported-speech-statements)",
            learn=[
                "**asked if/whether** y **asked + wh-**",
                "**told/asked + to / not to**",
                "Vocabulario: *translate, pronounce, grammar, fluent…*",
            ],
            sections=r"""## 1. Reported questions

> “Where do you live?” → He **asked where** I lived.  
> “Are you ready?” → She **asked if/whether** I was ready.  
> “How do you pronounce that?” → He **asked how** we pronounce that word.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-19/asked-where.mp3" title="🔊 asked where"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-19/asked-if.mp3" title="🔊 asked if"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-19/asked-how.mp3" title="🔊 asked how"></audio>

Truco: en reported questions **no** uses orden de pregunta (*did/do*).

---

## 2. Commands & requests

> “Open the file.” → She **told me to open** the file.  
> “Don’t be late.” → He **told me not to be** late.  
> “Please practise.” → She **asked us to practise**.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-19/told-to-open.mp3" title="🔊 told to"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-19/told-not-to.mp3" title="🔊 not to"></audio>

---

## 3. Vocabulario: Language

![Lang vocab](/blog/curso-b1/unit-19/lang-vocab.png)

| Word | Idea |
| :--- | :--- |
| translate / pronounce / explain / repeat | traducir / pronunciar / explicar / repetir |
| grammar / vocabulary / phrase / meaning | gramática / vocabulario / frase / significado |
| fluent / accent / practice / mistake | fluido / acento / practicar / error |

---

## 4. Reading

![Lang scene](/blog/curso-b1/unit-19/lang-scene.png)

> The teacher asked if we had practised at home. She told us to translate the paragraph. He asked how we pronounce that word. They told us not to worry about mistakes. The tutor asked whether we understood the grammar.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-19/reading-lang.mp3" title="🔊 Reading"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-19/dialogue-lang.mp3" title="🔊 Dialogue"></audio>

> What did the teacher ask? — She asked if we had practised.  
> What did she tell you to do? — She told us to translate the paragraph.  
> And pronunciation? — He asked how we pronounce that word.

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-19/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

1. “Are you ready?” → She asked ___ I was ready.  
2. “Where do you live?” → He asked where I ___.  
3. “Open the file.” → She told me ___ open the file.  
4. “Don’t be late.” → He told me ___ ___ be late.  
5. Vocab: traducir = ___ · pronunciar = ___ · error = ___

<details><summary>Ver solución</summary>

1. **if/whether** · 2. **lived** · 3. **to** · 4. **not to** · 5. **translate** · **pronounce** · **mistake**
</details>""",
            tip="Pregunta reportada = **orden de frase afirmativa**. Orden = **to + infinitivo** (negativa: *not to*).",
            next_course="[Unidad 20 — Repaso 16–19](/curso-b1/unit-20)",
            next_blog="[U20 — Repaso 16–19](/blog/curso-b1/unidad-20-repaso-16-19)",
            related_guides=[
                "[U18 — Statements](/blog/curso-b1/unidad-18-reported-speech-statements)",
                "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)",
            ],
        ),
    )

    write_md(
        "unidad-20-repaso-16-19.md",
        article(
            slug="unidad-20-repaso-16-19",
            unit=20,
            title="Repaso Unidades 16–19 B1: Passive & Reported Speech",
            description="Repasa passive, modal passive y reported speech (statements, questions, commands) del curso B1. Guía Unidad 20 con audios y ejercicios.",
            image="/blog/curso-b1/unit-20/review-map.png",
            alt="Repaso passive y reported speech B1",
            keywords=[
                "repaso passive reported speech B1",
                "passive modal reported review",
                "inglés B1 unidad 20",
                "estilo indirecto repaso",
                "voz pasiva repaso B1",
            ],
            related=[
                "unidad-16-passive-voice-technology",
                "unidad-17-modal-passive-work",
                "unidad-18-reported-speech-statements",
                "unidad-19-reported-speech-questions",
                "cursos-online-ingles-b1",
            ],
            faqs=[
                ("¿Qué repasa esta unidad?", "Passive present/past (U16), modal passive (U17), reported statements (U18) y questions/commands (U19)."),
                ("¿Cómo elijo la estructura?", "¿Foco en la acción? → passive. ¿Modal + acción? → modal passive. ¿Contar lo dicho? → reported speech."),
                ("¿Dónde practico?", "En la [Unidad 20 del curso B1](/curso-b1/unit-20)."),
            ],
            excerpt="Guía de la Unidad 20 del curso B1: repaso 16–19.",
            intro="Antes de seguir el curso, la **Unidad 20** (*Review 16–19*) consolida **pasiva** y **estilo indirecto**.",
            before="[U19 — Questions & commands](/blog/curso-b1/unidad-19-reported-speech-questions)",
            learn=[
                "Mezclar passive + modal passive + reported speech",
                "Repasar vocab de technology, work, communication y language",
                "Autoevaluarte con ejercicios mixtos",
            ],
            sections=r"""## 1. Mapa rápido

![Review map](/blog/curso-b1/unit-20/review-map.png)

| Bloque | Forma | Ejemplo |
| :--- | :--- | :--- |
| Passive | be + V3 | The app **is updated**. |
| Modal passive | modal + be + V3 | It **must be completed**. |
| Statements | said/told + backshift | She **said** she **was** busy. |
| Questions | asked if / wh- | He **asked if** I was ready. |
| Commands | told + to / not to | They **told us to practise**. |

![Review examples](/blog/curso-b1/unit-20/review-examples.png)

<audio controls preload="none" src="/audio/blog/curso-b1/unit-20/review-passive.mp3" title="🔊 passive"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-20/review-modal.mp3" title="🔊 modal"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-20/review-said.mp3" title="🔊 said"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-20/review-asked.mp3" title="🔊 asked"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-20/review-told.mp3" title="🔊 told"></audio>

---

## 2. Checklist

- [ ] Present/past passive  
- [ ] must/should/can be + V3  
- [ ] said vs told me  
- [ ] asked if / asked where  
- [ ] told to / not to  

---

## 3. Reading mix

> The app is updated every week and the password must be changed regularly. Maya said she was busy but she told me she could help later. The teacher asked if we had practised and told us not to worry about mistakes. Files were uploaded to the cloud yesterday.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-20/reading-mix.mp3" title="🔊 Reading mix"></audio>

---

## 4. Diálogo mix

<audio controls preload="none" src="/audio/blog/curso-b1/unit-20/dialogue-mix.mp3" title="🔊 Dialogue mix"></audio>

> Is the software installed? — Yes, it was installed yesterday.  
> What did she say? — She said she was busy.  
> What did he ask? — He asked if I was ready.  
> What did they tell you? — They told us to practise more.

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-20/practice-mix.mp3" title="🔊 Practice"></audio>

---

## 6. Ejercicios

1. The app ___ updated every week. (*is*)  
2. The form ___ be completed. (*must*)  
3. She said she ___ busy. (*was*)  
4. He asked ___ I was ready. (*if*)  
5. They told us ___ practise. (*to*)  
6. *She said me she was tired.* → ___  
7. *Must to be finished* → ___  
8. “Don’t be late.” → He told me ___ ___ be late.

<details><summary>Ver solución</summary>

1. **is** · 2. **must** · 3. **was** · 4. **if** · 5. **to** · 6. She **told** me… / She **said**… · 7. **must be finished** · 8. **not to**
</details>""",
            tip="Clasifica primero (¿pasiva / modal / reported?) y después conjugas. El error suele ser de *tipo de estructura*.",
            next_course="[Unidad 21 — Gerund vs infinitive](/curso-b1/unit-21)",
            next_blog="Cuando publiquemos la Unidad 21, enlazaremos aquí.",
            related_guides=[
                "[U16 — Passive](/blog/curso-b1/unidad-16-passive-voice-technology)",
                "[U17 — Modal passive](/blog/curso-b1/unidad-17-modal-passive-work)",
                "[U18 — Statements](/blog/curso-b1/unidad-18-reported-speech-statements)",
                "[U19 — Questions](/blog/curso-b1/unidad-19-reported-speech-questions)",
                "[Inglés B1](/blog/metodos/cursos-online-ingles-b1)",
            ],
        ),
    )


def main():
    diagram_passive()
    diagram_tech_vocab()
    diagram_tech_scene()
    diagram_modal_passive()
    diagram_work_vocab()
    diagram_work_scene()
    diagram_reported_statements()
    diagram_comm_vocab()
    diagram_comm_scene()
    diagram_reported_questions()
    diagram_lang_vocab()
    diagram_lang_scene()
    diagram_review_map()
    diagram_review_examples()
    make_articles()
    make_audios()
    print("DONE U16–20 theory pack")


if __name__ == "__main__":
    main()
