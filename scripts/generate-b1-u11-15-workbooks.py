#!/usr/bin/env python3
"""Generate B1 Units 11–15 exercise workbooks (ejercicios-soluciones)."""
from pathlib import Path

OUT = Path("src/content/blog/curso-b1")
DATE = "2026-08-31"

LISTEN = {
    11: "Hi, I am Anna. If it rains tomorrow, I will stay at home and watch a film. When I see the forecast, I will tell you. As soon as the storm passes, I will call you to arrange our picnic. Until the rain stops, we will stay indoors. If it's sunny on Saturday, we will have a barbecue in the garden.",
    12: "Hi, I am Chris. If I had a million dollars, I would travel around the world. If she were here, she would help us with the project. If I were you, I would apologize. What if we could travel back in time? In an ideal world, everyone would speak two languages.",
    13: "Hi, I am Maya. If we leave early, we will get good seats at the cinema. If we had more money, we would go to the concert instead. If the soundtrack is amazing, I might buy it after the film. If I were you, I would avoid spoilers online. If concerts were free, everyone would go to more shows.",
    14: "Hi, I am Sam. If I had revised more, I would have felt more confident in the exam. If we hadn't stayed up so late, we might have slept better. If the teacher had given us another day, we could have finished the project. If I had left home earlier, I would have caught the train. Next time we will plan earlier.",
    15: "Hi, I am Leo. If it rains tomorrow, we will watch a series at home. If I were free every evening, I would learn the guitar. If we had left earlier last week, we wouldn't have missed the concert. When the sun comes out, we will go for a walk. If I had VIP tickets, I would meet the band.",
}

READ = {
    11: "Tomorrow the weather forecast says it will be sunny in the morning but cloudy in the afternoon. If it rains, we will stay at home and watch a film. When the sun comes out, we will go for a walk in the park. As soon as the storm passes, I will call you to arrange our picnic. We will stay indoors until the rain stops. The temperature will be mild, around twenty degrees.",
    12: "Imagine if you could live anywhere in the world. Where would you go? If I had the choice, I would choose a small island in the Mediterranean. If money weren't a problem, I would buy a house by the sea. If she were here, she would love this place. In my ideal world, everyone would speak at least two languages. What would you do if you won the lottery?",
    13: "If the tickets are still available, we will go to the comedy show on Friday. If we won free VIP tickets, we would invite the whole class. If the series is good, we might binge-watch two episodes tonight. If I could meet any celebrity, I would choose a musician. If concerts were free, everyone would go to more shows. Entertainment plans depend on money and luck!",
    14: "Sam arrived late at the station yesterday. If he had left home earlier, he would have caught the train. If he hadn't checked his phone so many times, he might have been on time. If the warning had been clearer, he could have avoided the mistake. He regrets missing the opportunity. If he had known about the delay, he would have taken a taxi.",
    15: "Last weekend mixed all three conditionals. If the weather is good this Friday, we will go to the festival — first conditional. If we had VIP tickets, we would meet the band — second conditional. If we had booked earlier last month, we would have got better seats — third conditional. When I finish work, I will check the forecast. Same topic, three different frames.",
}

META = {
    11: dict(
        slug="unidad-11-first-conditional-weather",
        title="First conditional & Weather",
        full="First Conditional & Weather",
        focus="first conditional + future time clauses (when, as soon as, until)",
        vocab="weather",
        image="/blog/curso-b1/unit-11/first-conditional.png",
        prev="unidad-10-repaso-6-9-ejercicios-soluciones",
        next_t="unidad-12-second-conditional",
        r_title="Weekend weather plans",
        l_title="Anna's weather plans",
        kw=["first conditional ejercicios", "if it rains I will", "weather vocabulary ejercicios"],
    ),
    12: dict(
        slug="unidad-12-second-conditional",
        title="Second conditional",
        full="Second Conditional & Hypothetical Situations",
        focus="second conditional (if + past, would)",
        vocab="hypothetical situations",
        image="/blog/curso-b1/unit-12/second-conditional.png",
        prev="unidad-11-first-conditional-weather-ejercicios-soluciones",
        next_t="unidad-13-first-vs-second-conditional",
        r_title="Island dream",
        l_title="Chris's hypothetical world",
        kw=["second conditional ejercicios", "if I were you", "hypothetical English ejercicios"],
    ),
    13: dict(
        slug="unidad-13-first-vs-second-conditional",
        title="First vs Second Conditional",
        full="First vs Second Conditional & Entertainment",
        focus="first vs second conditional (real vs hypothetical)",
        vocab="entertainment",
        image="/blog/curso-b1/unit-13/first-vs-second.png",
        prev="unidad-12-second-conditional-ejercicios-soluciones",
        next_t="unidad-14-third-conditional",
        r_title="Cinema or concert",
        l_title="Maya's tickets",
        kw=["first vs second conditional ejercicios", "entertainment vocabulary", "condicionales contraste"],
    ),
    14: dict(
        slug="unidad-14-third-conditional",
        title="Third conditional",
        full="Third Conditional & Regrets",
        focus="third conditional (if + past perfect, would have)",
        vocab="regrets & past events",
        image="/blog/curso-b1/unit-14/third-conditional.png",
        prev="unidad-13-first-vs-second-conditional-ejercicios-soluciones",
        next_t="unidad-15-repaso-11-14",
        r_title="The missed train",
        l_title="Sam's exam regrets",
        kw=["third conditional ejercicios", "if I had known", "would have ejercicios"],
    ),
    15: dict(
        slug="unidad-15-repaso-11-14",
        title="Repaso 11–14",
        full="Repaso 11–14",
        focus="first, second y third conditional + time clauses",
        vocab="weather, entertainment, regrets (mix)",
        image="/blog/curso-b1/unit-15/review-conditionals.png",
        prev="unidad-14-third-conditional-ejercicios-soluciones",
        next_t="unidad-11-first-conditional-weather",
        r_title="One weekend, three conditionals",
        l_title="Leo's mixed conditionals",
        kw=["repaso condicionales B1", "first second third ejercicios", "conditionals review"],
    ),
}

GRAM = {
    11: {
        "a": [
            ("If it ___ tomorrow, I will stay at home.", "rains / will rain / rained", "rains"),
            ("When I ___, I will call you.", "arrive / will arrive / arrived", "arrive"),
            ("As soon as the storm ___, I will call.", "passes / will pass / passed", "passes"),
            ("We will stay indoors until the rain ___.", "stops / will stop / stopped", "stops"),
            ("If it's sunny, we ___ have a barbecue.", "will / would / are", "will"),
        ],
        "b": [
            ("If you ___ early, we will have time for coffee.", "come / will come / came", "come"),
            ("Before we leave, I ___ check the forecast.", "will / would / am", "will"),
            ("After the storm, we ___ go for a walk.", "will / would / are", "will"),
            ("If there ___ a storm, we will stay indoors.", "is / will be / was", "is"),
            ("I will tell you when I ___ the forecast.", "see / will see / saw", "see"),
        ],
        "c": [
            ("*If it will rain, I stay home.*", "If it **rains**, I **will** stay home."),
            ("*When I will arrive, I call you.*", "When I **arrive**, I **will** call you."),
            ("*As soon as it will pass…*", "As soon as it **passes**…"),
            ("*Until the rain will stop…*", "Until the rain **stops**…"),
            ("*If it's sunny, we would have a barbecue.* (plan real)", "If it's sunny, we **will** have a barbecue."),
        ],
    },
    12: {
        "a": [
            ("If I ___ a million dollars, I would travel.", "had / have / will have", "had"),
            ("If she ___ here, she would help us.", "were / is / will be", "were"),
            ("If I were you, I ___ apologize.", "would / will / am", "would"),
            ("If money ___ a problem, I would buy a house.", "weren't / isn't / won't be", "weren't"),
            ("What ___ you do if you won the lottery?", "would / will / do", "would"),
        ],
        "b": [
            ("If we ___ travel back in time, where would we go?", "could / can / will", "could"),
            ("In an ideal world, everyone ___ speak two languages.", "would / will / can", "would"),
            ("If I ___ more time, I would learn the guitar.", "had / have / will have", "had"),
            ("If you ___ me, what would you do?", "were / are / will be", "were"),
            ("If she ___ the choice, she would live by the sea.", "had / has / will have", "had"),
        ],
        "c": [
            ("*If I will have time, I would go.*", "If I **had** time, I **would** go."),
            ("*If I would be rich, I travel.*", "If I **were** rich, I **would** travel."),
            ("*If she was here, she will help.* (hipotético)", "If she **were** here, she **would** help."),
            ("*What if we can travel back in time?*", "What if we **could** travel back in time?"),
            ("*If I have a million dollars, I would travel.*", "If I **had** a million dollars, I **would** travel."),
        ],
    },
    13: {
        "a": [
            ("If we ___ time tonight, we'll watch a documentary.", "have / had / will have", "have"),
            ("If I ___ a film director, I'd make a comedy.", "were / am / will be", "were"),
            ("If the concert ___ at 8, we'll arrive at 7:30.", "starts / started / will start", "starts"),
            ("If we ___ VIP tickets, we'd be so happy.", "won / win / will win", "won"),
            ("If you ___ to the party, you'll meet lots of people.", "come / came / will come", "come"),
        ],
        "b": [
            ("If the episode is boring, we ___ change series.", "will / would / are", "will"),
            ("If I had a free evening, I ___ go to a gig.", "would / will / am", "would"),
            ("If tickets are cheap, we ___ book now.", "will / would / are", "will"),
            ("If I were you, I ___ avoid spoilers.", "would / will / am", "would"),
            ("If concerts ___ free, everyone would go more.", "were / are / will be", "were"),
        ],
        "c": [
            ("*If it will rain, we stay in.*", "If it **rains**, we**'ll** stay in."),
            ("*If I would have time, I go.*", "If I **had** time, I **would** go."),
            ("*If concerts are free, everyone would go.* (deseo irreal)", "If concerts **were** free, everyone **would** go."),
            ("*If we leave early, we would get seats.* (plan real)", "If we leave early, we **will** get seats."),
            ("*If I had wings, I will fly.*", "If I had wings, I **would** fly."),
        ],
    },
    14: {
        "a": [
            ("If she ___ earlier, she would have arrived on time.", "had left / left / leaves", "had left"),
            ("We ___ the train if we had run.", "wouldn't have missed / wouldn't miss / won't miss", "wouldn't have missed"),
            ("If I had seen the warning, I ___.", "would have stopped / would stop / will stop", "would have stopped"),
            ("They might have won if they ___ more.", "had practised / practised / practise", "had practised"),
            ("If I ___ about the party, I would have come.", "had known / knew / know", "had known"),
        ],
        "b": [
            ("If we ___ stayed up so late, we might have slept better.", "hadn't / didn't / don't", "hadn't"),
            ("If the teacher ___ us another day, we could have finished.", "had given / gave / gives", "had given"),
            ("He ___ have told you if he had seen you.", "would / will / can", "would"),
            ("If I had taken the job, I ___ have moved to London.", "would / will / can", "would"),
            ("If you had listened, you ___ have made that mistake.", "wouldn't / won't / don't", "wouldn't"),
        ],
        "c": [
            ("*If I would have known…*", "If I **had known**…"),
            ("*I would passed.*", "I **would have passed**."),
            ("*If I knew about the party yesterday…* (pasado irreal)", "If I **had known**…"),
            ("*If she studied harder, she would have passed.*", "If she **had studied** harder, she would have passed."),
            ("*We would catch the train if we had left earlier.*", "We **would have caught** the train if we had left earlier."),
        ],
    },
    15: {
        "a": [
            ("If it ___ sunny tomorrow, we'll walk.", "is / were / had been", "is"),
            ("If I ___ you, I'd take an umbrella.", "were / am / had been", "were"),
            ("If they ___ earlier, they would have got seats.", "had booked / booked / book", "had booked"),
            ("We ___ out if it doesn't rain.", "will go / would go / went", "will go"),
            ("She ___ if she had known.", "would have called / would call / will call", "would have called"),
        ],
        "b": [
            ("If she studies, she ___ pass. (first)", "will / would / would have", "will"),
            ("If she studied, she ___ pass. (second)", "would / will / would have", "would"),
            ("If she had studied, she ___ passed. (third)", "would have / will / would", "would have"),
            ("When I ___, I will call you.", "arrive / will arrive / arrived", "arrive"),
            ("If we ___ VIP tickets, we'd meet the band.", "had / have / had had", "had"),
        ],
        "c": [
            ("*If it will rain…*", "If it **rains**…"),
            ("*If I would have time…*", "If I **had** time… / If I **had had** time…"),
            ("*I would passed.*", "I **would have passed**."),
            ("*If we leave now, we would catch the bus.* (plan real)", "If we leave now, we **will** catch the bus."),
            ("*If I had left earlier, I would arrive.* (pasado)", "If I had left earlier, I **would have arrived**."),
        ],
    },
}

VOCAB = {
    11: {
        "a": [
            ("sunny", "soleado · lluvioso · nublado", "soleado"),
            ("storm", "tormenta · niebla · brisa", "tormenta"),
            ("forecast", "pronóstico · temperatura · humedad", "pronóstico"),
            ("temperature", "temperatura · clima · granizo", "temperatura"),
            ("drizzle", "llovizna · aguacero · sequía", "llovizna"),
        ],
        "b": [
            ("Day with no clouds = ___", "sunny / rainy / foggy", "sunny"),
            ("Strong rain + thunder = ___", "storm / drizzle / mild", "storm"),
            ("How hot/cold = ___", "temperature / forecast / climate", "temperature"),
            ("Pronóstico = ___", "forecast / humidity / hail", "forecast"),
            ("Relámpago = ___", "lightning / thunder / wind", "lightning"),
        ],
    },
    12: {
        "a": [
            ("imagine", "imaginar · cancelar · reservar", "imaginar"),
            ("wish", "desear · posponer · aterrizar", "desear"),
            ("ideal", "ideal · real · cancelado", "ideal"),
            ("fantasy", "fantasía · horario · evidencia", "fantasía"),
            ("suppose", "suponer · olvidar · despegar", "suponer"),
        ],
        "b": [
            ("dream ≈ ___", "sueño / tormenta / billete", "sueño"),
            ("hypothetical ≈ ___", "hipotético / cierto / pasado real", "hipotético"),
            ("What if… ≈ ___", "¿y si…? / ¿cuándo…? / ¿dónde…?", "¿y si…?"),
            ("In an ideal world ≈ ___", "en un mundo ideal / mañana / ayer", "en un mundo ideal"),
            ("lottery ≈ ___", "lotería / concierto / pronóstico", "lotería"),
        ],
    },
    13: {
        "a": [
            ("concert", "concierto · tormenta · rutina", "concierto"),
            ("series", "serie · granizo · hábito", "serie"),
            ("celebrity", "celebridad · temperatura · aviso", "celebridad"),
            ("streaming", "streaming · sequía · ascenso", "streaming"),
            ("ticket", "entrada · niebla · pueblo", "entrada"),
        ],
        "b": [
            ("binge-watch ≈ ___", "ver de seguido / cancelar / soñar", "ver de seguido"),
            ("gig ≈ ___", "concierto informal / pronóstico / error", "concierto informal"),
            ("spoilers ≈ ___", "spoilers / humidity / regret", "spoilers"),
            ("audience ≈ ___", "audiencia / climate / drought", "audiencia"),
            ("premiere ≈ ___", "estreno / thunder / commute", "estreno"),
        ],
    },
    14: {
        "a": [
            ("regret", "arrepentirse · reservar · soñar", "arrepentirse"),
            ("miss (a chance)", "perder (oportunidad) · ganar · empezar", "perder (oportunidad)"),
            ("opportunity", "oportunidad · concierto · soleado", "oportunidad"),
            ("mistake", "error · festival · streaming", "error"),
            ("hindsight", "en retrospectiva · estreno · audience", "en retrospectiva"),
        ],
        "b": [
            ("I wish I had ≈ ___", "ojalá hubiera / voy a / solía", "ojalá hubiera"),
            ("should have ≈ ___", "debería haber / voy a / podría", "debería haber"),
            ("could have ≈ ___", "podría haber / debe / will", "podría haber"),
            ("missed opportunity ≈ ___", "oportunidad perdida / entrada VIP / picnic", "oportunidad perdida"),
            ("on time ≈ ___", "a tiempo / tarde / nunca", "a tiempo"),
        ],
    },
    15: {
        "a": [
            ("forecast", "pronóstico · arrepentimiento · gira", "pronóstico"),
            ("binge-watch", "ver de seguido · granizo · aviso", "ver de seguido"),
            ("regret", "arrepentimiento · soleado · álbum", "arrepentimiento"),
            ("VIP tickets", "entradas VIP · humidity · drought", "entradas VIP"),
            ("time clause", "cláusula de tiempo · celebrity / hail", "cláusula de tiempo"),
        ],
        "b": [
            ("first = ___", "real/probable / pasado irreal / solo A1", "real/probable"),
            ("second = ___", "hipotético ahora / pasado real / will only", "hipotético ahora"),
            ("third = ___", "pasado irreal / futuro cierto / zero only", "pasado irreal"),
            ("when + present = ___", "time clause / third / must", "time clause"),
            ("would have + V3 = ___", "third result / first result / vocab only", "third result"),
        ],
    },
}

READ_Q = {
    11: [
        ("Morning weather?", "sunny", "sunny / stormy / freezing"),
        ("Afternoon?", "cloudy", "cloudy / snowy / hot"),
        ("If it rains → ___", "stay at home / watch a film", "stay home / travel / swim"),
        ("When sun comes out → ___", "walk in the park", "walk / sleep / fly"),
        ("As soon as storm passes → ___", "call / arrange picnic", "call / cancel forever"),
        ("Until rain stops → ___", "stay indoors", "stay indoors / leave now"),
        ("Temperature?", "mild / around 20", "mild / freezing / unknown"),
        ("Main grammar?", "first conditional + time clauses", "first / second / third"),
        ("Will in if-clause?", "No", "No / Yes"),
        ("Find as soon as", "As soon as the storm passes…", "(open)"),
        ("Underline 3× if/when/until.", "See text", "(open)"),
        ("Write one If it…, we will…", "Model OK", "(open)"),
        ("Weather vocab in text?", "forecast, cloudy, storm, temperature", "yes / none"),
        ("Ending tone?", "practical plans", "practical / angry / empty"),
        ("Course link", "/curso-b1/unit-11", "/curso-b1/unit-11"),
    ],
    12: [
        ("Topic?", "living anywhere / island dream", "island / weather / exam"),
        ("Where would narrator go?", "Mediterranean island", "Mediterranean / Tokyo / desert"),
        ("If money weren't a problem → ___", "buy a house by the sea", "buy house / cancel / study"),
        ("If she were here → ___", "love this place", "love / hate / leave"),
        ("Ideal world → ___", "everyone speak two languages", "two languages / no school"),
        ("Lottery question?", "Yes", "Yes / No"),
        ("Main grammar?", "second conditional", "second / first / third"),
        ("If I had the choice → ___", "small island", "island / office / bus"),
        ("Were with I/she?", "Yes (were)", "Yes / No"),
        ("Find If I had…", "If I had the choice…", "(open)"),
        ("Underline would ×3.", "See text", "(open)"),
        ("Write one If I were you…", "Model OK", "(open)"),
        ("Key vocab?", "imagine, ideal, choice", "yes / none"),
        ("Real plan for tomorrow?", "False (hypothetical)", "False / True"),
        ("Course link", "/curso-b1/unit-12", "/curso-b1/unit-12"),
    ],
    13: [
        ("If tickets available → ___", "comedy show", "comedy / exam / storm"),
        ("VIP tickets → ___", "invite the whole class", "invite class / cancel"),
        ("If series good → ___", "binge-watch two episodes", "binge-watch / delete"),
        ("Celebrity choice?", "musician", "musician / politician / chef"),
        ("If concerts free → ___", "everyone would go more", "more shows / none"),
        ("First or second: tickets available?", "first", "first / second"),
        ("First or second: VIP fantasy?", "second", "second / first"),
        ("Entertainment focus?", "Yes", "Yes / No"),
        ("Find binge-watch", "binge-watch two episodes", "(open)"),
        ("Find If I could meet…", "celebrity / musician", "(open)"),
        ("Underline one first + one second.", "See text", "(open)"),
        ("Write cinema first + concert second.", "Model OK", "(open)"),
        ("Key vocab?", "tickets, series, celebrity, concerts", "yes / none"),
        ("Depends on ___", "money and luck", "money/luck / weather only"),
        ("Course link", "/curso-b1/unit-13", "/curso-b1/unit-13"),
    ],
    14: [
        ("Who arrived late?", "Sam", "Sam / Anna / Maya"),
        ("Where?", "station", "station / cinema / office"),
        ("If left earlier → ___", "caught the train", "caught train / slept"),
        ("Phone checks → ___", "might have been on time", "on time / richer"),
        ("Clearer warning → ___", "could have avoided mistake", "avoided / celebrated"),
        ("He regrets ___", "missing the opportunity", "missing / winning"),
        ("If known about delay → ___", "taken a taxi", "taxi / plane"),
        ("Main grammar?", "third conditional", "third / first / second"),
        ("Would have in if-clause?", "No (had + V3)", "No / Yes"),
        ("Find If he had left…", "would have caught the train", "(open)"),
        ("Underline past perfect ×2.", "See text", "(open)"),
        ("Write one If I had known…", "Model OK", "(open)"),
        ("Regret vocab?", "regrets, opportunity, mistake", "yes / none"),
        ("Changes the past?", "No", "No / Yes"),
        ("Course link", "/curso-b1/unit-14", "/curso-b1/unit-14"),
    ],
    15: [
        ("Friday plan structure?", "first", "first / second / third"),
        ("VIP dream structure?", "second", "second / first / third"),
        ("Booked earlier structure?", "third", "third / first / second"),
        ("Festival if weather ___", "good", "good / bad / snowy"),
        ("VIP → meet the ___", "band", "band / teacher / neighbour"),
        ("Earlier booking → better ___", "seats", "seats / grades / weather"),
        ("When I finish work → ___", "check the forecast", "forecast / sleep only"),
        ("Same topic?", "Yes (weekend/festival)", "Yes / No"),
        ("Find first line", "If the weather is good…", "(open)"),
        ("Find second line", "If we had VIP tickets…", "(open)"),
        ("Find third line", "If we had booked earlier…", "(open)"),
        ("Write 1× each conditional", "Model OK", "(open)"),
        ("Time clause in text?", "When I finish work…", "yes / none"),
        ("Main idea?", "three frames, one topic", "three frames / only A1"),
        ("Course link", "/curso-b1/unit-15", "/curso-b1/unit-15"),
    ],
}

LISTEN_Q = {
    11: [
        ("Who speaks?", "Anna", "Anna / Chris / Sam"),
        ("If it rains → ___", "stay home / watch a film", "stay home / travel"),
        ("When she sees forecast → ___", "tell you", "tell / cancel"),
        ("As soon as storm passes → ___", "call / picnic", "call / sleep"),
        ("Until rain stops → ___", "stay indoors", "stay indoors / leave"),
        ("Saturday if sunny → ___", "barbecue", "barbecue / exam"),
        ("Grammar focus?", "first + time clauses", "first / second / third"),
        ("Will in time clause?", "No", "No / Yes"),
        ("Find as soon as line", "storm passes… call", "(open)"),
        ("Find until line", "stay indoors until…", "(open)"),
        ("Write one When…, I will…", "Model OK", "(open)"),
        ("Weather words heard?", "rains, forecast, storm, sunny", "yes / none"),
        ("Shadow full audio", "done", "(open)"),
        ("Barbecue is certain?", "False (if sunny)", "False / True"),
        ("Open Ver solución after try", "yes", "yes"),
    ],
    12: [
        ("Who speaks?", "Chris", "Chris / Anna / Maya"),
        ("Million dollars → ___", "travel around the world", "travel / stay home"),
        ("If she were here → ___", "help with the project", "help / leave"),
        ("If I were you → ___", "apologize", "apologize / shout"),
        ("What if…?", "travel back in time", "time travel / weather"),
        ("Ideal world → ___", "everyone speak two languages", "two languages / silence"),
        ("Grammar?", "second conditional", "second / first / third"),
        ("Were with I?", "Yes", "Yes / No"),
        ("Find If I had a million…", "would travel…", "(open)"),
        ("Find If I were you…", "would apologize", "(open)"),
        ("Write What if we could…", "Model OK", "(open)"),
        ("Hypothetical vocab?", "ideal world, what if", "yes / none"),
        ("Shadow audio", "done", "(open)"),
        ("Real lottery win?", "False (hypothetical)", "False / True"),
        ("Open Ver solución", "yes", "yes"),
    ],
    13: [
        ("Who speaks?", "Maya", "Maya / Sam / Leo"),
        ("Leave early → ___", "good seats at cinema", "cinema seats / miss train"),
        ("More money → ___", "concert instead", "concert / stay home"),
        ("Amazing soundtrack → ___", "might buy it", "buy / delete"),
        ("If I were you → ___", "avoid spoilers", "avoid spoilers / spoil"),
        ("Concerts free → ___", "everyone would go more", "more shows / none"),
        ("Cinema line = first?", "Yes", "Yes / No"),
        ("Concert money line = second?", "Yes", "Yes / No"),
        ("Find spoilers line", "avoid spoilers online", "(open)"),
        ("Find might line", "might buy it after", "(open)"),
        ("Write one first + one second", "Model OK", "(open)"),
        ("Entertainment words?", "cinema, concert, soundtrack, spoilers", "yes / none"),
        ("Shadow audio", "done", "(open)"),
        ("VIP certain?", "False", "False / True"),
        ("Open Ver solución", "yes", "yes"),
    ],
    14: [
        ("Who speaks?", "Sam", "Sam / Maya / Anna"),
        ("Revised more → ___", "felt more confident", "confident / richer"),
        ("Not stayed up late → ___", "slept better", "slept better / failed"),
        ("Teacher another day → ___", "could have finished project", "finished / cancelled"),
        ("Left earlier → ___", "caught the train", "caught train / missed more"),
        ("Next time → ___", "plan earlier", "plan earlier / quit"),
        ("Grammar?", "third conditional", "third / first / second"),
        ("Find If I had revised…", "would have felt…", "(open)"),
        ("Find hadn't stayed up…", "might have slept better", "(open)"),
        ("Find could have finished…", "another day…", "(open)"),
        ("Write If I had known…", "Model OK", "(open)"),
        ("Regret topic?", "exam / train / project", "yes / weather only"),
        ("Shadow audio", "done", "(open)"),
        ("Changes past?", "No", "No / Yes"),
        ("Open Ver solución", "yes", "yes"),
    ],
    15: [
        ("Who speaks?", "Leo", "Leo / Sam / Chris"),
        ("Rains tomorrow → ___", "watch a series", "series / travel"),
        ("Free every evening → ___", "learn the guitar", "guitar / sleep only"),
        ("Left earlier last week → ___", "wouldn't have missed concert", "concert / exam"),
        ("When sun comes out → ___", "go for a walk", "walk / stay in"),
        ("VIP tickets → ___", "meet the band", "band / teacher"),
        ("Classify rains line", "first", "first / second / third"),
        ("Classify were free line", "second", "second / first / third"),
        ("Classify had left line", "third", "third / first / second"),
        ("Find time clause", "When the sun comes out…", "(open)"),
        ("Write 1× each type", "Model OK", "(open)"),
        ("Mixed review?", "Yes", "Yes / No"),
        ("Shadow audio", "done", "(open)"),
        ("Course unit", "/curso-b1/unit-15", "/curso-b1/unit-15"),
        ("Open Ver solución", "yes", "yes"),
    ],
}

WRITE = {
    11: (
        [
            "Escribe 3 frases: if / when / as soon as + weather.",
            "Completa: If it ___ tomorrow, I will stay at home.",
            "Completa: When I ___, I will call you.",
            "Completa: As soon as the storm ___, I will call.",
            "Completa: We will stay indoors until the rain ___.",
            "Escribe 1 frase con *before* + present + will.",
            "Usa *forecast* y *storm* en 2 frases first conditional.",
            "Corrige: *If it will rain, I stay home.*",
            "Corrige: *When I will arrive, I call you.*",
            "Párrafo (3–4 frases) sobre planes de fin de semana y el tiempo.",
            "Traduce: Si hace sol, haremos una barbacoa.",
            "Traduce: En cuanto pase la tormenta, te llamaré.",
            "Pregunta *What will you do if it rains?* + respuesta.",
            "Escribe 1× *until* correcto (sin will en la cláusula).",
            "Autochequeo: no will en if/when/as soon as/until.",
        ],
        [
            "Model: If it's windy, we'll stay in. When I see the forecast, I'll tell you. As soon as it stops, we'll leave.",
            "**rains**",
            "**arrive**",
            "**passes**",
            "**stops**",
            "Before we leave, I will check the forecast.",
            "If the forecast is bad, we'll cancel. If there's a storm, we'll stay indoors.",
            "If it **rains**, I **will** stay home.",
            "When I **arrive**, I **will** call you.",
            "Open — include if + time clause + weather vocab.",
            "If it's sunny, we will have a barbecue.",
            "As soon as the storm passes, I will call you.",
            "What will you do if it rains? — I'll stay at home.",
            "We will wait until the rain stops.",
            "Self-check vs theory.",
        ],
    ),
    12: (
        [
            "Escribe 3 frases second conditional (*If I had…, I would…*).",
            "Completa: If I ___ a million dollars, I would travel.",
            "Completa: If she ___ here, she would help.",
            "Completa: If I were you, I ___ apologize.",
            "Escribe *What if we could…?*",
            "Escribe *In an ideal world…*",
            "Usa *wish* / *imagine* en 2 frases.",
            "Corrige: *If I will have time, I would go.*",
            "Corrige: *If I would be rich, I travel.*",
            "Párrafo: ¿dónde vivirías si pudieras elegir?",
            "Traduce: Si yo fuera tú, me disculparía.",
            "Traduce: Si tuviera más tiempo, aprendería guitarra.",
            "Pregunta *What would you do if…?* + respuesta.",
            "Escribe 1× *If I were…*",
            "Autochequeo: past en if + would en resultado.",
        ],
        [
            "Model: If I had more free time, I would read more.",
            "**had**",
            "**were**",
            "**would**",
            "What if we could live on an island?",
            "In an ideal world, everyone would be kind.",
            "I wish I had more time. Imagine if we could fly.",
            "If I **had** time, I **would** go.",
            "If I **were** rich, I **would** travel.",
            "Open island/city paragraph with would.",
            "If I were you, I would apologize.",
            "If I had more time, I would learn the guitar.",
            "What would you do if you won? — I would travel.",
            "If I were free, I would call you.",
            "Self-check.",
        ],
    ),
    13: (
        [
            "Escribe 2 first + 2 second sobre cine/conciertos.",
            "Completa: If we ___ time tonight, we'll watch a documentary.",
            "Completa: If I ___ a director, I'd make a comedy.",
            "Completa: If tickets are cheap, we ___ book now.",
            "Completa: If I were you, I ___ avoid spoilers.",
            "Usa *binge-watch* y *gig* en 2 frases (una first, una second).",
            "Clasifica: If we leave early, we'll get seats. → ___",
            "Clasifica: If we had more money, we'd go to the concert. → ___",
            "Corrige: *If concerts are free, everyone would go.* (irreal)",
            "Mini-diálogo (4 líneas) first + second.",
            "Traduce: Si la serie es buena, puede que veamos dos episodios.",
            "Traduce: Si tuviera entradas VIP, te invitaría.",
            "Escribe sobre un plan real de ocio (first).",
            "Escribe una fantasía de celebrity (second).",
            "Autochequeo: ¿real o hipotético?",
        ],
        [
            "Open — 2+2 entertainment conditionals.",
            "**have**",
            "**were**",
            "**will / 'll**",
            "**would / 'd**",
            "If the series is good, we'll binge-watch it. If I had a free night, I'd go to a gig.",
            "**first**",
            "**second**",
            "If concerts **were** free, everyone **would** go.",
            "Open dialogue.",
            "If the series is good, we might watch two episodes.",
            "If I had VIP tickets, I would invite you.",
            "If we book now, we'll get cheaper tickets.",
            "If I could meet a celebrity, I would choose a musician.",
            "Self-check probability.",
        ],
    ),
    14: (
        [
            "Escribe 3 third conditionals (*If I had…, I would have…*).",
            "Completa: If she ___ earlier, she would have arrived on time.",
            "Completa: We ___ the train if we had run.",
            "Completa: If I had seen the warning, I ___.",
            "Escribe *If I had known…*",
            "Usa *regret* y *miss* en 2 frases con third.",
            "Second o third: If I had more time now, I'd help. → ___",
            "Second o third: If I had had more time yesterday, I'd have helped. → ___",
            "Corrige: *If I would have known…*",
            "Corrige: *I would passed.*",
            "Párrafo: un tren/examen/oportunidad perdida.",
            "Traduce: Si hubiéramos salido antes, no habríamos perdido el tren.",
            "Traduce: Si hubiera repasado más, me habría sentido más seguro.",
            "Escribe 1× *might have* + 1× *could have*.",
            "Autochequeo: past perfect en if + would have en resultado.",
        ],
        [
            "Model: If I had left earlier, I would have caught the bus.",
            "**had left**",
            "**wouldn't have missed**",
            "**would have stopped**",
            "If I had known, I would have called.",
            "I regret missing the chance. If I hadn't missed it, I would have…",
            "**second**",
            "**third**",
            "If I **had known**…",
            "I **would have passed**.",
            "Open regret story.",
            "If we had left earlier, we wouldn't have missed the train.",
            "If I had revised more, I would have felt more confident.",
            "We might have slept better. We could have finished the project.",
            "Self-check.",
        ],
    ),
    15: (
        [
            "Una frase first + second + third sobre el mismo tema.",
            "Completa: If it ___ sunny tomorrow, we'll walk.",
            "Completa: If I ___ you, I'd take an umbrella.",
            "Completa: If they ___ earlier, they would have got seats.",
            "Completa: When I ___, I will call you.",
            "Clasifica: If she studies, she'll pass. → ___",
            "Clasifica: If she studied, she'd pass. → ___",
            "Clasifica: If she had studied, she would have passed. → ___",
            "Corrige: *If it will rain…*",
            "Corrige: *I would passed.*",
            "Mini-historia (5 frases) mezclando U11–U14.",
            "Matching mental: real / hipotético ahora / pasado irreal.",
            "Traduce: Si hace buen tiempo, iremos al festival.",
            "Traduce: Si hubiéramos reservado antes, habríamos tenido mejores asientos.",
            "Autochequeo con el mapa de la Unidad 15.",
        ],
        [
            "Open — one of each on the same topic.",
            "**is**",
            "**were**",
            "**had booked**",
            "**arrive**",
            "**first**",
            "**second**",
            "**third**",
            "If it **rains**…",
            "I **would have passed**.",
            "Open mixed paragraph.",
            "first=real; second=now unreal; third=past unreal.",
            "If the weather is good, we'll go to the festival.",
            "If we had booked earlier, we would have had better seats.",
            "Self-check vs review map.",
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

    bing = [
        "curso de inglés gratis",
        "aprender inglés gratis",
        "curso de inglés online gratis",
        "curso inglés B1 gratis",
        "ejercicios inglés B1 gratis",
    ]
    kws = "\n".join(
        f"  - {k}"
        for k in [f"ejercicios inglés B1 unidad {u}", *m["kw"], "curso B1 Linguafly", *bing]
    )

    if u < 15:
        next_line = f"3. Siguiente: [{META[u + 1]['title']}](/blog/curso-b1/{m['next_t']}-ejercicios-soluciones)."
    else:
        next_line = "3. Siguiente bloque del curso: [Unidad 16 — Passive](/curso-b1/unit-16)."

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
canonical: 'https://www.linguafly.app/blog/curso-b1/{m["slug"]}-ejercicios-soluciones'
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
    for u in (11, 12, 13, 14, 15):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path, "chars", path.stat().st_size)


if __name__ == "__main__":
    main()
