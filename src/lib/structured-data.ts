/**
 * JSON-LD Structured Data Utilities
 * Generates schema.org compliant structured data for SEO
 */

import { getProductionDomain } from './canonical';

const PRODUCTION_URL = getProductionDomain();

/**
 * Organization schema
 * Used on all pages to establish company identity
 */
export function generateOrganizationSchema(
  locale: string = 'en'
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${PRODUCTION_URL}/#organization`,
    name: 'Lyyli.ai',
    legalName: 'Content AI Oy',
    url: PRODUCTION_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${PRODUCTION_URL}/images/logos/Lyyli.ai_no_BG.png`,
      width: 1500,
      height: 500,
      contentUrl: `${PRODUCTION_URL}/images/logos/Lyyli.ai_no_BG.png`,
    },
    description:
      locale === 'fi'
        ? 'AI-viestintäassistentti ammattilaisorganisaatioille'
        : 'AI Communication Assistant for Professional Service Organizations',
    foundingDate: '2024',
    founders: [
      {
        '@type': 'Person',
        name: 'Mikko Oksanen',
        jobTitle: 'CEO and Co-founder',
      },
      {
        '@type': 'Person',
        name: 'Veikko Luoma-aho',
        jobTitle: 'Co-founder',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FI',
      addressLocality: 'Jyväskylä',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'mikko@lyyli.ai',
      contactType: 'Customer Service',
      availableLanguage: ['en', 'fi'],
    },
    sameAs: [
      'https://www.linkedin.com/company/lyyli-ai',
      'https://twitter.com/lyyli_ai',
    ],
  };
}

/**
 * Website schema with search action
 * Helps search engines understand site search capability
 */
export function generateWebsiteSchema(
  locale: string = 'en'
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${PRODUCTION_URL}/#website`,
    name: 'Lyyli.ai',
    url: `${PRODUCTION_URL}/${locale}`,
    description:
      locale === 'fi'
        ? 'Tehosta sisäistä viestintääsi yritysluokan tekoälyavustajalla'
        : 'Transform your internal communications with enterprise-grade AI assistant',
    inLanguage: [locale],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${PRODUCTION_URL}/${locale}/help/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@id': `${PRODUCTION_URL}/#organization`,
    },
  };
}

export interface BreadcrumbListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

export interface BreadcrumbListSchema {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbListItem[];
}

/**
 * BreadcrumbList schema
 * Helps search engines understand page hierarchy
 */
export function generateBreadcrumbSchema(
  pathname: string,
  locale: string = 'en'
): BreadcrumbListSchema | null {
  const pathSegments = pathname.split('/').filter(Boolean);

  // Only generate breadcrumbs for pages deeper than locale level
  if (pathSegments.length <= 1) {
    return null;
  }

  const breadcrumbItems = [];
  let currentPath = '';

  // Add home
  breadcrumbItems.push({
    '@type': 'ListItem',
    position: 1,
    name: locale === 'fi' ? 'Etusivu' : 'Home',
    item: `${PRODUCTION_URL}/${locale}`,
  });

  // Map route segments to readable names
  const getSegmentLabel = (segment: string): string => {
    const labels: Record<string, { en: string; fi: string }> = {
      features: { en: 'Features', fi: 'Ominaisuudet' },
      pricing: { en: 'Pricing', fi: 'Hinnoittelu' },
      about: { en: 'About', fi: 'Tietoja meistä' },
      blog: { en: 'Blog', fi: 'Blog' },
      contact: { en: 'Contact', fi: 'Yhteystiedot' },
      waitlist: { en: 'Waitlist', fi: 'Odotuslista' },
      privacy: { en: 'Privacy', fi: 'Tietosuoja' },
      cookies: { en: 'Cookies', fi: 'Evästeet' },
      security: { en: 'Security', fi: 'Turvallisuus' },
      cybersecurity: { en: 'Cybersecurity', fi: 'Kyberturvallisuus' },
      help: { en: 'Help', fi: 'Ohje' },
      legal: { en: 'Legal', fi: 'Juridiset dokumentit' },
    };

    const label = labels[segment];
    if (label) {
      return label[locale as 'en' | 'fi'] || label.en;
    }

    // Capitalize first letter for unknown segments
    return (
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
    );
  };

  let position = 2;
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    currentPath += `/${segment}`;

    // Skip locale segment
    if (i === 0 && (segment === 'en' || segment === 'fi')) {
      continue;
    }

    breadcrumbItems.push({
      '@type': 'ListItem',
      position: position++,
      name: getSegmentLabel(segment),
      item: `${PRODUCTION_URL}${currentPath}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems as BreadcrumbListItem[],
  };
}

/**
 * Article schema for blog posts
 * Provides rich metadata for blog content
 */
export interface ArticleSchemaProps {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  slug: string;
  locale: string;
  keywords?: string[];
}

export function generateArticleSchema(
  props: ArticleSchemaProps
): Record<string, unknown> {
  const {
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author,
    slug,
    locale,
    keywords = [],
  } = props;

  const articleUrl = `${PRODUCTION_URL}/${locale}/blog/${slug}`;
  const imageUrl = image?.startsWith('http')
    ? image
    : image
      ? `${PRODUCTION_URL}${image}`
      : `${PRODUCTION_URL}/api/og?title=${encodeURIComponent(headline)}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline,
    description,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
      url: author === 'Mikko Oksanen' ? `${PRODUCTION_URL}/about` : undefined,
    },
    publisher: {
      '@id': `${PRODUCTION_URL}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: keywords.join(', '),
    inLanguage: locale,
    isAccessibleForFree: true,
  };
}

/**
 * SoftwareApplication schema
 * Describes the Lyyli.ai application
 */
export function generateSoftwareApplicationSchema(locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${PRODUCTION_URL}/#software`,
    name: 'Lyyli.ai',
    description:
      locale === 'fi'
        ? 'AI-viestintäassistentti ammattilaisorganisaatioille'
        : 'AI Communication Assistant for Professional Service Organizations',
    url: PRODUCTION_URL,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description:
        locale === 'fi'
          ? 'Ilmainen kokeilu saatavilla'
          : 'Free trial available',
    },
    provider: {
      '@id': `${PRODUCTION_URL}/#organization`,
    },
    inLanguage: ['en', 'fi'],
    featureList: [
      locale === 'fi'
        ? 'Tekoäly-pohjainen viestien reititys'
        : 'AI-powered message routing',
      locale === 'fi'
        ? 'Monikielinen viestintätuki'
        : 'Multilingual communication support',
      locale === 'fi' ? 'Yritystason tietoturva' : 'Enterprise-grade security',
      locale === 'fi'
        ? 'Vaatimustenmukainen raportointi'
        : 'Compliance reporting',
      locale === 'fi'
        ? 'Reaaliaikainen viestintäanalytiikka'
        : 'Real-time communication analytics',
    ],
  };
}

/**
 * WebPage schema for general pages
 * Provides basic page information
 */
export function generateWebPageSchema(
  name: string,
  description: string,
  url: string,
  locale: string = 'en'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name,
    description,
    url,
    inLanguage: locale,
    isPartOf: {
      '@id': `${PRODUCTION_URL}/#website`,
    },
    about: {
      '@id': `${PRODUCTION_URL}/#organization`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${PRODUCTION_URL}/api/og?title=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}`,
      width: 1200,
      height: 630,
    },
  };
}

/**
 * Combine multiple schemas into a single JSON-LD block
 * Use when multiple schema types are needed on a page
 */
export interface CombinedSchema {
  '@context': string;
  '@graph': unknown[];
}

export function combineSchemas(
  ...schemas: (object | null | undefined)[]
): CombinedSchema | object | null {
  const validSchemas = schemas.filter(
    s => s !== null && s !== undefined
  ) as object[];

  if (validSchemas.length === 0) {
    return null;
  }

  if (validSchemas.length === 1) {
    return validSchemas[0];
  }

  return {
    '@context': 'https://schema.org',
    '@graph': validSchemas.map(schema => {
      // Remove @context from individual schemas when combining
      const { '@context': _, ...rest } = schema as Record<string, unknown>;
      return rest;
    }),
  };
}

/**
 * Validate JSON-LD schema
 * Basic validation to ensure required fields are present
 */
export function validateSchema(schema: unknown): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!schema || typeof schema !== 'object') {
    errors.push('Schema is null or undefined');
    return { valid: false, errors };
  }

  const schemaObj = schema as Record<string, unknown>;

  if (!schemaObj['@context']) {
    errors.push('Missing @context');
  }

  if (!schemaObj['@type'] && !schemaObj['@graph']) {
    errors.push('Missing @type or @graph');
  }

  if (schemaObj['@type']) {
    // Type-specific validation
    switch (schemaObj['@type']) {
      case 'Organization':
        if (!schemaObj.name) errors.push('Organization missing name');
        if (!schemaObj.url) errors.push('Organization missing url');
        break;

      case 'Article':
        if (!schemaObj.headline) errors.push('Article missing headline');
        if (!schemaObj.datePublished)
          errors.push('Article missing datePublished');
        if (!schemaObj.author) errors.push('Article missing author');
        break;

      case 'BreadcrumbList':
        if (
          !schemaObj.itemListElement ||
          !Array.isArray(schemaObj.itemListElement)
        ) {
          errors.push('BreadcrumbList missing itemListElement array');
        }
        break;

      case 'WebSite':
        if (!schemaObj.url) errors.push('WebSite missing url');
        break;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
