import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';


// Lazy initialization to avoid build-time errors when OPENAI_API_KEY is not set
function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key-for-build-only',
  });
}

export interface MultipleChoiceEvaluationRequest {
  question: string;
  options: string[];
  userAnswer: string;
  correctAnswer: string;
  context?: string;
  level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

export interface MultipleChoiceEvaluationResponse {
  isCorrect: boolean;
  score: number;
  confidence: number; // 0-100, how confident we are in the evaluation
  userAnswerIndex: number; // Which option index did user select
  correctAnswerIndex: number; // Which option index is correct
  
  feedback: string;
  explanation?: string; // Why this is the correct answer
  
  // In case of typo/fuzzy match
  possibleTypo: boolean;
  fuzzyMatchScore?: number; // 0-100
  didYouMean?: string; // Suggested correction if there was a typo
  
  // Educational value
  whyWrong?: string; // If incorrect, explain why
  conceptTested: string;
}

/**
 * Smart multiple choice evaluation that handles:
 * - Exact matches
 * - Typos and spelling errors
 * - Case sensitivity
 * - Extra whitespace
 * - Similar options (to avoid false positives)
 */
export async function POST(request: NextRequest) {
  let question = '', options: string[] = [], userAnswer = '', correctAnswer = '', context = '', level = 'B2';
  
  try {
    const body: MultipleChoiceEvaluationRequest = await request.json();
    
    ({
      question,
      options,
      userAnswer,
      correctAnswer,
      context = '',
      level = 'B2'
    } = body);

    const openai = getOpenAI();

    // Validate required fields
    if (!question || !options || !userAnswer || !correctAnswer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Normalize answers
    const normalizeString = (str: string) => str.toLowerCase().trim().replace(/\s+/g, ' ');
    
    const normalizedUserAnswer = normalizeString(userAnswer);
    const normalizedCorrectAnswer = normalizeString(correctAnswer);
    const normalizedOptions = options.map(opt => normalizeString(opt));

    // Find indices
    const userAnswerIndex = normalizedOptions.findIndex(opt => opt === normalizedUserAnswer);
    const correctAnswerIndex = normalizedOptions.findIndex(opt => opt === normalizedCorrectAnswer);

    // LEVEL 1: Exact match after normalization
    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      return NextResponse.json<MultipleChoiceEvaluationResponse>({
        isCorrect: true,
        score: 100,
        confidence: 100,
        userAnswerIndex,
        correctAnswerIndex,
        feedback: '✓ ¡Correcto! Bien hecho.',
        possibleTypo: false,
        conceptTested: 'Pregunta de opción múltiple'
      });
    }

    // LEVEL 2: Check for typos using Levenshtein distance
    const levenshteinDistance = (a: string, b: string): number => {
      const matrix: number[][] = [];
      
      for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }
      
      for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }
      
      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1 // deletion
            );
          }
        }
      }
      
      return matrix[b.length][a.length];
    };

    const calculateSimilarity = (a: string, b: string): number => {
      const distance = levenshteinDistance(a, b);
      const maxLength = Math.max(a.length, b.length);
      return Math.round(((maxLength - distance) / maxLength) * 100);
    };

    // Check similarity with correct answer
    const similarityScore = calculateSimilarity(normalizedUserAnswer, normalizedCorrectAnswer);
    
    // If very similar (>90%), likely a typo - ask AI to verify
    if (similarityScore >= 90) {
      // Use AI to determine if it's a typo or actually selected wrong answer
      const aiPrompt = `Pregunta: "${question}"
Opciones: ${options.map((opt, i) => `${i + 1}. ${opt}`).join(', ')}
Respuesta Correcta: "${correctAnswer}"
Usuario Seleccionó: "${userAnswer}"

La respuesta del usuario es ${similarityScore}% similar a la respuesta correcta.
¿Es esto probablemente un error tipográfico/transcripción, o el usuario realmente seleccionó una opción diferente?

Responde en JSON:
{
  "isTypo": boolean,
  "confidence": number (0-100),
  "reasoning": "breve explicación"
}`;


      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // Using mini for simple typo detection
        messages: [
          { role: 'system', content: 'Eres un asistente útil que detecta errores tipográficos en respuestas de opción múltiple.' },
          { role: 'user', content: aiPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
        max_tokens: 200
      });

      const aiResponse = JSON.parse(completion.choices[0].message.content || '{}');
      
      if (aiResponse.isTypo) {
        return NextResponse.json<MultipleChoiceEvaluationResponse>({
          isCorrect: true, // Give credit despite typo
          score: 100,
          confidence: 95,
          userAnswerIndex,
          correctAnswerIndex,
          feedback: '✓ ¡Correcto! (Detectamos un pequeño error tipográfico en tu selección, pero tu intención era clara)',
          possibleTypo: true,
          fuzzyMatchScore: similarityScore,
          didYouMean: correctAnswer,
          conceptTested: 'Pregunta de opción múltiple'
        });
      }
    }

    // LEVEL 3: User selected wrong answer - provide educational feedback
    // Use AI to explain why answer is wrong
    const explanationPrompt = `${context ? `Contexto: ${context}\n\n` : ''}Pregunta: "${question}"

Opciones:
${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}

Respuesta Correcta: "${correctAnswer}"
Usuario Seleccionó: "${userAnswer}"
Nivel: ${level}

Proporciona retroalimentación educativa en JSON (en español):
{
  "explanation": "Por qué la respuesta correcta es correcta (breve, 1-2 oraciones)",
  "whyWrong": "Por qué la respuesta del usuario es incorrecta (breve, 1-2 oraciones)",
  "conceptTested": "Qué concepto gramatical/vocabulario se está evaluando",
  "hint": "Un consejo útil para recordar esto en el futuro"
}`;

    const explanationCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `Eres un profesor alentador de inglés para estudiantes de nivel ${level}. Proporciona todas las respuestas en español.` },
        { role: 'user', content: explanationPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 300
    });

    const explanationResult = JSON.parse(explanationCompletion.choices[0].message.content || '{}');

    return NextResponse.json<MultipleChoiceEvaluationResponse>({
      isCorrect: false,
      score: 0,
      confidence: 100,
      userAnswerIndex,
      correctAnswerIndex,
      feedback: '✗ No del todo correcto. Revisa la explicación a continuación.',
      explanation: explanationResult.explanation || 'La respuesta correcta se proporciona arriba.',
      whyWrong: explanationResult.whyWrong || 'Tu respuesta no coincide con la opción correcta.',
      conceptTested: explanationResult.conceptTested || 'Pregunta de opción múltiple',
      possibleTypo: false
    });

  } catch (error: any) {
    console.error('Error in multiple choice evaluation:', error);
    
    // Fallback to simple string comparison
    const isCorrect = !!(userAnswer && correctAnswer && userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim());
    
    return NextResponse.json<MultipleChoiceEvaluationResponse>({
      isCorrect,
      score: isCorrect ? 100 : 0,
      confidence: 90,
      userAnswerIndex: -1,
      correctAnswerIndex: -1,
      feedback: isCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto. La respuesta correcta es: ' + correctAnswer,
      possibleTypo: false,
      conceptTested: 'Pregunta de opción múltiple'
    });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'evaluacion-opcion-multiple',
    version: '1.0.0'
  });
}
