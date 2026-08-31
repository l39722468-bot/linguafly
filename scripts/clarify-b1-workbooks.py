#!/usr/bin/env python3
"""Clarify vague/telegraphic B1 exercise workbooks (U1–60).

Keeps frontmatter, reading/listening texts, L1 grammar items and L2 vocab
pairs when they are usable. Rewrites unclear prompts (Find…, Open answers,
meta-quizzes, cryptic autochecks) into clear Spanish instructions.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOG = ROOT / "src/content/blog/curso-b1"
SKIP = {27}  # already hand-clarified


def split_fm(text: str) -> tuple[str, str]:
    if not text.startswith("---"):
        return "", text
    parts = text.split("---", 2)
    return parts[1], parts[2]


def section(body: str, start: str, end: str | None = None) -> str:
    pat = rf"(## {re.escape(start)}\n)(.*?)(?=\n## |\Z)"
    m = re.search(pat, body, re.S)
    return m.group(0) if m else ""


def replace_section(body: str, start: str, new_section: str) -> str:
    pat = rf"## {re.escape(start)}\n.*?(?=\n## |\Z)"
    if not re.search(pat, body, re.S):
        return body
    return re.sub(pat, new_section.rstrip() + "\n\n", body, count=1, flags=re.S)


def extract_blockquote(sec: str) -> str:
    m = re.search(r"^> (.+)$", sec, re.M)
    return m.group(1).strip() if m else ""


def extract_audio(sec: str) -> str:
    m = re.search(r"<audio[\s\S]*?</audio>", sec)
    return m.group(0) if m else ""


def extract_focus(body: str) -> str:
    m = re.search(r"## Lección 1 — Gramática\n\n\*\*Objetivo:\*\*\s*(.+)", body)
    return m.group(1).strip() if m else "el foco gramatical de la unidad"


def extract_vocab_objetivo(body: str) -> str:
    m = re.search(r"## Lección 2 — Vocabulario\n\n\*\*Objetivo:\*\*\s*(.+)", body)
    return m.group(1).strip() if m else "vocabulario de la unidad"


def extract_theory_slug(fm: str, stem: str) -> str:
    for line in fm.splitlines():
        s = line.strip().lstrip("- ").strip()
        if s.startswith("unidad-") and "ejercicios" not in s:
            return s
    return stem.replace("-ejercicios-soluciones", "")


def extract_unit_n(stem: str) -> int:
    return int(re.search(r"unidad-(\d+)", stem).group(1))


def parse_choice_items(block: str) -> list[tuple[str, str, str]]:
    """Return list of (prompt, options_raw, answer_bold_from_solution_later)."""
    items = []
    for m in re.finditer(
        r"^(\d+)\.\s+(.+?)\s*→\s*\*(.+?)\*\s*$", block, re.M
    ):
        items.append((m.group(2).strip(), m.group(3).strip(), ""))
    return items


def parse_solutions_bolds(details_block: str) -> list[str]:
    # "1. **both** · 2. **either**" or multiline
    text = re.sub(r"</?details>|</?summary>|Ver solución", "", details_block)
    bolds = re.findall(r"\*\*(.+?)\*\*", text)
    # Filter out noise
    return [b for b in bolds if b and b not in {"Ver solución"}]


def extract_vocab_words(l2: str) -> list[tuple[str, str]]:
    """English → Spanish from matching exercises."""
    pairs = []
    for m in re.finditer(
        r"^\d+\.\s+\*?\*?([A-Za-z][A-Za-z'’\-/ ]+?)\*?\*?\s*(?:≈|→)\s*\*(.+?)\*",
        l2,
        re.M,
    ):
        en = m.group(1).strip().strip("*")
        opts = [o.strip() for o in re.split(r"\s*·\s*|\s*/\s*", m.group(2))]
        if opts:
            pairs.append((en, opts[0]))
    return pairs[:8]


def clarify_l1(sec: str, focus: str) -> str:
    # Improve headers only; keep items
    sec = re.sub(
        r"### Ejercicios 1–5 — Completa\n\n",
        "### Ejercicios 1–5 — Completa\n\n"
        "Elige la opción correcta. Solo una es válida.\n\n",
        sec,
        count=1,
    )
    sec = re.sub(
        r"### Ejercicios 6–10 — Elige / completa\n\n",
        "### Ejercicios 6–10 — Elige / completa\n\n"
        "Completa cada frase con la forma correcta.\n\n",
        sec,
        count=1,
    )
    sec = re.sub(
        r"### Ejercicios 11–15 — Corrige\n\n",
        "### Ejercicios 11–15 — Corrige el error\n\n"
        "Cada frase tiene **un** error. Reescribe la frase correcta.\n\n",
        sec,
        count=1,
    )
    # Normalize objetivo line
    sec = re.sub(
        r"\*\*Objetivo:\*\*.+",
        f"**Objetivo:** practicar {focus}.",
        sec,
        count=1,
    )
    return sec


def clarify_l2(sec: str, focus: str, vocab_obj: str, theory: str, unit_n: int) -> str:
    pairs = extract_vocab_words(sec)
    # headers
    sec = re.sub(
        r"### Ejercicios 1–5 — Empareja / elige\n\n",
        "### Ejercicios 1–5 — Empareja / elige\n\n"
        "Elige la **traducción o significado correcto** (ignora las distracciones).\n\n",
        sec,
        count=1,
    )
    sec = re.sub(
        r"### Ejercicios 6–10 — Completa\n\n",
        "### Ejercicios 6–10 — Completa / significado\n\n"
        "Elige la opción que completa o explica mejor cada ítem.\n\n",
        sec,
        count=1,
    )
    sec = re.sub(
        r"\*\*Objetivo:\*\*.+",
        f"**Objetivo:** {vocab_obj}.",
        sec,
        count=1,
    )

    # Replace 11–15 block
    new_115 = build_l2_context(pairs, focus, theory, unit_n)
    sec = re.sub(
        r"### Ejercicios 11–15 — (?:En contexto|Elige)\n.*?(?=\n---|\Z)",
        new_115,
        sec,
        count=1,
        flags=re.S,
    )
    return sec.rstrip() + "\n"


def build_l2_context(
    pairs: list[tuple[str, str]], focus: str, theory: str, unit_n: int
) -> str:
    words = [p[0] for p in pairs] or ["choice", "option", "prefer", "decide", "alternative"]
    while len(words) < 5:
        words.append(words[len(words) % max(1, len(words))])
    w1, w2, w3, w4, w5 = words[:5]
    bank = " · ".join(f"*{w}*" for w in words[:5])
    return f"""### Ejercicios 11–15 — En contexto

Completa con una de estas palabras: {bank}

11. Write a short sentence with **{w1}** and the grammar focus (*{focus}*).  
12. Write a short sentence with **{w2}**.  
13. Write a short sentence with **{w3}**.  
14. Choose the best word for this idea: «{pairs[3][1] if len(pairs) > 3 else 'opción'}» → **{w4}** / other. Confirm in the [guía teórica](/blog/curso-b1/{theory}).  
15. Practise aloud, then continue in the [Unidad {unit_n} del curso](/curso-b1/unit-{unit_n}).

<details>
<summary>Ver solución</summary>

11. Modelo: usa **{w1}** en una frase natural con *{focus}*.  
12. Modelo: usa **{w2}** en una frase corta.  
13. Modelo: usa **{w3}** en una frase corta.  
14. **{w4}** (comprueba la tabla de vocabulario en la teoría).  
15. Continúa en **/curso-b1/unit-{unit_n}**.

</details>
"""


def sentences_from_text(text: str) -> list[str]:
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    return [p.strip() for p in parts if p.strip()]


def pick_blanks_from_text(text: str) -> list[tuple[str, str]]:
    """Create up to 5 (gapped_sentence, answer) from content words."""
    sents = sentences_from_text(text)
    out = []
    stop = {
        "a", "an", "the", "to", "of", "in", "on", "at", "for", "and", "or", "but",
        "i", "you", "he", "she", "we", "they", "it", "is", "are", "was", "were", "am",
        "be", "been", "being", "have", "has", "had", "do", "does", "did", "not",
        "isn't", "aren't", "wasn't", "weren't", "don't", "doesn't", "didn't",
        "can't", "won't", "shouldn't", "mustn't", "needn't", "there's", "there",
        "my", "his", "her", "our", "their", "your", "hi", "i'm", "im", "me", "him",
        "this", "that", "these", "those", "with", "from", "into", "about", "by",
    }
    used_answers: set[str] = set()
    for sent in sents:
        words = re.findall(r"[A-Za-z']+", sent)
        cands = [
            w
            for w in words
            if w.lower() not in stop and len(w) > 2 and w.lower() not in used_answers
        ]
        # Prefer longer lexical words (nouns/verbs/adjectives)
        cands.sort(key=lambda w: (-len(w), words.index(w) if w in words else 0))
        if not cands:
            continue
        ans = cands[0]
        gapped = re.sub(rf"\b{re.escape(ans)}\b", "___", sent, count=1)
        if "___" in gapped:
            out.append((gapped, ans))
            used_answers.add(ans.lower())
        if len(out) >= 5:
            break
    # Fallback: use distinctive words still unused
    if len(out) < 5:
        all_words = re.findall(r"[A-Za-z']+", text)
        for w in sorted(set(all_words), key=lambda x: -len(x)):
            if w.lower() in stop or w.lower() in used_answers or len(w) < 4:
                continue
            for sent in sents:
                if re.search(rf"\b{re.escape(w)}\b", sent):
                    gapped = re.sub(rf"\b{re.escape(w)}\b", "___", sent, count=1)
                    out.append((gapped, w))
                    used_answers.add(w.lower())
                    break
            if len(out) >= 5:
                break
    while len(out) < 5:
        out.append(("Complete from the text: ___", "—"))
    return out[:5]


def is_meta_comprehension(sec: str) -> bool:
    bad = [
        "Text matches",
        "unit theme",
        "reading-bridge",
        "Shadow-read",
        "only spelling",
        "Audio file is",
        "B1 short paragraph",
        "unit context",
    ]
    return any(b.lower() in sec.lower() for b in bad)


def clarify_l3(sec: str, focus: str, theory: str, unit_n: int, title: str) -> str:
    audio = extract_audio(sec)
    text = extract_blockquote(sec)
    if not text:
        return sec

    blanks = pick_blanks_from_text(text)
    sents = sentences_from_text(text)
    find_targets = []
    # Try to keep useful existing "Find X" answers from solutions
    for m in re.finditer(r"^\d+\.\s+Find (.+)$", sec, re.M):
        find_targets.append(m.group(1).strip())
    if not find_targets:
        # derive from focus keywords
        for token in re.findall(r"[A-Za-z']+", focus):
            if len(token) > 3 and token.lower() in text.lower():
                find_targets.append(token)
        find_targets = find_targets[:3] or ["the main grammar structure"]

    while len(find_targets) < 3:
        find_targets.append(find_targets[-1])

    # True/false common error from theory focus
    bad_form = invent_bad_form(focus)

    lines = [
        f"## Lección 3 — Reading: {title}",
        "",
        f"**Objetivo:** comprender un texto con *{focus}*.",
        "",
        "### Texto y audio",
        "",
    ]
    if audio:
        lines += [audio, ""]
    lines += [
        "Lee el texto (puedes escuchar el audio). Las respuestas salen **del texto**.",
        "",
        f"> {text}",
        "",
        "### Ejercicios 1–5 — Comprensión literal",
        "",
        "Completa con la palabra que falta (según el texto).",
        "",
    ]
    for i, (g, a) in enumerate(blanks, 1):
        lines.append(f"{i}. {g}")
    lines += [
        "",
        "<details>",
        "<summary>Ver solución</summary>",
        "",
        " · ".join(f"{i}. **{a}**" for i, (_, a) in enumerate(blanks, 1)),
        "",
        "</details>",
        "",
        "### Ejercicios 6–10 — Busca en el texto",
        "",
        "Responde con palabras o frases **copiadas del texto**.",
        "",
        f"6. ¿De qué trata el texto en una frase? (idea principal)",
        f"7. ¿Qué estructura gramatical practicas? → *{focus}*",
        f"8. Copia una frase (o trozo) con **{find_targets[0]}**.",
        f"9. Copia una frase (o trozo) con **{find_targets[1]}**.",
        f"10. Copia una frase (o trozo) con **{find_targets[2]}**.",
        "",
        "<details>",
        "<summary>Ver solución</summary>",
        "",
        f"6. Modelo: resume el texto en tus palabras (tema + *{focus}*).  ",
        f"7. **{focus}**  ",
        f"8. Copia del texto algo con *{find_targets[0]}* (ej.: «{sents[0] if sents else text[:80]}»).  ",
        f"9. Copia del texto algo con *{find_targets[1]}*.  ",
        f"10. Copia del texto algo con *{find_targets[2]}*.",
        "",
        "</details>",
        "",
        "### Ejercicios 11–15 — Forma y significado",
        "",
        f"11. Reescribe una frase del texto usando *{focus}*.  ",
        f"12. Nombra 2 palabras de vocabulario útiles del texto.  ",
        f"13. ¿Es correcto *{bad_form}*? → True / False. Si es False, corrígelo.  ",
        f"14. Enlace del curso: [/curso-b1/unit-{unit_n}](/curso-b1/unit-{unit_n})  ",
        f"15. Compara con la [guía teórica](/blog/curso-b1/{theory}) y marca 1 duda.",
        "",
        "<details>",
        "<summary>Ver solución</summary>",
        "",
        f"11. Modelo: toma una frase del texto y mantenla con *{focus}*.  ",
        f"12. Elige 2 palabras clave del texto (nombres, verbos o adjetivos).  ",
        f"13. **False** (corrige la forma típica de error con *{focus}*).  ",
        f"14. **/curso-b1/unit-{unit_n}**  ",
        f"15. Anota tu duda y revísala en la teoría.",
        "",
        "</details>",
        "",
    ]
    return "\n".join(lines)


def invent_bad_form(focus: str) -> str:
    f = focus.lower()
    if "neither" in f or "either" in f:
        return "Neither Tom or Maria wants to go"
    if "present perfect continuous" in f or "been +" in f or "been + -ing" in f:
        return "I am living here since 2020"
    if "past perfect" in f:
        return "When I arrived, she already left"
    if "passive" in f:
        return "The email sent yesterday"
    if "reported" in f:
        return "She said me she was busy"
    if "article" in f:
        return "We visited cathedral yesterday"
    if "reflexive" in f:
        return "I hurt me"
    if "quantifier" in f or "much" in f:
        return "There isn't many water"
    if "preposition" in f:
        return "interested on English"
    if "conditional" in f:
        return "If I will see her, I will call you"
    if "modal" in f:
        return "He must to be tired"
    if "gerund" in f or "infinitive" in f:
        return "I enjoy to swim"
    if "phrasal" in f:
        return "Turn off it"
    if "used to" in f:
        return "I am used to wake up early"
    return f"a wrong form with {focus}"


def clarify_l4(sec: str, focus: str, theory: str, unit_n: int, title: str) -> str:
    audio = extract_audio(sec)
    text = extract_blockquote(sec)
    if not text:
        return sec
    # speaker name
    sp = re.search(r"I am ([A-Z][a-z]+)", text)
    speaker = sp.group(1) if sp else "the speaker"
    blanks = pick_blanks_from_text(text)
    sents = sentences_from_text(text)

    lines = [
        f"## Lección 4 — Listening: {title}",
        "",
        f"**Objetivo:** escuchar *{focus}* en contexto.",
        "",
        "### Audio y guion",
        "",
    ]
    if audio:
        lines += [audio, ""]
    lines += [
        "Escucha primero **sin leer**. Luego puedes usar el guion para comprobar.",
        "",
        f"> {text}",
        "",
        "### Ejercicios 1–5 — Comprensión",
        "",
        f"1. ¿Quién habla?  ",
        f"2. Completa según el audio: {blanks[0][0]}  ",
        f"3. Completa: {blanks[1][0]}  ",
        f"4. Completa: {blanks[2][0]}  ",
        f"5. Completa: {blanks[3][0]}",
        "",
        "<details>",
        "<summary>Ver solución</summary>",
        "",
        f"1. **{speaker}**  ",
        f"2. **{blanks[0][1]}**  ",
        f"3. **{blanks[1][1]}**  ",
        f"4. **{blanks[2][1]}**  ",
        f"5. **{blanks[3][1]}**",
        "",
        "</details>",
        "",
        "### Ejercicios 6–10 — Detalles",
        "",
        f"6. Completa: {blanks[4][0]}  ",
        f"7. ¿Cuál es el foco gramatical del audio?  ",
        f"8. Copia una frase del guion con el foco gramatical.  ",
        f"9. Copia otra frase útil del guion.  ",
        f"10. Resume en una frase lo que dice {speaker}.",
        "",
        "<details>",
        "<summary>Ver solución</summary>",
        "",
        f"6. **{blanks[4][1]}**  ",
        f"7. **{focus}**  ",
        f"8. «{sents[1] if len(sents) > 1 else sents[0] if sents else text[:80]}»  ",
        f"9. «{sents[2] if len(sents) > 2 else sents[0] if sents else text[:80]}»  ",
        f"10. Modelo: {speaker} habla usando *{focus}* sobre el tema del audio.",
        "",
        "</details>",
        "",
        "### Ejercicios 11–15 — Práctica oral y forma",
        "",
        f"11. Escribe una frase nueva con *{focus}* (tema libre).  ",
        f"12. Di en voz alta 4–5 palabras clave del audio.  ",
        f"13. Escucha otra vez e imita (shadowing) una frase completa.  ",
        f"14. ¿Es correcto *{invent_bad_form(focus)}*? → True / False  ",
        f"15. Abre «Ver solución» solo cuando hayas intentado 11–14.",
        "",
        "<details>",
        "<summary>Ver solución</summary>",
        "",
        f"11. Modelo: crea una frase natural con *{focus}*.  ",
        f"12. Pronunciación libre — revisa la [guía teórica](/blog/curso-b1/{theory}).  ",
        f"13. Elige una frase del guion e imítala.  ",
        f"14. **False**  ",
        f"15. ✓",
        "",
        "</details>",
        "",
    ]
    return "\n".join(lines)


def clarify_l5(sec: str, focus: str, theory: str, unit_n: int) -> str:
    # Extract numbered prompts
    prompts = re.findall(r"^(\d+)\.\s+(.+)$", sec, re.M)
    # Keep prompts 1-15 if present; clarify solutions
    if len(prompts) < 10:
        return rewrite_l5_from_scratch(focus, theory, unit_n)

    # Clean prompt text slightly
    cleaned = []
    for num, text in prompts[:15]:
        t = text.strip()
        t = re.sub(r"Autochequeo:.*", "Autochequeo: marca sí/no si has usado bien el foco gramatical en tus frases.", t)
        t = re.sub(r"Open.*", t, t)  # keep
        if t.startswith("Escribe") or t.startswith("Completa") or t.startswith("Corrige") or t.startswith("Traduce") or t.startswith("Usa") or t.startswith("Explica") or t.startswith("Pregunta") or t.startswith("Mini") or t.startswith("Párrafo") or t.startswith("Autochequeo"):
            cleaned.append((num, t))
        else:
            cleaned.append((num, t))

    while len(cleaned) < 15:
        n = str(len(cleaned) + 1)
        cleaned.append((n, f"Escribe 1 frase más con *{focus}*." ))

    sol_lines = []
    for num, text in cleaned[:15]:
        low = text.lower()
        if text.startswith("Completa:"):
            sol_lines.append(f"{num}. Completa según la regla de *{focus}* (mira la teoría si dudas).")
        elif text.startswith("Corrige:"):
            m = re.search(r"\*(.+?)\*", text)
            bad = m.group(1) if m else invent_bad_form(focus)
            sol_lines.append(f"{num}. Corrige: *{bad}* → forma correcta con *{focus}*.")
        elif text.startswith("Traduce:"):
            sol_lines.append(f"{num}. Traduce al inglés usando *{focus}*.")
        elif "autochequeo" in low:
            sol_lines.append(
                f"{num}. Autochequeo: ¿puedes explicar *{focus}* con un ejemplo propio? Si no, repasa la [teoría](/blog/curso-b1/{theory})."
            )
        elif "mini" in low or "párrafo" in low or "diálogo" in low or "historia" in low or "diario" in low:
            sol_lines.append(f"{num}. Respuesta abierta — revisa que aparezca *{focus}*.")
        elif text.startswith("Explica"):
            sol_lines.append(f"{num}. Explicación breve en 1 frase (concepto clave de *{focus}*).")
        elif text.startswith("Escribe") or text.startswith("Usa") or text.startswith("Pregunta"):
            sol_lines.append(f"{num}. Modelo libre correcto con *{focus}*.")
        else:
            sol_lines.append(f"{num}. Modelo OK con *{focus}*.")

    lines = [
        "## Lección 5 — Writing",
        "",
        f"**Objetivo:** producir frases claras con *{focus}*.",
        "",
        "Escribe tus respuestas. Luego compara con las pistas de la solución.",
        "",
    ]
    for num, text in cleaned[:15]:
        lines.append(f"{num}. {text}")
    lines += [
        "",
        "<details>",
        "<summary>Ver solución</summary>",
        "",
        *sol_lines,
        "",
        "</details>",
        "",
    ]
    return "\n".join(lines)


def rewrite_l5_from_scratch(focus: str, theory: str, unit_n: int) -> str:
    return f"""## Lección 5 — Writing

**Objetivo:** producir frases claras con *{focus}*.

Escribe tus respuestas. Luego compara con las pistas.

1. Escribe 3 frases con *{focus}*.
2. Completa una frase típica de la unidad (usa la teoría si dudas).
3. Completa otra frase con el mismo foco.
4. Completa una tercera frase.
5. Completa una cuarta frase.
6. Corrige: *{invent_bad_form(focus)}*
7. Corrige otro error típico de hispanohablantes con *{focus}*.
8. Usa 2 palabras de vocabulario de la unidad en frases con el foco gramatical.
9. Escribe una frase modelo larga (12+ palabras) con *{focus}*.
10. Mini-texto o diálogo (4–6 líneas) usando el foco.
11. Traduce al inglés una frase tuya relacionada con la unidad.
12. Traduce otra frase.
13. Explica el foco gramatical en 1 frase (en español).
14. Escribe 1 ejemplo más personalizado.
15. Autochequeo: ¿puedes explicar *{focus}* con un ejemplo propio? Si no, repasa la [teoría](/blog/curso-b1/{theory}) y el [curso](/curso-b1/unit-{unit_n}).

<details>
<summary>Ver solución</summary>

1–5. Modelos libres correctos con *{focus}*.  
6–7. Corrige la forma errónea típica.  
8–10. Respuestas abiertas — debe aparecer *{focus}*.  
11–12. Traducciones naturales.  
13. Explicación breve del concepto.  
14. Ejemplo personal.  
15. Autochequeo personal.

</details>
"""


def reading_title(body: str) -> str:
    m = re.search(r"## Lección 3 — Reading: (.+)", body)
    return m.group(1).strip() if m else "Reading"


def listening_title(body: str) -> str:
    m = re.search(r"## Lección 4 — Listening: (.+)", body)
    return m.group(1).strip() if m else "Listening"


def process_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    fm, body = split_fm(text)
    n = extract_unit_n(path.stem)
    if n in SKIP:
        return False

    focus = extract_focus(body)
    vocab_obj = extract_vocab_objetivo(body)
    theory = extract_theory_slug(fm, path.stem)
    r_title = reading_title(body)
    l_title = listening_title(body)

    l1 = section(body, "Lección 1 — Gramática")
    l2 = section(body, "Lección 2 — Vocabulario")
    l3 = section(body, f"Lección 3 — Reading: {r_title}")
    if not l3:
        # fallback any Lección 3
        m = re.search(r"(## Lección 3 — Reading: .+?\n)(.*?)(?=\n## |\Z)", body, re.S)
        if m:
            r_title = m.group(1).replace("## Lección 3 — Reading: ", "").strip()
            l3 = m.group(0)
    l4 = section(body, f"Lección 4 — Listening: {l_title}")
    if not l4:
        m = re.search(r"(## Lección 4 — Listening: .+?\n)(.*?)(?=\n## |\Z)", body, re.S)
        if m:
            l_title = m.group(1).replace("## Lección 4 — Listening: ", "").strip()
            l4 = m.group(0)
    l5 = section(body, "Lección 5 — Writing")

    if l1:
        body = replace_section(body, "Lección 1 — Gramática", clarify_l1(l1, focus))
    if l2:
        body = replace_section(
            body,
            "Lección 2 — Vocabulario",
            clarify_l2(l2, focus, vocab_obj, theory, n),
        )
    if l3:
        body = replace_section(
            body,
            f"Lección 3 — Reading: {r_title}",
            clarify_l3(l3, focus, theory, n, r_title),
        )
    if l4:
        body = replace_section(
            body,
            f"Lección 4 — Listening: {l_title}",
            clarify_l4(l4, focus, theory, n, l_title),
        )
    if l5:
        body = replace_section(
            body,
            "Lección 5 — Writing",
            clarify_l5(l5, focus, theory, n),
        )

    # Intro reminder box if missing
    if "**Recuerda antes de empezar:**" not in body:
        body = body.replace(
            "Haz cada bloque **sin mirar** la solución. Luego comprueba y lee la explicación.\n",
            "Haz cada bloque **sin mirar** la solución. Luego comprueba y lee la explicación.\n\n"
            f"**Foco de esta unidad:** *{focus}*. Si dudas, abre primero la [guía teórica](/blog/curso-b1/{theory}).\n",
            1,
        )

    # updatedDate
    if "updatedDate:" in fm:
        fm = re.sub(r"updatedDate:.*", "updatedDate: '2026-08-31'", fm)
    else:
        fm = "updatedDate: '2026-08-31'\n" + fm

    new_text = f"---{fm}---{body}"
    # normalize excessive blank lines
    new_text = re.sub(r"\n{4,}", "\n\n\n", new_text)
    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        return True
    return False


def main() -> None:
    files = sorted(
        BLOG.glob("unidad-*-ejercicios-soluciones.md"),
        key=lambda p: extract_unit_n(p.stem),
    )
    changed = []
    for p in files:
        if process_file(p):
            changed.append(p.name)
            print("clarified", p.name)
        else:
            print("skip", p.name)
    print(f"done changed={len(changed)}/{len(files)}")


if __name__ == "__main__":
    main()
