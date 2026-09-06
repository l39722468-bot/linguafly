import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CelebrationModal from '@/components/course/CelebrationModal';

describe('CelebrationModal', () => {
  it('does not render when show is false', () => {
    const { container } = render(
      <CelebrationModal show={false} score={90} onClose={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  describe('language="en" (default)', () => {
    it('renders English title for score >= 90', () => {
      render(<CelebrationModal show={true} score={90} onClose={() => {}} />);
      expect(screen.getByText('Outstanding!')).toBeInTheDocument();
    });

    it('renders English continue button', () => {
      render(<CelebrationModal show={true} score={90} onClose={() => {}} />);
      expect(screen.getByText('Continue Learning →')).toBeInTheDocument();
    });

    it('renders English score label', () => {
      render(<CelebrationModal show={true} score={90} onClose={() => {}} />);
      expect(screen.getByText('Your Score')).toBeInTheDocument();
    });

    it('renders "Keep Practicing!" for score < 60', () => {
      render(<CelebrationModal show={true} score={50} onClose={() => {}} />);
      expect(screen.getByText('Keep Practicing!')).toBeInTheDocument();
    });
  });

  describe('language="es"', () => {
    it('renders Spanish title for score >= 90', () => {
      render(<CelebrationModal show={true} score={90} onClose={() => {}} language="es" />);
      expect(screen.getByText('¡Sobresaliente!')).toBeInTheDocument();
    });

    it('renders Spanish continue button', () => {
      render(<CelebrationModal show={true} score={90} onClose={() => {}} language="es" />);
      expect(screen.getByText('Continuar aprendiendo →')).toBeInTheDocument();
    });

    it('renders Spanish score label', () => {
      render(<CelebrationModal show={true} score={90} onClose={() => {}} language="es" />);
      expect(screen.getByText('Tu puntuación')).toBeInTheDocument();
    });

    it('renders "¡Muy bien!" for score 70-79', () => {
      render(<CelebrationModal show={true} score={75} onClose={() => {}} language="es" />);
      expect(screen.getByText('¡Muy bien!')).toBeInTheDocument();
    });

    it('renders "¡Excelente!" for score 80-89', () => {
      render(<CelebrationModal show={true} score={85} onClose={() => {}} language="es" />);
      expect(screen.getByText('¡Excelente!')).toBeInTheDocument();
    });

    it('renders "¡Sigue practicando!" for score < 60', () => {
      render(<CelebrationModal show={true} score={40} onClose={() => {}} language="es" />);
      expect(screen.getByText('¡Sigue practicando!')).toBeInTheDocument();
    });
  });

  it('calls onClose when button is clicked', () => {
    const onClose = jest.fn();
    render(<CelebrationModal show={true} score={90} onClose={onClose} />);
    fireEvent.click(screen.getByText('Continue Learning →'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
