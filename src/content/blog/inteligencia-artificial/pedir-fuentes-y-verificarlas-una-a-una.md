---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Pedir fuentes y verificarlas una a una"
description: >-
  Verificar fuentes de una IA: abre cada enlace. Si no carga o no dice eso,
  la fuente no existe. Método corto para usar en una sesión de búsqueda.
readTime: 11 min
keywords:
  - verificar fuentes de una ia
  - chatgpt citas falsas
  - abrir el enlace de perplexity
  - doi inventado en una cita de ia
  - ia bibliografía inventada
  - método de verificación corto
  - no citar un chatbot
excerpt: >-
  Cada enlace se abre. Si no carga o el párrafo no dice eso, esa fuente no
  existe para ti. El bucle cubre la sesión entera, no un solo mensaje.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/pedir-fuentes-y-verificarlas-una-a-una'
alt: Lista de fuentes de un chatbot abiertas una a una para verificarlas
related_routes:
  - como-comprobar-si-una-respuesta-de-ia-es-fiable
  - perplexity-buscar-con-citas-a-la-vista
  - citar-fuentes-la-ia-no-sustituye-la-bibliografia
  - papers-el-chatbot-no-es-google-scholar
  - por-que-un-chatbot-se-inventa-datos
faqs:
  - question: ¿Cómo verificar fuentes de una IA en una sesión de búsqueda?
    answer: "Pides enlaces. Los copias a una tabla. Abres cada uno. Si no carga o el párrafo no dice lo que el chat afirma, marcas NO ESTÁ y esa fuente no existe para ti. No cites el chatbot. El dato que uses sale de la página abierta."
  - question: ¿Las citas de ChatGPT son fiables si suenan a informe?
    answer: "No. ChatGPT citas falsas es el caso típico: URL, DOI o ‘estudio de…’ con molde perfecto. El tono no prueba nada. Abres el identificador fuera del chat. 404, otra cosa, o un texto que no respalda la frase: fuera."
  - question: ¿Basta con abrir el enlace de Perplexity y mirar el título?
    answer: "No. Abrir el enlace de Perplexity es el trabajo: cargas la página, lees el fragmento, miras la fecha. El chip y el número al lado de la frase son la lista de deberes, no la comprobación. Si redirige a un buscador, aún no hay fuente."
  - question: ¿Qué hago con un DOI inventado en una cita de IA?
    answer: "Lo pegas en doi.org o Crossref, tú, no en el mismo hilo. Si no resuelve, esa línea cae. No pidas ‘la cita correcta’ al modelo. Un DOI inventado en una cita de IA no se arregla con otro molde. Sales a Scholar o a la biblioteca."
  - question: ¿Puedo citar el chatbot si me ha dado cinco fuentes y he abierto tres?
    answer: "No citar un chatbot. Citas las tres páginas que has abierto, con el dato que está en ellas. Las dos que no abriste no existen para ti, aunque el párrafo del chat las necesite para cerrar. Un hueco es mejor que una ficha elegante."
---

**Verificar fuentes de una IA** no es releer el párrafo con buena fe. Es un bucle de sesión: pides enlaces, los abres uno a uno, y tachas lo que no carga o no dice eso. Si el enlace no abre o el texto no respalda la frase, **esa fuente no existe para ti**. Abrir el enlace es el trabajo. El chip no lo es.

Esta página cubre **una sesión de búsqueda o de investigación**, no un solo mensaje. Extraer cifras de *una* respuesta está en [cómo comprobar si una respuesta de IA es fiable](/blog/inteligencia-artificial/como-comprobar-si-una-respuesta-de-ia-es-fiable). La lista APA de un trabajo de clase está en [citar fuentes: la IA no sustituye la bibliografía](/blog/inteligencia-artificial/citar-fuentes-la-ia-no-sustituye-la-bibliografia). El producto Perplexity, con su interfaz, está en [Perplexity: buscar con citas a la vista](/blog/inteligencia-artificial/perplexity-buscar-con-citas-a-la-vista). Aquí no se reescriben. Aquí: varias pestañas, una tabla tuya, y el **método de verificación corto** hasta que la sesión cierra.

## Esto es un bucle de sesión, no un veredicto

Una sesión dura un rato. Empiezas con una pregunta. El chat (o Perplexity, o Search) te devuelve un mapa: párrafos, chips, “según un estudio”, cuatro URLs. Tú no cierras ahí. Tú conviertes ese mapa en filas. Cada fila es un enlace o un identificador. Cada fila se abre. Cada fila acaba en SÍ, NO ESTÁ u OTRA COSA. Luego decides qué pegas al email, al informe o al bloc de notas.

No es el mismo oficio que validar *un* ensayo que ya está escrito. Allí extraes afirmaciones de un bloque. Aquí el bloque sigue creciendo: pides más, regeneras, cambias de producto. Si no tienes tabla, mezclas fuentes de las tres vueltas y no sabes cuál abriste.

Tampoco es armar la bibliografía del trabajo. Esa lista sale del paper abierto o del catálogo. Este bucle puede *alimentarla* si un enlace resulta ser un paper real y lo lees. No la sustituye. **IA bibliografía inventada** aparece aquí como síntoma: el chat te ha dado fichas. Tú las abres. Si no hay archivo, no hay ficha. El formato APA se discute en el artículo de citar, no en esta página.

Entra en la sesión: una pregunta acotada (tema, país, año), un recinto con enlaces, una tabla tuya fuera del hilo, y un criterio de parada (dos o tres SÍ para un email; más filas, el mismo gesto, si es un informe). No entra pedir al modelo que “confirme” sus fuentes, **no citar un chatbot**, ni guardar un 404 “por si acaso”. El por si acaso es el envío. El listón lo pone el coste: cambia cuántas filas cierras, no el clic.

## Pedir fuentes sin alimentar el molde

Si pides “dame diez referencias con DOI”, alimentas el molde. El modelo completa autor, año, revista y un `10.` de relleno. Eso produce **ChatGPT citas falsas** a escala. La petición útil pide *enlaces para abrir*, no una bibliografía lista para pegar.

Petición que sirve, copiada y adaptada:

```
Tema: [una frase]. País: España. Año que me importa: [año].
Quiero fuentes para ABRIR yo, no una bibliografía.
Devuelve una tabla: afirmación concreta | tipo (web, PDF,
noticia, organismo) | URL completa. Si no tienes URL, escribe
NO URL. No inventes DOI. No inventes números de BOE.
No rellenes huecos. Si no está, NO ESTÁ.
Máximo seis filas. Nada de “estudio de García”.
```

Qué haces con la tabla del chat:

1. La copias a un documento tuyo. El hilo se mueve.
2. Tiras las filas sin URL. “Un informe de la OCDE” sin enlace no es una fila. Es un deseo.
3. No pegas aún ninguna afirmación al texto que estás escribiendo.
4. Abres, en orden, las URLs. Una pestaña por fila. No las dejes en segundo plano “para luego”. El luego no llega.

Si el producto ya enseña chips (Perplexity, Search, Gemini con enlaces), no hace falta la tabla del modelo. Hace falta *la tuya*: copias la URL de cada chip que vas a usar. El número al lado de la frase no es la fuente. La URL sí, y solo cuando carga.

Si el chat se niega a dar URL y te suelta “según fuentes recientes”, paras esa línea. Sales tú: Google, el sitio del organismo, Scholar. El bucle es abrir, no discutir. Pedir bibliografía APA “lista para pegar” es ruido aquí: cierra el hilo o busca tú.

## Abrir cada enlace: carga, párrafo, fecha

**Verificar fuentes de una IA** se decide en la pestaña, no en el chat. Tres pruebas, en este orden. Si falla una, la fila cae.

**1. Carga.** Clic. Esperas. Si 404, timeout, “DOI not found”, captcha eterno, o redirige a un buscador genérico: NO ESTÁ. Un buscador no ha contrastado nada. Si pide cookies, aceptas y sigues. Si pide pago y no tienes acceso *hoy*, no la uses hoy. Un hueco gana a un PDF que no has visto.

**2. Párrafo.** Lees el fragmento que debería sostener *esa* afirmación. Título de pestaña no basta. Titular de nota de prensa no basta. Un “resumen” de la propia IA en la ficha del buscador no basta. Buscas la cifra, el nombre, la fecha o la tesis con el buscador de la página o del lector de PDF. Si no está, NO ESTÁ. Si está pero dice lo contrario (un “no es obligatorio” vuelto “es obligatorio”), OTRA COSA: para tu frase es un no.

**3. Fecha y emisor.** Mira cuándo se publicó o se actualizó. Una guía de 2018 no cierra un “en 2026 el plazo es…”. Mira quién firma: ministerio, INE, revista, blog. Un blog que parafrasea un chat anterior no cierra. El emisor del dato es el que lo publica, no el que lo resume.

Estados, los mismos tres de siempre, aplicados a *fuentes* no a “el tono del ensayo”:

- **SÍ.** La página dice eso. Copias el dato *de la página*, no del chat, si hay duda de redacción. Anotas URL y fecha de consulta en tu tabla.
- **NO ESTÁ.** No carga. No aparece. El identificador no resuelve. Fuera.
- **OTRA COSA.** La URL es real y habla de otro objeto, otro año, otro país. El dominio verdadero no lava el uso falso.

No hay estado “casi”. “Casi” es cómo se cuela la cuarta fuente, la que no abriste. Si una fila tarda (paywall, VPN, el PDF no carga), PENDIENTE o NO ESTÁ. Un PENDIENTE no se pega. El envío no espera al limbo: o esperas tú o tacha.

## ChatGPT citas falsas, DOI inventado, bibliografía que no abre

**ChatGPT citas falsas** no son un fallo raro. Son el molde. URL que parece de un ministerio. DOI con prefijo `10.`. “Martínez (2022), *Revista de…*”. Apellido frecuente, año reciente, título que suena a TFG. Nada de eso se usa hasta que abre.

**DOI inventado en una cita de IA.** No expliques el DOI. No lo “arregles”. No pidas al chat que lo regenere. Copias el identificador. Lo pegas en doi.org o en Crossref *tú*. Tres salidas:

1. No resuelve. Esa cita no existe para ti. Tacha la fila y el dato que colgaba de ella.
2. Resuelve a un texto que no es el que el chat describe. OTRA COSA. No “aprovechas el DOI”.
3. Resuelve y el abstract o el PDF dicen *eso*. Entonces tienes un candidato a leer. Todavía no es una cita de trabajo: es una página abierta. Si más tarde citas, citas el paper, no el hilo.

El gesto es resolver el DOI o tacharlo. Un `10.` de relleno y un `10.` real se distinguen abriendo. **IA bibliografía inventada:** seis fichas, dos abiertas, ambas 404 u OTRA COSA. Paras. No pides las seis siguientes. Sales a Scholar, al catálogo o al organismo y empiezas filas *tuyas*.

Ejemplo de sesión, inventado para el ejercicio. No lo uses como dato. No es un estudio.

Elena escribe un informe interno sobre teletrabajo en pymes en España. Pregunta al chat (o a Perplexity) “fuentes recientes, con enlace”. Recibe, entre otras, esto:

> El 64 % de las pymes ya tiene política formal (García, 2023, DOI 10.9999/teletrabajo.2023.00001). Lo confirma https://www.example.invalid/ine-teletrabajo-2024 y la nota del ministerio en https://www.mifae.es/notas/2024/99.

Su tabla queda:

1. Cifra 64 % + DOI `10.9999/teletrabajo.2023.00001`.
2. URL `example.invalid`.
3. URL `mifae.es` (dominio que ella no reconoce).

Abre, en este orden:

1. doi.org: no resuelve. **DOI inventado.** Fila 1: NO ESTÁ. El 64 % cae con ella. No lo “salva” con otra frase del chat.
2. `example.invalid`: no carga. NO ESTÁ.
3. `mifae.es`: o no carga, o no es un dominio que ella identifique como ministerio. No entra. Si quiere la nota, entra por la web del ministerio que *ella* conoce y busca dentro.

Tres NO ESTÁ. El informe no lleva cifra. Lleva un hueco o el dato de una tabla que *ella* abra después. El chat no se cita. Si una URL hubiera cargado con *otra* cifra, copiaría esa, de la página. El chat queda fuera.

## Abrir el enlace de Perplexity (y el chip de cualquier otro)

**Abrir el enlace de Perplexity** es el mismo clic, con otra pintura. Números, tarjetas, Focus. El dibujo cambia. El gesto no. Esta página no es el manual del producto: es el bucle cuando *ya* tienes chips delante, en Perplexity o en Search o en Gemini.

Orden, para cada afirmación que vas a usar:

1. Identificas *qué* chip o número ancla *esa* frase. No el pie genérico. No “fuentes (12)”.
2. Clic. Esperas a que cargue la página de destino, no el overlay del propio producto.
3. Si redirige a un buscador, esa ancla no es fuente. Es una búsqueda. La búsqueda no ha verificado.
4. Lees el párrafo. Fecha. Emisor.
5. Anotas en *tu* tabla: SÍ / NO ESTÁ / OTRA COSA. Cierras el overlay. Sigues con el siguiente chip.

No contrastes “el conjunto suena bien”. Cinco chips, dos abiertos, tres de adorno: tienes dos fuentes, no cinco. El modelo no te marca cuál es el débil.

Si Perplexity (o Search) afirma una cifra y no hay ancla, trata esa cifra como chat sin búsqueda: la abres tú en el sitio emisor o la tachas. La etiqueta “busqué en la web” no es un certificado.

No cites a Perplexity, ChatGPT ni Gemini. Citas la página. **No citar un chatbot** vale con números azules. Si el enlace es un PDF largo, buscas el dato en el lector. O el párrafo sostiene la frase, o la fila cae.

## Método de verificación corto (la tabla de la sesión)

El **método de verificación corto** cabe en una tabla. No en un ensayo sobre “pensamiento crítico”. Columnas, y no más:

| # | Afirmación (una) | URL o DOI | Carga | Párrafo dice eso | Fecha ok | Marca | Qué pego |
|---|---|---|---|---|---|---|---|

Pasos, cada sesión:

1. **Acota la pregunta.** Una. País, año, organismo. Si mezclas tres temas, mezclas tres oleadas de fuentes falsas.
2. **Pides o copias enlaces.** Tabla del chat, o chips, o URLs que tú hayas buscado. Máximo seis filas por ronda. Más es teatro.
3. **Abres en orden.** No empieces por la que “pinta más seria”. Empieza por la 1. El sesgo de dejar la dudosa para el final es dejarla sin abrir.
4. **Marcas.** SÍ, NO ESTÁ, OTRA COSA. Escribe la palabra. El gesto evita el “bueno”.
5. **Pegas solo el SÍ**, copiado de la página. URL y fecha a tu bloc. El chat no entra en el pegado.
6. **Si hay demasiados NO ESTÁ**, paras el hilo. No pides “más fuentes para compensar”. Cambias de recinto: sitio oficial, Scholar, catálogo. Nueva tabla.
7. **Cierre de sesión.** Cuentas SÍ. Si no hay ninguno, el entregable de hoy es “no hay fuente abierta”, no un párrafo fluido. Si hay tres, paras. No regeneres “por completar”.

Ronda dos, si hace falta: mismas columnas, otras URLs. Un DOI “corregido” por el mismo hilo es la siguiente fila falsa. Un email: dos SÍ de sitios que reconoces. Un informe: cada cifra con su SÍ. La bibliografía de un trabajo se construye después, del archivo, no de esta tabla. Herramienta: hoja o margen. No “lo tengo en la cabeza”.

## Errores al verificar fuentes de una IA

**Mirar el favicon y no abrir.** Pone BOE, pone .gob.es, pone el nombre de una revista. El dominio real no salva un id de relleno ni una ruta 404.

**Abrir solo el primero.** El segundo era el invento. El tercero era OTRA COSA. El bucle es *una a una*, no “un muestreo”.

**Pedir más citas para verificar las citas.** Encadenas **IA bibliografía inventada**. Paras. Sales.

**Usar el buscador *dentro* del chat y quedarte.** Te resume los resultados. El resumen es otra respuesta de IA. Sales a la página.

**Citar el chatbot** porque “al fin y al cabo buscó”. Buscó o predijo. Da igual. **No citar un chatbot.** Citas lo abierto.

**Marcar SÍ porque el organismo existe.** Existe el INE. No por eso existe *esa* tabla con *esa* cifra en *esa* URL que tecleó el modelo.

**Dejar PENDIENTE y pegar igual.** El mientras tanto es el envío.

**Discutir con el modelo** (“¿por qué has inventado el DOI?”). Disculpa más un segundo identificador. Señala: quita la fila; NO ESTÁ; no pongas otra desde este hilo.

**Confundir este bucle con el fact-check de un solo mensaje o con la lista APA.** Si ya tienes un ensayo, extraes afirmaciones. Si estás buscando, tabla de URLs. Una URL que carga no es aún una referencia de trabajo. El overlay del producto no es la página: entras y lees en destino.

## Cierre

Cuando **verificar fuentes de una IA** es el trabajo de la tarde, el orden es este:

1. Una pregunta. Una tabla. URLs o DOI, no “estudios de…”.
2. Abres cada enlace. Carga, párrafo, fecha. Una a una.
3. SÍ, NO ESTÁ u OTRA COSA. Lo parecido es no para tu frase.
4. Pegas solo el SÍ, copiado de la página. **No citar un chatbot.**
5. Si el hilo fabrica **ChatGPT citas falsas** o un **DOI inventado en una cita de IA**, paras. No pides la siguiente lista.

El **método de verificación corto** no es un estado de ánimo. Es pestañas y una marca al margen. Si no carga o no dice eso, la fuente no existe para ti. Tacha. El hueco se defiende. El 404 elegante, no.
