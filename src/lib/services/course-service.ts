import { z } from 'zod';
import { 
  Module, 
  Lesson, 
  CEFRLevel, 
} from '../exercise-types';

const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 10;

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  return null;
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Course catalog — previously backed by a remote DB.
 * Public blog uses local course JSON/TS modules; these methods return empty
 * unless a custom client with in-memory data is provided by callers/tests.
 */
export const courseService = {
  async getModules(level: CEFRLevel, goal: string, customClient?: any): Promise<Module[]> {
    const cacheKey = `modules-${level}-${goal}`;
    const cached = getCached<Module[]>(cacheKey);
    if (cached) return cached;

    if (!customClient) return [];

    const { data: modulesRaw, error: mError } = await customClient
      .from('course_modules')
      .select('*')
      .eq('course_level', level)
      .eq('course_goal', goal)
      .order('order_index', { ascending: true });

    if (mError || !modulesRaw) {
      console.error('[courseService] getModules error:', mError);
      return [];
    }

    setCache(cacheKey, modulesRaw);
    return modulesRaw as Module[];
  },

  async getLesson(lessonId: string, customClient?: any): Promise<Lesson | null> {
    if (!customClient) return null;
    const { data, error } = await customClient
      .from('course_lessons')
      .select('*')
      .eq('id', lessonId)
      .maybeSingle();
    if (error) {
      console.error('[courseService] getLesson error:', error);
      return null;
    }
    return data as Lesson | null;
  },

  async getLessonsByModule(moduleId: string, customClient?: any): Promise<Lesson[]> {
    if (!customClient) return [];
    const { data, error } = await customClient
      .from('course_lessons')
      .select('*')
      .eq('module_id', moduleId)
      .order('order_index', { ascending: true });
    if (error || !data) return [];
    return data as Lesson[];
  },
};

void z;
void CACHE_TTL;
