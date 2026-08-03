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
  5: {
    'i-work-every-day': 'I work every day.',
    'she-works-in-an-office': 'She works in an office.',
    'he-eats-breakfast': 'He eats breakfast.',
    'they-play-football': 'They play football.',
    'we-study-english': 'We study English.',
    work: 'Work.',
    study: 'Study.',
    eat: 'Eat.',
    drink: 'Drink.',
    sleep: 'Sleep.',
    play: 'Play.',
    'wake-up': 'Wake up.',
    'get-up': 'Get up.',
    'go-to-work': 'Go to work.',
    'every-morning': 'Every morning.',
    'i-get-up-at-seven': 'I get up at seven.',
  },
  6: {
    mother: 'Mother.',
    father: 'Father.',
    brother: 'Brother.',
    sister: 'Sister.',
    grandmother: 'Grandmother.',
    'this-is-my-mother': 'This is my mother.',
    'his-name-is-robert': 'His name is Robert.',
    'her-name-is-sarah': 'Her name is Sarah.',
    'our-family-is-big': 'Our family is big.',
    'robert-name': "Robert's name is Robert.",
    'fathers-name': "My father's name.",
    'i-have-one-brother': 'I have one brother and two sisters.',
    'do-you-have-brothers': 'Do you have brothers or sisters?',
    'grandmother-eighty': 'My grandmother is eighty years old.',
    'her-father-doctor': 'Her father is a doctor.',
  },
  7: {
    red: 'Red.',
    blue: 'Blue.',
    green: 'Green.',
    yellow: 'Yellow.',
    black: 'Black.',
    brown: 'Brown.',
    'the-car-is-red': 'The car is red.',
    'the-sky-is-blue': 'The sky is blue.',
    'she-is-tall': 'She is tall.',
    'he-is-short': 'He is short.',
    'she-is-young': 'She is young.',
    'she-has-long-brown-hair': 'She has got long brown hair.',
    'he-has-blue-eyes': 'He has blue eyes.',
    'they-have-green-eyes': 'They have green eyes.',
    'she-is-tall-with-long-hair': 'She is tall with long brown hair.',
    'her-eyes-are-green': 'Her eyes are green.',
    'she-is-very-beautiful': 'She is very beautiful.',
    'what-colour-are-her-eyes': 'What colour are her eyes?',
    'my-brother-is-short': 'My brother is short and young.',
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
`.trimStart();

fs.writeFileSync('/tmp/generate-blog-a1-audio.py', py);
execSync('python3 /tmp/generate-blog-a1-audio.py', { stdio: 'inherit' });
console.log(`\n✅ Audios listos en ${outDir}`);
