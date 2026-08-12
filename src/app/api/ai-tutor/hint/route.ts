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
    const { messages, scenario, level } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: `You are an expert English Speaking Coach. 
          The student is in a roleplay scenario: "${scenario}" at level ${level}.
          Based on the conversation history, provide a SHORT hint or a way to continue the conversation.
          Provide 3 options:
          1. A keyword/vocabulary word.
          2. A sentence starter.
          3. A complete sentence (advanced).
          
          Format the response as a JSON object:
          {
            "keyword": "...",
            "starter": "...",
            "sentence": "..."
          }`
        },
        ...messages.slice(-5) // Send last 5 messages for context
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const hint = JSON.parse(response.choices[0].message.content || '{}');

    return NextResponse.json({
      success: true,
      hint
    });

  } catch (error: unknown) {
    console.error('Hint Generation Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
