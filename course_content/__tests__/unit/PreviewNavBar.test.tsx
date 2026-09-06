import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PreviewNavBar } from '@/components/course/preview/PreviewNavBar';
import { UnitMetadata } from '@/types/premium-course';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

const mockUnits: UnitMetadata[] = [
  {
    unitId: 'unit1',
    unitNumber: 1,
    title: 'Welcome to London',
    topics: ['Vocabulary'],
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
    topics: ['Vocabulary'],
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
    unitId: 'unit3',
    unitNumber: 3,
    title: 'Getting Around',
    topics: ['Vocabulary'],
    exerciseCount: 14,
    exerciseBreakdown: {
      multiple_choice: 5,
      fill_in_the_blank: 4,
      matching: 3,
      drag_and_drop: 1,
      categorization: 1,
      short_answer: 0,
      audio_matching: 0,
      listening: 0,
      video_narrative: 0,
      flashcards: 0,
      other: 0,
      total: 14,
    },
    difficulty: 1,
    estimatedDuration: 42,
  },
];

describe('PreviewNavBar', () => {
  it('should render breadcrumbs with home link', () => {
    render(<PreviewNavBar currentUnitId="unit1" allUnits={mockUnits} />);
    
    const homeLinks = screen.getAllByRole('link');
    const homeLink = homeLinks.find(link => link.getAttribute('href') === '/');
    expect(homeLink).toBeInTheDocument();
  });

  it('should render course link in breadcrumbs', () => {
    render(<PreviewNavBar currentUnitId="unit1" allUnits={mockUnits} />);
    
    const courseLink = screen.getByText('A1 Course');
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute('href', '/debug/a1-preview');
  });

  it('should display current unit number and title', () => {
    render(<PreviewNavBar currentUnitId="unit1" allUnits={mockUnits} />);
    
    expect(screen.getByText(/Unit 1/)).toBeInTheDocument();
    expect(screen.getByText(/Welcome to London/)).toBeInTheDocument();
  });

  it('should open dropdown when unit button is clicked', () => {
    render(<PreviewNavBar currentUnitId="unit1" allUnits={mockUnits} />);
    
    const unitButton = screen.getByLabelText('Select unit');
    fireEvent.click(unitButton);
    
    expect(screen.getByText('At the Airport')).toBeInTheDocument();
    expect(screen.getByText('Getting Around')).toBeInTheDocument();
  });

  it('should populate dropdown with all units', () => {
    render(<PreviewNavBar currentUnitId="unit1" allUnits={mockUnits} />);
    
    const unitButton = screen.getByLabelText('Select unit');
    fireEvent.click(unitButton);
    
    expect(screen.getByText('Welcome to London')).toBeInTheDocument();
    expect(screen.getByText('At the Airport')).toBeInTheDocument();
    expect(screen.getByText('Getting Around')).toBeInTheDocument();
  });

  it('should show exercise count and duration in dropdown items', () => {
    render(<PreviewNavBar currentUnitId="unit1" allUnits={mockUnits} />);
    
    const unitButton = screen.getByLabelText('Select unit');
    fireEvent.click(unitButton);
    
    expect(screen.getByText('15 exercises • 45 min')).toBeInTheDocument();
    expect(screen.getByText('12 exercises • 40 min')).toBeInTheDocument();
    expect(screen.getByText('14 exercises • 42 min')).toBeInTheDocument();
  });

  it('should highlight current unit in dropdown', () => {
    render(<PreviewNavBar currentUnitId="unit2" allUnits={mockUnits} />);
    
    const unitButton = screen.getByLabelText('Select unit');
    fireEvent.click(unitButton);
    
    const currentUnitButton = screen.getByText('At the Airport').closest('button');
    expect(currentUnitButton).toHaveClass('bg-coral-50');
  });

  it('should close dropdown when clicking outside', async () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <PreviewNavBar currentUnitId="unit1" allUnits={mockUnits} />
      </div>
    );
    
    const unitButton = screen.getByLabelText('Select unit');
    fireEvent.click(unitButton);
    
    expect(screen.getByText('At the Airport')).toBeInTheDocument();
    
    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);
    
    await waitFor(() => {
      expect(screen.queryByText('At the Airport')).not.toBeInTheDocument();
    });
  });

  it('should enable previous button when not on first unit', () => {
    render(<PreviewNavBar currentUnitId="unit2" allUnits={mockUnits} />);
    
    const prevButton = screen.getByLabelText('Previous unit');
    expect(prevButton).not.toBeDisabled();
  });

  it('should disable previous button on first unit', () => {
    render(<PreviewNavBar currentUnitId="unit1" allUnits={mockUnits} />);
    
    const prevButton = screen.getByLabelText('Previous unit');
    expect(prevButton).toBeDisabled();
  });

  it('should enable next button when not on last unit', () => {
    render(<PreviewNavBar currentUnitId="unit1" allUnits={mockUnits} />);
    
    const nextButton = screen.getByLabelText('Next unit');
    expect(nextButton).not.toBeDisabled();
  });

  it('should disable next button on last unit', () => {
    render(<PreviewNavBar currentUnitId="unit3" allUnits={mockUnits} />);
    
    const nextButton = screen.getByLabelText('Next unit');
    expect(nextButton).toBeDisabled();
  });

  it('should display current progress when provided', () => {
    render(
      <PreviewNavBar
        currentUnitId="unit1"
        allUnits={mockUnits}
        currentProgress={{ current: 5, total: 15 }}
      />
    );
    
    expect(screen.getByText('Exercise 5 of 15')).toBeInTheDocument();
  });

  it('should not display progress when not provided', () => {
    render(<PreviewNavBar currentUnitId="unit1" allUnits={mockUnits} />);
    
    expect(screen.queryByText(/Exercise/)).not.toBeInTheDocument();
  });

  it('should use custom baseUrl when provided', () => {
    render(
      <PreviewNavBar
        currentUnitId="unit1"
        allUnits={mockUnits}
        baseUrl="/preview/ingles-a1-narrative"
      />
    );
    
    const courseLink = screen.getByText('A1 Course');
    expect(courseLink).toHaveAttribute('href', '/preview/ingles-a1-narrative');
  });

  it('should handle single unit array', () => {
    const singleUnit = [mockUnits[0]];
    render(<PreviewNavBar currentUnitId="unit1" allUnits={singleUnit} />);
    
    const prevButton = screen.getByLabelText('Previous unit');
    const nextButton = screen.getByLabelText('Next unit');
    
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('should handle unknown current unit gracefully', () => {
    render(<PreviewNavBar currentUnitId="nonexistent" allUnits={mockUnits} />);
    
    expect(screen.getByText(/Unit \?/)).toBeInTheDocument();
  });
});
