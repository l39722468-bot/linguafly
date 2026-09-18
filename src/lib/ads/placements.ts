import { ADSENSE_CLIENT_ID } from "@/lib/marketing-consent";

export const AD_PLACEMENTS = [
  "leaderboard",
  "in-article",
  "sidebar",
  "feed",
] as const;

export type AdPlacement = (typeof AD_PLACEMENTS)[number];

export type AdPlacementConfig = {
  placement: AdPlacement;
  label: string;
  slot: string;
  format: "auto" | "fluid";
  layout?: "in-article";
  responsive: boolean;
  minHeight: number;
};

const SLOT_ENV: Record<AdPlacement, string | undefined> = {
  leaderboard: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD,
  "in-article": process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
  feed: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FEED,
};

export function getAdPlacement(placement: AdPlacement): AdPlacementConfig {
  const slot = SLOT_ENV[placement]?.trim() || "";
  if (placement === "in-article") {
    return {
      placement,
      label: "Publicidad",
      slot,
      format: "fluid",
      layout: "in-article",
      responsive: false,
      minHeight: 280,
    };
  }

  return {
    placement,
    label: "Publicidad",
    slot,
    format: "auto",
    responsive: true,
    minHeight: placement === "sidebar" ? 280 : 90,
  };
}

export function getAdSenseClientId(): string {
  return ADSENSE_CLIENT_ID;
}

/**
 * Fill real AdSense units in production, or when explicitly enabled.
 * Local/dev keeps the labeled reserved slot so layout can be verified
 * without hitting the live ad network.
 */
export function shouldFillAdSlots(): boolean {
  if (process.env.NEXT_PUBLIC_ADSENSE_FILL === "0") return false;
  if (process.env.NEXT_PUBLIC_ADSENSE_FILL === "1") return true;
  return process.env.NODE_ENV === "production";
}
