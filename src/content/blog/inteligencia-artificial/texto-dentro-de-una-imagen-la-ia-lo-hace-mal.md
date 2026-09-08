---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Texto dentro de una imagen: la IA lo hace mal"
description: >-
  Texto en imágenes generadas por IA: las letras salen mal. Añade el
  título después en Canva. Qué pedir al modelo, qué no pedir, y cómo
  maquetar.
readTime: 11 min
keywords:
  - texto en imágenes generadas por ia
  - ia escribe mal las letras
  - títulos en una imagen de midjourney
  - añadir texto después en canva
  - typos de una imagen generada
  - letras inventadas en dall-e
  - cómo poner palabras en una ilustración
excerpt: >-
  El modelo pinta letras que no existen. Tú generas la escena vacía y
  pones el título en Canva. Una palabra a veces se salva; un párrafo, no.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/texto-dentro-de-una-imagen-la-ia-lo-hace-mal'
related_routes:
  - prompt-de-imagen-una-escena-concreta
  - midjourney-dall-e-o-firefly-una-tarea-cada-uno
  - derechos-de-una-imagen-generada-espana-alto-nivel
  - como-escribir-un-prompt-que-sirva
faqs:
  - question: ¿Por qué la IA escribe mal las letras en una imagen?
    answer: "Porque no ‘escribe’: pinta manchas que parecen tipografía. No tiene un teclado. Un título de seis palabras sale con typos, letras inventadas o un alfabeto a medias. La escena se pide sin texto. Las palabras, en un editor."
  - question: ¿Cómo poner un título en una imagen de Midjourney?
    answer: "Pasos: no lo pongas en el prompt; genera la escena; descarga; abre Canva (o el editor que ya uses); caja de texto; fuente tuya. Eso vale para DALL-E y para Firefly. Midjourney no es una excepción mágica."
  - question: ¿Puedo añadir el texto después en Canva y listo?
    answer: "Sí: esa es la vía por defecto. Generas el recuadro sin letreros. Subes el PNG. Una o dos cajas. Contraste. Exportas. Si el modelo ya pintó un cartel borroso, no lo ‘arregles’ con otra generación: pide un recuadro sin texto y cubre o recorta el resto."
  - question: ¿Hay alguna herramienta que escriba bien una palabra?
    answer: "Regla: algunas, tipo Ideogram y similares, aciertan mejor UNA palabra o un logo corto. No un párrafo. No un horario de taller. Si te hace falta un texto largo, sigues en Canva. No conviertas esa excepción en el método."
  - question: ¿Qué hago con los typos de una imagen ya generada?
    answer: "Método: no los uses; no los ‘corriges’ pidiendo al chat que repinte la letra. Tiras ese recuadro o tapas el letrero. Vuelves a generar sin texto. El título correcto sale del editor, no del modelo de imagen."
---

**Texto en imágenes generadas por IA** es el problema de este artículo: las letras no son un párrafo. Son manchas. El modelo no tiene un teclado. Pinta algo que se parece a un cartel. Tú crees leer. Luego miras: una R que es una P, una Ñ que no existe, un “sábado” con tres consonantes. **IA escribe mal las letras.** El arreglo no es un prompt más largo. Es no pedirle el texto.

La escena (sujeto, acción, fondo, encuadre) se pide en [prompt de imagen: una escena concreta](/blog/inteligencia-artificial/prompt-de-imagen-una-escena-concreta). El mensaje de texto a un chatbot, en [cómo escribir un prompt que sirva](/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva). Aquí el trabajo es otro: **cómo poner palabras en una ilustración** sin que las pinte el modelo.

## Por qué las letras salen mal

Un generador de imagen predice píxeles. Ha visto millones de carteles. Reproduce la *pinta* de un letrero: bloques, contraste, una línea donde iría el título. No copia un string. No revisa ortografía. Por eso:

- Inventa caracteres. Una mezcla de latín y de nada.
- Cambia el orden. “Taller” sale “Telalr”.
- Mezcla idiomas. Pediste español y sale un inglés de stock o un catalán a medias.
- Pone un texto que no pediste. El sesgo del entrenamiento: muchas imágenes de cocina traen un letrero. El modelo “completa”.

**Typos de una imagen generada** no se editan como un Word. No hay cursor. “Rehaz la palabra sábato” suele producir otro sábato. A veces peor.

Esto no es un fallo de tu español. Pasa en inglés. Pasa en carteles de una sola palabra. Un párrafo (horario, dirección, cuatro viñetas) es peor: más letras, más sitios donde romper.

La regla por defecto:

1. **Prompt de imagen: cero texto.** “Sin letras, sin letreros, sin marcas, hoja en blanco si hay papel.”
2. **Imagen al editor.** Canva, Figma, PowerPoint, el que ya uses.
3. **Tú escribes.** Con la fuente del dosier, del centro, de la web.

Hasta que eso falle (casi nunca en un título de taller), no cambies de método.

## Títulos en una imagen de Midjourney

**Títulos en una imagen de Midjourney** fallan igual. El recinto es otro. El teclado, no. `--ar 16:9` no corrige una S. Un prompt en inglés con comillas (`the text "OPEN"`) a veces acierta una palabra corta y a veces pinta “OEPN”. No es un flujo de trabajo.

Si ya estás en Midjourney:

1. Pides la escena. Sin el título.
2. Upscale del recuadro que vale.
3. Descarga.
4. Canva (o Photoshop, o el cartel del centro cívico).

No encadenes diez rerolls “hasta que el cartel se lea”. Gastas créditos. Sigue sin ser tu tipografía. El día que el título cambie (otro sábado), regeneras la imagen. En el editor, cambias seis letras.

Lo mismo en **DALL-E** dentro de ChatGPT. **Letras inventadas en DALL-E** son el caso típico del letrero de la campana, el neón de la tienda, el cuaderno con “apuntes” ilegibles. Prohibición explícita: “No pongas texto. Ningún letrero. El papel, si se ve, en blanco o con rayas, sin palabras.”

Si el modelo las pone igual, no negocias. “Quita el letrero. Rehaz. El resto, igual.” Si insiste, cambia el fondo: “Pared lisa. Sin campana con marca. Sin pizarra.” Menos superficies de cartel, menos letras fantasma.

Firefly, en Photoshop o en la web de Adobe, pinta letras igual de mal cuando se las pides. La ventaja de Firefly no es el alfabeto. Es el recinto Adobe y la licencia que puedes leer. Eso no convierte a Firefly en un maquetador. El texto, capa de texto. No píxeles del modelo.

Qué herramienta usas para *la escena* está en [Midjourney, DALL-E o Firefly: una tarea cada uno](/blog/inteligencia-artificial/midjourney-dall-e-o-firefly-una-tarea-cada-uno). El texto no desempatan. Los tres fallan el párrafo.

## Añadir texto después en Canva: el flujo

**Añadir texto después en Canva** es el método. No es un atajo de influencer. Es cómo se maqueta desde hace años: fondo + capa de tipo.

Pasos, tamaño de cabecera 16:9:

1. **Genera** la escena con los cuatro datos. Formato 16:9 si la cabecera es 16:9. Sin letras.
2. **Descarga** PNG o JPG. La que dé el producto. No hace falta imprimir.
3. **Canva.** Crear diseño → tamaño personalizado 1920×1080 (o el del PDF). Si el dosier es A4, no fuerces 16:9: pide la imagen en 4:5 o 3:4 y deja margen para el título.
4. **Sube** la imagen. Encaja. No estires. Si sobra, recorta con el recorte de Canva, no con otro prompt.
5. **Texto.** Una caja. El título. Fuente que ya uses (el centro, la web, el Word). Cuerpo grande. Pocas palabras.
6. **Contraste.** Oscuro sobre zona clara. Claro sobre zona oscura. No sobre la cara. No sobre las manos de la acción.
7. **Una segunda caja** solo si hace falta (fecha, lugar). No un párrafo. El párrafo va en el PDF, debajo.
8. **Exportar.** PNG o PDF según el uso. Relees el título en voz alta. Si hay un typo, es tuyo y se corrige en cinco segundos.

Si no usas Canva: PowerPoint, Google Presentaciones, Figma, Affinity, GIMP. El gesto es el mismo. Capa de imagen. Capa de texto. No “regenerar el cartel”.

Dónde colocar el título, en práctica:

- Reserva un tercio del recuadro sin cara ni acción. En el prompt: “figura a la derecha; pared lisa a la izquierda.” Ese hueco es para tu caja.
- Si el modelo llena todo de objetos, no pelees el título encima. Corriges el prompt: “Encimera despejada. Pared izquierda vacía.”

Eso es diseño mínimo. No es un curso de Canva. Tres clics.

## El caso de Elena: escena, luego letras

Elena organiza un menú del día en un bar pequeño. Quiere una ilustración para el Instagram y para un cartel A4 junto a la barra. El texto que *tiene* que leerse: “Menú del día · 14 €” y, en el A4, tres platos. Si se lo pide al modelo, saldrá un chalkboard con palitos. Nadie lee el precio. Nadie lee los alérgenos.

**Intento 1 (todo en el prompt):** “Cartel de menú del día, 14 euros, ensalada, lentejas y pescado, letras bonitas, pizarra, restaurante.”  
Salida típica: pizarra, tiza, **letras inventadas**, un 14 que es un 11, un plato que no es el suyo. Inútil.

**Intento 2 (escena + título en el mismo recuadro):** “Ilustración de un plato de lentejas, y arriba el texto exacto MENÚ DEL DÍA.”  
Salida típica: lentejas aceptables, título “MENU DEL DIA” sin tilde, o “MENV”, o un alfabeto de adorno. Elena no puede publicar eso.

**Intento 3 (el que sirve).** Primero el **prompt de imagen**, cuatro partes, cero letras:

```
Ilustración plana, línea clara, colores planos, no foto.

Sujeto: plato hondo de lentejas visto desde un tres cuartos, cuchara de metal a la derecha, sin logo en la cuchara.
Acción: ninguna persona; el gesto es el plato en primer término.
Fondo: mantel de papel blanco, pared de azulejo simple, luz de ventana a la izquierda; sin pizarra, sin letrero, sin carta.
Encuadre: plano corto del plato, vertical 4:5 (Instagram); deja el tercio superior con mantel liso, sin comida, para texto.

No pongas texto, precios, marcas, ni una segunda escena.
```

Elena genera. Comprueba: lentejas, cuchara, mantel liso arriba, sin letras. El primer recuadro pone un cartel al fondo. Corrección: “Pared de azulejo, sin cartel. Mantel superior vacío. Rehaz.” Segundo recuadro: vale.

Canva, dos usos:

**Instagram (4:5).** Tamaño 1080×1350. Sube el PNG. Caja en el tercio superior: “Menú del día · 14 €”. Fuente que ya usa el bar. Color oscuro. Exporta. Pie de foto en Instagram: los tres platos. No en la imagen.

**Cartel A4.** Mismo PNG o una generación en 3:4. Canva A4. Imagen en la mitad superior. Debajo, texto *suyo*: ensalada, lentejas, pescado. Alérgenos. Precio. Todo editable el martes que cambie el menú. No regenera la ilustración cada día.

Eso es el método. El modelo no ha escrito “14 €”. Por eso el 14 es un 14.

Un extra, mismo día, si Elena quiere una escena con persona: sujeto de espaldas, delantal, lleva el plato. Encuadre: deja franja superior vacía. Sigue sin letras. Sigue Canva. No pidas la cara de un camarero real.

Segundo ejemplo, mismo método. Héctor imparte un taller de hojas de cálculo en una biblioteca. Necesita un cartel A3 junto a la puerta: ilustración de alguien frente a un portátil, título “Taller de hojas de cálculo”, fecha y sala. Si mete el título en DALL-E, saldrá un neon. Nadie lee la sala.

Prompt de cuatro partes, cero letras:

```
Ilustración plana, no foto, no 3D.

Sujeto: hombre de unos 35, de tres cuartos de espaldas, camisa gris, sin logo.
Acción: señala una celda de una hoja en la pantalla de un portátil cerrado a medias; no se leen números.
Fondo: mesa de biblioteca, estantería desenfocada, pared lisa a la izquierda, luz de ventana a la derecha; sin carteles, sin logos de software.
Encuadre: plano medio, vertical 3:4; figura a la derecha; tercio izquierdo de pared vacía para el texto.

Sin letras en la pantalla. Sin marcas. Figura genérica. No copies una cara real.
```

Héctor genera. El primer recuadro escribe “EXCEL” deformado en la pantalla. Corrección: “Pantalla en gris, sin iconos ni palabras. Rehaz. El resto, igual.” Segundo recuadro: vale.

Canva, A3 (297×420 mm) o 3508×4961 px:

1. Crear diseño → tamaño personalizado A3.
2. Sube el PNG. Encaja a la derecha. No estires.
3. Caja a la izquierda, sobre la pared: “Taller de hojas de cálculo”. Fuente del ayuntamiento. Cuerpo grande.
4. Segunda caja, más pequeña: “sábado 12 · sala 2”. Nada más. El programa del taller va en un folio aparte o en un código QR que Héctor pega a mano, no en el generador.
5. Exporta PDF. Relee. Si “sábado” tiene una tilde de menos, la pone él. Diez segundos.

El martes cambia la sala. No regenera. Cambia seis caracteres. Eso es **añadir texto después en Canva**. El modelo no ha tocado el alfabeto.

## Una palabra: cuándo otra herramienta ayuda (y cuándo no)

Hay modelos y productos que aciertan mejor **una** palabra o un logo corto. Ideogram y similares viven de eso. No es este artículo. Un puntero, y se acaba:

- **Una palabra** (“ABIERTO”, un nombre de tres letras) a veces sale legible en esas herramientas.
- **Un párrafo, un horario, un menú, un párrafo legal: no.** Sigues en el editor.
- Si te funciona *una* palabra ahí, no conviertas el producto en tu maquetador. El resto del cartel, capas.

La vía por defecto aquí: escena sin texto + Canva. Si un día necesitas esa excepción de una palabra, será otro slug. Hoy no rellenes el dosier con un generador “bueno en tipografía”.

Tampoco pidas al chatbot de texto que “te dé el prompt perfecto para que DALL-E escriba bien”. El pilar de prompt de texto no arregla píxeles. Puedes usarlo para redactar el *copy* que luego pegas en Canva: “Tres títulos de menos de 40 caracteres, sin emoticonos.” Eso sí es texto. La imagen, aparte.

## Errores habituales y para aquí

**Pedir el título en el prompt “por si sale”.** Sale mal. Has contaminado la escena con un letrero. Luego tapas. Más trabajo.

**Rerrollear hasta que se lea.** Cinco créditos después, un “sábado” con B. El título correcto tardaba un minuto en Canva.

**Usar el typo.** Publicar un cartel con una letra inventada “porque el look mola”. El lector no perdona el precio mal escrito. Tú tampoco deberías.

**Párrafo en la imagen.** Horario, dirección, cuatro condiciones. Eso es un PDF o un pie de foto. No un recuadro generado.

**Pegar una fuente “de IA”** que el modelo inventó. No es tu marca. No es accesible. No se puede repetir el martes.

**Incrustar un logo ajeno** “para que se vea oficial”. El modelo lo deforma. Además, no es tu marca. Paras.

Para aquí, aunque el recuadro sea bonito:

- Un sello, una firma, un DNI, un membrete que parezca de un organismo.
- Texto legal (“consultorio”, “garantizado”, un porcentaje de salud).
- Cara de un tercero con un letrero encima. Sigue siendo clonar + texto. Las dos cosas, fuera.
- Un menor. Nada.

Derechos de uso de *la imagen* (blog, comercial, Firefly frente a ChatGPT) no se resuelven en este artículo. Alto nivel, sin dictamen: [derechos de una imagen generada (España)](/blog/inteligencia-artificial/derechos-de-una-imagen-generada-espana-alto-nivel). El texto que *tú* pones en Canva es tuyo. El recuadro, según la herramienta y el plan. Lees la página oficial. Si el uso es comercial de verdad, preguntas a un profesional. Aquí no firmamos nada.

## Cierre

**Texto en imágenes generadas por IA** se reduce a esto:

1. La escena, sin letras.
2. Compruebas sujeto, acción, fondo, hueco para el título.
3. Descargas.
4. Canva (u otro editor): caja, fuente tuya, contraste.
5. Relees. El typo, si aparece, es tuyo y se corrige.
6. No rerrolleas un cartel. No publicas letras inventadas.

Una palabra, a veces, en otra herramienta. Un párrafo, nunca. El modelo pinta. Tú escribes.
