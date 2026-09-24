export type AffiliateBookTone = "amber" | "sky" | "emerald";

export type AffiliateBook = {
  id: string;
  url: string;
  title: string;
  eyebrow: string;
  description: string;
  highlights: string[];
  tone: AffiliateBookTone;
};
