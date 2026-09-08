---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Por qué un chatbot se inventa datos"
description: >-
  Alucinaciones de inteligencia artificial: por qué un chatbot inventa
  nombres, cifras y fuentes, y qué hacer en ese momento antes de copiarlo.
readTime: 11 min
keywords:
  - alucinaciones inteligencia artificial
  - chatgpt inventa información
  - por qué la ia miente
  - alucinación de un modelo de lenguaje
  - respuestas falsas chatgpt
  - cómo detectar una alucinación de ia
  - ia se inventa fuentes
excerpt: >-
  El chatbot no “miente” como una persona: predice la siguiente palabra y
  a veces esa predicción es un BOE, una URL o una fecha que no existen.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/por-que-un-chatbot-se-inventa-datos'
related_routes:
  - como-comprobar-si-una-respuesta-de-ia-es-fiable
  - que-es-la-inteligencia-artificial-sin-ciencia-ficcion
  - como-usar-un-chatbot-de-ia-por-primera-vez
  - como-escribir-un-prompt-que-sirva
  - perplexity-buscar-con-citas-a-la-vista
faqs:
  - question: ¿Por qué un chatbot se inventa datos?
    answer: "Porque predice el siguiente trozo de texto más probable, no consulta un expediente verificado. Si el patrón de ‘artículo del BOE’ encaja, puede completar un número de disposición, una fecha y un título que suenan bien y no existen. La fluidez no es una prueba."
  - question: ¿Por qué la IA miente si no es una persona?
    answer: "No miente: no tiene intención de engañarte. Completa un patrón. ‘Mentira’ es la palabra que usamos cuando el resultado es falso y suena seguro. El mecanismo es el mismo que cuando acierta: siguiente token. Por eso el tono no te avisa."
  - question: ¿Cómo detectar una alucinación de IA en el momento?
    answer: "Busca nombres propios, cifras, fechas, artículos de ley y URLs. Cada uno es un candidato. Si no puedes abrir la fuente en treinta segundos, no lo copies. Pide al chat que marque lo que no está seguro; aun así, no te fíes del marcado."
  - question: ¿ChatGPT inventa fuentes de verdad?
    answer: "Sí. Inventa autores, títulos de papers, enlaces que parecen del BOE o de un ministerio, y citas con año. A veces el dominio es real y la página no. A veces la página existe y no dice lo que el chat afirma. Abre el enlace. Si no carga, esa fuente no vale."
  - question: ¿Qué hago si el chatbot me acaba de inventar un dato?
    answer: "No lo pegues al email, al trabajo ni al examen. Señala el punto concreto, pide que lo quite o que escriba ‘no encontrado’. Contrasta el dato en la web oficial o en tu original. El método largo de contrastar está en el artículo hermano de comprobar una respuesta."
---

**Alucinaciones de inteligencia artificial** es el nombre técnico de un gesto muy simple: el chatbot te escribe un nombre, una cifra, una fecha o una fuente que encajan en la frase y no son ciertos. No tartamudea. No pone un asterisco. Te lo da con la misma prosa que usó en el párrafo anterior, el que sí era correcto. Si copias, copias el invento.

Este artículo explica **por qué** pasa y **qué haces en ese momento**. El método para contrastar está en [cómo comprobar si una respuesta de IA es fiable](/blog/inteligencia-artificial/como-comprobar-si-una-respuesta-de-ia-es-fiable). El marco del programa, en [qué es la inteligencia artificial (sin ciencia ficción)](/blog/inteligencia-artificial/que-es-la-inteligencia-artificial-sin-ciencia-ficcion). Aquí: mecanismo, tres mentiras típicas en español, no pegar el dato.

## Qué es una alucinación de un modelo de lenguaje

Una **alucinación de un modelo de lenguaje** no es una visión. No es que el programa “vea” cosas. Es una continuación fluida que afirma un hecho inexistente o distorsionado como si formara parte del mundo.

Tres formas habituales:

1. **Inventa por completo.** Un Real Decreto que no está en el BOE. Un autor de un paper que no ha publicado eso. Una URL que al abrirla da 404.
2. **Mezcla.** El nombre de la ley es real. El número del artículo no. O el artículo existe y el chat le atribuye un plazo que está en otra norma.
3. **Desplaza.** La fecha es de otra disposición. El porcentaje es de otro año. El cargo de la persona es el de 2019.

En los tres casos el texto se lee bien. Por eso cuesta pillarlo si lees en diagonal.

No es un fallo raro de un producto. Es el mismo motor que hace útil al chat: completar el patrón. Cuando el patrón es “email de reclamación en tono neutro” y tú le has pegado el email, suele ir bien. Cuando el patrón es “citar el BOE con número, fecha y título”, el modelo puede fabricar los tres campos porque ha visto miles de citas con esa forma.

**Respuestas falsas ChatGPT** (o Gemini, o el Copilot) no se anuncian. No hay un badge de “esto lo he inventado”. Algunos productos muestran enlaces; los enlaces también pueden ser basura. El producto no te absuelve de leer.

Definición operativa: **si el chat afirma un dato comprobable y ese dato no se sostiene al abrirlo, es una alucinación.** Da igual el tono seguro. Da igual que se disculpe después. El primer párrafo ya era falso. Una opinión genérica (“conviene ser claro”) no es un BOE falso. Una negativa del sistema (“no puedo ayudarte”) es política, no dato.

## Por qué la IA “miente” (es predicción, no archivo)

**Por qué la IA miente** es la búsqueda. La respuesta corta: no miente. No hay un sujeto que sepa la verdad y elija ocultarla. Hay un programa que, dado el texto hasta aquí, elige el siguiente *token* (un trozo de palabra) más probable según el entrenamiento y según lo que llevas escrito en el chat.

Eso se llama predicción del siguiente token. Encadena tokens. Sale una frase. Sale un párrafo. Sale un “según el artículo 14 bis del Real Decreto 1847/2023, de 12 de diciembre”. Cada pieza ha sido la continuación más plausible *en estilo*. El estilo de una cita legal es rígido: número, fecha, título. El modelo rellena los huecos. Un hueco rellenado no es un registro del BOE.

Consecuencias prácticas:

1. **El tono no está calibrado con la verdad.** Entrenado para ser útil y fluido, completa. Completar empuja a no dejar un “no lo sé” en una lista de cuatro. El cuarto punto se inventa para que cierre.
2. **Si no le has dado el documento, no lo tiene.** “¿Qué dice mi convenio sobre el plus?” sin pegar el convenio invita a un plus genérico. A veces acierta un artículo famoso. A veces es de otro sector.
3. **Si se lo has dado, igual inventa.** Extrae tres plazos y fabrica el cuarto. Cita una página que no está en el PDF. El original al lado no es opcional.
4. **Pedir “fuentes” empeora a menudo.** El patrón se parece a una bibliografía (autor, año, título, URL). El modelo sabe construir esa plantilla. **La IA se inventa fuentes** con la misma facilidad con la que inventa un segundo apellido.

No hace falta la matemática. Hace falta dejar de tratar el chat como un archivero. Un archivero busca la ficha o dice que no está. Este programa prefiere una ficha plausible.

Por eso **ChatGPT inventa información** también cuando le pides algo que “debería saber”: una fecha de ley, un cargo, un horario. A veces acierta porque el dato es muy frecuente en el entrenamiento. A veces ganan dos fechas cercanas y sale la incorrecta. Tú no ves esa competición. Solo ves la frase. Es un teclado predictivo a escala de informe: si copias la hora sin mirar el calendario, la hora es suya.

## Cómo se ve cuando ChatGPT inventa información

Mejor con ejemplos en español. Son prototipos. No los uses como si fueran casos reales de un producto en una fecha concreta. Sirven para entrenar el ojo.

**Ejemplo 1. El artículo del BOE que no existe.**

Pides: “Necesito la disposición que regula X en España. Dame la cita completa.”

El chat responde, muy formal:

> Real Decreto 1847/2023, de 12 de diciembre, por el que se regula el procedimiento abreviado de X. Artículo 7.3: el interesado dispone de diez días hábiles.

El molde es perfecto: “Real Decreto [número]/[año], de [día] de [mes]”. El número puede no existir o existir con otro objeto. El “artículo 7.3” y los “diez días hábiles” son el relleno más frecuente de procedimiento administrativo: encajan siempre; no por eso están en esa norma.

Sin montar el método largo: copias *solo* el identificador (tipo, número, año, fecha) y lo buscas en [boe.es](https://www.boe.es). Si no sale, esa cita no se usa. El BOE es el archivo. El chat no.

**Ejemplo 2. La URL que parece oficial.**

El chat cierra el párrafo con:

> Puedes consultarlo aquí: `https://www.boe.es/buscar/doc.php?id=BOE-A-2024-99999`

El dominio es real. La ruta parece la de siempre. El identificador `BOE-A-2024-99999` es un número que *podría* existir. Abres la URL. Error, página en blanco, o un documento que no habla de lo que el chat decía. **La IA se inventa fuentes** también así: no fabrica un dominio de broma; fabrica el id que va detrás.

Variante peor: la URL carga un PDF de 2018 sobre otro tema. El chat ha mezclado. Tú has visto “boe.es” en azul y has bajado la guardia.

**Ejemplo 3. La fecha corrida.**

Pides cuándo entró en vigor una ley que sí existe. El chat dice “3 de marzo de 2024”. La ley es real. La entrada en vigor es otra (una disposición final, un año distinto, “al día siguiente de su publicación” que no cae en ese 3 de marzo). El error es pequeño, local, y te arruina un plazo.

Las **respuestas falsas ChatGPT** en fechas son las más caras: no “suenan inventadas”. Un nombre raro alerta. Un día del calendario no. El mismo patrón vale para un paper con DOI que no resuelve, un “73 % de las pymes”, un cargo de 2019 o una cita entre comillas que no está en *tu* PDF.

Patrón común: **dato concreto + formato institucional + cero duda.** Eso buscas. No si el texto “parece inteligente”.

## Cómo detectar una alucinación de IA en el momento

**Cómo detectar una alucinación de IA** no es un detector mágico ni un segundo modelo que “verifique”. Eres tú, en el minuto en que llega la respuesta, antes de Ctrl+C.

Haz esta pasada, rápida:

1. **Subraya mentalmente (o de verdad) nombres, cifras, fechas, leyes, URLs, títulos de trabajos.** Todo lo que se podría buscar. El resto (tono, orden, “es importante destacar”) puede ser ruido, no suele ser un identificador falso.
2. **Pregúntate: ¿esto estaba en mi input?** Si pegas un email y el chat saca un “plazo de 15 días” que no está en el email, es invento o es un plazo genérico colado. Fuera.
3. **Pregúntate: ¿puedo abrir esto en treinta segundos?** BOE, web del ministerio, tu PDF, el correo original, la ficha de la empresa en el Registro. Si no puedes, no lo uses todavía. “Todavía” no es “nunca”: es “no en este pegado”.
4. **Mira el cierre de las listas.** El último punto de una enumeración de cinco es un sitio clásico de relleno. El modelo quiere cerrar el patrón “lista de cinco”.
5. **Mira las fuentes al final.** Si aparecen de golpe cuando tú no las has pedido, sospecha. Si las has pedido, ábrelas igual. Pedir fuentes no convierte al modelo en bibliotecario.

Una frase de control que puedes pedir (no sustituye abrir el original):

> “Marca con [NO ESTÁ] cualquier nombre, fecha, cifra o fuente que no esté en el texto que te he dado o que no puedas justificar. No inventes URLs.”

A veces obedece. A veces marca mal. Es auxiliar, no un sello. El “es posible que”, la disculpa del turno anterior o el plan de pago no detectan nada: pagas límites, no un archivo del mundo. Si la tarea era redactar, detectas igual los hechos colados. Un email más corto que inventa “el servidor estuvo caído” es una alucinación de motivo. Tú la firmas.

## Qué hacer cuando el chatbot se inventa datos (ese minuto)

No montes aquí el protocolo de fact-check completo. Monta el gesto de no copiar y de no pelearte con el programa.

**1. No lo pegues.** Ni al correo, ni al Word del TFG, ni al informe, ni al chat de WhatsApp del grupo de clase “como fuente”. El daño empieza en el pegado, no en la generación. Generar es barato. Enviar es tuyo.

**2. Señala el punto, no la moral.** Siguiente mensaje: “El Real Decreto 1847/2023 no me cuadra. Quítalo. No pongas otra cita. Escribe ‘no encontrado’ si no está en el texto.” No preguntes “¿por qué mientes?”. No mejora el siguiente token. El modelo no se educa con un sermón en ese hilo.

**3. Separa lo usable de lo podrido.** Un resumen de cinco viñetas puede tener cuatro bien extraídas de *tu* PDF y una fecha fabricada. No tires el resumen entero por pánico ni aceptes las cinco por pereza. Tacha la quinta. Quédate las cuatro si las has visto en el original.

**4. Abre *una* fuente oficial o el original, no diez pestañas de blogs.** Para una cita legal, BOE o la consolidada de la agencia que toque. Para un dato de tu documento, tu documento. Para un horario, la web del organismo. Si en esa apertura el dato cae, se acabó. Si no puedes abrirlo ahora, el dato no entra en lo que vas a usar ahora.

**5. Chat nuevo si el hilo está contaminado.** Has discutido tres citas falsas y te suelta una cuarta. Copias el fragmento a un chat nuevo: no cites nada que no esté en el texto. El historial largo es ruido.

**6. Cambia la tarea si pides un archivo del mundo.** “Dame la norma” es buscador y web oficial. El chat ayuda *después* a explicar un PDF que tú has bajado. Al revés, alimentas la alucinación.

Si tienes que contrastar varias cifras o un párrafo de fuentes, usa [cómo comprobar si una respuesta de IA es fiable](/blog/inteligencia-artificial/como-comprobar-si-una-respuesta-de-ia-es-fiable). Aquí el minuto del susto: no copiar, señalar, abrir una fuente. El prompt que reduce inventos (no los elimina) está en [cómo escribir un prompt que sirva](/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva): tarea, texto, formato, “no inventes”.

## Errores habituales al tratar una alucinación

**Discutir filosofía con el modelo.** “¿Eres consciente de que has mentido?” Produce un párrafo de disculpa y, a veces, otra cita igual de falsa “para corregir”. El trabajo no es educar al programa. Es no usar el dato.

**Pedir más fuentes para “verificar” la fuente falsa.** Encadenas bibliografía inventada. El patrón se refuerza. Para. Abre el BOE o cierra.

**Creer que un “según mis conocimientos a fecha de…” salva el párrafo.** Esa coletilla es estilo. No es una marca de agua de veracidad. Detrás puede haber un 2024 incorrecto igual.

**Usar otro chatbot como testigo.** Preguntas a Gemini si lo de ChatGPT es cierto. A veces se copian el error porque el patrón es el mismo. A veces se contradicen y tú te quedas con el que suena mejor. El testigo válido es el original o la web oficial, no otro predictor.

**Ignorar el invento porque “el resto estaba bien”.** El resto bien es el anzuelo. Un plazo falso en un informe de una página es un informe falso para quien reciba ese plazo. Si se lo pegas al compañero “para que lo mire” con pinta de ya contrastado, has multiplicado la alucinación.

**Asustarte y no volver a usar el chat.** Sigue sirviendo para reescribir *tu* texto y extraer lo que *está*. El fallo es usarlo como registro del mundo. Otro gesto, no una crisis de fe.

## Para aquí

Tres líneas, y paras:

1. El chatbot **predice el siguiente token**. Una cita legal, una URL y una fecha son huecos fáciles de rellenar con aspecto oficial.
2. **Alucinaciones de inteligencia artificial** se ven en nombres, cifras, fechas, leyes y fuentes. La fluidez no avisa.
3. En el momento: **no copies**, señala el punto, abre *una* fuente oficial o el original, no discutas. El método largo de contrastar es el artículo hermano.

El programa no te ha traicionado. Ha hecho lo que hace siempre. Tú no le has dado, en ese minuto, el trabajo que sí sabes hacer: no firmar un dato que no has abierto.
