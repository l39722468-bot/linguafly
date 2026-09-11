---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Whisper en local o en la nube"
description: >-
  Whisper local o en la nube: calidad frente a no subir una reunión
  confidencial. Criterio práctico, no un manual de sistema. Elige y transcribe.
readTime: 11 min
keywords:
  - whisper local o en la nube
  - openai whisper guía
  - transcribir sin subir el audio
  - privacidad de una transcripción
  - whisper.cpp o la api
  - calidad de un modelo de audio
  - reunión confidencial y whisper
excerpt: >-
  Nube si el audio puede salir y te importa el último punto de calidad.
  Local si la reunión no debe viajar. Whisper.cpp se instala por la
  documentación oficial, no por un foro.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/whisper-en-local-o-en-la-nube'
alt: Whisper transcribiendo audio en local frente a la opción en la nube
related_routes:
  - transcribir-una-reunion
  - privacidad-al-usar-ia-que-no-pegar-nunca
  - no-pegar-secretos-ni-el-env
  - chat-temporal-o-modo-que-no-guarda
  - subtitulos-de-un-video
faqs:
  - question: ¿Whisper en local o en la nube para una reunión de trabajo?
    answer: "Si el audio no puede salir (confidencial, la org lo prohíbe, hay nombres de un conflicto), local o la herramienta contratada. Si el audio puede salir y te importa un poco más de calidad, API o el producto de consumo que ya uséis. El criterio es el archivo, no la marca. La transcripción se revisa igual."
  - question: ¿Qué es OpenAI Whisper y hace falta saber de servidores?
    answer: "Un modelo de audio a texto. En la nube lo llamas por una API o lo usa un chat que acepta audio. En local, un programa en tu máquina (a menudo whisper.cpp) carga un fichero de modelo y no sube el mp3. No hace falta un manual de sysadmin. Sí hace falta instalar desde la documentación oficial y no pegar el audio confidencial ‘a ver’."
  - question: ¿Puedo transcribir sin subir el audio?
    answer: "Sí: local. El archivo se queda en el disco. El texto también, si no lo pegas después en un chatbot. Local no lava un consentimiento que no pediste ni convierte el verbatim en acta. Solo evita el envío al proveedor. Si luego pegas el .txt en ChatGPT, el texto viaja igual."
  - question: ¿whisper.cpp o la API, cuál es ‘mejor’?
    answer: "La API suele acertar un poco más en audio sucio, con el modelo grande del servicio. whisper.cpp no envía el fichero. ‘Mejor’ es la pregunta equivocada: para una reunión confidencial, no enviar gana. Para un webinar público ya publicado, la API es un atajo razonable. Revisa nombres y números en los dos."
  - question: ¿Un chat temporal evita subir el audio de Whisper?
    answer: "No. Temporal no intercepta la API ni el archivo que ya enviaste. El modo que no guarda el hilo no es un transcriptor local. Si el problema es el mp3, eliges local o no transcribes en ese producto. El detalle del modo está en el artículo de chat temporal."
---

**Whisper local o en la nube** es una decisión de archivo, no de marca: calidad frente a no subir una **reunión confidencial**. El modelo se llama Whisper. El trabajo es el mismo (audio → texto sucio). Cambia si el mp3 sale de tu máquina. No es un manual de sysadmin. No es el oficio de [transcribir una reunión](/blog/inteligencia-artificial/transcribir-una-reunion) (consentimiento, hablantes, el texto no es el acta). Aquí eliges recinto.

La higiene de qué viaja está en [privacidad al usar IA: qué no pegar nunca](/blog/inteligencia-artificial/privacidad-al-usar-ia-que-no-pegar-nunca). Si el audio dicta una clave, ni nube ni prompt: [no pegar secretos ni el .env](/blog/inteligencia-artificial/no-pegar-secretos-ni-el-env). Un chat temporal no intercepta el fichero. Esta página es **whisper.cpp o la API**, con un criterio que puedas usar el martes.

## El criterio: calidad o no subir

Antes del binario, tres preguntas. Si la primera falla, no hay API de consumo.

1. **¿Este audio puede salir de tu aparato hacia un proveedor?** Si la org lo prohíbe, si hay un conflicto con nombres, si hay un cliente con ficha, si alguien no consintió el rec: no. Local, herramienta contratada, o no transcribes.
2. **¿Te va la vida en el último punto de acierto** (un número, un apellido en un audio sucio)? La nube con modelo grande suele ir un poco mejor. Sigue mintiendo. Sigue pidiendo revisión.
3. **¿Vas a pegar el texto después en un chatbot?** Entonces el audio “en local” no cierra el envío. Has transcrito en casa y has mandado el verbatim. Cuenta los envíos.

Eso es el criterio. El resto de la página son ejemplos para que no se quede en “depende”.

Luis, dos archivos el mismo mes:

- **A.** Webinar interno de 18 minutos, ya publicado en el intranet, sin datos de clientes. Consentimiento de la sesión grabada. Puede salir. API o el transcriptor de la plataforma. Revisa siglas.
- **B.** Conversación de 25 minutos sobre un ajuste de equipo, con nombres y un “esto no sale de aquí”. No puede salir. Local o notas a mano. No hay “Whisper de prueba en la web que vi en Twitter”.

No mezcles A y B en la misma cuenta personal “porque ya está abierto el chat”.

### OpenAI Whisper guía (qué es, qué no)

**OpenAI Whisper guía**, en la práctica, cabe en un bloque. Whisper es un modelo de reconocimiento de voz. Lo entrenaron para pasar audio a texto en varios idiomas, entre ellos el español. No es un acta. No es un notario. No es tu DPD.

Tres formas de encontrarlo, sin instalar aún nada:

1. **Dentro de un producto** (ChatGPT u otro chat que acepte un mp3; transcripción de una plataforma de vídeo). Tú subes o la plataforma ya tiene el rec. El audio, si sube, viaja.
2. **La API.** Un programa o una herramienta llama al servicio. Envías el fichero (o un flujo). Devuelven texto. Pagas por uso. El fichero sale.
3. **Pesos en local.** Descargas un archivo de modelo a tu disco. Un programa (a menudo **whisper.cpp**) lo ejecuta. El mp3 no tiene por qué salir. El modelo ocupa sitio. La CPU o la GPU tardan.

Qué no es esta guía:

- Una receta de exploits, de “saltar la cuota” o de un binario de un foro.
- Un benchmark de tarjetas gráficas.
- La política de retención del proveedor. Eso se lee en el proveedor. Aquí asumes que un envío es un envío.
- Cómo etiquetar cada hablante. Un paso corto está en transcribir una reunión. El oficio largo, no.

Idioma: fíjalo en español si la sala habló español. El “auto” se pierde a mitad y te traduce un turno. Eso no es calidad. Es un modo mal puesto.

Luis, archivo A. En la API o en el producto: idioma `es` o “español”. En local: el mismo gesto si la herramienta lo ofrece. Si no ofrece idioma, oyes el primer minuto del texto. Si sale en inglés y la sala habló en español, paras y corriges el parámetro. No “mejoras” el inglés con otro chat.

### La API: transcribir en la nube

La API (u otro cloud que use Whisper o un modelo parecido) es el atajo cuando **el audio puede salir**.

Pasos, criterio ya pasado:

1. Recorte. Un tema. Sin el tramo de la ficha. Consentimiento ya pedido en la grabación original, si era una reunión.
2. Cuenta de trabajo si la org la tiene. Si no hay recinto laboral y el audio es laboral sensible, no improvisas la cuenta personal. Vuelves al criterio: local o no transcribes.
3. URL oficial del producto o de la API. No el anuncio. No el “Whisper gratis ilimitado”.
4. Subes el recorte. Pides texto. Idioma fijado.
5. Copias el .txt a tu disco. No dejes el único ejemplar en el panel.
6. Lees números, nombres, sí/no. El modelo de la nube también alucina.

Qué ganas:

- Menos fricción. No descargas un modelo de varios gigas.
- A menudo **calidad de un modelo de audio** un poco más alta en ruido y en solape, si el servicio usa la variante grande.
- Alguien más mantiene el servidor.

Qué pierdes:

- El fichero viajó. Historial, logs, incidentes. Borrar en la interfaz no es una certificación.
- Si el producto mezcla “transcribe y haz el acta”, rellena asistentes. Pides *solo* texto. El acta es otro artículo.

**Intento 1 (vago):** Luis arrastra el mp3 B (ajuste de equipo) a una web “Whisper online”. Texto usable. El audio de Nora ya está en un servidor que no está en el inventario. Mal.

**Intento 2 (API, archivo A):** recorte del webinar, cuenta de trabajo, idioma es, solo transcript. Bien. Revisa “IT” y “CRM”, que el modelo escribe “aití” y “si ere eme”.

**Intento 3 (API, archivo B “pero en temporal”):** el modo que no guarda el hilo no evita que el mp3 salga. Temporal no es local. No.

Límite de tamaño y de minutos: el de cada producto. Si corta a 25 minutos, troceas. No busques un truco para “saltar el tope”. Trocear es el trabajo.

### Transcribir sin subir el audio: whisper.cpp

**Transcribir sin subir el audio** es local. El camino habitual se llama **whisper.cpp**: un programa que carga el modelo en tu máquina y lee el fichero. Hay otras implementaciones. El criterio no cambia.

Alto nivel, no un runbook:

1. Lees la documentación **oficial** del proyecto (repositorio y README del autor). Ahí está cómo instalar en tu sistema. No copies comandos de un hilo de 2019 ni un `.exe` de un drive anónimo.
2. Descargas un modelo desde las fuentes que esa documentación indica. Empiezas por uno pequeño para probar. Si el texto sale inútil, subes de tamaño. El modelo grande pide más RAM y más tiempo. No es un ranking de LinkedIn: es tu disco y tu espera.
3. Conviertes el audio al formato que esa documentación indique. No una receta de codec aquí.
4. Transcribes el recorte. Idioma español si se puede fijar.
5. Sales un .txt. El mp3 no ha salido. El .txt tampoco, hasta que *tú* lo copies a un chat.

Qué ganas: el archivo no viaja. Una **reunión confidencial y Whisper** tiene este cajón, o el de la herramienta contratada.

Qué no ganas:

- Magia de calidad. Un modelo *tiny* miente más. Si eliges local, revisas más o esperas un modelo mayor.
- Permiso. Local no sustituye el consentimiento. No escondas el rec porque “no sube”.
- Anonimato del texto. Si pegas el .txt en ChatGPT, el contenido sale. Local fue el audio. El verbatim es otro envío. Un modo que no guarda el hilo tampoco intercepta ese pegado: [chat temporal o modo que no guarda](/blog/inteligencia-artificial/chat-temporal-o-modo-que-no-guarda).

Instalas desde la documentación oficial. Si el equipo no te deja instalar, no fuerces. Herramienta de la org o notas.

Luis, archivo B. Modelo *small*. Nora sale “Laura”. Luis oye el tramo y corrige. El mp3 no salió. No sube el .txt “a ver si Claude lo limpia” con los apellidos. Recorta si algún día necesita formato.

### Calidad de un modelo de audio

**Calidad de un modelo de audio** no es “WER de un paper”. Es lo que te pasa el martes:

- Nombres propios. Marta, NORA, un acrónimo interno.
- Números. 11 / 21, 8 % / 80 %.
- Sí y no, sobre todo con eco.
- Solape. Dos voces. El modelo elige una o mezcla.
- Ruido. Cafetería, un ventilador, un móvil lejos.

Nube con modelo grande: suele ir mejor en ruido y en español espontáneo. No certifica. Local con modelo pequeño: peor en todo eso, más rápido de bajar, cabe en un portátil flojo. Local con modelo grande: más cerca de la API, más espera, más disco.

Cómo elegir tamaño *sin* tabla de GPU:

1. Prueba un minuto de audio *parecido* (mismo mic, mismo idioma) en el recinto ya elegido. No el archivo confidencial entero.
2. Lees ese minuto. Si hay más de un número dudoso, sube de modelo o acerca el rec *antes* de la call de verdad.
3. No subas de modelo “por si acaso” en una máquina que se queda sin RAM. Trocea o usa la API *si el audio puede salir*.

El audio malo no se arregla eligiendo Whisper. Un móvil lejos miente en los dos recintos. Acércalo. Pide que no hablen a la vez.

Español de España: tuteo, “vale”, siglas. Primero texto fiel, aunque feo. Luego limpia *tú* o un chat con recorte ya sin datos.

Luis, webinar A. API. “CRM” sale mal. Lo cambia. Archivo B, local, *small*. Un “no hay presupuesto” sale “hay presupuesto”. Luis oye el tramo. Sin esa escucha, el .txt miente. El recinto no lava la revisión.

### Reunión confidencial y Whisper

**Reunión confidencial y Whisper** se decide *antes* de abrir la API. Confidencial, aquí, es práctico: la org no quiere ese audio fuera, o el contenido identifica un conflicto, un cliente, una salud, un menor, una clave.

Árbol corto:

1. **¿Hay consentimiento y aparato a la vista?** Si no, no hay Whisper. Hay notas, o no hay archivo. El oficio está en transcribir una reunión.
2. **¿La org tiene transcriptor contratado?** Úsalo para lo laboral. No dupliques en un Whisper de consumo “porque sale más limpio”.
3. **¿El audio puede salir a un proveedor de consumo?** Si no, local (whisper.cpp u otro, documentación oficial) o no transcribes.
4. **¿Vas a hacer acta o lista de tareas con un chatbot después?** Recorta y anonimiza el *texto*. No reenvíes el mp3. Nombres cortos. Un tema.

**Privacidad de una transcripción** no acaba en el mp3. El .txt es el mismo contenido en claro. Un Drive “cualquiera con el link”, un Slack público, un chat personal: mismo incidente, otra extensión. Trátalo como el original.

Qué no es confidencial de más, y entonces la nube es un atajo razonable:

- Un audio tuyo de un recado, sin terceros.
- Un webinar ya público.
- Un ensayo de una charla tuya, sin ficha de clientes.

El borde: una weekly “normal” con un turno de un cliente con apellido. Ese turno se corta. El resto, si la org lo permite, puede ir a la API. El archivo B entero, no.

No pidas al modelo un dictamen de “¿puedo subir esto?”. No lo sabe. No es tu DPD. Si dudas, no sale.

## Errores habituales (para aquí)

**Elegir nube porque “Whisper es de OpenAI y será más serio”.** El nombre no autoriza el envío. El archivo sí o no puede salir.

**Elegir local y pegar el .txt entero en el chat personal.** Has transcrito sin subir el audio y has subido el texto. Cuenta el segundo envío.

**Un .exe de un foro.** No es whisper.cpp. Es un riesgo de cuenta y de máquina. Documentación oficial o nada.

**Pedir al mismo comando transcripción y acta.** Rellena asistentes y “se acordó”. Solo texto. El acta, después, con el recorte fiel.

**Probar el modelo con el archivo B.** El minuto de prueba se hace con audio parecido que *sí* puede usarse, o con un recorte ya inocuo. No con la call de personal.

**Chat temporal como si fuera local.** El mp3 sale igual. Temporal no es un disco.

**Creer que local te ahorra el consentimiento.** El rec sigue a la vista. Local solo evita un proveedor.

**Comparar recintos con un audio distinto.** Un estudio frente a una cafetería. No concluye nada. Prueba el mismo tipo de toma.

Para aquí: si no puede salir, no sale. Si sale, revisas igual. **whisper.cpp o la API** es esa horquilla, no un ranking de hacks.

## Cierre

**Whisper local o en la nube** se reduce a esto:

1. El audio, ¿puede salir? Si no, local o herramienta de la org o notas.
2. Consentimiento y recorte van *antes*, en el otro artículo. Aquí no se reescribe esa guía.
3. API o producto de consumo: atajo de calidad, envío de por medio.
4. whisper.cpp: documentación oficial, modelo que tu máquina aguante, el mp3 se queda.
5. El .txt se trata como el original. Pegarlo es otro envío.
6. Números y sí/no se oyen. El recinto no firma.

Sin web milagrosa. Sin archivo B en la cuenta personal. Calidad es un punto. No subir, a veces, es el criterio.
