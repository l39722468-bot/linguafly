import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { A1CourseSelector } from '@/components/course/preview/A1CourseSelector';
import { UnitMetadata } from '@/types/premium-course';

jest.mock('../../src/components/course/preview/UnitCard', () => ({
  UnitCard: ({ unit }: { unit: UnitMetadata }) => (
    <div data-testid={`unit-card-${unit.unitId}`}>
      <h3>{unit.title}</h3>
      <span>Unit {unit.unitNumber}</span>
    </div>
  ),
}));

const mockUnits: UnitMetadata[] = [
  {
    unitId: 'unit1',
    unitNumber: 1,
    title: 'Welcome to London',
    topics: ['Vocabulary', 'Grammar'],
    exerciseCount: 15,
    exerciseBreakdown: {
      multiple_choice: 5,
      fill_in_the_blank: 4,
      matching: 3,
      drag_and_drop: 2,
      categorization: 1,
      short_answer: 0,
      audio_matching: 0,
      listening: 0,
      video_narrative: 0,
      flashcards: 0,
      other: 0,
      total: 15,
    },
    difficulty: 1,
    estimatedDuration: 45,
  },
  {
    unitId: 'unit2',
    unitNumber: 2,
    title: 'At the Airport',
    topics: ['Vocabulary', 'Listening'],
    exerciseCount: 12,
    exerciseBreakdown: {
      multiple_choice: 4,
      fill_in_the_blank: 3,
      matching: 2,
      drag_and_drop: 2,
      categorization: 1,
      short_answer: 0,
      audio_matching: 0,
      listening: 0,
      video_narrative: 0,
      flashcards: 0,
      other: 0,
      total: 12,
    },
    difficulty: 1,
    estimatedDuration: 40,
  },
  {
    unitId: 'unit30',
    unitNumber: 30,
    title: 'Shopping and Prices',
    topics: ['Vocabulary', 'Grammar', 'Speaking'],
    exerciseCount: 18,
    exerciseBreakdown: {
      multiple_choice: 6,
      fill_in_the_blank: 5,
      matching: 4,
      drag_and_drop: 2,
      categorization: 1,
      short_answer: 0,
      audio_matching: 0,
      listening: 0,
      video_narrative: 0,
      flashcards: 0,
      other: 0,
      total: 18,
    },
    difficulty: 3,
    estimatedDuration: 55,
  },
];

describe('A1CourseSelector', () => {
  it('should render all units', () => {
    render(<A1CourseSelector units={mockUnits} />);
    
    expect(screen.getByTestId('unit-card-unit1')).toBeInTheDocument();
    expect(screen.getByTestId('unit-card-unit2')).toBeInTheDocument();
    expect(screen.getByTestId('unit-card-unit30')).toBeInTheDocument();
  });

  it('should display search input', () => {
    render(<A1CourseSelector units={mockUnits} />);
    
    const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('should filter units by title', () => {
    render(<A1CourseSelector units={mockUnits} />);
    
    const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
    fireEvent.change(searchInput, { target: { value: 'Airport' } });
    
    expect(screen.getByTestId('unit-card-unit2')).toBeInTheDocument();
    expect(screen.queryByTestId('unit-card-unit1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('unit-card-unit30')).not.toBeInTheDocument();
  });

  it('should filter units by number', () => {
    render(<A1CourseSelector units={mockUnits} />);
    
    const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
    fireEvent.change(searchInput, { target: { value: '30' } });
    
    expect(screen.getByTestId('unit-card-unit30')).toBeInTheDocument();
    expect(screen.queryByTestId('unit-card-unit1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('unit-card-unit2')).not.toBeInTheDocument();
  });

  it('should be case-insensitive in search', () => {
    render(<A1CourseSelector units={mockUnits} />);
    
    const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
    fireEvent.change(searchInput, { target: { value: 'LONDON' } });
    
    expect(screen.getByTestId('unit-card-unit1')).toBeInTheDocument();
    expect(screen.queryByTestId('unit-card-unit2')).not.toBeInTheDocument();
  });

  it('should show results count when searching', () => {
    render(<A1CourseSelector units={mockUnits} />);
    
    const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
    fireEvent.change(searchInput, { target: { value: 'unit' } });
    
    expect(screen.getByText(/Found/i)).toBeInTheDocument();
    const results = screen.getAllByText((content, element) => {
      return !!(element?.textContent?.includes('Found') && element?.textContent?.includes('3') && element?.textContent?.includes('units'));
    });
    expect(results.length).toBeGreaterThan(0);
  });

  it('should show clear button when search has value', () => {
    render(<A1CourseSelector units={mockUnits} />);
    
    const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
    fireEvent.change(searchInput, { target: { value: 'London' } });
    
    const clearButton = screen.getByLabelText(/clear search/i);
    expect(clearButton).toBeInTheDocument();
  });

  it('should clear search when clear button is clicked', () => {
    render(<A1CourseSelector units={mockUnits} />);
    
    const searchInput = screen.getByPlaceholderText(/search by unit number or title/i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'London' } });
    
    expect(searchInput.value).toBe('London');
    
    const clearButton = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearButton);
    
    expect(searchInput.value).toBe('');
    expect(screen.getByTestId('unit-card-unit1')).toBeInTheDocument();
    expect(screen.getByTestId('unit-card-unit2')).toBeInTheDocument();
    expect(screen.getByTestId('unit-card-unit30')).toBeInTheDocument();
  });

  it('should show "no units found" message when search returns no results', () => {
    render(<A1CourseSelector units={mockUnits} />);
    
    const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent unit' } });
    
    expect(screen.getByText(/No units found/i)).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting your/i)).toBeInTheDocument();
  });

  it('should show clear all filters button in no results state', () => {
    render(<A1CourseSelector units={mockUnits} />);
    
    const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
    fireEvent.change(searchInput, { target: { value: 'xyz' } });
    
    const clearButton = screen.getByRole('button', { name: /clear all filters/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('should handle empty units array', () => {
    render(<A1CourseSelector units={[]} />);
    
    const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('should filter by partial unit ID match', () => {
    render(<A1CourseSelector units={mockUnits} />);
    
    const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
    fireEvent.change(searchInput, { target: { value: 'unit1' } });
    
    expect(screen.getByTestId('unit-card-unit1')).toBeInTheDocument();
  });

  describe('Filter functionality', () => {
    it('should show filter button', () => {
      render(<A1CourseSelector units={mockUnits} />);
      
      const filterButton = screen.getByLabelText(/toggle filters/i);
      expect(filterButton).toBeInTheDocument();
    });

    it('should toggle filter panel when filter button is clicked', () => {
      render(<A1CourseSelector units={mockUnits} />);
      
      const filterButton = screen.getByLabelText(/toggle filters/i);
      
      expect(screen.queryByText('Topics')).not.toBeInTheDocument();
      
      fireEvent.click(filterButton);
      
      expect(screen.getByText('Topics')).toBeInTheDocument();
      expect(screen.getByText('Difficulty')).toBeInTheDocument();
    });

    it('should filter units by single topic', () => {
      render(<A1CourseSelector units={mockUnits} />);
      
      const filterButton = screen.getByLabelText(/toggle filters/i);
      fireEvent.click(filterButton);
      
      const grammarButton = screen.getByRole('button', { name: 'Grammar' });
      fireEvent.click(grammarButton);
      
      expect(screen.getByTestId('unit-card-unit1')).toBeInTheDocument();
      expect(screen.getByTestId('unit-card-unit30')).toBeInTheDocument();
      expect(screen.queryByTestId('unit-card-unit2')).not.toBeInTheDocument();
    });

    it('should filter units by multiple topics (OR logic)', () => {
      render(<A1CourseSelector units={mockUnits} />);
      
      const filterButton = screen.getByLabelText(/toggle filters/i);
      fireEvent.click(filterButton);
      
      const grammarButton = screen.getByRole('button', { name: 'Grammar' });
      const listeningButton = screen.getByRole('button', { name: 'Listening' });
      
      fireEvent.click(grammarButton);
      fireEvent.click(listeningButton);
      
      expect(screen.getByTestId('unit-card-unit1')).toBeInTheDocument();
      expect(screen.getByTestId('unit-card-unit2')).toBeInTheDocument();
      expect(screen.getByTestId('unit-card-unit30')).toBeInTheDocument();
    });

    it('should filter units by difficulty level', () => {
      render(<A1CourseSelector units={mockUnits} />);
      
      const filterButton = screen.getByLabelText(/toggle filters/i);
      fireEvent.click(filterButton);
      
      const difficulty3Button = screen.getByLabelText('Difficulty 3 stars');
      fireEvent.click(difficulty3Button);
      
      expect(screen.getByTestId('unit-card-unit30')).toBeInTheDocument();
      expect(screen.queryByTestId('unit-card-unit1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('unit-card-unit2')).not.toBeInTheDocument();
    });

    it('should filter units by multiple difficulty levels', () => {
      render(<A1CourseSelector units={mockUnits} />);
      
      const filterButton = screen.getByLabelText(/toggle filters/i);
      fireEvent.click(filterButton);
      
      const difficulty1Button = screen.getByLabelText('Difficulty 1 stars');
      const difficulty3Button = screen.getByLabelText('Difficulty 3 stars');
      
      fireEvent.click(difficulty1Button);
      fireEvent.click(difficulty3Button);
      
      expect(screen.getByTestId('unit-card-unit1')).toBeInTheDocument();
      expect(screen.getByTestId('unit-card-unit2')).toBeInTheDocument();
      expect(screen.getByTestId('unit-card-unit30')).toBeInTheDocument();
    });

    it('should combine search, topic, and difficulty filters', () => {
      render(<A1CourseSelector units={mockUnits} />);
      
      const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
      fireEvent.change(searchInput, { target: { value: 'London' } });
      
      const filterButton = screen.getByLabelText(/toggle filters/i);
      fireEvent.click(filterButton);
      
      const grammarButton = screen.getByRole('button', { name: 'Grammar' });
      fireEvent.click(grammarButton);
      
      const difficulty1Button = screen.getByLabelText('Difficulty 1 stars');
      fireEvent.click(difficulty1Button);
      
      expect(screen.getByTestId('unit-card-unit1')).toBeInTheDocument();
      expect(screen.queryByTestId('unit-card-unit2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('unit-card-unit30')).not.toBeInTheDocument();
    });

    it('should show filter count badge on filter button', () => {
      render(<A1CourseSelector units={mockUnits} />);
      
      const filterButton = screen.getByLabelText(/toggle filters/i);
      fireEvent.click(filterButton);
      
      const grammarButton = screen.getByRole('button', { name: 'Grammar' });
      const difficulty1Button = screen.getByLabelText('Difficulty 1 stars');
      
      fireEvent.click(grammarButton);
      fireEvent.click(difficulty1Button);
      
      const filterButtonWithBadge = screen.getByLabelText(/toggle filters/i);
      const badge = filterButtonWithBadge.querySelector('.bg-white.text-coral-600');
      expect(badge).toBeInTheDocument();
      expect(badge?.textContent).toBe('2');
    });

    it('should display active filters as removable chips', () => {
      render(<A1CourseSelector units={mockUnits} />);
      
      const filterButton = screen.getByLabelText(/toggle filters/i);
      fireEvent.click(filterButton);
      
      const grammarButton = screen.getByRole('button', { name: 'Grammar' });
      fireEvent.click(grammarButton);
      
      expect(screen.getByText('Active filters:')).toBeInTheDocument();
      
      const grammarChip = screen.getAllByText('Grammar').find(el => 
        el.closest('button')?.className.includes('bg-coral-100')
      );
      expect(grammarChip).toBeInTheDocument();
    });

    it('should remove individual topic filter when chip is clicked', () => {
      render(<A1CourseSelector units={mockUnits} />);
      
      const filterButton = screen.getByLabelText(/toggle filters/i);
      fireEvent.click(filterButton);
      
      const grammarButton = screen.getByRole('button', { name: 'Grammar' });
      fireEvent.click(grammarButton);
      
      expect(screen.queryByTestId('unit-card-unit2')).not.toBeInTheDocument();
      
      const grammarChip = screen.getAllByText('Grammar').find(el => 
        el.closest('button')?.className.includes('bg-coral-100')
      )?.closest('button');
      
      if (grammarChip) {
        fireEvent.click(grammarChip);
      }
      
      expect(screen.getByTestId('unit-card-unit1')).toBeInTheDocument();
      expect(screen.getByTestId('unit-card-unit2')).toBeInTheDocument();
      expect(screen.getByTestId('unit-card-unit30')).toBeInTheDocument();
    });

    it('should remove individual difficulty filter when chip is clicked', () => {
      render(<A1CourseSelector units={mockUnits} />);
      
      const filterButton = screen.getByLabelText(/toggle filters/i);
      fireEvent.click(filterButton);
      
      const difficulty3Button = screen.getByLabelText('Difficulty 3 stars');
      fireEvent.click(difficulty3Button);
      
      expect(screen.queryByTestId('unit-card-unit1')).not.toBeInTheDocument();
      
      const difficultyChips = screen.getByText('Active filters:').parentElement?.querySelectorAll('button');
      const difficulty3Chip = Array.from(difficultyChips || []).find(el => 
        el.className.includes('bg-amber-100')
      );
      
      if (difficulty3Chip) {
        fireEvent.click(difficulty3Chip);
      }
      
      expect(screen.getByTestId('unit-card-unit1')).toBeInTheDocument();
      expect(screen.getByTestId('unit-card-unit2')).toBeInTheDocument();
      expect(screen.getByTestId('unit-card-unit30')).toBeInTheDocument();
    });

    it('should clear all filters when "Clear all" button is clicked', () => {
      render(<A1CourseSelector units={mockUnits} />);
      
      const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
      fireEvent.change(searchInput, { target: { value: 'Airport' } });
      
      const filterButton = screen.getByLabelText(/toggle filters/i);
      fireEvent.click(filterButton);
      
      const grammarButton = screen.getByRole('button', { name: 'Grammar' });
      const difficulty1Button = screen.getByLabelText('Difficulty 1 stars');
      
      fireEvent.click(grammarButton);
      fireEvent.click(difficulty1Button);
      
      expect(screen.queryByTestId('unit-card-unit1')).not.toBeInTheDocument();
      
      const clearAllButtons = screen.getAllByRole('button', { name: /clear all/i });
      const clearAllButton = clearAllButtons[0];
      fireEvent.click(clearAllButton);
      
      expect(screen.getByTestId('unit-card-unit1')).toBeInTheDocument();
      expect(screen.getByTestId('unit-card-unit2')).toBeInTheDocument();
      expect(screen.getByTestId('unit-card-unit30')).toBeInTheDocument();
      expect((searchInput as HTMLInputElement).value).toBe('');
    });

    it('should show updated empty state message when filters are active', () => {
      render(<A1CourseSelector units={mockUnits} />);
      
      const searchInput = screen.getByPlaceholderText(/search by unit number or title/i);
      fireEvent.change(searchInput, { target: { value: 'xyz' } });
      
      expect(screen.getByText(/Try adjusting your filters or search query/i)).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should filter 60 units in less than 100ms', () => {
      const manyUnits: UnitMetadata[] = Array.from({ length: 60 }, (_, i) => ({
        unitId: `unit${i + 1}`,
        unitNumber: i + 1,
        title: `Unit ${i + 1}`,
        topics: i % 3 === 0 ? ['Grammar', 'Vocabulary'] : ['Listening', 'Reading'],
        exerciseCount: 15,
        exerciseBreakdown: {
          multiple_choice: 5,
          fill_in_the_blank: 4,
          matching: 3,
          drag_and_drop: 2,
          categorization: 1,
          short_answer: 0,
          audio_matching: 0,
          listening: 0,
          video_narrative: 0,
          flashcards: 0,
          other: 0,
          total: 15,
        },
        difficulty: (i % 5) + 1,
        estimatedDuration: 45,
      }));

      const startTime = performance.now();
      render(<A1CourseSelector units={manyUnits} />);
      
      const filterButton = screen.getByLabelText(/toggle filters/i);
      fireEvent.click(filterButton);
      
      const grammarButton = screen.getByRole('button', { name: 'Grammar' });
      fireEvent.click(grammarButton);
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      expect(duration).toBeLessThan(100);
    });
  });
});
