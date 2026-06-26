import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'The Learning Society';
const BASE_URL = 'https://thelearningsociety.fr';
const DEFAULT_DESCRIPTION =
  "Formation certifiante IA pour formateurs, Learning App adaptative et accompagnement stratégique — The Learning Society.";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.svg`;
const TWITTER_HANDLE = '@thelearningsociety';

interface SEOHeadProps {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  /** Article-specific: author name */
  author?: string;
  /** Article-specific: ISO date string */
  publishedAt?: string;
  /** JSON-LD schema override — appended to defaults */
  schema?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  author,
  publishedAt,
  schema,
}) => {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    description: DEFAULT_DESCRIPTION,
    sameAs: [
      'https://www.linkedin.com/company/the-learning-society',
    ],
  };

  const activeSchema = schema ?? orgSchema;

  return (
    <Helmet>
      <html lang="fr" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article-specific */}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {ogType === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(activeSchema)}</script>
    </Helmet>
  );
};
