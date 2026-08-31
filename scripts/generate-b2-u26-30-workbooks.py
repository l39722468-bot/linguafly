#!/usr/bin/env python3
"""Generate clear B2 Units 26–30 exercise workbooks and workbook TTS.

The workbooks follow the B2 U21–25 structure and the B1 U27 clarity model:
Spanish instructions, closed practice, complete answer keys, reading/listening
comprehension, and explicit models for writing and speaking.
"""
from __future__ import annotations

from pathlib import Path

from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/content/blog/curso-b2"
DATE = "2026-08-31"
HUB = "ingles-b2"

META = {
    26: {
        "slug": "unidad-26-phrasal-verbs-3-sustainability",
        "title": "Phrasal Verbs 3 & Sustainability",
        "full": "GET / GIVE / GO Phrasal Verbs + Sustainability & Eco-living",
        "focus": (
            "get over, get along with, get through; give up, give in, give away; "
            "go through, go on y go off"
        ),
        "vocab": "sustainability & eco-living",
        "image": "/blog/curso-b2/unit-26/phrasal-get-give-go.png",
        "prev": "unidad-25-repaso-21-24-ejercicios-soluciones",
        "next": "unidad-27-phrasal-verbs-4-music-ejercicios-soluciones",
        "next_title": "Unidad 27 — LOOK, MAKE, PUT + Music",
        "reading_title": "A neighbourhood zero-waste fair",
        "listening_title": "Lena reports on the eco fair",
        "remember": [
            "**get over** = recuperarse; **get through** = completar algo difícil o lograr contactar.",
            "**give up** = abandonar; **give in to** = ceder ante presión; **give away** = regalar.",
            "**go through** = experimentar o revisar; **go on** = continuar.",
            "**go off** = sonar una alarma o desarrollarse un evento (*go off well*).",
        ],
        "keywords": [
            "phrasal verbs GET GIVE GO ejercicios B2",
            "get through vs get over práctica",
            "give up give in give away ejercicios",
            "sustainability vocabulary B2 ejercicios",
        ],
    },
    27: {
        "slug": "unidad-27-phrasal-verbs-4-music",
        "title": "Phrasal Verbs 4 & Music",
        "full": "LOOK / MAKE / PUT Phrasal Verbs + Music & Entertainment",
        "focus": (
            "look into, look forward to, look after, look for; make up, make up for, "
            "make out, make for, make up one's mind; put off, put up at y put up with"
        ),
        "vocab": "music & entertainment",
        "image": "/blog/curso-b2/unit-27/phrasal-look-make-put.png",
        "prev": "unidad-26-phrasal-verbs-3-sustainability-ejercicios-soluciones",
        "next": "unidad-28-collocations-verb-noun-food-ejercicios-soluciones",
        "next_title": "Unidad 28 — Verb + Noun Collocations + Food",
        "reading_title": "One gig, three last-minute problems",
        "listening_title": "The promoter explains the delay",
        "remember": [
            "**look into** = investigar; **look for** = buscar; **look after** = cuidar.",
            "**look forward to** lleva nombre o *-ing*: *look forward to hearing the band*.",
            "**make up** = inventar; **make up for** = compensar; **make out** = distinguir.",
            "**put off** = posponer; **put up at** = alojarse; **put up with** = tolerar.",
        ],
        "keywords": [
            "phrasal verbs LOOK MAKE PUT ejercicios B2",
            "look forward to gerundio práctica",
            "make up vs make up for ejercicios",
            "music vocabulary B2 ejercicios",
        ],
    },
    28: {
        "slug": "unidad-28-collocations-verb-noun-food",
        "title": "Verb + Noun Collocations & Food",
        "full": "MAKE / TAKE / HAVE + Noun Collocations + Food & Gastronomy",
        "focus": (
            "take a break/photo/chance/note/responsibility; make a decision/mistake/"
            "progress/effort/suggestion/call/promise/noise/good impression; "
            "have a meeting/look/deadline/shower"
        ),
        "vocab": "food & gastronomy",
        "image": "/blog/curso-b2/unit-28/collocations-verb-noun.png",
        "prev": "unidad-27-phrasal-verbs-4-music-ejercicios-soluciones",
        "next": "unidad-29-collocations-adj-noun-psychology-ejercicios-soluciones",
        "next_title": "Unidad 29 — Adjective + Noun Collocations + Psychology",
        "reading_title": "Preparing a seasonal tasting menu",
        "listening_title": "Chef Amira's pre-service briefing",
        "remember": [
            "El sustantivo selecciona el verbo: **make a decision**, **take a photo**, **have a look**.",
            "**progress, responsibility** y **noise** normalmente no llevan *a* en estos chunks.",
            "Extensiones útiles: **take responsibility for**, **have a look at**, **take a photo of**.",
            "No uses *do* como comodín para las colocaciones de esta unidad.",
        ],
        "keywords": [
            "verb noun collocations B2 ejercicios",
            "make take have collocations práctica",
            "make a decision take responsibility ejercicios",
            "food gastronomy vocabulary B2",
        ],
    },
    29: {
        "slug": "unidad-29-collocations-adj-noun-psychology",
        "title": "Adjective + Noun Collocations & Psychology",
        "full": "Adjective + Noun Collocations + Psychology & Mind",
        "focus": (
            "strong anxiety/belief/influence; heavy burden/pressure; great progress/"
            "relief/success/interest; lively discussion; stunning results; high demand; "
            "full support; deep impact; remarkable memory/resilience; considerable controversy"
        ),
        "vocab": "psychology & mind",
        "image": "/blog/curso-b2/unit-29/collocations-adj-noun.png",
        "prev": "unidad-28-collocations-verb-noun-food-ejercicios-soluciones",
        "next": "unidad-30-repaso-26-29-ejercicios-soluciones",
        "next_title": "Unidad 30 — Repaso 26–29",
        "reading_title": "Pressure, support and a student project",
        "listening_title": "A tutor describes the wellbeing project",
        "remember": [
            "**strong** acompaña *anxiety, belief, influence*; **heavy**, *burden, pressure*.",
            "**great** acompaña *progress, relief, success, interest*.",
            "Aprende los chunks completos: **high demand, full support, deep impact**.",
            "**progress** y **relief** son incontables en *great progress / great relief*.",
        ],
        "keywords": [
            "adjective noun collocations B2 ejercicios",
            "strong anxiety heavy pressure práctica",
            "great progress remarkable resilience ejercicios",
            "psychology vocabulary B2 ejercicios",
        ],
    },
    30: {
        "slug": "unidad-30-repaso-26-29",
        "title": "Repaso 26–29",
        "full": "Repaso B2: Phrasal Verbs & Collocations de las Unidades 26–29",
        "focus": (
            "GET/GIVE/GO; LOOK/MAKE/PUT; collocations MAKE/TAKE/HAVE + noun; "
            "adjective + noun collocations"
        ),
        "vocab": "sustainability, music, gastronomy y psychology",
        "image": "/blog/curso-b2/unit-30/review-map.png",
        "prev": "unidad-29-collocations-adj-noun-psychology-ejercicios-soluciones",
        "next": "unidad-31-articles-education-ejercicios-soluciones",
        "next_title": "Unidad 31 — Articles & Education",
        "reading_title": "A sustainable food and music festival",
        "listening_title": "The organiser reviews festival day",
        "remember": [
            "Primero identifica el patrón: **phrasal**, **verb + noun** o **adjective + noun**.",
            "Comprueba partículas: *give in **to***, *make up **for***, *put up **with***.",
            "Comprueba artículos: *make **a** decision*, pero *make progress*.",
            "Recupera la pareja completa: **take responsibility**, **heavy pressure**, **full support**.",
        ],
        "keywords": [
            "repaso B2 unidades 26 29 ejercicios",
            "phrasal verbs collocations B2 práctica",
            "GET GIVE GO LOOK MAKE PUT review",
            "repaso módulo 3 B2 con soluciones",
        ],
    },
}

READING = {
    26: (
        "Lena's neighbourhood wanted to reduce its carbon footprint, so it organised a zero-waste fair. "
        "At first, Lena could not get through to the recycling centre, but she did not give up. "
        "She got along with the volunteers and eventually got through the difficult planning stage. "
        "Together, they went through every stall and replaced single-use plastic with reusable containers. "
        "Residents gave away jars, learned to compost and discussed renewable energy. "
        "A fire alarm went off during the first talk, but the programme went on after a short pause. "
        "In the end, the fair went off smoothly and helped several families get over their doubts about sustainable living."
    ),
    27: (
        "Mara was looking forward to seeing her favourite band at a small venue. "
        "When her digital ticket disappeared, she looked for it while the promoter looked into the booking. "
        "Mara looked after the band's instruments until a backstage assistant arrived. "
        "The gig started late, and the singer made up a funny excuse. "
        "An extra acoustic song made up for the delay. "
        "Mara could barely make out an announcement, so she made for the box office and made up her mind to stay. "
        "The promoter did not put off the show. The audience put up with the wait, and the touring band delivered a memorable performance."
    ),
    28: (
        "Chef Amira had a meeting with her team about a seasonal tasting menu. "
        "After having a look at the available ingredients, she made a suggestion and made a decision to feature regional cuisine. "
        "She took a chance on an unfamiliar spice and took responsibility for testing the recipe. "
        "One assistant made a mistake, so Amira took a note and made a call to the supplier. "
        "The noisy blender made a lot of noise, but the team made an effort and made progress before its deadline. "
        "Amira took a photo of every dish. After service, the meal made a good impression on the guests, and the cooks took a well-earned break."
    ),
    29: (
        "A student team designed a project about healthy study habits. "
        "At first, heavy pressure created strong anxiety and became a heavy burden for several members. "
        "Their tutor offered full support, which had a deep impact on the group. "
        "A lively discussion strengthened their belief in gradual recovery, and the team made great progress. "
        "The pilot produced stunning results and attracted great interest. "
        "High demand for the workshop caused considerable controversy about resources, but the organisers achieved great success. "
        "Their remarkable resilience and one member's remarkable memory had a strong influence on the final presentation, bringing everyone great relief."
    ),
    30: (
        "A community organised a sustainable food and music festival. "
        "The team went through every supplier and looked into renewable energy for the venue. "
        "They did not give up when the original promoter put off the booking. "
        "A new promoter made up for the delay, and the chef took responsibility for a low-waste menu. "
        "After having a look at the ingredients, she made a decision to reuse glass containers. "
        "Heavy pressure created strong anxiety, but full support from volunteers helped everyone make great progress. "
        "The audience put up with a short wait, the band went on at eight, and the festival went off well. "
        "Its deep impact encouraged more sustainable events."
    ),
}

LISTENING = {
    26: (
        "Hi, I'm Lena. Our neighbourhood has just finished its first zero-waste fair. "
        "I couldn't get through to the recycling centre at first, but I didn't give up. "
        "The volunteers got along well and went through every stall before opening. "
        "Families gave away reusable jars and learned how to compost. "
        "A fire alarm went off at eleven, so the first workshop stopped briefly. "
        "Then the programme went on, and the whole event went off smoothly. "
        "We got through a stressful morning and reduced a lot of single-use plastic."
    ),
    27: (
        "Hello, I'm the festival promoter. We looked into a problem at the box office because several tickets were missing. "
        "Fans were looking forward to hearing the band, so we didn't want to put off the gig. "
        "A technician looked after the equipment while I looked for the booking list. "
        "The singer made up a joke about the delay and played an extra song to make up for it. "
        "The audience could not make out one announcement, but they put up with the wait. "
        "Most visitors put up at a hotel near the venue."
    ),
    28: (
        "Good afternoon, team. We have a meeting now because we have a deadline at six. "
        "First, have a look at the new menu and take a note of any missing ingredients. "
        "I made a decision to change the main dish, and I take responsibility for that choice. "
        "Please make an effort to keep the kitchen organised and don't make unnecessary noise. "
        "I need to make a call to our supplier. After we make progress on the dessert, we can take a short break. "
        "Finally, take a photo of each plate."
    ),
    29: (
        "Our college wellbeing project began under heavy pressure. "
        "Some students felt strong anxiety, but the tutor's full support had a deep impact. "
        "A lively discussion attracted great interest and strengthened our belief in the project. "
        "We made great progress and the survey produced stunning results. "
        "High demand for a second workshop created considerable controversy about funding. "
        "However, the team showed remarkable resilience and achieved great success. "
        "The result brought great relief and had a strong influence on next term's plans."
    ),
    30: (
        "Hi, I'm Ravi, the festival organiser. We got through the planning stage, although we nearly gave up. "
        "The promoter looked into the venue problem and made up for the delay. "
        "Our chef had a look at the ingredients, made a decision and took responsibility for the local menu. "
        "There was heavy pressure and some strong anxiety, but volunteers gave us full support. "
        "The audience put up with a short wait while the band looked after its equipment. "
        "The event went off well, made a good impression and had a deep impact on the community."
    ),
}


def item(
    prompt: str, options: str, answer: str, explanation: str
) -> tuple[str, str, str, str]:
    return prompt, options, answer, explanation


GRAMMAR = {
    26: [
        (
            "Elige por significado",
            "Completa cada frase con una opción. La pista en español indica el sentido exacto.",
            [
                item("She finally ___ her fear of composting. (superó)", "got over · got along · went on", "got over", "Recuperarse de un miedo = *get over*."),
                item("Our volunteers ___ each other very well. (se llevan bien)", "get along with · get through · give away", "get along with", "La persona va después de *with*."),
                item("We ___ a difficult zero-waste transition. (logramos terminar)", "got through · went off · gave in", "got through", "*Get through* destaca completar un periodo difícil."),
                item("Don't ___ the recycling project. (abandones)", "give up · give in · go through", "give up", "Abandonar un esfuerzo = *give up*."),
                item("The council refused to ___ pressure. (ceder ante)", "give in to · give away · get over", "give in to", "*Give in* lleva *to* antes de la presión."),
            ],
        ),
        (
            "Completa la historia ecológica",
            "Usa cada opción una vez y cambia el verbo a pasado cuando sea necesario: *give away · go through · go on · go off (alarm) · go off (event)*.",
            [
                item("Residents ___ reusable jars they no longer needed.", "give away", "gave away", "Regalar objetos; pasado irregular *gave*."),
                item("Before opening, we ___ every safety rule.", "go through", "went through", "Revisar punto por punto; pasado *went*."),
                item("The workshop ___ after the short interruption.", "go on", "went on", "Continuar = *go on*."),
                item("The fire alarm ___ at eleven.", "go off", "went off", "Con una alarma, *go off* = sonar."),
                item("Despite the rain, the fair ___ smoothly.", "go off", "went off", "Con un evento + adverbio, *go off* = desarrollarse."),
            ],
        ),
        (
            "Transforma con el phrasal indicado",
            "Reescribe la frase sin cambiar el significado. Usa el phrasal entre paréntesis en la forma correcta.",
            [
                item("They abandoned the compost scheme. (*give up*)", "—", "They gave up the compost scheme.", "Se conserva el objeto después del phrasal."),
                item("The council ceded to public pressure. (*give in*)", "—", "The council gave in to public pressure.", "No omitas *to*."),
                item("I couldn't contact the recycling centre. (*get through*)", "—", "I couldn't get through to the recycling centre.", "El contacto lleva *get through to*."),
                item("We reviewed all the renewable-energy plans. (*go through*)", "—", "We went through all the renewable-energy plans.", "Aquí significa revisar."),
                item("She recovered from her doubts. (*get over*)", "—", "She got over her doubts.", "Recuperación emocional = *get over*."),
            ],
        ),
    ],
    27: [
        (
            "LOOK: elige la partícula",
            "Completa con la opción que corresponde a investigar, esperar con ilusión, cuidar o buscar.",
            [
                item("The promoter will ___ the duplicate booking. (investigar)", "look into · look for · look after", "look into", "Investigar un problema = *look into*."),
                item("We're looking forward to ___ the band. (oír)", "hearing · hear · heard", "hearing", "*To* es preposición; después va *-ing*."),
                item("Can you ___ the instruments backstage? (cuidar)", "look after · look for · look into", "look after", "Responsabilidad o cuidado = *look after*."),
                item("I'm ___ my ticket. (buscando)", "looking for · looking into · looking after", "looking for", "Localizar un objeto = *look for*."),
                item("She ___ a story about missing rehearsal. (inventó)", "made up · made out · made for", "made up", "Inventar una historia = *make up*."),
            ],
        ),
        (
            "MAKE: completa con el significado exacto",
            "Usa: *make up for · make out · make for · make up one's mind · make up*. Ajusta tiempo y posesivo.",
            [
                item("An extra song ___ the delay. (compensó)", "make up for", "made up for", "*For* introduce lo compensado."),
                item("I couldn't ___ the announcement. (distinguir)", "make out", "make out", "Con *couldn't*, usa infinitivo sin *to*."),
                item("The audience ___ the exits after the encore. (se dirigió)", "make for", "made for", "Movimiento hacia un destino = *make for*."),
                item("We ___ to buy the last tickets. (nos decidimos)", "make up one's mind", "made up our minds", "El posesivo y *mind(s)* concuerdan con *we*."),
                item("The singer ___ an excuse for being late. (inventó)", "make up", "made up", "No lleva *for* cuando se inventa una excusa."),
            ],
        ),
        (
            "PUT y contrastes: corrige un error",
            "Cada frase contiene exactamente un error en la expresión destacada. Reescríbela correctamente.",
            [
                item("They *put the gig with* until Friday. (posponer)", "—", "They put the gig off until Friday.", "*Put off* = posponer."),
                item("We *put up with a hotel* near the venue. (alojarse)", "—", "We put up at a hotel near the venue.", "Lugar de alojamiento después de *at*."),
                item("The audience *put up the noise*. (tolerar)", "—", "The audience put up with the noise.", "La expresión completa es *put up with*."),
                item("I look forward to *see* the festival.", "—", "I look forward to seeing the festival.", "*To* preposición + *-ing*."),
                item("The acoustic set *made up the delay*. (compensó)", "—", "The acoustic set made up for the delay.", "Compensar exige *for*."),
            ],
        ),
    ],
    28: [
        (
            "MAKE: elige el verbo correcto",
            "Selecciona *make, take, have* o *do*. Cambia el verbo a pasado si la frase lo exige.",
            [
                item("Yesterday the chef ___ a decision about the menu.", "made · took · had", "made", "La colocación es *make a decision*."),
                item("I ___ a mistake with the salt.", "made · did · took", "made", "Cometer un error = *make a mistake*."),
                item("The team is ___ steady progress.", "making · taking · doing", "making", "*Progress* combina con *make* y no lleva artículo."),
                item("We ___ an effort to buy local ingredients.", "made · took · had", "made", "Esforzarse = *make an effort*."),
                item("Lina ___ a useful suggestion at the meeting.", "made · did · had", "made", "Proponer = *make a suggestion*."),
            ],
        ),
        (
            "TAKE: completa la colocación",
            "Usa la forma correcta de *take*. La pista aclara el significado.",
            [
                item("Let's ___ after preparing the starter. (hacer una pausa)", "take a break", "take a break", "En presente tras *let's*."),
                item("She ___ of the finished dish. (hizo una foto)", "take a photo", "took a photo", "Pasado irregular *took*."),
                item("The chef ___ for the mistake. (asumió responsabilidad)", "take responsibility", "took responsibility", "Sin artículo antes de *responsibility*."),
                item("We ___ on a new regional recipe. (nos arriesgamos)", "take a chance", "took a chance", "*Take a chance on* + opción arriesgada."),
                item("Please ___ of the cooking time. (toma nota)", "take a note", "take a note", "*Take a note of* registra el dato."),
            ],
        ),
        (
            "MAKE o HAVE: completa en contexto",
            "Escribe la colocación completa indicada por el significado. Conserva artículos y preposiciones.",
            [
                item("I need to ___ to the supplier. (hacer una llamada)", "—", "make a call", "No *do a call*."),
                item("The restaurant ___ to reduce food waste. (hizo una promesa)", "—", "made a promise", "Pasado de *make* + artículo."),
                item("We ___ with the head chef at ten. (tenemos una reunión)", "—", "have a meeting", "*Have a meeting with* una persona."),
                item("___ the dessert menu before choosing. (echa un vistazo a)", "—", "Have a look at", "El objeto se introduce con *at*."),
                item("The old blender ___. (hace mucho ruido)", "—", "makes a lot of noise", "*Noise* es incontable en este uso."),
            ],
        ),
    ],
    29: [
        (
            "STRONG, HEAVY o GREAT",
            "Elige el adjetivo que forma la colocación objetivo con el sustantivo.",
            [
                item("She felt ___ anxiety before the talk.", "strong · heavy · high", "strong", "La pareja del curso es *strong anxiety*."),
                item("Guilt became a ___ burden.", "heavy · strong · full", "heavy", "La metáfora es de peso."),
                item("The team worked under ___ pressure.", "heavy · great · deep", "heavy", "*Heavy pressure* = presión intensa."),
                item("He has a ___ belief in gradual recovery.", "strong · high · lively", "strong", "*Strong belief in* una idea."),
                item("With support, they made ___ progress.", "great · strong · full", "great", "*Great progress* sin artículo."),
            ],
        ),
        (
            "Adjetivos precisos",
            "Completa con una opción de la lista, una vez cada una: *lively · stunning · high · full · deep*.",
            [
                item("The class had a ___ discussion about mental health.", "lively", "lively", "Animada y participativa."),
                item("The pilot programme reported ___ results.", "stunning", "stunning", "Resultados sorprendentemente impresionantes."),
                item("There is ___ demand for counselling services.", "high", "high", "Demanda entendida como nivel."),
                item("Her family gave her their ___ support.", "full", "full", "Apoyo completo."),
                item("The experience had a ___ impact on his mindset.", "deep", "deep", "Efecto profundo."),
            ],
        ),
        (
            "Completa o corrige la colocación",
            "Usa la palabra indicada o corrige la combinación no natural. Mantén un tono respetuoso y no clínico.",
            [
                item("She has a ___ memory for names. (*remarkable*)", "—", "remarkable memory", "Algo digno de atención."),
                item("The group showed ___ during the difficult term. (*remarkable*)", "—", "remarkable resilience", "Capacidad destacable para adaptarse."),
                item("The proposal caused ___ controversy. (*considerable*)", "—", "considerable controversy", "Registro formal para un grado importante."),
                item("Corrige: The survey attracted *strong interest*.", "—", "The survey attracted great interest.", "La colocación objetivo es *great interest*."),
                item("Corrige: We felt *a great relief* after the result.", "—", "We felt great relief after the result.", "*Relief* es incontable aquí."),
            ],
        ),
    ],
    30: [
        (
            "Diagnóstico U26–27: phrasal verbs",
            "Elige la opción que completa el significado. Comprueba también las partículas posteriores.",
            [
                item("We finally ___ the difficult planning stage.", "got through · got over · went off", "got through", "Completar un periodo difícil = *get through*."),
                item("Don't ___ the project or ___ to pressure.", "give up / give in · give away / go on", "give up / give in", "Abandonar frente a ceder."),
                item("The promoter will ___ the booking problem.", "look into · look for · look after", "look into", "Investigar un asunto."),
                item("An extra song ___ the delay.", "made up for · made out · made for", "made up for", "Compensar conserva *for*."),
                item("The audience ___ the long wait.", "put up with · put up at · put off", "put up with", "Tolerar = *put up with*."),
            ],
        ),
        (
            "Diagnóstico U28: verbo + sustantivo",
            "Completa con la forma correcta de *make, take* o *have*. No traduzcas el verbo español palabra por palabra.",
            [
                item("During yesterday's festival, the chef ___ a decision about the menu.", "made · took · had", "made", "Pasado de *make a decision*."),
                item("After the delay, she ___ responsibility for the problem.", "made · took · had", "took", "Pasado de *take responsibility*."),
                item("Before service, we ___ a look at the ingredients.", "made · took · had", "had", "Objetivo del curso: *have a look at*."),
                item("By opening time, the team ___ great progress.", "made · took · had", "made", "*Make progress*; sin artículo."),
                item("Please ___ a note of the new deadline.", "make · take · have", "take", "*Take a note of*."),
            ],
        ),
        (
            "Diagnóstico U29 y mezcla final",
            "Corrige exactamente una palabra o expresión en cada frase.",
            [
                item("The volunteers worked under *strong pressure*.", "—", "The volunteers worked under heavy pressure.", "*Heavy pressure* es el chunk objetivo."),
                item("Families gave us *complete support*.", "—", "Families gave us full support.", "*Full support* = apoyo completo."),
                item("We made *a great progress* before opening.", "—", "We made great progress before opening.", "*Progress* es incontable."),
                item("We look forward to *attend* the next festival.", "—", "We look forward to attending the next festival.", "Preposición *to* + *-ing*."),
                item("The event *went out well* despite the rain.", "—", "The event went off well despite the rain.", "Evento que sale bien = *go off well*."),
            ],
        ),
    ],
}

VOCAB = {
    26: [
        ("zero waste", "cero residuos · energía solar · vertedero", "cero residuos"),
        ("renewable energy", "energía renovable · huella de carbono · abono", "energía renovable"),
        ("carbon footprint", "huella de carbono · plástico reciclado · consumo local", "huella de carbono"),
        ("compost", "compost / abono orgánico · residuo tóxico · envase", "compost / abono orgánico"),
        ("landfill", "vertedero · huerto · central eólica", "vertedero"),
        ("This bottle can be used again: ___ it.", "reuse · recycle · reduce", "reuse"),
        ("Turn old paper into new material: ___ it.", "recycle · reuse · compost", "recycle"),
        ("Buy fewer packaged products: ___ waste.", "reduce · renew · give away", "reduce"),
        ("A product designed for one use is ___ plastic.", "single-use · renewable · zero-waste", "single-use"),
        ("A choice that causes less environmental harm is ___.", "eco-friendly · sold out · lively", "eco-friendly"),
        ("The café stopped using ___ plastic.", "single-use"),
        ("Solar and wind are forms of ___.", "renewable energy"),
        ("Food scraps can become ___.", "compost"),
        ("Cycling may reduce your ___.", "carbon footprint"),
        ("A realistic long-term plan should be ___.", "sustainable"),
    ],
    27: [
        ("venue", "recinto · ensayo · gira", "recinto"),
        ("gig", "actuación en directo · taquilla · público", "actuación en directo"),
        ("box office", "taquilla · camerino · álbum", "taquilla"),
        ("rehearsal", "ensayo · entrada · promotor", "ensayo"),
        ("backstage", "entre bastidores · agotado · escenario principal", "entre bastidores"),
        ("All tickets have been sold: the gig is ___.", "sold out · put off · made up", "sold out"),
        ("A series of concerts in different cities is a ___.", "tour · venue · ticket", "tour"),
        ("The people watching a performance are the ___.", "audience · band · promoter", "audience"),
        ("A collection of released songs is an ___.", "album · festival · rehearsal", "album"),
        ("The person or company organising the show is the ___.", "promoter · audience · venue", "promoter"),
        ("Collect your ___ at the box office.", "ticket"),
        ("The ___ practised every song before the tour.", "band"),
        ("The Saturday show is completely ___.", "sold out"),
        ("Only artists and staff can go ___.", "backstage"),
        ("The cheering ___ asked for an encore.", "audience"),
    ],
    28: [
        ("recipe", "receta / instrucciones · carta · comida completa", "receta / instrucciones"),
        ("ingredients", "ingredientes · proveedores · sabores", "ingredientes"),
        ("cuisine", "estilo culinario · cocina física · utensilio", "estilo culinario"),
        ("dish", "plato preparado · fecha límite · descanso", "plato preparado"),
        ("menu", "lista de platos · receta paso a paso · cocinero", "lista de platos"),
        ("A professional who designs and cooks dishes is a ___.", "chef · course · supplier", "chef"),
        ("A company that delivers ingredients is a ___.", "supplier · flavour · meal", "supplier"),
        ("Food available at one time of year is ___.", "seasonal · sold out · renewable", "seasonal"),
        ("Breakfast, lunch or dinner can be a ___.", "meal · recipe · cuisine", "meal"),
        ("Starter, main and dessert are three ___.", "courses · deadlines · meetings", "courses"),
        ("Follow the ___ step by step.", "recipe"),
        ("The chef checked every ___ before cooking.", "ingredient"),
        ("Peruvian ___ includes many regional traditions.", "cuisine"),
        ("The seasonal ___ offers six dishes.", "menu"),
        ("The sauce has a rich, smoky ___.", "flavour"),
    ],
    29: [
        ("anxiety", "ansiedad · alivio · memoria", "ansiedad"),
        ("burden", "carga · apoyo · demanda", "carga"),
        ("belief", "convicción / creencia · resultado · recuperación", "convicción / creencia"),
        ("mindset", "mentalidad · presión · influencia", "mentalidad"),
        ("resilience", "resiliencia · controversia · terapia", "resiliencia"),
        ("Professional support may include ___.", "therapy · pressure · burden", "therapy"),
        ("The gradual process of improving is ___.", "recovery · demand · controversy", "recovery"),
        ("Emotional and psychological wellbeing is ___.", "mental health · high demand · strong belief", "mental health"),
        ("Help given by family or friends is ___.", "support · pressure · anxiety", "support"),
        ("An effect on another person is an ___.", "influence · relief · memory", "influence"),
        ("Workplace ___ affected the whole team.", "pressure"),
        ("Her family offered practical and emotional ___.", "support"),
        ("The programme focused on student ___.", "mental health"),
        ("Recovery is not always a straight or ___ process.", "linear"),
        ("The new routine changed his ___.", "mindset"),
    ],
    30: [
        ("carbon footprint", "U26 sostenibilidad · U27 música · U29 psicología", "U26 sostenibilidad"),
        ("box office", "U27 música · U28 gastronomía · U26 sostenibilidad", "U27 música"),
        ("supplier", "U28 gastronomía · U29 psicología · U27 música", "U28 gastronomía"),
        ("resilience", "U29 psicología · U28 gastronomía · U26 reciclaje", "U29 psicología"),
        ("single-use plastic", "U26 sostenibilidad · U27 música · U28 cocina", "U26 sostenibilidad"),
        ("A place for a concert is a ___.", "venue · landfill · mindset", "venue"),
        ("Instructions for preparing food form a ___.", "recipe · rehearsal · belief", "recipe"),
        ("A difficult emotional or practical load is a ___.", "burden · audience · course", "burden"),
        ("Organic food waste can become ___.", "compost · cuisine · therapy", "compost"),
        ("The people watching the band are the ___.", "audience · ingredients · support", "audience"),
        ("The café wants to ___ glass jars.", "reuse"),
        ("The band completed its final ___.", "rehearsal"),
        ("The chef contacted the local ___.", "supplier"),
        ("The tutor offered the students full ___.", "support"),
        ("The festival reduced its ___.", "carbon footprint"),
    ],
}

READING_EX = {
    26: [
        ("Why did the neighbourhood organise the fair?", "To reduce its carbon footprint."),
        ("True/False: Lena contacted the recycling centre immediately.", "False — she could not get through at first."),
        ("Who did Lena get along with?", "The volunteers."),
        ("What replaced single-use plastic?", "Reusable containers."),
        ("Name two activities residents learned or did.", "They gave away jars and learned to compost."),
        ("Complete from the text: They ___ every stall.", "went through"),
        ("Complete: A fire alarm ___ during the first talk.", "went off"),
        ("Complete: The programme ___ after a short pause.", "went on"),
        ("Did *the fair went off smoothly* mean «sonó» or «salió bien»?", "Salió bien."),
        ("What doubts did families get over?", "Doubts about sustainable living."),
        ("Choose: *get through the planning stage* means contact / complete / recover.", "complete"),
        ("Choose: *give away jars* means abandon / donate / review.", "donate"),
        ("Which expression includes a compulsory *with*: get along / give up / go on?", "get along with"),
        ("Put in story order: alarm — planning — successful fair.", "planning → alarm → successful fair"),
        ("Summarise with the correct pair: They did not ___; they ___ the difficult stage.", "give up; got through"),
    ],
    27: [
        ("What event was Mara looking forward to?", "Seeing her favourite band at a small venue."),
        ("What object disappeared?", "Her digital ticket."),
        ("Who looked into the booking?", "The promoter."),
        ("What did Mara look after?", "The band's instruments."),
        ("True/False: The show was postponed.", "False — the promoter did not put it off."),
        ("Complete: The singer ___ a funny excuse.", "made up"),
        ("Complete: An extra song ___ the delay.", "made up for"),
        ("Complete: Mara could barely ___ an announcement.", "make out"),
        ("Where did she make for?", "The box office."),
        ("What did the audience put up with?", "The wait."),
        ("Choose: *look into* = search for an object / investigate an issue.", "investigate an issue"),
        ("Why is *seeing* used after *look forward to*?", "Because *to* is a preposition and takes -ing."),
        ("Write Mara's decision chunk with the correct possessive.", "She made up her mind to stay."),
        ("Which two words show that the band performs in different places?", "touring band"),
        ("Put in order: ticket problem — acoustic song — memorable performance.", "ticket problem → acoustic song → memorable performance"),
    ],
    28: [
        ("Who had a meeting?", "Chef Amira and her team."),
        ("What kind of menu were they planning?", "A seasonal tasting menu."),
        ("What did Amira have a look at?", "The available ingredients."),
        ("What did she take a chance on?", "An unfamiliar spice."),
        ("Who took responsibility for testing the recipe?", "Amira."),
        ("Complete: One assistant ___ with the dish.", "made a mistake"),
        ("Complete: Amira ___ to the supplier.", "made a call"),
        ("Complete: The team ___ before its deadline.", "made progress"),
        ("What did Amira take a photo of?", "Every dish."),
        ("What made a good impression on the guests?", "The meal."),
        ("Choose: *progress* takes a / no article in the reading.", "no article"),
        ("Choose: *take responsibility* means accept responsibility / photograph it.", "accept responsibility"),
        ("Add the preposition: have a look ___ the ingredients.", "at"),
        ("Add the preposition: take a photo ___ every dish.", "of"),
        ("Put in order: meeting — testing — service — break.", "meeting → testing → service → break"),
    ],
    29: [
        ("What did the student team design?", "A project about healthy study habits."),
        ("What became a heavy burden?", "Heavy pressure."),
        ("Who offered full support?", "Their tutor."),
        ("What had a deep impact on the group?", "The tutor's full support."),
        ("What did the pilot produce?", "Stunning results."),
        ("Complete: A ___ discussion strengthened their belief.", "lively"),
        ("Complete: The workshop attracted ___ interest.", "great"),
        ("Complete: ___ demand caused controversy.", "High"),
        ("Complete: The team showed remarkable ___.", "resilience"),
        ("What brought everyone great relief?", "The successful final result/presentation."),
        ("Choose: pressure is *strong / heavy* in the text.", "heavy"),
        ("Choose: support is *full / high* in the text.", "full"),
        ("Is *great progress* countable here?", "No — it has no article."),
        ("Which collocation describes an effect on the final presentation?", "strong influence"),
        ("Put in order: pressure — support — progress — final presentation.", "pressure → support → progress → final presentation"),
    ],
    30: [
        ("What type of festival did the community organise?", "A sustainable food and music festival."),
        ("What energy option did the team investigate?", "Renewable energy."),
        ("Who postponed the original booking?", "The original promoter."),
        ("What did the new promoter make up for?", "The delay."),
        ("What menu did the chef take responsibility for?", "A low-waste menu."),
        ("Complete U26: They did not ___ when the booking changed.", "give up"),
        ("Complete U27: The promoter ___ the delay.", "made up for"),
        ("Complete U28: The chef ___ to reuse glass.", "made a decision"),
        ("Complete U29: Volunteers offered ___ support.", "full"),
        ("Complete mixed: The festival ___ well.", "went off"),
        ("Classify *went through every supplier*: U26, U27, U28 or U29?", "U26"),
        ("Classify *took responsibility*: U26, U27, U28 or U29?", "U28"),
        ("Correct the article: *made a great progress*.", "made great progress"),
        ("Which two phrases describe psychological pressure and help?", "strong anxiety; full support"),
        ("Put in order: supplier review — booking delay — menu decision — successful festival.", "supplier review → booking delay → menu decision → successful festival"),
    ],
}

LISTENING_EX = {
    26: [
        ("Who is speaking?", "Lena."),
        ("What event has just finished?", "The first neighbourhood zero-waste fair."),
        ("Who could Lena not contact at first?", "The recycling centre."),
        ("What did families give away?", "Reusable jars."),
        ("At what time did the alarm go off?", "At eleven."),
        ("Complete exactly: I couldn't ___ the recycling centre.", "get through to"),
        ("Complete: The volunteers ___ well.", "got along"),
        ("Complete: The programme ___.", "went on"),
        ("Did the event go off badly or smoothly?", "Smoothly."),
        ("What plastic did they reduce?", "Single-use plastic."),
        ("True/False: Lena gave up after the failed call.", "False."),
        ("Choose the meaning of *went through every stall*: reviewed / donated.", "reviewed"),
        ("Which phrasal marks a difficult stage completed?", "got through"),
        ("Write the two *go off* subjects in the audio.", "A fire alarm; the whole event."),
        ("Complete the contrast: The alarm ___, but the fair ___.", "went off; went off smoothly"),
    ],
    27: [
        ("Who is speaking?", "The festival promoter."),
        ("Where was the initial problem?", "At the box office."),
        ("What was missing?", "Several tickets."),
        ("Who looked after the equipment?", "A technician."),
        ("Where did most visitors stay?", "At a hotel near the venue."),
        ("Complete: Fans were looking forward to ___ the band.", "hearing"),
        ("Complete: We didn't want to ___ the gig.", "put off"),
        ("Complete: I ___ the booking list.", "looked for"),
        ("Complete: The singer played an extra song to ___ the delay.", "make up for"),
        ("What could the audience not make out?", "One announcement."),
        ("True/False: The promoter postponed the concert.", "False."),
        ("Choose: looked into = investigated / cared for.", "investigated"),
        ("Choose: put up at = tolerated / stayed at.", "stayed at"),
        ("Which people put up with the wait?", "The audience."),
        ("Complete the contrast: a technician looked ___ equipment; the promoter looked ___ a list.", "after; for"),
    ],
    28: [
        ("Who is being addressed?", "The kitchen team."),
        ("When is the deadline?", "At six."),
        ("What should the team look at first?", "The new menu."),
        ("Who takes responsibility for changing the dish?", "The speaker/chef."),
        ("Who needs to receive a call?", "The supplier."),
        ("Complete: ___ a note of any missing ingredients.", "Take"),
        ("Complete: I ___ to change the main dish.", "made a decision"),
        ("Complete: Don't ___ unnecessary ___.", "make; noise"),
        ("Complete: After we ___ on the dessert, we can rest.", "make progress"),
        ("What should they photograph?", "Each plate."),
        ("True/False: The speaker uses *do a decision*.", "False."),
        ("Choose: *responsibility* has an article / no article.", "no article"),
        ("Choose the exact break phrase.", "take a short break"),
        ("Add the preposition: have a look ___ the menu.", "at"),
        ("Put in order: menu — supplier call — dessert progress — photos.", "menu → supplier call → dessert progress → photos"),
    ],
    29: [
        ("Where did the project take place?", "At a college."),
        ("What did some students feel?", "Strong anxiety."),
        ("Whose support had a deep impact?", "The tutor's full support."),
        ("What attracted great interest?", "A lively discussion."),
        ("What created controversy?", "High demand for a second workshop."),
        ("Complete: We made ___ progress.", "great"),
        ("Complete: The survey produced ___ results.", "stunning"),
        ("Complete: The team showed remarkable ___.", "resilience"),
        ("Complete: The result brought great ___.", "relief"),
        ("What did the project influence?", "Next term's plans."),
        ("True/False: The audio makes a medical diagnosis.", "False."),
        ("Choose: heavy pressure / strong pressure.", "heavy pressure"),
        ("Choose: high support / full support.", "full support"),
        ("Which phrase describes the project's final achievement?", "great success"),
        ("Put in order: anxiety — discussion — second-workshop demand — next-term plans.", "anxiety → discussion → second-workshop demand → next-term plans"),
    ],
    30: [
        ("Who is speaking?", "Ravi, the festival organiser."),
        ("What stage did the team complete?", "The planning stage."),
        ("Who investigated the venue problem?", "The promoter."),
        ("Who took responsibility for the menu?", "The chef."),
        ("What did the audience tolerate?", "A short wait."),
        ("Complete U26: We nearly ___.", "gave up"),
        ("Complete U27: The promoter ___ the delay.", "made up for"),
        ("Complete U28: The chef ___ the ingredients.", "had a look at"),
        ("Complete U29: Volunteers gave us ___ support.", "full"),
        ("How did the event go off?", "Well."),
        ("True/False: The event made a bad impression.", "False."),
        ("Classify *looked after its equipment*.", "U27 phrasal verb."),
        ("Classify *took responsibility*.", "U28 verb + noun collocation."),
        ("Name the two adjective + noun collocations about difficulty.", "heavy pressure; strong anxiety"),
        ("Complete the outcome: It made a good ___ and had a deep ___.", "impression; impact"),
    ],
}

WRITING = {
    26: [
        ("Completa con pasado: We ___ (get through) the difficult week.", "We **got through** the difficult week."),
        ("Transforma: *They abandoned the zero-waste plan.* Usa *give up*.", "They **gave up** the zero-waste plan."),
        ("Transforma: *The council ceded to pressure.* Usa *give in*.", "The council **gave in to** pressure."),
        ("Une en una frase: *The alarm sounded. The workshop continued.*", "The alarm **went off**, but the workshop **went on**."),
        ("Traduce: *Me llevo bien con mis vecinos ecológicos.*", "I **get along with** my eco-friendly neighbours."),
        ("Traduce: *Revisamos todas las opciones de energía renovable.*", "We **went through** all the renewable-energy options."),
        ("Escribe dos frases que contrasten *reduce* y *reuse*.", "Modelo: We **reduce** waste by buying less. We **reuse** jars instead of throwing them away."),
        ("Redacta 35–45 palabras sobre una dificultad sostenible. Incluye *get through, give up* y *compost*.", "Modelo: Our building found composting difficult at first. We did not **give up** when the first bin smelled bad. Clear instructions helped us **get through** the first month, and now every family separates food waste for **compost**."),
        ("Escribe un aviso de 25–35 palabras para regalar objetos y evitar el vertedero. Usa *give away*.", "Modelo: Don't send reusable jars to **landfill**. **Give them away** at Saturday's zero-waste fair. Clean containers can help neighbours store food and reduce single-use plastic."),
        ("Escribe un párrafo de 70–90 palabras sobre una ecoferia e incluye cinco phrasals U26.", "Modelo: Our neighbourhood organised an eco-friendly fair. The volunteers **got along with** one another and **went through** every safety rule. Nobody **gave up** when rain started. An alarm **went off**, but the talks **went on** indoors. In the end, the fair **went off well**, and residents gave reusable bags away."),
    ],
    27: [
        ("Completa: I look forward to ___ (see) the band.", "I look forward to **seeing** the band."),
        ("Transforma: *The promoter investigated the complaint.* Usa *look into*.", "The promoter **looked into** the complaint."),
        ("Transforma: *An extra song compensated for the wait.* Usa *make up for*.", "An extra song **made up for** the wait."),
        ("Corrige: *We made up the venue after the gig.*", "We **made for** the venue before the gig."),
        ("Traduce: *No pude distinguir el anuncio.*", "I couldn't **make out** the announcement."),
        ("Traduce: *Nos decidimos a comprar las entradas.*", "We **made up our minds** to buy the tickets."),
        ("Escribe dos frases para contrastar *look for* y *look after*.", "Modelo: I'm **looking for** my ticket. My friend is **looking after** the instruments."),
        ("Redacta 35–45 palabras sobre un retraso. Incluye *put off, put up with* y *audience*.", "Modelo: The promoter did not **put off** the gig, but the **audience** had to **put up with** a forty-minute delay. The band played an extra song and thanked everyone for waiting."),
        ("Escribe un mensaje de 25–35 palabras sobre alojamiento durante una gira. Usa *put up at*.", "Modelo: During the **tour**, the band will **put up at** a small hotel opposite the venue. The promoter has reserved six rooms for the musicians and two for the backstage team."),
        ("Escribe 70–90 palabras sobre un problema en un festival e incluye cinco phrasals U27.", "Modelo: We were **looking forward to seeing** the band, but my ticket vanished. The box office **looked into** the booking while I **looked for** the email. We could not **make out** an announcement, so we **made for** the information desk. The staff fixed everything and a bonus song **made up for** the delay."),
    ],
    28: [
        ("Completa: The chef ___ a decision after the meeting.", "The chef **made a decision** after the meeting."),
        ("Corrige: *I did a mistake with the recipe.*", "I **made a mistake** with the recipe."),
        ("Corrige: *She made responsibility for the dish.*", "She **took responsibility** for the dish."),
        ("Traduce: *Echa un vistazo al menú.*", "**Have a look at** the menu."),
        ("Traduce: *Haz una foto del plato.*", "**Take a photo of** the dish."),
        ("Une: *We have a deadline. We need to make progress.*", "We **have a deadline**, so we need to **make progress**."),
        ("Escribe una frase con *make a call* y otra con *make a promise*.", "Modelo: I **made a call** to the supplier. The restaurant **made a promise** to reduce food waste."),
        ("Redacta 35–45 palabras sobre probar una receta arriesgada. Usa *take a chance, make an effort* y *ingredients*.", "Modelo: We **took a chance** on a spicy regional recipe. The team **made an effort** to source fresh **ingredients**, adjusted the sauce carefully and served the dish as the main course."),
        ("Escribe un aviso de cocina de 25–35 palabras con *take a note* y *make noise*.", "Modelo: **Take a note** of each cooking time. The old blender **makes noise**, so use it before guests enter the dining room and tell the chef if it sounds unusual."),
        ("Escribe 70–90 palabras sobre preparar un menú e incluye seis colocaciones U28.", "Modelo: We **had a meeting** about the seasonal menu and **made a decision** to feature local cuisine. I **made a suggestion**, and the chef **took a chance** on it. One assistant **made a mistake** but **took responsibility**. We **made progress**, photographed each dish and finally **took a break** before service."),
    ],
    29: [
        ("Completa: She felt ___ anxiety under ___ pressure.", "She felt **strong anxiety** under **heavy pressure**."),
        ("Corrige: *The programme made a great progress.*", "The programme **made great progress**."),
        ("Corrige: *Her family offered complete support.*", "Her family offered **full support**."),
        ("Traduce: *La conversación animada despertó mucho interés.*", "The **lively discussion** attracted **great interest**."),
        ("Traduce: *La experiencia tuvo un impacto profundo.*", "The experience had a **deep impact**."),
        ("Une: *Demand was high. Funding caused controversy.*", "**High demand** for the service caused **considerable controversy** about funding."),
        ("Escribe una frase con *remarkable memory* y otra con *remarkable resilience*.", "Modelo: Eva has a **remarkable memory** for names. The team showed **remarkable resilience** during the difficult term."),
        ("Redacta 35–45 palabras sobre apoyo en un proyecto. Usa *full support, great relief* y *belief*.", "Modelo: The tutor gave us **full support** during the project. Her feedback strengthened our **belief** that gradual improvement was possible. Finishing the presentation brought **great relief** to the whole team."),
        ("Reescribe con tono más prudente: *The therapy produced stunning results for everyone.*", "Modelo: Participants reported **encouraging results**, although experiences differed. Este modelo evita generalizar un resultado clínico a todas las personas."),
        ("Escribe 70–90 palabras sobre un proyecto ficticio de bienestar con seis colocaciones U29.", "Modelo: Our class worked under **heavy pressure**, and some students felt **strong anxiety**. A tutor offered **full support**, which had a **deep impact** on the group. After a **lively discussion**, we made **great progress**. The final project attracted **great interest**, and completing it brought **great relief** without making any medical claims."),
    ],
    30: [
        ("Completa: We ___ the hard stage and didn't ___ to pressure.", "We **got through** the hard stage and didn't **give in** to pressure."),
        ("Corrige: *The promoter made up the delay.*", "The promoter **made up for** the delay."),
        ("Corrige: *The chef took a decision and made responsibility.*", "The chef **made a decision** and **took responsibility**."),
        ("Corrige: *We made a great progress under strong pressure.*", "We **made great progress** under **heavy pressure**."),
        ("Traduce: *Esperamos con ilusión escuchar a la banda.*", "We **look forward to hearing** the band."),
        ("Traduce: *El público toleró la espera y el evento salió bien.*", "The audience **put up with** the wait, and the event **went off well**."),
        ("Escribe una cadena de cuatro chunks: uno de cada U26–29.", "Modelo: We **went through** the options (U26), **looked into** the venue (U27), **made a decision** (U28) and received **full support** (U29)."),
        ("Redacta 40–50 palabras sobre el menú de un festival. Incluye *have a look, take responsibility, sustainable*.", "Modelo: The chef **had a look at** every ingredient and **took responsibility** for a **sustainable** menu. She reused glass jars, chose seasonal dishes and made a call to a local supplier before the deadline."),
        ("Redacta 40–50 palabras sobre un retraso musical. Incluye *put off, make up for, heavy pressure*.", "Modelo: The promoter nearly **put off** the gig because the band arrived late. Under **heavy pressure**, the musicians shortened rehearsal. They **made up for** the delay with an acoustic encore, and the audience showed full support."),
        ("Escribe 90–110 palabras sobre un festival integrado con tres phrasals y cinco collocations.", "Modelo: Our community planned a zero-waste music festival. We **went through** every supplier and **looked into** renewable energy. The chef **made a decision** to reuse containers and **took responsibility** for the menu. **Heavy pressure** caused **strong anxiety**, but volunteers gave us **full support**. The audience **put up with** a short delay while the band finished rehearsal. Everyone **made great progress**, and the event **went off well**. It made a good impression and had a **deep impact** on future community plans."),
    ],
}

SPEAKING = {
    26: [
        ("Pronuncia y contrasta *get over / get through* en dos frases.", "Guion modelo: I **got over** my fear of composting. We **got through** a difficult first month."),
        ("Role-play: pide por teléfono información al centro de reciclaje. Incluye un intento fallido.", "A: Did you contact the centre? B: No, I couldn't **get through to** them. I'll call again this afternoon."),
        ("Explica durante 30 segundos la diferencia entre *give up* y *give in*.", "Pistas: abandon an activity → **give up**; accept pressure → **give in to**. Ejemplo: We didn't give up, but the council gave in to public pressure."),
        ("Describe una ecoferia con las pistas: alarm / talks / result.", "Guion modelo: The alarm **went off** at eleven. The talks **went on** after a short pause, and the fair **went off smoothly**."),
        ("Habla 45–60 segundos sobre un hábito sostenible usando cuatro palabras y tres phrasals.", "Pistas modelo: reuse jars · reduce plastic · carbon footprint · compost; **go through** purchases · don't **give up** · **get along with** neighbours."),
    ],
    27: [
        ("Pronuncia y contrasta *look into / look for*.", "Guion modelo: The promoter **looked into** the booking problem. I **looked for** my ticket."),
        ("Role-play en la taquilla con un ticket perdido.", "A: I can't find my ticket. B: We'll **look into** the booking. A: Thanks. I'm really **looking forward to seeing** the band."),
        ("Explica en 30 segundos *make up* frente a *make up for*.", "Pistas: invent → **make up**; compensate → **make up for**. Ejemplo: He made up an excuse, then played a song to make up for the delay."),
        ("Describe alojamiento y ruido durante una gira.", "Guion modelo: We **put up at** a hotel near the venue, but we had to **put up with** traffic noise all night."),
        ("Habla 45–60 segundos sobre un gig usando cuatro phrasals y cinco palabras musicales.", "Pistas modelo: venue · box office · rehearsal · audience · sold out; **look forward to**, **make out**, **make for**, **put off**."),
    ],
    28: [
        ("Di cinco colocaciones sin separar el verbo del sustantivo.", "Modelo rítmico: **make-a-decision · take-a-break · have-a-look · make-progress · take-responsibility**."),
        ("Role-play de reunión entre chef y ayudante.", "Chef: **Have a look at** the menu. Assistant: Shall we **take a chance** on this dish? Chef: Yes, and I'll **take responsibility**."),
        ("Explica en 30 segundos por qué no dices *take a decision* en esta unidad.", "Guion modelo: Collocations do not translate word for word. English uses **make a decision**, even though Spanish uses the verb «tomar»."),
        ("Da instrucciones antes del servicio con *deadline, note, call*.", "Guion modelo: We **have a deadline** at six. **Take a note** of missing ingredients while I **make a call** to the supplier."),
        ("Habla 45–60 segundos sobre preparar un plato con seis colocaciones.", "Pistas modelo: have a meeting/look · make a suggestion/decision/effort/progress · take a photo/break."),
    ],
    29: [
        ("Pronuncia tres contrastes: *strong anxiety / heavy pressure / great relief*.", "Guion modelo: The team felt **strong anxiety** under **heavy pressure**, but support brought **great relief**."),
        ("Role-play entre tutor y estudiante sobre un proyecto, sin dar consejo médico.", "Tutor: What made the project difficult? Student: **Heavy pressure**. Tutor: You have my **full support**. Student: That brings **great relief**."),
        ("Explica en 30 segundos las imágenes de *high, full, deep*.", "Pistas: level → **high demand**; totality → **full support**; depth → **deep impact**."),
        ("Resume resultados con tono prudente.", "Guion modelo: The pilot attracted **great interest** and showed encouraging results. It also caused **considerable controversy**, so more evidence is needed."),
        ("Habla 45–60 segundos sobre un proyecto ficticio usando seis colocaciones.", "Pistas modelo: heavy pressure · strong belief · full support · lively discussion · great progress · remarkable resilience."),
    ],
    30: [
        ("Clasifica oralmente un ejemplo de cada patrón.", "Guion modelo: **Give up** is a phrasal verb; **take responsibility** is verb+noun; **heavy pressure** is adjective+noun."),
        ("Role-play entre organizador y promotor por un retraso.", "A: Will we **put off** the festival? B: No. We'll **make up for** the delay with an extra band. A: Good; the audience can **put up with** a short wait."),
        ("Explica y corrige tres errores: *give up to pressure; take a decision; strong pressure*.", "Guion modelo: Say **give in to pressure**, **make a decision** and **heavy pressure**."),
        ("Resume el reading en cuatro pasos, uno por unidad.", "Pistas modelo: U26 **went through suppliers**; U27 **looked into energy**; U28 **took responsibility**; U29 received **full support**."),
        ("Habla 60–75 segundos sobre un festival sostenible con ocho chunks.", "Pistas modelo: get through · go off well · look into · put up with · make a decision · take responsibility · heavy pressure · full support."),
    ],
}


def details(content: str, summary: str = "Ver solución") -> str:
    return f"<details>\n<summary>{summary}</summary>\n\n{content.strip()}\n\n</details>"


def render_grammar(unit: int) -> str:
    sections = []
    start = 1
    for title, instruction, items in GRAMMAR[unit]:
        questions = []
        answers = []
        for number, (prompt, options, answer, explanation) in enumerate(items, start):
            option_line = "" if options == "—" else f"  \n   Opciones: *{options}*"
            questions.append(f"{number}. {prompt}{option_line}")
            answers.append(f"{number}. **{answer}** — {explanation}")
        end = start + len(items) - 1
        sections.append(
            f"### Ejercicios {start}–{end} — {title}\n\n"
            f"{instruction}\n\n"
            f"{chr(10).join(questions)}\n\n"
            f"{details(chr(10).join(answers))}"
        )
        start = end + 1
    return f"""## Lección 1 — Gramática y chunks

**Objetivo:** seleccionar y construir correctamente {META[unit]["focus"]}.

No respondas por parecido visual. Lee la situación, identifica el significado y comprueba partículas, artículos, posesivos y tiempo verbal.

{(chr(10) * 2).join(sections)}
"""


def render_vocab(unit: int) -> str:
    entries = VOCAB[unit]
    blocks = [
        (
            "Traducción precisa",
            "Cada palabra tiene tres significados. Elige solo uno.",
            entries[:5],
        ),
        (
            "Elige por definición",
            "Completa la definición o situación con una de las tres opciones.",
            entries[5:10],
        ),
        (
            "Completa en contexto",
            "Escribe la palabra que completa naturalmente la frase. El contexto deja una única respuesta del vocabulario de la unidad.",
            entries[10:],
        ),
    ]
    sections = []
    start = 1
    for title, instruction, items in blocks:
        questions = []
        answers = []
        for number, entry in enumerate(items, start):
            if len(entry) == 3:
                prompt, options, answer = entry
                option_line = f"  \n   Opciones: *{options}*"
            else:
                prompt, answer = entry
                option_line = ""
            questions.append(f"{number}. {prompt}{option_line}")
            answers.append(f"{number}. **{answer}**")
        end = start + len(items) - 1
        sections.append(
            f"### Ejercicios {start}–{end} — {title}\n\n"
            f"{instruction}\n\n"
            f"{chr(10).join(questions)}\n\n"
            f"{details(' · '.join(answers))}"
        )
        start = end + 1
    return f"""## Lección 2 — Vocabulario

**Objetivo:** comprender y usar vocabulario de *{META[unit]["vocab"]}* en frases concretas.

Aprende cada palabra dentro de una situación. Las opciones incorrectas pertenecen a campos cercanos, así que decide por significado, no por forma.

{(chr(10) * 2).join(sections)}
"""


def render_comprehension(
    unit: int,
    exercises: dict[int, list[tuple[str, str]]],
    kind: str,
) -> str:
    items = exercises[unit]
    headings = (
        ("Comprensión global", "Responde con la información explícita del texto o audio."),
        ("Detalles y chunks exactos", "Completa con las palabras exactas del texto o audio."),
        ("Forma, significado y secuencia", "Elige, clasifica o ordena según la información presentada."),
    )
    sections = []
    for block_index, (heading, instruction) in enumerate(headings):
        start = block_index * 5 + 1
        block = items[block_index * 5 : block_index * 5 + 5]
        questions = [f"{n}. {q}" for n, (q, _) in enumerate(block, start)]
        answers = [f"{n}. **{a}**" for n, (_, a) in enumerate(block, start)]
        sections.append(
            f"### Ejercicios {start}–{start + 4} — {heading}\n\n"
            f"{instruction}\n\n"
            f"{chr(10).join(questions)}\n\n"
            f"{details(chr(10).join(answers))}"
        )
    if kind == "reading":
        meta = META[unit]
        source = f"""> {READING[unit]}

<audio controls preload="none" src="/audio/blog/curso-b2/unit-{unit}/reading-workbook.mp3" title="🔊 Reading: {meta['reading_title']}"></audio>

Lee una vez para captar la situación y otra para localizar detalles. También puedes escuchar el audio. Todas las respuestas se pueden comprobar directamente en el texto."""
        title = f"Reading: {meta['reading_title']}"
        objective = "comprender la idea global, localizar datos y reconocer los chunks en contexto"
    else:
        meta = META[unit]
        source = f"""<audio controls preload="none" src="/audio/blog/curso-b2/unit-{unit}/listening-workbook.mp3" title="🔊 Listening: {meta['listening_title']}"></audio>

Escucha dos veces antes de abrir el guion: la primera para entender la situación y la segunda para anotar detalles.

{details(f'> {LISTENING[unit]}', 'Leer guion después de escuchar')}"""
        title = f"Listening: {meta['listening_title']}"
        objective = "identificar información y expresiones completas a velocidad natural"
    lesson = 3 if kind == "reading" else 4
    return f"""## Lección {lesson} — {title}

**Objetivo:** {objective}.

{source}

{(chr(10) * 2).join(sections)}
"""


def render_production(unit: int) -> str:
    writing_questions = [f"{n}. {q}" for n, (q, _) in enumerate(WRITING[unit], 1)]
    writing_answers = [f"{n}. {a}" for n, (_, a) in enumerate(WRITING[unit], 1)]
    speaking_questions = [f"{n}. {q}" for n, (q, _) in enumerate(SPEAKING[unit], 11)]
    speaking_answers = [f"{n}. {a}" for n, (_, a) in enumerate(SPEAKING[unit], 11)]
    return f"""## Lección 5 — Writing y Speaking

**Objetivo:** producir mensajes breves y controlados con {META[unit]["focus"]}.

### Ejercicios 1–10 — Writing con modelo

Sigue la extensión y las expresiones indicadas. En los ejercicios largos, subraya los chunks objetivo antes de comparar. Los modelos muestran una respuesta completa; puedes cambiar los detalles sin cambiar la estructura evaluada.

{chr(10).join(writing_questions)}

{details(chr(10).join(writing_answers), "Ver modelos de writing")}

### Ejercicios 11–15 — Speaking con guion y pistas

Lee la consigna, prepara durante 30 segundos y habla sin leer. Después compara tus chunks con el guion o las pistas; no necesitas repetir cada detalle literalmente.

{chr(10).join(speaking_questions)}

{details(chr(10).join(speaking_answers), "Ver guiones y pistas de speaking")}
"""


def render_unit(unit: int) -> str:
    meta = META[unit]
    keyword_lines = "\n".join(
        f"  - {keyword}"
        for keyword in [
            f"ejercicios inglés B2 unidad {unit}",
            "ejercicios inglés B2 gratis",
            "curso inglés B2 gratis",
            *meta["keywords"],
        ]
    )
    remember_lines = "\n".join(f"- {line}" for line in meta["remember"])
    if unit == 30:
        next_step = (
            "3. Has completado el **Módulo 3 (U21–30)**. Continúa en la "
            "[Unidad 31 del curso](/curso-b2/unit-31) cuando quieras avanzar."
        )
    else:
        next_step = (
            f"3. Continúa con [{meta['next_title']}]"
            f"(/blog/curso-b2/{meta['next']})."
        )
    return f"""---
category: curso-b2
date: '{DATE}'
updatedDate: '{DATE}'
author: linguafly-team
title: "Ejercicios Unidad {unit} B2: {meta['title']} (con soluciones)"
description: >-
  Cuaderno de la Unidad {unit} B2 sobre {meta["focus"]}, vocabulario de
  {meta["vocab"]}, reading, listening, writing y speaking. Incluye soluciones y modelos.
readTime: 30 min
keywords:
{keyword_lines}
canonical: 'https://linguafly.app/blog/curso-b2/{meta["slug"]}-ejercicios-soluciones'
image: {meta["image"]}
alt: "{meta['title']} — ejercicios de inglés B2 con soluciones"
related_routes:
  - {meta["slug"]}
  - {meta["prev"]}
  - {meta["next"]}
  - {HUB}
faqs:
  - question: ¿Qué practica el cuaderno de la Unidad {unit} B2?
    answer: >-
      Practica {meta["focus"]} junto con vocabulario de {meta["vocab"]}.
  - question: ¿Los ejercicios de la Unidad {unit} tienen soluciones?
    answer: >-
      Sí. Cada bloque incluye una clave completa en «Ver solución» y las tareas
      de producción incluyen modelos o guiones.
  - question: ¿Cómo debo trabajar el reading y el listening?
    answer: >-
      Haz una primera lectura o escucha global, repite para localizar detalles
      y abre las soluciones o el guion solo después de responder.
  - question: ¿Este cuaderno incluye writing y speaking?
    answer: >-
      Sí. La quinta lección incluye diez tareas de writing con modelo y cinco
      tareas de speaking con guiones o pistas concretas.
  - question: ¿Dónde encuentro la explicación de la Unidad {unit}?
    answer: >-
      En la guía teórica enlazada al inicio y en la Unidad {unit} del curso B2
      gratuito de Linguafly.
excerpt: >-
  Ejercicios de la Unidad {unit} B2 ({meta["title"]}) con reading, listening,
  writing, speaking y soluciones completas.
---

Este cuaderno reúne los **ejercicios de la Unidad {unit} del curso B2** (*{meta["full"]}*). Practicarás reconocimiento, transformación y producción sin depender de consignas ambiguas. Cada actividad indica qué debes escribir, qué opciones puedes usar o qué información debes localizar.

> **Guía teórica:** [{meta["title"]} B2](/blog/curso-b2/{meta["slug"]})  
> **Practica en el curso:** [Unidad {unit} — {meta["title"]}](/curso-b2/unit-{unit})

Trabaja en este orden: responde sin mirar, abre la solución, identifica la causa de cada error y repite la frase correcta en voz alta. En writing y speaking, compara primero la estructura obligatoria y después el contenido. Un modelo no es una «respuesta abierta»: muestra con precisión cómo cumplir la consigna.

**Recuerda antes de empezar:**
{remember_lines}

![{meta["title"]}]({meta["image"]})

**Contenido de la unidad:**
1. [Lección 1 — Gramática y chunks](#leccion-1--gramatica-y-chunks)
2. [Lección 2 — Vocabulario](#leccion-2--vocabulario)
3. [Lección 3 — Reading](#leccion-3--reading)
4. [Lección 4 — Listening](#leccion-4--listening)
5. [Lección 5 — Writing y Speaking](#leccion-5--writing-y-speaking)

---

{render_grammar(unit)}
---

{render_vocab(unit)}
---

{render_comprehension(unit, READING_EX, "reading")}
---

{render_comprehension(unit, LISTENING_EX, "listening")}
---

{render_production(unit)}
---

## Cómo revisar tus resultados

Clasifica cada fallo en una de cuatro categorías: **significado** (elegiste otra idea), **forma** (faltó una partícula o palabra del chunk), **gramática** (tiempo, artículo, posesivo o *-ing*) o **vocabulario** (confundiste el campo semántico). Copia solo la corrección mínima y crea una frase nueva con el mismo patrón. Después vuelve a intentarlo sin opciones.

Para consolidar, repite las expresiones mañana, dentro de tres días y una semana después. En la primera revisión puedes mirar las opciones; en la segunda usa solo una pista en español; en la tercera cuenta una situación de 45 segundos. Este descenso progresivo de apoyo comprueba si puedes recuperar el inglés, no solo reconocerlo.

## Cómo seguir

1. Repasa tus fallos en la [guía teórica](/blog/curso-b2/{meta["slug"]}).  
2. Practica las destrezas interactivas en la [Unidad {unit} del curso B2](/curso-b2/unit-{unit}).  
{next_step}

Guías relacionadas:

- [Teoría Unidad {unit}](/blog/curso-b2/{meta["slug"]})
- [Cuaderno anterior](/blog/curso-b2/{meta["prev"]})
- [Cuaderno siguiente](/blog/curso-b2/{meta["next"]})
- [Inglés B2](/blog/metodos/{HUB})

---

*Cuaderno alineado con la Unidad {unit} del [curso B2 de Linguafly](/curso-b2).*
"""


def make_audios() -> None:
    for unit in range(26, 31):
        directory = ROOT / f"public/audio/blog/curso-b2/unit-{unit}"
        directory.mkdir(parents=True, exist_ok=True)
        sources = (
            ("reading-workbook", READING[unit]),
            ("listening-workbook", LISTENING[unit]),
        )
        for name, text in sources:
            path = directory / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for unit in range(26, 31):
        path = OUT / f"{META[unit]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(unit), encoding="utf-8")
        words = len(path.read_text(encoding="utf-8").split())
        print("wrote", path.relative_to(ROOT), "words", words)
    make_audios()
    print("done B2 U26–30 workbooks")


if __name__ == "__main__":
    main()
