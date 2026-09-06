# Requisitos: Enlace de PDF en Artículo de Blog

## Descripción de la Funcionalidad
Permitir a los usuarios descargar una guía en PDF sobre "Reported Speech" directamente desde un artículo específico del blog.

## Casos de Uso
1. El usuario navega al artículo `https://www.focus-on-english.com/blog/metodos/reported-speech-ejercicios-pdf`.
2. El usuario hace clic en un enlace de descarga dentro del artículo.
3. El navegador descarga o abre el archivo PDF correspondiente.

## Especificaciones Detalladas
1. **Archivo PDF**:
   - Nombre original: `Guía de Reported Speech y Ejercicios B1-C2`.
   - Ubicación: Se debe confirmar la ubicación actual en el repositorio o añadirlo a `public/docs/`.
   - Se recomienda un nombre de archivo optimizado para la web: `guia-reported-speech-ejercicios-b1-c2.pdf`.
2. **Artículo de Blog**:
   - Archivo: `src/content/blog/metodos/reported-speech-ejercicios-pdf.md`.
   - El contenido debe reflejar que la guía cubre niveles **B1 a C2**, según la última indicación del usuario.
   - Se deben actualizar los hipervínculos de descarga actuales para que apunten a la URL de Supabase y mencionen el rango B1-C2.
3. **Almacenamiento**:
   - El PDF se almacenará localmente en el repositorio para servirlo de forma estática.

## Aspectos por Aclarar
- Confirmar la ubicación exacta del archivo PDF mencionado ("Guía de Reported Speech y Ejercicios B1-C2"), ya que no se ha encontrado mediante búsqueda automática.
- Si el archivo no está en el repositorio, se solicitará al usuario que lo suba o indique la ruta.
