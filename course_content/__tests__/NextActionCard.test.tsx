import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NextActionCard from '@/components/course/NextActionCard';
import { Module } from '@/lib/exercise-types';

const mockModules: Module[] = [
  {
    id: 'module-1',
    number: 1,
    title: 'Module 1',
    description: 'Description 1',
    duration: '2h',
    topics: [],
    grammar: [],
    vocabulary: [],
    lessons: [
      {
        id: 'lesson-1',
        title: 'First Lesson',
        description: '',
        duration: 15,
        objectives: [],
        exercises: [{ id: 'ex-1' } as any],
      },
      {
        id: 'lesson-2',
        title: 'Second Lesson',
        description: '',
        duration: 15,
        objectives: [],
        exercises: [{ id: 'ex-2' } as any],
      },
    ],
  },
];

const baseProps = {
  userId: 'user-1',
  level: 'a1',
  modules: mockModules,
};

describe('NextActionCard', () => {
  describe('SRS review priority (branch 1)', () => {
    it('shows SRS review card when srsReviewCount > 0', () => {
      render(
        <NextActionCard
          {...baseProps}
          completedIds={new Set()}
          srsReviewCount={5}
        />
      );
      expect(screen.getByText('Revisión Pendiente')).toBeInTheDocument();
      expect(screen.getByText(/5 ejercicios pendientes de revisión/)).toBeInTheDocument();
    });

    it('links to /practica-inteligente for SRS review', () => {
      render(
        <NextActionCard
          {...baseProps}
          completedIds={new Set()}
          srsReviewCount={3}
        />
      );
      const link = screen.getByRole('link', { name: /REVISAR AHORA/i });
      expect(link).toHaveAttribute('href', '/practica-inteligente');
    });

    it('uses singular form when srsReviewCount is 1', () => {
      render(
        <NextActionCard
          {...baseProps}
          completedIds={new Set()}
          srsReviewCount={1}
        />
      );
      expect(screen.getByText(/1 ejercicio pendiente de revisión/)).toBeInTheDocument();
    });
  });

  describe('Incomplete lesson (branch 2)', () => {
    it('shows continue card with first lesson when no progress', () => {
      render(
        <NextActionCard
          {...baseProps}
          completedIds={new Set()}
          srsReviewCount={0}
        />
      );
      expect(screen.getByText('Continúa Aprendiendo')).toBeInTheDocument();
      expect(screen.getByText('First Lesson')).toBeInTheDocument();
    });

    it('shows continue card for next incomplete lesson after some progress', () => {
      render(
        <NextActionCard
          {...baseProps}
          completedIds={new Set(['ex-1'])}
          srsReviewCount={0}
        />
      );
      expect(screen.getByText('Continúa Aprendiendo')).toBeInTheDocument();
      expect(screen.getByText('Second Lesson')).toBeInTheDocument();
    });

    it('links to the correct next incomplete lesson href', () => {
      render(
        <NextActionCard
          {...baseProps}
          completedIds={new Set(['ex-1'])}
          srsReviewCount={0}
        />
      );
      const link = screen.getByRole('link', { name: /CONTINUAR/i });
      expect(link).toHaveAttribute('href', '/practice/lesson-2');
    });
  });

  describe('No incomplete lessons (branch 3 — all done)', () => {
    it('shows start card when all lessons are completed', () => {
      render(
        <NextActionCard
          {...baseProps}
          completedIds={new Set(['ex-1', 'ex-2'])}
          srsReviewCount={0}
        />
      );
      expect(screen.getByText('¡Empieza Aquí!')).toBeInTheDocument();
      expect(screen.getByText('First Lesson')).toBeInTheDocument();
    });

    it('links to the first lesson', () => {
      render(
        <NextActionCard
          {...baseProps}
          completedIds={new Set(['ex-1', 'ex-2'])}
          srsReviewCount={0}
        />
      );
      const link = screen.getByRole('link', { name: /EMPEZAR/i });
      expect(link).toHaveAttribute('href', '/practice/lesson-1');
    });
  });

  it('returns null when modules have no lessons', () => {
    const { container } = render(
      <NextActionCard
        {...baseProps}
        modules={[{ ...mockModules[0], lessons: [] }]}
        completedIds={new Set()}
        srsReviewCount={0}
      />
    );
    expect(container.firstChild).toBeNull();
  });
});
