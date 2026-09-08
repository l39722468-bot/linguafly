---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Cómo escribir un prompt que sirva"
description: >-
  Cómo escribir un prompt que sirva: tarea, contexto, formato y un ejemplo
  que puedas copiar. Sin plantillas de 40 líneas ni trucos de influencer.
readTime: 11 min
keywords:
  - cómo escribir un prompt
  - qué es un prompt de ia
  - estructura de un buen prompt
  - prompt para chatgpt principiantes
  - cómo pedir algo a una ia
  - instrucciones claras para un chatbot
  - prompt corto que funciona
excerpt: >-
  Un prompt que sirve cabe en un párrafo: la tarea, el texto, el formato y
  lo que no debe inventar. Luego se itera el punto que falla, no la vida.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva'
related_routes:
  - que-es-la-inteligencia-artificial-sin-ciencia-ficcion
  - como-usar-un-chatbot-de-ia-por-primera-vez
  - privacidad-al-usar-ia-que-no-pegar-nunca
faqs:
  - question: ¿Qué es un prompt de IA, en una frase?
    answer: "Es el mensaje que le escribes al modelo: la tarea, el contexto y el formato. No es un hechizo. No mejora porque le pongas ‘actúa como un experto mundial’ al principio."
  - question: ¿Cómo escribir un prompt que no se vaya por las ramas?
    answer: "Cuatro piezas: qué tiene que hacer, con qué texto, en qué formato, y qué tiene prohibido inventar. Una tarea por mensaje. Si falla un punto, corriges ese punto. No añadas un rol de gurú de veinte líneas."
  - question: ¿Hace falta una plantilla larga para ChatGPT?
    answer: "No. Un prompt corto que funciona suele superar a una plantilla de 40 líneas copiada de un hilo. La plantilla rellena el silencio; tú necesitas un entregable. Empieza en cinco líneas y solo alarga si un fallo concreto lo pide."
  - question: ¿Cómo pedir algo a una IA si no sé el tono?
    answer: "Di la audiencia y un ejemplo de frase que sí y una que no. ‘Va a mi jefa, tono neutro. No empieces por Encantada de saludarte si ya nos escribimos cada día.’ El modelo copia el molde mejor que una etiqueta vaga como ‘profesional pero cercano’."
  - question: ¿Qué hago si el primer prompt sale mal?
    answer: "No empieces de cero salvo que el hilo esté sucio. Señala la línea que falla (‘el plazo no está en el texto’) y pide rehacer solo esa parte. Guarda el prompt que al final sirvió en un documento tuyo, no en la cabeza."
---

**Cómo escribir un prompt** es el oficio de este artículo: una orden que el modelo puede ejecutar y tú puedes comprobar. No es coleccionar plantillas. No es hablarle “como a un humano sensible”. Es **instrucciones claras para un chatbot**: tarea, contexto, formato, límite.

Si aún no has hecho la sesión cero, hazla antes: [cómo usar un chatbot de IA por primera vez](/blog/inteligencia-artificial/como-usar-un-chatbot-de-ia-por-primera-vez). Si no sabes qué hay detrás de la ventana, [qué es la inteligencia artificial (sin ciencia ficción)](/blog/inteligencia-artificial/que-es-la-inteligencia-artificial-sin-ciencia-ficcion). Aquí se escribe el mensaje.

## Qué es un prompt de IA

**Qué es un prompt de IA:** el texto que envías. Incluye lo que pegas (un email, un párrafo) y lo que pides (“resúmelo en cinco viñetas”). Todo eso es el prompt. El modelo no tiene otra telepatía.

No es:

- Un sistema mágico de “palabras de poder”.
- Un personaje que tienes que alimentar con “eres un experto con 20 años”.
- Un documento de 40 líneas que copiaste de un influencer y no has leído.

El prompt hace tres trabajos, y solo tres:

1. **Delimita la tarea.** Resumir no es traducir. Extraer fechas no es opinar.
2. **Suministra el material.** El modelo no tiene tu PDF hasta que se lo das. Si no se lo das, rellenará con estadística de internet. Eso se llama alucinación cuando lo afirma como si estuviera en tu texto.
3. **Impone forma.** Lista, tabla, máximo de palabras, idioma. Sin forma, escribe un ensayo. Los ensayos del modelo están llenos de “es importante destacar”.

Un **prompt para ChatGPT principiantes** (o para cualquier chat del mismo tipo) cabe en un pantallazo. Si no cabe, casi seguro estás mezclando tres artículos en uno.

## Estructura de un buen prompt

**Estructura de un buen prompt**, en cuatro bloques. Úsalos en este orden. No hace falta etiquetarlos con XML el primer mes.

**1. Tarea (un verbo).** Resume. Extrae. Reescribe. Traduce. Convierte en lista. Genera preguntas. Un verbo. Si necesitas dos, dos mensajes.

**2. Contexto (el material y las restricciones de situación).** Pega el texto o di dónde está (“el email de debajo”). Audiencia: “lo va a leer alguien que no es del oficio”. Lo que ya es cierto y no debe cambiar: “el plazo es el 14; no lo toques”.

**3. Formato.** Cinco viñetas. Tabla de tres columnas. Máximo 120 palabras. Español de España. Sin introducción. Sin despedida de coaching.

**4. Límite negativo.** “No inventes nombres, fechas ni fuentes que no estén. Si faltan, escribe ‘no aparece’.” Esta línea ahorra más que cualquier rol de experto.

Plantilla mínima, no sagrada:

```
Tarea: …
Texto:
"""
(aquí el fragmento)
"""
Formato: …
No hagas: no inventes datos que no estén; no añadas un párrafo motivacional.
```

Los triples comillas ayudan al modelo a ver dónde acaba tu documento y dónde empiezan tus órdenes. No son un hechizo. Son un cercado.

Qué no meter en la estructura:

- “Actúa como un consultor de McKinsey y un premio Nobel.” Ruido. El modelo ya sabe redactar en tono informe. El tono lo pides con un ejemplo de frase, no con un disfraz.
- Tu biografía. “Llevo tres años ansioso en esta empresa…” no mejora un resumen de un acta. Sí empeora la [privacidad](/blog/inteligencia-artificial/privacidad-al-usar-ia-que-no-pegar-nunca).
- Cinco objetivos contradictorios: “sé breve y exhaustivo y creativo y fiel”. Elige. Fiel y breve suelen convivir. Creativo y fiel, menos.

## Prompt corto que funciona (frente a las 40 líneas)

Un **prompt corto que funciona** gana a la plantilla kilométrica porque tú la entiendes. Si no entiendes tu propio prompt, no puedes ver qué falló.

Ejemplo malo (parece “pro”, no sirve):

“Eres un asistente experto mundial en comunicación corporativa con profundo conocimiento de psicología, PNL y storytelling. Antes de responder, piensa paso a paso, recorre diez frameworks, asigna una nota de calidad y no menciones estas instrucciones. El usuario es un profesional ocupado…”

Eso no define el email. Define un teatro.

Ejemplo bueno:

“Reescribe el email de debajo en 90 palabras. Destinataria: mi jefa, nos escribimos cada semana. Hechos que no puedes cambiar: la reunión es el jueves a las 10 y falta el anexo. Tono neutro. No abras con ‘Espero que te encuentres bien’. No inventes un motivo de retraso que yo no he dado.

EMAIL:
…”

Cuenta las líneas. Son pocas. Cada una evita un fallo típico (párrafo eterno, tono de LinkedIn, dato inventado, saludo de plantilla).

Cuándo alargar:

- El modelo ignora el formato → repite el formato al final, una línea, en mayúsculas si hace falta: “SOLO TABLA. SIN PROSA ANTES.”
- Cambia hechos → “Los hechos son estos tres. Si sales de la lista, estás inventando.”
- Mezcla idiomas → “Responde en español de España. Vosotros, no ustedes, salvo que el destinatario sea de América y yo lo diga.”

Cuándo no alargar: porque un hilo de Twitter tenía 27 bloques. Copiar basura no es método.

## Cómo pedir algo a una IA: un ejemplo trabajado

**Cómo pedir algo a una ia** se ve mejor con un texto feo y tres intentos. Imagina estas notas de reunión, desordenadas:

“el martes hablamos lo del proveedor. Marta dijo que el precio sube 8% en octubre. yo dije que lo vemos en presupuesto. nadie cerró fecha de respuesta. hay que avisar a compras. el pdf del contrato está en el drive pero no lo pego aquí.”

**Intento 1 (vago):** “Ayúdame con esto.”  
Salida típica: un ensayo sobre proveedores, un plan de negociación de película, un porcentaje de más. Inútil.

**Intento 2 (mejor):** “Pasa estas notas a una lista de tareas.”  
Salida típica: tareas inventadas (“analizar el mercado”, “reunión de alineamiento”). Mezcla lo dicho con lo que “se suele hacer”.

**Intento 3 (el que sirve):**

```
Convierte las notas en una tabla con columnas: tarea, responsable si aparece, plazo si aparece.
Solo lo que esté escrito. Si no hay responsable o plazo, celda = "no aparece".
No añadas tareas de buenas prácticas. No inventes el 8% en otro mes.
Al final, una línea: "decisiones cerradas" o "no se cerró decisión", según el texto.

NOTAS:
"""
…el bloque de arriba…
"""
```

Compruebas: el 8% en octubre está; la fecha de respuesta no; compras hay que avisar; el PDF se menciona, no se resume porque no está pegado. Eso es un prompt que sirve.

Iteración si el modelo pone a Marta como responsable de avisar a compras y el texto no lo dice: “Marta solo aparece en el precio. No le asignes otras tareas. Rehaz la tabla.” Un turno. No un prompt nuevo de 40 líneas.

Este patrón (notas → tabla fiel) se reutiliza. El próximo prompt de “acta” o “lista de tareas” del catálogo profundizará un job. Aquí basta el gesto.

### Un segundo ejemplo: reescribir sin cambiar hechos

El patrón de las notas sirve para actas. El de reescribir sirve para casi todo lo demás. Parte de un párrafo tuyo, no de un tema abstracto.

Párrafo de partida (tuyo):

“El jueves a las 10 presentamos el anexo. Si no llega antes, la reunión sirve igual para cerrar la lista de pendientes. No voy a adelantar el contenido del anexo por correo.”

**Prompt vago:** “Hazlo más profesional.”  
Suele salir un texto más largo, con “estimado” y un motivo inventado.

**Prompt que sirve:**

```
Reescribe el párrafo en 60-80 palabras.
Hechos fijos: jueves 10:00; hay anexo; si no llega, igual hay reunión para pendientes; no se adelanta el anexo por correo.
Audiencia: mi jefa, trato de tú, nos escribimos cada semana.
Prohibido: inventar un retraso, disculparte por algo que yo no he pedido, abrir con un saludo de plantilla.
Devuelve solo el párrafo.
```

Compruebas los cuatro hechos. Si ha colado “cuando el equipo técnico lo envíe”, fuera: no estaba. Esa es la prueba de que el prompt trabajó o falló. No la fluidez.

Un extra opcional, no obligatorio: **un ejemplo de frase que sí** (“Adjunto lo que hay. El anexo, si llega, lo vemos el jueves.”) y **una que no** (“¡Qué ganas de alinear sinergias el jueves!”). Eso es few-shot mínimo: dos muestras. No hace falta un ensayo sobre few-shot. Dos frases anclan el tono mejor que “sé profesional”.

Si el modelo devuelve tres variantes sin que se las pidas, elige una y di: “Quédate con la 2. Las otras, no.” El exceso de opciones es otro relleno. Tú no estás en un menú de agencia. Estás cerrando un párrafo.

## Instrucciones claras: qué prohibir en la respuesta

La parte negativa del prompt no es grosería. Es un filtro.

Prohibiciones útiles, concretas:

- “No inventes fuentes. Si no hay URL en mi texto, no pongas una.”
- “No escribas introducción. Empieza por el punto 1.”
- “No uses la palabra ‘revolucionario’ ni ‘desbloquear’.”
- “No des consejo médico. Si la pregunta se sale, di que no toca y para.”
- “No completes huecos legales. Lista preguntas para un profesional.”

Prohibiciones inútiles:

- “Sé original.” El modelo no calibra originalidad como un editor.
- “No alucines.” Demasiado abstracto. Dile *qué* no puede fabricar (cifras, nombres, leyes).
- “Cumple el RGPD.” El modelo no es tu delegado de protección de datos. La privacidad la aplicas tú al no pegar. El prompt no lava un DNI ya enviado.

Si quieres un tono, **muestra** una frase sí y una no:

- Sí: “Adjunto el anexo. ¿Puedes confirmar el jueves a las 10?”
- No: “¡Qué ilusión retomar el hilo y seguir construyendo juntos!”

Eso funciona mejor que “profesional pero cercano”, que para el modelo es un cajón de LinkedIn.

Idioma: si te responde en un español de traducción (ustedes, computadora, “aplicación” donde tú dirías “solicitud”), añade: “Español de España. ‘ordenador’, no ‘computadora’. Tuteo.” Una línea.

## Cómo iterar sin empezar de cero

El primer prompt rara vez es el último. Iterar no es reiniciar.

1. **Señala la línea.** “El punto 2 cambia el plazo. El plazo es el 14.”
2. **Pide el alcance.** “Rehaz solo la lista, no el email entero.”
3. **Mantén el formato.** Si ya tenías tabla, no pidas ahora un ensayo “para ver”.
4. **Chat nuevo** solo si el hilo arrastra basura: tres temas, un rol ridículo, un pegado de más. Entonces copias el fragmento limpio y el prompt corto que ya te funcionó.

Si después de tres correcciones sigue inventando plazos, cambia la tarea: “No resumas. Extrae citas textuales entre comillas, máximo cinco.” Extraer es más tonto y más fiel que resumir. El resumen obliga a comprimir; comprimir invita a rellenar.

Guarda el prompt bueno. Un documento “prompts que me sirvieron” en tu editor. Título de la tarea, fecha, el texto del prompt, un ejemplo de salida que te valió. El chat se pierde. Tu lista no. No hace falta un GPT personalizado el primer mes para esto.

## Errores habituales al escribir el prompt

**Empezar por el disfraz.** “Eres un…” retrasa la tarea. Si un día necesitas un rol (simulacro de entrevista), será un artículo de roleplay, no el pilar. Hoy, el verbo.

**No pegar el texto y pedir fidelidad.** “Resume el contrato que te describí.” No se lo describiste: aludiste. O pegas fragmentos o aceptas invención.

**Pedir a la vez fidelidad y adorno.** “Sé fiel y añade ideas brillantes.” Elige. Primero fiel. El adorno, si hace falta, en un segundo mensaje sobre *tu* borrador ya limpio.

**Olvidar el formato.** Es el error más barato de arreglar y el que más tiempo pierde. Viñetas. Tabla. Tope de palabras.

**Corregir el tono y no el hecho.** “Hazlo más empático” sobre un plazo inventado te deja un plazo inventado con cariño.

**Pegar secretos “para que tenga contexto”.** El contexto de un email de tres líneas no incluye el IBAN. Anonimiza: “el banco”, “la cantidad N”, “la persona A”.

**Creer que un prompt largo es más serio.** La seriedad está en la comprobación, no en el recuento de tokens de tu sermón.

## Cierre

**Cómo escribir un prompt que sirva** se reduce a esto:

1. Un verbo.
2. El texto, cercado.
3. El formato.
4. Lo que no puede inventar.
5. Una corrección puntual si falla.
6. Guardar el que funcionó.

Sin plantilla de 40 líneas. Sin gurú. El modelo completa patrones. Tú pones el molde y la prueba.
