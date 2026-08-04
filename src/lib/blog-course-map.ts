import fs from 'fs';
import path from 'path';
import { appendArticleReturnParam } from './blog-article-return';
import { getBlogArticles, normalizeCategory, type BlogPost } from './blog';

export interface CourseUnitRef {
  courseId: string;
  unitNumber: number;
}

export interface BlogCourseRelation {
  articleSlug: string;
  articleTitle: string;
  articleCategory: string;
  articleUrl: string;
  topicId: string;
  topicName: string;
  courseId: string;
  courseLabel: string;
  unitNumber: number;
  unitTitle: string;
  unitUrl: string;
}

export interface ArticleCourseSummary {
  slug: string;
  title: string;
  category: string;
  url: string;
  relations: BlogCourseRelation[];
}

interface TopicDefinition {
  id: string;
  name: string;
  patterns: RegExp[];
  units: CourseUnitRef[];
}

const COURSE_LABELS: Record<string, string> = {
  a1: 'A1',
  a2: 'A2',
  b1: 'B1',
  b2: 'B2',
  c1: 'C1',
  c2: 'C2',
  'camarero-a1': 'Camarero A1',
  'camarero-a2': 'Camarero A2',
  'camarero-b1': 'Camarero B1',
  'camarero-b2': 'Camarero B2',
  'logistica-a1': 'Logística A1',
  'logistica-a2': 'Logística A2',
  'logistica-b1': 'Logística B1',
  'logistica-b2': 'Logística B2',
  'recepcionista-a1': 'Recepcionista A1',
  'recepcionista-a2': 'Recepcionista A2',
  'recepcionista-b1': 'Recepcionista B1',
  'recepcionista-b2': 'Recepcionista B2',
};

const TOPICS: TopicDefinition[] = [
  {
    id: 'condicionales',
    name: 'Condicionales',
    patterns: [/condicional/i, /conditional/i, /\bunless\b/i, /wish/i, /if only/i, /zero.?conditional/i, /first.?conditional/i, /second.?conditional/i, /third.?conditional/i, /mixed.?conditional/i],
    units: [
      { courseId: 'a2', unitNumber: 26 }, { courseId: 'a2', unitNumber: 27 }, { courseId: 'a2', unitNumber: 39 },
      { courseId: 'b1', unitNumber: 11 }, { courseId: 'b1', unitNumber: 12 }, { courseId: 'b1', unitNumber: 13 },
      { courseId: 'b1', unitNumber: 14 }, { courseId: 'b1', unitNumber: 51 },
      { courseId: 'b2', unitNumber: 6 }, { courseId: 'b2', unitNumber: 7 }, { courseId: 'b2', unitNumber: 8 },
    ],
  },
  {
    id: 'voz-pasiva',
    name: 'Voz pasiva',
    patterns: [/voz.?pasiva/i, /passive.?voice/i, /\bpasiva\b/i, /passive.?reporting/i, /have something done/i, /activa.?vs.?pasiva/i],
    units: [
      { courseId: 'b1', unitNumber: 16 }, { courseId: 'b1', unitNumber: 17 }, { courseId: 'b1', unitNumber: 52 },
      { courseId: 'b2', unitNumber: 16 },
    ],
  },
  {
    id: 'reported-speech',
    name: 'Reported speech',
    patterns: [/reported.?speech/i, /estilo.?indirecto/i, /reporting.?verb/i],
    units: [
      { courseId: 'b1', unitNumber: 18 }, { courseId: 'b1', unitNumber: 19 }, { courseId: 'b1', unitNumber: 52 },
    ],
  },
  {
    id: 'past-simple',
    name: 'Past Simple',
    patterns: [/past.?simple/i, /pasado.?simple/i, /verbos.?irregulares/i, /irregular.?verb/i],
    units: [{ courseId: 'a2', unitNumber: 2 }, { courseId: 'a2', unitNumber: 3 }, { courseId: 'a2', unitNumber: 4 }],
  },
  {
    id: 'present-perfect',
    name: 'Present Perfect',
    patterns: [/present.?perfect/i, /ever.?never/i, /already.?yet/i, /since.?for/i, /for.?since/i],
    units: [
      { courseId: 'a2', unitNumber: 11 }, { courseId: 'a2', unitNumber: 12 }, { courseId: 'a2', unitNumber: 13 },
      { courseId: 'a2', unitNumber: 14 }, { courseId: 'a2', unitNumber: 15 }, { courseId: 'a2', unitNumber: 41 },
      { courseId: 'a2', unitNumber: 42 }, { courseId: 'a2', unitNumber: 43 }, { courseId: 'a2', unitNumber: 44 },
      { courseId: 'a2', unitNumber: 45 }, { courseId: 'b1', unitNumber: 2 }, { courseId: 'b1', unitNumber: 4 },
    ],
  },
  {
    id: 'past-perfect',
    name: 'Past Perfect',
    patterns: [/past.?perfect/i, /pluscuamperfecto/i],
    units: [{ courseId: 'b1', unitNumber: 3 }],
  },
  {
    id: 'past-continuous',
    name: 'Past Continuous',
    patterns: [/past.?continuous/i, /past.?simple.?vs.?past.?continuous/i],
    units: [{ courseId: 'a2', unitNumber: 16 }, { courseId: 'a2', unitNumber: 17 }],
  },
  {
    id: 'future-will',
    name: 'Will / Futuro',
    patterns: [/\bwill\b/i, /\bwon'?t\b/i, /futuro/i, /going.?to/i, /future.?tense/i],
    units: [
      { courseId: 'a2', unitNumber: 21 }, { courseId: 'a2', unitNumber: 22 }, { courseId: 'a2', unitNumber: 23 },
      { courseId: 'a2', unitNumber: 24 }, { courseId: 'a2', unitNumber: 31 }, { courseId: 'a2', unitNumber: 32 },
      { courseId: 'a2', unitNumber: 33 }, { courseId: 'a2', unitNumber: 34 },
      { courseId: 'b1', unitNumber: 6 }, { courseId: 'b1', unitNumber: 7 },
    ],
  },
  {
    id: 'modales',
    name: 'Verbos modales',
    patterns: [/modal/i, /must/i, /have.?to/i, /should/i, /\bcould\b/i, /\bmay\b/i, /\bmight\b/i, /used.?to/i, /deducci/i, /deduction/i],
    units: [
      { courseId: 'a2', unitNumber: 28 }, { courseId: 'a2', unitNumber: 29 },
      { courseId: 'a2', unitNumber: 51 }, { courseId: 'a2', unitNumber: 52 }, { courseId: 'a2', unitNumber: 53 },
      { courseId: 'a2', unitNumber: 54 },
      { courseId: 'b1', unitNumber: 8 }, { courseId: 'b1', unitNumber: 9 },
      { courseId: 'b1', unitNumber: 46 }, { courseId: 'b1', unitNumber: 47 }, { courseId: 'b1', unitNumber: 49 },
      { courseId: 'b2', unitNumber: 12 }, { courseId: 'b2', unitNumber: 13 },
    ],
  },
  {
    id: 'phrasal-verbs',
    name: 'Phrasal verbs',
    patterns: [/phrasal.?verb/i],
    units: [
      { courseId: 'b1', unitNumber: 23 }, { courseId: 'b1', unitNumber: 24 }, { courseId: 'b1', unitNumber: 48 },
      { courseId: 'b2', unitNumber: 23 }, { courseId: 'b2', unitNumber: 24 }, { courseId: 'b2', unitNumber: 26 },
      { courseId: 'b2', unitNumber: 27 },
    ],
  },
  {
    id: 'relative-clauses',
    name: 'Relative clauses',
    patterns: [/relative.?clause/i, /oraciones?.?de.?relativo/i],
    units: [
      { courseId: 'a2', unitNumber: 55 },
      { courseId: 'b1', unitNumber: 31 }, { courseId: 'b1', unitNumber: 32 },
      { courseId: 'b2', unitNumber: 10 }, { courseId: 'b2', unitNumber: 11 },
    ],
  },
  {
    id: 'comparativos',
    name: 'Comparativos y superlativos',
    patterns: [/comparativ/i, /superlativ/i, /too.?enough/i, /so.?such/i],
    units: [
      { courseId: 'a2', unitNumber: 5 }, { courseId: 'a2', unitNumber: 6 },
      { courseId: 'a2', unitNumber: 46 }, { courseId: 'a2', unitNumber: 47 }, { courseId: 'a2', unitNumber: 48 },
      { courseId: 'b1', unitNumber: 36 }, { courseId: 'b1', unitNumber: 37 }, { courseId: 'b1', unitNumber: 38 },
      { courseId: 'b2', unitNumber: 17 }, { courseId: 'b2', unitNumber: 18 },
    ],
  },
  {
    id: 'preposiciones',
    name: 'Preposiciones',
    patterns: [/preposicion/i, /preposition/i],
    units: [
      { courseId: 'a1', unitNumber: 24 },
      { courseId: 'a2', unitNumber: 8 }, { courseId: 'a2', unitNumber: 9 }, { courseId: 'a2', unitNumber: 58 },
      { courseId: 'b1', unitNumber: 41 }, { courseId: 'b1', unitNumber: 42 },
      { courseId: 'b1', unitNumber: 43 }, { courseId: 'b1', unitNumber: 44 },
    ],
  },
  {
    id: 'gerund-infinitive',
    name: 'Gerund vs Infinitive',
    patterns: [/gerund/i, /infinitive/i, /gerundio/i],
    units: [
      { courseId: 'b1', unitNumber: 21 }, { courseId: 'b1', unitNumber: 22 },
      { courseId: 'b2', unitNumber: 2 }, { courseId: 'b2', unitNumber: 3 }, { courseId: 'b2', unitNumber: 4 },
    ],
  },
  {
    id: 'pronunciacion',
    name: 'Pronunciación',
    patterns: [/pronunciacion/i, /pronunciation/i, /acento/i, /\bipa\b/i, /schwa/i, /pares?.?minimos/i, /minimal.?pair/i, /\bth\b/i, /entonacion/i, /ritmo/i, /vocales?/i, /consonante/i],
    units: [{ courseId: 'a1', unitNumber: 7 }],
  },
  {
    id: 'b-muda',
    name: 'B muda y ortografía',
    patterns: [/b-muda/i, /b.?muda/i, /silent.?b/i, /\bdoubt\b/i, /\bdebt\b/i, /\bsubtle\b/i],
    units: [{ courseId: 'a1', unitNumber: 7 }],
  },
  {
    id: 'letras-mudas',
    name: 'Letras mudas',
    patterns: [/letras?.?mudas/i, /silent.?letter/i, /letra.?muda/i],
    units: [{ courseId: 'a1', unitNumber: 7 }],
  },
  {
    id: 'fonetica',
    name: 'Fonética y transcripción',
    patterns: [/fonetic/i, /phonetic/i, /transcripcion.?fonetic/i, /diptongo/i, /diphthong/i, /silaba/i, /syllable/i, /connected.?speech/i],
    units: [{ courseId: 'a1', unitNumber: 7 }],
  },
  {
    id: 'variedades-ingles',
    name: 'Variedades del inglés',
    patterns: [/canadiense/i, /escoces/i, /scottish/i, /nueva.?zelanda/i, /lengua.?franca/i, /\belf\b/i, /variety/i],
    units: [{ courseId: 'c1', unitNumber: 2 }, { courseId: 'a1', unitNumber: 7 }],
  },
  {
    id: 'speaking',
    name: 'Speaking / expresión oral',
    patterns: [/speaking/i, /hablar ingles/i, /fluidez/i, /shadowing/i, /bloqueo.?mental/i, /expresion.?oral/i, /practicar.?speaking/i],
    units: [{ courseId: 'a1', unitNumber: 1 }, { courseId: 'a2', unitNumber: 1 }],
  },
  {
    id: 'listening',
    name: 'Listening',
    patterns: [/listening/i, /comprension.?auditiva/i, /entrenar.?oido/i],
    units: [{ courseId: 'a1', unitNumber: 4 }],
  },
  {
    id: 'viajes',
    name: 'Inglés para viajes',
    patterns: [/viaje/i, /viajar/i, /travel/i, /aeropuerto/i, /mochiler/i, /turismo/i, /emergencia/i],
    units: [
      { courseId: 'a1', unitNumber: 41 }, { courseId: 'a1', unitNumber: 42 }, { courseId: 'a1', unitNumber: 43 },
      { courseId: 'a1', unitNumber: 44 }, { courseId: 'a1', unitNumber: 46 }, { courseId: 'a1', unitNumber: 47 },
      { courseId: 'a1', unitNumber: 48 }, { courseId: 'a1', unitNumber: 49 },
      { courseId: 'a2', unitNumber: 35 }, { courseId: 'a2', unitNumber: 36 }, { courseId: 'a2', unitNumber: 49 },
    ],
  },
  {
    id: 'trabajo',
    name: 'Inglés para el trabajo',
    patterns: [/trabajo/i, /business/i, /profesional/i, /email/i, /entrevista/i, /negocios/i, /curriculum/i, /reunion/i],
    units: [
      { courseId: 'b1', unitNumber: 17 }, { courseId: 'b1', unitNumber: 48 },
      { courseId: 'camarero-a1', unitNumber: 1 }, { courseId: 'recepcionista-a1', unitNumber: 1 },
      { courseId: 'logistica-a1', unitNumber: 1 },
    ],
  },
  {
    id: 'restaurante',
    name: 'Restaurante y hostelería',
    patterns: [/restaurant/i, /restaurante/i, /menu/i, /camarero/i, /cocina/i, /bar\b/i],
    units: [
      { courseId: 'a1', unitNumber: 16 }, { courseId: 'a1', unitNumber: 17 }, { courseId: 'a1', unitNumber: 56 },
      { courseId: 'camarero-a1', unitNumber: 1 }, { courseId: 'camarero-a2', unitNumber: 1 },
      { courseId: 'camarero-b1', unitNumber: 1 }, { courseId: 'camarero-b2', unitNumber: 1 },
    ],
  },
  {
    id: 'hotel-recepcion',
    name: 'Hotel y recepción',
    patterns: [/hotel/i, /recepcion/i, /huesped/i, /huésped/i, /reserva/i],
    units: [
      { courseId: 'a1', unitNumber: 46 },
      { courseId: 'recepcionista-a1', unitNumber: 1 }, { courseId: 'recepcionista-a2', unitNumber: 1 },
      { courseId: 'recepcionista-b1', unitNumber: 1 }, { courseId: 'recepcionista-b2', unitNumber: 1 },
    ],
  },
  {
    id: 'logistica',
    name: 'Logística y almacén',
    patterns: [/logistica/i, /almacen/i, /envio/i, /shipping/i, /warehouse/i],
    units: [
      { courseId: 'logistica-a1', unitNumber: 1 }, { courseId: 'logistica-a2', unitNumber: 1 },
      { courseId: 'logistica-b1', unitNumber: 1 }, { courseId: 'logistica-b2', unitNumber: 1 },
    ],
  },
  {
    id: 'examenes-cambridge',
    name: 'Exámenes Cambridge',
    patterns: [/cambridge/i, /\bfce\b/i, /\bcae\b/i, /c1.?advanced/i, /b2.?first/i, /key.?word.?transformation/i, /use.?of.?english/i, /word.?formation/i, /collocation/i],
    units: [
      { courseId: 'b1', unitNumber: 59 }, { courseId: 'b1', unitNumber: 60 },
      { courseId: 'b2', unitNumber: 99 }, { courseId: 'b2', unitNumber: 100 },
      { courseId: 'c1', unitNumber: 61 }, { courseId: 'c1', unitNumber: 65 }, { courseId: 'c1', unitNumber: 72 },
      { courseId: 'c2', unitNumber: 55 }, { courseId: 'c2', unitNumber: 57 }, { courseId: 'c2', unitNumber: 58 },
    ],
  },
  {
    id: 'certificados-generales',
    name: 'Certificados y exámenes oficiales',
    patterns: [/certificado/i, /\beoi\b/i, /beca/i, /universitario/i, /academico/i, /solicitud/i],
    units: [
      { courseId: 'b1', unitNumber: 59 }, { courseId: 'b1', unitNumber: 60 },
      { courseId: 'b2', unitNumber: 99 }, { courseId: 'c1', unitNumber: 72 },
    ],
  },
  {
    id: 'inversion',
    name: 'Inversión (estructuras avanzadas)',
    patterns: [/inversion/i, /invert/i],
    units: [{ courseId: 'c1', unitNumber: 67 }],
  },
  {
    id: 'say-tell',
    name: 'Say vs Tell',
    patterns: [/say.?vs.?tell/i, /say-vs-tell/i],
    units: [{ courseId: 'b1', unitNumber: 18 }],
  },
  {
    id: 'errores-pasado',
    name: 'Errores con tiempos del pasado',
    patterns: [/errores.?tiempos.?pasado/i, /errores.?pasado/i],
    units: [
      { courseId: 'a2', unitNumber: 2 }, { courseId: 'a2', unitNumber: 15 },
      { courseId: 'a2', unitNumber: 45 }, { courseId: 'b1', unitNumber: 4 },
    ],
  },
  {
    id: 'gramatica-general',
    name: 'Gramática general',
    patterns: [/gramatica.?inglesa.?guia/i, /gramatica.?general/i],
    units: [
      { courseId: 'a1', unitNumber: 1 }, { courseId: 'b1', unitNumber: 1 },
      { courseId: 'b1', unitNumber: 60 },
    ],
  },
  {
    id: 'examenes-ielts',
    name: 'IELTS',
    patterns: [/ielts/i],
    units: [{ courseId: 'c1', unitNumber: 65 }, { courseId: 'c1', unitNumber: 66 }, { courseId: 'c2', unitNumber: 57 }],
  },
  {
    id: 'examenes-toefl',
    name: 'TOEFL',
    patterns: [/toefl/i],
    units: [{ courseId: 'c1', unitNumber: 65 }, { courseId: 'c2', unitNumber: 57 }],
  },
  {
    id: 'examenes-aptis',
    name: 'Aptis',
    patterns: [/aptis/i],
    units: [{ courseId: 'a2', unitNumber: 59 }, { courseId: 'b1', unitNumber: 59 }],
  },
  {
    id: 'saludos',
    name: 'Saludos e introducciones',
    patterns: [/saludo/i, /greeting/i, /presentacion/i, /introduc/i, /personal.?information/i],
    units: [{ courseId: 'a1', unitNumber: 1 }, { courseId: 'a1', unitNumber: 2 }, { courseId: 'a2', unitNumber: 1 }],
  },
  {
    id: 'present-simple',
    name: 'Present Simple',
    patterns: [/present.?simple/i, /presente.?simple/i, /daily.?routine/i, /rutina/i],
    units: [{ courseId: 'a1', unitNumber: 5 }, { courseId: 'a1', unitNumber: 13 }, { courseId: 'a1', unitNumber: 14 }, { courseId: 'a1', unitNumber: 15 }],
  },
  {
    id: 'to-be',
    name: 'Verbo to be',
    patterns: [/to.?be/i, /verbo.?to.?be/i],
    units: [{ courseId: 'a1', unitNumber: 1 }, { courseId: 'a1', unitNumber: 3 }, { courseId: 'a2', unitNumber: 1 }],
  },
  {
    id: 'quantifiers',
    name: 'Quantifiers',
    patterns: [/quantifier/i, /much.?many/i, /some.?any/i, /countable/i, /uncountable/i, /few.?little/i],
    units: [
      { courseId: 'a1', unitNumber: 52 }, { courseId: 'a1', unitNumber: 53 }, { courseId: 'a1', unitNumber: 54 },
      { courseId: 'b1', unitNumber: 26 }, { courseId: 'b1', unitNumber: 27 }, { courseId: 'b1', unitNumber: 28 },
    ],
  },
  {
    id: 'salud',
    name: 'Salud',
    patterns: [/salud/i, /health/i, /medico/i, /enfermer/i, /illness/i],
    units: [{ courseId: 'a1', unitNumber: 58 }],
  },
  {
    id: 'metodos',
    name: 'Métodos de aprendizaje',
    patterns: [/duolingo/i, /babbel/i, /app/i, /curso/i, /chatgpt/i, /youtube/i, /libro/i, /repeticion.?espaciada/i, /shadowing/i, /academia/i, /clase/i, /metodo/i, /rutina/i],
    units: [{ courseId: 'a1', unitNumber: 1 }],
  },
];

/** Overrides explícitos slug → unidades (mayor prioridad que patrones). */
const SLUG_OVERRIDES: Record<string, CourseUnitRef[]> = {
  'condicionales-ingles-guia-completa': [
    { courseId: 'a2', unitNumber: 27 }, { courseId: 'a2', unitNumber: 26 },
    { courseId: 'b1', unitNumber: 11 }, { courseId: 'b1', unitNumber: 12 },
    { courseId: 'b1', unitNumber: 13 }, { courseId: 'b1', unitNumber: 14 },
  ],
  'ejercicios-condicionales-ingles-b1-b2': [
    { courseId: 'b1', unitNumber: 11 }, { courseId: 'b1', unitNumber: 12 },
    { courseId: 'b1', unitNumber: 13 }, { courseId: 'b1', unitNumber: 14 }, { courseId: 'b2', unitNumber: 8 },
  ],
  'ejercicios-condicionales-ingles-c1': [{ courseId: 'c1', unitNumber: 65 }, { courseId: 'b2', unitNumber: 8 }],
  'ejercicios-condicionales-c1-c2': [
    { courseId: 'c1', unitNumber: 73 },
    { courseId: 'c2', unitNumber: 61 },
  ],
  'ejercicios-voz-pasiva-ingles': [{ courseId: 'b1', unitNumber: 16 }, { courseId: 'b1', unitNumber: 17 }],
  'voz-pasiva-ingles-guia': [{ courseId: 'b1', unitNumber: 16 }, { courseId: 'b1', unitNumber: 17 }],
  'guia-maestra-reported-speech': [{ courseId: 'b1', unitNumber: 18 }, { courseId: 'b1', unitNumber: 19 }],
  'reported-speech-ejercicios-pdf': [{ courseId: 'b1', unitNumber: 18 }, { courseId: 'b1', unitNumber: 19 }],
  'reported-speech-questions-commands': [{ courseId: 'b1', unitNumber: 19 }],
  'present-perfect-vs-past-simple': [{ courseId: 'a2', unitNumber: 15 }, { courseId: 'a2', unitNumber: 45 }, { courseId: 'b1', unitNumber: 4 }],
  'verbos-modales-ingles-ejercicios': [{ courseId: 'a2', unitNumber: 51 }, { courseId: 'b1', unitNumber: 8 }],
  'phrasal-verbs-b2-fce': [{ courseId: 'b2', unitNumber: 23 }, { courseId: 'b2', unitNumber: 24 }, { courseId: 'b2', unitNumber: 26 }],
  'relative-clauses-guia-definitiva': [
    { courseId: 'a2', unitNumber: 55 }, { courseId: 'b1', unitNumber: 31 },
    { courseId: 'b1', unitNumber: 32 }, { courseId: 'b2', unitNumber: 10 },
  ],
  'gramatica-ingles-b1-guia': [{ courseId: 'b1', unitNumber: 1 }, { courseId: 'b1', unitNumber: 60 }],
  'will-ejercicios-ingles': [{ courseId: 'a2', unitNumber: 23 }, { courseId: 'b1', unitNumber: 6 }],
  'will-going-to-diferencia': [{ courseId: 'a2', unitNumber: 21 }, { courseId: 'a2', unitNumber: 23 }, { courseId: 'b1', unitNumber: 6 }],
  'past-perfect-ingles': [{ courseId: 'b1', unitNumber: 3 }],
  'present-perfect-continuous': [{ courseId: 'b1', unitNumber: 2 }],
  'can-could-ingles': [{ courseId: 'a2', unitNumber: 29 }, { courseId: 'a2', unitNumber: 54 }],
  'may-might-ingles': [{ courseId: 'a2', unitNumber: 54 }, { courseId: 'b1', unitNumber: 8 }],
  'gramatica-inglesa-guia': [{ courseId: 'a1', unitNumber: 1 }, { courseId: 'b1', unitNumber: 1 }, { courseId: 'b1', unitNumber: 60 }],
  'mejorar-speaking-ingles-solo': [{ courseId: 'a1', unitNumber: 1 }, { courseId: 'a2', unitNumber: 1 }],
  'inversiones-ingles-c1': [{ courseId: 'c1', unitNumber: 67 }],
  'errores-tiempos-pasado-espanoles': [
    { courseId: 'a2', unitNumber: 2 }, { courseId: 'a2', unitNumber: 15 },
    { courseId: 'a2', unitNumber: 45 }, { courseId: 'b1', unitNumber: 4 },
  ],
  'say-vs-tell-ingles': [{ courseId: 'b1', unitNumber: 18 }],
  'mejores-certificados-ingles-2026': [
    { courseId: 'b1', unitNumber: 59 }, { courseId: 'b2', unitNumber: 99 }, { courseId: 'c1', unitNumber: 72 },
  ],
  'examenes-eoi-ingles-guia': [{ courseId: 'b1', unitNumber: 59 }, { courseId: 'b2', unitNumber: 99 }],
  'becas-solicitudes-ingles': [{ courseId: 'b1', unitNumber: 59 }, { courseId: 'c1', unitNumber: 72 }],
  'ingles-universitario-academico': [{ courseId: 'c1', unitNumber: 72 }, { courseId: 'c2', unitNumber: 57 }],
  'b-muda-ingles-doubt-subtle-debt-historia-practica': [{ courseId: 'a1', unitNumber: 7 }],
  'b-muda-ingles-ejercicios-lectura-dictado': [{ courseId: 'a1', unitNumber: 7 }, { courseId: 'a1', unitNumber: 3 }],
  'b-muda-ingles-combinaciones-mb-bt-fundamentos': [{ courseId: 'a1', unitNumber: 7 }],
  'b-muda-ingles-excepciones-trampas-ortograficas': [{ courseId: 'a1', unitNumber: 7 }],
  'b-muda-ingles-hispanohablantes-b-vs-v': [{ courseId: 'a1', unitNumber: 7 }],
  'unidad-1-saludos-presentarse': [
    { courseId: 'a1', unitNumber: 1 },
    { courseId: 'a1', unitNumber: 2 },
  ],
  'unidad-2-to-be-pronombres-nacionalidades': [
    { courseId: 'a1', unitNumber: 2 },
    { courseId: 'a1', unitNumber: 3 },
  ],
  'unidad-3-to-be-negativa-preguntas': [
    { courseId: 'a1', unitNumber: 3 },
    { courseId: 'a1', unitNumber: 4 },
  ],
  'unidad-4-articulos-plurales-demostrativos': [
    { courseId: 'a1', unitNumber: 4 },
    { courseId: 'a1', unitNumber: 5 },
  ],
  'unidad-5-present-simple-rutinas': [
    { courseId: 'a1', unitNumber: 5 },
    { courseId: 'a1', unitNumber: 6 },
    { courseId: 'a1', unitNumber: 13 },
    { courseId: 'a1', unitNumber: 14 },
    { courseId: 'a1', unitNumber: 15 },
  ],
  'unidad-6-familia-posesivos-genitivo': [
    { courseId: 'a1', unitNumber: 6 },
    { courseId: 'a1', unitNumber: 7 },
  ],
  'unidad-7-colores-descripciones-fisicas': [
    { courseId: 'a1', unitNumber: 7 },
    { courseId: 'a1', unitNumber: 8 },
  ],
  'unidad-8-numeros-edad-precios': [
    { courseId: 'a1', unitNumber: 8 },
    { courseId: 'a1', unitNumber: 9 },
  ],
  'unidad-9-profesiones-ocupaciones': [
    { courseId: 'a1', unitNumber: 9 },
    { courseId: 'a1', unitNumber: 10 },
  ],
  'unidad-10-rutinas-diarias-hora': [
    { courseId: 'a1', unitNumber: 10 },
    { courseId: 'a1', unitNumber: 11 },
    { courseId: 'a1', unitNumber: 13 },
  ],
  'unidad-11-lugares-ciudad': [
    { courseId: 'a1', unitNumber: 11 },
    { courseId: 'a1', unitNumber: 12 },
    { courseId: 'a1', unitNumber: 25 },
  ],
  'unidad-12-dias-semana': [
    { courseId: 'a1', unitNumber: 12 },
    { courseId: 'a1', unitNumber: 13 },
  ],
  'unidad-13-rutina-diaria': [
    { courseId: 'a1', unitNumber: 13 },
    { courseId: 'a1', unitNumber: 14 },
    { courseId: 'a1', unitNumber: 10 },
  ],
  'unidad-14-present-simple-dont-do-you': [
    { courseId: 'a1', unitNumber: 14 },
    { courseId: 'a1', unitNumber: 15 },
    { courseId: 'a1', unitNumber: 5 },
  ],
  'unidad-15-present-simple-doesnt-does': [
    { courseId: 'a1', unitNumber: 15 },
    { courseId: 'a1', unitNumber: 14 },
    { courseId: 'a1', unitNumber: 5 },
  ],
  'unidad-16-cafeteria-can-i-have-id-like': [
    { courseId: 'a1', unitNumber: 16 },
    { courseId: 'a1', unitNumber: 17 },
    { courseId: 'a1', unitNumber: 8 },
  ],
  'unidad-17-comidas-breakfast-lunch-dinner': [
    { courseId: 'a1', unitNumber: 17 },
    { courseId: 'a1', unitNumber: 18 },
    { courseId: 'a1', unitNumber: 16 },
  ],
  'unidad-18-gustos-like-ing-because': [
    { courseId: 'a1', unitNumber: 18 },
    { courseId: 'a1', unitNumber: 17 },
    { courseId: 'a1', unitNumber: 19 },
  ],
  'unidad-19-meses-fechas-cumpleanos': [
    { courseId: 'a1', unitNumber: 19 },
    { courseId: 'a1', unitNumber: 12 },
    { courseId: 'a1', unitNumber: 20 },
  ],
  'unidad-20-repaso-modulo-2': [
    { courseId: 'a1', unitNumber: 20 },
    { courseId: 'a1', unitNumber: 14 },
    { courseId: 'a1', unitNumber: 19 },
  ],
  'unidad-21-habitaciones-casa': [
    { courseId: 'a1', unitNumber: 21 },
    { courseId: 'a1', unitNumber: 22 },
    { courseId: 'a1', unitNumber: 11 },
  ],
  'unidad-22-muebles-posesivos-mine-yours': [
    { courseId: 'a1', unitNumber: 22 },
    { courseId: 'a1', unitNumber: 21 },
    { courseId: 'a1', unitNumber: 6 },
  ],
  'unidad-23-there-is-there-are': [
    { courseId: 'a1', unitNumber: 23 },
    { courseId: 'a1', unitNumber: 11 },
    { courseId: 'a1', unitNumber: 24 },
  ],
  'unidad-24-preposiciones-lugar-next-to-between': [
    { courseId: 'a1', unitNumber: 24 },
    { courseId: 'a1', unitNumber: 23 },
    { courseId: 'a1', unitNumber: 11 },
  ],
  'unidad-25-barrio-the-a-an-some-any': [
    { courseId: 'a1', unitNumber: 25 },
    { courseId: 'a1', unitNumber: 24 },
    { courseId: 'a1', unitNumber: 4 },
  ],
  'unidad-26-direcciones-imperativos': [
    { courseId: 'a1', unitNumber: 26 },
    { courseId: 'a1', unitNumber: 25 },
    { courseId: 'a1', unitNumber: 24 },
  ],
  'unidad-27-mascotas-animales': [
    { courseId: 'a1', unitNumber: 27 },
    { courseId: 'a1', unitNumber: 7 },
    { courseId: 'a1', unitNumber: 18 },
  ],
  'letras-mudas-ingles-guia-completa': [{ courseId: 'a1', unitNumber: 7 }],
  'letras-mudas-ingles-lista': [{ courseId: 'a1', unitNumber: 7 }],
  'como-leer-transcripcion-fonetica-ingles': [{ courseId: 'a1', unitNumber: 7 }],
  'fonetica-inglesa-basica': [{ courseId: 'a1', unitNumber: 7 }],
  'diptongos-ingles-lista-completa': [{ courseId: 'a1', unitNumber: 7 }],
  'silabas-ingles-division': [{ courseId: 'a1', unitNumber: 7 }],
  'connected-speech-ingles': [{ courseId: 'a1', unitNumber: 7 }, { courseId: 'a1', unitNumber: 4 }],
  'ingles-canadiense-diferencias': [{ courseId: 'c1', unitNumber: 2 }, { courseId: 'a1', unitNumber: 7 }],
  'ingles-escoces-como-entenderlo': [{ courseId: 'c1', unitNumber: 2 }, { courseId: 'a1', unitNumber: 7 }],
  'ingles-nueva-zelanda-caracteristicas': [{ courseId: 'c1', unitNumber: 2 }, { courseId: 'a1', unitNumber: 7 }],
  'ingles-como-lengua-franca-elf': [{ courseId: 'c1', unitNumber: 2 }],
};

let unitTitleCache: Map<string, string> | null = null;
let relationsCache: BlogCourseRelation[] | null = null;

function cleanUnitTitle(title: string): string {
  return title
    .replace(/\[\[([^\]|]+)\|[^\]]+\]\]/g, '$1')
    .replace(/\[\[([^\]]+)\]\]/g, '$1');
}

function loadAllUnitTitles(): Map<string, string> {
  if (unitTitleCache) return unitTitleCache;

  const map = new Map<string, string>();
  const courseDir = path.join(process.cwd(), 'src/lib/course');

  if (!fs.existsSync(courseDir)) {
    unitTitleCache = map;
    return map;
  }

  for (const courseId of fs.readdirSync(courseDir)) {
    const dir = path.join(courseDir, courseId);
    if (!fs.statSync(dir).isDirectory()) continue;

    for (const file of fs.readdirSync(dir)) {
      const match = file.match(/^unit-(\d+)\.ts$/);
      if (!match) continue;
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      const titleMatch = content.match(/export const UNIT_TITLE\s*=\s*['`](.+?)['`]/);
      if (titleMatch) {
        map.set(`${courseId}:${match[1]}`, cleanUnitTitle(titleMatch[1]));
      }
    }
  }

  unitTitleCache = map;
  return map;
}

export function getCourseUnitUrl(courseId: string, unitNumber: number): string {
  return `/curso-${courseId}/unit-${unitNumber}`;
}

export function getCourseLabel(courseId: string): string {
  return COURSE_LABELS[courseId] ?? courseId.toUpperCase();
}

function getUnitTitle(courseId: string, unitNumber: number): string {
  const titles = loadAllUnitTitles();
  return titles.get(`${courseId}:${unitNumber}`) ?? `Unidad ${unitNumber}`;
}

function articleSearchText(article: BlogPost): string {
  return [article.slug, article.title, article.category, ...(article.keywords ?? [])].join(' ').toLowerCase();
}

function matchTopicsForArticle(article: BlogPost): { topic: TopicDefinition; units: CourseUnitRef[] }[] {
  const text = articleSearchText(article);
  const results: { topic: TopicDefinition; units: CourseUnitRef[] }[] = [];

  for (const topic of TOPICS) {
    const matched = topic.patterns.some((p) => p.test(text));
    if (matched && topic.units.length > 0) {
      results.push({ topic, units: topic.units });
    }
  }

  const override = SLUG_OVERRIDES[article.slug];
  if (override?.length) {
    const primaryTopic = results[0]?.topic ?? {
      id: 'relacion-directa',
      name: 'Tema relacionado',
      patterns: [],
      units: [],
    };
    return [{ topic: primaryTopic, units: override }];
  }

  return results;
}

function relationKey(r: BlogCourseRelation): string {
  return `${r.articleSlug}|${r.courseId}|${r.unitNumber}|${r.topicId}`;
}

export function buildBlogCourseRelations(articles?: BlogPost[]): BlogCourseRelation[] {
  const source = articles ?? getBlogArticles();
  const relations: BlogCourseRelation[] = [];
  const seen = new Set<string>();

  for (const article of source) {
    const category = normalizeCategory(article.category);
    const articleUrl = `/blog/${category}/${article.slug}`;
    const matches = matchTopicsForArticle(article);

    for (const { topic, units } of matches) {
      for (const unit of units) {
        const relation: BlogCourseRelation = {
          articleSlug: article.slug,
          articleTitle: article.title,
          articleCategory: category,
          articleUrl,
          topicId: topic.id,
          topicName: topic.name,
          courseId: unit.courseId,
          courseLabel: getCourseLabel(unit.courseId),
          unitNumber: unit.unitNumber,
          unitTitle: getUnitTitle(unit.courseId, unit.unitNumber),
          unitUrl: appendArticleReturnParam(
            getCourseUnitUrl(unit.courseId, unit.unitNumber),
            articleUrl,
          ),
        };
        const key = relationKey(relation);
        if (!seen.has(key)) {
          seen.add(key);
          relations.push(relation);
        }
      }
    }
  }

  return relations.sort((a, b) => {
    const titleCmp = a.articleTitle.localeCompare(b.articleTitle, 'es');
    if (titleCmp !== 0) return titleCmp;
    const courseCmp = a.courseLabel.localeCompare(b.courseLabel, 'es');
    if (courseCmp !== 0) return courseCmp;
    return a.unitNumber - b.unitNumber;
  });
}

export function getAllBlogCourseRelations(): BlogCourseRelation[] {
  if (!relationsCache) {
    relationsCache = buildBlogCourseRelations();
  }
  return relationsCache;
}

export function getRelationsForArticle(slug: string): BlogCourseRelation[] {
  return getAllBlogCourseRelations().filter((r) => r.articleSlug === slug);
}

export function getArticleSummaries(): ArticleCourseSummary[] {
  const relations = getAllBlogCourseRelations();
  const bySlug = new Map<string, ArticleCourseSummary>();

  for (const relation of relations) {
    const existing = bySlug.get(relation.articleSlug);
    if (existing) {
      existing.relations.push(relation);
    } else {
      bySlug.set(relation.articleSlug, {
        slug: relation.articleSlug,
        title: relation.articleTitle,
        category: relation.articleCategory,
        url: relation.articleUrl,
        relations: [relation],
      });
    }
  }

  return Array.from(bySlug.values()).sort((a, b) => a.title.localeCompare(b.title, 'es'));
}

export const BLOG_EXERCISE_MAP_PATH = '/blog/ejercicios-relacionados';

export function getExerciseMapUrlForArticle(slug?: string): string {
  if (!slug) return BLOG_EXERCISE_MAP_PATH;
  return `${BLOG_EXERCISE_MAP_PATH}?articulo=${encodeURIComponent(slug)}`;
}

export function getUniqueTopics(): { id: string; name: string }[] {
  const topics = new Map<string, string>();
  for (const topic of TOPICS) {
    topics.set(topic.id, topic.name);
  }
  return Array.from(topics.entries()).map(([id, name]) => ({ id, name }));
}

export function getUniqueCourseLabels(): string[] {
  const labels = new Set(getAllBlogCourseRelations().map((r) => r.courseLabel));
  return Array.from(labels).sort((a, b) => a.localeCompare(b, 'es'));
}
