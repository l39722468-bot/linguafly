#!/usr/bin/env python3
"""Build the 500-article inteligencia-artificial catalog. Fail on SERP collisions."""
from __future__ import annotations

import json
import re
import unicodedata
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"

CLUSTERS = {
    "nucleo": 4,
    "empezar": 28,
    "prompts": 40,
    "chat-diario": 32,
    "herramientas": 24,
    "oficina": 36,
    "codigo": 28,
    "estudio": 28,
    "escritura": 28,
    "imagen": 24,
    "audio": 16,
    "investigacion": 20,
    "privacidad": 24,
    "limites": 24,
    "negocio": 24,
    "docentes": 16,
    "regulado": 16,
    "automatizar": 20,
    "local": 16,
    "idioma-ia": 20,
    "hogar": 20,
    "etica": 12,
}

PADS = (
    " Guía práctica de unas 2.000 palabras.",
    " Pasos y errores habituales. Unas 2.000 palabras.",
    " Criterio claro, sin humo. Unas 2.000 palabras.",
    " Ejemplos en español. Unas 2.000 palabras.",
    " Qué hacer hoy. Unas 2.000 palabras.",
)


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text)
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text[:80]


def intent_key(text: str) -> str:
    return "-".join(sorted(slugify(text).split("-")))


def fit_desc(lead: str, idx: int, slug: str = "") -> str:
    lead = " ".join(lead.split()).rstrip(".")
    pads = PADS + (
        " Sin jerga de marketing. Unas 2.000 palabras.",
        " Para un adulto hispanohablante. Unas 2.000 palabras.",
        " Con ejemplos y límites. Unas 2.000 palabras.",
    )
    fillers = (
        "",
        " Para usar hoy.",
        " Incluye pasos, límites y un ejemplo.",
        " Incluye pasos, límites y errores habituales.",
        f" Sobre {slug.replace('-', ' ')}." if slug else "",
    )
    start = idx % len(pads)
    ordered = pads[start:] + pads[:start]
    candidates: list[str] = []
    for pad in ordered:
        for filler in fillers:
            candidates.append(f"{lead}.{filler}{pad}")
    for text in candidates:
        text = " ".join(text.split())
        if 140 <= len(text) <= 160:
            return text
        if len(text) <= 160:
            continue
        for pad in ordered:
            if text.endswith(pad):
                budget = 160 - len(pad)
                core = text[: -len(pad)].rstrip()
                while len(core) > budget and " " in core:
                    core = core.rsplit(" ", 1)[0]
                fitted = " ".join((core.rstrip(".") + "." + pad).split())
                if 140 <= len(fitted) <= 160:
                    return fitted
    raise ValueError(f"could not fit description for {slug or lead!r}")


def keywords_for(intent: str, hand: tuple[str, ...]) -> list[str]:
    out: list[str] = [intent]
    for item in hand:
        item = " ".join(item.split())
        if item and item.lower() not in {x.lower() for x in out}:
            out.append(item)
    fillers = (
        f"{intent} para principiantes",
        f"{intent} paso a paso",
        f"{intent} errores habituales",
        f"{intent} ejemplos prácticos",
        f"{intent} guía clara",
    )
    for item in fillers:
        if len(out) >= 7:
            break
        if item.lower() not in {x.lower() for x in out}:
            out.append(item)
    if not (6 <= len(out) <= 8):
        raise ValueError(f"keywords {len(out)} for {intent!r}: {out}")
    return out


def row(
    cluster: str,
    title: str,
    intent: str,
    kind: str,
    longtails: tuple[str, ...],
    lead: str,
    slug: str | None = None,
) -> dict:
    return {
        "cluster": cluster,
        "slug": slug or slugify(title),
        "title": title,
        "intent": intent,
        "kind": kind,
        "longtails": list(longtails),
        "lead": lead,
        "status": "pendiente",
    }


def add(items: list[dict], cluster: str, rows: list[tuple]) -> None:
    for entry in rows:
        title, intent, kind, longtails, lead = entry[:5]
        slug = entry[5] if len(entry) > 5 else None
        items.append(row(cluster, title, intent, kind, longtails, lead, slug))


def catalog() -> list[dict]:
    items: list[dict] = []

    add(
        items,
        "nucleo",
        [
            (
                "Qué es la inteligencia artificial (sin ciencia ficción)",
                "qué es la inteligencia artificial",
                "informacional",
                (
                    "inteligencia artificial para principiantes",
                    "ia explicada de forma sencilla",
                    "diferencia entre ia y chatbot",
                    "para qué sirve la ia en el día a día",
                    "qué no es la inteligencia artificial",
                    "ia generativa qué significa",
                ),
                "Qué es la inteligencia artificial en la práctica: para qué sirve, qué no hace y cómo usarla el primer día",
            ),
            (
                "Cómo usar un chatbot de IA por primera vez",
                "cómo usar un chatbot de IA",
                "cómo hacer",
                (
                    "primeros pasos con un chatbot",
                    "cómo hablar con una inteligencia artificial",
                    "chatbot de ia para principiantes",
                    "qué preguntar a un chatbot la primera vez",
                    "usar chatgpt si nunca lo has hecho",
                    "sesión cero con inteligencia artificial",
                ),
                "Primera sesión con un chatbot: qué pedirle, cómo leer la respuesta y cuándo no fiarte",
            ),
            (
                "Cómo escribir un prompt que sirva",
                "cómo escribir un prompt",
                "cómo hacer",
                (
                    "qué es un prompt de ia",
                    "estructura de un buen prompt",
                    "prompt para chatgpt principiantes",
                    "cómo pedir algo a una ia",
                    "instrucciones claras para un chatbot",
                    "prompt corto que funciona",
                ),
                "Cómo escribir un prompt útil: tarea, contexto, formato y un ejemplo. Sin plantillas de 40 líneas",
            ),
            (
                "Privacidad al usar IA: qué no pegar nunca",
                "privacidad al usar inteligencia artificial",
                "cómo hacer",
                (
                    "qué datos no subir a chatgpt",
                    "privacidad chatbots de ia",
                    "rgpd y chatbots para particulares",
                    "información sensible en inteligencia artificial",
                    "riesgos de pegar textos en ia",
                    "datos personales y chatgpt",
                ),
                "Qué no pegar en un chatbot: datos personales, secretos de trabajo y la regla corta que basta",
                "privacidad-al-usar-ia-que-no-pegar-nunca",
            ),
        ],
    )

    add(items, "empezar", EMPEZAR)
    add(items, "prompts", PROMPTS)
    add(items, "chat-diario", CHAT_DIARIO)
    add(items, "herramientas", HERRAMIENTAS)
    add(items, "oficina", OFICINA)
    add(items, "codigo", CODIGO)
    add(items, "estudio", ESTUDIO)
    add(items, "escritura", ESCRITURA)
    add(items, "imagen", IMAGEN)
    add(items, "audio", AUDIO)
    add(items, "investigacion", INVESTIGACION)
    add(items, "privacidad", PRIVACIDAD)
    add(items, "limites", LIMITES)
    add(items, "negocio", NEGOCIO)
    add(items, "docentes", DOCENTES)
    add(items, "regulado", REGULADO)
    add(items, "automatizar", AUTOMATIZAR)
    add(items, "local", LOCAL)
    add(items, "idioma-ia", IDIOMA_IA)
    add(items, "hogar", HOGAR)
    add(items, "etica", ETICA)
    return items


import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ia_catalog_rows import (  # noqa: E402
    AUDIO,
    AUTOMATIZAR,
    CHAT_DIARIO,
    CODIGO,
    DOCENTES,
    ESCRITURA,
    ESTUDIO,
    ETICA,
    HERRAMIENTAS,
    HOGAR,
    IDIOMA_IA,
    IMAGEN,
    INVESTIGACION,
    LIMITES,
    LOCAL,
    NEGOCIO,
    OFICINA,
    PRIVACIDAD,
    PROMPTS,
    REGULADO,
)

# Each tuple: title, intent, kind, longtails, lead [, slug]


EMPEZAR = [
    (
        "ChatGPT, Gemini o Claude: por dónde empezar",
        "chatgpt gemini o claude para empezar",
        "comparativa",
        (
            "qué ia usar si empiezas",
            "chatgpt o gemini principiantes",
            "mejor chatbot para uso diario",
            "claude o chatgpt para textos largos",
            "elegir ia sin pagar el primer mes",
            "comparativa chatbots 2026 principiantes",
        ),
        "Tres chatbots para el primer mes: qué hace cada uno bien y cuál abrir según la tarea",
    ),
    (
        "Crear una cuenta de ChatGPT y configurar lo básico",
        "crear cuenta chatgpt",
        "cómo hacer",
        (
            "registrarse en chatgpt paso a paso",
            "configurar chatgpt primera vez",
            "cuenta chatgpt en español",
            "ajustes básicos chatgpt",
            "verificar teléfono chatgpt",
            "empezar en chatgpt sin pagar",
        ),
        "Alta en ChatGPT: cuenta, idioma, historial y los tres ajustes que importan el primer día",
    ),
    (
        "ChatGPT gratis o de pago: cuándo merece la pena",
        "chatgpt plus merece la pena",
        "comparativa",
        (
            "chatgpt gratuito límites",
            "diferencia chatgpt free y plus",
            "cuándo pagar una ia",
            "chatgpt de pago vs gemini gratis",
            "vale la pena chatgpt plus 2026",
            "plan de pago inteligencia artificial",
        ),
        "Gratis o de pago: qué ganas de verdad y cuándo el plan gratuito sigue bastando",
    ),
    (
        "Dónde está el historial de un chatbot y cómo no perderlo",
        "historial de chatgpt",
        "cómo hacer",
        (
            "buscar conversaciones antiguas chatgpt",
            "guardar chats de ia",
            "historial gemini dónde está",
            "no perder un prompt bueno",
            "organizar conversaciones chatgpt",
            "renombrar chats chatgpt",
        ),
        "Cómo encontrar un chat viejo, renombrarlo y no depender de la memoria del modelo",
    ),
    (
        "Hablar o escribir: cuándo usar el modo voz",
        "modo voz chatgpt",
        "cómo hacer",
        (
            "chatgpt voz en el móvil",
            "dictar a un chatbot",
            "ia conversación hablada",
            "cuándo no usar modo voz",
            "chatbot manos libres",
            "gemini modo voz",
        ),
        "Voz o teclado: cuándo dictar ahorra tiempo y cuándo el texto evita errores",
    ),
    (
        "Subir un PDF a un chatbot: qué hacer y qué no",
        "subir pdf a chatgpt",
        "cómo hacer",
        (
            "analizar un pdf con ia",
            "chatgpt lee documentos",
            "privacidad al subir pdf a ia",
            "resumir pdf con inteligencia artificial",
            "límites de archivos en chatbots",
            "gemini subir pdf drive",
        ),
        "Subir un PDF: qué pedir, qué recortar antes y qué documentos no deberías cargar",
    ),
    (
        "Instrucciones personalizadas: las 5 reglas que bastan",
        "custom instructions chatgpt",
        "cómo hacer",
        (
            "instrucciones personalizadas chatgpt español",
            "cómo configurar custom instructions",
            "memoria chatgpt qué poner",
            "perfil en un chatbot",
            "instrucciones permanentes ia",
            "qué no poner en custom instructions",
        ),
        "Cinco reglas permanentes para un chatbot: tono, idioma, formato y lo que no debe inventar",
    ),
    (
        "Por qué un chatbot se inventa datos",
        "alucinaciones inteligencia artificial",
        "informacional",
        (
            "chatgpt inventa información",
            "por qué la ia miente",
            "alucinación de un modelo de lenguaje",
            "respuestas falsas chatgpt",
            "cómo detectar una alucinación de ia",
            "ia se inventa fuentes",
        ),
        "Por qué un modelo inventa nombres, cifras y fuentes, y qué hacer en ese momento",
    ),
    (
        "Cómo comprobar si una respuesta de IA es fiable",
        "comprobar respuesta chatgpt",
        "cómo hacer",
        (
            "verificar datos de una ia",
            "fact check chatgpt",
            "contrastar fuentes de un chatbot",
            "cuándo fiarte de gemini",
            "comprobar citas inventadas ia",
            "método para validar una respuesta de ia",
        ),
        "Un método corto para contrastar lo que dice un chatbot antes de usarlo en el trabajo",
    ),
    (
        "Copilot en el navegador: para qué sirve al empezar",
        "microsoft copilot navegador principiantes",
        "herramienta",
        (
            "copilot edge cómo usarlo",
            "bing chat o copilot",
            "copilot resumir una web",
            "ia en el navegador microsoft",
            "copilot vs chatgpt en el día a día",
            "copilot gratis windows",
        ),
        "Copilot en el navegador: resumir una web, comparar pestañas y cuándo abrir ChatGPT igual",
    ),
    (
        "Usar IA en el móvil o en el ordenador",
        "chatgpt en el móvil",
        "comparativa",
        (
            "app chatgpt android",
            "app chatgpt iphone",
            "gemini en el teléfono",
            "ia en el móvil vs escritorio",
            "chatbot pantallas pequeñas",
            "mejor forma de usar ia fuera de casa",
        ),
        "Móvil u ordenador: qué tareas salen bien en el teléfono y cuáles piden teclado",
    ),
    (
        "Qué modelo elegir si no sabes cuál es cuál",
        "qué modelo de ia elegir",
        "informacional",
        (
            "gpt-4o o modelo rápido",
            "modelo thinking o instant",
            "diferencia modelos chatgpt",
            "claude sonnet u opus",
            "gemini flash o pro",
            "elegir modelo sin ser técnico",
        ),
        "Nombres de modelos sin jerga: cuál usar para un chat corto, un PDF o un razonamiento",
    ),
    (
        "Tokens y límites: explicado sin jerga",
        "qué son los tokens de ia",
        "informacional",
        (
            "límite de contexto chatgpt",
            "por qué el chatbot olvida el inicio",
            "ventana de contexto explicada",
            "mensaje demasiado largo ia",
            "contar palabras vs tokens",
            "chat largo se vuelve tonto",
        ),
        "Qué es un token y por qué un chat largo empieza a olvidar el principio",
    ),
    (
        "Conversación nueva o seguir el mismo hilo",
        "nueva conversación chatgpt",
        "cómo hacer",
        (
            "cuándo abrir un chat nuevo",
            "mismo hilo chatgpt",
            "contexto de una conversación ia",
            "reiniciar chat o continuar",
            "hilo sucio en un chatbot",
            "separar temas en chatgpt",
        ),
        "Cuándo abrir un chat nuevo y cuándo el hilo viejo contamina la respuesta",
    ),
    (
        "Guardar un prompt que te funcionó",
        "guardar prompts chatgpt",
        "cómo hacer",
        (
            "biblioteca personal de prompts",
            "plantilla de prompt reutilizable",
            "dónde guardar instrucciones de ia",
            "prompt library en español",
            "reutilizar un buen prompt",
            "nota con prompts que funcionan",
        ),
        "Cómo guardar un prompt que funcionó y reutilizarlo sin copiar hilos enteros",
    ),
    (
        "Pedir la respuesta en español de España",
        "chatgpt español de españa",
        "cómo hacer",
        (
            "ia que no use latinismos",
            "español neutro o de españa en ia",
            "gemini en castellano de españa",
            "vosotros y tuteo en un chatbot",
            "localizar respuestas de ia",
            "forzar idioma en chatgpt",
        ),
        "Cómo pedir castellano de España, tuteo y palabras que no quieres ver en la respuesta",
    ),
    (
        "Pedir ejemplos en vez de teoría",
        "pedir ejemplos a chatgpt",
        "cómo hacer",
        (
            "chatgpt dame un ejemplo concreto",
            "ia demasiado genérica",
            "forzar ejemplos en un prompt",
            "respuestas abstractas de chatbot",
            "pedir un caso real a la ia",
            "menos teoría más ejemplo",
        ),
        "Qué escribir para que el chatbot deje la teoría y te dé un ejemplo usable",
    ),
    (
        "Cómo corregir a la IA sin empezar de cero",
        "corregir respuesta chatgpt",
        "cómo hacer",
        (
            "iterar un prompt",
            "refinar respuesta de ia",
            "chatgpt se ha equivocado qué decir",
            "segunda pasada a un texto de ia",
            "marcar errores en un chatbot",
            "no regenerar todo el chat",
        ),
        "Cómo señalar un error concreto y pedir un arreglo sin tirar el hilo",
    ),
    (
        "Borrar el historial de un chatbot",
        "borrar historial chatgpt",
        "cómo hacer",
        (
            "eliminar conversaciones chatgpt",
            "borrar chats gemini",
            "desactivar historial de ia",
            "modo chat temporal al borrar historial",
            "limpiar datos de un chatbot",
            "olvidar una conversación de ia",
        ),
        "Borrar un chat, vaciar el historial y cuándo usar el modo temporal",
    ),
    (
        "Cuenta de trabajo y cuenta personal",
        "chatgpt trabajo o personal",
        "comparativa",
        (
            "ia en el correo de empresa",
            "cuenta chatgpt del trabajo",
            "no mezclar chats laborales",
            "gemini workspace vs cuenta gmail",
            "riesgo de usar ia personal en la oficina",
            "separar identidades en chatbots",
        ),
        "Por qué no mezclar la cuenta personal con la del trabajo y cómo separarla",
    ),
    (
        "Niños y chatbots: límites reales",
        "chatgpt y menores",
        "informacional",
        (
            "edad mínima chatgpt",
            "ia para deberes de niños",
            "supervisar un chatbot con menores",
            "riesgos de chatbots infantiles",
            "gemini kids o no",
            "límites de edad inteligencia artificial",
        ),
        "Qué puede y no puede hacer un menor con un chatbot, y qué supervisar tú",
    ),
    (
        "Dictado y lectura en voz alta con un chatbot",
        "accesibilidad chatgpt",
        "cómo hacer",
        (
            "chatgpt leer en voz alta",
            "dictar prompts con el móvil",
            "ia para baja visión",
            "escuchar una respuesta de ia",
            "chatbot y lector de pantalla",
            "usar ia sin teclear mucho",
        ),
        "Dictado y voz alta: cómo usar un chatbot si teclear cansa o ves peor",
    ),
    (
        "GPTs personalizados: no hace falta el primer mes",
        "custom gpts principiantes",
        "informacional",
        (
            "qué es un gpt personalizado",
            "tienda de gpts chatgpt",
            "cuándo no usar un gpt",
            "riesgo de gpts de terceros",
            "gpt vs prompt normal",
            "empezar sin tienda de gpts",
        ),
        "Qué es un GPT de la tienda, por qué no lo necesitas al empezar y el riesgo de terceros",
    ),
    (
        "Canvas o el chat de siempre",
        "chatgpt canvas para qué sirve",
        "comparativa",
        (
            "chatgpt canvas vs chat",
            "editar un documento con canvas",
            "claude artifacts o canvas",
            "cuándo usar canvas",
            "ia para reescribir en un lienzo",
            "chat normal sigue bastando",
        ),
        "Canvas frente al chat: cuándo editar un texto en el lienzo y cuándo no complica",
    ),
    (
        "Exportar una conversación de IA",
        "exportar conversación chatgpt",
        "cómo hacer",
        (
            "descargar historial chatgpt",
            "copiar un chat a un documento",
            "exportar datos de gemini",
            "guardar respuestas de ia en pdf",
            "backup de conversaciones chatgpt",
            "llevarte un chat a notion",
        ),
        "Cómo sacar un chat a un documento tuyo y no dejar el trabajo solo en la web",
    ),
    (
        "Apps oficiales y webs que te copian la cuenta",
        "web oficial chatgpt",
        "informacional",
        (
            "estafas de login chatgpt",
            "app falsa de ia",
            "phishing chatgpt",
            "url oficial openai",
            "extensiones peligrosas de chatbots",
            "no pegar la API key en una web rara",
        ),
        "Cómo distinguir la web oficial de una copia que quiere tu cuenta o tu clave",
    ),
    (
        "Qué hacer cuando el chatbot se niega",
        "chatgpt se niega a responder",
        "informacional",
        (
            "ia no quiere ayudar",
            "límites de uso de un chatbot",
            "reformular una pregunta bloqueada",
            "política de contenidos chatgpt",
            "cuando gemini corta la respuesta",
            "no es un jailbreak: pedir otra vía",
        ),
        "Si el modelo se niega: reformular la tarea legal y útil, no pelear con las reglas",
    ),
    (
        "Primeros 7 días: un plan de uso de IA",
        "plan 7 días usar ia",
        "cómo hacer",
        (
            "rutina semanal con chatgpt",
            "cómo acostumbrarte a usar ia",
            "hábitos de inteligencia artificial",
            "primera semana con un chatbot",
            "tareas diarias para practicar ia",
            "plan de onboarding inteligencia artificial",
        ),
        "Siete días, una tarea real al día: el plan para que la IA entre en tu semana",
    ),
]


def existing_content_slugs() -> set[str]:
    slugs: set[str] = set()
    blog = ROOT / "src" / "content" / "blog"
    if not blog.exists():
        return slugs
    for path in blog.glob("*/*.md"):
        if path.parent.name == "inteligencia-artificial":
            continue
        slugs.add(path.stem)
    return slugs


def habit_catalog_slugs() -> set[str]:
    slugs: set[str] = set()
    for name in ("catalogo-entrenamiento-500.md", "catalogo-alimentacion-500.md"):
        path = DOCS / name
        if not path.exists():
            continue
        for line in path.read_text(encoding="utf-8").splitlines():
            if "| `" in line:
                parts = line.split("|")
                if len(parts) >= 5:
                    slug = parts[4].strip().strip("`")
                    if slug:
                        slugs.add(slug)
    return slugs


NUCLEO_PUBLISHED = {
    "que-es-la-inteligencia-artificial-sin-ciencia-ficcion",
    "como-usar-un-chatbot-de-ia-por-primera-vez",
    "como-escribir-un-prompt-que-sirva",
    "privacidad-al-usar-ia-que-no-pegar-nunca",
}


def mark_published(items: list[dict]) -> None:
    for item in items:
        if item["slug"] in NUCLEO_PUBLISHED:
            item["status"] = "publicado"


def finalize(items: list[dict]) -> list[dict]:
    out: list[dict] = []
    for idx, item in enumerate(items):
        kws = keywords_for(item["intent"], tuple(item["longtails"]))
        desc = fit_desc(item["lead"], idx, item["slug"])
        item = {
            **item,
            "keywords": kws,
            "longtails": kws[1:],
            "description": desc,
        }
        out.append(item)
    return out


def assert_unique(items: list[dict]) -> None:
    if len(items) != 500:
        raise SystemExit(f"expected 500 rows, got {len(items)}")
    got = dict(Counter(i["cluster"] for i in items))
    if got != CLUSTERS:
        raise SystemExit(f"cluster mismatch\n  got={got}\n  expected={CLUSTERS}")
    for field in ("slug", "intent", "title", "description"):
        counts = Counter(i[field] for i in items)
        dupes = [k for k, n in counts.items() if n > 1]
        if dupes:
            raise SystemExit(f"duplicate {field}: {dupes[:12]}")
    slugified_intents = Counter(slugify(i["intent"]) for i in items)
    dup_si = [k for k, n in slugified_intents.items() if n > 1]
    if dup_si:
        raise SystemExit(f"duplicate slugified intent: {dup_si[:12]}")
    token_keys = Counter(intent_key(i["intent"]) for i in items)
    dup_tok = [k for k, n in token_keys.items() if n > 1]
    if dup_tok:
        raise SystemExit(f"duplicate intent token-set: {dup_tok[:12]}")
    all_kws: list[str] = []
    for item in items:
        kws = item["keywords"]
        if not (6 <= len(kws) <= 8):
            raise SystemExit(f"keywords {len(kws)} for {item['slug']}")
        if kws[0] != item["intent"]:
            raise SystemExit(f"head keyword != intent for {item['slug']}")
        all_kws.extend(kws)
    kw_counts = Counter(k.lower() for k in all_kws)
    dup_kw = [k for k, n in kw_counts.items() if n > 1]
    if dup_kw:
        raise SystemExit(f"duplicate keyword string: {dup_kw[:12]}")
    kinds = {"informacional", "cómo hacer", "comparativa", "herramienta"}
    bad_kind = [i["slug"] for i in items if i["kind"] not in kinds]
    if bad_kind:
        raise SystemExit(f"bad search-intent kind: {bad_kind[:8]}")
    overlap = {i["slug"] for i in items} & (existing_content_slugs() | habit_catalog_slugs())
    if overlap:
        raise SystemExit(f"slug collides with existing content: {sorted(overlap)[:12]}")
    folder = ROOT / "src" / "content" / "blog" / "inteligencia-artificial"
    existing = {p.stem for p in folder.glob("*.md")} if folder.exists() else set()
    extra = existing - {i["slug"] for i in items}
    published = {i["slug"] for i in items if i["status"] == "publicado"}
    if published != NUCLEO_PUBLISHED:
        raise SystemExit(f"published slugs {sorted(published)} != {sorted(NUCLEO_PUBLISHED)}")
    missing_files = published - existing
    if extra:
        raise SystemExit(f"markdown on disk not in catalog: {sorted(extra)[:12]}")
    if missing_files:
        raise SystemExit(f"published slug has no markdown: {sorted(missing_files)}")


def render_markdown(path: Path, items: list[dict]) -> None:
    pub = sum(1 for i in items if i["status"] == "publicado")
    clusters = Counter(i["cluster"] for i in items)
    lines = [
        "# Catálogo inteligencia artificial (500)",
        "",
        "Generado por `scripts/build_ia_catalog.py`. No editar a mano: cambia el script y vuelve a ejecutarlo.",
        "",
        f"Estado: **{pub} publicados**, **{len(items) - pub} pendientes**. No redactar en bloque: ver [plan](./plan-catalogo-ia-500.md) y la [guía editorial](./guia-editorial-inteligencia-artificial.md).",
        "",
        "Cada fila es **una SERP**. Título, keyword cabeza, long-tails y meta description (140–160 caracteres) salen listos para el frontmatter cuando se redacte (~2.000 palabras).",
        "",
        "| cluster | n |",
        "|---|---|",
    ]
    for cluster, n in clusters.items():
        lines.append(f"| `{cluster}` | {n} |")
    lines.extend(
        [
            "",
            "| n | estado | cluster | slug | título | tipo de intención | keyword cabeza | long-tails | descripción meta |",
            "|---|---|---|---|---|---|---|---|---|",
        ]
    )
    for i, item in enumerate(items, start=1):
        title = item["title"].replace("|", "\\|")
        intent = item["intent"].replace("|", "\\|")
        tails = "; ".join(item["longtails"]).replace("|", "\\|")
        desc = item["description"].replace("|", "\\|")
        lines.append(
            f"| {i} | {item['status']} | {item['cluster']} | `{item['slug']}` | {title} | {item['kind']} | {intent} | {tails} | {desc} |"
        )
    lines.append("")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def render_json(path: Path, items: list[dict]) -> None:
    payload = []
    for i, item in enumerate(items, start=1):
        payload.append(
            {
                "n": i,
                "estado": item["status"],
                "cluster": item["cluster"],
                "slug": item["slug"],
                "title": item["title"],
                "search_intent_type": item["kind"],
                "keyword": item["intent"],
                "keywords": item["keywords"],
                "description": item["description"],
                "canonical": f"https://linguafly.app/blog/inteligencia-artificial/{item['slug']}",
            }
        )
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    if sum(CLUSTERS.values()) != 500:
        raise SystemExit(f"cluster budget sums to {sum(CLUSTERS.values())}, not 500")
    items = finalize(catalog())
    mark_published(items)
    assert_unique(items)
    render_markdown(DOCS / "catalogo-inteligencia-artificial-500.md", items)
    render_json(DOCS / "catalogo-inteligencia-artificial-500.json", items)
    print(f"inteligencia-artificial={len(items)}")


if __name__ == "__main__":
    main()

