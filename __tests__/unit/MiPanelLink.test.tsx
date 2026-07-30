import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MiPanelLink } from '@/components/course/MiPanelLink';

jest.mock('next/link', () => {
  const MockNextLink = ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );

  MockNextLink.displayName = 'MockNextLink';
  return MockNextLink;
});

describe('MiPanelLink', () => {
  it('renders hero variant for course landing pages', () => {
    render(<MiPanelLink />);

    const link = screen.getByRole('link', { name: /ir a mi panel/i });
    expect(link).toHaveAttribute('href', '/mi-panel');
  });

  it('renders compact nav variant inside course units', () => {
    render(<MiPanelLink variant="nav" />);

    const link = screen.getByRole('link', { name: /mi panel/i });
    expect(link).toHaveAttribute('href', '/mi-panel');
  });

  it('renders outline variant on course index pages', () => {
    render(<MiPanelLink variant="outline" />);

    const link = screen.getByRole('link', { name: /volver a mi panel/i });
    expect(link).toHaveAttribute('href', '/mi-panel');
  });
});
