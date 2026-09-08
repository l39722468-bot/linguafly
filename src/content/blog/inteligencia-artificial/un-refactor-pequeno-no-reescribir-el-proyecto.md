---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Un refactor pequeño, no reescribir el proyecto"
description: >-
  Refactor pequeño con IA: una sola función, el comportamiento que no puede
  cambiar y un diff corto. Tú lo revisas. El repo entero no se pega.
readTime: 11 min
keywords:
  - refactor pequeño con ia
  - chatgpt refactoriza esta función
  - cambio local de código
  - ia no reescriba el repo
  - diff corto con un chatbot
  - mejorar un función sin cambiar comportamiento
  - revisar un refactor propuesto
excerpt: >-
  Una función, lo que debe seguir haciendo igual y un diff corto. Tú lees
  cada línea. El modelo no reescribe el proyecto por ti.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/un-refactor-pequeno-no-reescribir-el-proyecto'
related_routes:
  - tests-unitarios-a-partir-de-una-funcion
  - pedir-que-te-expliquen-un-error-de-codigo
  - como-escribir-un-prompt-que-sirva
  - pedir-codigo-defensivo-no-un-exploit
  - no-pegar-secretos-ni-el-env
faqs:
  - question: ¿Puedo pedirle a ChatGPT que reescriba todo el repositorio?
    answer: "No. El alcance es una función. Si pegas el repo, el modelo mezcla archivos, inventa APIs y cambia comportamiento. Un refactor pequeño con IA es un cambio local: el mismo resultado con el mismo input."
  - question: ¿Cómo pido un diff corto con un chatbot?
    answer: "Tres piezas: la función sola, el comportamiento que no puede cambiar y un unified diff de ese archivo. Sin README nuevo ni carpetas extra. Si el parche toca más de un archivo sin que lo hayas pedido, lo rechazas."
  - question: ¿Tengo que aceptar el refactor si los nombres quedan más ‘limpios’?
    answer: "No. Revisar un refactor propuesto es leer el diff: mismos returns, mismos errores, mismos redondeos. Si ha cambiado un 1.21 por 1.20, no es estilo. Es un bug. Nombres bonitos no pagan ese cambio."
  - question: ¿Esto sustituye a escribir tests de la función?
    answer: "No. Los tests son otro oficio: tú los pides y los ejecutas. Aquí el modelo reordena código. Si ya tienes tests, córrelos después del parche. Si no, no inventes cobertura en este hilo. Enlaza la tarea de tests aparte."
  - question: ¿Y si el modelo añade validación extra que yo no pedí?
    answer: "Es un cambio de comportamiento, no un refactor: si None antes petaba y ahora devuelve 0, has cambiado el contrato. O lo pides como código defensivo, o lo rechazas. El refactor no cuela políticas nuevas."
---

**Refactor pequeño con IA** es un cambio en una función, no un proyecto nuevo: el comportamiento que no puede cambiar, un parche corto. Tú lees el diff. El modelo no se lleva el repositorio. **IA no reescriba el repo** es la regla. Si la orden es “reescribe el sistema”, estás en otro trabajo y ese trabajo no es este artículo.

El molde del mensaje es el de siempre: [cómo escribir un prompt que sirva](/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva). Una tarea. Un cercado. Un formato (aquí: un diff). Si el código peta y no entiendes el mensaje, primero [pedir que te expliquen un error de código](/blog/inteligencia-artificial/pedir-que-te-expliquen-un-error-de-codigo). Si lo que quieres es cobertura, [tests unitarios a partir de una función](/blog/inteligencia-artificial/tests-unitarios-a-partir-de-una-funcion). No mezcles los tres oficios en un solo prompt.

Esto no es “mejorar la arquitectura”. No es un rediseño de carpetas. Es **mejorar un función sin cambiar comportamiento**: nombres, un early return, un `if` menos anidado. El resultado para el mismo input sigue igual.

## Una función, no el sistema

El alcance cabe en la pantalla. Si no cabe, recortas hasta que quepa. No zipeas el proyecto. No pegas `src/` entero. Un archivo, una función, las tres llamadas de prueba si las hay.

Qué sí entra:

- La función actual, completa.
- Los tipos de entrada y salida que *tú* conoces.
- Dos o tres ejemplos de input → output que ya has corrido.
- La lista de lo que no puede cambiar (abajo).

Qué no entra:

- El resto de módulos “por si acaso”.
- El `package.json` o el `pyproject.toml` enteros.
- Secretos, `.env`, tokens. Si hay una clave en el archivo, no pegas el archivo. La sacas. El recorte es previo, no parte del refactor.
- La orden “hazlo production-ready”. Esa frase autoriza al modelo a inventar colas, logs y un framework.

**Cambio local de código** se pide con un verbo estrecho: “simplifica los `if` de `tipo_iva`”. No: “limpia esto”. Limpia, para un modelo, es reescribir el mundo.

Si la función llama a otras tres que no pegas, di: “`catalogo` es un dict `str → float`. No existe `CatalogoService`.” Si no lo dices, el chat se inventa la clase y te la cuela en el diff.

## El comportamiento que no puede cambiar

Antes del prompt, escribes el contrato. En viñetas. Números concretos. El modelo no adivina tu redondeo.

Contrato de Nacho (el ejemplo de más abajo):

1. `SKU-01` + `general` → `12.10`
2. `SKU-02` + `reducido` → `4.95`
3. Código ausente → `KeyError` (no `None`, no `0`)
4. `tipo_iva` distinto de `general` y `reducido` → `ValueError` con el texto actual
5. `round(..., 2)` se queda. No se cambia a tres decimales.

Eso es el test de aceptación, aunque aún no tengas pytest. Lo ejecutas a mano o con tres `print`. Después del diff, los cinco puntos tienen que seguir siendo verdad. Si el modelo “mejora” el `KeyError` devolviendo `0`, ha cambiado el producto. No es un refactor. Es un parche de producto colado.

Cómo escribirlo en el prompt:

```
Comportamiento fijo (no lo cambies):
- precio_con_iva({"SKU-01": 10.0}, "SKU-01", "general") == 12.10
- precio_con_iva({"SKU-02": 4.5}, "SKU-02", "reducido") == 4.95
- clave ausente: KeyError
- tipo_iva desconocido: ValueError("tipo_iva no reconocido")
No añadas valores por defecto. No tragues excepciones.
```

Sin esta lista, **ChatGPT refactoriza esta función** como le da la estadística: `dict.get`, `try/except`, un `Enum`, un dataclass. Puede quedar “más bonito”. El `12.10` puede pasar a `12.1` o a `12.1000000001`. Lo ves tú, si compruebas. Si no compruebas, no has refactorizado. Has copiado.

## ChatGPT refactoriza esta función: el ejemplo de Nacho

Nacho tiene la misma función de precios que Inés. Doce líneas. Funciona. Los `if` están claros. Quiere un `if` menos, no un sistema de facturación.

Función de partida:

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

Prompt:

```
Tarea: refactor mínimo de esta función. Mismo comportamiento.
Objetivo: un diccionario de factores en lugar de if/elif, el ValueError igual.
Formato: unified diff. Solo este archivo. Sin tests nuevos. Sin README.
No cambies nombres de la función ni de los argumentos.
No añadas logging, tipos, ni dependencias.
"""
(función)
"""
```

Diff aceptable (corto, local):

```diff
 def precio_con_iva(catalogo, codigo, tipo_iva):
     """Devuelve el importe con IVA para un código del catálogo local."""
     base = catalogo[codigo]
-    if tipo_iva == "general":
-        factor = 1.21
-    elif tipo_iva == "reducido":
-        factor = 1.10
-    else:
-        raise ValueError("tipo_iva no reconocido")
+    factores = {"general": 1.21, "reducido": 1.10}
+    if tipo_iva not in factores:
+        raise ValueError("tipo_iva no reconocido")
+    factor = factores[tipo_iva]
     bruto = base * factor
     return round(bruto, 2)
```

Nacho comprueba:

```python
assert precio_con_iva({"SKU-01": 10.0}, "SKU-01", "general") == 12.10
assert precio_con_iva({"SKU-02": 4.5}, "SKU-02", "reducido") == 4.95
```

Y los dos errores, a mano: clave mala, tipo malo. Si siguen igual, el diff entra. Si el modelo ha escrito `1.2` en vez de `1.21`, el diff no entra. Da igual que el `if` sea más corto.

Diff que se rechaza de entrada:

- Un archivo `catalog.py` nuevo con una clase.
- `from decimal import Decimal` sin que lo hayas pedido (cambia redondeo).
- `except KeyError: return 0`.
- Comentarios de “arquitectura hexagonal”.
- Un `TODO` de conectar con Stripe.

**Diff corto con un chatbot** se mide así: lo lees entero en un pantallazo. Si no cabe, es demasiado. Pides: “solo el cuerpo de la función, otra vez.”

### El diff que Nacho rechaza (mismo prompt, mala salida)

El modelo a veces “mejora” el contrato. Nacho recibe esto:

```diff
 def precio_con_iva(catalogo, codigo, tipo_iva):
     """Devuelve el importe con IVA para un código del catálogo local."""
-    base = catalogo[codigo]
+    base = catalogo.get(codigo, 0)
     factores = {"general": 1.21, "reducido": 1.10}
     if tipo_iva not in factores:
         raise ValueError("tipo_iva no reconocido")
     factor = factores[tipo_iva]
     bruto = base * factor
     return round(bruto, 2)
```

Nacho corre el script de comprobación. `SKU-99` ya no lanza `KeyError`: imprime `0.0`. El contrato punto 3 ya no se cumple. Prompt de un turno:

```
Has cambiado el KeyError por 0. Eso no es un refactor.
Devuelve el dict de factores. catalogo[codigo] se queda.
No uses .get. No tragues la clave ausente.
```

Si el chat insiste en “es más seguro”, paras. Seguro para quién: para un caller que esperaba la excepción, no. El refactor no cuela un valor por defecto. Eso sería otro oficio (validar, fallar claro) y se pide aparte, con el contrato nuevo escrito por ti.

Nacho no discute arquitectura. Ejecuta. El traceback que *falta* es la prueba: si `SKU-99` no petaba y antes petaba, el parche es un cambio de producto. Fuera.

## Cómo pedir el diff (y cómo no)

El formato evita el ensayo. Pide el parche. No pidas “el código mejorado más una explicación inspiradora más un plan de migración”.

Plantilla:

```
Tarea: cambio local de código en UNA función.
Devuelve: unified diff. Nada de prosa antes. Una frase después: qué no has tocado.
Comportamiento fijo: (lista)
Prohibido: nuevos archivos, nuevas dependencias, cambiar excepciones, secretos.
```

Si el modelo responde con un bloque completo sin marcas `+`/`-`, pide el diff. El bloque completo te obliga a hacer el diff tú, y es fácil que se cuele un cambio de nombre que no viste.

Si responde con tres variantes, eliges una:

```
Quédate con la variante 2. Las otras, no. Devuelve solo ese diff.
```

Iteración si el parche toca de más:

```
Has añadido typing y un log. Quítalos. Solo el dict de factores.
El ValueError y el KeyError no se tocan.
```

Un turno. No un prompt nuevo de “actúa como lead”. El [prompt que sirve](/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva) se itera en el punto que falla.

Validación extra (tipos, vacíos, mensajes) no es este artículo. Si Nacho quiere fallar claro con `None`, eso es [pedir código defensivo, no un exploit](/blog/inteligencia-artificial/pedir-codigo-defensivo-no-un-exploit): validar entradas. Se pide aparte. No se cuela en el refactor “porque queda más robusto”. El `None` de hoy lanza lo que lance hoy. El refactor no cambia esa ficha.

## Revisar un refactor propuesto

**Revisar un refactor propuesto** es trabajo tuyo. El modelo no firma. Lees el diff como el de un compañero que no conoces.

Lista, en orden:

1. **¿Es un solo archivo?** Si hay un segundo, fuera.
2. **¿Los nombres públicos siguen?** `precio_con_iva`, mismos argumentos. Si ha pasado a `calculate_price_with_tax`, los callers se rompen. Rechazas o pides revertir el nombre.
3. **¿Los números siguen?** 1.21, 1.10, `round(..., 2)`. Los imprimes otra vez.
4. **¿Las excepciones siguen?** Mismo tipo, mismo texto si alguien lo captura.
5. **¿Ha añadido I/O?** `print` a un log, `open`, red. Un refactor de cálculo no abre ficheros.
6. **¿Ha copiado un comentario que menciona un servicio que no existe?** Mentira en el código. Fuera.

Comprobación de los treinta segundos, la de Nacho:

```
python3 - <<'PY'
from precios import precio_con_iva
C = {"SKU-01": 10.0, "SKU-02": 4.5}
print(precio_con_iva(C, "SKU-01", "general"))
print(precio_con_iva(C, "SKU-02", "reducido"))
try:
    precio_con_iva(C, "SKU-99", "general")
except KeyError as e:
    print("KeyError", e)
try:
    precio_con_iva(C, "SKU-01", "super")
except ValueError as e:
    print("ValueError", e)
PY
```

Si ves `12.1` en vez de `12.10`… en Python `print` de `12.1` puede ser el float `12.1` igual a `12.10`. Por eso el contrato usa `== 12.10` con `assert`, no el ojo. El `assert` manda.

Si no tienes tests y quieres que el modelo los escriba, cambias de artículo. Aquí no pides la batería. Aquí corres *tus* tres asserts. Mezclar “refactor + 40 tests inventados” es cómo se cuela una función `fetch_catalog()` que no existe.

## IA no reescriba el repo

Frases que no usas:

- “Reescribe el proyecto en FastAPI.”
- “Hazlo como en la industria.”
- “Añade capas, servicios, repositorios.”
- “Ponme un docker y CI.”
- “Moderniza todo a async.”

El modelo acepta esas órdenes. Produce mil líneas. Tú no las puedes revisar esta tarde. **IA no reescriba el repo** se impone en el prompt *y* en tu rechazo. Si el chat ya ha vomitado un árbol de carpetas, no “aprovechas” tres archivos. Cierras el hilo. Empiezas otro con la función sola.

Cuándo sí un segundo archivo: nunca en este oficio, salvo que tú lo nombres (“también el caller de la línea 18, son cinco líneas”). Aun así son dos piezas, dos diffs, dos revisiones. No un monorepo.

Límite de tamaño: si la función tiene 200 líneas, no pides “refactorízala”. Partes. Un `if` anidado. Un bloque. El artículo sigue siendo uno: cambio local. El resto, otro día.

Si el código no es tuyo para cambiarlo (licencia, trabajo, un compañero), no pegas el archivo a un chat de consumo. Pregunta el recinto. El refactor no autoriza el envío.

## Errores habituales (para aquí)

**Pegar el repositorio.** “Para que tenga contexto.” El contexto es el contrato y la función. Para aquí.

**Pedir estilo y comportamiento nuevo a la vez.** “Hazlo más limpio y que no pete si falta el SKU.” Eso es un cambio de producto. O refactor, o política nueva. No ambos.

**No listar los returns.** El modelo cambia `12.10`. Tú no tenías el número escrito. Para aquí: tres ejemplos antes de pedir.

**Aceptar `Decimal` o `float` distinto sin medir.** El redondeo bancario no es un detalle estético. Para aquí hasta que los asserts pasen.

**Dejar un `try/except` amplio.** Esconde el `KeyError`. El caller que dependía de la excepción se rompe. No es un refactor.

**Pedir tests en este hilo y no correrlos.** Los tests inventan APIs. Otro artículo. Tú ejecutas.

**Confiar en que “no he tocado el comportamiento” porque el chat lo afirma.** La frase no es una prueba. Los cinco puntos del contrato, sí.

Para aquí, en positivo:

1. Una función. Contrato en viñetas.
2. Diff corto. Un archivo.
3. **Revisar un refactor propuesto** línea a línea.
4. Correr los mismos ejemplos.
5. Si algo nuevo (validar `None`, tests, otro archivo): otro prompt, otro oficio.

## Cierre

**Refactor pequeño con IA** se reduce a esto:

1. Una función que cabe en pantalla.
2. Comportamiento fijo, con números.
3. **ChatGPT refactoriza esta función** en un **diff corto**.
4. Tú lees. Tú ejecutas.
5. El repo se queda donde estaba.

Sin reescritura del sistema. Sin “production-ready”. El modelo mueve texto. Tú conservas el contrato.
