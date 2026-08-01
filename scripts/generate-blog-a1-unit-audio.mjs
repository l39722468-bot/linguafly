#!/usr/bin/env node
/**
 * Genera audios cortos para artículos del curso A1 (blog).
 * Requiere: pip install gTTS
 *
 * Uso:
 *   node scripts/generate-blog-a1-unit-audio.mjs --unit 1
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const CLIPS_BY_UNIT = {
  1: {
    hello: 'Hello.',
    hi: 'Hi.',
    'good-morning': 'Good morning.',
    'good-afternoon': 'Good afternoon.',
    'good-evening': 'Good evening.',
    goodbye: 'Goodbye.',
    bye: 'Bye.',
    'nice-to-meet-you': 'Nice to meet you.',
    'my-name-is': 'My name is Ana.',
    'i-am-from': 'I am from Spain.',
    'i-am-a-student': 'I am a student.',
    'how-are-you': 'How are you?',
    'i-am-fine': 'I am fine, thank you.',
    'what-is-your-name': 'What is your name?',
    'see-you-later': 'See you later.',
  },
  2: {
    he: 'He.',
    she: 'She.',
    it: 'It.',
    we: 'We.',
    they: 'They.',
    'he-is-from-spain': 'He is from Spain.',
    'she-is-spanish': 'She is Spanish.',
    'they-are-from-brazil': 'They are from Brazil.',
    'we-are-students': 'We are students.',
    'it-is-a-book': 'It is a book.',
    spain: 'Spain.',
    mexico: 'Mexico.',
    germany: 'Germany.',
    spanish: 'Spanish.',
    mexican: 'Mexican.',
    german: 'German.',
    'one-to-ten': 'One, two, three, four, five, six, seven, eight, nine, ten.',
  },
  3: {
    happy: 'Happy.',
    sad: 'Sad.',
    tired: 'Tired.',
    hungry: 'Hungry.',
    thirsty: 'Thirsty.',
    angry: 'Angry.',
    excited: 'Excited.',
    fine: "I'm fine, thank you.",
    'how-are-you': 'How are you?',
    'i-am-not-tired': 'I am not tired.',
    'she-isnt-happy': "She isn't happy.",
    'are-you-hungry': 'Are you hungry?',
    'is-he-sad': 'Is he sad?',
    'yes-i-am': 'Yes, I am.',
    'no-im-not': "No, I'm not.",
    'they-arent-tired': "They aren't tired.",
  },
  4: {
    'a-pen': 'A pen.',
    'an-apple': 'An apple.',
    'this-is-a-book': 'This is a book.',
    'that-is-a-chair': 'That is a chair.',
    'these-are-pens': 'These are pens.',
    'those-are-books': 'Those are books.',
    'what-is-this': 'What is this?',
    'it-is-a-ruler': 'It is a ruler.',
    'one-to-ten': 'One, two, three, four, five, six, seven, eight, nine, ten.',
    red: 'Red.',
    blue: 'Blue.',
    green: 'Green.',
    black: 'Black.',
    pen: 'Pen.',
    pencil: 'Pencil.',
    book: 'Book.',
    notebook: 'Notebook.',
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

const outDir = path.join(process.cwd(), 'public/audio/blog/curso-a1', `unit-${unit}`);
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
`;

execSync(`python3 -c ${JSON.stringify(py)}`, { stdio: 'inherit' });
console.log(`\n✅ Audios listos en ${outDir}`);
