// ============================================
// API ENDPOINT: PRE-GENERACIÓN DE EJERCICIOS
// ============================================
// POST /api/pre-generate-exercises

import { NextRequest, NextResponse } from 'next/server';
import { getExercisePreGenerator } from '@/lib/ai/exercise-pre-generator';


// ============================================
// POST - Iniciar pre-generación
// ============================================

export async function POST(request: NextRequest) {
  try {
    const preGen = getExercisePreGenerator();
    
    // Verificar si ya está corriendo
    if (preGen.isActive()) {
      const progress = preGen.getProgress();
      return NextResponse.json({
        success: false,
        message: 'Pre-generation already running',
        progress
      }, { status: 409 });
    }

    // Iniciar pre-generación en background
    preGen.start();

    return NextResponse.json({
      success: true,
      message: 'Pre-generation started in background',
      progress: preGen.getProgress()
    });

  } catch (error) {
    console.error('Error starting pre-generation:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to start pre-generation',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// ============================================
// GET - Obtener estado de pre-generación
// ============================================

export async function GET(request: NextRequest) {
  try {
    const preGen = getExercisePreGenerator();
    const progress = preGen.getProgress();
    
    return NextResponse.json({
      success: true,
      isActive: preGen.isActive(),
      progress
    });

  } catch (error) {
    console.error('Error getting pre-generation status:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to get pre-generation status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
