# Requisitos del Producto: IA Conversacional Pro

## Visión General
Transformar la maqueta de `AIConversationSimulator` en una herramienta funcional de práctica de inglés en tiempo real utilizando IA avanzada.

## Objetivos
1.  **Interacción Natural**: Conversaciones fluidas con baja latencia.
2.  **Feedback Híbrido**: El tutor debe responder naturalmente pero incluir pequeñas correcciones o sugerencias de vocabulario de forma no intrusiva.
3.  **Inmersión de Audio**: Uso de voces ultra-realistas de ElevenLabs para mejorar la escucha.

## Funcionalidades Clave
1.  **Integración con OpenAI**: Uso de GPT-4o para el motor de conversación, configurado con system prompts específicos para cada tutor.
2.  **Motor ElevenLabs**: Generación de audio dinámico para las respuestas de la IA.
3.  **Reconocimiento de Voz**: Implementar Web Speech API o Whisper para transcribir la voz del usuario.
4.  **Sistema de Feedback**: 
    - Analizar la gramática y el vocabulario del usuario en segundo plano.
    - Mostrar sugerencias "pop-up" o en una barra lateral sin cortar la conversación.
5.  **Personajes Definidos**:
    - Emma (Business English)
    - James (Conversational)
    - Sofia (IELTS)
    - Michael (Tech)

## Restricciones Técnicas
- Frontend: Next.js (App Router).
- Backend: API Routes para manejar las llamadas a OpenAI y ElevenLabs.
- Estado: React hooks para gestionar el historial de mensajes y el audio.
