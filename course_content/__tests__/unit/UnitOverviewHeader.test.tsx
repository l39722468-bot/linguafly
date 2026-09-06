import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UnitOverviewHeader } from '@/components/course/preview/UnitOverviewHeader';
import { UnitMetadata } from '@/types/premium-course';

const mockUnit: UnitMetadata = {
  unitId: 'unit1',
  unitNumber: 1,
  title: 'Welcome to London',
  topics: ['Vocabulary', 'Grammar', 'Reading'],
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
  learningOutcomes: [
    'Identify airport essentials',
    'Master basic greetings',
    'Understand arrival procedures',
  ],
  masteryTags: ['vocabulary:airport', 'grammar:greetings'],
};

describe('UnitOverviewHeader', () => {
  it('should render unit title and number', () => {
    render(<UnitOverviewHeader unit={mockUnit} />);
    
    expect(screen.getByText('Welcome to London')).toBeInTheDocument();
    expect(screen.getByText('Unit 1')).toBeInTheDocument();
  });

  it('should display estimated duration', () => {
    render(<UnitOverviewHeader unit={mockUnit} />);
    
    expect(screen.getByText(/45 minutes/i)).toBeInTheDocument();
  });

  it('should display exercise count', () => {
    render(<UnitOverviewHeader unit={mockUnit} />);
    
    expect(screen.getByText(/15 exercises/i)).toBeInTheDocument();
  });

  it('should render learning outcomes section', () => {
    render(<UnitOverviewHeader unit={mockUnit} />);
    
    expect(screen.getByText('Learning Outcomes')).toBeInTheDocument();
    expect(screen.getByText('Identify airport essentials')).toBeInTheDocument();
    expect(screen.getByText('Master basic greetings')).toBeInTheDocument();
    expect(screen.getByText('Understand arrival procedures')).toBeInTheDocument();
  });

  it('should render topics covered section', () => {
    render(<UnitOverviewHeader unit={mockUnit} />);
    
    expect(screen.getByText('Topics Covered')).toBeInTheDocument();
    expect(screen.getByText('Vocabulary')).toBeInTheDocument();
    expect(screen.getByText('Grammar')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
  });

  it('should display exercise type breakdown', () => {
    render(<UnitOverviewHeader unit={mockUnit} />);
    
    expect(screen.getByText('Exercise Types')).toBeInTheDocument();
    expect(screen.getByText('Multiple Choice')).toBeInTheDocument();
    expect(screen.getByText('Fill in the Blank')).toBeInTheDocument();
    expect(screen.getByText('Matching')).toBeInTheDocument();
    expect(screen.getByText('Drag & Drop')).toBeInTheDocument();
    expect(screen.getByText('Categorization')).toBeInTheDocument();
  });

  it('should show correct counts for each exercise type', () => {
    render(<UnitOverviewHeader unit={mockUnit} />);
    
    const exerciseTypesSection = screen.getByText('Exercise Types').parentElement;
    expect(exerciseTypesSection).toHaveTextContent('5');
    expect(exerciseTypesSection).toHaveTextContent('4');
    expect(exerciseTypesSection).toHaveTextContent('3');
    expect(exerciseTypesSection).toHaveTextContent('2');
    expect(exerciseTypesSection).toHaveTextContent('1');
  });

  it('should handle missing learning outcomes gracefully', () => {
    const unitWithoutOutcomes = { ...mockUnit, learningOutcomes: undefined };
    render(<UnitOverviewHeader unit={unitWithoutOutcomes} />);
    
    expect(screen.queryByText('Learning Outcomes')).not.toBeInTheDocument();
    expect(screen.getByText('Welcome to London')).toBeInTheDocument();
  });

  it('should handle empty learning outcomes array', () => {
    const unitWithEmptyOutcomes = { ...mockUnit, learningOutcomes: [] };
    render(<UnitOverviewHeader unit={unitWithEmptyOutcomes} />);
    
    expect(screen.queryByText('Learning Outcomes')).not.toBeInTheDocument();
  });

  it('should handle empty topics array', () => {
    const unitWithoutTopics = { ...mockUnit, topics: [] };
    render(<UnitOverviewHeader unit={unitWithoutTopics} />);
    
    expect(screen.queryByText('Topics Covered')).not.toBeInTheDocument();
    expect(screen.getByText('Welcome to London')).toBeInTheDocument();
  });

  it('should only display exercise types with count > 0', () => {
    render(<UnitOverviewHeader unit={mockUnit} />);
    
    expect(screen.queryByText('Short Answer')).not.toBeInTheDocument();
    expect(screen.queryByText('Audio Matching')).not.toBeInTheDocument();
    expect(screen.queryByText('Listening')).not.toBeInTheDocument();
  });

  it('should display all exercise types when all have count > 0', () => {
    const unitWithAllTypes: UnitMetadata = {
      ...mockUnit,
      exerciseBreakdown: {
        multiple_choice: 1,
        fill_in_the_blank: 1,
        matching: 1,
        drag_and_drop: 1,
        categorization: 1,
        short_answer: 1,
        audio_matching: 1,
        listening: 1,
        video_narrative: 1,
        flashcards: 1,
        other: 1,
        total: 11,
      },
    };

    render(<UnitOverviewHeader unit={unitWithAllTypes} />);
    
    expect(screen.getByText('Multiple Choice')).toBeInTheDocument();
    expect(screen.getByText('Fill in the Blank')).toBeInTheDocument();
    expect(screen.getByText('Matching')).toBeInTheDocument();
    expect(screen.getByText('Drag & Drop')).toBeInTheDocument();
    expect(screen.getByText('Categorization')).toBeInTheDocument();
    expect(screen.getByText('Short Answer')).toBeInTheDocument();
    expect(screen.getByText('Audio Matching')).toBeInTheDocument();
    expect(screen.getByText('Listening')).toBeInTheDocument();
    expect(screen.getByText('Video Narrative')).toBeInTheDocument();
    expect(screen.getByText('Flashcards')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('should render with different unit numbers', () => {
    const unit30 = { ...mockUnit, unitNumber: 30, unitId: 'unit30' };
    render(<UnitOverviewHeader unit={unit30} />);
    
    expect(screen.getByText('Unit 30')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('should handle long unit titles', () => {
    const unitWithLongTitle = {
      ...mockUnit,
      title: 'A Very Long Unit Title That Describes Complex Topics in Great Detail',
    };
    render(<UnitOverviewHeader unit={unitWithLongTitle} />);
    
    expect(
      screen.getByText('A Very Long Unit Title That Describes Complex Topics in Great Detail')
    ).toBeInTheDocument();
  });

  it('should handle multiple learning outcomes', () => {
    const unitWithManyOutcomes = {
      ...mockUnit,
      learningOutcomes: [
        'Outcome 1',
        'Outcome 2',
        'Outcome 3',
        'Outcome 4',
        'Outcome 5',
      ],
    };
    render(<UnitOverviewHeader unit={unitWithManyOutcomes} />);
    
    expect(screen.getByText('Outcome 1')).toBeInTheDocument();
    expect(screen.getByText('Outcome 5')).toBeInTheDocument();
  });
});
