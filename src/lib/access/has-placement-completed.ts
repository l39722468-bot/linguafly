import { normalizePlacementLevel } from '@/lib/access/save-placement-result';

export type PlacementProfileLike = {
  placement_completed?: boolean | null;
  placement_completed_at?: string | null;
  language_level?: string | null;
  learning_goals?: string[] | null;
};

export function hasPlacementCompleted(
  profile?: PlacementProfileLike | null,
  fallbackLanguageLevel?: string | null
): boolean {
  if (profile?.placement_completed_at) return true;
  if (profile?.placement_completed) return true;

  const goals = Array.isArray(profile?.learning_goals) ? profile.learning_goals : [];
  if (goals.includes('placement_completed')) return true;

  if (normalizePlacementLevel(profile?.language_level)) return true;
  if (normalizePlacementLevel(fallbackLanguageLevel)) return true;

  return false;
}
