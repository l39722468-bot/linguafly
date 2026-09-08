---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "NotebookLM: estudiar PDFs que ya son tuyos"
description: >-
  NotebookLM para estudiar PDF: carga fuentes que ya son tuyas, pregunta al
  material y verifica cada cita y el audio overview con el original.
readTime: 11 min
keywords:
  - notebooklm para estudiar pdf
  - google notebooklm guía
  - cuaderno de fuentes con notebooklm
  - podcast de un pdf notebooklm
  - preguntar a tus apuntes
  - notebooklm vs chatgpt
  - límites de notebooklm
excerpt: >-
  NotebookLM responde a tus PDFs, no a internet entero. El audio overview
  ayuda a repasarlo; las citas se abren igual. El trabajo lo entregas tú.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/notebooklm-estudiar-pdfs-que-ya-son-tuyos'
related_routes:
  - subir-un-pdf-a-un-chatbot-que-hacer-y-que-no
  - claude-para-documentos-largos
  - como-comprobar-si-una-respuesta-de-ia-es-fiable
  - privacidad-al-usar-ia-que-no-pegar-nunca
  - resumir-un-tema-de-examen-con-ia
faqs:
  - question: ¿NotebookLM sirve para estudiar un PDF que ya es mío?
    answer: "Sí, si el archivo es tuyo o te lo han dado para estudiar y no lleva datos que no pegarías en un post: preguntas al material, pides página y cita, y abres el PDF. No sirve para que te escriba el trabajo ni para sentarse al examen por ti."
  - question: ¿En qué se diferencia NotebookLM de ChatGPT con un PDF?
    answer: "NotebookLM trabaja un cuaderno de fuentes que tú cargas: la respuesta debería anclarse a esos archivos. ChatGPT es un chat general; el PDF es un adjunto más y puede completar con el resto de internet. En los dos contrastas. En NotebookLM el recinto es el cuaderno, no el mundo."
  - question: ¿Puedo fiarme del podcast o audio overview de un PDF?
    answer: "No como fuente: es un repaso oral. Escuchas, anotas lo que afirma, y lo buscas en el PDF. Si el audio cita un dato que no está, cae. No lo pegas al trabajo. No lo usas como si el documento lo hubiera dicho en voz alta."
  - question: ¿Qué límites tiene NotebookLM que debo tener claros?
    answer: "Límites típicos: citas alucinadas (página o frase que no está), tope de fuentes y de tamaño, libros con copyright que no son tuyos, y pedir que haga el examen o el ensayo. El modelo no entrega la asignatura: tú estudias y tú escribes."
  - question: ¿Puedo subir el manual pirata o los apuntes de un compañero sin permiso?
    answer: "No: si no es tuyo y no te lo han dado para usarlo así, no lo cargas. Un PDF de un menor, una nómina o un expediente tampoco. La regla de qué no viaja no cambia porque el producto se llame cuaderno."
---

**NotebookLM para estudiar PDF** no es un chatbot al que le sueltas el temario y te devuelve el trabajo. Es un recinto de Google (notebooklm.google.com) pensado para **preguntar a tus apuntes**: cargas fuentes que ya son tuyas, haces preguntas *a ese material*, y contrastas cada cita con el archivo abierto. El modelo no se sienta al examen. No entrega la asignatura.

Esta página es **ese** producto y **ese** job. No es la guía de privacidad de cualquier chatbot: qué no viaja nunca (DNI, salud, menores, secretos) está en [privacidad al usar IA: qué no pegar nunca](/blog/inteligencia-artificial/privacidad-al-usar-ia-que-no-pegar-nunca) y se aplica igual al cuaderno. Cómo recortar un PDF *antes* de subirlo a un chat genérico está en [subir un PDF a un chatbot: qué hacer y qué no](/blog/inteligencia-artificial/subir-un-pdf-a-un-chatbot-que-hacer-y-que-no). Un PDF largo en Claude (capítulo, tabla, cifras) es otro recinto: [Claude para documentos largos](/blog/inteligencia-artificial/claude-para-documentos-largos). Aquí: un cuaderno, tus fuentes, preguntas, audio overview, y los límites.

## Google NotebookLM: un cuaderno de fuentes, no internet

**Google NotebookLM guía**, en la práctica, empieza por no tratarlo como Gemini ni como ChatGPT. Abres un *cuaderno*. Añades fuentes. Preguntas a *esas* fuentes. La interfaz cambia de trimestre; el gesto no: un cuaderno por materia o por trabajo, no “todo lo que tengo en Drive”.

**Cuaderno de fuentes con NotebookLM** quiere decir:

1. **Tú eliges qué entra.** Un PDF de apuntes que has tomado. El temario que el profesor ha colgado en el campus. Un artículo público que has bajado. Un Doc tuyo.
2. **El modelo debería anclarse a eso.** Si responde con un dato que no está en las fuentes, es un invento o un arrastre. Lo tratas como NO ESTÁ.
3. **No es una búsqueda web.** Si necesitas “qué se ha publicado este mes sobre X”, este no es el recinto. Aquí el universo es lo que has cargado.

Un cuaderno por asignatura o por proyecto. Mezclar Historia contemporánea con el manual de la caldera produce citas cruzadas. Mezclar dos cursos, también. Nombre del cuaderno: `HC_tema3_apuntes`, no `todo_la_carrera`.

Qué entra: apuntes *tuyos*; material que te han dado para estudiar (campus, boletín); un artículo público que vas a contrastar. Qué no entra: el scan del libro de editorial que no es tuyo; exámenes de un compañero sin permiso; identidad, salud, menores, secretos, evaluaciones; el trabajo de otro “para adaptarlo”. Si dudas si el PDF es tuyo, no lo cargas. Estudias con el papel o con el campus.

## Cómo preguntar a tus apuntes (páginas, cita, no el ensayo)

**Preguntar a tus apuntes** es el job. No “explícame el siglo XX”. No “escribe el comentario de texto”. Preguntas que el material puede sostener, con página.

Antes de preguntar:

1. Cuaderno nuevo para *esta* materia o *este* tema.
2. Fuentes: las que tocan. Si un PDF tiene 80 páginas y solo vas a estudiar el tema 3, sube ese PDF si es el del profesor *y* en la pregunta acotas el rango; o extrae las páginas del tema a un PDF de trabajo, como harías con cualquier chatbot.
3. Mira que el producto haya indexado las fuentes (el icono o la lista lo dicen; si una falla, esa fuente no existe para el cuaderno).

Prompt que sirve:

```
En las fuentes de este cuaderno, solo el PDF de apuntes del tema 3.
Pregunta: qué causas del conflicto lista el texto en las primeras páginas
del capítulo (aprox. páginas 1 a 8).
Formato: viñetas. Cada viñeta: afirmación + página o sección si aparece.
Límite: no inventes causas. Si no está en esas páginas, escribe NO ESTÁ.
No completes con conocimiento general. No redactes un ensayo.
```

Variantes útiles:

- “Hazme cinco preguntas de comprensión sobre *este* PDF, con la respuesta al final y la página. Si no puedes citar página, no pongas la pregunta.”
- “Tabla: término que usa el texto, definición *tal como aparece*, página. Celdas vacías si no está.”
- “Señala si el apartado 2 contradice el 2.3. Cita. Si no hay contradicción, NO HAY.”
- “Lista lo que el texto dice que hay que llevar el día de la práctica. Nada más.”

Qué no pidas:

- “Escribe el trabajo de 2.000 palabras.” El modelo no entrega la asignatura. Tú escribes. Si necesitas un esquema de *secciones que el PDF ya usa*, pide el esquema de títulos, no la prosa del comentario.
- “Resuélveme el examen.” Preguntas de comprensión sobre el material, sí. Las respuestas del parcial las redactas tú, con el libro cerrado si así lo pide la prueba.
- “Completa lo que falta del temario.” Si no está en las fuentes, NO ESTÁ. Completar es inventar.

Después de cada respuesta: PDF abierto. Clic en la cita si la interfaz la muestra. Si no hay clic, buscas la frase en el lector. Si la página no dice eso, tachas. El método es el mismo que en cualquier modelo: extraer, abrir, marcar. Aquí el original es *tu* fuente, no una web.

## Podcast de un PDF en NotebookLM: repaso, no fuente

**Podcast de un PDF NotebookLM** (Audio Overview / resumen en audio: dos voces que “hablan” del material) es una ayuda de estudio. No es el documento. No es una clase del profesor. Es un modelo que ha leído (o ha creído leer) las fuentes y produce una conversación.

Cómo usarlo sin convertirlo en la biblia del tema:

1. Generas el audio *después* de haber cargado solo las fuentes del tema. Un cuaderno con doce PDFs mezcla capítulos en el audio.
2. Escuchas con el PDF a mano, o tomas notas de afirmaciones concretas (nombres, cifras, “el texto dice que…”).
3. Cada afirmación fuerte se busca en el original. Una anécdota oral que no está en el PDF: fuera. Un “según el autor, el 73 %…”: buscas el 73. Si no está, el audio ha alucinado o ha mezclado fuentes.
4. No transcribes el podcast al trabajo. No lo citas. El trabajo cita el PDF (o el artículo) que *tú* has abierto.
5. Si el audio te ayuda a oír la estructura (“primero causas, luego consecuencias”), usas esa estructura para *releer* el capítulo. La estructura la confirma el índice del PDF, no el tono de las voces.

Límites del audio: se desactualiza si cambias fuentes y no lo regeneras; puede insistir en el prólogo y saltarse las páginas 1-8 que te importan; puede sonar seguro en un dato falso. El oído cansa menos que leer; por eso se cuela el error. El gesto de marcar NO ESTÁ no cambia porque vaya en auriculares.

Si no vas a contrastar el audio, no lo uses ese día. Lee el capítulo.

## NotebookLM vs ChatGPT para el mismo PDF

**NotebookLM vs ChatGPT** se decide por el recinto, no por quién “entiende mejor”.

NotebookLM: el universo es el cuaderno. Preguntas al material. Las citas deberían apuntar a *tus* archivos. Encaja estudiar un tema con 2-5 fuentes fijas, volver varios días, generar preguntas de comprensión, un audio de repaso. No encaja “una duda suelta de un párrafo” (demasiada ceremonia) ni “busca qué dice la prensa hoy”.

ChatGPT: un chat general. Adjuntas un PDF y puede mezclar el archivo con conocimiento general. Encaja un recorte puntual, un esquema de un texto corto, reescribir *tu* párrafo. No encaja como cuaderno de una asignatura a lo largo del cuatrimestre: el hilo se pierde, el modelo completa el temario, y no tienes un recinto de fuentes.

Claude: PDF largo, un capítulo, una tabla, cifras. Otro job. Si el archivo es un manual de 140 páginas y quieres la instalación, Claude. Si son *tus* apuntes del tema 3 y vas a preguntarles una semana, NotebookLM.

Regla sucia: **si la respuesta debe poder señalar una página de un archivo que tú controlas, NotebookLM. Si es un recorte de un rato y ya está, un chat. Si es un libro que no es tuyo, ninguno: lees el libro.**

En los tres, el original gana. En los tres, el trabajo escrito lo firmas tú.

## Límites de NotebookLM (citas, copyright, examen)

**Límites de NotebookLM** que importan el martes, no el ranking del producto:

1. **Citas alucinadas.** La interfaz muestra un pasaje o una página. Abres. A veces el pasaje no está, está en otra página, o está y dice lo contrario. Tratas cada cita como un ítem: SÍ, NO ESTÁ, OTRA COSA. No asumas que “como está anclado, no inventa”. Inventa menos a menudo que un chat suelto. Inventa.
2. **Tope de fuentes, de tamaño, de palabras.** Cambia de plan y de mes. Mira la ayuda el día que cargues. Si no indexa un PDF, ese PDF no está. No preguntes como si estuviera. Parte el archivo o quita fuentes de más.
3. **Libros y PDFs que no son tuyos.** Un scan del manual de la asignatura bajado de un foro no se convierte en “mis apuntes” porque lo hayas metido en el cuaderno. Si no lo posees o no te lo han dado para usarlo así, no lo cargas. Estudia con el ejemplar legal o con lo que el campus te da.
4. **El examen y el entregable.** El modelo no se sienta por ti. No le pidas el comentario, el caso práctico resuelto para entregar, ni las respuestas del parcial. Preguntas de comprensión, esquemas de *lo que el texto ya divide*, listas de términos *con página*: sí. La prosa que vas a firmar: tuya, después de haber estudiado.
5. **Privacidad.** Cuenta de Google. El archivo viaja. Nómina, salud, menores, secretos: fuera. Apuntes con nombres y evaluaciones: anonimiza o no subas.
6. **Mezcla de asignaturas.** Un cuaderno “carrera” arrastra un dato de Derecho a Historia. Un cuaderno por materia.

Si el producto se niega a una fuente, no busques un jailbreak. Reformulas una tarea lícita con un archivo que sí es tuyo, o estudias sin el cuaderno.

## Ejemplo trabajado: Pablo, tema 3, páginas 1-8

Pablo cursa Historia contemporánea. Tiene un PDF de *sus* apuntes (24 páginas, las ha pasado él a limpio). El profesor ha colgado en el campus un boletín de prácticas (público para el grupo, 6 páginas). El examen es el viernes: preguntas cortas sobre el tema 3, no un trabajo para entregar. Pablo no tiene el PDF del manual de la editorial; tiene el ejemplar en papel, que no va a escanear entero para el cuaderno.

Qué hace el lunes:

1. Cuaderno nuevo: `HC_tema3`. Fuentes: `apuntes_tema3.pdf` y `boletin_practicas_t3.pdf`. No sube el DNI ni el listado de clase que venía en un correo. No sube un PDF de “resúmenes” de un grupo de Telegram.
2. Comprueba que las dos fuentes aparecen como listas. Si el boletín falla, trabaja solo con apuntes.
3. Pregunta:

```
Solo apuntes_tema3.pdf, páginas 1 a 8 (causas).
Lista las causas que el texto enumera.
Cada ítem: frase corta + página.
No añadas causas de otras páginas ni del boletín.
Si una causa no está en 1-8, NO ESTÁ.
No redactes un ensayo.
```

4. NotebookLM devuelve seis causas. La 4 cita “página 5: crisis de 1929 como detonante exclusivo”. Pablo abre el PDF, página 5. El texto dice: “la crisis de 1929 *agrava* un conflicto ya en marcha”. OTRA COSA: no es detonante exclusivo. Tacha “exclusivo”. Reescribe él en su ficha: “agrava (p. 5)”. La causa 6 no aparece en 1-8; aparece en la página 19. NO ESTÁ para *esta* pregunta. “La 6 no está en 1-8. Quítala. No sustituyas.”
5. Segunda pregunta: “Cinco preguntas de comprensión sobre las páginas 1-8, respuesta y página al final. Si no hay página, no la pongas.” Las usa para estudiar *con el PDF cerrado después*, como haría con preguntas de un compañero. No las envía al profesor como si fueran el examen.
6. Audio overview del cuaderno (solo esas dos fuentes). Escucha 12 minutos. Anota “el boletín pide tres documentos el día de la práctica”. Abre el boletín: sí, página 2, tres documentos. Anota “el audio dice que el tema niega cualquier papel de la crisis”. Los apuntes no lo niegan; dicen “agrava”. Tacha esa frase del audio. No la estudia.
7. El viernes escribe las respuestas *él*, en el aula, sin el cuaderno. Lo que sobrevive es lo que ha contrastado y ha podido repetir sin el modelo.

Eso es estudiar con NotebookLM. Lo que no haría: “redacta el comentario de 800 palabras para entregar el jueves”; “súbeme el PDF del libro de la editorial que encontré”; “haz el test del campus”. El modelo no entrega la asignatura. Pablo tampoco se la hace entregar.

## Errores al estudiar un PDF con NotebookLM

**Tratar el cuaderno como ChatGPT.** Preguntas al mundo. Completa. Tú querías el tema 3.

**Citar el audio o la respuesta en el trabajo.** Citas el PDF o el artículo que has abierto. El cuaderno no es fuente.

**Un cuaderno para toda la carrera.** Mezcla. Un cuaderno por materia, o por tema si el producto se atasca.

**Subir el libro que no es tuyo** o los apuntes de otro sin permiso. El clip no te da derechos.

**Pedir el entregable.** Esquema de títulos del PDF, sí. El ensayo, no.

**No abrir la cita.** El chip de pasaje no es la comprobación. Abres.

**Evaluaciones o menores en el PDF.** El nombre “Notebook” no anonimiza.

**Confiar en que “está anclado”.** Sigue habiendo NO ESTÁ.

## Para aquí

**NotebookLM para estudiar PDF** cabe en cinco líneas:

1. **Cuaderno de fuentes que ya son tuyas.** Una materia. Nada sensible. Nada que no te pertenezca.
2. **Preguntar a tus apuntes:** rango, página, NO ESTÁ. No el ensayo. No el examen.
3. **Podcast / audio overview:** repaso. Cada dato fuerte se busca en el PDF. No se cita.
4. **NotebookLM vs ChatGPT:** recinto de fuentes frente a chat general. El original gana en los dos.
5. **Límites:** citas alucinadas, topes, copyright, privacidad, el modelo no entrega la asignatura.

Cierra el cuaderno cuando tus fichas tengan solo el SÍ. El viernes escribes tú. Si el archivo no podía entrar, no ha entrado. Ese “no” también es estudiar.
