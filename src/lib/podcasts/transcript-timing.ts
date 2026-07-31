import type { DialogueTurn } from './types'

/** Índice del turno activo según tiempo de reproducción (peso por longitud del texto). */
export function getActiveTurnIndex(
  turns: DialogueTurn[],
  currentTime: number,
  duration: number
): number {
  if (turns.length === 0 || duration <= 0) return 0

  const weights = turns.map((turn) => Math.max(turn.text.length, 1))
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  let boundary = 0

  for (let i = 0; i < turns.length; i++) {
    boundary += (weights[i] / total) * duration
    if (currentTime <= boundary) return i
  }

  return turns.length - 1
}
