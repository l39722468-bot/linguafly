export type AffiliateBookTone = "amber" | "sky";

export type AffiliateBook = {
  id: string;
  url: string;
  title: string;
  eyebrow: string;
  description: string;
  highlights: string[];
  tone: AffiliateBookTone;
};
