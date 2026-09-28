import type { PartyExercise, PartyLevel } from "@/lib/party/types";

const KINDS = ["Gramática", "Vocabulario", "Phrasal verb", "False friend", "Fonética"] as const;

const A1: PartyExercise[] = [
  ex("a1-am", "Completa: I ___ from Spain.", "Gramática", ["am", "is", "are", "be"], 0, "Con I el verbo es am. I am from Spain."),
  ex("a1-your", "Completa: What is ___ name?", "Gramática", ["you", "your", "yours", "you're"], 1, "Your significa «tu». What's your name?"),
  ex("a1-age", "¿Cómo dices que tienes 25 años?", "Gramática", ["I have 25 years", "I am 25 years old", "I am have 25", "I have 25 years old"], 1, "La edad no usa have. I am 25 years old."),
  ex("a1-job", "Completa: I am ___ student.", "Gramática", ["a", "an", "the", "—"], 0, "La profesión lleva a. I am a student."),
  ex("a1-you-are", "Completa: You ___ my friend.", "Gramática", ["is", "am", "are", "be"], 2, "Con you el verbo es are. You is no existe."),
  ex("a1-from", "Completa: I am from ___ Spain.", "Gramática", ["of", "to", "—", "at"], 2, "From ya significa «de». I am from Spain."),
  ex("a1-fine", "Te preguntan How are you? Elige la respuesta correcta.", "Gramática", ["I am fine, thanks you", "I am fine, thank you", "I fine, thank", "I am fine you"], 1, "Thank you no lleva s. I am fine, thank you."),
  ex("a1-water", "¿Cómo se dice «agua»?", "Vocabulario", ["soup", "water", "milk", "juice"], 1, "Agua es water. Soup es sopa."),
  ex("a1-book", "¿Qué es a book?", "Vocabulario", ["un cuaderno", "un libro", "una bolsa", "una mesa"], 1, "A book es un libro. El cuaderno es a notebook."),
  ex("a1-tuesday", "¿Qué día va después de Monday?", "Vocabulario", ["Sunday", "Tuesday", "Friday", "Thursday"], 1, "Después de Monday viene Tuesday."),
  ex("a1-red", "¿Cómo se dice «rojo»?", "Vocabulario", ["green", "red", "blue", "black"], 1, "Rojo es red. Green es verde."),
  ex("a1-mother", "¿Cómo se dice «madre»?", "Vocabulario", ["sister", "mother", "aunt", "daughter"], 1, "Madre es mother. Sister es hermana."),
  ex("a1-please", "Quieres un café. ¿Qué frase pide con educación?", "Vocabulario", ["Give me coffee", "Can I have a coffee, please?", "Coffee now", "I take coffee you"], 1, "Can I have…, please? es la forma educada de pedir."),
  ex("a1-school", "¿Cómo se dice «escuela»?", "Vocabulario", ["school", "shop", "station", "street"], 0, "Escuela es school. Shop es tienda."),
  ex("a1-get-up", "¿Cómo dices que te levantas de la cama?", "Phrasal verb", ["I get on", "I get up", "I get in", "I get to"], 1, "Get up es levantarse. Get on es subir a un autobús."),
  ex("a1-look-for", "No encuentras las llaves. ¿Qué dices?", "Phrasal verb", ["I look after my keys", "I look for my keys", "I look my keys", "I look at keys only"], 1, "Look for es buscar. Look after es cuidar."),
  ex("a1-turn-on", "La luz está apagada y la enciendes. ¿Qué dices?", "Phrasal verb", ["I turn off the light", "I turn on the light", "I turn the light down", "I turn in the light"], 1, "Turn on es encender. Turn off es apagar."),
  ex("a1-sit-down", "Invitas a alguien a sentarse. ¿Qué dices?", "Phrasal verb", ["Sit up the chair", "Sit down, please", "Down sit you", "Sit in please"], 1, "Sit down es siéntate."),
  ex("a1-wake-up", "¿Cómo dices que te despiertas a las siete?", "Phrasal verb", ["I wake on at seven", "I wake up at seven", "I wake to seven", "I get the sleep up"], 1, "Wake up es despertarse. Get up es salir de la cama."),
  ex("a1-come-in", "Estás fuera y te invitan a pasar. ¿Qué oyes?", "Phrasal verb", ["Come on the house", "Come in", "Come up outside", "Come to in"], 1, "Come in es pasa, entra."),
  ex("a1-stand-up", "El profesor pide que os pongáis de pie. ¿Qué dice?", "Phrasal verb", ["Stand on, please", "Stand up, please", "Up stand please", "Stand to up"], 1, "Stand up es ponte de pie."),
  ex("a1-library", "She studies in the library. ¿Dónde estudia?", "False friend", ["en la librería", "en la biblioteca", "en el libro", "en la libreta"], 1, "Library es biblioteca. La tienda de libros es a bookshop."),
  ex("a1-carpet", "The carpet is blue. ¿Qué es azul?", "False friend", ["la carpeta", "la alfombra", "el cartón", "la cortina de tela fina"], 1, "Carpet es alfombra. Carpeta es a folder."),
  ex("a1-exit", "Where is the exit? ¿Qué pregunta?", "False friend", ["¿Dónde está el éxito?", "¿Dónde está la salida?", "¿Dónde está la entrada?", "¿Dónde está el escenario?"], 1, "Exit es salida. Éxito es success."),
  ex("a1-embarrassed", "I felt embarrassed. ¿Cómo se sentía?", "False friend", ["embarazado", "avergonzado", "emocionado", "enfadado"], 1, "Embarrassed es avergonzado. Embarazada es pregnant."),
  ex("a1-large", "A large room es…", "False friend", ["una habitación larga", "una habitación grande", "una habitación estrecha", "una habitación oscura"], 1, "Large es grande. Largo es long."),
  ex("a1-actual", "The actual price es…", "False friend", ["el precio de esta semana", "el precio real", "el precio antiguo", "el precio alto"], 1, "Actual es real. «De ahora» es current."),
  ex("a1-sensible", "A sensible plan es…", "False friend", ["un plan muy emocional", "un plan sensato", "un plan secreto", "un plan imposible"], 1, "Sensible es sensato. «Sensible» en español se acerca a sensitive."),
  ex("a1-cat", "¿Qué palabra corresponde a /kæt/?", "Fonética", ["cut", "cat", "kite", "car"], 1, "/kæt/ es cat. Cut se transcribe /kʌt/."),
  ex("a1-sheep", "¿Qué palabra corresponde a /ʃiːp/?", "Fonética", ["ship", "sheep", "shape", "cheap"], 1, "/ʃiːp/ es sheep, con vocal larga. Ship es /ʃɪp/."),
  ex("a1-ship", "¿Qué palabra corresponde a /ʃɪp/?", "Fonética", ["sheep", "ship", "chip", "shape"], 1, "/ʃɪp/ es ship, con vocal breve. Sheep es /ʃiːp/."),
  ex("a1-three", "¿Qué palabra corresponde a /θriː/?", "Fonética", ["tree", "three", "free", "they"], 1, "/θriː/ es three. Tree no lleva el sonido /θ/."),
  ex("a1-book-sound", "¿Qué palabra corresponde a /bʊk/?", "Fonética", ["boot", "book", "back", "bike"], 1, "/bʊk/ es book. Boot es /buːt/."),
  ex("a1-bed", "¿Qué palabra corresponde a /bed/?", "Fonética", ["bad", "bed", "bid", "bird"], 1, "/bed/ es bed. Bad es /bæd/."),
  ex("a1-my", "¿Qué palabra corresponde a /maɪ/?", "Fonética", ["me", "my", "may", "mouse"], 1, "/maɪ/ es my. May es /meɪ/ y me es /miː/."),
];

const A2: PartyExercise[] = [
  ex("a2-went", "Completa: Yesterday I ___ to the cinema.", "Gramática", ["go", "goed", "went", "going"], 2, "Go en pasado es went. Yesterday pide past simple."),
  ex("a2-bigger", "Completa: This flat is ___ than mine.", "Gramática", ["more big", "bigger", "biggest", "big"], 1, "Big tiene comparativo corto: bigger than."),
  ex("a2-there", "Completa: There ___ two cafés on this street.", "Gramática", ["is", "are", "be", "have"], 1, "Two cafés es plural. There are."),
  ex("a2-cooking", "Completa: She ___ dinner right now.", "Gramática", ["cooks", "is cooking", "cook", "cooked"], 1, "Right now pide present continuous: is cooking."),
  ex("a2-any", "Completa: We don't have ___ milk.", "Gramática", ["some", "any", "a", "many"], 1, "En negativa, any. We don't have any milk."),
  ex("a2-many", "Completa: How ___ apples do you need?", "Gramática", ["much", "many", "a", "lot"], 1, "Apples se puede contar. How many."),
  ex("a2-didnt", "Completa: I ___ like the film yesterday.", "Gramática", ["didn't", "don't", "wasn't", "hadn't"], 0, "Yesterday pide pasado. I didn't like. El verbo no lleva -ed."),
  ex("a2-borrow", "Ana te deja su boli y tú lo usas. ¿Qué dices?", "Vocabulario", ["I lend the pen", "I borrow the pen", "I borrow Ana", "I lend me the pen"], 1, "Borrow es tomar prestado. Lend es prestar."),
  ex("a2-ticket", "Para entrar al cine compras…", "Vocabulario", ["a letter", "a ticket", "a tissue", "a title"], 1, "La entrada es a ticket."),
  ex("a2-appointment", "Tienes hora con el médico. Eso es…", "Vocabulario", ["an apartment", "an appointment", "an application", "an apology"], 1, "Una cita concertada es an appointment."),
  ex("a2-kitchen", "¿Dónde cocinas en casa?", "Vocabulario", ["in the chicken", "in the kitchen", "in the curtain", "in the cupboard"], 1, "La cocina es the kitchen. Chicken es pollo."),
  ex("a2-cheap", "El precio es muy bajo. El producto es…", "Vocabulario", ["expensive", "cheap", "chip", "chief"], 1, "Barato es cheap. Caro es expensive."),
  ex("a2-weather", "Hoy hace sol. Hablas del…", "Vocabulario", ["whether", "weather", "winter", "water"], 1, "El tiempo atmosférico es the weather. Whether significa «si»."),
  ex("a2-neighbour", "Vive en la casa de al lado. Es your…", "Vocabulario", ["nephew", "neighbour", "landlord", "partner"], 1, "El vecino de al lado es your neighbour."),
  ex("a2-look-after", "Cuidas de tu hermano pequeño. ¿Qué dices?", "Phrasal verb", ["I look for my brother", "I look after my brother", "I look my brother", "I look up my brother"], 1, "Look after es cuidar. Look for es buscar."),
  ex("a2-give-up", "Dejas de fumar. ¿Qué dices?", "Phrasal verb", ["I give smoking", "I give up smoking", "I give in smoking", "I give to smoking"], 1, "Give up es dejar un hábito. Give in es ceder."),
  ex("a2-find-out", "Te enteras de la hora del tren. ¿Qué dices?", "Phrasal verb", ["I find up the time", "I find out the time", "I find off the time", "I find the time out of"], 1, "Find out es enterarse de un dato."),
  ex("a2-pick-up", "Recoges a tu hermana en la estación. ¿Qué dices?", "Phrasal verb", ["I pick on my sister", "I pick my sister up", "I pick my sister", "I pick out of my sister"], 1, "Pick someone up es recoger a alguien. Pick on es meterse con alguien."),
  ex("a2-put-on", "Hace frío y te pones el abrigo. ¿Qué dices?", "Phrasal verb", ["I put my coat", "I put on my coat", "I put in my coat", "I put up the wearing"], 1, "Put on es ponerse una prenda."),
  ex("a2-turn-off", "Apagas la televisión. ¿Qué dices?", "Phrasal verb", ["I turn on the TV", "I turn off the TV", "I turn the TV", "I turn up the TV"], 1, "Turn off es apagar. Turn up es subir el volumen."),
  ex("a2-look-up", "No conoces una palabra y la buscas en el diccionario. ¿Qué haces?", "Phrasal verb", ["I look after the word", "I look up the word", "I look the word", "I look for the word only in the street"], 1, "Look up a word es consultarla. Look for es buscar un objeto."),
  ex("a2-parents", "My parents live in León. ¿Quién vive en León?", "False friend", ["mis parientes lejanos", "mis padres", "mis compañeros", "mis vecinos"], 1, "Parents son el padre y la madre. Parientes es relatives."),
  ex("a2-realize", "I realized the door was open. ¿Qué pasó?", "False friend", ["Realicé la puerta", "Me di cuenta de que la puerta estaba abierta", "Cerré la puerta", "Repararé la puerta"], 1, "Realize es darse cuenta. Llevar a cabo es carry out."),
  ex("a2-eventually", "Eventually the bus arrived. ¿Cuándo llegó?", "False friend", ["posiblemente", "al final", "de vez en cuando", "enseguida"], 1, "Eventually es al final. «Quizá» no es su significado."),
  ex("a2-pretend", "The child pretended to be asleep. ¿Qué hacía?", "False friend", ["pretendía un premio", "fingía que dormía", "preparaba la cama", "dormía de verdad"], 1, "Pretend es fingir. Tener la intención es intend."),
  ex("a2-career", "She has a career in design. ¿Qué tiene?", "False friend", ["una carrera de cien metros", "una trayectoria profesional", "un carril", "un título de un solo día"], 1, "Career es la trayectoria profesional. Una carrera a pie es a race."),
  ex("a2-fabric", "This fabric is soft. ¿Qué es suave?", "False friend", ["esta fábrica", "esta tela", "este fabricante", "este hecho"], 1, "Fabric es tela. Fábrica es a factory."),
  ex("a2-attend", "Did you attend the class? ¿Qué pregunta?", "False friend", ["¿Atendiste el teléfono?", "¿Asististe a clase?", "¿Esperaste fuera?", "¿Serviste al profesor?"], 1, "Attend a class es asistir. Atender a un cliente es serve o help."),
  ex("a2-leave", "¿Qué palabra corresponde a /liːv/?", "Fonética", ["live", "leave", "leaf", "love"], 1, "/liːv/ es leave, con /iː/ larga. Live, el verbo, es /lɪv/."),
  ex("a2-live", "¿Qué palabra corresponde a /lɪv/?", "Fonética", ["leave", "live", "life", "love"], 1, "/lɪv/ es el verbo live. Leave es /liːv/."),
  ex("a2-work", "¿Qué palabra corresponde a /wɜːk/?", "Fonética", ["walk", "work", "week", "woke"], 1, "/wɜːk/ es work. Walk es /wɔːk/."),
  ex("a2-walk", "¿Qué palabra corresponde a /wɔːk/?", "Fonética", ["work", "walk", "wall", "wake"], 1, "/wɔːk/ es walk. Work es /wɜːk/."),
  ex("a2-bad", "¿Qué palabra corresponde a /bæd/?", "Fonética", ["bed", "bad", "bud", "bid"], 1, "/bæd/ es bad. Bed es /bed/."),
  ex("a2-dogs", "En dogs, la -s final suena…", "Fonética", ["/s/", "/z/", "/ɪz/", "/θ/"], 1, "Tras un sonido sonoro como /g/, la -s de plural suena /z/."),
  ex("a2-think", "¿Qué palabra corresponde a /θɪŋk/?", "Fonética", ["sink", "think", "thing", "thick"], 1, "/θɪŋk/ es think. Thing es /θɪŋ/, sin /k/."),
];

const B1: PartyExercise[] = [
  ex("b1-since", "Completa: I ___ here since 2019.", "Gramática", ["live", "lived", "have lived", "am living"], 2, "Since 2019 une el pasado con el presente. I have lived here since 2019."),
  ex("b1-just", "Completa: She has ___ left. You missed her.", "Gramática", ["yet", "just", "ever", "ago"], 1, "Just va con el present perfect para «acaba de». She has just left."),
  ex("b1-if", "Completa: If it rains, we ___ at home.", "Gramática", ["stay", "will stay", "would stay", "stayed"], 1, "If + presente, resultado con will. If it rains, we will stay."),
  ex("b1-used", "Completa: I ___ play football every weekend.", "Gramática", ["use to", "used to", "am used", "using to"], 1, "Un hábito del pasado: used to play."),
  ex("b1-who", "Completa: The woman ___ lives upstairs is a doctor.", "Gramática", ["which", "who", "where", "whose"], 1, "Who se refiere a personas. Which sería para cosas."),
  ex("b1-too", "Completa: This soup is too hot ___.", "Gramática", ["for eat", "to eat", "for eating", "eating"], 1, "Too + adjetivo + to + infinitivo. Too hot to eat."),
  ex("b1-for", "Completa: We have lived in Lisbon ___ ten years.", "Gramática", ["since", "for", "during", "from"], 1, "For + periodo. Since + punto de inicio."),
  ex("b1-achieve", "Completa: She wants to ___ her goal.", "Vocabulario", ["arrive", "achieve", "afford", "allow"], 1, "Lograr un objetivo es achieve a goal."),
  ex("b1-deadline", "La fecha límite de un trabajo es the…", "Vocabulario", ["headline", "deadline", "lifeline", "outline"], 1, "La fecha límite es the deadline."),
  ex("b1-salary", "El dinero mensual de un empleo es your…", "Vocabulario", ["receipt", "salary", "fine", "tip"], 1, "El sueldo es a salary. A tip es una propina."),
  ex("b1-environment", "El medio ambiente es the…", "Vocabulario", ["envelope", "environment", "entertainment", "equipment"], 1, "Medio ambiente es the environment."),
  ex("b1-journey", "El trayecto de Madrid a Valencia es a…", "Vocabulario", ["travel", "journey", "journal", "traffic"], 1, "Un trayecto concreto es a journey. Travel no lleva a."),
  ex("b1-improve", "Completa: You want to ___ your English.", "Vocabulario", ["approve", "improve", "prove", "import"], 1, "Mejorar es improve. Approve es aprobar."),
  ex("b1-decision", "¿Qué combinación es correcta?", "Vocabulario", ["do a decision", "make a decision", "make a decide", "do a decide"], 1, "La colocación es make a decision."),
  ex("b1-run-out", "No queda leche. ¿Qué dices?", "Phrasal verb", ["We ran milk out", "We ran out of milk", "We ran off milk", "We ran into milk"], 1, "Run out of es quedarse sin. Run into es encontrarse con alguien."),
  ex("b1-look-forward", "Estás ilusionado con ver a Ana. ¿Qué es correcto?", "Phrasal verb", ["I look forward to see Ana", "I look forward to seeing Ana", "I look forward seeing Ana", "I look for to see Ana"], 1, "Look forward to lleva -ing. Aquí to es preposición."),
  ex("b1-take-off", "El avión despega. ¿Qué dices?", "Phrasal verb", ["The plane takes up", "The plane takes off", "The plane takes on", "The plane takes out"], 1, "Take off es despegar. Take on es asumir una tarea."),
  ex("b1-get-on", "Te llevas bien con Ana. ¿Qué dices?", "Phrasal verb", ["I get up with Ana", "I get on with Ana", "I get Ana on", "I get with Ana"], 1, "Get on with someone es llevarse bien."),
  ex("b1-put-off", "Pospones la reunión. ¿Qué dices?", "Phrasal verb", ["I put the meeting out", "I put the meeting off", "I put off to the meeting", "I put the meeting up"], 1, "Put off es posponer. Put the meeting off deja la reunión para más tarde."),
  ex("b1-carry-on", "Continúas trabajando. ¿Qué dices?", "Phrasal verb", ["I carry working", "I carry on working", "I carry up working", "I carry in work"], 1, "Carry on es continuar."),
  ex("b1-turn-up", "Apareces en la fiesta. Un amigo dice que…", "Phrasal verb", ["you turned on", "you turned up", "you turned down the party", "you turned the party"], 1, "Turn up es aparecer. Turn down es rechazar."),
  ex("b1-sympathetic", "She was sympathetic when I failed. ¿Cómo fue?", "False friend", ["graciosa", "comprensiva", "callada", "rápida"], 1, "Sympathetic es comprensivo. Simpático, en el sentido de agradable, no es esta palabra."),
  ex("b1-lecture", "The professor gave a lecture. ¿Qué dio?", "False friend", ["una lectura en voz baja", "una clase o conferencia", "un lector", "una biblioteca"], 1, "A lecture es una clase o conferencia. Una lectura es a reading."),
  ex("b1-topic", "The topic of the meeting es…", "False friend", ["un cliché", "el tema", "el topo", "el título de un libro"], 1, "Topic es el tema. Un cliché es a cliché."),
  ex("b1-success", "The success of the plan es…", "False friend", ["un suceso", "el éxito", "un sucesor", "un proceso"], 1, "Success es éxito. Un suceso es an event."),
  ex("b1-deceive", "He tried to deceive the client. ¿Qué intentó?", "False friend", ["decepcionar", "engañar", "decidir", "decorar"], 1, "Deceive es engañar. Decepcionar es disappoint."),
  ex("b1-disgust", "She felt disgust. ¿Qué sintió?", "False friend", ["un enfado pequeño", "asco", "sorpresa", "alivio"], 1, "Disgust es asco. Un disgusto, en el sentido de enfado, no es esta palabra."),
  ex("b1-college", "En inglés, ir a college se acerca más a…", "False friend", ["entrar en un colegio de primaria", "seguir estudios después del instituto", "comprar una carpeta", "visitar a un colega"], 1, "College nombra estudios posteriores a la escuela. El colegio de primaria es a school."),
  ex("b1-photo", "¿Qué palabra corresponde a /ˈfəʊtəɡrɑːf/?", "Fonética", ["photographer", "photograph", "photography", "photo"], 1, "/ˈfəʊtəɡrɑːf/ es photograph. Photographer lleva el acento en la segunda sílaba."),
  ex("b1-about", "¿Qué palabra corresponde a /əˈbaʊt/?", "Fonética", ["above", "about", "abroad", "abort"], 1, "/əˈbaʊt/ es about. La primera vocal átona es el schwa /ə/."),
  ex("b1-comfortable", "¿Qué palabra corresponde a /ˈkʌmftəbl/?", "Fonética", ["comfort", "comfortable", "company", "complete"], 1, "/ˈkʌmftəbl/ es comfortable. En la forma habitual no se pronuncian todas las letras."),
  ex("b1-island", "¿Qué palabra corresponde a /ˈaɪlənd/?", "Fonética", ["Ireland", "island", "iceland", "inland"], 1, "/ˈaɪlənd/ es island. La s no suena."),
  ex("b1-cheese", "¿Qué palabra corresponde a /tʃiːz/?", "Fonética", ["choose", "cheese", "keys", "chess"], 1, "/tʃiːz/ es cheese. Choose es /tʃuːz/."),
  ex("b1-just-sound", "¿Qué palabra corresponde a /dʒʌst/?", "Fonética", ["yeast", "just", "jest", "juice"], 1, "/dʒʌst/ es just. Yeast empieza por /j/, no por /dʒ/."),
  ex("b1-camera", "¿Qué palabra corresponde a /ˈkæmərə/?", "Fonética", ["camera", "commerce", "camel", "comma"], 0, "/ˈkæmərə/ es camera. El acento va en la primera sílaba."),
];

const B2: PartyExercise[] = [
  ex("b2-third", "Completa: If I ___ earlier, I would have caught the train.", "Gramática", ["left", "had left", "would leave", "have left"], 1, "Third conditional: If + had + participio, would have + participio."),
  ex("b2-wish", "Quieres saber la respuesta ahora y no la sabes. ¿Qué es correcto?", "Gramática", ["I wish I know the answer", "I wish I knew the answer", "I wish I had know the answer", "I wish I knowing"], 1, "Un deseo sobre el presente usa pasado: I wish I knew."),
  ex("b2-reported", "«I am tired», dijo Ana ayer. ¿Cómo lo cuentas?", "Gramática", ["Ana said she is tired", "Ana said she was tired", "Ana said she were tired now", "Ana told she is tired"], 1, "Al pasar a pasado, am suele pasar a was. Ana said she was tired."),
  ex("b2-hardly", "Elige la inversión correcta.", "Gramática", ["Hardly I had arrived when it started", "Hardly had I arrived when it started", "Hardly I arrived when it had started", "Had hardly I arrived when it started"], 1, "Hardly had I arrived when… El auxiliar va delante del sujeto."),
  ex("b2-rather", "Completa: I would rather you ___ here tonight.", "Gramática", ["stay", "stayed", "to stay", "staying"], 1, "Would rather + otro sujeto pide pasado. I would rather you stayed."),
  ex("b2-finished", "Completa: By Friday I ___ the report.", "Gramática", ["will finish", "will have finished", "have finished", "am finishing"], 1, "By Friday mira a un momento futuro ya completado. Will have finished."),
  ex("b2-must", "El abrigo no está. Estás casi seguro de que ya se fue. ¿Qué dices?", "Gramática", ["She must leave", "She must have left", "She can have left", "She must left"], 1, "Deducción sobre el pasado: must have + participio."),
  ex("b2-scarce", "El agua escasea. Water is…", "Vocabulario", ["scared", "scarce", "scary", "scarcely"], 1, "Escaso es scarce. Scared es asustado."),
  ex("b2-reluctant", "Completa: She is ___ to sign the form.", "Vocabulario", ["related", "reluctant", "relevant", "relaxed"], 1, "Reacio es reluctant: no quiere hacerlo, aunque podría."),
  ex("b2-worthwhile", "Merece la pena hacerlo. It is…", "Vocabulario", ["worthless", "worthwhile", "worthy of nothing", "meanwhile"], 1, "Que merece la pena es worthwhile. Worthless es sin valor."),
  ex("b2-outcome", "El resultado final de un proceso es the…", "Vocabulario", ["income", "outcome", "outline", "outfit"], 1, "El resultado es the outcome. Income es ingreso."),
  ex("b2-reliable", "Alguien en quien confías siempre es…", "Vocabulario", ["reliant", "reliable", "relative", "relevant"], 1, "Fiable es reliable. Reliant significa que depende de algo."),
  ex("b2-broaden", "Completa: The course will ___ your horizons.", "Vocabulario", ["brighten", "broaden", "broad", "borrow"], 1, "Ampliar es broaden. Broad es el adjetivo «amplio»."),
  ex("b2-issue", "Un asunto que el equipo tiene que tratar es an…", "Vocabulario", ["tissue", "issue", "essay", "asset"], 1, "Un asunto a tratar es an issue."),
  ex("b2-come-up", "Se te ocurre una idea. ¿Qué dices?", "Phrasal verb", ["I come up an idea", "I come up with an idea", "I come down with an idea", "I come on an idea"], 1, "Come up with es idear. Come down with es enfermar."),
  ex("b2-put-up", "Soportas el ruido. ¿Qué dices?", "Phrasal verb", ["I put up the noise", "I put up with the noise", "I put with the noise", "I put down with the noise"], 1, "Put up with es soportar."),
  ex("b2-bring-up", "Mencionas el tema en la reunión. ¿Qué dices?", "Phrasal verb", ["I bring the topic", "I bring up the topic", "I bring on the topic", "I bring off the topic"], 1, "Bring up es mencionar. Bring on es causar."),
  ex("b2-call-off", "Canceláis el partido por la lluvia. ¿Qué decís?", "Phrasal verb", ["We called the match out", "We called the match off", "We called the match up", "We called off to the match"], 1, "Call off es cancelar."),
  ex("b2-fall-through", "El plan no llega a hacerse. ¿Qué dices?", "Phrasal verb", ["The plan fell out", "The plan fell through", "The plan fell up", "The plan fell on"], 1, "Fall through es fracasar un plan."),
  ex("b2-make-up", "Esto compensa el retraso. ¿Qué dices?", "Phrasal verb", ["This makes up the delay", "This makes up for the delay", "This makes for the delay", "This makes off the delay"], 1, "Make up for es compensar."),
  ex("b2-break-down", "El coche se avería. ¿Qué dices?", "Phrasal verb", ["The car broke up", "The car broke down", "The car broke off", "The car broke in"], 1, "Break down es averiarse. Break up es romper una relación o descomponer."),
  ex("b2-comprehensive", "A comprehensive report es…", "False friend", ["un informe comprensivo y amable", "un informe amplio", "un informe muy corto", "un informe secreto"], 1, "Comprehensive es amplio o completo. Comprensivo, en el sentido de empático, es understanding."),
  ex("b2-notorious", "A notorious criminal es…", "False friend", ["un delincuente simplemente conocido", "un delincuente famoso por lo malo", "un delincuente anónimo", "un notario"], 1, "Notorious es famoso por algo negativo. Conocido, sin ese matiz, es well-known."),
  ex("b2-fastidious", "She is fastidious about details. ¿Cómo es?", "False friend", ["fastidiosa y pesada", "muy meticulosa", "rápida", "distraída"], 1, "Fastidious es meticuloso o exigente. Pesado es annoying."),
  ex("b2-eventual", "The eventual winner llegó el domingo. Eventual significa…", "False friend", ["posible", "final", "parcial", "antiguo"], 1, "Eventual es el que resulta al final. Posible no es su significado."),
  ex("b2-sympathy", "She showed sympathy. ¿Qué mostró?", "False friend", ["simpatía alegre", "compasión", "prisa", "duda"], 1, "Sympathy es compasión. El aprecio alegre se acerca más a liking."),
  ex("b2-compromise", "Llegan a un compromise. ¿Qué ha pasado?", "False friend", ["Uno impone su plan sin cambios", "Cada parte cede algo", "Se van sin hablar", "Firman sin leer"], 1, "A compromise es un acuerdo en el que las dos partes ceden. Un compromiso de agenda es an appointment."),
  ex("b2-policy", "A company policy es…", "False friend", ["la policía de la empresa", "una norma de la empresa", "un político", "la población"], 1, "Policy es una norma o un plan. La policía es the police."),
  ex("b2-thought", "¿Qué palabra corresponde a /θɔːt/?", "Fonética", ["taught", "thought", "though", "throat"], 1, "/θɔːt/ es thought. Taught es /tɔːt/, sin /θ/."),
  ex("b2-rhythm", "¿Qué palabra corresponde a /ˈrɪðəm/?", "Fonética", ["rhyme", "rhythm", "river", "item"], 1, "/ˈrɪðəm/ es rhythm. Rhyme, la rima, es /raɪm/."),
  ex("b2-enough", "¿Qué palabra corresponde a /ɪˈnʌf/?", "Fonética", ["although", "enough", "offer", "night"], 1, "/ɪˈnʌf/ es enough. La -gh final suena /f/."),
  ex("b2-bath", "En el sur de Inglaterra, bath se transcribe…", "Fonética", ["/bæθ/", "/bɑːθ/", "/beɪθ/", "/bɒθ/"], 1, "En el sur de Inglaterra, bath es /bɑːθ/. En el norte también se oye /bæθ/."),
  ex("b2-daughter", "¿Qué palabra corresponde a /ˈdɔːtə/?", "Fonética", ["doctor", "daughter", "door", "date"], 1, "/ˈdɔːtə/ es daughter. Doctor es /ˈdɒktə/."),
  ex("b2-international", "¿Qué palabra corresponde a /ˌɪntəˈnæʃnəl/?", "Fonética", ["national", "international", "internet", "interview"], 1, "/ˌɪntəˈnæʃnəl/ es international. El acento principal cae en -na-."),
  ex("b2-would", "En el habla rápida, would en «I would go» suele sonar…", "Fonética", ["/wʊd/", "/wəd/", "/wɪd/", "/wɒt/"], 1, "La forma átona de would es /wəd/. /wʊd/ es la forma tónica."),
];

const C1: PartyExercise[] = [
  ex("c1-not-only", "Elige la inversión correcta.", "Gramática", ["Not only she won, but she broke the record", "Not only did she win, but she also broke the record", "Not only won she, but she broke the record", "Did not only she win, but broke the record"], 1, "Not only + auxiliar + sujeto. Not only did she win, but she also…"),
  ex("c1-suggest", "Completa: The board suggested that he ___ the report before Friday.", "Gramática", ["submit", "submitting", "to submit", "submission"], 0, "Suggest that + sujeto + infinitivo sin to: that he submit the report."),
  ex("c1-cleft", "Queremos destacar el retraso como causa. ¿Qué frase lo hace?", "Gramática", ["The delay caused the cancellation", "It was the delay that caused the cancellation", "The delay it caused the cancellation", "That the delay caused it the cancellation"], 1, "It was the delay that… pone el foco en el retraso."),
  ex("c1-had", "Elige la condicional invertida correcta.", "Gramática", ["Had I known, I would have called", "Had I know, I would call", "If had I known, I would have called", "Did I known, I would have called"], 0, "Had I known equivale a If I had known."),
  ex("c1-no-sooner", "Elige la frase correcta.", "Gramática", ["No sooner the film started than the lights went out", "No sooner had the film started than the lights went out", "No sooner had started the film than the lights went out", "No sooner the film had started when the lights went out"], 1, "No sooner had + sujeto + participio than…"),
  ex("c1-were", "Completa: ___ it not for the grant, the lab would have closed.", "Gramática", ["If", "Were", "Was", "Had"], 1, "Were it not for… equivale a If it were not for."),
  ex("c1-little", "Elige la inversión correcta.", "Gramática", ["Little they knew about the risk", "Little did they know about the risk", "Little knew they about the risk", "Did little they know about the risk"], 1, "Little did they know… El auxiliar va delante del sujeto."),
  ex("c1-mitigate", "Completa: The new filter should ___ the risk.", "Vocabulario", ["migrate", "mitigate", "meditate", "imitate"], 1, "Atenuar un riesgo es mitigate. Migrate es migrar."),
  ex("c1-scrutiny", "Un examen muy minucioso es…", "Vocabulario", ["security", "scrutiny", "script", "screen"], 1, "El examen minucioso es scrutiny."),
  ex("c1-plausible", "Una explicación que puede creerse es…", "Vocabulario", ["pleasant", "plausible", "playful", "portable"], 1, "Verosímil es plausible."),
  ex("c1-tradeoff", "Ganas tiempo y pierdes calidad. Eso es a…", "Vocabulario", ["trade", "trade-off", "take-off", "turn-off"], 1, "Ese intercambio de costes es a trade-off."),
  ex("c1-underlying", "Completa: We still do not know the ___ cause.", "Vocabulario", ["underlining", "underlying", "underground", "understanding"], 1, "La causa que está debajo es the underlying cause."),
  ex("c1-benchmark", "La referencia con la que comparas un resultado es a…", "Vocabulario", ["bench", "benchmark", "remark", "mark-up"], 1, "El punto de referencia es a benchmark."),
  ex("c1-nuanced", "Una respuesta con matices, no en blanco y negro, es…", "Vocabulario", ["annoyed", "nuanced", "numbered", "narrow"], 1, "Con matices es nuanced."),
  ex("c1-brush", "Repasas el francés antes del viaje. ¿Qué dices?", "Phrasal verb", ["I brush off my French", "I brush up on my French", "I brush my French", "I brush in French"], 1, "Brush up on es repasar algo que ya sabías."),
  ex("c1-boil", "Al final, el problema se reduce al precio. ¿Qué dices?", "Phrasal verb", ["It boils up to the price", "It boils down to the price", "It boils the price down", "It boils for the price"], 1, "Boil down to es reducirse a lo esencial."),
  ex("c1-account", "¿Cómo preguntas por la causa de la diferencia?", "Phrasal verb", ["How do you account the difference?", "How do you account for the difference?", "How do you account up the difference?", "How do you account off the difference?"], 1, "Account for es explicar la causa."),
  ex("c1-gloss", "Evita el detalle incómodo. ¿Qué hace?", "Phrasal verb", ["He glossed the mistake", "He glossed over the mistake", "He glossed up the mistake", "He glossed off the mistake"], 1, "Gloss over es pasar por encima de un punto incómodo."),
  ex("c1-phase", "Retiran el producto poco a poco. ¿Qué hacen?", "Phrasal verb", ["They are phasing the product", "They are phasing out the product", "They are phasing up the product", "They are phasing the product on"], 1, "Phase out es retirar de forma gradual."),
  ex("c1-zero", "Os centráis en la causa. ¿Qué decís?", "Phrasal verb", ["We zero on the cause", "We zero in on the cause", "We zero up the cause", "We zero the cause in"], 1, "Zero in on es centrarse en un punto."),
  ex("c1-play-down", "Quitan importancia al error. ¿Qué hacen?", "Phrasal verb", ["They played the error", "They played down the error", "They played up the error", "They played off the error"], 1, "Play down es quitar importancia. Play up es destacarlo."),
  ex("c1-ingenuous", "An ingenuous remark es un comentario…", "False friend", ["ingenioso", "ingenuo", "técnico", "falso"], 1, "Ingenuous es ingenuo. Ingenioso es ingenious."),
  ex("c1-morale", "The team's morale is low. ¿Qué está bajo?", "False friend", ["su ética", "su ánimo", "su doctrina", "su salario"], 1, "Morale es el ánimo del grupo. La ética es moral."),
  ex("c1-idiom", "A common idiom es…", "False friend", ["un idioma", "una expresión hecha", "un idioma muerto", "una idea suelta"], 1, "An idiom es una expresión hecha. Un idioma es a language."),
  ex("c1-casual", "Casual clothes son ropa…", "False friend", ["de gala", "informal", "de uniforme", "de laboratorio"], 1, "Casual clothes es ropa informal. Casual, en el sentido de fortuito, no describe esta ropa."),
  ex("c1-prospect", "There is little prospect of change. Prospect significa…", "False friend", ["un folleto", "una posibilidad", "un paisaje", "un profesor"], 1, "Prospect es una posibilidad. Un folleto es a brochure."),
  ex("c1-retire", "She will retire next year. ¿Qué hará?", "False friend", ["retirar un producto", "jubilarse", "volver a contratar", "rendirse en un juego"], 1, "Retire es jubilarse. Retirar un objeto es remove o withdraw."),
  ex("c1-actually", "Actually, I don't eat meat. Actually significa…", "False friend", ["actualmente", "en realidad", "a veces", "además"], 1, "Actually precisa o corrige: en realidad. Actualmente es currently."),
  ex("c1-experience", "¿Qué palabra corresponde a /ɪkˈspɪəriəns/?", "Fonética", ["experiment", "experience", "expert", "expensive"], 1, "/ɪkˈspɪəriəns/ es experience. Experiment es /ɪkˈsperɪmənt/."),
  ex("c1-challenge", "¿Qué palabra corresponde a /ˈtʃælɪndʒ/?", "Fonética", ["change", "challenge", "channel", "college"], 1, "/ˈtʃælɪndʒ/ es challenge."),
  ex("c1-artificial", "¿Qué palabra corresponde a /ˌɑːtɪˈfɪʃl/?", "Fonética", ["official", "artificial", "beneficial", "art"], 1, "/ˌɑːtɪˈfɪʃl/ es artificial."),
  ex("c1-differentiate", "¿Qué palabra corresponde a /ˌdɪfəˈrenʃieɪt/?", "Fonética", ["different", "differentiate", "difference", "difficult"], 1, "/ˌdɪfəˈrenʃieɪt/ es differentiate. El acento principal cae en -ren-."),
  ex("c1-secretary", "En el inglés británico habitual, secretary se transcribe…", "Fonética", ["/ˈsiːkrɪt/", "/ˈsekrətri/", "/seˈkriːtəri/", "/ˈsɒkrət/"], 1, "En inglés británico, secretary suele ser /ˈsekrətri/."),
  ex("c1-to", "En «going to», la palabra to átona suele sonar…", "Fonética", ["/tuː/", "/tə/", "/tɪ/", "/θə/"], 1, "La forma átona de to es /tə/. /tuː/ es la forma tónica."),
  ex("c1-law", "¿Qué palabra corresponde a /lɔː/?", "Fonética", ["low", "law", "lot", "laugh"], 1, "/lɔː/ es law. Low es /ləʊ/."),
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
  const bank = exercisesForLevel(level);
  const queues = KINDS.map((kind) => shuffle(bank.filter((item) => item.hint === kind), random));
  const extras = shuffle(
    bank.filter((item) => !(KINDS as readonly string[]).includes(item.hint)),
    random,
  );
  if (extras.length > 0) queues.push(extras);
  const unique: PartyExercise[] = [];
  while (queues.some((group) => group.length > 0)) {
    for (const group of queues) {
      const next = group.pop();
      if (next) unique.push(next);
    }
  }
  if (unique.length === 0 || count <= 0) return [];
  const dealt: PartyExercise[] = [];
  for (let i = 0; i < count; i += 1) {
    const source = unique[i % unique.length];
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
