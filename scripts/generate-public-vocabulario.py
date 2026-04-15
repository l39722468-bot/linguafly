#!/usr/bin/env python3
"""
Genera src/data/vocabulario/words/{slug}.json (50 sectores × 200 palabras).

Requisitos locales (no se versionan por tamaño):
  - scripts/data/apertium-eng-spa.dix  (diccionario EN→ES Apertium)
  - scripts/data/cmudict.txt         (CMUdict 0.7b para IPA)
  - scripts/data/en10k.txt           (opcional: lista frecuencia Google 10k)

Descarga si faltan:
  curl -sL "https://raw.githubusercontent.com/apertium/apertium-eng-spa/master/apertium-eng-spa.eng-spa.dix" -o scripts/data/apertium-eng-spa.dix
  curl -sL "http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b" -o scripts/data/cmudict.txt
  curl -sL "https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english.txt" -o scripts/data/en10k.txt
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "scripts/data"
OUT_DIR = ROOT / "src/data/vocabulario/words"

# Debe coincidir con src/lib/vocabulario/sectors.ts (orden de slugs)
SLUGS: list[str] = [
    "viajes-y-turismo",
    "alojamiento",
    "restaurante-y-comida",
    "compras-y-dinero",
    "salud-y-cuerpo",
    "medicina-y-farmacia",
    "deportes-y-fitness",
    "naturaleza-y-clima",
    "casa-y-hogar",
    "familia-y-relaciones",
    "educacion-y-escuela",
    "trabajo-y-empleo",
    "negocios-y-finanzas",
    "tecnologia-e-internet",
    "comunicacion-y-medios",
    "transporte-urbano",
    "conduccion-y-coche",
    "aeropuerto-y-vuelos",
    "tiempo-libre-y-ocio",
    "arte-y-cultura",
    "musica-y-conciertos",
    "ropa-y-moda",
    "belleza-y-cuidado-personal",
    "emociones-y-personalidad",
    "colores-formas-y-tamanos",
    "numeros-y-cantidades",
    "tiempo-y-calendario",
    "direcciones-y-lugares",
    "ciudad-y-servicios",
    "legal-y-sociedad",
    "politica-y-noticias",
    "ciencia-y-laboratorio",
    "espacio-y-geografia",
    "industria-y-energia",
    "agricultura-y-medio-ambiente",
    "construccion-y-herramientas",
    "seguridad-y-emergencias",
    "militar-y-defensa",
    "religion-y-festividades",
    "bebidas-y-vino",
    "cocina-y-recetas",
    "animales-y-mascotas",
    "plantas-y-jardin",
    "deportes-de-equipo",
    "deportes-individuales",
    "viajes-de-negocios",
    "psicologia-y-mente",
    "filosofia-y-ideas",
    "gramatica-lexico-funcional",
    "verbos-frecuentes",
    "adjetivos-y-descripcion",
]

# Palabras clave EN (lemas) por sector para clasificación por puntuación
THEME_KW: dict[str, frozenset[str]] = {
    "viajes-y-turismo": frozenset(
        """travel trip tourist tourism hotel flight airport passport visa luggage suitcase map guide beach resort cruise island abroad journey route ticket booking destination vacation holiday sightseeing excursion customs boarding gate terminal voyage overseas backpack hostel luggage carousel delay departure arrival immigration""".split()
    ),
    "alojamiento": frozenset(
        """hotel motel hostel inn lodging suite room bedroom bathroom reservation check reception checkout minibar housekeeping pillow blanket mattress shower bathtub key card lobby elevator wifi amenity concierge hostel dormitory landlord tenant lease rent furnished accommodation""".split()
    ),
    "restaurante-y-comida": frozenset(
        """restaurant menu waiter waitress dish meal breakfast lunch dinner appetizer dessert spicy salty sweet sour bitter delicious tasty bland portion recipe ingredient kitchen cook boil fry grill bake roast steam vegetarian vegan gluten allergy buffet cuisine""".split()
    ),
    "compras-y-dinero": frozenset(
        """shop store buy sell price discount cash credit debit card wallet receipt refund bargain expensive cheap afford currency dollar euro pound payment checkout cart basket sale purchase consumer brand product quality warranty""".split()
    ),
    "salud-y-cuerpo": frozenset(
        """health body head neck shoulder arm elbow wrist hand finger chest stomach back hip leg knee ankle foot toe skin muscle bone blood heart brain lung liver kidney exercise diet nutrition sleep rest pain ache fever cough cold flu symptom""".split()
    ),
    "medicina-y-farmacia": frozenset(
        """doctor nurse patient hospital clinic pharmacy medicine drug pill tablet injection surgery treatment diagnosis prescription symptom therapy vaccine wound bandage stretcher ambulance emergency dose pharmacy chemist heal cure disease infection allergy""".split()
    ),
    "deportes-y-fitness": frozenset(
        """sport fitness gym workout exercise train coach athlete stadium team league championship tournament muscle stretch warm referee whistle medal trophy yoga pilates aerobics dumbbell treadmill bicycle swim run jump""".split()
    ),
    "naturaleza-y-clima": frozenset(
        """nature weather climate rain snow wind storm thunder lightning sunny cloudy fog humidity temperature season spring summer autumn winter forest river mountain lake ocean beach desert valley volcano earthquake flood drought wildlife landscape flower grass tree leaf""".split()
    ),
    "casa-y-hogar": frozenset(
        """house home apartment kitchen living bedroom bathroom garage garden fence roof floor ceiling wall window door furniture table chair sofa bed shelf closet lamp carpet curtain stove fridge microwave sink dishwasher vacuum laundry iron""".split()
    ),
    "familia-y-relaciones": frozenset(
        """family mother father parent sister brother daughter son child baby cousin uncle aunt nephew niece husband wife marriage wedding divorce friendship neighbor colleague relationship love hate trust respect elder generation orphan widow single dating engagement""".split()
    ),
    "educacion-y-escuela": frozenset(
        """school university college student teacher professor classroom lecture homework exam grade diploma degree scholarship subject mathematics science history geography language library textbook notebook pencil ruler blackboard diploma thesis research campus semester""".split()
    ),
    "trabajo-y-empleo": frozenset(
        """work job employer employee salary wage interview resume career promotion colleague office meeting deadline shift overtime profession skill experience training apprenticeship unemployed hire fire contract workplace teamwork""".split()
    ),
    "negocios-y-finanzas": frozenset(
        """business company corporation profit loss revenue budget investment stock market share bond bank loan interest mortgage insurance tax invoice merger acquisition entrepreneur startup shareholder dividend economy trade import export currency""".split()
    ),
    "tecnologia-e-internet": frozenset(
        """computer laptop smartphone tablet software hardware internet website email password download upload browser server database programming code application virus firewall cloud wifi bluetooth screen keyboard mouse printer cable usb charger battery pixel""".split()
    ),
    "comunicacion-y-medios": frozenset(
        """news newspaper magazine journalist broadcast television radio podcast social network message chat interview headline article editor publish subscribe audience reporter media advertisement channel satellite signal""".split()
    ),
    "transporte-urbano": frozenset(
        """bus tram subway metro taxi cab pedestrian traffic light crosswalk station platform schedule route ticket inspector lane sidewalk bicycle scooter wheelchair rush hour commute fare transfer""".split()
    ),
    "conduccion-y-coche": frozenset(
        """car vehicle drive driver steering wheel brake accelerator gear engine fuel gasoline diesel highway road street parking license plate insurance tire garage mechanic oil accident traffic jam roundabout highway toll seatbelt airbag""".split()
    ),
    "aeropuerto-y-vuelos": frozenset(
        """airplane aircraft pilot runway takeoff landing airline cabin crew baggage claim security checkpoint boarding pass gate departure lounge duty-free jet turbulence delay cancellation connection transit visa passport customs immigration""".split()
    ),
    "tiempo-libre-y-ocio": frozenset(
        """hobby leisure weekend party cinema theater concert museum hobby puzzle board game video game dance sing picnic barbecue festival fair amusement relax entertainment celebrity hobby craft photography painting sculpture""".split()
    ),
    "arte-y-cultura": frozenset(
        """art artist painting sculpture gallery museum culture literature poetry novel drama theater opera ballet tradition heritage masterpiece portrait landscape exhibition curator critic aesthetic creative canvas brush statue architecture""".split()
    ),
    "musica-y-conciertos": frozenset(
        """music song singer band orchestra melody rhythm guitar piano violin drum trumpet flute concert stage microphone chorus symphony composer lyric tune jazz classical rock pop album vinyl rehearsal audition""".split()
    ),
    "ropa-y-moda": frozenset(
        """clothes shirt pants dress skirt jacket coat sweater jeans shoes boots hat gloves scarf belt socks underwear fashion style fabric cotton wool silk leather size tailor zipper button pocket sleeve collar runway boutique""".split()
    ),
    "belleza-y-cuidado-personal": frozenset(
        """beauty makeup lipstick perfume haircut salon shampoo soap lotion razor shave skincare manicure pedicure cosmetics moisturizer sunscreen brush comb mirror hygiene grooming spa facial""".split()
    ),
    "emociones-y-personalidad": frozenset(
        """happy sad angry afraid nervous calm proud ashamed jealous brave shy honest rude polite kind cruel lazy patient anxious excited bored surprised confused confident shy generous selfish optimistic pessimistic mood emotion feeling""".split()
    ),
    "colores-formas-y-tamanos": frozenset(
        """color red blue green yellow orange purple pink brown black white gray silver gold dark bright pale shape circle square triangle rectangle oval round flat sharp straight curved size big small tall short wide narrow thick thin huge tiny""".split()
    ),
    "numeros-y-cantidades": frozenset(
        """number zero one two three four five six seven eight nine ten hundred thousand million billion half quarter double triple dozen pair amount quantity total sum average percent fraction decimal ratio dozen magnitude plenty scarce enough several few many""".split()
    ),
    "tiempo-y-calendario": frozenset(
        """time hour minute second morning afternoon evening night today tomorrow yesterday weekday weekend month year century date calendar clock schedule deadline punctual delay early late annual monthly weekly daily season january february march april""".split()
    ),
    "direcciones-y-lugares": frozenset(
        """place location address street avenue road bridge square district region north south east west left right straight corner near far distance map compass direction landmark opposite beside between across behind ahead""".split()
    ),
    "ciudad-y-servicios": frozenset(
        """city town village capital downtown suburb public service post office bank hospital police station fire library museum park fountain statue traffic pollution mayor council tax office embassy consulate notary registry utility sewer water supply garbage recycling""".split()
    ),
    "legal-y-sociedad": frozenset(
        """law lawyer judge court jury trial crime prison sentence witness evidence contract rights freedom justice guilty innocent sue appeal constitution regulation license permit ban fine penalty lawsuit legal illegal attorney clause""".split()
    ),
    "politica-y-noticias": frozenset(
        """politics government president minister parliament congress senator election vote campaign party democracy republic monarchy policy debate opposition coalition constitution referendum border diplomacy treaty summit protest referendum poll""".split()
    ),
    "ciencia-y-laboratorio": frozenset(
        """science scientist laboratory experiment hypothesis theory chemistry biology physics atom molecule cell tissue microscope telescope gravity energy mass velocity acid base reaction catalyst microscope sample data analysis proof evidence peer review""".split()
    ),
    "espacio-y-geografia": frozenset(
        """earth planet moon sun star galaxy space satellite orbit astronaut rocket launch universe continent ocean island desert mountain latitude longitude equator pole hemisphere geography climate zone map atlas valley canyon plateau""".split()
    ),
    "industria-y-energia": frozenset(
        """industry factory machine production worker assembly steel coal oil gas electricity nuclear solar wind turbine pipeline refinery warehouse logistics cargo freight shipyard robot automation pollution emission carbon renewable fossil fuel""".split()
    ),
    "agricultura-y-medio-ambiente": frozenset(
        """farm farmer crop soil seed harvest tractor irrigation pesticide organic livestock cattle sheep pig chicken grain wheat corn rice vegetable orchard vineyard pasture meadow forest conservation wildlife ecosystem climate change sustainability recycle greenhouse drought irrigation compost fertilizer""".split()
    ),
    "construccion-y-herramientas": frozenset(
        """build construction worker engineer architect blueprint concrete cement brick hammer nail screw drill saw shovel crane scaffold beam foundation roof pipe plumbing electrician carpenter toolbox measure level blueprint weld weld""".split()
    ),
    "seguridad-y-emergencias": frozenset(
        """safety danger warning accident fire earthquake flood hurricane tornado emergency rescue ambulance police siren alarm escape helmet seatbelt extinguisher first aid poison hazard toxic explosion evacuation shelter insurance liability""".split()
    ),
    "militar-y-defensa": frozenset(
        """army navy air force soldier officer rank uniform weapon gun tank missile submarine fortress battle war peace treaty alliance invasion defense strategy intelligence radar drone battalion regiment colonel general veteran barracks drill""".split()
    ),
    "religion-y-festividades": frozenset(
        """religion faith church temple mosque synagogue prayer worship priest pastor monk nun sacred holy bible festival christmas easter thanksgiving wedding funeral blessing ritual pilgrimage heaven hell soul miracle hymn choir sacred holiday feast lent ramadan""".split()
    ),
    "bebidas-y-vino": frozenset(
        """drink water juice soda coffee tea wine beer cocktail whiskey vodka rum gin champagne bottle glass straw ice sugar lemon brew distillery fermentation vineyard grape barrel cellar tasting sommelier caffeine decaf latte espresso""".split()
    ),
    "cocina-y-recetas": frozenset(
        """cook recipe kitchen knife cutting board pot pan oven stove whisk peel chop slice dice boil simmer fry grill season spice pepper salt sugar flour butter oil vinegar sauce soup salad pasta rice noodle dough yeast knead oven mitt apron""".split()
    ),
    "animales-y-mascotas": frozenset(
        """animal dog cat horse cow pig sheep goat chicken duck bird fish whale dolphin tiger lion bear wolf elephant giraffe rabbit mouse snake lizard insect bee butterfly spider pet leash cage veterinarian zoo wildlife mammal reptile amphibian paw tail feather horn""".split()
    ),
    "plantas-y-jardin": frozenset(
        """plant flower rose tulip tree oak pine bush grass weed leaf root stem seed soil garden lawn hedge greenhouse compost fertilizer pruning watering pot orchard vineyard botanical pollen blossom thorn ivy moss fern herb spice orchard vineyard""".split()
    ),
    "deportes-de-equipo": frozenset(
        """team football soccer basketball volleyball baseball hockey rugby cricket goalkeeper defender midfielder striker coach referee jersey stadium league tournament pass shoot goal basket touchdown inning wicket pitch outfield""".split()
    ),
    "deportes-individuales": frozenset(
        """athlete marathon sprint hurdle javelin discus pole vault gymnastics boxing wrestling fencing archery golf tennis badminton table tennis skiing snowboarding surfing skateboarding climbing rowing cycling triathlon endurance personal record""".split()
    ),
    "viajes-de-negocios": frozenset(
        """business trip conference seminar presentation networking client contract negotiation itinerary expense report reimbursement headquarters branch meeting agenda slideshow handout delegate summit workshop trade fair booth exhibition""".split()
    ),
    "psicologia-y-mente": frozenset(
        """mind psychology memory thought emotion behavior therapy mental stress anxiety depression trauma subconscious dream habit motivation personality intelligence cognition perception attention learning intelligence psychiatrist psychologist counseling mindfulness meditation""".split()
    ),
    "filosofia-y-ideas": frozenset(
        """philosophy idea truth ethics morality logic reason argument debate wisdom existence reality knowledge belief justice virtue paradox hypothesis abstract concept ideology principle theory universe metaphysics epistemology aesthetics""".split()
    ),
    "gramatica-lexico-funcional": frozenset(
        """although therefore however moreover furthermore nevertheless whereas thus hence besides instead otherwise indeed likewise anyway somehow somewhere anywhere nowhere someone everyone nobody something nothing everything somewhere""".split()
    ),
    "verbos-frecuentes": frozenset(
        """be have do say go get make know think take see come want use find give tell work call try ask need feel become leave put mean keep let begin seem help show hear play run move live believe hold bring happen write sit stand lose pay meet include continue set learn lead understand watch follow stop create speak read spend grow open walk win offer remember love consider appear buy die send build stay fall cut reach kill raise pass sell decide return explain develop carry break receive agree support hit produce eat cover catch draw choose""".split()
    ),
    "adjetivos-y-descripcion": frozenset(
        """good new first last long great little own other old right small large big next early young important few public bad same able political late hard better able free full low high common strong possible whole free real best better sure clear full certain likely simple recent fine wrong present royal rich poor happy serious afraid alive angry aware blind brave brief bright broad cheap clean clever cold comfortable complex cool cruel cute dangerous dark dead deep different dirty dry easy empty equal exact extra fair famous fast fat female fierce final firm flat foreign formal former free frequent fresh friendly funny future general gentle giant glad global golden guilty helpful honest huge human hungry ideal illegal important impossible independent inner innocent intense internal joint just keen kind last late leading left legal likely literal little live lonely loose loud lovely low loyal lucky mad main male massive maximum medical mental middle minimum modern moral mutual narrow nasty national natural negative nervous net neutral nice noisy normal northern nuclear obvious odd official old only open opposite ordinary outdoor outer oval own pale parallel particular passive past patient perfect permanent personal physical plain plastic pleasant polite political poor popular positive possible potential practical precious pregnant present pretty previous primary private probable productive professional proper public pure purple puzzled quiet random rapid rare raw ready real recent red regional regular relative relevant reliable religious reluctant representative resident responsible rich rough round royal rural sacred sad safe same satisfied scientific secondary secret secure senior sensible separate serious severe sharp short sick silent silly similar simple single skilled slight slim slow small smart smooth social soft solid sorry southern spare special specific spiritual square stable steady steep sticky stiff still straight strange strict strong stupid subjective subsequent successful sudden sufficient suitable sunny super superior sure surprised sweet swift tall tame technical temporary terrible thick thin thirsty thorough tidy tight tiny tired top total tough toxic traditional tragic tremendous tricky true ugly ultimate unable unconscious underground unfair unhappy uniform unique universal unknown unlikely unusual upper upset urban used useful usual valuable various vast vertical violent visible vital warm weak wealthy weird welcome western wet whole wicked wide wild willing wise wooden worldwide worried worse worst worth worthy wrong yellow young yummy zealous""".split()
    ),
}


def strip_tags(seg: str) -> str:
    seg = re.sub(r"<s n=\"[^\"]+\"/?>", "", seg)
    seg = re.sub(r"<b\s*/>", "", seg)
    seg = re.sub(r"<b/>", " ", seg)
    seg = re.sub(r"<g>.*?</g>", "", seg, flags=re.DOTALL)
    seg = re.sub(r"<[^>]+>", "", seg)
    return re.sub(r"\s+", " ", seg).strip()


def parse_apertium(text: str) -> list[tuple[str, str]]:
    pairs: list[tuple[str, str]] = []
    for m in re.finditer(r"<p>\s*<l>(.*?)</l>\s*<r>(.*?)</r>", text, re.DOTALL):
        en = strip_tags(m.group(1))
        es = strip_tags(m.group(2))
        if not en or not es or " " in en:
            continue
        en = en.lower()
        if len(en) < 3 or len(en) > 22:
            continue
        # Solo letras (sin prefijos tipo "-five" del diccionario)
        if not re.match(r"^[a-z]+$", en):
            continue
        pairs.append((en, es))
    seen: dict[str, str] = {}
    for en, es in pairs:
        if en not in seen:
            seen[en] = es
    return list(seen.items())


def load_cmu(path: Path) -> dict[str, list[str]]:
    d: dict[str, list[str]] = {}
    for line in path.read_text(encoding="utf-8", errors="ignore").splitlines():
        if line.startswith(";;;") or not line.strip():
            continue
        parts = line.strip().split()
        if len(parts) < 2:
            continue
        w = re.sub(r"\(\d+\)$", "", parts[0]).lower()
        phones = parts[1:]
        if w not in d:
            d[w] = phones
    return d


# ARPABET → IPA (en-US aproximado, suficiente para lectura)
ARP_TO_IPA = {
    "AA": "ɑ",
    "AE": "æ",
    "AH": "ə",
    "AO": "ɔ",
    "AW": "aʊ",
    "AX": "ə",
    "AY": "aɪ",
    "EH": "ɛ",
    "ER": "ɚ",
    "EY": "eɪ",
    "IH": "ɪ",
    "IX": "ɪ",
    "IY": "i",
    "OW": "oʊ",
    "OY": "ɔɪ",
    "UH": "ʊ",
    "UW": "u",
    "B": "b",
    "CH": "tʃ",
    "D": "d",
    "DH": "ð",
    "F": "f",
    "G": "ɡ",
    "HH": "h",
    "JH": "dʒ",
    "K": "k",
    "L": "l",
    "M": "m",
    "N": "n",
    "NG": "ŋ",
    "P": "p",
    "R": "ɹ",
    "S": "s",
    "SH": "ʃ",
    "T": "t",
    "TH": "θ",
    "V": "v",
    "W": "w",
    "Y": "j",
    "Z": "z",
    "ZH": "ʒ",
}


def phones_to_ipa(phones: list[str]) -> str:
    out: list[str] = []
    primary = False
    for p in phones:
        stress = ""
        base = p
        if len(p) >= 3 and p[-1] in "012" and p[-2] in "012":
            pass
        if p and p[-1] in "012":
            stress = p[-1]
            base = p[:-1]
        ipa = ARP_TO_IPA.get(base)
        if ipa is None:
            continue
        if stress == "1" and not primary:
            out.append("ˈ")
            primary = True
        elif stress == "2" and not primary:
            out.append("ˌ")
        out.append(ipa)
    return "/" + "".join(out) + "/" if out else ""


def ipa_for_word(w: str, cmu: dict[str, list[str]]) -> str:
    phones = cmu.get(w.lower())
    if not phones:
        return f"/{w.lower()}/"
    ipa = phones_to_ipa(phones)
    return ipa if ipa else f"/{w.lower()}/"


def load_rank(path: Path) -> dict[str, int]:
    if not path.exists():
        return {}
    lines = path.read_text(encoding="utf-8", errors="ignore").splitlines()
    return {ln.strip().lower(): i for i, ln in enumerate(lines) if ln.strip()}


def score_word(en: str, kws: frozenset[str]) -> int:
    if en in kws:
        return 12
    s = 0
    for k in kws:
        if len(k) <= 3:
            if en == k:
                s += 8
            continue
        if en == k or en.startswith(k) or (len(k) >= 5 and k in en):
            s += 2
    return s


def assign_slug(en: str) -> str:
    best: tuple[int, str] = (-1, "gramatica-lexico-funcional")
    for slug in SLUGS:
        sc = score_word(en, THEME_KW[slug])
        if sc > best[0]:
            best = (sc, slug)
    return best[1]


def main() -> None:
    dix_path = DATA / "apertium-eng-spa.dix"
    cmu_path = DATA / "cmudict.txt"
    en10k_path = DATA / "en10k.txt"
    if not dix_path.exists():
        raise SystemExit(f"Falta {dix_path} (ver cabecera del script)")
    if not cmu_path.exists():
        raise SystemExit(f"Falta {cmu_path}")

    raw_pairs = parse_apertium(dix_path.read_text(encoding="utf-8", errors="ignore"))
    uniq_map: dict[str, str] = {}
    for en, es in raw_pairs:
        if en not in uniq_map:
            uniq_map[en] = es
    pairs_list = list(uniq_map.items())
    rank = load_rank(en10k_path)
    pairs_list.sort(key=lambda x: (rank.get(x[0], 99999), x[0]))

    TARGET = 200
    buckets: dict[str, list[tuple[str, str]]] = {s: [] for s in SLUGS}
    counts: dict[str, int] = {s: 0 for s in SLUGS}
    used: set[str] = set()

    def place_word(en: str, es: str) -> None:
        if en in used:
            return
        slug = assign_slug(en)
        if counts[slug] < TARGET:
            buckets[slug].append((en, es))
            counts[slug] += 1
            used.add(en)
            return
        for s in SLUGS:
            if counts[s] < TARGET:
                buckets[s].append((en, es))
                counts[s] += 1
                used.add(en)
                return

    for en, es in pairs_list:
        place_word(en, es)

    # Rellena sectores que sigan por debajo de 200 (palabras aún no usadas)
    for slug in SLUGS:
        while counts[slug] < TARGET:
            added = False
            for en, es in pairs_list:
                if en in used:
                    continue
                buckets[slug].append((en, es))
                used.add(en)
                counts[slug] += 1
                added = True
                break
            if not added:
                raise SystemExit(
                    f"No hay suficientes entradas únicas en Apertium para rellenar el sector {slug}. "
                    "Amplía el diccionario fuente o reduce TARGET."
                )

    cmu = load_cmu(cmu_path)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    titles = {
        "viajes-y-turismo": "Viajes y turismo",
        "alojamiento": "Alojamiento",
        "restaurante-y-comida": "Restaurante y comida",
        "compras-y-dinero": "Compras y dinero",
        "salud-y-cuerpo": "Salud y cuerpo",
        "medicina-y-farmacia": "Medicina y farmacia",
        "deportes-y-fitness": "Deportes y fitness",
        "naturaleza-y-clima": "Naturaleza y clima",
        "casa-y-hogar": "Casa y hogar",
        "familia-y-relaciones": "Familia y relaciones",
        "educacion-y-escuela": "Educación y escuela",
        "trabajo-y-empleo": "Trabajo y empleo",
        "negocios-y-finanzas": "Negocios y finanzas",
        "tecnologia-e-internet": "Tecnología e internet",
        "comunicacion-y-medios": "Comunicación y medios",
        "transporte-urbano": "Transporte urbano",
        "conduccion-y-coche": "Conducción y coche",
        "aeropuerto-y-vuelos": "Aeropuerto y vuelos",
        "tiempo-libre-y-ocio": "Tiempo libre y ocio",
        "arte-y-cultura": "Arte y cultura",
        "musica-y-conciertos": "Música y conciertos",
        "ropa-y-moda": "Ropa y moda",
        "belleza-y-cuidado-personal": "Belleza y cuidado personal",
        "emociones-y-personalidad": "Emociones y personalidad",
        "colores-formas-y-tamanos": "Colores, formas y tamaños",
        "numeros-y-cantidades": "Números y cantidades",
        "tiempo-y-calendario": "Tiempo y calendario",
        "direcciones-y-lugares": "Direcciones y lugares",
        "ciudad-y-servicios": "Ciudad y servicios",
        "legal-y-sociedad": "Legal y sociedad",
        "politica-y-noticias": "Política y noticias",
        "ciencia-y-laboratorio": "Ciencia y laboratorio",
        "espacio-y-geografia": "Espacio y geografía",
        "industria-y-energia": "Industria y energía",
        "agricultura-y-medio-ambiente": "Agricultura y medio ambiente",
        "construccion-y-herramientas": "Construcción y herramientas",
        "seguridad-y-emergencias": "Seguridad y emergencias",
        "militar-y-defensa": "Militar y defensa",
        "religion-y-festividades": "Religión y festividades",
        "bebidas-y-vino": "Bebidas y vino",
        "cocina-y-recetas": "Cocina y recetas",
        "animales-y-mascotas": "Animales y mascotas",
        "plantas-y-jardin": "Plantas y jardín",
        "deportes-de-equipo": "Deportes de equipo",
        "deportes-individuales": "Deportes individuales",
        "viajes-de-negocios": "Viajes de negocios",
        "psicologia-y-mente": "Psicología y mente",
        "filosofia-y-ideas": "Filosofía e ideas",
        "gramatica-lexico-funcional": "Léxico funcional",
        "verbos-frecuentes": "Verbos frecuentes",
        "adjetivos-y-descripcion": "Adjetivos y descripción",
    }

    for slug in SLUGS:
        words = []
        for en, es in sorted(buckets[slug], key=lambda x: x[0]):
            words.append(
                {
                    "en": en,
                    "es": es,
                    "phonetic": ipa_for_word(en, cmu),
                    "audioUrl": None,
                }
            )
        out = {"slug": slug, "title": titles[slug], "words": words}
        (OUT_DIR / f"{slug}.json").write_text(
            json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        print(slug, len(words))


if __name__ == "__main__":
    main()
