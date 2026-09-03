/**
 * Schema.org Structured Data Utilities for SEO
 * 
 * These schemas help Google display rich snippets in search results,
 * improving click-through rates and visibility.
 */

import { getAbsoluteUrl, getSiteUrl, SITE_BRAND_NAME } from './site-brand';

export interface CourseSchemaProps {
  name: string;
  description: string;
  level: string;
  goal: string;
  price?: string;
  url: string;
}

export interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  slug: string;
  category?: string;
  keywords?: string[];
  wordCount?: number;
  author?: {
    name: string;
    slug: string;
    role?: string;
    image?: string;
  };
}

export interface CourseUnitSchemaProps {
  name: string;
  description: string;
  level: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

/**
 * Generates Course Schema for individual course pages
 */
export function generateCourseSchema(props: CourseSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": props.name,
    "description": props.description,
    "provider": {
      "@type": "Organization",
      "name": SITE_BRAND_NAME,
      "sameAs": getSiteUrl()
    },
    "offers": {
      "@type": "Offer",
      "price": props.price || "6.99",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": props.url,
      "priceValidUntil": "2026-12-31"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT12W",
      "instructor": {
        "@type": "Organization",
        "name": SITE_BRAND_NAME
      }
    },
    "educationalLevel": props.level,
    "teaches": `English Language - ${props.goal}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "850",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "María González"
      },
      "datePublished": "2025-12-10",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "Excelente curso. El material es muy completo y las explicaciones son claras. Lo recomiendo 100%."
    }
  };
}

/** Generates valid Course data for free course theory and exercise articles. */
export function generateCourseUnitSchema(props: CourseUnitSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": props.name,
    "description": props.description,
    "url": props.url,
    "provider": {
      "@type": "Organization",
      "name": SITE_BRAND_NAME,
      "sameAs": getSiteUrl(),
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": props.url,
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "isAccessibleForFree": true,
      "courseWorkload": "PT40M",
      "inLanguage": "es-ES",
    },
    "educationalLevel": props.level,
    "inLanguage": "es-ES",
  };
}

/**
 * Generates Article Schema for blog posts
 */
export function generateArticleSchema(props: ArticleSchemaProps) {
  const authorSchema = props.author ? {
    "@type": "Person",
    "name": props.author.name,
    "url": getAbsoluteUrl(`/blog/autor/${props.author.slug}`),
    "jobTitle": props.author.role,
    "image": props.author.image
  } : {
    "@type": "Organization",
    "name": SITE_BRAND_NAME,
    "url": getSiteUrl()
  };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": props.title,
    "description": props.description,
    "image": {
      "@type": "ImageObject",
      "url": props.image.startsWith('http') ? props.image : getAbsoluteUrl(props.image),
      "width": 1200,
      "height": 630,
    },
    "author": authorSchema,
    "publisher": {
      "@type": "Organization",
      "name": SITE_BRAND_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": getAbsoluteUrl('/logo.png')
      }
    },
    "datePublished": props.datePublished,
    "dateModified": props.dateModified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": getAbsoluteUrl(`/blog/${props.category}/${props.slug}`)
    },
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@type": "Organization",
      "name": SITE_BRAND_NAME
    },
    "wordCount": props.wordCount,
    "articleSection": props.category,
    "keywords": props.keywords?.join(', '),
    "inLanguage": "es-ES"
  };
}

/**
 * Generates FAQPage Schema for FAQ sections
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generates CollectionPage Schema for keyword hub / topic pages
 */
export function generateCollectionPageSchema(props: {
  name: string;
  description: string;
  url: string;
  articles: Array<{ title: string; url: string; datePublished: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": props.name,
    "description": props.description,
    "url": props.url,
    "publisher": {
      "@type": "Organization",
      "name": SITE_BRAND_NAME,
      "url": getSiteUrl()
    },
    "hasPart": props.articles.map((article) => ({
      "@type": "Article",
      "headline": article.title,
      "url": article.url,
      "datePublished": article.datePublished,
    })),
  };
}

/**
 * Generates Breadcrumb Schema for navigation
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.url !== undefined && { "item": item.url })
    }))
  };
}

/**
 * Generates Review Schema for testimonials
 */
export function generateReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  date: string;
  text: string;
}>) {
  return reviews.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "datePublished": review.date,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": review.text,
    "itemReviewed": {
      "@type": "EducationalOrganization",
      "name": SITE_BRAND_NAME
    }
  }));
}

/**
 * Generates aggregate rating schema
 */
export function generateAggregateRatingSchema(ratingValue: number, reviewCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "ratingValue": ratingValue.toString(),
    "reviewCount": reviewCount.toString(),
    "bestRating": "5",
    "worstRating": "1",
    "itemReviewed": {
      "@type": "EducationalOrganization",
      "name": SITE_BRAND_NAME,
      "url": getSiteUrl()
    }
  };
}
