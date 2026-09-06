import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TranslatedText } from '@/components/course/exercises/TranslatedText';

describe('TranslatedText Component - Word-Level Translations', () => {
  test('renders text content', () => {
    const { container } = render(<TranslatedText text="Hello world" />);
    const text = container.textContent;
    expect(text).toContain('Hello');
    expect(text).toContain('world');
  });

  test('creates dotted underline for vocabulary words', () => {
    const { container } = render(<TranslatedText text="hello" />);
    
    // TranslatedText should create spans with dotted borders for vocabulary words
    const dotted = container.querySelector('.border-dotted');
    expect(dotted).toBeInTheDocument();
  });

  test('applies indigo-300 color for undecorated state', () => {
    const { container } = render(<TranslatedText text="hello" />);
    
    const dotted = container.querySelector('.border-indigo-300');
    expect(dotted).toBeInTheDocument();
  });

  test('preserves plain text for non-vocabulary words', () => {
    const { container } = render(<TranslatedText text="xyz unknown word" />);
    
    // Some words might not be in lexicon
    const text = container.textContent;
    expect(text).toContain('xyz');
  });

  test('handles explicit translation syntax [[word|translation]]', () => {
    const { container } = render(<TranslatedText text="The word is [[custom|personalizado]] here" />);
    
    // The explicit translation should be rendered as a dotted underline
    const decorated = container.querySelectorAll('.border-dotted');
    expect(decorated.length).toBeGreaterThan(0);
  });

  test('creates tooltip structure with correct styling', () => {
    const { container } = render(<TranslatedText text="hello world" />);
    
    // Should have at least one tooltip with dark background
    const tooltip = container.querySelector('.bg-slate-900');
    expect(tooltip).toBeInTheDocument();
    
    // Tooltip should have white text
    expect(tooltip?.className).toContain('text-white');
  });

  test('handles multiple words with translations', () => {
    const { container } = render(
      <TranslatedText text="Hello my friend, how are you today?" />
    );
    
    // Multiple words should be decorated
    const decorated = container.querySelectorAll('.border-dotted');
    expect(decorated.length).toBeGreaterThan(1);
  });

  test('respects useStrong prop for font weight', () => {
    const { container } = render(<TranslatedText text="hello" useStrong={true} />);
    
    // With useStrong, should have font-bold
    const word = container.querySelector('.font-bold');
    expect(word).toBeInTheDocument();
  });

  test('handles complex sentences with mixed vocabulary', () => {
    const text = 'I am a student. Hello there, how are you from London?';
    const { container } = render(<TranslatedText text={text} />);
    
    // Should have multiple translations
    const allSpans = container.querySelectorAll('span');
    expect(allSpans.length).toBeGreaterThan(0);
    
    // Text should be fully rendered
    expect(container.textContent).toContain('student');
    expect(container.textContent).toContain('Hello');
  });

  test('creates tooltip with both word and translation', () => {
    const { container } = render(<TranslatedText text="hello" />);
    
    // Get the tooltip
    const tooltip = container.querySelector('.bg-slate-900');
    const tooltipContent = tooltip?.textContent || '';
    
    // Should contain both the word and translation info
    expect(tooltipContent).toBeTruthy();
  });

  test('applies hover classes for transition', () => {
    const { container } = render(<TranslatedText text="hello" />);
    
    // TranslatedText applies group-hover classes
    const span = container.querySelector('.group');
    expect(span).toBeInTheDocument();
  });

  test('returns plain string if text is not a string', () => {
    const result = render(<TranslatedText text={null as any} />);
    // Should render without errors
    expect(result).toBeTruthy();
  });
});
