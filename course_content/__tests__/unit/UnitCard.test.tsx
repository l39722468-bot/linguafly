import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UnitCard } from '@/components/course/preview/UnitCard';
import { UnitMetadata } from '@/types/premium-course';

const mockUnit: UnitMetadata = {
  unitId: 'unit-1',
  unitNumber: 1,
  title: 'Greetings and Introductions',
  topics: ['Grammar', 'Vocabulary', 'Speaking', 'Listening', 'Reading'],
  exerciseCount: 25,
  exerciseBreakdown: {
    multiple_choice: 5,
    fill_in_the_blank: 8,
    matching: 4,
    drag_and_drop: 3,
    categorization: 2,
    short_answer: 1,
    audio_matching: 1,
    listening: 1,
    video_narrative: 0,
    flashcards: 0,
    other: 0,
    total: 25,
  },
  difficulty: 1,
  estimatedDuration: 45,
  learningOutcomes: ['Greet people', 'Introduce yourself'],
  masteryTags: ['grammar:greetings', 'vocabulary:basics'],
};

describe('UnitCard Component', () => {
  test('renders all metadata correctly', () => {
    render(<UnitCard unit={mockUnit} />);

    expect(screen.getByText('Greetings and Introductions')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('45 min')).toBeInTheDocument();
    expect(screen.getByText('25 exercises')).toBeInTheDocument();
  });

  test('renders difficulty stars correctly for level 1', () => {
    const { container } = render(<UnitCard unit={mockUnit} />);

    const stars = container.querySelectorAll('svg');
    const filledStars = Array.from(stars).filter((star) =>
      star.classList.contains('fill-amber-400')
    );

    expect(filledStars.length).toBe(1);
  });

  test('renders difficulty stars correctly for level 5', () => {
    const hardUnit = { ...mockUnit, difficulty: 5 };
    const { container } = render(<UnitCard unit={hardUnit} />);

    const stars = container.querySelectorAll('svg');
    const filledStars = Array.from(stars).filter((star) =>
      star.classList.contains('fill-amber-400')
    );

    expect(filledStars.length).toBe(5);
  });

  test('displays first 4 topics and shows +N for additional topics', () => {
    render(<UnitCard unit={mockUnit} />);

    expect(screen.getByText('Grammar')).toBeInTheDocument();
    expect(screen.getByText('Vocabulary')).toBeInTheDocument();
    expect(screen.getByText('Speaking')).toBeInTheDocument();
    expect(screen.getByText('Listening')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  test('does not show +N badge when topics are 4 or fewer', () => {
    const unitWithFewTopics = {
      ...mockUnit,
      topics: ['Grammar', 'Vocabulary'],
    };
    render(<UnitCard unit={unitWithFewTopics} />);

    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  test('renders preview button with correct link', () => {
    render(<UnitCard unit={mockUnit} />);

    const link = screen.getByRole('link', { name: /Preview Unit/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/debug/a1-preview/unit-1');
  });

  test('handles missing topics gracefully', () => {
    const unitWithoutTopics = { ...mockUnit, topics: [] };
    const { container } = render(<UnitCard unit={unitWithoutTopics} />);

    const topicBadges = container.querySelectorAll('.text-\\[10px\\]');
    expect(topicBadges.length).toBe(0);
  });

  test('handles edge case of difficulty 0', () => {
    const easyUnit = { ...mockUnit, difficulty: 0 };
    const { container } = render(<UnitCard unit={easyUnit} />);

    const stars = container.querySelectorAll('svg');
    const filledStars = Array.from(stars).filter((star) =>
      star.classList.contains('fill-amber-400')
    );

    expect(filledStars.length).toBe(0);
  });

  test('truncates long titles with line-clamp-2', () => {
    const unitWithLongTitle = {
      ...mockUnit,
      title: 'This is a very long title that should be truncated to two lines maximum because it is extremely verbose',
    };
    const { container } = render(<UnitCard unit={unitWithLongTitle} />);

    const titleElement = container.querySelector('.line-clamp-2');
    expect(titleElement).toBeInTheDocument();
  });

  test('applies hover effects with proper classes', () => {
    const { container } = render(<UnitCard unit={mockUnit} />);

    const card = container.querySelector('.group');
    expect(card).toBeInTheDocument();
    expect(card?.classList.contains('hover:shadow-lg')).toBe(true);
    expect(card?.classList.contains('hover:border-coral-200')).toBe(true);
  });

  test('renders unit number badge in top right corner', () => {
    const { container } = render(<UnitCard unit={mockUnit} />);

    const badge = container.querySelector('.absolute.top-4.right-4');
    expect(badge).toBeInTheDocument();
    expect(badge?.textContent).toBe('1');
  });
});
