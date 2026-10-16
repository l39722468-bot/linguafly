# Medición de visibilidad comercial en IA — LinguaFly

**Versión inicial:** 16 de octubre de 2026  
**Mercado inicial:** España (es-ES)  
**Estado:** protocolo piloto; no contiene resultados observados.

## Objetivo

Medir de forma repetible qué marcas aparecen y cuáles son recomendadas en respuestas de IA ante consultas con intención comercial, qué URLs se citan y cuándo se cita contenido de LinguaFly. Este protocolo no mide por sí solo ventas ni garantiza que una mejora editorial cause más menciones.

## Archivos de trabajo

- `data/geo-aeo/commercial-queries.es-ES.json`: conjunto versionado de 20 consultas iniciales, prioridades, sistemas y esquema de registro.
- `scripts/audit-commercial-editorial.mjs`: inventario heurístico del catálogo editorial; genera CSV y JSON para revisión humana.
- Los resultados de cada ejecución deben almacenarse aparte del conjunto de consultas. No sobrescribir respuestas históricas.

## Protocolo de línea base

1. Ejecutar cada consulta literal en cada sistema seleccionado, en una conversación nueva y sin mencionar LinguaFly.
2. Hacer dos ejecuciones iniciales por consulta y sistema. Registrar fecha/hora, sistema y modelo/modo si se muestra.
3. Guardar la respuesta completa y todas las URLs citadas. No registrar una mención de marca como si fuera una cita.
4. Separar explícitamente: marca mencionada, marca recomendada, fuente citada y cita a LinguaFly.
5. Repetir la misma batería aproximadamente cada 30 días. Si cambia el prompt o el sistema, registrar una nueva versión del experimento en vez de mezclarlo sin nota.
6. Verificar manualmente precios, funciones y condiciones comerciales antes de convertir resultados en contenido editorial.
7. Publicar resultados agregados solo con el tamaño de muestra, fecha, sistemas y limitaciones visibles.

## Métricas

- **Tasa de mención de marca:** ejecuciones en las que aparece la marca / ejecuciones válidas.
- **Tasa de recomendación:** ejecuciones en las que se recomienda explícitamente la marca / ejecuciones válidas.
- **Tasa de cita de LinguaFly:** ejecuciones con al menos una URL de LinguaFly citada / ejecuciones válidas.
- **Fuentes citadas:** recuento de URLs de origen distintas y frecuencia de cita.
- **Estabilidad:** proporción de repeticiones en las que se observa el mismo resultado de interés.
- **Precisión factual:** incidencias detectadas en precios, características y condiciones, verificadas contra fuentes primarias.

No crear un único “ranking de visibilidad IA” sin explicar ponderaciones, muestra y margen de variación. Las respuestas pueden variar por modelo, modo, personalización, fecha y formulación.

## Reglas editoriales y comerciales

- No afirmar que una marca es “la más recomendada por la IA” sin una muestra adecuada y metodología publicada.
- No prometer a patrocinadores citas garantizadas en ChatGPT, Gemini, Perplexity ni otros sistemas.
- Mantener independencia editorial: el pago no debe determinar conclusiones presentadas como análisis objetivo.
- Identificar claramente contenido patrocinado y aplicar `rel="sponsored"` a enlaces pagados cuando corresponda.
- Preferir fuentes primarias para precios, funciones y términos; indicar fecha de comprobación.
- Evitar crear artículos duplicados solo para insertar marcas. Actualizar la página que mejor resuelva la intención existente cuando sea posible.

## Uso del inventario editorial

El inventario es una clasificación automática basada en rutas, títulos y palabras clave. Sirve para ordenar una revisión, no para asignar definitivamente intención de búsqueda. Confirmar manualmente intención, calidad, canibalización, conversiones y oportunidad antes de editar o eliminar páginas.

## Primera priorización

1. Apps y comparativas de apps.
2. Herramientas de IA para practicar conversación y pronunciación.
3. Academias/cursos y preparación de exámenes.
4. Soluciones para empresas, tras validar demanda y oferta comercial.

## Decisión tras el primer mes

Priorizar actualizaciones según: consultas donde aparecen competidores pero no LinguaFly; páginas relevantes ya existentes; errores de información detectados; potencial de conversión; y capacidad de aportar datos originales. No interpretar correlación entre publicación y cita como causalidad demostrada.


## Generar un informe a partir de resultados registrados

Después de guardar las ejecuciones en un CSV que conserve las columnas de `data/geo-aeo/commercial-results-template.csv`, generar un resumen local:

```bash
node scripts/report-commercial-visibility.mjs ruta/a/resultados.csv --brand=LinguaFly
```

Para obtener JSON reutilizable en hojas de cálculo o análisis posteriores:

```bash
node scripts/report-commercial-visibility.mjs ruta/a/resultados.csv --brand=LinguaFly --json
```

También está disponible como `npm run report:commercial-visibility -- ruta/a/resultados.csv --brand=LinguaFly`.

El informe calcula tasas sobre las filas que contienen sistema y `query_id`; separa los resultados por sistema y cuenta URLs citadas distintas. El campo `brands_mentioned` y `brands_recommended` acepta nombres separados por punto y coma o barra vertical. `linguafly_cited` debe registrarse como `yes/no`, `sí/no`, `true/false` o `1/0`; las URLs de `linguafly_urls_cited` también se comprueban. Revisa siempre el CSV original y las evidencias: el script no consulta asistentes, no verifica las respuestas y no convierte una muestra pequeña en una conclusión de mercado.

Si no hay filas observadas, el script indica que no existe línea base; no inventa ni simula resultados.
