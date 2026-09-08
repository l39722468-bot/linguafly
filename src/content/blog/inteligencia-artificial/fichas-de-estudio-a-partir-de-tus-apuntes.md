---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Fichas de estudio a partir de tus apuntes"
description: >-
  Fichas de estudio con IA a partir de TUS apuntes: anverso, reverso y nada
  inventado. Si no estaba en las notas, no hay tarjeta. Anki es opcional.
readTime: 11 min
keywords:
  - fichas de estudio con ia
  - flashcards con chatgpt
  - anverso y reverso de una ficha
  - ia no invente el apunte
  - anki a partir de notas
  - preguntas cortas de estudio
  - fichas de un capítulo
excerpt: >-
  Una ficha es una pregunta y una respuesta que ya estaban en TUS notas.
  El modelo las parte. No las inventa.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/fichas-de-estudio-a-partir-de-tus-apuntes'
related_routes:
  - resumir-un-tema-de-examen-con-ia
  - preguntas-tipo-test-de-un-capitulo
  - como-escribir-un-prompt-que-sirva
  - notebooklm-estudiar-pdfs-que-ya-son-tuyos
faqs:
  - question: ¿Cómo hago fichas de estudio con IA sin que invente materia?
    answer: "Pegas TUS apuntes del capítulo. Pides anverso y reverso. Cada reverso debe poder señalarse en el texto. Si no estaba, no hay ficha. No pidas ‘las 40 tarjetas que suelen caer’."
  - question: ¿Flashcards con ChatGPT o mejor un cuaderno de PDFs?
    answer: "Chat para un fragmento corto que pegas. Cuaderno si el PDF es largo y quieres página. En los dos, abres el original. La ficha no es fuente: es un recorte de TUS notas."
  - question: ¿Puedo pasar las fichas a Anki?
    answer: "Sí, si quieres: anverso, tabulador, reverso, una línea por ficha. Eso no es un tutorial del programa. Anki no valida el contenido. Tú sigues tachando lo que no está en tus apuntes."
  - question: ¿Qué pongo en el anverso y en el reverso de una ficha?
    answer: "Anverso: una pregunta corta o un término. Reverso: la respuesta que ya está en tus notas, una o dos frases. No un ensayo. No ‘explica el capítulo’. Una idea por tarjeta."
  - question: ¿Esto sustituye a un tipo test del capítulo?
    answer: "No. La ficha es pregunta-respuesta. El tipo test es otra tarea: cuatro opciones y una correcta, también según TUS apuntes. No mezcles los dos formatos en el mismo mensaje."
---

**Fichas de estudio con IA** son tarjetas de anverso y reverso sacadas de *tus* apuntes. Si una idea no estaba en las notas, no hay ficha. El modelo no inventa el apunte. No se sienta al examen. No escribe el trabajo.

Este job no es [resumir un tema de examen con IA](/blog/inteligencia-artificial/resumir-un-tema-de-examen-con-ia): eso es esquema, definiciones y huecos. Aquí ya tienes un fragmento y lo partes en preguntas cortas. Tampoco es un tipo test de cuatro opciones: eso va aparte. Si el material es un PDF largo y quieres citar página, el recinto es [NotebookLM: estudiar PDFs que ya son tuyos](/blog/inteligencia-artificial/notebooklm-estudiar-pdfs-que-ya-son-tuyos). Aquí: una ficha = una cosa.

## Flashcards con ChatGPT: solo lo que ya escribiste

**Flashcards con ChatGPT** (o el mismo gesto en otro chat) no son un mazo bajado de internet. Son *tus* frases, partidas. El modelo propone el corte. Tú aceptas o tiras.

Antes de pegar:

1. Un capítulo o un epígrafe. No tres temas.
2. El texto *tuyo* o el que te han dado para estudiar. Apuntes a limpio, PDF del campus, hoja del seminario. Si no es tuyo, no lo pegas.
3. Un tope: “máximo 12 fichas”. Sin tope, el modelo fabrica 40 y la mitad es relleno.

Prompt que sirve:

```
Tarea: fichas de estudio a partir SOLO del texto de debajo.
Formato: tabla con columnas ANVERSO | REVERSO | PÁGINA O FRASE ANCLA.
Anverso: una pregunta corta o un término. Una idea.
Reverso: una o dos frases, con las palabras del texto o un recorte fiel.
PÁGINA O FRASE ANCLA: dónde está en MIS apuntes. Si no puedes citar, no hagas esa ficha.
Límite: no inventes definiciones. No completes con conocimiento general.
Si un dato no está en el texto, no hay ficha. Escribe NO ESTÁ; no sustituyas.
Máximo 12 fichas. Español de España. Sin introducción.

MIS APUNTES (capítulo / páginas):
"""
…
"""
```

El molde (tarea, texto, formato, prohibición) es el de [cómo escribir un prompt que sirva](/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva). El verbo aquí es *partir*, no *ampliar*.

Qué no pedir:

- “Hazme las fichas del temario de la oposición.” Sin pegar el temario, inventa.
- “Añade lo que me falta.” Eso es otro apunte, falso.
- “Pon también preguntas de examen.” No hay examen en este artículo. Hay tus notas.

Comprobación, ficha a ficha:

1. Abres el ancla. Si la frase no está, tiras la ficha.
2. Si está y el reverso dice otra cosa (un “siempre” donde tus notas dicen “según el caso”), tiras o reescribes *tú* el reverso con tus palabras del cuaderno.
3. Si el anverso pregunta dos cosas, partes en dos o tiras una.

Doce fichas contrastadas valen más que cuarenta sin abrir.

## Anverso y reverso de una ficha

**Anverso y reverso de una ficha** es el formato. No es un resumen en dos celdas. Una idea.

Anverso útil:

- Un término: “memoria de trabajo, según mis apuntes p. 14”.
- Una pregunta cerrada: “¿Qué tres procesos lista el capítulo 4 en la página 12?”
- Un hueco: “La curva de olvido, en mis notas, se asocia a ___.”

Anverso inútil:

- “Explícame el capítulo.”
- “¿Qué es importante?”
- “Habla de Piaget.” Demasiado ancho. El reverso se convierte en un párrafo y no se estudia.

Reverso útil:

- La lista o la definición *tal como está* en tus notas, recortada.
- Un número, un nombre, un paso, si el texto los trae.
- “No aparece en estas páginas” no es un reverso. Es una ficha que no debía existir.

Reverso inútil:

- Un ensayo de ocho líneas.
- Un ejemplo que el modelo ha sacado de su estadística.
- “Es un concepto clave en psicología.” Cero contenido.

Regla sucia: si no puedes tapar el reverso y comprobarlo en diez segundos contra el cuaderno, la ficha está mal cortada. Acórtala o tírarla.

Una ficha, una dirección. “Define X” no es lo mismo que “lista las tres partes de X”. Si tus notas tienen las dos cosas, dos fichas. El modelo tiende a meterlas en una. Lo separas tú.

No pongas en el anverso la respuesta. “La memoria de trabajo es el sistema de capacidad limitada…” ya es el reverso. El anverso sería “memoria de trabajo (capacidad), p. 14”.

## La IA no invente el apunte

**IA no invente el apunte.** Es el límite. El mazo no es un segundo manual. Es un índice de lo que ya copiaste o te dieron.

Cómo se cuela el invento:

- Una definición de diccionario más “limpia” que la tuya. Suena mejor. No es la de la asignatura.
- Un autor que tus notas no nombran.
- Un “siempre / nunca” donde tú tenías un “en este modelo”.
- Una ficha sobre un epígrafe que no está en el fragmento pegado.

Qué haces:

1. Columna ancla obligatoria. Sin ancla, no se importa.
2. Tras la primera tira, un mensaje: “Tacha las fichas 4, 7 y 9. No las sustituyas. No rellenes el hueco.”
3. Si el modelo insiste en completar, cambias la tarea: “No hagas fichas nuevas. Devuelve solo las que yo numere, con el reverso copiado entre comillas del texto.” Extraer es más fiel que resumir.

No le pidas “fichas de lo que suele preguntarse en esta asignatura”. Eso fabrica un temario. Tú no tienes ese banco. Tienes tus páginas.

Si una idea te falta de verdad, el hueco se estudia en el original o se pregunta en tutoría. No se convierte en una tarjeta inventada “para no dejar el mazo cojo”. El mazo cojo es información: te dice qué no está en tus notas.

Privacidad: no pegas evaluaciones con nombres, salud, menores, el DNI. Anonimiza casos de clase. El apunte de un compañero sin permiso no entra. El scan del libro que no es tuyo, tampoco.

## Preguntas cortas de estudio (una por tarjeta)

**Preguntas cortas de estudio** son el anverso en forma de pregunta. No son un examen. No son un tipo test. Son para cerrar el cuaderno y contestarte en voz alta.

Cómo pedirlas sin que se conviertan en un quiz de cuatro opciones:

```
Solo preguntas cortas de estudio, según MIS apuntes.
Cada ítem: pregunta | respuesta breve | ancla (página o cita).
La pregunta se responde en una frase o en una lista de como máximo cinco elementos que YA estén en el texto.
No pongas opciones A B C D. Eso no es este job.
No preguntes datos que no estén.
Máximo 10. Si no hay ancla, no la pongas.
```

Luego cierras el chat. Lees la pregunta. Contestas. Abres el cuaderno. Marcas SÍ, NO ESTÁ, OTRA COSA. La tarjeta que sale OTRA COSA se reescribe con *tu* frase, o se tira.

Qué no mezclar en este mensaje:

- “Y ahora un test de 20 preguntas tipo examen.” Otro artículo.
- “Y un resumen.” Otro job. Ya tienes el esquema aparte, si lo hiciste.
- “Hazlas más difíciles.” Difícil no es inventar un caso que no está. Difícil es tapar el reverso de lo que sí está.

Si fallas una ficha dos veces, no pides al modelo una explicación brillante. Vuelves a la página. La explicación brillante suele meter un ejemplo nuevo. Ese ejemplo no estaba. Mañana lo recordarás como si fuera del profesor.

Fichas de un término técnico: anverso el término, reverso la definición del capítulo, no la de la RAE. Si el profesor usa una palabra rara, esa.

## Fichas de un capítulo: el lote de un rato

**Fichas de un capítulo** se hacen en un rato, no en un fin de semana de 80 tarjetas. El capítulo 4, páginas 12-19. Punto.

Pasos:

1. Recorta el capítulo (o el rango). Si son 40 páginas, parte en dos lotes. El segundo lote, otro mensaje.
2. Pega. Tope de fichas (8, 10, 12). Español. Ancla obligatoria.
3. Recibes la tabla. No estudies aún.
4. Contrastas. Tiras las que no están. Reescribes el reverso cuando el chat ha “mejorado” la frase.
5. Copias las que sobreviven a tu lista (papel, hoja, Anki si lo usas).
6. Estudias con el chat cerrado. Anverso, respuesta, vuelco al original si dudas.
7. Las que fallas, las dejas para mañana. No pides un segundo mazo “de refuerzo” al modelo: suele duplicar e inventar. Repites las mismas.

Si el capítulo es un PDF del profesor y ya está en un cuaderno de fuentes, puedes pedir las fichas *allí*, con página. El criterio no cambia: si la página no dice eso, no hay ficha. El producto no convierte el invento en apunte.

Un capítulo, un lote. Mezclar el 4 y el 5 en el mismo pegado cruza definiciones. El modelo no avisa.

Tope práctico: si tardas más en contrastar que en leer el capítulo, has pedido demasiadas. Bajas a ocho. O partes el texto.

**Anki a partir de notas** es un export, no un curso del programa. Si no usas Anki, te vale papel o una tabla. El software no hace válida una ficha falsa.

Si quieres importar:

1. Pides al chat: “Las fichas que he marcado OK, en texto: anverso, tabulador, reverso. Una línea por ficha. Sin cabecera. Sin numeración. El anverso no lleva la respuesta.”
2. Pegas en un archivo de texto. Importas como dos campos. Listo.
3. No pidas “genera un mazo de Anki del grado entero”. Eso es invención a escala.

Qué no hace este apartado: instalar Anki, elegir add-on, sincronizar, Cloze vs Basic. Eso está en la ayuda del programa. Aquí el riesgo es el contenido. Un mazo de 400 cartas copiadas del chat sin ancla es 400 olvidos con fecha.

Si usas cloze (huecos), el hueco tiene que ser una palabra que *ya* está en tus notas. “{{c1::según el modelo de Baddeley}}” solo si esa cadena está en el cuaderno. Si el modelo mete un apellido que tú no tenías, el cloze enseña un error.

Reimportar cada vez que el chat “mejore” el mazo es una trampa. Mejoras tú la carta cuando el original lo pide (un apunte nuevo del profesor). No cuando el modelo está aburrido.

## Ejemplo trabajado: Héctor, capítulo 4, páginas 12-19

Héctor cursa Psicología. Capítulo 4, memoria. Tiene apuntes *suyos*, páginas 12 a 19. El profesor colgó un esquema de una página en el campus (público para el grupo). El examen es preguntas cortas, no un test copiado. Héctor no tiene un PDF pirata del manual; tiene el libro en papel y no lo va a escanear.

Qué hace el martes:

1. Chat nuevo. Pega páginas 12-19. Pega el esquema del campus al final, etiquetado: “ESQUEMA DEL PROFESOR, no lo uses para añadir fichas que no estén también en mis páginas 12-19.”
2. Prompt de tabla, máximo 12 fichas, ancla obligatoria.

El modelo devuelve 12.

3. Ficha 2. Anverso: “¿Qué es la memoria sensorial?” Reverso: una definición de diccionario. Ancla: “p. 12”. Héctor abre la página 12. Sus notas dicen: “sensorial: milisegundos; ecoica / icónica (clase 12/03)”. No está la definición larga del chat. Tira el reverso. Reescribe él: “milisegundos; ecoica / icónica (p. 12)”. O tira la ficha si prefiere no gastar turno. Se queda con la suya.
4. Ficha 5. Anverso: “Baddeley: componentes”. Reverso: “bucle fonológico, agenda visoespacial, ejecutivo central, *búfer episódico*”. Página 15 de Héctor: tres componentes. El búfer no está en 12-19. NO ESTÁ. Tacha el búfer. No lo estudia en este lote. Si el esquema del profesor lo nombra y Héctor no lo tiene, es un hueco para la próxima clase, no una ficha de hoy.
5. Ficha 8. Anverso: “¿Qué preguntan siempre de Ebbinghaus?” Invento de examen. Tira la ficha entera. No hay “siempre” en sus notas.
6. Sobreviven 8 fichas. Pide: “Solo las 1, 3, 4, 6, 7, 9, 10 y 12, con el reverso que yo te pegaré debajo si lo he cambiado.” Pega sus reversos corregidos. El chat no “mejora” el estilo.
7. Opcional: esas 8 en líneas con tabulador, para Anki. Importa. No pide un mazo extra de “aplicación a la vida real”.
8. Estudia con el cuaderno cerrado, luego abre página. El viernes escribe él.

Lo que no haría: “completa el capítulo como el manual”; “haz 40 cloze del libro”; “sácame las preguntas del parcial del año pasado”. El modelo no entrega la asignatura. Héctor tampoco se la hace entregar.

## Errores al hacer fichas con IA

**Pedir fichas sin pegar el capítulo.** El mazo es Wikipedia.

**Dejar la ficha cuyo ancla no abre.** El chip o el número de página no es la comprobación. Abres.

**Una ficha = el capítulo entero.** No se estudia. Se abandona.

**Mezclar tipo test en el mismo prompt.** Salen opciones inventadas y un reverso de ensayo.

**Aceptar el autor o el “siempre” de más.** Es el invento más fácil de memorizar.

**Pedir un segundo mazo porque fallaste.** Duplica e inventa. Repites las mismas cartas.

**Exportar a Anki sin haber tachado.** El programa no filtra.

**Pegar el libro que no es tuyo** o los apuntes de otro. Fuera.

**Usar las fichas como si fueran el examen.** Son práctica contra *tus* notas. El examen lo haces tú, con lo que hayas podido repetir.

## Para aquí

**Fichas de estudio con IA** caben en cinco líneas:

1. Un capítulo. Tus apuntes. Tope de fichas. Nada sensible. Nada que no te pertenezca.
2. **Anverso y reverso:** una idea, ancla, una o dos frases del texto.
3. **IA no invente el apunte.** Sin ancla, no hay tarjeta. Los huecos no se rellenan.
4. **Preguntas cortas de estudio:** chat cerrado, voz alta, vuelco al original.
5. **Anki a partir de notas:** opcional. Tabulador. El software no valida.

Si no estaba en las notas, no hay ficha. Mañana repites tú las que sobrevivieron.
