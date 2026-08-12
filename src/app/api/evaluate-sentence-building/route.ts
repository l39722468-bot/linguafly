import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';


// Lazy initialization to avoid build-time errors when OPENAI_API_KEY is not set
function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key-for-build-only',
  });
}

export interface SentenceBuildingEvaluationRequest {
  userSentence: string;
  targetSentence: string;
  grammarFocus: string;
  words: Array<{ text: string; type: string }>;
}

export interface SentenceBuildingEvaluationResponse {
  isCorrect: boolean;
  score: number; // 0-100
  feedback: string;
  grammarAnalysis: {
    wordOrder: number; // 0-100
    grammarAccuracy: number; // 0-100
    meaningPreserved: boolean;
  };
  suggestions: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: SentenceBuildingEvaluationRequest = await request.json();
    
    const { userSentence, targetSentence, grammarFocus, words } = body;

    // Validate required fields
    if (!userSentence || !targetSentence) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Normalize sentences
    const normalizeString = (str: string) => str.toLowerCase().trim().replace(/\s+/g, ' ');
    const normalizedUser = normalizeString(userSentence);
    const normalizedTarget = normalizeString(targetSentence);

    // Quick check for exact match
    if (normalizedUser === normalizedTarget) {
      return NextResponse.json<SentenceBuildingEvaluationResponse>({
        isCorrect: true,
        score: 100,
        feedback: '🎉 ¡Perfecto! Tu oración es exactamente correcta!',
        grammarAnalysis: {
          wordOrder: 100,
          grammarAccuracy: 100,
          meaningPreserved: true
        },
        suggestions: []
      });
    }

    // Use AI to evaluate sentence construction
    const systemPrompt = `Eres un profesor experto de gramática inglesa especializado en construcción de oraciones.
Tu tarea es evaluar si la oración del estudiante es gramaticalmente correcta y transmite el mismo significado que la oración objetivo.

CRITERIOS DE EVALUACIÓN:
1. Orden de palabras: ¿El orden de las palabras es correcto para la gramática inglesa?
2. Precisión gramatical: ¿Se siguen correctamente las reglas gramaticales?
3. Significado: ¿Preserva el significado original?

IMPORTANTE:
- Acepta diferencias menores si la gramática y el significado son correctos
- Sé alentador pero preciso
- Proporciona retroalimentación específica y accionable
- Enfócate en: ${grammarFocus}

Devuelve formato JSON con todas las respuestas en español.`;

    const userPrompt = `ORACIÓN OBJETIVO: "${targetSentence}"
ORACION DEL ESTUDIANTE: "${userSentence}"
ENFOQUE GRAMATICAL: ${grammarFocus}
PALABRAS DISPONIBLES: ${words.map(w => `${w.text} (${w.type})`).join(', ')}

Evalúa la oración del estudiante y devuelve JSON (en español):
{
  "isCorrect": boolean,
  "score": number (0-100),
  "feedback": "string (alentador y específico en español)",
  "grammarAnalysis": {
    "wordOrder": number (0-100),
    "grammarAccuracy": number (0-100),
    "meaningPreserved": boolean
  },
  "suggestions": ["sugerencia1", "sugerencia2"]
}

GUÍA DE PUNTUACIÓN:
- 90-100: Perfecto o casi perfecto
- 70-89: Buen intento con problemas menores
- 50-69: Parcialmente correcto pero con errores
- 0-49: Errores significativos

DIRECTRICES DE RETROALIMENTACIÓN:
- Si es correcto: Elogia aspectos específicos (orden de palabras, elección gramatical, etc.)
- Si es parcialmente correcto: Señala qué está bien y qué necesita arreglarse
- Si es incorrecto: Explica claramente el error principal y sugiere la corrección
- Siempre sé alentador y constructivo`;

    const openai = getOpenAI();


    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using mini for cost efficiency
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 500
    });

    const evaluation = JSON.parse(completion.choices[0].message.content || '{}');

    // Ensure response structure
    const response: SentenceBuildingEvaluationResponse = {
      isCorrect: evaluation.isCorrect ?? false,
      score: Math.min(100, Math.max(0, evaluation.score ?? 0)),
      feedback: evaluation.feedback || 'Evaluación completada.',
      grammarAnalysis: evaluation.grammarAnalysis || {
        wordOrder: 50,
        grammarAccuracy: 50,
        meaningPreserved: false
      },
      suggestions: evaluation.suggestions || []
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('Error in sentence building evaluation:', error);
    
    return NextResponse.json(
      {
        error: 'Error al evaluar la oración',
        details: error.message
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'evaluacion-construccion-oraciones',
    version: '1.0.0'
  });
}
