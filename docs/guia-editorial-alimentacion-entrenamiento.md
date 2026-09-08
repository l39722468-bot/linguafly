# Guía editorial: alimentación + entrenamiento

Alimentación y entrenamiento se escriben **como un solo sistema de hábitos**, no como dos blogs sueltos. Quien busca una rutina de fuerza acaba preguntándose qué comer; quien organiza las comidas de la semana suele estar (o querer estar) moviéndose. El interlinking entre las dos temáticas no es un extra de SEO: es el producto.

Idiomas y el archivo de inglés tienen su propia lógica. Esta guía cubre solo `/alimentacion` y `/entrenamiento`.

**Última actualización:** 2026-09-08

---

## 1. Qué publicamos (y qué no)

### Audiencia

Adulto hispanohablante que quiere **comer y entrenar de forma sostenible** en una vida real: trabajo, casa, poco tiempo, sin material o con un gimnasio básico. No es atleta de élite ni paciente clínico.

### Promesa

Criterio práctico: un plan que se pueda repetir la semana que viene. Fuerza, constancia y platos reales. Sin dietas extremas, sin “retos de 21 días”, sin suplementos como protagonista.

### Tono

El de los cuatro artículos ya publicados: directo, un poco seco, ejemplos de cocina y de salón. Segunda persona. Frases cortas. Cero jerga de influencer.

Sí:

- “Tres cenas que ya sepas hacer.”
- “Los tendones van más lentos que el ego.”
- “El comodín no es fracaso.”

No:

- “¡Desbloquea tu mejor versión!”
- “Quema grasa en 10 minutos.”
- “Hack anabólico.”

### Límites editoriales (no negociables)

- No diagnósticos, no planes para patología, embarazo, TCA o lesiones agudas. Una línea de “consulta a un profesional” cuando el tema lo pida, no un disclaimer de 400 palabras.
- No milagros, no “antes/después”, no marcas de suplementos.
- No reutilizar `/blog/fitness/…`: esa categoría está aparcada. Lo nuevo va a `entrenamiento` o `alimentacion`.
- No mezclar con cursos de inglés ni con CTAs a `/aprender-ingles`.

---

## 2. Por qué se trabajan juntas

Un artículo de fuerza que no apunta a proteína y recuperación deja al lector a medias. Un artículo de meal prep que no admite “entreno tres días” parece un Excel de nevera.

Cada pieza debe poder vivir sola (intención de búsqueda propia) y, a la vez, **empujar al otro vertical** en el momento en que el texto ya lo está pidiendo.

Regla de oro: si el borrador menciona el otro tema más de una vez (“si entrenas…”, “come proteína…”, “los días que no entrenas…”), **tiene que haber enlace**. Si no lo menciona nunca, el artículo está demasiado aislado: revisa si falta una frase útil, no un párrafo de relleno.

Los hubs `/alimentacion` y `/entrenamiento` son puertas de entrada. El cluster vive en los artículos.

---

## 3. Anatomía de un artículo

Markdown en `src/content/blog/alimentacion/` o `src/content/blog/entrenamiento/`. Al mergear a `main`, el sync lo sube a D1. Hace falta `published: true`.

### Frontmatter mínimo

```yaml
published: true
category: alimentacion   # o entrenamiento
date: '2026-09-08'
author: linguafly-team
title: "Título concreto, sin clickbait"
description: >-
  150–180 caracteres. Promesa + resultado práctico. Es el meta description.
excerpt: >-
  1–2 frases para tarjetas. Puede ser más cortante que la description.
readTime: 8 min
keywords:
  - intención principal (como la buscaría alguien)
  - variante cercana
  - 2–4 más, sin repetir el título entero
related_routes:
  - slug-del-articulo-hermano
  - slug-del-otro-vertical
canonical: 'https://linguafly.app/blog/alimentacion/slug-del-archivo'
faqs:
  - question: Pregunta que la gente escribe en Google
    answer: Respuesta de 2–4 frases, accionable.
```

Notas:

- El **slug es el nombre del archivo**. Único en la temática; no reutilizar slugs de inglés.
- `related_routes` son **slugs**, no URLs. Cruzar categorías es correcto y deseable.
- 3 FAQs. Deben coincidir con dudas reales, no con “¿Qué es la proteína?”.
- `canonical` siempre la URL pública final.

### Cuerpo

1. Párrafo de apertura: el problema real (hambre a las 21:00, tendón vs ego). Nada de definición de diccionario.
2. 3–5 H2 con un método, una sesión, un plato o una regla.
3. Una sección de errores habituales o señales de parar.
4. Cierre corto. El último párrafo puede apuntar al artículo hermano **si aún no se enlazó**.

Longitud útil: **800–1.400 palabras**. Si pasa de 1.800, casi seguro son dos artículos.

### Enlaces en el cuerpo (obligatorio)

- **2 a 4 enlaces contextuales** en el markdown, con texto que describa el destino.
- Al menos **uno al otro vertical**.
- Formato: `[rutina de fuerza para principiantes en casa](/blog/entrenamiento/rutina-fuerza-principiantes-casa)`.
- No bloques de “Artículos relacionados” escritos a mano: eso lo resuelve `related_routes` en la página.

D1 prioriza `related_routes` y luego rellena con la misma categoría. Si no pones slugs del otro vertical en `related_routes`, **el recuadro de relacionados no cruzará**.

---

## 4. Mapa de clusters (un solo grafo)

Trabajamos **un grafo**, no dos silos. Cada artículo tiene:

- una **intención** (lo que busca Google / el lector)
- un **papel**: pilar (guía ancla) o satélite (un gesto concreto)
- **hermanos** en el mismo vertical y **puentes** al otro

### Cluster A — Empezar (ya publicado)

| Papel | Categoría | Slug | Puentes |
|---|---|---|---|
| Pilar | entrenamiento | `rutina-fuerza-principiantes-casa` | macros, comidas, progresar |
| Pilar | entrenamiento | `progresar-sin-lesionarte` | rutina, proteína |
| Pilar | alimentacion | `organizar-comidas-de-la-semana` | macros, rutina |
| Pilar | alimentacion | `proteina-hidratos-grasas-guia-practica` | comidas, rutina, progresar |

Estos cuatro son el **núcleo**. Todo lo nuevo debe enganchar aquí o a un satélite que ya enganche aquí. No abrir un quinto pilar hasta que el núcleo tenga 2–3 satélites cada uno.

### Cluster B — Comer para entrenar (prioridad de redacción)

Puentes naturales entre nevera y sesión.

| Intención | Categoría | Slug propuesto | `related_routes` de salida |
|---|---|---|---|
| Qué comer antes y después de entrenar | alimentacion | `comer-antes-despues-entrenar` | rutina-fuerza-principiantes-casa, proteina-hidratos-grasas-guia-practica, progresar-sin-lesionarte |
| Proteína si haces fuerza (sin batidos obligatorios) | alimentacion | `proteina-si-entrenas-fuerza` | proteina-hidratos-grasas-guia-practica, rutina-fuerza-principiantes-casa, organizar-comidas-de-la-semana |
| Hidratos en días de entreno vs descanso | alimentacion | `hidratos-dias-entreno-y-descanso` | proteina-hidratos-grasas-guia-practica, progresar-sin-lesionarte, rutina-fuerza-principiantes-casa |
| Comodín de nevera vacía / cena de 10 minutos | alimentacion | `cenas-rapidas-despues-entrenar` | organizar-comidas-de-la-semana, comer-antes-despues-entrenar, rutina-fuerza-principiantes-casa |

### Cluster C — Recuperación (prioridad de redacción)

El entrenamiento no termina al último ejercicio.

| Intención | Categoría | Slug propuesto | `related_routes` de salida |
|---|---|---|---|
| Días que no entrenas: caminar, dormir, comer | entrenamiento | `dias-de-descanso-que-hacer` | progresar-sin-lesionarte, rutina-fuerza-principiantes-casa, organizar-comidas-de-la-semana |
| Agujetas vs señal de lesión | entrenamiento | `agujetas-o-lesion` | progresar-sin-lesionarte, rutina-fuerza-principiantes-casa |
| Dormir y fuerza (sin coaching de sueño) | entrenamiento | `sueno-y-fuerza` | progresar-sin-lesionarte, proteina-hidratos-grasas-guia-practica |

### Cluster D — Gestos de fuerza (satélites de entrenamiento)

Un patrón por artículo. Cada uno enlaza a la rutina pilar y a progresar; el puente alimentario es proteína o “comer alrededor del entreno” cuando exista.

Ejemplos (no escribir los seis el mismo mes):

- `flexiones-para-principiantes`
- `sentadilla-en-casa`
- `plancha-sin-hundir-la-lumbar`
- `entrenar-con-mochila-o-bandas`

### Cluster E — Logística de comida (satélites de alimentación)

Un problema de nevera o de semana. Puente a rutina cuando el lector come “porque entrena” o “aunque no entrene”.

Ejemplos:

- `lista-compra-semana-sencilla`
- `batch-cooking-una-hora`
- `comer-fuera-sin-desmontar-el-plan`

### Lo que no es un cluster

- “Receta de pollo al horno” suelta, sin criterio de menú.
- “HIIT de 6 minutos para marcar abdomen.”
- Comparativas de marcas, apps de macros o dietas nombradas (keto, ayuno, etc.) como método estrella.

---

## 5. Cómo se decide el siguiente artículo

Orden de decisión:

1. ¿Cierra un agujero del **núcleo** (cluster A) o de **comer para entrenar** (B)?
2. ¿La intención es distinta a un artículo ya publicado? (no reescribir macros con otro título)
3. ¿Tiene al menos **un puente** claro al otro vertical?
4. ¿Cabe en 1.200 palabras con un método, no con un índice de libro?

Si dos ideas pelean, gana la que **más veces se menciona ya** en los textos publicados y aún no tiene URL.

---

## 6. Interlinking: receta por artículo

Al publicar, rellena esta checklist:

1. `related_routes`: 3–5 slugs. **Mínimo uno del otro vertical.**
2. Cuerpo: 2–4 enlaces internos. **Mínimo uno del otro vertical.**
3. El ancla describe el destino (“guía práctica de proteína, hidratos y grasas”), no “haz clic aquí”.
4. Actualiza los artículos **ya vivos** que deberían devolver el enlace (el grafo es bidireccional). Si publicas `comer-antes-despues-entrenar`, añade ese slug a `related_routes` de la rutina y de macros.
5. Keywords: 1 término de cluster compartido como máximo (p. ej. ambos pueden llevar “principiante fuerza” **o** “proteína”, no una sopa idéntica). El resto, únicos.

Profundidad: un clic desde un pilar del núcleo hasta cualquier satélite nuevo. Si hace falta pasar por tres artículos, el mapa está mal.

No enlazar a `/blog/temas`, `/fitness` ni a cursos `/curso-a1`.

---

## 7. SEO, sin volverse plantilla

- Un H1 = `title`. No repetirlo como H2.
- Un H2 = una idea. Los H3 solo si hay pasos dentro de esa idea.
- Title ~ 50–60 caracteres, con la consulta (rutina en casa, menú semanal, sobrecarga…).
- Description = la del frontmatter. No “descubre cómo…”.
- FAQs = schema FAQPage. Deben responder de verdad; si la respuesta es “depende”, di de qué.
- Imagen: opcional. Si hay, `alt` descriptivo en español.

Canibalización: si dos slugs responderían a la misma SERP, es un solo artículo. Ejemplo: no hace falta “rutina full body en casa” además de `rutina-fuerza-principiantes-casa` hasta que el pilar se quede corto.

---

## 8. Inventario actual

| Estado | Categoría | Artículo |
|---|---|---|
| Publicado | alimentacion | [Organizar las comidas de la semana](/blog/alimentacion/organizar-comidas-de-la-semana) |
| Publicado | alimentacion | [Proteína, hidratos y grasas](/blog/alimentacion/proteina-hidratos-grasas-guia-practica) |
| Publicado | entrenamiento | [Rutina de fuerza en casa](/blog/entrenamiento/rutina-fuerza-principiantes-casa) |
| Publicado | entrenamiento | [Progresar sin lesionarte](/blog/entrenamiento/progresar-sin-lesionarte) |
| Siguiente oleada | ambos | Cluster B, luego un satélite de C |

Los cuatro del núcleo ya cruzan `related_routes` y llevan al menos un enlace contextual al otro vertical. Los siguientes artículos deben **engancharse a este cuadrado**, no empezar otro.

---

## 9. Publicar

1. Archivo en la carpeta de categoría, `published: true`.
2. Checklist del §6 (ida y vuelta de enlaces).
3. Merge a `main`. El workflow de Cloudflare sincroniza a D1.
4. Comprobar en producción la URL, el canonical, las FAQs visibles y que “artículos relacionados” muestre el puente al otro vertical.

Plantilla de PR: título del artículo, cluster (A/B/C…), slugs que ahora apuntan a él.
