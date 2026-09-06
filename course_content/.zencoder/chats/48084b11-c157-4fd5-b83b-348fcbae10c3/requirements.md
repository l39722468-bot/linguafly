# PRD - Sistema de Contenidos SEO (Topic Clusters)

## 1. Introducción
El objetivo es construir un sistema de contenidos basado en "Topic Clusters" para posicionar la web en las keywords altamente competitivas "aprender inglés" y "curso de inglés".

## 2. Objetivos de Negocio
- Captar tráfico orgánico de calidad (TOFU/MOFU/BOFU).
- Construir autoridad de dominio (DA/DR) mediante autoridad temática.
- Incrementar las conversiones a la plataforma de cursos.

## 3. Estructura del Clúster

### 3.1 Página Pilar (HUB)
- **URL**: `/aprender-ingles/`
- **Keyword Principal**: "aprender inglés"
- **Contenido Requerido**:
  - Introducción al aprendizaje del inglés.
  - Metodología de Focus English.
  - Enlaces directos a las "Rutas" (Niveles, Trabajo, Viajes).
  - Sección de comparativas.
  - FAQ estructurada.

### 3.2 Páginas de Ruta (Comerciales)
- **URLs**: 
  - `/curso-ingles-a1/`, `/curso-ingles-a2/`, `/curso-ingles-b1/`, `/curso-ingles-b2/`
  - `/ingles-para-viajar/`
  - `/ingles-para-trabajo/` (con sub-rutas como `/ingles-para-hosteleria/`, `/ingles-para-ingenieros/`)
- **Objetivo**: Atacar keywords transaccionales (MOFU/BOFU).
- **Contenido**: Detalles del curso, beneficios, temario y llamada a la acción (CTA).

### 3.3 Artículos Satélite (Informacionales)
- **Ubicación**: Sistema de Blog actual.
- **Estrategia**: Publicar 25-40 artículos atacando long-tails (ej: "cómo aprender inglés desde cero", "frases básicas para aeropuerto").
- **Interlinking**: Cada artículo debe enlazar obligatoriamente al HUB y a la Ruta comercial correspondiente.

## 4. Requisitos Técnicos

### 4.1 SEO On-Page
- **Dynamic Metadata**: Títulos y descripciones optimizadas por página.
- **Canonical Tags**: Asegurar que cada página apunte a su versión preferida.
- **Schema Markup**: 
  - `Course` para las páginas de ruta.
  - `FAQPage` para el HUB y artículos.
  - `BreadcrumbList` para navegación jerárquica.

### 4.2 Arquitectura de Navegación
- Las nuevas rutas deben estar integradas en el `sitemap.ts`.
- El HUB debe ser accesible desde el menú principal o footer para pasar autoridad.

## 5. Fases de Entrega (Estimado 12 semanas)
1. **Fase 1**: HUB + 4 Rutas iniciales + 2 Artículos Satélite.
2. **Fase 2**: 2 Rutas/semana + 2 Artículos/semana.
3. **Fase 3**: Interlinking masivo + Optimización de Core Web Vitals.

## 6. Métricas de Éxito
- Posicionamiento en Top 10 para long-tails en 3 meses.
- Incremento de impresiones para la keyword "aprender inglés" en Google Search Console.
