import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RepairModeBanner from '@/components/course/RepairModeBanner';

describe('RepairModeBanner', () => {
  it('renders banner text', () => {
    render(<RepairModeBanner remainingCount={3} />);
    expect(screen.getByText(/Modo Repaso/)).toBeInTheDocument();
    expect(screen.getByText(/revisando los ejercicios fallados/)).toBeInTheDocument();
  });

  it('shows count with plural form when remainingCount > 1', () => {
    render(<RepairModeBanner remainingCount={3} />);
    expect(screen.getByText('3 ejercicios pendientes')).toBeInTheDocument();
  });

  it('shows singular form when remainingCount is 1', () => {
    render(<RepairModeBanner remainingCount={1} />);
    expect(screen.getByText('1 ejercicio pendiente')).toBeInTheDocument();
  });

  it('shows 0 pending exercises correctly', () => {
    render(<RepairModeBanner remainingCount={0} />);
    expect(screen.getByText('0 ejercicios pendientes')).toBeInTheDocument();
  });

  it('has sticky positioning', () => {
    const { container } = render(<RepairModeBanner remainingCount={2} />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass('sticky');
  });
});
