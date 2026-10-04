import React from 'react';

interface JsonLdProps {
  data: any;
  /** Stable id used to deduplicate identical JSON-LD blocks. */
  jsonLdId?: string;
}

/**
 * A simple component to inject JSON-LD structured data into the page.
 *
 * Uses a stable `id` (when provided) so the deduplication script in
 * RootLayout can remove duplicate blocks rendered by the RSC payload
 * (known issue with OpenNext/Cloudflare + force-dynamic pages).
 */
export function JsonLd({ data, jsonLdId }: JsonLdProps) {
  if (!data) return null;

  const id = jsonLdId || (data && data['@type'] ? `jsonld-${String(data['@type']).toLowerCase()}` : undefined);

  return (
    <script
      type="application/ld+json"
      data-jsonld-id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
