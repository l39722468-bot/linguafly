"""Cuerpo de las guías y cuadernos C2, en torno a 2000 palabras.

Solo cita las frases ya fijadas en la unidad. No inventa notas de corte,
precios ni criterios oficiales del Cambridge C2.
"""

from __future__ import annotations

import re

WORD_RE = re.compile(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9']+")
MIN_WORDS = 2000
MAX_WORDS = 2350
HARD_MAX = 2600

STOP = {
    "about", "above", "after", "again", "against", "already", "also", "although",
    "always", "among", "another", "because", "been", "before", "being", "between",
    "both", "cannot", "could", "does", "doing", "during", "each", "every", "from",
    "have", "having", "into", "just", "more", "most", "much", "must", "never",
    "only", "other", "over", "same", "should", "some", "such", "than", "that",
    "their", "them", "then", "there", "these", "they", "this", "those", "through",
    "under", "until", "very", "were", "what", "when", "where", "which", "while",
    "with", "would", "your", "will", "shall", "the", "and", "for", "not", "but",
    "you", "was", "are", "had", "has", "his", "her", "she", "him", "its", "our",
    "who", "how", "why", "all", "any", "can", "may", "did", "one", "two", "now",
    "out", "off", "too", "nor", "yet", "per",
}


def gl(text: str) -> str:
    return text[:1].lower() + text[1:]


def nwords(text: str) -> int:
    return len(WORD_RE.findall(text))


def join(parts: list[str]) -> str:
    text = "\n\n".join(part.strip() for part in parts if part and part.strip())
    return re.sub(r"\n{3,}", "\n\n", text).rstrip() + "\n"


def kwt(unit) -> list[dict]:
    return [ex for ex in unit["exercises"] if ex["kind"] == "kwt"]


def gaps(unit) -> list[dict]:
    return [ex for ex in unit["exercises"] if ex["kind"] == "gap"]


def dot(text: str) -> str:
    text = " ".join(text.split())
    if not text.endswith((".", "?", "!")):
        text += "."
    return text


def sentence_with(text: str, word: str) -> str:
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    for part in parts:
        if re.search(rf"\b{re.escape(word)}\b", part, flags=re.I):
            return dot(part)
    return dot(text)


def content_words(unit) -> list[str]:
    blob = " ".join([unit["model"], *[ex["answer"] for ex in unit["exercises"]]])
    found, seen = [], set()
    for raw in re.findall(r"[A-Za-z][A-Za-z']+", blob):
        low = raw.lower()
        if low in STOP or len(low) < 7 or low in seen:
            continue
        seen.add(low)
        found.append(raw)
    found.sort(key=len, reverse=True)
    return found[:6]


def assemble(blocks: list[str], deepen) -> str:
    usable = [block for block in blocks if block and block.strip()]
    ending = usable[-1]
    chosen: list[str] = []
    for block in usable:
        trial = chosen + [block]
        if chosen and nwords(join(trial)) > MAX_WORDS and nwords(join(chosen)) >= MIN_WORDS:
            break
        chosen.append(block)
    if ending not in chosen:
        chosen.append(ending)
    step = 0
    while nwords(join(chosen)) < MIN_WORDS and step < 8:
        chosen.insert(-1, deepen(step))
        step += 1
    text = join(chosen)
    if nwords(text) > HARD_MAX and ending in chosen:
        # Quita el bloque anterior al cierre hasta entrar en el tope.
        while nwords(text) > HARD_MAX and len(chosen) > 2:
            chosen.pop(-2)
            text = join(chosen)
    if nwords(text) < MIN_WORDS:
        raise SystemExit(f"under {MIN_WORDS} words: {nwords(text)}")
    return text


def exam_line(n: int) -> str:
    if n >= 58:
        return (
            "Esta unidad no inventa la nota de corte, el precio de la matrícula ni un baremo "
            "que Cambridge no haya publicado para una convocatoria concreta."
        )
    return (
        "La guía no fija una nota de corte: la publica el centro examinador en cada convocatoria "
        "y no hace falta memorizar una cifra de segunda mano."
    )


def theory_body(unit, module: str, prev_link: str, next_link: str, work: str) -> str:
    n = unit["n"]
    grammar = unit["grammar"]
    tema = unit["tema"]
    formula = unit["formula"]
    items = kwt(unit)
    holes = gaps(unit)
    teach = unit["teach"]
    blocks = [
        f"La **Unidad {n}** del curso C2 pertenece al módulo *{module}* y trabaja **{gl(grammar)}**, centrada en {tema}.",
        f"> **Cuaderno con soluciones:** [Ejercicios de la Unidad {n}](/blog/curso-c2/{work})  \n"
        f"> **Antes:** {prev_link}  \n"
        f"> **Siguiente:** {next_link}  \n"
        "> **Curso:** [Inglés C2](/blog/curso-c2)",
        f"## Unidad {n}: {grammar}",
        teach[0],
        f"Ese efecto tiene que verse en {tema}, que es el asunto de la unidad {n}, sin cambiar el hecho. "
        f"Si la estructura no mueve el foco, sobra. Si al moverlo cambias el agente, el tiempo o la certeza, también sobra: ya no es la misma proposición. "
        f"Un párrafo de este módulo se reconoce porque el relieve es deliberado y el dato permanece.",
        "### Qué problema resuelve",
        teach[1] if len(teach) > 1 else "",
        f"La fórmula de trabajo es **{formula}**. Hay que poder señalar cada pieza en la frase terminada. "
        f"Si falta una, la oración puede ser inglesa y no pertenecer a {gl(grammar)}. "
        f"Centrar el texto en {tema} no disculpa una fórmula a medias.",
        teach[2] if len(teach) > 2 else "",
        "### La frase neutra y la frase marcada",
        "Cada pareja conserva el hecho y cambia el relieve. La primera es la que escribirías si no quisieras destacar nada. La segunda es la que pide esta unidad.",
    ]
    rows = ["| Frase neutra | Versión de la unidad |", "| --- | --- |"]
    for ex in items:
        rows.append(f"| {ex['src'].replace('|', '/')} | {ex['answer'].replace('|', '/')} |")
    blocks.append("\n".join(rows))
    blocks.append(
        f"La tabla no añade datos sobre {tema}. Muestra que **{gl(grammar)}** reempaqueta una información que ya estaba. "
        f"En este módulo, empaquetar decide qué elemento parece causa, cuál parece fondo y cuál queda abierto a discusión."
    )

    comments = [
        lambda ex: (
            f"### La clave {ex['key']}, pieza a pieza\n\n"
            f"Parte *{dot(ex['answer'])}* y ponla al lado de *{dot(ex['src'])}* {ex['why']} "
            f"La clave **{ex['key']}** ocupa el sitio que la fórmula **{formula}** le reserva. "
            f"Lo que queda alrededor tiene que seguir nombrando a los mismos participantes y el mismo tiempo. "
            f"Si al reconstruirla añades un juicio que la frase neutra no contenía, la clave se ha usado para opinar de más sobre {tema}, no para transformar. "
            f"Tapa la versión marcada y escríbela otra vez solo con la neutra y **{ex['key']}**. "
            f"Si no sale, la laguna no es de léxico: es la pieza de {gl(grammar)} que todavía no es automática."
        ),
        lambda ex: (
            f"### La clave {ex['key']} frente al error habitual\n\n"
            f"Otro fallo de la unidad, en una frase distinta, es este: {unit['errors'][0]} "
            f"No se arregla copiando el ejemplo de **{ex['key']}**. Ese ejemplo sale de *{dot(ex['src'])}* y llega a *{dot(ex['answer'])}* {ex['why']} "
            f"La distancia entre el fallo y el acierto es pequeña y no está en el vocabulario sobre {tema}. "
            f"Está en terminar **{formula}** o en volver al orden neutro. Las dos salidas son honestas. "
            f"Una frase que empieza como C2 y sigue como B1 es la que un corrector marca, porque suena a estructura avanzada y no lo es."
        ),
        lambda ex: (
            f"### Qué entiende quien lee {ex['key']} en {tema}\n\n"
            f"*{dot(ex['src'])}* informa. *{dot(ex['answer'])}* informa lo mismo y además dice qué pieza no se puede saltar. {ex['why']} "
            f"En un texto sobre {tema}, ese arranque le ahorra al lector la pregunta de por dónde va el argumento. "
            f"Si el párrafo anterior ya había puesto ese foco en primer plano, repetir **{ex['key']}** no suma énfasis: lo gasta. "
            f"En ese caso la frase neutra es la mejor opción, y {gl(grammar)} se reserva para el corte siguiente."
        ),
        lambda ex: (
            f"### Decir {ex['key']} en voz alta\n\n"
            f"Lee primero *{dot(ex['src'])}* y después *{dot(ex['answer'])}* {ex['why']} "
            f"En la neutra el oído llega tarde al elemento que la unidad quiere destacar. En la marcada, ese elemento obliga al resto a justificarse. "
            f"Para un minuto de speaking sobre {tema} basta una de las dos, no las cuatro transformaciones seguidas. "
            f"Si las encadenas, el oyente oye un ejercicio, no un argumento. Deja que **{formula}** aparezca una vez y que las frases vecinas vuelvan al orden habitual."
        ),
    ]
    for i, ex in enumerate(items):
        blocks.append(comments[i % len(comments)](ex))

    blocks.append("### Huecos: una sola pieza")
    blocks.append(
        f"El hueco no invita a un sinónimo más elegante. Invita a la pieza sin la cual **{formula}** no se sostiene. "
        f"El resto de la oración ya está escrito, y {tema} también."
    )
    hole_notes = [
        "Si pruebas otra palabra gramatical, la frase puede seguir en pie y dejar de ser un ejemplo de esta unidad.",
        "La pista no es el tema, que ya conoces, sino el sitio vacío de la fórmula.",
        "Cuando dudes, lee la fórmula en voz alta y mira qué casilla sigue sin palabra.",
    ]
    for i, ex in enumerate(holes):
        blocks.append(
            f"En el hueco {i + 1} la oración es *{ex['src']}* y la pieza es **{ex['answer']}**. {ex['why']} "
            f"{hole_notes[i % len(hole_notes)]}"
        )

    blocks.append("### Dos errores que parecen de nivel alto")
    for i, err in enumerate(unit["errors"]):
        if i == 0:
            blocks.append(
                f"Primer error de la unidad {n}: {err} "
                f"No falla el léxico sobre {tema}. Falla una pieza de **{formula}**. "
                f"Corrige solo esa pieza. No aproveches para abrir otro ejemplo."
            )
        else:
            blocks.append(
                f"Segundo error: {err} "
                f"La reparación tiene que conservar el agente, el objeto y el tiempo. "
                f"{grammar} no es una licencia para empezar un párrafo distinto sobre {tema}."
            )

    passage = " ".join(dict.fromkeys(dot(ex["answer"]) for ex in items))
    blocks.append(f"### Un borrador para oír {gl(grammar)}")
    blocks.append(dot(unit["model"]) + " " + passage)
    blocks.append(
        f"Esas frases no forman todavía un ensayo. Forman un borrador en el que cada oración marcada cumple la fórmula o deja ver {gl(grammar)} en {tema}. "
        f"Léelo de corrido para notar si el foco se repite, y después separa una frase que tú dejarías en orden neutro. "
        f"Esa decisión, más que acumular claves, es lo que distingue un texto del módulo *{module}* de una lista de clase."
    )
    blocks.append("### Cuándo no usar la estructura")
    blocks.append(
        f"No toda oración sobre {tema} tiene que exhibir {gl(grammar)}. "
        f"Deja la frase neutra cuando el foco ya está claro, cuando el párrafo acumula marcas o cuando el registro pide llaneza. "
        f"Un buen tramo de la unidad {n} lleva una o dos frases con **{formula}** y el resto en orden habitual. "
        f"{exam_line(n)} "
        f"Lo que sí puedes entrenar es el gesto del Use of English: la palabra clave no se cambia, el sentido no se amplía "
        f"y la transformación se queda en la longitud que pide la tarea, a menudo entre tres y ocho palabras."
    )

    words = content_words(unit)
    if words:
        blocks.append(f"### Palabras que ya viven en los ejemplos")
        blocks.append(
            f"No son una lista para memorizar aparte. Salen de las frases de la unidad {n} y conviene recuperarlas al escribir sobre {tema}, pegadas a {gl(grammar)}."
        )
        for raw in words:
            home = next((ex for ex in items if raw.lower() in (ex["answer"] + ex["src"]).lower()), None)
            sample = sentence_with(home["answer"] if home else unit["model"], raw)
            blocks.append(
                f"**{raw}** está en *{sample}* "
                f"Si la usas en un párrafo propio, mantenla en el mismo papel. "
                f"No cambies **{raw}** por un sinónimo más alto: la fórmula **{formula}** ya hace el trabajo de nivel, y un sinónimo inventado suele mover el hecho."
            )

    blocks.append("### Antes de abrir el cuaderno")
    blocks.append(
        "\n".join(
            [
                f"- Puedo decir {gl(grammar)} con mis palabras y escribir **{formula}** sin mirar.",
                f"- En cada pareja, {tema} no cambia de hecho: cambia de relieve.",
                "- Reconozco los dos errores y la pieza que les falta.",
                "- En el borrador soy capaz de señalar una frase que yo dejaría neutra.",
                f"- Sé que el cuaderno de la unidad {n} va a continuación y que la solución va tapada.",
            ]
        )
    )
    blocks.append(
        f"Resuelve el [cuaderno de la Unidad {n}](/blog/curso-c2/{work}) con las soluciones cerradas. "
        f"Si un error se repite, reescribe solo esa frase y señala la fórmula antes de seguir con {next_link}."
    )

    def deepen(step: int) -> str:
        ex = items[step % len(items)]
        return (
            f"### Otro pase por {ex['key']}\n\n"
            f"Sin mirar arriba, pasa de *{dot(ex['src'])}* a *{dot(ex['answer'])}* {ex['why']} "
            f"La defensa de esa frase, aplicada a {tema}, cabe en una línea: el hecho es el mismo y **{ex['key']}** obliga a **{formula}**. "
            f"Si necesitas un dato que la frase neutra no tiene, estás en otro texto. Bórralo. "
            f"La unidad {n} del módulo *{module}* premia esa precisión."
        )

    return assemble(blocks, deepen)


def workbook_body(unit, module: str, theory: str, next_link: str) -> str:
    n = unit["n"]
    grammar = unit["grammar"]
    tema = unit["tema"]
    formula = unit["formula"]
    items = kwt(unit)
    holes = gaps(unit)
    hints = [
        f"Localiza qué elemento de la frase de partida tiene que ocupar el sitio que **{formula}** reserva, y encaja **{{key}}** sin convertirla en otra palabra.",
        "No traduzcas palabra por palabra. Si tu borrador añade un juicio que la partida no contiene, tácalo y empieza de nuevo.",
        f"Cuenta las piezas de {gl(grammar)}. Si oyes la clave y no oyes la fórmula completa, la frase todavía está a medias.",
        "Escribe la neutra en una línea y la marcada debajo. El hecho tiene que poder señalarse en las dos.",
    ]
    blocks = [
        f"Este cuaderno practica la **Unidad {n}** del módulo *{module}*: *{grammar}*, centrada en {tema}.",
        f"> **Guía:** [Unidad {n}: {grammar}](/blog/curso-c2/{theory})  \n> **Curso:** [Inglés C2](/blog/curso-c2)",
        "Escribe cada respuesta con el desplegable cerrado. Abrirlo antes de escribir anula el ítem, aunque la explicación se entienda.",
        f"## Qué se corrige en la unidad {n}",
        f"La fórmula que hay que reconstruir es **{formula}**. La palabra clave no se modifica. El hueco pide una sola pieza. "
        f"El writing pide que la estructura aparezca en {tema}, no en una frase suelta sin contexto. "
        f"{exam_line(n)} "
        f"Una estructura elegante que cambia el agente, el tiempo o la certeza está mal resuelta.",
        unit["teach"][0],
        "## Lección 1 — Transformaciones",
        "La segunda frase debe significar lo mismo que la primera. Usa la clave tal cual. Quédate entre tres y ocho palabras cuando la estructura lo permita.",
    ]
    for i, ex in enumerate(items):
        hint = hints[i % len(hints)].replace("{key}", ex["key"])
        blocks.append(f"### Ejercicio {i + 1}")
        blocks.append(f"**Frase de partida:** {dot(ex['src'])}")
        blocks.append(f"**Palabra clave:** {ex['key']}")
        blocks.append(f"**Pista.** {hint}")
        blocks.append(
            "<details><summary>Ver solución</summary>\n\n"
            f"**{dot(ex['answer'])}**\n\n"
            f"{ex['why']} La partida era *{dot(ex['src'])}* "
            f"Si tu versión del ítem **{ex['key']}** conserva ese hecho y la fórmula **{formula}**, cuéntala como válida aunque un modificador no ocupe el mismo sitio que en el modelo. "
            f"Si en **{ex['key']}** falta el auxiliar, el foco o el nexo de {gl(grammar)}, el ítem no está resuelto. "
            f"Tapa la solución y escríbela otra vez antes de seguir.\n\n"
            "</details>"
        )

    blocks.append("## Lección 2 — Huecos")
    blocks.append(f"Una pieza por hueco, la que completa **{formula}**. Un sinónimo elegante que no pertenece a la fórmula no cuenta.")
    for i, ex in enumerate(holes):
        blocks.append(f"### Ejercicio {len(items) + i + 1}")
        blocks.append(ex["src"])
        gap_hints = [
            f"Lee la oración y di qué relación pide {gl(grammar)} en {tema}. Esta casilla pertenece a **{formula}**.",
            f"Léela en voz alta con **{formula}** delante. Si la palabra no ocupa una casilla de esa fórmula, no es la de este hueco.",
            f"No busques un sinónimo sobre {tema}. Busca la pieza que le falta a **{formula}** en esta oración.",
        ]
        blocks.append(f"**Pista.** {gap_hints[i % len(gap_hints)]}")
        blocks.append(
            "<details><summary>Ver solución</summary>\n\n"
            f"**{ex['answer']}**\n\n"
            f"{ex['why']} Con **{ex['answer']}** dentro, la frase tiene que leerse de un tirón y seguir siendo de la unidad {n}. "
            f"Si cambia el tiempo o el agente, no era esa pieza.\n\n"
            "</details>"
        )

    blocks.append("## Lección 3 — Corregir sin cambiar de asunto")
    blocks.append(f"Estas frases intentan {gl(grammar)} y se quedan a medias. No cambies de qué hablan.")
    for i, err in enumerate(unit["errors"]):
        blocks.append(f"### Ejercicio {len(items) + len(holes) + i + 1}")
        blocks.append(err)
        blocks.append(
            f"**Pista {i + 1}.** Subraya, en esta frase y no en la otra, la pieza que falta de **{formula}**. No abras un párrafo nuevo sobre {tema}."
        )
        blocks.append(
            "<details><summary>Ver una reparación</summary>\n\n"
            f"El diagnóstico ya está en el enunciado: {err} "
            f"En la reparación {i + 1}, quédate con la versión que el enunciado propone y comprueba que **{formula}** queda completa, con el mismo agente y el mismo tiempo. "
            f"Si tu corrección necesita más contexto, es demasiado larga: deja solo la estructura de {gl(grammar)}.\n\n"
            "</details>"
        )

    passage_bits = []
    blob = ""
    for bit in [dot(unit["model"])] + [dot(ex["answer"]) for ex in items]:
        if bit.lower() in blob.lower():
            continue
        passage_bits.append(bit)
        blob += " " + bit
    passage = " ".join(passage_bits)
    blocks.append(f"## Lección 4 — Lectura sobre {tema}")
    blocks.append(passage)
    blocks.append("Responde por escrito, sin volver a la lección 1 más de lo necesario.")
    qas = [
        ("¿Cuál es la primera oración del texto?", passage_bits[0], "Así compruebas que comentas este borrador."),
        (f"Cita la oración que usa la clave {items[0]['key']}.", dot(items[0]["answer"]), items[0]["why"]),
        (f"Escribe la fórmula de la unidad {n}.", formula, f"Si no sale de memoria, {gl(grammar)} todavía no está integrada."),
        ("Escribe la versión neutra del ejercicio 1.", dot(items[0]["src"]), "Volver a la neutra separa el relieve del hecho."),
    ]
    for i, (q, a, why) in enumerate(qas, 1):
        blocks.append(f"### Pregunta {i}")
        blocks.append(q)
        blocks.append(
            "<details><summary>Ver respuesta</summary>\n\n"
            f"**{a}**\n\n{why}\n\n</details>"
        )

    blocks.append("## Lección 5 — Writing")
    blocks.append(
        f"Escribe entre 140 y 180 palabras sobre {tema}. Usa {gl(grammar)} tres veces, con **{formula}** reconocible, "
        f"y evita los dos errores de la lección 3. El resto puede ir en orden neutro. "
        f"Si todas las frases están marcadas, el texto parece una lista."
    )
    blocks.append(
        "<details><summary>Modelo</summary>\n\n"
        f"**Breve.** {dot(unit['model'])}\n\n"
        f"**Ampliado con frases ya resueltas de la unidad {n}.** {passage}\n\n"
        f"No lo copies. Señala tres frases marcadas y al menos dos que informarían igual en orden neutro. "
        f"Si no encuentras esas dos, el párrafo está sobrecargado para el módulo *{module}*.\n\n"
        "</details>"
    )
    blocks.append(
        "En una redacción propia, cada uso de la estructura tiene que ir detrás de una frase que ya haya contado el hecho sin énfasis. "
        f"La marca de {gl(grammar)} es el segundo paso, no el primero. "
        + " ".join(f"La clave **{ex['key']}** puede ocupar ese segundo paso, como en *{dot(ex['answer'])}*" for ex in items[:3])
    )

    blocks.append("## Lección 6 — En voz alta")
    blocks.append(f"Un minuto, sin leer. El asunto es {tema}. La estructura es {gl(grammar)}.")
    blocks.append(
        f"**Tarea 1.** Di la fórmula **{formula}** y cierra con *{dot(items[0]['answer'])}* Añade, en español, por qué el hecho no ha cambiado."
    )
    blocks.append(
        f"**Tarea 2.** Corrige en voz alta este intento: {unit['errors'][0]} Para cuando la fórmula esté completa. No añadas una anécdota."
    )
    second = dot(items[1]["answer"]) if len(items) > 1 else dot(unit["model"])
    third = dot(items[2]["answer"]) if len(items) > 2 else dot(items[0]["answer"])
    blocks.append(
        f"**Tarea 3.** Resume {tema} en cuatro frases. Dos pueden apoyarse en *{second}* y en *{third}* Las otras dos dilas en orden neutro."
    )
    blocks.append(
        "### Rúbrica\n\n"
        + "\n".join(
            [
                f"- Cada transformación conserva el hecho de la partida sobre {tema}.",
                f"- La clave no cambia y **{formula}** se puede señalar.",
                "- Cada hueco tiene una pieza, no un sintagma nuevo.",
                "- Las correcciones no cambian de agente ni de tiempo.",
                f"- El writing tiene tres usos de {gl(grammar)}, no ocho.",
                "- Has podido decir la fórmula sin leerla.",
            ]
        )
    )
    blocks.append(
        f"Si fallan dos casillas de la misma fórmula, no avances. Repite esos ítems. "
        f"Luego abre la [guía de la Unidad {n}](/blog/curso-c2/{theory}) solo para comprobar la fórmula y sigue con {next_link}."
    )

    def deepen(step: int) -> str:
        ex = items[step % len(items)]
        return (
            f"### Pase extra {step + 1}\n\n"
            f"Tapa la lección 1 y reescribe *{dot(ex['src'])}* con **{ex['key']}**. La llegada es *{dot(ex['answer'])}* {ex['why']} "
            f"No mejores el contenido sobre {tema}. En el módulo *{module}* el contenido ya está dado. "
            f"Si tardas más de un minuto, anota qué pieza de **{formula}** se te había olvidado y escríbela otra vez."
        )

    return assemble(blocks, deepen)
