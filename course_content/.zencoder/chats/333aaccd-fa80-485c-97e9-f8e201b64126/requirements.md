# PRD: AI Speaking Coach - Interfaz de Práctica Oral con IA

## 1. Introducción
El sistema de "AI Speaking Coach" es una nueva funcionalidad diseñada para permitir a los estudiantes practicar sus habilidades de conversación en inglés de manera autónoma. Utilizando inteligencia artificial de vanguardia, el sistema simulará roles (escenarios), grabará la voz del usuario, evaluará métricas clave y proporcionará retroalimentación en tiempo real.

## 2. Objetivos
- Proporcionar un entorno seguro y privado para la práctica oral.
- Ofrecer retroalimentación detallada sobre pronunciación, fluidez, gramática, vocabulario y tono.
- Adaptar la dificultad de la conversación según el nivel del estudiante (A1-C2).
- Mantener sesiones de práctica de hasta 30 minutos.

## 3. Requisitos Funcionales

### 3.1. Selección de Escenario y Tutor
- El usuario podrá elegir entre diferentes escenarios de la vida real (Entrevista de trabajo, Restaurante, Presentación, Viajes, etc.).
- El usuario podrá seleccionar un tutor con una personalidad y acento específicos (Emma - Business, James - Conversational, etc.).

### 3.2. Interfaz de Conversación
- La interfaz debe ser intuitiva y mostrar visualmente quién está hablando (Usuario vs IA).
- El sistema debe grabar la voz del usuario automáticamente o mediante un botón de pulsación (PTT).
- Debe incluir un visualizador de voz para indicar que el sistema está escuchando.

### 3.3. Evaluación de Métricas
Para cada intervención del usuario, el sistema evaluará:
- **Pronunciación**: Claridad de los sonidos.
- **Fluidez**: Ritmo y ausencia de vacilaciones excesivas.
- **Gramática**: Uso correcto de estructuras según el nivel.
- **Vocabulario**: Riqueza y adecuación léxica.
- **Tono e Intonación**: Naturalidad y énfasis.

### 3.4. Adaptabilidad al Nivel
- El sistema consultará el nivel del usuario (previamente testeado en la plataforma).
- El tutor ajustará su velocidad de habla, complejidad gramatical y vocabulario al nivel detectado.

### 3.5. Duración de la Sesión
- El sistema debe soportar sesiones de hasta 30 minutos, manteniendo el contexto de la conversación.

## 4. Requisitos de Usuario (UX)
- Interfaz moderna y minimalista, coherente con el diseño de Focus English.
- Feedback inmediato después de cada turno de habla.
- Resumen final de la sesión con progreso y áreas de mejora.

## 5. Requisitos Técnicos
- **Frontend**: React/Next.js (App Router).
- **Audio**: Web Audio API para grabación y visualización.
- **IA**: 
  - OpenAI Realtime API (preferido para baja latencia) o OpenAI Whisper + GPT-4o + TTS.
  - Supabase para persistencia de niveles y progreso.
- **Backend**: API Routes en Next.js para orquestación y evaluación profunda.

## 6. Integración en la Web
- Nueva sección en la página de inicio (Landing) promocionando la funcionalidad.
- Nueva página dedicada: `/practica-ia`.
- Acceso desde el dashboard de cursos existentes.

## 8. Decisiones de Diseño (basadas en feedback del usuario)
- **Dinámica**: La IA guiará activamente al alumno hacia objetivos específicos según el escenario.
- **Feedback**: Se proporcionará un resumen de evaluación cada pocos minutos (ej: cada 3-5 minutos o al completar un hito) para mantener la fluidez de la conversación.
- **Memoria**: El sistema persistirá el historial y progreso para que los tutores tengan contexto de sesiones anteriores.
