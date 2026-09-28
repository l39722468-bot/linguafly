import type { PartyExercise, PartyLevel } from "@/lib/party/types";

const A1: PartyExercise[] = [
  ex("a1-morning", "¿Qué dices por la mañana, hasta el mediodía?", "Saludos", ["Good night", "Good morning", "Goodbye", "See you"], 1, "Good morning es el saludo de la mañana. Good night no saluda: se dice al irte a dormir."),
  ex("a1-am", "Completa: I ___ from Spain.", "To be", ["am", "is", "are", "be"], 0, "Con I el verbo es am. I am from Spain."),
  ex("a1-your", "Completa: What is ___ name?", "My / your", ["you", "your", "yours", "you're"], 1, "Your significa «tu». What's your name?"),
  ex("a1-age", "¿Cómo dices que tienes 25 años?", "Edad", ["I have 25 years", "I am 25 years old", "I am have 25", "I have 25 years old"], 1, "La edad no usa have. I am 25 years old."),
  ex("a1-job", "Completa: I am ___ student.", "Profesión", ["a", "an", "the", "—"], 0, "La profesión lleva a. I am a student."),
  ex("a1-you-are", "Completa: You ___ my friend.", "To be", ["is", "am", "are", "be"], 2, "Con you el verbo es are. You is no existe."),
  ex("a1-later", "¿Cómo se dice «hasta luego»?", "Despedidas", ["See you later", "Good night", "Last later", "See you morning"], 0, "See you later es hasta luego."),
  ex("a1-hotel", "Llegas a un hotel a las ocho de la tarde. ¿Qué dices?", "La hora del saludo", ["Good night", "Good afternoon", "Good evening", "Good morning"], 2, "Al llegar de noche se saluda con Good evening. Good night es solo para despedirte antes de dormir."),
  ex("a1-hello", "No conoces a la persona. ¿Qué saludo es más seguro?", "Formalidad", ["Hey", "Hello", "Yo", "Hiya"], 1, "Hello vale en casi cualquier situación. Hey se reserva para gente muy cercana."),
  ex("a1-fine", "Te preguntan How are you? Elige la respuesta correcta.", "Preguntas", ["I am fine, thanks you", "I am fine, thank you", "I fine, thank", "I am fine you"], 1, "Thank you no lleva s. I am fine, thank you."),
  ex("a1-from", "Completa: I am from ___ Spain.", "Origen", ["of", "to", "—", "at"], 2, "From ya significa «de». I am from Spain."),
  ex("a1-meet", "Acabas de conocer a alguien. ¿Qué encaja?", "Presentarte", ["Nice to meet you", "Good night", "See you never", "I meet you nice"], 0, "Nice to meet you cierra la presentación: encantado de conocerte."),
];

const A2: PartyExercise[] = [
  ex("a2-went", "Completa: Yesterday I ___ to the cinema.", "Past simple", ["go", "goed", "went", "going"], 2, "Go en pasado es went. Yesterday pide past simple."),
  ex("a2-bigger", "Completa: This flat is ___ than mine.", "Comparativo", ["more big", "bigger", "biggest", "big"], 1, "Big tiene comparativo corto: bigger than."),
  ex("a2-there", "Completa: There ___ two cafés on this street.", "There is / are", ["is", "are", "be", "have"], 1, "Two cafés es plural. There are."),
  ex("a2-cooking", "Completa: She ___ dinner right now.", "Present continuous", ["cooks", "is cooking", "cook", "cooked"], 1, "Right now pide present continuous: is cooking."),
  ex("a2-any", "Completa: We don't have ___ milk.", "Some / any", ["some", "any", "a", "many"], 1, "En negativa, any. We don't have any milk."),
  ex("a2-many", "Completa: How ___ apples do you need?", "Much / many", ["much", "many", "a", "lot"], 1, "Apples se puede contar. How many."),
  ex("a2-should", "Tu amigo está enfermo. ¿Qué consejo es correcto?", "Should", ["You should to rest", "You should rest", "You should resting", "You must to rest"], 1, "Should va seguido del infinitivo sin to. You should rest."),
  ex("a2-going", "Completa: I am ___ visit my sister on Saturday.", "Planes", ["go to", "going to", "going", "will to"], 1, "Un plan ya decidido: I am going to visit."),
  ex("a2-bought", "Completa: She ___ a new coat yesterday.", "Past simple", ["buyed", "bought", "buys", "buying"], 1, "Buy en pasado es bought."),
  ex("a2-on", "Completa: The class is ___ Monday.", "Preposiciones de tiempo", ["in", "at", "on", "by"], 2, "Los días van con on. On Monday."),
  ex("a2-can", "Completa: ___ you swim?", "Can", ["Do", "Are", "Can", "Have"], 2, "Para habilidad se usa can. Can you swim?"),
  ex("a2-didnt", "Completa: I ___ like the film yesterday.", "Negativa en pasado", ["didn't", "don't", "wasn't", "hadn't"], 0, "Yesterday pide pasado. I didn't like. El verbo no lleva -ed."),
];

const B1: PartyExercise[] = [
  ex("b1-since", "Completa: I ___ here since 2019.", "Present perfect", ["live", "lived", "have lived", "am living"], 2, "Since 2019 une el pasado con el presente. I have lived here since 2019."),
  ex("b1-just", "Completa: She has ___ left. You missed her.", "Just / yet", ["yet", "just", "ever", "ago"], 1, "Just va con el present perfect para «acaba de». She has just left."),
  ex("b1-if", "Completa: If it rains, we ___ at home.", "First conditional", ["stay", "will stay", "would stay", "stayed"], 1, "If + presente, resultado con will. If it rains, we will stay."),
  ex("b1-used", "Completa: I ___ play football every weekend.", "Used to", ["use to", "used to", "am used", "using to"], 1, "Un hábito del pasado: used to play."),
  ex("b1-who", "Completa: The woman ___ lives upstairs is a doctor.", "Relativos", ["which", "who", "where", "whose"], 1, "Who se refiere a personas. Which sería para cosas."),
  ex("b1-although", "Completa: ___ it was cold, they ate outside.", "Conectores", ["Despite", "Although", "However", "Because"], 1, "Although introduce una oración. Despite iría con un nombre: despite the cold."),
  ex("b1-too", "Completa: This soup is too hot ___.", "Too / enough", ["for eat", "to eat", "for eating", "eating"], 1, "Too + adjetivo + to + infinitivo. Too hot to eat."),
  ex("b1-lost", "Las llaves no aparecen y sigues buscándolas. ¿Qué dices?", "Present perfect", ["I lost my keys yesterday at five", "I have lost my keys", "I was losing my keys", "I lose my keys last night"], 1, "El resultado importa ahora. I have lost my keys."),
  ex("b1-might", "No estás seguro. Completa: It ___ rain this evening.", "Modales", ["must", "might", "would", "shoulds"], 1, "Might expresa posibilidad. It might rain."),
  ex("b1-enjoy", "Completa: She enjoys ___ early.", "Verbo + -ing", ["get up", "to get up", "getting up", "gets up"], 2, "Enjoy va seguido de -ing. She enjoys getting up early."),
  ex("b1-for", "Completa: We have lived in Lisbon ___ ten years.", "For / since", ["since", "for", "during", "from"], 1, "For + periodo. Since + punto de inicio."),
  ex("b1-passive", "Completa: This cake ___ by my brother.", "Pasiva", ["baked", "was baked", "is baking", "has baking"], 1, "Pasiva en pasado: was baked by."),
];

const B2: PartyExercise[] = [
  ex("b2-third", "Completa: If I ___ earlier, I would have caught the train.", "Third conditional", ["left", "had left", "would leave", "have left"], 1, "Third conditional: If + had + participio, would have + participio."),
  ex("b2-wish", "Quieres saber la respuesta ahora y no la sabes. ¿Qué es correcto?", "Wish", ["I wish I know the answer", "I wish I knew the answer", "I wish I had know the answer", "I wish I knowing"], 1, "Un deseo sobre el presente usa pasado: I wish I knew."),
  ex("b2-reported", "«I am tired», dijo Ana ayer. ¿Cómo lo cuentas?", "Estilo indirecto", ["Ana said she is tired", "Ana said she was tired", "Ana said she were tired now", "Ana told she is tired"], 1, "Al pasar a pasado, am suele pasar a was. Ana said she was tired."),
  ex("b2-hardly", "Elige la inversión correcta.", "Inversión", ["Hardly I had arrived when it started", "Hardly had I arrived when it started", "Hardly I arrived when it had started", "Had hardly I arrived when it started"], 1, "Hardly had I arrived when… El auxiliar va delante del sujeto."),
  ex("b2-despite", "Completa: ___ the delay, the audience stayed.", "Despite", ["Although", "Despite", "Even", "However"], 1, "Despite va con un nombre. Although iría con una oración."),
  ex("b2-rather", "Completa: I would rather you ___ here tonight.", "Would rather", ["stay", "stayed", "to stay", "staying"], 1, "Would rather + sujeto distinto pide pasado. I would rather you stayed."),
  ex("b2-finished", "Completa: By Friday I ___ the report.", "Future perfect", ["will finish", "will have finished", "have finished", "am finishing"], 1, "By Friday mira a un momento futuro ya completado. Will have finished."),
  ex("b2-cut", "Completa: She ___ her hair cut yesterday.", "Causativa", ["cut", "had", "made", "let"], 1, "Have something done: otra persona hace la acción. She had her hair cut."),
  ex("b2-must", "El abrigo no está. Estás casi seguro. ¿Qué dices?", "Deducción", ["She must leave", "She must have left", "She can have left", "She must left"], 1, "Deducción sobre el pasado: must have + participio."),
  ex("b2-suggested", "Completa: He suggested ___ a short break.", "Verbos + -ing", ["to take", "taking", "take", "that take"], 1, "Suggest puede ir con -ing. He suggested taking a short break."),
  ex("b2-so", "Completa: The talk was ___ interesting that nobody left.", "So / such", ["such", "so", "too", "enough"], 1, "So + adjetivo + that. Such iría con un nombre."),
  ex("b2-neither", "Ana no conduce. Tú tampoco. Elige la frase correcta.", "Neither / so", ["Neither do I", "Neither I do", "So do I", "Neither am I"], 0, "Después de una negativa con do, Neither do I. El auxiliar va delante."),
];

const C1: PartyExercise[] = [
  ex("c1-not-only", "Elige la inversión correcta.", "Inversión", ["Not only she won, but she broke the record", "Not only did she win, but she also broke the record", "Not only won she, but she broke the record", "Did not only she win, but broke the record"], 1, "Not only + auxiliar + sujeto. Not only did she win, but she also…"),
  ex("c1-suggest", "Completa: The board suggested that he ___ the report before Friday.", "Subjuntivo", ["submit", "submitting", "to submit", "submission"], 0, "Suggest that + sujeto + infinitivo sin to: that he submit the report."),
  ex("c1-cleft", "Queremos destacar el retraso como causa. ¿Qué frase lo hace?", "Cleft", ["The delay caused the cancellation", "It was the delay that caused the cancellation", "The delay it caused the cancellation", "That the delay caused it the cancellation"], 1, "It was the delay that… pone el foco en el retraso."),
  ex("c1-had", "Elige la condicional invertida correcta.", "Inversión condicional", ["Had I known, I would have called", "Had I know, I would call", "If had I known, I would have called", "Did I known, I would have called"], 0, "Had I known equivale a If I had known."),
  ex("c1-no-sooner", "Elige la frase correcta.", "Inversión", ["No sooner the film started than the lights went out", "No sooner had the film started than the lights went out", "No sooner had started the film than the lights went out", "No sooner the film had started when the lights went out"], 1, "No sooner had + sujeto + participio than…"),
  ex("c1-were", "Completa: ___ it not for the grant, the lab would have closed.", "Inversión", ["If", "Were", "Was", "Had"], 1, "Were it not for… equivale a If it were not for."),
  ex("c1-little", "Elige la inversión correcta.", "Inversión", ["Little they knew about the risk", "Little did they know about the risk", "Little knew they about the risk", "Did little they know about the risk"], 1, "Little did they know… El auxiliar va delante del sujeto."),
  ex("c1-so-inv", "Completa: So crowded ___ the hall that they opened another room.", "Inversión", ["was", "it was", "did", "the hall"], 0, "So + adjetivo + verbo + sujeto. So crowded was the hall that…"),
  ex("c1-sooner", "Completa: I'd sooner we ___ the decision until Monday.", "Would sooner", ["postpone", "postponed", "postponing", "to postpone"], 1, "Con otro sujeto, sooner pide pasado. I'd sooner we postponed."),
  ex("c1-under", "¿Qué frase atenúa la afirmación sin retirarla?", "Matiz", ["This proves the policy failed", "This suggests the policy may have failed", "This demonstrates total failure beyond doubt", "This shows the policy never existed"], 1, "Suggests y may have failed dejan margen. Proves cierra la puerta."),
  ex("c1-participle", "Elige la frase en la que el participio apunta al sujeto correcto.", "Participio", ["Built in 1920, the bridge still carries traffic", "Building in 1920, the bridge still carries traffic", "Built in 1920, traffic still crosses the bridge", "Having build in 1920, the bridge carries traffic"], 0, "El puente es lo que se construyó. Built in 1920, the bridge…"),
  ex("c1-such", "Completa: ___ was the demand that the site crashed.", "Inversión con such", ["So", "Such", "What", "Very"], 1, "Such was the demand that… Such + verbo + sujeto."),
];

const BANK: Record<PartyLevel, PartyExercise[]> = { A1, A2, B1, B2, C1 };

function ex(
  id: string,
  prompt: string,
  hint: string,
  options: string[],
  correctIndex: number,
  explanation: string,
): PartyExercise {
  return { id, prompt, hint, options, correctIndex, explanation };
}

export function exercisesForLevel(level: PartyLevel): PartyExercise[] {
  return BANK[level];
}

export function dealExercises(
  level: PartyLevel,
  count: number,
  random: () => number = Math.random,
): PartyExercise[] {
  const pool = shuffle(exercisesForLevel(level), random);
  const dealt: PartyExercise[] = [];
  for (let i = 0; i < count; i += 1) {
    const source = pool[i % pool.length];
    dealt.push(reshuffleOptions({ ...source, options: [...source.options] }, random));
  }
  return dealt;
}

function reshuffleOptions(exercise: PartyExercise, random: () => number): PartyExercise {
  const correct = exercise.options[exercise.correctIndex];
  const options = shuffle(exercise.options, random);
  return { ...exercise, options, correctIndex: options.indexOf(correct) };
}

export function shuffle<T>(items: T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const current = copy[i];
    copy[i] = copy[j];
    copy[j] = current;
  }
  return copy;
}
