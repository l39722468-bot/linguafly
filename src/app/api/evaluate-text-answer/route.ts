import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';


// Lazy initialization to avoid build-time errors when OPENAI_API_KEY is not set
function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key-for-build-only',
  });
}

export interface TextAnswerEvaluationRequest {
  question: string;
  userAnswer: string;
  correctAnswer?: string | string[];
  expectedConcepts?: string[];
  context?: string; // For reading comprehension or additional context
  level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  questionType?: 'comprehension' | 'grammar' | 'vocabulary' | 'general';
}

export interface TextAnswerEvaluationResponse {
  isCorrect: boolean;
  score: number; // 0-100
  feedback: string;
  detailedAnalysis: {
    semanticMatch: number; // 0-100
    grammaticalAccuracy: number; // 0-100
    vocabularyLevel: number; // 0-100
    completeness: number; // 0-100
  };
  conceptsCovered: string[];
  missingConcepts: string[];
  suggestions: string[];
  grammarErrors: Array<{
    error: string;
    correction: string;
    explanation: string;
  }>;
  vocabularyFeedback: {
    level: string;
    appropriateWords: string[];
    betterAlternatives?: Array<{ word: string; alternative: string; reason: string }>;
  };
  overallAssessment: 'excellent' | 'good' | 'fair' | 'needs-improvement' | 'incorrect';
}

export async function POST(request: NextRequest) {
  try {
    const body: TextAnswerEvaluationRequest = await request.json();
    
    const {
      question,
      userAnswer,
      correctAnswer,
      expectedConcepts = [],
      context = '',
      level = 'B2',
      questionType = 'general'
    } = body;

    // Validate required fields
    if (!question || !userAnswer) {
      return NextResponse.json(
        { error: 'Missing required fields: question and userAnswer' },
        { status: 400 }
      );
    }

    // Check if user answer is too short or empty
    if (userAnswer.trim().length < 3) {
      return NextResponse.json<TextAnswerEvaluationResponse>({
        isCorrect: false,
        score: 0,
        feedback: 'Tu respuesta es demasiado corta. Por favor, proporciona una respuesta más completa.',
        detailedAnalysis: {
          semanticMatch: 0,
          grammaticalAccuracy: 0,
          vocabularyLevel: 0,
          completeness: 0
        },
        conceptsCovered: [],
        missingConcepts: expectedConcepts,
        suggestions: ['Escribe una respuesta más detallada que aborde completamente la pregunta.'],
        grammarErrors: [],
        vocabularyFeedback: {
          level: 'insuficiente',
          appropriateWords: [],
        },
        overallAssessment: 'incorrect'
      });
    }

    // Build the system prompt for GPT-4o
    const systemPrompt = `Eres un evaluador experto de idioma inglés para estudiantes de nivel ${level}.
Tu tarea es evaluar respuestas de estudiantes con CERO falsos negativos y CERO falsos positivos.

PRINCIPIOS DE EVALUACIÓN CRÍTICOS:
1. EQUIVALENCIA SEMÁNTICA: Acepta respuestas que expresen el mismo significado con palabras diferentes
2. RECONOCIMIENTO DE SINÓNIMOS: Reconoce sinónimos y paráfrasis como correctos
3. FLEXIBILIDAD GRAMATICAL: Errores gramaticales menores no deben marcar una respuesta semánticamente correcta como incorrecta
4. PRECISIÓN CONCEPTUAL: Enfócate en si el estudiante entendió el concepto, no en la redacción exacta
5. CONCIENCIA DE CONTEXTO: Considera el tipo de pregunta y el nivel de respuesta esperado

GUÍAS DE PUNTUACIÓN:
- 90-100: Coincidencia semántica perfecta con excelente gramática
- 75-89: Significado correcto con problemas menores de gramática/vocabulario
- 60-74: Parcialmente correcto - algunos conceptos clave presentes
- 40-59: Incompleto pero muestra algo de comprensión
- 0-39: Incorrecto o fuera de tema

Devuelve una respuesta JSON con evaluación detallada en español.`;

    const userPrompt = `TIPO DE PREGUNTA: ${questionType}
NIVEL DE INGLÉS: ${level}

PREGUNTA:
"${question}"

${correctAnswer ? `RESPUESTA(S) ESPERADA(S):
${Array.isArray(correctAnswer) ? correctAnswer.map((a, i) => `${i + 1}. ${a}`).join('\n') : correctAnswer}` : ''}

${expectedConcepts.length > 0 ? `CONCEPTOS CLAVE A IDENTIFICAR:
${expectedConcepts.map((c, i) => `${i + 1}. ${c}`).join('\n')}` : ''}

${context ? `CONTEXTO/PASAJE:
${context.substring(0, 1000)}...` : ''}

RESPUESTA DEL ESTUDIANTE:
"${userAnswer}"

EVALÚA ESTA RESPUESTA Y DEVUELVE UN OBJETO JSON CON (en español):
{
  "isCorrect": boolean, // true si es semánticamente correcto independientemente de la redacción exacta
  "score": number, // 0-100
  "feedback": "string", // Retroalimentación clara y alentadora en español
  "detailedAnalysis": {
    "semanticMatch": number, // 0-100, qué tan bien coincide el significado
    "grammaticalAccuracy": number, // 0-100
    "vocabularyLevel": number, // 0-100, apropiado para ${level}
    "completeness": number // 0-100, todos los aspectos abordados
  },
  "conceptsCovered": ["concepto1", "concepto2"], // qué conceptos clave se mencionaron
  "missingConcepts": ["concepto3"], // qué conceptos clave faltan
  "suggestions": ["sugerencia1", "sugerencia2"], // mejoras específicas
  "grammarErrors": [
    {
      "error": "error específico en la respuesta",
      "correction": "cómo corregirlo",
      "explanation": "por qué está mal"
    }
  ],
  "vocabularyFeedback": {
    "level": "excelente|bueno|adecuado|necesita-mejora",
    "appropriateWords": ["palabra1", "palabra2"], // buen vocabulario utilizado
    "betterAlternatives": [
      {
        "word": "palabra básica usada",
        "alternative": "opción más sofisticada",
        "reason": "por qué es mejor"
      }
    ]
  },
  "overallAssessment": "excellent|good|fair|needs-improvement|incorrect"
}

REGLAS IMPORTANTES DE EVALUACIÓN:
1. Si el significado es correcto pero expresado de manera diferente, marca como correcto
2. Da crédito por sinónimos y paráfrasis
3. Errores gramaticales menores NO deben reprobar una respuesta semánticamente correcta
4. Sé alentador y constructivo en la retroalimentación
5. Para el nivel ${level}, espera vocabulario y gramática apropiados para ese nivel
6. Si la mayoría de los conceptos clave están cubiertos, la puntuación debe ser al menos 60`;

    // Call GPT-4o for evaluation
    const openai = getOpenAI();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3, // Lower temperature for more consistent evaluation
      max_tokens: 1500
    });

    const evaluationResult = JSON.parse(completion.choices[0].message.content || '{}');

    // Post-processing to ensure evaluation is fair
    // If user got most key concepts but scored low, boost score
    if (expectedConcepts.length > 0) {
      const conceptCoverage = evaluationResult.conceptsCovered?.length || 0;
      const totalConcepts = expectedConcepts.length;
      const coveragePercent = (conceptCoverage / totalConcepts) * 100;

      // If covered >75% of concepts but scored <60, adjust
      if (coveragePercent >= 75 && evaluationResult.score < 60) {
        evaluationResult.score = Math.max(evaluationResult.score, 70);
        evaluationResult.isCorrect = true;
        evaluationResult.feedback += ' Tu respuesta cubre la mayoría de los conceptos clave, ¡lo cual es excelente!';
      }
    }

    // Ensure proper response structure
    const response: TextAnswerEvaluationResponse = {
      isCorrect: evaluationResult.isCorrect ?? false,
      score: Math.min(100, Math.max(0, evaluationResult.score ?? 0)),
      feedback: evaluationResult.feedback || 'Evaluación completada.',
      detailedAnalysis: evaluationResult.detailedAnalysis || {
        semanticMatch: 50,
        grammaticalAccuracy: 50,
        vocabularyLevel: 50,
        completeness: 50
      },
      conceptsCovered: evaluationResult.conceptsCovered || [],
      missingConcepts: evaluationResult.missingConcepts || [],
      suggestions: evaluationResult.suggestions || [],
      grammarErrors: evaluationResult.grammarErrors || [],
      vocabularyFeedback: evaluationResult.vocabularyFeedback || {
        level: 'adecuado',
        appropriateWords: []
      },
      overallAssessment: evaluationResult.overallAssessment || 'fair'
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('Error in text answer evaluation:', error);
    
    // Fallback response in case of error
    return NextResponse.json(
      {
        error: 'Error al evaluar la respuesta',
        details: error.message,
        fallbackMessage: 'Por favor, inténtalo nuevamente. Si el problema persiste, contacta a soporte.'
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'evaluacion-respuesta-texto',
    version: '1.0.0'
  });
}
