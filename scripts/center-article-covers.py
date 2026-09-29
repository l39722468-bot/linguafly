#!/usr/bin/env python3
"""Centra el texto de las portadas de actualidad y del curso C1.

Las fotos de actualidad llevan el rótulo a la izquierda. Las portadas del C1
también. En la tarjeta el recorte deja ese texto desplazado. Este script
coloca el rótulo en el centro horizontal.
"""

from __future__ import annotations

import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
BLOG = ROOT / "public" / "blog"
C1_MD = ROOT / "src" / "content" / "blog" / "curso-c1"

FONT_BOLD = "/usr/share/fonts/truetype/macos/Inter-Bold.ttf"
FONT_REGULAR = "/usr/share/fonts/truetype/macos/Inter-Regular.ttf"

ACTUALIDAD = {
    "og-toefl-2026.jpg": ("TOEFL iBT 2026", "Nuevo formato y nota 1 a 6"),
    "og-oxford-cambridge-toefl.jpg": ("UNIVERSIDADES UK", "Oxford y Cambridge frente al TOEFL nuevo"),
    "og-a2-key-papel.jpg": ("A2 KEY PAPEL 2026", "Última convocatoria el 3 de diciembre"),
    "og-ielts-ordenador.jpg": ("IELTS 2026", "Solo ordenador y Writing on Paper"),
    "og-santander-plazas.jpg": ("PLAZAS GRATIS", "Santander y British Council 2026"),
    "og-cambridge-foto.jpg": ("CAMBRIDGE", "Foto fuera del certificado"),
    "og-certacles.jpg": ("CERTACLES DIGITAL", "Examen de inglés universitario"),
    "og-british-council-sedes.jpg": ("BRITISH COUNCIL", "Venta de sedes en Madrid y Barcelona"),
}


def center_banner_text(path: Path, title: str, subtitle: str) -> None:
    im = Image.open(path).convert("RGB")
    w, h = im.size
    px = im.load()
    core = {
        (x, y)
        for y in range(495, h - 2)
        for x in range(w)
        if min(px[x, y]) > 175 and sum(px[x, y]) > 540
    }
    if len(core) < 40:
        raise SystemExit(f"no banner text in {path}")
    mask = set()
    for x, y in core:
        for dy in range(-2, 3):
            for dx in range(-2, 3):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 490 <= ny < h:
                    mask.add((nx, ny))
    for x, y in mask:
        replacement = None
        for distance in range(1, 160):
            for nx in (x + distance, x - distance):
                if 0 <= nx < w and (nx, y) not in mask:
                    replacement = px[nx, y]
                    break
            if replacement:
                break
        if replacement is None:
            replacement = px[w - 1, y]
        px[x, y] = replacement

    draw = ImageDraw.Draw(im)
    title_font = ImageFont.truetype(FONT_BOLD, 42)
    sub_font = ImageFont.truetype(FONT_REGULAR, 24)
    draw.text((w / 2, 538), title, font=title_font, fill=(255, 255, 255), anchor="mm")
    draw.text((w / 2, 582), subtitle, font=sub_font, fill=(255, 255, 255), anchor="mm")
    im.save(path, quality=92, optimize=True)


def wrap_title(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = f"{current} {word}".strip()
        if draw.textlength(trial, font=font) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def render_c1_cover(title: str, unit: int, dest: Path) -> None:
    width, height = 1200, 630
    image = Image.new("RGBA", (width, height))
    draw = ImageDraw.Draw(image)
    for y in range(height):
        t = y / (height - 1)
        color = (
            int(23 + (12 - 23) * t),
            int(37 + (22 - 37) * t),
            int(84 + (58 - 84) * t),
        )
        draw.line([(0, y), (width, y)], fill=color + (255,))

    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    odraw.ellipse((40, 250, 280, 490), fill=(36, 58, 110, 160))
    odraw.ellipse((920, 250, 1160, 490), fill=(36, 58, 110, 160))
    image = Image.alpha_composite(image, overlay)
    draw = ImageDraw.Draw(image)

    title_font = ImageFont.truetype(FONT_BOLD, 46)
    for size in range(46, 31, -2):
        title_font = ImageFont.truetype(FONT_BOLD, size)
        lines = wrap_title(draw, title, title_font, 920)
        if len(lines) <= 3:
            break
    else:
        lines = wrap_title(draw, title, title_font, 920)[:3]

    badge_font = ImageFont.truetype(FONT_BOLD, 18)
    unit_font = ImageFont.truetype(FONT_BOLD, 26)
    tag_font = ImageFont.truetype(FONT_REGULAR, 20)

    badge = "LINGUAFLY · C1"
    unit_line = f"Unidad {unit} · Curso de inglés"
    tag_line = "Gramática, vocabulario y práctica guiada"

    badge_w = draw.textlength(badge, font=badge_font)
    badge_h = 36
    title_h = sum(int(title_font.size * 1.2) for _ in lines)
    block_h = badge_h + 28 + title_h + 22 + 32 + 8 + 26
    top = (height - block_h) / 2

    badge_box = (
        (width - badge_w) / 2 - 18,
        top,
        (width + badge_w) / 2 + 18,
        top + badge_h,
    )
    draw.rounded_rectangle(badge_box, radius=18, fill=(63, 107, 173, 255))
    draw.text((width / 2, top + badge_h / 2), badge, font=badge_font, fill="white", anchor="mm")

    y = top + badge_h + 28
    for line in lines:
        draw.text((width / 2, y), line, font=title_font, fill="white", anchor="ma")
        y += int(title_font.size * 1.2)
    y += 22
    draw.text((width / 2, y), unit_line, font=unit_font, fill=(147, 197, 253, 255), anchor="ma")
    y += 40
    draw.text((width / 2, y), tag_line, font=tag_font, fill=(203, 213, 225, 255), anchor="ma")

    dest.parent.mkdir(parents=True, exist_ok=True)
    image.convert("RGB").save(dest, "PNG", optimize=True)


def c1_articles() -> list[tuple[str, int, Path]]:
    found = []
    for path in sorted(C1_MD.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        title_match = re.search(r'^title:\s*"([^"]+)"', text, re.M)
        image_match = re.search(r"^image:\s*(\S+)", text, re.M)
        if not title_match or not image_match:
            raise SystemExit(f"missing title or image in {path.name}")
        image = image_match.group(1)
        unit_match = re.search(r"/unit-(\d+)/", image)
        if not unit_match:
            raise SystemExit(f"no unit in {image}")
        found.append((title_match.group(1), int(unit_match.group(1)), BLOG / image.removeprefix("/blog/")))
    return found


def main() -> None:
    for name, (title, subtitle) in ACTUALIDAD.items():
        center_banner_text(BLOG / name, title, subtitle)
        print("centered", name)
    articles = c1_articles()
    if len(articles) != 70:
        raise SystemExit(f"expected 70 C1 covers, got {len(articles)}")
    for title, unit, dest in articles:
        render_c1_cover(title, unit, dest)
    print(f"rewrote {len(articles)} C1 covers")


if __name__ == "__main__":
    main()
