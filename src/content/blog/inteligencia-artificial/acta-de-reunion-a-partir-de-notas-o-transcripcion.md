---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Acta de reunión a partir de notas o transcripción"
description: >-
  Acta de reunión con inteligencia artificial: asistentes, decisiones,
  tareas. Si no salió en la reunión, no entra en el acta. Dueño vacío: no aparece.
readTime: 11 min
keywords:
  - acta de reunión con inteligencia artificial
  - minuta de reunión con chatgpt
  - de transcripción a acta
  - decisiones y dueños
  - ia no inventa asistentes
  - formato de un acta interno
  - reunión híbrida a documento
excerpt: >-
  Asistentes, decisiones, tareas. Si no salió en la reunión, no entra.
  Dueño vacío no aparece. El acta no es la lista de tareas.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/acta-de-reunion-a-partir-de-notas-o-transcripcion'
related_routes:
  - prompt-para-pasar-notas-a-lista-de-tareas
  - seguimiento-despues-de-una-reunion
  - como-escribir-un-prompt-que-sirva
  - privacidad-al-usar-ia-que-no-pegar-nunca
  - transcribir-una-reunion
faqs:
  - question: ¿Cómo hacer un acta de reunión con inteligencia artificial sin inventar?
    answer: "Pegas notas o un recorte de transcripción ya anonimizado. Pides el formato interno: asistentes solo si constan, decisiones con cita, tareas con dueño y plazo solo si están escritos. Si no salió en la reunión, no entra. Lees el acta contra el original. Tú la firmas o la envías, no el modelo."
  - question: ¿La IA puede inventar asistentes que no estaban?
    answer: "Sí. Completa la lista con cargos ‘típicos’ o con quien habló en otra reunión del hilo. Por eso IA no inventa asistentes es una línea del prompt y una comprobación: cada nombre tiene que estar en las notas o en la transcripción. Si no está, fuera. No rellenes con ‘seguro que estaba P.’."
  - question: ¿Qué pongo si una tarea no tiene dueño?
    answer: "No aparece. No pongas el cargo, ‘el equipo’ ni a quien más habló. El hueco es información: la sala no asignó. El acta fiel deja el hueco. Tú puedes asignar después, fuera, en tu herramienta; eso ya no es lo que salió en la reunión."
  - question: ¿Sirve una transcripción automática de una reunión híbrida?
    answer: "Sirve como materia prima sucia. La reunión híbrida a documento pide recorte: un tema, nombres anonimizados, sin el café ni el ruido de pasillo. La transcripción inventa palabras y atribuye mal el turno. El acta no copia el verbatim: extrae asistentes, decisiones y encargos que puedas señalar. Si el audio mintió, el acta no lo lava."
  - question: ¿El acta y la lista de tareas son el mismo entregable?
    answer: "No. El acta es el documento de la reunión: quién estuvo, qué se decidió, qué quedó encargado. Extraer solo action items es otro trabajo, con su prompt. Aquí no conviertes el acta en un tablero de proyecto ni en el email de seguimiento del mismo día."
---

**Acta de reunión con inteligencia artificial** es pasar notas o un recorte de transcripción a un documento interno: asistentes, decisiones, tareas. Si no salió en la reunión, no entra. El modelo rellena salas. Tú no dejas que firme la lista de asistencia.

La estructura del prompt está en [cómo escribir un prompt que sirva](/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva). El oficio de extraer solo action items está en [prompt para pasar notas a lista de tareas](/blog/inteligencia-artificial/prompt-para-pasar-notas-a-lista-de-tareas). Aquí no se sustituye ese trabajo. Aquí el entregable es la **minuta de reunión con ChatGPT** (o el chat que uses): el acta, no el tablero.

## El acta no es un plan ni un seguimiento

Un acta registra lo que ocurrió. Un plan inventa lo que debería ocurrir. Un email de seguimiento del mismo día es otro recado (corto, dueños, fecha). No lo escribas en este chat mezclado con la minuta. Si lo mezclas, el modelo cuela “próximos pasos de buenas prácticas” en el acta y luego parecen acuerdos.

Tres cajones, y solo tres, en este documento:

1. **Asistentes** (y ausentes solo si las notas los marcan).
2. **Decisiones** (sí o no escrito, o “no se cerró”).
3. **Encargos** (verbo; dueño y plazo si aparecen).

Hechos que no son decisión ni encargo (un precio, una queja, un PDF que está en el Drive) pueden ir a una línea de “consta” o quedarse fuera. No se convierten en tarea salvo que alguien encargara una acción sobre ese hecho.

Qué no es el acta:

- La transcripción verbatim. Nadie necesita el “eh” ni el debate del café.
- Un resumen inspirador de “alineamiento”.
- La lista de tareas como único output. Esa lista sale del acta, en el artículo hermano, cuando el trabajo sea el checklist.
- El orden del día de la *siguiente* reunión, salvo que se hubiera cerrado en esta.

**De transcripción a acta** es un filtro. La transcripción es larga, sucia y a menudo atribuye mal el turno (“Hablante 2”). El acta es corta y atribuible. Si el recorte no permite atribuir, el dueño no aparece. No “Hablante 2 = Marta” porque te suena la voz.

## Formato de un acta interno

**Formato de un acta interno**, para pedir y para reconocer. Adáptalo a lo que ya usa tu equipo. No copies un ISO de internet. Sí impone bloques, para que el modelo no suelte un ensayo.

```
Título / fecha / tipo (presencial, híbrida, remota) SOLO si están en las notas
Asistentes: lista. Ausentes: lista solo si constan.
Decisiones: viñetas. Cada una con cita corta o “no se cerró decisión”.
Encargos: tabla tarea | responsable | plazo
  responsable y plazo = el dato o "no aparece"
Consta (opcional, máximo cinco líneas): hechos sin encargo
Fuera: interpretaciones, planes, “habría que”, chistes, el ruido de pasillo
```

Eso cabe en una página. Si el modelo entrega cinco, está rellenando. Recorta el recorte, no pidas “sé exhaustivo y breve”.

Tipo de reunión: **reunión híbrida a documento** no cambia el formato. Cambia el material: unos en sala, otros en el enlace, la transcripción a menudo peor. Anota en el acta “híbrida” solo si las notas lo dicen. No inventes quién estaba en la sala y quién en remoto si el texto no lo parte.

Idioma: español de España, tuteo en las citas si así se habló. Sin “tomar acciónables”. Sin “alinear stakeholders” si nadie lo dijo.

## El prompt: de notas o transcripción a minuta

Prompt para copiar. El bloque es notas feas o un *recorte* de transcripción, ya sin apellidos de más, sin teléfonos, sin el cliente con nombre completo si no hace falta.

```
Tarea: convierte el texto en un acta interno.
Formato exacto:
- Encabezado: fecha y tipo de reunión solo si aparecen
- Asistentes: nombres o cargos SOLO si constan como presentes
- Ausentes: SOLO si el texto dice que no vinieron
- Decisiones: viñetas. Cita o "no se cerró decisión"
- Encargos: tabla markdown tarea | responsable | plazo
  Tarea = verbo en infinitivo, solo si está escrita como encargo
  Responsable = nombre solo si ESA acción se asigna a esa persona
  Plazo = expresión temporal solo si aparece; si no: no aparece
- Consta: máximo 5 hechos sin encargo (precios, quejas), o "nada"
Prohibido:
- inventar asistentes, cargos o "el equipo comercial"
- rellenar un dueño vacío; escribe no aparece
- tareas de buenas prácticas o de la siguiente reunión
- copiar la transcripción verbatim
- nombres que yo no haya puesto en el texto

TEXTO:
"""
(aquí notas o recorte de transcripción)
"""
```

Por qué cada línea está:

- **Asistentes acotados.** Esta es la línea de **IA no inventa asistentes**. El modelo completa la sala con el jefe de siempre.
- **Ausentes solo si constan.** “Pablo no vino” entra. “Seguro que faltó finanzas” no.
- **Decisiones con cita.** Mata “se acordó mejorar la comunicación”.
- **Encargos con hueco permitido.** **Decisiones y dueños** no significa dueño en todas las filas. Significa que la columna existe y no se rellena de fantasía.
- **Consta aparte.** Para no convertir el 8 % en “negociar con el proveedor”.
- **Nombres solo los del texto.** Si anonimizaste a persona A, el acta dice persona A. No “recuperes” el apellido.

Si ignora el formato: “SOLO LOS BLOQUES PEDIDOS. SIN INTRODUCCIÓN. SIN ‘RESUMEN EJECUTIVO’.”

## Ejemplo: notas de una híbrida, nombres cortos

Notas desordenadas, ya recortadas. Nombres de pila o iniciales. Sin DNI. Sin el contrato pegado. Así se pega.

```
martes, híbrida, sala 3 y enlace. el del proveedor.
Marta (sala): el precio sube 8% en octubre.
yo (enlace): lo vemos en presupuesto. nadie cerró fecha de respuesta
al proveedor. hay que avisar a compras.
Luis (enlace): mando el anexo el jueves si IT lo suelta.
pdf del contrato en el drive, no lo pego.
Carmen (sala): el jueves a las 10 seguimos, anexo o no.
nadie asignó quién avisa a compras. queja: el drive es un caos.
se aprueba seguir con el proveedor actual este trimestre.
Pablo no vino. no constan más asistentes en las notas.
```

**Intento 1 (vago):** “Hazme el acta.”  
Salida típica: lista de asistentes con Dirección, Finanzas y Pablo “en remoto”; un párrafo de bienvenida; “se decidió optimizar procesos”; Marta dueña de todo. Falso.

**Intento 2 (minuta, sin límite):** “Pasa esto a minuta de reunión con ChatGPT.”  
Mejor verbo, misma invención: P. como asistente porque “lo típico”, dueño de compras = Marta, plazo “urgente”, y un plan de reorganizar el Drive. El acta parece completa. Está mintiendo.

**Intento 3 (el prompt de arriba).** Salida comprobable:

Encabezado: martes, híbrida (sala 3 y enlace).

Asistentes: Marta (sala), quien toma notas (enlace), Luis (enlace), Carmen (sala).  
Ausentes: Pablo.

Decisiones:

- Seguir con el proveedor actual este trimestre.
- Seguir el jueves a las 10, anexo o no (Carmen).

Encargos:

| tarea | responsable | plazo |
|---|---|---|
| Ver el 8 % en presupuesto | no aparece | no aparece |
| Avisar a compras | no aparece | no aparece |
| Enviar el anexo | Luis | el jueves (si IT lo suelta) |

Consta: precio +8 % en octubre (Marta). PDF del contrato en el Drive (no pegado). Queja sobre el Drive, sin encargo.

Compruebas contra el original:

- Asistentes: cuatro que constan + el “yo” de las notas. No añadas a Dirección. No pongas a Pablo en la sala. **IA no inventa asistentes**: Pablo está en ausentes porque el texto lo dice, no en asistentes.
- Híbrida: está escrita. Sala/enlace según el texto. Si el modelo pone a Luis en sala, fuera.
- Decisión del proveedor: sí. Decisión del jueves 10: sí, como calendario cerrado. No es un “plan de alineamiento”.
- Avisar a compras: encargo sin dueño → no aparece. Aunque “en tu equipo se sabe”. En el acta, no aparece.
- Luis + anexo + condición IT: sí. No borres la condición.
- Drive caos: consta o fuera. Cero tarea “reorganizar el Drive”.
- PDF: mención. No resumas un contrato que no está.

Si el modelo ha colado a “Finanzas” en asistentes:

“Finanzas no consta. Quita ese nombre. Asistentes = solo los del texto. Rehaz el encabezado y la lista. El resto, igual.”

Un turno.

Nombres: en este ejemplo ya van cortos. En el tuyo, persona A, persona B, “el proveedor”. El acta de ejemplo no es un expediente.

## Dueño vacío y asistente que no consta

Dos huecos distintos. No los rellenes.

**Asistente que no consta.** No estaba en las notas. No estaba en la transcripción. No entra. Ni “debió de estar”. Ni el cargo vacío (“un representante de compras”). Si compras no habló y nadie lo listó, compras no está. La **IA no inventa asistentes** también cubre cargos fantasma.

**Dueño vacío.** Hay encargo (“hay que avisar a compras”) y no hay nombre. La celda es **no aparece**. No “el equipo”. No Marta porque habló del 8 %. Hablar ≠ dueño. No el ausente Pablo “para que se ponga al día”: eso es un plan. No salió.

Qué copiar del plazo, sin traducir a calendario:

- “el jueves” → el jueves
- “si IT lo suelta” → visible en la tarea o en el plazo
- “antes de octubre” → antes de octubre
- silencio → no aparece

El hueco se lee mal el viernes siguiente. Es correcto. Documenta que la sala no cerró. Cerrar es otra reunión o un mensaje tuyo, fuera del acta generada, con tu criterio.

Transcripción automática: atribuye mal. Si “Hablante 2” dice el 8 % y tú crees que es Marta, o pones Hablante 2 o no pones dueño. No “corrijas” con memoria dentro del chat mezclada con el verbatim. Si recuerdas el turno, corrige *tú* el recorte antes de pegar: “Marta: el 8 %…”. El modelo no oye el Zoom.

## Qué no pegar de la transcripción

La transcripción de una hora no se vuelca. Recorta un tema. Anonimiza. La lista de lo que no se pega no cambia porque el archivo se llame “acta”: está en [privacidad al usar IA](/blog/inteligencia-artificial/privacidad-al-usar-ia-que-no-pegar-nunca).

Fuera del chat, siempre:

- DNI, nóminas, salud, menores, evaluaciones de una persona.
- El contrato completo “para completar el 8 %”.
- La parte de la grabación donde alguien habla de un cliente con nombre, un despido o un conflicto de RR. HH.
- El chat paralelo de la herramienta de vídeo con bromas o datos personales.

Qué sí: el recorte del tema (proveedor, anexo), nombres cortos, el “Pablo no vino” si hace falta para ausentes. **Reunión híbrida a documento** no exige pegar la lista de asistencia del enlace con emails. Si las notas dicen “sala 3 y enlace”, basta.

Si la transcripción trae timestamps cada tres segundos, recórtalos. No ayudan al acta. Inflan el pegado.

## Errores habituales (para aquí)

**Pedir “el acta profesional” sin formato.** Profesional, para el modelo, es larga, con asistencia completa y verbos de consultora. Bloques.

**Rellenar asistentes.** El fallo caro. Una lista inflada circula. Alguien “estuvo” y no estuvo. Comprueba nombres uno a uno.

**Rellenar dueños.** El segundo fallo caro. Marta no es dueña de compras. Hueco = no aparece.

**Pegar la hora entera.** Compacta y alucina. Un tema. Luego otro, mismo prompt o chat nuevo si mezcla.

**Convertir el acta en lista de tareas y nada más.** Pierdes decisiones y asistencia. Si solo quieres el checklist, usa el artículo de notas a tareas. Si quieres el documento, este formato.

**Convertir el acta en el email de seguimiento.** El seguimiento es otro trabajo: recap corto el mismo día. Aquí no se redacta ese correo.

**Creer que la transcripción es fiel.** No lo es. El acta no lava un “no” que el modelo de audio oyó como “sí”. Si una decisión es grave, vuelves al audio o preguntas en la sala. El chat no certifica.

**Usar el acta sin leerla.** Circular la minuta del modelo es firmar sus inventos. Cinco minutos contra el recorte.

Para aquí: si el nombre no está en el texto, no está en asistentes. Si el dueño no está, no aparece. Si no salió en la reunión, no entra.

## Cierre

**Acta de reunión con inteligencia artificial** se reduce a esto:

1. Recorte de notas o transcripción. Nombres cortos. Un tema.
2. Asistentes y ausentes solo si constan.
3. Decisiones con cita, o no se cerró.
4. Encargos en tabla; hueco = no aparece.
5. Compruebas cada nombre y cada celda contra el original.
6. El checklist fino, si lo necesitas, es el otro artículo. El seguimiento por correo, otro.

Sin sala inventada. Sin dueño de relleno. El modelo completa patrones. Tú pones el recorte y la prueba de lo que salió de verdad.
