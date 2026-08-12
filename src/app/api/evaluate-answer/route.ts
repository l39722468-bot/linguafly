import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Lazy initialization to avoid build-time errors when OPENAI_API_KEY is not set
function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key-for-build-only',
  });
}

export const maxDuration = 30;

interface EvaluateRequest {
  question: string;
  userAnswer: string;
  correctAnswer: string | string[];
  exerciseType: string;
  level: string;
  context?: string;
  options?: string[];
}

interface EvaluationResult {
  isCorrect: boolean;
  score: number; // 0-100
  feedback: string;
  detailedExplanation: string;
  strengths?: string[];
  improvements?: string[];
  grammarCorrections?: string[];
  vocabularySuggestions?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: EvaluateRequest = await request.json();
    const { question, userAnswer, correctAnswer, exerciseType, level, context, options } = body;

    // Validate required fields
    if (!question || !userAnswer || !correctAnswer || !exerciseType || !level) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('🤖 Evaluating answer with AI:', {
      type: exerciseType,
      level,
      question: question.substring(0, 100),
      userAnswer: userAnswer.substring(0, 100),
    });

    // Create AI evaluation prompt
    const evaluationPrompt = createEvaluationPrompt(
      question,
      userAnswer,
      correctAnswer,
      exerciseType,
      level,
      context,
      options
    );

    // Call OpenAI API
    const openai = getOpenAI();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Eres un profesor experto de inglés especializado en evaluar respuestas de estudiantes de nivel ${level}. 
Tu tarea es evaluar respuestas de forma pedagógica, constructiva y detallada.
IMPORTANTE: 
- Responde SIEMPRE en español (excepto los ejemplos en inglés).
- Sé comprensivo con errores menores de ortografía o mayúsculas si el contenido es correcto.
- Para niveles básicos (A1-A2), sé más tolerante con errores gramaticales menores.
- Para niveles avanzados (B2-C2), sé más estricto con la gramática y el vocabulario.
- Proporciona feedback específico y accionable.`,
        },
        {
          role: 'user',
          content: evaluationPrompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });

    const aiResponse = completion.choices[0].message.content;
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    const evaluation: EvaluationResult = JSON.parse(aiResponse);

    console.log('✅ AI Evaluation completed:', {
      isCorrect: evaluation.isCorrect,
      score: evaluation.score,
    });

    return NextResponse.json(evaluation);
  } catch (error: any) {
    console.error('❌ Error evaluating answer:', error);
    return NextResponse.json(
      { 
        error: 'Failed to evaluate answer',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

function createEvaluationPrompt(
  question: string,
  userAnswer: string,
  correctAnswer: string | string[],
  exerciseType: string,
  level: string,
  context?: string,
  options?: string[]
): string {
  const correctAnswers = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
  const correctAnswersText = correctAnswers.join(' / ');

  let prompt = `Evalúa la siguiente respuesta de un estudiante de inglés nivel ${level}:

TIPO DE EJERCICIO: ${exerciseType}
NIVEL: ${level}

PREGUNTA:
${question}
`;

  if (context) {
    prompt += `\nCONTEXTO ADICIONAL:
${context}
`;
  }

  if (options && options.length > 0) {
    prompt += `\nOPCIONES DISPONIBLES:
${options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n')}
`;
  }

  prompt += `
RESPUESTA CORRECTA ESPERADA:
${correctAnswersText}

RESPUESTA DEL ESTUDIANTE:
${userAnswer}

INSTRUCCIONES DE EVALUACIÓN:
1. Determina si la respuesta es correcta, parcialmente correcta o incorrecta
2. Asigna una puntuación de 0 a 100
3. Proporciona feedback constructivo en español
4. Ofrece una explicación detallada sobre por qué está bien o mal
5. Si está incorrecta, explica cuál es la respuesta correcta y por qué
6. Identifica fortalezas de la respuesta (si las hay)
7. Sugiere mejoras específicas
8. Señala errores gramaticales si los hay
9. Sugiere vocabulario alternativo o más apropiado si es relevante

CRITERIOS ESPECIALES POR NIVEL:
- A1-A2: Sé tolerante con errores ortográficos menores, céntrate en la comprensión básica
- B1-B2: Evalúa gramática y vocabulario con mayor rigor
- C1-C2: Exige precisión gramatical, vocabulario avanzado y expresiones idiomáticas

IMPORTANTE: Para múltiple opción (multiple-choice), considera:
- Diferencias de mayúsculas/minúsculas como error menor (-5 puntos máximo)
- Espacios extra o puntuación como error muy menor (-2 puntos máximo)
- Si el contenido principal coincide, la respuesta debe ser marcada como correcta con puntuación 95-100

Responde en formato JSON con esta estructura EXACTA:
{
  "isCorrect": boolean (true si score >= 70),
  "score": number (0-100),
  "feedback": "Feedback breve y positivo en español (máx 150 caracteres)",
  "detailedExplanation": "Explicación detallada en español (200-400 palabras)",
  "strengths": ["punto fuerte 1", "punto fuerte 2"] o null,
  "improvements": ["mejora sugerida 1", "mejora sugerida 2"] o null,
  "grammarCorrections": ["corrección 1", "corrección 2"] o null,
  "vocabularySuggestions": ["sugerencia 1", "sugerencia 2"] o null
}`;

  return prompt;
}
