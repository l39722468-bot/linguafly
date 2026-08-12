import { renderHook, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useWeekProgress } from '@/hooks/useWeekProgress';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  localStorageMock.clear();
});

describe('useWeekProgress', () => {
  describe('optimistic localStorage read on mount', () => {
    it('reads existing localStorage data immediately', async () => {
      localStorageMock.setItem(
        'course_progress_week-1',
        JSON.stringify(['activity-1', 'activity-2'])
      );

      const { result } = renderHook(() =>
        useWeekProgress('week-1', null)
      );

      await waitFor(() => {
        expect(result.current.completedActivities).toContain('activity-1');
        expect(result.current.completedActivities).toContain('activity-2');
      });
    });

    it('returns empty array when no localStorage data exists', async () => {
      const { result } = renderHook(() =>
        useWeekProgress('week-1', null)
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.completedActivities).toEqual([]);
    });
  });

  describe('markComplete', () => {
    it('adds activity to completedActivities synchronously', async () => {
      const { result } = renderHook(() =>
        useWeekProgress('week-1', null)
      );

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await result.current.markComplete('activity-new');
      });

      expect(result.current.completedActivities).toContain('activity-new');
    });

    it('writes to localStorage on markComplete', async () => {
      const { result } = renderHook(() =>
        useWeekProgress('week-1', null)
      );

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await result.current.markComplete('activity-x');
      });

      const stored = JSON.parse(localStorageMock.getItem('course_progress_week-1') ?? '[]');
      expect(stored).toContain('activity-x');
    });

    it('does not add duplicate activity', async () => {
      localStorageMock.setItem(
        'course_progress_week-1',
        JSON.stringify(['activity-dup'])
      );

      const { result } = renderHook(() =>
        useWeekProgress('week-1', null)
      );

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await result.current.markComplete('activity-dup');
      });

      expect(
        result.current.completedActivities.filter(a => a === 'activity-dup').length
      ).toBe(1);
    });
  });
});
