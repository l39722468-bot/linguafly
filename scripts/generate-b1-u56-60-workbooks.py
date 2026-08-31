#!/usr/bin/env python3
"""Generate B1 Units 56–60 exercise workbooks + TTS."""
from pathlib import Path
from gtts import gTTS

OUT = Path("src/content/blog/curso-b1")
ROOT = Path(__file__).resolve().parents[1]
DATE = "2026-08-31"

LISTEN = {
    56: "Hi, I am Paul. The match was cancelled due to rain. If you practised more, you would improve faster. I have been playing football since I was ten. If they had trained harder, they would have won. She told me that she had won the race.",
    57: "Hi, I am Rachel. This dress is made of cotton. I'd rather wear blue than red. The shirt which I bought last week is too small. This jacket is more expensive than that one. Although it was expensive, I bought it.",
    58: "Hi, I am Sam. The new bridge was built last year. I'd rather live in the countryside than in the city. There are many shops in the town centre. The village where I grew up is very small. I have been living here since 2015.",
    59: "Hi, I am Tina. If you study hard, you will pass the exam. You should read the instructions carefully. I have been practising for three months. If I had had more time, I would have checked my answers. The exam is taken by hundreds of students every year.",
    60: "Hi, I am Victor. If water reaches 100 degrees, it boils. The letter was sent yesterday. She told me that she would come the next day. If I were rich, I would travel the world. If I had known earlier, I would have come. I have been living here since 2015.",
}

READ = {
    56: "The match was cancelled due to rain. If you practised more, you would improve faster. I have been playing football since I was ten. If they had trained harder, they would have won. She told me that she had won the race.",
    57: "This dress is made of cotton. I'd rather wear blue than red. The shirt which I bought last week is too small. This jacket is more expensive than that one. Although it was expensive, I bought it.",
    58: "The new bridge was built last year. I'd rather live in the countryside than in the city. There are many shops in the town centre. The village where I grew up is very small. I have been living here since 2015.",
    59: "If you study hard, you will pass the exam. You should read the instructions carefully. I have been practising for three months. If I had had more time, I would have checked my answers. The exam is taken by hundreds of students every year.",
    60: "If water reaches 100 degrees, it boils. The letter was sent yesterday. She told me that she would come the next day. If I were rich, I would travel the world. If I had known earlier, I would have come. I have been living here since 2015.",
}

META = {
    56: dict(slug="unidad-56-mixed-grammar-sport", title="Mixed Grammar: Sport", full="Mixed Grammar Practice & Sport", focus="mixed grammar B1 (conditionals, passive, modals, tenses, reported)", vocab="sport", image="/blog/curso-b1/unit-56/mixed-grammar-map.png", prev="unidad-55-repaso-51-54-ejercicios-soluciones", next_t="unidad-57-mixed-grammar-clothes-colours", r_title="Sport & grammar", l_title="Paul on sport", kw=["mixed grammar sport B1", "deporte inglés ejercicios", "práctica gramatical mixta"]),
    57: dict(slug="unidad-57-mixed-grammar-clothes-colours", title="Mixed Grammar: Clothes", full="Mixed Grammar Practice | Clothes & Colours", focus="passive, would rather, relatives, comparatives, although", vocab="clothes & colours", image="/blog/curso-b1/unit-57/mixed-grammar-map.png", prev="unidad-56-mixed-grammar-sport-ejercicios-soluciones", next_t="unidad-58-mixed-grammar-places", r_title="Fashion & grammar", l_title="Rachel on clothes", kw=["ropa colores ejercicios B1", "mixed grammar clothes", "would rather comparative"]),
    58: dict(slug="unidad-58-mixed-grammar-places", title="Mixed Grammar: Places", full="Mixed Grammar Practice | Places: Town & Countryside", focus="passive, would rather, there are, relative where, PP continuous", vocab="town & countryside", image="/blog/curso-b1/unit-58/mixed-grammar-map.png", prev="unidad-57-mixed-grammar-clothes-colours-ejercicios-soluciones", next_t="unidad-59-exam-preparation-strategies", r_title="Places & grammar", l_title="Sam on places", kw=["ciudad campo ejercicios B1", "mixed grammar places", "there are relative where"]),
    59: dict(slug="unidad-59-exam-preparation-strategies", title="Exam Preparation", full="Exam Preparation & Exam Strategies (PET/B1)", focus="PET/B1 exam strategies + mixed grammar in exam context", vocab="exam strategies", image="/blog/curso-b1/unit-59/exam-strategies-map.png", prev="unidad-58-mixed-grammar-places-ejercicios-soluciones", next_t="unidad-60-final-b1-review", r_title="Exam tips", l_title="Tina on the exam", kw=["PET B1 ejercicios", "exam preparation strategies", "preparación examen inglés B1"]),
    60: dict(slug="unidad-60-final-b1-review", title="Final B1 Review", full="Final B1 Review & Full Revision", focus="full B1 grammar revision (all modules U1–60)", vocab="full revision (mix)", image="/blog/curso-b1/unit-60/final-review-map.png", prev="unidad-59-exam-preparation-strategies-ejercicios-soluciones", next_t="unidad-56-mixed-grammar-sport", r_title="Full B1 review", l_title="Victor's final review", kw=["repaso final B1", "curso B1 completo ejercicios", "full revision B1"]),
}

GRAM = {
    56: {"a": [("The match ___ cancelled due to rain.", "was / is / has been", "was"), ("If you ___ more, you'd improve.", "practised / practice / had practised", "practised"), ("I ___ been playing since I was ten.", "have / has / had", "have"), ("If they ___ harder, they would have won.", "had trained / trained / train", "had trained"), ("She ___ me she had won.", "told / said / asked", "told")],
         "b": [("was cancelled → ___", "passive / first / modal", "passive"), ("If + past → would = ___", "second / third / zero", "second"), ("have been + -ing = ___", "PP continuous / past perfect / passive", "PP continuous"), ("had trained → would have = ___", "third / second / reported", "third"), ("told + person = ___", "reported / passive / conditional", "reported")],
         "c": [("*The match is cancelled due to rain.*", "The match **was cancelled** due to rain."), ("*If you will practise more…*", "If you **practised** more…"), ("*I have playing since I was ten.*", "I **have been playing** since I was ten."), ("*If they trained harder, they would have won.* (third)", "If they **had trained** harder, they **would have won**."), ("*She said me she had won.*", "She **told me** she had won.")]},
    57: {"a": [("This dress ___ made of cotton.", "is / was / makes", "is"), ("I'd ___ wear blue.", "rather / better / prefer", "rather"), ("The shirt ___ I bought is too small.", "which / who / where", "which"), ("This jacket is ___ expensive than that one.", "more / most / much", "more"), ("___ it was expensive, I bought it.", "Although / Because / Unless", "Although")],
         "b": [("is made of = ___", "passive present / active / past simple", "passive present"), ("would rather + ___", "bare inf / to inf / -ing", "bare inf"), ("which for things = ___", "relative / passive / modal", "relative"), ("more + adj = ___", "comparative / superlative / passive", "comparative"), ("Although = ___", "contrast / reason / condition", "contrast")],
         "c": [("*This dress was made of cotton.* (present fact)", "This dress **is made of** cotton."), ("*I'd rather to wear blue.*", "I'd **rather wear** blue."), ("*The shirt who I bought…*", "The shirt **which** I bought…"), ("*This jacket is expensiver…*", "This jacket is **more expensive**…"), ("*Because it was expensive, I bought it.* (contrast)", "**Although** it was expensive, I bought it.")]},
    58: {"a": [("The bridge ___ built last year.", "was / is / has been", "was"), ("I'd ___ live in the countryside.", "rather / better / prefer", "rather"), ("___ are many shops in the centre.", "There / It / They", "There"), ("The village ___ I grew up is small.", "where / which / who", "where"), ("I ___ been living here since 2015.", "have / has / had", "have")],
         "b": [("was built → ___", "passive past / active / present", "passive past"), ("would rather ≈ ___", "preference / obligation / deduction", "preference"), ("There are + ___", "plural noun / singular / infinitive", "plural noun"), ("where for places = ___", "relative / passive / modal", "relative"), ("since 2015 → ___", "PP continuous / past simple / future", "PP continuous")],
         "c": [("*The bridge is built last year.*", "The bridge **was built** last year."), ("*I'd rather to live…*", "I'd **rather live**…"), ("*It are many shops…*", "**There are** many shops…"), ("*The village which I grew up…*", "The village **where** I grew up…"), ("*I have living here since 2015.*", "I **have been living** here since 2015.")]},
    59: {"a": [("If you ___ hard, you will pass.", "study / studied / had studied", "study"), ("You ___ read the instructions.", "should / must / might", "should"), ("I ___ been practising for three months.", "have / has / had", "have"), ("If I ___ had more time, I would have checked.", "had / have / would", "had"), ("The exam ___ taken every year.", "is / was / has been", "is")],
         "b": [("If + present → will = ___", "first / second / third", "first"), ("should ≈ ___", "advice / deduction / passive", "advice"), ("have been + -ing = ___", "PP continuous / past perfect / passive", "PP continuous"), ("had had → would have = ___", "third / first / reported", "third"), ("is taken = ___", "passive present / active / modal", "passive present")],
         "c": [("*If you will study hard…*", "If you **study** hard…"), ("*You must to read the instructions.*", "You **should read** the instructions."), ("*I have been practise for three months.*", "I **have been practising** for three months."), ("*If I would have had more time…*", "If I **had had** more time…"), ("*The exam was taken every year.* (habit)", "The exam **is taken** every year.")]},
    60: {"a": [("If water ___ 100°C, it boils.", "reaches / reached / will reach", "reaches"), ("The letter ___ sent yesterday.", "was / is / has been", "was"), ("She ___ me she would come.", "told / said / asked", "told"), ("If I ___ rich, I would travel.", "were / am / had been", "were"), ("I ___ been living here since 2015.", "have / has / had", "have")],
         "b": [("If + present → present = ___", "zero / first / second", "zero"), ("was sent → ___", "passive / conditional / modal", "passive"), ("would come → ___", "reported / conditional / tense", "reported"), ("If I were → ___", "second / third / zero", "second"), ("have been living → ___", "PP continuous / past perfect / passive", "PP continuous")],
         "c": [("*If water will reach 100°C…*", "If water **reaches** 100°C…"), ("*The letter is sent yesterday.*", "The letter **was sent** yesterday."), ("*She said me she would come.*", "She **told me** she would come."), ("*If I was rich…*", "If I **were** rich…"), ("*I have living here since 2015.*", "I **have been living** here since 2015.")]},
}

VOCAB = {
    56: {"a": [("athlete", "atleta · coach · referee", "atleta"), ("stadium", "estadio · museum · hospital", "estadio"), ("trophy", "trofeo · ticket · train", "trofeo"), ("train (v.)", "entrenar · rest · celebrate", "entrenar"), ("marathon", "maratón · match · sprint", "maratón")],
         "b": [("match ≈ ___", "partido / medalla / equipo", "partido"), ("warm up ≈ ___", "calentar / ganar / perder", "calentar"), ("coach ≈ ___", "entrenador / árbitro / atleta", "entrenador"), ("win ≈ ___", "ganar / empatar / entrenar", "ganar"), ("team ≈ ___", "equipo / trofeo / estadio", "equipo")]},
    57: {"a": [("cotton", "algodón · leather · metal", "algodón"), ("try on", "probarse · quitarse · guardar", "probarse"), ("fashion", "moda · sport · food", "moda"), ("pale", "pálido · bright · dark", "pálido"), ("accessories", "complementos · zapatos solo · abrigos", "complementos")],
         "b": [("dark blue ≈ ___", "tono profundo / tono claro / sin color", "tono profundo"), ("match (v.) ≈ ___", "combinar / rechazar / contrastar", "combinar"), ("designer ≈ ___", "crea ropa / vende comida / conduce", "crea ropa"), ("leather ≈ ___", "material animal / planta / plástico", "material animal"), ("the most expensive = ___", "superlativo / comparativo / pasiva", "superlativo")]},
    58: {"a": [("countryside", "campo · city · street", "campo"), ("town centre", "centro / periferia / valle", "centro"), ("valley", "valle · montaña · río", "valle"), ("bridge", "puente · túnel · sendero", "puente"), ("suburb", "periferia · centro · campo", "periferia")],
         "b": [("village ≈ ___", "pueblo pequeño / gran ciudad / bosque", "pueblo pequeño"), ("There are ≈ ___", "existen (plural) / existe (singular) / tienen", "existen (plural)"), ("where for places ≈ ___", "relativa de lugar / persona / cosa", "relativa de lugar"), ("forest ≈ ___", "bosque / lago / plaza", "bosque"), ("museum ≈ ___", "museo / estación / hospital", "museo")]},
    59: {"a": [("instructions", "instrucciones · answers · results", "instrucciones"), ("time limit", "límite de tiempo · break · score", "límite de tiempo"), ("multiple choice", "opción múltiple · essay · gap-fill", "opción múltiple"), ("check", "revisar · guess · skip", "revisar"), ("calm", "tranquilo · nervous · rushed", "tranquilo")],
         "b": [("skim ≈ ___", "lectura rápida general / escanear detalle / escribir", "lectura rápida general"), ("scan ≈ ___", "buscar información específica / leer todo / adivinar", "buscar información específica"), ("manage time ≈ ___", "gestionar tiempo / perder tiempo / ignorar", "gestionar tiempo"), ("stay calm ≈ ___", "mantenerse tranquilo / entrar en pánico / rendirse", "mantenerse tranquilo"), ("PET ≈ ___", "B1 Preliminary / A2 / C1", "B1 Preliminary")]},
    60: {"a": [("zero conditional", "hecho general · pasado irreal · futuro probable", "hecho general"), ("reported speech", "estilo indirecto · voz activa · imperativo", "estilo indirecto"), ("third conditional", "pasado irreal · futuro · pasiva", "pasado irreal"), ("PP continuous", "duración hasta ahora · momento cerrado · futuro", "duración hasta ahora"), ("full revision", "repaso completo · unidad nueva · examen A2", "repaso completo")],
         "b": [("If water reaches… → ___", "zero / first / second", "zero"), ("was sent → ___", "passive / modal / relative", "passive"), ("told me → ___", "reported / conditional / comparative", "reported"), ("If I were → ___", "second / third / zero", "second"), ("B1 complete = ___", "60 unidades / 50 / 40", "60 unidades")]},
}

def rq(u):
    bases = {
        56: [("Match ___ cancelled?", "was", "was / is"), ("If you ___ more?", "practised", "practised / practice"), ("___ been playing?", "have", "have / has"), ("They ___ harder?", "had trained", "had trained / trained"), ("She ___ me?", "told", "told / said"), ("Main grammar?", "mixed", "mixed / sport only"), ("Find passive", "was cancelled", "(open)"), ("Find third", "had trained would have won", "(open)"), ("Find PP continuous", "have been playing", "(open)"), ("Write 1× passive", "Model OK", "(open)"), ("Sport vocab?", "athlete, match, trophy", "yes / none"), ("Classify was cancelled", "passive", "passive / conditional"), ("Course", "/curso-b1/unit-56", "/curso-b1/unit-56"), ("told + person?", "True", "True / False"), ("Open Ver solución", "yes", "yes")],
        57: [("Dress ___ made of cotton?", "is", "is / was"), ("___ rather wear blue?", "rather", "rather / better"), ("Shirt ___ I bought?", "which", "which / who"), ("___ expensive than?", "more", "more / most"), ("___ expensive, I bought it", "Although", "Although / Because"), ("Main grammar?", "mixed/clothes", "mixed / vocab only"), ("Find would rather", "rather wear blue", "(open)"), ("Find relative", "which I bought", "(open)"), ("Find although", "Although it was expensive", "(open)"), ("Write comparative", "Model OK", "(open)"), ("Clothes vocab?", "cotton, try on, fashion", "yes / none"), ("would rather + to?", "False", "False / True"), ("Course", "/curso-b1/unit-57", "/curso-b1/unit-57"), ("is made of = passive?", "True", "True / False"), ("Open Ver solución", "yes", "yes")],
        58: [("Bridge ___ built?", "was", "was / is"), ("___ rather countryside?", "rather", "rather / better"), ("___ are many shops?", "There", "There / It"), ("Village ___ I grew up?", "where", "where / which"), ("___ been living since 2015?", "have", "have / has"), ("Main grammar?", "mixed/places", "mixed / vocab only"), ("Find there are", "There are many shops", "(open)"), ("Find where", "village where I grew up", "(open)"), ("Find PP continuous", "have been living", "(open)"), ("Write 1× passive", "Model OK", "(open)"), ("Places vocab?", "countryside, bridge, village", "yes / none"), ("where for places?", "True", "True / False"), ("Course", "/curso-b1/unit-58", "/curso-b1/unit-58"), ("since → PP?", "True", "True / False"), ("Open Ver solución", "yes", "yes")],
        59: [("If you ___ hard?", "study", "study / studied"), ("___ read instructions?", "should", "should / must"), ("___ been practising?", "have", "have / has"), ("If I ___ had time?", "had", "had / have"), ("Exam ___ taken?", "is", "is / was"), ("Main focus?", "exam prep", "exam / sport"), ("Find first conditional", "If you study you will pass", "(open)"), ("Find third", "had had would have checked", "(open)"), ("Exam tip?", "read instructions / manage time", "(open)"), ("Write should + advice", "Model OK", "(open)"), ("PET = B1?", "True", "True / False"), ("Shadow", "done", "(open)"), ("Course", "/curso-b1/unit-59", "/curso-b1/unit-59"), ("stay calm tip?", "yes", "yes / no"), ("Open Ver solución", "yes", "yes")],
        60: [("Water ___ 100°C?", "reaches", "reaches / reached"), ("Letter ___ sent?", "was", "was / is"), ("She ___ me?", "told", "told / said"), ("If I ___ rich?", "were", "were / was"), ("___ been living?", "have", "have / has"), ("Classify zero", "zero", "zero / first"), ("Classify passive", "passive", "passive / reported"), ("Classify second", "second", "second / third"), ("Classify PP continuous", "tense", "tense / passive"), ("Write 1× each type", "Model OK", "(open)"), ("B1 complete?", "60 units", "60 / 55"), ("Course", "/curso-b1/unit-60", "/curso-b1/unit-60"), ("Module 6 complete?", "Yes", "Yes / No"), ("Full course B1?", "Yes", "Yes / No"), ("Open Ver solución", "yes", "yes")],
    }
    return bases[u]

LISTEN_Q = {
    56: [("Who speaks?", "Paul", "Paul / Sam / Victor"), ("Match ___ cancelled", "was", "was / is"), ("If you ___ more", "practised", "practised / practice"), ("___ been playing", "have", "have / has"), ("They ___ harder", "had trained", "had trained / trained"), ("Main grammar?", "mixed", "mixed / passive only"), ("Find third conditional", "had trained would have won", "(open)"), ("Find reported", "told me she had won", "(open)"), ("Write passive", "Model OK", "(open)"), ("Sport words?", "match, trophy, train", "yes / none"), ("Shadow", "done", "(open)"), ("was cancelled = passive?", "True", "True / False"), ("Course", "/curso-b1/unit-56", "/curso-b1/unit-56"), ("PP continuous?", "have been playing", "yes / no"), ("Open Ver solución", "yes", "yes")],
    57: [("Who speaks?", "Rachel", "Rachel / Tina / Olivia"), ("Dress ___ cotton", "is made", "is made / was made"), ("___ rather blue", "rather", "rather / better"), ("Shirt ___ bought", "which", "which / who"), ("___ expensive", "more", "more / most"), ("Main grammar?", "mixed/clothes", "mixed / vocab"), ("Find although", "Although it was expensive", "(open)"), ("Find would rather", "rather wear blue", "(open)"), ("Write relative", "Model OK", "(open)"), ("Fashion vocab?", "cotton, try on", "yes / none"), ("Shadow", "done", "(open)"), ("rather + to?", "False", "False / True"), ("Course", "/curso-b1/unit-57", "/curso-b1/unit-57"), ("comparative?", "more expensive", "yes / no"), ("Open Ver solución", "yes", "yes")],
    58: [("Who speaks?", "Sam", "Sam / Paul / Victor"), ("Bridge ___ built", "was", "was / is"), ("___ rather countryside", "rather", "rather / better"), ("___ are shops", "There", "There / It"), ("Village ___ grew up", "where", "where / which"), ("Main grammar?", "mixed/places", "mixed / vocab"), ("Find there are", "There are many shops", "(open)"), ("Find where", "village where I grew up", "(open)"), ("Write PP continuous", "Model OK", "(open)"), ("Places words?", "bridge, countryside", "yes / none"), ("Shadow", "done", "(open)"), ("where = place?", "True", "True / False"), ("Course", "/curso-b1/unit-58", "/curso-b1/unit-58"), ("since 2015?", "have been living", "yes / no"), ("Open Ver solución", "yes", "yes")],
    59: [("Who speaks?", "Tina", "Tina / Rachel / Mia"), ("If you ___ hard", "study", "study / studied"), ("___ read instructions", "should", "should / must"), ("___ been practising", "have", "have / has"), ("Exam ___ taken", "is", "is / was"), ("Main focus?", "exam", "exam / sport"), ("Find first", "If you study you will pass", "(open)"), ("Find third", "had had would have checked", "(open)"), ("Exam strategy?", "read instructions", "(open)"), ("Write should", "Model OK", "(open)"), ("PET level?", "B1", "B1 / A2"), ("Shadow", "done", "(open)"), ("manage time?", "yes", "yes / no"), ("Course", "/curso-b1/unit-59", "/curso-b1/unit-59"), ("Open Ver solución", "yes", "yes")],
    60: [("Who speaks?", "Victor", "Victor / Paul / Noah"), ("Water ___ 100°C", "reaches", "reaches / reached"), ("Letter ___ sent", "was", "was / is"), ("She ___ me", "told", "told / said"), ("If I ___ rich", "were", "were / was"), ("Classify zero", "zero", "zero / first"), ("Classify passive", "passive", "passive / modal"), ("Classify second", "second", "second / third"), ("Classify PP cont.", "tense", "tense / passive"), ("Write mixed review", "Model OK", "(open)"), ("B1 60/60?", "Yes", "Yes / No"), ("Shadow", "done", "(open)"), ("Course complete?", "Yes", "Yes / No"), ("Course", "/curso-b1/unit-60", "/curso-b1/unit-60"), ("Open Ver solución", "yes", "yes")],
}

WRITE = {
    56: (["Escribe passive + second + third + PP continuous (sport).", "Completa: The match ___ cancelled.", "Completa: If you ___ more, you'd improve.", "Completa: I ___ been playing since I was ten.", "Completa: If they ___ harder, they would have won.", "Completa: She ___ me she had won.", "Corrige: *The match is cancelled due to rain.*", "Corrige: *If you will practise more…*", "Usa sport vocab en 3 frases.", "Mini-historia (4 frases) deporte + gramática mixta.", "Traduce: El partido fue cancelado por la lluvia.", "Traduce: Si hubieran entrenado más, habrían ganado.", "Explica passive vs active en 1 frase.", "Escribe 1× reported speech.", "Autochequeo: clasifica cada estructura."],
         ["Open four.", "**was**", "**practised**", "**have**", "**had trained**", "**told**", "The match **was cancelled**.", "If you **practised** more…", "Open.", "Open.", "The match was cancelled due to rain.", "If they had trained harder, they would have won.", "Passive: focus on action/object.", "OK.", "Self-check."]),
    57: (["Escribe passive + would rather + relative + although.", "Completa: This dress ___ made of cotton.", "Completa: I'd ___ wear blue.", "Completa: The shirt ___ I bought is too small.", "Completa: This jacket is ___ expensive.", "Completa: ___ it was expensive, I bought it.", "Corrige: *I'd rather to wear blue.*", "Corrige: *The shirt who I bought…*", "Usa try on y fashion en 2 frases.", "Mini-diálogo (4 frases) en una tienda.", "Traduce: Preferiría llevar azul.", "Traduce: Aunque era caro, lo compré.", "Explica would rather vs had better.", "Escribe 1× superlative.", "Autochequeo: relative which/who/where."],
         ["Open four.", "**is**", "**rather**", "**which**", "**more**", "**Although**", "I'd **rather wear** blue.", "The shirt **which** I bought…", "Open.", "Open.", "I'd rather wear blue than red.", "Although it was expensive, I bought it.", "Rather=preference; had better=strong advice.", "OK.", "Self-check."]),
    58: (["Escribe passive + would rather + there are + where.", "Completa: The bridge ___ built last year.", "Completa: I'd ___ live in the countryside.", "Completa: ___ are many shops.", "Completa: The village ___ I grew up.", "Completa: I ___ been living since 2015.", "Corrige: *It are many shops…*", "Corrige: *The village which I grew up…*", "Usa countryside y bridge en 2 frases.", "Mini-historia (4 frases) ciudad vs campo.", "Traduce: Hay muchas tiendas en el centro.", "Traduce: El pueblo donde crecí es pequeño.", "Explica there is vs there are.", "Escribe 1× second conditional (places).", "Autochequeo: where for places."],
         ["Open four.", "**was**", "**rather**", "**There**", "**where**", "**have**", "**There are** many shops.", "The village **where** I grew up…", "Open.", "Open.", "There are many shops in the town centre.", "The village where I grew up is very small.", "There is + singular; there are + plural.", "OK.", "Self-check."]),
    59: (["Escribe 3 exam tips + 3 grammar sentences.", "Completa: If you ___ hard, you will pass.", "Completa: You ___ read the instructions.", "Completa: I ___ been practising for three months.", "Completa: If I ___ had more time…", "Completa: The exam ___ taken every year.", "Corrige: *If you will study hard…*", "Corrige: *If I would have had more time…*", "Lista 3 estrategias PET (reading/listening/writing).", "Mini-texto (4 frases) sobre preparación examen.", "Traduce: Debes leer las instrucciones con cuidado.", "Traduce: Llevo tres meses practicando.", "Explica skim vs scan.", "Escribe 1× must (exam obligation).", "Autochequeo: time markers en cada frase."],
         ["Open tips + grammar.", "**study**", "**should**", "**have**", "**had**", "**is**", "If you **study** hard…", "If I **had had** more time…", "Open three tips.", "Open.", "You should read the instructions carefully.", "I have been practising for three months.", "Skim=general idea; scan=find detail.", "OK.", "Self-check."]),
    60: (["Una frase de cada área B1 (cond., passive, reported, modal, tense).", "Completa: If water ___ 100°C, it boils.", "Completa: The letter ___ sent yesterday.", "Completa: She ___ me she would come.", "Completa: If I ___ rich, I would travel.", "Completa: I ___ been living since 2015.", "Corrige: *If I was rich…*", "Corrige: *She said me she would come.*", "Corrige: *I have living here since 2015.*", "Mini-autoevaluación: 5 áreas B1.", "Matching: zero / passive / reported / second / PP cont.", "Traduce: Si lo hubiera sabido antes, habría venido.", "Traduce: Me dijo que vendría al día siguiente.", "Escribe mensaje final: B1 complete 60/60.", "Open Ver solución checklist."],
         ["Open one each.", "**reaches**", "**was**", "**told**", "**were**", "**have**", "If I **were** rich…", "She **told me** she would come.", "I **have been living** here since 2015.", "Open self-assessment.", "OK.", "If I had known earlier, I would have come.", "She told me that she would come the next day.", "Open — ¡B1 completo!", "yes."]),
}

READ_Q = {u: rq(u) for u in (56, 57, 58, 59, 60)}


def block_abc(items, kind="fill"):
    lines, answers = [], []
    for i, row in enumerate(items, 1):
        if kind == "fix":
            q, sol = row
            lines.append(f"{i}. {q}"); answers.append(f"{i}. {sol}")
        else:
            q, opts, sol = row
            lines.append(f"{i}. {q} → *{opts}*"); answers.append(f"{i}. **{sol}**")
    return "\n".join(lines), (" · ".join(answers) if kind != "fix" else "\n".join(answers))


def render_unit(u: int) -> str:
    m, g, v = META[u], GRAM[u], VOCAB[u]
    rq_, lq = READ_Q[u], LISTEN_Q[u]
    wp, ws = WRITE[u]
    g1q, g1a = block_abc(g["a"]); g2q, g2a = block_abc(g["b"]); g3q, g3a = block_abc(g["c"], kind="fix")
    v1q, v1a = block_abc(v["a"]); v2q, v2a = block_abc(v["b"])

    def qa_list(rows, start=1):
        q_lines, a_lines = [], []
        for i, (q, sol, opts) in enumerate(rows, start):
            q_lines.append(f"{i}. {q}" if opts == "(open)" else f"{i}. {q} → *{opts}*")
            a_lines.append(f"{i}. **{sol}**")
        return "\n".join(q_lines), " · ".join(a_lines)

    r1q, r1a = qa_list(rq_[:5], 1); r2q, r2a = qa_list(rq_[5:10], 6); r3q, r3a = qa_list(rq_[10:], 11)
    l1q, l1a = qa_list(lq[:5], 1); l2q, l2a = qa_list(lq[5:10], 6); l3q, l3a = qa_list(lq[10:], 11)
    w_q = "\n".join(f"{i}. {t}" for i, t in enumerate(wp, 1))
    w_a = "\n".join(f"{i}. {t}" for i, t in enumerate(ws, 1))
    bing = ["curso de inglés gratis", "aprender inglés gratis", "curso de inglés online gratis", "curso inglés B1 gratis", "ejercicios inglés B1 gratis"]
    kws = "\n".join(f"  - {k}" for k in [f"ejercicios inglés B1 unidad {u}", *m["kw"], "curso B1 Linguafly", *bing])
    next_line = (
        f"3. Siguiente: [{META[u + 1]['title']}](/blog/curso-b1/{m['next_t']}-ejercicios-soluciones)."
        if u < 60 else "3. **B1 completo (60/60)** — repasa cualquier unidad del [curso B1](/curso-b1)."
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


def patch_u55_workbook():
    path = OUT / "unidad-55-repaso-51-54-ejercicios-soluciones.md"
    text = path.read_text(encoding="utf-8")
    text = text.replace(
        "3. Módulo 6 primera mitad (U51–55) completa — siguiente bloque: [Unidad 56](/curso-b1/unit-56).",
        "3. Siguiente: [Mixed Grammar: Sport](/blog/curso-b1/unidad-56-mixed-grammar-sport-ejercicios-soluciones).",
    )
    path.write_text(text, encoding="utf-8")
    print("patched", path)


def make_audios():
    for u in (56, 57, 58, 59, 60):
        d = ROOT / f"public/audio/blog/curso-b1/unit-{u}"
        d.mkdir(parents=True, exist_ok=True)
        for name, text in (("reading-workbook", READ[u]), ("listening-workbook", LISTEN[u])):
            path = d / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def main():
    make_audios()
    for u in (56, 57, 58, 59, 60):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path)
    patch_u55_workbook()
    print("done U56–60 workbooks")


if __name__ == "__main__":
    main()
