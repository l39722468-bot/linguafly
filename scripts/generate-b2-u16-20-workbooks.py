#!/usr/bin/env python3
"""Generate B2 Units 16–20 exercise workbooks (ejercicios-soluciones) + TTS.

Head commercial Bing keywords stay on hub /blog/temas/curso-ingles only.
Aligns with theory U16–20 (passive, modal passive, so/such, comparatives, review).
"""
from pathlib import Path

from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/content/blog/curso-b2"
DATE = "2026-08-31"
HUB = "ingles-b2"

LISTEN = {
    16: "Hi, I am Nora. Ancient monuments are visited by thousands every year. The castle was built in the twelfth century. The historic site is being restored right now. The fresco has been unveiled before the ceremony. The artefacts had already been moved when we arrived. Heritage needs careful protection.",
    17: "Hi, I am Leo. All climbing gear must be tested before the expedition. The safety report should have been published earlier. I am having my parachute serviced next week. She had her wetsuit repaired yesterday. Harnesses must be inspected before each climb. Adventure is safer when equipment is checked by professionals.",
    18: "Hi, I am Mia. The cake was so delicious that we could not stop eating. It was such a great cooking class that we signed up again. The soup was too hot to eat immediately. We do not have enough time to finish the recipe. There were so many ingredients that we almost got lost. He is experienced enough to run a professional kitchen.",
    19: "Hi, I am Sam. The more you read, the better you write. This is by far the best novel we have ever read. This edition is much more expensive than the paperback. The longer we waited for the sequel, the more excited we became. She reads far faster than last year. The new translation is slightly better.",
    20: "Hi, I am Eva. The historic site is being restored right now. Climbing gear must be tested before we leave. I am having my parachute serviced next week. It was such a great cooking class that we signed up again. The more you read, the better you write. After units sixteen to nineteen, I feel ready for linkers.",
}

READ = {
    16: "Nora visited an archive last spring. Ancient monuments are visited by thousands of tourists every year. The castle was built in the twelfth century and still dominates the skyline. The historic site is being restored right now, so the main gate is closed. The fresco has been unveiled before the ceremony. The artefacts had already been moved when the historians arrived. Cultural heritage and tradition still matter in this community.",
    17: "Leo prepares for extreme sports carefully. All climbing gear must be tested before the expedition. The safety report should have been published earlier — the team lost valuable time. He is having his parachute serviced next week. She had her wetsuit repaired yesterday after a long dive. Harnesses must be inspected before each climb. Base camp is cleaned every day for safety.",
    18: "Mia loves cooking classes. The cake was so delicious that nobody could stop eating. It was such a great cooking class that the students signed up for more. The soup was too hot to eat immediately. They do not have enough time to finish the recipe before dinner. There were so many ingredients that the kitchen felt crowded. The chef is experienced enough to run a professional kitchen.",
    19: "Sam runs a book club. The more members read, the better they write reviews. This is by far the best novel the club has ever chosen. The hardback edition is much more expensive than the paperback. The longer they waited for the sequel, the more excited they became. She reads far faster than she did last year. The new translation is slightly better than the old one.",
    20: "Eva is reviewing Units 16 to 19. The historic site is being restored this month. Climbing gear must be tested and she is having her ropes checked. It was such a great cooking class that she signed up again. The more she reads, the better she writes. By far the best tip she heard was to practise every structure in short paragraphs. Module 2 is almost complete.",
}

META = {
    16: dict(
        slug="unidad-16-passive-all-tenses-heritage",
        title="Passive & Heritage",
        full="Passive Voice (All Tenses) + History & Heritage",
        focus="passive in all tenses: is/was/is being/has been/had been/will be + V3",
        vocab="history & heritage",
        image="/blog/curso-b2/unit-16/passive-all-tenses.png",
        prev="unidad-15-repaso-11-14-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-17-modal-passive-adventure",
        r_title="Nora at the archive",
        l_title="Nora on heritage",
        kw=["passive all tenses ejercicios B2", "voz pasiva práctica B2", "heritage vocabulary B2"],
    ),
    17: dict(
        slug="unidad-17-modal-passive-adventure",
        title="Modal passive & Adventure",
        full="Modal Passive & Have Something Done + Adventure",
        focus="must/should be + V3; should have been + V3; have/get + object + V3",
        vocab="adventure & extreme sports",
        image="/blog/curso-b2/unit-17/modal-passive-have-done.png",
        prev="unidad-16-passive-all-tenses-heritage-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-18-so-such-too-enough-food",
        r_title="Leo before the climb",
        l_title="Leo on gear safety",
        kw=["modal passive ejercicios B2", "have something done practice", "adventure vocabulary B2"],
    ),
    18: dict(
        slug="unidad-18-so-such-too-enough-food",
        title="So such too enough",
        full="So, Such, Too, Enough + Cooking & Recipes",
        focus="so / such / too / enough contrasts",
        vocab="cooking & recipes",
        image="/blog/curso-b2/unit-18/so-such-too-enough.png",
        prev="unidad-17-modal-passive-adventure-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-19-advanced-comparatives-literature",
        r_title="Mia in the kitchen",
        l_title="Mia on cooking",
        kw=["so such too enough ejercicios", "so vs such B2", "cooking vocabulary B2"],
    ),
    19: dict(
        slug="unidad-19-advanced-comparatives-literature",
        title="Advanced comparatives",
        full="Advanced Comparatives & Superlatives + Literature",
        focus="the… the…; much/far/slightly + comparative; by far + superlative",
        vocab="literature & books",
        image="/blog/curso-b2/unit-19/advanced-comparatives.png",
        prev="unidad-18-so-such-too-enough-food-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-20-repaso-16-19",
        r_title="Sam's book club",
        l_title="Sam on reading",
        kw=["advanced comparatives ejercicios B2", "the more the more practice", "literature vocabulary B2"],
    ),
    20: dict(
        slug="unidad-20-repaso-16-19",
        title="Repaso 16–19",
        full="Repaso B2 Unidades 16–19",
        focus="passive all tenses, modal passive, have something done, so/such/too/enough, advanced comparatives",
        vocab="heritage, adventure, cooking, literature (mix)",
        image="/blog/curso-b2/unit-20/review-map.png",
        prev="unidad-19-advanced-comparatives-literature-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-16-passive-all-tenses-heritage",
        r_title="Eva's module review",
        l_title="Eva mixes U16–19",
        kw=["repaso B2 unidades 16-19", "passive so such comparatives review", "integración módulo 2 B2"],
    ),
}

GRAM = {
    16: {
        "a": [
            ("Ancient monuments ___ every year. (present)", "are visited / visit / is visiting", "are visited"),
            ("The castle ___ in the twelfth century. (past)", "was built / built / is built", "was built"),
            ("The site ___ right now. (present continuous)", "is being restored / is restored / restores", "is being restored"),
            ("The fresco ___ already. (present perfect)", "has been unveiled / unveiled / is unveiling", "has been unveiled"),
            ("The artefacts ___ when we arrived. (past perfect)", "had been moved / were moved / move", "had been moved"),
        ],
        "b": [
            ("Future: The ruins ___ by 2030.", "will be excavated / excavate / are excavating", "will be excavated"),
            ("Future perfect: It ___ by next month.", "will have been opened / will open / opened", "will have been opened"),
            ("Past continuous: It ___ when the fire started.", "was being digitised / digitised / is digitised", "was being digitised"),
            ("Passive = ___ + past participle.", "be / have / do", "be"),
            ("Use *by* when the ___ matters.", "agent / adjective / adverb", "agent"),
        ],
        "c": [
            ("*The castle built in 1200.* (add be)", "The castle **was built** in 1200."),
            ("*The site is restore right now.*", "The site **is being restored** right now."),
            ("*The fresco have been unveiled.*", "The fresco **has been unveiled**."),
            ("*Monuments is visited every year.*", "Monuments **are visited** every year."),
            ("*The artefacts had moved already.* (passive)", "The artefacts **had been moved** already."),
        ],
    },
    17: {
        "a": [
            ("Gear ___ before the climb. (obligation)", "must be tested / must test / must testing", "must be tested"),
            ("The report ___ earlier. (past criticism)", "should have been published / should publish / should be publish", "should have been published"),
            ("I ___ my parachute ___ next week.", "am having / serviced · have / service · am having / service", "am having / serviced"),
            ("She ___ her wetsuit ___ yesterday.", "had / repaired · has / repair · had / repair", "had / repaired"),
            ("Harnesses ___ before each climb.", "must be inspected / must inspect / must inspecting", "must be inspected"),
        ],
        "b": [
            ("Modal passive = modal + ___ + V3.", "be / have / to", "be"),
            ("Should have been + V3 = criticism about the ___.", "past / future / weather", "past"),
            ("Have something done = someone does it ___ you.", "for / against / without", "for"),
            ("He ___ his ropes checked every six months.", "has / have / having", "has"),
            ("They ___ their kayak repaired at the moment.", "are having / have / had", "are having"),
        ],
        "c": [
            ("*Gear must tested before the climb.*", "Gear **must be tested** before the climb."),
            ("*The report should have published earlier.*", "The report **should have been published** earlier."),
            ("*I am having my parachute service.*", "I am having my parachute **serviced**."),
            ("*She had repaired her wetsuit.* (causative)", "She **had** her wetsuit **repaired**."),
            ("*Harnesses must inspect before climbs.*", "Harnesses **must be inspected** before climbs."),
        ],
    },
    18: {
        "a": [
            ("The cake was ___ delicious that we couldn't stop.", "so / such / too", "so"),
            ("It was ___ a great class that we signed up again.", "such / so / too", "such"),
            ("The soup was ___ hot to eat.", "too / so / enough", "too"),
            ("We don't have ___ time to finish.", "enough / too / such", "enough"),
            ("He is experienced ___ to run a kitchen.", "enough / too / so", "enough"),
        ],
        "b": [
            ("So + ___ (+ that).", "adjective/adverb / noun only", "adjective/adverb"),
            ("Such (+ a) + ___.", "noun / adjective alone", "noun"),
            ("Too + adj + ___.", "to-infinitive / that only", "to-infinitive"),
            ("Enough goes ___ a noun.", "before / after", "before"),
            ("Enough goes ___ an adjective.", "after / before", "after"),
        ],
        "c": [
            ("*It was so a great class.*", "It was **such** a great class."),
            ("*The cake was such delicious.*", "The cake was **so** delicious."),
            ("*The soup was too hot that we waited.* (use to)", "The soup was too hot **to** eat / we waited because…"),
            ("*We have time enough?* (noun)", "We have **enough time**."),
            ("*He is enough experienced.*", "He is experienced **enough**."),
        ],
    },
    19: {
        "a": [
            ("___ more you read, ___ better you write.", "The / the · More / more · The / more", "The / the"),
            ("This is ___ the best novel.", "by far / far / more", "by far"),
            ("This edition is ___ more expensive.", "much / more / the most", "much"),
            ("The new version is ___ better.", "slightly / by far / the", "slightly"),
            ("She reads ___ faster than last year.", "far / by far / the", "far"),
        ],
        "b": [
            ("The… the… needs two ___.", "comparatives / superlatives", "comparatives"),
            ("By far usually modifies a ___.", "superlative / noun only", "superlative"),
            ("Much / far / a lot intensify a ___.", "comparative / article", "comparative"),
            ("Slightly / a bit = ___ difference.", "small / huge", "small"),
            ("The longer we waited, the ___ excited we became.", "more / most / much", "more"),
        ],
        "c": [
            ("*More you read, better you write.*", "**The** more you read, **the** better you write."),
            ("*This is far the best novel.*", "This is **by far** the best novel."),
            ("*It is more much expensive.*", "It is **much more** expensive."),
            ("*She is by far faster than me.* (comparative)", "She is **far / much** faster than me."),
            ("*The harder you work, better the draft.*", "The harder you work, **the** better the draft."),
        ],
    },
    20: {
        "a": [
            ("The site ___ right now. (continuous passive)", "is being restored / is restored / restores", "is being restored"),
            ("Gear ___ before the climb. (modal passive)", "must be tested / must test / must testing", "must be tested"),
            ("I ___ my parachute ___ next week.", "am having / serviced · have / service", "am having / serviced"),
            ("It was ___ a great class that we signed up.", "such / so / too", "such"),
            ("___ more you read, ___ better you write.", "The / the · More / more", "The / the"),
        ],
        "b": [
            ("Has been + V3 = ___ passive.", "present perfect / past simple", "present perfect"),
            ("Should have been + V3 = ___ about the past.", "criticism / permission", "criticism"),
            ("Too + adj + to = ___.", "excess / sufficiency", "excess"),
            ("By far + ___", "superlative / comparative only", "superlative"),
            ("Have something done = action done ___ you.", "for / by yourself only", "for"),
        ],
        "c": [
            ("*The site is restore now.*", "The site **is being restored** now."),
            ("*Gear must tested.*", "Gear **must be tested**."),
            ("*I am having my parachute service.*", "I am having my parachute **serviced**."),
            ("*It was so a great class.*", "It was **such** a great class."),
            ("*More you read, better you write.*", "**The** more you read, **the** better you write."),
        ],
    },
}

VOCAB = {
    16: {
        "a": [
            ("heritage", "patrimonio · kayak · soufflé", "patrimonio"),
            ("ruins", "ruinas · harness · paperback", "ruinas"),
            ("landmark", "monumento · recipe · sequel", "monumento"),
            ("manuscript", "manuscrito · wetsuit · batter", "manuscrito"),
            ("artefact", "artefacto · rope · draft", "artefacto"),
        ],
        "b": [
            ("restore ≈ ___", "restaurar / hervir / escalar", "restaurar"),
            ("excavate ≈ ___", "excavar / sazonar / reseñar", "excavar"),
            ("archive ≈ ___", "archivo / arnés / secuela", "archivo"),
            ("fresco ≈ ___", "fresco (pintura) / masa / crítica", "fresco (pintura)"),
            ("century ≈ ___", "siglo / porción / trama", "siglo"),
        ],
    },
    17: {
        "a": [
            ("harness", "arnés · fresco · paperback", "arnés"),
            ("parachute", "paracaídas · mural · dough", "paracaídas"),
            ("wetsuit", "traje de neopreno · archive · plot", "traje de neopreno"),
            ("expedition", "expedición · recipe · edition", "expedición"),
            ("rope", "cuerda · soufflé · critique", "cuerda"),
        ],
        "b": [
            ("gear ≈ ___", "equipo / harina / novela", "equipo"),
            ("base camp ≈ ___", "campamento base / archivo / reseña", "campamento base"),
            ("inspector ≈ ___", "inspector / chef / autor", "inspector"),
            ("kayak ≈ ___", "kayak / fresco / capítulo", "kayak"),
            ("climb ≈ ___", "escalada / sazonar / traducir", "escalada"),
        ],
    },
    18: {
        "a": [
            ("recipe", "receta · ruins · harness", "receta"),
            ("ingredient", "ingrediente · manuscript · rope", "ingrediente"),
            ("simmer", "hervir a fuego lento · excavate · climb", "hervir a fuego lento"),
            ("whisk", "batir · restore · inspect", "batir"),
            ("garnish", "decorar (plato) · archive · sequel", "decorar (plato)"),
        ],
        "b": [
            ("dough ≈ ___", "masa / arnés / ruinas", "masa"),
            ("batter ≈ ___", "rebozado / fresco / cuerda", "rebozado"),
            ("soufflé ≈ ___", "soufflé / kayak / siglo", "soufflé"),
            ("season ≈ ___", "sazonar / excavar / reseñar", "sazonar"),
            ("portion ≈ ___", "porción / expediente / trama", "porción"),
        ],
    },
    19: {
        "a": [
            ("novel", "novela · harness · simmer", "novela"),
            ("paperback", "edición de bolsillo · ruins · whisk", "edición de bolsillo"),
            ("sequel", "secuela · recipe · rope", "secuela"),
            ("draft", "borrador · parachute · dough", "borrador"),
            ("shortlist", "lista finalista · archive · garnish", "lista finalista"),
        ],
        "b": [
            ("review ≈ ___", "reseña / arnés / masa", "reseña"),
            ("critique ≈ ___", "crítica / kayak / porción", "crítica"),
            ("plot ≈ ___", "trama / fresco / simmer", "trama"),
            ("edition ≈ ___", "edición / cuerda / whisk", "edición"),
            ("translation ≈ ___", "traducción / expedition / batter", "traducción"),
        ],
    },
    20: {
        "a": [
            ("passive voice", "voz pasiva · recipe · sequel", "voz pasiva"),
            ("modal passive", "pasiva modal · dough · draft", "pasiva modal"),
            ("have something done", "hacer que te hagan algo · whisk · plot", "hacer que te hagan algo"),
            ("so / such", "tan / tal · rope · ruins", "tan / tal"),
            ("the more… the more", "cuanto más… más · kayak · batter", "cuanto más… más"),
        ],
        "b": [
            ("by far ≈ ___", "con diferencia / opcional / pasivo", "con diferencia"),
            ("heritage ≈ ___", "patrimonio / arnés / soufflé", "patrimonio"),
            ("enough ≈ ___", "suficiente / demasiada / tal", "suficiente"),
            ("too ≈ ___", "demasiado / suficiente / cuanto más", "demasiado"),
            ("comparative intensifier ≈ ___", "much/far / that / be", "much/far"),
        ],
    },
}

READ_Q = {
    16: [
        ("Who visited an archive?", "Nora", "Nora / Leo / Mia"),
        ("Monuments ___ every year", "are visited", "are visited / visit"),
        ("Castle ___ in the twelfth century", "was built", "was built / built"),
        ("Site ___ right now", "is being restored", "is being restored / is restored"),
        ("Fresco ___ before the ceremony", "has been unveiled", "has been unveiled / unveiled"),
        ("Artefacts ___ when historians arrived", "had already been moved", "had already been moved / moved"),
        ("Main gate is ___", "closed", "closed / open"),
        ("Heritage and ___ still matter", "tradition", "tradition / kayak"),
        ("Passive needs form of ___", "be", "be / have only"),
        ("Spring visit?", "True", "True / False"),
        ("Underline 2 passive forms.", "See text", "(open)"),
        ("Write one continuous passive.", "Model OK", "(open)"),
        ("Key vocab?", "heritage, fresco, artefact", "yes / none"),
        ("Tone?", "informative", "informative / angry"),
        ("Course link", "/curso-b2/unit-16", "/curso-b2/unit-16"),
    ],
    17: [
        ("Who prepares for extreme sports?", "Leo", "Leo / Nora / Sam"),
        ("Gear ___ before the expedition", "must be tested", "must be tested / must test"),
        ("Report ___ earlier", "should have been published", "should have been published / should publish"),
        ("Having parachute ___ next week", "serviced", "serviced / service"),
        ("Had wetsuit ___ yesterday", "repaired", "repaired / repair"),
        ("Harnesses ___ before each climb", "must be inspected", "must be inspected / must inspect"),
        ("Lost valuable ___", "time", "time / money only"),
        ("Base camp cleaned ___", "every day", "every day / never"),
        ("Causative structure?", "have + object + V3", "have + object + V3 / must + V1"),
        ("Dive mentioned?", "True", "True / False"),
        ("One modal passive from text.", "Open", "(open)"),
        ("One have something done.", "Open", "(open)"),
        ("Key vocab?", "harness, parachute, expedition", "yes / none"),
        ("Tone?", "careful / safety", "careful / joking"),
        ("Course", "/curso-b2/unit-17", "/curso-b2/unit-17"),
    ],
    18: [
        ("Who loves cooking classes?", "Mia", "Mia / Eva / Leo"),
        ("Cake was ___ delicious that…", "so", "so / such"),
        ("___ a great cooking class", "such", "such / so"),
        ("Soup was ___ hot to eat", "too", "too / enough"),
        ("Don't have ___ time", "enough", "enough / too"),
        ("So ___ ingredients", "many", "many / much"),
        ("Experienced ___ to run a kitchen", "enough", "enough / too"),
        ("Kitchen felt ___", "crowded", "crowded / empty"),
        ("Signed up for ___", "more", "more / less"),
        ("Before dinner deadline?", "True", "True / False"),
        ("One so…that sentence.", "Open", "(open)"),
        ("One too…to sentence.", "Open", "(open)"),
        ("Key vocab?", "recipe, ingredient, soufflé", "yes / none"),
        ("Tone?", "enthusiastic", "enthusiastic / sad"),
        ("Course", "/curso-b2/unit-18", "/curso-b2/unit-18"),
    ],
    19: [
        ("Who runs a book club?", "Sam", "Sam / Mia / Nora"),
        ("The more… the better they ___", "write", "write / cook"),
        ("By far the ___ novel", "best", "best / better"),
        ("Hardback ___ more expensive", "much", "much / by far"),
        ("Than the ___", "paperback", "paperback / harness"),
        ("The longer… the ___ excited", "more", "more / most"),
        ("Reads ___ faster", "far", "far / by far"),
        ("Translation is ___ better", "slightly", "slightly / by far"),
        ("Two comparatives in the…the…?", "True", "True / False"),
        ("Club chose a novel?", "True", "True / False"),
        ("Write one the…the… sentence.", "Open", "(open)"),
        ("Write one by far sentence.", "Open", "(open)"),
        ("Key vocab?", "novel, sequel, paperback", "yes / none"),
        ("Tone?", "bookish / positive", "bookish / angry"),
        ("Course", "/curso-b2/unit-19", "/curso-b2/unit-19"),
    ],
    20: [
        ("Who is reviewing U16–19?", "Eva", "Eva / Sam / Leo"),
        ("Site is being ___", "restored", "restored / cooked"),
        ("Gear must be ___", "tested", "tested / written"),
        ("Having ropes ___", "checked", "checked / check"),
        ("Such a great ___ class", "cooking", "cooking / climbing only"),
        ("The more she reads, the better she ___", "writes", "writes / climbs"),
        ("By far the best ___", "tip", "tip / soup"),
        ("Module 2 almost ___", "complete", "complete / started"),
        ("Mix of four grammar blocks?", "True", "True / False"),
        ("Units sixteen to nineteen?", "True", "True / False"),
        ("List 4 structures from text.", "Open", "(open)"),
        ("Write a 4-line mix.", "Open", "(open)"),
        ("Key idea?", "integrated review", "yes / none"),
        ("Feeling?", "ready", "ready / lost"),
        ("Course", "/curso-b2/unit-20", "/curso-b2/unit-20"),
    ],
}

LISTEN_Q = {
    16: [
        ("Who speaks?", "Nora", "Nora / Leo / Mia"),
        ("Monuments are ___ every year", "visited", "visited / visiting"),
        ("Castle was ___ in the twelfth century", "built", "built / building"),
        ("Site is being ___", "restored", "restored / restoring"),
        ("Fresco has been ___", "unveiled", "unveiled / painted only"),
        ("Artefacts had already been ___", "moved", "moved / sold"),
        ("Heritage needs careful ___", "protection", "protection / baking"),
        ("Passive across several ___", "tenses", "tenses / sports"),
        ("Ceremony mentioned?", "True", "True / False"),
        ("Arrived after artefacts moved?", "True", "True / False"),
        ("Note one present passive.", "Open", "(open)"),
        ("Note one perfect passive.", "Open", "(open)"),
        ("Shadow one sentence.", "Practice", "(open)"),
        ("Vocab heard?", "monument, fresco, artefact", "yes / none"),
        ("Course", "/curso-b2/unit-16", "/curso-b2/unit-16"),
    ],
    17: [
        ("Who speaks?", "Leo", "Leo / Nora / Sam"),
        ("Gear must be ___", "tested", "tested / tasting"),
        ("Report should have been ___", "published", "published / cooked"),
        ("Having parachute ___", "serviced", "serviced / service"),
        ("Had wetsuit ___", "repaired", "repaired / repair"),
        ("Harnesses must be ___", "inspected", "inspected / invented"),
        ("Safer when checked by ___", "professionals", "professionals / tourists"),
        ("Before the ___", "expedition", "expedition / novel"),
        ("Modal + be + V3?", "True", "True / False"),
        ("Causative mentioned?", "True", "True / False"),
        ("One must be sentence.", "Open", "(open)"),
        ("One have something done.", "Open", "(open)"),
        ("Shadow should have been line.", "Practice", "(open)"),
        ("Vocab?", "gear, parachute, harness", "yes / none"),
        ("Course", "/curso-b2/unit-17", "/curso-b2/unit-17"),
    ],
    18: [
        ("Who speaks?", "Mia", "Mia / Eva / Chris"),
        ("Cake so ___ that…", "delicious", "delicious / boring"),
        ("Such a great ___ class", "cooking", "cooking / climbing"),
        ("Soup too ___ to eat", "hot", "hot / cold"),
        ("Not enough ___", "time", "time / salt only"),
        ("So many ___", "ingredients", "ingredients / novels"),
        ("Experienced enough to run a ___", "kitchen", "kitchen / archive"),
        ("Couldn't stop ___", "eating", "eating / reading"),
        ("Signed up again?", "True", "True / False"),
        ("Professional kitchen?", "True", "True / False"),
        ("One so…that.", "Open", "(open)"),
        ("One enough sentence.", "Open", "(open)"),
        ("Shadow too…to line.", "Practice", "(open)"),
        ("Vocab?", "recipe, ingredient, kitchen", "yes / none"),
        ("Course", "/curso-b2/unit-18", "/curso-b2/unit-18"),
    ],
    19: [
        ("Who speaks?", "Sam", "Sam / Mia / Leo"),
        ("The more you read, the better you ___", "write", "write / climb"),
        ("By far the ___ novel", "best", "best / better"),
        ("Much more ___ than paperback", "expensive", "expensive / cheap"),
        ("The longer… the more ___", "excited", "excited / bored"),
        ("Far ___ than last year", "faster", "faster / slower"),
        ("Slightly ___", "better", "better / worse only"),
        ("Sequel wait mentioned?", "True", "True / False"),
        ("Translation mentioned?", "True", "True / False"),
        ("Two-part the…the…?", "True", "True / False"),
        ("Write one the…the… from audio.", "Open", "(open)"),
        ("Write one intensifier + comparative.", "Open", "(open)"),
        ("Shadow by far line.", "Practice", "(open)"),
        ("Vocab?", "novel, paperback, sequel", "yes / none"),
        ("Course", "/curso-b2/unit-19", "/curso-b2/unit-19"),
    ],
    20: [
        ("Who speaks?", "Eva", "Eva / Nora / Sam"),
        ("Site is being ___", "restored", "restored / baked"),
        ("Gear must be ___", "tested", "tested / written"),
        ("Having parachute ___", "serviced", "serviced / service"),
        ("Such a great ___ class", "cooking", "cooking / history only"),
        ("The more… the better you ___", "write", "write / jump"),
        ("Ready for ___", "linkers", "linkers / A1"),
        ("Units sixteen to ___", "nineteen", "nineteen / eleven"),
        ("Four grammar areas mixed?", "True", "True / False"),
        ("Feeling ready?", "True", "True / False"),
        ("List structures heard.", "Open", "(open)"),
        ("Write a 3-line mix.", "Open", "(open)"),
        ("Shadow one sentence.", "Practice", "(open)"),
        ("Next focus?", "linkers", "linkers / articles only"),
        ("Course", "/curso-b2/unit-20", "/curso-b2/unit-20"),
    ],
}

WRITE = {
    16: (
        [
            "Escribe 1 pasiva en presente, pasado, continuous, present perfect y future.",
            "Completa: Monuments ___ (visit) every year.",
            "Completa: The castle ___ (build) in 1200.",
            "Completa: The site ___ (restore) right now.",
            "Completa: The fresco ___ (unveil) already.",
            "Explica qué cambia entre tiempos en la pasiva.",
            "Corrige: *The castle built in 1200.*",
            "Corrige: *The site is restore now.*",
            "Párrafo heritage con 4 pasivas distintas.",
            "Traduce: El manuscrito ha sido restaurado.",
            "Traduce: Las ruinas serán excavadas.",
            "Diálogo en un museo / archivo.",
            "Matching: tiempo → forma de be.",
            "Autochequeo: ¿solo cambia be?",
            "Enlace teoría U16.",
        ],
        [
            "Open — one of each tense.",
            "**are visited**",
            "**was built**",
            "**is being restored**",
            "**has been unveiled**",
            "Solo cambia **be**; el past participle se mantiene.",
            "The castle **was built** in 1200.",
            "The site **is being restored** now.",
            "Open heritage paragraph.",
            "The manuscript **has been restored**.",
            "The ruins **will be excavated**.",
            "Open dialogue.",
            "present→is/are; cont→being; perfect→has been; future→will be.",
            "Yes — conjugate **be** only.",
            "[Guía U16](/blog/curso-b2/unidad-16-passive-all-tenses-heritage)",
        ],
    ),
    17: (
        [
            "Escribe must be, should be, should have been y have something done (1–2 cada uno).",
            "Completa: Gear ___ (must / test) before the climb.",
            "Completa: The report ___ (should / publish) earlier.",
            "Completa: I ___ my parachute ___ next week. (have / service)",
            "Completa: She ___ her wetsuit ___ yesterday. (have / repair)",
            "Explica modal passive vs have something done.",
            "Corrige: *Gear must tested.*",
            "Corrige: *I am having my parachute service.*",
            "Párrafo adventure con ambas estructuras.",
            "Traduce: Hay que inspeccionar los arneses.",
            "Traduce: Me están revisando el paracaídas.",
            "Diálogo en el campamento base.",
            "Matching: should have been → uso.",
            "Autochequeo: object + V3 en causative.",
            "Enlace teoría U17.",
        ],
        [
            "Open — examples of each.",
            "**must be tested**",
            "**should have been published**",
            "**am having / serviced**",
            "**had / repaired**",
            "Modal passive = obligación impersonal; have sth done = encargas a otro.",
            "Gear **must be tested**.",
            "I am having my parachute **serviced**.",
            "Open paragraph.",
            "Harnesses **must be inspected**.",
            "I **am having** my parachute **serviced**.",
            "Open dialogue.",
            "should have been = crítica del pasado.",
            "Self-check: object before V3.",
            "[Guía U17](/blog/curso-b2/unidad-17-modal-passive-adventure)",
        ],
    ),
    18: (
        [
            "Escribe so, such, too y enough (2 cada uno).",
            "Completa: The cake was ___ delicious that…",
            "Completa: It was ___ a great class that…",
            "Completa: The soup was ___ hot to eat.",
            "Completa: We don't have ___ time.",
            "Explica so vs such en 1 frase.",
            "Corrige: *It was so a great class.*",
            "Corrige: *He is enough experienced.*",
            "Párrafo cooking con so/such/too/enough.",
            "Traduce: Había tantos ingredientes que…",
            "Traduce: No estoy lo bastante hábil para…",
            "Diálogo en una clase de cocina.",
            "Matching: too/enough → significado.",
            "Autochequeo posición de enough.",
            "Enlace teoría U18.",
        ],
        [
            "Open — two of each.",
            "**so**",
            "**such**",
            "**too**",
            "**enough**",
            "So + adj; such (+ a) + noun.",
            "It was **such** a great class.",
            "He is experienced **enough**.",
            "Open paragraph.",
            "There were **so many** ingredients that…",
            "I'm not skilled **enough** to…",
            "Open dialogue.",
            "too = excess; enough = sufficiency.",
            "enough + N; adj + enough.",
            "[Guía U18](/blog/curso-b2/unidad-18-so-such-too-enough-food)",
        ],
    ),
    19: (
        [
            "Escribe the…the…, by far, much/far + comp. y slightly + comp.",
            "Completa: ___ more you read, ___ better you write.",
            "Completa: This is ___ the best novel.",
            "Completa: This edition is ___ more expensive.",
            "Completa: The translation is ___ better.",
            "Explica by far vs far.",
            "Corrige: *More you read, better you write.*",
            "Corrige: *This is far the best book.*",
            "Párrafo literature con comparativos avanzados.",
            "Traduce: Cuanto más lees, mejor escribes.",
            "Traduce: Es, con diferencia, la mejor novela.",
            "Diálogo en un club de lectura.",
            "Matching: intensifier → uso.",
            "Autochequeo: dos comparativos en the…the…",
            "Enlace teoría U19.",
        ],
        [
            "Open — one of each pattern.",
            "**The / the**",
            "**by far**",
            "**much**",
            "**slightly**",
            "By far + superlative; far/much + comparative.",
            "**The** more you read, **the** better you write.",
            "This is **by far** the best book.",
            "Open paragraph.",
            "The more you read, the better you write.",
            "It is **by far** the best novel.",
            "Open dialogue.",
            "much/far→comp.; by far→superl.; slightly→small gap.",
            "Self-check parallel comparatives.",
            "[Guía U19](/blog/curso-b2/unidad-19-advanced-comparatives-literature)",
        ],
    ),
    20: (
        [
            "Una frase con cada: continuous passive, modal passive, have sth done, such a, the…the…, by far.",
            "Completa: The site ___ (restore) right now.",
            "Completa: Gear ___ (must / test).",
            "Completa: I ___ my ropes ___ . (have / check)",
            "Completa: It was ___ a great class that…",
            "Mini-historia (8 frases) mezclando U16–19.",
            "Corrige: *Gear must tested.*",
            "Corrige: *More you read, better you write.*",
            "Matching: estructura → unidad (16–19).",
            "Traduce: Me están revisando el equipo.",
            "Traduce: Cuanto más practicas, más fácil resulta.",
            "Autochequeo con mapa U20.",
            "Shadow reading + listening otra vez.",
            "Siguiente: Unidad 21 (linkers) en el curso.",
            "Enlace /curso-b2/unit-20.",
        ],
        [
            "Open — one of each structure.",
            "**is being restored**",
            "**must be tested**",
            "**am having / checked**",
            "**such**",
            "Open mixed paragraph.",
            "Gear **must be tested**.",
            "**The** more you read, **the** better you write.",
            "passive→16; modal/have done→17; so/such→18; comparatives→19.",
            "I **am having** my gear **checked**.",
            "The more you practise, the easier it gets.",
            "Self-check vs review map.",
            "Practice again.",
            "Next: Unit 21 linkers.",
            "**/curso-b2/unit-20**",
        ],
    ),
}


def block_abc(items, kind="fill"):
    lines = []
    answers = []
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
    m = META[u]
    g = GRAM[u]
    v = VOCAB[u]
    rq = READ_Q[u]
    lq = LISTEN_Q[u]
    wp, ws = WRITE[u]

    g1q, g1a = block_abc(g["a"])
    g2q, g2a = block_abc(g["b"])
    g3q, g3a = block_abc(g["c"], kind="fix")
    v1q, v1a = block_abc(v["a"])
    v2q, v2a = block_abc(v["b"])

    def qa_list(rows, start=1):
        q_lines, a_lines = [], []
        for i, (q, sol, opts) in enumerate(rows, start):
            if opts == "(open)":
                q_lines.append(f"{i}. {q}")
            else:
                q_lines.append(f"{i}. {q} → *{opts}*")
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

    kws = "\n".join(
        f"  - {k}"
        for k in [
            f"ejercicios inglés B2 unidad {u}",
            "ejercicios inglés B2 gratis",
            "curso inglés B2 gratis",
            *m["kw"],
        ]
    )
    prev_blog = m["prev_blog"]
    next_line = (
        f"3. Siguiente: [{META[u + 1]['title']}](/blog/curso-b2/{m['next_t']}-ejercicios-soluciones)."
        if u < 20
        else f"3. Módulo 2 completo — sigue con [linkers U21](/curso-b2/unit-21) o repasa la [teoría U16](/blog/curso-b2/{m['next_t']})."
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
14. Revisa la tabla de vocabulario de la [guía teórica](/blog/curso-b2/{m["slug"]}).
15. Continúa en la [Unidad {u} del curso](/curso-b2/unit-{u}).

<details>
<summary>Ver solución</summary>

11–13. Open answers — check meaning in theory. · 14. Theory vocab section. · 15. **/curso-b2/unit-{u}**

</details>

---

## Lección 3 — Reading: {m["r_title"]}

**Objetivo:** comprender un texto con el foco de la unidad.

### Texto y audio

<audio controls preload="none" src="/audio/blog/curso-b2/unit-{u}/reading-workbook.mp3" title="🔊 Reading: {m["r_title"]}"></audio>

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

<audio controls preload="none" src="/audio/blog/curso-b2/unit-{u}/listening-workbook.mp3" title="🔊 Listening: {m["l_title"]}"></audio>

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

1. Repasa fallos en la [guía teórica](/blog/curso-b2/{m["slug"]}).  
2. Practica en la [Unidad {u} del curso B2](/curso-b2/unit-{u}).  
{next_line}

Guías relacionadas:

- [Teoría Unidad {u}](/blog/curso-b2/{m["slug"]})
- [Cuaderno anterior](/blog/{prev_blog}/{m["prev"]})
- [Inglés B2](/blog/metodos/{HUB})

---

*Cuaderno alineado con la Unidad {u} del [curso B2 de Linguafly](/curso-b2).*
"""


def make_audios():
    for u in range(16, 21):
        d = ROOT / f"public/audio/blog/curso-b2/unit-{u}"
        d.mkdir(parents=True, exist_ok=True)
        for name, text in (("reading-workbook", READ[u]), ("listening-workbook", LISTEN[u])):
            path = d / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for u in range(16, 21):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path.relative_to(ROOT), "chars", path.stat().st_size)
    make_audios()
    print("done B2 U16–20 workbooks")


if __name__ == "__main__":
    main()
