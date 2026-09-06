# Product Requirements Document (PRD): Curso de Administración Inglés A2

## 1. Visión General
El objetivo es crear una estructura rígida y detallada para un curso de inglés de nivel A2 enfocado específicamente en el sector administrativo. El curso debe cubrir temas de alto interés para profesionales que buscan trabajar en administración, secretaría o recepción.

## 2. Público Objetivo
- Estudiantes de nivel A2 que desean especializarse en inglés para el trabajo.
- Profesionales de administración que necesitan mejorar su comunicación en inglés.
- Personas que buscan empleo en entornos de oficina internacionales.

## 3. Estructura del Curso (Rígida - 9 Meses / 36 Semanas)
El curso se organiza en **3 Trimestres**, cada uno de **12 semanas**, cubriendo un total de **36 semanas de formación**.

### Trimestre 1: Comunicación Inicial y Gestión de Oficina (Semanas 1-12)
*   **Mes 1: Recepción y Bienvenida**
    *   **Semana 1**: Saludos profesionales y protocolos de entrada.
    *   **Semana 2**: Registro de visitantes y gestión de credenciales.
    *   **Semana 3**: El alfabeto: Deletreo de nombres y correos (Phone/Face-to-face).
    *   **Semana 4**: Explicación de instalaciones y reglas básicas.
*   **Mes 2: Equipamiento y Suministros**
    *   **Semana 5**: Vocabulario técnico de suministros de oficina.
    *   **Semana 6**: Troubleshooting básico: Impresoras y fotocopiadoras.
    *   **Semana 7**: Solicitud de consumibles y contacto con proveedores.
    *   **Semana 8**: Gestión de inventario básico.
*   **Mes 3: Correspondencia y Paquetería**
    *   **Semana 9**: Recepción de paquetes y logística de entrada.
    *   **Semana 10**: Clasificación y distribución de correo.
    *   **Semana 11**: Preparación de envíos nacionales e internacionales.
    *   **Semana 12**: **Repaso y Evaluación del Trimestre 1.**

### Trimestre 2: Coordinación y Tareas Diarias (Semanas 13-24)
*   **Mes 4: Atención Telefónica**
    *   **Semana 13**: Frases estándar para responder y filtrar llamadas.
    *   **Semana 14**: Transferencia de llamadas y puesta en espera (Etiqueta).
    *   **Semana 15**: Toma de mensajes precisos y deletreo telefónico.
    *   **Semana 16**: Manejo de conexiones de audio deficientes y aclaraciones.
*   **Mes 5: Gestión de Agendas y Citas**
    *   **Semana 17**: Programación de citas: Días, horas y preposiciones.
    *   **Semana 18**: Confirmación de reuniones por teléfono y email.
    *   **Semana 19**: Reprogramación y cancelaciones educadas.
    *   **Semana 20**: Gestión de recordatorios y plazos (Deadlines).
*   **Mes 6: Emails Administrativos I**
    *   **Semana 21**: Estructura de un email profesional A2.
    *   **Semana 22**: Peticiones de información simples.
    *   **Semana 23**: Confirmación de recibo y archivos adjuntos.
    *   **Semana 24**: **Repaso y Evaluación del Trimestre 2.**

### Trimestre 3: Soporte al Cliente y Procesos (Semanas 25-36)
*   **Mes 7: Atención al Cliente Administrativa**
    *   **Semana 25**: Resolución de dudas frecuentes (FAQs).
    *   **Semana 26**: Lenguaje de empatía ante quejas básicas.
    *   **Semana 27**: Escalado de problemas de forma profesional.
    *   **Semana 28**: Vocabulario de satisfacción del cliente.
*   **Mes 8: Documentación y Organización**
    *   **Semana 29**: Facturas, recibos y albaranes: Identificación.
    *   **Semana 30**: Sistemas de archivo (Digital vs. Físico).
    *   **Semana 31**: Introducción a la protección de datos (GDPR básico).
    *   **Semana 32**: Redacción de reportes cortos de actividad.
*   **Mes 9: Apoyo en Reuniones y Proyecto Final**
    *   **Semana 33**: Preparación de salas, materiales y catering.
    *   **Semana 34**: Toma de notas de acción (Action Items) simples.
    *   **Semana 35**: Seguimiento post-reunión y agradecimientos.
    *   **Semana 36**: **Proyecto Final: Simulación Integral de 9 meses.**

## 4. Requisitos Técnicos
- La estructura debe integrarse en el sistema de currículum existente en `src/lib/sectors/admin-curriculum.ts`.
- Cada módulo debe incluir: Tópicos, Gramática, Vocabulario y Habilidades (Reading, Writing, Listening, Speaking).
- Los contenidos deben seguir los estándares del MCER (CEFR) para nivel A2.

## 5. Estructura de la Teoría Semanal (UX Mejorada)
Cada semana contará con una sección de teoría diseñada para el consumo rápido y la retención máxima, evitando bloques de texto densos.

### Componentes de la Teoría
1.  **Learning Roadmap (UX)**:
    *   Visualización clara de "Qué aprenderás" y "Cómo se aplica al mundo real".
2.  **Bite-sized Grammar (Gramática Fragmentada)**:
    *   Explicaciones breves seguidas de un "Mini-Check" interactivo (1 pregunta de validación rápida).
3.  **Core Vocabulary con Audio**:
    *   Lista de 10-15 términos con reproductores de audio individuales para la pronunciación.
    *   Iconografía clara para distinguir sustantivos, verbos y adjetivos.
4.  **Functional Cheat Sheets**:
    *   Tarjetas visuales de frases hechas ("Power Phrases") que el usuario puede copiar/pegar mentalmente para su uso inmediato.
5.  **"Watch Out!" (Errores Comunes)**:
    *   Sección de alertas sobre errores típicos de hispanohablantes en administración (ej. *False friends* como "actual" vs "current").
6.  **Cultural Insights & Business Etiquette**:
    *   Contexto sobre cómo varía la comunicación administrativa en UK vs USA vs Australia.

### Formato de Presentación UX
*   **Interactividad**: Uso de elementos desplegables (accordions) para detalles gramaticales complejos.
*   **Highlighting**: Uso de colores temáticos para resaltar verbos de acción y conectores.

## 6. Metodología de Ejercicios (Inmersión y Feedback)
Se implementarán **75 ejercicios** diseñados bajo el principio de "Learning by Doing", simulando un entorno de oficina dinámico.

### Tipos de Ejercicios y Mecánicas UX
1.  **Grammar & Vocab (25 - "The Office Assistant")**:
    *   *Mecánica*: Arrastrar y soltar (Drag & Drop) suministros a sus cajones o verbos a procesos.
    *   *UX*: Animaciones sutiles al acertar y feedback visual inmediato.
2.  **Reading (15 - "Inbox Simulator")**:
    *   *Mecánica*: Simulación de bandeja de entrada donde el usuario debe priorizar o extraer datos de emails y facturas.
    *   *UX*: Interfaz que imita a Outlook/Gmail para mayor inmersión.
3.  **Listening (15 - "The Switchboard")**:
    *   *Mecánica*: Escuchar fragmentos de llamadas ruidosas y completar el formulario de mensaje telefónico.
    *   *UX*: Control de velocidad de audio (0.75x, 1x, 1.25x).
4.  **Speaking (20 - "Face-to-Face")**:
    *   *Mecánica*: Reconocimiento de voz para completar diálogos con un avatar de visitante o colega.
    *   *UX*: Indicador visual de precisión de pronunciación (verde/amarillo/rojo).

### Feedback y Corrección (UX Crítica)
*   **No solo "Mal"**: Si el usuario falla, el sistema explicará *por qué* es incorrecto (ej. *"Usaste 'is' pero 'Supplies' es plural, deberías usar 'are'"*).
*   **Sugerencias Proactivas**: El sistema sugerirá repasar la sección de teoría específica si se detectan fallos recurrentes.

## 8. Reglas para la Generación por IA Programática
Para asegurar que la IA genere contenido coherente y no se desvíe del nivel A2 ni del contexto administrativo, se establecen las siguientes directrices estrictas.

### "Guardrails" Pedagógicos y Técnicos
1.  **Restricción de Vocabulario (A2 Strict)**:
    *   La IA debe utilizar preferentemente las 2,000 palabras más comunes del inglés (Oxford 3000) adaptadas al entorno de oficina.
    *   Prohibido el uso de modismos complejos, *phrasal verbs* avanzados (excepto los básicos como *pick up*, *sit down*) o tiempos verbales de nivel B2+ (ej. *Future Perfect* o *Mixed Conditionals*).
2.  **Estructura de Oraciones**:
    *   Máximo de 15 palabras por oración en las explicaciones teóricas.
    *   Uso de voz activa predominante.
3.  **Coherencia de Personajes y Escenarios**:
    *   La IA debe mantener una lista de "Personajes Recurrentes" (ej. *Mr. Henderson - Manager*, *Sarah - Receptionist*) para crear una narrativa continua durante las 36 semanas.
    *   Los escenarios deben ser siempre profesionales: Oficina física, reuniones virtuales, correos corporativos o llamadas de clientes.

### Plantilla Estricta de Generación (JSON Schema)
Todo contenido generado debe seguir este esquema para ser procesado por el motor del curso:
```json
{
  "week": "number",
  "topic": "string",
  "theory": {
    "objectives": ["string"],
    "grammar": { "point": "string", "explanation": "string", "examples": ["string"] },
    "vocabulary": [{ "term": "string", "translation": "string", "audio_path": "string" }]
  },
  "exercises": [
    {
      "id": "string",
      "type": "multiple-choice | fill-blank | audio | speaking",
      "trigger_context": "string (Spanish/English context)",
      "question": "string",
      "options": ["string"],
      "correct_answer": "string",
      "feedback_correct": "string",
      "feedback_incorrect": "string",
      "xp_reward": 10
    }
  ]
}
```

### Prohibiciones para la IA (Negatives)
*   **NO** generar explicaciones gramaticales de más de 3 párrafos.
*   **NO** usar jerga técnica excesiva que no sea esencial para un administrativo nivel A2.
*   **NO** incluir escenarios fuera del ámbito laboral (ej. "en el supermercado" o "en la playa").
*   **NO** dar respuestas ambiguas en los ejercicios; cada pregunta debe tener una única respuesta correcta indiscutible.

## 9. Evaluación Final y Certificación
Para validar el aprendizaje de los 9 meses, el curso concluirá con un proceso de certificación formal.

*   **Examen Final Integral**: Una evaluación de 50 preguntas que cubre los hitos más importantes de los 3 trimestres.
*   **Criterio de Aprobado**: Se requiere un 70% de aciertos y haber completado al menos 60 de los 75 ejercicios prácticos.
*   **Certificado de Especialidad**: Emisión de un certificado digital: *"Focus English Specialist: Administrative English - Level A2"*, detallando las competencias adquiridas (Atención telefónica, Gestión documental, Recepción profesional).

## 10. Sistema de Repaso Espaciado (Spaced Repetition)
Debido a la duración de 36 semanas, se implementará una mecánica para evitar la curva del olvido.

*   **Flashback Exercises**: Cada 4 semanas, el sistema inyectará automáticamente 2-3 ejercicios de meses anteriores basados en las áreas donde el usuario tuvo más errores.
*   **Smart Review**: Un botón de "Quick Review" disponible en el dashboard que genera un test rápido de 5 minutos con contenido aleatorio de semanas ya completadas.

## 12. Portafolio Profesional (The Admin Portfolio)
El curso permitirá al usuario construir un activo tangible que podrá utilizar en su carrera profesional.

*   **Template Library**: A lo largo de las 36 semanas, el usuario completará tareas que resultarán en documentos profesionales (ej. una carta de presentación, una estructura de factura, un guion de atención telefónica).
*   **Downloadable Assets**: Al finalizar cada trimestre, el sistema generará un ZIP con todas las "obras" del usuario formateadas profesionalmente.
*   **Competence Badge**: Un distintivo especial por cada documento maestro completado sin errores graves.

## 13. Simulador de Crisis (Stress-Test AI)
Ejercicios de alta intensidad para preparar al usuario para situaciones de presión real.

*   **Chaos Scenarios**: Situaciones donde el "bot" interpreta a un cliente muy enfadado o una emergencia de oficina (ej. *"The CEO needs this report in 5 minutes and the internet is down"*).
*   **Emotional Intelligence Focus**: El feedback no solo evaluará el inglés, sino también el tono y la capacidad de calmar al interlocutor.
*   **Random Triggers**: Estos ejercicios aparecerán de forma sorpresiva en las semanas de "Resolución" (Trimestre 3).

## 14. Simulación de Sistemas Reales (CRM & Fintech)
Aprovechando la infraestructura del repositorio (HubSpot/Stripe), el curso incluirá tareas técnicas administrativas.

*   **CRM Task Simulation**: Ejercicios de "Data Entry" donde el usuario debe extraer información de un audio y decir cómo la registraría en un CRM (HubSpot).
*   **Payment Handling**: Simulacros de verificación de estados de pago o resolución de disputas de facturación simples (Contexto Stripe).

## 15. Análisis de Competencias (Admin Skill Mapping)
Un dashboard visual que muestra al usuario su perfil profesional.

*   **Skill Radar**: Gráfico que mide 4 áreas: *Customer Care, Document Management, Tech Proficiency y Professional Writing*.
*   **Gap Analysis**: El sistema sugerirá qué semanas reforzar según las debilidades detectadas en el gráfico de radar.

## 16. Práctica de Sombreado (AI Shadowing)
Mejora drástica de la fluidez y naturalidad en el habla.

*   **Echo Practice**: El usuario escucha una frase profesional (ej. una bienvenida de recepción) y debe repetirla inmediatamente. La IA comparará la onda de sonido y el ritmo, no solo las palabras.
*   **Intonation Coaching**: Foco específico en la cortesía tonal (la diferencia entre sonar autoritario o servicial).
