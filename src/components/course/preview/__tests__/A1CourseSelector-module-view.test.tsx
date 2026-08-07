import { render, screen, fireEvent } from '@testing-library/react';
import { A1CourseSelector } from '../A1CourseSelector';
import { UnitMetadata } from '@/types/premium-course';

const createMockUnits = (count: number): UnitMetadata[] => {
  return Array.from({ length: count }, (_, i) => ({
    unitId: `unit-${i + 1}`,
    unitNumber: i + 1,
    title: `Unit ${i + 1}: Test Unit`,
    topics: ['Grammar', 'Vocabulary'],
    exerciseCount: 10,
    exerciseBreakdown: {
      multiple_choice: 5,
      fill_in_the_blank: 2,
      matching: 1,
      drag_and_drop: 1,
      categorization: 0,
      short_answer: 1,
      audio_matching: 0,
      listening: 0,
      video_narrative: 0,
      flashcards: 0,
      other: 0,
      total: 10
    },
    difficulty: Math.min(5, Math.ceil((i + 1) / 12)),
    estimatedDuration: 30,
    learningOutcomes: ['Learning outcome 1'],
    masteryTags: ['grammar.test']
  }));
};

describe('A1CourseSelector - Module View', () => {
  it('should render grid view by default', () => {
    const units = createMockUnits(20);
    render(<A1CourseSelector units={units} />);

    const gridButton = screen.getByRole('button', { name: /grid view/i });
    expect(gridButton).toHaveAttribute('aria-pressed', 'true');

    expect(screen.getAllByText(/Unit \d+: Test Unit/)).toHaveLength(20);
  });

  it('should toggle to module view when module button is clicked', () => {
    const units = createMockUnits(20);
    render(<A1CourseSelector units={units} />);

    const moduleButton = screen.getByRole('button', { name: /module view/i });
    fireEvent.click(moduleButton);

    expect(moduleButton).toHaveAttribute('aria-pressed', 'true');

    expect(screen.getByText('Module 1: Basics & Greetings')).toBeInTheDocument();
    expect(screen.getByText('Module 2: Daily Life & Routines')).toBeInTheDocument();
  });

  it('should group 60 units into 6 modules in module view', () => {
    const units = createMockUnits(60);
    render(<A1CourseSelector units={units} />);

    const moduleButton = screen.getByRole('button', { name: /module view/i });
    fireEvent.click(moduleButton);

    expect(screen.getByText('Module 1: Basics & Greetings')).toBeInTheDocument();
    expect(screen.getByText('Module 2: Daily Life & Routines')).toBeInTheDocument();
    expect(screen.getByText('Module 3: People & Relationships')).toBeInTheDocument();
    expect(screen.getByText('Module 4: Shopping & Services')).toBeInTheDocument();
    expect(screen.getByText('Module 5: Travel & Directions')).toBeInTheDocument();
    expect(screen.getByText('Module 6: Food & Leisure')).toBeInTheDocument();
  });

  it('should toggle back to grid view', () => {
    const units = createMockUnits(20);
    render(<A1CourseSelector units={units} />);

    const moduleButton = screen.getByRole('button', { name: /module view/i });
    const gridButton = screen.getByRole('button', { name: /grid view/i });

    fireEvent.click(moduleButton);
    expect(screen.getByText('Module 1: Basics & Greetings')).toBeInTheDocument();

    fireEvent.click(gridButton);
    expect(gridButton).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByText('Module 1: Basics & Greetings')).not.toBeInTheDocument();
  });

  it('should apply filters in module view', () => {
    const units = createMockUnits(30);
    units[0].topics = ['Grammar', 'Vocabulary'];
    units[1].topics = ['Listening', 'Writing'];
    units[2].topics = ['Grammar'];

    render(<A1CourseSelector units={units} />);

    const moduleButton = screen.getByRole('button', { name: /module view/i });
    fireEvent.click(moduleButton);

    const filterButton = screen.getByRole('button', { name: /toggle filters/i });
    fireEvent.click(filterButton);

    const grammarFilter = screen.getByRole('button', { name: 'Grammar' });
    fireEvent.click(grammarFilter);

    const modules = screen.getAllByText(/Module \d+:/);
    expect(modules.length).toBeGreaterThan(0);
  });

  it('should auto-expand module when only one module matches filter', () => {
    const units = createMockUnits(15);
    render(<A1CourseSelector units={units} />);

    const moduleButton = screen.getByRole('button', { name: /module view/i });
    fireEvent.click(moduleButton);

    const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
    fireEvent.change(searchInput, { target: { value: '1' } });

    const expandButton = screen.getByRole('button', { name: /expand module 1/i });
    fireEvent.click(expandButton);

    expect(screen.getByText('Unit 1: Test Unit')).toBeInTheDocument();
  });
});
