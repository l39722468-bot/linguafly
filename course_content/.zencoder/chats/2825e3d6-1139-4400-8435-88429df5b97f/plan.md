# Plan de Auditoría y Arreglo de Ejercicios de Reading

## Fase 1: Análisis y Requerimientos
- [x] Analizar el problema: Los ejercicios de "reading" no muestran el texto al que hacen referencia.
- [x] Realizar una auditoría inicial para identificar ejercicios afectados.
- [x] Entender el mecanismo de renderizado en `PremiumSession.tsx`.
- [x] Crear documento de requerimientos y especificación técnica (simplificado).

## Fase 2: Arreglo del Ejercicio de la Unidad 39
- [x] Generar un texto coherente para la historia "The Power Cut" en la Unidad 39.
- [x] Modificar `src/content/cursos/ingles-a1/unit39.json` para incluir el texto.
- [x] Verificar visualmente el arreglo usando el `browser`.

## Fase 3: Auditoría y Arreglo Global
- [x] Ejecutar script de auditoría final para listar TODOS los ejercicios afectados.
- [x] Generar/Recuperar los textos faltantes para cada ejercicio identificado.
- [x] Actualizar todos los archivos JSON correspondientes.
- [x] Verificar una muestra de los arreglos.

## Fase 4: Verificación y Cierre
- [x] Obtener aprobación para plan de pruebas E2E.
- [x] Escribir y ejecutar prueba E2E para asegurar que los textos de reading se muestran.
- [x] Ejecutar lint y validación de esquemas.
- [x] Commitear y pushear cambios.

## Fase 6: Optimización de UI y Contexto
- [x] Habilitar soporte de `image_url` para tipos de ejercicio `fill_blanks`, `short_writing` y `true_false`.
- [x] Reducir espaciado (padding, margins) y tamaños de fuente en `PremiumSession.tsx` para mejorar la visibilidad en pantallas pequeñas.
- [x] Estandarizar layout: Prompt/Pregunta siempre arriba en caja índigo.
- [x] Eliminar sonidos de "correcto" e "incorrecto" en la sesión.
- [x] Eliminar ejercicio específico de la unidad 48 (`A1_U48_B48_1_I3`).
- [x] Arreglar error lógico en Unidad 33 (Anna vs Mark).
- [x] Eliminar "spoiler" de respuesta en etiqueta de Unidad 30.
- [x] Verificar que los cambios se visualizan correctamente en el navegador.
- [x] Commitear y pushear cambios.
