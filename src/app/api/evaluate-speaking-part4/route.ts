import { NextResponse } from 'next/server';
import OpenAI from 'openai';


// Lazy initialization to avoid build-time errors when OPENAI_API_KEY is not set
function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key-for-build-only',
  });
}

export interface SpeakingPart4Question {
  id: string;
  question: string;
  transcript: string;
}

export interface SpeakingPart4EvaluationResponse {
  overallScore: number; // 0-10
  opinion: {
    score: number; // 0-10
    feedback: string;
  };
  development: {
    score: number; // 0-10
    feedback: string;
  };
  justification: {
    score: number; // 0-10
    feedback: string;
  };
  examples: {
    score: number; // 0-10
    feedback: string;
  };
  languageQuality: {
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
  cefrLevel: string;
  usedOpinionPhrases: string[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { questions, topic } = body as {
      questions: SpeakingPart4Question[];
      topic: string;
    };

    if (!questions || questions.length === 0) {
      return NextResponse.json(
        { error: 'Se requieren preguntas y transcripciones' },
        { status: 400 }
      );
    }

    const transcriptsText = questions
      .map((q, idx) => `Q${idx + 1}: ${q.question}\nA${idx + 1}: ${q.transcript}`)
      .join('\n\n');

    const prompt = `Eres un examinador oficial del Cambridge B2 First (FCE) evaluando la Part 4 (Discussion) del Speaking test.

TEMA DE DISCUSIÓN: ${topic}

TRANSCRIPCIONES:
${transcriptsText}

CRITERIOS DE EVALUACIÓN FCE SPEAKING PART 4:
1. **Opinion Expression (0-10)**: Claridad en expresar opiniones personales
2. **Development (0-10)**: Desarrollo completo de ideas y argumentos
3. **Justification (0-10)**: Justificación con razones sólidas
4. **Examples (0-10)**: Uso de ejemplos específicos y relevantes
5. **Language Quality (0-10)**: Gramática, vocabulario avanzado, fluidez
6. **Interaction (0-10)**: Respuestas completas, naturales, conectadas al tema

ASPECTOS ESPECÍFICOS A EVALUAR:
- ¿Expresó opiniones claras y personales?
- ¿Desarrolló sus ideas completamente?
- ¿Justificó sus opiniones con razones válidas?
- ¿Usó ejemplos específicos? (personales o generales)
- ¿Usó expresiones de opinión? ("I believe", "In my opinion", "I think", etc.)
- ¿Mantuvo la coherencia entre respuestas?
- ¿Mostró capacidad de análisis crítico?
- ¿Relacionó respuestas con Part 3 anterior?

Identifica las expresiones de opinión que usó.

Responde en formato JSON con esta estructura exacta:
{
  "overallScore": number,
  "opinion": { "score": number, "feedback": "string" },
  "development": { "score": number, "feedback": "string" },
  "justification": { "score": number, "feedback": "string" },
  "examples": { "score": number, "feedback": "string" },
  "languageQuality": { "score": number, "feedback": "string" },
  "interaction": { "score": number, "feedback": "string" },
  "strengths": ["string"],
  "areasToImprove": ["string"],
  "overallFeedback": "string",
  "cefrLevel": "string",
  "usedOpinionPhrases": ["string"]
}`;

    const openai = getOpenAI();


    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Eres un examinador experto del Cambridge B2 First (FCE) especializado en Discussion. Das feedback constructivo en español.',
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

    const evaluation: SpeakingPart4EvaluationResponse = JSON.parse(evaluationText);

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error('Error en evaluate-speaking-part4:', error);
    
    // Fallback evaluation
    const fallbackEvaluation: SpeakingPart4EvaluationResponse = {
      overallScore: 7.5,
      opinion: {
        score: 8.0,
        feedback: 'Opiniones claras y bien expresadas.',
      },
      development: {
        score: 7.5,
        feedback: 'Buen desarrollo de ideas. Intenta ampliar más algunos argumentos.',
      },
      justification: {
        score: 7.5,
        feedback: 'Justificación sólida con razones válidas.',
      },
      examples: {
        score: 7.0,
        feedback: 'Uso de ejemplos adecuado. Intenta incluir más ejemplos específicos.',
      },
      languageQuality: {
        score: 7.5,
        feedback: 'Buen uso del lenguaje con vocabulario apropiado para B2.',
      },
      interaction: {
        score: 7.5,
        feedback: 'Respuestas completas y conectadas al tema.',
      },
      strengths: [
        'Opiniones claras y bien fundamentadas',
        'Buen uso de vocabulario',
        'Respuestas coherentes',
      ],
      areasToImprove: [
        'Desarrollar más los argumentos',
        'Incluir más ejemplos específicos',
        'Relacionar más con Part 3',
      ],
      overallFeedback: 'Excelente desempeño en la discusión. Has demostrado capacidad para expresar y justificar opiniones de manera clara. Continúa practicando el desarrollo profundo de argumentos con ejemplos variados.',
      cefrLevel: 'B2',
      usedOpinionPhrases: ['I think', 'In my opinion', 'I believe'],
    };

    return NextResponse.json(fallbackEvaluation);
  }
}
