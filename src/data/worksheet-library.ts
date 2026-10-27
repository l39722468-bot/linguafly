export type WorksheetLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type WorksheetTopic = {
  slug: string;
  title: string;
  level: WorksheetLevel;
  description: string;
  learningGoals: string[];
  exerciseTypes: string[];
  status: "planned" | "in-production" | "published";
  pdfCount: number;
  exercisesPerPdf: string;
  notes: string;
};

export const worksheetLevels: { level: WorksheetLevel; name: string; description: string }[] = [
  { level: "A1", name: "Principiante", description: "Frases cortas, vocabulario cotidiano y una estructura gramatical cada vez." },
  { level: "A2", name: "Elemental", description: "Situaciones familiares, pasado básico y combinación de estructuras conocidas." },
  { level: "B1", name: "Intermedio", description: "Textos breves, tiempos verbales contrastados y comunicación independiente." },
  { level: "B2", name: "Intermedio alto", description: "Mayor precisión, matices y estructuras complejas en contexto." },
  { level: "C1", name: "Avanzado", description: "Uso flexible, textos complejos y diferencias de registro." },
  { level: "C2", name: "Dominio", description: "Precisión avanzada, excepciones, matices e interpretación detallada." },
];

/**
 * Content roadmap for the English worksheet library.
 * CEFR labels are provisional editorial targets: every worksheet must pass
 * the checklist in docs/worksheet-quality-standard.md before publication.
 * Planned entries are not represented as downloadable PDFs until files exist.
 */
export const worksheetTopics: WorksheetTopic[] = [
  { slug: "present-simple", title: "Present Simple", level: "A1", description: "Rutinas, hábitos y hechos sencillos con frases afirmativas, negativas y preguntas.", learningGoals: ["Usar I/you/we/they + verbo base", "Aplicar la -s de he/she/it", "Formar negativas con don't/doesn't", "Crear preguntas con do/does"], exerciseTypes: ["Completar frases", "Elegir la opción correcta", "Transformar afirmativas en negativas", "Ordenar preguntas", "Corregir errores", "Escribir frases propias"], status: "published", pdfCount: 10, exercisesPerPdf: "30–50", notes: "Secuenciar de reconocimiento a producción; vocabulario cotidiano A1." },
  { slug: "verb-to-be", title: "Verb to Be", level: "A1", description: "Am, is y are en presentaciones, descripciones, preguntas y respuestas cortas.", learningGoals: ["Elegir am/is/are", "Formar contracciones frecuentes", "Construir negativas y preguntas", "Responder con short answers"], exerciseTypes: ["Completar huecos", "Relacionar sujetos y formas", "Negativas", "Preguntas", "Descripciones guiadas"], status: "published", pdfCount: 10, exercisesPerPdf: "20", notes: "Fichas descargables con solucionario." },
  { slug: "articles-pronouns-plurals", title: "Articles, Pronouns and Plurals", level: "A1", description: "Artículos básicos, pronombres personales, posesivos y plurales frecuentes.", learningGoals: ["Distinguir a/an", "Usar pronombres sujeto", "Usar my/your/his/her", "Formar plurales regulares y frecuentes"], exerciseTypes: ["Clasificar", "Completar", "Elegir artículos", "Cambiar singular a plural", "Describir objetos"], status: "published", pdfCount: 10, exercisesPerPdf: "20", notes: "Fichas descargables con solucionario." },
  { slug: "there-is-there-are", title: "There is / There are", level: "A1", description: "Describir habitaciones, lugares y objetos con singular y plural.", learningGoals: ["Distinguir singular y plural", "Formar negativas", "Preguntar Is there/Are there", "Usar preposiciones espaciales básicas"], exerciseTypes: ["Completar frases", "Describir una habitación", "Preguntas y respuestas", "Elegir singular/plural"], status: "published", pdfCount: 5, exercisesPerPdf: "20", notes: "Fichas descargables con solucionario." },
  { slug: "can-cant", title: "Can / Can't", level: "A1", description: "Habilidades, posibilidades e instrucciones sencillas.", learningGoals: ["Usar can/can't + verbo base", "Formar preguntas con can", "Dar respuestas cortas"], exerciseTypes: ["Completar", "Transformar frases", "Preguntar por habilidades", "Escribir frases personales"], status: "published", pdfCount: 5, exercisesPerPdf: "20", notes: "Fichas descargables con solucionario." },
  { slug: "past-simple-introduction", title: "Past Simple: primera aproximación", level: "A1", description: "Introducción guiada al pasado con expresiones frecuentes y verbos de alta frecuencia.", learningGoals: ["Reconocer was/were", "Practicar un conjunto pequeño de verbos frecuentes", "Identificar yesterday/last night"], exerciseTypes: ["Reconocimiento", "Completar con apoyo", "Ordenar una mini-historia"], status: "published", pdfCount: 3, exercisesPerPdf: "20", notes: "Introducción guiada; práctica completa en A2." },
  { slug: "past-simple", title: "Past Simple", level: "A2", description: "Acciones terminadas en el pasado, verbos regulares e irregulares, negativas y preguntas.", learningGoals: ["Formar pasado regular", "Aprender irregulares frecuentes", "Usar did/didn't", "Preguntar por acciones pasadas"], exerciseTypes: ["Completar", "Clasificar verbos", "Transformaciones", "Preguntas", "Texto corto", "Detectar errores"], status: "published", pdfCount: 10, exercisesPerPdf: "20", notes: "Fichas descargables con solucionario." },
  { slug: "present-continuous", title: "Present Continuous", level: "A2", description: "Acciones que ocurren ahora y situaciones temporales.", learningGoals: ["Formar be + verbo en -ing", "Crear negativas y preguntas", "Usar expresiones de tiempo actuales"], exerciseTypes: ["Completar", "Negativas", "Preguntas"], status: "published", pdfCount: 10, exercisesPerPdf: "20", notes: "Fichas descargables con solucionario." },
  { slug: "comparatives", title: "Comparatives", level: "A2", description: "Comparar personas, lugares y objetos con adjetivos frecuentes.", learningGoals: ["Formar -er", "Usar more", "Practicar formas irregulares"], exerciseTypes: ["Completar", "Elegir forma", "Comparar objetos"], status: "published", pdfCount: 10, exercisesPerPdf: "20", notes: "Fichas descargables con solucionario." },
  { slug: "countable-uncountable", title: "Countable and Uncountable Nouns", level: "A2", description: "Cantidades con much, many, some y any.", learningGoals: ["Distinguir nombres contables", "Usar cuantificadores básicos", "Preguntar por cantidades"], exerciseTypes: ["Completar", "Elegir cuantificador"], status: "published", pdfCount: 10, exercisesPerPdf: "20", notes: "Fichas descargables con solucionario." },
  { slug: "future-plans", title: "Future Plans: Going to", level: "A2", description: "Planes e intenciones con be going to.", learningGoals: ["Formar be going to", "Crear negativas", "Preguntar por planes"], exerciseTypes: ["Completar", "Negativas", "Preguntas"], status: "published", pdfCount: 10, exercisesPerPdf: "20", notes: "Fichas descargables con solucionario." },
  { slug: "prepositions-of-place", title: "Prepositions of Place", level: "A1", description: "Ubicación de objetos y lugares con preposiciones frecuentes.", learningGoals: ["Usar in/on/under", "Describir posiciones", "Practicar next to, behind y between"], exerciseTypes: ["Completar frases", "Describir una habitación"], status: "published", pdfCount: 7, exercisesPerPdf: "20", notes: "Fichas descargables con solucionario." },
];

export const worksheetQualityChecklist = [
  "La gramática objetivo y el vocabulario corresponden al nivel anunciado.",
  "Las instrucciones son breves y comprensibles para ese nivel.",
  "Los ejemplos enseñan el formato antes de pedir producción independiente.",
  "Cada ejercicio tiene una respuesta verificable; se admiten variantes cuando proceda.",
  "Las soluciones se revisan de forma independiente y coinciden con la numeración.",
  "No hay duplicados accidentales, errores tipográficos ni pistas que contradigan la respuesta.",
  "El PDF incluye nivel, objetivo, instrucciones, espacio suficiente y soluciones claramente separadas.",
  "El título y la página de descarga describen el contenido real; no se anuncia como publicado antes de existir el archivo.",
] as const;
