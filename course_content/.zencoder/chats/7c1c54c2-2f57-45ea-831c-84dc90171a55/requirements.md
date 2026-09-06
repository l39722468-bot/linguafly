# PRD: Macro-Strategy SEO para Authority en Reported Speech & Reporting Verbs

## Objetivo
Establecer una autoridad de dominio (DA) líder para búsquedas relacionadas con "Reported Speech" y "Reporting Verbs", enfocándose en estudiantes de niveles avanzados (Cambridge B2, C1, C2) y proporcionando recursos de alto valor (PDFs, ejercicios, guías teóricas).

## Audiencia Objetivo
- **Estudiantes de Exámenes Oficiales**: Candidatos a B2 First, C1 Advanced y C2 Proficiency.
- **Buscadores de Recursos Prácticos**: Usuarios que buscan "ejercicios pdf" y "ejemplos".

## Estrategia de Contenido (Topic Cluster)

### 1. Hub Page (Pilar)
- **Título**: Guía Maestra de Reported Speech y Reporting Verbs: De B2 a C2.
- **Contenido**: Visión general, importancia en exámenes, resumen de reglas y enlace a todos los spokes.
- **Ruta**: `/blog/seo/guia-maestra-reported-speech`

### 2. Spoke Pages (Satélites)
- **Spoke 1: Ejercicios y PDFs**
    - **Enfoque**: Intención de búsqueda de "descarga" y "práctica".
    - **Keywords**: `reporting verbs exercises pdf`, `reported speech c1 exercises pdf`, `ejercicios reported speech pdf`.
    - **Ruta**: `/blog/seo/reported-speech-ejercicios-pdf`
- **Spoke 2: Cambridge Exams focus (Rephrasing)**
    - **Enfoque**: Transformaciones de frases (Key Word Transformation).
    - **Keywords**: `report c1 examples pdf`, `reported speech cambridge`, `reported speech rephrasing`.
    - **Ruta**: `/blog/seo/reported-speech-cambridge-exams`
- **Spoke 3: Passive Reporting Verbs**
    - **Enfoque**: Gramática avanzada (It is said that / He is said to).
    - **Keywords**: `passive reporting verbs`, `passive of reporting verbs`, `reporting verbs passive voice`.
    - **Ruta**: `/blog/seo/passive-reporting-verbs-guia-avanzada`
- **Spoke 4: Reporting Verbs Patterns**
    - **Enfoque**: Listado de verbos y sus estructuras (suggest + -ing, recommend that, etc.).
    - **Keywords**: `reporting verbs list pdf`, `reporting verb patterns`, `reporting verbs c1`.
    - **Ruta**: `/blog/seo/reporting-verbs-patterns-list`
- **Spoke 5: Questions, Commands & Requests**
    - **Enfoque**: Estructuras específicas para preguntas y órdenes.
    - **Keywords**: `reported speech questions exercises pdf`, `reported speech commands exercises pdf`.
    - **Ruta**: `/blog/seo/reported-speech-questions-commands`

## Integración Técnica
- **Actualización de `seo-keyword-categorization.json`**: Incluir las nuevas keywords en la categoría "Gramática Avanzada" o una nueva categoría "Reported Speech".
- **Automatización**: Script para generar los archivos Markdown base con la estructura de frontmatter correcta.
- **Enlazado Interno**: Todos los spokes deben enlazar al Hub y el Hub a todos los spokes.

## Métricas de Éxito
- Indexación de las 5 rutas nuevas.
- Cobertura del 100% de las keywords prioritarias en el script `analyze-keyword-authority.py`.
