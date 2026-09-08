# Guía editorial: inteligencia artificial

La vertical `/inteligencia-artificial` es una **revista práctica de uso**: cómo pedir, comprobar y no pegar de más. No es un blog de AGI, ni un recetario de “10 hacks”, ni un manual de un proveedor.

Idiomas, alimentación y entrenamiento tienen su propia lógica. Esta guía cubre solo `/inteligencia-artificial`. El puente a esos verticales existe cuando el trabajo es el mismo (un prompt de lista de la compra, practicar conversación), no como relleno.

**Última actualización:** 2026-09-08

---

## 1. Qué publicamos (y qué no)

### Audiencia

Adulto hispanohablante que usa (o va a usar) un chatbot en el trabajo, el estudio o la casa. No es investigador de modelos ni influencer de prompts.

### Promesa

Criterio para una tarea concreta: el prompt, la comprobación y el límite. Unos 2.000 palabras sobre **una** intención de búsqueda.

### Tono

Directo. Segunda persona. Frases cortas. Pasos numerados. Cero jerga de keynote y cero metáforas que hay que descifrar.

Sí:

- “Pega el párrafo. Di el formato. Di lo que no quieres que invente.”
- “Abre el enlace. Si no carga, esa fuente no existe.”
- “Si identifica a una persona, no lo pegas.”

No (influencer):

- “Desbloquea el poder de la IA.”
- “El prompt que usa Silicon Valley.”
- “10 hacks que ChatGPT no quiere que sepas.”

No (literario / críptico):

- “El modelo no sueña; tú sí.”
- “La alucinación es un espejo.”
- Analogías que no se pueden ejecutar.

Si una frase suena ingeniosa y el lector no sabe qué hacer en el siguiente mensaje, se reescribe.

### Límites editoriales (no negociables)

- No diagnósticos, no planes clínicos, no dosis, no “esto es ansiedad”. Preparar la visita al médico sí; sustituirla no.
- No dictamen jurídico, fiscal ni de inversión. Preguntas para un profesional sí; “firma esto” no.
- No tutoriales de jailbreak, exploits, malware ni acceso no autorizado. Si el modelo se niega, se reformula una tarea lícita.
- No deepfakes ni clonar la voz o la cara de un tercero.
- No inventar papers, sentencias, reseñas ni testimonios.
- No mezclar con cursos de inglés ni con CTAs a `/aprender-ingles`.
- No canibalizar el archivo de inglés: `aprender-ingles-con-chatgpt` ya vive en `/blog/metodos/`. El cluster `idioma-ia` ataca **otra** SERP (practicar conversación, corregir TU texto, simulacro de speaking).
- No reescribir “qué es la IA” cuarenta veces. El pilar es uno; el resto son satélites con trabajo distinto.

---

## 2. Anatomía de un artículo

Markdown en `src/content/blog/inteligencia-artificial/`. El **slug es el del catálogo**. Al mergear a `main`, el sync lo sube a D1. Hace falta `published: true`.

### Frontmatter mínimo

```yaml
published: true
category: inteligencia-artificial
date: '2026-09-08'
author: linguafly-team
title: "Título concreto, sin clickbait"
description: >-
  140–160 caracteres. Promesa + resultado práctico. Es el meta description.
excerpt: >-
  1–2 frases para tarjetas.
readTime: 11 min
keywords:
  - intención principal (keyword cabeza del catálogo)
  - 5–7 long-tails del catálogo; no inventar otra cabeza
related_routes:
  - slug-hermano-de-ia
  - slug-de-otro-vertical   # cuando el trabajo lo pida
canonical: 'https://linguafly.app/blog/inteligencia-artificial/slug-del-archivo'
faqs:
  - question: Pregunta que la gente escribe en Google
    answer: Respuesta de 2–4 frases, accionable.
```

Notas:

- Un H1 = `title`. No pongas un segundo `# Título` en el markdown: la página ya pinta el H1.
- `related_routes` son slugs, no URLs. 3–5. Si el artículo menciona comida, entreno o idiomas de forma útil, **un slug de ese vertical**.
- 3–5 FAQs (FAQPage). Como las escribe la gente, no “¿Qué es un prompt?”.
- Keywords: 6–8. Una cabeza + long-tails. Como máximo **un** término compartido con un hermano. El catálogo ya sale con 7 únicas en todo el vertical: no las mezcles entre slugs al redactar.
- Description: 140–160 caracteres. El catálogo trae una lista para copiar y afinar.

### Cuerpo

1. Apertura: la tarea real (un PDF, un email tenso, un examen oral). Nada de historia de la computación.
2. 5–8 H2. Cada uno avanza **esta** intención. No un índice de diez artículos.
3. Una sección de errores o de “para aquí”.
4. Cierre corto. Puede apuntar al hermano si aún no se enlazó.

Longitud: **~2.000 palabras de cuerpo** (mínimo 2.000, techo ~2.400). Si para llegar al recuento explicas el artículo de al lado, recorta y enlaza.

Comprobar (cuando exista el recuento de esta vertical):

```bash
python3 scripts/count_habit_article_words.py
```

Hasta que el script liste `inteligencia-artificial`, cuenta a mano o amplía el script en la misma oleada en la que redactes.

### Enlaces en el cuerpo

- 2 a 4 enlaces contextuales.
- Al menos uno a otro artículo de IA del catálogo (el núcleo, si ya está publicado).
- Al otro vertical **solo si el texto ya lo está pidiendo**. Un artículo de Ollama no tiene que enlazar proteína.
- Formato: `[cómo escribir un prompt que sirva](/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva)`.
- No bloques de “Artículos relacionados” a mano.

### Imágenes

No son obligatorias en el primer ciclo. Si se añaden: diagrama o captura de **la tarea** (un prompt anotado, una tabla de comprobación), no un stock de robots. Archivos en `public/blog/inteligencia-artificial/<slug>/`. `alt` en español; si lleva dos puntos, cita el `alt` en YAML.

---

## 3. SEO

- Un slug = una SERP. Si dos títulos responderían a la misma consulta, es un solo artículo.
- Título de trabajo del catálogo: punto de partida. Se puede afinar al redactar **sin cambiar el slug**.
- Consulta principal al inicio del title o muy cerca. Casa: ~50–60 caracteres; por debajo de 50 vale si la consulta cabe clara.
- H2 con long-tail solo si suena a frase humana.
- Canonical: `https://linguafly.app/blog/inteligencia-artificial/{slug}`.
- ChatGPT vs Gemini vs Claude: solo cuando **el trabajo** cambia (Drive, PDF largo, el chat de siempre). No 20 comparativas genéricas.
- Herramientas con nombre de producto: un job primario. “Cómo usar ChatGPT” es el pilar de herramientas, no otros 15 clones.

### Tipos de intención (columna del catálogo)

| Tipo | Qué busca el lector | Cómo se escribe el título |
|---|---|---|
| `cómo hacer` | Pasos para una tarea | Cómo / un verbo de trabajo |
| `informacional` | Entender un límite o un concepto usable | Qué / por qué / cuándo no |
| `comparativa` | Elegir entre A y B para **un** trabajo | X o Y para… |
| `herramienta` | Una app o un modo concreto | Nombre del producto + el job |

---

## 4. Núcleo (oleada 0)

Cuatro pilares. Todo lo nuevo engancha aquí o a un satélite que ya enganche aquí.

| Papel | Slug | Keyword cabeza |
|---|---|---|
| Qué es (práctica) | `que-es-la-inteligencia-artificial-sin-ciencia-ficcion` | qué es la inteligencia artificial |
| Primera sesión | `como-usar-un-chatbot-de-ia-por-primera-vez` | cómo usar un chatbot de IA |
| Prompt | `como-escribir-un-prompt-que-sirva` | cómo escribir un prompt |
| Privacidad | `privacidad-al-usar-ia-que-no-pegar-nunca` | privacidad al usar inteligencia artificial |

No se publica un quinto “pilar qué es la IA”. Los satélites profundizan un job.

---

## 5. Interlinking

1. `related_routes`: 3–5 slugs.
2. Cuerpo: 2–4 anclas descriptivas.
3. Actualiza los ya vivos que deberían devolver el enlace.
4. Profundidad: un clic desde un pilar del núcleo hasta el satélite nuevo, o dos como máximo.

No enlazar a `/blog/temas`, `/fitness` ni a cursos `/curso-a1`.

Puentes naturales (cuando el texto los pide):

- Lista de la compra con ChatGPT → `/blog/alimentacion/lista-de-la-compra-semanal-sencilla`
- Practicar conversación → un artículo de `/blog/idiomas` o del archivo de métodos **distinto** de “aprender inglés con ChatGPT”
- Etiqueta nutricional → alimentación, no un plan dietético

---

## 6. Cómo se decide el siguiente artículo

1. ¿Cierra el núcleo o el anillo de la oleada en curso?
2. ¿La intención está en el catálogo y **libre**?
3. ¿Cabe en ~2.000 palabras sin convertir el H2 en otro slug?
4. Si dos ideas pelean, gana la que ya se menciona en textos publicados y aún no tiene URL.

Inventar un tema nuevo: o sustituye a uno **pendiente** del mismo cluster, o se rechaza. Luego `python3 scripts/build_ia_catalog.py`.
