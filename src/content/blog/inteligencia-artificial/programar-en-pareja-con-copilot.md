---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Programar en pareja con Copilot"
description: >-
  Programar con GitHub Copilot en VS Code: acepta, edita o ignora cada
  sugerencia línea a línea. Tú lees el código. Pregunta a IT la licencia.
readTime: 11 min
keywords:
  - programar con github copilot
  - copilot en vscode
  - aceptar o rechazar una sugerencia
  - ia no escriba tests que no corres
  - ritmo de copilot
  - copilot chat vs autocomplete
  - cuándo apagar copilot
excerpt: >-
  Sugerencias línea a línea: aceptar, editar o ignorar. Tú lees el código;
  Copilot no es el autor, y preguntas a IT si hay licencia.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/programar-en-pareja-con-copilot'
alt: "Copilot sugiriendo código junto al editor, en pareja con la persona"
related_routes:
  - copilot-en-word-reescribir-no-inventar-el-informe
  - tests-unitarios-a-partir-de-una-funcion
  - no-pegar-secretos-ni-el-env
  - pedir-que-te-expliquen-un-error-de-codigo
  - como-escribir-un-prompt-que-sirva
faqs:
  - question: ¿GitHub Copilot escribe el programa por mí?
    answer: "Propone texto. Tú aceptas, editas o ignoras. Si no lees la sugerencia, el bug es tuyo. El autor del commit eres tú. Copilot no va a la revisión ni a producción en tu lugar."
  - question: ¿Copilot Chat y el autocompletado son lo mismo?
    answer: "No. El autocompletado sugiere en el archivo abierto, a menudo una línea o un bloque corto. El chat responde a una pregunta sobre código. Los dos se revisan igual: lees, pruebas, no pegas secretos. No uses el chat como cubo de un .env."
  - question: ¿Necesito licencia de empresa para GitHub Copilot?
    answer: "Pregunta a IT. Tener VS Code o una cuenta de GitHub no es tener Copilot de organización. No busques una copia pirata ni una cuenta compartida. Si IT dice que no, programas sin él o con la herramienta que sí esté autorizada."
  - question: ¿Puedo dejar que Copilot escriba los tests y no correrlos?
    answer: "No. Un test que no has ejecutado no existe como prueba. La IA no escriba tests que no corres: o los lanzas tú, o no los commiteas como si cubrieran algo. El detalle de pedir tests a partir de una función es otro artículo."
  - question: ¿Esto es el Copilot de Word o Excel?
    answer: "No. Este artículo es GitHub Copilot en el editor (VS Code u otro IDE con la extensión). Word, Excel y Outlook son Microsoft 365 sobre documentos. No mezcles los jobs. Si tu trabajo es reescribir un párrafo de un informe, ese es Copilot en Word."
---

**Programar con GitHub Copilot** es aceptar, editar o ignorar una sugerencia en el editor. No es dictar el repo. No es el Copilot de Word. El código sigue siendo tuyo: lo lees, lo ejecutas, lo firmas. **Copilot en VS Code** propone. Tú decides.

Este artículo es el oficio dentro del editor: autocompletado y chat de GitHub Copilot, línea a línea. No es Microsoft 365 sobre un .docx. Ese job está en [Copilot en Word: reescribir, no inventar el informe](/blog/inteligencia-artificial/copilot-en-word-reescribir-no-inventar-el-informe). No es una comparativa con Cursor: Cursor es otro editor con IA; ese flujo (chat largo sobre el repo) es otro artículo. Aquí, una línea: no es el mismo producto. Pregunta a IT la licencia. No piratees. No vuelques un `.env` en Copilot Chat.

## Qué trabajo hace (sugerir, no firmar)

**Programar con GitHub Copilot** en la práctica es esto. Tienes un archivo abierto. Escribes un nombre de función o un comentario corto. Aparece texto gris. Tab acepta. Esc ignora. Si aceptas a medias, editas. Eso es **aceptar o rechazar una sugerencia**. No hay un tercer estado mágico llamado “ya lo ha pensado el modelo”.

Qué sí:

- Completar un bucle que ya empezaste, con la misma variable.
- Proponer el `except` después de un `try` que tú abriste.
- Rellenar un `if` obvio cuando el tipo ya está a la vista.
- En el chat: “qué hace esta función de 20 líneas”, con el archivo que ya tienes, **sin secretos**.

Qué no:

- Pedir “escribe la aplicación”. El molde se rellena con APIs que no existen y con tests que no has corrido.
- Aceptar un bloque de 40 líneas sin leerlo porque “compila en la cabeza”.
- Dejar que invente una dependencia que no está en el `requirements.txt`.
- Pegar claves, tokens o un `.env` en el panel de chat “para contexto”.

El producto aparece si tienes la extensión, sesión y **licencia**. El icono se mueve. El job no: texto sobre *este* buffer, no sobre internet como fuente de verdad. Si no ves sugerencias, no está. No es un fallo tuyo. Es extensión, red, política o licencia.

Tres reglas de partida, antes de Tab:

1. **Tú has empezado el trabajo.** Un comentario o una firma de función. Si el archivo está vacío y pides “el sistema”, no estás en pareja.
2. **Una sugerencia se lee.** Si no puedes explicar la línea, no la aceptas.
3. **El original que ya funciona gana.** Una función tosca que pasa tus pruebas gana a un refactor fluido que no has corrido.

Cómo pides algo claro en el chat: tarea, contexto (el archivo o la selección), formato, qué no inventar. El contexto ya está en el disco. No hace falta pegar el repo entero.

## Licencia: pregunta a IT

GitHub Copilot de empresa no se “activa” con un truco. Es un producto de pago o un plan que la organización asigna. Tú puedes tener VS Code y no tener Copilot. Puedes tener Copilot individual en tu cuenta personal y tener **prohibido** usarlo con código de la empresa. IT lo sabe. Tú preguntas.

Qué preguntas, en una frase:

1. ¿Tengo GitHub Copilot autorizado en esta cuenta y en este repo?
2. ¿Está permitido el chat de Copilot con código interno de este tipo?
3. ¿Está prohibido pegar el mismo código en un ChatGPT personal?

Si la respuesta a 1 es no: no buscas un instalador raro ni una cuenta compartida. Escribes tú. O usas la herramienta que IT sí haya autorizado. Punto.

Si la respuesta a 3 es “prohibido el chat de consumo”: obedeces. El código interno, las URLs internas, los nombres de clientes en un comentario: no salen de la cuenta de trabajo. Un Copilot personal no es el disco de la empresa.

Secretos. Aunque IT haya dicho sí a Copilot, **no** pegas API keys, `.env` ni tokens en Copilot Chat. El editor ve el archivo local; el chat envía lo que tú le pones. La regla corta está en [no pegar secretos ni el .env](/blog/inteligencia-artificial/no-pegar-secretos-ni-el-env). Si la sugerencia autocompleta un `sk-` que había en un comentario, no commiteas el comentario. Rotas si eso llegó a un chat.

Cuenta personal en un repo de trabajo. Mezclar es el atajo que luego no puedes explicar. Sesión de organización, repo de organización. Si no hay vía, no hay Copilot en ese código.

## Aceptar o rechazar una sugerencia (ejemplo de Luis)

El caso. Luis escribe una función en Python para formatear una fecha de factura en `YYYY-MM-DD`. Ya tiene tests mentales: vacío → error claro; texto no fecha → error claro; una fecha válida → string. No está pidiendo un ERP.

Escribe:

```
def formatear_fecha_factura(texto: str) -> str:
```

**Copilot en VS Code** propone un cuerpo. Tres intentos típicos.

**Intento 1 (aceptar a ciegas).** El gris importa `datetime` de una forma rara, traga `None`, y si falla devuelve `"01/01/1970"`. Luis no ha pedido un epoch. No ha pedido silenciar el error. Tab aquí es un bug con tu nombre. Esc.

**Intento 2 (editar).** El gris hace `datetime.strptime(texto, "%Y-%m-%d")` y un `return`. Casi. No cubre vacío. No cubre el mensaje. Luis acepta la línea del `strptime` y escribe él el `if not texto.strip()`. Eso es pareja: el modelo propuso el parseo; tú pones el fallo cerrado.

**Intento 3 (ignorar y escribir).** Copilot insiste en un `try/except Exception` que traga todo y `return texto`. Eso no formatea. Eso esconde. Luis pulsa Esc. Escribe cuatro líneas suyas. El ritmo del modelo no manda.

Pedido útil en **Copilot Chat**, con la función seleccionada, no con el repo:

```
Revisa solo formatear_fecha_factura.
Lista: qué pasa si texto es vacío, si no es YYYY-MM-DD, si es None.
No reescribas el archivo.
No añadas tests que yo no haya pedido.
No inventes campos de factura.
Si algo no está en la función, di “no está”.
```

Qué compruebas, contra el código, no contra “si suena a Python”:

1. **Imports.** ¿Están en el archivo? ¿Están en el entorno? Si Copilot añade `from dateutil import …` y tú no lo tienes, o lo instalas a propósito o lo quitas.
2. **Comportamiento en vacío.** ¿Falla en claro o devuelve un default silencioso? El default silencioso no se acepta si tú no lo has definido.
3. **Excepciones.** `except Exception` que traga el fallo: rechazas. Un error de formato debe salir como error de formato.
4. **Nombres.** ¿Ha colado `invoice_id` o un NIF? Fuera. La función era una fecha.
5. **Secretos.** ¿Ha copiado una URL con token de un comentario vecino? Fuera. Redactas. No subes.

**Aceptar o rechazar una sugerencia** no es un juicio moral. Es Tab, Esc o editar. Si editas más de la mitad del bloque, casi siempre era más barato escribirlo tú. El gris no te cobra por ignorarlo.

Un extra: acepta *una* línea cuando la siguiente aún no la has leído. El bloque de veinte líneas se revisa como veinte líneas, no como un favor.

## Copilot Chat frente a autocompletado

**Copilot Chat vs autocomplete** son dos herramientas. Mezclarlas es el error de “le pido al chat que reescriba el repo mientras el gris sigue proponiendo”.

**Autocompletado.** Vive en el cursor. Ve el archivo. Es rápido. Es fácil de aceptar sin leer. Úsalo cuando el siguiente token es obvio: el cierre de un `with`, el segundo argumento que ya nombraste.

**Chat.** Vive en el panel. Úsalo cuando la duda es *una*: qué hace este `if`, cómo partir esta función **sin** cambiar comportamiento. No lo uses para “reescribe src/”.

**Ritmo de Copilot:** tú escribes, el gris aparece, tú decides, sigues. Si negocias un prompt largo por cada línea, apagas el chat. Si aceptas diez sugerencias sin ejecutar nada, apagas el autocompletado un rato. El producto empuja a más texto. Más texto no es más programa.

Tabla mental, no de marketing:

1. **Línea siguiente obvia** → autocompletado, leer, Tab o Esc.
2. **Duda sobre un bloque que ya existe** → chat, selección corta, pregunta concreta.
3. **Error que ya tienes en la terminal** → traceback **redactado**, no el `.env`. El oficio es el síntoma, el lenguaje y lo que ya probaste.
4. **Tests** → puedes pedir *casos*, no una batería que no vas a lanzar.

Prompt de chat que sí, encima de la función de Luis:

```
Explica en 5 viñetas qué hace formatear_fecha_factura.
No sugieras librerías nuevas.
No reescribas.
Si hay un camino sin return, señálalo.
```

Prompt de chat que no:

```
Eres un senior 10x. Reescribe todo el módulo, añade FastAPI,
Docker, tests, CI y un README profesional. Usa las keys del .env.
```

Eso no es pareja. Es un encargo a un extraño con tus secretos. El `.env` no entra. El módulo no se reescribe por aburrimiento.

## La IA no escriba tests que no corres

**IA no escriba tests que no corres** es la línea que evita un verde falso. Copilot (chat o gris) puede proponerte un `test_formatear_fecha_factura_vacio`. Hasta que no lanzas el runner, no es una prueba. Es texto.

Qué haces:

1. **Pides casos, no un archivo de 200 líneas.** “Lista cuatro entradas y el resultado esperado de *esta* función.” Tú los copias a pytest o unittest.
2. **Ejecutas.** En la terminal. El comando que ya usas. Si no corre, el test no existe.
3. **Lees el assert.** Un `assert True` o un mock que no llama a la función es teatro. Lo borras.
4. **No cubres lo que la función no hace.** Si no hay descuento, no hay `test_descuento`. El modelo ama inventar requisitos. Tú no.

El oficio de construir la batería a partir de una función está en [tests unitarios a partir de una función](/blog/inteligencia-artificial/tests-unitarios-a-partir-de-una-funcion). Aquí el límite es de Copilot: no commiteas tests generados “para que el PR se vea serio”. El PR se ve serio si pasan.

Ejemplo. Luis pide al chat: “escribe tests”. Salida típica: importa `pytest`, crea un `TestClient` de FastAPI, usa una `API_KEY` de ejemplo. Luis no tiene FastAPI en este archivo. La `API_KEY` es un secreto de mentira que alguien copiará. Rechazas el archivo. Pides otra vez: “solo casos para `formatear_fecha_factura`. Sin HTTP. Sin claves.” Luego escribes tú el `def test_…` y lo corres.

Si el autocompletado te rellena un test mientras escribes `def test_vacio`: lees el assert. Si espera `"01/01/1970"` y tu función debe lanzar, el test está mal aunque Copilot esté seguro.

## Cuándo apagar Copilot

**Cuándo apagar Copilot** no es una postura. Es un interruptor cuando el producto estorba. La extensión se desactiva por archivo, por lenguaje o por completo. El sitio del botón cambia. El trabajo no: dejar de ver gris.

Apagas (autocompletado, chat o ambos) cuando:

1. **Estás leyendo código ajeno** y el gris te pinta encima. Primero lees. Luego, si acaso, preguntas al chat *una* función.
2. **Estás en un diff de revisión.** Las sugerencias en medio del merge no ayudan. Confunden lo que es tuyo y lo que es del modelo.
3. **El archivo lleva secretos** (un `.env` abierto, un JSON de credenciales). Cierras el archivo en el editor o apagas Copilot. El chat no lo ve porque tú no lo pegas; el autocompletado a veces se alimenta del buffer. No juegues.
4. **Llevas tres sugerencias seguidas que has deshecho.** El modelo está en otro programa. Escribes tú. Lo reactivas mañana.
5. **La tarea es un número, una fecha o una regla de negocio** que solo está en tu cabeza o en un correo. Copilot no ha leído el correo. Inventará el 12 %. Tú escribes la cifra. Luego, si acaso, el tono de un comentario.
6. **IT te ha dicho que este repo no entra.** Apagado. Sin matices.

Reactivar. Cuando el siguiente token es obvio: un `return` simétrico. No cuando “quieres velocidad” en un módulo que no entiendes.

Cursor, una línea. Si tu herramienta es Cursor y no Copilot, el gesto de pareja sigue: leer, aceptar o no, no volcar secretos. La comparativa de flujos no es esta página.

## Errores habituales (para aquí)

**Tratar GitHub Copilot como el Copilot de Word.** Word reescribe un párrafo de un informe. El editor propone código. Los hechos de un trimestre no están en el repo. No mezcles. Si el trabajo es el .docx, cierras VS Code.

**Aceptar el bloque porque “compila”.** Compilar no es cumplir la regla de negocio. El `"01/01/1970"` compila. Para aquí: un caso vacío y un caso malo, ejecutados.

**Dejar que el chat reescriba el módulo.** Una función. Un diff corto. Si el chat devuelve tres archivos nuevos, no los pegas. Pides “solo el cuerpo de `formatear_fecha_factura`”.

**IA no escriba tests que no corres.** El archivo `test_*.py` generado no es cobertura. Lo corres o no existe.

**Pegar el error con Bearer y el `.env`.** El chat de Copilot es un envío. Rotas si pegaste. Redactas. Mismos gestos que en cualquier chatbot.

**Fiarte del import.** Copilot inventa módulos. `pip show` o el equivalente. Si no está, no está.

**Comentarios de autor.** El modelo pone un adjetivo y un nombre en inglés de más. Fuera. El comentario dice qué no es obvio, o no está.

**Ritmo de copilot al revés:** el gris escribe, tú miras el teléfono. Para aquí: el cursor lo mueves tú. Si no estás leyendo, apagas.

**Licencia “la de un compañero”.** No. IT. Cuenta asignada. Repo permitido.

Para aquí, en positivo:

1. Tab, Esc o editar. Nada de “ya lo habrá pensado”.
2. Chat: una pregunta, una selección. Cero `.env`.
3. Tests: se corren. Si no, no se venden como tests.
4. Apagas cuando estorba o cuando IT lo dice.
5. El commit es tuyo.

## Cierre

**Programar con GitHub Copilot** se reduce a esto:

1. Pregunta a IT si tienes licencia y qué repo puede entrar.
2. **Copilot en VS Code:** el gris propone. **Aceptar o rechazar una sugerencia** es el trabajo. Lees.
3. **Copilot Chat vs autocomplete:** línea obvia al gris; duda concreta al chat. No el repo entero.
4. **IA no escriba tests que no corres.** Los lanzas tú.
5. **Cuándo apagar Copilot:** lectura, secretos, tres deshacer seguidos, o un no de IT.

Sin informe de Word. Sin comparativa de Cursor. El modelo completa patrones. Tú pones la función y la prueba.
