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
  5: {
    'taller-than': 'My brother is taller than me.',
    'more-interesting': 'This book is more interesting than that one.',
    'hotter-than': 'Summer is hotter than winter.',
    'more-expensive': 'My car is more expensive than yours.',
    'more-interesting-city': 'Our city is more interesting than the village.',
    'more-difficult': 'This exercise is more difficult than the last.',
    'better-than': 'This film is better than the other.',
    'better-camera': 'The new phone has a better camera than the old one.',
    'worse-than': 'Today the weather is worse than yesterday.',
    'as-tall-as': 'She is as tall as her sister.',
    'reading-sisters': "My name is Laura and I have two sisters. My older sister Maria is taller than me and she has longer hair than I do. My younger sister Sofia is shorter than both of us but she is faster than us when we run. Our house is bigger than our grandmother's house but grandmother's garden is more beautiful than ours. I think our city is more interesting than the village where grandmother lives but the village is quieter than the city.",
    'dialogue-phones': 'Hi! I want to tell you about my two phones. I have an old phone and a new one. The new phone is bigger than the old one but the old one is lighter than the new one. The new phone has a better camera than the old one. The battery is more powerful than before. I think the new phone is more expensive than the old one but it is much more useful than that one. Overall I prefer the new one because it is faster than my old phone.',
    'city-valencia': 'My city is bigger than Valencia. Valencia is more beautiful than my city.',
    'summer-winter': 'Summer is hotter than winter. Winter is colder than summer.',
    'books-films': 'Reading books is more interesting than watching films for me. Books are better because you use your imagination more.',
    'practice-three': 'My brother is taller than me. This phone is more expensive than that one. She is as tall as her sister.',
  },
  6: {
    'highest-mountain': 'Mount Everest is the highest mountain in the world.',
    'most-intelligent': 'She is the most intelligent student in the class.',
    'coldest-day': 'This is the coldest day of the year.',
    'tallest-boy': 'He is the tallest boy in the school.',
    'most-interesting-book': 'This is the most interesting book I have ever read.',
    'most-beautiful-film': 'This is the most beautiful film I have ever seen.',
    'best-film': 'This is the best film I have ever seen.',
    'best-restaurant': 'The best restaurant in town serves the most delicious food.',
    'hottest-month': 'July is the hottest month of the year.',
    'biggest-of-towns': 'The main square is the biggest of all the towns near.',
    'reading-hometown': "My hometown is small but beautiful. It has the oldest church in the region. The main square is the biggest of all the towns near. In summer, July is the hottest month of the year. My grandmother lives in the tallest building in town. She says it is the most beautiful view she has ever seen. The best restaurant in town serves the most delicious food. I think my hometown is the best place in the world!",
    'dialogue-park': 'Hi! Today I want to tell you about my favourite place in the city. It is the biggest park in town. It has the tallest trees I have ever seen. In the centre there is a lake with the most beautiful swans. The best time to visit is early in the morning when it is the quietest. My sister says it is the most peaceful place in the world. I agree!',
    'beautiful-park': 'The most beautiful place in my city is the main park. It has the tallest trees and the best view.',
    'coldest-hottest': 'The coldest month in my country is January. The hottest is August.',
    'city-summary': 'My city has the biggest park in the region. The oldest church is in the centre. The best restaurant serves the most delicious food. I think my city is the most beautiful place in the world!',
    'practice-three': 'The tallest person in my family is my brother. The best restaurant in my town is called La Luna. It is the most peaceful place in the world.',
  },
  7: {
    'runs-quickly': 'She runs quickly.',
    'speaks-slowly': 'He speaks slowly because he is tired.',
    'work-carefully': 'They work carefully.',
    'speaks-fluently': 'She speaks English fluently.',
    'sang-beautifully': 'She sang beautifully at the concert.',
    'speak-quietly': 'Please speak quietly in the library.',
    'sings-well': 'She sings well.',
    'played-badly': 'He played badly in the match.',
    'works-hard': 'He works hard every day.',
    'reading-maria': 'My friend Maria speaks English very fluently. She learned quickly because she practises every day. She reads books slowly to understand everything well. Last week she sang beautifully at the concert. The audience clapped loudly. Maria also writes carefully and she never makes mistakes. She drives very carefully too. I think she does everything well!',
    'dialogue-dance': "Hi! Yesterday I went to a dance class. The teacher moved very quickly and we had to follow him. At first I danced badly because I couldn't remember the steps. But the teacher explained everything slowly and patiently. Then I practised carefully and by the end I danced well! My friend sang beautifully at the karaoke after. We had a great time!",
    'speak-slowly-learn-quickly': 'I speak English slowly but I am learning quickly. I hope to speak fluently one day.',
    'homework-drove': 'Yesterday I finished my homework quickly. Then I drove slowly to the shop.',
    'study-work-drive': 'I study carefully every day. I work hard at my job. I drive slowly in the city. I speak English fluently now. I do everything well!',
    'practice-four': 'She runs quickly. She sings well. He played badly. They work carefully.',
  },
  8: {
    'at-seven': 'I get up at 7 o\'clock every morning.',
    'on-monday': 'I have a meeting on Monday.',
    'in-august': 'We go on holiday in August.',
    'at-midnight': 'The film starts at midnight.',
    'on-fifteenth': 'My birthday is on the 15th of March.',
    'in-1990': 'I was born in 1990.',
    'at-noon': 'I have lunch at noon.',
    'in-the-morning': 'We meet in the morning.',
    'at-night': 'I sleep at night.',
    'at-the-weekend': 'At the weekend I relax.',
    'in-summer': 'We go to the beach in summer.',
    'reading-tom': 'My name is Tom and I have a busy week. On Monday and Wednesday I go to work at 8 o\'clock in the morning. On Tuesday I have a meeting at noon. On Friday I finish early at 3 pm and I go to the gym. At the weekend I relax. On Saturday morning I sleep until 10 o\'clock. In the afternoon I meet my friends. In summer I go on holiday in August.',
    'dialogue-typical-day': 'Hi! I want to tell you about my typical day. I wake up at 6 o\'clock in the morning. I have breakfast at 7 am. On weekdays I start work at 9 o\'clock. I have lunch at noon. In the afternoon I have meetings. On Saturday I sleep until 10 o\'clock and I meet my friends in the evening. In December I go on holiday for two weeks.',
    'breakfast-morning': 'I have breakfast at 8 o\'clock in the morning.',
    'meeting-friday': 'The meeting is on Friday at 3 pm.',
    'beach-summer': 'We go to the beach in summer.',
    'practice-four': 'I wake up at 6 o\'clock. I work on Monday. I was born in 1990. We meet in the morning.',
  },
  9: {
    'went-into-room': 'She went into the room and closed the door.',
    'ran-out-of': 'He ran out of the building when he heard the fire alarm.',
    'walked-through-park': 'We walked through the park to get to the other side.',
    'ran-across-street': 'The cat ran across the street to the other side.',
    'put-into-bag': 'I put the books into my bag.',
    'drove-through-tunnel': 'They drove through the tunnel to reach the city.',
    'got-out-of-car': 'He got out of the car and walked away.',
    'swam-across-river': 'We swam across the river.',
    'went-into-shop': 'She went into the shop to buy bread.',
    'walked-through-forest': 'We walked through the forest to reach the lake.',
    'reading-adventure': 'Yesterday I had an adventure in the city. First I went into an old bookshop to buy a book. Then I walked through the park to get to the other side. I saw many people running across the bridge. When I came out of the park I crossed the street and went into a cafe. I had coffee and read my new book. It was a great day!',
    'dialogue-museum': 'Hi! Last weekend I went to the museum. I went into the main entrance and walked through several rooms. First I saw the paintings and then I walked across the courtyard to get to the sculpture section. When I came out of the museum I crossed the street and went into a cafe for coffee. I really enjoyed the day!',
    'practice-four': 'She went into the room. He ran out of the building. We walked through the park. The cat ran across the street.',
  },
  10: {
    'walked-yesterday': 'I walked to the park yesterday.',
    'went-london': 'She went to London last year.',
    'taller-than': 'My brother is taller than me.',
    'the-tallest': 'She is the tallest girl in the class.',
    'speaks-fluently': 'She speaks English fluently.',
    'at-seven': 'I get up at 7 o\'clock every morning.',
    'went-into-room': 'She went into the room and closed the door.',
    'what-did-you-do': 'What did you do yesterday?',
    'got-out-of-car': 'I got out of the car and walked away.',
    'on-monday': 'I have a meeting on Monday.',
    'went-cinema': 'I went to the cinema yesterday.',
    'breakfast-morning': 'I have breakfast at 8 o\'clock in the morning.',
    'reading-anna': 'My name is Anna and I have a busy life. I get up at 7 o\'clock in the morning on weekdays. Last weekend I went to the museum. I went into the main entrance and walked through several rooms. My sister is the tallest in our family and she speaks English very fluently. She saw a beautiful film last night and said it was the most interesting film she has ever seen. On Saturday morning I walked across the bridge to get to the other side of the river. I really enjoyed the weekend!',
    'dialogue-last-week': 'Hi! I want to tell you about my last week. On Monday I had a meeting at noon. On Tuesday I went to the cinema and saw a film. It was the most interesting film I have ever seen. On Wednesday I walked through the park and went into a cafe. I speak English fluently now because I practise every day. My brother is taller than me but I am the fastest runner in the family!',
    'practice-mixed': 'I walked to the park yesterday. She went to London last year. What did you do yesterday? My brother is taller than me. She speaks English fluently.',
  },
  11: {
    'have-been-paris': 'I have been to Paris.',
    'has-seen-film': 'She has seen that film.',
    'have-eaten-lunch': 'They have eaten lunch already.',
    'has-gone-supermarket': 'He has gone to the supermarket.',
    'have-been-london': 'We have been to London twice.',
    'have-been-italy': 'I have been to Italy.',
    'have-eaten-breakfast': 'I have eaten breakfast.',
    'has-gone-home': 'He has gone home.',
    'reading-laura': 'My name is Laura. I have been to many countries. I have seen the Eiffel Tower in Paris and the Colosseum in Rome. I have eaten Italian food and French food. Last year I went to Japan. I have never eaten such amazing sushi! My brother has gone to Australia this month. He will be back in two weeks. I love travelling and having new experiences.',
    'dialogue-tom': 'Hi! My name is Tom. I have been to Spain twice. I have seen Barcelona and Madrid. I have eaten paella and tapas. They were delicious. Last summer I went to Italy. I have never eaten better pizza! My sister has gone to London today. She will come back next week. I love travelling and trying new food.',
    'practice-four': 'I have been to Paris. She has seen that film. They have eaten lunch. He has gone to the supermarket.',
  },
  12: {
    'have-you-ever-japan': 'Have you ever been to Japan?',
    'have-never-eaten-sushi': 'I have never eaten sushi.',
    'has-she-ever-tried': 'Has she ever tried Italian food?',
    'has-never-been-beach': 'He has never been to the beach.',
    'yes-i-have': 'Yes, I have. I have been to London.',
    'no-i-havent': 'No, I haven\'t. I have never been there.',
    'have-you-ever-ridden': 'Have you ever ridden a horse?',
    'have-never-seen-snow': 'I have never seen snow.',
    'reading-classmates': 'Have you ever wondered what your friends have or haven\'t done? I asked my classmates some questions. Have you ever flown in a plane? Most of them said Yes, I have. Have you ever eaten sushi? Some said Yes and some said No, I haven\'t. Have you ever been to a concert? Many said Yes. One friend said: I have never been to a concert. I would like to go one day. It was interesting to learn about their experiences.',
    'dialogue-survey': 'Hi! I am doing a survey about experiences. Can I ask you some questions? Great! Have you ever tried sushi? Yes, I have. I tried it in Tokyo last year. It was amazing. Have you ever ridden a horse? No, I haven\'t. I would like to try one day. Have you ever been to a football match? Yes, I have. Many times! I love football. Thank you for your answers!',
    'practice-four': 'Have you ever been to Japan? I have never eaten sushi. Yes, I have. No, I haven\'t.',
  },
  13: {
    'have-already-finished': 'I have already finished my homework.',
    'havent-done-shopping-yet': 'I haven\'t done the shopping yet.',
    'has-she-cleaned-yet': 'Has she cleaned her room yet?',
    'has-already-eaten': 'He has already eaten breakfast.',
    'have-you-washed-yet': 'Have you washed the dishes yet?',
    'havent-finished-yet': 'I haven\'t finished yet.',
    'havent-called-yet': 'She hasn\'t called yet.',
    'have-already-cleaned': 'I have already cleaned my room.',
    'reading-sofia': 'My name is Sofia. I have many tasks every day. This morning I have already cleaned my room and done the washing. I have already finished my homework too. But I haven\'t paid the electricity bill yet. I must do it today. I also haven\'t called my grandmother yet. She is waiting for my call. I feel good because I have already completed most of my obligations today.',
    'dialogue-lucas': 'Hi! I am Lucas. I have a busy week. Today I have already done my chores and finished the shopping. I have already cleaned the kitchen too. But I haven\'t sent the emails yet. I must do that before dinner. I also haven\'t called my boss yet. He is waiting for my call. I feel relaxed because I have already completed most of my tasks for today.',
    'practice-four': 'I have already finished my homework. I haven\'t done the shopping yet. Has she cleaned her room yet? He has already eaten breakfast.',
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
