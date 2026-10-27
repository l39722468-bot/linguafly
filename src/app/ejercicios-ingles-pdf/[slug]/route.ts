import { NextResponse } from "next/server";

type Item = { question: string; answer: string };
type Pack = { slug: string; title: string; level: "A1" | "A2"; count: number; instruction: string; items: Item[] };

const packs: Pack[] = [
  { slug: "present-simple", title: "Present Simple", level: "A1", count: 10, instruction: "Complete each sentence with the correct present simple form.", items: [
    { question: "I ___ (work) in a cafe.", answer: "work" }, { question: "She ___ (like) music.", answer: "likes" }, { question: "They ___ (live) near school.", answer: "live" }, { question: "Tom ___ (play) football on Saturdays.", answer: "plays" }, { question: "We ___ (study) English every day.", answer: "study" }, { question: "My brother ___ (watch) TV after dinner.", answer: "watches" }, { question: "You ___ (go) to work by bus.", answer: "go" }, { question: "Anna ___ (have) two cats.", answer: "has" }, { question: "The shop ___ (open) at nine.", answer: "opens" }, { question: "I ___ (drink) tea in the morning.", answer: "drink" }, { question: "He ___ (not like) coffee.", answer: "doesn't like" }, { question: "We ___ (not work) on Sundays.", answer: "don't work" }, { question: "___ you ___ (speak) English?", answer: "Do; speak" }, { question: "___ she ___ (drive) to work?", answer: "Does; drive" }, { question: "My parents ___ (cook) dinner together.", answer: "cook" }, { question: "The bus ___ (arrive) at eight.", answer: "arrives" }, { question: "Lucy ___ (not eat) meat.", answer: "doesn't eat" }, { question: "Where ___ they ___ (live)?", answer: "do; live" }, { question: "Peter ___ (wash) his car every week.", answer: "washes" }, { question: "I usually ___ (finish) at five.", answer: "finish" }, { question: "She ___ (teach) maths.", answer: "teaches" }, { question: "___ he ___ (need) help?", answer: "Does; need" }, { question: "Birds ___ (fly).", answer: "fly" }, { question: "My phone ___ (not work).", answer: "doesn't work" }, { question: "How often ___ you ___ (read)?", answer: "do; read" }, { question: "Mark ___ (carry) a small bag.", answer: "carries" }, { question: "Our lessons ___ (start) at ten.", answer: "start" }, { question: "Sarah ___ (go) swimming on Fridays.", answer: "goes" }, { question: "I ___ (not watch) the news.", answer: "don't watch" }, { question: "What time ___ the film ___ (begin)?", answer: "does; begin" }
  ]},
  { slug: "verb-to-be", title: "Verb to Be", level: "A1", count: 10, instruction: "Complete each sentence with am, is, are, isn't, or aren't.", items: [
    {question:"I ___ from Spain.",answer:"am"},{question:"She ___ my sister.",answer:"is"},{question:"They ___ at home.",answer:"are"},{question:"We ___ tired today.",answer:"are"},{question:"He ___ a teacher.",answer:"is"},{question:"You ___ late.",answer:"are"},{question:"It ___ cold today.",answer:"is"},{question:"I ___ not hungry.",answer:"am"},{question:"The books ___ on the table.",answer:"are"},{question:"My name ___ Alex.",answer:"is"},{question:"Maria ___ 20 years old.",answer:"is"},{question:"We ___ not from London.",answer:"are"},{question:"The dog ___ very friendly.",answer:"is"},{question:"I ___ happy to meet you.",answer:"am"},{question:"My friends ___ in class.",answer:"are"},{question:"This ___ my house.",answer:"is"},{question:"You ___ not alone.",answer:"are"},{question:"The shops ___ open.",answer:"are"},{question:"He ___ not my brother.",answer:"is"},{question:"How old ___ you?",answer:"are"},{question:"Where ___ she from?",answer:"is"},{question:"___ they ready?",answer:"Are"},{question:"I ___ a student.",answer:"am"},{question:"The weather ___ nice.",answer:"is"},{question:"Our teacher ___ very kind.",answer:"is"},{question:"These shoes ___ new.",answer:"are"},{question:"The children ___ at school.",answer:"are"},{question:"It ___ not difficult.",answer:"is"},{question:"___ your parents at work?",answer:"Are"},{question:"What ___ your phone number?",answer:"is"}
  ]},
  { slug: "articles-pronouns-plurals", title: "Articles, Pronouns and Plurals", level: "A1", count: 10, instruction: "Choose the correct word or write the plural form.", items: [
    {question:"I have ___ apple. (a / an)",answer:"an"},{question:"This is ___ book. (a / an)",answer:"a"},{question:"Maria is my friend. ___ is kind. (He / She)",answer:"She"},{question:"Tom and I are students. ___ study English. (We / They)",answer:"We"},{question:"One box, two ___.",answer:"boxes"},{question:"One child, two ___.",answer:"children"},{question:"This is ___ orange. (a / an)",answer:"an"},{question:"The boys have ___ bags. (their / his)",answer:"their"},{question:"One city, two ___.",answer:"cities"},{question:"I see Peter. I see ___. (he / him)",answer:"him"},{question:"One watch, two ___.",answer:"watches"},{question:"She has ___ umbrella. (a / an)",answer:"an"},{question:"This is my sister. ___ name is Eva.",answer:"Her"},{question:"One person, two ___.",answer:"people"},{question:"Paul and Sam are here. ___ are happy.",answer:"They"},{question:"One class, two ___.",answer:"classes"},{question:"Is this ___ pen? (your / you)",answer:"your"},{question:"One tomato, two ___.",answer:"tomatoes"},{question:"I am with Anna. Come with ___.",answer:"me"},{question:"One baby, two ___.",answer:"babies"},{question:"He is ___ engineer. (a / an)",answer:"an"},{question:"The cat is small. ___ is black.",answer:"It"},{question:"One bus, two ___.",answer:"buses"},{question:"We love ___ teacher. (our / we)",answer:"our"},{question:"One man, two ___.",answer:"men"},{question:"This is ___ old house. (a / an)",answer:"an"},{question:"One family, two ___.",answer:"families"},{question:"Those are the girls. The bags are ___. (their / them)",answer:"theirs"},{question:"One foot, two ___.",answer:"feet"},{question:"Is that ___ car? (his / he)",answer:"his"}
  ]},
  { slug: "there-is-there-are", title: "There is / There are", level: "A1", count: 5, instruction: "Complete with There is, There are, Is there, or Are there.", items: [
    {question:"___ a chair in the room.",answer:"There is"},{question:"___ three windows in the kitchen.",answer:"There are"},{question:"___ a bank near here?",answer:"Is there"},{question:"___ any apples in the bag?",answer:"Are there"},{question:"___ not a TV in my bedroom.",answer:"There is"},{question:"___ two parks in our town.",answer:"There are"},{question:"___ a bathroom upstairs?",answer:"Is there"},{question:"___ any students in the classroom?",answer:"Are there"},{question:"___ a cat under the table.",answer:"There is"},{question:"___ five books on the desk.",answer:"There are"},{question:"___ a supermarket near the station?",answer:"Is there"},{question:"___ not any eggs in the fridge.",answer:"There are"},{question:"___ a picture on the wall.",answer:"There is"},{question:"___ two bedrooms in the flat?",answer:"Are there"},{question:"___ a bus stop outside.",answer:"There is"},{question:"___ any milk in the bottle?",answer:"Is there"},{question:"___ four people in my family.",answer:"There are"},{question:"___ a garden behind the house?",answer:"Is there"},{question:"___ not any chairs here.",answer:"There are"},{question:"___ a computer on the desk.",answer:"There is"}
  ]},
  { slug: "can-cant", title: "Can / Can't", level: "A1", count: 5, instruction: "Complete with can or can't and the verb in brackets where needed.", items: [
    {question:"A bird ___ (fly).",answer:"can fly"},{question:"A fish ___ (walk).",answer:"can't walk"},{question:"I ___ speak English, but not French.",answer:"can"},{question:"___ you swim?",answer:"Can"},{question:"She ___ drive; she is 12.",answer:"can't"},{question:"___ he play the guitar?",answer:"Can"},{question:"We ___ use phones in this lesson.",answer:"can't"},{question:"A baby ___ read.",answer:"can't"},{question:"They ___ come to the party today.",answer:"can"},{question:"My dog ___ run very fast.",answer:"can"},{question:"___ I open the window, please?",answer:"Can"},{question:"You ___ park here; it is forbidden.",answer:"can't"},{question:"A cat ___ climb trees.",answer:"can"},{question:"I ___ hear you. Please speak louder.",answer:"can't"},{question:"___ your sister cook?",answer:"Can"},{question:"He ___ ride a bike.",answer:"can"},{question:"We ___ see the sea from here.",answer:"can"},{question:"A horse ___ fly.",answer:"can't"},{question:"___ they speak Spanish?",answer:"Can"},{question:"You ___ borrow my pencil.",answer:"can"}
  ]},
  { slug: "past-simple-introduction", title: "Past Simple: First Steps", level: "A1", count: 3, instruction: "Complete with was, were, or the past form given by the example.", items: [
    {question:"Yesterday, I ___ at home.",answer:"was"},{question:"They ___ happy last night.",answer:"were"},{question:"She ___ tired yesterday.",answer:"was"},{question:"We ___ at the park on Sunday.",answer:"were"},{question:"He ___ born in May.",answer:"was"},{question:"You ___ late yesterday.",answer:"were"},{question:"The film ___ good.",answer:"was"},{question:"My friends ___ at school.",answer:"were"},{question:"I ___ (visit) my grandma yesterday.",answer:"visited"},{question:"We ___ (play) tennis last weekend.",answer:"played"},{question:"She ___ (watch) a film last night.",answer:"watched"},{question:"They ___ (walk) to school yesterday.",answer:"walked"},{question:"He ___ (clean) his room on Saturday.",answer:"cleaned"},{question:"I ___ (cook) pasta last night.",answer:"cooked"},{question:"We ___ (listen) to music yesterday.",answer:"listened"},{question:"Tom ___ (open) the door.",answer:"opened"},{question:"Anna ___ (help) her mum.",answer:"helped"},{question:"They ___ (start) at nine.",answer:"started"},{question:"I ___ (talk) to Sam yesterday.",answer:"talked"},{question:"She ___ (finish) her homework.",answer:"finished"}
  ]},
  { slug: "past-simple", title: "Past Simple", level: "A2", count: 10, instruction: "Complete the sentences using the past simple form.", items: [
    {question:"Yesterday I ___ (go) to work.",answer:"went"},{question:"She ___ (buy) a new bag last week.",answer:"bought"},{question:"We ___ (not see) the match.",answer:"didn't see"},{question:"___ you ___ (finish) your homework?",answer:"Did; finish"},{question:"They ___ (visit) Rome in April.",answer:"visited"},{question:"He ___ (have) breakfast at seven.",answer:"had"},{question:"I ___ (make) a cake yesterday.",answer:"made"},{question:"Where ___ she ___ (put) the keys?",answer:"did; put"},{question:"Tom ___ (not come) to class.",answer:"didn't come"},{question:"We ___ (take) the train.",answer:"took"},{question:"I ___ (write) an email last night.",answer:"wrote"},{question:"They ___ (eat) at a small restaurant.",answer:"ate"},{question:"She ___ (study) for the test.",answer:"studied"},{question:"He ___ (leave) early.",answer:"left"},{question:"___ they ___ (call) you?",answer:"Did; call"},{question:"We ___ (not understand) the question.",answer:"didn't understand"},{question:"I ___ (meet) my cousin on Monday.",answer:"met"},{question:"The bus ___ (arrive) late.",answer:"arrived"},{question:"She ___ (read) the book in two days.",answer:"read"},{question:"What time ___ he ___ (wake up)?",answer:"did; wake up"},{question:"They ___ (drink) orange juice.",answer:"drank"},{question:"I ___ (lose) my wallet.",answer:"lost"},{question:"We ___ (see) a great show.",answer:"saw"},{question:"He ___ (try) to help.",answer:"tried"},{question:"She ___ (not tell) me the truth.",answer:"didn't tell"},{question:"___ you ___ (send) the message?",answer:"Did; send"},{question:"I ___ (find) my glasses.",answer:"found"},{question:"They ___ (run) five kilometres.",answer:"ran"},{question:"He ___ (sleep) badly last night.",answer:"slept"},{question:"We ___ (get) home at six.",answer:"got"}
  ]},
  { slug: "present-continuous", title: "Present Continuous", level: "A2", count: 10, instruction: "Complete with am, is, or are + the -ing form.", items: [
    {question:"I ___ (read) a book now.",answer:"am reading"},{question:"She ___ (cook) dinner at the moment.",answer:"is cooking"},{question:"They ___ (play) outside now.",answer:"are playing"},{question:"We ___ (study) for our exam.",answer:"are studying"},{question:"He ___ (not sleep) now.",answer:"isn't sleeping"},{question:"___ you ___ (listen) to me?",answer:"Are; listening"},{question:"The baby ___ (cry).",answer:"is crying"},{question:"I ___ (write) an email.",answer:"am writing"},{question:"What ___ she ___ (do)?",answer:"is; doing"},{question:"The children ___ (run) in the garden.",answer:"are running"},{question:"My dad ___ (drive) to work now.",answer:"is driving"},{question:"We ___ (not watch) TV.",answer:"aren't watching"},{question:"___ they ___ (wait) for us?",answer:"Are; waiting"},{question:"The dog ___ (sit) by the door.",answer:"is sitting"},{question:"You ___ (wear) a blue jacket.",answer:"are wearing"},{question:"She ___ (make) lunch.",answer:"is making"},{question:"I ___ (not use) the computer.",answer:"am not using"},{question:"Where ___ you ___ (go)?",answer:"are; going"},{question:"It ___ (rain) outside.",answer:"is raining"},{question:"The students ___ (talk) quietly.",answer:"are talking"}
  ]},
  { slug: "comparatives", title: "Comparatives", level: "A2", count: 10, instruction: "Write the comparative form of the adjective in brackets.", items: [
    {question:"A train is ___ (fast) than a bus.",answer:"faster"},{question:"My room is ___ (small) than yours.",answer:"smaller"},{question:"This test is ___ (easy) than the last one.",answer:"easier"},{question:"Today is ___ (hot) than yesterday.",answer:"hotter"},{question:"Maths is ___ (difficult) than art for me.",answer:"more difficult"},{question:"This bag is ___ (heavy) than that one.",answer:"heavier"},{question:"Your phone is ___ (expensive) than mine.",answer:"more expensive"},{question:"My brother is ___ (young) than me.",answer:"younger"},{question:"This road is ___ (busy) than our street.",answer:"busier"},{question:"The blue sofa is ___ (comfortable) than the red one.",answer:"more comfortable"},{question:"A bike is ___ (cheap) than a car.",answer:"cheaper"},{question:"This book is ___ (good) than the film.",answer:"better"},{question:"Winter is ___ (cold) than autumn.",answer:"colder"},{question:"The station is ___ (far) than the shop.",answer:"farther / further"},{question:"My new job is ___ (bad) than the old one.",answer:"worse"},{question:"This exercise is ___ (short) than that one.",answer:"shorter"},{question:"A plane is ___ (quick) than a train.",answer:"quicker"},{question:"Your garden is ___ (beautiful) than ours.",answer:"more beautiful"},{question:"This chair is ___ (comfortable) than that chair.",answer:"more comfortable"},{question:"Today I feel ___ (good) than yesterday.",answer:"better"}
  ]},
  { slug: "countable-uncountable", title: "Countable and Uncountable Nouns", level: "A2", count: 10, instruction: "Choose much, many, some, or any to complete each sentence.", items: [
    {question:"How ___ apples do we need?",answer:"many"},{question:"There isn't ___ milk left.",answer:"any"},{question:"I'd like ___ water, please.",answer:"some"},{question:"How ___ sugar is in the jar?",answer:"much"},{question:"We have ___ eggs in the fridge.",answer:"some"},{question:"There aren't ___ chairs in the room.",answer:"many"},{question:"Is there ___ bread?",answer:"any"},{question:"How ___ money have you got?",answer:"much"},{question:"I bought ___ bananas.",answer:"some"},{question:"There isn't ___ cheese.",answer:"any"},{question:"How ___ people are coming?",answer:"many"},{question:"We don't have ___ rice.",answer:"any"},{question:"Can I have ___ tea?",answer:"some"},{question:"How ___ time do we have?",answer:"much"},{question:"There are ___ oranges on the table.",answer:"some"},{question:"I haven't got ___ questions.",answer:"any"},{question:"How ___ bottles are there?",answer:"many"},{question:"There is too ___ salt in this soup.",answer:"much"},{question:"Would you like ___ coffee?",answer:"some"},{question:"Are there ___ clean glasses?",answer:"any"}
  ]},
  { slug: "future-plans", title: "Future Plans: Going to", level: "A2", count: 10, instruction: "Complete with the correct form of be going to + verb.", items: [
    {question:"I ___ (visit) my aunt tomorrow.",answer:"am going to visit"},{question:"She ___ (study) tonight.",answer:"is going to study"},{question:"They ___ (not travel) this summer.",answer:"aren't going to travel"},{question:"___ you ___ (cook) dinner?",answer:"Are; going to cook"},{question:"We ___ (watch) a film later.",answer:"are going to watch"},{question:"He ___ (buy) a new bike.",answer:"is going to buy"},{question:"I ___ (not stay) at home.",answer:"am not going to stay"},{question:"What ___ she ___ (wear)?",answer:"is; going to wear"},{question:"It ___ (rain); look at those clouds.",answer:"is going to rain"},{question:"They ___ (play) tennis on Saturday.",answer:"are going to play"},{question:"My friends ___ (come) at six.",answer:"are going to come"},{question:"___ he ___ (learn) to drive?",answer:"Is; going to learn"},{question:"We ___ (not take) a taxi.",answer:"aren't going to take"},{question:"I ___ (make) a cake for the party.",answer:"am going to make"},{question:"Where ___ you ___ (sleep)?",answer:"are; going to sleep"},{question:"She ___ (start) a new course.",answer:"is going to start"},{question:"They ___ (not sell) their house.",answer:"aren't going to sell"},{question:"He ___ (meet) us after work.",answer:"is going to meet"},{question:"___ they ___ (move) to Madrid?",answer:"Are; going to move"},{question:"We ___ (paint) the kitchen.",answer:"are going to paint"}
  ]},
  { slug: "prepositions-of-place", title: "Prepositions of Place", level: "A1", count: 7, instruction: "Complete with in, on, under, next to, behind, or between.", items: [
    {question:"The keys are ___ the table.",answer:"on"},{question:"The cat is ___ the chair.",answer:"under"},{question:"The milk is ___ the fridge.",answer:"in"},{question:"The bank is ___ the cafe and the shop.",answer:"between"},{question:"The car is ___ the house.",answer:"in front of"},{question:"The school is ___ the park.",answer:"next to"},{question:"The garden is ___ the house.",answer:"behind"},{question:"Your bag is ___ the bed.",answer:"under"},{question:"The picture is ___ the wall.",answer:"on"},{question:"The children are ___ the classroom.",answer:"in"},{question:"The lamp is ___ the sofa.",answer:"next to"},{question:"The shoes are ___ the door.",answer:"behind"},{question:"The ball is ___ the box.",answer:"in"},{question:"The pharmacy is ___ the bank and the bakery.",answer:"between"},{question:"The dog is ___ the table.",answer:"under"},{question:"The clock is ___ the wall.",answer:"on"},{question:"The bus stop is ___ the library.",answer:"next to"},{question:"The bike is ___ the garage.",answer:"in"},{question:"The tree is ___ the house.",answer:"behind"},{question:"The cafe is ___ the cinema.",answer:"next to"}
  ]}
];

function escapePdf(text: string): string {
  return text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "?").replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}
function makePdf(lines: string[][]): Uint8Array {
  const objects: string[] = [];
  const pageIds: number[] = [];
  const contentIds: number[] = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  for (const pageLines of lines) {
    const contentId = objects.length + 1;
    const pageId = contentId + 1;
    const commands = ["BT"];
    let y = 790;
    for (let i = 0; i < pageLines.length; i++) {
      const line = pageLines[i];
      const size = i === 0 ? 18 : (line.startsWith("ANSWER KEY") || line.startsWith("LINGUAFLY") ? 11 : 10);
      commands.push(`/F${i === 0 || line.startsWith("ANSWER KEY") ? "2" : "1"} ${size} Tf 1 0 0 1 48 ${y} Tm (${escapePdf(line)}) Tj`);
      commands.push("0 0 Td");
      y -= i === 0 ? 30 : 22;
    }
    commands.push("ET");
    const stream = commands.join("\n");
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`);
    contentIds.push(contentId); pageIds.push(pageId);
  }
  objects[1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj, index) => { offsets.push(Buffer.byteLength(pdf, "binary")); pdf += `${index + 1} 0 obj\n${obj}\nendobj\n`; });
  const xref = Buffer.byteLength(pdf, "binary");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Uint8Array(Buffer.from(pdf, "binary"));
}

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const match = slug.match(/^([a-z0-9-]+)-(\d{2})$/);
  if (!match) return new NextResponse("Not found", { status: 404 });
  const pack = packs.find((item) => item.slug === match[1]);
  const number = Number(match[2]);
  if (!pack || number < 1 || number > pack.count) return new NextResponse("Not found", { status: 404 });
  const title = `${pack.title} - Worksheet ${String(number).padStart(2, "0")}`;
  const rotated = [...pack.items.slice((number - 1) % pack.items.length), ...pack.items.slice(0, (number - 1) % pack.items.length)];
  const selected = rotated.slice(0, 20);
  const questionLines = [
    "LINGUAFLY - ENGLISH WORKSHEETS",
    `${pack.level} | ${title}`,
    "Name: __________________________   Date: ______________",
    "",
    "LEARNING GOAL",
    `Practise ${pack.title} with short, level-appropriate sentences.`,
    "",
    "INSTRUCTIONS",
    pack.instruction,
    "Write your answers in the spaces. Check your work with the answer key.",
    "",
    ...selected.map((item, i) => `${i + 1}. ${item.question} __________________________`),
    "",
    "Try first without looking at the answers. One point per correct answer.",
    "linguafly.app | Practice a little every day"
  ];
  const answerLines = [
    "ANSWER KEY - CHECK YOUR WORK",
    `${pack.level} | ${title}`,
    "Give yourself one point for each correct answer. Accept equivalent correct forms.",
    "",
    ...selected.map((item, i) => `${i + 1}. ${item.answer}`),
    "",
    "Score: ____ / 20",
    "Review any incorrect answers, then try the worksheet again tomorrow.",
    "LINGUAFLY | linguafly.app"
  ];
  const pages = [questionLines.slice(0, 38), answerLines];
  const pdf = makePdf(pages);
  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slug}.pdf"`,
      "Cache-Control": "public, max-age=86400, s-maxage=604800",
    },
  });
}

export function generateStaticParams() {
  return packs.flatMap((pack) => Array.from({ length: pack.count }, (_, i) => ({ slug: `${pack.slug}-${String(i + 1).padStart(2, "0")}` })));
}
