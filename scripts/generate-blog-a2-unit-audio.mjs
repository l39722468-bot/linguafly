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
  2: {
    'walked-yesterday': 'I walked to the park yesterday.',
    'visited-last-week': 'She visited her grandmother last week.',
    'played-football': 'We played football yesterday.',
    'finished-ago': 'He finished his homework two hours ago.',
    'watched-last-night': 'They watched a film last night.',
    'cleaned-room': 'I cleaned my room yesterday.',
    'talked-two-hours': 'We talked for two hours.',
    'reading-busy-week': 'Last week I had a busy week. On Monday I walked to work because my car was broken. On Tuesday I visited my grandmother in the hospital. She was happy to see me. On Wednesday I played football with my friends. We won the match! On Thursday I finished my project at work. My boss was very happy. Yesterday I rested at home and watched a film.',
    'dialogue-yesterday': 'Hi! I want to tell you about what I did yesterday. In the morning I walked to the shop and picked up some bread. Then I visited my friend Sarah. We played cards and talked for two hours. In the afternoon I cleaned my room and finished my homework. Last night I watched a film on TV. It was very good!',
    'yesterday-routine': 'Yesterday I walked to work. In the afternoon I visited my friend. In the evening I cooked dinner and watched TV.',
    'last-weekend': 'Last weekend I walked in the park and played football. On Sunday I visited my grandmother and cooked lunch with her.',
    'practice-three': 'I walked to the shop yesterday. I visited my friend last week. I finished my homework two hours ago.',
  },
  3: {
    'went-cinema': 'I went to the cinema yesterday.',
    'saw-film': 'She saw a film last night.',
    'had-great-time': 'We had a great time at the party.',
    'made-cake': 'He made a cake for his birthday.',
    'wrote-letter': 'I wrote a letter to my friend last week.',
    'bought-dress': 'She bought a new dress yesterday.',
    'reading-weekend': 'Last weekend I had a wonderful time. On Saturday morning I went to the market and bought some fresh fruit and vegetables. Then I saw my old friend Tom at the cafe. We had coffee together and talked for hours. In the afternoon I went home and made a delicious cake for my family. My sister wrote a letter to our grandmother and I helped her with it. In the evening we saw a film on TV. It was very good!',
    'dialogue-london': 'Hi! I want to tell you about my trip last month. I went to London with my family. We had a wonderful time! On the first day we went to the British Museum. I saw many interesting things there. Then we bought some souvenirs from a shop near the museum. My sister wrote postcards to her friends. In the evening we made dinner at our hotel. It was delicious! I really enjoyed the trip.',
    'went-park': 'Last week I went to the park. I saw many people there.',
    'bought-shirt': 'Last time I went shopping I bought a new shirt and some books.',
    'made-pasta': 'Yesterday I made pasta for dinner. I had it with salad.',
    'barcelona-trip': 'Last summer I went to Barcelona. I saw the Sagrada Familia and many beautiful places. I bought some souvenirs for my family. I had a wonderful time!',
    'practice-three': 'I went to the shop yesterday. She bought a new book last week. He made a delicious dinner last night.',
  },
  4: {
    'what-did-you-do': 'What did you do yesterday?',
    'where-did-you-go': 'Where did you go last weekend?',
    'when-did-she-leave': 'When did she leave?',
    'who-did-you-see': 'Who did you see at the party?',
    'why-did-he-leave': 'Why did he leave early?',
    'how-did-it-go': 'How did the exam go?',
    'what-did-you-buy': 'What did you buy at the shop?',
    'sequence-beach': 'First I went to the beach. Then I swam. After that we had lunch. Finally we went home.',
    'reading-interview': "Last month my friend Carlos had an interview for a new job. I asked him many questions about it. First I asked what he did to prepare. He said he studied the company online. Then I asked where the interview took place. He said it was at the office in Madrid. I asked when it happened. He said last Tuesday at ten o'clock. I asked who he met there. He said he met two managers and the HR director. I asked why he wanted the job. He said because it was interesting and near his home. Finally I asked how it went. He said it went very well and he got the job!",
    'dialogue-sister': "Hi! Yesterday I had a really strange day. My sister called me in the morning and asked me many questions. First she asked what I did last weekend. I said I went to the beach. Then she asked where I went exactly. I said I went to Valencia. She asked when I left. I said I left on Sunday afternoon. She asked who I went with. I said I went with my friends Ana and Pablo. She asked why I did not tell her before. I said because I forgot! Finally she asked how the trip went. I said it was amazing!",
    'practice-four': 'What did you do last weekend? Where did you go? Who did you go with? How did the trip go?',
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
