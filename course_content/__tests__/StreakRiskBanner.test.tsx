import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StreakRiskBanner from '@/components/gamification/StreakRiskBanner';

const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true,
});

beforeEach(() => {
  mockSessionStorage.clear();
});

describe('StreakRiskBanner', () => {
  it('renders streak risk message with streak count', () => {
    render(<StreakRiskBanner streakDays={7} nextLessonHref="/practice/lesson-1" />);
    expect(screen.getByText(/Tu racha de 7 días está en riesgo/)).toBeInTheDocument();
  });

  it('uses singular form when streakDays is 1', () => {
    render(<StreakRiskBanner streakDays={1} nextLessonHref="/practice/lesson-1" />);
    expect(screen.getByText(/Tu racha de 1 día está en riesgo/)).toBeInTheDocument();
  });

  it('renders a link to nextLessonHref', () => {
    render(<StreakRiskBanner streakDays={5} nextLessonHref="/practice/lesson-42" />);
    const link = screen.getByRole('link', { name: /Continúa aquí/i });
    expect(link).toHaveAttribute('href', '/practice/lesson-42');
  });

  it('dismisses banner when close button is clicked', () => {
    render(<StreakRiskBanner streakDays={5} nextLessonHref="/practice/lesson-1" />);
    const dismissBtn = screen.getByRole('button', { name: /Cerrar aviso de racha/i });
    fireEvent.click(dismissBtn);
    expect(screen.queryByText(/Tu racha de/)).not.toBeInTheDocument();
  });

  it('stores dismissal in sessionStorage on close', () => {
    render(<StreakRiskBanner streakDays={5} nextLessonHref="/practice/lesson-1" />);
    const dismissBtn = screen.getByRole('button', { name: /Cerrar aviso de racha/i });
    fireEvent.click(dismissBtn);
    expect(mockSessionStorage.getItem('streak_risk_dismissed')).toBe('true');
  });
});
