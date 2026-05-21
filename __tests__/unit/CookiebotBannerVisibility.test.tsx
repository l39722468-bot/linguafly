import React from 'react';
import { render } from '@testing-library/react';
import CookiebotBannerVisibility from '@/components/CookiebotBannerVisibility';

describe('CookiebotBannerVisibility', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    delete window.Cookiebot;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('muestra el banner cuando Cookiebot está listo sin consentimiento', () => {
    const show = jest.fn();
    window.Cookiebot = { hasResponse: false, show };

    render(<CookiebotBannerVisibility />);

    expect(show).toHaveBeenCalledTimes(1);
  });

  it('reintenta hasta que Cookiebot está disponible y luego muestra el banner', () => {
    const show = jest.fn();

    render(<CookiebotBannerVisibility />);

    expect(show).not.toHaveBeenCalled();

    window.Cookiebot = { hasResponse: false, show };
    jest.advanceTimersByTime(500);

    expect(show).toHaveBeenCalledTimes(1);
  });
});
