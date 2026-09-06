import React from 'react';
import { render } from '@testing-library/react';
import CookiebotBannerVisibility from '@/components/CookiebotBannerVisibility';

jest.mock('@/lib/cookiebot-config', () => ({
  shouldLoadCookiebot: jest.fn(() => true),
}));

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

  it('no intenta mostrar el banner si el dominio no está autorizado', () => {
    const { shouldLoadCookiebot } = jest.requireMock('@/lib/cookiebot-config');
    shouldLoadCookiebot.mockReturnValueOnce(false);
    const show = jest.fn();
    window.Cookiebot = { hasResponse: false, show };

    render(<CookiebotBannerVisibility />);
    jest.advanceTimersByTime(2000);

    expect(show).not.toHaveBeenCalled();
  });
});
