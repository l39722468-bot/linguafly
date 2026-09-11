---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Copilot en Excel: fórmulas y explicación, no magia"
description: >-
  Microsoft Copilot en Excel: pide una fórmula, entiende el rango y comprueba
  el número en una celda. No te fíes de un total que no puedas auditar.
readTime: 11 min
keywords:
  - microsoft copilot en excel
  - copilot excel fórmula
  - ia explica una hoja de cálculo
  - copilot tablas dinámicas
  - no fiarte de un número de copilot
  - excel copilot principiantes
  - pedir una fórmula en lenguaje natural
excerpt: >-
  Pides una fórmula, la lees y compruebas el total en una celda. El chat
  no es la hoja. Un número sin rango auditable no se usa.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/copilot-en-excel-formulas-y-explicacion-no-magia'
alt: Copilot en Excel explicando una fórmula en la hoja
related_routes:
  - copilot-en-word-reescribir-no-inventar-el-informe
  - como-comprobar-si-una-respuesta-de-ia-es-fiable
  - confianza-excesiva-el-texto-suena-bien
  - privacidad-al-usar-ia-que-no-pegar-nunca
faqs:
  - question: ¿Microsoft Copilot en Excel me da el número final y yo lo copio al informe?
    answer: "No. Copilot puede proponer una fórmula. El número útil vive en una celda: abres la fórmula, miras el rango y filtras tú. Si el total solo aparece en el panel, no está comprobado."
  - question: ¿Cómo pedir una fórmula en lenguaje natural sin que mezcle columnas?
    answer: "Nombra columnas y criterio, no el resultado que quieres oír. Ejemplo: ‘Suma D si A es Norte y E es Pagado; ponla en G2’. Luego F2: criterios, encabezados, filas de más. Si ha metido Anulado, la fórmula cae."
  - question: ¿Copilot puede montar una tabla dinámica y yo fiarme del total?
    answer: "Puede crearla. Tú sigues sabiendo tres cosas: el rango origen, los campos y el filtro. Cambias un filtro a Anulado y miras si el total se mueve. Si no sabes qué filas entran, la tabla no se usa en el correo."
  - question: ¿La IA explica una hoja de cálculo y eso sustituye a leer las columnas?
    answer: "No. La explicación es un mapa. Abres A1:E20 y compruebas nombres de columna. Si dice ‘todo está pagado’ y en E hay Pendiente, la explicación miente. El original es la cuadrícula."
  - question: ¿Puedo preguntarle a Copilot cuánto IRPF o qué asiento contable sale de la hoja?
    answer: "No. Eso no es una fórmula tuya. No es dictamen fiscal ni contable. Pides SUMIF, un filtro, una tabla. El número de la celda. Impuestos y asientos: tu criterio o quien toque en la empresa, no el panel."
---

**Microsoft Copilot en Excel** sirve para pedir una fórmula, entender qué hace y comprobar el número tú. No es magia. No es un total que copias del panel al correo. **No fiarte de un número de Copilot** si no puedes abrir una celda, ver el rango y repetir la cuenta. El chat explica. La hoja manda.

Este artículo es el oficio dentro de Excel. No es reescribir un párrafo en Word: eso es [Copilot en Word: reescribir, no inventar el informe](/blog/inteligencia-artificial/copilot-en-word-reescribir-no-inventar-el-informe). No es un CSV pegado en el navegador. La hoja está en tu libro de trabajo. Pregunta a IT si tienes Microsoft 365 Copilot en Excel y si puedes usarlo con *esta* hoja. Si no hay licencia, no pirateas. Si la organización prohíbe volcar la hoja en un Copilot de consumo, no la vuelcas. La [privacidad al usar IA](/blog/inteligencia-artificial/privacidad-al-usar-ia-que-no-pegar-nunca) no cambia porque el archivo se llame `.xlsx`.

## Qué trabajo hace (fórmula y explicación)

**Copilot excel fórmula** es el primer uso que sí. Tienes una tabla. Quieres un SUMIF, un SUMIFS, un CONTAR.SI. Lo pides en castellano. Copilot propone la función. Tú la pegas en una celda (o aceptas que la escriba él, igual la abres). Lees argumentos: rango, criterio, rango de suma. Si no los entiendes, la fórmula no se usa. **Excel Copilot principiantes** no es “no sé Excel, Copilot ya sabe”. Es: sabes qué columnas hay. Sabes qué quieres sumar. El asistente escribe la sintaxis. Tú verificas.

**IA explica una hoja de cálculo** es el segundo uso que sí. Columnas con nombres raros, un libro que te ha pasado Nacho. Pides: “Qué hay en A–E, en una lista, sin totales.” Lees contra A1. Si la explicación inventa una columna “margen” que no está, cae.

Qué no es este trabajo:

- Un número en prosa (“el Norte lleva 12.450 €”) sin fórmula en celda.
- Un dictamen fiscal, de IRPF, de IVA repercutido, de “esto se puede deducir”. No. Ni “el asiento correcto es…”. La hoja no es un despacho. Copilot no es quien firma.
- “Arregla la hoja” sin decir qué está mal. Arreglar es borrar, mezclar, rellenar huecos. Los huecos de Nacho se quedan hasta que él los llene.
- Sustituir el filtro manual. Si no sabes filtrar Norte + Pagado, no sabes qué ha sumado Copilot.

El producto aparece si tu cuenta tiene Copilot en Excel. El icono se mueve. El job no: una función que puedes auditar, o una explicación que puedes señalar en la cuadrícula.

Tres reglas de partida:

1. **La tabla tiene encabezados claros.** Centro, Fecha, Concepto, Importe, Estado. Si la fila 1 es un título mezclado, Copilot adivinará mal el rango. Tú arreglas la fila 1. Luego pides.
2. **Una pregunta, un entregable.** “Fórmula en G2 que sume D si A=Norte y E=Pagado.” No “analiza el negocio y dime el trimestre”.
3. **El número de la celda gana al número del panel.** El panel es prosa. Puede redondear. Puede haber contado otra hoja. La prueba es F2.

Eso es el mismo gesto que [cómo comprobar si una respuesta de IA es fiable](/blog/inteligencia-artificial/como-comprobar-si-una-respuesta-de-ia-es-fiable), aplicado a celdas, no a URLs. Extraes la afirmación (el total). La abres donde debería estar (la fórmula). Si no está, NO ESTÁ.

## Licencia, hoja tuya, no la del cliente en un chat personal

Pregunta a IT, en una frase:

1. ¿Tengo Copilot en Excel en esta cuenta de trabajo?
2. ¿Esta hoja (gastos internos, un cliente) se puede usar con Copilot?
3. ¿Está prohibido exportar la misma tabla a un chat personal?

Si 1 es no: fórmulas a mano, o la ayuda que IT sí haya dado. No una cuenta compartida. No un “por esta vez” en copilot.microsoft.com con el libro de Nacho.

Si la hoja identifica a un cliente, a un trabajador o a un menor: no la subes a un Copilot personal “para que me explique las columnas”. Anonimiza en una copia de trabajo si IT lo permite (Centro A, importe, estado). NIF, IBAN, nóminas: fuera. Copilot en la empresa no es un permiso para pegar de más. Es un permiso para *esta* cuenta y *esta* política.

El libro se queda en OneDrive / SharePoint de la org si así lo tenéis. No es el tema de este artículo. El tema: no haces una copia a tu Gmail para “preguntarle a ChatGPT las fórmulas”. Eso ya no es Excel Copilot. Es sacar la tabla.

## Pedir una fórmula en lenguaje natural (SUMIFS de Nacho)

La hoja de Nacho. Gastos de formaciones, septiembre. Recorte ya sin NIF. Así está, en una tabla Excel (filas 1–12; la 1 es encabezado):

| | A Centro | B Fecha | C Concepto | D Importe | E Estado |
|---|---|---|---|---|
| 2 | Norte | 2-sep | Sala | 1200 | Pagado |
| 3 | Norte | 3-sep | Catering | 340 | Pagado |
| 4 | Sur | 4-sep | Sala | 800 | Pagado |
| 5 | Norte | 5-sep | Sala | 1200 | Anulado |
| 6 | Norte | 8-sep | Material | 90 | Pendiente |
| 7 | Norte | 9-sep | Sala | 600 | Pagado |
| 8 | Sur | 10-sep | Catering | 200 | Pagado |
| 9 | Norte | 11-sep | Sala | 0 | Pagado |
| 10 | Este | 12-sep | Sala | 450 | Pagado |
| 11 | Norte | 15-sep | Catering | 150 | Pagado |
| 12 | Norte | 16-sep | Sala | 700 | Pagado |

Nacho quiere: **total pagado del centro Norte**, sin anulados, sin pendientes. A mano, para que tú sepas el número de control: 1200+340+600+0+150+700 = **2990**. La fila 5 (Anulado 1200) no entra. La 6 (Pendiente 90) no entra. La 9 (0 € pagado) entra: es 0, no es un error.

**Pedir una fórmula en lenguaje natural.** Prompt útil, en el panel de Copilot, no “hazme el análisis”:

```
Tabla en A1:E12. Encabezados en fila 1.
Escribe UNA fórmula en G2:
suma de D (Importe) donde A (Centro) sea "Norte" Y E (Estado) sea "Pagado".
Usa SUMIFS o equivalente.
No incluyas Anulado ni Pendiente.
No redondees.
Después, en dos líneas, explica cada argumento (rango, criterio).
No me des el total en prosa. La cifra sale de G2.
```

**Intento 1 (vago):** “¿Cuánto se ha gastado en el Norte?”  
Salida típica del panel: “El centro Norte ha invertido **4.280 €** en formaciones, lo que refleja un compromiso sólido…” Ha sumado todo Norte: 1200+340+1200+90+600+0+150+700 = 4280. Ha metido Anulado y Pendiente. Ha puesto prosa de informe. No hay celda. Inútil. Peligroso si lo pegas al Word.

**Intento 2 (fórmula, rango sucio):** Copilot escribe `=SUMIF(A:A;"Norte";D:D)` en G2. Suma todo Norte, todos los estados. 4280 otra vez. La función no está “mal escrita”. Está mal *pedida* respecto al criterio de Nacho. F2 lo enseña: un solo criterio. Falta Estado. Fuera, o se cambia a SUMIFS.

**Intento 3 (el prompt de arriba).** Fórmula que debes poder leer:

`=SUMIFS(D2:D12;A2:A12;"Norte";E2:E12;"Pagado")`

Explicación que debes exigir, línea a línea:

- D2:D12: lo que se suma (Importe).
- A2:A12;"Norte": filtro centro.
- E2:E12;"Pagado": filtro estado.
- No A:A entero si la hoja tiene totales debajo o otra tabla pegada.

G2 debe dar **2990**. Si da 4280, 4190 o 2990,10, paras.

Compruebas, no “si la función se llama SUMIFS”:

1. **F2.** ¿Los rangos empiezan en 2, no en 1? El encabezado “Importe” no se suma. Si el rango es D1:D12, mal.
2. **Criterio de texto.** "Pagado" no es "pagado " con espacio, ni "Pago". Si Nacho escribió "Pagado" y Copilot busca "Paid", el total sale 0 o incompleto.
3. **Fila 5 y 6.** Filtras A=Norte y E=Pagado a mano. Sumas D visible. Tiene que coincidir con G2. Ese filtro es tu auditoría. Cinco minutos.
4. **Fila 9 = 0.** Si G2 es 2990 y el filtro muestra el 0, bien. Si Copilot “limpió” los ceros y cambió el rango, lo dices: el 0 es un hecho.
5. **Prosa del panel.** Si debajo de la fórmula ha escrito “total 3.000 € aprox.”, ignoras la prosa. G2 es 2990. El redondeo es otro dato. No viaja.

Corrección puntual:

“El criterio de estado falta. Quiero SUMIFS con Pagado. Anulado no entra. Ponla en G2. No me des el total en el chat.”

Un turno. **Copilot excel fórmula** es eso. No un dashboard.

## Comprobar el número: una celda que puedas auditar

**No fiarte de un número de Copilot** es una regla de celda, no de carácter. El panel puede acertar. Da igual. Sin G2 (o la celda que sea), no hay número para el correo ni para el informe.

Pasada corta, siempre:

1. **Hay fórmula, no valor pegado.** Si G2 es `2990` escrito a mano por Copilot, no es auditoría. Es un dato muerto. Pides la función. Si pega valores, Deshacer y otra vez.
2. **Hay rango cerrado o tabla.** `D2:D12` o `Tabla1[Importe]`. `D:D` en un libro con otra tabla debajo suma basura el día que Nacho pegue filas.
3. **Filtro espejo.** Datos > Filtro. Centro Norte, Estado Pagado. Suma rápida de la columna (la barra de estado de Excel, o SUBTOTALES). Coincide con G2 o no hay envío.
4. **Una fila de control.** Añades a mano, fuera de Copilot, la suma de las seis filas Norte+Pagado. 2990. Si tu control y G2 divergen, gana tu control hasta que encuentres el rango sucio.
5. **Hoja correcta.** Copilot a veces habla de Hoja1 y la fórmula está en Gastos_old. Miras la pestaña. El nombre de la hoja no es adorno.

Si Copilot “explica” el 2990 en un párrafo fluido (“el Norte consolida casi tres mil euros de ejecución”), eso ya es texto de informe. El riesgo es el de siempre: [el texto suena bien](/blog/inteligencia-artificial/confianza-excesiva-el-texto-suena-bien). El 2990 se mira en G2, no en el párrafo.

Cuándo parar:

- Tres fórmulas y sigue incluyendo Anulado. Filtras tú. Escribes SUMIFS tú. Copilot ha fallado el criterio; no es un debate.
- Te pide “el resto de meses para completar el trimestre”. No están en A1:E12. Completar sería inventar. No pegas otra hoja de un cliente “para contexto”.
- Empieza a hablar de IVA, de “gasto deducible”, de “esto en el 347”. Cierras. Eso no era la pregunta. La pregunta era Norte + Pagado.

## Copilot tablas dinámicas (tú sabes el origen)

**Copilot tablas dinámicas** puede crear una tabla dinámica: filas por Centro, valores Suma de Importe, filtro Estado = Pagado. Útil. No es magia. Tú sigues sabiendo:

1. **Rango origen.** ¿A1:E12 o A1:E1000 con mil vacías? ¿Ha comido la hoja Resumen? Insertas la tabla dinámica y miras “Origen de datos”. Si no sabes señalarlo, no la usas.
2. **Campos.** Filas = Centro. Valores = Suma de Importe. Filtro = Estado. Si Copilot ha puesto “Cuenta de Importe” en vez de Suma, el Norte no es 2990: es un recuento de filas. Distinto. Lo cambias tú.
3. **Filtro Pagado.** Lo abres. ¿Está Pagado marcado y Anulado no? Lo marcas tú si Copilot lo ha dejado en “todo”.
4. **Actualizar.** Nacho añade una fila 13. La tabla dinámica no es un vivo eterno si el origen era A1:E12. O conviertes el rango en Tabla de Excel (Insertar > Tabla) y el origen es la tabla, o actualizas el origen. Copilot no vigila el viernes.

Pedido útil:

```
Crea una tabla dinámica en una hoja nueva.
Origen: A1:E12 de esta hoja.
Filas: Centro.
Valores: suma de Importe.
Filtro: Estado = Pagado.
No añadas campos que no estén (margen, IRPF, trimestre fiscal).
No pongas totales en prosa en el panel: los totales salen de la tabla.
```

Compruebas el Norte en la dinámica contra G2 (2990) y contra el filtro. Si la dinámica dice Norte 4280, el filtro no está. No “redondeas” ni envías 4280 porque “es el de Copilot”.

Una tabla dinámica no es un informe Word. No la pegas a un cliente sin mirar el origen. Si el origen incluye una fila de prueba (“TEST 99999”), esa fila viaja.

## Errores habituales (para aquí)

**Copiar el total del panel al correo.** El panel no es G2. Para aquí: o hay celda con fórmula, o no hay cifra.

**SUMIF de una columna cuando hacían falta dos criterios.** Norte sin Pagado. 4280 en vez de 2990. F2 enseña cuántos criterios hay. Cuéntalos.

**Rango con encabezado o con la fila de totales de Nacho.** D1:D20 donde D20 es ya un total. Doble conteo. El origen se señala.

**Fiarte de la tabla dinámica porque “se ve profesional”.** El formato no audita. El origen y el filtro, sí.

**Pedir el IVA o el asiento.** No es este job. No hay dictamen. SUMIFS, filtro, dinámica. Punto.

**Exportar la hoja a un chat de consumo** porque en Excel no sale Copilot. Si IT no ha dado licencia, no es un sí por detrás. NIF y clientes, menos.

**Dejar que Copilot “rellene” las celdas vacías de Estado.** El Pendiente de la fila 6 no se convierte en Pagado para que el trimestre cierre. El hueco se queda. Nacho escribe Pagado cuando esté pagado.

**Leer solo la explicación y no las columnas.** “IA explica una hoja” no sustituye A1. Si dice que E es “todo pagado” y hay Pendiente, la explicación cae.

Para aquí, en positivo:

1. Pides la fórmula con columnas y criterios, no el total soñado.
2. G2 (o la dinámica) se abre. Rangos, filtros, hoja.
3. Filtro espejo. Tu 2990 de control gana hasta que coincidan.
4. Cero IRPF, cero asientos, cero prosa de “compromiso sólido”.

## Cierre

**Microsoft Copilot en Excel** se reduce a esto:

1. IT: licencia, esta hoja, no volcar a un chat personal si está prohibido.
2. Encabezados claros. Una pregunta: fórmula o dinámica, no “el trimestre”.
3. **Pedir una fórmula en lenguaje natural.** SUMIFS con criterios. La cifra sale de la celda.
4. F2, filtro espejo, fila de control. **No fiarte de un número de Copilot** en prosa.
5. Tabla dinámica: origen, campos, filtro. Tú los conoces.

Sin magia. Sin dictamen. El modelo completa patrones. Tú pones el rango y la prueba.
