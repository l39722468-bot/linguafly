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
  3: {
    'had-finished': 'He had finished his homework before I arrived.',
    'had-never-been': 'She had never been to Paris before last year.',
    'film-had-started': 'By the time we arrived, the film had already started.',
    'had-forgotten-keys': 'I had forgotten my keys at home so I couldn\'t get in.',
    'train-had-left': 'When she got to the station, the train had already left.',
    'had-already-eaten': 'I had already eaten when she invited me to dinner.',
    'had-been-twice': 'She had been to London twice before she moved there.',
    'had-studied-hard': 'She had studied hard so she passed the exam.',
    'after-graduated': 'After he had graduated, he found a job.',
    'reading-japan': 'Last year I had the best trip of my life. Before I left, I had never been to Asia. I had saved money for two years and I had always dreamed of visiting Japan. When I arrived in Tokyo, I couldn\'t believe it because I had never seen such a beautiful city. By the time I left, I had visited many temples and had tried real Japanese food. That trip was a turning point in my life because I had always been afraid of travelling alone. Now I know I can overcome any challenge.',
    'dialogue-trip': 'Had you been to Asia before that trip? No — I had never been there. How long had you saved money? For two years. By the time you left, what had you done? I had visited many temples and tried real Japanese food.',
    'practice-four': 'He had finished his homework before I arrived. By the time we arrived, the film had already started. When she got to the station, the train had already left. After he had graduated, he found a job.',
  },
  4: {
    'went-yesterday': 'I went to Paris yesterday.',
    'has-never-been': 'She has never been to Japan.',
    'visited-last-week': 'They visited London last week.',
    'have-just-finished': 'I have just finished my homework.',
    'have-you-ever': 'Have you ever been to Italy?',
    'has-already-booked': 'She has already booked the hotel.',
    'have-not-finished-yet': 'They have not finished yet.',
    'went-last-night': 'I went to the cinema last night.',
    'has-lived-for': 'He has lived here for five years.',
    'when-did-you-see': 'When did you see him last?',
    'reading-travel': 'Last year I visited five countries in Europe. I have never been to Asia yet, but I am planning to go next year. Yesterday I finished reading a book about Japan. I have already booked my flight to Tokyo. I went to Paris last month and I have just received the photos. Have you ever been to Paris?',
    'dialogue-travel': 'Have you ever been to Paris? Yes — I went last month. Have you booked your flight to Tokyo yet? Yes, I have already booked it. I have just received the photos from Paris too.',
    'practice-four': 'I went to Paris yesterday. She has never been to Japan. I have just finished my homework. Have you ever been to Italy?',
  },
  5: {
    'has-been-studying': 'She has been studying for two hours.',
    'had-finished': 'He had finished his homework before I arrived.',
    'went-yesterday': 'I went to Paris yesterday.',
    'have-been-living': 'They have been living in London since January.',
    'film-had-started': 'By the time we arrived, the film had already started.',
    'has-never-been': 'She has never been to Japan.',
    'have-just-finished': 'I have just finished my report.',
    'train-had-left': 'When she got to the station, the train had already left.',
    'have-read-three': 'I have read three books this year.',
    'have-been-crying': 'Your eyes are red. You have been crying.',
    'reading-laura': 'My name is Laura and I have been working as a teacher for five years. Last year I decided to travel to Japan. I had never been to Asia before that trip. When I arrived at the airport, my flight had already left because I was delayed. I have just booked another trip for next summer. I am very excited and confident this time everything will go well.',
    'dialogue-review': 'How long have you been working as a teacher? For five years. Had you been to Asia before Japan? No — I had never been there. Have you booked another trip yet? Yes — I have just booked one for next summer.',
    'practice-four': 'She has been studying for two hours. He had finished before I arrived. I went to Paris yesterday. She has never been to Japan.',
  },
  6: {
    'am-going-to-visit': 'I am going to visit my parents next weekend.',
    'will-rain': 'I think it will rain tomorrow.',
    'is-meeting': 'She is meeting her boss at three PM.',
    'will-help': 'Wait, I will help you.',
    'going-to-rain': 'Look at the clouds! It is going to rain.',
    'are-flying': 'We are flying to Rome on Friday.',
    'will-call': 'I promise I will call you when I arrive.',
    'is-going-to-take': 'He is going to take the train tomorrow.',
    'flight-departs': 'The flight departs at ten AM.',
    'are-having-meeting': 'They are having a meeting tomorrow at nine.',
    'reading-tokyo': 'Next month I am flying to Tokyo for a business trip. I have already booked my flight and hotel. I am meeting my colleagues at the airport at six AM. The plane takes off at eight o\'clock. I think I will enjoy the trip because I love travelling. I am going to visit some temples if I have time.',
    'dialogue-travel': 'What are you going to do next month? I am flying to Tokyo for work. Are you meeting anyone there? Yes — I am meeting my colleagues at the airport at six. I think I will enjoy the trip. I am going to visit some temples if I have time.',
    'practice-four': 'I am going to visit my parents next weekend. I think it will rain tomorrow. We are flying to Rome on Friday. Wait, I will help you.',
  },
  7: {
    'was-going-to-call': 'I was going to call you yesterday but I forgot.',
    'were-going-to-travel': 'They were going to travel to Spain last summer but cancelled.',
    'was-going-to-study': 'She was going to study medicine but changed her mind.',
    'wasnt-going-to-attend': "She wasn't going to attend the meeting but changed her mind.",
    'were-you-going-to': 'What were you going to do before the rain started?',
    'reading-japan': "Last year I was going to travel to Japan for my birthday. I had already booked the flight and hotel, but then I changed my mind because I got a new job. My friend was going to come with me too, but she had to postpone her trip. We were going to visit Tokyo and Kyoto. I was going to learn some Japanese before the trip, but I never had time. Maybe next year we will go.",
    'dialogue-plans': "Were you going to travel last year? Yes — I was going to go to Japan, but I got a new job. Was your friend going to come with you? Yes, but she had to postpone. We were going to visit Tokyo and Kyoto. Maybe next year?",
    'practice-four': "I was going to call you yesterday but I forgot. They were going to travel but cancelled. She was going to study medicine but changed her mind. We were going to watch a film but we were too tired.",
  },
  8: {
    'must-be-happy': 'She must be happy — she just got promoted.',
    'must-be-at-home': 'They must be at home — the lights are on.',
    'must-be-tired': 'He must be tired — he has been working all day.',
    'might-have-left': 'I might have left my keys at the office.',
    'might-rain': 'It might rain tomorrow — the forecast says so.',
    'cant-be-him': "That can't be him — he is in Paris this week.",
    'cant-be-angry': "She can't be angry — she never gets angry.",
    'reading-neighbour': "I think my neighbour must be very happy these days — I saw him moving into a new house last week. He might have got a promotion at work because he looks more confident. His wife can't be angry with him — they always walk together in the park smiling. She must feel relieved about the move too. I might invite them for coffee sometime to congratulate them.",
    'dialogue-feelings': "Why do you think he's happy? He must be — he just moved into a new house. Do you think he got a promotion? He might have — he looks more confident. Is his wife angry? She can't be — they walk in the park smiling.",
    'practice-four': "She must be happy. That can't be him. I might have left my keys. They must be at home. She can't be angry.",
  },
  9: {
    'used-to-play': 'I used to play football when I was young.',
    'used-to-live': 'I used to live in a small village.',
    'didnt-use-to': "I didn't use to like coffee but now I love it.",
    'is-used-to-living': 'She is used to living in a big city.',
    'are-used-to-getting-up': 'We are used to getting up early.',
    'get-used-to-living': 'It took me a few months to get used to living here.',
    'getting-used-to': 'I am getting used to working from home now.',
    'got-used-to-cold': 'They got used to the cold weather after a few months.',
    'reading-village': "I used to live in a small village when I was young. I used to walk to school every day and play in the fields after class. Now I live in a big city and I am used to the noise and the busy lifestyle. It took me a few months to get used to living here. I used to hate traffic but now I don't mind it. My parents used to visit me every weekend but they live far now.",
    'dialogue-habits': "Did you use to live in a village? Yes — I used to walk to school every day. Are you used to the city now? Yes. It took a few months to get used to the noise. Do you still hate traffic? No — I used to hate it, but now I don't mind it.",
    'practice-four': "I used to play football. She is used to living in a big city. It took me months to get used to living here. I didn't use to like coffee.",
  },
  10: {
    'future-review': 'I am going to visit my parents next weekend. Wait, I will help you. She is meeting her boss at three PM. Look at the clouds! It is going to rain. We are flying to Rome on Friday.',
    'was-going-to-review': 'I was going to call you yesterday but I forgot. They were going to travel to Spain last summer but cancelled.',
    'modals-review': "She must be happy — she just got promoted. That can't be him — he is in Paris this week. I might have left my keys at the office. They must be at home — the lights are on.",
    'used-to-review': 'I used to play football when I was young. She is used to living in a big city. It took me a few months to get used to living here. They got used to the cold weather after a few months.',
    'practice-mix': "I am going to visit my parents next weekend. She must be happy. I used to play football. I was going to call you but I forgot. We are flying to Rome on Friday. That can't be him.",
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
