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

let mockPathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

describe('GoogleAnalytics', () => {
  const originalGaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  beforeEach(() => {
    mockPageview.mockClear();
    mockPathname = '/';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalGaId;
  });

  it('does not inject a second Google tag (gtag lives in <head>)', () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-845LV77ZG9';
    const { container } = render(<GoogleAnalytics />);
    expect(container.querySelector('script')).toBeNull();
  });

  it('sends a single SPA pageview after the first route change', async () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-845LV77ZG9';
    window.gtag = jest.fn();
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
