---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Subir un PDF a un chatbot: qué hacer y qué no"
description: >-
  Subir un PDF a ChatGPT: qué pedir, qué recortar antes, los límites de
  archivos y qué documentos no deberías cargar nunca a un chatbot de IA.
readTime: 11 min
keywords:
  - subir pdf a chatgpt
  - analizar un pdf con ia
  - chatgpt lee documentos
  - privacidad al subir pdf a ia
  - resumir pdf con inteligencia artificial
  - límites de archivos en chatbots
  - gemini subir pdf drive
excerpt: >-
  Recorta y anonimiza antes. Un manual público no es una nómina. Pide
  secciones y “no inventes”; el archivo viaja igual que un texto pegado.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/subir-un-pdf-a-un-chatbot-que-hacer-y-que-no'
related_routes:
  - privacidad-al-usar-ia-que-no-pegar-nunca
  - como-comprobar-si-una-respuesta-de-ia-es-fiable
  - como-escribir-un-prompt-que-sirva
  - como-usar-un-chatbot-de-ia-por-primera-vez
faqs:
  - question: ¿Puedo subir un PDF a ChatGPT para que me lo resuma?
    answer: "Sí, si el archivo no lleva datos que no pegarías en un post y si cabe en el límite del producto. Recorta páginas de más, anonimiza nombres y pide un resumen por secciones sin inventar lo que no esté. Luego contrastas el resumen con el PDF abierto."
  - question: ¿Qué documentos no debo cargar nunca al chatbot?
    answer: "Nóminas, contratos de clientes, historiales clínicos, DNI, evaluaciones de personas, secretos de empresa y cualquier PDF de un menor. Un manual de electrodoméstico o un boletín público no es lo mismo. Si dudas, no subas: extrae un fragmento ya limpio."
  - question: ¿ChatGPT lee documentos enteros o solo un trozo?
    answer: "Lee lo que el producto le deja leer: hay tope de tamaño, de páginas y de tokens. Un PDF de 200 páginas puede recortarse, ignorar anexos o mezclar. No asumas que ‘lo ha visto todo’. Pide secciones. Comprueba. Si el archivo es enorme, parte."
  - question: ¿Es más privado Gemini si el PDF está en Drive?
    answer: "No por magia. Conectar Drive es otra puerta de entrada al mismo tipo de problema: el modelo ve el archivo en esa sesión. En el trabajo, la diferencia es la cuenta y el contrato de la empresa, no el icono de carpeta. La regla de qué no subir no cambia."
  - question: ¿Cómo pedir un resumen de un PDF para que no invente?
    answer: "Una sección o un rango de páginas, formato (viñetas o tabla), y la línea: no inventes nombres, cifras ni plazos; si no está, escribe NO ESTÁ. No pidas ‘resúmeme el mundo de este archivo’ en un solo mensaje."
---

**Subir un PDF a ChatGPT** (o a Gemini, o al Copilot que tengas) no es “darle el archivo a un lector mudo”. Es enviar ese documento a un sistema de otra empresa y pedirle un trabajo sobre el texto. **ChatGPT lee documentos** en el sentido de extraer texto y predecir un resumen. No certifica. No se queda “solo en tu escritorio” porque el clip esté en tu ventana.

Esta página es qué hacer **antes** de adjuntar, **qué pedir** cuando está arriba, y **qué límites** hay. La lista de lo que no se pega —DNI, salud, menores, secretos de un cliente— no se relaja porque vaya en PDF. Está en [privacidad al usar IA: qué no pegar nunca](/blog/inteligencia-artificial/privacidad-al-usar-ia-que-no-pegar-nunca). Aquí se aplica a archivos. El original a contrastar es el PDF, no el chat.

## Qué recortar y anonimizar antes de subir

**Privacidad al subir PDF a IA** se juega *antes* del clip, no en el prompt de “sé discreto”. El modelo no anonimiza por ti. Si el DNI está en la cabecera, ha visto el DNI.

Haz esto en tu ordenador, con el PDF original cerrado después de exportar una copia de trabajo:

1. **Copia de trabajo.** No subas el archivo “bueno” de la carpeta del cliente. Duplica. Trabaja sobre el duplicado.
2. **Recorta páginas.** ¿Hace falta el anexo de firmas, la portada con domicilio, el historial de versiones? Extrae el rango (páginas 3-8, el capítulo 2). Menos páginas: menos datos, menos tope, menos ruido.
3. **Anonimiza.** Persona A / Persona B. DNI, NIE, expediente, IBAN, teléfono, dirección, menor: fuera. Si no sabes editar el PDF, copia el fragmento a texto, limpia, y sube *eso* o pégalo.
4. **Nombre del fichero.** `Despido_Martinez_confidencial.pdf` también viaja. Usa `manual_paginas_3_8.pdf`.
5. **Imágenes.** Un escáner es una foto: sello, firma, CIF. Si no hace falta, pasa a texto lo que necesites.

Prueba de los treinta segundos, la misma que en el pilar de privacidad: ¿haría falta este dato para la tarea? ¿Identifica a alguien? ¿Lo pondría en un comentario público? Si una falla, recorta o paras.

No pidas al chatbot “quita los datos personales y luego resume”. Eso es enviar primero y limpiar después. El envío ya ocurrió.

Si el recorte te deja un texto que ya no se entiende, la tarea no era para un chatbot de consumo. O resumes tú el trozo sensible a mano (“hay un plazo de 10 días y un importe N”) y pegas solo eso, o no usas el chat para ese archivo.

## Qué PDF sí y qué PDF no

**Analizar un PDF con IA** solo tiene sentido si el archivo es el tipo de documento que aceptarías sacar de tu máquina.

**Sí, con recorte y cabeza:**

- Manual de electrodoméstico, instrucciones, guía pública de un organismo.
- Temario o artículo tuyo o público, para un esquema o preguntas de comprensión. El examen lo haces tú.
- Reglamento o boletín ya público. Sigue recortando nombres de vecinos.
- Un borrador largo *tuyo*, para esquema, no para que invente plazos.

**No, nunca, en un chatbot de consumo:**

- **Nóminas, IRPF, vida laboral, cuentas.**
- **Contratos** de trabajo, de alquiler, de un cliente, de un proveedor con precios no públicos. El que *vas a firmar* se lee; no se sube “para que me diga si está bien”. Aquí no hay dictamen.
- **Salud.** Informes, analíticas, partes. Cero.
- **Identidad.** DNI, NIE, pasaporte, “para extraer los campos”.
- **Personas.** Evaluaciones de RR. HH., listados de alumnos, pacientes, clientes.
- **Menores.** Colegio, club, juzgado, chat de padres pasado a PDF.
- **Secretos de terceros.** Código, bases, el expediente que no es tuyo para difundirlo.

La pareja que debes memorizar: **manual público ≠ contrato o nómina.** El primero, si cabe, se puede resumir. El segundo no se “anonimiza un poco” y se cuela. Un contrato con los nombres en negro y los CIF a la vista sigue siendo un contrato. Un salario con el nombre tapado y el NIF al pie sigue siendo una nómina.

Si trabajas con **cuenta de empresa** contratada para eso, pregunta a quien toque qué recinto sí existe. No es tu ChatGPT personal. Mezclar expedientes de clientes en el chat del Gmail “porque es más rápido” es el error clásico. Esta revista te dice que pares.

Si el archivo no se sube, aún puedes pegar un extracto ya limpio: “Hay un plazo de 10 días y tres obligaciones genéricas; lista de preguntas para la reunión.” Sin PDF. Sin nombres.

## Cómo pedir un resumen que no invente

**Resumir PDF con inteligencia artificial** falla más por la orden que por el clip. “Léete esto y ayúdame” produce un ensayo con un plazo de más. La orden se parece a la de [cómo escribir un prompt que sirva](/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva): tarea, contexto, formato, límite.

Plantilla mínima, sustituye el rango:

```
Tarea: resume solo las páginas 3 a 8 (o la sección “Instalación”).
Formato: cinco a ocho viñetas. Sin introducción. Sin cierre motivacional.
Límite: no inventes nombres, cifras, plazos ni piezas que no estén en esas páginas.
Si algo no aparece, escribe NO ESTÁ. No completes con conocimiento general.
```

Variantes que funcionan:

- “Tabla de tres columnas: paso, material que pide el texto, aviso de seguridad si lo hay. Celdas vacías si no está.”
- “Extrae fechas y nombres *tal como aparecen*. Si no hay fecha, celda vacía.”
- “Explícame el apartado 2.1 en seis líneas, para alguien que no es del oficio. No simplifiques hasta cambiar el sentido.”
- “Hazme cinco preguntas de comprensión sobre *este* capítulo. Respuestas al final, aparte.”

Qué no pidas en el primer mensaje: “Resúmeme las 180 páginas” (parte en secciones; un mensaje por bloque); “dime qué implica legalmente” (pide las obligaciones que el *texto* menciona; el dictamen no); “compara con la ley X” si no has bajado la ley tú (invitará a una cita: [cómo comprobar si una respuesta de IA es fiable](/blog/inteligencia-artificial/como-comprobar-si-una-respuesta-de-ia-es-fiable)); tres tareas a la vez.

Después de la primera salida: PDF en otra ventana, busca cada cifra y cada nombre; si hay invento, “El punto 3 no está. Quítalo. No sustituyas.”; copia lo validado fuera. El chat no es tu archivo.

**ChatGPT lee documentos** peor si el PDF es un escáner borroso o una tabla partida. “Hay una tabla en la página 5. Transcríbela. Sin inventar filas.” Si no puede, transcribes tú. Al final de cada mensaje: **no uses datos que no estén en el archivo.** El resto de internet es de donde sale el anexo fantasma.

**Ejemplo trabajado.** Tienes el manual PDF de la lavadora (120 páginas, bajado de la web del fabricante). Necesitas el capítulo de “Averías frecuentes”, páginas 41-48.

1. Exportas esas ocho páginas a un PDF nuevo. Lo llamas `lavadora_averias_41_48.pdf`. No subes la portada con el número de serie ni la factura escaneada que iba detrás en la carpeta.
2. Adjuntas. Prompt: “Resume las páginas de este archivo en una tabla: síntoma, qué dice el texto que hagas, cuándo llama a servicio técnico. Celdas vacías si no está. No inventes códigos de error.”
3. El chat te devuelve seis filas. Una incluye el código E24 y “cerrar el grifo 20 minutos”. Abres el PDF, buscas E24. No está. En el siguiente mensaje: “E24 no está. Quítalo. No sustituyas por otro código.”
4. Las otras cinco filas sí coinciden. Las copias a una nota tuya. Cierras el chat. El manual completo se queda en tu disco.

Eso es **analizar un PDF con IA** bien. El mismo gesto con la nómina del mes, aunque recortes el NIF, no. El recorte no convierte un documento prohibido en un manual.

## Límites de archivos en chatbots

**Límites de archivos en chatbots** cambian de trimestre y de plan (gratis o de pago). No memorices un megabyte de un recorte de blog de 2024. Mira la ayuda del producto el día que subas. Lo que no cambia es el tipo de tope:

1. **Peso.** 10, 20, 50 MB, según el producto y el plan. Un escáner a 600 dpi de un contrato de 40 páginas se pasa. Comprime, baja resolución, o recorta páginas. Si no sube, no es un fallo tuyo de “no saber de IA”: es el tope.
2. **Número de archivos por mensaje o por chat.** A veces uno. A veces varios. No subas la carpeta entera “por si acaso”. Uno. El que toca.
3. **Páginas o tokens de texto extraído.** El clip acepta el PDF y el modelo no “ve” el final. Los anexos se caen. Por eso partes. Si pides algo de la página 90 en un archivo de 100 y el resumen solo habla del prólogo, el recorte interno ha ganado. Parte el PDF.
4. **Tipo.** PDF, a veces imágenes, a veces Word. Un PDF protegido con contraseña puede fallar. Un PDF que es solo imágenes sin OCR, también. Un ZIP, casi nunca. No fuerces formatos raros.
5. **Tiempo de sesión y caducidad.** El archivo está para *ese* chat, no para siempre en tu disco. No uses el chatbot como Drive. Si mañana necesitas el resumen, está en *tu* documento.

Qué haces con el tope: extrae el capítulo (15 páginas, no 120); si el producto dice que ha leído menos de las que hay, recorta; el plan de pago no lava una nómina. Si no cabe, pega un fragmento ya anonimizado: ves exactamente qué viaja.

Errores de límite que parecen “la IA es tonta”: resume solo la portada (el resto es imagen); inventa el capítulo 4 porque no lo ha extraído; mezcla dos PDFs. Un archivo, una tarea, un rango. “Proyectos” y carpetas persistentes, el primer mes, fuera.

## Gemini, Drive y la diferencia de trabajo (no de magia)

**Gemini subir PDF Drive** aparece en las búsquedas porque Google une el chat a la carpeta. ChatGPT y otros productos tienen sus propios conectores, según el mes y el plan. Esta sección no es una guía de clics de un menú que se mueve. Es la diferencia de *trabajo*.

En una cuenta personal, conectar Drive (o Dropbox) significa: el modelo puede leer *ese* archivo en *esa* sesión. No es más privado porque “ya estuviera en Google”. Ahora entra también en el recinto del chatbot. Nómina y contrato no se relajan. El interruptor de entrenamiento, si existe, se mira igual. Borrar el chat no es garantía de borrado: trátalo como un envío.

En el **trabajo**, la diferencia no es el icono. Es si hay **cuenta de organización** con contrato y política; si el Drive y el chat son los que la empresa ha habilitado; si alguien te ha dicho que ese flujo vale para *ese* documento. Si las tres son no, no pruebes con el contrato del cliente porque Gemini “ya tiene el Drive”. Acceso técnico no es permiso. **No uses el conector personal como atajo al expediente.**

Para el particular que resume el manual de la nevera: da igual clip que Drive. Recorta, pide secciones, no inventes, comprueba. Si pide “leer todo Drive”, limita a un archivo. Todo Drive es un volcado, no una sesión.

## Errores al analizar un PDF con IA

**Subir primero y pensar después.** El recorte era el trabajo. El clip es el último gesto.

**Creer que el PDF “no se copia” porque no lo has pegado como texto.** Se extrae. Viaja. Puede guardarse. Puede verse en un incidente. El clip no es más íntimo que el Ctrl+V.

**Pedir un veredicto.** “¿Firmo?” “¿Está bien este contrato?” “¿Esta analítica es normal?” El chat te dará prosa de confianza. Tú no tienes un dictamen. Tienes un riesgo. Lista de preguntas para el humano que sí toca, o lectura tuya. Nada más.

**Dejar el archivo completo “por contexto”.** El contexto útil es el capítulo.

**No abrir el PDF al leer el resumen.** Extrae afirmaciones, abre el original, marca NO ESTÁ.

**Renombrar la nómina a `manual.pdf`.** El extractor no se engaña. Tu checklist sí.

**Tres PDFs en un chat.** Mezcla plazos. Uno cada vez.

**Un “lector de PDF con IA” de un anuncio** que pide la cuenta del banco. Web oficial del producto que ya usas.

## Para aquí

**Subir un PDF a un chatbot** cabe en cinco líneas:

1. **Copia de trabajo, recorte de páginas, anonimato.** El nombre del fichero también.
2. **Manual público sí; contrato, nómina, salud, menores, secretos, no.** En cuenta personal, no hay atajo.
3. **Una sección, un formato, no inventes, NO ESTÁ.** Luego el PDF al lado.
4. **Los límites de tamaño y de páginas se miran el día de hoy.** Si no cabe, partes. El plan de pago no lava un documento prohibido.
5. **Drive o clip es cómo entra el archivo.** La privacidad es qué archivo es. El pilar sigue siendo [qué no pegar nunca](/blog/inteligencia-artificial/privacidad-al-usar-ia-que-no-pegar-nunca).

Cierra el chat cuando tengas las viñetas validadas en *tu* documento. El PDF original, el bueno, no hace falta que viva en la conversación. Ya ha hecho el trabajo si solo ha viajado el fragmento limpio. Si no podía viajar, no ha viajado. Ese “no” es el uso correcto.
