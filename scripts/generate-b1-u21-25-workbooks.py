#!/usr/bin/env python3
"""Generate B1 Units 21–25 exercise workbooks (ejercicios-soluciones)."""
from pathlib import Path

OUT = Path("src/content/blog/curso-b1")
DATE = "2026-08-31"

LISTEN = {
    21: "Hi, I am Sara. I enjoy hiking at the weekend. She wants to visit a museum. We finished painting the room. They decided to go camping. I avoid sitting all day and I need to practise photography.",
    22: "Hi, I am Ben. I like cooking in the kitchen. I prefer living in a quiet flat. Remember to lock the door. She forgot turning off the dishwasher. Try cleaning the kitchen first.",
    23: "Hi, I am Carla. Please turn off the lights. Put on your coat. Take off your shoes. Hurry up or we'll be late. Can you look after my bag? Calm down and breathe.",
    24: "Hi, I am Diego. I need to find out the opening times. Don't give up. We will look into the refund. Please fill in this form. Hand in your receipt at the checkout.",
    25: "Hi, I am Elena. I enjoy cycling. She wants to buy a new sofa. Remember to turn off the lights. Please fill in the form and hand it in. I found out the shop gives discounts on Monday.",
}

READ = {
    21: "I enjoy hiking and cycling at the weekend. My sister wants to visit a new museum this month. We finished painting the living room yesterday. They decided to go camping next Friday. I need to practise photography more often and I avoid sitting all day.",
    22: "I prefer living near a park. Remember to lock the door when you leave. She forgot turning off the washing machine. Try restarting the vacuum cleaner. We love spending evenings in the garden and I like cooking in the kitchen.",
    23: "Every morning I turn on the radio and put on my jacket. Hurry up, the bus is coming. Please take off your shoes and calm down. My neighbour looks after my plants when I travel. Don't forget to turn off the lights.",
    24: "I found out the shop opens at nine. Don't give up if your size is missing — ask the cashier. They looked into my refund request. Please fill in the form and hand in your receipt at the checkout. There's a discount this week.",
    25: "I enjoy cycling and I want to buy a new bike. Remember to turn off the lights before you leave. Please fill in the form and hand it in at the desk. I found out the shop gives discounts on Monday so I won't give up looking for a bargain.",
}

META = {
    21: dict(
        slug="unidad-21-gerund-infinitive-hobbies",
        title="Gerund vs Infinitive (1) & Hobbies",
        full="Gerund vs Infinitive (1) & Hobbies & Leisure",
        focus="gerund vs infinitive (enjoy/finish + -ing; want/need/decide + to)",
        vocab="hobbies & leisure",
        image="/blog/curso-b1/unit-21/gerund-infinitive-1.png",
        prev="unidad-20-repaso-16-19-ejercicios-soluciones",
        next_t="unidad-22-gerund-infinitive-house",
        r_title="Weekend hobbies",
        l_title="Sara's hobbies",
        kw=["gerund infinitive ejercicios", "enjoy hiking", "want to visit"],
    ),
    22: dict(
        slug="unidad-22-gerund-infinitive-house",
        title="Gerund vs Infinitive (2) & House",
        full="Gerund vs Infinitive (2) & House & Home",
        focus="like/love/prefer; remember/forget/try (+ -ing or to)",
        vocab="house & home",
        image="/blog/curso-b1/unit-22/gerund-infinitive-2.png",
        prev="unidad-21-gerund-infinitive-hobbies-ejercicios-soluciones",
        next_t="unidad-23-phrasal-verbs-daily",
        r_title="At home",
        l_title="Ben at home",
        kw=["remember to ejercicios", "prefer living", "house vocabulary ejercicios"],
    ),
    23: dict(
        slug="unidad-23-phrasal-verbs-daily",
        title="Phrasal Verbs 1 & Daily",
        full="Phrasal Verbs 1 & Daily Activities",
        focus="phrasal verbs 1 (turn on/off, put on, take off, hurry up, calm down, look after)",
        vocab="daily activities",
        image="/blog/curso-b1/unit-23/phrasals-1.png",
        prev="unidad-22-gerund-infinitive-house-ejercicios-soluciones",
        next_t="unidad-24-phrasal-verbs-shopping",
        r_title="Morning routine",
        l_title="Carla's morning",
        kw=["phrasal verbs ejercicios B1", "turn off put on", "look after"],
    ),
    24: dict(
        slug="unidad-24-phrasal-verbs-shopping",
        title="Phrasal Verbs 2 & Shopping",
        full="Phrasal Verbs 2 & Shopping",
        focus="phrasal verbs 2 (find out, give up, look into, fill in, hand in)",
        vocab="shopping",
        image="/blog/curso-b1/unit-24/phrasals-2.png",
        prev="unidad-23-phrasal-verbs-daily-ejercicios-soluciones",
        next_t="unidad-25-repaso-21-24",
        r_title="At the shop",
        l_title="Diego shopping",
        kw=["find out give up ejercicios", "fill in hand in", "shopping vocabulary"],
    ),
    25: dict(
        slug="unidad-25-repaso-21-24",
        title="Repaso 21–24",
        full="Repaso 21–24: Gerunds, Infinitives & Phrasals",
        focus="gerund/infinitive y phrasal verbs (mix U21–24)",
        vocab="hobbies, house, daily activities, shopping (mix)",
        image="/blog/curso-b1/unit-25/review-map.png",
        prev="unidad-24-phrasal-verbs-shopping-ejercicios-soluciones",
        next_t="unidad-21-gerund-infinitive-hobbies",
        r_title="Mixed review",
        l_title="Elena's mixed review",
        kw=["repaso gerund phrasal B1", "gerund infinitive review", "phrasal verbs review"],
    ),
}

GRAM = {
    21: {
        "a": [
            ("I enjoy ___ at the weekend.", "hiking / to hike / hike", "hiking"),
            ("She wants ___ a museum.", "to visit / visiting / visit", "to visit"),
            ("We finished ___ the room.", "painting / to paint / paint", "painting"),
            ("They decided ___ camping.", "to go / going / go", "to go"),
            ("I avoid ___ all day.", "sitting / to sit / sit", "sitting"),
        ],
        "b": [
            ("I need ___ photography.", "to practise / practising / practise", "to practise"),
            ("He suggested ___ to the cinema.", "going / to go / go", "going"),
            ("We hope ___ the exam.", "to pass / passing / pass", "to pass"),
            ("Keep ___!", "practising / to practise / practise", "practising"),
            ("She plans ___ a picnic.", "to have / having / have", "to have"),
        ],
        "c": [
            ("*I enjoy to hike.*", "I enjoy **hiking**."),
            ("*She wants visiting a museum.*", "She wants **to visit** a museum."),
            ("*We finished to paint.*", "We finished **painting**."),
            ("*They decided going camping.*", "They decided **to go** camping."),
            ("*I need practising more.*", "I need **to practise** more."),
        ],
    },
    22: {
        "a": [
            ("Remember ___ the door. (reminder)", "to lock / locking / lock", "to lock"),
            ("I remember ___ it. (memory)", "locking / to lock / lock", "locking"),
            ("I prefer ___ near a park.", "living / to live / live", "living"),
            ("Try ___ the kitchen first.", "cleaning / to clean / clean", "cleaning"),
            ("I like ___ in the kitchen.", "cooking / to cook / cook", "cooking"),
        ],
        "b": [
            ("She forgot ___ off the dishwasher.", "turning / to turn / turn", "turning"),
            ("Don't forget ___ the door.", "to lock / locking / lock", "to lock"),
            ("We love ___ evenings in the garden.", "spending / to spend / spend", "spending"),
            ("Try ___ the vacuum cleaner.", "restarting / to restart / restart", "restarting"),
            ("I prefer ___ in a quiet flat.", "living / to live / live", "living"),
        ],
        "c": [
            ("*Remember locking the door.* (reminder)", "Remember **to lock** the door."),
            ("*I remember to lock it yesterday.* (memory)", "I remember **locking** it."),
            ("*Try to cleaning first.*", "Try **cleaning** / Try **to clean**…"),
            ("*She forgot to turning it off.*", "She forgot **turning** / forgot **to turn**…"),
            ("*I prefer live near a park.*", "I prefer **living** / **to live**…"),
        ],
    },
    23: {
        "a": [
            ("Please turn ___ the lights.", "off / on / after", "off"),
            ("___ on your coat.", "Put / Take / Look", "Put"),
            ("Take ___ your shoes.", "off / on / up", "off"),
            ("___ up or we'll be late.", "Hurry / Calm / Turn", "Hurry"),
            ("Can you look ___ my bag?", "after / off / up", "after"),
        ],
        "b": [
            ("Please ___ down.", "calm / hurry / turn", "calm"),
            ("Turn ___ the radio.", "on / after / in", "on"),
            ("Put ___ your jacket.", "on / off / after", "on"),
            ("Who looks ___ the dog?", "after / off / up", "after"),
            ("Don't forget to turn ___ the TV.", "off / after / in", "off"),
        ],
        "c": [
            ("*Turn the lights off it.*", "Turn **off** the lights. / Turn **them off**."),
            ("*Put on it.*", "Put **it on**."),
            ("*Look the bag after.*", "**Look after** the bag."),
            ("*Hurry the up.*", "**Hurry up**."),
            ("*Take off your shoes off.*", "**Take off** your shoes."),
        ],
    },
    24: {
        "a": [
            ("I need to find ___ the opening times.", "out / up / in", "out"),
            ("Don't give ___.", "up / out / in", "up"),
            ("We'll look ___ the refund.", "into / after / off", "into"),
            ("Please fill ___ this form.", "in / out / up", "in"),
            ("Hand ___ your receipt.", "in / out / up", "in"),
        ],
        "b": [
            ("She ___ out the price yesterday.", "found / gave / filled", "found"),
            ("He ___ up smoking last year.", "gave / found / handed", "gave"),
            ("They ___ into my request.", "looked / filled / handed", "looked"),
            ("___ in the form, please.", "Fill / Find / Give", "Fill"),
            ("___ in your receipt at the checkout.", "Hand / Find / Give", "Hand"),
        ],
        "c": [
            ("*Find the opening times out the.*", "**Find out** the opening times."),
            ("*Don't give the up.*", "Don't **give up**."),
            ("*Fill the form.* (phrasal)", "**Fill in** the form."),
            ("*Hand your receipt.* (phrasal)", "**Hand in** your receipt."),
            ("*Look the refund into.*", "**Look into** the refund."),
        ],
    },
    25: {
        "a": [
            ("I enjoy ___.", "cycling / to cycle / cycle", "cycling"),
            ("She wants ___ a sofa.", "to buy / buying / buy", "to buy"),
            ("Remember ___ off the lights.", "to turn / turning / turn", "to turn"),
            ("Please fill ___ the form.", "in / out / up", "in"),
            ("I found ___ the discount.", "out / up / in", "out"),
        ],
        "b": [
            ("Don't give ___.", "up / out / in", "up"),
            ("Turn ___ the lights.", "off / after / into", "off"),
            ("We finished ___.", "painting / to paint / paint", "painting"),
            ("They decided ___ camping.", "to go / going / go", "to go"),
            ("Hand ___ the receipt.", "in / out / up", "in"),
        ],
        "c": [
            ("*I enjoy to cycle.*", "I enjoy **cycling**."),
            ("*She wants buying a sofa.*", "She wants **to buy** a sofa."),
            ("*Remember turning off the lights.* (reminder)", "Remember **to turn** off…"),
            ("*Find the discount.* (phrasal)", "**Find out** the discount."),
            ("*Fill the form.*", "**Fill in** the form."),
        ],
    },
}

VOCAB = {
    21: {
        "a": [
            ("hiking", "senderismo · recibo · nevera", "senderismo"),
            ("camping", "camping · descuento · lavadora", "camping"),
            ("museum", "museo · checkout · pasillo", "museo"),
            ("photography", "fotografía · refund · sofa", "fotografía"),
            ("cycling", "ciclismo · cashier · garden", "ciclismo"),
        ],
        "b": [
            ("picnic ≈ ___", "picnic / receipt / fridge", "picnic"),
            ("jogging ≈ ___", "footing / discount / hallway", "footing"),
            ("cinema ≈ ___", "cine / refund / dishwasher", "cine"),
            ("excursion ≈ ___", "excursión / checkout / garage", "excursión"),
            ("relaxing ≈ ___", "relajarse / bargain / vacuum", "relajarse"),
        ],
    },
    22: {
        "a": [
            ("fridge", "nevera · hiking · receipt", "nevera"),
            ("dishwasher", "lavavajillas · camping · discount", "lavavajillas"),
            ("sofa", "sofá · museum · refund", "sofá"),
            ("garden", "jardín · photography · cashier", "jardín"),
            ("vacuum cleaner", "aspiradora · cycling · bargain", "aspiradora"),
        ],
        "b": [
            ("kitchen ≈ ___", "cocina / picnic / sale", "cocina"),
            ("bedroom ≈ ___", "dormitorio / hiking / queue", "dormitorio"),
            ("hallway ≈ ___", "pasillo / camping / size", "pasillo"),
            ("washing machine ≈ ___", "lavadora / museum / price tag", "lavadora"),
            ("garage ≈ ___", "garaje / jogging / exchange", "garaje"),
        ],
    },
    23: {
        "a": [
            ("wake up", "despertarse · rellenar · averiguar", "despertarse"),
            ("get dressed", "vestirse · entregar · investigar", "vestirse"),
            ("commute", "ir al trabajo · descuento · sofá", "ir al trabajo"),
            ("take a break", "hacer una pausa · camping · refund", "hacer una pausa"),
            ("do housework", "hacer tareas · museum · cashier", "hacer tareas"),
        ],
        "b": [
            ("turn off ≈ ___", "apagar / rellenar / averiguar", "apagar"),
            ("put on ≈ ___", "ponerse / entregar / investigar", "ponerse"),
            ("hurry up ≈ ___", "darse prisa / descuento / sofá", "darse prisa"),
            ("look after ≈ ___", "cuidar / camping / refund", "cuidar"),
            ("calm down ≈ ___", "calmarse / museum / cashier", "calmarse"),
        ],
    },
    24: {
        "a": [
            ("receipt", "recibo · hiking · nevera", "recibo"),
            ("discount", "descuento · camping · lavadora", "descuento"),
            ("refund", "devolución · museum · sofá", "devolución"),
            ("checkout", "caja · photography · garden", "caja"),
            ("bargain", "chollo · cycling · garage", "chollo"),
        ],
        "b": [
            ("find out ≈ ___", "averiguar / apagar / ponerse", "averiguar"),
            ("give up ≈ ___", "rendirse / cuidar / calmarse", "rendirse"),
            ("fill in ≈ ___", "rellenar / darse prisa / despertarse", "rellenar"),
            ("hand in ≈ ___", "entregar / vestirse / ir al trabajo", "entregar"),
            ("look into ≈ ___", "investigar / apagar / picnic", "investigar"),
        ],
    },
    25: {
        "a": [
            ("hiking", "senderismo · recibo · nevera", "senderismo"),
            ("fridge", "nevera · discount · hurry", "nevera"),
            ("receipt", "recibo · camping · sofa", "recibo"),
            ("look after", "cuidar · museum · refund", "cuidar"),
            ("find out", "averiguar · photography · garden", "averiguar"),
        ],
        "b": [
            ("enjoy + ___", "-ing / to / off", "-ing"),
            ("want + ___", "to / -ing / after", "to"),
            ("remember (reminder) + ___", "to / off / into", "to"),
            ("turn ___", "off/on / in / out", "off/on"),
            ("fill ___ / hand ___", "in / after / up", "in"),
        ],
    },
}

READ_Q = {
    21: [
        ("Enjoy what?", "hiking and cycling", "hiking/cycling / shopping only"),
        ("Sister wants to ___", "visit a museum", "visit museum / sleep"),
        ("Finished ___", "painting the living room", "painting / swimming"),
        ("Decided to ___", "go camping", "camping / refund"),
        ("Need to practise ___", "photography", "photography / French only"),
        ("Avoid ___", "sitting all day", "sitting / eating never"),
        ("Main grammar?", "gerund vs infinitive", "gerund/inf / passive"),
        ("Find enjoy + -ing", "enjoy hiking and cycling", "(open)"),
        ("Find want + to", "wants to visit", "(open)"),
        ("Find finish + -ing", "finished painting", "(open)"),
        ("Find decide + to", "decided to go camping", "(open)"),
        ("Write 1 enjoy + 1 want", "Model OK", "(open)"),
        ("Hobby vocab?", "hiking, cycling, museum, camping, photography", "yes / none"),
        ("enjoy to hike OK?", "False", "False / True"),
        ("Course link", "/curso-b1/unit-21", "/curso-b1/unit-21"),
    ],
    22: [
        ("Prefer living ___", "near a park", "near a park / in a tent"),
        ("Remember to ___", "lock the door", "lock / unlock forever"),
        ("Forgot ___", "turning off the washing machine", "turning off / buying"),
        ("Try ___", "restarting the vacuum cleaner", "restarting / selling"),
        ("Love spending evenings ___", "in the garden", "garden / office"),
        ("Like cooking ___", "in the kitchen", "kitchen / garage"),
        ("remember to = reminder?", "Yes", "Yes / No"),
        ("Main grammar?", "like/prefer + remember/try", "remember/try / third"),
        ("Find remember to", "Remember to lock", "(open)"),
        ("Find forgot + -ing", "forgot turning off", "(open)"),
        ("Find prefer + -ing", "prefer living", "(open)"),
        ("Write remember to…", "Model OK", "(open)"),
        ("House vocab?", "park, door, washing machine, vacuum, garden, kitchen", "yes / none"),
        ("remember locking = memory?", "Yes", "Yes / No"),
        ("Course link", "/curso-b1/unit-22", "/curso-b1/unit-22"),
    ],
    23: [
        ("Turn on the ___", "radio", "radio / fridge only"),
        ("Put on ___", "jacket", "jacket / receipt"),
        ("Hurry up — the ___ is coming", "bus", "bus / sale"),
        ("Take off ___", "shoes", "shoes / coat only"),
        ("Calm ___", "down", "down / up"),
        ("Looks after ___", "plants", "plants / receipts"),
        ("Turn off the ___", "lights", "lights / dog"),
        ("Main grammar?", "phrasals 1", "phrasals / gerund only"),
        ("Find turn on/off", "turn on the radio / turn off the lights", "(open)"),
        ("Find put on / take off", "put on jacket / take off shoes", "(open)"),
        ("Find look after", "looks after my plants", "(open)"),
        ("Write hurry up…", "Model OK", "(open)"),
        ("Daily vocab?", "morning, radio, bus, shoes, plants, lights", "yes / none"),
        ("Put on it OK?", "False (Put it on)", "False / True"),
        ("Course link", "/curso-b1/unit-23", "/curso-b1/unit-23"),
    ],
    24: [
        ("Found out shop opens at ___", "nine", "nine / midnight"),
        ("Don't give up if size is ___", "missing", "missing / perfect"),
        ("Ask the ___", "cashier", "cashier / neighbour"),
        ("Looked into ___", "refund request", "refund / hiking"),
        ("Fill in the ___", "form", "form / sofa"),
        ("Hand in ___ at checkout", "receipt", "receipt / dog"),
        ("There's a ___ this week", "discount", "discount / storm"),
        ("Main grammar?", "phrasals 2", "phrasals 2 / passive"),
        ("Find find out", "found out the shop opens", "(open)"),
        ("Find give up", "Don't give up", "(open)"),
        ("Find fill in / hand in", "fill in the form / hand in your receipt", "(open)"),
        ("Write find out…", "Model OK", "(open)"),
        ("Shopping vocab?", "shop, size, cashier, refund, form, receipt, checkout, discount", "yes / none"),
        ("find = find out?", "False", "False / True"),
        ("Course link", "/curso-b1/unit-24", "/curso-b1/unit-24"),
    ],
    25: [
        ("Enjoy ___", "cycling", "cycling / sleeping only"),
        ("Want to buy ___", "a new bike", "bike / fridge only"),
        ("Remember to ___", "turn off the lights", "turn off lights / swim"),
        ("Fill in the ___", "form", "form / garden"),
        ("Hand it in at the ___", "desk", "desk / cinema"),
        ("Found out discounts on ___", "Monday", "Monday / never"),
        ("Won't give up looking for a ___", "bargain", "bargain / storm"),
        ("Find gerund", "enjoy cycling", "(open)"),
        ("Find infinitive", "want to buy / Remember to turn", "(open)"),
        ("Find phrasal daily", "turn off", "(open)"),
        ("Find phrasal shopping", "fill in / hand in / found out / give up", "(open)"),
        ("Write 1× each block", "Model OK", "(open)"),
        ("Mixed review?", "Yes", "Yes / No"),
        ("Course link", "/curso-b1/unit-25", "/curso-b1/unit-25"),
        ("Main idea?", "gerunds + phrasals together", "mixed / only A1"),
    ],
}

LISTEN_Q = {
    21: [
        ("Who speaks?", "Sara", "Sara / Ben / Carla"),
        ("Enjoy ___", "hiking", "hiking / shopping"),
        ("Wants to visit ___", "a museum", "museum / office"),
        ("Finished ___", "painting the room", "painting / sleeping"),
        ("Decided to ___", "go camping", "camping / refund"),
        ("Avoid ___", "sitting all day", "sitting / eating never"),
        ("Need to practise ___", "photography", "photography / French"),
        ("Grammar?", "gerund vs infinitive", "gerund/inf / passive"),
        ("Find -ing", "enjoy hiking / finished painting / avoid sitting", "(open)"),
        ("Find to", "wants to visit / decided to go / need to practise", "(open)"),
        ("Write 1 enjoy + 1 want", "Model OK", "(open)"),
        ("Hobby words?", "hiking, museum, painting, camping, photography", "yes / none"),
        ("Shadow audio", "done", "(open)"),
        ("enjoy to hike?", "False", "False / True"),
        ("Open Ver solución", "yes", "yes"),
    ],
    22: [
        ("Who speaks?", "Ben", "Ben / Sara / Diego"),
        ("Likes ___", "cooking in the kitchen", "cooking / hiking only"),
        ("Prefers living in ___", "a quiet flat", "quiet flat / noisy street"),
        ("Remember to ___", "lock the door", "lock / unlock forever"),
        ("Forgot ___", "turning off the dishwasher", "turning off / buying"),
        ("Try ___", "cleaning the kitchen first", "cleaning / selling"),
        ("Grammar?", "like/prefer + remember/try", "remember/try / third"),
        ("remember to = reminder?", "Yes", "Yes / No"),
        ("Find remember to", "Remember to lock", "(open)"),
        ("Find forgot + -ing", "forgot turning off", "(open)"),
        ("Write prefer + -ing", "Model OK", "(open)"),
        ("House words?", "kitchen, flat, door, dishwasher", "yes / none"),
        ("Shadow audio", "done", "(open)"),
        ("remember locking = memory?", "Yes", "Yes / No"),
        ("Open Ver solución", "yes", "yes"),
    ],
    23: [
        ("Who speaks?", "Carla", "Carla / Ben / Elena"),
        ("Turn off ___", "the lights", "lights / radio only"),
        ("Put on ___", "your coat", "coat / shoes"),
        ("Take off ___", "your shoes", "shoes / coat"),
        ("Hurry up or ___", "we'll be late", "late / early"),
        ("Look after ___", "my bag", "bag / dog"),
        ("Calm ___", "down", "down / up"),
        ("Grammar?", "phrasals 1", "phrasals / gerund"),
        ("Find turn off / put on", "turn off lights / put on coat", "(open)"),
        ("Find look after", "look after my bag", "(open)"),
        ("Write hurry up…", "Model OK", "(open)"),
        ("Daily words?", "lights, coat, shoes, bag", "yes / none"),
        ("Shadow audio", "done", "(open)"),
        ("Put on it?", "False", "False / True"),
        ("Open Ver solución", "yes", "yes"),
    ],
    24: [
        ("Who speaks?", "Diego", "Diego / Carla / Sara"),
        ("Find out ___", "opening times", "opening times / weather"),
        ("Don't ___", "give up", "give up / turn off"),
        ("Look into ___", "the refund", "refund / hiking"),
        ("Fill in ___", "this form", "form / sofa"),
        ("Hand in ___", "receipt at checkout", "receipt / bag"),
        ("Grammar?", "phrasals 2", "phrasals 2 / passive"),
        ("Find find out", "find out the opening times", "(open)"),
        ("Find fill in / hand in", "fill in form / hand in receipt", "(open)"),
        ("Write don't give up…", "Model OK", "(open)"),
        ("Shopping words?", "opening times, refund, form, receipt, checkout", "yes / none"),
        ("Shadow audio", "done", "(open)"),
        ("find = find out?", "False", "False / True"),
        ("Open Ver solución", "yes", "yes"),
        ("look into = investigate?", "Yes", "Yes / No"),
    ],
    25: [
        ("Who speaks?", "Elena", "Elena / Diego / Ben"),
        ("Enjoy ___", "cycling", "cycling / cooking only"),
        ("Wants to buy ___", "a new sofa", "sofa / ticket"),
        ("Remember to ___", "turn off the lights", "turn off / swim"),
        ("Fill in + hand in", "form / it in", "form / receipt"),
        ("Found out discounts on ___", "Monday", "Monday / never"),
        ("Classify enjoy cycling", "gerund", "gerund / phrasal / to"),
        ("Classify wants to buy", "infinitive", "infinitive / phrasal"),
        ("Classify turn off", "phrasal 1", "phrasal 1 / gerund"),
        ("Classify fill in / find out", "phrasal 2", "phrasal 2 / passive"),
        ("Write 1× each type", "Model OK", "(open)"),
        ("Shadow audio", "done", "(open)"),
        ("Mixed review?", "Yes", "Yes / No"),
        ("Course unit", "/curso-b1/unit-25", "/curso-b1/unit-25"),
        ("Open Ver solución", "yes", "yes"),
    ],
}

WRITE = {
    21: (
        [
            "Escribe 2× -ing (enjoy/finish) + 2× to (want/decide).",
            "Completa: I enjoy ___ (hike).",
            "Completa: She wants ___ (visit) a museum.",
            "Completa: We finished ___ (paint).",
            "Completa: They decided ___ (go) camping.",
            "Corrige: *I enjoy to hike.*",
            "Corrige: *She wants visiting a museum.*",
            "Usa *hiking* y *museum* en 2 frases.",
            "Escribe: I need to practise photography.",
            "Párrafo (3–4 frases) sobre hobbies con -ing y to.",
            "Traduce: Disfruto haciendo senderismo.",
            "Traduce: Quiere visitar un museo.",
            "Pregunta Do you enjoy…? + respuesta.",
            "Escribe 1× avoid + -ing.",
            "Autochequeo: enjoy/finish → -ing; want/need/decide → to.",
        ],
        [
            "Open 2+2.",
            "**hiking**",
            "**to visit**",
            "**painting**",
            "**to go**",
            "I enjoy **hiking**.",
            "She wants **to visit** a museum.",
            "I enjoy hiking. She wants to visit a museum.",
            "OK.",
            "Open hobbies paragraph.",
            "I enjoy hiking.",
            "She wants to visit a museum.",
            "Do you enjoy cycling? — Yes, I enjoy cycling.",
            "I avoid sitting all day.",
            "Self-check.",
        ],
    ),
    22: (
        [
            "Escribe remember to + remember -ing + prefer + try -ing.",
            "Completa: Remember ___ (lock) the door. (reminder)",
            "Completa: I remember ___ (lock) it. (memory)",
            "Completa: I prefer ___ (live) near a park.",
            "Completa: Try ___ (clean) the kitchen first.",
            "Corrige: *Remember locking the door.* (si es recordatorio)",
            "Usa *fridge* y *dishwasher* en 2 frases.",
            "Escribe: She forgot turning off the washing machine.",
            "Escribe: I like cooking in the kitchen.",
            "Mini-diálogo en casa (remember/forget).",
            "Traduce: No olvides cerrar con llave.",
            "Traduce: Prefiero vivir en un piso tranquilo.",
            "Explica remember to vs remember -ing en 1 frase.",
            "Escribe 1× love + -ing.",
            "Autochequeo: reminder = to; memory/experiment = -ing.",
        ],
        [
            "Open four structures.",
            "**to lock**",
            "**locking**",
            "**living / to live**",
            "**cleaning**",
            "Remember **to lock**…",
            "The fridge is new. She forgot turning off the dishwasher.",
            "OK.",
            "OK.",
            "Open dialogue.",
            "Remember to lock the door.",
            "I prefer living / to live in a quiet flat.",
            "to = don't forget; -ing = I recall doing it.",
            "We love spending evenings in the garden.",
            "Self-check.",
        ],
    ),
    23: (
        [
            "Escribe 5 frases: turn off, put on, take off, hurry up, look after.",
            "Completa: Please turn ___ the lights.",
            "Completa: ___ on your coat.",
            "Completa: Take ___ your shoes.",
            "Completa: ___ up or we'll be late.",
            "Completa: Look ___ my bag.",
            "Corrige: *Put on it.*",
            "Corrige: *Look the bag after.*",
            "Usa *calm down* en 1 frase.",
            "Mini-diálogo de mañana (2 phrasals).",
            "Traduce: Apaga las luces.",
            "Traduce: Ponte el abrigo.",
            "Traduce: ¿Puedes cuidar mi bolso?",
            "Escribe Turn on… + Turn off…",
            "Autochequeo: partículas on/off/up/after.",
        ],
        [
            "Open five sentences.",
            "**off**",
            "**Put**",
            "**off**",
            "**Hurry**",
            "**after**",
            "Put **it on**.",
            "**Look after** the bag.",
            "Please calm down.",
            "Open dialogue.",
            "Turn off the lights.",
            "Put on your coat.",
            "Can you look after my bag?",
            "Turn on the radio. Turn off the TV.",
            "Self-check.",
        ],
    ),
    24: (
        [
            "Escribe find out, give up, look into, fill in, hand in.",
            "Completa: Find ___ the opening times.",
            "Completa: Don't give ___.",
            "Completa: Look ___ the refund.",
            "Completa: Fill ___ this form.",
            "Completa: Hand ___ your receipt.",
            "Corrige: *Fill the form.* (phrasal)",
            "Corrige: *Find the times.* (phrasal)",
            "Usa *discount* y *refund* en 2 frases con phrasals.",
            "Mini-diálogo en la tienda.",
            "Traduce: Averigua el horario.",
            "Traduce: No te rindas.",
            "Traduce: Rellena el formulario y entrega el recibo.",
            "Escribe 1× look into…",
            "Autochequeo: out/up/into/in.",
        ],
        [
            "Open five sentences.",
            "**out**",
            "**up**",
            "**into**",
            "**in**",
            "**in**",
            "**Fill in** the form.",
            "**Find out** the times.",
            "I found out there's a discount. They looked into my refund.",
            "Open dialogue.",
            "Find out the opening times.",
            "Don't give up.",
            "Fill in the form and hand in the receipt.",
            "We'll look into the problem.",
            "Self-check.",
        ],
    ),
    25: (
        [
            "Una frase: enjoy -ing, want to, remember to, turn off, find out, fill in.",
            "Completa: I enjoy ___.",
            "Completa: She wants ___ a sofa.",
            "Completa: Remember ___ off the lights.",
            "Completa: Please fill ___ the form.",
            "Completa: I found ___ the discount.",
            "Completa: Don't give ___.",
            "Corrige: *I enjoy to cycle.*",
            "Corrige: *She wants buying a sofa.*",
            "Corrige: *Fill the form.*",
            "Mini-historia (5 frases) mezclando U21–U24.",
            "Matching: -ing / to / phrasal daily / phrasal shopping.",
            "Traduce: Disfruto montando en bici.",
            "Traduce: Averigüé el descuento.",
            "Autochequeo con el mapa de la Unidad 25.",
        ],
        [
            "Open — one of each.",
            "**cycling** (etc.)",
            "**to buy**",
            "**to turn**",
            "**in**",
            "**out**",
            "**up**",
            "I enjoy **cycling**.",
            "She wants **to buy** a sofa.",
            "**Fill in** the form.",
            "Open mixed paragraph.",
            "enjoy=-ing; want=to; turn off=daily; find out/fill in=shopping.",
            "I enjoy cycling.",
            "I found out the discount.",
            "Self-check vs review map.",
        ],
    ),
}


def block_abc(items, kind="fill"):
    lines, answers = [], []
    for i, row in enumerate(items, 1):
        if kind == "fix":
            q, sol = row
            lines.append(f"{i}. {q}")
            answers.append(f"{i}. {sol}")
        else:
            q, opts, sol = row
            lines.append(f"{i}. {q} → *{opts}*")
            answers.append(f"{i}. **{sol}**")
    return "\n".join(lines), " · ".join(answers) if kind != "fix" else "\n".join(answers)


def render_unit(u: int) -> str:
    m, g, v = META[u], GRAM[u], VOCAB[u]
    rq, lq = READ_Q[u], LISTEN_Q[u]
    wp, ws = WRITE[u]
    g1q, g1a = block_abc(g["a"])
    g2q, g2a = block_abc(g["b"])
    g3q, g3a = block_abc(g["c"], kind="fix")
    v1q, v1a = block_abc(v["a"])
    v2q, v2a = block_abc(v["b"])

    def qa_list(rows, start=1):
        q_lines, a_lines = [], []
        for i, (q, sol, opts) in enumerate(rows, start):
            q_lines.append(f"{i}. {q}" if opts == "(open)" else f"{i}. {q} → *{opts}*")
            a_lines.append(f"{i}. **{sol}**")
        return "\n".join(q_lines), " · ".join(a_lines)

    r1q, r1a = qa_list(rq[:5], 1)
    r2q, r2a = qa_list(rq[5:10], 6)
    r3q, r3a = qa_list(rq[10:], 11)
    l1q, l1a = qa_list(lq[:5], 1)
    l2q, l2a = qa_list(lq[5:10], 6)
    l3q, l3a = qa_list(lq[10:], 11)
    w_q = "\n".join(f"{i}. {t}" for i, t in enumerate(wp, 1))
    w_a = "\n".join(f"{i}. {t}" for i, t in enumerate(ws, 1))
    bing = [
        "curso de inglés gratis",
        "aprender inglés gratis",
        "curso de inglés online gratis",
        "curso inglés B1 gratis",
        "ejercicios inglés B1 gratis",
    ]
    kws = "\n".join(f"  - {k}" for k in [f"ejercicios inglés B1 unidad {u}", *m["kw"], "curso B1 Linguafly", *bing])
    next_line = (
        f"3. Siguiente: [{META[u + 1]['title']}](/blog/curso-b1/{m['next_t']}-ejercicios-soluciones)."
        if u < 25
        else "3. Siguiente bloque del curso: [Unidad 26](/curso-b1/unit-26)."
    )
    return f"""---
category: curso-b1
date: '{DATE}'
updatedDate: '{DATE}'
author: linguafly-team
title: 'Ejercicios Unidad {u} B1: {m["title"]} (con soluciones)'
description: >-
  Practica todos los ejercicios de la Unidad {u} del curso B1: {m["focus"]};
  {m["vocab"]}, reading, listening y writing. Con soluciones comentadas.
readTime: 25 min
keywords:
{kws}
canonical: 'https://linguafly.app/blog/curso-b1/{m["slug"]}-ejercicios-soluciones'
image: {m["image"]}
alt: {m["title"]} — ejercicios B1 Unidad {u}
related_routes:
  - {m["slug"]}
  - {m["prev"]}
  - cursos-online-ingles-b1
faqs:
  - question: ¿Qué ejercicios incluye la Unidad {u} del curso B1?
    answer: >-
      Cinco lecciones con 15 actividades cada una sobre {m["focus"]},
      más reading, listening y writing.
  - question: ¿Cómo uso este artículo?
    answer: >-
      Haz cada ejercicio sin mirar la solución. Después abre «Ver solución» y
      lee la explicación. Si fallas, repasa la guía teórica y el curso.
  - question: ¿Cuál es el foco gramatical?
    answer: >-
      {m["focus"]}.
  - question: ¿Dónde practico en el curso?
    answer: >-
      En la Unidad {u} del curso B1 de Linguafly: gramática, vocabulario,
      reading, listening, speaking y writing.
excerpt: >-
  Cuaderno de ejercicios de la Unidad {u} B1 ({m["title"]}) con soluciones.
---
Este artículo reúne **los ejercicios de la Unidad {u} del curso B1** (*{m["full"]}*) con **soluciones comentadas**.

> **Guía teórica:** [{m["title"]} B1](/blog/curso-b1/{m["slug"]})  
> **Practica en el curso:** [Unidad {u} — {m["title"]}](/curso-b1/unit-{u})

Haz cada bloque **sin mirar** la solución. Luego comprueba y lee la explicación.

![{m["title"]}]({m["image"]})

**Contenido de la unidad:**
1. [Lección 1 — Gramática](#leccion-1--gramatica)
2. [Lección 2 — Vocabulario](#leccion-2--vocabulario)
3. [Lección 3 — Reading: {m["r_title"]}](#leccion-3--reading)
4. [Lección 4 — Listening: {m["l_title"]}](#leccion-4--listening)
5. [Lección 5 — Writing](#leccion-5--writing)

---

## Lección 1 — Gramática

**Objetivo:** {m["focus"]}

### Ejercicios 1–5 — Completa

{g1q}

<details>
<summary>Ver solución</summary>

{g1a}

</details>

### Ejercicios 6–10 — Elige / completa

{g2q}

<details>
<summary>Ver solución</summary>

{g2a}

</details>

### Ejercicios 11–15 — Corrige

{g3q}

<details>
<summary>Ver solución</summary>

{g3a}

</details>

---

## Lección 2 — Vocabulario

**Objetivo:** {m["vocab"]}

### Ejercicios 1–5 — Empareja / elige

{v1q}

<details>
<summary>Ver solución</summary>

{v1a}

</details>

### Ejercicios 6–10 — Completa

{v2q}

<details>
<summary>Ver solución</summary>

{v2a}

</details>

### Ejercicios 11–15 — En contexto

11. Usa 3 palabras nuevas en frases con el foco gramatical.
12. Di en voz alta el vocabulario de la unidad.
13. Empareja cada palabra con un ejemplo personal.
14. Revisa la tabla de vocabulario de la [guía teórica](/blog/curso-b1/{m["slug"]}).
15. Continúa en la [Unidad {u} del curso](/curso-b1/unit-{u}).

<details>
<summary>Ver solución</summary>

11–13. Open answers — check meaning in theory. · 14. Theory vocab section. · 15. **/curso-b1/unit-{u}**

</details>

---

## Lección 3 — Reading: {m["r_title"]}

**Objetivo:** comprender un texto con el foco de la unidad.

### Texto y audio

<audio controls preload="none" src="/audio/blog/curso-b1/unit-{u}/reading-workbook.mp3" title="🔊 Reading: {m["r_title"]}"></audio>

> {READ[u]}

### Ejercicios 1–5 — Comprensión

{r1q}

<details>
<summary>Ver solución</summary>

{r1a}

</details>

### Ejercicios 6–10 — Detalles

{r2q}

<details>
<summary>Ver solución</summary>

{r2a}

</details>

### Ejercicios 11–15 — Forma

{r3q}

<details>
<summary>Ver solución</summary>

{r3a}

</details>

---

## Lección 4 — Listening: {m["l_title"]}

**Objetivo:** escuchar el foco gramatical en contexto.

### Audio y guion

<audio controls preload="none" src="/audio/blog/curso-b1/unit-{u}/listening-workbook.mp3" title="🔊 Listening: {m["l_title"]}"></audio>

> {LISTEN[u]}

### Ejercicios 1–5 — Comprensión

{l1q}

<details>
<summary>Ver solución</summary>

{l1a}

</details>

### Ejercicios 6–10 — Detalles

{l2q}

<details>
<summary>Ver solución</summary>

{l2a}

</details>

### Ejercicios 11–15 — Forma

{l3q}

<details>
<summary>Ver solución</summary>

{l3a}

</details>

---

## Lección 5 — Writing

**Objetivo:** producir frases con el foco de la unidad.

{w_q}

<details>
<summary>Ver solución</summary>

{w_a}

</details>

---

## Cómo seguir

1. Repasa fallos en la [guía teórica](/blog/curso-b1/{m["slug"]}).  
2. Practica en la [Unidad {u} del curso B1](/curso-b1/unit-{u}).  
{next_line}

Guías relacionadas:

- [Teoría Unidad {u}](/blog/curso-b1/{m["slug"]})
- [Cuaderno anterior](/blog/curso-b1/{m["prev"]})
- [Inglés B1](/blog/metodos/cursos-online-ingles-b1)

---

*Cuaderno alineado con la Unidad {u} del [curso B1 de Linguafly](/curso-b1).*
"""


def main():
    for u in (21, 22, 23, 24, 25):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path, path.stat().st_size)


if __name__ == "__main__":
    main()
