import React from 'react';
import { render, act } from '@testing-library/react';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { DEFAULT_GA_MEASUREMENT_ID, getGaTrackingId } from '@/lib/analytics';

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
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-ZNL3VGHK2E';
    const { container } = render(<GoogleAnalytics />);
    expect(container.querySelector('script')).toBeNull();
  });

  it('sends a single SPA pageview after the first route change', async () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-ZNL3VGHK2E';
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

describe('getGaTrackingId', () => {
  const originalGaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  afterEach(() => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalGaId;
  });

  it('uses the Linguafly tag G-ZNL3VGHK2E by default', () => {
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    expect(getGaTrackingId()).toBe('G-ZNL3VGHK2E');
    expect(DEFAULT_GA_MEASUREMENT_ID).toBe('G-ZNL3VGHK2E');
  });

  it('ignores superseded Focus English and G-845 ids', () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TNTG3MJ3TL';
    expect(getGaTrackingId()).toBe('G-ZNL3VGHK2E');

    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-845LV77ZG9';
    expect(getGaTrackingId()).toBe('G-ZNL3VGHK2E');
  });

  it('ignores the truncated Linguafly id G-ZNL3VGHK2 (missing trailing E)', () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-ZNL3VGHK2';
    expect(getGaTrackingId()).toBe('G-ZNL3VGHK2E');
  });

    it('disables tracking when the env id is an empty string', () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = '';
      expect(getGaTrackingId()).toBeUndefined();
    });

    it('usa el ID por defecto si el env es el literal "undefined"', () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'undefined';
      expect(getGaTrackingId()).toBe('G-ZNL3VGHK2E');
    });
});
