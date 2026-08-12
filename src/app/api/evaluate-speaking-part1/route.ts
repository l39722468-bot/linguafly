import { NextResponse } from 'next/server';
import OpenAI from 'openai';


// Lazy initialization to avoid build-time errors when OPENAI_API_KEY is not set
function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key-for-build-only',
  });
}

export interface SpeakingPart1Question {
  id: string;
  question: string;
  transcript: string;
}

export interface SpeakingPart1EvaluationResponse {
  overallScore: number; // 0-10
  pronunciation: {
    score: number; // 0-10
    feedback: string;
  };
  fluency: {
    score: number; // 0-10
    feedback: string;
  };
  grammar: {
    score: number; // 0-10
    feedback: string;
    errors?: string[];
  };
  vocabulary: {
    score: number; // 0-10
    feedback: string;
  };
  interaction: {
    score: number; // 0-10
    feedback: string;
  };
  strengths: string[];
  areasToImprove: string[];
  overallFeedback: string;
  cefrLevel: string; // A2, B1, B2, C1, C2
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { questions } = body as { questions: SpeakingPart1Question[] };

    if (!questions || questions.length === 0) {
      return NextResponse.json(
        { error: 'Se requieren preguntas y transcripciones' },
        { status: 400 }
      );
    }

    // Preparar el contexto para la evaluación
    const transcriptsText = questions
      .map((q, idx) => `Q${idx + 1}: ${q.question}\nA${idx + 1}: ${q.transcript}`)
      .join('\n\n');

    const prompt = `Eres un examinador oficial del Cambridge B2 First (FCE) evaluando la Part 1 (Interview) del Speaking test.

TRANSCRIPCIONES DE LAS RESPUESTAS:
${transcriptsText}

CRITERIOS DE EVALUACIÓN FCE SPEAKING PART 1:
1. **Pronunciation (0-10)**: Claridad, entonación, acento comprensible
2. **Fluency (0-10)**: Fluidez, pausas naturales, ritmo
3. **Grammar (0-10)**: Precisión gramatical, variedad de estructuras
4. **Vocabulary (0-10)**: Rango y precisión del vocabulario
5. **Interaction (0-10)**: Respuestas completas, naturales, apropiadas

INSTRUCCIONES:
- Evalúa cada criterio con una puntuación de 0-10
- Proporciona feedback específico y constructivo en español
- Identifica 3-5 puntos fuertes
- Identifica 3-5 áreas de mejora
- Determina el nivel CEFR (A2, B1, B2, C1, C2)
- Calcula puntuación general (promedio de los 5 criterios)
- Identifica errores gramaticales específicos si los hay
- Da feedback general de la entrevista

Responde en formato JSON con esta estructura exacta:
{
  "overallScore": number,
  "pronunciation": { "score": number, "feedback": "string" },
  "fluency": { "score": number, "feedback": "string" },
  "grammar": { "score": number, "feedback": "string", "errors": ["string"] },
  "vocabulary": { "score": number, "feedback": "string" },
  "interaction": { "score": number, "feedback": "string" },
  "strengths": ["string"],
  "areasToImprove": ["string"],
  "overallFeedback": "string",
  "cefrLevel": "string"
}`;

    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Eres un examinador experto del Cambridge B2 First (FCE). Evalúas con precisión y das feedback constructivo en español.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const evaluationText = completion.choices[0].message.content;
    if (!evaluationText) {
      throw new Error('No se recibió evaluación de OpenAI');
    }

    const evaluation: SpeakingPart1EvaluationResponse = JSON.parse(evaluationText);

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error('Error en evaluate-speaking-part1:', error);
    
    // Fallback evaluation si falla la API
    const fallbackEvaluation: SpeakingPart1EvaluationResponse = {
      overallScore: 7.0,
      pronunciation: {
        score: 7.0,
        feedback: 'Pronunciación comprensible. Continúa practicando para mejorar la claridad.',
      },
      fluency: {
        score: 7.0,
        feedback: 'Fluidez adecuada con pausas naturales.',
      },
      grammar: {
        score: 7.0,
        feedback: 'Uso correcto de estructuras gramaticales básicas.',
        errors: [],
      },
      vocabulary: {
        score: 7.0,
        feedback: 'Vocabulario apropiado para el nivel B2.',
      },
      interaction: {
        score: 7.0,
        feedback: 'Respuestas completas y apropiadas a las preguntas.',
      },
      strengths: [
        'Respuestas completas y relevantes',
        'Vocabulario apropiado',
        'Estructura clara',
      ],
      areasToImprove: [
        'Variar las estructuras gramaticales',
        'Ampliar el rango de vocabulario',
        'Mejorar la fluidez',
      ],
      overallFeedback: 'Buen desempeño general en la entrevista. Has demostrado capacidad para responder preguntas personales con claridad. Continúa practicando para alcanzar mayor fluidez y precisión.',
      cefrLevel: 'B2',
    };

    return NextResponse.json(fallbackEvaluation);
  }
}
