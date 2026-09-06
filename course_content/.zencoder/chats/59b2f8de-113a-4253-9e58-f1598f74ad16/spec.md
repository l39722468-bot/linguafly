# Technical Specification: English for Travel (A1)

## 1. Technical Context
- **Framework**: Next.js 15 (App Router).
- **Language**: TypeScript 5.7.
- **Data Persistence**: Static JSON files for curriculum and lessons.
- **Media**: 
  - Audio: MP3 (ElevenLabs/OpenAI).
  - Video: MP4 (1080p).
  - Images: PNG/WebP (Optimized).

## 2. Source Code Structure
The course content will be organized in the following path:
`src/content/cursos/viajes/a1/trimestre[1-3]/semana[01-36]/`

Files per week:
- `theory.json`: Concepts and visual theory.
- `lesson1.json`, `lesson2.json`, `lesson3.json`: Situational lessons.
- `exercises.json`: Practical activities.
- `exam.json`: Weekly test.

## 3. JSON Schemas (Absolute Beginner Optimized)

### 3.1. Exercises Schema Example (`exercises.json`)
```json
{
  "goal": "viajes",
  "level": "A1",
  "trimester": 1,
  "weekId": "semana01",
  "title": "Exercises: First Steps in English",
  "items": [
    {
      "id": "trv-a1-w01-ex01",
      "type": "multiple-choice",
      "prompt": "Listen and select the correct greeting image.",
      "audioUrl": "/audio/cursos/viajes/a1/trimestre1/semana01/hello.mp3",
      "options": [
        { "text": "Hello", "imageUrl": "/images/courses/travel-a1/common/hello_wave.png" },
        { "text": "Goodbye", "imageUrl": "/images/courses/travel-a1/common/bye_wave.png" }
      ],
      "answerIndex": 0,
      "explanation": "El audio dice 'Hello' (Hola), que se usa para saludar."
    },
    {
      "id": "trv-a1-w01-ex02",
      "type": "matching",
      "prompt": "Asocia el sonido con la letra del alfabeto.",
      "pairs": [
        { "audioUrl": "/audio/alphabet/a.mp3", "text": "A" },
        { "audioUrl": "/audio/alphabet/b.mp3", "text": "B" },
        { "audioUrl": "/audio/alphabet/c.mp3", "text": "C" }
      ],
      "explanation": "Es vital reconocer los sonidos de las letras para deletrear tu nombre en el hotel."
    }
  ]
}
```

## 4. Delivery Phases
1. **Phase 1: Week 1 (Pilot)**: Implementation of all JSONs and basic media assets for the first week.
2. **Phase 2: Trimester 1 (Weeks 1-12)**: Content generation and audio synthesis.
3. **Phase 3: Trimester 2 & 3**: Completion of the 36-week curriculum.

## 5. Verification
- Validate JSON files against schemas.
- Ensure audio files exist for every `audioUrl` reference.
- Run `npm run lint` and `npm test` to ensure stability.
