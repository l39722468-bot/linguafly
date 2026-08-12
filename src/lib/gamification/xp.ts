import { UserLevel, XPEvent, XPSource } from './types';

/**
 * XP REWARDS CONFIGURATION
 * Cantidad de XP otorgada por cada acción
 */
export const XP_REWARDS: Record<XPSource, number> = {
  'lesson-completion': 100,
  'perfect-score': 50,
  'perfect-exercise-bonus': 10,
  'streak-bonus': 25,
  'badge-unlock': 0, // Variable, depende del badge
  'practice-session': 20,
  'quiz-completion': 30,
  'daily-goal': 50,
  'ai-mission': 150
};

/**
 * LEVEL SYSTEM CONFIGURATION
 */
export const LEVEL_CONFIG = {
  BASE_XP: 100,
  MAX_LEVEL: 100
};

/**
 * Level titles based on level ranges
 */
export const LEVEL_TITLES: { min: number; max: number; title: string }[] = [
  { min: 1, max: 5, title: 'Principiante' },
  { min: 6, max: 10, title: 'Estudiante' },
  { min: 11, max: 15, title: 'Aprendiz' },
  { min: 16, max: 20, title: 'Competente' },
  { min: 21, max: 25, title: 'Hábil' },
  { min: 26, max: 30, title: 'Experto' },
  { min: 31, max: 40, title: 'Avanzado' },
  { min: 41, max: 50, title: 'Maestro' },
  { min: 51, max: 60, title: 'Gran Maestro' },
  { min: 61, max: 70, title: 'Virtuoso' },
  { min: 71, max: 80, title: 'Élite' },
  { min: 81, max: 90, title: 'Leyenda' },
  { min: 91, max: 100, title: 'Gran Leyenda' }
];

/**
 * Calculate XP required for a specific level (start of level)
 * Using quadratic formula: XP = (level - 1)^2 * 100
 */
export function calculateXPForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.pow(level - 1, 2) * LEVEL_CONFIG.BASE_XP;
}

/**
 * Calculate total XP required to reach the END of a level (start of next level)
 */
export function calculateTotalXPForLevel(level: number): number {
  return calculateXPForLevel(level + 1);
}

/**
 * Calculate current level and progress from total XP
 * Formula: level = sqrt(totalXP / 100) + 1
 */
export function calculateLevelFromXP(totalXP: number): UserLevel {
  const currentLevel = Math.floor(Math.sqrt(totalXP / LEVEL_CONFIG.BASE_XP)) + 1;
  const xpAtStartOfCurrentLevel = calculateXPForLevel(currentLevel);
  const currentXP = totalXP - xpAtStartOfCurrentLevel;
  const xpAtStartOfNextLevel = calculateXPForLevel(currentLevel + 1);
  const xpToNextLevel = xpAtStartOfNextLevel - totalXP;
  const title = getLevelTitle(currentLevel);

  return {
    userId: '', // Will be set by caller
    currentLevel,
    currentXP,
    totalXP,
    xpToNextLevel,
    title
  };
}

/**
 * Get level title based on current level
 */
export function getLevelTitle(level: number): string {
  const titleRange = LEVEL_TITLES.find(
    range => level >= range.min && level <= range.max
  );
  return titleRange ? titleRange.title : 'Maestro Supremo';
}

/**
 * Calculate XP percentage to next level
 */
export function calculateXPPercentage(currentXP: number, xpToNextLevel: number): number {
  return Math.floor((currentXP / xpToNextLevel) * 100);
}

/**
 * Award XP to user (Database version)
 */
export async function awardXP(
  userId: string, 
  amount: number, 
  source: string, 
  sourceId?: string, 
  description?: string
): Promise<{ totalXP: number; level: number; xpToNextLevel: number } | null> {
  void source; void sourceId; void description;
  try {
    const key = `focus_xp:${userId || 'guest'}`;
    const current = typeof window !== 'undefined'
      ? Number(localStorage.getItem(key) || 0)
      : 0;
    const totalXP = current + amount;
    if (typeof window !== 'undefined') localStorage.setItem(key, String(totalXP));
    const levelInfo = calculateLevelFromXP(totalXP);
    return {
      totalXP,
      level: levelInfo.currentLevel,
      xpToNextLevel: levelInfo.xpToNextLevel,
    };
  } catch (error) {
    console.error('Error in awardXP:', error);
    return null;
  }
}

/**
 * Award XP to user (Pure function version)
 */
export function calculateAwardXP(
  currentLevel: UserLevel,
  amount: number,
  source: XPSource
): { newLevel: UserLevel; leveledUp: boolean; levelsGained: number } {
  const newTotalXP = currentLevel.totalXP + amount;
  const newLevel = calculateLevelFromXP(newTotalXP);
  
  const leveledUp = newLevel.currentLevel > currentLevel.currentLevel;
  const levelsGained = newLevel.currentLevel - currentLevel.currentLevel;

  return {
    newLevel: { ...newLevel, userId: currentLevel.userId },
    leveledUp,
    levelsGained
  };
}

// Alias for compatibility
export const calculateLevel = calculateLevelFromXP;

/**
 * Get XP reward for an action
 */
export function getXPReward(source: XPSource, multiplier: number = 1): number {
  return Math.floor(XP_REWARDS[source] * multiplier);
}

/**
 * Calculate streak bonus multiplier
 */
export function getStreakBonusMultiplier(streakDays: number): number {
  if (streakDays >= 30) return 2.0;
  if (streakDays >= 14) return 1.5;
  if (streakDays >= 7) return 1.3;
  if (streakDays >= 3) return 1.1;
  return 1.0;
}

/**
 * Generate XP event
 */
export function createXPEvent(
  userId: string,
  amount: number,
  source: XPSource,
  details?: string
): XPEvent {
  return {
    id: `xp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    amount,
    source,
    timestamp: new Date(),
    details
  };
}

/**
 * Get XP summary for display
 */
export interface XPSummary {
  totalXP: number;
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  percentage: number;
  title: string;
  nextLevelTitle: string;
}

export function getXPSummary(userLevel: UserLevel): XPSummary {
  return {
    totalXP: userLevel.totalXP,
    currentLevel: userLevel.currentLevel,
    currentXP: userLevel.currentXP,
    xpToNextLevel: userLevel.xpToNextLevel,
    percentage: calculateXPPercentage(userLevel.currentXP, userLevel.xpToNextLevel),
    title: userLevel.title,
    nextLevelTitle: getLevelTitle(userLevel.currentLevel + 1)
  };
}
