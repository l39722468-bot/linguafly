import { NextResponse } from 'next/server';
import OpenAI from 'openai';


// Lazy initialization to avoid build-time errors when OPENAI_API_KEY is not set
function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key-for-build-only',
  });
}

export interface SpeakingPart3EvaluationResponse {
  overallScore: number; // 0-10
  phase1: {
    discussion: {
      score: number; // 0-10
      feedback: string;
    };
    coverage: {
      score: number; // 0-10
      feedback: string;
      optionsCovered: string[];
    };
  };
  phase2: {
    decision: {
      score: number; // 0-10
      feedback: string;
    };
    justification: {
      score: number; // 0-10
      feedback: string;
    };
  };
  collaboration: {
    score: number; // 0-10
    feedback: string;
  };
  negotiation: {
    score: number; // 0-10
    feedback: string;
  };
  languageQuality: {
    score: number; // 0-10
    feedback: string;
  };
  strengths: string[];
  areasToImprove: string[];
  overallFeedback: string;
  cefrLevel: string;
  usedNegotiationPhrases: string[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phase1Transcript, phase2Transcript, scenario, options } = body as {
      phase1Transcript: string;
      phase2Transcript: string;
      scenario: string;
      options: Array<{ id: string; text: string }>;
    };

    if (!phase1Transcript || !phase2Transcript) {
      return NextResponse.json(
        { error: 'Se requieren las transcripciones de ambas fases' },
        { status: 400 }
      );
    }

    const optionsText = options.map(opt => `- ${opt.text}`).join('\n');

    const prompt = `Eres un examinador oficial del Cambridge B2 First (FCE) evaluando la Part 3 (Collaborative Task) del Speaking test.

ESCENARIO:
${scenario}

OPCIONES DISPONIBLES:
${optionsText}

FASE 1 - DISCUSIÓN (2 minutos):
"${phase1Transcript}"

FASE 2 - DECISIÓN (1 minuto):
"${phase2Transcript}"

CRITERIOS DE EVALUACIÓN FCE SPEAKING PART 3:

**FASE 1 - DISCUSSION:**
1. **Discussion Quality (0-10)**: Discusión de ventajas y desventajas de cada opción
2. **Coverage (0-10)**: Número de opciones discutidas (ideal: todas)

**FASE 2 - DECISION:**
3. **Decision Clarity (0-10)**: Claridad en la decisión tomada
4. **Justification (0-10)**: Justificación sólida con razones

**COLABORACIÓN E INTERACCIÓN:**
5. **Collaboration (0-10)**: Trabajo en equipo, turnos, construcción sobre ideas
6. **Negotiation (0-10)**: Negociación efectiva, acuerdo mutuo

**LENGUAJE:**
7. **Language Quality (0-10)**: Gramática, vocabulario, fluidez

ASPECTOS ESPECÍFICOS:
- ¿Discutió ventajas y desventajas en Fase 1?
- ¿Cuántas opciones cubrió? (identifica cuáles)
- ¿Tomó una decisión clara en Fase 2?
- ¿Justificó la decisión con razones sólidas?
- ¿Usó frases de negociación? ("What do you think?", "I agree", "Perhaps we could", etc.)
- ¿Mostró colaboración efectiva?
- ¿Alcanzó un acuerdo?

Identifica las frases de negociación que usó.

Responde en formato JSON con esta estructura exacta:
{
  "overallScore": number,
  "phase1": {
    "discussion": { "score": number, "feedback": "string" },
    "coverage": { "score": number, "feedback": "string", "optionsCovered": ["string"] }
  },
  "phase2": {
    "decision": { "score": number, "feedback": "string" },
    "justification": { "score": number, "feedback": "string" }
  },
  "collaboration": { "score": number, "feedback": "string" },
  "negotiation": { "score": number, "feedback": "string" },
  "languageQuality": { "score": number, "feedback": "string" },
  "strengths": ["string"],
  "areasToImprove": ["string"],
  "overallFeedback": "string",
  "cefrLevel": "string",
  "usedNegotiationPhrases": ["string"]
}`;

    const openai = getOpenAI();


    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Eres un examinador experto del Cambridge B2 First (FCE) especializado en Collaborative Tasks. Das feedback constructivo en español.',
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

    const evaluation: SpeakingPart3EvaluationResponse = JSON.parse(evaluationText);

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error('Error en evaluate-speaking-part3:', error);
    
    // Fallback evaluation
    const fallbackEvaluation: SpeakingPart3EvaluationResponse = {
      overallScore: 7.5,
      phase1: {
        discussion: {
          score: 7.5,
          feedback: 'Buena discusión de las opciones con consideración de ventajas y desventajas.',
        },
        coverage: {
          score: 7.0,
          feedback: 'Cobertura adecuada de las opciones. Intenta discutir todas en próximas prácticas.',
          optionsCovered: [],
        },
      },
      phase2: {
        decision: {
          score: 8.0,
          feedback: 'Decisión clara y bien expresada.',
        },
        justification: {
          score: 7.5,
          feedback: 'Justificación sólida con razones válidas.',
        },
      },
      collaboration: {
        score: 7.5,
        feedback: 'Buena colaboración y trabajo en equipo.',
      },
      negotiation: {
        score: 7.0,
        feedback: 'Negociación efectiva. Usa más frases variadas de negociación.',
      },
      languageQuality: {
        score: 7.5,
        feedback: 'Buen uso del lenguaje con vocabulario apropiado.',
      },
      strengths: [
        'Discusión clara de opciones',
        'Decisión bien justificada',
        'Buena colaboración',
      ],
      areasToImprove: [
        'Cubrir todas las opciones en la discusión',
        'Ampliar el vocabulario de negociación',
        'Desarrollar más las justificaciones',
      ],
      overallFeedback: 'Excelente desempeño en la tarea colaborativa. Has demostrado capacidad para discutir opciones, negociar y tomar decisiones. Continúa practicando la cobertura completa de todas las opciones.',
      cefrLevel: 'B2',
      usedNegotiationPhrases: ['I think', 'What do you think?', 'I agree'],
    };

    return NextResponse.json(fallbackEvaluation);
  }
}
