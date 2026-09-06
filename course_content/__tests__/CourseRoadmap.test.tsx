import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseRoadmap from '@/components/course/CourseRoadmap';
import { Module } from '@/lib/exercise-types';

const mockModules: Module[] = [
  {
    id: 'module-1',
    number: 1,
    title: 'Module 1',
    description: 'Desc 1',
    duration: '2h',
    topics: [],
    grammar: [],
    vocabulary: [],
    lessons: [
      {
        id: 'lesson-done',
        title: 'Completed Lesson',
        description: '',
        duration: 10,
        objectives: [],
        exercises: [{ id: 'ex-1' } as any],
      },
      {
        id: 'lesson-current',
        title: 'Current Lesson',
        description: '',
        duration: 10,
        objectives: [],
        exercises: [{ id: 'ex-2' } as any],
      },
      {
        id: 'lesson-future',
        title: 'Future Lesson',
        description: '',
        duration: 10,
        objectives: [],
        exercises: [{ id: 'ex-3' } as any],
      },
    ],
  },
];

describe('CourseRoadmap', () => {
  it('renders all lesson titles', () => {
    render(
      <CourseRoadmap
        modules={mockModules}
        completedIds={new Set(['ex-1'])}
        currentLessonId="lesson-current"
      />
    );
    expect(screen.getByText('Completed Lesson')).toBeInTheDocument();
    expect(screen.getByText('Current Lesson')).toBeInTheDocument();
    expect(screen.getByText('Future Lesson')).toBeInTheDocument();
  });

  it('marks completed lesson node with state=completed', () => {
    render(
      <CourseRoadmap
        modules={mockModules}
        completedIds={new Set(['ex-1'])}
        currentLessonId="lesson-current"
      />
    );
    const completedNode = screen.getAllByRole('link', { name: /Completed Lesson/i })[0]
      .closest('.relative')
      ?.previousSibling as HTMLElement;

    const nodes = document.querySelectorAll('[data-state]');
    const stateMap = Array.from(nodes).reduce<Record<string, string>>((acc, el) => {
      acc[el.getAttribute('data-state') ?? ''] = el.getAttribute('data-state') ?? '';
      return acc;
    }, {});

    expect(stateMap['completed']).toBe('completed');
  });

  it('marks current lesson node with state=current', () => {
    render(
      <CourseRoadmap
        modules={mockModules}
        completedIds={new Set(['ex-1'])}
        currentLessonId="lesson-current"
      />
    );
    const nodes = document.querySelectorAll('[data-state="current"]');
    expect(nodes.length).toBe(1);
    expect(nodes[0]).toHaveClass('animate-pulse');
  });

  it('marks future lesson node with state=future', () => {
    render(
      <CourseRoadmap
        modules={mockModules}
        completedIds={new Set(['ex-1'])}
        currentLessonId="lesson-current"
      />
    );
    const nodes = document.querySelectorAll('[data-state="future"]');
    expect(nodes.length).toBe(1);
  });

  it('renders links to lesson pages', () => {
    render(
      <CourseRoadmap
        modules={mockModules}
        completedIds={new Set()}
        currentLessonId={null}
      />
    );
    const links = screen.getAllByRole('link');
    const hrefs = links.map(l => l.getAttribute('href'));
    expect(hrefs).toContain('/practice/lesson-done');
    expect(hrefs).toContain('/practice/lesson-current');
    expect(hrefs).toContain('/practice/lesson-future');
  });

  it('treats all lessons as future when no completions and no currentLessonId', () => {
    render(
      <CourseRoadmap
        modules={mockModules}
        completedIds={new Set()}
        currentLessonId={null}
      />
    );
    const nodes = document.querySelectorAll('[data-state="future"]');
    expect(nodes.length).toBe(3);
  });
});
