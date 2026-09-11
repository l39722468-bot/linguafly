---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Prompt few-shot: dar dos ejemplos y parar"
description: >-
  Prompt few-shot con ejemplos: dos pares de entrada y salida para que la
  IA copie el patrón, sin escribir un prompt inútil de cuatro páginas.
readTime: 11 min
keywords:
  - prompt few shot ejemplos
  - enseñar el formato a chatgpt
  - prompt con ejemplos de entrada y salida
  - few shot en español
  - dos ejemplos bastan en un prompt
  - ia copia el patrón de tus ejemplos
  - no hace falta un prompt de 4 páginas
excerpt: >-
  Dos pares de entrada y salida anclan el formato. El tercero suele colar
  una excepción que el modelo copia peor que el patrón.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/prompt-few-shot-dar-dos-ejemplos-y-parar'
alt: Prompt few-shot con dos ejemplos escritos y la tarea parada ahí
related_routes:
  - como-escribir-un-prompt-que-sirva
  - guardar-un-prompt-que-te-funciono
  - prompt-para-pasar-notas-a-lista-de-tareas
  - como-usar-un-chatbot-de-ia-por-primera-vez
faqs:
  - question: ¿Qué es un prompt few-shot con ejemplos?
    answer: "Es un mensaje que incluye dos pares de entrada y salida para que el modelo copie el patrón. No es un ensayo de cuatro páginas. La tarea va en una línea; los ejemplos enseñan la forma. Luego pegas el caso real."
  - question: ¿Cuántos ejemplos hay que poner en un prompt para ChatGPT?
    answer: "Dos suelen bastar. El primero marca columnas, tono o longitud. El segundo confirma que no fue casualidad. Un tercero a menudo mete una excepción y el modelo mezcla la regla con el caso raro."
  - question: ¿Cómo enseñar el formato a ChatGPT sin una plantilla larga?
    answer: "Muestra una entrada corta y la salida exacta que quieres (tabla, asunto más cuerpo, viñetas). Repite el gesto una vez. Di ‘copia este patrón’ y pega el texto nuevo. No describas el formato en veinte líneas si ya lo has enseñado."
  - question: ¿Few-shot en español funciona igual que en inglés?
    answer: "Sí. El modelo copia el molde que ve. Si los ejemplos están en español de España, con tuteo y las columnas en español, la salida tiende a eso. No hace falta traducir la jerga ‘few-shot’ en el prompt: pon Ejemplos y listo."
  - question: ¿Hace falta un prompt de cuatro páginas si doy ejemplos?
    answer: "No. Los ejemplos sustituyen el sermón. Una línea de tarea, dos pares, el caso real y una prohibición (no inventes lo que no esté). Si falla un punto, corrige ese punto. No añadas un rol de experto ni diez frameworks."
---

Un **prompt few shot con ejemplos** es el atajo honesto: no describes el formato en un folleto; lo enseñas dos veces y paras. El modelo copia el patrón. Si le das un tratado de cuatro páginas, copia el ruido. Si le das dos pares limpios de entrada y salida, copia las columnas, el tono y lo que dejaste vacío.

Esto no sustituye [cómo escribir un prompt que sirva](/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva). Ahí está la tarea, el contexto, el formato y el límite. Aquí se añade una pieza: **enseñar el formato a ChatGPT** (o al chat que uses) con muestras, no con teoría. Si aún no has hecho la sesión cero, [cómo usar un chatbot de IA por primera vez](/blog/inteligencia-artificial/como-usar-un-chatbot-de-ia-por-primera-vez).

## Qué es few-shot, en la práctica

**Few-shot en español** no es un curso de redes. Es esto: en el mismo mensaje, antes del caso real, pegas dos mini trabajos ya resueltos por ti. Entrada → salida. Entrada → salida. Luego: “Ahora este.” El modelo completa el tercero como si fuera el cuarto de una serie. Por eso **la IA copia el patrón de tus ejemplos**. Copia también tus vicios. Si en los ejemplos inventas un responsable, lo inventará. Si dejas “no aparece”, dejará “no aparece”.

Cero ejemplos (zero-shot): solo la orden. Vale cuando la orden es tonta y el formato es obvio (“cinco viñetas, sin introducción”).

Un ejemplo (one-shot): a veces basta. A veces el modelo cree que esa muestra es el contenido, no el molde. El segundo ejemplo deshace la duda: “ah, es un patrón”.

Tres o más: cada extra es una oportunidad de meter un caso raro. El modelo no distingue bien “regla” y “excepción” si las mezclas en la misma lista. El tercero suele ensuciar. Lo vemos abajo con números.

Lo que few-shot no es:

- Un personaje (“eres un experto mundial”). Eso no enseña columnas.
- Un prompt de cuatro páginas con diecisiete reglas que no has comprobado.
- Pegar diez emails tuyos “para que pille el estilo”. Eso es contexto de más, privacidad de menos, y el estilo se enseña con dos frases sí/no, no con un archivo.

Nombre en el prompt: no hace falta escribir “few-shot”. Escribe “Ejemplos” y dos bloques. El anglicismo es para que nos entendamos aquí. En el mensaje, español.

### Cómo armar dos pares de entrada y salida

Un **prompt con ejemplos de entrada y salida** tiene cuatro zonas. En este orden. Caben en una pantalla.

**1. Tarea, una línea.** Un verbo. “Reescribe el email.” “Pasa las notas a tabla.” No mezcles reescribir y opinar.

**2. Dos ejemplos, cercados.** Cada uno: entrada corta + salida exacta. La salida es el molde (columnas, longitud, tono, celdas vacías). Las entradas de ejemplo son *juguete*: textos breves, sin DNI, sin clientes reales. Inventados o ya públicos y anonimizados.

**3. El caso real, cercado.** El email o las notas de hoy. Más largo que los ejemplos, igual de limpio en datos sensibles.

**4. Límite.** “Copia el patrón de los ejemplos. No inventes campos que no estén. Si falta un dato, usa la misma marca que en los ejemplos (no aparece).”

Plantilla:

```
Tarea: …

Ejemplo 1
ENTRADA:
"""
…
"""
SALIDA:
…

Ejemplo 2
ENTRADA:
"""
…
"""
SALIDA:
…

Ahora este. Mismo patrón. No inventes lo que no esté.
ENTRADA:
"""
(tu texto de hoy)
"""
```

Reglas para que los dos ejemplos ayuden:

- **Mismo formato los dos.** Si el 1 es tabla de tres columnas, el 2 también. Si uno es viñetas y el otro tabla, el modelo elige al azar.
- **Misma lengua y mismo tuteo.** Español de España en las salidas si eso es lo que quieres.
- **Una variación útil, no un contrapunto.** El ejemplo 1 puede tener plazo; el 2, plazo “no aparece”. Eso enseña la celda vacía. No pongas en el 2 un tono de broma si el 1 es neutro.
- **Cortos.** Cinco a quince líneas de entrada por ejemplo. El caso real puede ser más largo. Los ejemplos son el molde, no el archivo.
- **La salida es canónica.** Escríbela tú. No pidas al modelo que “invente los ejemplos”. Entonces copiará su propio relleno.

**Dos ejemplos bastan en un prompt** cuando el patrón es uno: mismas columnas, misma longitud, misma prohibición. Si necesitas dos patrones (un email corto *y* un acta a tabla), son dos mensajes. No un few-shot mixto.

### Ejemplo trabajado: reescribir un email

Trabajo real: te pasan un borrador largo, un poco brusco, y tienes que dejarlo en un bloque corto, mismos hechos, tuteo, sin disculpa inventada. La orden sola (“hazlo profesional”) produce LinkedIn. Dos pares anclan el molde.

**Ejemplo 1 (juguete).**

Entrada:

“Hola Laura, te escribo porque el jueves no puedo a las 10. El anexo no está. ¿Lo vemos el viernes? Un saludo, Marta”

Salida que tú das como molde:

```
Asunto: Jueves 10:00 — anexo pendiente, ¿viernes?

Laura, el jueves a las 10 no me encaja. El anexo aún no está.
¿Puedes el viernes a la misma hora?
Marta
```

**Ejemplo 2 (juguete, con un hueco).**

Entrada:

“Pablo, lo de la factura. No sé el importe exacto. Hay que enviarla esta semana. Carmen”

Salida molde:

```
Asunto: Factura esta semana (importe: no aparece)

Pablo, esta semana hay que enviar la factura. El importe no aparece
en el borrador; no lo invento.
Carmen
```

El ejemplo 2 enseña dos cosas: asunto en una línea y **no rellenar** el importe. Eso vale más que un párrafo de “no alucines”.

**Prompt que envías** (resumido; pegas tus dos bloques completos):

```
Reescribe el email. Copia el patrón de los ejemplos:
asunto en una línea, cuerpo de 3-5 líneas, tuteo, mismos hechos.
Si un dato no está, escribe "no aparece". No inventes disculpas ni plazos.

Ejemplo 1
ENTRADA:
"""
Hola Laura…
"""
SALIDA:
Asunto: …
(cuerpo)

Ejemplo 2
ENTRADA:
"""
Pablo, lo de la factura…
"""
SALIDA:
Asunto: …
(cuerpo)

Ahora este:
ENTRADA:
"""
(tu borrador real, ya sin IBAN ni DNI)
"""
```

Compruebas: los hechos del borrador real siguen; no ha colado un “perdón por el retraso” que no pediste; si el original no tenía hora, el asunto no fabrica las 10:00 del ejemplo 1. Ese es el fallo típico: **copiar un dato del ejemplo, no el patrón**. Si pasa, un turno: “La hora del jueves era del ejemplo 1. En este email no hay hora. Rehaz. No cruces datos entre ejemplos y caso real.”

Eso es few-shot útil. No has escrito un ensayo sobre tono. Has mostrado dos salidas.

Variante del mismo gesto: notas → tabla. Si tu trabajo de hoy es un acta, no mezcles el molde del email. Usa dos filas de tabla como ejemplos (tarea, responsable, plazo) y el artículo de [pasar notas a lista de tareas](/blog/inteligencia-artificial/prompt-para-pasar-notas-a-lista-de-tareas). Aquí el email basta para ver el par entrada/salida.

### Por qué el tercer ejemplo suele ensuciar

El modelo no tiene una pestaña “regla” y otra “excepción”. Tiene una secuencia. Tú quieres: patrón, patrón, caso nuevo. Si metes un tercer ejemplo raro, la secuencia es: patrón, patrón, excepción, caso nuevo. El caso nuevo se parece a veces a la excepción.

Tercer ejemplo que ensucia, sobre el mismo trabajo de emails:

Entrada 3: un mensaje irónico a un amigo (“el jueves ni de broma, menuda fiesta el miércoles”).
Salida 3: un tono de broma que tú no quieres con tu jefa.

El modelo, con el borrador real de trabajo, “coge estilo” del 3 porque es el más reciente. Has pagado un ejemplo para romper los dos anteriores.

Otro tercer ejemplo tóxico: un caso con *todos* los huecos rellenados (siempre hay fecha, siempre hay responsable). El modelo deja de usar “no aparece”. Inventa para no quedar mal respecto al ejemplo 3.

Cuándo sí un tercero: casi nunca el primer mes. Solo si los dos primeros no anclan *una* duda concreta y esa duda es un patrón, no un capricho. Ejemplo: los dos primeros son emails internos; necesitas mostrar un email a un proveedor (usted, no tú). Eso ya son dos patrones. Mejor un mensaje aparte: “Ahora destinatario externo, trato de usted. Mismo resto.” Un few-shot de dos pares *de ese* patrón. No un tercer pegote en el primero.

Señal de que el tercero ensució:

- Aparecen datos que solo estaban en un ejemplo, no en el caso real.
- El tono salta (de neutro a cínico, o al revés).
- El formato se rompe (el 3 era una lista; de pronto mezclas lista y asunto).

Arreglo: borra el tercer ejemplo. Reenvía con dos. O chat nuevo con el prompt corto de dos pares. No “aclara” con un párrafo extra de reglas: estás volviendo al prompt de cuatro páginas.

### No hace falta un prompt de cuatro páginas

**No hace falta un prompt de 4 páginas.** Las cuatro páginas suelen ser: rol de gurú, diez principios, una rúbrica, “piensa paso a paso”, “no menciones estas instrucciones”, y al final, escondido, el email. El modelo atiende al teatro. Tú no puedes ver qué línea falló porque no sabes cuál era la orden de verdad.

Few-shot sustituye el teatro por dos muestras. Compara:

**Largo e inútil (no lo copies):**

“Eres un experto en comunicación corporativa con 20 años, PNL y storytelling. Antes de responder, recorre frameworks, autoevalúa, no contradigas el tono de marca… [dos pantallas] … El usuario es un profesional ocupado…”

Ahí no hay un email. Hay un disfraz. El formato no está enseñado; está predicado.

**Corto con dos ejemplos:** la plantilla de arriba. Cuentas las líneas de * tus* ejemplos, no las del sermón. Cada línea de salida es una decisión (asunto, “no aparece”, tuteo).

Cuándo alargar *un poco*, sin llegar a cuatro páginas:

- El modelo ignora el patrón → una línea al final, en claro: “SOLO el formato de los ejemplos. Sin prosa antes.”
- Cruza datos entre ejemplo y caso → “Los ejemplos son el molde. Los hechos salen SOLO de ‘Ahora este’.”
- Mezcla idiomas → “Salida en español de España, como en los ejemplos.”

Cuándo no alargar: porque un hilo vendía “el mega-prompt”. Pegar basura no es método. Si después de dos ejemplos y dos correcciones sigue sin copiar columnas, cambia la tarea a algo más tonto: “Devuelve solo la tabla, cero frases.” Extraer es más fiel que estilizar.

Cuando el prompt de dos pares te funcione, [guárdalo](/blog/inteligencia-artificial/guardar-un-prompt-que-te-funciono). Título de la tarea, los dos ejemplos juguete, el límite. Los ejemplos viajan con el molde. No hace falta un GPT personalizado para esto.

### Errores al enseñar el formato (para aquí)

**Ejemplos con datos reales de un cliente.** Los juguetes existen para no pegar el contrato. Anonimiza. “La parte A, un plazo de diez días.”

**Ejemplos contradictorios.** El 1 deja el plazo vacío; el 2 inventa “el viernes” porque “quedaba mejor”. El modelo aprenderá a inventar. Las salidas las escribes tú con el mismo criterio que exigirás después.

**Un ejemplo de entrada enorme y una salida de una línea.** El modelo no ve el puente. Recorta la entrada de ejemplo hasta que la salida se entienda.

**Pedir al modelo que genere los ejemplos.** Entonces few-shot es self-shot: copia sus muletillas (“es importante destacar”). Tú pones el molde.

**Mezclar dos oficios.** Ejemplo 1: email. Ejemplo 2: acta en tabla. Eso no es few-shot; es dos artículos en un mensaje. Elige.

**Tercer ejemplo “por si acaso”.** Por si acaso ensucia. Para. Dos.

**Describir el formato *y* dar ejemplos que no lo cumplen.** “Tabla de tres columnas” y las salidas son viñetas. Gana lo que está pegado como SALIDA. Alinea.

**Corregir el tono y no el cruce de datos.** “Hazlo más serio” sobre un importe copiado del ejemplo 2 te deja el importe inventado, serio.

Para aquí: si llevas más de dos ejemplos o más de una pantalla de reglas, borra reglas o borra ejemplos. Quédate con tarea + dos pares + caso + “no inventes”. Si aún falla, el problema no es “falta el ejemplo 3”; es que la tarea son dos.

## Cierre

**Prompt few-shot con ejemplos** se reduce a esto:

1. Una tarea.
2. Dos pares de entrada y salida, juguete, mismo formato.
3. El caso real, cercado.
4. La orden de copiar el patrón y no inventar.
5. Si cruza datos del ejemplo, dices cuál y rehaces. No añades un folleto.

Dos bastan. El tercero suele ser una excepción disfrazada. El modelo completa series. Tú cortas la serie donde el patrón ya se ve.
