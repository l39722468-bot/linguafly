import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';


// Lazy initialization to avoid build-time errors when OPENAI_API_KEY is not set
function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key-for-build-only',
  });
}

export interface WritingEvaluationRequest {
  prompt: string;
  essay: string;
  writingType: 'essay' | 'article' | 'email' | 'review' | 'report';
  minWords: number;
  maxWords: number;
  level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  rubric?: {
    content: number;
    organization: number;
    grammar: number;
    vocabulary: number;
  };
}

export interface WritingEvaluationResponse {
  overallScore: number; // 0-100
  isAcceptable: boolean; // Meets minimum standards
  wordCount: number;
  wordCountFeedback: string;
  
  scores: {
    content: number; // 0-100
    organization: number; // 0-100
    grammar: number; // 0-100
    vocabulary: number; // 0-100
    taskAchievement: number; // 0-100
  };
  
  strengths: string[];
  weaknesses: string[];
  
  detailedFeedback: {
    content: string;
    organization: string;
    grammar: string;
    vocabulary: string;
    taskAchievement: string;
  };
  
  grammarErrors: Array<{
    sentence: string;
    error: string;
    correction: string;
    explanation: string;
    category: string; // e.g., "verb tense", "article", "preposition"
  }>;
  
  vocabularyAnalysis: {
    level: string; // "excellent", "good", "adequate", "basic"
    sophisticatedWords: string[];
    repetitiveWords: string[];
    suggestions: string[];
  };
  
  organizationAnalysis: {
    hasIntroduction: boolean;
    hasBody: boolean;
    hasConclusion: boolean;
    paragraphCount: number;
    coherence: string; // "excellent", "good", "adequate", "poor"
    cohesion: string; // "excellent", "good", "adequate", "poor"
  };
  
  recommendations: string[];
  estimatedCEFRLevel: string;
  bandScore?: number; // For IELTS-style scoring
}

export async function POST(request: NextRequest) {
  try {
    const body: WritingEvaluationRequest = await request.json();
    
    const {
      prompt,
      essay,
      writingType,
      minWords,
      maxWords,
      level = 'B2',
      rubric = { content: 30, organization: 25, grammar: 25, vocabulary: 20 }
    } = body;

    // Validate required fields
    if (!prompt || !essay || !writingType) {
      return NextResponse.json(
        { error: 'Missing required fields: prompt, essay, and writingType' },
        { status: 400 }
      );
    }

    // Calculate word count
    const wordCount = (essay || "").split(/\s+/).filter(w => w.length > 0).length;
    
    // Word count validation
    let wordCountFeedback = '';
    let wordCountPenalty = 0;
    
    if (wordCount < minWords) {
      wordCountFeedback = `Tu ensayo es demasiado corto (${wordCount} palabras). Mínimo requerido: ${minWords} palabras. (-10 puntos)`;
      wordCountPenalty = 10;
    } else if (wordCount > maxWords) {
      wordCountFeedback = `Tu ensayo excede el límite de palabras (${wordCount} palabras). Máximo permitido: ${maxWords} palabras. (-5 puntos)`;
      wordCountPenalty = 5;
    } else {
      wordCountFeedback = `¡Bien! Tu ensayo tiene ${wordCount} palabras, lo cual está dentro del rango requerido (${minWords}-${maxWords}).`;
    }

    // Build comprehensive system prompt
    const systemPrompt = `Eres un examinador experto de redacción en inglés para nivel ${level} (MCER).
Te especializas en la evaluación de ${writingType} y sigues los criterios oficiales de Cambridge/IELTS.

ESTÁNDARES DE EVALUACIÓN PARA ${level}:
- Contenido: Aborda todas las partes del prompt, desarrolla ideas a fondo
- Organización: Estructura clara con introducción, cuerpo, conclusión
- Gramática: Rango y precisión apropiados para ${level}
- Vocabulario: Rango apropiado, colocaciones, léxico menos común
- Logro de la tarea: Cumple todos los requisitos del prompt

FILOSOFÍA DE CALIFICACIÓN:
- CERO FALSOS NEGATIVOS: Si la redacción muestra competencia de ${level}, califica en consecuencia
- CERO FALSOS POSITIVOS: Sé preciso pero no excesivamente severo
- CONSTRUCTIVO: Enfócate en la mejora, no solo en los errores
- JUSTO: Da crédito a los buenos intentos aunque no sean perfectos

Devuelve una evaluación JSON detallada siguiendo los pesos de la rúbrica:
Contenido: ${rubric.content}%
Organización: ${rubric.organization}%
Gramática: ${rubric.grammar}%
Vocabulario: ${rubric.vocabulary}%`;

    const userPrompt = `TIPO DE REDACCIÓN: ${writingType.toUpperCase()}
NIVEL: ${level}
REQUISITO DE PALABRAS: ${minWords}-${maxWords} palabras
CONTEO REAL DE PALABRAS: ${wordCount} palabras

PROMPT:
"${prompt}"

${writingType.toUpperCase()} DEL ESTUDIANTE:
${essay}

PROPORCIONA UNA EVALUACIÓN COMPLETA EN FORMATO JSON (en español):
{
  "overallScore": number, // 0-100, considerando penalización por conteo de palabras si aplica
  "isAcceptable": boolean, // true si cumple con los estándares de ${level}
  
  "scores": {
    "content": number, // 0-100
    "organization": number, // 0-100
    "grammar": number, // 0-100
    "vocabulary": number, // 0-100
    "taskAchievement": number // 0-100
  },
  
  "strengths": ["fortaleza1", "fortaleza2", "fortaleza3"],
  "weaknesses": ["debilidad1", "debilidad2"],
  
  "detailedFeedback": {
    "content": "Retroalimentación detallada sobre ideas, desarrollo, relevancia",
    "organization": "Retroalimentación sobre estructura, párrafos, coherencia",
    "grammar": "Evaluación general de gramática",
    "vocabulary": "Rango, precisión, adecuación del vocabulario",
    "taskAchievement": "Qué tan bien se abordaron todas las partes del prompt"
  },
  
  "grammarErrors": [
    {
      "sentence": "oración exacta con error",
      "error": "error específico identificado",
      "correction": "versión corregida",
      "explanation": "por qué está mal y regla",
      "category": "tiempo verbal|artículo|preposición|orden de palabras|etc"
    }
  ],
  
  "vocabularyAnalysis": {
    "level": "excelente|bueno|adecuado|básico",
    "sophisticatedWords": ["palabra avanzada 1", "palabra avanzada 2"],
    "repetitiveWords": ["palabra repetida demasiado"],
    "suggestions": ["Usa vocabulario más variado", "Considera sinónimos para X"]
  },
  
  "organizationAnalysis": {
    "hasIntroduction": boolean,
    "hasBody": boolean,
    "hasConclusion": boolean,
    "paragraphCount": number,
    "coherence": "excelente|bueno|adecuado|pobre",
    "cohesion": "excelente|bueno|adecuado|pobre"
  },
  
  "recommendations": [
    "Consejo específico y accionable 1",
    "Consejo específico y accionable 2",
    "Consejo específico y accionable 3"
  ],
  
  "estimatedCEFRLevel": "A1|A2|B1|B2|C1|C2",
  "bandScore": number // Puntuación estilo IELTS 0-9
}

IMPORTANTE:
1. Enumera los errores gramaticales PRINCIPALES (máximo 10 más importantes)
2. Sé alentador pero honesto
3. Enfócate en patrones, no en cada error individual
4. Reconoce los buenos intentos y el crédito parcial
5. Considera los estándares de ${level} - no esperes perfección de nivel nativo`;

    // Call GPT-4o for evaluation
    const openai = getOpenAI();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 3000 // More tokens for detailed writing feedback
    });

    const evaluationResult = JSON.parse(completion.choices[0].message.content || '{}');

    // Apply word count penalty
    if (wordCountPenalty > 0) {
      evaluationResult.overallScore = Math.max(0, (evaluationResult.overallScore || 0) - wordCountPenalty);
    }

    // Ensure response structure
    const response: WritingEvaluationResponse = {
      overallScore: Math.min(100, Math.max(0, evaluationResult.overallScore ?? 0)),
      isAcceptable: evaluationResult.isAcceptable ?? false,
      wordCount,
      wordCountFeedback,
      
      scores: evaluationResult.scores || {
        content: 50,
        organization: 50,
        grammar: 50,
        vocabulary: 50,
        taskAchievement: 50
      },
      
      strengths: evaluationResult.strengths || [],
      weaknesses: evaluationResult.weaknesses || [],
      
      detailedFeedback: evaluationResult.detailedFeedback || {
        content: 'No hay retroalimentación disponible',
        organization: 'No hay retroalimentación disponible',
        grammar: 'No hay retroalimentación disponible',
        vocabulary: 'No hay retroalimentación disponible',
        taskAchievement: 'No hay retroalimentación disponible'
      },
      
      grammarErrors: evaluationResult.grammarErrors || [],
      
      vocabularyAnalysis: evaluationResult.vocabularyAnalysis || {
        level: 'adecuado',
        sophisticatedWords: [],
        repetitiveWords: [],
        suggestions: []
      },
      
      organizationAnalysis: evaluationResult.organizationAnalysis || {
        hasIntroduction: false,
        hasBody: true,
        hasConclusion: false,
        paragraphCount: 1,
        coherence: 'adecuado',
        cohesion: 'adecuado'
      },
      
      recommendations: evaluationResult.recommendations || [],
      estimatedCEFRLevel: evaluationResult.estimatedCEFRLevel || level,
      bandScore: evaluationResult.bandScore
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('Error in writing evaluation:', error);
    
    return NextResponse.json(
      {
        error: 'Error al evaluar la redacción',
        details: error.message
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'evaluacion-redaccion',
    version: '1.0.0'
  });
}
