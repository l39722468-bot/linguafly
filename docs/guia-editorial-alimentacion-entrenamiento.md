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

Directo y claro. Segunda persona. Frases cortas. Ejemplos de cocina y de salón. Cero jerga de influencer. En **entrenamiento**, el texto enseña el gesto: pasos, colocación, qué mirar. No es prosa de revista.

Sí:

- “Siéntate a una silla que no ruede y levántate.”
- “Empuja el suelo con los talones. Arriba, un segundo.”
- “Tres cenas que ya sepas hacer.”

No (influencer):

- “¡Desbloquea tu mejor versión!”
- “Quema grasa en 10 minutos.”
- “Hack anabólico.”

No (literario / críptico):

- “Notar no es un electromiograma.”
- “El incendio no es el plan.”
- “La inercia no pide glúteo.”
- Metáforas que obligan a descifrar el consejo.

Si una frase suena ingeniosa y no se puede ejecutar, se reescribe. El lector tiene que saber **qué hacer con el cuerpo** en la siguiente repetición.

### Imágenes (entrenamiento)

Los artículos de **entrenamiento** llevan ilustraciones **del gesto en ejecución**. El lector tiene que ver el cuerpo: pies, rodillas, cadera, tronco, agarre.

Sí:

- Diagrama plano, no foto: figura simple de lado **haciendo** la repetición.
- Flechas o símbolos: naranja = dónde empujar; azul = dónde tirar; línea = alineación; aspa roja = error (lumbar hundida, talón que se levanta).
- Etiquetas cortas en español («EMPUJA», «TALONES», «CODOS ATRÁS»). El cuerpo ocupa el encuadre.

No:

- Foto realista de gimnasio o salón.
- Persona de pie sonriendo a cámara, planta y silla vacías.
- Mapas de calor musculares ni recortes de stock.

Archivos en `public/blog/entrenamiento/<slug>/…`. Markdown: `![qué se ve del gesto](/blog/entrenamiento/<slug>/archivo.png)`.
Mínimo **dos** por artículo de técnica (setup o inicio + posición de trabajo). Rutina pilar: los seis movimientos, no el mueble. Satélites de recuperación: solo si el gesto o la señal se puede ver (caminar, no un sofá).
Frontmatter `image:` = la ilustración del gesto (Open Graph). `alt` concreto.

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
  140–160 caracteres. Promesa + resultado práctico. Es el meta description
  (no el excerpt).
excerpt: >-
  1–2 frases para tarjetas. Puede ser más cortante que la description.
readTime: 11 min
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
- 3–5 FAQs. Deben coincidir con dudas reales (People Also Ask), no con “¿Qué es la proteína?”.
- `canonical` siempre la URL pública final.

### Cuerpo

1. Párrafo de apertura: el problema real (hambre a las 21:00, tendón vs ego). Nada de definición de diccionario.
2. 5–8 H2 con un método, una sesión, un plato o una regla. Cada H2 avanza el mismo tema; no es un índice de diez artículos.
3. Una sección de errores habituales o señales de parar.
4. Cierre corto. El último párrafo puede apuntar al artículo hermano **si aún no se enlazó**.

Longitud: **~2.000 palabras de cuerpo** (mínimo 2.000). Es el mismo listón que los artículos de curso. No se rellena con definiciones ni con el tema del satélite de al lado: se profundiza *esta* intención (ejemplos, semana tipo, regresiones, qué hacer el martes feo). Si pasa de 2.400, casi seguro son dos artículos. Si no llega a 2.000, no se publica.

Comprobar:

```bash
python3 scripts/count_habit_article_words.py
```

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
| Qué comer antes y después de entrenar | alimentacion | `que-comer-antes-y-despues-de-entrenar` | rutina-fuerza-principiantes-casa, proteina-hidratos-grasas-guia-practica, progresar-sin-lesionarte |
| Entrenar en ayunas: cuándo no | alimentacion | `entrenar-en-ayunas-cuando-no` | desayuno-si-entrenas-a-las-7, rutina-fuerza-principiantes-casa |
| Cenas rápidas después de entrenar | alimentacion | `cenas-rapidas-despues-de-entrenar` | organizar-comidas-de-la-semana, que-comer-antes-y-despues-de-entrenar, rutina-fuerza-principiantes-casa |
| Desayuno si entrenas a las 7 | alimentacion | `desayuno-si-entrenas-a-las-7` | entrenar-en-ayunas-cuando-no, que-comer-antes-y-despues-de-entrenar, rutina-fuerza-principiantes-casa |
| Día de descanso: no recortes | alimentacion | `dia-de-descanso-no-recortes-a-lo-loco` | que-hacer-los-dias-que-no-entrenas, proteina-hidratos-grasas-guia-practica |

### Cluster C — Recuperación (prioridad de redacción)

El entrenamiento no termina al último ejercicio.

| Intención | Categoría | Slug propuesto | `related_routes` de salida |
|---|---|---|---|
| Días que no entrenas: caminar, dormir, no un segundo entreno | entrenamiento | `que-hacer-los-dias-que-no-entrenas` | progresar-sin-lesionarte, rutina-fuerza-principiantes-casa, dia-de-descanso-no-recortes-a-lo-loco |
| Agujetas vs señal de lesión | entrenamiento | `agujetas-o-lesion` | progresar-sin-lesionarte, rutina-fuerza-principiantes-casa |
| Dormir y fuerza (sin coaching de sueño) | entrenamiento | `dormir-y-fuerza-lo-basico` | progresar-sin-lesionarte, cenas-rapidas-despues-de-entrenar |

### Cluster D — Gestos de fuerza (satélites de entrenamiento)

Un patrón por artículo. Cada uno enlaza a la rutina pilar y a progresar; el puente alimentario es proteína o “comer alrededor del entreno” cuando exista.

Publicados en la oleada 2 (slugs del catálogo):

- `sentadilla-en-casa-de-la-silla-al-aire`
- `flexiones-para-principiantes-pared-mesa-suelo`
- `puente-de-gluteo-tecnica-y-progresion`
- `plancha-sin-hundir-la-lumbar`
- `zancada-estatica-en-casa-con-silla`
- `remo-con-toalla-o-mochila-en-casa`

Siguiente capa de gestos (no reescribir los de arriba): búlgara, goblet, flexión con pausa, puente a una pierna, mochila o bandas.

### Cluster E — Logística de comida (satélites de alimentación)

Un problema de nevera o de semana. Puente a rutina cuando el lector come “porque entrena” o “aunque no entrene”.

Publicados en la oleada 2:

- `lista-de-la-compra-semanal-sencilla`
- `batch-cooking-de-una-hora`
- `orden-de-la-nevera-lo-delicado-delante`

Siguiente capa: `comer-fuera-sin-desmontar-el-plan`, compra con presupuesto, más batch.

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
4. ¿Llena ~2.000 palabras con **un** método, no con un índice de libro? Si para llegar al recuento tienes que explicar el artículo de al lado, recorta y enlaza.

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

La página usa `title` como `<title>` y `description` como meta description. El `excerpt` es solo para tarjetas. Si dejas la description floja, Google no ve el excerpt.

- Un H1 = `title`. ~50–60 caracteres. La consulta principal al inicio o muy cerca.
- Un H2 = una idea, con long-tail **solo si suena a frase humana** (“Batch cooking ligero: una hora el domingo”, no “Meal prep meal prep meal prep”).
- Description = 140–160 caracteres, verbo + resultado + modificador (en casa, sin material, sin contar macros).
- Keywords: 6–8. Una cabeza corta + el resto long-tail. Como máximo **un** término compartido con el artículo hermano del otro vertical.
- FAQs = schema FAQPage. Redáctalas como las escribe la gente en Google.
- Canonical = URL pública. No cambies el slug de un artículo ya indexable.
- Imagen: **obligatoria en entrenamiento** (gesto visible). En alimentación, opcional. `alt` descriptivo en español.

### Consultas objetivo del núcleo (no pisarse)

| Artículo | Consulta principal | Long-tails propias (no copiar al hermano) |
|---|---|---|
| Organizar comidas | organizar comidas de la semana | menú semanal fácil, meal prep para principiantes, tres cenas repetibles, comodín del menú |
| Proteína / hidratos / grasas | proteína hidratos y grasas | qué son los macronutrientes, cómo repartir macros sin contar, cuánta proteína al día si entrenas, los hidratos engordan |
| Rutina en casa | rutina de fuerza en casa | entrenamiento en casa para principiantes, ejercicios sin material, rutina full body 3 días, sesión de 25 minutos |
| Sobrecarga | sobrecarga progresiva | cuánto subir de peso cada semana, cómo progresar sin lesionarte, agujetas o lesión, señales de que entrenas demasiado |

Canibalización: si dos slugs responderían a la misma SERP, es un solo artículo. No hace falta “rutina full body en casa” además de `rutina-fuerza-principiantes-casa` hasta que el pilar se quede corto.

---

## 8. Inventario actual

Publicados (núcleo + oleadas 1 y 2):

| Estado | Categoría | Artículo |
|---|---|---|
| Publicado | alimentacion | [Organizar las comidas de la semana](/blog/alimentacion/organizar-comidas-de-la-semana) |
| Publicado | alimentacion | [Proteína, hidratos y grasas](/blog/alimentacion/proteina-hidratos-grasas-guia-practica) |
| Publicado | alimentacion | [Qué comer antes y después de entrenar](/blog/alimentacion/que-comer-antes-y-despues-de-entrenar) |
| Publicado | alimentacion | [Entrenar en ayunas: cuándo no](/blog/alimentacion/entrenar-en-ayunas-cuando-no) |
| Publicado | alimentacion | [Cenas rápidas después de entrenar](/blog/alimentacion/cenas-rapidas-despues-de-entrenar) |
| Publicado | alimentacion | [Desayuno si entrenas a las 7](/blog/alimentacion/desayuno-si-entrenas-a-las-7) |
| Publicado | alimentacion | [Día de descanso: no recortes](/blog/alimentacion/dia-de-descanso-no-recortes-a-lo-loco) |
| Publicado | alimentacion | [Lista de la compra semanal sencilla](/blog/alimentacion/lista-de-la-compra-semanal-sencilla) |
| Publicado | alimentacion | [Batch cooking de una hora](/blog/alimentacion/batch-cooking-de-una-hora) |
| Publicado | alimentacion | [Orden de la nevera: lo delicado delante](/blog/alimentacion/orden-de-la-nevera-lo-delicado-delante) |
| Publicado | entrenamiento | [Rutina de fuerza en casa](/blog/entrenamiento/rutina-fuerza-principiantes-casa) |
| Publicado | entrenamiento | [Progresar sin lesionarte](/blog/entrenamiento/progresar-sin-lesionarte) |
| Publicado | entrenamiento | [Qué hacer los días que no entrenas](/blog/entrenamiento/que-hacer-los-dias-que-no-entrenas) |
| Publicado | entrenamiento | [Dormir y fuerza](/blog/entrenamiento/dormir-y-fuerza-lo-basico) |
| Publicado | entrenamiento | [Agujetas o señal de parar](/blog/entrenamiento/agujetas-o-lesion) |
| Publicado | entrenamiento | [Sentadilla en casa: de la silla al aire](/blog/entrenamiento/sentadilla-en-casa-de-la-silla-al-aire) |
| Publicado | entrenamiento | [Flexiones para principiantes](/blog/entrenamiento/flexiones-para-principiantes-pared-mesa-suelo) |
| Publicado | entrenamiento | [Puente de glúteo](/blog/entrenamiento/puente-de-gluteo-tecnica-y-progresion) |
| Publicado | entrenamiento | [Plancha sin hundir la lumbar](/blog/entrenamiento/plancha-sin-hundir-la-lumbar) |
| Publicado | entrenamiento | [Zancada estática con silla](/blog/entrenamiento/zancada-estatica-en-casa-con-silla) |
| Publicado | entrenamiento | [Remo con mochila](/blog/entrenamiento/remo-con-toalla-o-mochila-en-casa) |

Backlog: [plan 500+500](./plan-catalogo-500-500.md). Siguiente oleada = 3 días gimnasio, poco material, compra de presupuesto.

Los cuatro del núcleo ya cruzan `related_routes` y llevan al menos un enlace contextual al otro vertical. Los siguientes artículos deben **engancharse a este cuadrado**, no empezar otro.

---

## 9. Publicar

1. Archivo en la carpeta de categoría, `published: true`.
2. Checklist del §6 (ida y vuelta de enlaces).
3. Merge a `main`. El workflow de Cloudflare sincroniza a D1.
4. Comprobar en producción la URL, el canonical, las FAQs visibles y que “artículos relacionados” muestre el puente al otro vertical.

Plantilla de PR: título del artículo, cluster (A/B/C…), slugs que ahora apuntan a él.
