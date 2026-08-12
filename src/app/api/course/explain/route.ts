import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OPENAI_API_KEY is not configured' }, { status: 500 });
  }

  try {
    const { interaction } = await req.json();
    const id = interaction?.id || interaction?.interaction_id;

    if (!interaction || !id) {
      return NextResponse.json({ error: 'Interaction data with ID is required' }, { status: 400 });
    }

    const systemPrompt = `Eres un tutor de inglés experto para hispanohablantes. 
Tu tarea es explicar de forma clara, concisa y pedagógica por qué la respuesta correcta a un ejercicio es la que es.

Contexto del ejercicio:
- Tipo: ${interaction.type}
- Enunciado (ES): ${interaction.prompt_es || 'No disponible'}
- Estímulo (EN): ${interaction.stimulus_en || 'No disponible'}
- Respuesta Correcta: ${interaction.correct_answer || 'No disponible'}

Instrucciones:
1. Escribe en español.
2. Sé breve (máximo 2-3 frases).
3. Enfócate en la regla gramatical o el matiz de vocabulario clave.
4. Si hay una confusión común (ej. falsos amigos), menciónala brevemente.
5. No des la bienvenida ni uses introducciones innecesarias. Ve directo al grano.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: "Explícame este ejercicio." }
      ],
      temperature: 0.5,
    });

    const explanation = response.choices[0].message.content?.trim() || 'No se pudo generar una explicación.';

    return NextResponse.json({
      success: true,
      explanation,
      cached: false
    });

  } catch (error: unknown) {
    console.error('Explanation Generation Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
