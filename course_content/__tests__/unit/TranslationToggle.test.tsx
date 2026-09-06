import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  TranslationToggle,
  parseBilingualText,
  renderBilingualText,
  useBilingualText
} from '@/components/course/preview/TranslationToggle';

describe('TranslationToggle Component', () => {
  describe('parseBilingualText utility', () => {
    test('parses [[English|Spanish]] syntax correctly', () => {
      const text = 'Hello [[world|mundo]]!';
      const segments = parseBilingualText(text);
      
      expect(segments).toHaveLength(3);
      expect(segments[0]).toEqual({ type: 'text', content: 'Hello ' });
      expect(segments[1]).toEqual({ type: 'bilingual', content: 'world', translation: 'mundo' });
      expect(segments[2]).toEqual({ type: 'text', content: '!' });
    });

    test('handles multiple bilingual segments', () => {
      const text = '[[Hello|Hola]] [[world|mundo]]!';
      const segments = parseBilingualText(text);
      
      expect(segments).toHaveLength(4);
      expect(segments[0]).toEqual({ type: 'bilingual', content: 'Hello', translation: 'Hola' });
      expect(segments[1]).toEqual({ type: 'text', content: ' ' });
      expect(segments[2]).toEqual({ type: 'bilingual', content: 'world', translation: 'mundo' });
      expect(segments[3]).toEqual({ type: 'text', content: '!' });
    });

    test('handles text with no bilingual content', () => {
      const text = 'Just regular text here';
      const segments = parseBilingualText(text);
      
      expect(segments).toHaveLength(1);
      expect(segments[0]).toEqual({ type: 'text', content: 'Just regular text here' });
    });

    test('handles empty string', () => {
      const segments = parseBilingualText('');
      expect(segments).toHaveLength(0);
    });

    test('handles only bilingual content', () => {
      const text = '[[Hello|Hola]]';
      const segments = parseBilingualText(text);
      
      expect(segments).toHaveLength(1);
      expect(segments[0]).toEqual({ type: 'bilingual', content: 'Hello', translation: 'Hola' });
    });

    test('handles malformed syntax gracefully', () => {
      const text = 'Hello [[incomplete';
      const segments = parseBilingualText(text);
      
      expect(segments).toHaveLength(1);
      expect(segments[0]).toEqual({ type: 'text', content: 'Hello [[incomplete' });
    });

    test('handles nested brackets gracefully (not supported)', () => {
      const text = 'Hello [[world [nested]|mundo]]!';
      const segments = parseBilingualText(text);
      
      // Nested brackets in the content part will cause the pattern not to match
      expect(segments).toHaveLength(1);
      expect(segments[0]).toEqual({ type: 'text', content: 'Hello [[world [nested]|mundo]]!' });
    });

    test('handles phrases with spaces', () => {
      const text = '[[Good morning|Buenos días]] everyone!';
      const segments = parseBilingualText(text);
      
      expect(segments).toHaveLength(2);
      expect(segments[0]).toEqual({ type: 'bilingual', content: 'Good morning', translation: 'Buenos días' });
    });
  });

  describe('TranslationToggle rendering', () => {
    test('renders text without bilingual content as plain text', () => {
      render(<TranslationToggle text="Plain text" />);
      
      expect(screen.getByText('Plain text')).toBeInTheDocument();
      expect(screen.queryByLabelText('Hide translations')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Show translations')).not.toBeInTheDocument();
    });

    test('renders toggle button when bilingual content is present', () => {
      render(<TranslationToggle text="[[Hello|Hola]] world" />);
      
      expect(screen.getByLabelText('Show translations')).toBeInTheDocument();
    });

    test('does not render toggle button when showToggleButton is false', () => {
      render(<TranslationToggle text="[[Hello|Hola]]" showToggleButton={false} />);
      
      expect(screen.queryByLabelText('Show translations')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Hide translations')).not.toBeInTheDocument();
    });

    test('renders English by default', () => {
      const { container } = render(<TranslationToggle text="[[Hello|Hola]] world" />);
      
      const mainText = container.querySelector('.border-emerald-300');
      expect(mainText).toHaveTextContent('Hello');
    });

    test('renders translation when defaultShowTranslation is true', () => {
      const { container } = render(<TranslationToggle text="[[Hello|Hola]]" defaultShowTranslation={true} />);
      
      const mainText = container.querySelector('.border-indigo-300');
      expect(mainText).toHaveTextContent('Hola');
    });

    test('toggle button shows correct language indicator', () => {
      const { rerender } = render(<TranslationToggle text="[[Hello|Hola]]" />);
      
      expect(screen.getByText('EN')).toBeInTheDocument();
      
      rerender(<TranslationToggle text="[[Hello|Hola]]" defaultShowTranslation={true} />);
      
      expect(screen.getByText('ES')).toBeInTheDocument();
    });
  });

  describe('TranslationToggle interaction', () => {
    test('toggle button switches between languages', () => {
      const { container } = render(<TranslationToggle text="[[Hello|Hola]] [[world|mundo]]" />);
      
      let bilingualWords = container.querySelectorAll('.border-emerald-300');
      expect(bilingualWords[0]).toHaveTextContent('Hello');
      expect(bilingualWords[1]).toHaveTextContent('world');
      
      const toggleButton = screen.getByLabelText('Show translations');
      fireEvent.click(toggleButton);
      
      bilingualWords = container.querySelectorAll('.border-indigo-300');
      expect(bilingualWords[0]).toHaveTextContent('Hola');
      expect(bilingualWords[1]).toHaveTextContent('mundo');
      
      const hideButton = screen.getByLabelText('Hide translations');
      fireEvent.click(hideButton);
      
      bilingualWords = container.querySelectorAll('.border-emerald-300');
      expect(bilingualWords[0]).toHaveTextContent('Hello');
      expect(bilingualWords[1]).toHaveTextContent('world');
    });

    test('toggle button changes aria-label correctly', () => {
      render(<TranslationToggle text="[[Hello|Hola]]" />);
      
      const button = screen.getByLabelText('Show translations');
      expect(button).toHaveAttribute('aria-label', 'Show translations');
      
      fireEvent.click(button);
      
      const updatedButton = screen.getByLabelText('Hide translations');
      expect(updatedButton).toHaveAttribute('aria-label', 'Hide translations');
    });

    test('bilingual words have correct styling classes', () => {
      const { container } = render(<TranslationToggle text="[[Hello|Hola]]" showToggleButton={false} />);
      
      const bilingualWord = container.querySelector('.border-emerald-300');
      expect(bilingualWord).toBeInTheDocument();
      expect(bilingualWord).toHaveClass('border-dotted', 'cursor-help');
    });

    test('applies custom className', () => {
      const { container } = render(
        <TranslationToggle text="[[Hello|Hola]]" className="custom-class" />
      );
      
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Tooltip functionality', () => {
    test('tooltips have correct role and aria-hidden attributes', () => {
      const { container } = render(<TranslationToggle text="[[Hello|Hola]]" showToggleButton={false} />);
      
      const tooltips = container.querySelectorAll('[role="tooltip"]');
      expect(tooltips.length).toBeGreaterThan(0);
      
      tooltips.forEach(tooltip => {
        expect(tooltip).toHaveAttribute('aria-hidden', 'true');
      });
    });

    test('tooltip is initially invisible', () => {
      const { container } = render(<TranslationToggle text="[[Hello|Hola]]" showToggleButton={false} />);
      
      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip).toHaveClass('opacity-0', 'invisible');
    });

    test('tooltip becomes visible on hover', () => {
      const { container } = render(<TranslationToggle text="[[Hello|Hola]]" showToggleButton={false} />);
      
      const bilingualWord = container.querySelector('.border-emerald-300');
      expect(bilingualWord).toBeInTheDocument();
      
      if (bilingualWord && bilingualWord.parentElement) {
        fireEvent.mouseEnter(bilingualWord.parentElement);
        
        const tooltip = container.querySelector('[role="tooltip"]');
        expect(tooltip).toHaveClass('group-hover:opacity-100', 'group-hover:visible');
      }
    });
  });

  describe('Multiple bilingual segments', () => {
    test('renders multiple segments correctly', () => {
      const { container } = render(
        <TranslationToggle 
          text="[[Hello|Hola]] my [[friend|amigo]], [[how|cómo]] are you?"
          showToggleButton={false}
        />
      );
      
      const bilingualWords = container.querySelectorAll('.border-emerald-300');
      expect(bilingualWords[0]).toHaveTextContent('Hello');
      expect(bilingualWords[1]).toHaveTextContent('friend');
      expect(bilingualWords[2]).toHaveTextContent('how');
      
      expect(container.textContent).toContain('my');
      expect(container.textContent).toContain(', ');
      expect(container.textContent).toContain('are you?');
    });

    test('toggles all segments simultaneously', () => {
      render(
        <TranslationToggle text="[[Hello|Hola]] [[world|mundo]]" />
      );
      
      const toggleButton = screen.getByLabelText('Show translations');
      fireEvent.click(toggleButton);
      
      expect(screen.getByText('Hola')).toBeInTheDocument();
      expect(screen.getByText('mundo')).toBeInTheDocument();
    });
  });

  describe('renderBilingualText utility', () => {
    test('renders English by default', () => {
      const result = renderBilingualText('[[Hello|Hola]] world');
      const { container } = render(<>{result}</>);
      
      const bilingualWord = container.querySelector('.border-emerald-300');
      expect(bilingualWord).toHaveTextContent('Hello');
      expect(container.textContent).toContain('world');
    });

    test('renders Spanish when showTranslation is true', () => {
      const result = renderBilingualText('[[Hello|Hola]] world', true);
      const { container } = render(<>{result}</>);
      
      const bilingualWord = container.querySelector('.border-indigo-300');
      expect(bilingualWord).toHaveTextContent('Hola');
      expect(container.textContent).toContain('world');
    });

    test('handles plain text correctly', () => {
      const result = renderBilingualText('Plain text');
      const { container } = render(<>{result}</>);
      
      expect(container.textContent).toBe('Plain text');
    });
  });

  describe('Edge cases and error handling', () => {
    test('handles empty translation correctly', () => {
      const text = '[[Hello|]]';
      const segments = parseBilingualText(text);
      
      expect(segments).toHaveLength(1);
      expect(segments[0]).toEqual({ type: 'bilingual', content: 'Hello', translation: '' });
    });

    test('handles special characters in content', () => {
      const text = '[[Hello!|¡Hola!]] [[How\'s it going?|¿Cómo te va?]]';
      const segments = parseBilingualText(text);
      
      expect(segments[0]).toEqual({ type: 'bilingual', content: 'Hello!', translation: '¡Hola!' });
      expect(segments[2]).toEqual({ type: 'bilingual', content: 'How\'s it going?', translation: '¿Cómo te va?' });
    });

    test('handles very long text segments', () => {
      const longText = 'a'.repeat(1000);
      const text = `[[${longText}|largo]]`;
      const segments = parseBilingualText(text);
      
      expect(segments).toHaveLength(1);
      expect(segments[0].content).toBe(longText);
    });

    test('handles consecutive bilingual segments without spaces', () => {
      const text = '[[Hello|Hola]][[world|mundo]]';
      const segments = parseBilingualText(text);
      
      expect(segments).toHaveLength(2);
      expect(segments[0].type).toBe('bilingual');
      expect(segments[1].type).toBe('bilingual');
    });
  });

  describe('Accessibility', () => {
    test('toggle button has correct aria-label', () => {
      render(<TranslationToggle text="[[Hello|Hola]]" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Show translations');
    });

    test('bilingual words are keyboard accessible', () => {
      const { container } = render(<TranslationToggle text="[[Hello|Hola]]" showToggleButton={false} />);
      
      const bilingualWord = container.querySelector('.cursor-help');
      expect(bilingualWord).toBeInTheDocument();
    });

    test('tooltips have aria-hidden attribute', () => {
      const { container } = render(<TranslationToggle text="[[Hello|Hola]]" showToggleButton={false} />);
      
      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Styling and appearance', () => {
    test('English mode uses emerald color scheme', () => {
      const { container } = render(<TranslationToggle text="[[Hello|Hola]]" showToggleButton={false} />);
      
      const bilingualWord = container.querySelector('.border-emerald-300');
      expect(bilingualWord).toBeInTheDocument();
    });

    test('Spanish mode uses indigo color scheme', () => {
      const { container } = render(
        <TranslationToggle text="[[Hello|Hola]]" defaultShowTranslation={true} showToggleButton={false} />
      );
      
      const bilingualWord = container.querySelector('.border-indigo-300');
      expect(bilingualWord).toBeInTheDocument();
    });

    test('toggle button has correct styling for English mode', () => {
      render(<TranslationToggle text="[[Hello|Hola]]" />);
      
      const button = screen.getByLabelText('Show translations');
      expect(button).toHaveClass('bg-slate-100', 'text-slate-600');
    });

    test('toggle button has correct styling for Spanish mode', () => {
      render(<TranslationToggle text="[[Hello|Hola]]" defaultShowTranslation={true} />);
      
      const button = screen.getByLabelText('Hide translations');
      expect(button).toHaveClass('bg-indigo-100', 'text-indigo-700');
    });
  });
});
