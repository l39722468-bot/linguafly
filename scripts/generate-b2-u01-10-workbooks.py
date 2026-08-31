#!/usr/bin/env python3
"""Generate B2 Units 1–10 exercise workbooks (ejercicios-soluciones) + TTS."""
from pathlib import Path
from gtts import gTTS

OUT = Path("src/content/blog/curso-b2")
ROOT = Path(__file__).resolve().parents[1]
DATE = "2026-08-31"
HUB = "ingles-b2"

LISTEN = {
    1: "Hi, I am Nina. I wish I had started this course earlier — I regret wasting so much time on social media last year. Motivated by my coach, I signed up for a leadership workshop. If I had taken better notes in B1, I would feel more confident now. Having finished the first module, I am planning my next goals.",
    2: "Hi, I am James. By next Friday I will have completed the quarterly report. I am going to present it to the board on Monday — we already booked the meeting room. Look at those clouds; it is going to rain, so I will take an umbrella. I will let you know as soon as I send the final version.",
    3: "Hi, I am Sofia. I enjoy attending lectures, but I avoid skipping classes. I decided to apply for a scholarship and agreed to help with the research project. Would you mind opening the window? I stopped procrastinating and started revising every evening.",
    4: "Hi, I am Leo. My friend convinced me to join a hiking club last month. She asked me to bring a map and told me to meet her at the trail. I want my brother to take up birdwatching with me. Our parents allowed us to camp overnight by the lake.",
    5: "Hi, I am Emma. I wish I had joined the gym sooner. By June I will have finished my thesis. I enjoy reading academic papers, and my supervisor advised me to submit the draft early. Having reviewed the data, I feel ready for the presentation.",
    6: "Hi, I am Maya. I wish I were calmer before exams — I always feel anxious. If only I had told my friend how I felt, we would not have argued. I wish my neighbours would stop playing loud music at night. I wish I could express my feelings more easily.",
    7: "Hi, I am Tom. I would rather spend the holiday with my grandparents than fly abroad. I would prefer to stay at home this year. It is high time we visited my aunt — we have not seen her for two years. I would rather my sister came early to help with the cooking.",
    8: "Hi, I am Clara. If we had left the hotel earlier, we would not be stuck in traffic now. If I had checked the forecast, I would have packed a raincoat. If she were more organised, she would have caught the connecting flight yesterday. We would be at the beach now if the ferry had not been cancelled.",
    9: "Hi, I am Ben. Disturbed by the noise from the factory, local residents protested last week. Having planted hundreds of trees, the council improved air quality in the area. Walking through the park, I noticed fewer plastic bottles on the ground. Encouraged by the results, more schools joined the recycling programme.",
    10: "Hi, I am Olivia. I wish I had booked the tickets earlier — we missed the concert. I would rather travel by train than drive. If we had taken the early bus, we would be at the museum now. Having read the guide, we chose the eco-friendly tour. It is time we reduced our carbon footprint as a family.",
}

READ = {
    1: "Last year Nina regretted starting so many online courses and never finishing them. I wish I had been more disciplined, she says. Motivated by a podcast on personal growth, she enrolled in a B2 programme. If she had studied mixed conditionals in B1, she would understand them better now. Having completed the diagnostic test, she set clear goals for the month. Encouraged by her progress, she plans to join a study group next week.",
    2: "James works in finance. By the end of this quarter he will have delivered three major projects. He is going to negotiate a raise next month because his team exceeded every target. Dark clouds are gathering — it is going to storm during the commute. He will call his manager as soon as the report is approved. He is having a video call with clients tomorrow at ten.",
    3: "University life requires balance. Sofia enjoys attending seminars but avoids missing deadlines. She decided to major in biology and agreed to mentor first-year students. She stopped checking her phone during lectures and started taking detailed notes. Her tutor advised her to read more academic journals. Would you mind sharing your notes after class?",
    4: "Leisure time is precious. Last summer a friend convinced Leo to try rock climbing. She asked him to book the equipment in advance and told him to arrive early. Leo wants his sister to take up photography with him. Their parents allowed them to travel alone for the weekend. He would like his friends to join the cycling club too.",
    5: "Emma is preparing for her B2 review week. She wishes she had started the revision plan sooner. By Friday she will have submitted two essays. She enjoys analysing case studies but avoids leaving tasks until the last minute. Her professor persuaded her to present at the conference. Having revised units one to four, she feels ready for the mixed exercises.",
    6: "Feelings are not always easy to share. Maya wishes she were braver when speaking in public. If only she had apologised sooner, her friendship would be stronger today. She wishes her flatmate would turn down the music after ten. She wishes she could sleep better before important meetings. Regretting her silence, she wrote a long message to her friend.",
    7: "Family gatherings need planning. Tom would rather cook at home than eat in a noisy restaurant. He would prefer to celebrate his birthday with close relatives only. It is high time they called their cousins in Canada — it has been three years. He would rather his brother helped with the decorations. His mother would prefer to have the party in the garden.",
    8: "Travel plans rarely go perfectly. If Clara had left the airport lounge earlier, she would be boarding the plane now. If she had double-checked her passport, she would not be waiting at the embassy today. If her partner were better at packing, they would have avoided the excess baggage fee. They would be hiking in the mountains now if the tour had not been cancelled due to snow.",
    9: "Environmental action starts locally. Disturbed by rising pollution levels, citizens demanded cleaner transport. Having installed solar panels, the school cut its energy bills by forty percent. Walking along the river, volunteers collected bags of litter. Encouraged by international reports, the mayor promised to ban single-use plastics. Having finished the audit, experts recommended stricter recycling rules.",
    10: "Olivia's family is reviewing everything they learned in units six to nine. She wishes she had listened to the travel podcast before the trip. She would rather take the train than fly short distances. If they had left home earlier, they would not be queuing at the station now. Having joined a local green group, they recycle more than ever. It is time they talked openly about their feelings and plans.",
}

META = {
    1: dict(
        slug="unidad-1-repaso-b1-b2",
        title="Repaso B1 → B2",
        full="Repaso B1 → B2: Wish, Participle Clauses & Mixed Conditionals",
        focus="wish / if only + past perfect, participle clauses, mixed conditionals",
        vocab="personal development",
        image="/blog/curso-b2/unit-1/wish-regret.png",
        prev="unidad-60-final-b1-review-ejercicios-soluciones",
        prev_blog="curso-b1",
        next_t="unidad-2-future-tenses-work",
        r_title="Nina's growth plan",
        l_title="Nina on personal development",
        kw=["wish regret B2 ejercicios", "participle clauses mixed conditionals", "repaso B1 B2"],
    ),
    2: dict(
        slug="unidad-2-future-tenses-work",
        title="Future tenses & Work",
        full="Future Tenses: Will, Going to & Future Perfect + Work",
        focus="will / going to / future perfect / present continuous for plans",
        vocab="work",
        image="/blog/curso-b2/unit-2/future-tenses.png",
        prev="unidad-1-repaso-b1-b2-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-3-gerund-infinitive-education",
        r_title="James at work",
        l_title="James on deadlines",
        kw=["future perfect ejercicios B2", "will going to work English", "future tenses B2"],
    ),
    3: dict(
        slug="unidad-3-gerund-infinitive-education",
        title="Gerund vs Infinitive",
        full="Gerund vs Infinitive (1) + Education",
        focus="enjoy / mind / avoid + gerund; decide / agree + infinitive; stop + -ing / to",
        vocab="education",
        image="/blog/curso-b2/unit-3/gerund-infinitive.png",
        prev="unidad-2-future-tenses-work-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-4-gerund-object-infinitive-leisure",
        r_title="Sofia at university",
        l_title="Sofia on study habits",
        kw=["gerund infinitive ejercicios B2", "enjoy mind avoid English", "education vocabulary B2"],
    ),
    4: dict(
        slug="unidad-4-gerund-object-infinitive-leisure",
        title="Verb + Object + Infinitive",
        full="Verb + Object + Infinitive + Leisure",
        focus="convince / ask / tell / want + object + to + infinitive",
        vocab="leisure",
        image="/blog/curso-b2/unit-4/verb-object-inf.png",
        prev="unidad-3-gerund-infinitive-education-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-5-repaso-1-4",
        r_title="Leo and leisure",
        l_title="Leo on hobbies",
        kw=["verb object infinitive ejercicios", "convince tell ask B2", "leisure vocabulary English"],
    ),
    5: dict(
        slug="unidad-5-repaso-1-4",
        title="Repaso 1–4",
        full="Repaso B2 Unidades 1–4",
        focus="wish, future tenses, gerund vs infinitive, verb + object + inf",
        vocab="personal development, work, education, leisure (mix)",
        image="/blog/curso-b2/unit-5/review-map.png",
        prev="unidad-4-gerund-object-infinitive-leisure-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-6-wish-if-only-feelings",
        r_title="Emma's review week",
        l_title="Emma mixes U1–4",
        kw=["repaso B2 unidades 1-4", "wish future gerund ejercicios", "integración gramatical B2"],
    ),
    6: dict(
        slug="unidad-6-wish-if-only-feelings",
        title="Wish & If only",
        full="Wish & If Only + Feelings",
        focus="wish + past simple / were / could / would; if only + past perfect",
        vocab="feelings & emotions",
        image="/blog/curso-b2/unit-6/wish-if-only.png",
        prev="unidad-5-repaso-1-4-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-7-would-rather-family",
        r_title="Maya and feelings",
        l_title="Maya on emotions",
        kw=["wish if only ejercicios B2", "feelings vocabulary English", "wish would could B2"],
    ),
    7: dict(
        slug="unidad-7-would-rather-family",
        title="Would rather & It's time",
        full="Would Rather, Would Prefer & It's Time + Family",
        focus="would rather + inf; would rather + subject + past; would prefer; It's time + past",
        vocab="family",
        image="/blog/curso-b2/unit-7/would-rather-prefer.png",
        prev="unidad-6-wish-if-only-feelings-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-8-mixed-conditionals-travel",
        r_title="Tom's family plans",
        l_title="Tom on preferences",
        kw=["would rather ejercicios B2", "it's time past simple", "family vocabulary B2"],
    ),
    8: dict(
        slug="unidad-8-mixed-conditionals-travel",
        title="Mixed conditionals",
        full="Mixed Conditionals + Travel",
        focus="if + past perfect → would + base (now); if + past simple → would have + pp",
        vocab="travel",
        image="/blog/curso-b2/unit-8/mixed-conditionals.png",
        prev="unidad-7-would-rather-family-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-9-participle-clauses-environment",
        r_title="Clara's travel troubles",
        l_title="Clara at the airport",
        kw=["mixed conditionals ejercicios B2", "if had would be now", "travel vocabulary B2"],
    ),
    9: dict(
        slug="unidad-9-participle-clauses-environment",
        title="Participle clauses",
        full="Participle Clauses + Environment",
        focus="-ing / -ed participle clauses; Having + past participle",
        vocab="environment",
        image="/blog/curso-b2/unit-9/participle-clauses.png",
        prev="unidad-8-mixed-conditionals-travel-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-10-repaso-6-9",
        r_title="Green city action",
        l_title="Ben on the environment",
        kw=["participle clauses ejercicios B2", "having past participle English", "environment vocabulary B2"],
    ),
    10: dict(
        slug="unidad-10-repaso-6-9",
        title="Repaso 6–9",
        full="Repaso B2 Unidades 6–9",
        focus="wish, would rather, mixed conditionals, participle clauses",
        vocab="feelings, family, travel, environment (mix)",
        image="/blog/curso-b2/unit-10/review-map.png",
        prev="unidad-9-participle-clauses-environment-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-6-wish-if-only-feelings",
        r_title="Olivia's module review",
        l_title="Olivia mixes U6–9",
        kw=["repaso B2 unidades 6-9", "wish rather mixed participles", "integración módulo 1 B2"],
    ),
}

GRAM = {
    1: {
        "a": [
            ("I wish I ___ studied harder for the exam.", "have / had / has", "had"),
            ("If only we ___ more time yesterday.", "have / had / has", "had"),
            ("She regrets ___ so much junk food.", "eat / eating / to eat", "eating"),
            ("___ by her coach, she signed up immediately.", "Motivating / Motivated / Having motivate", "Motivated"),
            ("If he had taken the medicine, he ___ better now.", "feels / would feel / will feel", "would feel"),
        ],
        "b": [
            ("I wish I ___ afford a personal trainer.", "can / could / will", "could"),
            ("___ finished the course, she updated her CV.", "Having / Have / Had", "Having"),
            ("If only you ___ me sooner!", "tell / told / had told", "had told"),
            ("Encouraged ___ the results, he set new goals.", "by / with / for", "by"),
            ("I wish they ___ stop interrupting me.", "will / would / can", "would"),
        ],
        "c": [
            ("*I wish I have studied more.*", "I wish I **had studied** more."),
            ("*If only he takes the job.* (past regret)", "If only he **had taken** the job."),
            ("*Motivating by her mentor, she applied.*", "**Motivated** by her mentor, she applied."),
            ("*If she studied harder, she would pass now.* (mixed)", "If she **had studied** harder, she **would pass** now."),
            ("*Having finish the test, she left.*", "Having **finished** the test, she left."),
        ],
    },
    2: {
        "a": [
            ("By next month I ___ have completed the project.", "will / am / would", "will"),
            ("Look at those clouds — it ___ going to rain.", "is / will / was", "is"),
            ("I ___ let you know as soon as I hear.", "will / am going to / would", "will"),
            ("We ___ having a meeting tomorrow at nine.", "are / will / have", "are"),
            ("She ___ going to apply for the promotion.", "is / will / has", "is"),
        ],
        "b": [
            ("By 2030 they ___ have worked here twenty years.", "will / are / would", "will"),
            ("I think prices ___ rise next year. (prediction)", "will / are going to / were", "will"),
            ("The train ___ at platform three — evidence!", "is going to leave / will leave / leaves", "is going to leave"),
            ("___ the time we arrive, he will have left.", "By / Until / When", "By"),
            ("I promise I ___ send the file tonight.", "will / am going to / would", "will"),
        ],
        "c": [
            ("*By Friday I will complete the report.* (future perfect)", "By Friday I **will have completed** the report."),
            ("*It will rain — look at the sky.*", "It **is going to** rain — look at the sky."),
            ("*We will have a call tomorrow.* (fixed plan)", "We **are having** a call tomorrow."),
            ("*I am going to help you — spontaneous promise*", "I **will** help you."),
            ("*By next year I will work here ten years.*", "By next year I **will have worked** here ten years."),
        ],
    },
    3: {
        "a": [
            ("I enjoy ___ lectures on Fridays.", "attend / attending / to attend", "attending"),
            ("She decided ___ for the scholarship.", "apply / applying / to apply", "to apply"),
            ("Would you mind ___ the door?", "open / opening / to open", "opening"),
            ("He avoids ___ classes when possible.", "skip / skipping / to skip", "skipping"),
            ("They agreed ___ the research project.", "join / joining / to join", "to join"),
        ],
        "b": [
            ("She stopped ___ TV and started revising.", "watch / watching / to watch", "watching"),
            ("He stopped ___ a break after three hours.", "take / taking / to take", "to take"),
            ("I aim ___ my degree by 2027.", "finish / finishing / to finish", "to finish"),
            ("Do you mind ___ me your notes?", "lend / lending / to lend", "lending"),
            ("He regrets not ___ harder.", "study / studying / to study", "studying"),
        ],
        "c": [
            ("*I enjoy to read academic papers.*", "I enjoy **reading** academic papers."),
            ("*She decided applying for the grant.*", "She decided **to apply** for the grant."),
            ("*Would you mind to wait?*", "Would you mind **waiting**?"),
            ("*He stopped to smoke.* (= dejó de fumar)", "He stopped **smoking**."),
            ("*They agreed joining the team.*", "They agreed **to join** the team."),
        ],
    },
    4: {
        "a": [
            ("She convinced me ___ join the club.", "to / for / -", "to"),
            ("He asked her ___ wait outside.", "to / for / -", "to"),
            ("They told us ___ be quiet.", "to / for / -", "to"),
            ("I want my brother ___ take up cycling.", "to / for / -", "to"),
            ("The coach advised him ___ rest.", "to / for / -", "to"),
        ],
        "b": [
            ("My parents allowed me ___ camp overnight.", "to / for / -", "to"),
            ("She persuaded him ___ try rock climbing.", "to / for / -", "to"),
            ("Would you like me ___ help you?", "to / for / -", "to"),
            ("The guide told the group ___ follow the path.", "to / for / -", "to"),
            ("He wants his friends ___ join the trip.", "to / for / -", "to"),
        ],
        "c": [
            ("*She convinced me join the team.*", "She convinced me **to join** the team."),
            ("*He asked her for wait.*", "He asked her **to wait**."),
            ("*They told us to don't shout.*", "They told us **not to shout**."),
            ("*I want that my sister takes photos.*", "I want my sister **to take** photos."),
            ("*She allowed me camp there.*", "She allowed me **to camp** there."),
        ],
    },
    5: {
        "a": [
            ("I wish I ___ started revising earlier.", "have / had / has", "had"),
            ("By Friday she ___ have submitted both essays.", "will / is / would", "will"),
            ("She enjoys ___ case studies.", "analyse / analysing / to analyse", "analysing"),
            ("Her professor persuaded her ___ present.", "to / for / -", "to"),
            ("If I had read the guide, I ___ understand now.", "will / would / am", "would"),
        ],
        "b": [
            ("___ reviewed units 1–4, she feels ready.", "Having / Have / Had", "Having"),
            ("He avoids ___ tasks until the last day.", "leave / leaving / to leave", "leaving"),
            ("I am going to ___ the draft tonight.", "finish / finishing / to finish", "finish"),
            ("I wish we ___ more time for leisure.", "have / had / would have", "had"),
            ("She told him ___ check the data again.", "to / for / -", "to"),
        ],
        "c": [
            ("*By Friday I will submit both essays.*", "By Friday I **will have submitted** both essays."),
            ("*I wish I have more discipline.*", "I wish I **had** more discipline."),
            ("*She enjoys to analyse data.*", "She enjoys **analysing** data."),
            ("*Having review the notes, she left.*", "Having **reviewed** the notes, she left."),
            ("*If she studied B1, she would pass now.*", "If she **had studied** B1, she **would pass** now."),
        ],
    },
    6: {
        "a": [
            ("I wish I ___ calmer before exams.", "am / were / had been", "were"),
            ("If only I ___ told her the truth!", "tell / told / had told", "had told"),
            ("I wish my neighbours ___ stop playing loud music.", "will / would / can", "would"),
            ("I wish I ___ express my feelings better.", "can / could / will", "could"),
            ("She wishes she ___ more sleep last night.", "gets / got / had got", "had got"),
        ],
        "b": [
            ("If only you ___ here now!", "are / were / had been", "were"),
            ("I wish he ___ so shy.", "isn't / weren't / hadn't been", "weren't"),
            ("She regrets ___ silent for so long.", "stay / staying / to stay", "staying"),
            ("I wish they ___ me about the problem.", "tell / told / had told", "had told"),
            ("If only it ___ stop raining!", "will / would / can", "would"),
        ],
        "c": [
            ("*I wish I am taller.*", "I wish I **were** taller."),
            ("*If only you tell me earlier.*", "If only you **had told** me earlier."),
            ("*I wish they will be quiet.*", "I wish they **would** be quiet."),
            ("*She wishes she can dance.*", "She wishes she **could** dance."),
            ("*I wish I have slept more.*", "I wish I **had slept** more."),
        ],
    },
    7: {
        "a": [
            ("I would rather ___ at home this year.", "stay / to stay / staying", "stay"),
            ("She would prefer ___ by train.", "travel / to travel / travelling", "to travel"),
            ("It is high time we ___ our cousins.", "visit / visited / visiting", "visited"),
            ("I would rather my sister ___ early.", "comes / came / come", "came"),
            ("He would rather not ___ abroad alone.", "travel / to travel / travelling", "travel"),
        ],
        "b": [
            ("Would you rather ___ or fly?", "drive / to drive / driving", "drive"),
            ("I would prefer tea ___ coffee.", "to / than / over", "to"),
            ("It is about time he ___ a job.", "find / found / finding", "found"),
            ("She would rather her parents ___ with them.", "stay / stayed / staying", "stayed"),
            ("I'd rather you ___ tell anyone yet.", "don't / didn't / not", "didn't"),
        ],
        "c": [
            ("*I would rather to stay home.*", "I would rather **stay** home."),
            ("*She would prefer travel by bus.*", "She would prefer **to travel** by bus."),
            ("*It is time we leave.*", "It is time we **left**."),
            ("*I would rather my brother comes early.*", "I would rather my brother **came** early."),
            ("*Would you rather to cook?*", "Would you rather **cook**?"),
        ],
    },
    8: {
        "a": [
            ("If we had left earlier, we ___ stuck now.", "aren't / wouldn't be / won't be", "wouldn't be"),
            ("If I had checked the forecast, I ___ a raincoat.", "pack / would pack / would have packed", "would have packed"),
            ("If she ___ more organised, she would have caught the flight.", "is / were / had been", "were"),
            ("We ___ at the beach now if the ferry hadn't been cancelled.", "are / would be / will be", "would be"),
            ("If he had booked online, he ___ waiting in the queue.", "isn't / wouldn't be / won't be", "wouldn't be"),
        ],
        "b": [
            ("If I ___ taller, I would have joined the team.", "am / were / had been", "were"),
            ("If they had taken a taxi, they ___ here by now.", "are / would be / will be", "would be"),
            ("If she ___ the alarm, she wouldn't be late now.", "sets / set / had set", "had set"),
            ("Mixed: past → present uses ___ in the if-clause.", "past perfect / past simple / will", "past perfect"),
            ("If he were braver, he ___ asked for help yesterday.", "will / would / would have", "would have"),
        ],
        "c": [
            ("*If we left earlier, we wouldn't be stuck.* (mixed)", "If we **had left** earlier, we wouldn't be stuck."),
            ("*If I checked the forecast, I would pack a coat.*", "If I **had checked** the forecast, I **would have packed** a coat."),
            ("*If she was organised, she would have caught it.*", "If she **were** organised, she **would have caught** it."),
            ("*If he had booked, he isn't waiting.*", "If he **had booked**, he **wouldn't be** waiting."),
            ("*If I am taller, I would have joined.*", "If I **were** taller, I **would have joined**."),
        ],
    },
    9: {
        "a": [
            ("___ by the noise, residents protested.", "Disturbing / Disturbed / Having disturb", "Disturbed"),
            ("___ planted trees, the council cut pollution.", "Having / Have / Had", "Having"),
            ("___ through the park, I saw less litter.", "Walk / Walking / Walked", "Walking"),
            ("___ by the results, schools joined the programme.", "Encourage / Encouraged / Encouraging", "Encouraged"),
            ("___ finished the audit, experts made recommendations.", "Having / Have / Had", "Having"),
        ],
        "b": [
            ("-ing clause = usually ___ meaning.", "active / passive / past", "active"),
            ("-ed clause = usually ___ meaning.", "passive / active / future", "passive"),
            ("Having + pp = action ___ the main verb.", "before / after / during", "before"),
            ("Same ___ in both clauses.", "subject / object / tense", "subject"),
            ("Disturbed by… = cláusula ___", "-ed / -ing / infinitive", "-ed"),
        ],
        "c": [
            ("*Disturbing by noise, they protested.*", "**Disturbed** by noise, they protested."),
            ("*Having plant trees, air improved.*", "Having **planted** trees, air improved."),
            ("*Walked through the park, I noticed birds.*", "**Walking** through the park, I noticed birds."),
            ("*Encouraging by reports, the mayor acted.*", "**Encouraged** by reports, the mayor acted."),
            ("*Having finish the audit, they left.*", "Having **finished** the audit, they left."),
        ],
    },
    10: {
        "a": [
            ("I wish I ___ booked the tickets earlier.", "have / had / has", "had"),
            ("I would rather ___ by train than fly.", "travel / to travel / travelling", "travel"),
            ("If we had left earlier, we ___ at the museum now.", "are / would be / will be", "would be"),
            ("___ read the guide, we chose the eco tour.", "Having / Have / Had", "Having"),
            ("It is time we ___ our carbon footprint.", "reduce / reduced / reducing", "reduced"),
        ],
        "b": [
            ("I wish my brother ___ help more at home.", "will / would / can", "would"),
            ("She would prefer ___ with family.", "celebrate / to celebrate / celebrating", "to celebrate"),
            ("If only they ___ the early bus!", "take / took / had taken", "had taken"),
            ("___ by the campaign, they recycle more.", "Encourage / Encouraged / Encouraging", "Encouraged"),
            ("I'd rather you ___ drive so fast.", "don't / didn't / not", "didn't"),
        ],
        "c": [
            ("*I wish I have booked earlier.*", "I wish I **had booked** earlier."),
            ("*I would rather to travel by bus.*", "I would rather **travel** by bus."),
            ("*If we leave early, we would be there now.*", "If we **had left** early, we **would be** there now."),
            ("*Having read, we chose the tour.* (add pp)", "Having **read** the guide, we chose the tour."),
            ("*It is time we reduce emissions.*", "It is time we **reduced** emissions."),
        ],
    },
}

VOCAB = {
    1: {
        "a": [
            ("self-discipline", "autodisciplina · aeropuerto · billete", "autodisciplina"),
            ("set goals", "fijar objetivos · posponer · cancelar", "fijar objetivos"),
            ("personal growth", "crecimiento personal · clima · equipaje", "crecimiento personal"),
            ("regret", "arrepentirse · reservar · despegar", "arrepentirse"),
            ("motivated by", "motivado por · cansado de · alejado de", "motivado por"),
        ],
        "b": [
            ("take up ≈ ___", "empezar (actividad) / dejar / posponer", "empezar (actividad)"),
            ("give up ≈ ___", "dejar (hábito) / empezar / reservar", "dejar (hábito)"),
            ("achieve ≈ ___", "lograr / olvidar / retrasar", "lograr"),
            ("mindset ≈ ___", "mentalidad / horario / pasaporte", "mentalidad"),
            ("commit to ≈ ___", "comprometerse con / cancelar / posponer", "comprometerse con"),
        ],
    },
    2: {
        "a": [
            ("deadline", "fecha límite · ascenso · nómina", "fecha límite"),
            ("quarterly report", "informe trimestral · vuelo · maleta", "informe trimestral"),
            ("negotiate", "negociar · despegar · hacer la maleta", "negociar"),
            ("target", "objetivo · pasaporte · embarque", "objetivo"),
            ("approve", "aprobar · cancelar · posponer", "aprobar"),
        ],
        "b": [
            ("by next month = ___", "antes de / durante / después de", "antes de"),
            ("exceed ≈ ___", "superar / perder / retrasar", "superar"),
            ("board meeting ≈ ___", "reunión de dirección / fiesta / vacaciones", "reunión de dirección"),
            ("commute ≈ ___", "desplazamiento al trabajo / equipaje / billete", "desplazamiento al trabajo"),
            ("as soon as ≈ ___", "tan pronto como / aunque / hasta que", "tan pronto como"),
        ],
    },
    3: {
        "a": [
            ("lecture", "clase magistral · maleta · billete", "clase magistral"),
            ("scholarship", "beca · ascenso · nómina", "beca"),
            ("deadline", "fecha límite · embarque · pasaporte", "fecha límite"),
            ("major in", "especializarse en · cancelar · posponer", "especializarse en"),
            ("procrastinate", "procrastinar · despegar · reservar", "procrastinar"),
        ],
        "b": [
            ("enrol ≈ ___", "matricularse / graduarse / suspender", "matricularse"),
            ("seminar ≈ ___", "seminario / aeropuerto / equipaje", "seminario"),
            ("tuition ≈ ___", "matrícula (universidad) / billete / maleta", "matrícula (universidad)"),
            ("assignment ≈ ___", "tarea / vuelo / pasaporte", "tarea"),
            ("revise ≈ ___", "repasar / posponer / cancelar", "repasar"),
        ],
    },
    4: {
        "a": [
            ("hiking", "senderismo · nómina · informe", "senderismo"),
            ("birdwatching", "observación de aves · ascenso · beca", "observación de aves"),
            ("trail", "sendero · aeropuerto · equipaje", "sendero"),
            ("camp overnight", "acampar una noche · posponer / cancelar", "acampar una noche"),
            ("take up", "empezar (actividad) · dejar · retrasar", "empezar (actividad)"),
        ],
        "b": [
            ("leisure ≈ ___", "tiempo libre / trabajo / tráfico", "tiempo libre"),
            ("convince ≈ ___", "convencer / cancelar / posponer", "convencer"),
            ("persuade ≈ ___", "persuadir / olvidar / retrasar", "persuadir"),
            ("equipment ≈ ___", "equipo material / pasaporte / billete", "equipo material"),
            ("join a club ≈ ___", "unirse a un club / despegar / embarcar", "unirse a un club"),
        ],
    },
    5: {
        "a": [
            ("revision plan", "plan de repaso · maleta · vuelo", "plan de repaso"),
            ("thesis", "tesis · pasaporte · equipaje", "tesis"),
            ("case study", "caso práctico · billete · embarque", "caso práctico"),
            ("submit", "entregar / posponer / cancelar", "entregar"),
            ("conference", "conferencia · aeropuerto / ascenso", "conferencia"),
        ],
        "b": [
            ("integrate ≈ ___", "integrar / posponer / cancelar", "integrar"),
            ("review map ≈ ___", "mapa de repaso / billete / maleta", "mapa de repaso"),
            ("mixed exercises ≈ ___", "ejercicios mixtos / solo listening / solo vocab", "ejercicios mixtos"),
            ("persuade + obj + to = ___", "verbo + objeto + infinitivo / gerundio solo", "verbo + objeto + infinitivo"),
            ("future perfect = ___", "will have + pp / will + inf / going to", "will have + pp"),
        ],
    },
    6: {
        "a": [
            ("anxious", "ansioso · aliviado · orgulloso", "ansioso"),
            ("calm", "tranquilo · furioso · celoso", "tranquilo"),
            ("express feelings", "expresar sentimientos · reservar · posponer", "expresar sentimientos"),
            ("apologise", "disculparse · cancelar · despegar", "disculparse"),
            ("flatmate", "compañero/a de piso · pasajero · guía", "compañero/a de piso"),
        ],
        "b": [
            ("relieved ≈ ___", "aliviado / avergonzado / furioso", "aliviado"),
            ("frustrated ≈ ___", "frustrado / agradecido / emocionado", "frustrado"),
            ("embarrassed ≈ ___", "avergonzado / seguro / calmado", "avergonzado"),
            ("if only ≈ ___", "ojalá (más enfático) / porque / aunque", "ojalá (más enfático)"),
            ("wish + would = ___", "queja / deseo pasado / certeza", "queja"),
        ],
    },
    7: {
        "a": [
            ("grandparents", "abuelos · vecinos · colegas", "abuelos"),
            ("gathering", "reunión familiar · vuelo · maleta", "reunión familiar"),
            ("relative", "pariente · pasajero · guía", "pariente"),
            ("decorate", "decorar · cancelar · posponer", "decorar"),
            ("celebrate", "celebrar · posponer / retrasar", "celebrar"),
        ],
        "b": [
            ("would rather ≈ ___", "preferiría / debería / podría", "preferiría"),
            ("would prefer ≈ ___", "preferiría (con to) / odiaría / debería", "preferiría (con to)"),
            ("it's high time ≈ ___", "ya es hora de / nunca / tal vez", "ya es hora de"),
            ("nuclear family ≈ ___", "familia nuclear / familia extendida / solo amigos", "familia nuclear"),
            ("extended family ≈ ___", "familia extendida / familia nuclear / vecinos", "familia extendida"),
        ],
    },
    8: {
        "a": [
            ("connecting flight", "vuelo de conexión · beca · tesis", "vuelo de conexión"),
            ("excess baggage", "equipaje de más · ascenso · nómina", "equipaje de más"),
            ("embassy", "embajada · aeropuerto · sendero", "embajada"),
            ("forecast", "previsión (tiempo) · billete · maleta", "previsión (tiempo)"),
            ("cancelled", "cancelado · aprobado · reservado", "cancelado"),
        ],
        "b": [
            ("boarding ≈ ___", "embarque / equipaje / pasaporte", "embarque"),
            ("lounge ≈ ___", "sala VIP / calle / bosque", "sala VIP"),
            ("delay ≈ ___", "retraso / ascenso / beca", "retraso"),
            ("mixed conditional ≈ ___", "mezcla de tiempos condicionales / solo presente", "mezcla de tiempos condicionales"),
            ("if + past perfect → would + base = ___", "pasado irreal → presente / futuro real", "pasado irreal → presente"),
        ],
    },
    9: {
        "a": [
            ("pollution", "contaminación · ascenso · nómina", "contaminación"),
            ("recycling", "reciclaje · billete · maleta", "reciclaje"),
            ("solar panels", "paneles solares · pasaporte · embarque", "paneles solares"),
            ("litter", "basura tirada · equipaje / vuelo", "basura tirada"),
            ("carbon footprint", "huella de carbono · beca · tesis", "huella de carbono"),
        ],
        "b": [
            ("sustainable ≈ ___", "sostenible / barato / ruidoso", "sostenible"),
            ("renewable ≈ ___", "renovable / cancelado / retrasado", "renovable"),
            ("single-use ≈ ___", "de un solo uso / reutilizable / permanente", "de un solo uso"),
            ("audit ≈ ___", "auditoría / fiesta / vacaciones", "auditoría"),
            ("volunteer ≈ ___", "voluntario / pasajero / guía turístico", "voluntario"),
        ],
    },
    10: {
        "a": [
            ("eco-friendly", "ecológico · ruidoso · caro", "ecológico"),
            ("queue", "cola / fila · maleta · billete", "cola / fila"),
            ("carbon footprint", "huella de carbono · ascenso · beca", "huella de carbono"),
            ("feelings", "sentimientos · equipaje · pasaporte", "sentimientos"),
            ("module review", "repaso de módulo · vuelo · embarque", "repaso de módulo"),
        ],
        "b": [
            ("wish + past perfect = ___", "arrepentimiento pasado / plan futuro", "arrepentimiento pasado"),
            ("would rather + bare inf = ___", "preferencia / obligación / imposibilidad", "preferencia"),
            ("mixed conditional = ___", "mezcla de condicionales / solo zero", "mezcla de condicionales"),
            ("participle clause = ___", "frase reducida con participio / pregunta", "frase reducida con participio"),
            ("it's time + past = ___", "debería haber pasado ya / futuro seguro", "debería haber pasado ya"),
        ],
    },
}

READ_Q = {
    1: [
        ("Who regret not finishing courses?", "Nina", "Nina / James / Sofia"),
        ("What does she wish about discipline?", "had been more disciplined", "had been more disciplined / will study / can fly"),
        ("Motivated by what?", "a podcast", "a podcast / rain / a flight"),
        ("Mixed conditional in text?", "If she had studied… she would understand", "yes / no"),
        ("Participle: Having completed…", "diagnostic test", "diagnostic test / airport / hotel"),
        ("Encouraged by what?", "her progress", "progress / traffic / rain"),
        ("Plans to join what?", "study group", "study group / hiking club / embassy"),
        ("Structure for past regret?", "wish + past perfect", "wish + past perfect / will / going to"),
        ("Structure for mixed?", "if + past perfect, would + base", "mixed / only first / only zero"),
        ("Went to study group already?", "False", "False / True"),
        ("Underline 2× wish / if only.", "See text", "(open)"),
        ("Write one mixed conditional.", "Model OK", "(open)"),
        ("Key vocab?", "discipline, goals, progress", "yes / none"),
        ("Tone?", "motivated", "motivated / angry / empty"),
        ("Course link", "/curso-b2/unit-1", "/curso-b2/unit-1"),
    ],
    2: [
        ("James works in ___", "finance", "finance / education / travel"),
        ("By end of quarter he will have ___", "delivered three projects", "delivered three projects / flown / camped"),
        ("Going to negotiate a ___", "raise", "raise / ticket / trail"),
        ("Evidence for rain?", "dark clouds", "dark clouds / sunny sky / snow"),
        ("Will call when report is ___", "approved", "approved / cancelled / lost"),
        ("Video call when?", "tomorrow at ten", "tomorrow at ten / last year / never"),
        ("Future perfect example?", "will have delivered", "will have delivered / will deliver / delivered"),
        ("Going to for evidence?", "it is going to storm", "yes / no"),
        ("Already negotiated raise?", "False", "False / True"),
        ("Find will / going to / future perfect.", "See text", "(open)"),
        ("Write By + time + will have…", "Model OK", "(open)"),
        ("Work vocab in text?", "report, target, negotiate", "yes / none"),
        ("Main idea?", "work futures", "work futures / travel / feelings"),
        ("Fixed plan structure?", "present continuous", "present continuous / past perfect / wish"),
        ("Course link", "/curso-b2/unit-2", "/curso-b2/unit-2"),
    ],
    3: [
        ("Sofia enjoys ___", "attending seminars", "attending / to attend / attend"),
        ("Avoids missing ___", "deadlines", "deadlines / flights / relatives"),
        ("Decided to ___", "major in biology", "major / majoring / majored"),
        ("Stopped checking phone and started ___", "taking notes", "taking / take / to take"),
        ("Tutor advised her to ___", "read journals", "read / reading / reads"),
        ("Mind + ___ structure?", "gerund", "gerund / infinitive / past"),
        ("Agreed to ___", "mentor students", "mentor / mentoring / mentored"),
        ("Stop + -ing vs stop + to?", "stopped checking (dejar) / started taking", "both in text"),
        ("Already graduated?", "False", "False / True"),
        ("Underline enjoy / avoid / decide.", "See text", "(open)"),
        ("Write enjoy + gerund sentence.", "Model OK", "(open)"),
        ("Education vocab?", "seminars, deadlines, major", "yes / none"),
        ("Main topic?", "study habits", "study habits / travel / family"),
        ("Would you mind + ?", "gerund", "gerund / infinitive / past"),
        ("Course link", "/curso-b2/unit-3", "/curso-b2/unit-3"),
    ],
    4: [
        ("Friend convinced Leo to try ___", "rock climbing", "rock climbing / cooking / sleeping"),
        ("Asked him to ___ equipment", "book", "book / booking / booked"),
        ("Told him to ___ early", "arrive", "arrive / arriving / arrived"),
        ("Wants sister to take up ___", "photography", "photography / finance / pollution"),
        ("Parents allowed them to ___", "travel alone", "travel alone / stay home / skip class"),
        ("Convince + obj + ?", "to + infinitive", "to + inf / gerund / past"),
        ("Would like friends to ___", "join cycling club", "join / joining / joined"),
        ("Leisure vocab?", "climbing, camping, cycling", "yes / none"),
        ("Structure tell + obj + to?", "yes in text", "yes / no"),
        ("Already joined photography?", "Not stated / implied wanting", "False / True / not stated"),
        ("Write convince + obj + to.", "Model OK", "(open)"),
        ("Write ask + obj + to.", "Model OK", "(open)"),
        ("Main idea?", "leisure & persuasion", "leisure / work / environment"),
        ("Allowed + obj + to example?", "allowed them to travel", "(open)"),
        ("Course link", "/curso-b2/unit-4", "/curso-b2/unit-4"),
    ],
    5: [
        ("Emma wishes she had started ___", "revision plan", "revision plan / flight / hike"),
        ("By Friday will have ___", "submitted two essays", "submitted / submit / submitting"),
        ("Enjoys ___ case studies", "analysing", "analysing / analyse / to analyse"),
        ("Persuaded her to ___", "present at conference", "present / presenting / presented"),
        ("Having revised units ___", "one to four", "one to four / six to nine / none"),
        ("Mixed grammar review?", "yes", "yes / no"),
        ("Avoids leaving tasks until ___", "last minute", "last minute / next year / never"),
        ("Future perfect in text?", "will have submitted", "yes / no"),
        ("Feels ready?", "True", "True / False"),
        ("Find wish / future / gerund / obj+inf.", "See text", "(open)"),
        ("Write one sentence from each U1–4 topic.", "Model OK", "(open)"),
        ("Review vocab?", "thesis, conference, revision", "yes / none"),
        ("Main idea?", "integrated review U1–4", "review / only travel / only feelings"),
        ("Participle clause?", "Having revised…", "(open)"),
        ("Course link", "/curso-b2/unit-5", "/curso-b2/unit-5"),
    ],
    6: [
        ("Maya wishes she were ___", "braver", "braver / taller / richer"),
        ("If only she had ___ sooner", "apologised", "apologised / travelled / cooked"),
        ("Wishes flatmate would ___", "turn down music", "turn down music / travel / cook"),
        ("Wishes she could ___ better", "sleep", "sleep / fly / negotiate"),
        ("Regretting silence, she ___", "wrote a message", "wrote a message / flew / camped"),
        ("Wish + were = present ___", "unreal", "unreal / real / past fact"),
        ("If only + past perfect = ___", "past regret", "past regret / future plan / zero"),
        ("Wish + would = ___", "complaint / change", "complaint / past regret"),
        ("Already apologised in person?", "False", "False / True"),
        ("Underline wish / if only.", "See text", "(open)"),
        ("Write wish + could.", "Model OK", "(open)"),
        ("Feelings vocab?", "anxious, braver, silence", "yes / none"),
        ("Friendship would be stronger if ___", "she had apologised", "(open)"),
        ("Main idea?", "expressing feelings", "feelings / work / travel"),
        ("Course link", "/curso-b2/unit-6", "/curso-b2/unit-6"),
    ],
    7: [
        ("Tom would rather ___ at home", "cook", "cook / to cook / cooking"),
        ("Would prefer celebration with ___", "close relatives", "close relatives / strangers / nobody"),
        ("It is high time they ___ cousins", "called", "called / call / calling"),
        ("Would rather brother helped with ___", "decorations", "decorations / flights / reports"),
        ("Mother would prefer party in ___", "garden", "garden / airport / office"),
        ("Rather + bare inf?", "yes", "yes / no"),
        ("Prefer + to inf?", "yes", "yes / no"),
        ("It's time + past = ?", "should have happened", "should have happened / future certain"),
        ("Called cousins recently?", "False (three years)", "False / True"),
        ("Find would rather / prefer / it's time.", "See text", "(open)"),
        ("Write would rather + subject + past.", "Model OK", "(open)"),
        ("Family vocab?", "cousins, relatives, gathering", "yes / none"),
        ("Main idea?", "family preferences", "family / travel / environment"),
        ("Rather not eat in noisy ___", "restaurant", "restaurant / park / trail"),
        ("Course link", "/curso-b2/unit-7", "/curso-b2/unit-7"),
    ],
    8: [
        ("If Clara had left lounge earlier, she would be ___", "boarding", "boarding / hiking / cooking"),
        ("If she had checked passport, she wouldn't wait at ___", "embassy", "embassy / gym / library"),
        ("If partner were better at packing, they'd avoid ___ fee", "excess baggage", "excess baggage / tuition / scholarship"),
        ("Would be hiking if tour hadn't been cancelled due to ___", "snow", "snow / sun / wind"),
        ("Mixed: past perfect → ___", "present result", "present result / past only / zero"),
        ("If she were better at packing = ___ conditional mix", "present → past", "present → past / past → present"),
        ("Travel problems?", "passport, queue, cancellation", "yes / none"),
        ("At the beach now?", "False", "False / True"),
        ("Underline mixed conditionals.", "See text", "(open)"),
        ("Write If I had…, I would… now.", "Model OK", "(open)"),
        ("Travel vocab?", "boarding, embassy, baggage", "yes / none"),
        ("Main idea?", "travel gone wrong", "travel / education / family"),
        ("Second part uses would + ?", "base / have + pp", "base (now)"),
        ("Course link", "/curso-b2/unit-8", "/curso-b2/unit-8"),
    ],
    9: [
        ("Disturbed by ___, citizens demanded transport", "pollution", "pollution / music / homework"),
        ("Having installed ___, school cut bills", "solar panels", "solar panels / tickets / essays"),
        ("Walking along river, volunteers collected ___", "litter", "litter / luggage / reports"),
        ("Encouraged by ___, mayor promised ban", "international reports", "reports / rain / flights"),
        ("Having finished ___, experts recommended rules", "audit", "audit / flight / party"),
        ("-ed clause example?", "Disturbed by…", "Disturbed by… / Walking… / Having…"),
        ("-ing clause example?", "Walking along…", "Walking… / Disturbed…"),
        ("Having + pp = action ___ main verb", "before", "before / after / never"),
        ("Already banned plastics?", "promised (not done yet)", "False / promised"),
        ("Underline participle clauses.", "See text", "(open)"),
        ("Write Having + pp sentence.", "Model OK", "(open)"),
        ("Environment vocab?", "pollution, recycling, litter", "yes / none"),
        ("Main idea?", "local green action", "environment / work / family"),
        ("Same subject in clauses?", "yes", "yes / no"),
        ("Course link", "/curso-b2/unit-9", "/curso-b2/unit-9"),
    ],
    10: [
        ("Olivia wishes she had listened to ___", "travel podcast", "travel podcast / cooking show / nothing"),
        ("Would rather take ___ than fly short distances", "train", "train / taxi / boat"),
        ("If they had left earlier, they wouldn't be ___", "queuing", "queuing / hiking / sleeping"),
        ("Having joined green group, they recycle ___", "more", "more / less / never"),
        ("It is time they talked about ___", "feelings and plans", "feelings / flights only / nothing"),
        ("Review covers units ___", "6–9", "6–9 / 1–4 / 11–15"),
        ("Find wish.", "I wish I had listened…", "(open)"),
        ("Find would rather.", "would rather take the train", "(open)"),
        ("Find mixed conditional.", "If they had left… wouldn't be queuing", "(open)"),
        ("Find participle.", "Having joined…", "(open)"),
        ("Find it's time.", "It is time they talked…", "(open)"),
        ("Write 4 sentences: wish, rather, mixed, participle.", "Model OK", "(open)"),
        ("Main idea?", "module 1 review U6–9", "review / only travel / only work"),
        ("Vocab themes?", "feelings, family, travel, environment", "yes / none"),
        ("Course link", "/curso-b2/unit-10", "/curso-b2/unit-10"),
    ],
}

LISTEN_Q = {
    1: [
        ("Who speaks?", "Nina", "Nina / James / Maya"),
        ("Wishes she had started ___", "earlier", "earlier / later / never"),
        ("Regrets wasting time on ___", "social media", "social media / work / travel"),
        ("Motivated by her ___", "coach", "coach / pilot / chef"),
        ("Mixed: If I had taken notes in B1…", "would feel confident now", "yes / no"),
        ("Having finished the first ___", "module", "module / flight / meal"),
        ("Participle: Motivated by…", "coach", "coach / rain / ticket"),
        ("Grammar focus?", "wish, participle, mixed", "wish/participle/mixed / only will"),
        ("Already in study group?", "planning (not yet)", "False / planning"),
        ("Write one I wish I had…", "Model OK", "(open)"),
        ("Write one mixed conditional.", "Model OK", "(open)"),
        ("Shadow full audio.", "done", "(open)"),
        ("Key vocab?", "goals, coach, module", "yes / none"),
        ("Tone?", "reflective & motivated", "reflective / angry"),
        ("Open Ver solución after try.", "yes", "yes"),
    ],
    2: [
        ("Who speaks?", "James", "James / Leo / Ben"),
        ("By next Friday will have ___", "completed the report", "completed / cancelled / lost"),
        ("Going to present on ___", "Monday", "Monday / yesterday / never"),
        ("Evidence: it is going to ___", "rain", "rain / snow / shine"),
        ("Will take an ___", "umbrella", "umbrella / passport / thesis"),
        ("Will let you know when he sends ___", "final version", "final version / luggage / ticket"),
        ("Future perfect phrase?", "will have completed", "yes / no"),
        ("Going to for plan?", "present to board", "yes / no"),
        ("Already presented?", "False", "False / True"),
        ("Write By + will have…", "Model OK", "(open)"),
        ("Write going to with evidence.", "Model OK", "(open)"),
        ("Shadow audio.", "done", "(open)"),
        ("Work vocab?", "report, board, version", "yes / none"),
        ("Spontaneous promise?", "will let you know", "(open)"),
        ("Open Ver solución.", "yes", "yes"),
    ],
    3: [
        ("Who speaks?", "Sofia", "Sofia / Clara / Olivia"),
        ("Enjoys ___ lectures", "attending", "attending / to attend"),
        ("Avoids ___ classes", "skipping", "skipping / attending"),
        ("Decided to apply for ___", "scholarship", "scholarship / visa / ticket"),
        ("Mind + ___ the window?", "opening", "opening / open / to open"),
        ("Stopped procrastinating and started ___", "revising", "revising / flying / camping"),
        ("Agreed to help with ___", "research project", "research / travel / cooking"),
        ("Gerund after enjoy?", "yes", "yes / no"),
        ("Already got scholarship?", "Not stated", "unknown / yes / no"),
        ("Write enjoy + gerund.", "Model OK", "(open)"),
        ("Write decide + to inf.", "Model OK", "(open)"),
        ("Shadow audio.", "done", "(open)"),
        ("Education vocab?", "lectures, scholarship, revising", "yes / none"),
        ("Stop + -ing example?", "stopped procrastinating", "(open)"),
        ("Open Ver solución.", "yes", "yes"),
    ],
    4: [
        ("Who speaks?", "Leo", "Leo / Tom / James"),
        ("Convinced to join ___ club", "hiking", "hiking / cooking / chess"),
        ("Asked to bring a ___", "map", "map / thesis / umbrella"),
        ("Told to meet at the ___", "trail", "trail / airport / office"),
        ("Wants brother to take up ___", "birdwatching", "birdwatching / finance / law"),
        ("Parents allowed to ___ overnight", "camp", "camp / fly / skip"),
        ("Structure convince + obj + to?", "yes", "yes / no"),
        ("Leisure focus?", "outdoor hobbies", "outdoor / office / embassy"),
        ("Already camping?", "last month joined club", "False / joined club"),
        ("Write ask + obj + to.", "Model OK", "(open)"),
        ("Write want + obj + to.", "Model OK", "(open)"),
        ("Shadow audio.", "done", "(open)"),
        ("Vocab?", "hiking, trail, birdwatching", "yes / none"),
        ("Tell + obj + to example?", "told me to meet", "(open)"),
        ("Open Ver solución.", "yes", "yes"),
    ],
    5: [
        ("Who speaks?", "Emma", "Emma / Nina / Maya"),
        ("Wishes joined ___ sooner", "gym", "gym / embassy / trail"),
        ("By June will have finished ___", "thesis", "thesis / flight / map"),
        ("Enjoys reading ___ papers", "academic", "academic / flight / cooking"),
        ("Advised to submit ___ early", "draft", "draft / luggage / ticket"),
        ("Having reviewed the ___", "data", "data / weather / music"),
        ("Mixed U1–4 grammar?", "yes", "yes / no"),
        ("Feels ready?", "yes", "yes / no"),
        ("Persuaded to ___", "present", "present / cancel / sleep"),
        ("Write one wish + past perfect.", "Model OK", "(open)"),
        ("Write one future perfect.", "Model OK", "(open)"),
        ("Shadow audio.", "done", "(open)"),
        ("Review vocab?", "thesis, draft, data", "yes / none"),
        ("Gerund after enjoy?", "reading", "(open)"),
        ("Open Ver solución.", "yes", "yes"),
    ],
    6: [
        ("Who speaks?", "Maya", "Maya / Sofia / Clara"),
        ("Wishes she were ___ before exams", "calmer", "calmer / taller / richer"),
        ("If only had told friend about ___", "feelings", "feelings / flights / food"),
        ("Would not have ___", "argued", "argued / travelled / cooked"),
        ("Wishes neighbours would stop ___", "loud music", "loud music / raining / working"),
        ("Wishes could express ___", "feelings", "feelings / luggage / reports"),
        ("Wish + were = present unreal?", "yes", "yes / no"),
        ("If only + past perfect?", "yes", "yes / no"),
        ("Already told friend?", "False (regret)", "False / True"),
        ("Write wish + would.", "Model OK", "(open)"),
        ("Write if only + past perfect.", "Model OK", "(open)"),
        ("Shadow audio.", "done", "(open)"),
        ("Feelings vocab?", "anxious, argued, feelings", "yes / none"),
        ("Wish + could example?", "wish I could express", "(open)"),
        ("Open Ver solución.", "yes", "yes"),
    ],
    7: [
        ("Who speaks?", "Tom", "Tom / Leo / Ben"),
        ("Would rather spend holiday with ___", "grandparents", "grandparents / boss / strangers"),
        ("Would prefer to stay ___", "at home", "at home / abroad / at office"),
        ("It is high time they ___ aunt", "visited", "visited / visit / visiting"),
        ("Not seen aunt for ___ years", "two", "two / ten / zero"),
        ("Would rather sister came to help with ___", "cooking", "cooking / flying / reporting"),
        ("Rather + bare inf?", "stay", "yes / no"),
        ("Prefer + to?", "to stay", "yes / no"),
        ("It's time + past?", "visited", "yes / no"),
        ("Already visited aunt?", "False", "False / True"),
        ("Write would rather + inf.", "Model OK", "(open)"),
        ("Write it's time + past.", "Model OK", "(open)"),
        ("Shadow audio.", "done", "(open)"),
        ("Family vocab?", "grandparents, aunt, sister", "yes / none"),
        ("Would rather my sister ___", "came", "(open)"),
        ("Open Ver solución.", "yes", "yes"),
    ],
    8: [
        ("Who speaks?", "Clara", "Clara / Olivia / Emma"),
        ("If had left hotel earlier, wouldn't be stuck in ___", "traffic", "traffic / snow / class"),
        ("If had checked forecast, would have packed ___", "raincoat", "raincoat / thesis / map"),
        ("If she were organised, would have caught ___", "connecting flight", "connecting flight / bus / meal"),
        ("Would be at beach if ferry not ___", "cancelled", "cancelled / approved / booked"),
        ("Mixed conditional focus?", "past → present", "past → present / only second"),
        ("Travel context?", "yes", "yes / no"),
        ("At beach now?", "False", "False / True"),
        ("Write If I had…, I would… now.", "Model OK", "(open)"),
        ("Write If she were…, she would have…", "Model OK", "(open)"),
        ("Shadow audio.", "done", "(open)"),
        ("Travel vocab?", "traffic, raincoat, ferry", "yes / none"),
        ("Past perfect in if-clause?", "yes", "yes / no"),
        ("Open Ver solución.", "yes", "yes"),
    ],
    9: [
        ("Who speaks?", "Ben", "Ben / James / Tom"),
        ("Disturbed by noise from ___", "factory", "factory / school / airport"),
        ("Residents ___ last week", "protested", "protested / travelled / slept"),
        ("Having planted trees, council improved ___", "air quality", "air quality / luggage / grades"),
        ("Walking through park, noticed fewer ___ bottles", "plastic", "plastic / glass / metal"),
        ("Encouraged by results, ___ joined programme", "schools", "schools / flights / bosses"),
        ("-ed participle clause?", "Disturbed by…", "yes / no"),
        ("Having + pp?", "Having planted…", "yes / no"),
        ("Protest because of pollution?", "True", "True / False"),
        ("Write -ing clause.", "Model OK", "(open)"),
        ("Write Having + pp clause.", "Model OK", "(open)"),
        ("Shadow audio.", "done", "(open)"),
        ("Environment vocab?", "pollution, recycling, plastic", "yes / none"),
        ("Same subject in clauses?", "yes", "yes / no"),
        ("Open Ver solución.", "yes", "yes"),
    ],
    10: [
        ("Who speaks?", "Olivia", "Olivia / Nina / Maya"),
        ("Wishes had booked ___ earlier", "tickets", "tickets / hotel / flight"),
        ("Missed the ___", "concert", "concert / exam / flight"),
        ("Would rather travel by ___", "train", "train / plane / boat"),
        ("If had taken early bus, would be at ___", "museum", "museum / beach / office"),
        ("Having read the guide, chose ___ tour", "eco-friendly", "eco-friendly / luxury / random"),
        ("It's time reduced ___ footprint", "carbon", "carbon / luggage / noise"),
        ("Review grammar U6–9?", "yes", "yes / no"),
        ("At museum now?", "False (missed concert/bus)", "False / True"),
        ("Find wish / rather / mixed / participle / it's time.", "See script", "(open)"),
        ("Write one sentence each structure.", "Model OK", "(open)"),
        ("Shadow audio.", "done", "(open)"),
        ("Mixed vocab themes?", "travel, environment, feelings", "yes / none"),
        ("Module 1 complete after U10?", "yes", "yes / no"),
        ("Open Ver solución.", "yes", "yes"),
    ],
}

WRITE = {
    1: (
        [
            "Escribe 2 frases con *I wish I had…* (arrepentimiento).",
            "Completa: I wish I ___ (study) harder last year.",
            "Completa: If only she ___ (tell) me the truth.",
            "Completa: ___ by her mentor, she applied for the course.",
            "Escribe un mixed conditional sobre tu progreso en inglés.",
            "Completa: Having ___ (finish) the test, she relaxed.",
            "Usa *regret + gerund* en una frase.",
            "Corrige: *I wish I have more time.*",
            "Corrige: *Motivating by the coach, she signed up.*",
            "Párrafo (4 frases): metas de desarrollo personal.",
            "Traduce: Ojalá hubiera empezado antes.",
            "Traduce: Si hubiera practicado más, entendería mejor ahora.",
            "Escribe *I wish they would…* (queja educada).",
            "Participle clause: *Encouraged by…, I…*",
            "Autochequeo: 1× wish, 1× participle, 1× mixed.",
        ],
        [
            "Model: I wish I had started earlier. I wish I had been more consistent.",
            "**had studied**",
            "**had told**",
            "**Motivated**",
            "Open — If I had…, I would… now.",
            "Having **finished**",
            "I regret wasting so much time.",
            "I wish I **had** more time.",
            "**Motivated** by the coach, she signed up.",
            "Open paragraph with goals vocabulary.",
            "I wish I **had started** earlier. / If only I **had started** earlier.",
            "If I **had practised** more, I **would understand** better now.",
            "I wish they **would** reply faster.",
            "Encouraged by my progress, I set new goals.",
            "Self-check vs theory.",
        ],
    ),
    2: (
        [
            "Escribe *By + time + will have + pp* sobre tu trabajo o estudios.",
            "Completa: By next month I ___ (complete) the project.",
            "Completa: Look — it ___ (go) to rain.",
            "Completa: I ___ (let) you know as soon as I hear.",
            "Escribe un plan fijo con present continuous.",
            "Completa: She ___ (go) to apply for the promotion.",
            "Promesa espontánea con *will*.",
            "Predicción con evidencia → *going to*.",
            "Corrige: *By Friday I will finish the report.* (future perfect)",
            "Corrige: *We will have a meeting tomorrow.* (plan fijo)",
            "Párrafo (4 frases) sobre deadlines en el trabajo.",
            "Traduce: Para junio habré terminado el curso.",
            "Traduce: Voy a llamar al cliente — ya tengo el número.",
            "Diálogo corto: will vs going to.",
            "Autochequeo: 1× each future form.",
        ],
        [
            "Model: By December I will have finished my course.",
            "**will have completed**",
            "**is going to** rain",
            "**will** let",
            "Model: We are meeting the team tomorrow at nine.",
            "**is going to** apply",
            "Model: Don't worry — I will help you.",
            "Model: It is going to storm — take an umbrella.",
            "By Friday I **will have finished** the report.",
            "We **are having** a meeting tomorrow.",
            "Open work paragraph.",
            "By June I **will have finished** the course.",
            "I **am going to** call the client — I already have the number.",
            "Open dialogue.",
            "Self-check.",
        ],
    ),
    3: (
        [
            "Escribe 3 frases: enjoy, decide, avoid + forma correcta.",
            "Completa: I enjoy ___ (read) academic articles.",
            "Completa: She decided ___ (apply) for the grant.",
            "Completa: Would you mind ___ (wait) a moment?",
            "Completa: He stopped ___ (procrastinate) and started revising.",
            "Stop + to vs stop + -ing — explica con un ejemplo.",
            "Completa: They agreed ___ (help) with the project.",
            "Corrige: *I enjoy to attend lectures.*",
            "Corrige: *She stopped to smoke.* (= dejó de fumar)",
            "Párrafo sobre hábitos de estudio.",
            "Traduce: Evito perder clases.",
            "Traduce: ¿Te importaría abrir la ventana?",
            "Escribe *regret + gerund*.",
            "Escribe *aim to + inf*.",
            "Autochequeo: gerund vs infinitive.",
        ],
        [
            "Model using enjoy/decide/avoid correctly.",
            "**reading**",
            "**to apply**",
            "**waiting**",
            "stopped **procrastinating**",
            "Stop **smoking** = dejar; stop **to rest** = parar con propósito.",
            "**to help**",
            "I enjoy **attending** lectures.",
            "He stopped **smoking**.",
            "Open study habits paragraph.",
            "I avoid **missing** classes.",
            "Would you mind **opening** the window?",
            "I regret not **studying** harder.",
            "I aim **to finish** my degree by 2027.",
            "Self-check.",
        ],
    ),
    4: (
        [
            "Escribe 4 frases: convince, ask, tell, want + obj + to.",
            "Completa: She convinced me ___ (join) the club.",
            "Completa: He asked her ___ (wait) outside.",
            "Completa: They told us ___ (be) quiet.",
            "Completa: I want my friend ___ (take up) photography.",
            "Completa: My parents allowed me ___ (travel) alone.",
            "Corrige: *She persuaded him join the team.*",
            "Corrige: *He asked me for help her.*",
            "Párrafo sobre un hobby de ocio.",
            "Traduce: Me convenció para que me uniera.",
            "Traduce: Quiero que mi hermana venga conmigo.",
            "Diálogo: ask + tell + want.",
            "Usa *would like + obj + to*.",
            "Usa *advise + obj + to*.",
            "Autochequeo: siempre *to* antes del infinitivo.",
        ],
        [
            "Open — four correct object + infinitive sentences.",
            "**to join**",
            "**to wait**",
            "**to be**",
            "**to take up**",
            "**to travel**",
            "She persuaded him **to join** the team.",
            "He asked me **to help** her.",
            "Open leisure paragraph.",
            "She convinced me **to join**.",
            "I want my sister **to come** with me.",
            "Open dialogue.",
            "I would like you **to join** us.",
            "My tutor advised me **to read** more.",
            "Self-check.",
        ],
    ),
    5: (
        [
            "Una frase de cada: wish, future perfect, gerund, obj + inf, participle.",
            "Completa: I wish I ___ (start) revising earlier.",
            "Completa: By Friday she ___ (submit) both essays.",
            "Completa: She enjoys ___ (analyse) data.",
            "Completa: Her professor persuaded her ___ (present).",
            "Completa: ___ (review) units 1–4, she feels ready.",
            "Mixed conditional sobre B2.",
            "Corrige: *By Friday I will submit both.*",
            "Corrige: *I wish I have more time.*",
            "Mini-historia (5 frases) mezclando U1–4.",
            "Traduce: Ojalá hubiera empezado antes.",
            "Traduce: Para el viernes habrá entregado los ensayos.",
            "Matching: estructura → unidad.",
            "Autochequeo con el mapa U5.",
            "Escribe Having + pp + main clause.",
            "Enlace al curso U5.",
        ],
        [
            "Open — one of each structure from U1–4.",
            "**had started**",
            "**will have submitted**",
            "**analysing**",
            "**to present**",
            "Having **reviewed**",
            "If I **had studied** mixed conditionals, I **would feel** confident now.",
            "By Friday she **will have submitted** both essays.",
            "I wish I **had** more time.",
            "Open mixed paragraph.",
            "I wish I **had started** earlier.",
            "By Friday she **will have submitted** the essays.",
            "wish→U1; future perfect→U2; gerund→U3; obj+inf→U4.",
            "Self-check vs review map.",
            "Having **finished** the exercises, I took a break.",
            "**/curso-b2/unit-5**",
        ],
    ),
    6: (
        [
            "Escribe 2× wish (presente irreal) y 1× if only (pasado).",
            "Completa: I wish I ___ (be) calmer.",
            "Completa: If only I ___ (tell) her sooner!",
            "Completa: I wish they ___ (stop) making noise.",
            "Completa: I wish I ___ (can) sleep better.",
            "Wish + would — queja sobre un vecino.",
            "Regret + gerund en una frase.",
            "Corrige: *I wish I am taller.*",
            "Corrige: *If only you tell me.*",
            "Párrafo sobre expresar emociones.",
            "Traduce: Ojalá pudiera expresarme mejor.",
            "Traduce: Ojalá me lo hubieras dicho antes.",
            "Diálogo con wish / if only.",
            "Diferencia wish vs if only (1 frase).",
            "Autochequeo: past simple vs past perfect after wish.",
        ],
        [
            "Model using wish/if only correctly.",
            "**were**",
            "**had told**",
            "**would stop**",
            "**could**",
            "I wish my neighbours **would** turn down the music.",
            "I regret **staying** silent.",
            "I wish I **were** taller.",
            "If only you **had told** me.",
            "Open feelings paragraph.",
            "I wish I **could** express myself better.",
            "If only you **had told** me earlier.",
            "Open dialogue.",
            "If only is often more emphatic than wish.",
            "Self-check.",
        ],
    ),
    7: (
        [
            "Escribe would rather, would prefer e It's time en contexto familiar.",
            "Completa: I would rather ___ (stay) at home.",
            "Completa: She would prefer ___ (travel) by train.",
            "Completa: It is high time we ___ (visit) our cousins.",
            "Completa: I would rather my brother ___ (help) me.",
            "Would rather not + inf.",
            "Prefer tea ___ coffee.",
            "Corrige: *I would rather to cook.*",
            "Corrige: *It is time we leave.*",
            "Párrafo sobre preferencias familiares.",
            "Traduce: Preferiría quedarme en casa.",
            "Traduce: Ya es hora de que llamemos a mi tía.",
            "I'd rather you didn't…",
            "Diálogo en una reunión familiar.",
            "Autochequeo: rather (sin to) vs prefer (con to).",
        ],
        [
            "Open — three structures in family context.",
            "**stay**",
            "**to travel**",
            "**visited**",
            "**helped**",
            "I would rather not **go** abroad alone.",
            "I would prefer tea **to** coffee.",
            "I would rather **stay** at home.",
            "It is time we **left**.",
            "Open family paragraph.",
            "I would rather **stay** at home.",
            "It is high time we **called** my aunt.",
            "I'd rather you **didn't** drive so fast.",
            "Open dialogue.",
            "Self-check.",
        ],
    ),
    8: (
        [
            "Escribe 2 mixed: pasado → presente y presente → pasado.",
            "Completa: If we had left earlier, we ___ (not be) stuck now.",
            "Completa: If I had checked the forecast, I ___ (pack) a coat.",
            "Completa: If she ___ (be) organised, she would have caught the flight.",
            "Completa: We ___ (be) at the beach now if the tour hadn't been cancelled.",
            "Explica pasado → presente en 1 frase.",
            "Corrige: *If we leave early, we wouldn't be stuck.*",
            "Corrige: *If I checked the forecast, I would pack a coat.*",
            "Párrafo sobre un viaje que salió mal.",
            "Traduce: Si hubiéramos salido antes, no estaríamos atrapados.",
            "Traduce: Si fuera más alto, habría entrado en el equipo.",
            "Usa vocabulario travel: boarding, delay, luggage.",
            "Diálogo en el aeropuerto.",
            "Autochequeo: tiempos en if y result clauses.",
        ],
        [
            "Open — one past→present and one present→past mixed.",
            "**wouldn't be**",
            "**would have packed**",
            "**were**",
            "**would be**",
            "Past unreal condition → present unreal result.",
            "If we **had left** earlier, we wouldn't be stuck.",
            "If I **had checked** the forecast, I **would have packed** a coat.",
            "Open travel paragraph.",
            "If we **had left** earlier, we **wouldn't be** stuck.",
            "If I **were** taller, I **would have joined** the team.",
            "Open with travel vocabulary.",
            "Open airport dialogue.",
            "Self-check.",
        ],
    ),
    9: (
        [
            "Escribe una cláusula -ing, -ed y Having + pp.",
            "Completa: ___ by the noise, residents protested.",
            "Completa: ___ planted trees, air quality improved.",
            "Completa: ___ through the park, I saw less litter.",
            "Completa: ___ finished the audit, experts spoke.",
            "Explica mismo sujeto en 1 frase.",
            "Corrige: *Disturbing by noise, they left.*",
            "Corrige: *Having plant trees, we left.*",
            "Párrafo sobre medio ambiente local.",
            "Traduce: Al terminar la auditoría, publicaron el informe.",
            "Traduce: Caminando por el río, recogieron basura.",
            "Encouraged by… + main clause.",
            "Disturbed by… + main clause.",
            "Autochequeo: -ing activo / -ed pasivo.",
            "Enlace teoría U9.",
        ],
        [
            "Open — three participle clause types.",
            "**Disturbed**",
            "Having **planted**",
            "**Walking**",
            "Having **finished**",
            "The participle clause and main clause share the same subject.",
            "**Disturbed** by the noise, they left.",
            "Having **planted** trees, we left.",
            "Open environment paragraph.",
            "Having **finished** the audit, they published the report.",
            "**Walking** along the river, they collected litter.",
            "Encouraged by the results, the mayor acted.",
            "Disturbed by pollution, citizens protested.",
            "Self-check.",
            "[Guía U9](/blog/curso-b2/unidad-9-participle-clauses-environment)",
        ],
    ),
    10: (
        [
            "Una frase con cada: wish, would rather, mixed conditional, participle, it's time.",
            "Completa: I wish I ___ (book) earlier.",
            "Completa: I would rather ___ (travel) by train.",
            "Completa: If we had left earlier, we ___ (be) at the museum now.",
            "Completa: ___ read the guide, we chose the eco tour.",
            "Completa: It is time we ___ (reduce) our footprint.",
            "Mini-historia (6 frases) mezclando U6–9.",
            "Corrige: *I wish I have booked.*",
            "Corrige: *I would rather to stay.*",
            "Matching: estructura → unidad (6–9).",
            "Traduce: Ojalá hubiera reservado antes.",
            "Traduce: Preferiría no conducir tan rápido.",
            "Autochequeo con mapa U10.",
            "Shadow reading + listening una vez más.",
            "Siguiente paso: teoría U11 en el curso.",
            "Enlace /curso-b2/unit-10.",
        ],
        [
            "Open — one of each U6–9 structure.",
            "**had booked**",
            "**travel**",
            "**would be**",
            "Having **read**",
            "**reduced**",
            "Open mixed paragraph.",
            "I wish I **had booked** earlier.",
            "I would rather **stay** at home.",
            "wish→U6; rather→U7; mixed→U8; participle→U9.",
            "I wish I **had booked** earlier.",
            "I would rather you **didn't** drive so fast.",
            "Self-check vs review map.",
            "Practice again without solutions.",
            "Next: relative clauses (Unit 11 theory).",
            "**/curso-b2/unit-10**",
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

    kws = "\n".join(f"  - {k}" for k in [
        f"ejercicios inglés B2 unidad {u}",
        "ejercicios inglés B2 gratis",
        "curso inglés B2 gratis",
        *m["kw"],
    ])
    prev_blog = m["prev_blog"]
    next_line = (
        f"3. Siguiente: [{META[u + 1]['title']}](/blog/curso-b2/{m['next_t']}-ejercicios-soluciones)."
        if u < 10
        else f"3. Módulo 1 completo — repasa en el [curso B2](/curso-b2) o la [teoría U6](/blog/curso-b2/{m['next_t']})."
    )

    return f"""---
category: curso-b2
date: '{DATE}'
updatedDate: '{DATE}'
author: linguafly-team
title: 'Ejercicios Unidad {u} B2: {m["title"]} (con soluciones)'
description: >-
  Practica todos los ejercicios de la Unidad {u} del curso B2: {m["focus"]};
  {m["vocab"]}, reading, listening y writing. Con soluciones comentadas.
readTime: 25 min
keywords:
{kws}
canonical: 'https://linguafly.app/blog/curso-b2/{m["slug"]}-ejercicios-soluciones'
image: {m["image"]}
alt: {m["title"]} — ejercicios B2 Unidad {u}
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
    for u in range(1, 11):
        d = ROOT / f"public/audio/blog/curso-b2/unit-{u}"
        d.mkdir(parents=True, exist_ok=True)
        for name, text in (("reading-workbook", READ[u]), ("listening-workbook", LISTEN[u])):
            path = d / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def main():
    for u in range(1, 11):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path, "chars", path.stat().st_size)
    make_audios()
    print("done B2 U1–10 workbooks")


if __name__ == "__main__":
    main()

