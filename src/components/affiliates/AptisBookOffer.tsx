import { AmazonBookOffer } from "@/components/affiliates/AmazonBookOffer";
import { affiliateBookForSlug } from "@/lib/affiliates/for-article";

type AptisBookOfferProps = {
  variant?: "full" | "compact";
};

export function AptisBookOffer({ variant = "full" }: AptisBookOfferProps) {
  const book = affiliateBookForSlug("aptis-general-guia-completa");
  if (!book) return null;
  return <AmazonBookOffer book={book} variant={variant} />;
}
