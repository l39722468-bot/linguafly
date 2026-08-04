#!/usr/bin/env node
/**
 * Genera audios cortos para artículos del curso A2 (blog).
 * Requiere: pip install gTTS
 *
 * Uso:
 *   node scripts/generate-blog-a2-unit-audio.mjs --unit=1
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const CLIPS_BY_UNIT = {
  1: {
    'my-name-is-ana': 'My name is Ana. I am from Madrid.',
    'hometown-madrid': 'My hometown is Madrid.',
    'quiet-neighbourhood': 'I live in a quiet neighbourhood with many parks and cafes.',
    'favourite-hobby-reading': 'My favourite hobby is reading books.',
    'i-am-a-teacher': 'I am a teacher. I teach English at a small school.',
    'nice-to-meet-you': 'Nice to meet you!',
    'i-am-happy': 'I am happy to be here.',
    'she-lives-flat': 'She lives in a small flat.',
    'he-lives-london': 'He lives in London.',
    'favourite-colour': 'My favourite colour is blue.',
    'playing-football': 'My favourite hobby is playing football.',
    'reading-maria': 'Hello! My name is Maria. I am twenty-eight years old. My hometown is Madrid, Spain. I live in a quiet neighbourhood with many parks and cafes. My favourite hobby is reading books. I also love walking in my neighbourhood. I am a teacher. I teach English at a small school. Nice to meet you!',
    'dialogue-carlos': 'Hi! My name is Carlos. I am from Barcelona, Spain. I am twenty-five years old. My hometown is Barcelona. I live in a nice neighbourhood near the beach. My favourite hobby is playing football. I am a student. I study at the university. I am happy to be here. Nice to meet you!',
    'practice-intro': 'Hello! My name is Ana. I am twenty-two years old. My hometown is Valencia. I live in a quiet neighbourhood. My favourite hobby is swimming. I am a student. Nice to meet you!',
    'what-favourite-hobby': 'What is your favourite hobby?',
    'where-hometown': 'Where is your hometown?',
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

const outDir = path.join(process.cwd(), 'public/audio/blog/curso-a2', `unit-${unit}`);
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

fs.writeFileSync('/tmp/generate-blog-a2-audio.py', py);
execSync('python3 /tmp/generate-blog-a2-audio.py', { stdio: 'inherit' });
console.log(`\n✅ Audios listos en ${outDir}`);
