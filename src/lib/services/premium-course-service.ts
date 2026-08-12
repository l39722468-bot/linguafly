import { UnitData, PremiumInteraction } from '@/types/premium-course';
import { UserPerformanceRecord } from '../course-engine/adaptive';

export type CourseLevel = 'ingles-a1' | 'ingles-a2' | 'ingles-b1' | 'ingles-b2' | 'ingles-c1' | 'ingles-c2';

const PROGRESS_KEY = 'focus_interaction_progress';

function readLocalProgress(userId: string): string[] {
  if (typeof window === 'undefined' || !userId || userId === 'anonymous') return [];
  try {
    const raw = localStorage.getItem(`${PROGRESS_KEY}:${userId}`);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeLocalProgress(userId: string, ids: string[]) {
  if (typeof window === 'undefined' || !userId || userId === 'anonymous') return;
  localStorage.setItem(`${PROGRESS_KEY}:${userId}`, JSON.stringify(ids));
}

/** Client progress/SRS — localStorage only (no auth backend). */
export const premiumCourseService = {
  async getProgress(userId: string, _level: string): Promise<string[]> {
    return readLocalProgress(userId);
  },

  async getSRSPerformance(_userId: string, _interactionIds: string[]): Promise<UserPerformanceRecord[]> {
    return [];
  },

  async updateSRS(_userId: string, _interactionId: string, _quality: number): Promise<boolean> {
    return true;
  },

  async updateConceptMastery(_userId: string, _tags: string[], _success: boolean): Promise<boolean> {
    return true;
  },

  async getUserMastery(_userId: string): Promise<any[]> {
    return [];
  },

  async getA1Progress(userId: string): Promise<string[]> {
    return this.getProgress(userId, 'A1');
  },

  async getA2Progress(userId: string): Promise<string[]> {
    return this.getProgress(userId, 'A2');
  },

  async getB1Progress(userId: string): Promise<string[]> {
    return this.getProgress(userId, 'B1');
  },

  async getB2Progress(userId: string): Promise<string[]> {
    return this.getProgress(userId, 'B2');
  },

  async getC1Progress(userId: string): Promise<string[]> {
    return this.getProgress(userId, 'C1');
  },

  async getC2Progress(userId: string): Promise<string[]> {
    return this.getProgress(userId, 'C2');
  },

  async saveInteractionProgress(userId: string, interactionId: string): Promise<boolean> {
    const current = readLocalProgress(userId);
    if (!current.includes(interactionId)) {
      writeLocalProgress(userId, [...current, interactionId]);
    }
    return true;
  },
};

export type { UnitData, PremiumInteraction };
