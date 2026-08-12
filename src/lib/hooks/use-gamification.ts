'use client';

import { useState, useEffect } from 'react';
import { awardXP, calculateLevel, XP_REWARDS } from '@/lib/gamification/xp';
import { checkAndAwardBadges } from '@/lib/gamification/badges';
import { type Badge, type EarnedBadge } from '@/lib/gamification/types';
import { updateStreak, type StreakData } from '@/lib/gamification/streaks';

const GUEST_ID = 'guest';

export interface UserGamificationData {
  xp: number;
  level: number;
  xpToNextLevel: number;
  badges: EarnedBadge[];
  streak: StreakData;
  isLoading: boolean;
}

function readLocalBadges(userId: string): EarnedBadge[] {
  try {
    const raw = localStorage.getItem(`focus_badges:${userId}`);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    return ids.map((badge_id) => ({
      badge_id,
      earned_at: new Date().toISOString(),
    })) as EarnedBadge[];
  } catch {
    return [];
  }
}

export function useGamification() {
  const [data, setData] = useState<UserGamificationData>({
    xp: 0,
    level: 1,
    xpToNextLevel: 100,
    badges: [],
    streak: {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: new Date().toISOString().split('T')[0],
    },
    isLoading: true,
  });

  useEffect(() => {
    loadGamificationData();
  }, []);

  const loadGamificationData = async () => {
    try {
      const xp = Number(localStorage.getItem(`focus_xp:${GUEST_ID}`) || 0);
      const levelInfo = calculateLevel(xp);
      const streakRaw = localStorage.getItem(`focus_streak:${GUEST_ID}`);
      const streakData = streakRaw ? JSON.parse(streakRaw) : null;

      setData({
        xp,
        level: levelInfo.currentLevel,
        xpToNextLevel: levelInfo.xpToNextLevel,
        badges: readLocalBadges(GUEST_ID),
        streak: {
          currentStreak: streakData?.current_streak || 0,
          longestStreak: streakData?.longest_streak || 0,
          lastActivityDate:
            streakData?.last_activity_date || new Date().toISOString().split('T')[0],
        },
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading gamification data:', error);
      setData(prev => ({ ...prev, isLoading: false }));
    }
  };

  const addXP = async (amount: number, source: string, sourceId?: string, description?: string) => {
    try {
      const result = await awardXP(GUEST_ID, amount, source, sourceId, description);
      if (result) {
        setData(prev => ({
          ...prev,
          xp: result.totalXP,
          level: result.level,
          xpToNextLevel: result.xpToNextLevel,
        }));
        await checkBadges();
        return result;
      }
    } catch (error) {
      console.error('Error adding XP:', error);
    }
  };

  const checkBadges = async () => {
    try {
      const newBadges = await checkAndAwardBadges(GUEST_ID);
      if (newBadges && newBadges.length > 0) {
        setData(prev => ({
          ...prev,
          badges: readLocalBadges(GUEST_ID),
        }));
        return newBadges;
      }
    } catch (error) {
      console.error('Error checking badges:', error);
    }
  };

  const recordActivity = async () => {
    try {
      const streakData = await updateStreak(GUEST_ID);
      if (streakData) {
        setData(prev => ({
          ...prev,
          streak: streakData,
        }));
        return streakData;
      }
    } catch (error) {
      console.error('Error recording activity:', error);
    }
  };

  const completeExercise = async (exerciseId: string, score: number, maxScore: number) => {
    try {
      await recordActivity();
      const baseXP = XP_REWARDS['practice-session'] || 20;
      const xpAmount = Math.floor((score / maxScore) * baseXP);
      const bonusXP = score === maxScore ? (XP_REWARDS['perfect-exercise-bonus'] || 10) : 0;
      await addXP(xpAmount + bonusXP, 'exercise', exerciseId,
        `Completed exercise ${exerciseId} with ${score}/${maxScore} points`);
      const newBadges = await checkBadges();
      return { newBadges };
    } catch (error) {
      console.error('Error completing exercise:', error);
    }
  };

  const completeLesson = async (lessonId: string, totalScore: number, maxScore: number) => {
    try {
      await recordActivity();
      const baseXP = XP_REWARDS['lesson-completion'] || 100;
      const xpAmount = Math.floor((totalScore / maxScore) * baseXP);
      const bonusXP = totalScore === maxScore ? (XP_REWARDS['perfect-score'] || 50) : 0;
      await addXP(xpAmount + bonusXP, 'lesson', lessonId,
        `Completed lesson ${lessonId} with ${totalScore}/${maxScore} points`);
      const newBadges = await checkBadges();
      return { newBadges };
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const completeMission = async (missionId: string, score: number) => {
    try {
      await recordActivity();
      const baseXP = XP_REWARDS['ai-mission'] || 150;
      const xpAmount = Math.floor((score / 100) * baseXP);
      await addXP(xpAmount, 'ai-mission', missionId,
        `Misión AI: ${missionId} completada con ${score}/100 puntos`);
      const newBadges = await checkBadges();
      return { newBadges };
    } catch (error) {
      console.error('Error completing mission:', error);
    }
  };

  return {
    ...data,
    addXP,
    checkBadges,
    recordActivity,
    completeExercise,
    completeLesson,
    completeMission,
    refresh: loadGamificationData,
  };
}
