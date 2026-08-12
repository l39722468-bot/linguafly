'use client'

import { useState, useCallback } from 'react'

const KEY = 'methodology_progress_v1'

function load(): Record<string, unknown> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

function save(data: Record<string, unknown>) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function useMethodologyProgress() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const saveProjectProgress = useCallback(async (projectId: string, status: string) => {
    const data = load()
    const projects = (data.projects as Record<string, string>) || {}
    projects[projectId] = status
    save({ ...data, projects })
  }, [])

  const saveTaskProgress = useCallback(async (projectId: string, taskId: string, completed: boolean) => {
    const data = load()
    const tasks = (data.tasks as Record<string, boolean>) || {}
    tasks[`${projectId}:${taskId}`] = completed
    save({ ...data, tasks })
  }, [])

  const saveLessonProgress = useCallback(async (lessonId: string, completed: boolean, xpEarned: number) => {
    const data = load()
    const lessons = (data.lessons as Record<string, { completed: boolean; xpEarned: number }>) || {}
    lessons[lessonId] = { completed, xpEarned }
    save({ ...data, lessons })
  }, [])

  const updateXP = useCallback(async (amount: number, _source: string, _sourceId?: string) => {
    const data = load()
    const xp = Number(data.xp || 0) + amount
    save({ ...data, xp })
  }, [])

  const saveBadgeProgress = useCallback(async (badgeId: string, progress: number = 0) => {
    const data = load()
    const badges = (data.badges as Record<string, number>) || {}
    badges[badgeId] = progress
    save({ ...data, badges })
  }, [])

  const updateStreak = useCallback(async () => {
    const data = load()
    const today = new Date().toISOString().split('T')[0]
    if (data.lastActivityDate === today) return
    const current = Number(data.currentStreak || 0) + 1
    save({
      ...data,
      currentStreak: current,
      longestStreak: Math.max(current, Number(data.longestStreak || 0)),
      lastActivityDate: today,
    })
  }, [])

  const saveARVocabulary = useCallback(async (wordId: string, learned: boolean) => {
    const data = load()
    const ar = (data.arWords as Record<string, boolean>) || {}
    ar[wordId] = learned
    save({ ...data, arWords: ar })
  }, [])

  const updateMethodologyStats = useCallback(async (_updates: Record<string, number | undefined>) => {
    return
  }, [])

  const fetchAllProgress = useCallback(async () => {
    setLoading(true)
    try {
      const data = load()
      return {
        projects: Object.entries((data.projects as object) || {}).map(([project_id, status]) => ({ project_id, status })),
        tasks: [],
        lessons: Object.entries((data.lessons as object) || {}).map(([lesson_id, v]: any) => ({ lesson_id, ...v })),
        arWords: Object.entries((data.arWords as object) || {}).map(([word_id, learned]) => ({ word_id, learned })),
        stats: null,
        xp: { total_xp: data.xp || 0 },
        badges: Object.entries((data.badges as object) || {}).map(([badge_id, progress]) => ({ badge_id, progress })),
        streaks: {
          current_streak: data.currentStreak || 0,
          longest_streak: data.longestStreak || 0,
          last_activity_date: data.lastActivityDate || null,
        },
      }
    } catch {
      setError('Failed to fetch methodology progress')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    saveProjectProgress,
    saveTaskProgress,
    saveLessonProgress,
    saveARVocabulary,
    updateMethodologyStats,
    updateXP,
    saveBadgeProgress,
    updateStreak,
    fetchAllProgress
  }
}
