#!/usr/bin/env python3
"""Guías y cuadernos del curso C2: un artículo de teoría y el de ejercicios por unidad."""

from __future__ import annotations

import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "content" / "blog" / "curso-c2"
DATE = "2026-09-28"


def _load_longform():
    import importlib.util

    path = Path(__file__).with_name("c2_longform.py")
    spec = importlib.util.spec_from_file_location("c2_longform", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


LONG = _load_longform()

MODULES = {
    1: "Lenguaje, poder y retórica",
    2: "Literatura y la palabra escrita",
    3: "Ciencia, conocimiento y verdad",
    4: "Sociedad, poder y justicia",
    5: "Arte, estética y creatividad",
    6: "Mente, identidad y filosofía",
    7: "Economía, derecho y política",
    8: "Retos globales y el futuro",
    9: "Comunicación intercultural",
    10: "Integración y preparación del Proficiency",
}


def U(n, module, slug, grammar, tema, formula, teach, errors, exercises, model):
    return {
        "n": n,
        "module": module,
        "slug": slug,
        "grammar": grammar,
        "tema": tema,
        "formula": formula,
        "teach": teach,
        "errors": errors,
        "exercises": exercises,
        "model": model,
    }


def K(src, key, answer, why):
    return {"kind": "kwt", "src": src, "key": key, "answer": answer, "why": why}


def G(prompt, answer, why):
    return {"kind": "gap", "src": prompt, "key": None, "answer": answer, "why": why}


# Cada unidad: explicación propia y ejercicios que ilustran ESA estructura.
# Las frases del banco interno del curso se repiten entre unidades y no siguen
# el punto gramatical, así que no se copian aquí.
UNITS = [
    U(1, 1, "inversion-retorica", "Inversión retórica", "el poder de las palabras",
      "adverbio negativo + auxiliar + sujeto + resto",
      [
          "La inversión retórica adelanta un adverbio negativo o restrictivo y coloca el auxiliar delante del sujeto. No es un adorno: cambia el foco. En un texto sobre el poder de las palabras, *Never had the slogan sounded neutral* no informa solo de un hecho; subraya que la neutralidad era imposible.",
          "Los disparadores habituales son *never, rarely, seldom, little, hardly, scarcely, no sooner, not only, under no circumstances* y *only then*. El auxiliar es el mismo que llevaría la frase sin inversión: *had, did, does, would, could*. Si no hay auxiliar, se añade *do/does/did*.",
          "Después de *not only* la segunda parte suele ir con *but (also)*. *Hardly* y *no sooner* piden *when* o *than*, no *that*. La inversión va en la cláusula que empieza por el adverbio, no en toda la oración.",
      ],
      [
          "Never she had heard that definition. Falta el auxiliar delante del sujeto: Never had she heard that definition.",
          "Not only the phrase described the policy. Tras not only hace falta did: Not only did the phrase describe the policy, but it also justified it.",
      ],
      [
          K("She had never heard such a careful definition of power.", "NEVER", "Never had she heard such a careful definition of power.", "Never al inicio exige had delante del sujeto."),
          K("The audience little realized how the metaphor was steering the vote.", "LITTLE", "Little did the audience realize how the metaphor was steering the vote.", "Little did + sujeto + infinitivo: el público apenas se daba cuenta."),
          K("The speech not only redefined loyalty; it also silenced the critics.", "ONLY", "Not only did the speech redefine loyalty, but it also silenced the critics.", "Not only did… but also une las dos consecuencias."),
          K("They had hardly finished the slogan when the headline changed.", "HARDLY", "Hardly had they finished the slogan when the headline changed.", "Hardly had… when marca sucesión inmediata."),
          G("_____ no circumstances should a slogan hide who holds power.", "Under", "Under no circumstances va seguido de inversión: should a slogan."),
          G("Only then _____ the audience understand the cost of the metaphor.", "did", "Only then did + sujeto: la comprensión llega en ese momento y no antes."),
          G("No sooner _____ the phrase been published than it was quoted as fact.", "had", "No sooner had + participio… than."),
      ],
      "Never had a short definition carried so much power. Little did the first readers realize that the metaphor would frame the whole debate. Not only did the slogan describe the policy, but it also decided who could object to it. Under no circumstances should that wording be treated as neutral.",
    ),
    U(2, 1, "oraciones-hendidas", "Oraciones hendidas", "retórica y persuasión",
      "It is/was + foco + that / What + cláusula + is",
      [
          "La oración hendida parte la información en dos: el foco y el resto. *It was the pause that persuaded them* no dice solo que hubo una pausa. Dice que la pausa, y no otro recurso, fue lo persuasivo.",
          "*What persuades an audience is evidence* identifica el elemento central con *what*. *The reason (why)… is that* y *the person who…* son hendidas con nombre. Sirven en retórica porque separan el argumento del énfasis.",
          "No conviertas toda frase en hendida. Si el foco ya está claro, la estructura suena forzada. En C2 se usa cuando hay contraste: no fue el dato, fue el orden del dato.",
      ],
      [
          "It was the pause persuaded them. Falta that/which: It was the pause that persuaded them.",
          "What she wanted a concession. Falta el verbo de la segunda parte: What she wanted was a concession.",
      ],
      [
          K("The pause persuaded them, not the statistic.", "PAUSE", "It was the pause that persuaded them, not the statistic.", "It was + foco + that aísla la pausa."),
          K("She wanted a concession.", "WHAT", "What she wanted was a concession.", "What… was identifica el objeto del deseo."),
          K("They changed the vote because of one analogy.", "ANALOGY", "It was one analogy that changed the vote.", "El foco es la analogía, no el cambio en abstracto."),
          K("The audience trusted the speaker's restraint.", "RESTRAINT", "What the audience trusted was the speaker's restraint.", "What the audience trusted was… pone la contención en primer plano."),
          G("It was the final question _____ exposed the weak premise.", "that", "That (o which) enlaza el foco con la cláusula."),
          G("The reason the argument held was _____ the example was specific.", "that", "The reason… was that + oración completa."),
          G("What matters in persuasion _____ the order of the claims.", "is", "What matters… is + el elemento que se destaca."),
      ],
      "It was not the volume of evidence that persuaded the committee. What persuaded them was the order of the claims. The reason the analogy worked was that it named a cost the audience had already felt. A persuasive text chooses one focus and leaves the rest in the background.",
    ),
    U(3, 1, "fronting-discurso-politico", "Fronting y topicalización", "el discurso político",
      "complemento o complemento circunstancial + sujeto + verbo",
      [
          "El fronting adelanta un complemento que en el orden neutro iría después del verbo. *This proposal I cannot accept* topicaliza *this proposal*. El sujeto y el verbo no se invierten, salvo que el elemento adelantado sea un adverbio negativo.",
          "En el discurso político el fronting marca el tema de la frase antes de la opinión: *Of that promise little remains* mezcla fronting con inversión porque *little* es negativo. *The amendments, the committee rejected* es topicalización sin inversión.",
          "No adelantes el objeto si la frase ya es larga y el referente no está claro. El oyente necesita reconocer el tema en las primeras palabras.",
      ],
      [
          "This bill did the opposition reject. Con objeto adelantado no se añade did: This bill the opposition rejected.",
          "Of the promise remains little. Si little va al inicio, sí hay inversión: Little of the promise remains, o Of the promise, little remains.",
      ],
      [
          K("I cannot defend that wording in a public address.", "WORDING", "That wording I cannot defend in a public address.", "El objeto that wording pasa al inicio sin auxiliar de más."),
          K("The committee rejected the amendments after midnight.", "AMENDMENTS", "The amendments the committee rejected after midnight.", "Topicalización del complemento directo."),
          K("Little of the original pledge remains.", "LITTLE", "Little of the original pledge remains.", "Little ya es el sujeto cuantificado; no hace falta did."),
          K("They announced the concession only in the final paragraph.", "CONCESSION", "The concession they announced only in the final paragraph.", "El foco es la concesión, no el anuncio."),
          G("That promise _____ the minister repeated, but the figures said otherwise.", "the minister", "Orden: objeto + sujeto + verbo. That promise the minister repeated."),
          G("Of the five pledges, only one _____ the vote.", "survived", "Of the five pledges es fronting del complemento; el verbo queda en su sitio."),
          G("Such a claim I _____ not let stand.", "will", "Such a claim I will not let stand: objeto + sujeto + modal."),
      ],
      "That wording the opposition could not defend. Of the five pledges, only one survived the debate. The concession they announced only in the final paragraph, after the headline had already fixed the story. In political prose, the first noun is often the battleground.",
    ),
    U(4, 1, "control-del-registro", "Control del registro", "lengua e identidad",
      "la misma idea en registro formal, neutro y coloquial",
      [
          "El registro es la distancia entre quien habla y quien escucha. *Kids pick up an accent* y *Children acquire a variety* describen un hecho parecido, pero no construyen la misma identidad. En C2 hay que poder subir y bajar el registro sin cambiar la proposición.",
          "Señales formales: nominalizaciones, pasiva, *one*, verbos como *acquire, contend, reside*. Señales coloquiales: *gonna* no pertenece a este nivel escrito; sí *I suppose, mind you, a bit*. El error no es usar lo coloquial. El error es mezclarlo con un informe.",
          "Cuando el tema es la identidad lingüística, el registro también es el contenido: decir *posh* o *a prestige variety* elige un bando.",
      ],
      [
          "The kids acquired a stigmatised variety in the household. Mezcla coloquial y técnica. O The kids picked up an accent at home, o Children may acquire a stigmatised variety.",
          "One don't drop consonants in this essay. One va con verbo en tercera: One does not drop consonants.",
      ],
      [
          K("Kids pick up the accent at home.", "ACQUIRE", "Children acquire the accent in the home environment.", "Acquire y children suben el registro sin cambiar el hecho."),
          K("She's really into sounding local.", "ALLEGIANCE", "She shows a strong allegiance to the local variety.", "Allegiance sustituye el giro coloquial really into."),
          K("People look down on that accent.", "STIGMATISED", "That accent is stigmatised.", "La pasiva stigmatised es el término de análisis, no un insulto."),
          K("He changes how he talks depending on the room.", "SHIFTS", "He shifts variety according to the setting.", "Shift variety es el término técnico del cambio de código."),
          G("In formal prose, write acquire, not _____ up.", "pick", "Pick up es el equivalente coloquial de acquire."),
          G("A prestige _____ is not the same thing as a correct one.", "variety", "Variety evita llamar incorrecta a una forma social."),
          G("One _____ not assume that a formal accent signals education.", "does", "One + does, no don't."),
      ],
      "Children often acquire the local variety at home and shift towards a prestige variety at school. That shift is not a moral improvement. It is a response to the room. A C2 writer can say this without slang and without pretending that one accent is linguistically superior.",
    ),
    U(5, 1, "pasiva-de-distanciamiento", "Pasiva de distanciamiento", "propaganda y manipulación",
      "It is said that / sujeto + is said to + infinitivo",
      [
          "La pasiva de distanciamiento atribuye una idea sin nombrar a quien la sostiene. *It is said that the reform is popular* y *The reform is said to be popular* apartan al emisor. En un texto sobre propaganda, esa distancia puede ser honesta (no hay fuente) o estratégica (se esconde la fuente).",
          "Verbos típicos: *say, believe, think, report, allege, claim, rumour*. Con un hecho presente: *is said to be*. Con un hecho pasado: *is said to have been*. Con una acción en curso: *is said to be doing*.",
          "Si conoces la fuente, nómbrala. La construcción impersonal no sustituye una cita. *It is alleged* no significa *it is true*.",
      ],
      [
          "It is said the figures to be false. Mezcla las dos estructuras. It is said that the figures are false, o The figures are said to be false.",
          "The minister is said to dropped the plan. Tras to hace falta have: is said to have dropped the plan.",
      ],
      [
          K("People say that the slogan was tested on focus groups.", "SAID", "The slogan is said to have been tested on focus groups.", "Is said to have been + participio: hecho pasado y pasivo."),
          K("Journalists report that the photo was cropped.", "REPORTED", "The photo is reported to have been cropped.", "Is reported to have been aparta al redactor y mantiene el hecho."),
          K("Everyone thinks the statistic is misleading.", "THOUGHT", "The statistic is thought to be misleading.", "Is thought to be describe una opinión presente sin sujeto."),
          K("People allege that the ministry hid the memo.", "ALLEGED", "The ministry is alleged to have hidden the memo.", "Alleged to have + participio: acusación, no hecho probado."),
          G("The headline is said _____ simplified the policy.", "to have", "To have simplified: la simplificación es anterior al momento de hablar."),
          G("It is widely _____ that the slogan decided the frame.", "believed", "It is widely believed that + oración."),
          G("The leak is rumoured _____ come from inside the office.", "to have", "Is rumoured to have come: origen pasado."),
      ],
      "The slogan is said to have been tested before it was released. The photo is reported to have been cropped, and the statistic is thought to be misleading. None of these sentences names a source. In a text about spin, that absence is part of the meaning and should be noticed, not copied blindly.",
    ),
    U(6, 1, "repaso-lenguaje-y-poder", "Repaso: lenguaje y poder", "el módulo de retórica",
      "inversión, hendida, fronting, registro y pasiva de cita en un mismo párrafo",
      [
          "El repaso del módulo no añade una estructura nueva. Pide combinar las cinco anteriores en un comentario sobre cómo el lenguaje reparte poder: qué se adelanta, qué se esconde y en qué registro se dice.",
          "Un párrafo de repaso puede abrir con inversión (*Never had the brief sounded neutral*), seguir con una hendida (*It was the verb that assigned blame*), topicalizar el objeto (*That clause the editor kept*) y cerrar con una pasiva de distanciamiento (*The motive is said to be clarity*).",
          "El criterio no es usar las cinco a la fuerza. Es que cada una haga un trabajo distinto y que el registro no salte de informe a conversación.",
      ],
      [
          "Never the brief had sounded neutral. Inversión incompleta: Never had the brief sounded neutral.",
          "It was the verb assigned blame. Falta that: It was the verb that assigned blame.",
      ],
      [
          K("The brief had never sounded neutral.", "NEVER", "Never had the brief sounded neutral.", "Inversión con never had."),
          K("The verb assigned blame, not the noun.", "VERB", "It was the verb that assigned blame, not the noun.", "Hendida: It was the verb that…"),
          K("The editor kept that clause.", "CLAUSE", "That clause the editor kept.", "Fronting del objeto, sin did extra."),
          K("People say the motive was clarity.", "SAID", "The motive is said to have been clarity.", "Pasiva de distanciamiento con to have been."),
          G("Not only _____ the headline frame the event, but it also named a villain.", "did", "Not only did + sujeto + infinitivo."),
          G("What the edit removed _____ the agent of the action.", "was", "What… was identifica el elemento suprimido."),
          G("Under no _____ should the slogan be treated as a fact.", "circumstances", "Under no circumstances + inversión o modal."),
      ],
      "Never had the brief sounded neutral. It was the verb that assigned blame, and that clause the editor kept. The motive is said to have been clarity. Not only did the headline frame the event, but it also decided who could answer. A review paragraph earns its structures only when each one changes the focus.",
    ),
]
def slugify(text: str) -> str:
    text = unicodedata.normalize("NFD", text)
    text = "".join(ch for ch in text if unicodedata.category(ch) != "Mn")
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text


def y(text: str) -> str:
    return '"' + text.replace("\\", "\\\\").replace('"', '\\"') + '"'


def fit_title(text: str) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) < 30:
        extra = " en inglés C2"
        text = (text + extra) if len(text) + len(extra) <= 65 else text + " C2"
    if len(text) > 65:
        text = text[:65].rsplit(" ", 1)[0].rstrip(" :,-")
    if len(text) < 30:
        text = f"{text} curso C2"
    return text


def fit_desc(n: int, grammar: str, tema: str, kind: str) -> str:
    grammar = grammar.lower()
    if kind == "teoria":
        options = [
            f"Unidad {n} del curso de inglés C2 sobre {grammar}. El tema es {tema}. Incluye la fórmula, los errores frecuentes y el cuaderno con soluciones.",
            f"Unidad {n} del curso de inglés C2 sobre {grammar}. El tema es {tema}. Fórmula, errores frecuentes y cuaderno con soluciones.",
            f"Unidad {n} del curso de inglés C2: {grammar}. Tema: {tema}. Fórmula, errores y cuaderno con soluciones.",
        ]
    else:
        options = [
            f"Ejercicios resueltos de la Unidad {n} del curso C2 sobre {grammar}. El tema es {tema}. Hay transformaciones, huecos y un modelo de writing.",
            f"Ejercicios resueltos de la Unidad {n} C2 sobre {grammar}. Tema: {tema}. Transformaciones, huecos y modelo comentado.",
            f"Cuaderno de la Unidad {n} C2: {grammar}. Tema: {tema}. Transformaciones y huecos con soluciones.",
        ]
    for text in options:
        if 120 <= len(text) <= 170:
            return text
    text = options[-1]
    if len(text) > 170:
        text = text[:170].rsplit(" ", 1)[0].rstrip(" ,;:.") + "."
    if len(text) < 120:
        text = f"{text} Curso de inglés C2 de Linguafly."
    if not (120 <= len(text) <= 170):
        raise SystemExit(f"desc still unfit ({len(text)}): {text}")
    return text


def md_inline(text: str) -> str:
    return text.replace("\r", "")


def theory_path(unit) -> str:
    return f"unidad-{unit['n']}-{unit['slug']}"


def work_path(unit) -> str:
    return f"{theory_path(unit)}-ejercicios-soluciones"


def render_theory(unit, prev_u, next_u) -> str:
    n = unit["n"]
    slug = theory_path(unit)
    work = work_path(unit)
    title = fit_title(f"{unit['grammar']} en inglés C2")
    desc = fit_desc(n, unit["grammar"], unit["tema"], "teoria")
    routes = [work, "ingles-c2"]
    if prev_u:
        routes.insert(1, theory_path(prev_u))
    if next_u:
        routes.append(theory_path(next_u))
    if n >= 58:
        routes.append("cambridge-c2-proficiency-guia")
    faqs = [
        (f"¿Qué se practica en la Unidad {n} del curso C2?",
         f"{unit['grammar']}, centrada en {unit['tema']}. La fórmula de trabajo es: {unit['formula']}."),
        ("¿La unidad incluye ejercicios con soluciones?",
         "Sí. El artículo siguiente es el cuaderno: transformaciones, huecos y un modelo de writing."),
        ("¿Cuál es el error más habitual?",
         unit["errors"][0]),
        ("¿Dónde sigo después de la explicación?",
         f"En el cuaderno de la Unidad {n} y, si ya está resuelto, en la unidad siguiente del curso C2."),
    ]
    prev_link = (
        f"[Unidad {prev_u['n']}: {prev_u['grammar']}](/blog/curso-c2/{theory_path(prev_u)})"
        if prev_u else "[Nivel C2 de inglés](/blog/metodos/ingles-c2)"
    )
    next_link = (
        f"[Unidad {next_u['n']}: {next_u['grammar']}](/blog/curso-c2/{theory_path(next_u)})"
        if next_u else "[Guía del Cambridge C2 Proficiency](/blog/examenes/cambridge-c2-proficiency-guia)"
    )
    lines = [
        "---",
        "category: curso-c2",
        f"date: '{DATE}'",
        f"updatedDate: '{DATE}'",
        "author: linguafly-team",
        f"title: {y(title)}",
        "description: >-",
        f"  {desc}",
        "readTime: 17 min",
        "keywords:",
        f"  - {y(title)}",
        f"  - {y(unit['grammar'] + ' C2')}",
        f"  - {y('curso de inglés C2 unidad ' + str(n))}",
        f"  - {y(unit['tema'] + ' en inglés C2')}",
        "  - ejercicios inglés C2 con soluciones",
        "  - Cambridge C2 Proficiency gramática",
        f"canonical: {y('https://linguafly.app/blog/curso-c2/' + slug)}",
        f"alt: {y(unit['grammar'] + ' en la unidad ' + str(n) + ' del curso C2')}",
        "related_routes:",
    ]
    for route in routes[:4]:
        lines.append(f"  - {route}")
    lines.append("faqs:")
    for q, a in faqs:
        lines.append(f"  - question: {y(q)}")
        lines.append("    answer: >-")
        lines.append(f"      {a}")
    lines += [
        "excerpt: >-",
        f"  Unidad {n} del curso C2 sobre {unit['grammar'].lower()} ({unit['tema']}), con fórmula, errores y cuaderno.",
        "---",
        "",
    ]
    front = "\n".join(lines).rstrip() + "\n"
    body = LONG.theory_body(unit, MODULES[unit["module"]], prev_link, next_link, work)
    return title, desc, front + "\n" + body


def render_workbook(unit, prev_u, next_u) -> str:
    n = unit["n"]
    slug = work_path(unit)
    theory = theory_path(unit)
    title = fit_title(f"Ejercicios de {unit['grammar'].lower()} C2")
    # "Ejercicios de X C2" can be short or long
    if len(title) < 30:
        title = fit_title(f"Ejercicios de {unit['grammar'].lower()} en inglés C2")
    desc = fit_desc(n, unit["grammar"], unit["tema"], "cuaderno")
    routes = [theory, "ingles-c2"]
    if prev_u:
        routes.append(work_path(prev_u))
    if next_u:
        routes.append(theory_path(next_u))
    lines = [
        "---",
        "category: curso-c2",
        f"date: '{DATE}'",
        f"updatedDate: '{DATE}'",
        "author: linguafly-team",
        f"title: {y(title)}",
        "description: >-",
        f"  {desc}",
        "readTime: 18 min",
        "keywords:",
        f"  - {y(title)}",
        f"  - {y('ejercicios ' + unit['grammar'].lower() + ' C2')}",
        f"  - {y('unidad ' + str(n) + ' curso inglés C2')}",
        "  - ejercicios C2 con soluciones",
        "  - key word transformation C2",
        "  - open cloze inglés C2",
        f"canonical: {y('https://linguafly.app/blog/curso-c2/' + slug)}",
        f"alt: {y('Ejercicios de ' + unit['grammar'].lower() + ', unidad ' + str(n) + ' del curso C2')}",
        "related_routes:",
    ]
    for route in routes[:4]:
        lines.append(f"  - {route}")
    lines += [
        "faqs:",
        f"  - question: {y(f'¿Qué ejercicios trae la Unidad {n}?')}",
        "    answer: >-",
        f"      Transformaciones con palabra clave, huecos y un párrafo modelo sobre {unit['tema']}.",
        f"  - question: {y('¿Cómo uso este cuaderno?')}",
        "    answer: >-",
        "      Resuelve cada ítem sin abrir la solución. Después lee la explicación y, si fallas, vuelve a la guía de la unidad.",
        f"  - question: {y('¿Cuál es el foco gramatical?')}",
        "    answer: >-",
        f"      {unit['grammar']}. Fórmula: {unit['formula']}.",
        f"  - question: {y('¿Dónde está la explicación?')}",
        "    answer: >-",
        f"      En la guía de la Unidad {n}, justo antes de este cuaderno.",
        "excerpt: >-",
        f"  Cuaderno de la Unidad {n} C2 ({unit['grammar']}) con soluciones comentadas.",
        "---",
        "",
    ]
    next_link = (
        f"[Unidad {next_u['n']}: {next_u['grammar']}](/blog/curso-c2/{theory_path(next_u)})"
        if next_u else "[Guía del Cambridge C2 Proficiency](/blog/examenes/cambridge-c2-proficiency-guia)"
    )
    front = "\n".join(lines).rstrip() + "\n"
    body = LONG.workbook_body(unit, MODULES[unit["module"]], theory, next_link)
    return title, desc, front + "\n" + body


def main() -> None:
    more = Path(__file__).with_name("c2_more_units.py").read_text(encoding="utf-8")
    namespace = {"U": U, "K": K, "G": G}
    exec(more, namespace)
    UNITS.extend(namespace["MORE_UNITS"])
    if len(UNITS) != 61:
        raise SystemExit(f"expected 61 units, got {len(UNITS)}")
    numbers = [u["n"] for u in UNITS]
    if numbers != list(range(1, 62)):
        raise SystemExit(f"unit numbers are not 1..61: {numbers}")
    slugs = [u["slug"] for u in UNITS]
    if len(set(slugs)) != len(slugs):
        raise SystemExit("duplicate slugs")
    OUT.mkdir(parents=True, exist_ok=True)
    report = []
    for i, unit in enumerate(UNITS):
        prev_u = UNITS[i - 1] if i else None
        next_u = UNITS[i + 1] if i + 1 < len(UNITS) else None
        for kind, renderer, name in (
            ("teoria", render_theory, theory_path(unit)),
            ("cuaderno", render_workbook, work_path(unit)),
        ):
            title, desc, body = renderer(unit, prev_u, next_u)
            if not (30 <= len(title) <= 65):
                raise SystemExit(f"title length {len(title)} {name}: {title}")
            if not (120 <= len(desc) <= 170):
                raise SystemExit(f"desc length {len(desc)} {name}: {desc}")
            if "\n# " in "\n" + body or body.startswith("# "):
                raise SystemExit(f"H1 in {name}")
            if "### " not in body and "## " not in body:
                raise SystemExit(f"no headings in {name}")
            body_only = body.split("---", 2)[-1]
            wc = len(re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9']+", body_only))
            if wc < 2000:
                raise SystemExit(f"words {wc} < 2000 in {name}")
            (OUT / f"{name}.md").write_text(body, encoding="utf-8")
            report.append((name, len(title), len(desc), wc))
    counts = [row[-1] for row in report]
    print(f"wrote {len(report)} articles to {OUT}; words {min(counts)}–{max(counts)}")


if __name__ == "__main__":
    main()

