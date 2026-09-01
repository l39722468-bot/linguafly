import React from 'react';
import { render, act } from '@testing-library/react';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const mockPageview = jest.fn();

jest.mock('@/lib/analytics', () => {
  const actual = jest.requireActual('@/lib/analytics');
  return {
    ...actual,
    pageview: (...args: unknown[]) => mockPageview(...args),
  };
});

jest.mock('next/script', () => ({
  __esModule: true,
  default: ({
    id,
    src,
    children,
  }: {
    id?: string;
    src?: string;
    children?: React.ReactNode;
  }) => (
    <script id={id} src={src} data-testid={id || 'gtag-src'}>
      {children}
    </script>
  ),
}));

let mockPathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

describe('GoogleAnalytics', () => {
  const originalIdle = window.requestIdleCallback;
  const originalGaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  beforeEach(() => {
    mockPageview.mockClear();
    mockPathname = '/';
    window.requestIdleCallback = ((cb: IdleRequestCallback) => {
      cb({ didTimeout: false, timeRemaining: () => 1 } as IdleDeadline);
      return 1;
    }) as typeof window.requestIdleCallback;
  });

  afterEach(() => {
    window.requestIdleCallback = originalIdle;
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalGaId;
  });

  it('does not inject gtag without a measurement id', () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = '';
    const { container } = render(<GoogleAnalytics />);
    expect(container.querySelector('script')).toBeNull();
  });

  it('loads gtag for the configured measurement id after idle', async () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-LINGUAFLY1';
    const view = render(<GoogleAnalytics />);

    await act(async () => undefined);

    const src = view.container.querySelector('script[src*="gtag/js"]');
    expect(src?.getAttribute('src')).toBe(
      'https://www.googletagmanager.com/gtag/js?id=G-LINGUAFLY1',
    );
    expect(view.container.querySelector('#google-analytics')?.textContent).toContain(
      "gtag('config','G-LINGUAFLY1'",
    );
    expect(view.container.querySelector('#google-analytics')?.textContent).toContain(
      'send_page_view:true',
    );
  });

  it('sends a single SPA pageview after the first route change', async () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-LINGUAFLY1';
    const view = render(<GoogleAnalytics />);

    await act(async () => undefined);
    expect(mockPageview).not.toHaveBeenCalled();

    mockPathname = '/blog';
    view.rerender(<GoogleAnalytics />);
    await act(async () => undefined);

    expect(mockPageview).toHaveBeenCalledTimes(1);
    expect(mockPageview).toHaveBeenCalledWith('/blog');
  });
});
