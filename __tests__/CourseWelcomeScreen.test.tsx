import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseWelcomeScreen from '@/components/course/CourseWelcomeScreen';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
  useReducedMotion: () => false,
}));

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

beforeEach(() => {
  mockLocalStorage.clear();
});

const baseProps = {
  courseId: 'a1',
  userId: 'user-1',
  modulesCount: 5,
  lessonsCount: 20,
  firstLessonId: 'lesson-first',
  onDismiss: jest.fn(),
};

describe('CourseWelcomeScreen', () => {
  beforeEach(() => {
    baseProps.onDismiss = jest.fn();
  });

  it('renders welcome title', () => {
    render(<CourseWelcomeScreen {...baseProps} />);
    expect(screen.getByText('¡Bienvenido al Curso!')).toBeInTheDocument();
  });

  it('renders modules count', () => {
    render(<CourseWelcomeScreen {...baseProps} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Módulos')).toBeInTheDocument();
  });

  it('renders lessons count', () => {
    render(<CourseWelcomeScreen {...baseProps} />);
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('Lecciones')).toBeInTheDocument();
  });

  it('renders session duration', () => {
    render(<CourseWelcomeScreen {...baseProps} />);
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Min/sesión')).toBeInTheDocument();
  });

  it('renders CTA link to firstLessonId', () => {
    render(<CourseWelcomeScreen {...baseProps} />);
    const link = screen.getByRole('link', { name: /Comenzar ahora/i });
    expect(link).toHaveAttribute('href', '/practice/lesson-first');
  });

  it('calls onDismiss when dismiss button is clicked', () => {
    render(<CourseWelcomeScreen {...baseProps} />);
    const dismissBtn = screen.getByRole('button', { name: /Ver el curso primero/i });
    fireEvent.click(dismissBtn);
    expect(baseProps.onDismiss).toHaveBeenCalledTimes(1);
  });

  it('writes localStorage key on dismiss', () => {
    render(<CourseWelcomeScreen {...baseProps} />);
    const dismissBtn = screen.getByRole('button', { name: /Ver el curso primero/i });
    fireEvent.click(dismissBtn);
    expect(mockLocalStorage.getItem('course_welcome_a1_shown')).toBe('true');
  });

  it('calls onDismiss when CTA link is clicked', () => {
    render(<CourseWelcomeScreen {...baseProps} />);
    const link = screen.getByRole('link', { name: /Comenzar ahora/i });
    fireEvent.click(link);
    expect(baseProps.onDismiss).toHaveBeenCalledTimes(1);
  });
});
