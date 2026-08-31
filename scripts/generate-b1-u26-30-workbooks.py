#!/usr/bin/env python3
"""Generate B1 Units 26–30 exercise workbooks (ejercicios-soluciones) + TTS."""
from pathlib import Path

from gtts import gTTS

OUT = Path("src/content/blog/curso-b1")
ROOT = Path(__file__).resolve().parents[1]
DATE = "2026-08-31"

LISTEN = {
    26: "Hi, I am Nora. There isn't much water left. There are many apples in the fridge. Add a little salt to the soup. Very few people came to the party. She drinks a lot of coffee every day.",
    27: "Hi, I am Omar. Both restaurants are expensive. You can have either tea or coffee. Neither Tom nor Maria wants to go. I don't want either of them. Both choices are valid.",
    28: "Hi, I am Paula. I went to an old church yesterday. She works in a bank in the centre. We visited the cathedral in Seville. There is a museum opposite the park. I go to school by bus.",
    29: "Hi, I am Quinn. I hurt myself when I fell. She taught herself to play the guitar. They enjoyed themselves at the party. We organised the trip by ourselves. We need to believe in ourselves.",
    30: "Hi, I am Rita. There isn't much milk left. You can have either tea or coffee. We visited the cathedral yesterday. She taught herself Spanish. Both options look good to me.",
}

READ = {
    26: "There isn't much water left in the bottle. There are many apples in the fridge. Add a little salt to the soup. Very few people ordered meat. She drinks a lot of coffee every day and we need some bread for dinner.",
    27: "Both restaurants are expensive. You can have either tea or coffee. Neither Tom nor Maria wants to go. I don't want either of them. Both choices are valid and we can go either by train or by bus.",
    28: "I went to an old church yesterday. She works in a bank in the centre. We visited the cathedral in Seville. There is a museum opposite the park. I go to school by bus and I need an hour to get to the airport.",
    29: "I hurt myself when I fell. She taught herself to play the guitar. They enjoyed themselves at the party. We organised the trip by ourselves. It was an unforgettable experience and we need to believe in ourselves.",
    30: "There isn't much milk left. You can have either tea or coffee. We visited the cathedral yesterday. She taught herself Spanish last year. Both options look good to me and I don't want either of the expensive restaurants.",
}

META = {
    26: dict(
        slug="unidad-26-quantifiers-food",
        title="Quantifiers & Food",
        full="Quantifiers: much, many, a lot, few, little | Food & drink",
        focus="quantifiers (much/many/a lot/few/little)",
        vocab="food & drink",
        image="/blog/curso-b1/unit-26/quantifiers.png",
        prev="unidad-25-repaso-21-24-ejercicios-soluciones",
        next_t="unidad-27-both-either-neither",
        r_title="At the table",
        l_title="Nora cooking",
        kw=["quantifiers ejercicios B1", "much many few little", "food drink vocabulary"],
    ),
    27: dict(
        slug="unidad-27-both-either-neither",
        title="Both, Either, Neither & Choices",
        full="Both, either, neither | Choices",
        focus="both…and, either…or, neither…nor",
        vocab="choices",
        image="/blog/curso-b1/unit-27/both-either-neither.png",
        prev="unidad-26-quantifiers-food-ejercicios-soluciones",
        next_t="unidad-28-articles-buildings",
        r_title="Making a choice",
        l_title="Omar deciding",
        kw=["both either neither ejercicios", "either or neither nor", "choices vocabulary"],
    ),
    28: dict(
        slug="unidad-28-articles-buildings",
        title="Articles & Buildings",
        full="Articles: a/an, the, no article | Places: buildings",
        focus="articles (a/an, the, zero article)",
        vocab="places: buildings",
        image="/blog/curso-b1/unit-28/articles.png",
        prev="unidad-27-both-either-neither-ejercicios-soluciones",
        next_t="unidad-29-reflexive-pronouns",
        r_title="Around town",
        l_title="Paula in town",
        kw=["articles a an the ejercicios", "zero article", "buildings vocabulary"],
    ),
    29: dict(
        slug="unidad-29-reflexive-pronouns",
        title="Reflexive Pronouns & Experiences",
        full="Reflexive pronouns | Personal experiences",
        focus="reflexive pronouns (myself, yourself, himself…)",
        vocab="personal experiences",
        image="/blog/curso-b1/unit-29/reflexives.png",
        prev="unidad-28-articles-buildings-ejercicios-soluciones",
        next_t="unidad-30-repaso-26-29",
        r_title="By yourself",
        l_title="Quinn's story",
        kw=["reflexive pronouns ejercicios", "myself yourself himself", "personal experiences"],
    ),
    30: dict(
        slug="unidad-30-repaso-26-29",
        title="Repaso 26–29",
        full="Repaso 26–29: Quantifiers, Both/Either/Neither, Articles, Reflexives",
        focus="quantifiers, both/either/neither, articles y reflexives (mix U26–29)",
        vocab="food, choices, buildings, experiences (mix)",
        image="/blog/curso-b1/unit-30/review-map.png",
        prev="unidad-29-reflexive-pronouns-ejercicios-soluciones",
        next_t="unidad-26-quantifiers-food",
        r_title="Mixed review",
        l_title="Rita's mixed review",
        kw=["repaso B1 26-29", "quantifiers articles review", "reflexives review"],
    ),
}

GRAM = {
    26: {
        "a": [
            ("There isn't ___ water left.", "much / many / few", "much"),
            ("There are ___ apples in the fridge.", "many / much / little", "many"),
            ("Add ___ salt to the soup.", "a little / a few / many", "a little"),
            ("Very ___ people came.", "few / little / much", "few"),
            ("She drinks ___ of coffee.", "a lot / many / few", "a lot"),
        ],
        "b": [
            ("How ___ milk do you need?", "much / many / few", "much"),
            ("How ___ eggs are there?", "many / much / little", "many"),
            ("We have ___ time left.", "little / few / many", "little"),
            ("There are ___ restaurants here.", "a few / a little / much", "a few"),
            ("I don't eat ___ meat.", "much / many / few", "much"),
        ],
        "c": [
            ("*There isn't many water.*", "There isn't **much** water."),
            ("*There are much apples.*", "There are **many** apples."),
            ("*Add a few salt.*", "Add **a little** salt."),
            ("*Very little people came.*", "Very **few** people came."),
            ("*How many milk…?*", "**How much** milk…?"),
        ],
    },
    27: {
        "a": [
            ("___ restaurants are expensive.", "Both / Either / Neither", "Both"),
            ("You can have ___ tea ___ coffee.", "either…or / neither…nor / both…and", "either…or"),
            ("___ Tom ___ Maria wants to go.", "Neither…nor / Both…and / Either…or", "Neither…nor"),
            ("I don't want ___ of them.", "either / both / neither", "either"),
            ("___ choices are valid.", "Both / Either / Neither", "Both"),
        ],
        "b": [
            ("We can go ___ by train ___ by bus.", "either…or / neither…nor / both…and", "either…or"),
            ("I like ___ films.", "both / either / neither", "both"),
            ("___ option is good.", "Neither / Both / Either", "Neither"),
            ("___ my sister and I like pizza.", "Both / Either / Neither", "Both"),
            ("I would like ___ the red one ___ the blue one.", "either…or / both…and / neither…nor", "either…or"),
        ],
        "c": [
            ("*Both restaurant are expensive.*", "**Both restaurants** are expensive."),
            ("*Neither Tom or Maria wants to go.*", "Neither Tom **nor** Maria wants to go."),
            ("*I don't want both of them.* (ninguno)", "I don't want **either** of them."),
            ("*Either tea and coffee.*", "**Either** tea **or** coffee."),
            ("*Neither options is good.*", "**Neither option** is good."),
        ],
    },
    28: {
        "a": [
            ("I went to ___ old church.", "an / a / the", "an"),
            ("She works in ___ bank.", "a / an / —", "a"),
            ("We visited ___ cathedral in Seville.", "the / a / an", "the"),
            ("I go to ___ by bus. (institution)", "school / the school / a school", "school"),
            ("I need ___ hour to get there.", "an / a / the", "an"),
        ],
        "b": [
            ("There is ___ museum opposite the park.", "a / an / the", "a"),
            ("They built ___ office block.", "an / a / the", "an"),
            ("Life in ___ city can be stressful.", "the / a / —", "the"),
            ("They are building ___ new stadium.", "a / an / the", "a"),
            ("Is there ___ library near here?", "a / an / the", "a"),
        ],
        "c": [
            ("*I went to a old church.*", "I went to **an** old church."),
            ("*We visited a cathedral in Seville.* (única conocida)", "We visited **the** cathedral…"),
            ("*I go to the school by bus.* (como alumno)", "I go to **school** by bus."),
            ("*I need a hour.*", "I need **an** hour."),
            ("*She works in an bank.*", "She works in **a** bank."),
        ],
    },
    29: {
        "a": [
            ("I hurt ___ when I fell.", "myself / yourself / himself", "myself"),
            ("She taught ___ to play the guitar.", "herself / himself / itself", "herself"),
            ("They enjoyed ___ at the party.", "themselves / ourselves / yourselves", "themselves"),
            ("We organised the trip ___.", "by ourselves / by themselves / by yourself", "by ourselves"),
            ("We need to believe in ___.", "ourselves / themselves / yourself", "ourselves"),
        ],
        "b": [
            ("He taught ___ Spanish.", "himself / herself / itself", "himself"),
            ("Help ___ to some food.", "yourself / myself / himself", "yourself"),
            ("The children dressed ___.", "themselves / ourselves / yourselves", "themselves"),
            ("Be proud of ___.", "yourself / myself / himself", "yourself"),
            ("I made ___ a sandwich.", "myself / yourself / themselves", "myself"),
        ],
        "c": [
            ("*I hurt me when I fell.*", "I hurt **myself** when I fell."),
            ("*She taught herself to him.*", "She taught **herself**…"),
            ("*They enjoyed theirselves.*", "They enjoyed **themselves**."),
            ("*We organised it by ourselves.*", "OK / by **ourselves**."),
            ("*Believe in we.*", "Believe in **ourselves**."),
        ],
    },
    30: {
        "a": [
            ("There isn't ___ milk left.", "much / many / few", "much"),
            ("___ tea ___ coffee is fine.", "Either…or / Both…and / Neither…nor", "Either…or"),
            ("We visited ___ cathedral.", "the / a / an", "the"),
            ("She taught ___ Spanish.", "herself / himself / itself", "herself"),
            ("___ options look good.", "Both / Either / Neither", "Both"),
        ],
        "b": [
            ("Add ___ salt.", "a little / a few / many", "a little"),
            ("Neither Tom ___ Maria wants to go.", "nor / or / and", "nor"),
            ("I went to ___ old church.", "an / a / the", "an"),
            ("I hurt ___ when I fell.", "myself / yourself / himself", "myself"),
            ("How ___ eggs are there?", "many / much / little", "many"),
        ],
        "c": [
            ("*There isn't many milk.*", "There isn't **much** milk."),
            ("*Either tea and coffee.*", "**Either** tea **or** coffee."),
            ("*We visited a cathedral.* (específica)", "We visited **the** cathedral."),
            ("*She taught herself him Spanish.*", "She taught **herself** Spanish."),
            ("*Both option look good.*", "**Both options** look good."),
        ],
    },
}

VOCAB = {
    26: {
        "a": [
            ("coffee", "café · library · dilemma", "café"),
            ("vegetables", "verduras · stadium · memory", "verduras"),
            ("salad", "ensalada · church / tower", "ensalada"),
            ("soup", "sopa · refund · guitar", "sopa"),
            ("bread", "pan · hospital · choice", "pan"),
        ],
        "b": [
            ("much + ___", "water/milk / apples / eggs", "water/milk"),
            ("many + ___", "apples/eggs / water / salt", "apples/eggs"),
            ("a little + ___", "salt/sugar / people / restaurants", "salt/sugar"),
            ("a few + ___", "eggs/people / milk / time", "eggs/people"),
            ("menu ≈ ___", "carta / stadium / myself", "carta"),
        ],
    },
    27: {
        "a": [
            ("choice", "elección · coffee · cathedral", "elección"),
            ("option", "opción · soup · myself", "opción"),
            ("dilemma", "dilema · bread · hospital", "dilema"),
            ("prefer", "preferir · salt · tower", "preferir"),
            ("alternative", "alternativa · salad · guitar", "alternativa"),
        ],
        "b": [
            ("both ≈ ___", "ambos / ninguno / uno", "ambos"),
            ("either…or ≈ ___", "o…o / ni…ni / y…y", "o…o"),
            ("neither…nor ≈ ___", "ni…ni / o…o / ambos", "ni…ni"),
            ("decide ≈ ___", "decidir / cocinar / caer", "decidir"),
            ("indecisive ≈ ___", "indeciso / hospital / salad", "indeciso"),
        ],
    },
    28: {
        "a": [
            ("library", "biblioteca · coffee · myself", "biblioteca"),
            ("hospital", "hospital · salad · dilemma", "hospital"),
            ("cathedral", "catedral · soup · prefer", "catedral"),
            ("stadium", "estadio · bread · either", "estadio"),
            ("museum", "museo · salt · myself", "museo"),
        ],
        "b": [
            ("a/an = ___", "uno no específico / único / institución", "uno no específico"),
            ("the = ___", "específico/conocido / nunca / cero", "específico/conocido"),
            ("go to school = ___", "sin artículo / the / an", "sin artículo"),
            ("an before ___", "vowel sound / consonant only / plural", "vowel sound"),
            ("bank ≈ ___", "banco / salad / myself", "banco"),
        ],
    },
    29: {
        "a": [
            ("experience", "experiencia · coffee · stadium", "experiencia"),
            ("unforgettable", "inolvidable · soup / either", "inolvidable"),
            ("challenge", "desafío · bread · the", "desafío"),
            ("memory", "recuerdo · salad · bank", "recuerdo"),
            ("coincidence", "coincidencia · salt · library", "coincidencia"),
        ],
        "b": [
            ("myself = ___", "yo mismo / tú / ellos", "yo mismo"),
            ("themselves = ___", "ellos mismos / nosotros / ella", "ellos mismos"),
            ("by ourselves ≈ ___", "sin ayuda / con ayuda / nunca", "sin ayuda"),
            ("look back ≈ ___", "mirar atrás / cocinar / elegir", "mirar atrás"),
            ("get over ≈ ___", "superar / preferir / visitar", "superar"),
        ],
    },
    30: {
        "a": [
            ("much/many", "cuantificadores · only reflexives", "cuantificadores"),
            ("either…or", "elección · cathedral only", "elección"),
            ("the cathedral", "artículo the · myself", "artículo the"),
            ("herself", "reflexivo · soup only", "reflexivo"),
            ("vegetables / library / choice", "vocab mix · wrong", "vocab mix"),
        ],
        "b": [
            ("few + ___", "countable / uncountable / reflexives", "countable"),
            ("neither…nor", "ni…ni / o…o / the", "ni…ni"),
            ("an hour", "vowel sound / consonant / plural", "vowel sound"),
            ("by myself", "alone/without help / many / the", "alone/without help"),
            ("a lot of", "both countable & uncountable / only the", "both countable & uncountable"),
        ],
    },
}

READ_Q = {
    26: [
        ("Isn't much ___ left", "water", "water / coffee only"),
        ("Many ___ in the fridge", "apples", "apples / salt"),
        ("Add a little ___", "salt", "salt / eggs"),
        ("Very few people ordered ___", "meat", "meat / juice"),
        ("Drinks a lot of ___", "coffee", "coffee / bread"),
        ("Need some ___ for dinner", "bread", "bread / museum"),
        ("Main grammar?", "quantifiers", "quantifiers / articles"),
        ("Find much + uncountable", "much water", "(open)"),
        ("Find many + countable", "many apples", "(open)"),
        ("Find a little", "a little salt", "(open)"),
        ("Find few", "Very few people", "(open)"),
        ("Write how much / how many", "Model OK", "(open)"),
        ("Food vocab?", "water, apples, salt, meat, coffee, bread", "yes / none"),
        ("many water OK?", "False", "False / True"),
        ("Course link", "/curso-b1/unit-26", "/curso-b1/unit-26"),
    ],
    27: [
        ("Both ___ are expensive", "restaurants", "restaurants / teas"),
        ("Either ___ or coffee", "tea", "tea / bread"),
        ("Neither Tom nor ___", "Maria", "Maria / Quinn"),
        ("Don't want ___ of them", "either", "either / both"),
        ("Both ___ are valid", "choices", "choices / hospitals"),
        ("Either by train or by ___", "bus", "bus / myself"),
        ("Main grammar?", "both/either/neither", "both/either / quantifiers"),
        ("Find both…", "Both restaurants / Both choices", "(open)"),
        ("Find either…or", "either tea or coffee / either by train or by bus", "(open)"),
        ("Find neither…nor", "Neither Tom nor Maria", "(open)"),
        ("Write I don't want either…", "Model OK", "(open)"),
        ("Choices vocab?", "restaurants, tea, coffee, choices, train, bus", "yes / none"),
        ("Neither…or OK?", "False (nor)", "False / True"),
        ("Course link", "/curso-b1/unit-27", "/curso-b1/unit-27"),
        ("both + plural?", "Yes", "Yes / No"),
    ],
    28: [
        ("Went to an ___ church", "old", "old / new only"),
        ("Works in a ___", "bank", "bank / salad"),
        ("Visited the ___", "cathedral", "cathedral / coffee"),
        ("Museum opposite the ___", "park", "park / fridge"),
        ("Go to ___ by bus", "school", "school / the school"),
        ("Need an ___ to the airport", "hour", "hour / egg"),
        ("Main grammar?", "articles", "articles / reflexives"),
        ("Find an + vowel", "an old church / an hour", "(open)"),
        ("Find the (specific)", "the cathedral / the park", "(open)"),
        ("Find zero article", "go to school", "(open)"),
        ("Write a/an/the examples", "Model OK", "(open)"),
        ("Buildings vocab?", "church, bank, cathedral, museum, school, airport", "yes / none"),
        ("a old OK?", "False (an)", "False / True"),
        ("Course link", "/curso-b1/unit-28", "/curso-b1/unit-28"),
        ("the for unique building?", "Yes", "Yes / No"),
    ],
    29: [
        ("Hurt ___", "myself", "myself / yourself"),
        ("Taught ___ guitar", "herself", "herself / himself"),
        ("Enjoyed ___ at the party", "themselves", "themselves / ourselves"),
        ("Organised trip ___", "by ourselves", "by ourselves / by them"),
        ("Unforgettable ___", "experience", "experience / salad"),
        ("Believe in ___", "ourselves", "ourselves / myself only"),
        ("Main grammar?", "reflexives", "reflexives / articles"),
        ("Find myself", "hurt myself", "(open)"),
        ("Find herself", "taught herself", "(open)"),
        ("Find themselves", "enjoyed themselves", "(open)"),
        ("Find by ourselves", "by ourselves", "(open)"),
        ("Write believe in ourselves", "Model OK", "(open)"),
        ("Experience vocab?", "experience, unforgettable, believe", "yes / none"),
        ("I hurt me OK?", "False (myself)", "False / True"),
        ("Course link", "/curso-b1/unit-29", "/curso-b1/unit-29"),
    ],
    30: [
        ("Isn't much ___ left", "milk", "milk / apples"),
        ("Either tea or ___", "coffee", "coffee / school"),
        ("Visited the ___", "cathedral", "cathedral / soup"),
        ("Taught herself ___", "Spanish", "Spanish / bread"),
        ("Both ___ look good", "options", "options / waters"),
        ("Don't want either of the expensive ___", "restaurants", "restaurants / myself"),
        ("Classify much milk", "quantifier", "quantifier / article"),
        ("Classify either…or", "both/either/neither", "choice structure / reflexive"),
        ("Classify the cathedral", "article the", "article / quantifier"),
        ("Classify herself", "reflexive", "reflexive / either"),
        ("Write 1× each type", "Model OK", "(open)"),
        ("Shadow audio", "done", "(open)"),
        ("Mixed review?", "Yes", "Yes / No"),
        ("Course unit", "/curso-b1/unit-30", "/curso-b1/unit-30"),
        ("Open Ver solución", "yes", "yes"),
    ],
}

LISTEN_Q = {
    26: [
        ("Who speaks?", "Nora", "Nora / Omar / Rita"),
        ("Isn't much ___", "water left", "water / bread only"),
        ("Many ___", "apples in the fridge", "apples / museums"),
        ("Add a little ___", "salt to the soup", "salt / eggs"),
        ("Very few people ___", "came to the party", "came / cooked"),
        ("A lot of ___", "coffee every day", "coffee / libraries"),
        ("Grammar?", "quantifiers", "quantifiers / articles"),
        ("Find much", "much water", "(open)"),
        ("Find many", "many apples", "(open)"),
        ("Find a little / few", "a little salt / few people", "(open)"),
        ("Write a lot of…", "Model OK", "(open)"),
        ("Food words?", "water, apples, salt, soup, coffee", "yes / none"),
        ("Shadow audio", "done", "(open)"),
        ("much + countable?", "False", "False / True"),
        ("Open Ver solución", "yes", "yes"),
    ],
    27: [
        ("Who speaks?", "Omar", "Omar / Nora / Paula"),
        ("Both ___ expensive", "restaurants are", "restaurants / teas"),
        ("Either tea or ___", "coffee", "coffee / bread"),
        ("Neither Tom nor ___", "Maria", "Maria / Quinn"),
        ("Don't want ___", "either of them", "either / both"),
        ("Both choices ___", "are valid", "valid / wrong"),
        ("Grammar?", "both/either/neither", "both/either / quantifiers"),
        ("Find both", "Both restaurants / Both choices", "(open)"),
        ("Find either…or", "either tea or coffee", "(open)"),
        ("Find neither…nor", "Neither Tom nor Maria", "(open)"),
        ("Write either…or…", "Model OK", "(open)"),
        ("Choice words?", "restaurants, tea, coffee, choices", "yes / none"),
        ("Shadow audio", "done", "(open)"),
        ("neither…or OK?", "False", "False / True"),
        ("Open Ver solución", "yes", "yes"),
    ],
    28: [
        ("Who speaks?", "Paula", "Paula / Omar / Quinn"),
        ("An ___ church", "old", "old / new"),
        ("Works in a ___", "bank", "bank / café"),
        ("Visited the ___", "cathedral", "cathedral / fridge"),
        ("Museum opposite the ___", "park", "park / school"),
        ("Go to school by ___", "bus", "bus / car only"),
        ("Grammar?", "articles", "articles / reflexives"),
        ("Find an", "an old church", "(open)"),
        ("Find a bank / a museum", "a bank / a museum", "(open)"),
        ("Find the cathedral", "the cathedral", "(open)"),
        ("Find zero article", "go to school", "(open)"),
        ("Buildings words?", "church, bank, cathedral, museum, school, park", "yes / none"),
        ("Shadow audio", "done", "(open)"),
        ("a hour OK?", "False (an)", "False / True"),
        ("Open Ver solución", "yes", "yes"),
    ],
    29: [
        ("Who speaks?", "Quinn", "Quinn / Paula / Rita"),
        ("Hurt ___", "myself", "myself / herself"),
        ("Taught ___", "herself", "herself / himself"),
        ("Enjoyed ___", "themselves", "themselves / ourselves"),
        ("By ___", "ourselves", "ourselves / themselves"),
        ("Believe in ___", "ourselves", "ourselves / myself only"),
        ("Grammar?", "reflexives", "reflexives / articles"),
        ("Find myself", "hurt myself", "(open)"),
        ("Find herself", "taught herself", "(open)"),
        ("Find themselves", "enjoyed themselves", "(open)"),
        ("Find by ourselves", "by ourselves", "(open)"),
        ("Write believe in…", "Model OK", "(open)"),
        ("Shadow audio", "done", "(open)"),
        ("I hurt me OK?", "False", "False / True"),
        ("Open Ver solución", "yes", "yes"),
    ],
    30: [
        ("Who speaks?", "Rita", "Rita / Quinn / Nora"),
        ("Isn't much ___", "milk left", "milk / water only"),
        ("Either tea or ___", "coffee", "coffee / school"),
        ("Visited the ___", "cathedral", "cathedral / bank"),
        ("Taught herself ___", "Spanish", "Spanish / guitar only"),
        ("Both options ___", "look good", "look good / fail"),
        ("Classify much", "quantifier", "quantifier / article"),
        ("Classify either…or", "choice structure", "choice / reflexive"),
        ("Classify the cathedral", "article", "article / quantifier"),
        ("Classify herself", "reflexive", "reflexive / either"),
        ("Write 1× each type", "Model OK", "(open)"),
        ("Shadow audio", "done", "(open)"),
        ("Mixed review?", "Yes", "Yes / No"),
        ("Course unit", "/curso-b1/unit-30", "/curso-b1/unit-30"),
        ("Open Ver solución", "yes", "yes"),
    ],
}

WRITE = {
    26: (
        [
            "Escribe 2× much/many + 2× few/little + 1× a lot of.",
            "Completa: There isn't ___ water.",
            "Completa: There are ___ apples.",
            "Completa: Add ___ salt.",
            "Completa: Very ___ people came.",
            "Corrige: *There isn't many water.*",
            "Corrige: *Add a few salt.*",
            "Usa *vegetables* y *soup* en 2 frases con cuantificadores.",
            "Escribe: How much milk / How many eggs…",
            "Párrafo (3–4 frases) sobre comida con cuantificadores.",
            "Traduce: No queda mucha agua.",
            "Traduce: Hay muchas manzanas.",
            "Pregunta How much…? + respuesta.",
            "Escribe 1× a few + countable.",
            "Autochequeo: countable → many/few; uncountable → much/little.",
        ],
        [
            "Open 2+2+1.",
            "**much**",
            "**many**",
            "**a little**",
            "**few**",
            "There isn't **much** water.",
            "Add **a little** salt.",
            "There are many vegetables. Add a little soup? / There's a lot of soup.",
            "How much milk…? How many eggs…?",
            "Open food paragraph.",
            "There isn't much water left.",
            "There are many apples.",
            "How much coffee do you drink? — A lot.",
            "There are a few eggs.",
            "Self-check.",
        ],
    ),
    27: (
        [
            "Escribe both…and, either…or, neither…nor + I don't want either.",
            "Completa: ___ restaurants are expensive.",
            "Completa: either tea ___ coffee.",
            "Completa: Neither Tom ___ Maria…",
            "Completa: I don't want ___ of them.",
            "Corrige: *Neither Tom or Maria…*",
            "Corrige: *Both restaurant are…*",
            "Usa *choice* y *option* en 2 frases.",
            "Escribe: We can go either by train or by bus.",
            "Mini-diálogo de elección (either/both).",
            "Traduce: Ambos restaurantes son caros.",
            "Traduce: Ni Tom ni María quieren ir.",
            "Explica either vs neither en 1 frase.",
            "Escribe 1× Both…and…",
            "Autochequeo: both=2; either=1 de 2; neither=0 de 2.",
        ],
        [
            "Open four structures.",
            "**Both**",
            "**or**",
            "**nor**",
            "**either**",
            "Neither Tom **nor** Maria…",
            "**Both restaurants** are…",
            "This choice is hard. Neither option is good.",
            "OK.",
            "Open dialogue.",
            "Both restaurants are expensive.",
            "Neither Tom nor Maria wants to go.",
            "either = one of two; neither = none of two.",
            "Both my sister and I like pizza.",
            "Self-check.",
        ],
    ),
    28: (
        [
            "Escribe 2× a/an + 2× the + 1× zero article.",
            "Completa: ___ old church.",
            "Completa: ___ bank in the centre.",
            "Completa: ___ cathedral in Seville.",
            "Completa: I go to ___. (alumno)",
            "Corrige: *a old church*",
            "Corrige: *I need a hour.*",
            "Usa *library* y *stadium* en 2 frases con artículos.",
            "Escribe: There is a museum opposite the park.",
            "Mini-diálogo en la ciudad (a/the).",
            "Traduce: Fuimos a la catedral.",
            "Traduce: Trabaja en un banco.",
            "Explica go to school vs go to the school.",
            "Escribe 1× an + vowel sound.",
            "Autochequeo: sonido vocálico → an; específico → the.",
        ],
        [
            "Open 2+2+1.",
            "**an**",
            "**a**",
            "**the**",
            "**school**",
            "**an** old church",
            "**an** hour",
            "Is there a library…? They're building a stadium.",
            "OK.",
            "Open dialogue.",
            "We visited the cathedral.",
            "She works in a bank.",
            "school = institution; the school = the building.",
            "an hour / an old church / an office…",
            "Self-check.",
        ],
    ),
    29: (
        [
            "Escribe myself, herself, themselves, by ourselves, believe in ourselves.",
            "Completa: I hurt ___.",
            "Completa: She taught ___.",
            "Completa: They enjoyed ___.",
            "Completa: We did it ___.",
            "Corrige: *I hurt me.*",
            "Corrige: *They enjoyed theirselves.*",
            "Usa *unforgettable* y *challenge* en 2 frases.",
            "Escribe: Help yourself to some food.",
            "Mini-historia personal con 3 reflexivos.",
            "Traduce: Me hice daño.",
            "Traduce: Se enseñó a tocar la guitarra.",
            "Explica by myself en 1 frase.",
            "Escribe 1× himself.",
            "Autochequeo: sujeto = objeto → reflexivo.",
        ],
        [
            "Open five forms.",
            "**myself**",
            "**herself**",
            "**themselves**",
            "**by ourselves**",
            "I hurt **myself**.",
            "They enjoyed **themselves**.",
            "It was an unforgettable experience. The challenge made me stronger.",
            "OK.",
            "Open story.",
            "I hurt myself.",
            "She taught herself to play the guitar.",
            "by myself = alone / without help.",
            "He taught himself Spanish.",
            "Self-check.",
        ],
    ),
    30: (
        [
            "Una frase de cada tipo: quantifier, either…or, the, reflexive, both.",
            "Completa: There isn't ___ milk.",
            "Completa: ___ tea ___ coffee.",
            "Completa: We visited ___ cathedral.",
            "Completa: She taught ___.",
            "Completa: ___ options look good.",
            "Completa: Add ___ salt.",
            "Corrige: *There isn't many milk.*",
            "Corrige: *Neither Tom or Maria…*",
            "Corrige: *I hurt me.*",
            "Mini-historia (5 frases) mezclando U26–U29.",
            "Matching: cuantificador / either / artículo / reflexivo.",
            "Traduce: No queda mucha leche.",
            "Traduce: Se enseñó español.",
            "Autochequeo con el mapa de la Unidad 30.",
        ],
        [
            "Open — one of each.",
            "**much**",
            "**Either…or**",
            "**the**",
            "**herself**",
            "**Both**",
            "**a little**",
            "There isn't **much** milk.",
            "Neither Tom **nor** Maria…",
            "I hurt **myself**.",
            "Open mixed paragraph.",
            "much=quantifier; either=choice; the=article; herself=reflexive.",
            "There isn't much milk left.",
            "She taught herself Spanish.",
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
        if u < 30
        else "3. Siguiente bloque del curso: [Unidad 31](/curso-b1/unit-31)."
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


def make_audios():
    for u in (26, 27, 28, 29, 30):
        d = ROOT / f"public/audio/blog/curso-b1/unit-{u}"
        d.mkdir(parents=True, exist_ok=True)
        for name, text in (("reading-workbook", READ[u]), ("listening-workbook", LISTEN[u])):
            path = d / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def main():
    make_audios()
    for u in (26, 27, 28, 29, 30):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path, path.stat().st_size)


if __name__ == "__main__":
    main()
