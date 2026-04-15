import { NextRequest, NextResponse } from 'next/server';
import { synthesizeAura2English } from '@/lib/ai/cloudflare-tts';

export const maxDuration = 30;

const GREETINGS: Record<string, Record<string, string>> = {
  emma: {
    general: "Hi there! I'm Emma, your English tutor. I'm so glad you're here to practice today! What would you like to talk about?",
    business: "Welcome! I'm Emma. Today we're going to work on your professional English. Are you ready to get started? Tell me a little about your job.",
    travel: "Hello! I'm Emma. Let's practice your travel English today. Imagine you've just arrived at a new city — what's the first thing you'd do?",
    social: "Hey! I'm Emma. We're going to have a natural conversation in English today. Don't worry about mistakes — just speak! So, how has your day been?",
  },
  james: {
    general: "Hey! I'm James. Brilliant that you're here to practice your English. Honestly, the best way to learn is just to chat, so let's dive right in! What's on your mind?",
    business: "Hello! I'm James. Right, today we're focusing on professional English. Tell me, what sort of work do you do? Let's start there.",
    travel: "Alright! I'm James. We're going to chat about travel and getting around in English-speaking countries. Have you been anywhere exciting recently?",
    social: "Hey there! James here. Today we're just going to have a good old chat in English. No pressure at all. So, tell me — what do you get up to at weekends?",
  },
  sofia: {
    general: "Good day! I'm Sofia. I'm here to help you develop structured, confident English. Let's begin with a brief introduction. Could you tell me something about yourself?",
    business: "Hello! I'm Sofia. Today we'll focus on professional communication skills. Let's start with a classic: Can you give me a brief summary of your professional background?",
    travel: "Welcome! I'm Sofia. We'll be practising the language you need for international travel. Let's begin. Describe your ideal holiday destination and why you'd choose it.",
    social: "Hello! I'm Sofia. Today we're working on conversational fluency. Let's begin with something simple: describe a typical day in your life in English.",
  },
  carlos: {
    general: "What's up! I'm Carlos, your English tutor! Get ready because we're going to have an amazing session today. Let's jump in — tell me something interesting about yourself!",
    business: "Hey, hey! I'm Carlos! Alright, today we're levelling up your professional English. Let's kick things off — what's your dream job and why? Go for it!",
    travel: "¡Hola! Wait — we're in English mode! I'm Carlos. Today we're all about travel vocabulary. Quick question: where in the world would you go if you could go anywhere tomorrow?",
    social: "Yo! I'm Carlos, your English buddy for today! We're going to have a great conversation. No stress, just fun. So — what's the best thing that happened to you this week?",
  },
};

async function textToSpeech(text: string, gender: string, accountId: string, apiToken: string): Promise<Buffer> {
  const speaker = gender === 'female' ? 'luna' : 'orion';
  const { body } = await synthesizeAura2English(text, accountId, apiToken, speaker);
  return Buffer.from(body);
}

export async function POST(request: NextRequest) {
  try {
    const { tutorId = 'emma', tutorGender = 'female', topic = 'general' } = await request.json();

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      return NextResponse.json({ error: 'Cloudflare credentials not configured' }, { status: 500 });
    }

    const greetingMap = GREETINGS[tutorId] || GREETINGS.emma;
    const greeting = greetingMap[topic] || greetingMap.general;

    const audioBuffer = await textToSpeech(greeting, tutorGender, accountId, apiToken);
    const audioBase64 = audioBuffer.toString('base64');

    return NextResponse.json({ greeting, audioBase64 });
  } catch (error: any) {
    console.error('Greet error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
