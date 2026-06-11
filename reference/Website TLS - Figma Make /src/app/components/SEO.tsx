/**
 * Composant SEO - The Learning Society
 * Gestion des métadonnées pour le référencement
 */

import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: object;
}

const defaultMetadata = {
  title: 'The Learning Society - Formation augmentée par l\'IA',
  description: 'Transformez vos formations en combinant l\'intelligence artificielle et l\'expertise humaine. Formation IA, conception pédagogique et solutions sur-mesure.',
  keywords: 'formation IA, intelligence artificielle, formation professionnelle, L&D, learning development, formateur augmenté, IA pédagogique, ChatGPT formation, conception pédagogique',
  author: 'The Learning Society',
  ogType: 'website' as const,
  ogImage: 'https://thelearningsociety.fr/og-image.jpg',
  ogUrl: 'https://thelearningsociety.fr/',
  twitterCard: 'summary_large_image' as const,
  canonical: 'https://thelearningsociety.fr/',
};

export function SEO({
  title = defaultMetadata.title,
  description = defaultMetadata.description,
  keywords = defaultMetadata.keywords,
  author = defaultMetadata.author,
  ogType = defaultMetadata.ogType,
  ogImage = defaultMetadata.ogImage,
  ogUrl = defaultMetadata.ogUrl,
  twitterCard = defaultMetadata.twitterCard,
  canonical = defaultMetadata.canonical,
  noindex = false,
  nofollow = false,
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);

    // Robots meta
    const robotsContent = [
      noindex ? 'noindex' : 'index',
      nofollow ? 'nofollow' : 'follow'
    ].join(', ');
    updateMetaTag('robots', robotsContent);

    // Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', ogUrl, true);
    updateMetaTag('og:site_name', 'The Learning Society', true);
    updateMetaTag('og:locale', 'fr_FR', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Structured data (JSON-LD)
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      
      scriptTag.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, author, ogType, ogImage, ogUrl, twitterCard, canonical, noindex, nofollow, structuredData]);

  return null;
}

// Helper function to generate structured data
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Learning Society',
    url: 'https://thelearningsociety.fr',
    logo: 'https://thelearningsociety.fr/logo.png',
    description: 'Formation augmentée par l\'intelligence artificielle',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
      addressLocality: 'Paris',
    },
    sameAs: [
      'https://www.linkedin.com/company/thelearningsociety',
      'https://twitter.com/thelearningsociety',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@thelearningsociety.fr',
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  publisher: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher,
      logo: {
        '@type': 'ImageObject',
        url: 'https://thelearningsociety.fr/logo.png',
      },
    },
  };
}

export function generateCourseSchema(course: {
  name: string;
  description: string;
  provider: string;
  duration: string;
  price?: number;
  currency?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.provider,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      duration: course.duration,
    },
    ...(course.price && {
      offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: course.currency || 'EUR',
      },
    }),
  };
}
