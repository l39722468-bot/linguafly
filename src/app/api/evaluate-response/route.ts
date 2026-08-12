import { NextRequest, NextResponse } from 'next/server';
import { evaluateWithAI } from '@/lib/ai/evaluator';
import { CEFRLevel } from '@/lib/exercise-types';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, userResponse, level, type } = body;

    if (!prompt || !userResponse || !level || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const evaluation = await evaluateWithAI(
      prompt,
      userResponse,
      level as CEFRLevel,
      type as 'writing' | 'speaking'
    );

    return NextResponse.json({
      success: true,
      evaluation
    });
  } catch (error: any) {
    console.error('API Error (evaluate-response):', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error interno al evaluar la respuesta' },
      { status: 500 }
    );
  }
}
