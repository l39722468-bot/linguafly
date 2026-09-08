import { SITE_BRAND_NAME, getAbsoluteUrl, getSiteUrl } from '@/lib/site-brand';

export function OrganizationSchema() {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_BRAND_NAME,
    "alternateName": ["Linguafly"],
    "url": siteUrl,
    "logo": getAbsoluteUrl('/logo.png'),
    "description": "Revista de artículos prácticos sobre idiomas, alimentación y entrenamiento.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ES",
      "addressLocality": "España"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "hola@linguafly.app",
      "availableLanguage": ["Spanish", "English"]
    },
    "sameAs": [
      "https://www.tiktok.com/@focusonenglish",
      "https://www.youtube.com/@focusonenglish"
    ],
    "foundingDate": "2024",
    "areaServed": {
      "@type": "Country",
      "name": "España"
    },
    "knowsAbout": ["Idiomas", "Alimentación", "Entrenamiento"]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CourseSchema({ 
  name, 
  description, 
  level, 
  duration = "90 días",
}: { 
  name: string; 
  description: string; 
  level: string; 
  duration?: string;
  price?: string;
  currency?: string;
}) {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": SITE_BRAND_NAME,
      "url": siteUrl
    },
    "educationalLevel": level,
    "timeRequired": duration,
    "availableLanguage": "es",
    "inLanguage": "en",
    "teaches": "Inglés",
    "courseMode": "online",
    "isAccessibleForFree": true,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT15H"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": siteUrl
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  author,
  authorUrl,
  image,
  keywords = [],
  wordCount,
  articleSection,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  authorUrl?: string;
  image?: string;
  keywords?: string[];
  wordCount?: number;
  articleSection?: string;
}) {
  const siteUrl = getSiteUrl();
  const resolvedImage = image
    ? (image.startsWith('http') ? image : getAbsoluteUrl(image))
    : getAbsoluteUrl('/og-image.jpg');

  const authorSchema = author && authorUrl
    ? { "@type": "Person", "name": author, "url": authorUrl }
    : { "@type": "Organization", "name": author || SITE_BRAND_NAME, "url": siteUrl };

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": resolvedImage,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": authorSchema,
    "publisher": {
      "@type": "Organization",
      "name": SITE_BRAND_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": getAbsoluteUrl('/logo.png')
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": getAbsoluteUrl(`/blog/${slug}`)
    },
    "inLanguage": "es",
    "isAccessibleForFree": true,
  };

  if (keywords.length) schema.keywords = keywords.join(', ');
  if (wordCount) schema.wordCount = wordCount;
  if (articleSection) schema.articleSection = articleSection;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ questions }: { questions: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : getAbsoluteUrl(item.url),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_BRAND_NAME,
    "url": siteUrl,
    "description": "Artículos de idiomas, alimentación y entrenamiento",
    "inLanguage": "es",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/blog?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
