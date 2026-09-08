# Plan de catálogo: 500 artículos de inteligencia artificial

Esto es **backlog editorial**, no un encargo de redactar 500 textos. Los artículos se escriben por oleadas, con la [guía editorial](./guia-editorial-inteligencia-artificial.md). Cada fila del catálogo es **una intención de búsqueda distinta**, con título, keyword cabeza, long-tails y meta description (140–160 caracteres).

**Catálogo:** [Inteligencia artificial (500)](./catalogo-inteligencia-artificial-500.md)

Fuente de verdad: `scripts/build_ia_catalog.py` + `scripts/ia_catalog_rows.py`. No editar el markdown a mano.

Hay también un JSON generado (`docs/catalogo-inteligencia-artificial-500.json`) para copiar frontmatter. Misma regla: se regenera, no se parchea.

Estado: **88 publicados** (núcleo + oleadas 1–7), **412 pendientes**.

URL pública futura: `https://linguafly.app/blog/inteligencia-artificial/{slug}`  
Hub: `/inteligencia-artificial`

---

## Unicidad (regla dura)

Un tema no se repite si **respondería a la misma SERP**.

No vale:

- “Qué es la IA” y “IA explicada para principiantes” (es el pilar).
- Veinte packs de “prompts para ChatGPT”.
- ChatGPT vs Gemini sin un **trabajo** distinto (Drive, PDF largo, el chat diario).
- “Aprender inglés con ChatGPT” (ya está en `/blog/metodos/aprender-ingles-con-chatgpt`).

Sí vale:

- Prompt para resumir ≠ prompt para acta ≠ prompt para reclamación.
- Privacidad pilar ≠ RGPD de autónomos ≠ no pegar el DNI.
- Practicar conversación con un chatbot ≠ las guías de idiomas del archivo.

El generador falla si chocan slug, título, intención, intención slugificada, conjunto de tokens de la intención, o cualquier string de keyword (cabeza o long-tail) en todo el catálogo.

Antes de escribir: busca el **slug** y la **keyword cabeza**. Si ya está, se amplía o se enlaza.

---

## Oleadas (orden de redacción)

No se recorre el catálogo del 1 al 500. Se cierra un anillo alrededor del núcleo.

| Oleada | Qué se escribe | Por qué |
|---|---|---|
| 0 | 4 pilares (`nucleo`) — **redactados** | Definición usable, primera sesión, prompt, qué no pegar |
| 1 | `empezar` (10) + 2 satélites de `prompts` — **redactados** | Que el lector pueda usar el chat al día siguiente |
| 2 | `privacidad` (6) + `limites` (6) — **redactados** | Sin esto, el resto es temerario |
| 3 | `oficina` (6) + `chat-diario` (6) — **redactados** | Trabajo y casa: el volumen de búsqueda útil |
| 4 | `herramientas` (12) — **redactados** | Sin otro “qué es ChatGPT” |
| 5 | `escritura` (6) + `estudio` (6) — **redactados** | Entregables y exámenes, con ética |
| 6 | `codigo` (6) + `investigacion` (6) — **redactados** | Oficio técnico y fuentes |
| 7 | `imagen` (6) + `audio` (6) — **redactados** | Multimodal con derechos |
| 8 | `negocio` + `automatizar` + `local` | Equipos pequeños y modelos en casa |
| 9 | `docentes` + `idioma-ia` + `regulado` | Aula, práctica de idioma (SERP propia) y límites profesionales |
| 10 | `hogar` + `etica` + el resto de cada cluster | Profundidad, no otro blog |

Una oleada típica: **6–12 artículos**, ida y vuelta de `related_routes`, merge, D1, siguiente.

---

## Cómo usar cada fila

Campos:

- **n** — número estable (no es prioridad).
- **estado** — `publicado` o `pendiente`.
- **cluster** — cajón editorial.
- **slug** — nombre de archivo futuro. No se cambia si se llega a publicar.
- **título** — punto de partida SEO; se afina al redactar.
- **tipo de intención** — `cómo hacer`, `informacional`, `comparativa`, `herramienta`.
- **keyword cabeza** — consulta que debe ganar **ese** artículo.
- **long-tails** — 6 consultas hermanas, únicas en el catálogo.
- **descripción meta** — 140–160 caracteres.

Al redactar: anatomía y SEO de la guía. **~2.000 palabras de cuerpo**. Slug del catálogo = filename.

---

## Presupuesto por cluster

Suma **500**. Si se inventa un tema nuevo, o sustituye a uno pendiente del mismo cajón, o se rechaza. Luego se regenera el catálogo.

| Cluster | n | Notas |
|---|---|---|
| `nucleo` | 4 | Pilares. No un quinto “qué es la IA” |
| `empezar` | 28 | Cuenta, historial, modelo, 7 días. No otra definición |
| `prompts` | 40 | Un job por artículo, no packs |
| `chat-diario` | 32 | Tareas de la semana; el ángulo es el chatbot |
| `herramientas` | 24 | Un producto, un trabajo principal |
| `oficina` | 36 | Entregables laborales |
| `codigo` | 28 | Explicar, testear, no pegar secretos. Nada ofensivo |
| `estudio` | 28 | Examen, fichas, TFG; el modelo no entrega el trabajo |
| `escritura` | 28 | Editar, no ghostwriting opaco |
| `imagen` | 24 | Prompt, derechos, texto en la imagen |
| `audio` | 16 | Transcribir; no clonar a terceros |
| `investigacion` | 20 | Fuentes reales; nada de papers inventados |
| `privacidad` | 24 | Satélites del pilar de no pegar |
| `limites` | 24 | Alucinación, sesgo, “la IA dijo que sí” |
| `negocio` | 24 | Pyme y freelance; humano en el envío |
| `docentes` | 16 | Diseñar y política de aula, no policía de detectores |
| `regulado` | 16 | Salud, legal, dinero: preguntas, no consejo |
| `automatizar` | 20 | Un flujo corto; cuándo no automatizar |
| `local` | 16 | Ollama y similares; privacidad vs calidad |
| `idioma-ia` | 20 | Práctica con chatbot; **no** pisa `/blog/metodos/aprender-ingles-con-chatgpt` |
| `hogar` | 20 | Nevera, mudanza, wifi de usuario. Sin recetas de ataque |
| `etica` | 12 | Citar, deepfake, responsabilidad del error |

---

## Relación con el resto de la revista

- Alimentación y entrenamiento: puente solo si el job es el mismo (compra, etiqueta, plan del día). No duplicar `lista-de-la-compra-semanal-sencilla`.
- Idiomas / archivo de inglés: `idioma-ia` es el **uso del chatbot** (roleplay, corrección de TU frase). Las plantillas de email en inglés y “aprender inglés con ChatGPT” se quedan donde están.
- Fitness y `/blog/temas`: no se enlazan.

---

## Regenerar

```bash
python3 scripts/build_ia_catalog.py
```

Tiene que imprimir `inteligencia-artificial=500` y salir 0. Si hay colisión, no se publica el slug nuevo: se cambia el script y se vuelve a generar.
