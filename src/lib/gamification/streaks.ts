import { Streak, StreakEntry } from './types';

export type StreakData = {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
};

/**
 * STREAK CONFIGURATION
 */
export const STREAK_CONFIG = {
  HOURS_TO_MAINTAIN: 24,
  MIN_ACTIVITIES_PER_DAY: 1,
  GRACE_PERIOD_HOURS: 2 // Grace period after 24h before breaking streak
};

/**
 * Initialize a new streak for a user
 */
export function initializeStreak(userId: string): Streak {
  return {
    userId,
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: new Date(),
    totalActiveDays: 0,
    streakHistory: []
  };
}

/**
 * Check if streak is still valid
 */
export function isStreakValid(lastActivityDate: Date): boolean {
  const now = new Date();
  const hoursSinceLastActivity = 
    (now.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60);
  
  return hoursSinceLastActivity <= (STREAK_CONFIG.HOURS_TO_MAINTAIN + STREAK_CONFIG.GRACE_PERIOD_HOURS);
}

/**
 * Check if today's activity has been recorded
 */
export function hasStudiedToday(lastActivityDate: Date): boolean {
  const now = new Date();
  const lastActivity = new Date(lastActivityDate);
  
  return (
    lastActivity.getDate() === now.getDate() &&
    lastActivity.getMonth() === now.getMonth() &&
    lastActivity.getFullYear() === now.getFullYear()
  );
}

/**
 * Update streak with new activity (localStorage)
 */
export async function updateStreak(userId: string): Promise<StreakData | null> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const key = `focus_streak:${userId || 'guest'}`;
    const raw = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    const currentData = raw ? JSON.parse(raw) : null;

    let currentStreak = currentData?.current_streak || 0;
    let longestStreak = currentData?.longest_streak || 0;
    const lastActivity = currentData?.last_activity_date;

    if (lastActivity === today) {
      return {
        currentStreak,
        longestStreak,
        lastActivityDate: today
      };
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastActivity === yesterdayStr) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    const next = {
      user_id: userId,
      current_streak: currentStreak,
      longest_streak: longestStreak,
      last_activity_date: today,
      updated_at: new Date().toISOString()
    };
    if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(next));

    return {
      currentStreak,
      longestStreak,
      lastActivityDate: today
    };
  } catch (error) {
    console.error('Error in updateStreak:', error);
    return null;
  }
}

/**
 * Update streak with new activity (Pure function version)
 */
export function calculateUpdateStreak(
  currentStreak: Streak,
  activitiesCompleted: number = 1
): Streak {
  const now = new Date();
  
  // If already studied today, just increment activities
  if (hasStudiedToday(currentStreak.lastActivityDate)) {
    const updatedHistory = [...currentStreak.streakHistory];
    const todayEntry = updatedHistory[updatedHistory.length - 1];
    if (todayEntry) {
      todayEntry.activitiesCompleted += activitiesCompleted;
    }
    
    return {
      ...currentStreak,
      lastActivityDate: now,
      streakHistory: updatedHistory
    };
  }
  
  // Check if streak is still valid
  const streakValid = isStreakValid(currentStreak.lastActivityDate);
  
  const newCurrentStreak = streakValid ? currentStreak.currentStreak + 1 : 1;
  const newLongestStreak = Math.max(newCurrentStreak, currentStreak.longestStreak);
  const newTotalActiveDays = currentStreak.totalActiveDays + 1;
  
  const newEntry: StreakEntry = {
    date: now,
    maintained: streakValid,
    activitiesCompleted
  };
  
  return {
    ...currentStreak,
    currentStreak: newCurrentStreak,
    longestStreak: newLongestStreak,
    lastActivityDate: now,
    totalActiveDays: newTotalActiveDays,
    streakHistory: [...currentStreak.streakHistory, newEntry]
  };
}

/**
 * Get streak status
 */
export interface StreakStatus {
  isActive: boolean;
  currentStreak: number;
  longestStreak: number;
  studiedToday: boolean;
  hoursUntilBreak: number;
  nextMilestone: number;
  daysToMilestone: number;
}

export function getStreakStatus(streak: Streak): StreakStatus {
  const now = new Date();
  const hoursSinceLastActivity = 
    (now.getTime() - streak.lastActivityDate.getTime()) / (1000 * 60 * 60);
  
  const isActive = isStreakValid(streak.lastActivityDate);
  const studiedToday = hasStudiedToday(streak.lastActivityDate);
  const hoursUntilBreak = Math.max(
    0,
    STREAK_CONFIG.HOURS_TO_MAINTAIN + STREAK_CONFIG.GRACE_PERIOD_HOURS - hoursSinceLastActivity
  );
  
  // Calculate next milestone
  const milestones = [3, 7, 14, 30, 50, 100, 200, 365];
  const nextMilestone = milestones.find(m => m > streak.currentStreak) || streak.currentStreak + 100;
  const daysToMilestone = nextMilestone - streak.currentStreak;
  
  return {
    isActive,
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    studiedToday,
    hoursUntilBreak,
    nextMilestone,
    daysToMilestone
  };
}

/**
 * Get streak message/motivation
 */
export function getStreakMessage(streak: Streak): string {
  const status = getStreakStatus(streak);
  
  if (!status.isActive) {
    return "¡Empieza tu racha hoy! Completa una lección para comenzar.";
  }
  
  if (status.studiedToday) {
    return `🔥 ¡Racha de ${status.currentStreak} días mantenida! Vuelve mañana para continuar.`;
  }
  
  if (status.hoursUntilBreak < 6) {
    return `⚠️ ¡Apúrate! Solo quedan ${Math.floor(status.hoursUntilBreak)} horas para mantener tu racha de ${status.currentStreak} días.`;
  }
  
  if (status.currentStreak >= 7) {
    return `🔥 ¡Impresionante racha de ${status.currentStreak} días! Sigue así.`;
  }
  
  if (status.currentStreak >= 3) {
    return `🔥 ¡${status.currentStreak} días seguidos! Solo ${status.daysToMilestone} días más para llegar a ${status.nextMilestone} días.`;
  }
  
  return `🔥 Racha de ${status.currentStreak} días. ¡Mantén el ritmo!`;
}

/**
 * Get streak icon based on current streak
 */
export function getStreakIcon(streakDays: number): string {
  if (streakDays >= 100) return '🏆🔥🔥🔥';
  if (streakDays >= 30) return '🔥🔥🔥';
  if (streakDays >= 14) return '🔥🔥';
  if (streakDays >= 7) return '🔥';
  if (streakDays >= 3) return '⚡';
  return '✨';
}

/**
 * Get calendar view of streak history (last 30 days)
 */
export function getStreakCalendar(streak: Streak, days: number = 30): {
  date: Date;
  hasActivity: boolean;
  activitiesCount: number;
}[] {
  const calendar = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const entry = streak.streakHistory.find(e => {
      const entryDate = new Date(e.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === date.getTime();
    });
    
    calendar.push({
      date,
      hasActivity: !!entry,
      activitiesCount: entry?.activitiesCompleted || 0
    });
  }
  
  return calendar;
}
