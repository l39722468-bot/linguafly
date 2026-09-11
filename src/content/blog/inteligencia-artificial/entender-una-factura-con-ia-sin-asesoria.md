---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Entender una factura con IA (sin asesoría)"
description: >-
  Entender una factura con IA: conceptos, fechas y qué preguntar a la
  compañía. No es asesoría fiscal ni un dictamen. Recorta IBAN y NIF antes
  de pegar.
readTime: 11 min
keywords:
  - entender una factura con ia
  - chatgpt explica una factura
  - desglosar una factura de luz
  - ia conceptos de una factura
  - qué preguntar a la compañía
  - no es asesoría fiscal
  - leer una factura de teléfono
excerpt: >-
  Glosario de líneas y preguntas para la compañía. Recorta IBAN y NIF.
  Las cifras se contrastan con el PDF; el chat no decide un pago.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/entender-una-factura-con-ia-sin-asesoria'
alt: "Factura en papel junto a un chat que explica partidas, no asesora"
related_routes:
  - como-comprobar-si-una-respuesta-de-ia-es-fiable
  - la-ia-no-sustituye-a-un-profesional-colegiado
  - como-escribir-un-prompt-que-sirva
  - privacidad-al-usar-ia-que-no-pegar-nunca
  - datos-publicos-de-espana-ine-boe-y-sede
faqs:
  - question: ¿Puedo pegar una factura en ChatGPT para que me la explique?
    answer: "Puedes pegar un extracto ya recortado: conceptos, importes, fechas. Antes quitas IBAN, NIF, dirección, número de cuenta y cualquier código de cliente que no haga falta. Pides glosario y preguntas para la compañía. No pides si ‘está bien’ ni si debes impugnarla."
  - question: ¿ChatGPT puede decirme si la factura de la luz está mal y no pagarla?
    answer: "No. Eso sería un dictamen. El modelo no es tu gestor, ni tu abogado, ni la comercializadora. Te ayuda a poner nombre a una línea y a redactar qué preguntar. El pago, la reclamación y el calendario los decides tú con el PDF y, si toca, con un profesional."
  - question: ¿Sirve igual para una factura de teléfono?
    answer: "Sí, el mismo método: recortar, glosario de líneas, fechas del periodo, cargos que no reconoces convertidos en preguntas. No asumas roaming, seguros añadidos o ‘cuota de aparato’ porque el chat lo dé por normal. Abre el PDF y marca lo que no cuadre."
  - question: ¿Es asesoría fiscal si me explica el IVA de la factura?
    answer: "No, y no se la pidas como tal. ‘Qué pone en esta línea de IVA según el texto’ no es ‘qué casilla de la renta’. No es asesoría fiscal. Si la duda es deducir, declarar o recurrir, paras y vas a un gestor o a la compañía. El chat se queda en el glosario."
  - question: ¿Cómo sé que no se ha inventado un importe?
    answer: "Abres el PDF. Cada cifra del chat tiene que estar en el documento. Si no está, se marca NO ESTÁ y no se usa. El método es el de comprobar una respuesta de IA: el original manda, no el tono de informe."
---

**Entender una factura con IA** es poner nombres a las líneas, anotar fechas y salir con preguntas para la compañía. No es un veredicto. **No es asesoría fiscal.** No es “no pagues esto”. El chatbot no se colegia, no llama a la luz y no firma un escrito. Si hace falta un titular, el marco está en [la IA no sustituye a un profesional colegiado](/blog/inteligencia-artificial/la-ia-no-sustituye-a-un-profesional-colegiado). Aquí: glosario y preguntas. Tú contrastas cada cifra con el PDF.

## Recorta IBAN y NIF antes de pegar

La factura entera es un paquete de datos. El modelo no necesita tu cuenta para explicar “potencia contratada”. Si pegas el PDF crudo, has enviado identificadores. La regla de qué no viaja está en [privacidad al usar IA: qué no pegar nunca](/blog/inteligencia-artificial/privacidad-al-usar-ia-que-no-pegar-nunca). En una factura, aplica así.

Antes de Ctrl+V o del clip:

1. **Copia de trabajo.** No subas el archivo “bueno” de la carpeta de impuestos. Duplica. Trabaja el duplicado.
2. **Tacha o recorta.** IBAN, NIF/CIF tuyo y de la empresa si no hace falta para la duda, dirección, teléfono, número de contrato largo, código de barras de pago, referencia SEPA. Deja conceptos, importes, periodo, totales.
3. **Nombre del fichero.** `Factura_Luz_Martinez_IBAN.pdf` también viaja. Usa `luz_periodo_mar_paginas_2_3.pdf`.
4. **Si no sabes editar el PDF**, copia a texto las líneas de detalle. Limpia. Pega *eso*.

Qué sí suele hacer falta para el glosario:

- Periodo de facturación (del día X al Y).
- Nombre del concepto tal cual (“término de potencia”, “consumo P1”, “cuota de línea”).
- Importe de esa línea y el total.
- Una nota tuya: “esta línea no la reconozco” o “el total ha subido 18 € respecto al mes pasado” *sin* pegar la factura anterior entera si arrastra los mismos identificadores. Puedes escribir tú: “mes pasado el total era N”.

Qué no hace falta:

- El mandato SEPA.
- El código de cliente completo.
- La pasarela de pago.
- Un anexo de “tus datos” con DNI.

No pidas al modelo “anonimiza y luego explica”. El envío ya ocurrió. Recortas *antes*.

## ChatGPT explica una factura: el prompt

**ChatGPT explica una factura** (o Gemini, o el chat que uses) si le das el recorte y un verbo estrecho. El oficio de no mezclar diez objetivos está en [cómo escribir un prompt que sirva](/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva). El de hoy:

```
Tarea: glosario de las líneas de esta factura. Luego, preguntas para la compañía.
No opines si el importe es justo. No digas si debo pagar, reclamar o deducir.
Texto (ya recortado, sin IBAN ni NIF):
"""
Periodo: …
Líneas:
- …
Total: …
Mi duda: la línea X no la reconozco / el total sube respecto al mes pasado (cifra que yo doy).
"""
Formato:
1. Tabla: concepto (textual), en claro (una frase), importe si aparece, “no aparece” si no.
2. Fechas: periodo, fecha de emisión, fecha de cargo si está; si no, “no aparece”.
3. Lista de preguntas para la compañía (máximo 8), concretas, sin acusar.
No hagas:
- No inventes importes ni porcentajes que no estén.
- No cites leyes ni sentencias.
- No des consejo fiscal, laboral ni de consumo como dictamen.
- Si no está en el texto, escribe NO ESTÁ.
```

Compruebas con el PDF abierto. Cada número del chat, un dedo en el documento. El método —extraer cifras, abrir el original, tachar lo que no esté— es [cómo comprobar si una respuesta de IA es fiable](/blog/inteligencia-artificial/como-comprobar-si-una-respuesta-de-ia-es-fiable). El tono de informe no cuenta. Si ha puesto un 21 % de IVA y en tu recorte no hay 21, NO ESTÁ. Fuera.

Iteración si se pone en abogado: “Quita ‘puedes reclamar’ y ‘no es legal’. Déjame la tabla y las preguntas. Rehaz.” Un turno. No un prompt nuevo de teatro jurídico.

## Desglosar una factura de luz

**Desglosar una factura de luz** (o gas) es el caso que más ruido mete: términos que parecen impuestos, periodos, potencias, peajes. El chat puede traducir *palabras*. No puede auditar tu contador.

Líneas que suelen salir (nombres varían según comercializadora; no las memorices como ley):

- **Término de potencia.** Lo que pagas por la potencia que tienes contratada, aunque no uses nada. No es “el consumo”.
- **Término de energía / consumo.** kWh. A veces por periodos (P1, P2, P3) si tu tarifa los tiene.
- **Peajes, cargos, alquiler del equipo.** A veces van aparte. A veces van mezclados. El glosario debe citar *tu* etiqueta, no la de un tutorial de 2021.
- **Impuestos** que la propia factura nombra. El modelo no añade un tributo “porque en España suele haber”. Si no está la línea, NO ESTÁ.
- **Descuentos o compensación.** Igual: solo si aparecen.

Prompt extra, si el recorte es de luz:

```
Estas líneas son de una factura de electricidad (recorte, sin datos de cuenta).
Explica cada etiqueta en una frase llana.
No compares con ‘la tarifa media de España’. No inventes el precio del kWh de mercado.
No me digas si me conviene cambiar de compañía.
Preguntas para la comercializadora si una línea no cuadra con el periodo o con el total.
```

Lo que no pides:

- “¿Me están estafando?”
- “¿Bajo la potencia?”
- “¿Me paso al mercado regulado?”
- “Redacta la denuncia.”

Eso ya no es glosario. Es asesoría de un oficio que el chat no tiene. Si la duda es de contrato o de reclamación formal, paras. Preguntas a la compañía. Si sigue, un profesional.

Cifras: el total de las líneas debe sumar el total del PDF. Si el modelo “redondea” y te sale distinto, no uses su suma. Suma tú. Si no cuadra *en el PDF*, esa es una pregunta para la compañía, no un titular del chat: “En el desglose, A+B+C no me da el total D. ¿Pueden indicarme qué línea falta o cómo se obtiene D?”

## Leer una factura de teléfono

**Leer una factura de teléfono** (móvil, fibra, pack) usa el mismo molde. Cambia el vocabulario. No cambia el límite.

Líneas típicas a glosar *si están*:

- Cuota del pack / de la línea.
- Extras: roaming, consumo fuera de bono, números especiales, TV añadida, seguro del aparato, “cuota de dispositivo”.
- Descuentos temporales (“3 meses a 0 €”) y la fecha en la que acaba el descuento, si aparece.
- Prorrateos (alta a mitad de ciclo).
- Impuestos nombrados en el documento.

Dudas que sí convierten en preguntas:

- “Hay un cargo de 6,90 € titulado ‘servicio X’ que yo no recuerdo contratar. ¿Pueden decirme desde qué fecha está activo y cómo verlo en el área de cliente?”
- “El periodo facturado es del 3 al 2. El cargo en cuenta pone el día 15. ¿El día 15 es fecha de emisión o de cargo?”
- “Aparece roaming y no he salido de España que yo sepa. ¿Qué evento lo genera?”

Dudas que no le pides al modelo como veredicto:

- “Cancela este seguro.” El chat no cancela. Tú, en la compañía, con el número de línea.
- “Esto es ilegal.” Fuera. Pregunta concreta a la operadora. Si toca, consumo o un profesional. No un párrafo del modelo.
- “Compara mi tarifa con las de 2026 y dime si me paso.” Eso es otro job, y suele inventar precios. Aquí no.

Mismo recorte: sin IBAN, sin NIF, sin IMEI si no hace falta, sin el número completo si puedes dejar “línea A”. El IMEI no explica una cuota. No viaja.

## IA: conceptos de una factura (glosario)

**IA conceptos de una factura** es un diccionario del texto *pegado*, no de Wikipedia. La diferencia importa. El modelo tiene un promedio de facturas de internet. Tu comercializadora usa otra etiqueta. Gana el PDF.

Tabla que pides (y rellenas de comprobación):

| Concepto (textual) | En claro | Importe en el PDF | ¿Está? |
|---|---|---|---|
| Término de potencia | Pago por kW contratados, no por kWh usados | 12,xx € | Sí, p. 2 |
| Consumo P1 | Energía en el tramo P1 del periodo | 18,xx € | Sí |
| “Servicio estrella” | NO ESTÁ explicado en el recorte | 6,90 € | Sí el importe; el significado, pregunta |

Reglas del glosario:

1. **Una frase.** No un ensayo de mercado eléctrico.
2. **Sin analogías.** “Es como el alquiler del cable” solo si no confunde. Si confunde, mejor “no lo tengo claro; va a preguntas”.
3. **Sin completar huecos legales.** “Esto es IVA al 21 porque…” solo si el 21 y la palabra IVA están. Si no, NO ESTÁ.
4. **Sin “normalmente en España”.** Tu factura no es el promedio.

Si el recorte es corto y el modelo escribe tres párrafos de contexto nacional, has pedido mal o él se ha ido. “Solo tabla. Sin prosa antes.”

El glosario no es para reenviárselo a la compañía como peritaje. Es para que *tú* no llames diciendo “es que el chatbot dice”. Llamas con *tus* líneas y *tus* fechas.

## Qué preguntar a la compañía

**Qué preguntar a la compañía** es el entregable útil. Máximo ocho. Concretas. Sin acusar. Con el dato del PDF (periodo, nombre de la línea, importe).

Patrones que sirven:

1. **Identificar una línea.** “En la factura del periodo [fechas], aparece el concepto ‘[nombre exacto]’ por [importe]. ¿Pueden explicarme qué servicio o qué periodo cubre?”
2. **Cuadre de totales.** “La suma de las líneas de detalle no me da el total [D]. ¿Qué partida falta o cómo se obtiene D?”
3. **Fecha.** “¿La fecha [X] es emisión, fin de periodo o cargo en cuenta?”
4. **Alta o extra.** “El cargo [Y] no lo reconozco. ¿Desde qué fecha está activo y dónde lo veo en el área de cliente?”
5. **Descuento.** “El descuento [Z] pone ‘hasta [fecha]’ o no pone fecha. ¿Cuándo deja de aplicarse?”
6. **Duplicado.** “Hay dos líneas con el mismo nombre e importes [A] y [B]. ¿Son conceptos distintos?”

Patrones que no sirves del chat a la compañía:

- “Un modelo de IA ha detectado irregularidades.” Ridículo y falso.
- “No pienso pagar hasta que…” Eso lo decides tú, no el párrafo. Este artículo no te dice que no pagues. No te dice que pagues. Te deja preguntas.
- Amenazas, plazos de 48 horas inventados, citas al BOE que el modelo ha soñado.

Cómo usar la lista:

1. Eliges tres preguntas, no ocho. Las de la línea que no reconoces y la del total.
2. Las lees en voz alta. Si no podrías decirlas en un teléfono sin sonrojarte, recórtalas.
3. Llamas o abres el chat *de la compañía*, no el de la IA. Tienes a mano: periodo, número de factura *si lo vas a dar por un canal suyo*, importe. El NIF se lo das a ellos si el trámite lo pide, no al modelo.

Si la compañía responde y no lo entiendes, puedes pegar *su* respuesta recortada y pedir “glosario otra vez, mismas reglas”. Sigue sin ser un dictamen.

## Errores: para aquí

**Pegar la factura entera “total, es mía”.** El IBAN no hace el glosario mejor. Recorta.

**Pedir dictamen.** “¿Está bien?” “¿La impugno?” “¿Es deducible?” Para. **No es asesoría fiscal.** No es consejo de consumo con firma. Glosario y preguntas. Si la duda es dinero que se mueve o se declara, un gestor, un abogado o la propia compañía. El chat no.

**“No pagues esta línea.”** Si el modelo lo escribe, lo tachas. No lo copias. Este texto no te autoriza a dejar un recibo. Tampoco te ordena pagarlo. El recibo es tuyo.

**Creer un porcentaje o un kWh que no está en el PDF.** Compruebas. Si no está, NO ESTÁ. El chat rellena con el promedio de internet.

**Citar leyes.** “Según el artículo…” Fuera, salvo que *tú* hayas pegado ese artículo (y aun así no es dictamen). Las citas legales inventadas son un oficio aparte; aquí ni las pides.

**Subir cinco facturas de un año “para ver la tendencia” y que te haga la renta.** Otro job, y no es de este chat de consumo. Organizar papeles no es presentar. Entender una línea de marzo no es tu declaración.

**Dejar el IBAN en el nombre del archivo o en la captura de pantalla.** El recorte visual cuenta. Una foto del QR de pago también es un dato de pago.

**Reenviar el informe del chat a la compañía como prueba.** No es prueba. Es prosa. Tus preguntas, tus cifras del PDF.

Para aquí, lista corta:

- El modelo ha sumado mal. Suma tú. Pregunta del cuadre, si el PDF no cuadra.
- Ha “explicado” un peaje que no aparece. Fuera del glosario.
- Ha comparado con “lo normal”. No hay “lo normal” en este artículo. Hay *esta* factura.
- Te ha redactado un escrito de reclamación con amenazas. No se envía. Vuelves a las ocho preguntas secas.

## Cierre

**Entender una factura con IA** se reduce a esto:

1. Recortas IBAN, NIF y lo que identifica de más.
2. Pides tabla de conceptos y fechas. Prohíbes el dictamen.
3. Contrastas cada cifra con el PDF.
4. Sales con pocas preguntas para la compañía.
5. Si hay firma, impuesto a declarar o un escrito, paras: profesional o el canal de la empresa. El chat no.

Sin asesoría. Sin “no pagues”. Sin BOE inventado. El PDF manda. El modelo traduce etiquetas. Tú llamas.
