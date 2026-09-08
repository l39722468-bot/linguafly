#!/usr/bin/env python3
"""Build unique 500+500 habit catalogs and fail if slugs/intents collide."""
from __future__ import annotations

import re
import unicodedata
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text)
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text[:80]


def row(cluster: str, title: str, intent: str, slug: str | None = None, status: str = "pendiente"):
    return {
        "cluster": cluster,
        "slug": slug or slugify(title),
        "title": title,
        "intent": intent,
        "status": status,
    }


def entrenamiento() -> list[dict]:
    items: list[dict] = []
    a = items.append

    a(row("nucleo", "Rutina de fuerza en casa para principiantes (sin material)", "rutina de fuerza en casa", "rutina-fuerza-principiantes-casa", "publicado"))
    a(row("nucleo", "Sobrecarga progresiva: cómo subir carga sin lesionarte", "sobrecarga progresiva", "progresar-sin-lesionarte", "publicado"))

    for title, intent in [
        ("Full body 2 días por semana: cuándo basta", "full body 2 días por semana"),
        ("Full body 4 días: cómo no machacarte", "full body 4 días fuerza"),
        ("Rutina upper/lower 4 días para empezar", "rutina upper lower principiantes"),
        ("Empuje, tirón y pierna si acabas de empezar", "rutina empuje tirón pierna principiante"),
        ("Entrenar cada grupo muscular 2 veces por semana", "frecuencia 2 por grupo muscular"),
        ("Cuántas series por semana al principio", "volumen semanal principiante fuerza"),
        ("Series que cuentan y series de relleno", "series efectivas principiante"),
        ("Cuánto descansar entre series de fuerza", "descanso entre series fuerza"),
        ("Por qué dejar 48 horas entre full bodys", "descanso entre sesiones full body"),
        ("Alternar sesión A y sesión B en casa", "sesion A sesion B fuerza casa"),
        ("¿Tiene sentido entrenar fuerza 5 días al empezar?", "entrenar fuerza 5 días principiantes"),
        ("RIR: dejar repeticiones en recámara", "qué es RIR principiantes"),
        ("Entrenar al fallo: cuándo no hacerlo", "entrenar al fallo principiante"),
        ("En qué orden hacer los ejercicios de la sesión", "orden de ejercicios fuerza"),
        ("Cuánto debe durar una sesión de fuerza", "duración sesión de fuerza"),
        ("Superseries: ¿para un principiante?", "superseries principiantes fuerza"),
        ("Circuito vs series normales para ganar fuerza", "circuito o series para fuerza"),
        ("Semana de descarga: cómo hacerla", "deload semana de descarga"),
        ("Qué cambiar cuando no sube la carga", "estancamiento fuerza qué hacer"),
        ("Por qué no cambiar de rutina cada lunes", "cambiar de rutina cada semana mito"),
        ("Un plan de 12 semanas sin inventar cada día", "plan fuerza 12 semanas"),
        ("Fuerza o hipertrofia al empezar", "fuerza vs hipertrofia principiante"),
        ("6-8 o 10-15 repeticiones: cuál elegir", "rango de repeticiones principiante"),
        ("Bajar en 3 segundos: para qué sirve", "tempo bajada lenta fuerza"),
        ("Rango completo vs acortar el movimiento", "rango completo de movimiento"),
        ("Máquinas o peso libre el primer mes", "máquinas o peso libre principiantes"),
        ("Cuántos ejercicios por sesión", "cuántos ejercicios por día fuerza"),
        ("Dejar los mismos ejercicios o rotarlos", "rotar ejercicios o dejarlos fijos"),
        ("Rutina de fuerza 3 días en el gimnasio", "rutina fuerza 3 días gimnasio"),
        ("Calentamiento específico del primer ejercicio", "calentamiento específico fuerza"),
        ("Empezar la sesión por el compuesto", "primer ejercicio compuesto"),
        ("Accesorios al final, no al revés", "orden accesorios sesión fuerza"),
        ("Series de aproximación: cómo no cansarte", "series de aproximación"),
        ("3 sesiones que existen vs 6 en el papel", "frecuencia realista semanal fuerza"),
        ("Subir 3 semanas y asentar 1", "periodización sencilla 3+1"),
        ("Cuántas series por ejercicio al empezar", "series por ejercicio principiante"),
        ("Descanso entre vueltas de un circuito en casa", "descanso entre rondas circuito casa"),
        ("Entrenar de mañana o de tarde para fuerza", "mejor hora para entrenar fuerza"),
        ("Dos sesiones el mismo día: casi nunca", "dos entrenamientos el mismo día"),
        ("Tirar la sesión si solo tienes 20 minutos", "sesión de fuerza de 20 minutos"),
    ]:
        a(row("programacion", title, intent))

    for title, intent in [
        ("Qué hacer el primer día de gimnasio", "primer día de gimnasio qué hacer"),
        ("Miedo al gimnasio: un plan de 3 visitas", "miedo a ir al gimnasio"),
        ("Cómo pedir un sitio o un disco sin drama", "etiqueta básica gimnasio"),
        ("Máquinas de la sala: por dónde empezar", "máquinas gimnasio principiantes"),
        ("Jaula o rack: para qué sirve si empiezas", "cómo usar el rack de sentadillas"),
        ("Banco plano: press y nada más al principio", "press banca principiantes"),
        ("Polea: un tirón y un empuje, no 12 agarres", "polea gimnasio principiantes"),
        ("Vestuario, toalla y tiempo: logística del gym", "qué llevar al gimnasio primera vez"),
        ("Entrenar en hora punta: cómo no perder la sesión", "gimnasio lleno qué hacer"),
        ("Clases colectivas vs sala de pesas al empezar", "clases o pesas principiantes"),
        ("Monitor o por tu cuenta el primer mes", "necesito entrenador personal principiante"),
        ("Cómo copiar mal una rutina del móvil", "rutina del móvil en el gym"),
        ("Calzado y ropa: lo que basta", "qué calzado para entrenar fuerza"),
        ("Agua, música y el resto es ruido", "qué hacer entre series en el gym"),
        ("Cómo ocupar una máquina sin acampar", "cuánto tiempo en una máquina"),
        ("Ir al gym tres días con turno raro", "gimnasio con horario de trabajo"),
        ("Gimnasio de hotel vs tu plan de casa", "entrenar en gimnasio de hotel"),
        ("Peso libre pequeño: por qué no empezar con la barra vacía a lo loco", "barra vacía principiantes"),
        ("Cómo saber si el peso de la máquina es serio", "elegir peso en máquina"),
        ("Sala de estiramientos: 5 minutos, no 40", "estirar después de entrenar gym"),
        ("App del gimnasio: útil o distracción", "app del gimnasio para principiantes"),
        ("Entrenar solo en una sala grande", "entrenar solo en el gimnasio"),
        ("Mujeres y sala de pesas: el mismo plan", "sala de pesas para mujeres principiantes"),
        ("Chico del rincón: no es tu programa", "no copiar a quien levanta más"),
        ("Pedir que te expliquen una máquina", "cómo usar una máquina de gimnasio"),
        ("Locker, candado y no dejar la vida en el banco", "seguridad básica gimnasio"),
        ("Prueba gratuita: qué entrenar esos 7 días", "prueba gratuita gimnasio qué hacer"),
        ("Dejar el gym 10 días y volver sin héroe", "volver al gimnasio después de un viaje"),
    ]:
        a(row("primer-mes-gym", title, intent))

    for title, intent in [
        ("Sentadilla en casa: de la silla al aire", "cómo hacer sentadilla en casa"),
        ("Flexiones para principiantes: pared, mesa, suelo", "flexiones para principiantes"),
        ("Puente de glúteo: técnica y progresión", "puente de glúteos principiantes"),
        ("Plancha sin hundir la lumbar", "cómo hacer la plancha bien"),
        ("Zancada estática en casa con silla", "zancadas para principiantes en casa"),
        ("Remo con toalla o mochila en casa", "remo en casa sin material"),
        ("Fondos en silla: regresión segura", "fondos en silla principiantes"),
        ("Elevaciones de cadera a una pierna", "puente a una pierna"),
        ("Superman o Y-W en el suelo", "ejercicio Y W omóplatos"),
        ("Marcha en el sitio como calentamiento", "calentar en casa sin saltar"),
        ("Sentadilla isométrica en pared", "sentadilla en pared cuánto tiempo"),
        ("Paso atrás en vez de zancada caminando", "zancada inversa principiantes"),
        ("Flexión con rodillas: cuándo sí", "flexiones con rodillas"),
        ("Plancha de rodillas a plancha completa", "progresión plancha principiantes"),
        ("Dead bug: tronco sin moda", "dead bug para principiantes"),
        ("Bird dog: cuatro apoyos útiles", "bird dog ejercicio"),
        ("Puente de hombros en el suelo", "bridge de hombros casa"),
        ("Elevación de talones en escalón", "elevaciones de gemelo en casa"),
        ("Sentadilla a cajón o taburete", "box squat en casa"),
        ("Remo invertido bajo una mesa estable", "remo invertido en casa"),
        ("Good morning sin barra, con mochila", "good morning en casa"),
        ("Hip hinge: aprender a empujar cadera", "bisagra de cadera principiantes"),
        ("Peso muerto con mochila", "peso muerto en casa sin barra"),
        ("Press de suelo con mochila", "press de banca en el suelo casa"),
        ("Split squat sostenido en silla", "split squat principiantes casa"),
        ("Crunch: por qué no es el núcleo del plan", "abdominales crunch principiantes"),
        ("Elevaciones de piernas tumbado", "elevación de piernas principiantes"),
        ("Lateral plank de rodilla", "plancha lateral principiantes"),
        ("Círculos de hombro y dislocaciones con palo", "movilidad de hombros en casa"),
        ("Gato-camello para empezar la sesión", "gato camello calentamiento"),
        ("Rotación torácica en cuatro apoyos", "movilidad torácica en casa"),
        ("Estocada lateral corta", "zancada lateral principiantes"),
        ("Sentadilla sumo con el propio peso", "sentadilla sumo sin peso"),
        ("Pike push-up en pared", "pike push up principiantes"),
        ("Remo unilateral con botella", "remo a una mano en casa"),
        ("Peso muerto rumano con mochila", "rdl en casa"),
        ("Puente con pies elevados en sofá", "hip thrust en casa sin barra"),
        ("Marcha granjero con bolsas de la compra", "farmer walk en casa"),
        ("Step-up a un escalón estable", "step up principiantes"),
        ("Sentadilla pistol: regresiones largas", "pistol squat progresión"),
        ("Hollow hold corto", "hollow hold principiantes"),
        ("Burpee: por qué no está en el pilar", "burpees para principiantes sí o no"),
    ]:
        a(row("gestos-casa", title, intent))

    for title, intent in [
        ("Entrenar con una mochila: cómo cargarla", "entrenar con mochila en casa"),
        ("Bandas elásticas: un tirón y un empuje", "rutina con bandas elásticas principiantes"),
        ("Un par de mancuernas: qué hacer con ellas", "rutina con mancuernas en casa"),
        ("Una kettlebell: swing más tarde, goblet ahora", "kettlebell para principiantes"),
        ("TRX o anillas en casa: remo y fondos", "trx en casa principiantes"),
        ("Silla estable: fondos, split y apoyo", "ejercicios con silla en casa"),
        ("Escaleras del edificio como material", "entrenar en las escaleras"),
        ("Botellas de agua como peso", "pesas con botellas de agua"),
        ("Toalla para remo y para el suelo", "ejercicios con toalla"),
        ("Sofá: puente y nada de saltos raros", "entrenar usando el sofá"),
        ("Mesa para flexión inclinada y remo", "flexiones en la mesa"),
        ("Palo de escoba para movilidad", "movilidad con palo de escoba"),
        ("Goma abierta vs goma cerrada", "tipos de bandas elásticas"),
        ("Anclar la banda en la puerta sin destrozarla", "anclar banda elástica en puerta"),
        ("Mancuerna ajustable: un peso de verdad", "mancuernas ajustables principiantes"),
        ("Disco suelto: no hace falta un set", "entrenar con un disco"),
        ("Saco de arena casero", "sandbag casero entrenamiento"),
        ("Barra de dominadas: instalación seria", "instalar barra de dominadas en casa"),
        ("Mini bandas en rodillas: para qué", "mini bands glúteos principiantes"),
        ("Pesa rusa 8 o 12 kg: por dónde empezar", "qué peso de kettlebell principiantes"),
        ("Dos sillas para fondos y L-sit futuro", "fondos entre dos sillas"),
        ("Colchón vs suelo: dónde entrenar", "entrenar en el suelo o colchoneta"),
        ("Calzado o descalzo en casa", "entrenar descalzo en casa"),
        ("Esterilla fina, no inflable de playa", "colchoneta para entrenar en casa"),
        ("Cronómetro del móvil: basta", "temporizador para entrenar en casa"),
        ("Espejo: útil para la sentadilla, no para el ego", "entrenar frente al espejo"),
        ("Vecinos: por qué no saltar a las 22:00", "entrenar en piso sin molestar"),
        ("Balcón o patio: espacio y suelo", "entrenar en el balcón"),
        ("Parque: barra y banco público", "entrenar en el parque principiantes"),
        ("Calistenia básica en parque", "calistenia para principiantes parque"),
    ]:
        a(row("poco-material", title, intent))

    for title, intent in [
        ("Press de banca con barra: primer mes", "press de banca para principiantes"),
        ("Press con mancuernas en banco", "press mancuernas banco principiantes"),
        ("Remo con barra", "remo con barra técnica"),
        ("Remo en máquina hammer o similar", "remo en máquina principiantes"),
        ("Jalón al pecho", "jalón al pecho técnica"),
        ("Press militar sentado o de pie", "press militar principiantes"),
        ("Elevaciones laterales: accesorio, no pilar", "elevaciones laterales hombro"),
        ("Curl de bíceps: al final y poco", "curl de biceps principiantes"),
        ("Extensión de tríceps en polea", "extensión tríceps polea"),
        ("Prensa de piernas: complemento de sentadilla", "prensa de piernas principiantes"),
        ("Extensión de cuádriceps: cuándo", "extensión de cuadriceps máquina"),
        ("Curl femoral tumbado o sentado", "curl femoral principiantes"),
        ("Aductor y abductor: no son el entreno", "máquina abductor aductor"),
        ("Gemelo de pie en máquina", "gemelos en máquina"),
        ("Peso muerto rumano con barra", "peso muerto rumano principiantes"),
        ("Peso muerto convencional: más adelante", "peso muerto principiantes gimnasio"),
        ("Hip thrust con barra", "hip thrust con barra técnica"),
        ("Hack squat o sentadilla en máquina", "hack squat principiantes"),
        ("Smith: útil o trampa", "máquina smith principiantes"),
        ("Face pull en polea", "face pull para qué sirve"),
        ("Pájaros o reverse fly", "pajaros hombro posterior"),
        ("Encogimientos: trapecio no es el plan", "encogimientos de hombros"),
        ("Abdominal en máquina: peor que dead bug", "máquina de abdominales"),
        ("Dorsalera vs jalón", "dorsalera o jalon"),
        ("Remo bajo en polea", "remo bajo polea"),
        ("Press inclinado con mancuernas", "press inclinado mancuernas"),
        ("Aperturas: accesorio ligero", "aperturas con mancuernas"),
        ("Zancada con mancuernas en sala", "zancadas con mancuernas gym"),
        ("Buenos días con barra ligera", "buenos días con barra"),
        ("Peso muerto sumo: otra bisagra", "peso muerto sumo principiantes"),
        ("Sentadilla frontal con barra", "sentadilla frontal principiantes"),
        ("Sentadilla trasera: cuando la aire ya es seria", "sentadilla con barra principiantes"),
        ("Farmers en el gym con mancuernas pesadas", "farmer walk gimnasio"),
        ("Tríceps en banco (fondos asistidos)", "fondos en banco gimnasio"),
    ]:
        a(row("sala-pesas", title, intent))

    for title, intent in [
        ("Sentadilla goblet con mancuerna o mochila", "sentadilla goblet"),
        ("Sentadilla búlgara: equilibrio y rango", "sentadilla bulgara principiantes"),
        ("Zancada caminando: cuándo pasarla", "zancadas caminando"),
        ("Sentadilla sumo con kettlebell", "sentadilla sumo kettlebell"),
        ("Sit to stand desde un asiento bajo", "levantarse de la silla como ejercicio"),
        ("Sentadilla con pausa abajo", "sentadilla con pausa"),
        ("Sentadilla a una pierna asistida", "sentadilla a una pierna asistida"),
        ("Tijera o split squat en smith", "split squat en smith"),
        ("Sentadilla con banda alrededor de rodillas", "sentadilla con mini band"),
        ("Profundidad de sentadilla: paralelo de verdad", "hasta dónde bajar en la sentadilla"),
        ("Rodillas que se van: cue, no diagnóstico", "rodillas valgo en sentadilla"),
        ("Talones que se levantan: cuña o movilidad", "talones se levantan en sentadilla"),
        ("Barra alta o baja: todavía da igual", "barra alta o baja sentadilla"),
        ("Sentadilla zercher: más adelante", "sentadilla zercher"),
        ("Sissy squat: no es el primer gesto", "sissy squat principiantes"),
        ("Sentadilla en copa con pausa y tempo", "sentadilla goblet tempo"),
        ("Carga contralateral en zancada", "zancada con peso en una mano"),
        ("Step down controlado", "step down rodilla"),
        ("Cajón alto vs cajón bajo", "altura del cajón sentadilla"),
        ("Sentadilla con cadena o banda: no aún", "sentadilla con bandas de resistencia"),
        ("Respiración en la sentadilla", "cómo respirar en la sentadilla"),
        ("Cinturón: no el primer mes", "cinturón para sentadilla principiantes"),
    ]:
        a(row("sentadilla-unilateral", title, intent))

    for title, intent in [
        ("Peso muerto con hex bar o trap bar", "trap bar deadlift principiantes"),
        ("RDL con mancuernas", "rdl con mancuernas"),
        ("Hip thrust a un pie", "hip thrust a una pierna"),
        ("Puente de glúteo con banda", "glute bridge con banda"),
        ("Kickback: accesorio, no el posterior", "kickback de glúteo"),
        ("Peso muerto rumano a una pierna", "rdl a una pierna"),
        ("Pull through en polea", "pull through gluteos"),
        ("Back extension en banco romano", "extensiones lumbares banco"),
        ("Kettlebell swing: cuando la bisagra ya existe", "swing kettlebell principiantes"),
        ("Peso muerto deficit: no", "deficit deadlift principiantes"),
        ("Peso muerto con pausa bajo la rodilla", "peso muerto con pausa"),
        ("Contacto lumbar vs redondear de más", "espalda en el peso muerto"),
        ("Barra pegada a la tibia", "barra cerca en peso muerto"),
        ("Agarre mixto: más adelante", "agarre mixto peso muerto"),
        ("Straps: no sustituyen agarre al empezar", "straps peso muerto principiantes"),
        ("Glute ham raise: si hay máquina", "glute ham raise"),
        ("Frog pump: activación, no el entreno", "frog pump gluteos"),
        ("Marcha en puente", "marcha en puente de glúteo"),
    ]:
        a(row("bisagra-posterior", title, intent))

    for title, intent in [
        ("Flexión con pausa en el pecho", "flexiones con pausa"),
        ("Flexión arqueada o deficit", "flexiones deficit"),
        ("Fondos en paralelas asistidos", "fondos en paralelas principiantes"),
        ("Press de hombro con mancuernas sentado", "press hombro mancuernas sentado"),
        ("Press Arnold: accesorio", "press arnold"),
        ("Landmine press", "landmine press principiantes"),
        ("Push-up en anillas o TRX", "flexiones en trx"),
        ("Flexión cerrada para tríceps", "flexiones cerradas"),
        ("Fondos en máquina asistida", "máquina de fondos asistidos"),
        ("Press inclinado con barra", "press inclinado barra"),
        ("Press declinado: casi nunca hace falta", "press declinado"),
        ("Pike a handstand: progresión larga", "pike a pino progresión"),
        ("Flexión en pica contra pared", "flexiones pica pared"),
        ("Suelo press con mancuernas", "floor press mancuernas"),
        ("Palms-up o neutrales en el press", "agarre neutro press"),
        ("Codos a 45 grados en la flexión", "codo en las flexiones"),
        ("Escápulas en el empuje", "omóplatos en flexiones"),
        ("No rebotar el pecho en el banco", "rebote en press banca"),
        ("Spotter: cuándo pedirlo", "quién te ayude en press banca"),
        ("Press en smith: control, no récord", "press banca en smith"),
    ]:
        a(row("empuje", title, intent))

    for title, intent in [
        ("Dominadas asistidas con banda", "dominadas asistidas con goma"),
        ("Dominadas en máquina gravitron", "dominadas asistidas máquina"),
        ("Jalón agarre prono vs neutro", "agarre en el jalón"),
        ("Remo pendlay: más adelante", "remo pendlay"),
        ("Remo Yates o ligeramente erguido", "remo yates"),
        ("Remo a una mano con mancuerna", "remo mancuerna a una mano"),
        ("Escalera de dominadas: de 0 a 1", "cómo hacer la primera dominada"),
        ("Chin-up vs pull-up", "chin up o pull up"),
        ("Escápula pull: aprender a bajar los hombros", "scapular pull ups"),
        ("Remo en TRX: ángulo del cuerpo", "remo trx técnica"),
        ("Face pull no sustituye el remo", "face pull no es suficiente espalda"),
        ("Meadows row", "meadows row"),
        ("Remo en smith", "remo en smith"),
        ("No tirar de bíceps en el jalón", "jalón con brazos"),
        ("Pecho arriba en el remo", "pecho en el remo con barra"),
        ("Negativas de dominada", "dominadas negativas"),
        ("Isométrico arriba de la dominada", "isométrico en dominadas"),
        ("Grip de toalla en remo", "remo con toalla agarre"),
    ]:
        a(row("tiron", title, intent))

    for title, intent in [
        ("Plancha lateral: cadera alineada", "plancha lateral técnica"),
        ("Rueda abdominal: demasiado pronto", "rueda abdominal principiantes"),
        ("Pallof press en polea o banda", "pallof press"),
        ("Dead bug con expiración", "dead bug respiración"),
        ("Hollow body rock: no al día uno", "hollow body rock"),
        ("Ab wheel de rodillas", "rueda abdominal de rodillas"),
        ("Crunch con tempo, si acaso", "crunch con tempo"),
        ("No hacer 200 abdominales", "cuántos abdominales al día"),
        ("McGill big three: idea, no culto", "mcgill big three"),
        ("Carry maleta o farmer unilateral", "suitcase carry"),
        ("Plancha con toque de hombro", "plancha toques de hombro"),
        ("Body saw en plancha", "body saw plancha"),
        ("Sit-up: por qué casi nunca", "sit ups sí o no"),
        ("Vacuum: no es fuerza de tronco", "vacuum abdominal"),
        ("Rotación con cable o banda", "woodchop principiantes"),
        ("Anti-rotación vs flexión de tronco", "anti rotación core"),
    ]:
        a(row("core", title, intent))

    for title, intent in [
        ("Movilidad de cadera antes de sentadilla", "movilidad de cadera sentadilla"),
        ("Movilidad de tobillo para bajar más", "movilidad de tobillo sentadilla"),
        ("Movilidad torácica para el press", "movilidad torácica press"),
        ("Círculos de muñeca y suelo", "muñecas duelen al hacer flexiones"),
        ("Calentamiento de 4 minutos que basta", "calentamiento corto fuerza"),
        ("No estirar estático antes de cargar", "estirar antes de entrenar"),
        ("Estirar suave al terminar", "estirar después de entrenar fuerza"),
        ("Foam roller: complemento, no el entreno", "foam roller principiantes"),
        ("Cadera 90/90", "movilidad 90 90 cadera"),
        ("T-spine open book", "open book movilidad"),
        ("Deslizamiento de nervio: no te lo inventes", "neurodinamia casera no"),
        ("Cuello: no dar tirones", "movilidad de cuello segura"),
        ("Hombro: pared y palo, no dislocar", "movilidad de hombro con palo"),
        ("Isquios: bisagra, no rebotar de pie", "estirar isquiotibiales"),
        ("Psoas: zancada corta de movilidad", "estirar psoas"),
        ("Muñeca en flexión de suelo", "movilidad de muñeca flexiones"),
        ("Rotadores externos de cadera", "rotación externa cadera"),
        ("Gato-vaca no es yoga class completo", "gato vaca para qué"),
        ("World's greatest stretch: una repetición seria", "worlds greatest stretch"),
        ("Cadera en flexión profunda asistida", "deep squat hold movilidad"),
        ("Tobillo contra la pared", "ankle wall stretch"),
        ("Escapulas contra la pared", "wall slides hombros"),
        ("Respiración 1 minuto antes de cargar", "respirar antes de entrenar"),
        ("No calentar 25 minutos", "calentamiento demasiado largo"),
        ("Movilidad en días de descanso", "movilidad día de descanso"),
        ("Dolor al estirar vs tirantez", "duele al estirar"),
        ("Calentar el patrón, no el músculo en abstracto", "calentar el ejercicio que vas a hacer"),
        ("Saltos de tijera suaves: sí; box jump: no", "jumping jacks calentamiento"),
    ]:
        a(row("movilidad", title, intent))

    for title, intent in [
        ("Zona 2: qué es en la práctica", "qué es zona 2"),
        ("Caminar 8.000-10.000 pasos sin obsesión", "cuántos pasos al día"),
        ("Caminar después de comer", "caminar después de comer"),
        ("Trote suave si la caminata ya es fácil", "empezar a correr suave"),
        ("Bici: cadencia y que se pueda hablar", "bici zona 2"),
        ("Elíptica: opción de rodilla sensible", "eliptica para principiantes"),
        ("Remoergómetro: técnica antes de km", "remoergometro principiantes"),
        ("Cuerda: no al mes uno de fuerza", "comba para principiantes"),
        ("Nadar: complemento, no sustituye pesas", "nadar y entrenamiento de fuerza"),
        ("Senderismo el fin de semana", "senderismo como cardio"),
        ("Subir escaleras: útil y fácil de pasarse", "subir escaleras ejercicio"),
        ("HIIT: por qué no es el plan de este catálogo", "hiit para principiantes no primero"),
        ("Cardio el mismo día que fuerza", "cardio y fuerza el mismo día"),
        ("Cardio en día aparte", "días de cardio y días de fuerza"),
        ("Frecuencia cardiaca sin cinturón caro", "medir zona 2 sin pulsómetro"),
        ("Test de hablar en voz alta", "talk test zona 2"),
        ("Caminar con pendiente", "caminar en cuesta o inclinación"),
        ("Paseo con mochila ligera", "rucking principiantes"),
        ("Correr 5 km: cuando la base existe", "preparar 5k sin dejar la fuerza"),
        ("No hacer 10 km el primer domingo", "empezar a correr de golpe"),
        ("Cardio en ayunas: no es magia", "cardio en ayunas"),
        ("Andar en cinta inclinada", "cinta inclinada caminar"),
        ("Bicicleta al trabajo", "ir en bici al trabajo"),
        ("Pasos en oficina: reuniones andando", "caminar en el trabajo"),
        ("Neat: fregar, recados, no el sofá", "qué es NEAT"),
        ("Cardio de 20 minutos que sí haces", "cardio 20 minutos principiantes"),
        ("Finisher de 4 minutos: casi nunca", "finisher cardio después de pesas"),
        ("Remar 10 minutos al final: si la técnica está", "remo 10 minutos after"),
    ]:
        a(row("cardio-caminar", title, intent))

    for title, intent in [
        ("Qué es el RPE si no te va el RIR", "rpe entrenamiento fuerza"),
        ("Doble progresión: reps y luego carga", "doble progresión fuerza"),
        ("Microdiscos o botellas: el salto pequeño", "micro cargas fuerza"),
        ("Semana 4 ligera de verdad", "semana ligera de fuerza"),
        ("Volver tras 3 semanas parado", "volver a entrenar después de parar"),
        ("Volver tras 3 meses parado", "volver al gym después de meses"),
        ("No retomar el peso de febrero", "retomar peso anterior gym"),
        ("Estancamiento de sentadilla", "estancamiento en sentadilla"),
        ("Estancamiento de flexiones", "no me salen más flexiones"),
        ("Añadir una serie, no tres ejercicios", "cómo añadir volumen"),
        ("Quitar un accesorio cuando estancas el compuesto", "quitar accesorios estancamiento"),
        ("Test de 1RM: no hace falta", "calcular 1rm principiantes"),
        ("Repeticiones máximas de prueba cada 8 semanas", "amrap de control"),
        ("Diario de entrenamiento en el móvil", "cómo registrar el entrenamiento"),
        ("Fotos de técnica, no de pose", "grabarte para ver la técnica"),
        ("Compañero que cuenta mal las reps", "contar repeticiones bien"),
        ("Subir carga en un solo ejercicio por semana", "una progresión a la vez"),
        ("Bajar 10% si el sueño fue un desastre", "entrenar con mal sueño"),
        ("Viaje de 10 días: plan mínimo", "entrenar de viaje 10 días"),
        ("Enfermedad leve: no entrenar heroico", "entrenar con resfriado"),
        ("Dolor muscular de inicio: espera", "agujetas primeras semanas"),
        ("Deload no es vacaciones de sofá", "qué hacer en la semana de descarga"),
        ("Mesociclo de 6 semanas simple", "mesociclo fuerza principiantes"),
        ("No hagas un peak de powerlifting", "peak fuerza aficionado"),
    ]:
        a(row("progresion-satelites", title, intent))

    a(row("molestias", "Agujetas o señal de parar", "agujetas o lesión", "agujetas-o-lesion"))
    for title, intent in [
        ("Molestia de rodilla en sentadilla: cambiar el gesto", "sentadilla si molesta la rodilla"),
        ("Hombro en el press: bajar el rango", "duele el hombro en el press"),
        ("Lumbar que pica en el peso muerto: bisagra", "duele la lumbar en peso muerto"),
        ("Codo en el curl: menos y mejor", "codo duele al hacer curl"),
        ("Muñeca en la flexión: puños o apoyo", "muñecas duelen flexiones"),
        ("Tendón de Aquiles al correr: no sumes salto", "aquiles al empezar a correr"),
        ("Cuello tenso en la plancha", "cuello duele en la plancha"),
        ("Cadera en zancada: acortar el paso", "cadera duele en zancadas"),
        ("Rodilla en step-up: cajón más bajo", "rodilla duele al subir escalón"),
        ("Hombro en dominadas: scapular primero", "hombros en dominadas"),
        ("No automedicar con 12 estiramientos de YouTube", "estirar una lesión"),
        ("Cuándo parar y consultar", "cuándo ir al médico por dolor al entrenar"),
        ("Entrenar alrededor de una molestia, no contra ella", "entrenar con molestia"),
        ("Ice o calor: no es el plan", "hielo o calor después de entrenar"),
        ("Antiinflamatorio y entrenar: no es una estrategia", "ibuprofeno para entrenar"),
        ("Rodillera o cincha: no sustituyen técnica", "rodillera para sentadilla"),
        ("Muñequeras: más adelante", "muñequeras press banca"),
        ("Dolor que empeora al día siguiente", "dolor que empeora al dia siguiente"),
        ("Hinchazón o chasquido: para", "rodilla suena al entrenar"),
        ("Pinchazo vs fatiga muscular", "pinchazo al entrenar"),
        ("Volver a un gesto después de una semana parado por molestia", "retomar ejercicio después de molestia"),
        ("No sustituir sentadilla por 8 máquinas de moda", "alternativas a la sentadilla"),
        ("Cinta vs zapatilla: no cura la rodilla", "calzado para rodilla gimnasio"),
    ]:
        a(row("molestias", title, intent))

    for title, intent in [
        ("Sesión de 15 minutos que aún es fuerza", "entrenar fuerza 15 minutos"),
        ("Entrenar a la hora de comer", "entrenar en la pausa del mediodía"),
        ("Entrenar a las 6 de la mañana", "entrenar fuerza por la mañana temprano"),
        ("Entrenar después de un turno de 10 horas", "entrenar después del trabajo cansado"),
        ("Hotel: 20 minutos en la habitación", "entrenar en la habitación de hotel"),
        ("Aeropuerto y hotel: no perder la semana", "entrenar de viaje trabajo"),
        ("Casa de los padres en Navidad", "entrenar en casa de los padres"),
        ("Lluvia y no ir al park", "entrenar en casa cuando llueve"),
        ("Solo hay mancuernas en el hotel", "gimnasio de hotel solo mancuernas"),
        ("Entrenar con niños en la sala", "entrenar en casa con niños"),
        ("Microdosis: 2 bloques de 10 minutos", "entrenar en dos bloques"),
        ("Saltar un día sin saltar la semana", "me salté un entrenamiento"),
        ("Escritorio 8 horas: lo que no arregla un estiramiento", "dolor de estar sentado y entrenar"),
        ("Pausa de 5 minutos cada hora: andar", "pausas para caminar en oficina"),
        ("Hombros redondeados: remo, no 40 estiramientos", "hombros hacia delante escritorio"),
        ("Lumbar de silla: no hagas 200 flexiones de tronco", "lumbar de oficina"),
        ("Cadera cerrada de silla: sentadilla y paseo", "cadera de estar sentado"),
        ("Trabajo de pie: no es un entreno de pierna", "trabajar de pie y entrenar"),
        ("Reunión andando", "walking meeting"),
        ("Estación de trabajo: pantalla y cuello", "cuello y pantalla"),
        ("Mochila del portátil: un lado solo", "mochila pesada un hombro"),
        ("Tren o bus: no cuenta como zona 2", "viajar de pie no es entrenamiento"),
        ("Fin de jornada: 10 minutos de movilidad", "movilidad después del trabajo"),
        ("Turno de noche: entrenar cuando duermas", "entrenar con turno de noche"),
        ("Guardias: el mínimo viable", "entrenar con guardias"),
        ("Semana de entregas: dos sesiones, no cero", "entrenar en semana de mucho trabajo"),
        ("Solo fines de semana: 2 sesiones serias", "entrenar solo sábado y domingo"),
        ("Comida de empresa y sesión: elige", "entrenar o comida de empresa"),
    ]:
        a(row("tiempo-viajes-escritorio", title, intent))

    for title, intent in [
        ("Empezar a entrenar a los 40", "empezar a hacer ejercicio a los 40"),
        ("Empezar a los 50 con calma", "entrenar fuerza a los 50"),
        ("Volver después de años parado", "volver a entrenar después de años"),
        ("No eres frágil: tampoco eres tu yo de 20", "entrenar después de los 40"),
        ("Tendones más lentos: más tempo, menos ego", "tendones a los 40"),
        ("Primer mes más fácil que el de un veinteañero impaciente", "primer mes gym a los 40"),
        ("Médico si hay condiciones: una visita, no un foro", "chequeo antes de entrenar"),
        ("Mujer 40+: el mismo patrón de fuerza", "entrenamiento de fuerza mujeres 40"),
        ("No hay un protocolo milagro de menopausia aquí", "entrenar en menopausia sin milagros"),
        ("Hombre 40+: no hace falta testosterona de anuncio", "bajar testosterona y entrenar"),
        ("Equilibrio: una pierna, sin circo", "equilibrio a los 40"),
        ("Caídas: fuerza de pierna y paseo", "prevenir caídas con fuerza"),
        ("Osteopenia: se habla con profesional; aquí hay fuerza suave", "fuerza y huesos"),
        ("Dolor crónico de fondo: no somos fisioterapia", "entrenar con dolor crónico"),
        ("Parón de un invierno entero", "retomar en enero de verdad"),
        ("Compararte con tu hijo en el gym", "entrenar con hijos adolescentes"),
    ]:
        a(row("cuarenta-volver", title, intent))

    for title, intent in [
        ("Bloquear la lumbar en los compuestos", "bracing lumbar"),
        ("Mirar un punto fijo en la zancada", "equilibrio en zancadas"),
        ("Pies: triángulo de apoyo", "apoyo del pie en sentadilla"),
        ("Rodillas hacia los dedos, no hacia dentro", "rodillas hacia fuera sentadilla"),
        ("Barra sobre trapecio, no sobre cuello", "dónde va la barra en sentadilla"),
        ("Codos bajo la barra en el press", "codos en press banca"),
        ("No abrir del todo los codos en flexión", "codos abiertos flexiones"),
        ("Empujar el suelo, no las rodillas", "empujar el suelo sentadilla"),
        ("Cadera atrás en la bisagra", "cadera atrás peso muerto"),
        ("Hombros lejos de las orejas en el jalón", "hombros abajo en jalón"),
        ("Apretar el agarre de verdad", "agarre fuerte barra"),
        ("No mirar los pies en la sentadilla", "cabeza en la sentadilla"),
        ("Pausa de un segundo donde falla la técnica", "pausa donde se rompe el movimiento"),
        ("Grabar de lado, no de frente con pose", "ángulo para grabar sentadilla"),
        ("Un cue por serie, no cinco", "un cue de técnica"),
        ("Velocidad de la barra: controlada, no lenta de pose", "velocidad de la repetición"),
        ("Fallo técnico vs fallo muscular", "fallo técnico"),
        ("No rebotar en el fondo de la sentadilla", "rebote en sentadilla"),
        ("Rodillas que sobrepasan la punta: no es pecado", "rodillas delante en sentadilla"),
        ("Pecho arriba sin hiperextender", "pecho arriba sentadilla"),
    ]:
        a(row("tecnica", title, intent))

    for title, intent in [
        ("Llevar el registro 12 semanas", "diario de entrenamiento 12 semanas"),
        ("Entrenar los mismos tres días cada semana", "entrenar lunes miercoles viernes"),
        ("Alarma, ropa a mano, no motivación", "hábito de entrenar"),
        ("Compañero de entreno: útil o lastre", "entrenar con un amigo"),
        ("No negociar la sesión a las 21:50", "saltar el gym por la noche"),
        ("Racha de 3 semanas: el verdadero inicio", "constancia entrenamiento 3 semanas"),
        ("Vacaciones: mínimo o parón consciente", "entrenar en vacaciones o parar"),
        ("Objetivo de 90 días realista", "objetivo entrenamiento 90 dias"),
        ("No te debes un castigo el domingo", "entrenar para compensar"),
        ("El día de mierda: sesión A recortada", "entrenar un día malo"),
        ("Ropa de entreno visible en la silla", "preparar la ropa de entrenar"),
        ("Mismo sitio de la casa", "rincón para entrenar en casa"),
        ("Contar sesiones, no calorías quemadas", "no mirar calorías del reloj"),
        ("Recompensa que no destroza el plan", "recompensa después de entrenar"),
        ("Decírselo a alguien: opcional", "accountability entrenamiento"),
        ("Dejar de coleccionar rutinas en Instagram", "dejar de guardar rutinas"),
    ]:
        a(row("habitos-entreno", title, intent))

    for title, intent in [
        ("Qué hacer los días que no entrenas", "días de descanso qué hacer"),
        ("Dormir y fuerza: lo básico", "sueño y entrenamiento de fuerza"),
        ("Si dormiste 5 horas: baja carga", "entrenar durmiendo poco"),
        ("Siesta: opcional, no ritual sagrado", "siesta y entrenamiento"),
        ("Alcohol el viernes y entrenar el sábado", "beber y entrenar al día siguiente"),
        ("Estrés de trabajo y recuperación", "estrés y recuperar del entreno"),
        ("Masaje: agradable, no milagro", "masaje después de entrenar"),
        ("Sauna: extra, no el plan", "sauna y fuerza"),
        ("Pasos extra en día de descanso", "caminar en día de descanso"),
        ("No hacer un entreno ‘suave’ que no deja recuperar", "entreno suave que fatiga"),
        ("Dolor de dormir mal vs agujetas", "dolor de no dormir y entrenar"),
        ("Café antes de entrenar: si te sienta", "café antes de entrenar"),
        ("Pantalla a las 23:00 y la sesión de las 7", "dormir mal por el móvil"),
        ("Fin de semana largo de sueño", "recuperar sueño el fin de semana"),
        ("Viaje con jet lag: no hagas un PR", "entrenar con jet lag"),
        ("Reloj de sueño: tendencia, no sentencia", "anillo o reloj de sueño"),
        ("Sexo, vida y no periodizar el descanso", "vida normal y recuperar"),
        ("Descanso activo: paseo, no CrossFit light", "descanso activo qué es"),
    ]:
        a(row("recuperacion-entreno", title, intent))

    for title, intent in [
        ("Entrenar todos los días porque es suave", "entrenar fuerza todos los días"),
        ("Añadir cinco ejercicios de un reel", "copiar rutina de instagram"),
        ("Buscar el ardor como prueba", "el ardor muscular no es el objetivo"),
        ("Hacer cardio duro antes de la sentadilla", "cardio antes de pesas"),
        ("Estirar 20 minutos y no cargar", "solo estirar y no entrenar"),
        ("Máquina de abs 15 minutos", "solo abdominales en el gym"),
        ("Saltar la sentadilla porque ‘no siento glúteo’", "no siento el glúteo en sentadilla"),
        ("Subir peso cada serie de calentamiento", "calentamiento con demasiado peso"),
        ("Comparar tu sentadilla con un powerlifter", "compararte en el gimnasio"),
        ("Dejar de entrenar pierna", "no entrenar piernas"),
        ("Hacer solo brazos", "solo entrenar brazos"),
        ("Usar cinturón en el curl", "cinturón para todo"),
        ("Tirones de cuello en el crunch", "manos en el cuello abdominales"),
        ("Rebotar el jalón con el tronco", "balanceo en el jalón"),
        ("Hacer 10 series de un aislamiento", "demasiadas series de aislamiento"),
        ("Entrenar con dolor agudo para no perder el día", "entrenar con dolor agudo"),
    ]:
        a(row("errores", title, intent))

    for title, intent in [
        ("No alargar la sesión para ‘ganar’ la cena", "alargar el entreno para merecer comer"),
        ("Si llevas 5 horas sin comer: sesión más corta", "entrenar muchas horas después de comer"),
        ("Terminar a tiempo para cenar a una hora humana", "entrenar y cenar antes de las 23"),
        ("No añadir un finisher para quemar la comida", "finisher para merecer la cena"),
        ("Semana de descarga: entrenas menos, no ‘pagas’ con hambre", "descarga no es recorte de comida"),
        ("Agujetas: bajas carga; no conviertas el gym en un ayuno", "entrenar con agujetas sin recortar la sesión a hambre"),
        ("Pausa para beber; no un gel de competición en 25 minutos", "pausas para beber en la sesión de fuerza"),
        ("Café: si te sube el pulso, espera al primer compuesto", "café justo antes del primer ejercicio"),
        ("Gym que cierra a las 22: mueve la sesión, no cenes a las 00:00", "sesión nocturna y hora de cenar"),
        ("No pedir comida entre series", "pedir comida entre series"),
        ("Hambre en el gym: recorta accesorios, no abandones el compuesto", "hambre a mitad de la sesión"),
        ("Calor de agosto: alarga el descanso, no improvises sales de anuncio", "sesión de fuerza con mucho calor"),
    ]:
        a(row("puentes-comida", title, intent))

    return items


def alimentacion() -> list[dict]:
    items: list[dict] = []
    a = items.append

    a(row("nucleo", "Cómo organizar las comidas de la semana: menú fácil", "organizar comidas de la semana", "organizar-comidas-de-la-semana", "publicado"))
    a(row("nucleo", "Proteína, hidratos y grasas: cómo armar el plato", "proteína hidratos y grasas", "proteina-hidratos-grasas-guia-practica", "publicado"))

    for title, intent in [
        ("Qué comer antes y después de entrenar", "qué comer antes y después de entrenar"),
        ("Proteína si entrenas fuerza, sin batido obligatorio", "proteína si entrenas fuerza"),
        ("Hidratos en días de entreno y de descanso", "hidratos días de entreno"),
        ("Cenas rápidas después de entrenar", "cenas rápidas después de entrenar"),
        ("Desayuno si entrenas a las 7", "desayuno antes de entrenar por la mañana"),
        ("Entrenar en ayunas: cuándo no", "entrenar en ayunas alimentación"),
        ("Snack 60-90 minutos antes de la sesión", "qué merendar antes de entrenar"),
        ("Comer 2 horas antes: un plato normal", "comida 2 horas antes de entrenar"),
        ("Después de entrenar si no tienes hambre", "no tengo hambre después de entrenar"),
        ("Batido: atajo de viaje, no virtud", "batido de proteína sí o no"),
        ("Leche chocolateada: mito y uso real", "leche chocolateada después de entrenar"),
        ("Ventana anabólica de 20 minutos: no", "ventana anabólica mito"),
        ("Agua y sal si la sesión fue larga de verdad", "hidratación después de entrenar"),
        ("Entrenar a mediodía: tupper que se aguante", "comer al mediodía si entrenas"),
        ("Entrenar después del trabajo: no llegues vacío", "comer por la tarde si entrenas a las 8"),
        ("Día de descanso: no recortes a lo loco", "qué comer el día de descanso"),
        ("Doble sesión (casi nunca): comer en medio", "comer entre dos entrenos"),
        ("Cardio suave y desayuno", "qué desayunar si vas a caminar mucho"),
        ("Fuerza de noche y sueño: cena completa", "cena pesada después de entrenar"),
        ("Café solo no es desayuno de entreno", "café en ayunas y entrenar"),
        ("Gel y deportivo: no para 25 minutos de casa", "geles energéticos principiantes"),
        ("Plátano: útil, no milagro", "plátano antes de entrenar"),
        ("Yogur y fruta post-sesión", "yogur después de entrenar"),
        ("Bocadillo de tortilla post-gym", "bocadillo después de entrenar"),
        ("Arroz y pollo: cliché que funciona", "arroz y pollo post entreno"),
        ("Si cenas fuera el día de entreno", "cenar fuera después de entrenar"),
        ("Alcohol post-entreno: peor recuperación", "cerveza después de entrenar"),
        ("Comer más el día que entrenas de verdad", "comer más los días de entreno"),
        ("Reunión que se come la merienda pre-entreno: plan B", "entrenar a las 8 sin merienda"),
        ("Viaje y sesión: yogur y fruta de gasolinera cuentan", "comer algo de viaje antes de entrenar"),
    ]:
        a(row("comer-para-entrenar", title, intent))

    for title, intent in [
        ("Huevos: cómo ponerlos en el centro del plato", "huevos como proteína"),
        ("Yogur natural: proteína de nevera", "yogur natural proteína"),
        ("Queso fresco o cottage", "queso cottage proteína"),
        ("Lentejas de bote: centro, no puñado", "lentejas como plato principal"),
        ("Garbanzos: hummus no basta como única proteína", "garbanzos proteína plato"),
        ("Alubias y alubias blancas", "alubias proteína"),
        ("Tofu: cómo no dejarlo insípido", "cómo cocinar tofu principiantes"),
        ("Tempeh", "tempeh qué es y cómo usarlo"),
        ("Edamame", "edamame proteína"),
        ("Atún en lata: límites y uso", "atún en lata todos los días"),
        ("Sardinas en lata", "sardinas en lata proteína"),
        ("Merluza o pescado blanco de súper", "pescado blanco fácil"),
        ("Salmón: cuando sale de precio", "salmón casero sencillo"),
        ("Pollo al horno para varios días", "pollo al horno meal prep"),
        ("Pavo", "pavo como proteína"),
        ("Carne picada: elegir y escurrir", "carne picada para comer mejor"),
        ("Ternera ocasional", "carne roja de vez en cuando"),
        ("Jamón o fiambre: no es el pilar", "fiambre como proteína"),
        ("Seitán", "seitan proteína"),
        ("Heura u otros análogos: a veces", "análogos de carne proteína"),
        ("Proteína de guisante en polvo: atajo", "proteína vegetal en polvo"),
        ("Claros de huevo: no hace falta vivir de ellos", "claras de huevo todos los días"),
        ("Kéfir", "kefir proteína"),
        ("Skyr o griego", "yogur griego proteína"),
        ("Leche: un vaso no arma el plato", "leche como proteína"),
        ("Quinoa: hidrato con algo de proteína, no milagro", "quinoa proteína mito"),
        ("Avena: hidrato primero", "avena tiene proteína"),
        ("Frutos secos: grasa, poca proteína neta", "frutos secos proteína mito"),
        ("Combinar legumbre y cereal en el mismo plato", "combinar lentejas y arroz"),
        ("Cuánta proteína en el desayuno", "proteína en el desayuno"),
        ("Proteína en la cena si el mediodía fue flojo", "proteína en la cena"),
        ("Repartir proteína en 3 comidas", "repartir proteína en el día"),
        ("No hace falta 200 g de pollo en cada plato", "ración de proteína visual"),
        ("Puñado vs filete: el ojo", "ración de proteína con el ojo"),
        ("Proteína y satiedad", "proteína para saciar"),
        ("Vegano y proteína sin obsesión por el polvo", "proteína vegana práctica"),
        ("Vegetariano ovolácteo: huevo y lácteo de verdad", "proteína vegetariana práctica"),
        ("Marisco ocasional", "gambas y proteína"),
        ("Hígado u órganos: no obligatorio", "comer hígado"),
        ("Conservas de calidad decente", "conservas de pescado proteína"),
    ]:
        a(row("proteina-alimentos", title, intent))

    for title, intent in [
        ("Pan: cómo entra en un plato serio", "pan en una dieta equilibrada"),
        ("Arroz blanco o integral: el que comas", "arroz blanco o integral"),
        ("Pasta: ración que sacia, no miedo", "ración de pasta"),
        ("Patata y boniato", "patata en el plato"),
        ("Avena de desayuno que aguanta", "avena desayuno saciante"),
        ("Fruta entera, no zumo", "fruta o zumo"),
        ("Plátano, manzana, naranja: usos distintos", "qué fruta entre horas"),
        ("Legumbre también es hidrato", "legumbres hidratos y proteína"),
        ("Cuscús y bulgur", "cuscús plato fácil"),
        ("Maíz y palomitas caseras", "palomitas como hidrato"),
        ("Tortilla de trigo o maíz", "tortillas de trigo o maíz"),
        ("Arroz de nevera para saltar", "arroz de leftover"),
        ("Pan de pueblo vs pan de molde", "qué pan comprar"),
        ("Hidratos de noche: no son el enemigo", "hidratos por la noche"),
        ("Quitar el pan y picotear galletas", "quitar el pan y picar"),
        ("Ración de arroz con el cazo", "ración de arroz visual"),
        ("Pasta al dente y verdura en el mismo plato", "pasta con verduras plato"),
        ("Patata al horno para varios días", "patatas al horno meal prep"),
        ("Avena nocturna", "overnight oats"),
        ("Muesli: mirar el azúcar", "muesli o granola"),
        ("Granola: cucharadas, no tazón infinito", "granola ración"),
        ("Arroz con lentejas (no milagro, sí plato)", "arroz con lentejas"),
        ("Cerveza no es un hidrato de entreno", "cerveza como hidrato"),
        ("Azúcar de mesa vs hidrato de patata", "azúcar o hidratos de verdad"),
    ]:
        a(row("hidratos", title, intent))

    for title, intent in [
        ("Aceite de oliva: la cuchara cuenta", "cuánto aceite de oliva al día"),
        ("Frutos secos: un puñado, no el paquete", "ración de frutos secos"),
        ("Aguacate: media pieza, no tres", "ración de aguacate"),
        ("Pescado azul de lata o fresco", "pescado azul veces por semana"),
        ("Semillas: lino, chía, sésamo sin culto", "semillas en el yogur"),
        ("Mantequilla o aceite: elige y mide a ojo", "mantequilla o aceite de oliva"),
        ("Queso curado: sabor, no bloque entero", "ración de queso"),
        ("Aceitunas", "aceitunas grasa"),
        ("Tahini o crema de cacahuete: cucharada", "crema de cacahuete ración"),
        ("Fritura de vez en cuando", "fritura casera de vez en cuando"),
        ("Salsas industriales a chorro", "salsas calóricas escondidas"),
        ("Yema de huevo: no la tires por sistema", "tirar la yema"),
        ("Lácteos enteros si te sientan", "lácteos desnatados o enteros"),
        ("Coco y aceite de coco: no milagro", "aceite de coco mito"),
        ("Omega 3 de comida, no de anuncio", "omega 3 en la comida"),
        ("Grasa y saciedad del plato", "grasas para saciar"),
    ]:
        a(row("grasas", title, intent))

    for title, intent in [
        ("Tostada, huevo, tomate y aceite", "desayuno tostada huevo tomate"),
        ("Yogur, fruta y avena", "desayuno yogur avena fruta"),
        ("Porridge que no es postre", "porridge saciante"),
        ("Tortilla francesa de desayuno", "tortilla de desayuno"),
        ("Restos de cena como desayuno", "cenar leftovers de desayuno"),
        ("Café con leche y nada más: no aguanta", "desayuno solo café"),
        ("Bollería de bar: el día que pasa", "desayuno de bar"),
        ("Desayuno en 5 minutos entre semana", "desayuno rápido entre semana"),
        ("Desayuno de fin de semana sin buffet infinito", "desayuno domingo sin exceso"),
        ("Batido de desayuno: si no hay tiempo de masticar", "batido de desayuno"),
        ("Pan, queso y fruta", "desayuno pan queso fruta"),
        ("Avena salada con huevo", "avena salada"),
        ("Yogur y frutos secos: suma el puñado", "yogur con frutos secos"),
        ("No hace falta desayunar a las 7 si no tienes hambre", "saltar el desayuno a veces"),
        ("Desayuno después de entrenar por la mañana", "desayuno después de entrenar"),
        ("Gachas de polenta o sémola", "polenta desayuno"),
        ("Requesón y fruta", "requeson desayuno"),
        ("Tostada de aguacate que no sea solo grasa", "tostada de aguacate con proteína"),
        ("Cereales de caja: mirar la etiqueta", "cereales de desayuno"),
        ("Zumo de naranja no sustituye la pieza", "zumo de naranja desayuno"),
        ("Mermelada: cucharadita", "mermelada desayuno"),
        ("Mantequilla de cacahuete en tostada con yogur al lado", "tostada crema de cacahuete"),
        ("Huevos revueltos y pan", "huevos revueltos desayuno"),
        ("Desayuno de viaje en gasolinera", "desayuno en carretera"),
    ]:
        a(row("desayunos", title, intent))

    for title, intent in [
        ("Tupper de arroz, pollo y verdura", "tupper de pollo arroz verdura"),
        ("Tupper de lentejas", "tupper de lentejas"),
        ("Ensalada que es un plato, no lechuga triste", "ensalada completa trabajo"),
        ("Wrap o bocadillo serio de mediodía", "bocadillo de trabajo saciante"),
        ("Menú del día: cómo no volverte loco", "menú del día equilibrado"),
        ("Comer en 20 minutos en la oficina", "comer rápido en el trabajo"),
        ("Sopa y segundo: invierno", "sopa como comida"),
        ("Restos de ayer calentados bien", "recalentar tupper"),
        ("Poke o bowl casero", "bowl de comida casero"),
        ("Pasta fría con atún y verdura", "ensalada de pasta trabajo"),
        ("Quinoa bowl sin culto", "bowl de quinoa"),
        ("Comida de tupper que no huela a drama", "tupper en la oficina"),
        ("Nevera de trabajo: qué se puede dejar", "comida en la nevera del trabajo"),
        ("Microondas: no todo se lleva bien", "recalentar en microondas"),
        ("Comer de pie en la cocina del office", "comer en la cocina de la oficina"),
        ("Salir a un bar de raciones y armar plato", "raciones al mediodía"),
        ("Hamburguesa de vez en cuando al mediodía", "hamburguesa a mediodía"),
        ("Pizza al mediodía: añade ensalada o no pidas extra", "pizza al mediodía"),
        ("Ayuno de mediodía por reuniones: plan B", "saltar la comida por trabajo"),
        ("Fruta de postre, no bollería automática", "postre del mediodía"),
    ]:
        a(row("comida-tupper", title, intent))

    for title, intent in [
        ("Cena de huevos y verdura", "cena de huevos"),
        ("Cena de pescado al horno y bandeja", "cena de pescado al horno"),
        ("Cena de legumbre rápida de bote", "cena de legumbres de bote"),
        ("Revuelto o tortilla de cena", "tortilla de cena"),
        ("Sopa + tostada + queso", "cena de sopa"),
        ("Cena ligera vs cena completa: el día decide", "cena ligera o completa"),
        ("Cena a las 22:30 después del gym", "cenar tarde después de entrenar"),
        ("Cena de leftover de mediodía", "cenar el tupper de mediodía"),
        ("Avena de cena: si te sienta", "avena por la noche"),
        ("Yogur de cena: casi nunca basta", "cenar solo yogur"),
        ("Cena de ensalada que sacia", "ensalada de cena"),
        ("Pasta de cena con atún o huevo", "pasta de cena"),
        ("Arroz frito de leftover", "arroz frito leftover"),
        ("Crema de verduras y proteína", "crema de verduras cena"),
        ("Quesadilla casera", "quesadilla casera cena"),
        ("Hamburguesa casera de vez en cuando", "hamburguesa casera"),
        ("Pizza casera de sartén", "pizza casera sartén"),
        ("Cena de domingo que deja bases", "cena domingo meal prep"),
        ("Invitados: un plato que escala", "cocinar para invitados sencillo"),
        ("Cena de verano fría", "cenas frías verano"),
        ("Cena de invierno de cuchara", "platos de cuchara cena"),
        ("Huevos con patata (tortilla de patata a trozos)", "tortilla de patata casera"),
        ("Salteado de 15 minutos", "salteado de cena rápido"),
        ("Sándwich serio de cena", "sándwich de cena"),
    ]:
        a(row("cenas", title, intent))

    for title, intent in [
        ("Hambre a media mañana", "hambre a media mañana qué comer"),
        ("Hambre a las 18:00", "hambre a media tarde"),
        ("Fruta y yogur entre horas", "merienda yogur y fruta"),
        ("Puñado de frutos secos entre horas", "frutos secos merienda"),
        ("Pan y tomate de merienda", "pan con tomate merienda"),
        ("Chocolate: dos onzas, no la tableta", "chocolate a diario"),
        ("Galletas de oficina: el tarro", "galletas en la oficina"),
        ("Palomitas caseras", "palomitas merienda"),
        ("Hummus y zanahoria", "hummus merienda"),
        ("Queso y fruta", "queso y manzana"),
        ("Café con leche como ‘merienda’ insuficiente", "merienda solo café"),
        ("Picar queso del tarro de pie", "picar de pie en la cocina"),
        ("Sed que parece hambre", "sed o hambre"),
        ("Merienda pre-cena para no llegar salvaje", "merienda para no cenar de más"),
        ("Yogur para llevar entre horas", "yogur para llevar merienda"),
        ("Bocadillo pequeño a media tarde", "bocadillo de merienda"),
    ]:
        a(row("snacks", title, intent))

    for title, intent in [
        ("Lista de la compra semanal sencilla", "lista de la compra semanal"),
        ("Comprar para el plan, no al revés", "lista de la compra según el menú"),
        ("Marcas blancas que bastan", "marca blanca supermercado comida"),
        ("Ofertas: solo si entra en el plan", "ofertas supermercado no caer"),
        ("Congelados útiles: verdura, pescado, pan", "congelados útiles"),
        ("Botes de legumbre: stock mínimo", "stock de legumbres de bote"),
        ("Huevos: cuántos comprar", "cuántos huevos comprar"),
        ("Fruta de temporada y la que aguanta", "fruta de temporada compra"),
        ("Verdura que aguanta vs hoja que se pudre", "verdura que dura en la nevera"),
        ("Pan: barra y rebanadas que se congelan", "congelar pan"),
        ("Aceite, vinagre, sal, especias: base", "despensa básica"),
        ("No llenar el carro de ‘por si acaso’", "compra por si acaso"),
        ("Mercado vs súper: da igual si hay plan", "mercado o supermercado"),
        ("Compra online: misma lista", "compra online supermercado"),
        ("Ir con hambre al súper", "no ir al supermercado con hambre"),
        ("Ticket: revisar ultraprocesados colados", "revisar el ticket del super"),
        ("Presupuesto semanal de comida realista", "presupuesto comida semanal"),
        ("Comer bien sin gastar como restaurante", "comer rico barato"),
        ("Pollo entero vs filetes", "pollo entero más barato"),
        ("Pescado congelado vs fresco", "pescado congelado o fresco"),
        ("Queso: cuña vs lonchas", "comprar queso"),
        ("Yogures: natural grande vs unidades", "yogur natural económico"),
        ("Especias que usas de verdad", "especias básicas cocina"),
        ("No comprar 12 salsas", "salsas de bote"),
        ("Bolsa reutilizable y huevos arriba", "organizar las bolsas de la compra"),
        ("Caducidad en el lineal: mira", "fecha de caducidad al comprar"),
        ("Congelador lleno de misterios: inventario", "qué hay en el congelador"),
        ("Compra de 10 minutos con lista corta", "compra rápida con lista"),
    ]:
        a(row("compra-presupuesto", title, intent))

    for title, intent in [
        ("Batch cooking de una hora", "batch cooking una hora"),
        ("Cocinar dos bases el domingo", "cocinar bases el domingo"),
        ("Pollo asado para tres días", "pollo asado meal prep"),
        ("Bandeja de verdura al horno", "verdura al horno bandeja"),
        ("Olla de lentejas para varios días", "lentejas para varios días"),
        ("Arroz en cantidad y cómo guardarlo", "cocinar arroz para la semana"),
        ("Huevos duros de nevera", "huevos duros meal prep"),
        ("Garbanzos de bote salteados el domingo", "garbanzos meal prep"),
        ("Sopa o crema que aguanta", "crema de verduras para varios días"),
        ("Congelar en raciones", "congelar comida en raciones"),
        ("Descongelar sin drama", "cómo descongelar comida"),
        ("Tupper de cristal o plástico que cierre", "mejores tuppers meal prep"),
        ("Etiquetar con el día", "etiquetar tuppers"),
        ("No prep de 7 desayunos distintos", "meal prep excesivo"),
        ("Prep de 30 minutos un miércoles", "batch cooking entre semana"),
        ("Cocinar de más a propósito", "cocinar extra para leftover"),
        ("Horno a 200 y una bandeja", "sheet pan dinner"),
        ("Olla a presión o normal: da igual", "olla a presión lentejas"),
        ("Airfryer: un electrodoméstico, no un método", "airfryer meal prep"),
        ("Lavavajillas: cuenta en el plan", "cocinar con poco fregado"),
        ("Cocinar con lo que ya hay", "cocinar con la nevera que tienes"),
        ("Batch de salsa de tomate casera", "salsa de tomate casera lote"),
        ("Congelar sofrito en cubitos", "congelar sofrito"),
        ("Cocer huevos y una bandeja el mismo rato", "batch huevos y verdura"),
    ]:
        a(row("prep-batch", title, intent))

    for title, intent in [
        ("Comer fuera sin desmontar el plan", "comer fuera y comer bien"),
        ("Menú del día: primero, segundo, pan", "elegir en el menú del día"),
        ("Carta: proteína visible + verdura + hidrato", "cómo pedir en un restaurante"),
        ("Delivery: elige plato, no tres extras", "pedir delivery más sano"),
        ("Hamburguesería: menú completo de vez en cuando", "hamburguesa de vez en cuando"),
        ("Pizzería: una pizza, no la combinada infinita", "pizza y comer bien"),
        ("Sushi: no es ‘light’ por ser crudo", "sushi calorías"),
        ("Kebab o döner: el día que toca", "kebab de vez en cuando"),
        ("Desayuno de hotel buffet", "buffet de hotel cómo no pasarse"),
        ("Comida de boda o evento", "comer en un banquete"),
        ("Tapeo: raciones y un criterio", "ir de tapas sin pasarse"),
        ("Cervecería: ración y ensalada", "comer en una cervecería"),
        ("Comida china o tailandesa para llevar", "comida china para llevar"),
        ("Poke bar: no ahogues en salsa", "poke bowl salsas"),
        ("Brunch: es comida, no premio infinito", "brunch equilibrado"),
        ("Vino o cerveza fuera: cuenta", "beber fuera y el plato"),
        ("Pan de cesta: decide antes", "pan de cesta restaurante"),
        ("Postre fuera: uno para compartir o nada", "postre en el restaurante"),
    ]:
        a(row("comer-fuera", title, intent))

    for title, intent in [
        ("Tupper que no se abra en el metro", "tupper para llevar al trabajo"),
        ("Nevera compartida: etiqueta", "nevera de oficina etiqueta"),
        ("Microondas de oficina: tiempos", "microondas oficina"),
        ("No hay nevera: comida que aguanta", "comida para llevar sin nevera"),
        ("Turno con 12 minutos para comer", "comer en 12 minutos trabajo"),
        ("Reunión a la hora de comer: plan B", "saltar la comida por reunión"),
        ("Café de máquina y galleta: no es comida", "vending de oficina"),
        ("Fruta en el cajón", "fruta en la oficina"),
        ("Frutos secos en el cajón: el paquete pequeño", "frutos secos oficina"),
        ("Agua en la mesa", "beber agua en la oficina"),
        ("Cumpleaños con palmeras: una o ninguna", "bollería de oficina"),
        ("Afterwork y cena tardía", "afterwork y cena"),
        ("Oficina sin ventana y hambre rara", "hambre por aburrimiento oficina"),
        ("Teletrabajo: no picar cada vez que pasas", "picar en casa teletrabajo"),
        ("Cocina de casa a 8 metros: ventaja y trampa", "teletrabajo y nevera"),
        ("Llevar cubiertos de verdad", "cubiertos para el tupper"),
        ("Reunión de desayuno de trabajo", "desayuno de trabajo reunión"),
        ("Comida de equipo: un plato, no tres primeros", "comida de equipo oficina"),
    ]:
        a(row("oficina", title, intent))

    for title, intent in [
        ("Semana vegetariana práctica", "comer vegetariano una semana"),
        ("Plato vegano con proteína visible", "plato vegano proteína"),
        ("Huevo y lácteo si eres ovolácteo", "vegetariano ovolacteo platos"),
        ("Soja: tofu, tempeh, edamame", "soja proteína práctica"),
        ("B12: con profesional si eres vegano estricto", "b12 vegano"),
        ("Hierro de legumbre y verdura: plato real", "hierro vegetariano comida"),
        ("No vivir de queso y pan", "vegetariano mal planteado"),
        ("Hamburguesa vegetal: lee la etiqueta", "hamburguesa vegetal"),
        ("Lentejas con arroz y verdura", "plato de lentejas arroz y verdura"),
        ("Garbanzos al horno", "garbanzos al horno"),
        ("Falafel casero o decente de súper", "falafel casero"),
        ("Chili sin carne", "chili vegetariano"),
        ("Curry de lentejas rápido", "curry de lentejas"),
        ("Tacos de alubias", "tacos vegetarianos"),
        ("Ensalada de garbanzos que sacia", "ensalada de garbanzos"),
        ("Tofu revuelto de desayuno", "tofu revuelto"),
        ("Seitán en salteado", "salteado de seitan"),
        ("Hummus como extra, no como plato único", "hummus como comida"),
        ("Leche vegetal: elige y ya", "leche vegetal cuál"),
        ("Queso vegetal: no es obligatorio", "queso vegano"),
        ("Miel y vegano: tu criterio", "miel vegano"),
        ("Comer fuera siendo vegetariano", "restaurante vegetariano práctico"),
    ]:
        a(row("vegetariano-legumbres", title, intent))

    for title, intent in [
        ("Verdura al horno como hábito", "verdura al horno"),
        ("Verdura de bolsa o congelada: válida", "verdura congelada"),
        ("Ensalada de base que no se oxide ya", "ensalada que aguanta"),
        ("Brócoli, coliflor, col: bandeja", "brócoli al horno"),
        ("Calabacín y berenjena", "calabacin al horno"),
        ("Tomate: ensalada y sofrito", "tomate en la comida"),
        ("Cebolla y ajo: sabor, no relleno", "sofrito básico"),
        ("Zanahoria cruda y cocida", "zanahoria cruda"),
        ("Pimiento asado", "pimientos asados"),
        ("Espinacas de bolsa salteadas", "espinacas salteadas"),
        ("Acelgas y otras hojas", "acelgas receta fácil"),
        ("Guisantes congelados", "guisantes congelados"),
        ("Menestra de congelado", "menestra congelada"),
        ("Fruta de postre casi siempre", "fruta de postre"),
        ("Manzana entre horas", "manzana merienda"),
        ("Naranja y mandarina de invierno", "cítricos de invierno"),
        ("Frutos rojos congelados", "frutos rojos congelados"),
        ("Uva: racimo, no cubo", "uva ración"),
        ("Sandía y melón de verano", "sandía como postre"),
        ("Peras y kiwi", "pera o kiwi"),
        ("Compotas y fruta en almíbar: mira azúcar", "fruta en almibar"),
        ("Smoothie: no sustituye el plato", "smoothie o fruta"),
        ("Verdura cruda vs cocida: las dos", "verdura cruda o cocida"),
        ("Volumen de verdura en el plato", "mitad del plato verdura"),
    ]:
        a(row("verdura-fruta", title, intent))

    for title, intent in [
        ("Docena de huevos: usos de la semana", "recetas con huevos semana"),
        ("Tortilla de dos huevos y un extra", "tortilla de dos huevos"),
        ("Huevo poché o escalfado sin drama", "huevo poche casero"),
        ("Pescado congelado al horno con papel", "pescado congelado al horno"),
        ("Lomos vs hamburguesa de pescado", "hamburguesa de pescado"),
        ("Leche en café y en papilla de avena", "leche en la avena"),
        ("Yogur natural grande y se sirve", "yogur natural a granel"),
        ("Queso fresco en tostada", "queso fresco tostada"),
        ("Pollo desmenuzado para bowls", "pollo desmenuzado meal prep"),
        ("Carne en salsa de un día para otro", "estofado para leftover"),
        ("Hamburguesa de ternera casera", "hamburguesa casera ternera"),
        ("Albóndigas al horno", "albondigas al horno"),
        ("Pavo en filetes finos", "filetes de pavo"),
        ("Bacalao desalado de súper", "bacalao desalado fácil"),
        ("Mejillones de vez en cuando", "mejillones receta fácil"),
        ("Latas: atún, sardina, caballa", "conservas de pescado semana"),
        ("Huevo + yogur el mismo día: perfecto", "huevo y yogur el mismo día"),
        ("No hace falta carne todos los días", "días sin carne"),
        ("Caldo de pollo para sopas", "caldo de pollo casero"),
        ("Hígado: si te gusta, de vez en cuando", "receta de higado"),
        ("Fiambre de calidad decente para un sándwich", "jamón york o pavo sándwich"),
        ("Salmón ahumado: extra, no hábito diario", "salmon ahumado"),
    ]:
        a(row("huevos-pescado-lacteos-carne", title, intent))

    for title, intent in [
        ("Hambre de verdad vs aburrimiento", "hambre o aburrimiento"),
        ("Llegar a la cena salvaje", "hambre extrema a la cena"),
        ("Saciedad: proteína, volumen, tiempo", "cómo sentirse saciado"),
        ("Comer más lento", "comer más despacio"),
        ("Pantalla en la comida", "comer mirando el móvil"),
        ("Picoteo invisible de pie", "abrir la nevera sin sentarte"),
        ("Antojo de dulce después de salado", "antojo de dulce después de comer"),
        ("Salado de noche", "antojo salado por la noche"),
        ("Días de más hambre (entreno, ciclo, sueño)", "más hambre de lo normal"),
        ("Días de menos hambre: igual hay que comer", "no tengo hambre pero debo comer"),
        ("No compensar un atracón con un ayuno", "compensar un atracón"),
        ("Hambre social", "comer porque comen otros"),
        ("Cansancio que pide azúcar", "cansancio y ganas de azúcar"),
        ("Hambre al despertar: desayuno, no solo café", "hambre al despertar"),
        ("Masticar chicle: a veces", "chicle para no picar"),
        ("Dejar de comprar lo que no quieres picar", "no tener galletas en casa"),
        ("Plato en mesa, no del táper de pie", "sentarse a comer"),
        ("Segundo plato: espera 10 minutos", "repetir plato"),
        ("Hambre a las 23:00", "hambre nocturna qué hacer"),
        ("Comer rápido y seguir con hambre", "comer rápido y no saciarse"),
    ]:
        a(row("hambre-saciedad", title, intent))

    for title, intent in [
        ("Fibra: verdura, fruta, legumbre, avena", "cómo comer más fibra"),
        ("Agua: un vaso al levantarte y en las comidas", "cuánta agua beber al día"),
        ("Café: 1-3 si te sienta", "cuánto café al día"),
        ("Café con leche en las comidas", "café con leche"),
        ("Té", "té a diario"),
        ("Alcohol: el criterio de no entrenar borracho", "alcohol y hábitos"),
        ("Cerveza 0: si te sirve, no milagro", "cerveza sin alcohol"),
        ("Refrescos: el hábito del vaso", "dejar los refrescos"),
        ("Edulcorantes: no es el tema central", "edulcorantes sí o no"),
        ("Zumo y néctar", "nectar envasado o fruta"),
        ("Bebidas vegetales azucaradas", "bebida vegetal azúcar"),
        ("Caldo y sopas: agua y sal", "sopa hidratación"),
        ("Beber en las comidas o entre: da igual", "beber agua en las comidas"),
        ("Verano y más agua", "beber más agua en verano"),
        ("Pipí claro: señal tosca y útil", "orina clara hidratación"),
        ("Fibra de golpe y tumba: sube despacio", "subir fibra poco a poco"),
    ]:
        a(row("fibra-agua-cafe-alcohol", title, intent))

    for title, intent in [
        ("Ultraprocesados: criterio, no pánico", "qué son los ultraprocesados"),
        ("Leer el azúcar de la etiqueta", "leer azúcar en la etiqueta"),
        ("Lista de ingredientes corta suele ayudar", "lista de ingredientes corta"),
        ("Fiambres y procesados de carne", "fiambres ultraprocesados"),
        ("Salsas: ketchup, mayonesa, BBQ", "salsas ultraprocesadas"),
        ("Bollería empaquetada", "bollería industrial"),
        ("Helado: de vez en cuando", "helado de vez en cuando"),
        ("Galletas ‘fitness’", "galletas fitness"),
        ("Barritas: a veces viaje", "barritas de proteína"),
        ("Cereales infantiles de adulto", "cereales azucarados"),
        ("Platos preparados del súper: leer", "comida preparada supermercado"),
        ("Pan de molde: compara etiquetas", "pan de molde ingredientes"),
        ("Yogures de sabores", "yogur de sabores azúcar"),
        ("Bebidas isotónicas: no para el sofá", "isotónicas"),
        ("‘Sin azúcar’ lleno de otras cosas", "productos sin azúcar"),
        ("No hace falta 100% casero para comer bien", "no todo tiene que ser casero"),
    ]:
        a(row("ultraprocesados-etiquetas", title, intent))

    for title, intent in [
        ("Saltear en 10 minutos", "cómo saltear verdura"),
        ("Horno a 200 con papel", "hornear con papel de horno"),
        ("Olla: sofrito, líquido, tiempo", "guiso sencillo"),
        ("Hervir huevos, patata, arroz", "hervir bien arroz huevos"),
        ("Sartén que no se pega: calor y aceite", "sartén antiadherente uso"),
        ("Cuchillo decente y tabla", "cuchillo de cocina básico"),
        ("Picar cebolla sin teatro", "picar cebolla"),
        ("Sal al final y prueba", "salar la comida"),
        ("Especias: pimentón, comino, pimienta", "especias básicas"),
        ("Limón y vinagre", "vinagreta sencilla"),
        ("Aliño que hace comer verdura", "aliño para ensalada"),
        ("No hace falta 18 ingredientes", "recetas de pocos ingredientes"),
        ("Un plato único de sartén", "one pan dinner"),
        ("Arroz + algo + verdura: plantilla", "plantilla de plato arroz"),
        ("Pasta + proteína + verdura: plantilla", "plantilla de plato pasta"),
        ("Tortilla + pan + tomate + ensalada", "plato de tortilla completo"),
        ("Bowl: base, proteína, verdura, salsa", "cómo montar un bowl"),
        ("Sándwich que es comida", "sándwich completo"),
        ("Crema triturada de lo que hay", "crema de verduras con lo que hay"),
        ("Tostada de cena con sentido", "tostadas de cena"),
        ("Huevos y patata: sartén única", "huevos con patatas sartén"),
        ("Salmón y brócoli al horno", "salmon y brocoli al horno"),
        ("Garbanzos, espinacas y huevo", "garbanzos con espinacas y huevo"),
        ("Arroz, atún, maíz y aceite", "arroz con atún"),
        ("Pasta, tomate, atún, aceitunas", "pasta con atún y tomate"),
        ("Pollo, pimiento, cebolla al horno", "pollo con pimientos al horno"),
        ("Lentejas de bote, arroz, cebolla", "lentejas de bote con arroz"),
        ("Yogur, avena, fruta, puñado", "bol de yogur avena fruta"),
        ("Patata, huevo y atún: 8 minutos", "patata huevo atún"),
        ("Wok de verdura con tofu o pollo", "wok sencillo en casa"),
    ]:
        a(row("cocina-ensamblaje", title, intent))

    for title, intent in [
        ("Orden de la nevera: lo delicado delante", "organizar la nevera"),
        ("Caducidad: FIFO casero", "usar primero lo que caduca"),
        ("Tupper destapado vs cerrado", "guardar comida en tupper"),
        ("Arroz en nevera: frío rápido", "guardar arroz cocido"),
        ("Pollo cocinado: 2-3 días", "cuánto dura el pollo cocinado"),
        ("Sopa: se puede congelar", "congelar sopa"),
        ("Pan en nevera: peor; mejor congelar", "pan en la nevera"),
        ("Huevos: no hace falta nevera en todos los países; aquí sí si el pack lo dice", "guardar huevos nevera"),
        ("Verdura lavada vs sin lavar", "lavar la verdura al llegar"),
        ("Fruta madura: visible", "fruta madura a la vista"),
        ("Congelador: raciones planas", "congelar en bolsas planas"),
        ("No recongelar a lo loco", "recongelar comida"),
        ("Olor: si duda, fuera", "comida dudosa nevera"),
        ("Leftover de restaurante: el mismo día o el siguiente", "guardar leftover restaurante"),
        ("Nevera llena vs vacía: compras", "nevera vacía qué comprar"),
        ("Inventario de 30 segundos al abrir", "mirar la nevera antes de comprar"),
        ("Queso abierto: cuántos días", "cuánto dura el queso abierto"),
        ("Yogur grande empezado vs unidades", "yogur abierto nevera"),
    ]:
        a(row("nevera-congelador", title, intent))

    for title, intent in [
        ("Desayuno de hotel sin repetir bollería", "desayuno de hotel"),
        ("Comida de tren o avión", "comer en el tren"),
        ("Gasolinera: el menos malo", "comer en gasolinera"),
        ("Nevera de hotel o cubo de hielo", "guardar comida en el hotel"),
        ("Supermercado del destino: yogur, fruta, pan", "comprar comida de viaje"),
        ("Turno de noche: comidas ancla", "qué comer en turno de noche"),
        ("Guardia: tupper que no dependa del microondas", "comida para una guardia"),
        ("Jet lag y hambre rara", "jet lag y comidas"),
        ("Picnic: proteína que viaja", "picnic con proteína"),
        ("Playa: nevera y agua", "comer en la playa"),
        ("Casa rural: cocina mínima", "cocinar en casa rural"),
        ("Compartir piso: nevera y nombres", "nevera compartida piso"),
        ("Cocinar para uno sin deprimirte", "cocinar para una persona"),
        ("Invitar sin hacer un banquete", "cocinar para dos sencillo"),
        ("Avión de 3 horas: no solo galletas", "comer en el avión"),
        ("Congreso o feria: stands y cena de hotel", "comer en un congreso"),
    ]:
        a(row("viajes-turnos", title, intent))

    for title, intent in [
        ("Desayuno dulce y líquido todos los días", "desayuno solo dulce"),
        ("Cena yogur triste después de un día caótico", "cena solo yogur"),
        ("Miedo al pan y no al picoteo", "miedo al pan"),
        ("Quitar la fruta ‘por el azúcar’", "la fruta engorda mito"),
        ("Contar macros el primer mes", "contar macros principiantes"),
        ("Copiar la dieta de un influencer", "dieta de influencer"),
        ("Detox y zumos", "dietas detox"),
        ("Ayuno intermitente como personalidad", "ayuno intermitente principiantes"),
        ("Keto de tres días", "keto tres días"),
        ("Suplemento antes que el plato", "suplementos antes de comer bien"),
        ("Plato ‘light’ y luego palmeras", "comer light y picar"),
        ("No comer para merecer el entreno", "no comer para entrenar"),
        ("Beber 5 litros porque un reel lo dijo", "beber 5 litros de agua"),
        ("Sal demonizada y ultraprocesado libre", "quitar la sal y comer procesados"),
        ("Comparar tu plato con un culturista", "dieta de culturista aficionado"),
        ("Hacer la compra sin lista ‘esta vez’", "comprar sin lista"),
        ("Pesarse cada mañana y rehacer el menú", "pesarse cada día y cambiar dieta"),
        ("Solo ensalada para ‘compensar’ el gym", "solo ensalada después de entrenar"),
    ]:
        a(row("errores-comida", title, intent))

    for title, intent in [
        ("El plato de los días que entrenas fuerza", "plato del día de entreno"),
        ("Proteína en cada comida si hay sentadilla", "proteína el día de sentadilla"),
        ("Hidrato visible si hay sesión de 25 min", "hidrato el día de entreno"),
        ("Cena que se ensambla cuando vuelves del gym", "cena post gimnasio casera"),
        ("No recortar comida para ‘definir’ el primer mes de pesas", "definir y empezar a entrenar"),
        ("Agujetas y un plato completo", "comer con agujetas"),
        ("Día de descanso: el mismo tipo de plato, menos hambre a veces", "plato del día de descanso"),
        ("Agua en la botella de la sesión", "botella de agua para entrenar"),
        ("Café y estómago vacío en el gym", "café en ayunas en el gimnasio"),
        ("Tupper en la mochila del gym", "llevar tupper al gimnasio"),
        ("Pedir después de entrenar: un plato, no tres menús", "pedir comida post entreno"),
        ("Sal y arroz si sudaste de verdad", "arroz y sal después de sudar"),
        ("La cena de después no es un premio, es la cena", "cena no es premio del gym"),
        ("Día de caminar mucho: plato normal, no geles", "comer el día que caminas mucho"),
    ]:
        a(row("puentes-entreno", title, intent))

    return items


ENT_CLUSTERS = {
    "nucleo": 2,
    "programacion": 40,
    "primer-mes-gym": 28,
    "gestos-casa": 42,
    "poco-material": 30,
    "sala-pesas": 34,
    "sentadilla-unilateral": 22,
    "bisagra-posterior": 18,
    "empuje": 20,
    "tiron": 18,
    "core": 16,
    "movilidad": 28,
    "cardio-caminar": 28,
    "progresion-satelites": 24,
    "molestias": 24,
    "tiempo-viajes-escritorio": 28,
    "cuarenta-volver": 16,
    "tecnica": 20,
    "habitos-entreno": 16,
    "recuperacion-entreno": 18,
    "errores": 16,
    "puentes-comida": 12,
}

ALI_CLUSTERS = {
    "nucleo": 2,
    "comer-para-entrenar": 30,
    "proteina-alimentos": 40,
    "hidratos": 24,
    "grasas": 16,
    "desayunos": 24,
    "comida-tupper": 20,
    "cenas": 24,
    "snacks": 16,
    "compra-presupuesto": 28,
    "prep-batch": 24,
    "comer-fuera": 18,
    "oficina": 18,
    "vegetariano-legumbres": 22,
    "verdura-fruta": 24,
    "huevos-pescado-lacteos-carne": 22,
    "hambre-saciedad": 20,
    "fibra-agua-cafe-alcohol": 16,
    "ultraprocesados-etiquetas": 16,
    "cocina-ensamblaje": 30,
    "nevera-congelador": 18,
    "viajes-turnos": 16,
    "errores-comida": 18,
    "puentes-entreno": 14,
}

PUBLISHED_SLUGS = {
    "entrenamiento": {
        "rutina-fuerza-principiantes-casa",
        "progresar-sin-lesionarte",
        "que-hacer-los-dias-que-no-entrenas",
        "dormir-y-fuerza-lo-basico",
        "agujetas-o-lesion",
        "sentadilla-en-casa-de-la-silla-al-aire",
        "flexiones-para-principiantes-pared-mesa-suelo",
        "puente-de-gluteo-tecnica-y-progresion",
        "plancha-sin-hundir-la-lumbar",
        "zancada-estatica-en-casa-con-silla",
        "remo-con-toalla-o-mochila-en-casa",
    },
    "alimentacion": {
        "organizar-comidas-de-la-semana",
        "proteina-hidratos-grasas-guia-practica",
        "que-comer-antes-y-despues-de-entrenar",
        "entrenar-en-ayunas-cuando-no",
        "cenas-rapidas-despues-de-entrenar",
        "desayuno-si-entrenas-a-las-7",
        "dia-de-descanso-no-recortes-a-lo-loco",
        "lista-de-la-compra-semanal-sencilla",
        "batch-cooking-de-una-hora",
        "orden-de-la-nevera-lo-delicado-delante",
    },
}


def intent_key(text: str) -> str:
    return "-".join(sorted(slugify(text).split("-")))


def render(path: Path, vertical: str, items: list[dict]) -> None:
    pub = sum(1 for i in items if i["status"] == "publicado")
    clusters = Counter(i["cluster"] for i in items)
    lines = [
        f"# Catálogo {vertical} (500)",
        "",
        "Generado por `scripts/build_habitos_catalog.py`. No editar a mano: cambia el script y vuelve a ejecutarlo.",
        "",
        f"Estado: **{pub} publicados**, **{len(items) - pub} pendientes**. No redactar en bloque: ver [plan](./plan-catalogo-500-500.md).",
        "",
        "| cluster | n |",
        "|---|---|",
    ]
    for cluster, n in clusters.items():
        lines.append(f"| `{cluster}` | {n} |")
    lines.extend(
        [
            "",
            "| n | estado | cluster | slug | título de trabajo | intención |",
            "|---|---|---|---|---|---|",
        ]
    )
    for i, item in enumerate(items, start=1):
        title = item["title"].replace("|", "\\|")
        intent = item["intent"].replace("|", "\\|")
        lines.append(
            f"| {i} | {item['status']} | {item['cluster']} | `{item['slug']}` | {title} | {intent} |"
        )
    lines.append("")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def assert_unique(name: str, items: list[dict], expected_clusters: dict[str, int]) -> None:
    if len(items) != 500:
        raise SystemExit(f"{name}: expected 500 rows, got {len(items)}")
    got = dict(Counter(i["cluster"] for i in items))
    if got != expected_clusters:
        raise SystemExit(f"{name}: cluster mismatch\n  got={got}\n  expected={expected_clusters}")
    published = {i["slug"] for i in items if i["status"] == "publicado"}
    expected_pub = PUBLISHED_SLUGS[name]
    if published != expected_pub:
        raise SystemExit(f"{name}: published slugs {published} != {expected_pub}")
    for field in ("slug", "intent", "title"):
        counts = Counter(i[field] for i in items)
        dupes = [k for k, n in counts.items() if n > 1]
        if dupes:
            raise SystemExit(f"{name}: duplicate {field}: {dupes[:10]}")
    slugified_intents = Counter(slugify(i["intent"]) for i in items)
    dup_si = [k for k, n in slugified_intents.items() if n > 1]
    if dup_si:
        raise SystemExit(f"{name}: duplicate slugified intent: {dup_si[:10]}")
    token_keys = Counter(intent_key(i["intent"]) for i in items)
    dup_tok = [k for k, n in token_keys.items() if n > 1]
    if dup_tok:
        raise SystemExit(f"{name}: duplicate intent token-set: {dup_tok[:10]}")
    folder = ROOT / "src" / "content" / "blog" / name
    existing = {p.stem for p in folder.glob("*.md")} if folder.exists() else set()
    extra = existing - {i["slug"] for i in items}
    missing_pub = expected_pub - {i["slug"] for i in items}
    missing_files = expected_pub - existing
    if extra:
        raise SystemExit(f"{name}: markdown on disk not in catalog: {sorted(extra)[:10]}")
    if missing_pub:
        raise SystemExit(f"{name}: catalog missing published files: {sorted(missing_pub)}")
    if missing_files:
        raise SystemExit(f"{name}: published slug has no markdown: {sorted(missing_files)[:10]}")


WAVE1_PUBLISHED = {
    "que-comer-antes-y-despues-de-entrenar",
    "entrenar-en-ayunas-cuando-no",
    "cenas-rapidas-despues-de-entrenar",
    "desayuno-si-entrenas-a-las-7",
    "dia-de-descanso-no-recortes-a-lo-loco",
    "que-hacer-los-dias-que-no-entrenas",
    "dormir-y-fuerza-lo-basico",
    "agujetas-o-lesion",
}

WAVE2_PUBLISHED = {
    "sentadilla-en-casa-de-la-silla-al-aire",
    "flexiones-para-principiantes-pared-mesa-suelo",
    "puente-de-gluteo-tecnica-y-progresion",
    "plancha-sin-hundir-la-lumbar",
    "zancada-estatica-en-casa-con-silla",
    "remo-con-toalla-o-mochila-en-casa",
    "lista-de-la-compra-semanal-sencilla",
    "batch-cooking-de-una-hora",
    "orden-de-la-nevera-lo-delicado-delante",
}


def mark_published_waves(items: list[dict]) -> None:
    published = WAVE1_PUBLISHED | WAVE2_PUBLISHED
    for item in items:
        if item["slug"] in published:
            item["status"] = "publicado"


def main() -> None:
    assert sum(ENT_CLUSTERS.values()) == 500
    assert sum(ALI_CLUSTERS.values()) == 500
    ent = entrenamiento()
    ali = alimentacion()
    mark_published_waves(ent)
    mark_published_waves(ali)
    assert_unique("entrenamiento", ent, ENT_CLUSTERS)
    assert_unique("alimentacion", ali, ALI_CLUSTERS)
    overlap = {i["slug"] for i in ent} & {i["slug"] for i in ali}
    if overlap:
        raise SystemExit(f"slug overlap between verticals: {sorted(overlap)[:10]}")
    intent_overlap = {i["intent"] for i in ent} & {i["intent"] for i in ali}
    if intent_overlap:
        raise SystemExit(f"intent overlap between verticals: {sorted(intent_overlap)[:10]}")
    slug_intent_overlap = {slugify(i["intent"]) for i in ent} & {slugify(i["intent"]) for i in ali}
    if slug_intent_overlap:
        raise SystemExit(f"slugified-intent overlap between verticals: {sorted(slug_intent_overlap)[:10]}")
    token_overlap = {intent_key(i["intent"]) for i in ent} & {intent_key(i["intent"]) for i in ali}
    if token_overlap:
        raise SystemExit(f"intent token-set overlap between verticals: {sorted(token_overlap)[:10]}")
    render(DOCS / "catalogo-entrenamiento-500.md", "entrenamiento", ent)
    render(DOCS / "catalogo-alimentacion-500.md", "alimentación", ali)
    print(f"entrenamiento={len(ent)} alimentacion={len(ali)}")


if __name__ == "__main__":
    main()
