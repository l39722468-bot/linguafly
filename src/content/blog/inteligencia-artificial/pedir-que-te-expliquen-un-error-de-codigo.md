---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Pedir que te expliquen un error de código"
description: >-
  Explicar un error de código con IA: pega el traceback, el lenguaje y lo
  que ya probaste. Redacta claves y datos. Un KeyError, no un dump de
  producción.
readTime: 11 min
keywords:
  - explicar un error de código con ia
  - chatgpt traceback
  - entender un error de python
  - ia lee un stack trace
  - no pegar secretos en el error
  - copilot explica este fallo
  - mensaje de error en claro
excerpt: >-
  Pegas el error, el lenguaje y lo que ya intentaste. Antes, tachas claves,
  tokens y datos de clientes. El modelo explica. Tú compruebas en tu máquina.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/pedir-que-te-expliquen-un-error-de-codigo'
alt: Mensaje de error de código explicado por un asistente de IA
related_routes:
  - no-pegar-secretos-ni-el-env
  - como-escribir-un-prompt-que-sirva
  - privacidad-al-usar-ia-que-no-pegar-nunca
  - programar-en-pareja-con-copilot
  - tests-unitarios-a-partir-de-una-funcion
faqs:
  - question: ¿Qué pego para que ChatGPT me explique un traceback?
    answer: "Tres piezas: el error completo (ya redactado), el lenguaje y lo que ya probaste. Sin eso el modelo inventa causas. No pegas el repo, ni el .env, ni el log de un cliente."
  - question: ¿Puedo pegar un stack trace de producción con emails de usuarios?
    answer: "No. Antes de pegar: sustituye emails, IDs, tokens y rutas que identifiquen. El oficio de este artículo es entender el tipo de error. El dump de producción no hace falta y viola la regla de no pegar secretos en el error."
  - question: ¿Copilot en el editor explica este fallo mejor que el chat del navegador?
    answer: "A veces: ve el archivo abierto y el cursor. Sigue siendo prosa. Tú reproduces el error. No es Copilot en Excel: aquí no hay celda. Es una función tuya y un mensaje. Aceptas la explicación si encaja con la línea que tú señalas."
  - question: ¿Cómo pido un mensaje de error en claro sin que reescriba mi código?
    answer: "Di el alcance: ‘explica la causa en cinco viñetas; no reescribas la función salvo que yo lo pida’. Si pide un cambio, que sea una línea y tú la pruebas. Explicar no es fusionar un parche a ciegas."
  - question: ¿Y si el modelo dice que es un bug de la librería y yo no lo he comprobado?
    answer: "No actualices dependencias porque un chat lo afirme. Reproduce: mismo input, misma función. Lee la línea del traceback. Si tu diccionario no tiene esa clave, es tu dato, no pip. La explicación gana cuando encaja con lo que ves al ejecutar."
---

**Explicar un error de código con IA** es un oficio corto: pegas el fallo, dices el lenguaje, dices lo que ya probaste. El modelo traduce el mensaje. Tú compruebas en tu terminal. No es un dump de producción. No es un informe forense. Es **un mensaje de error en claro** sobre una función que cabe en la pantalla.

Si no sabes cómo cercar la tarea, usa el molde de [cómo escribir un prompt que sirva](/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva). Si el traceback lleva nombres, tokens o un cliente, aplica antes la [privacidad al usar IA](/blog/inteligencia-artificial/privacidad-al-usar-ia-que-no-pegar-nunca). Este artículo no sustituye [no pegar secretos ni el .env](/blog/inteligencia-artificial/no-pegar-secretos-ni-el-env): aquel rota una clave si ya salió. Aquí el trabajo es otro: **no pegar secretos en el error** *antes* de pedir la explicación.

Esto no es Copilot en Excel. Allí el entregable es una fórmula y una celda. Aquí el entregable es: qué significa esta excepción, en qué línea, con este input.

## Qué pegar: error, lenguaje, lo que ya probaste

Tres bloques. En este orden. Un mensaje.

### 1. El error

El tipo, el mensaje, el traceback si lo hay. Completo hasta la línea que importa. No diez pantallas de un servidor. Recorta marcos de librerías si no las tocas: deja las tuyas y la primera de la biblioteca que falla.

### 2. El lenguaje y el entorno mínimo

“Python 3.12, script local, un diccionario en memoria.” No hace falta la distro. No hace falta el hostname. “JavaScript, Node 20, una función en `descuentos.js`.” El modelo adivina mal el runtime si no se lo dices. Un `KeyError` no es un `TypeError`. Un `undefined` de JS no es un `None` de Python.

### 3. Lo que ya probaste

Tres líneas, no un diario. “He impreso las claves del diccionario. `SKU-99` no está. He comprobado que el CSV de Inés no trae esa fila.” Eso evita que el chat te mande a hacer exactamente eso.

Formato del prompt:

```
Lenguaje: Python 3.12, script local, sin red.
Tarea: explica este error en claro. Causa probable. Qué comprobar yo.
No reescribas la función salvo que yo lo pida.
No inventes ficheros, APIs ni servicios que no aparecen abajo.
Lo que ya probé:
- …
Error y código:
"""
…
"""
```

Sin eso, **ChatGPT traceback** se convierte en teatro: “puede ser la red, el firewall, un hilo, un unicode”. Tu error era una clave que no existe. El relleno no ayuda.

Qué no pegar en este bloque:

- El repositorio entero. Una función. El traceback. Punto.
- Capturas de un panel de APM con miles de spans. No.
- El JSON de un webhook de un cliente. Extrae el campo que falla, con el valor sustituido.
- La orden “sé un senior staff engineer y depura mi arquitectura”. El verbo es explicar *este* mensaje.

## ChatGPT traceback: recortar el stack trace

**ChatGPT traceback** no significa “el modelo lee logs de producción”. Significa: le das *un* rastro de llamadas ya limpio. **IA lee un stack trace** peor cuando el pegado es un muro. Tú recortas. Luego pides.

Orden de recorte, antes de Ctrl+V:

1. **Quita secretos.** Cabeceras `Authorization`, cookies, `api_key=`. Sustituye por `[REDACTADO]`. Si el error *es* un 401, di “401 al llamar a un API mío” sin pegar el token. Rotar, si ya viajó, es el otro artículo.
2. **Quita datos de persona.** Emails, teléfonos, DNI, pedidos reales. Sustituye: `user-a@example.test`.
3. **Quita ruido de framework.** Cincuenta líneas de `site-packages` no explican tu `KeyError`. Deja tu archivo, la línea, el tipo.
4. **Quita timestamps y hosts.** No enseñan el tipo de error. Fuera.

Stack sucio (no se pega así):

```
2026-09-08 09:12:01 ERROR billing pid=4412 host=caja-prod-3
Authorization: Bearer sk-live-XXXXXXXX
User: ana.garcia@cliente.es pedido=PED-88421
Traceback (most recent call last):
  File "/opt/app/billing.py", line 88, in cobrar
    base = catalogo[codigo]
KeyError: 'SKU-99'
```

Stack que sí:

```
Traceback (most recent call last):
  File "precios.py", line 18, in <module>
    print(precio_con_iva(CATALOGO, "SKU-99", "general"))
  File "precios.py", line 4, in precio_con_iva
    base = catalogo[codigo]
KeyError: 'SKU-99'
```

El segundo basta. El primero enseña un token, un cliente y un host. El modelo no necesita eso para decirte que la clave no está en el diccionario.

## Entender un error de Python: el KeyError de Inés

**Entender un error de Python** se ve con una función pequeña. No con un volcado de Kubernetes. Inés tiene un script local de precios. Doce líneas. Un catálogo en memoria. Ejecuta. Cae.

La función:

```python
def precio_con_iva(catalogo, codigo, tipo_iva):
    """Devuelve el importe con IVA para un código del catálogo local."""
    base = catalogo[codigo]
    if tipo_iva == "general":
        factor = 1.21
    elif tipo_iva == "reducido":
        factor = 1.10
    else:
        raise ValueError("tipo_iva no reconocido")
    bruto = base * factor
    return round(bruto, 2)
```

El catálogo de prueba:

```python
CATALOGO = {"SKU-01": 10.0, "SKU-02": 4.5}
print(precio_con_iva(CATALOGO, "SKU-99", "general"))
```

El traceback:

```
Traceback (most recent call last):
  File "/home/ines/precios.py", line 18, in <module>
    print(precio_con_iva(CATALOGO, "SKU-99", "general"))
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/ines/precios.py", line 4, in precio_con_iva
    base = catalogo[codigo]
           ~~~~~~~~^^^^^^^^
KeyError: 'SKU-99'
```

Inés ya probó: imprimir `CATALOGO.keys()`. No está `SKU-99`. No ha tocado IVA. No ha tocado red.

Prompt que sirve:

```
Lenguaje: Python 3.12. Función local, un dict en memoria. Sin red, sin base de datos.
Tarea: explica este KeyError. Qué línea. Qué dato falta. Qué haría yo para confirmarlo.
Prohibido: no reescribas la función. No añadas un framework. No hables de APIs.
No inventes que el CSV está mal si yo no he pegado un CSV.
Lo que ya probé: listé las claves; SKU-99 no está. SKU-01 y SKU-02 sí.
"""
(función + traceback de arriba)
"""
Formato: cinco viñetas. Luego una línea: “siguiente comprobación”.
```

Salida útil (la que aceptas si encaja):

1. El tipo es `KeyError`. El diccionario no tiene esa clave.
2. La línea 4 hace `catalogo[codigo]` sin `get` ni `in`.
3. El argumento era `"SKU-99"`. No está en `CATALOGO`.
4. El IVA no se evalúa: el fallo es antes.
5. No es un bug de `round`.

Siguiente comprobación: de dónde sale `"SKU-99"`. Si Inés lo escribió a mano, el error es el argumento. Si lo lee de un CSV, el oficio pasa a *ese* fichero, en local, sin pegar filas de clientes.

Salida inútil (la rechazas):

- “Puede ser un problema de encoding UTF-8 en producción.”
- “Instala pandas y valida el dataset.”
- “Tu microservicio de catálogo no replica.”
- Un parche de treinta líneas con logging, Sentry y un retry.

Inés no pidió un rediseño. Pidió entender el mensaje. Cuando lo entiende, decide ella: añadir la clave, rechazar el código, o usar `.get` *si* ese es el comportamiento que quiere. Eso ya es un cambio. El cambio lo prueba ella. No el chat.

### Un TypeError en la misma función

Segundo fallo. Inés carga mal el catálogo: el precio va como texto.

```python
CATALOGO = {"SKU-01": "10.0"}
print(precio_con_iva(CATALOGO, "SKU-01", "general"))
```

```
Traceback (most recent call last):
  File "precios.py", line 18, in <module>
    print(precio_con_iva(CATALOGO, "SKU-01", "general"))
  File "precios.py", line 11, in precio_con_iva
    bruto = base * factor
TypeError: can't multiply sequence by non-int of type 'float'
```

El KeyError ya no aplica: la clave está. El IVA tampoco: el `if` pasó. Falla el `*`. Prompt: mismo molde, traceback nuevo, “lo que ya probé: las claves sí están”. Si Inés escribe “es un KeyError” y el archivo dice `TypeError`, el chat diagnostica otra cosa. Un turno: “El tipo real es TypeError. Rehaz las viñetas. No toques la función.”

## No pegar secretos en el error (esto no es el artículo del .env)

**No pegar secretos en el error** es el filtro de *este* pegado. El satélite del `.env` cubre otra SERP: qué hacer si la clave ya viajó, cómo rotar, cómo no volcar el fichero de entorno. Aquí no rotamos. Aquí no abrimos el `.env`. Aquí tachamos el traceback y pedimos una explicación.

Regla práctica:

1. Si el mensaje contiene un token, no es material de chat. Redáctalo. Si hace falta decir “401”, di 401. El token no explica el 401 mejor que la palabra 401.
2. Si el mensaje contiene un email de cliente, no es material de chat. `user-a` basta.
3. Si el mensaje es un volcado SQL con filas reales, no. Un `KeyError` de juguete sí.
4. Si no estás segura de si es secreto, no pegas. Reproducir en local con datos ficticios es el método. Inés no necesita el pedido 88421 para entender `KeyError`.

“Pero el modelo entiende mejor con el log real.” No. Entiende el *tipo*. El tipo se ve en una línea. El contexto útil es tu función de doce líneas y el argumento. El contexto inútil es el NIF del cliente.

Si trabajas en una cuenta de empresa con recinto, igual recortas. El recinto reduce un riesgo. No convierte un expediente en texto que puedas pegar.

## Copilot explica este fallo (en el editor, no en la hoja)

**Copilot explica este fallo** cuando el asistente está en el editor, con el archivo abierto, y señalas el traceback o la línea. GitHub Copilot Chat, Cursor, el panel que tengas. El job es el mismo que en el navegador: causa, línea, qué comprobar. La diferencia es el contexto: a veces ya ve el buffer. Eso no te ahorra recortar el pegado si *tú* copias un log de producción al panel.

Cómo pedirlo en el editor:

1. Abre el archivo de la función. No abras veinte.
2. Selecciona la función o pega el traceback ya redactado en el chat del IDE.
3. Orden: “Explica este error. No reescribas. No añadas dependencias.”
4. Lees la explicación contra la línea 4. Si dice que `round` falla y el traceback es `KeyError`, rechazas.

Qué no es este apartado:

- Autocompletar la siguiente línea mientras programas. Eso es [programar en pareja con Copilot](/blog/inteligencia-artificial/programar-en-pareja-con-copilot), otro oficio: aceptar o ignorar sugerencias. Aquí pides una explicación de un fallo ya ocurrido.
- Copilot en Excel. No hay `SUMIF`. No hay celda G2. Si tu error es una fórmula, no estás en este artículo.
- “Arregla el repo.” El alcance es esta función.

Si Copilot propone un `try/except` que traga el `KeyError` y devuelve `0`, eso no es una explicación. Es un cambio de producto. Inés no cobraba `0`: el programa petaba. Lo reproduces tú: `python3 precios.py`. El chat no ejecuta tu archivo.

## Mensaje de error en claro: qué pedir y qué no

**Mensaje de error en claro** es el entregable. Cinco viñetas. Causa. Línea. Dato. Qué no es. Próxima comprobación. No un ensayo sobre excepciones en Python.

Pide esto:

- Tipo de error en una frase (“la clave no está en el dict”).
- La línea tuya, no un tratado de CPython.
- Si el traceback miente respecto a tu código (a veces el modelo cita una línea 40 que no existe): “señala la línea con una cita textual de lo que yo pegué”.
- Una comprobación que puedas hacer en treinta segundos: imprimir claves, `type(x)`, un `len`.

No pidas esto en el mismo mensaje:

- Reescribir el sistema de precios.
- Tests de toda la aplicación. Si quieres tests de *esta* función, es otro artículo, otro prompt.
- Un refactor. Otro artículo.
- Recetas ofensivas. Si el error es tuyo (dato mal, tipo mal, clave mal), se explica así. Si es un 401 de tu propia API, redacto y digo 401. Nada de procedimientos de ataque.

Cuando la explicación es correcta y quieres un cambio mínimo, segundo mensaje, alcance cerrado:

```
Ahora: un cambio local. Si codigo no está en catalogo, ValueError con el código.
No cambies el IVA. No añadas logs a un servidor. Devuelve solo la función.
```

Eso ya no es explicar. Es un parche. Lo revisas como cualquier parche. Lo corres. Si sale otro traceback, vuelves a este oficio: pegar el error nuevo, no el hilo entero sucio.

## Errores habituales (para aquí)

### Pegar el dump de producción

Hosts, tokens, pedidos. Para aquí. Reproduce en local con `SKU-99` de juguete. El KeyError es el mismo.

### No decir el lenguaje

El modelo mezcla Python y JS. `undefined` no es `KeyError`. Una línea: “Python 3.12”.

### No decir lo que ya probaste

Te manda a imprimir las claves. Las imprimiste. Pierdes el turno.

### Pedir que “lo arregle” en el mismo prompt que “explícalo”

Mezclas oficios. Primero entender. El parche, si hace falta, después, una función.

### Dejar el token “que total ya está caducado”

Da igual. No pegas. Si ya se fue, rotas: el otro artículo. Aquí paras el pegado.

**Creer al modelo cuando contradice el traceback.** Dice `TypeError` y el archivo dice `KeyError`. Gana el traceback. Lo tienes en la pantalla.

**Usar el chat como Copilot de Excel.** Pedir un total, un margen, un IVA fiscal. Este job es el mensaje de excepción. El IVA de Inés es un `1.21` de juguete, no un dictamen.

**Pegar diez archivos “por contexto”.** El contexto es la función y el error.

**Aceptar un `except Exception: pass`.** Has silenciado el fallo. Para aquí.

Para aquí, en positivo:

1. Recorta secretos y personas.
2. Lenguaje. Error. Qué ya probaste.
3. Cinco viñetas. Citas la línea.
4. Reproduce tú.
5. Un cambio, si lo hay, aparte y mínimo.

## Cierre

**Explicar un error de código con IA** se reduce a esto:

1. Reproduce en pequeño. Datos de juguete.
2. Redacta el traceback. **No pegar secretos en el error.**
3. Lenguaje, error, lo ya probado. Un prompt, una tarea.
4. **ChatGPT traceback** o **Copilot explica este fallo**: causa y línea. Tú contrastas.
5. **Mensaje de error en claro.** Luego, si toca, un parche mínimo que *tú* ejecutas.

Sin dump de producción. Sin gurú. El modelo nombra el tipo. Tú tienes el proceso y la prueba.
