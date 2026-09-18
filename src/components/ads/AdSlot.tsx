"use client";

import { useEffect, useId, useRef } from "react";
import {
  getAdPlacement,
  getAdSenseClientId,
  shouldFillAdSlots,
  type AdPlacement,
} from "@/lib/ads/placements";
import {
  loadAdSenseScript,
  runWithMarketingConsent,
} from "@/lib/marketing-consent";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const SIZE_CLASS: Record<AdPlacement, string> = {
  leaderboard: "min-h-[90px] md:min-h-[110px]",
  "in-article": "min-h-[280px]",
  sidebar: "min-h-[280px]",
  feed: "min-h-[120px]",
};

export function AdSlot({
  placement,
  className = "",
}: {
  placement: AdPlacement;
  className?: string;
}) {
  const config = getAdPlacement(placement);
  const slotId = useId();
  const pushed = useRef(false);

  useEffect(() => {
    if (!shouldFillAdSlots()) return undefined;

    return runWithMarketingConsent(() => {
      loadAdSenseScript();
      if (pushed.current) return;
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushed.current = true;
      } catch {
        // AdSense may throw if the slot was already filled.
      }
    });
  }, []);

  return (
    <aside
      className={`print-hidden rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-3 py-3 ${className}`}
      aria-label={config.label}
      data-ad-placement={placement}
    >
      <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        {config.label}
      </p>
      {shouldFillAdSlots() ? (
        <ins
          className={`adsbygoogle block w-full ${SIZE_CLASS[placement]}`}
          style={{ display: "block", minHeight: config.minHeight }}
          data-ad-client={getAdSenseClientId()}
          data-ad-slot={config.slot || undefined}
          data-ad-format={config.format}
          data-ad-layout={config.layout}
          data-full-width-responsive={config.responsive ? "true" : undefined}
          data-ad-slot-id={slotId}
        />
      ) : (
        <div
          className={`flex ${SIZE_CLASS[placement]} items-center justify-center text-xs font-medium text-slate-400`}
        >
          Espacio publicitario · {placement}
        </div>
      )}
    </aside>
  );
}
