# Plan de corrección de error de sintaxis

## Pasos del flujo de trabajo

### [x] Paso: Análisis del error
1. Identificar la ubicación del error de sintaxis en `src/lib/c2-units/unit-9.ts`.
2. Determinar la causa del error (fragmentos de JSON mal pegados).

### [x] Paso: Corrección del error
1. Limpiar los campos `sentence`, `question` y `correctAnswer` en el objeto con id `c2-u9-b5-q5`.
2. Verificar que el objeto siga el formato de los ejercicios adyacentes.

### [x] Paso: Verificación
1. Ejecutar lint para asegurar que no hay más errores de sintaxis.
2. Confirmar que el archivo se compila correctamente.
3. [x] Importar las 60 unidades en `src/lib/c2-units/index.ts`.
4. [x] Verificar la integridad estructural de las 60 unidades.
