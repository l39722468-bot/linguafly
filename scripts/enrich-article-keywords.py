#!/usr/bin/env python3
"""Enrich blog frontmatter keywords with topic + long-tail queries.

Idempotent. Skips articles that already meet the bar unless they still
carry generic filler terms. Does not add head queries reserved for hubs
(curso de inglés gratis / aprender inglés gratis).
"""

from __future__ import annotations

import re
import sys
import unicodedata
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1] / "src" / "content" / "blog"

ENGLISH_CATEGORIES = {
    "idiomas",
    "gramatica",
    "viajes",
    "trabajo",
    "examenes",
    "metodos",
    "habilidades",
    "curso-a1",
    "curso-a2",
    "curso-b1",
    "curso-b2",
    "curso-c1",
}

GENERIC_RE = re.compile(
    r"^(ejercicios de ingl[eé]s gratis|gram[aá]tica inglesa gratis|"
    r"ingl[eé]s de negocios gratis|ingl[eé]s para viajar gratis|"
    r"material de ingl[eé]s gratis|preparar ingl[eé]s gratis|"
    r"curso ingl[eé]s gratis online|practicar ingl[eé]s gratis|"
    r"frases en ingl[eé]s gratis|curso A[12] Linguafly|curso B[12] Linguafly|"
    r"curso C1 Linguafly)$",
    re.I,
)

FORBIDDEN = {
    "curso de inglés gratis",
    "aprender inglés gratis",
    "curso de inglés online gratis",
}

LEVEL = {
    "curso-a1": "A1",
    "curso-a2": "A2",
    "curso-b1": "B1",
    "curso-b2": "B2",
    "curso-c1": "C1",
}

UNIT_RE = re.compile(r"unidad-(\d+)")

# Topic phrases kept even if short; never keep bare words like "like" / "going".
SLUG_EXTRAS: dict[str, list[str]] = {
    "unidad-44-the-weather": [
        "what's the weather like",
        "it's going to rain",
        "sunny cloudy windy",
        "weather forecast English A2",
        "it is raining tomorrow",
        "degrees Celsius in English",
    ],
}


def fold_accents(text: str) -> str:
    return unicodedata.normalize("NFD", text).encode("ascii", "ignore").decode("ascii")


def clean_spaces(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip(" .,-")


def title_core(title: str) -> str:
    value = re.sub(r"[¿¡]", "", title)
    value = re.split(r"[?:—–|]", value, maxsplit=1)[0]
    value = re.sub(r"\s*\([^)]*\)\s*$", "", value)
    return clean_spaces(value)


def slug_topic(slug: str) -> str:
    value = re.sub(r"^unidad-\d+-", "", slug)
    value = re.sub(r"-ejercicios-soluciones$", "", value)
    value = re.sub(r"-(guia|review|completo|completa)$", "", value, flags=re.I)
    return clean_spaces(value.replace("-", " "))


def has_english(text: str) -> bool:
    return bool(re.search(r"ingl[eé]s", text, re.I))


def with_english(topic: str) -> str:
    return topic if has_english(topic) else f"{topic} en inglés"


def dedupe_consecutive(text: str) -> str:
    words = text.split()
    out: list[str] = []
    for word in words:
        if out and word.lower() == out[-1].lower():
            continue
        out.append(word)
    if len(out) >= 4 and [w.lower() for w in out[-2:]] == [w.lower() for w in out[-4:-2]]:
        out = out[:-2]
    return " ".join(out)


def tack(base: str, *bits: str) -> str:
    result = clean_spaces(base)
    for bit in bits:
        bit = clean_spaces(bit)
        if not bit:
            continue
        extra_core = re.sub(r"^(para|con|de|en|cómo|como|el|la|los|las)\s+", "", bit, flags=re.I)
        if extra_core.lower() in result.lower():
            continue
        if re.fullmatch(r"en ingl[eé]s", bit, re.I) and has_english(result):
            continue
        result = clean_spaces(f"{result} {bit}")
    return dedupe_consecutive(result)


def is_workbook(slug: str, title: str) -> bool:
    return slug.endswith("-ejercicios-soluciones") or bool(
        re.search(r"\bejercicios?\b", title, re.I)
    )


def yaml_quote(value: str) -> str:
    if re.search(r"""[:#{}[\],&*?|!<>=%@`'"]""", value) or value[:1] in "*-":
        return "'" + value.replace("'", "''") + "'"
    return value


def format_keywords_block(keywords: list[str]) -> str:
    lines = ["keywords:"]
    for item in keywords:
        lines.append(f"  - {yaml_quote(item)}")
    return "\n".join(lines) + "\n"


def flatten_keyword_item(item) -> list[str]:
    if item is None:
        return []
    if isinstance(item, dict):
        out: list[str] = []
        for key, value in item.items():
            if value in (None, True, False, ""):
                out.append(clean_spaces(str(key)))
            else:
                out.append(clean_spaces(f"{key}: {value}"))
        return [part for part in out if part]
    text = str(item).strip()
    if text.startswith("{") and ":" in text:
        # Dict leaked through str() — skip the repr, it is not a query.
        return []
    return [text] if text else []


def parse_keywords(raw) -> list[str]:
    if raw is None:
        return []
    if isinstance(raw, str):
        return [raw.strip()] if raw.strip() else []
    if isinstance(raw, list):
        out: list[str] = []
        for item in raw:
            out.extend(flatten_keyword_item(item))
        return out
    return flatten_keyword_item(raw)


def is_generic(value: str) -> bool:
    return bool(GENERIC_RE.match(value)) or value.lower() in FORBIDDEN


def is_low_quality(value: str) -> bool:
    words = [word.lower() for word in value.split()]
    if not words:
        return True
    if max(words.count(word) for word in set(words)) >= 3:
        return True
    if re.search(r"\b(\w+) \1\b", value, re.I):
        return True
    if re.search(r"c[oó]mo usar aprender", value, re.I):
        return True
    return False


def push(
    out: list[str],
    seen: set[str],
    value: str,
    *,
    min_len: int = 8,
    check_quality: bool = True,
) -> None:
    value = clean_spaces(value)
    if len(value) < min_len:
        return
    if is_generic(value):
        return
    if check_quality and is_low_quality(value):
        return
    key = value.lower()
    if key in seen or key in {item.lower() for item in FORBIDDEN}:
        return
    if len(value) > 90:
        value = value[:87].rstrip() + "…"
        key = value.lower()
        if key in seen:
            return
    seen.add(key)
    out.append(value)


def comparison_variants(title: str) -> list[str]:
    match = re.search(
        r"(.+?)\s+(?:vs\.?|versus)\s+(.+?)(?:\s*[:—–|].*)?$",
        title,
        re.I,
    )
    if not match:
        return []
    left, right = match.group(1).strip(), match.group(2).strip()
    left = re.sub(r"[¿?¡!]", "", left)
    if not left or not right:
        return []
    if left.lower() in {"diferencias", "diferencia", "uso", "usos", "ejemplos"}:
        return []
    if right.lower() in {"diferencias", "diferencia", "uso", "usos", "ejemplos"}:
        return []
    return [
        f"{left} vs {right}",
        f"{left} versus {right}",
        f"{left} or {right}",
        f"diferencia entre {left} y {right} en inglés",
    ]


def generate_longtails(title: str, slug: str, category: str, description: str = "") -> list[str]:
    out: list[str] = []
    seen: set[str] = set()
    core = title_core(title)
    topic = slug_topic(slug)
    level = LEVEL.get(category)
    workbook = is_workbook(slug, title)
    unit = UNIT_RE.search(slug)
    topic_en = with_english(topic)

    push(out, seen, core)
    if has_english(core):
        push(out, seen, fold_accents(core))
    for variant in comparison_variants(title):
        push(out, seen, variant)
    for extra in SLUG_EXTRAS.get(slug, []):
        push(out, seen, extra, min_len=3)

    if level:
        push(out, seen, tack(topic_en, level))
        push(out, seen, tack(topic, "inglés", level))
        if workbook:
            push(out, seen, tack("ejercicios de", topic, "en inglés", level))
            push(out, seen, tack(topic, "ejercicios con soluciones", level))
            push(out, seen, tack("práctica", topic, "inglés", level))
        else:
            push(out, seen, tack("cómo usar", topic, "en inglés", level))
            push(out, seen, tack("ejemplos de", topic, "en inglés", level))
            push(out, seen, tack(topic, "explicado para", level))
            push(out, seen, tack("vocabulario de", topic, "inglés", level))
        if unit:
            push(out, seen, tack("unidad", unit.group(1), topic, "inglés", level))
        push(out, seen, tack("inglés", level, topic, "con ejemplos"))
    elif category == "trabajo":
        push(out, seen, tack(topic_en, "para el trabajo"))
        push(out, seen, tack(topic_en, "profesional"))
        push(out, seen, tack(core, "con ejemplos"))
        push(out, seen, tack("frases de", topic, "profesional"))
        push(out, seen, tack("cómo escribir", topic_en))
        push(out, seen, fold_accents(tack(topic_en, "para trabajar")))
    elif category == "viajes":
        push(out, seen, tack(topic_en, "para viajar"))
        push(out, seen, tack("frases de", topic))
        if not re.search(r"viaj|hotel|aeropuerto", core, re.I):
            push(out, seen, tack(core, "para viajeros"))
        if not re.search(r"aeropuerto|hotel|restaurante", topic, re.I):
            push(out, seen, tack(topic, "aeropuerto hotel restaurante"))
        else:
            push(out, seen, tack("reservar", topic, "en inglés"))
        push(out, seen, fold_accents(tack(topic_en, "para viajar")))
    elif category == "metodos":
        push(out, seen, tack(core, "para aprender inglés"))
        push(out, seen, tack(core, "guía práctica"))
        if not re.search(r"aprender", core, re.I):
            push(out, seen, tack("cómo mejorar el inglés con", core))
        folded = fold_accents(core if has_english(core) else tack(core, "en inglés"))
        push(out, seen, folded)
    elif category == "habilidades":
        push(out, seen, tack(core, "paso a paso"))
        push(out, seen, tack(core, "con ejercicios"))
        push(out, seen, tack(core, "todos los días"))
        push(out, seen, fold_accents(core))
        push(out, seen, tack(core, "rutina semanal"))
    elif category == "gramatica":
        push(out, seen, topic_en)
        push(out, seen, fold_accents(topic_en))
        push(out, seen, tack("cuándo usar", topic, "en inglés"))
        push(out, seen, tack(topic, "con ejemplos para hispanohablantes"))
        push(out, seen, tack("ejercicios de", topic, "en inglés"))
        push(out, seen, tack(topic, "explicado en español"))
    elif category == "examenes":
        push(out, seen, tack(topic, "examen de inglés"))
        push(out, seen, tack(core, "España"))
        push(out, seen, tack("cómo preparar", topic, "en inglés"))
        push(out, seen, tack("precio y fechas", topic, "España"))
    elif category == "idiomas":
        push(out, seen, tack(core, "paso a paso"))
        push(out, seen, "cómo empezar a aprender un idioma desde cero")
        push(out, seen, "plan de 14 días para aprender idiomas")
        push(out, seen, "vocabulario activo vs pasivo en idiomas")
    else:
        push(out, seen, tack(topic, "guía práctica"))
        push(out, seen, tack(core, "con ejemplos"))

    if description:
        first = clean_spaces(description.split(".")[0])
        lowered = first.lower()
        if (
            24 <= len(first) <= 80
            and not lowered.startswith(("aprende", "descubre", "domina", "practica", "consulta"))
        ):
            push(out, seen, first)

    push(out, seen, tack(core, "con ejemplos prácticos"))
    push(out, seen, tack(core, "para hispanohablantes"))
    push(out, seen, tack(core, "explicado paso a paso"))
    push(out, seen, fold_accents(tack(core, "con ejemplos prácticos")))

    return out


def longtail_count(keywords: list[str]) -> int:
    return sum(1 for item in keywords if len(item.split()) >= 4)


def merge_keywords(existing: list[str], generated: list[str], title: str) -> list[str]:
    out: list[str] = []
    seen: set[str] = set()
    cleaned = [item for item in existing if item and not is_generic(item)]
    first = cleaned[0] if cleaned else title_core(title)
    push(out, seen, first, min_len=3, check_quality=False)
    if not out:
        push(out, seen, title_core(title), min_len=3, check_quality=False)

    for item in cleaned[1:]:
        if len(out) >= 10:
            break
        push(out, seen, item, min_len=3, check_quality=False)

    for item in generated:
        if len(out) >= 10:
            break
        push(out, seen, item)

    extra = [item for item in generated if len(item.split()) >= 4]
    for item in extra:
        if longtail_count(out) >= 4 and len(out) >= 6:
            break
        if len(out) >= 10:
            short_idxs = [i for i in range(1, len(out)) if len(out[i].split()) < 4]
            if not short_idxs:
                break
            shortest_i = min(short_idxs, key=lambda i: len(out[i]))
            seen.discard(out[shortest_i].lower())
            out.pop(shortest_i)
        push(out, seen, item)

    return out[:10]


def needs_enrichment(keywords: list[str]) -> bool:
    if len(keywords) < 6:
        return True
    if longtail_count(keywords) < 4:
        return True
    if any(is_generic(item) for item in keywords):
        return True
    return False


def replace_keywords_block(frontmatter: str, keywords: list[str]) -> str:
    block = format_keywords_block(keywords)
    lines = frontmatter.splitlines(keepends=True)
    start = next((i for i, line in enumerate(lines) if re.match(r"^keywords:", line)), None)
    if start is None:
        if frontmatter and not frontmatter.endswith("\n"):
            frontmatter += "\n"
        return frontmatter + block
    end = start + 1
    current = lines[start]
    if "[" in current and "]" in current:
        end = start + 1
    elif "[" in current:
        while end < len(lines) and "]" not in "".join(lines[start:end]):
            end += 1
        if end < len(lines) and "]" in lines[end]:
            end += 1
    else:
        while end < len(lines):
            line = lines[end]
            if line.startswith((" ", "\t")) or line.strip() == "" or re.match(r"^-\s+", line):
                end += 1
                continue
            break
    new_lines = lines[:start] + [block if block.endswith("\n") else block + "\n"] + lines[end:]
    text = "".join(new_lines)
    if not text.endswith("\n"):
        text += "\n"
    return text


def split_document(text: str) -> tuple[str | None, str, bool]:
    bom = text.startswith("\ufeff")
    body_text = text.lstrip("\ufeff")
    match = re.match(r"^---\r?\n(.*?)\r?\n---(\r?\n)?", body_text, re.S)
    if not match:
        return None, text, bom
    return match.group(1), body_text[match.end() :], bom


def extract_keywords_fallback(frontmatter: str) -> list[str]:
    dash = re.search(r"^keywords:\n((?:[ \t]+- .+\n)+)", frontmatter, re.M)
    if dash:
        items: list[str] = []
        for line in dash.group(1).splitlines():
            raw = re.sub(r"^\s+-\s+", "", line).strip().strip("'\"")
            items.extend(flatten_keyword_item(raw))
        return items
    flow = re.search(r"^keywords:\s*\[(.*)\]", frontmatter, re.S | re.M)
    if flow:
        return [part.strip().strip("'\"") for part in flow.group(1).split(",") if part.strip()]
    return []


def process_file(path: Path, write: bool) -> tuple[str, list[str], list[str]] | None:
    original = path.read_text(encoding="utf-8")
    frontmatter, body, bom = split_document(original)
    if frontmatter is None:
        return None
    try:
        data = yaml.safe_load(frontmatter) or {}
        existing = parse_keywords(data.get("keywords"))
        title = str(data.get("title") or path.stem)
        category = str(data.get("category") or path.parent.name)
        description = str(data.get("description") or data.get("excerpt") or "")
    except yaml.YAMLError:
        title_m = re.search(r"^title:\s*[>|-]?\s*['\"]?(.*)$", frontmatter, re.M)
        cat_m = re.search(r"^category:\s*['\"]?(.*)$", frontmatter, re.M)
        title = title_m.group(1).strip().strip("'\"") if title_m else path.stem
        category = cat_m.group(1).strip().strip("'\"") if cat_m else path.parent.name
        existing = extract_keywords_fallback(frontmatter)
        description = ""

    leftover_keywords = bool(re.search(r"^keywords:\n(?:[ \t]+- .+\n)+-\s", frontmatter, re.M))
    if not needs_enrichment(existing) and not leftover_keywords:
        return None

    generated = generate_longtails(title, path.stem, category, description)
    merged = merge_keywords(existing, generated, title)
    if merged == existing and not leftover_keywords:
        return None

    new_fm = replace_keywords_block(frontmatter, merged)
    new_text = f"---\n{new_fm.rstrip()}\n---\n{body}"
    if write and new_text != original.lstrip("\ufeff") and new_text != original:
        path.write_text(new_text, encoding="utf-8")
    elif write and bom and new_text != original:
        path.write_text(new_text, encoding="utf-8")
    return path.as_posix(), existing, merged


def audit_english_articles() -> int:
    failed: list[str] = []
    total = 0
    for path in sorted(ROOT.glob("**/*.md")):
        rel = path.relative_to(ROOT).as_posix()
        category = rel.split("/", 1)[0]
        if category not in ENGLISH_CATEGORIES:
            continue
        total += 1
        original = path.read_text(encoding="utf-8")
        frontmatter, _body, _bom = split_document(original)
        if frontmatter is None:
            failed.append(f"{rel}: missing frontmatter")
            continue
        try:
            data = yaml.safe_load(frontmatter) or {}
            keywords = parse_keywords(data.get("keywords"))
        except yaml.YAMLError:
            keywords = extract_keywords_fallback(frontmatter)
        if needs_enrichment(keywords):
            failed.append(
                f"{rel}: {len(keywords)} keywords, {longtail_count(keywords)} long-tails"
            )
    print(f"Audited {total} English articles; {len(failed)} below standard")
    for item in failed[:40]:
        print(" ", item)
    if len(failed) > 40:
        print(f"  … {len(failed) - 40} more")
    return 1 if failed else 0


def main() -> int:
    if "--audit" in sys.argv:
        return audit_english_articles()
    write = "--write" in sys.argv
    show = "--show" in sys.argv
    changed: list[tuple[str, list[str], list[str]]] = []
    for path in sorted(ROOT.glob("**/*.md")):
        rel = path.relative_to(ROOT).as_posix()
        category = rel.split("/", 1)[0]
        if category not in ENGLISH_CATEGORIES:
            continue
        result = process_file(path, write=write)
        if result:
            changed.append(result)
    print(f"{'Updated' if write else 'Would update'} {len(changed)} articles")
    preview = changed if show else changed[:25]
    for path, old, new in preview:
        rel = Path(path).relative_to(ROOT.parent.parent)
        print(f"  {rel}")
        if show:
            print(f"    old ({len(old)}): {old}")
            print(f"    new ({len(new)}, lt={longtail_count(new)}): {new}")
    if not show and len(changed) > 25:
        print(f"  … {len(changed) - 25} more")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
