import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import UspapiLocator from '@/components/UspapiLocator';

describe('UspapiLocator', () => {
  it('renders the uspapi bootstrap before Cookiebot loads', () => {
    const html = renderToStaticMarkup(<UspapiLocator />);

    expect(html).toContain('id="UspapiLocator"');
    expect(html).toContain('window.__uspapi=function');
    expect(html).toContain("__uspapiLocator");
    expect(html).toContain("uspString:'1---'");
    expect(html).toContain("aria-hidden");
  });
});
