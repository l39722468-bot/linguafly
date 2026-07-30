import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MiPanelLink } from '@/components/course/MiPanelLink';

const mockUseUser = jest.fn();
const mockUseSearchParams = jest.fn();

jest.mock('@/hooks/useAuth', () => ({
  useUser: () => mockUseUser(),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: () => mockUseSearchParams(),
}));

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
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  it('renders hero variant for authenticated users on course landing pages', () => {
    render(<MiPanelLink />);

    const link = screen.getByRole('link', { name: /ir a mi panel/i });
    expect(link).toHaveAttribute('href', '/mi-panel');
  });

  it('renders compact nav variant inside course units for authenticated users', () => {
    render(<MiPanelLink variant="nav" />);

    const link = screen.getByRole('link', { name: /mi panel/i });
    expect(link).toHaveAttribute('href', '/mi-panel');
  });

  it('renders outline variant on course index pages for authenticated users', () => {
    render(<MiPanelLink variant="outline" />);

    const link = screen.getByRole('link', { name: /volver a mi panel/i });
    expect(link).toHaveAttribute('href', '/mi-panel');
  });

  it('shows back-to-article link for guests arriving from a blog article', () => {
    mockUseUser.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams('fromArticle=%2Fblog%2Fgramatica%2Fvoz-pasiva-ingles-guia'),
    );

    render(<MiPanelLink variant="nav" />);

    const link = screen.getByRole('link', { name: /volver al artículo/i });
    expect(link).toHaveAttribute('href', '/blog/gramatica/voz-pasiva-ingles-guia');
    expect(screen.queryByRole('link', { name: /mi panel/i })).not.toBeInTheDocument();
  });

  it('hides panel link for guests without article return context', () => {
    mockUseUser.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    const { container } = render(<MiPanelLink variant="nav" />);
    expect(container).toBeEmptyDOMElement();
  });
});
