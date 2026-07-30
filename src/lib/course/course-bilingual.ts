/**
 * Capa de traducción (tooltips [[EN|ES]]) para cursos C1 y C2.
 * - Expande pares [[frase|frase]] palabra a palabra en el render.
 * - Envuelve texto plano con el diccionario bilingüe cuando no hay mapa ES.
 * - Detecta pistas gramaticales en el lado ES y traduce el EN en su lugar.
 */

import { applyC1QuestionBilingual } from '@/lib/course/c1/c1-question-bilingual';
import { isRecepcionistaExerciseId } from '@/lib/recepcionista-exercise-ids';
import { COURSE_BILINGUAL_DICTIONARY } from '@/lib/course/course-bilingual-dictionary';

const wrapCache = new Map<string, string>();
let sortedDictionaryKeys: string[] | null = null;

export function isAdvancedCourseExerciseId(exerciseId: string): boolean {
  return exerciseId.startsWith('c1-') || exerciseId.startsWith('c2-');
}

export function shouldExpandWordPairsForExercise(exerciseId: string): boolean {
  return isRecepcionistaExerciseId(exerciseId) || isAdvancedCourseExerciseId(exerciseId);
}

function getSortedDictionaryKeys(): string[] {
  if (!sortedDictionaryKeys) {
    sortedDictionaryKeys = Object.keys(COURSE_BILINGUAL_DICTIONARY).sort((a, b) => b.length - a.length);
  }
  return sortedDictionaryKeys;
}

function isGrammarHintTranslation(en: string, es: string): boolean {
  if (!es?.trim()) return true;
  const grammarMarkers =
    /sujeto|participio|incorrecto|condicional|tiempos|informal|demasiado|registro|falso amigo|mezcla|hipótesis|oración|auxiliar|verbo|sustantivo|adjetivo|\+\s|—\s*[a-záéíóú]{2}/i;
  if (grammarMarkers.test(es)) return true;
  const enWords = en.trim().split(/\s+/).filter(Boolean).length;
  const esWords = es.trim().split(/\s+/).filter(Boolean).length;
  return enWords >= 4 && esWords < enWords * 0.35;
}

/** Envuelve palabras conocidas del diccionario en [[word|traducción]]. */
export function wrapTextWithBilingualDictionary(text: string): string {
  if (!text?.trim()) return text;
  if (text.includes('[[')) return text;

  const cached = wrapCache.get(text);
  if (cached !== undefined) return cached;

  let result = text;
  for (const key of getSortedDictionaryKeys()) {
    const translation = COURSE_BILINGUAL_DICTIONARY[key];
    if (!translation) continue;
    const regex = new RegExp(
      `(?<![a-zA-ZÀ-ÖØ-öø-ÿ'’-])(${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?![a-zA-ZÀ-ÖØ-öø-ÿ'’-])`,
      'gi'
    );
    result = result.replace(regex, (match) => `[[${match}|${translation}]]`);
  }

  wrapCache.set(text, result);
  return result;
}

/**
 * Normaliza texto de curso avanzado: si [[EN|ES]] es pista gramatical, traduce EN;
 * si es texto plano, aplica diccionario.
 */
export function normalizeCourseBilingualText(text: string): string {
  if (!text || typeof text !== 'string') return text;

  const trimmed = text.trim();
  const singlePair = trimmed.match(/^\[\[(.+?)\|(.+?)\]\]$/s);
  if (singlePair) {
    const [, en, es] = singlePair;
    if (isGrammarHintTranslation(en, es)) {
      return wrapTextWithBilingualDictionary(en);
    }
    return text;
  }

  if (text.includes('[[')) return text;
  return wrapTextWithBilingualDictionary(text);
}

export function applyCourseQuestionBilingual(exerciseId: string, questionEn: string): string {
  if (!questionEn) return questionEn;

  if (exerciseId.startsWith('c1-')) {
    const fromC1 = applyC1QuestionBilingual(exerciseId, questionEn);
    if (fromC1 !== questionEn) return fromC1;
  }

  if (isAdvancedCourseExerciseId(exerciseId)) {
    return normalizeCourseBilingualText(questionEn);
  }

  return questionEn;
}

export function applyCourseBilingualText(exerciseId: string, text: string | undefined | null): string {
  if (!text || typeof text !== 'string') return text ?? '';
  if (!isAdvancedCourseExerciseId(exerciseId)) return text;
  return normalizeCourseBilingualText(text);
}
