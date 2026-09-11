#!/usr/bin/env python3
"""Add H3 subsections and weave frontmatter keywords into article bodies.

- Articles that only had H2 get H3 (demote extra H2s; keep ~1–3 H2).
- Missing keywords are written into the intro in natural Spanish/English prose.
"""

from __future__ import annotations

import argparse
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "src" / "content" / "blog"

TAIL_H2 = re.compile(
    r"fuentes|cierre\b|preguntas frecuentes|\bfaqs?\b|"
    r"practica en el curso|errores habituales|errores y qu[eé]",
    re.I,
)

BOLD_LEAD = re.compile(
    r"(?m)^(\*\*([^*]{6,72})\.\*\*)(\s+)(\S)"
)


def fold(value: str) -> str:
    text = unicodedata.normalize("NFD", value.lower())
    text = "".join(ch for ch in text if unicodedata.category(ch) != "Mn")
    text = re.sub(r"[^a-z0-9ñ\s]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def split_fm(text: str) -> tuple[str, str, str]:
    if not text.startswith("---"):
        return "", "", text
    end = text.find("\n---", 3)
    if end < 0:
        return "", "", text
    opener = text[:4]  # ---\n
    fm = text[4:end]
    rest = text[end:]  # \n---\n body
    return opener, fm, rest


def parse_keywords(fm: str) -> list[str]:
    match = re.search(r"(?ms)^keywords:\n((?:  - .+\n)+)", fm)
    if not match:
        return []
    out: list[str] = []
    for line in match.group(1).splitlines():
        raw = re.sub(r"^  - ", "", line).strip().strip("'\"")
        if raw:
            out.append(raw)
    return out


def parse_title(fm: str) -> str:
    match = re.search(r'(?m)^title:\s*[\'"]?(.+?)[\'"]?\s*$', fm)
    return match.group(1).strip() if match else ""


def body_from_rest(rest: str) -> str:
    # rest is \n---\n<body> or ---\n<body>
    return re.sub(r"^\n?---\n", "", rest, count=1)


def pack_rest(body: str) -> str:
    return "\n---\n\n" + body.lstrip("\n")


def keyword_coverage(keywords: list[str], text: str) -> tuple[list[str], list[str]]:
    folded_body = fold(text)
    found: list[str] = []
    missing: list[str] = []
    for keyword in keywords:
        key = fold(keyword)
        if len(key) < 4:
            continue
        if key in folded_body:
            found.append(keyword)
        else:
            missing.append(keyword)
    return found, missing


def is_tail_h2(line: str) -> bool:
    title = re.sub(r"^##\s+", "", line).strip()
    return bool(TAIL_H2.search(title))


def demote_extra_h2(body: str) -> str:
    """Keep the first topical H2 plus closing H2s; turn the rest into H3."""
    if re.search(r"(?m)^### ", body):
        return body
    lines = body.split("\n")
    h2_idx = [i for i, line in enumerate(lines) if re.match(r"^## ", line)]
    if len(h2_idx) < 2:
        return body
    body_idx = [i for i in h2_idx if not is_tail_h2(lines[i])]
    if not body_idx:
        return body
    error_heads = [i for i in body_idx if re.match(r"^## Error \d", lines[i])]
    if error_heads and error_heads == body_idx[: len(error_heads)]:
        lines[error_heads[0]] = re.sub(r"^## ", "### ", lines[error_heads[0]])
        for i in error_heads[1:]:
            lines[i] = re.sub(r"^## ", "### ", lines[i])
        lines.insert(error_heads[0], "## Errores frecuentes")
        lines.insert(error_heads[0] + 1, "")
        return "\n".join(lines)
    demote = set(body_idx[1:])
    if not demote:
        return body
    for i in demote:
        lines[i] = "###" + lines[i][2:]
    return "\n".join(lines)


def convert_bold_leads(body: str, limit: int = 8) -> str:
    """Turn `**Label.** rest` paragraph leads into H3 when the article still lacks H3."""
    if len(re.findall(r"(?m)^### ", body)) >= 2:
        return body
    converted = 0

    def repl(match: re.Match[str]) -> str:
        nonlocal converted
        if converted >= limit:
            return match.group(0)
        label = match.group(2).strip()
        if re.search(r"https?://|:\/\/", label):
            return match.group(0)
        converted += 1
        rest = match.group(4)
        return f"### {label}\n\n{rest}"

    return BOLD_LEAD.sub(repl, body)


def pick_keywords(missing: list[str], title: str, limit: int = 3) -> list[str]:
    title_fold = fold(title)
    picks: list[str] = []
    for keyword in missing:
        key = fold(keyword)
        if key == title_fold:
            continue
        if any(key in fold(prev) or fold(prev) in key for prev in picks):
            continue
        picks.append(keyword)
        if len(picks) >= limit:
            break
    return picks


def weave_paragraph(picks: list[str]) -> str:
    bold = [f"**{item}**" for item in picks]
    if len(bold) == 1:
        return (
            f"Si llegas con la consulta {bold[0]}, el desarrollo está en los "
            "apartados siguientes, con ejemplos y el uso real, no como etiqueta suelta.\n"
        )
    if len(bold) == 2:
        return (
            f"Quien busca {bold[0]} o {bold[1]} está en el texto: cada apartado "
            "lo explica en contexto, dentro de la frase o del ejemplo.\n"
        )
    return (
        f"Consultas como {bold[0]}, {bold[1]} o {bold[2]} se responden aquí en "
        "prosa: el término aparece donde toca, no en una lista al pie.\n"
    )


def insert_intro_paragraph(body: str, paragraph: str) -> str:
    if paragraph.strip() in body:
        return body
    match = re.search(r"(?m)^## ", body)
    if match and match.start() > 40:
        return body[: match.start()] + paragraph + "\n" + body[match.start() :]
    # No intro: place after the first heading block's first paragraph.
    heading = re.search(r"(?m)^## .+\n", body)
    if not heading:
        return paragraph + "\n" + body.lstrip()
    after = heading.end()
    next_blank = body.find("\n\n", after)
    if next_blank == -1:
        return body[:after] + "\n" + paragraph + body[after:]
    return body[: next_blank + 2] + paragraph + "\n" + body[next_blank + 2 :]


def process_body(body: str, title: str, keywords: list[str]) -> tuple[str, dict[str, int]]:
    stats = {"h3_added": 0, "keywords_woven": 0}
    before_h3 = len(re.findall(r"(?m)^### ", body))
    body = demote_extra_h2(body)
    body = convert_bold_leads(body)
    after_h3 = len(re.findall(r"(?m)^### ", body))
    stats["h3_added"] = max(0, after_h3 - before_h3)

    found, missing = keyword_coverage(keywords, body)
    if len(found) < 3 and missing:
        picks = pick_keywords(missing, title, limit=3 - len(found) if len(found) else 3)
        picks = picks or missing[:3]
        if picks:
            body = insert_intro_paragraph(body, weave_paragraph(picks))
            stats["keywords_woven"] = len(picks)
    return body, stats


def process_file(path: Path, write: bool) -> dict[str, int] | None:
    raw = path.read_text(encoding="utf-8")
    opener, fm, rest = split_fm(raw)
    if not fm:
        return None
    body = body_from_rest(rest)
    title = parse_title(fm)
    keywords = parse_keywords(fm)
    new_body, stats = process_body(body, title, keywords)
    if new_body == body:
        return {"changed": 0, **stats}
    if write:
        path.write_text(opener + fm + pack_rest(new_body), encoding="utf-8")
    stats["changed"] = 1
    return stats


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()

    files = sorted(ROOT.rglob("*.md"))
    totals = {"changed": 0, "h3_added": 0, "keywords_woven": 0, "files": 0}
    for path in files:
        result = process_file(path, write=args.write)
        if not result:
            continue
        totals["files"] += 1
        totals["changed"] += result.get("changed", 0)
        totals["h3_added"] += result["h3_added"]
        totals["keywords_woven"] += result["keywords_woven"]
        if args.limit and totals["changed"] >= args.limit:
            break
    print(
        f"[h3-keywords] files={totals['files']} changed={totals['changed']} "
        f"h3_added={totals['h3_added']} keywords_woven={totals['keywords_woven']}"
    )


if __name__ == "__main__":
    main()
