import type { FAQItem } from "@/lib/schemas";

export interface VoiceSearchSummary {
  question: string;
  answer: string;
}

function plainText(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getVoiceSearchSummary(
  faqs: FAQItem[] | undefined,
): VoiceSearchSummary | null {
  const faq = faqs?.find((item) => item?.question?.trim() && item?.answer?.trim());
  if (!faq) return null;

  const answer = plainText(faq.answer);
  const words = answer.split(/\s+/).filter(Boolean);
  if (words.length < 40) return null;

  return {
    question: plainText(faq.question),
    answer: words.slice(0, 60).join(" "),
  };
}
