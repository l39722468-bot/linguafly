#!/usr/bin/env python3
"""Generate B2 Units 11–15 exercise workbooks (ejercicios-soluciones) + TTS.

Head commercial Bing keywords stay on hub /blog/temas/curso-ingles only.
"""
from pathlib import Path

from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/content/blog/curso-b2"
DATE = "2026-08-31"
HUB = "ingles-b2"

LISTEN = {
    11: "Hi, I am Sara. The district that we visited has a famous mural. The festival, which is annual, attracts thousands of visitors. My neighbour, whose family runs the festival, invited us for coffee. The landmark where we met is near the new skyscraper. Culture and urban life make this city special.",
    12: "Hi, I am Omar. People attending the premiere waited outside in the rain. The soundtrack recorded last month won an award. Volunteers helping at the exhibition greeted the audience. The compost produced in the garden is ready for the seedlings. Reduced relative clauses make descriptions shorter and clearer.",
    13: "Hi, I am Lena. You must save all receipts for the charity budget. I have to submit the report by Friday — that is the rule. We need to raise more donations this month. You needn't pay interest if you repay the loan early. Volunteers don't have to work every weekend, but many still do.",
    14: "Hi, I am Chris. She must have missed the deadline — her desk is empty. They might have changed the launch date after the meeting. He can't have sent the invoice yet; finance is still waiting. The designer must have finished the collection early. Past deduction helps us talk about business decisions.",
    15: "Hi, I am Ana. The festival, which is annual, starts next week. Volunteers helping at the exhibition handed out maps. You must wear your badge at the shelter. She must have missed the client call. Having reviewed units eleven to fourteen, I feel ready for the next module.",
}

READ = {
    11: "Last weekend Sara explored a new district in the city. The district that she visited has a famous mural by a local artist. The festival, which is annual, attracts thousands of visitors from abroad. Her neighbour, whose family runs the festival, gave her a free ticket. The landmark where they met is near a glass skyscraper. Heritage and tradition still matter in this modern community. Nightlife around the square is busy but friendly.",
    12: "Omar loves entertainment and gardening. People attending the premiere waited outside for almost an hour. The soundtrack recorded last month won an international award. Volunteers helping at the exhibition greeted every guest with a smile. The compost produced in his greenhouse is ready for the seedlings. Reduced relatives keep his notes short when he writes reviews.",
    13: "Lena manages money for a small charity. You must save all receipts for the budget audit. She has to submit the quarterly report by Friday. The team needs to raise more donations before winter. Donors needn't pay interest if they repay the loan early. Volunteers don't have to work every weekend, yet many choose to help at the shelter.",
    14: "Chris works in fashion and business. She must have missed the deadline because the pitch deck is still unfinished. They might have changed the launch date after the client call. He can't have sent the invoice yet — accounts receivable shows nothing. The designer must have finished the runway collection early. Modal deduction helps the team discuss what probably happened yesterday.",
    15: "Ana is reviewing Module 2. The festival, which is annual, needs more volunteers. People attending the premiere used reduced relatives in their notes. You must save receipts for the charity budget. She must have missed the deadline on the invoice. Having finished units eleven to fourteen, Ana plans to start Unit 16 next week.",
}

META = {
    11: dict(
        slug="unidad-11-relative-clauses-culture",
        title="Relative clauses & Culture",
        full="Relative Clauses: Defining & Non-defining + Culture",
        focus="defining / non-defining relative clauses; who / which / that / whose / where",
        vocab="culture & urban life",
        image="/blog/curso-b2/unit-11/relative-clauses.png",
        prev="unidad-10-repaso-6-9-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-12-relative-clauses-reduction",
        r_title="Sara in the city",
        l_title="Sara on culture",
        kw=["relative clauses ejercicios B2", "defining non-defining practice", "culture vocabulary B2"],
    ),
    12: dict(
        slug="unidad-12-relative-clauses-reduction",
        title="Reduced relatives",
        full="Reduced Relative Clauses (-ing / -ed) + Entertainment",
        focus="-ing / -ed reduced relative clauses",
        vocab="entertainment & gardening",
        image="/blog/curso-b2/unit-12/reduced-relatives.png",
        prev="unidad-11-relative-clauses-culture-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-13-modals-money",
        r_title="Omar at the premiere",
        l_title="Omar on entertainment",
        kw=["reduced relative clauses ejercicios", "ing ed reduction B2", "entertainment vocabulary B2"],
    ),
    13: dict(
        slug="unidad-13-modals-money",
        title="Modals & Money",
        full="Modals of Obligation: Must, Have to & Need + Money",
        focus="must / have to / need to / needn't / don't have to",
        vocab="money & volunteering",
        image="/blog/curso-b2/unit-13/modals-obligation.png",
        prev="unidad-12-relative-clauses-reduction-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-14-modal-deduction-business",
        r_title="Lena at the charity",
        l_title="Lena on money",
        kw=["must have to need to ejercicios", "needn't don't have to B2", "money vocabulary B2"],
    ),
    14: dict(
        slug="unidad-14-modal-deduction-business",
        title="Modal deduction",
        full="Modals of Deduction: Must Have, Might Have & Business",
        focus="must have / might have / can't have + past participle",
        vocab="business & fashion",
        image="/blog/curso-b2/unit-14/modal-deduction.png",
        prev="unidad-13-modals-money-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-15-repaso-11-14",
        r_title="Chris at work",
        l_title="Chris on deductions",
        kw=["must have might have ejercicios", "modal deduction past B2", "business vocabulary B2"],
    ),
    15: dict(
        slug="unidad-15-repaso-11-14",
        title="Repaso 11–14",
        full="Repaso B2 Unidades 11–14",
        focus="relative clauses, reduced relatives, obligation modals, past deduction",
        vocab="culture, entertainment, money, business (mix)",
        image="/blog/curso-b2/unit-15/review-map.png",
        prev="unidad-14-modal-deduction-business-ejercicios-soluciones",
        prev_blog="curso-b2",
        next_t="unidad-11-relative-clauses-culture",
        r_title="Ana's module review",
        l_title="Ana mixes U11–14",
        kw=["repaso B2 unidades 11-14", "relative clauses modals review", "integración módulo 2 B2"],
    ),
}

GRAM = {
    11: {
        "a": [
            ("The district ___ we visited has a mural.", "that / , which / who", "that"),
            ("The festival, ___ is annual, attracts thousands.", "which / that / who", "which"),
            ("My neighbour, ___ family runs the festival, is friendly.", "whose / who / which", "whose"),
            ("The landmark ___ we met is near the skyscraper.", "where / which / that", "where"),
            ("Non-defining clauses need ___.", "commas / no commas / that", "commas"),
        ],
        "b": [
            ("In non-defining clauses, avoid ___.", "that / which / who", "that"),
            ("Defining clauses give ___ information.", "essential / extra / optional", "essential"),
            ("People ___ live here love the nightlife.", "who / which / where", "who"),
            ("The mural ___ won the prize is huge.", "which/that / who / whose", "which/that"),
            ("The community ___ heritage is rich organises walks.", "whose / who / which", "whose"),
        ],
        "c": [
            ("*The festival that is annual, attracts thousands.*", "The festival, **which** is annual, attracts thousands."),
            ("*My neighbour who family runs it is kind.*", "My neighbour, **whose** family runs it, is kind."),
            ("*The place which we met is famous.*", "The place **where** we met is famous."),
            ("*The district, that we visited, has a mural.*", "The district **that** we visited has a mural."),
            ("*People which live here are friendly.*", "People **who** live here are friendly."),
        ],
    },
    12: {
        "a": [
            ("People ___ the premiere waited outside.", "attending / attended / attend", "attending"),
            ("The soundtrack ___ last month won an award.", "recorded / recording / record", "recorded"),
            ("Volunteers ___ at the exhibition greeted guests.", "helping / helped / help", "helping"),
            ("The compost ___ in the garden is ready.", "produced / producing / produce", "produced"),
            ("-ing reduction usually has ___ meaning.", "active / passive / future", "active"),
        ],
        "b": [
            ("-ed reduction usually has ___ meaning.", "passive / active / question", "passive"),
            ("People who are attending → People ___.", "attending / attended / attend", "attending"),
            ("The film which was recorded → The film ___.", "recorded / recording / record", "recorded"),
            ("Seedlings ___ in the greenhouse grew fast.", "growing / grown / grow", "growing"),
            ("Tickets ___ online sold out.", "bought / buying / buy", "bought"),
        ],
        "c": [
            ("*People who attending the show waited.*", "People **attending** the show waited."),
            ("*The soundtrack recording last month won.*", "The soundtrack **recorded** last month won."),
            ("*Volunteers helped at the show greeted us.* (reduce)", "Volunteers **helping** at the show greeted us."),
            ("*The compost producing in the garden is ready.*", "The compost **produced** in the garden is ready."),
            ("*Guests who are waiting outside…* (reduce)", "Guests **waiting** outside…"),
        ],
    },
    13: {
        "a": [
            ("You ___ save all receipts for the budget.", "must / can / might", "must"),
            ("I ___ submit the report by Friday. (external rule)", "have to / must / needn't", "have to"),
            ("We ___ raise more donations.", "need to / needn't / can't", "need to"),
            ("You ___ pay interest if you repay early.", "needn't / must / have to", "needn't"),
            ("Volunteers ___ work every weekend.", "don't have to / must / need to", "don't have to"),
        ],
        "b": [
            ("Must often = obligation from the ___.", "speaker / weather / ticket", "speaker"),
            ("Have to often = ___ obligation.", "external / imaginary / past perfect", "external"),
            ("Needn't ≈ ___.", "don't have to / must / can't", "don't have to"),
            ("Past obligation: yesterday I ___ finish early.", "had to / must / needn't", "had to"),
            ("You must wear your ___ at the shelter.", "badge / runway / seedling", "badge"),
        ],
        "c": [
            ("*You must to save the receipts.*", "You must **save** the receipts."),
            ("*I have submit the budget.*", "I **have to** submit the budget."),
            ("*We need raise donations.*", "We **need to** raise donations."),
            ("*You mustn't pay — it's optional.* (no obligation)", "You **needn't** / **don't have to** pay."),
            ("*Volunteers must not to work weekends.* (optional)", "Volunteers **don't have to** work weekends."),
        ],
    },
    14: {
        "a": [
            ("She ___ missed the deadline. (almost sure)", "must have / might have / can't have", "must have"),
            ("They ___ changed the launch date. (possible)", "might have / must have / can't have", "might have"),
            ("He ___ sent the invoice yet. (almost impossible)", "can't have / must have / might have", "can't have"),
            ("The designer ___ finished early. (almost sure)", "must have / can't have / will", "must have"),
            ("Structure: modal + ___ + past participle.", "have / had / has", "have"),
        ],
        "b": [
            ("Must have = ___.", "strong certainty past / future plan", "strong certainty past"),
            ("Can't have = ___.", "strong impossibility past / permission", "strong impossibility past"),
            ("Might have = ___.", "possibility past / obligation", "possibility past"),
            ("She must have ___ the pitch.", "rewritten / rewrite / rewriting", "rewritten"),
            ("They can't have ___ the merger yet.", "announced / announce / announcing", "announced"),
        ],
        "c": [
            ("*She must missed the deadline.*", "She must **have missed** the deadline."),
            ("*They might changed the date.*", "They might **have changed** the date."),
            ("*He can't have send the invoice.*", "He can't have **sent** the invoice."),
            ("*She must has finished early.*", "She must **have** finished early."),
            ("*They must have change the brand.*", "They must have **changed** the brand."),
        ],
    },
    15: {
        "a": [
            ("The festival, ___ is annual, starts soon.", "which / that / who", "which"),
            ("People ___ the premiere waited outside.", "attending / attended / attend", "attending"),
            ("You ___ save receipts for the audit.", "must / might have / can't", "must"),
            ("She ___ missed the client call. (deduction)", "must have / must / have to", "must have"),
            ("The compost ___ in the garden is ready.", "produced / producing / produce", "produced"),
        ],
        "b": [
            ("Non-defining → use ___ , not that.", "which/who / that only", "which/who"),
            ("Reduced -ing ≈ ___ meaning.", "active / passive", "active"),
            ("Needn't ≈ ___.", "don't have to / must have", "don't have to"),
            ("Can't have + pp = ___.", "almost impossible past / obligation", "almost impossible past"),
            ("Whose marks ___.", "possession / place / time", "possession"),
        ],
        "c": [
            ("*The district, that we visited, is nice.*", "The district **that** we visited is nice. (defining, no commas)"),
            ("*People who are attending → reduce*", "People **attending**…"),
            ("*You must to wear a badge.*", "You must **wear** a badge."),
            ("*She must missed the deadline.*", "She must **have missed** the deadline."),
            ("*Volunteers helped at the show greeted us.*", "Volunteers **helping** at the show greeted us."),
        ],
    },
}

VOCAB = {
    11: {
        "a": [
            ("district", "barrio · factura · pasarela", "barrio"),
            ("landmark", "punto de referencia · préstamo · ensayo", "punto de referencia"),
            ("heritage", "patrimonio · compost · badge", "patrimonio"),
            ("mural", "mural · invoice · seedling", "mural"),
            ("skyscraper", "rascacielos · runway · donor", "rascacielos"),
        ],
        "b": [
            ("festival ≈ ___", "fiesta cultural / factura / plántula", "fiesta cultural"),
            ("nightlife ≈ ___", "vida nocturna / interés / fusión", "vida nocturna"),
            ("community ≈ ___", "comunidad / marca / ensayo", "comunidad"),
            ("tradition ≈ ___", "tradición / presupuesto / pasarela", "tradición"),
            ("neighbour ≈ ___", "vecino / cliente / diseñador", "vecino"),
        ],
    },
    12: {
        "a": [
            ("premiere", "estreno · donación · mural", "estreno"),
            ("audience", "público · barrio · préstamo", "público"),
            ("rehearsal", "ensayo · factura · rascacielos", "ensayo"),
            ("seedling", "plántula · pasarela · badge", "plántula"),
            ("greenhouse", "invernadero · merger · heritage", "invernadero"),
        ],
        "b": [
            ("compost ≈ ___", "compost / invoice / skyscraper", "compost"),
            ("germinate ≈ ___", "germinar / negociar / donar", "germinar"),
            ("stage ≈ ___", "escenario / presupuesto / barrio", "escenario"),
            ("soundtrack ≈ ___", "banda sonora / interés / mural", "banda sonora"),
            ("exhibition ≈ ___", "exposición / loan / runway", "exposición"),
        ],
    },
    13: {
        "a": [
            ("donation", "donación · ensayo · mural", "donación"),
            ("budget", "presupuesto · premiere · seedling", "presupuesto"),
            ("loan", "préstamo · skyscraper · compost", "préstamo"),
            ("interest", "interés (dinero) · audience · stage", "interés (dinero)"),
            ("shelter", "refugio · runway · landmark", "refugio"),
        ],
        "b": [
            ("donor ≈ ___", "donante / diseñador / vecino", "donante"),
            ("afford ≈ ___", "permitirse / germinar / ensayar", "permitirse"),
            ("volunteer ≈ ___", "ser voluntario / fusionar / lanzar", "ser voluntario"),
            ("charity ≈ ___", "organización benéfica / pasarela / invernadero", "organización benéfica"),
            ("badge ≈ ___", "credencial / plántula / mural", "credencial"),
        ],
    },
    14: {
        "a": [
            ("deadline", "fecha límite · seedling · mural", "fecha límite"),
            ("launch", "lanzamiento · compost · barrio", "lanzamiento"),
            ("invoice", "factura · premiere · heritage", "factura"),
            ("merger", "fusión · greenhouse · shelter", "fusión"),
            ("runway", "pasarela · donation · landmark", "pasarela"),
        ],
        "b": [
            ("brand ≈ ___", "marca / plántula / vecino", "marca"),
            ("trend ≈ ___", "tendencia / préstamo / ensayo", "tendencia"),
            ("client ≈ ___", "cliente / compost / mural", "cliente"),
            ("pitch ≈ ___", "presentación comercial / invernadero / badge", "presentación comercial"),
            ("designer ≈ ___", "diseñador / donante / seedling", "diseñador"),
        ],
    },
    15: {
        "a": [
            ("relative clause", "oración de relativo · factura · pasarela", "oración de relativo"),
            ("reduced relative", "relativo reducido · loan · mural", "relativo reducido"),
            ("obligation", "obligación · premiere · compost", "obligación"),
            ("deduction", "deducción · seedling · barrio", "deducción"),
            ("module review", "repaso de módulo · runway · badge", "repaso de módulo"),
        ],
        "b": [
            ("must have + pp ≈ ___", "deducción fuerte pasado / permiso", "deducción fuerte pasado"),
            ("needn't ≈ ___", "no es obligatorio / casi seguro", "no es obligatorio"),
            ("whose ≈ ___", "posesión / lugar / tiempo", "posesión"),
            ("-ed reduction ≈ ___", "pasiva / activa / futuro", "pasiva"),
            ("defining clause ≈ ___", "info esencial / info extra", "info esencial"),
        ],
    },
}

READ_Q = {
    11: [
        ("Who explored a district?", "Sara", "Sara / Omar / Lena"),
        ("Defining: The district ___ she visited", "that", "that / , which"),
        ("The festival, which is ___, attracts thousands", "annual", "annual / cancelled / quiet"),
        ("Whose family runs the festival?", "her neighbour's", "neighbour / designer / donor"),
        ("Landmark is near a ___", "skyscraper", "skyscraper / runway / compost"),
        ("Heritage and ___ still matter", "tradition", "tradition / invoice / merger"),
        ("Nightlife around the square is ___", "busy but friendly", "busy but friendly / empty / silent"),
        ("Non-defining marker in text?", "commas with which", "commas / no relative"),
        ("Vocab: mural by a ___ artist", "local", "local / foreign only / unknown"),
        ("Went abroad for the festival?", "False (visitors from abroad)", "False / True"),
        ("Underline 2 relative clauses.", "See text", "(open)"),
        ("Write one defining + one non-defining.", "Model OK", "(open)"),
        ("Key vocab?", "district, mural, heritage", "yes / none"),
        ("Tone?", "curious / cultural", "curious / angry"),
        ("Course link", "/curso-b2/unit-11", "/curso-b2/unit-11"),
    ],
    12: [
        ("Who loves entertainment and gardening?", "Omar", "Omar / Sara / Chris"),
        ("People ___ the premiere waited", "attending", "attending / attended"),
        ("Soundtrack ___ last month won", "recorded", "recorded / recording"),
        ("Volunteers ___ at the exhibition", "helping", "helping / helped"),
        ("Compost ___ in the greenhouse", "produced", "produced / producing"),
        ("-ing = usually ___", "active", "active / passive"),
        ("-ed = usually ___", "passive", "passive / active"),
        ("Reduced relatives keep notes ___", "short", "short / longer / silent"),
        ("Waited outside for almost ___", "an hour", "an hour / a week"),
        ("Award was international?", "True", "True / False"),
        ("Underline 2 reduced clauses.", "See text", "(open)"),
        ("Write one -ing and one -ed reduction.", "Model OK", "(open)"),
        ("Key vocab?", "premiere, compost, seedling", "yes / none"),
        ("Tone?", "enthusiastic", "enthusiastic / bored"),
        ("Course link", "/curso-b2/unit-12", "/curso-b2/unit-12"),
    ],
    13: [
        ("Lena works for a ___", "charity", "charity / runway / greenhouse"),
        ("You must save all ___", "receipts", "receipts / seedlings / murals"),
        ("Submit report by ___", "Friday", "Friday / Monday / never"),
        ("Need to raise more ___", "donations", "donations / compost / brands"),
        ("Needn't pay ___ if repay early", "interest", "interest / badges / tickets"),
        ("Don't have to work every ___", "weekend", "weekend / minute / year"),
        ("Must = strong ___", "obligation", "obligation / possibility"),
        ("Have to = often ___ rule", "external", "external / imaginary"),
        ("Many still help at the ___", "shelter", "shelter / runway / landmark"),
        ("Optional weekend work?", "True (don't have to)", "True / False"),
        ("Underline must / needn't / don't have to.", "See text", "(open)"),
        ("Write one must and one needn't.", "Model OK", "(open)"),
        ("Key vocab?", "budget, loan, donor", "yes / none"),
        ("Tone?", "practical", "practical / chaotic"),
        ("Course link", "/curso-b2/unit-13", "/curso-b2/unit-13"),
    ],
    14: [
        ("Chris works in ___", "fashion and business", "fashion and business / gardening only"),
        ("Must have missed the ___", "deadline", "deadline / seedling / mural"),
        ("Might have changed the ___", "launch date", "launch date / compost / district"),
        ("Can't have sent the ___", "invoice", "invoice / badge / premiere"),
        ("Designer must have finished the ___", "collection", "collection / shelter / loan"),
        ("Deduction about ___ time", "past", "past / future only"),
        ("Pitch deck is still ___", "unfinished", "unfinished / printed / deleted"),
        ("Accounts receivable shows ___", "nothing", "nothing / everything"),
        ("Modal + ___ + pp", "have", "have / had / has"),
        ("Talk about yesterday's decisions?", "True", "True / False"),
        ("Underline must/might/can't have.", "See text", "(open)"),
        ("Write one must have and one can't have.", "Model OK", "(open)"),
        ("Key vocab?", "deadline, invoice, runway", "yes / none"),
        ("Tone?", "analytical", "analytical / sleepy"),
        ("Course link", "/curso-b2/unit-14", "/curso-b2/unit-14"),
    ],
    15: [
        ("Who reviews Module 2?", "Ana", "Ana / Omar / Chris"),
        ("Festival, which is annual, needs ___", "volunteers", "volunteers / invoices only"),
        ("People attending = ___ relative", "reduced", "reduced / non-defining only"),
        ("Must save ___ for budget", "receipts", "receipts / seedlings"),
        ("Must have missed the ___", "deadline", "deadline / landmark"),
        ("Units covered?", "11–14", "11–14 / 1–4"),
        ("Plans to start Unit ___", "16", "16 / 10 / 1"),
        ("Which = non-defining in festival sentence?", "True", "True / False"),
        ("Obligation modal in text?", "must", "must / might have only"),
        ("Deduction modal in text?", "must have", "must have / needn't"),
        ("Underline one of each structure.", "See text", "(open)"),
        ("Write a mixed 4-sentence review.", "Model OK", "(open)"),
        ("Key structures?", "relatives + modals", "yes / none"),
        ("Tone?", "ready / focused", "ready / lost"),
        ("Course link", "/curso-b2/unit-15", "/curso-b2/unit-15"),
    ],
}

LISTEN_Q = {
    11: [
        ("Who speaks?", "Sara", "Sara / Omar / Lena"),
        ("District ___ we visited", "that", "that / which with commas"),
        ("Festival, which is ___", "annual", "annual / free / closed"),
        ("Neighbour whose family runs the ___", "festival", "festival / shelter / runway"),
        ("Landmark near the ___", "skyscraper", "skyscraper / greenhouse"),
        ("Topic: culture and ___ life", "urban", "urban / farm only"),
        ("Non-defining uses ___", "commas", "commas / that"),
        ("Defining uses ___", "that/who… without commas", "that… / only might have"),
        ("Invited for ___", "coffee", "coffee / merger / compost"),
        ("City is special?", "True", "True / False"),
        ("Note one defining clause.", "Open", "(open)"),
        ("Note one non-defining clause.", "Open", "(open)"),
        ("Shadow the whose sentence.", "Practice", "(open)"),
        ("Vocab heard?", "mural, landmark, skyscraper", "yes / none"),
        ("Course", "/curso-b2/unit-11", "/curso-b2/unit-11"),
    ],
    12: [
        ("Who speaks?", "Omar", "Omar / Sara / Chris"),
        ("People ___ the premiere", "attending", "attending / attended"),
        ("Soundtrack ___ last month", "recorded", "recorded / recording"),
        ("Volunteers ___ at exhibition", "helping", "helping / helped"),
        ("Compost ___ in the garden", "produced", "produced / producing"),
        ("Reduced clauses make descriptions ___", "shorter", "shorter / longer"),
        ("-ing = ___", "active", "active / passive"),
        ("-ed = ___", "passive", "passive / active"),
        ("Waited in the ___", "rain", "rain / sun"),
        ("Seedlings mentioned?", "True", "True / False"),
        ("Write one -ing reduction from audio.", "Open", "(open)"),
        ("Write one -ed reduction from audio.", "Open", "(open)"),
        ("Shadow one sentence.", "Practice", "(open)"),
        ("Vocab?", "premiere, compost, seedling", "yes / none"),
        ("Course", "/curso-b2/unit-12", "/curso-b2/unit-12"),
    ],
    13: [
        ("Who speaks?", "Lena", "Lena / Ana / Chris"),
        ("Must save all ___", "receipts", "receipts / tickets"),
        ("Have to submit by ___", "Friday", "Friday / Sunday"),
        ("Need to raise more ___", "donations", "donations / brands"),
        ("Needn't pay ___ early", "interest", "interest / rent only"),
        ("Don't have to work every ___", "weekend", "weekend / hour"),
        ("Must ≈ speaker/internal ___", "obligation", "obligation / guess"),
        ("Have to ≈ ___ rule", "external", "external / joke"),
        ("Many still volunteer?", "True", "True / False"),
        ("Charity budget context?", "True", "True / False"),
        ("One must sentence.", "Open", "(open)"),
        ("One needn't sentence.", "Open", "(open)"),
        ("Shadow the have to line.", "Practice", "(open)"),
        ("Vocab?", "donation, interest, volunteer", "yes / none"),
        ("Course", "/curso-b2/unit-13", "/curso-b2/unit-13"),
    ],
    14: [
        ("Who speaks?", "Chris", "Chris / Sara / Omar"),
        ("Must have missed the ___", "deadline", "deadline / bus only"),
        ("Might have changed the ___", "launch date", "launch date / weather only"),
        ("Can't have sent the ___", "invoice", "invoice / email only"),
        ("Designer must have finished ___", "early", "early / never"),
        ("Past ___ helps business talk", "deduction", "deduction / obligation only"),
        ("Desk is ___", "empty", "empty / full"),
        ("Finance is still ___", "waiting", "waiting / celebrating"),
        ("Modal + have + ___", "past participle", "past participle / -ing"),
        ("About past events?", "True", "True / False"),
        ("One must have sentence.", "Open", "(open)"),
        ("One can't have sentence.", "Open", "(open)"),
        ("Shadow might have line.", "Practice", "(open)"),
        ("Vocab?", "deadline, launch, invoice", "yes / none"),
        ("Course", "/curso-b2/unit-14", "/curso-b2/unit-14"),
    ],
    15: [
        ("Who speaks?", "Ana", "Ana / Lena / Omar"),
        ("Festival, which is ___", "annual", "annual / weekly"),
        ("Volunteers ___ at exhibition", "helping", "helping / helped"),
        ("Must wear your ___", "badge", "badge / hat"),
        ("Must have missed the ___", "client call", "client call / train only"),
        ("Reviewed units ___", "eleven to fourteen", "eleven to fourteen / one to four"),
        ("Ready for next ___", "module", "module / exam only"),
        ("Relative + reduced + modals?", "True", "True / False"),
        ("Obligation example?", "must wear badge", "must wear / might have only"),
        ("Deduction example?", "must have missed", "must have missed / needn't"),
        ("List 4 structures heard.", "Open", "(open)"),
        ("Write a 3-line mix.", "Open", "(open)"),
        ("Shadow one sentence.", "Practice", "(open)"),
        ("Feeling?", "ready", "ready / lost"),
        ("Course", "/curso-b2/unit-15", "/curso-b2/unit-15"),
    ],
}

WRITE = {
    11: (
        [
            "Escribe 2 defining y 2 non-defining relative clauses sobre tu ciudad.",
            "Completa: The district ___ (that) I love has a mural.",
            "Completa: The festival, ___ (which) is annual, starts in May.",
            "Completa: My friend, ___ (whose) sister is an artist, invited me.",
            "Completa: The square ___ (where) we meet is busy at night.",
            "Explica defining vs non-defining en 1 frase.",
            "Corrige: *The festival that is annual, is famous.*",
            "Corrige: *People which live here are kind.*",
            "Párrafo (6 frases) con culture vocab + relatives.",
            "Traduce: El barrio que visitamos tiene un mural.",
            "Traduce: El festival, que es anual, atrae a miles.",
            "Usa whose + where en un diálogo corto.",
            "Lista 5 palabras: district, landmark, heritage, mural, nightlife.",
            "Autochequeo: ¿puedo quitar that en non-defining? (no)",
            "Enlace teoría U11.",
        ],
        [
            "Open — 2 defining + 2 non-defining.",
            "**that**",
            "**which**",
            "**whose**",
            "**where**",
            "Defining = essential (no commas); non-defining = extra (commas).",
            "The festival, **which** is annual, is famous.",
            "People **who** live here are kind.",
            "Open culture paragraph.",
            "The district **that** we visited has a mural.",
            "The festival, **which** is annual, attracts thousands.",
            "Open dialogue.",
            "Self-check vocab aloud.",
            "No — non-defining does not use *that*.",
            "[Guía U11](/blog/curso-b2/unidad-11-relative-clauses-culture)",
        ],
    ),
    12: (
        [
            "Escribe 2 reducciones -ing y 2 -ed.",
            "Completa: People ___ (attend) the premiere waited.",
            "Completa: The soundtrack ___ (record) last month won.",
            "Completa: Volunteers ___ (help) at the show smiled.",
            "Completa: The compost ___ (produce) is ready.",
            "Explica -ing vs -ed en 1 frase.",
            "Corrige: *People who attending waited.*",
            "Corrige: *The film recording last year won.* (passive idea)",
            "Párrafo entertainment/gardening con reduced relatives.",
            "Traduce: La gente que asiste al estreno esperó fuera.",
            "Traduce: El compost producido en el jardín está listo.",
            "Reduce: The guests who are waiting…",
            "Reduce: The tickets which were sold online…",
            "Autochequeo activo/pasivo.",
            "Enlace teoría U12.",
        ],
        [
            "Open — two -ing and two -ed.",
            "**attending**",
            "**recorded**",
            "**helping**",
            "**produced**",
            "-ing ≈ active; -ed ≈ passive.",
            "People **attending** waited.",
            "The film **recorded** last year won.",
            "Open paragraph.",
            "People **attending** the premiere waited outside.",
            "The compost **produced** in the garden is ready.",
            "Guests **waiting**…",
            "Tickets **sold** online…",
            "Self-check.",
            "[Guía U12](/blog/curso-b2/unidad-12-relative-clauses-reduction)",
        ],
    ),
    13: (
        [
            "Escribe must, have to, need to, needn't y don't have to (1 cada uno).",
            "Completa: You ___ (must) save the receipts.",
            "Completa: I ___ (have to) submit the budget.",
            "Completa: We ___ (need to) raise donations.",
            "Completa: You ___ (needn't) pay interest early.",
            "Explica must vs have to en 1 frase.",
            "Corrige: *You must to wear a badge.*",
            "Corrige: *Volunteers must work every weekend.* (si es opcional)",
            "Párrafo money/volunteering con modales.",
            "Traduce: No hace falta que pagues hoy.",
            "Traduce: Tengo que entregar el informe el viernes.",
            "Diálogo en un refugio / charity.",
            "Matching: must/have to/needn't → uso.",
            "Autochequeo.",
            "Enlace teoría U13.",
        ],
        [
            "Open — one of each modal.",
            "**must**",
            "**have to**",
            "**need to**",
            "**needn't**",
            "Must ≈ speaker; have to ≈ external rule.",
            "You must **wear** a badge.",
            "Volunteers **don't have to** work every weekend.",
            "Open paragraph.",
            "You **needn't** / **don't have to** pay today.",
            "I **have to** submit the report on Friday.",
            "Open dialogue.",
            "must→speaker; have to→external; needn't→no obligation.",
            "Self-check.",
            "[Guía U13](/blog/curso-b2/unidad-13-modals-money)",
        ],
    ),
    14: (
        [
            "Escribe must have, might have y can't have (2 cada uno).",
            "Completa: She ___ (must have miss) the deadline.",
            "Completa: They ___ (might have change) the launch date.",
            "Completa: He ___ (can't have send) the invoice yet.",
            "Completa: The designer ___ (must have finish) early.",
            "Explica must have vs can't have.",
            "Corrige: *She must missed the meeting.*",
            "Corrige: *They might have change the brand.*",
            "Párrafo business/fashion con deducciones.",
            "Traduce: Debe de haber perdido la fecha límite.",
            "Traduce: No puede haber enviado la factura todavía.",
            "Diálogo tras una reunión de lanzamiento.",
            "Matching: certainty levels.",
            "Autochequeo: modal + have + pp.",
            "Enlace teoría U14.",
        ],
        [
            "Open — two of each.",
            "**must have missed**",
            "**might have changed**",
            "**can't have sent**",
            "**must have finished**",
            "Must have = almost sure; can't have = almost impossible.",
            "She must **have missed** the meeting.",
            "They might have **changed** the brand.",
            "Open paragraph.",
            "She **must have missed** the deadline.",
            "He **can't have sent** the invoice yet.",
            "Open dialogue.",
            "must have > might have; can't have = negation of must have.",
            "Self-check.",
            "[Guía U14](/blog/curso-b2/unidad-14-modal-deduction-business)",
        ],
    ),
    15: (
        [
            "Una frase con cada: defining, non-defining, -ing reduction, -ed reduction, must, needn't, must have, might have.",
            "Completa: The festival, ___ is annual, starts soon.",
            "Completa: People ___ (attend) waited outside.",
            "Completa: You ___ save receipts. (obligation)",
            "Completa: She ___ (miss) the call. (must have)",
            "Mini-historia (8 frases) mezclando U11–14.",
            "Corrige: *She must missed the deadline.*",
            "Corrige: *People who attending smiled.*",
            "Matching: estructura → unidad (11–14).",
            "Traduce: Los voluntarios que ayudan saludaron al público.",
            "Traduce: No puede haber cambiado la fecha todavía.",
            "Autochequeo con mapa U15.",
            "Shadow reading + listening otra vez.",
            "Siguiente: Unidad 16 en el curso.",
            "Enlace /curso-b2/unit-15.",
        ],
        [
            "Open — one of each structure.",
            "**which**",
            "**attending**",
            "**must**",
            "**must have missed**",
            "Open mixed paragraph.",
            "She must **have missed** the deadline.",
            "People **attending** smiled.",
            "relatives→11; reduction→12; obligation→13; deduction→14.",
            "Volunteers **helping** greeted the audience.",
            "They **can't have changed** the date yet.",
            "Self-check vs review map.",
            "Practice again.",
            "Next: Unit 16 in the course.",
            "**/curso-b2/unit-15**",
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
        if u < 15
        else f"3. Módulo 2 completo — repasa en el [curso B2](/curso-b2) o la [teoría U11](/blog/curso-b2/{m['next_t']})."
    )

    # Double-quoted YAML titles avoid apostrophe breakage (It's / Won't).
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
    for u in range(11, 16):
        d = ROOT / f"public/audio/blog/curso-b2/unit-{u}"
        d.mkdir(parents=True, exist_ok=True)
        for name, text in (("reading-workbook", READ[u]), ("listening-workbook", LISTEN[u])):
            path = d / f"{name}.mp3"
            print("tts", path.relative_to(ROOT))
            gTTS(text=text, lang="en", tld="com").save(str(path))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for u in range(11, 16):
        path = OUT / f"{META[u]['slug']}-ejercicios-soluciones.md"
        path.write_text(render_unit(u), encoding="utf-8")
        print("wrote", path.relative_to(ROOT), "chars", path.stat().st_size)
    make_audios()
    print("done B2 U11–15 workbooks")


if __name__ == "__main__":
    main()
