---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Tests unitarios a partir de una función"
description: >-
  Tests unitarios con IA: pega la función, elige pytest o Jest y lista los
  casos límite. Tú los ejecutas. El modelo no cubre lo que no existe.
readTime: 11 min
keywords:
  - tests unitarios con ia
  - chatgpt escribe tests
  - casos límite de una función
  - ia no cubra lo que no existe
  - pytest o jest a partir de código
  - revisar tests generados
  - nombres de tests claros
excerpt: >-
  Pegas una función, el framework y los casos límite. El modelo propone tests.
  Tú los corres. Si inventa un método que no está, el test se tira.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/tests-unitarios-a-partir-de-una-funcion'
related_routes:
  - un-refactor-pequeno-no-reescribir-el-proyecto
  - pedir-que-te-expliquen-un-error-de-codigo
  - programar-en-pareja-con-copilot
  - como-escribir-un-prompt-que-sirva
faqs:
  - question: ¿ChatGPT puede escribir tests y yo fiarme del verde que describe?
    answer: "No. ChatGPT escribe tests en prosa y en código. El verde de verdad sale en tu terminal: pytest o Jest. Si el modelo dice ‘todos pasan’ y tú no has ejecutado, no hay resultado. Revisar tests generados es leer y correr, no asentir."
  - question: ¿Qué casos límite pido para una función pequeña?
    answer: "Los que existen en el código: vacío, cero, el máximo que ya manejas, el error que ya lanza. No pidas ‘ataques’ ni entradas pensadas para romper un sistema ajeno. Casos límite de una función: el dict sin clave, el tipo que ya rechazas, el redondeo."
  - question: ¿Puedo pedirle pytest si mi proyecto es Jest, o al revés?
    answer: "Di el framework. Pytest o Jest a partir de código, uno. Si no lo dices, mezcla `describe` con `def test_`. Luego no corre. Una línea: ‘pytest 8, la función está en precios.py’."
  - question: ¿Qué hago si el test llama a `fetch_catalog()` y yo no tengo esa función?
    answer: "Lo borras. IA no cubra lo que no existe: si no está en el pegado, no se testea. No instales una librería para que el test del chat compile. El test se adapta a tu función, no al revés."
  - question: ¿Esto es lo mismo que programar en pareja con Copilot?
    answer: "No. Allí aceptas o rechazas líneas mientras escribes. Aquí pegas una función ya hecha y pides tests. Copilot puede sugerir un `test_` al vuelo: igual lo corres tú. No es un artículo de ritmo de autocompletado."
---

**Tests unitarios con IA** es un oficio de lista y de terminal: una función, el framework, los casos que *tú* quieres cubrir. El modelo propone. **Revisar tests generados** es el trabajo. El verde lo da pytest o Jest en tu máquina, no el párrafo “he cubierto el 100 %”. **IA no cubra lo que no existe**: si la función no tiene `fetch_catalog`, el test no la llama.

El prompt sigue el molde de [cómo escribir un prompt que sirva](/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva). Si los tests fallan y no entiendes el traceback, [pedir que te expliquen un error de código](/blog/inteligencia-artificial/pedir-que-te-expliquen-un-error-de-codigo). Si lo que quieres es reordenar la función, no añadir tests: [un refactor pequeño, no reescribir el proyecto](/blog/inteligencia-artificial/un-refactor-pequeno-no-reescribir-el-proyecto). No pidas las tres cosas a la vez.

Esto no es [programar en pareja con Copilot](/blog/inteligencia-artificial/programar-en-pareja-con-copilot). Allí el flujo es línea a línea mientras escribes. Aquí la función ya está. Pides una batería. La corres.

## La función, el framework, los casos que ya existen

Tres piezas. Sin ellas **ChatGPT escribe tests** para un programa imaginario.

**1. La función.** Completa. La que vas a testear. No el repo. Si importa algo, di qué es: “`catalogo` es un `dict` `str → float` en memoria. No hay base de datos.”

**2. El framework.** Uno. `pytest` 8. O Jest 29 con Node. **Pytest o Jest a partir de código**, no los dos. Incluye cómo se llama el archivo: `test_precios.py` al lado de `precios.py`. En JS: `descuentos.test.js` al lado de `descuentos.js`.

**3. Los casos.** Los escribes tú, aunque sean toscos. El modelo rellena huecos con funciones que “suele haber”. Tu lista ancla.

Ejemplo de lista (Marta, más abajo):

- `general` con `10.0` → `12.10`
- `reducido` con `4.5` → `4.95`
- código ausente → `KeyError`
- `tipo_iva` desconocido → `ValueError`
- no hace falta un caso de red, no hay red

Qué no pides:

- “Cobertura 100 % del proyecto.”
- Tests de un endpoint que no has pegado.
- Tests ofensivos ni recetas de ataque. No. Este artículo no cubre eso. Casos límite: vacío, cero, tipo mal, clave mal. Datos de juguete.
- Mocks de Stripe, de AWS, de un CRM. Si no están en la función, no existen.

Si la función lee un fichero o la red, este oficio se queda corto. O extraes el cálculo puro (como Marta) y testas eso, o no uses un chat de consumo para el resto. El unitario es la función pura.

## ChatGPT escribe tests: el prompt

Plantilla:

```
Tarea: escribe tests unitarios de ESTA función. No cambies la función.
Framework: pytest. Un solo archivo test_precios.py.
Import: from precios import precio_con_iva
Casos (solo estos, más los que se deduzcan SIN inventar funciones):
- …
Prohibido: no inventes helpers que yo no he pegado. No uses red. No uses pytest.mark.skip.
No añadas faker, factory, ni bases de datos.
Nombres de tests claros: test_<comportamiento>_<resultado>.
Formato: el archivo de tests y nada más.
```

Sin el “no cambies la función”, el modelo “arregla” el `KeyError` para que el test sea más fácil. Entonces ya no estás testeando tu código. Estás testeando el código del chat.

Si usas Jest:

```
Framework: Jest. Archivo descuentos.test.js.
const { precioConIva } = require("./descuentos");
Mismos casos. assert → expect. Nada de supertest. Nada de fetch.
```

**Nombres de tests claros** se piden en el prompt. `test_general_redondea_a_dos_decimales`, no `test1`. Si salen `test_should_work`, un turno: “renombra a comportamiento_resultado. Un test, un assert principal.”

## Casos límite de una función: Marta y el IVA de juguete

**Casos límite de una función** no son un infierno de combinatoria. Son los bordes que el código ya nombra. Marta copia la función de Inés. Doce líneas. Quiere pytest. No quiere un suite de e-commerce.

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

Marta escribe los casos *antes* de pegar, en un bloc:

1. Camino feliz `general`.
2. Camino feliz `reducido`.
3. Clave ausente.
4. Tipo de IVA desconocido.
5. (Opcional) `0.0` de base → `0.0`. El código lo permite. Si lo permite, se testea. Si Marta no quiere precios 0, eso es un cambio de función, no un test.

Prompt de Marta:

```
Lenguaje: Python 3.12. pytest.
Función en precios.py (abajo). Sin I/O.
Tarea: test_precios.py con pytest.raises para las excepciones.
Casos:
1) catalogo={"SKU-01": 10.0}, codigo="SKU-01", tipo_iva="general" → 12.10
2) catalogo={"SKU-02": 4.5}, codigo="SKU-02", tipo_iva="reducido" → 4.95
3) codigo="SKU-99" → KeyError
4) tipo_iva="super" → ValueError, mensaje "tipo_iva no reconocido"
5) base 0.0 y general → 0.0
No cubras CSV, HTTP, IVA legal, ni otras funciones.
No inventes precio_sin_iva ni cargar_catalogo.
"""
(función)
"""
```

Tests que sí (el modelo puede devolver esto; Marta lo pega y lo corre):

```python
import pytest
from precios import precio_con_iva

def test_general_redondea_dos_decimales():
    assert precio_con_iva({"SKU-01": 10.0}, "SKU-01", "general") == 12.10

def test_reducido_redondea_dos_decimales():
    assert precio_con_iva({"SKU-02": 4.5}, "SKU-02", "reducido") == 4.95

def test_codigo_ausente_lanza_keyerror():
    with pytest.raises(KeyError):
        precio_con_iva({"SKU-01": 10.0}, "SKU-99", "general")

def test_tipo_iva_desconocido_lanza_valueerror():
    with pytest.raises(ValueError, match="tipo_iva no reconocido"):
        precio_con_iva({"SKU-01": 10.0}, "SKU-01", "super")

def test_base_cero_general_es_cero():
    assert precio_con_iva({"SKU-01": 0.0}, "SKU-01", "general") == 0.0
```

Marta ejecuta:

```
pytest test_precios.py -q
```

Cinco puntos. Si uno falla, lee el traceback. No le pide al chat “ponlo en verde” sin leer. El fallo puede ser el test (assert mal) o la función (no hacía lo que Marta creía). Eso se decide leyendo, no votando al modelo.

Ejemplo: el modelo escribió `== 12.21` en el caso general. Marta corre y ve:

```
    def test_general_redondea_dos_decimales():
>       assert precio_con_iva({"SKU-01": 10.0}, "SKU-01", "general") == 12.21
E       assert 12.1 == 12.21
```

El traceback dice que la función devolvió `12.1` (el `12.10` de Python). El test está mal, no la función. Marta corrige el assert a `12.10`. No pide “reescribe precio_con_iva para que dé 12.21”. Un turno al chat, si hace falta: “El resultado real es 12.10. El test estaba inflado. Rehaz solo ese assert. No toques la función.”

Tú ejecutas otra vez. Verde. El modelo no ha “pasado” nada: lo has pasado tú.

Tests que se tiran si salen:

```python
def test_carga_el_catalogo_desde_s3():
    ...
def test_api_key_invalida():
    ...
def test_precio_sin_iva():
    assert precio_sin_iva(...) == 10.0
```

`precio_sin_iva` no existe. S3 no está. El caso de “api key” no es un unitario de esta función y no se pide. Fuera.

## Pytest o Jest a partir de código (tú ejecutas)

**Pytest o Jest a partir de código** significa: el archivo de tests se parece a tu repo, y el comando lo lanzas tú.

Python:

1. La función en `precios.py`.
2. `test_precios.py` al lado.
3. `python3 -m pytest test_precios.py -q`
4. Si `pytest` no está: `pip install pytest` en *tu* venv. El chat no instala.

JavaScript (misma idea, función equivalente):

```javascript
function precioConIva(catalogo, codigo, tipoIva) {
  const base = catalogo[codigo];
  if (base === undefined) {
    throw new Error("codigo ausente");
  }
  const factores = { general: 1.21, reducido: 1.1 };
  if (!(tipoIva in factores)) {
    throw new Error("tipo_iva no reconocido");
  }
  return Math.round(base * factores[tipoIva] * 100) / 100;
}
```

Jest: `expect(precioConIva({ "SKU-01": 10 }, "SKU-01", "general")).toBe(12.1)`. Ojo: `1.1` en JS y `Math.round` no son el `round` de Python. Si Marta traduce mal el test, el número miente. Por eso no mezclas frameworks. Un lenguaje. Un redondeo. Los casos se escriben en *ese* runtime.

Tú ejecutas:

```
npx jest descuentos.test.js
```

Si no corre, no está testeado. El chat que dice “passing” no ha tocado tu disco.

Cuando pytest peta con un ImportError, el oficio vuelve al error: pegas el traceback redactado, no pides “reescribe los tests y la app”. Una línea: “el import debe ser `from precios import precio_con_iva`. Rehaz solo el import.”

## Revisar tests generados

**Revisar tests generados** es una pasada, no un visto bueno emocional.

1. **¿Importa solo lo que existe?** Si aparece un símbolo que no está en el pegado, borra el test o el import.
2. **¿Un test, una conducta?** Si un `test_todo` hace cinco asserts de cinco caminos, parte. O pides al modelo que parta. Tú fusionas con criterio.
3. **¿Los números son los tuyos?** `12.10`, no `12.21` (alguien ha aplicado IVA dos veces).
4. **¿Las excepciones son las tuyas?** `pytest.raises(KeyError)` si lanzas `KeyError`. Si el modelo pone `pytest.raises(Exception)`, es demasiado ancho. Un `Exception` se traga un `OSError` que no debía pasar. Lo estrechas.
5. **¿Hay I/O?** `tmp_path` para una función de dict es ruido. Fuera.
6. **¿Hay tiempo, random, red?** Fuera. Esta función es determinista.
7. **¿Los nombres dicen el caso?** **Nombres de tests claros.** `test_codigo_ausente_lanza_keyerror` se lee en el fallo de CI. `test_final` no.

Después de leer, corres. Si falla un test que tú considerabas correcto, no borres la función para contentar al chat. Mira el assert. Marta creía `4.95` y el modelo puso `4.94` por un redondeo de `1.1 * 4.5`. En Python: `round(4.5 * 1.10, 2)` es `4.95`. El test se corrige al número de *tu* función, no al del blog de otra persona.

Si Copilot (el autocomplete) añade un sexto test mientras pegas, mismo filtro. No es otro artículo: es la misma revisión. El ritmo de pareja se queda en su URL.

No pidas al modelo tests ofensivos ni recetas de ataque. Validar un tipo o un vacío, sí, sobre *tu* función, con datos inocuos (`None`, `""`, `0`). Eso es el borde de tu API. Punto.

## IA no cubra lo que no existe

El fallo típico: el chat añade `cargar_catalogo("catalogo.csv")` y un test de tres filas. Tú no tienes CSV. El test falla o, peor, te empuja a crear el CSV. Paras.

Regla:

- Si no está en el código pegado, el test no lo llama.
- Si el test necesita un objeto que no puedes construir en tres líneas, el test es el equivocado.
- Si el modelo documenta un flag `--iva-legal` que tu script no tiene, no lo añades “para que pase”.

Prompt de corrección:

```
Has testado precio_sin_iva y cargar_catalogo. No existen.
Bórralos. Quédate con los cinco casos de mi lista.
No añadas fixtures extra.
```

**IA no cubra lo que no existe** también vale al revés: no pidas cubrir un `if` que vas a borrar esta tarde. Testeas el código de hoy. El refactor, si llega, es el otro artículo. Después de un refactor, vuelves a correr *estos* tests. Si el contrato se mantuvo, siguen verdes. Si no, el refactor mentía.

## Errores habituales (para aquí)

**Creer el “100 % coverage” del chat.** No hay cobertura hasta que pytest corre. Para aquí.

**Pedir tests de un sistema.** “Cubre el backend.” No hay backend en el pegado. Una función.

**Mezclar refactor y tests.** El modelo cambia la función para que el test sea fácil. Dos hilos. Dos oficios.

**Tests anchos `except Exception`.** Enmascaran. Estrecha el tipo.

**Nombres `test1`, `test2`.** Cuando falle el CI no sabes qué. Pides **nombres de tests claros** y los corriges tú si hace falta.

**Copiar tests de Jest en un repo de pytest.** No corren. Di el framework. Un solo.

**Pegar datos de clientes en los fixtures.** `ana.garcia@cliente.es`, pedidos reales. No. `SKU-01`, `10.0`. Como el resto de la vertical.

**Pedir tests ofensivos.** No. Para aquí. Si tu función valida un string vacío, test del string vacío. Punto.

**No ejecutar.** El error más barato. `pytest test_precios.py -q`. Sin eso, no hay tests. Hay un fichero.

Para aquí, en positivo:

1. Función. Framework. Casos escritos por ti.
2. Un archivo de tests. Sin APIs fantasma.
3. Lees. Corres. **Revisar tests generados** es eso.
4. Si hay traceback, lo explicas en el otro artículo, redactado.
5. Si quieres cambiar la función, refactor aparte, mismos tests después.

## Cierre

**Tests unitarios con IA** se reduce a esto:

1. Una función que ya corre.
2. Pytest o Jest, uno.
3. Casos límite que el código ya tiene.
4. El modelo escribe. Tú filtras lo que no existe.
5. Tú ejecutas. El verde es de tu terminal.

Sin cobertura de cine. Sin funciones inventadas. El test nombra lo que hay. Tú lo demuestras corriendo.
