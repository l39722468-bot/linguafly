#!/usr/bin/env node
/**
 * Genera audios cortos para artículos del curso B1 (blog).
 * Requiere: pip install gTTS
 *
 * Uso:
 *   node scripts/generate-blog-b1-unit-audio.mjs --unit=1
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const CLIPS_BY_UNIT = {
  1: {
    'i-have-lived': 'I have lived here for three years.',
    'she-has-never-been': 'She has never been to Japan.',
    'more-expensive': 'This hotel is more expensive than that one.',
    'you-must-wear': 'You must wear a seatbelt in the car.',
    'going-to-visit': 'Next weekend I am going to visit my parents.',
    'who-helped': 'The man who helped me was very kind.',
    'have-to-work': 'I have to work early tomorrow.',
    'has-been-studying': 'She has been studying since nine o\'clock.',
    'if-it-rains': 'If it rains tomorrow, I will stay at home.',
    'had-finished': 'He had finished his homework before I arrived.',
    'used-to-play': 'I used to play tennis when I was young.',
    'which-bought': 'The book which I bought is very interesting.',
    'i-feel-confident': 'I feel much more confident now.',
    'i-felt-anxious': 'At first I felt very nervous and anxious.',
    'reading-maria': 'My name is Maria and I am from Spain. I have been living in London for two years because I work as a journalist. At first I felt very nervous and anxious because I didn\'t know anyone. But now I have many friends and I feel much more confident. I used to miss my family a lot, but I got used to living alone. My sister is an architect and she is very proud of her job. We both love travelling and we have visited many countries together.',
    'dialogue-feelings': 'How do you feel about moving abroad? At first I felt anxious, but now I feel confident. Are you proud of your degree? Yes — and I\'m satisfied with my new job. That\'s amazing!',
    'practice-four': 'I have lived here for three years. She has never been to Japan. You must wear a seatbelt. I used to play tennis when I was young.',
  },
  2: {
    'she-has-been-studying': 'She has been studying for two hours.',
    'they-have-been-working': 'They have been working on the project all day.',
    'for-three-years': 'I have been learning English for three years.',
    'since-2019': 'He has been teaching since 2019.',
    'has-been-gardening': 'Her hands are dirty. She has been gardening.',
    'how-long': 'How long have you been studying here?',
    'have-read-three': 'I have read three books this year.',
    'have-been-crying': 'Your eyes are red. You have been crying.',
    'has-written-ten': 'She has written ten emails today.',
    'it-has-been-raining': 'It has been raining since this morning.',
    'reading-james': 'My name is James and I have been studying English for five years. I started when I was at secondary school and I have been improving ever since. I am currently doing a degree in Engineering at the university and I have been attending English classes since September. My teacher has been teaching here for ten years and she is very patient. I have been working on my pronunciation for months and I think I am getting better.',
    'dialogue-study': 'How long have you been studying English? For five years. Have you been attending classes this term? Yes — since September. I have also been working on my pronunciation. That\'s great. Have you passed any exams? Yes — I passed two last term.',
    'practice-four': 'She has been studying for two hours. I have been learning English for three years. How long have you been studying here? She has written ten emails today.',
  },
};

const unitArg = process.argv.find((a) => a.startsWith('--unit='))?.split('=')[1]
  ?? process.argv[process.argv.indexOf('--unit') + 1];
const unit = Number(unitArg || '1');
const clips = CLIPS_BY_UNIT[unit];

if (!clips) {
  console.error(`No hay clips definidos para la unidad ${unit}`);
  process.exit(1);
}

const outDir = path.join(process.cwd(), 'public/audio/blog/curso-b1', `unit-${unit}`);
fs.mkdirSync(outDir, { recursive: true });

const py = `
from gtts import gTTS
import os
out = ${JSON.stringify(outDir)}
clips = ${JSON.stringify(clips)}
for name, text in clips.items():
    path = os.path.join(out, f"{name}.mp3")
    if not os.path.exists(path):
        gTTS(text=text, lang='en', tld='com').save(path)
        print('created', path)
    else:
        print('exists', path)
`.trimStart();

fs.writeFileSync('/tmp/generate-blog-b1-audio.py', py);
execSync('python3 /tmp/generate-blog-b1-audio.py', { stdio: 'inherit' });
console.log(`\n✅ Audios listos en ${outDir}`);
