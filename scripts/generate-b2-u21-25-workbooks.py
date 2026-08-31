#!/usr/bin/env python3
"""Generate clear B2 Units 21–25 exercise workbooks (ejercicios-soluciones) + TTS.

Clarity model: B1 U27 (Spanish instructions, meaning hints, closed tasks,
context fill-ins, model writing solutions). Aligns with live theory U21–25.
"""
from __future__ import annotations

from pathlib import Path

from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/content/blog/curso-b2"
DATE = "2026-08-31"
HUB = "ingles-b2"

# ---------------------------------------------------------------------------
# Reading / listening scripts (also used for TTS)
# ---------------------------------------------------------------------------

READ = {
    21: (
        "Maya signed up for a personal development workshop last spring. "
        "Although she had little free time, she wanted to build resilience and set clearer goals. "
        "Despite early doubts, a mentor helped her step out of her comfort zone. "
        "She celebrated each milestone and kept a growth mindset. "
        "In spite of busy weeks, she made steady progress. "
        "Whereas some classmates quit, Maya stayed. "
        "However, she still reminds herself to practice what she learns every day."
    ),
    22: (
        "Leo planned a city shoot at golden hour. "
        "Because of heavy traffic he almost arrived late, so he left earlier in order to reach the rooftop on time. "
        "He adjusted exposure carefully so that the skyline would not look overexposed. "
        "Due to a sudden cloud, a few frames were blurry. "
        "As a result, he cropped the best shot and posted it to his feed. "
        "The sharp composition with a clean background helped him capture more engagement than usual."
    ),
    23: (
        "When Sam was about to move in, the washing machine broke down. "
        "He brought in a plumber the same afternoon. "
        "Negotiations with the landlord almost broke down over the cost of an extension, "
        "but they finally agreed to renovate the kitchen into an open-plan space. "
        "Sam brought up the idea of redecorating the hallway too. "
        "A small fire scare broke out in the old fuse box, which brought about a full electrical check. "
        "After that, he could settle in, furnish the rooms and tidy up before guests arrived."
    ),
    24: (
        "Nora's team almost called off the product livestream after a server crash. "
        "Instead they carried out a quick backup plan and carried on with a shorter story sequence. "
        "While scrolling competitors' feeds, Nora came across a format that boosted engagement. "
        "She came up with a hashtag challenge for influencers and asked partners to call her back with availability. "
        "The situation called for calm messaging, not panic. "
        "By Friday the campaign was coming along well: followers shared the story and a few posts went viral."
    ),
    25: (
        "Although Maya felt nervous, she joined the workshop to build resilience. "
        "She used a tripod in order to capture sharp photos for her mentor's challenge. "
        "When the boiler broke down at home, she brought in a plumber and still carried on studying. "
        "Later her livestream was called off, but she came up with a story series that improved engagement. "
        "Despite the setbacks, she made progress and stepped further out of her comfort zone."
    ),
}

LISTEN = {
    21: (
        "Hi, I am Maya. Although I was tired after work, I joined the personal development workshop. "
        "Despite my doubts, my mentor helped me step out of my comfort zone. "
        "In spite of a busy schedule, I made progress every week. "
        "Whereas some classmates quit early, I stayed until the end. "
        "However, I still need to practise what I learn every day. "
        "Building resilience is my next milestone."
    ),
    22: (
        "Hi, I am Leo. Because of heavy traffic I almost arrived late for the shoot. "
        "I left earlier in order to reach the rooftop on time. "
        "I adjusted the exposure so that the skyline would look sharp. "
        "Due to a sudden cloud, a few frames were blurry. "
        "As a result, I cropped the best shot and posted it to my feed. "
        "A clean background really helped the composition."
    ),
    23: (
        "Hi, I am Sam. I was about to move in when the washing machine broke down. "
        "I brought in a plumber the same afternoon. "
        "Talks with the landlord almost broke down over the extension cost. "
        "I brought up the idea of an open-plan kitchen and they agreed. "
        "Later a small fire scare broke out in the fuse box, which brought about a full check. "
        "After that I could settle in and tidy up."
    ),
    24: (
        "Hi, I am Nora. We almost called off the livestream after a server crash. "
        "Instead we carried out a backup plan and carried on with shorter stories. "
        "I came across a useful format while scrolling. "
        "Then I came up with a hashtag challenge for influencers. "
        "The situation called for calm messaging. "
        "By Friday the campaign was coming along well and engagement went up."
    ),
    25: (
        "Hi, I am Eva. Although I felt nervous, I joined the workshop. "
        "I used a tripod in order to capture sharp photos. "
        "When the boiler broke down, I brought in a plumber. "
        "My livestream was called off, but I came up with a story series. "
        "Despite the setbacks, I carried on and made progress. "
        "Units twenty-one to twenty-four are finally connected in my head."
    ),
}

META = {
    21: dict(
        slug="unidad-21-linkers-contrast-personal-development",
        title="Linkers Contrast & Personal Development",
        full="Linkers of Contrast + Personal Development",
        focus="although, despite, in spite of, whereas, however",
        vocab="personal development",
        image="/blog/curso-b2/unit-21/linkers-contrast.png",
        prev="unidad-20-repaso-16-19-ejercicios-soluciones",
        next_slug="unidad-22-linkers-reason-purpose-photography",
        next_title="Linkers Reason Purpose & Photography",
        r_title="Maya at the workshop",
        l_title="Maya on contrast linkers",
        remember=(
            "- **although** + sujeto + verbo (*Although she was tired…*)\n"
            "- **despite / in spite of** + sustantivo / *-ing* (*Despite the setbacks…*)\n"
            "- **whereas** = contraste en paralelo\n"
            "- **however** = contraste en una oración nueva"
        ),
        kw=[
            "linkers contrast ejercicios B2",
            "although despite whereas however",
            "personal development vocabulary B2",
        ],
    ),
    22: dict(
        slug="unidad-22-linkers-reason-purpose-photography",
        title="Linkers Reason Purpose & Photography",
        full="Linkers of Reason, Purpose & Result + Photography & Media",
        focus="because of, due to, in order to, so that, as a result",
        vocab="photography & media",
        image="/blog/curso-b2/unit-22/linkers-reason-purpose.png",
        prev="unidad-21-linkers-contrast-personal-development-ejercicios-soluciones",
        next_slug="unidad-23-phrasal-verbs-1-home-living",
        next_title="Phrasal Verbs 1 & Home & Living",
        r_title="Leo's golden-hour shoot",
        l_title="Leo on reason and purpose",
        remember=(
            "- **because of / due to** + sustantivo (*Because of the traffic…*)\n"
            "- **in order to** + infinitivo (mismo sujeto)\n"
            "- **so that** + cláusula (a menudo con modal)\n"
            "- **as a result** = consecuencia"
        ),
        kw=[
            "linkers reason purpose ejercicios B2",
            "because of due to in order to",
            "photography vocabulary B2",
        ],
    ),
    23: dict(
        slug="unidad-23-phrasal-verbs-1-home-living",
        title="Phrasal Verbs 1 & Home & Living",
        full="Phrasal Verbs 1 (BE / BREAK / BRING) + Home & Living",
        focus="be about to / be up to; break down / in / out; bring up / about / in",
        vocab="home & living",
        image="/blog/curso-b2/unit-23/phrasal-be-break-bring.png",
        prev="unidad-22-linkers-reason-purpose-photography-ejercicios-soluciones",
        next_slug="unidad-24-phrasal-verbs-2-social-media",
        next_title="Phrasal Verbs 2 & Social Media",
        r_title="Sam moving in",
        l_title="Sam on home phrasals",
        remember=(
            "- **be about to** = estar a punto de · **be up to** = estar haciendo / tramando\n"
            "- **break down** = averiarse / fracasar · **break in** = entrar · **break out** = estallar\n"
            "- **bring up** = mencionar / criar · **bring about** = causar · **bring in** = traer a un experto"
        ),
        kw=[
            "phrasal verbs home living B2",
            "break down bring up ejercicios",
            "home living vocabulary B2",
        ],
    ),
    24: dict(
        slug="unidad-24-phrasal-verbs-2-social-media",
        title="Phrasal Verbs 2 & Social Media",
        full="Phrasal Verbs 2 (CALL / CARRY / COME) + Social Media",
        focus="call off / back / for; carry on / out / away; come across / up with / along",
        vocab="social media & networking",
        image="/blog/curso-b2/unit-24/phrasal-call-carry-come.png",
        prev="unidad-23-phrasal-verbs-1-home-living-ejercicios-soluciones",
        next_slug="unidad-25-repaso-21-24",
        next_title="Repaso 21–24",
        r_title="Nora's livestream crisis",
        l_title="Nora on social media phrasals",
        remember=(
            "- **call off** = cancelar · **call back** = devolver la llamada · **call for** = requerir\n"
            "- **carry on** = continuar · **carry out** = ejecutar · **get carried away** = dejarse llevar\n"
            "- **come across** = encontrar · **come up with** = idear · **come along** = avanzar"
        ),
        kw=[
            "phrasal verbs social media B2",
            "call off come up with ejercicios",
            "social media vocabulary B2",
        ],
    ),
    25: dict(
        slug="unidad-25-repaso-21-24",
        title="Repaso 21–24",
        full="Repaso B2 Unidades 21–24",
        focus="linkers of contrast + reason/purpose + phrasal verbs BE/BREAK/BRING + CALL/CARRY/COME",
        vocab="personal development, photography, home & living, social media (mix)",
        image="/blog/curso-b2/unit-25/review-map.png",
        prev="unidad-24-phrasal-verbs-2-social-media-ejercicios-soluciones",
        next_slug=None,
        next_title=None,
        r_title="Eva's mixed review",
        l_title="Eva mixes Units 21–24",
        remember=(
            "- Contraste: **although / despite / whereas / however**\n"
            "- Razón-propósito: **because of / in order to / so that / as a result**\n"
            "- Casa: **break down / bring in / bring up**\n"
            "- Redes: **call off / carry on / come up with**"
        ),
        kw=[
            "repaso B2 unidades 21-24",
            "linkers phrasal verbs review B2",
            "integración módulo 3 B2",
        ],
    ),
}

# ---------------------------------------------------------------------------
# Grammar / vocab / reading / listening / writing content (clear, closed)
# Each GRAM item: (prompt_es_en, options_display, answer, comment)
# ---------------------------------------------------------------------------

GRAM = {
    21: {
        "a_title": "Elige la opción correcta",
        "a_intro": "Completa cada frase con **una** de las tres opciones. Lee el significado completo antes de elegir.",
        "a": [
            (
                "___ she was tired, she stayed at the workshop. (= Aunque estaba cansada, se quedó.)",
                "a) Although · b) Despite · c) However",
                "a) Although",
                "*although* + sujeto + verbo.",
            ),
            (
                "___ the setbacks, the workshop went ahead. (= A pesar de los contratiempos…)",
                "a) Despite · b) Although · c) Whereas",
                "a) Despite",
                "*despite* + sustantivo (no cláusula).",
            ),
            (
                "___ feeling nervous, she joined the session. (= A pesar de sentirse nerviosa…)",
                "a) In spite of · b) Although · c) However",
                "a) In spite of",
                "*in spite of* + *-ing*.",
            ),
            (
                "Meditation is calming, ___ goal-setting is more dynamic. (= …mientras que…)",
                "a) whereas · b) despite · c) because of",
                "a) whereas",
                "*whereas* = contraste paralelo.",
            ),
            (
                "He reads self-help books. ___, he rarely applies the advice. (= Sin embargo…)",
                "a) However · b) Although · c) Despite",
                "a) However",
                "*however* abre una oración nueva.",
            ),
        ],
        "b_title": "Completa con although / despite / in spite of / whereas / however",
        "b_intro": "Escribe el linker correcto. La pista en español te indica el significado.",
        "b": [
            ("___ she works on her goals every day, she still struggles. (aunque)", "Although", "+ sujeto + verbo"),
            ("___ early doubts, a mentor helped her. (a pesar de + sustantivo)", "Despite", "+ noun"),
            ("___ busy weeks, she made steady progress. (a pesar de)", "In spite of", "+ noun"),
            ("Some classmates quit, ___ Maya stayed. (mientras que)", "whereas", "paralelo"),
            ("She learned a lot. ___, she still needs practice. (sin embargo)", "However", "nueva oración"),
        ],
        "c_title": "Corrige el error",
        "c_intro": "Cada frase tiene **un** error. Reescribe la frase correcta.",
        "c": [
            ("*Despite she was tired, she stayed.*", "Although she was tired, she stayed. / Despite **being** tired…", "*despite* no lleva cláusula directa."),
            ("*Although the setbacks, the workshop went ahead.*", "**Despite** the setbacks, the workshop went ahead.", "*although* necesita sujeto + verbo."),
            ("*In spite she felt nervous, she joined.*", "**In spite of** feeling nervous… / **Despite** her nerves…", "falta *of*."),
            ("*However she stayed until the end.* (misma oración)", "She was tired. **However**, she stayed until the end.", "*however* no sustituye a *although* dentro de la misma cláusula."),
            ("*Whereas some quit. Maya stayed.* (puntuación)", "Whereas some quit, Maya stayed. / Some quit, **whereas** Maya stayed.", "une dos ideas en contraste."),
        ],
    },
    22: {
        "a_title": "Elige la opción correcta",
        "a_intro": "Completa cada frase con **una** de las tres opciones. Lee el significado completo antes de elegir.",
        "a": [
            (
                "___ heavy traffic, Leo almost arrived late. (= A causa del tráfico…)",
                "a) Because of · b) Because · c) So that",
                "a) Because of",
                "*because of* + sustantivo.",
            ),
            (
                "He left earlier ___ reach the rooftop on time. (= para llegar…)",
                "a) in order to · b) due to · c) as a result",
                "a) in order to",
                "*in order to* + infinitivo.",
            ),
            (
                "He adjusted exposure ___ the skyline would not look overexposed. (= para que…)",
                "a) so that · b) because of · c) due to",
                "a) so that",
                "*so that* + cláusula (a menudo con *would/can*).",
            ),
            (
                "___ a sudden cloud, a few frames were blurry. (= Debido a…)",
                "a) Due to · b) In order to · c) So that",
                "a) Due to",
                "*due to* + sustantivo.",
            ),
            (
                "He cropped the best shot. ___, engagement went up. (= Como resultado…)",
                "a) As a result · b) In order to · c) Because",
                "a) As a result",
                "*as a result* = consecuencia.",
            ),
        ],
        "b_title": "Completa con because of / due to / in order to / so that / as a result",
        "b_intro": "Escribe el linker correcto según la pista.",
        "b": [
            ("___ low light, the shot looks blurry. (a causa de)", "Because of", "+ noun"),
            ("She used a tripod ___ avoid camera shake. (para + infinitivo)", "in order to", "propósito"),
            ("Save the file ___ you can edit it later. (para que…)", "so that", "+ cláusula"),
            ("___ rain, they moved the shoot indoors. (debido a)", "Due to", "+ noun"),
            ("The sky was overexposed. ___, he adjusted the settings. (como resultado)", "As a result", "resultado"),
        ],
        "c_title": "Corrige el error",
        "c_intro": "Cada frase tiene **un** error. Reescribe la frase correcta.",
        "c": [
            ("*Because of he was late, he missed the light.*", "**Because** he was late… / **Because of** the traffic…", "*because of* + noun; *because* + cláusula."),
            ("*He left earlier in order that reach the roof.*", "He left earlier **in order to** reach the roof.", "*in order to* + infinitivo."),
            ("*Due to the frames were blurry.*", "**Due to** a sudden cloud, the frames were blurry. / **Because** the frames…", "*due to* + noun."),
            ("*He cropped the shot as a result he posted it.* (puntuación)", "He cropped the shot. **As a result**, he posted it.", "suele ir al inicio de una oración nueva."),
            ("*She adjusted exposure so that not look overexposed.*", "…**so that** it would **not** look overexposed.", "*so that* necesita sujeto (+ modal)."),
        ],
    },
    23: {
        "a_title": "Elige la opción correcta",
        "a_intro": "Completa cada frase con **una** de las tres opciones. Lee el significado completo antes de elegir.",
        "a": [
            (
                "I ___ leave when the plumber arrived. (= Estaba a punto de irme…)",
                "a) was about to · b) broke in · c) brought about",
                "a) was about to",
                "*be about to* = estar a punto de.",
            ),
            (
                "The washing machine ___ yesterday. (= Se averió…)",
                "a) broke down · b) broke in · c) brought up",
                "a) broke down",
                "*break down* = averiarse (máquina) / fracasar (negociaciones).",
            ),
            (
                "Thieves ___ during the night. (= Entraron por la fuerza…)",
                "a) broke in · b) broke down · c) brought in",
                "a) broke in",
                "*break in* = entrar a la fuerza.",
            ),
            (
                "They ___ a plumber the same afternoon. (= Trajeron a un fontanero…)",
                "a) brought in · b) broke out · c) were up to",
                "a) brought in",
                "*bring in* = traer a un experto.",
            ),
            (
                "Sam ___ the idea of redecorating the hallway. (= Sacó el tema…)",
                "a) brought up · b) broke out · c) was about to",
                "a) brought up",
                "*bring up* = mencionar un tema.",
            ),
        ],
        "b_title": "Completa con el phrasal correcto",
        "b_intro": "Usa: *be about to · break down · break out · bring about · bring in* (forma adecuada).",
        "b": [
            ("A fire scare ___ in the old fuse box. (estalló)", "broke out", "break out"),
            ("The renovation ___ major changes. (provocó)", "brought about", "bring about"),
            ("Talks with the landlord almost ___. (fracasaron)", "broke down", "break down"),
            ("What have you been ___ lately with the flat? (haciendo)", "up to", "be up to"),
            ("She ___ hire an interior designer next week. (está a punto de)", "is about to", "be about to"),
        ],
        "c_title": "Corrige el error",
        "c_intro": "Cada frase tiene **un** error. Reescribe la frase correcta.",
        "c": [
            ("*The boiler broke in last winter.* (avería)", "The boiler **broke down** last winter.", "máquina → *break down*."),
            ("*They brought up a plumber.* (contratar experto)", "They **brought in** a plumber.", "experto → *bring in*."),
            ("*A fire broke down in the kitchen.*", "A fire **broke out** in the kitchen.", "incendio → *break out*."),
            ("*I was about leave when he arrived.*", "I was **about to** leave when he arrived.", "falta *to*."),
            ("*The talks brought about down over the cost.*", "The talks **broke down** over the cost.", "negociaciones que fracasan → *break down*."),
        ],
    },
    24: {
        "a_title": "Elige la opción correcta",
        "a_intro": "Completa cada frase con **una** de las tres opciones. Lee el significado completo antes de elegir.",
        "a": [
            (
                "The livestream was ___ because of technical issues. (= se canceló…)",
                "a) called off · b) carried on · c) came across",
                "a) called off",
                "*call off* = cancelar.",
            ),
            (
                "Despite the trolls, we ___ posting. (= seguimos…)",
                "a) carried on · b) called for · c) came up with",
                "a) carried on",
                "*carry on* = continuar.",
            ),
            (
                "The team ___ a survey of user engagement. (= realizaron…)",
                "a) carried out · b) called back · c) came along",
                "a) carried out",
                "*carry out* = ejecutar / realizar.",
            ),
            (
                "I ___ an interesting profile while scrolling. (= me topé con…)",
                "a) came across · b) called off · c) carried away",
                "a) came across",
                "*come across* = encontrar por casualidad.",
            ),
            (
                "She ___ a brilliant hashtag for the campaign. (= ideó…)",
                "a) came up with · b) called for · c) carried on",
                "a) came up with",
                "*come up with* + idea (preposición *with*).",
            ),
        ],
        "b_title": "Completa con el phrasal correcto",
        "b_intro": "Usa: *call back · call for · get carried away · come along · call off* (forma adecuada).",
        "b": [
            ("Please ___ when you have a moment. (devuélveme la llamada)", "call me back", "call back"),
            ("The situation ___ calm messaging. (requiere)", "calls for", "call for"),
            ("Don't ___ in the comments. (no te dejes llevar)", "get carried away", "get carried away"),
            ("How is your campaign ___? (avanzando)", "coming along", "come along"),
            ("They almost ___ the product live. (cancelar)", "called off", "call off"),
        ],
        "c_title": "Corrige el error",
        "c_intro": "Cada frase tiene **un** error. Reescribe la frase correcta.",
        "c": [
            ("*I came up a hashtag yesterday.*", "I **came up with** a hashtag yesterday.", "falta *with*."),
            ("*We carried out posting despite the crash.* (continuar)", "We **carried on** posting…", "continuar → *carry on*; ejecutar → *carry out*."),
            ("*The live was called back after the crash.* (cancelar)", "The live was **called off**…", "cancelar → *call off*."),
            ("*She came across with a new idea.* (idear)", "She **came up with** a new idea.", "idear → *come up with*."),
            ("*The campaign is coming across well.* (avanzar)", "The campaign is **coming along** well.", "avanzar → *come along*."),
        ],
    },
    25: {
        "a_title": "Elige la opción correcta (mix U21–24)",
        "a_intro": "Completa cada frase con **una** de las tres opciones. Mezcla de contraste, razón/propósito y phrasals.",
        "a": [
            (
                "___ Maya felt nervous, she joined the workshop.",
                "a) Although · b) Because of · c) In order to",
                "a) Although",
                "contraste + cláusula.",
            ),
            (
                "She used a tripod ___ capture sharp photos.",
                "a) in order to · b) despite · c) call off",
                "a) in order to",
                "propósito + infinitivo.",
            ),
            (
                "When the boiler ___, she brought in a plumber.",
                "a) broke down · b) called off · c) came across",
                "a) broke down",
                "máquina averiada.",
            ),
            (
                "Her livestream was ___, but she came up with a story series.",
                "a) called off · b) brought about · c) due to",
                "a) called off",
                "cancelar evento.",
            ),
            (
                "___ the setbacks, she made progress.",
                "a) Despite · b) So that · c) Carry on",
                "a) Despite",
                "*despite* + noun.",
            ),
        ],
        "b_title": "Completa (mix)",
        "b_intro": "Escribe la forma correcta según la pista.",
        "b": [
            ("___ heavy traffic, Leo almost arrived late. (a causa de)", "Because of", "U22"),
            ("Sam ___ the idea of an open-plan kitchen. (mencionó)", "brought up", "U23"),
            ("Nora ___ a useful format while scrolling. (encontró)", "came across", "U24"),
            ("Meditation is calm, ___ goal-setting is dynamic. (mientras que)", "whereas", "U21"),
            ("They ___ a backup plan after the crash. (ejecutaron)", "carried out", "U24"),
        ],
        "c_title": "Corrige el error (mix)",
        "c_intro": "Cada frase tiene **un** error típico del bloque. Reescribe la frase correcta.",
        "c": [
            ("*Despite she felt nervous, she joined.*", "**Although** she felt nervous… / **Despite** her nerves…", "U21"),
            ("*Because of he was late, he missed the light.*", "**Because** he was late… / **Because of** the traffic…", "U22"),
            ("*They brought up a plumber for the leak.*", "They **brought in** a plumber…", "U23"),
            ("*I came up a hashtag for the challenge.*", "I **came up with** a hashtag…", "U24"),
            ("*We carried out posting stories all week.* (continuar)", "We **carried on** posting…", "U24"),
        ],
    },
}

VOCAB = {
    21: {
        "a": [
            ("workshop", "a) taller formativo · b) objetivo · c) feed", "a) taller formativo"),
            ("resilience", "a) resiliencia · b) exposición · c) fontanero", "a) resiliencia"),
            ("milestone", "a) hito / logro · b) hashtag · c) fuga", "a) hito / logro"),
            ("mentor", "a) mentor/a · b) trípode · c) troll", "a) mentor/a"),
            ("growth mindset", "a) mentalidad de crecimiento · b) planta abierta · c) composición", "a) mentalidad de crecimiento"),
        ],
        "b": [
            ("set a goal ≈ ___", "a) fijar una meta · b) cancelar un live · c) reformar", "a) fijar una meta"),
            ("make progress ≈ ___", "a) avanzar / progresar · b) entrar por la fuerza · c) recortar", "a) avanzar / progresar"),
            ("step out of your comfort zone ≈ ___", "a) salir de la zona de confort · b) devolver la llamada · c) amueblar", "a) salir de la zona de confort"),
            ("keep learning ≈ ___", "a) seguir aprendiendo · b) averiarse · c) irse viral", "a) seguir aprendiendo"),
            ("personal development ≈ ___", "a) desarrollo personal · b) engagement · c) ampliación", "a) desarrollo personal"),
        ],
        "c_words": "workshop · resilience · milestone · mentor · comfort zone",
        "c": [
            ("She signed up for a weekend ___ on goal-setting.", "workshop"),
            ("Building ___ helps you recover from setbacks.", "resilience"),
            ("Finishing module 2 was a real ___.", "milestone"),
            ("Her ___ challenged her kindly but firmly.", "mentor"),
            ("Public speaking made her step out of her ___.", "comfort zone"),
        ],
    },
    22: {
        "a": [
            ("composition", "a) composición · b) resiliencia · c) fontanero", "a) composición"),
            ("exposure", "a) exposición · b) mentor · c) hashtag", "a) exposición"),
            ("lens", "a) objetivo / lente · b) taller · c) fuga", "a) objetivo / lente"),
            ("blurry", "a) borroso/a · b) nítido · c) viral", "a) borroso/a"),
            ("capture", "a) capturar · b) cancelar · c) ordenar", "a) capturar"),
        ],
        "b": [
            ("crop ≈ ___", "a) recortar · b) criar · c) requerir", "a) recortar"),
            ("feed ≈ ___", "a) feed / muro · b) caldera · c) hito", "a) feed / muro"),
            ("background ≈ ___", "a) fondo · b) seguidores · c) ampliación", "a) fondo"),
            ("overexposed ≈ ___", "a) sobreexpuesto · b) abierto · c) cancelado", "a) sobreexpuesto"),
            ("sharp ≈ ___", "a) nítido · b) borroso · c) nervioso", "a) nítido"),
        ],
        "c_words": "exposure · blurry · crop · feed · composition",
        "c": [
            ("Check ___ before you shoot.", "exposure"),
            ("The shot looks ___ in low light.", "blurry"),
            ("___ the edges to clean the frame.", "Crop"),
            ("She posted the photo to her ___.", "feed"),
            ("Strong ___ guides the eye.", "composition"),
        ],
    },
    23: {
        "a": [
            ("redecorate", "a) redecorar · b) capturar · c) cancelar", "a) redecorar"),
            ("renovate", "a) reformar · b) idear · c) seguir", "a) reformar"),
            ("open-plan", "a) de planta abierta · b) sobreexpuesto · c) viral", "a) de planta abierta"),
            ("plumber", "a) fontanero/a · b) mentor · c) influencer", "a) fontanero/a"),
            ("extension", "a) ampliación · b) hashtag · c) exposición", "a) ampliación"),
        ],
        "b": [
            ("move in ≈ ___", "a) mudarse (entrar a vivir) · b) cancelar · c) recortar", "a) mudarse (entrar a vivir)"),
            ("tidy up ≈ ___", "a) ordenar · b) estallar · c) idear", "a) ordenar"),
            ("settle in ≈ ___", "a) adaptarse / acomodarse · b) devolver la llamada · c) fijar una meta", "a) adaptarse / acomodarse"),
            ("furnish ≈ ___", "a) amueblar · b) seguir aprendiendo · c) irse viral", "a) amueblar"),
            ("leak ≈ ___", "a) fuga · b) feed · c) hito", "a) fuga"),
        ],
        "c_words": "plumber · open-plan · renovate · settle in · tidy up",
        "c": [
            ("Call a ___ for the leak under the sink.", "plumber"),
            ("They want an ___ kitchen that feels bigger.", "open-plan"),
            ("They will ___ the kitchen next month.", "renovate"),
            ("It took weeks to ___ after the move.", "settle in"),
            ("Please ___ before guests arrive.", "tidy up"),
        ],
    },
    24: {
        "a": [
            ("followers", "a) seguidores · b) fontaneros · c) lentes", "a) seguidores"),
            ("engagement", "a) interacción · b) ampliación · c) resiliencia", "a) interacción"),
            ("livestream", "a) directo · b) fuga · c) taller", "a) directo"),
            ("hashtag", "a) hashtag · b) caldera · c) mentor", "a) hashtag"),
            ("influencer", "a) influencer · b) fontanero · c) trípode", "a) influencer"),
        ],
        "b": [
            ("story ≈ ___", "a) historia (Stories) · b) reforma · c) exposición", "a) historia (Stories)"),
            ("viral ≈ ___", "a) viral · b) borroso · c) abierto", "a) viral"),
            ("trending ≈ ___", "a) en tendencia · b) averiado · c) nítido", "a) en tendencia"),
            ("troll ≈ ___", "a) troll · b) hito · c) composición", "a) troll"),
            ("meetup ≈ ___", "a) quedada / encuentro · b) planta abierta · c) zona de confort", "a) quedada / encuentro"),
        ],
        "c_words": "followers · engagement · livestream · hashtag · story",
        "c": [
            ("She gained 200 new ___.", "followers"),
            ("The post boosted ___.", "engagement"),
            ("The ___ starts at 8.", "livestream"),
            ("Create a campaign ___.", "hashtag"),
            ("Post a ___ before the live.", "story"),
        ],
    },
    25: {
        "a": [
            ("workshop", "a) taller formativo · b) directo · c) fuga", "a) taller formativo"),
            ("exposure", "a) exposición · b) seguidores · c) fontanero", "a) exposición"),
            ("plumber", "a) fontanero/a · b) hashtag · c) mentor", "a) fontanero/a"),
            ("engagement", "a) interacción · b) ampliación · c) resiliencia", "a) interacción"),
            ("milestone", "a) hito · b) trípode · c) troll", "a) hito"),
        ],
        "b": [
            ("resilience ≈ ___", "a) resiliencia · b) feed · c) leak", "a) resiliencia"),
            ("blurry ≈ ___", "a) borroso/a · b) viral · c) open-plan", "a) borroso/a"),
            ("renovate ≈ ___", "a) reformar · b) cancelar · c) idear", "a) reformar"),
            ("hashtag ≈ ___", "a) hashtag · b) mentor · c) exposición", "a) hashtag"),
            ("comfort zone ≈ ___", "a) zona de confort · b) planta abierta · c) composición", "a) zona de confort"),
        ],
        "c_words": "workshop · tripod · plumber · livestream · engagement",
        "c": [
            ("Although she felt nervous, she joined the ___.", "workshop"),
            ("She used a ___ in order to capture sharp photos.", "tripod"),
            ("When the boiler broke down, she brought in a ___.", "plumber"),
            ("Later her ___ was called off.", "livestream"),
            ("The story series improved ___.", "engagement"),
        ],
    },
}

# Reading questions: structured for clarity
# literal (1-5), find (6-10), form (11-15)

READ_EX = {
    21: {
        "literal_intro": "Completa con la palabra que aparece en el texto.",
        "literal": [
            ("Maya signed up for a personal development ___.", "workshop"),
            ("Although she had little free ___, she wanted to build resilience.", "time"),
            ("Despite early doubts, a ___ helped her.", "mentor"),
            ("In spite of busy weeks, she made steady ___.", "progress"),
            ("Whereas some classmates ___, Maya stayed.", "quit"),
        ],
        "find_intro": "Responde con palabras o frases **copiadas del texto**.",
        "find": [
            ("Copia la frase que empieza con *Although*.", "Although she had little free time, she wanted to build resilience and set clearer goals."),
            ("Copia el fragmento con *Despite*.", "Despite early doubts"),
            ("¿Qué estructura usa *In spite of* + …?", "In spite of busy weeks"),
            ("Copia la frase con *whereas*.", "Whereas some classmates quit, Maya stayed."),
            ("¿Qué palabra abre la última oración de contraste?", "However"),
        ],
        "form_intro": "Forma, significado y verdadero/falso según el texto.",
        "form": [
            ("True/False: Maya quit the workshop early.", "False — she stayed."),
            ("True/False: A mentor helped her leave her comfort zone.", "True"),
            ("¿*Despite* va seguido de cláusula (*she was tired*) o de sustantivo/*-ing*?", "sustantivo / -ing"),
            ("Nombra dos palabras de *personal development* del texto.", "workshop, resilience, mentor, milestone, growth mindset, comfort zone, progress…"),
            ("Completa la regla: *although* + ___ + ___.", "sujeto + verbo"),
        ],
    },
    22: {
        "literal_intro": "Completa con la palabra que aparece en el texto.",
        "literal": [
            ("Leo planned a city shoot at ___ hour.", "golden"),
            ("Because of heavy ___, he almost arrived late.", "traffic"),
            ("He left earlier in order to reach the ___ on time.", "rooftop"),
            ("Due to a sudden cloud, a few frames were ___.", "blurry"),
            ("As a result, he ___ the best shot.", "cropped"),
        ],
        "find_intro": "Responde con palabras o frases **copiadas del texto**.",
        "find": [
            ("Copia el fragmento con *because of*.", "Because of heavy traffic"),
            ("Copia el fragmento con *in order to*.", "in order to reach the rooftop on time"),
            ("Copia el fragmento con *so that*.", "so that the skyline would not look overexposed"),
            ("Copia el fragmento con *due to*.", "Due to a sudden cloud"),
            ("¿Qué linker introduce el resultado?", "As a result"),
        ],
        "form_intro": "Forma, significado y verdadero/falso según el texto.",
        "form": [
            ("True/False: All frames were sharp.", "False — a few were blurry."),
            ("True/False: He posted the best shot to his feed.", "True"),
            ("¿*because of* lleva sustantivo o cláusula completa?", "sustantivo"),
            ("Nombra dos palabras de fotografía del texto.", "exposure, skyline, frames, cropped, feed, composition, background…"),
            ("Completa: *in order to* + ___.", "infinitivo"),
        ],
    },
    23: {
        "literal_intro": "Completa con la palabra que aparece en el texto.",
        "literal": [
            ("When Sam was about to move in, the washing machine ___.", "broke down"),
            ("He brought in a ___ the same afternoon.", "plumber"),
            ("Negotiations with the ___ almost broke down.", "landlord"),
            ("Sam brought up the idea of ___ the hallway.", "redecorating"),
            ("A small fire scare ___ in the old fuse box.", "broke out"),
        ],
        "find_intro": "Responde con palabras o frases **copiadas del texto**.",
        "find": [
            ("Copia la frase con *was about to*.", "When Sam was about to move in, the washing machine broke down."),
            ("Copia el fragmento con *brought in*.", "He brought in a plumber the same afternoon."),
            ("¿Qué *broke down* además de la lavadora?", "Negotiations with the landlord almost broke down"),
            ("Copia el fragmento con *brought about*.", "which brought about a full electrical check"),
            ("¿Qué hizo Sam antes de que llegaran los invitados? (tres verbos)", "settle in, furnish, tidy up"),
        ],
        "form_intro": "Forma, significado y verdadero/falso según el texto.",
        "form": [
            ("True/False: Sam ignored the washing machine problem.", "False — he brought in a plumber."),
            ("True/False: They agreed to renovate into an open-plan kitchen.", "True"),
            ("¿*break in* o *break down* para una máquina averiada?", "break down"),
            ("Nombra dos palabras de *home & living* del texto.", "plumber, landlord, extension, renovate, open-plan, hallway, furnish…"),
            ("¿Qué significa *bring up* en *brought up the idea*?", "mencionar / sacar el tema"),
        ],
    },
    24: {
        "literal_intro": "Completa con la palabra que aparece en el texto.",
        "literal": [
            ("Nora's team almost called off the product ___.", "livestream"),
            ("They carried out a quick ___ plan.", "backup"),
            ("Nora came across a format that boosted ___.", "engagement"),
            ("She came up with a ___ challenge.", "hashtag"),
            ("By Friday the campaign was coming ___ well.", "along"),
        ],
        "find_intro": "Responde con palabras o frases **copiadas del texto**.",
        "find": [
            ("Copia el fragmento con *called off*.", "almost called off the product livestream"),
            ("Copia los dos *carry* del texto.", "carried out a quick backup plan · carried on with a shorter story sequence"),
            ("Copia el fragmento con *came across*.", "Nora came across a format that boosted engagement"),
            ("Copia el fragmento con *came up with*.", "She came up with a hashtag challenge"),
            ("¿Qué *called for* la situación?", "calm messaging, not panic"),
        ],
        "form_intro": "Forma, significado y verdadero/falso según el texto.",
        "form": [
            ("True/False: They cancelled and did nothing else.", "False — they carried out a backup and carried on."),
            ("True/False: Some posts went viral.", "True"),
            ("¿*carry on* o *carry out* para «continuar»?", "carry on"),
            ("Nombra dos palabras de redes del texto.", "livestream, engagement, hashtag, influencers, followers, story, viral…"),
            ("Completa: *come up ___* + idea.", "with"),
        ],
    },
    25: {
        "literal_intro": "Completa con la palabra que aparece en el texto.",
        "literal": [
            ("Although Maya felt ___, she joined the workshop.", "nervous"),
            ("She used a ___ in order to capture sharp photos.", "tripod"),
            ("When the boiler broke down, she brought in a ___.", "plumber"),
            ("Later her livestream was ___.", "called off"),
            ("Despite the setbacks, she made ___.", "progress"),
        ],
        "find_intro": "Responde con palabras o frases **copiadas del texto**.",
        "find": [
            ("Copia la frase con *Although*.", "Although Maya felt nervous, she joined the workshop to build resilience."),
            ("Copia el fragmento con *in order to*.", "in order to capture sharp photos"),
            ("Copia el fragmento con *broke down* y *brought in*.", "When the boiler broke down at home, she brought in a plumber"),
            ("Copia el fragmento con *called off* y *came up with*.", "her livestream was called off, but she came up with a story series"),
            ("Copia el fragmento con *Despite*.", "Despite the setbacks"),
        ],
        "form_intro": "Forma, significado y verdadero/falso según el texto.",
        "form": [
            ("True/False: She stopped studying when the boiler broke.", "False — she still carried on studying."),
            ("True/False: Engagement improved thanks to a story series.", "True"),
            ("Lista 4 estructuras del bloque que aparecen en el texto.", "although, in order to, broke down/brought in, called off/came up with, despite…"),
            ("Une unidad → foco: U21 contraste · U22 propósito · U23 casa · U24 redes — ¿cuál va con *tripod / capture*?", "U22 (photography + purpose)"),
            ("Completa: *Despite* + ___.", "sustantivo (*the setbacks*)"),
        ],
    },
}

LISTEN_EX = {
    21: {
        "comp": [
            ("¿Quién habla?", "Maya"),
            ("Aunque estaba cansada, ¿qué hizo?", "Joined the personal development workshop."),
            ("¿Quién la ayudó a salir de su zona de confort?", "Her mentor"),
            ("¿Qué hicieron algunos compañeros?", "They quit early."),
            ("¿Cuál es su próximo *milestone*?", "Building resilience"),
        ],
        "detail": [
            ("Completa: Although I was tired after ___, I joined…", "work"),
            ("Completa: Despite my ___, my mentor helped me.", "doubts"),
            ("Completa: In spite of a busy ___, I made progress.", "schedule"),
            ("Escribe la frase con *whereas* que oyes.", "Whereas some classmates quit early, I stayed until the end."),
            ("Escribe la frase con *However*.", "However, I still need to practise what I learn every day."),
        ],
        "oral": [
            ("Escribe una frase nueva con *although* sobre trabajo o estudio.", "Modelo: Although I was busy, I finished the module."),
            ("Di en voz alta: *resilience, milestone, mentor, comfort zone, growth mindset*.", "Pronunciación libre — revisa la guía teórica."),
            ("Shadowing: imita *Despite my doubts, my mentor helped me…*", "Despite my doubts, my mentor helped me step out of my comfort zone."),
            ("True/False: *Despite* + cláusula (*Despite I was tired*) es correcto.", "False → Despite **being** tired / Although I was tired"),
            ("Abre «Ver solución» solo cuando hayas intentado 11–14.", "✓"),
        ],
    },
    22: {
        "comp": [
            ("¿Quién habla?", "Leo"),
            ("¿Por qué casi llega tarde?", "Because of heavy traffic"),
            ("¿Para qué salió antes?", "In order to reach the rooftop on time"),
            ("¿Qué pasó por una nube?", "A few frames were blurry"),
            ("¿Qué hizo *as a result*?", "Cropped the best shot and posted it to his feed"),
        ],
        "detail": [
            ("Completa: I adjusted the ___ so that the skyline would look sharp.", "exposure"),
            ("Completa: Due to a sudden ___, a few frames were blurry.", "cloud"),
            ("Completa: A clean ___ helped the composition.", "background"),
            ("Escribe el ejemplo con *in order to*.", "I left earlier in order to reach the rooftop on time."),
            ("Escribe el ejemplo con *so that*.", "I adjusted the exposure so that the skyline would look sharp."),
        ],
        "oral": [
            ("Escribe una frase con *because of* sobre el clima o el tráfico.", "Modelo: Because of the rain, we moved indoors."),
            ("Di en voz alta: *exposure, blurry, crop, feed, composition*.", "Pronunciación libre — revisa la guía teórica."),
            ("Shadowing: *As a result, I cropped the best shot…*", "As a result, I cropped the best shot and posted it to my feed."),
            ("True/False: *Due to* + cláusula completa es correcto.", "False → Due to + noun"),
            ("Abre «Ver solución» solo cuando hayas intentado 11–14.", "✓"),
        ],
    },
    23: {
        "comp": [
            ("¿Quién habla?", "Sam"),
            ("¿Qué se averió cuando iba a mudarse?", "The washing machine"),
            ("¿A quién trajo por la tarde?", "A plumber"),
            ("¿Sobre qué casi fracasan las charlas?", "The extension cost"),
            ("¿Qué idea *brought up*?", "An open-plan kitchen"),
        ],
        "detail": [
            ("Completa: I was ___ move in when the machine broke down.", "about to"),
            ("Completa: Talks with the landlord almost ___.", "broke down"),
            ("Completa: A fire scare ___ in the fuse box.", "broke out"),
            ("Completa: …which ___ a full check.", "brought about"),
            ("¿Qué pudo hacer después? (dos acciones)", "settle in and tidy up"),
        ],
        "oral": [
            ("Escribe una frase con *break down* (máquina o negociaciones).", "Modelo: The boiler broke down last night."),
            ("Di en voz alta: *plumber, renovate, open-plan, settle in, tidy up*.", "Pronunciación libre — revisa la guía teórica."),
            ("Shadowing: *I brought in a plumber the same afternoon.*", "I brought in a plumber the same afternoon."),
            ("True/False: *bring up a plumber* es correcto para contratar un experto.", "False → **bring in** a plumber"),
            ("Abre «Ver solución» solo cuando hayas intentado 11–14.", "✓"),
        ],
    },
    24: {
        "comp": [
            ("¿Quién habla?", "Nora"),
            ("¿Qué casi cancelan?", "The livestream"),
            ("¿Qué *carried out*?", "A backup plan"),
            ("¿Qué *came across* mientras hacía scroll?", "A useful format"),
            ("¿Qué *came up with*?", "A hashtag challenge"),
        ],
        "detail": [
            ("Completa: We almost ___ the livestream after a server crash.", "called off"),
            ("Completa: We ___ with shorter stories.", "carried on"),
            ("Completa: The situation ___ calm messaging.", "called for"),
            ("Completa: By Friday the campaign was ___.", "coming along well"),
            ("¿Qué pasó con el *engagement*?", "It went up"),
        ],
        "oral": [
            ("Escribe una frase con *come up with* sobre una campaña.", "Modelo: She came up with a hashtag for the launch."),
            ("Di en voz alta: *followers, engagement, livestream, hashtag, story*.", "Pronunciación libre — revisa la guía teórica."),
            ("Shadowing: *The situation called for calm messaging.*", "The situation called for calm messaging."),
            ("True/False: *carry out posting* significa «continuar publicando».", "False → **carry on** posting"),
            ("Abre «Ver solución» solo cuando hayas intentado 11–14.", "✓"),
        ],
    },
    25: {
        "comp": [
            ("¿Quién habla?", "Eva"),
            ("¿Cómo se sentía al unirse al taller?", "Nervous"),
            ("¿Para qué usó un trípode?", "In order to capture sharp photos"),
            ("¿Qué hizo cuando se averió la caldera?", "Brought in a plumber"),
            ("¿Qué pasó con su livestream?", "It was called off"),
        ],
        "detail": [
            ("Completa: Although I felt ___, I joined the workshop.", "nervous"),
            ("Completa: I ___ a story series.", "came up with"),
            ("Completa: Despite the setbacks, I ___ and made progress.", "carried on"),
            ("¿Qué unidades dice que ya conecta?", "Units twenty-one to twenty-four"),
            ("Lista 3 focos que mezcla el audio.", "although/despite · in order to · broke down/brought in · called off/came up with…"),
        ],
        "oral": [
            ("Escribe 3 frases cortas: 1 contraste, 1 propósito, 1 phrasal de redes.", "Modelo: Although I was tired… / I left early in order to… / We called off the live."),
            ("Di en voz alta 5 palabras mixtas del bloque.", "Ej.: workshop, exposure, plumber, hashtag, resilience"),
            ("Shadowing: *Despite the setbacks, I carried on and made progress.*", "Despite the setbacks, I carried on and made progress."),
            ("True/False: El repaso mezcla solo gramática de U21.", "False — mezcla U21–24"),
            ("Abre «Ver solución» solo cuando hayas intentado 11–14.", "✓"),
        ],
    },
}

WRITE = {
    21: [
        (
            "Escribe **cuatro** frases cortas, una con cada linker: *although* · *despite* · *whereas* · *however*.",
            "Modelos:\n"
            "   - **Although** I was nervous, I spoke in the workshop.\n"
            "   - **Despite** the setbacks, I made progress.\n"
            "   - Morning practice is calm, **whereas** evening sessions feel intense.\n"
            "   - I finished the module. **However**, I still need to review.",
        ),
        ("Completa: ___ she was tired, she stayed.", "**Although**"),
        ("Completa: ___ the setbacks, the workshop went ahead.", "**Despite**"),
        ("Completa: ___ busy weeks, she made progress.", "**In spite of**"),
        ("Completa: Some quit, ___ Maya stayed.", "**whereas**"),
        ("Corrige: *Despite she was tired, she stayed.*", "**Although** she was tired… / **Despite being** tired…"),
        ("Corrige: *Although the doubts, she joined.*", "**Despite** the doubts, she joined."),
        ("Escribe dos frases: una con *milestone* y otra con *mentor*.", "Modelos: Passing unit 20 was a **milestone**. / My **mentor** pushed me kindly."),
        ("Copia y memoriza: *Despite early doubts, a mentor helped her step out of her comfort zone.*", "**Despite early doubts, a mentor helped her step out of her comfort zone.**"),
        (
            "Escribe un mini-diálogo (4–6 líneas) tras un taller de desarrollo personal usando *although* o *however*.",
            "Modelo:\n"
            "   A: Did you enjoy the workshop?\n"
            "   B: **Although** I was tired, yes.\n"
            "   A: Any doubts left?\n"
            "   B: A few. **However**, my mentor helped a lot.",
        ),
        ("Traduce: *Aunque tenía poco tiempo, se apuntó al taller.*", "**Although** she had little time, she signed up for the workshop."),
        ("Traduce: *A pesar de los contratiempos, avanzó.*", "**Despite** the setbacks, she made progress."),
        ("Explica en **una** frase la diferencia entre *although* y *despite*.", "***Although*** + sujeto+verbo; ***despite*** + sustantivo/*-ing*."),
        ("Escribe una frase con *growth mindset* + *despite* o *although*.", "Modelo: **Despite** slow progress, she kept a **growth mindset**."),
        (
            "Autochequeo — marca sí/no:\n"
            "    - ¿Usas *although* con sujeto + verbo?\n"
            "    - ¿Usas *despite / in spite of* con sustantivo o *-ing*?\n"
            "    - ¿Usas *however* al inicio de una oración nueva?\n"
            "    - ¿Usas *whereas* para contraste paralelo?",
            "Las cuatro respuestas deberían ser **sí**.",
        ),
    ],
    22: [
        (
            "Escribe **cinco** frases cortas, una con cada linker: *because of* · *due to* · *in order to* · *so that* · *as a result*.",
            "Modelos:\n"
            "   - **Because of** the traffic, I left earlier.\n"
            "   - **Due to** low light, the shot was blurry.\n"
            "   - I used a tripod **in order to** avoid shake.\n"
            "   - I adjusted exposure **so that** the sky would look sharp.\n"
            "   - I cropped the photo. **As a result**, engagement rose.",
        ),
        ("Completa: ___ heavy traffic, Leo almost arrived late.", "**Because of**"),
        ("Completa: He left earlier ___ reach the rooftop.", "**in order to**"),
        ("Completa: He adjusted exposure ___ the skyline would not look overexposed.", "**so that**"),
        ("Completa: ___ a sudden cloud, a few frames were blurry.", "**Due to**"),
        ("Corrige: *Because of he was late…*", "**Because** he was late… / **Because of** the traffic…"),
        ("Corrige: *She left early in order that arrive on time.*", "She left early **in order to** arrive on time."),
        ("Escribe dos frases: una con *exposure* y otra con *blurry*.", "Modelos: Check the **exposure**. / The photo looks **blurry**."),
        ("Copia y memoriza: *He left earlier in order to reach the rooftop on time.*", "**He left earlier in order to reach the rooftop on time.**"),
        (
            "Mini-diálogo (4–6 líneas) en un tejado / sesión de fotos con *because of* o *in order to*.",
            "Modelo:\n"
            "   A: Why is this shot blurry?\n"
            "   B: **Because of** the low light.\n"
            "   A: Need a tripod?\n"
            "   B: Yes, **in order to** avoid camera shake.",
        ),
        ("Traduce: *A causa del tráfico casi llegó tarde.*", "**Because of** the traffic he almost arrived late."),
        ("Traduce: *Ajustó la exposición para que el cielo no saliera sobreexpuesto.*", "He adjusted the exposure **so that** the sky would not look overexposed."),
        ("Explica en **una** frase la diferencia entre *in order to* y *so that*.", "***In order to*** + infinitivo; ***so that*** + cláusula (sujeto + verbo/modal)."),
        ("Escribe una frase con *as a result* sobre publicar en el *feed*.", "Modelo: She cropped the shot. **As a result**, her **feed** looked cleaner."),
        (
            "Autochequeo — marca sí/no:\n"
            "    - ¿*because of / due to* + sustantivo?\n"
            "    - ¿*in order to* + infinitivo?\n"
            "    - ¿*so that* + cláusula?\n"
            "    - ¿*as a result* = consecuencia?",
            "Las cuatro respuestas deberían ser **sí**.",
        ),
    ],
    23: [
        (
            "Escribe **seis** frases cortas (una con cada phrasal): *be about to* · *break down* · *break in* · *break out* · *bring up* · *bring in*.",
            "Modelos:\n"
            "   - I **was about to** leave when the plumber arrived.\n"
            "   - The boiler **broke down** last winter.\n"
            "   - Thieves **broke in** during the night.\n"
            "   - A fire **broke out** in the kitchen.\n"
            "   - He **brought up** the rent in the meeting.\n"
            "   - They **brought in** an interior designer.",
        ),
        ("Completa: I ___ leave when he arrived. (*be about to*)", "**was about to**"),
        ("Completa: The washing machine ___.", "**broke down**"),
        ("Completa: They ___ a plumber.", "**brought in**"),
        ("Completa: Sam ___ the idea of redecorating.", "**brought up**"),
        ("Corrige: *The boiler broke in yesterday.* (avería)", "The boiler **broke down** yesterday."),
        ("Corrige: *They brought up a plumber.* (contratar)", "They **brought in** a plumber."),
        ("Escribe dos frases: una con *open-plan* y otra con *renovate*.", "Modelos: We want an **open-plan** kitchen. / They will **renovate** next month."),
        ("Copia y memoriza: *When Sam was about to move in, the washing machine broke down.*", "**When Sam was about to move in, the washing machine broke down.**"),
        (
            "Mini-diálogo (4–6 líneas) sobre una avería en casa usando *break down* y *bring in*.",
            "Modelo:\n"
            "   A: What happened?\n"
            "   B: The boiler **broke down**.\n"
            "   A: Did you call someone?\n"
            "   B: Yes, I **brought in** a plumber.",
        ),
        ("Traduce: *Estaba a punto de mudarme cuando se averió la lavadora.*", "I **was about to** move in when the washing machine **broke down**."),
        ("Traduce: *La reforma provocó cambios importantes.*", "The renovation **brought about** major changes."),
        ("Explica en **una** frase la diferencia entre *break down* y *break in*.", "***Break down*** = averiarse/fracasar; ***break in*** = entrar por la fuerza."),
        ("Escribe una frase con *bring about* sobre una reforma.", "Modelo: The extension **brought about** more light in the flat."),
        (
            "Autochequeo — marca sí/no:\n"
            "    - ¿Máquina averiada → *break down*?\n"
            "    - ¿Entrada forzada → *break in*?\n"
            "    - ¿Contratar experto → *bring in*?\n"
            "    - ¿Mencionar tema → *bring up*?",
            "Las cuatro respuestas deberían ser **sí**.",
        ),
    ],
    24: [
        (
            "Escribe **seis** frases cortas: *call off* · *call back* · *call for* · *carry on* · *carry out* · *come up with*.",
            "Modelos:\n"
            "   - They **called off** the livestream.\n"
            "   - Please **call me back** later.\n"
            "   - The crisis **calls for** calm.\n"
            "   - We **carried on** posting.\n"
            "   - They **carried out** a survey.\n"
            "   - She **came up with** a hashtag.",
        ),
        ("Completa: The livestream was ___.", "**called off**"),
        ("Completa: Despite the trolls, we ___ posting.", "**carried on**"),
        ("Completa: I ___ an interesting profile while scrolling.", "**came across**"),
        ("Completa: She ___ a hashtag challenge.", "**came up with**"),
        ("Corrige: *I came up a hashtag yesterday.*", "I **came up with** a hashtag yesterday."),
        ("Corrige: *We carried out posting all week.* (continuar)", "We **carried on** posting all week."),
        ("Escribe dos frases: una con *engagement* y otra con *followers*.", "Modelos: The post boosted **engagement**. / She gained new **followers**."),
        ("Copia y memoriza: *She came up with a hashtag challenge for influencers.*", "**She came up with a hashtag challenge for influencers.**"),
        (
            "Mini-diálogo (4–6 líneas) sobre un live fallido usando *call off* y *carry on*.",
            "Modelo:\n"
            "   A: Did you **call off** the live?\n"
            "   B: Almost — then we **carried on** with stories.\n"
            "   A: Smart.\n"
            "   B: Yes, and engagement recovered.",
        ),
        ("Traduce: *Casi cancelamos el directo tras el fallo del servidor.*", "We almost **called off** the livestream after the server crash."),
        ("Traduce: *Ideó un reto con hashtag.*", "She **came up with** a hashtag challenge."),
        ("Explica en **una** frase la diferencia entre *carry on* y *carry out*.", "***Carry on*** = continuar; ***carry out*** = ejecutar una tarea."),
        ("Escribe una frase con *coming along* sobre una campaña.", "Modelo: How is your campaign **coming along**?"),
        (
            "Autochequeo — marca sí/no:\n"
            "    - ¿Cancelar → *call off*?\n"
            "    - ¿Continuar → *carry on*?\n"
            "    - ¿Idear → *come up with*?\n"
            "    - ¿Encontrar por casualidad → *come across*?",
            "Las cuatro respuestas deberían ser **sí**.",
        ),
    ],
    25: [
        (
            "Escribe **una** frase con cada foco: *although* · *despite* · *in order to* · *break down* · *call off* · *come up with*.",
            "Modelos:\n"
            "   - **Although** I felt nervous, I joined.\n"
            "   - **Despite** the setbacks, I continued.\n"
            "   - I used a tripod **in order to** get sharp photos.\n"
            "   - The boiler **broke down**.\n"
            "   - The live was **called off**.\n"
            "   - I **came up with** a story series.",
        ),
        ("Completa: ___ Maya felt nervous, she joined.", "**Although**"),
        ("Completa: She used a tripod ___ capture sharp photos.", "**in order to**"),
        ("Completa: When the boiler ___, she brought in a plumber.", "**broke down**"),
        ("Completa: Her livestream was ___.", "**called off**"),
        ("Corrige: *Despite she felt nervous…*", "**Although** she felt nervous… / **Despite** her nerves…"),
        ("Corrige: *I came up a story series.*", "I **came up with** a story series."),
        ("Matching mental: U21 contraste · U22 propósito · U23 casa · U24 redes — escribe un ejemplo de cada uno.", "U21 although… · U22 in order to… · U23 broke down… · U24 called off / came up with…"),
        ("Copia y memoriza: *Despite the setbacks, she made progress and stepped further out of her comfort zone.*", "**Despite the setbacks, she made progress and stepped further out of her comfort zone.**"),
        (
            "Mini-historia (6–8 frases) mezclando al menos un linker de contraste, uno de propósito y dos phrasals.",
            "Modelo: Although Maya felt nervous, she joined the workshop. She used a tripod in order to capture sharp photos. "
            "When the boiler broke down, she brought in a plumber. Her livestream was called off, but she came up with a story series. "
            "Despite the setbacks, she carried on and made progress.",
        ),
        ("Traduce: *A pesar de los contratiempos, siguió estudiando.*", "**Despite** the setbacks, she **carried on** studying."),
        ("Traduce: *Cancelaron el directo, pero ideó una serie de stories.*", "They **called off** the livestream, but she **came up with** a story series."),
        ("Explica en **una** frase cuándo eliges *although* frente a *because of*.", "***Although*** = contraste; ***because of*** = causa (+ sustantivo)."),
        ("Escribe una frase mixta con *engagement* + *despite* o *as a result*.", "Modelo: **Despite** the crash, **engagement** recovered. / She posted stories. **As a result**, engagement rose."),
        (
            "Autochequeo del bloque — marca sí/no:\n"
            "    - ¿Distingo *despite* vs *although*?\n"
            "    - ¿Distingo *in order to* vs *so that*?\n"
            "    - ¿Distingo *break down* vs *call off*?\n"
            "    - ¿Uso *come up with* (con *with*)?",
            "Las cuatro respuestas deberían ser **sí**. Si fallas alguna, repasa la teoría U21–24.",
        ),
    ],
}


def details(answer_block: str) -> str:
    return (
        "<details>\n"
        "<summary>Ver solución</summary>\n\n"
        f"{answer_block.strip()}\n\n"
        "</details>"
    )


def render_grammar(u: int) -> str:
    g = GRAM[u]
    a_lines, a_ans = [], []
    for i, (q, opts, sol, comment) in enumerate(g["a"], 1):
        a_lines.append(f"{i}. {q}  \n   {opts}")
        a_ans.append(f"{i}. **{sol}** — {comment}")

    b_lines, b_ans = [], []
    for i, (q, sol, comment) in enumerate(g["b"], 1):
        b_lines.append(f"{i}. {q}")
        b_ans.append(f"{i}. **{sol}** — {comment}")

    c_lines, c_ans = [], []
    for i, (wrong, right, comment) in enumerate(g["c"], 1):
        c_lines.append(f"{i}. {wrong}")
        c_ans.append(f"{i}. {right} — {comment}")

    return f"""## Lección 1 — Gramática

**Objetivo:** usar correctamente {META[u]["focus"]}.

### Ejercicios 1–5 — {g["a_title"]}

{g["a_intro"]}

{chr(10).join(a_lines)}

{details(chr(10).join(a_ans))}

### Ejercicios 6–10 — {g["b_title"]}

{g["b_intro"]}

{chr(10).join(b_lines)}

{details(chr(10).join(b_ans))}

### Ejercicios 11–15 — {g["c_title"]}

{g["c_intro"]}

{chr(10).join(c_lines)}

{details(chr(10).join(c_ans))}
"""


def render_vocab(u: int) -> str:
    v = VOCAB[u]
    a_lines, a_ans = [], []
    for i, (word, opts, sol) in enumerate(v["a"], 1):
        a_lines.append(f"{i}. **{word}** → {opts}")
        a_ans.append(f"{i}. **{sol}**")

    b_lines, b_ans = [], []
    for i, (q, opts, sol) in enumerate(v["b"], 1):
        b_lines.append(f"{i}. {q}  \n   {opts}")
        b_ans.append(f"{i}. **{sol}**")

    c_lines, c_ans = [], []
    for i, (q, sol) in enumerate(v["c"], 11):
        c_lines.append(f"{i}. {q}")
        c_ans.append(f"{i}. **{sol}**")

    return f"""## Lección 2 — Vocabulario

**Objetivo:** vocabulario de *{META[u]["vocab"]}* y su uso en contexto.

### Ejercicios 1–5 — Traduce (elige la palabra correcta)

Cada ítem tiene una palabra en inglés y tres traducciones. Elige la correcta.

{chr(10).join(a_lines)}

{details(" · ".join(a_ans))}

### Ejercicios 6–10 — ¿Qué significa?

Elige el significado en español más cercano.

{chr(10).join(b_lines)}

{details(" · ".join(b_ans))}

### Ejercicios 11–15 — Usa el vocabulario en contexto

Completa con: *{v["c_words"]}*

{chr(10).join(c_lines)}

{details(" · ".join(c_ans))}
"""


def render_reading(u: int) -> str:
    m = META[u]
    rx = READ_EX[u]

    lit_q, lit_a = [], []
    for i, (q, sol) in enumerate(rx["literal"], 1):
        lit_q.append(f"{i}. {q}")
        lit_a.append(f"{i}. **{sol}**")

    find_q, find_a = [], []
    for i, (q, sol) in enumerate(rx["find"], 6):
        find_q.append(f"{i}. {q}")
        find_a.append(f"{i}. **{sol}**")

    form_q, form_a = [], []
    for i, (q, sol) in enumerate(rx["form"], 11):
        form_q.append(f"{i}. {q}")
        form_a.append(f"{i}. **{sol}**")

    return f"""## Lección 3 — Reading: {m["r_title"]}

**Objetivo:** comprender un texto corto con {m["focus"]}.

### Texto y audio

<audio controls preload="none" src="/audio/blog/curso-b2/unit-{u}/reading-workbook.mp3" title="🔊 Reading: {m["r_title"]}"></audio>

Lee el texto (y escucha el audio si quieres). Todas las respuestas de esta lección salen **del texto**.

> {READ[u]}

### Ejercicios 1–5 — Comprensión literal

{rx["literal_intro"]}

{chr(10).join(lit_q)}

{details(" · ".join(lit_a))}

### Ejercicios 6–10 — Busca en el texto

{rx["find_intro"]}

{chr(10).join(find_q)}

{details(chr(10).join(find_a))}

### Ejercicios 11–15 — Forma y significado

{rx["form_intro"]}

{chr(10).join(form_q)}

{details(chr(10).join(form_a))}
"""


def render_listening(u: int) -> str:
    m = META[u]
    lx = LISTEN_EX[u]

    c_q, c_a = [], []
    for i, (q, sol) in enumerate(lx["comp"], 1):
        c_q.append(f"{i}. {q}")
        c_a.append(f"{i}. **{sol}**")

    d_q, d_a = [], []
    for i, (q, sol) in enumerate(lx["detail"], 6):
        d_q.append(f"{i}. {q}")
        d_a.append(f"{i}. **{sol}**")

    o_q, o_a = [], []
    for i, (q, sol) in enumerate(lx["oral"], 11):
        o_q.append(f"{i}. {q}")
        o_a.append(f"{i}. {sol}")

    return f"""## Lección 4 — Listening: {m["l_title"]}

**Objetivo:** identificar {m["focus"]} al escuchar.

### Audio y guion

<audio controls preload="none" src="/audio/blog/curso-b2/unit-{u}/listening-workbook.mp3" title="🔊 Listening: {m["l_title"]}"></audio>

Escucha primero **sin leer**. Luego puedes usar el guion para comprobar.

> {LISTEN[u]}

### Ejercicios 1–5 — Comprensión

{chr(10).join(c_q)}

{details(chr(10).join(c_a))}

### Ejercicios 6–10 — Detalles del audio

{chr(10).join(d_q)}

{details(chr(10).join(d_a))}

### Ejercicios 11–15 — Práctica oral y forma

{chr(10).join(o_q)}

{details(chr(10).join(o_a))}
"""


def render_writing(u: int) -> str:
    items = WRITE[u]
    q_lines, a_lines = [], []
    for i, (q, sol) in enumerate(items, 1):
        q_lines.append(f"{i}. {q}")
        a_lines.append(f"{i}. {sol}")

    return f"""## Lección 5 — Writing

**Objetivo:** producir frases claras con {META[u]["focus"]}.

Escribe tus respuestas. Luego compara con los modelos.

{chr(10).join(q_lines)}

{details(chr(10).join(a_lines))}
"""


def render_unit(u: int) -> str:
    m = META[u]
    kws = "\n".join(
        f"  - {k}"
        for k in [
            f"ejercicios inglés B2 unidad {u}",
            "ejercicios inglés B2 gratis",
            "curso inglés B2 gratis",
            *m["kw"],
        ]
    )

    if u < 25:
        next_line = (
            f"3. Siguiente: [{m['next_title']}](/blog/curso-b2/{m['next_slug']}-ejercicios-soluciones)."
        )
    else:
        next_line = (
            "3. Módulo 3 (U21–25) listo — sigue con [U26 en el curso](/curso-b2/unit-26) "
            "o repasa la [teoría U21](/blog/curso-b2/unidad-21-linkers-contrast-personal-development)."
        )

    return f"""---
category: curso-b2
date: '{DATE}'
updatedDate: '{DATE}'
author: linguafly-team
title: "Ejercicios Unidad {u} B2: {m['title']} (con soluciones)"
description: >-
  Practica todos los ejercicios de la Unidad {u} del curso B2: {m["focus"]};
  {m["vocab"]}, reading, listening y writing. Con soluciones comentadas.
readTime: 25 min
keywords:
{kws}
canonical: 'https://linguafly.app/blog/curso-b2/{m["slug"]}-ejercicios-soluciones'
image: {m["image"]}
alt: "{m['title']} — ejercicios B2 Unidad {u}"
related_routes:
  - {m["slug"]}
  - {m["prev"]}
  - {HUB}
faqs:
  - question: ¿Qué ejercicios incluye la Unidad {u} del curso B2?
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
      En la Unidad {u} del curso B2 de Linguafly: gramática, vocabulario,
      reading, listening, speaking y writing.
excerpt: >-
  Cuaderno de ejercicios de la Unidad {u} B2 ({m["title"]}) con soluciones.
---

Este artículo reúne **los ejercicios de la Unidad {u} del curso B2** (*{m["full"]}*) con **soluciones comentadas**.

> **Guía teórica:** [{m["title"]} B2](/blog/curso-b2/{m["slug"]})  
> **Practica en el curso:** [Unidad {u} — {m["title"]}](/curso-b2/unit-{u})

Haz cada bloque **sin mirar** la solución. Luego comprueba y lee la explicación.

**Recuerda antes de empezar:**
{m["remember"]}

![{m["title"]}]({m["image"]})

**Contenido de la unidad:**
1. [Lección 1 — Gramática](#leccion-1--gramatica)
2. [Lección 2 — Vocabulario](#leccion-2--vocabulario)
3. [Lección 3 — Reading: {m["r_title"]}](#leccion-3--reading)
4. [Lección 4 — Listening: {m["l_title"]}](#leccion-4--listening)
5. [Lección 5 — Writing](#leccion-5--writing)

---

{render_grammar(u)}
---

{render_vocab(u)}
---

{render_reading(u)}
---

{render_listening(u)}
---

{render_writing(u)}
---

## Cómo seguir

1. Repasa fallos en la [guía teórica](/blog/curso-b2/{m["slug"]}).  
2. Practica en la [Unidad {u} del curso B2](/curso-b2/unit-{u}).  
{next_line}

Guías relacionadas:

- [Teoría Unidad {u}](/blog/curso-b2/{m["slug"]})
- [Cuaderno anterior](/blog/curso-b2/{m["prev"]})
- [Inglés B2](/blog/metodos/{HUB})

---

*Cuaderno alineado con la Unidad {u} del [curso B2 de Linguafly](/curso-b2).*
"""


def make_audios() -> None:
    for u in range(21, 26):
        d = ROOT / f"public/audio/blog/curso-b2/unit-{u}"
        d.mkdir(parents=True, exist_ok=True)
        for name, text in (("reading-workbook", READ[u]), ("listening-workbook", LISTEN[u])):
            path = d / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for u in range(21, 26):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        words = len(path.read_text(encoding="utf-8").split())
        print("wrote", path.relative_to(ROOT), "words", words)
    make_audios()
    print("done B2 U21–25 workbooks")


if __name__ == "__main__":
    main()
