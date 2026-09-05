/**
 * 50 sectores temáticos del megaglosario público (/vocabulario).
 * Los JSON con 200 palabras viven en src/data/vocabulario/words/{slug}.json
 */
export type VocabSectorMeta = {
  slug: string;
  title: string;
  description: string;
  icon: string;
};

export const VOCAB_SECTORS: VocabSectorMeta[] = [
  { slug: "viajes-y-turismo", title: "Viajes y turismo", description: "Aeropuerto, hotel, transporte y destinos.", icon: "✈️" },
  { slug: "alojamiento", title: "Alojamiento", description: "Tipos de estancia, reservas y servicios.", icon: "🏨" },
  { slug: "restaurante-y-comida", title: "Restaurante y comida", description: "Menú, sabores, dietas y cocina.", icon: "🍽️" },
  { slug: "compras-y-dinero", title: "Compras y dinero", description: "Tiendas, precios y pagos.", icon: "🛒" },
  { slug: "salud-y-cuerpo", title: "Salud y cuerpo", description: "Partes del cuerpo, bienestar y síntomas.", icon: "🩺" },
  { slug: "medicina-y-farmacia", title: "Medicina y farmacia", description: "Tratamientos, medicamentos y consulta.", icon: "💊" },
  { slug: "deportes-y-fitness", title: "Deportes y fitness", description: "Actividades, equipamiento y gimnasio.", icon: "⚽" },
  { slug: "naturaleza-y-clima", title: "Naturaleza y clima", description: "Tiempo atmosférico, paisajes y animales.", icon: "🌿" },
  { slug: "casa-y-hogar", title: "Casa y hogar", description: "Habitaciones, muebles y tareas domésticas.", icon: "🏠" },
  { slug: "familia-y-relaciones", title: "Familia y relaciones", description: "Parientes, amigos y vida social.", icon: "👨‍👩‍👧" },
  { slug: "educacion-y-escuela", title: "Educación y escuela", description: "Aula, exámenes y aprendizaje.", icon: "📚" },
  { slug: "trabajo-y-empleo", title: "Trabajo y empleo", description: "Currículum, entrevistas y oficina.", icon: "💼" },
  { slug: "negocios-y-finanzas", title: "Negocios y finanzas", description: "Empresa, mercados e inversión.", icon: "📈" },
  { slug: "tecnologia-e-internet", title: "Tecnología e internet", description: "Dispositivos, software y redes.", icon: "💻" },
  { slug: "comunicacion-y-medios", title: "Comunicación y medios", description: "Noticias, prensa y redes sociales.", icon: "📱" },
  { slug: "transporte-urbano", title: "Transporte urbano", description: "Autobús, metro, taxi y tráfico.", icon: "🚌" },
  { slug: "conduccion-y-coche", title: "Conducción y coche", description: "Vehículo, carretera y taller.", icon: "🚗" },
  { slug: "aeropuerto-y-vuelos", title: "Aeropuerto y vuelos", description: "Embarque, equipaje y controles.", icon: "🛫" },
  { slug: "tiempo-libre-y-ocio", title: "Tiempo libre y ocio", description: "Hobbies, cine y entretenimiento.", icon: "🎬" },
  { slug: "arte-y-cultura", title: "Arte y cultura", description: "Museos, música y literatura.", icon: "🎨" },
  { slug: "musica-y-conciertos", title: "Música y conciertos", description: "Instrumentos, ritmo y espectáculos.", icon: "🎵" },
  { slug: "ropa-y-moda", title: "Ropa y moda", description: "Prendas, tallas y estilo.", icon: "👗" },
  { slug: "belleza-y-cuidado-personal", title: "Belleza y cuidado personal", description: "Vocabulario de higiene, peluquería, cosmética y cuidado personal en inglés.", icon: "✨" },
  { slug: "emociones-y-personalidad", title: "Emociones y personalidad", description: "Sentimientos y rasgos de carácter.", icon: "😊" },
  { slug: "colores-formas-y-tamanos", title: "Colores, formas y tamaños", description: "Aprende colores, formas y tamaños en inglés para describir personas, objetos y espacios.", icon: "🎨" },
  { slug: "numeros-y-cantidades", title: "Números y cantidades", description: "Cifras, medidas y proporciones.", icon: "🔢" },
  { slug: "tiempo-y-calendario", title: "Tiempo y calendario", description: "Horas, fechas y estaciones.", icon: "📅" },
  { slug: "direcciones-y-lugares", title: "Direcciones y lugares", description: "Ubicación, mapas y señalización.", icon: "🧭" },
  { slug: "ciudad-y-servicios", title: "Ciudad y servicios", description: "Banco, correos y administración.", icon: "🏙️" },
  { slug: "legal-y-sociedad", title: "Legal y sociedad", description: "Leyes, derechos y normas.", icon: "⚖️" },
  { slug: "politica-y-noticias", title: "Política y noticias", description: "Gobierno, elecciones y debates.", icon: "📰" },
  { slug: "ciencia-y-laboratorio", title: "Ciencia y laboratorio", description: "Vocabulario de ciencia, experimentos, química y biología en inglés.", icon: "🔬" },
  { slug: "espacio-y-geografia", title: "Espacio y geografía", description: "Planetas, mapas y terreno.", icon: "🌍" },
  { slug: "industria-y-energia", title: "Industria y energía", description: "Fábrica, electricidad y recursos.", icon: "🏭" },
  { slug: "agricultura-y-medio-ambiente", title: "Agricultura y medio ambiente", description: "Campo, clima y sostenibilidad.", icon: "🌾" },
  { slug: "construccion-y-herramientas", title: "Construcción y herramientas", description: "Obra, materiales y taller.", icon: "🔧" },
  { slug: "seguridad-y-emergencias", title: "Seguridad y emergencias", description: "Peligro, auxilio y prevención.", icon: "🚨" },
  { slug: "militar-y-defensa", title: "Militar y defensa", description: "Ejército, armas y estrategia (léxico general).", icon: "🛡️" },
  { slug: "religion-y-festividades", title: "Religión y festividades", description: "Celebraciones y tradiciones.", icon: "🎄" },
  { slug: "bebidas-y-vino", title: "Bebidas y vino", description: "Café, té, bebidas y cata.", icon: "☕" },
  { slug: "cocina-y-recetas", title: "Cocina y recetas", description: "Ingredientes, técnicas y utensilios.", icon: "👨‍🍳" },
  { slug: "animales-y-mascotas", title: "Animales y mascotas", description: "Fauna doméstica y salvaje.", icon: "🐶" },
  { slug: "plantas-y-jardin", title: "Plantas y jardín", description: "Flores, cultivo y huerto.", icon: "🌻" },
  { slug: "deportes-de-equipo", title: "Deportes de equipo", description: "Fútbol, baloncesto y juego colectivo.", icon: "🏀" },
  { slug: "deportes-individuales", title: "Deportes individuales", description: "Aprende vocabulario en inglés sobre atletismo, natación, ciclismo, tenis y otros deportes individuales.", icon: "🏃" },
  { slug: "viajes-de-negocios", title: "Viajes de negocios", description: "Conferencias, networking y agenda.", icon: "🤝" },
  { slug: "psicologia-y-mente", title: "Psicología y mente", description: "Conducta, memoria y hábitos.", icon: "🧠" },
  { slug: "filosofia-y-ideas", title: "Filosofía e ideas", description: "Conceptos, ética y debate.", icon: "💭" },
  { slug: "gramatica-lexico-funcional", title: "Léxico funcional", description: "Conectores, pronombres y uso frecuente.", icon: "🔗" },
  { slug: "verbos-frecuentes", title: "Verbos frecuentes", description: "Acciones cotidianas muy usadas.", icon: "▶️" },
  { slug: "adjetivos-y-descripcion", title: "Adjetivos y descripción", description: "Calificar cosas, personas y situaciones.", icon: "📝" },
];

export function getSectorMeta(slug: string): VocabSectorMeta | undefined {
  return VOCAB_SECTORS.find((s) => s.slug === slug);
}
