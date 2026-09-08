---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Preguntas tipo test de un capítulo"
description: >-
  Preguntas tipo test con IA de un capítulo tuyo: cuatro opciones y una
  correcta, según TUS apuntes. Autoexamen, no el examen real. Contrastas.
readTime: 11 min
keywords:
  - preguntas tipo test con ia
  - chatgpt quiz de un tema
  - cuatro opciones y una correcta
  - ia distractores plausibles
  - autoexamen de un capítulo
  - no el examen real
  - test para estudiar no para copiar
excerpt: >-
  Pegas UN capítulo tuyo y pides un test según esas notas. Lo que no esté,
  se tira. El modelo no tiene el examen de verdad.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/preguntas-tipo-test-de-un-capitulo'
related_routes:
  - fichas-de-estudio-a-partir-de-tus-apuntes
  - resumir-un-tema-de-examen-con-ia
  - usar-ia-en-un-trabajo-sin-que-lo-haga-por-ti
  - como-comprobar-si-una-respuesta-de-ia-es-fiable
faqs:
  - question: ¿Puedo pedirle a ChatGPT el examen tipo test de mi asignatura?
    answer: "No. Este artículo es un autoexamen de UN capítulo tuyo, según TUS apuntes. El modelo no tiene el examen real. Pegar un examen oficial para que te dé las respuestas no es estudiar: no lo hagas."
  - question: ¿Cómo hago preguntas tipo test con IA sin que invente materia?
    answer: "Pegas el capítulo. Pides cuatro opciones y una correcta, cada ítem marcado ‘según mis apuntes’, con ancla. Si el ancla no abre o la correcta no está en el texto, tiras la pregunta. No pidas que complete el temario."
  - question: ¿Qué son distractores plausibles en un quiz de IA?
    answer: "Opciones incorrectas que podrían confundirte porque aparecen cerca en TUS notas (otro término, otro paso). No son trampas sacadas de internet ni del examen de otro año. Si el distractor no está en el capítulo, sobra."
  - question: ¿Cuántas preguntas pido por capítulo?
    answer: "Ocho o diez, no treinta. Contrastar cada una contra el original lleva rato. Un autoexamen corto que has tachado vale más que un simulacro inflado con ítems inventados."
  - question: ¿Esto sustituye a las fichas o al resumen del tema?
    answer: "No. El resumen da el mapa. La ficha pregunta una cosa. El tipo test entrena a elegir entre cuatro según TUS notas. Un verbo por mensaje. El trabajo escrito, si lo hay, lo haces tú."
---

**Preguntas tipo test con IA** son un autoexamen de *un* capítulo tuyo. Cuatro opciones, una correcta, según tus apuntes. No es el examen real. No es un banco filtrado. El modelo no se sienta a la prueba. No escribe el trabajo. Si una pregunta no se puede marcar en tus notas, se tira.

Este job no es [fichas de estudio a partir de tus apuntes](/blog/inteligencia-artificial/fichas-de-estudio-a-partir-de-tus-apuntes): ahí no hay A B C D. Tampoco es [resumir un tema de examen con IA](/blog/inteligencia-artificial/resumir-un-tema-de-examen-con-ia): eso es esquema y huecos. Aquí: eliges, contrastas, y estudias el fallo contra el original. Test para estudiar, no para copiar.

## ChatGPT: quiz de un tema (el tuyo)

**ChatGPT quiz de un tema** solo existe si el tema está pegado. Sin texto, el modelo fabrica un test de internet. Puede parecer tu asignatura. No lo es.

Antes del prompt:

1. Un capítulo o un rango de páginas. El 6, no el manual.
2. Material *tuyo* o dado para estudiar. No el examen del campus. No el PDF de “test oficiales” de un foro. No el libro que no es tuyo.
3. Tope: 8 o 10 ítems. Sin tope, inventa volumen.

Prompt que sirve:

```
Tarea: autoexamen tipo test de UN capítulo, según MIS apuntes de debajo.
Formato de cada ítem:
- Enunciado
- A B C D (una correcta, tres incorrectas)
- CORRECTA: letra
- ANCLA: página o cita corta de MIS apuntes
- MARCA: la frase "según mis apuntes"
Límite:
- No uses conocimiento general.
- Si no puedes anclar la correcta en el texto, no pongas el ítem.
- No copies ni imites exámenes reales.
- No pidas ni inventes “lo que cae este año”.
- Máximo 8 ítems. Español de España. Sin introducción.

MIS APUNTES (capítulo, páginas):
"""
…
"""
```

Tras la tira, no estudies aún. Contrastas. El método de [cómo comprobar si una respuesta de IA es fiable](/blog/inteligencia-artificial/como-comprobar-si-una-respuesta-de-ia-es-fiable) aquí es: abrir cada ancla. Cifra, nombre, “siempre”, artículo: fuera si no está.

Qué no pedir:

- “Hazme el test del parcial.”
- “Estas son las preguntas del año pasado, resuélvelas.”
- “Busca el examen en internet y adáptalo.”

Eso no es autoexamen. No lo hagas. Si el modelo se niega, no busques un truco. Reformulas: capítulo tuyo, práctica, según tus notas.

## Cuatro opciones y una correcta

**Cuatro opciones y una correcta** es el formato. Una. No “A y C”. No “todas las anteriores” si tus apuntes no usan ese molde.

Reglas para el ítem:

1. El enunciado pregunta *una* cosa que el capítulo afirma.
2. La correcta es una frase o un dato que está en tus notas, no una paráfrasis brillante.
3. Las tres incorrectas son falsas *según ese capítulo*, no según el universo.
4. Tras elegir, ves CORRECTA y ANCLA. Si estudias, primero tapas esas dos líneas.

Cómo pedir que no se vaya a “todas las anteriores”:

```
Prohibido: "todas las anteriores", "ninguna de las anteriores", "A y B son correctas".
Una sola letra correcta por ítem.
El enunciado no debe regalar la respuesta en la última palabra.
```

Enunciado inútil: “¿Cuál es el concepto más importante del capítulo?” Eso no está en las notas. Es opinión. Tira.

Enunciado útil: “Según mis apuntes (p. 4), el objetivo intermedio que lista el capítulo para este instrumento es:” y cuatro destinos de los que tres no están o están en otra función.

Si el capítulo no numera cuatro destinos, no fuerces cuatro. Mejor un ítem de dos datos reales que un ítem de cuatro inventados.

Cuando el modelo pone dos correctas de hecho (A y C ambas salen en la página), tiras el ítem o lo reescribes tú con *una* afirmación. No le pidas “hazlo más difícil” añadiendo una quinta teoría que no está.

## Distractores plausibles (según tus notas)

**IA distractores plausibles** no significa trampas de examen ajeno. Significa opciones incorrectas que *podrían* confundirte porque en *tus* páginas hay un término parecido, un paso anterior, una cifra de otra tabla.

Cómo pedirlos:

```
Distractores: usa términos o cifras que SÍ aparecen en MIS apuntes pero que NO responden a ESTE enunciado.
No inventes un autor, una ley o un porcentaje que no esté en el texto.
Si no hay material para tres distractores anclados, haz menos ítems. No rellenes.
```

Ejemplo de distractor bueno, si el capítulo lo permite: el enunciado pregunta el objetivo de la operación de mercado abierto; el distractor es el objetivo que tus notas asignan al coeficiente de caja. Los dos están. Uno no responde a *esta* pregunta.

Ejemplo de distractor malo: un porcentaje de un periódico que el modelo recuerda. No está en tus páginas. Si lo estudias, estudias un número falso.

Comprobación de cada distractor:

1. ¿Aparece la palabra o la cifra en el capítulo? Si no, el distractor es ruido. Lo cambias tú por algo que sí esté, o tiras el ítem.
2. ¿El distractor es en realidad correcto según tus notas? Entonces el ítem está mal construido. Fuera.
3. ¿El distractor es absurdo (“la respuesta es 17 kg”)? No entrena. Tira.

No pidas “distractores como en el MIR / como en el test de la oposición”. El modelo imitará un estilo de trampa y meterá materia de otro temario. Tú quieres *tu* capítulo.

## Autoexamen de un capítulo (cómo se hace el rato)

**Autoexamen de un capítulo** es una sesión. No un simulacro de convocatoria. El reloj, si lo pones, es tuyo: 12 minutos para 8 ítems, por ejemplo. El chat no es el tribunal.

Pasos:

1. Recorta el capítulo. Pega. Prompt del test, máximo 8, “según mis apuntes”, ancla.
2. Recibes los ítems. **Aún no contestas.** Abres cada ANCLA. Marcas cada pregunta: SÍ (ancla y correcta coinciden con el cuaderno), NO ESTÁ, OTRA COSA. Tiras NO ESTÁ y OTRA COSA. No las sustituye el modelo salvo que le pidas *rehacer solo el número 3 con el mismo párrafo*, y vuelves a abrir.
3. Copias los ítems que sobreviven a una hoja, **sin** la letra correcta a la vista.
4. Cierras el chat. Cierras el PDF si quieres simular recuerdo. Contestas.
5. Corriges contra tus notas, no contra la seguridad del modelo. Si fallaste, la corrección es la frase del cuaderno.
6. Las que fallaste pasan a estudio: relees la página. Opcional: una ficha de esa idea, en el otro job, no un segundo test de 20 ítems.

Qué no hacer en la sesión:

- Enviar las respuestas al profesor como si fueran las del examen.
- Hacer el test con el capítulo abierto y decirte que ya está. Eso es leer opciones, no recordar.
- Pedir la explicación larga de cada fallo al chat. Suele colar un ejemplo nuevo. El ejemplo nuevo no estaba. Vuelves a la página.

Un capítulo, un autoexamen. Al día siguiente, las mismas 8 si fallaste, o el siguiente rango de páginas. No “el grado en 80 preguntas”.

## No es el examen real: test para estudiar, no para copiar

**No el examen real.** El modelo no lo tiene. Quien te venda que sí, miente o está pidiendo que pegues un examen ajeno. **Test para estudiar no para copiar.**

Líneas rojas:

- No pegas el examen de la asignatura, ni el de un compañero, ni un scan de una prueba. Ni “para practicar el formato” si el contenido es el de la prueba real.
- No pides que reproduzca preguntas de años anteriores que no son tuyas.
- No usas esto para entregar un test hecho. Si hay un cuestionario evaluable en el campus, lo haces tú, con las reglas de la asignatura.
- Autoexamen ≠ copiar el examen. La semejanza de formato (A B C D) no te autoriza a buscar el contenido de la convocatoria.

Qué sí:

- Practicar el *gesto* de elegir entre cuatro con el material que ya estudias.
- Ver si confundes dos términos que *tú* copiaste en la misma página.
- Marcar huecos: “no puedo anclar esto” = no lo tenía. Se estudia el original, no se fabrica la pregunta.

Vigencia y cifras: un tipo test de economía o de oposición con porcentajes y artículos es zona de error. Cada número se abre en *tus* notas. Si no está, cae. El chat no certifica la norma vigente. Eso no es dictamen: es no memorizar un artículo inventado.

Si la asignatura prohíbe IA en la evaluación, este rato es estudio en casa, como un compañero que te pregunta el tema. No es el acto de examen. El viernes escribes o marcas tú.

## Ejemplo trabajado: Inés, capítulo 6, páginas 1-14

Inés cursa Economía. Capítulo 6, política monetaria. Apuntes *suyos*, páginas 1 a 14. Tiene también la lista de epígrafes de la guía docente (una cara). El examen del profesor suele ser tipo test, pero Inés no tiene ese examen y no lo va a buscar. Quiere practicar *su* capítulo.

Qué hace el miércoles:

1. Chat nuevo. Pega páginas 1-14. Pega la lista de epígrafes con esta orden: “No inventes ítems de un epígrafe que no esté desarrollado en 1-14. Si la guía nombra algo que yo no desarrollé, no hagas pregunta: es HUECO.”
2. Prompt de 8 ítems, cuatro opciones, una correcta, ancla, “según mis apuntes”:

```
Según MIS apuntes, páginas 1-14 del capítulo 6.
8 ítems. A B C D. Una correcta.
Cada ítem termina con: CORRECTA + ANCLA + la frase "según mis apuntes".
Distractores: términos de ESTAS páginas que no respondan al enunciado.
Si no hay ancla, no pongas el ítem. No imites un examen real.
```

Salida: 8 preguntas. Inés no las memoriza aún. Abre el cuaderno.

3. Ítem 2. Correcta: “el objetivo de inflación del BCE es el 2 %”. Ancla: “p. 5”. Inés abre la página 5. Sus notas dicen: “el capítulo menciona un objetivo de inflación; cifra exacta no copiada; ver manual p. 88 en papel”. NO ESTÁ la cifra en *sus* apuntes. Tira el ítem. No memoriza el 2 % *desde el chat*. Si más tarde lo copia del manual legal, será su frase, no la del modelo.
4. Ítem 4. Enunciado sobre operaciones de mercado abierto. Distractores: coeficiente de caja y facilidad marginal, ambos en la página 7. Correcta anclada en la página 8, coincide. SÍ. La deja.
5. Ítem 6. “Según el examen de junio…” El modelo ha colado tono de convocatoria. Tira el ítem entero. No hay examen en sus notas.
6. Ítem 7. Dos letras serían correctas según la página 11 (el texto lista dos efectos). Tira. No pide “arregla con una trampa”.
7. Sobreviven 5 ítems. Los pasa a una hoja, sin letras. 8 minutos, apuntes cerrados. Falla el 4: había mezclado dos instrumentos. Abre las páginas 7-8. En el cuaderno, página 7, había copiado: “caja = liquidez de los bancos; mercado abierto = comprar/vender títulos”. Reescribe *ella* esa línea más clara. No pide un sermón al chat. No añade una ficha inventada sobre un tercer instrumento que el modelo había citado de paso.
8. No envía el test a nadie como “el examen”. El viernes marca ella, en el aula, sin el hilo.

Lo que no haría: pegar el cuestionario del campus; “encuentra las preguntas de este año”; “haz 40 ítems del temario entero”. El modelo no entrega la asignatura. Inés tampoco se la hace entregar.

## Errores al hacer un tipo test con IA

**Pedir el examen de verdad** o pegarlo. No es este artículo. No lo hagas.

**No pegar el capítulo** y exigir un quiz fiel. Sale internet.

**Estudiar ítems NO ESTÁ.** Memorizas al modelo.

**Aceptar “todas las anteriores”** o dos correctas. El formato se rompe.

**Distractores de fuera del texto.** Entras materia ajena.

**Treinta preguntas de un golpe.** No contrastas. Das por bueno el volumen.

**Pedir la explicación larga del fallo.** Cuela un ejemplo nuevo. Vuelves a la página.

**Mezclar fichas y test en el mismo mensaje.** Salen híbridos inútiles.

**Usar el autoexamen como entregable.** El cuestionario evaluable lo haces tú.

## Para aquí

**Preguntas tipo test con IA** caben en cinco líneas:

1. Un capítulo tuyo. Ocho ítems. Nada sensible. Nada que no te pertenezca. Nada que sea el examen real.
2. **Cuatro opciones y una correcta**, cada una con ancla y la marca “según mis apuntes”.
3. **Distractores plausibles** con material *del* capítulo, no de internet.
4. **Autoexamen:** contrastar, luego contestar con el chat cerrado, luego volver al original.
5. **Test para estudiar, no para copiar.** El modelo no tiene la convocatoria. Tú te sientas el día de la prueba.

Si no estaba en tus apuntes, no era pregunta. El viernes marcas tú.
