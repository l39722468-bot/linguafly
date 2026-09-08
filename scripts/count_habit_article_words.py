#!/usr/bin/env python3
"""Count body words in published alimentación / entrenamiento articles."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIRS = [
    ROOT / "src/content/blog/alimentacion",
    ROOT / "src/content/blog/entrenamiento",
]
MIN_WORDS = 2000
TARGET = 2000


def body_words(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    parts = re.split(r"^---\s*$", text, maxsplit=2, flags=re.M)
    if len(parts) < 3:
        raise SystemExit(f"{path}: missing frontmatter")
    return len(re.findall(r"\w+", parts[2], flags=re.UNICODE))


def main() -> int:
    rows: list[tuple[int, Path]] = []
    failed = False
    for folder in DIRS:
        for path in sorted(folder.glob("*.md")):
            n = body_words(path)
            rows.append((n, path))
            if n < MIN_WORDS:
                failed = True
    for n, path in rows:
        flag = "OK" if n >= MIN_WORDS else "CORTO"
        print(f"{flag:5} {n:5}  {path.relative_to(ROOT)}  (objetivo {TARGET})")
    if failed:
        print(f"\nFallo: el cuerpo debe tener al menos {MIN_WORDS} palabras.", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
