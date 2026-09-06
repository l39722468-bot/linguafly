# Rediseño del Curso Inglés A1 - Plan de Implementación

## Pasos Completados
- [x] **Requerimientos**: Creación de `requirements.md`.
- [x] **Especificación Técnica**: Creación de `spec.md`.

## Pasos de Implementación

### 1. Soporte de UI para Nuevos Ejercicios
- [x] **Añadir Word Search y Crossword a PremiumSession.tsx**: 
  - [x] Importar `WordSearchExercise` y `CrosswordExercise`.
  - [x] Añadir `case 'word-search'` y `case 'crossword'` en `renderInteraction`.
  - [x] Manejar la finalización del ejercicio para avanzar al siguiente.
  - [x] **Verificación**: Verificar visualmente con un JSON de prueba.

### 2. Infraestructura de Generación
- [x] **Crear scripts/rebuild-a1-course.py**:
  - [x] Definir 30 temas profesionales A1.
  - [x] Implementar lógica para generar 50 ejercicios por tema.
  - [x] Integrar generadores para: `multiple_choice`, `matching`, `transformation`, `true_false`, `reorder_words`, `word-search`, `crossword`.
  - [x] **Verificación**: Ejecutar script para una unidad y validar formato JSON.

### 3. Ejecución y Validación
- [x] **Generar las 30 unidades**:
  - [x] Ejecutar el script completo.
  - [x] Guardar en `src/content/cursos/ingles-a1/`.
  - [x] **Verificación**: `npm run lint` (intentado, pre-existentes errores) y validación manual de una muestra de unidades.
- [x] **Validación de Integridad**:
  - [x] Asegurar que todas las unidades tienen 50 ejercicios.
  - [x] Asegurar que todos los tipos de ejercicios funcionan en la UI.
